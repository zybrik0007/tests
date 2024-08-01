const BasePage = require('../../../base-page/base-page');
const {verificationTITLE} = require('../../../../dictionaries/title');
const {verificationConfigChangeAddURL, verificationConfigChangeEditURL} = require('../../../../dictionaries/url');

class VerificationConfigChangePage extends BasePage {

    constructor() {
        super();
    }

    // Отображение страницы добавления
    async initAdd(timeout) {
        const elementTitle = await this.titleCompare(verificationTITLE, timeout)
        if (elementTitle.error) {
            return elementTitle
        }

        const elementUrl = await this.urlCompare(verificationConfigChangeAddURL, timeout)
        if(elementUrl.error) {
            return elementUrl
        }

        return {
            error: false,
            description: 'Заглавие валидно. Url валиден.',
        }
    }

    // Отображение страницы редактирования
    async initEdit(id, timeout) {
        const elementTitle =  await this.titleCompare(verificationTITLE, timeout)
        if(elementTitle.error) {
            return  elementTitle
        }

        const elementUrl = await this.urlContains(verificationConfigChangeEditURL, timeout)
        if(elementUrl.error) {
            return elementUrl
        }

        return {
            error: false,
            description: `Заглавие валидно. Url валиден.`,
        }
    }
}

module.exports = VerificationConfigChangePage;