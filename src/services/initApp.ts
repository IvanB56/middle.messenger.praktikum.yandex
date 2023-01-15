import type {Dispatch} from 'core';
import {transformUser} from 'utils/transformUser';
import {apiHasError} from 'utils/apiHasError';
import {authApi} from "../api/authAPI";


export async function initApp(dispatch: Dispatch<AppState>) {
    await new Promise(r => setTimeout(r, 700));
    try {
        const response = await authApi.user();
        if (apiHasError(response)) {
            return;
        }
        dispatch({user: transformUser(response as unknown as UserDTO)});
    } catch (err) {
        console.error(err);
    } finally {
        dispatch({appIsInited: true});
    }
}
