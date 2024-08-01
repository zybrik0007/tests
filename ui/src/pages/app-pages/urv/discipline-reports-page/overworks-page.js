const BasePage = require('../../../base-page/base-page');
const {urvOverworksTITLE} = require('../../../../dictionaries/title');
const {urvOverworksURL} = require('../../../../dictionaries/url');

class OverworksPage extends BasePage {
    constructor() {
        super();
    }

    //Отображение страницы
    async init(timeout) {
        const elementTitle = await this.titleCompare(urvOverworksTITLE, timeout);
        if (elementTitle.error) {
            return elementTitle
        }

        const elementUrl = await this.urlCompare(urvOverworksURL, timeout);
        if(elementUrl.error) {
            return elementUrl
        }

        return {
            error: false,
            description: 'Заглавие валидно. Url валиден.',
        }
    };
}

module.exports = OverworksPage;