import {Store} from 'core';
import {BlockClass} from './getScreenComponent'

type WithStateProps = { store: Store<AppState> };

export function withStore<P extends WithStateProps>(WrappedBlock: BlockClass<P>) {
    // @ts-expect-error No base constructor has the specified
    return class extends WrappedBlock<P> {
        public static componentName = WrappedBlock.componentName || WrappedBlock.name;

        constructor(props: P) {
            super({...props, store: window.store});
        }

        __onChangeStoreCallback = () => {
            // @ts-expect-error this is not typed
            this.setProps({...this.props, store: window.store});
        }

        componentDidMount(props: P) {
            super.componentDidMount(props);
            window.store.on('changed', this.__onChangeStoreCallback);
        }

        componentWillUnmount() {
            super.componentWillUnmount();
            window.store.off('changed', this.__onChangeStoreCallback);
        }

    } as BlockClass<Omit<P, 'store'>>;
}
