import './profile.scss';
import ProfilePage from "./ProfilePage";
import {render} from "../../utils/renderDOM";

interface DataInterface {
    title: string;
    name: string;
    type: string;
    value: string;
}

const data: DataInterface[] = [
    {
        name: 'email',
        type: 'text',
        title: 'Почта',
        value: 'pochta@yandex.ru',
    },
    {
        name: 'login',
        type: 'text',
        title: 'Логин',
        value: 'ivanivanov',
    },
    {
        name: 'first_name',
        type: 'text',
        title: 'Имя',
        value: 'Иван',
    },
    {
        name: 'second_name',
        type: 'text',
        title: 'Фамилия',
        value: 'Иванов',
    },
    {
        name: 'display_name',
        type: 'text',
        title: 'Имя в чате',
        value: 'Иван',
    },
    {
        name: 'phone',
        type: 'text',
        title: 'Телефон',
        value: '+7 (909) 967 30 30',
    },
];

const page = new ProfilePage({
    settings: {withInternalID: true},
    data: data
});

// testPage — это class дива в корне DOM
render(".app", page);
