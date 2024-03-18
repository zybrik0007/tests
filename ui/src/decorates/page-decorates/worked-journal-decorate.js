const {it} = require('mocha');
const page = require('../../pages');
const dec = require('../../dictionaries/decorate');

module.exports = {
    init: ({timeout}) => it('Проверка заглавия и url.', async () => await dec.simple(page.workedJournal.init,
        [timeout],
        page.workedJournal)),

    staffParams: ({param, value, timeout}) => it(`Отображение параметра "${param}" со значением "${value}".`,
        async () => await dec.simple(page.workedJournal.staffParams,
        [param, value, timeout],
        page.workedJournal)),

    staffFIO: ({value, timeout}) => it(`Отображение ФИО - "${value}" в заглавии.`,
        async () => await dec.simpleText(page.workedJournal.staffFIO,
            [timeout],
            value,
            page.workedJournal)),

    tableStrHandler: ({strNumber, timeout}) => it(`Нажатие по строке с номером "${strNumber}" в таблице.`,
        async () => await dec.simple(page.workedJournal.tableStrHandler,
            [strNumber, timeout],
            page.workedJournal)),

    tableCellGetText: ({headTitle, strNumber, cellNumber, value, timeout}) =>
        it(`Значение в строке ${strNumber} столбце ${strNumber} - "${headTitle}" равно "${value}".`,
            async () => await dec.simpleText(page.workedJournal.tableCellGetText,
                [headTitle, strNumber, cellNumber, timeout],
                value,
                page.workedJournal)),

    iconInputClock: ({timeout}) =>
        it(`Нажатие иконки часы в поле ввода "Длительность".`,
            async () => await dec.simple(page.workedJournal.iconClock,
                ['Длительность', timeout],
                page.workedJournal)),

    docCheckboxHandler: ({strNumber, timeout}) => it(`Нажатие по строке с номером "${strNumber}" в таблице 
    оправдательных документов.`,
        async () => await dec.simple(page.workedJournal.docCheckboxHandler,
            [strNumber, timeout],
            page.workedJournal)),

    docTableCellGetText: ({headTitle, strNumber, cellNumber, value, timeout}) =>
        it(`Значение в строке ${strNumber} столбце ${strNumber} - "${headTitle}" равно "${value}" в  таблице 
        оправдательных документов.`,
            async () => await dec.simpleText(page.workedJournal.docTableCellGetText,
                [headTitle, strNumber, cellNumber, timeout],
                value,
                page.workedJournal)),
}