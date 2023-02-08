import Fetch from "../core/Fetch";
import {BASE_URL} from "./baseURL";

export const messagesAPI = {
    getMessages(chatID: string): Promise<XMLHttpRequest> {
        return Fetch.post(`${BASE_URL}/chats/token/${chatID}`, {});
    }
}
