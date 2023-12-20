const {it} = require('mocha');
const el = require('../../elements');
const dec = require('../../dictionaries/decorate');


module.exports = {
    profileHandler: ({timeout}) => it(`Нажатие по проофилю в заглавии.`,
        async () => await dec.simple(el.header.profileHandler,
            [timeout],
            el.header)),

    menu: ({timeout}) => it(`Отображение меню профиля в заглавии.`,
        async () => await dec.simple(el.header.menu,
            [timeout],
            el.header)),

    menuNoElement: ({timeout}) => it(`Отсутствия отображения меню профиля в заглавии.`,
        async () => await dec.simple(el.header.menuNoElement,
            [timeout],
            el.header)),

    exitHandler: ({timeout}) => it(`Нажатие "Выход" в заглавии.`,
        async () => await dec.simple(el.header.exitHandler,
            [timeout],
            el.header)),

    getText: ({value, timeout}) => it(`Значения текста в заглавии равно ${value}.`,
        async () => await dec.simpleText(el.header.getText,
            [timeout],
            value,
            el.header)),

    userGetText: ({value, timeout}) => it(`Имя пользователя равно ${value}.`,
        async () => await dec.simpleText(el.header.userGetText,
            [timeout],
            value,
            el.header)),
}
