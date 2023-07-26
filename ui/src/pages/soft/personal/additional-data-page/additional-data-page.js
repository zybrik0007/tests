const BasePage = require('../../../base-page/base-page');
const {additionalDataTitle} = require('../../../../dictionaries/title');
const {additionalDataUrl} = require('../../../../dictionaries/url');


class AdditionalDataPage extends BasePage {
    constructor() {
        super();
    }

    //Отображение страницы
    async init(timeout) {
        const elementTitle = await this.titleCompare(additionalDataTitle, timeout);
        if (elementTitle.error) {
            return elementTitle
        }

        const elementUrl = await this.urlCompare(additionalDataUrl, timeout);
        if(elementUrl.error) {
            return elementUrl
        }

        return {
            error: false,
            description: 'Заглавие валидно. Url валиден.',
        }
    };
}

module.exports = AdditionalDataPage;