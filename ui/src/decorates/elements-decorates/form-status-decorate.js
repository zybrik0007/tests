const {it} = require('mocha');
const el = require('../../elements');
const dec = require('../../dictionaries/decorate');


module.exports = {
    getText: ({value, timeout}) => it(`Статус форма равен - ${value}.`,
        async () => await dec.simpleText(el.formStatus.getText,
            [timeout],
            value,
            el.formStatus)),
}
