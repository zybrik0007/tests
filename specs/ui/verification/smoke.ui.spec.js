const {describe, it, before, after} = require('mocha');

const entry = require('../../../entry');
const page = require('../../../ui/src/pages');
const el = require('../../../ui/src/elements');
const dec = require('../../../ui/src/dictionaries/decorate');
const sec = require('../../../ui/src/dictionaries/section');
const sub = require('../../../ui/src/dictionaries/subsection');
const but = require('../../../ui/src/dictionaries/button-icon');

console.log = function () {};

/*Смоук*/
describe('Проверка подраздела "Конфигурация" вкладка "Помещения". Добавление, редактирования, удаление.', () => {

    const params = {
        parent: 'SeleniumSmokeParentRoom',
        child:  'SeleniumSmokeChildRoom',
        copy: 'SeleniumSmokeCopyRoom',
        update:  'SeleniumSmokeUpdateRoom'
    };

    before('Вход и открытие подраздела "Конфигурация" - вкладка "Помещения', async () => {
        await dec.auth(entry.customLogin, entry.customPassword);
        await dec.simple(el.section.handler, [sec.adm, entry.max], el.section);
        await dec.simple(el.subsection.handler, [sub.adm.conf, entry.max], el.subsection);
        await dec.simple(el.tab.handler, ['Помещения', entry.max], el.tab);
        await dec.simple(page.room.init, [entry.max], page.room);
    });

    after('Выход', async () => await dec.exit());

    describe('Добавление родительского помещения', () => {
        it('Нажатие "Неконтролируемая территория"', async () => await dec.simple(page.room.rootHandler,
            [entry.max],
            page.room));

        it('Нажатие кнопки "Добавить помещение"', async () => await dec.simple(el.butIcBefore.handler,
            [but.add, entry.max],
            el.butIcBefore));

        it('Отображение модального окна "Добавить помещенние"', async () => await dec.simple(el.modal.roomAdd.init,
            [entry.max],
            el.modal.roomAdd));

        it('Ввод "Название"', async () => await dec.simple(el.input.sendKeys,
            ['Название', '', params.parent, entry.max],
            el.input));

        it('Нажатие кнопки "Сохранить"', async () => await dec.simple(el.button.handler,
            ['Сохранить', entry.max],
            el.button));

        it('Отсутствие модального окна "Добавить помещенние"', async () => await dec.simple(el.modal.roomAdd.initClose,
            [entry.max],
            el.modal.roomAdd));

        it('Отображение добавленного помещения', async () => await dec.simple(page.room.roomElement,
            [[params.parent], entry.max],
            page.room));
    });

    describe('Добавление дочернего помещения', () => {
        it('Нажатие по родительскому помещению', async () => await dec.simple(page.room.roomHandler,
            [[params.parent], entry.max],
            page.room));

        it('Нажатие кнопки "Добавить помещение"', async () => await dec.simple(el.butIcBefore.handler,
            [but.add, entry.max],
            el.butIcBefore));

        it('Отображение модального окна "Добавить помещенние"', async () => await dec.simple(el.modal.roomAdd.init,
            [entry.max],
            el.modal.roomAdd));

        it('Ввод наименования', async () => await dec.simple(el.input.sendKeys,
            ['Название', '', params.child, entry.max],
            el.input));

        it('Нажатие кнопки "Сохранить"', async () => await dec.simple(el.button.handler,
            ['Сохранить', entry.max],
            el.button));

        it('Отсутствие  модального окна "Добавить помещенние"', async () => await dec.simple(el.modal.roomAdd.initClose,
            [entry.max],
            el.modal.roomAdd));

        it('Отображение добавленного помещения', async () => await dec.simple(page.room.roomElement,
            [[params.parent, params.child], entry.max],
            page.room));
    })

    describe('Добавление второго родительского помещения', () => {
        it('Нажатие "Неконтролируемая территория"', async () => await dec.simple(page.room.rootHandler,
            [entry.max],
            page.room));

        it('Нажатие кнопки Добавить помещение', async () => await dec.simple(el.butIcBefore.handler,
            [but.add, entry.max],
            el.butIcBefore));

        it('Отображение модального окна "Добавить помещенние"', async () => await dec.simple(el.modal.roomAdd.init,
            [entry.max],
            el.modal.roomAdd));

        it('Ввод "Название"', async () => await dec.simple(el.input.sendKeys,
            ['Название', '', params.copy, entry.max],
            el.input));

        it('Нажатие кнопки "Сохранить"', async () => await dec.simple(el.button.handler,
            ['Сохранить', entry.max],
            el.button));

        it('Отсутствие модального окна "Добавить помещенние"', async () => await dec.simple(el.modal.roomAdd.initClose,
            [entry.max],
            el.modal.roomAdd));

        it('Отображение добавленного помещения', async () => await dec.simple(page.room.roomElement,
            [[params.copy], entry.max],
            page.room));
    });

    describe('Переименование второго родительского помещения', () => {
        it('Нажатие по помещению', async () => await dec.simple(page.room.roomHandler,
            [[params.copy], entry.max],
            page.room));

        it('Нажатие кнопки "Добавить помещение"', async () => await dec.simple(el.butIcBefore.handler,
            [but.edit, entry.max],
            el.butIcBefore));

        it('Отображение модального окна "Редактировать помещенние"',
            async () => await dec.simple(el.modal.roomEdit.init,
                [entry.max],
                el.modal.roomEdit));

        it('Удалить "Название"', async () => await dec.simple(el.input.clear,
            ['Название', '', entry.max],
            el.input));

        it('Ввод "Название"', async () => await dec.simple(el.input.sendKeys,
            ['Название', '', params.update, entry.max],
            el.input));

        it('Нажатие кнопки "Сохранить"', async () => await dec.simple(el.button.handler,
            ['Сохранить', entry.max],
            el.button));

        it('Отсутствие модального окна "Редактировать помещенние"',
            async () => await dec.simple(el.modal.roomEdit.initClose,
                [entry.max],
                el.modal.roomEdit));

        it('Отображение изменного помещения', async () => await dec.simple(page.room.roomElement,
            [[params.update], entry.max],
            page.room));
    });

    describe('Удаление второго родительского помещения', () => {
        it('Нажатие по помещению', async () => await dec.simple(page.room.roomHandler,
            [[params.update], entry.max],
            page.room));

        it('Нажатие кнопки "Удалить"', async () => await dec.simple(el.butIcBefore.handler,
            [but.delete, entry.max],
            el.butIcBefore));

        it('Отображение модального окна "Подтвердите действие"',
            async () => await dec.simple(el.modalConfirm.roomDelete.init,
                [entry.max],
                el.modalConfirm.roomDelete));

        it('Нажатие кнопки "Удалить"', async () => await dec.simple(el.button.handler,
            ['Удалить', entry.max],
            el.button));

        it('Отсутствие модального окна "Подтвердите действие"',
            async () => await dec.simple(el.modalConfirm.roomDelete.initClose,
                [entry.max],
                el.modalConfirm.roomDelete));

        it('Отсутсвие удаленного помещения', async () => await dec.simple(page.room.roomNoElement,
            [[params.update], entry.max],
            page.room));
    });

    describe('Очистка данных', () => {
        it('Нажатие по помещению', async () => await dec.simple(page.room.roomHandler,
            [[params.parent, params.child], entry.max],
            page.room));

        it('Нажатие кнопки "Удалить" помещение', async () => await dec.simple(el.butIcBefore.handler,
            [but.delete, entry.max],
            el.butIcBefore));

        it('Отображение модального окна "Подтвердите действие"',
            async () => await dec.simple(el.modalConfirm.roomDelete.init,
                [entry.max],
                el.modalConfirm.roomDelete));
        it('Нажатие кнопки "Удалить"', async () => await dec.simple(el.button.handler,
            ['Удалить', entry.max],
            el.button));

        it('Отсутствие модального окна "Подтвердите действие"',
            async () => await dec.simple(el.modalConfirm.roomDelete.initClose,
                [entry.max],
                el.modalConfirm.roomDelete));

        it('Отсутсвие удаленного помещения', async () => await dec.simple(page.room.roomNoElement,
            [[params.parent, params.child], entry.max],
            page.room));

        it('Нажатие по помещению', async () => await dec.simple(page.room.roomHandler,
            [[params.parent], entry.max],
            page.room));

        it('Нажатие кнопки "Удалить" помещение', async () => await dec.simple(el.butIcBefore.handler,
            [but.delete, entry.max],
            el.butIcBefore));
        it('Отображение модального окна "Подтвердите действие"',
            async () => await dec.simple(el.modalConfirm.roomDelete.init,
                [entry.max],
                el.modalConfirm.roomDelete));

        it('Нажатие кнопки "Удалить"', async () => await dec.simple(el.button.handler,
            ['Удалить', entry.max],
            el.button));

        it('Отсутствие модального окна "Подтвердите действие"',
            async () => await dec.simple(el.modalConfirm.roomDelete.initClose,
                [entry.max],
                el.modalConfirm.roomDelete));

        it('Отсутсвие удаленного помещения', async () => await dec.simple(page.room.roomNoElement,
            [[params.parent], entry.max],
            page.room));
    });

});

describe('Проверка подраздела "Конфигурация" вкладка "Устройства". Глобальный поиск, добавление, активация, деактивация, ' +
    'удаление.', () => {

    const params = {
        ip: entry.device_ip_1,
        name: entry.device_name_1
    };

    before('Вход и открытие подраздела "Конфигурация" - вкладка "Устройства', async () => {
        await dec.auth(entry.customLogin, entry.customPassword);
        await dec.simple(el.section.handler, [sec.adm, entry.max], el.section);
        await dec.simple(el.subsection.handler, [sub.adm.conf, entry.max], el.subsection);
        await dec.simple(el.tab.handler, ['Устройства', entry.max], el.tab);
        await dec.simple(page.device.init, [entry.max], page.device);
    });

    after('Выход', async () => await dec.exit());

    describe('Добавление устройства через глобальный поиск', () => {
        it('Нажатие кнопки "Поиск"', async () => await dec.simple(el.butIcBefore.handler,
            [but.search, entry.max],
            el.butIcBefore));

        it('Отображение модального окна "Поиск устройств"', async () => await dec.simple(el.modal.deviceSearch.init,
            [entry.max],
            el.modal.deviceSearch));

        it('Нажатие кнопки "Поиск всех устройств"', async () => await dec.simple(el.button.handler,
            ['Поиск всех устройств', entry.max],
            el.button));

        it('Отображение кнопки "Добавить устройства"', async () => await dec.simple(el.button.button,
            ['Добавить устройства', entry.max],
            el.button));

        it('Ввод в "Поиск" ip адреса', async () => await dec.simple(el.input.sendKeys,
            ['', 'Поиск...', params.ip, entry.max],
            el.input));

        it('Нажатие по контроллеру', async () => await dec.simple(el.modal.deviceSearch.deviceHandler,
            [params.name, params.ip, entry.max],
            el.modal.deviceSearch));

        it('Нажатие кнопки "Добавить устройства"', async () => await dec.simple(el.button.handler,
            ['Добавить устройства', entry.max],
            el.button));

        it('Отсутствие модального окна "Поиск устройств"', async () => await dec.simple(el.modal.deviceSearch.initClose,
            [entry.max],
            el.modal.deviceSearch));

        it('Отображение добавленного контроллера', async () => await dec.simple(page.device.deviceElement,
            [params.name, params.ip, false, entry.max],
            page.device));
    });

    describe('Активация устройства', () => {
        it('Нажатие по контроллеру', async () => await dec.simple(page.device.deviceHandler,
            [params.name, params.ip, false, entry.max],
            page.device));

        it('Нажатие кнопки "Активировать" контроллер', async () => await dec.simple(el.butIcBefore.handler,
            [but.unlock, entry.max],
            el.butIcBefore));

        it('Отображение модального окна "Подтвердите действие"',
            async () => await dec.simple(el.modalConfirm.deviceActivate.init,
                [entry.max],
                el.modalConfirm.deviceActivate));
        it('Нажатие кнопки "Активировать"', async () => await dec.simple(el.button.handler,
            ['Активировать', entry.max],
            el.button));

        it('Отсутствие модального окна "Подтвердите действие"',
            async () => await dec.simple(el.modalConfirm.deviceActivate.initClose,
                [entry.max],
                el.modalConfirm.deviceActivate));

        it('Отображение включенного контроллера',
            async () => await dec.simple(page.device.deviceElement,
                [params.name, params.ip, true, entry.max],
                page.device));
    });

    describe('Деактивация устройства', () => {
        it('Нажатие по контроллеру', async () => await dec.simple(page.device.deviceHandler,
            [params.name, params.ip, true, entry.max],
            page.device));

        it('Нажатие кнопки "Активировать" контроллер', async () => await dec.simple(el.butIcBefore.handler,
            [but.lock, entry.max],
            el.butIcBefore));

        it('Отображение модального окна "Подтвердите действие"',
            async () => await dec.simple(el.modalConfirm.deviceDeactivate.init,
                [entry.max],
                el.modalConfirm.deviceDeactivate));

        it('Нажатие кнопки "Активировать"', async () => await dec.simple(el.button.handler,
            ['Деактивировать', entry.max],
            el.button));

        it('Отсутствие модального окна "Подтвердите действие"',
            async () => await dec.simple(el.modalConfirm.deviceDeactivate.initClose,
                [entry.max],
                el.modalConfirm.deviceDeactivate));

        it('Отображение выключенного контроллера', async () => await dec.simple(page.device.deviceElement,
            [params.name, params.ip, false, entry.max],
            page.device));
    });

    describe('Удаление устройства', () => {
        it('Минимальное ожидание', async () => await page.base.loading(entry.min));

        it('Нажатие по контроллеру', async () => await dec.simple(page.device.deviceHandler,
            [params.name, params.ip, false, entry.max],
            page.device));

        it('Нажатие по контроллеру', async () => await dec.simple(page.device.deviceHandler,
            [params.name, params.ip, false, entry.max],
            page.device));

        it('Нажатие кнопки "Удалить" контроллер', async () => await dec.simple(el.butIcBefore.handler,
            [but.delete, entry.max],
            el.butIcBefore));

        it('Отображение модального окна "Подтвердите действие"',
            async () => await dec.simple(el.modalConfirm.deviceDelete.init,
                [entry.max],
                el.modalConfirm.deviceDelete));

        it('Нажатие кнопки "Удалить"', async () => await dec.simple(el.button.handler,
            ['Удалить', entry.max],
            el.button));

        it('Отсутствие модального окна "Подтвердите действие"',
            async () => await dec.simple(el.modalConfirm.deviceDelete.initClose,
                [entry.max],
                el.modalConfirm.deviceDelete));

        it('Отсутствие контроллера', async () => await dec.simple(page.device.deviceNoElement,
            [params.name, params.ip, false, entry.max],
            page.device));
    });

})

