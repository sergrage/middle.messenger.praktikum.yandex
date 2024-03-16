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

export default data;