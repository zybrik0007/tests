const {it} = require('mocha');
const el = require('../../elements');
const dec = require('../../dictionaries/decorate');

module.exports = {
    handler: ({name, timeout}) => it(`Нажатие по чекбоксу "${name}".`,
        async () => await dec.simple(el.nodeCheckbox.handler,
            [name, timeout],
            el.nodeCheckbox)),

    checked: ({name, timeout}) => it(`Чекбокс "${name}" нажат.`,
        async () => await dec.simple(el.nodeCheckbox.checked,
            [name, timeout],
            el.nodeCheckbox)),

    unchecked: ({name, timeout}) => it(`Чекбокс "${name}" не нажат.`,
        async () => await dec.simple(el.nodeCheckbox.unchecked,
            [name, timeout],
            el.nodeCheckbox)),
}
