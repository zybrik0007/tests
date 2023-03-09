const BasePage = require('../../pages/base-page/base-page')
const elements = require('../../dictionaries/selenium-elements')

class SimpleCell extends BasePage {
    constructor() {
        super();
    }


    async cell(text, timeout) {
        return await this.xpathElement(elements.simpleCell(text), `Отображение вкладки настроек "${text}"`, timeout)
    }

    async active(text, timeout) {
        return await this.xpathElement(elements.simpleCellActive(text), `Вкладка настроек "${text}" активна`, timeout)
    }

    async handler(text, timeout) {
        return await this.xpathHandler(elements.simpleCell(text), `Нажатие по вкладки настроек "${text}"`, timeout)
    }

}

module.exports = SimpleCell