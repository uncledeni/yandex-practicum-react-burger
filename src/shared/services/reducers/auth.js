import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILED,
    REGISTER,
    LOGOUT,
    TOKEN
} from "../actions/auth"

const initialState = {
    email: 'null',
    name: '',
    accessToken: '',
    refreshToken: '',
    loginRequest: false,
    loginFailed: false
}

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_REQUEST: {
            return {
                ...state,
                loginRequest: true
            };
        }
        case LOGIN_SUCCESS: {
            return {
                ...state,
                email: action.user.email,
                name: action.user.name,
                accessToken: action.accessToken,
                refreshToken: action.refreshToken,
                loginRequest: false,
                loginFailed: false
            }
        }
        case LOGIN_FAILED: {
            return {
                ...state,
                loginRequest: false,
                loginFailed: true
            }
        }
    }
}