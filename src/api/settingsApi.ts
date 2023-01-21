import {Fetch} from "core";
import {PasswordProps} from "../services/profileSettings";

export const settingsAPI = {
    changePassword(data: PasswordProps): Promise<XMLHttpRequest> {
        return Fetch.put('https://ya-praktikum.tech/api/v2/user/password', {
            data: JSON.stringify(data),
            headers: {'Content-Type': 'application/json'}
        });
    },
}
