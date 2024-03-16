import HTTP from '../utils/HTTPTransport';
import { BaseAPI } from './base-api';

const chatAPIInstance = new HTTP();

class UserAPI extends BaseAPI {
  userUrl: string;

  constructor() {
    super();
    this.userUrl = `${this.baseURL}/user`;
  }

  // Обновление профиля
  updateProfile(payload: Record<string, unknown>) {
    return chatAPIInstance.PUT(`${this.userUrl}/profile`, { data: payload });
  }

  // Обновление пароля
  changePassword(payload: Record<string, unknown>) {
    return chatAPIInstance.PUT(`${this.userUrl}/password`, { data: payload });
  }

  // Обновление пароля
  addAvatar(payload: Record<string, unknown>) {
    return chatAPIInstance.PUT(`${this.userUrl}/profile/avatar`, { data: payload });
  }
}

export default new UserAPI();
