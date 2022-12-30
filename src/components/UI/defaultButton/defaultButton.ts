import Block from "core/Block";

interface DefaultButtonProps {
    text: string;
    className?: string;
    onClick?: () => void;
}

export default class DefaultButton extends Block<DefaultButtonProps | object> {
    static componentName = "DefaultButton";

    constructor({text}: DefaultButtonProps) {
        super({text});
    }

    protected render(): string {
        return `<button type="button" class="btn-default">{{ text }}</button>`;
    }
}
