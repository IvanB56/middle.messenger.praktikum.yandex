import Block from "core/Block";
import {withRouter} from "utils/withRouter";
import {withStore} from "utils/withStore";
import {Router, Store} from "core";
import {authApi} from "../../api/authAPI";
import {transformUser} from "utils/transformUser";
import {chatApi} from "./chatApi";

interface ChatEmptyProps {
    router: Router;
    store: Store<AppState>;
    profiles: profileProps[];
    user: UserDTO;
}

interface messageProps {
    [key: string]: string | number
}

interface profileProps {
    name: string
    active?: boolean
    messages: messageProps
}

export class ChatEmpty extends Block<ChatEmptyProps | object> {
    static componentName = "ChatEmpty";

    constructor({profiles, user, ...props}: ChatEmptyProps) {
        super({profiles, user, ...props});
        Promise.all([this.getProfiles(), this.getUser()]).then(([profiles, user]) => {
            this.setProps({profiles, user});
        });
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
