import FormLogin from "pages/FormLogin/FormLogin";
import FormRegistration from "pages/FormRegistration/FormRegistration";
import StartPage from "pages/StartPage/StartPage";
import ChatEmpty from "pages/Chat/ChatEmpty";
import ProfileInfo from "pages/ProfileInfo/ProfileInfo";

export enum Screens {
    LOGIN = 'Login',
    REGISTRATION = 'Registration',
    START = 'StartPage',
    MAIN = 'ChatEmpty',
    SETTINGS = 'ProfileInfo',
}

export interface BlockClass<P extends object> extends Function {
    new(props: P): P;

    componentName: string;
}

const map: Record<Screens, BlockClass<any>> = {
    [Screens.LOGIN]: FormLogin,
    [Screens.REGISTRATION]: FormRegistration,
    [Screens.START]: StartPage,
    [Screens.MAIN]: ChatEmpty,
    [Screens.SETTINGS]: ProfileInfo
};

export const getScreenComponent = (screen: Screens) => {
    return map[screen];
};
