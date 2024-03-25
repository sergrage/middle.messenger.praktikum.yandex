import AuthAPI from '../api/auth-api';
import Router from '../router/Router';
import store from '../store/Store';

class LogoutController {
  public logout() {
    AuthAPI.logout().then(() => {
      store.set('user', {});
      const router = new Router('.app');
      router.go('/sign-in');
      location.reload();
    }).catch((err) => console.log(err));
  }
}

export default new LogoutController();
