const BasePage = require('../../pages/base-page/base-page')
const element = require('../../dictionaries/selenium-elements')

class ButtonIconBefore extends BasePage{
    constructor() {
        super();
    }

    async button(icon, timeout) {
        return await this.xpathElement(element.buttonIconBefore(icon.name), `Отображение кнопки ${icon.description}`, timeout)
    }

    async active(icon, timeout) {
        return await this.xpathElement(element.buttonIconBeforeActive(icon.name), `Отображение активной кнопки ${icon.description}`, timeout)
    }

    async disabled(icon, timeout) {
        return await this.xpathElement(element.buttonIconBeforeDisabled(icon.name), `Отображение заблокированной кнопки ${icon.description}`, timeout)
    }

    async handler(icon, timeout) {
        const active = await this.active(icon, timeout)

        if(active.error) {
            return {error: true, description: `Ошибка. Кнопка "${icon.description}" неавктивна, нажатие невозможно.`}
        }

        return await this.xpathHandler(element.buttonIconBeforeActive(icon.name), `Нажатие по кнопке ${icon.description}`, timeout)
    }
}

module.exports = ButtonIconBefore