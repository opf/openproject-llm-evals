export const parseBool = (val, defaultValue = false) => {
    if (val === undefined) return defaultValue;
    return /^(true|1)$/i.test(val.trim());
};