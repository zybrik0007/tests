const {it} = require('mocha');
const el = require('../../elements');
const dec = require('../../dictionaries/decorate');

module.exports = {
    handler: ({name, timeout}) => it(`Нажатие кнопки "${name}".`, async () => await dec.simple(el.button.handler,
        [name, timeout],
        el.button)),

    button: ({name, timeout}) => it(`Отображение кнопки "${name}".`, async () => await dec.simple(el.button.button,
        [name, timeout],
        el.button)),

    active: ({name, timeout}) => it(`Отображение активной кнопки "${name}".`,
        async () => await dec.simple(el.button.active,
            [name, timeout],
            el.button)),

    disabled: ({name, timeout}) => it(`Отображение заблокированной кнопки "${name}".`,
        async () => await dec.simple(el.button.disabled,
            [name, timeout],
            el.button)),

    handlerNoActive: ({name, timeout}) => it(`Отображение заблокированной кнопки "${name}".`,
        async () => await dec.simple(el.button.handlerNoActive,
            [name, timeout],
            el.button)),
}
