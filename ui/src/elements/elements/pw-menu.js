const BasePage = require('../../pages/base-page/base-page')
const elements = require('../../dictionaries/selenium-elements')

//Элемент вкладка с поиском по тексту для страниц измений и добавлений
class PwMenu extends BasePage {

    constructor() {
        super();
    }

    //Состояние вкладки - активно
    async active(text, timeout) {
        return await this.xpathElement(elements.pwMenuActive(text),
            `Вкладка настроек "${text}" активна`,
            timeout)
    }

    //Нажатие по вкладке
    async handler(text, timeout) {
        console.log(elements.pwMenu(text))
        return await this.xpathHandler(elements.pwMenu(text),
            `Нажатие строки "${text}".`,
            timeout)
    }
}

module.exports = PwMenu;