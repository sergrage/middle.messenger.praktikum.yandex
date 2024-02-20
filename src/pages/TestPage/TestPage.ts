import Block from "./../../core/Block";
import Button from "./../../components/Button/Button";
// @ts-ignore
import tpl from "./template.hbs?raw";

type PropsType = Record<string, unknown>;

export default class TestPage extends Block {

    constructor(props: Record<string, unknown>) {

        // Создаём враппер дом-элемент button
        super("div", props);

        // Создание кнопки лучше вынести в конструктор, чтобы не делать это при каждом рендере
        const button1 = new Button({
            buttonText: 'button1',
            settings: {withInternalID: true},
            'events': {
                'click': (event: any) => {
                    console.log(event, 7777)
                },
            },
        });
        const button2 = new Button({
            buttonText: 'button2',
            settings: {withInternalID: true},
            'events': {
                'click': (event: any) => {
                    console.log(event, 66666)
                },
            },
        });
        this.children['buttons'] = [button1, button2];

        // Создание кнопки лучше вынести в конструктор, чтобы не делать это при каждом рендере
        this.eventBus().emit(Block.EVENTS.FLOW_CDU);
    }

    componentDidUpdate(oldProps: PropsType, newProps: PropsType) {
        if (oldProps?.buttonText !== newProps?.buttonText) {
            if(!Array.isArray(this.children.buttons)) {
                this.children.buttons.setProps({buttonText: newProps.buttonText});
            }
        }

        return true;
    }

    render(): DocumentFragment {
        return this.compile(tpl, {
            'className': this.props.className,
            'pageText': this.props.pageText,
            'buttons': this.props.buttons
        });
    }
}
