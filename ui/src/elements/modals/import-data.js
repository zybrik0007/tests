const Modal = require('../elements/modal');
const elements = require('../../dictionaries/selenium-elements');
const xpand = new (require('../elements/select-xpand'));

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

    async scrollTop(number, timeout) {
        return await this.script(elements.modalImportScroll(0, number),
            `Скролл модального окна импорта на ${number}px.`,
            timeout)
    }

    async iconXpand(title, value, text, timeout) {
        const iconHandler = await this.xpathHandler(
            elements.modalId(this.id) + elements.selectIcon(title, value, 'Icon--expand_more'),
            `Нажатие по иконке xpand в select ${title ? title : value}`,
            timeout);

        if(iconHandler.error) {
            return iconHandler
        }

        await this.loading(500)

        const xpandOpen = await xpand.xpand(timeout)
        if(xpandOpen.error) {
            return xpandOpen
        }

        const xpandSelect = await xpand.handler(text, timeout)
        if(xpandSelect.error) {
            return xpandSelect
        }

        const xpandClose = await xpand.xpandNoElement(timeout)
        if(xpandClose.error) {
            return xpandClose
        }

        return {
            error: false,
            description: `В "${title ? title: value}" выбрано значение ${text}`,
        }
    }

}

module.exports = ImportData
