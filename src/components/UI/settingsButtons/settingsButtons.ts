import Block from "core/Block";

interface SettingsButtonsProps {
    onClick?: () => void;
}

export default class SettingsButtons extends Block<SettingsButtonsProps | object> {
    static componentName = 'SettingsButtons'

    constructor({onClick, ...props}: SettingsButtonsProps) {
        super({events: {click: onClick}, ...props});
    }

    protected render(): string {
        return `<button class="btn-settings">
                    <i class="fa fa-cog" aria-hidden="true"></i>
                </button>
        `;
    }
}
