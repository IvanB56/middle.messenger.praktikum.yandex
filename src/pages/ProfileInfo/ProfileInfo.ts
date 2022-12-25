import Block from "core/Block";
import "./ProfileInfo.css";

export class ProfileInfo extends Block<object> {
    protected render(): string {
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
                            <span>pochta@yandex.ru</span>
                        </div>
                        <div class="row">
                            <span>Логин</span>
                            <span>Ivan Ivanov</span>
                        </div>
                        <div class="row">
                            <span>Имя</span>
                            <span>Иван</span>
                        </div>
                        <div class="row">
                            <span>Фамилия</span>
                            <span>Бурак</span>
                        </div>
                        <div class="row">
                            <span>Имя в чате</span>
                            <span>Иван</span>
                        </div>
                        <div class="row">
                            <span>Телефон</span>
                            <span>+7 (909) 967 30 30</span>
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
