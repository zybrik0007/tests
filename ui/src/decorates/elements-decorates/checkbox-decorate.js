const {it} = require('mocha');
const el = require('../../elements');
const dec = require('../../dictionaries/decorate');

module.exports = {
    handler: ({name, timeout}) => it(`Нажатие по чекбоксу "${name}".`, async () => await dec.simple(el.checkbox.handler,
        [name, timeout],
        el.checkbox)),

    checked: ({name, timeout}) => it(`Чекбокс "${name}" нажат.`, async () => await dec.simple(el.checkbox.checked,
        [name, timeout],
        el.checkbox)),

    unchecked: ({name, timeout}) => it(`Чекбокс "${name}" не нажат.`, async () => await dec.simple(el.checkbox.checked,
        [name, timeout],
        el.checkbox)),
}
