interface ValidInterface {
    msg: string;
}

export default class ValidateService {
  value: string;

  name: string;

  errorMsg: Record<string, ValidInterface> = {
    login: {
      msg: 'Неправильный логин',
    },
    password: {
      msg: 'Неправильный пароль',
    },
    oldPassword: {
      msg: 'Неправильный пароль',
    },
    newPassword: {
      msg: 'Неправильный пароль',
    },
    newPasswordRepeat: {
      msg: 'Неправильный пароль',
    },
    email: {
      msg: 'Неправильный формат email',
    },
    first_name: {
      msg: 'Неправильное имя',
    },
    second_name: {
      msg: 'Неправильная фамилия',
    },
    display_name: {
      msg: 'Неправильный display_name',
    },
    phone: {
      msg: 'Неправильный формат телефона',
    },
  };

  validate: Record<string, boolean>;

  constructor(name: string, value: string) {
    this.value = value;
    this.name = name;


    this.validate = {
      login : !(/^(\d|\w){3,20}$/g.test(this.value) && !/^[0-9]*$/g.test(this.value)),
      password: !(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,40}$/.test(this.value)),
      oldPassword : !(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,40}$/.test(this.value)),
      newPassword : !(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,40}$/.test(this.value)),
      newPasswordRepeat : !(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,40}$/.test(this.value)),
      email : !(/^[\w-_.]+@([\w-]+\.)+[\w-]{2,4}$/.test(this.value)),
      first_name:!(/^[A-ZА-Я](\D)[a-zа-я-]+$/.test(this.value)),
      display_name:!(/^[A-ZА-Я](\D)[a-zа-я-]+$/.test(this.value)),
      second_name:!(/^[A-ZА-Я](\D)[a-zа-я-]+$/.test(this.value)),
      phone:!(/^[+]?[0-9]{10,15}$/.test(this.value))
      }
    }
  errorMessage() {
    return this.errorMsg[this.name].msg;
  }
}
