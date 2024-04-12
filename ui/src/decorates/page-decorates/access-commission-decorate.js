const {it} = require('mocha');
const page = require('../../pages');
const dec = require('../../dictionaries/decorate');

module.exports = {
    room: ({room, timeout}) => it(`Отображения помещения "${room}".`,
        async () => await dec.simple(page.accessTemplateComission.room,
            [room, timeout],
            page.accessTemplateComission)),

    roomHandler: ({room, timeout}) => it(`Нажатие по помещению "${room}".`,
        async () => await dec.simple(page.accessTemplateComission.roomHandler,
            [room, timeout],
            page.accessTemplateComission)),
}