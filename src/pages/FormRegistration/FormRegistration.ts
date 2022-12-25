import Block from "core/Block";
import Validation from "core/Validation";
import "./FormRegistration.css"

interface FormRegistrationProps {
    text: string
}

export class FormRegistration extends Block<Omit<FormRegistrationProps, "text">> {
    static componentName = "FormRegistration";

    constructor({text}: FormRegistrationProps) {
        super({text});
        this.setProps({
            onButtonClick: () => this.onButtonClick()
        })
    }

    onButtonClick() {
        new Validation().validForm(this.element as HTMLElement);
    }

    protected render(): string {
        return `
         <div class="registration">
            <div class="form-inner">
                <div class="form-inner-header">
                    <h2>{{ text }}</h2>
                </div>
                <div class="form-inner-body">
                    <form class="form-login">
                        {{{ Input type="text"     inputName="first_name"  label="Имя"         }}}
                        {{{ Input type="text"     inputName="second_name" label="Фамилия"     }}}
                        {{{ Input type="text"     inputName="login"       label="Логин"       }}}
                        {{{ Input type="email"    inputName="email"       label="Ваша почта"  }}}
                        {{{ Input type="password" inputName="password"    label="Ваш пароль"  }}}
                        {{{ Input type="tel"      inputName="phone"       label="Телефон"     }}}
                        {{{ Button text="Регистрация" onClick=onButtonClick }}}
                    </form>
                </div>
             </div>
         </div>
        `;
    }
}
