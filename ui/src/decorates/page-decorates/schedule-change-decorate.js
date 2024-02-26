const {it} = require('mocha');
const page = require('../../pages');
const dec = require('../../dictionaries/decorate');

module.exports = {
    initAdd: ({timeout}) => it('Проверка заглавия и url.', async () => await dec.simple(page.schedulePageChange.initAdd,
        [timeout],
        page.schedulePageChange)),

    initEdit: ({timeout}) => it('Проверка заглавия и url.',
        async () => await dec.simple(page.schedulePageChange.initEdit,
            [timeout],
        page.schedulePageChange)),

    initCopy: ({timeout}) => it('Проверка заглавия и url.',
        async () => await dec.simple(page.schedulePageChange.initCopy,
            [timeout],
            page.schedulePageChange)),

    interval: ({numInterval, timeout}) => it(`Отображение интервала c порядковым номером ${numInterval}.`,
        async () => await dec.simple(page.schedulePageChange.interval,
            [numInterval, timeout],
            page.schedulePageChange)),

    noInterval: ({numInterval, timeout}) => it(`Отсутствие интервала c порядковым номером ${numInterval}.`,
        async () => await dec.simple(page.schedulePageChange.noInterval,
            [numInterval, timeout],
            page.schedulePageChange)),

    noTimeInterval: ({numInterval, timeout}) => it(`Отсутствие врмененных блоков у интервала c порядковым номером 
    ${numInterval}.`,
        async () => await dec.simple(page.schedulePageChange.noTimeInterval,
            [numInterval, timeout],
            page.schedulePageChange)),

    timeRemove: ({numInterval, numTime, timeout}) => it(`Удаление времененного интервала с порядковым номером 
    "${numTime}" в интервальном блоке c порядковым номером ${numInterval}.`,
        async () => await dec.simple(page.schedulePageChange.timeRemove,
            [numInterval, numTime, timeout],
            page.schedulePageChange)),

    selectTypeInterval: ({numInterval, numTime, value, timeout}) => it(`Выбор тип "${value} у временного блока с 
    порядковым номером ${numTime} в интревале ${numInterval}".`,
        async () => await dec.simple(page.schedulePageChange.selectTypeInterval,
            [numInterval, numTime, value, timeout],
            page.schedulePageChange)),

    getTypeInterval: ({numInterval, numTime, value, timeout}) => it(`Отображение у временного блока с порядковым 
    номером ${numTime} в интревале ${numInterval}" значения "${value}".`,
        async () => await dec.simpleText(page.schedulePageChange.selectGetTypeInterval,
            [numInterval, numTime, timeout],
            value,
            page.schedulePageChange)),

    intervalSumTime: ({numInterval, value, timeout}) => it(`У интервала с порядковым номером "${numInterval}" 
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
        async () => await dec.simple(page.schedulePageChange.scrollTop,
            [scroll, timeout],
            page.schedulePageChange)),

    hourSendKeys: ({name, value, timeout}) => it(`Ввод "${value}" часов в настройку "${name}".`,
        async () => await dec.simple(page.schedulePageChange.hourSendKeys,
            [name, value, timeout],
            page.schedulePageChange)),

    hourGetValue: ({name, value, timeout}) => it(`В настройке "${name}" отображается "${value}" часов.`,
        async () => await dec.simpleText(page.schedulePageChange.hourGetValue,
            [name, timeout],
            value,
            page.schedulePageChange)),

    minuteSendKeys: ({name, value, timeout}) => it(`Ввод "${value}" минут в настройку "${name}".`,
        async () => await dec.simple(page.schedulePageChange.minuteSendKeys,
            [name, value, timeout],
            page.schedulePageChange)),

    minuteGetValue: ({name, value, timeout}) => it(`В настройке "${name}" отображается "${value}" минут.`,
        async () => await dec.simpleText(page.schedulePageChange.minuteGetValue,
            [name, timeout],
            value,
            page.schedulePageChange)),

    checkboxWorkHandler: ({name, timeout}) => it(`Выбрать для помещения "${name}" - "Учет рабочего времени".`,
        async () => await dec.simple(page.schedulePageChange.checkboxWorkHandler,
            [name, timeout],
            page.schedulePageChange)),

    checkboxNoWorkHandler: ({name, timeout}) => it(`Выбрать для помещения "${name}" - "Учет нерабочего времени".`,
        async () => await dec.simple(page.schedulePageChange.checkboxNoWorkHandler,
            [name, timeout],
            page.schedulePageChange)),

    room: ({name, work, noWork, timeout}) => it(`Отображение у помещения "${name}" настйрока "Учет рабочего времени" -
      ${work? "Включена": "Выключена"} и настройка "Учет нерабочего времени" ${noWork? "Включена": "Выключена"}`,
        async () => await dec.simple(page.schedulePageChange.room,
            [name, work, noWork, timeout],
            page.schedulePageChange)),

    dayHandler: ({name, timeout}) => it(`Нажатие по дню недели "${name}".`,
        async () => await dec.simple(page.schedulePageChange.dayHandler,
            [name, timeout],
            page.schedulePageChange)),

    dayActive: ({name, timeout}) => it(`День недели "${name}" нажат.`,
        async () => await dec.simple(page.schedulePageChange.dayActive,
            [name, timeout],
            page.schedulePageChange)),

    dayNoActive: ({name, timeout}) => it(`День недели "${name}" не нажат.`,
        async () => await dec.simple(page.schedulePageChange. dayNoActive,
            [name, timeout],
            page.schedulePageChange)),
}