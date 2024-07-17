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
const data = require('../../data').dataDeviceManagement;
const configuration = require('../administration/configuration-ui').configuration;

const befRoom = () => before('Вход и открытие подраздела "Управление устройствами" вкладка "Помещения"', async () => {
    await page.base.loading(entry.sleep1);
    await dec.auth(entry.customLogin, entry.customPassword);
    await dec.simple(el.section.handler, [sec.con, entry.max], el.section);
    await dec.simple(el.subsection.handler, [sub.con.device, entry.max], el.subsection);
    await dec.simple(el.tab.handler, ['Помещения', entry.max], el.tab);
    await dec.simple(page.deviceManagement.init, [entry.max], page.deviceManagement);
    await page.base.loading(entry.sleep1);
});

const befDevice = () => before('Вход и открытие подраздела "Выданные идентификаторы" вкладка "Сотрудники"', async () => {
    await page.base.loading(entry.sleep1);
    await dec.auth(entry.customLogin, entry.customPassword);
    await dec.simple(el.section.handler, [sec.con, entry.max], el.section);
    await dec.simple(el.subsection.handler, [sub.con.device, entry.max], el.subsection);
    await dec.simple(el.tab.handler, ['Устройства', entry.max], el.tab);
    await dec.simple(page.deviceManagement.init, [entry.max], page.deviceManagement);
    await page.base.loading(entry.sleep1);
});

const aft = () => after('Выход', async () => {
    await page.base.loading(entry.sleep1);
    await dec.exit();
});

