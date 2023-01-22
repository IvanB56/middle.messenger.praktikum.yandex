import Block from "core/Block";
import {withRouter} from "utils/withRouter";
import {withStore} from "utils/withStore";
import {Router, Store} from "core";
import {createChat} from "../../services/chats";

interface MessengerProps {
    router: Router;
    store: Store<AppState>;
    chats: ChatDTO[];
    user: UserDTO;
}

export class Messenger extends Block<MessengerProps | object> {
    static componentName = "Messenger";
    private store: Store<AppState> | undefined;

    constructor({chats, store, ...props}: MessengerProps) {
        super({chats, store, ...props});
        if ("store" in this.props) {
            this.store = this.props.store;
        }
        this.setProps({
            onClick: () => this.createChat(),
            user: this.store?.getState().user,
            chats: this.store?.getState().chats,
            avatar: () => `https://ya-praktikum.tech/api/v2/resources${this.store?.getState().user?.avatar}`,
            isSelectedChat: false
        })
    }

    async createChat() {
        const chatName: string = (document.querySelector('[name=createChat]') as HTMLInputElement).value as string;
        await window.store.dispatch(createChat, {title: `Чат: ${chatName}`});
        setTimeout(() => {
            this.setProps({
                chats: this.store?.getState().chats,
            })
        }, 300);
    }

    render() {
        return `
        <div class="chat">
            {{{ Chats chats=this.chats user=this.user avatar=this.avatar onClick=onClick }}}
            {{#if isSelectedChat}}
                {{{ ChatMessages }}}
            {{else}}
                {{{ NoSelect }}}
            {{/if}}
        </div>
        `;
    }
}

export default withRouter(withStore(Messenger));
