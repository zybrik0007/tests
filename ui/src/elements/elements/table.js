const BasePage = require('../../pages/base-page/base-page')
const elements = require('../../dictionaries/selenium-elements')

//Таблица
class Table extends BasePage {

    constructor() {
        super();
        this.icons = {
            lock: 'Icon--lock',
            warn: 'Icon--warning_triangle',
        }
    }

    //Нажатие по строке в таблице по номеру
    async strHandler(str, timeout) {
        const handler = await this.xpathHandler(elements.tableStrNum(str),
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

    //Отсутствие строк в таблице
    async noStr(timeout) {
        return await this.xpathNoElement(elements.tableStr,
            'Отсутствие строк в таблице',
            timeout)
    }

    //Отображение в таблице одной строки
    async singleSize(timeout) {
        return await this.xpathList(elements.tableStr,
            'В таблице отображается одна строка',
            1,
            timeout)
    }

    //Отображенеи количества строк
    async size(num, timeout) {
        return await this.xpathList(elements.tableStr,
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

        return await this.xpathGetText(elements.tableCellText(str, cell),
            `Значение столбца ${head}.`,
            timeout)
    }

    //Отображение иконки замка в ячейке по столбцу, номеру строки и номеру колонки
    async cellGetIconLock(str, cell, timeout) {
        const headerIcon = await this.xpathElement(elements.tableHeadIcon(cell, this.icons.lock),
            `Отображение иконки "Замок" в заглавии номер ${cell}`,
            timeout)

        if(headerIcon.error) {
            return {
                error: true,
                description: `Ошибка. Отсутствие иконки "Замок" в заглавии номер ${cell}`,
            }
        }

        return await this.xpathElement(elements.tableCellIcon(str, cell, this.icons.lock),
            `Отображение иконки "Замок" в строке номер "${str}" и столбце ${cell}`,
            timeout)
    }

    //Отсутствие иконки замка в ячейке по столбцу, номеру строки и номеру колонки
    async cellNoIconLock(str, cell, timeout) {
        const headerIcon = await this.xpathElement(elements.tableHeadIcon(cell, this.icons.lock),
            `Отображение иконки "Замок" в заглавии номер ${cell}`,
            timeout)

        if(headerIcon.error) {
            return {
                error: true,
                description: `Ошибка. Отсутствие иконки "Замок" в заглавии номер ${cell}`,
            }
        }

        return await this.xpathNoElement(elements.tableCellIcon(str, cell, this.icons.lock),
            `Отсутствие иконки "Замок" в строке номер "${str}" и столбце "${cell}"`,
            timeout)
    }

    //Получение значения текста заглавия
    async headGetText(cell, timeout) {
        return await this.xpathGetText(elements.tableHeadText(cell),
            `Получение значения заглавия c номером по счету ${cell}.`,
            timeout)
    }

    //Столбец сортирован по возрастанию
    async headSortAsc(head, cell, timeout) {
        const headText = await this.headElement(head, cell)
        if (headText.error) {
            return headText
        }

        return await this.xpathElement(elements.tableHeadSort(cell, 'sort-asc', 'Icon--chevron_up_outline'),
            `Столбец ${head} отсортирован по возрастанию.`,
            timeout)
    }

    //Столбец сортирован по убыванию
    async headSortDesc(head, cell, timeout) {
        const headText = await this.headElement(head, cell)
        if (headText.error) {
            return headText
        }

        return await this.xpathElement(elements.tableHeadSort(cell, 'sort-desc', 'Icon--chevron_down_outline'),
            `Столбец ${head} отсортирован по возрастанию.`,
            timeout)
    }

    //Столбец не отсортирован
    async headNoSort(head, cell, timeout) {
       const headText = await this.headElement(head, cell)
       if(headText.error) {
           return headText
       }

       return await this.xpathElement(elements.tableHeadNoSort(cell, 'sort-asc', sort-desc),
           `Столбец ${head} не отсортирован.`,
           timeout)
   }

   //Нажатие по загалвию столбца
   async headHandler(head, cell, timeout) {
       const headText = await this.headElement(head, cell)
       if(headText.error) {
           return headText
       }

       return await this.xpathHandler(elements.tableHeadText(cell),
           `Нажатие по заглавию столбца ${head}`,
           timeout)

   }

   //Проверка заглавия столбца
   async headElement(head, cell, timeout) {
       const headText = await this.xpathGetText(elements.tableHeadText(cell),
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

   //Нажтие Ctrl + по строке в таблице по номеру
    async controlStrHandler(event, timeout) {
        return await this.xpathControlHandler(elements.tableStrNum(event),
            `Нажатие "Control" и номер ${event}  строки.`,
            timeout)
    }
}

module.exports = Table