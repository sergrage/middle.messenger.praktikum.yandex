import Block from '../../core/Block';
import ProfileField from '../../components/ProfileField/ProfileField';

import {tpl} from './template';
import Button from '../../components/Button/Button';

interface DataInterface {
    name: string;
    value: string;
}

export default class ProfilePage extends Block {
  constructor(props: Record<string, unknown>) {
    // Создаём враппер дом-элемент
    super('div', props);

    if (this.props.data && Array.isArray(this.props.data)) {
      this.children.profileFields = this.props.data.map((item: DataInterface) => new ProfileField({
        className: 'profile__field',
        settings: { withInternalID: true },
        name: item.name,
        value: item.value,
      }));
    }

    this.children.linkChats = new Button({
      buttonText: '<span><i class="fa-solid fa-arrow-left"></i></span> Назад к чатам',
      className: 'btn btn-purple mt-3 m-auto',
      href: '../Register/index.html',
      settings: { withInternalID: true },
    });
    this.children.linkEditProfile = new Button({
      buttonText: 'Изменить данные <i class="fa-solid fa-pen-to-square"></i>',
      className: 'btn btn-text pl-0',
      href: '../EditProfile/index.html',
      settings: { withInternalID: true },
    });
    this.children.linkEditPassword = new Button({
      buttonText: 'Изменить пароль <i class="fa-solid fa-key"></i>',
      className: 'btn btn-text pl-0',
      href: '../EditPassword/index.html',
      settings: { withInternalID: true },
    });
    this.children.linkExit = new Button({
      buttonText: 'Выйти',
      className: 'btn btn-text btn-text-red pl-0',
      href: '../EditPassword/index.html',
      settings: { withInternalID: true },
    });
    // Создание кнопки лучше вынести в конструктор, чтобы не делать это при каждом рендере
    this.eventBus().emit(Block.EVENTS.FLOW_CDU);
  }

  render() {
    return this.compile(tpl, {});
  }
}
