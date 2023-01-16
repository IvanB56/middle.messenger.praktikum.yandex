import {Fetch} from "core";

export const loginApi = {
    getChat(data: string) {
        return Fetch.post('https://ya-praktikum.tech/api/v2/chats', {
            data: data,
            headers: {'Content-Type': 'application/json'}
        }).then(r => {
            if (r.status === 200) {
                return '';
            }
            return JSON.parse(r.responseText)
        });
    }
}
