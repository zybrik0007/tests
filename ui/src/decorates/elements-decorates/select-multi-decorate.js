const {it} = require('mocha');
const el = require('../../elements');
const dec = require('../../dictionaries/decorate');

module.exports = {
    select: ({title, timeout}) => it(`Отображение выпадающего списка ${title}.`,
        async () => await dec.simple(el.selectMulti.select,
            [title, timeout],
            el.selectMulti)),

    getText: ({title, valueNumber, value, timeout}) =>
        it(`Значения у выпадающего списка ${title} значение с номером ${valueNumber} равно "${value}".`,
            async () => await dec.simpleText(el.selectMulti.getText,
                [title, valueNumber, timeout],
                value,
                el.selectMulti)),
    noData: ({title, valueNumber, timeout}) => it(`Отсутствие значений у выпадающего списка "${title}".`,
        async () => await dec.simpleFalse(el.selectMulti.getText,
            [title, valueNumber, timeout],
            el.selectMulti)),

    delete: ({title, valueNumber, timeout}) =>
        it(`Удаление значнение у выпадающего списка ${title} под номером ${valueNumber}.`,
            async () => await dec.simple(el.selectMulti.delete,
                [title, valueNumber, timeout],
                el.selectMulti)),

    iconXpand: ({title, timeout}) =>
        it(`Нажатие по иконке xpand у выпадающего списка ${title}.`,
            async () => await dec.simple(el.selectMulti.iconXpand,
                [title, timeout],
                el.selectMulti)),

    iconOutline: ({title, timeout}) =>
        it(`Нажатие по иконке outline у выпадающего списка ${title}.`,
            async () => await dec.simple(el.selectMulti.iconOutline,
                [title, timeout],
                el.selectMulti)),

    iconClear: ({title, timeout}) =>
        it(`Нажатие по иконке clear у выпадающего списка ${title}.`,
            async () => await dec.simple(el.selectMulti.iconClear,
                [title, timeout],
                el.selectMulti)),

    iconMenu: ({title, timeout}) =>
        it(`Нажатие по иконке menu у выпадающего списка ${title}.`,
            async () => await dec.simple(el.selectMulti.iconMenu,
                [title, timeout],
                el.selectMulti)),

    iconXpandSelected: ({title, value, timeout}) => it(`Выбор значения ${value} у выпадающего списка ${title}.`,
        async () => await dec.simple(el.selectMulti.iconXpandSelected,
            [title, value, timeout],
            el.selectMulti)),

}


