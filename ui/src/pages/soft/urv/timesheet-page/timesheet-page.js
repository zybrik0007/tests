const BasePage = require('../../../base-page/base-page');
const {timesheetTitle} = require('../../../../dictionaries/title');
const {timesheetUrl} = require('../../../../dictionaries/url');
const elements = require('../../../../dictionaries/selenium-elements');


class TimesheetPage extends BasePage {
    constructor() {
        super();
    }

    //Отображение страницы
    async init(timeout) {
        const elementTitle = await this.titleCompare(timesheetTitle, timeout);
        if (elementTitle.error) {
            return elementTitle
        }

        const elementUrl = await this.urlCompare(timesheetUrl, timeout);
        if(elementUrl.error) {
            return elementUrl
        }

        return {
            error: false,
            description: 'Заглавие валидно. Url валиден.',
        }
    };

    async table(tr, td, timeout) {
        return await this.xpathGetText(elements.timesheetDay(tr, td),
            `Получение значение в ${tr} и в ячейке ${td}.`,
            timeout);
    }

    async selectIconExpand(title, timeout) {
        return this.xpathHandler(elements.timesheetSelectIcon(title),
            `Нажатие по иконке expand в поле выбора "${title}".`,
            timeout);
    }

}

module.exports = TimesheetPage;