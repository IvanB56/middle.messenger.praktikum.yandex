import Block from "core/Block";
import {Routes} from "../../routes";

interface ProfilesProps {
    profiles: profileProps[] | [];
    user: UserDTO;
    onClick?: () => void
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

export default class Profiles extends Block<ProfilesProps | object> {
    static componentName = "Profiles";

    constructor({profiles, user, ...props}: ProfilesProps) {
        super({profiles, user, ...props});
        this.setProps({
            onButtonClick: (e: Event) => this.onButtonClick(e)
        })
    }

    onButtonClick(event: Event) {
        console.log(123)
        event.preventDefault();
        window.router.go(Routes.SETTINGS);
    }

    protected render(): string {
        /* eslint max-len: [1, 300] */
        return `
            <div class="profiles">
                <div class="profiles-top">
                    <div class="row">
                        <div class="profiles-top-info">
                            <div class="profiles-top-info-left">
                                <div class="img">
                                    <img src="{{ this.user.avatar }}" alt="Profile img"  width="60"  height="60" class="{{#unless this.user.avatar}}hidden{{/unless}}">
                                </div>
                            </div>
                            <div class="profiles-top-info-left">
                                <p class="profile-name">{{ this.user.firstName }} {{ this.user.secondName }}</p>
                            </div>
                        </div>
                        <div class="profiles-settings">
                            {{{ SettingsButtons onClick=onButtonClick }}}
                        </div>
                    </div>
                    <div class="profiles-search">
                      {{{ Input type="text" inputName="search" placeholder="Поиск чата" }}}
                    </div>
                </div>
                <div class="profiles-body">
                    {{#if this.profiles.length}}
                        {{#each this.profiles }}
                            {{{ ProfileItem profile=this }}}
                        {{/each }}
                    {{else}}
                        {{{ DefaultButton text="Выйти" className="text-center m-auto" onClick=onClick }}}
                    {{/if}}
                </div>
            </div>
        `;
    }
}
