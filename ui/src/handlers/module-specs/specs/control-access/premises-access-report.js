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

const befAll = () => before('Вход и открытие подраздела "Отчет по доступу в помещения" вкладка "Все"', async () => {
    await dec.auth(entry.customLogin, entry.customPassword);
    await dec.simple(el.section.handler, [sec.con, entry.max], el.section);
    await dec.simple(el.subsection.handler, [sub.con.room, entry.max], el.subsection);
    await dec.simple(el.tab.handler, ['Все', entry.max], el.tab);
    await dec.simple(page.premisesAccessReportAll.init, [entry.max], page.premisesAccessReportAll);
    await page.base.loading(2000);
});

const befStaff = () => before('Вход и открытие подраздела "Отчет по доступу в помещения" вкладка "Сотрудники"', async () => {
    await dec.auth(entry.customLogin, entry.customPassword);
    await dec.simple(el.section.handler, [sec.con, entry.max], el.section);
    await dec.simple(el.subsection.handler, [sub.con.room, entry.max], el.subsection);
    await dec.simple(el.tab.handler, ['Сотрудники', entry.max], el.tab);
    await dec.simple(page.premisesAccessReportStaff.init, [entry.max], page.premisesAccessReportStaff);
    await page.base.loading(2000);
});

const befVisitor = () => before('Вход и открытие подраздела "Отчет по доступу в помещения" вкладка "Посетители"', async () => {
    await dec.auth(entry.customLogin, entry.customPassword);
    await dec.simple(el.section.handler, [sec.con, entry.max], el.section);
    await dec.simple(el.subsection.handler, [sub.con.room, entry.max], el.subsection);
    await dec.simple(el.tab.handler, ['Посетители', entry.max], el.tab);
    await dec.simple(page.premisesAccessReportVisitor.init, [entry.max], page.premisesAccessReportVisitor);
    await page.base.loading(2000);
});

const aft = () => after('Выход', async () => await dec.exit());

