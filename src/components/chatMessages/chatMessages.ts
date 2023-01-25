import Block from "core/Block";
import Validation from "core/Validation";
import {addUserChat} from "../../services/chats";
import {sendMessage} from "../../services/messages";

interface ChatProps {
    onClick?: () => void;
    addUser?: () => void;
    messages?: [];
}

export default class ChatMessages extends Block<ChatProps> {
    static componentName = "ChatMessages";

    constructor(props: ChatProps) {
        super(props);
        this.setProps({
            onClick: () => this.sendMessage(),
            addUser: () => this.addUser(),
        })

        if (window.store.getState().activeChat && window.store.getState().messages) {
            this.setProps({
                messages: window.store.getState().messages[window.store.getState().activeChat],
            })
        }
    }

    async addUser() {
        const userId: string = (document.querySelector('input[name=addProfile]') as HTMLInputElement).value ?? null;
        const chatId = window.store.getState().activeChat;
        window.store.dispatch(addUserChat, {chatId: chatId, userId: userId});
    }

    sendMessage() {
        const data: { message: string } = new Validation().validForm(this.element as HTMLElement);
        if (data) {
            window.store.dispatch(sendMessage, data);
        }
    }

    protected render(): string {
        return `
        <div class="chat-message">
            <div class="bg-chat"></div>
            <div class="chat-message-profile_add">
                {{{ DefaultButton text="+" className="addUser" onClick=addUser }}}
                {{{ Input type="text" inputName="addProfile" placeholder="Введите ID профиля" }}}
            </div>
            <div class="chat-message-items">
                {{#each this.messages }}
                    {{{ MessageItem messageData=this }}}
                {{/each}}
            </div>
            <form class="chat-message-send">
                <label for="chat-message-text"></label>
                {{{ FormInput type="text" placeholder="Введите текст" inputName="message" }}}
                {{{ Button text="Отправить" className="send-button" onClick=onClick }}}
            </form>
        </div>
        `;
    }
}
