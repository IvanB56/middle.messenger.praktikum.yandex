import {Fetch} from "core";

export const registrationApi = {
    registration(data: string) {
        return Fetch.post('https://ya-praktikum.tech/api/v2/auth/signup', {
            data: data,
            headers: {'Content-Type': 'application/json'}
        }).then(r => JSON.parse(r.responseText));
    }
}
