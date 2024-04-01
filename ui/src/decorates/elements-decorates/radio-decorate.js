const {it} = require('mocha');
const el = require('../../elements');
const dec = require('../../dictionaries/decorate');

module.exports = {
    handler: ({name, timeout}) => it(`Нажатие кнопки "${name}".`, async () => await dec.simple(el.radio.handler,
        [name, timeout],
        el.radio)),
}
