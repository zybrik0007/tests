const {it} = require('mocha');
const el = require('../../elements');
const dec = require('../../dictionaries/decorate');


module.exports = {
    input: ({title, placeholder, timeout}) => it(`Отображение поле ввода ${title ? title : placeholder}.`,
        async () => await dec.simple(el.input.input,
            [title, placeholder, timeout],
            el.input)),

    sendKeys: ({title, placeholder, value, timeout}) =>
        it(`Ввод значения ${value} в поле ввода ${title ? title : placeholder}.`,
            async () => await dec.simple(el.input.sendKeys,
                [title, placeholder, value, timeout],
                el.input)),

    getValue: ({title, placeholder, value, timeout}) =>
        it(`Получение значения поля ввода ${title ? title : placeholder}.`,
            async () => await dec.simpleText(el.input.getValue,
                [title, placeholder, timeout],
                value,
                el.input)),

    clear: ({title, placeholder, timeout}) => it(`Удалить значени в поле ввода ${title ? title : placeholder}.`,
        async () => await dec.simple(el.input.clear,
            [title, placeholder, timeout],
            el.input)),

    iconXpand: ({title, placeholder, timeout}) =>
        it(`Нажатие иконки xpand в поле ввода ${title ? title : placeholder}.`,
            async () => await dec.simple(el.input.iconXpand,
                [title, placeholder, timeout],
                el.input)),

    iconClear: ({title, placeholder, timeout}) =>
        it(`Нажатие иконки clear в поле ввода ${title ? title : placeholder}.`,
            async () => await dec.simple(el.input.iconClear,
                [title, placeholder, timeout],
                el.input)),

    iconOutline: ({title, placeholder, timeout}) =>
        it(`Нажатие иконки outline в поле ввода ${title ? title : placeholder}.`,
            async () => await dec.simple(el.input.iconOutline,
                [title, placeholder, timeout],
                el.input)),

    iconCalendar: ({title, placeholder, timeout}) =>
        it(`Нажатие иконки calendar в поле ввода ${title ? title : placeholder}.`,
            async () => await dec.simple(el.input.iconCalendar,
                [title, placeholder, timeout],
                el.input)),

    iconCard: ({title, placeholder, timeout}) =>
        it(`Нажатие иконки card в поле ввода ${title ? title : placeholder}.`,
            async () => await dec.simple(el.input.iconCard,
                [title, placeholder, timeout],
                el.input)),

    handler: ({title, placeholder, timeout}) =>
        it(`Нажатие по полю ввода ${title ? title : placeholder}.`,
            async () => await dec.simple(el.input.handler,
                [title, placeholder, timeout],
                el.input)),

    backSpace: ({title, placeholder, timeout}) =>
        it(`Удаление значения input ${title ? title : placeholder} через Backspace.`,
            async () => await dec.simple(el.input.backSpace,
                [title, placeholder, timeout],
                el.input)),
}
