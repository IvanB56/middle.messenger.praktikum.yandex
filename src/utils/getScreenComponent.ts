import FormLogin from "pages/FormLogin/FormLogin";
import FormRegistration from "pages/FormRegistration/FormRegistration";
import StartPage from "pages/StartPage/StartPage";
import {ChatEmpty} from "../pages/Chat/ChatEmpty";

export enum Screens {
    LOGIN = 'formLogin',
    REGISTRATION = 'formRegistration',
    START = 'StartPage',
    AUTH = 'ChatEmpty',
}

export interface BlockClass<P extends object> extends Function {
    new(props: P): P;

    componentName: string;
}

const map: Record<Screens, BlockClass<any>> = {
    [Screens.LOGIN]: FormLogin,
    [Screens.REGISTRATION]: FormRegistration,
    [Screens.START]: StartPage,
    [Screens.AUTH]: ChatEmpty
};

export const getScreenComponent = (screen: Screens) => {
    return map[screen];
};
