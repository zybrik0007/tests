const BasePage = require('../../pages/base-page/base-page')
const element = require('../../dictionaries/selenium-elements')

class SelectMulti extends BasePage {
    constructor() {
        super();
    }

    async select(title, timeout) {
        return await this.xpathElement(element.selectMulti(title), `Отображение элемента input ${title}`, timeout)
    }

    async getText(title, val, timeout) {
        console.log(element.selectMultiVal(title, val))
        return await this.xpathGetText(element.selectMultiVal(title, val), `Получение значения select ${title} под счету ${val}`, timeout)
    }

    async delete(title, val, timeout) {
        return await this.xpathHandler(element.selectMultiValDelete(title, val), `Удаление значнеие select ${title} под счету ${val}`, timeout)
    }

    async iconXpand(title, timeout) {
        return await this.xpathHandler(element.selectMultiIcon(title,'Icon--expand_more'), `Нажатие по иконке xpand в select ${title}`, timeout)
    }

    async iconOutline(title, timeout) {
        return await this.xpathHandler(element.selectMultiIcon(title,'Icon--article_outline'), `Нажатие по иконке outline в select ${title}`, timeout)
    }

    async iconClear(title, timeout) {
        return await this.xpathHandler(element.selectMultiIcon(title,'Icon--clear'), `Нажатие по иконке clear в select ${title}`, timeout)
    }

}

module.exports = SelectMulti