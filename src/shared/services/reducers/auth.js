import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILED,
    SET_AUTH_CHECKED,
    SET_USER
} from "../actions/auth"

const initialState = {
    email: '',
    name: '',
    loginRequest: false,
    loginFailed: false,
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
        default: {
            return state;
        }
    }
}