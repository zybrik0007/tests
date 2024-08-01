const BasePage = require('../../../base-page/base-page');
const {urvViolatorsTITLE} = require('../../../../dictionaries/title');
const {urvViolatorsURL} = require('../../../../dictionaries/url');

class ViolatorsPage extends BasePage {
    constructor() {
        super();
    }

    //Отображение страницы
    async init(timeout) {
        const elementTitle = await this.titleCompare(urvViolatorsTITLE, timeout);
        if (elementTitle.error) {
            return elementTitle
        }

        const elementUrl = await this.urlCompare(urvViolatorsURL, timeout);
        if(elementUrl.error) {
            return elementUrl
        }

        return {
            error: false,
            description: 'Заглавие валидно. Url валиден.',
        }
    };
}

module.exports = ViolatorsPage;