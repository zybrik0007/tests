const {it} = require('mocha');
const page = require('../../pages');
const dec = require('../../dictionaries/decorate');

module.exports = {

    interval: ({numInterval, timeout}) => it('Отображение интервала блока по номеру.',
        async () => await dec.simple(page.accessTemplateScheduleChangePage.interval,
            [numInterval, timeout],
            page.accessTemplateScheduleChangePage)),

    intervalActive: ({numInterval, timeout}) => it('Отображение активности интервального блока по номеру.',
        async () => await dec.simple(page.accessTemplateScheduleChangePage.intervalActive,
            [numInterval, timeout],
            page.accessTemplateScheduleChangePage)),

    handler: ({numInterval, timeout}) => it(`Нажатие по интервалу с порядковым номером "${numInterval}".`,
        async () => await dec.simple(page.accessTemplateScheduleChangePage.handler,
            [numInterval, timeout],
            page.accessTemplateScheduleChangePage)),

    noTimeInterval: ({numInterval, timeout}) =>
        it(`Отсутствие временных блоков в интервале с порядковым номер "${numInterval}".`,
            async () => await dec.simple(page.accessTemplateScheduleChangePage.noTimeInterval,
            [numInterval, timeout],
            page.accessTemplateScheduleChangePage)),

    intervalName: ({numInterval, value, timeout}) =>
        it(`Название у интеравала с порядковым номером "${numInterval}" равно "${value}".`,
            async () => await dec.simpleText(page.accessTemplateScheduleChangePage.intervalName,
                [numInterval, timeout],
                value,
                page.accessTemplateScheduleChangePage)),

    intervalTitle: ({numInterval, value, timeout}) =>
        it(`Название заголовка у интеравала с порядковым номером "${numInterval}" равно "${value}".`,
            async () => await dec.simpleText(page.accessTemplateScheduleChangePage.intervalTitle,
                [numInterval, timeout],
                value,
                page.accessTemplateScheduleChangePage)),

    time: ({numInterval, numTime, timeout}) =>
        it(`Отображение временного блока с порядковым номером "${numTime}" в интревале "${numInterval}".`,
            async () => await dec.simple(page.accessTemplateScheduleChangePage.time,
                [umInterval, numTime, timeout],
                page.accessTemplateScheduleChangePage)),

    timeRemove: ({numInterval, numTime, timeout}) =>
        it(`Удаление временного блока с порядковым номером "${numTime}" в интревале "${numInterval}".`,
            async () => await dec.simple(page.accessTemplateScheduleChangePage.timeRemove,
                [numInterval, numTime, timeout],
                page.accessTemplateScheduleChangePage)),

    startTimeSendKeys: ({numInterval, numTime, value, timeout}) => it(`Ввод ${value} как значение начала в интервале 
    с порядковым номером ${numInterval} и временным блоком ${numTime}.`,
        async () => await dec.simple(page.accessTemplateScheduleChangePage.startTimeSendKeys,
            [numInterval, numTime, value, timeout],
            page.accessTemplateScheduleChangePage)),

    endTimeSendKeys: ({numInterval, numTime, value, timeout}) => it(`Ввод ${value} как значение конца в интервале 
    с порядковым номером ${numInterval} и временным блоком ${numTime}.`,
        async () => await dec.simple(page.accessTemplateScheduleChangePage.endTimeSendKeys,
            [numInterval, numTime, value, timeout],
            page.accessTemplateScheduleChangePage)),

    startTimeGetValue: ({numInterval, numTime, value, timeout}) => it(`Значения времени начала в интервале с порядковым 
    номером ${numInterval} и временного блока с порядковым номером ${numTime} равно "${value}".`,
        async () => await dec.simpleText(page.accessTemplateScheduleChangePage.startTimeGetValue,
            [numInterval, numTime, timeout],
            value,
            page.accessTemplateScheduleChangePage)),

    endTimeGetValue: ({numInterval, numTime, value, timeout}) => it(`Значения времени конца в интервале с порядковым 
    номером ${numInterval} и временного блока с порядковым номером ${numTime} равно "${value}".`,
        async () => await dec.simpleText(page.accessTemplateScheduleChangePage.endTimeGetValue,
            [numInterval, numTime, timeout],
            value,
            page.accessTemplateScheduleChangePage)),

    sWeekName: ({strNum, value, timeout}) => it(`Значения названия недели с порядковым номером ${strNum}, в 
    списке выбора недель равно "${value}".`,
        async () => await dec.simpleText(page.accessTemplateScheduleChangePage.sWeekName,
            [strNum, timeout],
            value,
            page.accessTemplateScheduleChangePage)),

    sWeekHandler: ({strNum, timeout}) => it(`Нажатие по кнопке добавления недели с порядковым номером ${strNum}, 
            в списке выбора недель.`,
        async () => await dec.simple(page.accessTemplateScheduleChangePage.sWeekHandler,
            [strNum, timeout],
            page.accessTemplateScheduleChangePage)),

    sWeekList: ({size, timeout}) => it(`Количетсво недель для выбора равно ${size}.`,
        async () => await dec.simple(page.accessTemplateScheduleChangePage.sWeekList,
            [size, timeout],
            page.accessTemplateScheduleChangePage)),

    sWeekSelectedName: ({strNum, value, timeout}) => it(`Значения названия недели с порядковым номером ${strNum}, 
    в списке выбранных недель равно "${value}".`,
        async () => await dec.simpleText(page.accessTemplateScheduleChangePage.sWeekSelectedName,
            [strNum, timeout],
            value,
            page.accessTemplateScheduleChangePage)),

    sWeekSelectedHandler: ({strNum, timeout}) => it(`Нажатие по кнопке удаление недели с порядковым номером ${strNum}, 
    в списке выбранных недель.`,
        async () => await dec.simple(page.accessTemplateScheduleChangePage.sWeekSelectedHandler,
            [strNum, timeout],
            page.accessTemplateScheduleChangePage)),

    sWeekSelectedList: ({strNum, timeout}) => it(`Нажатие по кнопке удаление недели с порядковым номером ${strNum}, 
    в списке выбранных недель.`,
        async () => await dec.simple(page.accessTemplateScheduleChangePage.sWeekSelectedList,
        [size, timeout],
        page.accessTemplateScheduleChangePage)),
}
