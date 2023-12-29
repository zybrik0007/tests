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

const befAll = () => before('Вход и открытие подраздела "Отчет о проходах" вкладка "Все"', async () => {
    await dec.auth(entry.customLogin, entry.customPassword);
    await dec.simple(el.section.handler, [sec.con, entry.max], el.section);
    await dec.simple(el.subsection.handler, [sub.con.premises, entry.max], el.subsection);
    await dec.simple(el.tab.handler, ['Все', entry.max], el.tab);
    await dec.simple(page.premiseAccessAll.init, [entry.max], page.premiseAccessAll);
    await page.base.loading(2000);
});

const befStaff = () => before('Вход и открытие подраздела "Отчет о проходах" вкладка "Сотрудники"', async () => {
    await dec.auth(entry.customLogin, entry.customPassword);
    await dec.simple(el.section.handler, [sec.con, entry.max], el.section);
    await dec.simple(el.subsection.handler, [sub.con.premises, entry.max], el.subsection);
    await dec.simple(el.tab.handler, ['Сотрудники', entry.max], el.tab);
    await dec.simple(page.premiseAccessStaff.init, [entry.max], page.premiseAccessStaff);
    await page.base.loading(2000);
});

const befVisitor = () => before('Вход и открытие подраздела "Отчет о проходах" вкладка "Посетители"', async () => {
    await dec.auth(entry.customLogin, entry.customPassword);
    await dec.simple(el.section.handler, [sec.con, entry.max], el.section);
    await dec.simple(el.subsection.handler, [sub.con.premises, entry.max], el.subsection);
    await dec.simple(el.tab.handler, ['Посетители', entry.max], el.tab);
    await dec.simple(page.premiseAccessVisitor.init, [entry.max], page.premiseAccessVisitor);
    await page.base.loading(2000);
});

const aft = () => after('Выход', async () => await dec.exit());

