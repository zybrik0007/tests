const Modal = require('../elements/modal')
const elements = require('../../dictionaries/selenium-elements')

class PrintTable extends Modal {
    constructor(id, title) {
        super();
        this.id = id
        this.title = title
    }

    async cellGetText(head, str, cell, timeout) {
        const headText = await this.xpathGetText(elements.modalPrintHead(this.id, cell),
            `Печатная таблица. Заглавие ${head} c номером ${cell}.`,
            timeout)

        console.log('headText: ', headText)

        if(headText.text !== head) {
            return {
                error: true,
                description: `Ошибка. Печатная таблица. Значение заглавия ${head} не равно ${headText} c номером ${cell}.`,
            }
        }

        console.log(elements.modalPrintColumn(this.id, str, cell))
        return await this.xpathGetText(elements.modalPrintColumn(this.id, str, cell),
            `Печатная таблица. Значение столбца ${head}.`,
            timeout)
    }
}

module.exports = PrintTable