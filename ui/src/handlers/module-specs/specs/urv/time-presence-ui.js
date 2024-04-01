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

const bef = () => before('Вход и открытие подраздела "Время присутствия"', async () => {
    await page.base.loading(entry.sleep1);
    await dec.auth(entry.customLogin, entry.customPassword);
    await dec.simple(el.section.handler, [sec.urv, entry.max], el.section);
    await dec.simple(el.subsection.handler, [sub.urv.presence, entry.max], el.subsection);
    await dec.simple(page.timePresence.init, [entry.max], page.timePresence);
    await page.base.loading(entry.sleep1);
});

const aft = () => after('Выход', async () => {
    await page.base.loading(entry.sleep1);
    await dec.exit();
    await page.base.loading(entry.sleep1);
});

const other = () => {

    const checkTable = () => describe('УРВ / Время присутствия. Проверка таблицы.', () => {
        const arrHead = [
            'Сотрудники',
            'Табельный номер',
            'Должность',
            'Подразделение',
            'Дата',
            'Вход',
            'Выход',
            'Присутствие'

        ];
        const  arrData = [
            ['staff name 1', '1', 'position1',  'division1',  '2023-06-01', '09:00:00', '18:00:00', '08:00'],
            ['staff name 1', '1', 'position1',  'division1',  '2023-06-02', '09:00:00', '18:00:00', '09:00'],
            ['staff name 1', '1', 'position1',  'division1',  '2023-06-03', '09:01:00', '18:00:00', '08:59'],
            ['staff name 1', '1', 'position1',  'division1',  '2023-06-04', '09:02:00', '18:00:00', '08:58'],
            ['staff name 1', '1', 'position1',  'division1',  '2023-06-05', '09:00:00', '17:59:00', '08:59'],
            ['staff name 1', '1', 'position1',  'division1',  '2023-06-06', '09:00:00', '17:58:00', '08:58'],
            ['staff name 1', '1', 'position1',  'division1',  '2023-06-07', '09:00:00', '18:00:00', '07:59'],
            ['staff name 1', '1', 'position1',  'division1',  '2023-06-08', '09:00:00', '18:00:00', '07:58'],
            ['staff name 1', '1', 'position1',  'division1',  '2023-06-09', '09:00:00', '18:01:00', '09:01'],
            ['staff name 1', '1', 'position1',  'division1',  '2023-06-10', '08:59:00', '18:01:00', '09:02'],
            ['Итого:', '', '',  '',  '', '', '', '86:54'],
            ['staff name 2', '2', 'position2',  'division2',  '2023-06-02', '09:00:00', '', '15:00'],
            ['staff name 2', '2', 'position2',  'division2',  '2023-06-03', '', '18:00:00', '18:00'],
            ['staff name 2', '2', 'position2',  'division2',  '2023-06-04', '09:01:00', '', '14:59'],
            ['staff name 2', '2', 'position2',  'division2',  '2023-06-05', '', '18:00:00', '18:00'],
            ['staff name 2', '2', 'position2',  'division2',  '2023-06-06', '09:02:00', '', '14:58'],
            ['staff name 2', '2', 'position2',  'division2',  '2023-06-07', '', '18:00:00', '18:00'],
            ['staff name 2', '2', 'position2',  'division2',  '2023-06-08', '09:00:00', '', '15:00'],
            ['staff name 2', '2', 'position2',  'division2',  '2023-06-09', '', '17:59:00', '17:59'],
            ['staff name 2', '2', 'position2',  'division2',  '2023-06-10', '09:00:00', '', '15:00'],
            ['staff name 2', '2', 'position2',  'division2',  '2023-06-11', '', '17:58:00', '17:58'],
            ['Итого:', '', '',  '',  '', '', '', '164:54'],
        ];

        bef();
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
                strCount: 22,
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
    });

    const printTable = () => describe('УРВ / Время присутствия. Проверка печати таблицы.', () => {
        bef();
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
                strCount: 22,
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
                head: 'Сотрудники',
                str: 1,
                cell: 1,
                value: 'staff name 1',
                timeout: entry.max
            });
            decorate.modal.printTable.cellGetText({
                head: 'Табельный номер',
                str: 1,
                cell: 2,
                value: '1',
                timeout: entry.max
            });
            decorate.modal.printTable.cellGetText({
                head: 'Должность',
                str: 1,
                cell: 3,
                value: 'position1',
                timeout: entry.max
            });
            decorate.modal.printTable.cellGetText({
                head: 'Подразделение',
                str: 1,
                cell: 4,
                value: 'division1',
                timeout: entry.max
            });
            decorate.modal.printTable.cellGetText({
                head: 'Дата',
                str: 1,
                cell: 5,
                value: '2023-06-01',
                timeout: entry.max
            });
            decorate.modal.printTable.cellGetText({
                head: 'Вход',
                str: 1,
                cell: 6,
                value: '09:00:00',
                timeout: entry.max
            });
            decorate.modal.printTable.cellGetText({
                head: 'Выход',
                str: 1,
                cell: 7,
                value: '18:00:00',
                timeout: entry.max
            });
            decorate.modal.printTable.cellGetText({
                head: 'Присутствие',
                str: 1,
                cell: 8,
                value: '08:00',
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

    const exportXLSX = () => describe('УРВ / Время присутствия. Проверка экспорта XLSX.', () => {
        const params = {
            nameFile: 'extrapresencereport.xlsx',
            json: [
                { 'Отчет "Время присутствия"': '2024-03-29 13:50:29' },
                {
                    'Отчет "Время присутствия"': 'Фамилия',
                    __EMPTY: 'Имя',
                    __EMPTY_1: 'Отчество',
                    __EMPTY_2: 'Табельный номер',
                    __EMPTY_3: 'Должность',
                    __EMPTY_4: 'Подразделение',
                    __EMPTY_5: 'Дата',
                    __EMPTY_6: 'Вход',
                    __EMPTY_7: 'Выход',
                    __EMPTY_8: 'Присутствие'
                },
                {
                    'Отчет "Время присутствия"': 'staff',
                    __EMPTY: 'name',
                    __EMPTY_1: '1',
                    __EMPTY_2: '1',
                    __EMPTY_3: 'position1',
                    __EMPTY_4: 'division1',
                    __EMPTY_5: '2023-06-01',
                    __EMPTY_6: '09:00:00',
                    __EMPTY_7: '18:00:00',
                    __EMPTY_8: '08:00'
                },
                {
                    'Отчет "Время присутствия"': 'staff',
                    __EMPTY: 'name',
                    __EMPTY_1: '1',
                    __EMPTY_2: '1',
                    __EMPTY_3: 'position1',
                    __EMPTY_4: 'division1',
                    __EMPTY_5: '2023-06-02',
                    __EMPTY_6: '09:00:00',
                    __EMPTY_7: '18:00:00',
                    __EMPTY_8: '09:00'
                },
                {
                    'Отчет "Время присутствия"': 'staff',
                    __EMPTY: 'name',
                    __EMPTY_1: '1',
                    __EMPTY_2: '1',
                    __EMPTY_3: 'position1',
                    __EMPTY_4: 'division1',
                    __EMPTY_5: '2023-06-03',
                    __EMPTY_6: '09:01:00',
                    __EMPTY_7: '18:00:00',
                    __EMPTY_8: '08:59'
                },
                {
                    'Отчет "Время присутствия"': 'staff',
                    __EMPTY: 'name',
                    __EMPTY_1: '1',
                    __EMPTY_2: '1',
                    __EMPTY_3: 'position1',
                    __EMPTY_4: 'division1',
                    __EMPTY_5: '2023-06-04',
                    __EMPTY_6: '09:02:00',
                    __EMPTY_7: '18:00:00',
                    __EMPTY_8: '08:58'
                },
                {
                    'Отчет "Время присутствия"': 'staff',
                    __EMPTY: 'name',
                    __EMPTY_1: '1',
                    __EMPTY_2: '1',
                    __EMPTY_3: 'position1',
                    __EMPTY_4: 'division1',
                    __EMPTY_5: '2023-06-05',
                    __EMPTY_6: '09:00:00',
                    __EMPTY_7: '17:59:00',
                    __EMPTY_8: '08:59'
                },
                {
                    'Отчет "Время присутствия"': 'staff',
                    __EMPTY: 'name',
                    __EMPTY_1: '1',
                    __EMPTY_2: '1',
                    __EMPTY_3: 'position1',
                    __EMPTY_4: 'division1',
                    __EMPTY_5: '2023-06-06',
                    __EMPTY_6: '09:00:00',
                    __EMPTY_7: '17:58:00',
                    __EMPTY_8: '08:58'
                },
                {
                    'Отчет "Время присутствия"': 'staff',
                    __EMPTY: 'name',
                    __EMPTY_1: '1',
                    __EMPTY_2: '1',
                    __EMPTY_3: 'position1',
                    __EMPTY_4: 'division1',
                    __EMPTY_5: '2023-06-07',
                    __EMPTY_6: '09:00:00',
                    __EMPTY_7: '18:00:00',
                    __EMPTY_8: '07:59'
                },
                {
                    'Отчет "Время присутствия"': 'staff',
                    __EMPTY: 'name',
                    __EMPTY_1: '1',
                    __EMPTY_2: '1',
                    __EMPTY_3: 'position1',
                    __EMPTY_4: 'division1',
                    __EMPTY_5: '2023-06-08',
                    __EMPTY_6: '09:00:00',
                    __EMPTY_7: '18:00:00',
                    __EMPTY_8: '07:58'
                },
                {
                    'Отчет "Время присутствия"': 'staff',
                    __EMPTY: 'name',
                    __EMPTY_1: '1',
                    __EMPTY_2: '1',
                    __EMPTY_3: 'position1',
                    __EMPTY_4: 'division1',
                    __EMPTY_5: '2023-06-09',
                    __EMPTY_6: '09:00:00',
                    __EMPTY_7: '18:01:00',
                    __EMPTY_8: '09:01'
                },
                {
                    'Отчет "Время присутствия"': 'staff',
                    __EMPTY: 'name',
                    __EMPTY_1: '1',
                    __EMPTY_2: '1',
                    __EMPTY_3: 'position1',
                    __EMPTY_4: 'division1',
                    __EMPTY_5: '2023-06-10',
                    __EMPTY_6: '08:59:00',
                    __EMPTY_7: '18:01:00',
                    __EMPTY_8: '09:02'
                },
                {
                    'Отчет "Время присутствия"': 'Итого:',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: '',
                    __EMPTY_4: '',
                    __EMPTY_5: '',
                    __EMPTY_6: '',
                    __EMPTY_7: '',
                    __EMPTY_8: '86:54'
                },
                {
                    'Отчет "Время присутствия"': 'staff',
                    __EMPTY: 'name',
                    __EMPTY_1: '2',
                    __EMPTY_2: '2',
                    __EMPTY_3: 'position2',
                    __EMPTY_4: 'division2',
                    __EMPTY_5: '2023-06-02',
                    __EMPTY_6: '09:00:00',
                    __EMPTY_7: '',
                    __EMPTY_8: '15:00'
                },
                {
                    'Отчет "Время присутствия"': 'staff',
                    __EMPTY: 'name',
                    __EMPTY_1: '2',
                    __EMPTY_2: '2',
                    __EMPTY_3: 'position2',
                    __EMPTY_4: 'division2',
                    __EMPTY_5: '2023-06-03',
                    __EMPTY_6: '',
                    __EMPTY_7: '18:00:00',
                    __EMPTY_8: '18:00'
                },
                {
                    'Отчет "Время присутствия"': 'staff',
                    __EMPTY: 'name',
                    __EMPTY_1: '2',
                    __EMPTY_2: '2',
                    __EMPTY_3: 'position2',
                    __EMPTY_4: 'division2',
                    __EMPTY_5: '2023-06-04',
                    __EMPTY_6: '09:01:00',
                    __EMPTY_7: '',
                    __EMPTY_8: '14:59'
                },
                {
                    'Отчет "Время присутствия"': 'staff',
                    __EMPTY: 'name',
                    __EMPTY_1: '2',
                    __EMPTY_2: '2',
                    __EMPTY_3: 'position2',
                    __EMPTY_4: 'division2',
                    __EMPTY_5: '2023-06-05',
                    __EMPTY_6: '',
                    __EMPTY_7: '18:00:00',
                    __EMPTY_8: '18:00'
                },
                {
                    'Отчет "Время присутствия"': 'staff',
                    __EMPTY: 'name',
                    __EMPTY_1: '2',
                    __EMPTY_2: '2',
                    __EMPTY_3: 'position2',
                    __EMPTY_4: 'division2',
                    __EMPTY_5: '2023-06-06',
                    __EMPTY_6: '09:02:00',
                    __EMPTY_7: '',
                    __EMPTY_8: '14:58'
                },
                {
                    'Отчет "Время присутствия"': 'staff',
                    __EMPTY: 'name',
                    __EMPTY_1: '2',
                    __EMPTY_2: '2',
                    __EMPTY_3: 'position2',
                    __EMPTY_4: 'division2',
                    __EMPTY_5: '2023-06-07',
                    __EMPTY_6: '',
                    __EMPTY_7: '18:00:00',
                    __EMPTY_8: '18:00'
                },
                {
                    'Отчет "Время присутствия"': 'staff',
                    __EMPTY: 'name',
                    __EMPTY_1: '2',
                    __EMPTY_2: '2',
                    __EMPTY_3: 'position2',
                    __EMPTY_4: 'division2',
                    __EMPTY_5: '2023-06-08',
                    __EMPTY_6: '09:00:00',
                    __EMPTY_7: '',
                    __EMPTY_8: '15:00'
                },
                {
                    'Отчет "Время присутствия"': 'staff',
                    __EMPTY: 'name',
                    __EMPTY_1: '2',
                    __EMPTY_2: '2',
                    __EMPTY_3: 'position2',
                    __EMPTY_4: 'division2',
                    __EMPTY_5: '2023-06-09',
                    __EMPTY_6: '',
                    __EMPTY_7: '17:59:00',
                    __EMPTY_8: '17:59'
                },
                {
                    'Отчет "Время присутствия"': 'staff',
                    __EMPTY: 'name',
                    __EMPTY_1: '2',
                    __EMPTY_2: '2',
                    __EMPTY_3: 'position2',
                    __EMPTY_4: 'division2',
                    __EMPTY_5: '2023-06-10',
                    __EMPTY_6: '09:00:00',
                    __EMPTY_7: '',
                    __EMPTY_8: '15:00'
                },
                {
                    'Отчет "Время присутствия"': 'staff',
                    __EMPTY: 'name',
                    __EMPTY_1: '2',
                    __EMPTY_2: '2',
                    __EMPTY_3: 'position2',
                    __EMPTY_4: 'division2',
                    __EMPTY_5: '2023-06-11',
                    __EMPTY_6: '',
                    __EMPTY_7: '17:58:00',
                    __EMPTY_8: '17:58'
                },
                {
                    'Отчет "Время присутствия"': 'staff',
                    __EMPTY: 'name',
                    __EMPTY_1: '2',
                    __EMPTY_2: '2',
                    __EMPTY_3: 'position2',
                    __EMPTY_4: 'division2',
                    __EMPTY_5: '2023-06-12',
                    __EMPTY_6: '09:00:00',
                    __EMPTY_7: '23:58:00',
                    __EMPTY_8: '14:59'
                },
                {
                    'Отчет "Время присутствия"': 'staff',
                    __EMPTY: 'name',
                    __EMPTY_1: '2',
                    __EMPTY_2: '2',
                    __EMPTY_3: 'position2',
                    __EMPTY_4: 'division2',
                    __EMPTY_5: '2023-06-13',
                    __EMPTY_6: '',
                    __EMPTY_7: '18:00:00',
                    __EMPTY_8: '18:00'
                },
                {
                    'Отчет "Время присутствия"': 'staff',
                    __EMPTY: 'name',
                    __EMPTY_1: '2',
                    __EMPTY_2: '2',
                    __EMPTY_3: 'position2',
                    __EMPTY_4: 'division2',
                    __EMPTY_5: '2023-06-14',
                    __EMPTY_6: '09:00:00',
                    __EMPTY_7: '23:59:00',
                    __EMPTY_8: '14:59'
                },
                {
                    'Отчет "Время присутствия"': 'staff',
                    __EMPTY: 'name',
                    __EMPTY_1: '2',
                    __EMPTY_2: '2',
                    __EMPTY_3: 'position2',
                    __EMPTY_4: 'division2',
                    __EMPTY_5: '2023-06-15',
                    __EMPTY_6: '03:01:00',
                    __EMPTY_7: '18:00:00',
                    __EMPTY_8: '17:59'
                },
                {
                    'Отчет "Время присутствия"': 'staff',
                    __EMPTY: 'name',
                    __EMPTY_1: '2',
                    __EMPTY_2: '2',
                    __EMPTY_3: 'position2',
                    __EMPTY_4: 'division2',
                    __EMPTY_5: '2023-06-16',
                    __EMPTY_6: '09:00:00',
                    __EMPTY_7: '',
                    __EMPTY_8: '15:00'
                },
                {
                    'Отчет "Время присутствия"': 'staff',
                    __EMPTY: 'name',
                    __EMPTY_1: '2',
                    __EMPTY_2: '2',
                    __EMPTY_3: 'position2',
                    __EMPTY_4: 'division2',
                    __EMPTY_5: '2023-06-17',
                    __EMPTY_6: '',
                    __EMPTY_7: '18:01:00',
                    __EMPTY_8: '18:01'
                },
                {
                    'Отчет "Время присутствия"': 'staff',
                    __EMPTY: 'name',
                    __EMPTY_1: '2',
                    __EMPTY_2: '2',
                    __EMPTY_3: 'position2',
                    __EMPTY_4: 'division2',
                    __EMPTY_5: '2023-06-18',
                    __EMPTY_6: '08:00:00',
                    __EMPTY_7: '',
                    __EMPTY_8: '15:00'
                },
                {
                    'Отчет "Время присутствия"': 'staff',
                    __EMPTY: 'name',
                    __EMPTY_1: '2',
                    __EMPTY_2: '2',
                    __EMPTY_3: 'position2',
                    __EMPTY_4: 'division2',
                    __EMPTY_5: '2023-06-19',
                    __EMPTY_6: '',
                    __EMPTY_7: '18:02:00',
                    __EMPTY_8: '18:02'
                },
                {
                    'Отчет "Время присутствия"': 'Итого:',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: '',
                    __EMPTY_4: '',
                    __EMPTY_5: '',
                    __EMPTY_6: '',
                    __EMPTY_7: '',
                    __EMPTY_8: '296:54'
                },
                {
                    'Отчет "Время присутствия"': 'staff',
                    __EMPTY: 'name',
                    __EMPTY_1: '3',
                    __EMPTY_2: '3',
                    __EMPTY_3: 'position3',
                    __EMPTY_4: 'division3',
                    __EMPTY_5: '2023-06-01',
                    __EMPTY_6: '03:00:00',
                    __EMPTY_7: '23:59:00',
                    __EMPTY_8: '23:59'
                },
                {
                    'Отчет "Время присутствия"': 'Итого:',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: '',
                    __EMPTY_4: '',
                    __EMPTY_5: '',
                    __EMPTY_6: '',
                    __EMPTY_7: '',
                    __EMPTY_8: '23:59'
                },
                {
                    'Отчет "Время присутствия"': 'staff',
                    __EMPTY: 'name',
                    __EMPTY_1: '4',
                    __EMPTY_2: '4',
                    __EMPTY_3: 'position4',
                    __EMPTY_4: 'division4',
                    __EMPTY_5: '2023-06-01',
                    __EMPTY_6: '09:00:00',
                    __EMPTY_7: '18:00:00',
                    __EMPTY_8: '08:00'
                },
                {
                    'Отчет "Время присутствия"': 'staff',
                    __EMPTY: 'name',
                    __EMPTY_1: '4',
                    __EMPTY_2: '4',
                    __EMPTY_3: 'position4',
                    __EMPTY_4: 'division4',
                    __EMPTY_5: '2023-06-02',
                    __EMPTY_6: '09:00:00',
                    __EMPTY_7: '18:00:00',
                    __EMPTY_8: '09:00'
                },
                {
                    'Отчет "Время присутствия"': 'staff',
                    __EMPTY: 'name',
                    __EMPTY_1: '4',
                    __EMPTY_2: '4',
                    __EMPTY_3: 'position4',
                    __EMPTY_4: 'division4',
                    __EMPTY_5: '2023-06-03',
                    __EMPTY_6: '09:01:00',
                    __EMPTY_7: '18:00:00',
                    __EMPTY_8: '08:59'
                },
                {
                    'Отчет "Время присутствия"': 'staff',
                    __EMPTY: 'name',
                    __EMPTY_1: '4',
                    __EMPTY_2: '4',
                    __EMPTY_3: 'position4',
                    __EMPTY_4: 'division4',
                    __EMPTY_5: '2023-06-04',
                    __EMPTY_6: '09:02:00',
                    __EMPTY_7: '18:00:00',
                    __EMPTY_8: '08:58'
                },
                {
                    'Отчет "Время присутствия"': 'staff',
                    __EMPTY: 'name',
                    __EMPTY_1: '4',
                    __EMPTY_2: '4',
                    __EMPTY_3: 'position4',
                    __EMPTY_4: 'division4',
                    __EMPTY_5: '2023-06-05',
                    __EMPTY_6: '09:00:00',
                    __EMPTY_7: '17:59:00',
                    __EMPTY_8: '08:59'
                },
                {
                    'Отчет "Время присутствия"': 'staff',
                    __EMPTY: 'name',
                    __EMPTY_1: '4',
                    __EMPTY_2: '4',
                    __EMPTY_3: 'position4',
                    __EMPTY_4: 'division4',
                    __EMPTY_5: '2023-06-06',
                    __EMPTY_6: '09:00:00',
                    __EMPTY_7: '17:58:00',
                    __EMPTY_8: '08:58'
                },
                {
                    'Отчет "Время присутствия"': 'staff',
                    __EMPTY: 'name',
                    __EMPTY_1: '4',
                    __EMPTY_2: '4',
                    __EMPTY_3: 'position4',
                    __EMPTY_4: 'division4',
                    __EMPTY_5: '2023-06-07',
                    __EMPTY_6: '09:00:00',
                    __EMPTY_7: '18:00:00',
                    __EMPTY_8: '07:59'
                },
                {
                    'Отчет "Время присутствия"': 'staff',
                    __EMPTY: 'name',
                    __EMPTY_1: '4',
                    __EMPTY_2: '4',
                    __EMPTY_3: 'position4',
                    __EMPTY_4: 'division4',
                    __EMPTY_5: '2023-06-08',
                    __EMPTY_6: '09:00:00',
                    __EMPTY_7: '18:00:00',
                    __EMPTY_8: '07:58'
                },
                {
                    'Отчет "Время присутствия"': 'staff',
                    __EMPTY: 'name',
                    __EMPTY_1: '4',
                    __EMPTY_2: '4',
                    __EMPTY_3: 'position4',
                    __EMPTY_4: 'division4',
                    __EMPTY_5: '2023-06-09',
                    __EMPTY_6: '09:00:00',
                    __EMPTY_7: '18:00:00',
                    __EMPTY_8: '07:58'
                },
                {
                    'Отчет "Время присутствия"': 'staff',
                    __EMPTY: 'name',
                    __EMPTY_1: '4',
                    __EMPTY_2: '4',
                    __EMPTY_3: 'position4',
                    __EMPTY_4: 'division4',
                    __EMPTY_5: '2023-06-10',
                    __EMPTY_6: '09:00:00',
                    __EMPTY_7: '18:01:00',
                    __EMPTY_8: '09:01'
                },
                {
                    'Отчет "Время присутствия"': 'staff',
                    __EMPTY: 'name',
                    __EMPTY_1: '4',
                    __EMPTY_2: '4',
                    __EMPTY_3: 'position4',
                    __EMPTY_4: 'division4',
                    __EMPTY_5: '2023-06-11',
                    __EMPTY_6: '08:59:00',
                    __EMPTY_7: '18:01:00',
                    __EMPTY_8: '09:02'
                },
                {
                    'Отчет "Время присутствия"': 'Итого:',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: '',
                    __EMPTY_4: '',
                    __EMPTY_5: '',
                    __EMPTY_6: '',
                    __EMPTY_7: '',
                    __EMPTY_8: '94:52'
                },
                {
                    'Отчет "Время присутствия"': 'staff',
                    __EMPTY: 'name',
                    __EMPTY_1: '5',
                    __EMPTY_2: '5',
                    __EMPTY_3: 'position5',
                    __EMPTY_4: 'division5',
                    __EMPTY_5: '2023-06-01',
                    __EMPTY_6: '09:00:00',
                    __EMPTY_7: '18:00:00',
                    __EMPTY_8: '08:00'
                },
                {
                    'Отчет "Время присутствия"': 'staff',
                    __EMPTY: 'name',
                    __EMPTY_1: '5',
                    __EMPTY_2: '5',
                    __EMPTY_3: 'position5',
                    __EMPTY_4: 'division5',
                    __EMPTY_5: '2023-06-02',
                    __EMPTY_6: '08:59:00',
                    __EMPTY_7: '18:01:00',
                    __EMPTY_8: '09:02'
                },
                {
                    'Отчет "Время присутствия"': 'staff',
                    __EMPTY: 'name',
                    __EMPTY_1: '5',
                    __EMPTY_2: '5',
                    __EMPTY_3: 'position5',
                    __EMPTY_4: 'division5',
                    __EMPTY_5: '2023-06-03',
                    __EMPTY_6: '09:01:00',
                    __EMPTY_7: '18:00:00',
                    __EMPTY_8: '08:59'
                },
                {
                    'Отчет "Время присутствия"': 'staff',
                    __EMPTY: 'name',
                    __EMPTY_1: '5',
                    __EMPTY_2: '5',
                    __EMPTY_3: 'position5',
                    __EMPTY_4: 'division5',
                    __EMPTY_5: '2023-06-04',
                    __EMPTY_6: '09:02:00',
                    __EMPTY_7: '18:00:00',
                    __EMPTY_8: '08:58'
                },
                {
                    'Отчет "Время присутствия"': 'staff',
                    __EMPTY: 'name',
                    __EMPTY_1: '5',
                    __EMPTY_2: '5',
                    __EMPTY_3: 'position5',
                    __EMPTY_4: 'division5',
                    __EMPTY_5: '2023-06-05',
                    __EMPTY_6: '09:00:00',
                    __EMPTY_7: '17:59:00',
                    __EMPTY_8: '08:59'
                },
                {
                    'Отчет "Время присутствия"': 'staff',
                    __EMPTY: 'name',
                    __EMPTY_1: '5',
                    __EMPTY_2: '5',
                    __EMPTY_3: 'position5',
                    __EMPTY_4: 'division5',
                    __EMPTY_5: '2023-06-06',
                    __EMPTY_6: '09:00:00',
                    __EMPTY_7: '17:58:00',
                    __EMPTY_8: '08:58'
                },
                {
                    'Отчет "Время присутствия"': 'staff',
                    __EMPTY: 'name',
                    __EMPTY_1: '5',
                    __EMPTY_2: '5',
                    __EMPTY_3: 'position5',
                    __EMPTY_4: 'division5',
                    __EMPTY_5: '2023-06-07',
                    __EMPTY_6: '09:00:00',
                    __EMPTY_7: '18:00:00',
                    __EMPTY_8: '07:59'
                },
                {
                    'Отчет "Время присутствия"': 'staff',
                    __EMPTY: 'name',
                    __EMPTY_1: '5',
                    __EMPTY_2: '5',
                    __EMPTY_3: 'position5',
                    __EMPTY_4: 'division5',
                    __EMPTY_5: '2023-06-08',
                    __EMPTY_6: '09:00:00',
                    __EMPTY_7: '18:00:00',
                    __EMPTY_8: '07:59'
                },
                {
                    'Отчет "Время присутствия"': 'Итого:',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: '',
                    __EMPTY_4: '',
                    __EMPTY_5: '',
                    __EMPTY_6: '',
                    __EMPTY_7: '',
                    __EMPTY_8: '68:54'
                },
                {
                    'Отчет "Время присутствия"': 'staff',
                    __EMPTY: 'name',
                    __EMPTY_1: '6',
                    __EMPTY_2: '6',
                    __EMPTY_3: 'position6',
                    __EMPTY_4: 'division6',
                    __EMPTY_5: '2023-06-01',
                    __EMPTY_6: '09:00:00',
                    __EMPTY_7: '18:00:00',
                    __EMPTY_8: '09:00'
                },
                {
                    'Отчет "Время присутствия"': 'Итого:',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: '',
                    __EMPTY_4: '',
                    __EMPTY_5: '',
                    __EMPTY_6: '',
                    __EMPTY_7: '',
                    __EMPTY_8: '09:00'
                },
                {
                    'Отчет "Время присутствия"': 'staff',
                    __EMPTY: 'name',
                    __EMPTY_1: '7',
                    __EMPTY_2: '7',
                    __EMPTY_3: 'position7',
                    __EMPTY_4: 'division7',
                    __EMPTY_5: '2023-06-02',
                    __EMPTY_6: '09:00:00',
                    __EMPTY_7: '10:00:00',
                    __EMPTY_8: '15:00'
                },
                {
                    'Отчет "Время присутствия"': 'staff',
                    __EMPTY: 'name',
                    __EMPTY_1: '7',
                    __EMPTY_2: '7',
                    __EMPTY_3: 'position7',
                    __EMPTY_4: 'division7',
                    __EMPTY_5: '2023-06-03',
                    __EMPTY_6: '',
                    __EMPTY_7: '09:00:00',
                    __EMPTY_8: '09:00'
                },
                {
                    'Отчет "Время присутствия"': 'Итого:',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: '',
                    __EMPTY_4: '',
                    __EMPTY_5: '',
                    __EMPTY_6: '',
                    __EMPTY_7: '',
                    __EMPTY_8: '24:00'
                },
                {
                    'Отчет "Время присутствия"': 'staff',
                    __EMPTY: 'name',
                    __EMPTY_1: '8',
                    __EMPTY_2: '8',
                    __EMPTY_3: 'position8',
                    __EMPTY_4: 'division8',
                    __EMPTY_5: '2023-06-01',
                    __EMPTY_6: '09:00:00',
                    __EMPTY_7: '18:00:00',
                    __EMPTY_8: '09:00'
                },
                {
                    'Отчет "Время присутствия"': 'Итого:',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: '',
                    __EMPTY_4: '',
                    __EMPTY_5: '',
                    __EMPTY_6: '',
                    __EMPTY_7: '',
                    __EMPTY_8: '09:00'
                }
            ]
        }

        bef();
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
                strCount: 22,
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
    });

    const exportCSV = () => describe('УРВ / Время присутствия. Проверка экспорта CSV.', () => {
        const params = {
            nameFile: 'extrapresencereport.csv',
            json: [
                {
                    'Фамилия': 'staff',
                    'Имя': 'name',
                    'Отчество': 1,
                    'Табельный номер': 1,
                    'Должность': 'position1',
                    'Подразделение': 'division1',
                    'Дата': 45078.12519675926,
                    'Вход': '09:00:00',
                    'Выход': '18:00:00',
                    'Присутствие': '08:00'
                },
                {
                    'Фамилия': 'staff',
                    'Имя': 'name',
                    'Отчество': 1,
                    'Табельный номер': 1,
                    'Должность': 'position1',
                    'Подразделение': 'division1',
                    'Дата': 45079.12519675926,
                    'Вход': '09:00:00',
                    'Выход': '18:00:00',
                    'Присутствие': '09:00'
                },
                {
                    'Фамилия': 'staff',
                    'Имя': 'name',
                    'Отчество': 1,
                    'Табельный номер': 1,
                    'Должность': 'position1',
                    'Подразделение': 'division1',
                    'Дата': 45080.12519675926,
                    'Вход': '09:01:00',
                    'Выход': '18:00:00',
                    'Присутствие': '08:59'
                },
                {
                    'Фамилия': 'staff',
                    'Имя': 'name',
                    'Отчество': 1,
                    'Табельный номер': 1,
                    'Должность': 'position1',
                    'Подразделение': 'division1',
                    'Дата': 45081.12519675926,
                    'Вход': '09:02:00',
                    'Выход': '18:00:00',
                    'Присутствие': '08:58'
                },
                {
                    'Фамилия': 'staff',
                    'Имя': 'name',
                    'Отчество': 1,
                    'Табельный номер': 1,
                    'Должность': 'position1',
                    'Подразделение': 'division1',
                    'Дата': 45082.12519675926,
                    'Вход': '09:00:00',
                    'Выход': '17:59:00',
                    'Присутствие': '08:59'
                },
                {
                    'Фамилия': 'staff',
                    'Имя': 'name',
                    'Отчество': 1,
                    'Табельный номер': 1,
                    'Должность': 'position1',
                    'Подразделение': 'division1',
                    'Дата': 45083.12519675926,
                    'Вход': '09:00:00',
                    'Выход': '17:58:00',
                    'Присутствие': '08:58'
                },
                {
                    'Фамилия': 'staff',
                    'Имя': 'name',
                    'Отчество': 1,
                    'Табельный номер': 1,
                    'Должность': 'position1',
                    'Подразделение': 'division1',
                    'Дата': 45084.12519675926,
                    'Вход': '09:00:00',
                    'Выход': '18:00:00',
                    'Присутствие': '07:59'
                },
                {
                    'Фамилия': 'staff',
                    'Имя': 'name',
                    'Отчество': 1,
                    'Табельный номер': 1,
                    'Должность': 'position1',
                    'Подразделение': 'division1',
                    'Дата': 45085.12519675926,
                    'Вход': '09:00:00',
                    'Выход': '18:00:00',
                    'Присутствие': '07:58'
                },
                {
                    'Фамилия': 'staff',
                    'Имя': 'name',
                    'Отчество': 1,
                    'Табельный номер': 1,
                    'Должность': 'position1',
                    'Подразделение': 'division1',
                    'Дата': 45086.12519675926,
                    'Вход': '09:00:00',
                    'Выход': '18:01:00',
                    'Присутствие': '09:01'
                },
                {
                    'Фамилия': 'staff',
                    'Имя': 'name',
                    'Отчество': 1,
                    'Табельный номер': 1,
                    'Должность': 'position1',
                    'Подразделение': 'division1',
                    'Дата': 45087.12519675926,
                    'Вход': '08:59:00',
                    'Выход': '18:01:00',
                    'Присутствие': '09:02'
                },
                { 'Фамилия': 'Итого:', 'Присутствие': '86:54' },
                {
                    'Фамилия': 'staff',
                    'Имя': 'name',
                    'Отчество': 2,
                    'Табельный номер': 2,
                    'Должность': 'position2',
                    'Подразделение': 'division2',
                    'Дата': 45079.12519675926,
                    'Вход': '09:00:00',
                    'Присутствие': '15:00'
                },
                {
                    'Фамилия': 'staff',
                    'Имя': 'name',
                    'Отчество': 2,
                    'Табельный номер': 2,
                    'Должность': 'position2',
                    'Подразделение': 'division2',
                    'Дата': 45080.12519675926,
                    'Выход': '18:00:00',
                    'Присутствие': '18:00'
                },
                {
                    'Фамилия': 'staff',
                    'Имя': 'name',
                    'Отчество': 2,
                    'Табельный номер': 2,
                    'Должность': 'position2',
                    'Подразделение': 'division2',
                    'Дата': 45081.12519675926,
                    'Вход': '09:01:00',
                    'Присутствие': '14:59'
                },
                {
                    'Фамилия': 'staff',
                    'Имя': 'name',
                    'Отчество': 2,
                    'Табельный номер': 2,
                    'Должность': 'position2',
                    'Подразделение': 'division2',
                    'Дата': 45082.12519675926,
                    'Выход': '18:00:00',
                    'Присутствие': '18:00'
                },
                {
                    'Фамилия': 'staff',
                    'Имя': 'name',
                    'Отчество': 2,
                    'Табельный номер': 2,
                    'Должность': 'position2',
                    'Подразделение': 'division2',
                    'Дата': 45083.12519675926,
                    'Вход': '09:02:00',
                    'Присутствие': '14:58'
                },
                {
                    'Фамилия': 'staff',
                    'Имя': 'name',
                    'Отчество': 2,
                    'Табельный номер': 2,
                    'Должность': 'position2',
                    'Подразделение': 'division2',
                    'Дата': 45084.12519675926,
                    'Выход': '18:00:00',
                    'Присутствие': '18:00'
                },
                {
                    'Фамилия': 'staff',
                    'Имя': 'name',
                    'Отчество': 2,
                    'Табельный номер': 2,
                    'Должность': 'position2',
                    'Подразделение': 'division2',
                    'Дата': 45085.12519675926,
                    'Вход': '09:00:00',
                    'Присутствие': '15:00'
                },
                {
                    'Фамилия': 'staff',
                    'Имя': 'name',
                    'Отчество': 2,
                    'Табельный номер': 2,
                    'Должность': 'position2',
                    'Подразделение': 'division2',
                    'Дата': 45086.12519675926,
                    'Выход': '17:59:00',
                    'Присутствие': '17:59'
                },
                {
                    'Фамилия': 'staff',
                    'Имя': 'name',
                    'Отчество': 2,
                    'Табельный номер': 2,
                    'Должность': 'position2',
                    'Подразделение': 'division2',
                    'Дата': 45087.12519675926,
                    'Вход': '09:00:00',
                    'Присутствие': '15:00'
                },
                {
                    'Фамилия': 'staff',
                    'Имя': 'name',
                    'Отчество': 2,
                    'Табельный номер': 2,
                    'Должность': 'position2',
                    'Подразделение': 'division2',
                    'Дата': 45088.12519675926,
                    'Выход': '17:58:00',
                    'Присутствие': '17:58'
                },
                {
                    'Фамилия': 'staff',
                    'Имя': 'name',
                    'Отчество': 2,
                    'Табельный номер': 2,
                    'Должность': 'position2',
                    'Подразделение': 'division2',
                    'Дата': 45089.12519675926,
                    'Вход': '09:00:00',
                    'Выход': '23:58:00',
                    'Присутствие': '14:59'
                },
                {
                    'Фамилия': 'staff',
                    'Имя': 'name',
                    'Отчество': 2,
                    'Табельный номер': 2,
                    'Должность': 'position2',
                    'Подразделение': 'division2',
                    'Дата': 45090.12519675926,
                    'Выход': '18:00:00',
                    'Присутствие': '18:00'
                },
                {
                    'Фамилия': 'staff',
                    'Имя': 'name',
                    'Отчество': 2,
                    'Табельный номер': 2,
                    'Должность': 'position2',
                    'Подразделение': 'division2',
                    'Дата': 45091.12519675926,
                    'Вход': '09:00:00',
                    'Выход': '23:59:00',
                    'Присутствие': '14:59'
                },
                {
                    'Фамилия': 'staff',
                    'Имя': 'name',
                    'Отчество': 2,
                    'Табельный номер': 2,
                    'Должность': 'position2',
                    'Подразделение': 'division2',
                    'Дата': 45092.12519675926,
                    'Вход': '03:01:00',
                    'Выход': '18:00:00',
                    'Присутствие': '17:59'
                },
                {
                    'Фамилия': 'staff',
                    'Имя': 'name',
                    'Отчество': 2,
                    'Табельный номер': 2,
                    'Должность': 'position2',
                    'Подразделение': 'division2',
                    'Дата': 45093.12519675926,
                    'Вход': '09:00:00',
                    'Присутствие': '15:00'
                },
                {
                    'Фамилия': 'staff',
                    'Имя': 'name',
                    'Отчество': 2,
                    'Табельный номер': 2,
                    'Должность': 'position2',
                    'Подразделение': 'division2',
                    'Дата': 45094.12519675926,
                    'Выход': '18:01:00',
                    'Присутствие': '18:01'
                },
                {
                    'Фамилия': 'staff',
                    'Имя': 'name',
                    'Отчество': 2,
                    'Табельный номер': 2,
                    'Должность': 'position2',
                    'Подразделение': 'division2',
                    'Дата': 45095.12519675926,
                    'Вход': '08:00:00',
                    'Присутствие': '15:00'
                },
                {
                    'Фамилия': 'staff',
                    'Имя': 'name',
                    'Отчество': 2,
                    'Табельный номер': 2,
                    'Должность': 'position2',
                    'Подразделение': 'division2',
                    'Дата': 45096.12519675926,
                    'Выход': '18:02:00',
                    'Присутствие': '18:02'
                },
                { 'Фамилия': 'Итого:', 'Присутствие': '296:54' },
                {
                    'Фамилия': 'staff',
                    'Имя': 'name',
                    'Отчество': 3,
                    'Табельный номер': 3,
                    'Должность': 'position3',
                    'Подразделение': 'division3',
                    'Дата': 45078.12519675926,
                    'Вход': '03:00:00',
                    'Выход': '23:59:00',
                    'Присутствие': '23:59'
                },
                { 'Фамилия': 'Итого:', 'Присутствие': '23:59' },
                {
                    'Фамилия': 'staff',
                    'Имя': 'name',
                    'Отчество': 4,
                    'Табельный номер': 4,
                    'Должность': 'position4',
                    'Подразделение': 'division4',
                    'Дата': 45078.12519675926,
                    'Вход': '09:00:00',
                    'Выход': '18:00:00',
                    'Присутствие': '08:00'
                },
                {
                    'Фамилия': 'staff',
                    'Имя': 'name',
                    'Отчество': 4,
                    'Табельный номер': 4,
                    'Должность': 'position4',
                    'Подразделение': 'division4',
                    'Дата': 45079.12519675926,
                    'Вход': '09:00:00',
                    'Выход': '18:00:00',
                    'Присутствие': '09:00'
                },
                {
                    'Фамилия': 'staff',
                    'Имя': 'name',
                    'Отчество': 4,
                    'Табельный номер': 4,
                    'Должность': 'position4',
                    'Подразделение': 'division4',
                    'Дата': 45080.12519675926,
                    'Вход': '09:01:00',
                    'Выход': '18:00:00',
                    'Присутствие': '08:59'
                },
                {
                    'Фамилия': 'staff',
                    'Имя': 'name',
                    'Отчество': 4,
                    'Табельный номер': 4,
                    'Должность': 'position4',
                    'Подразделение': 'division4',
                    'Дата': 45081.12519675926,
                    'Вход': '09:02:00',
                    'Выход': '18:00:00',
                    'Присутствие': '08:58'
                },
                {
                    'Фамилия': 'staff',
                    'Имя': 'name',
                    'Отчество': 4,
                    'Табельный номер': 4,
                    'Должность': 'position4',
                    'Подразделение': 'division4',
                    'Дата': 45082.12519675926,
                    'Вход': '09:00:00',
                    'Выход': '17:59:00',
                    'Присутствие': '08:59'
                },
                {
                    'Фамилия': 'staff',
                    'Имя': 'name',
                    'Отчество': 4,
                    'Табельный номер': 4,
                    'Должность': 'position4',
                    'Подразделение': 'division4',
                    'Дата': 45083.12519675926,
                    'Вход': '09:00:00',
                    'Выход': '17:58:00',
                    'Присутствие': '08:58'
                },
                {
                    'Фамилия': 'staff',
                    'Имя': 'name',
                    'Отчество': 4,
                    'Табельный номер': 4,
                    'Должность': 'position4',
                    'Подразделение': 'division4',
                    'Дата': 45084.12519675926,
                    'Вход': '09:00:00',
                    'Выход': '18:00:00',
                    'Присутствие': '07:59'
                },
                {
                    'Фамилия': 'staff',
                    'Имя': 'name',
                    'Отчество': 4,
                    'Табельный номер': 4,
                    'Должность': 'position4',
                    'Подразделение': 'division4',
                    'Дата': 45085.12519675926,
                    'Вход': '09:00:00',
                    'Выход': '18:00:00',
                    'Присутствие': '07:58'
                },
                {
                    'Фамилия': 'staff',
                    'Имя': 'name',
                    'Отчество': 4,
                    'Табельный номер': 4,
                    'Должность': 'position4',
                    'Подразделение': 'division4',
                    'Дата': 45086.12519675926,
                    'Вход': '09:00:00',
                    'Выход': '18:00:00',
                    'Присутствие': '07:58'
                },
                {
                    'Фамилия': 'staff',
                    'Имя': 'name',
                    'Отчество': 4,
                    'Табельный номер': 4,
                    'Должность': 'position4',
                    'Подразделение': 'division4',
                    'Дата': 45087.12519675926,
                    'Вход': '09:00:00',
                    'Выход': '18:01:00',
                    'Присутствие': '09:01'
                },
                {
                    'Фамилия': 'staff',
                    'Имя': 'name',
                    'Отчество': 4,
                    'Табельный номер': 4,
                    'Должность': 'position4',
                    'Подразделение': 'division4',
                    'Дата': 45088.12519675926,
                    'Вход': '08:59:00',
                    'Выход': '18:01:00',
                    'Присутствие': '09:02'
                },
                { 'Фамилия': 'Итого:', 'Присутствие': '94:52' },
                {
                    'Фамилия': 'staff',
                    'Имя': 'name',
                    'Отчество': 5,
                    'Табельный номер': 5,
                    'Должность': 'position5',
                    'Подразделение': 'division5',
                    'Дата': 45078.12519675926,
                    'Вход': '09:00:00',
                    'Выход': '18:00:00',
                    'Присутствие': '08:00'
                },
                {
                    'Фамилия': 'staff',
                    'Имя': 'name',
                    'Отчество': 5,
                    'Табельный номер': 5,
                    'Должность': 'position5',
                    'Подразделение': 'division5',
                    'Дата': 45079.12519675926,
                    'Вход': '08:59:00',
                    'Выход': '18:01:00',
                    'Присутствие': '09:02'
                },
                {
                    'Фамилия': 'staff',
                    'Имя': 'name',
                    'Отчество': 5,
                    'Табельный номер': 5,
                    'Должность': 'position5',
                    'Подразделение': 'division5',
                    'Дата': 45080.12519675926,
                    'Вход': '09:01:00',
                    'Выход': '18:00:00',
                    'Присутствие': '08:59'
                },
                {
                    'Фамилия': 'staff',
                    'Имя': 'name',
                    'Отчество': 5,
                    'Табельный номер': 5,
                    'Должность': 'position5',
                    'Подразделение': 'division5',
                    'Дата': 45081.12519675926,
                    'Вход': '09:02:00',
                    'Выход': '18:00:00',
                    'Присутствие': '08:58'
                },
                {
                    'Фамилия': 'staff',
                    'Имя': 'name',
                    'Отчество': 5,
                    'Табельный номер': 5,
                    'Должность': 'position5',
                    'Подразделение': 'division5',
                    'Дата': 45082.12519675926,
                    'Вход': '09:00:00',
                    'Выход': '17:59:00',
                    'Присутствие': '08:59'
                },
                {
                    'Фамилия': 'staff',
                    'Имя': 'name',
                    'Отчество': 5,
                    'Табельный номер': 5,
                    'Должность': 'position5',
                    'Подразделение': 'division5',
                    'Дата': 45083.12519675926,
                    'Вход': '09:00:00',
                    'Выход': '17:58:00',
                    'Присутствие': '08:58'
                },
                {
                    'Фамилия': 'staff',
                    'Имя': 'name',
                    'Отчество': 5,
                    'Табельный номер': 5,
                    'Должность': 'position5',
                    'Подразделение': 'division5',
                    'Дата': 45084.12519675926,
                    'Вход': '09:00:00',
                    'Выход': '18:00:00',
                    'Присутствие': '07:59'
                },
                {
                    'Фамилия': 'staff',
                    'Имя': 'name',
                    'Отчество': 5,
                    'Табельный номер': 5,
                    'Должность': 'position5',
                    'Подразделение': 'division5',
                    'Дата': 45085.12519675926,
                    'Вход': '09:00:00',
                    'Выход': '18:00:00',
                    'Присутствие': '07:59'
                },
                { 'Фамилия': 'Итого:', 'Присутствие': '68:54' },
                {
                    'Фамилия': 'staff',
                    'Имя': 'name',
                    'Отчество': 6,
                    'Табельный номер': 6,
                    'Должность': 'position6',
                    'Подразделение': 'division6',
                    'Дата': 45078.12519675926,
                    'Вход': '09:00:00',
                    'Выход': '18:00:00',
                    'Присутствие': '09:00'
                },
                { 'Фамилия': 'Итого:', 'Присутствие': '09:00' },
                {
                    'Фамилия': 'staff',
                    'Имя': 'name',
                    'Отчество': 7,
                    'Табельный номер': 7,
                    'Должность': 'position7',
                    'Подразделение': 'division7',
                    'Дата': 45079.12519675926,
                    'Вход': '09:00:00',
                    'Выход': '10:00:00',
                    'Присутствие': '15:00'
                },
                {
                    'Фамилия': 'staff',
                    'Имя': 'name',
                    'Отчество': 7,
                    'Табельный номер': 7,
                    'Должность': 'position7',
                    'Подразделение': 'division7',
                    'Дата': 45080.12519675926,
                    'Выход': '09:00:00',
                    'Присутствие': '09:00'
                },
                { 'Фамилия': 'Итого:', 'Присутствие': '24:00' },
                {
                    'Фамилия': 'staff',
                    'Имя': 'name',
                    'Отчество': 8,
                    'Табельный номер': 8,
                    'Должность': 'position8',
                    'Подразделение': 'division8',
                    'Дата': 45078.12519675926,
                    'Вход': '09:00:00',
                    'Выход': '18:00:00',
                    'Присутствие': '09:00'
                },
                { 'Фамилия': 'Итого:', 'Присутствие': '09:00' }
            ]
        }

        bef();
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
                strCount: 22,
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
    });

    const divisionFilter = () => describe('УРВ / Время присутствия. Проверка фильтра по подразделению.', () => {

        bef();
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
                strCount: 22,
                timeout: entry.max
            });
        });

        describe('Проверка таблицы до изпользования фильтра "Подразделение"', () => {
            decorate.el.table.size({
                strCount: 22,
                timeout: entry.max
            });
            [...Array(10).keys()].forEach((item1, index1) => {
                decorate.el.table.cellGetText({
                    headTitle: 'Подразделение',
                    strNumber: index1 + 1,
                    cellNumber: 4,
                    value: data.divisions.division1.name,
                    timeout: entry.max
                });
            });
            decorate.el.table.cellGetText({
                headTitle: 'Подразделение',
                strNumber: 11,
                cellNumber: 4,
                value: '',
                timeout: entry.max
            });
            [...Array(10).keys()].forEach((item1, index1) => {
                decorate.el.table.cellGetText({
                    headTitle: 'Подразделение',
                    strNumber: index1 + 12,
                    cellNumber: 4,
                    value: data.divisions.division2.name,
                    timeout: entry.max
                });
            });
            decorate.el.table.cellGetText({
                headTitle: 'Подразделение',
                strNumber: 22,
                cellNumber: 4,
                value: '',
                timeout: entry.max
            });
        });

        describe(`Выбор в фильтре "${data.divisions.division7.name}" через окно выбора`, () => {
            decorate.el.selectInput.iconXpand({
                title: '',
                placeholder: 'Подразделение',
                timeout: entry.max
            });
            decorate.el.selectXpand.xpand({
                timeout: entry.max
            });
            decorate.el.selectXpand.handler({
                value: data.divisions.division7.name,
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
                strCount: 3,
                timeout: entry.max
            });
            decorate.el.table.cellGetText({
                headTitle: 'Подразделение',
                strNumber: 1,
                cellNumber: 4,
                value: data.divisions.division7.name,
                timeout: entry.max
            });
            decorate.el.table.cellGetText({
                headTitle: 'Подразделение',
                strNumber: 2,
                cellNumber: 4,
                value: data.divisions.division7.name,
                timeout: entry.max
            });
            decorate.el.table.cellGetText({
                headTitle: 'Подразделение',
                strNumber: 3,
                cellNumber: 4,
                value: '',
                timeout: entry.max
            });
        });

        describe(`Выбор в фильтре "${data.divisions.division8.name}" через модальное окно "Подразделение"`, () => {
            decorate.el.selectInput.iconOutline({
                title: '',
                placeholder: 'Подразделение',
                timeout: entry.max
            });
            decorate.modal.divisionFilter.init({
                timeout: entry.max
            });
            decorate.el.filterTreeNode.handler({
                name: data.divisions.division8.name,
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
                    cellNumber: 4,
                    value: data.divisions.division8.name,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Подразделение',
                    strNumber: 2,
                    cellNumber: 4,
                    value: '',
                    timeout: entry.max
                });
            });
    });

    const searchFilter = () => describe('УРВ / Время присутствия. Проверка фильтра "Поиск...".', () => {

        bef();
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
                strCount: 22,
                timeout: entry.max
            });
        });

        describe('Проверка таблицы до использования фильтра "Поиск..."', () => {
            decorate.el.table.size({
                strCount: 22,
                timeout: entry.max
            });
            [...Array(10).keys()].forEach((item1, index1) => {
                decorate.el.table.cellGetText({
                    headTitle: 'Подразделение',
                    strNumber: index1 + 1,
                    cellNumber: 4,
                    value: data.divisions.division1.name,
                    timeout: entry.max
                });
            });
            decorate.el.table.cellGetText({
                headTitle: 'Подразделение',
                strNumber: 11,
                cellNumber: 4,
                value: '',
                timeout: entry.max
            });
            [...Array(10).keys()].forEach((item1, index1) => {
                decorate.el.table.cellGetText({
                    headTitle: 'Подразделение',
                    strNumber: index1 + 12,
                    cellNumber: 4,
                    value: data.divisions.division2.name,
                    timeout: entry.max
                });
            });
            decorate.el.table.cellGetText({
                headTitle: 'Подразделение',
                strNumber: 22,
                cellNumber: 4,
                value: '',
                timeout: entry.max
            });
        });

        describe(`Ввод в фильтр "${data.fio.staff7}"`, () => {
            decorate.el.input.sendKeys({
                title: '',
                placeholder: 'Поиск...',
                value: data.fio.staff7,
                timeout: entry.max
            });
        });

        describe('Проверка таблицы после использования фильтра "Поиск..."', () => {
            decorate.el.table.size({
                strCount: 3,
                timeout: entry.max
            });
            decorate.el.table.cellGetText({
                headTitle: 'Сотрудники',
                strNumber: 1,
                cellNumber: 1,
                value: data.fio.staff7,
                timeout: entry.max
            });
            decorate.el.table.cellGetText({
                headTitle: 'Сотрудники',
                strNumber: 2,
                cellNumber: 1,
                value: data.fio.staff7,
                timeout: entry.max
            });
            decorate.el.table.cellGetText({
                headTitle: 'Сотрудники',
                strNumber: 3,
                cellNumber: 1,
                value: 'Итого:',
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
                strCount: 22,
                timeout: entry.max
            });
            [...Array(10).keys()].forEach((item1, index1) => {
                decorate.el.table.cellGetText({
                    headTitle: 'Подразделение',
                    strNumber: index1 + 1,
                    cellNumber: 4,
                    value: data.divisions.division1.name,
                    timeout: entry.max
                });
            });
            decorate.el.table.cellGetText({
                headTitle: 'Подразделение',
                strNumber: 11,
                cellNumber: 4,
                value: '',
                timeout: entry.max
            });
            [...Array(10).keys()].forEach((item1, index1) => {
                decorate.el.table.cellGetText({
                    headTitle: 'Подразделение',
                    strNumber: index1 + 12,
                    cellNumber: 4,
                    value: data.divisions.division2.name,
                    timeout: entry.max
                });
            });
            decorate.el.table.cellGetText({
                headTitle: 'Подразделение',
                strNumber: 22,
                cellNumber: 4,
                value: '',
                timeout: entry.max
            });
        });
    });

    const resetFilter = () => describe('УРВ / Время присутствия. Проверка "Сбросить фильтры".', () => {

        bef();
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
        });

        describe('Проверка таблицы до использования фильтров', () => {
            decorate.el.table.size({
                strCount: 22,
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
                strCount: 1,
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
                strCount: 22,
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
    other: other()
}