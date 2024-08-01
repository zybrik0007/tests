const BasePage = require('../../../base-page/base-page');
const {urvSupportingTITLE} = require('../../../../dictionaries/title');
const {urvSupportingURL} = require('../../../../dictionaries/url');

class SupportingPage extends BasePage {
    constructor() {
        super();
    }

    //Отображение страницы
    async init(timeout) {
        const elementTitle = await this.titleCompare(urvSupportingTITLE, timeout);
        if (elementTitle.error) {
            return elementTitle
        }

        const elementUrl = await this.urlCompare(urvSupportingURL, timeout);
        if(elementUrl.error) {
            return elementUrl
        }

        return {
            error: false,
            description: 'Заглавие валидно. Url валиден.',
        }
    };
}

module.exports = SupportingPage;