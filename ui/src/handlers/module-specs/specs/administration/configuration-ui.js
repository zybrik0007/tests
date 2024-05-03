const {describe, it, before, after} = require('mocha');

const entry = require('../../../../../../entry');
const page = require('../../../../pages');
const el = require('../../../../elements');
const dec = require('../../../../dictionaries/decorate');
const sec = require('../../../../dictionaries/section');
const sub = require('../../../../dictionaries/subsection');
const but = require('../../../../dictionaries/button-icon');
const icon = require('../../../../dictionaries/icon');
const api = require('../../../other/api');
const deleteData = require('../../../other/deleteData');
const oth = require('../../../other/other');
const decItApi = require('../../../../dictionaries/decorate-it-api');
const decorate = require('../../../../decorates');
const db = require('../../../../database');
const data = require('../../data').dataConfiguration;

const befARoom = () => before('Вход и открытие подраздела "Конфигурация" вкладка "Помещения"', async () => {
    await page.base.loading(entry.sleep1);
    await dec.auth(entry.customLogin, entry.customPassword);
    await dec.simple(el.section.handler, [sec.adm, entry.max], el.section);
    await dec.simple(el.subsection.handler, [sub.adm.conf, entry.max], el.subsection);
    await dec.simple(el.tab.handler, ['Помещения', entry.max], el.tab);
    await dec.simple(page.room.init, [entry.max], page.room);
    await page.base.loading(entry.sleep1);
});

const befDevice = () => before('Вход и открытие подраздела "Конфигурация" вкладка "Устройства"', async () => {
    await page.base.loading(entry.sleep1);
    await dec.auth(entry.customLogin, entry.customPassword);
    await dec.simple(el.section.handler, [sec.adm, entry.max], el.section);
    await dec.simple(el.subsection.handler, [sub.adm.conf, entry.max], el.subsection);
    await dec.simple(el.tab.handler, ['Устройства', entry.max], el.tab);
    await dec.simple(page.device.init, [entry.max], page.device);
    await page.base.loading(entry.sleep1);
});

const befEvent = () => before('Вход и открытие подраздела "Конфигурация" вкладка "События"', async () => {
    await page.base.loading(entry.sleep1);
    await dec.auth(entry.customLogin, entry.customPassword);
    await dec.simple(el.section.handler, [sec.adm, entry.max], el.section);
    await dec.simple(el.subsection.handler, [sub.adm.conf, entry.max], el.subsection);
    await dec.simple(el.tab.handler, ['События', entry.max], el.tab);
    await dec.simple(page.eventRename.init, [entry.max], page.eventRename);
    await page.base.loading(entry.sleep1);
});

const befCamera = () => before('Вход и открытие подраздела "Конфигурация" вкладка "Шаблоны камер"', async () => {
    await page.base.loading(entry.sleep1);
    await dec.auth(entry.customLogin, entry.customPassword);
    await dec.simple(el.section.handler, [sec.adm, entry.max], el.section);
    await dec.simple(el.subsection.handler, [sub.adm.conf, entry.max], el.subsection);
    await dec.simple(el.tab.handler, ['Шаблоны камер', entry.max], el.tab);
    await dec.simple(page.camera.init, [entry.max], page.camera);
    await page.base.loading(entry.sleep1);
});

const befSystem = () => before('Вход и открытие подраздела "Конфигурация" вкладка "Системы"', async () => {
    await page.base.loading(entry.sleep1);
    await dec.auth(entry.customLogin, entry.customPassword);
    await dec.simple(el.section.handler, [sec.adm, entry.max], el.section);
    await dec.simple(el.subsection.handler, [sub.adm.conf, entry.max], el.subsection);
    await dec.simple(el.tab.handler, ['Системы', entry.max], el.tab);
    await dec.simple(page.system.init, [entry.max], page.system);
    await page.base.loading(entry.sleep1);
});

const aft = () => after('Выход', async () => {
    await page.base.loading(entry.sleep1);
    await dec.exit();
});

