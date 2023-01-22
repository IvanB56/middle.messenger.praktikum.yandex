import Block from "core/Block";
import {getMessages} from "../../services/messages";

interface BlockProps {
    profile: chatItemProps
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
            events: {
                click: this.onClickChat
            }
        })
    }

    async onClickChat(e: Event) {
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
                    <img src="{{ this.chat.avatar }}" alt="Chat" width="60" height="60" class="{{#unless this.chat.avatar}}hidden{{/unless}}">
                </div>
                <div class="info">
                    <p class="chatItem-name">{{ this.chat.title }}</p>
                    <p class="chatItem-message_preview">{{ this.chat.last_message.content }}</p>
                </div>
                <div class="other">
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
