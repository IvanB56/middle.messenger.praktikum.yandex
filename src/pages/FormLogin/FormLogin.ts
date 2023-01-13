import Block from "core/Block";
import Validation from "core/Validation";
import {withStore} from "utils/withStore";
import {withRouter} from "utils/withRouter";
import {Router, Store} from "core";
import {Routes} from "../../routes";

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
            onLinkClick: (e: Event) => this.onNavigateRegistration(e)
        })
    }

    onButtonClick() {
        new Validation().validForm(this.element as HTMLElement);
    }

    onNavigateRegistration(event: Event) {
        event.preventDefault();
        console.log(123);
        this.props.router.go(Routes.REGISTRATION);
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
                        {{{ DefaultButton text="Ещё не зарегистрированы?" onClick=onLinkClick }}}
                        {{{ Button text="Войти" onClick=onButtonClick }}}
                    </form>
                </div>
             </div>
         </div>
        `;
    }
}

export default withRouter(withStore(FormLogin));
