const {describe, it, before, after} = require('mocha');
const {expect} = require('chai');

const entry = require('../../../../../../entry');
const page = require('../../../../pages');
const el = require('../../../../elements');
const dec = require('../../../../dictionaries/decorate');
const sec = require('../../../../dictionaries/section');
const sub = require('../../../../dictionaries/subsection');
const but = require('../../../../dictionaries/button-icon');
const icon = require('../../../../dictionaries/icon');
const api = require('../../../other/api');
const imp = require('../../../../upload-files');
const deleteData = require('../../../other/deleteData');
const oth = require('../../../other/other');
const decItApi = require('../../../../dictionaries/decorate-it-api');
const decorate = require('../../../../decorates');
const db = require('../../../../database');
const data = require('../../data').dataTemplate;

const befTemplate = () => before('Вход и открытие подраздела "Шаблоны доступа" вкладка "Шаблоны доступа"',
    async () => {
    await page.base.loading(entry.sleep1);
    await dec.auth(entry.customLogin, entry.customPassword);
    await dec.simple(el.section.handler, [sec.pas, entry.max], el.section);
    await dec.simple(el.subsection.handler, [sub.pas.visitor, entry.max], el.subsection);
    await dec.simple(el.tab.handler, ['Заказанные', entry.max], el.tab);
    await dec.simple(page.visitorOrdered.init, [entry.max], page.visitorOrdered);
    await page.base.loading(entry.sleep1);
});

const befAccess = () => before('Вход и открытие подраздела "Шаблоны доступа" вкладка "Временные критерии доступа"',
    async () => {
    await page.base.loading(entry.sleep1);
    await dec.auth(entry.customLogin, entry.customPassword);
    await dec.simple(el.section.handler, [sec.pas, entry.max], el.section);
    await dec.simple(el.subsection.handler, [sub.pas.template, entry.max], el.subsection);
    await dec.simple(el.tab.handler, ['Временные критерии доступа', entry.max], el.tab);
    await dec.simple(page.accessTemplateSchedulePage.init, [entry.max], page.accessTemplate);
    await page.base.loading(entry.sleep1);
});

const befCommission = () => before('Вход и открытие подраздела "Шаблоны доступа" вкладка "Комиссионирование"',
    async () => {
    await page.base.loading(entry.sleep1);
    await dec.auth(entry.customLogin, entry.customPassword);
    await dec.simple(el.section.handler, [sec.pas, entry.max], el.section);
    await dec.simple(el.subsection.handler, [sub.pas.visitor, entry.max], el.subsection);
    await dec.simple(el.tab.handler, ['Архив', entry.max], el.tab);
    await dec.simple(page.visitorArchive.init, [entry.max], page.visitorArchive);
    await page.base.loading(entry.sleep1);
});

const aft = () => after('Выход', async () => {
    await page.base.loading(entry.sleep1);
    await dec.exit();
});

