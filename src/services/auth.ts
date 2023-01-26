import {transformUser} from 'utils/transformUser';
import {apiHasError} from 'utils/apiHasError';
import {authApi} from "../api/authAPI";
import {Routes} from "../routes";
import {chatsAPI} from "../api/chatsAPI";

interface LoginPayload {
    login: string;
    password: string;
}

export const login: DispatchStateHandler<LoginPayload> = async (dispatch, _state, action) => {
    const response = await authApi.login(action).then(r => {
        if (r.status === 200) {
            return '';
        }
        return JSON.parse(r.responseText)
    }).catch(err => console.log(err));
    if (apiHasError(response)) {
        dispatch({errorOpacity: 1, loginFormError: response.reason});
        return;
    }
    const responseUser = await authApi.user().then(r => JSON.parse(r.responseText)).catch(err => console.log(err));
    dispatch({errorOpacity: 0, loginFormError: null});
    if (apiHasError(response)) {
        dispatch(logout);
        return;
    }
    let chats: ChatDTO[] = window.store.getState().chats || [];
    const responseChats = await chatsAPI.get().then(r => JSON.parse(r.responseText)).catch(err => console.log(err));
    if (!apiHasError(response)) {
        chats = responseChats;
    }
    dispatch({user: transformUser(responseUser as UserDTO), chats});
    window.router.go(Routes.MAIN);
}

export const create: DispatchStateHandler<UserDTO> = async (dispatch, _state, action) => {
    const response = await authApi.create(action)
        .then(r => JSON.parse(r.responseText))
        .catch(err => console.log(err));
    if (apiHasError(response)) {
        dispatch({errorOpacity: 1, loginFormError: response.reason});
        return;
    }
    const responseUser = await authApi.user().then(r => JSON.parse(r.responseText)).catch(err => console.log(err));
    if (apiHasError(response)) {
        dispatch(logout);
        return;
    }
    dispatch({user: transformUser(responseUser as UserDTO)});
    window.router.go(Routes.MAIN);
}

export const logout: DispatchStateHandler<undefined> = async (dispatch) => {
    await authApi.logout().then(r => r.responseText).catch(err => console.log(err));
    dispatch({user: null, chats: null});
    window.router.go(Routes.LOGIN);
}

export const change: DispatchStateHandler<UserDTO> = async (dispatch, _state, action) => {
    const response = await authApi.change(action).then(r => JSON.parse(r.responseText)).catch(err => console.log(err));
    if (apiHasError(response)) {
        dispatch({errorOpacity: 1, loginFormError: response.reason});
        return;
    }
    dispatch({user: transformUser(response as UserDTO)});
    window.router.go(Routes.SETTINGS);
}

export const changeAvatar: DispatchStateHandler<FormData> = async (dispatch, _state, action) => {
    const response = await authApi.changeAvatar(action).then(r => JSON.parse(r.responseText)).catch(err => console.log(err));
    if (apiHasError(response)) {
        dispatch({errorOpacity: 1, loginFormError: response.reason});
        return;
    }
    const user = transformUser(response as UserDTO);
    await authApi.getSource(response.avatar);

    dispatch({user});
}
