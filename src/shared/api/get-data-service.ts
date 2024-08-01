import { ILoginData, IPostOrder, IResetPassword, IResetPasswordCode, IUserData } from "../types/types";
import { request } from "../utils/checks";
import { fetchWithRefresh } from "../utils/checks";

export const getDataService = async () => await request('ingredients');

export const postOrder = async (data: IPostOrder) => await fetchWithRefresh('orders', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
    },
    body: JSON.stringify({
        "ingredients": data
    })
})

export const register = async (data: IUserData) => await request('auth/register', {
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

export const login = async (data: ILoginData) => await request('auth/login', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({
        "email": data.email,
        "password": data.password
    })
})

export const getResetPasswordCode = async (data: IResetPasswordCode) => await request('password-reset', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({
        "email": data.email
    })
})

export const resetPassword = async (data: IResetPassword) => await request('password-reset/reset', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({
        "password": data.password,
        "token": data.code
    })
})

export const getUserData = async () => await fetchWithRefresh('auth/user', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
    }
})

export const patchUserData = async (data: IUserData) => await fetchWithRefresh('auth/user', {
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