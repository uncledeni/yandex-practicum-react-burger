import { request } from "../utils/checks";
import { fetchWithRefresh } from "../utils/checks";

export const getDataService = async () => await request('ingredients');

export const postOrder = async (data) => await fetchWithRefresh('orders', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
    },
    body: JSON.stringify({
        "ingredients": data
    })
})

export const register = async (values) => await request('auth/register', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({
        "email": values.email,
        "password": values.password,
        "name": values.name
    })
})

export const login = async (data) => await request('auth/login', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({
        "email": data.email,
        "password": data.password
    })
})

export const getResetPasswordCode = async (values) => await request('password-reset', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({
        "email": values.email
    })
})

export const resetPassword = async (values) => await request('password-reset/reset', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({
        "password": values.password,
        "token": values.code
    })
})

export const getUserData = async () => await fetchWithRefresh('auth/user', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
    }
})

export const patchUserData = async (values) => await fetchWithRefresh('auth/user', {
    method: 'PATCH',
    headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
    },
    body: JSON.stringify({
        "email": values.email,
        "password": values.password,
        "name": values.name
    })
})