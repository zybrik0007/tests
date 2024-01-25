const {it} = require('mocha');
const page = require('../../pages');
const dec = require('../../dictionaries/decorate');

module.exports = {
    initAdd: ({timeout}) => it('Проверка заглавия и url.', async () => await dec.simple(page.orderpassChange.initAdd,
        [timeout],
        page.orderpassChange)),

    initEdit: ({timeout}) => it('Проверка заглавия и url.', async () => await dec.simple(page.orderpassChange.initEdit,
        [timeout],
        page.orderpassChange)),
}