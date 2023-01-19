import {Store, renderDOM, Router} from 'core';
import {getScreenComponent, Screens} from 'utils/getScreenComponent';

export enum Routes {
    MAIN = '/',
    LOGIN = '/login',
    REGISTRATION = '/registration',
    AUTH = '/chat-empty',
    SETTINGS = '/settings',
}

const routes = [
    {
        path: Routes.MAIN,
        block: Screens.MAIN,
        shouldAuthorized: true,
    },
    {
        path: Routes.LOGIN,
        block: Screens.LOGIN,
        shouldAuthorized: false,
    },
    {
        path: Routes.REGISTRATION,
        block: Screens.REGISTRATION,
        shouldAuthorized: false,
    },
    {
        path: Routes.SETTINGS,
        block: Screens.SETTINGS,
        shouldAuthorized: true,
    }
];

export function initRouter(router: Router, store: Store<AppState>) {
    routes.forEach(route => {
        router.use(route.path, () => {
            const isAuthorized = Boolean(store.getState().user);
            const currentScreen = Boolean(store.getState().screen);
            if (isAuthorized || !route.shouldAuthorized) {
                store.dispatch({screen: route.block});
                return;
            }
            if (!currentScreen) {
                store.dispatch({screen: Screens.LOGIN});
            }
        });
    });

    store.on('changed', (prevState: any, nextState: any): void => {
        if (prevState && nextState) {
            if (!prevState.appIsInited && nextState.appIsInited) {
                router.start();
            }

            if (prevState.screen !== nextState.screen) {
                const Page = getScreenComponent(nextState.screen);
                renderDOM(new Page({}));
                document.title = `App / ${Page.componentName}`;
            }
        }
    });
}
