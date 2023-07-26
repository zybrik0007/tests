const Modal = require('../elements/modal');
const elements = require('../../dictionaries/selenium-elements');

class AdditionalData extends Modal {

    constructor(id, title) {
        super();
        this.id = id;
        this.title = title;
    }

    // Отображение поля ввода по номеру в списке полей ввода "Поля"
    async selectType(num, timeout) {
        return await this.xpathElement(elements.modalAdditionalDataInput('Поля', num),
            `Отображение поля с порядковым номером ${num} в списке полей ввода "Поля" в модальном окне 
            "${this.title}"`,
            timeout);
    }

    // Отсуствие полей ввода в списке полей ввода "Поля"
    async noSelectType(timeout) {
        return await this.xpathNoElement(elements.modalAdditionalDataInput('Поля', 1),
            'Отсуствие полей в списке полей ввода "Поля"',
            timeout)
    }

    // Отсуствие полей ввода по номеру в списке полей ввода "Поля"
    async noSelectTypeNum(num, timeout) {
        return await this.xpathNoElement(elements.modalAdditionalDataInput('Поля', num),
            'Отсуствие полей в списке полей ввода "Поля"',
            timeout)
    }

    // Ввод значения в поле ввода по номеру в списке полей ввода "Поля"
    async selectTypeSendKeys(num, text, timeout) {
        return await this.xpathSendKeys(elements.modalAdditionalDataInput('Поля', num),
            `Ввод значение в поле с порядковым номером ${num} в списке полей ввода "Поля" в модальном окне 
            "${this.title}"`,
            text,
            timeout);
    }

    // Полечение значения поля ввода по номеру в списке полей ввода "Поля"
    async selectTypeGetValue(num, timeout) {
        return await this.xpathGetAttribute(elements.modalAdditionalDataInput('Поля', num),
            `Получение значения поля с порядковым номером ${num}  в списке полей ввода "Поля" в модальном окне
             "${this.title}"`,
            'value',
            timeout);
    }

    // Удаление значения поля ввода по номеру в списке полей ввода "Поля"
    async selectTypeBackSpace(num, timeout) {
        return await this.backSpaceFullHandler(elements.modalAdditionalDataInput('Поля', num),
            `Удаление значение в поле с порядковым номером ${num} в списке полей ввода "Поля" в модальном окне
             "${this.title}"`,
            timeout);
    }

    // Удаление поля ввода по номеру в списке полей ввода "Поля"
    async selectTypeRemove(num, timeout) {
        return await this.xpathHandler(elements.modalAdditionalDataButton('Поля', num),
            `Удаление поля с порядковым номером ${num} в списке полей ввода "Поля" в модальном окне 
            "${this.title}"`,
            timeout);
    }

}

module.exports = AdditionalData;