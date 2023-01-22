import Block from "core/Block";
import {withRouter} from "utils/withRouter";
import {withStore} from "utils/withStore";
import {Router, Store} from "core";
import {createChat} from "../../services/chats";

interface ChatEmptyProps {
    router: Router;
    store: Store<AppState>;
    chats: ChatDTO[];
    user: UserDTO;
}

export class Messenger extends Block<ChatEmptyProps | object> {
    static componentName = "ChatEmpty";

    constructor({chats, store, ...props}: ChatEmptyProps) {
        super({chats, store, ...props});
        if ("store" in this.props) {
            this.setProps({
                onClick: () => this.createChat(),
                user: this.props.store.getState().user,
                chats: this.props.store.getState().chats,
                avatar: () => `https://ya-praktikum.tech/api/v2/resources${this.props.store.getState().user?.avatar}`,
            })
        }
    }

    async createChat() {
        const chatName: string = (document.querySelector('[name=createChat]') as HTMLInputElement).value as string;
        await window.store.dispatch(createChat, {title: `Чат: ${chatName}`});
        setTimeout(() => {
            if ("store" in this.props) {
                this.setProps({
                    chats: this.props.store.getState().chats,
                })
            }
        }, 300);
    }

    render() {
        return `
        <div class="chat">
            {{{ Chats chats=this.chats user=this.user avatar=this.avatar onClick=onClick }}}
            {{{ NoSelect }}}
<!--            {{{ ChatMessages }}}-->
        </div>
        `;
    }
}

export default withRouter(withStore(Messenger));
