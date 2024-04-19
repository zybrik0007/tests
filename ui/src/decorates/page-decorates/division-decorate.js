const {it} = require('mocha');
const page = require('../../pages');
const dec = require('../../dictionaries/decorate');

module.exports = {
    division: ({arr, timeout}) => it(`Отображение подразделения "${arr[arr.length - 1]}".`,
        async () => await dec.simple(page.division.division,
            [arr, timeout],
            page.division)),

    handler: ({arr, timeout}) => it(`Нажатие по подразделению "${arr[arr.length - 1]}".`,
        async () => await dec.simple(page.division.handler,
            [arr, timeout],
            page.division)),

    selected: ({division, timeout}) => it(`Подразделение "${division}" выделено.`,
        async () => await dec.simple(page.division.selected,
            [division, timeout],
            page.division)),

    size: ({size, timeout}) => it(`Отображение "${size}" подразделения.`,
        async () => await dec.simple(page.division.size,
            [size, timeout],
            page.division)),

    noDivision: ({arr, timeout}) => it(`Отсутствие подразделения "${arr[arr.length - 1]}".`,
        async () => await dec.simple(page.division.noElement,
            [arr, timeout],
            page.division)),
}