const other = (type, text) => {

    const add = () => describe(text + 'Добавление.', () => {
        if(type === 'zone') {
            befAccess();
            aft();

            const params = {
                name: 'TZMaxParamsMaxIntervalName',
                description: 'TZMaxParamsMaxIntervalDescription',
                interval_1: {
                    start: '00:00',
                    end: '05:59',
                },
                interval_2: {
                    start: '06:00',
                    end: '11:59',
                },
                interval_3: {
                    start: '17:00',
                    end: '23:59',
                },
                interval_4: {
                    start: '12:00',
                    end: '16:59',
                },
            };

            describe('Добавление', () => {

                bef();
                aft();

                it('Нажатие кнопки "Добавить"', async () => await dec.simple(el.butIcBefore.handler,
                    [but.add, entry.max],
                    el.butIcBefore));

                it('Отображение "title", "url"',
                    async () => await dec.simple(page.accessTemplateScheduleChangePage.initAdd,
                        [entry.max],
                        page.accessTemplateScheduleChangePage));

                it('Ввода "Название"', async () => await dec.simple(el.input.sendKeys,
                    ['Название', '', params.name, entry.max],
                    el.input));

                it('Ввода "Описание"', async () => await dec.simple(el.input.sendKeys,
                    ['Описание', '', params.description, entry.max],
                    el.input));

                it('Выбор значения "Временные зоны" в поле выбора "Временной критерий"',
                    async () => await dec.simple(el.select.iconXpand,
                        ['Временной критерий', '', 'Временные зоны', entry.max],
                        el.select));

                it('Добавление 1 произвольного временного блока',
                    async () => await dec.simple(page.accessTemplateScheduleChangePage.addInterval,
                        [1, entry.max],
                        page.accessTemplateScheduleChangePage));

                it('Отображение 1 произвольного временного блока', async () => await dec.simple(page.accessTemplateScheduleChangePage.time,
                    [1, 1, entry.max],
                    page.accessTemplateScheduleChangePage));

                it('Ввод начала 1 временного блока',
                    async () => await dec.simple(page.accessTemplateScheduleChangePage.startTimeSendKeys,
                        [1, 1, params.interval_1.start, entry.max],
                        page.accessTemplateScheduleChangePage));

                it('Ввод окончания 1 временного блока',
                    async () => await dec.simple(page.accessTemplateScheduleChangePage.endTimeSendKeys,
                        [1, 1, params.interval_1.end, entry.max],
                        page.accessTemplateScheduleChangePage));

                it('Добавление 2 временного блока',
                    async () => await dec.simple(page.accessTemplateScheduleChangePage.addInterval,
                        [1, entry.max],
                        page.accessTemplateScheduleChangePage));

                it('Отображение 2 произвольного временного блока',
                    async () => await dec.simple(page.accessTemplateScheduleChangePage.time,
                        [1, 2, entry.max],
                        page.accessTemplateScheduleChangePage));

                it('Ввод начала 2 временного блока',
                    async () => await dec.simple(page.accessTemplateScheduleChangePage.startTimeSendKeys,
                        [1, 2, params.interval_2.start, entry.max],
                        page.accessTemplateScheduleChangePage));

                it('Ввод окончания 2 временного блока',
                    async () => await dec.simple(page.accessTemplateScheduleChangePage.endTimeSendKeys,
                        [1, 2, params.interval_2.end, entry.max],
                        page.accessTemplateScheduleChangePage));

                it('Добавление 3 временного блока',
                    async () => await dec.simple(page.accessTemplateScheduleChangePage.addInterval,
                        [1, entry.max],
                        page.accessTemplateScheduleChangePage));

                it('Отображение 3 произвольного временного блока', async () => await dec.simple(page.accessTemplateScheduleChangePage.time,
                    [1, 3, entry.max],
                    page.accessTemplateScheduleChangePage));

                it('Ввод окончания 3 временного блока',
                    async () => await dec.simple(page.accessTemplateScheduleChangePage.endTimeSendKeys,
                        [1, 3, params.interval_3.end, entry.max],
                        page.accessTemplateScheduleChangePage));

                it('Ввод начала 3 временного блока',
                    async () => await dec.simple(page.accessTemplateScheduleChangePage.startTimeSendKeys,
                        [1, 3, params.interval_3.start, entry.max],
                        page.accessTemplateScheduleChangePage));

                it('Добавление 4 временного блока',
                    async () => await dec.simple(page.accessTemplateScheduleChangePage.addInterval,
                        [1, entry.max],
                        page.accessTemplateScheduleChangePage));

                it('Отображение 4 произвольного временного блока', async () => await dec.simple(page.accessTemplateScheduleChangePage.time,
                    [1, 3, entry.max],
                    page.accessTemplateScheduleChangePage));

                it('Ввод начала 4 временного блока',
                    async () => await dec.simple(page.accessTemplateScheduleChangePage.startTimeSendKeys,
                        [1, 3, params.interval_4.start, entry.max],
                        page.accessTemplateScheduleChangePage));

                it('Ввод окончания 4 временного блока',
                    async () => await dec.simple(page.accessTemplateScheduleChangePage.endTimeSendKeys,
                        [1, 3, params.interval_4.end, entry.max],
                        page.accessTemplateScheduleChangePage));

                it('Нажатие кнопки "Сохранить изменения"', async () => await dec.simple(el.button.handler,
                    ['Сохранить изменения', entry.max],
                    el.button));

                it('Отображение уведомления "Сохранено успешно"', async () => await dec.simple(el.success.success,
                    ['Сохранено успешно', entry.max],
                    el.success));
            });

            checkTable(params.name, params.description, 'Временные зоны');

            describe('Проверка параметров', () => {

                bef();
                aft();

                it('Ввод в "Поиск..."', async () => await dec.simple(el.input.sendKeys,
                    ['', 'Поиск...', params.name, entry.max],
                    el.input));

                it('Отображение в таблице одной строки', async () => await dec.simple(el.table.singleSize,
                    [entry.max],
                    el.table));

                it('Нажатие по первой строке таблицы', async () => await dec.simple(el.table.strHandler,
                    [1, entry.max],
                    el.table));

                it('Нажатие кнопки "Редактировать"', async () => await dec.simple(el.butIcBefore.handler,
                    [but.edit, entry.max],
                    el.butIcBefore));

                it('Отображение "title", "url"',
                    async () => await dec.simple(page.accessTemplateScheduleChangePage.initEdit,
                        [entry.max],
                        page.accessTemplateScheduleChangePage));

                it('Проверка "Название"', async () => await dec.simpleText(el.input.getValue,
                    ['Название', '', entry.max],
                    params.name,
                    el.input));

                it('Проверка "Описание"', async () => await dec.simpleText(el.input.getValue,
                    ['Описание', '', entry.max],
                    params.description,
                    el.input));

                it('Проверка "Временной критерий"', async () => await dec.simpleText(el.select.getText,
                    ['Временной критерий', 'Временные зоны', entry.max],
                    'Временные зоны',
                    el.input));

                it('Отображение интервала', async () => await dec.simple(page.accessTemplateScheduleChangePage.interval,
                    [1, entry.max],
                    page.accessTemplateScheduleChangePage));

                it('Отображение 1 временного блока',async () => await dec.simple(page.accessTemplateScheduleChangePage.time,
                    [1, 1, entry.max],
                    page.accessTemplateScheduleChangePage));

                it('Начало 1 временного блока',
                    async () => await dec.simpleText(page.accessTemplateScheduleChangePage.startTimeGetValue,
                        [1, 1, entry.max],
                        params.interval_1.start,
                        page.accessTemplateScheduleChangePage));

                it('Окончание 1 временного блока',
                    async () => await dec.simpleText(page.accessTemplateScheduleChangePage.endTimeGetValue,
                        [1, 1, entry.max],
                        params.interval_1.end,
                        page.accessTemplateScheduleChangePage));

                it('Отображение 2 временного блока',async () => await dec.simple(page.accessTemplateScheduleChangePage.time,
                    [1, 2, entry.max],
                    page.accessTemplateScheduleChangePage));

                it('Начало 2 временного блока',
                    async () => await dec.simpleText(page.accessTemplateScheduleChangePage.startTimeGetValue,
                        [1, 2, entry.max],
                        params.interval_2.start,
                        page.accessTemplateScheduleChangePage));

                it('Окончание 2 временного блока',
                    async () => await dec.simpleText(page.accessTemplateScheduleChangePage.endTimeGetValue,
                        [1, 2, entry.max],
                        params.interval_2.end,
                        page.accessTemplateScheduleChangePage));

                it('Отображение 3 временного блока',async () => await dec.simple(page.accessTemplateScheduleChangePage.time,
                    [1, 3, entry.max],
                    page.accessTemplateScheduleChangePage));

                it('Начало 3 временного блока',
                    async () => await dec.simpleText(page.accessTemplateScheduleChangePage.startTimeGetValue,
                        [1, 3, entry.max],
                        params.interval_4.start,
                        page.accessTemplateScheduleChangePage));

                it('Окончание 3 временного блока',
                    async () => await dec.simpleText(page.accessTemplateScheduleChangePage.endTimeGetValue,
                        [1, 3, entry.max],
                        params.interval_4.end,
                        page.accessTemplateScheduleChangePage));

                it('Отображение 4 временного блока',async () => await dec.simple(page.accessTemplateScheduleChangePage.time,
                    [1, 4, entry.max],
                    page.accessTemplateScheduleChangePage));

                it('Начало 4 временного блока',
                    async () => await dec.simpleText(page.accessTemplateScheduleChangePage.startTimeGetValue,
                        [1, 4, entry.max],
                        params.interval_3.start,
                        page.accessTemplateScheduleChangePage));

                it('Окончание 4 временного блока',
                    async () => await dec.simpleText(page.accessTemplateScheduleChangePage.endTimeGetValue,
                        [1, 4, entry.max],
                        params.interval_3.end,
                        page.accessTemplateScheduleChangePage));
            });

            deleteParams();
        }
    });

    const edit = () => describe(text + 'Редактирование.', () => {
        if('zone') {
            describe('API добавление', () => {
                befAccess();
                aft();
                it('Добавление', async () => {
                    const cook = await page.base.getCookie('token');
                    const tz = {
                        name: data.zone.name,
                        comment: '',
                        items: data.zone.intervalsValue
                    }
                    await dec.simple(api.putArrayTimeZone,
                        [[tz], cook.text],
                        api.putArrayTimeZone);
                });
            });

            describe('Редактирование', () => {
                befAccess();
                aft();
                decorate.el.butIcBefore.handler({
                    icon: but.add,
                    timeout: entry.max
                });
                decorate.init.accessScheduleChangeAdd();
                decorate.el.input.backSpace({
                    title: 'Название',
                    placeholder: '',
                    timeout: entry.max
                });
                decorate.el.input.sendKeys({
                    title: 'Название',
                    placeholder: '',
                    value: data.zoneUpdate.name,
                    timeout: entry.max
                });
                decorate.el.input.sendKeys({
                    title: 'Описание',
                    placeholder: '',
                    value: data.zoneUpdate.description,
                    timeout: entry.max
                });
                decorate.el.select.getText({
                    title: 'Временной критерий',
                    value: 'Временные зоны',
                    timeout: entry.max
                })
            });
        }
    });

    const deleted = () => describe(text + 'Удаление.', () => {

    });

    return {
        add
    }
}

module.exports = {
    otherZone: other('zone', 'Бюро пропусков / Шаблоны доступа - вкладка - Временные критерии доступа - тип - Временные зоны. '),
    otherWeek: other('week', 'Бюро пропусков / Шаблоны доступа - вкладка - Временные критерии доступа. '),
    otherSlidZ: other('slideZ', 'Бюро пропусков / Шаблоны доступа - вкладка - Временные критерии доступа. '),
    otherSlidW: other('slidW', 'Бюро пропусков / Шаблоны доступа - вкладка - Временные критерии доступа. '),
    otherTemplate: other('template', 'Бюро пропусков / Шаблоны доступа - вкладка - Шаблоны доступа. '),
    otherCommission: other('commission', 'Бюро пропусков / Шаблоны доступа - вкладка - Комиссионирование. '),
}