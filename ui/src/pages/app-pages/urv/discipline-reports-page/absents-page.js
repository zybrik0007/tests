const BasePage = require('../../../base-page/base-page');
const {urvAbsentsTITLE} = require('../../../../dictionaries/title');
const {urvAbsentsURL} = require('../../../../dictionaries/url');

class AbsentsPage extends BasePage {
    constructor() {
        super();
    }

    //Отображение страницы
    async init(timeout) {
        const elementTitle = await this.titleCompare(urvAbsentsTITLE, timeout);
        if (elementTitle.error) {
            return elementTitle
        }

        const elementUrl = await this.urlCompare(urvAbsentsURL, timeout);
        if(elementUrl.error) {
            return elementUrl
        }

        return {
            error: false,
            description: 'Заглавие валидно. Url валиден.',
        }
    };
}

module.exports = AbsentsPage;