const BasePage = require('../../pages/base-page/base-page')
const element = require('../../dictionaries/selenium-elements')

//Input
class Input extends BasePage {
    constructor() {
        super();
    }

    //Отображение input
    async input(title, placeholder, timeout) {
        return await this.xpathElement(element.input(title, placeholder),
            `Отображение input ${title ? title : placeholder}.`,
            timeout)
    }

    //Ввод значения в input
    async sendKeys(title, placeholder, value, timeout) {
        return await this.xpathSendKeys(element.input(title, placeholder),
            `Ввод значения ${value} в input ${title ? title : placeholder}.`,
            value,
            timeout)
    }

    //Получение значение
    async getValue(title, placeholder, timeout) {
        return await this.xpathGetAttribute(element.input(title, placeholder),
            `Получение значения input ${title ? title : placeholder}`,
            'value',
            timeout)
    }

    //Удалить значения в input
    async clear(title, placeholder, timeout) {
        return await this.xpathClear(element.input(title, placeholder),
            `Удалить значени в input ${title ? title : placeholder}.`,
            timeout)
    }

    //Нажатие иконки xpand
    async iconXpand(title, placeholder, timeout) {
        return await this.xpathHandler(element.inputIcon(title, placeholder, 'Icon--expand_more'),
            `Нажатие иконки xpand в input ${title ? title : placeholder}.`,
            timeout)
    }

    //Нажатие иконки удалить
    async iconClear(title, placeholder, timeout) {
        return await this.xpathHandler(element.inputIcon(title, placeholder, 'Icon--clear'),
            `Нажатие иконки удалить в input ${title ? title : placeholder}.`,
            timeout)
    }

    //Нажатие иконки Outline
    async iconOutline(title, placeholder, timeout) {
        return await this.xpathHandler(element.inputIcon(title, placeholder, 'Icon--article_outline'),
            `Нажатие иконки outline в input ${title ? title : placeholder}.`,
            timeout)
    }

    //Нажатие иконки календарь
    async iconCalendar(title, placeholder, timeout) {
        return await this.xpathHandler(element.inputIcon(title, placeholder, 'Icon--calendar_today'),
            `Нажатие иконки календаря в input ${title ? title : placeholder}.`,
            timeout)
    }

    //Нажатие иконки карта
    async iconCard(title, placeholder, timeout) {
        return await this.xpathHandler(element.inputIcon(title, placeholder, 'Icon--payment_card_outline'),
            `Нажатие иконки карты в input ${title ? title : placeholder}.`,
            timeout)
    }

    async handler(title, placeholder, timeout) {
        return await this.xpathHandler(element.input(title, placeholder),
            `Нажатие input ${title ? title : placeholder}.`,
            timeout)
    }

    async backSpace(title, placeholder, timeout) {
        return await this.backSpaceFullHandler(element.input(title, placeholder),
            `Удаление значения input ${title ? title : placeholder} через Backspace.`,
            timeout)
    }

    //Нажатие иконки часы
    async iconClock(title, placeholder, timeout) {
        return await this.xpathHandler(element.inputIcon(title, placeholder, 'Icon--recent_outline'),
            `Нажатие иконки часов в input ${title ? title : placeholder}.`,
            timeout)
    }

    async iconMenu(title, placeholder, timeout) {
        return await this.xpathHandler(element.inputIcon(title, placeholder, 'Icon--menu'),
            `Нажатие иконки menu в input ${title ? title : placeholder}.`,
            timeout)
    }

    async iconKeyboard(title, placeholder, timeout) {
        return await this.xpathHandler(element.inputIcon(title, placeholder, 'Icon--keyboard_outline'),
            `Нажатие иконки keyboard в input ${title ? title : placeholder}.`,
            timeout)
    }

}

module.exports = Input