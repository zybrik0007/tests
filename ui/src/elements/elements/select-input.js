const BasePage = require('../../pages/base-page/base-page')
const element = require('../../dictionaries/selenium-elements')

class SelectInput extends BasePage {
    constructor() {
        super();
    }

    async select(title, placeholder, timeout) {
        return await this.xpathElement(element.selectInput(title, placeholder), `Отображение элемента select ${title ? title : placeholder}`, timeout)
    }

    async getValue(title, placeholder, timeout) {
        return await this.xpathGetAttribute(element.selectInput(title, placeholder), `Получение значения select ${title ? title : placeholder}`, 'value', timeout)
    }

    async iconXpand(title, placeholder, timeout) {
        return await this.xpathHandler(element.selectInputIcon(title, placeholder, 'Icon--expand_more'), `Нажатие по иконке xpand в select ${title ? title : placeholder}`, timeout)
    }

    async iconOutline(title, placeholder, timeout) {
        return await this.xpathHandler(element.selectInputIcon(title, placeholder, 'Icon--article_outline'), `Нажатие по иконке outline в select ${title ? title : placeholder}`, timeout)
    }

    async iconClear(title, placeholder, timeout) {
        return await this.xpathHandler(element.selectInputIcon(title, placeholder, 'Icon--clear'), `Нажатие по иконке clear в select ${title ? title : placeholder}`, timeout)
    }
}

module.exports = SelectInput