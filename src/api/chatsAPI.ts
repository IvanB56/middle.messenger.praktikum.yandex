import {Fetch} from "core";
import {BASE_URL} from "./baseURL";

interface ChatProps {
    title: string,
}

export const chatsAPI = {
    create(data: ChatProps): Promise<XMLHttpRequest> {
        return Fetch.post(`${BASE_URL}/chats`, {
            data: JSON.stringify(data),
            headers: {'Content-Type': 'application/json'}
        });
    },
    get(): Promise<XMLHttpRequest> {
        return Fetch.get(`${BASE_URL}/chats`, {});
    },
    deleteChat(data: string): Promise<XMLHttpRequest> {
        return Fetch.delete(`${BASE_URL}/chats`, {
            data: data,
            headers: {'Content-Type': 'application/json'}
        })
    },
    addUser(data: { chatId: number | string, userId: number | string }): Promise<XMLHttpRequest> {
        return Fetch.put(`${BASE_URL}/chats/users`, {
            data: JSON.stringify({
                "users": [data.userId],
                "chatId": data.chatId
            }),
            headers: {'Content-Type': 'application/json'}
        })
    }
}
