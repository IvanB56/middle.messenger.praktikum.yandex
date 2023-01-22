import Fetch from "core/Fetch";

export const messagesAPI = {
    getMessages(chatID: string): Promise<XMLHttpRequest> {
        return Fetch.post(`https://ya-praktikum.tech/api/v2/chats/token/${chatID}`, {});
    }
}
