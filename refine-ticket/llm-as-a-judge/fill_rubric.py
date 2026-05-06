def get_var(var_name, prompt, other_vars):
    with open(other_vars['rubric_file_path']) as f:
        rubric_text = f.read()

    rubric = rubric_text.replace("{{", "{").replace("}}", "}").format(**other_vars)

    return {"output": rubric}