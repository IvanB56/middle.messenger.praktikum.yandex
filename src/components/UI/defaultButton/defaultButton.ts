import Block from "../../../core/Block";
import './defaultButton.less';

interface DefaultButtonProps {
    text: string;
    className?: string;
    onClick?: () => void;
}

export default class DefaultButton extends Block<DefaultButtonProps | object> {
    static componentName = "DefaultButton";

    constructor({text, onClick, ...props}: DefaultButtonProps) {
        super({text, events: {click: onClick}, ...props});
    }

    protected render(): string {
        return `<button type="button" class="btn-default {{ this.className }}">{{ text }}</button>`;
    }
}
