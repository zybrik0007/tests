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
            `Отображение ошибки "${text}".`,
            timeout)
    }

    //Отсутствие эелементов ошибок
    async errorNoList(timeout) {
        return await this.xpathNoElement(elements.popUpErrorStr,
            'Отсутствует отображение ошибок.',
            timeout)
    }

    //Нажатие кнопки закрытия ошибки по имени
    async closeHandler(text, timeout) {
        await this.loading(2000)
        return await this.xpathHandler(elements.popUpClose(text),
            `Закрытие ошибки "${text}".`,
            timeout)
    }

    async checkError(timeout) {
        const checkError = await this.xpathNoElement(elements.popUpErrorStr,
            'Отсутствует отображение ошибок.',
            timeout);

        if(!checkError.error) {
            return {
                ...checkError,
                text: ''
            }
        }

        return await this.xpathGetText(elements.popErrorCheck,
            'Получение значения ошибки.',
            timeout);
    }


}

module.exports = PopUpError