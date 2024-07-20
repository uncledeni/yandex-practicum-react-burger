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

export const register = async (email, password, name) => await request('auth/register', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({
        "email": email,
        "password": password,
        "name": name
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

export const getResetPasswordCode = async (email) => await request('password-reset', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({
        "email": email
    })
})

export const resetPassword = async (password, token) => await request('password-reset/reset', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({
        "password": password,
        "token": token
    })
})

export const getUserData = async () => await fetchWithRefresh('auth/user', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
    }
})

export const patchUserData = async (email, password, name) => await fetchWithRefresh('auth/user', {
    method: 'PATCH',
    headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
    },
    body: JSON.stringify({
        "email": email,
        "password": password,
        "name": name
    })
})