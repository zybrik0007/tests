const BasePage = require('../../../base-page/base-page');
const {urvTimePresenceTitle} = require('../../../../dictionaries/title');
const {urvTimePresenceUrl} = require('../../../../dictionaries/url');
const elements = require('../../../../dictionaries/selenium-elements');

class TimePresencePage extends BasePage {
    constructor() {
        super();
    }

    //Отображение страницы
    async init(timeout) {
        const elementTitle = await this.titleCompare(urvTimePresenceTitle, timeout);
        if (elementTitle.error) {
            return elementTitle
        }

        const elementUrl = await this.urlCompare(urvTimePresenceUrl, timeout);
        if(elementUrl.error) {
            return elementUrl
        }

        return {
            error: false,
            description: 'Заглавие валидно. Url валиден.',
        }
    };
}

module.exports = TimePresencePage;