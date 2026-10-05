// Providers are defined in OpenRouter to make sure we know which quantization of the model we get
export default [
  // {
  //   label: 'qwen3.6-35b-a3b',
  //   model: 'openrouter:qwen/qwen3.6-35b-a3b',
  //   config: {
  //     provider: { order: ['parasail/fp8', 'atlas-cloud/fp8'] },
  //     passthrough: { reasoning: { enabled: false } },
  //     max_tokens: 16384,
  //   },
  // },
  {
    label: 'qwen3.8-27b',
    model: 'openrouter:qwen/qwen3.8-27b',
    config: {
      provider: { order: ['deepinfra/fp8', 'venice/fp8'] },
      passthrough: { reasoning: { enabled: false } },
      max_tokens: 16384,
    },
  },
  // {
  //   label: 'claude-sonnet-5.5',
  //   model: 'openrouter:anthropic/claude-sonnet-5.5',
  //   config: {
  //     showThinking: false,
  //     passthrough: { reasoning: { effort: "minimal" } },
  //     max_tokens: 16384,
  //   },
  // },
  // {
  //   label: 'gemma-4-26b-a4b-it',
  //   model: 'openrouter:google/gemma-4-26b-a4b-it',
  //   config: {
  //     provider: { order: ['deepinfra/fp8'] },
  //     max_tokens: 16384,
  //   },
  // },
  // {
  //   label: 'gemma4-31b-it',
  //   model: 'openrouter:google/gemma-4-31b-it',
  //   config: {
  //     provider: { order: ['deepinfra/fp8'] },
  //     max_tokens: 16384,
  //   },
  // },
];