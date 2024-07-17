const {it} = require('mocha');
const el = require('../../elements');
const dec = require('../../dictionaries/decorate');

module.exports = {
    error: ({text, timeout}) => it(`Отображение элемента ошибки с текстом "${text}".`,
        async () => await dec.simple(el.error.error,
            [text, timeout],
            el.error)),

    errorNoList: ({timeout}) => it(`Отсутствие эелементов ошибок.`,
        async () => await dec.simple(el.error.errorNoList,
            [timeout],
            el.error)),

    closeHandler: ({text, timeout}) => it(`Нажатие кнопки закрытия ошибки ${text}.`,
        async () => await dec.simple(el.error.closeHandler,
            [text, timeout],
            el.error)),

    checkError: ({timeout}) => it('Проверка наличия ошибки', async () =>
        await dec.simpleText(el.error.checkError,
            [timeout],
            '',
            el.error)),

}