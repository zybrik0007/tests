const BasePage = require('../../pages/base-page/base-page')
const elements = require('../../dictionaries/selenium-elements')

//Элемента списка для select
class SelectXpand extends BasePage {

    constructor() {
        super();
    }

    //Отображения элемента списка
    async xpand(timeout) {
        await this.loading(1000);
        return await this.xpathElement(elements.selectXpand,
            'Отображения выборки для select',
            timeout);
    }

    //Отсутствие элемента списка
    async xpandNoElement(timeout) {
        const close = await this.xpathNoElement(elements.selectXpand,
            'Отсутствие отображения выборки для select',
            timeout);
        await this.loading(1000);
        return close;
    }

    //Нажатие по элементу списка
    async handler(text, timeout) {
        return await this.xpathHandler(elements.selectXpandItem(text),
            `Нажатие по значению ${text} в выборке select`,
            timeout);
    }

    async scrollTop(num) {
        const scroll = await this.script(elements.passAccessScheduleChangeWeekScroll(0, num),
            'Скролл в моадальном окне выбора временных зон.');
        await this.loading(1000);
        return scroll;
    }
}

module.exports = SelectXpand;