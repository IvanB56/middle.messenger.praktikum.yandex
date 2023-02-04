import Block from "../../core/Block";
import Validation from "../../core/Validation";
import {withRouter} from "../../utils/withRouter";
import {withStore} from "../../utils/withStore";
import {Router, Store} from "../../core";
import {create} from "../../services/auth";

interface FormRegistrationProps {
    router: Router;
    store: Store<AppState>;
    text: string,
    onButtonClick?: () => void
}

export class FormRegistration extends Block<FormRegistrationProps> {
    static componentName = "FormRegistration";

    constructor(props: FormRegistrationProps) {
        super(props);
        this.setProps({
            onButtonClick: () => this.onButtonClick(),
            ...props
        })
    }

    async onButtonClick() {
        const data: UserDTO | undefined = new Validation().validForm(this.element as HTMLElement);
        if (data) {
            const registrationData = {
                "first_name": data['first_name'],
                "second_name": data['second_name'],
                "login": data['login'],
                "email": data['email'],
                "password": data['password'],
                "phone": data['phone']
            };
            if ("store" in this.props) {
                this.props.store.dispatch(create, registrationData);
            }
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
                        <span class="errorText" style="opacity: {{ store.state.errorOpacity }};">{{ store.state.loginFormError }}</span>
                        {{{ Button text="Регистрация" onClick=onButtonClick }}}
                    </form>
                </div>
             </div>
         </div>
        `;
    }
}

export default withRouter(withStore(FormRegistration));
