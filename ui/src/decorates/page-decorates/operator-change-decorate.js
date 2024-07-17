const {it} = require('mocha');
const page = require('../../pages');
const dec = require('../../dictionaries/decorate');

module.exports = {
    hideShow: ({section, timeout}) => it(`Нажатие показать / скрыть пдразделы в разделе "${section}".`,
        async () => await dec.simple(page.operatorChange.hideShow,
        [section, timeout],
            page.operatorChange)),

    sectionCheckboxHandler: ({section, timeout}) => it(`Нажатие по чекбоксу раздела "${section}".`,
        async () => await dec.simple(page.operatorChange.sectionCheckboxHandler,
            [section, timeout],
            page.operatorChange)),

    sectionChecked: ({section, timeout}) => it(`Чекбокс раздела "${section}" нажат.`,
        async () => await dec.simple(page.operatorChange.sectionChecked,
            [section, timeout],
            page.operatorChange)),

    sectionUnchecked: ({section, timeout}) => it(`Чекбокс раздела "${section}" не нажат.`,
        async () => await dec.simple(page.operatorChange.sectionUnchecked,
            [section, timeout],
            page.operatorChange)),

    subsectionCheckboxHandler: ({section, subsection, timeout}) =>
        it(`Нажатие по чекбоксу подраздела "${subsection}" в разделе "${section}".`,
            async () => await dec.simple(page.operatorChange.subsectionCheckboxHandler,
                [section, subsection, timeout],
                page.operatorChange)),

    subsectionChecked: ({section, subsection, timeout}) =>
        it(`Чекбокс пораздела "${subsection}" в разделе "${section}" нажат.`,
            async () => await dec.simple(page.operatorChange.subsectionChecked,
                [section, subsection, timeout],
                page.operatorChange)),

    subsectionUnchecked: ({section, subsection, timeout}) =>
        it(`Чекбокс пораздела "${subsection}" в разделе "${section}" не нажат.`,
            async () => await dec.simple(page.operatorChange.subsectionUnchecked,
                [section, subsection, timeout],
                page.operatorChange)),
}