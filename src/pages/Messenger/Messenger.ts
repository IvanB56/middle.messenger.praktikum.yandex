import Block from "../../core/Block";
import {withRouter} from "../../utils/withRouter";
import {withStore} from "../../utils/withStore";
import {Router, Store} from "../../core";
import {createChat} from "../../services/chats";
import {BASE_URL} from "../../api/baseURL";
import './Messenger.less';

interface MessengerProps {
    router: Router;
    store: Store<AppState>;
    chats: ChatDTO[] | null;
    user: User | null;
    isSelectedChat: () => void;
    onClick: () => void;
    avatar: () => void;
}

export class Messenger extends Block<MessengerProps | object> {
    static componentName = "Messenger";

    constructor({chats, store, ...props}: MessengerProps) {
        super({chats, store, ...props});
        if ("store" in this.props) {
            this.setProps({
                onClick: () => this.createChat(),
                user: this.props.store.getState().user,
                chats: this.props.store.getState().chats,
                avatar: () => `${BASE_URL}/resources${this.props.store.getState().user?.avatar}`,
                isSelectedChat: () => this.props.store.getState().isSelectedChat,
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
            {{#if ${"isSelectedChat" in this.props && this.props.isSelectedChat()}}}
                {{{ ChatMessages }}}
            {{else}}
                {{{ NoSelect }}}
            {{/if}}
        </div>
        `;
    }
}

export default withRouter(withStore(Messenger));
