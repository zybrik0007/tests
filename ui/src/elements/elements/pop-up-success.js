const BasePage = require('../../pages/base-page/base-page')
const elements = require('../../dictionaries/selenium-elements')

class PopUpSuccess extends BasePage {
    constructor() {
        super();
    }

    async success(text, timeout) {
        return await this.xpathElement(elements.popUpSuccess(text) , `Отображение сообщения "${text}"`, timeout)
    }

    async successNoList(timeout) {
        return await this.xpathNoElement(elements.popUpSuccessStr, 'Отсутствует отображение сообщений', timeout)
    }
}

module.exports = PopUpSuccess