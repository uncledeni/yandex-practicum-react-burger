import { login } from "../../api/get-data-service";

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILED = 'LOGIN_FAILED';

export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILED = 'REGISTER_FAILED';

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILED = 'LOGOUT_FAILED';

export const TOKEN_REQUEST = 'TOKEN_REQUEST';
export const TOKEN_SUCCESS = 'TOKEN_SUCCESS';
export const TOKEN_FAILED = 'TOKEN_FAILED';

export function loginThunk(data) {
    return function (dispatch) {
        dispatch({
            type: LOGIN_REQUEST
        })
        login(data).then(res => {
            try {
                dispatch({
                    type: LOGIN_SUCCESS,
                    email: res.user.email,
                    name: res.user.name,
                    accessToken: res.accessToken,
                    refreshToken: res.refreshToken
                })
            } catch (err) {
                alert(err);
                dispatch({
                    type: LOGIN_FAILED
                });
            }
        })
    }
}