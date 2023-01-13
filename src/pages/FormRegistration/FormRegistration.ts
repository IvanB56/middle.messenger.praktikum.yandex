import Block from "core/Block";
import Validation from "core/Validation";
import {withRouter} from "utils/withRouter";
import {withStore} from "utils/withStore";
import {registrationApi} from "./registrationAPI";

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

    async onButtonClick() {
        const data: RegistrationRequest | undefined = new Validation().validForm(this.element as HTMLElement);
        if (data) {
            const response = await registrationApi.registration(JSON.stringify(data));
            console.log(response)
        }
    }

    protected render(): string {
        return `
         <div class="registration">
            <div class="form-inner">
                <div class="form-inner-header">
                    <h2>Регистрация</h2>
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

export default withRouter(withStore(FormRegistration));
