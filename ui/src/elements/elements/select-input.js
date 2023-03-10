const BasePage = require('../../pages/base-page/base-page')
const element = require('../../dictionaries/selenium-elements')

//Select c input
class SelectInput extends BasePage {

    constructor() {
        super();
    }

    //Отображение  select
    async select(title, placeholder, timeout) {
        return await this.xpathElement(element.selectInput(title, placeholder),
            `Отображение элемента select ${title ? title : placeholder}`,
            timeout)
    }

    //Получение выбранного значения select
    async getValue(title, placeholder, timeout) {
        return await this.xpathGetAttribute(element.selectInput(title, placeholder),
            `Получение значения select ${title ? title : placeholder}`,
            'value',
            timeout)
    }

    //Нажатие иконки xpand
    async iconXpand(title, placeholder, timeout) {
        return await this.xpathHandler(element.selectInputIcon(title, placeholder, 'Icon--expand_more'),
            `Нажатие по иконке xpand в select ${title ? title : placeholder}`,
            timeout)
    }

    //Нажатие иконки outline
    async iconOutline(title, placeholder, timeout) {
        return await this.xpathHandler(element.selectInputIcon(title, placeholder, 'Icon--article_outline'),
            `Нажатие по иконке outline в select ${title ? title : placeholder}`,
            timeout)
    }

    //Нажатие иконки clear
    async iconClear(title, placeholder, timeout) {
        return await this.xpathHandler(element.selectInputIcon(title, placeholder, 'Icon--clear'),
            `Нажатие по иконке clear в select ${title ? title : placeholder}`,
            timeout)
    }
}

module.exports = SelectInput