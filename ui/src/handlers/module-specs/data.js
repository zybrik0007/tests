const {it, describe, before, after} = require('mocha');
const entry = require('../../../../entry');
const dec = require('../../dictionaries/decorate');
const decItApi = require('../../dictionaries/decorate-it-api');
const page = require('../../pages');
const api = require('../other/api');
const db = require('../../database');

const bef = () => before('Авторизация', async () => await dec.auth(entry.customLogin, entry.customPassword));
const aft = () => after('Выход', async () => await dec.exit());

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
    date: () => {
        const yesterday = new Date(new Date() - 24*3600*1000).toLocaleDateString('fr-ca');
        const today = new Date().toLocaleDateString('fr-ca');
        return yesterday + ' – ' + today
    },
    dateTimeToday: () => {
        const today = new Date().toLocaleDateString('fr-ca');
        return today + ' 00:00' + ' – ' + today + ' 23:59'
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

const addDataControlAccess = () => describe('Добавление данных для тестетирование отчетов раздела Котроль доступа',
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

            // Изменение даты добавления карты у Staff3 и Visitor3
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
                    user_id: visitor3,
                    identifier: params.visitor.visitor3.identifier[0].identifier,
                    operator_id: 1,
                    create_date: params.dateCard
                }],
                db.addEvent);

/*            await dec.simple(db.quitDb,
                [],
                db.quitDb);*/
        });
    });
});

const deleteDataControlAccess = () => describe('Удаление данных для тестетирование отчетов раздела Котроль доступа', () => {
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

module.exports =  {
    dataControlAccess,
    addDataControlAccess,
    deleteDataControlAccess,
}