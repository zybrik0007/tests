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

const addDataSchedule = () => describe('Добавление данных для тестирования подраздела Сотрудники / Графики работы',
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

const deleteDataSchedule = () => describe('Удаление данных для тестирования подразделов Сотрудники / Графики работы',
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
            day1: {}
        },
        rooms: {
            room1: true
        },
        devices: {
            device1: true
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
        }
    },
    weekly2: {},
    shift1: {},
    shift2: {},
    attendance1: {},
    attendance2: {},
    violation1: {},
    violation2: {},
    balance1: {},
    balance2: {},


}


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
    deleteDataVisitor
}