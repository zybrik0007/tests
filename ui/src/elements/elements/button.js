const BasePage = require('../../pages/base-page/base-page')
const element = require('../../dictionaries/selenium-elements')

class Button extends BasePage{
    constructor() {
        super();
    }

    async button(text, timeout) {
        return await this.xpathElement(element.button(text), `Отображение кнопки ${text}.`, timeout)
    }

    async active(text, timeout) {
        return await this.xpathElement(element.buttonActive(text), `Отображение активной кнопки ${text}.`, timeout)
    }

    async disabled(text, timeout) {
        return await this.xpathElement(element.buttonDisabled(text), `Отображение заблокированной кнопки ${text}.`, timeout)
    }

    async handler(text, timeout) {
        const active = await this.active(text, timeout)
        if(active.error) {
            return {error: true, description: `Ошибка. Кнопка "${text}" неактивна, нажатие невозможно.`}
        }

        return await this.xpathHandler(element.buttonActive(text), `Нажатие по кнопке "${text}".`, timeout)
    }
}

module.exports = Button