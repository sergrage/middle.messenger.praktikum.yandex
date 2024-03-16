import HTTP from './../utils/HTTPTransport';
import { BaseAPI } from './base-api';

const chatAPIInstance = new HTTP();

class AuthAPI extends BaseAPI {

    authUrl: string;

    constructor() {
        super();
        this.authUrl = this.baseURL + '/auth'
    }

    // регистрация
    signUp(payload: Record<string, unknown>) {
        return chatAPIInstance.POST(this.authUrl +'/signup', {'data': payload});
    }

    // вход
    signIn(payload: Record<string, unknown>) {
        return chatAPIInstance.POST(this.authUrl +'/signin', {'data': payload});
    }


    logout() {
        return chatAPIInstance.POST(this.authUrl +'/logout', {});
    }

    userInfo() {
        return chatAPIInstance.get(this.authUrl +'/user');
    }
}

export default new AuthAPI();