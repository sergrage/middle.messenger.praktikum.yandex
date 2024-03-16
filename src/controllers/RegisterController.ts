import { Indexed } from '../types/types';
import AuthAPI from '../api/auth-api';

import store from '../store/Store';

import Router from '../router/Router';

class RegisterController {
  public signUp(payload: Indexed) {
    AuthAPI.signUp(payload).then((res) => {
      console.log('res', res);
      if ((<any>res).error) {
        store.set('registerPage.showAlert', true);
        store.set('registerPage.alertText', (<any>res).reason);
      } else {
        const router = new Router('.app');
        router.go('/sign-in');
      }
    }).catch((err) => {
      console.log('err', err);
    });
  }
}

export default new RegisterController();

// test1Serg
// Testserg123
// "{\"id\":24}"

// test2Serg
// 149
