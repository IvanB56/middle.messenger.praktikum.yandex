import {Fetch} from "core";

interface UserRequest {
    login: string;
    password: string;
}

export const authApi = {
    login(data: UserRequest): object {
        return Fetch.post('https://ya-praktikum.tech/api/v2/auth/signin', {data: data}).then(r => JSON.parse(r.responseText));
    },
    user(): object {
        return Fetch.post('https://ya-praktikum.tech/api/v2/auth/user', {
            headers: {'ContentType': 'application/json; charset=utf-8'}
        }).then(r => JSON.parse(r.responseText));
    },
    logout(): object {
        return Fetch.post('https://ya-praktikum.tech/api/v2/auth/logout', {}).then(r => JSON.parse(r.responseText));
    }
}
