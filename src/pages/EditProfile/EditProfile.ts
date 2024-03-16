import '../Profile/profile.scss';

import Block from '../../core/Block';
import InputGroup from '../../components/InputGroup/InputGroup';

import { tpl } from './template';
import Button from '../../components/Button/Button';

import ValidateService from '../../core/ValidateService';
import store from '../../store/Store';
import Router from '../../router/Router';
import ProfileController from '../../controllers/ProfileController';
import { Indexed } from '../../types/types';
import connect from '../../core/HOC';
import UserController from '../../controllers/UserController';
import Input from '../../components/Input/Input';

interface DataInterface {
    for: string;
    title: string;
    name: string;
    type: string;
    value?: string;
    subClass?: string;
}

class EditProfile extends Block {
  constructor(props: Record<string, unknown>) {
    // Создаём враппер дом-элемент
    super('div', props);

    UserController.userInfo().then(() => {
      const profileStore = store.getState();

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
          value: profileStore.user[item.name],
          subClass: item.subClass,
        }));
      }

      this.children.button = new Button({
        buttonText: 'Сохранить',
        className: 'btn btn-big btn-purple mt-3',
        settings: { withInternalID: true },
        type: 'submit',
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
                }
              }
            }
            ProfileController.update(formDataObj);
          },
        },
      });
      this.children.chatLink = new Button({
        buttonText: '<span><i class="fa-solid fa-arrow-left"></i></span> Назад к чатам',
        className: 'btn btn-purple mt-3 m-auto d-inline-block',
        settings: { withInternalID: true },
        events: {
          click: (event: any) => {
            event.preventDefault();
            const router = new Router('.app');
            router.go('/messenger');
          },
        },
      });

      this.children.passwordLink = new Button({
        buttonText: '<span><i class="fa-solid fa-key"></i></span> Сменить менить пароль',
        className: 'btn btn-purple mt-3 m-auto d-inline-block',
        settings: { withInternalID: true },
        events: {
          click: (event: any) => {
            event.preventDefault();
            const router = new Router('.app');
            router.go('/change-password');
          },
        },
      });
      this.children.avatarInput = new Input({
        name: 'addAvatar',
        for: 'avatarInput',
        type: 'file',
        className: 'd-none',
        settings: { withInternalID: true },
        events: {
          change: (event: any) => {
            event.preventDefault();
            const file = event.target.files[0];

            const formData = new FormData();
            formData.append('avatar', file, file.name);

            UserController.uploadAvatar(formData);
          },
        },
      });

      // Создание кнопки лучше вынести в конструктор, чтобы не делать это при каждом рендере
      this.eventBus().emit(Block.EVENTS.FLOW_CDU);
    });
  }

  render() {
    return this.compile(tpl, {
      avatar: store.getState().user.avatar
        ? `https://ya-praktikum.tech/api/v2/resources/${store.getState().user.avatar}` : '/icons/photo-icon.svg',
      button: this.props.button,
      chatLink: this.props.chatLink,
      passwordLink: this.props.passwordLink,
    });
  }
}

function mapUserToProps(state: Indexed) {
  return {
    user: state.user,
  };
}

export default connect(EditProfile, mapUserToProps);
