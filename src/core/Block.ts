import EventBus from "./EventEmmiter";
import {v4 as makeUUID} from 'uuid';
import Handlebars from "handlebars";

type PropsType = Record<string, unknown>;
type MetaType = {
    tagName: string;
    props: PropsType;
}
export default class Block {
    static EVENTS = {
        INIT: "init",
        FLOW_CDM: "flow:component-did-mount",
        FLOW_RENDER: "flow:render",
        FLOW_CDU: "flow:component-did-update"
    };

    eventBus: () => EventBus;

    props: Record<string, unknown>;
    children: Record<string, Block | Block[]>;
    _element: HTMLElement | HTMLAnchorElement| null = null;
    _meta: MetaType | null = null;
    _id: string | null = null;

    constructor(tagName: string = "div", propsAndChildren: PropsType) {
        const eventBus = new EventBus();

        const {children, props} = this._getChildren(propsAndChildren);

        this.children = children;

        this._meta = {
            tagName,
            props
        };


        // @ts-ignore
        if (props.settings?.withInternalID) {
            // Генерируем уникальный UUID V4
            this._id = makeUUID();
        }

        this.props = this._makePropsProxy({...props, id: this._id});

        this.eventBus = () => eventBus;

        this._registerEvents(eventBus);
        eventBus.emit(Block.EVENTS.INIT);
    }

    _getChildren(propsAndChildren: PropsType) {
        const children: Record<string, Block | Block[]> = {};
        const props: Record<string, unknown> = {};

        Object.entries(propsAndChildren).forEach(([key, value]) => {
            if (value instanceof Block) {
                children[key] = value;
            } else {
                props[key] = value;
            }
        });
        return {children, props};
    }

    compile(template: string, props: PropsType) {
        const propsAndStubs = {...props};

        Object.entries(this.children).forEach(([key, child]) => {
            propsAndStubs[key] = Array.isArray(child) ?
                child.map((item: { _id: any; }) => `<div data-id="${item._id}"></div>`).join('') :
                `<div data-id="${child._id}"></div>`
        });

        const fragment: HTMLElement = this._createDocumentElement('template');
        const fragmentTemplate = Handlebars.compile(template);
        fragment.innerHTML = fragmentTemplate(propsAndStubs);

        Object.values(this.children).forEach(child => {
            child = Array.isArray(child) ? child : [child];
            child.forEach((item) => {
                // @ts-ignore
                const stub = fragment.content.querySelector(`[data-id="${item._id}"]`);
                if (stub) {
                    stub.replaceWith(item.getContent());
                }
            })
        });
        // @ts-ignore
        return fragment.content;
    }

    _registerEvents(eventBus: EventBus) {
        eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    }

    _createResources() {
        if (this._meta && this._meta.tagName) {
            const {tagName} = this._meta;
            this._element = this._createDocumentElement(tagName);
        }
    }

    init() {
        this._createResources();
        this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }

    _componentDidMount(oldProps: PropsType) {
        this.componentDidMount(oldProps);
        Object.values(this.children).forEach(child => {
            if(!Array.isArray(child)) {
                child.dispatchComponentDidMount();
            }
        });
    }

    _addEvents() {
        if (this.props.hasOwnProperty('events')) {
            const {events} = this.props;
            if (events instanceof Object) {
                Object.keys(events).forEach(eventName => {
                    if (this._element) {
                        // @ts-ignore
                        this._element.addEventListener(eventName, events[eventName]);
                    }
                });
            }
        }
    }

    _removeEvents() {
        if (this.props.hasOwnProperty('events')) {
            const {events} = this.props;
            if (events instanceof Object) {
                Object.keys(events).forEach(eventName => {
                    if (this._element) {
                        // @ts-ignore
                        this._element.removeEventListener(eventName, events[eventName]);
                    }
                });
            }
        }
    }

// Может переопределять пользователь, необязательно трогать
    componentDidMount(oldProps: PropsType) {
        console.log(oldProps);
    }

    dispatchComponentDidMount() {
    }

    _componentDidUpdate(oldProps: PropsType, newProps: PropsType) {
        const response = this.componentDidUpdate(oldProps, newProps);
        if (response) {
            this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
        }
    }

    // Может переопределять пользователь, необязательно трогать
    componentDidUpdate(oldProps: PropsType, newProps: PropsType) {
        return oldProps === newProps;
    }

    setProps = (nextProps: PropsType) => {
        if (!nextProps) {
            return;
        }
        Object.assign(this.props, nextProps);
        this.eventBus().emit(Block.EVENTS.FLOW_CDU);
    };

    get element() {
        return this._element;
    }

    _render() {
        const block = this.render();

        if (this._element && block) {
            // Удалить старые события через removeEventListener
            this._removeEvents();
            this._element.innerHTML = ''; // удаляем предыдущее содержимое
            this._element.appendChild(block);
            // Навесить новые события через addEventListener
            this._addEvents();
        }
    }

// Может переопределять пользователь, необязательно трогать
    render() {
        const fragment: HTMLElement = this._createDocumentElement('template');
        // @ts-ignore
        return fragment.content;
    }

    getContent() {
        return this.element;
    }

    _makePropsProxy(props: Record<string, unknown>) {
        // Можно и так передать this
        // Такой способ больше не применяется с приходом ES6+
        const self = this;
        return new Proxy(props, {
            get(props, prop: string) {
                if (prop.startsWith('_')) {
                    throw new Error('Нет прав');
                } else {
                    let value = props[prop];
                    return (typeof value === 'function') ? value.bind(props) : value;
                }
            },
            set(props, prop: string, value) {
                if (prop.startsWith('_')) {
                    throw new Error('Нет прав');
                } else {
                    props[prop] = value;
                    self.eventBus().emit(Block.EVENTS.FLOW_CDU);
                    return true;
                }
            },
            deleteProperty() {
                throw new Error("Нет доступа");
            }
        });
    }

    _createDocumentElement(tagName: string) {
        // Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
        const element = document.createElement(tagName);
        if (this._id) {
            element.setAttribute('data-id', this._id);
        }
        return element;
    }

    show() {
        if (this._element) {
            this._element.style.display = 'block';
        }
    }

    hide() {
        if (this._element) {
            this._element.style.display = 'none';
        }
    }
}
