import {Fetch} from "core";

export const authApi = {
    user(): Promise<UserRequest> | undefined {
        return Fetch.post('https://ya-praktikum.tech/api/v2/auth/user', {
            headers: {'ContentType': 'application/json; charset=utf-8'}
        }).then(r => JSON.parse(r.responseText));
    }
}
