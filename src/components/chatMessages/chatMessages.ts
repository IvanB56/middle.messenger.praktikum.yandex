import Block from "core/Block";
import Validation from "core/Validation";
import {addUserChat} from "../../services/chats";
import {sendMessage} from "../../services/messages";

interface ChatProps {
    date: string
    message: string
    from: string
    to: string
    "from_me"?: boolean
}

export default class ChatMessages extends Block<ChatProps[] | object> {
    static componentName = "ChatMessages";

    constructor(props: ChatProps) {
        super(props);
        this.setProps({
            onClick: () => this.sendMessage(),
            addUser: (e: Event) => this.addUser(e)
        })
    }

    async addUser(e: Event) {
        const userId: string = (document.querySelector('input[name=addProfile]') as HTMLInputElement).value!;
        const chatId = window.store.getState().activeChat;
        window.store.dispatch(addUserChat, {chatId: chatId, userId: userId});
    }

    sendMessage() {
        const data: { message: string } = new Validation().validForm(this.element as HTMLElement);
        window.store.dispatch(sendMessage, data);
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
                {{#each this.data}}
                    {{{ MessageItem messageData=this }}}
                {{/each}}
            </div>
            <form class="chat-message-send">
                <label for="chat-message-text"></label>
                {{{ FormInput type="text" placeholder="Введите текст" inputName="message"}}}
                {{{ Button text="Отправить" className="send-button" onClick=onClick }}}
            </form>
        </div>
        `;
    }
}
