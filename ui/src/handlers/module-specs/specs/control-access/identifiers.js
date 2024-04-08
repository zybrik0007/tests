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

const befAll = () => before('Вход и открытие подраздела "Выданные идентификаторы" вкладка "Все"', async () => {
    await dec.auth(entry.customLogin, entry.customPassword);
    await dec.simple(el.section.handler, [sec.con, entry.max], el.section);
    await dec.simple(el.subsection.handler, [sub.con.card, entry.max], el.subsection);
    await dec.simple(el.tab.handler, ['Все', entry.max], el.tab);
    await dec.simple(page.identifiersAll.init, [entry.max], page.identifiersAll);
    await page.base.loading(2000);
});

const befStaff = () => before('Вход и открытие подраздела "Выданные идентификаторы" вкладка "Сотрудники"', async () => {
    await dec.auth(entry.customLogin, entry.customPassword);
    await dec.simple(el.section.handler, [sec.con, entry.max], el.section);
    await dec.simple(el.subsection.handler, [sub.con.card, entry.max], el.subsection);
    await dec.simple(el.tab.handler, ['Сотрудники', entry.max], el.tab);
    await dec.simple(page.identifiersStaff.init, [entry.max], page.identifiersStaff);
    await page.base.loading(2000);
});

const befVisitor = () => before('Вход и открытие подраздела "Выданные идентификаторы" вкладка "Посетители"', async () => {
    await dec.auth(entry.customLogin, entry.customPassword);
    await dec.simple(el.section.handler, [sec.con, entry.max], el.section);
    await dec.simple(el.subsection.handler, [sub.con.card, entry.max], el.subsection);
    await dec.simple(el.tab.handler, ['Посетители', entry.max], el.tab);
    await dec.simple(page.identifiersVisitor.init, [entry.max], page.identifiersVisitor);
    await page.base.loading(2000);
});

const aft = () => after('Выход', async () => await dec.exit());

