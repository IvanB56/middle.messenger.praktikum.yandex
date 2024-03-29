import EventBus from "../core/event-bus";
import { v4 as uuidv4 } from 'uuid';
import Handlebars from "handlebars";

interface BlockMeta<P extends object> {
    props?: P;
}

type Events = Values<typeof Block.EVENTS>;

export default class Block<P extends object> {
    static EVENTS = {
        INIT: "init",
        FLOW_CDM: "flow:component-did-mount",
        FLOW_CDU: "flow:component-did-update",
        FLOW_RENDER: "flow:render",
    } as const;
    public id: string = uuidv4();
    readonly _meta: BlockMeta<P>;
    protected _element: Nullable<HTMLElement> = null;
    protected readonly props: P;
    protected children: { [id: string]: Block<object> } = {};
    eventBus: () => EventBus<Events>;
    state: object = {};
    protected refs: { [key: string]: HTMLElement } = {};
    static componentName: string;

    public constructor(props?: P) {
        const eventBus = new EventBus<Events>();
        this._meta = {
            props,
        };
        this.getStateFromProps()
        this.props = this._makePropsProxy(props as P) as P;
        this.state = this._makePropsProxy(this.state);
        this.eventBus = () => eventBus;
        this._registerEvents(eventBus);
        eventBus.emit(Block.EVENTS.INIT, this.props);
    }

    private _registerEvents(eventBus: EventBus<Events>) {
        eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
        eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
    }

    _createResources() {
        this._element = Block._createDocumentElement("div");
    }

    protected getStateFromProps(): void {
        this.state = {};
    }

    init() {
        this._createResources();
        this.eventBus().emit(Block.EVENTS.FLOW_RENDER, this.props);
    }

    private _componentDidMount() {
        this.componentDidMount();
    }

    componentDidMount() {
        return;
    }

    private _componentDidUpdate() {
        const response = this.componentDidUpdate();
        if (!response) {
            return;
        }
        this._render();
    }

    componentDidUpdate() {
        return true;
    }

    setProps = (nextProps: P) => {
        if (!nextProps) {
            return;
        }
        Object.assign(this.props, nextProps);
    };

    setState = (nextState: object) => {
        if (!nextState) {
            return;
        }
        Object.assign(this.state, nextState);
    };

    get element() {
        return this._element;
    }

    private _render() {
        const fragment = this._compile();
        this._removeEvents();
        const newElement = fragment.firstElementChild;
        if (this._element && newElement) {
            this._element.replaceWith(newElement);
        }
        this._element = newElement as HTMLElement;
        this._addEvents();
    }

    protected render(): string {
        return "";
    }

    getContent(): HTMLElement {
        if (this.element?.parentNode?.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
            setTimeout(() => {
                if (this.element?.parentNode?.nodeType !== Node.DOCUMENT_FRAGMENT_NODE) {
                    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
                }
            }, 100)
        }
        return this.element as HTMLElement;
    }

    private _makePropsProxy(props: object): object {
        return new Proxy(props as unknown as object, {
            get: (target: Record<string, unknown>, prop: string) => {
                const value = target[prop];
                return typeof value === "function" ? value.bind(target) : value;
            },
            set: (target: Record<string, unknown>, prop: string, value: unknown) => {
                target[prop] = value;
                this.eventBus().emit(Block.EVENTS.FLOW_CDU, {...target}, target);
                return true;
            },
            deleteProperty() {
                throw new Error("Нет доступа");
            },
        }) as unknown as P;
    }

    private static _createDocumentElement(tagName: string) {
        return document.createElement(tagName);
    }

    private _removeEvents() {
        const {events} = (this.props as { events: object });
        if (!events || !this._element) {
            return;
        }
        Object.entries(events).forEach(([event, listener]) => {
            if (this._element) {
                this._element.removeEventListener(event, listener);
            }
        });
    }

    private _addEvents() {
        const {events} = (this.props as { events: object });
        if (!events) {
            return;
        }
        Object.entries(events).forEach(([event, listener]) => {
            if (this._element) {
                this._element.addEventListener(event, listener);
            }
        });
    }

    private _compile(): DocumentFragment {
        const fragment = document.createElement("template");
        const template = Handlebars.compile(this.render());
        fragment.innerHTML = template({...this.state, ...this.props, children: this.children, refs: this.refs});
        Object.entries(this.children).forEach(([id, component]) => {
            const stub = fragment.content.querySelector(`[data-id="${id}"]`);
            if (!stub) {
                return;
            }
            const stubChilds = stub.childNodes.length ? stub.childNodes : [];
            const content = component.getContent();
            stub.replaceWith(content);
            const layoutContent = content.querySelector("[data-layout=\"1\"]");
            if (layoutContent && stubChilds.length) {
                layoutContent.append(...stubChilds);
            }
        });
        return fragment.content;
    }

    show() {
        this.getContent().style.display = "block";
    }

    hide() {
        this.getContent().style.display = "none";
    }
}
