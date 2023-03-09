const BasePage = require('../../pages/base-page/base-page')
const elements = require('../../dictionaries/selenium-elements')

class Modal extends BasePage {
    constructor(id, title) {
        super();
        this.id = id
        this.title = title
    }

    async init(timeout) {
        const modal = await this.xpathElement(elements.modalId(this.id), `Отображение Модального окна "${this.title ? this.title : 'c id ' + this.id}"`, timeout)
        if(modal.error) {
            return modal
        }

        if(this.title) {
            const title = await this.xpathElement(elements.modalTitle(this.title), `Отображение Модального окна "${this.title}"`, timeout)
            if(title.error) {
                return title
            }
        }

        return {error: false, description: `Модальное окно "${this.title ? this.title : 'c id ' + this.id}" отображается`}
    }

    async initClose(timeout) {
        const modalCssDisplayNone = await this.xpathCssDisplayNone(elements.modalId(this.id), `Отсутствие модального окна "${this.title ? this.title : 'c id ' + this.id}"`, timeout)
        if(modalCssDisplayNone.error) {
            return modalCssDisplayNone
        }

        return {
            error: false,
            description:`Модальное окно "${this.title ? this.title : 'c id ' + this.id}" не отображается`
        }
    }

    async closeHandler(timeout) {
        return await this.xpathHandler(elements.modalButClose(this.id), `Нажатие кнопки закрытия модального окна "${this.title ? this.title : 'c id ' + this.id}"`, timeout)
    }

}

module.exports = Modal