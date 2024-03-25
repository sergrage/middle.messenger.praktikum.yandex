import { Indexed } from '../types/types';
import UserApi from '../api/user-api';
import store from '../store/Store';

class ProfileController {
  update(payload: Indexed) {
    UserApi.updateProfile(payload).then((res) => {
      if ((<any>res).error) {
        console.log(res);
      } else {
        store.set('user', res);
      }
    }).catch((err) => {
      console.log(err);
    });
  }
}

export default new ProfileController();
