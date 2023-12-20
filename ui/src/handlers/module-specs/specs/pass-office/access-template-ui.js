const {describe, it, before, after} = require('mocha');

const entry = require('../../../../../../entry');
const page = require('../../../../pages');
const el = require('../../../../elements');
const dec = require('../../../../dictionaries/decorate');
const sec = require('../../../../dictionaries/section');
const sub = require('../../../../dictionaries/subsection');
const but = require('../../../../dictionaries/button-icon');
const api = require('../../../other/api');
const deleteData = require('../../../other/deleteData');
const oth = require('../../../other/other');
const decItApi = require('../../../../dictionaries/decorate-it-api');
const decItEl = require('../../../../dictionaries/decorate-it-element');
const decItPage = require('../../../../dictionaries/decorate-it-page');
const decItModal = require('../../../../dictionaries/decorate-it-modal');

const bef = () => before('Вход и открытие подраздела "Шаблоны доступа" вкладка "Шаблоны доступа"', async () => {
    await dec.auth(entry.customLogin, entry.customPassword);
    await dec.simple(el.section.handler, [sec.pas, entry.max], el.section);
    await dec.simple(el.subsection.handler, [sub.pas.template, entry.max], el.subsection);
    await dec.simple(el.tab.handler, ['Шаблоны доступа', entry.max], el.tab);
    await dec.simple(page.accessTemplate.init, [entry.max], page.accessTemplate);
});

const aft = () => after('Выход', async () => await dec.exit());

const data = {
    rooms: {
        room1: 'room1',
        roomChild1: 'roomChild1',
        roomChildChild1: 'roomChildChild1',
        room2: 'room2',
        roomChild2: 'roomChild2',
        roomChildChild2: 'roomChildChild2',
    },
    devices: [
        {
            "device_type": 16,
            "ip_addr": "10.10.5.10",
            "mac_addr": "02:42:2f:97:86:32"
        },
        {
            "device_type": 65,
            "ip_addr": "10.10.5.9",
            "mac_addr": "02:42:2f:97:86:33"
        },
        {
            "device_type": 902,
            "ip_addr": "10.10.5.8",
            "mac_addr": "02:42:2f:97:86:34"
        },
        {
            "device_type": 903,
            "ip_addr": "10.10.5.7",
            "mac_addr": "02:42:2f:97:86:35"
        },
        {
            "device_type": 17,
            "ip_addr": "10.10.5.6",
            "mac_addr": "02:42:2f:97:86:36"
        },
        {
            "device_type": 36,
            "ip_addr": "10.10.5.5",
            "mac_addr": "02:42:2f:97:86:37"
        },
        {
            "device_type": 64,
            "ip_addr": "10.10.5.4",
            "mac_addr": "02:42:2f:97:86:38"
        },
        {
            "device_type": 101,
            "ip_addr": "10.10.5.3",
            "mac_addr": "02:42:2f:97:86:39"
        },
        {
            "device_type": 902,
            "ip_addr": "10.10.5.2",
            "mac_addr": "02:42:2f:97:86:40"
        }
    ],
    links: {
        room1: {
            name: 'room1',
            device1: {
                name: 'ЛИКОН CR01.9',
                ip: '10.10.5.3'
            }
        },
        roomChild1: {
            name: 'roomChild1',
            device1: {
                name: 'ЛИКОН 2',
                ip: '10.10.5.9'
            },
            device2: {
                name: 'Контроллер замка CL05.2',
                ip: '10.10.5.4'
            }
        },
        roomChildChild1: {
            name: 'roomChildChild1',
            device1: {
                name: 'Контроллер CL15',
                ip: '10.10.5.8'
            },
            device2: {
                name: 'Контроллер CR11',
                ip: '10.10.5.7'
            },
            device3: {
                name: 'Контроллер CL15',
                ip: '10.10.5.2'
            }
        },
        room2: {
            name: 'roomChildChild2',
            device1: {
                name: 'Контроллер замка CL05',
                ip: '10.10.5.10'
            },
            device2: {
                name: 'Контроллер замка CL05.1',
                ip: '10.10.5.5'
            },
            device3: {
                name: 'ЛИКОН CR01.9',
                ip: '10.10.5.3'
            }
        },
        roomChild2: {
            name: 'roomChild2'
        },
        roomChildChild2: {
            name: 'roomChildChild2'
        },
    }
}

