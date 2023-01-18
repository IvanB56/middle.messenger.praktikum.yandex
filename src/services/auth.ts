import type {Dispatch} from 'core';
import {transformUser} from 'utils/transformUser';
import {apiHasError} from 'utils/apiHasError';
import {authApi} from "../api/authAPI";
import {Routes} from "../routes";

interface LoginPayload {
    login: string;
    password: string;
}

export async function login(dispatch: Dispatch<AppState>, _state: AppState, action: LoginPayload) {
    const response = await authApi.login(action).then(r => {
        if (r.status === 200) {
            return '';
        }
        return JSON.parse(r.responseText)
    });
    if (apiHasError(response)) {
        dispatch({errorOpacity: 1, loginFormError: response.reason});
        return;
    }
    const responseUser = await authApi.user().then(r => JSON.parse(r.responseText));
    dispatch({errorOpacity: 0, loginFormError: null});
    if (apiHasError(response)) {
        dispatch(logout);
        return;
    }
    dispatch({user: transformUser(responseUser as UserDTO)});
    window.router.go(Routes.MAIN);
}

export async function create(dispatch: Dispatch<AppState>, _state: AppState, action: UserDTO) {
    const response = await authApi.create(action).then(r => {
        debugger
        return JSON.parse(r.responseText)
    });
    if (apiHasError(response)) {
        dispatch({errorOpacity: 1, loginFormError: response.reason});
        return;
    }
    const responseUser = await authApi.user().then(r => JSON.parse(r.responseText));
    if (apiHasError(response)) {
        dispatch(logout);
        return;
    }
    dispatch({user: transformUser(responseUser as UserDTO)});
    window.router.go(Routes.MAIN);
}

export async function logout(dispatch: Dispatch<AppState>) {
    await authApi.logout().then(r => JSON.parse(r.responseText));
    dispatch({user: null});
    window.router.go(Routes.MAIN);
}
