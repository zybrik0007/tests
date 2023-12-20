const {it} = require('mocha');
const el = require('../../elements');
const dec = require('../../dictionaries/decorate');



module.exports = {
    handler: ({icon, timeout}) => it(`Нажатие кнопки "${icon.description}".`,
        async () => await dec.simple(el.butIc.handler,
            [icon, timeout],
            el.butIc)),

    button: ({icon, timeout}) => it(`Отображение кнопки "${icon.description}".`,
        async () => await  dec.simple(el.butIc.button,
            [icon, timeout],
            el.butIc)),
}


