const BasePage = require('../../pages/base-page/base-page')
const elements = require('../../dictionaries/selenium-elements')

//Всплывающий элемент ошибки
class PopUpError extends BasePage {
    constructor() {
        super();
    }

    //Отображение элемента ошибки с текстом
    async error(text, timeout) {
        return await this.xpathElement(elements.popUpError(text) ,
            `Отображение ошибки "${text}"`,
            timeout)
    }

    //Отсутствие эелементов ошибок
    async errorNoList(timeout) {
        return await this.xpathNoElement(elements.popUpErrorStr,
            'Отсутствует отображение ошибок',
            timeout)
    }
}

module.exports = PopUpError