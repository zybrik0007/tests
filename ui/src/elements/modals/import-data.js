const Modal = require('../elements/modal')
const elements = require('../../dictionaries/selenium-elements')

//Модально окно выбора устройства в подразделе Конфиуграция
class ImportData extends Modal {

    constructor(id, title) {
        super();
        this.id = id
        this.title = title
    }

    async sendKeys(text, timeout) {
        return await this.xpathSendKeys(elements.modalImportInputFile(this.id),
            'Ввод адреса файла импорта.',
            text,
            timeout)
    }

    async bodyGetText(timeout) {
        return await this.xpathGetText(elements.modalImportBody(this.id),
            `Получение сообщения в модальном окне импорта.`,
            timeout)
    }

}

module.exports = ImportData
