import {Fetch} from "core";

export const loginApi = {
    login(data: string) {
        return Fetch.post('https://ya-praktikum.tech/api/v2/auth/signin', {
            data: data,
            headers: {'Content-Type': 'application/json'},
        }).then(r => {
            if (r.status === 200) {
                return '';
            }
            return JSON.parse(r.responseText)
        });
    },
    getUser() {
        return Fetch.get('https://ya-praktikum.tech/api/v2/auth/user', {}).then(r => r.responseText);
    }
}
