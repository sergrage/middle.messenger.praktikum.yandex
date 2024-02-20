import Block from "./../../core/Block"
// @ts-ignore
import tpl from "./template.hbs?raw";

export default class ThreadsList extends Block {
    constructor(props: Record<string, unknown>) {
        // Создаём враппер дом-элемент button
        super("div", props);
        if(typeof props.className  === 'string') {
            this._element?.classList.add(...props.className.split(' '));
        }
    }

    render(): DocumentFragment {
        return this.compile(tpl, {
            'active': this.props.active,
            'name': this.props.name,
            'time': this.props.time,
            'new': this.props.new,
            'myLast': this.props.myLast,
            'lastText': this.props.lastText,
        });
    }
}
