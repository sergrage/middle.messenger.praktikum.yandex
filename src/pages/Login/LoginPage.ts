import "./login.scss";

import Block from '../../core/Block';
import InputGroup from '../../components/InputGroup/InputGroup';

import {tpl} from './template';
import Button from '../../components/Button/Button';

import ValidateService from '../../core/ValidateService';
import Router from "../../router/Router";
import store from "../../store/Store";

import LoginController from "../../controllers/LoginController";
import {Indexed} from "../../types/types";
import connect from "../../core/HOC";

interface DataInterface {
    for: string;
    title: string;
    name: string;
    type: string;
    subClass?: string;
}

class LoginPage extends Block {
    constructor(props: Record<string, unknown>) {
        // Создаём враппер дом-элемент
        super('div', props);

        if (this.props.data && Array.isArray(this.props.data)) {
            this.children.inputGroup = this.props.data.map((item: DataInterface) => new InputGroup({
                className: 'inputGroup',
                labelClassName: 'inputGroup__label',
                inputClassName: 'inputGroup__input',
                settings: {withInternalID: true},
                for: item.for,
                title: item.title,
                name: item.name,
                type: item.type,
                subClass: item.subClass,
            }));
        }

        this.children.button = new Button({
            buttonText: 'Войти',
            className: 'btn btn-big btn-purple',
            settings: {withInternalID: true},
            // type: 'submit',
            events: {
                click: (event: any) => {
                    event.preventDefault();
                    const form = event.target.closest('form');
                    const data = new FormData(form);
                    const loginData: Record<string, string> = {};
                    data.forEach((value, key) => {
                        if (typeof value === 'string') {
                            (loginData[key] = value);
                        }
                    });

                    for (const [key, value] of Object.entries(loginData)) {
                        const validateService = new ValidateService(key, value);

                        if (Array.isArray(this.children.inputGroup)) {
                            const input = this.children.inputGroup.find((element) => element.props.name === key);
                            if (input) {
                                input.setProps({validateMessage: validateService.errorMessage()});
                                input.setProps({showValidateError: validateService.validate[key]});
                            }
                        }
                    }
                    LoginController.signIn(loginData);
                },
            },
        });
        this.children.link = new Button({
            buttonText: 'Создать аккаунт',
            className: 'btn btn-text m-auto',
            settings: {withInternalID: true},
            events: {
                click: (event: any) => {
                    event.preventDefault();
                    const router = new Router(".app");
                    router.go('/sign-up');
                }
            }
        });

        // Создание кнопки лучше вынести в конструктор, чтобы не делать это при каждом рендере
        this.eventBus().emit(Block.EVENTS.FLOW_CDU);
    }

    render() {
        return this.compile(tpl, {
            button: this.props.button,
            link: this.props.link,
            showAlert: store.getState().loginPage.showAlert,
            alertText: store.getState().loginPage.alertText,
        });
    }
}

function mapUserToProps(state: Indexed) {
    return {
        showAlert: state.loginPage.showAlert,
        alertText: state.loginPage.alertText,
    };
}

export default connect(LoginPage, mapUserToProps);

