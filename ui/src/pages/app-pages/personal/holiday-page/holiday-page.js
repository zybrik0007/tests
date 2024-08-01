const BasePage = require('../../../base-page/base-page');
const element = require('../../../../dictionaries/selenium-elements');
const {holidayTITLE} = require('../../../../dictionaries/title');
const {holidayURL} = require('../../../../dictionaries/url');

class HolidayPage extends BasePage {

    constructor() {
        super();
    }

    //Отображение страницы
    async init(timeout) {
        const elementTitle = await this.titleCompare(holidayTITLE, timeout)
        if (elementTitle.error) {
            return elementTitle
        }

        const elementUrl = await this.urlCompare(holidayURL, timeout)
        if(elementUrl.error) {
            return elementUrl
        }

        return {
            error: false,
            description: 'Заглавие валидно. Url валиден.',
        }
    }

    async dayHandler(monthNumber, dayNumber, timeout) {
        return await this.xpathHandler(element.perHolidayDay(monthNumber, dayNumber),
            `Нажатие по дню ${dayNumber} в месяце по номеру ${monthNumber}.`,
            timeout);
    }

    async dayGetValue(monthNumber, dayNumber, timeout) {
        return await this.xpathGetText(element.perHolidayDayNumber(monthNumber, dayNumber),
            `Получение значения дня ${dayNumber} в месяце по номеру ${monthNumber}.`,
            timeout);
    }

    async monthGetValue(monthNumber, timeout) {
        return await this.xpathGetText(element.perHolidayMonth(monthNumber),
            `Получение значения месяца по номеру ${monthNumber}.`,
            timeout);
    }

    async dayTypeGetValue(monthNumber, dayNumber, timeout) {
        const type = await this.xpathGetAttribute(element.perHolidayDay(monthNumber, dayNumber),
        `Получение значения тип дня ${dayNumber} в месяце по номеру ${monthNumber}.`,
            'data-type',
            timeout);

        console.log('type', type)

        if(type.error) {
            return type
        }

        switch (type.text) {
            case '0':
                return {
                    ...type,
                    text: 'Обычный день'
                }
            case '1':
                return {
                    ...type,
                    text: 'Праздник'
                }
            case '2':
                return {
                    ...type,
                    text: 'Предпраздничный день'
                }
            case '3':
                return {
                    ...type,
                    text: 'Рабочий выходной'
                }
            case '4':
                return {
                    ...type,
                    text: 'Пометка'
                }
            default: {
                return {
                    ...type,
                    text: 'Обычный день'
                }
            }
        }
    }

}

module.exports = HolidayPage;