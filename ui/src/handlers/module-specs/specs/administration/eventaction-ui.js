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
const data = require('../../data').dataEventaction;
const befPosition  = require('../personal/position-ui').befPosition;

const bef = () => before('Вход и открытие подраздела "Реакции на события"', async () => {
    await page.base.loading(entry.sleep1);
    await dec.auth(entry.customLogin, entry.customPassword);
    await dec.simple(el.section.handler, [sec.adm, entry.max], el.section);
    await dec.simple(el.subsection.handler, [sub.adm.action, entry.max], el.subsection);
    await dec.simple(page.eventaction.init, [entry.max], page.eventaction);
    await page.base.loading(entry.sleep1);
});

const aft = () => after('Выход', async () => {
    await page.base.loading(entry.sleep1);
    await dec.exit();
});

const other = () => {

    const addEvent = () => describe('Администрирование / Реаккции на события.' +
        'Добавление реакции на событие.', () => {

        describe('Добавление', () => {
            bef();
            aft();
            describe('Открытие на добавление и ввод названия', () => {
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
                    name: 'Добавить реакцию на событие',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.page.eventactionChange.initAdd({
                    timeout: entry.max
                });
                decorate.el.input.sendKeys({
                    title: 'Название',
                    placeholder: '',
                    value: data.eventaction1.name,
                    timeout: entry.max
                });
            });

            describe('Добавление условия', () => {
                decorate.page.eventactionChange.addCondition({
                    icon: but.unsorted_add_outline,
                    timeout: entry.max
                });
                decorate.el.menu.menu({
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.menu.handler({
                    name: 'Добавить событие',
                    timeout: entry.max
                });
                decorate.modal.eventActionSelect.init({
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.modal.eventActionSelect.inputSendKeys({
                    title: '',
                    placeholder: 'Поиск...',
                    value: data.eventaction1.condition,
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.modal.eventActionSelect.handler({
                    text: data.eventaction1.condition,
                    classed: 'pwEAItem',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.button.handler({
                    name: 'Выбрать',
                    timeout: entry.max
                });
            });

            describe('Добавление действия', () => {
                decorate.page.eventactionChange.addAction({
                    icon: but.unsorted_add_outline,
                    timeout: entry.max
                });
                decorate.el.menu.menu({
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.menu.handler({
                    name: 'Выполнить http-запрос',
                    timeout: entry.max
                });
                decorate.modal.httpRequest.init({
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.input.sendKeys({
                    title: 'Строка запроса в формате http://... или https://...',
                    placeholder: '',
                    value: data.eventaction1.request,
                    timeout: entry.max
                });
                decorate.el.button.handler({
                    name: 'Сохранить',
                    timeout: entry.max
                });
                decorate.modal.httpRequest.initClose({
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
            });

            describe('Сохранение', () => {
                decorate.el.button.handler({
                    name: 'Сохранить изменения',
                    timeout: entry.max
                });
                decorate.init.eventaction();
            });
        });

        describe('Проверка', () => {
            bef();
            aft();

            describe('Проверка таблицы', () => {
                decorate.el.table.cellGetText({
                    headTitle: 'Название',
                    strNumber: 1,
                    cellNumber: 1,
                    value: data.eventaction1.name,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Тип',
                    strNumber: 1,
                    cellNumber: 3,
                    value: 'Реакция на события',
                    timeout: entry.max
                });
                decorate.el.checkbox.checked({
                    name: '',
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
                decorate.el.input.getValue({
                    title: 'Название',
                    placeholder: '',
                    value: data.eventaction1.name,
                    timeout: entry.max
                });
                decorate.el.checkbox.checked({
                    name: 'Активирован',
                    timeout: entry.max
                });
                decorate.page.eventactionChange.conditionColumnName({
                    name: 'Условия',
                    timeout: entry.max
                });
                decorate.page.eventactionChange.conditionTitle({
                    num: 1,
                    title: data.eventaction1.conditionTitle,
                    timeout: entry.max
                });
                decorate.page.eventactionChange.conditionName({
                    num: 1,
                    name: data.eventaction1.conditionDescription,
                    timeout: entry.max
                });
                decorate.page.eventactionChange.actionColumnName({
                    name: 'Действие',
                    timeout: entry.max
                });
                decorate.page.eventactionChange.actionTitle({
                    num: 1,
                    title: data.eventaction1.actionTitle,
                    timeout: entry.max
                });
                decorate.page.eventactionChange.actionName({
                    num: 1,
                    name: data.eventaction1.actionDescription,
                    timeout: entry.max
                });
            });
        });
    });

    const checkTurnOnEvent = () => describe('Администрирование / Реаккции на события.' +
        'Проверка реакции на событие с включеныым параметров Активирован.', () => {

        befPosition();
        aft();

        describe('Добавление должности', () => {
            decorate.el.butIcBefore.handler({
                icon: but.add,
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
            decorate.modal.addPosition.init({
                timeout: entry.max
            });
            decorate.el.input.sendKeys({
                title: 'Название',
                placeholder: '',
                value: data.position1,
                timeout: entry.max
            });
            decorate.el.button.handler({
                name: 'Сохранить',
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
            decorate.modal.addPosition.initClose({
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
        });

        describe('Открытие подраздела События системы и проверка отображения рассылки', () => {
            decorate.el.section.handler({
                section: sec.adm,
                timeout: entry.max
            });
            decorate.el.subsection.handler({
                subsection: sub.adm.event,
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
            decorate.el.table.cellGetText({
                headTitle: 'События',
                strNumber: 1,
                cellNumber: 2,
                value: data.eventaction1.eventName,
                timeout: entry.max
            });
            decorate.el.table.strDoubleHandler({
                strNumber: 1,
                timeout: entry.max
            });
            decorate.modal.modalEventSystem.init({
                timeout: entry.max
            });
            decorate.modal.modalEventSystem.getTextTag({
                tag: 'app-event-system-details',
                text: data.eventaction1.eventBody,
                timeout: entry.max
            });
            decorate.modal.modalEventSystem.closeHandler({
                timeout: entry.max
            });
            decorate.modal.modalEventSystem.initClose({
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
        });
    });

    const checkTurnOffEvent = () => describe('Администрирование / Реаккции на события.' +
        'Проверка реакции на событие с выключеныым параметров Активирован.', () => {

        describe('Отключение реакции на события', () => {
            bef();
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
            decorate.el.checkbox.handler({
                name: 'Активирован',
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
            decorate.el.checkbox.unchecked({
                name: 'Активирован',
                timeout: entry.max
            });
            decorate.el.button.handler({
                name: 'Сохранить изменения',
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
        });

        describe('Проверка', () => {
            befPosition();
            aft();

            describe('Добавление должности', () => {
                decorate.el.butIcBefore.handler({
                    icon: but.add,
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.modal.addPosition.init({
                    timeout: entry.max
                });
                decorate.el.input.sendKeys({
                    title: 'Название',
                    placeholder: '',
                    value: data.position2,
                    timeout: entry.max
                });
                decorate.el.button.handler({
                    name: 'Сохранить',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.modal.addPosition.initClose({
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
            });

            describe('Открытие подраздела События системы и проверка отображения рассылки', () => {
                decorate.el.section.handler({
                    section: sec.adm,
                    timeout: entry.max
                });
                decorate.el.subsection.handler({
                    subsection: sub.adm.event,
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.table.cellGetText({
                    headTitle: 'События',
                    strNumber: 1,
                    cellNumber: 2,
                    value: data.positionEvent,
                    timeout: entry.max
                });
            });
        });
    });

    const editEvent = () => describe('Администрирование / Реаккции на события.' +
        'Редактирование реакции на событие.', () => {

        describe('Редактирование', () => {
            bef();
            aft();

            describe('Редактирование общих параметров', () => {
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
                decorate.el.input.backSpace({
                    title: 'Название',
                    placeholder: '',
                    timeout: entry.max
                });
                decorate.el.input.sendKeys({
                    title: 'Название',
                    placeholder: '',
                    value: data.eventaction2.name,
                    timeout: entry.max
                });
                decorate.el.checkbox.handler({
                    name: 'Активирован',
                    timeout: entry.max
                });
            });

            describe('Редактирование условия', () => {
                decorate.page.eventactionChange.deleteCondition({
                    icon: 'unsorted_delete_outline_android',
                    num: 1,
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.page.eventactionChange.addCondition({
                    icon: but.unsorted_add_outline,
                    timeout: entry.max
                });
                decorate.el.menu.menu({
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.menu.handler({
                    name: 'Добавить событие',
                    timeout: entry.max
                });
                decorate.modal.eventActionSelect.init({
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.modal.eventActionSelect.inputSendKeys({
                    title: '',
                    placeholder: 'Поиск...',
                    value: data.eventaction2.condition,
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.modal.eventActionSelect.handler({
                    text: data.eventaction2.condition,
                    classed: 'pwEAItem',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.button.handler({
                    name: 'Выбрать',
                    timeout: entry.max
                });
            });

            describe('Редактирование действия', () => {
                decorate.page.eventactionChange.deleteAction({
                    icon: 'unsorted_delete_outline_android',
                    num: 1,
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.page.eventactionChange.addAction({
                    icon: but.unsorted_add_outline,
                    timeout: entry.max
                });
                decorate.el.menu.menu({
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.menu.handler({
                    name: 'Выполнить http-запрос',
                    timeout: entry.max
                });
                decorate.modal.httpRequest.init({
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.input.sendKeys({
                    title: 'Строка запроса в формате http://... или https://...',
                    placeholder: '',
                    value: data.eventaction2.request,
                    timeout: entry.max
                });
                decorate.el.button.handler({
                    name: 'Сохранить',
                    timeout: entry.max
                });
                decorate.modal.httpRequest.initClose({
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
            });

            describe('Сохранение', () => {
                decorate.el.button.handler({
                    name: 'Сохранить изменения',
                    timeout: entry.max
                });
                decorate.init.eventaction();
            });

        });

        describe('Проверка', () => {
            bef();
            aft();

            describe('Проверка таблицы', () => {
                decorate.el.table.cellGetText({
                    headTitle: 'Название',
                    strNumber: 1,
                    cellNumber: 1,
                    value: data.eventaction2.name,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Тип',
                    strNumber: 1,
                    cellNumber: 3,
                    value: 'Реакция на события',
                    timeout: entry.max
                });
                decorate.el.checkbox.checked({
                    name: '',
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
                decorate.el.input.getValue({
                    title: 'Название',
                    placeholder: '',
                    value: data.eventaction2.name,
                    timeout: entry.max
                });
                decorate.el.checkbox.checked({
                    name: 'Активирован',
                    timeout: entry.max
                });
                decorate.page.eventactionChange.conditionColumnName({
                    name: 'Условия',
                    timeout: entry.max
                });
                decorate.page.eventactionChange.conditionTitle({
                    num: 1,
                    title: data.eventaction2.conditionTitle,
                    timeout: entry.max
                });
                decorate.page.eventactionChange.conditionName({
                    num: 1,
                    name: data.eventaction2.conditionDescription,
                    timeout: entry.max
                });
                decorate.page.eventactionChange.actionColumnName({
                    name: 'Действие',
                    timeout: entry.max
                });
                decorate.page.eventactionChange.actionTitle({
                    num: 1,
                    title: data.eventaction2.actionTitle,
                    timeout: entry.max
                });
                decorate.page.eventactionChange.actionName({
                    num: 1,
                    name: data.eventaction2.actionDescription,
                    timeout: entry.max
                });
            });
        });

        describe('Проверка реакции', () => {

            befPosition();
            aft();

            describe('Удаление должностей', () => {
                decorate.el.table.strHandler({
                    strNumber: 2,
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.butIcBefore.handler({
                    icon: but.delete,
                    timeout: entry.max
                });
                decorate.modalConfirm.positionDelete.init({
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.button.handler({
                    name: 'Удалить',
                    timeout: entry.max
                });
                decorate.modalConfirm.positionDelete.initClose({
                    timeout: entry.max
                });

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
                decorate.modalConfirm.positionDelete.init({
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.button.handler({
                    name: 'Удалить',
                    timeout: entry.max
                });
                decorate.modalConfirm.positionDelete.initClose({
                    timeout: entry.max
                });
            });

            describe('Открытие подраздела События системы и проверка отображения рассылки', () => {
                decorate.el.section.handler({
                    section: sec.adm,
                    timeout: entry.max
                });
                decorate.el.subsection.handler({
                    subsection: sub.adm.event,
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.table.cellGetText({
                    headTitle: 'События',
                    strNumber: 1,
                    cellNumber: 2,
                    value: data.eventaction2.eventName,
                    timeout: entry.max
                });
                decorate.el.table.strDoubleHandler({
                    strNumber: 1,
                    timeout: entry.max
                });
                decorate.modal.modalEventSystem.init({
                    timeout: entry.max
                });
                decorate.modal.modalEventSystem.getTextTag({
                    tag: 'app-event-system-details',
                    text: data.eventaction2.eventBody,
                    timeout: entry.max
                });
                decorate.modal.modalEventSystem.closeHandler({
                    timeout: entry.max
                });
                decorate.modal.modalEventSystem.initClose({
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
            });
        });
    });

    const addEventDevice = () => describe('Администрирование / Реаккции на события. Добавление внутренней реакции ' +
        'на событие контроллера.', () => {

        describe('Добавление', () => {
            bef();
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
                name: 'Добавить внутреннюю реакцию на событие контроллера',
                timeout: entry.max
            });
            decorate.modal.hardwareAdd.init({
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });

            decorate.el.input.sendKeys({
                title: 'Название',
                placeholder: '',
                value: data.eventaction3.name,
                timeout: entry.max
            });

            decorate.el.selectInput.iconXpand({
                title: 'Контроллер',
                placeholder: 'Выберите устройство',
                timeout: entry.max
            });
            decorate.el.selectXpand.xpand({
                timeout: entry.max
            });
            decorate.el.selectXpand.handler({
                value: entry.device_name_1,
                timeout: entry.max
            });
            decorate.el.selectXpand.xpandNoElement({
                timeout: entry.max
            });

            decorate.el.select.iconXpand({
                title: 'Ресурс',
                value: 'Выбрать ресурс',
                text: data.eventaction3.resource,
                timeout: entry.max
            });
            decorate.el.select.iconXpand({
                title: 'Событие',
                value: 'Активизация входа FireAlarm',
                text: data.eventaction3.condition,
                timeout: entry.max
            });
            decorate.el.select.iconXpand({
                title: 'Действие',
                value: 'Активизировать выход',
                text: data.eventaction3.action,
                timeout: entry.max
            });
            decorate.el.select.iconXpand({
                title: 'Контакт',
                value: '',
                text: data.eventaction3.contact,
                timeout: entry.max
            });
            decorate.el.select.iconXpand({
                title: 'Тип реакции',
                value: 'Время срабатывания',
                text: data.eventaction3.type,
                timeout: entry.max
            });
            decorate.el.select.iconXpand({
                title: 'Время',
                value: 'Бесконечность',
                text: data.eventaction3.time,
                timeout: entry.max
            });
            decorate.el.button.handler({
                name: 'Сохранить',
                timeout: entry.max
            });
            decorate.modal.hardwareAdd.initClose({
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
        });

        describe('Проверка', () => {
            bef();
            aft();

            describe('Проверка таблицы', () => {
                decorate.el.table.cellGetText({
                    headTitle: 'Название',
                    strNumber: 1,
                    cellNumber: 1,
                    value: data.eventaction3.name,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Тип',
                    strNumber: 1,
                    cellNumber: 3,
                    value: 'Внутренняя реакция на события',
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
                decorate.modal.hardwareEdit.init({
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });

                decorate.el.input.getValue({
                    title: 'Название',
                    placeholder: '',
                    value: data.eventaction3.name,
                    timeout: entry.max
                });
                decorate.el.input.getValue({
                    title: 'Контроллер',
                    placeholder: 'Выберите устройство',
                    value: entry.device_name_1,
                    timeout: entry.max
                });

                decorate.el.select.select({
                    title: 'Ресурс',
                    value: data.eventaction3.resource,
                    timeout: entry.max
                });
                decorate.el.select.select({
                    title: 'Событие',
                    value: data.eventaction3.condition,
                    timeout: entry.max
                });
                decorate.el.select.select({
                    title: 'Действие',
                    value: data.eventaction3.action,
                    timeout: entry.max
                });
                decorate.el.select.select({
                    title: 'Контакт',
                    value: data.eventaction3.contact,
                    timeout: entry.max
                });
                decorate.el.select.select({
                    title: 'Тип реакции',
                    value: data.eventaction3.type,
                    timeout: entry.max
                });
                decorate.el.select.select({
                    title: 'Время',
                    value: data.eventaction3.time,
                    timeout: entry.max
                });
                decorate.modal.hardwareEdit.closeHandler({
                    timeout: entry.max
                });
                decorate.modal.hardwareEdit.initClose({
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
            });
        });
    });

    const editEventDevice = () => describe('Администрирование / Реаккции на события. ' +
        'Редактирование внутренней реакции на событие контроллера.', () => {

        describe('Редактирование', () => {
            bef();
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
            decorate.modal.hardwareEdit.init({
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
                value: data.eventaction4.name,
                timeout: entry.max
            });

            decorate.el.selectInput.iconXpand({
                title: 'Контроллер',
                placeholder: 'Выберите устройство',
                timeout: entry.max
            });
            decorate.el.selectXpand.xpand({
                timeout: entry.max
            });
            decorate.el.selectXpand.handler({
                value: entry.device_name_1,
                timeout: entry.max
            });
            decorate.el.selectXpand.xpandNoElement({
                timeout: entry.max
            });

            decorate.el.select.iconXpand({
                title: 'Ресурс',
                value: data.eventaction3.resource,
                text: data.eventaction4.resource,
                timeout: entry.max
            });
            decorate.el.select.iconXpand({
                title: 'Событие',
                value: 'Активизация входа',
                text: data.eventaction4.condition,
                timeout: entry.max
            });
            decorate.el.select.iconXpand({
                title: 'Действие',
                value: data.eventaction3.action,
                text: data.eventaction4.action,
                timeout: entry.max
            });
            decorate.el.select.iconXpand({
                title: 'Контакт',
                value: '',
                text: data.eventaction4.contact,
                timeout: entry.max
            });
            decorate.el.select.iconXpand({
                title: 'Тип реакции',
                value: data.eventaction3.type,
                text: data.eventaction4.type,
                timeout: entry.max
            });
            decorate.el.select.iconXpand({
                title: 'Время',
                value:  data.eventaction3.time,
                text: data.eventaction4.time,
                timeout: entry.max
            });
            decorate.el.button.handler({
                name: 'Сохранить',
                timeout: entry.max
            });
            decorate.modal.hardwareAdd.initClose({
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
        });

        describe('Проверка', () => {
            bef();
            aft();

            describe('Проверка таблицы', () => {
                decorate.el.table.cellGetText({
                    headTitle: 'Название',
                    strNumber: 1,
                    cellNumber: 1,
                    value: data.eventaction4.name,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Тип',
                    strNumber: 1,
                    cellNumber: 3,
                    value: 'Внутренняя реакция на события',
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
                decorate.modal.hardwareEdit.init({
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });

                decorate.el.input.getValue({
                    title: 'Название',
                    placeholder: '',
                    value: data.eventaction4.name,
                    timeout: entry.max
                });
                decorate.el.input.getValue({
                    title: 'Контроллер',
                    placeholder: 'Выберите устройство',
                    value: entry.device_name_1,
                    timeout: entry.max
                });

                decorate.el.select.select({
                    title: 'Ресурс',
                    value: data.eventaction4.resource,
                    timeout: entry.max
                });
                decorate.el.select.select({
                    title: 'Событие',
                    value: data.eventaction4.condition,
                    timeout: entry.max
                });
                decorate.el.select.select({
                    title: 'Действие',
                    value: data.eventaction4.action,
                    timeout: entry.max
                });
                decorate.el.select.select({
                    title: 'Контакт',
                    value: data.eventaction4.contact,
                    timeout: entry.max
                });
                decorate.el.select.select({
                    title: 'Тип реакции',
                    value: data.eventaction4.type,
                    timeout: entry.max
                });
                decorate.el.select.select({
                    title: 'Время',
                    value: data.eventaction4.time,
                    timeout: entry.max
                });
                decorate.modal.hardwareEdit.closeHandler({
                    timeout: entry.max
                });
                decorate.modal.hardwareEdit.initClose({
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
            });
        });
    });

    const searchFilter = () => describe('Администрирование / Реаккции на события. Проверка фильтра "Поиск...".', () => {
        bef();
        aft();

        describe('Проверка таблицы до изпользования фильтра "Поиск..."', () => {
            decorate.el.table.size({
                strCount: 2,
                timeout: entry.max
            });
            decorate.el.table.cellGetText({
                headTitle: 'Название',
                strNumber: 1,
                cellNumber: 1,
                value: data.eventaction4.name,
                timeout: entry.max
            });
            decorate.el.table.cellGetText({
                headTitle: 'Название',
                strNumber: 2,
                cellNumber: 1,
                value: data.eventaction2.name,
                timeout: entry.max
            });
        });

        describe(`Ввод в фильтр "${data.eventaction2.name}"`, () => {
            decorate.el.input.sendKeys({
                title: '',
                placeholder: 'Поиск...',
                value: data.eventaction2.name,
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
        });

        describe('Проверка таблицы после измпользования фильтра "Поиск..."', () => {
            decorate.el.table.size({
                strCount: 1,
                timeout: entry.max
            });
            decorate.el.table.cellGetText({
                headTitle: 'Название',
                strNumber: 1,
                cellNumber: 1,
                value: data.eventaction2.name,
                timeout: entry.max
            });
        });

        describe(`Удаление "${data.eventaction2.name}" из фильтра "Поиск..." и проверка таблицы`, () => {
            decorate.el.input.backSpace({
                title: '',
                placeholder: 'Поиск...',
                timeout: entry.max
            });
            dec.animation();
            decorate.el.table.size({
                strCount: 2,
                timeout: entry.max
            });
            decorate.el.table.cellGetText({
                headTitle: 'Название',
                strNumber: 1,
                cellNumber: 1,
                value: data.eventaction4.name,
                timeout: entry.max
            });
            decorate.el.table.cellGetText({
                headTitle: 'Название',
                strNumber: 2,
                cellNumber: 1,
                value: data.eventaction2.name,
                timeout: entry.max
            });
        });
    });

    const addDuplicate = () => describe('Администрирование / Реаккции на события. Попытка дублирования.', () => {

        bef();
        aft();

        describe('Открытие на добавление и ввод названия', () => {
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
                name: 'Добавить реакцию на событие',
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
            decorate.page.eventactionChange.initAdd({
                timeout: entry.max
            });
            decorate.el.input.sendKeys({
                title: 'Название',
                placeholder: '',
                value: data.eventaction1.name,
                timeout: entry.max
            });
        });

        describe('Добавление условия', () => {
            decorate.page.eventactionChange.addCondition({
                icon: but.unsorted_add_outline,
                timeout: entry.max
            });
            decorate.el.menu.menu({
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
            decorate.el.menu.handler({
                name: 'Добавить событие',
                timeout: entry.max
            });
            decorate.modal.eventActionSelect.init({
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
            decorate.modal.eventActionSelect.inputSendKeys({
                title: '',
                placeholder: 'Поиск...',
                value: data.eventaction1.condition,
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
            decorate.modal.eventActionSelect.handler({
                text: data.eventaction1.condition,
                classed: 'pwEAItem',
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
            decorate.el.button.handler({
                name: 'Выбрать',
                timeout: entry.max
            });
        });

        describe('Добавление действия', () => {
            decorate.page.eventactionChange.addAction({
                icon: but.unsorted_add_outline,
                timeout: entry.max
            });
            decorate.el.menu.menu({
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
            decorate.el.menu.handler({
                name: 'Выполнить http-запрос',
                timeout: entry.max
            });
            decorate.modal.httpRequest.init({
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
            decorate.el.input.sendKeys({
                title: 'Строка запроса в формате http://... или https://...',
                placeholder: '',
                value: data.eventaction1.request,
                timeout: entry.max
            });
            decorate.el.button.handler({
                name: 'Сохранить',
                timeout: entry.max
            });
            decorate.modal.httpRequest.initClose({
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
        });

        describe('Сохранение', () => {
            decorate.el.button.handler({
                name: 'Сохранить изменения',
                timeout: entry.max
            });
            decorate.el.error.error({
                text: 'Данное имя уже используется',
                timeout: entry.max
            });
        });
    });

    const deleteEvents = () => describe('Администрирование / Реаккции на события. Проверка удаления.', () => {

        describe('Удаление реакции на события', () => {
            bef();
            aft();
            decorate.el.table.strHandler({
                strNumber: 2,
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
            decorate.el.butIcBefore.handler({
                icon: but.delete,
                timeout: entry.max
            });
            decorate.modalConfirm.deleteEventaction.init({
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
            decorate.el.button.handler({
                name: 'Удалить',
                timeout: entry.max
            });
            decorate.modalConfirm.deleteEventaction.initClose({
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
        });

        describe('Удаление внутренний реакции на события', () => {
            bef();
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
            decorate.modalConfirm.deleteEventaction.init({
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
            decorate.el.button.handler({
                name: 'Удалить',
                timeout: entry.max
            });
            decorate.modalConfirm.deleteEventaction.initClose({
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
        });

        describe('Проверка таблицы после удаления', () => {
            bef();
            aft();
            decorate.el.table.noStr({
                timeout: entry.max
            });
            decorate.el.rowEmpty.getText({
                value: 'Нет данных для отображения',
                timeout: entry.max
            });
        });
    });

    const addFailed = () => describe('Администрирование / Реаккции на события. ' +
        'Поптыка добавления реакции без обязательных параметров.', () => {

        bef();
        aft();

        describe('Поптыка добавление без условия и действия', () => {
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
                name: 'Добавить реакцию на событие',
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
            decorate.page.eventactionChange.initAdd({
                timeout: entry.max
            });
            decorate.el.input.sendKeys({
                title: 'Название',
                placeholder: '',
                value: data.eventaction1.name,
                timeout: entry.max
            });
            decorate.el.button.handler({
                name: 'Сохранить изменения',
                timeout: entry.max
            });
            decorate.el.error.error({
                text: 'Должно быть задано условие',
                timeout: entry.max
            });
            decorate.el.error.errorNoList({
                timeout: entry.max
            });
        });

        describe('Поптыка добавление без действия', () => {
            decorate.page.eventactionChange.addCondition({
                icon: but.unsorted_add_outline,
                timeout: entry.max
            });
            decorate.el.menu.menu({
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
            decorate.el.menu.handler({
                name: 'Добавить событие',
                timeout: entry.max
            });
            decorate.modal.eventActionSelect.init({
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
            decorate.modal.eventActionSelect.inputSendKeys({
                title: '',
                placeholder: 'Поиск...',
                value: data.eventaction1.condition,
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
            decorate.modal.eventActionSelect.handler({
                text: data.eventaction1.condition,
                classed: 'pwEAItem',
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
            decorate.el.button.handler({
                name: 'Выбрать',
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
            decorate.el.button.handler({
                name: 'Сохранить изменения',
                timeout: entry.max
            });
            decorate.el.error.error({
                text: 'Заполните все обязательные поля',
                timeout: entry.max
            });
            decorate.el.error.errorNoList({
                timeout: entry.max
            });
        });

        describe('Поптыка добавление без условия', () => {
            decorate.page.eventactionChange.deleteCondition({
                icon: 'unsorted_delete_outline_android',
                num: 1,
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
            decorate.page.eventactionChange.addAction({
                icon: but.unsorted_add_outline,
                timeout: entry.max
            });
            decorate.el.menu.menu({
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
            decorate.el.menu.handler({
                name: 'Выполнить http-запрос',
                timeout: entry.max
            });
            decorate.modal.httpRequest.init({
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
            decorate.el.input.sendKeys({
                title: 'Строка запроса в формате http://... или https://...',
                placeholder: '',
                value: data.eventaction1.request,
                timeout: entry.max
            });
            decorate.el.button.handler({
                name: 'Сохранить',
                timeout: entry.max
            });
            decorate.modal.httpRequest.initClose({
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
            decorate.el.button.handler({
                name: 'Сохранить изменения',
                timeout: entry.max
            });
            decorate.el.error.error({
                text: 'Должно быть задано условие',
                timeout: entry.max
            });
            decorate.el.error.errorNoList({
                timeout: entry.max
            });
        });

    });

    return {
        addEvent,
        addDuplicate,
        checkTurnOnEvent,
        checkTurnOffEvent,
        editEvent,
        addEventDevice,
        editEventDevice,
        searchFilter,
        deleteEvents,
        addFailed
    }
}

module.exports = {
    other: other()
}