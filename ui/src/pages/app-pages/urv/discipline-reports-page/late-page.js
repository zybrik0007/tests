const BasePage = require('../../../base-page/base-page');
const {urvLateTITLE} = require('../../../../dictionaries/title');
const {urvLateURL} = require('../../../../dictionaries/url');
const elements = require('../../../../dictionaries/selenium-elements');

class LatePage extends BasePage {
    constructor() {
        super();
    }

    //Отображение страницы
    async init(timeout) {
        const elementTitle = await this.titleCompare(urvLateTITLE, timeout);
        if (elementTitle.error) {
            return elementTitle
        }

        const elementUrl = await this.urlCompare(urvLateURL, timeout);
        if(elementUrl.error) {
            return elementUrl
        }

        return {
            error: false,
            description: 'Заглавие валидно. Url валиден.',
        }
    };
}

module.exports = LatePage;