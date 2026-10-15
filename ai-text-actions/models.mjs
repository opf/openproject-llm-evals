// Providers are defined in OpenRouter to make sure we know which quantization of the model we get

import {parseBool} from "../util/parse_bool.js";

const allReasoning = parseBool(process.env.ALL_REASONING, false)
const localKolibri = parseBool(process.env.LOCAL_MODEL_KOLIBRI, false)
const localMuse = parseBool(process.env.LOCAL_MODEL_MUSE, false)

const models =  [
  {
    label: 'qwen3.6-35b-a3b',
    model: 'openrouter:qwen/qwen3.6-35b-a3b',
    config: {
      showThinking: false,
      provider: { order: ['parasail/fp8', 'atlas-cloud/fp8'] },
      passthrough: {
        reasoning: {enabled: allReasoning},
        temperature: 0.0
      },
      max_tokens: 16384,
    },
  },
  {
    label: 'qwen3.8-27b',
    model: 'openrouter:qwen/qwen3.8-27b',
    config: {
      showThinking: false,
      provider: { order: ['deepinfra/fp8', 'venice/fp8'] },
      passthrough: { reasoning: { enabled: allReasoning, effort: "minimal" }, temperature: 0 },
      max_tokens: 16384,
    },
  },
  {
    label: 'claude-sonnet-5.5',
    model: 'openrouter:anthropic/claude-sonnet-5.5',
    config: {
      showThinking: false,
      passthrough: { reasoning: { effort: "minimal" }, temperature: 0 },
      max_tokens: 16384,
    },
  },
  {
    label: 'gemma-4-26b-a4b-it',
    model: 'openrouter:google/gemma-4-26b-a4b-it',
    config: {
      showThinking: false,
      passthrough: { reasoning: { enabled: allReasoning }, temperature: 0 },
      provider: { order: ['deepinfra/fp8'] },
      max_tokens: 16384,
    },
  },
  {
    label: 'gemma4-31b-it',
    model: 'openrouter:google/gemma-4-31b-it',
    config: {
      showThinking: false,
      provider: { order: ['deepinfra/fp8'] },
      passthrough: { reasoning: { enabled: allReasoning }, temperature: 0 },
      max_tokens: 16384,
    },
  },
  {
    label: 'muse-glimmer-30b',
    model: 'openrouter:meta/muse-glimmer-30b',
    config: {
      showThinking: false,
      provider: { order: ['phala'] },
      passthrough: { reasoning: { enabled: true, strength: "low" }, temperature: 0  },
      max_tokens: 16384,
    },
  },
  {
    label: 'mistral-small-4',
    model: 'openrouter:mistralai/mistral-small-2603',
    config: {
      showThinking: false,
      provider: { order: ['mistral/eu'] },
      passthrough: { reasoning: { enabled: allReasoning, strength: "low" }, temperature: 0  },
      max_tokens: 16384,
    },
  },
  {
    label: 'glm-4.7-flash',
    model: 'openrouter:z-ai/glm-4.7-flash',
    config: {
      showThinking: false,
      provider: { order: ['venice/fp8'] },
      passthrough: { reasoning: { enabled: allReasoning }, temperature: 0  },
      max_tokens: 16384,
    },
  },
];

if (localKolibri) {
  models.push({
    label: 'Kolibri-1',
    model: 'openai:chat:Aleph-Alpha/Kolibri-1',
    config: {
      showThinking: false,
      apiBaseUrl: "http://localhost:8000/v1",
      passthrough: { reasoning: { enabled: allReasoning, strength: "low" }, temperature: 0  },
      max_tokens: 16384
    }
  })
}

if (localMuse) {
  models.push({
    label: 'muse-drafter',
    model: 'openai:chat:muse-glimmer',
    config: {
      showThinking: false,
      apiBaseUrl: "http://localhost:8000/v1",
      passthrough: { reasoning: { enabled: true, strength: "low" }, temperature: 0  },
      max_tokens: 16384
    }
  })
}

export default models