import models from '../models.mjs';

/** @type {import('promptfoo').UnifiedConfig} */
export default {
  description: 'ai-text-actions/structure',

  prompts: ['file://prompts/*.yml'],

  providers: models.map(({ label, model, config = {} }) => ({
    id: 'file://../roundtripProvider.mjs',
    label,
    config: { model, ...config },
  })),

  defaultTest: {
    options: {
      rubricPrompt: 'file://../_shared_vars/rubrics/structure-grading.yaml'
    },
    vars: {
      transformation: 'braindumpify',
      forwardModel: 'file://../../default_judge.yml'
    },
    assert: [
      {
        type: 'llm-rubric',
        provider: 'file://../../default_judge.yml',
        metric: "faithfulness",
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