describe('Проверка подраздела "Конфигурация" вкладка "Устройства". Поиск по IP, добавление, активация, деактивация, ' +
    'удаление.', () => {

    const params = {
        ip: entry.device_ip_2,
        name: entry.device_name_2
    };

    before('Вход и открытие подраздела "Конфигурация" - вкладка "Устройства', async () => {
        await dec.auth(entry.customLogin, entry.customPassword);
        await dec.simple(el.section.handler, [sec.adm, entry.max], el.section);
        await dec.simple(el.subsection.handler, [sub.adm.conf, entry.max], el.subsection);
        await dec.simple(el.tab.handler, ['Устройства', entry.max], el.tab);
        await dec.simple(page.device.init, [entry.max], page.device);
    });

    after('Выход', async () => await dec.exit());

    describe('Добавление устройства через IP поиск', () => {
        it('Нажатие кнопки "Поиск"', async () => await dec.simple(el.butIcBefore.handler,
            [but.search, entry.max],
            el.butIcBefore));

        it('Отображение модального окна "Поиск устройств"', async () => await dec.simple(el.modal.deviceSearch.init,
            [entry.max],
            el.modal.deviceSearch));

        it('Ввод "IP адрес"', async () => await dec.simple(el.input.sendKeys,
            ['IP адрес', 'Поиск конкретного устройства по IP адресу', params.ip, entry.max],
            el.input));

        it('Нажатие кнопки "Найти устройство по IP"', async () => await dec.simple(el.button.handler,
            [`Найти устройство по IP: ${params.ip}`, entry.max],
            el.button));

        it('Отображение кнопки "Добавить устройства"', async () => await dec.simple(el.button.button,
            ['Добавить устройства', entry.max],
            el.button));

        it('Нажатие по контроллеру', async () => await dec.simple(el.modal.deviceSearch.deviceHandler,
            [params.name, params.ip, entry.max],
            el.modal.deviceSearch));

        it('Нажатие кнопки "Добавить устройства"', async () => await dec.simple(el.button.handler,
            ['Добавить устройства', entry.max],
            el.button));

        it('Отсутствие модального окна "Поиск устройств"', async () => await dec.simple(el.modal.deviceSearch.initClose,
            [entry.max],
            el.modal.deviceSearch));

        it('Отображение добавленного контроллера', async () => await dec.simple(page.device.deviceElement,
            [params.name, params.ip, false, entry.max],
            page.device));
    });

    describe('Активация устройства', () => {
        it('Нажатие по контроллеру', async () => await dec.simple(page.device.deviceHandler,
            [params.name, params.ip, false, entry.max],
            page.device));

        it('Нажатие кнопки "Активировать" контроллер', async () => await dec.simple(el.butIcBefore.handler,
            [but.unlock, entry.max],
            el.butIcBefore));

        it('Отображение модального окна "Подтвердите действие"',
            async () => await dec.simple(el.modalConfirm.deviceActivate.init,
                [entry.max],
                el.modalConfirm.deviceActivate));

        it('Нажатие кнопки "Активировать"', async () => await dec.simple(el.button.handler,
            ['Активировать', entry.max],
            el.button));

        it('Отсутствие модального окна "Подтвердите действие"',
            async () => await dec.simple(el.modalConfirm.deviceActivate.initClose,
                [entry.max],
                el.modalConfirm.deviceActivate));

        it('Отображение включенного контроллера', async () => await dec.simple(page.device.deviceElement,
            [params.name, params.ip, true, entry.max],
            page.device));
    });

    describe('Деактивация устройства', () => {
        it('Нажатие по контроллеру', async () => await dec.simple(page.device.deviceHandler,
            [params.name, params.ip, true, entry.max],
            page.device));

        it('Нажатие кнопки "Активировать" контроллер', async () => await dec.simple(el.butIcBefore.handler,
            [but.lock, entry.max],
            el.butIcBefore));

        it('Отображение модального окна "Подтвердите действие"',
            async () => await dec.simple(el.modalConfirm.deviceDeactivate.init,
                [entry.max],
                el.modalConfirm.deviceDeactivate));

        it('Нажатие кнопки "Деактивировать"', async () => await dec.simple(el.button.handler,
            ['Деактивировать', entry.max],
            el.button));

        it('Отсутствие модального окна "Подтвердите действие"',
            async () => await dec.simple(el.modalConfirm.deviceDeactivate.initClose,
                [entry.max],
                el.modalConfirm.deviceDeactivate));

        it('Отображение выключенного контроллера',
            async () => await dec.simple(page.device.deviceElement,
                [params.name, params.ip, false, entry.max],
                page.device));
    });

    describe('Удаление устройства', () => {
        it('Минимальное ожидание', async () => await page.base.loading(entry.min));
        it('Нажатие по контроллеру', async () => await dec.simple(page.device.deviceHandler,
            [params.name, params.ip, false, entry.max],
            page.device));

        it('Нажатие кнопки "Удалить" контроллер', async () => await dec.simple(el.butIcBefore.handler,
            [but.delete, entry.max],
            el.butIcBefore));

        it('Отображение модального окна "Подтвердите действие"',
            async () => await dec.simple(el.modalConfirm.deviceDelete.init,
                [entry.max],
                el.modalConfirm.deviceDelete));

        it('Нажатие кнопки "Удалить"', async () => await dec.simple(el.button.handler,
            ['Удалить', entry.max],
            el.button));

        it('Отсутствие модального окна "Подтвердите действие"',
            async () => await dec.simple(el.modalConfirm.deviceDelete.initClose,
                [entry.max],
                el.modalConfirm.deviceDelete));

        it('Отсутствие контроллера', async () => await dec.simple(page.device.deviceNoElement,
            [params.name, params.ip, false, entry.max],
            page.device));
    });

});

describe('Проверка подраздела "Конфигурация" вкладка "Устройства". Поиск по IP несуществующего контроллера.', () => {

    const params = {
        ip: '100.100.100.100'
    }

    before('Вход и открытие подраздела "Конфигурация" - вкладка "Устройства', async () => {
        await dec.auth(entry.customLogin, entry.customPassword);
        await dec.simple(el.section.handler, [sec.adm, entry.max], el.section);
        await dec.simple(el.subsection.handler, [sub.adm.conf, entry.max], el.subsection);
        await dec.simple(el.tab.handler, ['Устройства', entry.max], el.tab);
        await dec.simple(page.device.init, [entry.max], page.device);
    });

    after('Выход', async () => await dec.exit());

    describe('Добавление устройства через IP поиск', () => {
        it('Нажатие кнопки "Поиск"', async () => await dec.simple(el.butIcBefore.handler,
            [but.search, entry.max],
            el.butIcBefore));

        it('Отображение модального окна "Поиск устройств"', async () => await dec.simple(el.modal.deviceSearch.init,
            [entry.max],
            el.modal.deviceSearch));

        it('Ввод "IP адрес"', async () => await dec.simple(el.input.sendKeys,
            ['IP адрес', 'Поиск конкретного устройства по IP адресу', params.ip, entry.max],
            el.input));

        it('Нажатие кнопки "Найти устройство по IP"', async () => await dec.simple(el.button.handler,
            [`Найти устройство по IP: ${params.ip}`, entry.max],
            el.button));

        it('Отображение ошибки "Не удалось найти устройство"', async () => await dec.simple(el.error.error,
            ['Не удалось найти устройство', entry.max],
            el.error));

        it('Нажатие кнопки закрыть', async () => await dec.simple(el.modal.deviceSearch.closeHandler,
            [entry.max],
            el.modal.deviceSearch));

        it('Отсутствие модального окна "Поиск устройств"', async () => await dec.simple(el.modal.deviceSearch.initClose,
            [entry.max],
            el.modal.deviceSearch));
    });

});

