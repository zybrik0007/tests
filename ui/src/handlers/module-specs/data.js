const {it, describe, before, after} = require('mocha');
const entry = require('../../../../entry');
const dec = require('../../dictionaries/decorate');
const decItApi = require('../../dictionaries/decorate-it-api');
const page = require('../../pages');
const api = require('../other/api');
const db = require('../../database');
const decorate = require('../../decorates');
const test = require('../module-specs');
const but = require('../../dictionaries/button-icon');
const sub = require('../../dictionaries/subsection');

const bef = () => before('Авторизация', async () => await dec.auth(entry.customLogin, entry.customPassword));
const aft = () => after('Выход', async () => {
    decorate.page.base.loading({
        timeout: entry.sleep1
    });
    await dec.exit()
});

const dataControlAccess = {
    rooms: {
        room1: 'room1',
        room2: 'room2',
        room3: 'room3'
    },
    devices: {
        device1: {
            name: 'Контроллер замка CL05',
            ip: '10.10.5.10',
            obj: {
                "device_type": 16,
                "ip_addr": "10.10.5.10",
                "mac_addr": "02:42:2f:97:86:32"
            }
        },
        device2: {
            name: 'Контроллер CL15',
            ip: '10.10.5.2',
            obj: {
                "device_type": 902,
                "ip_addr": "10.10.5.2",
                "mac_addr": "02:42:2f:97:86:40"
            }
        },
        device3: {
            name: 'ЛИКОН 2',
            ip: '10.10.5.9',
            obj: {
                "device_type": 65,
                "ip_addr": "10.10.5.9",
                "mac_addr": "02:42:2f:97:86:33"
            }
        }
    },
    divisions: {
        division1: {
            parent_id: 0,
            name: 'division1',
        },
        division2: {
            parent_id: 0,
            name: 'division2',
        },
        division3: {
            parent_id: 0,
            name: 'division3',
        },
    },
    positions: {
        position1: {
            name: 'position1',
            comment: ''
        },
        position2: {
            name: 'position2',
            comment: ''
        },
        position3: {
            name: 'position3',
            comment: ''
        },
    },
    templates: {
        template1: 'template1',
        template2: 'template2',
        template3: 'template3',
    },
    template: (name, zone1Id, zone2Id, zone3Id) => {
        return {
            "name": `${name}`,
            "comment": '',
            "access": [
                {
                    "access_zone_id": zone1Id,
                    "template_type":0,
                    "rights": {
                        "is_guard":0,
                        "is_antipass":0,
                        "is_verify":0,
                        "right_type": 1,
                        "schedule_id": 2,
                        "schedule_type_id": 1,
                        "commission_type":0,
                        "commission_group_1":0,
                        "commission_group_2":0,
                        "verify_po_schedule":0,
                        "verify_vvu_schedule":0,
                        "verify_pdu_schedule":0,
                        "verify_alcobarier_schedule":0

                    }
                },
                {
                    "access_zone_id": zone2Id,
                    "template_type":0,
                    "rights": {
                        "is_guard":0,
                        "is_antipass":0,
                        "is_verify":0,
                        "right_type": 1,
                        "schedule_id": 2,
                        "schedule_type_id": 1,
                        "commission_type":0,
                        "commission_group_1":0,
                        "commission_group_2":0,
                        "verify_po_schedule":0,
                        "verify_vvu_schedule":0,
                        "verify_pdu_schedule":0,
                        "verify_alcobarier_schedule":0

                    }
                },
                {
                    "access_zone_id": zone3Id,
                    "template_type":0,
                    "rights": {
                        "is_guard":0,
                        "is_antipass":0,
                        "is_verify":0,
                        "right_type": 1,
                        "schedule_id": 2,
                        "schedule_type_id": 1,
                        "commission_type":0,
                        "commission_group_1":0,
                        "commission_group_2":0,
                        "verify_po_schedule":0,
                        "verify_vvu_schedule":0,
                        "verify_pdu_schedule":0,
                        "verify_alcobarier_schedule":0

                    }
                },
            ]
        }
    },
    templateOneRoom: (name, zone1Id) => {
        return {
            "name": `${name}`,
            "comment": '',
            "access": [
                {
                    "access_zone_id": zone1Id,
                    "template_type":0,
                    "rights": {
                        "is_guard":0,
                        "is_antipass":0,
                        "is_verify":0,
                        "right_type": 1,
                        "schedule_id": 2,
                        "schedule_type_id": 1,
                        "commission_type":0,
                        "commission_group_1":0,
                        "commission_group_2":0,
                        "verify_po_schedule":0,
                        "verify_vvu_schedule":0,
                        "verify_pdu_schedule":0,
                        "verify_alcobarier_schedule":0

                    }
                }
            ]
        }
    },
    staff: {
        staff1: {
            last_name: 'staff',
            first_name: 'name',
            middle_name: '1',
            tabel_number: '1',
            hiring_date: '2023-01-01',
            division: 'division1',
            position: 'position1',
            access_template: ['template1'],
            begin_datetime: '2023-01-01 00:00:00',
            end_datetime: '2033-01-01 00:00:00',
            identifier: [{identifier:"1", is_universal: true}],
        },
        staff2: {
            last_name: 'staff',
            first_name: 'name',
            middle_name: '2',
            tabel_number: '2',
            hiring_date: '2023-02-01',
            division: 'division2',
            position: 'position2',
            access_template: ['template2'],
            begin_datetime: '2023-01-01 00:00:00',
            end_datetime: '2033-01-01 00:00:00',
            identifier: [{identifier:"2", is_universal: true}],
        },
        staff3: {
            last_name: 'staff',
            first_name: 'name',
            middle_name: '3',
            tabel_number: '3',
            hiring_date: '2023-02-01',
            division: 'division3',
            position: 'position3',
            access_template: ['template3'],
            begin_datetime: '2023-01-01 00:00:00',
            end_datetime: '2033-01-01 00:00:00',
            identifier: [{identifier:"3", is_universal: true}],
        },
    },
    visitor: {
        visitor1: {
            last_name: 'visitor',
            first_name: 'name',
            middle_name: '1',
            division: 'division1',
            access_template: 'template1',
            identifier: [{identifier:"4", is_universal: true}],
            supporting_document: 'passport',
            supporting_document_number: '1',
            begin_datetime: '2023-01-01 00:00:00',
            end_datetime: '2033-01-01 00:00:00',
        },
        visitor2: {
            last_name: 'visitor',
            first_name: 'name',
            middle_name: '2',
            division: 'division2',
            access_template: 'template2',
            identifier: [{identifier:"5", is_universal: true}],
            supporting_document: 'passport',
            supporting_document_number: '2',
            begin_datetime: '2023-01-01 00:00:00',
            end_datetime: '2033-01-01 00:00:00',
        },
        visitor3: {
            last_name: 'visitor',
            first_name: 'name',
            middle_name: '3',
            division: 'division3',
            access_template: 'template3',
            identifier: [{identifier:"6", is_universal: true}],
            supporting_document: 'passport',
            supporting_document_number: '3',
            begin_datetime: '2023-01-01 00:00:00',
            end_datetime: '2033-01-01 00:00:00',
        },
    },
    fio: {
        staff1: 'staff name 1',
        staff2: 'staff name 2',
        staff3: 'staff name 3',
        visitor1: 'visitor name 1',
        visitor2: 'visitor name 2',
        visitor3: 'visitor name 3',
    },
    event: {
        staff1: {
            event1: {
                time_label: `"${new Date().toLocaleDateString('fr-ca')} 05:00:00"`,
                time_label_utc: `"${new Date().toLocaleDateString('fr-ca')} 02:00:00"`,
                event_type: 65544,
                resource_number: 1,
                resource_type: 12,
                identifier: '1',
                user_id: '',
                device_id: '',
                access_zone_id1: 'Неконтролируемая территория',
                access_zone_id2: 'room1'
            },
        },
        staff2: {
            event1: {
                time_label: `"${new Date().toLocaleDateString('fr-ca')} 08:00:00"`,
                time_label_utc: `"${new Date().toLocaleDateString('fr-ca')} 05:00:00"`,
                event_type: 65544,
                resource_number: 1,
                resource_type: 12,
                identifier: '2',
                user_id: '',
                device_id: '',
                access_zone_id1: 'Неконтролируемая территория',
                access_zone_id2: 'room1'
            },
            event2: {
                time_label: `"${new Date().toLocaleDateString('fr-ca')} 09:00:00"`,
                time_label_utc: `"${new Date().toLocaleDateString('fr-ca')} 06:00:00"`,
                event_type: 65544,
                resource_number: 1,
                resource_type: 12,
                identifier: '2',
                user_id: '',
                device_id: '',
                access_zone_id1: 'room1',
                access_zone_id2: 'room2'
            },
            event3: {
                time_label: '"2023-06-06 09:00:00"',
                time_label_utc: '"2023-06-06 06:00:00"',
                event_type: 65544,
                resource_number: 1,
                resource_type: 12,
                identifier: '2',
                user_id: '',
                device_id: '',
                access_zone_id1: 'Неконтролируемая территория',
                access_zone_id2: 'room1'
            },

        },
        staff3: {
            event1: {
                time_label: `"${new Date().toLocaleDateString('fr-ca')} 05:00:00"`,
                time_label_utc: `"${new Date().toLocaleDateString('fr-ca')} 02:00:00"`,
                event_type: 65544,
                resource_number: 1,
                resource_type: 12,
                identifier: '3',
                user_id: '',
                device_id: '',
                access_zone_id1: 'Неконтролируемая территория',
                access_zone_id2: 'room1'
            },
            event2: {
                time_label: `"${new Date().toLocaleDateString('fr-ca')} 05:00:00"`,
                time_label_utc: `"${new Date().toLocaleDateString('fr-ca')} 02:00:00"`,
                event_type: 17,
                resource_number: 1,
                resource_type: 12,
                identifier: '3',
                user_id: '',
                device_id: '',
                access_zone_id1: 'Неконтролируемая территория',
                access_zone_id2: 'room1'
            },
        },
        visitor1: {
            event1: {
                time_label: `"${new Date().toLocaleDateString('fr-ca')} 05:00:00"`,
                time_label_utc: `"${new Date().toLocaleDateString('fr-ca')} 02:00:00"`,
                event_type: 65544,
                resource_number: 1,
                resource_type: 12,
                identifier: '4',
                user_id: '',
                device_id: '',
                access_zone_id1: 'Неконтролируемая территория',
                access_zone_id2: 'room1'
            },
        },
        visitor2: {
            event1: {
                time_label: `"${new Date().toLocaleDateString('fr-ca')} 08:00:00"`,
                time_label_utc: `"${new Date().toLocaleDateString('fr-ca')} 05:00:00"`,
                event_type: 65544,
                resource_number: 1,
                resource_type: 12,
                identifier: '5',
                user_id: '',
                device_id: '',
                access_zone_id1: 'Неконтролируемая территория',
                access_zone_id2: 'room1'
            },
            event2: {
                time_label: `"${new Date().toLocaleDateString('fr-ca')} 09:00:00"`,
                time_label_utc: `"${new Date().toLocaleDateString('fr-ca')} 06:00:00"`,
                event_type: 65544,
                resource_number: 1,
                resource_type: 12,
                identifier: '5',
                user_id: '',
                device_id: '',
                access_zone_id1: 'room1',
                access_zone_id2: 'room2'
            },
            event3: {
                time_label: '"2023-06-07 09:00:00"',
                time_label_utc: '"2023-06-07 06:00:00"',
                event_type: 65544,
                resource_number: 1,
                resource_type: 12,
                identifier: '5',
                user_id: '',
                device_id: '',
                access_zone_id1: 'Неконтролируемая территория',
                access_zone_id2: 'room1'
            },
        },
        visitor3: {
            event1: {
                time_label: `"${new Date().toLocaleDateString('fr-ca')} 05:00:00"`,
                time_label_utc: `"${new Date().toLocaleDateString('fr-ca')} 02:00:00"`,
                event_type: 17,
                resource_number: 1,
                resource_type: 12,
                identifier: '6',
                user_id: '',
                device_id: '',
                access_zone_id1: 'Неконтролируемая территория',
                access_zone_id2: 'room1'
            },
        },
    },
    eventDate: {
        event1: new Date().toLocaleDateString('fr-ca') + ' ' + '09:00:00',
        event2: new Date().toLocaleDateString('fr-ca') + ' ' + '08:00:00',
        event3: new Date().toLocaleDateString('fr-ca') + ' ' + '05:00:00',
        event4: '2033-01-01 00:00:00',
        event5: '2023-06-01 08:00:00',
    },
    date: () => {
        const yesterday = new Date(new Date() - 24*3600*1000).toLocaleDateString('fr-ca');
        const today = new Date().toLocaleDateString('fr-ca');
        return yesterday + ' – ' + today
    },
    date2: () => {
        const yesterday = new Date(new Date() - 24*3600*1000).toLocaleDateString('fr-ca');
        const today = new Date().toLocaleDateString('fr-ca');
        return yesterday + ' - ' + today
    },
    dateTimeToday: () => {
        const today = new Date().toLocaleDateString('fr-ca');
        return today + ' 00:00' + ' – ' + today + ' 23:59'
    },
    dateTimeToday2: () => {
        const today = new Date().toLocaleDateString('fr-ca');
        return today + ' 00:00' + ' - ' + today + ' 23:59'
    },
    todayNow: () => {
        const day = new Date().toLocaleDateString('fr-ca');
        const time = new Date().toLocaleTimeString().slice(0,-3);
        return day + ' ' + time;
    },
    todayDate: () => new Date().toLocaleDateString('fr-ca'),
    dateCard: '2023-06-01 08:00:00',
    endDate: '2033-01-01',
    june6Now: () => '2023-06-06 ' + new Date().toLocaleTimeString().slice(0,-3),
    june7Now: () => '2023-06-07 ' + new Date().toLocaleTimeString().slice(0,-3)
}

const addDataControlAccess = () => describe('Добавление данных для тестирования отчетов раздела Котроль доступа',
    () => {
    const params = {...dataControlAccess}

    bef();
    aft();

    describe('Добавление помещений', () => {
        decItApi.addRoomParent({
            room: params.rooms.room1
        });
        decItApi.addRoomChild({
            child: params.rooms.room2,
            parent: params.rooms.room1
        });
        decItApi.addRoomChild({
            child: params.rooms.room3,
            parent: params.rooms.room2
        });
    });

    describe('Добавление устройств', () => {
        decItApi.addDevice(params.devices.device1.obj);
        decItApi.addDevice(params.devices.device2.obj);
        decItApi.addDevice(params.devices.device3.obj);
    });

    describe('Добавление устройств в помещение', () => {
        decItApi.addDeviceInRoom({
            device: params.devices.device1.ip,
            room: params.rooms.room1
        });
        decItApi.addDeviceInRoom({
            device: params.devices.device2.ip,
            room: params.rooms.room2
        });
        decItApi.addDeviceInRoom({
            device: params.devices.device3.ip,
            room: params.rooms.room3
        });
    });

    describe('Добавление подразделений', () => {
        decItApi.addDivision(params.divisions.division1);
        decItApi.addDivision(params.divisions.division2);
        decItApi.addDivision(params.divisions.division3);
    });

    describe('Добавление должностей', () => {
        decItApi.addPosition(params.positions.position1);
        decItApi.addPosition(params.positions.position2);
        decItApi.addPosition(params.positions.position3);
    });

    describe('Добавление шаблонов доступа', () => {
        it(`Добавление шаблона доступа "${params.templates.template1}"`, async () => {
            const cook = await page.base.getCookie('token');
            const arrZone = await api.getRoom(cook.text);
            const id1 = arrZone.text.filter(obj => obj.name === params.rooms.room1)[0].id;
            const id2 = arrZone.text.filter(obj => obj.name === params.rooms.room2)[0].id;
            const id3 = arrZone.text.filter(obj => obj.name === params.rooms.room3)[0].id;
            const template = params.template(params.templates.template1, id1, id2, id3);
            await dec.simple(api.putAccessTemplate,
                [[template], cook.text],
                api.putAccessTemplate);
        });

        it(`Добавление шаблона доступа "${params.templates.template2}"`, async () => {
            const cook = await page.base.getCookie('token');
            const arrZone = await api.getRoom(cook.text);
            const id1 = arrZone.text.filter(obj => obj.name === params.rooms.room1)[0].id;
            const id2 = arrZone.text.filter(obj => obj.name === params.rooms.room2)[0].id;
            const id3 = arrZone.text.filter(obj => obj.name === params.rooms.room3)[0].id;
            const template = params.template(params.templates.template2, id1, id2, id3);
            await dec.simple(api.putAccessTemplate,
                [[template], cook.text],
                api.putAccessTemplate);
        });

        it(`Добавление шаблона доступа "${params.templates.template3}"`, async () => {
            const cook = await page.base.getCookie('token');
            const arrZone = await api.getRoom(cook.text);
            const id1 = arrZone.text.filter(obj => obj.name === params.rooms.room1)[0].id;
            const template = params.templateOneRoom(params.templates.template3, id1);
            await dec.simple(api.putAccessTemplate,
                [[template], cook.text],
                api.putAccessTemplate);
        });
    });

    describe('Добавление сотрудников', () => {
        it(`Добавление сотрудника "${params.fio.staff1}".`, async () => {
            const cook = await page.base.getCookie('token');
            const arrDivision = await api.getDivision(cook.text);
            const divisionId = arrDivision.text.filter(obj => obj.name === params.staff.staff1.division)[0].id;
            const arrPosition = await api.getPosition(cook.text);
            const positionId = arrPosition.text.filter(obj => obj.name === params.staff.staff1.position)[0].id;
            const arrTemplate = await api.getTemplate(cook.text);
            const templateId = arrTemplate.text.filter(obj => obj.name === params.staff.staff1.access_template[0])[0].id;
            const staff = {
                ...params.staff.staff1,
                division: divisionId,
                position: positionId,
                access_template: [templateId]
            }
            await dec.simple(api.putStaff,
                [[staff], cook.text],
                api.putStaff);
        });

        it(`Добавление сотрудника "${params.fio.staff2}".`, async () => {
            const cook = await page.base.getCookie('token');
            const arrDivision = await api.getDivision(cook.text);
            const divisionId = arrDivision.text.filter(obj => obj.name === params.staff.staff2.division)[0].id;
            const arrPosition = await api.getPosition(cook.text);
            const positionId = arrPosition.text.filter(obj => obj.name === params.staff.staff2.position)[0].id;
            const arrTemplate = await api.getTemplate(cook.text);
            const templateId = arrTemplate.text.filter(obj => obj.name === params.staff.staff2.access_template[0])[0].id;
            const staff = {
                ...params.staff.staff2,
                division: divisionId,
                position: positionId,
                access_template: [templateId]
            }
            await dec.simple(api.putStaff,
                [[staff], cook.text],
                api.putStaff);
        });

        it(`Добавление сотрудника "${params.fio.staff3}".`, async () => {
            const cook = await page.base.getCookie('token');
            const arrDivision = await api.getDivision(cook.text);
            const divisionId = arrDivision.text.filter(obj => obj.name === params.staff.staff3.division)[0].id;
            const arrPosition = await api.getPosition(cook.text);
            const positionId = arrPosition.text.filter(obj => obj.name === params.staff.staff3.position)[0].id;
            const arrTemplate = await api.getTemplate(cook.text);
            const templateId = arrTemplate.text.filter(obj => obj.name === params.staff.staff3.access_template[0])[0].id;
            const staff = {
                ...params.staff.staff3,
                division: divisionId,
                position: positionId,
                access_template: [templateId]
            }
            await dec.simple(api.putStaff,
                [[staff], cook.text],
                api.putStaff);
        });
    });

    describe('Добавление посетителей', () => {
        it(`Добавление пометителя "${params.fio.visitor1}".`, async () => {
            const cook = await page.base.getCookie('token');
            const arrDivision = await api.getDivision(cook.text);
            const divisionId = arrDivision.text.filter(obj => obj.name === params.visitor.visitor1.division)[0].id;
            const arrTemplate = await api.getTemplate(cook.text);
            const templateId = arrTemplate.text.filter(obj => obj.name === params.visitor.visitor1.access_template)[0].id;
            const visitor = {
                ...params.visitor.visitor1,
                division: divisionId,
                access_template: templateId
            }
            await dec.simple(api.putVisitor,
                [[visitor], cook.text],
                api.putVisitor);
        });

        it(`Добавление пометителя "${params.fio.visitor2}".`, async () => {
            const cook = await page.base.getCookie('token');
            const arrDivision = await api.getDivision(cook.text);
            const divisionId = arrDivision.text.filter(obj => obj.name === params.visitor.visitor2.division)[0].id;
            const arrTemplate = await api.getTemplate(cook.text);
            const templateId = arrTemplate.text.filter(obj => obj.name === params.visitor.visitor2.access_template)[0].id;
            const visitor = {
                ...params.visitor.visitor2,
                division: divisionId,
                access_template: templateId
            }
            await dec.simple(api.putVisitor,
                [[visitor], cook.text],
                api.putVisitor);
        });

        it(`Добавление пометителя "${params.fio.visitor2}".`, async () => {
            const cook = await page.base.getCookie('token');
            const arrDivision = await api.getDivision(cook.text);
            const divisionId = arrDivision.text.filter(obj => obj.name === params.visitor.visitor3.division)[0].id;
            const arrTemplate = await api.getTemplate(cook.text);
            const templateId = arrTemplate.text.filter(obj => obj.name === params.visitor.visitor3.access_template)[0].id;
            const visitor = {
                ...params.visitor.visitor3,
                division: divisionId,
                access_template: templateId
            }
            await dec.simple(api.putVisitor,
                [[visitor], cook.text],
                api.putVisitor);
        });
    });

    describe('Добавление проходов', () =>  {
        it(`Добавление проходов сотрудникам и посетителям.`, async () => {
            const cook = await page.base.getCookie('token');
            const arrStaff = await api.getStaff(cook.text);
            const staff1 = arrStaff.text.filter(obj => obj.name === params.fio.staff1)[0].id;
            const staff2 = arrStaff.text.filter(obj => obj.name === params.fio.staff2)[0].id;
            const staff3 = arrStaff.text.filter(obj => obj.name === params.fio.staff3)[0].id;

            const arrVisitor = await api.getVisitor(cook.text);
            const visitor1 = arrVisitor.text.filter(obj => obj.name === params.fio.visitor1)[0].id;
            const visitor2 = arrVisitor.text.filter(obj => obj.name === params.fio.visitor2)[0].id;
            const visitor3 = arrVisitor.text.filter(obj => obj.name === params.fio.visitor3)[0].id;

            const arrDevice = await api.getDevice(cook.text);
            const device1 = arrDevice.text.filter(obj => obj.ip_addr === params.devices.device1.ip)[0].id;
            const device2 = arrDevice.text.filter(obj => obj.ip_addr === params.devices.device2.ip)[0].id;

            const arrRooms = await api.getRoom(cook.text);
            const room0 = arrRooms.text.filter(obj => obj.name === 'Неконтролируемая территория')[0].id;
            const room1 = arrRooms.text.filter(obj => obj.name === params.rooms.room1)[0].id;
            const room2 = arrRooms.text.filter(obj => obj.name === params.rooms.room2)[0].id;

            //События сотрудника 1
            await dec.simple(db.addEvent,
                [{
                    ...params.event.staff1.event1,
                    user_id: staff1,
                    device_id: device1,
                    access_zone_id1: room1,
                    access_zone_id2: room0,
                    event_type: 17
                }],
                db.addEvent);

            await dec.simple(db.addEvent,
                [{
                    ...params.event.staff1.event2,
                    user_id: staff1,
                    device_id: device1,
                    access_zone_id1: room0,
                    access_zone_id2: room1,
                    event_type: 17
                }],
                db.addEvent);

            await dec.simple(db.addEvent,
                [{
                    ...params.event.staff1.event1,
                    user_id: staff1,
                    device_id: device1,
                    access_zone_id1: room1,
                    access_zone_id2: room0,
                    event_type: 65544
                }],
                db.addEvent);

            await dec.simple(db.addEvent,
                [{
                    ...params.event.staff1.event2,
                    user_id: staff1,
                    device_id: device1,
                    access_zone_id1: room0,
                    access_zone_id2: room1,
                    event_type: 65544
                }],
                db.addEvent);

            //События сотрудника 2
            await dec.simple(db.addEvent,
                [{
                    ...params.event.staff2.event1,
                    user_id: staff2,
                    device_id: device1,
                    access_zone_id1: room1,
                    access_zone_id2: room0,
                    event_type: 17
                }],
                db.addEvent);

            await dec.simple(db.addEvent,
                [{
                    ...params.event.staff2.event2,
                    user_id: staff2,
                    device_id: device1,
                    access_zone_id1: room2,
                    access_zone_id2: room1,
                    event_type: 17
                }],
                db.addEvent);

            await dec.simple(db.addEvent,
                [{
                    ...params.event.staff2.event3,
                    user_id: staff2,
                    device_id: device2,
                    access_zone_id1: room1,
                    access_zone_id2: room0,
                    event_type: 17
                }],
                db.addEvent);

            await dec.simple(db.addEvent,
                [{
                    ...params.event.staff2.event1,
                    user_id: staff2,
                    device_id: device1,
                    access_zone_id1: room1,
                    access_zone_id2: room0,
                    event_type: 65544
                }],
                db.addEvent);

            await dec.simple(db.addEvent,
                [{
                    ...params.event.staff2.event2,
                    user_id: staff2,
                    device_id: device1,
                    access_zone_id1: room2,
                    access_zone_id2: room1,
                    event_type: 65544
                }],
                db.addEvent);

            await dec.simple(db.addEvent,
                [{
                    ...params.event.staff2.event3,
                    user_id: staff2,
                    device_id: device1,
                    access_zone_id1: room1,
                    access_zone_id2: room0,
                    event_type: 65544
                }],
                db.addEvent);

            //События посетителя 1
            await dec.simple(db.addEvent,
                [{
                    ...params.event.visitor1.event1,
                    user_id: visitor1,
                    device_id: device1,
                    access_zone_id1: room1,
                    access_zone_id2: room0,
                    event_type: 17
                }],
                db.addEvent);

            await dec.simple(db.addEvent,
                [{
                    ...params.event.visitor1.event2,
                    user_id: visitor1,
                    device_id: device1,
                    access_zone_id1: room0,
                    access_zone_id2: room1,
                    event_type: 17
                }],
                db.addEvent);

            await dec.simple(db.addEvent,
                [{
                    ...params.event.visitor1.event1,
                    user_id: visitor1,
                    device_id: device1,
                    access_zone_id1: room1,
                    access_zone_id2: room0,
                    event_type: 65544
                }],
                db.addEvent);

            await dec.simple(db.addEvent,
                [{
                    ...params.event.visitor1.event2,
                    user_id: visitor1,
                    device_id: device1,
                    access_zone_id1: room0,
                    access_zone_id2: room1,
                    event_type: 65544
                }],
                db.addEvent);

            //События посетителя 2

            await dec.simple(db.addEvent,
                [{
                    ...params.event.visitor2.event1,
                    user_id: visitor2,
                    device_id: device1,
                    access_zone_id1: room1,
                    access_zone_id2: room0,
                    event_type: 17
                }],
                db.addEvent);

            await dec.simple(db.addEvent,
                [{
                    ...params.event.visitor2.event2,
                    user_id: visitor2,
                    device_id: device1,
                    access_zone_id1: room2,
                    access_zone_id2: room1,
                    event_type: 17
                }],
                db.addEvent);

            await dec.simple(db.addEvent,
                [{
                    ...params.event.visitor2.event3,
                    user_id: visitor2,
                    device_id: device1,
                    access_zone_id1: room1,
                    access_zone_id2: room0,
                    event_type: 17
                }],
                db.addEvent);

            await dec.simple(db.addEvent,
                [{
                    ...params.event.visitor2.event1,
                    user_id: visitor2,
                    device_id: device1,
                    access_zone_id1: room1,
                    access_zone_id2: room0,
                    event_type: 65544
                }],
                db.addEvent);

            await dec.simple(db.addEvent,
                [{
                    ...params.event.visitor2.event2,
                    user_id: visitor2,
                    device_id: device1,
                    access_zone_id1: room2,
                    access_zone_id2: room1,
                    event_type: 65544
                }],
                db.addEvent);

            await dec.simple(db.addEvent,
                [{
                    ...params.event.visitor2.event3,
                    user_id: visitor2,
                    device_id: device1,
                    access_zone_id1: room1,
                    access_zone_id2: room0,
                    event_type: 65544
                }],
                db.addEvent);

            // Изменение даты добавления карты
            await dec.simple(db.updateUserCard,
                [{
                    user_id: staff1,
                    identifier: params.staff.staff1.identifier[0].identifier,
                    operator_id: 1,
                    create_date: params.eventDate.event1
                }],
                db.addEvent);

            await dec.simple(db.updateUserCard,
                [{
                    user_id: staff2,
                    identifier: params.staff.staff2.identifier[0].identifier,
                    operator_id: 1,
                    create_date: params.eventDate.event1
                }],
                db.addEvent);

            await dec.simple(db.updateUserCard,
                [{
                    user_id: staff3,
                    identifier: params.staff.staff3.identifier[0].identifier,
                    operator_id: 1,
                    create_date: params.dateCard
                }],
                db.addEvent);

            await dec.simple(db.updateUserCard,
                [{
                    user_id: visitor1,
                    identifier: params.visitor.visitor1.identifier[0].identifier,
                    operator_id: 1,
                    create_date: params.eventDate.event1
                }],
                db.addEvent);

            await dec.simple(db.updateUserCard,
                [{
                    user_id: visitor2,
                    identifier: params.visitor.visitor2.identifier[0].identifier,
                    operator_id: 1,
                    create_date: params.eventDate.event1
                }],
                db.addEvent);

            await dec.simple(db.updateUserCard,
                [{
                    user_id: visitor3,
                    identifier: params.visitor.visitor3.identifier[0].identifier,
                    operator_id: 1,
                    create_date: params.dateCard
                }],
                db.addEvent);
        });
    });
});

