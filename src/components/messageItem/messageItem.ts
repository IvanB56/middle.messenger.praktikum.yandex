import Block from "core/Block";
import "./messageItem.css"

interface MessageProps {
    date: string
    message: string
    from: string
    to: string
    "from_me"?: boolean
}

export class MessageItem extends Block<object> {
    static componentName = "MessageItem";

    constructor(props: MessageProps) {
        super(props);
    }

    render() {
        return `
            <div class="message-item {{#if this.messageData.from_me}}my-message{{/if}}">
                <p>{{ this.messageData.message }}</p>
                <span class="message-item-date">{{ this.messageData.date }}</span>
            </div>
        `;
    }
}
