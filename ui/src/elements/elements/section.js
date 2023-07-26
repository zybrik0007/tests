const BasePage = require('../../pages/base-page/base-page')
const elements = require('../../dictionaries/selenium-elements')

//Разделы
class Section extends BasePage {
    constructor() {
        super();
    }

    //Отображение раздела
    async section(section, timeout) {
        await this.loading(1000);
        return await this.xpathElement(elements.section(section.classed),
            `Отображение раздела "${section.description}"`,
            timeout)
    }

    //Раздел активен
    async active(section, timeout) {
        await this.loading(500);
        return await this.xpathElement(elements.sectionActive(section.classed),
            `Раздел "${section.description} активен"`,
            timeout)
    }

    //Нажатие кнопки раздела
    async handler(section, timeout) {
        await this.loading(1000);
        return await this.xpathHandler(elements.section(section.classed),
            `Нажатие по разделу "${section.description}"`,
            timeout)
    }

    //Отсутствие раздела
    async noElement(section, timeout) {
        await this.loading(1000);
        return await this.xpathNoElement(elements.section(section.classed),
            `Отсутствие раздела "${section.description}"`,
            timeout)
    }
}

module.exports = Section