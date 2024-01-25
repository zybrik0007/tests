const BasePage = require('../../pages/base-page/base-page')
const elements = require('../../dictionaries/selenium-elements')

//Элемент вкладка с поиском по тексту для страниц измений и добавлений
class GroupCell extends BasePage {

    constructor() {
        super();
    }

    //Состояние вкладки - активно
    async active(text, timeout) {
        return await this.xpathElement(elements.pwGroupCellChecked(text),
            `Вкладка настроек "${text}" активна`,
            timeout)
    }

    //Нажатие по вкладке
    async handler(text, timeout) {
        console.log(elements.pwGroupCell(text))
        return await this.xpathHandler(elements.pwGroupCell(text),
            `Нажатие строки "${text}".`,
            timeout)
    }
}

module.exports = GroupCell