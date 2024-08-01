const BasePage = require('../../../base-page/base-page');
const {accessTemplatesTITLE} = require('../../../../dictionaries/title');
const {accessEditScheduleHolidayURL} = require('../../../../dictionaries/url');
const elements = require('../../../../dictionaries/selenium-elements');

class AccessTemplateScheduleHolidayPage extends BasePage {

    constructor() {
        super();
    }

    async init(timeout) {
        const title =  await this.titleCompare(accessTemplatesTITLE, timeout)
        if(title.error) {
            return title;
        }

        const url = await this.urlCompare(accessEditScheduleHolidayURL, timeout)
        if(url.error) {
            return url;
        }

        return {
            error: false,
            description: `Заглавие валидно. Url валиден.`,
        }
    }

    // Получение значение даты по номеру строки
    async holidayDate(num, timeout) {
        return await this.xpathGetText(elements.passAccessScheduleHolidayDate(num),
            `Получение значение даты с порядковым номером ${num}.`,
            timeout);
    }

    //Получение типа по номеру строки
    async holidayType(num, timeout) {
        return await this.xpathGetText(elements.passAccessScheduleHolidayType(num),
            `Получение значение типа с порядковым номером ${num}.`,
            timeout);
    }
    //Удаление строки по номеру
    async holidayDelete(num, timeout) {
        return await this.xpathHandler(elements.passAccessScheduleHolidayDelete(num),
            `Удаление строки праздника по номеру ${num}.`,
            timeout);
    }

    //Количество строк выбранных дат
    async holidayCount(count, timeout) {
        return await this.xpathList(elements.passAccessScheduleHoliday,
            `Отображение ${count} строк выбранных дат.`,
            count,
            timeout)
    }
}

module.exports = AccessTemplateScheduleHolidayPage;