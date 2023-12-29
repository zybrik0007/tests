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

const befAll = () => before('Вход и открытие подраздела "Местонахождение" вкладка "Все"', async () => {
    await dec.auth(entry.customLogin, entry.customPassword);
    await dec.simple(el.section.handler, [sec.con, entry.max], el.section);
    await dec.simple(el.subsection.handler, [sub.con.location, entry.max], el.subsection);
    await dec.simple(el.tab.handler, ['Все', entry.max], el.tab);
    await dec.simple(page.whereAboutsAll.init, [entry.max], page.whereAboutsAll);
    await page.base.loading(2000);
});

const befStaff = () => before('Вход и открытие подраздела "Местонахождение" вкладка "Сотрудники"', async () => {
    await dec.auth(entry.customLogin, entry.customPassword);
    await dec.simple(el.section.handler, [sec.con, entry.max], el.section);
    await dec.simple(el.subsection.handler, [sub.con.location, entry.max], el.subsection);
    await dec.simple(el.tab.handler, ['Сотрудники', entry.max], el.tab);
    await dec.simple(page.whereAboutsStaff.init, [entry.max], page.whereAboutsStaff);
    await page.base.loading(2000);
});

const befVisitor = () => before('Вход и открытие подраздела "Местонахождение" вкладка "Посетители"', async () => {
    await dec.auth(entry.customLogin, entry.customPassword);
    await dec.simple(el.section.handler, [sec.con, entry.max], el.section);
    await dec.simple(el.subsection.handler, [sub.con.location, entry.max], el.subsection);
    await dec.simple(el.tab.handler, ['Посетители', entry.max], el.tab);
    await dec.simple(page.whereAboutsVisitor.init, [entry.max], page.whereAboutsVisitor);
    await page.base.loading(2000);
});

const aft = () => after('Выход', async () => await dec.exit());

