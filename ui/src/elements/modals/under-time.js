const Modal = require('../elements/modal')
const elements = require('../../dictionaries/selenium-elements')

class UnderTime extends Modal {

    constructor(id, title) {
        super();
        this.id = id
        this.title = title
    }

    async checkboxHandler(str, timeout) {
        return await this.xpathHandler(elements.modalId(this.id) + elements.tableStrNum(str) + '//pw-checkbox',
            `Нажатие по чекбоксу в строке с номером "${str}" в таблице оправдательных документов.`,
            timeout);
    }
}

module.exports = UnderTime