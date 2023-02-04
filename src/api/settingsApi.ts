import {Fetch} from "../core";
import {PasswordProps} from "../services/profileSettings";
import {BASE_URL} from "./baseURL";

export const settingsAPI = {
    changePassword(data: PasswordProps): Promise<XMLHttpRequest> {
        return Fetch.put(`${BASE_URL}/user/password`, {
            data: JSON.stringify(data),
            headers: {'Content-Type': 'application/json'}
        });
    },
}
