# openproject-llm-evals
Evals for evaluating LLMs and prompts in OpenProject with [promptfoo evals](https://www.promptfoo.dev/docs/getting-started/).

## Setup

### Install dependencies:

```bash
npm install
```

### Setup Env

Either export the Openrouter key on the command line:

```bash
export OPENROUTER_API_KEY=abc
```

or add it to an `.env` file

## Running an Evaluation:

You can run evals using `npm run <eval name>`.

Here are the available evals:
* `eval-refine-ticket`: executes two sets of tests one for sorting a brain dump into a template and one for refining content that is already in a template
* `eval-refine-ticket-llm-as-a-judge`: executes a set of meta tests for testing the llm as a judge mechanism used in the refine ticket tests

## Viewing the results

Run `npm view` to start the promptfoo frontend.

## Making smaller changes

### Adding a new model

If you'd like to add a new model (aka provider in promptfoo) to the test suites, add it to the `providers.yml` file 
at the root of this repository. It contains the models that are tested across the different test suites.

### Changing the LLM as a judge model

Edit the `default_judge.yml` at the root of this repository to change the judge used across the different
test suites. If you just want to use it for a single test suite you can also edit the respective provider
in the test suite and overwrite the import of the default judge.

Make sure that you included and test the new judge beforehand on the provided llm as a judge tests.

## Writing a new eval

Create a new subfolder `eval-name` containing 
* `promptfooconfig.yaml` the main configuration file for a promptfoo test suite
* a `prompts` folder containing chat format prompts in YAML which are more legible than JSON with its single line string limitations
* a `vars` folder containing subfolders of test variables to reference in your promptfooconfig.yaml. This is really useful in combination with glob patterns (using *).
* a `README.md` explaining the structure of the specific test suite.