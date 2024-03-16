import AuthAPI from "./../api/auth-api";
import store from "./../store/Store"
import {Indexed} from "../types/types";
import UserApi from "../api/user-api";

class UserController {
    public async userInfo() {
        const res = await AuthAPI.userInfo();
        store.set('user', res)
    }

    public changePassword(payload: Indexed) {
        UserApi.changePassword(payload).then((res) => {
            if ((<any>res).reason) {
                store.set('changePassword.showAlert', true);
                store.set('changePassword.alertText', (<any>res).reason);
            } else {
                store.set('changePassword.showAlert', true);
                store.set('changePassword.alertText', 'Пароль успешно изменен');
            }
        }).catch(err => {
            console.log('err', err)
        })
    }

    public uploadAvatar(payload: Indexed) {
        UserApi.addAvatar(payload).then(async (res) => {
            console.log('res', res)
            await this.userInfo();
        }).catch(err => {
            console.log('err', err)
        })
    }
}

export default new UserController();
