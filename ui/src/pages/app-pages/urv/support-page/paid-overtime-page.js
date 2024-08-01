const BasePage = require('../../../base-page/base-page');
const {urvSupportingTITLE} = require('../../../../dictionaries/title');
const {urvPaidOvertimeURL} = require('../../../../dictionaries/url');

class PaidOvertimePage extends BasePage {
    constructor() {
        super();
    }

    //Отображение страницы
    async init(timeout) {
        const elementTitle = await this.titleCompare(urvSupportingTITLE, timeout);
        if (elementTitle.error) {
            return elementTitle
        }

        const elementUrl = await this.urlCompare(urvPaidOvertimeURL, timeout);
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