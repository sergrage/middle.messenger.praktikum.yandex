import ChatApi from '../api/chat-api';
import { Indexed } from '../types/types';
import store from '../store/Store';

class ChatController {
  getUsers() {
    const { chat_id } = store.getState().chat;
    return ChatApi.getChatUsers(chat_id);
  }

  public connectToChat(user_id: number, chat_id: number, token:string) {
    return ChatApi.connectToChat(user_id, chat_id, token);
  }

  public async addUserToChat(payload: Record<string, unknown>) {
    return ChatApi.addUserToChat(payload);
  }

  public async deleteUserFromChat(payload: Record<string, unknown>) {
    return ChatApi.deleteUserToChat(payload);
  }

  public async getChatToken(id: number) {
    return ChatApi.getChatToken(id);
  }

  public async getChatList() {
    const res = await ChatApi.fetchChats();
    store.set('chats', res);
  }

  public async storeChat(payload: Indexed) {
    await ChatApi.createChat(payload);
  }

  chatButtonClick = (event: any) => {
    event.preventDefault();
    const form = event.target.closest('form');
    const data = new FormData(form);
    const chatName = data.get('chatName');
    this.storeChat({ title: chatName });
  };
}

export default new ChatController();
