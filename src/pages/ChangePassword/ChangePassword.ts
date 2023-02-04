import Block from "../../core/Block";
import {withRouter} from "../../utils/withRouter";
import {withStore} from "../../utils/withStore";
import {Router, Store} from "../../core";
import {Routes} from "../../routes";
import {changePassword, PasswordProps} from "../../services/profileSettings";
import Validation from "../../core/Validation";

interface ChangePasswordProps {
    router: Router;
    store: Store<AppState>;
    backToProfileInfo?: () => void,
    savePassword?: () => void
}

export class ChangePassword extends Block<ChangePasswordProps | object> {
    constructor(props: ChangePasswordProps) {
        super(props);
        this.setProps({
            backToProfileInfo: () => this.toProfileInfo(),
            savePassword: (e: Event) => this.savePassword(e)
        })
    }

    savePassword(e: Event) {
        e.preventDefault();
        const data: PasswordProps = new Validation().validForm(this.element as HTMLElement);
        if ("store" in this.props) {
            this.props.store.dispatch(changePassword, data);
        }
    }

    toProfileInfo() {
        if ("router" in this.props) {
            this.props.router.go(Routes.SETTINGS);
        }
    }

    protected render(): string {
        return `
            <div class="change-password">
                <div class="inner">
                    <div class="inner-header">
                        <h2>Сменить пароль</h2>
                    </div>
                    <div class="inner-body">
                        <form>
                            <div class="row">
                                 {{{ FormInput type="password" inputName="oldPassword" label="Старый пароль" }}}
                            </div>
                            <div class="row">
                                 {{{ FormInput type="password" inputName="newPassword" label="Новый пароль" }}}
                            </div>
                            <div class="button-back">
                                 {{{ DefaultButton text="Назад"  onClick=backToProfileInfo }}}
                            </div>
                            <span class="errorText" style="opacity: {{ store.state.errorOpacity }};">{{ store.state.loginFormError }}</span>
                            {{{ Button text="Сохранить" onClick=savePassword }}}
                        </form>
                    </div>
                </div>
            </div>
        `;
    }
}

export default withRouter(withStore(ChangePassword));
