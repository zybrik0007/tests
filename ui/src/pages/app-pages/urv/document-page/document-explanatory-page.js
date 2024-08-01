const BasePage = require('../../../base-page/base-page');
const {urvDocumentExplanatoryTITLE} = require('../../../../dictionaries/title');
const {urvDocExplanatoryURL} = require('../../../../dictionaries/url');

class DocumentExplanatoryPage extends BasePage {
    constructor() {
        super();
    }

    //Отображение страницы
    async init(timeout) {
        const elementTitle = await this.titleCompare(urvDocumentExplanatoryTITLE, timeout);
        if (elementTitle.error) {
            return elementTitle
        }

        const elementUrl = await this.urlCompare(urvDocExplanatoryURL, timeout);
        if(elementUrl.error) {
            return elementUrl
        }

        return {
            error: false,
            description: 'Заглавие валидно. Url валиден.',
        }
    };
}

module.exports = DocumentExplanatoryPage;