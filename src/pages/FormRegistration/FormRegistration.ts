import Block from "core/Block";
import Validation from "core/Validation";
import {withRouter} from "utils/withRouter";
import {withStore} from "utils/withStore";
import {registrationApi} from "./registrationAPI";
import {Router, Store} from "../../core";

interface FormRegistrationProps {
    router: Router;
    store: Store<AppState>;
    text: string,
}

export class FormRegistration extends Block<FormRegistrationProps | object> {
    static componentName = "FormRegistration";

    constructor({text}: FormRegistrationProps) {
        super({text});
        this.setProps({
            onButtonClick: () => this.onButtonClick()
        })
    }

    async onButtonClick() {
        const data: string | undefined = new Validation().validForm(this.element as HTMLElement);
        if (data) {
            await registrationApi.registration(data);
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
