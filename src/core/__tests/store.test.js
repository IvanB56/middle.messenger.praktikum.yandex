import { Store } from '../Store';

describe('core/Store', () => {
    test('should set state', () => {
        const store = new Store({});

        store.set({ userId: 123 });

        expect(store.getState()).toStrictEqual({ userId: 123 })
    });
})
