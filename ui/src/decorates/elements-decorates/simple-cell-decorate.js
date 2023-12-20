const {it} = require('mocha');
const el = require('../../elements');
const dec = require('../../dictionaries/decorate');

module.exports = {
    cell: ({name, timeout}) => it(`Отображение вкладки настроек "${name}".`,
        async () => await dec.simple(el.simpleCell.cell,
            [name, timeout],
            el.simpleCell)),

    active: ({name, timeout}) => it(`Вкладка настроек "${name}" активна.`,
        async () => await dec.simple(el.simpleCell.active,
            [name, timeout],
            el.simpleCell)),

    handler: ({name, timeout}) => it(`Нажатие по вкладки настроек "${name}".`,
        async () => await dec.simple(el.simpleCell.handler,
            [name, timeout],
            el.simpleCell)),
}


