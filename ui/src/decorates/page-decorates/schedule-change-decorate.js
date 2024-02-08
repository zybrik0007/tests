const {it} = require('mocha');
const page = require('../../pages');
const dec = require('../../dictionaries/decorate');

module.exports = {
    initAdd: ({timeout}) => it('Проверка заглавия и url.', async () => await dec.simple(page.schedulePageChange.initAdd,
        [timeout],
        page.schedulePageChange)),

    initEdit: ({timeout}) => it('Проверка заглавия и url.', async () => await dec.simple(page.schedulePageChange.initEdit,
        [timeout],
        page.schedulePageChange)),

    handler: ({numInterval, timeout}) => it(`Нажатие по интервалу с порядковым номером ${numInterval}.`,
        async () => await dec.simple(page.schedulePageChange.handler,
        [numInterval, timeout],
        page.schedulePageChange)),

    interval: ({numInterval, timeout}) => it(`Отображение интервала c порядковым номером ${numInterval}.`,
        async () => await dec.simple(page.schedulePageChange.interval,
            [numInterval, timeout],
            page.schedulePageChange)),

    interval: ({numInterval, timeout}) => it(`Отображение интервала c порядковым номером ${numInterval}.`,
        async () => await dec.simple(page.schedulePageChange.interval,
            [numInterval, timeout],
            page.schedulePageChange)),

    async intervalActive(timeout) {
        return await this.xpathElement(elements.pasAccessScheduleActive,
            `Интерввал активен.`,
            timeout)
    }



}