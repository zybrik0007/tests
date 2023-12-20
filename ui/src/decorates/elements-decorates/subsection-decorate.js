const {it} = require('mocha');
const el = require('../../elements');
const dec = require('../../dictionaries/decorate');

module.exports = {
    subsection: ({subsection, timeout}) => it(`Отображение подраздела "${subsection.description}".`,
        async () => await dec.simple(el.subsection.subsection,
            [subsection, timeout],
            el.subsection)),

    active: ({subsection, timeout}) => it(`Подраздел "${subsection.description}" активен.`,
        async () => await dec.simple(el.subsection.active,
            [subsection, timeout],
            el.subsection)),

    handler: ({subsection, timeout}) => it(`Нажатие подраздела "${subsection.description}".`,
        async () => await dec.simple(el.subsection.handler,
            [subsection, timeout],
            el.subsection)),

    noElement: ({subsection, timeout}) => it(`Отсутствие подраздела "${subsection.description}".`,
        async () => await dec.simple(el.subsection.noElement,
            [subsection, timeout],
            el.subsection)),

    headerGetText: ({value, timeout}) => it(`В заглавии навигации - "${value}".`,
        async () => await dec.simpleText(el.subsection.headerGetText,
            [timeout],
            value,
            el.subsection)),
}

