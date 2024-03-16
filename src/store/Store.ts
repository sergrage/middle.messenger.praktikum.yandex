import EventBus from "../core/EventEmmiter";
import set from "./../utils/set";
import {Indexed} from "../types/types";


export enum StoreEvents {
    Updated = 'updated',
}

class Store extends EventBus {
    private state: Indexed = {
        chat: {
            chat_id: null,
            title: '',
            connection: null,
            users: []
        },
        chatMessages: [],
        registerPage: {
            showAlert: false,
            alertText: '',
        },
        loginPage: {
            showAlert: false,
            alertText: '',
        },
        user: {},
        chats: [],
        changePassword: {
            showAlert: false,
            alertText: '',
        },
    };

    public getState() {
        return this.state;
    }

    public set(path: string, value: unknown) {
        set(this.state, path, value);
        // метод EventBus
        this.emit(StoreEvents.Updated);
    };
}

export default new Store();
