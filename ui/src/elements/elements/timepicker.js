const BasePage = require('../../pages/base-page/base-page');
const elements = require('../../dictionaries/selenium-elements');

//Календарь
class Timepicker extends BasePage {

    constructor() {
        super();
    }

    //Отображение ввода часов
    async timepicker(timeout) {
        return await this.xpathElement(elements.timepicker,
            'Отображение ввода часов.',
            timeout)
    }

    async hourSenKeys(hour, timeout) {
        return await this.xpathSendKeys(elements.timepickerInput(1),
            `Ввод "${hour}" часов.`,
            hour,
            timeout);
    }

    async minuteSenKeys(minute, timeout) {
        return await this.xpathSendKeys(elements.timepickerInput(3),
            `Ввод "${minute}" минут.`,
            minute,
            timeout);
    }

}

module.exports = Timepicker;