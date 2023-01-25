import {messagesAPI} from "../api/messages";
import {apiHasError} from "../utils/apiHasError";
import {Socket} from "./socket";

export const getMessages: DispatchStateHandler<string> = async (dispatch, _state, action) => {
    const response = await messagesAPI.getMessages(action).then(r => JSON.parse(r.responseText));
    if (apiHasError(response)) {
        return;
    }
    dispatch({isSelectedChat: true})
    const userId = window.store.getState().user?.id ?? null;
    const socket = Socket.open(action, `wss://ya-praktikum.tech/ws/chats/${userId}/${action}/${response.token}`)
    Socket.events(action, socket);
    setInterval(() => {
        Socket.send(action, JSON.stringify({
            type: "ping"
        }))
    }, 10000)
}

export const sendMessage: DispatchStateHandler<{ message: string }> = async (_dispatch, _state, action) => {
    const chatId = <string>window.store.getState().activeChat;
    Socket.send(chatId, JSON.stringify({
        type: 'message',
        content: action.message
    }));
}
