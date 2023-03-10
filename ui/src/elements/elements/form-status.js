const BasePage = require('../../pages/base-page/base-page')
const elements = require('../../dictionaries/selenium-elements')

//Статус формы
class FormStatus extends BasePage{
    constructor() {
        super();
    }

    //Получение отображенного текста
    async getText(timeout) {
        return await this.xpathGetText(elements.formStatus,
            'Получение значения статуса формы.',
            timeout)
    }
}

module.exports = FormStatus