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
const data = require('../../data').dataControlAccess;

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

    const addDeviceSearch = () => describe(text + 'Добавление устройства через общий поиск.', () => {});

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
    });

    const deleteDevice = () => describe(text + 'Удаление устройства.', () => {});

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
    });

    const addRoom = () => describe(text + 'Добавить помещение.', () => {});

    const addDuplicateRoom = () => describe(text + 'Добавить дублирующие помещение.', () => {});

    const addChildrenRoom = () => describe(text + 'Добавить дочернее помещение.', () => {});

    const editRoom = () => describe(text + 'Редактировать помещение.', () => {});

    const deleteRoom = () => describe(text + 'Редактировать помещение.', () => {});

    const deleteParentRoom = () =>describe(text + 'Удаление родительского помещения.', () => {});

    return {
        addDeviceIP,
        activateDevice,
        deactivateDevice,
        fireAlarmDevice,
        blockFireAlarmDevice
    }

}

module.exports = {
    otherDevice: other('device', 'Администрирование / Конфигурация - вкладка Устройства. ')
}