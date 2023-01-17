import Block from "core/Block";
import {withRouter} from "utils/withRouter";
import {withStore} from "utils/withStore";
import {Router, Store} from "core";
import {authApi} from "../../api/authAPI";
import {transformUser} from "utils/transformUser";

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

        this.setProps({
            user: transformUser(this.getUser() as unknown as UserDTO)
        });

        console.log(this.props.store)
    }

    getUser() {
        return authApi.user();
    }

    render() {
        return `
        <div class="chat">
            {{{ Profiles profiles=this.profiles user=this.props.user }}}
            {{{ NoSelect }}}
        </div>
        `;
    }
}

export default withRouter(withStore(ChatEmpty));
