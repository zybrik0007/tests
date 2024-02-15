const {it} = require('mocha');
const page = require('../../pages');
const dec = require('../../dictionaries/decorate');

module.exports = {
    initAdd: ({timeout}) => it('Проверка заглавия и url.', async () => await dec.simple(page.schedulePageChange.initAdd,
        [timeout],
        page.schedulePageChange)),

    initEdit: ({timeout}) => it('Проверка заглавия и url.', async () => await dec.simple(page.schedulePageChange.initEdit,
        [timeout],
        page.schedulePageChange)),

    handler: ({numInterval, timeout}) => it(`Нажатие по интервалу с порядковым номером ${numInterval}.`,
        async () => await dec.simple(page.schedulePageChange.handler,
        [numInterval, timeout],
        page.schedulePageChange)),

    interval: ({numInterval, timeout}) => it(`Отображение интервала c порядковым номером ${numInterval}.`,
        async () => await dec.simple(page.schedulePageChange.interval,
            [numInterval, timeout],
            page.schedulePageChange)),

    timeRemove: ({numInterval, numTime, timeout}) => it(`Удаление времененного интервала с порядковым номером "${numTime}" 
    в интервальном блоке c порядковым номером ${numInterval}.`,
        async () => await dec.simple(page.schedulePageChange.timeRemove,
            [numInterval, numTime, timeout],
            page.schedulePageChange)),

    selectTypeInterval: ({numInterval, numTime, value, timeout}) => it(`Выбор тип "${value} у временного блока с порядковым 
    номером ${numTime} в интревале ${numInterval}".`,
        async () => await dec.simple(page.schedulePageChange.selectTypeInterval,
            [numInterval, numTime, value, timeout],
            page.schedulePageChange)),

    getTypeInterval: ({numInterval, numTime, value, timeout}) => it(`Отображение у временного блока с порядковым 
    номером ${numTime} в интревале ${numInterval}" значения "${value}".`,
        async () => await dec.simpleText(page.schedulePageChange.selectGetTypeInterval,
            [numInterval, numTime, timeout],
            value,
            page.schedulePageChange)),


}