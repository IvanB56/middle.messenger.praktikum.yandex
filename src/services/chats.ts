import type {Dispatch} from 'core';
import {chatsAPI} from "../api/chatsAPI";
import {apiHasError} from "../utils/apiHasError";

interface ChatProps {
    title: string,
}

export async function getChat(dispatch: Dispatch<AppState>, _state: AppState) {
    const response = await chatsAPI.get().then(r => JSON.parse(r.responseText));
    if (apiHasError(response)) {
        return;
    }
    dispatch({chats: response});
}

export async function createChat(dispatch: Dispatch<AppState>, _state: AppState, action: ChatProps) {
    const chat = await chatsAPI.create(action).then(r => JSON.parse(r.responseText));
    if (apiHasError(chat)) {
        return;
    }
    dispatch(getChat);
}

export async function deleteChat(dispatch: Dispatch<AppState>, _state: AppState, action: { chatId: number }) {
    const response = await chatsAPI.deleteChat(JSON.stringify(action)).then(r => JSON.parse(r.responseText));
    if (apiHasError(response)) {
        return;
    }
    await dispatch(getChat);
}
