const BasePage = require('../../pages/base-page/base-page')
const elements = require('../../dictionaries/selenium-elements')

//Модально окно без id
class ModalConfirm extends BasePage {

    constructor(title, body) {
        super();
        this.title = title
        this.body = body
    }

    //Отображение модального окна
    async init(timeout) {
        const modal = await this.xpathElement(elements.modalConfirm,
            `Отображение модального окна "${this.title}"`,
            timeout)

        if(modal.error) {
            return modal
        }

        const title = await this.xpathElement(elements.modalConfirmTitle(this.title),
            `Отображение заглавие модального окна "${this.title}"`,
            timeout)

        if(title.error) {
            return title
        }

        const body = await this.xpathElement(elements.modalConfirmBody(this.body),
            `Отображение сообщения модального окна "${this.title}"`,
            timeout)

        if(body.error) {
            return body
        }

        return {
            error: false,
            description: `Модальное окно "${this.title}", заглавие и сообщение отображаются.`,
        }

    }

    //Отсутствие модального окна
    async initClose(timeout) {
        return await this.xpathCssDisplayNone(elements.modalConfirm,
            `Отсутствие модального окна "${this.title}"`,
            timeout)
    }

    //Нажатие кнопки закрыть
    async closeHandler(timeout) {
        return await this.xpathHandler(elements.modalConfirmButClose,
            `Нажатие кнопки закрытия модального окна "${this.title}".`,
            timeout)
    }

    //Отображение кнопки закрытия
    async close(timeout) {
        return await this.xpathElement(elements.modalConfirmButClose,
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

        return await this.xpathHandler(elements.modalConfirmButton(text),
            `Нажатие кнопки "${text}" в модальном окне "${this.title}".`,
            timeout)
    }

    //Отображение активной кнопки
    async buttonActive(text, timeout) {
        return await this.xpathElement(elements.modalConfirmButtonActive(text),
            `Отображение активной кнопки "${text}" в модальном окне "${this.title}".`,
            timeout)
    }

    //Отображение не активной кнопки
    async buttonDisabled(text, timeout) {
        return await this.xpathElement(elements.modalConfirmButtonDisabled(text),
            `Нажатие нкнопки "${text}" в модальном окне "${this.title}".`,
            timeout)
    }



}

module.exports = ModalConfirm
