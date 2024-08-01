const {it} = require('mocha');
const page = require('../../pages');
const dec = require('../../dictionaries/decorate');

module.exports = {
    headerText: ({number, value, timeout}) =>
        it(`Значение заглавия у лицензии с порядковым номер ${number} равно "${value}".`,
            async () => await dec.simpleText(page.license.headerText,
                [number, timeout],
                value,
                page.license)),

    contentText: ({number, value, timeout}) =>
        it(`Значение пользовательского описания у лицензии с порядковым номер ${number} равно "${value}".`,
            async () => await dec.simpleText(page.license.contentText,
                [number, timeout],
                value,
                page.license)),

    checkedText: ({number, value, timeout}) =>
        it(`Значение проверки у лицензии с порядковым номер ${number} равно "${value}".`,
            async () => await dec.simple(page.license.checkedText,
                [number, value, timeout],
                page.license)),

    uncheckedText: ({number, timeout}) => it(`Отсустствия значения проверки лицензии с порядковым номером ${number}.`,
            async () => await dec.simple(page.license.uncheckedText,
                [number, timeout],
                page.license)),

    detailHandler: ({number, timeout}) => it(`Нажатия "Подробнее" у лицензии с порядковым номером ${number}.`,
        async () => await dec.simple(page.license.detailHandler,
            [number, timeout],
            page.license)),

    enterKeyTextHandler: ({number, timeout}) =>
        it(`Нажатия "Ввести лицензионный ключ" у лицензии с порядковым номером ${number}.`,
            async () => await dec.simple(page.license.enterKeyTextHandler,
            [number, timeout],
            page.license)),

    turnHandler: ({number, timeout}) =>
        it(`Нажатие включение / выключение лицензии с порядковым номером ${number}.`,
            async () => await dec.simple(page.license.turnHandler,
                [number, timeout],
                page.license)),

    viewText: ({value, timeout}) =>
        it(`Проверка полного описания лицензии.`,
            async () => await dec.simpleText(page.license.viewText,
                [timeout],
                value,
                page.license)),
}