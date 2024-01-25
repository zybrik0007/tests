const BasePage = require('../../pages/base-page/base-page')
const elements = require('../../dictionaries/selenium-elements')

//Элемент вкладка с поиском по тексту для страниц измений и добавлений
class CardControlsNumber extends BasePage {

    constructor() {
        super();
    }

    async init(timeout) {
        await this.loading(2000);
        return await this.xpathElement(elements.modalCardControlsNumber,
            'Отображение модального окна "Выдать карту".',
            timeout);
    }

    async initClose(timeout) {
        await this.loading(2000);
        return await this.xpathNoElement(elements.modalCardControlsNumber,
            'Отсутствие модального окна "Выдать карту".',
            timeout);
    }

    async inputSendKeys(title, placeholder, value, timeout) {
        return await this.xpathSendKeys(elements.modalCardControlsNumberInput(title, placeholder),
            `Ввод в поле ввода ${title} - "${value}" в "Выдать карту".`,
            value,
            timeout);
    }

    async buttonHandler(name, timeout) {
        return await this.xpathHandler(elements.modalCardControlsNumberButton(name),
            `Нажатие кнопки "${name}" в модальном окне в "Выдать карту".`,
            timeout);
    }



}

module.exports = CardControlsNumber