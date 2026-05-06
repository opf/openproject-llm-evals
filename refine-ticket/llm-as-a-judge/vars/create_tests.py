import os
import json
dir_name = os.path.dirname(__file__)

def create_tests():
    vars_jsonl = os.path.join(dir_name, "vars.jsonl")
    with open(vars_jsonl) as f:
        examples = [json.loads(l) for l in f.readlines()]

    resolved_examples = []
    for example in examples:
        resolved_example = {}
        for k,v in example.items():
            if isinstance(v, str) and (v.endswith(".json") or v.endswith(".txt")):
                file_path = os.path.join(dir_name, k, v)
                with open(file_path) as f:
                    resolved_example[k] = f.read()
            else:
                resolved_example[k] = v
        resolved_example["rubric"] = resolved_example["rubric"].replace("{{", "{").replace("}}", "}").format(**resolved_example)
        resolved_examples.append(resolved_example)

    tests = []
    for resolved_example in resolved_examples:
        tests.append({
            "vars": resolved_example,
            "options": {"transform": "file://transform_output.js"},
            "assert": [
                {"type": "contains-json", "value": "file://vars/schema/grading.json"},
                {"type": "javascript", "value": "file://check_passing.js"}
            ]
        })

    return tests