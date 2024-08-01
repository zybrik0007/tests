const BasePage = require('../../../base-page/base-page');
const {verificationTITLE} = require('../../../../dictionaries/title');
const {verificationConfigURL} = require('../../../../dictionaries/url');

class VerificationConfigPage extends BasePage {

    constructor() {
        super();
    }

    //Отображение страницы
    async init(timeout) {
        const elementTitle = await this.titleCompare(verificationTITLE, timeout)
        if (elementTitle.error) {
            return elementTitle
        }

        const elementUrl = await this.urlCompare(verificationConfigURL, timeout)
        if(elementUrl.error) {
            return elementUrl
        }

        return {
            error: false,
            description: 'Заглавие валидно. Url валиден.',
        }
    }
}

module.exports = VerificationConfigPage;