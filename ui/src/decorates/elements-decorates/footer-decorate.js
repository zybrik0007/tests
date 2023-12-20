const {it} = require('mocha');
const el = require('../../elements');
const dec = require('../../dictionaries/decorate');


module.exports = {
    selectGetText: ({value, timeout}) =>
        it(`Нижняя часть страницы. Число записей для отображения в таблице - ${value}.`,
            async () => await dec.simpleText(el.footer.selectGetText,
                [timeout],
                value,
                el.footer)),

    countGetText: ({value, timeout}) => it(`Нижняя часть страницы. Число всех записей в таблице - ${value}.`,
        async () => await dec.simpleText(el.footer.countGetText,
            [timeout],
            value,
            el.footer)),

    selectHandler: ({value, timeout}) =>
        it(`Нижняя часть страницы. Выбор "${value}" в количестве отображения записей в таблице.`,
            async () => await dec.simple(el.footer.selectHandler,
                [value, timeout],
                el.footer)),

    page: ({value, timeout}) => it(`Нижняя часть страницы. Отображения номера страницы "${value}".`,
        async () => await dec.simple(el.footer.page,
            [value, timeout],
            el.footer)),

    noPage: ({value, timeout}) => it(`Нижняя часть страницы. Отсуствие номера страницы "${value}".`,
        async () => await dec.simple(el.footer.noPage,
            [value, timeout],
            el.footer)),

    pageActive: ({value, timeout}) => it(`Нижняя часть страницы. Номер страницы "${value}" активнен.`,
        async () => await dec.simple(el.footer.pageActive,
            [value, timeout],
            el.footer)),

    pageHandler: ({value, timeout}) => it(`Нижняя часть страницы. Нажатие по странинце с номером  "${value}".`,
        async () => await dec.simple(el.footer.pageHandler,
                [value, timeout],
            el.footer)),

    pageIconActive: ({value, timeout}) => it(`Нижняя часть страницы. Кнопка "${icon.description}" активна.`,
        async () => await dec.simple(el.footer.pageIconActive,
            [value, timeout],
            el.footer)),

    pageIconDisabled: ({value, timeout}) => it(`Нижняя часть страницы. Кнопка "${icon.description}" не активна.`,
        async () => await dec.simple(el.footer.pageIconDisabled,
            [value, timeout],
            el.footer)),

    pageIconHandler: ({value, timeout}) => it(`Нижняя часть страницы. Нажатие кнопки "${icon.description}".`,
        async () => await dec.simple(el.footer.pageIconHandler,
            [value, timeout],
            el.footer)),

    pageNoArea: ({timeout}) => it(`Нижняя часть страницы. Отсутствие кнопок переключения страниц.`,
        async () => await dec.simple(el.footer.pageIconHandler,
            [timeout],
            el.footer)),
}

