const {it} = require('mocha');
const page = require('../../pages');
const dec = require('../../dictionaries/decorate');

module.exports = {
    initAdd: ({timeout}) => it('Проверка заглавия и url.', async () => await dec.simple(page.visitorChange.initAdd,
        [timeout],
        page.visitorChange)),

    initEdit: ({timeout}) => it('Проверка заглавия и url.', async () => await dec.simple(page.visitorChange.initEdit,
        [timeout],
        page.visitorArchive)),
}