const deleteDataControlAccess = () => describe('Удаление данных для тестетирование отчетов раздела Котроль доступа',
    () => {
        const params = {...dataControlAccess}

        bef();
        aft();

        it('Удаление проходов сотрудникам', async () => {
            const cook = await page.base.getCookie('token');
            const arrStaff = await api.getStaff(cook.text);
            const staff1 = arrStaff.text.filter(obj => obj.name === params.fio.staff1)[0].id;
            const staff2 = arrStaff.text.filter(obj => obj.name === params.fio.staff2)[0].id;
            const staff3 = arrStaff.text.filter(obj => obj.name === params.fio.staff3)[0].id;

            //Удаление событий у сотрудника 1
            await dec.simple(db.deleteEventFioId,
                [staff1],
                db.deleteEventFioId);

            //Удаление событий у сотрудника 2
            await dec.simple(db.deleteEventFioId,
                [staff2],
                db.deleteEventFioId);

            //Удаление событий у сотрудника 3
            await dec.simple(db.deleteEventFioId,
                [staff3],
                db.deleteEventFioId);
        });

        it('Удаление проходов посетителям', async () => {
            const cook = await page.base.getCookie('token');
            const arrVisitor = await api.getVisitor(cook.text);
            const visitor1 = arrVisitor.text.filter(obj => obj.name === params.fio.visitor1)[0].id;
            const visitor2 = arrVisitor.text.filter(obj => obj.name === params.fio.visitor2)[0].id;
            const visitor3 = arrVisitor.text.filter(obj => obj.name === params.fio.visitor3)[0].id;

            //Удаление событий у посетителя 1
            await dec.simple(db.deleteEventFioId,
                [visitor1],
                db.deleteEventFioId);

            //Удаление событий у посетителя 2
            await dec.simple(db.deleteEventFioId,
                [visitor2],
                db.deleteEventFioId);

            //Удаление событий у посетителя 3
            await dec.simple(db.deleteEventFioId,
                [visitor3],
                db.deleteEventFioId);
        });

        it('Удаление сотрудников', async () => {
            const cook = await page.base.getCookie('token');
            const arrStaff = await api.getStaff(cook.text);
            const staff1 = arrStaff.text.filter(obj => obj.name === params.fio.staff1)[0].id;
            const staff2 = arrStaff.text.filter(obj => obj.name === params.fio.staff2)[0].id;
            const staff3 = arrStaff.text.filter(obj => obj.name === params.fio.staff3)[0].id;

            await dec.simple(db.deleteUser,
                [staff1],
                db.deleteUser);

            await dec.simple(db.deleteUser,
                [staff2],
                db.deleteUser);

            await dec.simple(db.deleteUser,
                [staff3],
                db.deleteUser);

            /*        await dec.simple(api.deleteStaff,
                        [[staff1, staff2, staff3], cook.text],
                        api.deleteStaff);*/
        });

        it('Удаление посетителей', async () => {
            const cook = await page.base.getCookie('token');
            const arrVisitor = await api.getVisitor(cook.text);
            const visitor1 = arrVisitor.text.filter(obj => obj.name === params.fio.visitor1)[0].id;
            const visitor2 = arrVisitor.text.filter(obj => obj.name === params.fio.visitor2)[0].id;
            const visitor3 = arrVisitor.text.filter(obj => obj.name === params.fio.visitor3)[0].id;

            await dec.simple(db.deleteUser,
                [visitor1],
                db.deleteUser);

            await dec.simple(db.deleteUser,
                [visitor2],
                db.deleteUser);

            await dec.simple(db.deleteUser,
                [visitor3],
                db.deleteUser);

            /*        await dec.simple(api.deleteVisitor,
                        [[visitor1, visitor2, visitor3], cook.text],
                        api.deleteVisitor);*/
        });

        it('Удаление должностей', async () => {
            const cook = await page.base.getCookie('token');
            const arrPosition = await api.getPosition(cook.text);
            const position1 = arrPosition.text.filter(obj => obj.name === params.positions.position1.name)[0].id;
            const position2 = arrPosition.text.filter(obj => obj.name === params.positions.position2.name)[0].id;
            const position3 = arrPosition.text.filter(obj => obj.name === params.positions.position3.name)[0].id;

            await dec.simple(api.deletePosition,
                [[position1, position2, position3], cook.text],
                api.deletePosition)
        });

        it('Удаление шаблонов доступа', async () => {
            const cook = await page.base.getCookie('token');
            const arrTemplate = await api.getTemplate(cook.text);
            console.log(arrTemplate);
            const template1 = arrTemplate.text.filter(obj => obj.name === params.templates.template1)[0].id;
            const template2 = arrTemplate.text.filter(obj => obj.name === params.templates.template2)[0].id;
            const template3 = arrTemplate.text.filter(obj => obj.name === params.templates.template3)[0].id;
            console.log(template1)
            await dec.simple(api.deleteTemplate,
                [[template1, template2, template3], cook.text],
                api.deleteTemplate);
        });

        it('Удаление подразделений', async () => {
            const cook = await page.base.getCookie('token');
            const arrDivision = await api.getDivision(cook.text);
            const division1 = arrDivision.text.filter(obj => obj.name === params.divisions.division1.name)[0].id;
            const division2 = arrDivision.text.filter(obj => obj.name === params.divisions.division2.name)[0].id;
            const division3 = arrDivision.text.filter(obj => obj.name === params.divisions.division3.name)[0].id;

            await dec.simple(api.deleteDivision,
                [[division1, division2, division3], cook.text],
                api.deleteDivision);
        });

        decItApi.deleteDeviceInRoom({
            ip: params.devices.device1.ip
        });
        decItApi.deleteDeviceInRoom({
            ip: params.devices.device2.ip,
        });
        decItApi.deleteDeviceInRoom({
            ip: params.devices.device3.ip,
        });

        decItApi.deleteDevice({
            ip: params.devices.device1.ip
        });
        decItApi.deleteDevice({
            ip: params.devices.device2.ip,
        });
        decItApi.deleteDevice({
            ip: params.devices.device3.ip,
        });

        decItApi.deleteRoom({
            room: params.rooms.room3
        });
        decItApi.deleteRoom({
            room: params.rooms.room2
        });
        decItApi.deleteRoom({
            room: params.rooms.room1
        });

    });

const dataStaff = {
    rooms: {
        room1: 'room1',
        room2: 'room2',
        room3: 'room3'
    },
    devices: {
        device1: {
            name: 'Контроллер замка CL05',
            ip: '10.10.5.10',
            obj: {
                "device_type": 16,
                "ip_addr": "10.10.5.10",
                "mac_addr": "02:42:2f:97:86:32"
            }
        },
        device2: {
            name: 'Контроллер CL15',
            ip: '10.10.5.2',
            obj: {
                "device_type": 902,
                "ip_addr": "10.10.5.2",
                "mac_addr": "02:42:2f:97:86:40"
            }
        },
        device3: {
            name: 'ЛИКОН 2',
            ip: '10.10.5.9',
            obj: {
                "device_type": 65,
                "ip_addr": "10.10.5.9",
                "mac_addr": "02:42:2f:97:86:33"
            }
        }
    },
    divisions: {
        division1: {
            parent_id: 0,
            name: 'division1',
        },
        division2: {
            parent_id: 0,
            name: 'division2',
        },
        division3: {
            parent_id: 0,
            name: 'division3',
        },
    },
    positions: {
        position1: {
            name: 'position1',
            comment: ''
        },
        position2: {
            name: 'position2',
            comment: ''
        },
        position3: {
            name: 'position3',
            comment: ''
        },
    },
    templates: {
        template1: 'template1',
        template2: 'template2',
        template3: 'template3',
    },
    template: (name, zone1Id, zone2Id, zone3Id) => {
        return {
            "name": `${name}`,
            "comment": '',
            "access": [
                {
                    "access_zone_id": zone1Id,
                    "template_type":0,
                    "rights": {
                        "is_guard":0,
                        "is_antipass":0,
                        "is_verify":0,
                        "right_type": 1,
                        "schedule_id": 2,
                        "schedule_type_id": 1,
                        "commission_type":0,
                        "commission_group_1":0,
                        "commission_group_2":0,
                        "verify_po_schedule":0,
                        "verify_vvu_schedule":0,
                        "verify_pdu_schedule":0,
                        "verify_alcobarier_schedule":0

                    }
                },
                {
                    "access_zone_id": zone2Id,
                    "template_type":0,
                    "rights": {
                        "is_guard":0,
                        "is_antipass":0,
                        "is_verify":0,
                        "right_type": 1,
                        "schedule_id": 2,
                        "schedule_type_id": 1,
                        "commission_type":0,
                        "commission_group_1":0,
                        "commission_group_2":0,
                        "verify_po_schedule":0,
                        "verify_vvu_schedule":0,
                        "verify_pdu_schedule":0,
                        "verify_alcobarier_schedule":0

                    }
                },
                {
                    "access_zone_id": zone3Id,
                    "template_type":0,
                    "rights": {
                        "is_guard":0,
                        "is_antipass":0,
                        "is_verify":0,
                        "right_type": 1,
                        "schedule_id": 2,
                        "schedule_type_id": 1,
                        "commission_type":0,
                        "commission_group_1":0,
                        "commission_group_2":0,
                        "verify_po_schedule":0,
                        "verify_vvu_schedule":0,
                        "verify_pdu_schedule":0,
                        "verify_alcobarier_schedule":0

                    }
                },
            ]
        }
    },
    schedules: {
        schedule1: {
            name: 'schedule1',
            comment: '',
            work_schedule_type_id: 4
        },
        schedule2: {
            name: 'schedule2',
            comment: '',
            work_schedule_type_id: 4
        },
        schedule3: {
            name: 'schedule3',
            comment: '',
            work_schedule_type_id: 4
        }
    },
    additionalData: {
        data1Text: {
            name: 'data1',
            comment: '',
            type_id: 1,
            default_value: '',
            items: ''
        },
        data2Graf: {
            name: 'data2',
            comment: '',
            type_id: 2,
            default_value: '',
            items: ''
        },
        data3Select: {
            name: 'data3',
            comment: '',
            type_id: 9,
            default_value: '',
            items: JSON.stringify([...Array(8).keys()].map(item => {
                return {name: 'select' + (item + 1)}
            }))
        },
        data4Checkbox: {
            name: 'data4',
            comment: '',
            type_id: 8,
            default_value: '',
            items: ''
        },
        data5Date: {
            name: 'data5',
            comment: '',
            type_id: 10,
            default_value: '',
            items: ''
        },
        data6DateTime: {
            name: 'data6',
            comment: '',
            type_id: 11,
            default_value: '',
            items: ''
        }
    },
    staff: {
        staff1: {
            firstName: 'name1',
            middleName: 'middle1',
            lastName: 'last1',
            fio: 'last1 name1 middle1',
            phone: '+79819314277',
            mail: 'zybrik0007@rambler.ru',
            dateBirthday: {
                day: '1',
                month: 'Июнь',
                year: '2023',
                date: '2023-06-01'
            },
            tabelNumber: 'tabel1',
            date: {
                day: '1',
                month: 'Июнь',
                year: '2023',
                date: '2023-06-01'
            },
            dateIn: {
                day: '1',
                month: 'Июнь',
                year: '2023',
                date: '2023-06-01 00:00'
            },
            dateAfter: {
                day: '1',
                month: 'Июнь',
                year: '2033',
                date: '2033-06-01 23:00'
            },
            division: 'division1',
            position: 'position1',
            schedule: 'schedule1',
            template: {
                template1: 'template1',
                template2: 'template2'
            },
            pinCode: 'test-123456',
            data1: 'testtext',
            data2: 'data2',
            data3: 'select1',
            data4: 'Да',
            data5: {
                day: '1',
                month: 'Июнь',
                year: '2023',
                date: '2023-06-01'
            },
            data6: {
                day: '1',
                month: 'Июнь',
                year: '2023',
                date: '2023-06-01 00:00'
            },
            card: {
                arr: ['2', '3', '4', '5', '6', '7', '8', '9', '10'],
                card1: '1',
                card2: '2',
                card3: '3',
                card4: '4',
                card5: '5',
                card6: '6',
                card7: '7',
                card8: '8',
                card9: '9',
                card10: '10',
            },
            barcode: '2184201005502',
            ts: {
                arrTS: [
                    {
                        number: 'abc123',
                        model: 'xyz123'
                    },
                    {
                        number: 'abc1234',
                        model: 'xyz1234'
                    },
                    {
                        number: 'abc12345',
                        model: 'xyz12345'
                    },
                    {
                        number: 'abc12346',
                        model: 'xyz123456'
                    }],
                ts1: {
                    number: 'abc123',
                    model: 'xyz123'
                },
                ts2: {
                    number: 'abc1234',
                    model: 'xyz1234'
                },
                ts3: {
                    number: 'abc12345',
                    model: 'xyz12345'
                },
                ts4: {
                    number: 'abc12346',
                    model: 'xyz123456'
                }
            },
            documentSupport: {
                name: 'К/6 - Служебная командировка',
                number: 'Alex1990',
                dateIn: new Date().toLocaleDateString('fr-ca'),
                dateAfter: new Date().toLocaleDateString('fr-ca')
            },
            license: {
                type: 'Водительское удостоверение',
                series: '3333',
                number: '4444',
                birthplace: 'SPB',
                issue: 'FSB',
                dateIn: {
                    day: '1',
                    month: 'Июль',
                    year: '2023',
                    date: '2023-07-01'
                },
                dateOut: {
                    day: '2',
                    month: 'Июль',
                    year: '2023',
                    date: '2023-07-02'
                },
            },
            dateDimissed: 'Уволен с 01 июня 2023',
            bd: {
                last_name: 'last1',
                first_name: 'name1',
                middle_name: 'middle1',
                tabel_number: '1',
                hiring_date: '2023-01-01',
                division: 'division1',
                begin_datetime: '2023-01-01 00:00:00',
                end_datetime: '2033-01-01 00:00:00',
                identifier: [{identifier:"1", is_universal: true}],
            }
        },
        staff2: {
            firstName: 'name2',
            middleName: 'middle2',
            lastName: 'last2',
            fio: 'last2 name2 middle2',
            phone: '+79110228999',
            mail: 'zybrik007@gmail.com',
            dateBirthday: {
                day: '1',
                month: 'Июль',
                year: '2023',
                date: '2023-07-01'
            },
            tabelNumber: 'tabel1',
            date: {
                day: '1',
                month: 'Июль',
                year: '2023',
                date: '2023-07-01'
            },
            dateIn: {
                day: '1',
                month: 'Июль',
                year: '2023',
                date: '2023-07-01 00:00'
            },
            dateAfter: {
                day: '1',
                month: 'Июль',
                year: '2033',
                date: '2033-07-01 23:00'
            },
            division: 'division2',
            position: 'position2',
            schedule: 'schedule2',
            template: {
                template1: 'template2',
                template2: 'template3'
            },
            pinCode: 'test-789',
            data1: 'testtextUpdate',
            data2: 'data2',
            data3: 'select8',
            data4: 'Нет',
            data5: {
                day: '1',
                month: 'Июль',
                year: '2023',
                date: '2023-07-01'
            },
            data6: {
                day: '1',
                month: 'Июль',
                year: '2023',
                date: '2023-07-01 00:00'
            },
            card: {
                arr: ['12', '13', '14', '15', '16', '17', '18', '19', '20'],
                card1: '11',
                card2: '12',
                card3: '13',
                card4: '14',
                card5: '15',
                card6: '16',
                card7: '17',
                card8: '18',
                card9: '19',
                card10: '20',
            },
            barcode: '9825684626442',
            documentSupport: {
                name: 'ОВ/27 - Дополнительные выходные дни (оплачиваемые)',
                number: 'qwerty123',
                dateIn: new Date().toLocaleDateString('fr-ca'),
                dateAfter: new Date().toLocaleDateString('fr-ca')
            },
            passport: {
                type: 'Паспорт',
                series: '1111',
                number: '222222',
                birthplace: 'Magadan',
                issue: 'police',
                dateIn: {
                    day: '1',
                    month: 'Июль',
                    year: '2023',
                    date: '2023-07-01'
                },
                dateOut: {
                    day: '2',
                    month: 'Июль',
                    year: '2023',
                    date: '2023-07-02'
                },
                code: '002',
                gender: 'Мужской'
            },
            ts: {
                arrTS: [
                    {
                        number: 'xxx456',
                        model: 'yyy456'
                    },
                    {
                        number: 'xxx4567',
                        model: 'yyy4567'
                    },
                    {
                        number: 'xxx45678',
                        model: 'yyy45678'
                    },
                    {
                        number: 'xxx456789',
                        model: 'yyy456789'
                    }],
                ts1: {
                    number: 'xxx456',
                    model: 'yyy456'
                },
                ts2: {
                    number: 'xxx4567',
                    model: 'yyy4567'
                },
                ts3: {
                    number: 'xxx45678',
                    model: 'yyy45678'
                },
                ts4: {
                    number: 'xxx456789',
                    model: 'yyy456789'
                }
            },
            bd: {
                last_name: 'last2',
                first_name: 'name2',
                middle_name: 'middle2',
                tabel_number: '2',
                hiring_date: '2023-02-01',
                division: 'division2',
                begin_datetime: '2023-01-01 00:00:00',
                end_datetime: '2033-01-01 00:00:00',
                identifier: [{identifier:"2", is_universal: true}],
            }
        },
        staff3: {
            firstName: 'name3',
            lastName: 'last3',
            tabelNumber: 'tabel3',
            date: {
                day: '1',
                month: 'Июнь',
                year: '2023',
                date: '2023-06-01'
            },
            dateIn: {
                day: '1',
                month: 'Июнь',
                year: '2023',
                date: '2023-06-01 00:00'
            },
            dateAfter: {
                day: '1',
                month: 'Июнь',
                year: '2033',
                date: '2033-06-01 23:00'
            },
            division: 'division3',
            card: '21',
            barcode: '1462846716368'
        },
    },
    today: new Date().toLocaleDateString('fr-ca'),
    yesterday: new Date(Date.now() - 86400000).toLocaleDateString('fr-ca'),
    tomorrow: new Date(Date.now() + 86400000).toLocaleDateString('fr-ca'),
    date: {
        day: '1',
        month: 'Июль',
        year: '2023'
    }
}

const addDataStaffFilter = () => describe('Добавление данных для тестирвоания фильтров подразделов: ' +
    'Персонал / Сотрудники, Бюро пропусков / Сотрудники.', () => {

    const params = {...dataStaff}

    bef();
    aft();

    describe('Добавление сотрудников', () => {
        it(`Добавление сотрудника "${params.staff.staff1.fio}".`, async () => {
            const cook = await page.base.getCookie('token');
            const arrDivision = await api.getDivision(cook.text);
            const divisionId = arrDivision.text.filter(obj => obj.name === params.staff.staff1.division)[0].id;
            const staff = {
                ...params.staff.staff1.bd,
                division: divisionId,
            }
            await dec.simple(api.putStaff,
                [[staff], cook.text],
                api.putStaff);
        });

        it(`Добавление сотрудника "${params.staff.staff2.fio}".`, async () => {
            const cook = await page.base.getCookie('token');
            const arrDivision = await api.getDivision(cook.text);
            const divisionId = arrDivision.text.filter(obj => obj.name === params.staff.staff2.division)[0].id;
            const staff = {
                ...params.staff.staff2.bd,
                division: divisionId,
            }
            await dec.simple(api.putStaff,
                [[staff], cook.text],
                api.putStaff);
        });
    });

});

const deleteDataStaffFilter = () => describe('Удаление данных для тестирвоания фильтров подразделов: ' +
    'Персонал / Сотрудники, Бюро пропусков / Сотрудники.', () => {

    const params = {...dataStaff}

    bef();
    aft();

    it('Удаление сотрудников', async () => {
        const cook = await page.base.getCookie('token');
        const arrStaff = await api.getStaff(cook.text);
        console.log('arrStaff', arrStaff)
        const staff1 = arrStaff.text.filter(obj => obj.name === params.staff.staff1.fio)[0].id;
        const staff2 = arrStaff.text.filter(obj => obj.name ===params.staff.staff2.fio)[0].id;

        await dec.simple(db.deleteUser,
            [staff1],
            db.deleteUser);

        await dec.simple(db.deleteUser,
            [staff2],
            db.deleteUser);
    });
});

const addDataStaff = () => describe('Добавление данных для тестирования подразделов Персонал/Сотрудники, ' +
    'Бюро пропусков/Сотрудники', () => {

    const params = {...dataStaff}

    bef();
    aft();

    describe('Добавление помещений', () => {
        decItApi.addRoomParent({
            room: params.rooms.room1
        });
        decItApi.addRoomChild({
            child: params.rooms.room2,
            parent: params.rooms.room1
        });
        decItApi.addRoomChild({
            child: params.rooms.room3,
            parent: params.rooms.room2
        });
    });

    describe('Добавление устройств', () => {
        decItApi.addDevice(params.devices.device1.obj);
        decItApi.addDevice(params.devices.device2.obj);
        decItApi.addDevice(params.devices.device3.obj);
    });

    describe('Добавление устройств в помещение', () => {
        decItApi.addDeviceInRoom({
            device: params.devices.device1.ip,
            room: params.rooms.room1
        });
        decItApi.addDeviceInRoom({
            device: params.devices.device2.ip,
            room: params.rooms.room2
        });
        decItApi.addDeviceInRoom({
            device: params.devices.device3.ip,
            room: params.rooms.room3
        });
    });

    describe('Добавление подразделений', () => {
        decItApi.addDivision(params.divisions.division1);
        decItApi.addDivision(params.divisions.division2);
        decItApi.addDivision(params.divisions.division3);
    });

    describe('Добавление должностей', () => {
        decItApi.addPosition(params.positions.position1);
        decItApi.addPosition(params.positions.position2);
        decItApi.addPosition(params.positions.position3);
    });

    describe('Добавление шаблонов доступа', () => {
        it(`Добавление шаблона доступа "${params.templates.template1}"`, async () => {
            const cook = await page.base.getCookie('token');
            const arrZone = await api.getRoom(cook.text);
            const id1 = arrZone.text.filter(obj => obj.name === params.rooms.room1)[0].id;
            const id2 = arrZone.text.filter(obj => obj.name === params.rooms.room2)[0].id;
            const id3 = arrZone.text.filter(obj => obj.name === params.rooms.room3)[0].id;
            const template = params.template(params.templates.template1, id1, id2, id3);
            await dec.simple(api.putAccessTemplate,
                [[template], cook.text],
                api.putAccessTemplate);
        });

        it(`Добавление шаблона доступа "${params.templates.template2}"`, async () => {
            const cook = await page.base.getCookie('token');
            const arrZone = await api.getRoom(cook.text);
            const id1 = arrZone.text.filter(obj => obj.name === params.rooms.room1)[0].id;
            const id2 = arrZone.text.filter(obj => obj.name === params.rooms.room2)[0].id;
            const id3 = arrZone.text.filter(obj => obj.name === params.rooms.room3)[0].id;
            const template = params.template(params.templates.template2, id1, id2, id3);
            await dec.simple(api.putAccessTemplate,
                [[template], cook.text],
                api.putAccessTemplate);
        });

        it(`Добавление шаблона доступа "${params.templates.template3}"`, async () => {
            const cook = await page.base.getCookie('token');
            const arrZone = await api.getRoom(cook.text);
            const id1 = arrZone.text.filter(obj => obj.name === params.rooms.room1)[0].id;
            const id2 = arrZone.text.filter(obj => obj.name === params.rooms.room2)[0].id;
            const id3 = arrZone.text.filter(obj => obj.name === params.rooms.room3)[0].id;
            const template = params.template(params.templates.template3, id1, id2, id3);
            await dec.simple(api.putAccessTemplate,
                [[template], cook.text],
                api.putAccessTemplate);
        });
    });

    describe('Добавление графиков работы', () => {
        it(`Добавление графика работы "${params.schedules.schedule1.name}"`, async () => {
            const cook = await page.base.getCookie('token');
            await dec.simple(api.putSchedule,
                [[params.schedules.schedule1], cook.text],
                api.putSchedule);
        });

        it(`Добавление графика работы "${params.schedules.schedule2.name}"`, async () => {
            const cook = await page.base.getCookie('token');
            await dec.simple(api.putSchedule,
                [[params.schedules.schedule2], cook.text],
                api.putSchedule);
        });

        it(`Добавление графика работы "${params.schedules.schedule3.name}"`, async () => {
            const cook = await page.base.getCookie('token');
            await dec.simple(api.putSchedule,
                [[params.schedules.schedule3], cook.text],
                api.putSchedule);
        });
    });

    describe('Добавление дополнительных данных', () => {
        decItApi.addAdditionalData({
           params: params.additionalData.data1Text,
            qs: 'staff'
        });

        decItApi.addAdditionalData({
            params: params.additionalData.data2Graf,
            qs: 'staff'
        });

        decItApi.addAdditionalData({
            params: params.additionalData.data3Select,
            qs: 'staff'
        });

        decItApi.addAdditionalData({
            params: params.additionalData.data4Checkbox,
            qs: 'staff'
        });

        decItApi.addAdditionalData({
            params: params.additionalData.data5Date,
            qs: 'staff'
        });

        decItApi.addAdditionalData({
            params: params.additionalData.data6DateTime,
            qs: 'staff'
        });
    });

});

