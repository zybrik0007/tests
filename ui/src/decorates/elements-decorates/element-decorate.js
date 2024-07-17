const {it} = require('mocha');
const el = require('../../elements');
const dec = require('../../dictionaries/decorate');

module.exports = {
    textHandler: ({name, timeout}) => it(`Нажатие по тексту "${name}"`,
        async () => await dec.simple(el.element.textHandler,
            [name, timeout],
            el.element)),

    textDisplay: ({value, timeout}) => it(`Отображение текста "${value}"`,
        async () => await dec.simple(el.element.textDisplay,
            [value, timeout],
            el.element)),
}
