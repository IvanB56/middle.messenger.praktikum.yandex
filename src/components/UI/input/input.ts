import Block from "core/Block"
import Validation from "core/Validation";
import {changeAvatar} from "../../../services/auth";

interface InputProps {
    [keys: string]: string;
}

export default class Input extends Block<object> {
    private readonly name: string | undefined;
    static componentName = "Input";

    constructor({type = "text", placeholder, inputName, label, value, ...props}: InputProps) {
        super({type, placeholder, inputName, label, value, ...props});
        this.name = inputName;
        this.setProps({
            events: {
                focus: () => this.inputFocus(),
                blur: () => this.validateField(),
                change: () => this.changeAvatar(),
                keydown: (e: KeyboardEvent) => this.keyUp(e, this)
            }
        })
    }

    keyUp(e: KeyboardEvent, self: this) {
        if (e.key === "Enter") {
            e.preventDefault();
            self.validateField();
        }
    }

    inputFocus() {
        const nextElement = (this.element as HTMLElement).nextElementSibling as HTMLElement;
        if (this.element && nextElement) {
            nextElement.textContent = '';
            this.element.removeAttribute('data-is-valid');
        }
    }

    validateField() {
        const child = document.querySelector(`[name=${this.name}]`) as HTMLElement;
        new Validation().validField(child);
    }

    changeAvatar() {
        const avatarField = document.querySelector(`[name=avatar]`) as HTMLInputElement;
        if (avatarField && avatarField.files) {
            const formData = new FormData();
            formData.append('avatar', avatarField.files[0]);
            window.store.dispatch(changeAvatar, formData);
        }
    }

    protected render(): string {
        return `
            <input type={{ type }} name={{ inputName }} placeholder="{{ placeholder }}"  autocomplete="off" class="{{ className }}" value="{{ value }}"> 
        `;
    }
}
