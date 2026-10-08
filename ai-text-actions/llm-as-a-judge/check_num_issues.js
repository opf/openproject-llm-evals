module.exports = (output, context) => {
    return output.issue_count === context.vars.expected_issue_count && output.score === context.vars.expected_score
};