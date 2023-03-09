const BasePage = require('../../pages/base-page/base-page')
const elements = require('../../dictionaries/selenium-elements')

class Tab extends BasePage {
    constructor() {
        super();
    }

    async tab(tab, timeout) {
        return await this.xpathElement(elements.tab(tab), `Вкладка "${tab}".`, timeout)
    }

    async active(tab, timeout) {
        return await this.xpathElement(elements.tabActive(tab), `Вкладка "${tab}" активна.`, timeout)
    }

    async handler(tab, timeout) {
        return await this.xpathHandler(elements.tab(tab), `Нажатие по вкладке "${tab}".`, timeout)
    }

}

module.exports = Tab