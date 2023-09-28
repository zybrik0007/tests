const {describe, it} = require('mocha');
const page = require('../../pages');

module.exports = () => describe('Закрытие бразуера.', () => {
    it('Закрытие бразуера.', async () => await page.base.closeDriver());
});