const other = (user, tab, bef) => {

    const display = () => describe(`Котроль доступа / Отчет по доступу в помещения / вкладка ${tab}.
    Общая проверка без данных.`, () => {

        bef();
        aft();

        describe('Общее отображение', () => {
            decorate.el.section.active({
                section: sec.con,
                timeout: entry.max
            });

            decorate.el.subsection.active({
                subsection: sub.con.room,
                timeout: entry.max
            });

            decorate.el.subsection.headerGetText({
                value: 'КОНТРОЛЬ ДОСТУПА',
                timeout: entry.max
            });

            decorate.el.subsection.headerGetText({
                value: 'КОНТРОЛЬ ДОСТУПА',
                timeout: entry.max
            });

            decorate.el.header.getText({
                value: 'Отчет по доступу в помещения',
                timeout: entry.max
            });

            decorate.el.header.userGetText({
                value: entry.user,
                timeout: entry.max
            });
        });

        describe('Отображение фильтров и кнопок', () => {

            decorate.el.butIc.button({
                icon: icon.expanded_filter,
                timeout: entry.max
            });

            decorate.el.butIcBefore.active({
                icon: but.menu,
                timeout: entry.max
            });

            decorate.el.selectInput.select({
                title: '',
                placeholder: 'Помещение'
            });

            decorate.el.selectInput.select({
                title: '',
                placeholder: 'Подразделение'
            });

            decorate.el.input.input({
                title: '',
                placeholder: 'Поиск...'
            });
        });

        if(user === 'all') {
            describe('Отображние таблицы', () => {
                decorate.el.table.headGetText({
                    headNumber: 1,
                    value: 'ФИО',
                    timeout: entry.max
                });

                decorate.el.table.headGetText({
                    headNumber: 2,
                    value: 'Карта',
                    timeout: entry.max
                });

                decorate.el.table.headGetText({
                    headNumber: 3,
                    value: 'Штрихкод',
                    timeout: entry.max
                });

                decorate.el.table.headGetText({
                    headNumber: 4,
                    value: 'Помещение',
                    timeout: entry.max
                });

                decorate.el.table.headGetText({
                    headNumber: 5,
                    value: 'Тип доступа',
                    timeout: entry.max
                });

                decorate.el.table.headGetText({
                    headNumber: 6,
                    value: 'Должность',
                    timeout: entry.max
                });

                decorate.el.table.headGetText({
                    headNumber: 7,
                    value: 'Подразделение',
                    timeout: entry.max
                });

                decorate.el.table.headGetText({
                    headNumber: 8,
                    value: 'Подтверждающий документ',
                    timeout: entry.max
                });

                decorate.el.table.headGetText({
                    headNumber: 9,
                    value: 'Номер документа',
                    timeout: entry.max
                });

                decorate.el.table.headGetText({
                    headNumber: 10,
                    value: 'Шаблон доступа',
                    timeout: entry.max
                });

                decorate.el.table.headGetText({
                    headNumber: 11,
                    value: 'Верификация',
                    timeout: entry.max
                });
            });
        }

        if(user === 'staff') {
            describe('Отображние таблицы', () => {
                decorate.el.table.headGetText({
                    headNumber: 1,
                    value: 'ФИО',
                    timeout: entry.max
                });

                decorate.el.table.headGetText({
                    headNumber: 2,
                    value: 'Карта',
                    timeout: entry.max
                });

                decorate.el.table.headGetText({
                    headNumber: 3,
                    value: 'Штрихкод',
                    timeout: entry.max
                });

                decorate.el.table.headGetText({
                    headNumber: 4,
                    value: 'Помещение',
                    timeout: entry.max
                });

                decorate.el.table.headGetText({
                    headNumber: 5,
                    value: 'Тип доступа',
                    timeout: entry.max
                });

                decorate.el.table.headGetText({
                    headNumber: 6,
                    value: 'Должность',
                    timeout: entry.max
                });

                decorate.el.table.headGetText({
                    headNumber: 7,
                    value: 'Подразделение',
                    timeout: entry.max
                });

                decorate.el.table.headGetText({
                    headNumber: 8,
                    value: 'Шаблон доступа',
                    timeout: entry.max
                });

                decorate.el.table.headGetText({
                    headNumber: 9,
                    value: 'Верификация',
                    timeout: entry.max
                });

                decorate.el.table.headGetText({
                    headNumber: 10,
                    value: 'Antipass',
                    timeout: entry.max
                });

                decorate.el.table.headGetText({
                    headNumber: 11,
                    value: 'Транспортное средство',
                    timeout: entry.max
                });
            });
        }

        if(user === 'visitor') {
            describe('Отображние таблицы', () => {
                decorate.el.table.headGetText({
                    headNumber: 1,
                    value: 'ФИО',
                    timeout: entry.max
                });

                decorate.el.table.headGetText({
                    headNumber: 2,
                    value: 'Карта',
                    timeout: entry.max
                });

                decorate.el.table.headGetText({
                    headNumber: 3,
                    value: 'Штрихкод',
                    timeout: entry.max
                });

                decorate.el.table.headGetText({
                    headNumber: 4,
                    value: 'Помещение',
                    timeout: entry.max
                });

                decorate.el.table.headGetText({
                    headNumber: 5,
                    value: 'Тип доступа',
                    timeout: entry.max
                });

                decorate.el.table.headGetText({
                    headNumber: 6,
                    value: 'Подразделение',
                    timeout: entry.max
                });

                decorate.el.table.headGetText({
                    headNumber: 7,
                    value: 'Подтверждающий документ',
                    timeout: entry.max
                });

                decorate.el.table.headGetText({
                    headNumber: 8,
                    value: 'Номер документа',
                    timeout: entry.max
                });

                decorate.el.table.headGetText({
                    headNumber: 9,
                    value: 'Шаблон доступа',
                    timeout: entry.max
                });

                decorate.el.table.headGetText({
                    headNumber: 10,
                    value: 'Верификация',
                    timeout: entry.max
                });

                decorate.el.table.headGetText({
                    headNumber: 11,
                    value: 'Antipass',
                    timeout: entry.max
                });
            });
        }

        describe('Отображние данных в таблице', () => {
                decorate.el.table.noStr({
                    timeout: entry.max
                });

                decorate.el.rowEmpty.getText({
                    value: 'Нет данных для отображения',
                    timeout: entry.max
                })
            });
    });

    const checkData = () => describe(`Контроль доступа / Отчет по доступу в помещения / вкладка ${tab}. 
    Проверка отображения данных .`, () => {

        bef();
        aft();

        describe(`Выбор помещения ${data.rooms.room3}`, () => {
            decorate.el.table.noStr({
                timeout: entry.max
            });

            decorate.el.selectInput.iconXpand({
                title: '',
                placeholder: 'Помещение',
                timeout: entry.max
            });

            decorate.el.selectXpand.xpand({
                timeout: entry.max
            });

            decorate.el.selectXpand.handler({
                value: data.rooms.room3,
                timeout: entry.max
            });

            decorate.el.selectXpand.xpandNoElement({
                timeout: entry.max
            });
        });

        if(user === 'all') {

            describe('Общие проверки', () => {
                decorate.el.input.getValue({
                    title: '',
                    placeholder: 'Помещение',
                    value: data.rooms.room3,
                    timeout: entry.max
                });

                decorate.el.table.size({
                    strCount: 4,
                    timeout: entry.max
                });
            });

            describe('Проверка строки 1.', () => {
                decorate.el.table.cellGetText({
                    headTitle: 'ФИО',
                    strNumber: 1,
                    cellNumber: 1,
                    value: data.fio.visitor2,
                    timeout: entry.max
                });

                decorate.el.table.cellGetText({
                    headTitle: 'Помещение',
                    strNumber: 1,
                    cellNumber: 4,
                    value: data.rooms.room3,
                    timeout: entry.max
                });
            });

            describe('Проверка строки 2.', () => {
                decorate.el.table.cellGetText({
                    headTitle: 'ФИО',
                    strNumber: 2,
                    cellNumber: 1,
                    value: data.fio.visitor1,
                    timeout: entry.max
                });

                decorate.el.table.cellGetText({
                    headTitle: 'Помещение',
                    strNumber: 2,
                    cellNumber: 4,
                    value: data.rooms.room3,
                    timeout: entry.max
                });
            });

            describe('Проверка строки 3.', () => {
                decorate.el.table.cellGetText({
                    headTitle: 'ФИО',
                    strNumber: 3,
                    cellNumber: 1,
                    value: data.fio.staff2,
                    timeout: entry.max
                });

                decorate.el.table.cellGetText({
                    headTitle: 'Помещение',
                    strNumber: 3,
                    cellNumber: 4,
                    value: data.rooms.room3,
                    timeout: entry.max
                });
            });

            describe('Проверка строки 4.', () => {
                decorate.el.table.cellGetText({
                    headTitle: 'ФИО',
                    strNumber: 4,
                    cellNumber: 1,
                    value: data.fio.staff1,
                    timeout: entry.max
                });

                decorate.el.table.cellGetText({
                    headTitle: 'Помещение',
                    strNumber: 4,
                    cellNumber: 4,
                    value: data.rooms.room3,
                    timeout: entry.max
                });
            });

        }

        if(user === 'staff') {

            describe('Общие проверки', () => {
                decorate.el.input.getValue({
                    title: '',
                    placeholder: 'Помещение',
                    value: data.rooms.room3,
                    timeout: entry.max
                });

                decorate.el.table.size({
                    strCount: 2,
                    timeout: entry.max
                });
            });

            describe('Проверка строки 1.', () => {
                decorate.el.table.cellGetText({
                    headTitle: 'ФИО',
                    strNumber: 1,
                    cellNumber: 1,
                    value: data.fio.staff2,
                    timeout: entry.max
                });

                decorate.el.table.cellGetText({
                    headTitle: 'Помещение',
                    strNumber: 1,
                    cellNumber: 4,
                    value: data.rooms.room3,
                    timeout: entry.max
                });
            });

            describe('Проверка строки 2.', () => {
                decorate.el.table.cellGetText({
                    headTitle: 'ФИО',
                    strNumber: 2,
                    cellNumber: 1,
                    value: data.fio.staff1,
                    timeout: entry.max
                });

                decorate.el.table.cellGetText({
                    headTitle: 'Помещение',
                    strNumber: 2,
                    cellNumber: 4,
                    value: data.rooms.room3,
                    timeout: entry.max
                });
            });

        }

        if(user === 'visitor') {

            describe('Общие проверки', () => {
                decorate.el.input.getValue({
                    title: '',
                    placeholder: 'Помещение',
                    value: data.rooms.room3,
                    timeout: entry.max
                });

                decorate.el.table.size({
                    strCount: 2,
                    timeout: entry.max
                });
            });

            describe('Проверка строки 1.', () => {
                decorate.el.table.cellGetText({
                    headTitle: 'ФИО',
                    strNumber: 1,
                    cellNumber: 1,
                    value: data.fio.visitor2,
                    timeout: entry.max
                });

                decorate.el.table.cellGetText({
                    headTitle: 'Помещение',
                    strNumber: 1,
                    cellNumber: 4,
                    value: data.rooms.room3,
                    timeout: entry.max
                });
            });

            describe('Проверка строки 2.', () => {
                decorate.el.table.cellGetText({
                    headTitle: 'ФИО',
                    strNumber: 2,
                    cellNumber: 1,
                    value: data.fio.visitor1,
                    timeout: entry.max
                });

                decorate.el.table.cellGetText({
                    headTitle: 'Помещение',
                    strNumber: 2,
                    cellNumber: 4,
                    value: data.rooms.room3,
                    timeout: entry.max
                });
            });
        }
    });

    const filterDivision = () => describe(`Контроль доступа / Отчет по доступу в помещения / вкладка ${tab}. 
    Проверка фильтра по подразделению через выбор из списка.`, () => {

        bef();
        aft();

        describe(`Выбор помещения ${data.rooms.room3}`, () => {
            decorate.el.table.noStr({
                timeout: entry.max
            });

            decorate.el.selectInput.iconXpand({
                title: '',
                placeholder: 'Помещение',
                timeout: entry.max
            });

            decorate.el.selectXpand.xpand({
                timeout: entry.max
            });

            decorate.el.selectXpand.handler({
                value: data.rooms.room3,
                timeout: entry.max
            });

            decorate.el.selectXpand.xpandNoElement({
                timeout: entry.max
            });
        });

        if(user === 'all') {
            describe('Количество строк до применения фильтра по подразделению', () => {
                decorate.el.table.size({
                    strCount: 4,
                    timeout: entry.max
                });
            });
        }

        if(user === 'staff' || user === 'visitor') {
            describe('Количество строк до применения фильтра по подразделению', () => {
                decorate.el.table.size({
                    strCount: 2,
                    timeout: entry.max
                });
            });
        }

        describe(`Выбор в фильтре по подразделению ${data.divisions.division1.name}.`, () => {
            decorate.el.selectInput.iconXpand({
                title: '',
                placeholder: 'Подразделение',
                timeout: entry.max
            });

            decorate.el.selectXpand.xpand({
                timeout: entry.max
            });

            decorate.el.selectXpand.handler({
                value: data.divisions.division1.name,
                timeout: entry.max
            });

            decorate.el.selectXpand.xpandNoElement({
                timeout: entry.max
            });

            decorate.el.input.getValue({
                title: '',
                placeholder: 'Подразделение',
                value: data.divisions.division1.name,
                timeout: entry.max
            });
        });

        if(user === 'all') {
            describe('Количество строк после применения фильтра по подразделению', () => {
                decorate.el.table.size({
                    strCount: 2,
                    timeout: entry.max
                });
            });

            describe('Проверка строки 1.', () => {
                decorate.el.table.cellGetText({
                    headTitle: 'ФИО',
                    strNumber: 1,
                    cellNumber: 1,
                    value: data.fio.visitor1,
                    timeout: entry.max
                });

                decorate.el.table.cellGetText({
                    headTitle: 'Помещение',
                    strNumber: 1,
                    cellNumber: 4,
                    value: data.rooms.room3,
                    timeout: entry.max
                });

                decorate.el.table.cellGetText({
                    headTitle: 'Подразделение',
                    strNumber: 1,
                    cellNumber: 7,
                    value: data.divisions.division1.name,
                    timeout: entry.max
                });
            });

            describe('Проверка строки 2.', () => {
                decorate.el.table.cellGetText({
                    headTitle: 'ФИО',
                    strNumber: 2,
                    cellNumber: 1,
                    value: data.fio.staff1,
                    timeout: entry.max
                });

                decorate.el.table.cellGetText({
                    headTitle: 'Помещение',
                    strNumber: 2,
                    cellNumber: 4,
                    value: data.rooms.room3,
                    timeout: entry.max
                });

                decorate.el.table.cellGetText({
                    headTitle: 'Подразделение',
                    strNumber: 2,
                    cellNumber: 7,
                    value: data.divisions.division1.name,
                    timeout: entry.max
                });
            });
        }

        if(user === 'staff') {
            describe('Количество строк после применения фильтра по подразделению', () => {
                decorate.el.table.size({
                    strCount: 1,
                    timeout: entry.max
                });
            });

            describe('Проверка строки 1.', () => {
                decorate.el.table.cellGetText({
                    headTitle: 'ФИО',
                    strNumber: 1,
                    cellNumber: 1,
                    value: data.fio.staff1,
                    timeout: entry.max
                });

                decorate.el.table.cellGetText({
                    headTitle: 'Помещение',
                    strNumber: 1,
                    cellNumber: 4,
                    value: data.rooms.room3,
                    timeout: entry.max
                });

                decorate.el.table.cellGetText({
                    headTitle: 'Подразделение',
                    strNumber: 1,
                    cellNumber: 7,
                    value: data.divisions.division1.name,
                    timeout: entry.max
                });
            });
        }

        if(user === 'visitor') {
            describe('Количество строк после применения фильтра по подразделению', () => {
                decorate.el.table.size({
                    strCount: 1,
                    timeout: entry.max
                });
            });

            describe('Проверка строки 1.', () => {
                decorate.el.table.cellGetText({
                    headTitle: 'ФИО',
                    strNumber: 1,
                    cellNumber: 1,
                    value: data.fio.visitor1,
                    timeout: entry.max
                });

                decorate.el.table.cellGetText({
                    headTitle: 'Помещение',
                    strNumber: 1,
                    cellNumber: 4,
                    value: data.rooms.room3,
                    timeout: entry.max
                });

                decorate.el.table.cellGetText({
                    headTitle: 'Подразделение',
                    strNumber: 1,
                    cellNumber: 6,
                    value: data.divisions.division1.name,
                    timeout: entry.max
                });
            });
        }

    });

    const filterDivisionForm = () => describe(`Контроль доступа / Отчет по доступу в помещения / вкладка ${tab}. 
    Проверка фильтра по подразделению через модальное окно "Подразделение".`, () => {

        bef();
        aft();

        describe(`Выбор по помещения через модальное окно ${data.rooms.room3}.`, () => {
            decorate.el.selectInput.iconXpand({
                title: '',
                placeholder: 'Помещение',
                timeout: entry.max
            });

            decorate.el.selectXpand.xpand({
                timeout: entry.max
            });

            decorate.el.selectXpand.handler({
                value: data.rooms.room3,
                timeout: entry.max
            });

            decorate.el.selectXpand.xpandNoElement({
                timeout: entry.max
            });

            decorate.el.input.getValue({
                title: '',
                placeholder: 'Помещение',
                value: data.rooms.room3,
                timeout: entry.max
            });
        });

        if(user === 'all') {
            describe('Количество строк до применения фильтра по подразделению', () => {
                decorate.el.table.size({
                    strCount: 4,
                    timeout: entry.max
                });
            });
        }

        if(user === 'staff' || user === 'visitor') {
            describe('Количество строк до применения фильтра по подразделению', () => {
                decorate.el.table.size({
                    strCount: 2,
                    timeout: entry.max
                });
            });
        }

        describe(`Выбор в фильтре по подразделению ${data.divisions.division1.name}.`, () => {
            decorate.el.selectInput.iconOutline({
                title: '',
                placeholder: 'Подразделение',
                timeout: entry.max
            });

            decorate.modal.divisionFilter.init({
                timeout: entry.max
            });

            decorate.el.filterTreeNode.handler({
                name: data.divisions.division1.name,
                timeout: entry.max
            });

            decorate.el.button.handler({
                name: 'Выбрать',
                timeout: entry.max
            });

            decorate.modal.divisionFilter.initClose({
                timeout: entry.max
            });
        });

        if(user === 'all') {
            describe('Количество строк после применения фильтра по подразделению', () => {
                decorate.el.table.size({
                    strCount: 2,
                    timeout: entry.max
                });
            });

            describe('Проверка строки 1.', () => {
                decorate.el.table.cellGetText({
                    headTitle: 'ФИО',
                    strNumber: 1,
                    cellNumber: 1,
                    value: data.fio.visitor1,
                    timeout: entry.max
                });

                decorate.el.table.cellGetText({
                    headTitle: 'Помещение',
                    strNumber: 1,
                    cellNumber: 4,
                    value: data.rooms.room3,
                    timeout: entry.max
                });

                decorate.el.table.cellGetText({
                    headTitle: 'Подразделение',
                    strNumber: 1,
                    cellNumber: 7,
                    value: data.divisions.division1.name,
                    timeout: entry.max
                });
            });

            describe('Проверка строки 2.', () => {
                decorate.el.table.cellGetText({
                    headTitle: 'ФИО',
                    strNumber: 2,
                    cellNumber: 1,
                    value: data.fio.staff1,
                    timeout: entry.max
                });

                decorate.el.table.cellGetText({
                    headTitle: 'Помещение',
                    strNumber: 2,
                    cellNumber: 4,
                    value: data.rooms.room3,
                    timeout: entry.max
                });

                decorate.el.table.cellGetText({
                    headTitle: 'Подразделение',
                    strNumber: 2,
                    cellNumber: 7,
                    value: data.divisions.division1.name,
                    timeout: entry.max
                });
            });
        }

        if(user === 'staff') {
            describe('Количество строк после применения фильтра по подразделению', () => {
                decorate.el.table.size({
                    strCount: 1,
                    timeout: entry.max
                });
            });

            describe('Проверка строки 1.', () => {
                decorate.el.table.cellGetText({
                    headTitle: 'ФИО',
                    strNumber: 1,
                    cellNumber: 1,
                    value: data.fio.staff1,
                    timeout: entry.max
                });

                decorate.el.table.cellGetText({
                    headTitle: 'Помещение',
                    strNumber: 1,
                    cellNumber: 4,
                    value: data.rooms.room3,
                    timeout: entry.max
                });

                decorate.el.table.cellGetText({
                    headTitle: 'Подразделение',
                    strNumber: 1,
                    cellNumber: 7,
                    value: data.divisions.division1.name,
                    timeout: entry.max
                });
            });
        }

        if(user === 'visitor') {
            describe('Количество строк после применения фильтра по подразделению', () => {
                decorate.el.table.size({
                    strCount: 1,
                    timeout: entry.max
                });
            });

            describe('Проверка строки 1.', () => {
                decorate.el.table.cellGetText({
                    headTitle: 'ФИО',
                    strNumber: 1,
                    cellNumber: 1,
                    value: data.fio.visitor1,
                    timeout: entry.max
                });

                decorate.el.table.cellGetText({
                    headTitle: 'Помещение',
                    strNumber: 1,
                    cellNumber: 4,
                    value: data.rooms.room3,
                    timeout: entry.max
                });

                decorate.el.table.cellGetText({
                    headTitle: 'Подразделение',
                    strNumber: 1,
                    cellNumber: 6,
                    value: data.divisions.division1.name,
                    timeout: entry.max
                });
            });
        }

    });

    const filterSearch = () => describe(`Контроль доступа / Отчет по доступу в помещения / вкладка ${tab}. 
    Проверка фильтра по поиску.`, () => {

        bef();
        aft();

        describe(`Выбор помещения ${data.rooms.room3}`, () => {
            decorate.el.table.noStr({
                timeout: entry.max
            });

            decorate.el.selectInput.iconXpand({
                title: '',
                placeholder: 'Помещение',
                timeout: entry.max
            });

            decorate.el.selectXpand.xpand({
                timeout: entry.max
            });

            decorate.el.selectXpand.handler({
                value: data.rooms.room3,
                timeout: entry.max
            });

            decorate.el.selectXpand.xpandNoElement({
                timeout: entry.max
            });
        });

        if(user === 'all') {
            describe('Количество строк до применения фильтра по подразделению', () => {
                decorate.el.table.size({
                    strCount: 4,
                    timeout: entry.max
                });
            });
        }

        if(user === 'staff' || user === 'visitor') {
            describe('Количество строк до применения фильтра по подразделению', () => {
                decorate.el.table.size({
                    strCount: 2,
                    timeout: entry.max
                });
            });
        }

        if(user === 'all' || user === 'staff') {

            describe(`Ввод в Поиск... - ${data.fio.staff1}`, () => {
                decorate.el.input.sendKeys({
                    title: '',
                    placeholder: 'Поиск...',
                    value: data.fio.staff1
                });
            });

            describe('Количество строк после применения фильтра по поиску', () => {
                decorate.el.table.size({
                    strCount: 1,
                    timeout: entry.max
                });
            });

            describe('Проверка строки 1.', () => {
                decorate.el.table.cellGetText({
                    headTitle: 'ФИО',
                    strNumber: 1,
                    cellNumber: 1,
                    value: data.fio.staff1,
                    timeout: entry.max
                });
            });
        }

        if(user === 'visitor') {
            describe(`Ввод в Поиск... - ${data.fio.visitor1}`, () => {
                decorate.el.input.sendKeys({
                    title: '',
                    placeholder: 'Поиск...',
                    value: data.fio.visitor1
                });
            });

            describe('Количество строк после применения фильтра по поиску', () => {
                decorate.el.table.size({
                    strCount: 1,
                    timeout: entry.max
                });
            });

            describe('Проверка строки 1.', () => {
                decorate.el.table.cellGetText({
                    headTitle: 'ФИО',
                    strNumber: 1,
                    cellNumber: 1,
                    value: data.fio.visitor1,
                    timeout: entry.max
                });
            });
        }
    });

    const printTable = () => describe(`Контроль доступа / Отчет по доступу в помещения / вкладка ${tab}. 
    Проверка печати.`,() => {

        bef();
        aft();

        describe(`Выбор помещения ${data.rooms.room3}`, () => {
            decorate.el.table.noStr({
                timeout: entry.max
            });

            decorate.el.selectInput.iconXpand({
                title: '',
                placeholder: 'Помещение',
                timeout: entry.max
            });

            decorate.el.selectXpand.xpand({
                timeout: entry.max
            });

            decorate.el.selectXpand.handler({
                value: data.rooms.room3,
                timeout: entry.max
            });

            decorate.el.selectXpand.xpandNoElement({
                timeout: entry.max
            });
        });

        describe('Открытие печатной формы', () => {
            decorate.el.butIcBefore.handler({
                icon: but.menu,
                timeout: entry.max
            });

            decorate.el.menu.menu({
                timeout: entry.max
            });

            decorate.el.menu.handler({
                name: 'Печать таблицы',
                timeout: entry.max
            });

            decorate.modal.printTable.init({
                timeout: entry.max
            });
        });

        if(user === 'all') {
            describe('Проверка строки 1', () => {
                decorate.modal.printTable.cellGetText({
                    head: 'ФИО',
                    str: 1,
                    cell: 1,
                    value: data.fio.visitor2,
                    timeout: entry.max
                });
                decorate.modal.printTable.cellGetText({
                    head: 'Карта',
                    str: 1,
                    cell: 2,
                    value: data.visitor.visitor2.identifier[0].identifier,
                    timeout: entry.max
                });
                decorate.modal.printTable.cellGetText({
                    head: 'Штрихкод',
                    str: 1,
                    cell: 3,
                    value: '',
                    timeout: entry.max
                });
                decorate.modal.printTable.cellGetText({
                    head: 'Помещение',
                    str: 1,
                    cell: 4,
                    value: data.rooms.room3,
                    timeout: entry.max
                });
                decorate.modal.printTable.cellGetText({
                    head: 'Тип доступа',
                    str: 1,
                    cell: 5,
                    value: 'Карта',
                    timeout: entry.max
                });
                decorate.modal.printTable.cellGetText({
                    head: 'Должность',
                    str: 1,
                    cell: 6,
                    value: '',
                    timeout: entry.max
                });
                decorate.modal.printTable.cellGetText({
                    head: 'Подразделение',
                    str: 1,
                    cell: 7,
                    value: data.divisions.division2.name,
                    timeout: entry.max
                });
                decorate.modal.printTable.cellGetText({
                    head: 'Подтверждающий документ',
                    str: 1,
                    cell: 8,
                    value: data.visitor.visitor2.supporting_document,
                    timeout: entry.max
                });
                decorate.modal.printTable.cellGetText({
                    head: 'Номер документа',
                    str: 1,
                    cell: 9,
                    value:  data.visitor.visitor2.supporting_document_number,
                    timeout: entry.max
                });
                decorate.modal.printTable.cellGetText({
                    head: 'Шаблон доступа',
                    str: 1,
                    cell: 10,
                    value: data.templates.template2,
                    timeout: entry.max
                });
                decorate.modal.printTable.cellGetText({
                    head: 'Верификация',
                    str: 1,
                    cell: 11,
                    value: 'Нет',
                    timeout: entry.max
                });
                decorate.modal.printTable.cellGetText({
                    head: 'Antipass',
                    str: 1,
                    cell: 12,
                    value: 'Выкл',
                    timeout: entry.max
                });
                decorate.modal.printTable.cellGetText({
                    head: 'Транспортное средство',
                    str: 1,
                    cell: 13,
                    value: '',
                    timeout: entry.max
                });
            });
        }

        if(user === 'staff') {
            describe('Проверка строки 1', () => {
                decorate.modal.printTable.cellGetText({
                    head: 'ФИО',
                    str: 1,
                    cell: 1,
                    value: data.fio.staff2,
                    timeout: entry.max
                });
                decorate.modal.printTable.cellGetText({
                    head: 'Карта',
                    str: 1,
                    cell: 2,
                    value: data.staff.staff2.identifier[0].identifier,
                    timeout: entry.max
                });
                decorate.modal.printTable.cellGetText({
                    head: 'Штрихкод',
                    str: 1,
                    cell: 3,
                    value: '',
                    timeout: entry.max
                });
                decorate.modal.printTable.cellGetText({
                    head: 'Помещение',
                    str: 1,
                    cell: 4,
                    value: data.rooms.room3,
                    timeout: entry.max
                });
                decorate.modal.printTable.cellGetText({
                    head: 'Тип доступа',
                    str: 1,
                    cell: 5,
                    value: 'Карта',
                    timeout: entry.max
                });
                decorate.modal.printTable.cellGetText({
                    head: 'Должность',
                    str: 1,
                    cell: 6,
                    value: data.positions.position2.name,
                    timeout: entry.max
                });
                decorate.modal.printTable.cellGetText({
                    head: 'Подразделение',
                    str: 1,
                    cell: 7,
                    value: data.divisions.division2.name,
                    timeout: entry.max
                });
                decorate.modal.printTable.cellGetText({
                    head: 'Шаблон доступа',
                    str: 1,
                    cell: 8,
                    value: data.templates.template2,
                    timeout: entry.max
                });
                decorate.modal.printTable.cellGetText({
                    head: 'Верификация',
                    str: 1,
                    cell: 9,
                    value: 'Нет',
                    timeout: entry.max
                });
                decorate.modal.printTable.cellGetText({
                    head: 'Antipass',
                    str: 1,
                    cell: 10,
                    value: 'Выкл',
                    timeout: entry.max
                });
                decorate.modal.printTable.cellGetText({
                    head: 'Транспортное средство',
                    str: 1,
                    cell: 11,
                    value: '',
                    timeout: entry.max
                });
            });
        }

        if(user === 'visitor') {
            describe('Проверка строки 1', () => {
                decorate.modal.printTable.cellGetText({
                    head: 'ФИО',
                    str: 1,
                    cell: 1,
                    value: data.fio.visitor2,
                    timeout: entry.max
                });
                decorate.modal.printTable.cellGetText({
                    head: 'Карта',
                    str: 1,
                    cell: 2,
                    value: data.visitor.visitor2.identifier[0].identifier,
                    timeout: entry.max
                });
                decorate.modal.printTable.cellGetText({
                    head: 'Штрихкод',
                    str: 1,
                    cell: 3,
                    value: '',
                    timeout: entry.max
                });
                decorate.modal.printTable.cellGetText({
                    head: 'Помещение',
                    str: 1,
                    cell: 4,
                    value: data.rooms.room3,
                    timeout: entry.max
                });
                decorate.modal.printTable.cellGetText({
                    head: 'Тип доступа',
                    str: 1,
                    cell: 5,
                    value: 'Карта',
                    timeout: entry.max
                });
                decorate.modal.printTable.cellGetText({
                    head: 'Подразделение',
                    str: 1,
                    cell: 6,
                    value: data.divisions.division2.name,
                    timeout: entry.max
                });
                decorate.modal.printTable.cellGetText({
                    head: 'Подтверждающий документ',
                    str: 1,
                    cell: 7,
                    value: data.visitor.visitor2.supporting_document,
                    timeout: entry.max
                });
                decorate.modal.printTable.cellGetText({
                    head: 'Номер документа',
                    str: 1,
                    cell: 8,
                    value:  data.visitor.visitor2.supporting_document_number,
                    timeout: entry.max
                });
                decorate.modal.printTable.cellGetText({
                    head: 'Шаблон доступа',
                    str: 1,
                    cell: 9,
                    value: data.templates.template2,
                    timeout: entry.max
                });
                decorate.modal.printTable.cellGetText({
                    head: 'Верификация',
                    str: 1,
                    cell: 10,
                    value: 'Нет',
                    timeout: entry.max
                });
                decorate.modal.printTable.cellGetText({
                    head: 'Antipass',
                    str: 1,
                    cell: 11,
                    value: 'Выкл',
                    timeout: entry.max
                });
                decorate.modal.printTable.cellGetText({
                    head: 'Транспортное средство',
                    str: 1,
                    cell: 12,
                    value: '',
                    timeout: entry.max
                });
            });
        }

        describe('Закрытие печатной формы', () => {
            decorate.modal.printTable.closeHandler({
                timeout: entry.max
            });

            decorate.modal.printTable.initClose({
                timeout: entry.max
            });
        });
    });

    const exportXLSX = () => describe(`Контроль доступа / Отчет по доступу в помещения / вкладка ${tab}. Экспорт XLSX.`,
        () => {

        const params = {
            nameFile: 'accesszonereport.xlsx',
            jsonAll: [
                {
                    'Отчет "Отчет по доступу в помещения"': 'Фамилия',
                    __EMPTY: 'Имя',
                    __EMPTY_1: 'Отчество',
                    __EMPTY_2: 'Карта №',
                    __EMPTY_3: 'Штрих-код',
                    __EMPTY_4: 'Помещение',
                    __EMPTY_5: 'Тип доступа',
                    __EMPTY_6: 'Должность',
                    __EMPTY_7: 'Подразделение',
                    __EMPTY_8: 'Подтверждающий документ',
                    __EMPTY_9: 'Номер документа',
                    __EMPTY_10: 'Шаблон доступа',
                    __EMPTY_11: 'Верификация',
                    __EMPTY_12: 'Antipass',
                    __EMPTY_13: 'Транспортное средство'
                },
                {
                    'Отчет "Отчет по доступу в помещения"': 'visitor',
                    __EMPTY: 'name',
                    __EMPTY_1: '2',
                    __EMPTY_2: '5',
                    __EMPTY_3: '',
                    __EMPTY_4: 'room3',
                    __EMPTY_5: 'Карта',
                    __EMPTY_6: '',
                    __EMPTY_7: 'division2',
                    __EMPTY_8: 'passport',
                    __EMPTY_9: '2',
                    __EMPTY_10: 'template2',
                    __EMPTY_11: 'Нет',
                    __EMPTY_12: 'Выкл',
                    __EMPTY_13: ''
                },
                {
                    'Отчет "Отчет по доступу в помещения"': 'visitor',
                    __EMPTY: 'name',
                    __EMPTY_1: '1',
                    __EMPTY_2: '4',
                    __EMPTY_3: '',
                    __EMPTY_4: 'room3',
                    __EMPTY_5: 'Карта',
                    __EMPTY_6: '',
                    __EMPTY_7: 'division1',
                    __EMPTY_8: 'passport',
                    __EMPTY_9: '1',
                    __EMPTY_10: 'template1',
                    __EMPTY_11: 'Нет',
                    __EMPTY_12: 'Выкл',
                    __EMPTY_13: ''
                },
                {
                    'Отчет "Отчет по доступу в помещения"': 'staff',
                    __EMPTY: 'name',
                    __EMPTY_1: '2',
                    __EMPTY_2: '2',
                    __EMPTY_3: '',
                    __EMPTY_4: 'room3',
                    __EMPTY_5: 'Карта',
                    __EMPTY_6: 'position2',
                    __EMPTY_7: 'division2',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: 'template2',
                    __EMPTY_11: 'Нет',
                    __EMPTY_12: 'Выкл',
                    __EMPTY_13: ''
                },
                {
                    'Отчет "Отчет по доступу в помещения"': 'staff',
                    __EMPTY: 'name',
                    __EMPTY_1: '1',
                    __EMPTY_2: '1',
                    __EMPTY_3: '',
                    __EMPTY_4: 'room3',
                    __EMPTY_5: 'Карта',
                    __EMPTY_6: 'position1',
                    __EMPTY_7: 'division1',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: 'template1',
                    __EMPTY_11: 'Нет',
                    __EMPTY_12: 'Выкл',
                    __EMPTY_13: ''
                }
            ],
            jsonStaff: [
                {
                    'Отчет "Отчет по доступу в помещения (Персонал)"': 'Фамилия',
                    __EMPTY: 'Имя',
                    __EMPTY_1: 'Отчество',
                    __EMPTY_2: 'Карта №',
                    __EMPTY_3: 'Штрих-код',
                    __EMPTY_4: 'Помещение',
                    __EMPTY_5: 'Тип доступа',
                    __EMPTY_6: 'Должность',
                    __EMPTY_7: 'Подразделение',
                    __EMPTY_8: 'Шаблон доступа',
                    __EMPTY_9: 'Верификация',
                    __EMPTY_10: 'Antipass',
                    __EMPTY_11: 'Транспортное средство'
                },
                {
                    'Отчет "Отчет по доступу в помещения (Персонал)"': 'staff',
                    __EMPTY: 'name',
                    __EMPTY_1: '2',
                    __EMPTY_2: '2',
                    __EMPTY_3: '',
                    __EMPTY_4: 'room3',
                    __EMPTY_5: 'Карта',
                    __EMPTY_6: 'position2',
                    __EMPTY_7: 'division2',
                    __EMPTY_8: 'template2',
                    __EMPTY_9: 'Нет',
                    __EMPTY_10: 'Выкл',
                    __EMPTY_11: ''
                },
                {
                    'Отчет "Отчет по доступу в помещения (Персонал)"': 'staff',
                    __EMPTY: 'name',
                    __EMPTY_1: '1',
                    __EMPTY_2: '1',
                    __EMPTY_3: '',
                    __EMPTY_4: 'room3',
                    __EMPTY_5: 'Карта',
                    __EMPTY_6: 'position1',
                    __EMPTY_7: 'division1',
                    __EMPTY_8: 'template1',
                    __EMPTY_9: 'Нет',
                    __EMPTY_10: 'Выкл',
                    __EMPTY_11: ''
                }
            ],
            jsonVisitor: [
                {
                    'Отчет "Отчет по доступу в помещения (Посетители)"': 'Фамилия',
                    __EMPTY: 'Имя',
                    __EMPTY_1: 'Отчество',
                    __EMPTY_2: 'Карта №',
                    __EMPTY_3: 'Штрих-код',
                    __EMPTY_4: 'Помещение',
                    __EMPTY_5: 'Тип доступа',
                    __EMPTY_6: 'Подразделение',
                    __EMPTY_7: 'Подтверждающий документ',
                    __EMPTY_8: 'Номер документа',
                    __EMPTY_9: 'Шаблон доступа',
                    __EMPTY_10: 'Верификация',
                    __EMPTY_11: 'Antipass',
                    __EMPTY_12: 'Транспортное средство'
                },
                {
                    'Отчет "Отчет по доступу в помещения (Посетители)"': 'visitor',
                    __EMPTY: 'name',
                    __EMPTY_1: '2',
                    __EMPTY_2: '5',
                    __EMPTY_3: '',
                    __EMPTY_4: 'room3',
                    __EMPTY_5: 'Карта',
                    __EMPTY_6: 'division2',
                    __EMPTY_7: 'passport',
                    __EMPTY_8: '2',
                    __EMPTY_9: 'template2',
                    __EMPTY_10: 'Нет',
                    __EMPTY_11: 'Выкл',
                    __EMPTY_12: ''
                },
                {
                    'Отчет "Отчет по доступу в помещения (Посетители)"': 'visitor',
                    __EMPTY: 'name',
                    __EMPTY_1: '1',
                    __EMPTY_2: '4',
                    __EMPTY_3: '',
                    __EMPTY_4: 'room3',
                    __EMPTY_5: 'Карта',
                    __EMPTY_6: 'division1',
                    __EMPTY_7: 'passport',
                    __EMPTY_8: '1',
                    __EMPTY_9: 'template1',
                    __EMPTY_10: 'Нет',
                    __EMPTY_11: 'Выкл',
                    __EMPTY_12: ''
                }
            ],
        }

        bef();
        aft();

        describe(`Выбор помещения ${data.rooms.room3}`, () => {
                decorate.el.table.noStr({
                    timeout: entry.max
                });

                decorate.el.selectInput.iconXpand({
                    title: '',
                    placeholder: 'Помещение',
                    timeout: entry.max
                });

                decorate.el.selectXpand.xpand({
                    timeout: entry.max
                });

                decorate.el.selectXpand.handler({
                    value: data.rooms.room3,
                    timeout: entry.max
                });

                decorate.el.selectXpand.xpandNoElement({
                    timeout: entry.max
                });
            });

        describe('Экспорт', () => {

            decorate.el.butIcBefore.handler({
                icon: but.menu,
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

            if(user === 'all') {
                decorate.el.file.comparison({
                    file: params.nameFile,
                    json: params.jsonAll
                });
            }

            if(user === 'staff') {
                decorate.el.file.comparison({
                    file: params.nameFile,
                    json: params.jsonStaff
                });
            }

            if(user === 'visitor') {
                decorate.el.file.comparison({
                    file: params.nameFile,
                    json: params.jsonVisitor
                });
            }

            decorate.el.file.delete({
                file: params.nameFile,
                timeout: entry.upload
            });

        });
    });

    const exportCSV = () => describe(`Контроль доступа / Отчет по доступу в помещения / вкладка ${tab}. Экспорт CSV.`,
        () => {

            const params = {
                nameFile: 'accesszonereport.csv',
                jsonAll: [
                    {
                        'Фамилия': 'visitor',
                        'Имя': 'name',
                        'Отчество': 2,
                        'Карта №': 5,
                        'Помещение': 'room3',
                        'Тип доступа': 'Карта',
                        'Подразделение': 'division2',
                        'Подтверждающий документ': 'passport',
                        'Номер документа': 2,
                        'Шаблон доступа': 'template2',
                        'Верификация': 'Нет',
                        Antipass: 'Выкл'
                    },
                    {
                        'Фамилия': 'visitor',
                        'Имя': 'name',
                        'Отчество': 1,
                        'Карта №': 4,
                        'Помещение': 'room3',
                        'Тип доступа': 'Карта',
                        'Подразделение': 'division1',
                        'Подтверждающий документ': 'passport',
                        'Номер документа': 1,
                        'Шаблон доступа': 'template1',
                        'Верификация': 'Нет',
                        Antipass: 'Выкл'
                    },
                    {
                        'Фамилия': 'staff',
                        'Имя': 'name',
                        'Отчество': 2,
                        'Карта №': 2,
                        'Помещение': 'room3',
                        'Тип доступа': 'Карта',
                        'Должность': 'position2',
                        'Подразделение': 'division2',
                        'Шаблон доступа': 'template2',
                        'Верификация': 'Нет',
                        Antipass: 'Выкл'
                    },
                    {
                        'Фамилия': 'staff',
                        'Имя': 'name',
                        'Отчество': 1,
                        'Карта №': 1,
                        'Помещение': 'room3',
                        'Тип доступа': 'Карта',
                        'Должность': 'position1',
                        'Подразделение': 'division1',
                        'Шаблон доступа': 'template1',
                        'Верификация': 'Нет',
                        Antipass: 'Выкл'
                    }
                ],
                jsonStaff: [
                    {
                        'Фамилия': 'staff',
                        'Имя': 'name',
                        'Отчество': 2,
                        'Карта №': 2,
                        'Помещение': 'room3',
                        'Тип доступа': 'Карта',
                        'Должность': 'position2',
                        'Подразделение': 'division2',
                        'Шаблон доступа': 'template2',
                        'Верификация': 'Нет',
                        Antipass: 'Выкл'
                    },
                    {
                        'Фамилия': 'staff',
                        'Имя': 'name',
                        'Отчество': 1,
                        'Карта №': 1,
                        'Помещение': 'room3',
                        'Тип доступа': 'Карта',
                        'Должность': 'position1',
                        'Подразделение': 'division1',
                        'Шаблон доступа': 'template1',
                        'Верификация': 'Нет',
                        Antipass: 'Выкл'
                    }
                ],
                jsonVisitor: [
                    {
                        'Фамилия': 'visitor',
                        'Имя': 'name',
                        'Отчество': 2,
                        'Карта №': 5,
                        'Помещение': 'room3',
                        'Тип доступа': 'Карта',
                        'Подразделение': 'division2',
                        'Подтверждающий документ': 'passport',
                        'Номер документа': 2,
                        'Шаблон доступа': 'template2',
                        'Верификация': 'Нет',
                        Antipass: 'Выкл'
                    },
                    {
                        'Фамилия': 'visitor',
                        'Имя': 'name',
                        'Отчество': 1,
                        'Карта №': 4,
                        'Помещение': 'room3',
                        'Тип доступа': 'Карта',
                        'Подразделение': 'division1',
                        'Подтверждающий документ': 'passport',
                        'Номер документа': 1,
                        'Шаблон доступа': 'template1',
                        'Верификация': 'Нет',
                        Antipass: 'Выкл'
                    }
                ],
            }

            bef();
            aft();

            describe(`Выбор помещения ${data.rooms.room3}`, () => {
                decorate.el.table.noStr({
                    timeout: entry.max
                });

                decorate.el.selectInput.iconXpand({
                    title: '',
                    placeholder: 'Помещение',
                    timeout: entry.max
                });

                decorate.el.selectXpand.xpand({
                    timeout: entry.max
                });

                decorate.el.selectXpand.handler({
                    value: data.rooms.room3,
                    timeout: entry.max
                });

                decorate.el.selectXpand.xpandNoElement({
                    timeout: entry.max
                });
            });

            describe('Экспорт', () => {

                decorate.el.butIcBefore.handler({
                    icon: but.menu,
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

                if(user === 'all') {
                    decorate.el.file.comparison({
                        file: params.nameFile,
                        json: params.jsonAll
                    });
                }

                if(user === 'staff') {
                    decorate.el.file.comparison({
                        file: params.nameFile,
                        json: params.jsonStaff
                    });
                }

                if(user === 'visitor') {
                    decorate.el.file.comparison({
                        file: params.nameFile,
                        json: params.jsonVisitor
                    });
                }

                decorate.el.file.delete({
                    file: params.nameFile,
                    timeout: entry.upload
                });

            });
        });


    return  {
        checkData,
        display,
        filterDivision,
        filterDivisionForm,
        filterSearch,
        printTable,
        exportXLSX,
        exportCSV,
    }

}

module.exports = {
    otherAll: () => other('all', 'Все', befAll),
    otherStaff: () => other('staff', 'Сотрудники', befStaff),
    otherVisitor: () => other('visitor', 'Посетители', befVisitor),
}