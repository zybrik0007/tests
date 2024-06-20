const BasePage = require('../../../base-page/base-page')
const elements = require('../../../../dictionaries/selenium-elements')
const {verificationTitle} = require('../../../../dictionaries/title')
const {verificationConfigChangeAdd, verificationConfigChangeEdit} = require('../../../../dictionaries/url')

class VerificationConfigChangePage extends BasePage {

    constructor() {
        super();
    }

    // Отображение страницы добавления
    async initAdd(timeout) {
        const elementTitle = await this.titleCompare(verificationTitle, timeout)
        if (elementTitle.error) {
            return elementTitle
        }

        const elementUrl = await this.urlCompare(verificationConfigChangeAdd, timeout)
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
        const elementTitle =  await this.titleCompare(verificationTitle, timeout)
        if(elementTitle.error) {
            return  elementTitle
        }

        const elementUrl = await this.urlContains(verificationConfigChangeEdit, timeout)
        if(elementUrl.error) {
            return elementUrl
        }

        return {
            error: false,
            description: `Заглавие валидно. Url валиден.`,
        }
    }
}

module.exports = VerificationConfigChangePage