const addParams = () => describe('Добавление помещений, контроллеров и временных критерие доступа.', () => {

    const params = {
        ...data,
    }

    describe('Добавление помещений.', () => {
        bef();
        aft();

        decItApi.addRoomParent({
            room: params.rooms.room1
        });

        decItApi.addRoomChild({
            parent: params.rooms.room1,
            child: params.rooms.roomChild1
        });

        decItApi.addRoomChild({
            parent: params.rooms.roomChild1,
            child: params.rooms.roomChildChild1
        });

        decItApi.addRoomParent({
            room: params.rooms.room2
        });

        decItApi.addRoomChild({
            parent: params.rooms.room2,
            child: params.rooms.roomChild2
        });

        decItApi.addRoomChild({
            parent: params.rooms.roomChild2,
            child: params.rooms.roomChildChild2
        });
    });

    describe('Добавление контроллеров.', () => {
        bef();
        aft();
        params.devices.forEach(obj => decItApi.addDevice(obj));
    });

    describe('Добавление устройств в помещения.', () => {
        bef();
        aft();

        decItApi.addDeviceInRoom({
            device: params.links.room1.device1.ip,
            room: params.links.room1.name
        });

        decItApi.addDeviceInRoom({
            device: params.links.roomChild1.device1.ip,
            room: params.links.roomChild1.name
        });

        decItApi.addDeviceInRoom({
            device: params.links.roomChild1.device2.ip,
            room: params.links.roomChild1.name
        });

        decItApi.addDeviceInRoom({
            device: params.links.roomChildChild1.device1.ip,
            room: params.links.roomChildChild1.name
        });

        decItApi.addDeviceInRoom({
            device: params.links.roomChildChild1.device2.ip,
            room: params.links.roomChildChild1.name
        });

        decItApi.addDeviceInRoom({
            device: params.links.roomChildChild1.device3.ip,
            room: params.links.roomChildChild1.name
        });

        decItApi.addDeviceInRoom({
            device: params.links.room2.device1.ip,
            room: params.links.room1.name
        });

        decItApi.addDeviceInRoom({
            device: params.links.room2.device2.ip,
            room: params.links.room1.name
        });

        decItApi.addDeviceInRoom({
            device: params.links.room2.device3.ip,
            room: params.links.room1.name
        });
    });

});

const deleteParams = () => describe('Удаление помещений, контроллеров и временных критерие доступа.', () => {

    const params = {
        ...data,
    }

    describe('Удаление устройств из помещений.', () => {
        bef();
        aft();
        params.devices.forEach(device => decItApi.deleteDeviceInRoom({ip: device.ip_addr}));
    });

    describe('Удаление устройств.', () => {
        bef();
        aft();
        params.devices.forEach(device => decItApi.deleteDevice({ip: device.ip_addr}));
    });

    describe('Удаление помещений.', () => {
        bef();
        aft();

        decItApi.deleteRoom({
            room: params.rooms.roomChildChild1
        });

        decItApi.deleteRoom({
            room: params.rooms.roomChild1
        });

        decItApi.deleteRoom({
            room: params.rooms.room1
        });

        decItApi.deleteRoom({
            room: params.rooms.roomChildChild2
        });

        decItApi.deleteRoom({
            room: params.rooms.roomChild2
        });

        decItApi.deleteRoom({
            room: params.rooms.room2
        });
    });
});

const add = () => {

    //Минимальное количество параметров.
    const addMinParams = () => describe('Шаблоны доступа. Добавление. Минимальное количество параметров.', () => {

        const params = {
            name: 'addMinParamsName',
            room1: {
                name: 'room1',
                device1: {
                    name: 'room1',
                    typeCriterion: 'Временные зоны',
                    criterion: 'Никода',
                    type: 'Карта'
                }
            }
        }

        describe('Добавдение', () => {

            bef();
            //aft();

            decItEl.butIcBefore.handler({
                button: but.add,
                timeout: entry.max
            });

            decItPage.accessTemplateChange.initAdd({
                timeout: entry.max
            });

            decItEl.input.sendKeys({
                title: 'Имя шаблона',
                placeholder: '',
                value: params.name,
                timeout: entry.max
            });

            decItPage.accessTemplateChange.roomHandler({

            });



        });
    });

    return {
        addMinParams
    }
}




module.exports = {
    addParams,
    deleteParams,
    add: add(),
}