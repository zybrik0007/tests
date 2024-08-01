const {describe, it} = require('mocha');

const entry = require('../../../../../../../entry');
const page = require('../../../../../pages');
const dec = require('../../../../../dictionaries/decorate');
const but = require('../../../../../dictionaries/button-icon');
const api = require('../../../../../dictionaries/api');
const decorate = require('../../../../../decorates');
const data = require('./template.data');

const befTemplate = () => decorate.befAft.before.beforeTemplate();
const befAccess = () => decorate.befAft.before.beforeAccess();
const befCommission = () => decorate.befAft.before.beforeCommission();
const aft = () => decorate.befAft.after.after();

const test = (type, text) => {

    const weekData = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС', 'Тип 1', 'Тип 2', 'Тип 3', 'Тип 4', 'Тип 5',
        'Тип 6', 'Тип 7', 'Тип 8',]

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
                decorate.el.error.checkError({
                    timeout: entry.sleep2
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

        if(type === 'slideTZ') {
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
                    value: data.tzSlide.name,
                    timeout: entry.max
                });
                decorate.el.select.iconXpand({
                    title: 'Временной критерий',
                    value: '',
                    text: 'Скользящий посуточный график',
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
                decorate.el.error.checkError({
                    timeout: entry.sleep2
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
                        value: data.tzSlide.name,
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
                        value: data.tzSlide.name,
                        timeout: entry.max
                    });
                    decorate.el.input.getValue({
                        title: 'Описание',
                        placeholder: '',
                        value: '',
                        timeout: entry.max
                    });
                    decorate.el.input.getValue({
                        title: 'Дата начала смены',
                        placeholder: '',
                        value: data.tzSlide.date
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

        if(type === 'slidW') {
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
                    value: data.sSlide.name,
                    timeout: entry.max
                });
                decorate.el.select.iconXpand({
                    title: 'Временной критерий',
                    value: '',
                    text: 'Скользящий понедельный график',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.page.accessTemplateScheduleChange.sWeekHandler({
                    strNum: 1,
                    timeout: entry.max
                });
                decorate.page.accessTemplateScheduleChange.sWeekSelectedList({
                    size: 1,
                    timeout: entry.max
                });
                decorate.el.button.handler({
                    name: 'Сохранить изменения',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.error.checkError({
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
                        value: data.sSlide.name,
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
                        value: data.sSlide.name,
                        timeout: entry.max
                    });
                    decorate.el.input.getValue({
                        title: 'Описание',
                        placeholder: '',
                        value: '',
                        timeout: entry.max
                    });
                    decorate.el.input.getValue({
                        title: 'Дата начала смены',
                        placeholder: '',
                        value: data.sSlide.date
                    });
                    decorate.el.select.getText({
                        title: 'Временной критерий',
                        value: 'Скользящий понедельный график',
                        timeout: entry.max
                    });
                    decorate.page.accessTemplateScheduleChange.sWeekList({
                        size: 1,
                        timeout: entry.max
                    });
                    decorate.page.accessTemplateScheduleChange.sWeekSelectedList({
                        size: 1,
                        timeout: entry.max
                    });
                    decorate.page.accessTemplateScheduleChange.sWeekSelectedName({
                        strNum: 1,
                        value: data.weekUpdate.name,
                        timeout: entry.max
                    });
                });
            });
        }

        if(type === 'template') {
            describe('Добавление', () => {
                befTemplate();
                aft();

                describe('Ввод общих параметров', () => {
                    decorate.el.butIcBefore.handler({
                        icon: but.add,
                        timeout: entry.max
                    });
                    decorate.init.templateAdd();
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.input.sendKeys({
                        title: 'Имя шаблона',
                        placeholder: '',
                        value: data.template.name,
                        timeout: entry.max
                    });
                });

                describe('Настройка помещения 1', () => {
                    decorate.page.templateChange.roomHandler({
                        name: data.rooms.room1,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
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
                        numInterval: 1,
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
                        text: 'Доступ',
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

                describe('Настройка помещения 2', () => {
                    decorate.page.templateChange.roomHandler({
                        name: data.rooms.room2,
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
                        text: 'Карта',
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
                });

                describe('Проверка помещения 1', () => {
                    decorate.page.templateChange.room({
                        name: data.rooms.room1,
                        type: 'Временные зоны',
                        criterion: 'Никогда',
                        access: 'Карта',
                        commission: 'Доступ',
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
                        value: 'Никогда',
                        timeout: entry.max
                    });
                    decorate.el.select.select({
                        title: 'Тип доступа',
                        value: 'Карта',
                        timeout: entry.max
                    });
                    decorate.el.select.select({
                        title: 'Комиссионирование',
                        value: 'Доступ',
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
                        access: 'Карта',
                        commission: 'Охрана',
                        protection: false,
                        verif: true,
                        antipass: false,
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
                        value: 'Карта',
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
                    decorate.el.checkbox.unchecked({
                        name: 'Охрана',
                        timeout: entry.max
                    });
                    decorate.el.checkbox.unchecked({
                        name: 'Антипасс',
                        timeout: entry.max
                    });
                });

                describe('Изменение помещение 1', () => {
                    decorate.page.templateChange.roomHandler({
                        name: data.rooms.room1,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.select.iconXpand({
                        title: 'Тип критерия доступа',
                        value: 'Временные зоны',
                        text: 'Скользящий посуточный график',
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
                        name: data.tzSlideUpdate.name,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.groupCell.active({
                        name: data.tzSlideUpdate.name,
                        timeout: entry.max
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
                        value: 'Карта',
                        text: 'Карта',
                        timeout: entry.max
                    });
                    decorate.el.select.iconXpand({
                        title: 'Комиссионирование',
                        value: 'Доступ',
                        text: 'Нет',
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

                describe('Изменение помещения 2', () => {
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
                        text: 'Скользящий понедельный график',
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
                        name: data.sSlideUpdate.name,
                        timeout: entry.max
                    });
                    decorate.el.groupCell.active({
                        name: data.sSlideUpdate.name,
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
                        text: 'Карта и отпечаток на карте',
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
                    decorate.el.error.checkError({
                        timeout: entry.sleep2
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
                        headTitle: 'Название',
                        strNumber: 1,
                        cellNumber: 1,
                        value: data.template.name,
                        timeout: entry.max
                    });
                    decorate.el.table.cellGetText({
                        headTitle: 'Описание',
                        strNumber: 1,
                        cellNumber: 2,
                        value: '',
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
                            value: data.template.name,
                            timeout: entry.max
                        });
                        decorate.el.input.getValue({
                            title: 'Описание',
                            placeholder: '',
                            value: '',
                            timeout: entry.max
                        });
                        decorate.init.templateEdit();
                    });

                    describe('Проверка помещения 1', () => {
                        decorate.page.templateChange.room({
                            name: data.rooms.room1,
                            type: 'Скользящий посуточный график',
                            criterion: data.tzSlideUpdate.name,
                            access: 'Карта',
                            commission: 'Нет',
                            protection: false,
                            verif: true,
                            antipass: false,
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
                            value: 'Скользящий посуточный график',
                            timeout: entry.max
                        });
                        decorate.el.input.getValue({
                            title: 'Критерий доступа',
                            placeholder: 'Выберите тип',
                            value: data.tzSlideUpdate.name,
                            timeout: entry.max
                        });
                        decorate.el.select.select({
                            title: 'Тип доступа',
                            value: 'Карта',
                            timeout: entry.max
                        });
                        decorate.el.select.select({
                            title: 'Комиссионирование',
                            value: '',
                            timeout: entry.max
                        });
                        decorate.el.checkbox.unchecked({
                            name: 'Охрана',
                            timeout: entry.max
                        });
                        decorate.el.checkbox.checked({
                            name: 'Верификация',
                            timeout: entry.max
                        });
                        decorate.el.checkbox.unchecked({
                            name: 'Антипасс',
                            timeout: entry.max
                        });
                    });

                    describe('Проверка помещения 2', () => {
                        decorate.page.templateChange.room({
                            name: data.rooms.room2,
                            type: 'Скользящий понедельный график',
                            criterion: data.sSlideUpdate.name,
                            access: 'Карта и отпечаток на карте',
                            commission: 'Нет',
                            protection: true,
                            verif: false,
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
                            value: 'Скользящий понедельный график',
                            timeout: entry.max
                        });
                        decorate.el.input.getValue({
                            title: 'Критерий доступа',
                            placeholder: 'Выберите тип',
                            value: data.sSlideUpdate.name,
                            timeout: entry.max
                        });
                        decorate.el.select.select({
                            title: 'Тип доступа',
                            value: 'Карта и отпечаток на карте',
                            timeout: entry.max
                        });
                        decorate.el.input.getValue({
                            title: 'Критерий верификации от ПО',
                            placeholder: 'Нет',
                            value: '',
                            timeout: entry.max
                        });
                        decorate.el.input.getValue({
                            title: 'Критерий верификации от ПДУ',
                            placeholder: 'Нет',
                            value: '',
                            timeout: entry.max
                        });
                        decorate.el.input.getValue({
                            title: 'Критерий верификации от BВУ',
                            placeholder: 'Нет',
                            value: '',
                            timeout: entry.max
                        });
                        decorate.el.input.getValue({
                            title: 'Алкобарьер',
                            placeholder: 'Нет',
                            value: '',
                            timeout: entry.max
                        });
                        decorate.el.select.select({
                            title: 'Комиссионирование',
                            value: '',
                            timeout: entry.max
                        });
                        decorate.el.select.select({
                            title: 'Группа комиссионирования 1',
                            value: '',
                            timeout: entry.max
                        });
                        decorate.el.select.select({
                            title: 'Группа комиссионирования 2',
                            value: '',
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
                decorate.el.error.checkError({
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
                decorate.el.error.checkError({
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
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.datepicker.dateParse({
                    day: '1',
                    month: 'Июнь',
                    year: '2023',
                    scrollYear: -500,
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
                decorate.el.error.checkError({
                    timeout: entry.sleep2
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
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.datepicker.dateParse({
                    day: '1',
                    month: 'Июнь',
                    year: '2023',
                    scrollYear: -500,
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
                decorate.el.error.checkError({
                    timeout: entry.sleep2
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
                    decorate.el.error.checkError({
                        timeout: entry.sleep2
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
                decorate.el.error.checkError({
                    timeout: entry.sleep2
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

    const addFailed = () => describe(text + 'Попытка добавления без обязательных параметров.', () => {

        if(type === 'zone') {
            const error = 'Заполните все обязательные поля'
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
                value: data.zone.name,
                timeout: entry.max
            });
            decorate.el.select.iconXpand({
                title: 'Временной критерий',
                value: '',
                text: 'Временные зоны',
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
            decorate.el.error.error({
                text: error,
                timeout: entry.max
            });
        }

        if(type === 'slideTZ') {
            const error = 'Не указано ни одного суточного графика'
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
                value: data.tzSlide.name,
                timeout: entry.max
            });
            decorate.el.select.iconXpand({
                title: 'Временной критерий',
                value: '',
                text: 'Скользящий посуточный график',
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
            decorate.el.error.error({
                text: error,
                timeout: entry.max
            });
        }

        if(type === 'slidW') {
            const error = 'Выберите временной критерий'
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
                value: data.tzSlide.name,
                timeout: entry.max
            });
            decorate.el.select.iconXpand({
                title: 'Временной критерий',
                value: '',
                text: 'Скользящий понедельный график',
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
            decorate.el.error.error({
                text: error,
                timeout: entry.max
            });
        }

        if(type === 'template') {
            befTemplate();
            aft();

            describe('Открытие на редактирова и ввод названия', () => {
                decorate.el.butIcBefore.handler({
                    icon: but.add,
                    timeout: entry.max
                });
                decorate.init.templateAdd();
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.input.sendKeys({
                    title: 'Имя шаблона',
                    placeholder: '',
                    value: data.template.name,
                    timeout: entry.max
                });
            });

            describe('Добавление без Тип критерия доступа, Критерий доступа, Тип доступа', () => {
                const error = 'Должны быть заданы параметры хотя бы для одного помещения';
                decorate.el.button.handler({
                    name: 'Сохранить изменения',
                    timeout: entry.max
                });
                decorate.el.error.error({
                    text: error,
                    timeout: entry.max
                });
            });

            describe('Добавление без Критерий доступа, Тип доступа', () => {
                const error = 'Должны быть заданы параметры хотя бы для одного помещения';
                decorate.page.templateChange.roomHandler({
                    name: data.rooms.room1,
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.select.iconXpand({
                    title: 'Тип критерия доступа',
                    value: 'Выберите тип',
                    text: 'Временные зоны',
                    timeout: entry.max
                });
                decorate.el.button.handler({
                    name: 'Сохранить изменения',
                    timeout: entry.max
                });
                decorate.el.error.error({
                    text: error,
                    timeout: entry.max
                });
            });

            describe('Добавление без Тип доступа', () => {
                const error = 'Должны быть заданы параметры хотя бы для одного помещения';
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
                    numInterval: 1,
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
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.button.handler({
                    name: 'Сохранить изменения',
                    timeout: entry.max
                });
                decorate.el.error.error({
                    text: error,
                    timeout: entry.max
                });
            });

            describe('Добавление без Критерий доступа', () => {
                const error = 'Должны быть заданы параметры хотя бы для одного помещения';
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
                    text: 'Временные зоны',
                    timeout: entry.max
                });
                decorate.el.select.iconXpand({
                    title: 'Тип доступа',
                    value: 'Выберите тип',
                    text: 'Карта',
                    timeout: entry.max
                });
                decorate.el.button.handler({
                    name: 'Сохранить изменения',
                    timeout: entry.max
                });
                decorate.el.error.error({
                    text: error,
                    timeout: entry.max
                });
            });

            describe('Выбор Критерий доступа без Тип критерия доступа', () => {
                const error = 'Сначала выберите тип критерия';
                decorate.el.button.handler({
                    name: 'сбросить настройки помещения',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.input.iconOutline({
                    title: 'Критерий доступа',
                    placeholder: 'Выберите тип',
                    timeout: entry.max
                });
                decorate.el.button.handler({
                    name: 'Сохранить изменения',
                    timeout: entry.max
                });
                decorate.el.error.error({
                    text: error,
                    timeout: entry.max
                });
            });
        }

    });

    const addDuplicate = () => describe('Бюро пропусков / Шаблоны доступа. Проверка дублирования', () => {
         describe('Бюро пропусков / Шаблоны доступа - вкладка - Временные критерии. ' +
             'Дублировние c одинаковый типом временного критерия', () => {
             const error = 'Превышено максимальное количество элементов в поле {{field}}, ' +
                 'допустимое количество {{maxCount}}'

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
                 value: data.weekUpdate.name,
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
             decorate.el.button.handler({
                 name: 'Сохранить изменения',
                 timeout: entry.max
             });
             decorate.page.base.loading({
                 timeout: entry.sleep2
             });
             decorate.el.error.error({
                 text: error,
                 timeout: entry.max
             });
         });

        describe('Бюро пропусков / Шаблоны доступа - вкладка - Временные критерии. ' +
            'Дублировние c разным типом временного критерия', () => {

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
                    value: data.weekUpdate.name,
                    timeout: entry.max
                });
                decorate.el.select.iconXpand({
                    title: 'Временной критерий',
                    value: '',
                    text: 'Скользящий понедельный график',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.page.accessTemplateScheduleChange.sWeekHandler({
                    strNum: 1,
                    timeout: entry.max
                });
                decorate.page.accessTemplateScheduleChange.sWeekSelectedList({
                    size: 1,
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

            describe('Проверка таблицы и удаление временного критерия', () => {
                befAccess();
                aft();
                decorate.el.table.size({
                    strCount: 8,
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
                decorate.modalConfirm.accessSchedulesDelete.init({
                    timeout: entry.max
                });
                decorate.el.button.handler({
                    name: 'Удалить',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.modalConfirm.accessSchedulesDelete.initClose({
                    timeout: entry.max
                });
            });
        });

        describe('Бюро пропусков / Шаблоны доступа - вкладка - Временные критерии. Дублирование графика работы', () => {
            const error = 'Данное имя уже используется'
            befTemplate();
            aft();

            decorate.el.butIcBefore.handler({
                icon: but.add,
                timeout: entry.max
            });
            decorate.init.templateAdd();
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
            decorate.el.input.sendKeys({
                title: 'Имя шаблона',
                placeholder: '',
                value: data.template.name,
                timeout: entry.max
            });
            decorate.page.templateChange.roomHandler({
                name: data.rooms.room1,
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
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
                numInterval: 1,
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
            decorate.el.button.handler({
                name: 'Сохранить изменения',
                timeout: entry.max
            });
            decorate.el.error.error({
                text: error,
                timeout: entry.max
            });
        });
    });

    const deleted = () => describe(text + 'Удаление.', () => {

        if(type === 'zone') {

            describe('Проверка таблицы до удаления', () => {
                befAccess();
                aft();
                decorate.el.table.size({
                    strCount: 4,
                    timeout: entry.max
                });
            });

            describe('Удаление.', () => {
                befAccess();
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
                decorate.modalConfirm.accessSchedulesDelete.init({
                    timeout: entry.max
                });
                decorate.el.button.handler({
                    name: 'Удалить',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.error.checkError({
                    timeout: entry.sleep2
                });
                decorate.modalConfirm.accessSchedulesDelete.initClose({
                    timeout: entry.max
                });
            });

            describe('Проверка таблицы после удаления', () => {
                befAccess();
                aft();
                decorate.el.table.size({
                    strCount: 3,
                    timeout: entry.max
                });
            });
        }

        if(type === 'week') {
            describe('Проверка таблицы до удаления', () => {
                befAccess();
                aft();
                decorate.el.table.size({
                    strCount: 5,
                    timeout: entry.max
                });
            });

            describe('Удаление.', () => {
                befAccess();
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
                decorate.modalConfirm.accessSchedulesDelete.init({
                    timeout: entry.max
                });
                decorate.el.button.handler({
                    name: 'Удалить',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.error.checkError({
                    timeout: entry.sleep2
                });
                decorate.modalConfirm.accessSchedulesDelete.initClose({
                    timeout: entry.max
                });
            });

            describe('Проверка таблицы после удаления', () => {
                befAccess();
                aft();
                decorate.el.table.size({
                    strCount: 4,
                    timeout: entry.max
                });
            });
        }

        if(type === 'slideTZ') {

            describe('Проверка таблицы до удаления', () => {
                befAccess();
                aft();
                decorate.el.table.size({
                    strCount: 7,
                    timeout: entry.max
                });
            });

            describe('Удаление.', () => {
                befAccess();
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
                decorate.modalConfirm.accessSchedulesDelete.init({
                    timeout: entry.max
                });
                decorate.el.button.handler({
                    name: 'Удалить',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.error.checkError({
                    timeout: entry.sleep2
                });
                decorate.modalConfirm.accessSchedulesDelete.initClose({
                    timeout: entry.max
                });
            });

            describe('Проверка таблицы после удаления', () => {
                befAccess();
                aft();
                decorate.el.table.size({
                    strCount: 6,
                    timeout: entry.max
                });
            });
        }

        if(type === 'slidW') {
            describe('Проверка таблицы до удаления', () => {
                befAccess();
                aft();
                decorate.el.table.size({
                    strCount: 6,
                    timeout: entry.max
                });
            });

            describe('Удаление.', () => {
                befAccess();
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
                decorate.modalConfirm.accessSchedulesDelete.init({
                    timeout: entry.max
                });
                decorate.el.button.handler({
                    name: 'Удалить',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.error.checkError({
                    timeout: entry.sleep2
                });
                decorate.modalConfirm.accessSchedulesDelete.initClose({
                    timeout: entry.max
                });
            });

            describe('Проверка таблицы после удаления', () => {
                befAccess();
                aft();
                decorate.el.table.size({
                    strCount: 5,
                    timeout: entry.max
                });
            });
        }

        if(type === 'template') {
            describe('Проверка таблицы до удаления', () => {
                befTemplate();
                aft();
                decorate.el.table.size({
                    strCount: 2,
                    timeout: entry.max
                });
            });

            describe('Удаление.', () => {
                befTemplate();
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
                decorate.modalConfirm.accessSchedulesDelete.init({
                    timeout: entry.max
                });
                decorate.el.button.handler({
                    name: 'Удалить',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.error.checkError({
                    timeout: entry.sleep2
                });
                decorate.modalConfirm.accessSchedulesDelete.initClose({
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
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
                decorate.modalConfirm.accessSchedulesDelete.init({
                    timeout: entry.max
                });
                decorate.el.button.handler({
                    name: 'Удалить',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.modalConfirm.accessSchedulesDelete.initClose({
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
            });

            describe('Проверка таблицы после удаления', () => {
                befTemplate();
                aft();
                decorate.el.table.noStr({
                    timeout: entry.max
                });
            });
        }
    });

    const deletedFailedAccess = () => describe(text + 'Попытка удаление.', () => {

        if(type === 'zone') {
            const params = {
                error: 'График доступа используется и не может быть удален'
            }
            describe('Удаление временного критерия Временная зона, при использовании её в недельном графике', () => {
                befAccess();
                aft();
                decorate.el.table.strHandler({
                    strNumber: 4,
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.butIcBefore.handler({
                    icon: but.delete,
                    timeout: entry.max
                });
                decorate.modalConfirm.accessSchedulesDelete.init({
                    timeout: entry.max
                });
                decorate.el.button.handler({
                    name: 'Удалить',
                    timeout: entry.max
                });
                decorate.el.error.error({
                    text: params.error,
                    timeout: entry.max
                });
                decorate.modalConfirm.accessSchedulesDelete.initClose({
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.table.size({
                    strCount: 7,
                    timeout: entry.max
                });
            });
        }

        if(type === 'week') {
            const params = {
                error: 'График доступа используется и не может быть удален'
            }
            describe('Удаление временного критерия Недельный график, при использовании её в скользящем недельном ' +
                'графике', () => {
                befAccess();
                aft();
                decorate.el.table.strHandler({
                    strNumber: 3,
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.butIcBefore.handler({
                    icon: but.delete,
                    timeout: entry.max
                });
                decorate.modalConfirm.accessSchedulesDelete.init({
                    timeout: entry.max
                });
                decorate.el.button.handler({
                    name: 'Удалить',
                    timeout: entry.max
                });
                decorate.el.error.error({
                    text: params.error,
                    timeout: entry.max
                });
                decorate.modalConfirm.accessSchedulesDelete.initClose({
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.table.size({
                    strCount: 7,
                    timeout: entry.max
                });
            });
        }

    });

    const deleteFailedTemplate = () => describe(text + 'Попытка удаление.', () => {

        if(type === 'zone') {
            const params = {
                error: 'Критерий доступа не может быть удален, потому что он используется в следующих шаблонах ' +
                    'доступа: templateNameUpdate'
            }

            describe('Удаление временного критерия Временные зоны, при использовании его в шаблоне доступа', () => {
                befAccess();
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
                decorate.modalConfirm.accessSchedulesDelete.init({
                    timeout: entry.max
                });
                decorate.el.button.handler({
                    name: 'Удалить',
                    timeout: entry.max
                });
                decorate.el.error.error({
                    text: params.error,
                    timeout: entry.max
                });
                decorate.modalConfirm.accessSchedulesDelete.initClose({
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.table.size({
                    strCount: 5,
                    timeout: entry.max
                });
            });
        }

        if(type === 'week') {
            const params = {
                error: 'Критерий доступа не может быть удален, потому что он используется в следующих шаблонах ' +
                    'доступа: templateNameUpdate'
            }

            describe('Удаление временного критерия Недельный график, при использовании его в шаблоне доступа', () => {
                befAccess();
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
                decorate.modalConfirm.accessSchedulesDelete.init({
                    timeout: entry.max
                });
                decorate.el.button.handler({
                    name: 'Удалить',
                    timeout: entry.max
                });
                decorate.el.error.error({
                    text: params.error,
                    timeout: entry.max
                });
                decorate.modalConfirm.accessSchedulesDelete.initClose({
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.table.size({
                    strCount: 5,
                    timeout: entry.max
                });
            });
        }

        if(type === 'slideTZ') {
            const params = {
                error: 'Критерий доступа не может быть удален, потому что он используется в следующих шаблонах доступа: ' +
                    'templateName'
            }

            describe('Удаление временного критерия Скользящий посуточный график, ' +
                'при использовании его в шаблоне доступа', () => {
                befAccess();
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
                decorate.modalConfirm.accessSchedulesDelete.init({
                    timeout: entry.max
                });
                decorate.el.button.handler({
                    name: 'Удалить',
                    timeout: entry.max
                });
                decorate.el.error.error({
                    text: params.error,
                    timeout: entry.max
                });
                decorate.modalConfirm.accessSchedulesDelete.initClose({
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.table.size({
                    strCount: 7,
                    timeout: entry.max
                });
            });
        }

        if(type === 'slidW') {
            const params = {
                error: 'Критерий доступа не может быть удален, потому что он используется в следующих шаблонах доступа: ' +
                    'templateName'
            }

            describe('Удаление временного критерия Скользящий понедельный график, ' +
                'при использовании его в шаблоне доступа', () => {
                befAccess();
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
                decorate.modalConfirm.accessSchedulesDelete.init({
                    timeout: entry.max
                });
                decorate.el.button.handler({
                    name: 'Удалить',
                    timeout: entry.max
                });
                decorate.el.error.error({
                    text: params.error,
                    timeout: entry.max
                });
                decorate.modalConfirm.accessSchedulesDelete.initClose({
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.table.size({
                    strCount: 7,
                    timeout: entry.max
                });
            });
        }

        if(type === 'template') {
            const params = {
                error: 'Шаблон доступа используется и не может быть удален'
            }

            describe('Удаление шаблона доступа, добавленного сотруднику', () => {
                befTemplate();
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
                decorate.modalConfirm.accessSchedulesDelete.init({
                    timeout: entry.max
                });
                decorate.el.button.handler({
                    name: 'Удалить',
                    timeout: entry.max
                });
                decorate.el.error.error({
                    text: params.error,
                    timeout: entry.max
                });
                decorate.modalConfirm.accessSchedulesDelete.initClose({
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.table.size({
                    strCount: 2,
                    timeout: entry.max
                });
            });
        }
    });

    const editServiceFailed = () => describe('Бюро пропусков / Шаблоны доступа - вкладка - Временные критерии ' +
        'доступа. Попытка редактирования Служебного графика работы.', () => {

        const params = {
            error: 'Превышено максимальное количество элементов в поле {{field}}, допустимое количество {{maxCount}}'
        }

        describe('Попытка редактирования "Всегда"', () => {
            befAccess();
            aft();

            decorate.el.table.strHandler({
                strNumber: 2,
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
            decorate.el.butIcBefore.handler({
                icon: but.edit,
                timeout: entry.max
            });
            decorate.init.accessScheduleChangeEdit({
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
            decorate.el.input.sendKeys({
                title: 'Название',
                placeholder: '',
                value: 'test',
                timeout: entry.max
            });
            decorate.el.button.handler({
                name: 'Сохранить изменения',
                timeout: entry.max
            });
            decorate.el.error.error({
                text: params.error,
                timeout: entry.max
            });
        });

        describe('Попытка редактирования "Никогда"', () => {
            befAccess();
            aft();

            decorate.el.table.strHandler({
                strNumber: 3,
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
            decorate.el.butIcBefore.handler({
                icon: but.edit,
                timeout: entry.max
            });
            decorate.init.accessScheduleChangeEdit({
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
            decorate.el.input.sendKeys({
                title: 'Название',
                placeholder: '',
                value: 'test',
                timeout: entry.max
            });
            decorate.el.button.handler({
                name: 'Сохранить изменения',
                timeout: entry.max
            });
            decorate.el.error.error({
                text: params.error,
                timeout: entry.max
            });
        });
    });

    const deleteServiceFailed = () => describe('Бюро пропусков / Шаблоны доступа - вкладка - Временные критерии ' +
        'доступа. Попытка удаления Служебного графика работы.', () => {

        describe('Попытка удаления служебного графика "Всегда"', () => {
            befAccess();
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
            decorate.modalConfirm.accessSchedulesDelete.init({
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
                text: 'Служебные графики удалять запрещено',
                timeout: entry.max
            });
            decorate.modalConfirm.accessSchedulesDelete.initClose({
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
            decorate.el.table.size({
                strCount: 3,
                timeout: entry.max
            });
        });

        describe('Попытка удаления служебного графика "Никогда"', () => {
            befAccess();
            aft();

            decorate.el.table.strHandler({
                strNumber: 3,
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
            decorate.el.butIcBefore.handler({
                icon: but.delete,
                timeout: entry.max
            });
            decorate.modalConfirm.accessSchedulesDelete.init({
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
                text: 'Служебные графики удалять запрещено',
                timeout: entry.max
            });
            decorate.modalConfirm.accessSchedulesDelete.initClose({
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
            decorate.el.table.size({
                strCount: 3,
                timeout: entry.max
            });
        });

        describe('Попытка удаления служебного графика "Праздничное расписание"', () => {
            befAccess();
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
            decorate.modalConfirm.accessSchedulesDelete.init({
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
                text: 'Праздничное расписание удалить нельзя',
                timeout: entry.max
            });
            decorate.modalConfirm.accessSchedulesDelete.initClose({
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
            decorate.el.table.size({
                strCount: 3,
                timeout: entry.max
            });
        });

    });

    const searchFilter = () => describe(text + 'Проверка фильтра "Поиск..."', () => {
        if(type === 'week') {
            befAccess();
            aft();

            describe('Проверка таблицы до изпользования фильтра "Поиск..."', () => {
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
                    headTitle: 'Название',
                    strNumber: 2,
                    cellNumber: 1,
                    value: data.tzSlideUpdate.name,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Название',
                    strNumber: 3,
                    cellNumber: 1,
                    value: data.weekUpdate.name,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Название',
                    strNumber: 4,
                    cellNumber: 1,
                    value: data.zoneUpdate.name,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Название',
                    strNumber: 5,
                    cellNumber: 1,
                    value: 'Праздничное расписание',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Название',
                    strNumber: 6,
                    cellNumber: 1,
                    value: 'Всегда',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Название',
                    strNumber: 7,
                    cellNumber: 1,
                    value: 'Никогда',
                    timeout: entry.max
                });
            });

            describe(`Ввод в фильтр "${data.weekUpdate.name}"`, () => {
                decorate.el.input.sendKeys({
                    title: '',
                    placeholder: 'Поиск...',
                    value: data.weekUpdate.name,
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.error.checkError({
                    timeout: entry.sleep2
                });
            });

            describe('Проверка таблицы после иcпользования фильтра "Поиск..."', () => {
                decorate.el.table.size({
                    strCount: 1,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Название',
                    strNumber: 1,
                    cellNumber: 1,
                    value: data.weekUpdate.name,
                    timeout: entry.max
                });
            });

            describe(`Удаление "${data.weekUpdate.name}" из фильтра "Поиск..." и проверка таблицы`, () => {
                decorate.el.input.backSpace({
                    title: '',
                    placeholder: 'Поиск...',
                    timeout: entry.max
                });
                decorate.el.error.checkError({
                    timeout: entry.sleep2
                });
                dec.animation();
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
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
                    headTitle: 'Название',
                    strNumber: 2,
                    cellNumber: 1,
                    value: data.tzSlideUpdate.name,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Название',
                    strNumber: 3,
                    cellNumber: 1,
                    value: data.weekUpdate.name,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Название',
                    strNumber: 4,
                    cellNumber: 1,
                    value: data.zoneUpdate.name,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Название',
                    strNumber: 5,
                    cellNumber: 1,
                    value: 'Праздничное расписание',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Название',
                    strNumber: 6,
                    cellNumber: 1,
                    value: 'Всегда',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Название',
                    strNumber: 7,
                    cellNumber: 1,
                    value: 'Никогда',
                    timeout: entry.max
                });
            });
        }

        if(type === 'template') {
            befTemplate();
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
                    value: data.templateUpdate.name + ' (Копировать)',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Название',
                    strNumber: 2,
                    cellNumber: 1,
                    value: data.templateUpdate.name,
                    timeout: entry.max
                });
            });

            describe(`Ввод в фильтр "${data.templateUpdate.name} (Копировать)"`, () => {
                decorate.el.input.sendKeys({
                    title: '',
                    placeholder: 'Поиск...',
                    value: data.templateUpdate.name + ' (Копировать)',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.error.checkError({
                    timeout: entry.sleep2
                });
            });

            describe('Проверка таблицы после иcпользования фильтра "Поиск..."', () => {
                decorate.el.table.size({
                    strCount: 1,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Название',
                    strNumber: 1,
                    cellNumber: 1,
                    value: data.templateUpdate.name + ' (Копировать)',
                    timeout: entry.max
                });
            });

            describe(`Удаление "${data.templateUpdate.name} (Копировать)" из фильтра "Поиск..." и проверка таблицы`,
                () => {
                decorate.el.input.backSpace({
                    title: '',
                    placeholder: 'Поиск...',
                    timeout: entry.max
                });
                decorate.el.error.checkError({
                    timeout: entry.sleep2
                });

                dec.animation();
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.table.size({
                    strCount: 2,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Название',
                    strNumber: 1,
                    cellNumber: 1,
                    value: data.templateUpdate.name + ' (Копировать)',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Название',
                    strNumber: 2,
                    cellNumber: 1,
                    value: data.templateUpdate.name,
                    timeout: entry.max
                });
            });
        }
    });

    const searchType = () => describe('Бюро пропусков / Шаблоны доступа - вкладка - Временные критерии. ' +
        'Проверка фильтра по типу', () => {

        befAccess();
        aft();

        describe('Проверка до примения фильтров', () => {
            decorate.el.table.size({
                strCount: 7,
                timeout: entry.max
            });
            decorate.el.table.cellGetText({
                headTitle: 'Тип',
                strNumber: 1,
                cellNumber: 3,
                value: 'Скользящий понедельный график',
                timeout: entry.max
            });
            decorate.el.table.cellGetText({
                headTitle: 'Тип',
                strNumber: 2,
                cellNumber: 3,
                value: 'Скользящий посуточный график',
                timeout: entry.max
            });
            decorate.el.table.cellGetText({
                headTitle: 'Тип',
                strNumber: 3,
                cellNumber: 3,
                value: 'Недельный график',
                timeout: entry.max
            });
            decorate.el.table.cellGetText({
                headTitle: 'Тип',
                strNumber: 4,
                cellNumber: 3,
                value: 'Временные зоны',
                timeout: entry.max
            });
            decorate.el.table.cellGetText({
                headTitle: 'Тип',
                strNumber: 5,
                cellNumber: 3,
                value: 'Праздничное расписание',
                timeout: entry.max
            });
            decorate.el.table.cellGetText({
                headTitle: 'Тип',
                strNumber: 6,
                cellNumber: 3,
                value: 'Временные зоны',
                timeout: entry.max
            });
            decorate.el.table.cellGetText({
                headTitle: 'Тип',
                strNumber: 7,
                cellNumber: 3,
                value: 'Временные зоны',
                timeout: entry.max
            });
        });

        describe('Выбор типа - Временные зоны', () => {
            decorate.el.select.iconXpand({
                title: '',
                value: 'Все',
                text: 'Временные зоны',
                timeout: entry.max
            });
            decorate.el.error.checkError({
                timeout: entry.sleep2
            });
            dec.animation();
            decorate.el.table.size({
                strCount: 3,
                timeout: entry.max
            });
            decorate.el.table.cellGetText({
                headTitle: 'Тип',
                strNumber: 1,
                cellNumber: 3,
                value: 'Временные зоны',
                timeout: entry.max
            });
            decorate.el.table.cellGetText({
                headTitle: 'Тип',
                strNumber: 2,
                cellNumber: 3,
                value: 'Временные зоны',
                timeout: entry.max
            });
            decorate.el.table.cellGetText({
                headTitle: 'Тип',
                strNumber: 3,
                cellNumber: 3,
                value: 'Временные зоны',
                timeout: entry.max
            });
        });

        describe('Выбор типа - Недельный график', () => {
            decorate.el.select.iconXpand({
                title: '',
                value: 'Временные зоны',
                text: 'Недельный график',
                timeout: entry.max
            });
            decorate.el.error.checkError({
                timeout: entry.sleep2
            });
            dec.animation();
            decorate.el.table.size({
                strCount: 1,
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

        describe('Выбор типа - Скользящий посуточный график', () => {
            decorate.el.select.iconXpand({
                title: '',
                value: 'Недельный график',
                text: 'Скользящий посуточный график',
                timeout: entry.max
            });
            decorate.el.error.checkError({
                timeout: entry.sleep2
            });
            dec.animation();
            decorate.el.table.size({
                strCount: 1,
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

        describe('Выбор типа - Скользящий понедельный график', () => {
            decorate.el.select.iconXpand({
                title: '',
                value: 'Скользящий посуточный график',
                text: 'Скользящий понедельный график',
                timeout: entry.max
            });
            decorate.el.error.checkError({
                timeout: entry.sleep2
            });
            dec.animation();
            decorate.el.table.size({
                strCount: 1,
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

        describe('Выбор типа - Праздничное расписание', () => {
            decorate.el.select.iconXpand({
                title: '',
                value: 'Скользящий понедельный график',
                text: 'Праздничное расписание',
                timeout: entry.max
            });
            decorate.el.error.checkError({
                timeout: entry.sleep2
            });
            dec.animation();
            decorate.el.table.size({
                strCount: 1,
                timeout: entry.max
            });
            decorate.el.table.cellGetText({
                headTitle: 'Тип',
                strNumber: 1,
                cellNumber: 3,
                value: 'Праздничное расписание',
                timeout: entry.max
            });

        });

        describe('Выбор типа - Все', () => {
            decorate.el.select.iconXpand({
                title: '',
                value: 'Праздничное расписание',
                text: 'Все',
                timeout: entry.max
            });
            decorate.el.error.checkError({
                timeout: entry.sleep2
            });
            dec.animation();
            decorate.el.table.size({
                strCount: 7,
                timeout: entry.max
            });
            decorate.el.table.cellGetText({
                headTitle: 'Тип',
                strNumber: 1,
                cellNumber: 3,
                value: 'Скользящий понедельный график',
                timeout: entry.max
            });
            decorate.el.table.cellGetText({
                headTitle: 'Тип',
                strNumber: 2,
                cellNumber: 3,
                value: 'Скользящий посуточный график',
                timeout: entry.max
            });
            decorate.el.table.cellGetText({
                headTitle: 'Тип',
                strNumber: 3,
                cellNumber: 3,
                value: 'Недельный график',
                timeout: entry.max
            });
            decorate.el.table.cellGetText({
                headTitle: 'Тип',
                strNumber: 4,
                cellNumber: 3,
                value: 'Временные зоны',
                timeout: entry.max
            });
            decorate.el.table.cellGetText({
                headTitle: 'Тип',
                strNumber: 5,
                cellNumber: 3,
                value: 'Праздничное расписание',
                timeout: entry.max
            });
            decorate.el.table.cellGetText({
                headTitle: 'Тип',
                strNumber: 6,
                cellNumber: 3,
                value: 'Временные зоны',
                timeout: entry.max
            });
            decorate.el.table.cellGetText({
                headTitle: 'Тип',
                strNumber: 7,
                cellNumber: 3,
                value: 'Временные зоны',
                timeout: entry.max
            });

        });
    });

    const holiday = () => describe('Бюро пропусков / Шаблоны доступа - вкладка - Временные критерии. ' +
        'Редактирование праздничного расписания.', () => {

        describe('Добавление праздничных дней', () => {
            befAccess();
            aft();

            describe('Открытие на редатирование', () => {
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
                decorate.init.accessScheduleChangeEdit();
                decorate.page.accessTemplateScheduleChange.holidayCount({
                    count: 0,
                    timeout: entry.max
                });
            });

            describe('Добавления день 1', () => {
                decorate.el.select.iconXpand({
                    title: 'Месяц',
                    value: 'Выберите месяц',
                    text: 'Январь',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.select.iconXpand({
                    title: 'День',
                    value: 'Выберите день',
                    text: '1',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.select.iconXpand({
                    title: 'Тип',
                    value: 'Выберите тип',
                    text: '1',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.button.handler({
                    name: 'Добавить праздничный день'
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
            });

            describe('Добавления день 2', () => {
                decorate.el.select.iconXpand({
                    title: 'Месяц',
                    value: 'Январь',
                    text: 'Октябрь',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.select.iconXpand({
                    title: 'Месяц',
                    value: 'Октябрь',
                    text: 'Декабрь',
                    timeout: entry.max
                });
                decorate.el.select.iconXpand({
                    title: 'День',
                    value: '1',
                    text: '10',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.select.iconXpand({
                    title: 'День',
                    value: '10',
                    text: '20',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.select.iconXpand({
                    title: 'День',
                    value: '20',
                    text: '30',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.select.iconXpand({
                    title: 'Тип',
                    value: '1',
                    text: '8',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.button.handler({
                    name: 'Добавить праздничный день'
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
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.error.checkError({
                    timeout: entry.sleep2
                });
                decorate.el.success.success({
                    text: 'Сохранено успешно',
                    timeout: entry.max
                });
            });
        });

        describe('Проверка добавленных праздничных дней', () => {
            befAccess();
            aft();

            describe('Открыти на редатирование', () => {
                decorate.page.base.refresh();
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
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
                decorate.init.accessScheduleChangeEdit();
                decorate.page.accessTemplateScheduleChange.holidayCount({
                    count: 2,
                    timeout: entry.max
                });
            });

            describe('Проверка общих параметров', () => {
                decorate.el.input.getValue({
                    title: 'Название',
                    placeholder: '',
                    value: 'Праздничное расписание',
                    timeout: entry.max
                });
                decorate.el.select.select({
                    title: 'Временной критерий',
                    value: 'Праздничное расписание',
                    timeout: entry.max
                });
                decorate.page.accessTemplateScheduleChange.holidayCount({
                    count: 2,
                    timeout: entry.max
                });
            });

            describe('Проверка день 1', () => {
                decorate.page.accessTemplateScheduleChange.holidayDate({
                    num: 1,
                    value: '1 Январь',
                    timeout: entry.max
                });
                decorate.page.accessTemplateScheduleChange.holidayType({
                    num: 1,
                    value: '1 Тип',
                    timeout: entry.max
                });
            });

            describe('Проверка день 2', () => {
                decorate.page.accessTemplateScheduleChange.holidayDate({
                    num: 2,
                    value: '30 Декабрь',
                    timeout: entry.max
                });
                decorate.page.accessTemplateScheduleChange.holidayType({
                    num: 2,
                    value: '8 Тип',
                    timeout: entry.max
                });
            });

        });

        describe('Удаление праздничных дней', () => {
            befAccess();
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
            decorate.init.accessScheduleChangeEdit();
            decorate.page.accessTemplateScheduleChange.holidayCount({
                count: 2,
                timeout: entry.max
            });
            decorate.page.accessTemplateScheduleChange.holidayDelete({
                num: 2,
                timeout: entry.max
            });
            decorate.page.accessTemplateScheduleChange.holidayDelete({
                num: 1,
                timeout: entry.max
            });
            decorate.el.button.handler({
                name: 'Сохранить изменения',
                timeout: entry.max
            });
            decorate.el.error.checkError({
                timeout: entry.sleep2
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
            decorate.el.success.success({
                text: 'Сохранено успешно',
                timeout: entry.max
            });
        });

        describe('Проверка праздничного расписания после удалния праздничных дней', () => {
            befAccess();
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
            decorate.init.accessScheduleChangeEdit();
            decorate.page.accessTemplateScheduleChange.holidayCount({
                count: 0,
                timeout: entry.max
            });
        });

    });

    const commission = () => describe(text + 'Проверка отображения', () => {

        if(type === 'commission') {
            befCommission();
            aft();
            decorate.page.accessCommission.room({
                room: 'Неконтролируемая территория',
                timeout: entry.max
            });
            decorate.page.accessCommission.room({
                room: data.rooms.room1,
                timeout: entry.max
            });
            decorate.page.accessCommission.room({
                room: data.rooms.room2,
                timeout: entry.max
            });
            decorate.page.accessCommission.room({
                room: data.rooms.room3,
                timeout: entry.max
            });
            decorate.page.accessCommission.roomHandler({
                room: data.rooms.room2,
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
            decorate.el.button.button({
                name: 'Сохранить изменения',
                timeout: entry.max
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

const other = () => {
    const addDataTemplate = () => describe('Добавление данных для тестирования подраздела Шаблоны доступа', () => {

        befTemplate();
        aft();

        const params = {...data}

        describe('Добавление помещений', () => {
            decorate.api.addRoomParent({
                room: params.rooms.room1
            });
            decorate.api.addRoomChild({
                child: params.rooms.room2,
                parent: params.rooms.room1
            });
            decorate.api.addRoomChild({
                child: params.rooms.room3,
                parent: params.rooms.room2
            });
        });

        describe('Добавление устройств', () => {
            decorate.api.addDevice(params.devices.device1.obj);
            decorate.api.addDevice(params.devices.device2.obj);
            decorate.api.addDevice(params.devices.device3.obj);
        });

        describe('Добавление устройств в помещение', () => {
            decorate.api.addDeviceInRoom({
                device: params.devices.device1.ip,
                room: params.rooms.room1
            });
            decorate.api.addDeviceInRoom({
                device: params.devices.device2.ip,
                room: params.rooms.room2
            });
            decorate.api.addDeviceInRoom({
                device: params.devices.device3.ip,
                room: params.rooms.room3
            });
        });
    });

    const addDataStaffTemplate = () => describe('Добавление данных для тестирования подраздела Шаблоны доступа ' +
        '- Удаление шаблона.', () => {

        befTemplate();
        aft();

        const params = {...data}

        describe('Добавление сотрудника', () => {
            it(`Добавление сотрудника "${params.fio.staff1}".`, async () => {
                const cook = await page.base.getCookie('token');
                const arrTemplate = await api.getTemplate(cook.text);
                const templateId = arrTemplate.text.filter(obj => obj.name === params.templateUpdate.name)[0].id;
                const staff = {
                    ...params.staffs.staff1,
                    access_template: [templateId]
                }
                await dec.simple(api.putStaff,
                    [[staff], cook.text],
                    api.putStaff);
            });
        });
    });

    const deleteDataStaffTemplate = () => describe('Удаление данных для тестирования подраздела Шаблоны доступа ' +
        '- Удаление шаблона.', () => {
        const params = {...data}
        decorate.db.truncateUserAdditionalFieldFata();
        decorate.db.truncateUserDocument();
        decorate.db.truncateUserStaff();
        decorate.db.truncateUserVisitor();
        decorate.db.deleteUser({
            lastName: params.staffs.staff1.last_name,
            name: params.staffs.staff1.first_name,
            middleName: params.staffs.staff1.middle_name,
        });
        decorate.db.truncateUserCar();
        decorate.db.truncateUserBarcode();
        decorate.page.base.loading({
            timeout: entry.sleep2
        });
    });

    const deleteDataTemplate = () => describe('Удаление данных для тестирования подраздела Шаблоны доступа', () => {

        const params = {...data}

        describe('Удаление устройств', () => {
            decorate.db.deleteDevice({
                ip: params.devices.device1.ip
            });
            decorate.db.deleteDevice({
                ip: params.devices.device2.ip
            });
            decorate.db.deleteDevice({
                ip: params.devices.device3.ip
            });
        });

        describe('Удаление помещений', () => {
            decorate.db.deleteAccessZone({
                name: params.rooms.room1
            });
            decorate.db.deleteAccessZone({
                name: params.rooms.room2
            });
            decorate.db.deleteAccessZone({
                name: params.rooms.room3
            });
        });
    });

    return {
        addDataTemplate,
        addDataStaffTemplate,
        deleteDataStaffTemplate,
        deleteDataTemplate
    }
}

module.exports = {
    testZone: test('zone', 'Бюро пропусков / Шаблоны доступа - вкладка - Временные критерии доступа - ' +
        'тип - Временные зоны. '),
    testWeek: test('week', 'Бюро пропусков / Шаблоны доступа - вкладка - Временные критерии доступа. - ' +
        'тип - Недельный график.'),
    testSlideTZ: test('slideTZ', 'Бюро пропусков / Шаблоны доступа - вкладка - Временные критерии ' +
        'доступа - тип - Скользящий посуточный график. '),
    testSlideW: test('slidW', 'Бюро пропусков / Шаблоны доступа - вкладка - Временные критерии доступа. ' +
        '- тип - Скользящий понедельный график.'),
    testTemplate: test('template', 'Бюро пропусков / Шаблоны доступа - вкладка - Шаблоны доступа. '),
    testCommission: test('commission', 'Бюро пропусков / Шаблоны доступа - вкладка - Комиссионирование. '),
    test: test(),
    other: other()
}