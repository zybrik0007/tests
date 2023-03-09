const BasePage = require('../../pages/base-page/base-page')
const elements = require('../../dictionaries/selenium-elements')

class ModalConfirm extends BasePage {

    constructor(title, body) {
        super();
        this.title = title
        this.body = body
    }

    async init(timeout) {
        const modal = await this.xpathElement(elements.modalConfirm, `Отображение модального окна "${this.title}"`, timeout)
        if(modal.error) {
            return modal
        }

        const title = await this.xpathElement(elements.modalConfirmTitle(this.title), `Отображение заглавие модального окна "${this.title}"`, timeout)
        if(title.error) {
            return title
        }

        const body = await this.xpathElement(elements.modalConfirmBody(this.body), `Отображение сообщения модального окна "${this.title}"`, timeout)
        if(body.error) {
            return body
        }

        return {error: false, description: `Модальное окно "${this.title}", заглавие и сообщение отображаются`}

    }

    async initClose(timeout) {
        return await this.xpathCssDisplayNone(elements.modalConfirm, `Отсутствие модального окна "${this.title}"`, timeout)
    }

}

module.exports = ModalConfirm
