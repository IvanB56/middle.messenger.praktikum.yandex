import FormLogin from "pages/FormLogin/FormLogin";
import FormRegistration from "pages/FormRegistration/FormRegistration";
import StartPage from "pages/StartPage/StartPage";
import {ChatEmpty} from "pages/Chat/ChatEmpty";

export enum Screens {
    LOGIN = 'Login',
    REGISTRATION = 'Registration',
    START = 'StartPage',
    MAIN = 'ChatEmpty',
}

export interface BlockClass<P extends object> extends Function {
    new(props: P): P;

    componentName: string;
}

const map: Record<Screens, BlockClass<any>> = {
    [Screens.LOGIN]: FormLogin,
    [Screens.REGISTRATION]: FormRegistration,
    [Screens.START]: StartPage,
    [Screens.MAIN]: ChatEmpty
};

export const getScreenComponent = (screen: Screens) => {
    return map[screen];
};
