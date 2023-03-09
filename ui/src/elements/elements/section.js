const BasePage = require('../../pages/base-page/base-page')
const elements = require('../../dictionaries/selenium-elements')


class Section extends BasePage {
    constructor() {
        super();
    }

    /*Отображение раздела*/
    async section(section, timeout) {
        return await this.xpathElement(elements.section(section.classed), `Оображение раздела "${section.description}"`, timeout)
    }

    async active(section, timeout) {
        return await this.xpathElement(elements.sectionActive(section.classed), `Раздел "${section.description} активен"`, timeout)
    }

    /*Нажатие кнопки раздела*/
    async handler(section, timeout) {
        return await this.xpathHandler(elements.section(section.classed), `Нажатие по разделу "${section.description}"`, timeout)
    }

    async noElement(section, timeout) {
        return await this.xpathNoElement(elements.section(section.classed), `Отсутствие раздела "${section.description}"`, timeout)
    }
}

module.exports = Section