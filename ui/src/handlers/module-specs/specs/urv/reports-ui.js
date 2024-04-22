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

const bef = () => before('Вход и открытие подраздела "Отчёт УРВ"', async () => {
    await page.base.loading(entry.sleep1);
    await dec.auth(entry.customLogin, entry.customPassword);
    await dec.simple(el.section.handler, [sec.urv, entry.max], el.section);
    await dec.simple(el.subsection.handler, [sub.urv.report, entry.max], el.subsection);
    await dec.simple(page.reports.init, [entry.max], page.reports);
    await page.base.loading(entry.sleep1);
});

const aft = () => after('Выход', async () => {
    await page.base.loading(entry.sleep1);
    await dec.exit();
    await page.base.loading(entry.sleep1);
});

const other = () => {

    const calculationDateReports = () => describe('УРВ. Отчёт УРВ.' +
        'Выполнить пересчет 2023-06-01 - 2023-06-30.', () => {
        bef();
        aft();

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
        decorate.el.butIcBefore.handler({
            icon: but.action_update,
            timeout: entry.max
        });
        decorate.el.success.success({
            text: '"Расчет УРВ запущен"',
            timeout: entry.max
        });
        decorate.page.base.loading({
            timeout: entry.urv
        });
    });

    const checkCalculationReports = () => describe('УРВ. Отчёт УРВ. Проверка таблицы и расчетов', () => {

        const arrayTitle = ['Сотрудники',
            'Табельный номер',
            'Должность',
            'Подразделение',
            'Четверг, 2023-06-01',
            'Пятницы, 2023-06-02',
            'Суббота, 2023-06-03',
            'Воскресенье, 2023-06-04',
            'Понедельник, 2023-06-05',
            'Вторник, 2023-06-06',
            'Среда, 2023-06-07',
            'Четверг, 2023-06-08',
            'Пятницы, 2023-06-09',
            'Суббота, 2023-06-10',
            'Воскресенье, 2023-06-11',
            'Понедельник, 2023-06-12',
            'Вторник, 2023-06-13',
            'Среда, 2023-06-14',
            'Четверг, 2023-06-15',
            'Пятницы, 2023-06-16',
            'Суббота, 2023-06-17',
            'Воскресенье, 2023-06-18',
            'Понедельник, 2023-06-19',
            'Вторник, 2023-06-20',
            'Среда, 2023-06-21',
            'Четверг, 2023-06-22',
            'Пятницы, 2023-06-23',
            'Суббота, 2023-06-24',
            'Воскресенье, 2023-06-25',
            'Понедельник, 2023-06-26',
            'Вторник, 2023-06-27',
            'Среда, 2023-06-28',
            'Четверг, 2023-06-29',
            'Пятницы, 2023-06-30',
            'Рабочее время',
            'Задолженность - Текущая',
            'Задолженность - За предыдущий период',
            'Баланс отработанного времени',
            '1-15 - без учета задолженности',
            '1-15 - с учетом задолженности',
            '16-31 - без учета задолженности',
            '16-31 - с учетом задолженности',
            '1-31 - без учета задолженности',
            '1-31 - с учетом задолженности',
            'Работа в ночное время',
            'Время по оправдательным документам',
            'Время по документам добавленным к рабочему времени',
            'Сверхурочные',
            'Работа в праздничные и выходные дни'
        ];
        const arrayStr = [
            [
                'staff name 1', '1', 'position1', 'division1', '08:00',
                '08:00', '08:00', '08:00', '08:00', '07:58',
                '08:00', '07:58', '08:00', '08:00', '00:00',
                '00:00', '00:00', '00:00', '00:00', '00:00',
                '00:00', '00:00', '00:00', '00:00', '00:00',
                '00:00', '00:00', '00:00', '00:00', '00:00',
                '00:00', '00:00', '00:00', '00:00', '79:56',
                '00:00', '00:00', '-140:02', '79:56', '79:56',
                '00:00', '00:00', '79:56', '79:56', '10:00',
                '00:02', '00:02', '00:02', '00:00'
            ],
            [
                'staff name 2', '2', 'position2', 'division2', '00:00',
                '32:40', '00:00', '32:40', '00:00', '32:40',
                '00:00', '32:40', '00:00', '32:38', '00:00',
                '32:40', '00:00', '32:40', '00:00', '32:40',
                '00:00', '32:40', '00:00', '00:00', '00:00',
                '00:00', '00:00', '00:00', '00:00', '00:00',
                '00:00', '00:00', '00:00', '00:00', '293:58',
                '00:00', '00:00', '-196:02', '228:38', '228:38',
                '65:20', '65:20', '293:58', '293:58', '18:00',
                '00:02', '00:02', '00:02', '00:00'
            ],
            [
                'staff name 3', '3', 'position3', 'division3', '23:59',
                '00:00', '00:00', '00:00', '00:00', '00:00',
                '00:00', '00:00', '00:00', '00:00', '00:00',
                '00:00', '00:00', '00:00', '00:00', '00:00',
                '00:00', '00:00', '00:00', '00:00', '00:00',
                '00:00', '00:00', '00:00', '00:00', '00:00',
                '00:00', '00:00', '00:00', '00:00',  '23:59',
                '00:00', '00:00', '00:00', '23:59', '23:59',
                '00:00', '00:00', '23:59', '23:59', '01:00',
                '00:00', '00:00', '00:00', '00:00'
            ],
            [
                'staff name 4', '4', 'position4', 'division4', '08:00',
                '08:00', '08:00', '07:58(08:00)', '08:00', '07:58(08:00)',
                '08:00', '07:58(08:00)', '07:58(08:00)', '08:00', '08:00',
                '00:00', '00:00', '00:00', '00:00', '00:00',
                '00:00', '00:00', '00:00', '00:00', '00:00',
                '00:00', '00:00', '00:00', '00:00', '00:00',
                '00:00', '00:00', '00:00', '00:00', '87:52',
                '00:08', '00:00', '-00:08', '87:52', '88:00',
                '00:00', '00:00', '87:52', '88:00', '11:00',
                '00:00', '00:00', '00:02', '00:00'
            ],
            [
                'staff name 5', '5', 'position5', 'division5', '08:00',
                '08:00', '07:59(08:00)', '07:58(08:00)', '07:59(08:00)', '07:58(08:00)',
                '07:59(08:00)', '07:59(08:00)', '00:00', '00:00', '00:00',
                '00:00', '00:00', '00:00', '00:00', '00:00',
                '00:00', '00:00', '00:00', '00:00', '00:00',
                '00:00', '00:00', '00:00', '00:00', '00:00',
                '00:00', '00:00', '00:00', '00:00', '63:52',
                '00:08', '00:00', '-00:07', '63:52', '64:00',
                '00:00', '00:00', '63:52', '64:00', '08:00',
                '00:00', '00:00', '00:02', '00:00'
            ],
            [
                'staff name 6', '6', 'position6', 'division6', '08:00',
                '00:00', '00:00', '00:00', '00:00', '00:00',
                '00:00', '00:00', '00:00', '00:00', '00:00',
                '00:00', '00:00', '00:00', '00:00', '00:00',
                '00:00', '00:00', '00:00', '00:00', '00:00',
                '00:00', '00:00', '00:00', '00:00', '00:00',
                '00:00', '00:00', '00:00', '00:00',  '08:00',
                '00:00', '00:00', '-232:00', '08:00', '08:00',
                '00:00', '00:00', '08:00', '08:00', '01:00',
                '00:00', '00:00', '00:00', '00:00'
            ],
            [
                'staff name 7', '7', 'position7', 'division7', '00:00',
                '23:40', '00:00', '00:00', '00:00', '00:00',
                '00:00', '00:00', '00:00', '00:00', '00:00',
                '00:00', '00:00', '00:00', '00:00', '00:00',
                '00:00', '00:00', '00:00', '00:00', '00:00',
                '00:00', '00:00', '00:00', '00:00', '00:00',
                '00:00', '00:00', '00:00', '00:00',  '23:40',
                '00:00', '00:00', '-457:20', '23:40', '23:40',
                '00:00', '00:00', '23:40', '23:40', '01:00',
                '00:00', '00:00', '00:00', '00:00'
            ],
            [
                'staff name 8', '8', 'position8', 'division8', '09:00',
                '00:00', '00:00', '00:00', '00:00', '00:00',
                '00:00', '00:00', '00:00', '00:00', '00:00',
                '00:00', '00:00', '00:00', '00:00', '00:00',
                '00:00', '00:00', '00:00', '00:00', '00:00',
                '00:00', '00:00', '00:00', '00:00', '00:00',
                '00:00', '00:00', '00:00', '00:00',  '09:00',
                '00:00', '00:00', '00:00', '09:00', '09:00',
                '00:00', '00:00', '09:00', '09:00', '01:00',
                '00:00', '00:00', '00:00', '00:00'
            ]
        ];

        bef();
        aft();

        describe('Выбор даты проверки 2023-06-01 - 2023-06-30', () => {
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

        describe('Проверка расчетов в таблице', () => {
            arrayStr.forEach((item1, index1) => {
                describe(`Проверка строки ${index1 + 1}`, () => {
                    item1.forEach((item2, index2) => {
                        it(`В таблице в строке ${index1 + 1} в столбце ${index2 + 1} - "${arrayTitle[index2]}" отображается "${item2}".`,
                            async () => await dec.simpleText(el.table.cellGetTextNoHead,
                                [index1 + 1, index2 + 1, entry.max],
                                item2,
                                el.table)
                        );
                    });
                });

            });
        });
    });

    const printReports = () => describe('УРВ. Отчёт УРВ. Проверка печати.', () => {

        const arrayTitle = [
            'Сотрудники',
            'Табельный номер',
            'Должность',
            'Подразделение',
            'Четверг, 2023-06-01',
            'Пятница, 2023-06-02',
            'Суббота, 2023-06-03',
            'Воскресенье, 2023-06-04',
            'Понедельник, 2023-06-05',
            'Вторник, 2023-06-06',
            'Среда, 2023-06-07',
            'Четверг, 2023-06-08',
            'Пятница, 2023-06-09',
            'Суббота, 2023-06-10',
            'Воскресенье, 2023-06-11',
            'Понедельник, 2023-06-12',
            'Вторник, 2023-06-13',
            'Среда, 2023-06-14',
            'Четверг, 2023-06-15',
            'Пятница, 2023-06-16',
            'Суббота, 2023-06-17',
            'Воскресенье, 2023-06-18',
            'Понедельник, 2023-06-19',
            'Вторник, 2023-06-20',
            'Среда, 2023-06-21',
            'Четверг, 2023-06-22',
            'Пятница, 2023-06-23',
            'Суббота, 2023-06-24',
            'Воскресенье, 2023-06-25',
            'Понедельник, 2023-06-26',
            'Вторник, 2023-06-27',
            'Среда, 2023-06-28',
            'Четверг, 2023-06-29',
            'Пятница, 2023-06-30',
            'Рабочее время',
            'Баланс отработанного времени',
            'Работа в ночное время',
            'Время по оправдательным документам',
            'Время по документам добавляемым к рабочему времени',
            'Сверхурочные',
            'Работа в праздничные и выходные дни'
        ];
        const arrayStr1 = [
            'staff name 1', '1', 'position1', 'division1', '08:00',
            '08:00', '08:00', '08:00', '08:00', '07:58',
            '08:00', '07:58', '08:00', '08:00', '00:00',
            '00:00', '00:00', '00:00', '00:00', '00:00',
            '00:00', '00:00', '00:00', '00:00', '00:00',
            '00:00', '00:00', '00:00', '00:00', '00:00',
            '00:00', '00:00', '00:00', '00:00', '79:56',
            '-140:02', '10:00', '00:02', '00:02', '00:02',
            '00:00'
        ];

        bef();
        aft();

        describe('Выбор даты проверки 2023-06-01 - 2023-06-30', () => {
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

        describe('Проверка строки 1', () => {
            arrayStr1.forEach((item, index) => {
                decorate.modal.printTable.cellGetText({
                    head: arrayTitle[index],
                    str: 1,
                    cell: index + 1,
                    value: item,
                    timeout: entry.max
                });
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

    const exportReportsXLSX = () => describe('УРВ. Отчёт УРВ.  Проверка экспорта XLSX.',
        () => {

            const params = {
                nameFile: 'timeattendancereport.xlsx',
                json: [
                    { 'УРВ Отчет': '2023-06-01 - 2023-06-30' },
                    {
                        'УРВ Отчет': 'Фамилия',
                        __EMPTY: 'Имя',
                        __EMPTY_1: 'Отчество',
                        __EMPTY_2: 'Табельный номер',
                        __EMPTY_3: 'Должность',
                        __EMPTY_4: 'Подразделение',
                        __EMPTY_5: 'четверг, 01-06-2023',
                        __EMPTY_6: 'пятница, 02-06-2023',
                        __EMPTY_7: 'суббота, 03-06-2023',
                        __EMPTY_8: 'воскресенье, 04-06-2023',
                        __EMPTY_9: 'понедельник, 05-06-2023',
                        __EMPTY_10: 'вторник, 06-06-2023',
                        __EMPTY_11: 'среда, 07-06-2023',
                        __EMPTY_12: 'четверг, 08-06-2023',
                        __EMPTY_13: 'пятница, 09-06-2023',
                        __EMPTY_14: 'суббота, 10-06-2023',
                        __EMPTY_15: 'воскресенье, 11-06-2023',
                        __EMPTY_16: 'понедельник, 12-06-2023',
                        __EMPTY_17: 'вторник, 13-06-2023',
                        __EMPTY_18: 'среда, 14-06-2023',
                        __EMPTY_19: 'четверг, 15-06-2023',
                        __EMPTY_20: 'пятница, 16-06-2023',
                        __EMPTY_21: 'суббота, 17-06-2023',
                        __EMPTY_22: 'воскресенье, 18-06-2023',
                        __EMPTY_23: 'понедельник, 19-06-2023',
                        __EMPTY_24: 'вторник, 20-06-2023',
                        __EMPTY_25: 'среда, 21-06-2023',
                        __EMPTY_26: 'четверг, 22-06-2023',
                        __EMPTY_27: 'пятница, 23-06-2023',
                        __EMPTY_28: 'суббота, 24-06-2023',
                        __EMPTY_29: 'воскресенье, 25-06-2023',
                        __EMPTY_30: 'понедельник, 26-06-2023',
                        __EMPTY_31: 'вторник, 27-06-2023',
                        __EMPTY_32: 'среда, 28-06-2023',
                        __EMPTY_33: 'четверг, 29-06-2023',
                        __EMPTY_34: 'пятница, 30-06-2023',
                        __EMPTY_35: 'Рабочее время',
                        __EMPTY_36: 'Баланс отработанного времени',
                        __EMPTY_37: 'Работа в ночное время',
                        __EMPTY_38: 'Время по оправдательным документам',
                        __EMPTY_39: 'Время по документам добавляемым к рабочему времени',
                        __EMPTY_40: 'Сверхурочные',
                        __EMPTY_41: 'Работа в праздничные и выходные дни'
                    },
                    {
                        'УРВ Отчет': 'staff',
                        __EMPTY: 'name',
                        __EMPTY_1: '1',
                        __EMPTY_2: '1',
                        __EMPTY_3: 'position1',
                        __EMPTY_4: 'division1',
                        __EMPTY_5: '08:00',
                        __EMPTY_6: '08:00',
                        __EMPTY_7: '08:00',
                        __EMPTY_8: '08:00',
                        __EMPTY_9: '08:00',
                        __EMPTY_10: '07:58',
                        __EMPTY_11: '08:00',
                        __EMPTY_12: '07:58',
                        __EMPTY_13: '08:00',
                        __EMPTY_14: '08:00',
                        __EMPTY_15: '00:00',
                        __EMPTY_16: '00:00',
                        __EMPTY_17: '00:00',
                        __EMPTY_18: '00:00',
                        __EMPTY_19: '00:00',
                        __EMPTY_20: '00:00',
                        __EMPTY_21: '00:00',
                        __EMPTY_22: '00:00',
                        __EMPTY_23: '00:00',
                        __EMPTY_24: '00:00',
                        __EMPTY_25: '00:00',
                        __EMPTY_26: '00:00',
                        __EMPTY_27: '00:00',
                        __EMPTY_28: '00:00',
                        __EMPTY_29: '00:00',
                        __EMPTY_30: '00:00',
                        __EMPTY_31: '00:00',
                        __EMPTY_32: '00:00',
                        __EMPTY_33: '00:00',
                        __EMPTY_34: '00:00',
                        __EMPTY_35: '79:56',
                        __EMPTY_36: '-140:02',
                        __EMPTY_37: '10:00',
                        __EMPTY_38: '00:02',
                        __EMPTY_39: '00:02',
                        __EMPTY_40: '00:02',
                        __EMPTY_41: '00:00'
                    },
                    {
                        'УРВ Отчет': 'staff',
                        __EMPTY: 'name',
                        __EMPTY_1: '2',
                        __EMPTY_2: '2',
                        __EMPTY_3: 'position2',
                        __EMPTY_4: 'division2',
                        __EMPTY_5: '00:00',
                        __EMPTY_6: '32:40',
                        __EMPTY_7: '00:00',
                        __EMPTY_8: '32:40',
                        __EMPTY_9: '00:00',
                        __EMPTY_10: '32:40',
                        __EMPTY_11: '00:00',
                        __EMPTY_12: '32:40',
                        __EMPTY_13: '00:00',
                        __EMPTY_14: '32:38',
                        __EMPTY_15: '00:00',
                        __EMPTY_16: '32:40',
                        __EMPTY_17: '00:00',
                        __EMPTY_18: '32:40',
                        __EMPTY_19: '00:00',
                        __EMPTY_20: '32:40',
                        __EMPTY_21: '00:00',
                        __EMPTY_22: '32:40',
                        __EMPTY_23: '00:00',
                        __EMPTY_24: '00:00',
                        __EMPTY_25: '00:00',
                        __EMPTY_26: '00:00',
                        __EMPTY_27: '00:00',
                        __EMPTY_28: '00:00',
                        __EMPTY_29: '00:00',
                        __EMPTY_30: '00:00',
                        __EMPTY_31: '00:00',
                        __EMPTY_32: '00:00',
                        __EMPTY_33: '00:00',
                        __EMPTY_34: '00:00',
                        __EMPTY_35: '293:58',
                        __EMPTY_36: '-196:02',
                        __EMPTY_37: '18:00',
                        __EMPTY_38: '00:02',
                        __EMPTY_39: '00:02',
                        __EMPTY_40: '00:02',
                        __EMPTY_41: '00:00'
                    },
                    {
                        'УРВ Отчет': 'staff',
                        __EMPTY: 'name',
                        __EMPTY_1: '3',
                        __EMPTY_2: '3',
                        __EMPTY_3: 'position3',
                        __EMPTY_4: 'division3',
                        __EMPTY_5: '23:59',
                        __EMPTY_6: '00:00',
                        __EMPTY_7: '00:00',
                        __EMPTY_8: '00:00',
                        __EMPTY_9: '00:00',
                        __EMPTY_10: '00:00',
                        __EMPTY_11: '00:00',
                        __EMPTY_12: '00:00',
                        __EMPTY_13: '00:00',
                        __EMPTY_14: '00:00',
                        __EMPTY_15: '00:00',
                        __EMPTY_16: '00:00',
                        __EMPTY_17: '00:00',
                        __EMPTY_18: '00:00',
                        __EMPTY_19: '00:00',
                        __EMPTY_20: '00:00',
                        __EMPTY_21: '00:00',
                        __EMPTY_22: '00:00',
                        __EMPTY_23: '00:00',
                        __EMPTY_24: '00:00',
                        __EMPTY_25: '00:00',
                        __EMPTY_26: '00:00',
                        __EMPTY_27: '00:00',
                        __EMPTY_28: '00:00',
                        __EMPTY_29: '00:00',
                        __EMPTY_30: '00:00',
                        __EMPTY_31: '00:00',
                        __EMPTY_32: '00:00',
                        __EMPTY_33: '00:00',
                        __EMPTY_34: '00:00',
                        __EMPTY_35: '23:59',
                        __EMPTY_36: '00:00',
                        __EMPTY_37: '01:00',
                        __EMPTY_38: '00:00',
                        __EMPTY_39: '00:00',
                        __EMPTY_40: ' 00:00',
                        __EMPTY_41: '00:00'
                    },
                    {
                        'УРВ Отчет': 'staff',
                        __EMPTY: 'name',
                        __EMPTY_1: '4',
                        __EMPTY_2: '4',
                        __EMPTY_3: 'position4',
                        __EMPTY_4: 'division4',
                        __EMPTY_5: '08:00',
                        __EMPTY_6: '08:00',
                        __EMPTY_7: '08:00',
                        __EMPTY_8: '07:58(08:00)',
                        __EMPTY_9: '08:00',
                        __EMPTY_10: '07:58(08:00)',
                        __EMPTY_11: '08:00',
                        __EMPTY_12: '07:58(08:00)',
                        __EMPTY_13: '07:58(08:00)',
                        __EMPTY_14: '08:00',
                        __EMPTY_15: '08:00',
                        __EMPTY_16: '00:00',
                        __EMPTY_17: '00:00',
                        __EMPTY_18: '00:00',
                        __EMPTY_19: '00:00',
                        __EMPTY_20: '00:00',
                        __EMPTY_21: '00:00',
                        __EMPTY_22: '00:00',
                        __EMPTY_23: '00:00',
                        __EMPTY_24: '00:00',
                        __EMPTY_25: '00:00',
                        __EMPTY_26: '00:00',
                        __EMPTY_27: '00:00',
                        __EMPTY_28: '00:00',
                        __EMPTY_29: '00:00',
                        __EMPTY_30: '00:00',
                        __EMPTY_31: '00:00',
                        __EMPTY_32: '00:00',
                        __EMPTY_33: '00:00',
                        __EMPTY_34: '00:00',
                        __EMPTY_35: '87:52',
                        __EMPTY_36: '-00:08',
                        __EMPTY_37: '11:00',
                        __EMPTY_38: '00:00',
                        __EMPTY_39: '00:00',
                        __EMPTY_40: '00:02',
                        __EMPTY_41: '00:00'
                    },
                    {
                        'УРВ Отчет': 'staff',
                        __EMPTY: 'name',
                        __EMPTY_1: '5',
                        __EMPTY_2: '5',
                        __EMPTY_3: 'position5',
                        __EMPTY_4: 'division5',
                        __EMPTY_5: '08:00',
                        __EMPTY_6: '08:00',
                        __EMPTY_7: '07:59(08:00)',
                        __EMPTY_8: '07:58(08:00)',
                        __EMPTY_9: '07:59(08:00)',
                        __EMPTY_10: '07:58(08:00)',
                        __EMPTY_11: '07:59(08:00)',
                        __EMPTY_12: '07:59(08:00)',
                        __EMPTY_13: '00:00',
                        __EMPTY_14: '00:00',
                        __EMPTY_15: '00:00',
                        __EMPTY_16: '00:00',
                        __EMPTY_17: '00:00',
                        __EMPTY_18: '00:00',
                        __EMPTY_19: '00:00',
                        __EMPTY_20: '00:00',
                        __EMPTY_21: '00:00',
                        __EMPTY_22: '00:00',
                        __EMPTY_23: '00:00',
                        __EMPTY_24: '00:00',
                        __EMPTY_25: '00:00',
                        __EMPTY_26: '00:00',
                        __EMPTY_27: '00:00',
                        __EMPTY_28: '00:00',
                        __EMPTY_29: '00:00',
                        __EMPTY_30: '00:00',
                        __EMPTY_31: '00:00',
                        __EMPTY_32: '00:00',
                        __EMPTY_33: '00:00',
                        __EMPTY_34: '00:00',
                        __EMPTY_35: '63:52',
                        __EMPTY_36: '-00:07',
                        __EMPTY_37: '08:00',
                        __EMPTY_38: '00:00',
                        __EMPTY_39: '00:00',
                        __EMPTY_40: '00:02',
                        __EMPTY_41: '00:00'
                    },
                    {
                        'УРВ Отчет': 'staff',
                        __EMPTY: 'name',
                        __EMPTY_1: '6',
                        __EMPTY_2: '6',
                        __EMPTY_3: 'position6',
                        __EMPTY_4: 'division6',
                        __EMPTY_5: '08:00',
                        __EMPTY_6: '00:00',
                        __EMPTY_7: '00:00',
                        __EMPTY_8: '00:00',
                        __EMPTY_9: '00:00',
                        __EMPTY_10: '00:00',
                        __EMPTY_11: '00:00',
                        __EMPTY_12: '00:00',
                        __EMPTY_13: '00:00',
                        __EMPTY_14: '00:00',
                        __EMPTY_15: '00:00',
                        __EMPTY_16: '00:00',
                        __EMPTY_17: '00:00',
                        __EMPTY_18: '00:00',
                        __EMPTY_19: '00:00',
                        __EMPTY_20: '00:00',
                        __EMPTY_21: '00:00',
                        __EMPTY_22: '00:00',
                        __EMPTY_23: '00:00',
                        __EMPTY_24: '00:00',
                        __EMPTY_25: '00:00',
                        __EMPTY_26: '00:00',
                        __EMPTY_27: '00:00',
                        __EMPTY_28: '00:00',
                        __EMPTY_29: '00:00',
                        __EMPTY_30: '00:00',
                        __EMPTY_31: '00:00',
                        __EMPTY_32: '00:00',
                        __EMPTY_33: '00:00',
                        __EMPTY_34: '00:00',
                        __EMPTY_35: '08:00',
                        __EMPTY_36: '-232:00',
                        __EMPTY_37: '01:00',
                        __EMPTY_38: '00:00',
                        __EMPTY_39: '00:00',
                        __EMPTY_40: ' 00:00',
                        __EMPTY_41: '00:00'
                    },
                    {
                        'УРВ Отчет': 'staff',
                        __EMPTY: 'name',
                        __EMPTY_1: '7',
                        __EMPTY_2: '7',
                        __EMPTY_3: 'position7',
                        __EMPTY_4: 'division7',
                        __EMPTY_5: '00:00',
                        __EMPTY_6: '23:40',
                        __EMPTY_7: '00:00',
                        __EMPTY_8: '00:00',
                        __EMPTY_9: '00:00',
                        __EMPTY_10: '00:00',
                        __EMPTY_11: '00:00',
                        __EMPTY_12: '00:00',
                        __EMPTY_13: '00:00',
                        __EMPTY_14: '00:00',
                        __EMPTY_15: '00:00',
                        __EMPTY_16: '00:00',
                        __EMPTY_17: '00:00',
                        __EMPTY_18: '00:00',
                        __EMPTY_19: '00:00',
                        __EMPTY_20: '00:00',
                        __EMPTY_21: '00:00',
                        __EMPTY_22: '00:00',
                        __EMPTY_23: '00:00',
                        __EMPTY_24: '00:00',
                        __EMPTY_25: '00:00',
                        __EMPTY_26: '00:00',
                        __EMPTY_27: '00:00',
                        __EMPTY_28: '00:00',
                        __EMPTY_29: '00:00',
                        __EMPTY_30: '00:00',
                        __EMPTY_31: '00:00',
                        __EMPTY_32: '00:00',
                        __EMPTY_33: '00:00',
                        __EMPTY_34: '00:00',
                        __EMPTY_35: '23:40',
                        __EMPTY_36: '-457:20',
                        __EMPTY_37: '01:00',
                        __EMPTY_38: '00:00',
                        __EMPTY_39: '00:00',
                        __EMPTY_40: ' 00:00',
                        __EMPTY_41: '00:00'
                    },
                    {
                        'УРВ Отчет': 'staff',
                        __EMPTY: 'name',
                        __EMPTY_1: '8',
                        __EMPTY_2: '8',
                        __EMPTY_3: 'position8',
                        __EMPTY_4: 'division8',
                        __EMPTY_5: '09:00',
                        __EMPTY_6: '00:00',
                        __EMPTY_7: '00:00',
                        __EMPTY_8: '00:00',
                        __EMPTY_9: '00:00',
                        __EMPTY_10: '00:00',
                        __EMPTY_11: '00:00',
                        __EMPTY_12: '00:00',
                        __EMPTY_13: '00:00',
                        __EMPTY_14: '00:00',
                        __EMPTY_15: '00:00',
                        __EMPTY_16: '00:00',
                        __EMPTY_17: '00:00',
                        __EMPTY_18: '00:00',
                        __EMPTY_19: '00:00',
                        __EMPTY_20: '00:00',
                        __EMPTY_21: '00:00',
                        __EMPTY_22: '00:00',
                        __EMPTY_23: '00:00',
                        __EMPTY_24: '00:00',
                        __EMPTY_25: '00:00',
                        __EMPTY_26: '00:00',
                        __EMPTY_27: '00:00',
                        __EMPTY_28: '00:00',
                        __EMPTY_29: '00:00',
                        __EMPTY_30: '00:00',
                        __EMPTY_31: '00:00',
                        __EMPTY_32: '00:00',
                        __EMPTY_33: '00:00',
                        __EMPTY_34: '00:00',
                        __EMPTY_35: '09:00',
                        __EMPTY_36: '00:00',
                        __EMPTY_37: '01:00',
                        __EMPTY_38: '00:00',
                        __EMPTY_39: '00:00',
                        __EMPTY_40: ' 00:00',
                        __EMPTY_41: '00:00'
                    }
                ]
            }

            bef();
            aft();

            describe('Выбор даты проверки 2023-06-01 - 2023-06-30', () => {
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

    const exportReportsCSV = () => describe('УРВ. Отчёт УРВ.  Проверка экспорта CSV.',
        () => {

            const params = {
                nameFile: 'timeattendancereport.csv',
                json: [
                    {
                        'Фамилия': 'staff',
                        'Имя': 'name',
                        'Отчество': 1,
                        'Табельный номер': 1,
                        'Должность': 'position1',
                        'Подразделение': 'division1',
                        'четверг, 01-06-2023': '08:00',
                        'пятница, 02-06-2023': '08:00',
                        'суббота, 03-06-2023': '08:00',
                        'воскресенье, 04-06-2023': '08:00',
                        'понедельник, 05-06-2023': '08:00',
                        'вторник, 06-06-2023': '07:58',
                        'среда, 07-06-2023': '08:00',
                        'четверг, 08-06-2023': '07:58',
                        'пятница, 09-06-2023': '08:00',
                        'суббота, 10-06-2023': '08:00',
                        'воскресенье, 11-06-2023': '00:00',
                        'понедельник, 12-06-2023': '00:00',
                        'вторник, 13-06-2023': '00:00',
                        'среда, 14-06-2023': '00:00',
                        'четверг, 15-06-2023': '00:00',
                        'пятница, 16-06-2023': '00:00',
                        'суббота, 17-06-2023': '00:00',
                        'воскресенье, 18-06-2023': '00:00',
                        'понедельник, 19-06-2023': '00:00',
                        'вторник, 20-06-2023': '00:00',
                        'среда, 21-06-2023': '00:00',
                        'четверг, 22-06-2023': '00:00',
                        'пятница, 23-06-2023': '00:00',
                        'суббота, 24-06-2023': '00:00',
                        'воскресенье, 25-06-2023': '00:00',
                        'понедельник, 26-06-2023': '00:00',
                        'вторник, 27-06-2023': '00:00',
                        'среда, 28-06-2023': '00:00',
                        'четверг, 29-06-2023': '00:00',
                        'пятница, 30-06-2023': '00:00',
                        'Рабочее время': '79:56',
                        'Баланс отработанного времени': '-140:02',
                        'Работа в ночное время': '10:00',
                        'Время по оправдательным документам': '00:02',
                        'Время по документам добавляемым к рабочему времени': '00:02',
                        'Сверхурочные': '00:02',
                        'Работа в праздничные и выходные дни': '00:00'
                    },
                    {
                        'Фамилия': 'staff',
                        'Имя': 'name',
                        'Отчество': 2,
                        'Табельный номер': 2,
                        'Должность': 'position2',
                        'Подразделение': 'division2',
                        'четверг, 01-06-2023': '00:00',
                        'пятница, 02-06-2023': '32:40',
                        'суббота, 03-06-2023': '00:00',
                        'воскресенье, 04-06-2023': '32:40',
                        'понедельник, 05-06-2023': '00:00',
                        'вторник, 06-06-2023': '32:40',
                        'среда, 07-06-2023': '00:00',
                        'четверг, 08-06-2023': '32:40',
                        'пятница, 09-06-2023': '00:00',
                        'суббота, 10-06-2023': '32:38',
                        'воскресенье, 11-06-2023': '00:00',
                        'понедельник, 12-06-2023': '32:40',
                        'вторник, 13-06-2023': '00:00',
                        'среда, 14-06-2023': '32:40',
                        'четверг, 15-06-2023': '00:00',
                        'пятница, 16-06-2023': '32:40',
                        'суббота, 17-06-2023': '00:00',
                        'воскресенье, 18-06-2023': '32:40',
                        'понедельник, 19-06-2023': '00:00',
                        'вторник, 20-06-2023': '00:00',
                        'среда, 21-06-2023': '00:00',
                        'четверг, 22-06-2023': '00:00',
                        'пятница, 23-06-2023': '00:00',
                        'суббота, 24-06-2023': '00:00',
                        'воскресенье, 25-06-2023': '00:00',
                        'понедельник, 26-06-2023': '00:00',
                        'вторник, 27-06-2023': '00:00',
                        'среда, 28-06-2023': '00:00',
                        'четверг, 29-06-2023': '00:00',
                        'пятница, 30-06-2023': '00:00',
                        'Рабочее время': '293:58',
                        'Баланс отработанного времени': '-196:02',
                        'Работа в ночное время': '18:00',
                        'Время по оправдательным документам': '00:02',
                        'Время по документам добавляемым к рабочему времени': '00:02',
                        'Сверхурочные': '00:02',
                        'Работа в праздничные и выходные дни': '00:00'
                    },
                    {
                        'Фамилия': 'staff',
                        'Имя': 'name',
                        'Отчество': 3,
                        'Табельный номер': 3,
                        'Должность': 'position3',
                        'Подразделение': 'division3',
                        'четверг, 01-06-2023': '23:59',
                        'пятница, 02-06-2023': '00:00',
                        'суббота, 03-06-2023': '00:00',
                        'воскресенье, 04-06-2023': '00:00',
                        'понедельник, 05-06-2023': '00:00',
                        'вторник, 06-06-2023': '00:00',
                        'среда, 07-06-2023': '00:00',
                        'четверг, 08-06-2023': '00:00',
                        'пятница, 09-06-2023': '00:00',
                        'суббота, 10-06-2023': '00:00',
                        'воскресенье, 11-06-2023': '00:00',
                        'понедельник, 12-06-2023': '00:00',
                        'вторник, 13-06-2023': '00:00',
                        'среда, 14-06-2023': '00:00',
                        'четверг, 15-06-2023': '00:00',
                        'пятница, 16-06-2023': '00:00',
                        'суббота, 17-06-2023': '00:00',
                        'воскресенье, 18-06-2023': '00:00',
                        'понедельник, 19-06-2023': '00:00',
                        'вторник, 20-06-2023': '00:00',
                        'среда, 21-06-2023': '00:00',
                        'четверг, 22-06-2023': '00:00',
                        'пятница, 23-06-2023': '00:00',
                        'суббота, 24-06-2023': '00:00',
                        'воскресенье, 25-06-2023': '00:00',
                        'понедельник, 26-06-2023': '00:00',
                        'вторник, 27-06-2023': '00:00',
                        'среда, 28-06-2023': '00:00',
                        'четверг, 29-06-2023': '00:00',
                        'пятница, 30-06-2023': '00:00',
                        'Рабочее время': '23:59',
                        'Баланс отработанного времени': '00:00',
                        'Работа в ночное время': '01:00',
                        'Время по оправдательным документам': '00:00',
                        'Время по документам добавляемым к рабочему времени': '00:00',
                        'Сверхурочные': ' 00:00',
                        'Работа в праздничные и выходные дни': '00:00'
                    },
                    {
                        'Фамилия': 'staff',
                        'Имя': 'name',
                        'Отчество': 4,
                        'Табельный номер': 4,
                        'Должность': 'position4',
                        'Подразделение': 'division4',
                        'четверг, 01-06-2023': '08:00',
                        'пятница, 02-06-2023': '08:00',
                        'суббота, 03-06-2023': '08:00',
                        'воскресенье, 04-06-2023': '07:58(08:00)',
                        'понедельник, 05-06-2023': '08:00',
                        'вторник, 06-06-2023': '07:58(08:00)',
                        'среда, 07-06-2023': '08:00',
                        'четверг, 08-06-2023': '07:58(08:00)',
                        'пятница, 09-06-2023': '07:58(08:00)',
                        'суббота, 10-06-2023': '08:00',
                        'воскресенье, 11-06-2023': '08:00',
                        'понедельник, 12-06-2023': '00:00',
                        'вторник, 13-06-2023': '00:00',
                        'среда, 14-06-2023': '00:00',
                        'четверг, 15-06-2023': '00:00',
                        'пятница, 16-06-2023': '00:00',
                        'суббота, 17-06-2023': '00:00',
                        'воскресенье, 18-06-2023': '00:00',
                        'понедельник, 19-06-2023': '00:00',
                        'вторник, 20-06-2023': '00:00',
                        'среда, 21-06-2023': '00:00',
                        'четверг, 22-06-2023': '00:00',
                        'пятница, 23-06-2023': '00:00',
                        'суббота, 24-06-2023': '00:00',
                        'воскресенье, 25-06-2023': '00:00',
                        'понедельник, 26-06-2023': '00:00',
                        'вторник, 27-06-2023': '00:00',
                        'среда, 28-06-2023': '00:00',
                        'четверг, 29-06-2023': '00:00',
                        'пятница, 30-06-2023': '00:00',
                        'Рабочее время': '87:52',
                        'Баланс отработанного времени': '-00:08',
                        'Работа в ночное время': '11:00',
                        'Время по оправдательным документам': '00:00',
                        'Время по документам добавляемым к рабочему времени': '00:00',
                        'Сверхурочные': '00:02',
                        'Работа в праздничные и выходные дни': '00:00'
                    },
                    {
                        'Фамилия': 'staff',
                        'Имя': 'name',
                        'Отчество': 5,
                        'Табельный номер': 5,
                        'Должность': 'position5',
                        'Подразделение': 'division5',
                        'четверг, 01-06-2023': '08:00',
                        'пятница, 02-06-2023': '08:00',
                        'суббота, 03-06-2023': '07:59(08:00)',
                        'воскресенье, 04-06-2023': '07:58(08:00)',
                        'понедельник, 05-06-2023': '07:59(08:00)',
                        'вторник, 06-06-2023': '07:58(08:00)',
                        'среда, 07-06-2023': '07:59(08:00)',
                        'четверг, 08-06-2023': '07:59(08:00)',
                        'пятница, 09-06-2023': '00:00',
                        'суббота, 10-06-2023': '00:00',
                        'воскресенье, 11-06-2023': '00:00',
                        'понедельник, 12-06-2023': '00:00',
                        'вторник, 13-06-2023': '00:00',
                        'среда, 14-06-2023': '00:00',
                        'четверг, 15-06-2023': '00:00',
                        'пятница, 16-06-2023': '00:00',
                        'суббота, 17-06-2023': '00:00',
                        'воскресенье, 18-06-2023': '00:00',
                        'понедельник, 19-06-2023': '00:00',
                        'вторник, 20-06-2023': '00:00',
                        'среда, 21-06-2023': '00:00',
                        'четверг, 22-06-2023': '00:00',
                        'пятница, 23-06-2023': '00:00',
                        'суббота, 24-06-2023': '00:00',
                        'воскресенье, 25-06-2023': '00:00',
                        'понедельник, 26-06-2023': '00:00',
                        'вторник, 27-06-2023': '00:00',
                        'среда, 28-06-2023': '00:00',
                        'четверг, 29-06-2023': '00:00',
                        'пятница, 30-06-2023': '00:00',
                        'Рабочее время': '63:52',
                        'Баланс отработанного времени': '-00:07',
                        'Работа в ночное время': '08:00',
                        'Время по оправдательным документам': '00:00',
                        'Время по документам добавляемым к рабочему времени': '00:00',
                        'Сверхурочные': '00:02',
                        'Работа в праздничные и выходные дни': '00:00'
                    },
                    {
                        'Фамилия': 'staff',
                        'Имя': 'name',
                        'Отчество': 6,
                        'Табельный номер': 6,
                        'Должность': 'position6',
                        'Подразделение': 'division6',
                        'четверг, 01-06-2023': '08:00',
                        'пятница, 02-06-2023': '00:00',
                        'суббота, 03-06-2023': '00:00',
                        'воскресенье, 04-06-2023': '00:00',
                        'понедельник, 05-06-2023': '00:00',
                        'вторник, 06-06-2023': '00:00',
                        'среда, 07-06-2023': '00:00',
                        'четверг, 08-06-2023': '00:00',
                        'пятница, 09-06-2023': '00:00',
                        'суббота, 10-06-2023': '00:00',
                        'воскресенье, 11-06-2023': '00:00',
                        'понедельник, 12-06-2023': '00:00',
                        'вторник, 13-06-2023': '00:00',
                        'среда, 14-06-2023': '00:00',
                        'четверг, 15-06-2023': '00:00',
                        'пятница, 16-06-2023': '00:00',
                        'суббота, 17-06-2023': '00:00',
                        'воскресенье, 18-06-2023': '00:00',
                        'понедельник, 19-06-2023': '00:00',
                        'вторник, 20-06-2023': '00:00',
                        'среда, 21-06-2023': '00:00',
                        'четверг, 22-06-2023': '00:00',
                        'пятница, 23-06-2023': '00:00',
                        'суббота, 24-06-2023': '00:00',
                        'воскресенье, 25-06-2023': '00:00',
                        'понедельник, 26-06-2023': '00:00',
                        'вторник, 27-06-2023': '00:00',
                        'среда, 28-06-2023': '00:00',
                        'четверг, 29-06-2023': '00:00',
                        'пятница, 30-06-2023': '00:00',
                        'Рабочее время': '08:00',
                        'Баланс отработанного времени': '-232:00',
                        'Работа в ночное время': '01:00',
                        'Время по оправдательным документам': '00:00',
                        'Время по документам добавляемым к рабочему времени': '00:00',
                        'Сверхурочные': ' 00:00',
                        'Работа в праздничные и выходные дни': '00:00'
                    },
                    {
                        'Фамилия': 'staff',
                        'Имя': 'name',
                        'Отчество': 7,
                        'Табельный номер': 7,
                        'Должность': 'position7',
                        'Подразделение': 'division7',
                        'четверг, 01-06-2023': '00:00',
                        'пятница, 02-06-2023': '23:40',
                        'суббота, 03-06-2023': '00:00',
                        'воскресенье, 04-06-2023': '00:00',
                        'понедельник, 05-06-2023': '00:00',
                        'вторник, 06-06-2023': '00:00',
                        'среда, 07-06-2023': '00:00',
                        'четверг, 08-06-2023': '00:00',
                        'пятница, 09-06-2023': '00:00',
                        'суббота, 10-06-2023': '00:00',
                        'воскресенье, 11-06-2023': '00:00',
                        'понедельник, 12-06-2023': '00:00',
                        'вторник, 13-06-2023': '00:00',
                        'среда, 14-06-2023': '00:00',
                        'четверг, 15-06-2023': '00:00',
                        'пятница, 16-06-2023': '00:00',
                        'суббота, 17-06-2023': '00:00',
                        'воскресенье, 18-06-2023': '00:00',
                        'понедельник, 19-06-2023': '00:00',
                        'вторник, 20-06-2023': '00:00',
                        'среда, 21-06-2023': '00:00',
                        'четверг, 22-06-2023': '00:00',
                        'пятница, 23-06-2023': '00:00',
                        'суббота, 24-06-2023': '00:00',
                        'воскресенье, 25-06-2023': '00:00',
                        'понедельник, 26-06-2023': '00:00',
                        'вторник, 27-06-2023': '00:00',
                        'среда, 28-06-2023': '00:00',
                        'четверг, 29-06-2023': '00:00',
                        'пятница, 30-06-2023': '00:00',
                        'Рабочее время': '23:40',
                        'Баланс отработанного времени': '-457:20',
                        'Работа в ночное время': '01:00',
                        'Время по оправдательным документам': '00:00',
                        'Время по документам добавляемым к рабочему времени': '00:00',
                        'Сверхурочные': ' 00:00',
                        'Работа в праздничные и выходные дни': '00:00'
                    },
                    {
                        'Фамилия': 'staff',
                        'Имя': 'name',
                        'Отчество': 8,
                        'Табельный номер': 8,
                        'Должность': 'position8',
                        'Подразделение': 'division8',
                        'четверг, 01-06-2023': '09:00',
                        'пятница, 02-06-2023': '00:00',
                        'суббота, 03-06-2023': '00:00',
                        'воскресенье, 04-06-2023': '00:00',
                        'понедельник, 05-06-2023': '00:00',
                        'вторник, 06-06-2023': '00:00',
                        'среда, 07-06-2023': '00:00',
                        'четверг, 08-06-2023': '00:00',
                        'пятница, 09-06-2023': '00:00',
                        'суббота, 10-06-2023': '00:00',
                        'воскресенье, 11-06-2023': '00:00',
                        'понедельник, 12-06-2023': '00:00',
                        'вторник, 13-06-2023': '00:00',
                        'среда, 14-06-2023': '00:00',
                        'четверг, 15-06-2023': '00:00',
                        'пятница, 16-06-2023': '00:00',
                        'суббота, 17-06-2023': '00:00',
                        'воскресенье, 18-06-2023': '00:00',
                        'понедельник, 19-06-2023': '00:00',
                        'вторник, 20-06-2023': '00:00',
                        'среда, 21-06-2023': '00:00',
                        'четверг, 22-06-2023': '00:00',
                        'пятница, 23-06-2023': '00:00',
                        'суббота, 24-06-2023': '00:00',
                        'воскресенье, 25-06-2023': '00:00',
                        'понедельник, 26-06-2023': '00:00',
                        'вторник, 27-06-2023': '00:00',
                        'среда, 28-06-2023': '00:00',
                        'четверг, 29-06-2023': '00:00',
                        'пятница, 30-06-2023': '00:00',
                        'Рабочее время': '09:00',
                        'Баланс отработанного времени': '00:00',
                        'Работа в ночное время': '01:00',
                        'Время по оправдательным документам': '00:00',
                        'Время по документам добавляемым к рабочему времени': '00:00',
                        'Сверхурочные': ' 00:00',
                        'Работа в праздничные и выходные дни': '00:00'
                    }
                ]
            }

            bef();
            aft();

            describe('Выбор даты проверки 2023-06-01 - 2023-06-30', () => {
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

    const checkCalculationNoNullReports = () => describe('УРВ. Отчёт УРВ.' +
        ' Проверка настройки "Скрыть нулевые значения".', () => {

        bef();
        aft();

        describe('Выбор даты проверки 2023-06-01 - 2023-06-30', () => {
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

        describe('Включение настройки "Скрыть нулевые значения"', () => {
            decorate.el.checkbox.handler({
                name: 'Скрыть нулевые значения',
                timeout: entry.max
            });
            decorate.el.checkbox.checked({
                name: 'Скрыть нулевые значения',
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
        });

        describe('Проверка расчетов в таблице c включенной настройкой "Скрыть нулевые значения"', () => {
            const arrayTitle = [
                'Сотрудники',
                'Табельный номер',
                'Должность',
                'Подразделение',
                'Четверг, 2023-06-01',
                'Пятницы, 2023-06-02',
                'Суббота, 2023-06-03',
                'Воскресенье, 2023-06-04',
                'Понедельник, 2023-06-05',
                'Вторник, 2023-06-06',
                'Среда, 2023-06-07',
                'Четверг, 2023-06-08',
                'Пятницы, 2023-06-09',
                'Суббота, 2023-06-10',
                'Воскресенье, 2023-06-11',
                'Понедельник, 2023-06-12',
                'Вторник, 2023-06-13',
                'Среда, 2023-06-14',
                'Четверг, 2023-06-15',
                'Пятницы, 2023-06-16',
                'Суббота, 2023-06-17',
                'Воскресенье, 2023-06-18',
                'Понедельник, 2023-06-19',
                'Вторник, 2023-06-20',
                'Среда, 2023-06-21',
                'Четверг, 2023-06-22',
                'Пятницы, 2023-06-23',
                'Суббота, 2023-06-24',
                'Воскресенье, 2023-06-25',
                'Понедельник, 2023-06-26',
                'Вторник, 2023-06-27',
                'Среда, 2023-06-28',
                'Четверг, 2023-06-29',
                'Пятницы, 2023-06-30',
                'Рабочее время',
                'Задолженность - Текущая',
                'Задолженность - За предыдущий период',
                'Баланс отработанного времени',
                '1-15 - без учета задолженности',
                '1-15 - с учетом задолженности',
                '16-31 - без учета задолженности',
                '16-31 - с учетом задолженности',
                '1-31 - без учета задолженности',
                '1-31 - с учетом задолженности',
                'Работа в ночное время',
                'Время по оправдательным документам',
                'Время по документам добавленным к рабочему времени',
                'Сверхурочные',
                'Работа в праздничные и выходные дни'
            ];
            const arrayStr = [
                [
                    'staff name 1', '1', 'position1', 'division1', '08:00',
                    '08:00', '08:00', '08:00', '08:00', '07:58',
                    '08:00', '07:58', '08:00', '08:00', '00:00',
                    '00:00', '00:00', '00:00', '00:00', '00:00',
                    '00:00', '00:00', '00:00', '00:00', '00:00',
                    '00:00', '00:00', '00:00', '00:00', '00:00',
                    '00:00', '00:00', '00:00', '00:00', '79:56',
                    '00:00', '00:00', '-140:02', '79:56', '79:56',
                    '00:00', '00:00', '79:56', '79:56', '10:00',
                    '00:02', '00:02', '00:02', '00:00'
                ],
                [
                    'staff name 2', '2', 'position2', 'division2', '00:00',
                    '32:40', '00:00', '32:40', '00:00', '32:40',
                    '00:00', '32:40', '00:00', '32:38', '00:00',
                    '32:40', '00:00', '32:40', '00:00', '32:40',
                    '00:00', '32:40', '00:00', '00:00', '00:00',
                    '00:00', '00:00', '00:00', '00:00', '00:00',
                    '00:00', '00:00', '00:00', '00:00', '293:58',
                    '00:00', '00:00', '-196:02', '228:38', '228:38',
                    '65:20', '65:20', '293:58', '293:58', '18:00',
                    '00:02', '00:02', '00:02', '00:00'
                ],
                [
                    'staff name 3', '3', 'position3', 'division3', '23:59',
                    '00:00', '00:00', '00:00', '00:00', '00:00',
                    '00:00', '00:00', '00:00', '00:00', '00:00',
                    '00:00', '00:00', '00:00', '00:00', '00:00',
                    '00:00', '00:00', '00:00', '00:00', '00:00',
                    '00:00', '00:00', '00:00', '00:00', '00:00',
                    '00:00', '00:00', '00:00', '00:00',  '23:59',
                    '00:00', '00:00', '00:00', '23:59', '23:59',
                    '00:00', '00:00', '23:59', '23:59', '01:00',
                    '00:00', '00:00', '00:00', '00:00'
                ],
                [
                    'staff name 4', '4', 'position4', 'division4', '08:00',
                    '08:00', '08:00', '07:58(08:00)', '08:00', '07:58(08:00)',
                    '08:00', '07:58(08:00)', '07:58(08:00)', '08:00', '08:00',
                    '00:00', '00:00', '00:00', '00:00', '00:00',
                    '00:00', '00:00', '00:00', '00:00', '00:00',
                    '00:00', '00:00', '00:00', '00:00', '00:00',
                    '00:00', '00:00', '00:00', '00:00', '87:52',
                    '00:08', '00:00', '-00:08', '87:52', '88:00',
                    '00:00', '00:00', '87:52', '88:00', '11:00',
                    '00:00', '00:00', '00:02', '00:00'
                ],
                [
                    'staff name 5', '5', 'position5', 'division5', '08:00',
                    '08:00', '07:59(08:00)', '07:58(08:00)', '07:59(08:00)', '07:58(08:00)',
                    '07:59(08:00)', '07:59(08:00)', '00:00', '00:00', '00:00',
                    '00:00', '00:00', '00:00', '00:00', '00:00',
                    '00:00', '00:00', '00:00', '00:00', '00:00',
                    '00:00', '00:00', '00:00', '00:00', '00:00',
                    '00:00', '00:00', '00:00', '00:00', '63:52',
                    '00:08', '00:00', '-00:07', '63:52', '64:00',
                    '00:00', '00:00', '63:52', '64:00', '08:00',
                    '00:00', '00:00', '00:02', '00:00'
                ],
                [
                    'staff name 6', '6', 'position6', 'division6', '08:00',
                    '00:00', '00:00', '00:00', '00:00', '00:00',
                    '00:00', '00:00', '00:00', '00:00', '00:00',
                    '00:00', '00:00', '00:00', '00:00', '00:00',
                    '00:00', '00:00', '00:00', '00:00', '00:00',
                    '00:00', '00:00', '00:00', '00:00', '00:00',
                    '00:00', '00:00', '00:00', '00:00',  '08:00',
                    '00:00', '00:00', '-232:00', '08:00', '08:00',
                    '00:00', '00:00', '08:00', '08:00', '01:00',
                    '00:00', '00:00', '00:00', '00:00'
                ],
                [
                    'staff name 7', '7', 'position7', 'division7', '00:00',
                    '23:40', '00:00', '00:00', '00:00', '00:00',
                    '00:00', '00:00', '00:00', '00:00', '00:00',
                    '00:00', '00:00', '00:00', '00:00', '00:00',
                    '00:00', '00:00', '00:00', '00:00', '00:00',
                    '00:00', '00:00', '00:00', '00:00', '00:00',
                    '00:00', '00:00', '00:00', '00:00',  '23:40',
                    '00:00', '00:00', '-457:20', '23:40', '23:40',
                    '00:00', '00:00', '23:40', '23:40', '01:00',
                    '00:00', '00:00', '00:00', '00:00'
                ],
                [
                    'staff name 8', '8', 'position8', 'division8', '09:00',
                    '00:00', '00:00', '00:00', '00:00', '00:00',
                    '00:00', '00:00', '00:00', '00:00', '00:00',
                    '00:00', '00:00', '00:00', '00:00', '00:00',
                    '00:00', '00:00', '00:00', '00:00', '00:00',
                    '00:00', '00:00', '00:00', '00:00', '00:00',
                    '00:00', '00:00', '00:00', '00:00',  '09:00',
                    '00:00', '00:00', '00:00', '09:00', '09:00',
                    '00:00', '00:00', '09:00', '09:00', '01:00',
                    '00:00', '00:00', '00:00', '00:00'
                ]
            ];

            arrayStr.forEach((item1, index1) => {
                describe(`Проверка строки ${index1 + 1}`, () => {
                    item1.forEach((item2, index2) => {
                        if(item2 === '00:00') {
                            item2 = ''
                        }
                        it(`В таблице в строке ${index1 + 1} в столбце ${index2 + 1} - "${arrayTitle[index2]}" отображается "${item2}".`,
                            async () => await dec.simpleText(el.table.cellGetTextNoHead,
                                [index1 + 1, index2 + 1, entry.max],
                                item2,
                                el.table)
                        );
                    });
                });

            });

        });

        describe('Отключение настройки "Скрыть нулевые значения"', () => {
            decorate.el.checkbox.handler({
                name: 'Скрыть нулевые значения',
                timeout: entry.max
            });
            decorate.el.checkbox.unchecked({
                name: 'Скрыть нулевые значения',
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
        });

        describe('Проверка расчетов в таблице c выключенной настройкой "Скрыть нулевые значения"', () => {
            const arrayTitle = [
                'Сотрудники',
                'Табельный номер',
                'Должность',
                'Подразделение',
                'Четверг, 2023-06-01',
                'Пятницы, 2023-06-02',
                'Суббота, 2023-06-03',
                'Воскресенье, 2023-06-04',
                'Понедельник, 2023-06-05',
                'Вторник, 2023-06-06',
                'Среда, 2023-06-07',
                'Четверг, 2023-06-08',
                'Пятницы, 2023-06-09',
                'Суббота, 2023-06-10',
                'Воскресенье, 2023-06-11',
                'Понедельник, 2023-06-12',
                'Вторник, 2023-06-13',
                'Среда, 2023-06-14',
                'Четверг, 2023-06-15',
                'Пятницы, 2023-06-16',
                'Суббота, 2023-06-17',
                'Воскресенье, 2023-06-18',
                'Понедельник, 2023-06-19',
                'Вторник, 2023-06-20',
                'Среда, 2023-06-21',
                'Четверг, 2023-06-22',
                'Пятницы, 2023-06-23',
                'Суббота, 2023-06-24',
                'Воскресенье, 2023-06-25',
                'Понедельник, 2023-06-26',
                'Вторник, 2023-06-27',
                'Среда, 2023-06-28',
                'Четверг, 2023-06-29',
                'Пятницы, 2023-06-30',
                'Рабочее время',
                'Задолженность - Текущая',
                'Задолженность - За предыдущий период',
                'Баланс отработанного времени',
                '1-15 - без учета задолженности',
                '1-15 - с учетом задолженности',
                '16-31 - без учета задолженности',
                '16-31 - с учетом задолженности',
                '1-31 - без учета задолженности',
                '1-31 - с учетом задолженности',
                'Работа в ночное время',
                'Время по оправдательным документам',
                'Время по документам добавленным к рабочему времени',
                'Сверхурочные',
                'Работа в праздничные и выходные дни'
            ];
            const arrayStr = [
                [
                    'staff name 1', '1', 'position1', 'division1', '08:00',
                    '08:00', '08:00', '08:00', '08:00', '07:58',
                    '08:00', '07:58', '08:00', '08:00', '00:00',
                    '00:00', '00:00', '00:00', '00:00', '00:00',
                    '00:00', '00:00', '00:00', '00:00', '00:00',
                    '00:00', '00:00', '00:00', '00:00', '00:00',
                    '00:00', '00:00', '00:00', '00:00', '79:56',
                    '00:00', '00:00', '-140:02', '79:56', '79:56',
                    '00:00', '00:00', '79:56', '79:56', '10:00',
                    '00:02', '00:02', '00:02', '00:00'
                ],
                [
                    'staff name 2', '2', 'position2', 'division2', '00:00',
                    '32:40', '00:00', '32:40', '00:00', '32:40',
                    '00:00', '32:40', '00:00', '32:38', '00:00',
                    '32:40', '00:00', '32:40', '00:00', '32:40',
                    '00:00', '32:40', '00:00', '00:00', '00:00',
                    '00:00', '00:00', '00:00', '00:00', '00:00',
                    '00:00', '00:00', '00:00', '00:00', '293:58',
                    '00:00', '00:00', '-196:02', '228:38', '228:38',
                    '65:20', '65:20', '293:58', '293:58', '18:00',
                    '00:02', '00:02', '00:02', '00:00'
                ],
                [
                    'staff name 3', '3', 'position3', 'division3', '23:59',
                    '00:00', '00:00', '00:00', '00:00', '00:00',
                    '00:00', '00:00', '00:00', '00:00', '00:00',
                    '00:00', '00:00', '00:00', '00:00', '00:00',
                    '00:00', '00:00', '00:00', '00:00', '00:00',
                    '00:00', '00:00', '00:00', '00:00', '00:00',
                    '00:00', '00:00', '00:00', '00:00',  '23:59',
                    '00:00', '00:00', '00:00', '23:59', '23:59',
                    '00:00', '00:00', '23:59', '23:59', '01:00',
                    '00:00', '00:00', '00:00', '00:00'
                ],
                [
                    'staff name 4', '4', 'position4', 'division4', '08:00',
                    '08:00', '08:00', '07:58(08:00)', '08:00', '07:58(08:00)',
                    '08:00', '07:58(08:00)', '07:58(08:00)', '08:00', '08:00',
                    '00:00', '00:00', '00:00', '00:00', '00:00',
                    '00:00', '00:00', '00:00', '00:00', '00:00',
                    '00:00', '00:00', '00:00', '00:00', '00:00',
                    '00:00', '00:00', '00:00', '00:00', '87:52',
                    '00:08', '00:00', '-00:08', '87:52', '88:00',
                    '00:00', '00:00', '87:52', '88:00', '11:00',
                    '00:00', '00:00', '00:02', '00:00'
                ],
                [
                    'staff name 5', '5', 'position5', 'division5', '08:00',
                    '08:00', '07:59(08:00)', '07:58(08:00)', '07:59(08:00)', '07:58(08:00)',
                    '07:59(08:00)', '07:59(08:00)', '00:00', '00:00', '00:00',
                    '00:00', '00:00', '00:00', '00:00', '00:00',
                    '00:00', '00:00', '00:00', '00:00', '00:00',
                    '00:00', '00:00', '00:00', '00:00', '00:00',
                    '00:00', '00:00', '00:00', '00:00', '63:52',
                    '00:08', '00:00', '-00:07', '63:52', '64:00',
                    '00:00', '00:00', '63:52', '64:00', '08:00',
                    '00:00', '00:00', '00:02', '00:00'
                ],
                [
                    'staff name 6', '6', 'position6', 'division6', '08:00',
                    '00:00', '00:00', '00:00', '00:00', '00:00',
                    '00:00', '00:00', '00:00', '00:00', '00:00',
                    '00:00', '00:00', '00:00', '00:00', '00:00',
                    '00:00', '00:00', '00:00', '00:00', '00:00',
                    '00:00', '00:00', '00:00', '00:00', '00:00',
                    '00:00', '00:00', '00:00', '00:00',  '08:00',
                    '00:00', '00:00', '-232:00', '08:00', '08:00',
                    '00:00', '00:00', '08:00', '08:00', '01:00',
                    '00:00', '00:00', '00:00', '00:00'
                ],
                [
                    'staff name 7', '7', 'position7', 'division7', '00:00',
                    '23:40', '00:00', '00:00', '00:00', '00:00',
                    '00:00', '00:00', '00:00', '00:00', '00:00',
                    '00:00', '00:00', '00:00', '00:00', '00:00',
                    '00:00', '00:00', '00:00', '00:00', '00:00',
                    '00:00', '00:00', '00:00', '00:00', '00:00',
                    '00:00', '00:00', '00:00', '00:00',  '23:40',
                    '00:00', '00:00', '-457:20', '23:40', '23:40',
                    '00:00', '00:00', '23:40', '23:40', '01:00',
                    '00:00', '00:00', '00:00', '00:00'
                ],
                [
                    'staff name 8', '8', 'position8', 'division8', '09:00',
                    '00:00', '00:00', '00:00', '00:00', '00:00',
                    '00:00', '00:00', '00:00', '00:00', '00:00',
                    '00:00', '00:00', '00:00', '00:00', '00:00',
                    '00:00', '00:00', '00:00', '00:00', '00:00',
                    '00:00', '00:00', '00:00', '00:00', '00:00',
                    '00:00', '00:00', '00:00', '00:00',  '09:00',
                    '00:00', '00:00', '00:00', '09:00', '09:00',
                    '00:00', '00:00', '09:00', '09:00', '01:00',
                    '00:00', '00:00', '00:00', '00:00'
                ]
            ];

            arrayStr.forEach((item1, index1) => {
                describe(`Проверка строки ${index1 + 1}`, () => {
                    item1.forEach((item2, index2) => {
                        it(`В таблице в строке ${index1 + 1} в столбце ${index2 + 1} - "${arrayTitle[index2]}" отображается "${item2}".`,
                            async () => await dec.simpleText(el.table.cellGetTextNoHead,
                                [index1 + 1, index2 + 1, entry.max],
                                item2,
                                el.table)
                        );
                    });
                });

            });

        });

    });

    const deleteDocumentReports = () => describe('УРВ. Отчёт УРВ. Проверка настройки ' +
        '"Расчет с удалением составных документов".', () => {

        const arrayTitle = [
            'Сотрудники',
            'Табельный номер',
            'Должность',
            'Подразделение',
            'Четверг, 2023-06-01',
            'Пятницы, 2023-06-02',
            'Суббота, 2023-06-03',
            'Воскресенье, 2023-06-04',
            'Понедельник, 2023-06-05',
            'Вторник, 2023-06-06',
            'Среда, 2023-06-07',
            'Четверг, 2023-06-08',
            'Пятницы, 2023-06-09',
            'Суббота, 2023-06-10',
            'Воскресенье, 2023-06-11',
            'Понедельник, 2023-06-12',
            'Вторник, 2023-06-13',
            'Среда, 2023-06-14',
            'Четверг, 2023-06-15',
            'Пятницы, 2023-06-16',
            'Суббота, 2023-06-17',
            'Воскресенье, 2023-06-18',
            'Понедельник, 2023-06-19',
            'Вторник, 2023-06-20',
            'Среда, 2023-06-21',
            'Четверг, 2023-06-22',
            'Пятницы, 2023-06-23',
            'Суббота, 2023-06-24',
            'Воскресенье, 2023-06-25',
            'Понедельник, 2023-06-26',
            'Вторник, 2023-06-27',
            'Среда, 2023-06-28',
            'Четверг, 2023-06-29',
            'Пятницы, 2023-06-30',
            'Рабочее время',
            'Задолженность - Текущая',
            'Задолженность - За предыдущий период',
            'Баланс отработанного времени',
            '1-15 - без учета задолженности',
            '1-15 - с учетом задолженности',
            '16-31 - без учета задолженности',
            '16-31 - с учетом задолженности',
            '1-31 - без учета задолженности',
            '1-31 - с учетом задолженности',
            'Работа в ночное время',
            'Время по оправдательным документам',
            'Время по документам добавленным к рабочему времени',
            'Сверхурочные',
            'Работа в праздничные и выходные дни'
        ];
        const arrayStr = [
            [
                'staff name 4', '4', 'position4', 'division4', '08:00',
                '08:00', '08:00', '07:58(08:00)', '08:00', '07:58(08:00)',
                '08:00', '07:58(08:00)', '07:58(08:00)', '08:00', '08:00',
                '00:00', '00:00', '00:00', '00:00', '00:00',
                '00:00', '00:00', '00:00', '00:00', '00:00',
                '00:00', '00:00', '00:00', '00:00', '00:00',
                '00:00', '00:00', '00:00', '00:00', '87:52',
                '00:08', '00:00', '-00:08', '87:52', '88:00',
                '00:00', '00:00', '87:52', '88:00', '11:00',
                '00:00', '00:00', '00:02', '00:00'
            ],
            [
                'staff name 5', '5', 'position5', 'division5', '08:00',
                '08:00', '07:59(08:00)', '07:58(08:00)', '07:59(08:00)', '07:58(08:00)',
                '07:59(08:00)', '07:59(08:00)', '00:00', '00:00', '00:00',
                '00:00', '00:00', '00:00', '00:00', '00:00',
                '00:00', '00:00', '00:00', '00:00', '00:00',
                '00:00', '00:00', '00:00', '00:00', '00:00',
                '00:00', '00:00', '00:00', '00:00', '63:52',
                '00:08', '00:00', '-00:07', '63:52', '64:00',
                '00:00', '00:00', '63:52', '64:00', '08:00',
                '00:00', '00:00', '00:02', '00:00'
            ],
        ];

        bef();
        aft();

        describe('Выбор даты проверки 2023-06-01 - 2023-06-30', () => {
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

        describe('Выбор настройки "Расчет с удалением составных документов".', () => {
            decorate.el.butIcBefore.handler({
                icon: but.unsorted_billhead_outline,
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
            decorate.el.checkbox.handler({
                name: 'Расчёт с удалением составных документов',
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
            decorate.el.checkbox.checked({
                name: 'Расчёт с удалением составных документов',
                timeout: entry.max
            });
            decorate.el.button.handler({
                name: 'Сохранить',
                timeout: entry.max
            });
        });

        describe('Выполнить пересчет', () => {
            decorate.el.butIcBefore.handler({
                icon: but.action_update,
                timeout: entry.max
            });
            decorate.el.success.success({
                text: '"Расчет УРВ запущен"',
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.urv
            });
        });

        describe('Включение / отключение настройки "Скрыть нулевые значения"', () => {
            decorate.el.checkbox.handler({
                name: 'Скрыть нулевые значения',
                timeout: entry.max
            });
            decorate.el.checkbox.checked({
                name: 'Скрыть нулевые значения',
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
            decorate.el.checkbox.handler({
                name: 'Скрыть нулевые значения',
                timeout: entry.max
            });
            decorate.el.checkbox.unchecked({
                name: 'Скрыть нулевые значения',
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
        });

        describe('Проверка расчетов в таблице', () => {
            arrayStr.forEach((item1, index1) => {
                describe(`Проверка строки ${index1 + 4}`, () => {
                    item1.forEach((item2, index2) => {
                        it(`В таблице в строке ${index1 + 4} в столбце ${index2 + 1} - "${arrayTitle[index2]}" отображается "${item2}".`,
                            async () => await dec.simpleText(el.table.cellGetTextNoHead,
                                [index1 + 4, index2 + 1, entry.max],
                                item2,
                                el.table)
                        );
                    });
                });

            });
        });

        describe('Отключение настройки "Расчет с удалением составных документов".', () => {
            decorate.el.butIcBefore.handler({
                icon: but.unsorted_billhead_outline,
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
            decorate.el.checkbox.handler({
                name: 'Расчёт с удалением составных документов',
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
            decorate.el.checkbox.unchecked({
                name: 'Расчёт с удалением составных документов',
                timeout: entry.max
            });
            decorate.el.button.handler({
                name: 'Сохранить',
                timeout: entry.max
            });
        });

    });

    const documentCalculateReports = () => describe('УРВ. Отчёт УРВ. Проверка настройки "Задолженности" - ' +
        'списание задолженностей документами.', () => {

        const arrayTitle = [
            'Сотрудники',
            'Табельный номер',
            'Должность',
            'Подразделение',
            'Четверг, 2023-06-01',
            'Пятницы, 2023-06-02',
            'Суббота, 2023-06-03',
            'Воскресенье, 2023-06-04',
            'Понедельник, 2023-06-05',
            'Вторник, 2023-06-06',
            'Среда, 2023-06-07',
            'Четверг, 2023-06-08',
            'Пятницы, 2023-06-09',
            'Суббота, 2023-06-10',
            'Воскресенье, 2023-06-11',
            'Понедельник, 2023-06-12',
            'Вторник, 2023-06-13',
            'Среда, 2023-06-14',
            'Четверг, 2023-06-15',
            'Пятницы, 2023-06-16',
            'Суббота, 2023-06-17',
            'Воскресенье, 2023-06-18',
            'Понедельник, 2023-06-19',
            'Вторник, 2023-06-20',
            'Среда, 2023-06-21',
            'Четверг, 2023-06-22',
            'Пятницы, 2023-06-23',
            'Суббота, 2023-06-24',
            'Воскресенье, 2023-06-25',
            'Понедельник, 2023-06-26',
            'Вторник, 2023-06-27',
            'Среда, 2023-06-28',
            'Четверг, 2023-06-29',
            'Пятницы, 2023-06-30',
            'Рабочее время',
            'Задолженность - Текущая',
            'Задолженность - За предыдущий период',
            'Баланс отработанного времени',
            '1-15 - без учета задолженности',
            '1-15 - с учетом задолженности',
            '16-31 - без учета задолженности',
            '16-31 - с учетом задолженности',
            '1-31 - без учета задолженности',
            '1-31 - с учетом задолженности',
            'Работа в ночное время',
            'Время по оправдательным документам',
            'Время по документам добавленным к рабочему времени',
            'Сверхурочные',
            'Работа в праздничные и выходные дни'
        ];
        const arrayStr = [
            [
                'staff name 4', '4', 'position4', 'division4', '08:00',
                '08:00', '08:00', '08:00', '08:00', '08:00',
                '08:00', '07:58(08:00)', '07:58(08:00)', '08:00', '08:00',
                '00:00', '00:00', '00:00', '00:00', '00:00',
                '00:00', '00:00', '00:00', '00:00', '00:00',
                '00:00', '00:00', '00:00', '00:00', '00:00',
                '00:00', '00:00', '00:00', '00:00', '87:56',
                '00:04', '00:00', '-00:04', '87:56', '88:00',
                '00:00', '00:00', '87:56', '88:00', '11:00',
                '00:04', '00:00', '00:02', '00:00'
            ],
            [
                'staff name 5', '5', 'position5', 'division5', '08:00',
                '08:00', '08:00', '08:00', '07:59(08:00)', '07:58(08:00)',
                '07:59(08:00)', '07:59(08:00)', '00:00', '00:00', '00:00',
                '00:00', '00:00', '00:00', '00:00', '00:00',
                '00:00', '00:00', '00:00', '00:00', '00:00',
                '00:00', '00:00', '00:00', '00:00', '00:00',
                '00:00', '00:00', '00:00', '00:00', '63:55',
                '00:05', '00:00', '-00:04', '63:55', '64:00',
                '00:00', '00:00', '63:55', '64:00', '08:00',
                '00:03', '00:00', '00:02', '00:00'
            ],
        ];

        bef();
        aft();

        describe('Выбор даты проверки 2023-06-01 - 2023-06-30', () => {
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
                timeout: entry.urv
            });
        });

        describe('Погашение задолженности сотруднку 4', () => {
            decorate.el.table.strHandler({
                strNumber: 4,
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
            decorate.el.butIcBefore.handler({
                icon: but.menu_timetracking,
                timeout: entry.max
            });
            decorate.modal.underTime.init({
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
            decorate.modal.underTime.checkboxHandler({
                strNumber: 1,
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
            decorate.modal.underTime.checkboxHandler({
                strNumber: 2,
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
            decorate.el.selectInput.iconXpand({
                title: '',
                placeholder: 'Выберите документ',
                timeout: entry.max
            });
            decorate.el.selectXpand.xpand({
                timeout: entry.max
            });
            decorate.el.selectXpand.handler({
                value: data.documents.document4.name,
                timeout: entry.max
            });
            decorate.el.selectXpand.xpandNoElement({
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
            decorate.el.button.handler({
                name: 'Погасить задолженность',
                timeout: entry.max
            });
            decorate.el.success.success({
                text: 'Операция успешно завершена',
                timeout: entry.max
            });
            decorate.el.success.success({
                text: '"Расчет УРВ запущен"',
                timeout: entry.max
            });
            decorate.modal.underTime.initClose({
                timeout: entry.max
            });
        });

        describe('Погашение задолженности сотруднку 5', () => {
            decorate.el.table.strHandler({
                strNumber: 5,
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
            decorate.el.butIcBefore.handler({
                icon: but.menu_timetracking,
                timeout: entry.max
            });
            decorate.modal.underTime.init({
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
            decorate.modal.underTime.checkboxHandler({
                strNumber: 1,
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
            decorate.modal.underTime.checkboxHandler({
                strNumber: 2,
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
            decorate.el.selectInput.iconXpand({
                title: '',
                placeholder: 'Выберите документ',
                timeout: entry.max
            });
            decorate.el.selectXpand.xpand({
                timeout: entry.max
            });
            decorate.el.selectXpand.handler({
                value: data.documents.document4.name,
                timeout: entry.max
            });
            decorate.el.selectXpand.xpandNoElement({
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
            decorate.el.button.handler({
                name: 'Погасить задолженность',
                timeout: entry.max
            });
            decorate.el.success.success({
                text: 'Операция успешно завершена',
                timeout: entry.max
            });
            decorate.el.success.success({
                text: '"Расчет УРВ запущен"',
                timeout: entry.max
            });
            decorate.modal.underTime.initClose({
                timeout: entry.max
            });
        });

        describe('Ожидание пересчета', () => {
            decorate.page.base.loading({
                timeout: entry.urv
            });
        });

        describe('Включение / отключение настройки "Скрыть нулевые значения"', () => {
            decorate.el.checkbox.handler({
                name: 'Скрыть нулевые значения',
                timeout: entry.max
            });
            decorate.el.checkbox.checked({
                name: 'Скрыть нулевые значения',
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
            decorate.el.checkbox.handler({
                name: 'Скрыть нулевые значения',
                timeout: entry.max
            });
            decorate.el.checkbox.unchecked({
                name: 'Скрыть нулевые значения',
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
        });

        describe('Проверка расчетов в таблице', () => {
            arrayStr.forEach((item1, index1) => {
                describe(`Проверка строки ${index1 + 4}`, () => {
                    item1.forEach((item2, index2) => {
                        it(`В таблице в строке ${index1 + 4} в столбце ${index2 + 1} - "${arrayTitle[index2]}" отображается "${item2}".`,
                            async () => await dec.simpleText(el.table.cellGetTextNoHead,
                                [index1 + 4, index2 + 1, entry.max],
                                item2,
                                el.table)
                        );
                    });
                });

            });
        });
    });

    const staffDeptWorkedReports = () => describe('УРВ. Отчёт УРВ. Проверка настройки ' +
        '"Показать только сотрудников с задолженностями".', () => {

        const arrayTitle = [
            'Сотрудники',
            'Табельный номер',
            'Должность',
            'Подразделение',
            'Четверг, 2023-06-01',
            'Пятницы, 2023-06-02',
            'Суббота, 2023-06-03',
            'Воскресенье, 2023-06-04',
            'Понедельник, 2023-06-05',
            'Вторник, 2023-06-06',
            'Среда, 2023-06-07',
            'Четверг, 2023-06-08',
            'Пятницы, 2023-06-09',
            'Суббота, 2023-06-10',
            'Воскресенье, 2023-06-11',
            'Понедельник, 2023-06-12',
            'Вторник, 2023-06-13',
            'Среда, 2023-06-14',
            'Четверг, 2023-06-15',
            'Пятницы, 2023-06-16',
            'Суббота, 2023-06-17',
            'Воскресенье, 2023-06-18',
            'Понедельник, 2023-06-19',
            'Вторник, 2023-06-20',
            'Среда, 2023-06-21',
            'Четверг, 2023-06-22',
            'Пятницы, 2023-06-23',
            'Суббота, 2023-06-24',
            'Воскресенье, 2023-06-25',
            'Понедельник, 2023-06-26',
            'Вторник, 2023-06-27',
            'Среда, 2023-06-28',
            'Четверг, 2023-06-29',
            'Пятницы, 2023-06-30',
            'Рабочее время',
            'Задолженность - Текущая',
            'Задолженность - За предыдущий период',
            'Баланс отработанного времени',
            '1-15 - без учета задолженности',
            '1-15 - с учетом задолженности',
            '16-31 - без учета задолженности',
            '16-31 - с учетом задолженности',
            '1-31 - без учета задолженности',
            '1-31 - с учетом задолженности',
            'Работа в ночное время',
            'Время по оправдательным документам',
            'Время по документам добавленным к рабочему времени',
            'Сверхурочные',
            'Работа в праздничные и выходные дни'
        ];
        const arrayStr = [
            [
                'staff name 1', '1', '', '', '00:00',
                '00:00', '00:00', '00:00', '00:00', '00:00',
                '00:00', '00:00', '00:00', '00:00', '00:00',
                '00:00', '00:00', '00:00', '00:00', '00:00',
                '00:00', '00:00', '00:00', '00:00', '00:00',
                '00:00', '00:00', '00:00', '00:00', '00:00',
                '00:00', '00:00', '00:00', '00:00', '00:00',
                '00:00', '00:00', '00:00', '00:00', '00:00',
                '00:00', '00:00', '00:00', '00:00', '00:00',
                '00:00', '00:00', '00:00', '00:00',
            ],
            [
                'staff name 2', '2', '', '', '00:00',
                '00:00', '00:00', '00:00', '00:00', '00:00',
                '00:00', '00:00', '00:00', '00:00', '00:00',
                '00:00', '00:00', '00:00', '00:00', '00:00',
                '00:00', '00:00', '00:00', '00:00', '00:00',
                '00:00', '00:00', '00:00', '00:00', '00:00',
                '00:00', '00:00', '00:00', '00:00', '00:00',
                '00:00', '00:00', '00:00', '00:00', '00:00',
                '00:00', '00:00', '00:00', '00:00', '00:00',
                '00:00', '00:00', '00:00', '00:00',
            ],
            [
                'staff name 3', '3', '', '', '00:00',
                '00:00', '00:00', '00:00', '00:00', '00:00',
                '00:00', '00:00', '00:00', '00:00', '00:00',
                '00:00', '00:00', '00:00', '00:00', '00:00',
                '00:00', '00:00', '00:00', '00:00', '00:00',
                '00:00', '00:00', '00:00', '00:00', '00:00',
                '00:00', '00:00', '00:00', '00:00', '00:00',
                '00:00', '00:00', '00:00', '00:00', '00:00',
                '00:00', '00:00', '00:00', '00:00', '00:00',
                '00:00', '00:00', '00:00', '00:00',
            ],
            [
                'staff name 4', '4', 'position4', 'division4', '00:00',
                '00:00', '00:00', '07:58(08:00)', '00:00', '07:58(08:00)',
                '00:00', '07:58(08:00)', '07:58(08:00)', '00:00', '00:00',
                '00:00', '00:00', '00:00', '00:00', '00:00',
                '00:00', '00:00', '00:00', '00:00', '00:00',
                '00:00', '00:00', '00:00', '00:00', '00:00',
                '00:00', '00:00', '00:00', '00:00', '31:52',
                '00:08', '00:00', '-00:08', '31:52', '32:00',
                '00:00', '00:00', '31:52', '32:00', '04:00',
                '00:00', '00:00', '00:00', '00:00'
            ],
            [
                'staff name 5', '5', 'position5', 'division5', '00:00',
                '00:00', '07:59(08:00)', '07:58(08:00)', '07:59(08:00)', '07:58(08:00)',
                '07:59(08:00)', '07:59(08:00)', '00:00', '00:00', '00:00',
                '00:00', '00:00', '00:00', '00:00', '00:00',
                '00:00', '00:00', '00:00', '00:00', '00:00',
                '00:00', '00:00', '00:00', '00:00', '00:00',
                '00:00', '00:00', '00:00', '00:00', '47:52',
                '00:08', '00:00', '-00:08', '47:52', '48:00',
                '00:00', '00:00', '47:52', '48:00', '06:00',
                '00:00', '00:00', '00:00', '00:00'
            ],
            [
                'staff name 6', '6', '', '', '00:00',
                '00:00', '00:00', '00:00', '00:00', '00:00',
                '00:00', '00:00', '00:00', '00:00', '00:00',
                '00:00', '00:00', '00:00', '00:00', '00:00',
                '00:00', '00:00', '00:00', '00:00', '00:00',
                '00:00', '00:00', '00:00', '00:00', '00:00',
                '00:00', '00:00', '00:00', '00:00', '00:00',
                '00:00', '00:00', '00:00', '00:00', '00:00',
                '00:00', '00:00', '00:00', '00:00', '00:00',
                '00:00', '00:00', '00:00', '00:00',
            ],
            [
                'staff name 7', '7', '', '', '00:00',
                '00:00', '00:00', '00:00', '00:00', '00:00',
                '00:00', '00:00', '00:00', '00:00', '00:00',
                '00:00', '00:00', '00:00', '00:00', '00:00',
                '00:00', '00:00', '00:00', '00:00', '00:00',
                '00:00', '00:00', '00:00', '00:00', '00:00',
                '00:00', '00:00', '00:00', '00:00', '00:00',
                '00:00', '00:00', '00:00', '00:00', '00:00',
                '00:00', '00:00', '00:00', '00:00', '00:00',
                '00:00', '00:00', '00:00', '00:00',
            ],
            [
                'staff name 8', '8', '', '', '00:00',
                '00:00', '00:00', '00:00', '00:00', '00:00',
                '00:00', '00:00', '00:00', '00:00', '00:00',
                '00:00', '00:00', '00:00', '00:00', '00:00',
                '00:00', '00:00', '00:00', '00:00', '00:00',
                '00:00', '00:00', '00:00', '00:00', '00:00',
                '00:00', '00:00', '00:00', '00:00', '00:00',
                '00:00', '00:00', '00:00', '00:00', '00:00',
                '00:00', '00:00', '00:00', '00:00', '00:00',
                '00:00', '00:00', '00:00', '00:00',
            ]
        ];

        bef();
        aft();

        describe('Выбор даты проверки 2023-06-01 - 2023-06-30', () => {
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
        });

        describe('Выбор настройки "Показать только сотрудников с задолженностями".', () => {
            decorate.el.butIcBefore.handler({
                icon: but.unsorted_billhead_outline,
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
            decorate.el.checkbox.handler({
                name: 'Показать только сотрудников с задолженностями',
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
            decorate.el.checkbox.checked({
                name: 'Показать только сотрудников с задолженностями',
                timeout: entry.max
            });
            decorate.el.button.handler({
                name: 'Сохранить',
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
        });

        describe('Проверка расчетов в таблице', () => {
            arrayStr.forEach((item1, index1) => {
                describe(`Проверка строки ${index1 + 1}`, () => {
                    item1.forEach((item2, index2) => {
                        it(`В таблице в строке ${index1 + 1} в столбце ${index2 + 1} - "${arrayTitle[index2]}" отображается "${item2}".`,
                            async () => await dec.simpleText(el.table.cellGetTextNoHead,
                                [index1 + 1, index2 + 1, entry.max],
                                item2,
                                el.table)
                        );
                    });
                });

            });
        });

        describe('Отключение настройки "Показать только сотрудников с задолженностями".', () => {
            decorate.el.butIcBefore.handler({
                icon: but.unsorted_billhead_outline,
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
            decorate.el.checkbox.handler({
                name: 'Показать только сотрудников с задолженностями',
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
            decorate.el.checkbox.unchecked({
                name: 'Показать только сотрудников с задолженностями',
                timeout: entry.max
            });
            decorate.el.button.handler({
                name: 'Сохранить',
                timeout: entry.max
            });
        });
    });

    const periodCalculationReports = () => describe('УРВ. Отчёт УРВ. Проверка настройки глубины учёта.', () => {

        bef();
        aft();

        describe('Выбор даты 2022-06-01 - 2023-06-30', () => {
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
                    day: data.date2.day1,
                    month: data.date2.month1,
                    year: data.date2.year1,
                    scrollYear: 500,
                },
                objEnd: {
                    day: data.date2.day2,
                    month: data.date2.month2,
                    year: data.date2.year2,
                    scrollYear: 500,
                },
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
        });

        describe('Выполнить пересчет', () => {
            decorate.el.butIcBefore.handler({
                icon: but.action_update,
                timeout: entry.max
            });
            decorate.el.success.success({
                text: '"Расчет УРВ запущен"',
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.urv
            });
        });

        describe('Выбор даты проверки 2023-06-01 - 2023-06-30', () => {
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
        });

        describe('Проверка настройки глубина учета "Предыдущий месяц"', () => {

            const arrayTitle = [
                'Сотрудники',
                'Табельный номер',
                'Должность',
                'Подразделение',
                'Четверг, 2023-06-01',
                'Пятницы, 2023-06-02',
                'Суббота, 2023-06-03',
                'Воскресенье, 2023-06-04',
                'Понедельник, 2023-06-05',
                'Вторник, 2023-06-06',
                'Среда, 2023-06-07',
                'Четверг, 2023-06-08',
                'Пятницы, 2023-06-09',
                'Суббота, 2023-06-10',
                'Воскресенье, 2023-06-11',
                'Понедельник, 2023-06-12',
                'Вторник, 2023-06-13',
                'Среда, 2023-06-14',
                'Четверг, 2023-06-15',
                'Пятницы, 2023-06-16',
                'Суббота, 2023-06-17',
                'Воскресенье, 2023-06-18',
                'Понедельник, 2023-06-19',
                'Вторник, 2023-06-20',
                'Среда, 2023-06-21',
                'Четверг, 2023-06-22',
                'Пятницы, 2023-06-23',
                'Суббота, 2023-06-24',
                'Воскресенье, 2023-06-25',
                'Понедельник, 2023-06-26',
                'Вторник, 2023-06-27',
                'Среда, 2023-06-28',
                'Четверг, 2023-06-29',
                'Пятницы, 2023-06-30',
                'Рабочее время',
                'Задолженность - Текущая',
                'Задолженность - За предыдущий период',
                'Баланс отработанного времени',
                '1-15 - без учета задолженности',
                '1-15 - с учетом задолженности',
                '16-31 - без учета задолженности',
                '16-31 - с учетом задолженности',
                '1-31 - без учета задолженности',
                '1-31 - с учетом задолженности',
                'Работа в ночное время',
                'Время по оправдательным документам',
                'Время по документам добавленным к рабочему времени',
                'Сверхурочные',
                'Работа в праздничные и выходные дни'
            ];
            const arrayStr = [
                [
                    'staff name 4', '4', 'position4', 'division4', '08:00',
                    '08:00', '08:00', '08:00', '08:00', '08:00',
                    '08:00', '07:58(08:00)', '07:58(08:00)', '08:00', '08:00',
                    '00:00', '00:00', '00:00', '00:00', '00:00',
                    '00:00', '00:00', '00:00', '00:00', '00:00',
                    '00:00', '00:00', '00:00', '00:00', '00:00',
                    '00:00', '00:00', '00:00', '00:00', '87:56',
                    '00:04', '00:00', '-00:04', '87:56', '88:00',
                    '00:00', '00:00', '87:56', '88:00', '11:00',
                    '00:04', '00:00', '00:02', '00:00'
                ],
                [
                    'staff name 5', '5', 'position5', 'division5', '08:00',
                    '08:00', '08:00', '08:00', '07:59(08:00)', '07:58(08:00)',
                    '07:59(08:00)', '07:59(08:00)', '00:00', '00:00', '00:00',
                    '00:00', '00:00', '00:00', '00:00', '00:00',
                    '00:00', '00:00', '00:00', '00:00', '00:00',
                    '00:00', '00:00', '00:00', '00:00', '00:00',
                    '00:00', '00:00', '00:00', '00:00', '63:55',
                    '00:05', '00:00', '-00:04', '63:55', '64:00',
                    '00:00', '00:00', '63:55', '64:00', '08:00',
                    '00:03', '00:00', '00:02', '00:00'
                ],
            ];

            describe('Настройка глубина учета "Предыдущий месяц"', () => {
                decorate.el.butIcBefore.handler({
                    icon: but.unsorted_billhead_outline,
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.radio.handler({
                    name: 'Предыдущий месяц',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.button.handler({
                    name: 'Сохранить',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
            });

            describe('Включение / отключение настройки "Скрыть нулевые значения"', () => {
                decorate.el.checkbox.handler({
                    name: 'Скрыть нулевые значения',
                    timeout: entry.max
                });
                decorate.el.checkbox.checked({
                    name: 'Скрыть нулевые значения',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.checkbox.handler({
                    name: 'Скрыть нулевые значения',
                    timeout: entry.max
                });
                decorate.el.checkbox.unchecked({
                    name: 'Скрыть нулевые значения',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
            });

            describe('Проверка расчетов в таблице', () => {
                arrayStr.forEach((item1, index1) => {
                    describe(`Проверка строки ${index1 + 4}`, () => {
                        item1.forEach((item2, index2) => {
                            it(`В таблице в строке ${index1 + 4} в столбце ${index2 + 1} - "${arrayTitle[index2]}" отображается "${item2}".`,
                                async () => await dec.simpleText(el.table.cellGetTextNoHead,
                                    [index1 + 4, index2 + 1, entry.max],
                                    item2,
                                    el.table)
                            );
                        });
                    });

                });
            });
        });

        describe('Проверка настройки глубина учета "Предыдущие 3 месяца"', () => {

            const arrayTitle = [
                'Сотрудники',
                'Табельный номер',
                'Должность',
                'Подразделение',
                'Четверг, 2023-06-01',
                'Пятницы, 2023-06-02',
                'Суббота, 2023-06-03',
                'Воскресенье, 2023-06-04',
                'Понедельник, 2023-06-05',
                'Вторник, 2023-06-06',
                'Среда, 2023-06-07',
                'Четверг, 2023-06-08',
                'Пятницы, 2023-06-09',
                'Суббота, 2023-06-10',
                'Воскресенье, 2023-06-11',
                'Понедельник, 2023-06-12',
                'Вторник, 2023-06-13',
                'Среда, 2023-06-14',
                'Четверг, 2023-06-15',
                'Пятницы, 2023-06-16',
                'Суббота, 2023-06-17',
                'Воскресенье, 2023-06-18',
                'Понедельник, 2023-06-19',
                'Вторник, 2023-06-20',
                'Среда, 2023-06-21',
                'Четверг, 2023-06-22',
                'Пятницы, 2023-06-23',
                'Суббота, 2023-06-24',
                'Воскресенье, 2023-06-25',
                'Понедельник, 2023-06-26',
                'Вторник, 2023-06-27',
                'Среда, 2023-06-28',
                'Четверг, 2023-06-29',
                'Пятницы, 2023-06-30',
                'Рабочее время',
                'Задолженность - Текущая',
                'Задолженность - За предыдущий период',
                'Баланс отработанного времени',
                '1-15 - без учета задолженности',
                '1-15 - с учетом задолженности',
                '16-31 - без учета задолженности',
                '16-31 - с учетом задолженности',
                '1-31 - без учета задолженности',
                '1-31 - с учетом задолженности',
                'Работа в ночное время',
                'Время по оправдательным документам',
                'Время по документам добавленным к рабочему времени',
                'Сверхурочные',
                'Работа в праздничные и выходные дни'
            ];
            const arrayStr = [
                [
                    'staff name 4', '4', 'position4', 'division4', '08:00',
                    '08:00', '08:00', '08:00', '08:00', '08:00',
                    '08:00', '07:58(08:00)', '07:58(08:00)', '08:00', '08:00',
                    '00:00', '00:00', '00:00', '00:00', '00:00',
                    '00:00', '00:00', '00:00', '00:00', '00:00',
                    '00:00', '00:00', '00:00', '00:00', '00:00',
                    '00:00', '00:00', '00:00', '00:00', '87:56',
                    '00:04', '00:00', '-00:04', '87:56', '88:00',
                    '00:00', '00:00', '87:56', '88:00', '11:00',
                    '00:04', '00:00', '00:02', '00:00'
                ],
                [
                    'staff name 5', '5', 'position5', 'division5', '08:00',
                    '08:00', '08:00', '08:00', '07:59(08:00)', '07:58(08:00)',
                    '07:59(08:00)', '07:59(08:00)', '00:00', '00:00', '00:00',
                    '00:00', '00:00', '00:00', '00:00', '00:00',
                    '00:00', '00:00', '00:00', '00:00', '00:00',
                    '00:00', '00:00', '00:00', '00:00', '00:00',
                    '00:00', '00:00', '00:00', '00:00', '63:55',
                    '00:05', '00:00', '-00:04', '63:55', '64:00',
                    '00:00', '00:00', '63:55', '64:00', '08:00',
                    '00:03', '00:00', '00:02', '00:00'
                ],
            ];

            describe('Настройка глубина учета "Предыдущие 3 месяца"', () => {
                decorate.el.butIcBefore.handler({
                    icon: but.unsorted_billhead_outline,
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.radio.handler({
                    name: 'Предыдущие 3 месяца',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.button.handler({
                    name: 'Сохранить',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
            });

            describe('Включение / отключение настройки "Скрыть нулевые значения"', () => {
                decorate.el.checkbox.handler({
                    name: 'Скрыть нулевые значения',
                    timeout: entry.max
                });
                decorate.el.checkbox.checked({
                    name: 'Скрыть нулевые значения',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.checkbox.handler({
                    name: 'Скрыть нулевые значения',
                    timeout: entry.max
                });
                decorate.el.checkbox.unchecked({
                    name: 'Скрыть нулевые значения',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
            });

            describe('Проверка расчетов в таблице', () => {
                arrayStr.forEach((item1, index1) => {
                    describe(`Проверка строки ${index1 + 4}`, () => {
                        item1.forEach((item2, index2) => {
                            it(`В таблице в строке ${index1 + 4} в столбце ${index2 + 1} - "${arrayTitle[index2]}" отображается "${item2}".`,
                                async () => await dec.simpleText(el.table.cellGetTextNoHead,
                                    [index1 + 4, index2 + 1, entry.max],
                                    item2,
                                    el.table)
                            );
                        });
                    });

                });
            });
        });

        describe('Проверка настройки глубина учета "Предыдущие 6 месяцев"', () => {

            const arrayTitle = [
                'Сотрудники',
                'Табельный номер',
                'Должность',
                'Подразделение',
                'Четверг, 2023-06-01',
                'Пятницы, 2023-06-02',
                'Суббота, 2023-06-03',
                'Воскресенье, 2023-06-04',
                'Понедельник, 2023-06-05',
                'Вторник, 2023-06-06',
                'Среда, 2023-06-07',
                'Четверг, 2023-06-08',
                'Пятницы, 2023-06-09',
                'Суббота, 2023-06-10',
                'Воскресенье, 2023-06-11',
                'Понедельник, 2023-06-12',
                'Вторник, 2023-06-13',
                'Среда, 2023-06-14',
                'Четверг, 2023-06-15',
                'Пятницы, 2023-06-16',
                'Суббота, 2023-06-17',
                'Воскресенье, 2023-06-18',
                'Понедельник, 2023-06-19',
                'Вторник, 2023-06-20',
                'Среда, 2023-06-21',
                'Четверг, 2023-06-22',
                'Пятницы, 2023-06-23',
                'Суббота, 2023-06-24',
                'Воскресенье, 2023-06-25',
                'Понедельник, 2023-06-26',
                'Вторник, 2023-06-27',
                'Среда, 2023-06-28',
                'Четверг, 2023-06-29',
                'Пятницы, 2023-06-30',
                'Рабочее время',
                'Задолженность - Текущая',
                'Задолженность - За предыдущий период',
                'Баланс отработанного времени',
                '1-15 - без учета задолженности',
                '1-15 - с учетом задолженности',
                '16-31 - без учета задолженности',
                '16-31 - с учетом задолженности',
                '1-31 - без учета задолженности',
                '1-31 - с учетом задолженности',
                'Работа в ночное время',
                'Время по оправдательным документам',
                'Время по документам добавленным к рабочему времени',
                'Сверхурочные',
                'Работа в праздничные и выходные дни'
            ];
            const arrayStr = [
                [
                    'staff name 4', '4', 'position4', 'division4', '08:00',
                    '08:00', '08:00', '08:00', '08:00', '08:00',
                    '08:00', '07:58(08:00)', '07:58(08:00)', '08:00', '08:00',
                    '00:00', '00:00', '00:00', '00:00', '00:00',
                    '00:00', '00:00', '00:00', '00:00', '00:00',
                    '00:00', '00:00', '00:00', '00:00', '00:00',
                    '00:00', '00:00', '00:00', '00:00', '87:56',
                    '00:04', '00:00', '-00:04', '87:56', '88:00',
                    '00:00', '00:00', '87:56', '88:00', '11:00',
                    '00:04', '00:00', '00:02', '00:00'
                ],
                [
                    'staff name 5', '5', 'position5', 'division5', '08:00',
                    '08:00', '08:00', '08:00', '07:59(08:00)', '07:58(08:00)',
                    '07:59(08:00)', '07:59(08:00)', '00:00', '00:00', '00:00',
                    '00:00', '00:00', '00:00', '00:00', '00:00',
                    '00:00', '00:00', '00:00', '00:00', '00:00',
                    '00:00', '00:00', '00:00', '00:00', '00:00',
                    '00:00', '00:00', '00:00', '00:00', '63:55',
                    '00:05', '00:00', '-00:04', '63:55', '64:00',
                    '00:00', '00:00', '63:55', '64:00', '08:00',
                    '00:03', '00:00', '00:02', '00:00'
                ],
            ];

            describe('Настройка глубина учета "Предыдущие 6 месяцев"', () => {
                decorate.el.butIcBefore.handler({
                    icon: but.unsorted_billhead_outline,
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.radio.handler({
                    name: 'Предыдущие 6 месяцев',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.button.handler({
                    name: 'Сохранить',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
            });

            describe('Включение / отключение настройки "Скрыть нулевые значения"', () => {
                decorate.el.checkbox.handler({
                    name: 'Скрыть нулевые значения',
                    timeout: entry.max
                });
                decorate.el.checkbox.checked({
                    name: 'Скрыть нулевые значения',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.checkbox.handler({
                    name: 'Скрыть нулевые значения',
                    timeout: entry.max
                });
                decorate.el.checkbox.unchecked({
                    name: 'Скрыть нулевые значения',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
            });

            describe('Проверка расчетов в таблице', () => {
                arrayStr.forEach((item1, index1) => {
                    describe(`Проверка строки ${index1 + 4}`, () => {
                        item1.forEach((item2, index2) => {
                            it(`В таблице в строке ${index1 + 4} в столбце ${index2 + 1} - "${arrayTitle[index2]}" отображается "${item2}".`,
                                async () => await dec.simpleText(el.table.cellGetTextNoHead,
                                    [index1 + 4, index2 + 1, entry.max],
                                    item2,
                                    el.table)
                            );
                        });
                    });

                });
            });
        });

        describe('Проверка настройки глубина учета "Предыдущие 12 месяцев"', () => {

            const arrayTitle = [
                'Сотрудники',
                'Табельный номер',
                'Должность',
                'Подразделение',
                'Четверг, 2023-06-01',
                'Пятницы, 2023-06-02',
                'Суббота, 2023-06-03',
                'Воскресенье, 2023-06-04',
                'Понедельник, 2023-06-05',
                'Вторник, 2023-06-06',
                'Среда, 2023-06-07',
                'Четверг, 2023-06-08',
                'Пятницы, 2023-06-09',
                'Суббота, 2023-06-10',
                'Воскресенье, 2023-06-11',
                'Понедельник, 2023-06-12',
                'Вторник, 2023-06-13',
                'Среда, 2023-06-14',
                'Четверг, 2023-06-15',
                'Пятницы, 2023-06-16',
                'Суббота, 2023-06-17',
                'Воскресенье, 2023-06-18',
                'Понедельник, 2023-06-19',
                'Вторник, 2023-06-20',
                'Среда, 2023-06-21',
                'Четверг, 2023-06-22',
                'Пятницы, 2023-06-23',
                'Суббота, 2023-06-24',
                'Воскресенье, 2023-06-25',
                'Понедельник, 2023-06-26',
                'Вторник, 2023-06-27',
                'Среда, 2023-06-28',
                'Четверг, 2023-06-29',
                'Пятницы, 2023-06-30',
                'Рабочее время',
                'Задолженность - Текущая',
                'Задолженность - За предыдущий период',
                'Баланс отработанного времени',
                '1-15 - без учета задолженности',
                '1-15 - с учетом задолженности',
                '16-31 - без учета задолженности',
                '16-31 - с учетом задолженности',
                '1-31 - без учета задолженности',
                '1-31 - с учетом задолженности',
                'Работа в ночное время',
                'Время по оправдательным документам',
                'Время по документам добавленным к рабочему времени',
                'Сверхурочные',
                'Работа в праздничные и выходные дни'
            ];
            const arrayStr = [
                [
                    'staff name 4', '4', 'position4', 'division4', '08:00',
                    '08:00', '08:00', '08:00', '08:00', '08:00',
                    '08:00', '07:58(08:00)', '07:58(08:00)', '08:00', '08:00',
                    '00:00', '00:00', '00:00', '00:00', '00:00',
                    '00:00', '00:00', '00:00', '00:00', '00:00',
                    '00:00', '00:00', '00:00', '00:00', '00:00',
                    '00:00', '00:00', '00:00', '00:00', '87:56',
                    '00:04', '00:00', '-00:04', '87:56', '88:00',
                    '00:00', '00:00', '87:56', '88:00', '11:00',
                    '00:04', '00:00', '00:02', '00:00'
                ],
                [
                    'staff name 5', '5', 'position5', 'division5', '08:00',
                    '08:00', '08:00', '08:00', '07:59(08:00)', '07:58(08:00)',
                    '07:59(08:00)', '07:59(08:00)', '00:00', '00:00', '00:00',
                    '00:00', '00:00', '00:00', '00:00', '00:00',
                    '00:00', '00:00', '00:00', '00:00', '00:00',
                    '00:00', '00:00', '00:00', '00:00', '00:00',
                    '00:00', '00:00', '00:00', '00:00', '63:55',
                    '00:05', '00:00', '-00:04', '63:55', '64:00',
                    '00:00', '00:00', '63:55', '64:00', '08:00',
                    '00:03', '00:00', '00:02', '00:00'
                ],
            ];

            describe('Настройка глубина учета "Предыдущие 12 месяцев"', () => {
                decorate.el.butIcBefore.handler({
                    icon: but.unsorted_billhead_outline,
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.radio.handler({
                    name: 'Предыдущие 12 месяцев',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.button.handler({
                    name: 'Сохранить',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
            });

            describe('Включение / отключение настройки "Скрыть нулевые значения"', () => {
                decorate.el.checkbox.handler({
                    name: 'Скрыть нулевые значения',
                    timeout: entry.max
                });
                decorate.el.checkbox.checked({
                    name: 'Скрыть нулевые значения',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.checkbox.handler({
                    name: 'Скрыть нулевые значения',
                    timeout: entry.max
                });
                decorate.el.checkbox.unchecked({
                    name: 'Скрыть нулевые значения',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
            });

            describe('Проверка расчетов в таблице', () => {
                arrayStr.forEach((item1, index1) => {
                    describe(`Проверка строки ${index1 + 4}`, () => {
                        item1.forEach((item2, index2) => {
                            it(`В таблице в строке ${index1 + 4} в столбце ${index2 + 1} - "${arrayTitle[index2]}" отображается "${item2}".`,
                                async () => await dec.simpleText(el.table.cellGetTextNoHead,
                                    [index1 + 4, index2 + 1, entry.max],
                                    item2,
                                    el.table)
                            );
                        });
                    });

                });
            });
        });

        describe('Проверка настройки глубина учета "Не учитывать предыдущие периоды"', () => {

            const arrayTitle = [
                'Сотрудники',
                'Табельный номер',
                'Должность',
                'Подразделение',
                'Четверг, 2023-06-01',
                'Пятницы, 2023-06-02',
                'Суббота, 2023-06-03',
                'Воскресенье, 2023-06-04',
                'Понедельник, 2023-06-05',
                'Вторник, 2023-06-06',
                'Среда, 2023-06-07',
                'Четверг, 2023-06-08',
                'Пятницы, 2023-06-09',
                'Суббота, 2023-06-10',
                'Воскресенье, 2023-06-11',
                'Понедельник, 2023-06-12',
                'Вторник, 2023-06-13',
                'Среда, 2023-06-14',
                'Четверг, 2023-06-15',
                'Пятницы, 2023-06-16',
                'Суббота, 2023-06-17',
                'Воскресенье, 2023-06-18',
                'Понедельник, 2023-06-19',
                'Вторник, 2023-06-20',
                'Среда, 2023-06-21',
                'Четверг, 2023-06-22',
                'Пятницы, 2023-06-23',
                'Суббота, 2023-06-24',
                'Воскресенье, 2023-06-25',
                'Понедельник, 2023-06-26',
                'Вторник, 2023-06-27',
                'Среда, 2023-06-28',
                'Четверг, 2023-06-29',
                'Пятницы, 2023-06-30',
                'Рабочее время',
                'Задолженность - Текущая',
                'Задолженность - За предыдущий период',
                'Баланс отработанного времени',
                '1-15 - без учета задолженности',
                '1-15 - с учетом задолженности',
                '16-31 - без учета задолженности',
                '16-31 - с учетом задолженности',
                '1-31 - без учета задолженности',
                '1-31 - с учетом задолженности',
                'Работа в ночное время',
                'Время по оправдательным документам',
                'Время по документам добавленным к рабочему времени',
                'Сверхурочные',
                'Работа в праздничные и выходные дни'
            ];
            const arrayStr = [
                [
                    'staff name 4', '4', 'position4', 'division4', '08:00',
                    '08:00', '08:00', '08:00', '08:00', '08:00',
                    '08:00', '07:58(08:00)', '07:58(08:00)', '08:00', '08:00',
                    '00:00', '00:00', '00:00', '00:00', '00:00',
                    '00:00', '00:00', '00:00', '00:00', '00:00',
                    '00:00', '00:00', '00:00', '00:00', '00:00',
                    '00:00', '00:00', '00:00', '00:00', '87:56',
                    '00:04', '00:00', '-00:04', '87:56', '88:00',
                    '00:00', '00:00', '87:56', '88:00', '11:00',
                    '00:04', '00:00', '00:02', '00:00'
                ],
                [
                    'staff name 5', '5', 'position5', 'division5', '08:00',
                    '08:00', '08:00', '08:00', '07:59(08:00)', '07:58(08:00)',
                    '07:59(08:00)', '07:59(08:00)', '00:00', '00:00', '00:00',
                    '00:00', '00:00', '00:00', '00:00', '00:00',
                    '00:00', '00:00', '00:00', '00:00', '00:00',
                    '00:00', '00:00', '00:00', '00:00', '00:00',
                    '00:00', '00:00', '00:00', '00:00', '63:55',
                    '00:05', '00:00', '-00:04', '63:55', '64:00',
                    '00:00', '00:00', '63:55', '64:00', '08:00',
                    '00:03', '00:00', '00:02', '00:00'
                ],
            ];

            describe('Настройка глубина учета "Не учитывать предыдущие периоды"', () => {
                decorate.el.butIcBefore.handler({
                    icon: but.unsorted_billhead_outline,
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.radio.handler({
                    name: 'Не учитывать предыдущие периоды',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.button.handler({
                    name: 'Сохранить',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
            });

            describe('Включение / отключение настройки "Скрыть нулевые значения"', () => {
                decorate.el.checkbox.handler({
                    name: 'Скрыть нулевые значения',
                    timeout: entry.max
                });
                decorate.el.checkbox.checked({
                    name: 'Скрыть нулевые значения',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.checkbox.handler({
                    name: 'Скрыть нулевые значения',
                    timeout: entry.max
                });
                decorate.el.checkbox.unchecked({
                    name: 'Скрыть нулевые значения',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
            });

            describe('Проверка расчетов в таблице', () => {
                arrayStr.forEach((item1, index1) => {
                    describe(`Проверка строки ${index1 + 4}`, () => {
                        item1.forEach((item2, index2) => {
                            it(`В таблице в строке ${index1 + 4} в столбце ${index2 + 1} - "${arrayTitle[index2]}" отображается "${item2}".`,
                                async () => await dec.simpleText(el.table.cellGetTextNoHead,
                                    [index1 + 4, index2 + 1, entry.max],
                                    item2,
                                    el.table)
                            );
                        });
                    });

                });
            });
        });

    });

    const divisionFilterReports = () => describe('УРВ. Отчёт УРВ. Проверка фильтра по подразделению.', () => {

        bef();
        aft();

        describe('Выбор даты проверки 2023-06-01 - 2023-06-30', () => {
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
        });

        describe('Проверка таблицы до использования фильтра "Подразделение"', () => {
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
            decorate.el.table.size({
                strCount: 8,
                timeout: entry.max
            });
            decorate.el.table.cellGetText({
                headTitle: 'Подразделение',
                strNumber: 1,
                cellNumber: 4,
                value: data.divisions.division1.name,
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
                headTitle: 'Подразделение',
                strNumber: 3,
                cellNumber: 4,
                value: data.divisions.division3.name,
                timeout: entry.max
            });
            decorate.el.table.cellGetText({
                headTitle: 'Подразделение',
                strNumber: 4,
                cellNumber: 4,
                value: data.divisions.division4.name,
                timeout: entry.max
            });
            decorate.el.table.cellGetText({
                headTitle: 'Подразделение',
                strNumber: 5,
                cellNumber: 4,
                value: data.divisions.division5.name,
                timeout: entry.max
            });
            decorate.el.table.cellGetText({
                headTitle: 'Подразделение',
                strNumber: 6,
                cellNumber: 4,
                value: data.divisions.division6.name,
                timeout: entry.max
            });
            decorate.el.table.cellGetText({
                headTitle: 'Подразделение',
                strNumber: 7,
                cellNumber: 4,
                value: data.divisions.division7.name,
                timeout: entry.max
            });
            decorate.el.table.cellGetText({
                headTitle: 'Подразделение',
                strNumber: 8,
                cellNumber: 4,
                value: data.divisions.division8.name,
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

        describe('Проверка таблицы после изпользования фильтра "Подразделение" через окно выбора', () => {
            decorate.el.table.size({
                strCount: 1,
                timeout: entry.max
            });
            decorate.el.table.cellGetText({
                headTitle: 'Подразделение',
                strNumber: 1,
                cellNumber: 4,
                value: data.divisions.division2.name,
                timeout: entry.max
            });
        });

        describe(`Выбор в фильтре "${data.divisions.division3.name}" через модальное окно "Подразделение"`, () => {
            decorate.el.selectInput.iconOutline({
                title: '',
                placeholder: 'Подразделение',
                timeout: entry.max
            });
            decorate.modal.divisionFilter.init({
                timeout: entry.max
            });
            decorate.el.filterTreeNode.handler({
                name: data.divisions.division3.name,
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
                    cellNumber: 4,
                    value: data.divisions.division3.name,
                    timeout: entry.max
                });
            });
    });

    const searchFilterReports = () => describe('УРВ. Отчёт УРВ.  Проверка фильтра "Поиск...".',
        () => {

            bef();
            aft();

            describe('Выбор даты проверки 2023-06-01 - 2023-06-30', () => {
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
            });

            describe('Проверка таблицы до изпользования фильтра "Поиск..."', () => {
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.table.size({
                    strCount: 8,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Сотрудники',
                    strNumber: 1,
                    cellNumber: 1,
                    value: data.fio.staff1,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Сотрудники',
                    strNumber: 2,
                    cellNumber: 1,
                    value: data.fio.staff2,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Сотрудники',
                    strNumber: 3,
                    cellNumber: 1,
                    value: data.fio.staff3,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Сотрудники',
                    strNumber: 4,
                    cellNumber: 1,
                    value: data.fio.staff4,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Сотрудники',
                    strNumber: 5,
                    cellNumber: 1,
                    value: data.fio.staff5,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Сотрудники',
                    strNumber: 6,
                    cellNumber: 1,
                    value: data.fio.staff6,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Сотрудники',
                    strNumber: 7,
                    cellNumber: 1,
                    value: data.fio.staff7,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Сотрудники',
                    strNumber: 8,
                    cellNumber: 1,
                    value: data.fio.staff8,
                    timeout: entry.max
                });
            });

            describe(`Ввод в фильтр "${data.fio.staff5}"`, () => {
                decorate.el.input.sendKeys({
                    title: '',
                    placeholder: 'Поиск...',
                    value: data.fio.staff5,
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
            });

            describe('Проверка таблицы после измпользования фильтра "Поиск..."', () => {
                decorate.el.table.size({
                    strCount: 1,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Сотрудники',
                    strNumber: 1,
                    cellNumber: 1,
                    value: data.fio.staff5,
                    timeout: entry.max
                });
            });

            describe(`Удаление "${data.fio.staff5}" из фильтра "Поиск..." и проверка таблицы`, () => {
                decorate.el.input.backSpace({
                    title: '',
                    placeholder: 'Поиск...',
                    timeout: entry.max
                });
                dec.animation();
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.table.size({
                    strCount: 8,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Сотрудники',
                    strNumber: 1,
                    cellNumber: 1,
                    value: data.fio.staff1,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Сотрудники',
                    strNumber: 2,
                    cellNumber: 1,
                    value: data.fio.staff2,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Сотрудники',
                    strNumber: 3,
                    cellNumber: 1,
                    value: data.fio.staff3,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Сотрудники',
                    strNumber: 4,
                    cellNumber: 1,
                    value: data.fio.staff4,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Сотрудники',
                    strNumber: 5,
                    cellNumber: 1,
                    value: data.fio.staff5,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Сотрудники',
                    strNumber: 6,
                    cellNumber: 1,
                    value: data.fio.staff6,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Сотрудники',
                    strNumber: 7,
                    cellNumber: 1,
                    value: data.fio.staff7,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Сотрудники',
                    strNumber: 8,
                    cellNumber: 1,
                    value: data.fio.staff8,
                    timeout: entry.max
                });
            });
        });

    const resetFilter = () => describe('УРВ. Журнал отработанного времени. Проверка "Сбросить фильтры".', () => {

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
                strCount: 8,
                timeout: entry.max
            });
        });

        describe('Проверка таблицы до использования фильтров', () => {
            decorate.el.table.size({
                strCount: 8,
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
                strCount: 8,
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
        calculationDateReports,
        checkCalculationReports,
        printReports,
        exportReportsXLSX,
        exportReportsCSV,
        checkCalculationNoNullReports,
        documentCalculateReports,
        deleteDocumentReports,
        staffDeptWorkedReports,
        periodCalculationReports,
        divisionFilterReports,
        searchFilterReports,
        resetFilter
    }
};

module.exports = {
    other: other()
}