import Block from "core/Block";
import "./Chat.css";

interface ChatActiveProps {
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

export default class ChatActive extends Block<object> {
    static componentName = "ChatEmpty";

    constructor({profiles, ...props}: ChatActiveProps) {
        super({profiles, ...props});
    }




    render() {
        return `
        <div class="chat">
            {{{ Profiles profiles=this.profiles }}}
            {{{ ChatMessages }}}
        </div>
        `;
    }
}
