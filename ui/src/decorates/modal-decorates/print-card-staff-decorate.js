const {it} = require('mocha');
const el = require('../../elements');
const dec = require('../../dictionaries/decorate');

module.exports = {
    init: ({timeout}) => it(`Отображение модального "Печать карточки сотрудника".`,
        async() => await dec.simple(el.modal.printCard.init,
            [timeout],
            el.modal.printCard)),

    initClose: ({timeout}) => it(`Отсутствие модального окна "Печать карточки сотрудника".`,
        async() => await dec.simple(el.modal.printCard.initClose,
            [timeout],
            el.modal.printCard)),

    closeHandler: ({timeout}) => it(`Нажатие кнопки закрытия модального окна "Печать карточки сотрудника".`,
        async() => await dec.simple(el.modal.printCard.closeHandler,
            [timeout],
            el.modal.printCard)),

    lastName: ({title, name, timeout}) => it(`Отображение ${title}: ${name} в модальном окне "Печать карточки сотрудника".`,
        async() => await dec.simple(el.modal.printCard.lastName,
            [title, name, timeout],
            el.modal.printCard)),

    noLastName: ({title, name, timeout}) => it(`Отсутствие ${title}: ${name} в модальном окне "Печать карточки сотрудника".`,
        async() => await dec.simple(el.modal.printCard.noLastName,
            [title, name, timeout],
            el.modal.printCard)),

}


