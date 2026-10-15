# openproject-llm-evals
Evals for evaluating LLMs and prompts in OpenProject with [promptfoo evals](https://www.promptfoo.dev/docs/getting-started/).

## Setup

### Install dependencies:

```bash
npm install
```

### Setup Env

Copy the `.env.example` file to `.env` and fill in the `OPENROUTER_API_KEY`
```bash
cp .env.example .env
```

## Running an Evaluation:

Here are the available evals:
* `make eval-ai-text-actions-structure`
* `make eval-ai-text-actions-erode`
* `make eval-ai-text-actions-translate`
* `make eval-ai-text-actions-style`
* `make eval-ai-text-acitons` # executes all of the above
* `make eval-ai-text-actions-llm-as-a-judge`

## Viewing the results

Run `make view` to start the promptfoo frontend.

## Making smaller changes

### Adding a new model

If you'd like to add a new model (aka provider in promptfoo) to the test suites, add it to the respective models file, 
e.g. `models.mjs` for the ai-text-actions project.

### Changing the LLM as a judge model

Edit the `default_judge.yml` at the root of this repository to change the judge used across the different
test suites. If you just want to use it for a single test suite you can also edit the respective provider
in the test suite's config and overwrite the import of the default judge.

Make sure that you included and test the new judge beforehand on the provided llm as a judge tests.

## Writing a new eval

Create a new subfolder `eval-name` containing
* `promptfooconfig.yaml` the main configuration file for a promptfoo test suite
* a `prompts` folder containing chat format prompts in YAML which are more legible than JSON with its single line string limitations
* a `vars` folder containing subfolders of test variables to reference in your promptfooconfig.yaml. This is really useful in combination with glob patterns (using *).
* a `README.md` explaining the structure of the specific test suite.

Alternatively structure it like the large `ai-text-actions` test suite with subtasks. 