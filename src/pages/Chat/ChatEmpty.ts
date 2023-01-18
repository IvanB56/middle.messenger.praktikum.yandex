import Block from "core/Block";
import {withRouter} from "utils/withRouter";
import {withStore} from "utils/withStore";
import {Router, Store} from "core";

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
            onClick: () => console.log(this.props)
        })
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
