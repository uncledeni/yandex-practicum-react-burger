import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILED,
    SET_AUTH_CHECKED,
    SET_USER
} from "../../services/actions/auth"

type TLoginRequest = {
    type: typeof LOGIN_REQUEST
}

type TLoginSuccess = {
    type: typeof LOGIN_SUCCESS,
    email: string,
    name: string
}

type TLoginFailed = {
    type: typeof LOGIN_FAILED
}

type TSetAuthChecked = {
    type: typeof SET_AUTH_CHECKED,
    isAuthChecked: boolean
}

type TSetUser = {
    type: typeof SET_USER,
    email: string,
    name: string
}

export type TAuth = TLoginRequest
    | TLoginSuccess
    | TLoginFailed
    | TSetAuthChecked
    | TSetUser;