const deleteDataStaff = () => describe('Удаление данных для тестирования подразделов Персонал/Сотрудники, ' +
    'Бюро пропусков/Сотрудники', () => {
    const params = {...dataStaff}

    bef();
    aft();

    it('Удаление должностей', async () => {
        const cook = await page.base.getCookie('token');
        const arrPosition = await api.getPosition(cook.text);
        const position1 = arrPosition.text.filter(obj => obj.name === params.positions.position1.name)[0].id;
        const position2 = arrPosition.text.filter(obj => obj.name === params.positions.position2.name)[0].id;
        const position3 = arrPosition.text.filter(obj => obj.name === params.positions.position3.name)[0].id;

        await dec.simple(api.deletePosition,
            [[position1, position2, position3], cook.text],
            api.deletePosition)
    });

    it('Удаление шаблонов доступа', async () => {
        const cook = await page.base.getCookie('token');
        const arrTemplate = await api.getTemplate(cook.text);
        console.log(arrTemplate);
        const template1 = arrTemplate.text.filter(obj => obj.name === params.templates.template1)[0].id;
        const template2 = arrTemplate.text.filter(obj => obj.name === params.templates.template2)[0].id;
        const template3 = arrTemplate.text.filter(obj => obj.name === params.templates.template3)[0].id;
        console.log(template1)
        await dec.simple(api.deleteTemplate,
            [[template1, template2, template3], cook.text],
            api.deleteTemplate);
    });

    it('Удаление подразделений', async () => {
        const cook = await page.base.getCookie('token');
        const arrDivision = await api.getDivision(cook.text);
        const division1 = arrDivision.text.filter(obj => obj.name === params.divisions.division1.name)[0].id;
        const division2 = arrDivision.text.filter(obj => obj.name === params.divisions.division2.name)[0].id;
        const division3 = arrDivision.text.filter(obj => obj.name === params.divisions.division3.name)[0].id;

        await dec.simple(api.deleteDivision,
            [[division1, division2, division3], cook.text],
            api.deleteDivision);
    });

    decItApi.deleteDeviceInRoom({
        ip: params.devices.device1.ip
    });
    decItApi.deleteDeviceInRoom({
        ip: params.devices.device2.ip,
    });
    decItApi.deleteDeviceInRoom({
        ip: params.devices.device3.ip,
    });

    decItApi.deleteDevice({
        ip: params.devices.device1.ip
    });
    decItApi.deleteDevice({
        ip: params.devices.device2.ip,
    });
    decItApi.deleteDevice({
        ip: params.devices.device3.ip,
    });

    decItApi.deleteRoom({
        room: params.rooms.room3
    });
    decItApi.deleteRoom({
        room: params.rooms.room2
    });
    decItApi.deleteRoom({
        room: params.rooms.room1
    });

    decItApi.deleteSchedule({
        name: params.schedules.schedule1.name
    });
    decItApi.deleteSchedule({
        name: params.schedules.schedule2.name
    });
    decItApi.deleteSchedule({
        name: params.schedules.schedule3.name
    });

    decItApi.deleteAdditionalData({
        name: params.additionalData.data1Text.name,
        qs: 'staff'
    });
    decItApi.deleteAdditionalData({
        name: params.additionalData.data2Graf.name,
        qs: 'staff'
    });
    decItApi.deleteAdditionalData({
        name: params.additionalData.data3Select.name,
        qs: 'staff'
    });
    decItApi.deleteAdditionalData({
        name: params.additionalData.data4Checkbox.name,
        qs: 'staff'
    });
    decItApi.deleteAdditionalData({
        name: params.additionalData.data5Date.name,
        qs: 'staff'
    });
    decItApi.deleteAdditionalData({
        name: params.additionalData.data6DateTime.name,
        qs: 'staff'
    });
});

const dataSchedule = {
    rooms: {
        room1: 'room1',
        room2: 'room2',
        room3: 'room3'
    },
    devices: {
        device1: {
            name: 'Контроллер замка CL05',
            ip: '10.10.5.10',
            obj: {
                "device_type": 16,
                "ip_addr": "10.10.5.10",
                "mac_addr": "02:42:2f:97:86:32"
            }
        },
        device2: {
            name: 'Контроллер CL15',
            ip: '10.10.5.2',
            obj: {
                "device_type": 902,
                "ip_addr": "10.10.5.2",
                "mac_addr": "02:42:2f:97:86:40"
            }
        },
        device3: {
            name: 'ЛИКОН 2',
            ip: '10.10.5.9',
            obj: {
                "device_type": 65,
                "ip_addr": "10.10.5.9",
                "mac_addr": "02:42:2f:97:86:33"
            }
        }
    },
    weekly1: {
        name: 'weeklyName1',
        description: 'weeklyDescription1',
        intervals: {
            day1: {
                name: 'Понедельник',
                time: 'Рабочее время 23ч 59м',
                interval1: {
                    begin: '00:00',
                    end: '23:59'
                },
            },
            day2: {
                name: 'Вторник',
                time: 'Рабочее время 23ч 59м',
                interval1: {
                    begin: '00:00',
                    end: '23:59'
                },
            },
            day3: {
                name: 'Среда',
                time: 'Рабочее время 23ч 59м',
                interval1: {
                    begin: '00:00',
                    end: '23:59'
                },
            },
            day4: {
                name: 'Четверг',
                time: 'Рабочее время 00ч 00м',
            },
            day5: {
                name: 'Пятница',
                time: 'Рабочее время 08ч 00м',
                interval1: {
                    begin: '09:00',
                    end: '11:00'
                },
                interval2: {
                    begin: '12:00',
                    end: '14:00'
                },
                interval3: {
                    begin: '15:00',
                    end: '17:00'
                },
                interval4: {
                    begin: '18:00',
                    end: '20:00'
                },
            },
            day6: {
                name: 'Суббота',
                time: 'Рабочее время 08ч 00м',
                interval1: {
                    begin: '09:00',
                    end: '11:00'
                },
                interval2: {
                    begin: '12:00',
                    end: '14:00'
                },
                interval3: {
                    begin: '15:00',
                    end: '17:00'
                },
                interval4: {
                    begin: '18:00',
                    end: '20:00'
                },
            },
            day7: {
                name: 'Воскресенье',
                time: 'Рабочее время 08ч 00м',
                interval1: {
                    begin: '09:00',
                    end: '11:00'
                },
                interval2: {
                    begin: '12:00',
                    end: '14:00'
                },
                interval3: {
                    begin: '15:00',
                    end: '17:00'
                },
                interval4: {
                    begin: '18:00',
                    end: '20:00'
                },
            },
        },
        setting: {
            holiday: false,
            firstEntranceAndLastExit: false,
            arrival: {
                hour: '00',
                minute: '00'
            },
            less: {
                hour: '00',
                minute: '00'
            },
            early: {
                hour: '00',
                minute: '00'
            },
            overtime: {
                hour: '00',
                minute: '00'
            },
        },
        db: {
            "name": "weeklyName1",
            "work_schedule_type_id": 2,
            "comment": "weeklyDescription1",
            "allow_coming_later": "00:00",
            "allow_leaving_before": "00:00",
            "overtime": "00:00",
            "undertime": "00:00",
            "allow_breaks": "00:00",
            "begin_date": "2024-02-08",
            "week_hours": "40:00",
            "worktime_begin": "00:00",
            "worktime_end": "23:59",
            "control_coming_before": "00:00",
            "control_leaving_later": "00:00",
            "balance_stored": "00:00",
            "intervals": [
                {
                    desc:"Понедельник",
                    "intervals": [
                        {
                            "begin": 0,
                            "end": 86340,
                            "type": 3
                        }
                    ],
                    title: "Рабочее время: 23ч 59м"
                },
                {
                    desc:"Вторник",
                    "intervals": [
                        {
                            "begin": 0,
                            "end": 86340,
                            "type": 3
                        }
                    ],
                    title: "Рабочее время: 23ч 59м"
                },
                {
                    desc:"Среда",
                    "intervals": [
                        {
                            "begin": 0,
                            "end": 86340,
                            "type": 3
                        }
                    ],
                    title: "Рабочее время: 23ч 59м"
                },
                {
                    desc: "Четверг",
                    "intervals": [],
                    title: "Рабочее время: 00ч 00м"
                },
                {
                    desc: "Пятница",
                    "intervals": [
                        {
                            "begin": 32400,
                            "end": 39600,
                            "type": 1
                        },
                        {
                            "begin": 43200,
                            "end": 50400,
                            "type": 0
                        },
                        {
                            "begin": 54000,
                            "end": 61200,
                            "type": 0
                        },
                        {
                            "begin": 64800,
                            "end": 72000,
                            "type": 2
                        },
                    ],
                    title: "Рабочее время: 08ч 00м"
                },
                {
                    desc: "Суббота",
                    "intervals": [
                        {
                            "begin": 32400,
                            "end": 39600,
                            "type": 1
                        },
                        {
                            "begin": 43200,
                            "end": 50400,
                            "type": 0
                        },
                        {
                            "begin": 54000,
                            "end": 61200,
                            "type": 0
                        },
                        {
                            "begin": 64800,
                            "end": 72000,
                            "type": 2
                        }
                    ],
                    title: "Рабочее время: 08ч 00м"
                },
                {
                    desc: "Воскресенье",
                    "intervals": [
                        {
                            "begin": 32400,
                            "end": 39600,
                            "type": 1
                        },
                        {
                            "begin": 43200,
                            "end": 50400,
                            "type": 0
                        },
                        {
                            "begin": 54000,
                            "end": 61200,
                            "type": 0
                        },
                        {
                            "begin": 64800,
                            "end": 72000,
                            "type": 2
                        }
                    ],
                    title: "Рабочее время: 08ч 00м"
                }
            ]
        }
    },
    weekly2: {
        name: 'weeklyName2',
        description: 'weeklyDescription2',
        rooms: {
            room1: {
                name: 'room1',
                work: true,
                noWork: false
            },
            room2: {
                name: 'room2',
                work: false,
                noWork: true
            },
            room3: {
                name: 'room3',
                work: true,
                noWork: false
            }
        },
        intervals: {
            day1: {
                name: 'Понедельник',
                time: 'Рабочее время: 01ч 00м',
                interval1: {
                    begin: '08:00',
                    end: '09:00'
                },
            },
            day2: {
                name: 'Вторник',
                time: 'Рабочее время: 00ч 00м',
            },
            day3: {
                name: 'Среда',
                time: 'Рабочее время: 12ч 00м',
                interval1: {
                    begin: '08:00',
                    end: '20:00'
                },
            },
            day4: {
                name: 'Четверг',
                time: 'Рабочее время: 00ч 00м',
                interval1: {
                    begin: '00:00',
                    end: '00:00'
                },
            },
            day5: {
                name: 'Пятница',
                time: 'Рабочее время: 18ч 59м',
                interval1: {
                    begin: '00:00',
                    end: '05:00'
                },
                interval2: {
                    begin: '08:00',
                    end: '17:00'
                },
                interval3: {
                    begin: '19:00',
                    end: '23:59'
                },
            },
            day6: {
                name: 'Суббота',
                time: 'Рабочее время: 01ч 59м',
                interval1: {
                    begin: '00:00',
                    end: '01:00'
                },
                interval2: {
                    begin: '23:00',
                    end: '23:59'
                },
            },
            day7: {
                name: 'Воскресенье',
                time: 'Рабочее время: 19ч 59м',
                interval1: {
                    begin: '00:00',
                    end: '05:00'
                },
                interval2: {
                    begin: '08:00',
                    end: '17:00'
                },
                interval3: {
                    begin: '19:00',
                    end: '23:59'
                },
            },
        },
        setting: {
            holiday: true,
            firstEntranceAndLastExit: true,
            arrival: {
                hour: '23',
                minute: '59'
            },
            less: {
                hour: '23',
                minute: '59'
            },
            early: {
                hour: '23',
                minute: '59'
            },
            overtime: {
                hour: '23',
                minute: '59'
            },
        },
        db: {
            "name": "weeklyName2",
            "work_schedule_type_id": 2,
            "comment": "weeklyDescription1",
            "allow_coming_later": "00:00",
            "allow_leaving_before": "00:00",
            "overtime": "00:00",
            "undertime": "00:00",
            "allow_breaks": "00:00",
            "begin_date": "2024-02-08",
            "week_hours": "40:00",
            "worktime_begin": "00:00",
            "worktime_end": "23:59",
            "control_coming_before": "00:00",
            "control_leaving_later": "00:00",
            "balance_stored": "00:00",
            "intervals": [
                {
                    desc:"Понедельник",
                    "intervals": [
                        {
                            "begin": 0,
                            "end": 86340,
                            "type": 3
                        }
                    ],
                    title: "Рабочее время: 23ч 59м"
                },
                {
                    desc:"Вторник",
                    "intervals": [
                        {
                            "begin": 0,
                            "end": 86340,
                            "type": 3
                        }
                    ],
                    title: "Рабочее время: 23ч 59м"
                },
                {
                    desc:"Среда",
                    "intervals": [
                        {
                            "begin": 0,
                            "end": 86340,
                            "type": 3
                        }
                    ],
                    title: "Рабочее время: 23ч 59м"
                },
                {
                    desc: "Четверг",
                    "intervals": [],
                    title: "Рабочее время: 00ч 00м"
                },
                {
                    desc: "Пятница",
                    "intervals": [
                        {
                            "begin": 32400,
                            "end": 39600,
                            "type": 1
                        },
                        {
                            "begin": 43200,
                            "end": 50400,
                            "type": 0
                        },
                        {
                            "begin": 54000,
                            "end": 61200,
                            "type": 0
                        },
                        {
                            "begin": 64800,
                            "end": 72000,
                            "type": 2
                        },
                    ],
                    title: "Рабочее время: 08ч 00м"
                },
                {
                    desc: "Суббота",
                    "intervals": [
                        {
                            "begin": 32400,
                            "end": 39600,
                            "type": 1
                        },
                        {
                            "begin": 43200,
                            "end": 50400,
                            "type": 0
                        },
                        {
                            "begin": 54000,
                            "end": 61200,
                            "type": 0
                        },
                        {
                            "begin": 64800,
                            "end": 72000,
                            "type": 2
                        }
                    ],
                    title: "Рабочее время: 08ч 00м"
                },
                {
                    desc: "Воскресенье",
                    "intervals": [
                        {
                            "begin": 32400,
                            "end": 39600,
                            "type": 1
                        },
                        {
                            "begin": 43200,
                            "end": 50400,
                            "type": 0
                        },
                        {
                            "begin": 54000,
                            "end": 61200,
                            "type": 0
                        },
                        {
                            "begin": 64800,
                            "end": 72000,
                            "type": 2
                        }
                    ],
                    title: "Рабочее время: 08ч 00м"
                }
            ]
        }
    },
    shift1: {
        name: 'shiftName1',
        description: 'shiftDescription1',
        rooms: {
            room1: {
                name: 'room1',
                work: true,
                noWork: false
            },
            room2: {
                name: 'room2',
                work: false,
                noWork: true
            },
            room3: {
                name: 'room3',
                work: true,
                noWork: false
            }
        },
        db: {
            "name": "shiftName1",
            "work_schedule_type_id": 3,
            "comment": "shiftDescription1",
            "allow_coming_later": "00:00",
            "allow_leaving_before": "00:00",
            "overtime": "00:00",
            "undertime": "00:00",
            "allow_breaks": "00:00",
            "begin_date": "2023-06-01",
            "week_hours": "40:00",
            "worktime_begin": "00:00",
            "worktime_end": "23:59",
            "control_coming_before": "00:00",
            "control_leaving_later": "00:00",
            "balance_stored": "00:00",
            "intervals": [
                {
                    desc:"День 1",
                    "intervals": [
                        {
                            "begin": 82800,
                            "end": 86400,
                            jumpRight: true,
                            "type": 3
                        }
                    ],
                    title: "Рабочее время: 01ч 00м"
                },
                {
                    desc:"День 2",
                    "intervals": [
                        {
                            "begin": 0,
                            "end": 82800,
                            jumpLeft: true,
                            "type": 3
                        }
                    ],
                    title: "Рабочее время: 23ч 00м"
                },
                {
                    desc: "День 3",
                    "intervals": [
                        {
                            "begin": 36000,
                            "end": 39600,
                            "type": 1
                        },
                        {
                            "begin": 43200,
                            "end": 46800,
                            "type": 0
                        },
                        {
                            "begin": 50400,
                            "end": 54000,
                            "type": 0
                        },
                        {
                            "begin": 57600,
                            "end": 61200,
                            "type": 0
                        },
                        {
                            "begin": 64800,
                            "end": 68400,
                            "type": 2
                        }
                    ],
                    title: "Рабочее время: 09ч 00м"
                },
            ]
        }
    },
    shift2: {
        name: 'shiftName2',
        description: 'shiftDescription2',
        rooms: {
            room1: {
                name: 'room1',
                work: true,
                noWork: false
            },
            room2: {
                name: 'room2',
                work: false,
                noWork: true
            },
            room3: {
                name: 'room3',
                work: true,
                noWork: false
            }
        },
        intervals: {
            day1: {
                name: 'День 1',
                time: 'Рабочее время: 12ч 00м',
                interval1: {
                    begin: '12:00'
                },
            },
            day2: {
                name: 'День 2',
                time: 'Рабочее время: 12ч 00м',
                interval1: {
                    end: '12:00'
                },
            },
            day3: {
                name: 'День 3',
                time: 'Рабочее время: 23ч 00м',
                interval1: {
                    begin: '00:00',
                    end: '13:00'
                },
                interval2: {
                    begin: '14:00',
                    end: '24:00'
                },
            },
            day4: {
                name: 'День 4',
                time: 'Рабочее время: 00ч 00м',
            },
            setting: {
                firstEntranceAndLastExit: true,
                arrival: {
                    hour: '23',
                    minute: '59'
                },
                less: {
                    hour: '23',
                    minute: '59'
                },
                early: {
                    hour: '23',
                    minute: '59'
                },
                overtime: {
                    hour: '23',
                    minute: '59'
                },
            }
        },
        date: {
            day: '31',
            month: 'Август',
            year: '2023',
            date: '2023-08-31'
        }
    },
    attendance1: {
        name: 'attendanceName1',
        description: 'attendanceDescription1',
        rooms: {
            room1: {
                name: 'room1',
                work: false,
                noWork: true
            },
            room2: {
                name: 'room2',
                work: true,
                noWork: false
            },
            room3: {
                name: 'room3',
                work: false,
                noWork: true
            }
        },
    },
    attendance2: {
        name: 'attendanceName2',
        description: 'attendanceDescription2',
        rooms: {
            room1: {
                name: 'room1',
                work: true,
                noWork: false
            },
            room2: {
                name: 'room2',
                work: false,
                noWork: true
            },
            room3: {
                name: 'room3',
                work: true,
                noWork: false
            }
        },
    },
    violation1: {
        name: 'violationName1',
        description: 'violationDescription1',
        intervals: {
            day1: {
                name: 'Понедельник',
                time: 'Обязательные интервалы: 23ч 59м | Интервалы для перерывов: 0ч 0м',
                interval1: {
                    begin: '00:00',
                    end: '23:59'
                },
            },
            day2: {
                name: 'Вторник',
                time: 'Обязательные интервалы: 23ч 59м | Интервалы для перерывов: 0ч 0м',
                interval1: {
                    begin: '00:00',
                    end: '23:59'
                },
            },
            day3: {
                name: 'Среда',
                time: 'Обязательные интервалы: 23ч 59м | Интервалы для перерывов: 0ч 0м',
                interval1: {
                    begin: '00:00',
                    end: '23:59'
                },
            },
            day4: {
                name: 'Четверг',
                time: 'Обязательные интервалы: 00ч 00м | Интервалы для перерывов: 0ч 0м',
            },
            day5: {
                name: 'Пятница',
                time: 'Обязательные интервалы: 08ч 00м | Рабочее время: 11ч 0м | Интервалы для перерывов: 03ч 00м',
                interval1: {
                    begin: '09:00',
                    end: '11:00'
                },
                interval2: {
                    begin: '12:00',
                    end: '14:00'
                },
                interval3: {
                    begin: '15:00',
                    end: '17:00'
                },
                interval4: {
                    begin: '18:00',
                    end: '20:00'
                },
            },
            day6: {
                name: 'Суббота',
                time: 'Обязательные интервалы: 08ч 00м | Рабочее время: 11ч 0м | Интервалы для перерывов: 03ч 00м',
                interval1: {
                    begin: '09:00',
                    end: '11:00'
                },
                interval2: {
                    begin: '12:00',
                    end: '14:00'
                },
                interval3: {
                    begin: '15:00',
                    end: '17:00'
                },
                interval4: {
                    begin: '18:00',
                    end: '20:00'
                },
            },
            day7: {
                name: 'Воскресенье',
                time: 'Обязательные интервалы: 08ч 00м | Рабочее время: 11ч 0м | Интервалы для перерывов: 03ч 00м',
                interval1: {
                    begin: '09:00',
                    end: '11:00'
                },
                interval2: {
                    begin: '12:00',
                    end: '14:00'
                },
                interval3: {
                    begin: '15:00',
                    end: '17:00'
                },
                interval4: {
                    begin: '18:00',
                    end: '20:00'
                },
            },
        },
        setting: {
            arrival: {
                hour: '00',
                minute: '00'
            },
            less: {
                hour: '00',
                minute: '00'
            },
            early: {
                hour: '00',
                minute: '00'
            },
            overtime: {
                hour: '00',
                minute: '00'
            },
        },
        db: {
            "name": "violationName1",
            "work_schedule_type_id": 5,
            "comment": "violationDescription1",
            "allow_coming_later": "00:00",
            "allow_leaving_before": "00:00",
            "overtime": "00:00",
            "undertime": "00:00",
            "allow_breaks": "00:00",
            "begin_date": "2024-02-08",
            "week_hours": "40:00",
            "worktime_begin": "00:00",
            "worktime_end": "23:59",
            "control_coming_before": "00:00",
            "control_leaving_later": "00:00",
            "balance_stored": "00:00",
            "intervals": [
                {
                    desc:"Понедельник",
                    "intervals": [
                        {
                            "begin": 32400,
                            "end": 39600,
                            "type": 1
                        },
                        {
                            "begin": 43200,
                            "end": 50400,
                            "type": 0
                        },
                        {
                            "begin": 54000,
                            "end": 61200,
                            "type": 0
                        },
                        {
                            "begin": 64800,
                            "end": 72000,
                            "type": 2
                        }
                    ],
                    title: "Рабочее время: 08ч 00м"
                },
                {
                    desc:"Вторник",
                    "intervals": [
                        {
                            "begin": 32400,
                            "end": 39600,
                            "type": 1
                        },
                        {
                            "begin": 43200,
                            "end": 50400,
                            "type": 0
                        },
                        {
                            "begin": 54000,
                            "end": 61200,
                            "type": 0
                        },
                        {
                            "begin": 64800,
                            "end": 72000,
                            "type": 2
                        }
                    ],
                    title: "Рабочее время: 08ч 00м"
                },
                {
                    desc:"Среда",
                    "intervals": [
                        {
                            "begin": 32400,
                            "end": 39600,
                            "type": 1
                        },
                        {
                            "begin": 43200,
                            "end": 50400,
                            "type": 0
                        },
                        {
                            "begin": 54000,
                            "end": 61200,
                            "type": 0
                        },
                        {
                            "begin": 64800,
                            "end": 72000,
                            "type": 2
                        }
                    ],
                    title: "Рабочее время: 08ч 00м"
                },
                {
                    desc: "Четверг",
                    "intervals": [
                        {
                            "begin": 32400,
                            "end": 39600,
                            "type": 1
                        },
                        {
                            "begin": 43200,
                            "end": 50400,
                            "type": 0
                        },
                        {
                            "begin": 54000,
                            "end": 61200,
                            "type": 0
                        },
                        {
                            "begin": 64800,
                            "end": 72000,
                            "type": 2
                        }
                    ],
                    title: "Рабочее время: 08ч 00м"
                },
                {
                    desc: "Пятница",
                    "intervals": [
                        {
                            "begin": 32400,
                            "end": 39600,
                            "type": 1
                        },
                        {
                            "begin": 43200,
                            "end": 50400,
                            "type": 0
                        },
                        {
                            "begin": 54000,
                            "end": 61200,
                            "type": 0
                        },
                        {
                            "begin": 64800,
                            "end": 72000,
                            "type": 2
                        }
                    ],
                    title: "Рабочее время: 08ч 00м"
                },
                {
                    desc: "Суббота",
                    "intervals": [
                        {
                            "begin": 32400,
                            "end": 39600,
                            "type": 1
                        },
                        {
                            "begin": 43200,
                            "end": 50400,
                            "type": 0
                        },
                        {
                            "begin": 54000,
                            "end": 61200,
                            "type": 0
                        },
                        {
                            "begin": 64800,
                            "end": 72000,
                            "type": 2
                        }
                    ],
                    title: "Рабочее время: 08ч 00м"
                },
                {
                    desc: "Воскресенье",
                    "intervals": [
                        {
                            "begin": 32400,
                            "end": 39600,
                            "type": 1
                        },
                        {
                            "begin": 43200,
                            "end": 50400,
                            "type": 0
                        },
                        {
                            "begin": 54000,
                            "end": 61200,
                            "type": 0
                        },
                        {
                            "begin": 64800,
                            "end": 72000,
                            "type": 2
                        }
                    ],
                    title: "Рабочее время: 08ч 00м"
                }
            ]
        }
    },
    violation2: {
        name: 'violationName2',
        description: 'violationDescription2',
        rooms: {
            room1: {
                name: 'room1',
                work: true,
                noWork: false
            },
            room2: {
                name: 'room2',
                work: false,
                noWork: true
            },
            room3: {
                name: 'room3',
                work: true,
                noWork: false
            }
        },
        intervals: {
            day1: {
                name: 'Понедельник',
                time: 'Обязательные интервалы: 01ч 59м | Рабочее время: 15ч 0м | Интервалы для перерывов: 22ч 00м',
                interval1: {
                    begin: '00:00',
                    end: '01:00'
                },
                interval2: {
                    begin: '23:00',
                    end: '23:59'
                },
            },
            day2: {
                name: 'Вторник',
                time: 'Обязательные интервалы: 00ч 00м | Интервалы для перерывов: 0ч 0м',
            },
            day3: {
                name: 'Среда',
                time: 'Обязательные интервалы: 02ч 59м | Рабочее время: 15ч 0м | Интервалы для перерывов: 21ч 00м',
                interval1: {
                    begin: '00:00',
                    end: '01:00'
                },
                interval2: {
                    begin: '09:00',
                    end: '10:00'
                },
                interval3: {
                    begin: '23:00',
                    end: '23:59'
                },
            },
            day4: {
                name: 'Четверг',
                time: 'Обязательные интервалы: 00ч 00м | Интервалы для перерывов: 0ч 0м',
            },
            day5: {
                name: 'Пятница',
                time: 'Обязательные интервалы: 03ч 59м | Рабочее время: 15ч 0м | Интервалы для перерывов: 20ч 00м',
                interval1: {
                    begin: '00:00',
                    end: '01:00'
                },
                interval2: {
                    begin: '09:00',
                    end: '10:00'
                },
                interval3: {
                    begin: '12:00',
                    end: '13:00'
                },
                interval4: {
                    begin: '23:00',
                    end: '23:59'
                },
            },
            day6: {
                name: 'Суббота',
                time: 'Обязательные интервалы: 15ч 00м | Рабочее время: 15ч 0м | Интервалы для перерывов: 08ч 59м',
                interval1: {
                    begin: '00:00',
                    end: '09:01'
                },
                interval2: {
                    begin: '18:00',
                    end: '23:59'
                },
            },
            day7: {
                name: 'Воскресенье',
                time: 'Обязательные интервалы: 02ч 59м | Рабочее время: 15ч 0м | Интервалы для перерывов: 21ч 00м',
                interval1: {
                    begin: '00:00',
                    end: '01:00'
                },
                interval2: {
                    begin: '09:00',
                    end: '10:00'
                },
                interval3: {
                    begin: '23:00',
                    end: '23:59'
                },
            },
        },
        setting: {
            lunch: {
                hour: '08',
                minute: '59'
            },
            arrival: {
                hour: '23',
                minute: '59'
            },
            less: {
                hour: '23',
                minute: '59'
            },
            early: {
                hour: '23',
                minute: '59'
            },
            overtime: {
                hour: '23',
                minute: '59'
            },
        }
    },
    balance1: {
        name: 'balanceName1',
        description: 'balanceDescription1',
        rooms: {
            room1: {
                name: 'room1',
                work: true,
                noWork: false
            },
            room2: {
                name: 'room2',
                work: false,
                noWork: false
            },
            room3: {
                name: 'room3',
                work: false,
                noWork: false,
            }
        },
        days: {
            day1: 'ПН'
        }
    },
    balance2: {
        name: 'balanceName2',
        description: 'balanceDescription2',
        rooms: {
            room1: {
                name: 'room1',
                work: true,
                noWork: false
            },
            room2: {
                name: 'room2',
                work: false,
                noWork: true
            },
            room3: {
                name: 'room3',
                work: true,
                noWork: false
            }
        },
        days: {
            day1: 'ПН',
            day2: 'ВТ',
            day3: 'СР',
            day4: 'ЧТ',
            day5: 'ПТ',
            day6: 'СБ',
            day7: 'ВС',
        },
        setting: {
            lunch: {
                hour: '01',
                minute: '59'
            },
            workTime: {
                hour: '09',
                minute: '00'
            },
            weekTime: {
                hour: '98',
                minute: '00'
            },
            lately: {
                hour: '09',
                minute: '00'
            },
            early: {
                hour: '18',
                minute: '00'
            },
            maxTime: {
                hour: '23',
                minute: '59'
            },
        }
    },
}

