const {it} = require('mocha');
const el = require('../../elements');
const dec = require('../../dictionaries/decorate');

module.exports = {
    init: ({timeout}) => it(`Отображение модального "Задолженности".`,
        async () => await dec.simple(el.modal.underTime.init,
            [timeout],
            el.modal.underTime)),

    initClose: ({timeout}) => it(`Отсутствие модального окна "Задолженности".`,
        async () => await dec.simple(el.modal.underTime.initClose,
            [timeout],
            el.modal.underTime)),

    checkboxHandler: ({strNumber, timeout}) => it(`Нажатие по чекбоксу в строке с номером "${strNumber}" 
    в таблице оправдательных документов.`,
        async () => await dec.simple(el.modal.underTime.checkboxHandler,
            [strNumber, timeout],
            el.modal.underTime)),
}
