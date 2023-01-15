import FormLogin from "pages/FormLogin/FormLogin";
import FormRegistration from "pages/FormRegistration/FormRegistration";
import StartPage from "pages/StartPage/StartPage";

export enum Screens {
    LOGIN = 'formLogin',
    REGISTRATION = 'formRegistration',
    START = 'StartPage'
}

export interface BlockClass<P extends object> extends Function {
    new(props: P): P;
    componentName: string;
}

const map: Record<Screens, BlockClass<any>> = {
    [Screens.LOGIN]: FormLogin,
    [Screens.REGISTRATION]: FormRegistration,
    [Screens.START]: StartPage
};

export const getScreenComponent = (screen: Screens) => {
    return map[screen];
};
