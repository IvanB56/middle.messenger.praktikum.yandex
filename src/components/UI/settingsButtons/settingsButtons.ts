import Block from "core/Block";

export default class SettingsButtons extends Block<object> {
    protected render(): string {
        return `<a href="/settings" class="btn-settings">
                    <i class="fa fa-cog" aria-hidden="true"></i>
                </a>
        `;
    }
}
