import Block from "core/Block";
import {withRouter} from "utils/withRouter";
import {withStore} from "utils/withStore";
import {Router, Store} from "core";
import {authApi} from "../../api/authAPI";
import {chatApi} from "./chatApi";

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

    constructor({profiles, user, ...props}: ChatEmptyProps) {
        super({profiles, user, ...props});
    }

    getUser() {
        return authApi.user().then(r => JSON.parse(r.responseText));
    }

    getProfiles() {
        return chatApi.getProfiles().then(r => JSON.parse(r.responseText));
    }

    render() {
        return `
        <div class="chat">
            {{{ Profiles profiles=this.profiles user=this.user }}}
            {{{ NoSelect }}}
        </div>
        `;
    }
}

export default withRouter(withStore(ChatEmpty));
