import '../Profile/profile.scss';

import Block from '../../core/Block';
import InputGroup from '../../components/InputGroup/InputGroup';

import { tpl } from './template';
import Button from '../../components/Button/Button';

import ValidateService from '../../core/ValidateService';
import Router from '../../router/Router';
import UserController from '../../controllers/UserController';
import { Indexed } from '../../types/types';
import connect from '../../core/HOC';
import store from '../../store/Store';

interface DataInterface {
    for: string;
    title: string;
    name: string;
    type: string;
    value?: string;
    subClass?: string;
}

class EditPassword extends Block {
  constructor(props: Record<string, unknown>) {
    // Создаём враппер дом-элемент
    super('div', props);

    if (this.props.data && Array.isArray(this.props.data)) {
      this.children.inputGroup = this.props.data.map((item: DataInterface) => new InputGroup({
        className: 'profile__field',
        labelClassName: 'profile__field__label',
        inputClassName: 'profile__field__input',
        settings: { withInternalID: true },
        for: item.for,
        title: item.title,
        name: item.name,
        type: item.type,
        value: item.value,
        subClass: item.subClass,
      }));
    }

    this.children.button = new Button({
      buttonText: 'Сохранить',
      className: 'btn btn-big btn-purple mt-3',
      settings: { withInternalID: true },
      type: 'submit',
      events: {
        click: (event: Event) => {
          event.preventDefault();
          const target = event.target as HTMLElement;
          if (target) {
            const form = target.closest('form') as HTMLFormElement;
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
                }
              }
            }
            UserController.changePassword(formDataObj);
          }
        },
      },
    });
    this.children.link = new Button({
      buttonText: '<span><i class="fa-solid fa-arrow-left"></i></span> Назад к чатам',
      className: 'btn btn-purple mt-3 m-auto',
      href: '../Register/index.html',
      settings: { withInternalID: true },
      events: {
        click: (event: Event) => {
          event.preventDefault();
          const router = new Router('.app');
          router.go('/messenger');
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
      showAlert: store.getState().changePassword.showAlert,
      alertText: store.getState().changePassword.alertText,
    });
  }
}
function mapUserToProps(state: Indexed) {
  return {
    showAlert: state.changePassword.showAlert,
    alertText: state.changePassword.alertText,
  };
}

export default connect(EditPassword, mapUserToProps);
