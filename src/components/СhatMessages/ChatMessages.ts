import Block from "./../../core/Block"
// @ts-ignore
import tpl from "./template.hbs?raw";

export default class ChatMessages extends Block {
    constructor(props: Record<string, unknown>) {
        // Создаём враппер дом-элемент button
        super("div", props);
        if(typeof props.className  === 'string') {
            this._element?.classList.add(...props.className.split(' '));
        }
    }

    render(): DocumentFragment {
        return this.compile(tpl, {
            'messages': this.props.messages,
            'companion': this.props.messages.companion,
            'my': this.props.messages.my,
            'img': this.props.messages.img,
            'alt': this.props.messages.alt,
            'time': this.props.messages.time,
            'text': this.props.messages.text,
        });
    }
}
