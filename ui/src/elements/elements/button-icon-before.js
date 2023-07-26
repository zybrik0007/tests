const BasePage = require('../../pages/base-page/base-page')
const element = require('../../dictionaries/selenium-elements')

//Кпнока по по иконке
class ButtonIconBefore extends BasePage {
    constructor() {
        super();
    }

    //Отображение кнопки
    async button(icon, timeout) {
        return await this.xpathElement(element.buttonIconBefore(icon.name),
            `Отображение кнопки ${icon.description}`,
            timeout)
    }

    //Отображение активной кнопки
    async active(icon, timeout) {
        return await this.xpathElement(element.buttonIconBeforeActive(icon.name),
            `Отображение активной кнопки ${icon.description}`,
            timeout)
    }

    //Отображение неактивной кнопки
    async disabled(icon, timeout) {
        return await this.xpathElement(element.buttonIconBeforeDisabled(icon.name),
            `Отображение заблокированной кнопки ${icon.description}`,
            timeout)
    }

    //Нажатие кнопки
    async handler(icon, timeout) {
        const active = await this.active(icon, timeout)
        if(active.error) {
            return {
                error: true,
                description: `Ошибка. Кнопка "${icon.description}" неавктивна, нажатие невозможно.`,
            }
        }

        return await this.xpathHandler(element.buttonIconBeforeActive(icon.name),
            `Нажатие по кнопке ${icon.description}`,
            timeout)
    }
}

module.exports = ButtonIconBefore