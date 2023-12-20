const BasePage = require('../../pages/base-page/base-page')
const element = require('../../dictionaries/selenium-elements')

//Кпнока по по иконке
class ButtonIcon extends BasePage {
    constructor() {
        super();
    }

    //Отображение кнопки
    async button(icon, timeout) {
        return await this.xpathElement(element.buttonIcon(icon.name),
            `Отображение кнопки ${icon.description}`,
            timeout)
    }

    //Нажатие кнопки
    async handler(icon, timeout) {
        return await this.xpathHandler(element.buttonIcon(icon.name),
            `Нажатие по кнопке ${icon.description}`,
            timeout)
    }
}

module.exports = ButtonIcon