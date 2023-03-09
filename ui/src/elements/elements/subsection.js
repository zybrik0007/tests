const BasePage = require('../../pages/base-page/base-page')
const element = require('../../dictionaries/selenium-elements')

class Subsection extends BasePage {
    constructor() {
        super();
    }

    /*Отображение подраздела*/
    async subsection(subsection, timeout) {
        return await this.xpathElement(element.subsection(subsection.url), `Отображение подраздела "${subsection.description}"`, timeout)
    }

    /*Отображение активного подраздела*/
    async active(subsection, timeout) {
        return await this.xpathElement(element.subsectionActive(subsection.url), `Подраздел "${subsection.description}" активен`, timeout)
    }

    /*Нажатие кнопки подраздела*/
    async handler(subsection, timeout) {
        return  await this.xpathHandler(element.subsection(subsection.url), `Нажатие подраздела "${subsection.description}"`, timeout)
    }

    async noElement(subsection, timeout) {
        return await this.xpathNoElement(element.subsection(subsection.url), `Отсутствие подраздела "${subsection.description}"`, timeout)
    }
}

module.exports = Subsection