const addDataSchedule = () => describe('Добавление данных для тестирования подраздела Персонал / Графики работы',
    () => {
    const params = {...dataSchedule}

    bef();
    aft();

    describe('Добавление помещений', () => {
        decItApi.addRoomParent({
            room: params.rooms.room1
        });
        decItApi.addRoomChild({
            child: params.rooms.room2,
            parent: params.rooms.room1
        });
        decItApi.addRoomChild({
            child: params.rooms.room3,
            parent: params.rooms.room2
        });
    });

    describe('Добавление устройств', () => {
        decItApi.addDevice(params.devices.device1.obj);
        decItApi.addDevice(params.devices.device2.obj);
        decItApi.addDevice(params.devices.device3.obj);
    });

    describe('Добавление устройств в помещение', () => {
        decItApi.addDeviceInRoom({
            device: params.devices.device1.ip,
            room: params.rooms.room1
        });
        decItApi.addDeviceInRoom({
            device: params.devices.device2.ip,
            room: params.rooms.room2
        });
        decItApi.addDeviceInRoom({
            device: params.devices.device3.ip,
            room: params.rooms.room3
        });
    });
});

const deleteDataSchedule = () => describe('Удаление данных для тестирования подразделов Персонал / Графики работы',
    () => {
    const params = {...dataSchedule}

    bef();
    aft();

    decItApi.deleteDeviceInRoom({
        ip: params.devices.device1.ip
    });
    decItApi.deleteDeviceInRoom({
        ip: params.devices.device2.ip,
    });
    decItApi.deleteDeviceInRoom({
        ip: params.devices.device3.ip,
    });

    decItApi.deleteDevice({
        ip: params.devices.device1.ip
    });
    decItApi.deleteDevice({
        ip: params.devices.device2.ip,
    });
    decItApi.deleteDevice({
        ip: params.devices.device3.ip,
    });

    decItApi.deleteRoom({
        room: params.rooms.room3
    });
    decItApi.deleteRoom({
        room: params.rooms.room2
    });
    decItApi.deleteRoom({
        room: params.rooms.room1
    });
});

const dataVisitor = {
    rooms: {
        room1: 'room1',
        room2: 'room2',
        room3: 'room3'
    },
    devices: {
        device1: {
            name: 'Контроллер замка CL05',
            ip: '10.10.5.10',
            obj: {
                "device_type": 16,
                "ip_addr": "10.10.5.10",
                "mac_addr": "02:42:2f:97:86:32"
            }
        },
        device2: {
            name: 'Контроллер CL15',
            ip: '10.10.5.2',
            obj: {
                "device_type": 902,
                "ip_addr": "10.10.5.2",
                "mac_addr": "02:42:2f:97:86:40"
            }
        },
        device3: {
            name: 'ЛИКОН 2',
            ip: '10.10.5.9',
            obj: {
                "device_type": 65,
                "ip_addr": "10.10.5.9",
                "mac_addr": "02:42:2f:97:86:33"
            }
        }
    },
    divisions: {
        division1: {
            parent_id: 0,
            name: 'division1',
        },
        division2: {
            parent_id: 0,
            name: 'division2',
        },
        division3: {
            parent_id: 0,
            name: 'division3',
        },
        division4: {
            parent_id: 0,
            name: 'division4',
        },

    },
    positions: {
        position1: {
            name: 'position1',
            comment: ''
        },
        position2: {
            name: 'position2',
            comment: ''
        },
        position3: {
            name: 'position3',
            comment: ''
        },
    },
    templates: {
        template1: 'template1',
        template2: 'template2',
        template3: 'template3',
    },
    template: (name, zone1Id, zone2Id, zone3Id) => {
        return {
            "name": `${name}`,
            "comment": '',
            "access": [
                {
                    "access_zone_id": zone1Id,
                    "template_type":0,
                    "rights": {
                        "is_guard":0,
                        "is_antipass":0,
                        "is_verify":0,
                        "right_type": 1,
                        "schedule_id": 2,
                        "schedule_type_id": 1,
                        "commission_type":0,
                        "commission_group_1":0,
                        "commission_group_2":0,
                        "verify_po_schedule":0,
                        "verify_vvu_schedule":0,
                        "verify_pdu_schedule":0,
                        "verify_alcobarier_schedule":0

                    }
                },
                {
                    "access_zone_id": zone2Id,
                    "template_type":0,
                    "rights": {
                        "is_guard":0,
                        "is_antipass":0,
                        "is_verify":0,
                        "right_type": 1,
                        "schedule_id": 2,
                        "schedule_type_id": 1,
                        "commission_type":0,
                        "commission_group_1":0,
                        "commission_group_2":0,
                        "verify_po_schedule":0,
                        "verify_vvu_schedule":0,
                        "verify_pdu_schedule":0,
                        "verify_alcobarier_schedule":0

                    }
                },
                {
                    "access_zone_id": zone3Id,
                    "template_type":0,
                    "rights": {
                        "is_guard":0,
                        "is_antipass":0,
                        "is_verify":0,
                        "right_type": 1,
                        "schedule_id": 2,
                        "schedule_type_id": 1,
                        "commission_type":0,
                        "commission_group_1":0,
                        "commission_group_2":0,
                        "verify_po_schedule":0,
                        "verify_vvu_schedule":0,
                        "verify_pdu_schedule":0,
                        "verify_alcobarier_schedule":0

                    }
                },
            ]
        }
    },
    templateOneRoom: (name, zone1Id) => {
        return {
            "name": `${name}`,
            "comment": '',
            "access": [
                {
                    "access_zone_id": zone1Id,
                    "template_type":0,
                    "rights": {
                        "is_guard":0,
                        "is_antipass":0,
                        "is_verify":0,
                        "right_type": 1,
                        "schedule_id": 2,
                        "schedule_type_id": 1,
                        "commission_type":0,
                        "commission_group_1":0,
                        "commission_group_2":0,
                        "verify_po_schedule":0,
                        "verify_vvu_schedule":0,
                        "verify_pdu_schedule":0,
                        "verify_alcobarier_schedule":0

                    }
                }
            ]
        }
    },
    staff: {
        staff1: {
            last_name: 'staff',
            first_name: 'name',
            middle_name: '1',
            tabel_number: '1',
            hiring_date: '2023-01-01',
            division: 'division1',
            position: 'position1',
            access_template: ['template1'],
            begin_datetime: '2023-01-01 00:00:00',
            end_datetime: '2033-01-01 00:00:00',
        },
        staff2: {
            last_name: 'staff',
            first_name: 'name',
            middle_name: '2',
            tabel_number: '2',
            hiring_date: '2023-02-01',
            division: 'division2',
            position: 'position2',
            access_template: ['template2'],
            begin_datetime: '2023-01-01 00:00:00',
            end_datetime: '2033-01-01 00:00:00',
        },
        staff3: {
            last_name: 'staff',
            first_name: 'name',
            middle_name: '3',
            tabel_number: '3',
            hiring_date: '2023-02-01',
            division: 'division3',
            position: 'position3',
            access_template: ['template3'],
            begin_datetime: '2023-01-01 00:00:00',
            end_datetime: '2033-01-01 00:00:00',
        },
    },
    fio: {
        staff1: 'staff name 1',
        staff2: 'staff name 2',
        staff3: 'staff name 3',
        visitor1: 'visitor name 1',
        visitor2: 'visitor name 2',
        visitor3: 'visitor name 3',
    },
    visitor1: {
        firstName: 'name1',
        middleName: 'middle1',
        lastName: 'last1',
        mail: 'zybrik007@gmail.com',
        fio: 'last1 name1 middle1',
        staff: 'staff name 1',
        dateIn: {
            day: '1',
            month: 'Июнь',
            year: '2023',
            date: '2023-06-01 00:00'
        },
        dateAfter: {
            day: '1',
            month: 'Июнь',
            year: '2033',
            date: '2033-06-01 23:59'
        },
        division: 'division1',
        template: 'template1',
        pinCode: 'test-123456',
        card: '1',
        barcode: '2184201005502',
        ts: {
            arrTS: [
                {
                    number: 'abc123',
                    model: 'xyz123'
                },
                {
                    number: 'abc1234',
                    model: 'xyz1234'
                },
                {
                    number: 'abc12345',
                    model: 'xyz12345'
                },
                {
                    number: 'abc12346',
                    model: 'xyz123456'
                }],
            ts1: {
                number: 'abc123',
                model: 'xyz123'
            },
            ts2: {
                number: 'abc1234',
                model: 'xyz1234'
            },
            ts3: {
                number: 'abc12345',
                model: 'xyz12345'
            },
            ts4: {
                number: 'abc12346',
                model: 'xyz123456'
            }
        },
        document: 'passport',
        documentNumber: '2202 191535',
        dateArchive: 'Уволен с 01 июня 2023',
        db: {
            last_name: 'last1',
            first_name: 'name1',
            middle_name: 'middle1',
            division: 'division1',
            begin_datetime: '2023-01-01 00:00:00',
            end_datetime: '2033-01-01 00:00:00',
            identifier: [{identifier:"1", is_universal: true}],
        },
    },
    visitor2: {
        firstName: 'name2',
        middleName: 'middle2',
        lastName: 'last2',
        fio: 'last2 name2 middle2',
        staff: 'staff name 2',
        mail: 'zybrik007@rambler.ru',
        dateIn: {
            day: '1',
            month: 'Июнь',
            year: '2023',
            date: '2023-06-01 00:00'
        },
        dateAfter: {
            day: '1',
            month: 'Июнь',
            year: '2033',
            date: '2033-06-01 23:59'
        },
        division: 'division2',
        template: 'template2',
        pinCode: 'test-654321',
        card: '2',
        barcode: '9825684626442',
        ts: {
            arrTS: [
                {
                    number: 'xxx456',
                    model: 'yyy456'
                },
                {
                    number: 'xxx4567',
                    model: 'yyy4567'
                },
                {
                    number: 'xxx45678',
                    model: 'yyy45678'
                },
                {
                    number: 'xxx456789',
                    model: 'yyy456789'
                }],
            ts1: {
                number: 'xxx456',
                model: 'yyy456'
            },
            ts2: {
                number: 'xxx4567',
                model: 'yyy4567'
            },
            ts3: {
                number: 'xxx45678',
                model: 'yyy45678'
            },
            ts4: {
                number: 'xxx456789',
                model: 'yyy456789'
            }
        },
        document: 'vicale',
        documentNumber: '282466',
        dateArchive: 'Уволен с 01 июня 2023',
        db: {
            last_name: 'last2',
            first_name: 'name2',
            middle_name: 'middle2',
            tabel_number: '1',
            division: 'division2',
            begin_datetime: '2023-01-01 00:00:00',
            end_datetime: '2033-01-01 00:00:00',
            identifier: [{identifier: "2", is_universal: true}],
        }
    },
    event1: new Date().toLocaleDateString('fr-ca') + ' 00:00:00',
    event2: new Date().toLocaleDateString('fr-ca') + ' 01:00:00',
}

const addDataVisitor = () => describe('Добавление данных для тестирвоания фильтров подразделов: ' +
    'Бюро пропусков / Посетители, Заказ пропуск / Заказ пропуск', () => {

    const params = {...dataVisitor}

    bef();
    aft();

    describe('Добавление помещений', () => {
        decItApi.addRoomParent({
            room: params.rooms.room1
        });
        decItApi.addRoomChild({
            child: params.rooms.room2,
            parent: params.rooms.room1
        });
        decItApi.addRoomChild({
            child: params.rooms.room3,
            parent: params.rooms.room2
        });
    });

    describe('Добавление устройств', () => {
        decItApi.addDevice(params.devices.device1.obj);
        decItApi.addDevice(params.devices.device2.obj);
        decItApi.addDevice(params.devices.device3.obj);
    });

    describe('Добавление устройств в помещение', () => {
        decItApi.addDeviceInRoom({
            device: params.devices.device1.ip,
            room: params.rooms.room1
        });
        decItApi.addDeviceInRoom({
            device: params.devices.device2.ip,
            room: params.rooms.room2
        });
        decItApi.addDeviceInRoom({
            device: params.devices.device3.ip,
            room: params.rooms.room3
        });
    });

    describe('Добавление подразделений', () => {
        decItApi.addDivision(params.divisions.division1);
        decItApi.addDivision(params.divisions.division2);
        decItApi.addDivision(params.divisions.division3);
    });

    describe('Добавление должностей', () => {
        decItApi.addPosition(params.positions.position1);
        decItApi.addPosition(params.positions.position2);
        decItApi.addPosition(params.positions.position3);
    });

    describe('Добавление шаблонов доступа', () => {
        it(`Добавление шаблона доступа "${params.templates.template1}"`, async () => {
            const cook = await page.base.getCookie('token');
            const arrZone = await api.getRoom(cook.text);
            const id1 = arrZone.text.filter(obj => obj.name === params.rooms.room1)[0].id;
            const id2 = arrZone.text.filter(obj => obj.name === params.rooms.room2)[0].id;
            const id3 = arrZone.text.filter(obj => obj.name === params.rooms.room3)[0].id;
            const template = params.template(params.templates.template1, id1, id2, id3);
            await dec.simple(api.putAccessTemplate,
                [[template], cook.text],
                api.putAccessTemplate);
        });

        it(`Добавление шаблона доступа "${params.templates.template2}"`, async () => {
            const cook = await page.base.getCookie('token');
            const arrZone = await api.getRoom(cook.text);
            const id1 = arrZone.text.filter(obj => obj.name === params.rooms.room1)[0].id;
            const id2 = arrZone.text.filter(obj => obj.name === params.rooms.room2)[0].id;
            const id3 = arrZone.text.filter(obj => obj.name === params.rooms.room3)[0].id;
            const template = params.template(params.templates.template2, id1, id2, id3);
            await dec.simple(api.putAccessTemplate,
                [[template], cook.text],
                api.putAccessTemplate);
        });

        it(`Добавление шаблона доступа "${params.templates.template3}"`, async () => {
            const cook = await page.base.getCookie('token');
            const arrZone = await api.getRoom(cook.text);
            const id1 = arrZone.text.filter(obj => obj.name === params.rooms.room1)[0].id;
            const template = params.templateOneRoom(params.templates.template3, id1);
            await dec.simple(api.putAccessTemplate,
                [[template], cook.text],
                api.putAccessTemplate);
        });
    });

    describe('Добавление сотрудников', () => {
        it(`Добавление сотрудника "${params.fio.staff1}".`, async () => {
            const cook = await page.base.getCookie('token');
            const arrDivision = await api.getDivision(cook.text);
            const divisionId = arrDivision.text.filter(obj => obj.name === params.staff.staff1.division)[0].id;
            const arrPosition = await api.getPosition(cook.text);
            const positionId = arrPosition.text.filter(obj => obj.name === params.staff.staff1.position)[0].id;
            const arrTemplate = await api.getTemplate(cook.text);
            const templateId = arrTemplate.text.filter(obj => obj.name === params.staff.staff1.access_template[0])[0].id;
            const staff = {
                ...params.staff.staff1,
                division: divisionId,
                position: positionId,
                access_template: [templateId]
            }
            await dec.simple(api.putStaff,
                [[staff], cook.text],
                api.putStaff);
        });

        it(`Добавление сотрудника "${params.fio.staff2}".`, async () => {
            const cook = await page.base.getCookie('token');
            const arrDivision = await api.getDivision(cook.text);
            const divisionId = arrDivision.text.filter(obj => obj.name === params.staff.staff2.division)[0].id;
            const arrPosition = await api.getPosition(cook.text);
            const positionId = arrPosition.text.filter(obj => obj.name === params.staff.staff2.position)[0].id;
            const arrTemplate = await api.getTemplate(cook.text);
            const templateId = arrTemplate.text.filter(obj => obj.name === params.staff.staff2.access_template[0])[0].id;
            const staff = {
                ...params.staff.staff2,
                division: divisionId,
                position: positionId,
                access_template: [templateId]
            }
            await dec.simple(api.putStaff,
                [[staff], cook.text],
                api.putStaff);
        });

        it(`Добавление сотрудника "${params.fio.staff3}".`, async () => {
            const cook = await page.base.getCookie('token');
            const arrDivision = await api.getDivision(cook.text);
            const divisionId = arrDivision.text.filter(obj => obj.name === params.staff.staff3.division)[0].id;
            const arrPosition = await api.getPosition(cook.text);
            const positionId = arrPosition.text.filter(obj => obj.name === params.staff.staff3.position)[0].id;
            const arrTemplate = await api.getTemplate(cook.text);
            const templateId = arrTemplate.text.filter(obj => obj.name === params.staff.staff3.access_template[0])[0].id;
            const staff = {
                ...params.staff.staff3,
                division: divisionId,
                position: positionId,
                access_template: [templateId]
            }
            await dec.simple(api.putStaff,
                [[staff], cook.text],
                api.putStaff);
        });
    });
});

const deleteDataVisitor = () => describe('Удаление данных для тестирвоания подразделов: ' +
    'Бюро пропусков / Посетители, Заказ пропуск / Заказ пропуск.',
    () => {
        const params = {...dataControlAccess}

        bef();
        aft();

        it('Удаление сотрудников', async () => {
            const cook = await page.base.getCookie('token');
            const arrStaff = await api.getStaff(cook.text);
            const staff1 = arrStaff.text.filter(obj => obj.name === params.fio.staff1)[0].id;
            const staff2 = arrStaff.text.filter(obj => obj.name === params.fio.staff2)[0].id;
            const staff3 = arrStaff.text.filter(obj => obj.name === params.fio.staff3)[0].id;

            await dec.simple(db.deleteUser,
                [staff1],
                db.deleteUser);

            await dec.simple(db.deleteUser,
                [staff2],
                db.deleteUser);

            await dec.simple(db.deleteUser,
                [staff3],
                db.deleteUser);
        });

        /*it('Удаление посетителей', async () => {
            const cook = await page.base.getCookie('token');
            const arrVisitor = await api.getVisitor(cook.text);
            const visitor1 = arrVisitor.text.filter(obj => obj.name === params.fio.visitor1)[0].id;
            const visitor2 = arrVisitor.text.filter(obj => obj.name === params.fio.visitor2)[0].id;
            const visitor3 = arrVisitor.text.filter(obj => obj.name === params.fio.visitor3)[0].id;

            await dec.simple(db.deleteUser,
                [visitor1],
                db.deleteUser);

            await dec.simple(db.deleteUser,
                [visitor2],
                db.deleteUser);

            await dec.simple(db.deleteUser,
                [visitor3],
                db.deleteUser);

            /!*        await dec.simple(api.deleteVisitor,
                        [[visitor1, visitor2, visitor3], cook.text],
                        api.deleteVisitor);*!/
        });*/

        it('Удаление должностей', async () => {
            const cook = await page.base.getCookie('token');
            const arrPosition = await api.getPosition(cook.text);
            const position1 = arrPosition.text.filter(obj => obj.name === params.positions.position1.name)[0].id;
            const position2 = arrPosition.text.filter(obj => obj.name === params.positions.position2.name)[0].id;
            const position3 = arrPosition.text.filter(obj => obj.name === params.positions.position3.name)[0].id;

            await dec.simple(api.deletePosition,
                [[position1, position2, position3], cook.text],
                api.deletePosition)
        });

        it('Удаление шаблонов доступа', async () => {
            const cook = await page.base.getCookie('token');
            const arrTemplate = await api.getTemplate(cook.text);
            console.log(arrTemplate);
            const template1 = arrTemplate.text.filter(obj => obj.name === params.templates.template1)[0].id;
            const template2 = arrTemplate.text.filter(obj => obj.name === params.templates.template2)[0].id;
            const template3 = arrTemplate.text.filter(obj => obj.name === params.templates.template3)[0].id;
            console.log(template1)
            await dec.simple(api.deleteTemplate,
                [[template1, template2, template3], cook.text],
                api.deleteTemplate);
        });

        it('Удаление подразделений', async () => {
            const cook = await page.base.getCookie('token');
            const arrDivision = await api.getDivision(cook.text);
            const division1 = arrDivision.text.filter(obj => obj.name === params.divisions.division1.name)[0].id;
            const division2 = arrDivision.text.filter(obj => obj.name === params.divisions.division2.name)[0].id;
            const division3 = arrDivision.text.filter(obj => obj.name === params.divisions.division3.name)[0].id;

            await dec.simple(api.deleteDivision,
                [[division1, division2, division3], cook.text],
                api.deleteDivision);
        });

        decItApi.deleteDeviceInRoom({
            ip: params.devices.device1.ip
        });
        decItApi.deleteDeviceInRoom({
            ip: params.devices.device2.ip,
        });
        decItApi.deleteDeviceInRoom({
            ip: params.devices.device3.ip,
        });

        decItApi.deleteDevice({
            ip: params.devices.device1.ip
        });
        decItApi.deleteDevice({
            ip: params.devices.device2.ip,
        });
        decItApi.deleteDevice({
            ip: params.devices.device3.ip,
        });

        decItApi.deleteRoom({
            room: params.rooms.room3
        });
        decItApi.deleteRoom({
            room: params.rooms.room2
        });
        decItApi.deleteRoom({
            room: params.rooms.room1
        });
    });

