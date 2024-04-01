const BasePage = require('../../../base-page/base-page');
const {urvSupportingTitle} = require('../../../../dictionaries/title');
const {urvPaidOvertimeUrl} = require('../../../../dictionaries/url');
const elements = require('../../../../dictionaries/selenium-elements');

class PaidOvertimePage extends BasePage {
    constructor() {
        super();
    }

    //Отображение страницы
    async init(timeout) {
        const elementTitle = await this.titleCompare(urvSupportingTitle, timeout);
        if (elementTitle.error) {
            return elementTitle
        }

        const elementUrl = await this.urlCompare(urvPaidOvertimeUrl, timeout);
        if(elementUrl.error) {
            return elementUrl
        }

        return {
            error: false,
            description: 'Заглавие валидно. Url валиден.',
        }
    };
}

module.exports = PaidOvertimePage;