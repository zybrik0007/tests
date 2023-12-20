const {it} = require('mocha');
const el = require('../../elements');
const dec = require('../../dictionaries/decorate');


module.exports = {
    menu: ({timeout}) => it(`Отображение меню.`, async () => await dec.simple(el.menu.menu,
        [timeout],
        el.menu)),

    closed: ({timeout}) => it(`Отсутствие меню.`, async () => await dec.simple(el.menu.closed,
        [timeout],
        el.menu)),

    itemActive: ({name, timeout}) => it(`Отображение активного параметра "${name}" в меню.`,
        async () => await dec.simple(el.menu.itemActive,
            [name, timeout],
            el.menu)),

    itemDisabled: ({name, timeout}) => it(`Отображение заблокированного параметра "${name}" в меню.`,
        async () => await dec.simple(el.menu.itemDisabled,
            [name, timeout],
            el.menu)),

    handler: ({name, timeout}) => it(`Нажатие по параметру "${name}" в меню.`,
        async () => await dec.simple(el.menu.handler,
            [name, timeout],
            el.menu)),
}
