import Block from "core/Block";
import "./formInput.css";

interface FormInputProps {
    [key: string]: string
}

export class FormInput extends Block<object> {
    constructor({type, inputName, placeholder, ...props}: FormInputProps) {
        super({type, inputName, placeholder, ...props});
    }

    protected render(): string {
        return `
            <div class="form-input">
                <label>
                    <span>{{ label }}</span>
                    {{{ Input type=type inputName=inputName placeholder=placeholder }}}
                     <span class="error">&nbsp;</span>
                </label>
            </div>
        `;
    }
}
