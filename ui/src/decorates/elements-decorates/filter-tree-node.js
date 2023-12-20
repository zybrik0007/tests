const {it} = require('mocha');
const el = require('../../elements');
const dec = require('../../dictionaries/decorate');

module.exports = {
    handler: ({name, timeout}) => it(`Нажатие строки "${name}".`,
        async () => await dec.simple(el.filterTreeNode.handler,
            [name, timeout],
            el.filterTreeNode)),
}
