import Block from "core/Block";
import "./profileItem.css"

interface BlockProps {
    profile: ProfileItemProps
}

interface ProfileItemProps {
    active?: boolean
    name: string,
    message: messageProps
}

interface messageProps {
    [key: string]: string | number
}

export default class ProfileItem extends Block<BlockProps | object> {
    static componentName = "ProfileItem";

    constructor({...props}: BlockProps) {
        super({...props});
    }

    render() {
        /* eslint max-len: [1, 300] */
        return `
            <div class="profile {{#if this.profile.active}}active{{/if}}">
                <div class="img">
                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAQAAACQ9RH5AAAANklEQVR42u3NAQ0AAAgDIN8/oWk0hnODAqSnTkQsFovFYrFYLBaLxWKxWCwWi8VisVgsFn+KF/YRbt0rxAMbAAAAAElFTkSuQmCC" alt="Profile name" width="60" height="60">
                </div>
                <div class="info">
                    <p class="profile-name">{{ this.profile.name }}</p>
                    <p class="profile-message_preview">{{ this.profile.messages.text }}</p>
                </div>
                <div class="other">
                    <span class="time">{{ this.profile.messages.time }}</span>
                    {{#if this.profile.messages.count}}
                        <span class="profile-message-count">{{ this.profile.messages.count }}</span>
                    {{/if}}
                </div>
            </div>
        `;
    }
}
