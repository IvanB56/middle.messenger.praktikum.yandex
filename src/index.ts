import {registerComponent, renderDOM} from "./core";
import {Router, Store} from './core';
import {initApp} from './services/initApp';
import {defaultState} from './store';
import {initRouter} from './routes';
import Input from "./components/UI/input/input";
import Button from "./components/UI/button/button";
import Link from "./components/UI/link/link";
import SettingsButtons from "./components/UI/settingsButtons/settingsButtons";
import ChatItem from "./components/chatItem/chatItem";
import NoSelect from "./components/noSelect/noSelect";
import ChatMessages from "./components/chatMessages/chatMessages";
import MessageItem from "./components/messageItem/messageItem";
import FormInput from "./components/formInput/formInput";
import DefaultButton from "./components/UI/defaultButton/defaultButton";
import Error500 from "./pages/Services/error500";
import StartPage from "./pages/StartPage/StartPage";
import Chats from "./components/chats/chats";

registerComponent(Input)
registerComponent(Button)
registerComponent(Link)
registerComponent(SettingsButtons)
registerComponent(ChatItem)
registerComponent(NoSelect)
registerComponent(ChatMessages)
registerComponent(MessageItem)
registerComponent(FormInput)
registerComponent(DefaultButton)
registerComponent(Error500)
registerComponent(StartPage)
registerComponent(Chats)

document.addEventListener('DOMContentLoaded', () => {
    const store = new Store<AppState>(defaultState);
    const router = new Router();
    window.router = router;
    window.store = store;
    renderDOM(new StartPage({}));
    store.on('changed', (_, nextState) => {
        if (process.env.DEBUG) {
            console.log(nextState);
        }
    });
    initRouter(router, store);
    store.dispatch(initApp);
});
