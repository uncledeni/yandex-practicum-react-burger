import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILED,
    SET_AUTH_CHECKED,
    SET_USER,
    RESET_PASSWORD_CODE_REQUEST,
    RESET_PASSWORD_CODE_SUCCESS,
    RESET_PASSWORD_CODE_FAILED
} from "../actions/auth"

const initialState = {
    email: '',
    name: '',
    loginRequest: false,
    loginFailed: false,
    resetPasswordCodeRequest: false,
    resetPasswordCodeFailed: false,
    isAuthChecked: false
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
                email: action.email,
                name: action.name,
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
        case SET_USER: {
            return {
                ...state,
                email: action.email,
                name: action.name
            }
        }
        case SET_AUTH_CHECKED: {
            return {
                ...state,
                isAuthChecked: action.isAuthChecked
            }
        }
        case RESET_PASSWORD_CODE_REQUEST: {
            return {
                ...state,
                resetPasswordCodeRequest: true
            };
        }
        case RESET_PASSWORD_CODE_SUCCESS: {
            return {
                ...state,
                resetPasswordCodeRequest: false,
                resetPasswordCodeFailed: false
            }
        }
        case RESET_PASSWORD_CODE_FAILED: {
            return {
                ...state,
                resetPasswordCodeRequest: false,
                resetPasswordCodeFailed: true
            }
        }
        default: {
            return state;
        }
    }
}