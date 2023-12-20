const {it} = require('mocha');
const el = require('../../elements');
const dec = require('../../dictionaries/decorate');

module.exports = {
    init: ({timeout}) => it(`Отображение модального "Подразделение".`,
        async() => await dec.simple(el.modal.divisionFilter.init,
            [timeout],
            el.modal.divisionFilter)),

    initClose: ({timeout}) => it(`Отсутствие модального окна "Подразделение".`,
        async() => await dec.simple(el.modal.divisionFilter.initClose,
            [timeout],
            el.modal.divisionFilter)),
}


