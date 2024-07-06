export const checkEmptyObj = (obj) => {
    return !(Object.keys(obj).length === 0)
}

export const checkEmptyArr = (arr) => {
    return (arr.length > 0);
}

export const checkOnUndefined = (data) => {
    return !(data === undefined);
}

export const checkOnNull = (data) => {
    return !(data === null)
}