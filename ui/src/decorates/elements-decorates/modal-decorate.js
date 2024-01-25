const {it} = require('mocha');
const el = require('../../elements');
const dec = require('../../dictionaries/decorate');
const modalClass = require('../../elements/elements/modal');

//Модальное окно с id
const ModalDecorate = (id, title) => {
    const modal = new modalClass(id, title);

    const init = async({timeout}) => it(`Отображение модального окна "${modal.title ? modal.title: modal.id}".`,
        async () => await dec.simple(modal.init,
            [timeout],
            modal));

    const initClose = ({timeout}) => it(`Отсутствие модального окна "${modal.title ? modal.title: modal.id}".`,
        async () => await dec.simple(modal.initClose,
            [timeout],
            modal));

    const closeHandler = ({timeout}) => it(`Нажатие кнопки закрытия модального окна "${modal.title ? modal.title: modal.id}".`,
        async () => await dec.simple(modal.closeHandler,
            [timeout],
            modal));

    const close = ({timeout}) => it(`Отображение кнопки закрытия модального окна "${modal.title ? modal.title: modal.id}".`,
        async () => await dec.simple(modal.close,
            [timeout],
            modal));

    const buttonHandler = ({name, timeout}) =>
        it(`Нажатие кнопки "${name}" в модальном окне "${modal.title ? modal.title: modal.id}".`,
            async () => await dec.simple(modal.buttonHandler,
                [timeout],
                modal));

    const buttonActive = ({name, timeout}) =>
        it(`Кнопка "${name}" активна в модальном окне "${modal.title ? modal.title: modal.id}".`,
            async () => await dec.simple(modal.buttonActive,
                [name, timeout],
                modal));

    const buttonDisabled = ({name, timeout}) =>
        it(`Кнопка "${name}" не активна в модальном окне "${modal.title ? modal.title: modal.id}".`,
            async () => await dec.simple(modal.buttonActive,
                [name, timeout],
                modal));

    const inputSendKeys = ({title, placeholder, value, timeout}) =>
        it(`Ввод значения ${value} в поле ввода ${title ? title : placeholder} 
        в модальном окне "${modal.title ? modal.title: modal.id}".`,
            async () => await dec.simple(modal.inputSendKeys,
                [title, placeholder, value, timeout],
                modal));

    const inputGetValue =  ({title, placeholder, value, timeout}) =>
        it(`В поле ввода ${title ? title : placeholder} в модальном окне "${modal.title ? modal.title: modal.id}" отображается ${value}`,
            async () => await dec.simpleText(modal.inputGetValue,
                [title, placeholder, timeout],
                value,
                modal));

    const inputBackSpace = ({title, placeholder, timeout}) =>
        it(`Удаление значения в поле ввода ${title ? title : placeholder} в модальном окне "${modal.title ? modal.title: modal.id}".`,
            async () => await dec.simple(modal.inputBackSpace,
                [title, placeholder, timeout],
                modal));

    return {
        init,
        initClose,
        closeHandler,
        close,
        buttonHandler,
        buttonActive,
        buttonDisabled,
        inputSendKeys,
        inputGetValue,
        inputBackSpace
    }
}

module.exports = ModalDecorate;



/*module.exports =  {

    init: ({timeout}) => it(`Отображение модального окна 'Экспортировать данные'.`,
        async () => await dec.simple(modal.init,
            [timeout],
            modal)),

    initClose: ({timeout}) => it(`Отсутствие модального окна 'Экспортировать данные'.`,
        async () => await dec.simple(modal.initClose,
            [timeout],
            modal)),

    closeHandler: ({timeout}) => it(`Нажатие кнопки закрытия модального окна 'Экспортировать данные'.`,
        async () => await dec.simple(modal.closeHandler,
            [timeout],
            modal)),

    close: ({timeout}) => it(`Отображение кнопки закрытия модального окна 'Экспортировать данные'.`,
        async () => await dec.simple(modal.close,
            [timeout],
            modal)),

    buttonHandler: ({button, timeout}) =>
        it(`Нажатие кнопки ${button} в модальном окне 'Экспортировать данные'.`,
            async () => await dec.simple(modal.buttonHandler,
                [button, timeout],
                modal)),

    buttonActive: ({button, timeout}) =>
        it(`Кнопка ${button} в модальном окне 'Экспортировать данные' активна.`,
            async () => await dec.simple(modal.buttonActive,
                [button, timeout],
                modal)),

    buttonDisabled: ({button, timeout}) =>
        it(`Кнопка ${button} в модальном окне 'Экспортировать данные' не активна.`,
            async () => await dec.simple(modal.buttonDisabled,
                [button, timeout],
                modal)),

    inputSendKeys: ({title, placeholder, value, timeout}) =>
        it(`Ввод значения ${value} в поле ввода ${title ? title : placeholder} 
        в модальном окне 'Экспортировать данные'.`,
            async () => await dec.simple(modal.inputSendKeys,
                [title, placeholder, value, timeout],
                modal)),

    inputGetValue: ({title, placeholder, value, timeout}) =>
        it(`В поле ввода ${title ? title : placeholder} в модальном окне 'Экспортировать данные' отображается ${value}`,
            async () => await dec.simpleText(modal.inputGetValue,
                [title, placeholder, timeout],
                value,
                modal)),

    inputBackSpace: ({title, placeholder, timeout}) =>
        it(`Удаление значения в поле ввода ${title ? title : placeholder} в модальном окне 'Экспортировать данные'.`,
            async () => await dec.simple(modal.inputBackSpace,
                [title, placeholder, timeout],
                modal))
}*/
