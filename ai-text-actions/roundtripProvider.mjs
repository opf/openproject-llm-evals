import { createHash } from 'node:crypto';
import { loadApiProvider } from 'promptfoo';

const parseBool = (val, defaultValue = false) => {
  if (val === undefined) return defaultValue;
  return /^(true|1)$/i.test(val.trim());
};

const cache_enabled = parseBool(process.env.PROMPTFOO_CACHE_ENABLED, true)

const cacheQueues = new Map();

const withCacheLock = (key, fn) => {
  const prev = cacheQueues.get(key) ?? Promise.resolve();
  const run = prev.then(() => fn());
  const tail = run.catch(() => {});

  cacheQueues.set(key, tail);

  // Remove the entry once nothing else has queued behind us
  tail.then(() => {
    if (cacheQueues.get(key) === tail) cacheQueues.delete(key);
  });

  return run;
};

const addUsage = (a = {}, b = {}) => ({
  total: (a?.total || 0) + (b.total || 0),
  prompt: (a?.prompt || 0) + (b.prompt || 0),
  completion: (a?.completion || 0) + (b.completion || 0),
});

const isMessageList = (m) =>
  Array.isArray(m) && m.every((x) => typeof x?.role === 'string' && typeof x?.content === 'string');

export default class RoundTripProvider {
  constructor(options) {
    this.providerId = options.label || 'roundtrip';
    this.config = options.config || {};
  }

  id() {
    return this.providerId;
  }

  async callApi(prompt, context) {

    let spec;
    try {
      spec = JSON.parse(prompt);
    } catch {
      return { error: 'Prompt must be a YAML/JSON file with "forward" and "inverse" message lists' };
    }
    if (!isMessageList(spec.inverse)) {
      return { error: 'The "inverse" part of the prompt file must be a list of {role, content} messages' };
    }

    if (!(isMessageList(spec.inverse) || spec.inverse === null)) {
      return { error: 'The "forward" part of the prompt file must either be null or a list of {role, content} messages' };
    }

    const { model: modelId, ...modelConfig } = this.config;

    // Cache key covers everything that affects the result: model, its config, and the rendered prompt
    const cacheKey =
      'roundtrip:' +
      createHash('sha256').update(JSON.stringify({ modelId, modelConfig, spec })).digest('hex');

    const cache = cache_enabled ? context.getCache() : null;
    if (cache) {
      const hit = await cache.get(cacheKey);
      if (hit) {
        return { ...hit, cached: true, tokenUsage: { cached: hit.tokenUsage?.total || 0 } };
      }
    }
    let forwardResponse
    const model = await loadApiProvider(modelId, { options: { config: modelConfig } });

    // transform ticket with forward step if any
    if (spec.forward) {
      // use shared forward model if defined
      if (context.vars.forwardModel) {
        const forwardModelData = JSON.parse(context.vars.forwardModel)
        const forwardModel = await loadApiProvider(forwardModelData.id, {options: {config: forwardModelData.config}});
        // read and write cache for forward step if defined
        if (cache) {
          const forwardCacheData = {
            modelId: forwardModelData.modelId,
            modelConfig: forwardModelData.modelConfig,
            prompt: spec.forward
          }
          const forwardCacheKey =
              'roundtrip_forward:' +
              createHash('sha256').update(JSON.stringify(forwardCacheData)).digest('hex');
          // read and write cache with lock on cache for the deterministic cache key
          await withCacheLock(forwardCacheKey, async () => {
            forwardResponse = await cache.get(forwardCacheKey)
            if (!forwardResponse) {
              forwardResponse = await forwardModel.callApi(JSON.stringify(spec.forward));
              if (forwardResponse.error) return {error: `Forward step failed: ${forwardResponse.error}`};
              await cache.set(forwardCacheKey, forwardResponse)
            }
          })
        } else {
          // use shared forward model without forward cache
          forwardResponse = await forwardModel.callApi(JSON.stringify(spec.forward));
        }
      } else {
        // use tested model for forward step (no shared forward model)
        forwardResponse = await model.callApi(JSON.stringify(spec.forward));
      }
    }
    // Step 2: substitute the forward output on the parsed objects, not the JSON text,
    // so quotes and newlines in the model output can't break anything
    const inverseMessages = forwardResponse ? spec.inverse.map((m) => ({
      ...m,
      content: m.content.replaceAll('___TRANSFORMED_TICKET___', forwardResponse.output),
    })) : spec.inverse;
    const inverse = await model.callApi(JSON.stringify(inverseMessages));
    if (inverse.error) return { error: `Inverse step failed: ${inverse.error}` };

    const reasoningTokens = inverse.tokenUsage.completionDetails?.reasoning || 0
    const result = {
      output: inverse.output,
      tokenUsage: addUsage(forwardResponse?.tokenUsage, inverse.tokenUsage),
      metadata: {
        originalTicket: context?.vars?.ticket,
        transformedTicket: forwardResponse?.output,
        transformedTicketHash: createHash('sha256').update(forwardResponse?.output || "").digest('hex'),
        reconstructedTicket: inverse.output,
        reasoningTokens: reasoningTokens,
        inputTokens: inverse.tokenUsage.prompt,
        outputTokens: inverse.tokenUsage.completion,
        nonReasoningOutputTokens: inverse.tokenUsage.completion - reasoningTokens
      }
    }

    // Only successful round trips are cached; errors return early above and are retried next run
    if (cache) await cache.set(cacheKey, result);
    return result;
  }
}