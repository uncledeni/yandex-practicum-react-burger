import {
    TGetDataServiceResponse,
    TFeedOrdersResponse,
    TGetResetPasswordCodeResponse,
    TGetUserDataResponse,
    TLoginResponse,
    TPatchUserData,
    TPostOrderResponse,
    TRegisterResponse,
    TResetPasswordResponse
} from "../types/get-data-service-types";
import { ILoginData, IResetPassword, IResetPasswordCode, IUserData } from "../types/types";

import { request } from "../utils/checks";
import { fetchWithRefresh } from "../utils/checks";

export const getDataService = async () => await request<TGetDataServiceResponse>('ingredients');

export const postOrder = async (data: string | undefined) => await fetchWithRefresh<TPostOrderResponse>('orders', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
    },
    body: JSON.stringify({
        "ingredients": data
    })
})

export const getOrder = async (number: string | undefined) => await request<TFeedOrdersResponse>(`orders/${number}`, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json;charset=utf-8',
    },
})

export const register = async (data: IUserData) => await fetchWithRefresh<TRegisterResponse>('auth/register', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({
        "email": data.email,
        "password": data.password,
        "name": data.name
    })
})

export const login = async (data: ILoginData) => await fetchWithRefresh<TLoginResponse>('auth/login', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({
        "email": data.email,
        "password": data.password
    })
})

export const getResetPasswordCode = async (data: IResetPasswordCode) => await request<TGetResetPasswordCodeResponse>('password-reset', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({
        "email": data.email
    })
})

export const resetPassword = async (data: IResetPassword) => await request<TResetPasswordResponse>('password-reset/reset', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({
        "password": data.password,
        "token": data.code
    })
})

export const getUserData = async () => await fetchWithRefresh<TGetUserDataResponse>('auth/user', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
    }
})

export const patchUserData = async (data: IUserData) => await fetchWithRefresh<TPatchUserData>('auth/user', {
    method: 'PATCH',
    headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
    },
    body: JSON.stringify({
        "email": data.email,
        "password": data.password,
        "name": data.name
    })
})