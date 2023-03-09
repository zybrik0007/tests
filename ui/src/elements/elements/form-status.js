const BasePage = require('../../pages/base-page/base-page')
const elements = require('../../dictionaries/selenium-elements')

class FormStatus extends BasePage{
    constructor() {
        super();
    }

    async getText(timeout) {
        return await this.xpathGetText(elements.formStatus, 'Получение значения статуса формы.', timeout)
    }
}

module.exports = FormStatus