import Block from '../../core/Block';

import tpl from './template.hbs?raw';

export default class Button extends Block {
  constructor(props: Record<string, unknown>) {
    // Создаём враппер дом-элемент button
    if (props.href) {
      super('a', props);
    } else {
      super('button', props);
    }

    if (typeof props.className === 'string') {
      this._element?.classList.add(...props.className.split(' '));
    }
    if (this._element instanceof HTMLAnchorElement && props.href) {
      this._element.href = <string>props.href;
    }
    if (this._element && props.type) {
      this._element.setAttribute('type', <string>props.type);
    }
  }

  render(): DocumentFragment {
    return this.compile(tpl, {
      buttonText: this.props.buttonText,
      type: this.props.type,
    });
  }
}
