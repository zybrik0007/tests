const {describe, it} = require('mocha');

const entry = require('../../../../../../../entry');
const dec = require('../../../../../dictionaries/decorate');
const but = require('../../../../../dictionaries/button-icon');
const imp = require('../../../../../upload-files');
const decorate = require('../../../../../decorates');
const db = require('../../../../../database');
const data = require('./configuration.data');

const befSystemEvent = require('../event.ui.tests/event.ui.tests').befEvent;
const befARoom = () => decorate.befAft.before.beforeConfigRoom();
const befDevice = () => decorate.befAft.before.beforeConfigDevice();
const befEvent = () => decorate.befAft.before.beforeConfigEvent();
const befCamera = () => decorate.befAft.before.beforeConfigCamera();
const befSystem = () => decorate.befAft.before.beforeConfigSystem();
const aft = () => decorate.befAft.after.after();

const otherTest = () => {

    const addDeviceIP = ({ip}) => describe('Администрирование / Конфигурация. Добавление устройства через IP.', () => {
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
            value: ip,
            timeout: entry.max
        });
        decorate.page.base.loading({
            timeout: entry.sleep2
        });
        decorate.el.button.handler({
            name: `Найти устройство по IP: ${ip}`,
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
            ip: ip,
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

    const addCamera = ({name, ip, port, login, password, template}) => describe('Администрирование / Конфигурация.' +
        'Добавление камеры.', () => {
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
            value: name,
            timeout: entry.max
        });
        decorate.el.input.sendKeys({
            title: 'Хост камеры',
            placeholder: '',
            value: ip,
            timeout: entry.max
        });
        decorate.el.input.sendKeys({
            title: 'Порт',
            placeholder: '',
            value: port,
            timeout: entry.max
        });
        decorate.el.input.sendKeys({
            title: 'Логин',
            placeholder: '',
            value: login,
            timeout: entry.max
        });
        decorate.el.input.sendKeys({
            title: 'Пароль',
            placeholder: '',
            value: password,
            timeout: entry.max
        });
        decorate.el.select.iconXpand({
            title: 'Шаблон камеры',
            value: '',
            text: template,
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

    const activateDevice = ({ip, name}) => describe('Администрирование / Конфигурация. Активация устройства.', () => {
        befDevice();
        aft();
        decorate.page.device.device({
            name: name,
            ip: ip,
            timeout: entry.max
        });
        decorate.page.device.handler({
            name: name,
            ip: ip,
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

    const deleteDevice = ({ip, name}) => describe('Администрирование / Конфигурация. Удаление устройства.', () => {
        befDevice();
        aft();
        decorate.page.device.device({
            name: name,
            ip: ip,
            timeout: entry.max
        });
        decorate.page.device.handler({
            name: name,
            ip: ip,
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

    return {
        addDeviceIP,
        addCamera,
        activateDevice,
        deleteDevice
    }
}

const test = (type, text) => {

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
                    timeout: entry.sleep3
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
                decorate.el.error.checkError({
                    timeout: entry.sleep2
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
                decorate.el.error.checkError({
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

    const addDeviceIP = () => describe(text + 'Добавление устройства через IP.', () => {

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
                decorate.el.error.checkError({
                    timeout: entry.sleep2
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
                decorate.el.error.checkError({
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
                decorate.el.error.checkError({
                    timeout: entry.sleep2
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
                decorate.el.error.checkError({
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

    const addDeviceIPFailed = () => describe(text + 'Добавление невалидного устройства через IP.', () => {
        if(type === 'device') {
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
                value: '100.100.100.100',
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
            decorate.el.button.handler({
                name: `Найти устройство по IP: 100.100.100.100`,
                timeout: entry.max
            });
            decorate.el.error.error({
                text: 'Не удалось найти устройство',
                timeout: entry.max
            });
            decorate.modal.searchDevice.closeHandler({
                timeout: entry.max
            });
            decorate.modal.searchDevice.initClose({
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
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
                decorate.el.error.checkError({
                    timeout: entry.sleep2
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
                decorate.el.error.checkError({
                    timeout: entry.sleep2
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
                decorate.el.error.checkError({
                    timeout: entry.sleep2
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
                decorate.el.error.checkError({
                    timeout: entry.sleep2
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
                decorate.el.error.checkError({
                    timeout: entry.sleep2
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
                decorate.el.error.checkError({
                    timeout: entry.sleep2
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
                decorate.el.error.checkError({
                    timeout: entry.sleep2
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
                decorate.el.error.checkError({
                    timeout: entry.sleep2
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
                decorate.el.error.checkError({
                    timeout: entry.sleep2
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
                decorate.el.error.checkError({
                    timeout: entry.sleep2
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
                decorate.el.error.checkError({
                    timeout: entry.sleep2
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

    const deleteRoomDevice = () => describe(text + 'Отвязать устройства от помещения и удалить помещения.', () => {
        if(type === 'room') {

            describe('Удаление', () => {
                befARoom();
                aft();

                describe(`Удаление ${entry.device_name_1} - ${entry.device_ip_1}`, () => {
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
                    decorate.modalConfirm.deviceDeleteRoom.init({
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.button.handler({
                        name: 'Удалить',
                        timeout: entry.max
                    });
                    decorate.el.error.checkError({
                        timeout: entry.sleep2
                    });
                    decorate.modalConfirm.deviceDeleteRoom.initClose({
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                });

                describe(`Удаление помещения ${data.rooms.room2}`, () => {
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
                    decorate.el.error.checkError({
                        timeout: entry.sleep2
                    });
                    decorate.modalConfirm.roomDelete.initClose({
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                });

                describe(`Удаление ${data.camera.name} - ${data.camera.ip}`, () => {
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
                    decorate.modalConfirm.deviceDeleteRoom.init({
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.button.handler({
                        name: 'Удалить',
                        timeout: entry.max
                    });
                    decorate.el.error.checkError({
                        timeout: entry.sleep2
                    });
                    decorate.modalConfirm.deviceDeleteRoom.initClose({
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                });

                describe(`Удаление помещения ${data.rooms.room1}`, () => {
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
                    decorate.el.error.checkError({
                        timeout: entry.sleep2
                    });
                    decorate.modalConfirm.roomDelete.initClose({
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                });
            });

            describe('Проверка', () => {
                befARoom();
                aft();
                decorate.page.room.noRoom({
                    arr: [data.rooms.room1],
                    timeout: entry.max
                });
                decorate.page.room.noDevice({
                    arr: [data.rooms.room1, data.camera.name, data.camera.ip],
                    timeout: entry.max
                });
                decorate.page.room.noRoom({
                    arr: [data.rooms.room1, data.rooms.room2],
                    timeout: entry.max
                });
                decorate.page.room.noDevice({
                    arr: [data.rooms.room1, data.rooms.room2, entry.device_name_1, entry.device_ip_1],
                    timeout: entry.max
                });
            });
        }

    });

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
                decorate.modalConfirm.roomDelete.initClose({
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
            });
        }
    });

    const deleteRoomAndDevice = () => describe(text + 'Удаление помещения, при наличии устройства', () => {
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

        describe(`Добавление камеры "${data.camera.name-data.camera.ip}" в помещение ${data.rooms.room1}`,
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
                name: data.camera.ip,
                timeout: entry.max
            });
             decorate.page.base.loading({
                timeout: entry.sleep2
            });
             decorate.el.button.handler({
                name: 'Выбрать',
                timeout: entry.max
            });
             decorate.el.error.checkError({
                    timeout: entry.sleep2
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
            decorate.el.error.checkError({
                    timeout: entry.sleep2
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
                arr: [data.rooms.room1, data.camera.name, data.camera.ip],
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
                        __EMPTY: 'camera1',
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
                decorate.el.error.checkError({
                    timeout: entry.sleep2
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
                        'Отчет "Отчет по устройствам"': 'camera1',
                        __EMPTY: '172.17.0.1',
                        __EMPTY_1: 'room1',
                        __EMPTY_2: 'Неконтролируемая территория'
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
                decorate.el.error.checkError({
                    timeout: entry.sleep2
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
                        'Контроллеры': 'camera1',
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
                decorate.el.error.checkError({
                    timeout: entry.sleep2
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
                        'Контроллер': 'camera1',
                        IP: '172.17.0.1',
                        'Считыватель 1': 'room1',
                        'Считыватель 2': 'Неконтролируемая территория'
                    },
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
                decorate.el.error.checkError({
                    timeout: entry.sleep2
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
                    value: data.camera.name2,
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
                decorate.el.error.checkError({
                    timeout: entry.sleep2
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
                    name: data.camera.name2,
                    ip: data.camera.ip,
                    timeout: entry.max
                });
            });
        }
    });

    const editCamera = () => describe(text + 'Редактировнаие камеры.', () => {
        if(type === 'device') {
            describe('Редактирование', () => {
                befDevice();
                aft();
                decorate.page.device.device({
                    name: data.camera.name2,
                    ip: data.camera.ip,
                    timeout: entry.max
                });
                decorate.page.device.handler({
                    name: data.camera.name2,
                    ip: data.camera.ip,
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
                decorate.el.input.input({
                    title: 'Название',
                    placeholder: '',
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
                    value: data.camera.name,
                    timeout: entry.max
                });
                decorate.el.button.handler({
                    name: 'Сохранить изменения в устройство',
                    timeout: entry.max
                });
                decorate.el.error.checkError({
                    timeout: entry.sleep2
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
                decorate.el.error.checkError({
                    timeout: entry.sleep2
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
                decorate.el.error.checkError({
                    timeout: entry.sleep2
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
                decorate.el.error.checkError({
                    timeout: entry.sleep2
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
                decorate.el.error.checkError({
                    timeout: entry.sleep2
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
                decorate.el.error.checkError({
                    timeout: entry.sleep2
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
                decorate.el.error.checkError({
                    timeout: entry.sleep2
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
                decorate.el.error.checkError({
                    timeout: entry.sleep2
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
                    value: data.bolid.address,
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
                decorate.el.error.checkError({
                    timeout: entry.sleep2
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
                decorate.el.error.checkError({
                    timeout: entry.sleep2
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

    const displayLockCTL14 = () => describe(text + 'Проверка отображения страницы добавления шлюза CTL14 ' +
        'и отображение ошибки при невалидном добавлении.', () => {
        if(type === 'device') {
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
                name: 'Добавить шлюз CTL14',
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
            decorate.el.input.getValue({
                title: 'Название',
                placeholder: '',
                value: data.lockCTL14.name,
                timeout: entry.max
            });
            decorate.el.simpleCell.active({
                name: data.lockCTL14.cell,
                timeout: entry.max
            });
            decorate.el.select.select({
                title: 'Алгоритм прохода',
                value: data.lockCTL14.algorithm,
                timeout: entry.max
            });
            decorate.el.input.getValue({
                title: 'Время нахождения в шлюзе (сек)',
                placeholder: '',
                value: data.lockCTL14.time,
                timeout: entry.max
            });
            decorate.el.button.handler({
                name: 'Сохранить изменения в устройство',
                timeout: entry.max
            });
            decorate.el.error.error({
                text: data.lockCTL14.error,
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
        }
    });

    const displayLockCL15 = () => describe(text + 'Проверка отображения страницы добавления шлюза CL15 ' +
        'и отображение ошибки при невалидном добавлении.', () => {
        if(type === 'device') {
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
                name: 'Добавить шлюз CL15',
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
            decorate.el.input.getValue({
                title: 'Название',
                placeholder: '',
                value: data.lockCL15.name,
                timeout: entry.max
            });
            decorate.el.simpleCell.active({
                name: data.lockCL15.cell,
                timeout: entry.max
            });
            decorate.el.select.select({
                title: 'Алгоритм прохода',
                value: data.lockCL15.algorithm,
                timeout: entry.max
            });
            decorate.el.input.getValue({
                title: 'Время нахождения в шлюзе (сек)',
                placeholder: '',
                value: data.lockCL15.time,
                timeout: entry.max
            });
            decorate.el.button.handler({
                name: 'Сохранить изменения в устройство',
                timeout: entry.max
            });
            decorate.el.error.error({
                text: data.lockCL15.error,
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
        }
    });

    const displayObjectCL15 = () => describe(text + 'Проверка отображения страницы добавления составного объекта CL15 '+
        'и отображение ошибки при невалидном добавлении.', () => {
        if(type === 'device') {
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
                name: 'Добавить составной объект CL15',
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
            decorate.el.input.getValue({
                title: 'Название',
                placeholder: '',
                value: data.objectCL15.name,
                timeout: entry.max
            });
            decorate.el.simpleCell.active({
                name: data.objectCL15.cell,
                timeout: entry.max
            });
            decorate.el.select.select({
                title: 'Алгоритм',
                value: data.objectCL15.algorithm,
                timeout: entry.max
            });
            decorate.el.select.select({
                title: 'Контроллер 1',
                value: data.objectCL15.controller1,
                timeout: entry.max
            });
            decorate.el.select.select({
                title: 'Контроллер 1',
                value: data.objectCL15.controller2,
                timeout: entry.max
            });
            decorate.el.button.handler({
                name: 'Сохранить изменения в устройство',
                timeout: entry.max
            });
            decorate.el.error.error({
                text: data.objectCL15.error,
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
        }
    });

    const displayMobileTerminal = () => describe(text + 'Проверка отображения модального окна "Мобильный интервал".',
        () => {

        if(type === 'device') {
            befDevice();
            aft();
            decorate.el.butIcBefore.handler({
                icon: but.unsorted_smartphone_outline,
                timeout: entry.max
            });
            decorate.modal.addMobileInterval.init({
                timeout: entry.max
            });
            decorate.modal.addMobileInterval.closeHandler({
                timeout: entry.max
            });
            decorate.modal.addMobileInterval.initClose({
                timeout: entry.max
            });
        }
    });

    const filterIP = () => describe(text + 'Проверка фильтра по IP адресу.', () => {

        if(type === 'device') {

            befDevice();
            aft();

            describe('Отображение до применения фильтра', () => {
                decorate.page.device.device({
                    name: entry.device_name_1,
                    ip: entry.device_ip_1,
                    timeout: entry.max
                });
                decorate.page.device.device({
                    name: data.camera.name,
                    ip: data.camera.ip,
                    timeout: entry.max
                });
            });

            describe(`Ввод "${entry.device_ip_1}" в поиск по IP адресу`, () => {
                decorate.el.input.sendKeys({
                    title: '',
                    placeholder: 'IP адрес',
                    value: entry.device_ip_1,
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.error.checkError({
                    timeout: entry.sleep2
                });
            });

            describe('Отображение после применения фильтра', () => {
                decorate.page.device.device({
                    name: entry.device_name_1,
                    ip: entry.device_ip_1,
                    timeout: entry.max
                });
                decorate.page.device.noDevice({
                    name: data.camera.name,
                    ip: data.camera.ip,
                    timeout: entry.max
                });
            });

            describe(`Удаление "${entry.device_ip_1}" из поиска по IP адресу`, () => {
                decorate.el.input.backSpace({
                    title: '',
                    placeholder: 'IP адрес',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.error.checkError({
                    timeout: entry.sleep2
                });
            });

            describe('Отображение после удаления фильтра', () => {
                decorate.page.device.device({
                    name: entry.device_name_1,
                    ip: entry.device_ip_1,
                    timeout: entry.max
                });
                decorate.page.device.device({
                    name: data.camera.name,
                    ip: data.camera.ip,
                    timeout: entry.max
                });
            });
        }

        if(type === 'room') {

            befARoom();
            aft();

            describe('Отображение до применения фильтра', () => {
                decorate.page.room.room({
                    arr: [data.rooms.room1],
                    timeout: entry.max
                });
                decorate.page.room.device({
                    arr: [data.rooms.room1, data.camera.name, data.camera.ip],
                    timeout: entry.max
                });
                decorate.page.room.room({
                    arr: [data.rooms.room1, data.rooms.room2],
                    timeout: entry.max
                });
                decorate.page.room.device({
                    arr: [data.rooms.room1, data.rooms.room2, entry.device_name_1, entry.device_ip_1],
                    timeout: entry.max
                });
            });

            describe(`Ввод "${data.camera.ip}" в поиск по IP адресу`, () => {
                decorate.el.input.sendKeys({
                    title: '',
                    placeholder: 'IP адрес',
                    value: data.camera.ip,
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
            });

            describe('Отображение после применения фильтра', () => {
                decorate.page.room.room({
                    arr: [data.rooms.room1],
                    timeout: entry.max
                });
                decorate.page.room.device({
                    arr: [data.rooms.room1, data.camera.name, data.camera.ip],
                    timeout: entry.max
                });
                decorate.page.room.noRoom({
                    arr: [data.rooms.room1, data.rooms.room2],
                    timeout: entry.max
                });
                decorate.page.room.noDevice({
                    arr: [data.rooms.room1, data.rooms.room2, entry.device_name_1, entry.device_ip_1],
                    timeout: entry.max
                });
            });

            describe(`Удаление "${data.camera.ip}" из поиска по IP адресу`, () => {
                decorate.el.input.backSpace({
                    title: '',
                    placeholder: 'IP адрес',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
            });

            describe('Отображение после удаления фильтра', () => {
                decorate.page.room.room({
                    arr: [data.rooms.room1],
                    timeout: entry.max
                });
                decorate.page.room.device({
                    arr: [data.rooms.room1, data.camera.name, data.camera.ip],
                    timeout: entry.max
                });
                decorate.page.room.room({
                    arr: [data.rooms.room1, data.rooms.room2],
                    timeout: entry.max
                });
                decorate.page.room.device({
                    arr: [data.rooms.room1, data.rooms.room2, entry.device_name_1, entry.device_ip_1],
                    timeout: entry.max
                });
            });
        }
    });

    const filterName = () => describe(text + 'Проверка фильтра по Названию', () => {

        if(type === 'device') {

            befDevice();
            aft();

            describe('Отображение до применения фильтра', () => {
                decorate.page.device.device({
                    name: entry.device_name_1,
                    ip: entry.device_ip_1,
                    timeout: entry.max
                });
                decorate.page.device.device({
                    name: data.camera.name,
                    ip: data.camera.ip,
                    timeout: entry.max
                });
            });

            describe(`Ввод "${entry.device_name_1}" в поиск по Названию`, () => {
                decorate.el.input.sendKeys({
                    title: '',
                    placeholder: 'Название',
                    value: entry.device_name_1,
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.error.checkError({
                    timeout: entry.sleep2
                });
            });

            describe('Отображение после применения фильтра', () => {
                decorate.page.device.device({
                    name: entry.device_name_1,
                    ip: entry.device_ip_1,
                    timeout: entry.max
                });
                decorate.page.device.noDevice({
                    name: data.camera.name,
                    ip: data.camera.ip,
                    timeout: entry.max
                });
            });

            describe(`Удаление "${entry.device_name_1}" из поиска по Названию`, () => {
                decorate.el.input.backSpace({
                    title: '',
                    placeholder: 'Название',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.error.checkError({
                    timeout: entry.sleep2
                });
            });

            describe('Отображение после удаления фильтра', () => {
                decorate.page.device.device({
                    name: entry.device_name_1,
                    ip: entry.device_ip_1,
                    timeout: entry.max
                });
                decorate.page.device.device({
                    name: data.camera.name,
                    ip: data.camera.ip,
                    timeout: entry.max
                });
            });
        }

        if(type === 'room') {

            befARoom();
            aft();

            describe('Отображение до применения фильтра', () => {
                decorate.page.room.room({
                    arr: [data.rooms.room1],
                    timeout: entry.max
                });
                decorate.page.room.device({
                    arr: [data.rooms.room1, data.camera.name, data.camera.ip],
                    timeout: entry.max
                });
                decorate.page.room.room({
                    arr: [data.rooms.room1, data.rooms.room2],
                    timeout: entry.max
                });
                decorate.page.room.device({
                    arr: [data.rooms.room1, data.rooms.room2, entry.device_name_1, entry.device_ip_1],
                    timeout: entry.max
                });
            });

            describe(`Ввод "${data.camera.name}" в поиск по Названию`, () => {
                decorate.el.input.sendKeys({
                    title: '',
                    placeholder: 'Название',
                    value: data.camera.name,
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
            });

            describe('Отображение после применения фильтра', () => {
                decorate.page.room.room({
                    arr: [data.rooms.room1],
                    timeout: entry.max
                });
                decorate.page.room.device({
                    arr: [data.rooms.room1, data.camera.name, data.camera.ip],
                    timeout: entry.max
                });
                decorate.page.room.noRoom({
                    arr: [data.rooms.room1, data.rooms.room2],
                    timeout: entry.max
                });
                decorate.page.room.noDevice({
                    arr: [data.rooms.room1, data.rooms.room2, entry.device_name_1, entry.device_ip_1],
                    timeout: entry.max
                });
            });

            describe(`Удаление "${data.camera.name}" из поиска по Названию`, () => {
                decorate.el.input.backSpace({
                    title: '',
                    placeholder: 'Название',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
            });

            describe('Отображение после удаления фильтра', () => {
                decorate.page.room.room({
                    arr: [data.rooms.room1],
                    timeout: entry.max
                });
                decorate.page.room.device({
                    arr: [data.rooms.room1, data.camera.name, data.camera.ip],
                    timeout: entry.max
                });
                decorate.page.room.room({
                    arr: [data.rooms.room1, data.rooms.room2],
                    timeout: entry.max
                });
                decorate.page.room.device({
                    arr: [data.rooms.room1, data.rooms.room2, entry.device_name_1, entry.device_ip_1],
                    timeout: entry.max
                });
            });
        }
    });

    const filterType = () => describe(text + 'Проверка фильтра по Типу.', () => {

        if(type === 'device') {

            befDevice();
            aft();

            describe('Отображение до применения фильтра', () => {
                decorate.page.device.device({
                    name: entry.device_name_1,
                    ip: entry.device_ip_1,
                    timeout: entry.max
                });
                decorate.page.device.device({
                    name: data.camera.name,
                    ip: data.camera.ip,
                    timeout: entry.max
                });
            });

            describe('Выбора Тип - Устройства', () => {
                decorate.el.select.iconXpand({
                    title: 'Тип',
                    value: 'Любой тип',
                    text: 'Устройства',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.error.checkError({
                    timeout: entry.sleep2
                });
            });

            describe('Отображение после применения фильтра', () => {
                decorate.page.device.device({
                    name: entry.device_name_1,
                    ip: entry.device_ip_1,
                    timeout: entry.max
                });
                decorate.page.device.noDevice({
                    name: data.camera.name,
                    ip: data.camera.ip,
                    timeout: entry.max
                });
            });

            describe('Выбора Тип - Видеокамеры', () => {
                decorate.el.select.iconXpand({
                    title: 'Тип',
                    value: 'Устройства',
                    text: 'Видеокамеры',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.error.checkError({
                    timeout: entry.sleep2
                });
            });

            describe('Отображение после применения фильтра', () => {
                decorate.page.device.noDevice({
                    name: entry.device_name_1,
                    ip: entry.device_ip_1,
                    timeout: entry.max
                });
                decorate.page.device.device({
                    name: data.camera.name,
                    ip: data.camera.ip,
                    timeout: entry.max
                });
            });

            describe('Выбора Тип - Шлюзы', () => {
                decorate.el.select.iconXpand({
                    title: 'Тип',
                    value: 'Видеокамеры',
                    text: 'Шлюзы',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.error.checkError({
                    timeout: entry.sleep2
                });
            });

            describe('Отображение после применения фильтра', () => {
                decorate.page.device.noDevice({
                    name: entry.device_name_1,
                    ip: entry.device_ip_1,
                    timeout: entry.max
                });
                decorate.page.device.noDevice({
                    name: data.camera.name,
                    ip: data.camera.ip,
                    timeout: entry.max
                });
            });

            describe('Выбора Тип - Любой тип', () => {
                decorate.el.select.iconXpand({
                    title: 'Тип',
                    value: 'Шлюзы',
                    text: 'Любой тип',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.error.checkError({
                    timeout: entry.sleep2
                });
            });

            describe('Отображение после применения фильтра', () => {
                decorate.page.device.device({
                    name: entry.device_name_1,
                    ip: entry.device_ip_1,
                    timeout: entry.max
                });
                decorate.page.device.device({
                    name: data.camera.name,
                    ip: data.camera.ip,
                    timeout: entry.max
                });
            });
        }

        if(type === 'room') {

            befARoom();
            aft();

            describe('Отображение до применения фильтра', () => {
                decorate.page.room.room({
                    arr: [data.rooms.room1],
                    timeout: entry.max
                });
                decorate.page.room.device({
                    arr: [data.rooms.room1, data.camera.name, data.camera.ip],
                    timeout: entry.max
                });
                decorate.page.room.room({
                    arr: [data.rooms.room1, data.rooms.room2],
                    timeout: entry.max
                });
                decorate.page.room.device({
                    arr: [data.rooms.room1, data.rooms.room2, entry.device_name_1, entry.device_ip_1],
                    timeout: entry.max
                });
            });

            describe('Выбора Тип - Помещения', () => {
                decorate.el.select.iconXpand({
                    title: 'Тип',
                    value: 'Любой тип',
                    text: 'Помещения',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.error.checkError({
                    timeout: entry.sleep2
                });
            });

            describe('Отображение после применения фильтра', () => {
                decorate.page.room.room({
                    arr: [data.rooms.room1],
                    timeout: entry.max
                });
                decorate.page.room.noDevice({
                    arr: [data.rooms.room1, data.camera.name, data.camera.ip],
                    timeout: entry.max
                });
                decorate.page.room.room({
                    arr: [data.rooms.room1, data.rooms.room2],
                    timeout: entry.max
                });
                decorate.page.room.noDevice({
                    arr: [data.rooms.room1, data.rooms.room2, entry.device_name_1, entry.device_ip_1],
                    timeout: entry.max
                });
            });

            describe('Выбора Тип - Устройства', () => {
                decorate.el.select.iconXpand({
                    title: 'Тип',
                    value: 'Помещения',
                    text: 'Устройства',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.error.checkError({
                    timeout: entry.sleep2
                });
            });

            describe('Отображение после применения фильтра', () => {
                decorate.page.room.room({
                    arr: [data.rooms.room1],
                    timeout: entry.max
                });
                decorate.page.room.noDevice({
                    arr: [data.rooms.room1, data.camera.name, data.camera.ip],
                    timeout: entry.max
                });
                decorate.page.room.room({
                    arr: [data.rooms.room1, data.rooms.room2],
                    timeout: entry.max
                });
                decorate.page.room.device({
                    arr: [data.rooms.room1, data.rooms.room2, entry.device_name_1, entry.device_ip_1],
                    timeout: entry.max
                });
            });

            describe('Выбора Тип - Видеокамеры', () => {
                decorate.el.select.iconXpand({
                    title: 'Тип',
                    value: 'Устройства',
                    text: 'Видеокамеры',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.error.checkError({
                    timeout: entry.sleep2
                });
            });

            describe('Отображение после применения фильтра', () => {
                decorate.page.room.room({
                    arr: [data.rooms.room1],
                    timeout: entry.max
                });
                decorate.page.room.device({
                    arr: [data.rooms.room1, data.camera.name, data.camera.ip],
                    timeout: entry.max
                });
                decorate.page.room.noRoom({
                    arr: [data.rooms.room1, data.rooms.room2],
                    timeout: entry.max
                });
                decorate.page.room.noDevice({
                    arr: [data.rooms.room1, data.rooms.room2, entry.device_name_1, entry.device_ip_1],
                    timeout: entry.max
                });
            });

            describe('Выбора Тип - Шлюзы', () => {
                decorate.el.select.iconXpand({
                    title: 'Тип',
                    value: 'Видеокамеры',
                    text: 'Шлюзы',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.error.checkError({
                    timeout: entry.sleep2
                });
            });

            describe('Отображение после применения фильтра', () => {
                decorate.page.room.noRoom({
                    arr: [data.rooms.room1],
                    timeout: entry.max
                });
                decorate.page.room.noDevice({
                    arr: [data.rooms.room1, data.camera.name, data.camera.ip],
                    timeout: entry.max
                });
                decorate.page.room.noRoom({
                    arr: [data.rooms.room1, data.rooms.room2],
                    timeout: entry.max
                });
                decorate.page.room.noDevice({
                    arr: [data.rooms.room1, data.rooms.room2, entry.device_name_1, entry.device_ip_1],
                    timeout: entry.max
                });
            });

            describe('Выбора Тип - Любой тип', () => {
                decorate.el.select.iconXpand({
                    title: 'Тип',
                    value: 'Шлюзы',
                    text: 'Любой тип',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.error.checkError({
                    timeout: entry.sleep2
                });
            });

            describe('Отображение после применения фильтра', () => {
                decorate.page.room.room({
                    arr: [data.rooms.room1],
                    timeout: entry.max
                });
                decorate.page.room.device({
                    arr: [data.rooms.room1, data.camera.name, data.camera.ip],
                    timeout: entry.max
                });
                decorate.page.room.room({
                    arr: [data.rooms.room1, data.rooms.room2],
                    timeout: entry.max
                });
                decorate.page.room.device({
                    arr: [data.rooms.room1, data.rooms.room2, entry.device_name_1, entry.device_ip_1],
                    timeout: entry.max
                });
            });
        }
    });

    const addEvent = () => describe(text + 'Добавление изменения названия события.', () => {
        if(type === 'event') {
            describe('Добавление', () => {
                befEvent();
                aft();
                decorate.page.room.handler({
                    arr: [entry.device_name_1],
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.input.sendKeys({
                    title: '',
                    placeholder: 'Выберите событие для переименования',
                    value: data.event.name1,
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.selectXpand.xpand({
                    timeout: entry.max
                });
                decorate.el.selectXpand.handler({
                    value: data.event.name1,
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.selectXpand.xpandNoElement({
                    timeout: entry.max
                });
                decorate.el.button.handler({
                    name: 'Добавить',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.input.sendKeys({
                    title: '',
                    placeholder: 'Новое название',
                    value: data.event.name2,
                    timeout: entry.max
                });
                decorate.el.button.handler({
                    name: 'Сохранить',
                    timeout: entry.max
                });
                decorate.el.error.checkError({
                    timeout: entry.sleep2
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
            });

            describe('Удаление всех событий из БД.', () => {
                it('Удаление всех событий  из БД', () => dec.simple(db.truncateEvent,
                    [],
                    db.truncateEvent));
            });

            describe('Добавление события прохода', () => {
                decorate.page.base.open({
                    url: 'http://172.17.100.4/api/setEvent?uid=617&card=13242237&dir=0'
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
            });

            describe('Проверка таблицы "События"', () => {
                befSystemEvent();
                aft();
                decorate.el.table.cellGetText({
                    headTitle: 'Событие',
                    strNumber: 2,
                    cellNumber: 2,
                    value: data.event.name2,
                    timeout: entry.max
                });
            });
        }
    });

    const addCheckEvent = () => describe(text + 'Проверка изменнного названия, после добавления изменения.', () => {
        if(type === 'event') {
            describe('Удаление всех событий из БД.', () => {
                it('Удаление всех событий  из БД', () => dec.simple(db.truncateEvent,
                    [],
                    db.truncateEvent));
            });

            describe('Добавление события прохода', () => {
                decorate.page.base.open({
                    url: 'http://172.17.100.4/api/setEvent?uid=617&card=13242237&dir=0'
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
            });

            describe('Проверка таблицы "События"', () => {
                befSystemEvent();
                aft();
                decorate.el.table.cellGetText({
                    headTitle: 'Событие',
                    strNumber: 2,
                    cellNumber: 2,
                    value: data.event.name2,
                    timeout: entry.max
                });
            });
        }
    });

    const addDuplicateEvent = () => describe(text + 'Добавление дублирования изменения названия события.', () => {

        befEvent();
        aft();
        decorate.page.room.handler({
            arr: [entry.device_name_1],
            timeout: entry.max
        });
        decorate.page.base.loading({
            timeout: entry.sleep2
        });
        decorate.el.input.sendKeys({
            title: '',
            placeholder: 'Выберите событие для переименования',
            value: data.event.name1,
            timeout: entry.max
        });
        decorate.page.base.loading({
            timeout: entry.sleep2
        });
        decorate.el.selectXpand.xpand({
            timeout: entry.max
        });
        decorate.el.selectXpand.handler({
            value: data.event.name1,
            timeout: entry.max
        });
        decorate.page.base.loading({
            timeout: entry.sleep2
        });
        decorate.el.selectXpand.xpandNoElement({
            timeout: entry.max
        });
        decorate.el.button.handler({
            name: 'Добавить',
            timeout: entry.max
        });
        decorate.el.error.error({
            text: 'Уже существует',
            timeout: entry.max
        });
    });

    const deleteEvent = () => describe(text + 'Удаление изменения названия события.', () => {

        if(type === 'event') {
            describe('Удаление', () => {
                befEvent();
                aft();
                decorate.page.room.handler({
                    arr: [entry.device_name_1],
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.butIcAfter.handler({
                    icon: but.unsorted_delete_outline_android,
                    timeout: entry.max
                });
                decorate.modalConfirm.deleteEventRename.init({
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.button.handler({
                    name: 'Подтвердить',
                    timeout: entry.max
                });
                decorate.el.error.checkError({
                    timeout: entry.sleep2
                });
                decorate.modalConfirm.deleteEventRename.initClose({
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
            });
        }
    });

    const deleteCheckEvent = () => describe(text + 'Проверка изменнного названия, после удаления изменения.', () => {
        if(type === 'event') {
            describe('Удаление всех событий из БД.', () => {
                it('Удаление всех событий  из БД', () => dec.simple(db.truncateEvent,
                    [],
                    db.truncateEvent));
            });

            describe('Добавление события прохода', () => {
                decorate.page.base.open({
                    url: 'http://172.17.100.4/api/setEvent?uid=617&card=13242237&dir=0'
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
            });

            describe('Проверка таблицы "События"', () => {
                befSystemEvent();
                aft();
                decorate.el.table.cellGetText({
                    headTitle: 'Событие',
                    strNumber: 2,
                    cellNumber: 2,
                    value: data.event.name1,
                    timeout: entry.max
                });
            });
        }
    });

    const addCameraTemplate = () => describe(text + 'Добавление шаблона камеры.', () => {
        if(type === 'camera') {
            describe('Добавление', () => {
                befCamera();
                aft();
                decorate.el.butIcBefore.handler({
                    icon: but.add,
                    timeout: entry.max
                });
                decorate.modal.addCameraTemplate.init({
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.input.handler({
                    title: 'Производитель',
                    placeholder: 'Выберите или введите нового производителя',
                    timeout: entry.max
                });
                decorate.el.selectXpand.xpand({
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.selectXpand.handler({
                    value: data.cameraTemplate1.maker,
                    timeout: entry.max
                });
                decorate.el.selectXpand.xpandNoElement({
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });

                decorate.el.input.sendKeys({
                    title: 'Модель',
                    placeholder: '',
                    value: data.cameraTemplate1.model,
                    timeout: entry.max
                });
                decorate.el.input.sendKeys({
                    title: 'Путь к видеопотоку',
                    placeholder: 'Пример: /video.mpeg4',
                    value: data.cameraTemplate1.video,
                    timeout: entry.max
                });
                decorate.el.button.handler({
                    name: 'Сохранить',
                    timeout: entry.max
                });
                decorate.el.error.checkError({
                    timeout: entry.sleep2
                });
                decorate.modal.addCameraTemplate.initClose({
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
            });

            describe('Проверка', () => {
                befCamera();
                aft();

                describe('Проверка таблицы', () => {
                    decorate.el.table.cellGetText({
                        headTitle: 'Производитель',
                        strNumber: 1,
                        cellNumber: 1,
                        value: data.cameraTemplate1.maker,
                        timeout: entry.max
                    });
                    decorate.el.table.cellGetText({
                        headTitle: 'Модель',
                        strNumber: 1,
                        cellNumber: 2,
                        value: data.cameraTemplate1.model,
                        timeout: entry.max
                    });
                    decorate.el.table.cellGetText({
                        headTitle: 'Тип потока',
                        strNumber: 1,
                        cellNumber: 3,
                        value: data.cameraTemplate1.type,
                        timeout: entry.max
                    });
                });

                describe('Проверка параметров', () => {
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
                    decorate.modal.editCameraTemplate.init({
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.input.getValue({
                        title: 'Производитель',
                        placeholder: 'Выберите или введите нового производителя',
                        value: data.cameraTemplate1.maker,
                        timeout: entry.max
                    });
                    decorate.el.input.getValue({
                        title: 'Модель',
                        placeholder: '',
                        value: data.cameraTemplate1.model,
                        timeout: entry.max
                    });
                    decorate.el.input.getValue({
                        title: 'Путь к видеопотоку',
                        placeholder: 'Пример: /video.mpeg4',
                        value: data.cameraTemplate1.video,
                        timeout: entry.max
                    });
                    decorate.modal.editCameraTemplate.closeHandler({
                        timeout: entry.max
                    });
                    decorate.modal.editCameraTemplate.initClose({
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                });
            });
        }
    });

    const addCameraTemplateDuplicate = () => describe(text + 'Дублирование шаблона камеры.', () => {
        if(type === 'camera') {
            befCamera();
            aft();
            decorate.el.butIcBefore.handler({
                icon: but.add,
                timeout: entry.max
            });

            decorate.modal.addCameraTemplate.init({
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
            decorate.el.input.handler({
                title: 'Производитель',
                placeholder: 'Выберите или введите нового производителя',
                timeout: entry.max
            });
            decorate.el.selectXpand.xpand({
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
            decorate.el.selectXpand.handler({
                value: data.cameraTemplate1.maker,
                timeout: entry.max
            });
            decorate.el.selectXpand.xpandNoElement({
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });

            decorate.el.input.sendKeys({
                title: 'Модель',
                placeholder: '',
                value: data.cameraTemplate1.model,
                timeout: entry.max
            });
            decorate.el.input.sendKeys({
                title: 'Путь к видеопотоку',
                placeholder: 'Пример: /video.mpeg4',
                value: data.cameraTemplate1.video,
                timeout: entry.max
            });
            decorate.el.button.handler({
                name: 'Сохранить',
                timeout: entry.max
            });
            decorate.el.error.error({
                text: 'Шаблон для камеры такого типа уже добавлен',
                timeout: entry.max
            });
            decorate.modal.addCameraTemplate.initClose({
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
        }
    });

    const checkCameraTemplate = () => describe(text + 'Проверка отображения шаблона камеры, при добавлении камеры.',
        () => {
        if(type === 'camera') {
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
            decorate.el.select.iconXpand({
                title: 'Шаблон камеры',
                value: '',
                text: data.cameraTemplate1.template,
                timeout: entry.max
            });
            decorate.modal.addCamera.closeHandler({
                timeout: entry.max
            });
            decorate.modal.addCamera.initClose({
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
        }
    });

    const editCameraTemplate = () => describe(text + 'Редактирование шаблона камеры.', () => {
        if(type === 'camera') {
            describe('Редактирование', () => {
                befCamera();
                aft();
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

                decorate.modal.editCameraTemplate.init({
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.input.handler({
                    title: 'Производитель',
                    placeholder: 'Выберите или введите нового производителя',
                    timeout: entry.max
                });
                decorate.el.selectXpand.xpand({
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.selectXpand.handler({
                    value: data.cameraTemplate2.maker,
                    timeout: entry.max
                });
                decorate.el.selectXpand.xpandNoElement({
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });

                decorate.el.input.backSpace({
                    title: 'Модель',
                    placeholder: '',
                    timeout: entry.max
                });
                decorate.el.input.sendKeys({
                    title: 'Модель',
                    placeholder: '',
                    value: data.cameraTemplate2.model,
                    timeout: entry.max
                });
                decorate.el.input.backSpace({
                    title: 'Путь к видеопотоку',
                    placeholder: 'Пример: /video.mpeg4',
                    timeout: entry.max
                });
                decorate.el.input.sendKeys({
                    title: 'Путь к видеопотоку',
                    placeholder: 'Пример: /video.mpeg4',
                    value: data.cameraTemplate2.video,
                    timeout: entry.max
                });
                decorate.el.button.handler({
                    name: 'Сохранить',
                    timeout: entry.max
                });
                decorate.el.error.checkError({
                    timeout: entry.sleep2
                });
                decorate.modal.editCameraTemplate.initClose({
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
            });

            describe('Проверка', () => {
                befCamera();
                aft();

                describe('Проверка таблицы', () => {
                    decorate.el.table.cellGetText({
                        headTitle: 'Производитель',
                        strNumber: 1,
                        cellNumber: 1,
                        value: data.cameraTemplate2.maker,
                        timeout: entry.max
                    });
                    decorate.el.table.cellGetText({
                        headTitle: 'Модель',
                        strNumber: 1,
                        cellNumber: 2,
                        value: data.cameraTemplate2.model,
                        timeout: entry.max
                    });
                    decorate.el.table.cellGetText({
                        headTitle: 'Тип потока',
                        strNumber: 1,
                        cellNumber: 3,
                        value: data.cameraTemplate2.type,
                        timeout: entry.max
                    });
                });

                describe('Проверка параметров', () => {
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
                    decorate.modal.editCameraTemplate.init({
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.input.getValue({
                        title: 'Производитель',
                        placeholder: 'Выберите или введите нового производителя',
                        value: data.cameraTemplate2.maker,
                        timeout: entry.max
                    });
                    decorate.el.input.getValue({
                        title: 'Модель',
                        placeholder: '',
                        value: data.cameraTemplate2.model,
                        timeout: entry.max
                    });
                    decorate.el.input.getValue({
                        title: 'Путь к видеопотоку',
                        placeholder: 'Пример: /video.mpeg4',
                        value: data.cameraTemplate2.video,
                        timeout: entry.max
                    });
                    decorate.modal.editCameraTemplate.closeHandler({
                        timeout: entry.max
                    });
                    decorate.modal.editCameraTemplate.initClose({
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                });
            });
        }
    });

    const deleteCameraTemplate = () => describe(text + 'Удаление шаблона камеры.', () => {
        if(type === 'camera') {
            describe('Проверка таблицы до удаления', () => {
                befCamera();
                aft();
                decorate.el.table.size({
                    strCount: 7,
                    timeout: entry.max
                });
            });

            describe('Удаление', () => {
                befCamera();
                aft();
                decorate.el.table.strHandler({
                    strNumber: 1,
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.butIcBefore.handler({
                    icon: but.delete,
                    timeout: entry.max
                });
                decorate.modalConfirm.cameraTemplateDelete.init({
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.button.handler({
                    name: 'Подтвердить',
                    timeout: entry.max
                });
                decorate.el.error.checkError({
                    timeout: entry.sleep2
                });
                decorate.modalConfirm.cameraTemplateDelete.initClose({
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
            });

            describe('Проверка таблицы после удаления', () => {
                befCamera();
                aft();
                decorate.el.table.size({
                    strCount: 6,
                    timeout: entry.max
                });
            });
        }
    });

    const displaySystem = () => describe(text + 'Проверка отображения.', () => {
        befSystem();
        aft();

        describe('Вкладка Основные параметры', () => {
            describe('Общие настройки', () => {
                decorate.el.error.checkError({
                    timeout: entry.sleep2
                });
                decorate.el.pwMenu.active({
                    value: 'Основные параметры',
                    timeout: entry.max
                });
                decorate.el.select.select({
                    title: 'Формат даты',
                    value: 'YYYY-MM-DD',
                    timeout: entry.max
                });
                decorate.el.select.select({
                    title: 'Язык системы',
                    value: 'Русский',
                    timeout: entry.max
                });
                decorate.el.select.select({
                    title: 'Регион',
                    value: 'Россия',
                    timeout: entry.max
                });
            });

            describe('Очистка событий', () => {
                decorate.el.select.select({
                    title: 'Выберите тип',
                    value: 'Выберите тип',
                    timeout: entry.max
                });
            });

            describe('Система', () => {
                decorate.el.checkbox.checked({
                    name: '',
                    timeout: entry.max
                });
                decorate.el.input.getValue({
                    title: 'Максимальное количество экспортируемых строк',
                    placeholder: '',
                    value: '100000',
                    timeout: entry.max
                });
            });
        });

        describe('Рассылки и уведомления', () => {
            describe('Нажатие по Рассылки и уведомления', () => {
                decorate.el.pwMenu.handler({
                    value: 'Рассылки и уведомления',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
            });

            describe('Почтовая рассылка', () => {
                decorate.el.pwMenu.handler({
                    value: 'Почтовая рассылка',
                    timeout: entry.max
                });
                decorate.el.pwMenu.active({
                    value: 'Почтовая рассылка',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.input.getValue({
                    title: 'Адрес SMTP сервера',
                    placeholder: '',
                    value: '',
                    timeout: entry.max
                });
                decorate.el.select.select({
                    title: 'Тип защиты',
                    value: 'Нет',
                    timeout: entry.max
                });
                decorate.el.input.getValue({
                    title: 'Порт',
                    placeholder: '',
                    value: '',
                    timeout: entry.max
                });
                decorate.el.input.getValue({
                    title: 'Пользователь',
                    placeholder: '',
                    value: '',
                    timeout: entry.max
                });
                decorate.el.input.getValue({
                    title: 'Пароль',
                    placeholder: '',
                    value: '',
                    timeout: entry.max
                });
                decorate.el.input.getValue({
                    title: 'Email отправителя',
                    placeholder: '',
                    value: '',
                    timeout: entry.max
                });
                decorate.el.input.getValue({
                    title: 'Имя отправителя',
                    placeholder: '',
                    value: '',
                    timeout: entry.max
                });
                decorate.el.input.getValue({
                    title: 'Тема письма',
                    placeholder: '',
                    value: '',
                    timeout: entry.max
                });
                decorate.el.select.select({
                    title: 'Записывать в события системы',
                    value: 'Нет',
                    timeout: entry.max
                });
                decorate.el.checkbox.unchecked({
                    name: '',
                    timeout: entry.max
                });
                decorate.el.button.button({
                    name: 'Сохранить',
                    timeout: entry.max
                });
                decorate.el.button.button({
                    name: 'Тестовое сообщение',
                    timeout: entry.max
                });
            });

            describe('SMS-уведомления', () => {
                decorate.el.pwMenu.handler({
                    value: 'SMS-уведомления',
                    timeout: entry.max
                });
                decorate.el.pwMenu.active({
                    value: 'SMS-уведомления',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.select.select({
                    title: 'Шаблон',
                    value: 'Шаблон не выбран',
                    timeout: entry.max
                });
                decorate.el.input.getValue({
                    title: 'SMPP - сервер',
                    placeholder: '',
                    value: '',
                    timeout: entry.max
                });
                decorate.el.input.getValue({
                    title: 'SMPP - порт',
                    placeholder: '',
                    value: '',
                    timeout: entry.max
                });
                decorate.el.input.getValue({
                    title: 'Source address TON',
                    placeholder: '',
                    value: '',
                    timeout: entry.max
                });
                decorate.el.input.getValue({
                    title: 'Source address NPI',
                    placeholder: '',
                    value: '',
                    timeout: entry.max
                });
                decorate.el.input.getValue({
                    title: 'Destination address TON',
                    placeholder: '',
                    value: '',
                    timeout: entry.max
                });
                decorate.el.input.getValue({
                    title: 'Destination address NPI',
                    placeholder: '',
                    value: '',
                    timeout: entry.max
                });
                decorate.el.input.getValue({
                    title: 'Пользователь',
                    placeholder: '',
                    value: '',
                    timeout: entry.max
                });
                decorate.el.input.getValue({
                    title: 'Пароль',
                    placeholder: '',
                    value: '',
                    timeout: entry.max
                });
                decorate.el.input.getValue({
                    title: 'Имя отправителя',
                    placeholder: '',
                    value: '',
                    timeout: entry.max
                });
                decorate.el.select.select({
                    title: 'Записывать в события системы',
                    value: 'Нет',
                    timeout: entry.max
                });
                decorate.el.button.button({
                    name: 'Сохранить',
                    timeout: entry.max
                });
                decorate.el.button.button({
                    name: 'Тестовое сообщение',
                    timeout: entry.max
                });
            });

            describe('Настройки Viber', () => {
                decorate.el.pwMenu.handler({
                    value: 'Настройки Viber',
                    timeout: entry.max
                });
                decorate.el.pwMenu.active({
                    value: 'Настройки Viber',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.input.getValue({
                    title: 'Токен',
                    placeholder: '',
                    value: '',
                    timeout: entry.max
                });
                decorate.el.input.getValue({
                    title: 'Имя',
                    placeholder: '',
                    value: '',
                    timeout: entry.max
                });
                decorate.el.input.getValue({
                    title: 'Ссылка на аватар',
                    placeholder: '',
                    value: '',
                    timeout: entry.max
                });
                decorate.el.select.select({
                    title: 'Записывать в события системы',
                    value: 'Нет',
                    timeout: entry.max
                });
                decorate.el.button.button({
                    name: 'Сохранить',
                    timeout: entry.max
                });
                decorate.el.button.button({
                    name: 'Тестовое сообщение',
                    timeout: entry.max
                });
            });

            describe('Настройки Telegram', () => {
                decorate.el.pwMenu.handler({
                    value: 'Настройки Telegram',
                    timeout: entry.max
                });
                decorate.el.pwMenu.active({
                    value: 'Настройки Telegram',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.input.getValue({
                    title: 'Токен',
                    placeholder: '',
                    value: '',
                    timeout: entry.max
                });
                decorate.el.input.getValue({
                    title: 'Имя',
                    placeholder: '',
                    value: '',
                    timeout: entry.max
                });
                decorate.el.select.select({
                    title: 'Записывать в события системы',
                    value: 'Нет',
                    timeout: entry.max
                });
                decorate.el.button.button({
                    name: 'Сохранить',
                    timeout: entry.max
                });
            });
        });

        describe('Видеозапись', () => {
            decorate.el.pwMenu.handler({
                value: 'Видеозапись',
                timeout: entry.max
            });
            decorate.el.pwMenu.active({
                value: 'Видеозапись',
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
            decorate.el.input.getValue({
                title: 'Каталог для записи видео файлов',
                placeholder: '',
                value: '',
                timeout: entry.max
            });
            decorate.el.input.getValue({
                title: 'Продолжительность предзаписи (секунд)',
                placeholder: '',
                value: '8',
                timeout: entry.max
            });
            decorate.el.button.button({
                name: 'Сохранить',
                timeout: entry.max
            });
        });

        describe('OpenID Connect', () => {
            decorate.el.pwMenu.handler({
                value: 'OpenID Connect',
                timeout: entry.max
            });
            decorate.el.pwMenu.active({
                value: 'OpenID Connect',
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
            decorate.el.input.getValue({
                title: 'Адрес сервера',
                placeholder: 'http://...',
                value: '',
                timeout: entry.max
            });
            decorate.el.input.getValue({
                title: 'Область (Realm)',
                placeholder: '',
                value: '',
                timeout: entry.max
            });
            decorate.el.input.getValue({
                title: 'ID клиента',
                placeholder: '',
                value: '',
                timeout: entry.max
            });
            decorate.el.input.getValue({
                title: 'Имя пользователя',
                placeholder: '',
                value: '',
                timeout: entry.max
            });
            decorate.el.input.getValue({
                title: 'Пароль',
                placeholder: '',
                value: '',
                timeout: entry.max
            });
            decorate.el.input.getValue({
                title: 'Период синхронизации (Секундах)',
                placeholder: '',
                value: '60',
                timeout: entry.max
            });
            decorate.el.button.button({
                name: 'Сохранить',
                timeout: entry.max
            });
        });

        describe('Плагины', () => {
            decorate.el.pwMenu.handler({
                value: 'Плагины',
                timeout: entry.max
            });
            decorate.el.pwMenu.active({
                value: 'Плагины',
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
            decorate.el.placeholderText.getText({
                text: 'Нет установленных плагинов',
                timeout: entry.max
            });

        });

        describe('О системе', () => {
            decorate.el.pwMenu.handler({
                value: 'О системе',
                timeout: entry.max
            });
            decorate.el.pwMenu.active({
                value: 'О системе',
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
            decorate.page.system.getVersion({
                value: entry.version,
                timeout: entry.max
            });
            decorate.page.system.getNumber({
                value: entry.number,
                timeout: entry.max
            });
        });
    });

    const importRoom = () => describe(text + 'Проверка импорта.', () => {
        if(type === 'room') {
            describe('Импорт', () => {
                befARoom();
                aft();
                decorate.el.butIcBefore.handler({
                    icon: but.menu,
                    timeout: entry.max
                });
                decorate.el.menu.menu({
                    timeout: entry.max
                });
                decorate.el.menu.handler({
                    name: 'Импорт из XLS, XLSX',
                    timeout: entry.max
                });
                decorate.modal.importFile.init({
                    timeout: entry.max
                });
                decorate.modal.importFile.uploadFile({
                    src: imp.room.importRoom,
                    timeout: entry.upload
                });
                decorate.el.select.iconXpand({
                    title: 'Помещения',
                    value: '',
                    text: 'Помещение1',
                    timeout: entry.max
                });
                decorate.el.button.handler({
                    name: 'Далее',
                    timeout: entry.max
                });
                decorate.el.error.checkError({
                    timeout: entry.sleep2
                });
                decorate.el.button.button({
                    name: 'Готово',
                    timeout: entry.max
                });
                decorate.modal.importFile.bodyGetText({
                    value: 'Импорт завершен',
                    timeout: entry.max
                });
                decorate.el.button.handler({
                    name: 'Готово',
                    timeout: entry.max
                });
                decorate.modal.importFile.initClose({
                    timeout: entry.max
                });
            });

            describe('Проверка', () => {
                befARoom();
                aft();
                decorate.page.room.room({
                    arr: [data.rooms.room1],
                    timeout: entry.max
                });
                decorate.page.room.room({
                    arr: [data.rooms.room1, data.rooms.room2],
                    timeout: entry.max
                });
            });
        }
    });

    const importRoomFailed = () => describe('Персонал / Должности. Проверка импорта с ошибкой - дублирование.', () => {

        if(type === 'room') {
            const params = {
                fileName: 'unimported.xlsx',
                json: [
                    {
                        'Отчет "Неимпортированные данные"': 'Помещение1',
                        __EMPTY: 'Ошибка'
                    },
                    {
                        'Отчет "Неимпортированные данные"': 'Неконтролируемая территория/room1',
                        __EMPTY: 'Помещение уже существует'
                    },
                    {
                        'Отчет "Неимпортированные данные"': 'Неконтролируемая территория/room1/room2',
                        __EMPTY: 'Помещение уже существует'
                    }
                ]
            }

            describe('Импорт', () => {
                befARoom();
                aft();
                decorate.el.butIcBefore.handler({
                    icon: but.menu,
                    timeout: entry.max
                });
                decorate.el.menu.menu({
                    timeout: entry.max
                });
                decorate.el.menu.handler({
                    name: 'Импорт из XLS, XLSX',
                    timeout: entry.max
                });
                decorate.modal.importFile.init({
                    timeout: entry.max
                });
                decorate.modal.importFile.uploadFile({
                    src: imp.room.importRoom,
                    timeout: entry.upload
                });
                decorate.el.select.iconXpand({
                    title: 'Помещения',
                    value: '',
                    text: 'Помещение1',
                    timeout: entry.max
                });
                decorate.el.button.handler({
                    name: 'Далее',
                    timeout: entry.max
                });
                decorate.el.button.button({
                    name: 'Экспорт остатка в файл',
                    timeout: entry.max
                });
                decorate.modal.importFile.bodyGetText({
                    value: 'Импорт завершен. 2 записей из 2 не было импортировано',
                    timeout: entry.max
                });
                decorate.el.button.handler({
                    name: 'Экспорт остатка в файл',
                    timeout: entry.max
                });
                decorate.modal.importFile.initClose({
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
            });

            describe('Проверка таблицы', () => {
                befARoom();
                aft();
                decorate.page.room.room({
                    arr: [data.rooms.room1],
                    timeout: entry.max
                });
                decorate.page.room.room({
                    arr: [data.rooms.room1, data.rooms.room2],
                    timeout: entry.max
                });
            });

            describe('Проверка файла с ошибками', () => {
                decorate.el.file.display({
                    file: params.fileName,
                    timeout: entry.upload
                });
                decorate.el.file.comparison({
                    file: params.fileName,
                    json: params.json
                });
                decorate.el.file.delete({
                    file: params.fileName,
                    timeout: entry.upload
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
            });
        }
    });

    const deleteRooms = () => describe('Удаление помещения', () => {
        if(type === 'room') {
            befARoom();
            aft();
            describe(`Удаление помещения ${data.rooms.room2}`, () => {
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
                decorate.el.error.checkError({
                    timeout: entry.sleep2
                });
                decorate.modalConfirm.roomDelete.initClose({
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
            });

            describe(`Удаление помещения ${data.rooms.room1}`, () => {
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
                decorate.el.error.checkError({
                    timeout: entry.sleep2
                });
                decorate.modalConfirm.roomDelete.initClose({
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
            });
        }
    });

    return {
        addDeviceSearch,
        addDeviceIP,
        addDeviceIPFailed,
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
        editCamera,
        deleteCamera,
        addBiosmart,
        deleteBiosmart,
        addTrassir,
        deleteTrassir,
        addAxxon,
        deleteAxxon,
        addBolid,
        deleteBolid,
        displayLockCTL14,
        displayLockCL15,
        displayObjectCL15,
        displayMobileTerminal,
        filterIP,
        filterName,
        filterType,
        deleteRoomDevice,
        addEvent,
        addCheckEvent,
        addDuplicateEvent,
        deleteEvent,
        deleteCheckEvent,
        addCameraTemplate,
        checkCameraTemplate,
        addCameraTemplateDuplicate,
        editCameraTemplate,
        deleteCameraTemplate,
        displaySystem,
        importRoom,
        importRoomFailed,
        deleteRooms
    }
}

module.exports = {
    testDevice: test('device', 'Администрирование / Конфигурация - вкладка Устройства. '),
    testRoom: test('room', 'Администрирование / Конфигурация - вкладка Помещения. '),
    testEvent: test('event', 'Администрирование / Конфигурация - вкладка События. '),
    testCamera: test('camera', 'Администрирование / Конфигурация - вкладка Шаблоны камер. '),
    testSystem: test('system', 'Администрирование / Конфигурация - вкладка Система. '),
    configuration: otherTest()
}