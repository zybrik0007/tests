const BasePage = require('../../pages/base-page/base-page')
const elements = require('../../dictionaries/selenium-elements')

class SelectXpand extends BasePage {
    constructor() {
        super();
    }

    async xpand(timeout) {
        return await this.xpathElement(elements.selectXpand, 'Отображения выборки для select', timeout)
    }

    async xpandNoElement(timeout) {
        return await this.xpathNoElement(elements.selectXpand, 'Отсутствие отображения выборки для select', timeout)
    }

    async handler(text, timeout) {
        return await this.xpathHandler(elements.selectXpandItem(text), `Нажатие по значению ${text} в выборке select`, timeout)
    }
}

module.exports = SelectXpand