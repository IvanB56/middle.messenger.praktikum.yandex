import type {Dispatch} from 'core';
import {chatsAPI} from "../api/chatsAPI";
import {apiHasError} from "../utils/apiHasError";

interface ChatProps {
    title: string,
}

export const getChat: DispatchStateHandler<undefined> = async (dispatch: Dispatch<AppState>) => {
    const response = await chatsAPI.get().then(r => JSON.parse(r.responseText)).catch(err => console.log(err));
    if (apiHasError(response)) {
        return;
    }
    dispatch({chats: response});
}

export const createChat: DispatchStateHandler<ChatProps> = async (dispatch, _state, action) => {
    const chat = await chatsAPI.create(action).then(r => JSON.parse(r.responseText)).catch(err => console.log(err));
    if (apiHasError(chat)) {
        return;
    }
    dispatch(getChat);
}

export const deleteChat: DispatchStateHandler<{ chatId: number, item: HTMLElement }> = async (_dispatch, _state, action) => {
    const { item } = action;
    chatsAPI.deleteChat(JSON.stringify(action)).catch(err => console.log(err));
    item.remove();
}

export const addUserChat: DispatchStateHandler<{ chatId: number | string, userId: number | string }> = async (_dispatch, _state, action) => {
    await chatsAPI.addUser(action).then(r => console.log(r)).catch(err => console.log(err));
}

export const removeUserChat: DispatchStateHandler<{ chatId: number | string, userId: number | string }> = async (_dispatch, _state, action) => {
    console.log(action)
    console.log(chatsAPI)
    chatsAPI.removeUser(action).then(r => console.log(r)).catch(err => console.log(err));
}

export const getChatAvatar: DispatchStateHandler<{ path: number | string }> = async (_dispatch, _state, action) => {
    chatsAPI.getAvatar(action).catch(err => console.log(err));
}
