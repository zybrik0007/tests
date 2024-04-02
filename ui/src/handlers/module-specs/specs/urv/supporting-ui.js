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
const data = require('../../data').dataURV;
const url = require('../../../../dictionaries/url');

const befSupporting = () => before('Вход и открытие подраздела "Выданные документы" - вкладка "Оправдательные"',
    async () => {
    await page.base.loading(entry.sleep1);
    await dec.auth(entry.customLogin, entry.customPassword);
    await dec.simple(el.section.handler, [sec.urv, entry.max], el.section);
    await dec.simple(el.subsection.handler, [sub.urv.support, entry.max], el.subsection);
    await dec.simple(el.tab.handler, ['Оправдательные', entry.max], el.tab);
    await dec.simple(page.supporting.init, [entry.max], page.supporting);
    await page.base.loading(entry.sleep1);
});

const befPaidOvertime = () => before('Вход и открытие подраздела "Выданные документы" - вкладка "Сверхурочные"',
    async () => {
    await page.base.loading(entry.sleep1);
    await dec.auth(entry.customLogin, entry.customPassword);
    await dec.simple(el.section.handler, [sec.urv, entry.max], el.section);
    await dec.simple(el.subsection.handler, [sub.urv.support, entry.max], el.subsection);
    await dec.simple(el.tab.handler, ['Сверхурочные', entry.max], el.tab)
    await dec.simple(page.paidOvertime.init, [entry.max], page.paidOvertime);
    await page.base.loading(entry.sleep1);
});

const aft = () => after('Выход', async () => {
    await page.base.loading(entry.sleep1);
    await dec.exit();
    await page.base.loading(entry.sleep1);
});

const other = (type, text) => {

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

module.exports = {
    otherSupport: other('support', 'УРВ / Выданные документы - вкладка "Оправдательные".'),
    otherPaid: other('paid', 'УРВ / Выданные документы - вкладка "Сверхурочные".')
}