const {it} = require('mocha');
const el = require('../../elements');
const dec = require('../../dictionaries/decorate');

module.exports = {
    handler: ({value, timeout}) => it(`Нажатие по меню "${value}".`, async () => await dec.simple(el.pwMenu.handler,
        [value, timeout],
        el.pwMenu)),

    active: ({value, timeout}) => it(`Значение меню "${value}" активно.`, async () => await dec.simple(el.pwMenu.active,
        [value, timeout],
        el.pwMenu)),
}