const {it} = require('mocha');
const page = require('../../pages');
const dec = require('../../dictionaries/decorate');

module.exports = {
    device: ({name, ip, timeout}) => it(`Отображение устройства "${name}" c ip "${ip}".`,
        async () => await dec.simple(page.device.deviceElement,
            [name, ip, timeout],
            page.device)),

    noDevice: ({name, ip, timeout}) => it(`Отсутствие устройства "${name}" c ip "${ip}".`,
        async () => await dec.simple(page.device.deviceNoElement,
            [name, ip, timeout],
            page.device)),

    handler: ({name, ip, timeout}) => it(`Нажатие по устройству "${name}" c ip "${ip}".`,
        async () => await dec.simple(page.device.deviceHandler,
            [name, ip, timeout],
            page.device)),

    active: ({name, ip, timeout}) => it(`Устройства "${name}" c ip "${ip}" активно.`,
        async () => await dec.simple(page.device.deviceActive,
            [name, ip, timeout],
            page.device)),

    noActive: ({name, ip, timeout}) => it(`Устройства "${name}" c ip "${ip}" не активно.`,
        async () => await dec.simple(page.device.deviceNoActive,
            [name, ip, timeout],
            page.device)),

    deviceGetStatusLock: ({name, ip, value, timeout}) => it(`У устройства "${name}" c ip "${ip}" статус замка "${value}".`,
        async () => await dec.simpleText(page.device.deviceGetStatusLock,
            [name, ip, timeout],
            value,
            page.device)),

    deviceGetStatusIU: ({name, ip, value, timeout}) => it(`У устройства "${name}" c ip "${ip}" статус ИУ "${value}".`,
        async () => await dec.simpleText(page.device.deviceGetStatusIU,
            [name, ip, timeout],
            value,
            page.device)),

    deviceGetStatusAlarm: ({name, ip, value, timeout}) => it(`У устройства "${name}" c ip "${ip}" статус тревоги "${value}".`,
        async () => await dec.simpleText(page.device.deviceGetStatusAlarm,
            [name, ip, timeout],
            value,
            page.device)),

    deviceNoStatusAlarm: ({name, ip, timeout}) => it(`У устройства "${name}" c ip "${ip}" отсуствует статус тревоги.`,
        async () => await dec.simple(page.device.deviceNoStatusAlarm,
            [name, ip, timeout],
            page.device)),

}