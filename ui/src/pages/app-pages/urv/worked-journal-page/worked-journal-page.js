const BasePage = require('../../../base-page/base-page');
const {workedJournalTITLE} = require('../../../../dictionaries/title');
const {workedJournalURL} = require('../../../../dictionaries/url');
const elements = require('../../../../dictionaries/selenium-elements');

class WorkedJournalPage extends BasePage {
    constructor() {
        super();
    }

    //Отображение страницы
    async init(timeout) {
        const elementTitle = await this.titleCompare(workedJournalTITLE, timeout);
        if (elementTitle.error) {
            return elementTitle
        }

        const elementUrl = await this.urlCompare(workedJournalURL, timeout);
        if(elementUrl.error) {
            return elementUrl
        }

        return {
            error: false,
            description: 'Заглавие валидно. Url валиден.',
        }
    };

    //Верхняя левая панель при открытии просмотра по дням
    async staffParams(param, value, timeout) {
        return await this.xpathElement(elements.urvJournalStaffParam(param, value),
            `Отображение параметра "${param}" со значением "${value}".`,
            timeout);
    }

    //ФИО при открытии просмотра по дням
    async staffFIO(timeout) {
        return await this.xpathGetText(elements.urvJournalStaffFIO,
            `Получение значения ФИО в заглавии.`,
            timeout);
    }

    //Нажатие по строке в таблице по номеру
    async tableStrHandler(str, timeout) {
        const handler = await this.xpathHandler('//app-pages-wj-detail-information' + elements.tableStrNum(str),
            `Нажатие по строке с номером "${str}" в таблице.`,
            timeout)

        if(handler.error) {
            return handler
        }

        const active = await this.xpathElement(elements.tableStrNumActive(str),
            `Выделение нажатой строки с номером "${str}"`,
            timeout)

        if(active.error) {
            return active
        }

        return {
            error: false,
            description: `Строка с номером "${str}" нажата`,
        }
    }

    //Получение текста из ячейки по столбцу, номеру строки и номеру колонки
    async tableCellGetText(head, str, cell, timeout) {
        const headText = await this.tableHeadElement(head, cell);
        if (headText.error) {
            return headText
        }

        return await this.xpathGetText('//app-pages-wj-detail-information' + elements.tableCellText(str, cell),
            `Значение столбца ${head}.`,
            timeout)
    }

    //Проверка заглавия столбца
    async tableHeadElement(head, cell, timeout) {
        const headText = await this.xpathGetText('//app-pages-wj-detail-information' + elements.tableHeadText(cell),
            `Заглавие ${head} c номером ${cell}.`,
            timeout);

        if(headText.error && headText.text !== head) {
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

    //Нажатие иконки часы
    async iconClock(title, timeout) {
        return await this.xpathHandler(elements.pageWorkedJournalClockInput,
            `Нажатие иконки часов в input ${title}.`,
            timeout)
    }

    async docCheckboxHandler(str, timeout) {
        return await this.xpathHandler('//*[@class="wj-detail-info-support-docs"]' + elements.tableStrNum(str) +
            '//pw-checkbox',
            `Нажатие по чекбоксу в строке с номером "${str}" в таблице оправдательных документов.`,
            timeout);
    }

    //Получение текста из ячейки по столбцу, номеру строки и номеру колонки
    async docTableCellGetText(head, str, cell, timeout) {
        const headText = await this.tableHeadElement(head, cell);
        if (headText.error) {
            return headText
        }

        return await this.xpathGetText('//*[@class="wj-detail-info-support-docs"]' + elements.tableCellText(str, cell),
            `Значение столбца ${head}.`,
            timeout)
    }
}

module.exports = WorkedJournalPage;