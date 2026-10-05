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
    vars: {
      transformation: 'braindumpify',
    },
    assert: [
      {
        type: 'llm-rubric',
        value: 'The output is a reconstruction of the original text below. It was produced by\n' +
            'applying the "{{transformation}}" transformation and then reversing it.\n' +
            '\n' +
            'ORIGINAL:\n' +
            '{{ticket}}\n' +
            '\n' +
            'TARGET TEMPLATE: \n' +
            '{{template}}\n' +
            'Pass only if the reconstruction preserves all meaning, facts, names, numbers,\n' +
            'and intent of the original. Ignore minor differences in wording or punctuation.\n' +
            'Fail if anything material is lost, added, or distorted.',
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