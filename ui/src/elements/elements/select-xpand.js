const BasePage = require('../../pages/base-page/base-page')
const elements = require('../../dictionaries/selenium-elements')

//Элемента списка для select
class SelectXpand extends BasePage {

    constructor() {
        super();
    }

    //Отображения элемента списка
    async xpand(timeout) {
        return await this.xpathElement(elements.selectXpand,
            'Отображения выборки для select',
            timeout)
    }

    //Отсутствие элемента списка
    async xpandNoElement(timeout) {
        return await this.xpathNoElement(elements.selectXpand,
            'Отсутствие отображения выборки для select',
            timeout)
    }

    //Нажатие по элементу списка
    async handler(text, timeout) {
        return await this.xpathHandler(elements.selectXpandItem(text),
            `Нажатие по значению ${text} в выборке select`,
            timeout)
    }
}

module.exports = SelectXpand