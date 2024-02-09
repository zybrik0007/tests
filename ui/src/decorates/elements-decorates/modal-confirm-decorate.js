const {it} = require('mocha');
const el = require('../../elements');
const dec = require('../../dictionaries/decorate');
const modalConfirm = require('../../elements/elements/modal-confirm');

const ModalConfirmDecorate = (title, body) => {

    const modal = new modalConfirm(title, body);

    const init = ({timeout}) => it(`Отображение модального окна "${modal.title ? modal.title : modal.body}".`,
        async () => await dec.simple(modal.init,
            [timeout],
            modal));

    const initClose = ({timeout}) => it(`Отсутствие модального окна "${modal.title ? modal.title : modal.body}".`,
        async () => await dec.simple(modal.initClose,
            [timeout],
            modal));

    const closeHandler = ({timeout}) => it(`Нажатие кнопки закрытия модального окна "${modal.title ? modal.title : modal.body}".`,
        async () => await dec.simple(modal.closeHandler,
            [timeout],
            modal));

    const close = (timeout) => it(`Отображение кнопки закрытия модального окна "${modal.title ? modal.title : modal.body}".`,
        async () => await dec.simple(modal.close,
            [timeout],
            modal));

    const buttonHandler = (name, timeout) =>
        it(`Нажатие кнопки "${name}" в модальном окне "${modal.title ? modal.title : modal.body}".`,
            async () => await dec.simple(modal.buttonHandler,
                [timeout],
                modal));

    const buttonActive = (name, timeout) =>
        it(`Кнопка "${name}" активна в модальном окне "${modal.title ? modal.title : modal.body}".`,
            async () => await dec.simple(modal.buttonActive,
                [name, timeout],
                modal));

    const buttonDisabled = (name, timeout) =>
        it(`Кнопка "${name}" не активна в модальном окне "${modal.title ? modal.title : modal.body}".`,
            async () => await dec.simple(modal.buttonActive,
                [name, timeout],
                modal));

    return {
        init,
        initClose,
        closeHandler,
        buttonHandler,
        buttonActive,
        buttonDisabled
    }
}

module.exports = ModalConfirmDecorate


