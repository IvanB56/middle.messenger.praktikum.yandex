import Router from '../Router/Router';

describe('core/Router', () => {
    const router = new Router();

    it('should be once', () => {
        const router2 = new Router();
        expect(router).toStrictEqual(router2);
    });

    it("should add routes", () => {
        const mock = jest.fn();
        router.use('/login', mock);
        router.use('/registration', mock);
        expect(Object.keys(router.routes).length).toEqual(2);
    });

    it('should be started', () => {
        router.start();
        expect(router.isStarted).toStrictEqual(true);
    });

    it('should navigate', () => {
        const mock = jest.fn();
        router.use('/login', mock);
        router.use('/registration', mock);
        router.start();
        router.go('/registration');
        expect(window.location.pathname).toStrictEqual('/registration');
        router.go('/login');
        expect(window.location.pathname).toStrictEqual('/login');
    });

})
