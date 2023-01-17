import Validation from "core/Validation";
import {withStore} from "utils/withStore";
import {withRouter} from "utils/withRouter";
import {Router, Store, Block} from "core";
import {Routes} from "../../routes";
import {loginApi} from "./loginApi";
import {transformUser} from "utils/transformUser";

interface FormLoginProps {
    router: Router;
    store: Store<AppState>;
    text: string
}


export class FormLogin extends Block<FormLoginProps | object> {
    static componentName = "FormLogin";

    constructor({text, ...props}: FormLoginProps) {
        super({text, ...props});
        this.setProps({
            onButtonClick: () => this.onButtonClick(),
            onLinkClick: (e: Event) => this.onNavigateRegistration(e),
            errorOpacity: 0
        })
    }

    async onButtonClick() {
        const data: string | undefined = new Validation().validForm(this.element as HTMLElement);
        if (data) {
            const response = await loginApi.login(data);
            if (response.reason) {
                this.setProps({
                    errorOpacity: 1,
                    error: response.reason
                });
                setTimeout(() => this.hideError(), 2000);
            } else {
                if ("store" in this.props) {
                    const user = await loginApi.login(data);
                    this.props.store.dispatch({user: transformUser(user as unknown as UserDTO)});
                }
                if ("router" in this.props) {
                    this.props.router.go(Routes.MAIN);
                }
            }
        }
    }

    hideError() {
        this.setProps({
            errorOpacity: 0,
            error: ''
        })
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
                        <span class="errorText" style="opacity: {{ errorOpacity }};">{{ error }}</span>
                        {{{ Button text="Войти" onClick=onButtonClick }}}
                    </form>
                </div>
             </div>
         </div>
        `;
    }
}

export default withRouter(withStore(FormLogin));
