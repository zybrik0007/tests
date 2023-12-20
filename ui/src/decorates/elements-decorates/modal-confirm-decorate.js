const {it} = require('mocha');
const el = require('../../elements');
const dec = require('../../dictionaries/decorate');
const modalConfirm = require('../../elements/elements/modal-confirm')

class ModalConfirmDecorate extends modalConfirm {

    constructor(title, body) {
        super(title, body);
        this.title = title
        this.body = body
    }

    init = (timeout) => it(`Отображение модального окна "${this.title ? this.title : this.body}".`,
        async () => await dec.simple(super.init,
            [timeout],
            super.init));

    initClose = (timeout) => it(`Отсутствие модального окна "${this.title ? this.title : this.body}".`,
        async () => await dec.simple(super.initClose,
            [timeout],
            super.initClose));

    closeHandler = (timeout) => it(`Нажатие кнопки закрытия модального окна "${this.title ? this.title : this.body}".`,
        async () => await dec.simple(super.closeHandler,
            [timeout],
            super.closeHandler));

    close = (timeout) => it(`Отображение кнопки закрытия модального окна "${this.title ? this.title : this.body}".`,
        async () => await dec.simple(super.close,
            [timeout],
            super.close));

    buttonHandler = (name, timeout) =>
        it(`Нажатие кнопки "${name}" в модальном окне "${this.title ? this.title : this.body}".`,
            async () => await dec.simple(super.buttonHandler,
                [timeout],
                super.buttonHandler));

    buttonActive = (name, timeout) =>
        it(`Кнопка "${name}" активна в модальном окне "${this.title ? this.title : this.body}".`,
            async () => await dec.simple(super.buttonActive,
                [name, timeout],
                super.buttonActive));

    buttonDisabled = (name, timeout) =>
        it(`Кнопка "${name}" не активна в модальном окне "${this.title ? this.title : this.body}".`,
            async () => await dec.simple(super.buttonActive,
                [name, timeout],
                super.buttonDisabled));
}

module.exports = ModalConfirmDecorate


