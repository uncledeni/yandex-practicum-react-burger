import { IFilling, TODO_ANY, TRefreshResponse } from "../types/types";
const BASE_URL = 'https://norma.nomoreparties.space/api/'

// export const checkEmptyObj = (obj) => {
//     return !(Object.keys(obj).length === 0)
// }

export const checkEmptyArr = (arr: IFilling[]): boolean => {
    return (arr.length > 0);
}

export const checkOnUndefined = (data: TODO_ANY): boolean => {
    return !(data === undefined);
}

export const checkOnNull = (data: TODO_ANY): boolean => {
    return !(data === null)
}

export const deepEqual = (a: TODO_ANY, b: TODO_ANY) => {
    if (a === b) return true;
    if (a === null || b === null || typeof a !== 'object' || typeof b !== 'object') return false;
    const keysA = Object.keys(a), keysB = Object.keys(b);
    if (keysA.length !== keysB.length) return false;
    for (const key of keysA) {
      if (!keysB.includes(key) || !deepEqual(a[key], b[key])) return false;
    }
    return true;
  }

const checkResponse = <T>(res: Response): Promise<T> => {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export const request = async <T>(endpoint: RequestInfo, options?: TODO_ANY) => {
    return fetch(`${BASE_URL}${endpoint}`, options)
        .then((res: Response) => checkResponse<T>(res))
};

const refreshToken = async () => {
    return fetch(`${BASE_URL}auth/token`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
            token: localStorage.getItem("refreshToken"),
        }),
    })
        .then((res: Response) => checkResponse<TRefreshResponse>(res))
        // !! Важно для обновления токена в мидлваре, чтобы запись
        // была тут, а не в fetchWithRefresh
        .then((refreshData) => {
            if (!refreshData.success) {
                return Promise.reject(refreshData);
            }
            localStorage.setItem("refreshToken", refreshData.refreshToken);
            localStorage.setItem("accessToken", refreshData.accessToken.split('Bearer ')[1]);
            return refreshData;
        });
};

export const fetchWithRefresh = async <T>(endpoint: RequestInfo, options?: TODO_ANY) => {
    try {
        // console.log("try");
        const res = await fetch(`${BASE_URL}${endpoint}`, options);
        return await checkResponse<T>(res);
    } catch (err) {
        if ((err as {message: string}).message === ("jwt expired" || "invalid signature")) {
            // console.log("token refresh");
            const refreshData = await refreshToken(); //обновляем токен
            options.headers.authorization = refreshData.accessToken;
            const res = await fetch(`${BASE_URL}${endpoint}`, options); //повторяем запрос
            return await checkResponse<T>(res);
        } else {
            // console.log(err);
            return Promise.reject(err);
        }
    }
}