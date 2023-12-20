const {it} = require('mocha');
const el = require('../../elements');
const dec = require('../../dictionaries/decorate');

module.exports = {
    select: ({title, placeholder, timeout}) => it(`Отображение выпадающего списка ${title ? title : placeholder}.`,
        async () => await dec.simple(el.selectInput.select,
            [title, placeholder, timeout],
            el.selectInput)),

    getValue: ({title, placeholder, value, timeout}) =>
        it(`Получение выбранного значения у выпадающего списка ${title ? title : placeholder}.`,
            async () => await dec.simpleText(el.selectInput.select,
                [title, placeholder, timeout],
                value,
                el.selectInput)),

    iconXpand: ({title, placeholder, timeout}) =>
        it(`Нажатие по иконке xpand у выпадающего списка ${title ? title : placeholder}.`,
            async () => await dec.simple(el.selectInput.iconXpand,
                [title, placeholder, timeout],
                el.selectInput)),

    iconOutline: ({title, placeholder, timeout}) =>
        it(`Нажатие по иконке outline у выпадающего списка ${title ? title : placeholder}.`,
            async () => await dec.simple(el.selectInput.iconOutline,
                [title, placeholder, timeout],
                el.selectInput)),

    iconClear: ({title, placeholder, timeout}) =>
        it(`Нажатие по иконке clear у выпадающего списка ${title ? title : placeholder}.`,
            async () => await dec.simple(el.selectInput.iconClear,
                [title, placeholder, timeout],
                el.selectInput))
}