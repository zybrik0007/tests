const BasePage = require('../../pages/base-page/base-page')
const element = require('../../dictionaries/selenium-elements')
const xpand = new (require('./select-xpand'))

//Select с заглавие и значением
class Select extends BasePage {

    constructor() {
        super();
    }

    //Отображение select
    async select(title, value, timeout) {
        return await this.xpathElement(element.select(title, value),
            `Отображение select ${title ? title : value}`,
            timeout)
    }

    //Получение выбранного значения в select
    async getText(title, value, timeout) {
        return await this.xpathGetText(element.select(title, value),
            `Получение значения select  ${title ? title : value}`,
            timeout)
    }

    //Нажатие по иконки xpand в select и выбор значения в списке
    async iconXpand(title, value, text, timeout) {
        const iconHandler = await this.xpathHandler(element.selectIcon(title, value, 'Icon--expand_more'),
            `Нажатие по иконке xpand в select ${title ? title : value}`,
            timeout)

        if(iconHandler.error) {
            return iconHandler
        }

        await this.loading(500)

        const xpandOpen = await xpand.xpand(timeout)
        if(xpandOpen.error) {
            return xpandOpen
        }

        const xpandSelect = await xpand.handler(text, timeout)
        if(xpandSelect.error) {
            return xpandSelect
        }

        const xpandClose = await xpand.xpandNoElement(timeout)
        if(xpandClose.error) {
            return xpandClose
        }

        const selected = await this.select(title, text, timeout)
        if(selected.error) {
            return selected
        }

        return {
            error: false,
            description: `В "${title ? title: value}" выбрано значение ${text}`,
        }

    }

    //Нажатие по иконки outline в select
    async iconOutline(title, timeout) {
        return await this.xpathHandler(element.selectIcon(title, value, 'Icon--article_outline'),
            `Нажатие по иконке outline в select ${title ? title : value}`,
            timeout)
    }
}

module.exports = Select