const dataURV = {
    rooms: {
        room1: 'room1',
        room2: 'room2',
        room3: 'room3'
    },
    devices: {
        device1: {
            name: 'Контроллер замка CL05',
            ip: '10.10.5.10',
            obj: {
                "device_type": 16,
                "ip_addr": "10.10.5.10",
                "mac_addr": "02:42:2f:97:86:32"
            }
        },
        device2: {
            name: 'Контроллер CL15',
            ip: '10.10.5.2',
            obj: {
                "device_type": 902,
                "ip_addr": "10.10.5.2",
                "mac_addr": "02:42:2f:97:86:40"
            }
        },
        device3: {
            name: 'ЛИКОН 2',
            ip: '10.10.5.9',
            obj: {
                "device_type": 65,
                "ip_addr": "10.10.5.9",
                "mac_addr": "02:42:2f:97:86:33"
            }
        }
    },
    divisions: {
        division1: {
            parent_id: 0,
            name: 'division1',
        },
        division2: {
            parent_id: 0,
            name: 'division2',
        },
        division3: {
            parent_id: 0,
            name: 'division3',
        },
        division4: {
            parent_id: 0,
            name: 'division4',
        },
        division5: {
            parent_id: 0,
            name: 'division5',
        },
        division6: {
            parent_id: 0,
            name: 'division6',
        },
        division7: {
            parent_id: 0,
            name: 'division7',
        },
        division8: {
            parent_id: 0,
            name: 'division8',
        },
    },
    positions: {
        position1: {
            name: 'position1',
            comment: ''
        },
        position2: {
            name: 'position2',
            comment: ''
        },
        position3: {
            name: 'position3',
            comment: ''
        },
        position4: {
            name: 'position4',
            comment: ''
        },
        position5: {
            name: 'position5',
            comment: ''
        },
        position6: {
            name: 'position6',
            comment: ''
        },
        position7: {
            name: 'position7',
            comment: ''
        },
        position8: {
            name: 'position8',
            comment: ''
        },
    },
    schedules: {
        schedule1: {
            name: 'week',
            db: {
                "name": "week",
                "work_schedule_type_id": 2,
                "comment": "week",
                "allow_coming_later": "00:01",
                "allow_leaving_before": "00:01",
                "overtime": "00:01",
                "undertime": "00:01",
                "allow_breaks": "00:00",
                "begin_date": "2023-01-01",
                "week_hours": "40:00",
                "worktime_begin": "00:00",
                "worktime_end": "23:59",
                "control_coming_before": "00:00",
                "control_leaving_later": "00:00",
                "balance_stored": "00:00",
                "intervals": [
                    {
                        desc:"Понедельник",
                        "intervals": [
                            {
                                "begin": 32400,
                                "end": 46800,
                                "type": 1
                            },
                            {
                                "begin": 50400,
                                "end": 64800,
                                "type": 2
                            }
                        ],
                        title: "Рабочее время: 08ч 00м"
                    },
                    {
                        desc:"Вторник",
                        "intervals": [
                            {
                                "begin": 32400,
                                "end": 46800,
                                "type": 1
                            },
                            {
                                "begin": 50400,
                                "end": 64800,
                                "type": 2
                            }
                        ],
                        title: "Рабочее время: 08ч 00м"
                    },
                    {
                        desc:"Среда",
                        "intervals": [
                            {
                                "begin": 32400,
                                "end": 46800,
                                "type": 1
                            },
                            {
                                "begin": 50400,
                                "end": 64800,
                                "type": 2
                            }
                        ],
                        title: "Рабочее время: 08ч 00м"
                    },
                    {
                        desc: "Четверг",
                        "intervals": [
                            {
                                "begin": 32400,
                                "end": 46800,
                                "type": 1
                            },
                            {
                                "begin": 50400,
                                "end": 64800,
                                "type": 2
                            }
                        ],
                        title: "Рабочее время: 08ч 00м"
                    },
                    {
                        desc: "Пятница",
                        "intervals": [
                            {
                                "begin": 32400,
                                "end": 46800,
                                "type": 1
                            },
                            {
                                "begin": 50400,
                                "end": 64800,
                                "type": 2
                            }
                        ],
                        title: "Рабочее время: 08ч 00м"
                    },
                    {
                        desc: "Суббота",
                        "intervals": [
                            {
                                "begin": 32400,
                                "end": 46800,
                                "type": 1
                            },
                            {
                                "begin": 50400,
                                "end": 64800,
                                "type": 2
                            }
                        ],
                        title: "Рабочее время: 08ч 00м"
                    },
                    {
                        desc: "Воскресенье",
                        "intervals": [
                            {
                                "begin": 32400,
                                "end": 46800,
                                "type": 1
                            },
                            {
                                "begin": 50400,
                                "end": 64800,
                                "type": 2
                            }
                        ],
                        title: "Рабочее время: 08ч 00м"
                    }
                ]
            }
        },
        schedule2: {
            name: 'shift',
            db: {
                "name": "shift",
                "work_schedule_type_id": 3,
                "comment": "shift",
                "allow_coming_later": "00:01",
                "allow_leaving_before": "00:01",
                "overtime": "00:01",
                "undertime": "00:01",
                "allow_breaks": "00:00",
                "begin_date": "2023-01-01",
                "week_hours": "40:00",
                "worktime_begin": "00:00",
                "worktime_end": "23:59",
                "control_coming_before": "00:00",
                "control_leaving_later": "00:00",
                "balance_stored": "00:00",
                "intervals": [
                    {
                        desc:"День 1",
                        "intervals": [
                            {
                                "begin": 32400,
                                "end": 86400,
                                jumpRight: true,
                                "type": 3
                            }
                        ],
                        title: "Рабочее время: 15ч 00м"
                    },
                    {
                        desc:"День 2",
                        "intervals": [
                            {
                                "begin": 0,
                                "end": 32400,
                                jumpLeft: true,
                                "type": 3
                            }
                        ],
                        title: "Рабочее время: 09ч 00м"
                    },
                ]
            }
        },
        schedule3: {
            name: 'attendance',
            db: {
                "name": "attendance",
                "work_schedule_type_id": 4,
                "comment": "attendance",
                "allow_coming_later": "00:00",
                "allow_leaving_before": "00:00",
                "overtime": "00:00",
                "undertime": "00:00",
                "allow_breaks": "00:00",
                "begin_date": "2023-01-01",
                "week_hours": "40:00",
                "worktime_begin": "00:00",
                "worktime_end": "23:59",
                "control_coming_before": "00:00",
                "control_leaving_later": "00:00",
                "balance_stored": "00:00",
                "intervals": [
                    {
                        desc:"Понедельник",
                        "intervals": []
                    },
                    {
                        desc:"Вторник",
                        "intervals": []
                    },
                    {
                        desc:"Среда",
                        "intervals": []
                    },
                    {
                        desc: "Четверг",
                        "intervals": []
                    },
                    {
                        desc: "Пятница",
                        "intervals": []
                    },
                    {
                        desc: "Суббота",
                        "intervals": []
                    },
                    {
                        desc: "Воскресенье",
                        "intervals": []
                    }
                ]
            }
        },
        schedule4: {
            name: 'violation',
            db: {
                "name": "violation",
                "work_schedule_type_id": 5,
                "comment": "violation",
                "allow_coming_later": "00:01",
                "allow_leaving_before": "00:01",
                "overtime": "00:01",
                "undertime": "00:01",
                "allow_breaks": "01:00",
                "begin_date": "2023-01-01",
                "week_hours": "40:00",
                "worktime_begin": "00:00",
                "worktime_end": "23:59",
                "control_coming_before": "00:00",
                "control_leaving_later": "00:00",
                "balance_stored": "00:00",
                "intervals": [
                    {
                        desc:"Понедельник",
                        "intervals": [
                            {
                                "begin": 32400,
                                "end": 43200,
                                "type": 1
                            },
                            {
                                "begin": 50400,
                                "end": 64800,
                                "type": 2
                            }
                        ],
                        title: "Обязательные интервалы: 06ч 00м | Рабочее время: 09ч 0м | Интервалы для перерывов: 03ч 00м"
                    },
                    {
                        desc:"Вторник",
                        "intervals": [
                            {
                                "begin": 32400,
                                "end": 43200,
                                "type": 1
                            },
                            {
                                "begin": 50400,
                                "end": 64800,
                                "type": 2
                            }
                        ],
                        title: "Обязательные интервалы: 06ч 00м | Рабочее время: 09ч 0м | Интервалы для перерывов: 03ч 00м"
                    },
                    {
                        desc:"Среда",
                        "intervals": [
                            {
                                "begin": 32400,
                                "end": 43200,
                                "type": 1
                            },
                            {
                                "begin": 50400,
                                "end": 64800,
                                "type": 2
                            }
                        ],
                        title: "Обязательные интервалы: 06ч 00м | Рабочее время: 09ч 0м | Интервалы для перерывов: 03ч 00м"
                    },
                    {
                        desc: "Четверг",
                        "intervals": [
                            {
                                "begin": 32400,
                                "end": 43200,
                                "type": 1
                            },
                            {
                                "begin": 50400,
                                "end": 64800,
                                "type": 2
                            }
                        ],
                        title: "Обязательные интервалы: 06ч 00м | Рабочее время: 09ч 0м | Интервалы для перерывов: 03ч 00м"
                    },
                    {
                        desc: "Пятница",
                        "intervals": [
                            {
                                "begin": 32400,
                                "end": 43200,
                                "type": 1
                            },
                            {
                                "begin": 50400,
                                "end": 64800,
                                "type": 2
                            }
                        ],
                        title: "Обязательные интервалы: 06ч 00м | Рабочее время: 09ч 0м | Интервалы для перерывов: 03ч 00м"
                    },
                    {
                        desc: "Суббота",
                        "intervals": [
                            {
                                "begin": 32400,
                                "end": 43200,
                                "type": 1
                            },
                            {
                                "begin": 50400,
                                "end": 64800,
                                "type": 2
                            }
                        ],
                        title: "Обязательные интервалы: 06ч 00м | Рабочее время: 09ч 0м | Интервалы для перерывов: 03ч 00м"
                    },
                    {
                        desc: "Воскресенье",
                        "intervals": [
                            {
                                "begin": 32400,
                                "end": 43200,
                                "type": 1
                            },
                            {
                                "begin": 50400,
                                "end": 64800,
                                "type": 2
                            }
                        ],
                        title: "Обязательные интервалы: 06ч 00м | Рабочее время: 09ч 0м | Интервалы для перерывов: 03ч 00м"
                    }
                ]
            }
        },
        schedule5: {
            name: 'balance',
            db: {
                "name": "balance",
                "work_schedule_type_id": 6,
                "comment": "balance",
                "allow_coming_later": "00:00",
                "allow_leaving_before": "00:00",
                "overtime": "00:00",
                "undertime": "00:00",
                "days": 127,
                "allow_breaks": "01:00",
                "begin_date": "2023-01-01",
                "week_hours": "63:00",
                "worktime_begin": "08:00",
                "worktime_end": "20:00",
                "control_coming_before": "09:00",
                "control_leaving_later": "18:00",
                "balance_stored": "00:01",
                "intervals": [
                    {
                        desc:"Понедельник",
                        "intervals": []
                    },
                    {
                        desc:"Вторник",
                        "intervals": []
                    },
                    {
                        desc:"Среда",
                        "intervals": []
                    },
                    {
                        desc: "Четверг",
                        "intervals": []
                    },
                    {
                        desc: "Пятница",
                        "intervals": []
                    },
                    {
                        desc: "Суббота",
                        "intervals": []
                    },
                    {
                        desc: "Воскресенье",
                        "intervals": []
                    }
                ]
            }
        },
        schedule6: {
            name: 'week_2',
            db: {
                "name": "week_2",
                "work_schedule_type_id": 2,
                "comment": "week_2",
                "allow_coming_later": "00:00",
                "allow_leaving_before": "00:00",
                "overtime": "00:00",
                "undertime": "00:00",
                "allow_breaks": "00:00",
                "begin_date": "2023-01-01",
                "week_hours": "40:00",
                "worktime_begin": "00:00",
                "worktime_end": "23:59",
                "control_coming_before": "00:00",
                "control_leaving_later": "00:00",
                "balance_stored": "00:00",
                "is_first_input_last_output": true,
                "is_not_holiday": true,
                "intervals": [
                    {
                        desc:"Понедельник",
                        "intervals": [
                            {
                                "begin": 32400,
                                "end": 46800,
                                "type": 1
                            },
                            {
                                "begin": 50400,
                                "end": 64800,
                                "type": 2
                            }
                        ],
                        title: "Рабочее время: 08ч 00м"
                    },
                    {
                        desc:"Вторник",
                        "intervals": [
                            {
                                "begin": 32400,
                                "end": 46800,
                                "type": 1
                            },
                            {
                                "begin": 50400,
                                "end": 64800,
                                "type": 2
                            }
                        ],
                        title: "Рабочее время: 08ч 00м"
                    },
                    {
                        desc:"Среда",
                        "intervals": [
                            {
                                "begin": 32400,
                                "end": 46800,
                                "type": 1
                            },
                            {
                                "begin": 50400,
                                "end": 64800,
                                "type": 2
                            }
                        ],
                        title: "Рабочее время: 08ч 00м"
                    },
                    {
                        desc: "Четверг",
                        "intervals": [
                            {
                                "begin": 32400,
                                "end": 46800,
                                "type": 1
                            },
                            {
                                "begin": 50400,
                                "end": 64800,
                                "type": 2
                            }
                        ],
                        title: "Рабочее время: 08ч 00м"
                    },
                    {
                        desc: "Пятница",
                        "intervals": [
                            {
                                "begin": 32400,
                                "end": 46800,
                                "type": 1
                            },
                            {
                                "begin": 50400,
                                "end": 64800,
                                "type": 2
                            }
                        ],
                        title: "Рабочее время: 08ч 00м"
                    },
                    {
                        desc: "Суббота",
                        "intervals": [
                            {
                                "begin": 32400,
                                "end": 46800,
                                "type": 1
                            },
                            {
                                "begin": 50400,
                                "end": 64800,
                                "type": 2
                            }
                        ],
                        title: "Рабочее время: 08ч 00м"
                    },
                    {
                        desc: "Воскресенье",
                        "intervals": [
                            {
                                "begin": 32400,
                                "end": 46800,
                                "type": 1
                            },
                            {
                                "begin": 50400,
                                "end": 64800,
                                "type": 2
                            }
                        ],
                        title: "Рабочее время: 08ч 00м"
                    }
                ]
            }
        },
        schedule7: {
            name: 'shift_2',
            db: {
                "name": "shift_2",
                "work_schedule_type_id": 3,
                "comment": "shift_2",
                "allow_coming_later": "00:00",
                "allow_leaving_before": "00:00",
                "overtime": "00:00",
                "undertime": "00:00",
                "allow_breaks": "00:00",
                "begin_date": "2023-01-01",
                "week_hours": "40:00",
                "worktime_begin": "00:00",
                "worktime_end": "23:59",
                "control_coming_before": "00:00",
                "control_leaving_later": "00:00",
                "balance_stored": "00:00",
                "is_first_input_last_output": true,
                "intervals": [
                    {
                        desc:"День 1",
                        "intervals": [
                            {
                                "begin": 32400,
                                "end": 86400,
                                jumpRight: true,
                                "type": 3
                            }
                        ],
                        title: "Рабочее время: 15ч 00м"
                    },
                    {
                        desc:"День 2",
                        "intervals": [
                            {
                                "begin": 0,
                                "end": 32400,
                                jumpLeft: true,
                                "type": 3
                            }
                        ],
                        title: "Рабочее время: 09ч 00м"
                    },
                ]
            }
        },
        schedule8: {
            name: 'attendance_2',
            db: {
                "name": "attendance_2",
                "work_schedule_type_id": 4,
                "comment": "attendance_2",
                "allow_coming_later": "00:00",
                "allow_leaving_before": "00:00",
                "overtime": "00:00",
                "undertime": "00:00",
                "allow_breaks": "00:00",
                "begin_date": "2023-01-01",
                "week_hours": "40:00",
                "worktime_begin": "00:00",
                "worktime_end": "23:59",
                "control_coming_before": "00:00",
                "control_leaving_later": "00:00",
                "balance_stored": "00:00",
                "is_first_input_last_output": true,
                "intervals": [
                    {
                        desc:"Понедельник",
                        "intervals": []
                    },
                    {
                        desc:"Вторник",
                        "intervals": []
                    },
                    {
                        desc:"Среда",
                        "intervals": []
                    },
                    {
                        desc: "Четверг",
                        "intervals": []
                    },
                    {
                        desc: "Пятница",
                        "intervals": []
                    },
                    {
                        desc: "Суббота",
                        "intervals": []
                    },
                    {
                        desc: "Воскресенье",
                        "intervals": []
                    }
                ]
            }
        },
    },
    fio: {
        staff1: 'staff name 1',
        staff2: 'staff name 2',
        staff3: 'staff name 3',
        staff4: 'staff name 4',
        staff5: 'staff name 5',
        staff6: 'staff name 6',
        staff7: 'staff name 7',
        staff8: 'staff name 8',
    },
    staffs: {
        staff1: {
            last_name: 'staff',
            first_name: 'name',
            middle_name: '1',
            tabel_number: '1',
            hiring_date: '2023-01-01',
            division: 'division1',
            position: 'position1',
            work_schedule: 'week',
            begin_datetime: '2023-01-01 00:00:00',
            end_datetime: '2033-01-01 00:00:00',
            identifier: [{identifier:"1", is_universal: true}],
        },
        staff2: {
            last_name: 'staff',
            first_name: 'name',
            middle_name: '2',
            tabel_number: '2',
            hiring_date: '2023-01-01',
            division: 'division2',
            position: 'position2',
            work_schedule: 'shift',
            begin_datetime: '2023-01-01 00:00:00',
            end_datetime: '2033-01-01 00:00:00',
            identifier: [{identifier:"2", is_universal: true}],
        },
        staff3: {
            last_name: 'staff',
            first_name: 'name',
            middle_name: '3',
            tabel_number: '3',
            hiring_date: '2023-01-01',
            division: 'division3',
            position: 'position3',
            work_schedule: 'attendance',
            begin_datetime: '2023-01-01 00:00:00',
            end_datetime: '2033-01-01 00:00:00',
            identifier: [{identifier:"3", is_universal: true}],
        },
        staff4: {
            last_name: 'staff',
            first_name: 'name',
            middle_name: '4',
            tabel_number: '4',
            hiring_date: '2023-01-01',
            division: 'division4',
            position: 'position4',
            work_schedule: 'violation',
            begin_datetime: '2023-01-01 00:00:00',
            end_datetime: '2033-01-01 00:00:00',
            identifier: [{identifier:"4", is_universal: true}],
        },
        staff5: {
            last_name: 'staff',
            first_name: 'name',
            middle_name: '5',
            tabel_number: '5',
            hiring_date: '2023-01-01',
            division: 'division5',
            position: 'position5',
            work_schedule: 'balance',
            begin_datetime: '2023-01-01 00:00:00',
            end_datetime: '2033-01-01 00:00:00',
            identifier: [{identifier:"5", is_universal: true}],
        },
        staff6: {
            last_name: 'staff',
            first_name: 'name',
            middle_name: '6',
            tabel_number: '6',
            hiring_date: '2023-01-01',
            division: 'division6',
            position: 'position6',
            work_schedule: 'week_2',
            begin_datetime: '2023-01-01 00:00:00',
            end_datetime: '2033-01-01 00:00:00',
            identifier: [{identifier:"6", is_universal: true}],
        },
        staff7: {
            last_name: 'staff',
            first_name: 'name',
            middle_name: '7',
            tabel_number: '7',
            hiring_date: '2023-01-01',
            division: 'division7',
            position: 'position7',
            work_schedule: 'shift_2',
            begin_datetime: '2023-01-01 00:00:00',
            end_datetime: '2033-01-01 00:00:00',
            identifier: [{identifier:"7", is_universal: true}],
        },
        staff8: {
            last_name: 'staff',
            first_name: 'name',
            middle_name: '8',
            tabel_number: '8',
            hiring_date: '2023-01-01',
            division: 'division8',
            position: 'position8',
            work_schedule: 'attendance_2',
            begin_datetime: '2023-01-01 00:00:00',
            end_datetime: '2033-01-01 00:00:00',
            identifier: [{identifier:"8", is_universal: true}],
        },
    },
    events: {
        staff1: {
            day1: {
                event1: {
                    time_label: '"2023-06-01 09:00:00"',
                    time_label_utc: '"2023-06-01 06:00:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '1',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'Неконтролируемая территория',
                    access_zone_id2: 'room1'
                },
                event2: {
                    time_label: '"2023-06-01 13:00:00"',
                    time_label_utc: '"2023-06-01 10:00:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '1',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'room1',
                    access_zone_id2: 'room2'
                },
                event3: {
                    time_label: '"2023-06-01 14:00:00"',
                    time_label_utc: '"2023-06-01 11:00:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '1',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'room2',
                    access_zone_id2: 'room1'
                },
                event4: {
                    time_label: '"2023-06-01 18:00:00"',
                    time_label_utc: '"2023-06-01 15:00:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '1',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'room1',
                    access_zone_id2: 'Неконтролируемая территория'
                }
            },
            day2: {
                event1: {
                    time_label: '"2023-06-02 09:00:00"',
                    time_label_utc: '"2023-06-02 06:00:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '1',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'Неконтролируемая территория',
                    access_zone_id2: 'room1'
                },
                event2: {
                    time_label: '"2023-06-02 18:00:00"',
                    time_label_utc: '"2023-06-02 15:00:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '1',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'room1',
                    access_zone_id2: 'Неконтролируемая территория'
                },
            },
            day3: {
                event1: {
                    time_label: '"2023-06-03 09:01:00"',
                    time_label_utc: '"2023-06-03 06:01:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '1',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'Неконтролируемая территория',
                    access_zone_id2: 'room1'
                },
                event2: {
                    time_label: '"2023-06-03 18:00:00"',
                    time_label_utc: '"2023-06-03 15:00:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '1',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'room1',
                    access_zone_id2: 'Неконтролируемая территория'
                },
            },
            day4: {
                event1: {
                    time_label: '"2023-06-04 09:02:00"',
                    time_label_utc: '"2023-06-04 06:02:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '1',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'Неконтролируемая территория',
                    access_zone_id2: 'room1'
                },
                event2: {
                    time_label: '"2023-06-04 18:00:00"',
                    time_label_utc: '"2023-06-04 15:00:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '1',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'room1',
                    access_zone_id2: 'Неконтролируемая территория'
                },
            },
            day5: {
                event1: {
                    time_label: '"2023-06-05 09:00:00"',
                    time_label_utc: '"2023-06-05 06:00:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '1',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'Неконтролируемая территория',
                    access_zone_id2: 'room1'
                },
                event2: {
                    time_label: '"2023-06-05 17:59:00"',
                    time_label_utc: '"2023-06-05 14:59:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '1',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'room1',
                    access_zone_id2: 'Неконтролируемая территория'
                },
            },
            day6: {
                event1: {
                    time_label: '"2023-06-06 09:00:00"',
                    time_label_utc: '"2023-06-06 06:00:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '1',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'Неконтролируемая территория',
                    access_zone_id2: 'room1'
                },
                event2: {
                    time_label: '"2023-06-06 17:58:00"',
                    time_label_utc: '"2023-06-06 14:58:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '1',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'room1',
                    access_zone_id2: 'Неконтролируемая территория'
                },
            },
            day7: {
                event1: {
                    time_label: '"2023-06-07 09:00:00"',
                    time_label_utc: '"2023-06-07 06:00:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '1',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'Неконтролируемая территория',
                    access_zone_id2: 'room1'
                },
                event2: {
                    time_label: '"2023-06-07 13:00:00"',
                    time_label_utc: '"2023-06-07 10:00:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '1',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'room1',
                    access_zone_id2: 'room2'
                },
                event3: {
                    time_label: '"2023-06-07 14:01:00"',
                    time_label_utc: '"2023-06-07 11:01:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '1',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'room2',
                    access_zone_id2: 'room1'
                },
                event4: {
                    time_label: '"2023-06-07 18:00:00"',
                    time_label_utc: '"2023-06-07 15:00:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '1',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'room1',
                    access_zone_id2: 'Неконтролируемая территория'
                }
            },
            day8: {
                event1: {
                    time_label: '"2023-06-08 09:00:00"',
                    time_label_utc: '"2023-06-08 06:00:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '1',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'Неконтролируемая территория',
                    access_zone_id2: 'room1'
                },
                event2: {
                    time_label: '"2023-06-08 12:59:00"',
                    time_label_utc: '"2023-06-08 09:59:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '1',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'room1',
                    access_zone_id2: 'room2'
                },
                event3: {
                    time_label: '"2023-06-08 14:01:00"',
                    time_label_utc: '"2023-06-08 11:01:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '1',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'room2',
                    access_zone_id2: 'room1'
                },
                event4: {
                    time_label: '"2023-06-08 18:00:00"',
                    time_label_utc: '"2023-06-08 15:00:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '1',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'room1',
                    access_zone_id2: 'Неконтролируемая территория'
                }
            },
            day9: {
                event1: {
                    time_label: '"2023-06-09 09:00:00"',
                    time_label_utc: '"2023-06-09 06:00:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '1',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'Неконтролируемая территория',
                    access_zone_id2: 'room1'
                },
                event2: {
                    time_label: '"2023-06-09 18:01:00"',
                    time_label_utc: '"2023-06-09 15:01:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '1',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'room1',
                    access_zone_id2: 'Неконтролируемая территория'
                },
            },
            day10: {
                event1: {
                    time_label: '"2023-06-10 08:59:00"',
                    time_label_utc: '"2023-06-10 05:59:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '1',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'Неконтролируемая территория',
                    access_zone_id2: 'room1'
                },
                event2: {
                    time_label: '"2023-06-10 18:01:00"',
                    time_label_utc: '"2023-06-10 15:01:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '1',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'room1',
                    access_zone_id2: 'Неконтролируемая территория'
                },
            },
        },
        staff2: {
            day1: {
                event1: {
                    time_label: '"2023-06-02 09:00:00"',
                    time_label_utc: '"2023-06-02 06:00:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '2',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'Неконтролируемая территория',
                    access_zone_id2: 'room1'
                },
                event2: {
                    time_label: '"2023-06-03 09:00:00"',
                    time_label_utc: '"2023-06-03 06:00:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '2',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'room1',
                    access_zone_id2: 'Неконтролируемая территория'
                },
            },
            day2: {
                event1: {
                    time_label: '"2023-06-04 09:01:00"',
                    time_label_utc: '"2023-06-04 06:01:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '2',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'Неконтролируемая территория',
                    access_zone_id2: 'room1'
                },
                event2: {
                    time_label: '"2023-06-05 09:00:00"',
                    time_label_utc: '"2023-06-05 06:00:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '2',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'room1',
                    access_zone_id2: 'Неконтролируемая территория'
                },
            },
            day3: {
                event1: {
                    time_label: '"2023-06-06 09:02:00"',
                    time_label_utc: '"2023-06-06 06:02:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '2',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'Неконтролируемая территория',
                    access_zone_id2: 'room1'
                },
                event2: {
                    time_label: '"2023-06-07 09:00:00"',
                    time_label_utc: '"2023-06-07 06:00:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '2',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'room1',
                    access_zone_id2: 'Неконтролируемая территория'
                },
            },
            day4: {
                event1: {
                    time_label: '"2023-06-08 09:00:00"',
                    time_label_utc: '"2023-06-08 06:00:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '2',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'Неконтролируемая территория',
                    access_zone_id2: 'room1'
                },
                event2: {
                    time_label: '"2023-06-09 08:59:00"',
                    time_label_utc: '"2023-06-09 05:59:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '2',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'room1',
                    access_zone_id2: 'Неконтролируемая территория'
                },
            },
            day5: {
                event1: {
                    time_label: '"2023-06-10 09:00:00"',
                    time_label_utc: '"2023-06-10 06:00:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '2',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'Неконтролируемая территория',
                    access_zone_id2: 'room1'
                },
                event2: {
                    time_label: '"2023-06-11 08:58:00"',
                    time_label_utc: '"2023-06-11 05:58:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '2',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'room1',
                    access_zone_id2: 'Неконтролируемая территория'
                },
            },
            day6: {
                event1: {
                    time_label: '"2023-06-12 09:00:00"',
                    time_label_utc: '"2023-06-12 06:00:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '2',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'Неконтролируемая территория',
                    access_zone_id2: 'room1'
                },
                event2: {
                    time_label: '"2023-06-12 23:58:00"',
                    time_label_utc: '"2023-06-12 20:58:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '2',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'room1',
                    access_zone_id2: 'room2'
                },
                event3: {
                    time_label: '"2023-06-12 23:59:00"',
                    time_label_utc: '"2023-06-12 20:59:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '2',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'room2',
                    access_zone_id2: 'room1'
                },
                event4: {
                    time_label: '"2023-06-13 09:00:00"',
                    time_label_utc: '"2023-06-13 06:00:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '2',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'room1',
                    access_zone_id2: 'Неконтролируемая территория'
                },
            },
            day7: {
                event1: {
                    time_label: '"2023-06-14 09:00:00"',
                    time_label_utc: '"2023-06-14 06:00:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '2',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'Неконтролируемая территория',
                    access_zone_id2: 'room1'
                },
                event2: {
                    time_label: '"2023-06-14 23:59:00"',
                    time_label_utc: '"2023-06-14 20:59:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '2',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'room1',
                    access_zone_id2: 'room2'
                },
                event3: {
                    time_label: '"2023-06-15 00:01:00"',
                    time_label_utc: '"2023-06-15 00:01:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '2',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'room2',
                    access_zone_id2: 'room1'
                },
                event4: {
                    time_label: '"2023-06-15 09:00:00"',
                    time_label_utc: '"2023-06-15 06:00:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '2',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'room1',
                    access_zone_id2: 'Неконтролируемая территория'
                },
            },
            day8: {
                event1: {
                    time_label: '"2023-06-16 09:00:00"',
                    time_label_utc: '"2023-06-16 06:00:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '2',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'Неконтролируемая территория',
                    access_zone_id2: 'room1'
                },
                event2: {
                    time_label: '"2023-06-17 09:01:00"',
                    time_label_utc: '"2023-06-17 06:01:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '2',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'room1',
                    access_zone_id2: 'Неконтролируемая территория'
                },
            },
            day9: {
                event1: {
                    time_label: '"2023-06-18 09:00:00"',
                    time_label_utc: '"2023-06-18 05:00:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '2',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'Неконтролируемая территория',
                    access_zone_id2: 'room1'
                },
                event2: {
                    time_label: '"2023-06-19 09:02:00"',
                    time_label_utc: '"2023-06-19 06:02:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '2',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'room1',
                    access_zone_id2: 'Неконтролируемая территория'
                },
            },
        },
        staff3: {
            day1: {
                event1: {
                    time_label: '"2023-06-01 00:00:00"',
                    time_label_utc: '"2023-06-01 00:00:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '3',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'Неконтролируемая территория',
                    access_zone_id2: 'room1'
                },
                event2: {
                    time_label: '"2023-06-01 23:59:00"',
                    time_label_utc: '"2023-06-01 20:59:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '3',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'room1',
                    access_zone_id2: 'Неконтролируемая территория'
                },
            }
        },
        staff4: {
            day1: {
                event1: {
                    time_label: '"2023-06-01 09:00:00"',
                    time_label_utc: '"2023-06-01 06:00:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '4',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'Неконтролируемая территория',
                    access_zone_id2: 'room1'
                },
                event2: {
                    time_label: '"2023-06-01 12:30:00"',
                    time_label_utc: '"2023-06-01 09:30:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '4',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'room1',
                    access_zone_id2: 'room2'
                },
                event3: {
                    time_label: '"2023-06-01 13:30:00"',
                    time_label_utc: '"2023-06-01 10:30:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '4',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'room2',
                    access_zone_id2: 'room1'
                },
                event4: {
                    time_label: '"2023-06-01 18:00:00"',
                    time_label_utc: '"2023-06-01 15:00:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '4',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'room1',
                    access_zone_id2: 'Неконтролируемая территория'
                }
            },
            day2: {
                event1: {
                    time_label: '"2023-06-02 09:00:00"',
                    time_label_utc: '"2023-06-02 06:00:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '4',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'Неконтролируемая территория',
                    access_zone_id2: 'room1'
                },
                event2: {
                    time_label: '"2023-06-02 18:00:00"',
                    time_label_utc: '"2023-06-02 15:00:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '4',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'room1',
                    access_zone_id2: 'Неконтролируемая территория'
                },
            },
            day3: {
                event1: {
                    time_label: '"2023-06-03 09:01:00"',
                    time_label_utc: '"2023-06-03 06:01:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '4',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'Неконтролируемая территория',
                    access_zone_id2: 'room1'
                },
                event2: {
                    time_label: '"2023-06-03 18:00:00"',
                    time_label_utc: '"2023-06-03 15:00:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '4',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'room1',
                    access_zone_id2: 'Неконтролируемая территория'
                },
            },
            day4: {
                event1: {
                    time_label: '"2023-06-04 09:02:00"',
                    time_label_utc: '"2023-06-04 06:02:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '4',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'Неконтролируемая территория',
                    access_zone_id2: 'room1'
                },
                event2: {
                    time_label: '"2023-06-04 18:00:00"',
                    time_label_utc: '"2023-06-04 15:00:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '4',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'room1',
                    access_zone_id2: 'Неконтролируемая территория'
                },
            },
            day5: {
                event1: {
                    time_label: '"2023-06-05 09:00:00"',
                    time_label_utc: '"2023-06-05 06:00:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '4',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'Неконтролируемая территория',
                    access_zone_id2: 'room1'
                },
                event2: {
                    time_label: '"2023-06-05 17:59:00"',
                    time_label_utc: '"2023-06-05 14:59:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '4',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'room1',
                    access_zone_id2: 'Неконтролируемая территория'
                },
            },
            day6: {
                event1: {
                    time_label: '"2023-06-06 09:00:00"',
                    time_label_utc: '"2023-06-06 06:00:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '4',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'Неконтролируемая территория',
                    access_zone_id2: 'room1'
                },
                event2: {
                    time_label: '"2023-06-06 17:58:00"',
                    time_label_utc: '"2023-06-06 14:58:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '4',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'room1',
                    access_zone_id2: 'Неконтролируемая территория'
                },
            },
            day7: {
                event1: {
                    time_label: '"2023-06-07 09:00:00"',
                    time_label_utc: '"2023-06-07 06:00:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '1',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'Неконтролируемая территория',
                    access_zone_id2: 'room1'
                },
                event2: {
                    time_label: '"2023-06-07 13:00:00"',
                    time_label_utc: '"2023-06-07 10:00:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '1',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'room1',
                    access_zone_id2: 'room2'
                },
                event3: {
                    time_label: '"2023-06-07 14:01:00"',
                    time_label_utc: '"2023-06-07 11:01:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '1',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'room2',
                    access_zone_id2: 'room1'
                },
                event4: {
                    time_label: '"2023-06-07 18:00:00"',
                    time_label_utc: '"2023-06-07 15:00:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '1',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'room1',
                    access_zone_id2: 'Неконтролируемая территория'
                }
            },
            day8: {
                event1: {
                    time_label: '"2023-06-08 09:00:00"',
                    time_label_utc: '"2023-06-08 06:00:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '4',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'Неконтролируемая территория',
                    access_zone_id2: 'room1'
                },
                event2: {
                    time_label: '"2023-06-08 12:59:00"',
                    time_label_utc: '"2023-06-08 09:59:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '4',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'room1',
                    access_zone_id2: 'room2'
                },
                event3: {
                    time_label: '"2023-06-08 14:01:00"',
                    time_label_utc: '"2023-06-08 11:01:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '4',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'room2',
                    access_zone_id2: 'room1'
                },
                event4: {
                    time_label: '"2023-06-08 18:00:00"',
                    time_label_utc: '"2023-06-08 15:00:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '4',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'room1',
                    access_zone_id2: 'Неконтролируемая территория'
                }
            },
            day9: {
                event1: {
                    time_label: '"2023-06-09 09:00:00"',
                    time_label_utc: '"2023-06-09 06:00:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '4',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'Неконтролируемая территория',
                    access_zone_id2: 'room1'
                },
                event2: {
                    time_label: '"2023-06-09 12:30:00"',
                    time_label_utc: '"2023-06-09 09:30:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '4',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'room1',
                    access_zone_id2: 'room2'
                },
                event3: {
                    time_label: '"2023-06-09 13:32:00"',
                    time_label_utc: '"2023-06-09 10:32:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '4',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'room2',
                    access_zone_id2: 'room1'
                },
                event4: {
                    time_label: '"2023-06-09 18:00:00"',
                    time_label_utc: '"2023-06-09 15:00:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '4',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'room1',
                    access_zone_id2: 'Неконтролируемая территория'
                }
            },
            day10: {
                event1: {
                    time_label: '"2023-06-10 09:00:00"',
                    time_label_utc: '"2023-06-10 06:00:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '4',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'Неконтролируемая территория',
                    access_zone_id2: 'room1'
                },
                event2: {
                    time_label: '"2023-06-10 18:01:00"',
                    time_label_utc: '"2023-06-10 15:01:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '4',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'room1',
                    access_zone_id2: 'Неконтролируемая территория'
                },
            },
            day11: {
                event1: {
                    time_label: '"2023-06-11 08:59:00"',
                    time_label_utc: '"2023-06-11 05:59:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '4',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'Неконтролируемая территория',
                    access_zone_id2: 'room1'
                },
                event2: {
                    time_label: '"2023-06-11 18:01:00"',
                    time_label_utc: '"2023-06-11 15:01:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '4',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'room1',
                    access_zone_id2: 'Неконтролируемая территория'
                },
            },
        },
        staff5: {
            day1: {
                event1: {
                    time_label: '"2023-06-01 09:00:00"',
                    time_label_utc: '"2023-06-01 06:00:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '5',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'Неконтролируемая территория',
                    access_zone_id2: 'room1'
                },
                event2: {
                    time_label: '"2023-06-01 13:00:00"',
                    time_label_utc: '"2023-06-01 10:00:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '5',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'room1',
                    access_zone_id2: 'room2'
                },
                event3: {
                    time_label: '"2023-06-01 14:00:00"',
                    time_label_utc: '"2023-06-01 11:00:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '5',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'room2',
                    access_zone_id2: 'room1'
                },
                event4: {
                    time_label: '"2023-06-01 18:00:00"',
                    time_label_utc: '"2023-06-01 15:00:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '5',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'room1',
                    access_zone_id2: 'Неконтролируемая территория'
                }
            },
            day2: {
                event1: {
                    time_label: '"2023-06-02 08:59:00"',
                    time_label_utc: '"2023-06-02 05:59:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '5',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'Неконтролируемая территория',
                    access_zone_id2: 'room1'
                },
                event2: {
                    time_label: '"2023-06-02 18:01:00"',
                    time_label_utc: '"2023-06-02 15:01:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '5',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'room1',
                    access_zone_id2: 'Неконтролируемая территория'
                },
            },
            day3: {
                event1: {
                    time_label: '"2023-06-03 09:01:00"',
                    time_label_utc: '"2023-06-03 06:01:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '1',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'Неконтролируемая территория',
                    access_zone_id2: 'room1'
                },
                event2: {
                    time_label: '"2023-06-03 18:00:00"',
                    time_label_utc: '"2023-06-03 15:00:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '1',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'room1',
                    access_zone_id2: 'Неконтролируемая территория'
                },
            },
            day4: {
                event1: {
                    time_label: '"2023-06-04 09:02:00"',
                    time_label_utc: '"2023-06-04 06:02:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '1',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'Неконтролируемая территория',
                    access_zone_id2: 'room1'
                },
                event2: {
                    time_label: '"2023-06-04 18:00:00"',
                    time_label_utc: '"2023-06-04 15:00:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '1',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'room1',
                    access_zone_id2: 'Неконтролируемая территория'
                },
            },
            day5: {
                event1: {
                    time_label: '"2023-06-05 09:00:00"',
                    time_label_utc: '"2023-06-05 06:00:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '1',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'Неконтролируемая территория',
                    access_zone_id2: 'room1'
                },
                event2: {
                    time_label: '"2023-06-05 17:59:00"',
                    time_label_utc: '"2023-06-05 14:59:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '1',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'room1',
                    access_zone_id2: 'Неконтролируемая территория'
                },
            },
            day6: {
                event1: {
                    time_label: '"2023-06-06 09:00:00"',
                    time_label_utc: '"2023-06-06 06:00:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '1',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'Неконтролируемая территория',
                    access_zone_id2: 'room1'
                },
                event2: {
                    time_label: '"2023-06-06 17:58:00"',
                    time_label_utc: '"2023-06-06 14:58:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '1',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'room1',
                    access_zone_id2: 'Неконтролируемая территория'
                },
            },
            day7: {
                event1: {
                    time_label: '"2023-06-07 09:00:00"',
                    time_label_utc: '"2023-06-07 06:00:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '1',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'Неконтролируемая территория',
                    access_zone_id2: 'room1'
                },
                event2: {
                    time_label: '"2023-06-07 13:00:00"',
                    time_label_utc: '"2023-06-07 10:00:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '1',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'room1',
                    access_zone_id2: 'room2'
                },
                event3: {
                    time_label: '"2023-06-07 14:01:00"',
                    time_label_utc: '"2023-06-07 11:01:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '1',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'room2',
                    access_zone_id2: 'room1'
                },
                event4: {
                    time_label: '"2023-06-07 18:00:00"',
                    time_label_utc: '"2023-06-07 15:00:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '1',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'room1',
                    access_zone_id2: 'Неконтролируемая территория'
                }
            },
            day8: {
                event1: {
                    time_label: '"2023-06-08 09:00:00"',
                    time_label_utc: '"2023-06-08 06:00:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '5',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'Неконтролируемая территория',
                    access_zone_id2: 'room1'
                },
                event2: {
                    time_label: '"2023-06-08 13:00:00"',
                    time_label_utc: '"2023-06-08 10:00:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '5',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'room1',
                    access_zone_id2: 'room2'
                },
                event3: {
                    time_label: '"2023-06-08 14:01:00"',
                    time_label_utc: '"2023-06-08 11:01:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '5',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'room2',
                    access_zone_id2: 'room1'
                },
                event4: {
                    time_label: '"2023-06-08 18:00:00"',
                    time_label_utc: '"2023-06-08 15:00:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '5',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'room1',
                    access_zone_id2: 'Неконтролируемая территория'
                }
            },
        },
        staff6: {
            day1: {
                event1: {
                    time_label: '"2023-06-01 09:00:00"',
                    time_label_utc: '"2023-06-01 06:00:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '6',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'Неконтролируемая территория',
                    access_zone_id2: 'room1'
                },
                event2: {
                    time_label: '"2023-06-01 10:00:00"',
                    time_label_utc: '"2023-06-01 07:00:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '6',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'room1',
                    access_zone_id2: 'room2'
                },
                event3: {
                    time_label: '"2023-06-01 17:00:00"',
                    time_label_utc: '"2023-06-01 14:00:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '6',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'room2',
                    access_zone_id2: 'room1'
                },
                event4: {
                    time_label: '"2023-06-01 18:00:00"',
                    time_label_utc: '"2023-06-01 15:00:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '6',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'room1',
                    access_zone_id2: 'Неконтролируемая территория'
                }
            },
        },
        staff7: {
            day1: {
                event1: {
                    time_label: '"2023-06-02 09:00:00"',
                    time_label_utc: '"2023-06-02 06:00:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '7',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'Неконтролируемая территория',
                    access_zone_id2: 'room1'
                },
                event2: {
                    time_label: '"2023-06-02 10:00:00"',
                    time_label_utc: '"2023-06-02 07:00:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '7',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'room1',
                    access_zone_id2: 'room2'
                },
                event3: {
                    time_label: '"2023-06-02 17:00:00"',
                    time_label_utc: '"2023-06-02 14:00:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '7',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'room2',
                    access_zone_id2: 'room1'
                },
                event4: {
                    time_label: '"2023-06-03 09:00:00"',
                    time_label_utc: '"2023-06-03 06:00:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '7',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'room1',
                    access_zone_id2: 'Неконтролируемая территория'
                }
            },
        },
        staff8: {
            day1: {
                event1: {
                    time_label: '"2023-06-01 09:00:00"',
                    time_label_utc: '"2023-06-01 06:00:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '8',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'Неконтролируемая территория',
                    access_zone_id2: 'room1'
                },
                event2: {
                    time_label: '"2023-06-01 10:00:00"',
                    time_label_utc: '"2023-06-01 07:00:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '8',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'room1',
                    access_zone_id2: 'room2'
                },
                event3: {
                    time_label: '"2023-06-01 17:00:00"',
                    time_label_utc: '"2023-06-01 14:00:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '8',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'room2',
                    access_zone_id2: 'room1'
                },
                event4: {
                    time_label: '"2023-06-01 18:00:00"',
                    time_label_utc: '"2023-06-01 15:00:00"',
                    event_type: 17,
                    resource_number: 1,
                    resource_type: 12,
                    identifier: '8',
                    user_id: '',
                    device_id: '',
                    access_zone_id1: 'room1',
                    access_zone_id2: 'Неконтролируемая территория'
                }
            },
        }
    },
    holiday: {
        date1: {
            date: '2023-06-12',
            type: 1
        },
        date2: {
            date: '2023-06-13',
            reduction: '02:00',
            type: 2
        },
        date3: {
            date: '2023-06-17',
            reduction: '02:00',
            transfer_date: '2023-06-16',
            type: 3
        },
        year: '2023'
    },
    date: {
        day1: '1',
        day2: '30',
        month: 'Июнь',
        year: '2023',
        date: '2023-06-01 – 2023-06-30'
    },
    documents: {
        document1: {
            number: '1',
            name: 'ВМ/5 - Продолжительность работы вахтовым методом',
            hour: '00',
            minute: '02'
        },
        document2: {
            number: '2',
            name: 'ОВ/27 - Дополнительные выходные дни (оплачиваемые)',
            hour: '00',
            minute: '02'
        },
        document3: {
            number: '4',
            name: 'С/4 - Продолжительность сверхурочной работы',
            hour: '00',
            minute: '02'
        },
        document4: {
            number: '5',
            name: 'НП/32 - Время простоя по причинам, не зависящим от работодателя и работника',
        },
    },
    today: new Date().toLocaleDateString('fr-ca'),
}

