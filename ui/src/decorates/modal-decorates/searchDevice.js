const {it} = require('mocha');
const el = require('../../elements');
const dec = require('../../dictionaries/decorate');

module.exports = {
    init: ({timeout}) => it(`Отображение модального "Поиск устройств".`,
        async() => await dec.simple(el.modal.deviceSearch.init,
            [timeout],
            el.modal.deviceSearch)),

    initClose: ({timeout}) => it(`Отсутствие модального "Поиск устройств".`,
        async() => await dec.simple(el.modal.deviceSearch.initClose,
            [timeout],
            el.modal.deviceSearch)),

    closeHandler: ({timeout}) => it(`Нажатие кнопки закрытия модального окна.`,
        async() => await dec.simple(el.modal.deviceSearch.closeHandler,
            [timeout],
            el.modal.deviceSearch)),

    deviceHandler: ({ip, timeout}) => it(`Нажатие по устройству с ip ${ip}.`,
        async() => await dec.simple(el.modal.deviceSearch.deviceHandler,
            [ip, timeout],
            el.modal.deviceSearch)),
}