describe('Проверка подраздела "Конфигурация" вкладка "Помещения". Добавление контроллера в помещение.', () => {

    const params = {
        parent: {
            room: 'SeleniumSmokeParentRoom',
            device: entry.device_name_1,
            ip: entry.device_ip_1
        },
        child: {
            room: 'SeleniumSmokeChildRoom',
            device: entry.device_name_2,
            ip: entry.device_ip_2
        }
    };

    before('Вход и открытие подраздела "Конфигурация" - вкладка "Помещения', async () => {
        await dec.auth(entry.customLogin, entry.customPassword);
        await dec.simple(el.section.handler, [sec.adm, entry.max], el.section);
        await dec.simple(el.subsection.handler, [sub.adm.conf, entry.max], el.subsection);
        await dec.simple(el.tab.handler, ['Помещения', entry.max], el.tab);
        await dec.simple(page.room.init, [entry.max], page.room);
    });

    after('Выход', async () => await dec.exit());

    describe('Добавление родительского помещения', () => {
        it('Нажатие "Неконтролируемая территория"', async () => await dec.simple(page.room.rootHandler,
            [entry.max],
            page.room));

        it('Нажатие кнопки "Добавить помещение"', async () => await dec.simple(el.butIcBefore.handler,
            [but.add, entry.max],
            el.butIcBefore));

        it('Отображение модального окна "Добавить помещенние"', async () => await dec.simple(el.modal.roomAdd.init,
            [entry.max],
            el.modal.roomAdd));

        it('Ввод "Название"', async () => await dec.simple(el.input.sendKeys,
            ['Название', '', params.parent.room, entry.max],
            el.input));

        it('Нажатие кнопки "Сохранить"', async () => await dec.simple(el.button.handler,
            ['Сохранить', entry.max],
            el.button));

        it('Отсутствие модального окна "Добавить помещенние"', async () => await dec.simple(el.modal.roomAdd.initClose,
            [entry.max],
            el.modal.roomAdd));

        it('Отображение добавленного помещения', async () => await dec.simple(page.room.roomElement,
            [[params.parent.room], entry.max],
            page.room));
    });

    describe('Добавление устройства через IP поиск', () => {
        it('Нажатие кнопки "Поиск"', async () => await dec.simple(el.butIcBefore.handler,
            [but.search, entry.max],
            el.butIcBefore));

        it('Отображение модального окна "Поиск устройств"', async () => await dec.simple(el.modal.deviceSearch.init,
            [entry.max],
            el.modal.deviceSearch));

        it('Ввод "IP адрес"', async () => await dec.simple(el.input.sendKeys,
            ['IP адрес', 'Поиск конкретного устройства по IP адресу', params.parent.ip, entry.max],
            el.input));

        it('Нажатие кнопки "Найти устройство по IP"', async () => await dec.simple(el.button.handler,
            [`Найти устройство по IP: ${params.parent.ip}`, entry.max],
            el.button));

        it('Отображение кнопки "Добавить устройства"', async () => await dec.simple(el.button.button,
            ['Добавить устройства', entry.max],
            el.button));

        it('Нажатие по контроллеру', async () => await dec.simple(el.modal.deviceSearch.deviceHandler,
            [params.parent.device, params.parent.ip, entry.max],
            el.modal.deviceSearch));

        it('Нажатие кнопки "Добавить устройства"', async () => await dec.simple(el.button.handler,
            ['Добавить устройства', entry.max],
            el.button));

        it('Отсутствие модального окна "Поиск устройств"', async () => await dec.simple(el.modal.deviceSearch.initClose,
            [entry.max],
            el.modal.deviceSearch));
    });

    describe('Добавление устройства в родительское помещение', () => {
        it('Нажатие по помещению', async () => await dec.simple(page.room.roomHandler,
            [[params.parent.room], entry.max],
            page.room));

        it('Нажатие кнопки "Установить устройства"', async () => await dec.simple(el.butIcBefore.handler,
            [but.device_list, entry.max],
            el.butIcBefore));

        it('Отображение модального окна "Список устройств"', async () => await dec.simple(el.modal.deviceSelect.init,
            [entry.max],
            el.modal.deviceSelect));

        it('Нажатие по контроллеру', async () => await dec.simple(el.modal.deviceSelect.deviceHandler,
            [params.parent.device, params.parent.ip, entry.max],
            el.modal.deviceSelect));

        it('Нажатие кнопки "Выбрать"', async () => await dec.simple(el.button.handler,
            ['Выбрать', entry.max],
            el.button));

        it('Отсутствие модального окна "Список устройств"',async () => await dec.simple(el.modal.deviceSelect.initClose,
            [entry.max],
            el.modal.deviceSelect));

        it('Отображение контроллера в помещении', async () => await dec.simple(page.room.deviceElement,
            [[params.parent.room], params.parent.device, params.parent.ip, false, entry.max],
            page.room));
    });

    describe('Активация устройства в родительском помещении', () => {
        it('Нажатие по контроллеру', async () => await dec.simple(page.room.deviceHandler,
            [[params.parent.room], params.parent.device, params.parent.ip, false, entry.max],
            page.room));

        it('Нажатие кнопки "Активировать" контроллер', async () => await dec.simple(el.butIcBefore.handler,
            [but.unlock, entry.max],
            el.butIcBefore));

        it('Отображение модального окна "Подтвердите действие"',
            async () => await dec.simple(el.modalConfirm.deviceActivate.init,
                [entry.max],
                el.modalConfirm.deviceActivate));

        it('Нажатие кнопки "Активировать"',async () => await dec.simple(el.button.handler,
            ['Активировать', entry.max],
            el.button));

        it('Отсутствие модального окна "Подтвердите действие"',
            async () => await dec.simple(el.modalConfirm.deviceActivate.initClose,
                [entry.max],
                el.modalConfirm.deviceActivate));

        it('Отображение включенного контроллера', async () => await dec.simple(page.room.deviceElement,
            [[params.parent.room], params.parent.device, params.parent.ip, true, entry.max],
            page.room));
    });

    describe('Добавление дочернего помещения', () => {
        it('Нажатие по родительскому помещению', async () => await dec.simple(page.room.roomHandler,
            [[params.parent.room], entry.max],
            page.room));

        it('Нажатие кнопки "Добавить помещение"', async () => await dec.simple(el.butIcBefore.handler,
            [but.add, entry.max],
            el.butIcBefore));

        it('Отображение модального окна "Добавить помещенние"', async () => await dec.simple(el.modal.roomAdd.init,
            [entry.max],
            el.modal.roomAdd));

        it('Ввод "Название"', async () => await dec.simple(el.input.sendKeys,
            ['Название', '', params.child.room, entry.max],
            el.input));

        it('Нажатие кнопки "Сохранить"', async () => await dec.simple(el.button.handler,
            ['Сохранить', entry.max],
            el.button));

        it('Отсутствие модального окна "Добавить помещенние"', async () => await dec.simple(el.modal.roomAdd.initClose,
            [entry.max],
            el.modal.roomAdd));

        it('Отображение добавленного помещения', async () => await dec.simple(page.room.roomElement,
            [[params.parent.room, params.child.room], entry.max],
            page.room));
    });

    describe('Добавление устройства через IP поиск', () => {
        it('Нажатие кнопки "Поиск"', async () => await dec.simple(el.butIcBefore.handler,
            [but.search, entry.max],
            el.butIcBefore));

        it('Отображение модального окна "Поиск устройств"', async () => await dec.simple(el.modal.deviceSearch.init,
            [entry.max],
            el.modal.deviceSearch));

        it('Ввод "IP адрес"', async () => await dec.simple(el.input.sendKeys,
            ['IP адрес', 'Поиск конкретного устройства по IP адресу', params.child.ip, entry.max],
            el.input));

        it('Нажатие кнопки "Найти устройство по IP"', async () => await dec.simple(el.button.handler,
            [`Найти устройство по IP: ${params.child.ip}`, entry.max],
            el.button));

        it('Отображение кнопки "Добавить устройства"', async () => await dec.simple(el.button.button,
            ['Добавить устройства', entry.max],
            el.button));

        it('Нажатие по контроллеру', async () => await dec.simple(el.modal.deviceSearch.deviceHandler,
            [params.child.device, params.child.ip, entry.max],
            el.modal.deviceSearch));

        it('Нажатие кнопки "Добавить устройства"', async () => await dec.simple(el.button.handler,
            ['Добавить устройства', entry.max],
            el.button));

        it('Отсутствие модального окна "Поиск устройств"', async () => await dec.simple(el.modal.deviceSearch.initClose,
            [entry.max],
            el.modal.deviceSearch));
    });

    describe('Добавление устройства в дочернее помещение', () => {
        it('Нажатие по помещению', async () => await dec.simple(page.room.roomHandler,
            [[params.parent.room, params.child.room], entry.max],
            page.room));

        it('Нажатие кнопки "Установить устройства"', async () => await dec.simple(el.butIcBefore.handler,
            [but.device_list, entry.max],
            el.butIcBefore));

        it('Отображение модального окна "Список устройств"', async () => await dec.simple(el.modal.deviceSelect.init,
            [entry.max],
            el.modal.deviceSelect));

        it('Нажатие по контроллеру', async () => await dec.simple(el.modal.deviceSelect.deviceHandler,
            [params.child.device, params.child.ip, entry.max],
            el.modal.deviceSelect));

        it('Нажатие кнопки "Выбрать"', async () => await dec.simple(el.button.handler,
            ['Выбрать', entry.max],
            el.button));

        it('Отсутствие модального окна "Список устройств"',async () => await dec.simple(el.modal.deviceSelect.initClose,
            [entry.max],
            el.modal.deviceSelect));

        it('Отображение контроллера в помещении', async () => await dec.simple(page.room.deviceElement,
            [[params.parent.room, params.child.room], params.child.device, params.child.ip, false, entry.max],
            page.room));
    });

    describe('Активация устройства в родительском помещении', () => {
        it('Нажатие по контроллеру', async () => await dec.simple(page.room.deviceHandler,
            [[params.parent.room, params.child.room], params.child.device, params.child.ip, false, entry.max],
            page.room));

        it('Нажатие кнопки "Активировать" контроллер', async () => await dec.simple(el.butIcBefore.handler,
            [but.unlock, entry.max],
            el.butIcBefore));

        it('Отображение модального окна "Подтвердите действие"',
            async () => await dec.simple(el.modalConfirm.deviceActivate.init,
                [entry.max],
                el.modalConfirm.deviceActivate));

        it('Нажатие кнопки "Активировать"', async () => await dec.simple(el.button.handler,
            ['Активировать', entry.max],
            el.button));

        it('Отсутствие модального окна "Подтвердите действие"',
            async () => await dec.simple(el.modalConfirm.deviceActivate.initClose,
                [entry.max],
                el.modalConfirm.deviceActivate));

        it('Отображение включенного контроллера', async () => await dec.simple(page.room.deviceElement,
            [[params.parent.room, params.child.room], params.child.device, params.child.ip, true, entry.max],
            page.room));
    });

});