const addURV = () => describe('Добавление данных для тестирования раздела УРВ.', () => {

    bef();
    aft();

    const params = {...dataURV}

    describe('Изменение вечернего и ночного времени', () => {
        it('Изменение времени на 10:00 - 11:00', async () => {
            const cook = await page.base.getCookie('token');
            const time = {
                begin_time: "10:00",
                end_time: "11:00"
            }

            await dec.simple(api.postEveningTime,
                [time, cook.text],
                api.postEveningTime);

            await dec.simple(api.postNightTime,
                [time, cook.text],
                api.postNightTime);
        });
    });

    describe('Добавление прадничных дней', () => {
        it('Добавление прадничных дней', async () => {
            const cook = await page.base.getCookie('token');

            await dec.simple(api.putHoliday,
                [params.holiday.date1, cook.text],
                api.putHoliday);

            await dec.simple(api.putHoliday,
                [params.holiday.date2, cook.text],
                api.putHoliday);

            await dec.simple(api.putHoliday,
                [params.holiday.date3, cook.text],
                api.putHoliday);
        });
    });

    describe('Добавление помещений', () => {
        decItApi.addRoomParent({
            room: params.rooms.room1
        });
        decItApi.addRoomChild({
            child: params.rooms.room2,
            parent: params.rooms.room1
        });
        decItApi.addRoomChild({
            child: params.rooms.room3,
            parent: params.rooms.room2
        });
    });

    describe('Добавление устройств', () => {
        decItApi.addDevice(params.devices.device1.obj);
        decItApi.addDevice(params.devices.device2.obj);
        decItApi.addDevice(params.devices.device3.obj);
    });

    describe('Добавление устройств в помещение', () => {
        decItApi.addDeviceInRoom({
            device: params.devices.device1.ip,
            room: params.rooms.room1
        });
        decItApi.addDeviceInRoom({
            device: params.devices.device2.ip,
            room: params.rooms.room2
        });
        decItApi.addDeviceInRoom({
            device: params.devices.device3.ip,
            room: params.rooms.room3
        });
    });

    describe('Добавление подразделений', () => {
        decItApi.addDivision(params.divisions.division1);
        decItApi.addDivision(params.divisions.division2);
        decItApi.addDivision(params.divisions.division3);
        decItApi.addDivision(params.divisions.division4);
        decItApi.addDivision(params.divisions.division5);
        decItApi.addDivision(params.divisions.division6);
        decItApi.addDivision(params.divisions.division7);
        decItApi.addDivision(params.divisions.division8);
    });

    describe('Добавление должностей', () => {
        decItApi.addPosition(params.positions.position1);
        decItApi.addPosition(params.positions.position2);
        decItApi.addPosition(params.positions.position3);
        decItApi.addPosition(params.positions.position4);
        decItApi.addPosition(params.positions.position5);
        decItApi.addPosition(params.positions.position6);
        decItApi.addPosition(params.positions.position7);
        decItApi.addPosition(params.positions.position8);
    });

    describe('Добавление графиков работы', () => {
        it(`Добавление недельного графика работы "${params.schedules.schedule1.name}"`, async () => {
            const cook = await page.base.getCookie('token');
            await dec.simple(api.putSchedule,
                [[params.schedules.schedule1.db], cook.text],
                api.putSchedule);
        });

        it(`Добавление сменного графика работы "${params.schedules.schedule2.name}"`, async () => {
            const cook = await page.base.getCookie('token');
            await dec.simple(api.putSchedule,
                [[params.schedules.schedule2.db], cook.text],
                api.putSchedule);
        });

        it(`Добавление графика по пристствию "${params.schedules.schedule3.name}"`, async () => {
            const cook = await page.base.getCookie('token');
            await dec.simple(api.putSchedule,
                [[params.schedules.schedule3.db], cook.text],
                api.putSchedule);
        });

        it(`Добавление гибкого графика работы "${params.schedules.schedule4.name}"`, async () => {
            const cook = await page.base.getCookie('token');
            await dec.simple(api.putSchedule,
                [[params.schedules.schedule4.db], cook.text],
                api.putSchedule);
        });

        it(`Добавление графика сбалансом "${params.schedules.schedule5.name}"`, async () => {
            const cook = await page.base.getCookie('token');
            await dec.simple(api.putSchedule,
                [[params.schedules.schedule5.db], cook.text],
                api.putSchedule);
        });

        it(`Добавление недельного графика работы "${params.schedules.schedule6.name}"`, async () => {
            const cook = await page.base.getCookie('token');
            await dec.simple(api.putSchedule,
                [[params.schedules.schedule6.db], cook.text],
                api.putSchedule);
        });

        it(`Добавление сменного графика работы "${params.schedules.schedule7.name}"`, async () => {
            const cook = await page.base.getCookie('token');
            await dec.simple(api.putSchedule,
                [[params.schedules.schedule7.db], cook.text],
                api.putSchedule);
        });

        it(`Добавление графика по пристствию "${params.schedules.schedule8.name}"`, async () => {
            const cook = await page.base.getCookie('token');
            await dec.simple(api.putSchedule,
                [[params.schedules.schedule8.db], cook.text],
                api.putSchedule);
        });
    });

    describe('Настройка у графиков учет рабочего времени на помещение', () => {
        describe('Переход в подраздел "Графики"', () => {
            decorate.el.subsection.handler({
                subsection: sub.per.schedule,
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
            decorate.page.schedule.init({
                timeout: entry.max
            });
        });

        describe('Настройка графика 1', () => {
            decorate.el.table.strHandler({
                strNumber: 1,
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
            decorate.el.butIcBefore.handler({
                icon: but.edit,
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
            decorate.page.scheduleChange.initEdit({
                timeout: entry.max
            });
            decorate.el.simpleCell.active({
                name: 'Регистрирующие помещения',
                timeout: entry.max
            });
            decorate.page.scheduleChange.checkboxWorkHandler({
                name: params.rooms.room1,
                timeout: entry.max
            });
            decorate.page.scheduleChange.checkboxNoWorkHandler({
                name: params.rooms.room2,
                timeout: entry.max
            });
            decorate.el.button.handler({
                name: 'Сохранить изменения',
                timeout: entry.max
            });
            decorate.el.success.success({
                text: 'Сохранено успешно',
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
            decorate.page.schedule.init({
                timeout: entry.max
            })
        });

        describe('Настройка графика 2', () => {
            decorate.el.table.strHandler({
                strNumber: 2,
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
            decorate.el.butIcBefore.handler({
                icon: but.edit,
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
            decorate.page.scheduleChange.initEdit({
                timeout: entry.max
            });
            decorate.el.simpleCell.active({
                name: 'Регистрирующие помещения',
                timeout: entry.max
            });
            decorate.page.scheduleChange.checkboxWorkHandler({
                name: params.rooms.room1,
                timeout: entry.max
            });
            decorate.page.scheduleChange.checkboxNoWorkHandler({
                name: params.rooms.room2,
                timeout: entry.max
            });
            decorate.el.button.handler({
                name: 'Сохранить изменения',
                timeout: entry.max
            });
            decorate.el.success.success({
                text: 'Сохранено успешно',
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
            decorate.page.schedule.init({
                timeout: entry.max
            })
        });

        describe('Настройка графика 3', () => {
            decorate.el.table.strHandler({
                strNumber: 3,
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
            decorate.el.butIcBefore.handler({
                icon: but.edit,
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
            decorate.page.scheduleChange.initEdit({
                timeout: entry.max
            });
            decorate.el.simpleCell.active({
                name: 'Регистрирующие помещения',
                timeout: entry.max
            });
            decorate.page.scheduleChange.checkboxWorkHandler({
                name: params.rooms.room1,
                timeout: entry.max
            });
            decorate.page.scheduleChange.checkboxNoWorkHandler({
                name: params.rooms.room2,
                timeout: entry.max
            });
            decorate.el.button.handler({
                name: 'Сохранить изменения',
                timeout: entry.max
            });
            decorate.el.success.success({
                text: 'Сохранено успешно',
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
            decorate.page.schedule.init({
                timeout: entry.max
            })
        });

        describe('Настройка графика 4', () => {
            decorate.el.table.strHandler({
                strNumber: 4,
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
            decorate.el.butIcBefore.handler({
                icon: but.edit,
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
            decorate.page.scheduleChange.initEdit({
                timeout: entry.max
            });
            decorate.el.simpleCell.active({
                name: 'Регистрирующие помещения',
                timeout: entry.max
            });
            decorate.page.scheduleChange.checkboxWorkHandler({
                name: params.rooms.room1,
                timeout: entry.max
            });
            decorate.page.scheduleChange.checkboxNoWorkHandler({
                name: params.rooms.room2,
                timeout: entry.max
            });
            decorate.el.button.handler({
                name: 'Сохранить изменения',
                timeout: entry.max
            });
            decorate.el.success.success({
                text: 'Сохранено успешно',
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
            decorate.page.schedule.init({
                timeout: entry.max
            })
        });

        describe('Настройка графика 5', () => {
            decorate.el.table.strHandler({
                strNumber: 5,
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
            decorate.el.butIcBefore.handler({
                icon: but.edit,
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
            decorate.page.scheduleChange.initEdit({
                timeout: entry.max
            });
            decorate.el.simpleCell.active({
                name: 'Регистрирующие помещения',
                timeout: entry.max
            });
            decorate.page.scheduleChange.checkboxWorkHandler({
                name: params.rooms.room1,
                timeout: entry.max
            });
            decorate.page.scheduleChange.checkboxNoWorkHandler({
                name: params.rooms.room2,
                timeout: entry.max
            });
            decorate.el.button.handler({
                name: 'Сохранить изменения',
                timeout: entry.max
            });
            decorate.el.success.success({
                text: 'Сохранено успешно',
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
            decorate.page.schedule.init({
                timeout: entry.max
            })
        });

        describe('Настройка графика 6', () => {
            decorate.el.table.strHandler({
                strNumber: 6,
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
            decorate.el.butIcBefore.handler({
                icon: but.edit,
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
            decorate.page.scheduleChange.initEdit({
                timeout: entry.max
            });
            decorate.el.simpleCell.active({
                name: 'Регистрирующие помещения',
                timeout: entry.max
            });
            decorate.page.scheduleChange.checkboxWorkHandler({
                name: params.rooms.room1,
                timeout: entry.max
            });
            decorate.page.scheduleChange.checkboxNoWorkHandler({
                name: params.rooms.room2,
                timeout: entry.max
            });
            decorate.el.button.handler({
                name: 'Сохранить изменения',
                timeout: entry.max
            });
            decorate.el.success.success({
                text: 'Сохранено успешно',
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
            decorate.page.schedule.init({
                timeout: entry.max
            })
        });

        describe('Настройка графика 7', () => {
            decorate.el.table.strHandler({
                strNumber: 7,
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
            decorate.el.butIcBefore.handler({
                icon: but.edit,
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
            decorate.page.scheduleChange.initEdit({
                timeout: entry.max
            });
            decorate.el.simpleCell.active({
                name: 'Регистрирующие помещения',
                timeout: entry.max
            });
            decorate.page.scheduleChange.checkboxWorkHandler({
                name: params.rooms.room1,
                timeout: entry.max
            });
            decorate.page.scheduleChange.checkboxNoWorkHandler({
                name: params.rooms.room2,
                timeout: entry.max
            });
            decorate.el.button.handler({
                name: 'Сохранить изменения',
                timeout: entry.max
            });
            decorate.el.success.success({
                text: 'Сохранено успешно',
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
            decorate.page.schedule.init({
                timeout: entry.max
            })
        });

        describe('Настройка графика 8', () => {
            decorate.el.table.strHandler({
                strNumber: 8,
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
            decorate.el.butIcBefore.handler({
                icon: but.edit,
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
            decorate.page.scheduleChange.initEdit({
                timeout: entry.max
            });
            decorate.el.simpleCell.active({
                name: 'Регистрирующие помещения',
                timeout: entry.max
            });
            decorate.page.scheduleChange.checkboxWorkHandler({
                name: params.rooms.room1,
                timeout: entry.max
            });
            decorate.page.scheduleChange.checkboxNoWorkHandler({
                name: params.rooms.room2,
                timeout: entry.max
            });
            decorate.el.button.handler({
                name: 'Сохранить изменения',
                timeout: entry.max
            });
            decorate.el.success.success({
                text: 'Сохранено успешно',
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
            decorate.page.schedule.init({
                timeout: entry.max
            })
        });
    });

    describe('Добавление сотрудников', () => {
        it(`Добавление сотрудника "${params.fio.staff1}".`, async () => {
            const cook = await page.base.getCookie('token');
            const arrDivision = await api.getDivision(cook.text);
            const divisionId = arrDivision.text.filter(obj => obj.name === params.staffs.staff1.division)[0].id;
            const arrPosition = await api.getPosition(cook.text);
            const positionId = arrPosition.text.filter(obj => obj.name === params.staffs.staff1.position)[0].id;
            const arrSchedule = await api.getSchedule(cook.text);
            const scheduleId = arrSchedule.text.filter(obj => obj.name === params.staffs.staff1.work_schedule)[0].id;
            const staff = {
                ...params.staffs.staff1,
                division: divisionId,
                position: positionId,
                work_schedule: scheduleId
            }
            await dec.simple(api.putStaff,
                [[staff], cook.text],
                api.putStaff);
        });

        it(`Добавление сотрудника "${params.fio.staff2}".`, async () => {
            const cook = await page.base.getCookie('token');
            const arrDivision = await api.getDivision(cook.text);
            const divisionId = arrDivision.text.filter(obj => obj.name === params.staffs.staff2.division)[0].id;
            const arrPosition = await api.getPosition(cook.text);
            const positionId = arrPosition.text.filter(obj => obj.name === params.staffs.staff2.position)[0].id;
            const arrSchedule = await api.getSchedule(cook.text);
            const scheduleId = arrSchedule.text.filter(obj => obj.name === params.staffs.staff2.work_schedule)[0].id;
            const staff = {
                ...params.staffs.staff2,
                division: divisionId,
                position: positionId,
                work_schedule: scheduleId
            }
            await dec.simple(api.putStaff,
                [[staff], cook.text],
                api.putStaff);
        });

        it(`Добавление сотрудника "${params.fio.staff3}".`, async () => {
            const cook = await page.base.getCookie('token');
            const arrDivision = await api.getDivision(cook.text);
            const divisionId = arrDivision.text.filter(obj => obj.name === params.staffs.staff3.division)[0].id;
            const arrPosition = await api.getPosition(cook.text);
            const positionId = arrPosition.text.filter(obj => obj.name === params.staffs.staff3.position)[0].id;
            const arrSchedule = await api.getSchedule(cook.text);
            const scheduleId = arrSchedule.text.filter(obj => obj.name === params.staffs.staff3.work_schedule)[0].id;
            const staff = {
                ...params.staffs.staff3,
                division: divisionId,
                position: positionId,
                work_schedule: scheduleId
            }
            await dec.simple(api.putStaff,
                [[staff], cook.text],
                api.putStaff);
        });

        it(`Добавление сотрудника "${params.fio.staff4}".`, async () => {
            const cook = await page.base.getCookie('token');
            const arrDivision = await api.getDivision(cook.text);
            const divisionId = arrDivision.text.filter(obj => obj.name === params.staffs.staff4.division)[0].id;
            const arrPosition = await api.getPosition(cook.text);
            const positionId = arrPosition.text.filter(obj => obj.name === params.staffs.staff4.position)[0].id;
            const arrSchedule = await api.getSchedule(cook.text);
            const scheduleId = arrSchedule.text.filter(obj => obj.name === params.staffs.staff4.work_schedule)[0].id;
            const staff = {
                ...params.staffs.staff4,
                division: divisionId,
                position: positionId,
                work_schedule: scheduleId
            }
            await dec.simple(api.putStaff,
                [[staff], cook.text],
                api.putStaff);
        });

        it(`Добавление сотрудника "${params.fio.staff5}".`, async () => {
            const cook = await page.base.getCookie('token');
            const arrDivision = await api.getDivision(cook.text);
            const divisionId = arrDivision.text.filter(obj => obj.name === params.staffs.staff5.division)[0].id;
            const arrPosition = await api.getPosition(cook.text);
            const positionId = arrPosition.text.filter(obj => obj.name === params.staffs.staff5.position)[0].id;
            const arrSchedule = await api.getSchedule(cook.text);
            const scheduleId = arrSchedule.text.filter(obj => obj.name === params.staffs.staff5.work_schedule)[0].id;
            const staff = {
                ...params.staffs.staff5,
                division: divisionId,
                position: positionId,
                work_schedule: scheduleId
            }
            await dec.simple(api.putStaff,
                [[staff], cook.text],
                api.putStaff);
        });

        it(`Добавление сотрудника "${params.fio.staff6}".`, async () => {
            const cook = await page.base.getCookie('token');
            const arrDivision = await api.getDivision(cook.text);
            const divisionId = arrDivision.text.filter(obj => obj.name === params.staffs.staff6.division)[0].id;
            const arrPosition = await api.getPosition(cook.text);
            const positionId = arrPosition.text.filter(obj => obj.name === params.staffs.staff6.position)[0].id;
            const arrSchedule = await api.getSchedule(cook.text);
            const scheduleId = arrSchedule.text.filter(obj => obj.name === params.staffs.staff6.work_schedule)[0].id;
            const staff = {
                ...params.staffs.staff6,
                division: divisionId,
                position: positionId,
                work_schedule: scheduleId
            }
            await dec.simple(api.putStaff,
                [[staff], cook.text],
                api.putStaff);
        });

        it(`Добавление сотрудника "${params.fio.staff7}".`, async () => {
            const cook = await page.base.getCookie('token');
            const arrDivision = await api.getDivision(cook.text);
            const divisionId = arrDivision.text.filter(obj => obj.name === params.staffs.staff7.division)[0].id;
            const arrPosition = await api.getPosition(cook.text);
            const positionId = arrPosition.text.filter(obj => obj.name === params.staffs.staff7.position)[0].id;
            const arrSchedule = await api.getSchedule(cook.text);
            const scheduleId = arrSchedule.text.filter(obj => obj.name === params.staffs.staff7.work_schedule)[0].id;
            const staff = {
                ...params.staffs.staff7,
                division: divisionId,
                position: positionId,
                work_schedule: scheduleId
            }
            await dec.simple(api.putStaff,
                [[staff], cook.text],
                api.putStaff);
        });

        it(`Добавление сотрудника "${params.fio.staff8}".`, async () => {
            const cook = await page.base.getCookie('token');
            const arrDivision = await api.getDivision(cook.text);
            const divisionId = arrDivision.text.filter(obj => obj.name === params.staffs.staff8.division)[0].id;
            const arrPosition = await api.getPosition(cook.text);
            const positionId = arrPosition.text.filter(obj => obj.name === params.staffs.staff8.position)[0].id;
            const arrSchedule = await api.getSchedule(cook.text);
            const scheduleId = arrSchedule.text.filter(obj => obj.name === params.staffs.staff8.work_schedule)[0].id;
            const staff = {
                ...params.staffs.staff8,
                division: divisionId,
                position: positionId,
                work_schedule: scheduleId
            }
            await dec.simple(api.putStaff,
                [[staff], cook.text],
                api.putStaff);
        });
    });

    describe('Добавление проходов', () => {
        it('Добавление проходов сотрудникам', async () => {
            const cook = await page.base.getCookie('token');
            const arrStaff = await api.getStaff(cook.text);
            const staff1 = arrStaff.text.filter(obj => obj.name === params.fio.staff1)[0].id;
            const staff2 = arrStaff.text.filter(obj => obj.name === params.fio.staff2)[0].id;
            const staff3 = arrStaff.text.filter(obj => obj.name === params.fio.staff3)[0].id;
            const staff4 = arrStaff.text.filter(obj => obj.name === params.fio.staff4)[0].id;
            const staff5 = arrStaff.text.filter(obj => obj.name === params.fio.staff5)[0].id;
            const staff6 = arrStaff.text.filter(obj => obj.name === params.fio.staff6)[0].id;
            const staff7 = arrStaff.text.filter(obj => obj.name === params.fio.staff7)[0].id;
            const staff8 = arrStaff.text.filter(obj => obj.name === params.fio.staff8)[0].id;

            const arrDevice = await api.getDevice(cook.text);
            const device1 = arrDevice.text.filter(obj => obj.ip_addr === params.devices.device1.ip)[0].id;
            const device2 = arrDevice.text.filter(obj => obj.ip_addr === params.devices.device2.ip)[0].id;
            const device3 = arrDevice.text.filter(obj => obj.ip_addr === params.devices.device3.ip)[0].id;

            const arrRooms = await api.getRoom(cook.text);
            const room0 = arrRooms.text.filter(obj => obj.name === 'Неконтролируемая территория')[0].id;
            const room1 = arrRooms.text.filter(obj => obj.name === params.rooms.room1)[0].id;
            const room2 = arrRooms.text.filter(obj => obj.name === params.rooms.room2)[0].id;
            const room3 = arrRooms.text.filter(obj => obj.name === params.rooms.room3)[0].id;

            //События Сотрудника 1 - День 1
            await dec.simple(db.addEvent,
                [{
                    ...params.events.staff1.day1.event1,
                    user_id: staff1,
                    device_id: device1,
                    access_zone_id1: room1,
                    access_zone_id2: room0,
                }],
                db.addEvent);

            await dec.simple(db.addEvent,
                [{
                    ...params.events.staff1.day1.event2,
                    user_id: staff1,
                    device_id: device2,
                    access_zone_id1: room2,
                    access_zone_id2: room1,
                }],
                db.addEvent);

            await dec.simple(db.addEvent,
                [{
                    ...params.events.staff1.day1.event3,
                    user_id: staff1,
                    device_id: device2,
                    access_zone_id1: room1,
                    access_zone_id2: room2,
                }],
                db.addEvent);

            await dec.simple(db.addEvent,
                [{
                    ...params.events.staff1.day1.event4,
                    user_id: staff1,
                    device_id: device1,
                    access_zone_id1: room0,
                    access_zone_id2: room1,
                }],
                db.addEvent);

            //События Сотрудника 1 - День 2
            await dec.simple(db.addEvent,
                [{
                    ...params.events.staff1.day2.event1,
                    user_id: staff1,
                    device_id: device1,
                    access_zone_id1: room1,
                    access_zone_id2: room0,
                }],
                db.addEvent);

            await dec.simple(db.addEvent,
                [{
                    ...params.events.staff1.day2.event2,
                    user_id: staff1,
                    device_id: device2,
                    access_zone_id1: room2,
                    access_zone_id2: room1,
                }],
                db.addEvent);

            //События Сотрудника 1 - День 3
            await dec.simple(db.addEvent,
                [{
                    ...params.events.staff1.day3.event1,
                    user_id: staff1,
                    device_id: device1,
                    access_zone_id1: room1,
                    access_zone_id2: room0,
                }],
                db.addEvent);

            await dec.simple(db.addEvent,
                [{
                    ...params.events.staff1.day3.event2,
                    user_id: staff1,
                    device_id: device2,
                    access_zone_id1: room2,
                    access_zone_id2: room1,
                }],
                db.addEvent);

            //События Сотрудника 1 - День 4
            await dec.simple(db.addEvent,
                [{
                    ...params.events.staff1.day4.event1,
                    user_id: staff1,
                    device_id: device1,
                    access_zone_id1: room1,
                    access_zone_id2: room0,
                }],
                db.addEvent);

            await dec.simple(db.addEvent,
                [{
                    ...params.events.staff1.day4.event2,
                    user_id: staff1,
                    device_id: device2,
                    access_zone_id1: room2,
                    access_zone_id2: room1,
                }],
                db.addEvent);

            //События Сотрудника 1 - День 5
            await dec.simple(db.addEvent,
                [{
                    ...params.events.staff1.day5.event1,
                    user_id: staff1,
                    device_id: device1,
                    access_zone_id1: room1,
                    access_zone_id2: room0,
                }],
                db.addEvent);

            await dec.simple(db.addEvent,
                [{
                    ...params.events.staff1.day5.event2,
                    user_id: staff1,
                    device_id: device2,
                    access_zone_id1: room2,
                    access_zone_id2: room1,
                }],
                db.addEvent);

            //События Сотрудника 1 - День 6
            await dec.simple(db.addEvent,
                [{
                    ...params.events.staff1.day6.event1,
                    user_id: staff1,
                    device_id: device1,
                    access_zone_id1: room1,
                    access_zone_id2: room0,
                }],
                db.addEvent);

            await dec.simple(db.addEvent,
                [{
                    ...params.events.staff1.day6.event2,
                    user_id: staff1,
                    device_id: device2,
                    access_zone_id1: room2,
                    access_zone_id2: room1,
                }],
                db.addEvent);

            //События Сотрудника 1 - День 7
            await dec.simple(db.addEvent,
                [{
                    ...params.events.staff1.day7.event1,
                    user_id: staff1,
                    device_id: device1,
                    access_zone_id1: room1,
                    access_zone_id2: room0,
                }],
                db.addEvent);

            await dec.simple(db.addEvent,
                [{
                    ...params.events.staff1.day7.event2,
                    user_id: staff1,
                    device_id: device2,
                    access_zone_id1: room2,
                    access_zone_id2: room1,
                }],
                db.addEvent);

            await dec.simple(db.addEvent,
                [{
                    ...params.events.staff1.day7.event3,
                    user_id: staff1,
                    device_id: device2,
                    access_zone_id1: room1,
                    access_zone_id2: room2,
                }],
                db.addEvent);

            await dec.simple(db.addEvent,
                [{
                    ...params.events.staff1.day7.event4,
                    user_id: staff1,
                    device_id: device1,
                    access_zone_id1: room0,
                    access_zone_id2: room1,
                }],
                db.addEvent);

            //События Сотрудника 1 - День 8
            await dec.simple(db.addEvent,
                [{
                    ...params.events.staff1.day8.event1,
                    user_id: staff1,
                    device_id: device1,
                    access_zone_id1: room1,
                    access_zone_id2: room0,
                }],
                db.addEvent);

            await dec.simple(db.addEvent,
                [{
                    ...params.events.staff1.day8.event2,
                    user_id: staff1,
                    device_id: device2,
                    access_zone_id1: room2,
                    access_zone_id2: room1,
                }],
                db.addEvent);

            await dec.simple(db.addEvent,
                [{
                    ...params.events.staff1.day8.event3,
                    user_id: staff1,
                    device_id: device2,
                    access_zone_id1: room1,
                    access_zone_id2: room2,
                }],
                db.addEvent);

            await dec.simple(db.addEvent,
                [{
                    ...params.events.staff1.day8.event4,
                    user_id: staff1,
                    device_id: device1,
                    access_zone_id1: room0,
                    access_zone_id2: room1,
                }],
                db.addEvent);

            //События Сотрудника 1 - День 9
            await dec.simple(db.addEvent,
                [{
                    ...params.events.staff1.day9.event1,
                    user_id: staff1,
                    device_id: device1,
                    access_zone_id1: room1,
                    access_zone_id2: room0,
                }],
                db.addEvent);

            await dec.simple(db.addEvent,
                [{
                    ...params.events.staff1.day9.event2,
                    user_id: staff1,
                    device_id: device2,
                    access_zone_id1: room2,
                    access_zone_id2: room1,
                }],
                db.addEvent);

            //События Сотрудника 1 - День 10
            await dec.simple(db.addEvent,
                [{
                    ...params.events.staff1.day10.event1,
                    user_id: staff1,
                    device_id: device1,
                    access_zone_id1: room1,
                    access_zone_id2: room0,
                }],
                db.addEvent);

            await dec.simple(db.addEvent,
                [{
                    ...params.events.staff1.day10.event2,
                    user_id: staff1,
                    device_id: device2,
                    access_zone_id1: room2,
                    access_zone_id2: room1,
                }],
                db.addEvent);

            //События Сотрудника 2 - День 1
            await dec.simple(db.addEvent,
                [{
                    ...params.events.staff2.day1.event1,
                    user_id: staff2,
                    device_id: device1,
                    access_zone_id1: room1,
                    access_zone_id2: room0,
                }],
                db.addEvent);

            await dec.simple(db.addEvent,
                [{
                    ...params.events.staff2.day1.event2,
                    user_id: staff2,
                    device_id: device2,
                    access_zone_id1: room0,
                    access_zone_id2: room1,
                }],
                db.addEvent);

            //События Сотрудника 2 - День 2
            await dec.simple(db.addEvent,
                [{
                    ...params.events.staff2.day2.event1,
                    user_id: staff2,
                    device_id: device1,
                    access_zone_id1: room1,
                    access_zone_id2: room0,
                }],
                db.addEvent);

            await dec.simple(db.addEvent,
                [{
                    ...params.events.staff2.day2.event2,
                    user_id: staff2,
                    device_id: device2,
                    access_zone_id1: room0,
                    access_zone_id2: room1,
                }],
                db.addEvent);

            //События Сотрудника 2 - День 3
            await dec.simple(db.addEvent,
                [{
                    ...params.events.staff2.day3.event1,
                    user_id: staff2,
                    device_id: device1,
                    access_zone_id1: room1,
                    access_zone_id2: room0,
                }],
                db.addEvent);

            await dec.simple(db.addEvent,
                [{
                    ...params.events.staff2.day3.event2,
                    user_id: staff2,
                    device_id: device2,
                    access_zone_id1: room0,
                    access_zone_id2: room1,
                }],
                db.addEvent);

            //События Сотрудника 2 - День 4
            await dec.simple(db.addEvent,
                [{
                    ...params.events.staff2.day4.event1,
                    user_id: staff2,
                    device_id: device1,
                    access_zone_id1: room1,
                    access_zone_id2: room0,
                }],
                db.addEvent);

            await dec.simple(db.addEvent,
                [{
                    ...params.events.staff2.day4.event2,
                    user_id: staff2,
                    device_id: device2,
                    access_zone_id1: room0,
                    access_zone_id2: room1,
                }],
                db.addEvent);

            //События Сотрудника 2 - День 5
            await dec.simple(db.addEvent,
                [{
                    ...params.events.staff2.day5.event1,
                    user_id: staff2,
                    device_id: device1,
                    access_zone_id1: room1,
                    access_zone_id2: room0,
                }],
                db.addEvent);

            await dec.simple(db.addEvent,
                [{
                    ...params.events.staff2.day5.event2,
                    user_id: staff2,
                    device_id: device2,
                    access_zone_id1: room0,
                    access_zone_id2: room1,
                }],
                db.addEvent);

            //События Сотрудника 2 - День 6
            await dec.simple(db.addEvent,
                [{
                    ...params.events.staff2.day6.event1,
                    user_id: staff2,
                    device_id: device1,
                    access_zone_id1: room1,
                    access_zone_id2: room0,
                }],
                db.addEvent);

            await dec.simple(db.addEvent,
                [{
                    ...params.events.staff2.day6.event2,
                    user_id: staff2,
                    device_id: device2,
                    access_zone_id1: room2,
                    access_zone_id2: room1,
                }],
                db.addEvent);

            await dec.simple(db.addEvent,
                [{
                    ...params.events.staff2.day6.event3,
                    user_id: staff2,
                    device_id: device2,
                    access_zone_id1: room1,
                    access_zone_id2: room2,
                }],
                db.addEvent);

            await dec.simple(db.addEvent,
                [{
                    ...params.events.staff2.day6.event4,
                    user_id: staff2,
                    device_id: device1,
                    access_zone_id1: room0,
                    access_zone_id2: room1,
                }],
                db.addEvent);

            //События Сотрудника 2 - День 7
            await dec.simple(db.addEvent,
                [{
                    ...params.events.staff2.day7.event1,
                    user_id: staff2,
                    device_id: device1,
                    access_zone_id1: room1,
                    access_zone_id2: room0,
                }],
                db.addEvent);

            await dec.simple(db.addEvent,
                [{
                    ...params.events.staff2.day7.event2,
                    user_id: staff2,
                    device_id: device2,
                    access_zone_id1: room2,
                    access_zone_id2: room1,
                }],
                db.addEvent);

            await dec.simple(db.addEvent,
                [{
                    ...params.events.staff2.day7.event3,
                    user_id: staff2,
                    device_id: device2,
                    access_zone_id1: room1,
                    access_zone_id2: room2,
                }],
                db.addEvent);

            await dec.simple(db.addEvent,
                [{
                    ...params.events.staff2.day7.event4,
                    user_id: staff2,
                    device_id: device1,
                    access_zone_id1: room0,
                    access_zone_id2: room1,
                }],
                db.addEvent);

            //События Сотрудника 2 - День 8
            await dec.simple(db.addEvent,
                [{
                    ...params.events.staff2.day8.event1,
                    user_id: staff2,
                    device_id: device1,
                    access_zone_id1: room1,
                    access_zone_id2: room0,
                }],
                db.addEvent);

            await dec.simple(db.addEvent,
                [{
                    ...params.events.staff2.day8.event2,
                    user_id: staff2,
                    device_id: device2,
                    access_zone_id1: room0,
                    access_zone_id2: room1,
                }],
                db.addEvent);

            //События Сотрудника 2 - День 9
            await dec.simple(db.addEvent,
                [{
                    ...params.events.staff2.day9.event1,
                    user_id: staff2,
                    device_id: device1,
                    access_zone_id1: room1,
                    access_zone_id2: room0,
                }],
                db.addEvent);

            await dec.simple(db.addEvent,
                [{
                    ...params.events.staff2.day9.event2,
                    user_id: staff2,
                    device_id: device2,
                    access_zone_id1: room0,
                    access_zone_id2: room1,
                }],
                db.addEvent);

            //События Сотрудника 3 - День 1
            await dec.simple(db.addEvent,
                [{
                    ...params.events.staff3.day1.event1,
                    user_id: staff3,
                    device_id: device1,
                    access_zone_id1: room1,
                    access_zone_id2: room0,
                }],
                db.addEvent);

            await dec.simple(db.addEvent,
                [{
                    ...params.events.staff3.day1.event2,
                    user_id: staff3,
                    device_id: device2,
                    access_zone_id1: room0,
                    access_zone_id2: room1,
                }],
                db.addEvent);

            //События Сотрудника 4 - День 1
            await dec.simple(db.addEvent,
                [{
                    ...params.events.staff4.day1.event1,
                    user_id: staff4,
                    device_id: device1,
                    access_zone_id1: room1,
                    access_zone_id2: room0,
                }],
                db.addEvent);

            await dec.simple(db.addEvent,
                [{
                    ...params.events.staff4.day1.event2,
                    user_id: staff4,
                    device_id: device2,
                    access_zone_id1: room2,
                    access_zone_id2: room1,
                }],
                db.addEvent);

            await dec.simple(db.addEvent,
                [{
                    ...params.events.staff4.day1.event3,
                    user_id: staff4,
                    device_id: device2,
                    access_zone_id1: room1,
                    access_zone_id2: room2,
                }],
                db.addEvent);

            await dec.simple(db.addEvent,
                [{
                    ...params.events.staff4.day1.event4,
                    user_id: staff4,
                    device_id: device1,
                    access_zone_id1: room0,
                    access_zone_id2: room1,
                }],
                db.addEvent);

            //События Сотрудника 4 - День 2
            await dec.simple(db.addEvent,
                [{
                    ...params.events.staff4.day2.event1,
                    user_id: staff4,
                    device_id: device1,
                    access_zone_id1: room1,
                    access_zone_id2: room0,
                }],
                db.addEvent);

            await dec.simple(db.addEvent,
                [{
                    ...params.events.staff4.day2.event2,
                    user_id: staff4,
                    device_id: device2,
                    access_zone_id1: room2,
                    access_zone_id2: room1,
                }],
                db.addEvent);

            //События Сотрудника 4 - День 3
            await dec.simple(db.addEvent,
                [{
                    ...params.events.staff4.day3.event1,
                    user_id: staff4,
                    device_id: device1,
                    access_zone_id1: room1,
                    access_zone_id2: room0,
                }],
                db.addEvent);

            await dec.simple(db.addEvent,
                [{
                    ...params.events.staff4.day3.event2,
                    user_id: staff4,
                    device_id: device2,
                    access_zone_id1: room2,
                    access_zone_id2: room1,
                }],
                db.addEvent);

            //События Сотрудника 4 - День 4
            await dec.simple(db.addEvent,
                [{
                    ...params.events.staff4.day4.event1,
                    user_id: staff4,
                    device_id: device1,
                    access_zone_id1: room1,
                    access_zone_id2: room0,
                }],
                db.addEvent);

            await dec.simple(db.addEvent,
                [{
                    ...params.events.staff4.day4.event2,
                    user_id: staff4,
                    device_id: device2,
                    access_zone_id1: room2,
                    access_zone_id2: room1,
                }],
                db.addEvent);

            //События Сотрудника 4 - День 5
            await dec.simple(db.addEvent,
                [{
                    ...params.events.staff4.day5.event1,
                    user_id: staff4,
                    device_id: device1,
                    access_zone_id1: room1,
                    access_zone_id2: room0,
                }],
                db.addEvent);

            await dec.simple(db.addEvent,
                [{
                    ...params.events.staff4.day5.event2,
                    user_id: staff4,
                    device_id: device2,
                    access_zone_id1: room2,
                    access_zone_id2: room1,
                }],
                db.addEvent);

            //События Сотрудника 4 - День 6
            await dec.simple(db.addEvent,
                [{
                    ...params.events.staff4.day6.event1,
                    user_id: staff4,
                    device_id: device1,
                    access_zone_id1: room1,
                    access_zone_id2: room0,
                }],
                db.addEvent);

            await dec.simple(db.addEvent,
                [{
                    ...params.events.staff4.day6.event2,
                    user_id: staff4,
                    device_id: device2,
                    access_zone_id1: room2,
                    access_zone_id2: room1,
                }],
                db.addEvent);

            //События Сотрудника 4 - День 7
            await dec.simple(db.addEvent,
                [{
                    ...params.events.staff4.day7.event1,
                    user_id: staff4,
                    device_id: device1,
                    access_zone_id1: room1,
                    access_zone_id2: room0,
                }],
                db.addEvent);

            await dec.simple(db.addEvent,
                [{
                    ...params.events.staff4.day7.event2,
                    user_id: staff4,
                    device_id: device2,
                    access_zone_id1: room2,
                    access_zone_id2: room1,
                }],
                db.addEvent);

            await dec.simple(db.addEvent,
                [{
                    ...params.events.staff4.day7.event3,
                    user_id: staff4,
                    device_id: device2,
                    access_zone_id1: room1,
                    access_zone_id2: room2,
                }],
                db.addEvent);

            await dec.simple(db.addEvent,
                [{
                    ...params.events.staff4.day7.event4,
                    user_id: staff4,
                    device_id: device1,
                    access_zone_id1: room0,
                    access_zone_id2: room1,
                }],
                db.addEvent);

            //События Сотрудника 4 - День 8
            await dec.simple(db.addEvent,
                [{
                    ...params.events.staff4.day8.event1,
                    user_id: staff4,
                    device_id: device1,
                    access_zone_id1: room1,
                    access_zone_id2: room0,
                }],
                db.addEvent);

            await dec.simple(db.addEvent,
                [{
                    ...params.events.staff4.day8.event2,
                    user_id: staff4,
                    device_id: device2,
                    access_zone_id1: room2,
                    access_zone_id2: room1,
                }],
                db.addEvent);

            await dec.simple(db.addEvent,
                [{
                    ...params.events.staff4.day8.event3,
                    user_id: staff4,
                    device_id: device2,
                    access_zone_id1: room1,
                    access_zone_id2: room2,
                }],
                db.addEvent);

            await dec.simple(db.addEvent,
                [{
                    ...params.events.staff4.day8.event4,
                    user_id: staff4,
                    device_id: device1,
                    access_zone_id1: room0,
                    access_zone_id2: room1,
                }],
                db.addEvent);

            //События Сотрудника 4 - День 9
            await dec.simple(db.addEvent,
                [{
                    ...params.events.staff4.day9.event1,
                    user_id: staff4,
                    device_id: device1,
                    access_zone_id1: room1,
                    access_zone_id2: room0,
                }],
                db.addEvent);

            await dec.simple(db.addEvent,
                [{
                    ...params.events.staff4.day9.event2,
                    user_id: staff4,
                    device_id: device2,
                    access_zone_id1: room2,
                    access_zone_id2: room1,
                }],
                db.addEvent);

            await dec.simple(db.addEvent,
                [{
                    ...params.events.staff4.day9.event3,
                    user_id: staff4,
                    device_id: device2,
                    access_zone_id1: room1,
                    access_zone_id2: room2,
                }],
                db.addEvent);

            await dec.simple(db.addEvent,
                [{
                    ...params.events.staff4.day9.event4,
                    user_id: staff4,
                    device_id: device1,
                    access_zone_id1: room0,
                    access_zone_id2: room1,
                }],
                db.addEvent);

            //События Сотрудника 4 - День 10
            await dec.simple(db.addEvent,
                [{
                    ...params.events.staff4.day10.event1,
                    user_id: staff4,
                    device_id: device1,
                    access_zone_id1: room1,
                    access_zone_id2: room0,
                }],
                db.addEvent);

            await dec.simple(db.addEvent,
                [{
                    ...params.events.staff4.day10.event2,
                    user_id: staff4,
                    device_id: device2,
                    access_zone_id1: room2,
                    access_zone_id2: room1,
                }],
                db.addEvent);

            //События Сотрудника 4 - День 11
            await dec.simple(db.addEvent,
                [{
                    ...params.events.staff4.day11.event1,
                    user_id: staff4,
                    device_id: device1,
                    access_zone_id1: room1,
                    access_zone_id2: room0,
                }],
                db.addEvent);

            await dec.simple(db.addEvent,
                [{
                    ...params.events.staff4.day11.event2,
                    user_id: staff4,
                    device_id: device2,
                    access_zone_id1: room2,
                    access_zone_id2: room1,
                }],
                db.addEvent);

            //События Сотрудника 5 - День 1
            await dec.simple(db.addEvent,
                [{
                    ...params.events.staff5.day1.event1,
                    user_id: staff5,
                    device_id: device1,
                    access_zone_id1: room1,
                    access_zone_id2: room0,
                }],
                db.addEvent);

            await dec.simple(db.addEvent,
                [{
                    ...params.events.staff5.day1.event2,
                    user_id: staff5,
                    device_id: device2,
                    access_zone_id1: room2,
                    access_zone_id2: room1,
                }],
                db.addEvent);

            await dec.simple(db.addEvent,
                [{
                    ...params.events.staff5.day1.event3,
                    user_id: staff5,
                    device_id: device2,
                    access_zone_id1: room1,
                    access_zone_id2: room2,
                }],
                db.addEvent);

            await dec.simple(db.addEvent,
                [{
                    ...params.events.staff5.day1.event4,
                    user_id: staff5,
                    device_id: device1,
                    access_zone_id1: room0,
                    access_zone_id2: room1,
                }],
                db.addEvent);

            //События Сотрудника 5 - День 2
            await dec.simple(db.addEvent,
                [{
                    ...params.events.staff5.day2.event1,
                    user_id: staff5,
                    device_id: device1,
                    access_zone_id1: room1,
                    access_zone_id2: room0,
                }],
                db.addEvent);

            await dec.simple(db.addEvent,
                [{
                    ...params.events.staff5.day2.event2,
                    user_id: staff5,
                    device_id: device2,
                    access_zone_id1: room2,
                    access_zone_id2: room1,
                }],
                db.addEvent);

            //События Сотрудника 5 - День 3
            await dec.simple(db.addEvent,
                [{
                    ...params.events.staff5.day3.event1,
                    user_id: staff5,
                    device_id: device1,
                    access_zone_id1: room1,
                    access_zone_id2: room0,
                }],
                db.addEvent);

            await dec.simple(db.addEvent,
                [{
                    ...params.events.staff5.day3.event2,
                    user_id: staff5,
                    device_id: device2,
                    access_zone_id1: room2,
                    access_zone_id2: room1,
                }],
                db.addEvent);

            //События Сотрудника 5 - День 4
            await dec.simple(db.addEvent,
                [{
                    ...params.events.staff5.day4.event1,
                    user_id: staff5,
                    device_id: device1,
                    access_zone_id1: room1,
                    access_zone_id2: room0,
                }],
                db.addEvent);

            await dec.simple(db.addEvent,
                [{
                    ...params.events.staff5.day4.event2,
                    user_id: staff5,
                    device_id: device2,
                    access_zone_id1: room2,
                    access_zone_id2: room1,
                }],
                db.addEvent);

            //События Сотрудника 5 - День 5
            await dec.simple(db.addEvent,
                [{
                    ...params.events.staff5.day5.event1,
                    user_id: staff5,
                    device_id: device1,
                    access_zone_id1: room1,
                    access_zone_id2: room0,
                }],
                db.addEvent);

            await dec.simple(db.addEvent,
                [{
                    ...params.events.staff5.day5.event2,
                    user_id: staff5,
                    device_id: device2,
                    access_zone_id1: room2,
                    access_zone_id2: room1,
                }],
                db.addEvent);

            //События Сотрудника 5 - День 6
            await dec.simple(db.addEvent,
                [{
                    ...params.events.staff5.day6.event1,
                    user_id: staff5,
                    device_id: device1,
                    access_zone_id1: room1,
                    access_zone_id2: room0,
                }],
                db.addEvent);

            await dec.simple(db.addEvent,
                [{
                    ...params.events.staff5.day6.event2,
                    user_id: staff5,
                    device_id: device2,
                    access_zone_id1: room2,
                    access_zone_id2: room1,
                }],
                db.addEvent);

            //События Сотрудника 5 - День 7
            await dec.simple(db.addEvent,
                [{
                    ...params.events.staff5.day7.event1,
                    user_id: staff5,
                    device_id: device1,
                    access_zone_id1: room1,
                    access_zone_id2: room0,
                }],
                db.addEvent);

            await dec.simple(db.addEvent,
                [{
                    ...params.events.staff5.day7.event2,
                    user_id: staff5,
                    device_id: device2,
                    access_zone_id1: room2,
                    access_zone_id2: room1,
                }],
                db.addEvent);

            await dec.simple(db.addEvent,
                [{
                    ...params.events.staff5.day7.event3,
                    user_id: staff5,
                    device_id: device2,
                    access_zone_id1: room1,
                    access_zone_id2: room2,
                }],
                db.addEvent);

            await dec.simple(db.addEvent,
                [{
                    ...params.events.staff5.day7.event4,
                    user_id: staff5,
                    device_id: device1,
                    access_zone_id1: room0,
                    access_zone_id2: room1,
                }],
                db.addEvent);

            //События Сотрудника 5 - День 8
            await dec.simple(db.addEvent,
                [{
                    ...params.events.staff5.day8.event1,
                    user_id: staff5,
                    device_id: device1,
                    access_zone_id1: room1,
                    access_zone_id2: room0,
                }],
                db.addEvent);

            await dec.simple(db.addEvent,
                [{
                    ...params.events.staff5.day8.event2,
                    user_id: staff5,
                    device_id: device2,
                    access_zone_id1: room2,
                    access_zone_id2: room1,
                }],
                db.addEvent);

            await dec.simple(db.addEvent,
                [{
                    ...params.events.staff5.day8.event3,
                    user_id: staff5,
                    device_id: device2,
                    access_zone_id1: room1,
                    access_zone_id2: room2,
                }],
                db.addEvent);

            await dec.simple(db.addEvent,
                [{
                    ...params.events.staff5.day8.event4,
                    user_id: staff5,
                    device_id: device1,
                    access_zone_id1: room0,
                    access_zone_id2: room1,
                }],
                db.addEvent);

            //События Сотрудника 6 - День 1
            await dec.simple(db.addEvent,
                [{
                    ...params.events.staff6.day1.event1,
                    user_id: staff6,
                    device_id: device1,
                    access_zone_id1: room1,
                    access_zone_id2: room0,
                }],
                db.addEvent);

            await dec.simple(db.addEvent,
                [{
                    ...params.events.staff6.day1.event2,
                    user_id: staff6,
                    device_id: device2,
                    access_zone_id1: room2,
                    access_zone_id2: room1,
                }],
                db.addEvent);

            await dec.simple(db.addEvent,
                [{
                    ...params.events.staff6.day1.event3,
                    user_id: staff6,
                    device_id: device2,
                    access_zone_id1: room1,
                    access_zone_id2: room2,
                }],
                db.addEvent);

            await dec.simple(db.addEvent,
                [{
                    ...params.events.staff6.day1.event4,
                    user_id: staff6,
                    device_id: device1,
                    access_zone_id1: room0,
                    access_zone_id2: room1,
                }],
                db.addEvent);

            //События Сотрудника 7 - День 1
            await dec.simple(db.addEvent,
                [{
                    ...params.events.staff7.day1.event1,
                    user_id: staff7,
                    device_id: device1,
                    access_zone_id1: room1,
                    access_zone_id2: room0,
                }],
                db.addEvent);

            await dec.simple(db.addEvent,
                [{
                    ...params.events.staff7.day1.event2,
                    user_id: staff7,
                    device_id: device2,
                    access_zone_id1: room2,
                    access_zone_id2: room1,
                }],
                db.addEvent);

            await dec.simple(db.addEvent,
                [{
                    ...params.events.staff7.day1.event3,
                    user_id: staff7,
                    device_id: device2,
                    access_zone_id1: room1,
                    access_zone_id2: room2,
                }],
                db.addEvent);

            await dec.simple(db.addEvent,
                [{
                    ...params.events.staff7.day1.event4,
                    user_id: staff7,
                    device_id: device1,
                    access_zone_id1: room0,
                    access_zone_id2: room1,
                }],
                db.addEvent);

            //События Сотрудника 8 - День 1
            await dec.simple(db.addEvent,
                [{
                    ...params.events.staff8.day1.event1,
                    user_id: staff8,
                    device_id: device1,
                    access_zone_id1: room1,
                    access_zone_id2: room0,
                }],
                db.addEvent);

            await dec.simple(db.addEvent,
                [{
                    ...params.events.staff8.day1.event2,
                    user_id: staff8,
                    device_id: device2,
                    access_zone_id1: room2,
                    access_zone_id2: room1,
                }],
                db.addEvent);

            await dec.simple(db.addEvent,
                [{
                    ...params.events.staff8.day1.event3,
                    user_id: staff8,
                    device_id: device2,
                    access_zone_id1: room1,
                    access_zone_id2: room2,
                }],
                db.addEvent);

            await dec.simple(db.addEvent,
                [{
                    ...params.events.staff8.day1.event4,
                    user_id: staff8,
                    device_id: device1,
                    access_zone_id1: room0,
                    access_zone_id2: room1,
                }],
                db.addEvent);
        });
    });
});

const deleteURV = () => describe('Удаление данных для тестирования раздела УРВ.', () => {

    bef();
    aft();

    const params = {...dataURV}

    it('Удаление праздников', async () => {
        const cook = await page.base.getCookie('token');
        await dec.simple(api.deleteHoliday,
            [params.holiday.year, cook.text],
            api.deleteHoliday);
    });

    it('Удаление проходов сотрудникам', async () => {
        const cook = await page.base.getCookie('token');
        const arrStaff = await api.getStaff(cook.text);
        const staff1 = arrStaff.text.filter(obj => obj.name === params.fio.staff1)[0].id;
        const staff2 = arrStaff.text.filter(obj => obj.name === params.fio.staff2)[0].id;
        const staff3 = arrStaff.text.filter(obj => obj.name === params.fio.staff3)[0].id;
        const staff4 = arrStaff.text.filter(obj => obj.name === params.fio.staff4)[0].id;
        const staff5 = arrStaff.text.filter(obj => obj.name === params.fio.staff5)[0].id;

        //Удаление событий у сотрудника 1
        await dec.simple(db.deleteEventFioId,
            [staff1],
            db.deleteEventFioId);

        //Удаление событий у сотрудника 2
        await dec.simple(db.deleteEventFioId,
            [staff2],
            db.deleteEventFioId);

        //Удаление событий у сотрудника 3
        await dec.simple(db.deleteEventFioId,
            [staff3],
            db.deleteEventFioId);

        //Удаление событий у сотрудника 4
        await dec.simple(db.deleteEventFioId,
            [staff4],
            db.deleteEventFioId);

        //Удаление событий у сотрудника 5
        await dec.simple(db.deleteEventFioId,
            [staff5],
            db.deleteEventFioId);
    });

    it('Удаление сотрудников', async () => {
        const cook = await page.base.getCookie('token');
        const arrStaff = await api.getStaff(cook.text);
        const staff1 = arrStaff.text.filter(obj => obj.name === params.fio.staff1)[0].id;
        const staff2 = arrStaff.text.filter(obj => obj.name === params.fio.staff2)[0].id;
        const staff3 = arrStaff.text.filter(obj => obj.name === params.fio.staff3)[0].id;
        const staff4 = arrStaff.text.filter(obj => obj.name === params.fio.staff4)[0].id;
        const staff5 = arrStaff.text.filter(obj => obj.name === params.fio.staff5)[0].id;
        const staff6 = arrStaff.text.filter(obj => obj.name === params.fio.staff6)[0].id;
        const staff7 = arrStaff.text.filter(obj => obj.name === params.fio.staff7)[0].id;
        const staff8 = arrStaff.text.filter(obj => obj.name === params.fio.staff8)[0].id;

        await dec.simple(db.deleteUser,
            [staff1],
            db.deleteUser);

        await dec.simple(db.deleteUser,
            [staff2],
            db.deleteUser);

        await dec.simple(db.deleteUser,
            [staff3],
            db.deleteUser);

        await dec.simple(db.deleteUser,
            [staff4],
            db.deleteUser);

        await dec.simple(db.deleteUser,
            [staff5],
            db.deleteUser);

        await dec.simple(db.deleteUser,
            [staff6],
            db.deleteUser);

        await dec.simple(db.deleteUser,
            [staff7],
            db.deleteUser);

        await dec.simple(db.deleteUser,
            [staff8],
            db.deleteUser);
    });

    it('Удаление должностей', async () => {
        const cook = await page.base.getCookie('token');
        const arrPosition = await api.getPosition(cook.text);
        const position1 = arrPosition.text.filter(obj => obj.name === params.positions.position1.name)[0].id;
        const position2 = arrPosition.text.filter(obj => obj.name === params.positions.position2.name)[0].id;
        const position3 = arrPosition.text.filter(obj => obj.name === params.positions.position3.name)[0].id;
        const position4 = arrPosition.text.filter(obj => obj.name === params.positions.position4.name)[0].id;
        const position5 = arrPosition.text.filter(obj => obj.name === params.positions.position5.name)[0].id;
        const position6 = arrPosition.text.filter(obj => obj.name === params.positions.position6.name)[0].id;
        const position7 = arrPosition.text.filter(obj => obj.name === params.positions.position7.name)[0].id;
        const position8 = arrPosition.text.filter(obj => obj.name === params.positions.position8.name)[0].id;

        await dec.simple(api.deletePosition,
            [[position1, position2, position3, position4, position5, position6, position7, position8], cook.text],
            api.deletePosition)
    });

    it('Удаление подразделений', async () => {
        const cook = await page.base.getCookie('token');
        const arrDivision = await api.getDivision(cook.text);
        const division1 = arrDivision.text.filter(obj => obj.name === params.divisions.division1.name)[0].id;
        const division2 = arrDivision.text.filter(obj => obj.name === params.divisions.division2.name)[0].id;
        const division3 = arrDivision.text.filter(obj => obj.name === params.divisions.division3.name)[0].id;
        const division4 = arrDivision.text.filter(obj => obj.name === params.divisions.division4.name)[0].id;
        const division5 = arrDivision.text.filter(obj => obj.name === params.divisions.division5.name)[0].id;
        const division6 = arrDivision.text.filter(obj => obj.name === params.divisions.division6.name)[0].id;
        const division7 = arrDivision.text.filter(obj => obj.name === params.divisions.division7.name)[0].id;
        const division8 = arrDivision.text.filter(obj => obj.name === params.divisions.division8.name)[0].id;

        await dec.simple(api.deleteDivision,
            [[division1], cook.text],
            api.deleteDivision);

        await dec.simple(api.deleteDivision,
            [[division2], cook.text],
            api.deleteDivision);

        await dec.simple(api.deleteDivision,
            [[division3], cook.text],
            api.deleteDivision);

        await dec.simple(api.deleteDivision,
            [[division4], cook.text],
            api.deleteDivision);

        await dec.simple(api.deleteDivision,
            [[division5], cook.text],
            api.deleteDivision);

        await dec.simple(api.deleteDivision,
            [[division6], cook.text],
            api.deleteDivision);

        await dec.simple(api.deleteDivision,
            [[division7], cook.text],
            api.deleteDivision);

        await dec.simple(api.deleteDivision,
            [[division8], cook.text],
            api.deleteDivision);
    });

    decItApi.deleteSchedule({
        name: params.schedules.schedule1.name
    });
    decItApi.deleteSchedule({
        name: params.schedules.schedule2.name
    });
    decItApi.deleteSchedule({
        name: params.schedules.schedule3.name
    });
    decItApi.deleteSchedule({
        name: params.schedules.schedule4.name
    });
    decItApi.deleteSchedule({
        name: params.schedules.schedule5.name
    });
    decItApi.deleteSchedule({
        name: params.schedules.schedule6.name
    });
    decItApi.deleteSchedule({
        name: params.schedules.schedule7.name
    });
    decItApi.deleteSchedule({
        name: params.schedules.schedule8.name
    });

    decItApi.deleteDeviceInRoom({
        ip: params.devices.device1.ip
    });
    decItApi.deleteDeviceInRoom({
        ip: params.devices.device2.ip,
    });
    decItApi.deleteDeviceInRoom({
        ip: params.devices.device3.ip,
    });

    decItApi.deleteDevice({
        ip: params.devices.device1.ip
    });
    decItApi.deleteDevice({
        ip: params.devices.device2.ip,
    });
    decItApi.deleteDevice({
        ip: params.devices.device3.ip,
    });

    decItApi.deleteRoom({
        room: params.rooms.room3
    });
    decItApi.deleteRoom({
        room: params.rooms.room2
    });
    decItApi.deleteRoom({
        room: params.rooms.room1
    });
});

module.exports =  {
    dataControlAccess,
    addDataControlAccess,
    deleteDataControlAccess,
    dataStaff,
    addDataStaff,
    deleteDataStaff,
    addDataStaffFilter,
    deleteDataStaffFilter,
    dataSchedule,
    addDataSchedule,
    deleteDataSchedule,
    dataVisitor,
    addDataVisitor,
    deleteDataVisitor,
    dataSchedule,
    dataURV,
    addURV,
    deleteURV,
}