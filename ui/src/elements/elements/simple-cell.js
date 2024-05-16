const BasePage = require('../../pages/base-page/base-page')
const elements = require('../../dictionaries/selenium-elements')

//Элемент вкладка с поиском по тексту для страниц измений и добавлений
class SimpleCell extends BasePage {

    constructor() {
        super();
    }

    //Отображение вклаки
    async cell(text, timeout) {
        return await this.xpathElement(elements.simpleCell(text),
            `Отображение вкладки настроек "${text}"`,
            timeout)
    }

    //Состояние вкладки - активно
    async active(text, timeout) {
        return await this.xpathElement(elements.simpleCellActive(text),
            `Вкладка настроек "${text}" активна`,
            timeout)
    }

    //Нажатие по вкладке
    async handler(text, timeout) {
        return await this.xpathHandler(elements.simpleCell(text),
            `Нажатие по вкладки настроек "${text}"`,
            timeout);
    }

}

module.exports = SimpleCell