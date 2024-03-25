import Block from '../../core/Block';

import { tpl } from './template';

import Input from '../Input/Input';
import Button from '../Button/Button';

import LogoutController from '../../controllers/LogoutController';
import store from '../../store/Store';
import { Indexed } from '../../types/types';
import connect from '../../core/HOC';
import ChatController from '../../controllers/ChatController';

class ChatMessages extends Block {
  constructor(props: Record<string, unknown>) {
    // Создаём враппер дом-элемент button
    super('div', props);
    if (typeof props.className === 'string') {
      this._element?.classList.add(...props.className.split(' '));
    }

    this.children.messagesInput = new Input({
      settings: { withInternalID: true },
      className: 'chat__content__footer__input',
      id: 'messagesInput',
      name: 'message',
      type: 'text',
    });

    this.children.logoutBtn = new Button({
      className: 'chat__content__footer__send',
      buttonText: '<span><i class="fa-solid fa-right-from-bracket"></i></span>',
      settings: { withInternalID: true },
      events: {
        click: (event: Event) => {
          event.preventDefault();
          LogoutController.logout();
        },
      },
    });

    this.children.messagesButton = new Button({
      className: 'chat__content__footer__send',
      buttonText: '<span><i class="fa-solid fa-arrow-right"></i></span>',
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
            if (formDataObj.message.length > 0) {
              store.getState().chat.connection.send({
                content: formDataObj.message,
                type: 'message',
              });
              form.reset();
            }
          }
        },
      },
    });

    this.children.addUserBtn = new Button({
      buttonText: '<span><i class="fa-solid fa-square-plus"></i></span>',
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

            ChatController.addUserToChat({
              users: [
                formDataObj.userId,
              ],
              chatId: store.getState().chat.chat_id,
            }).then(() => {
              ChatController.getUsers()?.then((res) => {
                store.set('chat.users', res);
                store.getState().chat.users.forEach((item: Record<string, unknown>) => {
                  item.isMe = (item.id === store.getState().user.id);
                });
              }).catch((err) => console.log(err));
            }).catch((err) => console.log(err));

            form.reset();
          }
        },
      },
    });

    this.eventBus().emit(Block.EVENTS.FLOW_CDU);
  }

  render(): DocumentFragment | undefined {
    if (store.getState().chat.users.length > 0) {
      this.children.chatUsersBtns = store.getState().chat.users
        .map((item: userI) => {
          const classQ = `mx-1 badge-btn ${item.isMe ? 'badge-btn-main' : 'badge-btn-danger'}`;
          const text = item.login + (item.isMe ? '' : ' <i class="fa-solid fa-user-xmark"></i>');
          return new Button({
            className: classQ,
            settings: { withInternalID: true },
            buttonText: text,
            data: item.id,
            events: {
              click: (event: Event) => {
                event.preventDefault();
                const target = event.currentTarget as HTMLElement;
                if (target) {
                  const deleteUser = target.getAttribute('data-btn') as string;

                  if (store.getState().user.id !== parseInt(deleteUser)) {
                    ChatController.deleteUserFromChat({
                      users: [
                        parseInt(deleteUser),
                      ],
                      chatId: store.getState().chat.chat_id,
                    }).then(() => {
                      ChatController.getUsers()?.then((res) => {
                        if (Array.isArray(res)) {
                          res.forEach((item: Record<string, unknown>) => {
                            item.isMe = (item.id === store.getState().user.id);
                          });
                          store.set('chat.users', res);
                        }
                      }).catch((err) => console.log(err));
                    }).catch((err) => console.log(err));
                  }
                }
              },
            },
          });
        });
    }

    return this.compile(tpl, {
      chatMessages: store.getState().chatMessages.sort((a:sortedI, b:sortedI) => b.id - a.id),
      chatTitle: store.getState().chat.title,
      userId: store.getState().user.id,
      chatUsers: store.getState().chat.users,
      chatUsersBtns: this.children.chatUsersBtns,
    });
  }
}

interface sortedI {
    id: number
}

interface userI {
    id: number,
    login: string,
    isMe?: boolean,
}

function mapUserToProps(state: Indexed) {
  return {
    chatMessages: state.chatMessages,
    chatUsers: state.chat.users,
  };
}

export default connect(ChatMessages, mapUserToProps);
