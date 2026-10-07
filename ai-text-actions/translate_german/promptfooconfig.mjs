import models from '../models.mjs';

/** @type {import('promptfoo').UnifiedConfig} */
export default {
  description: 'ai-text-actions/translate_german',

  prompts: ['file://prompts/*.yml'],

  providers: models.map(({ label, model, config = {} }) => ({
    id: 'file://../roundtripProvider.mjs',
    label,
    config: { model, ...config },
  })),

  defaultTest: {
    options: {
      rubricPrompt:
        [
          {
            "role": "system",
            "content": 'The output is a reconstruction of the original ticket below. It was produced by\n' +
            'applying the "{{transformation}}" transformation and then reversing it.\n' +
            '\n' +
            'ORIGINAL:\n' +
            '{{ticket}}\n' +
            'Check if the reconstruction preserves all meaning, facts, names, numbers,\n' +
            'and intent of the original. Ignore minor differences in wording and punctuation.\n' +
            'Respond ONLY with JSON, no markdown fences:\n' +
            '{\n' +
            '    "reason": "Material differences found: 1) ... 2) ... (or \'None\')",\n' +
            '    "issue_count": <integer>,\n' +
            '    "score": <1 / (1 + issue_count)>,\n' +
            '    "pass": <true only if issue_count == 0>\n' +
            '}\n',
          },
          {
            "role": "user",
            "content": "{{output}}"
          }
        ]
    },
    vars: {
      transformation: 'translate to german',
    },
    assert: [
      {
        type: 'llm-rubric',
        metric: "faithfulness",
        provider: 'file://../../default_judge.yml',
      },
    ],
  },

  tests: [
    {
      vars: {
        ticket: 'file://../_shared_vars/tickets/feat_v1_*.md',
        template: 'file://../_shared_vars/templates/feat_v1.md',
      },
    },
    {
      vars: {
        ticket: 'file://../_shared_vars/tickets/bug_v1_*.md',
        template: 'file://../_shared_vars/templates/bug_v1.md',
      },
    },
  ],
};