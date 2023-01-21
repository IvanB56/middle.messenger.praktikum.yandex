import type {Dispatch} from 'core';
import {transformUser} from 'utils/transformUser';
import {apiHasError} from 'utils/apiHasError';
import {authApi} from "../api/authAPI";
import {chatsAPI} from "../api/chatsAPI";


export async function initApp(dispatch: Dispatch<AppState>) {
    await new Promise(r => setTimeout(r, 700));
    try {
        const user = await authApi.user().then(r => JSON.parse(r.responseText));
        if (apiHasError(user)) {
            return;
        }
        const chats = await chatsAPI.get().then(r => {
            if (apiHasError(r)) {
                return [];
            }
            return JSON.parse(r.responseText);
        });

        dispatch({user: transformUser(user as unknown as UserDTO), chats});
    } catch (err) {
        console.error(err);
    } finally {
        dispatch({appIsInited: true});
    }
}
