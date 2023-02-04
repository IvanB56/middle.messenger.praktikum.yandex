import Block from "../../core/Block";
import './messageItem.less';

interface MessageProps {
    [key: string]: MessageDTO
}

export default class MessageItem extends Block<Partial<MessageProps>> {
    static componentName = "MessageItem";

    constructor(props: MessageProps) {
        super(props);
    }

    render() {
        return `
            <div class="message-item {{#if this.messageData.from_me}}my-message{{/if}}">
                <p>{{ this.messageData.content }}</p>
                <span class="message-item-date">{{ this.messageData.time }}</span>
            </div>
        `;
    }
}
