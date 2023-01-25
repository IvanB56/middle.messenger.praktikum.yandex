import Block from "core/Block";
import {getMessages} from "../../services/messages";
import {deleteChat, getChatAvatar} from "../../services/chats";
import {BASE_URL} from "../../api/baseURL";

interface BlockProps {
    profile: chatItemProps,
    chat: ChatDTO,
    avatar: () => string
}

interface chatItemProps {
    active?: boolean
    name: string,
    message: messageProps,
    avatar: string,
}

interface messageProps {
    [key: string]: string | number
}

export default class ChatItem extends Block<BlockProps | object> {
    static componentName = "ChatItem";

    constructor({...props}: BlockProps) {
        super({...props});
        this.setProps({
            chatAvatar: () => this.getChatAvatar(),
            avatar: () => `${BASE_URL}/resources${"chat" in this.props && this.props.chat?.avatar}`,
            removeChat: (e: Event) => this.removeChat(e),
            events: {
                click: this.onClickChat
            }
        })
        // this.getChatAvatar();
    }

    async getChatAvatar() {
        if ("chat" in this.props && this.props.chat.avatar) {
            window.store.dispatch(getChatAvatar, {path: this.props.chat.avatar});
        }
    }

    async removeChat(e: Event) {
        e.preventDefault();
        e.stopPropagation();
        const item = (e.target as HTMLButtonElement).closest('.chatItem') as HTMLElement;
        let id: number | undefined;
        if (item.dataset.id) {
            id = parseInt(item.dataset.id);
            await deleteChat(() => {
            }, {} as AppState, {chatId: id, item: item});
        }
        return;
    }

    async onClickChat(e: Event) {
        e.stopPropagation();
        e.preventDefault();
        const chatItem: HTMLElement | null = (e.target as HTMLElement).closest('.chatItem');
        let id: string;
        if (chatItem) {
            id = <string>chatItem.dataset.id;
            await window.store.dispatch(getMessages, id);
            const chats = window.store.getState().chats;
            window.store.set({'activeChat': id});
            chats?.map((chat) => {
                chat.active = chat.id === parseInt(id);
                return chat;
            })
        }
    }

    render() {
        /* eslint max-len: [1, 300] */
        return `
            <div class="chatItem {{#if this.chat.active}}active{{/if}}" data-id="{{ this.chat.id }}">
                <div class="img">
                    <img src="${"avatar" in this.props && this.props.avatar()}" alt="Chat" width="60" height="60" class="{{#unless this.chat.avatar}}hidden{{/unless}}">
                </div>
                <div class="info">
                    <p class="chatItem-name">{{ this.chat.title }}</p>
                    <p class="chatItem-message_preview">{{ this.chat.last_message.content }}</p>
                </div>
                <div class="other">
                    {{{ DefaultButton className="removeChat" onClick=removeChat text='×' }}}
                    {{#if this.chat.messages.count}}
                        <span class="chatItem-message-count">{{ this.chat.unread_count }}</span>
                    {{/if}}
                </div>

                <div class="setting-chat">
                    
                </div>
            </div>
        `;
    }
}
