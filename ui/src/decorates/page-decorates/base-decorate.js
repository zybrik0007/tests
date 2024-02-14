const {it} = require('mocha');
const page = require('../../pages');
const dec = require('../../dictionaries/decorate');

module.exports = {
    loading: ({timeout}) => it(`Ожидание "${timeout}".`, async () => await dec.simple(page.base.loading,
        [timeout],
        page.base)),
}