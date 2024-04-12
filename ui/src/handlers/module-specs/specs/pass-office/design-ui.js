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

const befDesign = () => before('Вход и открытие подраздела "Дизайн пропуска"',
    async () => {
        await page.base.loading(entry.sleep1);
        await dec.auth(entry.customLogin, entry.customPassword);
        await dec.simple(el.section.handler, [sec.pas, entry.max], el.section);
        await dec.simple(el.subsection.handler, [sub.pas.design, entry.max], el.subsection);
        await dec.simple(page.design.init, [entry.max], page.design);
        await page.base.loading(entry.sleep1);
    });

const aft = () => after('Выход', async () => {
    await page.base.loading(entry.sleep1);
    await dec.exit();
});

const other = (type, text) => {

    const add = () => describe(text + 'Добавление.', () => {
        if(type === 'week') {
            describe('Добавление', () => {
                befAccess();
                aft();
                decorate.el.butIcBefore.handler({
                    icon: but.add,
                    timeout: entry.max
                });
                decorate.init.accessScheduleChangeAdd();
                decorate.el.input.sendKeys({
                    title: 'Название',
                    placeholder: '',
                    value: data.week.name,
                    timeout: entry.max
                });
                decorate.el.select.iconXpand({
                    title: 'Временной критерий',
                    value: '',
                    text: 'Недельный график',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.page.accessTemplateScheduleChange.handler({
                    numInterval: 1,
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.page.accessTemplateScheduleChange.intervalActive({
                    numInterval: 1,
                    timeout: entry.max
                });
                decorate.el.button.handler({
                    name: 'Редактировать',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.modal.timeZone.init({
                    timeout: entry.max
                });
                decorate.modal.timeZone.intervalHandler({
                    numInterval: 3,
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.modal.timeZone.intervalActive({
                    timeout: entry.max
                });
                decorate.el.button.handler({
                    name: 'Применить'
                });
                decorate.modal.timeZone.initClose({
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.button.handler({
                    name: 'Сохранить изменения',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.success.success({
                    text: 'Сохранено успешно',
                    timeout: entry.max
                });
                decorate.init.accessSchedule();
            });

            describe('Проверка', () => {
                befAccess();
                aft();

                describe('Проверка таблицы', () => {
                    decorate.el.table.size({
                        strCount: 5,
                        timeout: entry.max
                    });
                    decorate.el.table.cellGetText({
                        headTitle: 'Название',
                        strNumber: 1,
                        cellNumber: 1,
                        value: data.week.name,
                        timeout: entry.max
                    });
                    decorate.el.table.cellGetText({
                        headTitle: 'Описание',
                        strNumber: 1,
                        cellNumber: 2,
                        value: '',
                        timeout: entry.max
                    });
                    decorate.el.table.cellGetText({
                        headTitle: 'Тип',
                        strNumber: 1,
                        cellNumber: 3,
                        value: 'Недельный график',
                        timeout: entry.max
                    });
                });

                describe('Проверка параметров', () => {
                    decorate.el.table.strHandler({
                        strNumber: 1,
                        timeout: entry.max
                    });
                    decorate.el.butIcBefore.handler({
                        icon: but.edit,
                        timeout: entry.max
                    });
                    decorate.init.accessScheduleChangeEdit();
                    decorate.el.input.getValue({
                        title: 'Название',
                        placeholder: '',
                        value: data.week.name,
                        timeout: entry.max
                    });
                    decorate.el.input.getValue({
                        title: 'Описание',
                        placeholder: '',
                        value: '',
                        timeout: entry.max
                    });
                    decorate.el.select.getText({
                        title: 'Временной критерий',
                        value: 'Недельный график',
                        timeout: entry.max
                    });
                    decorate.page.accessTemplateScheduleChange.intervalTitle({
                        numInterval: 1,
                        value: 'ПН',
                        timeout: entry.max
                    });
                    decorate.page.accessTemplateScheduleChange.intervalName({
                        numInterval: 1,
                        value: data.zoneUpdate.name,
                        timeout: entry.max
                    });
                    decorate.page.accessTemplateScheduleChange.startTimeGetValue({
                        numInterval: 1,
                        numTime: 1,
                        value: data.zoneUpdate.intervals[0].begin,
                        timeout: entry.max
                    });
                    decorate.page.accessTemplateScheduleChange.endTimeGetValue({
                        numInterval: 1,
                        numTime: 1,
                        value: data.zoneUpdate.intervals[0].end,
                        timeout: entry.max
                    });
                });
            });
        }

    });

    const edit = () => describe(text + 'Редактирование.', () => {
        if(type === 'zone') {
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
                decorate.el.table.strHandler({
                    strNumber: 1,
                    timeout: entry.max
                });
                decorate.el.butIcBefore.handler({
                    icon: but.edit,
                    timeout: entry.max
                });
                decorate.init.accessScheduleChangeEdit();
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
                decorate.page.accessTemplateScheduleChange.timeRemove({
                    numInterval: 1,
                    numTime: 4,
                    timeout: entry.max
                });
                decorate.page.accessTemplateScheduleChange.timeRemove({
                    numInterval: 1,
                    numTime: 3,
                    timeout: entry.max
                });
                decorate.page.accessTemplateScheduleChange.timeRemove({
                    numInterval: 1,
                    numTime: 2,
                    timeout: entry.max
                });
                decorate.page.accessTemplateScheduleChange.startTimeSendKeys({
                    numInterval: 1,
                    numTime: 1,
                    value: data.zoneUpdate.intervals[0].begin,
                    timeout: entry.max
                });
                decorate.page.accessTemplateScheduleChange.endTimeSendKeys({
                    numInterval: 1,
                    numTime: 1,
                    value: data.zoneUpdate.intervals[0].end,
                    timeout: entry.max
                });
                decorate.el.button.handler({
                    name: 'Сохранить изменения',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.success.success({
                    text: 'Сохранено успешно',
                    timeout: entry.max
                });
                decorate.init.accessSchedule();
            });

            describe('Проверка', () => {
                befAccess();
                aft();

                describe('Проверка таблицы', () => {
                    decorate.el.table.size({
                        strCount: 4,
                        timeout: entry.max
                    });
                    decorate.el.table.cellGetText({
                        headTitle: 'Название',
                        strNumber: 1,
                        cellNumber: 1,
                        value: data.zoneUpdate.name,
                        timeout: entry.max
                    });
                    decorate.el.table.cellGetText({
                        headTitle: 'Описание',
                        strNumber: 1,
                        cellNumber: 2,
                        value: data.zoneUpdate.description,
                        timeout: entry.max
                    });
                    decorate.el.table.cellGetText({
                        headTitle: 'Тип',
                        strNumber: 1,
                        cellNumber: 3,
                        value: 'Временные зоны',
                        timeout: entry.max
                    });
                });

                describe('Проверка параметров', () => {
                    decorate.el.table.strHandler({
                        strNumber: 1,
                        timeout: entry.max
                    });
                    decorate.el.butIcBefore.handler({
                        icon: but.edit,
                        timeout: entry.max
                    });
                    decorate.init.accessScheduleChangeEdit();
                    decorate.el.input.getValue({
                        title: 'Название',
                        placeholder: '',
                        value: data.zoneUpdate.name,
                        timeout: entry.max
                    });
                    decorate.el.input.getValue({
                        title: 'Описание',
                        placeholder: '',
                        value: data.zoneUpdate.description,
                        timeout: entry.max
                    });
                    decorate.el.select.getText({
                        title: 'Временной критерий',
                        value: 'Временные зоны',
                        timeout: entry.max
                    });
                    decorate.page.accessTemplateScheduleChange.startTimeGetValue({
                        numInterval: 1,
                        numTime: 1,
                        value: data.zoneUpdate.intervals[0].begin,
                        timeout: entry.max
                    });
                    decorate.page.accessTemplateScheduleChange.endTimeGetValue({
                        numInterval: 1,
                        numTime: 1,
                        value: data.zoneUpdate.intervals[0].end,
                        timeout: entry.max
                    });
                });
            });
        }

        if(type === 'week') {
            describe('Редактирование', () => {
                befAccess();
                aft();
                decorate.el.table.strHandler({
                    strNumber: 1,
                    timeout: entry.max
                });
                decorate.el.butIcBefore.handler({
                    icon: but.edit,
                    timeout: entry.max
                });
                decorate.init.accessScheduleChangeEdit();
                decorate.el.input.backSpace({
                    title: 'Название',
                    placeholder: '',
                    timeout: entry.max
                });
                decorate.el.input.sendKeys({
                    title: 'Название',
                    placeholder: '',
                    value: data.weekUpdate.name,
                    timeout: entry.max
                });
                decorate.el.input.sendKeys({
                    title: 'Описание',
                    placeholder: '',
                    value: data.weekUpdate.description,
                    timeout: entry.max
                });
                weekData.forEach((item, index) => {
                    decorate.page.accessTemplateScheduleChange.handler({
                        numInterval: index + 1,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.page.accessTemplateScheduleChange.intervalActive({
                        numInterval: index + 1,
                        timeout: entry.max
                    });
                    decorate.el.button.handler({
                        name: 'Редактировать',
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.modal.timeZone.init({
                        timeout: entry.max
                    });
                    decorate.modal.timeZone.intervalHandler({
                        numInterval: 3,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.modal.timeZone.intervalActive({
                        timeout: entry.max
                    });
                    decorate.el.button.handler({
                        name: 'Применить'
                    });
                    decorate.modal.timeZone.initClose({
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                });
                decorate.el.button.handler({
                    name: 'Сохранить изменения',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.success.success({
                    text: 'Сохранено успешно',
                    timeout: entry.max
                });
                decorate.init.accessSchedule();
            });

            describe('Проверка', () => {
                befAccess();
                aft();

                describe('Проверка таблицы', () => {
                    decorate.el.table.size({
                        strCount: 5,
                        timeout: entry.max
                    });
                    decorate.el.table.cellGetText({
                        headTitle: 'Название',
                        strNumber: 1,
                        cellNumber: 1,
                        value: data.weekUpdate.name,
                        timeout: entry.max
                    });
                    decorate.el.table.cellGetText({
                        headTitle: 'Описание',
                        strNumber: 1,
                        cellNumber: 2,
                        value: data.weekUpdate.description,
                        timeout: entry.max
                    });
                    decorate.el.table.cellGetText({
                        headTitle: 'Тип',
                        strNumber: 1,
                        cellNumber: 3,
                        value: 'Недельный график',
                        timeout: entry.max
                    });
                });

                describe('Проверка параметров', () => {
                    decorate.el.table.strHandler({
                        strNumber: 1,
                        timeout: entry.max
                    });
                    decorate.el.butIcBefore.handler({
                        icon: but.edit,
                        timeout: entry.max
                    });
                    decorate.init.accessScheduleChangeEdit();
                    decorate.el.input.getValue({
                        title: 'Название',
                        placeholder: '',
                        value: data.weekUpdate.name,
                        timeout: entry.max
                    });
                    decorate.el.input.getValue({
                        title: 'Описание',
                        placeholder: '',
                        value: data.weekUpdate.description,
                        timeout: entry.max
                    });
                    decorate.el.select.getText({
                        title: 'Временной критерий',
                        value: 'Недельный график',
                        timeout: entry.max
                    });
                    weekData.forEach((item ,index) => {
                        decorate.page.accessTemplateScheduleChange.intervalTitle({
                            numInterval: index + 1,
                            value: item,
                            timeout: entry.max
                        });
                        decorate.page.accessTemplateScheduleChange.intervalName({
                            numInterval: index + 1,
                            value: data.zoneUpdate.name,
                            timeout: entry.max
                        });
                        decorate.page.accessTemplateScheduleChange.startTimeGetValue({
                            numInterval: index + 1,
                            numTime: 1,
                            value: data.zoneUpdate.intervals[0].begin,
                            timeout: entry.max
                        });
                        decorate.page.accessTemplateScheduleChange.endTimeGetValue({
                            numInterval: index + 1,
                            numTime: 1,
                            value: data.zoneUpdate.intervals[0].end,
                            timeout: entry.max
                        });
                    });
                });
            });
        }

        if(type === 'slideTZ') {
            describe('Редактирование', () => {
                befAccess();
                aft();
                decorate.el.table.strHandler({
                    strNumber: 1,
                    timeout: entry.max
                });
                decorate.el.butIcBefore.handler({
                    icon: but.edit,
                    timeout: entry.max
                });
                decorate.init.accessScheduleChangeEdit();
                decorate.el.input.backSpace({
                    title: 'Название',
                    placeholder: '',
                    timeout: entry.max
                });
                decorate.el.input.sendKeys({
                    title: 'Название',
                    placeholder: '',
                    value: data.tzSlideUpdate.name,
                    timeout: entry.max
                });
                decorate.el.input.sendKeys({
                    title: 'Описание',
                    placeholder: '',
                    value: data.tzSlideUpdate.description,
                    timeout: entry.max
                });
                decorate.el.input.iconCalendar({
                    title: 'Дата начала смены',
                    placeholder: '',
                    timeout: entry.max
                });
                decorate.el.datepicker.dateParse({
                    day: '1',
                    month: 'Июнь',
                    year: '2023',
                    timeout: entry.max
                });

                decorate.el.butIcBefore.handler({
                    icon: but.add,
                    timeout: entry.max
                });
                decorate.modal.timeZone.init({
                    timeout: entry.max
                });
                decorate.modal.timeZone.intervalHandler({
                    numInterval: 2,
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.modal.timeZone.intervalActive({
                    timeout: entry.max
                });
                decorate.el.button.handler({
                    name: 'Применить'
                });
                decorate.modal.timeZone.initClose({
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });

                decorate.el.butIcBefore.handler({
                    icon: but.add,
                    timeout: entry.max
                });
                decorate.modal.timeZone.init({
                    timeout: entry.max
                });
                decorate.modal.timeZone.intervalHandler({
                    numInterval: 1,
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.modal.timeZone.intervalActive({
                    timeout: entry.max
                });
                decorate.el.button.handler({
                    name: 'Применить'
                });
                decorate.modal.timeZone.initClose({
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });

                decorate.page.accessTemplateScheduleChange.handler({
                    numInterval: 2,
                    timeout: entry.max
                });
                decorate.el.butIcBefore.handler({
                    icon: but.delete,
                    timeout: entry.max
                });

                decorate.page.accessTemplateScheduleChange.handler({
                    numInterval: 1,
                    timeout: entry.max
                });
                decorate.page.accessTemplateScheduleChange.intervalActive({
                    numInterval: 1,
                    timeout: entry.max
                });
                decorate.el.button.handler({
                    name: 'Редактировать',
                    timeout: entry.max
                });
                decorate.modal.timeZone.init({
                    timeout: entry.max
                });
                decorate.modal.timeZone.intervalHandler({
                    numInterval: 2,
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.modal.timeZone.intervalActive({
                    timeout: entry.max
                });
                decorate.el.button.handler({
                    name: 'Применить'
                });
                decorate.modal.timeZone.initClose({
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });

                decorate.page.accessTemplateScheduleChange.handler({
                    numInterval: 2,
                    timeout: entry.max
                });
                decorate.page.accessTemplateScheduleChange.intervalActive({
                    numInterval: 1,
                    timeout: entry.max
                });
                decorate.el.button.handler({
                    name: 'Редактировать',
                    timeout: entry.max
                });
                decorate.modal.timeZone.init({
                    timeout: entry.max
                });
                decorate.modal.timeZone.intervalHandler({
                    numInterval: 3,
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.modal.timeZone.intervalActive({
                    timeout: entry.max
                });
                decorate.el.button.handler({
                    name: 'Применить'
                });
                decorate.modal.timeZone.initClose({
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });

                decorate.el.button.handler({
                    name: 'Сохранить изменения',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.success.success({
                    text: 'Сохранено успешно',
                    timeout: entry.max
                });
                decorate.init.accessSchedule();
            });

            describe('Проверка', () => {
                befAccess();
                aft();

                describe('Проверка таблицы', () => {
                    decorate.el.table.size({
                        strCount: 6,
                        timeout: entry.max
                    });
                    decorate.el.table.cellGetText({
                        headTitle: 'Название',
                        strNumber: 1,
                        cellNumber: 1,
                        value: data.tzSlideUpdate.name,
                        timeout: entry.max
                    });
                    decorate.el.table.cellGetText({
                        headTitle: 'Описание',
                        strNumber: 1,
                        cellNumber: 2,
                        value: data.tzSlideUpdate.description,
                        timeout: entry.max
                    });
                    decorate.el.table.cellGetText({
                        headTitle: 'Тип',
                        strNumber: 1,
                        cellNumber: 3,
                        value: 'Скользящий посуточный график',
                        timeout: entry.max
                    });
                });

                describe('Проверка параметров', () => {
                    decorate.el.table.strHandler({
                        strNumber: 1,
                        timeout: entry.max
                    });
                    decorate.el.butIcBefore.handler({
                        icon: but.edit,
                        timeout: entry.max
                    });
                    decorate.init.accessScheduleChangeEdit();
                    decorate.el.input.getValue({
                        title: 'Название',
                        placeholder: '',
                        value: data.tzSlideUpdate.name,
                        timeout: entry.max
                    });
                    decorate.el.input.getValue({
                        title: 'Описание',
                        placeholder: '',
                        value: data.tzSlideUpdate.description,
                        timeout: entry.max
                    });
                    decorate.el.input.getValue({
                        title: 'Дата начала смены',
                        placeholder: '',
                        value: data.tzSlideUpdate.date,
                        timeout: entry.max
                    });
                    decorate.el.select.getText({
                        title: 'Временной критерий',
                        value: 'Скользящий посуточный график',
                        timeout: entry.max
                    });
                    decorate.page.accessTemplateScheduleChange.intervalTitle({
                        numInterval: 1,
                        value: 'День 1',
                        timeout: entry.max
                    });
                    decorate.page.accessTemplateScheduleChange.intervalName({
                        numInterval: 1,
                        value: 'Всегда',
                        timeout: entry.max
                    });
                    decorate.page.accessTemplateScheduleChange.startTimeGetValue({
                        numInterval: 1,
                        numTime: 1,
                        value: '00:00',
                        timeout: entry.max
                    });
                    decorate.page.accessTemplateScheduleChange.endTimeGetValue({
                        numInterval: 1,
                        numTime: 1,
                        value: '23:59',
                        timeout: entry.max
                    });
                    decorate.page.accessTemplateScheduleChange.intervalTitle({
                        numInterval: 2,
                        value: 'День 2',
                        timeout: entry.max
                    });
                    decorate.page.accessTemplateScheduleChange.intervalName({
                        numInterval: 2,
                        value: data.zoneUpdate.name,
                        timeout: entry.max
                    });
                    decorate.page.accessTemplateScheduleChange.startTimeGetValue({
                        numInterval: 2,
                        numTime: 1,
                        value: data.zoneUpdate.intervals[0].begin,
                        timeout: entry.max
                    });
                    decorate.page.accessTemplateScheduleChange.endTimeGetValue({
                        numInterval: 2,
                        numTime: 1,
                        value: data.zoneUpdate.intervals[0].end,
                        timeout: entry.max
                    });
                });
            });
        }

        if(type === 'slidW') {
            describe('Редактирование', () => {
                befAccess();
                aft();
                decorate.el.table.strHandler({
                    strNumber: 1,
                    timeout: entry.max
                });
                decorate.el.butIcBefore.handler({
                    icon: but.edit,
                    timeout: entry.max
                });
                decorate.init.accessScheduleChangeEdit();
                decorate.el.input.backSpace({
                    title: 'Название',
                    placeholder: '',
                    timeout: entry.max
                });
                decorate.el.input.sendKeys({
                    title: 'Название',
                    placeholder: '',
                    value: data.sSlideUpdate.name,
                    timeout: entry.max
                });
                decorate.el.input.sendKeys({
                    title: 'Описание',
                    placeholder: '',
                    value: data.sSlideUpdate.description,
                    timeout: entry.max
                });
                decorate.el.input.iconCalendar({
                    title: 'Дата начала смены',
                    placeholder: '',
                    timeout: entry.max
                });
                decorate.el.datepicker.dateParse({
                    day: '1',
                    month: 'Июнь',
                    year: '2023',
                    timeout: entry.max
                });
                decorate.page.accessTemplateScheduleChange.sWeekHandler({
                    strNum: 1,
                    timeout: entry.max
                });
                decorate.page.accessTemplateScheduleChange.sWeekSelectedList({
                    size: 2,
                    timeout: entry.max
                });
                decorate.page.accessTemplateScheduleChange.sWeekHandler({
                    strNum: 1,
                    timeout: entry.max
                });
                decorate.page.accessTemplateScheduleChange.sWeekSelectedList({
                    size: 3,
                    timeout: entry.max
                });
                decorate.page.accessTemplateScheduleChange.sWeekSelectedHandler({
                    strNum: 1,
                    timeout: entry.max
                });
                decorate.page.accessTemplateScheduleChange.sWeekSelectedList({
                    size: 2,
                    timeout: entry.max
                });
                decorate.el.button.handler({
                    name: 'Сохранить изменения',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.success.success({
                    text: 'Сохранено успешно',
                    timeout: entry.max
                });
                decorate.init.accessSchedule();
            });

            describe('Проверка', () => {
                befAccess();
                aft();

                describe('Проверка таблицы', () => {
                    decorate.el.table.size({
                        strCount: 7,
                        timeout: entry.max
                    });
                    decorate.el.table.cellGetText({
                        headTitle: 'Название',
                        strNumber: 1,
                        cellNumber: 1,
                        value: data.sSlideUpdate.name,
                        timeout: entry.max
                    });
                    decorate.el.table.cellGetText({
                        headTitle: 'Описание',
                        strNumber: 1,
                        cellNumber: 2,
                        value: data.sSlideUpdate.description,
                        timeout: entry.max
                    });
                    decorate.el.table.cellGetText({
                        headTitle: 'Тип',
                        strNumber: 1,
                        cellNumber: 3,
                        value: 'Скользящий понедельный график',
                        timeout: entry.max
                    });
                });

                describe('Проверка параметров', () => {
                    decorate.el.table.strHandler({
                        strNumber: 1,
                        timeout: entry.max
                    });
                    decorate.el.butIcBefore.handler({
                        icon: but.edit,
                        timeout: entry.max
                    });
                    decorate.init.accessScheduleChangeEdit();
                    decorate.el.input.getValue({
                        title: 'Название',
                        placeholder: '',
                        value: data.sSlideUpdate.name,
                        timeout: entry.max
                    });
                    decorate.el.input.getValue({
                        title: 'Описание',
                        placeholder: '',
                        value: data.sSlideUpdate.description,
                        timeout: entry.max
                    });
                    decorate.el.input.getValue({
                        title: 'Дата начала смены',
                        placeholder: '',
                        value: data.sSlideUpdate.date,
                        timeout: entry.max
                    });
                    decorate.el.select.getText({
                        title: 'Временной критерий',
                        value: 'Скользящий понедельный график',
                        timeout: entry.max
                    });
                    decorate.page.accessTemplateScheduleChange.sWeekSelectedList({
                        size: 2,
                        timeout: entry.max
                    });
                    decorate.page.accessTemplateScheduleChange.sWeekSelectedName({
                        strNum: 1,
                        value: data.weekUpdate.name,
                        timeout: entry.max
                    });
                    decorate.page.accessTemplateScheduleChange.sWeekSelectedName({
                        strNum: 2,
                        value: data.weekUpdate.name,
                        timeout: entry.max
                    });
                });
            });
        }

        if(type === 'template') {
            describe('Редактирование', () => {
                befTemplate();
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
                    decorate.init.templateEdit();
                    decorate.el.input.backSpace({
                        title: 'Имя шаблона',
                        placeholder: '',
                        timeout: entry.max
                    });
                    decorate.el.input.sendKeys({
                        title: 'Имя шаблона',
                        placeholder: '',
                        value: data.templateUpdate.name,
                        timeout: entry.max
                    });
                    decorate.el.input.sendKeys({
                        title: 'Описание',
                        placeholder: '',
                        value: data.templateUpdate.description,
                        timeout: entry.max
                    });
                });

                describe('Редактирование помещение 1', () => {
                    decorate.page.templateChange.roomHandler({
                        name: data.rooms.room1,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.button.handler({
                        name: 'сбросить настройки помещения',
                        timeout: entry.max
                    });
                    decorate.el.select.iconXpand({
                        title: 'Тип критерия доступа',
                        value: 'Выберите тип',
                        text: 'Временные зоны',
                        timeout: entry.max
                    });
                    decorate.el.input.iconOutline({
                        title: 'Критерий доступа',
                        placeholder: 'Выберите тип',
                        timeout: entry.max
                    });
                    decorate.modal.schedules.init({
                        timeout: entry.max
                    });
                    decorate.page.accessTemplateScheduleChange.handler({
                        numInterval: 3,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.button.handler({
                        name: 'Сохранить',
                        timeout: entry.max
                    });
                    decorate.modal.schedules.initClose({
                        timeout: entry.max
                    });
                    decorate.el.select.iconXpand({
                        title: 'Тип доступа',
                        value: 'Выберите тип',
                        text: 'Карта',
                        timeout: entry.max
                    });
                    decorate.el.select.iconXpand({
                        title: 'Комиссионирование',
                        value: '',
                        text: 'Охрана',
                        timeout: entry.max
                    });
                    decorate.el.checkbox.handler({
                        name: 'Охрана',
                        timeout: entry.max
                    });
                    decorate.el.checkbox.handler({
                        name: 'Верификация',
                        timeout: entry.max
                    });
                    decorate.el.checkbox.handler({
                        name: 'Антипасс',
                        timeout: entry.max
                    });
                });

                describe('Редактирование помещения 2', () => {
                    decorate.page.templateChange.roomHandler({
                        name: data.rooms.room2,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.button.handler({
                        name: 'сбросить настройки помещения',
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.select.iconXpand({
                        title: 'Тип критерия доступа',
                        value: 'Выберите тип',
                        text: 'Недельный график',
                        timeout: entry.max
                    });

                    decorate.el.input.iconOutline({
                        title: 'Критерий доступа',
                        placeholder: 'Выберите тип',
                        timeout: entry.max
                    });
                    decorate.modal.schedulesList.init({
                        timeout: entry.max
                    });
                    decorate.el.groupCell.handler({
                        name: data.weekUpdate.name,
                        timeout: entry.max
                    });
                    decorate.el.groupCell.active({
                        name: data.weekUpdate.name,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.button.handler({
                        name: 'Сохранить',
                        timeout: entry.max
                    });
                    decorate.modal.schedulesList.initClose({
                        timeout: entry.max
                    });

                    decorate.el.select.iconXpand({
                        title: 'Тип доступа',
                        value: 'Выберите тип',
                        text: 'Карта и отпечаток',
                        timeout: entry.max
                    });

                    decorate.el.input.iconOutline({
                        title: 'Критерий верификации от ПО',
                        placeholder: 'Нет',
                        timeout: entry.max
                    });
                    decorate.modal.schedulesList.init({
                        timeout: entry.max
                    });
                    decorate.el.groupCell.handler({
                        name: data.weekUpdate.name,
                        timeout: entry.max
                    });
                    decorate.el.groupCell.active({
                        name: data.weekUpdate.name,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.button.handler({
                        name: 'Сохранить',
                        timeout: entry.max
                    });
                    decorate.modal.schedulesList.initClose({
                        timeout: entry.max
                    });

                    decorate.el.input.iconOutline({
                        title: 'Критерий верификации от ПДУ',
                        placeholder: 'Нет',
                        timeout: entry.max
                    });
                    decorate.modal.schedulesList.init({
                        timeout: entry.max
                    });
                    decorate.el.groupCell.handler({
                        name: data.weekUpdate.name,
                        timeout: entry.max
                    });
                    decorate.el.groupCell.active({
                        name: data.weekUpdate.name,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.button.handler({
                        name: 'Сохранить',
                        timeout: entry.max
                    });
                    decorate.modal.schedulesList.initClose({
                        timeout: entry.max
                    });

                    decorate.el.input.iconOutline({
                        title: 'Критерий верификации от BВУ',
                        placeholder: 'Нет',
                        timeout: entry.max
                    });
                    decorate.modal.schedulesList.init({
                        timeout: entry.max
                    });
                    decorate.el.groupCell.handler({
                        name: data.weekUpdate.name,
                        timeout: entry.max
                    });
                    decorate.el.groupCell.active({
                        name: data.weekUpdate.name,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.button.handler({
                        name: 'Сохранить',
                        timeout: entry.max
                    });
                    decorate.modal.schedulesList.initClose({
                        timeout: entry.max
                    });

                    decorate.el.input.iconOutline({
                        title: 'Алкобарьер',
                        placeholder: 'Нет',
                        timeout: entry.max
                    });
                    decorate.modal.schedulesList.init({
                        timeout: entry.max
                    });
                    decorate.el.groupCell.handler({
                        name: data.weekUpdate.name,
                        timeout: entry.max
                    });
                    decorate.el.groupCell.active({
                        name: data.weekUpdate.name,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.button.handler({
                        name: 'Сохранить',
                        timeout: entry.max
                    });
                    decorate.modal.schedulesList.initClose({
                        timeout: entry.max
                    });

                    decorate.el.select.iconXpand({
                        title: 'Комиссионирование',
                        value: '',
                        text: 'Охрана',
                        timeout: entry.max
                    });
                    decorate.el.select.iconXpand({
                        title: 'Группа комиссионирования 1',
                        value: '',
                        text: '1',
                        timeout: entry.max
                    });
                    decorate.el.select.iconXpand({
                        title: 'Группа комиссионирования 2',
                        value: '',
                        text: '8',
                        timeout: entry.max
                    });

                    decorate.el.checkbox.handler({
                        name: 'Охрана',
                        timeout: entry.max
                    });
                    decorate.el.checkbox.handler({
                        name: 'Антипасс',
                        timeout: entry.max
                    });
                });

                describe('Сохранение', () => {
                    decorate.el.button.handler({
                        name: 'Сохранить изменения',
                        timeout: entry.max
                    });
                });
            });

            describe('Проверка', () => {
                befTemplate();
                aft();

                describe('Проверка таблицы', () => {
                    decorate.el.table.size({
                        strCount: 1,
                        timeout: entry.max
                    });
                    decorate.el.table.cellGetText({
                        headTitle: 'Имя шаблона',
                        strNumber: 1,
                        cellNumber: 1,
                        value: data.templateUpdate.name,
                        timeout: entry.max
                    });
                    decorate.el.table.cellGetText({
                        headTitle: 'Описание',
                        strNumber: 1,
                        cellNumber: 2,
                        value: data.templateUpdate.description,
                        timeout: entry.max
                    });
                });

                describe('Проверка параметров', () => {
                    describe('Проверка общий параметров', () => {
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
                            title: 'Имя шаблона',
                            placeholder: '',
                            value: data.templateUpdate.name,
                            timeout: entry.max
                        });
                        decorate.el.input.getValue({
                            title: 'Описание',
                            placeholder: '',
                            value: data.templateUpdate.description,
                            timeout: entry.max
                        });
                        decorate.init.templateEdit();
                    });

                    describe('Проверка помещения 1', () => {
                        decorate.page.templateChange.room({
                            name: data.rooms.room1,
                            type: 'Временные зоны',
                            criterion: data.zoneUpdate.name,
                            access: 'Карта',
                            commission: 'Охрана',
                            protection: true,
                            verif: true,
                            antipass: true,
                            timeout: entry.max
                        });
                        decorate.page.templateChange.roomHandler({
                            name: data.rooms.room1,
                            timeout: entry.max
                        });
                        decorate.page.base.loading({
                            timeout: entry.sleep2
                        });
                        decorate.el.select.select({
                            title: 'Тип критерия доступа',
                            value: 'Временные зоны',
                            timeout: entry.max
                        });
                        decorate.el.input.getValue({
                            title: 'Критерий доступа',
                            placeholder: 'Выберите тип',
                            value: data.zoneUpdate.name,
                            timeout: entry.max
                        });
                        decorate.el.select.select({
                            title: 'Тип доступа',
                            value: 'Карта',
                            timeout: entry.max
                        });
                        decorate.el.select.select({
                            title: 'Комиссионирование',
                            value: 'Охрана',
                            timeout: entry.max
                        });
                        decorate.el.checkbox.checked({
                            name: 'Охрана',
                            timeout: entry.max
                        });
                        decorate.el.checkbox.checked({
                            name: 'Верификация',
                            timeout: entry.max
                        });
                        decorate.el.checkbox.checked({
                            name: 'Антипасс',
                            timeout: entry.max
                        });
                    });

                    describe('Проверка помещения 2', () => {
                        decorate.page.templateChange.room({
                            name: data.rooms.room2,
                            type: 'Недельный график',
                            criterion: data.weekUpdate.name,
                            access: 'Карта и отпечаток',
                            commission: 'Охрана',
                            protection: true,
                            verif: true,
                            antipass: true,
                            timeout: entry.max
                        });
                        decorate.page.templateChange.roomHandler({
                            name: data.rooms.room2,
                            timeout: entry.max
                        });
                        decorate.page.base.loading({
                            timeout: entry.sleep2
                        });
                        decorate.el.select.select({
                            title: 'Тип критерия доступа',
                            value: 'Недельный график',
                            timeout: entry.max
                        });
                        decorate.el.input.getValue({
                            title: 'Критерий доступа',
                            placeholder: 'Выберите тип',
                            value: data.weekUpdate.name,
                            timeout: entry.max
                        });
                        decorate.el.select.select({
                            title: 'Тип доступа',
                            value: 'Карта и отпечаток',
                            timeout: entry.max
                        });
                        decorate.el.input.getValue({
                            title: 'Критерий верификации от ПО',
                            placeholder: 'Нет',
                            value: data.weekUpdate.name,
                            timeout: entry.max
                        });
                        decorate.el.input.getValue({
                            title: 'Критерий верификации от ПДУ',
                            placeholder: 'Нет',
                            value: data.weekUpdate.name,
                            timeout: entry.max
                        });
                        decorate.el.input.getValue({
                            title: 'Критерий верификации от BВУ',
                            placeholder: 'Нет',
                            value: data.weekUpdate.name,
                            timeout: entry.max
                        });
                        decorate.el.input.getValue({
                            title: 'Алкобарьер',
                            placeholder: 'Нет',
                            value: data.weekUpdate.name,
                            timeout: entry.max
                        });
                        decorate.el.select.select({
                            title: 'Комиссионирование',
                            value: 'Охрана',
                            timeout: entry.max
                        });
                        decorate.el.select.select({
                            title: 'Группа комиссионирования 1',
                            value: '1',
                            text: '1',
                            timeout: entry.max
                        });
                        decorate.el.select.select({
                            title: 'Группа комиссионирования 2',
                            value: '8',
                            text: '8',
                            timeout: entry.max
                        });
                        decorate.el.checkbox.checked({
                            name: 'Охрана',
                            timeout: entry.max
                        });
                        decorate.el.checkbox.checked({
                            name: 'Антипасс',
                            timeout: entry.max
                        });
                    });
                });
            });
        }
    });

    const copy = () => describe(text + 'Копирование.', () => {
        if(type === 'template') {
            describe('Копирование', () => {
                befTemplate();
                aft();
                decorate.el.table.strHandler({
                    strNumber: 1,
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.butIcBefore.handler({
                    icon: but.copy,
                    timeout: entry.max
                });
                decorate.init.templateCopy();
                decorate.el.button.handler({
                    name: 'Сохранить изменения',
                    timeout: entry.max
                });
            });

            describe('Проверка', () => {
                befTemplate();
                aft();

                describe('Проверка таблицы', () => {
                    decorate.el.table.size({
                        strCount: 2,
                        timeout: entry.max
                    });
                    decorate.el.table.cellGetText({
                        headTitle: 'Имя шаблона',
                        strNumber: 1,
                        cellNumber: 1,
                        value: data.templateUpdate.name + ' (Копировать)',
                        timeout: entry.max
                    });
                    decorate.el.table.cellGetText({
                        headTitle: 'Описание',
                        strNumber: 1,
                        cellNumber: 2,
                        value: data.templateUpdate.description,
                        timeout: entry.max
                    });
                });

                describe('Проверка параметров', () => {
                    describe('Проверка общий параметров', () => {
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
                            title: 'Имя шаблона',
                            placeholder: '',
                            value: data.templateUpdate.name + ' (Копировать)',
                            timeout: entry.max
                        });
                        decorate.el.input.getValue({
                            title: 'Описание',
                            placeholder: '',
                            value: data.templateUpdate.description,
                            timeout: entry.max
                        });
                        decorate.init.templateEdit();
                    });

                    describe('Проверка помещения 1', () => {
                        decorate.page.templateChange.room({
                            name: data.rooms.room1,
                            type: 'Временные зоны',
                            criterion: data.zoneUpdate.name,
                            access: 'Карта',
                            commission: 'Охрана',
                            protection: true,
                            verif: true,
                            antipass: true,
                            timeout: entry.max
                        });
                        decorate.page.templateChange.roomHandler({
                            name: data.rooms.room1,
                            timeout: entry.max
                        });
                        decorate.page.base.loading({
                            timeout: entry.sleep2
                        });
                        decorate.el.select.select({
                            title: 'Тип критерия доступа',
                            value: 'Временные зоны',
                            timeout: entry.max
                        });
                        decorate.el.input.getValue({
                            title: 'Критерий доступа',
                            placeholder: 'Выберите тип',
                            value: data.zoneUpdate.name,
                            timeout: entry.max
                        });
                        decorate.el.select.select({
                            title: 'Тип доступа',
                            value: 'Карта',
                            timeout: entry.max
                        });
                        decorate.el.select.select({
                            title: 'Комиссионирование',
                            value: 'Охрана',
                            timeout: entry.max
                        });
                        decorate.el.checkbox.checked({
                            name: 'Охрана',
                            timeout: entry.max
                        });
                        decorate.el.checkbox.checked({
                            name: 'Верификация',
                            timeout: entry.max
                        });
                        decorate.el.checkbox.checked({
                            name: 'Антипасс',
                            timeout: entry.max
                        });
                    });

                    describe('Проверка помещения 2', () => {
                        decorate.page.templateChange.room({
                            name: data.rooms.room2,
                            type: 'Недельный график',
                            criterion: data.weekUpdate.name,
                            access: 'Карта и отпечаток',
                            commission: 'Охрана',
                            protection: true,
                            verif: true,
                            antipass: true,
                            timeout: entry.max
                        });
                        decorate.page.templateChange.roomHandler({
                            name: data.rooms.room2,
                            timeout: entry.max
                        });
                        decorate.page.base.loading({
                            timeout: entry.sleep2
                        });
                        decorate.el.select.select({
                            title: 'Тип критерия доступа',
                            value: 'Недельный график',
                            timeout: entry.max
                        });
                        decorate.el.input.getValue({
                            title: 'Критерий доступа',
                            placeholder: 'Выберите тип',
                            value: data.weekUpdate.name,
                            timeout: entry.max
                        });
                        decorate.el.select.select({
                            title: 'Тип доступа',
                            value: 'Карта и отпечаток',
                            timeout: entry.max
                        });
                        decorate.el.input.getValue({
                            title: 'Критерий верификации от ПО',
                            placeholder: 'Нет',
                            value: data.weekUpdate.name,
                            timeout: entry.max
                        });
                        decorate.el.input.getValue({
                            title: 'Критерий верификации от ПДУ',
                            placeholder: 'Нет',
                            value: data.weekUpdate.name,
                            timeout: entry.max
                        });
                        decorate.el.input.getValue({
                            title: 'Критерий верификации от BВУ',
                            placeholder: 'Нет',
                            value: data.weekUpdate.name,
                            timeout: entry.max
                        });
                        decorate.el.input.getValue({
                            title: 'Алкобарьер',
                            placeholder: 'Нет',
                            value: data.weekUpdate.name,
                            timeout: entry.max
                        });
                        decorate.el.select.select({
                            title: 'Комиссионирование',
                            value: 'Охрана',
                            timeout: entry.max
                        });
                        decorate.el.select.select({
                            title: 'Группа комиссионирования 1',
                            value: '1',
                            text: '1',
                            timeout: entry.max
                        });
                        decorate.el.select.select({
                            title: 'Группа комиссионирования 2',
                            value: '8',
                            text: '8',
                            timeout: entry.max
                        });
                        decorate.el.checkbox.checked({
                            name: 'Охрана',
                            timeout: entry.max
                        });
                        decorate.el.checkbox.checked({
                            name: 'Антипасс',
                            timeout: entry.max
                        });
                    });
                });
            });
        }
    });


    return {
        add,
        edit,
        deleted,
        copy,
        editServiceFailed,
        deleteServiceFailed,
        deletedFailedAccess,
        deleteFailedTemplate,
        searchFilter,
        searchType,
        holiday,
        commission,
        addFailed,
        addDuplicate
    }
}

module.exports = {
    otherZone: other('zone', 'Бюро пропусков / Шаблоны доступа - вкладка - Временные критерии доступа - ' +
        'тип - Временные зоны. '),
    otherWeek: other('week', 'Бюро пропусков / Шаблоны доступа - вкладка - Временные критерии доступа. - ' +
        'тип - Недельный график.'),
    otherSlideTZ: other('slideTZ', 'Бюро пропусков / Шаблоны доступа - вкладка - Временные критерии ' +
        'доступа - тип - Скользящий посуточный график. '),
    otherSlideW: other('slidW', 'Бюро пропусков / Шаблоны доступа - вкладка - Временные критерии доступа. ' +
        '- тип - Скользящий понедельный график.'),
    otherTemplate: other('template', 'Бюро пропусков / Шаблоны доступа - вкладка - Шаблоны доступа. '),
    otherCommission: other('commission', 'Бюро пропусков / Шаблоны доступа - вкладка - Комиссионирование. '),
    other: other()
}