const other = (user, tab, bef) => {

    const display = () => describe(`Котроль доступа / Местонахождение / вкладка ${tab}. Общая проверка без данных.`,
        () => {

            bef();
            aft();

            describe('Общее отображение', () => {

                decorate.el.section.active({
                    section: sec.con,
                    timeout: entry.max
                });

                decorate.el.subsection.active({
                    subsection: sub.con.location,
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
                    value: 'Местонахождение',
                    timeout: entry.max
                });

                decorate.el.header.userGetText({
                    value: entry.user,
                    timeout: entry.max
                })

            });

            describe('Отображение фильтров и кнопок', () => {

                decorate.el.butIcBefore.active({
                    icon: but.unsorted_sync_outline,
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

                it(`Отображение календаря и выбранной даты ${data.todayNow()}`,
                    async () => await dec.simpleText(el.input.getValue,
                        ['', '', entry.max],
                        data.todayNow(),
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
                        value: 'Таб. №',
                        timeout: entry.max
                    });

                    decorate.el.table.headGetText({
                        headNumber: 2,
                        value: 'ФИО',
                        timeout: entry.max
                    });

                    decorate.el.table.headGetText({
                        headNumber: 3,
                        value: 'Дата входа',
                        timeout: entry.max
                    });

                    decorate.el.table.headGetText({
                        headNumber: 4,
                        value: 'Находится в помещении',
                        timeout: entry.max
                    });

                    decorate.el.table.headGetText({
                        headNumber: 5,
                        value: 'Вход из',
                        timeout: entry.max
                    });

                    decorate.el.table.headGetText({
                        headNumber: 6,
                        value: 'Подразделение',
                        timeout: entry.max
                    });

                    decorate.el.table.headGetText({
                        headNumber: 7,
                        value: 'Должность',
                        timeout: entry.max
                    });

                    decorate.el.table.headGetText({
                        headNumber: 8,
                        value: 'Сопровождающий',
                        timeout: entry.max
                    });
                });
            }

            if(user === 'staff') {
                describe('Отображние таблицы', () => {
                    decorate.el.table.headGetText({
                        headNumber: 1,
                        value: 'Таб. №',
                        timeout: entry.max
                    });

                    decorate.el.table.headGetText({
                        headNumber: 2,
                        value: 'ФИО',
                        timeout: entry.max
                    });

                    decorate.el.table.headGetText({
                        headNumber: 3,
                        value: 'Дата входа',
                        timeout: entry.max
                    });

                    decorate.el.table.headGetText({
                        headNumber: 4,
                        value: 'Находится в помещении',
                        timeout: entry.max
                    });

                    decorate.el.table.headGetText({
                        headNumber: 5,
                        value: 'Вход из',
                        timeout: entry.max
                    });

                    decorate.el.table.headGetText({
                        headNumber: 6,
                        value: 'Подразделение',
                        timeout: entry.max
                    });

                    decorate.el.table.headGetText({
                        headNumber: 7,
                        value: 'Должность',
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
                        value: 'Дата входа',
                        timeout: entry.max
                    });

                    decorate.el.table.headGetText({
                        headNumber: 3,
                        value: 'Находится в помещении',
                        timeout: entry.max
                    });

                    decorate.el.table.headGetText({
                        headNumber: 4,
                        value: 'Вход из',
                        timeout: entry.max
                    });

                    decorate.el.table.headGetText({
                        headNumber: 5,
                        value: 'Подразделение',
                        timeout: entry.max
                    });

                    decorate.el.table.headGetText({
                        headNumber: 6,
                        value: 'Сопровождающий',
                        timeout: entry.max
                    });
                });
            }

            describe('Отображние данных в таблице', () => {
                decorate.el.table.noStr({
                    timeout: entry.max
                });

                decorate.el.rowEmpty.getText({
                    value: 'Нет данных для отображения.',
                    timeout: entry.max
                })
            });

        });

    const checkData = () => describe(`Котроль доступа / Местонахождение / вкладка ${tab}. 
    Проверка отображения данных .`, () => {

        bef();
        aft();

        if(user === 'all') {

            describe('Общие проверки', () => {
                it(`Отображение календаря и выбранной даты ${data.todayNow()}`,
                    async () => await dec.simpleText(el.input.getValue,
                        ['', '', entry.max],
                        data.todayNow(),
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
                    cellNumber: 2,
                    value: data.fio.visitor2,
                    timeout: entry.max
                });

                decorate.el.table.cellGetText({
                    headTitle: 'Дата входа',
                    strNumber: 1,
                    cellNumber: 3,
                    value: data.event.visitor2.event2.time_label.replace(/"/g, ''),
                    timeout: entry.max
                });

                decorate.el.table.cellGetText({
                    headTitle: 'Находится в помещении',
                    strNumber: 1,
                    cellNumber: 4,
                    value: data.rooms.room2,
                    timeout: entry.max
                });
            });

            describe('Проверка строки 2.', () => {
                decorate.el.table.cellGetText({
                    headTitle: 'ФИО',
                    strNumber: 2,
                    cellNumber: 2,
                    value: data.fio.visitor1,
                    timeout: entry.max
                });

                decorate.el.table.cellGetText({
                    headTitle: 'Дата входа',
                    strNumber: 2,
                    cellNumber: 3,
                    value: data.event.visitor1.event1.time_label.replace(/"/g, ''),
                    timeout: entry.max
                });

                decorate.el.table.cellGetText({
                    headTitle: 'Находится в помещении',
                    strNumber: 2,
                    cellNumber: 4,
                    value: data.rooms.room1,
                    timeout: entry.max
                });
            });

            describe('Проверка строки 3.', () => {
                decorate.el.table.cellGetText({
                    headTitle: 'ФИО',
                    strNumber: 3,
                    cellNumber: 2,
                    value: data.fio.staff2,
                    timeout: entry.max
                });

                decorate.el.table.cellGetText({
                    headTitle: 'Дата входа',
                    strNumber: 3,
                    cellNumber: 3,
                    value: data.event.staff2.event2.time_label.replace(/"/g, ''),
                    timeout: entry.max
                });

                decorate.el.table.cellGetText({
                    headTitle: 'Находится в помещении',
                    strNumber: 3,
                    cellNumber: 4,
                    value: data.rooms.room2,
                    timeout: entry.max
                });
            });

            describe('Проверка строки 4.', () => {
                decorate.el.table.cellGetText({
                    headTitle: 'ФИО',
                    strNumber: 4,
                    cellNumber: 2,
                    value: data.fio.staff1,
                    timeout: entry.max
                });

                decorate.el.table.cellGetText({
                    headTitle: 'Дата входа',
                    strNumber: 4,
                    cellNumber: 3,
                    value: data.event.staff1.event1.time_label.replace(/"/g, ''),
                    timeout: entry.max
                });

                decorate.el.table.cellGetText({
                    headTitle: 'Находится в помещении',
                    strNumber: 4,
                    cellNumber: 4,
                    value: data.rooms.room1,
                    timeout: entry.max
                });
            });
        }

        if(user === 'staff') {

            describe('Общие проверки', () => {
                it(`Отображение календаря и выбранной даты ${data.todayNow()}`,
                    async () => await dec.simpleText(el.input.getValue,
                        ['', '', entry.max],
                        data.todayNow(),
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
                    cellNumber: 2,
                    value: data.fio.staff2,
                    timeout: entry.max
                });

                decorate.el.table.cellGetText({
                    headTitle: 'Дата входа',
                    strNumber: 1,
                    cellNumber: 3,
                    value: data.event.staff2.event2.time_label.replace(/"/g, ''),
                    timeout: entry.max
                });

                decorate.el.table.cellGetText({
                    headTitle: 'Находится в помещении',
                    strNumber: 1,
                    cellNumber: 4,
                    value: data.rooms.room2,
                    timeout: entry.max
                });
            });

            describe('Проверка строки 2.', () => {
                decorate.el.table.cellGetText({
                    headTitle: 'ФИО',
                    strNumber: 2,
                    cellNumber: 2,
                    value: data.fio.staff1,
                    timeout: entry.max
                });

                decorate.el.table.cellGetText({
                    headTitle: 'Дата входа',
                    strNumber: 2,
                    cellNumber: 3,
                    value: data.event.staff1.event1.time_label.replace(/"/g, ''),
                    timeout: entry.max
                });

                decorate.el.table.cellGetText({
                    headTitle: 'Находится в помещении',
                    strNumber: 2,
                    cellNumber: 4,
                    value: data.rooms.room1,
                    timeout: entry.max
                });
            });

        }

        if(user === 'visitor') {

            describe('Общие проверки', () => {
                it(`Отображение календаря и выбранной даты ${data.todayNow()}`,
                    async () => await dec.simpleText(el.input.getValue,
                        ['', '', entry.max],
                        data.todayNow(),
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
                    value: data.fio.visitor2,
                    timeout: entry.max
                });

                decorate.el.table.cellGetText({
                    headTitle: 'Дата входа',
                    strNumber: 1,
                    cellNumber: 2,
                    value: data.event.visitor2.event2.time_label.replace(/"/g, ''),
                    timeout: entry.max
                });

                decorate.el.table.cellGetText({
                    headTitle: 'Находится в помещении',
                    strNumber: 1,
                    cellNumber: 3,
                    value: data.rooms.room2,
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
                    headTitle: 'Дата входа',
                    strNumber: 2,
                    cellNumber: 2,
                    value: data.event.visitor1.event1.time_label.replace(/"/g, ''),
                    timeout: entry.max
                });

                decorate.el.table.cellGetText({
                    headTitle: 'Находится в помещении',
                    strNumber: 2,
                    cellNumber: 3,
                    value: data.rooms.room1,
                    timeout: entry.max
                });
            });
        }
    });

    const filterDate = () => describe(`Котроль доступа / Местонахождение / вкладка ${tab}. Проверка фильтра по дате.`,
        () => {

            bef();
            aft();

            if(user === 'all') {
                describe('Количество строк до применения фильтра по дате', () => {
                    decorate.el.table.size({
                        strCount: 4,
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

            if(user === 'all' || user === 'staff') {
                describe('Выбор даты 2023-06-06', () => {

                    it(`Нажатие по фильтру выбора даты.`,
                        async () => await dec.simple(el.input.handler,
                            ['', '', entry.max],
                            el.input));

                    decorate.el.datepicker.date({
                        day: 6,
                        month: 'Июнь',
                        year: 2023,
                        timeout: entry.max
                    });
                });
            }

            if(user === 'visitor') {
                describe('Выбор даты 2023-06-07', () => {

                    it(`Нажатие по фильтру выбора даты.`,
                        async () => await dec.simple(el.input.handler,
                            ['', '', entry.max],
                            el.input));

                    decorate.el.datepicker.date({
                        day: 7,
                        month: 'Июнь',
                        year: 2023,
                        timeout: entry.max
                    });
                });
            }

            if(user === 'all' || user === 'staff') {
                describe('Количество строк после применения фильтра по дате', () => {
                    decorate.el.table.size({
                        strCount: 1,
                        timeout: entry.max
                    });
                });

                describe('Проверка строки 1.', () => {
                    decorate.el.table.cellGetText({
                        headTitle: 'ФИО',
                        strNumber: 1,
                        cellNumber: 2,
                        value: data.fio.staff2,
                        timeout: entry.max
                    });

                    decorate.el.table.cellGetText({
                        headTitle: 'Дата входа',
                        strNumber: 1,
                        cellNumber: 3,
                        value: data.event.staff2.event3.time_label.replace(/"/g, ''),
                        timeout: entry.max
                    });
                });
            }

            if(user === 'visitor') {
                describe('Количество строк после применения фильтра по дате', () => {
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
                        value: data.fio.visitor2,
                        timeout: entry.max
                    });

                    decorate.el.table.cellGetText({
                        headTitle: 'Дата входа',
                        strNumber: 1,
                        cellNumber: 2,
                        value: data.event.visitor2.event3.time_label.replace(/"/g, ''),
                        timeout: entry.max
                    });
                });
            }
        });

    const filterDivision = () => describe(`Котроль доступа / Местонахождение / вкладка ${tab}. 
    Проверка фильтра по подразделению через выбор из списка.`, () => {

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
                    cellNumber: 2,
                    value: data.fio.visitor1,
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

            describe('Проверка строки 2.', () => {
                decorate.el.table.cellGetText({
                    headTitle: 'ФИО',
                    strNumber: 2,
                    cellNumber: 2,
                    value: data.fio.staff1,
                    timeout: entry.max
                });

                decorate.el.table.cellGetText({
                    headTitle: 'Подразделение',
                    strNumber: 2,
                    cellNumber: 6,
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
                    cellNumber: 2,
                    value: data.fio.staff1,
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
                    headTitle: 'Подразделение',
                    strNumber: 1,
                    cellNumber: 5,
                    value: data.divisions.division1.name,
                    timeout: entry.max
                });
            });
        }

    });

    const filterDivisionForm = () => describe(`Котроль доступа / Местонахождение / вкладка ${tab}. 
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
                    cellNumber: 2,
                    value: data.fio.visitor1,
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

            describe('Проверка строки 2.', () => {
                decorate.el.table.cellGetText({
                    headTitle: 'ФИО',
                    strNumber: 2,
                    cellNumber: 2,
                    value: data.fio.staff1,
                    timeout: entry.max
                });

                decorate.el.table.cellGetText({
                    headTitle: 'Подразделение',
                    strNumber: 2,
                    cellNumber: 6,
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
                    cellNumber: 2,
                    value: data.fio.staff1,
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
                    headTitle: 'Подразделение',
                    strNumber: 1,
                    cellNumber: 5,
                    value: data.divisions.division1.name,
                    timeout: entry.max
                });
            });
        }

    });

    const filterSearch = () => describe(`Котроль доступа / Местонахождение / вкладка ${tab}. 
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
                    cellNumber: 2,
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

    const printTable = () => describe(`Котроль доступа /  Местонахождение / вкладка ${tab}. Проверка печати.`,() => {

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
                    head: 'Таб. №',
                    str: 1,
                    cell: 1,
                    value: '',
                    timeout: entry.max
                });
                decorate.modal.printTable.cellGetText({
                    head: 'ФИО',
                    str: 1,
                    cell: 2,
                    value: data.fio.visitor2,
                    timeout: entry.max
                });
                decorate.modal.printTable.cellGetText({
                    head: 'Дата входа',
                    str: 1,
                    cell: 3,
                    value: data.event.staff2.event2.time_label.replace(/"/g, ''),
                    timeout: entry.max
                });
                decorate.modal.printTable.cellGetText({
                    head: 'Находится в помещении',
                    str: 1,
                    cell: 4,
                    value: data.rooms.room2,
                    timeout: entry.max
                });
                decorate.modal.printTable.cellGetText({
                    head: 'Вход из',
                    str: 1,
                    cell: 5,
                    value: data.rooms.room1,
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
                    head: 'Должность',
                    str: 1,
                    cell: 7,
                    value: '',
                    timeout: entry.max
                });
                decorate.modal.printTable.cellGetText({
                    head: 'Сопровождающий',
                    str: 1,
                    cell: 8,
                    value: '',
                    timeout: entry.max
                });
            });
        }

        if(user === 'staff') {
            describe('Проверка строки 1', () => {
                decorate.modal.printTable.cellGetText({
                    head: 'Таб. №',
                    str: 1,
                    cell: 1,
                    value: data.staff.staff2.tabel_number,
                    timeout: entry.max
                });
                decorate.modal.printTable.cellGetText({
                    head: 'ФИО',
                    str: 1,
                    cell: 2,
                    value: data.fio.staff2,
                    timeout: entry.max
                });
                decorate.modal.printTable.cellGetText({
                    head: 'Дата входа',
                    str: 1,
                    cell: 3,
                    value: data.event.staff2.event2.time_label.replace(/"/g, ''),
                    timeout: entry.max
                });
                decorate.modal.printTable.cellGetText({
                    head: 'Находится в помещении',
                    str: 1,
                    cell: 4,
                    value: data.rooms.room2,
                    timeout: entry.max
                });
                decorate.modal.printTable.cellGetText({
                    head: 'Вход из',
                    str: 1,
                    cell: 5,
                    value: data.rooms.room1,
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
                    head: 'Должность',
                    str: 1,
                    cell: 7,
                    value: data.positions.position2.name,
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
                    head: 'Дата входа',
                    str: 1,
                    cell: 2,
                    value: data.event.staff2.event2.time_label.replace(/"/g, ''),
                    timeout: entry.max
                });
                decorate.modal.printTable.cellGetText({
                    head: 'Находится в помещении',
                    str: 1,
                    cell: 3,
                    value: data.rooms.room2,
                    timeout: entry.max
                });
                decorate.modal.printTable.cellGetText({
                    head: 'Вход из',
                    str: 1,
                    cell: 4,
                    value: data.rooms.room1,
                    timeout: entry.max
                });
                decorate.modal.printTable.cellGetText({
                    head: 'Подразделение',
                    str: 1,
                    cell: 5,
                    value: data.divisions.division2.name,
                    timeout: entry.max
                });
                decorate.modal.printTable.cellGetText({
                    head: 'Сопровождающий',
                    str: 1,
                    cell: 6,
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

    const exportXLSX = () => describe(`Котроль доступа /  Местонахождение / вкладка ${tab}. Экспорт XLSX.`, () => {

        const params = {
            nameFile: 'whereaboutsreport.xlsx',
            jsonAll: [
                { 'Отчет "Местонахождение (Персонал)"': `${el.input.getValue('', '', entry.max).text}` },
                {
                    'Отчет "Местонахождение (Персонал)"': 'Таб №',
                    __EMPTY: 'Фамилия',
                    __EMPTY_1: 'Имя',
                    __EMPTY_2: 'Отчество',
                    __EMPTY_3: 'Дата входа',
                    __EMPTY_4: 'Находится в помещении',
                    __EMPTY_5: 'Вход из',
                    __EMPTY_6: 'Подразделение',
                    __EMPTY_7: 'Должность',
                    __EMPTY_8: 'Сопровождающий'
                },
                {
                    'Отчет "Местонахождение (Персонал)"': '',
                    __EMPTY: 'visitor',
                    __EMPTY_1: 'name',
                    __EMPTY_2: '2',
                    __EMPTY_3: `${data.eventDate.event1}`,
                    __EMPTY_4: 'room2',
                    __EMPTY_5: 'room1',
                    __EMPTY_6: 'division2',
                    __EMPTY_7: '',
                    __EMPTY_8: ''
                },
                {
                    'Отчет "Местонахождение (Персонал)"': '',
                    __EMPTY: 'visitor',
                    __EMPTY_1: 'name',
                    __EMPTY_2: '1',
                    __EMPTY_3: `${data.eventDate.event3}`,
                    __EMPTY_4: 'room1',
                    __EMPTY_5: 'Неконтролируемая территория',
                    __EMPTY_6: 'division1',
                    __EMPTY_7: '',
                    __EMPTY_8: ''
                },
                {
                    'Отчет "Местонахождение (Персонал)"': '2',
                    __EMPTY: 'staff',
                    __EMPTY_1: 'name',
                    __EMPTY_2: '2',
                    __EMPTY_3: `${data.eventDate.event1}`,
                    __EMPTY_4: 'room2',
                    __EMPTY_5: 'room1',
                    __EMPTY_6: 'division2',
                    __EMPTY_7: 'position2',
                    __EMPTY_8: ''
                },
                {
                    'Отчет "Местонахождение (Персонал)"': '1',
                    __EMPTY: 'staff',
                    __EMPTY_1: 'name',
                    __EMPTY_2: '1',
                    __EMPTY_3: `${data.eventDate.event3}`,
                    __EMPTY_4: 'room1',
                    __EMPTY_5: 'Неконтролируемая территория',
                    __EMPTY_6: 'division1',
                    __EMPTY_7: 'position1',
                    __EMPTY_8: ''
                }
            ],
            jsonStaff: [
                { 'Отчет "Местонахождение (Персонал)"': `${data.todayNow()}` },
                {
                    'Отчет "Местонахождение (Персонал)"': 'Таб №',
                    __EMPTY: 'Фамилия',
                    __EMPTY_1: 'Имя',
                    __EMPTY_2: 'Отчество',
                    __EMPTY_3: 'Дата входа',
                    __EMPTY_4: 'Находится в помещении',
                    __EMPTY_5: 'Вход из',
                    __EMPTY_6: 'Подразделение',
                    __EMPTY_7: 'Должность'
                },
                {
                    'Отчет "Местонахождение (Персонал)"': '2',
                    __EMPTY: 'staff',
                    __EMPTY_1: 'name',
                    __EMPTY_2: '2',
                    __EMPTY_3: `${data.eventDate.event1}`,
                    __EMPTY_4: 'room2',
                    __EMPTY_5: 'room1',
                    __EMPTY_6: 'division2',
                    __EMPTY_7: 'position2'
                },
                {
                    'Отчет "Местонахождение (Персонал)"': '1',
                    __EMPTY: 'staff',
                    __EMPTY_1: 'name',
                    __EMPTY_2: '1',
                    __EMPTY_3: `${data.eventDate.event3}`,
                    __EMPTY_4: 'room1',
                    __EMPTY_5: 'Неконтролируемая территория',
                    __EMPTY_6: 'division1',
                    __EMPTY_7: 'position1'
                }
            ],
            jsonVisitor: [
                { 'Отчет "Местонахождение (Персонал)"': `${data.todayNow()}` },
                {
                    'Отчет "Местонахождение (Персонал)"': 'Фамилия',
                    __EMPTY: 'Имя',
                    __EMPTY_1: 'Отчество',
                    __EMPTY_2: 'Дата входа',
                    __EMPTY_3: 'Находится в помещении',
                    __EMPTY_4: 'Вход из',
                    __EMPTY_5: 'Подразделение',
                    __EMPTY_6: 'Сопровождающий'
                },
                {
                    'Отчет "Местонахождение (Персонал)"': 'visitor',
                    __EMPTY: 'name',
                    __EMPTY_1: '2',
                    __EMPTY_2: `${data.eventDate.event1}`,
                    __EMPTY_3: 'room2',
                    __EMPTY_4: 'room1',
                    __EMPTY_5: 'division2',
                    __EMPTY_6: ''
                },
                {
                    'Отчет "Местонахождение (Персонал)"': 'visitor',
                    __EMPTY: 'name',
                    __EMPTY_1: '1',
                    __EMPTY_2: `${data.eventDate.event3}`,
                    __EMPTY_3: 'room1',
                    __EMPTY_4: 'Неконтролируемая территория',
                    __EMPTY_5: 'division1',
                    __EMPTY_6: ''
                }
            ],
        }

        bef();
        aft();

        describe('Экспорт', () => {

            it('Добавление даты из фильтра по дате в исходный JSON файл', async () => {
                const date = await el.input.getValue('', '', entry.max);
                params.jsonAll[0]['Отчет "Местонахождение (Персонал)"'] = date.text;
                params.jsonStaff[0]['Отчет "Местонахождение (Персонал)"'] = date.text;
                params.jsonVisitor[0]['Отчет "Местонахождение (Персонал)"'] = date.text;
            });

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

    const exportCSV = () => describe(`Котроль доступа /  Местонахождение / вкладка ${tab}. Экспорт CSV.`, () => {

        const params = {
            nameFile: 'whereaboutsreport.csv',
            jsonAll: [
                {
                    'Фамилия': 'visitor',
                    'Имя': 'name',
                    'Отчество': 2,
                    'Дата входа': data.eventDate.event1,
                    'Находится в помещении': 'room2',
                    'Вход из': 'room1',
                    'Подразделение': 'division2'
                },
                {
                    'Фамилия': 'visitor',
                    'Имя': 'name',
                    'Отчество': 1,
                    'Дата входа': data.eventDate.event3,
                    'Находится в помещении': 'room1',
                    'Вход из': 'Неконтролируемая территория',
                    'Подразделение': 'division1'
                },
                {
                    'Таб №': 2,
                    'Фамилия': 'staff',
                    'Имя': 'name',
                    'Отчество': 2,
                    'Дата входа': data.eventDate.event1,
                    'Находится в помещении': 'room2',
                    'Вход из': 'room1',
                    'Подразделение': 'division2',
                    'Должность': 'position2'
                },
                {
                    'Таб №': 1,
                    'Фамилия': 'staff',
                    'Имя': 'name',
                    'Отчество': 1,
                    'Дата входа': data.eventDate.event3,
                    'Находится в помещении': 'room1',
                    'Вход из': 'Неконтролируемая территория',
                    'Подразделение': 'division1',
                    'Должность': 'position1'
                }
            ],
            jsonStaff: [
                {
                    'Таб №': 2,
                    'Фамилия': 'staff',
                    'Имя': 'name',
                    'Отчество': 2,
                    'Дата входа': data.eventDate.event1,
                    'Находится в помещении': 'room2',
                    'Вход из': 'room1',
                    'Подразделение': 'division2',
                    'Должность': 'position2'
                },
                {
                    'Таб №': 1,
                    'Фамилия': 'staff',
                    'Имя': 'name',
                    'Отчество': 1,
                    'Дата входа': data.eventDate.event3,
                    'Находится в помещении': 'room1',
                    'Вход из': 'Неконтролируемая территория',
                    'Подразделение': 'division1',
                    'Должность': 'position1'
                }
            ],
            jsonVisitor: [
                {
                    'Фамилия': 'visitor',
                    'Имя': 'name',
                    'Отчество': 2,
                    'Дата входа': data.eventDate.event1,
                    'Находится в помещении': 'room2',
                    'Вход из': 'room1',
                    'Подразделение': 'division2'
                },
                {
                    'Фамилия': 'visitor',
                    'Имя': 'name',
                    'Отчество': 1,
                    'Дата входа': data.eventDate.event3,
                    'Находится в помещении': 'room1',
                    'Вход из': 'Неконтролируемая территория',
                    'Подразделение': 'division1'
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

    const updateData = () => describe('Котроль доступа / Местонахождение. Проверка кнопки Обновить данные', () => {

        bef();
        aft();

        if(user === 'all') {
            describe('Отображение данных до нажатия кнопки Обновить данные', () => {

                decorate.el.table.size({
                    strCount: 4,
                    timeout: entry.max
                });

                decorate.el.input.sendKeys({
                    title: '',
                    placeholder: 'Поиск...',
                    value: data.fio.staff3,
                    timeout: entry.max
                });

                decorate.el.table.noStr({
                    timeout: entry.max
                });

                decorate.el.rowEmpty.getText({
                    value: 'Нет данных для отображения.',
                    timeout: entry.max
                });

                decorate.el.input.backSpace({
                    title: '',
                    placeholder: 'Поиск...',
                    timeout: entry.max
                });

                decorate.el.table.size({
                    strCount: 4,
                    timeout: entry.max
                });
            });

            describe(`Добавление события для сотрудника ${data.fio.staff3}`, () => {
                it('Добавление события.', async () => {
                    const cook = await page.base.getCookie('token');
                    const arrStaff = await api.getStaff(cook.text);
                    const staff3 = arrStaff.text.filter(obj => obj.name === data.fio.staff3)[0].id;

                    const arrDevice = await api.getDevice(cook.text);
                    const device1 = arrDevice.text.filter(obj => obj.ip_addr === data.devices.device1.ip)[0].id;

                    const arrRooms = await api.getRoom(cook.text);
                    const room0 = arrRooms.text.filter(obj => obj.name === 'Неконтролируемая территория')[0].id;
                    const room1 = arrRooms.text.filter(obj => obj.name === data.rooms.room1)[0].id;

                    //События сотрудника 1
                    await dec.simple(db.addEvent,
                        [{
                            ...data.event.staff3.event1,
                            user_id: staff3,
                            device_id: device1,
                            access_zone_id1: room1,
                            access_zone_id2: room0,
                            event_type: 17
                        }],
                        db.addEvent);

                });
            });

            describe('Нажатие кнопки Обновить данные', () => {
                decorate.el.butIcBefore.handler({
                    icon: but.unsorted_sync_outline,
                    timeout: entry.max
                });
            });

            describe('Отображение данных после нажатия кнопки Обновить данные', () => {

                decorate.el.table.size({
                    strCount: 5,
                    timeout: entry.max
                });

                decorate.el.input.sendKeys({
                    title: '',
                    placeholder: 'Поиск...',
                    value: data.fio.staff3,
                    timeout: entry.max
                });

                decorate.el.table.size({
                    strCount: 1,
                    timeout: entry.max
                });

                decorate.el.table.cellGetText({
                    headTitle: 'ФИО',
                    strNumber: 1,
                    cellNumber: 2,
                    value: data.fio.staff3,
                    timeout: entry.max
                });

                decorate.el.input.backSpace({
                    title: '',
                    placeholder: 'Поиск...',
                    timeout: entry.max
                });

                decorate.el.table.size({
                    strCount: 5,
                    timeout: entry.max
                });
            });

            describe(`Удаление события у сотруднкиа ${data.fio.staff3}.`, () => {
                it('Удаление события', async () => {
                    const cook = await page.base.getCookie('token');
                    const arrStaff = await api.getStaff(cook.text);
                    const staff3 = arrStaff.text.filter(obj => obj.name === data.fio.staff3)[0].id;

                    await dec.simple(db.deleteEventFioId,
                        [staff3],
                        db.deleteEventFioId);
                });
            });
        }

        if(user === 'staff') {
            describe('Отображение данных до нажатия кнопки Обновить данные', () => {

                decorate.el.table.size({
                    strCount: 2,
                    timeout: entry.max
                });

                decorate.el.input.sendKeys({
                    title: '',
                    placeholder: 'Поиск...',
                    value: data.fio.staff3,
                    timeout: entry.max
                });

                decorate.el.table.noStr({
                    timeout: entry.max
                });

                decorate.el.rowEmpty.getText({
                    value: 'Нет данных для отображения.',
                    timeout: entry.max
                });

                decorate.el.input.backSpace({
                    title: '',
                    placeholder: 'Поиск...',
                    timeout: entry.max
                });

                decorate.el.table.size({
                    strCount: 2,
                    timeout: entry.max
                });
            });

            describe(`Добавление события для сотрудника ${data.fio.staff3}`, () => {
                it('Добавление события.', async () => {
                    const cook = await page.base.getCookie('token');
                    const arrStaff = await api.getStaff(cook.text);
                    const staff3 = arrStaff.text.filter(obj => obj.name === data.fio.staff3)[0].id;

                    const arrDevice = await api.getDevice(cook.text);
                    const device1 = arrDevice.text.filter(obj => obj.ip_addr === data.devices.device1.ip)[0].id;

                    const arrRooms = await api.getRoom(cook.text);
                    const room0 = arrRooms.text.filter(obj => obj.name === 'Неконтролируемая территория')[0].id;
                    const room1 = arrRooms.text.filter(obj => obj.name === data.rooms.room1)[0].id;

                    //События сотрудника 1
                    await dec.simple(db.addEvent,
                        [{
                            ...data.event.staff3.event1,
                            user_id: staff3,
                            device_id: device1,
                            access_zone_id1: room1,
                            access_zone_id2: room0,
                            event_type: 17
                        }],
                        db.addEvent);

                });
            });

            describe('Нажатие кнопки Обновить данные', () => {
                decorate.el.butIcBefore.handler({
                    icon: but.unsorted_sync_outline,
                    timeout: entry.max
                });
            });

            describe('Отображение данных после нажатия кнопки Обновить данные', () => {

                decorate.el.table.size({
                    strCount: 3,
                    timeout: entry.max
                });

                decorate.el.input.sendKeys({
                    title: '',
                    placeholder: 'Поиск...',
                    value: data.fio.staff3,
                    timeout: entry.max
                });

                decorate.el.table.size({
                    strCount: 1,
                    timeout: entry.max
                });

                decorate.el.table.cellGetText({
                    headTitle: 'ФИО',
                    strNumber: 1,
                    cellNumber: 2,
                    value: data.fio.staff3,
                    timeout: entry.max
                });

                decorate.el.input.backSpace({
                    title: '',
                    placeholder: 'Поиск...',
                    timeout: entry.max
                });

                decorate.el.table.size({
                    strCount: 3,
                    timeout: entry.max
                });
            });

            describe(`Удаление события у сотруднкиа ${data.fio.staff3}.`, () => {
                it('Удаление события', async () => {
                    const cook = await page.base.getCookie('token');
                    const arrStaff = await api.getStaff(cook.text);
                    const staff3 = arrStaff.text.filter(obj => obj.name === data.fio.staff3)[0].id;

                    await dec.simple(db.deleteEventFioId,
                        [staff3],
                        db.deleteEventFioId);
                });
            });
        }

        if(user === 'visitor') {
            describe('Отображение данных до нажатия кнопки Обновить данные', () => {

                decorate.el.table.size({
                    strCount: 2,
                    timeout: entry.max
                });

                decorate.el.input.sendKeys({
                    title: '',
                    placeholder: 'Поиск...',
                    value: data.fio.visitor3,
                    timeout: entry.max
                });

                decorate.el.table.noStr({
                    timeout: entry.max
                });

                decorate.el.rowEmpty.getText({
                    value: 'Нет данных для отображения.',
                    timeout: entry.max
                });

                decorate.el.input.backSpace({
                    title: '',
                    placeholder: 'Поиск...',
                    timeout: entry.max
                });

                decorate.el.table.size({
                    strCount: 2,
                    timeout: entry.max
                });
            });

            describe(`Добавление события для сотрудника ${data.fio.visitor3}`, () => {
                it('Добавление события.', async () => {
                    const cook = await page.base.getCookie('token');
                    const arrVisitor = await api.getVisitor(cook.text);
                    const visitor3 = arrVisitor.text.filter(obj => obj.name === data.fio.visitor3)[0].id;

                    const arrDevice = await api.getDevice(cook.text);
                    const device1 = arrDevice.text.filter(obj => obj.ip_addr === data.devices.device1.ip)[0].id;

                    const arrRooms = await api.getRoom(cook.text);
                    const room0 = arrRooms.text.filter(obj => obj.name === 'Неконтролируемая территория')[0].id;
                    const room1 = arrRooms.text.filter(obj => obj.name === data.rooms.room1)[0].id;

                    //События посетителя 1
                    await dec.simple(db.addEvent,
                        [{
                            ...data.event.visitor3.event1,
                            user_id: visitor3,
                            device_id: device1,
                            access_zone_id1: room1,
                            access_zone_id2: room0,
                            event_type: 17
                        }],
                        db.addEvent);

                });
            });

            describe('Нажатие кнопки Обновить данные', () => {
                decorate.el.butIcBefore.handler({
                    icon: but.unsorted_sync_outline,
                    timeout: entry.max
                });
            });

            describe('Отображение данных после нажатия кнопки Обновить данные', () => {

                decorate.el.table.size({
                    strCount: 3,
                    timeout: entry.max
                });

                decorate.el.input.sendKeys({
                    title: '',
                    placeholder: 'Поиск...',
                    value: data.fio.visitor3,
                    timeout: entry.max
                });

                decorate.el.table.size({
                    strCount: 1,
                    timeout: entry.max
                });

                decorate.el.table.cellGetText({
                    headTitle: 'ФИО',
                    strNumber: 1,
                    cellNumber: 1,
                    value: data.fio.visitor3,
                    timeout: entry.max
                });

                decorate.el.input.backSpace({
                    title: '',
                    placeholder: 'Поиск...',
                    timeout: entry.max
                });

                decorate.el.table.size({
                    strCount: 3,
                    timeout: entry.max
                });
            });

            describe(`Удаление события у посетителя ${data.fio.visitor3}.`, () => {
                it('Удаление события', async () => {
                    const cook = await page.base.getCookie('token');
                    const arrStaff = await api.getVisitor(cook.text);
                    const staff3 = arrStaff.text.filter(obj => obj.name === data.fio.visitor3)[0].id;

                    await dec.simple(db.deleteEventFioId,
                        [staff3],
                        db.deleteEventFioId);
                });
            });
        }

    });

    return  {
        checkData,
        display,
        filterDate,
        filterDivision,
        filterDivisionForm,
        filterSearch,
        printTable,
        exportXLSX,
        exportCSV,
        updateData
    }

}

module.exports = {
    otherAll: () => other('all', 'Все', befAll),
    otherStaff: () => other('staff', 'Сотрудники', befStaff),
    otherVisitor: () => other('visitor', 'Посетители', befVisitor),
}