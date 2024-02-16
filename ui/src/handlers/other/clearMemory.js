const {describe, it} = require('mocha');
const page = require('../../pages');
const dec = require('../../dictionaries/decorate');
const decorate = require('../../decorates');
const db = require('../../database');
const entry = require('../../../../entry');

module.exports = () => describe('Удаление Кэш', () => {

    if(entry.browser === 'chrome') {
        it('Открытие в "Очистить историю"', async () => dec.simple(page.base.open,
            ['chrome://settings/clearBrowserData'],
            page.base));

        decorate.page.base.loading({
            timeout: 5000
        });

        it('Нажатие ТАB', async () => await dec.simple(page.base.xpathTabHandler,
            ['//settings-ui', 'Отображение эелемента "//settings-ui"', entry.max],
            page.base));

        decorate.page.base.loading({
            timeout: 5000
        });

        it('Нажатие ENTER', async () => await dec.simple(page.base.xpathEnterHandler,
            ['//settings-ui', 'Отображение эелемента "//settings-ui"', entry.max],
            page.base));

        decorate.page.base.loading({
            timeout: 30000
        });
    }
});