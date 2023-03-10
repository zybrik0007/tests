const BasePage = require('../../pages/base-page/base-page')
const elements = require('../../dictionaries/selenium-elements')

//Чекбокс с названием
class Checkbox extends BasePage {
    constructor() {
        super();
    }

    //Нажатие чекбокса
    async handler(name, timeout)  {
        return await this.xpathHandler(elements.checkbox(name),
            `Нажатие по чекбоксу "${name}"`,
            timeout)
    }

    //Состоние чекбокса активно
    async checked(name, timeout) {
        return await this.xpathElement(elements.checkboxChecked(name),
            `Чекбокс "${name}" нажат.`,
            timeout)
    }

    //Состоние чекбокса не активно
    async unchecked(name, timeout) {
        return await this.xpathElement(elements.checkboxUnchecked(name),
            `Чекбокс "${name}" не нажат.`,
            timeout)
    }
}

module.exports = Checkbox