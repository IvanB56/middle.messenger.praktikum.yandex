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

export class ProfileItem extends Block<object> {
    static componentName = "ProfileItem";

    constructor({...props}: BlockProps) {
        super({
            avatar: new URL("../../static/placeholder_60x60.png", import.meta.url),
            ...props
        });
    }

    render() {
        return `
            <div class="profile {{#if this.profile.active}}active{{/if}}">
                <div class="img">
                    <img src={{ this.avatar }} alt="Profile name" width="60" height="60">
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
