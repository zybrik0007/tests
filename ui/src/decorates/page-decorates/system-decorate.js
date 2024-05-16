const {it} = require('mocha');
const page = require('../../pages');
const dec = require('../../dictionaries/decorate');

module.exports = {
    getVersion: ({value, timeout}) => it(`Значение Версия сборки равно "${value}".`,
        async () => await dec.simpleText(page.system.getVersion,
            [timeout],
            value,
            page.system)),

    getNumber: ({value, timeout}) => it(`Значение Номера сборки равно "${value}".`,
        async () => await dec.simpleText(page.system.getNumber,
            [timeout],
            value,
            page.system)),
}