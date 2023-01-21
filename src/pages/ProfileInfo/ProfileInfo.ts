import Block from "core/Block";
import {withRouter} from "utils/withRouter";
import {withStore} from "utils/withStore";
import {logout} from "../../services/auth";
import {Router, Store} from "../../core";
import {Routes} from "../../routes";

interface ProfileInfoProps {
    router: Router;
    store: Store<AppState>;
}

export class ProfileInfo extends Block<ProfileInfoProps | object> {
    constructor(props: ProfileInfoProps) {
        super(props);
        if ("store" in this.props) {
            this.setProps({
                avatar: `https://ya-praktikum.tech/api/v2/resources/${this.props.store.getState().user?.avatar}`,
                onClick: () => this.logout(),
                backToMain: () => this.toMain(),
                toPassword: () => this.toPassword(),
                toData: () => this.toData(),
            })
        }
    }

    logout() {
        if ("store" in this.props) {
            this.props.store.dispatch(logout);
        }
    }

    toMain() {
        if ("router" in this.props) {
            this.props.router.go(Routes.MAIN);
        }
    }

    toPassword() {
        if ("router" in this.props) {
            this.props.router.go(Routes.PASSWORD);
        }
    }

    toData() {
        if ("router" in this.props) {
            this.props.router.go(Routes.EDIT);
        }
    }

    avatarChange(e: Event) {
        console.log(e)
    }

    protected render(): string {
        return `
            <div class="profile-info">
                <div class="inner">
                    <div class="inner-header">
                        <h2>Профиль</h2>
                    </div>
                    <div class="inner-body">
                        <div class="avatar">
                            {{#if store.state.user.avatar}}
                                <img src="{{ this.avatar }}" alt="">
                            {{else}}
                                <i class="fa fa-file-image-o" aria-hidden="true"></i>
                            {{/if}}
                            <div class="change-avatar-text">
                                <span>Поменять аватар</span>
                                {{{ Input type="file" inputName="avatar" }}}
                            </div>
                        </div>
                        <div class="row">
                            <span>Почта</span>
                            <span>{{ store.state.user.email }}</span>
                        </div>
                        <div class="row">
                            <span>Логин</span>
                            <span>{{ store.state.user.login }}</span>
                        </div>
                        <div class="row">
                            <span>Имя</span>
                            <span>{{ store.state.user.firstName }}</span>
                        </div>
                        <div class="row">
                            <span>Фамилия</span>
                            <span>{{ store.state.user.secondName }}</span>
                        </div>
                        <div class="row">
                            <span>Имя в чате</span>
                            <span>{{ store.state.user.displayName }}</span>
                        </div>
                        <div class="row">
                            <span>Телефон</span>
                            <span>{{ store.state.user.phone }}</span>
                        </div>
                        <div class="changeData">
                            {{{ DefaultButton text="Изменить данные" className='changeData-btn' onClick=toData }}}
                        </div>
                        <div class="changePassword">
                            {{{ DefaultButton text="Изменить пароль" className='changePassword-btn' onClick=toPassword }}}
                        </div>
                        <div class="button-exit">
                             {{{ DefaultButton text="Выйти"  onClick=onClick }}}
                        </div>
                        {{{ Button text="Закрыть" onClick=backToMain }}}
                    </div>
                </div>
            </div>
        `;
    }
}

export default withRouter(withStore(ProfileInfo));
