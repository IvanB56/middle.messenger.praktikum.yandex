import Block from "core/Block";
import Validation from "core/Validation";
import "./FormLogin.css";

interface FormLoginProps {
    text: string
}

export class FormLogin extends Block<object> {
    static componentName = "FormLogin";

    constructor({text}: FormLoginProps) {
        super({text});
        this.setProps({
            onButtonClick: () => this.onButtonClick(),
        })
    }

    onButtonClick() {
        new Validation().validForm(this.element as HTMLElement);
    }

    protected render(): string {
        return `
         <div class="login">
            <div class="form-inner">
                <div class="form-inner-header">
                    <h2>{{ text }}</h2>
                </div>
                <div class="form-inner-body">
                    <form class="form-login">
                        {{{ FormInput type="text" label="Логин" inputName="login" }}}
                        {{{ FormInput type="password" inputName="password" label="Пароль" }}}
                        {{{ Link text="Ещё не зарегистрированы?" href="/registration" }}}
                        {{{ Button text="Войти" onClick=onButtonClick }}}
                    </form>
                </div>
             </div>
         </div>
        `;
    }
}
