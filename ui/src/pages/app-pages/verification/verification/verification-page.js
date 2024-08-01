const BasePage = require('../../../base-page/base-page');
const {verificationTITLE} = require('../../../../dictionaries/title');
const {verificationURL} = require('../../../../dictionaries/url');

class VerificationPage extends BasePage {

    constructor() {
        super();
    }

    //Отображение страницы
    async init(timeout) {
        const elementTitle = await this.titleCompare(verificationTITLE, timeout)
        if (elementTitle.error) {
            return elementTitle
        }

        const elementUrl = await this.urlCompare(verificationURL, timeout)
        if(elementUrl.error) {
            return elementUrl
        }

        return {
            error: false,
            description: 'Заглавие валидно. Url валиден.',
        }
    }
}

module.exports = VerificationPage;