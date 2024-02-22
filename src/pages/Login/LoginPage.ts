import Block from '../../core/Block';
import InputGroup from '../../components/InputGroup/InputGroup';

import {tpl} from './template';
import Button from '../../components/Button/Button';

import ValidateService from '../../core/ValidateService';

interface DataInterface {
    for: string;
    title: string;
    name: string;
    type: string;
    subClass?: string;
}

export default class LoginPage extends Block {
  constructor(props: Record<string, unknown>) {
    // Создаём враппер дом-элемент
    super('div', props);

    if (this.props.data && Array.isArray(this.props.data)) {
      this.children.inputGroup = this.props.data.map((item: DataInterface) => new InputGroup({
        className: 'inputGroup',
        labelClassName: 'inputGroup__label',
        inputClassName: 'inputGroup__input',
        settings: { withInternalID: true },
        for: item.for,
        title: item.title,
        name: item.name,
        type: item.type,
        subClass: item.subClass,
      }));
    }

    this.children.button = new Button({
      buttonText: 'Войти',
      className: 'btn btn-big btn-purple',
      settings: { withInternalID: true },
      // type: 'submit',
      events: {
        click: (event: any) => {
          event.preventDefault();
          const form = event.target.closest('form');
          const data = new FormData(form);
          const formDataObj: Record<string, string> = {};
          data.forEach((value, key) => {
            if (typeof value === 'string') {
              (formDataObj[key] = value);
            }
          });

          for (const [key, value] of Object.entries(formDataObj)) {
            const validateService = new ValidateService(key, value);

            if (Array.isArray(this.children.inputGroup)) {
              const input = this.children.inputGroup.find((element) => element.props.name === key);
              if (input) {
                input.setProps({ validateMessage: validateService.errorMessage() });
                input.setProps({ showValidateError: validateService.validate[key] });
                console.log(validateService.validate[key])
              }
            }
          }

          console.log(formDataObj);
        },
      },
    });
    this.children.link = new Button({
      buttonText: 'Создать аккаунт',
      className: 'btn btn-text m-auto',
      href: '../Register/index.html',
      settings: { withInternalID: true },
    });

    // Создание кнопки лучше вынести в конструктор, чтобы не делать это при каждом рендере
    this.eventBus().emit(Block.EVENTS.FLOW_CDU);
  }

  render() {
    return this.compile(tpl, {
      button: this.props.button,
      link: this.props.link,
    });
  }
}
