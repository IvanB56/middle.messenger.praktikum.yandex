import type {Dispatch} from 'core';
import {transformUser} from 'utils/transformUser';
import {apiHasError} from 'utils/apiHasError';
import {authApi} from "../api/authAPI";
import {Routes} from "../routes";
import {chatsAPI} from "../api/chatsAPI";

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
    let chats: ChatDTO[] = window.store.getState().chats || [];
    const responseChats = await chatsAPI.get().then(r => JSON.parse(r.responseText));
    if (!apiHasError(response)) {
        chats = responseChats;
    }
    dispatch({user: transformUser(responseUser as UserDTO), chats});
    window.router.go(Routes.MAIN);
}

export async function create(dispatch: Dispatch<AppState>, _state: AppState, action: UserDTO) {
    const response = await authApi.create(action).then(r => {
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
    await authApi.logout().then(r => r.responseText);
    dispatch({user: null, chats: null});
    window.router.go(Routes.LOGIN);
}

export async function change(dispatch: Dispatch<AppState>, _state: AppState, action: UserDTO) {
    const response = await authApi.change(action).then(r => JSON.parse(r.responseText));
    if (apiHasError(response)) {
        dispatch({errorOpacity: 1, loginFormError: response.reason});
        return;
    }
    dispatch({user: transformUser(response as UserDTO)});
    window.router.go(Routes.SETTINGS);
}

export async function changeAvatar(dispatch: Dispatch<AppState>, _state: AppState, action: FormData) {
    const response = await authApi.changeAvatar(action).then(r => JSON.parse(r.responseText));
    if (apiHasError(response)) {
        dispatch({errorOpacity: 1, loginFormError: response.reason});
        return;
    }
    const user = transformUser(response as UserDTO);
    await authApi.getSource(response.avatar).then(() => {});

    dispatch({user});
}
