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

  constructor(name: string, value: string) {
    this.value = value;
    this.name = name;
  }

  get login() {
    return !(/^(\d|\w){3,20}$/g.test(this.value) && !/^[0-9]*$/g.test(this.value));
  }

  get password() {
    return !(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,40}$/.test(this.value));
  }

  get oldPassword() {
    return !(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,40}$/.test(this.value));
  }

  get newPassword() {
    return !(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,40}$/.test(this.value));
  }

  get newPasswordRepeat() {
    return !(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,40}$/.test(this.value));
  }

  get email() {
    return !(/^[\w-_.]+@([\w-]+\.)+[\w-]{2,4}$/.test(this.value));
  }

  get first_name() {
    return !(/^[A-ZА-Я](\D)[a-zа-я-]+$/.test(this.value));
  }

  get display_name() {
    return !(/^[A-ZА-Я](\D)[a-zа-я-]+$/.test(this.value));
  }

  get second_name() {
    return !(/^[A-ZА-Я](\D)[a-zа-я-]+$/.test(this.value));
  }

  get phone() {
    return !(/^[+]?[0-9]{10,15}$/.test(this.value));
  }

  errorMessage() {
    return this.errorMsg[this.name].msg;
  }
}