describe('Проверка подраздела "Шаблоны доступа" вкладка "Шаблоны доступа"', () => {

    const params = {
        id: 1,
        name: 'SeleniumSmokeAccessTemplateName',
        description: 'SeleniumSmokeAccessTemplateDescription',
        one: {
            name: 'SeleniumSmokeParentRoom',
            typeCriterion: 'Временные зоны',
            criterion: 'Всегда',
            type: 'Карта',
            commission: 'Охрана',
            security: true,
            verif: true,
            antipass: true
        },
        two: {
            name: 'SeleniumSmokeChildRoom',
            typeCriterion: 'Временные зоны',
            criterion: 'Всегда',
            type: 'Карта или отпечаток',
            verifPO: 'Всегда',
            verifPDU: 'Всегда',
            verifVVU: 'Никогда',
            alc: 'Никогда',
            commission: 'Доступ',
            commissionGroupOne: '1',
            commissionGroupTwo: '8',
            verif: true,
            security: true,
            antipass: false,
            arr: {
                name: 'SeleniumSmokeChildRoom',
                typeCriterion: 'Временные зоны',
                criterion: 'Всегда',
                type: 'Карта или отпечаток',
                commission: 'Доступ',
                security: true,
                verif: true,
                antipass: false
            }
        }
    };

    before('Вход и открытие подраздела "Шаблоны доступа" вкладка "Шаблоны доступа"', async () => {
        await dec.auth(entry.customLogin, entry.customPassword);
        await dec.simple(el.section.handler, [sec.pas, entry.max], el.section);
        await dec.simple(el.subsection.handler, [sub.pas.template, entry.max], el.subsection);
        await dec.simple(el.tab.handler, ['Шаблоны доступа', entry.max], el.tab);
        await dec.simple(page.accessTemplate.init, [entry.max], page.accessTemplate);
    });

    after('Выход', async () => await dec.exit());

    describe('Добавление шиблона доступа и проверка данных', () => {

        describe('Нажатие кнопки "Добавить"', () => {
            it('Нажатие кнопки "Добавить"', async () => await dec.simple(el.butIcBefore.handler,
                [but.add, entry.max],
                el.butIcBefore));
        });

        describe('Отображение страницы добавления', () => {
            it('Отображение страницы добавления', async () => await dec.simple(page.accessTemplateChange.initAdd,
                [entry.max],
                page.accessTemplateChange));
        });

        describe('Ввод общих параметров', () => {
            it('Ввод "Имя шаблона"', async () => await dec.simple(el.input.sendKeys,
                ['Имя шаблона', '', params.name, entry.max],
                el.input));

            it('Ввод "Описание"', async () => await dec.simple(el.input.sendKeys,
                ['Описание', '', params.description, entry.max],
                el.input));
        })

        describe('Настройка родительского помещения', () => {
            it('Нажатие по помещению', async () => await dec.simple(page.accessTemplateChange.roomHandler,
                [params.one.name, entry.max],
                page.accessTemplateChange));

            it('Выбор "Тип критерия доступа"', async () => await dec.simple(el.select.iconXpand,
                ['Тип критерия доступа', 'Выберите тип', params.one.typeCriterion, entry.max],
                el.select));

            it('Выбор "Критерий доступа"', async () => {
                await dec.simple(el.selectInput.iconOutline,
                    ['Критерий доступа', 'Выберите тип', entry.max],
                    el.selectInput)

                await dec.simple(el.modal.scheduleSelect.init,
                    [entry.max],
                    el.modal.scheduleSelect);

                await dec.simple(el.modal.scheduleSelect.scheduleHandler,
                    [params.one.criterion, entry.max],
                    el.modal.scheduleSelect);

                await dec.simple(el.button.handler,
                    ['Сохранить', entry.max],
                    el.button);

                await dec.simple(el.modal.scheduleSelect.initClose,
                    [entry.max],
                    el.modal.scheduleSelect);
            });

            it('Выбор "Тип доступа"', async () => await dec.simple(el.select.iconXpand,
                ['Тип доступа', 'Выберите тип', params.one.type, entry.max],
                el.select));

            it('Выбор "Комиссионирование"', async () => await dec.simple(el.select.iconXpand,
                ['Комиссионирование', '', params.one.commission, entry.max],
                el.select));

            it('Выбор "Охрана"', async () => await dec.simple(el.checkbox.handler,
                ['Охрана', entry.max],
                el.checkbox));

            it('Выбор "Верификация"', async () => await dec.simple(el.checkbox.handler,
                ['Верификация', entry.max],
                el.checkbox));

            it('Выбор "Антипасс"', async () => await dec.simple(el.checkbox.handler,
                ['Антипасс', entry.max],
                el.checkbox));

            it('Проверка в дереве помещений', async () => await dec.simple(page.accessTemplateChange.room,
                [...Object.values(params.one), entry.max],
                page.accessTemplateChange));
        });

        describe('Настройка дочернего помещения', () => {
            it('Нажатие по помещению', async () => await dec.simple(page.accessTemplateChange.roomHandler,
                [params.two.name, entry.max],
                page.accessTemplateChange));

            it('Выбор "Тип критерия доступа"', async () => await dec.simple(el.select.iconXpand,
                ['Тип критерия доступа', 'Выберите тип', params.two.typeCriterion, entry.max],
                el.select));

            it('Выбор "Критерий доступа"', async () => {
                await dec.simple(el.selectInput.iconOutline,
                    ['Критерий доступа', 'Выберите тип', entry.max],
                    el.selectInput);

                await dec.simple(el.modal.scheduleSelect.init,
                    [entry.max],
                    el.modal.scheduleSelect);

                await dec.simple(el.modal.scheduleSelect.scheduleHandler,
                    [params.two.criterion, entry.max],
                    el.modal.scheduleSelect);

                await dec.simple(el.button.handler,
                    ['Сохранить', entry.max],
                    el.button);

                await dec.simple(el.modal.scheduleSelect.initClose,
                    [entry.max],
                    el.modal.scheduleSelect);
            });

            it('Выбор "Тип доступа"', async () => await dec.simple(el.select.iconXpand,
                ['Тип доступа', 'Выберите тип', params.two.type, entry.max],
                el.select));

            it('Выбор "Критерий верификации от ПО"', async () => {
                await dec.simple(el.selectInput.iconOutline,
                    ['Критерий верификации от ПО', 'Нет', entry.max],
                    el.selectInput);

                await dec.simple(el.modal.scheduleSelect.init,
                    [entry.max],
                    el.modal.scheduleSelect);

                await dec.simple(el.modal.scheduleSelect.scheduleHandler,
                    [params.two.verifPO, entry.max],
                    el.modal.scheduleSelect);

                await dec.simple(el.button.handler,
                    ['Сохранить', entry.max],
                    el.button);

                await dec.simple(el.modal.scheduleSelect.initClose,
                    [entry.max],
                    el.modal.scheduleSelect);
            });

            it('Выбор "Критерий верификации от ПДУ"', async () => {
                await dec.simple(el.selectInput.iconOutline,
                    ['Критерий верификации от ПДУ', 'Нет', entry.max],
                    el.selectInput);

                await dec.simple(el.modal.scheduleSelect.init,
                    [entry.max],
                    el.modal.scheduleSelect);

                await dec.simple(el.modal.scheduleSelect.scheduleHandler,
                    [params.two.verifPDU, entry.max],
                    el.modal.scheduleSelect);

                await dec.simple(el.button.handler,
                    ['Сохранить', entry.max],
                    el.button);

                await dec.simple(el.modal.scheduleSelect.initClose,
                    [entry.max],
                    el.modal.scheduleSelect);
            });
            it('Выбор "Критерий верификации от BВУ"', async () => {
                await dec.simple(el.selectInput.iconOutline,
                    ['Критерий верификации от BВУ', 'Нет', entry.max],
                    el.selectInput);

                await dec.simple(el.modal.scheduleSelect.init,
                    [entry.max],
                    el.modal.scheduleSelect);

                await dec.simple(el.modal.scheduleSelect.scheduleHandler,
                    [params.two.verifVVU, entry.max],
                    el.modal.scheduleSelect);

                await dec.simple(el.button.handler,
                    ['Сохранить', entry.max],
                    el.button);

                await dec.simple(el.modal.scheduleSelect.initClose,
                    [entry.max],
                    el.modal.scheduleSelect);
            });

            it('Выбор "Алкобарьер"', async () => {
                await dec.simple(el.selectInput.iconOutline,
                    ['Алкобарьер', 'Нет', entry.max],
                    el.selectInput);

                await dec.simple(el.modal.scheduleSelect.init,
                    [entry.max],
                    el.modal.scheduleSelect);

                await dec.simple(el.modal.scheduleSelect.scheduleHandler,
                    [params.two.alc, entry.max],
                    el.modal.scheduleSelect);

                await dec.simple(el.button.handler,
                    ['Сохранить', entry.max],
                    el.button);
                await dec.simple(el.modal.scheduleSelect.initClose,
                    [entry.max],
                    el.modal.scheduleSelect);
            });

            it('Выбор "Комиссионирование"', async () => await dec.simple(el.select.iconXpand,
                ['Комиссионирование', '', params.two.commission, entry.max],
                el.select));

            it('Выбор "Группа комиссионирования 1"', async () => await dec.simple(el.select.iconXpand,
                ['Группа комиссионирования 1', '', params.two.commissionGroupOne, entry.max],
                el.select));

            it('Выбор "Группа комиссионирования 2"', async () => await dec.simple(el.select.iconXpand,
                ['Группа комиссионирования 2', '', params.two.commissionGroupTwo, entry.max],
                el.select));

            it('Выбор "Охрана"', async () => await dec.simple(el.checkbox.handler,
                ['Охрана', entry.max],
                el.checkbox));

            it('Проверка в дереве помещений', async () => await dec.simple(page.accessTemplateChange.room,
                [...Object.values(params.two.arr), entry.max],
                page.accessTemplateChange));
        });

        describe('Проверка настроек в родительском помещении', () => {
            it('Нажатие по помещению', async () => await dec.simple(page.accessTemplateChange.roomHandler, [params.one.name, entry.max], page.accessTemplateChange))

            it('Проверка "Тип критерия доступа"', async () => await dec.simpleText(el.select.getText,
                ['Тип критерия доступа', params.one.typeCriterion, entry.max],
                params.one.typeCriterion,
                el.select));

            it('Проверка "Критерий доступа"', async () => await dec.simpleText(el.selectInput.getValue,
                ['Критерий доступа', 'Выберите тип', entry.max],
                params.one.criterion,
                el.select));

            it('Проверка "Тип доступа"', async () => await dec.simpleText(el.select.getText,
                ['Тип доступа', params.one.type, entry.max],
                params.one.type,
                el.select));

            it('Проверка "Комиссионирование"', async () => await dec.simpleText(el.select.getText,
                ['Комиссионирование', params.one.commission, entry.max],
                params.one.commission,
                el.select));

            it('Проверка "Охрана"', async () => await dec.simple(el.checkbox.checked,
                ['Охрана', entry.max],
                el.checkbox));

            it('Проверка "Верификация"', async () => await dec.simple(el.checkbox.checked,
                ['Верификация', entry.max],
                el.checkbox));

            it('Проверка "Антипасс"', async () => await dec.simple(el.checkbox.checked,
                ['Антипасс', entry.max],
                el.checkbox));

            it('Проверка в дереве помещений', async () => await dec.simple(page.accessTemplateChange.room,
                [...Object.values(params.one),
                    entry.max],
                page.accessTemplateChange));
        });

        describe('Проверка настроек в дочернем помещении', () => {
            it('Нажатие по помещению', async () => await dec.simple(page.accessTemplateChange.roomHandler,
                [params.two.name, entry.max], page.accessTemplateChange));

            it('Проверка "Тип критерия доступа"', async () => await dec.simpleText(el.select.getText,
                ['Тип критерия доступа', params.two.typeCriterion, entry.max],
                params.two.typeCriterion,
                el.select));

            it('Проверка "Критерий доступа"', async () => await dec.simpleText(el.selectInput.getValue,
                ['Критерий доступа', 'Выберите тип', entry.max],
                params.two.criterion,
                el.selectInput));

            it('Проверка "Тип доступа"', async () => await dec.simpleText(el.select.getText,
                ['Тип доступа', params.two.type, entry.max],
                params.two.type,
                el.select));

            it('Проверка "Критерий верификации от ПО"', async () => await dec.simpleText(el.selectInput.getValue,
                ['Критерий верификации от ПО', 'Нет', entry.max],
                params.two.verifPO,
                el.selectInput));

            it('Проверка "Критерий верификации от ПДУ"', async () => await dec.simpleText(el.selectInput.getValue,
                ['Критерий верификации от ПДУ', 'Нет', entry.max],
                params.two.verifPDU, el.selectInput));

            it('Проверка "Критерий верификации от BВУ"', async () => await dec.simpleText(el.selectInput.getValue,
                ['Критерий верификации от BВУ', 'Нет', entry.max],
                params.two.verifVVU,
                el.selectInput));

            it('Проверка "Алкобарьер"', async () => await dec.simpleText(el.selectInput.getValue,
                ['Алкобарьер', 'Нет', entry.max],
                params.two.alc,
                el.selectInput));

            it('Проверка "Комиссионирование"', async () =>  await dec.simpleText(el.select.getText,
                ['Комиссионирование', params.two.commission, entry.max],
                params.two.commission,
                el.select));

            it('Проверка "Группа комиссионирования 1"', async () => await dec.simpleText(el.select.getText,
                ['Группа комиссионирования 1', params.two.commissionGroupOne, entry.max],
                params.two.commissionGroupOne,
                el.select));

            it('Проверка "Группа комиссионирования 2"', async () => await dec.simpleText(el.select.getText,
                ['Группа комиссионирования 2', params.two.commissionGroupTwo, entry.max],
                params.two.commissionGroupTwo,
                el.select));

            it('Проверка "Охрана"', async () => await dec.simple(el.checkbox.checked,
                ['Охрана', entry.max],
                el.checkbox));

            it('Проверка "Антипасс"', async () => await dec.simple(el.checkbox.unchecked,
                ['Антипасс', entry.max],
                el.checkbox));

            it('Проверка в дереве помещений', async () => await dec.simple(page.accessTemplateChange.room,
                [...Object.values(params.two.arr), entry.max],
                page.accessTemplateChange));
        });

        describe('Сохранение шаблона доступа', () => {
            it('Нажатие кнопки "Сохранить изменения"', async () => await dec.simple(el.button.handler,
                ['Сохранить изменения', entry.max],
                el.button));

            it('Проверка страницы', async () => await dec.simple(page.accessTemplate.init,
                [entry.max],
                page.accessTemplate));
        });

    });

    describe('Проверка данных в таблице страницы "Шаблоны доступа"', () => {
        it('Поле "Название"', async () => await dec.simpleText(el.table.cellGetText,
            ['Название', '1', '1', entry.max],
            params.name,
            el.table));

        it('Поле "Описание"', async () => await dec.simpleText(el.table.cellGetText,
            ['Описание', '1', '2', entry.max],
            params.description,
            el.table));
    });

    describe('Открытие на редактирование шаблона доступа и проверка данных', () => {

        describe('Открытие на редактирование', () => {
            it('Нажатие по шаблону доступа', async () => await dec.simple(el.table.strHandler,
                ['1', entry.max],
                el.table));

            it('Нажатие кнопки "Редактировать"', async () => await dec.simple(el.butIcBefore.handler,
                [but.edit, entry.max],
                el.butIcBefore));

            it('Проверка страницы', async () => await dec.simple(page.accessTemplateChange.initEdit,
                [params.id, entry.max],
                page.accessTemplateChange));
        });

        describe('Проверка общих параметров', () => {
            it('Ввод "Имя шаблона"', async () => await dec.simpleText(el.input.getValue,
                ['Имя шаблона', '', entry.max],
                params.name, el.input));

            it('Ввод "Описание"', async () => await dec.simpleText(el.input.getValue,
                ['Описание', '', entry.max],
                params.description,
                el.input));
        });

        describe('Проверка настроек в родительском помещении', () => {
            it('Нажатие по помещению', async () => await dec.simple(page.accessTemplateChange.roomHandler,
                [params.one.name, entry.max],
                page.accessTemplateChange));

            it('Проверка "Тип критерия доступа"', async () => await dec.simpleText(el.select.getText,
                ['Тип критерия доступа', params.one.typeCriterion, entry.max],
                params.one.typeCriterion,
                el.select));

            it('Проверка "Критерий доступа"', async () => await dec.simpleText(el.selectInput.getValue,
                ['Критерий доступа', 'Выберите тип', entry.max],
                params.one.criterion,
                el.select));

            it('Проверка "Тип доступа"', async () => await dec.simpleText(el.select.getText,
                ['Тип доступа', params.one.type, entry.max],
                params.one.type,
                el.select));

            it('Проверка "Комиссионирование"', async () => await dec.simpleText(el.select.getText,
                ['Комиссионирование', params.one.commission, entry.max],
                params.one.commission,
                el.select));

            it('Проверка "Охрана"', async () => await dec.simple(el.checkbox.checked,
                ['Охрана', entry.max],
                el.checkbox));

            it('Проверка "Верификация"', async () => await dec.simple(el.checkbox.checked,
                ['Верификация', entry.max],
                el.checkbox));

            it('Проверка "Антипасс"', async () => await dec.simple(el.checkbox.checked,
                ['Антипасс', entry.max],
                el.checkbox));

            it('Проверка в дереве помещений', async () => await dec.simple(page.accessTemplateChange.room,
                [...Object.values(params.one), entry.max],
                page.accessTemplateChange));
        });

        describe('Проверка настроек в дочернем помещении', () => {
            it('Нажатие по помещению', async () => await dec.simple(page.accessTemplateChange.roomHandler,
                [params.two.name, entry.max],
                page.accessTemplateChange));

            it('Проверка "Тип критерия доступа"', async () => await dec.simpleText(el.select.getText,
                ['Тип критерия доступа', params.two.typeCriterion, entry.max],
                params.two.typeCriterion,
                el.select));

            it('Проверка "Критерий доступа"', async () => await dec.simpleText(el.selectInput.getValue,
                ['Критерий доступа', 'Выберите тип', entry.max],
                params.two.criterion,
                el.selectInput));

            it('Проверка "Тип доступа"', async () => await dec.simpleText(el.select.getText,
                ['Тип доступа', params.two.type, entry.max],
                params.two.type,
                el.select));

            it('Проверка "Критерий верификации от ПО"', async () => await dec.simpleText(el.selectInput.getValue,
                ['Критерий верификации от ПО', 'Нет', entry.max],
                params.two.verifPO,
                el.selectInput));

            it('Проверка "Критерий верификации от ПДУ"', async () => await dec.simpleText(el.selectInput.getValue,
                ['Критерий верификации от ПДУ', 'Нет', entry.max],
                params.two.verifPDU,
                el.selectInput));

            it('Проверка "Критерий верификации от BВУ"', async () => await dec.simpleText(el.selectInput.getValue,
                ['Критерий верификации от BВУ', 'Нет', entry.max],
                params.two.verifVVU,
                el.selectInput));

            it('Проверка "Алкобарьер"', async () => await dec.simpleText(el.selectInput.getValue,
                ['Алкобарьер', 'Нет', entry.max],
                params.two.alc,
                el.selectInput));

            it('Проверка "Комиссионирование"', async () => await dec.simpleText(el.select.getText,
                ['Комиссионирование', params.two.commission, entry.max],
                params.two.commission,
                el.select));

            it('Проверка "Группа комиссионирования 1"', async () => await dec.simpleText(el.select.getText,
                ['Группа комиссионирования 1', params.two.commissionGroupOne, entry.max],
                params.two.commissionGroupOne,
                el.select));

            it('Проверка "Группа комиссионирования 2"', async () => await dec.simpleText(el.select.getText,
                ['Группа комиссионирования 2', params.two.commissionGroupTwo, entry.max],
                params.two.commissionGroupTwo,
                el.select));

            it('Проверка "Охрана"', async () => await dec.simple(el.checkbox.checked,
                ['Охрана', entry.max],
                el.checkbox));

            it('Проверка "Антипасс"', async () => await dec.simple(el.checkbox.unchecked,
                ['Антипасс', entry.max],
                el.checkbox));

            it('Проверка в дереве помещений', async () => await dec.simple(page.accessTemplateChange.room,
                [...Object.values(params.two.arr), entry.max],
                page.accessTemplateChange));
        });

        describe('Нажатие кнопки "Вернуться к списку"', () => {
            it('Нажатие кнопки "Вернуться к списку"', async () => await dec.simple(el.button.handler,
                ['Сохранить изменения', entry.max],
                el.button));

            it('Проверка страницы', async () => await dec.simple(page.accessTemplate.init,
                [entry.max],
                page.accessTemplate));
        });
    });
});

