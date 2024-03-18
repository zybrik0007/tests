const {it} = require('mocha');
const el = require('../../elements');
const dec = require('../../dictionaries/decorate');

module.exports = {
    strHandler: ({strNumber, timeout}) => it(`Нажатие по строке ${strNumber} в таблице.`,
        async () => await dec.simple(el.table.strHandler,
            [strNumber, timeout],
            el.table)),

    noStr: ({timeout}) => it(`Отсутствие строк в таблице.`, async () => await dec.simple(el.table.noStr,
        [timeout],
        el.table)),

    singleSize: ({timeout}) => it(`Отображение в таблице одной строки.`,
        async () => await dec.simple(el.table.singleSize,
            [timeout],
            el.table)),

    size: ({strCount, timeout}) => it(`В таблице отображается ${strCount} строк.`,
        async () => await dec.simple(el.table.size,
            [strCount, timeout],
            el.table)),

    cellGetText: ({headTitle, strNumber, cellNumber, value, timeout}) =>
        it(`В таблице в строке ${strNumber} в столбце ${cellNumber} - "${headTitle}" отображается "${value}".`,
            async () => await dec.simpleText(el.table.cellGetText,
                [headTitle, strNumber, cellNumber, timeout],
                value,
                el.table)),

    cellImg: ({headTitle, strNumber, cellNumber, timeout}) =>
        it(`В таблице в строке ${strNumber} в столбце ${cellNumber} - "${headTitle}" отображается картинка`,
            async () => await dec.simple(el.table.cellImg,
                [headTitle, strNumber, cellNumber, timeout],
                el.table)),

    cellGetIconLock: ({strNumber, cellNumber, timeout}) =>
        it(`Отображение иконки замка в строке ${strNumber} в столбце ${cellNumber}.`,
            async () => await dec.simple(el.table.cellGetIconLock,
                [strNumber, cellNumber, timeout],
                el.table)),

    cellNoIconLock: ({strNumber, cellNumber, timeout}) =>
        it(`Отсутствие иконки замка в строке ${strNumber} в столбце ${cellNumber}.`,
            async () => await dec.simple(el.table.cellNoIconLock,
                [strNumber, cellNumber, timeout],
                el.table)),

    cellGetIconWarn: ({strNumber, cellNumber, timeout}) =>
        it(`Отображение иконки ошибки в строке ${strNumber} в столбце ${cellNumber}.`,
            async () => await dec.simple(el.table.cellGetIconWarn,
                [strNumber, cellNumber, timeout],
                el.table)),

    cellNoIconWarn: ({strNumber, cellNumber, timeout}) =>
        it(`Отсутствие иконки ошибки в строке ${strNumber} в столбце ${cellNumber}.`,
            async () => await dec.simple(el.table.cellNoIconWarn,
                [strNumber, cellNumber, timeout],
                el.table)),

    headGetText: ({headNumber, value, timeout}) => it(`В заглавии столбца ${headNumber} отображается "${value}".`,
        async () => await dec.simpleText(el.table.headGetText,
            [headNumber, timeout],
            value,
            el.table)),

    headSortAsc: ({headTitle, cellNumber, timeout}) =>
        it(`Столбец ${cellNumber} - "${headTitle}" отсортирован по возрастанию.`,
            async () => await dec.simple(el.table.headSortAsc,
                [headTitle, cellNumber, timeout],
                el.table)),

    headSortDesc: ({headTitle, cellNumber, timeout}) =>
        it(`Столбец ${cellNumber} - "${headTitle}" отсортирован по убыванию.`,
            async () => await dec.simple(el.table.headSortDesc,
                [headTitle, cellNumber, timeout],
                el.table)),

    headNoSort: ({headTitle, cellNumber, timeout}) => it(`Столбец ${cellNumber} - "${headTitle}" не отсортирован.`,
        async () => await dec.simple(el.table.headSortDesc,
            [headTitle, cellNumber, timeout],
            el.table)),

    headHandler: ({headTitle, cellNumber, timeout}) => it(`Нажатие по загалвию столбца ${cellNumber} - "${headTitle}".`,
        async () => await dec.simple(el.table.headHandler,
            [headTitle, cellNumber, timeout],
            el.table)),

    headElement: ({headTitle, cellNumber, timeout}) => it(`Проверка заглавия столбца ${cellNumber} - "${headTitle}".`,
        async () => await dec.simple(el.table.headHandler,
            [headTitle, cellNumber, timeout],
            el.table)),

    controlStrHandler: ({cellNumber, timeout}) => it(`Нажтие Ctrl + по строке ${cellNumber} в таблице.`,
        async () => await dec.simple(el.table. controlStrHandler,
            [cellNumber, timeout],
            el.table)),

}

