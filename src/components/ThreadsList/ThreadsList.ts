import Block from '../../core/Block';
import { tpl } from './template';

export default class ThreadsList extends Block {
  constructor(props: Record<string, unknown>) {
    // Создаём враппер дом-элемент button
    super('div', props);
    if (typeof props.className === 'string') {
      this._element?.classList.add(...props.className.split(' '));
      this._element?.setAttribute('data-chat_id', this.props.chat_id);
    }
  }

  render() {
    return this.compile(tpl, {
      last_message: this.props.last_message,
      time: this.props.last_message ? new Date(this.props.last_message.time).toJSON().slice(0, 10) : '',
      title: this.props.title,
    });
  }
}
