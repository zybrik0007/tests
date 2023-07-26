const BasePage = require('../../pages/base-page/base-page')
const element = require('../../dictionaries/selenium-elements')
const xpand = new (require('./select-xpand'));

//Select c множественным выбором
class SelectMulti extends BasePage {

    constructor() {
        super();
    }

    //Отображение select
    async select(title, timeout) {
        return await this.xpathElement(element.selectMulti(title),
            `Отображение элемента input ${title}`,
            timeout)
    }

    //Получение текста выбранного значения по номеру
    async getText(title, val, timeout) {
        return await this.xpathGetText(element.selectMultiVal(title, val),
            `Получение значения select ${title} под счету ${val}`,
            timeout)
    }

    //Удаление выбранного значения по номеру
    async delete(title, val, timeout) {
        return await this.xpathHandler(element.selectMultiValDelete(title, val),
            `Удаление значнеие select ${title} под счету ${val}`,
            timeout)
    }

    //Нажатие по иконки xpand
    async iconXpand(title, timeout) {
        return await this.xpathHandler(element.selectMultiIcon(title,'Icon--expand_more'),
            `Нажатие по иконке xpand в select ${title}`,
            timeout)
    }

    //Нажатие по киноки outline
    async iconOutline(title, timeout) {
        return await this.xpathHandler(element.selectMultiIcon(title,'Icon--article_outline'),
            `Нажатие по иконке outline в select ${title}`,
            timeout)
    }

    //Нажатие по иконки clear
    async iconClear(title, timeout) {
        return await this.xpathHandler(element.selectMultiIcon(title,'Icon--clear'),
            `Нажатие по иконке clear в select ${title}`,
            timeout)
    }

    //Нажатие иконки menu
    async iconMenu(title, placeholder, timeout) {
        return await this.xpathHandler(element.selectMultiIcon(title, 'Icon--menu'),
            `Нажатие по иконке menu в select ${title ? title : placeholder}`,
            timeout)}

    async iconXpandSelected(title, text, timeout) {
        const iconHandler = await this.xpathHandler(element.selectMultiIcon(title,'Icon--expand_more'),
            `Нажатие по иконке xpand в select ${title}.`,
            timeout);

        if(iconHandler.error) {
            return iconHandler
        }

        await this.loading(500);

        const xpandOpen = await xpand.xpand(timeout);
        if(xpandOpen.error) {
            return xpandOpen
        }

        const xpandSelect = await xpand.handler(text, timeout);
        if(xpandSelect.error) {
            return xpandSelect
        }

        const xpandClose = await xpand.xpandNoElement(timeout);
        if(xpandClose.error) {
            return xpandClose
        }

        await this.loading(500);

        return {
            error: false,
            description: `В "${title}" выбрано значение ${text}`,
        }
    }

}

module.exports = SelectMulti;