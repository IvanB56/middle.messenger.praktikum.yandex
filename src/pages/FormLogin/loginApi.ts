import {Fetch} from "core";

export const loginApi = {
    login(data: string) {
        return Fetch.post('https://ya-praktikum.tech/api/v2/auth/signin', {
            data: data,
            headers: {'Content-Type': 'application/json'}
        });
    }
}
