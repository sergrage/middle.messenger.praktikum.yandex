import './chat.scss';

import Block from '../../core/Block';

import { tpl } from './template';
import ThreadsList from '../../components/ThreadsList/ThreadsList';
import ChatMessagesWrapper from '../../components/ChatMessages/ChatMessages';
import Button from '../../components/Button/Button';
import Router from '../../router/Router';
import ChatController from '../../controllers/ChatController';
import store from '../../store/Store';
import UserController from '../../controllers/UserController';
import { Indexed } from '../../types/types';
import connect from '../../core/HOC';

interface ChatThreadsInterface {
    id: number;
    title: string;
    avatar: string;
    unread_count: number;
    last_message: string;
}

class ChatPage extends Block {
  constructor(props: Record<string, unknown>) {
    // Создаём враппер дом-элемент
    super('div', props);
    this._element?.classList.add('chat');

    Promise.all([UserController.userInfo(), ChatController.getChatList()]).then(() => {
      this.updateThreadsList();
      this.showMessage();

      this.children.profileLink = new Button({
        className: 'btn',
        buttonText: 'Профиль <span class="chat__profile__link-purple"><i class="fa-solid fa-angle-right"></i></span>',
        events: {
          click: (event: any) => {
            event.preventDefault();
            const router = new Router('.app');
            router.go('/settings');
          },
        },
      });
      this.children.addChat = new Button({
        buttonText: '<span><i class="fa-solid fa-square-plus"></i></span>',
        events: {
          click: (event: any) => {
            event.preventDefault();
            const form = event.target.closest('form');
            const data = new FormData(form);
            const chatName = data.get('chatName');
            ChatController.storeChat({ title: chatName }).then(() => {
              ChatController.getChatList().then(() => {
                this.updateThreadsList();
                this.eventBus().emit(Block.EVENTS.FLOW_CDU);
              });
            });
          },
        },
      });

      this.eventBus().emit(Block.EVENTS.FLOW_CDU);
    });
  }

  showMessage() {
    const className = store.getState().chatMessages.length > 0
      ? 'chat__content' : 'chat__content';
    this.children.chatMessagesWrapper = new ChatMessagesWrapper({
      settings: { withInternalID: true },
      className,
    });
  }

  updateThreadsList() {
    this.children.threadsList = store.getState().chats
      .map((item: ChatThreadsInterface) => new ThreadsList({
        className: 'chat__thread',
        settings: { withInternalID: true },
        chat_id: item.id,
        title: item.title,
        avatar: item.avatar,
        unread_count: item.unread_count,
        last_message: item.last_message,
        events: {
          click: (event: any) => {
            event.preventDefault();

            const chatThreads = document.querySelectorAll('.chat__thread');
            chatThreads.forEach((el) => el.classList.remove('chat__thread-active'));
            event.currentTarget.classList.add('chat__thread-active');

            const chat_id = parseInt(event.currentTarget.dataset.chat_id);

            store.set('chat.title', event.currentTarget.querySelector('.chat__thread__name').textContent);
            store.set('chat.chat_id', chat_id);

            ChatController.getUsers().then((res) => {
              store.set('chat.users', res);
              store.getState().chat.users.forEach((item: Record<string, unknown>) => {
                item.isMe = item.id === store.getState().user.id;
              });
            });
            ChatController.getChatToken(chat_id).then((res) => {
              const user_id = store.getState().user.id;

              const { token } = (<any>res);
              const connection = ChatController.connectToChat(user_id, chat_id, token);
              store.set('chat.connection', connection);

              connection.on('message', (data) => {
                if (Array.isArray(data)) {
                  data.forEach((item) => {
                    item.isMy = item.user_id === store.getState().user.id;
                  });
                  store.set('chatMessages', data);
                } else {
                  this.getMessages();
                }
              });
              connection.connect().then(() => {
                this.getMessages();
              });
            });
          },
        },
      }));
  }

  getMessages() {
    store.getState().chat.connection.send({
      content: '0',
      type: 'get old',
    });
  }

  render() {
    return this.compile(tpl, {
      avatar: store.getState().user.avatar
        ? `https://ya-praktikum.tech/api/v2/resources/${store.getState().user.avatar}`
        : '/icons/photo-icon.svg',
    });
  }
}

function mapUserToProps(state: Indexed) {
  return {
    chats: state.chats,
  };
}

export default connect(ChatPage, mapUserToProps);
