// Find the last json object in the user_text output and parse it
module.exports = function (output, context) {
    if (typeof output !== 'string') return output;

    // Find the last occurence of a json object
    const jsonRegex = /(\{[\s\S]*\})/g;
    const rawMatches = [...output.matchAll(jsonRegex)];
    if (rawMatches.length > 0) {
        const lastMatch = rawMatches[rawMatches.length - 1][0].trim();
        return tryParse(lastMatch, output);
    }

    return output;
};

function tryParse(str, original) {
    try {
        return JSON.parse(str);
    } catch (e) {
        // If extraction failed to produce valid JSON, return original for debugging
        return {error: 'JSON extraction failed', raw: original};
    }
}