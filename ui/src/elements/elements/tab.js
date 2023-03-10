const BasePage = require('../../pages/base-page/base-page')
const elements = require('../../dictionaries/selenium-elements')

//Вкладки страниц
class Tab extends BasePage {

    constructor() {
        super();
    }

    //Отображение вкладки
    async tab(tab, timeout) {
        return await this.xpathElement(elements.tab(tab),
            `Вкладка "${tab}".`,
            timeout)
    }

    //Состояние вкладки активно
    async active(tab, timeout) {
        return await this.xpathElement(elements.tabActive(tab),
            `Вкладка "${tab}" активна.`,
            timeout)
    }

    //Нажатие вкладки
    async handler(tab, timeout) {
        return await this.xpathHandler(elements.tab(tab),
            `Нажатие по вкладке "${tab}".`,
            timeout)
    }

}

module.exports = Tab