describe('Проверка подраздела "Подразделения". Добавление и отображение информации.', () => {

    const params = {
        name: 'SeleniumSmokeDivisionName',
        phone: 'SeleniumSmokeDivisionPhone',
        description: 'SeleniumSmokeDivisionDescription',
        staff: 'SeleniumSmokeAccessTemplateName',
        visitor: 'SeleniumSmokeAccessTemplateName'
    };

    before('Вход и открытие подраздела "Подразделения"', async () => {
        await dec.auth(entry.customLogin, entry.customPassword)
        await dec.simple(el.section.handler, [sec.per, entry.max], el.section)
        await dec.simple(el.subsection.handler, [sub.per.division, entry.max], el.subsection)
        await dec.simple(page.division.init, [entry.max], page.division)
    })

    after('Выход', async () => await dec.exit())

    describe('Добавление подразделения', () => {
        it('Нажатие кнопки "Добавить"', async () => await dec.simple(el.butIcBefore.handler, [but.add, entry.max], el.butIcBefore))
        it('Отображение модального окна "Добавить подразделение"', async () => await dec.simple(el.modal.divisionAdd.init, [entry.max], el.modal.divisionAdd))
        it('Ввод "Подразделение"', async () => await dec.simple(el.input.sendKeys, ['Подразделение', '', params.name, entry.max], el.input))
        it('Ввод "Телефон"', async () => await dec.simple(el.input.sendKeys, ['Телефон', '', params.phone, entry.max], el.input))
        it('Ввод "Описание"', async () => await dec.simple(el.input.sendKeys, ['Описание', '', params.description, entry.max], el.input))
        it('Выбор "Шаблон доступа для сотрудника"', async () => {
            await dec.simple(el.selectMulti.iconXpand, ['Шаблон доступа для сотрудника', entry.max], el.selectMulti)
            await dec.simple(el.selectXpand.xpand, [entry.max], el.selectXpand)
            await dec.simple(el.selectXpand.handler, [params.staff, entry.max], el.selectXpand)
            await dec.simple(el.selectXpand.xpandNoElement, [entry.max], el.selectXpand)
        })
        it('Выбор "Шаблон доступа для посетителя"', async () => {
            await dec.simple(el.select.iconXpand, ['Шаблон доступа для посетителя', '', params.visitor, entry.max], el.select)
        })
        it('Нажатие кнопки "Сохранить"', async () => await dec.simple(el.button.handler, ['Сохранить', entry.max], el.button))
        it('Отсутствие модального окна "Добавить подразделение"', async () => await dec.simple(el.modal.divisionAdd.initClose, [entry.max], el.modal.divisionAdd))
        it('Отображение подразделения', async () => await dec.simple(page.division.division, [[params.name], entry.max], page.division))
    })

    describe('Отображение информации', () => {
        it('Нажатие по подразделению', async () => await dec.simple(page.division.handler, [[params.name], entry.max], page.division))
        it('Проверка "Телефон"', async () => dec.simpleText(el.input.getValue, ['Телефон', '', entry.max], params.phone, el.input))
        it('Проверка "Описание"', async () => dec.simpleText(el.input.getValue, ['Описание', '', entry.max], params.description, el.input))
        it('Проверка "Шаблон доступа для сотрудника"', async () => {
            await dec.simpleText(el.input.getValue, ['Шаблон доступа для сотрудника', '', entry.max], params.staff, el.input)
        })
        it('Проверка "Шаблон доступа для сотрудника"', async () => {
            await dec.simpleText(el.input.getValue, ['Шаблон доступа для сотрудника', '', entry.max], params.visitor, el.input)
        })
    })
});

describe('Проверка подраздела "Графики работы". Добавление.', () => {

    const params = {
        name: 'SeleniumSmokeScheduleName',
        description: 'SeleniumSmokeScheduleDescription',
        type: 'По присутствию',
        controller: entry.device_name_2,
    };

    before('Вход и открытие подраздела "Графики работы"', async () => {
        await dec.auth(entry.customLogin, entry.customPassword);
        await dec.simple(el.section.handler, [sec.per, entry.max], el.section);
        await dec.simple(el.subsection.handler, [sub.per.schedule, entry.max], el.subsection);
        await dec.simple(page.schedule.init, [entry.max], page.schedule);
    });

    after('Выход', async () => await dec.exit());

    describe('Добавление графика работы', () => {
        it('Нажатие кнопки "Добавить"', async () => await dec.simple(el.butIcBefore.handler,
            [but.add, entry.max],
            el.butIcBefore));

        it('Проверка страницы', async () => await dec.simple(page.schedulePageChange.initAdd,
            [entry.max],
            page.schedulePageChange));

        it('Удаление "Имя графика"', async () => await dec.simple(el.input.clear,
            ['Имя графика', '', entry.max],
            el.input));

        it('Ввод "Имя графика"', async () => await dec.simple(el.input.sendKeys,
            ['Имя графика', '', params.name, entry.max],
            el.input));

        it('Ввод "Описание графика"', async () => await dec.simple(el.input.sendKeys,
            ['Описание графика', '', params.description, entry.max],
            el.input));

        it('Выбор "Тип графика"', async () => await dec.simple(el.select.iconXpand,
            ['Тип графика', 'Недельный', params.type, entry.max],
            el.select));

        it('Выбор "Учет рабочего времени" у контроллера',
            async () => await dec.simple(page.schedulePageChange.checkboxWorkHandler,
                [params.controller, entry.max],
                page.schedulePageChange));

        it('Нажатие кнопки "Сохранить изменения"', async () => await dec.simple(el.button.handler,
            ['Сохранить изменения', entry.max],
            el.button));

        it('Проверка страницы', async () => await dec.simple(page.schedule.init,
            [entry.max],
            page.schedule));
    });

    describe('Проверка данных в таблице страницы "Графики работы"', () => {
        it('Поле "Название"', async () => await dec.simpleText(el.table.cellGetText,
            ['Название', '1', '1', entry.max],
            params.name,
            el.table));

        it('Поле "Тип графика"', async () => await dec.simpleText(el.table.cellGetText,
            ['Тип графика', '1', '2', entry.max],
            params.type,
            el.table));

        it('Поле "Описание"', async () => await dec.simpleText(el.table.cellGetText,
            ['Описание', '1', '3', entry.max],
            params.description,
            el.table));
    });
});

describe('Проверка подраздела "Должности". Добавление.',  () => {

    const params = {
        name: 'SeleniumSmokePositionName',
        description: 'SeleniumSmokePositionDescription'
    };

    before('Вход и открытие подраздела "Должности"', async () => {
        await dec.auth(entry.customLogin, entry.customPassword);
        await dec.simple(el.section.handler, [sec.per, entry.max], el.section);
        await dec.simple(el.subsection.handler, [sub.per.position, entry.max], el.subsection);
        await dec.simple(page.position.init, [entry.max], page.position);
    });

    after('Выход', async () => await dec.exit());

    describe('Добавление', () => {
        it('Нажатие кнопки "Добавить"', async () => await dec.simple(el.butIcBefore.handler,
            [but.add, entry.max],
            el.butIcBefore));

        it('Отображение модального окна "Добавление должности"', async () => await dec.simple(el.modal.positionAdd.init,
            [entry.max],
            el.modal.positionAdd));

        it('Ввод "Название"', async () => await dec.simple(el.input.sendKeys,
            ['Название', '', params.name, entry.max],
            el.input));

        it('Ввод "Описание"', async () => await dec.simple(el.input.sendKeys,
            ['Описание', '', params.description, entry.max],
            el.input));

        it('Нажатие кнопки "Сохранить"', async () => await dec.simple(el.button.handler,
            ['Сохранить', entry.max],
            el.button));

        it('Отсутствие модального окна "Добавление должности"',
            async () => await dec.simple(el.modal.positionAdd.initClose,
                [entry.max],
                el.modal.positionAdd));
    })

    describe('Проверка данных в таблице страницы "Должности"', () => {
        it('Поле "Должности"', async () => await dec.simpleText(el.table.cellGetText,
            ['Должности', '1', '1', entry.max],
            params.name,
            el.table));

        it('Поле "Описание"', async () => await dec.simpleText(el.table.cellGetText,
            ['Описание', '1', '2', entry.max],
            params.description,
            el.table));
    });
});

