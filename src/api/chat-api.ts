import HTTP from './../utils/HTTPTransport';
import { BaseAPI } from './base-api';
import {WSTransport} from "../utils/WSTransport";

const chatAPIInstance = new HTTP();

// /ws/chats/<USER_ID>/<CHAT_ID>/<TOKEN_VALUE>


class ChatAPI extends BaseAPI {

    chatUrl: string;
    wsUrl: string;

    constructor() {
        super();
        this.chatUrl = this.baseURL + '/chats'
        this.wsUrl = this.wsBaseURL + '/chats'
    }

    getChatToken(id: number) {
        return chatAPIInstance.POST(this.chatUrl + `/token/${id}`);
    }

    connectToChat(user_id: number, chat_id: number, token:string) {
        return new WSTransport(this.wsUrl + `/${user_id}/${chat_id}/${token}`);
    }

    // список чатов
    fetchChats() {
        return chatAPIInstance.get(this.chatUrl);
    }

    // создать чат
    createChat(payload: Record<string, unknown>) {
        return chatAPIInstance.POST(this.chatUrl, {'data': payload});
    }

    // Add users to chat
    addUserToChat(payload: Record<string, unknown>) {
        return chatAPIInstance.PUT(this.chatUrl + '/users', {'data': payload});
    }

   // Delete users from chat
    deleteUserToChat(payload: Record<string, unknown>) {
        return chatAPIInstance.DELETE(this.chatUrl + '/users', {'data': payload});
    }

    getChatUsers(id: number) {
        return chatAPIInstance.get(this.chatUrl + `/${id}/users`);
    }

}

export default new ChatAPI();