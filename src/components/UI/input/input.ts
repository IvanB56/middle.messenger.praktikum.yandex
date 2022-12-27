import Block from "core/Block"
import Validation from "core/Validation";

interface InputProps {
    [keys: string]: string;
}

export default class Input extends Block<object> {
    private readonly name: string | undefined;
    static componentName = "Input";

    constructor({type = "text", placeholder, inputName, label, ...props}: InputProps) {
        super({type, placeholder, inputName, label, ...props});
        this.name = inputName;
        this.setProps({
            events: {
                change: () => this.validateField()
            }
        })
    }

    validateField() {
        const child = document.querySelector(`[name=${this.name}]`) as HTMLElement;
        new Validation().validField(child);
    }

    protected render(): string {
        return `
            <input type={{ type }} name={{ inputName }} placeholder="{{ placeholder }}"  autocomplete="off" class={{ className }}> 
        `;
    }
}
