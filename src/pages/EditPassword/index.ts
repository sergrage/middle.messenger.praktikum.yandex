import './../Profile/profile.scss';
import EditPassword from "./EditPassword";
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
        for: 'oldPassword',
        name: 'oldPassword',
        type: 'password',
        title: 'Старый пароль',
        value: 'Qqwerty123',
    },
    {
        for: 'newPassword',
        name: 'newPassword',
        type: 'password',
        title: 'Новый пароль',
        value: 'Qqwerty123',
    },
    {
        for: 'newPasswordRepeat',
        name: 'newPasswordRepeat',
        type: 'password',
        title: 'Повторите новый пароль',
        value: 'Qqwerty123',
    },
];

const page = new EditPassword({
    settings: {withInternalID: true},
    data: data
});

// testPage — это class дива в корне DOM
render(".app", page);
