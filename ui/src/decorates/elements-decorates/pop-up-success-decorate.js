const {it} = require('mocha');
const el = require('../../elements');
const dec = require('../../dictionaries/decorate');

module.exports = {
    success: ({text, timeout}) => it(`Отображение сообщения с текстом "${text}".`,
        async () => await dec.simple(el.success.success,
            [text, timeout],
            el.success)),

    successNoList: ({timeout}) => it(`Отсутствие эелементов сообщений.`,
        async () => await dec.simple(el.success.successNoList,
            [timeout],
            el.success)),
}
