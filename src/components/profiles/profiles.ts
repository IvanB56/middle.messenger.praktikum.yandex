import Block from "core/Block";
import "./profiles.css";

interface ProfilesProps {
    profiles: profileProps;
}

interface messageProps {
    text: string
    time: string
    count: number
}

interface profileProps {
    name: string
    active?: boolean
    messages?: messageProps
}

export class Profiles extends Block<object> {
    static componentName = "Profiles";

    constructor({...props}: ProfilesProps) {
        super({...props});
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
                                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAQAAACQ9RH5AAAANklEQVR42u3NAQ0AAAgDIN8/oWk0hnODAqSnTkQsFovFYrFYLBaLxWKxWCwWi8VisVgsFn+KF/YRbt0rxAMbAAAAAElFTkSuQmCC" 
                                    alt="Profile img" 
                                    width="60" 
                                    height="60"
                                    >
                                </div>
                            </div>
                            <div class="profiles-top-info-left">
                                <p class="profile-name">Бурак Иван</p>
                                <p class="profile-status">Без статуса</p>
                            </div>
                        </div>
                        <div class="profiles-settings">
                            {{{ SettingsButtons }}}
                        </div>
                    </div>
                    <div class="profiles-search">
                      {{{ Input type="text" inputName="search" placeholder="Поиск чата" }}}
                    </div>
                </div>
                <div class="profiles-body">
                    {{#each this.profiles }}
                        {{{ ProfileItem profile=this }}}
                    {{/each }}
                </div>
            </div>
        `;
    }
}
