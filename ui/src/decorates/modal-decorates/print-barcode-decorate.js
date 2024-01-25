const {it} = require('mocha');
const el = require('../../elements');
const dec = require('../../dictionaries/decorate');
const ModalDecorate = require('../elements-decorates/modal-decorate')('barcode-print', 'Печать штрихкода');



module.exports = {
    ...ModalDecorate,

    data: ({title, value, number, timeout}) => it(`Отображение "${value}" в "${title}" в модальное окне 
    "Печать штрихкода".`, async() => await dec.simpleText(el.modal.barcodePrint.data,
        [title, number, timeout],
        value,
        el.modal.barcodePrint)),
}