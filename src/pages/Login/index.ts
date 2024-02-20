import './login.scss';
import LoginPage from "./LoginPage";
import {render} from "../../utils/renderDOM";

interface DataInterface {
    for: string;
    title: string;
    name: string;
    type: string;
    subClass?: string;
}

const data: DataInterface[] = [
    {
        title: 'Логин',
        for: 'login',
        name: 'login',
        type: 'text',
    },
    {
        title: 'Пароль',
        for: 'password',
        name: 'password',
        type: 'password',
        subClass: 'inputGroup__input-purple',
    },
];

const page = new LoginPage({
    settings: {withInternalID: true},
    data: data
});

// testPage — это class дива в корне DOM
render(".app", page);
