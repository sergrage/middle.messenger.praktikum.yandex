import './chat.scss';
import ChatPage from "./ChatPage";
import {render} from "../../utils/renderDOM";

interface ChatThreadsInterface {
    active?: boolean;
    name: string;
    lastText: string;
    myLast?: string;
    time: string;
    new?: string;
}

const chatThreads: ChatThreadsInterface[] = [
    {
        name: 'Илья',
        lastText: 'Друзья, у меня для вас особенный выпуск новостей!',
        time: '10:52',
        new: '3',
    },
    {
        name: 'Киноклуб',
        lastText: 'Друзья, у меня для вас особенный выпуск новостей!',
        time: 'Ср',
    },
    {
        active: true,
        name: 'Концерты',
        lastText: 'Друзья, у меня для вас особенный выпуск новостей!',
        time: '1 мая 2020г',
        myLast: 'true',
    },
    {
        name: 'Илья',
        lastText: 'Друзья, у меня для вас особенный выпуск новостей!',
        time: '10:52',
        new: '3',
    },
    {
        name: 'Киноклуб',
        lastText: 'Друзья, у меня для вас особенный выпуск новостей!',
        time: 'Ср',
    },
    {
        name: 'Концерты',
        lastText: 'Друзья, у меня для вас особенный выпуск новостей!',
        time: '1 мая 2020г',
        myLast: 'true',
    },
    {
        name: 'Илья',
        lastText: 'Друзья, у меня для вас особенный выпуск новостей!',
        time: '10:52',
        new: '3',
    },
    {
        name: 'Киноклуб',
        lastText: 'Друзья, у меня для вас особенный выпуск новостей!',
        time: 'Ср',
    },
    {
        name: 'Концерты',
        lastText: 'Друзья, у меня для вас особенный выпуск новостей!',
        time: '1 мая 2020г',
        myLast: 'true',
    },
    {
        name: 'Илья',
        lastText: 'Друзья, у меня для вас особенный выпуск новостей!',
        time: '10:52',
        new: '3',
    },
    {
        name: 'Киноклуб',
        lastText: 'Друзья, у меня для вас особенный выпуск новостей!',
        time: 'Ср',
    },
    {
        name: 'Концерты',
        lastText: 'Друзья, у меня для вас особенный выпуск новостей!',
        time: '1 мая 2020г',
        myLast: 'true',
    },
    {
        name: 'Илья',
        lastText: 'Друзья, у меня для вас особенный выпуск новостей!',
        time: '10:52',
        new: '3',
    },
    {
        name: 'Киноклуб',
        lastText: 'Друзья, у меня для вас особенный выпуск новостей!',
        time: 'Ср',
    },
    {
        name: 'Концерты',
        lastText: 'Друзья, у меня для вас особенный выпуск новостей!',
        time: '1 мая 2020г',
        myLast: 'true',
    }
];

interface MessagesInterface {
    companion?: boolean,
    my?: boolean,
    img?: string,
    alt?: string,
    time: string,
    text?: string[]
}

interface ChatMessagesInterface {
    day: string;
    messages: MessagesInterface[];
}


const chatMessages: ChatMessagesInterface[] = [
        {
            day: '19 июня',
            messages: [
                {
                    companion: true,
                    text: [
                        'Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой.',
                        'Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой.',
                    ],
                    time: '15:13',
                },
                {
                    my: true,
                    text: [
                        'Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой.',
                        'Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой.',
                    ],
                    time: '12:00',
                },
                {
                    companion: true,
                    img: '/static/img/blacksabbath.jpeg',
                    alt: 'blacksabbath',
                    time: '15:13',
                },
                {
                    companion: true,
                    text: [
                        'Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой.',
                        'Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой.',
                    ],
                    time: '15:13',
                },
                {
                    my: true,
                    text: [
                        'Круто!!!',
                    ],
                    time: '12:00',
                },
                {
                    companion: true,
                    text: [
                        'Круто!!!',
                    ],
                    time: '12:00',
                },
                {
                    companion: true,
                    text: [
                        'Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой.',
                        'Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой.',
                    ],
                    time: '15:13',
                },
                {
                    my: true,
                    text: [
                        'Круто!!!',
                    ],
                    time: '12:00',
                },
                {
                    my: true,
                    img: '/static/img/savatage.jpg',
                    alt: 'savatage',
                    time: '15:13',
                },
            ],
        },
        {
            day: '31 июня',
            messages: [
                {
                    companion: true,
                    text: [
                        'Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой.',
                        'Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой.',
                    ],
                    time: '15:13',
                },
                {
                    my: true,
                    text: [
                        'Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой.',
                        'Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой.',
                    ],
                    time: '12:00',
                },
                {
                    companion: true,
                    img: '/static/img/blacksabbath.jpeg',
                    alt: 'blacksabbath',
                    time: '15:13',
                },
                {
                    companion: true,
                    text: [
                        'Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой.',
                        'Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой.',
                    ],
                    time: '15:13',
                },
                {
                    my: true,
                    text: [
                        'Круто!!!',
                    ],
                    time: '12:00',
                },
                {
                    companion: true,
                    text: [
                        'Круто!!!',
                    ],
                    time: '12:00',
                },
                {
                    companion: true,
                    text: [
                        'Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой.',
                        'Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой.',
                    ],
                    time: '15:13',
                },
                {
                    my: true,
                    text: [
                        'Круто!!!',
                    ],
                    time: '12:00',
                },
                {
                    my: true,
                    img: '/static/img/savatage.jpg',
                    alt: 'savatage',
                    time: '15:13',
                },
            ],
        },
    ];


const chatPage = new ChatPage({
    chatThreads: chatThreads,
    chatMessages: chatMessages,
    settings: {withInternalID: true},
});

// testPage — это class дива в корне DOM
render(".container", chatPage);
