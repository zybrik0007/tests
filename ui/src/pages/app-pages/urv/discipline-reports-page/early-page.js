const BasePage = require('../../../base-page/base-page');
const {urvEarlyTITLE} = require('../../../../dictionaries/title');
const {urvEarlyURL} = require('../../../../dictionaries/url');


class EarlyPage extends BasePage {
    constructor() {
        super();
    }

    //Отображение страницы
    async init(timeout) {
        const elementTitle = await this.titleCompare(urvEarlyTITLE, timeout);
        if (elementTitle.error) {
            return elementTitle
        }

        const elementUrl = await this.urlCompare(urvEarlyURL, timeout);
        if(elementUrl.error) {
            return elementUrl
        }

        return {
            error: false,
            description: 'Заглавие валидно. Url валиден.',
        }
    };
}

module.exports = EarlyPage;