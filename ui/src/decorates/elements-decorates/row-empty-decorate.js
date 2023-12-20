const {it} = require('mocha');
const el = require('../../elements');
const dec = require('../../dictionaries/decorate');

module.exports = {
    getText: ({value, timeout}) => it(`Значения текста при отсутствии данных - ${value}.`,
        async () => await dec.simpleText(el.rowEmpty.getText,
            [timeout],
            value,
            el.rowEmpty)),
}
