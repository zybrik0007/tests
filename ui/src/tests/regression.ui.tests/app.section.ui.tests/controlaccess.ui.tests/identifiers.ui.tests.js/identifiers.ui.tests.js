const {describe, it} = require('mocha');

const entry = require('../../../../../../../entry');
const el = require('../../../../../elements');
const dec = require('../../../../../dictionaries/decorate');
const sec = require('../../../../../dictionaries/section');
const sub = require('../../../../../dictionaries/subsection');
const but = require('../../../../../dictionaries/button-icon');
const icon = require('../../../../../dictionaries/icon');
const decorate = require('../../../../../decorates');
const data = require('./identifiers.data');

const befAll = () => decorate.befAft.before.beforeReportIdentifierAll();
const befStaff = () => decorate.befAft.before.beforeReportIdentifierAStaff();
const befVisitor = () => decorate.befAft.before.beforeReportIdentifierVisitor();
const aft = () => decorate.befAft.after.after();

const test = (user, tab, bef) => {

    const checkData = () => describe(`Контроль доступа / Выданные идентификаторы / вкладка ${tab}. 
    Проверка отображения данных .`, () => {

        bef();
        aft();

        if(user === 'all') {
            describe('Общие проверки', () => {
                decorate.el.error.checkError({
                    timeout: entry.sleep2
                });
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
                decorate.el.error.checkError({
                    timeout: entry.sleep2
                });

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
                decorate.el.error.checkError({
                    timeout: entry.sleep2
                });

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
            decorate.el.error.checkError({
                timeout: entry.sleep2
            });
        });

        if(user === 'all') {
            describe('Количество строк после применения фильтра по дате', () => {
                decorate.el.table.size({
                    strCount: 3,
                    timeout: entry.max
                });
            });
        }

        if(user === 'staff') {
            describe('Количество строк после применения фильтра по дате', () => {
                decorate.el.table.size({
                    strCount: 2,
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
                    value: data.fio.staff4,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Идентификатор',
                    strNumber: 2,
                    cellNumber: 2,
                    value: data.staff.staff4.identifier[0].identifier,
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

            describe('Проверка строки 3.', () => {
                decorate.el.table.cellGetText({
                    headTitle: 'ФИО',
                    strNumber: 3,
                    cellNumber: 1,
                    value: data.fio.visitor3,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Идентификатор',
                    strNumber: 3,
                    cellNumber: 2,
                    value: data.visitor.visitor3.identifier[0].identifier,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Дата выдачи',
                    strNumber: 3,
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

            describe('Проверка строки 2.', () => {
                decorate.el.table.cellGetText({
                    headTitle: 'ФИО',
                    strNumber: 2,
                    cellNumber: 1,
                    value: data.fio.staff4,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Идентификатор',
                    strNumber: 2,
                    cellNumber: 2,
                    value: data.staff.staff4.identifier[0].identifier,
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

            decorate.el.error.checkError({
                timeout: entry.sleep2
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
            decorate.el.error.checkError({
                timeout: entry.sleep2
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
                decorate.el.error.checkError({
                    timeout: entry.sleep2
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
                decorate.el.error.checkError({
                    timeout: entry.sleep2
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
            decorate.el.error.checkError({
                timeout: entry.sleep2
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
                    value: entry.operator,
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
                    value: entry.operator,
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
                    value: entry.operator,
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
            decorate.el.error.checkError({
                timeout: entry.sleep2
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
            decorate.el.error.checkError({
                timeout: entry.sleep2
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
                decorate.el.error.checkError({
                    timeout: entry.sleep2
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
                decorate.el.error.checkError({
                    timeout: entry.sleep2
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
                decorate.el.error.checkError({
                    timeout: entry.sleep2
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

const other = () => {
    const addDataControlAccess = () => describe('Добавление данных для тестирования отчетов раздела Котроль доступа',
        () => {
            const params = {...data}

            befAll();
            aft();

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

            describe('Добавление подразделений', () => {
                decorate.api.addDivision(params.divisions.division1);
                decorate.api.addDivision(params.divisions.division2);
                decorate.api.addDivision(params.divisions.division3);
                decorate.api.addDivision(params.divisions.division4);
            });

            describe('Добавление должностей', () => {
                decorate.api.addPosition(params.positions.position1);
                decorate.api.addPosition(params.positions.position2);
                decorate.api.addPosition(params.positions.position3);
                decorate.api.addPosition(params.positions.position4);
            });

            describe('Добавление шаблонов доступа', () => {
                it(`Добавление шаблона доступа "${params.templates.template1}"`, async () => {
                    const cook = await page.base.getCookie('token');
                    const arrZone = await api.getRoom(cook.text);
                    const id1 = arrZone.text.filter(obj => obj.name === params.rooms.room1)[0].id;
                    const id2 = arrZone.text.filter(obj => obj.name === params.rooms.room2)[0].id;
                    const id3 = arrZone.text.filter(obj => obj.name === params.rooms.room3)[0].id;
                    const template = params.template(params.templates.template1, id1, id2, id3);
                    await dec.simple(api.putAccessTemplate,
                        [[template], cook.text],
                        api.putAccessTemplate);
                });

                it(`Добавление шаблона доступа "${params.templates.template2}"`, async () => {
                    const cook = await page.base.getCookie('token');
                    const arrZone = await api.getRoom(cook.text);
                    const id1 = arrZone.text.filter(obj => obj.name === params.rooms.room1)[0].id;
                    const id2 = arrZone.text.filter(obj => obj.name === params.rooms.room2)[0].id;
                    const id3 = arrZone.text.filter(obj => obj.name === params.rooms.room3)[0].id;
                    const template = params.template(params.templates.template2, id1, id2, id3);
                    await dec.simple(api.putAccessTemplate,
                        [[template], cook.text],
                        api.putAccessTemplate);
                });

                it(`Добавление шаблона доступа "${params.templates.template3}"`, async () => {
                    const cook = await page.base.getCookie('token');
                    const arrZone = await api.getRoom(cook.text);
                    const id1 = arrZone.text.filter(obj => obj.name === params.rooms.room1)[0].id;
                    const template = params.templateOneRoom(params.templates.template3, id1);
                    await dec.simple(api.putAccessTemplate,
                        [[template], cook.text],
                        api.putAccessTemplate);
                });

                it(`Добавление шаблона доступа "${params.templates.template4}"`, async () => {
                    const cook = await page.base.getCookie('token');
                    const arrZone = await api.getRoom(cook.text);
                    const id1 = arrZone.text.filter(obj => obj.name === params.rooms.room1)[0].id;
                    const template = params.templateOneRoom(params.templates.template4, id1);
                    await dec.simple(api.putAccessTemplate,
                        [[template], cook.text],
                        api.putAccessTemplate);
                });
            });

            describe('Добавление сотрудников', () => {
                it(`Добавление сотрудника "${params.fio.staff1}".`, async () => {
                    const cook = await page.base.getCookie('token');
                    const arrDivision = await api.getDivision(cook.text);
                    const divisionId = arrDivision.text.filter(obj => obj.name === params.staff.staff1.division)[0].id;
                    const arrPosition = await api.getPosition(cook.text);
                    const positionId = arrPosition.text.filter(obj => obj.name === params.staff.staff1.position)[0].id;
                    const arrTemplate = await api.getTemplate(cook.text);
                    const templateId = arrTemplate.text.filter(obj => obj.name === params.staff.staff1.access_template[0])[0].id;
                    const staff = {
                        ...params.staff.staff1,
                        division: divisionId,
                        position: positionId,
                        access_template: [templateId]
                    }
                    await dec.simple(api.putStaff,
                        [[staff], cook.text],
                        api.putStaff);
                });

                it(`Добавление сотрудника "${params.fio.staff2}".`, async () => {
                    const cook = await page.base.getCookie('token');
                    const arrDivision = await api.getDivision(cook.text);
                    const divisionId = arrDivision.text.filter(obj => obj.name === params.staff.staff2.division)[0].id;
                    const arrPosition = await api.getPosition(cook.text);
                    const positionId = arrPosition.text.filter(obj => obj.name === params.staff.staff2.position)[0].id;
                    const arrTemplate = await api.getTemplate(cook.text);
                    const templateId = arrTemplate.text.filter(obj => obj.name === params.staff.staff2.access_template[0])[0].id;
                    const staff = {
                        ...params.staff.staff2,
                        division: divisionId,
                        position: positionId,
                        access_template: [templateId]
                    }
                    await dec.simple(api.putStaff,
                        [[staff], cook.text],
                        api.putStaff);
                });

                it(`Добавление сотрудника "${params.fio.staff3}".`, async () => {
                    const cook = await page.base.getCookie('token');
                    const arrDivision = await api.getDivision(cook.text);
                    const divisionId = arrDivision.text.filter(obj => obj.name === params.staff.staff3.division)[0].id;
                    const arrPosition = await api.getPosition(cook.text);
                    const positionId = arrPosition.text.filter(obj => obj.name === params.staff.staff3.position)[0].id;
                    const arrTemplate = await api.getTemplate(cook.text);
                    const templateId = arrTemplate.text.filter(obj => obj.name === params.staff.staff3.access_template[0])[0].id;
                    const staff = {
                        ...params.staff.staff3,
                        division: divisionId,
                        position: positionId,
                        access_template: [templateId]
                    }
                    await dec.simple(api.putStaff,
                        [[staff], cook.text],
                        api.putStaff);
                });

                it(`Добавление сотрудника "${params.fio.staff4}".`, async () => {
                    const cook = await page.base.getCookie('token');
                    const arrDivision = await api.getDivision(cook.text);
                    const divisionId = arrDivision.text.filter(obj => obj.name === params.staff.staff4.division)[0].id;
                    const arrPosition = await api.getPosition(cook.text);
                    const positionId = arrPosition.text.filter(obj => obj.name === params.staff.staff4.position)[0].id;
                    const arrTemplate = await api.getTemplate(cook.text);
                    const templateId = arrTemplate.text.filter(obj => obj.name === params.staff.staff4.access_template[0])[0].id;
                    const staff = {
                        ...params.staff.staff4,
                        division: divisionId,
                        position: positionId,
                        access_template: [templateId]
                    }
                    await dec.simple(api.putStaff,
                        [[staff], cook.text],
                        api.putStaff);
                });
            });

            describe('Добавление посетителей', () => {
                it(`Добавление пометителя "${params.fio.visitor1}".`, async () => {
                    const cook = await page.base.getCookie('token');
                    const arrDivision = await api.getDivision(cook.text);
                    const divisionId = arrDivision.text.filter(obj => obj.name === params.visitor.visitor1.division)[0].id;
                    const arrTemplate = await api.getTemplate(cook.text);
                    const templateId = arrTemplate.text.filter(obj => obj.name === params.visitor.visitor1.access_template)[0].id;
                    const visitor = {
                        ...params.visitor.visitor1,
                        division: divisionId,
                        access_template: templateId
                    }
                    await dec.simple(api.putVisitor,
                        [[visitor], cook.text],
                        api.putVisitor);
                });

                it(`Добавление пометителя "${params.fio.visitor2}".`, async () => {
                    const cook = await page.base.getCookie('token');
                    const arrDivision = await api.getDivision(cook.text);
                    const divisionId = arrDivision.text.filter(obj => obj.name === params.visitor.visitor2.division)[0].id;
                    const arrTemplate = await api.getTemplate(cook.text);
                    const templateId = arrTemplate.text.filter(obj => obj.name === params.visitor.visitor2.access_template)[0].id;
                    const visitor = {
                        ...params.visitor.visitor2,
                        division: divisionId,
                        access_template: templateId
                    }
                    await dec.simple(api.putVisitor,
                        [[visitor], cook.text],
                        api.putVisitor);
                });

                it(`Добавление пометителя "${params.fio.visitor2}".`, async () => {
                    const cook = await page.base.getCookie('token');
                    const arrDivision = await api.getDivision(cook.text);
                    const divisionId = arrDivision.text.filter(obj => obj.name === params.visitor.visitor3.division)[0].id;
                    const arrTemplate = await api.getTemplate(cook.text);
                    const templateId = arrTemplate.text.filter(obj => obj.name === params.visitor.visitor3.access_template)[0].id;
                    const visitor = {
                        ...params.visitor.visitor3,
                        division: divisionId,
                        access_template: templateId
                    }
                    await dec.simple(api.putVisitor,
                        [[visitor], cook.text],
                        api.putVisitor);
                });
            });

            describe('Добавление проходов', () =>  {
                it(`Добавление проходов сотрудникам и посетителям.`, async () => {
                    const cook = await page.base.getCookie('token');
                    const arrStaff = await api.getStaff(cook.text);
                    const staff1 = arrStaff.text.filter(obj => obj.name === params.fio.staff1)[0].id;
                    const staff2 = arrStaff.text.filter(obj => obj.name === params.fio.staff2)[0].id;
                    const staff3 = arrStaff.text.filter(obj => obj.name === params.fio.staff3)[0].id;
                    const staff4 = arrStaff.text.filter(obj => obj.name === params.fio.staff4)[0].id;

                    const arrVisitor = await api.getVisitor(cook.text);
                    const visitor1 = arrVisitor.text.filter(obj => obj.name === params.fio.visitor1)[0].id;
                    const visitor2 = arrVisitor.text.filter(obj => obj.name === params.fio.visitor2)[0].id;
                    const visitor3 = arrVisitor.text.filter(obj => obj.name === params.fio.visitor3)[0].id;

                    const arrDevice = await api.getDevice(cook.text);
                    const device1 = arrDevice.text.filter(obj => obj.ip_addr === params.devices.device1.ip)[0].id;
                    const device2 = arrDevice.text.filter(obj => obj.ip_addr === params.devices.device2.ip)[0].id;

                    const arrRooms = await api.getRoom(cook.text);
                    const room0 = arrRooms.text.filter(obj => obj.name === 'Неконтролируемая территория')[0].id;
                    const room1 = arrRooms.text.filter(obj => obj.name === params.rooms.room1)[0].id;
                    const room2 = arrRooms.text.filter(obj => obj.name === params.rooms.room2)[0].id;

                    //События сотрудника 1
                    await dec.simple(db.addEvent,
                        [{
                            ...params.event.staff1.event1,
                            user_id: staff1,
                            device_id: device1,
                            access_zone_id1: room1,
                            access_zone_id2: room0,
                            event_type: 17
                        }],
                        db.addEvent);

                    await dec.simple(db.addEvent,
                        [{
                            ...params.event.staff1.event2,
                            user_id: staff1,
                            device_id: device1,
                            access_zone_id1: room0,
                            access_zone_id2: room1,
                            event_type: 17
                        }],
                        db.addEvent);

                    await dec.simple(db.addEvent,
                        [{
                            ...params.event.staff1.event1,
                            user_id: staff1,
                            device_id: device1,
                            access_zone_id1: room1,
                            access_zone_id2: room0,
                            event_type: 65544
                        }],
                        db.addEvent);

                    await dec.simple(db.addEvent,
                        [{
                            ...params.event.staff1.event2,
                            user_id: staff1,
                            device_id: device1,
                            access_zone_id1: room0,
                            access_zone_id2: room1,
                            event_type: 65544
                        }],
                        db.addEvent);

                    //События сотрудника 2
                    await dec.simple(db.addEvent,
                        [{
                            ...params.event.staff2.event1,
                            user_id: staff2,
                            device_id: device1,
                            access_zone_id1: room1,
                            access_zone_id2: room0,
                            event_type: 17
                        }],
                        db.addEvent);

                    await dec.simple(db.addEvent,
                        [{
                            ...params.event.staff2.event2,
                            user_id: staff2,
                            device_id: device1,
                            access_zone_id1: room2,
                            access_zone_id2: room1,
                            event_type: 17
                        }],
                        db.addEvent);

                    await dec.simple(db.addEvent,
                        [{
                            ...params.event.staff2.event3,
                            user_id: staff2,
                            device_id: device2,
                            access_zone_id1: room1,
                            access_zone_id2: room0,
                            event_type: 17
                        }],
                        db.addEvent);

                    await dec.simple(db.addEvent,
                        [{
                            ...params.event.staff2.event1,
                            user_id: staff2,
                            device_id: device1,
                            access_zone_id1: room1,
                            access_zone_id2: room0,
                            event_type: 65544
                        }],
                        db.addEvent);

                    await dec.simple(db.addEvent,
                        [{
                            ...params.event.staff2.event2,
                            user_id: staff2,
                            device_id: device1,
                            access_zone_id1: room2,
                            access_zone_id2: room1,
                            event_type: 65544
                        }],
                        db.addEvent);

                    await dec.simple(db.addEvent,
                        [{
                            ...params.event.staff2.event3,
                            user_id: staff2,
                            device_id: device1,
                            access_zone_id1: room1,
                            access_zone_id2: room0,
                            event_type: 65544
                        }],
                        db.addEvent);

                    //События посетителя 1
                    await dec.simple(db.addEvent,
                        [{
                            ...params.event.visitor1.event1,
                            user_id: visitor1,
                            device_id: device1,
                            access_zone_id1: room1,
                            access_zone_id2: room0,
                            event_type: 17
                        }],
                        db.addEvent);

                    await dec.simple(db.addEvent,
                        [{
                            ...params.event.visitor1.event2,
                            user_id: visitor1,
                            device_id: device1,
                            access_zone_id1: room0,
                            access_zone_id2: room1,
                            event_type: 17
                        }],
                        db.addEvent);

                    await dec.simple(db.addEvent,
                        [{
                            ...params.event.visitor1.event1,
                            user_id: visitor1,
                            device_id: device1,
                            access_zone_id1: room1,
                            access_zone_id2: room0,
                            event_type: 65544
                        }],
                        db.addEvent);

                    await dec.simple(db.addEvent,
                        [{
                            ...params.event.visitor1.event2,
                            user_id: visitor1,
                            device_id: device1,
                            access_zone_id1: room0,
                            access_zone_id2: room1,
                            event_type: 65544
                        }],
                        db.addEvent);

                    //События посетителя 2

                    await dec.simple(db.addEvent,
                        [{
                            ...params.event.visitor2.event1,
                            user_id: visitor2,
                            device_id: device1,
                            access_zone_id1: room1,
                            access_zone_id2: room0,
                            event_type: 17
                        }],
                        db.addEvent);

                    await dec.simple(db.addEvent,
                        [{
                            ...params.event.visitor2.event2,
                            user_id: visitor2,
                            device_id: device1,
                            access_zone_id1: room2,
                            access_zone_id2: room1,
                            event_type: 17
                        }],
                        db.addEvent);

                    await dec.simple(db.addEvent,
                        [{
                            ...params.event.visitor2.event3,
                            user_id: visitor2,
                            device_id: device1,
                            access_zone_id1: room1,
                            access_zone_id2: room0,
                            event_type: 17
                        }],
                        db.addEvent);

                    await dec.simple(db.addEvent,
                        [{
                            ...params.event.visitor2.event1,
                            user_id: visitor2,
                            device_id: device1,
                            access_zone_id1: room1,
                            access_zone_id2: room0,
                            event_type: 65544
                        }],
                        db.addEvent);

                    await dec.simple(db.addEvent,
                        [{
                            ...params.event.visitor2.event2,
                            user_id: visitor2,
                            device_id: device1,
                            access_zone_id1: room2,
                            access_zone_id2: room1,
                            event_type: 65544
                        }],
                        db.addEvent);

                    await dec.simple(db.addEvent,
                        [{
                            ...params.event.visitor2.event3,
                            user_id: visitor2,
                            device_id: device1,
                            access_zone_id1: room1,
                            access_zone_id2: room0,
                            event_type: 65544
                        }],
                        db.addEvent);

                    // Изменение даты добавления карты
                    await dec.simple(db.updateUserCard,
                        [{
                            user_id: staff1,
                            identifier: params.staff.staff1.identifier[0].identifier,
                            operator_id: 1,
                            create_date: params.eventDate.event1
                        }],
                        db.addEvent);

                    await dec.simple(db.updateUserCard,
                        [{
                            user_id: staff2,
                            identifier: params.staff.staff2.identifier[0].identifier,
                            operator_id: 1,
                            create_date: params.eventDate.event1
                        }],
                        db.addEvent);

                    await dec.simple(db.updateUserCard,
                        [{
                            user_id: staff3,
                            identifier: params.staff.staff3.identifier[0].identifier,
                            operator_id: 1,
                            create_date: params.dateCard
                        }],
                        db.addEvent);

                    await dec.simple(db.updateUserCard,
                        [{
                            user_id: staff4,
                            identifier: params.staff.staff4.identifier[0].identifier,
                            operator_id: 1,
                            create_date: params.dateCard
                        }],
                        db.addEvent);

                    await dec.simple(db.updateUserCard,
                        [{
                            user_id: visitor1,
                            identifier: params.visitor.visitor1.identifier[0].identifier,
                            operator_id: 1,
                            create_date: params.eventDate.event1
                        }],
                        db.addEvent);

                    await dec.simple(db.updateUserCard,
                        [{
                            user_id: visitor2,
                            identifier: params.visitor.visitor2.identifier[0].identifier,
                            operator_id: 1,
                            create_date: params.eventDate.event1
                        }],
                        db.addEvent);

                    await dec.simple(db.updateUserCard,
                        [{
                            user_id: visitor3,
                            identifier: params.visitor.visitor3.identifier[0].identifier,
                            operator_id: 1,
                            create_date: params.dateCard
                        }],
                        db.addEvent);

                    await dec.simple(db.addEvent,
                        [{
                            ...params.event.visitor3.event2,
                            user_id: visitor3,
                            device_id: device1,
                            access_zone_id1: room1,
                            access_zone_id2: room0,
                            event_type: 17
                        }],
                        db.addEvent);
                });
            });
        });

    const deleteDataControlAccess = () => describe('Удаление данных для тестетирование отчетов раздела Котроль доступа',
        () => {
            const params = {...data}

            describe('Удалние проходов', () => {
                decorate.db.truncateEvent();
            });

            describe('Удаление сотрудников', () => {
                decorate.db.truncateUserAdditionalFieldFata();
                decorate.db.truncateUserDocument();
                decorate.db.truncateUserStaff();
                decorate.db.truncateUserVisitor();
                decorate.db.deleteUser({
                    lastName: params.staff.staff1.last_name,
                    name: params.staff.staff1.first_name,
                    middleName: params.staff.staff1.middle_name
                });
                decorate.db.deleteUser({
                    lastName: params.staff.staff2.last_name,
                    name: params.staff.staff2.first_name,
                    middleName: params.staff.staff2.middle_name
                });
                decorate.db.deleteUser({
                    lastName: params.staff.staff3.last_name,
                    name: params.staff.staff3.first_name,
                    middleName: params.staff.staff3.middle_name
                });
                decorate.db.deleteUser({
                    lastName: params.staff.staff4.last_name,
                    name: params.staff.staff4.first_name,
                    middleName: params.staff.staff4.middle_name
                });
                decorate.db.truncateUserCar();
                decorate.db.truncateUserBarcode();
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
            });

            describe('Удаление посетителей', () => {
                decorate.db.truncateUserAdditionalFieldFata();
                decorate.db.truncateUserDocument();
                decorate.db.truncateUserStaff();
                decorate.db.truncateUserVisitor();
                decorate.db.deleteUser({
                    lastName: params.visitor.visitor1.last_name,
                    name: params.visitor.visitor1.first_name,
                    middleName: params.visitor.visitor1.middle_name
                });
                decorate.db.deleteUser({
                    lastName: params.svisitor.visitor2.last_name,
                    name: params.visitor.visitor2.first_name,
                    middleName: params.visitor.visitor2.middle_name
                });
                decorate.db.deleteUser({
                    lastName: params.visitor.visitor3.last_name,
                    name: params.visitor.visitor3.first_name,
                    middleName: params.visitor.visitor3.middle_name
                });
                decorate.db.truncateUserCar();
                decorate.db.truncateUserBarcode();
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
            });

            describe('Удаление должностей', () => {
                decorate.db.deletePosition({
                    name: params.positions.position1.name
                });
                decorate.db.deletePosition({
                    name: params.positions.position2.name
                });
                decorate.db.deletePosition({
                    name: params.positions.position3.name
                });
                decorate.db.deletePosition({
                    name: params.positions.position4.name
                });
            });

            describe('Удаление шаблонов доступа', () => {
                decorate.db.deleteAccessTemplate({
                    name: params.templates.template1
                });
                decorate.db.deleteAccessTemplate({
                    name: params.templates.template2
                });
                decorate.db.deleteAccessTemplate({
                    name: params.templates.template3
                });
                decorate.db.deleteAccessTemplate({
                    name: params.templates.template4
                });
            });

            describe('Удаление подразделений', () => {
                decorate.db.deleteDivision({
                    name: params.divisions.division1.name
                });
                decorate.db.deleteDivision({
                    name: params.divisions.division2.name
                });
                decorate.db.deleteDivision({
                    name: params.divisions.division3.name
                });
                decorate.db.deleteDivision({
                    name: params.divisions.division4.name
                });
            });

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
        addDataControlAccess,
        deleteDataControlAccess
    }
}

module.exports = {
    testAll: () => test('all', 'Все', befAll),
    testStaff: () => test('staff', 'Сотрудники', befStaff),
    testVisitor: () => test('visitor', 'Посетители', befVisitor),
    other: other()
}