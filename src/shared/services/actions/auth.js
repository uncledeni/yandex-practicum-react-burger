import { useNavigate } from "react-router-dom";
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

export const SET_AUTH_CHECKED = 'SET_AUTH_CHECKED';

export const LoginThunk = (data) => {
    return function (dispatch) {
        dispatch({
            type: LOGIN_REQUEST
        })
        login(data).then(res => {
            console.log(res);
            try {
                localStorage.setItem('refreshToken', res.refreshToken);
                localStorage.setItem('accessToken', res.accessToken);
                dispatch({
                    type: LOGIN_SUCCESS,
                    email: res.user.email,
                    name: res.user.name
                })
                dispatch({
                    type: SET_AUTH_CHECKED,
                    isAuthChecked: true
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