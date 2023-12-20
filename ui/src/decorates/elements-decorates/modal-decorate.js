const {it} = require('mocha');
const el = require('../../elements');
const dec = require('../../dictionaries/decorate');
const modal = new(require('../../elements/elements/modal'))('export-data', 'Экспортировать данные');

//Модальное окно с id
module.exports =  {

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
}
