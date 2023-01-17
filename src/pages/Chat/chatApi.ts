import {Fetch} from "core";

export const chatApi = {
    getProfiles(): Promise<XMLHttpRequest> {
        return Fetch.get('https://ya-praktikum.tech/api/v2/chats', {headers: {'Content-Type': 'application/json'}});
    }
}
