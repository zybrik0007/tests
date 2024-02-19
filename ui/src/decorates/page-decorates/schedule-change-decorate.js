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

    intervalSumTime: ({numInterval, value, timeout}) => it(`У интевала с порядковым номером "${numInterval}" 
    рабочее время равно "${value}".`,
        async () => await dec.simpleText(page.schedulePageChange.intervalSumTime,
            [numInterval, timeout],
            value,
            page.schedulePageChange)),

    intervalName: ({numInterval, value, timeout}) => it(`У интевала с порядковым номером "${numInterval}" 
    название равно "${value}".`,
        async () => await dec.simpleText(page.schedulePageChange.intervalName,
            [numInterval, timeout],
            value,
            page.schedulePageChange)),

    startTimeSendKeys: ({numInterval, numTime, value, timeout}) => it(`Ввод ${value} как значение начала в интервале с 
    порядковым номером ${numInterval} и временным блоком ${numTime}.`,
        async () => await dec.simple(page.schedulePageChange.startTimeSendKeys,
            [numInterval, numTime, value, timeout],
            page.schedulePageChange)),

    endTimeSendKeys: ({numInterval, numTime, value, timeout}) => it(`Ввод ${value} как значение окончания в интервале 
            с порядковым номером ${numInterval} и временным блоком ${numTime}.`,
        async () => await dec.simple(page.schedulePageChange.endTimeSendKeys,
            [numInterval, numTime, value, timeout],
            page.schedulePageChange)),

    startTimeGetValue: ({numInterval, numTime, value, timeout}) => it(`Значения времени начала в интервале с порядковым 
    номером ${numInterval} и временного блока с порядковым номером ${numTime} равно "${value}".`,
        async () => await dec.simpleText(page.schedulePageChange.startTimeGetValue,
            [numInterval, numTime, timeout],
            value,
            page.schedulePageChange)),

    endTimeGetValue: ({numInterval, numTime, value, timeout}) => it(`Значения времени окончания в интервале с порядковым 
    номером ${numInterval} и временного блока с порядковым номером ${numTime} равно "${value}".`,
        async () => await dec.simpleText(page.schedulePageChange.endTimeGetValue,
            [numInterval, numTime, timeout],
            value,
            page.schedulePageChange)),

    scrollTop: ({scroll, timeout}) => it(`Скролл интервалов.`,
        async () => await dec.simple(page.schedulePageChange.selectTypeInterval,
            [numInterval, numTime, value, timeout],
            page.schedulePageChange)),

}