describe('Проверка подраздела "Сотрудники" вкладка "Действующие". Добавление сотрудника, выдача и иъятие карты, ' +
    'блокировка и раблокировка.', () => {

    const params = {
        id: 100,
        lastName: 'SeleniumSmokeStaffLastName',
        name: 'SeleniumSmokeStaffName',
        middleName: 'SeleniumSmokeStaffMiddleName',
        reportCard: 'staffSeleniumSmokeReportCard10',
        employmentDate: {
            date: '2020-01-01',
            year: '2020',
            day: '1',
            month: 'Январь',
        },
        startDate: {
            date: '2020-01-01 01:01',
            obj: {
                day: '1',
                month: 'Январь',
                year: '2020',
                hour: '01',
                minute: '01'
            }
        },
        endDate: {
            date: '2025-02-28 10:10',
            obj: {
                day: '28',
                month: 'Февраль',
                year: '2025',
                hour: '10',
                minute: '10'
            },

        },
        division: 'SeleniumSmokeDivisionName',
        position: 'SeleniumSmokePositionName',
        schedule: 'SeleniumSmokeScheduleName',
        template: 'SeleniumSmokeAccessTemplateName',
        card: '1'
    };

    before('Вход и открытие подраздела "Сотрудники" вкладка "Действующие".', async () => {
        await dec.auth(entry.customLogin, entry.customPassword);
        await dec.simple(el.section.handler, [sec.per, entry.max], el.section);
        await dec.simple(page.staffActive.init, [entry.max], page.staffActive);
    });

    after('Выход', async () => await dec.exit());

    describe('Добавление сотрудника и проверка данных', () => {
        it('Нажатие кнопки "Добавить"', async () => await dec.simple(el.butIcBefore.handler,
            [but.add, entry.max],
            el.butIcBefore));

        it('Проверка страницы', async () => await dec.simple(page.staffChange.initAdd,
            [entry.max],
            page.staffChange));

        it('Ввод "Фамилия"', async () => await dec.simple(el.input.sendKeys,
            ['Фамилия', 'Фамилия', params.lastName, entry.max],
            el.input));

        it('Ввод "Имя"', async () => await dec.simple(el.input.sendKeys,
            ['Имя', 'Имя', params.name, entry.max],
            el.input));

        it('Ввод "Отчество"', async () => await dec.simple(el.input.sendKeys,
            ['Отчество', 'Отчество', params.middleName, entry.max],
            el.input));

        it('Ввод "Табельный номер"', async () => await dec.simple(el.input.sendKeys,
            ['Табельный номер', 'Табельный номер', params.reportCard, entry.max],
            el.input));

        it('Выбор "Дата приема"', async () => {
            await dec.simple(el.input.iconCalendar,
                ['Дата приема', 'Дата приема', entry.max],
                el.input);

            await dec.simple(el.datepicker.yearSelect,
                [params.employmentDate.year, entry.max],
                el.datepicker);

            await dec.simple(el.datepicker.monthSelect,
                [params.employmentDate.month, entry.max],
                el.datepicker);

            await dec.simple(el.datepicker.daySelect,
                [params.employmentDate.day, entry.max],
                el.datepicker);
        });
        it('Выбор "Действует с"', async () => {
            await dec.simple(el.input.iconCalendar,
                ['Действует с', 'Действует с', entry.max],
                el.input);

            await dec.simple(el.datepicker.date,
                [params.startDate.obj, entry.max],
                el.datepicker);
        });

        it('Выбор "Действует до"', async () => {
            await dec.simple(el.input.iconCalendar,
                ['Действует до', 'Действует до', entry.max],
                el.input);

            await dec.simple(el.datepicker.date,
                [params.endDate.obj, entry.max],
                el.datepicker);
        });

        it('Выбор "Подразделение"', async () => {
            await dec.simple(el.selectInput.iconXpand,
                ['Подразделение', 'Подразделение', entry.max],
                el.select);

            await dec.simple(el.selectXpand.xpand,
                [entry.max],
                el.selectXpand);

            await dec.simple(el.selectXpand.handler,
                [params.division, entry.max],
                el.selectXpand);

            await dec.simple(el.selectXpand.xpandNoElement,
                [entry.max],
                el.selectXpand);
        });

        it('Выбор "Должность"', async () => {
            await dec.simple(el.selectInput.iconXpand,
                ['Должность', 'Должность', entry.max],
                el.select);

            await dec.simple(el.selectXpand.xpand,
                [entry.max],
                el.selectXpand);

            await dec.simple(el.selectXpand.handler,
                [params.position, entry.max],
                el.selectXpand);

            await dec.simple(el.selectXpand.xpandNoElement,
                [entry.max],
                el.selectXpand);
        });

        it('Выбор "График работы"', async () => {
            await dec.simple(el.selectInput.iconXpand,
                ['График работы', 'График работы', entry.max],
                el.select);

            await dec.simple(el.selectXpand.xpand,
                [entry.max],
                el.selectXpand);

            await dec.simple(el.selectXpand.handler,
                [params.schedule, entry.max],
                el.selectXpand);

            await dec.simple(el.selectXpand.xpandNoElement,
                [entry.max],
                el.selectXpand);
        });

        it('Проверка "Фамилия"', async () => await dec.simpleText(el.input.getValue,
            ['Фамилия', 'Фамилия', entry.max],
            params.lastName,
            el.input));

        it('Проверка "Имя"', async () => await dec.simpleText(el.input.getValue,
            ['Имя', 'Имя', entry.max],
            params.name,
            el.input));

        it('Проверка "Отчество"', async () => await dec.simpleText(el.input.getValue,
            ['Отчество', 'Отчество', entry.max],
            params.middleName,
            el.input));

        it('Проверка "Табельный номер"', async () => await dec.simpleText(el.input.getValue,
            ['Табельный номер', 'Табельный номер', entry.max],
            params.reportCard,
            el.input));

        it('Проверка "Дата приема"', async () => await dec.simpleText(el.input.getValue,
            ['Дата приема', 'Дата приема', entry.max],
            params.employmentDate.date,
            el.input));

        it('Проверка "Действует с"', async () => await dec.simpleText(el.input.getValue,
            ['Действует с', 'Действует с', entry.max],
            params.startDate.date,
            el.input));

        it('Проверка "Действует до"', async () => await dec.simpleText(el.input.getValue,
            ['Действует до', 'Действует до', entry.max],
            params.endDate.date,
            el.input));

        it('Проверка "Подразделение"', async () => await dec.simpleText(el.selectInput.getValue,
            ['Подразделение', 'Подразделение', entry.max],
            params.division,
            el.selectInput));

        it('Проверка "Должность"', async () => await dec.simpleText(el.selectInput.getValue,
            ['Должность', 'Должность', entry.max],
            params.position,
            el.selectInput));

        it('Проверка "График работы"', async () => await dec.simpleText(el.selectInput.getValue,
            ['График работы', 'График работы', entry.max],
            params.schedule,
            el.selectInput));

        it('Проверка "Шаблон доступа"', async () => await dec.simpleText(el.selectMulti.getText,
            ['Шаблон доступа', 1, entry.max],
            params.template,
            el.selectMulti));

        it('Нажатие кнопки "Сохранить изменения"', async () => await dec.simple(el.button.handler,
            ['Сохранить изменения', entry.max],
            el.button));

        it('Отображение сообщения "Сотрудник успешно добавлен"', async () => await dec.simple(el.success.success,
            ['Сотрудник успешно добавлен', entry.max],
            el.success));

        it('Отсутствие сообщение', async () => await dec.simple(el.success.successNoList,
            [entry.max],
            el.success));

        it('Нажатие кнопки "Вернуться к списку сотрудников"', async () => await dec.simple(el.button.handler,
            ['Вернуться к списку сотрудников', entry.max],
            el.button));

        it('Проверка страницы', async () => await dec.simple(page.staffActive.init,
            [entry.max],
            page.staffActive));
    });

    describe('Проверка данных в таблице страницы "Сотрудники" вкладка "Действующие"', () => {
        it('Поле "ФИО"', async () => {
            const fio = `${params.lastName} ${params.name} ${params.middleName}`;
            await dec.simpleText(el.table.cellGetText,
                ['ФИО', '1', '2', entry.max],
                fio,
                el.table);
        });
        it('Поле "Табельный номер"', async () => await dec.simpleText(el.table.cellGetText,
            ['Табельный номер', '1', '3', entry.max],
            params.reportCard,
            el.table));

        it('Поле "Дата приема"', async () => await dec.simpleText(el.table.cellGetText,
            ['Дата приема', '1', '4', entry.max],
            params.employmentDate.date,
            el.table));

        it('Поле "Подразделение"', async () => await dec.simpleText(el.table.cellGetText,
            ['Подразделение', '1', '8', entry.max],
            params.division,
            el.table));

        it('Поле "Должность"', async () => await dec.simpleText(el.table.cellGetText,
            ['Должность', '1', '9', entry.max],
            params.position,
            el.table));

        it('Поле "График работы"', async () => await dec.simpleText(el.table.cellGetText,
            ['График работы', '1', '10', entry.max],
            params.schedule,
            el.table));
    });

    describe('Выдача карты сотруднику', () => {
        it('Нажатие по сотруднику', async () => await dec.simple(el.table.strHandler,
            [1, entry.max],
            el.table));

        it('Нажатие кнопки "Вадать карту"', async () => await dec.simple(el.butIcBefore.handler,
            [but.card_add, entry.max],
            el.butIcBefore));

        it('Отображение модального окна "Выдать карту"', async () => await dec.simple(el.modal.staffCardAdd.init,
            [entry.max],
            el.modal.staffCardAdd));

        it('Ввод "Идентификатор карты"', async () => await dec.simple(el.input.sendKeys,
            ['Идентификатор карты', '', params.card, entry.max],
            el.input));

        it('Нажатие кнопки "Сохранить"', async () => await dec.simple(el.button.handler,
            ['Сохранить', entry.max],
            el.button));

        it('Отсутствие модального окна "Выдать карту"', async () => await dec.simple(el.modal.staffCardAdd.initClose,
            [entry.max],
            el.modal.staffCardAdd));
    });

    describe('Проверка данных в таблице страницы "Сотрудники" вкладка "Действующие". Отображение карты у сотрудника',
        () => {
        it('Поле "ФИО"', async () => {
            const fio = `${params.lastName} ${params.name} ${params.middleName}`;
            await dec.simpleText(el.table.cellGetText,
                ['ФИО', '1', '2', entry.max],
                fio,
                el.table);
        });

        it('Поле "Карта"', async () => await dec.simpleText(el.table.cellGetText,
            ['Карта', '1', '5', entry.max],
            params.card,
            el.table));
    });

    describe('Блокировка сотрудника', () => {
        it('Нажатие по сотруднику', async () => await dec.simple(el.table.strHandler,
            [1, entry.max],
            el.table));

        it('Нажатие кнопки "Заблокировать"', async () => await dec.simple(el.butIcBefore.handler,
            [but.lock, entry.max],
            el.butIcBefore));

        it('Отображение модального окна "Подтвердите действие"',
            async () => await dec.simple(el.modalConfirm.staffBlock.init,
                [entry.max],
                el.modalConfirm.staffBlock));

        it('Нажатие кнопки "Заблокировать"', async () => await dec.simple(el.button.handler,
            ['Заблокировать', entry.max],
            el.button));

        it('Отсутствие модального окна "Подтвердите действие"',
            async () => await dec.simple(el.modalConfirm.staffBlock.initClose,
                [entry.max],
                el.modalConfirm.staffBlock));

        it('Отображение сообщения "Сотрудник заблокирован"', async () => await dec.simple(el.success.success,
            ['Сотрудник заблокирован', entry.max],
            el.success));
    });

    describe('Проверка данных в таблице страницы "Сотрудники" вкладка "Действующие". Отображение блокировки ' +
        'у сотрудника', () => {
        it('Поле "ФИО"', async () => {
            const fio = `${params.lastName} ${params.name} ${params.middleName}`;
            await dec.simpleText(el.table.cellGetText,
                ['ФИО', '1', '2', entry.max],
                fio,
                el.table);
        });

        it('Поле "Блокировка"', async () => await dec.simple(el.table.cellGetIconLock,
            ['1', '7', entry.max],
            el.table));
    });

    describe('Разблокировка сотрудника', () => {
        it('Нажатие по сотруднику', async () => await dec.simple(el.table.strHandler,
            [1, entry.max],
            el.table));

        it('Нажатие кнопки "Разблокировать"', async () => await dec.simple(el.butIcBefore.handler,
            [but.unlock, entry.max],
            el.butIcBefore));

        it('Отображение модального окна "Подтвердите действие"',
            async () => await dec.simple(el.modalConfirm.staffUnBlock.init,
                [entry.max],
                el.modalConfirm.staffUnBlock));

        it('Нажатие кнопки "Разблокировать"', async () => await dec.simple(el.button.handler,
            ['Разблокировать', entry.max],
            el.button));

        it('Отсутствие модального окна "Подтвердите действие"',
            async () => await dec.simple(el.modalConfirm.staffUnBlock.initClose,
                [entry.max],
                el.modalConfirm.staffUnBlock));

        it('Отображение сообщения "Сотрудник разблокирован"', async () => await dec.simple(el.success.success,
            ['Сотрудник разблокирован', entry.max],
            el.success));
    });

    describe('Проверка данных в таблице страницы "Сотрудники" вкладка "Действующие". Отсутствие блокировки ' +
        'у сотрудника', () => {
        it('Поле "ФИО"', async () => {
            const fio = `${params.lastName} ${params.name} ${params.middleName}`;
            await dec.simpleText(el.table.cellGetText, ['ФИО', '1', '2', entry.max], fio, el.table);
        });

        it('Поле "Блокировка"', async () => await dec.simple(el.table.cellNoIconLock,
            ['1', '7', entry.max],
            el.table));
    });

    describe('Изъятие карты у сотрудника', () => {
        it('Нажатие по сотруднику', async () => await dec.simple(el.table.strHandler,
            [1, entry.max],
            el.table));

        it('Нажатие кнопки "Удалить карту"', async () => await dec.simple(el.butIcBefore.handler,
            [but.card_delete, entry.max],
            el.butIcBefore));

        it('Отображение модального окна "Подтвердите действие"',
            async () => await dec.simple(el.modalConfirm.staffDeleteCard.init,
                [entry.max],
                el.modalConfirm.staffDeleteCard));

        it('Нажатие кнопки "Удалить"', async () => await dec.simple(el.button.handler,
            ['Удалить', entry.max],
            el.button));

        it('Отсутствие модального окна "Подтвердите действие"',
            async () => await dec.simple(el.modalConfirm.staffDeleteCard.initClose,
                [entry.max],
                el.modalConfirm.staffDeleteCard));

        it('Отображение сообщения "Операция успешно завершена"', async () => await dec.simple(el.success.success,
            ['Операция успешно завершена', entry.max],
            el.success));
    });

    describe('Проверка данных в таблице страницы "Сотрудники" вкладка "Действующие". Отсутствие карты у сотрудника',
        () => {
        it('Поле "ФИО"', async () => {
            const fio = `${params.lastName} ${params.name} ${params.middleName}`;
            await dec.simpleText(el.table.cellGetText,
                ['ФИО', '1', '2', entry.max],
                fio,
                el.table);
        });

        it('Поле "Карта"', async () => await dec.simpleText(el.table.cellGetText,
            ['Карта', '1', '5', entry.max],
            '',
            el.table));
    });

    describe('Выдача карты через карточку сотрудника', async () => {

        it('Нажатие по сотруднику', async () => await dec.simple(el.table.strHandler,
            [1, entry.max],
            el.table));

        it('Нажатие кнопки "Редактировать"', async () => await dec.simple(el.butIcBefore.handler,
            [but.edit, entry.max],
            el.butIcBefore));

        it('Проверка страницы', async () => await dec.simple(page.staffChange.initEdit,
            [params.id, entry.max],
            page.staffChange));

        it('Обновление страницы', async () => await page.base.refresh());

        it('Нажатие вкладки "Карты доступа"', async () => {
            await dec.simple(el.simpleCell.handler,
                ['Карта доступа', entry.max],
                el.simpleCell);

            await dec.simple(el.simpleCell.active,
                ['Карта доступа', entry.max],
                el.simpleCell);
        });

        it('Нажатие иконки на "Идентификатор"', async () => await dec.simple(el.input.iconCard,
            ['Идентификатор', '', entry.max],
            el.input));

        it('Отображение модального окна "Выдать карту"', async () => await dec.simple(el.modal.staffCardAdd.init,
            [entry.max],
            el.modal.staffCardAdd));

        it('Ввод "Идентификатор карты"', async () => await dec.simple(el.input.sendKeys,
            ['Идентификатор карты', '', params.card, entry.max],
            el.input));

        it('Нажатие кнопки "Сохранить"', async () => await dec.simple(el.button.handler,
            ['Сохранить', entry.max],
            el.button));

        it('Отсутствие модального окна "Выдать карту"', async () => await dec.simple(el.modal.staffCardAdd.initClose,
            [entry.max],
            el.modal.staffCardAdd));

        it('Отсутствие сообщение', async () => await dec.simple(el.success.successNoList,
            [entry.max],
            el.success));

        it('Нажатие кнопки "Сохранить изменения"', async () => await dec.simple(el.button.handler,
            ['Сохранить изменения', entry.max],
            el.button));

        it('Отображение сообщения "Данные успешно изменены', async () => await dec.simple(el.success.success,
            ['Данные успешно изменены', entry.max],
            el.success));

        it('Нажатие кнопки "Вернуться к списку сотрудников"', async () => await dec.simple(el.button.handler,
            ['Вернуться к списку сотрудников', entry.max],
            el.button));

        it('Проверка страницы', async () => await dec.simple(page.staffActive.init,
            [entry.max],
            page.staffActive));
    });

    describe('Проверка данных в таблице страницы "Сотрудники" вкладка "Действующие". Отображение карты у сотрудника',
        () => {
        it('Поле "ФИО"', async () => {
            const fio = `${params.lastName} ${params.name} ${params.middleName}`;
            await dec.simpleText(el.table.cellGetText,
                ['ФИО', '1', '2', entry.max],
                fio,
                el.table);
        });

        it('Поле "Карта"', async () => await dec.simpleText(el.table.cellGetText,
            ['Карта', '1', '5', entry.max],
            params.card,
            el.table));
    });
});

