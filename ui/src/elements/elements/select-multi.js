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
    async getText(title, value, timeout) {
        return await this.xpathGetText(element.selectMultiVal(title, value),
            `Получение значения select ${title} под счету ${value}`,
            timeout);
    }

    //Удаление выбранного значения по номеру
    async delete(title, value, timeout) {
        return await this.xpathHandler(element.selectMultiValDelete(title, value),
            `Удаление значнеие select ${title} под счету ${value}`,
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
    async iconMenu(title, timeout) {
        return await this.xpathHandler(element.selectMultiIcon(title, 'Icon--menu'),
            `Нажатие по иконке menu в select ${title}`,
            timeout)}

    async iconXpandSelected(title, value, timeout) {
        const iconHandler = await this.xpathHandler(element.selectMultiIcon(title,'Icon--expand_more'),
            `Нажатие по иконке xpand в select ${title}.`,
            timeout);

        console.log(element.selectMultiIcon(title,'Icon--expand_more'))

        if(iconHandler.error) {
            return iconHandler
        }

        await this.loading(500);

        const xpandOpen = await xpand.xpand(timeout);
        if(xpandOpen.error) {
            return xpandOpen
        }

        const xpandSelect = await xpand.handler(value, timeout);
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
            description: `В "${title}" выбрано значение ${value}`,
        }
    }

}

module.exports = SelectMulti;