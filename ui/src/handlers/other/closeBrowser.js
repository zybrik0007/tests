const {describe, it} = require('mocha');
const page = require('../../pages');
const dec = require('../../dictionaries/decorate');

module.exports = () => describe('Закрытие бразуера.', () => {
    it('Закрытие', async () => await dec.simple(page.base.closeDriver,
        [],
        page.base));
});