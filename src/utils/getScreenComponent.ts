import FormLogin from "pages/FormLogin/FormLogin";
import FormRegistration from "pages/FormRegistration/FormRegistration";
import StartPage from "pages/StartPage/StartPage";
import Messenger from "pages/Messenger/Messenger";
import ProfileInfo from "pages/ProfileInfo/ProfileInfo";
import Error404 from "pages/Services/error404";
import ChangePassword from "pages/ChangePassword/ChangePassword";
import ProfileEdit from "../pages/ProfileEdit/ProfileEdit";


export enum Screens {
    LOGIN = 'Login',
    REGISTRATION = 'Registration',
    START = 'StartPage',
    MAIN = 'Messenger',
    SETTINGS = 'ProfileInfo',
    NOTFOUND = 'error404',
    PASSWORD = 'ChangePassword',
    EDIT = 'ProfileEdit',
}

export interface BlockClass<P extends object> extends Function {
    new(props: P): P;

    componentName: string;
}

const map: Record<Screens, BlockClass<any>> = {
    [Screens.LOGIN]: FormLogin,
    [Screens.REGISTRATION]: FormRegistration,
    [Screens.START]: StartPage,
    [Screens.MAIN]: Messenger,
    [Screens.SETTINGS]: ProfileInfo,
    [Screens.NOTFOUND]: Error404,
    [Screens.PASSWORD]: ChangePassword,
    [Screens.EDIT]: ProfileEdit,
};

export const getScreenComponent = (screen: Screens) => {
    return map[screen];
};
