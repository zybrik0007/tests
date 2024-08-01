/*
const {it, describe, before, after} = require('mocha');
const entry = require('../../../../entry');
const dec = require('../../dictionaries/decorate');
const decItApi = require('../../decorates/api-decorates/decorate-it-api');
const page = require('../../pages');
//const api = require('../other/api');
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






const addDataRoleOperator = () => describe('Добавление данных для тестирования подразделов ' +
    'Роли и права операторов и Операторы', () => {

    const params = {...dataRoleOperator}

    bef();
    aft();

    describe('Добавление помещений', () => {
        decItApi.addRoomParent({
            room: params.rooms.room1
        });
        decItApi.addRoomParent({
            room: params.rooms.room2
        });
        decItApi.addRoomParent({
            room: params.rooms.room3
        });
    });

    describe('Добавление устройств', () => {
        decItApi.addDevice(params.devices.device1.obj);
        decItApi.addDevice(params.devices.device2.obj);
        decItApi.addDevice(params.devices.device3.obj);
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

    describe('Добавление шаблонов пропуска', () => {
        it(`Добавление шаблон дизайна "${params.designs.design1.name}"`,
            async () => await dec.simple(db.addDesignTemplate,
                [params.designs.design1],
                db.addDesignTemplate));

        it(`Добавление шаблон дизайна "${params.designs.design2.name}"`,
            async () => await dec.simple(db.addDesignTemplate,
                [params.designs.design2],
                db.addDesignTemplate));

        it(`Добавление шаблон дизайна "${params.designs.design3.name}"`,
            async () => await dec.simple(db.addDesignTemplate,
                [params.designs.design3],
                db.addDesignTemplate));
    });

    describe('Добавление шаблоны верификаций', () => {
        it(`Добавление шаблон верификации "${params.verify.verify1.name}"`,
            async () => await dec.simple(db.addVerifyTemplate,
                [params.verify.verify1],
                db.addVerifyTemplate));

        it(`Добавление шаблон верификации "${params.verify.verify2.name}"`,
            async () => await dec.simple(db.addVerifyTemplate,
                [params.verify.verify2],
                db.addVerifyTemplate));

        it(`Добавление шаблон верификации "${params.verify.verify3.name}"`,
            async () => await dec.simple(db.addVerifyTemplate,
                [params.verify.verify3],
                db.addVerifyTemplate));
    });

    describe('Добавление планы помещений', () => {
        it(`Добавление интерактивного плана "${params.plan.plan1.name}"`,
            async () => await dec.simple(db.addPlan,
                [params.plan.plan1],
                db.addPlan));

        it(`Добавление интерактивного плана "${params.plan.plan2.name}"`,
            async () => await dec.simple(db.addPlan,
                [params.plan.plan2],
                db.addPlan));
    });

    describe('Доблавние сотрудников', () => {
        it('Добавление сотруднков', async () => {
            const cook = await page.base.getCookie('token');
            await dec.simple(api.putStaff,
                [[params.staff1], cook.text],
                api.putStaff);
            await dec.simple(api.putStaff,
                [[params.staff2], cook.text],
                api.putStaff)
        });
    });
});

const deleteDataRoleOperator = () => describe('Удаление данных для тестирования подразделов ' +
    'Роли и права операторов и Операторы', () => {

    const params = {...dataRoleOperator}

    bef();
    aft();

    it('Удаление сотрудников', async () => {
        const cook = await page.base.getCookie('token');
        const arrStaff = await api.getStaff(cook.text);
        const staff1 = arrStaff.text.filter(obj => obj.name === params.operator1.fio)[0].id;
        const staff2 = arrStaff.text.filter(obj => obj.name === params.operator2.fio)[0].id;

        await dec.simple(db.deleteUser,
            [staff1],
            db.deleteUser);

        await dec.simple(db.deleteUser,
            [staff2],
            db.deleteUser);
    });

    it('Удаление должностей', async () => {
        const cook = await page.base.getCookie('token');
        const arrPosition = await api.getPosition(cook.text);
        const position2 = arrPosition.text.filter(obj => obj.name === params.positions.position2.name)[0].id;

        await dec.simple(api.deletePosition,
            [[position2], cook.text],
            api.deletePosition)
    });

    it('Удаление шаблонов доступа', async () => {
        const cook = await page.base.getCookie('token');
        const arrTemplate = await api.getTemplate(cook.text);

        const template2 = arrTemplate.text.filter(obj => obj.name === params.templates.template2)[0].id;
        await dec.simple(api.deleteTemplate,
            [[template2], cook.text],
            api.deleteTemplate);
    });

    it('Удаление подразделений', async () => {
        const cook = await page.base.getCookie('token');
        const arrDivision = await api.getDivision(cook.text);
        const division2 = arrDivision.text.filter(obj => obj.name === params.divisions.division2.name)[0].id;

        await dec.simple(api.deleteDivision,
            [[division2], cook.text],
            api.deleteDivision);
    });

    decItApi.deleteSchedule({
        name: params.schedules.schedule2.name
    });

    decItApi.deleteDevice({
        ip: params.devices.device2.ip,
    });

    decItApi.deleteRoom({
        room: params.rooms.room2
    });

    it('Удаление Дизайн пропуска', async() => await dec.simple(db.deleteDesignTemplate,
        [params.design.design2],
        db.deleteDesignTemplate));

    it('Удаление Плана', async() => await dec.simple(db.deletePlan,
        [params.plans.plan1],
        db.deletePlan));

    it('Удаление Плана', async() => await dec.simple(db.deletePlan,
        [params.plans.plan2],
        db.deletePlan));

    it('Удаление Шаблона верификации', async() => await dec.simple(db.deleteVerifyTemplate,
        [params.verif.verify2],
        db.deleteVerifyTemplate));

    it('Удаление Дизайн пропуска', async() => await dec.simple(db.deleteVerifyTemplate,
        [params.verif.verify1],
        db.deleteVerifyTemplate));
});




const dataVerify = {
    verify1: {
        name: 'verifyName1',
        displayData: {
            fio: true,
            tabel: true,
            divison: true,
            position: true,
            schedule: true,
            template: true,
            transport: false,
            email: false,
            phone: false,
            pinCode: false
        },
        point1: {
            params: {
                info: {
                    display: 'Не более чем',
                    value: '2'
                },
                video: {
                    prerecord: '8',
                    record: '6',
                    framed: '2'
                }
            },
            reaction: {
                staff: {
                    pass: 'Отслеживать',
                    verify: 'Нет (режим индикации)',
                    time: 'Отслеживать',
                    zone: 'Отслеживать',
                    security: 'Отслеживать',
                    unguarding: 'Отслеживать',
                },
                visitor: {
                    time:  'Отслеживать',
                    verify: 'Нет (режим индикации)',
                    zone: 'Отслеживать',
                    pass: 'Отслеживать',
                },
                event: {
                    registered: 'Отслеживать',
                    blocked: 'Отслеживать',
                    expired: 'Отслеживать',
                    wdd: 'Отслеживать',
                    bw: 'Отслеживать',
                    du: 'Отслеживать',
                }
            }
        }
    },
    verify2: {
        name: 'verifyName2',
        description: 'verifyDescription2',
        displayData: {
            fio: true,
            tabel: true,
            divison: true,
            position: true,
            schedule: true,
            template: true,
            transport: true,
            email: true,
            phone: true,
            pinCode: true
        },
        keyboardResolve: 'F1',
        keyboardProhibit: 'F2',
        http: 'https://github.com/zybrik0007/tests',
        point1: {
            params: {
                info: {
                    display: 'Постоянно'
                },
                video: {
                    prerecord: '120',
                    record: '255',
                    framed: '10'
                }
            },
            reaction: {
                staff: {
                    pass: 'Не отслеживать',
                    time: 'Не отслеживать',
                    zone: 'Не отслеживать',
                    security: 'Не отслеживать',
                    unguarding: 'Не отслеживать',
                },
                visitor: {
                    time: 'Не отслеживать',
                    zone: 'Не отслеживать',
                    pass: 'Не отслеживать',
                },
                event: {
                    registered: 'Не отслеживать',
                    blocked: 'Не отслеживать',
                    expired: 'Не отслеживать',
                    wdd: 'Не отслеживать',
                    bw: 'Не отслеживать',
                    du: 'Не отслеживать',
                }
            }
        },
    },
    verify3: {
        name: 'verifyName3',
        keyboardResolve: 'F1',
        keyboardProhibit: 'F1',
    },
    point1: {
        name: 'point1',
        device: entry.device_name_1,
        reader: 'Направление 1',
        camera: 'camera1'
    },
    point2: {
        name: 'point2',
        device: entry.device_name_1,
        reader: 'Направление 1',
        camera: 'camera1'
    },
    point3: {
        name: 'point3',
        device: entry.device_name_1,
        reader: 'Направление 1',
        camera: 'camera1'
    },
    device: {
        ip: entry.device_ip_1,
        name: entry.device_name_1
    },
    camera: {
        name: 'camera1',
        ip: '172.17.0.1',
        port: '8333',
        login: 'admin',
        password: 'admin1',
        template: 'AXIS - All (mjpeg_over_http)'
    },
    rooms: {
        room1: 'room1',
        room2: 'room2'
    },
}

const addDataVerify = () => describe('Добавление данных для тестирования подраздела ' +
    'Конфигурация верификация', () => {

    bef();
    aft();

    const params = {...dataVerify}

    describe('Добавление помещений', () => {
        decItApi.addRoomParent({
            room: params.rooms.room1
        });
        decItApi.addRoomChild({
            child: params.rooms.room2,
            parent: params.rooms.room1
        });
    });

    describe('Добавление устройств в помещение', () => {
        decItApi.addDeviceInRoom({
            device: params.device.ip,
            room: params.rooms.room1
        });
        decItApi.addDeviceInRoom({
            device: params.camera.ip,
            room: params.rooms.room2
        });
    })

});

const deleteDataVerify = () => describe('Удаление данных для тестирования подраздела ' +
    'Конфигурация верификация', () => {

    bef();
    aft();

    const params = {...dataVerify}

    describe('Добавление устройств из помещения', () => {
        decItApi.deleteDeviceInRoom({
            ip: params.device.ip,
        });
        decItApi.deleteDeviceInRoom({
            ip: params.camera.ip,
        });
    });

    describe('Удаление помещений', () => {
        decItApi.deleteRoom({
            room: params.rooms.room2
        });
        decItApi.deleteRoom({
            room: params.rooms.room1
        });
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
    addURVDocument,
    deleteURVDocument,
    dataTemplate,
    addDataTemplate,
    deleteDataTemplate,
    addDataStaffTemplate,
    deleteDataStaffTemplate,
    dataDesign,
    addDataDesign,
    deleteDataDesign,
    dataVisitorReport,
    addDataVisitorReport,
    deleteDataVisitorReport,
    dataDivision,
    addDataDivision,
    deleteDataDivision,
    addDataStaffDivision,
    deleteDataStaffDivision,
    dataAdditinalData,
    dataPosition,
    addDataStaffPosition,
    deleteDataStaffPosition,
    dataConfiguration,
    dataEventaction,
    dataTask,
    dataRoleOperator,
    addDataRoleOperator,
    deleteDataRoleOperator,
    dataEvent,
    dataDeviceManagement,
    addDataDeviceManagement,
    deleteDataDeviceManagement,
    dataVerify,
    addDataVerify,
    deleteDataVerify
}
*/
