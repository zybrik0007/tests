const {it} = require('mocha');
const dec = require('../../dictionaries/decorate');
const entry = require('../../../../entry');

module.exports = {
    init: (classed) => it('Проверка URL и TITLE', async () => await dec.simple(classed.init,
        [entry.max],
        classed)),

    initAdd: (classed) => it('Проверка URL и TITLE', async () => await dec.simple(classed.initAdd,
        [entry.max],
        classed)),

    initEdit: (classed) => it('Проверка URL и TITLE', async () => await dec.simple(classed.initEdit,
        [entry.max],
        classed)),
};