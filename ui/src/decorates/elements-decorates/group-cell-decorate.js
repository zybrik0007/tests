const {it} = require('mocha');
const el = require('../../elements');
const dec = require('../../dictionaries/decorate');

module.exports = {

    active: ({name, timeout}) => it(`Строка "${name}" активна.`,
        async () => await dec.simple(el.groupCell.active,
            [name, timeout],
            el.groupCell)),

    noActive: ({name, timeout}) => it(`Строка "${name}" не активна.`,
        async () => await dec.simple(el.groupCell.noActive,
            [name, timeout],
            el.groupCell)),

    handler: ({name, timeout}) => it(`Нажатие по строке "${name}".`,
        async () => await dec.simple(el.groupCell.handler,
            [name, timeout],
            el.groupCell)),
}
