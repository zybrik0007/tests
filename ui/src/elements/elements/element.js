const BasePage = require('../../pages/base-page/base-page')
const elements = require('../../dictionaries/selenium-elements')

//Чекбокс с названием
class Element extends BasePage {
    constructor() {
        super();
    }

    //Нажатие чекбокса
    async textHandler(name, timeout)  {
        return await this.xpathHandler(elements.elementText(name),
            `Нажатие по элементу с текстом "${name}".`,
            timeout)
    }

    // Отображние текста
    async textDisplay(value, timeout)  {
        return await this.xpathElement(elements.elementText(value),
            `Отображение "${value}".`,
            timeout)
    }
}

module.exports = Element