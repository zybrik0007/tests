const {it} = require('mocha');
const el = require('../../elements');
const dec = require('../../dictionaries/decorate');

module.exports = {
    select: ({title, value, timeout}) => it(`Отображение выпадающего списка ${title} - ${value}.`,
        async () => await dec.simple(el.select.select,
            [title, value, timeout],
            el.select)),

    noSelect: ({title, value, timeout}) => it(`Отсутствие выпадающего списка ${title} - ${value}.`,
        async () => await dec.simple(el.select.noSelect,
            [title, value, timeout],
            el.select)),

    getText: ({title, value, timeout}) => it(`Получение выбранного значения у выпадающего списка ${title} - ${value}.`,
        async () => await dec.simpleText(el.select.getText,
            [title, value, timeout],
            value,
            el.select)),

    iconXpand: ({title, value, text, timeout}) =>
        it(`Нажатие по иконки xpand у выпадающего списка ${title} - ${value} и выбор значения "${text}" в списке.`,
            async () => await dec.simple(el.select.iconXpand,
                [title, value, text, timeout],
                el.select)),

    iconExpand: ({title, value, timeout}) =>
        it(`Нажатие по иконке xpand у выпадающего списка ${title ? title : value}.`,
            async () => await dec.simple(el.select.iconExpand,
                [title, value, timeout],
                el.select)),

    iconOutline: ({title, value, timeout}) =>
        it(`Нажатие по иконке outline у выпадающего списка ${title ? title : value}.`,
            async () => await dec.simple(el.select.iconOutline,
                [title, value, timeout],
                el.select)),

    iconMenu: ({title, value, timeout}) =>
        it(`Нажатие по иконке menu у выпадающего списка ${title ? title : value}.`,
            async () => await dec.simple(el.select.iconMenu,
                [title, value, timeout],
                el.select)),

    iconClear: ({title, value, timeout}) =>
        it(`Нажатие по иконке clear у выпадающего списка ${title ? title : value}.`,
            async () => await dec.simple(el.select.iconClear,
                [title, value, timeout],
                el.select))
}

