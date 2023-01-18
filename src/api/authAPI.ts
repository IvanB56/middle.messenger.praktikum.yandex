import {Fetch} from "core";

type LoginRequestData = {
    login: string;
    password: string;
};

export const authApi = {
    login(data: LoginRequestData): Promise<XMLHttpRequest> {
        return Fetch.post('https://ya-praktikum.tech/api/v2/auth/signin', {
            data: JSON.stringify(data),
            headers: {'Content-Type': 'application/json'},
        });
    },
    user(): Promise<XMLHttpRequest> {
        return Fetch.get('https://ya-praktikum.tech/api/v2/auth/user', {});
    },
    logout(){
        return Fetch.get('https://ya-praktikum.tech/api/v2/auth/logout', {});
    }
}
