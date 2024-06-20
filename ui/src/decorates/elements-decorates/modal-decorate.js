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
                [name, timeout],
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

    const handler = ({text, classed, timeout}) =>
        it(`Нажатие по "${text}" в модальном окне "${modal.title ? modal.title: modal.id}".`,
            async () => await dec.simple(modal.handler,
                [text, classed, timeout],
                modal));

    const getTextTag = ({tag, text, timeout}) =>
        it(`Отображение текста "${text}" в модальном окне "${this.title ? this.title : 'c id ' + this.id}".`,
            async () => await dec.simpleText(modal.getTextTag,
                [tag, timeout],
                text,
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
        inputBackSpace,
        handler,
        getTextTag
    }
}

module.exports = ModalDecorate;

