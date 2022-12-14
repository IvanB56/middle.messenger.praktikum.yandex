import Block from "core/Block";

interface FormInputProps {
    [key: string]: string
}

export default class FormInput extends Block<FormInputProps | object> {
    static componentName = "FormInput";

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
