const BasePage = require('../../../base-page/base-page');
const {urvTimePresenceTITLE} = require('../../../../dictionaries/title');
const {urvTimePresenceURL} = require('../../../../dictionaries/url');

class TimePresencePage extends BasePage {
    constructor() {
        super();
    }

    //Отображение страницы
    async init(timeout) {
        const elementTitle = await this.titleCompare(urvTimePresenceTITLE, timeout);
        if (elementTitle.error) {
            return elementTitle
        }

        const elementUrl = await this.urlCompare(urvTimePresenceURL, timeout);
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