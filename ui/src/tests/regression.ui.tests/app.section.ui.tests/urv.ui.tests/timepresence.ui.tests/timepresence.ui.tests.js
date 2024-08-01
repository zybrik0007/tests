const {describe, it} = require('mocha');

const entry = require('../../../../../../../entry');
const page = require('../../../../../pages');
const el = require('../../../../../elements');
const dec = require('../../../../../dictionaries/decorate');
const sub = require('../../../../../dictionaries/subsection');
const but = require('../../../../../dictionaries/button-icon');
const api = require('../../../../../dictionaries/api');
const decorate = require('../../../../../decorates');
const db = require('../../../../../database');
const data = require('./timepresence.data');

const bef = () => decorate.befAft.before.beforeTimePresence();
const aft = () => ecorate.befAft.after.after();

const test = () => {

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
            decorate.el.error.checkError({
                timeout: entry.sleep2
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
                { 'Отчет "Время присутствия"': '2023-06-01 - 2023-06-30' },
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
            decorate.el.error.checkError({
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
            decorate.el.error.checkError({
                timeout: entry.sleep2
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
            decorate.el.error.checkError({
                timeout: entry.sleep2
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

const other = () => {

    const addURV = () => describe('Добавление данных для тестирования раздела УРВ.', () => {

        bef();
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
    }
};

module.exports = {
    test: test(),
    other: other()
}