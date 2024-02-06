const {it} = require('mocha');
const el = require('../../elements');
const dec = require('../../dictionaries/decorate');

module.exports = {
    datepicker: ({timeout}) => it(`Отображение календаря.`, async () => await dec.simple(el.datepicker.datepicker,
        [timeout],
        el.datepicker)),

    datepickerNoElement: ({timeout}) => it(`'Отсутсвует отображение календаря.`,
        async () => await dec.simple(el.datepicker.datepickerNoElement,
            [timeout],
            el.datepicker)),

    dateParse: ({day, month, year, hour, minute, scrollMonth, scrollYear, scrollHour, scrollMinute, timeout}) =>
        it(`Выбор дня, месяца, года, часа, минуты.`,
            async () => await dec.simple(el.datepicker.dateParse,
                [{day, month, year, hour, minute, scrollMonth, scrollYear, scrollHour, scrollMinute}, timeout],
                el.datepicker)),

    date: ({day, month, year, hour, minute, scrollMonth, scrollYear, scrollHour, scrollMinute, timeout}) =>
        it(`Выбор даты.`,
            async () => await dec.simple(el.datepicker.date,
                [{day, month, year, hour, minute, scrollMonth, scrollYear, scrollHour, scrollMinute}, timeout],
                el.datepicker)),

    dateRange: ({
                    objStart={day, month, year, hour, minute, scrollMonth, scrollYear, scrollHour, scrollMinute},
                    objEnd={day, month, year, hour, minute, scrollMonth, scrollYear, scrollHour, scrollMinute},
                    timeout}) => it(`Выбор даты с двойным календарем.`,
        async () => await dec.simple(el.datepicker.dateRange,
                [objStart, objEnd, timeout],
                el.datepicker)),

    yearSelect: ({year, yearScroll, timeout}) => it(`Выбор года в календаре.`, async () => await dec.simple(el.datepicker.yearSelect,
        [{year, yearScroll, timeout}],
        el.datepicker)),

    monthSelect: ({month, monthScroll, timeout}) => it(`Выбор месяца в календаре.`,
        async () => await dec.simple(el.datepicker.monthSelect,
            [{month, monthScroll, timeout}],
            el.datepicker)),

    hourSelect: ({hour, hourScroll, timeout}) => it(`Выбор часа в календаре.`,
        async () => await dec.simple(el.datepicker.hourSelect,
            [{hour, hourScroll, timeout}],
            el.datepicker)),

    minuteSelect: ({minute, scrollMinute, timeout}) => it(`Выбор минуты в календаре.`,
        async () => await dec.simple(el.datepicker.minuteSelect,
            [{minute, scrollMinute, timeout}],
            el.datepicker)),

    daySelect: ({day,timeout}) => it(`Выбор дня в календаре.`,
        async () => await dec.simple(el.datepicker.daySelect,
            [day, timeout],
            el.datepicker)),

    applyHandler: ({timeout}) => it(`Нажатие кнопки "Применить" в календаре.`,
        async () => await dec.simple(el.datepicker.applyHandler,
            [timeout],
            el.datepicker)),

}
