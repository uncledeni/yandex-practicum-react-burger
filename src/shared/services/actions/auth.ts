import { login, getUserData } from "../../api/get-data-service";
import { AppActions, AppThunk } from "../../types/action-types";
import { ILoginData } from "../../types/types";

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILED = 'LOGIN_FAILED';

export const SET_AUTH_CHECKED = 'SET_AUTH_CHECKED';
export const SET_USER = 'SET_USER';

const setAuthChecked = (value: boolean): AppActions => ({
    type: SET_AUTH_CHECKED,
    isAuthChecked: value
})

const setUser = (email: string | null, name: string | null): AppActions => ({
    type: SET_USER,
    email: email,
    name: name
})

const getUser = (): AppThunk => {
    return async function (dispatch) {
        return getUserData().then((res) => {
            dispatch(setUser(res.user.email, res.user.name))
        })
    }
}

export const loginThunk = (data: ILoginData): AppThunk => {
    return function (dispatch) {
        dispatch({
            type: LOGIN_REQUEST
        })
        login(data).then(res => {
            try {
                localStorage.setItem('refreshToken', res.refreshToken);
                localStorage.setItem('accessToken', res.accessToken.split('Bearer ')[1]);
                dispatch({
                    type: LOGIN_SUCCESS,
                    email: res.user.email,
                    name: res.user.name,
                })
                dispatch(setUser(res.user.email, res.user.name));
                dispatch(setAuthChecked(true));
            } catch (err) {
                alert(err);
                dispatch({
                    type: LOGIN_FAILED
                });
            }
        })
    }
}

export const checkUserAuth = (): AppThunk => {
    return (dispatch) => {
        if (localStorage.getItem('accessToken')) {
            dispatch(getUser())
                .catch(() => {
                    localStorage.removeItem('accessToken');
                    localStorage.removeItem('refreshToken');
                    dispatch(setUser(null, null));
                })
                .finally(() => dispatch(setAuthChecked(true)));
        } else {
            dispatch(setAuthChecked(true));
        }
    }
}

export const logout = (): AppThunk => {
    return (dispatch) => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        dispatch(setUser(null, null));
    }
}