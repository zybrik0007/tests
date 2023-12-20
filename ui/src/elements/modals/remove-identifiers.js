const Modal = require('../elements/modal')
const elements = require('../../dictionaries/selenium-elements')

class RemoveIdentifiers extends Modal {
    constructor(id, title) {
        super();
        this.id = id
        this.title = title
    }

    //Отсутствие строк в таблице
    async noStr(timeout) {
        return await this.xpathNoElement(elements.modalId(this.id) + elements.tableStr,
            'Отсутствие строк в таблице',
            timeout)
    }

    //Отображенеи количества строк
    async size(num, timeout) {
        return await this.xpathList(elements.modalId(this.id) + elements.tableStr,
            `В таблице отображается ${num} строк`,
            num,
            timeout)
    }

    //Получение текста из ячейки по столбцу, номеру строки и номеру колонки
    async cellGetText(head, str, cell, timeout) {
        const headText = await this.headElement(head, cell)
        if (headText.error) {
            return headText
        }

        return await this.xpathGetText(elements.modalId(this.id) + elements.tableCellText(str, cell),
            `Значение столбца ${head}.`,
            timeout)
    }

    //Проверка заглавия столбца
    async headElement(head, cell, timeout) {
        const headText = await this.xpathGetText(elements.modalId(this.id) + elements.tableHeadText(cell),
            `Заглавие ${head} c номером ${cell}.`,
            timeout)

        if(headText.text !== head) {
            return {
                error: true,
                description: `Ошибка. Значение заглавия ${head} не равно ${headText.text} c номером ${cell}.`,
            }
        }

        return {
            error: false,
            description: `Значение заглавия ${head} равно ${headText} c номером ${cell}.`
        }

    }

    //Получение значения текста заглавия
    async headGetText(cell, timeout) {
        return await this.xpathGetText(elements.modalId(this.id) + elements.tableHeadText(cell),
            `Получение значения заглавия c номером по счету ${cell}.`,
            timeout)
    }

    //Нажатие чекбокса
    async checkboxHandler(str, timeout) {
        const handler = await this.xpathHandler(elements.modalId(this.id)
            + elements.tableStrNum(str) + elements.checkbox(''),
            `Нажатие по чекбоксу в строке ${str} в модальном окне  Неиспользуемые идентификаторы.`,
            timeout);
        await this.loading(1000);
        return handler;
    }

    //Чекбокс активен
    async checkboxChecked(str, timeout) {
        const handler = await this.xpathElement(elements.modalId(this.id)
            + elements.tableStrNum(str) + elements.checkboxChecked(''),
            `Чекбокс в строке ${str} в модальном окне  Неиспользуемые идентификаторы нажат.`,
            timeout);
        await this.loading(1000);
        return handler;
    }

    //Чекбокс не активен
    async checkboxUnchecked(str, timeout) {
        const handler = await this.xpathElement(elements.modalId(this.id)
            + elements.tableStrNum(str) + elements.checkboxUnchecked(''),
            `Чекбокс в строке ${str} в модальном окне  Неиспользуемые идентификаторы не нажат.`,
            timeout);
        await this.loading(1000);
        return handler;
    }
}

module.exports = RemoveIdentifiers;