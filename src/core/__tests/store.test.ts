import { Store } from '../Store';

describe('core/Store', () => {
    test('should set state', () => {
        const store = new Store({});

        store.set({ userId: 123 });

        expect(store.getState()).toStrictEqual({ userId: 123 })
    });

    it('should emit event', () => {
        const store = new Store({userId: -1});
        const mock = jest.fn();
        store.on('changed', mock);
        store.set({userId: 123});
        expect(mock).toHaveBeenCalled();
        expect(mock).toHaveBeenCalledWith({userId: -1}, {userId: 123});
        expect(mock).toHaveBeenCalledTimes(1);
    });
})
