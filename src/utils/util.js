export const isNull = (obj) => {
    return (obj === null || obj === undefined ||
        obj === "" || obj === 0 || obj === false);
}

export const value = (value, defaultValue) => {
    return value ? value : defaultValue;
}