const {it} = require('mocha');
const el = require('../../elements');
const dec = require('../../dictionaries/decorate');



module.exports = {
    handler: ({icon, timeout}) => it(`Нажатие кнопки "${icon.description}".`,
        async () => await dec.simple(el.butIcBefore.handler,
            [icon, timeout],
            el.butIcBefore)),

    button: ({icon, timeout}) => it(`Отображение кнопки "${icon.description}".`,
        async () => await  dec.simple(el.butIcBefore.button,
            [icon, timeout],
            el.butIcBefore)),

    active: ({icon, timeout}) => it(`Отображение активной кнопки "${icon.description}".`,
        async () => await dec.simple(el.butIcBefore.active,
            [icon, timeout],
            el.butIcBefore)),

    disabled: ({icon, timeout}) => it(`Отображение заблокированной кнопки "${icon.description}"`,
        async () => await dec.simple(el.butIcBefore.disabled,
            [icon, timeout],
            el.butIcBefore))
}