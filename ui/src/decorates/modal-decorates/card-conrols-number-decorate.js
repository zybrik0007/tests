const {it} = require('mocha');
const el = require('../../elements');
const dec = require('../../dictionaries/decorate');

module.exports = {
    init: ({timeout}) => it(`Отображение модального "Выдать карту".`,
        async() => await dec.simple(el.modal.cardControlsNumber.init,
            [timeout],
            el.modal.cardControlsNumber)),

    initClose: ({timeout}) => it(`Отсутствие модального окна "Выдать карту".`,
        async() => await dec.simple(el.modal.cardControlsNumber.initClose,
            [timeout],
            el.modal.cardControlsNumber)),

    inputSendKeys: ({title, placeholder, value, timeout}) => it(`Ввод значение "${value}" в поле ввода "${title}" модального окна 
    "Выдать карту".`,
        async() => await dec.simple(el.modal.cardControlsNumber.inputSendKeys,
            [title, placeholder, value, timeout],
            el.modal.cardControlsNumber)),

    buttonHandler: ({name, timeout}) => it(`Нажатие кнопки "${name}" в модальном окне 
    "Выдать карту".`,
        async() => await dec.simple(el.modal.cardControlsNumber.buttonHandler,
            [name, timeout],
            el.modal.cardControlsNumber)),
}


