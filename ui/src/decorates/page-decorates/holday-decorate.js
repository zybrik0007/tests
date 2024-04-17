const {it} = require('mocha');
const page = require('../../pages');
const dec = require('../../dictionaries/decorate');

module.exports = {
    dayHandler: ({monthNumber, dayNumber, timeout}) => it(`Нажатие по дню "${dayNumber}" 
    в месяце по номеру "${monthNumber}".`, async () => await dec.simple(page.holiday.dayHandler,
        [monthNumber, dayNumber, timeout],
        page.holiday)),

    dayGetValue: ({monthNumber, dayNumber, value, timeout}) => it(`Отображение в дне "${dayNumber}" 
    и месяце "${monthNumber}" - "${value}".`, async () => await dec.simpleText(page.holiday.dayGetValue,
        [monthNumber, dayNumber, timeout],
        value,
        page.holiday)),

    monthGetValue: ({monthNumber, value, timeout}) => it(`Значение месяца с номером "${monthNumber}" равно 
    "${value}".`, async () => await dec.simpleText(page.holiday.monthGetValue,
        [monthNumber, timeout],
        value,
        page.holiday)),

    dayTypeGetValue: ({monthNumber, dayNumber, value, timeout}) => it(`Тип в дне "${dayNumber}" 
    и месяце "${monthNumber}" равен "${value}".`, async () => await dec.simpleText(page.holiday.dayTypeGetValue,
        [monthNumber, dayNumber, timeout],
        value,
        page.holiday)),

}