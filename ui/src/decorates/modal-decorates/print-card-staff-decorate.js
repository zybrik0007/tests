const {it} = require('mocha');
const el = require('../../elements');
const dec = require('../../dictionaries/decorate');
const ModalDecorate = require('../elements-decorates/modal-decorate')('print-card', 'Печать карточки сотрудника');



module.exports = {
    ...ModalDecorate,

    lastName: ({title, name, timeout}) => it(`Отображение ${title}: ${name} в модальном окне "Печать карточки сотрудника".`,
        async() => await dec.simple(el.modal.printCard.lastName,
            [title, name, timeout],
            el.modal.printCard)),

    noLastName: ({title, name, timeout}) => it(`Отсутствие ${title}: ${name} в модальном окне "Печать карточки сотрудника".`,
        async() => await dec.simple(el.modal.printCard.noLastName,
            [title, name, timeout],
            el.modal.printCard)),
}


