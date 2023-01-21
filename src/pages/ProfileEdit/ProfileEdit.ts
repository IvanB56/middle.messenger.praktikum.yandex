import Block from "core/Block";
import {withRouter} from "utils/withRouter";
import {withStore} from "utils/withStore";
import {Router, Store} from "core";
import {Routes} from "../../routes";
import Validation from "core/Validation";
import {change} from "../../services/auth";

interface ProfileEditProps {
    router: Router;
    store: Store<AppState>;
}

export class ProfileEdit extends Block<ProfileEditProps | object> {
    constructor(props: ProfileEditProps) {
        super(props);
        this.setProps({
            backToProfileInfo: () => this.toProfileInfo(),
            saveData: (e: Event) => this.saveData(e)
        })
    }

    saveData(e: Event) {
        e.preventDefault();
        console.log(123)
        const data: UserDTO = new Validation().validForm(this.element as HTMLElement);
        console.log(data)
        if (data) {
            const changeData = {
                "first_name": data['first_name'],
                "second_name": data['second_name'],
                "login": data['login'],
                "email": data['email'],
                "phone": data['phone'],
                "display_name": data['display_name'],
            };
            if ("store" in this.props) {
                this.props.store.dispatch(change, changeData);
            }
        }
    }

    toProfileInfo() {
        if ("router" in this.props) {
            this.props.router.go(Routes.SETTINGS);
        }
    }

    protected render(): string {
        return `
            <div class="profile-edit">
                <div class="inner">
                    <div class="inner-header">
                        <h2>Редактирование профиля</h2>
                    </div>
                    <div class="inner-body">
                        <form>
                            {{{ FormInput type="text"     inputName="first_name"   label="Имя"        value=store.state.user.firstName  }}}
                            {{{ FormInput type="text"     inputName="second_name"  label="Фамилия"    value=store.state.user.secondName }}}
                            {{{ FormInput type="text"     inputName="display_name" label="Имя в чате" value=store.state.user.displayName }}}
                            {{{ FormInput type="text"     inputName="login"        label="Логин"      value=store.state.user.login      }}}
                            {{{ FormInput type="email"    inputName="email"        label="Ваша почта" value=store.state.user.email      }}}
                            {{{ FormInput type="tel"      inputName="phone"        label="Телефон"    value=store.state.user.phone      }}}
                        </form>
                        <div class="button-back">
                                 {{{ DefaultButton text="Назад"  onClick=backToProfileInfo }}}
                            </div>
                        {{{ Button text="Сохранить" onClick=saveData }}}
                    </div>
                </div>
            </div>
        `;
    }
}

export default withRouter(withStore(ProfileEdit));
