import Block from '../../core/Block';

import {tpl} from './template';

export default class ProfileField extends Block {
  constructor(props: Record<string, unknown>) {
    // Создаём враппер дом-элемент button
    super('div', props);
    if (typeof props.className === 'string') {
      this._element?.classList.add(...props.className.split(' '));
    }
  }

  render() {
    return this.compile(tpl, {
      name: this.props.name,
      value: this.props.value,
    });
  }
}
