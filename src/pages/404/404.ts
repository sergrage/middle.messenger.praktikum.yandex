import Block from "./../../core/Block";
import Button from "./../../components/Button/Button";
// @ts-ignore
import tpl from "./404.hbs?raw";

// type PropsType = Record<string, unknown>;

export default class TestPage extends Block {

    constructor(props: Record<string, unknown>) {

        // Создаём враппер дом-элемент
        super("div", props);

        // Создание кнопки лучше вынести в конструктор, чтобы не делать это при каждом рендере
        this.children['button'] = new Button({
            buttonText: '<span><i class="fa-solid fa-arrow-left"></i></span> Назад к чатам',
            className: 'btn btn-purple mt-3 m-auto',
            settings: {withInternalID: true},
            'events': {
                'click': (event: any) => {
                    console.log(event, 7777)
                },
            },
        });

        // Создание кнопки лучше вынести в конструктор, чтобы не делать это при каждом рендере
        this.eventBus().emit(Block.EVENTS.FLOW_CDU);
    }

    render(): DocumentFragment {
        return this.compile(tpl, {
            'button': this.props.button,
            'title': 'title'
        });
    }
}