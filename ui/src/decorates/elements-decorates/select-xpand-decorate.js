const {it} = require('mocha');
const el = require('../../elements');
const dec = require('../../dictionaries/decorate');

module.exports = {
    xpand: ({timeout}) => it(`Отображения элемента списка.`,
        async () => await dec.simple(el.selectXpand.xpand,
            [timeout],
            el.selectXpand)),

    xpandNoElement: ({timeout}) => it(`Отсутствие элемента списка.`,
        async () => await dec.simple(el.selectXpand.xpandNoElement,
                [timeout],
            el.selectXpand)),

    handler: ({value, timeout}) => it(`Нажатие по элементу "${value}" списка.`,
        async () => await dec.simple(el.selectXpand.handler,
                [value, timeout],
            el.selectXpand)),

    scrollTop: ({value}) => it(`Скролл элементов списка.`,
        async () => await dec.simple(el.selectXpand.scrollTop,
                [value],
            el.selectXpand))
}

