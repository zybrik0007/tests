const {it} = require('mocha');
const el = require('../../elements');
const dec = require('../../dictionaries/decorate');

module.exports = {
    timepicker: ({timeout}) => it(`Отображения ввода времени.`,
        async () => await dec.simple(el.timepicker.timepicker,
            [timeout],
            el.timepicker)),

    hourSendKeys: ({value, timeout}) => it(`Ввод "${value}" часов.`,
        async () => await dec.simple(el.timepicker.hourSenKeys,
            [value, timeout],
            el.timepicker)),

    minuteSendKeys: ({value, timeout}) => it(`Ввод "${value}" минут.`,
        async () => await dec.simple(el.timepicker.minuteSenKeys,
            [value, timeout],
            el.timepicker)),
}

