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

const checkResponse = (res) => {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка HTTP: ${res.status}`);
};

const checkSuccess = (res) => {
    if (res && res.success) {
        return res;
    }
    return Promise.reject(`Ответ не success: ${res}`);
};

const BASE_URL = 'https://norma.nomoreparties.space/api/'

export const request = async (endpoint, options) => {
    return fetch(`${BASE_URL}${endpoint}`, options)
        .then(checkResponse)
        .then(checkSuccess)
};
