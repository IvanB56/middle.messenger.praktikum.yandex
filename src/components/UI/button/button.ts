import Block from "core/Block";
import "./button.css";

interface ButtonProps {
    text: string;
    className?: string;
    onClick: () => void;
}

export default class Button extends Block<object> {
    static componentName = "Button";

    constructor({text, className, onClick}: ButtonProps) {
        super({text, className, events: {click: onClick}});
    }

    protected render(): string {
        return `
             <div class="form-button {{ className }}">
                <button type="button">{{text}}</button>
            </div>
            `;
    }
}
