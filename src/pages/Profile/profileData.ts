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
        value: '',
    },
    {
        name: 'login',
        type: 'text',
        title: 'Логин',
        value: '',
    },
    {
        name: 'first_name',
        type: 'text',
        title: 'Имя',
        value: '',
    },
    {
        name: 'second_name',
        type: 'text',
        title: 'Фамилия',
        value: '',
    },
    {
        name: 'display_name',
        type: 'text',
        title: 'Имя в чате',
        value: '',
    },
    {
        name: 'phone',
        type: 'text',
        title: 'Телефон',
        value: '',
    },
];

export default data;