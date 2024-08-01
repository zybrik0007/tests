const BasePage = require('../../../base-page/base-page');
const {urvDocumentJustificationTITLE} = require('../../../../dictionaries/title');
const {urvDocJustificationURL} = require('../../../../dictionaries/url');

class DocumentJustificationPage extends BasePage {
    constructor() {
        super();
    }

    //Отображение страницы
    async init(timeout) {
        const elementTitle = await this.titleCompare(urvDocumentJustificationTITLE, timeout);
        if (elementTitle.error) {
            return elementTitle
        }

        const elementUrl = await this.urlCompare(urvDocJustificationURL, timeout);
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