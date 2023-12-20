const {it} = require('mocha');
const el = require('../../elements');
const dec = require('../../dictionaries/decorate');



module.exports = {
    init: ({timeout}) => it(`Отображение модального окна печати таблицы.`,
        async() => await dec.simple(el.modal.printTable.init,
            [timeout],
            el.modal.printTable)),

    initClose: ({timeout}) => it(`Отсутствие модального окна печати таблицы.`,
        async() => await dec.simple(el.modal.printTable.initClose,
            [timeout],
            el.modal.printTable)),

    closeHandler: ({timeout}) => it(`Нажатие кнопки закрытия модального окна печати таблицы.`,
        async() => await dec.simple(el.modal.printTable.closeHandler,
            [timeout],
            el.modal.printTable)),

    cellGetText: ({head, str, cell, value, timeout}) =>
        it(`В печатной форме таблицы в строке ${str} в столбце ${cell} - "${head}" отображается "${value}".`,
            async() => dec.simpleText(el.modal.printTable.cellGetText,
                [head, str, cell, timeout],
                value,
                el.modal.printTable))
}


