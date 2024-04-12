const {it} = require('mocha');
const el = require('../../elements');
const dec = require('../../dictionaries/decorate');

module.exports = {
    init: ({timeout}) => it(`Отображение модального.`,
        async() => await dec.simple(el.modal.timeZoneModalSelect.init,
            [timeout],
            el.modal.timeZoneModalSelect)),

    initClose: ({timeout}) => it(`Отсутствие модального окна.`,
        async() => await dec.simple(el.modal.timeZoneModalSelect.initClose,
            [timeout],
            el.modal.timeZoneModalSelect)),

    intervalHandler: ({numInterval, timeout}) => it(`Нажатие по интервалу "${numInterval}".`,
        async() => await dec.simple(el.modal.timeZoneModalSelect.intervalHandler,
            [numInterval, timeout],
            el.modal.timeZoneModalSelect)),

    intervalActive: ({timeout}) => it(`Интервал выделен.`,
        async() => await dec.simple(el.modal.timeZoneModalSelect.intervalActive,
        [timeout],
        el.modal.timeZoneModalSelect)),

    noInterval: ({numInterval, timeout}) => it(`Отсутствие инетрвала "${numInterval}".`,
        async() => await dec.simple(el.modal.timeZoneModalSelect.noInterval,
            [numInterval, timeout],
            el.modal.timeZoneModalSelect)),
}





