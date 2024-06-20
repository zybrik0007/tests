const {it} = require('mocha');
const page = require('../../pages');
const dec = require('../../dictionaries/decorate');

module.exports = {

    dayHandler: ({day, timeout}) => it(`Нажатие по дню недели "${day}".`,
        async () => await dec.simple(page.taskChange.dayHandler,
            [day, timeout],
            page.taskChange)),

    dayNoActive: ({day, timeout}) => it(`День "${day}" не активен.`,
        async () => await dec.simple(page.taskChange.dayNoActive,
            [day, timeout],
            page.taskChange)),

    dayActive: ({day, timeout}) => it(`День "${day}" активен.`, async () => await dec.simple(page.taskChange.dayActive,
        [day, timeout],
        page.taskChange)),

    actionSelectedGetText: ({number, value, timeout}) =>
        it(`Значения выбранного действия с порядковым номером ${number} равно "${value}".`,
            async () => await dec.simpleText(page.taskChange.actionSelectedGetText,
                [number, timeout],
                value,
                page.taskChange)),

    actionSelectedDelete: ({number, timeout}) =>
        it(`Удаление значения выбранного действия с порядковым номером ${number}.`,
            async () => await dec.simple(page.taskChange.actionSelectedDelete,
                [number, timeout],
                page.taskChange)),

    actionHandler: ({name, timeout}) => it(`Выбор "${name}" в списке Добавить действия.`,
            async () => await dec.simple(page.taskChange.actionHandler,
                [name, timeout],
                page.taskChange)),
}