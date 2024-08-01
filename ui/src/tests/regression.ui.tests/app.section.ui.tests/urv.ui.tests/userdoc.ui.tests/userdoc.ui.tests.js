const {describe, it} = require('mocha');
const {expect} = require('chai');

const entry = require('../../../../../../../entry');
const page = require('../../../../../pages');
const dec = require('../../../../../dictionaries/decorate');
const sub = require('../../../../../dictionaries/subsection');
const but = require('../../../../../dictionaries/button-icon');
const api = require('../../../../../dictionaries/api');
const decItApi = require('../../../../../decorates/api-decorates/decorate-it-api');
const decorate = require('../../../../../decorates');
const db = require('../../../../../database');
const data = require('./userdoc.data');

const befSupporting = () => decorate.befAft.before.beforeUserDocSupporting();
const befPaidOvertime = () => decorate.befAft.before.beforeUserDocOvertime();
const aft = () => decorate.befAft.after.after();

const test = (type, text) => {

    const checkTable = () => describe(text + ' Проверка таблицы.', () => {
        if(type === 'support') {
            const arrHead = [
                'ФИО',
                'Подразделение',
                'Оператор',
                'Номер документа',
                'Добавляется к рабочему времени',
                'Наименование',
                'Дата ввода документа',
                'Продолжительность',
                'Начало действия',
                'Окончания действия'
            ];
            const arrData = [
                [
                    'staff name 1', 'division1', 'Администратор', '1', 'Да',
                    'Продолжительность работы вахтовым методом', '2023-03-25', '00:02:00', '2023-06-04', '2023-06-04'
                ],
                [
                    'staff name 1', 'division1', 'Администратор', '2', 'Нет',
                    'Дополнительные выходные дни (оплачиваемые)', '2023-03-25', '00:02:00', '2023-06-06', '2023-06-06'
                ],
                [
                    'staff name 2', 'division2', 'Администратор', '1', 'Да',
                    'Продолжительность работы вахтовым методом', '2023-03-25', '00:02:00', '2023-06-06', '2023-06-06'
                ],
                [
                    'staff name 2', 'division2', 'Администратор', '2', 'Нет',
                    'Дополнительные выходные дни (оплачиваемые)', '2023-03-25', '00:02:00', '2023-06-10', '2023-06-10'
                ],
            ];

            befSupporting();
            aft();

            describe('Выбор периода 01-06-2023 - 30-06-2023', () => {
                decorate.el.error.checkError({
                    timeout: entry.sleep2
                });
                decorate.el.input.iconCalendar({
                    title: '',
                    placeholder: '',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.datepicker.dateRange({
                    objStart: {
                        day: data.date.day1,
                        month: data.date.month,
                        year: data.date.year,
                        scrollYear: 500,
                    },
                    objEnd: {
                        day: data.date.day2,
                        month: data.date.month,
                        year: data.date.year,
                        scrollYear: 500,
                    },
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.error.checkError({
                    timeout: entry.sleep2
                });
                decorate.el.table.size({
                    strCount: 4,
                    timeout: entry.max
                });
            });

            describe('Проверка таблицы', () => {
                arrData.forEach((item1, index1) => {
                    describe(`Проверка строки ${index1 + 1}`, () => {
                        item1.forEach((item2, index2) => {
                            decorate.el.table.cellGetText({
                                headTitle: arrHead[index2],
                                strNumber: index1 + 1,
                                cellNumber: index2 + 1,
                                value: item2,
                                timeout: entry.max
                            });
                        });
                    });
                });
            });
        }

        if(type === 'paid') {
            const arrHead = [
                'ФИО',
                'Подразделение',
                'Оператор',
                'Номер документа',
                'Наименование',
                'Дата ввода документа',
                'Продолжительность',
                'Начало действия',
                'Окончания действия'
            ];
            const arrData = [
                [
                    'staff name 1', 'division1', 'Администратор', '4', 'Продолжительность сверхурочной работы',
                    '2023-03-25', '00:02:00', '2023-06-10', '2023-06-10'
                ],
                [
                    'staff name 2', 'division2', 'Администратор', '4', 'Продолжительность сверхурочной работы',
                    '2023-03-25', '00:02:00', '2023-06-18', '2023-06-18'
                ],
                [
                    'staff name 4', 'division4', 'Администратор', '4', 'Продолжительность сверхурочной работы',
                    '2023-03-25', '00:02:00', '2023-06-11', '2023-06-11'
                ],
                [
                    'staff name 5', 'division5', 'Администратор', '4', 'Продолжительность сверхурочной работы',
                    '2023-03-25', '00:02:00', '2023-06-02', '2023-06-02'
                ],
            ];

            befPaidOvertime();
            aft();

            describe('Выбор периода 01-06-2023 - 30-06-2023', () => {
                decorate.el.error.checkError({
                    timeout: entry.sleep2
                });
                decorate.el.input.iconCalendar({
                    title: '',
                    placeholder: '',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.datepicker.dateRange({
                    objStart: {
                        day: data.date.day1,
                        month: data.date.month,
                        year: data.date.year,
                        scrollYear: 500,
                    },
                    objEnd: {
                        day: data.date.day2,
                        month: data.date.month,
                        year: data.date.year,
                        scrollYear: 500,
                    },
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.error.checkError({
                    timeout: entry.sleep2
                });
                decorate.el.table.size({
                    strCount: 4,
                    timeout: entry.max
                });
            });

            describe('Проверка таблицы', () => {
                arrData.forEach((item1, index1) => {
                    describe(`Проверка строки ${index1 + 1}`, () => {
                        item1.forEach((item2, index2) => {
                            decorate.el.table.cellGetText({
                                headTitle: arrHead[index2],
                                strNumber: index1 + 1,
                                cellNumber: index2 + 1,
                                value: item2,
                                timeout: entry.max
                            });
                        });
                    });
                });
            });
        }
    });

    const printTable = () => describe(text +  ' Проверка печати.', () => {
        if(type === 'support') {
            befSupporting();
            aft();

            describe('Выбор периода 01-06-2023 - 30-06-2023', () => {
                decorate.el.input.iconCalendar({
                    title: '',
                    placeholder: '',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.datepicker.dateRange({
                    objStart: {
                        day: data.date.day1,
                        month: data.date.month,
                        year: data.date.year,
                        scrollYear: 500,
                    },
                    objEnd: {
                        day: data.date.day2,
                        month: data.date.month,
                        year: data.date.year,
                        scrollYear: 500,
                    },
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.table.size({
                    strCount: 4,
                    timeout: entry.max
                });
            });

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

            describe('Проверка таблицы', () => {
                decorate.modal.printTable.cellGetText({
                    head: 'ФИО',
                    str: 1,
                    cell: 1,
                    value: 'staff name 1',
                    timeout: entry.max
                });
                decorate.modal.printTable.cellGetText({
                    head: 'Подразделение',
                    str: 1,
                    cell: 2,
                    value: 'division1',
                    timeout: entry.max
                });
                decorate.modal.printTable.cellGetText({
                    head: 'Оператор',
                    str: 1,
                    cell: 3,
                    value: 'Администратор',
                    timeout: entry.max
                });
                decorate.modal.printTable.cellGetText({
                    head: 'Номер документа',
                    str: 1,
                    cell: 4,
                    value: '1',
                    timeout: entry.max
                });
                decorate.modal.printTable.cellGetText({
                    head: 'Добавляется к рабочему времени',
                    str: 1,
                    cell: 5,
                    value: 'Да',
                    timeout: entry.max
                });
                decorate.modal.printTable.cellGetText({
                    head: 'Наименование',
                    str: 1,
                    cell: 6,
                    value: 'Продолжительность работы вахтовым методом',
                    timeout: entry.max
                });
                decorate.modal.printTable.cellGetText({
                    head: 'Дата ввода документа',
                    str: 1,
                    cell: 7,
                    value: '2023-03-25',
                    timeout: entry.max
                });
                decorate.modal.printTable.cellGetText({
                    head: 'Продолжительность',
                    str: 1,
                    cell: 8,
                    value: '00:02:00',
                    timeout: entry.max
                });
                decorate.modal.printTable.cellGetText({
                    head: 'Начало действия',
                    str: 1,
                    cell: 9,
                    value: '2023-06-04',
                    timeout: entry.max
                });
                decorate.modal.printTable.cellGetText({
                    head: 'Окончание действия',
                    str: 1,
                    cell: 10,
                    value: '2023-06-04',
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

        }

        if(type === 'paid') {
            befPaidOvertime();
            aft();

            describe('Выбор периода 01-06-2023 - 30-06-2023', () => {
                decorate.el.input.iconCalendar({
                    title: '',
                    placeholder: '',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.datepicker.dateRange({
                    objStart: {
                        day: data.date.day1,
                        month: data.date.month,
                        year: data.date.year,
                        scrollYear: 500,
                    },
                    objEnd: {
                        day: data.date.day2,
                        month: data.date.month,
                        year: data.date.year,
                        scrollYear: 500,
                    },
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.table.size({
                    strCount: 4,
                    timeout: entry.max
                });
            });

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

            describe('Проверка таблицы', () => {
                decorate.modal.printTable.cellGetText({
                    head: 'ФИО',
                    str: 1,
                    cell: 1,
                    value: 'staff name 1',
                    timeout: entry.max
                });
                decorate.modal.printTable.cellGetText({
                    head: 'Подразделение',
                    str: 1,
                    cell: 2,
                    value: 'division1',
                    timeout: entry.max
                });
                decorate.modal.printTable.cellGetText({
                    head: 'Оператор',
                    str: 1,
                    cell: 3,
                    value: 'Администратор',
                    timeout: entry.max
                });
                decorate.modal.printTable.cellGetText({
                    head: 'Номер документа',
                    str: 1,
                    cell: 4,
                    value: '4',
                    timeout: entry.max
                });
                decorate.modal.printTable.cellGetText({
                    head: 'Наименование',
                    str: 1,
                    cell: 5,
                    value: 'Продолжительность сверхурочной работы',
                    timeout: entry.max
                });
                decorate.modal.printTable.cellGetText({
                    head: 'Дата ввода документа',
                    str: 1,
                    cell: 6,
                    value: '2023-03-25',
                    timeout: entry.max
                });
                decorate.modal.printTable.cellGetText({
                    head: 'Продолжительность',
                    str: 1,
                    cell: 7,
                    value: '00:02:00',
                    timeout: entry.max
                });
                decorate.modal.printTable.cellGetText({
                    head: 'Начало действия',
                    str: 1,
                    cell: 8,
                    value: '2023-06-10',
                    timeout: entry.max
                });
                decorate.modal.printTable.cellGetText({
                    head: 'Окончание действия',
                    str: 1,
                    cell: 9,
                    value: '2023-06-10',
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
        }
    });

    const exportXLSX = () => describe(text +  ' Проверка экспорта в XLSX.', () => {
        if(type === 'support') {
            const params = {
                nameFile: 'extraissueddocumentsreport.xlsx',
                json: [
                    { 'Отчет "Оправдательные документы"': '2023-06-01 - 2023-06-30' },
                    {
                        'Отчет "Оправдательные документы"': 'Фамилия',
                        __EMPTY: 'Имя',
                        __EMPTY_1: 'Отчество',
                        __EMPTY_2: 'Подразделение',
                        __EMPTY_3: 'Оператор',
                        __EMPTY_4: 'Номер документа',
                        __EMPTY_5: 'Добавляется к рабочему времени',
                        __EMPTY_6: 'Наименование',
                        __EMPTY_7: 'Дата ввода документа',
                        __EMPTY_8: 'Продолжительность',
                        __EMPTY_9: 'Начало действия',
                        __EMPTY_10: 'Окончание действия'
                    },
                    {
                        'Отчет "Оправдательные документы"': 'staff',
                        __EMPTY: 'name',
                        __EMPTY_1: '1',
                        __EMPTY_2: 'division1',
                        __EMPTY_3: 'Администратор  ',
                        __EMPTY_4: '1',
                        __EMPTY_5: 'Да',
                        __EMPTY_6: 'Продолжительность работы вахтовым методом',
                        __EMPTY_7: '2023-03-25',
                        __EMPTY_8: '00:02:00',
                        __EMPTY_9: '2023-06-04',
                        __EMPTY_10: '2023-06-04'
                    },
                    {
                        'Отчет "Оправдательные документы"': 'staff',
                        __EMPTY: 'name',
                        __EMPTY_1: '1',
                        __EMPTY_2: 'division1',
                        __EMPTY_3: 'Администратор  ',
                        __EMPTY_4: '2',
                        __EMPTY_5: 'Нет',
                        __EMPTY_6: 'Дополнительные выходные дни (оплачиваемые)',
                        __EMPTY_7: '2023-03-25',
                        __EMPTY_8: '00:02:00',
                        __EMPTY_9: '2023-06-06',
                        __EMPTY_10: '2023-06-06'
                    },
                    {
                        'Отчет "Оправдательные документы"': 'staff',
                        __EMPTY: 'name',
                        __EMPTY_1: '2',
                        __EMPTY_2: 'division2',
                        __EMPTY_3: 'Администратор  ',
                        __EMPTY_4: '1',
                        __EMPTY_5: 'Да',
                        __EMPTY_6: 'Продолжительность работы вахтовым методом',
                        __EMPTY_7: '2023-03-25',
                        __EMPTY_8: '00:02:00',
                        __EMPTY_9: '2023-06-06',
                        __EMPTY_10: '2023-06-06'
                    },
                    {
                        'Отчет "Оправдательные документы"': 'staff',
                        __EMPTY: 'name',
                        __EMPTY_1: '2',
                        __EMPTY_2: 'division2',
                        __EMPTY_3: 'Администратор  ',
                        __EMPTY_4: '2',
                        __EMPTY_5: 'Нет',
                        __EMPTY_6: 'Дополнительные выходные дни (оплачиваемые)',
                        __EMPTY_7: '2023-03-25',
                        __EMPTY_8: '00:02:00',
                        __EMPTY_9: '2023-06-10',
                        __EMPTY_10: '2023-06-10'
                    }
                ]
            }

            befSupporting();
            aft();

            describe('Выбор периода 01-06-2023 - 30-06-2023', () => {
                decorate.el.input.iconCalendar({
                    title: '',
                    placeholder: '',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.datepicker.dateRange({
                    objStart: {
                        day: data.date.day1,
                        month: data.date.month,
                        year: data.date.year,
                        scrollYear: 500,
                    },
                    objEnd: {
                        day: data.date.day2,
                        month: data.date.month,
                        year: data.date.year,
                        scrollYear: 500,
                    },
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.table.size({
                    strCount: 4,
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
                decorate.el.error.checkError({
                    timeout: entry.sleep2
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
                decorate.el.file.comparison({
                    file: params.nameFile,
                    json: params.json
                });
                decorate.el.file.delete({
                    file: params.nameFile,
                    timeout: entry.upload
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
            });
        }

        if(type === 'paid') {
            const params = {
                nameFile: 'extraissueddocumentsreport.xlsx',
                json: [
                    { 'Отчет "Оправдательные документы"': '2023-06-01 - 2023-06-30' },
                    {
                        'Отчет "Оправдательные документы"': 'Фамилия',
                        __EMPTY: 'Имя',
                        __EMPTY_1: 'Отчество',
                        __EMPTY_2: 'Подразделение',
                        __EMPTY_3: 'Оператор',
                        __EMPTY_4: 'Номер документа',
                        __EMPTY_5: 'Наименование',
                        __EMPTY_6: 'Дата ввода документа',
                        __EMPTY_7: 'Продолжительность',
                        __EMPTY_8: 'Начало действия',
                        __EMPTY_9: 'Окончание действия'
                    },
                    {
                        'Отчет "Оправдательные документы"': 'staff',
                        __EMPTY: 'name',
                        __EMPTY_1: '1',
                        __EMPTY_2: 'division1',
                        __EMPTY_3: 'Администратор  ',
                        __EMPTY_4: '4',
                        __EMPTY_5: 'Продолжительность сверхурочной работы',
                        __EMPTY_6: '2023-03-25',
                        __EMPTY_7: '00:02:00',
                        __EMPTY_8: '2023-06-10',
                        __EMPTY_9: '2023-06-10'
                    },
                    {
                        'Отчет "Оправдательные документы"': 'staff',
                        __EMPTY: 'name',
                        __EMPTY_1: '2',
                        __EMPTY_2: 'division2',
                        __EMPTY_3: 'Администратор  ',
                        __EMPTY_4: '4',
                        __EMPTY_5: 'Продолжительность сверхурочной работы',
                        __EMPTY_6: '2023-03-25',
                        __EMPTY_7: '00:02:00',
                        __EMPTY_8: '2023-06-18',
                        __EMPTY_9: '2023-06-18'
                    },
                    {
                        'Отчет "Оправдательные документы"': 'staff',
                        __EMPTY: 'name',
                        __EMPTY_1: '4',
                        __EMPTY_2: 'division4',
                        __EMPTY_3: 'Администратор  ',
                        __EMPTY_4: '4',
                        __EMPTY_5: 'Продолжительность сверхурочной работы',
                        __EMPTY_6: '2023-03-25',
                        __EMPTY_7: '00:02:00',
                        __EMPTY_8: '2023-06-11',
                        __EMPTY_9: '2023-06-11'
                    },
                    {
                        'Отчет "Оправдательные документы"': 'staff',
                        __EMPTY: 'name',
                        __EMPTY_1: '5',
                        __EMPTY_2: 'division5',
                        __EMPTY_3: 'Администратор  ',
                        __EMPTY_4: '4',
                        __EMPTY_5: 'Продолжительность сверхурочной работы',
                        __EMPTY_6: '2023-03-25',
                        __EMPTY_7: '00:02:00',
                        __EMPTY_8: '2023-06-02',
                        __EMPTY_9: '2023-06-02'
                    }
                ]
            }

            befPaidOvertime();
            aft();

            describe('Выбор периода 01-06-2023 - 30-06-2023', () => {
                decorate.el.input.iconCalendar({
                    title: '',
                    placeholder: '',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.datepicker.dateRange({
                    objStart: {
                        day: data.date.day1,
                        month: data.date.month,
                        year: data.date.year,
                        scrollYear: 500,
                    },
                    objEnd: {
                        day: data.date.day2,
                        month: data.date.month,
                        year: data.date.year,
                        scrollYear: 500,
                    },
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.table.size({
                    strCount: 4,
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
                decorate.el.error.checkError({
                    timeout: entry.sleep2
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
                decorate.el.file.comparison({
                    file: params.nameFile,
                    json: params.json
                });
                decorate.el.file.delete({
                    file: params.nameFile,
                    timeout: entry.upload
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
            });
        }
    });

    const exportCSV = () => describe(text +  ' Проверка экспорта в CSV.', () => {
        if(type === 'support') {
            const params = {
                nameFile: 'extraissueddocumentsreport.csv',
                json: [
                    {
                        'Фамилия': 'staff',
                        'Имя': 'name',
                        'Отчество': 1,
                        'Подразделение': 'division1',
                        'Оператор': 'Администратор  ',
                        'Номер документа': 1,
                        'Добавляется к рабочему времени': 'Да',
                        'Наименование': 'Продолжительность работы вахтовым методом',
                        'Дата ввода документа': 45010.12519675926,
                        'Продолжительность': '00:02:00',
                        'Начало действия': 45081.12519675926,
                        'Окончание действия': 45081.12519675926
                    },
                    {
                        'Фамилия': 'staff',
                        'Имя': 'name',
                        'Отчество': 1,
                        'Подразделение': 'division1',
                        'Оператор': 'Администратор  ',
                        'Номер документа': 2,
                        'Добавляется к рабочему времени': 'Нет',
                        'Наименование': 'Дополнительные выходные дни (оплачиваемые)',
                        'Дата ввода документа': 45010.12519675926,
                        'Продолжительность': '00:02:00',
                        'Начало действия': 45083.12519675926,
                        'Окончание действия': 45083.12519675926
                    },
                    {
                        'Фамилия': 'staff',
                        'Имя': 'name',
                        'Отчество': 2,
                        'Подразделение': 'division2',
                        'Оператор': 'Администратор  ',
                        'Номер документа': 1,
                        'Добавляется к рабочему времени': 'Да',
                        'Наименование': 'Продолжительность работы вахтовым методом',
                        'Дата ввода документа': 45010.12519675926,
                        'Продолжительность': '00:02:00',
                        'Начало действия': 45083.12519675926,
                        'Окончание действия': 45083.12519675926
                    },
                    {
                        'Фамилия': 'staff',
                        'Имя': 'name',
                        'Отчество': 2,
                        'Подразделение': 'division2',
                        'Оператор': 'Администратор  ',
                        'Номер документа': 2,
                        'Добавляется к рабочему времени': 'Нет',
                        'Наименование': 'Дополнительные выходные дни (оплачиваемые)',
                        'Дата ввода документа': 45010.12519675926,
                        'Продолжительность': '00:02:00',
                        'Начало действия': 45087.12519675926,
                        'Окончание действия': 45087.12519675926
                    }
                ]
            }

            befSupporting();
            aft();

            describe('Выбор периода 01-06-2023 - 30-06-2023', () => {
                decorate.el.input.iconCalendar({
                    title: '',
                    placeholder: '',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.datepicker.dateRange({
                    objStart: {
                        day: data.date.day1,
                        month: data.date.month,
                        year: data.date.year,
                        scrollYear: 500,
                    },
                    objEnd: {
                        day: data.date.day2,
                        month: data.date.month,
                        year: data.date.year,
                        scrollYear: 500,
                    },
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.table.size({
                    strCount: 4,
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
                decorate.el.error.checkError({
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
                    json: params.json
                });
                decorate.el.file.delete({
                    file: params.nameFile,
                    timeout: entry.upload
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
            });

        }

        if(type === 'paid') {
            const params = {
                nameFile: 'extraissueddocumentsreport.csv',
                json: [
                    {
                        'Фамилия': 'staff',
                        'Имя': 'name',
                        'Отчество': 1,
                        'Подразделение': 'division1',
                        'Оператор': 'Администратор  ',
                        'Номер документа': 4,
                        'Наименование': 'Продолжительность сверхурочной работы',
                        'Дата ввода документа': 45010.12519675926,
                        'Продолжительность': '00:02:00',
                        'Начало действия': 45087.12519675926,
                        'Окончание действия': 45087.12519675926
                    },
                    {
                        'Фамилия': 'staff',
                        'Имя': 'name',
                        'Отчество': 2,
                        'Подразделение': 'division2',
                        'Оператор': 'Администратор  ',
                        'Номер документа': 4,
                        'Наименование': 'Продолжительность сверхурочной работы',
                        'Дата ввода документа': 45010.12519675926,
                        'Продолжительность': '00:02:00',
                        'Начало действия': 45095.12519675926,
                        'Окончание действия': 45095.12519675926
                    },
                    {
                        'Фамилия': 'staff',
                        'Имя': 'name',
                        'Отчество': 4,
                        'Подразделение': 'division4',
                        'Оператор': 'Администратор  ',
                        'Номер документа': 4,
                        'Наименование': 'Продолжительность сверхурочной работы',
                        'Дата ввода документа': 45010.12519675926,
                        'Продолжительность': '00:02:00',
                        'Начало действия': 45088.12519675926,
                        'Окончание действия': 45088.12519675926
                    },
                    {
                        'Фамилия': 'staff',
                        'Имя': 'name',
                        'Отчество': 5,
                        'Подразделение': 'division5',
                        'Оператор': 'Администратор  ',
                        'Номер документа': 4,
                        'Наименование': 'Продолжительность сверхурочной работы',
                        'Дата ввода документа': 45010.12519675926,
                        'Продолжительность': '00:02:00',
                        'Начало действия': 45079.12519675926,
                        'Окончание действия': 45079.12519675926
                    }
                ]
            }

            befPaidOvertime();
            aft();

            describe('Выбор периода 01-06-2023 - 30-06-2023', () => {
                decorate.el.input.iconCalendar({
                    title: '',
                    placeholder: '',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.datepicker.dateRange({
                    objStart: {
                        day: data.date.day1,
                        month: data.date.month,
                        year: data.date.year,
                        scrollYear: 500,
                    },
                    objEnd: {
                        day: data.date.day2,
                        month: data.date.month,
                        year: data.date.year,
                        scrollYear: 500,
                    },
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.table.size({
                    strCount: 4,
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
                decorate.el.error.checkError({
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
                    json: params.json
                });
                decorate.el.file.delete({
                    file: params.nameFile,
                    timeout: entry.upload
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
            });
        }
    });

    const divisionFilter = () => describe(text +  ' Проверка фильтра по подразделению', () => {
        if(type === 'support') {
            befSupporting();
            aft();

            describe('Выбор периода 01-06-2023 - 30-06-2023', () => {
                decorate.el.input.iconCalendar({
                    title: '',
                    placeholder: '',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.datepicker.dateRange({
                    objStart: {
                        day: data.date.day1,
                        month: data.date.month,
                        year: data.date.year,
                        scrollYear: 500,
                    },
                    objEnd: {
                        day: data.date.day2,
                        month: data.date.month,
                        year: data.date.year,
                        scrollYear: 500,
                    },
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.table.size({
                    strCount: 4,
                    timeout: entry.max
                });
            });

            describe('Проверка таблицы до использования фильтра "Подразделение"', () => {
                decorate.el.table.size({
                    strCount: 4,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Подразделение',
                    strNumber: 1,
                    cellNumber: 2,
                    value: data.divisions.division1.name,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Подразделение',
                    strNumber: 2,
                    cellNumber: 2,
                    value: data.divisions.division1.name,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Подразделение',
                    strNumber: 3,
                    cellNumber: 2,
                    value: data.divisions.division2.name,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Подразделение',
                    strNumber: 4,
                    cellNumber: 2,
                    value: data.divisions.division2.name,
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

            describe('Проверка таблицы после использования фильтра "Подразделение" через окно выбора', () => {
                decorate.el.table.size({
                    strCount: 2,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Подразделение',
                    strNumber: 1,
                    cellNumber: 2,
                    value: data.divisions.division2.name,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Подразделение',
                    strNumber: 2,
                    cellNumber: 2,
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
                        strCount: 2,
                        timeout: entry.max
                    });
                    decorate.el.table.cellGetText({
                        headTitle: 'Подразделение',
                        strNumber: 1,
                        cellNumber: 2,
                        value: data.divisions.division1.name,
                        timeout: entry.max
                    });
                    decorate.el.table.cellGetText({
                        headTitle: 'Подразделение',
                        strNumber: 2,
                        cellNumber: 2,
                        value: data.divisions.division1.name,
                        timeout: entry.max
                    });
                });
        }

        if(type === 'paid') {
            befPaidOvertime();
            aft();

            describe('Выбор периода 01-06-2023 - 30-06-2023', () => {
                decorate.el.input.iconCalendar({
                    title: '',
                    placeholder: '',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.datepicker.dateRange({
                    objStart: {
                        day: data.date.day1,
                        month: data.date.month,
                        year: data.date.year,
                        scrollYear: 500,
                    },
                    objEnd: {
                        day: data.date.day2,
                        month: data.date.month,
                        year: data.date.year,
                        scrollYear: 500,
                    },
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.table.size({
                    strCount: 4,
                    timeout: entry.max
                });
            });

            describe('Проверка таблицы до изпользования фильтра "Подразделение"', () => {
                decorate.el.table.size({
                    strCount: 4,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Подразделение',
                    strNumber: 1,
                    cellNumber: 2,
                    value: data.divisions.division1.name,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Подразделение',
                    strNumber: 2,
                    cellNumber: 2,
                    value: data.divisions.division2.name,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Подразделение',
                    strNumber: 3,
                    cellNumber: 2,
                    value: data.divisions.division4.name,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Подразделение',
                    strNumber: 4,
                    cellNumber: 2,
                    value: data.divisions.division5.name,
                    timeout: entry.max
                });
            });

            describe(`Выбор в фильтре "${data.divisions.division5.name}" через окно выбора`, () => {
                decorate.el.selectInput.iconXpand({
                    title: '',
                    placeholder: 'Подразделение',
                    timeout: entry.max
                });
                decorate.el.selectXpand.xpand({
                    timeout: entry.max
                });
                decorate.el.selectXpand.handler({
                    value: data.divisions.division5.name,
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
                    headTitle: 'Подразделение',
                    strNumber: 1,
                    cellNumber: 2,
                    value: data.divisions.division5.name,
                    timeout: entry.max
                });
            });

            describe(`Выбор в фильтре "${data.divisions.division4.name}" через модальное окно "Подразделение"`, () => {
                decorate.el.selectInput.iconOutline({
                    title: '',
                    placeholder: 'Подразделение',
                    timeout: entry.max
                });
                decorate.modal.divisionFilter.init({
                    timeout: entry.max
                });
                decorate.el.filterTreeNode.handler({
                    name: data.divisions.division4.name,
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
                        headTitle: 'Подразделение',
                        strNumber: 1,
                        cellNumber: 2,
                        value: data.divisions.division4.name,
                        timeout: entry.max
                    });
                });
        }
    });

    const searchFilter = () => describe(text +  ' Проверка фильтра "Поиск...".', () => {
        if(type === 'support') {
            befSupporting();
            aft();

            describe('Выбор периода 01-06-2023 - 30-06-2023', () => {
                decorate.el.input.iconCalendar({
                    title: '',
                    placeholder: '',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.datepicker.dateRange({
                    objStart: {
                        day: data.date.day1,
                        month: data.date.month,
                        year: data.date.year,
                        scrollYear: 500,
                    },
                    objEnd: {
                        day: data.date.day2,
                        month: data.date.month,
                        year: data.date.year,
                        scrollYear: 500,
                    },
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.table.size({
                    strCount: 4,
                    timeout: entry.max
                });
            });

            describe('Проверка таблицы до использования фильтра "Поиск..."', () => {
                decorate.el.table.size({
                    strCount: 4,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'ФИО',
                    strNumber: 1,
                    cellNumber: 1,
                    value: data.fio.staff1,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'ФИО',
                    strNumber: 2,
                    cellNumber: 1,
                    value: data.fio.staff1,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'ФИО',
                    strNumber: 3,
                    cellNumber: 1,
                    value: data.fio.staff2,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'ФИО',
                    strNumber: 4,
                    cellNumber: 1,
                    value: data.fio.staff2,
                    timeout: entry.max
                });
            });

            describe(`Ввод в фильтр "${data.fio.staff2}"`, () => {
                decorate.el.input.sendKeys({
                    title: '',
                    placeholder: 'Поиск...',
                    value: data.fio.staff2,
                    timeout: entry.max
                });
                decorate.el.error.checkError({
                    timeout: entry.sleep2
                });
            });

            describe('Проверка таблицы после использования фильтра "Поиск..."', () => {
                decorate.el.table.size({
                    strCount: 2,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'ФИО',
                    strNumber: 1,
                    cellNumber: 1,
                    value: data.fio.staff2,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'ФИО',
                    strNumber: 2,
                    cellNumber: 1,
                    value: data.fio.staff2,
                    timeout: entry.max
                });
            });

            describe(`Удаление "${data.fio.staff2}" из фильтра "Поиск..." и проверка таблицы`, () => {
                decorate.el.input.backSpace({
                    title: '',
                    placeholder: 'Поиск...',
                    timeout: entry.max
                });
                decorate.el.error.checkError({
                    timeout: entry.sleep2
                });
                dec.animation();
                decorate.el.table.size({
                    strCount: 4,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'ФИО',
                    strNumber: 1,
                    cellNumber: 1,
                    value: data.fio.staff1,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'ФИО',
                    strNumber: 2,
                    cellNumber: 1,
                    value: data.fio.staff1,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'ФИО',
                    strNumber: 3,
                    cellNumber: 1,
                    value: data.fio.staff2,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'ФИО',
                    strNumber: 4,
                    cellNumber: 1,
                    value: data.fio.staff2,
                    timeout: entry.max
                });
            });
        }

        if(type === 'paid') {
            befPaidOvertime();
            aft();

            describe('Выбор периода 01-06-2023 - 30-06-2023', () => {
                decorate.el.input.iconCalendar({
                    title: '',
                    placeholder: '',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.datepicker.dateRange({
                    objStart: {
                        day: data.date.day1,
                        month: data.date.month,
                        year: data.date.year,
                        scrollYear: 500,
                    },
                    objEnd: {
                        day: data.date.day2,
                        month: data.date.month,
                        year: data.date.year,
                        scrollYear: 500,
                    },
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.table.size({
                    strCount: 4,
                    timeout: entry.max
                });
            });

            describe('Проверка таблицы до использования фильтра "Поиск..."', () => {
                decorate.el.table.size({
                    strCount: 4,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'ФИО',
                    strNumber: 1,
                    cellNumber: 1,
                    value: data.fio.staff1,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'ФИО',
                    strNumber: 2,
                    cellNumber: 1,
                    value: data.fio.staff2,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'ФИО',
                    strNumber: 3,
                    cellNumber: 1,
                    value: data.fio.staff4,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'ФИО',
                    strNumber: 4,
                    cellNumber: 1,
                    value: data.fio.staff5,
                    timeout: entry.max
                });
            });

            describe(`Ввод в фильтр "${data.fio.staff2}"`, () => {
                decorate.el.input.sendKeys({
                    title: '',
                    placeholder: 'Поиск...',
                    value: data.fio.staff2,
                    timeout: entry.max
                });
                decorate.el.error.checkError({
                    timeout: entry.sleep2
                });
            });

            describe('Проверка таблицы после использования фильтра "Поиск..."', () => {
                decorate.el.table.size({
                    strCount: 1,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'ФИО',
                    strNumber: 1,
                    cellNumber: 1,
                    value: data.fio.staff2,
                    timeout: entry.max
                });
            });

            describe(`Удаление "${data.fio.staff2}" из фильтра "Поиск..." и проверка таблицы`, () => {
                decorate.el.input.backSpace({
                    title: '',
                    placeholder: 'Поиск...',
                    timeout: entry.max
                });
                decorate.el.error.checkError({
                    timeout: entry.sleep2
                });
                dec.animation();
                decorate.el.table.size({
                    strCount: 4,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'ФИО',
                    strNumber: 1,
                    cellNumber: 1,
                    value: data.fio.staff1,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'ФИО',
                    strNumber: 2,
                    cellNumber: 1,
                    value: data.fio.staff2,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'ФИО',
                    strNumber: 3,
                    cellNumber: 1,
                    value: data.fio.staff4,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'ФИО',
                    strNumber: 4,
                    cellNumber: 1,
                    value: data.fio.staff5,
                    timeout: entry.max
                });
            });
        }
    });

    const resetFilter = () => describe(text +  ' Проверка "Сбросить фильтры".', () => {
        if(type === 'support') {
            befSupporting();
            aft();

            describe('Выбор периода 01-06-2023 - 30-06-2023', () => {
                decorate.el.input.iconCalendar({
                    title: '',
                    placeholder: '',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.datepicker.dateRange({
                    objStart: {
                        day: data.date.day1,
                        month: data.date.month,
                        year: data.date.year,
                        scrollYear: 500,
                    },
                    objEnd: {
                        day: data.date.day2,
                        month: data.date.month,
                        year: data.date.year,
                        scrollYear: 500,
                    },
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.table.size({
                    strCount: 4,
                    timeout: entry.max
                });
            });

            describe('Проверка таблицы до использования фильтров', () => {
                decorate.el.table.size({
                    strCount: 4,
                    timeout: entry.max
                });
            });

            describe(`Ввод в фильтр "${data.fio.staff2}"`, () => {
                decorate.el.input.sendKeys({
                    title: '',
                    placeholder: 'Поиск...',
                    value: data.fio.staff2,
                    timeout: entry.max
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
                    strCount: 4,
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
        }

        if(type === 'paid') {
            befPaidOvertime();
            aft();

            describe('Выбор периода 01-06-2023 - 30-06-2023', () => {
                decorate.el.input.iconCalendar({
                    title: '',
                    placeholder: '',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.datepicker.dateRange({
                    objStart: {
                        day: data.date.day1,
                        month: data.date.month,
                        year: data.date.year,
                        scrollYear: 500,
                    },
                    objEnd: {
                        day: data.date.day2,
                        month: data.date.month,
                        year: data.date.year,
                        scrollYear: 500,
                    },
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.table.size({
                    strCount: 4,
                    timeout: entry.max
                });
            });

            describe('Проверка таблицы до использования фильтров', () => {
                decorate.el.table.size({
                    strCount: 4,
                    timeout: entry.max
                });
            });

            describe(`Ввод в фильтр "${data.fio.staff2}"`, () => {
                decorate.el.input.sendKeys({
                    title: '',
                    placeholder: 'Поиск...',
                    value: data.fio.staff2,
                    timeout: entry.max
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
                    strCount: 4,
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
        }
    });

    return {
        checkTable,
        printTable,
        exportXLSX,
        exportCSV,
        divisionFilter,
        searchFilter,
        resetFilter
    }
};

const other = () => {
    const addURV = () => describe('Добавление данных для тестирования раздела УРВ.', () => {

        befSupporting();
        aft();

        const params = {...dataURV}

        describe('Изменение вечернего и ночного времени', () => {
            it('Изменение времени на 10:00 - 11:00', async () => {
                const cook = await page.base.getCookie('token');
                const time = {
                    begin_time: "10:00",
                    end_time: "11:00"
                }

                await dec.simple(api.postEveningTime,
                    [time, cook.text],
                    api.postEveningTime);

                await dec.simple(api.postNightTime,
                    [time, cook.text],
                    api.postNightTime);
            });
        });

        describe('Добавление праздничных дней', () => {
            it('Добавление праздничных дней', async () => {
                const cook = await page.base.getCookie('token');

                await dec.simple(api.putHoliday,
                    [params.holiday.date1, cook.text],
                    api.putHoliday);

                await dec.simple(api.putHoliday,
                    [params.holiday.date2, cook.text],
                    api.putHoliday);

                await dec.simple(api.putHoliday,
                    [params.holiday.date3, cook.text],
                    api.putHoliday);
            });
        });

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
            decorate.api.addDivision(params.divisions.division5);
            decorate.api.addDivision(params.divisions.division6);
            decorate.api.addDivision(params.divisions.division7);
            decorate.api.addDivision(params.divisions.division8);
        });

        describe('Добавление должностей', () => {
            decorate.api.addPosition(params.positions.position1);
            decorate.api.addPosition(params.positions.position2);
            decorate.api.addPosition(params.positions.position3);
            decorate.api.addPosition(params.positions.position4);
            decorate.api.addPosition(params.positions.position5);
            decorate.api.addPosition(params.positions.position6);
            decorate.api.addPosition(params.positions.position7);
            decorate.api.addPosition(params.positions.position8);
        });

        describe('Добавление графиков работы', () => {
            it(`Добавление недельного графика работы "${params.schedules.schedule1.name}"`, async () => {
                const cook = await page.base.getCookie('token');
                await dec.simple(api.putSchedule,
                    [[params.schedules.schedule1.db], cook.text],
                    api.putSchedule);
            });

            it(`Добавление сменного графика работы "${params.schedules.schedule2.name}"`, async () => {
                const cook = await page.base.getCookie('token');
                await dec.simple(api.putSchedule,
                    [[params.schedules.schedule2.db], cook.text],
                    api.putSchedule);
            });

            it(`Добавление графика по пристствию "${params.schedules.schedule3.name}"`, async () => {
                const cook = await page.base.getCookie('token');
                await dec.simple(api.putSchedule,
                    [[params.schedules.schedule3.db], cook.text],
                    api.putSchedule);
            });

            it(`Добавление гибкого графика работы "${params.schedules.schedule4.name}"`, async () => {
                const cook = await page.base.getCookie('token');
                await dec.simple(api.putSchedule,
                    [[params.schedules.schedule4.db], cook.text],
                    api.putSchedule);
            });

            it(`Добавление графика сбалансом "${params.schedules.schedule5.name}"`, async () => {
                const cook = await page.base.getCookie('token');
                await dec.simple(api.putSchedule,
                    [[params.schedules.schedule5.db], cook.text],
                    api.putSchedule);
            });

            it(`Добавление недельного графика работы "${params.schedules.schedule6.name}"`, async () => {
                const cook = await page.base.getCookie('token');
                await dec.simple(api.putSchedule,
                    [[params.schedules.schedule6.db], cook.text],
                    api.putSchedule);
            });

            it(`Добавление сменного графика работы "${params.schedules.schedule7.name}"`, async () => {
                const cook = await page.base.getCookie('token');
                await dec.simple(api.putSchedule,
                    [[params.schedules.schedule7.db], cook.text],
                    api.putSchedule);
            });

            it(`Добавление графика по пристствию "${params.schedules.schedule8.name}"`, async () => {
                const cook = await page.base.getCookie('token');
                await dec.simple(api.putSchedule,
                    [[params.schedules.schedule8.db], cook.text],
                    api.putSchedule);
            });
        });

        describe('Настройка у графиков учет рабочего времени на помещение', () => {
            describe('Переход в подраздел "Графики"', () => {
                decorate.el.subsection.handler({
                    subsection: sub.per.schedule,
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.page.schedule.init({
                    timeout: entry.max
                });
            });

            describe('Настройка графика 1', () => {
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
                decorate.page.scheduleChange.initEdit({
                    timeout: entry.max
                });
                decorate.el.simpleCell.active({
                    name: 'Регистрирующие помещения',
                    timeout: entry.max
                });
                decorate.page.scheduleChange.checkboxWorkHandler({
                    name: params.rooms.room1,
                    timeout: entry.max
                });
                decorate.page.scheduleChange.checkboxNoWorkHandler({
                    name: params.rooms.room2,
                    timeout: entry.max
                });
                decorate.el.button.handler({
                    name: 'Сохранить изменения',
                    timeout: entry.max
                });
                decorate.el.success.success({
                    text: 'Сохранено успешно',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.page.schedule.init({
                    timeout: entry.max
                })
            });

            describe('Настройка графика 2', () => {
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
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.page.scheduleChange.initEdit({
                    timeout: entry.max
                });
                decorate.el.simpleCell.active({
                    name: 'Регистрирующие помещения',
                    timeout: entry.max
                });
                decorate.page.scheduleChange.checkboxWorkHandler({
                    name: params.rooms.room1,
                    timeout: entry.max
                });
                decorate.page.scheduleChange.checkboxNoWorkHandler({
                    name: params.rooms.room2,
                    timeout: entry.max
                });
                decorate.el.button.handler({
                    name: 'Сохранить изменения',
                    timeout: entry.max
                });
                decorate.el.success.success({
                    text: 'Сохранено успешно',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.page.schedule.init({
                    timeout: entry.max
                })
            });

            describe('Настройка графика 3', () => {
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
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.page.scheduleChange.initEdit({
                    timeout: entry.max
                });
                decorate.el.simpleCell.active({
                    name: 'Регистрирующие помещения',
                    timeout: entry.max
                });
                decorate.page.scheduleChange.checkboxWorkHandler({
                    name: params.rooms.room1,
                    timeout: entry.max
                });
                decorate.page.scheduleChange.checkboxNoWorkHandler({
                    name: params.rooms.room2,
                    timeout: entry.max
                });
                decorate.el.button.handler({
                    name: 'Сохранить изменения',
                    timeout: entry.max
                });
                decorate.el.success.success({
                    text: 'Сохранено успешно',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.page.schedule.init({
                    timeout: entry.max
                })
            });

            describe('Настройка графика 4', () => {
                decorate.el.table.strHandler({
                    strNumber: 4,
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
                decorate.page.scheduleChange.initEdit({
                    timeout: entry.max
                });
                decorate.el.simpleCell.active({
                    name: 'Регистрирующие помещения',
                    timeout: entry.max
                });
                decorate.page.scheduleChange.checkboxWorkHandler({
                    name: params.rooms.room1,
                    timeout: entry.max
                });
                decorate.page.scheduleChange.checkboxNoWorkHandler({
                    name: params.rooms.room2,
                    timeout: entry.max
                });
                decorate.el.button.handler({
                    name: 'Сохранить изменения',
                    timeout: entry.max
                });
                decorate.el.success.success({
                    text: 'Сохранено успешно',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.page.schedule.init({
                    timeout: entry.max
                })
            });

            describe('Настройка графика 5', () => {
                decorate.el.table.strHandler({
                    strNumber: 5,
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
                decorate.page.scheduleChange.initEdit({
                    timeout: entry.max
                });
                decorate.el.simpleCell.active({
                    name: 'Регистрирующие помещения',
                    timeout: entry.max
                });
                decorate.page.scheduleChange.checkboxWorkHandler({
                    name: params.rooms.room1,
                    timeout: entry.max
                });
                decorate.page.scheduleChange.checkboxNoWorkHandler({
                    name: params.rooms.room2,
                    timeout: entry.max
                });
                decorate.el.button.handler({
                    name: 'Сохранить изменения',
                    timeout: entry.max
                });
                decorate.el.success.success({
                    text: 'Сохранено успешно',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.page.schedule.init({
                    timeout: entry.max
                })
            });

            describe('Настройка графика 6', () => {
                decorate.el.table.strHandler({
                    strNumber: 6,
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
                decorate.page.scheduleChange.initEdit({
                    timeout: entry.max
                });
                decorate.el.simpleCell.active({
                    name: 'Регистрирующие помещения',
                    timeout: entry.max
                });
                decorate.page.scheduleChange.checkboxWorkHandler({
                    name: params.rooms.room1,
                    timeout: entry.max
                });
                decorate.page.scheduleChange.checkboxNoWorkHandler({
                    name: params.rooms.room2,
                    timeout: entry.max
                });
                decorate.el.button.handler({
                    name: 'Сохранить изменения',
                    timeout: entry.max
                });
                decorate.el.success.success({
                    text: 'Сохранено успешно',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.page.schedule.init({
                    timeout: entry.max
                })
            });

            describe('Настройка графика 7', () => {
                decorate.el.table.strHandler({
                    strNumber: 7,
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
                decorate.page.scheduleChange.initEdit({
                    timeout: entry.max
                });
                decorate.el.simpleCell.active({
                    name: 'Регистрирующие помещения',
                    timeout: entry.max
                });
                decorate.page.scheduleChange.checkboxWorkHandler({
                    name: params.rooms.room1,
                    timeout: entry.max
                });
                decorate.page.scheduleChange.checkboxNoWorkHandler({
                    name: params.rooms.room2,
                    timeout: entry.max
                });
                decorate.el.button.handler({
                    name: 'Сохранить изменения',
                    timeout: entry.max
                });
                decorate.el.success.success({
                    text: 'Сохранено успешно',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.page.schedule.init({
                    timeout: entry.max
                })
            });

            describe('Настройка графика 8', () => {
                decorate.el.table.strHandler({
                    strNumber: 8,
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
                decorate.page.scheduleChange.initEdit({
                    timeout: entry.max
                });
                decorate.el.simpleCell.active({
                    name: 'Регистрирующие помещения',
                    timeout: entry.max
                });
                decorate.page.scheduleChange.checkboxWorkHandler({
                    name: params.rooms.room1,
                    timeout: entry.max
                });
                decorate.page.scheduleChange.checkboxNoWorkHandler({
                    name: params.rooms.room2,
                    timeout: entry.max
                });
                decorate.el.button.handler({
                    name: 'Сохранить изменения',
                    timeout: entry.max
                });
                decorate.el.success.success({
                    text: 'Сохранено успешно',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.page.schedule.init({
                    timeout: entry.max
                })
            });
        });

        describe('Добавление сотрудников', () => {
            it(`Добавление сотрудника "${params.fio.staff1}".`, async () => {
                const cook = await page.base.getCookie('token');
                const arrDivision = await api.getDivision(cook.text);
                const divisionId = arrDivision.text.filter(obj => obj.name === params.staffs.staff1.division)[0].id;
                const arrPosition = await api.getPosition(cook.text);
                const positionId = arrPosition.text.filter(obj => obj.name === params.staffs.staff1.position)[0].id;
                const arrSchedule = await api.getSchedule(cook.text);
                const scheduleId = arrSchedule.text.filter(obj => obj.name === params.staffs.staff1.work_schedule)[0].id;
                const staff = {
                    ...params.staffs.staff1,
                    division: divisionId,
                    position: positionId,
                    work_schedule: scheduleId
                }
                await dec.simple(api.putStaff,
                    [[staff], cook.text],
                    api.putStaff);
            });

            it(`Добавление сотрудника "${params.fio.staff2}".`, async () => {
                const cook = await page.base.getCookie('token');
                const arrDivision = await api.getDivision(cook.text);
                const divisionId = arrDivision.text.filter(obj => obj.name === params.staffs.staff2.division)[0].id;
                const arrPosition = await api.getPosition(cook.text);
                const positionId = arrPosition.text.filter(obj => obj.name === params.staffs.staff2.position)[0].id;
                const arrSchedule = await api.getSchedule(cook.text);
                const scheduleId = arrSchedule.text.filter(obj => obj.name === params.staffs.staff2.work_schedule)[0].id;
                const staff = {
                    ...params.staffs.staff2,
                    division: divisionId,
                    position: positionId,
                    work_schedule: scheduleId
                }
                await dec.simple(api.putStaff,
                    [[staff], cook.text],
                    api.putStaff);
            });

            it(`Добавление сотрудника "${params.fio.staff3}".`, async () => {
                const cook = await page.base.getCookie('token');
                const arrDivision = await api.getDivision(cook.text);
                const divisionId = arrDivision.text.filter(obj => obj.name === params.staffs.staff3.division)[0].id;
                const arrPosition = await api.getPosition(cook.text);
                const positionId = arrPosition.text.filter(obj => obj.name === params.staffs.staff3.position)[0].id;
                const arrSchedule = await api.getSchedule(cook.text);
                const scheduleId = arrSchedule.text.filter(obj => obj.name === params.staffs.staff3.work_schedule)[0].id;
                const staff = {
                    ...params.staffs.staff3,
                    division: divisionId,
                    position: positionId,
                    work_schedule: scheduleId
                }
                await dec.simple(api.putStaff,
                    [[staff], cook.text],
                    api.putStaff);
            });

            it(`Добавление сотрудника "${params.fio.staff4}".`, async () => {
                const cook = await page.base.getCookie('token');
                const arrDivision = await api.getDivision(cook.text);
                const divisionId = arrDivision.text.filter(obj => obj.name === params.staffs.staff4.division)[0].id;
                const arrPosition = await api.getPosition(cook.text);
                const positionId = arrPosition.text.filter(obj => obj.name === params.staffs.staff4.position)[0].id;
                const arrSchedule = await api.getSchedule(cook.text);
                const scheduleId = arrSchedule.text.filter(obj => obj.name === params.staffs.staff4.work_schedule)[0].id;
                const staff = {
                    ...params.staffs.staff4,
                    division: divisionId,
                    position: positionId,
                    work_schedule: scheduleId
                }
                await dec.simple(api.putStaff,
                    [[staff], cook.text],
                    api.putStaff);
            });

            it(`Добавление сотрудника "${params.fio.staff5}".`, async () => {
                const cook = await page.base.getCookie('token');
                const arrDivision = await api.getDivision(cook.text);
                const divisionId = arrDivision.text.filter(obj => obj.name === params.staffs.staff5.division)[0].id;
                const arrPosition = await api.getPosition(cook.text);
                const positionId = arrPosition.text.filter(obj => obj.name === params.staffs.staff5.position)[0].id;
                const arrSchedule = await api.getSchedule(cook.text);
                const scheduleId = arrSchedule.text.filter(obj => obj.name === params.staffs.staff5.work_schedule)[0].id;
                const staff = {
                    ...params.staffs.staff5,
                    division: divisionId,
                    position: positionId,
                    work_schedule: scheduleId
                }
                await dec.simple(api.putStaff,
                    [[staff], cook.text],
                    api.putStaff);
            });

            it(`Добавление сотрудника "${params.fio.staff6}".`, async () => {
                const cook = await page.base.getCookie('token');
                const arrDivision = await api.getDivision(cook.text);
                const divisionId = arrDivision.text.filter(obj => obj.name === params.staffs.staff6.division)[0].id;
                const arrPosition = await api.getPosition(cook.text);
                const positionId = arrPosition.text.filter(obj => obj.name === params.staffs.staff6.position)[0].id;
                const arrSchedule = await api.getSchedule(cook.text);
                const scheduleId = arrSchedule.text.filter(obj => obj.name === params.staffs.staff6.work_schedule)[0].id;
                const staff = {
                    ...params.staffs.staff6,
                    division: divisionId,
                    position: positionId,
                    work_schedule: scheduleId
                }
                await dec.simple(api.putStaff,
                    [[staff], cook.text],
                    api.putStaff);
            });

            it(`Добавление сотрудника "${params.fio.staff7}".`, async () => {
                const cook = await page.base.getCookie('token');
                const arrDivision = await api.getDivision(cook.text);
                const divisionId = arrDivision.text.filter(obj => obj.name === params.staffs.staff7.division)[0].id;
                const arrPosition = await api.getPosition(cook.text);
                const positionId = arrPosition.text.filter(obj => obj.name === params.staffs.staff7.position)[0].id;
                const arrSchedule = await api.getSchedule(cook.text);
                const scheduleId = arrSchedule.text.filter(obj => obj.name === params.staffs.staff7.work_schedule)[0].id;
                const staff = {
                    ...params.staffs.staff7,
                    division: divisionId,
                    position: positionId,
                    work_schedule: scheduleId
                }
                await dec.simple(api.putStaff,
                    [[staff], cook.text],
                    api.putStaff);
            });

            it(`Добавление сотрудника "${params.fio.staff8}".`, async () => {
                const cook = await page.base.getCookie('token');
                const arrDivision = await api.getDivision(cook.text);
                const divisionId = arrDivision.text.filter(obj => obj.name === params.staffs.staff8.division)[0].id;
                const arrPosition = await api.getPosition(cook.text);
                const positionId = arrPosition.text.filter(obj => obj.name === params.staffs.staff8.position)[0].id;
                const arrSchedule = await api.getSchedule(cook.text);
                const scheduleId = arrSchedule.text.filter(obj => obj.name === params.staffs.staff8.work_schedule)[0].id;
                const staff = {
                    ...params.staffs.staff8,
                    division: divisionId,
                    position: positionId,
                    work_schedule: scheduleId
                }
                await dec.simple(api.putStaff,
                    [[staff], cook.text],
                    api.putStaff);
            });
        });

        describe('Изменение планировщика у сотрудников', () => {
            it('Изменнеие даты на начала на "2023-01-01 00:00:00"', async () => {
                await dec.simple(db.updateDateUserChange,
                    ['2023-01-01 00:00:00'],
                    db.updateDateUserChange)
            });
        });

        describe('Добавление проходов', () => {
            it('Добавление проходов сотрудникам', async () => {
                const cook = await page.base.getCookie('token');
                const arrStaff = await api.getStaff(cook.text);
                const staff1 = arrStaff.text.filter(obj => obj.name === params.fio.staff1)[0].id;
                const staff2 = arrStaff.text.filter(obj => obj.name === params.fio.staff2)[0].id;
                const staff3 = arrStaff.text.filter(obj => obj.name === params.fio.staff3)[0].id;
                const staff4 = arrStaff.text.filter(obj => obj.name === params.fio.staff4)[0].id;
                const staff5 = arrStaff.text.filter(obj => obj.name === params.fio.staff5)[0].id;
                const staff6 = arrStaff.text.filter(obj => obj.name === params.fio.staff6)[0].id;
                const staff7 = arrStaff.text.filter(obj => obj.name === params.fio.staff7)[0].id;
                const staff8 = arrStaff.text.filter(obj => obj.name === params.fio.staff8)[0].id;

                const arrDevice = await api.getDevice(cook.text);
                const device1 = arrDevice.text.filter(obj => obj.ip_addr === params.devices.device1.ip)[0].id;
                const device2 = arrDevice.text.filter(obj => obj.ip_addr === params.devices.device2.ip)[0].id;
                const device3 = arrDevice.text.filter(obj => obj.ip_addr === params.devices.device3.ip)[0].id;

                const arrRooms = await api.getRoom(cook.text);
                const room0 = arrRooms.text.filter(obj => obj.name === 'Неконтролируемая территория')[0].id;
                const room1 = arrRooms.text.filter(obj => obj.name === params.rooms.room1)[0].id;
                const room2 = arrRooms.text.filter(obj => obj.name === params.rooms.room2)[0].id;
                const room3 = arrRooms.text.filter(obj => obj.name === params.rooms.room3)[0].id;

                //События Сотрудника 1 - День 1
                await dec.simple(db.addEvent,
                    [{
                        ...params.events.staff1.day1.event1,
                        user_id: staff1,
                        device_id: device1,
                        access_zone_id1: room1,
                        access_zone_id2: room0,
                    }],
                    db.addEvent);

                await dec.simple(db.addEvent,
                    [{
                        ...params.events.staff1.day1.event2,
                        user_id: staff1,
                        device_id: device2,
                        access_zone_id1: room2,
                        access_zone_id2: room1,
                    }],
                    db.addEvent);

                await dec.simple(db.addEvent,
                    [{
                        ...params.events.staff1.day1.event3,
                        user_id: staff1,
                        device_id: device2,
                        access_zone_id1: room1,
                        access_zone_id2: room2,
                    }],
                    db.addEvent);

                await dec.simple(db.addEvent,
                    [{
                        ...params.events.staff1.day1.event4,
                        user_id: staff1,
                        device_id: device1,
                        access_zone_id1: room0,
                        access_zone_id2: room1,
                    }],
                    db.addEvent);

                //События Сотрудника 1 - День 2
                await dec.simple(db.addEvent,
                    [{
                        ...params.events.staff1.day2.event1,
                        user_id: staff1,
                        device_id: device1,
                        access_zone_id1: room1,
                        access_zone_id2: room0,
                    }],
                    db.addEvent);

                await dec.simple(db.addEvent,
                    [{
                        ...params.events.staff1.day2.event2,
                        user_id: staff1,
                        device_id: device2,
                        access_zone_id1: room2,
                        access_zone_id2: room1,
                    }],
                    db.addEvent);

                //События Сотрудника 1 - День 3
                await dec.simple(db.addEvent,
                    [{
                        ...params.events.staff1.day3.event1,
                        user_id: staff1,
                        device_id: device1,
                        access_zone_id1: room1,
                        access_zone_id2: room0,
                    }],
                    db.addEvent);

                await dec.simple(db.addEvent,
                    [{
                        ...params.events.staff1.day3.event2,
                        user_id: staff1,
                        device_id: device2,
                        access_zone_id1: room2,
                        access_zone_id2: room1,
                    }],
                    db.addEvent);

                //События Сотрудника 1 - День 4
                await dec.simple(db.addEvent,
                    [{
                        ...params.events.staff1.day4.event1,
                        user_id: staff1,
                        device_id: device1,
                        access_zone_id1: room1,
                        access_zone_id2: room0,
                    }],
                    db.addEvent);

                await dec.simple(db.addEvent,
                    [{
                        ...params.events.staff1.day4.event2,
                        user_id: staff1,
                        device_id: device2,
                        access_zone_id1: room2,
                        access_zone_id2: room1,
                    }],
                    db.addEvent);

                //События Сотрудника 1 - День 5
                await dec.simple(db.addEvent,
                    [{
                        ...params.events.staff1.day5.event1,
                        user_id: staff1,
                        device_id: device1,
                        access_zone_id1: room1,
                        access_zone_id2: room0,
                    }],
                    db.addEvent);

                await dec.simple(db.addEvent,
                    [{
                        ...params.events.staff1.day5.event2,
                        user_id: staff1,
                        device_id: device2,
                        access_zone_id1: room2,
                        access_zone_id2: room1,
                    }],
                    db.addEvent);

                //События Сотрудника 1 - День 6
                await dec.simple(db.addEvent,
                    [{
                        ...params.events.staff1.day6.event1,
                        user_id: staff1,
                        device_id: device1,
                        access_zone_id1: room1,
                        access_zone_id2: room0,
                    }],
                    db.addEvent);

                await dec.simple(db.addEvent,
                    [{
                        ...params.events.staff1.day6.event2,
                        user_id: staff1,
                        device_id: device2,
                        access_zone_id1: room2,
                        access_zone_id2: room1,
                    }],
                    db.addEvent);

                //События Сотрудника 1 - День 7
                await dec.simple(db.addEvent,
                    [{
                        ...params.events.staff1.day7.event1,
                        user_id: staff1,
                        device_id: device1,
                        access_zone_id1: room1,
                        access_zone_id2: room0,
                    }],
                    db.addEvent);

                await dec.simple(db.addEvent,
                    [{
                        ...params.events.staff1.day7.event2,
                        user_id: staff1,
                        device_id: device2,
                        access_zone_id1: room2,
                        access_zone_id2: room1,
                    }],
                    db.addEvent);

                await dec.simple(db.addEvent,
                    [{
                        ...params.events.staff1.day7.event3,
                        user_id: staff1,
                        device_id: device2,
                        access_zone_id1: room1,
                        access_zone_id2: room2,
                    }],
                    db.addEvent);

                await dec.simple(db.addEvent,
                    [{
                        ...params.events.staff1.day7.event4,
                        user_id: staff1,
                        device_id: device1,
                        access_zone_id1: room0,
                        access_zone_id2: room1,
                    }],
                    db.addEvent);

                //События Сотрудника 1 - День 8
                await dec.simple(db.addEvent,
                    [{
                        ...params.events.staff1.day8.event1,
                        user_id: staff1,
                        device_id: device1,
                        access_zone_id1: room1,
                        access_zone_id2: room0,
                    }],
                    db.addEvent);

                await dec.simple(db.addEvent,
                    [{
                        ...params.events.staff1.day8.event2,
                        user_id: staff1,
                        device_id: device2,
                        access_zone_id1: room2,
                        access_zone_id2: room1,
                    }],
                    db.addEvent);

                await dec.simple(db.addEvent,
                    [{
                        ...params.events.staff1.day8.event3,
                        user_id: staff1,
                        device_id: device2,
                        access_zone_id1: room1,
                        access_zone_id2: room2,
                    }],
                    db.addEvent);

                await dec.simple(db.addEvent,
                    [{
                        ...params.events.staff1.day8.event4,
                        user_id: staff1,
                        device_id: device1,
                        access_zone_id1: room0,
                        access_zone_id2: room1,
                    }],
                    db.addEvent);

                //События Сотрудника 1 - День 9
                await dec.simple(db.addEvent,
                    [{
                        ...params.events.staff1.day9.event1,
                        user_id: staff1,
                        device_id: device1,
                        access_zone_id1: room1,
                        access_zone_id2: room0,
                    }],
                    db.addEvent);

                await dec.simple(db.addEvent,
                    [{
                        ...params.events.staff1.day9.event2,
                        user_id: staff1,
                        device_id: device2,
                        access_zone_id1: room2,
                        access_zone_id2: room1,
                    }],
                    db.addEvent);

                //События Сотрудника 1 - День 10
                await dec.simple(db.addEvent,
                    [{
                        ...params.events.staff1.day10.event1,
                        user_id: staff1,
                        device_id: device1,
                        access_zone_id1: room1,
                        access_zone_id2: room0,
                    }],
                    db.addEvent);

                await dec.simple(db.addEvent,
                    [{
                        ...params.events.staff1.day10.event2,
                        user_id: staff1,
                        device_id: device2,
                        access_zone_id1: room2,
                        access_zone_id2: room1,
                    }],
                    db.addEvent);

                //События Сотрудника 1 - Текуйщий день
                await dec.simple(db.addEvent,
                    [{
                        ...params.events.staff1.day11.event1,
                        user_id: staff1,
                        device_id: device1,
                        access_zone_id1: room1,
                        access_zone_id2: room0,
                    }],
                    db.addEvent);

                await dec.simple(db.addEvent,
                    [{
                        ...params.events.staff1.day11.event2,
                        user_id: staff1,
                        device_id: device2,
                        access_zone_id1: room0,
                        access_zone_id2: room1,
                    }],
                    db.addEvent);

                //События Сотрудника 2 - День 1
                await dec.simple(db.addEvent,
                    [{
                        ...params.events.staff2.day1.event1,
                        user_id: staff2,
                        device_id: device1,
                        access_zone_id1: room1,
                        access_zone_id2: room0,
                    }],
                    db.addEvent);

                await dec.simple(db.addEvent,
                    [{
                        ...params.events.staff2.day1.event2,
                        user_id: staff2,
                        device_id: device2,
                        access_zone_id1: room0,
                        access_zone_id2: room1,
                    }],
                    db.addEvent);

                //События Сотрудника 2 - День 2
                await dec.simple(db.addEvent,
                    [{
                        ...params.events.staff2.day2.event1,
                        user_id: staff2,
                        device_id: device1,
                        access_zone_id1: room1,
                        access_zone_id2: room0,
                    }],
                    db.addEvent);

                await dec.simple(db.addEvent,
                    [{
                        ...params.events.staff2.day2.event2,
                        user_id: staff2,
                        device_id: device2,
                        access_zone_id1: room0,
                        access_zone_id2: room1,
                    }],
                    db.addEvent);

                //События Сотрудника 2 - День 3
                await dec.simple(db.addEvent,
                    [{
                        ...params.events.staff2.day3.event1,
                        user_id: staff2,
                        device_id: device1,
                        access_zone_id1: room1,
                        access_zone_id2: room0,
                    }],
                    db.addEvent);

                await dec.simple(db.addEvent,
                    [{
                        ...params.events.staff2.day3.event2,
                        user_id: staff2,
                        device_id: device2,
                        access_zone_id1: room0,
                        access_zone_id2: room1,
                    }],
                    db.addEvent);

                //События Сотрудника 2 - День 4
                await dec.simple(db.addEvent,
                    [{
                        ...params.events.staff2.day4.event1,
                        user_id: staff2,
                        device_id: device1,
                        access_zone_id1: room1,
                        access_zone_id2: room0,
                    }],
                    db.addEvent);

                await dec.simple(db.addEvent,
                    [{
                        ...params.events.staff2.day4.event2,
                        user_id: staff2,
                        device_id: device2,
                        access_zone_id1: room0,
                        access_zone_id2: room1,
                    }],
                    db.addEvent);

                //События Сотрудника 2 - День 5
                await dec.simple(db.addEvent,
                    [{
                        ...params.events.staff2.day5.event1,
                        user_id: staff2,
                        device_id: device1,
                        access_zone_id1: room1,
                        access_zone_id2: room0,
                    }],
                    db.addEvent);

                await dec.simple(db.addEvent,
                    [{
                        ...params.events.staff2.day5.event2,
                        user_id: staff2,
                        device_id: device2,
                        access_zone_id1: room0,
                        access_zone_id2: room1,
                    }],
                    db.addEvent);

                //События Сотрудника 2 - День 6
                await dec.simple(db.addEvent,
                    [{
                        ...params.events.staff2.day6.event1,
                        user_id: staff2,
                        device_id: device1,
                        access_zone_id1: room1,
                        access_zone_id2: room0,
                    }],
                    db.addEvent);

                await dec.simple(db.addEvent,
                    [{
                        ...params.events.staff2.day6.event2,
                        user_id: staff2,
                        device_id: device2,
                        access_zone_id1: room2,
                        access_zone_id2: room1,
                    }],
                    db.addEvent);

                await dec.simple(db.addEvent,
                    [{
                        ...params.events.staff2.day6.event3,
                        user_id: staff2,
                        device_id: device2,
                        access_zone_id1: room1,
                        access_zone_id2: room2,
                    }],
                    db.addEvent);

                await dec.simple(db.addEvent,
                    [{
                        ...params.events.staff2.day6.event4,
                        user_id: staff2,
                        device_id: device1,
                        access_zone_id1: room0,
                        access_zone_id2: room1,
                    }],
                    db.addEvent);

                //События Сотрудника 2 - День 7
                await dec.simple(db.addEvent,
                    [{
                        ...params.events.staff2.day7.event1,
                        user_id: staff2,
                        device_id: device1,
                        access_zone_id1: room1,
                        access_zone_id2: room0,
                    }],
                    db.addEvent);

                await dec.simple(db.addEvent,
                    [{
                        ...params.events.staff2.day7.event2,
                        user_id: staff2,
                        device_id: device2,
                        access_zone_id1: room2,
                        access_zone_id2: room1,
                    }],
                    db.addEvent);

                await dec.simple(db.addEvent,
                    [{
                        ...params.events.staff2.day7.event3,
                        user_id: staff2,
                        device_id: device2,
                        access_zone_id1: room1,
                        access_zone_id2: room2,
                    }],
                    db.addEvent);

                await dec.simple(db.addEvent,
                    [{
                        ...params.events.staff2.day7.event4,
                        user_id: staff2,
                        device_id: device1,
                        access_zone_id1: room0,
                        access_zone_id2: room1,
                    }],
                    db.addEvent);

                //События Сотрудника 2 - День 8
                await dec.simple(db.addEvent,
                    [{
                        ...params.events.staff2.day8.event1,
                        user_id: staff2,
                        device_id: device1,
                        access_zone_id1: room1,
                        access_zone_id2: room0,
                    }],
                    db.addEvent);

                await dec.simple(db.addEvent,
                    [{
                        ...params.events.staff2.day8.event2,
                        user_id: staff2,
                        device_id: device2,
                        access_zone_id1: room0,
                        access_zone_id2: room1,
                    }],
                    db.addEvent);

                //События Сотрудника 2 - День 9
                await dec.simple(db.addEvent,
                    [{
                        ...params.events.staff2.day9.event1,
                        user_id: staff2,
                        device_id: device1,
                        access_zone_id1: room1,
                        access_zone_id2: room0,
                    }],
                    db.addEvent);

                await dec.simple(db.addEvent,
                    [{
                        ...params.events.staff2.day9.event2,
                        user_id: staff2,
                        device_id: device2,
                        access_zone_id1: room0,
                        access_zone_id2: room1,
                    }],
                    db.addEvent);

                //События Сотрудника 3 - День 1
                await dec.simple(db.addEvent,
                    [{
                        ...params.events.staff3.day1.event1,
                        user_id: staff3,
                        device_id: device1,
                        access_zone_id1: room1,
                        access_zone_id2: room0,
                    }],
                    db.addEvent);

                await dec.simple(db.addEvent,
                    [{
                        ...params.events.staff3.day1.event2,
                        user_id: staff3,
                        device_id: device2,
                        access_zone_id1: room0,
                        access_zone_id2: room1,
                    }],
                    db.addEvent);

                //События Сотрудника 3 - Текущий день
                await dec.simple(db.addEvent,
                    [{
                        ...params.events.staff3.day2.event1,
                        user_id: staff3,
                        device_id: device1,
                        access_zone_id1: room1,
                        access_zone_id2: room0,
                    }],
                    db.addEvent);

                //События Сотрудника 4 - День 1
                await dec.simple(db.addEvent,
                    [{
                        ...params.events.staff4.day1.event1,
                        user_id: staff4,
                        device_id: device1,
                        access_zone_id1: room1,
                        access_zone_id2: room0,
                    }],
                    db.addEvent);

                await dec.simple(db.addEvent,
                    [{
                        ...params.events.staff4.day1.event2,
                        user_id: staff4,
                        device_id: device2,
                        access_zone_id1: room2,
                        access_zone_id2: room1,
                    }],
                    db.addEvent);

                await dec.simple(db.addEvent,
                    [{
                        ...params.events.staff4.day1.event3,
                        user_id: staff4,
                        device_id: device2,
                        access_zone_id1: room1,
                        access_zone_id2: room2,
                    }],
                    db.addEvent);

                await dec.simple(db.addEvent,
                    [{
                        ...params.events.staff4.day1.event4,
                        user_id: staff4,
                        device_id: device1,
                        access_zone_id1: room0,
                        access_zone_id2: room1,
                    }],
                    db.addEvent);

                //События Сотрудника 4 - День 2
                await dec.simple(db.addEvent,
                    [{
                        ...params.events.staff4.day2.event1,
                        user_id: staff4,
                        device_id: device1,
                        access_zone_id1: room1,
                        access_zone_id2: room0,
                    }],
                    db.addEvent);

                await dec.simple(db.addEvent,
                    [{
                        ...params.events.staff4.day2.event2,
                        user_id: staff4,
                        device_id: device2,
                        access_zone_id1: room2,
                        access_zone_id2: room1,
                    }],
                    db.addEvent);

                //События Сотрудника 4 - День 3
                await dec.simple(db.addEvent,
                    [{
                        ...params.events.staff4.day3.event1,
                        user_id: staff4,
                        device_id: device1,
                        access_zone_id1: room1,
                        access_zone_id2: room0,
                    }],
                    db.addEvent);

                await dec.simple(db.addEvent,
                    [{
                        ...params.events.staff4.day3.event2,
                        user_id: staff4,
                        device_id: device2,
                        access_zone_id1: room2,
                        access_zone_id2: room1,
                    }],
                    db.addEvent);

                //События Сотрудника 4 - День 4
                await dec.simple(db.addEvent,
                    [{
                        ...params.events.staff4.day4.event1,
                        user_id: staff4,
                        device_id: device1,
                        access_zone_id1: room1,
                        access_zone_id2: room0,
                    }],
                    db.addEvent);

                await dec.simple(db.addEvent,
                    [{
                        ...params.events.staff4.day4.event2,
                        user_id: staff4,
                        device_id: device2,
                        access_zone_id1: room2,
                        access_zone_id2: room1,
                    }],
                    db.addEvent);

                //События Сотрудника 4 - День 5
                await dec.simple(db.addEvent,
                    [{
                        ...params.events.staff4.day5.event1,
                        user_id: staff4,
                        device_id: device1,
                        access_zone_id1: room1,
                        access_zone_id2: room0,
                    }],
                    db.addEvent);

                await dec.simple(db.addEvent,
                    [{
                        ...params.events.staff4.day5.event2,
                        user_id: staff4,
                        device_id: device2,
                        access_zone_id1: room2,
                        access_zone_id2: room1,
                    }],
                    db.addEvent);

                //События Сотрудника 4 - День 6
                await dec.simple(db.addEvent,
                    [{
                        ...params.events.staff4.day6.event1,
                        user_id: staff4,
                        device_id: device1,
                        access_zone_id1: room1,
                        access_zone_id2: room0,
                    }],
                    db.addEvent);

                await dec.simple(db.addEvent,
                    [{
                        ...params.events.staff4.day6.event2,
                        user_id: staff4,
                        device_id: device2,
                        access_zone_id1: room2,
                        access_zone_id2: room1,
                    }],
                    db.addEvent);

                //События Сотрудника 4 - День 7
                await dec.simple(db.addEvent,
                    [{
                        ...params.events.staff4.day7.event1,
                        user_id: staff4,
                        device_id: device1,
                        access_zone_id1: room1,
                        access_zone_id2: room0,
                    }],
                    db.addEvent);

                await dec.simple(db.addEvent,
                    [{
                        ...params.events.staff4.day7.event2,
                        user_id: staff4,
                        device_id: device2,
                        access_zone_id1: room2,
                        access_zone_id2: room1,
                    }],
                    db.addEvent);

                await dec.simple(db.addEvent,
                    [{
                        ...params.events.staff4.day7.event3,
                        user_id: staff4,
                        device_id: device2,
                        access_zone_id1: room1,
                        access_zone_id2: room2,
                    }],
                    db.addEvent);

                await dec.simple(db.addEvent,
                    [{
                        ...params.events.staff4.day7.event4,
                        user_id: staff4,
                        device_id: device1,
                        access_zone_id1: room0,
                        access_zone_id2: room1,
                    }],
                    db.addEvent);

                //События Сотрудника 4 - День 8
                await dec.simple(db.addEvent,
                    [{
                        ...params.events.staff4.day8.event1,
                        user_id: staff4,
                        device_id: device1,
                        access_zone_id1: room1,
                        access_zone_id2: room0,
                    }],
                    db.addEvent);

                await dec.simple(db.addEvent,
                    [{
                        ...params.events.staff4.day8.event2,
                        user_id: staff4,
                        device_id: device2,
                        access_zone_id1: room2,
                        access_zone_id2: room1,
                    }],
                    db.addEvent);

                await dec.simple(db.addEvent,
                    [{
                        ...params.events.staff4.day8.event3,
                        user_id: staff4,
                        device_id: device2,
                        access_zone_id1: room1,
                        access_zone_id2: room2,
                    }],
                    db.addEvent);

                await dec.simple(db.addEvent,
                    [{
                        ...params.events.staff4.day8.event4,
                        user_id: staff4,
                        device_id: device1,
                        access_zone_id1: room0,
                        access_zone_id2: room1,
                    }],
                    db.addEvent);

                //События Сотрудника 4 - День 9
                await dec.simple(db.addEvent,
                    [{
                        ...params.events.staff4.day9.event1,
                        user_id: staff4,
                        device_id: device1,
                        access_zone_id1: room1,
                        access_zone_id2: room0,
                    }],
                    db.addEvent);

                await dec.simple(db.addEvent,
                    [{
                        ...params.events.staff4.day9.event2,
                        user_id: staff4,
                        device_id: device2,
                        access_zone_id1: room2,
                        access_zone_id2: room1,
                    }],
                    db.addEvent);

                await dec.simple(db.addEvent,
                    [{
                        ...params.events.staff4.day9.event3,
                        user_id: staff4,
                        device_id: device2,
                        access_zone_id1: room1,
                        access_zone_id2: room2,
                    }],
                    db.addEvent);

                await dec.simple(db.addEvent,
                    [{
                        ...params.events.staff4.day9.event4,
                        user_id: staff4,
                        device_id: device1,
                        access_zone_id1: room0,
                        access_zone_id2: room1,
                    }],
                    db.addEvent);

                //События Сотрудника 4 - День 10
                await dec.simple(db.addEvent,
                    [{
                        ...params.events.staff4.day10.event1,
                        user_id: staff4,
                        device_id: device1,
                        access_zone_id1: room1,
                        access_zone_id2: room0,
                    }],
                    db.addEvent);

                await dec.simple(db.addEvent,
                    [{
                        ...params.events.staff4.day10.event2,
                        user_id: staff4,
                        device_id: device2,
                        access_zone_id1: room2,
                        access_zone_id2: room1,
                    }],
                    db.addEvent);

                //События Сотрудника 4 - День 11
                await dec.simple(db.addEvent,
                    [{
                        ...params.events.staff4.day11.event1,
                        user_id: staff4,
                        device_id: device1,
                        access_zone_id1: room1,
                        access_zone_id2: room0,
                    }],
                    db.addEvent);

                await dec.simple(db.addEvent,
                    [{
                        ...params.events.staff4.day11.event2,
                        user_id: staff4,
                        device_id: device2,
                        access_zone_id1: room2,
                        access_zone_id2: room1,
                    }],
                    db.addEvent);

                //События Сотрудника 4 - Май(2023)
                await dec.simple(db.addEvent,
                    [{
                        ...params.events.staff4.day12.event1,
                        user_id: staff4,
                        device_id: device1,
                        access_zone_id1: room1,
                        access_zone_id2: room0,
                    }],
                    db.addEvent);

                await dec.simple(db.addEvent,
                    [{
                        ...params.events.staff4.day12.event2,
                        user_id: staff4,
                        device_id: device2,
                        access_zone_id1: room2,
                        access_zone_id2: room1,
                    }],
                    db.addEvent);

                //События Сотрудника 4 - Март(2023)
                await dec.simple(db.addEvent,
                    [{
                        ...params.events.staff4.day13.event1,
                        user_id: staff4,
                        device_id: device1,
                        access_zone_id1: room1,
                        access_zone_id2: room0,
                    }],
                    db.addEvent);

                await dec.simple(db.addEvent,
                    [{
                        ...params.events.staff4.day13.event2,
                        user_id: staff4,
                        device_id: device2,
                        access_zone_id1: room2,
                        access_zone_id2: room1,
                    }],
                    db.addEvent);

                //События Сотрудника 4 - Декабрь(2022)
                await dec.simple(db.addEvent,
                    [{
                        ...params.events.staff4.day14.event1,
                        user_id: staff4,
                        device_id: device1,
                        access_zone_id1: room1,
                        access_zone_id2: room0,
                    }],
                    db.addEvent);

                await dec.simple(db.addEvent,
                    [{
                        ...params.events.staff4.day14.event2,
                        user_id: staff4,
                        device_id: device2,
                        access_zone_id1: room2,
                        access_zone_id2: room1,
                    }],
                    db.addEvent);

                //События Сотрудника 4 - Июнь(2022)
                await dec.simple(db.addEvent,
                    [{
                        ...params.events.staff4.day15.event1,
                        user_id: staff4,
                        device_id: device1,
                        access_zone_id1: room1,
                        access_zone_id2: room0,
                    }],
                    db.addEvent);

                await dec.simple(db.addEvent,
                    [{
                        ...params.events.staff4.day15.event2,
                        user_id: staff4,
                        device_id: device2,
                        access_zone_id1: room2,
                        access_zone_id2: room1,
                    }],
                    db.addEvent);

                //События Сотрудника 4 - Текущий день
                await dec.simple(db.addEvent,
                    [{
                        ...params.events.staff4.day16.event1,
                        user_id: staff4,
                        device_id: device1,
                        access_zone_id1: room1,
                        access_zone_id2: room0,
                    }],
                    db.addEvent);

                await dec.simple(db.addEvent,
                    [{
                        ...params.events.staff4.day16.event2,
                        user_id: staff4,
                        device_id: device1,
                        access_zone_id1: room0,
                        access_zone_id2: room1,
                    }],
                    db.addEvent);

                //События Сотрудника 5 - День 1
                await dec.simple(db.addEvent,
                    [{
                        ...params.events.staff5.day1.event1,
                        user_id: staff5,
                        device_id: device1,
                        access_zone_id1: room1,
                        access_zone_id2: room0,
                    }],
                    db.addEvent);

                await dec.simple(db.addEvent,
                    [{
                        ...params.events.staff5.day1.event2,
                        user_id: staff5,
                        device_id: device2,
                        access_zone_id1: room2,
                        access_zone_id2: room1,
                    }],
                    db.addEvent);

                await dec.simple(db.addEvent,
                    [{
                        ...params.events.staff5.day1.event3,
                        user_id: staff5,
                        device_id: device2,
                        access_zone_id1: room1,
                        access_zone_id2: room2,
                    }],
                    db.addEvent);

                await dec.simple(db.addEvent,
                    [{
                        ...params.events.staff5.day1.event4,
                        user_id: staff5,
                        device_id: device1,
                        access_zone_id1: room0,
                        access_zone_id2: room1,
                    }],
                    db.addEvent);

                //События Сотрудника 5 - День 2
                await dec.simple(db.addEvent,
                    [{
                        ...params.events.staff5.day2.event1,
                        user_id: staff5,
                        device_id: device1,
                        access_zone_id1: room1,
                        access_zone_id2: room0,
                    }],
                    db.addEvent);

                await dec.simple(db.addEvent,
                    [{
                        ...params.events.staff5.day2.event2,
                        user_id: staff5,
                        device_id: device2,
                        access_zone_id1: room2,
                        access_zone_id2: room1,
                    }],
                    db.addEvent);

                //События Сотрудника 5 - День 3
                await dec.simple(db.addEvent,
                    [{
                        ...params.events.staff5.day3.event1,
                        user_id: staff5,
                        device_id: device1,
                        access_zone_id1: room1,
                        access_zone_id2: room0,
                    }],
                    db.addEvent);

                await dec.simple(db.addEvent,
                    [{
                        ...params.events.staff5.day3.event2,
                        user_id: staff5,
                        device_id: device2,
                        access_zone_id1: room2,
                        access_zone_id2: room1,
                    }],
                    db.addEvent);

                //События Сотрудника 5 - День 4
                await dec.simple(db.addEvent,
                    [{
                        ...params.events.staff5.day4.event1,
                        user_id: staff5,
                        device_id: device1,
                        access_zone_id1: room1,
                        access_zone_id2: room0,
                    }],
                    db.addEvent);

                await dec.simple(db.addEvent,
                    [{
                        ...params.events.staff5.day4.event2,
                        user_id: staff5,
                        device_id: device2,
                        access_zone_id1: room2,
                        access_zone_id2: room1,
                    }],
                    db.addEvent);

                //События Сотрудника 5 - День 5
                await dec.simple(db.addEvent,
                    [{
                        ...params.events.staff5.day5.event1,
                        user_id: staff5,
                        device_id: device1,
                        access_zone_id1: room1,
                        access_zone_id2: room0,
                    }],
                    db.addEvent);

                await dec.simple(db.addEvent,
                    [{
                        ...params.events.staff5.day5.event2,
                        user_id: staff5,
                        device_id: device2,
                        access_zone_id1: room2,
                        access_zone_id2: room1,
                    }],
                    db.addEvent);

                //События Сотрудника 5 - День 6
                await dec.simple(db.addEvent,
                    [{
                        ...params.events.staff5.day6.event1,
                        user_id: staff5,
                        device_id: device1,
                        access_zone_id1: room1,
                        access_zone_id2: room0,
                    }],
                    db.addEvent);

                await dec.simple(db.addEvent,
                    [{
                        ...params.events.staff5.day6.event2,
                        user_id: staff5,
                        device_id: device2,
                        access_zone_id1: room2,
                        access_zone_id2: room1,
                    }],
                    db.addEvent);

                //События Сотрудника 5 - День 7
                await dec.simple(db.addEvent,
                    [{
                        ...params.events.staff5.day7.event1,
                        user_id: staff5,
                        device_id: device1,
                        access_zone_id1: room1,
                        access_zone_id2: room0,
                    }],
                    db.addEvent);

                await dec.simple(db.addEvent,
                    [{
                        ...params.events.staff5.day7.event2,
                        user_id: staff5,
                        device_id: device2,
                        access_zone_id1: room2,
                        access_zone_id2: room1,
                    }],
                    db.addEvent);

                await dec.simple(db.addEvent,
                    [{
                        ...params.events.staff5.day7.event3,
                        user_id: staff5,
                        device_id: device2,
                        access_zone_id1: room1,
                        access_zone_id2: room2,
                    }],
                    db.addEvent);

                await dec.simple(db.addEvent,
                    [{
                        ...params.events.staff5.day7.event4,
                        user_id: staff5,
                        device_id: device1,
                        access_zone_id1: room0,
                        access_zone_id2: room1,
                    }],
                    db.addEvent);

                //События Сотрудника 5 - День 8
                await dec.simple(db.addEvent,
                    [{
                        ...params.events.staff5.day8.event1,
                        user_id: staff5,
                        device_id: device1,
                        access_zone_id1: room1,
                        access_zone_id2: room0,
                    }],
                    db.addEvent);

                await dec.simple(db.addEvent,
                    [{
                        ...params.events.staff5.day8.event2,
                        user_id: staff5,
                        device_id: device2,
                        access_zone_id1: room2,
                        access_zone_id2: room1,
                    }],
                    db.addEvent);

                await dec.simple(db.addEvent,
                    [{
                        ...params.events.staff5.day8.event3,
                        user_id: staff5,
                        device_id: device2,
                        access_zone_id1: room1,
                        access_zone_id2: room2,
                    }],
                    db.addEvent);

                await dec.simple(db.addEvent,
                    [{
                        ...params.events.staff5.day8.event4,
                        user_id: staff5,
                        device_id: device1,
                        access_zone_id1: room0,
                        access_zone_id2: room1,
                    }],
                    db.addEvent);

                //События Сотрудника 5 - Май(2023)
                await dec.simple(db.addEvent,
                    [{
                        ...params.events.staff5.day9.event1,
                        user_id: staff5,
                        device_id: device1,
                        access_zone_id1: room1,
                        access_zone_id2: room0,
                    }],
                    db.addEvent);

                await dec.simple(db.addEvent,
                    [{
                        ...params.events.staff5.day9.event2,
                        user_id: staff5,
                        device_id: device2,
                        access_zone_id1: room2,
                        access_zone_id2: room1,
                    }],
                    db.addEvent);

                //События Сотрудника 5 - Март(2023)
                await dec.simple(db.addEvent,
                    [{
                        ...params.events.staff5.day10.event1,
                        user_id: staff5,
                        device_id: device1,
                        access_zone_id1: room1,
                        access_zone_id2: room0,
                    }],
                    db.addEvent);

                await dec.simple(db.addEvent,
                    [{
                        ...params.events.staff5.day10.event2,
                        user_id: staff5,
                        device_id: device2,
                        access_zone_id1: room2,
                        access_zone_id2: room1,
                    }],
                    db.addEvent);

                //События Сотрудника 5 - Декабрь(2022)
                await dec.simple(db.addEvent,
                    [{
                        ...params.events.staff5.day11.event1,
                        user_id: staff5,
                        device_id: device1,
                        access_zone_id1: room1,
                        access_zone_id2: room0,
                    }],
                    db.addEvent);

                await dec.simple(db.addEvent,
                    [{
                        ...params.events.staff5.day11.event2,
                        user_id: staff5,
                        device_id: device2,
                        access_zone_id1: room2,
                        access_zone_id2: room1,
                    }],
                    db.addEvent);

                //События Сотрудника 5 - Июнь(2022)
                await dec.simple(db.addEvent,
                    [{
                        ...params.events.staff5.day12.event1,
                        user_id: staff5,
                        device_id: device1,
                        access_zone_id1: room1,
                        access_zone_id2: room0,
                    }],
                    db.addEvent);

                await dec.simple(db.addEvent,
                    [{
                        ...params.events.staff5.day12.event2,
                        user_id: staff5,
                        device_id: device2,
                        access_zone_id1: room2,
                        access_zone_id2: room1,
                    }],
                    db.addEvent);

                //События Сотрудника 5 - Текущий день
                await dec.simple(db.addEvent,
                    [{
                        ...params.events.staff5.day14.event1,
                        user_id: staff5,
                        device_id: device1,
                        access_zone_id1: room1,
                        access_zone_id2: room0,
                    }],
                    db.addEvent);

                //События Сотрудника 6 - День 1
                await dec.simple(db.addEvent,
                    [{
                        ...params.events.staff6.day1.event1,
                        user_id: staff6,
                        device_id: device1,
                        access_zone_id1: room1,
                        access_zone_id2: room0,
                    }],
                    db.addEvent);

                await dec.simple(db.addEvent,
                    [{
                        ...params.events.staff6.day1.event2,
                        user_id: staff6,
                        device_id: device2,
                        access_zone_id1: room2,
                        access_zone_id2: room1,
                    }],
                    db.addEvent);

                await dec.simple(db.addEvent,
                    [{
                        ...params.events.staff6.day1.event3,
                        user_id: staff6,
                        device_id: device2,
                        access_zone_id1: room1,
                        access_zone_id2: room2,
                    }],
                    db.addEvent);

                await dec.simple(db.addEvent,
                    [{
                        ...params.events.staff6.day1.event4,
                        user_id: staff6,
                        device_id: device1,
                        access_zone_id1: room0,
                        access_zone_id2: room1,
                    }],
                    db.addEvent);

                //События Сотрудника 7 - День 1
                await dec.simple(db.addEvent,
                    [{
                        ...params.events.staff7.day1.event1,
                        user_id: staff7,
                        device_id: device1,
                        access_zone_id1: room1,
                        access_zone_id2: room0,
                    }],
                    db.addEvent);

                await dec.simple(db.addEvent,
                    [{
                        ...params.events.staff7.day1.event2,
                        user_id: staff7,
                        device_id: device2,
                        access_zone_id1: room2,
                        access_zone_id2: room1,
                    }],
                    db.addEvent);

                await dec.simple(db.addEvent,
                    [{
                        ...params.events.staff7.day1.event3,
                        user_id: staff7,
                        device_id: device2,
                        access_zone_id1: room1,
                        access_zone_id2: room2,
                    }],
                    db.addEvent);

                await dec.simple(db.addEvent,
                    [{
                        ...params.events.staff7.day1.event4,
                        user_id: staff7,
                        device_id: device1,
                        access_zone_id1: room0,
                        access_zone_id2: room1,
                    }],
                    db.addEvent);

                //События Сотрудника 8 - День 1
                await dec.simple(db.addEvent,
                    [{
                        ...params.events.staff8.day1.event1,
                        user_id: staff8,
                        device_id: device1,
                        access_zone_id1: room1,
                        access_zone_id2: room0,
                    }],
                    db.addEvent);

                await dec.simple(db.addEvent,
                    [{
                        ...params.events.staff8.day1.event2,
                        user_id: staff8,
                        device_id: device2,
                        access_zone_id1: room2,
                        access_zone_id2: room1,
                    }],
                    db.addEvent);

                await dec.simple(db.addEvent,
                    [{
                        ...params.events.staff8.day1.event3,
                        user_id: staff8,
                        device_id: device2,
                        access_zone_id1: room1,
                        access_zone_id2: room2,
                    }],
                    db.addEvent);

                await dec.simple(db.addEvent,
                    [{
                        ...params.events.staff8.day1.event4,
                        user_id: staff8,
                        device_id: device1,
                        access_zone_id1: room0,
                        access_zone_id2: room1,
                    }],
                    db.addEvent);
            });
        });
    });

    const addURVDocument = () => describe('Добавления оправдательных документов сотрудникам для тестирования УРВ.', () => {
        const params = {...dataURV}

        befSupporting();
        aft();

        it('Добавление оправдательных документов сотруднкиа в БД.', async () => {
            const cook = await page.base.getCookie('token');
            const arrStaff = await api.getStaff(cook.text);
            const staff1 = arrStaff.text.filter(obj => obj.name === params.fio.staff1)[0].id;
            const staff2 = arrStaff.text.filter(obj => obj.name === params.fio.staff2)[0].id;
            const staff4 = arrStaff.text.filter(obj => obj.name === params.fio.staff4)[0].id;
            const staff5 = arrStaff.text.filter(obj => obj.name === params.fio.staff5)[0].id;

            await dec.simple(db.addDocument,
                [{
                    user_id: staff1,
                    doc_id: 5,
                    doc_creation_date: '"2023-03-25"',
                    duration: '"00:02:00"',
                    doc_begin_date: '"2023-06-04"',
                    doc_end_date: '"2023-06-04"',
                    doc_number: '1',
                    no_calculate: 0,
                    is_complex: 0,
                    operator_id: 1
                }],
                db.addDocument);

            await dec.simple(db.addDocument,
                [{
                    user_id: staff1,
                    doc_id: 27,
                    doc_creation_date: '"2023-03-25"',
                    duration: '"00:02:00"',
                    doc_begin_date: '"2023-06-06"',
                    doc_end_date: '"2023-06-06"',
                    doc_number: '2',
                    no_calculate: 0,
                    is_complex: 0,
                    operator_id: 1
                }],
                db.addDocument);

            await dec.simple(db.addDocument,
                [{
                    user_id: staff1,
                    doc_id: 92,
                    doc_creation_date: '"2023-03-25"',
                    duration: '"00:02:00"',
                    doc_begin_date: '"2023-06-10"',
                    doc_end_date: '"2023-06-10"',
                    doc_number: '4',
                    no_calculate: 0,
                    is_complex: 0,
                    operator_id: 1
                }],
                db.addDocument);

            await dec.simple(db.addDocument,
                [{
                    user_id: staff2,
                    doc_id: 5,
                    doc_creation_date: '"2023-03-25"',
                    duration: '"00:02:00"',
                    doc_begin_date: '"2023-06-06"',
                    doc_end_date: '"2023-06-06"',
                    doc_number: '1',
                    no_calculate: 0,
                    is_complex: 0,
                    operator_id: 1
                }],
                db.addDocument);

            await dec.simple(db.addDocument,
                [{
                    user_id: staff2,
                    doc_id: 27,
                    doc_creation_date: '"2023-03-25"',
                    duration: '"00:02:00"',
                    doc_begin_date: '"2023-06-10"',
                    doc_end_date: '"2023-06-10"',
                    doc_number: '2',
                    no_calculate: 0,
                    is_complex: 0,
                    operator_id: 1
                }],
                db.addDocument);

            await dec.simple(db.addDocument,
                [{
                    user_id: staff2,
                    doc_id: 92,
                    doc_creation_date: '"2023-03-25"',
                    duration: '"00:02:00"',
                    doc_begin_date: '"2023-06-18"',
                    doc_end_date: '"2023-06-18"',
                    doc_number: '4',
                    no_calculate: 0,
                    is_complex: 0,
                    operator_id: 1
                }],
                db.addDocument);

            await dec.simple(db.addDocument,
                [{
                    user_id: staff4,
                    doc_id: 92,
                    doc_creation_date: '"2023-03-25"',
                    duration: '"00:02:00"',
                    doc_begin_date: '"2023-06-11"',
                    doc_end_date: '"2023-06-11"',
                    doc_number: '4',
                    no_calculate: 0,
                    is_complex: 0,
                    operator_id: 1
                }],
                db.addDocument);

            await dec.simple(db.addDocument,
                [{
                    user_id: staff5,
                    doc_id: 92,
                    doc_creation_date: '"2023-03-25"',
                    duration: '"00:02:00"',
                    doc_begin_date: '"2023-06-02"',
                    doc_end_date: '"2023-06-02"',
                    doc_number: '4',
                    no_calculate: 0,
                    is_complex: 0,
                    operator_id: 1
                }],
                db.addDocument);
        });

    });

    const deleteURV = () => describe('Удаление данных для тестирования раздела УРВ.', () => {

        bef();
        aft();

        const params = {...data}

        describe('Удаление праздников', () => {
            it('Удаление праздников', async () => {
                const cook = await page.base.getCookie('token');
                await dec.simple(api.deleteHoliday,
                    [params.holiday.year, cook.text],
                    api.deleteHoliday);
            });
        });

        describe('Удаление проходов сотрудникам', async () => {
            decorate.db.truncateEvent();
        });

        describe('Удаление сотрудников', () => {
            decorate.db.deleteUserFIO({
                lastName: params.staffs.staff1.last_name,
                name: params.staffs.staff1.first_name,
                middleName: params.staffs.staff1.middle_name
            });
            decorate.db.deleteUserFIO({
                lastName: params.staffs.staff2.last_name,
                name: params.staffs.staff2.first_name,
                middleName: params.staffs.staff2.middle_name
            });
            decorate.db.deleteUserFIO({
                lastName: params.staffs.staff3.last_name,
                name: params.staffs.staff3.first_name,
                middleName: params.staffs.staff3.middle_name
            });
            decorate.db.deleteUserFIO({
                lastName: params.staffs.staff4.last_name,
                name: params.staffs.staff4.first_name,
                middleName: params.staffs.staff4.middle_name
            });
            decorate.db.deleteUserFIO({
                lastName: params.staffs.staff5.last_name,
                name: params.staffs.staff5.first_name,
                middleName: params.staffs.staff5.middle_name
            });
            decorate.db.deleteUserFIO({
                lastName: params.staffs.staff6.last_name,
                name: params.staffs.staff6.first_name,
                middleName: params.staffs.staff6.middle_name
            });
            decorate.db.deleteUserFIO({
                lastName: params.staffs.staff7.last_name,
                name: params.staffs.staff7.first_name,
                middleName: params.staffs.staff7.middle_name
            });
            decorate.db.deleteUserFIO({
                lastName: params.staffs.staff8.last_name,
                name: params.staffs.staff8.first_name,
                middleName: params.staffs.staff8.middle_name
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
            decorate.db.deletePosition({
                name: params.positions.position5.name
            });
            decorate.db.deletePosition({
                name: params.positions.position6.name
            });
            decorate.db.deletePosition({
                name: params.positions.position7.name
            });
            decorate.db.deletePosition({
                name: params.positions.position8.name
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
            decorate.db.deleteDivision({
                name: params.divisions.division5.name
            });
            decorate.db.deleteDivision({
                name: params.divisions.division6.name
            });
            decorate.db.deleteDivision({
                name: params.divisions.division7.name
            });
            decorate.db.deleteDivision({
                name: params.divisions.division8.name
            });
        });

        describe('Удаление графиков работы', () => {
            decorate.db.deleteSchedule({
                name: params.schedules.schedule1.name
            });
            decorate.db.deleteSchedule({
                name: params.schedules.schedule2.name
            });
            decorate.db.deleteSchedule({
                name: params.schedules.schedule3.name
            });
            decorate.db.deleteSchedule({
                name: params.schedules.schedule4.name
            });
            decorate.db.deleteSchedule({
                name: params.schedules.schedule5.name
            });
            decorate.db.deleteSchedule({
                name: params.schedules.schedule6.name
            });
            decorate.db.deleteSchedule({
                name: params.schedules.schedule7.name
            });
            decorate.db.deleteSchedule({
                name: params.schedules.schedule8.name
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
        addURV,
        deleteURV,
        addURVDocument,
    }
};

module.exports = {
    testSupport: test('support', 'УРВ / Выданные документы - вкладка "Оправдательные".'),
    testPaid: test('paid', 'УРВ / Выданные документы - вкладка "Сверхурочные".'),
    other: other()
}