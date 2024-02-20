import Block from "./../../core/Block"
// @ts-ignore
import tpl from "./template.hbs?raw";
import ChatMessages from "../СhatMessages/ChatMessages";
import Input from "../Input/Input";
import Button from "../Button/Button";

interface MessagesInterface {
    companion?: boolean,
    my?: boolean,
    img?: string,
    alt?: string,
    time: string,
    text?: string[]
}

interface ChatMessagesInterface {
    day: string;
    messages: MessagesInterface[];
}

export default class ChatMessagesWrapper extends Block {
    constructor(props: Record<string, unknown>) {
        // Создаём враппер дом-элемент button
        super("div", props);
        if (typeof props.className === 'string') {
            this._element?.classList.add(...props.className.split(' '));
        }

        if (this.props.chatMessages && Array.isArray(this.props.chatMessages)) {
            this.children['chatMessages'] = this.props.chatMessages.map((item: ChatMessagesInterface) => {
                return new ChatMessages({
                    settings: {withInternalID: true},
                    'day': item.day,
                    'messages': item.messages,
                })
            })
        }

        this.children['messagesInput'] = new Input({
            settings: {withInternalID: true},
            className: 'chat__content__footer__input',
            id: 'messagesInput',
            name: 'message',
            type: 'text',
        });

        this.children['messagesButton'] = new Button({
            className: 'chat__content__footer__send',
            buttonText: '<span><i class="fa-solid fa-arrow-right"></i></span>',
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
                    console.log(formDataObj)
                },
            },
        })

        this.eventBus().emit(Block.EVENTS.FLOW_CDU);
        console.log()
    }

    render(): DocumentFragment {
        return this.compile(tpl, {
            'chatMessages': this.props.chatMessages,
        });
    }
}
