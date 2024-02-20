import './../Profile/profile.scss';
import EditProfile from "./EditProfile";
import {render} from "../../utils/renderDOM";

interface DataInterface {
    for: string;
    title: string;
    name: string;
    type: string;
    value: string;
    subClass?: string;
}

const data: DataInterface[] = [
    {
        for: "email",
        name: 'email',
        type: 'text',
        title: 'Почта',
        value: 'pochta@yandex.ru',
    },
    {
        for: "login",
        name: 'login',
        type: 'text',
        title: 'Логин',
        value: 'ivanivanov',
    },
    {
        for: "first_name",
        name: 'first_name',
        type: 'text',
        title: 'Имя',
        value: 'Иван',
    },
    {
        for: "second_name",
        name: 'second_name',
        type: 'text',
        title: 'Фамилия',
        value: 'Иванов',
    },
    {
        for: "display_name",
        name: 'display_name',
        type: 'text',
        title: 'Имя в чате',
        value: 'Иван',
    },
    {
        for: "phone",
        name: 'phone',
        type: 'text',
        title: 'Телефон',
        value: '+79099673030',
    },
];

const page = new EditProfile({
    settings: {withInternalID: true},
    data: data
});

// testPage — это class дива в корне DOM
render(".app", page);
