const {it} = require('mocha');
const el = require('../../elements');
const dec = require('../../dictionaries/decorate');

module.exports = {
    error: ({tab, timeout}) => it(`Вкладка "${tab}".`,
        async () => await dec.simple(el.tab.tab,
            [tab, timeout],
            el.tab)),

    active: ({tab, timeout}) => it(`Вкладка "${tab}" активна.`,
        async () => await dec.simple(el.tab.active,
            [tab, timeout],
            el.tab)),

    handler: ({tab, timeout}) => it(`Нажатие по вкладке "${tab}".`,
        async () => await dec.simple(el.tab.handler,
            [tab, timeout],
            el.tab)),
}

