import Block from "core/Block";
import {withRouter} from "utils/withRouter";
import {withStore} from "utils/withStore";
import {Router, Store} from "core";
import {logout} from "../../services/auth";

interface ChatEmptyProps {
    router: Router;
    store: Store<AppState>;
    profiles: profileProps[];
    user: UserDTO;
}

interface profileProps {
    "id": number,
    "title": string,
    "avatar": string,
    "unread_count": number,
    "last_message": {
        "user": { [key: string]: any }
    },
    "time": string,
    "content": string
}

export class ChatEmpty extends Block<ChatEmptyProps | object> {
    static componentName = "ChatEmpty";

    constructor(props: ChatEmptyProps) {
        super(props);
        this.setProps({
            onClick: () => this.logout(),
            user: this.props.store?.getState().user
        })
    }

    logout() {
        if ("store" in this.props) {
            this.props.store.dispatch(logout);
        }
    }


    render() {
        return `
        <div class="chat">
            {{{ Profiles profiles=this.profiles user=this.user onClick=onClick }}}
            {{{ NoSelect }}}
        </div>
        `;
    }
}

export default withRouter(withStore(ChatEmpty));
