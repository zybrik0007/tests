const BasePage = require('../../pages/base-page/base-page')
const elements = require('../../dictionaries/selenium-elements')

class PlaceholderText extends BasePage {

    constructor() {
        super();
    }

    //Получение значения текста отображемого из-за отсутсвия выбора каких-либо настроек
    async getText(timeout) {
        return await this.xpathGetText(elements.placeholderText,
            'Получение значения текста в заглавии.',
            timeout)
    }

}

module.exports = PlaceholderText