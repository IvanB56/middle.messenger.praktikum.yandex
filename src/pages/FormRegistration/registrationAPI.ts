import {Fetch} from "core";

export const registrationApi = {
    registration(data: RegistrationRequest) {
        return Fetch.post('https://ya-praktikum.tech/api/v2/auth/signup', {data: data}).then(r => JSON.parse(r.responseText));
    }
}
