const {it} = require('mocha');
const page = require('../../pages');
const dec = require('../../dictionaries/decorate');

module.exports = {
    init: ({timeout}) => it('Проверка заглавия и url.', async () => await dec.simple(page.premiseAccessAll.init,
        [timeout],
        page.premiseAccessAll)),
}