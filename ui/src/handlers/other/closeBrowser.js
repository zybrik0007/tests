const {describe, it} = require('mocha');
const page = require('../../pages');

module.exports = () => describe('�������� ��������.', () => {
    it('�������� ��������.', async () => await page.base.closeDriver());
});