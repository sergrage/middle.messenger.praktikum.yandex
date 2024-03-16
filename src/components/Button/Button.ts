import Block from '../../core/Block';
import { tpl } from './template';

export default class Button extends Block {
  constructor(props: Record<string, unknown>) {
    // Создаём враппер дом-элемент button
    super('button', props);

    if (typeof props.className === 'string') {
      this._element?.classList.add(...props.className.split(' '));
    }
    if (this._element instanceof HTMLAnchorElement && props.href) {
      this._element.href = <string>props.href;
    }
    if (this._element && props.type) {
      this._element.setAttribute('type', <string>props.type);
    }
    if (this._element && props.data) {
      this._element.setAttribute('data-btn', <string>props.data);
    }
  }

  render() {
    return this.compile(tpl, {
      buttonText: this.props.buttonText,
      type: this.props.type,
    });
  }
}
