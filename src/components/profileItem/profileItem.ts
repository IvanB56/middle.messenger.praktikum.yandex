import Block from "core/Block";

interface BlockProps {
    profile: ProfileItemProps
}

interface ProfileItemProps {
    active?: boolean
    name: string,
    message: messageProps,
    avatar: string,
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
                    <img src="{{ this.profile.avatar }}" alt="Profile name" width="60" height="60" class="{{#unless this.user.avatar}}hidden{{/unless}}">
                </div>
                <div class="info">
                    <p class="profile-name">{{ this.profile.profile_name }}</p>
                    <p class="profile-message_preview">{{ this.profile.messages.text }}</p>
                </div>
                <div class="other">
                    <span class="time">{{ this.profile.last_message.time }}</span>
                    {{#if this.profile.messages.count}}
                        <span class="profile-message-count">{{ this.profile.unread_count }}</span>
                    {{/if}}
                </div>
            </div>
        `;
    }
}
