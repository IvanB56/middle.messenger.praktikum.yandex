import Block from "core/Block";
import {deleteChat} from "../../services/chats";
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
            removeChat: (e: Event) => this.removeChat(e),
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
            chats?.map((chat) => {
                chat.active = chat.id === parseInt(id);
                return chat;
            })
        }
    }

    async removeChat(e: Event) {
        e.preventDefault();
        const item = (e.target as HTMLButtonElement).closest('.chatItem') as HTMLElement;
        let id: number | undefined;
        if (item.dataset.id) {
            id = parseInt(item.dataset.id);
            window.store.dispatch(deleteChat, {chatId: id});
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
                    {{{ DefaultButton className="removeChat" onClick=removeChat text='×' }}}
                    {{#if this.chat.messages.count}}
                        <span class="chatItem-message-count">{{ this.chat.unread_count }}</span>
                    {{/if}}
                </div>
            </div>
        `;
    }
}
