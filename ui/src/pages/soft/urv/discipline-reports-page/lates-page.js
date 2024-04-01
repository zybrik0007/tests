const BasePage = require('../../../base-page/base-page');
const {urvLatesTitle} = require('../../../../dictionaries/title');
const {urvLatesUrl} = require('../../../../dictionaries/url');
const elements = require('../../../../dictionaries/selenium-elements');

class LatesPage extends BasePage {
    constructor() {
        super();
    }

    //Отображение страницы
    async init(timeout) {
        const elementTitle = await this.titleCompare(urvLatesTitle, timeout);
        if (elementTitle.error) {
            return elementTitle
        }

        const elementUrl = await this.urlCompare(urvLatesUrl, timeout);
        if(elementUrl.error) {
            return elementUrl
        }

        return {
            error: false,
            description: 'Заглавие валидно. Url валиден.',
        }
    };
}

module.exports = LatesPage;