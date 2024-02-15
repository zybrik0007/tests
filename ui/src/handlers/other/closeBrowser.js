const {describe, it} = require('mocha');
const page = require('../../pages');
const dec = require('../../dictionaries/decorate');
const decorate = require('../../decorates');
const db = require('../../database');

module.exports = () => describe('Закрытие бразуера.', () => {
    decorate.page.base.loading({
        timeout: 5000
    });
    it('Закрытие', async () => await dec.simple(page.base.closeDriver,
        [],
        page.base));
    it('Закрытие соединения с БД', async () => await dec.simple(db.quitDb,
        [],
        db.quitDb));
});