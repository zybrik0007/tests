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
const data = require('../../data').dataTask;
const befPosition  = require('../personal/position-ui').befPosition;

const bef = () => before('Вход и открытие подраздела "Задания"', async () => {
    await page.base.loading(entry.sleep1);
    await dec.auth(entry.customLogin, entry.customPassword);
    await dec.simple(el.section.handler, [sec.adm, entry.max], el.section);
    await dec.simple(el.subsection.handler, [sub.adm.task, entry.max], el.subsection);
    await dec.simple(page.task.init, [entry.max], page.task);
    await page.base.loading(entry.sleep1);
});

const aft = () => after('Выход', async () => {
    await page.base.loading(entry.sleep1);
    await dec.exit();
});

const other = () => {

    const addTask = () => describe('Администрирование / Задания. Добавление задания.', () => {

        describe('Добавление', () => {
            bef();
            aft();
            decorate.el.butIcBefore.handler({
                icon: but.add,
                timeout: entry.max
            });
            decorate.init.taskChangeAdd();
            decorate.el.input.sendKeys({
                title: 'Название',
                placeholder: '',
                value: data.task1.name,
                timeout: entry.max
            });
            decorate.el.select.iconXpand({
                title: 'Когда выполнять',
                value:  data.task1.time,
                text: data.task1.time,
                timeout: entry.max
            });
            decorate.page.taskChange.dayHandler({
                day: 'ПН',
                timeout: entry.max
            });
            decorate.page.taskChange.dayHandler({
                day: 'ВТ',
                timeout: entry.max
            });
            decorate.page.taskChange.dayHandler({
                day: 'СР',
                timeout: entry.max
            });
            decorate.page.taskChange.dayHandler({
                day: 'ЧТ',
                timeout: entry.max
            });
            decorate.page.taskChange.dayHandler({
                day: 'ПТ',
                timeout: entry.max
            });
            decorate.page.taskChange.dayHandler({
                day: 'СБ',
                timeout: entry.max
            });
            decorate.el.select.iconRecentOutline({
                title: 'Время начала',
                value: '00:00:00',
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
            decorate.el.timepicker.timepicker({
                timeout: entry.max
            });
            decorate.el.timepicker.hourSendKeys({
                value: data.task1.timeStart,
                timeout: entry.max
            });
            decorate.el.select.iconRecentOutline({
                title: 'Время окончания',
                value: '00:00:00',
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
            decorate.el.timepicker.timepicker({
                timeout: entry.max
            });
            decorate.el.timepicker.hourSendKeys({
                value: data.task1.timeEnd,
                timeout: entry.max
            });
            decorate.page.taskChange.actionHandler({
                name: data.task1.action1,
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
            bef();
            aft();

            describe('Проверка таблицы', () => {
                decorate.el.table.size({
                    strCount: 2,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Название',
                    strNumber: 1,
                    cellNumber: 1,
                    value: data.task1.name,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Когда выполнять',
                    strNumber: 1,
                    cellNumber: 2,
                    value: data.task1.day7,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Начало',
                    strNumber: 1,
                    cellNumber: 3,
                    value: data.task1.timeStart,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Конец',
                    strNumber: 1,
                    cellNumber: 4,
                    value: data.task1.timeEnd,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Статус выполнения',
                    strNumber: 1,
                    cellNumber: 5,
                    value: '',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Дата',
                    strNumber: 1,
                    cellNumber: 6,
                    value: '',
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
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.init.taskChangeEdit();
                decorate.el.input.getValue({
                    title: 'Название',
                    placeholder: '',
                    value: data.task1.name,
                    timeout: entry.max
                });
                decorate.el.select.select({
                    title: 'Когда выполнять',
                    value: data.task1.time,
                    timeout: entry.max
                });
                decorate.page.taskChange.dayNoActive({
                    day: 'ПН',
                    timeout: entry.max
                });
                decorate.page.taskChange.dayNoActive({
                    day: 'ВТ',
                    timeout: entry.max
                });
                decorate.page.taskChange.dayNoActive({
                    day: 'СР',
                    timeout: entry.max
                });
                decorate.page.taskChange.dayNoActive({
                    day: 'ЧТ',
                    timeout: entry.max
                });
                decorate.page.taskChange.dayNoActive({
                    day: 'ПТ',
                    timeout: entry.max
                });
                decorate.page.taskChange.dayNoActive({
                    day: 'СБ',
                    timeout: entry.max
                });
                decorate.page.taskChange.dayActive({
                    day: 'ВС',
                    timeout: entry.max
                });
                decorate.el.select.select({
                    title: 'Время начала',
                    value: data.task1.timeStart,
                    timeout: entry.max
                });
                decorate.el.select.select({
                    title: 'Время окончания',
                    value: data.task1.timeEnd,
                    timeout: entry.max
                });
                decorate.page.taskChange.actionSelectedGetText({
                    number: 1,
                    value: data.task1.action1,
                    timeout: entry.max
                });
            });
        });
    });

    const editTask = () => describe('Администрирование / Задания. Редактирование задания.', () => {

        describe('Редактировнаие', () => {
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
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
            decorate.init.taskChangeEdit();
            decorate.el.input.backSpace({
                title: 'Название',
                placeholder: '',
                timeout: entry.max
            });
            decorate.el.input.sendKeys({
                title: 'Название',
                placeholder: '',
                value: data.task2.name,
                timeout: entry.max
            });
            decorate.el.select.iconXpand({
                title: 'Когда выполнять',
                value:  data.task1.time,
                text: data.task2.time,
                timeout: entry.max
            });
            decorate.el.input.iconCalendar({
                title: 'Дата',
                placeholder: '',
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
            decorate.el.datepicker.dateParse({
                day: 1,
                month: 'Январь',
                year: '2023',
                scrollYear: -500,
                timeout: entry.max
            });
            decorate.page.taskChange.actionSelectedDelete({
                number: 1,
                timeout: entry.max
            });
            decorate.modalConfirm.taskActionDelete.init({
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
            decorate.el.button.handler({
                name: 'Удалить',
                timeout: entry.max
            });
            decorate.modalConfirm.taskActionDelete.initClose({
                timeout: entry.max
            });
            decorate.page.taskChange.actionHandler({
                name: data.task2.action1,
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
            decorate.el.select.iconXpand({
                title: 'Выберите устройство',
                value: '',
                text: entry.device_name_1,
                timeout: entry.max
            });
            decorate.el.select.iconXpand({
                title: 'Выберите команду',
                value: data.task2.command,
                text: data.task2.command,
                timeout: entry.max
            });
            decorate.el.button.handler({
                name: 'Сохранить',
                timeout: entry.max
            });
            decorate.page.taskChange.actionHandler({
                name: data.task2.action2,
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
            bef();
            aft();

            describe('Проверка таблицы', () => {
                decorate.el.table.size({
                    strCount: 2,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Название',
                    strNumber: 1,
                    cellNumber: 1,
                    value: data.task2.name,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Когда выполнять',
                    strNumber: 1,
                    cellNumber: 2,
                    value: data.task2.date,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Начало',
                    strNumber: 1,
                    cellNumber: 3,
                    value: data.task2.timeStart,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Конец',
                    strNumber: 1,
                    cellNumber: 4,
                    value: data.task2.timeEnd,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Статус выполнения',
                    strNumber: 1,
                    cellNumber: 5,
                    value: '',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Дата',
                    strNumber: 1,
                    cellNumber: 6,
                    value: '',
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
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.init.taskChangeEdit();
                decorate.el.input.getValue({
                    title: 'Название',
                    placeholder: '',
                    value: data.task2.name,
                    timeout: entry.max
                });
                decorate.el.select.select({
                    title: 'Когда выполнять',
                    value: data.task2.time,
                    timeout: entry.max
                });
                decorate.el.input.getValue({
                    title: 'Дата',
                    placeholder: '',
                    value: data.task2.date,
                    timeout: entry.max
                });
                decorate.el.select.select({
                    title: 'Время начала',
                    value: data.task2.timeStart,
                    timeout: entry.max
                });
                decorate.el.select.select({
                    title: 'Время окончания',
                    value: data.task2.timeEnd,
                    timeout: entry.max
                });
                decorate.page.taskChange.actionSelectedGetText({
                    number: 1,
                    value: data.task2.action2,
                    timeout: entry.max
                });
                decorate.page.taskChange.actionSelectedGetText({
                    number: 2,
                    value: data.task2.action1,
                    timeout: entry.max
                });
            });
        });
    });

    const editTaskUpdate = () => describe('Администрирование / Задания. Повторное редактирование задания.', () => {

        describe('Редактировнаие', () => {
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
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
            decorate.init.taskChangeEdit();
            decorate.el.input.backSpace({
                title: 'Название',
                placeholder: '',
                timeout: entry.max
            });
            decorate.el.input.sendKeys({
                title: 'Название',
                placeholder: '',
                value: data.task3.name,
                timeout: entry.max
            });
            decorate.el.select.iconXpand({
                title: 'Когда выполнять',
                value:  data.task2.time,
                text: data.task3.time,
                timeout: entry.max
            });
            decorate.el.select.iconXpand({
                title: 'Выберите день',
                value: '1',
                text: data.task3.day,
                timeout: entry.max
            });
            decorate.page.taskChange.actionSelectedDelete({
                number: 2,
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
            decorate.el.button.handler({
                name: 'Удалить',
                timeout: entry.max
            });
            decorate.modalConfirm.taskActionDelete.initClose({
                timeout: entry.max
            });
            decorate.page.taskChange.actionSelectedDelete({
                number: 1,
                timeout: entry.max
            });
            decorate.modalConfirm.taskActionDelete.init({
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
            decorate.el.button.handler({
                name: 'Удалить',
                timeout: entry.max
            });
            decorate.modalConfirm.taskActionDelete.initClose({
                timeout: entry.max
            });

            decorate.page.taskChange.actionHandler({
                name: data.task3.action1,
                timeout: entry.max
            });
            decorate.modal.selectPeriod.init({
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
            decorate.el.select.iconXpand({
                title: '',
                value: 'сегодня',
                text: data.task3.actionData3,
                timeout: entry.max
            });
            decorate.el.button.handler({
                name: 'Применить',
                timeout: entry.max
            });
            decorate.modal.selectPeriod.initClose({
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });

            decorate.page.taskChange.actionHandler({
                name: data.task3.action2,
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
            decorate.el.select.iconXpand({
                title: 'Выберите устройство',
                value: '',
                text: entry.device_name_1,
                timeout: entry.max
            });
            decorate.el.select.iconXpand({
                title: 'Выберите команду',
                value: data.task3.command,
                text: data.task3.command,
                timeout: entry.max
            });
            decorate.el.button.handler({
                name: 'Сохранить',
                timeout: entry.max
            });

            decorate.page.taskChange.actionHandler({
                name: data.task3.action3,
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
            bef();
            aft();

            describe('Проверка таблицы', () => {
                decorate.el.table.size({
                    strCount: 2,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Название',
                    strNumber: 1,
                    cellNumber: 1,
                    value: data.task3.name,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Когда выполнять',
                    strNumber: 1,
                    cellNumber: 2,
                    value: '',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Начало',
                    strNumber: 1,
                    cellNumber: 3,
                    value: data.task3.timeStart,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Конец',
                    strNumber: 1,
                    cellNumber: 4,
                    value: data.task3.timeEnd,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Статус выполнения',
                    strNumber: 1,
                    cellNumber: 5,
                    value: '',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Дата',
                    strNumber: 1,
                    cellNumber: 6,
                    value: '',
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
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.init.taskChangeEdit();
                decorate.el.input.getValue({
                    title: 'Название',
                    placeholder: '',
                    value: data.task3.name,
                    timeout: entry.max
                });
                decorate.el.select.select({
                    title: 'Когда выполнять',
                    value: data.task3.time,
                    timeout: entry.max
                });
                decorate.el.select.select({
                    title: 'Выберите день',
                    value: data.task3.day,
                    timeout: entry.max
                });
                decorate.el.select.select({
                    title: 'Время начала',
                    value: data.task3.timeStart,
                    timeout: entry.max
                });
                decorate.el.select.select({
                    title: 'Время окончания',
                    value: data.task3.timeEnd,
                    timeout: entry.max
                });
                decorate.page.taskChange.actionSelectedGetText({
                    number: 1,
                    value: data.task3.action3,
                    timeout: entry.max
                });
                decorate.page.taskChange.actionSelectedGetText({
                    number: 2,
                    value: data.task3.action2,
                    timeout: entry.max
                });
                decorate.page.taskChange.actionSelectedGetText({
                    number: 3,
                    value: data.task3.action1,
                    timeout: entry.max
                });
            });
        });
    });

    const searchFilter = () => describe('Администрирование / Задания. Проверка фильтра "Поиск...".', () => {
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
                value: data.task3.name,
                timeout: entry.max
            });
            decorate.el.table.cellGetText({
                headTitle: 'Название',
                strNumber: 2,
                cellNumber: 1,
                value: data.defaultValue,
                timeout: entry.max
            });
        });

        describe(`Ввод в фильтр "${data.defaultValue}"`, () => {
            decorate.el.input.sendKeys({
                title: '',
                placeholder: 'Поиск...',
                value: data.defaultValue,
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
                value: data.defaultValue,
                timeout: entry.max
            });
        });

        describe(`Удаление "${data.defaultValue}" из фильтра "Поиск..." и проверка таблицы`, () => {
            decorate.el.input.backSpace({
                title: '',
                placeholder: 'Поиск...',
                timeout: entry.max
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
                value: data.task3.name,
                timeout: entry.max
            });
            decorate.el.table.cellGetText({
                headTitle: 'Название',
                strNumber: 2,
                cellNumber: 1,
                value: data.defaultValue,
                timeout: entry.max
            });
        });
    });

    const deleteTask = () => describe('Администрирование / Задания. Удаление задания', () => {

        describe('Удаление задания', () => {
            bef();
            aft();
            decorate.el.table.strHandler({
                strNumber: 1,
                timeout: entry.max
            });
            decorate.el.butIcBefore.handler({
                icon: but.delete,
                timeout: entry.max
            });
            decorate.modalConfirm.deleteTask.init({
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
            decorate.el.button.handler({
                name: 'Удалить',
                timeout: entry.max
            });
            decorate.modalConfirm.deleteTask.initClose({
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
        });

        describe('Проверка таблицы', () => {
            bef();
            aft();
            decorate.el.table.size({
                strCount: 1,
                timeout: entry.max
            });
            decorate.el.table.cellGetText({
                headTitle: 'Название',
                strNumber: 1,
                cellNumber: 1,
                value: data.defaultValue,
                timeout: entry.max
            });
        });
    });

    const addFailed = () => describe('Администрирование / Задания. Попытка добавления с невалидными данными.', () => {
        bef();
        aft();

        describe('Попытка добавления без выбранного действия', () => {
            decorate.el.butIcBefore.handler({
                icon: but.add,
                timeout: entry.max
            });
            decorate.init.taskChangeAdd();
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
            decorate.el.button.handler({
                name: 'Сохранить изменения',
                timeout: entry.max
            });
            decorate.el.error.error({
                text: 'Выберите минимум одно действие',
                timeout: entry.max
            });
        });

        describe('Попытка добавления без названия', () => {
            decorate.page.taskChange.actionHandler({
                name: data.task1.action1,
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
                text: 'В поле name должно быть минимум 1 символов',
                timeout: entry.max
            });
        });

        describe('Попытка добавления если вермя начала меньше иили равно времени окончания', () => {
            decorate.el.input.sendKeys({
                title: 'Название',
                placeholder: '',
                value: data.task1.name,
                timeout: entry.max
            });
            decorate.el.button.handler({
                name: 'Сохранить изменения',
                timeout: entry.max
            });
            decorate.el.error.error({
                text: 'Время начала должно быть раньше времени окончания',
                timeout: entry.max
            });
        });
    });

    return {
        addTask,
        editTask,
        editTaskUpdate,
        searchFilter,
        deleteTask,
        addFailed
    }
}

module.exports = {
    other: other()
}