const other = (type, text) => {

    const addDeviceSearch = () => describe(text + 'Добавление устройства через общий поиск.', () => {

        if(type === 'device') {
            describe('Добавление', () => {
                befDevice();
                aft();
                decorate.el.butIcBefore.handler({
                    icon: but.search,
                    timeout: entry.max
                });
                decorate.modal.searchDevice.init({
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.button.handler({
                    name: 'Поиск всех устройств',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.input.input({
                    title: '',
                    placeholder: 'Поиск...',
                    timeout: entry.max
                });
                decorate.el.button.button({
                    name: 'Добавить устройства',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.input.sendKeys({
                    title: '',
                    placeholder: 'Поиск...',
                    value: entry.device_ip_1,
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.modal.searchDevice.deviceHandler({
                    ip: entry.device_ip_1,
                    timeout: entry.max
                });
                decorate.el.button.handler({
                    name: 'Добавить устройства',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.modal.searchDevice.initClose({
                    timeout: entry.max
                });
            });

            describe('Проверка', () => {
                befDevice();
                aft();
                decorate.page.device.device({
                    name: entry.device_name_1,
                    ip: entry.device_ip_1,
                    timeout: entry.max
                });
            });
        }

    });

    const addDeviceIP = () => describe(text + 'Добавление устройства через общий поиск.', () => {

        if(type === 'device') {
            describe('Добавление', () => {
                befDevice();
                aft();
                decorate.el.butIcBefore.handler({
                    icon: but.search,
                    timeout: entry.max
                });
                decorate.modal.searchDevice.init({
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.input.sendKeys({
                    title: '',
                    placeholder: 'Поиск конкретного устройства по IP адресу',
                    value: entry.device_ip_1,
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.button.handler({
                    name: `Найти устройство по IP: ${entry.device_ip_1}`,
                    timeout: entry.max
                });
                decorate.el.button.button({
                    name: 'Добавить устройства',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.modal.searchDevice.deviceHandler({
                    ip: entry.device_ip_1,
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.button.handler({
                    name: 'Добавить устройства',
                    timeout: entry.max
                });
                decorate.modal.searchDevice.initClose({
                    timeout: entry.max
                });
            });

            describe('Проверка', () => {
                befDevice();
                aft();
                decorate.page.device.device({
                    name: entry.device_name_1,
                    ip: entry.device_ip_1,
                    timeout: entry.max
                });
            });
        }

        if(type === 'room') {
            describe('Добавление', () => {
                befARoom();
                aft();
                decorate.el.butIcBefore.handler({
                    icon: but.search,
                    timeout: entry.max
                });
                decorate.modal.searchDevice.init({
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.input.sendKeys({
                    title: '',
                    placeholder: 'Поиск конкретного устройства по IP адресу',
                    value: entry.device_ip_1,
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.button.handler({
                    name: `Найти устройство по IP: ${entry.device_ip_1}`,
                    timeout: entry.max
                });
                decorate.el.button.button({
                    name: 'Добавить устройства',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.modal.searchDevice.deviceHandler({
                    ip: entry.device_ip_1,
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.button.handler({
                    name: 'Добавить устройства',
                    timeout: entry.max
                });
                decorate.modal.searchDevice.initClose({
                    timeout: entry.max
                });
            });

            describe('Проверка', () => {
                befDevice();
                aft();
                decorate.page.device.device({
                    name: entry.device_name_1,
                    ip: entry.device_ip_1,
                    timeout: entry.max
                });
            });
        }
    });

    const deleteDevice = () => describe(text + 'Удаление устройства.', () => {

        if(type === 'device') {
            describe('Удаление', () => {
                befDevice();
                aft();
                decorate.page.device.device({
                    name: entry.device_name_1,
                    ip: entry.device_ip_1,
                    timeout: entry.max
                });
                decorate.page.device.handler({
                    name: entry.device_name_1,
                    ip: entry.device_ip_1,
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.butIcBefore.handler({
                    icon: but.delete,
                    timeout: entry.max
                });
                decorate.modalConfirm.deviceDelete.init({
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.button.handler({
                    name: 'Удалить',
                    timeout: entry.max
                });
                decorate.modalConfirm.deviceDelete.initClose({
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
            });

            describe('Проверка', () => {
                befDevice();
                aft();
                decorate.page.device.noDevice({
                    name: entry.device_name_1,
                    ip: entry.device_ip_1,
                    timeout: entry.max
                });
            });
        }
    });

    const activateDevice = () => describe(text + 'Активация устройства.', () => {

        if(type === 'device') {
            describe('Активация', () => {
                befDevice();
                aft();
                decorate.page.device.device({
                    name: entry.device_name_1,
                    ip: entry.device_ip_1,
                    timeout: entry.max
                });
                decorate.page.device.handler({
                    name: entry.device_name_1,
                    ip: entry.device_ip_1,
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.butIcBefore.handler({
                    icon: but.unlock,
                    timeout: entry.max
                });
                decorate.modalConfirm.deviceActivate.init({
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.button.handler({
                    name: 'Активировать',
                    timeout: entry.max
                });
                decorate.modalConfirm.deviceActivate.initClose({
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
            });

            describe('Проверка', () => {
                befDevice();
                aft();
                decorate.page.device.active({
                    name: entry.device_name_1,
                    ip: entry.device_ip_1,
                    timeout: entry.max
                });
            });
        }

        if(type === 'room') {
            describe('Активация', () => {
                befARoom();
                aft();
                decorate.page.device.device({
                    name: entry.device_name_1,
                    ip: entry.device_ip_1,
                    timeout: entry.max
                });
                decorate.page.device.handler({
                    name: entry.device_name_1,
                    ip: entry.device_ip_1,
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.butIcBefore.handler({
                    icon: but.unlock,
                    timeout: entry.max
                });
                decorate.modalConfirm.deviceActivate.init({
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.button.handler({
                    name: 'Активировать',
                    timeout: entry.max
                });
                decorate.modalConfirm.deviceActivate.initClose({
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
            });

            describe('Проверка', () => {
                befARoom();
                aft();
                decorate.page.device.active({
                    name: entry.device_name_1,
                    ip: entry.device_ip_1,
                    timeout: entry.max
                });
            });
        }
    });

    const deactivateDevice = () => describe(text + 'Деактивация устройства.', () => {

        if(type === 'device') {
            describe('Деактивация', () => {
                befDevice();
                aft();
                decorate.page.device.device({
                    name: entry.device_name_1,
                    ip: entry.device_ip_1,
                    timeout: entry.max
                });
                decorate.page.device.handler({
                    name: entry.device_name_1,
                    ip: entry.device_ip_1,
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.butIcBefore.handler({
                    icon: but.lock,
                    timeout: entry.max
                });
                decorate.modalConfirm.deviceDeactivate.init({
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.button.handler({
                    name: 'Деактивировать',
                    timeout: entry.max
                });
                decorate.modalConfirm.deviceDeactivate.initClose({
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
            });

            describe('Проверка', () => {
                befDevice();
                aft();
                decorate.page.device.device({
                    name: entry.device_name_1,
                    ip: entry.device_ip_1,
                    timeout: entry.max
                });
                decorate.page.device.noActive({
                    name: entry.device_name_1,
                    ip: entry.device_ip_1,
                    timeout: entry.max
                });
            });
        }

        if(type === 'room') {
            describe('Деактивация', () => {
                befARoom();
                aft();
                decorate.page.device.device({
                    name: entry.device_name_1,
                    ip: entry.device_ip_1,
                    timeout: entry.max
                });
                decorate.page.device.handler({
                    name: entry.device_name_1,
                    ip: entry.device_ip_1,
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.butIcBefore.handler({
                    icon: but.lock,
                    timeout: entry.max
                });
                decorate.modalConfirm.deviceDeactivate.init({
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.button.handler({
                    name: 'Деактивировать',
                    timeout: entry.max
                });
                decorate.modalConfirm.deviceDeactivate.initClose({
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
            });

            describe('Проверка', () => {
                befARoom();
                aft();
                decorate.page.device.device({
                    name: entry.device_name_1,
                    ip: entry.device_ip_1,
                    timeout: entry.max
                });
                decorate.page.device.noActive({
                    name: entry.device_name_1,
                    ip: entry.device_ip_1,
                    timeout: entry.max
                });
            });
        }
    });

    const fireAlarmDevice = () => describe(text + 'Поставить на охрану устройства.', () => {
        if(type === 'device') {
            describe('Поставить на охрану', () => {
                befDevice();
                aft();
                decorate.page.device.device({
                    name: entry.device_name_1,
                    ip: entry.device_ip_1,
                    timeout: entry.max
                });
                decorate.page.device.handler({
                    name: entry.device_name_1,
                    ip: entry.device_ip_1,
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.butIcBefore.handler({
                    icon: but.fire_alarm_activate,
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep3
                });
            });

            describe('Проверка', () => {
                befDevice();
                aft();
                decorate.page.base.loading({
                    timeout: entry.sleep3
                });
                decorate.page.device.deviceGetStatusLock({
                    name: entry.device_name_1,
                    ip: entry.device_ip_1,
                    value: 'Охрана',
                    timeout: entry.max
                });
            });
        }

        if(type === 'room') {
            describe('Поставить на охрану', () => {
                befARoom();
                aft();
                decorate.page.device.device({
                    name: entry.device_name_1,
                    ip: entry.device_ip_1,
                    timeout: entry.max
                });
                decorate.page.device.handler({
                    name: entry.device_name_1,
                    ip: entry.device_ip_1,
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.butIcBefore.handler({
                    icon: but.fire_alarm_activate,
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep3
                });
            });

            describe('Проверка', () => {
                befARoom();
                aft();
                decorate.page.base.loading({
                    timeout: entry.sleep3
                });
                decorate.page.device.deviceGetStatusLock({
                    name: entry.device_name_1,
                    ip: entry.device_ip_1,
                    value: 'Охрана',
                    timeout: entry.max
                });
            });
        }
    });

    const blockFireAlarmDevice = () => describe(text + 'Снятие с охраны устройства.', () => {
        if(type === 'device') {
            describe('Поставить на охрану', () => {
                befDevice();
                aft();
                decorate.page.device.device({
                    name: entry.device_name_1,
                    ip: entry.device_ip_1,
                    timeout: entry.max
                });
                decorate.page.device.handler({
                    name: entry.device_name_1,
                    ip: entry.device_ip_1,
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.butIcBefore.handler({
                    icon: but.fire_alarm_deactivate,
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep3
                });
            });

            describe('Проверка', () => {
                befDevice();
                aft();
                decorate.page.base.loading({
                    timeout: entry.sleep3
                });
                decorate.page.device.deviceGetStatusLock({
                    name: entry.device_name_1,
                    ip: entry.device_ip_1,
                    value: 'Контроль',
                    timeout: entry.max
                });
            });
        }

        if(type === 'room') {
            describe('Поставить на охрану', () => {
                befARoom();
                aft();
                decorate.page.device.device({
                    name: entry.device_name_1,
                    ip: entry.device_ip_1,
                    timeout: entry.max
                });
                decorate.page.device.handler({
                    name: entry.device_name_1,
                    ip: entry.device_ip_1,
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.butIcBefore.handler({
                    icon: but.fire_alarm_deactivate,
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep3
                });
            });

            describe('Проверка', () => {
                befARoom();
                aft();
                decorate.page.base.loading({
                    timeout: entry.sleep3
                });
                decorate.page.device.deviceGetStatusLock({
                    name: entry.device_name_1,
                    ip: entry.device_ip_1,
                    value: 'Контроль',
                    timeout: entry.max
                });
            });
        }
    });

    const addRoom = () => describe(text + 'Добавить помещение.', () => {
        if(type === 'room') {
            describe('Добавление', () => {
                befARoom();
                aft();
                decorate.el.butIcBefore.handler({
                    icon: but.add,
                    timeout: entry.max
                });
                decorate.modal.addRoom.init({
                    timeout: entry.max
                });
                decorate.el.input.sendKeys({
                    title: 'Название',
                    placeholder: '',
                    value: data.rooms.room2,
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.button.handler({
                    name: 'Сохранить',
                    timeout: entry.max
                });
                decorate.modal.addRoom.initClose({
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
            });

            describe('Проверка', () => {
                befARoom();
                aft();
                decorate.page.room.room({
                    arr: [data.rooms.room2],
                    timeout: entry.max
                });
            });
        }
    });

    const addDuplicateRoom = () => describe(text + 'Добавить дублирующие помещение.', () => {
        if(type === 'room') {
            describe('Попытка добавления дублирующего помещения', () => {
                befARoom();
                aft();
                decorate.el.butIcBefore.handler({
                    icon: but.add,
                    timeout: entry.max
                });
                decorate.modal.addRoom.init({
                    timeout: entry.max
                });
                decorate.el.input.sendKeys({
                    title: 'Название',
                    placeholder: '',
                    value: data.rooms.room2,
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.button.handler({
                    name: 'Сохранить',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.error.error({
                    text: 'Такое название помещения уже используется',
                    timeout: entry.max
                });
                decorate.modal.addRoom.closeHandler({
                    timeout: entry.max
                });
                decorate.modal.addRoom.initClose({
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
            });
        }
    });

    const addChildrenRoom = () => describe(text + 'Добавить дочернее помещение.', () => {
        if(type === 'room') {
            describe('Добавление', () => {
                befARoom();
                aft();
                decorate.page.room.handler({
                    arr: [data.rooms.room1],
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.butIcBefore.handler({
                    icon: but.add,
                    timeout: entry.max
                });
                decorate.modal.addRoom.init({
                    timeout: entry.max
                });
                decorate.el.input.sendKeys({
                    title: 'Название',
                    placeholder: '',
                    value: data.rooms.room2,
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.button.handler({
                    name: 'Сохранить',
                    timeout: entry.max
                });
                decorate.modal.addRoom.initClose({
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
            });

            describe('Проверка', () => {
                befARoom();
                aft();
                decorate.page.room.room({
                    arr: [data.rooms.room1, data.rooms.room2],
                    timeout: entry.max
                });
            });
        }
    });

    const editRoom = () => describe(text + 'Редактировать помещение.', () => {
        if(type === 'room') {
            describe('Редактирование', () => {
                befARoom();
                aft();
                decorate.page.room.handler({
                    arr: [data.rooms.room2],
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.butIcBefore.handler({
                    icon: but.edit,
                    timeout: entry.max
                });
                decorate.modal.editRoom.init({
                    timeout: entry.max
                });
                decorate.el.input.backSpace({
                    title: 'Название',
                    placeholder: '',
                    timeout: entry.max
                });
                decorate.el.input.sendKeys({
                    title: 'Название',
                    placeholder: '',
                    value: data.rooms.room1,
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.button.handler({
                    name: 'Сохранить',
                    timeout: entry.max
                });
                decorate.modal.editRoom.initClose({
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
            });

            describe('Проверка', () => {
                befARoom();
                aft();
                decorate.page.room.room({
                    arr: [data.rooms.room1],
                    timeout: entry.max
                });
            });
        }
    });

    const deleteRoom = () => describe(text + 'Удалить помещение.', () => {});

    const deleteParentRoom = () => describe(text + 'Удаление родительского помещения.', () => {
        if(type === 'room') {
            describe('Попытка удаление родительского помещения', () => {
                befARoom();
                aft();
                decorate.page.room.handler({
                    arr: [data.rooms.room1],
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.butIcBefore.handler({
                    icon: but.delete,
                    timeout: entry.max
                });
                decorate.modalConfirm.roomDelete.init({
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.button.handler({
                    name: 'Удалить',
                    timeout: entry.max
                });
                decorate.el.error.error({
                    text: 'Нельзя удалить помещение, которое содержит дочерние',
                    timeout: entry.max
                });
                decorate.modal.editRoom.initClose({
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
            });
        }
    });

    const deleteRoomAndDevice = () => describe(text + 'Удаление помещения, при наличии устрйоства', () => {
        if(type === 'room') {
            describe('Попытка удаление родительского помещения', () => {
                befARoom();
                aft();
                decorate.page.room.handler({
                    arr: [data.rooms.room1, data.rooms.room2],
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.butIcBefore.handler({
                    icon: but.delete,
                    timeout: entry.max
                });
                decorate.modalConfirm.roomDelete.init({
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.button.handler({
                    name: 'Удалить',
                    timeout: entry.max
                });
                decorate.el.error.error({
                    text: 'Помещения с контроллерами удалить нельзя',
                    timeout: entry.max
                });
                decorate.modal.editRoom.initClose({
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
            });
        }
    });

    const addDeviceInRoom = () => describe(text + 'Добавление контроллеров в помещения.', () => {
        describe('Добавление фиктивного устройства чере API', () => {
            befARoom();
            aft();
            decItApi.addDevice(data.device.obj);
        });

        describe(`Добавление контроллера "${data.device.name-data.device.ip}" в помещение ${data.rooms.room1}`,
            () => {
             befARoom();
             aft();
             decorate.page.room.handler({
                 arr: [data.rooms.room1],
                 timeout: entry.max
             });
             decorate.page.base.loading({
                 timeout: entry.sleep2
             });
             decorate.el.butIcBefore.handler({
                 icon: but.device_list,
                 timeout: entry.max
             });
             decorate.modal.deviceSelect.init({
                 timeout: entry.max
             });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
            decorate.el.groupCell.handler({
                name: data.device.ip,
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
            decorate.el.button.handler({
                name: 'Выбрать',
                timeout: entry.max
            });
            decorate.modal.deviceSelect.initClose({
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
        });

        describe(`Добавление контроллера "Контроллер CL15 - 172.17.100.4" в помещение ${data.rooms.room2}`,
            () => {
            befARoom();
            aft();
            decorate.page.room.handler({
                arr: [data.rooms.room1, data.rooms.room2],
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
            decorate.el.butIcBefore.handler({
                icon: but.device_list,
                timeout: entry.max
            });
            decorate.modal.deviceSelect.init({
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
            decorate.el.groupCell.handler({
                name: entry.device_ip_1,
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
            decorate.el.button.handler({
                name: 'Выбрать',
                timeout: entry.max
            });
            decorate.modal.deviceSelect.initClose({
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
        });

        describe('Проверка', () => {
            befARoom();
            aft();
            decorate.page.room.device({
                arr: [data.rooms.room1, data.device.name, data.device.ip],
                timeout: entry.max
            });
            decorate.page.room.device({
                arr: [data.rooms.room1, data.rooms.room2, entry.device_name_1, entry.device_ip_1],
                timeout: entry.max
            });
        });

    });

    const exportXLSX = () => describe(text + 'Проверка экспорта в XLSX.', () => {
        if(type === 'room') {
            const params = {
                nameFile: 'roomswithdevices.xlsx',
                json: [
                    {
                        'Отчет "Помещения"': 'Помещение',
                        __EMPTY: 'Контроллеры',
                        __EMPTY_1: 'Направление прохода',
                        __EMPTY_2: 'Считыватели'
                    },
                    { 'Отчет "Помещения"': 'Неконтролируемая территория', __EMPTY: '' },
                    { 'Отчет "Помещения"': 'room1', __EMPTY: '' },
                    {
                        'Отчет "Помещения"': '',
                        __EMPTY: 'Контроллер замка CL05',
                        __EMPTY_1: "Вход в 'room1' Выход из 'Неконтролируемая территория'",
                        __EMPTY_2: 'Вход: Считыватель 1 Выход: Считыватель 2'
                    },
                    { 'Отчет "Помещения"': 'room2', __EMPTY: '' },
                    {
                        'Отчет "Помещения"': '',
                        __EMPTY: 'Контроллер CL15',
                        __EMPTY_1: "Вход в 'room2' Выход из 'room1'",
                        __EMPTY_2: 'Вход: Считыватель 1 Выход: Считыватель 2'
                    }
                ]
            }

            befARoom();
            aft();

            describe('Экспорт', () => {
                decorate.el.butIcBefore.handler({
                    icon: but.menu,
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.menu.menu({
                    timeout: entry.max
                });
                decorate.el.menu.handler({
                    name: 'Экспорт',
                    timeout: entry.max
                });
                decorate.modal.exportData.init({
                    timeout: entry.max
                });
                decorate.el.select.iconXpand({
                    title: 'Выберите тип файла для экспорта',
                    value: 'XLSX',
                    text: 'XLSX',
                    timeout: entry.max
                });
                decorate.el.input.getValue({
                    title: 'Имя выходного файла',
                    placeholder: 'Определяется системой',
                    value: '',
                    timeout: entry.max
                });
                decorate.el.select.iconXpand({
                    title: 'Заголовок',
                    value: 'Добавить заголовок к файлу',
                    text: 'Добавить заголовок к файлу',
                    timeout: entry.max
                });
                decorate.el.button.handler({
                    name: 'Экспортировать',
                    timeout: entry.max
                });
                decorate.modal.exportData.initClose({
                    timeout: entry.max
                });
            });

            describe('Проверка файла', () => {
                decorate.el.file.display({
                    file: params.nameFile,
                    timeout: entry.upload
                });
                decorate.el.file.comparison({
                    file: params.nameFile,
                    json: params.json
                });
                decorate.el.file.delete({
                    file: params.nameFile,
                    timeout: entry.upload
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
            });
        }

        if(type === 'device') {
            const params = {
                nameFile: 'devices.xlsx',
                json: [
                    {
                        'Отчет "Отчет по устройствам"': 'Контроллер',
                        __EMPTY: 'IP',
                        __EMPTY_1: 'Считыватель 1',
                        __EMPTY_2: 'Считыватель 2'
                    },
                    {
                        'Отчет "Отчет по устройствам"': 'Контроллер CL15',
                        __EMPTY: '172.17.100.4',
                        __EMPTY_1: 'room2',
                        __EMPTY_2: 'room1'
                    }
                ]
            }

            befDevice();
            aft();

            describe('Экспорт', () => {
                decorate.el.butIcBefore.handler({
                    icon: but.menu,
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.menu.menu({
                    timeout: entry.max
                });
                decorate.el.menu.handler({
                    name: 'Экспорт',
                    timeout: entry.max
                });
                decorate.modal.exportData.init({
                    timeout: entry.max
                });
                decorate.el.select.iconXpand({
                    title: 'Выберите тип файла для экспорта',
                    value: 'XLSX',
                    text: 'XLSX',
                    timeout: entry.max
                });
                decorate.el.input.getValue({
                    title: 'Имя выходного файла',
                    placeholder: 'Определяется системой',
                    value: '',
                    timeout: entry.max
                });
                decorate.el.select.iconXpand({
                    title: 'Заголовок',
                    value: 'Добавить заголовок к файлу',
                    text: 'Добавить заголовок к файлу',
                    timeout: entry.max
                });
                decorate.el.button.handler({
                    name: 'Экспортировать',
                    timeout: entry.max
                });
                decorate.modal.exportData.initClose({
                    timeout: entry.max
                });
            });

            describe('Проверка файла', () => {
                decorate.el.file.display({
                    file: params.nameFile,
                    timeout: entry.upload
                });
                decorate.el.file.comparison({
                    file: params.nameFile,
                    json: params.json
                });
                decorate.el.file.delete({
                    file: params.nameFile,
                    timeout: entry.upload
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
            });
        }
    });

    const exportCSV = () => describe(text + 'Проверка экспорта в CSV.', () => {
        if(type === 'room') {
            const params = {
                nameFile: 'roomswithdevices.csv',
                json: [
                    { 'Помещение': 'Неконтролируемая территория' },
                    { 'Помещение': 'room1' },
                    {
                        'Контроллеры': 'Контроллер замка CL05',
                        'Направление прохода': "Вход в 'room1' Выход из 'Неконтролируемая территория'",
                        'Считыватели': 'Вход: Считыватель 1 Выход: Считыватель 2'
                    },
                    { 'Помещение': 'room2' },
                    {
                        'Контроллеры': 'Контроллер CL15',
                        'Направление прохода': "Вход в 'room2' Выход из 'room1'",
                        'Считыватели': 'Вход: Считыватель 1 Выход: Считыватель 2'
                    }
                ]
            }

            befARoom();
            aft();

            describe('Экспорт', () => {
                decorate.el.butIcBefore.handler({
                    icon: but.menu,
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.menu.menu({
                    timeout: entry.max
                });
                decorate.el.menu.menu({
                    timeout: entry.max
                });
                decorate.el.menu.handler({
                    name: 'Экспорт',
                    timeout: entry.max
                });
                decorate.modal.exportData.init({
                    timeout: entry.max
                });
                decorate.el.select.iconXpand({
                    title: 'Выберите тип файла для экспорта',
                    value: 'XLSX',
                    text: 'CSV',
                    timeout: entry.max
                });
                decorate.el.input.getValue({
                    title: 'Имя выходного файла',
                    placeholder: 'Определяется системой',
                    value: '',
                    timeout: entry.max
                });
                decorate.el.button.handler({
                    name: 'Экспортировать',
                    timeout: entry.max
                });
                decorate.modal.exportData.initClose({
                    timeout: entry.max
                });
            });

            describe('Проверка файла', () => {
                decorate.el.file.display({
                    file: params.nameFile,
                    timeout: entry.upload
                });
                decorate.el.file.comparison({
                    file: params.nameFile,
                    json: params.json
                });
                decorate.el.file.delete({
                    file: params.nameFile,
                    timeout: entry.upload
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
            });

        }

        if(type === 'device') {
            const params = {
                nameFile: 'devices.csv',
                json: [
                    {
                        'Контроллер': 'Контроллер CL15',
                        IP: '172.17.100.4',
                        'Считыватель 1': 'room2',
                        'Считыватель 2': 'room1'
                    }
                ]
            }

            befDevice();
            aft();

            describe('Экспорт', () => {
                decorate.el.butIcBefore.handler({
                    icon: but.menu,
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.menu.menu({
                    timeout: entry.max
                });
                decorate.el.menu.menu({
                    timeout: entry.max
                });
                decorate.el.menu.handler({
                    name: 'Экспорт',
                    timeout: entry.max
                });
                decorate.modal.exportData.init({
                    timeout: entry.max
                });
                decorate.el.select.iconXpand({
                    title: 'Выберите тип файла для экспорта',
                    value: 'XLSX',
                    text: 'CSV',
                    timeout: entry.max
                });
                decorate.el.input.getValue({
                    title: 'Имя выходного файла',
                    placeholder: 'Определяется системой',
                    value: '',
                    timeout: entry.max
                });
                decorate.el.button.handler({
                    name: 'Экспортировать',
                    timeout: entry.max
                });
                decorate.modal.exportData.initClose({
                    timeout: entry.max
                });
            });

            describe('Проверка файла', () => {
                decorate.el.file.display({
                    file: params.nameFile,
                    timeout: entry.upload
                });
                decorate.el.file.comparison({
                    file: params.nameFile,
                    json: params.json
                });
                decorate.el.file.delete({
                    file: params.nameFile,
                    timeout: entry.upload
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
            });

        }
    });

    const addCamera = () => describe(text + 'Добавление камеры.', () => {
        if(type === 'device') {
            describe('Добавление', () => {
                befDevice();
                aft();
                decorate.el.butIcBefore.handler({
                    icon: but.add,
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.menu.menu({
                    timeout: entry.max
                });
                decorate.el.menu.handler({
                    name: 'Добавить камеру',
                    timeout: entry.max
                });
                decorate.modal.addCamera.init({
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.input.sendKeys({
                    title: 'Имя камеры',
                    placeholder: '',
                    value: data.camera.name,
                    timeout: entry.max
                });
                decorate.el.input.sendKeys({
                    title: 'Хост камеры',
                    placeholder: '',
                    value: data.camera.ip,
                    timeout: entry.max
                });
                decorate.el.input.sendKeys({
                    title: 'Порт',
                    placeholder: '',
                    value: data.camera.port,
                    timeout: entry.max
                });
                decorate.el.input.sendKeys({
                    title: 'Логин',
                    placeholder: '',
                    value: data.camera.login,
                    timeout: entry.max
                });
                decorate.el.input.sendKeys({
                    title: 'Пароль',
                    placeholder: '',
                    value: data.camera.password,
                    timeout: entry.max
                });
                decorate.el.select.iconXpand({
                    title: 'Шаблон камеры',
                    value: '',
                    text: data.camera.template,
                    timeout: entry.max
                });
                decorate.modal.addCamera.buttonHandler({
                    name: 'Добавить',
                    timeout: entry.max
                });
                decorate.modal.addCamera.initClose({
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
            });

            describe('Проверка', () => {
                befDevice();
                aft();
                decorate.page.device.device({
                    name: data.camera.name,
                    ip: data.camera.ip,
                    timeout: entry.max
                });
            });
        }
    });

    const deleteCamera = () => describe(text + 'Удаление камеры.', () => {
        if(type === 'device') {
            describe('Удаление', () => {
                befDevice();
                aft();
                decorate.page.device.device({
                    name: data.camera.name,
                    ip: data.camera.ip,
                    timeout: entry.max
                });
                decorate.page.device.handler({
                    name: data.camera.name,
                    ip: data.camera.ip,
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.butIcBefore.handler({
                    icon: but.delete,
                    timeout: entry.max
                });
                decorate.modalConfirm.deviceDelete.init({
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.button.handler({
                    name: 'Удалить',
                    timeout: entry.max
                });
                decorate.modalConfirm.deviceDelete.initClose({
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
            });

            describe('Проверка', () => {
                befDevice();
                aft();
                decorate.page.device.noDevice({
                    name: data.camera.name,
                    ip: data.camera.ip,
                    timeout: entry.max
                });
            });
        }
    });

    const addBiosmart = () => describe(text + 'Добавление сервера Biosmart SmartHub.', () => {
        if(type === 'device') {
            describe('Добавление', () => {
                befDevice();
                aft();
                decorate.el.butIcBefore.handler({
                    icon: but.add,
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.menu.menu({
                    timeout: entry.max
                });
                decorate.el.menu.handler({
                    name: 'Добавить сервер Biosmart SmartHub',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.input.backSpace({
                    title: 'Название',
                    placeholder: '',
                    timeout: entry.max
                });
                decorate.el.input.sendKeys({
                    title: 'Название',
                    placeholder: '',
                    value: data.biosmart.name,
                    timeout: entry.max
                });
                decorate.el.input.input({
                    title: 'IP-адрес',
                    placeholder: '',
                    timeout: entry.max
                });
                decorate.el.input.sendKeys({
                    title: 'IP-адрес',
                    placeholder: '',
                    value: data.biosmart.ip,
                    timeout: entry.max
                });
                decorate.el.input.backSpace({
                    title: 'Порт сервера',
                    placeholder: '',
                    timeout: entry.max
                });
                decorate.el.input.sendKeys({
                    title: 'Порт сервера',
                    placeholder: '',
                    value: data.biosmart.port,
                    timeout: entry.max
                });
                decorate.el.input.sendKeys({
                    title: 'Логин',
                    placeholder: '',
                    value: data.biosmart.login,
                    timeout: entry.max
                });
                decorate.el.input.sendKeys({
                    title: 'Пароль',
                    placeholder: '',
                    value: data.biosmart.password,
                    timeout: entry.max
                });
                decorate.el.button.handler({
                    name: 'Сохранить изменения в устройство',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
            });

            describe('Проверка', () => {
                befDevice();
                aft();
                decorate.page.device.device({
                    name: data.biosmart.name,
                    ip: data.biosmart.ip,
                    timeout: entry.max
                });
            });
        }
    });

    const deleteBiosmart = () => describe(text + 'Удаление сервера Biosmart SmartHub.', () => {
        if(type === 'device') {
            describe('Удаление', () => {
                befDevice();
                aft();
                decorate.page.device.device({
                    name: data.biosmart.name,
                    ip: data.biosmart.ip,
                    timeout: entry.max
                });
                decorate.page.device.handler({
                    name: data.biosmart.name,
                    ip: data.biosmart.ip,
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.butIcBefore.handler({
                    icon: but.delete,
                    timeout: entry.max
                });
                decorate.modalConfirm.deviceDelete.init({
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.button.handler({
                    name: 'Удалить',
                    timeout: entry.max
                });
                decorate.modalConfirm.deviceDelete.initClose({
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
            });

            describe('Проверка', () => {
                befDevice();
                aft();
                decorate.page.device.noDevice({
                    name: data.biosmart.name,
                    ip: data.biosmart.ip,
                    timeout: entry.max
                });
            });
        }
    });

    const addTrassir = () => describe(text + 'Добавление сервера TRASSIR.', () => {
        if(type === 'device') {
            describe('Добавление', () => {
                befDevice();
                aft();
                decorate.el.butIcBefore.handler({
                    icon: but.add,
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.menu.menu({
                    timeout: entry.max
                });
                decorate.el.menu.handler({
                    name: 'Добавить сервер TRASSIR',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.input.backSpace({
                    title: 'Название',
                    placeholder: '',
                    timeout: entry.max
                });
                decorate.el.input.sendKeys({
                    title: 'Название',
                    placeholder: '',
                    value: data.trassir.name,
                    timeout: entry.max
                });
                decorate.el.input.input({
                    title: 'IP-адрес',
                    placeholder: '',
                    timeout: entry.max
                });
                decorate.el.input.sendKeys({
                    title: 'IP-адрес',
                    placeholder: '',
                    value: data.trassir.ip,
                    timeout: entry.max
                });
                decorate.el.input.backSpace({
                    title: 'Порт сервера',
                    placeholder: '',
                    timeout: entry.max
                });
                decorate.el.input.sendKeys({
                    title: 'Порт сервера',
                    placeholder: '',
                    value: data.trassir.port,
                    timeout: entry.max
                });
                decorate.el.input.backSpace({
                    title: 'Порт потокового вещания HTTP',
                    placeholder: '',
                    timeout: entry.max
                });
                decorate.el.input.sendKeys({
                    title: 'Порт потокового вещания HTTP',
                    placeholder: '',
                    value: data.trassir.http,
                    timeout: entry.max
                });
                decorate.el.input.sendKeys({
                    title: 'Пароль SDK',
                    placeholder: '',
                    value: data.trassir.sdk,
                    timeout: entry.max
                });
                decorate.el.input.sendKeys({
                    title: 'Логин оператора',
                    placeholder: '',
                    value: data.biosmart.login,
                    timeout: entry.max
                });
                decorate.el.input.sendKeys({
                    title: 'Пароль оператора',
                    placeholder: '',
                    value: data.biosmart.password,
                    timeout: entry.max
                });
                decorate.el.button.handler({
                    name: 'Сохранить изменения в устройство',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
            });

            describe('Проверка', () => {
                befDevice();
                aft();
                decorate.page.device.device({
                    name: data.trassir.name,
                    ip: data.trassir.ip,
                    timeout: entry.max
                });
            });
        }
    });

    const deleteTrassir = () => describe(text + 'Удаление сервера TRASSIR.', () => {
        if(type === 'device') {
            describe('Удаление', () => {
                befDevice();
                aft();
                decorate.page.device.device({
                    name: data.trassir.name,
                    ip: data.trassir.ip,
                    timeout: entry.max
                });
                decorate.page.device.handler({
                    name: data.trassir.name,
                    ip: data.trassir.ip,
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.butIcBefore.handler({
                    icon: but.delete,
                    timeout: entry.max
                });
                decorate.modalConfirm.deviceDelete.init({
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.button.handler({
                    name: 'Удалить',
                    timeout: entry.max
                });
                decorate.modalConfirm.deviceDelete.initClose({
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
            });

            describe('Проверка', () => {
                befDevice();
                aft();
                decorate.page.device.noDevice({
                    name: data.trassir.name,
                    ip: data.trassir.ip,
                    timeout: entry.max
                });
            });
        }
    });

    const addAxxon = () => describe(text + 'Добавление сервера Axxon Next.', () => {
        if(type === 'device') {
            describe('Добавление', () => {
                befDevice();
                aft();
                decorate.el.butIcBefore.handler({
                    icon: but.add,
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.menu.menu({
                    timeout: entry.max
                });
                decorate.el.menu.handler({
                    name: 'Добавить сервер Axxon Next',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.input.backSpace({
                    title: 'Название',
                    placeholder: '',
                    timeout: entry.max
                });
                decorate.el.input.sendKeys({
                    title: 'Название',
                    placeholder: '',
                    value: data.axxon.name,
                    timeout: entry.max
                });
                decorate.el.input.input({
                    title: 'IP-адрес',
                    placeholder: '',
                    timeout: entry.max
                });
                decorate.el.input.sendKeys({
                    title: 'IP-адрес',
                    placeholder: '',
                    value: data.axxon.ip,
                    timeout: entry.max
                });
                decorate.el.input.backSpace({
                    title: 'Порт сервера',
                    placeholder: '',
                    timeout: entry.max
                });
                decorate.el.input.sendKeys({
                    title: 'Порт сервера',
                    placeholder: '',
                    value: data.axxon.port,
                    timeout: entry.max
                });
                decorate.el.checkbox.handler({
                    name: 'HTTPS',
                    timeout: entry.max
                });
                decorate.el.input.sendKeys({
                    title: 'Логин',
                    placeholder: '',
                    value: data.axxon.login,
                    timeout: entry.max
                });
                decorate.el.input.sendKeys({
                    title: 'Пароль',
                    placeholder: '',
                    value: data.axxon.password,
                    timeout: entry.max
                });
                decorate.el.button.handler({
                    name: 'Сохранить изменения в устройство',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
            });

            describe('Проверка', () => {
                befDevice();
                aft();
                decorate.page.device.device({
                    name: data.axxon.name,
                    ip: data.axxon.ip,
                    timeout: entry.max
                });
            });
        }
    });

    const deleteAxxon = () => describe(text + 'Удаление сервера Axxon Next.', () => {
        if(type === 'device') {
            describe('Удаление', () => {
                befDevice();
                aft();
                decorate.page.device.device({
                    name: data.axxon.name,
                    ip: data.axxon.ip,
                    timeout: entry.max
                });
                decorate.page.device.handler({
                    name: data.axxon.name,
                    ip: data.axxon.ip,
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.butIcBefore.handler({
                    icon: but.delete,
                    timeout: entry.max
                });
                decorate.modalConfirm.deviceDelete.init({
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.button.handler({
                    name: 'Удалить',
                    timeout: entry.max
                });
                decorate.modalConfirm.deviceDelete.initClose({
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
            });

            describe('Проверка', () => {
                befDevice();
                aft();
                decorate.page.device.noDevice({
                    name: data.axxon.name,
                    ip: data.axxon.ip,
                    timeout: entry.max
                });
            });
        }
    });

    const addBolid = () => describe(text + 'Добавление ИСО "Орион" (Bolid).', () => {
        if(type === 'device') {
            describe('Добавление', () => {
                befDevice();
                aft();
                decorate.el.butIcBefore.handler({
                    icon: but.add,
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.menu.menu({
                    timeout: entry.max
                });
                decorate.el.menu.handler({
                    name: 'Добавить ИСО "Орион" (Bolid)',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.input.backSpace({
                    title: 'Название',
                    placeholder: '',
                    timeout: entry.max
                });
                decorate.el.input.sendKeys({
                    title: 'Название',
                    placeholder: '',
                    value: data.bolid.name,
                    timeout: entry.max
                });
                decorate.el.input.backSpace({
                    title: 'Адрес прибора C2000-ПП',
                    placeholder: '',
                    timeout: entry.max
                });
                decorate.el.input.sendKeys({
                    title: 'Адрес прибора C2000-ПП',
                    placeholder: '',
                    value: data.bolid.addrees,
                    timeout: entry.max
                });
                decorate.el.input.input({
                    title: 'IP-адрес',
                    placeholder: '',
                    timeout: entry.max
                });
                decorate.el.input.sendKeys({
                    title: 'IP-адрес',
                    placeholder: '',
                    value: data.bolid.ip,
                    timeout: entry.max
                });
                decorate.el.input.backSpace({
                    title: 'Порт',
                    placeholder: '',
                    timeout: entry.max
                });
                decorate.el.input.sendKeys({
                    title: 'Порт',
                    placeholder: '',
                    value: data.bolid.port,
                    timeout: entry.max
                });
                decorate.el.button.handler({
                    name: 'Сохранить изменения в устройство',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
            });

            describe('Проверка', () => {
                befDevice();
                aft();
                decorate.page.device.device({
                    name: data.bolid.name,
                    ip: data.bolid.ip,
                    timeout: entry.max
                });
            });
        }
    });

    const deleteBolid = () => describe(text + 'Удаление ИСО "Орион" (Bolid).', () => {
        if(type === 'device') {
            describe('Удаление', () => {
                befDevice();
                aft();
                decorate.page.device.device({
                    name: data.bolid.name,
                    ip: data.bolid.ip,
                    timeout: entry.max
                });
                decorate.page.device.handler({
                    name: data.bolid.name,
                    ip: data.bolid.ip,
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.butIcBefore.handler({
                    icon: but.delete,
                    timeout: entry.max
                });
                decorate.modalConfirm.deviceDelete.init({
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.button.handler({
                    name: 'Удалить',
                    timeout: entry.max
                });
                decorate.modalConfirm.deviceDelete.initClose({
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
            });

            describe('Проверка', () => {
                befDevice();
                aft();
                decorate.page.device.noDevice({
                    name: data.bolid.name,
                    ip: data.bolid.ip,
                    timeout: entry.max
                });
            });
        }
    });

    return {
        addDeviceSearch,
        addDeviceIP,
        deleteDevice,
        activateDevice,
        deactivateDevice,
        fireAlarmDevice,
        blockFireAlarmDevice,
        addRoom,
        editRoom,
        addChildrenRoom,
        addDuplicateRoom,
        deleteParentRoom,
        addDeviceInRoom,
        deleteRoomAndDevice,
        exportXLSX,
        exportCSV,
        addCamera,
        deleteCamera,
        addBiosmart,
        deleteBiosmart,
        addTrassir,
        deleteTrassir,
        addAxxon,
        deleteAxxon,
        addBolid,
        deleteBolid
    }

}

module.exports = {
    otherDevice: other('device', 'Администрирование / Конфигурация - вкладка Устройства. '),
    otherRoom: other('room', 'Администрирование / Конфигурация - вкладка Помещения. ')
}