const other = (type, text) => {

    const display = () => describe(text + 'Проверка отображения.', () => {
        if(type === 'room') {
            befRoom();
            aft();

            decorate.page.room.room({
                arr: [data.rooms.room1],
                timeout: entry.max
            });
            decorate.page.room.device({
                arr: [data.rooms.room1, data.device.name, data.device.ip],
                timeout: entry.max
            });
            decorate.page.room.room({
                arr: [data.rooms.room1, data.rooms.room2],
                timeout: entry.max
            });
            decorate.page.room.device({
                arr: [data.rooms.room1, data.rooms.room2, data.camera.name, data.camera.ip],
                timeout: entry.max
            });
        }

        if(type === 'device') {
            befDevice();
            aft();
            decorate.page.device.device({
                name: data.device.name,
                ip: data.device.ip,
                timeout: entry.max
            });
            decorate.page.device.device({
                name: data.camera.name,
                ip: data.camera.ip,
                timeout: entry.max
            });
        }
    });

    const resetAlarm = () => describe(text + 'Проверка "Сбросить тревогу".', () => {
        if(type === 'room') {
            describe('Сбросить тревогу', () => {
                befRoom();
                aft();
                decorate.page.device.handler({
                    name: data.device.name,
                    ip: data.device.ip,
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.button.handler({
                    name: 'Сбросить тревогу',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
            });

            describe('Проверка', () => {
                befRoom();
                aft();
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.page.device.deviceNoStatusAlarm({
                    name: data.device.name,
                    ip: data.device.ip,
                    timeout: entry.max
                });
            });
        }

        if(type === 'device') {
            describe('Сбросить тревогу', () => {
                befDevice();
                aft();
                decorate.page.device.handler({
                    name: data.device.name,
                    ip: data.device.ip,
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.button.handler({
                    name: 'Сбросить тревогу',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
            });

            describe('Проверка', () => {
                befDevice();
                aft();
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.page.device.deviceNoStatusAlarm({
                    name: data.device.name,
                    ip: data.device.ip,
                    timeout: entry.max
                });
            });
        }
    });

    const giveAlarm = () => describe(text + 'Проверка "Поднять тревогу".', () => {
        if(type === 'room') {
            describe('Поднять тревогу', () => {
                befRoom();
                aft();
                decorate.page.device.handler({
                    name: data.device.name,
                    ip: data.device.ip,
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.button.handler({
                    name: 'Поднять тревогу',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
            });

            describe('Проверка', () => {
                befRoom();
                aft();
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.page.device.deviceGetStatusAlarm({
                    name: data.device.name,
                    ip: data.device.ip,
                    value: '- Тревога!',
                    timeout: entry.max
                });
            });
        }

        if(type === 'device') {
            describe('Поднять тревогу', () => {
                befDevice();
                aft();
                decorate.page.device.handler({
                    name: data.device.name,
                    ip: data.device.ip,
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.button.handler({
                    name: 'Поднять тревогу',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
            });

            describe('Проверка', () => {
                befDevice();
                aft();
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.page.device.deviceGetStatusAlarm({
                    name: data.device.name,
                    ip: data.device.ip,
                    value: '- Тревога!',
                    timeout: entry.max
                });
            });
        }
    });

    const modeOpen = () => describe(text + 'Проверка "Установить режим "Открыто"".', () => {
        if(type === 'room') {
            befRoom();
            aft();

            describe('Установить режим "Открыто"', () => {
                decorate.page.device.handler({
                    name: data.device.name,
                    ip: data.device.ip,
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.button.handlerNoStatus({
                    name: 'Установить режим работы "Открыто"',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
            });

            describe('Проверка', () => {
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.page.device.deviceGetStatusLock({
                    name: data.device.name,
                    ip: data.device.ip,
                    value: 'Открыто',
                    timeout: entry.max
                });
            });
        }

        if(type === 'device') {
            befDevice();
            aft();

            describe('Установить режим "Открыто"', () => {
                decorate.page.device.handler({
                    name: data.device.name,
                    ip: data.device.ip,
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.button.handlerNoStatus({
                    name: 'Установить режим работы "Открыто"',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
            });

            describe('Проверка', () => {
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.page.device.deviceGetStatusLock({
                    name: data.device.name,
                    ip: data.device.ip,
                    value: 'Открыто',
                    timeout: entry.max
                });
            });
        }
    });

    const modeControl = () => describe(text + 'Проверка "Установить режим "Контроль"".', () => {
        if(type === 'room') {
            befRoom();
            aft();

            describe('Установить режим "Контроль"', () => {
                decorate.page.device.handler({
                    name: data.device.name,
                    ip: data.device.ip,
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.button.handlerNoStatus({
                    name: 'Установить режим работы "Контроль"',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
            });

            describe('Проверка', () => {
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.page.device.deviceGetStatusLock({
                    name: data.device.name,
                    ip: data.device.ip,
                    value: 'Контроль',
                    timeout: entry.max
                });
            });
        }

        if(type === 'device') {
            befDevice();
            aft();

            describe('Установить режим "Контроль"', () => {
                decorate.page.device.handler({
                    name: data.device.name,
                    ip: data.device.ip,
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.button.handlerNoStatus({
                    name: 'Установить режим работы "Контроль"',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
            });

            describe('Проверка', () => {
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.page.device.deviceGetStatusLock({
                    name: data.device.name,
                    ip: data.device.ip,
                    value: 'Контроль',
                    timeout: entry.max
                });
            });
        }
    });

    const modeClose = () => describe(text + 'Проверка "Установить режим "Закрыто"".', () => {
        if(type === 'room') {
            befRoom();
            aft();

            describe('Установить режим "Закрыто"', () => {
                decorate.page.device.handler({
                    name: data.device.name,
                    ip: data.device.ip,
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.button.handlerNoStatus({
                    name: 'Установить режим работы "Закрыто"',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
            });

            describe('Проверка', () => {
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.page.device.deviceGetStatusLock({
                    name: data.device.name,
                    ip: data.device.ip,
                    value: 'Закрыто',
                    timeout: entry.max
                });
            });
        }

        if(type === 'device') {
            befDevice();
            aft();

            describe('Установить режим "Закрыто"', () => {
                decorate.page.device.handler({
                    name: data.device.name,
                    ip: data.device.ip,
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.button.handlerNoStatus({
                    name: 'Установить режим работы "Закрыто"',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
            });

            describe('Проверка', () => {
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.page.device.deviceGetStatusLock({
                    name: data.device.name,
                    ip: data.device.ip,
                    value: 'Закрыто',
                    timeout: entry.max
                });
            });
        }
    });

    const IUOpen = () => describe(text + 'Проверка "Открыть (разблокировать) ИУ".', () => {
        if(type === 'room') {
            befRoom();
            aft();

            describe('Открыть (разблокировать) ИУ', () => {
                decorate.page.device.handler({
                    name: data.device.name,
                    ip: data.device.ip,
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.button.handler({
                    name: 'Открыть (разблокировать) ИУ',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.modal.paramCommand.init({
                    timeout: entry.max
                });
                decorate.modal.paramCommand.inputBackSpace({
                    title: '',
                    placeholder: '',
                    timeout: entry.max
                });
                decorate.modal.paramCommand.inputSendKeys({
                    title: '',
                    placeholder: '',
                    value: 10,
                    timeout: entry.max
                });
                decorate.el.button.handler({
                    name: 'Отправить',
                    timeout: entry.max
                });
                decorate.modal.paramCommand.initClose({
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });

            });

            describe('Проверка', () => {
                decorate.page.device.deviceGetStatusIU({
                    name: data.device.name,
                    ip: data.device.ip,
                    value: 'Разблокирован',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: 15000,
                });
                decorate.page.device.deviceGetStatusIU({
                    name: data.device.name,
                    ip: data.device.ip,
                    value: 'Заблокирован',
                    timeout: entry.max
                });
            });
        }

        if(type === 'device') {
            befDevice();
            aft();

            describe('Открыть (разблокировать) ИУ', () => {
                decorate.page.device.handler({
                    name: data.device.name,
                    ip: data.device.ip,
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.button.handler({
                    name: 'Открыть (разблокировать) ИУ',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.modal.paramCommand.init({
                    timeout: entry.max
                });
                decorate.modal.paramCommand.inputBackSpace({
                    title: '',
                    placeholder: '',
                    timeout: entry.max
                });
                decorate.modal.paramCommand.inputSendKeys({
                    title: '',
                    placeholder: '',
                    value: 10,
                    timeout: entry.max
                });
                decorate.el.button.handler({
                    name: 'Отправить',
                    timeout: entry.max
                });
                decorate.modal.paramCommand.initClose({
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });

            });

            describe('Проверка', () => {
                decorate.page.device.deviceGetStatusIU({
                    name: data.device.name,
                    ip: data.device.ip,
                    value: 'Разблокирован',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: 15000,
                });
                decorate.page.device.deviceGetStatusIU({
                    name: data.device.name,
                    ip: data.device.ip,
                    value: 'Заблокирован',
                    timeout: entry.max
                });
            });
        }
    });

    const IUClose = () => describe(text + 'Проверка "Закрыть (заблокировать) ИУ".', () => {
        if(type === 'room') {
            befRoom();
            aft();

            describe('Открыть (разблокировать) ИУ', () => {
                decorate.page.device.handler({
                    name: data.device.name,
                    ip: data.device.ip,
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.button.handler({
                    name: 'Открыть (разблокировать) ИУ',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.modal.paramCommand.init({
                    timeout: entry.max
                });
                decorate.el.button.handler({
                    name: 'Отправить',
                    timeout: entry.max
                });
                decorate.modal.paramCommand.initClose({
                    timeout: entry.max
                });
                decorate.el.button.handler({
                    name: 'Закрыть (заблокировать) ИУ',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
            });

            describe('Проверка', () => {
                decorate.page.device.deviceGetStatusIU({
                    name: data.device.name,
                    ip: data.device.ip,
                    value: 'Заблокирован',
                    timeout: entry.max
                });
            });
        }

        if(type === 'device') {
            befDevice();
            aft();

            describe('Открыть (разблокировать) ИУ', () => {
                decorate.page.device.handler({
                    name: data.device.name,
                    ip: data.device.ip,
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.button.handler({
                    name: 'Открыть (разблокировать) ИУ',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.modal.paramCommand.init({
                    timeout: entry.max
                });
                decorate.el.button.handler({
                    name: 'Отправить',
                    timeout: entry.max
                });
                decorate.modal.paramCommand.initClose({
                    timeout: entry.max
                });
                decorate.el.button.handler({
                    name: 'Закрыть (заблокировать) ИУ',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
            });

            describe('Проверка', () => {
                decorate.page.device.deviceGetStatusIU({
                    name: data.device.name,
                    ip: data.device.ip,
                    value: 'Заблокирован',
                    timeout: entry.max
                });
            });
        }
    });

    const addSecurity = () => describe(text + 'Проверка "Поставить на охрану".', () => {
        if(type === 'room') {
            befRoom();
            aft();

            describe('Поставить на охрану', () => {
                decorate.page.device.handler({
                    name: data.device.name,
                    ip: data.device.ip,
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.button.handler({
                    name: 'Поставить на охрану',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
            });

            describe('Проверка', () => {
                decorate.page.device.deviceGetStatusLock({
                    name: data.device.name,
                    ip: data.device.ip,
                    value: 'Охрана',
                    timeout: entry.max
                });
            });
        }

        if(type === 'device') {
            befDevice();
            aft();

            describe('Поставить на охрану', () => {
                decorate.page.device.handler({
                    name: data.device.name,
                    ip: data.device.ip,
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.button.handler({
                    name: 'Поставить на охрану',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
            });

            describe('Проверка', () => {
                decorate.page.device.deviceGetStatusLock({
                    name: data.device.name,
                    ip: data.device.ip,
                    value: 'Охрана',
                    timeout: entry.max
                });
            });
        }
    });

    const removeSecurity = () => describe(text + 'Проверка "Снять с охраны".', () => {
        if(type === 'room') {
            befRoom();
            aft();

            describe('Снять с охраны', () => {
                decorate.page.device.handler({
                    name: data.device.name,
                    ip: data.device.ip,
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.button.handler({
                    name: 'Снять с охраны',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
            });

            describe('Проверка', () => {
                decorate.page.device.deviceGetStatusLock({
                    name: data.device.name,
                    ip: data.device.ip,
                    value: 'Контроль',
                    timeout: entry.max
                });
            });
        }

        if(type === 'device') {
            befDevice();
            aft();

            describe('Снять с охраны', () => {
                decorate.page.device.handler({
                    name: data.device.name,
                    ip: data.device.ip,
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.button.handler({
                    name: 'Снять с охраны',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
            });

            describe('Проверка', () => {
                decorate.page.device.deviceGetStatusLock({
                    name: data.device.name,
                    ip: data.device.ip,
                    value: 'Контроль',
                    timeout: entry.max
                });
            });
        }
    });

    const removeAlarm = () => describe(text + 'Проверка "Снять тревогу"', () => {
        if(type === 'room') {
            describe('Снять тревогу', () => {
                befRoom();
                aft();
                decorate.page.device.handler({
                    name: data.device.name,
                    ip: data.device.ip,
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.button.handler({
                    name: 'Снять тревогу',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
            });

            describe('Проверка', () => {
                befRoom();
                aft();
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.page.device.deviceNoStatusAlarm({
                    name: data.device.name,
                    ip: data.device.ip,
                    timeout: entry.max
                });
            });
        }

        if(type === 'device') {
            describe('Снять тревогу', () => {
                befDevice();
                aft();
                decorate.page.device.handler({
                    name: data.device.name,
                    ip: data.device.ip,
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.button.handler({
                    name: 'Снять тревогу',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
            });

            describe('Проверка', () => {
                befDevice();
                aft();
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.page.device.deviceNoStatusAlarm({
                    name: data.device.name,
                    ip: data.device.ip,
                    timeout: entry.max
                });
            });
        }
    });

    const normalize = () => describe(text + 'Проверка "Нормализовать".', () => {
        if(type === 'room') {
            befRoom();
            aft();

            describe('Нормализовать', () => {
                db.truncateEvent();
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.page.device.handler({
                    name: data.device.name,
                    ip: data.device.ip,
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.button.handler({
                    name: 'Активизировать',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.modal.paramCommand.init({
                    timeout: entry.max
                });
                decorate.modal.paramCommand.inputBackSpace({
                    title: '',
                    placeholder: '',
                    timeout: entry.max
                });
                decorate.modal.paramCommand.inputSendKeys({
                    title: '',
                    placeholder: '',
                    value: 20,
                    timeout: entry.max
                });
                decorate.el.button.handler({
                    name: 'Отправить',
                    timeout: entry.max
                });
                decorate.modal.paramCommand.initClose({
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.button.handler({
                    name: 'Нормализовать',
                    timeout: entry.max
                });
            });

            describe('Проверка', () => {
                decorate.el.section.handler({
                    section: sec.adm,
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.subsection.handler({
                    subsection: sub.adm.event,
                    timeout: entry.max
                });
                decorate.init.event();
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Дата события',
                    strNumber: 1,
                    cellNumber: 2,
                    value: 'Нормализация выхода',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Дата события',
                    strNumber: 2,
                    cellNumber: 2,
                    value: 'Активизация выхода',
                    timeout: entry.max
                });
            });
        }

        if(type === 'device') {
            befDevice();
            aft();

            describe('Нормализовать', () => {
                db.truncateEvent();
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.page.device.handler({
                    name: data.device.name,
                    ip: data.device.ip,
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.button.handler({
                    name: 'Активизировать',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.modal.paramCommand.init({
                    timeout: entry.max
                });
                decorate.modal.paramCommand.inputBackSpace({
                    title: '',
                    placeholder: '',
                    timeout: entry.max
                });
                decorate.modal.paramCommand.inputSendKeys({
                    title: '',
                    placeholder: '',
                    value: 20,
                    timeout: entry.max
                });
                decorate.el.button.handler({
                    name: 'Отправить',
                    timeout: entry.max
                });
                decorate.modal.paramCommand.initClose({
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.button.handler({
                    name: 'Нормализовать',
                    timeout: entry.max
                });
            });

            describe('Проверка', () => {
                decorate.el.section.handler({
                    section: sec.adm,
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.subsection.handler({
                    subsection: sub.adm.event,
                    timeout: entry.max
                });
                decorate.init.event();
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Дата события',
                    strNumber: 1,
                    cellNumber: 2,
                    value: 'Нормализация выхода',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Дата события',
                    strNumber: 2,
                    cellNumber: 2,
                    value: 'Активизация выхода',
                    timeout: entry.max
                });
            });
        }
    });

    const activate = () => describe(text + 'Проверка "Активизировать".', () => {
        if(type === 'room') {
            befRoom();
            aft();

            describe('Активизировать', () => {
                db.truncateEvent();
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.page.device.handler({
                    name: data.device.name,
                    ip: data.device.ip,
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.button.handler({
                    name: 'Активизировать',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.modal.paramCommand.init({
                    timeout: entry.max
                });
                decorate.modal.paramCommand.inputBackSpace({
                    title: '',
                    placeholder: '',
                    timeout: entry.max
                });
                decorate.modal.paramCommand.inputSendKeys({
                    title: '',
                    placeholder: '',
                    value: 20,
                    timeout: entry.max
                });
                decorate.el.button.handler({
                    name: 'Отправить',
                    timeout: entry.max
                });
                decorate.modal.paramCommand.initClose({
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
            });

            describe('Проверка', () => {
                decorate.el.section.handler({
                    section: sec.adm,
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.subsection.handler({
                    subsection: sub.adm.event,
                    timeout: entry.max
                });
                decorate.init.event();
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Событие12',
                    strNumber: 1,
                    cellNumber: 2,
                    value: 'Активизация выхода',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: 15000
                });
                decorate.el.butIcBefore.handler({
                    icon: but.action_autorenew,
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Событие',
                    strNumber: 1,
                    cellNumber: 2,
                    value: 'Нормализация выхода',
                    timeout: entry.max
                });
            });
        }

        if(type === 'device') {
            befDevice();
            aft();

            describe('Активизировать', () => {
                db.truncateEvent();
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.page.device.handler({
                    name: data.device.name,
                    ip: data.device.ip,
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.button.handler({
                    name: 'Активизировать',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.modal.paramCommand.init({
                    timeout: entry.max
                });
                decorate.modal.paramCommand.inputBackSpace({
                    title: '',
                    placeholder: '',
                    timeout: entry.max
                });
                decorate.modal.paramCommand.inputSendKeys({
                    title: '',
                    placeholder: '',
                    value: 20,
                    timeout: entry.max
                });
                decorate.el.button.handler({
                    name: 'Отправить',
                    timeout: entry.max
                });
                decorate.modal.paramCommand.initClose({
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
            });

            describe('Проверка', () => {
                decorate.el.section.handler({
                    section: sec.adm,
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.subsection.handler({
                    subsection: sub.adm.event,
                    timeout: entry.max
                });
                decorate.init.event();
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Событие12',
                    strNumber: 1,
                    cellNumber: 2,
                    value: 'Активизация выхода',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: 15000
                });
                decorate.el.butIcBefore.handler({
                    icon: but.action_autorenew,
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Событие',
                    strNumber: 1,
                    cellNumber: 2,
                    value: 'Нормализация выхода',
                    timeout: entry.max
                });
            });
        }
    });

    const displayZone = () => describe(text + 'Проверка отображения "Сбросить зональность".', () => {
        if(type === 'room') {
            befRoom();
            aft();
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
            decorate.page.device.handler({
                name: data.device.name,
                ip: data.device.ip,
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
            decorate.el.button.button({
                name: 'Сбросить зональность',
                timeout: entry.max
            });

        }

        if(type === 'device') {
            befDevice();
            aft();
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
            decorate.page.device.handler({
                name: data.device.name,
                ip: data.device.ip,
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
            decorate.el.button.button({
                name: 'Сбросить зональность',
                timeout: entry.max
            });
        }
    });

    const searchIP = () => describe(text + 'Проверка фильтра поиска "IP адрес".', () => {
        if(type === 'room') {
            befRoom();
            aft();

            describe('Проверка до применения фильтра', () => {
                decorate.page.room.room({
                    arr: [data.rooms.room1],
                    timeout: entry.max
                });
                decorate.page.room.device({
                    arr: [data.rooms.room1, data.device.name, data.device.ip],
                    timeout: entry.max
                });
                decorate.page.room.room({
                    arr: [data.rooms.room1, data.rooms.room2],
                    timeout: entry.max
                });
                decorate.page.room.device({
                    arr: [data.rooms.room1, data.rooms.room2, data.camera.name, data.camera.ip],
                    timeout: entry.max
                });
            });

            describe(`Ввод ${data.device.ip} в IP адрес`, () => {
                decorate.el.element.textHandler({
                    name: 'Найти',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.input.sendKeys({
                    title: 'IP адрес',
                    placeholder: 'IP адрес',
                    value: data.device.ip,
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.page.base.animation();
            });

            describe('Проверка после применения фильтра', () => {
                decorate.page.room.room({
                    arr: [data.rooms.room1],
                    timeout: entry.max
                });
                decorate.page.room.device({
                    arr: [data.rooms.room1, data.device.name, data.device.ip],
                    timeout: entry.max
                });
                decorate.page.room.noRoom({
                    arr: [data.rooms.room1, data.rooms.room2],
                    timeout: entry.max
                });
                decorate.page.room.noDevice({
                    arr: [data.rooms.room1, data.rooms.room2, data.camera.name, data.camera.ip],
                    timeout: entry.max
                });
            });

            describe(`Удаление ${data.device.ip} из IP адрес`, () => {
                decorate.el.input.backSpace({
                    title: 'IP адрес',
                    placeholder: 'IP адрес',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.page.base.animation();
            });

            describe('Проверка после удаления фильтра', () => {
                decorate.page.room.room({
                    arr: [data.rooms.room1],
                    timeout: entry.max
                });
                decorate.page.room.device({
                    arr: [data.rooms.room1, data.device.name, data.device.ip],
                    timeout: entry.max
                });
                decorate.page.room.room({
                    arr: [data.rooms.room1, data.rooms.room2],
                    timeout: entry.max
                });
                decorate.page.room.device({
                    arr: [data.rooms.room1, data.rooms.room2, data.camera.name, data.camera.ip],
                    timeout: entry.max
                });
            });
        }

        if(type === 'device') {
            befDevice();
            aft();

            describe('Проверка до применения фильтра', () => {
                decorate.page.device.device({
                    name: data.device.name,
                    ip: data.device.ip,
                    timeout: entry.max
                });
                decorate.page.device.device({
                    name: data.camera.name,
                    ip: data.camera.ip,
                    timeout: entry.max
                });
            });

            describe(`Ввод ${data.device.ip} в IP адрес`, () => {
                decorate.el.element.textHandler({
                    name: 'Найти',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.input.sendKeys({
                    title: 'IP адрес',
                    placeholder: 'IP адрес',
                    value: data.device.ip,
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.page.base.animation();
            });

            describe('Проверка после применения фильтра', () => {
                decorate.page.device.device({
                    name: data.device.name,
                    ip: data.device.ip,
                    timeout: entry.max
                });
                decorate.page.device.noDevice({
                    name: data.camera.name,
                    ip: data.camera.ip,
                    timeout: entry.max
                });
            });

            describe(`Удаление ${data.device.ip} из IP адрес`, () => {
                decorate.el.input.backSpace({
                    title: 'IP адрес',
                    placeholder: 'IP адрес',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.page.base.animation();
            });

            describe('Проверка после удаления фильтра', () => {
                decorate.page.device.device({
                    name: data.device.name,
                    ip: data.device.ip,
                    timeout: entry.max
                });
                decorate.page.device.device({
                    name: data.camera.name,
                    ip: data.camera.ip,
                    timeout: entry.max
                });
            });
        }
    });

    const searchName = () => describe(text + 'Проверка фильтра поиска "Название".', () => {
        if(type === 'room') {
            befRoom();
            aft();

            describe('Проверка до применения фильтра', () => {
                decorate.page.room.room({
                    arr: [data.rooms.room1],
                    timeout: entry.max
                });
                decorate.page.room.device({
                    arr: [data.rooms.room1, data.device.name, data.device.ip],
                    timeout: entry.max
                });
                decorate.page.room.room({
                    arr: [data.rooms.room1, data.rooms.room2],
                    timeout: entry.max
                });
                decorate.page.room.device({
                    arr: [data.rooms.room1, data.rooms.room2, data.camera.name, data.camera.ip],
                    timeout: entry.max
                });
            });

            describe(`Ввод ${data.rooms.room2} в Название`, () => {
                decorate.el.element.textHandler({
                    name: 'Найти',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.input.sendKeys({
                    title: 'Название',
                    placeholder: 'Название',
                    value: data.rooms.room2,
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.page.base.animation();
            });

            describe('Проверка после применения фильтра', () => {
                decorate.page.room.room({
                    arr: [data.rooms.room1],
                    timeout: entry.max
                });
                decorate.page.room.noDevice({
                    arr: [data.rooms.room1, data.device.name, data.device.ip],
                    timeout: entry.max
                });
                decorate.page.room.room({
                    arr: [data.rooms.room1, data.rooms.room2],
                    timeout: entry.max
                });
                decorate.page.room.noDevice({
                    arr: [data.rooms.room1, data.rooms.room2, data.camera.name, data.camera.ip],
                    timeout: entry.max
                });
            });

            describe(`Удаление ${data.rooms.room2} из Название`, () => {
                decorate.el.input.backSpace({
                    title: 'Название',
                    placeholder: 'Название',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.page.base.animation();
            });

            describe('Проверка после удаления фильтра', () => {
                decorate.page.room.room({
                    arr: [data.rooms.room1],
                    timeout: entry.max
                });
                decorate.page.room.device({
                    arr: [data.rooms.room1, data.device.name, data.device.ip],
                    timeout: entry.max
                });
                decorate.page.room.room({
                    arr: [data.rooms.room1, data.rooms.room2],
                    timeout: entry.max
                });
                decorate.page.room.device({
                    arr: [data.rooms.room1, data.rooms.room2, data.camera.name, data.camera.ip],
                    timeout: entry.max
                });
            });
        }

        if(type === 'device') {
            befDevice();
            aft();

            describe('Проверка до применения фильтра', () => {
                decorate.page.device.device({
                    name: data.device.name,
                    ip: data.device.ip,
                    timeout: entry.max
                });
                decorate.page.device.device({
                    name: data.camera.name,
                    ip: data.camera.ip,
                    timeout: entry.max
                });
            });

            describe(`Ввод ${data.camera.name} в Название`, () => {
                decorate.el.element.textHandler({
                    name: 'Найти',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.input.sendKeys({
                    title: 'Название',
                    placeholder: 'Название',
                    value: data.camera.name,
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.page.base.animation();
            });

            describe('Проверка после применения фильтра', () => {
                decorate.page.device.noDevice({
                    name: data.device.name,
                    ip: data.device.ip,
                    timeout: entry.max
                });
                decorate.page.device.device({
                    name: data.camera.name,
                    ip: data.camera.ip,
                    timeout: entry.max
                });
            });

            describe(`Удаление ${data.camera.name} из Название`, () => {
                decorate.el.input.backSpace({
                    title: 'Название',
                    placeholder: 'Название',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.page.base.animation();
            });

            describe('Проверка после удаления фильтра', () => {
                decorate.page.device.device({
                    name: data.device.name,
                    ip: data.device.ip,
                    timeout: entry.max
                });
                decorate.page.device.device({
                    name: data.camera.name,
                    ip: data.camera.ip,
                    timeout: entry.max
                });;
            });
        }
    });

    const searchType = () => describe(text + 'Проверка фильтра поиска "Тип".', () => {
        if(type === 'room') {
            befRoom();
            aft();

            describe('Проверка до применения фильтра', () => {
                decorate.el.element.textHandler({
                    name: 'Найти',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.select.select({
                    title: 'Тип',
                    value: 'Любой тип',
                    timeout: entry.max
                });
                decorate.page.room.room({
                    arr: [data.rooms.room1],
                    timeout: entry.max
                });
                decorate.page.room.device({
                    arr: [data.rooms.room1, data.device.name, data.device.ip],
                    timeout: entry.max
                });
                decorate.page.room.room({
                    arr: [data.rooms.room1, data.rooms.room2],
                    timeout: entry.max
                });
                decorate.page.room.device({
                    arr: [data.rooms.room1, data.rooms.room2, data.camera.name, data.camera.ip],
                    timeout: entry.max
                });
            });

            describe('Выбор значения "Устройства" в поле выбора "Тип"', () => {
                decorate.el.select.iconXpand({
                    title: 'Тип',
                    value: 'Любой тип',
                    text: 'Устройства',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.page.base.animation();
            });

            describe('Проверка после применения фильтра "Устройства" в поле выбора "Тип"', () => {
                decorate.page.room.room({
                    arr: [data.rooms.room1],
                    timeout: entry.max
                });
                decorate.page.room.device({
                    arr: [data.rooms.room1, data.device.name, data.device.ip],
                    timeout: entry.max
                });
                decorate.page.room.noRoom({
                    arr: [data.rooms.room1, data.rooms.room2],
                    timeout: entry.max
                });
                decorate.page.room.noDevice({
                    arr: [data.rooms.room1, data.rooms.room2, data.camera.name, data.camera.ip],
                    timeout: entry.max
                });
            });

            describe('Выбор значения "Видеокамеры" в поле выбора "Тип"', () => {
                decorate.el.select.iconXpand({
                    title: 'Тип',
                    value: 'Устройства',
                    text: 'Видеокамеры',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.page.base.animation();

            });

            describe('Проверка после применения фильтра "Видеокамеры" в поле выбора "Тип"', () => {
                decorate.page.room.room({
                    arr: [data.rooms.room1],
                    timeout: entry.max
                });
                decorate.page.room.noDevice({
                    arr: [data.rooms.room1, data.device.name, data.device.ip],
                    timeout: entry.max
                });
                decorate.page.room.room({
                    arr: [data.rooms.room1, data.rooms.room2],
                    timeout: entry.max
                });
                decorate.page.room.device({
                    arr: [data.rooms.room1, data.rooms.room2, data.camera.name, data.camera.ip],
                    timeout: entry.max
                });
            });

            describe('Выбор значения "Шлюзы" в поле выбора "Тип"', () => {
                decorate.el.select.iconXpand({
                    title: 'Тип',
                    value: 'Видеокамеры',
                    text: 'Шлюзы',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.page.base.animation();

            });

            describe('Проверка после применения фильтра "Шлюзы" в поле выбора "Тип"', () => {
                decorate.page.room.noRoom({
                    arr: [data.rooms.room1],
                    timeout: entry.max
                });
                decorate.page.room.noDevice({
                    arr: [data.rooms.room1, data.device.name, data.device.ip],
                    timeout: entry.max
                });
                decorate.page.room.noRoom({
                    arr: [data.rooms.room1, data.rooms.room2],
                    timeout: entry.max
                });
                decorate.page.room.noDevice({
                    arr: [data.rooms.room1, data.rooms.room2, data.camera.name, data.camera.ip],
                    timeout: entry.max
                });
            });

            describe('Выбор значения "Любой тип" в поле выбора "Тип"', () => {
                decorate.el.select.iconXpand({
                    title: 'Тип',
                    value: 'Шлюзы',
                    text: 'Любой тип',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.page.base.animation();

            });

            describe('Проверка после применения фильтра "Любой тип" в поле выбора "Тип"', () => {
                decorate.page.room.room({
                    arr: [data.rooms.room1],
                    timeout: entry.max
                });
                decorate.page.room.device({
                    arr: [data.rooms.room1, data.device.name, data.device.ip],
                    timeout: entry.max
                });
                decorate.page.room.room({
                    arr: [data.rooms.room1, data.rooms.room2],
                    timeout: entry.max
                });
                decorate.page.room.device({
                    arr: [data.rooms.room1, data.rooms.room2, data.camera.name, data.camera.ip],
                    timeout: entry.max
                });
            });
        }

        if(type === 'device') {
            befDevice();
            aft();

            describe('Проверка до применения фильтра', () => {
                decorate.el.element.textHandler({
                    name: 'Найти',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.select.select({
                    title: 'Тип',
                    value: 'Любой тип',
                    timeout: entry.max
                });
                decorate.page.device.device({
                    name: data.device.name,
                    ip: data.device.ip,
                    timeout: entry.max
                });
                decorate.page.device.device({
                    name: data.camera.name,
                    ip: data.camera.ip,
                    timeout: entry.max
                });
            });

            describe('Выбор значения "Устройства" в поле выбора "Тип"', () => {
                decorate.el.select.iconXpand({
                    title: 'Тип',
                    value: 'Любой тип',
                    text: 'Устройства',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.page.base.animation();
            });

            describe('Проверка после применения фильтра "Устройства" в поле выбора "Тип"', () => {
                decorate.page.device.device({
                    name: data.device.name,
                    ip: data.device.ip,
                    timeout: entry.max
                });
                decorate.page.device.noDevice({
                    name: data.camera.name,
                    ip: data.camera.ip,
                    timeout: entry.max
                });
            });

            describe('Выбор значения "Видеокамеры" в поле выбора "Тип"', () => {
                decorate.el.select.iconXpand({
                    title: 'Тип',
                    value: 'Устройства',
                    text: 'Видеокамеры',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.page.base.animation();

            });

            describe('Проверка после применения фильтра "Видеокамеры" в поле выбора "Тип"', () => {
                decorate.page.device.noDevice({
                    name: data.device.name,
                    ip: data.device.ip,
                    timeout: entry.max
                });
                decorate.page.device.device({
                    name: data.camera.name,
                    ip: data.camera.ip,
                    timeout: entry.max
                });
            });

            describe('Выбор значения "Шлюзы" в поле выбора "Тип"', () => {
                decorate.el.select.iconXpand({
                    title: 'Тип',
                    value: 'Видеокамеры',
                    text: 'Шлюзы',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.page.base.animation();

            });

            describe('Проверка после применения фильтра "Шлюзы" в поле выбора "Тип"', () => {
                decorate.page.device.noDevice({
                    name: data.device.name,
                    ip: data.device.ip,
                    timeout: entry.max
                });
                decorate.page.device.noDevice({
                    name: data.camera.name,
                    ip: data.camera.ip,
                    timeout: entry.max
                });
            });

            describe('Выбор значения "Любой тип" в поле выбора "Тип"', () => {
                decorate.el.select.iconXpand({
                    title: 'Тип',
                    value: 'Шлюзы',
                    text: 'Любой тип',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.page.base.animation();

            });

            describe('Проверка после применения фильтра "Любой тип" в поле выбора "Тип"', () => {
                decorate.page.device.device({
                    name: data.device.name,
                    ip: data.device.ip,
                    timeout: entry.max
                });
                decorate.page.device.device({
                    name: data.camera.name,
                    ip: data.camera.ip,
                    timeout: entry.max
                });
            });
        }
    });

    return  {
        display,
        resetAlarm,
        giveAlarm,
        modeOpen,
        modeControl,
        modeClose,
        IUOpen,
        IUClose,
        addSecurity,
        removeSecurity,
        removeAlarm,
        normalize,
        activate,
        displayZone,
        searchIP,
        searchName,
        searchType,
    }
}

module.exports = {
    otherRoom: other('room', 'Контроль доступа / Управление устройствами - вкладка "Помещения". '),
    otherDevice: other('device', 'Контроль доступа / Управление устройствами - вкладка "Устройства". '),
    addDevice: () => configuration.addDeviceIP({ip: entry.device_ip_2}),
    addCamera: () => configuration.addCamera({...data.camera}),
    activateDevice: () => configuration.activateDevice({ip: entry.device_ip_2, name: entry.device_name_2}),
    deleteDevice: () => configuration.deleteDevice({ip: data.device.ip, name: data.device.name}),
    deleteCamera: () => configuration.deleteDevice({ip: data.camera.ip, name: data.camera.name}),
}