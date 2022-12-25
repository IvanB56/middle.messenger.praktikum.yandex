import Block from "core/Block";
import "./defaultButton.css";

interface DefaultButtonProps {
    text: string;
    className?: string;
    onClick?: () => void;
}

export class DefaultButton extends Block<object> {
    static componentName = "DefaultButton";

    constructor({text}: DefaultButtonProps) {
        super({text});
    }

    protected render(): string {
        return `<button type="button" class="btn-default">{{ text }}</button>`;
    }
}
