import { Indexed } from '../types/types';
import AuthAPI from '../api/auth-api';

import store from '../store/Store';

import Router from '../router/Router';
import UserController from './UserController';

class LoginController {
  public signIn(payload: Indexed) {
    AuthAPI.signIn(payload).then((res) => {
      if ((<any>res).reason) {
        store.set('loginPage.showAlert', true);
        store.set('loginPage.alertText', (<any>res).reason);
      } else {
        const router = new Router('.app');
        router.go('/messenger');

        UserController.userInfo();
      }
    });
  }
}

export default new LoginController();
