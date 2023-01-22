import {Fetch} from "core";

interface ChatProps {
    title: string,
}

export const chatsAPI = {
    create(data: ChatProps): Promise<XMLHttpRequest> {
        return Fetch.post('https://ya-praktikum.tech/api/v2/chats', {
            data: JSON.stringify(data),
            headers: {'Content-Type': 'application/json'}
        });
    },
    get(): Promise<XMLHttpRequest> {
        return Fetch.get('https://ya-praktikum.tech/api/v2/chats', {});
    },
    deleteChat(data: string): Promise<XMLHttpRequest> {
        return Fetch.delete('https://ya-praktikum.tech/api/v2/chats', {
            data: data,
            headers: {'Content-Type': 'application/json'}
        })
    },
    addUser(data: { chatId: number | string, userId: number | string }): Promise<XMLHttpRequest> {
        return Fetch.put('https://ya-praktikum.tech/api/v2/chats/users', {
            data: JSON.stringify({
                "users": [data.userId],
                "chatId": data.chatId
            }),
            headers: {'Content-Type': 'application/json'}
        })
    }
}
