const {it} = require('mocha');
const page = require('../../pages');
const dec = require('../../dictionaries/decorate');

module.exports = {
    handler: ({num, timeout}) => it(`Нажатие по дизайну пропуска с порядковым номером "${num}".`,
        async () => await dec.simple(page.design.handler,
        [num, timeout],
            page.design)),

    size: ({size, timeout}) => it(`Количество дизайнов пропуска равно "${size}".`,
        async () => await dec.simple(page.design.size,
            [size, timeout],
            page.design)),

    name: ({num, value, timeout}) => it(`Наименования дизайна пропуска с порядковым номером ${num} равно "${value}".`,
        async () => await dec.simpleText(page.design.name,
            [num, timeout],
            value,
            page.design)),

    type: ({num, value, timeout}) => it(`Тип дизайна пропуска с порядковым номером ${num} равно "${value}".`,
        async () => await dec.simpleText(page.design.type,
            [num, timeout],
            value,
            page.design))
}