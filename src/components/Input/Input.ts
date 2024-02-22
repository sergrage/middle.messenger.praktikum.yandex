import Block from '../../core/Block';

import { tpl } from './template';

export default class Input extends Block {
  constructor(props: Record<string, unknown>) {
    // Создаём враппер дом-элемент input
    super('input', props);
    if (typeof props.className === 'string') { this._element?.classList.add(...props.className.split(' ')); }
    if (props.for) { this._element?.setAttribute('id', <string>props.for); }
    if (props.name) { this._element?.setAttribute('name', <string>props.name); }
    if (props.type) { this._element?.setAttribute('type', <string>props.type); }
    if (props.value) { this._element?.setAttribute('value', <string>props.value); }
  }

  render() {
    return this.compile(tpl, {
      showValidateError: this.props.showValidateError,
      validateMessage: this.props.validateMessage,
    });
  }
}
