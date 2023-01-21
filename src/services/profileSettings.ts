import {Dispatch} from "../core";
import {apiHasError} from "../utils/apiHasError";
import {settingsAPI} from "../api/settingsApi";

export interface PasswordProps {
    oldPassword: string,
    newPassword: string
}

export async function changePassword(dispatch: Dispatch<AppState>, _state: AppState, action: PasswordProps) {
    const response = await settingsAPI.changePassword(action).then(r => {
        if (r.status === 200) {
            return '';
        }
        return JSON.parse(r.responseText)
    });
    if (apiHasError(response)) {
        dispatch({errorOpacity: 1, loginFormError: response.reason});
        setTimeout(() => dispatch({errorOpacity: 0, loginFormError: ''}), 2000);
        return;
    }
    dispatch({errorOpacity: 1, loginFormError: 'Пароль успешно изменен'});
    setTimeout(() => dispatch({errorOpacity: 0, loginFormError: ''}), 2000);
}
