import Validation from "../../core/Validation";
import {withStore} from "../../utils/withStore";
import {withRouter} from "../../utils/withRouter";
import {Router, Store, Block} from "../../core";
import {Routes} from "../../routes";
import {login} from "../../services/auth";
import './FormLogin.less';

interface FormLoginProps {
    router: Router;
    store: Store<AppState>;
    text: string;
    onButtonClick: () => void;
    onLinkClick: () => void;
}


export class FormLogin extends Block<FormLoginProps> {
    static componentName = "FormLogin";

    constructor({text, ...props}: FormLoginProps) {
        super({text, ...props});
        this.setProps({
            onButtonClick: () => this.onButtonClick(),
            onLinkClick: (e: Event) => this.onNavigateRegistration(e),
        })
    }

    onButtonClick() {
        const data: { login: string, password: string } = new Validation().validForm(this.element as HTMLElement);
        if (data) {
            const loginData = {
                login: data.login,
                password: data.password
            };
            if ("store" in this.props) {
                this.props.store.dispatch(login, loginData);
            }
        }
    }

    onNavigateRegistration(event: Event) {
        event.preventDefault();
        if ("router" in this.props) {
            this.props.router.go(Routes.REGISTRATION);
        }
    }

    protected render(): string {
        return `
         <div class="login">
            <div class="form-inner">
                <div class="form-inner-header">
                    <h2>Авторизация</h2>
                </div>
                <div class="form-inner-body">
                    <form class="form-login">
                        {{{ FormInput type="text" label="Логин" inputName="login" }}}
                        {{{ FormInput type="password" inputName="password" label="Пароль" }}}
                        <div>
                            {{{ DefaultButton text="Ещё не зарегистрированы?" onClick=onLinkClick }}}
                        </div>
                        <span class="errorText" style="opacity: {{ store.state.errorOpacity }};">{{ store.state.loginFormError }}</span>
                        {{{ Button text="Войти" onClick=onButtonClick }}}
                    </form>
                </div>
             </div>
         </div>
        `;
    }
}

export default withRouter(withStore(FormLogin));