describe('Проверка подраздела "Сотрудники" вкладка "Действующие". Добавление существующей карты.', () => {

    const params = {
        id: 101,
        lastName: 'SeleniumSmokeStaffDuplicateCardLastName',
        name: 'SeleniumSmokeStaffDuplicateCardName',
        division: 'SeleniumSmokeDivisionName',
        card: '1',
        error: 'Карта 1 уже используется у сотрудника ' +
            '"SeleniumSmokeStaffLastName SeleniumSmokeStaffName SeleniumSmokeStaffMiddleName", ' +
            'подразделение SeleniumSmokeDivisionName в качестве карты'
    };

    before('Вход и открытие подраздела "Сотрудники" вкладка "Действующие".', async () => {
        await dec.auth(entry.customLogin, entry.customPassword);
        await dec.simple(el.section.handler, [sec.per, entry.max], el.section);
        await dec.simple(page.staffActive.init, [entry.max], page.staffActive);
    });

    after('Выход', async () => await dec.exit());

    describe('Добавление сотрудника и проверка данных', () => {
        it('Нажатие кнопки "Добавить"', async () => await dec.simple(el.butIcBefore.handler,
            [but.add, entry.max],
            el.butIcBefore));

        it('Проверка страницы', async () => await dec.simple(page.staffChange.initAdd,
            [entry.max],
            page.staffChange));

        it('Ввод "Фамилия"', async () => await dec.simple(el.input.sendKeys,
            ['Фамилия', 'Фамилия', params.lastName, entry.max],
            el.input));

        it('Ввод "Имя"', async () => await dec.simple(el.input.sendKeys,
            ['Имя', 'Имя', params.name, entry.max],
            el.input));

        it('Выбор "Подразделение"', async () => {
            await dec.simple(el.selectInput.iconXpand,
                ['Подразделение', 'Подразделение', entry.max],
                el.select);

            await dec.simple(el.selectXpand.xpand,
                [entry.max],
                el.selectXpand);

            await dec.simple(el.selectXpand.handler,
                [params.division, entry.max],
                el.selectXpand);

            await dec.simple(el.selectXpand.xpandNoElement,
                [entry.max],
                el.selectXpand);
        });

        it('Проверка "Фамилия"', async () => await dec.simpleText(el.input.getValue,
            ['Фамилия', 'Фамилия', entry.max],
            params.lastName,
            el.input));

        it('Проверка "Имя"', async () => await dec.simpleText(el.input.getValue,
            ['Имя', 'Имя', entry.max],
            params.name,
            el.input));

        it('Проверка "Подразделение"', async () => await dec.simpleText(el.selectInput.getValue,
            ['Подразделение', 'Подразделение', entry.max],
            params.division,
            el.selectInput));

        it('Нажатие кнопки "Сохранить изменения"', async () => await dec.simple(el.button.handler,
            ['Сохранить изменения', entry.max],
            el.button));

        it('Отображение сообщения "Сотрудник успешно добавлен"', async () => await dec.simple(el.success.success,
            ['Сотрудник успешно добавлен', entry.max],
            el.success));

        it('Нажатие кнопки "Вернуться к списку сотрудников"', async () => await dec.simple(el.button.handler,
            ['Вернуться к списку сотрудников', entry.max],
            el.button));

        it('Проверка страницы', async () => await dec.simple(page.staffActive.init,
            [entry.max],
            page.staffActive));
    });

    describe('Проверка данных в таблице страницы "Сотрудники" вкладка "Действующие"', () => {
        it('Ввод в поиск фамилию сотрудника', async () => await dec.simple(el.input.sendKeys,
            ['', 'Поиск...', params.lastName, entry.max],
            el.input));

        it('Отображение одной строки в таблице', async () => await dec.simple(el.table.singleSize,
            [entry.max],
            el.table));

        it('Поле "ФИО"', async () => {
            const fio = `${params.lastName} ${params.name}`;
            await dec.simpleText(el.table.cellGetText,
                ['ФИО', '1', '2', entry.max],
                fio,
                el.table);
        });

        it('Поле "Подразделение"', async () => await dec.simpleText(el.table.cellGetText,
            ['Подразделение', '1', '8', entry.max],
            params.division,
            el.table));
    });

    describe('Выдача карты сотруднику', () => {
        it('Нажатие по сотруднику', async () => await dec.simple(el.table.strHandler,
            [1, entry.max],
            el.table));

        it('Нажатие кнопки "Вадать карту"', async () => await dec.simple(el.butIcBefore.handler,
            [but.card_add, entry.max],
            el.butIcBefore));

        it('Отображение модального окна "Выдать карту"', async () => await dec.simple(el.modal.staffCardAdd.init,
            [entry.max],
            el.modal.staffCardAdd));

        it('Ввод "Идентификатор карты"', async () => await dec.simple(el.input.sendKeys,
            ['Идентификатор карты', '', params.card, entry.max],
            el.input));

        it('Нажатие кнопки "Сохранить"', async () => await dec.simple(el.button.handler,
            ['Сохранить', entry.max],
            el.button));

        it('Отображение ошибки', async () => await dec.simple(el.error.error,
            [params.error, entry.max],
            el.error));

        it('Отсутствие модального окна "Выдать карту"', async () => await dec.simple(el.modal.staffCardAdd.initClose,
            [entry.max],
            el.modal.staffCardAdd));
    });

});

