const BasePage = require('../../pages/base-page/base-page')
const elements = require('../../dictionaries/selenium-elements')

//Модальное окно pw-dialog
class Dialog extends BasePage {
    constructor(title) {
        super();
        this.title = title
    }

    //Отображение модального окна
    async init(timeout) {
        await this.loading(2000);
        const modal = await this.xpathElement(elements.dialog,
            `Отображение Модального окна "${this.title}"`,
            timeout)

        if(modal.error) {
            return modal
        }

        if(this.title) {
            const title = await this.xpathElement(elements.dialogTitle(this.title),
                `Отображение Модального окна "${this.title}"`,
                timeout)

            if(title.error) {
                return title
            }
        }

        return {
            error: false,
            description: `Модальное окно "${this.title }" отображается`,
        }
    }

    //Отсутствие модального окна
    async initClose(timeout) {
        await this.loading(2000);
        const modalCssDisplayNone = await this.xpathNoElement(elements.dialogTitle,
            `Отсутствие модального окна "${this.title}".`,
            timeout)

        if(modalCssDisplayNone.error) {
            return modalCssDisplayNone
        }

        return {
            error: false,
            description:`Модальное окно "${this.title}" не отображается.`,
        }
    }

    //Нажатие кнопки закрыть
    async closeHandler(timeout) {
        return await this.xpathHandler(elements.dialogButClose,
            `Нажатие кнопки закрытия модального окна "${this.title}".`,
            timeout)
    }

    //Отображение кнопки закрытия
    async close(timeout) {
        return await this.xpathElement(elements.dialogButClose,
            `Отображение кнопки закрытия в модальном окне "${this.title}".`,
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

        return await this.xpathHandler(elements.dialogButton(text),
            `Нажатие кнопки "${text}" в модальном окне "${this.title}".`,
            timeout)
    }

    //Отображение активной кнопки
    async buttonActive(text, timeout) {
        return await this.xpathElement(elements.dialogButton(text),
            `Отображение активной кнопки "${text}" в модальном окне "${this.title}".`,
            timeout)
    }

    //Отображение не активной кнопки
    async buttonDisabled(text, timeout) {
        return await this.xpathElement(elements.dialogButtonDisabled(text),
            `Нажатие нкнопки "${text}" в модальном окне "${this.title}".`,
            timeout)
    }

    // Ввод значения в input
    async inputSendKeys(title, placeholder, value, timeout) {
        return await this.xpathSendKeys(elements.dialog + elements.input(title, placeholder),
            `Ввод значения ${value} в input ${title ? title : placeholder}.`,
            value,
            timeout)
    }

    // Получение значение input
    async inputGetValue(title, placeholder, timeout) {
        return await this.xpathGetAttribute(elements.dialog + elements.input(title, placeholder),
            `Получение значения input ${title ? title : placeholder}`,
            'value',
            timeout)
    }

    // Удаление значения input
    async inputBackSpace(title, placeholder, timeout) {
        return await this.backSpaceFullHandler(elements.dialog + elements.input(title, placeholder),
            `Удаление значения input ${title ? title : placeholder} через Backspace.`,
            timeout)
    }

}

module.exports = Dialog;