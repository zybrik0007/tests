const BasePage = require('../../pages/base-page/base-page')
const elements = require('../../dictionaries/selenium-elements')

class Checkbox extends BasePage {
    constructor() {
        super();
    }

    async handler(name, timeout)  {
        return await this.xpathHandler(elements.checkbox(name), `Нажатие по чекбоксу "${name}"`, timeout)
    }

    async checked(name, timeout) {
        return await this.xpathElement(elements.checkboxChecked(name), `Чекбокс "${name}" нажат.`, timeout)
    }

    async unchecked(name, timeout) {
        return await this.xpathElement(elements.checkboxUnchecked(name), `Чекбокс "${name}" не нажат.`, timeout)
    }

}

module.exports = Checkbox