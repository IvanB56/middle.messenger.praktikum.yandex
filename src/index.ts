import {renderDOM, registerComponent} from "core";

import {ChatEmpty, ChatActive} from "pages/Chat";
import FormLogin from "pages/FormLogin";
import FormRegistration from "pages/FormRegistration";
import {Error404, Error500} from "pages/Services";
import Input from "components/UI/input";
import Button from "components/UI/button";
import Link from "components/UI/link";
import Profiles from "components/profiles";
import SettingsButtons from "components/UI/settingsButtons/";
import ProfileItem from "components/profileItem/";
import NoSelect from "components/noSelect/";
import ChatMessages from "components/chatMessages/";
import MessageItem from "components/messageItem";
import FormInput from "components/formInput";
import ProfileInfo from "pages/ProfileInfo";
import DefaultButton from "components/UI/defaultButton";

registerComponent(ChatEmpty);
registerComponent(ChatActive);
registerComponent(FormLogin);
registerComponent(FormRegistration);
registerComponent(Error404);
registerComponent(Error500);
registerComponent(Profiles);
registerComponent(NoSelect);
registerComponent(Input);
registerComponent(Button);
registerComponent(SettingsButtons);
registerComponent(Link);
registerComponent(ProfileItem);
registerComponent(ChatMessages);
registerComponent(MessageItem);
registerComponent(FormInput);
registerComponent(DefaultButton);

document.addEventListener("DOMContentLoaded", () => {
    const pathName = window.location.pathname;
    if (pathName === "/FormLogin") {
        renderDOM(new FormLogin({text: "Авторизация"}));
    } else if (pathName === "/registration") {
        renderDOM(new FormRegistration({text: "Регистрация"}));
    } else if (pathName === "/404") {
        renderDOM(new Error404({}));
    } else if (pathName === "/500") {
        renderDOM(new Error500({}));
    } else if (pathName === "/chat-empty") {
        renderDOM(new ChatEmpty({
            "profiles": [
                {
                    "name": "Вася",
                    "messages": {
                        text: "Lorem Ipsum is simply dummy text of the p",
                        time: "12:33",
                        count: 0
                    }
                },
                {
                    "name": "Петр",
                    "messages": {
                        text: "text message 2",
                        time: "10:12",
                        count: 2
                    }
                },
                {
                    "name": "Алёна",
                    "messages": {
                        text: "text message 3",
                        time: "14:16",
                        count: 0
                    }
                }
            ]
        }));
    } else if (pathName === "/chat-active") {
        renderDOM(new ChatActive({
            "profiles": [
                {
                    "name": "Вася",
                    active: true,
                    "messages": {
                        text: "Lorem Ipsum is simply dummy text of the p",
                        time: "12:33",
                        count: 0
                    }
                },
                {
                    "name": "Петр",
                    "messages": {
                        text: "text message 2",
                        time: "10:12",
                        count: 2
                    }
                },
                {
                    "name": "Алёна",
                    "messages": {
                        text: "text message 3",
                        time: "14:16",
                        count: 0
                    }
                }
            ]
        }));
    } else if (pathName === "/settings") {
        renderDOM(new ProfileInfo({}));
    }
});
