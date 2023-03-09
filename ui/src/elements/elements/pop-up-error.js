const BasePage = require('../../pages/base-page/base-page')
const elements = require('../../dictionaries/selenium-elements')


class PopUpError extends BasePage {
    constructor() {
        super();
    }

    async error(text, timeout) {
        return await this.xpathElement(elements.popUpError(text) , `Отображение ошибки "${text}"`, timeout)
    }

    async errorNoList(timeout) {
        return await this.xpathNoElement(elements.popUpErrorStr, 'Отсутствует отображение ошибок', timeout)
    }
}

module.exports = PopUpError