import Block from "core/Block";
import Validation from "core/Validation";

interface FormRegistrationProps {
    text: string
}

export default class FormRegistration extends Block<Omit<FormRegistrationProps, "text">> {
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
                        {{{ FormInput type="text"     inputName="first_name"  label="Имя"         }}}
                        {{{ FormInput type="text"     inputName="second_name" label="Фамилия"     }}}
                        {{{ FormInput type="text"     inputName="login"       label="Логин"       }}}
                        {{{ FormInput type="email"    inputName="email"       label="Ваша почта"  }}}
                        {{{ FormInput type="password" inputName="password"    label="Ваш пароль"  }}}
                        {{{ FormInput type="tel"      inputName="phone"       label="Телефон"     }}}
                        {{{ Button text="Регистрация" onClick=onButtonClick }}}
                    </form>
                </div>
             </div>
         </div>
        `;
    }
}
