import Block from "core/Block";

export default class NoSelect extends Block<object> {
    static componentName = "NoSelect";

    protected render(): string {
        return `
            <div class="chat-message_empty">
               <h2>Выберете чат чтобы отправить сообщение</h2>
            </div>`;
    }
}
