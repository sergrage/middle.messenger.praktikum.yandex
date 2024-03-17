import AuthAPI from '../api/auth-api';
import Router from '../router/Router';

class LogoutController {
  public logout() {
    AuthAPI.logout().then(() => {
      const router = new Router('.app');
      router.go('/sign-in');
    }).catch((err) => console.log(err));
  }
}

export default new LogoutController();
