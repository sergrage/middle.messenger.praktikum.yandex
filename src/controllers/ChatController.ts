import ChatApi from '../api/chat-api';
import { Indexed } from '../types/types';
import store from '../store/Store';

class ChatController {
  getUsers() {
    let users = null;
    try {
      const { chat_id } = store.getState().chat;
      users = ChatApi.getChatUsers(chat_id);
    } catch (err) {
      console.log(err);
    }
    return users;
  }

  public connectToChat(user_id: number, chat_id: number, token:string) {
    let connection = null;
    try {
      connection = ChatApi.connectToChat(user_id, chat_id, token);
    } catch (err) {
      console.log(err);
    }
    return connection;
  }

  public async addUserToChat(payload: Record<string, unknown>) {
    let result = null;
    try {
      result = ChatApi.addUserToChat(payload);
    } catch (err) {
      console.log(err);
    }
    return result;
  }

  public async deleteUserFromChat(payload: Record<string, unknown>) {
    let result = null;
    try {
      result = ChatApi.deleteUserToChat(payload);
    } catch (err) {
      console.log(err);
    }
    return result;
  }

  public async getChatToken(id: number) {
    let token = null;
    try {
      token = ChatApi.getChatToken(id);
    } catch (err) {
      console.log(err);
    }
    return token;
  }

  public async getChatList() {
    try {
      const res = await ChatApi.fetchChats();
      store.set('chats', res);
    } catch (err) {
      console.log(err);
    }
  }

  public async storeChat(payload: Indexed) {
    try {
      await ChatApi.createChat(payload);
    } catch (err) {
      console.log(err);
    }
  }

  chatButtonClick = (event: Event) => {
    event.preventDefault();
    const target = event.target as HTMLElement;
    if (target) {
      const form = target.closest('form') as HTMLFormElement;
      const data = new FormData(form);
      const chatName = data.get('chatName');
      this.storeChat({ title: chatName }).catch((err) => console.log(err));
    }
  };
}

export default new ChatController();
