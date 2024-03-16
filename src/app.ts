import Router from "./router/Router";
import ChatPage from "./pages/Chat/ChatPage";
import ServerErrorPage from "./pages/500/500";
import NotFoundPage from "./pages/404/404";
import RegisterPage from "./pages/Register/RegisterPage";
import EditProfile from "./pages/EditProfile/EditProfile";

import registerData from "./pages/Register/registerData";
import loginData from "./pages/Login/loginData";
import profileData from "./pages/Profile/profileData";
import editPasswordData from "./pages/EditPassword/editPasswordData";

import {chatThreads} from "./pages/Chat/chatData";
import {chatMessages} from "./pages/Chat/chatData";

import LoginPage from "./pages/Login/LoginPage";
import EditPassword from "./pages/EditPassword/EditPassword";


const router = new Router(".app");

router
    .use("/", RegisterPage , {
        'title' : 'Страница регистрации',
        'data' : registerData
    })
    .use("/messenger", ChatPage , {
        'title' : 'Чат',
        'data' : {
            chatThreads,
            chatMessages
        }
    })
    .use("/settings", EditProfile , {
        'title' : 'Настройки профиля',
        'data' : profileData
    })
    .use("/change-password", EditPassword , {
        'title' : 'Сменить пароль',
        'data' : editPasswordData
    })
    .use("/sign-up", RegisterPage , {
        'title' : 'Страница регистрации',
        'data' : registerData
    })
    .use("/sign-in", LoginPage , {
        'title' : 'Страница входа',
        'data' : loginData
    })
    .use("/404", NotFoundPage, {'title' :'Страница не найдена'})
    .use("/505", ServerErrorPage, {'title' :'Ошибка сервера'})
    .start();
