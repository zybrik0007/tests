const {it} = require('mocha');
const page = require('../../pages');
const dec = require('../../dictionaries/decorate');

module.exports = {
    room: ({arr, timeout}) => it(`Отображение помещения "${arr[arr.length - 1]}".`,
        async () => await dec.simple(page.room.room,
            [arr, timeout],
            page.room)),

    device: ({arr, timeout}) => it(`Отображение устройства "${arr[arr.length - 2]} - ${arr[arr.length - 1]}" в помещении 
    "${arr[arr.length - 3]}".`,
        async () => await dec.simple(page.room.device,
            [arr, timeout],
            page.room)),

    handler: ({arr, timeout}) => it(`Нажатие по помещению "${arr[arr.length - 1]}".`,
        async () => await dec.simple(page.room.roomHandler,
            [arr, timeout],
            page.room)),
}