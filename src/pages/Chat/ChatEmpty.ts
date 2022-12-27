import Block from "core/Block";

interface ChatEmptyProps {
    profiles: profileProps[];
}

interface messageProps {
    [key: string]: string | number
}

interface profileProps {
    name: string
    active?: boolean
    messages: messageProps
}

export default class ChatEmpty extends Block<ChatEmptyProps | object> {
    static componentName = "ChatEmpty";

    constructor({profiles, ...props}: ChatEmptyProps) {
        super({profiles, ...props});
    }

    render() {
        return `
        <div class="chat">
            {{{ Profiles profiles=this.profiles }}}
            {{{ NoSelect }}}
        </div>
        `;
    }
}
