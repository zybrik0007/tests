const {it} = require('mocha');
const el = require('../../elements');
const dec = require('../../dictionaries/decorate');

module.exports = {
    init: ({timeout}) => it(`Отображение модального "Импорт".`, async() => await dec.simple(el.modal.importData.init,
        [timeout],
        el.modal.importData)),

    initClose: ({timeout}) => it(`Отсутствие модального окна "Импорт".`,
        async() => await dec.simple(el.modal.importData.initClose,
            [timeout],
            el.modal.importData)),

    uploadFile: ({src, timout}) => it(`Ввод адреса файла импорта.`,
        async() => await dec.simple(el.modal.importData.sendKeys,
            [src, timout],
            el.modal.importData)),

    bodyGetText: ({value, timout}) => it(`В модальном окне отображается "${value}".`,
        async() => await dec.simpleText(el.modal.importData.bodyGetText,
            [timout],
            value,
            el.modal.importData)),

    scrollTop: ({number, timout}) => it(`Скролл модального окна "Импорт". на ${number}px.`,
        async() => await dec.simple(el.modal.importData.scrollTop,
            [number, timout],
            el.modal.importData)),

    iconXpand: ({title, value, text, timeout}) => it(`Нажатие по иконки xpand у выпадающего списка ${title} - ${value}
     и выбор значения "${text}" в списке.`,
        async() => await dec.simple(el.modal.importData.iconXpand,
            [title, value, text, timeout],
            el.modal.importData)),




}


