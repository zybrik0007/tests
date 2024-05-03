const BasePage = require('../../pages/base-page/base-page')
const elements = require('../../dictionaries/selenium-elements')

class Menu extends BasePage{
    constructor() {
        super();
    }

    async menu(timeout) {
        await this.loading(1000);
        return await this.xpathElement(elements.menuNavigation,
            'Отображение меню.',
            timeout)
    }

    async closed(timeout) {
        return await this.xpathNoElement(elements.menuNavigation,
            'Отсутствие меню.',
            timeout)
    }

    async itemActive(text, timeout) {
        return await this.xpathElement(elements.menuNavigationItemActive(text),
            `Отображение активного параметра "${text}" в меню.`,
            timeout)
    }

    async itemDisabled(text, timeout) {
        console.log(elements.menuNavigationItemDisabled(text))
        return await this.xpathElement(elements.menuNavigationItemDisabled(text),
            `Отображение заблокированного параметра "${text}" в меню.`,
            timeout)
    }

    async handler(text, timeout) {
        console.log(elements.menuNavigationItem(text));
        return await this.xpathHandler(elements.menuNavigationItem(text),
            `Нажатие по параметру "${text}" в меню.`,
            timeout)
    }
}

module.exports = Menu