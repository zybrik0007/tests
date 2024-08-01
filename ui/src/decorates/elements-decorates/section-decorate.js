const {it} = require('mocha');
const el = require('../../elements');
const dec = require('../../dictionaries/decorate');

module.exports = {
    section: ({section, timeout}) => it(`Отображение раздела "${section.description}".`,
        async () => await dec.simple(el.section.section,
            [section, timeout],
            el.section)),

    active: ({section, timeout}) => it(`Раздел "${section.description} активен".`,
        async () => await dec.simple(el.section.active,
            [section, timeout],
            el.section)),

    handler: ({section, timeout}) => it(`Нажатие по разделу "${section.description}".`,
        async () => await dec.simple(el.section.handler,
            [section, timeout],
            el.section)),

    noElement: ({section, timeout}) => it(`Отсутствие раздела "${section.description}".`,
        async () => await dec.simple(el.section.noElement,
            [section, timeout],
            el.section)),
}