const BasePage = require('../../../base-page/base-page');
const {additionalDataTITLE} = require('../../../../dictionaries/title');
const {additionalDataURL} = require('../../../../dictionaries/url');


class AdditionalDataPage extends BasePage {
    constructor() {
        super();
    }

    //Отображение страницы
    async init(timeout) {
        const elementTitle = await this.titleCompare(additionalDataTITLE, timeout);
        if (elementTitle.error) {
            return elementTitle
        }

        const elementUrl = await this.urlCompare(additionalDataURL, timeout);
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