const other = (user, tab, bef) => {

    const display = () => describe(`Котроль доступа / Отчет о проходах / вкладка ${tab}. Общая проверка без данных.`,
        () => {

        bef();
        aft();

        describe('Общее отображение', () => {

            decorate.el.section.active({
                section: sec.con,
                timeout: entry.max
            });

            decorate.el.subsection.active({
                subsection: sub.con.premises,
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
                value: 'Отчет о проходах',
                timeout: entry.max
            });

            decorate.el.header.userGetText({
                value: entry.user,
                timeout: entry.max
            })

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

            it(`Отображение календаря и выбранной даты ${data.date()}`,
                async () => await dec.simpleText(el.input.getValue,
                    ['', '', entry.max],
                    data.date(),
                    el.input));

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
                    value: 'Табельный номер',
                    timeout: entry.max
                });

                decorate.el.table.headGetText({
                    headNumber: 3,
                    value: 'Дата',
                    timeout: entry.max
                });

                decorate.el.table.headGetText({
                    headNumber: 4,
                    value: 'Выход из',
                    timeout: entry.max
                });

                decorate.el.table.headGetText({
                    headNumber: 5,
                    value: 'Вход в',
                    timeout: entry.max
                });

                decorate.el.table.headGetText({
                    headNumber: 6,
                    value: 'Идентификатор',
                    timeout: entry.max
                });

                decorate.el.table.headGetText({
                    headNumber: 7,
                    value: 'Шаблон доступа',
                    timeout: entry.max
                });

                decorate.el.table.headGetText({
                    headNumber: 8,
                    value: 'Должность',
                    timeout: entry.max
                });

                decorate.el.table.headGetText({
                    headNumber: 9,
                    value: 'Подразделение',
                    timeout: entry.max
                });

                decorate.el.table.headGetText({
                    headNumber: 10,
                    value: 'Подтверждающий документ',
                    timeout: entry.max
                });

                decorate.el.table.headGetText({
                    headNumber: 11,
                    value: 'Номер документа',
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
                    value: 'Табельный номер',
                    timeout: entry.max
                });

                decorate.el.table.headGetText({
                    headNumber: 3,
                    value: 'Дата',
                    timeout: entry.max
                });

                decorate.el.table.headGetText({
                    headNumber: 4,
                    value: 'Выход из',
                    timeout: entry.max
                });

                decorate.el.table.headGetText({
                    headNumber: 5,
                    value: 'Вход в',
                    timeout: entry.max
                });

                decorate.el.table.headGetText({
                    headNumber: 6,
                    value: 'Идентификатор',
                    timeout: entry.max
                });

                decorate.el.table.headGetText({
                    headNumber: 7,
                    value: 'Шаблон доступа',
                    timeout: entry.max
                });

                decorate.el.table.headGetText({
                    headNumber: 8,
                    value: 'Должность',
                    timeout: entry.max
                });

                decorate.el.table.headGetText({
                    headNumber: 9,
                    value: 'Подразделение',
                    timeout: entry.max
                });

                decorate.el.table.headGetText({
                    headNumber: 10,
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
                    value: 'Дата',
                    timeout: entry.max
                });

                decorate.el.table.headGetText({
                    headNumber: 3,
                    value: 'Выход из',
                    timeout: entry.max
                });

                decorate.el.table.headGetText({
                    headNumber: 4,
                    value: 'Вход в',
                    timeout: entry.max
                });

                decorate.el.table.headGetText({
                    headNumber: 5,
                    value: 'Идентификатор',
                    timeout: entry.max
                });

                decorate.el.table.headGetText({
                    headNumber: 6,
                    value: 'Шаблон доступа',
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
                    value: 'Сопровождающий',
                    timeout: entry.max
                });

                decorate.el.table.headGetText({
                    headNumber: 11,
                    value: 'Транспортное средство',
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

    const checkData = () => describe(`Котроль доступа / Отчет о проходах / вкладка ${tab}. 
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
                   strCount: 6,
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
                   headTitle: 'Дата',
                   strNumber: 1,
                   cellNumber: 3,
                   value: data.event.staff2.event2.time_label.replace(/"/g, ''),
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
                   headTitle: 'Дата',
                   strNumber: 2,
                   cellNumber: 3,
                   value: data.event.visitor2.event2.time_label.replace(/"/g, ''),
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
                   headTitle: 'Дата',
                   strNumber: 3,
                   cellNumber: 3,
                   value: data.event.staff2.event1.time_label.replace(/"/g, ''),
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
                   headTitle: 'Дата',
                   strNumber: 4,
                   cellNumber: 3,
                   value: data.event.visitor2.event1.time_label.replace(/"/g, ''),
                   timeout: entry.max
               });
           });

           describe('Проверка строки 5.', () => {
               decorate.el.table.cellGetText({
                   headTitle: 'ФИО',
                   strNumber: 5,
                   cellNumber: 1,
                   value: data.fio.staff1,
                   timeout: entry.max
               });

               decorate.el.table.cellGetText({
                   headTitle: 'Дата',
                   strNumber: 5,
                   cellNumber: 3,
                   value: data.event.staff1.event1.time_label.replace(/"/g, ''),
                   timeout: entry.max
               });
           });

           describe('Проверка строки 6.', () => {
               decorate.el.table.cellGetText({
                   headTitle: 'ФИО',
                   strNumber: 6,
                   cellNumber: 1,
                   value: data.fio.visitor1,
                   timeout: entry.max
               });

               decorate.el.table.cellGetText({
                   headTitle: 'Дата',
                   strNumber: 6,
                   cellNumber: 3,
                   value: data.event.visitor1.event1.time_label.replace(/"/g, ''),
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
                    strCount: 3,
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
                    headTitle: 'Дата',
                    strNumber: 1,
                    cellNumber: 3,
                    value: data.event.staff2.event2.time_label.replace(/"/g, ''),
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
                    headTitle: 'Дата',
                    strNumber: 2,
                    cellNumber: 3,
                    value: data.event.staff2.event1.time_label.replace(/"/g, ''),
                    timeout: entry.max
                });
            });

            describe('Проверка строки 3.', () => {
                decorate.el.table.cellGetText({
                    headTitle: 'ФИО',
                    strNumber: 3,
                    cellNumber: 1,
                    value: data.fio.staff1,
                    timeout: entry.max
                });

                decorate.el.table.cellGetText({
                    headTitle: 'Дата',
                    strNumber: 3,
                    cellNumber: 3,
                    value: data.event.staff1.event1.time_label.replace(/"/g, ''),
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
                    strCount: 3,
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
                    headTitle: 'Дата',
                    strNumber: 1,
                    cellNumber: 2,
                    value: data.event.visitor2.event2.time_label.replace(/"/g, ''),
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
                    headTitle: 'Дата',
                    strNumber: 2,
                    cellNumber: 2,
                    value: data.event.visitor2.event1.time_label.replace(/"/g, ''),
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
                    headTitle: 'Дата',
                    strNumber: 3,
                    cellNumber: 2,
                    value: data.event.visitor1.event1.time_label.replace(/"/g, ''),
                    timeout: entry.max
                });
            });
        }

    });

    const filterDate = () => describe(`Котроль доступа / Отчет о проходах / вкладка ${tab}. Проверка фильтра по дате.`,
        () => {

        bef();
        aft();

        if(user === 'all') {
            describe('Количество строк до применения фильтра по дате', () => {
                decorate.el.table.size({
                    strCount: 6,
                    timeout: entry.max
                });
            });
        }

        if(user === 'staff' || user === 'visitor') {
            describe('Количество строк до применения фильтра по дате', () => {
                decorate.el.table.size({
                    strCount: 3,
                    timeout: entry.max
                });
            });
        }

        describe('Выбор промежутка времени 2023-06-06 - 2023-06-07', () => {

            it(`Нажатие по фильтру выбора даты.`,
                async () => await dec.simple(el.input.handler,
                    ['', '', entry.max],
                    el.input));

            decorate.el.datepicker.dateRange({
                objStart: {
                    day: 6,
                    month: 'Июнь',
                    year: 2023
                },
                objEnd: {
                    day: 7,
                    month: 'Июнь',
                    year: 2023
                },
                timeout: entry.max
            });

            it(`Нажатие по фильтру выбора даты.`,
                async () => await dec.simple(el.input.handler,
                    ['', '', entry.max],
                    el.input));

            decorate.el.datepicker.dateRange({
                objStart: {
                    day: 6,
                    month: 'Июнь',
                    year: 2023
                },
                objEnd: {
                    day: 7,
                    month: 'Июнь',
                    year: 2023
                },
                timeout: entry.max
            });

            it(`Отображение в календаре и выбранной даты 2023-06-06 – 2023-06-07`,
                async () => await dec.simpleText(el.input.getValue,
                    ['', '', entry.max],
                    '2023-06-06 – 2023-06-07',
                    el.input));
        });

        if(user === 'all') {
            describe('Количество строк после применения фильтра по дате', () => {
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
                    headTitle: 'Дата',
                    strNumber: 1,
                    cellNumber: 3,
                    value: data.event.visitor2.event3.time_label.replace(/"/g, ''),
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
                    headTitle: 'Дата',
                    strNumber: 2,
                    cellNumber: 3,
                    value: data.event.staff2.event3.time_label.replace(/"/g, ''),
                    timeout: entry.max
                });
            });
        }

        if(user === 'staff') {
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
                    value: data.fio.staff2,
                    timeout: entry.max
                });

                decorate.el.table.cellGetText({
                    headTitle: 'Дата',
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
                    headTitle: 'Дата',
                    strNumber: 1,
                    cellNumber: 2,
                    value: data.event.visitor2.event3.time_label.replace(/"/g, ''),
                    timeout: entry.max
                });
            });
        }
    });

    const filterRoom = () => describe(`Котроль доступа / Отчет о проходах / вкладка ${tab}. 
    Проверка фильтра по помещению.`, () => {

        bef();
        aft();

        if(user === 'all') {
            describe('Количество строк до применения фильтра попомещению', () => {
                decorate.el.table.size({
                    strCount: 6,
                    timeout: entry.max
                });
            });
        }

        if(user === 'staff' || user === 'visitor') {
            describe('Количество строк до применения фильтра по ппомещению', () => {
                decorate.el.table.size({
                    strCount: 3,
                    timeout: entry.max
                });
            });
        }

        describe(`Выбор в фильтре по помещению ${data.rooms.room2}.`, () => {
            decorate.el.selectInput.iconXpand({
                title: '',
                placeholder: 'Помещение',
                timeout: entry.max
            });

            decorate.el.selectXpand.xpand({
                timeout: entry.max
            });

            decorate.el.selectXpand.handler({
                value: data.rooms.room2,
                timeout: entry.max
            });

            decorate.el.selectXpand.xpandNoElement({
                timeout: entry.max
            });

            decorate.el.input.getValue({
                title: '',
                placeholder: 'Помещение',
                value: data.rooms.room2,
                timeout: entry.max
            });
        });

        if(user === 'all') {
            describe('Количество строк после применения фильтра по помещению', () => {
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
                    headTitle: 'Вход в',
                    strNumber: 1,
                    cellNumber: 5,
                    value: data.rooms.room2,
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
                    headTitle: 'Вход в',
                    strNumber: 2,
                    cellNumber: 5,
                    value: data.rooms.room2,
                    timeout: entry.max
                });
            });
        }

        if(user === 'staff') {
            describe('Количество строк после применения фильтра по помещению', () => {
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
                    value: data.fio.staff2,
                    timeout: entry.max
                });

                decorate.el.table.cellGetText({
                    headTitle:  'Вход в',
                    strNumber: 1,
                    cellNumber: 5,
                    value: data.rooms.room2,
                    timeout: entry.max
                });
            });
        }

        if(user === 'visitor') {
            describe('Количество строк после применения фильтра по помещению', () => {
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
                    headTitle: 'Вход в',
                    strNumber: 1,
                    cellNumber: 4,
                    value: data.rooms.room2,
                    timeout: entry.max
                });
            });
        }
    });

    const filterRoomForm = () => describe(`Котроль доступа / Отчет о проходах / вкладка ${tab}. 
    Проверка фильтра по помещению через модальное окно "Помещения"..`, () => {

        bef();
        aft();

        if(user === 'all') {
            describe('Количество строк до применения фильтра попомещению', () => {
                decorate.el.table.size({
                    strCount: 6,
                    timeout: entry.max
                });
            });
        }

        if(user === 'staff' || user === 'visitor') {
            describe('Количество строк до применения фильтра по ппомещению', () => {
                decorate.el.table.size({
                    strCount: 3,
                    timeout: entry.max
                });
            });
        }

        describe(`Выбор в фильтре по помещению ${data.rooms.room2}.`, () => {
            decorate.el.selectInput.iconOutline({
                title: '',
                placeholder: 'Помещение',
                timeout: entry.max
            });

            decorate.modal.roomFilter.init({
                timeout: entry.max
            });

            decorate.el.filterTreeNode.handler({
                name: data.rooms.room2,
                timeout: entry.max
            });

            decorate.el.button.handler({
                name: 'Выбрать',
                timeout: entry.max
            });

            decorate.modal.roomFilter.initClose({
                timeout: entry.max
            });
        });

        if(user === 'all') {
            describe('Количество строк после применения фильтра по помещению', () => {
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
                    headTitle: 'Вход в',
                    strNumber: 1,
                    cellNumber: 5,
                    value: data.rooms.room2,
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
                    headTitle: 'Вход в',
                    strNumber: 2,
                    cellNumber: 5,
                    value: data.rooms.room2,
                    timeout: entry.max
                });
            });
        }

        if(user === 'staff') {
            describe('Количество строк после применения фильтра по помещению', () => {
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
                    value: data.fio.staff2,
                    timeout: entry.max
                });

                decorate.el.table.cellGetText({
                    headTitle:  'Вход в',
                    strNumber: 1,
                    cellNumber: 5,
                    value: data.rooms.room2,
                    timeout: entry.max
                });
            });
        }

        if(user === 'visitor') {
            describe('Количество строк после применения фильтра по помещению', () => {
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
                    headTitle: 'Вход в',
                    strNumber: 1,
                    cellNumber: 4,
                    value: data.rooms.room2,
                    timeout: entry.max
                });
            });
        }
    });

    const filterDivision = () => describe(`Котроль доступа / Отчет о проходах / вкладка ${tab}. 
    Проверка фильтра по подразделению через выбор из списка.`, () => {

        bef();
        aft();

        if(user === 'all') {
            describe('Количество строк до применения фильтра по подразделению', () => {
                decorate.el.table.size({
                    strCount: 6,
                    timeout: entry.max
                });
            });
        }

        if(user === 'staff' || user === 'visitor') {
            describe('Количество строк до применения фильтра по подразделению', () => {
                decorate.el.table.size({
                    strCount: 3,
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
                    headTitle: 'Подразделение',
                    strNumber: 1,
                    cellNumber: 9,
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
                    headTitle: 'Подразделение',
                    strNumber: 2,
                    cellNumber: 9,
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
                    headTitle: 'Подразделение',
                    strNumber: 1,
                    cellNumber: 9,
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
                    cellNumber: 7,
                    value: data.divisions.division1.name,
                    timeout: entry.max
                });
            });
        }


    });

    const filterDivisionForm = () => describe(`Котроль доступа / Отчет о проходах / вкладка ${tab}. 
    Проверка фильтра по подразделению через модальное окно "Подразделение".`, () => {

        bef();
        aft();

        if(user === 'all') {
            describe('Количество строк до применения фильтра по подразделению', () => {
                decorate.el.table.size({
                    strCount: 6,
                    timeout: entry.max
                });
            });
        }

        if(user === 'staff' || user === 'visitor') {
            describe('Количество строк до применения фильтра по подразделению', () => {
                decorate.el.table.size({
                    strCount: 3,
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
                    headTitle: 'Подразделение',
                    strNumber: 1,
                    cellNumber: 9,
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
                    headTitle: 'Подразделение',
                    strNumber: 2,
                    cellNumber: 9,
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
                    headTitle: 'Подразделение',
                    strNumber: 1,
                    cellNumber: 9,
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
                    cellNumber: 7,
                    value: data.divisions.division1.name,
                    timeout: entry.max
                });
            });
        }

    });

    const filterSearch = () => describe(`Котроль доступа / Отчет о проходах / вкладка ${tab}. 
    Проверка фильтра по поиску.`, () => {

        bef();
        aft();

        if(user === 'all') {
            describe('Количество строк до применения фильтра по поиску', () => {
                decorate.el.table.size({
                    strCount: 6,
                    timeout: entry.max
                });
            });
        }

        if(user === 'staff' || user === 'visitor' ) {
            describe('Количество строк до применения фильтра по поиску', () => {
                decorate.el.table.size({
                    strCount: 3,
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

    const printTable = () => describe(`Котроль доступа / Отчет о проходах / вкладка ${tab}. Проверка печати.`,() => {

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
                    value: data.fio.staff2,
                    timeout: entry.max
                });
                decorate.modal.printTable.cellGetText({
                    head: 'Табельный номер',
                    str: 1,
                    cell: 2,
                    value: data.staff.staff2.tabel_number,
                    timeout: entry.max
                });
                decorate.modal.printTable.cellGetText({
                    head: 'Дата',
                    str: 1,
                    cell: 3,
                    value: data.event.staff2.event2.time_label.replace(/"/g, ''),
                    timeout: entry.max
                });
                decorate.modal.printTable.cellGetText({
                    head: 'Выход из',
                    str: 1,
                    cell: 4,
                    value: data.event.staff2.event2.access_zone_id1,
                    timeout: entry.max
                });
                decorate.modal.printTable.cellGetText({
                    head: 'Вход в',
                    str: 1,
                    cell: 5,
                    value: data.event.staff2.event2.access_zone_id2,
                    timeout: entry.max
                });
                decorate.modal.printTable.cellGetText({
                    head: 'Идентификатор',
                    str: 1,
                    cell: 6,
                    value: '2',
                    timeout: entry.max
                });
                decorate.modal.printTable.cellGetText({
                    head: 'Шаблон доступа',
                    str: 1,
                    cell: 7,
                    value: data.templates.template2,
                    timeout: entry.max
                });
                decorate.modal.printTable.cellGetText({
                    head: 'Должность',
                    str: 1,
                    cell: 8,
                    value: data.positions.position2.name,
                    timeout: entry.max
                });
                decorate.modal.printTable.cellGetText({
                    head: 'Подразделение',
                    str: 1,
                    cell: 9,
                    value: data.divisions.division2.name,
                    timeout: entry.max
                });
                decorate.modal.printTable.cellGetText({
                    head: 'Подтверждающий документ',
                    str: 1,
                    cell: 10,
                    value: '',
                    timeout: entry.max
                });
                decorate.modal.printTable.cellGetText({
                    head: 'Номер документа',
                    str: 1,
                    cell: 11,
                    value: '',
                    timeout: entry.max
                });
                decorate.modal.printTable.cellGetText({
                    head: 'Сопровождающий',
                    str: 1,
                    cell: 12,
                    value: '',
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
                    head: 'Табельный номер',
                    str: 1,
                    cell: 2,
                    value: data.staff.staff2.tabel_number,
                    timeout: entry.max
                });
                decorate.modal.printTable.cellGetText({
                    head: 'Дата',
                    str: 1,
                    cell: 3,
                    value: data.event.staff2.event2.time_label.replace(/"/g, ''),
                    timeout: entry.max
                });
                decorate.modal.printTable.cellGetText({
                    head: 'Выход из',
                    str: 1,
                    cell: 4,
                    value: data.event.staff2.event2.access_zone_id1,
                    timeout: entry.max
                });
                decorate.modal.printTable.cellGetText({
                    head: 'Вход в',
                    str: 1,
                    cell: 5,
                    value: data.event.staff2.event2.access_zone_id2,
                    timeout: entry.max
                });
                decorate.modal.printTable.cellGetText({
                    head: 'Идентификатор',
                    str: 1,
                    cell: 6,
                    value: '2',
                    timeout: entry.max
                });
                decorate.modal.printTable.cellGetText({
                    head: 'Шаблон доступа',
                    str: 1,
                    cell: 7,
                    value: data.templates.template2,
                    timeout: entry.max
                });
                decorate.modal.printTable.cellGetText({
                    head: 'Должность',
                    str: 1,
                    cell: 8,
                    value: data.positions.position2.name,
                    timeout: entry.max
                });
                decorate.modal.printTable.cellGetText({
                    head: 'Подразделение',
                    str: 1,
                    cell: 9,
                    value: data.divisions.division2.name,
                    timeout: entry.max
                });
                decorate.modal.printTable.cellGetText({
                    head: 'Транспортное средство',
                    str: 1,
                    cell: 10,
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
                    head: 'Дата',
                    str: 1,
                    cell: 2,
                    value: data.event.visitor2.event2.time_label.replace(/"/g, ''),
                    timeout: entry.max
                });
                decorate.modal.printTable.cellGetText({
                    head: 'Выход из',
                    str: 1,
                    cell: 3,
                    value: data.event.visitor2.event2.access_zone_id1,
                    timeout: entry.max
                });
                decorate.modal.printTable.cellGetText({
                    head: 'Вход в',
                    str: 1,
                    cell: 4,
                    value: data.event.visitor2.event2.access_zone_id2,
                    timeout: entry.max
                });
                decorate.modal.printTable.cellGetText({
                    head: 'Идентификатор',
                    str: 1,
                    cell: 5,
                    value: '5',
                    timeout: entry.max
                });
                decorate.modal.printTable.cellGetText({
                    head: 'Шаблон доступа',
                    str: 1,
                    cell: 6,
                    value: data.templates.template2,
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
                    value: data.visitor.visitor2.supporting_document_number,
                    timeout: entry.max
                });
                decorate.modal.printTable.cellGetText({
                    head: 'Сопровождающий',
                    str: 1,
                    cell: 10,
                    value: '',
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

        describe('Закрытие печатной формы', () => {
            decorate.modal.printTable.closeHandler({
                timeout: entry.max
            });

            decorate.modal.printTable.initClose({
                timeout: entry.max
            });
        });
    });

    const exportXLSX = () => describe(`Котроль доступа / Отчет о проходах / вкладка ${tab}. Экспорт XLSX.`, () => {

        const params = {
            nameFile: 'accessreport.xlsx',
            jsonAll: [
                { 'Отчет "Отчет о проходах"': `${data.date2()}`},
                {
                    'Отчет "Отчет о проходах"': 'Фамилия',
                    __EMPTY: 'Имя',
                    __EMPTY_1: 'Отчество',
                    __EMPTY_2: 'Табельный номер',
                    __EMPTY_3: 'Дата',
                    __EMPTY_4: 'Выход из',
                    __EMPTY_5: 'Вход в',
                    __EMPTY_6: 'Карта №',
                    __EMPTY_7: 'Шаблон доступа',
                    __EMPTY_8: 'Должность',
                    __EMPTY_9: 'Подразделение',
                    __EMPTY_10: 'Подтверждающий документ',
                    __EMPTY_11: 'Номер документа',
                    __EMPTY_12: 'Сопровождающий',
                    __EMPTY_13: 'Транспортное средство'
                },
                {
                    'Отчет "Отчет о проходах"': 'staff',
                    __EMPTY: 'name',
                    __EMPTY_1: '2',
                    __EMPTY_2: '2',
                    __EMPTY_3: `${data.eventDate.event1}`,
                    __EMPTY_4: 'room1',
                    __EMPTY_5: 'room2',
                    __EMPTY_6: '2',
                    __EMPTY_7: 'template2',
                    __EMPTY_8: 'position2',
                    __EMPTY_9: 'division2',
                    __EMPTY_10: '',
                    __EMPTY_11: '',
                    __EMPTY_12: '',
                    __EMPTY_13: ''
                },
                {
                    'Отчет "Отчет о проходах"': 'visitor',
                    __EMPTY: 'name',
                    __EMPTY_1: '2',
                    __EMPTY_2: '',
                    __EMPTY_3: `${data.eventDate.event1}`,
                    __EMPTY_4: 'room1',
                    __EMPTY_5: 'room2',
                    __EMPTY_6: '5',
                    __EMPTY_7: 'template2',
                    __EMPTY_8: '',
                    __EMPTY_9: 'division2',
                    __EMPTY_10: 'passport',
                    __EMPTY_11: '2',
                    __EMPTY_12: '',
                    __EMPTY_13: ''
                },
                {
                    'Отчет "Отчет о проходах"': 'staff',
                    __EMPTY: 'name',
                    __EMPTY_1: '2',
                    __EMPTY_2: '2',
                    __EMPTY_3: `${data.eventDate.event2}`,
                    __EMPTY_4: 'Неконтролируемая территория',
                    __EMPTY_5: 'room1',
                    __EMPTY_6: '2',
                    __EMPTY_7: 'template2',
                    __EMPTY_8: 'position2',
                    __EMPTY_9: 'division2',
                    __EMPTY_10: '',
                    __EMPTY_11: '',
                    __EMPTY_12: '',
                    __EMPTY_13: ''
                },
                {
                    'Отчет "Отчет о проходах"': 'visitor',
                    __EMPTY: 'name',
                    __EMPTY_1: '2',
                    __EMPTY_2: '',
                    __EMPTY_3: `${data.eventDate.event2}`,
                    __EMPTY_4: 'Неконтролируемая территория',
                    __EMPTY_5: 'room1',
                    __EMPTY_6: '5',
                    __EMPTY_7: 'template2',
                    __EMPTY_8: '',
                    __EMPTY_9: 'division2',
                    __EMPTY_10: 'passport',
                    __EMPTY_11: '2',
                    __EMPTY_12: '',
                    __EMPTY_13: ''
                },
                {
                    'Отчет "Отчет о проходах"': 'staff',
                    __EMPTY: 'name',
                    __EMPTY_1: '1',
                    __EMPTY_2: '1',
                    __EMPTY_3: `${data.eventDate.event3}`,
                    __EMPTY_4: 'Неконтролируемая территория',
                    __EMPTY_5: 'room1',
                    __EMPTY_6: '1',
                    __EMPTY_7: 'template1',
                    __EMPTY_8: 'position1',
                    __EMPTY_9: 'division1',
                    __EMPTY_10: '',
                    __EMPTY_11: '',
                    __EMPTY_12: '',
                    __EMPTY_13: ''
                },
                {
                    'Отчет "Отчет о проходах"': 'visitor',
                    __EMPTY: 'name',
                    __EMPTY_1: '1',
                    __EMPTY_2: '',
                    __EMPTY_3: `${data.eventDate.event3}`,
                    __EMPTY_4: 'Неконтролируемая территория',
                    __EMPTY_5: 'room1',
                    __EMPTY_6: '4',
                    __EMPTY_7: 'template1',
                    __EMPTY_8: '',
                    __EMPTY_9: 'division1',
                    __EMPTY_10: 'passport',
                    __EMPTY_11: '1',
                    __EMPTY_12: '',
                    __EMPTY_13: ''
                }
            ],
            jsonStaff: [
                { 'Отчет "Отчет о проходах (Персонал)"': `${data.date2()}`},
                {
                    'Отчет "Отчет о проходах (Персонал)"': 'Фамилия',
                    __EMPTY: 'Имя',
                    __EMPTY_1: 'Отчество',
                    __EMPTY_2: 'Табельный номер',
                    __EMPTY_3: 'Дата',
                    __EMPTY_4: 'Выход из',
                    __EMPTY_5: 'Вход в',
                    __EMPTY_6: 'Карта №',
                    __EMPTY_7: 'Шаблон доступа',
                    __EMPTY_8: 'Должность',
                    __EMPTY_9: 'Подразделение',
                    __EMPTY_10: 'Транспортное средство'
                },
                {
                    'Отчет "Отчет о проходах (Персонал)"': 'staff',
                    __EMPTY: 'name',
                    __EMPTY_1: '2',
                    __EMPTY_2: '2',
                    __EMPTY_3: `${data.eventDate.event1}`,
                    __EMPTY_4: 'room1',
                    __EMPTY_5: 'room2',
                    __EMPTY_6: '2',
                    __EMPTY_7: 'template2',
                    __EMPTY_8: 'position2',
                    __EMPTY_9: 'division2',
                    __EMPTY_10: ''
                },
                {
                    'Отчет "Отчет о проходах (Персонал)"': 'staff',
                    __EMPTY: 'name',
                    __EMPTY_1: '2',
                    __EMPTY_2: '2',
                    __EMPTY_3: `${data.eventDate.event2}`,
                    __EMPTY_4: 'Неконтролируемая территория',
                    __EMPTY_5: 'room1',
                    __EMPTY_6: '2',
                    __EMPTY_7: 'template2',
                    __EMPTY_8: 'position2',
                    __EMPTY_9: 'division2',
                    __EMPTY_10: ''
                },
                {
                    'Отчет "Отчет о проходах (Персонал)"': 'staff',
                    __EMPTY: 'name',
                    __EMPTY_1: '1',
                    __EMPTY_2: '1',
                    __EMPTY_3: `${data.eventDate.event3}`,
                    __EMPTY_4: 'Неконтролируемая территория',
                    __EMPTY_5: 'room1',
                    __EMPTY_6: '1',
                    __EMPTY_7: 'template1',
                    __EMPTY_8: 'position1',
                    __EMPTY_9: 'division1',
                    __EMPTY_10: ''
                }
            ],
            jsonVisitor: [
                {
                    'Отчет "Отчет о проходах (Посетители)"': `${data.date2()}`
                },
                {
                    'Отчет "Отчет о проходах (Посетители)"': 'Фамилия',
                    __EMPTY: 'Имя',
                    __EMPTY_1: 'Отчество',
                    __EMPTY_2: 'Дата',
                    __EMPTY_3: 'Выход из',
                    __EMPTY_4: 'Вход в',
                    __EMPTY_5: 'Карта №',
                    __EMPTY_6: 'Шаблон доступа',
                    __EMPTY_7: 'Подразделение',
                    __EMPTY_8: 'Подтверждающий документ',
                    __EMPTY_9: 'Номер документа',
                    __EMPTY_10: 'Сопровождающий',
                    __EMPTY_11: 'Транспортное средство'
                },
                {
                    'Отчет "Отчет о проходах (Посетители)"': 'visitor',
                    __EMPTY: 'name',
                    __EMPTY_1: '2',
                    __EMPTY_2: `${data.eventDate.event1}`,
                    __EMPTY_3: 'room1',
                    __EMPTY_4: 'room2',
                    __EMPTY_5: '5',
                    __EMPTY_6: 'template2',
                    __EMPTY_7: 'division2',
                    __EMPTY_8: 'passport',
                    __EMPTY_9: '2',
                    __EMPTY_10: '',
                    __EMPTY_11: ''
                },
                {
                    'Отчет "Отчет о проходах (Посетители)"': 'visitor',
                    __EMPTY: 'name',
                    __EMPTY_1: '2',
                    __EMPTY_2: `${data.eventDate.event2}`,
                    __EMPTY_3: 'Неконтролируемая территория',
                    __EMPTY_4: 'room1',
                    __EMPTY_5: '5',
                    __EMPTY_6: 'template2',
                    __EMPTY_7: 'division2',
                    __EMPTY_8: 'passport',
                    __EMPTY_9: '2',
                    __EMPTY_10: '',
                    __EMPTY_11: ''
                },
                {
                    'Отчет "Отчет о проходах (Посетители)"': 'visitor',
                    __EMPTY: 'name',
                    __EMPTY_1: '1',
                    __EMPTY_2: `${data.eventDate.event3}`,
                    __EMPTY_3: 'Неконтролируемая территория',
                    __EMPTY_4: 'room1',
                    __EMPTY_5: '4',
                    __EMPTY_6: 'template1',
                    __EMPTY_7: 'division1',
                    __EMPTY_8: 'passport',
                    __EMPTY_9: '1',
                    __EMPTY_10: '',
                    __EMPTY_11: ''
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

    const exportCSV = () => describe(`Котроль доступа / Отчет о проходах / вкладка ${tab}. Экспорт CSV.`, () => {

        const params = {
            nameFile: 'accessreport.csv',
            jsonAll: [
                {
                    'Фамилия': 'staff',
                    'Имя': 'name',
                    'Отчество': 2,
                    'Табельный номер': 2,
                    'Дата':`${data.eventDate.event1}`,
                    'Выход из': 'room1',
                    'Вход в': 'room2',
                    'Карта №': 2,
                    'Шаблон доступа': 'template2',
                    'Должность': 'position2',
                    'Подразделение': 'division2'
                },
                {
                    'Фамилия': 'visitor',
                    'Имя': 'name',
                    'Отчество': 2,
                    'Дата': `${data.eventDate.event1}`,
                    'Выход из': 'room1',
                    'Вход в': 'room2',
                    'Карта №': 5,
                    'Шаблон доступа': 'template2',
                    'Подразделение': 'division2',
                    'Подтверждающий документ': 'passport',
                    'Номер документа': 2
                },
                {
                    'Фамилия': 'staff',
                    'Имя': 'name',
                    'Отчество': 2,
                    'Табельный номер': 2,
                    'Дата': `${data.eventDate.event2}`,
                    'Выход из': 'Неконтролируемая территория',
                    'Вход в': 'room1',
                    'Карта №': 2,
                    'Шаблон доступа': 'template2',
                    'Должность': 'position2',
                    'Подразделение': 'division2'
                },
                {
                    'Фамилия': 'visitor',
                    'Имя': 'name',
                    'Отчество': 2,
                    'Дата': `${data.eventDate.event2}`,
                    'Выход из': 'Неконтролируемая территория',
                    'Вход в': 'room1',
                    'Карта №': 5,
                    'Шаблон доступа': 'template2',
                    'Подразделение': 'division2',
                    'Подтверждающий документ': 'passport',
                    'Номер документа': 2
                },
                {
                    'Фамилия': 'staff',
                    'Имя': 'name',
                    'Отчество': 1,
                    'Табельный номер': 1,
                    'Дата': `${data.eventDate.event3}`,
                    'Выход из': 'Неконтролируемая территория',
                    'Вход в': 'room1',
                    'Карта №': 1,
                    'Шаблон доступа': 'template1',
                    'Должность': 'position1',
                    'Подразделение': 'division1'
                },
                {
                    'Фамилия': 'visitor',
                    'Имя': 'name',
                    'Отчество': 1,
                    'Дата': `${data.eventDate.event3}`,
                    'Выход из': 'Неконтролируемая территория',
                    'Вход в': 'room1',
                    'Карта №': 4,
                    'Шаблон доступа': 'template1',
                    'Подразделение': 'division1',
                    'Подтверждающий документ': 'passport',
                    'Номер документа': 1
                }
            ],
            jsonStaff: [
                {
                    'Фамилия': 'staff',
                    'Имя': 'name',
                    'Отчество': 2,
                    'Табельный номер': 2,
                    'Дата': `${data.eventDate.event1}`,
                    'Выход из': 'room1',
                    'Вход в': 'room2',
                    'Карта №': 2,
                    'Шаблон доступа': 'template2',
                    'Должность': 'position2',
                    'Подразделение': 'division2'
                },
                {
                    'Фамилия': 'staff',
                    'Имя': 'name',
                    'Отчество': 2,
                    'Табельный номер': 2,
                    'Дата': `${data.eventDate.event2}`,
                    'Выход из': 'Неконтролируемая территория',
                    'Вход в': 'room1',
                    'Карта №': 2,
                    'Шаблон доступа': 'template2',
                    'Должность': 'position2',
                    'Подразделение': 'division2'
                },
                {
                    'Фамилия': 'staff',
                    'Имя': 'name',
                    'Отчество': 1,
                    'Табельный номер': 1,
                    'Дата': `${data.eventDate.event3}`,
                    'Выход из': 'Неконтролируемая территория',
                    'Вход в': 'room1',
                    'Карта №': 1,
                    'Шаблон доступа': 'template1',
                    'Должность': 'position1',
                    'Подразделение': 'division1'
                }
            ],
            jsonVisitor: [
                {
                    'Фамилия': 'visitor',
                    'Имя': 'name',
                    'Отчество': 2,
                    'Дата': `${data.eventDate.event1}`,
                    'Выход из': 'room1',
                    'Вход в': 'room2',
                    'Карта №': 5,
                    'Шаблон доступа': 'template2',
                    'Подразделение': 'division2',
                    'Подтверждающий документ': 'passport',
                    'Номер документа': 2
                },
                {
                    'Фамилия': 'visitor',
                    'Имя': 'name',
                    'Отчество': 2,
                    'Дата': `${data.eventDate.event2}`,
                    'Выход из': 'Неконтролируемая территория',
                    'Вход в': 'room1',
                    'Карта №': 5,
                    'Шаблон доступа': 'template2',
                    'Подразделение': 'division2',
                    'Подтверждающий документ': 'passport',
                    'Номер документа': 2
                },
                {
                    'Фамилия': 'visitor',
                    'Имя': 'name',
                    'Отчество': 1,
                    'Дата': `${data.eventDate.event3}`,
                    'Выход из': 'Неконтролируемая территория',
                    'Вход в': 'room1',
                    'Карта №': 4,
                    'Шаблон доступа': 'template1',
                    'Подразделение': 'division1',
                    'Подтверждающий документ': 'passport',
                    'Номер документа': 1
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

    return  {
        checkData,
        display,
        filterDate,
        filterRoom,
        filterRoomForm,
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