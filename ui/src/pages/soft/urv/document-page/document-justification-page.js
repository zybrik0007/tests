const BasePage = require('../../../base-page/base-page');
const {urvDocumentJustificationTitle} = require('../../../../dictionaries/title');
const {urvDocJustificationUrl} = require('../../../../dictionaries/url');
const elements = require('../../../../dictionaries/selenium-elements');

class DocumentJustificationPage extends BasePage {
    constructor() {
        super();
    }

    //Отображение страницы
    async init(timeout) {
        const elementTitle = await this.titleCompare(urvDocumentJustificationTitle, timeout);
        if (elementTitle.error) {
            return elementTitle
        }

        const elementUrl = await this.urlCompare(urvDocJustificationUrl, timeout);
        if(elementUrl.error) {
            return elementUrl
        }

        return {
            error: false,
            description: 'Заглавие валидно. Url валиден.',
        }
    };
}

module.exports = DocumentJustificationPage;