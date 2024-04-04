const {it} = require('mocha');
const dec = require('../../dictionaries/decorate');
const entry = require('../../../../entry');

module.exports = (classed) => it('Проверка URL и TITLE', async () => await dec.simple(classed.init,
    [entry.max],
    classed));