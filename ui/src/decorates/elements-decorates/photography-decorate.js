const {it} = require('mocha');
const el = require('../../elements');
const dec = require('../../dictionaries/decorate');

module.exports = {
    addImage: ({name, timeout}) => it(`Нажатие кнопки "${name}".`,
        async () => await dec.simple(el.photography.addImage,
            [name, timeout],
            el.photography)),

    imageStaff: ({timeout}) => it(`Отображение тега img в карточки сотрудника.`,
        async () => await dec.simple(el.photography.imageStaff,
            [timeout],
            el.photography)),

    noImageStaff: ({timeout}) => it(`Отсутствие тега img в карточки сотрудника..`,
        async () => await dec.simple(el.photography.noImageStaff,
            [timeout],
            el.photography)),

    addImageAdditional: ({name, number, timeout}) => it(`Нажатие кнопки "${name}" в дополнительном поле по номеру
    ${number}.`,
        async () => await dec.simple(el.photography.addImageAdditional,
            [name, number, timeout],
            el.photography)),

    imageAdditional: ({number, timeout}) => it(`Отображение тега img в дполнительном поле по номеру ${number}.`,
        async () => await dec.simple(el.photography.imageAdditional,
            [number, timeout],
            el.photography)),

    noImageAdditional: ({number, timeout}) => it(`Отсутствие тега img в дполнительном поле по номеру ${number}.`,
        async () => await dec.simple(el.photography.noImageAdditional,
            [number, timeout],
            el.photography)),

    getAdditionalName: ({number, value, timeout}) => it(`Значения названия допонительного поля по номеру ${number} равно 
    "${value}".`,
        async () => await dec.simpleText(el.photography.getAdditionalName,
            [number, timeout],
            value,
            el.photography)),
}
