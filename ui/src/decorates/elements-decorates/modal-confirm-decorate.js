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
                [name, timeout],
                modal));

    const buttonActive = (name, timeout) =>
        it(`Кнопка "${name}" активна в модальном окне "${modal.title ? modal.title : modal.body}".`,
            async () => await dec.simple(modal.buttonActive,
                [name, timeout],
                modal));

    const buttonDisabled = (name, timeout) =>
        it(`Кнопка "${name}" не активна в модальном окне "${modal.title ? modal.title : modal.body}".`,
            async () => await dec.simple(modal.buttonDisabled,
                [name, timeout],
                modal));

    const initLock = ({button, timeout}) => it(`Проверка отображение модального окна 
    "${modal.title ? modal.title : modal.body}" и нажатие кнопки "${button}".`, async () => {

        const init = await modal.init(timeout);
        if(init.error) {
            return {
                error: false,
                description: 'Модальное окно не отображается'
            }
        }

        return await dec.simple(modal.buttonHandler,
            [button, timeout],
            modal);
    });

    return {
        init,
        initClose,
        closeHandler,
        buttonHandler,
        buttonActive,
        buttonDisabled,
        initLock
    }
}

module.exports = ModalConfirmDecorate


