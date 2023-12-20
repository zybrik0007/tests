const {it} = require('mocha');
const el = require('../../elements');
const dec = require('../../dictionaries/decorate');


module.exports = {
    displayWait: ({file}) => it(`Отображение файла "${file}".`, async () => await dec.simple(el.file.displayWait,
        [file],
        el.file)),

    display: ({file, timeout}) => it(`Отображение файла "${file}" c обработкой ожидания его повления ${timeout}.`,
        async () => await dec.simple(el.file.display,
            [file, timeout],
            el.file)),

    deleteWait: ({file}) => it(`Удаление файла "${file}".`, async () => await dec.simple(el.file.deleteWait(),
        [file],
        el.file)),

    delete: ({file, timeout}) => it(`Удаление файла "${file}" c обработкой ожидания его удаления ${timeout}.".`,
        async () => await dec.simple(el.file.delete,
            [file, timeout],
            el.file)),

    comparison: ({file, json}) => it(`Проверка строка файла ${file}`, async () => {
        const jsonFile = await el.file.readNum(file);
        await dec.exportFile(json, jsonFile);
    }),


}
