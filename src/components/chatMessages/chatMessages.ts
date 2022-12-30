import Block from "core/Block";
import Validation from "../../core/Validation";

interface ChatProps {
    date: string
    message: string
    from: string
    to: string
    "from_me"?: boolean
}

export default class ChatMessages extends Block<object> {
    static componentName = "ChatMessages";

    private readonly chat: ChatProps[] = [
        /* eslint max-len: [1, 300] */
        {
            date: "12:20",
            message: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when a",
            from: "123456",
            to: "me",
        },
        {
            date: "12:25",
            message: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when a",
            from: "me",
            to: "123456",
            "from_me": true,
        },
        {
            date: "12:33",
            message: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when a",
            from: "123456",
            to: "me"
        },
    ];

    constructor(props: object) {
        super(props);
        this.setProps({
            data: this.chat,
            onClick: () => this.sendMessage()
        })
    }

    sendMessage() {
        new Validation().validForm(this.element as HTMLElement);
    }

    protected render(): string {
        return `
        <div class="chat-message">
            <div class="bg-chat"></div>
            <div class="chat-message-items">
                {{#each this.data}}
                    {{{ MessageItem messageData=this }}}
                {{/each}}
            </div>
            <form class="chat-message-send">
                <label>
                    {{{ Input type="file" inputName="file" hidden="hidden" className="input_file" }}}
                    <i class="fa fa-paperclip" aria-hidden="true"></i>
                </label>
                <label for="chat-message-text"></label>
                {{{ FormInput type="text" placeholder="Введите текст" inputName="message"}}}
                {{{ Button text="Отправить" className="send-button" onClick=onClick }}}
            </form>
        </div>
        `;
    }
}
