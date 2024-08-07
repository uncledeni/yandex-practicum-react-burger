import { IIngredient, ILoginData, IOrderData, IPostOrder, IResetPassword, IResetPasswordCode, IUserData, TServerResponse } from "../types/types";
import { request } from "../utils/checks";
import { fetchWithRefresh } from "../utils/checks";


export const getDataService = async () => await request<TGetDataServiceResponse>('ingredients');

type TGetDataServiceResponse = TServerResponse<{
    data: IIngredient[];
}>

export const postOrder = async (data: IPostOrder) => await fetchWithRefresh<TPostOrderResponse>('orders', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
    },
    body: JSON.stringify({
        "ingredients": data
    })
})

type TPostOrderResponse = TServerResponse <{
    name: string;
    order: IOrderData;
}>

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

type TRegisterResponse = TServerResponse<{
    user: IUserData;
}>

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

type TLoginResponse = TServerResponse<{
    user: IUserData;
}>

export const getResetPasswordCode = async (data: IResetPasswordCode) => await request<TGetResetPasswordCodeResponse>('password-reset', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({
        "email": data.email
    })
})

type TGetResetPasswordCodeResponse = TServerResponse<{
    message: string;
}>

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

type TResetPasswordResponse = TServerResponse<{
    message: string;
}>

export const getUserData = async () => await fetchWithRefresh<TGetUserDataResponse>('auth/user', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
    }
})

type TGetUserDataResponse = TServerResponse<{
    user: IUserData;
}>

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

type TPatchUserData = TServerResponse<{
    user: IUserData;
}>