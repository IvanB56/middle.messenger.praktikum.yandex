import {Router, Store} from "core";

declare global {
    export type Nullable<T> = T | null;
    export type Keys<T extends Record<string, unknown>> = keyof T;
    export type Values<T extends Record<string, unknown>> = T[Keys<T>];
    export type DispatchStateHandler<TAction> = (dispatch: Dispatch<AppState>, state: AppState, action: TAction) => Promise<void>
    export type AppState = {
        appIsInited: boolean;
        screen: Screens | null;
        errorOpacity: number;
        loginFormError: string | null;
        user: User | null;
        chats: ChatDTO[] | null;
        isSelectedChat: boolean;
        activeChat: string | number | null;
        messages: { [chatId: string]: MessageDTO[] };
    };
    export type APIError = {
        reason: string;
    };
    export type ChatDTO = {
        id: number;
        title: string;
        avatar: string;
        unread_count: number;
        active: boolean;
        last_message: {
            user: UserDTO,
            time: string,
            content: string,
        }
    };
    export type UserDTO = {
        id: number;
        login: string;
        first_name: string;
        second_name: string;
        display_name: string;
        avatar: string;
        phone: string;
        email: string;
        password?: string;
    };
    export type MessageDTO = {
        chat_id: number;
        time: string;
        type: string;
        user_id: string;
        content: string;
        file?: {
            id: number,
            user_id: number,
            path: string,
            filename: string,
            content_type: string,
            content_size: number,
            upload_date: string,
        }
    }
    export type User = {
        id: number;
        login: string;
        firstName: string;
        secondName: string;
        displayName: string;
        avatar: string;
        phone: string;
        email: string;
    };
    export type UserRequest = {
        login: string;
        password: string;
    }
    export type RegistrationRequest = {
        first_name: string;
        second_name: string;
        login: string;
        email: string;
        password: string;
        phone: string;
    }

    interface Window {
        router: Router
        store: Store<AppState>;
    }
}

export {}
