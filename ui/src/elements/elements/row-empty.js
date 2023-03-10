const BasePage = require('../../pages/base-page/base-page')
const elements = require('../../dictionaries/selenium-elements')

class RowEmpty extends BasePage {
    constructor() {
        super();
    }

    //Получение значения текста при отсутствии данных
    async getText(timeout) {
        return await this.xpathGetText(
            elements.emptyRow,
            'Получение значения текста при отсутствии данных',
            timeout)
    }
}

module.exports = RowEmpty