const other = (user, tab, bef) => {

    const display = () => describe(`Контроль доступа / Выданные идентификаторы / вкладка ${tab}. 
    Общая проверка без данных.`, () => {

        bef();
        aft();

        describe('Общее отображение', () => {

            decorate.el.section.active({
                section: sec.con,
                timeout: entry.max
            });

            decorate.el.subsection.active({
                subsection: sub.con.card,
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
                value: 'Выданные идентификаторы',
                timeout: entry.max
            });

            decorate.el.header.userGetText({
                value: entry.user,
                timeout: entry.max
            });
        });

        describe('Отображение фильтров и кнопок', () => {

            decorate.el.butIcBefore.active({
                icon: but.unsorted_delete_outline_android,
                timeout: entry.max
            });

            decorate.el.butIc.button({
                icon: icon.expanded_filter,
                timeout: entry.max
            });

            decorate.el.butIcBefore.active({
                icon: but.menu,
                timeout: entry.max
            });

            it(`Отображение календаря и выбранной даты ${data.date()}`,
                async () => await dec.simpleText(el.input.getValue,
                    ['', '', entry.max],
                    data.date(),
                    el.input));

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
                    value: 'Идентификатор',
                    timeout: entry.max
                });

                decorate.el.table.headGetText({
                    headNumber: 3,
                    value: 'Дата выдачи',
                    timeout: entry.max
                });

                decorate.el.table.headGetText({
                    headNumber: 4,
                    value: 'Действителен до',
                    timeout: entry.max
                });

                decorate.el.table.headGetText({
                    headNumber: 5,
                    value: 'Куда (подразделение)',
                    timeout: entry.max
                });

                decorate.el.table.headGetText({
                    headNumber: 6,
                    value: 'Должность',
                    timeout: entry.max
                });

                decorate.el.table.headGetText({
                    headNumber: 7,
                    value: 'Сопровождающий',
                    timeout: entry.max
                });

                decorate.el.table.headGetText({
                    headNumber: 8,
                    value: 'Документ',
                    timeout: entry.max
                });

                decorate.el.table.headGetText({
                    headNumber: 9,
                    value: 'Номер документа',
                    timeout: entry.max
                });

                decorate.el.table.headGetText({
                    headNumber: 10,
                    value: 'Дата последнего события',
                    timeout: entry.max
                });

                decorate.el.table.headGetText({
                    headNumber: 11,
                    value: 'Оператор',
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
                    value: 'Идентификатор',
                    timeout: entry.max
                });

                decorate.el.table.headGetText({
                    headNumber: 3,
                    value: 'Дата выдачи',
                    timeout: entry.max
                });

                decorate.el.table.headGetText({
                    headNumber: 4,
                    value: 'Действителен до',
                    timeout: entry.max
                });

                decorate.el.table.headGetText({
                    headNumber: 5,
                    value: 'Куда (подразделение)',
                    timeout: entry.max
                });

                decorate.el.table.headGetText({
                    headNumber: 6,
                    value: 'Должность',
                    timeout: entry.max
                });

                decorate.el.table.headGetText({
                    headNumber: 7,
                    value: 'Дата последнего события',
                    timeout: entry.max
                });

                decorate.el.table.headGetText({
                    headNumber: 8,
                    value: 'Оператор',
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
                    value: 'Идентификатор',
                    timeout: entry.max
                });

                decorate.el.table.headGetText({
                    headNumber: 3,
                    value: 'Дата выдачи',
                    timeout: entry.max
                });

                decorate.el.table.headGetText({
                    headNumber: 4,
                    value: 'Действителен до',
                    timeout: entry.max
                });

                decorate.el.table.headGetText({
                    headNumber: 5,
                    value: 'Куда (подразделение)',
                    timeout: entry.max
                });

                decorate.el.table.headGetText({
                    headNumber: 6,
                    value: 'Сопровождающий',
                    timeout: entry.max
                });

                decorate.el.table.headGetText({
                    headNumber: 7,
                    value: 'Документ',
                    timeout: entry.max
                });

                decorate.el.table.headGetText({
                    headNumber: 8,
                    value: 'Номер документа',
                    timeout: entry.max
                });

                decorate.el.table.headGetText({
                    headNumber: 9,
                    value: 'Дата последнего события',
                    timeout: entry.max
                });

                decorate.el.table.headGetText({
                    headNumber: 10,
                    value: 'Оператор',
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
            });
        });
    });

    const checkData = () => describe(`Контроль доступа / Выданные идентификаторы / вкладка ${tab}. 
    Проверка отображения данных .`, () => {

        bef();
        aft();

        if(user === 'all') {
            describe('Общие проверки', () => {

                it(`Отображение календаря и выбранной даты ${data.date()}`,
                    async () => await dec.simpleText(el.input.getValue,
                        ['', '', entry.max],
                        data.date(),
                        el.input));

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
                    value: data.fio.staff1,
                    timeout: entry.max
                });

                decorate.el.table.cellGetText({
                    headTitle: 'Идентификатор',
                    strNumber: 1,
                    cellNumber: 2,
                    value: data.staff.staff1.identifier[0].identifier,
                    timeout: entry.max
                });

                decorate.el.table.cellGetText({
                    headTitle: 'Дата выдачи',
                    strNumber: 1,
                    cellNumber: 3,
                    value: data.eventDate.event1.substr(0, 16),
                    timeout: entry.max
                });

                decorate.el.table.cellGetText({
                    headTitle: 'Действителен до',
                    strNumber: 1,
                    cellNumber: 4,
                    value: data.eventDate.event4.substr(0, 16),
                    timeout: entry.max
                });
            });

            describe('Проверка строки 2.', () => {
                decorate.el.table.cellGetText({
                    headTitle: 'ФИО',
                    strNumber: 2,
                    cellNumber: 1,
                    value: data.fio.staff2,
                    timeout: entry.max
                });

                decorate.el.table.cellGetText({
                    headTitle: 'Идентификатор',
                    strNumber: 2,
                    cellNumber: 2,
                    value: data.staff.staff2.identifier[0].identifier,
                    timeout: entry.max
                });

                decorate.el.table.cellGetText({
                    headTitle: 'Дата выдачи',
                    strNumber: 2,
                    cellNumber: 3,
                    value: data.eventDate.event1.substr(0, 16),
                    timeout: entry.max
                });

                decorate.el.table.cellGetText({
                    headTitle: 'Действителен до',
                    strNumber: 2,
                    cellNumber: 4,
                    value: data.eventDate.event4.substr(0, 16),
                    timeout: entry.max
                });
            });

            describe('Проверка строки 3.', () => {
                decorate.el.table.cellGetText({
                    headTitle: 'ФИО',
                    strNumber: 3,
                    cellNumber: 1,
                    value: data.fio.visitor1,
                    timeout: entry.max
                });

                decorate.el.table.cellGetText({
                    headTitle: 'Идентификатор',
                    strNumber: 3,
                    cellNumber: 2,
                    value: data.visitor.visitor1.identifier[0].identifier,
                    timeout: entry.max
                });

                decorate.el.table.cellGetText({
                    headTitle: 'Дата выдачи',
                    strNumber: 3,
                    cellNumber: 3,
                    value: data.eventDate.event1.substr(0, 16),
                    timeout: entry.max
                });

                decorate.el.table.cellGetText({
                    headTitle: 'Действителен до',
                    strNumber: 3,
                    cellNumber: 4,
                    value: data.eventDate.event4.substr(0, 16),
                    timeout: entry.max
                });
            });

            describe('Проверка строки 4.', () => {
                decorate.el.table.cellGetText({
                    headTitle: 'ФИО',
                    strNumber: 4,
                    cellNumber: 1,
                    value: data.fio.visitor2,
                    timeout: entry.max
                });

                decorate.el.table.cellGetText({
                    headTitle: 'Идентификатор',
                    strNumber: 4,
                    cellNumber: 2,
                    value: data.visitor.visitor2.identifier[0].identifier,
                    timeout: entry.max
                });

                decorate.el.table.cellGetText({
                    headTitle: 'Дата выдачи',
                    strNumber: 4,
                    cellNumber: 3,
                    value: data.eventDate.event1.substr(0, 16),
                    timeout: entry.max
                });

                decorate.el.table.cellGetText({
                    headTitle: 'Действителен до',
                    strNumber: 4,
                    cellNumber: 4,
                    value: data.eventDate.event4.substr(0, 16),
                    timeout: entry.max
                });
            });
        }

        if(user === 'staff') {
            describe('Общие проверки', () => {
                it(`Отображение календаря и выбранной даты ${data.date()}`,
                    async () => await dec.simpleText(el.input.getValue,
                        ['', '', entry.max],
                        data.date(),
                        el.input));

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
                    value: data.fio.staff1,
                    timeout: entry.max
                });

                decorate.el.table.cellGetText({
                    headTitle: 'Идентификатор',
                    strNumber: 1,
                    cellNumber: 2,
                    value: data.staff.staff1.identifier[0].identifier,
                    timeout: entry.max
                });

                decorate.el.table.cellGetText({
                    headTitle: 'Дата выдачи',
                    strNumber: 1,
                    cellNumber: 3,
                    value: data.eventDate.event1.substr(0, 16),
                    timeout: entry.max
                });

                decorate.el.table.cellGetText({
                    headTitle: 'Действителен до',
                    strNumber: 1,
                    cellNumber: 4,
                    value: data.eventDate.event4.substr(0, 16),
                    timeout: entry.max
                });
            });

            describe('Проверка строки 2.', () => {
                decorate.el.table.cellGetText({
                    headTitle: 'ФИО',
                    strNumber: 2,
                    cellNumber: 1,
                    value: data.fio.staff2,
                    timeout: entry.max
                });

                decorate.el.table.cellGetText({
                    headTitle: 'Идентификатор',
                    strNumber: 2,
                    cellNumber: 2,
                    value: data.staff.staff2.identifier[0].identifier,
                    timeout: entry.max
                });

                decorate.el.table.cellGetText({
                    headTitle: 'Дата выдачи',
                    strNumber: 2,
                    cellNumber: 3,
                    value: data.eventDate.event1.substr(0, 16),
                    timeout: entry.max
                });

                decorate.el.table.cellGetText({
                    headTitle: 'Действителен до',
                    strNumber: 2,
                    cellNumber: 4,
                    value: data.eventDate.event4.substr(0, 16),
                    timeout: entry.max
                });
            });
        }

        if(user === 'visitor') {
            describe('Общие проверки', () => {
                it(`Отображение календаря и выбранной даты ${data.date()}`,
                    async () => await dec.simpleText(el.input.getValue,
                        ['', '', entry.max],
                        data.date(),
                        el.input));

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
                    headTitle: 'Идентификатор',
                    strNumber: 1,
                    cellNumber: 2,
                    value: data.visitor.visitor1.identifier[0].identifier,
                    timeout: entry.max
                });

                decorate.el.table.cellGetText({
                    headTitle: 'Дата выдачи',
                    strNumber: 1,
                    cellNumber: 3,
                    value: data.eventDate.event1.substr(0, 16),
                    timeout: entry.max
                });

                decorate.el.table.cellGetText({
                    headTitle: 'Действителен до',
                    strNumber: 1,
                    cellNumber: 4,
                    value: data.eventDate.event4.substr(0, 16),
                    timeout: entry.max
                });
            });

            describe('Проверка строки 2.', () => {
                decorate.el.table.cellGetText({
                    headTitle: 'ФИО',
                    strNumber: 2,
                    cellNumber: 1,
                    value: data.fio.visitor2,
                    timeout: entry.max
                });

                decorate.el.table.cellGetText({
                    headTitle: 'Идентификатор',
                    strNumber: 2,
                    cellNumber: 2,
                    value: data.visitor.visitor2.identifier[0].identifier,
                    timeout: entry.max
                });

                decorate.el.table.cellGetText({
                    headTitle: 'Дата выдачи',
                    strNumber: 2,
                    cellNumber: 3,
                    value: data.eventDate.event1.substr(0, 16),
                    timeout: entry.max
                });

                decorate.el.table.cellGetText({
                    headTitle: 'Действителен до',
                    strNumber: 2,
                    cellNumber: 4,
                    value: data.eventDate.event4.substr(0, 16),
                    timeout: entry.max
                });
            });
        }

    });

    const filterDate = () => describe(`Контроль доступа / Выданные идентификаторы / вкладка ${tab}. 
    Проверка фильтра по дате.`, () => {

        bef();
        aft();

        if(user === 'all') {
            describe('Количество строк до применения фильтра по дате', () => {
                decorate.el.table.size({
                    strCount: 4 ,
                    timeout: entry.max
                });
            });
        }

        if(user === 'staff' || user === 'visitor') {
            describe('Количество строк до применения фильтра по дате', () => {
                decorate.el.table.size({
                    strCount: 2,
                    timeout: entry.max
                });
            });
        }

        describe('Выбор промежутка времени 2023-06-01', () => {
            it(`Нажатие по фильтру выбора даты.`,
                async () => await dec.simple(el.input.handler,
                    ['', '', entry.max],
                    el.input));

            decorate.el.datepicker.date({
                day: 1,
                month: 'Июнь',
                year: 2023,
                scrollYear: -500,
                timeout: entry.max
            });

            it(`Нажатие по фильтру выбора даты.`,
                async () => await dec.simple(el.input.handler,
                    ['', '', entry.max],
                    el.input));

            decorate.el.datepicker.date({
                day: 1,
                month: 'Июнь',
                year: 2023,
                scrollYear: -500,
                timeout: entry.max
            });
        });

        if(user === 'all') {
            describe('Количество строк после применения фильтра по дате', () => {
                decorate.el.table.size({
                    strCount: 2,
                    timeout: entry.max
                });
            });
        }

        if(user === 'staff' || user === 'visitor') {
            describe('Количество строк после применения фильтра по дате', () => {
                decorate.el.table.size({
                    strCount: 1,
                    timeout: entry.max
                });
            });
        }

        if(user === 'all') {
            describe('Проверка строки 1.', () => {
                decorate.el.table.cellGetText({
                    headTitle: 'ФИО',
                    strNumber: 1,
                    cellNumber: 1,
                    value: data.fio.staff3,
                    timeout: entry.max
                });

                decorate.el.table.cellGetText({
                    headTitle: 'Идентификатор',
                    strNumber: 1,
                    cellNumber: 2,
                    value: data.staff.staff3.identifier[0].identifier,
                    timeout: entry.max
                });

                decorate.el.table.cellGetText({
                    headTitle: 'Дата выдачи',
                    strNumber: 1,
                    cellNumber: 3,
                    value: data.eventDate.event5.substr(0, 16),
                    timeout: entry.max
                });
            });

            describe('Проверка строки 2.', () => {
                decorate.el.table.cellGetText({
                    headTitle: 'ФИО',
                    strNumber: 2,
                    cellNumber: 1,
                    value: data.fio.visitor3,
                    timeout: entry.max
                });

                decorate.el.table.cellGetText({
                    headTitle: 'Идентификатор',
                    strNumber: 2,
                    cellNumber: 2,
                    value: data.visitor.visitor3.identifier[0].identifier,
                    timeout: entry.max
                });

                decorate.el.table.cellGetText({
                    headTitle: 'Дата выдачи',
                    strNumber: 2,
                    cellNumber: 3,
                    value: data.eventDate.event5.substr(0, 16),
                    timeout: entry.max
                });
            });
        }

        if(user === 'staff') {
            describe('Проверка строки 1.', () => {
                decorate.el.table.cellGetText({
                    headTitle: 'ФИО',
                    strNumber: 1,
                    cellNumber: 1,
                    value: data.fio.staff3,
                    timeout: entry.max
                });

                decorate.el.table.cellGetText({
                    headTitle: 'Идентификатор',
                    strNumber: 1,
                    cellNumber: 2,
                    value: data.staff.staff3.identifier[0].identifier,
                    timeout: entry.max
                });

                decorate.el.table.cellGetText({
                    headTitle: 'Дата выдачи',
                    strNumber: 1,
                    cellNumber: 3,
                    value: data.eventDate.event5.substr(0, 16),
                    timeout: entry.max
                });
            });
        }

        if(user === 'visitor') {
            describe('Проверка строки 1.', () => {
                decorate.el.table.cellGetText({
                    headTitle: 'ФИО',
                    strNumber: 1,
                    cellNumber: 1,
                    value: data.fio.visitor3,
                    timeout: entry.max
                });

                decorate.el.table.cellGetText({
                    headTitle: 'Идентификатор',
                    strNumber: 1,
                    cellNumber: 2,
                    value: data.visitor.visitor3.identifier[0].identifier,
                    timeout: entry.max
                });

                decorate.el.table.cellGetText({
                    headTitle: 'Дата выдачи',
                    strNumber: 1,
                    cellNumber: 3,
                    value: data.eventDate.event5.substr(0, 16),
                    timeout: entry.max
                });
            });
        }

    });

    const filterDivision = () => describe(`Контроль доступа / Выданные идентификаторы / вкладка ${tab}. 
    Проверка фильтра по подразделению.`, () => {

        bef();
        aft();

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
                    value: data.fio.staff1,
                    timeout: entry.max
                });

                decorate.el.table.cellGetText({
                    headTitle: 'Куда (подразделение)',
                    strNumber: 1,
                    cellNumber: 5,
                    value: data.divisions.division1.name,
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
                    headTitle: 'Куда (подразделение)',
                    strNumber: 2,
                    cellNumber: 5,
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
                    headTitle: 'Куда (подразделение)',
                    strNumber: 1,
                    cellNumber: 5,
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
                    headTitle: 'Куда (подразделение)',
                    strNumber: 1,
                    cellNumber: 5,
                    value: data.divisions.division1.name,
                    timeout: entry.max
                });
            });
        }
    });

    const filterDivisionForm = () => describe(`Контроль доступа / Выданные идентификаторы / вкладка ${tab}. 
    Проверка фильтра по подразделению через модальное окно "Подразделение".`, () => {

        bef();
        aft();

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
                    value: data.fio.staff1,
                    timeout: entry.max
                });

                decorate.el.table.cellGetText({
                    headTitle: 'Куда (подразделение)',
                    strNumber: 1,
                    cellNumber: 5,
                    value: data.divisions.division1.name,
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
                    headTitle: 'Куда (подразделение)',
                    strNumber: 2,
                    cellNumber: 5,
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
                    headTitle: 'Куда (подразделение)',
                    strNumber: 1,
                    cellNumber: 5,
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
                    headTitle: 'Куда (подразделение)',
                    strNumber: 1,
                    cellNumber: 5,
                    value: data.divisions.division1.name,
                    timeout: entry.max
                });
            });
        }
    });

    const filterSearch = () => describe(`Контроль доступа / Выданные идентификаторы / вкладка ${tab}. 
    Проверка фильтра по поиску.`, () => {

        bef();
        aft();

        if(user === 'all') {
            describe('Количество строк до применения фильтра по поиску', () => {
                decorate.el.table.size({
                    strCount: 4,
                    timeout: entry.max
                });
            });
        }

        if(user === 'staff' || user === 'visitor' ) {
            describe('Количество строк до применения фильтра по поиску', () => {
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

    const printTable = () => describe(`Контроль доступа / Выданные идентификаторы / вкладка ${tab}. 
    Проверка печати.`,() => {

        bef();
        aft();

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
                    value: data.fio.staff1,
                    timeout: entry.max
                });
                decorate.modal.printTable.cellGetText({
                    head: 'Идентификатор',
                    str: 1,
                    cell: 2,
                    value: data.staff.staff1.identifier[0].identifier,
                    timeout: entry.max
                });
                decorate.modal.printTable.cellGetText({
                    head: 'Дата выдачи',
                    str: 1,
                    cell: 3,
                    value: data.eventDate.event1,
                    timeout: entry.max
                });
                decorate.modal.printTable.cellGetText({
                    head: 'Действителен до',
                    str: 1,
                    cell: 4,
                    value: data.endDate + ' 00:00:00',
                    timeout: entry.max
                });
                decorate.modal.printTable.cellGetText({
                    head: 'Куда (подразделение)',
                    str: 1,
                    cell: 5,
                    value: data.divisions.division1.name,
                    timeout: entry.max
                });
                decorate.modal.printTable.cellGetText({
                    head: 'Должность',
                    str: 1,
                    cell: 6,
                    value: data.positions.position1.name,
                    timeout: entry.max
                });
                decorate.modal.printTable.cellGetText({
                    head: 'Сопровождающий',
                    str: 1,
                    cell: 7,
                    value: '',
                    timeout: entry.max
                });
                decorate.modal.printTable.cellGetText({
                    head: 'Документ',
                    str: 1,
                    cell: 8,
                    value: '',
                    timeout: entry.max
                });
                decorate.modal.printTable.cellGetText({
                    head: 'Номер документа',
                    str: 1,
                    cell: 9,
                    value: '',
                    timeout: entry.max
                });
                decorate.modal.printTable.cellGetText({
                    head: 'Дата последнего события',
                    str: 1,
                    cell: 10,
                    value: data.eventDate.event3,
                    timeout: entry.max
                });
                decorate.modal.printTable.cellGetText({
                    head: 'Оператор',
                    str: 1,
                    cell: 11,
                    value: entry.user,
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
                    value: data.fio.staff1,
                    timeout: entry.max
                });
                decorate.modal.printTable.cellGetText({
                    head: 'Идентификатор',
                    str: 1,
                    cell: 2,
                    value: data.staff.staff1.identifier[0].identifier,
                    timeout: entry.max
                });
                decorate.modal.printTable.cellGetText({
                    head: 'Дата выдачи',
                    str: 1,
                    cell: 3,
                    value: data.eventDate.event1,
                    timeout: entry.max
                });
                decorate.modal.printTable.cellGetText({
                    head: 'Действителен до',
                    str: 1,
                    cell: 4,
                    value: data.endDate + ' 00:00:00',
                    timeout: entry.max
                });
                decorate.modal.printTable.cellGetText({
                    head: 'Куда (подразделение)',
                    str: 1,
                    cell: 5,
                    value: data.divisions.division1.name,
                    timeout: entry.max
                });
                decorate.modal.printTable.cellGetText({
                    head: 'Должность',
                    str: 1,
                    cell: 6,
                    value: data.positions.position1.name,
                    timeout: entry.max
                });
                decorate.modal.printTable.cellGetText({
                    head: 'Дата последнего события',
                    str: 1,
                    cell: 7,
                    value: data.eventDate.event3,
                    timeout: entry.max
                });
                decorate.modal.printTable.cellGetText({
                    head: 'Оператор',
                    str: 1,
                    cell: 8,
                    value: entry.user,
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
                    value: data.fio.visitor1,
                    timeout: entry.max
                });
                decorate.modal.printTable.cellGetText({
                    head: 'Идентификатор',
                    str: 1,
                    cell: 2,
                    value: data.visitor.visitor1.identifier[0].identifier,
                    timeout: entry.max
                });
                decorate.modal.printTable.cellGetText({
                    head: 'Дата выдачи',
                    str: 1,
                    cell: 3,
                    value: data.eventDate.event1,
                    timeout: entry.max
                });
                decorate.modal.printTable.cellGetText({
                    head: 'Действителен до',
                    str: 1,
                    cell: 4,
                    value: data.endDate + ' 00:00:00',
                    timeout: entry.max
                });
                decorate.modal.printTable.cellGetText({
                    head: 'Куда (подразделение)',
                    str: 1,
                    cell: 5,
                    value: data.divisions.division1.name,
                    timeout: entry.max
                });
                decorate.modal.printTable.cellGetText({
                    head: 'Сопровождающий',
                    str: 1,
                    cell: 6,
                    value: '',
                    timeout: entry.max
                });
                decorate.modal.printTable.cellGetText({
                    head: 'Документ',
                    str: 1,
                    cell: 7,
                    value: data.visitor.visitor1.supporting_document,
                    timeout: entry.max
                });
                decorate.modal.printTable.cellGetText({
                    head: 'Номер документа',
                    str: 1,
                    cell: 8,
                    value: data.visitor.visitor1.supporting_document_number,
                    timeout: entry.max
                });
                decorate.modal.printTable.cellGetText({
                    head: 'Дата последнего события',
                    str: 1,
                    cell: 9,
                    value: data.eventDate.event3,
                    timeout: entry.max
                });
                decorate.modal.printTable.cellGetText({
                    head: 'Оператор',
                    str: 1,
                    cell: 10,
                    value: entry.user,
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

    const exportXLSX = () => describe(`Контроль доступа / Выданные идентификаторы / вкладка ${tab}. 
    Экспорт XLSX.`, () => {

        const params = {
            nameFile: 'extraidsreport.xlsx',
            jsonAll: [
                { 'Отчет "Выданные идентификаторы"': `${data.date2()}` },
                {
                    'Отчет "Выданные идентификаторы"': 'Фамилия',
                    __EMPTY: 'Имя',
                    __EMPTY_1: 'Отчество',
                    __EMPTY_2: 'Идентификатор',
                    __EMPTY_3: 'Дата выдачи',
                    __EMPTY_4: 'Действителен до',
                    __EMPTY_5: 'Куда (подразделение)',
                    __EMPTY_6: 'Должность',
                    __EMPTY_7: 'Сопровождающий',
                    __EMPTY_8: 'Документ',
                    __EMPTY_9: 'Номер документа',
                    __EMPTY_10: 'Дата последнего события',
                    __EMPTY_11: 'Оператор'
                },
                {
                    'Отчет "Выданные идентификаторы"': 'staff',
                    __EMPTY: 'name',
                    __EMPTY_1: '1',
                    __EMPTY_2: '1',
                    __EMPTY_3: `${data.eventDate.event1.slice(0, -3)}`,
                    __EMPTY_4: '2033-01-01 00:00',
                    __EMPTY_5: 'division1',
                    __EMPTY_6: 'position1',
                    __EMPTY_10: `${data.eventDate.event3}`,
                    __EMPTY_11: 'Администратор  '
                },
                {
                    'Отчет "Выданные идентификаторы"': 'staff',
                    __EMPTY: 'name',
                    __EMPTY_1: '2',
                    __EMPTY_2: '2',
                    __EMPTY_3: `${data.eventDate.event1.slice(0, -3)}`,
                    __EMPTY_4: '2033-01-01 00:00',
                    __EMPTY_5: 'division2',
                    __EMPTY_6: 'position2',
                    __EMPTY_10: `${data.eventDate.event1}`,
                    __EMPTY_11: 'Администратор  '
                },
                {
                    'Отчет "Выданные идентификаторы"': 'visitor',
                    __EMPTY: 'name',
                    __EMPTY_1: '1',
                    __EMPTY_2: '4',
                    __EMPTY_3: `${data.eventDate.event1.slice(0, -3)}`,
                    __EMPTY_4: '2033-01-01 00:00',
                    __EMPTY_5: 'division1',
                    __EMPTY_8: 'passport',
                    __EMPTY_9: '1',
                    __EMPTY_10: `${data.eventDate.event3}`,
                    __EMPTY_11: 'Администратор  '
                },
                {
                    'Отчет "Выданные идентификаторы"': 'visitor',
                    __EMPTY: 'name',
                    __EMPTY_1: '2',
                    __EMPTY_2: '5',
                    __EMPTY_3: `${data.eventDate.event1.slice(0, -3)}`,
                    __EMPTY_4: '2033-01-01 00:00',
                    __EMPTY_5: 'division2',
                    __EMPTY_8: 'passport',
                    __EMPTY_9: '2',
                    __EMPTY_10: `${data.eventDate.event1}`,
                    __EMPTY_11: 'Администратор  '
                }
            ],
            jsonStaff: [
                { 'Отчет "Выданные идентификаторы"': `${data.date2()}` },
                {
                    'Отчет "Выданные идентификаторы"': 'Фамилия',
                    __EMPTY: 'Имя',
                    __EMPTY_1: 'Отчество',
                    __EMPTY_2: 'Идентификатор',
                    __EMPTY_3: 'Дата выдачи',
                    __EMPTY_4: 'Действителен до',
                    __EMPTY_5: 'Куда (подразделение)',
                    __EMPTY_6: 'Должность',
                    __EMPTY_7: 'Дата последнего события',
                    __EMPTY_8: 'Оператор'
                },
                {
                    'Отчет "Выданные идентификаторы"': 'staff',
                    __EMPTY: 'name',
                    __EMPTY_1: '1',
                    __EMPTY_2: '1',
                    __EMPTY_3: `${data.eventDate.event1.slice(0, -3)}`,
                    __EMPTY_4: '2033-01-01 00:00',
                    __EMPTY_5: 'division1',
                    __EMPTY_6: 'position1',
                    __EMPTY_7: `${data.eventDate.event3}`,
                    __EMPTY_8: 'Администратор  '
                },
                {
                    'Отчет "Выданные идентификаторы"': 'staff',
                    __EMPTY: 'name',
                    __EMPTY_1: '2',
                    __EMPTY_2: '2',
                    __EMPTY_3: `${data.eventDate.event1.slice(0, -3)}`,
                    __EMPTY_4: '2033-01-01 00:00',
                    __EMPTY_5: 'division2',
                    __EMPTY_6: 'position2',
                    __EMPTY_7: `${data.eventDate.event1}`,
                    __EMPTY_8: 'Администратор  '
                }
            ],
            jsonVisitor: [
                { 'Отчет "Выданные идентификаторы"': `${data.date2()}` },
                {
                    'Отчет "Выданные идентификаторы"': 'Фамилия',
                    __EMPTY: 'Имя',
                    __EMPTY_1: 'Отчество',
                    __EMPTY_2: 'Идентификатор',
                    __EMPTY_3: 'Дата выдачи',
                    __EMPTY_4: 'Действителен до',
                    __EMPTY_5: 'Куда (подразделение)',
                    __EMPTY_6: 'Сопровождающий',
                    __EMPTY_7: 'Документ',
                    __EMPTY_8: 'Номер документа',
                    __EMPTY_9: 'Дата последнего события',
                    __EMPTY_10: 'Оператор'
                },
                {
                    'Отчет "Выданные идентификаторы"': 'visitor',
                    __EMPTY: 'name',
                    __EMPTY_1: '1',
                    __EMPTY_2: '4',
                    __EMPTY_3: `${data.eventDate.event1.slice(0, -3)}`,
                    __EMPTY_4: '2033-01-01 00:00',
                    __EMPTY_5: 'division1',
                    __EMPTY_7: 'passport',
                    __EMPTY_8: '1',
                    __EMPTY_9: `${data.eventDate.event3}`,
                    __EMPTY_10: 'Администратор  '
                },
                {
                    'Отчет "Выданные идентификаторы"': 'visitor',
                    __EMPTY: 'name',
                    __EMPTY_1: '2',
                    __EMPTY_2: '5',
                    __EMPTY_3: `${data.eventDate.event1.slice(0, -3)}`,
                    __EMPTY_4: '2033-01-01 00:00',
                    __EMPTY_5: 'division2',
                    __EMPTY_7: 'passport',
                    __EMPTY_8: '2',
                    __EMPTY_9: `${data.eventDate.event1}`,
                    __EMPTY_10: 'Администратор  '
                }
            ],
        }

        bef();
        aft();

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

    const exportCSV = () => describe(`Контроль доступа / Выданные идентификаторы / вкладка ${tab}. 
    Экспорт CSV.`, () => {

        const params = {
            nameFile: 'extraidsreport.csv',
            jsonAll: [
                {
                    'Фамилия': 'staff',
                    'Имя': 'name',
                    'Отчество': 1,
                    'Идентификатор': 1,
                    'Дата выдачи': data.eventDate.event1.slice(0, -3),
                    'Действителен до': '2033-01-01 00:00',
                    'Куда (подразделение)': 'division1',
                    'Должность': 'position1',
                    'Дата последнего события': data.eventDate.event3,
                    'Оператор': 'Администратор  '
                },
                {
                    'Фамилия': 'staff',
                    'Имя': 'name',
                    'Отчество': 2,
                    'Идентификатор': 2,
                    'Дата выдачи': data.eventDate.event1.slice(0, -3),
                    'Действителен до': '2033-01-01 00:00',
                    'Куда (подразделение)': 'division2',
                    'Должность': 'position2',
                    'Дата последнего события': data.eventDate.event1,
                    'Оператор': 'Администратор  '
                },
                {
                    'Фамилия': 'visitor',
                    'Имя': 'name',
                    'Отчество': 1,
                    'Идентификатор': 4,
                    'Дата выдачи': data.eventDate.event1.slice(0, -3),
                    'Действителен до': '2033-01-01 00:00',
                    'Куда (подразделение)': 'division1',
                    'Документ': 'passport',
                    'Номер документа': 1,
                    'Дата последнего события': data.eventDate.event3,
                    'Оператор': 'Администратор  '
                },
                {
                    'Фамилия': 'visitor',
                    'Имя': 'name',
                    'Отчество': 2,
                    'Идентификатор': 5,
                    'Дата выдачи': data.eventDate.event1.slice(0, -3),
                    'Действителен до': '2033-01-01 00:00',
                    'Куда (подразделение)': 'division2',
                    'Документ': 'passport',
                    'Номер документа': 2,
                    'Дата последнего события': data.eventDate.event1,
                    'Оператор': 'Администратор  '
                }
            ],
            jsonStaff: [
                {
                    'Фамилия': 'staff',
                    'Имя': 'name',
                    'Отчество': 1,
                    'Идентификатор': 1,
                    'Дата выдачи': data.eventDate.event1.slice(0, -3),
                    'Действителен до': '2033-01-01 00:00',
                    'Куда (подразделение)': 'division1',
                    'Должность': 'position1',
                    'Дата последнего события': data.eventDate.event3,
                    'Оператор': 'Администратор  '
                },
                {
                    'Фамилия': 'staff',
                    'Имя': 'name',
                    'Отчество': 2,
                    'Идентификатор': 2,
                    'Дата выдачи': data.eventDate.event1.slice(0, -3),
                    'Действителен до': '2033-01-01 00:00',
                    'Куда (подразделение)': 'division2',
                    'Должность': 'position2',
                    'Дата последнего события': data.eventDate.event1,
                    'Оператор': 'Администратор  '
                }
            ],
            jsonVisitor: [
                {
                    'Фамилия': 'visitor',
                    'Имя': 'name',
                    'Отчество': 1,
                    'Идентификатор': 4,
                    'Дата выдачи': data.eventDate.event1.slice(0, -3),
                    'Действителен до': '2033-01-01 00:00',
                    'Куда (подразделение)': 'division1',
                    'Документ': 'passport',
                    'Номер документа': 1,
                    'Дата последнего события': data.eventDate.event3,
                    'Оператор': 'Администратор  '
                },
                {
                    'Фамилия': 'visitor',
                    'Имя': 'name',
                    'Отчество': 2,
                    'Идентификатор': 5,
                    'Дата выдачи': data.eventDate.event1.slice(0, -3),
                    'Действителен до': '2033-01-01 00:00',
                    'Куда (подразделение)': 'division2',
                    'Документ': 'passport',
                    'Номер документа': 2,
                    'Дата последнего события': data.eventDate.event1,
                    'Оператор': 'Администратор  '
                }
            ],
        }

        bef();
        aft();

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

    const deleteIdentifier = () => describe(`Контроль доступа / Выданные идентификаторы / вкладка ${tab}. 
    Проверка формы выданные идентификаторы. Удаление идентифкаторов`, () => {

        bef();
        aft();

        describe('Открытие модального окна и выбор Даты последнего события', () => {
            decorate.el.butIcBefore.handler({
                icon: but.unsorted_delete_outline_android,
                timeout: entry.max
            });

            decorate.modal.removeIdentifiers.init({
                timeout: entry.max
            });

            decorate.modal.removeIdentifiers.noStr({
                timeout: entry.max
            });

            decorate.el.rowEmpty.getText({
                value: 'Нет данных для отображения',
                timeout: entry.max
            });

            decorate.el.input.handler({
                title: 'Дата последнего события',
                placeholder: 'Выберите дату',
                timeout: entry.max
            });

            decorate.el.datepicker.dateParse({
                day: 7,
                month: 'Июнь',
                year: 2023,
                scrollYear: -500,
                timeout: entry.max
            });
        });

        if(user === 'all') {
            describe('Общие проверки', () => {
                decorate.modal.removeIdentifiers.size({
                    count: 3,
                    timeout: entry.max
                });
            });

            describe('Проверка строки 1', () => {
                decorate.modal.removeIdentifiers.cellGetText({
                    headTitle: 'Идентификатор',
                    strNumber: 1,
                    cellNumber: 1,
                    value: data.staff.staff3.identifier[0].identifier,
                    timeout: entry.max
                });
                decorate.modal.removeIdentifiers.cellGetText({
                    headTitle: 'ФИО',
                    strNumber: 1,
                    cellNumber: 3,
                    value: data.fio.staff3,
                    timeout: entry.max
                });
            });

            describe('Проверка строки 2', () => {
                decorate.modal.removeIdentifiers.cellGetText({
                    headTitle: 'Идентификатор',
                    strNumber: 2,
                    cellNumber: 1,
                    value: data.staff.staff4.identifier[0].identifier,
                    timeout: entry.max
                });
                decorate.modal.removeIdentifiers.cellGetText({
                    headTitle: 'ФИО',
                    strNumber: 2,
                    cellNumber: 3,
                    value: data.fio.staff4,
                    timeout: entry.max
                });
            });

            describe('Проверка строки 3', () => {
                decorate.modal.removeIdentifiers.cellGetText({
                    headTitle: 'Идентификатор',
                    strNumber: 3,
                    cellNumber: 1,
                    value: data.visitor.visitor3.identifier[0].identifier,
                    timeout: entry.max
                });
                decorate.modal.removeIdentifiers.cellGetText({
                    headTitle: 'ФИО',
                    strNumber: 3,
                    cellNumber: 3,
                    value: data.fio.visitor3,
                    timeout: entry.max
                });
            });

            describe('Проверка кнопок Выделить всё и Убрать выделение у всех строк', () => {
                describe('Проверка строк до нажатия кнопки Выделить всё', () => {
                    [...Array(2).keys()].forEach(num => {
                        decorate.modal.removeIdentifiers.checkboxUnchecked({
                            strNumber: num + 1,
                            timeout: entry.max
                        });
                    });
                });

                describe('Нажатие кнопки Выделить всё', () => {
                    decorate.el.butIcBefore.handler({
                        icon: but.action_done_all,
                        timeout: entry.max
                    });
                });

                describe('Проверка строк после нажатия кнопки Выделить всё', () => {
                    [...Array(2).keys()].forEach(num => {
                        decorate.modal.removeIdentifiers.checkboxChecked({
                            strNumber: num + 1,
                            timeout: entry.max
                        });
                    });
                });

                describe('Нажатие кнопки Убрать выделение у всех строк', () => {
                    decorate.el.butIcBefore.handler({
                        icon: but.action_remove_done,
                        timeout: entry.max
                    });
                });

                describe('Проверка строк после нажатия кнопки Убрать выделение у всех строк', () => {
                    [...Array(2).keys()].forEach(num => {
                        decorate.modal.removeIdentifiers.checkboxUnchecked({
                            strNumber: num + 1,
                            timeout: entry.max
                        });
                    });
                });
            });

            describe(`Удаление идентфикатора у первой строки - ${data.fio.staff3}.`, () => {
                decorate.modal.removeIdentifiers.checkboxHandler({
                    strNumber: 1,
                    timeout: entry.max
                });
                decorate.modal.removeIdentifiers.checkboxChecked({
                    strNumber: 1,
                    timeout: entry.max
                });
                decorate.el.button.handler({
                    name: 'Удалить помеченные идентификаторы',
                    timeout: entry.max
                });
                decorate.modal.removeIdentifiers.initClose({
                    timeout: entry.max
                });


            });

            describe(`Проверка отсутствия ${data.fio.staff3} в модально окне Неиспользуемые идентификаторы`, () => {
                decorate.el.butIcBefore.handler({
                    icon: but.unsorted_delete_outline_android,
                    timeout: entry.max
                });

                decorate.modal.removeIdentifiers.init({
                    timeout: entry.max
                });

                decorate.modal.removeIdentifiers.noStr({
                    timeout: entry.max
                });

                decorate.el.rowEmpty.getText({
                    value: 'Нет данных для отображения',
                    timeout: entry.max
                });

                decorate.el.input.handler({
                    title: 'Дата последнего события',
                    placeholder: 'Выберите дату',
                    timeout: entry.max
                });

                decorate.el.datepicker.dateParse({
                    day: 7,
                    month: 'Июнь',
                    year: 2023,
                    scrollYear: -500,
                    timeout: entry.max
                });

                decorate.modal.removeIdentifiers.size({
                    count: 2,
                    timeout: entry.max
                });

                decorate.modal.removeIdentifiers.cellGetText({
                    headTitle: 'ФИО',
                    strNumber: 1,
                    cellNumber: 3,
                    value: data.fio.staff4,
                    timeout: entry.max
                });

                decorate.modal.removeIdentifiers.closeHandler({
                    timeout: entry.max
                });

                decorate.modal.removeIdentifiers.initClose({
                    timeout: entry.max
                });
            });
        }

        if(user === 'staff') {
            describe('Общие проверки', () => {
                decorate.modal.removeIdentifiers.size({
                    count: 1,
                    timeout: entry.max
                });
            });

            describe('Проверка строки 1', () => {
                decorate.modal.removeIdentifiers.cellGetText({
                    headTitle: 'Идентификатор',
                    strNumber: 1,
                    cellNumber: 1,
                    value: data.staff.staff4.identifier[0].identifier,
                    timeout: entry.max
                });
                decorate.modal.removeIdentifiers.cellGetText({
                    headTitle: 'ФИО',
                    strNumber: 1,
                    cellNumber: 3,
                    value: data.fio.staff4,
                    timeout: entry.max
                });
            });

            describe('Проверка кнопок Выделить всё и Убрать выделение у всех строк', () => {
                describe('Проверка строк до нажатия кнопки Выделить всё', () => {
                    decorate.modal.removeIdentifiers.checkboxUnchecked({
                        strNumber: 1,
                        timeout: entry.max
                    });
                });

                describe('Нажатие кнопки Выделить всё', () => {
                    decorate.el.butIcBefore.handler({
                        icon: but.action_done_all,
                        timeout: entry.max
                    });
                });

                describe('Проверка строк после нажатия кнопки Выделить всё', () => {
                    decorate.modal.removeIdentifiers.checkboxChecked({
                        strNumber: 1,
                        timeout: entry.max
                    });
                });

                describe('Нажатие кнопки Убрать выделение у всех строк', () => {
                    decorate.el.butIcBefore.handler({
                        icon: but.action_remove_done,
                        timeout: entry.max
                    });
                });

                describe('Проверка строк после нажатия кнопки Убрать выделение у всех строк', () => {
                    decorate.modal.removeIdentifiers.checkboxUnchecked({
                        strNumber: 1,
                        timeout: entry.max
                    });
                });
            });

            describe(`Удаление идентфикатора у первой строки - ${data.fio.staff4}.`, () => {
                decorate.modal.removeIdentifiers.checkboxHandler({
                    strNumber: 1,
                    timeout: entry.max
                });
                decorate.modal.removeIdentifiers.checkboxChecked({
                    strNumber: 1,
                    timeout: entry.max
                });
                decorate.el.button.handler({
                    name: 'Удалить помеченные идентификаторы',
                    timeout: entry.max
                });
                decorate.modal.removeIdentifiers.initClose({
                    timeout: entry.max
                });
            });

            describe(`Проверка отсутствия ${data.fio.staff4} в модально окне Неиспользуемые идентификаторы`, () => {
                decorate.el.butIcBefore.handler({
                    icon: but.unsorted_delete_outline_android,
                    timeout: entry.max
                });

                decorate.modal.removeIdentifiers.init({
                    timeout: entry.max
                });

                decorate.modal.removeIdentifiers.noStr({
                    timeout: entry.max
                });

                decorate.el.rowEmpty.getText({
                    value: 'Нет данных для отображения',
                    timeout: entry.max
                });

                decorate.el.input.handler({
                    title: 'Дата последнего события',
                    placeholder: 'Выберите дату',
                    timeout: entry.max
                });

                decorate.el.datepicker.dateParse({
                    day: 7,
                    month: 'Июнь',
                    year: 2023,
                    scrollYear: -500,
                    timeout: entry.max
                });

                decorate.modal.removeIdentifiers.noStr({
                    timeout: entry.max
                });

                decorate.el.rowEmpty.getText({
                    value: 'Нет данных для отображения',
                    timeout: entry.max
                });

                decorate.modal.removeIdentifiers.closeHandler({
                    timeout: entry.max
                });

                decorate.modal.removeIdentifiers.initClose({
                    timeout: entry.max
                });
            });
        }

        if(user === 'visitor') {
            describe('Общие проверки', () => {
                decorate.modal.removeIdentifiers.size({
                    count: 1,
                    timeout: entry.max
                });
            });

            describe('Проверка строки 1', () => {
                decorate.modal.removeIdentifiers.cellGetText({
                    headTitle: 'Идентификатор',
                    strNumber: 1,
                    cellNumber: 1,
                    value: data.visitor.visitor3.identifier[0].identifier,
                    timeout: entry.max
                });
                decorate.modal.removeIdentifiers.cellGetText({
                    headTitle: 'ФИО',
                    strNumber: 1,
                    cellNumber: 3,
                    value: data.fio.visitor3,
                    timeout: entry.max
                });
            });

            describe('Проверка кнопок Выделить всё и Убрать выделение у всех строк', () => {
                describe('Проверка строк до нажатия кнопки Выделить всё', () => {
                    decorate.modal.removeIdentifiers.checkboxUnchecked({
                        strNumber: 1,
                        timeout: entry.max
                    });
                });

                describe('Нажатие кнопки Выделить всё', () => {
                    decorate.el.butIcBefore.handler({
                        icon: but.action_done_all,
                        timeout: entry.max
                    });
                });

                describe('Проверка строк после нажатия кнопки Выделить всё', () => {
                    decorate.modal.removeIdentifiers.checkboxChecked({
                        strNumber: 1,
                        timeout: entry.max
                    });
                });

                describe('Нажатие кнопки Убрать выделение у всех строк', () => {
                    decorate.el.butIcBefore.handler({
                        icon: but.action_remove_done,
                        timeout: entry.max
                    });
                });

                describe('Проверка строк после нажатия кнопки Убрать выделение у всех строк', () => {
                    decorate.modal.removeIdentifiers.checkboxUnchecked({
                        strNumber: 1,
                        timeout: entry.max
                    });
                });
            });

            describe(`Удаление идентфикатора у первой строки - ${data.fio.visitor3}.`, () => {
                decorate.modal.removeIdentifiers.checkboxHandler({
                    strNumber: 1,
                    timeout: entry.max
                });
                decorate.modal.removeIdentifiers.checkboxChecked({
                    strNumber: 1,
                    timeout: entry.max
                });
                decorate.el.button.handler({
                    name: 'Удалить помеченные идентификаторы',
                    timeout: entry.max
                });
                decorate.modal.removeIdentifiers.initClose({
                    timeout: entry.max
                });
            });

            describe(`Проверка отсутствия ${data.fio.visitor3} в модально окне Неиспользуемые идентификаторы`, () => {
                decorate.el.butIcBefore.handler({
                    icon: but.unsorted_delete_outline_android,
                    timeout: entry.max
                });

                decorate.modal.removeIdentifiers.init({
                    timeout: entry.max
                });

                decorate.modal.removeIdentifiers.noStr({
                    timeout: entry.max
                });

                decorate.el.rowEmpty.getText({
                    value: 'Нет данных для отображения',
                    timeout: entry.max
                });

                decorate.el.input.handler({
                    title: 'Дата последнего события',
                    placeholder: 'Выберите дату',
                    timeout: entry.max
                });

                decorate.el.datepicker.dateParse({
                    day: 7,
                    month: 'Июнь',
                    year: 2023,
                    scrollYear: -500,
                    timeout: entry.max
                });

                decorate.modal.removeIdentifiers.noStr({
                    timeout: entry.max
                });

                decorate.el.rowEmpty.getText({
                    value: 'Нет данных для отображения',
                    timeout: entry.max
                });

                decorate.modal.removeIdentifiers.closeHandler({
                    timeout: entry.max
                });

                decorate.modal.removeIdentifiers.initClose({
                    timeout: entry.max
                });
            });
        }
    });

    return  {
        display,
        checkData,
        filterDate,
        filterDivision,
        filterDivisionForm,
        filterSearch,
        printTable,
        exportXLSX,
        exportCSV,
        deleteIdentifier,
    }

}

module.exports = {
    otherAll: () => other('all', 'Все', befAll),
    otherStaff: () => other('staff', 'Сотрудники', befStaff),
    otherVisitor: () => other('visitor', 'Посетители', befVisitor),
}