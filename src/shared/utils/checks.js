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

const checkReponseWithRefresh = (res) => {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

const refreshToken = async (endpoint) => {
    return fetch(`${BASE_URL}${endpoint}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
            token: localStorage.getItem("refreshToken"),
        }),
    })
        .then(checkReponseWithRefresh)
        // !! Важно для обновления токена в мидлваре, чтобы запись
        // была тут, а не в fetchWithRefresh
        .then((refreshData) => {
            if (!refreshData.success) {
                return Promise.reject(refreshData);
            }
            localStorage.setItem("refreshToken", refreshData.refreshToken);
            localStorage.setItem("accessToken", refreshData.accessToken);
            return refreshData;
        });
};

export const fetchWithRefresh = async (endpoint, options) => {
    try {
        const res = await fetch(`${BASE_URL}${endpoint}`, options);
        return await checkReponseWithRefresh(res);
    } catch (err) {
        if (err.message === "jwt expired") {
            const refreshData = await refreshToken(`auth/token`); //обновляем токен
            options.headers.authorization = refreshData.accessToken;
            const res = await fetch(`${BASE_URL}${endpoint}`, options); //повторяем запрос
            return await checkReponseWithRefresh(res);
        } else {
            return Promise.reject(err);
        }
    }
}