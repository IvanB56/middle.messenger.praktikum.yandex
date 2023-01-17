import {Fetch} from "core";

export const chatApi = {
   getChat() {
        return Fetch.get('https://ya-praktikum.tech/api/v2/chats', {headers: {'Content-Type': 'application/json'}})
            .then(r => JSON.parse(r.responseText));
    }
}
