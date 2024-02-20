import Block from "./../../core/Block";
import InputGroup from "../../components/InputGroup/InputGroup";
// @ts-ignore
import tpl from "./editProfile.hbs?raw";
import Button from "../../components/Button/Button";

import ValidateService from "./../../core/ValidateService";

interface DataInterface {
    for: string;
    title: string;
    name: string;
    type: string;
    value?: string;
    subClass?: string;
}

export default class EditProfile extends Block {

    constructor(props: Record<string, unknown>) {

        // Создаём враппер дом-элемент
        super("div", props);

        if (this.props.data && Array.isArray(this.props.data))
            this.children['inputGroup'] = this.props.data.map((item: DataInterface) => {
                return new InputGroup({
                    className: 'profile__field',
                    labelClassName: 'profile__field__label',
                    inputClassName: 'profile__field__input',
                    settings: {withInternalID: true},
                    'for': item.for,
                    'title': item.title,
                    'name': item.name,
                    'type': item.type,
                    'value': item.value,
                    'subClass': item.subClass,
                })
            })

        this.children['button'] = new Button({
            buttonText: 'Сохранить',
            className: 'btn btn-big btn-purple mt-3',
            settings: {withInternalID: true},
            type: 'submit',
            'events': {
                'click': (event: any) => {
                    event.preventDefault();
                    const form = event.target.closest('form');
                    const data = new FormData(form);
                    const formDataObj: Record<string, string> = {};
                    data.forEach((value, key) => {
                        if (typeof value === "string") {
                            (formDataObj[key] = value)
                        }
                    });

                    for(const [key, value] of  Object.entries(formDataObj)) {
                        const validateService = new ValidateService(key, value)

                        if(Array.isArray(this.children.inputGroup)) {
                            const input = this.children.inputGroup.find((input) => input.props.name === key);
                            if(input) {
                                input.setProps({validateMessage: validateService.errorMessage()});
                                // @ts-ignore
                                input.setProps({showValidateError: validateService[key]});
                            }
                        }
                    }

                    console.log(formDataObj)
                },
            },
        });
        this.children['link'] = new Button({
            buttonText: '<span><i class="fa-solid fa-arrow-left"></i></span> Назад к чатам',
            className: 'btn btn-purple mt-3 m-auto',
            href: '../Register/index.html',
            settings: {withInternalID: true},
        });

        // Создание кнопки лучше вынести в конструктор, чтобы не делать это при каждом рендере
        this.eventBus().emit(Block.EVENTS.FLOW_CDU);
    }

    render(): DocumentFragment {
        return this.compile(tpl, {
            'button': this.props.button,
            'link': this.props.link,
        });
    }
}
