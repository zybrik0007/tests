const BasePage = require('../../pages/base-page/base-page')
const element = require('../../dictionaries/selenium-elements')

//Кпнока по названию
class Radio extends BasePage{

    constructor() {
        super();
    }

    //Нажатие кнопки
    async handler(text, timeout) {
        return await this.xpathHandler(element.radio(text),
            `Нажатие по кнопке "${text}".`,
            timeout)
    }
}

module.exports = Radio