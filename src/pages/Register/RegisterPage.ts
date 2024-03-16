import { Indexed } from '../../types/types';

import './register.scss';

import Block from '../../core/Block';
import InputGroup from '../../components/InputGroup/InputGroup';

import { tpl } from './template';
import Button from '../../components/Button/Button';

import ValidateService from '../../core/ValidateService';

import connect from '../../core/HOC';

import RegisterController from '../../controllers/RegisterController';

import store from '../../store/Store';
import Router from '../../router/Router';

interface DataInterface {
    for: string;
    title: string;
    name: string;
    type: string;
    subClass?: string;
}

class RegisterPage extends Block {
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
      buttonText: 'Создать аккаунт',
      className: 'btn btn-big btn-purple',
      settings: { withInternalID: true },
      type: 'submit',
      events: {
        click: (event: any) => {
          event.preventDefault();

          const form = event.target.closest('form');
          const data = new FormData(form);
          const registerData: Record<string, string> = {};
          data.forEach((value, key) => {
            if (typeof value === 'string') {
              (registerData[key] = value);
            }
          });

          for (const [key, value] of Object.entries(registerData)) {
            const validateService = new ValidateService(key, value);

            if (Array.isArray(this.children.inputGroup)) {
              const input = this.children.inputGroup.find((element) => element.props.name === key);
              if (input) {
                input.setProps({ validateMessage: validateService.errorMessage() });
                input.setProps({ showValidateError: validateService.validate[key] });
              }
            }
          }

          RegisterController.signUp(registerData);
        },
      },
    });
    this.children.link = new Button({
      buttonText: 'Войти',
      className: 'btn btn-text m-auto',
      settings: { withInternalID: true },
      events: {
        click: (event: any) => {
          event.preventDefault();
          const router = new Router('.app');
          router.go('/sign-in');
        },
      },
    });

    // Создание кнопки лучше вынести в конструктор, чтобы не делать это при каждом рендере
    this.eventBus().emit(Block.EVENTS.FLOW_CDU);
  }

  render() {
    return this.compile(tpl, {
      button: this.props.button,
      link: this.props.link,
      showAlert: store.getState().registerPage.showAlert,
      alertText: store.getState().registerPage.alertText,
    });
  }
}

function mapUserToProps(state: Indexed) {
  return {
    showAlert: state.registerPage.showAlert,
    alertText: state.registerPage.alertText,
  };
}

export default connect(RegisterPage, mapUserToProps);
