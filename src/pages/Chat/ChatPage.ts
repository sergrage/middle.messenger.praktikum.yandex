import Block from "./../../core/Block";

import tpl from "./chat.hbs?raw";
import ThreadsList from "../../components/ThreadsList/ThreadsList";
import ChatMessagesWrapper from "../../components/ChatMessagesWrapper/ChatMessagesWrapper";
import Button from "../../components/Button/Button";
interface ChatThreadsInterface {
    active?: boolean;
    name: string;
    lastText: string;
    myLast?: string;
    time: string;
    new?: string;
}
export default class ChatPage extends Block {

    constructor(props: Record<string, unknown>) {

        // Создаём враппер дом-элемент
        super("div", props);

        this._element?.classList.add('chat');

        if (this.props.chatThreads && Array.isArray(this.props.chatThreads)) {
            this.children['threadsList'] = this.props.chatThreads.map((item: ChatThreadsInterface) => {
                return new ThreadsList({
                    className: 'chat__thread',
                    settings: {withInternalID: true},
                    'active': item.active,
                    'name': item.name,
                    'myLast': item.myLast,
                    'lastText': item.lastText,
                    'time': item.time,
                    'new': item.new,
                })
            })
        }
        if(this.props.chatMessages && Array.isArray(this.props.chatMessages)) {
            console.log(this.props.chatMessages)
            const className = this.props.chatMessages.length > 0
                ? 'chat__content' : 'chat__content chat__content-center'

            this.children['chatMessagesWrapper'] =  new ChatMessagesWrapper({
                settings: {withInternalID: true},
                className: className,
                'chatMessages': this.props.chatMessages,
            })
        }
        this.children['profileLink'] = new Button({
            className: 'chat__profile__link',
            href: '../Profile/index.html',
            buttonText: 'Профиль <span class="chat__profile__link-purple"><i class="fa-solid fa-angle-right"></i></span>'
        });

        // Создание кнопки лучше вынести в конструктор, чтобы не делать это при каждом рендере
        this.eventBus().emit(Block.EVENTS.FLOW_CDU);
    }

    render(): DocumentFragment {
        return this.compile(tpl, {

        });
    }
}
