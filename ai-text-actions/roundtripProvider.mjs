import { createHash } from 'node:crypto';
import promptfoo, { loadApiProvider } from 'promptfoo';

const parseBool = (val, defaultValue = false) => {
  if (val === undefined) return defaultValue;
  return /^(true|1)$/i.test(val.trim());
};

const cache_enabled = parseBool(process.env.PROMPTFOO_CACHE_ENABLED, true)

const addUsage = (a = {}, b = {}) => ({
  total: (a.total || 0) + (b.total || 0),
  prompt: (a.prompt || 0) + (b.prompt || 0),
  completion: (a.completion || 0) + (b.completion || 0),
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
    if (!isMessageList(spec.forward) || !isMessageList(spec.inverse)) {
      return { error: '"forward" and "inverse" must each be a list of {role, content} messages' };
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


    const model = await loadApiProvider(modelId, { options: { config: modelConfig } });

    // Step 1: forward messages (original already rendered in by promptfoo)
    const forward = await model.callApi(JSON.stringify(spec.forward));
    if (forward.error) return { error: `Forward step failed: ${forward.error}` };

    // Step 2: substitute the forward output on the parsed objects, not the JSON text,
    // so quotes and newlines in the model output can't break anything
    const inverseMessages = spec.inverse.map((m) => ({
      ...m,
      content: m.content.replaceAll('___TRANSFORMED_TICKET___', forward.output),
    }));
    const inverse = await model.callApi(JSON.stringify(inverseMessages));
    if (inverse.error) return { error: `Inverse step failed: ${inverse.error}` };

    const result = {
      output: inverse.output,
      tokenUsage: addUsage(forward.tokenUsage, inverse.tokenUsage),
      metadata: { originalTicket: context?.vars?.ticket,
                  transformedTicket: forward.output,
                  reconstructedTicket: inverse.output},
    };

    // Only successful round trips are cached; errors return early above and are retried next run
    if (cache) await cache.set(cacheKey, result);
    return result;
  }
}