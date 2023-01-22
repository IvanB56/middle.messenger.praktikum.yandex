import {Dispatch} from "core";
import {messagesAPI} from "../api/messages";
import {apiHasError} from "../utils/apiHasError";
import {Socket} from "./socket";

export async function getMessages(dispatch: Dispatch<AppState>, _state: AppState, action: string) {
    const response = await messagesAPI.getMessages(action).then(r => JSON.parse(r.responseText));
    if (apiHasError(response)) {
        return;
    }
    dispatch({isSelectedChat: true})
    const userId = window.store.getState().user!.id;
    const socket = new Socket(`wss://ya-praktikum.tech/ws/chats/${userId}/${action}/${response.token}`)
}
