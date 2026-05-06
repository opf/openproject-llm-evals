# Refine Ticket - LLM as a Judge

This is a meta test suite testing the capabilities of the llm as a judge mechanism used in the test suites
for our actual use cases. 

It does so by creating scenarios which the judge should properly handle. For example
* A refinement where the content was just copied without fixing typos
* A refinement/sorting where content was removed
* A refinement/sorting where content was added

This way we get an idea how good different models and prompts work for judging our use case's results
and improve them over time.

## The Prompts
The prompt in this case is the default grading prompt of `promptfoo` extracted from its repo.

## Variables

* `original_output`: the hypothetical LLM output we want to judge
* `rubric`: the llm as a judge prompts
* `schema`: relevant json schemas
* `sorted_template` the inputs for the refinement task
