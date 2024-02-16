const {describe, it} = require('mocha');
const page = require('../../pages');
const dec = require('../../dictionaries/decorate');

module.exports = {
    loading: ({timeout}) => it(`Ожидание "${timeout}".`, async () => await dec.simple(page.base.loading,
        [timeout],
        page.base)),

    loadingTest: () => describe(`Межтестовое ожидание.`,  () => {
        it(`Ожидание "1 минута".`, async () => await dec.simple(page.base.loading,
            [60000],
            page.base));
    }),
}