const {it} = require('mocha');
const api = require('../handlers/other/api');
const page = require('../pages');
const dec = require('./decorate');

class DecorateItApi {

    // Доблавление помещения
    addRoomParent = (obj) => it(`Добавление помещения "${obj.room}" в "Неконтролируемая территория".`,
        async () => {
        const cook = await page.base.getCookie('token');
        const room = {
            "parentId": 1,
            "name": obj.room,
            "segment_id": 0
        }
        await dec.simple(api.putRoom,
            [[room], cook.text],
            api.putRoom);
    });

    // Добавление дочернего помещения
    addRoomChild = (obj) => it(`Добавление помещения "${obj.child}" в помещение "${obj.parent}".`, async () => {
        const cook = await page.base.getCookie('token');
        const get = await api.getRoom(cook.text);
        const room = {
            "parentId": get.text.filter(item => item.name === obj.parent && item.id)[0].id,
            "name": obj.child,
            "segment_id": 0
        }
        await dec.simple(api.putRoom,
            [[room], cook.text],
            api.putRoom);
    });

    deleteRoom = (obj) => it(`Удаление помещения "${obj.room}".`, async () => {
        const cook = await page.base.getCookie('token');
        const getRoom = await api.getRoom(cook.text);
        const roomId = getRoom.text.filter(item => item.name === obj.room)[0].id;
        await dec.simple(api.deleteRoom,
            [[roomId], cook.text],
            api.deleteRoom);
    });

    // Добавление устройства
    addDevice = (obj) => it(`Добавлние устройства IP: "${obj.ip_addr}".`, async () => {
        const cook = await page.base.getCookie('token');
        await dec.simple(api.putDevice,
            [[obj], cook.text],
            api.putDevice);
    });

    // Добавление устройства в помещение
    addDeviceInRoom = (obj) => it(`Добавление устройства IP: "${obj.device}" в помещение "${obj.room}".`,
        async () => {
        const cook = await page.base.getCookie('token');
        const getDevice = await api.getDevice(cook.text);
        const deviceId = getDevice.text.filter(device => device.ip_addr === obj.device)[0].id;
        const getRoom = await api.getRoom(cook.text);
        const roomId = getRoom.text.filter(room => room.name === obj.room)[0].id;
        await dec.simple(api.addDeviceInRoom,
            [[{deviceId, roomId}], cook.text],
            api.addDeviceInRoom);
    });

    // Удаление устройства из помещения
    deleteDeviceInRoom = (obj) => it(`Удаление устройства IP: "${obj.ip}" из помещения.`,
        async () => {
        const cook = await page.base.getCookie('token');
        const getDevice = await api.getDevice(cook.text);
        const deviceId = getDevice.text.filter(item => item.ip_addr === obj.ip)[0].id;
        await dec.simple(api.deleteDeviceInRoom,
            [[deviceId], cook.text],
            api.deleteDeviceInRoom);
    });

    // Удаление устройства
    deleteDevice = (obj) => it(`Удаление устройства "${obj.ip}".`, async () => {
        const cook = await page.base.getCookie('token');
        const getDevice = await api.getDevice(cook.text);
        const deviceId = getDevice.text.filter(item => item.ip_addr === obj.ip)[0].id;
        await dec.simple(api.deleteDevice,
            [[deviceId], cook.text],
            api.deleteDevice);
    });

    // Удаление шаблона доступа
    deleteTemplate = (obj) => it(`Удаление шаблона доступа "${obj.template}".`, async () => {
        const cook = await page.base.getCookie('token');
        const getTemplate = await api.getTemplate(cook.text);
        const templateId = getTemplate.text.filter(item => item.name === obj.template)[0].id;
        await dec.simple(api.deleteTemplate,
            [[templateId], cook.text],
            api.deleteTemplate);
    });

    //Добавление подразделения
    addDivision = (obj) => it(`Добавление подразделения "${obj.name}".`, async () => {
        const cook = await page.base.getCookie('token');
        await dec.simple(api.putDivision,
            [[obj], cook.text],
            api.putDivision);
    });

    addPosition = (obj) => it(`Добавление должности "${obj.name}".`, async () => {
        const cook = await page.base.getCookie('token');
        await dec.simple(api.putPosition,
            [[obj], cook.text],
            api.putPosition);
    });

    addAdditionalData = ({params, qs}) => it(`Добавление дополнительного поля "${params.name}"`, async () => {
        const cook = await page.base.getCookie('token');
        await dec.simple(api.putAdditionalData,
            [[params], {target: qs}, cook.text],
            api.putAdditionalData);
    });

    deleteAdditionalData = ({name, qs}) => it(`Удаление дополнительного поля "${name}"`, async () => {
        const cook = await page.base.getCookie('token');
        const getData = await api.getAdditionalData({target: qs}, cook.text);
        const dataParse = JSON.parse(getData.text);
        console.log('dataParse', dataParse)
        const dataId = dataParse.rows.filter(item => item.name === name)[0].id;
        console.log('dataId', dataId)
        await dec.simple(api.deleteAdditionalData,
            [[{id: dataId}], {target: qs}, cook.text],
            api.deleteAdditionalData);
    });

    deleteSchedule = ({name}) => it(`Удаление графика работы "${name}".`, async () => {
        const cook = await page.base.getCookie('token');
        const getSchedule = await api.getSchedule(cook.text);
        const scheduleId = getSchedule.text.filter(item => item.name === name)[0].id;
        await dec.simple(api.deleteSchedule,
            [[scheduleId], cook.text],
            api.deleteSchedule);
    });


}

module.exports = new DecorateItApi();

