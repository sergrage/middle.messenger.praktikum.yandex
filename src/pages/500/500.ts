import './500.scss';

import Block from '../../core/Block';
import Button from '../../components/Button/Button';
import { tpl } from './template';
import Router from "../../router/Router";

export default class ServerErrorPage extends Block {
  constructor(props: Record<string, unknown>) {
    // Создаём враппер дом-элемент
    super('div', props);

    this.children.button = new Button({
      buttonText: '<span><i class="fa-solid fa-arrow-left"></i></span> Назад к чатам',
      className: 'btn btn-purple mt-3 m-auto',
      settings: { withInternalID: true },
        events: {
            click: (event: any) => {
                event.preventDefault();
                const router = new Router(".app");
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
    });
  }
}
