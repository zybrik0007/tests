const {it} = require('mocha');
const el = require('../../elements');
const dec = require('../../dictionaries/decorate');


module.exports = {
    getText: ({text, timeout}) => it(`Значения текста по умолчанию - "${text}".`,
        async () => await dec.simpleText(el.placeText.getText,
            [timeout],
            text,
            el.placeText)),
}

