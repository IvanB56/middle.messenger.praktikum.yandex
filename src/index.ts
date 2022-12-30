import {renderDOM, registerComponent} from "core";

import ChatEmpty from "pages/Chat/ChatEmpty";
import ChatActive from "pages/Chat/ChatActive";
import FormLogin from "pages/FormLogin/FormLogin";
import FormRegistration from "pages/FormRegistration/FormRegistration";
import Error404 from "pages/Services/error404";
import Error500 from "pages/Services/error500";
import Input from "components/UI/input/input";
import Button from "components/UI/button/button";
import Link from "components/UI/link/link";
import Profiles from "components/profiles/profiles";
import SettingsButtons from "components/UI/settingsButtons/settingsButtons";
import ProfileItem from "components/profileItem/profileItem";
import NoSelect from "components/noSelect/noSelect";
import ChatMessages from "components/chatMessages/chatMessages";
import MessageItem from "components/messageItem/messageItem";
import FormInput from "components/formInput/formInput";
import ProfileInfo from "pages/ProfileInfo/ProfileInfo";
import DefaultButton from "components/UI/defaultButton/defaultButton";

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
    if (pathName === "/login") {
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
