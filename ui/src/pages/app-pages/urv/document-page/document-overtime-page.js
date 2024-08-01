const BasePage = require('../../../base-page/base-page');
const {urvDocumentOvertimeTITLE} = require('../../../../dictionaries/title');
const {urvDocOvertimeURL} = require('../../../../dictionaries/url');

class DocumentOvertimePage extends BasePage {
    constructor() {
        super();
    }

    //Отображение страницы
    async init(timeout) {
        const elementTitle = await this.titleCompare(urvDocumentOvertimeTITLE, timeout);
        if (elementTitle.error) {
            return elementTitle
        }

        const elementUrl = await this.urlCompare(urvDocOvertimeURL, timeout);
        if(elementUrl.error) {
            return elementUrl
        }

        return {
            error: false,
            description: 'Заглавие валидно. Url валиден.',
        }
    };
}

module.exports = DocumentOvertimePage;