const {it} = require('mocha');
const el = require('../../elements');
const dec = require('../../dictionaries/decorate');

module.exports = {
    init: ({timeout}) => it(`Отображение модального "Помещение".`,
        async() => await dec.simple(el.modal.roomsFilter.init,
            [timeout],
            el.modal.roomsFilter)),

    initClose: ({timeout}) => it(`Отсутствие модального окна "Помещение".`,
        async() => await dec.simple(el.modal.roomsFilter.initClose,
            [timeout],
            el.modal.roomsFilter)),
}


