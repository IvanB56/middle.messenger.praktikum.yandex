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
    userById(id: number): Promise<XMLHttpRequest> {
        return Fetch.put(`https://ya-praktikum.tech/api/v2/user/${id}`, {});
    },
    logout() {
        return Fetch.post('https://ya-praktikum.tech/api/v2/auth/logout', {});
    },
    create(data: UserDTO): Promise<XMLHttpRequest> {
        return Fetch.post('https://ya-praktikum.tech/api/v2/auth/signup', {
            data: JSON.stringify(data),
            headers: {'Content-Type': 'application/json'}
        });
    },
    change(data: UserDTO): Promise<XMLHttpRequest> {
        return Fetch.put('https://ya-praktikum.tech/api/v2/user/profile', {
            data: JSON.stringify(data),
            headers: {'Content-Type': 'application/json'}
        });
    },
    changeAvatar(data: FormData): Promise<XMLHttpRequest> {
        return Fetch.put('https://ya-praktikum.tech/api/v2/user/profile/avatar', {
            data: data,
        });
    },
    getSource(path: string): Promise<XMLHttpRequest> {
        return Fetch.get(`https://ya-praktikum.tech/api/v2/resources/${encodeURIComponent(path)}`);
    }
}
