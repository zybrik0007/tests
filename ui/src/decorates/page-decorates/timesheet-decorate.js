const {it} = require('mocha');
const page = require('../../pages');
const dec = require('../../dictionaries/decorate');

module.exports = {
    init: ({timeout}) => it('Проверка заглавия и url.', async () => await dec.simple(page.timesheet.init,
        [timeout],
        page.timesheet)),

    selectIconExpand: ({title, timeout}) => it(`Нажатие по иконке expand в поле выбора "${title}".`,
        async () => await dec.simple(page.timesheet.selectIconExpand,
        [title, timeout],
        page.timesheet)),

    table: ({tr, td, value, timeout}) => it(`В строке ${tr} и в ячейке ${td} отображается "${value}".`,
        async () => await dec.simpleText(page.timesheet.table,
            [tr, td,  timeout],
            value,
            page.timesheet)),
}