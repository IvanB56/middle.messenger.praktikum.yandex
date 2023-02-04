import Block from "../../core/Block";
import {Routes} from "../../routes";
import './chats.less';

interface ChatsProps {
    chats: ChatDTO[];
    user: UserDTO;
    avatar: string;
    onClick?: () => void;
}

export default class Chats extends Block<ChatsProps | object> {
    static componentName = "Chats";

    constructor({chats, user, avatar, ...props}: ChatsProps) {
        super({chats, user, avatar, ...props});
        this.setProps({
            onButtonClick: (e: Event) => this.onButtonClick(e),
        })
    }

    onButtonClick(event: Event) {
        event.preventDefault();
        window.router.go(Routes.SETTINGS);
    }

    protected render(): string {
        /* eslint max-len: [1, 300] */
        return `
            <div class="chats">
                <div class="chats-top">
                    <div class="row">
                        <div class="chats-top-info">
                            <div class="chats-top-info-left">
                                <div class="img">
                                    <img src="${this.props.avatar && this.props.avatar()}" alt="Profile img"  width="60"  class="{{#unless this.avatar}}hidden{{/unless}}">
                                </div>
                            </div>
                            <div class="chats-top-info-left">
                                <p class="profile-name">{{ this.user.firstName }} {{ this.user.secondName }}</p>
                            </div>
                        </div>
                        <div class="chats-settings">
                            {{{ SettingsButtons onClick=onButtonClick }}}
                        </div>
                    </div>
                    <div class="chats-create">
                      {{{ DefaultButton text="+" className="createButton" onClick=onClick }}}
                      {{{ Input type="text" inputName="createChat" placeholder="Создать чат" }}}
                    </div>
                </div>
                <div class="chats-body">
                    {{#each this.chats }}
                        {{{ ChatItem chat=this }}}
                    {{/each }}
                </div>
            </div>
        `;
    }
}
