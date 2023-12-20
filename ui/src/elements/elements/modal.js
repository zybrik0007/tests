const BasePage = require('../../pages/base-page/base-page')
const elements = require('../../dictionaries/selenium-elements')

//Модальное окно с id
class Modal extends BasePage {
    constructor(id, title) {
        super();
        this.id = id
        this.title = title
    }

    //Отображение модального окна
    async init(timeout) {
        await this.loading(2000);
        const modal = await this.xpathElement(elements.modalId(this.id),
            `Отображение Модального окна "${this.title ? this.title : 'c id ' + this.id}"`,
            timeout)

        if(modal.error) {
            return modal
        }

        if(this.title) {
            const title = await this.xpathElement(elements.modalTitle(this.title),
                `Отображение Модального окна "${this.title}"`,
                timeout)

            if(title.error) {
                return title
            }
        }

        return {
            error: false,
            description: `Модальное окно "${this.title ? this.title : 'c id ' + this.id}" отображается`,
        }
    }

    //Отсутствие модального окна
    async initClose(timeout) {
        await this.loading(2000);
        const modalCssDisplayNone = await this.xpathCssDisplayNone(elements.modalId(this.id),
            `Отсутствие модального окна "${this.title ? this.title : 'c id ' + this.id}".`,
            timeout)

        if(modalCssDisplayNone.error) {
            return modalCssDisplayNone
        }

        return {
            error: false,
            description:`Модальное окно "${this.title ? this.title : 'c id ' + this.id}" не отображается.`,
        }
    }

    //Нажатие кнопки закрыть
    async closeHandler(timeout) {
        return await this.xpathHandler(elements.modalButClose(this.id),
            `Нажатие кнопки закрытия модального окна "${this.title ? this.title : 'c id ' + this.id}".`,
            timeout)
    }

    //Отображение кнопки закрытия
    async close(timeout) {
        return await this.xpathElement(elements.modalButClose(this.id),
            `Отображение кнопки закрытия в модальном окне "${this.title ? this.title : 'c id ' + this.id}".`,
            timeout)
    }

    //Нажатие кнопки в модальном окне
    async buttonHandler(text, timeout) {

        const active = await this.buttonActive(text, timeout)

        if(active.error) {
            return {
                error: true,
                description: `Ошибка. Кнопка "${text}" неактивна, нажатие невозможно.`,
            }
        }

        return await this.xpathHandler(elements.modalButton(this.id, text),
            `Нажатие кнопки "${text}" в модальном окне "${this.title ? this.title : 'c id ' + this.id}".`,
            timeout)
    }

    //Отображение активной кнопки
    async buttonActive(text, timeout) {
        return await this.xpathElement(elements.modalButtonActive(this.id, text),
            `Отображение активной кнопки "${text}" в модальном окне "${this.title ? this.title : 'c id ' + this.id}".`,
            timeout)
    }

    //Отображение не активной кнопки
    async buttonDisabled(text, timeout) {
        return await this.xpathElement(elements.modalButtonDisabled(this.id, text),
            `Нажатие нкнопки "${text}" в модальном окне "${this.title ? this.title : 'c id ' + this.id}".`,
            timeout)
    }

    // Ввод значения в input
    async inputSendKeys(title, placeholder, value, timeout) {
        return await this.xpathSendKeys(elements.modalId(this.id) + elements.input(title, placeholder),
            `Ввод значения ${value} в input ${title ? title : placeholder}.`,
            value,
            timeout)
    }

    // Получение значение input
    async inputGetValue(title, placeholder, timeout) {
        return await this.xpathGetAttribute(elements.modalId(this.id) + elements.input(title, placeholder),
            `Получение значения input ${title ? title : placeholder}`,
            'value',
            timeout)
    }

    // Удаление значения input
    async inputBackSpace(title, placeholder, timeout) {
        return await this.backSpaceFullHandler(elements.modalId(this.id) + elements.input(title, placeholder),
            `Удаление значения input ${title ? title : placeholder} через Backspace.`,
            timeout)
    }

}

module.exports = Modal;