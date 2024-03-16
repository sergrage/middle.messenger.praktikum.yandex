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
        value: '',
    },
    {
        for: 'newPassword',
        name: 'newPassword',
        type: 'password',
        title: 'Новый пароль',
        value: '',
    },
];

export default data;