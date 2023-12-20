const {it} = require('mocha');
const el = require('../../elements');
const dec = require('../../dictionaries/decorate');



module.exports = {
    init: ({timeout}) => it(`Отображение модального Неиспользуемые идентификаторы.`,
        async() => await dec.simple(el.modal.removeIdentifiers.init,
            [timeout],
            el.modal.removeIdentifiers)),

    initClose: ({timeout}) => it(`Отсутствие модального окна Неиспользуемые идентификаторы.`,
        async() => await dec.simple(el.modal.removeIdentifiers.initClose,
            [timeout],
            el.modal.removeIdentifiers)),

    noStr: ({timeout}) => it(`Отсутствие строк в таблице модального окна Неиспользуемые идентификаторы.`,
        async() => await dec.simple(el.modal.removeIdentifiers.noStr,
            [timeout],
            el.modal.removeIdentifiers)),

    size: ({count, timeout}) => it(`В таблице модального окна Неиспользуемые идентификаторы отображается ${count} строк.`,
        async() => await dec.simple(el.modal.removeIdentifiers.size,
            [count, timeout],
            el.modal.removeIdentifiers)),

    cellGetText: ({headTitle, strNumber, cellNumber, value, timeout}) =>
        it(`В таблице модального окна Неиспользуемые идентификаторы  в строке ${strNumber} 
        в столбце ${cellNumber} - "${headTitle}" отображается ${value}.`,
            async() => await dec.simpleText(el.modal.removeIdentifiers.cellGetText,
                [headTitle, strNumber, cellNumber, timeout],
                value,
                el.modal.removeIdentifiers)),

    headGetText: ({cellNumber, value, timeout}) => it(`В таблице модального окна Неиспользуемые идентификаторы в заглавие 
    столбца ${cellNumber} отображается ${value}.`,
        async() => await dec.simpleText(el.modal.removeIdentifiers.cellGetText,
            [cellNumber, timeout],
            value,
            el.modal.removeIdentifiers)),

    checkboxHandler: ({strNumber, timeout}) => it(`Нажатие по чекбоксу в строке ${strNumber} в модальном окне Неиспользуемые идентификаторы.`,
        async() => await dec.simple(el.modal.removeIdentifiers.checkboxHandler,
            [strNumber, timeout],
            el.modal.removeIdentifiers)),

    checkboxChecked: ({strNumber, timeout}) => it(`Чекбокс в строке ${strNumber} 
    в модальном окне Неиспользуемые идентификаторы нажат.`,
        async() => await dec.simple(el.modal.removeIdentifiers.checkboxChecked,
            [strNumber, timeout],
            el.modal.removeIdentifiers)),

    checkboxUnchecked: ({strNumber, timeout}) => it(`Чекбокс в строке ${strNumber} 
    в модальном окне Неиспользуемые идентификаторы не нажат.`,
        async() => await dec.simple(el.modal.removeIdentifiers.checkboxUnchecked,
            [strNumber, timeout],
            el.modal.removeIdentifiers)),

    closeHandler: ({timeout}) => it(`Нажатие кнопки закрытия модального окна Неиспользуемые идентификаторы.`,
        async() => await dec.simple(el.modal.removeIdentifiers.closeHandler,
            [timeout],
            el.modal.removeIdentifiers)),
}


