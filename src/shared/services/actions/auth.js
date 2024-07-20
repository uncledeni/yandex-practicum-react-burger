import { login, getUserData } from "../../api/get-data-service";

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILED = 'LOGIN_FAILED';

export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILED = 'REGISTER_FAILED';

export const TOKEN_REQUEST = 'TOKEN_REQUEST';
export const TOKEN_SUCCESS = 'TOKEN_SUCCESS';
export const TOKEN_FAILED = 'TOKEN_FAILED';

export const SET_AUTH_CHECKED = 'SET_AUTH_CHECKED';
export const SET_USER = 'SET_USER';

const setAuthChecked = (value) => ({
    type: SET_AUTH_CHECKED,
    isAuthChecked: value
})

const setUser = (email, name) => ({
    type: SET_USER,
    email: email,
    name: name
})

const getUser = () => {
    return async function (dispatch) {
        return getUserData().then((res) => {
            dispatch(setUser(res.user.email, res.user.name))
        })
    }
}

export const LoginThunk = (data) => {
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

export const checkUserAuth = () => {
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

export const logout = () => {
    return (dispatch) => {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            dispatch(setUser(null, null));
    }
}