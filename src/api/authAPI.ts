import {Fetch} from "core";

export const authApi = {
    user(): Promise<XMLHttpRequest> {
        return Fetch.get('https://ya-praktikum.tech/api/v2/auth/user', {
            headers: {'ContentType': 'application/json; charset=utf-8'}
        });
    }
}
