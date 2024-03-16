export class BaseAPI {
    // На случай, если забудете переопределить метод и используете его, — выстрелит ошибка

    baseURL:string = 'https://ya-praktikum.tech/api/v2';
    wsBaseURL:string = 'wss://ya-praktikum.tech/ws/';
    create() { throw new Error('Not implemented'); }

    request() { throw new Error('Not implemented'); }

    update() { throw new Error('Not implemented'); }

    delete() { throw new Error('Not implemented'); }
}