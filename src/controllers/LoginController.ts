import { Indexed } from '../types/types';
import AuthAPI from '../api/auth-api';

import store from '../store/Store';

import Router from '../router/Router';
import UserController from './UserController';

class LoginController {
  public signIn(payload: Indexed) {
    const router = new Router('.app');
    AuthAPI.signIn(payload).then((res) => {
      if ((<any>res).reason) {
        if ((<any>res).reason === 'User already in system') {
          router.go('/messenger');
          return;
        }
        store.set('loginPage.showAlert', true);
        store.set('loginPage.alertText', (<any>res).reason);
      } else {
        router.go('/messenger');
        UserController.userInfo().catch((err) => console.log(err));
      }
    }).catch((err) => console.log(err));
  }
}

export default new LoginController();
