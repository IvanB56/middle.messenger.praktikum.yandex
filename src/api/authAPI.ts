import {Fetch} from "core";
import {BASE_URL} from "./baseURL";

type LoginRequestData = {
    login: string;
    password: string;
};

export const authApi = {
    login(data: LoginRequestData): Promise<XMLHttpRequest> {
        return Fetch.post(`${BASE_URL}/auth/signin`, {
            data: JSON.stringify(data),
            headers: {'Content-Type': 'application/json'},
        });
    },
    user(): Promise<XMLHttpRequest> {
        return Fetch.get(`${BASE_URL}/auth/user`, {});
    },
    userById(id: number): Promise<XMLHttpRequest> {
        return Fetch.put(`${BASE_URL}/user/${id}`, {});
    },
    logout() {
        return Fetch.post(`${BASE_URL}/auth/logout`, {});
    },
    create(data: UserDTO): Promise<XMLHttpRequest> {
        return Fetch.post(`${BASE_URL}/auth/signup`, {
            data: JSON.stringify(data),
            headers: {'Content-Type': 'application/json'}
        });
    },
    change(data: UserDTO): Promise<XMLHttpRequest> {
        return Fetch.put(`${BASE_URL}/user/profile`, {
            data: JSON.stringify(data),
            headers: {'Content-Type': 'application/json'}
        });
    },
    changeAvatar(data: FormData): Promise<XMLHttpRequest> {
        return Fetch.put(`${BASE_URL}/user/profile/avatar`, {
            data: data,
        });
    },
    getSource(path: string): Promise<XMLHttpRequest> {
        return Fetch.get(`${BASE_URL}/resources/${encodeURIComponent(path)}`);
    }
}
