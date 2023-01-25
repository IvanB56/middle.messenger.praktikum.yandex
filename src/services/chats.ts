import type {Dispatch} from 'core';
import {chatsAPI} from "../api/chatsAPI";
import {apiHasError} from "../utils/apiHasError";

interface ChatProps {
    title: string,
}

export const getChat: DispatchStateHandler<undefined> = async (dispatch: Dispatch<AppState>) => {
    const response = await chatsAPI.get().then(r => JSON.parse(r.responseText));
    if (apiHasError(response)) {
        return;
    }
    dispatch({chats: response});
}

export const createChat: DispatchStateHandler<ChatProps> = async (dispatch, _state, action) => {
    const chat = await chatsAPI.create(action).then(r => JSON.parse(r.responseText));
    if (apiHasError(chat)) {
        return;
    }
    dispatch(getChat);
}

export const deleteChat: DispatchStateHandler<{ chatId: number }> = async (dispatch, _state, action) => {
    const response = await chatsAPI.deleteChat(JSON.stringify(action)).then(r => JSON.parse(r.responseText));
    if (apiHasError(response)) {
        return;
    }
    await dispatch(getChat);
}

export const addUserChat: DispatchStateHandler<{ chatId: number | string, userId: number | string }> = async (_dispatch, _state, action) => {
    await chatsAPI.addUser(action).then(r => console.log(r));
}
