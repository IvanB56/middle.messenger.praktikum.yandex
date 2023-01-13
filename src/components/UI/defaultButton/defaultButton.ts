import Block from "core/Block";

interface DefaultButtonProps {
    text: string;
    className?: string;
    onClick?: () => void;
}

export default class DefaultButton extends Block<DefaultButtonProps | object> {
    static componentName = "DefaultButton";

    constructor({text, onClick}: DefaultButtonProps) {
        super({text, events: {click: onClick}});
    }

    protected render(): string {
        return `<button type="button" class="btn-default">{{ text }}</button>`;
    }
}
