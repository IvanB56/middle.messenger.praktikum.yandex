import {Dispatch} from "core";
import {messagesAPI} from "../api/messages";
import {apiHasError} from "../utils/apiHasError";
import {Socket} from "./socket";

export async function getMessages(dispatch: Dispatch<AppState>, state: AppState, chatId: string) {
    const response = await messagesAPI.getMessages(chatId).then(r => JSON.parse(r.responseText));
    if (apiHasError(response)) {
        return;
    }
    dispatch({isSelectedChat: true})
    const userId = window.store.getState().user!.id;
    const socket = Socket.open(chatId, `wss://ya-praktikum.tech/ws/chats/${userId}/${chatId}/${response.token}`)
    Socket.events(chatId, socket);
    setInterval(() => {
        Socket.send(chatId, JSON.stringify({
            type: "ping"
        }))
    }, 10000)
}

export async function sendMessage(_dispatch: Dispatch<AppState>, _state: AppState, action: { message: string }) {
    const chatId = <string>window.store.getState().activeChat;
    Socket.send(chatId, JSON.stringify({
        type: 'message',
        content: action.message
    }));
}
