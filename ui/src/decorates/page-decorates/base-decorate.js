const {describe, it} = require('mocha');
const page = require('../../pages');
const dec = require('../../dictionaries/decorate');
const entry = require('../../../../entry');

module.exports = {
    loading: ({timeout}) => it(`Ожидание "${timeout}".`, async () => await dec.simple(page.base.loading,
        [timeout],
        page.base)),

    loadingTest: () => describe(`Межтестовое ожидание.`,  () => {
        it('Обновление страницы', async () => await dec.simple(page.base.refresh,
            [],
            page.base));

        it(`Ожидание "50 секунд".`, async () => await dec.simple(page.base.loading,
            [50000],
            page.base));

        it('Отсутствие анимаций', async () => await dec.animation());
    }),

    refresh: () => it('Обновление страницы', async () => await dec.simple(page.base.refresh,
    [],
    page.base)),

    enter: () => it('Нажатие ENTER', async () => await dec.simple(page.base.enter,
        [],
        page.base)),

    open: ({url}) => it(`Открытие "${url}"`, async () => await dec.simple(page.base.open,
        [url],
        page.base)),

    openAfter: ({url}) => it(`Открытие "${url}"`, async () => await dec.simple(page.base.openAfter,
        [url],
        page.base)),

    acceptAlert: () => it('alert', () => async () => await dec.simple(page.base.acceptAlert,
        [],
        page.base)),

    animation: () => it('Отсустствие лоудера', () => async () => await dec.animation()),

    keyButton: ({button}) => it(`Нажатие кнопки "${button}".`, async () => await dec.simple(page.base.keyButton,
        [button],
        page.base)),
}