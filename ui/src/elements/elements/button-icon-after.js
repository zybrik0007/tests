const BasePage = require('../../pages/base-page/base-page')
const element = require('../../dictionaries/selenium-elements')

class ButtonIconAfter extends BasePage {
    constructor() {
        super();
    }

    async button(icon, timeout) {
        return await this.xpathElement(element.buttonIconAfter(icon.name), `Отображение кнопки ${icon.description}`, timeout)
    }

    async active(icon, timeout) {
        return await this.xpathElement(element.buttonIconAfterActive(icon.name), `Отображение активной кнопки ${icon.description}`, timeout)
    }

    async disabled(icon, timeout) {
        return await this.xpathElement(element.buttonIconAfterDisabled(icon.name), `Отображение заблокированной кнопки ${icon.description}`, timeout)
    }

    async handler(icon, timeout) {
        const active = await this.active(icon, timeout)
        if(active.error) {
            return {error: true, description: `Ошибка. Кнопка "${icon.description}" неавктивна, нажатие невозможно.`}
        }

        return await this.xpathHandler(element.buttonIconAfterActive(icon.name), `Нажатие по кнопке ${icon.description}`, timeout)
    }
}

module.exports = ButtonIconAfter