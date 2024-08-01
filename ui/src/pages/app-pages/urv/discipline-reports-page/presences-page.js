const BasePage = require('../../../base-page/base-page');
const {urvPresencesTITLE} = require('../../../../dictionaries/title');
const {urvPresencesURL} = require('../../../../dictionaries/url');

class PresencesPage extends BasePage {
    constructor() {
        super();
    }

    //Отображение страницы
    async init(timeout) {
        const elementTitle = await this.titleCompare(urvPresencesTITLE, timeout);
        if (elementTitle.error) {
            return elementTitle
        }

        const elementUrl = await this.urlCompare(urvPresencesURL, timeout);
        if(elementUrl.error) {
            return elementUrl
        }

        return {
            error: false,
            description: 'Заглавие валидно. Url валиден.',
        }
    };
}

module.exports = PresencesPage;