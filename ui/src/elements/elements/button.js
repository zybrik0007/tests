const BasePage = require('../../pages/base-page/base-page')
const element = require('../../dictionaries/selenium-elements')

//Кпнока по названию
class Button extends BasePage{

    constructor() {
        super();
    }

    //Отображение кнопки
    async button(text, timeout) {
        return await this.xpathElement(element.button(text),
            `Отображение кнопки ${text}.`,
            timeout)
    }

    //Отображение активной кнопки
    async active(text, timeout) {
        return await this.xpathElement(element.buttonActive(text),
            `Отображение активной кнопки ${text}.`,
            timeout)
    }

    //Отображение неактивной кнопки
    async disabled(text, timeout) {
        return await this.xpathElement(element.buttonDisabled(text),
            `Отображение заблокированной кнопки ${text}.`,
            timeout)
    }

    //Нажатие кнопки
    async handler(text, timeout) {
        const active = await this.active(text, timeout)
        if(active.error) {
            return {
                error: true,
                description: `Ошибка. Кнопка "${text}" неактивна, нажатие невозможно.`,
            }
        }

        return await this.xpathHandler(element.buttonActive(text),
            `Нажатие по кнопке "${text}".`,
            timeout)
    }
}

module.exports = Button