describe('Поверка пораздела "Посетители" вкладки "Заказанные" и "Действующие". Добавление, выдача и иъятие карты,' +
    'блокировка и разблокировка.', () => {

    const params = {
        id: 102,
        lastName: 'SeleniumSmokeVisitorLastName',
        name: 'SeleniumSmokeVisitorName',
        middleName: 'SeleniumSmokeVisitorMiddleName',
        staff: 'SeleniumSmokeStaffLastName SeleniumSmokeStaffName SeleniumSmokeStaffMiddleName',
        document: 'SeleniumSmokeVisitorDocument',
        docNum: 'SeleniumSmokeVisitorDocumentNumber',
        startDate: {
            date: '2020-01-01 01:01',
            dateTable: '2020-01-01 01:01:00',
            obj: {
                day: '1',
                month: 'Январь',
                year: '2020',
                hour: '01',
                minute: '01'
            }
        },
        endDate: {
            date: '2025-02-28 10:10',
            dateTable: '2025-02-28 10:10:00',
            obj: {
                day: '28',
                month: 'Февраль',
                year: '2025',
                hour: '10',
                minute: '10'
            },

        },
        division: 'SeleniumSmokeDivisionName',
        template: 'SeleniumSmokeAccessTemplateName',
        card: '3'
    };

    before('Вход и открытие подраздела "Посетители" вкладка "Заказанные".', async () => {
        await dec.auth(entry.customLogin, entry.customPassword)
        await dec.simple(el.section.handler, [sec.pas, entry.max], el.section)
        await dec.simple(el.subsection.handler, [sub.pas.visitor, entry.max], el.subsection)
        await dec.simple(el.tab.handler, ['Заказанные', entry.max], el.tab)
        await dec.simple(page.visitorOrdered.init, [entry.max], page.visitorOrdered)
    });

    after('Выход', async () => await dec.exit());

    describe('Добавление посетителя', () => {
        it('Нажатие кнопки "Добавить"', async () => await dec.simple(el.butIcBefore.handler,
            [but.add, entry.max],
            el.butIcBefore));

        it('Проверка страницы', async () => await dec.simple(page.visitorChange.initAdd,
            [entry.max],
            page.visitorChange));

        it('Ввод "Фамилия"', async () => await dec.simple(el.input.sendKeys,
            ['Фамилия', 'Фамилия', params.lastName, entry.max],
            el.input));

        it('Ввод "Имя"', async () => await dec.simple(el.input.sendKeys,
            ['Имя', 'Имя', params.name, entry.max],
            el.input));

        it('Ввод "Отчество"', async () => await dec.simple(el.input.sendKeys,
            ['Отчество', 'Отчество', params.middleName, entry.max],
            el.input));

        it('Выбор "Сопровождающий"', async () => {
            await dec.simple(el.selectInput.iconXpand,
                ['Сопровождающий', 'Сопровождающий', entry.max],
                el.select);

            await dec.simple(el.selectXpand.xpand,
                [entry.max],
                el.selectXpand);

            await dec.simple(el.selectXpand.handler,
                [params.staff, entry.max],
                el.selectXpand);

            await dec.simple(el.selectXpand.xpandNoElement,
                [entry.max],
                el.selectXpand);
        });

        it('Выбор "Действует с"', async () => {
            await dec.simple(el.input.iconCalendar,
                ['Действует с', 'Действует с', entry.max],
                el.input);

            await dec.simple(el.datepicker.date,
                [params.startDate.obj, entry.max],
                el.datepicker);
        });

        it('Выбор "Действует до"', async () => {
            await dec.simple(el.input.iconCalendar,
                ['Действует до', 'Действует до', entry.max],
                el.input);

            await dec.simple(el.datepicker.date,
                [params.endDate.obj, entry.max],
                el.datepicker);
        });

        it('Выбор "Куда (подразделение)"', async () => {
            await dec.simple(el.selectInput.iconXpand,
                ['Куда (подразделение)', 'Куда (подразделение)',
                    entry.max], el.select);
            await dec.simple(el.selectXpand.xpand,
                [entry.max],
                el.selectXpand);

            await dec.simple(el.selectXpand.handler,
                [params.division, entry.max],
                el.selectXpand);

            await dec.simple(el.selectXpand.xpandNoElement,
                [entry.max],
                el.selectXpand);
        });

        it('Ввод "Подтверждающий документ"', async () => await dec.simple(el.input.sendKeys,
            ['Подтверждающий документ', 'Подтверждающий документ', params.document, entry.max],
            el.input));

        it('Ввод "Номер документа"', async () => await dec.simple(el.input.sendKeys,
            ['Номер документа', 'Номер документа', params.docNum, entry.max],
            el.input));

        it('Проверка "Фамилия"', async () => await dec.simpleText(el.input.getValue,
            ['Фамилия', 'Фамилия', entry.max],
            params.lastName,
            el.input));

        it('Проверка "Имя"', async () => await dec.simpleText(el.input.getValue,
            ['Имя', 'Имя', entry.max],
            params.name,
            el.input));

        it('Проверка "Сопровождающий"', async () => await dec.simpleText(el.selectInput.getValue,
            ['Сопровождающий', 'Сопровождающий', entry.max],
            params.staff,
            el.selectInput));

        it('Проверка "Подтверждающий документ"', async () => await dec.simpleText(el.input.getValue,
            ['Подтверждающий документ', 'Подтверждающий документ', entry.max],
            params.document,
            el.input));

        it('Проверка "Номер документа"', async () => await dec.simpleText(el.input.getValue,
            ['Номер документа', 'Номер документа', entry.max],
            params.docNum,
            el.input));

        it('Проверка "Действует с"', async () => await dec.simpleText(el.input.getValue,
            ['Действует с', 'Действует с', entry.max],
            params.startDate.date,
            el.input));

        it('Проверка "Действует до"', async () => await dec.simpleText(el.input.getValue,
            ['Действует до', 'Действует до', entry.max],
            params.endDate.date,
            el.input));

        it('Проверка "Шаблон доступа"', async () => await dec.simpleText(el.selectInput.getValue,
            ['Шаблон доступа', 'Шаблон доступа', entry.max],
            params.template,
            el.selectInput));

        it('Нажатие кнопки "Сохранить изменения"', async () => await dec.simple(el.button.handler,
            ['Сохранить изменения', entry.max],
            el.button));

        it('Отображение сообщения "Посетитель успешно добавлен"', async () => await dec.simple(el.success.success,
            ['Посетитель успешно добавлен', entry.max],
            el.success));

        it('Отсутствие сообщение', async () => await dec.simple(el.success.successNoList,
            [entry.max],
            el.success));

        it('Обновление страницы', async () => await page.base.refresh());

        it('Нажатие кнопки "Вернуться к списку посетителей"', async () => await dec.simple(el.button.handler,
            ['Вернуться к списку посетителей', entry.max],
            el.button));

        it('Проверка страницы', async () => await dec.simple(page.visitorOrdered.init,
            [entry.max],
            page.visitorOrdered));
    });

    describe('Проверка данных в таблице страницы "Посетители" вкладка "Заказанные".', () => {
        it('Поле "Посетитель"', async () => {
            const fio = `${params.lastName} ${params.name} ${params.middleName}`
            await dec.simpleText(el.table.cellGetText, ['Посетитель', '1', '1', entry.max], fio, el.table)
        })
        it('Поле "Сопровождающий"', async () => await dec.simpleText(el.table.cellGetText, ['Сопровождающий', '1', '2', entry.max], params.staff, el.table))
        it('Поле "Документ"', async () => await dec.simpleText(el.table.cellGetText, ['Документ', '1', '3', entry.max], params.document, el.table))
        it('Поле "Номер документа"', async () => await dec.simpleText(el.table.cellGetText, ['Номер документа', '1', '4', entry.max], params.docNum, el.table))
        it('Поле "Шаблон доступа"', async () => await dec.simpleText(el.table.cellGetText, ['Шаблон доступа', '1', '5', entry.max], params.template, el.table))
        it('Поле "Действует с"', async () => await dec.simpleText(el.table.cellGetText, ['Действует с', '1', '7', entry.max], params.startDate.dateTable, el.table))
        it('Поле "Действует до"', async () => await dec.simpleText(el.table.cellGetText, ['Действителен до', '1', '8', entry.max], params.endDate.dateTable, el.table))
        it('Поле "Куда (подразделение)"', async () => await dec.simpleText(el.table.cellGetText, ['Куда (подразделение)', '1', '9', entry.max], params.division, el.table))
    });

    describe('Выдача карты посетителю', () => {
        it('Нажатие по посетителю', async () => await dec.simple(el.table.strHandler,
            [1, entry.max],
            el.table));

        it('Нажатие кнопки "Вадать карту"', async () => await dec.simple(el.butIcBefore.handler,
            [but.card_add, entry.max],
            el.butIcBefore));

        it('Отображение модального окна "Выдать карту"', async () => await dec.simple(el.modal.staffCardAdd.init,
            [entry.max],
            el.modal.staffCardAdd));

        it('Ввод "Идентификатор карты"', async () => await dec.simple(el.input.sendKeys,
            ['Идентификатор карты', '', params.card, entry.max],
            el.input));

        it('Нажатие кнопки "Сохранить"', async () => await dec.simple(el.button.handler,
            ['Сохранить', entry.max],
            el.button));

        it('Отсутствие модального окна "Выдать карту"', async () => await dec.simple(el.modal.staffCardAdd.initClose,
            [entry.max],
            el.modal.staffCardAdd));

        it('Отсутствие строк в таблице страницы "Посетители" вкладка "Заказанные"', async () => {
            await dec.simple(el.table.noStr,
                [entry.max],
                el.table);
        });
    });

    describe('Проверка данных в таблице страницы "Посетители" вкладка "Действующие".', () => {
        it('Нажатие вкладки "Действующие"', async () => await dec.simple(el.tab.handler,
            ['Действующие', entry.max],
            el.tab));

        it('Проверка страницы', async () => await dec.simple(page.visitorCurrent.init,
            [entry.max],
            page.visitorCurrent));

        it('Поле "Посетитель"', async () => {
            const fio = `${params.lastName} ${params.name} ${params.middleName}`;
            await dec.simpleText(el.table.cellGetText,
                ['Посетитель', '1', '2', entry.max],
                fio,
                el.table);
        });

        it('Поле "Сопровождающий"', async () => await dec.simpleText(el.table.cellGetText,
            ['Сопровождающий', '1', '3', entry.max],
            params.staff,
            el.table));

        it('Поле "Документ"', async () => await dec.simpleText(el.table.cellGetText,
            ['Документ', '1', '4', entry.max],
            params.document,
            el.table));

        it('Поле "Номер документа"', async () => await dec.simpleText(el.table.cellGetText,
            ['Номер документа', '1', '5', entry.max],
            params.docNum,
            el.table));

        it('Поле "Действует с"', async () => await dec.simpleText(el.table.cellGetText,
            ['Действует с', '1', '8', entry.max],
            params.startDate.dateTable,
            el.table));

        it('Поле "Действует до"', async () => await dec.simpleText(el.table.cellGetText,
            ['Действителен до', '1', '9', entry.max],
            params.endDate.dateTable,
            el.table));

        it('Поле "Куда (подразделение)"', async () => await dec.simpleText(el.table.cellGetText,
            ['Куда (подразделение)', '1', '10', entry.max],
            params.division,
            el.table));

        it('Поле "Шаблон доступа"', async () => await dec.simpleText(el.table.cellGetText,
            ['Шаблон доступа', '1', '11', entry.max],
            params.template,
            el.table));

        it('Поле "Карта"', async () => await dec.simpleText(el.table.cellGetText,
            ['Карта', '1', '12', entry.max],
            params.card,
            el.table));
    });

    describe('Блокировка посетителя', () => {
        it('Нажатие по  посетителю', async () => await dec.simple(el.table.strHandler,
            [1, entry.max],
            el.table));

        it('Нажатие кнопки "Заблокировать"', async () => await dec.simple(el.butIcBefore.handler,
            [but.lock, entry.max],
            el.butIcBefore));

        it('Отображение модального окна "Подтвердите действие"',
            async () => await dec.simple(el.modalConfirm.visitorBlock.init,
                [entry.max],
                el.modalConfirm.visitorBlock));

        it('Нажатие кнопки "Заблокировать"', async () => await dec.simple(el.button.handler,
            ['Заблокировать', entry.max],
            el.button));

        it('Отсутствие модального окна "Подтвердите действие"',
            async () => await dec.simple(el.modalConfirm.visitorBlock.initClose,
                [entry.max],
                el.modalConfirm.visitorBlock));

        it('Отображение сообщения "Посетитель заблокирован"', async () => await dec.simple(el.success.success,
            ['Посетитель заблокирован', entry.max],
            el.success));
    });

    describe('Проверка данных в таблице страницы "Посетители" вкладка "Действующие". Отображение блокировки ' +
        'у посетителя', () => {
        it('Поле "Посетитель"', async () => {
            const fio = `${params.lastName} ${params.name} ${params.middleName}`;
            await dec.simpleText(el.table.cellGetText,
                ['Посетитель', '1', '2', entry.max],
                fio,
                el.table);
        });

        it('Поле "Блокировка"', async () => await dec.simple(el.table.cellGetIconLock,
            ['1', '6', entry.max],
            el.table));
    });

    describe('Разблокировка посетителя', () => {
        it('Нажатие по  посетителю', async () => await dec.simple(el.table.strHandler,
            [1, entry.max],
            el.table));
        it('Нажатие кнопки "Разблокировать"', async () => await dec.simple(el.butIcBefore.handler,
            [but.unlock, entry.max],
            el.butIcBefore));

        it('Отображение модального окна "Подтвердите действие"',
            async () => await dec.simple(el.modalConfirm.visitorUnBlock.init,
                [entry.max],
                el.modalConfirm.visitorUnBlock));

        it('Нажатие кнопки "Заблокировать"', async () => await dec.simple(el.button.handler,
            ['Разблокировать', entry.max],
            el.button));

        it('Отсутствие модального окна "Подтвердите действие"',
            async () => await dec.simple(el.modalConfirm.visitorUnBlock.initClose,
                [entry.max],
                el.modalConfirm.visitorUnBlock));

        it('Отображение сообщения "Посетитель разблокирован"', async () => await dec.simple(el.success.success,
            ['Посетитель разблокирован', entry.max],
            el.success));
    });

    describe('Проверка данных в таблице страницы "Посетители" вкладка "Действующие". Отсутствие блокировки ' +
        'у посетителя', () => {
        it('Поле "Посетитель"', async () => {
            const fio = `${params.lastName} ${params.name} ${params.middleName}`;
            await dec.simpleText(el.table.cellGetText,
                ['Посетитель', '1', '2', entry.max],
                fio,
                el.table);
        });

        it('Поле "Блокировка"', async () => await dec.simple(el.table.cellNoIconLock,
            ['1', '6', entry.max],
            el.table));
    });

    describe('Изъятие карты через карточку посетителя', async () => {
        it('Нажатие по  посетителю', async () => await dec.simple(el.table.strHandler,
            [1, entry.max],
            el.table));

        it('Нажатие кнопки "Редактировать"', async () => await dec.simple(el.butIcBefore.handler,
            [but.edit, entry.max],
            el.butIcBefore));

        it('Проверка страницы', async () => await dec.simple(page.visitorChange.initEdit,
            [params.id, entry.max],
            page.visitorChange));

        it('Нажатие иконки удаления в "Карта / идентификатор"', async () => await dec.simple(el.input.iconClear,
            ['Карта / идентификатор', 'Карта / идентификатор', entry.max],
            el.input));

        it('Проверка "Карта / идентификатор"', async () => await dec.simpleText(el.input.getValue,
            ['Карта / идентификатор', 'Карта / идентификатор', entry.max],
            '',
            el.input));

        it('Отсутствие сообщение', async () => await dec.simple(el.success.successNoList,
            [entry.max],
            el.success));

        it('Нажатие кнопки "Сохранить изменения"', async () => await dec.simple(el.button.handler,
            ['Сохранить изменения', entry.max],
            el.button));

        it('Отображение сообщения "Данные успешно изменены"', async () => await dec.simple(el.success.success,
            ['Данные успешно изменены', entry.max],
            el.success));


        it('Нажатие кнопки "Вернуться к списку посетителей"', async () => await dec.simple(el.button.handler,
            ['Вернуться к списку посетителей', entry.max],
            el.button));

        it('Проверка страницы', async () => await dec.simple(page.visitorCurrent.init,
            [entry.max],
            page.visitorCurrent));

        it('Отсутствие строк в таблице страницы "Посетители" вкладка "Действующие"',
            async () => await dec.simple(el.table.noStr,
                [entry.max],
                el.table));
    });

    describe('Проверка данных в таблице страницы "Посетители" вкладка "Заказанные".', () => {
        it('Нажатие вкладки "Заказанные"', async () => await dec.simple(el.tab.handler,
            ['Заказанные', entry.max],
            el.tab));

        it('Проверка страницы', async () => await dec.simple(page.visitorOrdered.init,
            [entry.max],
            page.visitorOrdered));

        it('Поле "Посетитель"', async () => {
            const fio = `${params.lastName} ${params.name} ${params.middleName}`;
            await dec.simpleText(el.table.cellGetText,
                ['Посетитель', '1', '1', entry.max],
                fio,
                el.table);
        });

        it('Поле "Карта"', async () => await dec.simpleText(el.table.cellGetText,
            ['Карта', '1', '10', entry.max],
            '',
            el.table));
    });
});

describe('Закрытие браузера', () => {
    it('Закрытие', async () => await page.base.closeDriver());
});