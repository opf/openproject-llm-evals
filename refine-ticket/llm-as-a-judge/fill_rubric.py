# Load the rubric and populate it
# Promptfoo treats loaded files as strings and not as templates so we have to do it ourselves
def get_var(var_name, prompt, other_vars):
    with open(other_vars['rubric_file_path']) as f:
        rubric_text = f.read()

    rubric = rubric_text.replace("{{", "{").replace("}}", "}").format(**other_vars)

    return {"output": rubric}