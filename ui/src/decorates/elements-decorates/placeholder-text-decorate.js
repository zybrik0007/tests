const {it} = require('mocha');
const el = require('../../elements');
const dec = require('../../dictionaries/decorate');


module.exports = {
    getText: ({text, timeout}) => it(`Получение значения текста в заглавии.`,
        async () => await dec.simpleText(el.placeText.getText,
            [timeout],
            text,
            el.placeText)),
}

