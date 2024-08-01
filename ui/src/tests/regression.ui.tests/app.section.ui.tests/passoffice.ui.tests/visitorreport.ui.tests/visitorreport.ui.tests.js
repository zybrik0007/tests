const {describe, it} = require('mocha');

const entry = require('../../../../../../../entry');
const page = require('../../../../../pages');
const el = require('../../../../../elements');
const dec = require('../../../../../dictionaries/decorate');
const but = require('../../../../../dictionaries/button-icon');
const api = require('../../../../../dictionaries/api');
const decorate = require('../../../../../decorates');
const db = require('../../../../../database');
const data = require('./visitorreport.data');

const bef = () => decorate.befAft.before.beforeVisitorReport();
const aft = () => decorate.befAft.after.after();

const test = () => {

    const checkData = () => describe('Бюро пропусков / Отчет по посетителям. Проверка отображеня данных.', () => {

        bef();
        aft();

        describe('Общие проверки', () => {
            decorate.el.error.checkError({
                timeout: entry.sleep2
            });
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
                value: data.fio.visitor3,
                timeout: entry.max
            });
            decorate.el.table.cellGetText({
                headTitle: 'Документ',
                strNumber: 1,
                cellNumber: 2,
                value: data.visitor.visitor3.supporting_document,
                timeout: entry.max
            });
            decorate.el.table.cellGetText({
                headTitle: 'Номер документа',
                strNumber: 1,
                cellNumber: 3,
                value: data.visitor.visitor3.supporting_document_number,
                timeout: entry.max
            });
            decorate.el.table.cellGetText({
                headTitle: 'Подразделение',
                strNumber: 1,
                cellNumber: 4,
                value: data.divisions.division3.name,
                timeout: entry.max
            });
            decorate.el.table.cellGetText({
                headTitle: 'Сопровождающий',
                strNumber: 1,
                cellNumber: 5,
                value: '',
                timeout: entry.max
            });
            decorate.el.table.cellGetText({
                headTitle: 'Идентификатор',
                strNumber: 1,
                cellNumber: 6,
                value: data.visitor.visitor3.identifier[0].identifier,
                timeout: entry.max
            });
            decorate.el.table.cellGetText({
                headTitle: 'Действительно с',
                strNumber: 1,
                cellNumber: 7,
                value: data.visitor.visitor3.begin_datetime.slice(0, -9),
                timeout: entry.max
            });
            decorate.el.table.cellGetText({
                headTitle: 'Действительно до',
                strNumber: 1,
                cellNumber: 8,
                value: data.visitor.visitor3.end_datetime.slice(0, -9),
                timeout: entry.max
            });
            decorate.el.table.cellGetText({
                headTitle: 'Первое событие',
                strNumber: 1,
                cellNumber: 9,
                value: '',
                timeout: entry.max
            });
            decorate.el.table.cellGetText({
                headTitle: 'Последнее событие',
                strNumber: 1,
                cellNumber: 10,
                value: '',
                timeout: entry.max
            });
            decorate.el.table.cellGetText({
                headTitle: 'Дата архивирования',
                strNumber: 1,
                cellNumber: 11,
                value: '',
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
                headTitle: 'Документ',
                strNumber: 2,
                cellNumber: 2,
                value: data.visitor.visitor2.supporting_document,
                timeout: entry.max
            });
            decorate.el.table.cellGetText({
                headTitle: 'Номер документа',
                strNumber: 2,
                cellNumber: 3,
                value: data.visitor.visitor2.supporting_document_number,
                timeout: entry.max
            });
            decorate.el.table.cellGetText({
                headTitle: 'Подразделение',
                strNumber: 2,
                cellNumber: 4,
                value: data.divisions.division2.name,
                timeout: entry.max
            });
            decorate.el.table.cellGetText({
                headTitle: 'Сопровождающий',
                strNumber: 2,
                cellNumber: 5,
                value: '',
                timeout: entry.max
            });
            decorate.el.table.cellGetText({
                headTitle: 'Идентификатор',
                strNumber: 2,
                cellNumber: 6,
                value: data.visitor.visitor2.identifier[0].identifier,
                timeout: entry.max
            });
            decorate.el.table.cellGetText({
                headTitle: 'Действительно с',
                strNumber: 2,
                cellNumber: 7,
                value: data.visitor.visitor2.begin_datetime.slice(0, -9),
                timeout: entry.max
            });
            decorate.el.table.cellGetText({
                headTitle: 'Действительно до',
                strNumber: 2,
                cellNumber: 8,
                value: data.visitor.visitor2.end_datetime.slice(0, -9),
                timeout: entry.max
            });
            decorate.el.table.cellGetText({
                headTitle: 'Первое событие',
                strNumber: 2,
                cellNumber: 9,
                value: new Date().toLocaleDateString('fr-ca'),
                timeout: entry.max
            });
            decorate.el.table.cellGetText({
                headTitle: 'Последнее событие',
                strNumber: 2,
                cellNumber: 10,
                value: new Date().toLocaleDateString('fr-ca'),
                timeout: entry.max
            });
            decorate.el.table.cellGetText({
                headTitle: 'Дата архивирования',
                strNumber: 2,
                cellNumber: 11,
                value: '',
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
                headTitle: 'Документ',
                strNumber: 3,
                cellNumber: 2,
                value: data.visitor.visitor1.supporting_document,
                timeout: entry.max
            });
            decorate.el.table.cellGetText({
                headTitle: 'Номер документа',
                strNumber: 3,
                cellNumber: 3,
                value: data.visitor.visitor1.supporting_document_number,
                timeout: entry.max
            });
            decorate.el.table.cellGetText({
                headTitle: 'Подразделение',
                strNumber: 3,
                cellNumber: 4,
                value: data.divisions.division1.name,
                timeout: entry.max
            });
            decorate.el.table.cellGetText({
                headTitle: 'Сопровождающий',
                strNumber: 3,
                cellNumber: 5,
                value: '',
                timeout: entry.max
            });
            decorate.el.table.cellGetText({
                headTitle: 'Идентификатор',
                strNumber: 3,
                cellNumber: 6,
                value: data.visitor.visitor1.identifier[0].identifier,
                timeout: entry.max
            });
            decorate.el.table.cellGetText({
                headTitle: 'Действительно с',
                strNumber: 3,
                cellNumber: 7,
                value: data.visitor.visitor1.begin_datetime.slice(0, -9),
                timeout: entry.max
            });
            decorate.el.table.cellGetText({
                headTitle: 'Действительно до',
                strNumber: 3,
                cellNumber: 8,
                value: data.visitor.visitor1.end_datetime.slice(0, -9),
                timeout: entry.max
            });
            decorate.el.table.cellGetText({
                headTitle: 'Первое событие',
                strNumber: 3,
                cellNumber: 9,
                value: new Date().toLocaleDateString('fr-ca'),
                timeout: entry.max
            });
            decorate.el.table.cellGetText({
                headTitle: 'Последнее событие',
                strNumber: 3,
                cellNumber: 10,
                value: '',
                timeout: entry.max
            });
            decorate.el.table.cellGetText({
                headTitle: 'Дата архивирования',
                strNumber: 3,
                cellNumber: 11,
                value: '',
                timeout: entry.max
            });
        });

    });

    const filterDate = () => describe(`Бюро пропусков / Отчет по посетителям. Проверка фильтра по дате.`, () => {
        bef();
        aft();

        describe('Проверка таблицы до применения фильтра по дате', () => {
            decorate.el.table.size({
                strCount: 3,
                timeout: entry.max
            });
            decorate.el.table.cellGetText({
                headTitle: 'Первое событие',
                strNumber: 1,
                cellNumber: 9,
                value: '',
                timeout: entry.max
            });
            decorate.el.table.cellGetText({
                headTitle: 'Последнее событие',
                strNumber: 1,
                cellNumber: 10,
                value: '',
                timeout: entry.max
            });
            decorate.el.table.cellGetText({
                headTitle: 'Первое событие',
                strNumber: 2,
                cellNumber: 9,
                value: new Date().toLocaleDateString('fr-ca'),
                timeout: entry.max
            });
            decorate.el.table.cellGetText({
                headTitle: 'Последнее событие',
                strNumber: 2,
                cellNumber: 10,
                value: new Date().toLocaleDateString('fr-ca'),
                timeout: entry.max
            });
            decorate.el.table.cellGetText({
                headTitle: 'Первое событие',
                strNumber: 3,
                cellNumber: 9,
                value: new Date().toLocaleDateString('fr-ca'),
                timeout: entry.max
            });
            decorate.el.table.cellGetText({
                headTitle: 'Последнее событие',
                strNumber: 3,
                cellNumber: 10,
                value: '',
                timeout: entry.max
            });
        });

        describe('Выбор промежутка времени 2023-06-01 - 2023-06-07', () => {

            it(`Нажатие по фильтру выбора даты.`,
                async () => await dec.simple(el.input.handler,
                    ['', '', entry.max],
                    el.input));

            decorate.el.datepicker.dateRange({
                objStart: {
                    day: 1,
                    month: 'Июнь',
                    scrollYear: -500,
                    year: 2023
                },
                objEnd: {
                    day: 7,
                    month: 'Июнь',
                    scrollYear: -500,
                    year: 2023
                },
                timeout: entry.max
            });

            decorate.page.base.loading({
                timeout: entry.sleep2
            });

            decorate.el.error.checkError({
                timeout: entry.sleep2
            });

            it(`Отображение в календаре и выбранной даты 2023-06-01 – 2023-06-07`,
                async () => await dec.simpleText(el.input.getValue,
                    ['', '', entry.max],
                    '2023-06-01 – 2023-06-07',
                    el.input));
        });

        describe('Проверка таблицы после применения фильтра по дате', () => {
            decorate.el.table.size({
                strCount: 3,
                timeout: entry.max
            });
            decorate.el.table.cellGetText({
                headTitle: 'Первое событие',
                strNumber: 1,
                cellNumber: 9,
                value: data.june6Now,
                timeout: entry.max
            });
            decorate.el.table.cellGetText({
                headTitle: 'Последнее событие',
                strNumber: 1,
                cellNumber: 10,
                value: '',
                timeout: entry.max
            });
            decorate.el.table.cellGetText({
                headTitle: 'Первое событие',
                strNumber: 2,
                cellNumber: 9,
                value: data.june7Now,
                timeout: entry.max
            });
            decorate.el.table.cellGetText({
                headTitle: 'Последнее событие',
                strNumber: 2,
                cellNumber: 10,
                value: '',
                timeout: entry.max
            });
            decorate.el.table.cellGetText({
                headTitle: 'Первое событие',
                strNumber: 3,
                cellNumber: 9,
                value: '',
                timeout: entry.max
            });
            decorate.el.table.cellGetText({
                headTitle: 'Последнее событие',
                strNumber: 3,
                cellNumber: 10,
                value: '',
                timeout: entry.max
            });
        });
    });

    const divisionFilter = () => describe('Бюро пропусков / Отчет по посетителям. Проверка фильтра "Подразделение".',
        () => {

        bef();
        aft();

        describe('Проверка таблицы до изпользования фильтра "Подразделение"', () => {
            decorate.el.table.size({
                strCount: 3,
                timeout: entry.max
            });
            decorate.el.table.cellGetText({
                headTitle: 'Куда (подразделение)',
                strNumber: 1,
                cellNumber: 4,
                value: data.divisions.division3.name,
                timeout: entry.max
            });
            decorate.el.table.cellGetText({
                headTitle: 'Куда (подразделение)',
                strNumber: 2,
                cellNumber: 4,
                value: data.divisions.division2.name,
                timeout: entry.max
            });
            decorate.el.table.cellGetText({
                headTitle: 'Куда (подразделение)',
                strNumber: 3,
                cellNumber: 4,
                value: data.divisions.division1.name,
                timeout: entry.max
            });
        });

        describe(`Выбор в фильтре "${data.divisions.division2.name}" через окно выбора`, () => {
            decorate.el.selectInput.iconXpand({
                title: '',
                placeholder: 'Подразделение',
                timeout: entry.max
            });
            decorate.el.selectXpand.xpand({
                timeout: entry.max
            });
            decorate.el.selectXpand.handler({
                value: data.divisions.division2.name,
                timeout: entry.max
            });
            decorate.el.selectXpand.xpandNoElement({
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
            decorate.el.error.checkError({
                timeout: entry.sleep2
            });
        });

        describe('Проверка таблицы после изпользования фильтра "Подразделение" через окно выбора', () => {
            decorate.el.table.size({
                strCount: 1,
                timeout: entry.max
            });
            decorate.el.table.cellGetText({
                headTitle: 'Куда (подразделение)',
                strNumber: 1,
                cellNumber: 4,
                value: data.divisions.division2.name,
                timeout: entry.max
            });
        });

        describe(`Выбор в фильтре "${data.divisions.division1.name}" через модальное окно "Подразделение"`, () => {
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
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
            decorate.el.error.checkError({
                timeout: entry.sleep2
            });
        });

        describe('Проверка таблицы после изпользования фильтра "Подразделение" через модальное окно "Подразделение"',
            () => {
                decorate.el.table.size({
                    strCount: 1,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Куда (подразделение)',
                    strNumber: 1,
                    cellNumber: 4,
                    value: data.divisions.division1.name,
                    timeout: entry.max
                });
            });

    });

    const filterSearch = () => describe('Бюро пропусков / Отчет по посетителям. Проверка фильтра "Поиск...".', () => {

        bef();
        aft();

        describe('Проверка таблицы до изпользования фильтра "Поиск..."', () => {
            decorate.el.table.size({
                strCount: 3,
                timeout: entry.max
            });
            decorate.el.table.cellGetText({
                headTitle: 'ФИО',
                strNumber: 1,
                cellNumber: 1,
                value: data.fio.visitor3,
                timeout: entry.max
            });
            decorate.el.table.cellGetText({
                headTitle: 'ФИО',
                strNumber: 2,
                cellNumber: 1,
                value: data.fio.visitor2,
                timeout: entry.max
            });
            decorate.el.table.cellGetText({
                headTitle: 'ФИО',
                strNumber: 3,
                cellNumber: 1,
                value: data.fio.visitor1,
                timeout: entry.max
            });
        });

        describe(`Ввод в фильтр "${data.fio.visitor2}"`, () => {
            decorate.el.input.sendKeys({
                title: '',
                placeholder: 'Поиск...',
                value: data.fio.visitor2,
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
            decorate.page.base.enter();
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
                headTitle: 'ФИО',
                strNumber: 1,
                cellNumber: 1,
                value: data.fio.visitor2,
                timeout: entry.max
            });
        });

        describe(`Удаление "${data.fio.visitor2}" из фильтра "Поиск..." и проверка таблицы`, () => {
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
                strCount: 3,
                timeout: entry.max
            });
            decorate.el.table.cellGetText({
                headTitle: 'ФИО',
                strNumber: 1,
                cellNumber: 1,
                value: data.fio.visitor3,
                timeout: entry.max
            });
            decorate.el.table.cellGetText({
                headTitle: 'ФИО',
                strNumber: 2,
                cellNumber: 1,
                value: data.fio.visitor2,
                timeout: entry.max
            });
            decorate.el.table.cellGetText({
                headTitle: 'ФИО',
                strNumber: 3,
                cellNumber: 1,
                value: data.fio.visitor1,
                timeout: entry.max
            });
        });
    });

    const printTable = () => describe('Бюро пропусков / Отчет по посетителям. Проверка печати.', () => {

        bef();
        aft();

        describe('Открытие печатной формы', () => {
            decorate.el.butIcBefore.handler({
                icon: but.menu,
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
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

        describe('Проверка строки 1', () => {
            decorate.modal.printTable.cellGetText({
                head: 'ФИО',
                str: 1,
                cell: 1,
                value: data.fio.visitor3,
                timeout: entry.max
            });
            decorate.modal.printTable.cellGetText({
                head: 'Документ',
                str: 1,
                cell: 2,
                value: data.visitor.visitor3.supporting_document,
                timeout: entry.max
            });
            decorate.modal.printTable.cellGetText({
                head: 'Номер документа',
                str: 1,
                cell: 3,
                value: data.visitor.visitor3.supporting_document_number,
                timeout: entry.max
            });
            decorate.modal.printTable.cellGetText({
                head: 'Подразделение',
                str: 1,
                cell: 4,
                value: data.divisions.division3.name,
                timeout: entry.max
            });
            decorate.modal.printTable.cellGetText({
                head: 'Сопровождающий',
                str: 1,
                cell: 5,
                value: '',
                timeout: entry.max
            });
            decorate.modal.printTable.cellGetText({
                head: 'Идентификатор',
                str: 1,
                cell: 6,
                value: data.visitor.visitor3.identifier[0].identifier,
                timeout: entry.max
            });
            decorate.modal.printTable.cellGetText({
                head: 'Действительно с',
                str: 1,
                cell: 7,
                value: data.visitor.visitor1.begin_datetime,
                timeout: entry.max
            });
            decorate.modal.printTable.cellGetText({
                head: 'Действительно до',
                str: 1,
                cell: 8,
                value: data.visitor.visitor3.end_datetime,
                timeout: entry.max
            });
            decorate.modal.printTable.cellGetText({
                head: 'Дата архивирования',
                str: 1,
                cell: 9,
                value: '',
                timeout: entry.max
            });
        });

        describe('Закрытие печатной формы', () => {
            decorate.modal.printTable.closeHandler({
                timeout: entry.max
            });
            decorate.modal.printTable.initClose({
                timeout: entry.max
            });
        });

    });

    const exportXLSX = () => describe('Бюро пропусков / Отчет по посетителям. Проверка экспорта XLSX.', () => {

        const params = {
            nameFile: 'visitorreport.xlsx',
            jsonFile: [
                { 'Отчет "Отчет по посетителям"': '2023-06-01 - 2023-06-07' },
                {
                    'Отчет "Отчет по посетителям"': 'Фамилия',
                    __EMPTY: 'Имя',
                    __EMPTY_1: 'Отчество',
                    __EMPTY_2: 'Документ',
                    __EMPTY_3: 'Номер документа',
                    __EMPTY_4: 'Подразделение',
                    __EMPTY_5: 'Сопровождающий',
                    __EMPTY_6: 'Карта №',
                    __EMPTY_7: 'Действителен с',
                    __EMPTY_8: 'Действителен до',
                    __EMPTY_9: 'Первое событие',
                    __EMPTY_10: 'Последнее событие',
                    __EMPTY_11: 'Дата архивирования'
                },
                {
                    'Отчет "Отчет по посетителям"': 'visitor',
                    __EMPTY: 'name',
                    __EMPTY_1: '3',
                    __EMPTY_2: 'passport',
                    __EMPTY_3: '3',
                    __EMPTY_4: 'division3',
                    __EMPTY_5: '',
                    __EMPTY_6: '6',
                    __EMPTY_7: '2023-01-01 00:00:00',
                    __EMPTY_8: '2033-01-01 00:00:00',
                    __EMPTY_9: '2023-06-01 08:00:00',
                    __EMPTY_11: ''
                },
                {
                    'Отчет "Отчет по посетителям"': '2023-06-01, Чт',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: '',
                    __EMPTY_4: '',
                    __EMPTY_5: '',
                    __EMPTY_6: '',
                    __EMPTY_7: '',
                    __EMPTY_8: '',
                    __EMPTY_9: '2023-06-01 08:00:00',
                    __EMPTY_11: ''
                },
                {
                    'Отчет "Отчет по посетителям"': 'visitor',
                    __EMPTY: 'name',
                    __EMPTY_1: '2',
                    __EMPTY_2: 'passport',
                    __EMPTY_3: '2',
                    __EMPTY_4: 'division2',
                    __EMPTY_5: '',
                    __EMPTY_6: '5',
                    __EMPTY_7: '2023-01-01 00:00:00',
                    __EMPTY_8: '2033-01-01 00:00:00',
                    __EMPTY_9: '2023-06-07 09:00:00',
                    __EMPTY_11: ''
                },
                {
                    'Отчет "Отчет по посетителям"': '2023-06-07, Ср',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: '',
                    __EMPTY_4: '',
                    __EMPTY_5: '',
                    __EMPTY_6: '',
                    __EMPTY_7: '',
                    __EMPTY_8: '',
                    __EMPTY_9: '2023-06-07 09:00:00',
                    __EMPTY_11: ''
                },
                {
                    'Отчет "Отчет по посетителям"': 'visitor',
                    __EMPTY: 'name',
                    __EMPTY_1: '1',
                    __EMPTY_2: 'passport',
                    __EMPTY_3: '1',
                    __EMPTY_4: 'division1',
                    __EMPTY_5: '',
                    __EMPTY_6: '4',
                    __EMPTY_7: '2023-01-01 00:00:00',
                    __EMPTY_8: '2033-01-01 00:00:00',
                    __EMPTY_11: ''
                }
            ],
        }

        bef();
        aft();

        describe('Выбор промежутка времени 2023-06-01 - 2023-06-07', () => {

            decorate.page.base.loading({
                timeout: entry.sleep2
            });

            it(`Нажатие по фильтру выбора даты.`,
                async () => await dec.simple(el.input.handler,
                    ['', '', entry.max],
                    el.input));

            decorate.el.datepicker.dateRange({
                objStart: {
                    day: 1,
                    month: 'Июнь',
                    scrollYear: -500,
                    year: 2023
                },
                objEnd: {
                    day: 7,
                    month: 'Июнь',
                    scrollYear: -500,
                    year: 2023
                },
                timeout: entry.max
            });

            decorate.page.base.loading({
                timeout: entry.sleep2
            });

            it(`Отображение в календаре и выбранной даты 2023-06-01 – 2023-06-07`,
                async () => await dec.simpleText(el.input.getValue,
                    ['', '', entry.max],
                    '2023-06-01 – 2023-06-07',
                    el.input));
        });

        describe('Экспорт', () => {
            decorate.el.butIcBefore.handler({
                icon: but.menu,
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
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
            decorate.page.base.loading({
                timeout: entry.sleep2
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
            decorate.el.file.comparison({
                file: params.nameFile,
                json: params.jsonFile
            });
            decorate.el.file.delete({
                file: params.nameFile,
                timeout: entry.upload
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
        });
    });

    const exportCSV = () => describe('Бюро пропусков / Отчет по посетителям. Проверка экспорта CSV.', () => {

        const params = {
            nameFile: 'visitorreport.csv',
            jsonFile: [
                {
                    'Фамилия': 'visitor',
                    'Имя': 'name',
                    'Отчество': 3,
                    'Документ': 'passport',
                    'Номер документа': 3,
                    'Подразделение': 'division3',
                    'Карта №': 6,
                    'Действителен с': '2023-01-01 00:00:00',
                    'Действителен до': '2033-01-01 00:00:00',
                    'Первое событие': '2023-06-01 08:00:00'
                },
                {
                    'Фамилия': '2023-06-01, Чт',
                    'Первое событие': '2023-06-01 08:00:00'
                },
                {
                    'Фамилия': 'visitor',
                    'Имя': 'name',
                    'Отчество': 2,
                    'Документ': 'passport',
                    'Номер документа': 2,
                    'Подразделение': 'division2',
                    'Карта №': 5,
                    'Действителен с': '2023-01-01 00:00:00',
                    'Действителен до': '2033-01-01 00:00:00',
                    'Первое событие': '2023-06-07 09:00:00'
                },
                {
                    'Фамилия': '2023-06-07, Ср',
                    'Первое событие': '2023-06-07 09:00:00'
                },
                {
                    'Фамилия': 'visitor',
                    'Имя': 'name',
                    'Отчество': 1,
                    'Документ': 'passport',
                    'Номер документа': 1,
                    'Подразделение': 'division1',
                    'Карта №': 4,
                    'Действителен с': '2023-01-01 00:00:00',
                    'Действителен до': '2033-01-01 00:00:00'
                }
            ],
        }

        bef();
        aft();

        describe('Выбор промежутка времени 2023-06-01 - 2023-06-07', () => {

            decorate.page.base.loading({
                timeout: entry.sleep2
            });

            it(`Нажатие по фильтру выбора даты.`,
                async () => await dec.simple(el.input.handler,
                    ['', '', entry.max],
                    el.input));

            decorate.el.datepicker.dateRange({
                objStart: {
                    day: 1,
                    month: 'Июнь',
                    scrollYear: -500,
                    year: 2023
                },
                objEnd: {
                    day: 7,
                    month: 'Июнь',
                    scrollYear: -500,
                    year: 2023
                },
                timeout: entry.max
            });

            decorate.page.base.loading({
                timeout: entry.sleep2
            });

            it(`Отображение в календаре и выбранной даты 2023-06-01 – 2023-06-07`,
                async () => await dec.simpleText(el.input.getValue,
                    ['', '', entry.max],
                    '2023-06-01 – 2023-06-07',
                    el.input));
        });

        describe('Экспорт', () => {
            decorate.el.butIcBefore.handler({
                icon: but.menu,
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
            decorate.el.menu.menu({
                timeout: entry.max
            });
            decorate.el.menu.menu({
                timeout: entry.max
            });
            decorate.el.menu.handler({
                name: 'Экспорт',
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
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
            decorate.el.file.comparison({
                file: params.nameFile,
                json: params.jsonFile
            });
            decorate.el.file.delete({
                file: params.nameFile,
                timeout: entry.upload
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
        });
    });

    const resetFilter = () => describe('Бюро пропусков / Отчет по посетителям. Проверка "Сбросить фильтры".', () => {

        bef();
        aft();

        describe('Проверка таблицы до использования фильтров', () => {
            decorate.el.table.size({
                strCount: 3,
                timeout: entry.max
            });
        });

        describe(`Ввод в фильтр "${data.fio.visitor3}"`, () => {
            decorate.el.input.sendKeys({
                title: '',
                placeholder: 'Поиск...',
                value: data.fio.visitor2,
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
            decorate.page.base.enter();
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
        });

        describe(`Выбор в фильтре "${data.divisions.division3.name}" через окно выбора`, () => {
            decorate.el.selectInput.iconXpand({
                title: '',
                placeholder: 'Подразделение',
                timeout: entry.max
            });
            decorate.el.selectXpand.xpand({
                timeout: entry.max
            });
            decorate.el.selectXpand.handler({
                value: data.divisions.division3.name,
                timeout: entry.max
            });
            decorate.el.selectXpand.xpandNoElement({
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
        });

        describe('Проверка таблицы после использования фильтров', () => {
            decorate.el.table.size({
                strCount: 0,
                timeout: entry.max
            });
        });

        describe('Нажатие "Сбросить фильтра"', () => {
            decorate.el.butIcBefore.handler({
                icon: but.menu,
                timeout: entry.max
            });
            decorate.el.menu.menu({
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
            decorate.el.menu.menu({
                timeout: entry.max
            });
            decorate.el.menu.handler({
                name: 'Сбросить фильтры',
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
        });

        describe('Проверка таблицы', () => {
            decorate.el.table.size({
                strCount: 3,
                timeout: entry.max
            });
            decorate.el.input.getValue({
                title: '',
                placeholder: 'Поиск...',
                value: '',
                timeout: entry.max
            });
            decorate.el.input.getValue({
                title: '',
                placeholder: 'Подразделение',
                value: '',
                timeout: entry.max
            });
        });
    });

    return {
        checkData,
        divisionFilter,
        filterSearch,
        filterDate,
        printTable,
        exportXLSX,
        exportCSV,
        resetFilter
    }
}

const other = () => {
    const addDataVisitorReport = () => describe('Добавление данных для тестирования подраздела Отчет по посетителям',
        () => {
            const params = {...data }

            bef();
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
                it(`Добавление посетителя "${params.fio.visitor1}".`, async () => {
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

                it(`Добавление посетителя "${params.fio.visitor2}".`, async () => {
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

                it(`Добавление посетителя "${params.fio.visitor2}".`, async () => {
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

    const deleteDataVisitorReport = () => describe('Удаление данных для тестирование подраздела Отчет по посетителям',
        () => {
            const params = {...data }

            decorate.db.truncateEvent();

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
                    lastName: params.visitor.visitor2.last_name,
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
                    name: params.rooms.room3
                });
                decorate.db.deleteAccessZone({
                    name: params.rooms.room2
                });
                decorate.db.deleteAccessZone({
                    name: params.rooms.room1
                });
            });
        });

    return {
        addDataVisitorReport,
        deleteDataVisitorReport
    }
}

module.exports = {
    test: test(),
    other: other()
}