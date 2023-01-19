import Block from "core/Block";
import {withRouter} from "utils/withRouter";
import {withStore} from "utils/withStore";

export class ProfileInfo extends Block<object> {
    protected render(): string {
        console.log(this.props.store)
        return `
            <div class="profile-info">
                <div class="inner">
                    <div class="inner-header">
                        <h2>Профиль</h2>
                    </div>
                    <div class="inner-body">
                        <div class="change-avatar">
                            <i class="fa fa-file-image-o" aria-hidden="true"></i>
                            <div class="change-avatar-text"><span>Поменять аватар</span></div>
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
                        <div class="change-data">
                            <a href="#">Изменить данные</a>
                        </div>
                        <div class="change-password">
                            <a href="#">Изменить пароль</a>
                        </div>
                        <div class="button-exit">
                             {{{ DefaultButton text="Выйти" }}}
                        </div>
                        {{{ Button text="Закрыть" }}}
                    </div>
                </div>
            </div>
        `;
    }
}

export default withRouter(withStore(ProfileInfo));
