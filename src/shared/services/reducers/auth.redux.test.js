import * as actions from '../actions';
import { initialState, authReducer } from './auth';

describe('redux test', () => {
    test('should return initial state', () => {
        expect(authReducer(undefined, {})).toEqual(initialState);
    })

    test('should set auth checked', () => {
        expect(authReducer(undefined, {
            type: actions.authActions.SET_AUTH_CHECKED,
            isAuthChecked: true
        })).toEqual({
            email: "",
            name: "",
            loginRequest: false,
            loginFailed: false,
            isAuthChecked: true
        })
    })

    test('should success login', () => {
        expect(authReducer(undefined, {
            type: actions.authActions.LOGIN_SUCCESS,
            email: "uncledeni@yandex.ru",
            name: "DenisAb"
        })).toEqual({
            email: "uncledeni@yandex.ru",
            name: "DenisAb",
            loginRequest: false,
            loginFailed: false,
            isAuthChecked: false
        })
    })

    test('should failed login', () => {
        expect(authReducer(undefined, {
            type: actions.authActions.LOGIN_FAILED,
        })).toEqual({
            email: "",
            name: "",
            loginRequest: false,
            loginFailed: true,
            isAuthChecked: false
        })
    })

    test('should set user', () => {
        expect(authReducer(undefined, {
            type: actions.authActions.SET_USER,
            email: "uncledeni@yandex.ru",
            name: "DenisAb"
        })).toEqual({
            email: "uncledeni@yandex.ru",
            name: "DenisAb",
            loginRequest: false,
            loginFailed: false,
            isAuthChecked: false
        })
    })
})