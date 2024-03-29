interface DataInterface {
    for: string;
    title: string;
    name: string;
    type: string;
    subClass?: string;
}

const registerData: DataInterface[] = [
  {
    title: 'Почта',
    for: 'email',
    name: 'email',
    type: 'text',
  },
  {
    title: 'Логин',
    for: 'login',
    name: 'login',
    type: 'text',
  },
  {
    title: 'Имя',
    for: 'first_name',
    name: 'first_name',
    type: 'text',
  },
  {
    title: 'Фамилия',
    for: 'second_name',
    name: 'second_name',
    type: 'text',
  },
  {
    title: 'Телефон',
    for: 'phone',
    name: 'phone',
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

export default registerData;
