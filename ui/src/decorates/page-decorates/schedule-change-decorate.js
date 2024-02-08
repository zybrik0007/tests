const {it} = require('mocha');
const page = require('../../pages');
const dec = require('../../dictionaries/decorate');

module.exports = {
    initAdd: ({timeout}) => it('Проверка заглавия и url.', async () => await dec.simple(page.schedulePageChange.initAdd,
        [timeout],
        page.schedulePageChange)),

    initEdit: ({timeout}) => it('Проверка заглавия и url.', async () => await dec.simple(page.schedulePageChange.initEdit,
        [timeout],
        page.schedulePageChange)),

    addInterval: ({numInterval, timeout}) => it(`Создание интервала графика работы для интервала c порядковым номером  +
        '${numInterval}.'`, async () => await dec.simple(page.schedulePageChange.addInterval,
        [numInterval, timeout],
        page.schedulePageChange)),
}