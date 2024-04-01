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

const bef = () => before('Вход и открытие подраздела "Журнал отработанного времени"', async () => {
    await page.base.loading(entry.sleep1);
    await dec.auth(entry.customLogin, entry.customPassword);
    await dec.simple(el.section.handler, [sec.urv, entry.max], el.section);
    await dec.simple(el.subsection.handler, [sub.urv.journal, entry.max], el.subsection);
    await dec.simple(page.workedJournal.init, [entry.max], page.workedJournal);
    await page.base.loading(entry.sleep1);
});

const aft = () => after('Выход', async () => {
    await page.base.loading(entry.sleep1);
    await dec.exit();
    await page.base.loading(entry.sleep1);
});

const other = () => {

    const calculateСurrentWorkedJournal = () => describe('УРВ. Журнал отработанного времени. Проверка кнопки пересчет.',
        () => {

        bef();
        aft();

        describe('Проверка таблицы до пересчета.', () => {
            decorate.el.table.noStr({
                timeout: entry.max
            });
        });

        describe('Пересчет.', () => {
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

        describe('Проверка таблицы после пересчета.', () => {
            decorate.el.table.size({
                strCount: 8,
                timeout: entry.max
            });
        });
    });

    const calculationDateWorkedJournal = () => describe('УРВ. Журнал отработанного времени.' +
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

    const checkCalculationWorkedJournal = () => describe('УРВ. Журнал отработанного времени. ' +
        'Проверка таблицы и расчетов.', () => {

        const arrHead1 = [
            'Табельный номер',
            'Должность',
            'Сотрудники',
            'Подразделение',
            'Присутствие',
            'Рабочее время',
            'Отсутствие',
            'Задолженность',
            'Непогашаемая задолженность',
            'Работа в ночное время',
            'Переработка',
            'Баланс отработанного времени',
            'Оправдательные документы с добавлением рабочего времени',
            'Документы без добавления времени / Сверхурочные',
            'График работы'
        ];
        const arrData1 = [
            [
                '1', 'position1', 'staff name 1', 'division1',
                '86:54', '79:54', '140:06', '', '',
                '10:00', '00:02', '-140:06', '', '', 'week'
            ],
            [
                '2', 'position2', 'staff name 2', 'division2',
                '296:54', '215:56', '144:04', '', '',
                '18:00', '00:02', '-144:06', '', '', 'shift'
            ],
            [
                '3', 'position3', 'staff name 3', 'division3',
                '23:59', '23:59', '', '', '',
                '01:00', '', '', '', '', 'attendance'
            ],
            [
                '4', 'position4', 'staff name 4', 'division4',
                '94:52', '87:52', '132:08', '00:08', '',
                '11:00', '00:02', '-00:08', '', '', 'violation'
            ],
            [
                '5', 'position5', 'staff name 5', 'division5',
                '68:54', '63:52', '156:08', '00:07', '00:06',
                '08:00', '00:02', '-00:07', '', '', 'balance'
            ],
            [
                '6', 'position6', 'staff name 6', 'division6',
                '09:00', '08:00', '232:00', '', '',
                '01:00', '', '-232:00', '', '', 'week_2'
            ],
            [
                '7', 'position7', 'staff name 7', 'division7',
                '24:00', '15:00', '336:00', '', '',
                '01:00', '', '-336:00', '', '', 'shift_2'
            ],
            [
                '8', 'position8', 'staff name 8', 'division8',
                '09:00', '09:00', '', '', '',
                '01:00', '', '', '', '', 'attendance_2'
            ]
        ];

        const arrHead2 = [
            'Дата',
            'Присутствие',
            'Рабочее время',
            'Отсутствие',
            'Задолженность',
            'Не погашаемая задолженность',
            'Работа в ночное время',
            'Переработка',
            'Баланс отработанного времени',
            'Оправдательные документы с добавлением рабочего времени',
            'Документы без добавления времени / Сверхурочные'
        ];
        const arrData2 = [
            [
                ['2023-06-01 Чт', '08:00', '08:00', '', '', '', '01:00', '', '', '', ''],
                ['2023-06-02 Пт', '09:00', '08:00', '', '', '', '01:00', '', '', '', ''],
                ['2023-06-03 Сб', '08:59', '08:00', '', '', '', '01:00', '', '-00:01', '', ''],
                ['2023-06-04 Вс', '08:58', '07:58', '00:02', '', '', '01:00', '', '-00:02', '', ''],
                ['2023-06-05 Пн', '08:59', '08:00', '', '', '', '01:00', '', '-00:01', '', ''],
                ['2023-06-06 Вт', '08:58', '07:58', '00:02', '', '', '01:00', '', '-00:02', '', ''],
                ['2023-06-07 Ср', '07:59', '08:00', '', '', '', '01:00', '', '-00:01', '', ''],
                ['2023-06-08 Чт', '07:58', '07:58', '00:02', '', '', '01:00', '', '-00:02', '', ''],
                ['2023-06-09 Пт', '09:01', '08:00', '', '', '', '01:00', '', '00:01', '', ''],
                ['2023-06-10 Сб', '09:02', '08:00', '', '', '', '01:00', '00:02', '00:02', '', ''],
                ['2023-06-11 Вс', '', '', '08:00', '', '', '', '', '-08:00', '', ''],
                ['2023-06-12 Пн', '', '', '', '', '', '', '', '', '', ''],
                ['2023-06-13 Вт', '', '', '06:00', '', '', '', '', '-06:00', '', ''],
                ['2023-06-14 Ср', '', '', '08:00', '', '', '', '', '-08:00', '', ''],
                ['2023-06-15 Чт', '', '', '08:00', '', '', '', '', '-08:00', '', ''],
                ['2023-06-16 Пт', '', '', '', '', '', '', '', '', '', ''],
                ['2023-06-17 Сб', '', '', '06:00', '', '', '', '', '-06:00', '', '']
            ],
            [
                ['2023-06-01 Чт', '', '', '', '', '', '', '', '', '', ''],
                ['2023-06-02 Пт', '33:00', '24:00', '', '', '', '02:00', '', '', '', ''],
                ['2023-06-03 Сб', '', '', '', '', '', '', '', '', '', ''],
                ['2023-06-04 Вс', '32:59', '24:00', '', '', '', '02:00', '', '-00:01', '', ''],
                ['2023-06-05 Пн', '', '', '', '', '', '', '', '', '', ''],
                ['2023-06-06 Вт', '32:58', '23:58', '00:02', '', '', '02:00', '', '-00:02', '', ''],
                ['2023-06-07 Ср', '', '', '', '', '', '', '', '', '', ''],
                ['2023-06-08 Чт', '32:59', '24:00', '', '', '', '02:00', '', '-00:01', '', ''],
                ['2023-06-09 Пт', '', '', '', '', '', '', '', '', '', ''],
                ['2023-06-10 Сб', '32:58', '23:58', '00:02', '', '', '02:00', '', '-00:02', '', ''],
                ['2023-06-11 Вс', '', '', '', '', '', '', '', '', '', ''],
                ['2023-06-12 Пн', '32:59', '24:00', '', '', '', '02:00', '', '-00:01', '', ''],
                ['2023-06-13 Вт', '', '', '', '', '', '', '', '', '', ''],
                ['2023-06-14 Ср', '32:58', '24:00', '', '', '', '02:00', '', '-00:02', '', ''],
                ['2023-06-15 Чт', '', '', '', '', '', '', '', '', '', ''],
                ['2023-06-16 Пт', '33:01', '24:00', '', '', '', '02:00', '', '00:01', '', ''],
                ['2023-06-17 Сб', '', '', '', '', '', '', '', '', '', ''],
                ['2023-06-18 Вс', '33:02', '24:00', '', '', '', '02:00', '00:02', '00:02', '', ''],
                ['2023-06-19 Пн', '', '', '', '', '', '', '', '', '', ''],
                ['2023-06-20 Вт', '', '', '24:00', '', '', '', '', '-24:00', '', '']
            ],
            [
                ['2023-06-01 Чт', '23:59', '23:59', '', '', '', '01:00', '', '', '', ''],
                ['2023-06-02 Пт', '', '', '', '', '', '', '', '', '', '']
            ],
            [
                ['2023-06-01 Чт', '08:00', '08:00', '', '', '', '01:00', '', '', '', ''],
                ['2023-06-02 Пт', '09:00', '08:00', '', '', '', '01:00', '', '', '', ''],
                ['2023-06-03 Сб', '08:59', '08:00', '', '', '', '01:00', '', '-00:01', '', ''],
                ['2023-06-04 Вс', '08:58', '07:58', '00:02', '00:02', '', '01:00', '', '-00:02', '', ''],
                ['2023-06-05 Пн', '08:59', '08:00', '', '', '', '01:00', '', '-00:01', '', ''],
                ['2023-06-06 Вт', '08:58', '07:58', '00:02', '00:02', '', '01:00', '', '-00:02', '', ''],
                ['2023-06-07 Ср', '07:59', '08:00', '', '', '', '01:00', '', '-00:01', '', ''],
                ['2023-06-08 Чт', '07:58', '07:58', '00:02', '00:02', '', '01:00', '', '-00:02', '', ''],
                ['2023-06-09 Пт', '07:58', '07:58', '00:02', '00:02', '', '01:00', '', '-00:02', '', ''],
                ['2023-06-10 Сб', '09:01', '08:00', '', '', '', '01:00', '', '00:01', '', ''],
                ['2023-06-11 Вс', '09:02', '08:00', '', '', '', '01:00', '00:02', '00:02', '', ''],
                ['2023-06-12 Пн', '', '', '', '', '', '', '', '', '', ''],
                ['2023-06-13 Вт', '', '', '06:00', '', '', '', '', '', '', ''],
                ['2023-06-14 Ср', '', '', '08:00', '', '', '', '', '', '', ''],
                ['2023-06-15 Чт', '', '', '08:00', '', '', '', '', '', '', ''],
                ['2023-06-16 Пт', '', '', '', '', '', '', '', '', '', ''],
                ['2023-06-17 Сб', '', '', '06:00', '', '', '', '', '', '', '']
            ],
            [
                ['2023-06-01 Чт', '08:00', '08:00', '', '', '', '01:00', '', '', '', ''],
                ['2023-06-02 Пт', '09:02', '08:00', '', '', '', '01:00', '00:02', '00:01', '', ''],
                ['2023-06-03 Сб', '08:59', '07:59', '00:01', '00:00 (00:01)', '00:01', '01:00', '', '', '', ''],
                ['2023-06-04 Вс', '08:58', '07:58', '00:02', '00:02', '00:02', '01:00', '', '-00:02', '', ''],
                ['2023-06-05 Пн', '08:59', '07:59', '00:01', '00:01', '00:01', '01:00', '', '-00:01', '', ''],
                ['2023-06-06 Вт', '08:58', '07:58', '00:02', '00:02', '00:02', '01:00', '', '-00:02', '', ''],
                ['2023-06-07 Ср', '07:59', '07:59', '00:01', '00:01', '', '01:00', '', '-00:01', '', ''],
                ['2023-06-08 Чт', '07:59', '07:59', '00:01', '00:01', '', '01:00', '', '-00:01', '', ''],
                ['2023-06-09 Пт', '', '', '08:00', '', '', '', '', '', '', ''],
                ['2023-06-10 Сб', '', '', '08:00', '', '', '', '', '', '', ''],
                ['2023-06-11 Вс', '', '', '08:00', '', '', '', '', '', '', ''],
                ['2023-06-12 Пн', '', '', '', '', '', '', '', '', '', ''],
                ['2023-06-13 Вт', '', '', '06:00', '', '', '', '', '', '', ''],
                ['2023-06-14 Ср', '', '', '08:00', '', '', '', '', '', '', ''],
                ['2023-06-15 Чт', '', '', '08:00', '', '', '', '', '', '', ''],
                ['2023-06-16 Пт', '', '', '', '', '', '', '', '', '', ''],
                ['2023-06-17 Сб', '', '', '06:00', '', '', '', '', '', '', '']
            ],
            [
                ['2023-06-01 Чт', '09:00', '08:00', '', '', '', '01:00', '', '', '', ''],
                ['2023-06-02 Пт', '', '', '08:00', '', '', '', '', '-08:00', '', ''],
                ['2023-06-03 Сб', '', '', '08:00', '', '', '', '', '-08:00', '', ''],
                ['2023-06-04 Вс', '', '', '08:00', '', '', '', '', '-08:00', '', ''],
                ['2023-06-05 Пн', '', '', '08:00', '', '', '', '', '-08:00', '', ''],
                ['2023-06-06 Вт', '', '', '08:00', '', '', '', '', '-08:00', '', ''],
                ['2023-06-07 Ср', '', '', '08:00', '', '', '', '', '-08:00', '', ''],
                ['2023-06-08 Чт', '', '', '08:00', '', '', '', '', '-08:00', '', ''],
                ['2023-06-09 Пт', '', '', '08:00', '', '', '', '', '-08:00', '', ''],
                ['2023-06-10 Сб', '', '', '08:00', '', '', '', '', '-08:00', '', ''],
                ['2023-06-11 Вс', '', '', '08:00', '', '', '', '', '-08:00', '', ''],
                ['2023-06-12 Пн', '', '', '08:00', '', '', '', '', '-08:00', '', ''],
                ['2023-06-13 Вт', '', '', '08:00', '', '', '', '', '-08:00', '', ''],
                ['2023-06-14 Ср', '', '', '08:00', '', '', '', '', '-08:00', '', ''],
                ['2023-06-15 Чт', '', '', '08:00', '', '', '', '', '-08:00', '', ''],
                ['2023-06-16 Пт', '', '', '08:00', '', '', '', '', '-08:00', '', ''],
                ['2023-06-17 Сб', '', '', '08:00', '', '', '', '', '-08:00', '', '']
            ],
            [
                ['2023-06-01 Чт', '', '', '', '', '', '', '', '', '', ''],
                ['2023-06-02 Пт', '24:00', '15:00', '', '', '', '01:00', '', '', '', ''],
                ['2023-06-03 Сб', '', '', '', '', '', '', '', '', '', ''],
                ['2023-06-04 Вс', '', '', '24:00', '', '', '', '', '-24:00', '', ''],
                ['2023-06-05 Пн', '', '', '', '', '', '', '', '', '', ''],
                ['2023-06-06 Вт', '', '', '24:00', '', '', '', '', '-24:00', '', ''],
                ['2023-06-07 Ср', '', '', '', '', '', '', '', '', '', ''],
                ['2023-06-08 Чт', '', '', '24:00', '', '', '', '', '-24:00', '', ''],
                ['2023-06-09 Пт', '', '', '', '', '', '', '', '', '', ''],
                ['2023-06-10 Сб', '', '', '24:00', '', '', '', '', '-24:00', '', ''],
                ['2023-06-11 Вс', '', '', '', '', '', '', '', '', '', ''],
                ['2023-06-12 Пн', '', '', '24:00', '', '', '', '', '-24:00', '', ''],
                ['2023-06-13 Вт', '', '', '', '', '', '', '', '', '', ''],
                ['2023-06-14 Ср', '', '', '24:00', '', '', '', '', '-24:00', '', ''],
                ['2023-06-15 Чт', '', '', '', '', '', '', '', '', '', ''],
                ['2023-06-16 Пт', '', '', '24:00', '', '', '', '', '-24:00', '', ''],
                ['2023-06-17 Сб', '', '', '', '', '', '', '', '', '', ''],
                ['2023-06-18 Вс', '', '', '24:00', '', '', '', '', '-24:00', '', ''],
                ['2023-06-19 Пн', '', '', '', '', '', '', '', '', '', ''],
                ['2023-06-20 Вт', '', '', '24:00', '', '', '', '', '-24:00', '', '']
            ],
            [
                ['2023-06-01 Чт', '09:00', '09:00', '', '', '', '01:00', '', '', '', ''],
                ['2023-06-02 Пт', '', '', '', '', '', '', '', '', '', ''],
                ['2023-06-03 Сб', '', '', '', '', '', '', '', '', '', ''],
                ['2023-06-04 Вс', '', '', '', '', '', '', '', '', '', ''],
                ['2023-06-05 Пн', '', '', '', '', '', '', '', '', '', ''],
                ['2023-06-06 Вт', '', '', '', '', '', '', '', '', '', ''],
                ['2023-06-07 Ср', '', '', '', '', '', '', '', '', '', ''],
                ['2023-06-08 Чт', '', '', '', '', '', '', '', '', '', ''],
                ['2023-06-09 Пт', '', '', '', '', '', '', '', '', '', ''],
                ['2023-06-10 Сб', '', '', '', '', '', '', '', '', '', ''],
                ['2023-06-11 Вс', '', '', '', '', '', '', '', '', '', ''],
                ['2023-06-12 Пн', '', '', '', '', '', '', '', '', '', ''],
                ['2023-06-13 Вт', '', '', '', '', '', '', '', '', '', ''],
                ['2023-06-14 Ср', '', '', '', '', '', '', '', '', '', ''],
                ['2023-06-15 Чт', '', '', '', '', '', '', '', '', '', ''],
                ['2023-06-16 Пт', '', '', '', '', '', '', '', '', '', ''],
                ['2023-06-17 Сб', '', '', '', '', '', '', '', '', '', '']
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
        });

        describe('Проверка расчетов в общей таблицы у всех сотрудников', () => {
            arrData1.forEach((item1, index1) => {
                describe(`Проверка строки ${index1 + 1}`, () => {
                    item1.forEach((item2, index2) => {
                        decorate.el.table.cellGetText({
                            headTitle: arrHead1[index2],
                            strNumber: index1 + 1,
                            cellNumber: index2 + 2,
                            value: item2,
                            timeout: entry.max
                        });
                    });
                });
            });
        });

        arrData2.forEach((item1, index1) => {
            describe(`Проверка расчетов по дням у сотрудника staff name ${index1 + 1}`, () => {
                describe('Открытие расчетов по дням', () => {
                    decorate.el.table.strHandler({
                        strNumber: index1 + 1,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.page.workedJournal.staffParams({
                        param: 'Подразделение',
                        value: `division${index1 + 1}`,
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.staffParams({
                        param: 'Должность',
                        value: `position${index1 + 1}`,
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.staffFIO({
                        value: `staff name ${index1 + 1}`,
                        timeout: entry.max
                    });
                });

                item1.forEach((item2, index2) => {
                    describe(`Проверка день ${index2 + 1}`, () => {
                        item2.forEach((item3, index3) => {
                            decorate.page.workedJournal.tableCellGetText({
                                headTitle: arrHead2[index3],
                                strNumber: index2 + 1,
                                cellNumber: index3 + 1,
                                value: item3,
                                timeout: entry.max
                            });
                        });
                    });
                });

                describe('Закрытие расчетов по дням', () => {
                    decorate.el.button.handler({
                        name: 'Закрыть',
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                });
            });
        });

    });

    const printTableWorkedJournal = () => describe('УРВ. Журнал отработанного времени. Проверка печати таблицы.',
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
            decorate.modal.printTable.cellGetText({
                head: 'Табельный номер',
                str: 1,
                cell: 1,
                value: data.staffs.staff1.tabel_number,
                timeout: entry.max
            });
            decorate.modal.printTable.cellGetText({
                head: 'Должность',
                str: 1,
                cell: 2,
                value: data.positions.position1.name,
                timeout: entry.max
            });
            decorate.modal.printTable.cellGetText({
                head: 'Сотрудники',
                str: 1,
                cell: 3,
                value: data.fio.staff1,
                timeout: entry.max
            });
            decorate.modal.printTable.cellGetText({
                head: 'Подразделение',
                str: 1,
                cell: 4,
                value: data.divisions.division1.name,
                timeout: entry.max
            });
            decorate.modal.printTable.cellGetText({
                head: 'Присутствие',
                str: 1,
                cell: 5,
                value: '86:54',
                timeout: entry.max
            });
            decorate.modal.printTable.cellGetText({
                head: 'Рабочее время',
                str: 1,
                cell: 6,
                value: '79:54',
                timeout: entry.max
            });
            decorate.modal.printTable.cellGetText({
                head: 'Отсутствие',
                str: 1,
                cell: 7,
                value: '140:06',
                timeout: entry.max
            });
            decorate.modal.printTable.cellGetText({
                head: 'Задолженность',
                str: 1,
                cell: 8,
                value: '',
                timeout: entry.max
            });
            decorate.modal.printTable.cellGetText({
                head: 'Непогашаемая задолженность',
                str: 1,
                cell: 9,
                value: '',
                timeout: entry.max
            });
            decorate.modal.printTable.cellGetText({
                head: 'Работа в ночное время',
                str: 1,
                cell: 10,
                value: '10:00',
                timeout: entry.max
            });
            decorate.modal.printTable.cellGetText({
                head: 'Переработка',
                str: 1,
                cell: 11,
                value: '00:02',
                timeout: entry.max
            });
            decorate.modal.printTable.cellGetText({
                head: 'Баланс отработанного времени',
                str: 1,
                cell: 12,
                value: '-140:06',
                timeout: entry.max
            });
            decorate.modal.printTable.cellGetText({
                head: 'Оправдательные документы с добавлением рабочего времени',
                str: 1,
                cell: 13,
                value: '',
                timeout: entry.max
            });
            decorate.modal.printTable.cellGetText({
                head: 'Документы без добавления времени / Сверхурочные',
                str: 1,
                cell: 14,
                value: '',
                timeout: entry.max
            });
            decorate.modal.printTable.cellGetText({
                head: 'График работы',
                str: 1,
                cell: 15,
                value: data.schedules.schedule1.name,
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

    const exportWorkedJournalXLSX = () => describe('УРВ. Журнал отработанного времени. Проверка экспорта XLSX.',
        () => {

        const params = {
            nameFile: 'workedjournal.xlsx',
            json:  [
                { 'Отчет "Учет рабочего времени"': '2023-06-01 - 2023-06-30' },
                {
                    'Отчет "Учет рабочего времени"': 'Фамилия',
                    __EMPTY: 'Имя',
                    __EMPTY_1: 'Отчество',
                    __EMPTY_2: 'Табельный номер',
                    __EMPTY_3: 'Должность',
                    __EMPTY_4: 'Подразделение',
                    __EMPTY_5: 'Присутствие',
                    __EMPTY_6: 'Рабочее время',
                    __EMPTY_7: 'Отсутствие',
                    __EMPTY_8: 'Задолженность',
                    __EMPTY_9: 'Непогашаемая задолженность',
                    __EMPTY_10: 'Работа в ночное время',
                    __EMPTY_11: 'Переработка',
                    __EMPTY_12: 'Баланс отработанного времени',
                    __EMPTY_13: 'Оправдательные документы с добавлением рабочего времени',
                    __EMPTY_14: 'Документы без добавления времени / Сверхурочные',
                    __EMPTY_15: 'График работы'
                },
                {
                    'Отчет "Учет рабочего времени"': 'staff',
                    __EMPTY: 'name',
                    __EMPTY_1: '1',
                    __EMPTY_2: '1',
                    __EMPTY_3: 'position1',
                    __EMPTY_4: 'division1',
                    __EMPTY_5: '86:54',
                    __EMPTY_6: '79:54',
                    __EMPTY_7: '140:06',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '10:00',
                    __EMPTY_11: '00:02',
                    __EMPTY_12: '-140:06',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'week'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-01 Чт',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position1',
                    __EMPTY_4: 'division1',
                    __EMPTY_5: '08:00',
                    __EMPTY_6: '08:00',
                    __EMPTY_7: '',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '01:00',
                    __EMPTY_11: '',
                    __EMPTY_12: '',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'week'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-02 Пт',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position1',
                    __EMPTY_4: 'division1',
                    __EMPTY_5: '09:00',
                    __EMPTY_6: '08:00',
                    __EMPTY_7: '',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '01:00',
                    __EMPTY_11: '',
                    __EMPTY_12: '',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'week'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-03 Сб',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position1',
                    __EMPTY_4: 'division1',
                    __EMPTY_5: '08:59',
                    __EMPTY_6: '08:00',
                    __EMPTY_7: '',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '01:00',
                    __EMPTY_11: '',
                    __EMPTY_12: '-00:01',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'week'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-04 Вс',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position1',
                    __EMPTY_4: 'division1',
                    __EMPTY_5: '08:58',
                    __EMPTY_6: '07:58',
                    __EMPTY_7: '00:02',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '01:00',
                    __EMPTY_11: '',
                    __EMPTY_12: '-00:02',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'week'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-05 Пн',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position1',
                    __EMPTY_4: 'division1',
                    __EMPTY_5: '08:59',
                    __EMPTY_6: '08:00',
                    __EMPTY_7: '',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '01:00',
                    __EMPTY_11: '',
                    __EMPTY_12: '-00:01',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'week'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-06 Вт',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position1',
                    __EMPTY_4: 'division1',
                    __EMPTY_5: '08:58',
                    __EMPTY_6: '07:58',
                    __EMPTY_7: '00:02',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '01:00',
                    __EMPTY_11: '',
                    __EMPTY_12: '-00:02',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'week'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-07 Ср',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position1',
                    __EMPTY_4: 'division1',
                    __EMPTY_5: '07:59',
                    __EMPTY_6: '08:00',
                    __EMPTY_7: '',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '01:00',
                    __EMPTY_11: '',
                    __EMPTY_12: '-00:01',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'week'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-08 Чт',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position1',
                    __EMPTY_4: 'division1',
                    __EMPTY_5: '07:58',
                    __EMPTY_6: '07:58',
                    __EMPTY_7: '00:02',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '01:00',
                    __EMPTY_11: '',
                    __EMPTY_12: '-00:02',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'week'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-09 Пт',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position1',
                    __EMPTY_4: 'division1',
                    __EMPTY_5: '09:01',
                    __EMPTY_6: '08:00',
                    __EMPTY_7: '',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '01:00',
                    __EMPTY_11: '',
                    __EMPTY_12: '00:01',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'week'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-10 Сб',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position1',
                    __EMPTY_4: 'division1',
                    __EMPTY_5: '09:02',
                    __EMPTY_6: '08:00',
                    __EMPTY_7: '',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '01:00',
                    __EMPTY_11: '00:02',
                    __EMPTY_12: '00:02',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'week'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-11 Вс',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position1',
                    __EMPTY_4: 'division1',
                    __EMPTY_5: '',
                    __EMPTY_6: '',
                    __EMPTY_7: '08:00',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '',
                    __EMPTY_11: '',
                    __EMPTY_12: '-08:00',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'week'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-12 Пн',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position1',
                    __EMPTY_4: 'division1',
                    __EMPTY_5: '',
                    __EMPTY_6: '',
                    __EMPTY_7: '',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '',
                    __EMPTY_11: '',
                    __EMPTY_12: '',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'week'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-13 Вт',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position1',
                    __EMPTY_4: 'division1',
                    __EMPTY_5: '',
                    __EMPTY_6: '',
                    __EMPTY_7: '06:00',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '',
                    __EMPTY_11: '',
                    __EMPTY_12: '-06:00',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'week'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-14 Ср',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position1',
                    __EMPTY_4: 'division1',
                    __EMPTY_5: '',
                    __EMPTY_6: '',
                    __EMPTY_7: '08:00',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '',
                    __EMPTY_11: '',
                    __EMPTY_12: '-08:00',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'week'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-15 Чт',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position1',
                    __EMPTY_4: 'division1',
                    __EMPTY_5: '',
                    __EMPTY_6: '',
                    __EMPTY_7: '08:00',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '',
                    __EMPTY_11: '',
                    __EMPTY_12: '-08:00',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'week'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-16 Пт',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position1',
                    __EMPTY_4: 'division1',
                    __EMPTY_5: '',
                    __EMPTY_6: '',
                    __EMPTY_7: '',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '',
                    __EMPTY_11: '',
                    __EMPTY_12: '',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'week'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-17 Сб',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position1',
                    __EMPTY_4: 'division1',
                    __EMPTY_5: '',
                    __EMPTY_6: '',
                    __EMPTY_7: '06:00',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '',
                    __EMPTY_11: '',
                    __EMPTY_12: '-06:00',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'week'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-18 Вс',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position1',
                    __EMPTY_4: 'division1',
                    __EMPTY_5: '',
                    __EMPTY_6: '',
                    __EMPTY_7: '08:00',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '',
                    __EMPTY_11: '',
                    __EMPTY_12: '-08:00',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'week'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-19 Пн',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position1',
                    __EMPTY_4: 'division1',
                    __EMPTY_5: '',
                    __EMPTY_6: '',
                    __EMPTY_7: '08:00',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '',
                    __EMPTY_11: '',
                    __EMPTY_12: '-08:00',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'week'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-20 Вт',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position1',
                    __EMPTY_4: 'division1',
                    __EMPTY_5: '',
                    __EMPTY_6: '',
                    __EMPTY_7: '08:00',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '',
                    __EMPTY_11: '',
                    __EMPTY_12: '-08:00',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'week'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-21 Ср',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position1',
                    __EMPTY_4: 'division1',
                    __EMPTY_5: '',
                    __EMPTY_6: '',
                    __EMPTY_7: '08:00',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '',
                    __EMPTY_11: '',
                    __EMPTY_12: '-08:00',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'week'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-22 Чт',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position1',
                    __EMPTY_4: 'division1',
                    __EMPTY_5: '',
                    __EMPTY_6: '',
                    __EMPTY_7: '08:00',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '',
                    __EMPTY_11: '',
                    __EMPTY_12: '-08:00',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'week'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-23 Пт',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position1',
                    __EMPTY_4: 'division1',
                    __EMPTY_5: '',
                    __EMPTY_6: '',
                    __EMPTY_7: '08:00',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '',
                    __EMPTY_11: '',
                    __EMPTY_12: '-08:00',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'week'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-24 Сб',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position1',
                    __EMPTY_4: 'division1',
                    __EMPTY_5: '',
                    __EMPTY_6: '',
                    __EMPTY_7: '08:00',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '',
                    __EMPTY_11: '',
                    __EMPTY_12: '-08:00',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'week'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-25 Вс',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position1',
                    __EMPTY_4: 'division1',
                    __EMPTY_5: '',
                    __EMPTY_6: '',
                    __EMPTY_7: '08:00',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '',
                    __EMPTY_11: '',
                    __EMPTY_12: '-08:00',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'week'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-26 Пн',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position1',
                    __EMPTY_4: 'division1',
                    __EMPTY_5: '',
                    __EMPTY_6: '',
                    __EMPTY_7: '08:00',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '',
                    __EMPTY_11: '',
                    __EMPTY_12: '-08:00',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'week'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-27 Вт',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position1',
                    __EMPTY_4: 'division1',
                    __EMPTY_5: '',
                    __EMPTY_6: '',
                    __EMPTY_7: '08:00',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '',
                    __EMPTY_11: '',
                    __EMPTY_12: '-08:00',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'week'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-28 Ср',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position1',
                    __EMPTY_4: 'division1',
                    __EMPTY_5: '',
                    __EMPTY_6: '',
                    __EMPTY_7: '08:00',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '',
                    __EMPTY_11: '',
                    __EMPTY_12: '-08:00',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'week'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-29 Чт',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position1',
                    __EMPTY_4: 'division1',
                    __EMPTY_5: '',
                    __EMPTY_6: '',
                    __EMPTY_7: '08:00',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '',
                    __EMPTY_11: '',
                    __EMPTY_12: '-08:00',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'week'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-30 Пт',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position1',
                    __EMPTY_4: 'division1',
                    __EMPTY_5: '',
                    __EMPTY_6: '',
                    __EMPTY_7: '08:00',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '',
                    __EMPTY_11: '',
                    __EMPTY_12: '-08:00',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'week'
                },
                {
                    'Отчет "Учет рабочего времени"': 'staff',
                    __EMPTY: 'name',
                    __EMPTY_1: '2',
                    __EMPTY_2: '2',
                    __EMPTY_3: 'position2',
                    __EMPTY_4: 'division2',
                    __EMPTY_5: '296:54',
                    __EMPTY_6: '215:56',
                    __EMPTY_7: '144:04',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '18:00',
                    __EMPTY_11: '00:02',
                    __EMPTY_12: '-144:06',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'shift'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-01 Чт',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position2',
                    __EMPTY_4: 'division2',
                    __EMPTY_5: '',
                    __EMPTY_6: '',
                    __EMPTY_7: '',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '',
                    __EMPTY_11: '',
                    __EMPTY_12: '',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'shift'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-02 Пт',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position2',
                    __EMPTY_4: 'division2',
                    __EMPTY_5: '33:00',
                    __EMPTY_6: '24:00',
                    __EMPTY_7: '',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '02:00',
                    __EMPTY_11: '',
                    __EMPTY_12: '',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'shift'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-03 Сб',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position2',
                    __EMPTY_4: 'division2',
                    __EMPTY_5: '',
                    __EMPTY_6: '',
                    __EMPTY_7: '',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '',
                    __EMPTY_11: '',
                    __EMPTY_12: '',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'shift'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-04 Вс',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position2',
                    __EMPTY_4: 'division2',
                    __EMPTY_5: '32:59',
                    __EMPTY_6: '24:00',
                    __EMPTY_7: '',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '02:00',
                    __EMPTY_11: '',
                    __EMPTY_12: '-00:01',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'shift'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-05 Пн',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position2',
                    __EMPTY_4: 'division2',
                    __EMPTY_5: '',
                    __EMPTY_6: '',
                    __EMPTY_7: '',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '',
                    __EMPTY_11: '',
                    __EMPTY_12: '',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'shift'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-06 Вт',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position2',
                    __EMPTY_4: 'division2',
                    __EMPTY_5: '32:58',
                    __EMPTY_6: '23:58',
                    __EMPTY_7: '00:02',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '02:00',
                    __EMPTY_11: '',
                    __EMPTY_12: '-00:02',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'shift'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-07 Ср',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position2',
                    __EMPTY_4: 'division2',
                    __EMPTY_5: '',
                    __EMPTY_6: '',
                    __EMPTY_7: '',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '',
                    __EMPTY_11: '',
                    __EMPTY_12: '',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'shift'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-08 Чт',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position2',
                    __EMPTY_4: 'division2',
                    __EMPTY_5: '32:59',
                    __EMPTY_6: '24:00',
                    __EMPTY_7: '',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '02:00',
                    __EMPTY_11: '',
                    __EMPTY_12: '-00:01',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'shift'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-09 Пт',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position2',
                    __EMPTY_4: 'division2',
                    __EMPTY_5: '',
                    __EMPTY_6: '',
                    __EMPTY_7: '',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '',
                    __EMPTY_11: '',
                    __EMPTY_12: '',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'shift'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-10 Сб',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position2',
                    __EMPTY_4: 'division2',
                    __EMPTY_5: '32:58',
                    __EMPTY_6: '23:58',
                    __EMPTY_7: '00:02',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '02:00',
                    __EMPTY_11: '',
                    __EMPTY_12: '-00:02',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'shift'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-11 Вс',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position2',
                    __EMPTY_4: 'division2',
                    __EMPTY_5: '',
                    __EMPTY_6: '',
                    __EMPTY_7: '',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '',
                    __EMPTY_11: '',
                    __EMPTY_12: '',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'shift'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-12 Пн',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position2',
                    __EMPTY_4: 'division2',
                    __EMPTY_5: '32:59',
                    __EMPTY_6: '24:00',
                    __EMPTY_7: '',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '02:00',
                    __EMPTY_11: '',
                    __EMPTY_12: '-00:01',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'shift'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-13 Вт',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position2',
                    __EMPTY_4: 'division2',
                    __EMPTY_5: '',
                    __EMPTY_6: '',
                    __EMPTY_7: '',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '',
                    __EMPTY_11: '',
                    __EMPTY_12: '',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'shift'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-14 Ср',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position2',
                    __EMPTY_4: 'division2',
                    __EMPTY_5: '32:58',
                    __EMPTY_6: '24:00',
                    __EMPTY_7: '',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '02:00',
                    __EMPTY_11: '',
                    __EMPTY_12: '-00:02',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'shift'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-15 Чт',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position2',
                    __EMPTY_4: 'division2',
                    __EMPTY_5: '',
                    __EMPTY_6: '',
                    __EMPTY_7: '',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '',
                    __EMPTY_11: '',
                    __EMPTY_12: '',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'shift'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-16 Пт',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position2',
                    __EMPTY_4: 'division2',
                    __EMPTY_5: '33:01',
                    __EMPTY_6: '24:00',
                    __EMPTY_7: '',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '02:00',
                    __EMPTY_11: '',
                    __EMPTY_12: '00:01',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'shift'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-17 Сб',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position2',
                    __EMPTY_4: 'division2',
                    __EMPTY_5: '',
                    __EMPTY_6: '',
                    __EMPTY_7: '',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '',
                    __EMPTY_11: '',
                    __EMPTY_12: '',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'shift'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-18 Вс',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position2',
                    __EMPTY_4: 'division2',
                    __EMPTY_5: '33:02',
                    __EMPTY_6: '24:00',
                    __EMPTY_7: '',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '02:00',
                    __EMPTY_11: '00:02',
                    __EMPTY_12: '00:02',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'shift'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-19 Пн',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position2',
                    __EMPTY_4: 'division2',
                    __EMPTY_5: '',
                    __EMPTY_6: '',
                    __EMPTY_7: '',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '',
                    __EMPTY_11: '',
                    __EMPTY_12: '',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'shift'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-20 Вт',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position2',
                    __EMPTY_4: 'division2',
                    __EMPTY_5: '',
                    __EMPTY_6: '',
                    __EMPTY_7: '24:00',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '',
                    __EMPTY_11: '',
                    __EMPTY_12: '-24:00',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'shift'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-21 Ср',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position2',
                    __EMPTY_4: 'division2',
                    __EMPTY_5: '',
                    __EMPTY_6: '',
                    __EMPTY_7: '',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '',
                    __EMPTY_11: '',
                    __EMPTY_12: '',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'shift'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-22 Чт',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position2',
                    __EMPTY_4: 'division2',
                    __EMPTY_5: '',
                    __EMPTY_6: '',
                    __EMPTY_7: '24:00',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '',
                    __EMPTY_11: '',
                    __EMPTY_12: '-24:00',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'shift'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-23 Пт',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position2',
                    __EMPTY_4: 'division2',
                    __EMPTY_5: '',
                    __EMPTY_6: '',
                    __EMPTY_7: '',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '',
                    __EMPTY_11: '',
                    __EMPTY_12: '',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'shift'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-24 Сб',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position2',
                    __EMPTY_4: 'division2',
                    __EMPTY_5: '',
                    __EMPTY_6: '',
                    __EMPTY_7: '24:00',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '',
                    __EMPTY_11: '',
                    __EMPTY_12: '-24:00',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'shift'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-25 Вс',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position2',
                    __EMPTY_4: 'division2',
                    __EMPTY_5: '',
                    __EMPTY_6: '',
                    __EMPTY_7: '',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '',
                    __EMPTY_11: '',
                    __EMPTY_12: '',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'shift'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-26 Пн',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position2',
                    __EMPTY_4: 'division2',
                    __EMPTY_5: '',
                    __EMPTY_6: '',
                    __EMPTY_7: '24:00',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '',
                    __EMPTY_11: '',
                    __EMPTY_12: '-24:00',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'shift'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-27 Вт',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position2',
                    __EMPTY_4: 'division2',
                    __EMPTY_5: '',
                    __EMPTY_6: '',
                    __EMPTY_7: '',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '',
                    __EMPTY_11: '',
                    __EMPTY_12: '',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'shift'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-28 Ср',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position2',
                    __EMPTY_4: 'division2',
                    __EMPTY_5: '',
                    __EMPTY_6: '',
                    __EMPTY_7: '24:00',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '',
                    __EMPTY_11: '',
                    __EMPTY_12: '-24:00',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'shift'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-29 Чт',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position2',
                    __EMPTY_4: 'division2',
                    __EMPTY_5: '',
                    __EMPTY_6: '',
                    __EMPTY_7: '',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '',
                    __EMPTY_11: '',
                    __EMPTY_12: '',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'shift'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-30 Пт',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position2',
                    __EMPTY_4: 'division2',
                    __EMPTY_5: '',
                    __EMPTY_6: '',
                    __EMPTY_7: '24:00',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '',
                    __EMPTY_11: '',
                    __EMPTY_12: '-24:00',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'shift'
                },
                {
                    'Отчет "Учет рабочего времени"': 'staff',
                    __EMPTY: 'name',
                    __EMPTY_1: '3',
                    __EMPTY_2: '3',
                    __EMPTY_3: 'position3',
                    __EMPTY_4: 'division3',
                    __EMPTY_5: '23:59',
                    __EMPTY_6: '23:59',
                    __EMPTY_7: '',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '01:00',
                    __EMPTY_11: '',
                    __EMPTY_12: '',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'attendance'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-01 Чт',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position3',
                    __EMPTY_4: 'division3',
                    __EMPTY_5: '23:59',
                    __EMPTY_6: '23:59',
                    __EMPTY_7: '',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '01:00',
                    __EMPTY_11: '',
                    __EMPTY_12: '',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'attendance'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-02 Пт',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position3',
                    __EMPTY_4: 'division3',
                    __EMPTY_5: '',
                    __EMPTY_6: '',
                    __EMPTY_7: '',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '',
                    __EMPTY_11: '',
                    __EMPTY_12: '',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'attendance'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-03 Сб',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position3',
                    __EMPTY_4: 'division3',
                    __EMPTY_5: '',
                    __EMPTY_6: '',
                    __EMPTY_7: '',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '',
                    __EMPTY_11: '',
                    __EMPTY_12: '',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'attendance'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-04 Вс',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position3',
                    __EMPTY_4: 'division3',
                    __EMPTY_5: '',
                    __EMPTY_6: '',
                    __EMPTY_7: '',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '',
                    __EMPTY_11: '',
                    __EMPTY_12: '',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'attendance'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-05 Пн',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position3',
                    __EMPTY_4: 'division3',
                    __EMPTY_5: '',
                    __EMPTY_6: '',
                    __EMPTY_7: '',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '',
                    __EMPTY_11: '',
                    __EMPTY_12: '',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'attendance'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-06 Вт',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position3',
                    __EMPTY_4: 'division3',
                    __EMPTY_5: '',
                    __EMPTY_6: '',
                    __EMPTY_7: '',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '',
                    __EMPTY_11: '',
                    __EMPTY_12: '',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'attendance'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-07 Ср',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position3',
                    __EMPTY_4: 'division3',
                    __EMPTY_5: '',
                    __EMPTY_6: '',
                    __EMPTY_7: '',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '',
                    __EMPTY_11: '',
                    __EMPTY_12: '',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'attendance'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-08 Чт',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position3',
                    __EMPTY_4: 'division3',
                    __EMPTY_5: '',
                    __EMPTY_6: '',
                    __EMPTY_7: '',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '',
                    __EMPTY_11: '',
                    __EMPTY_12: '',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'attendance'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-09 Пт',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position3',
                    __EMPTY_4: 'division3',
                    __EMPTY_5: '',
                    __EMPTY_6: '',
                    __EMPTY_7: '',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '',
                    __EMPTY_11: '',
                    __EMPTY_12: '',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'attendance'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-10 Сб',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position3',
                    __EMPTY_4: 'division3',
                    __EMPTY_5: '',
                    __EMPTY_6: '',
                    __EMPTY_7: '',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '',
                    __EMPTY_11: '',
                    __EMPTY_12: '',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'attendance'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-11 Вс',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position3',
                    __EMPTY_4: 'division3',
                    __EMPTY_5: '',
                    __EMPTY_6: '',
                    __EMPTY_7: '',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '',
                    __EMPTY_11: '',
                    __EMPTY_12: '',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'attendance'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-12 Пн',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position3',
                    __EMPTY_4: 'division3',
                    __EMPTY_5: '',
                    __EMPTY_6: '',
                    __EMPTY_7: '',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '',
                    __EMPTY_11: '',
                    __EMPTY_12: '',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'attendance'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-13 Вт',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position3',
                    __EMPTY_4: 'division3',
                    __EMPTY_5: '',
                    __EMPTY_6: '',
                    __EMPTY_7: '',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '',
                    __EMPTY_11: '',
                    __EMPTY_12: '',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'attendance'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-14 Ср',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position3',
                    __EMPTY_4: 'division3',
                    __EMPTY_5: '',
                    __EMPTY_6: '',
                    __EMPTY_7: '',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '',
                    __EMPTY_11: '',
                    __EMPTY_12: '',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'attendance'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-15 Чт',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position3',
                    __EMPTY_4: 'division3',
                    __EMPTY_5: '',
                    __EMPTY_6: '',
                    __EMPTY_7: '',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '',
                    __EMPTY_11: '',
                    __EMPTY_12: '',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'attendance'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-16 Пт',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position3',
                    __EMPTY_4: 'division3',
                    __EMPTY_5: '',
                    __EMPTY_6: '',
                    __EMPTY_7: '',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '',
                    __EMPTY_11: '',
                    __EMPTY_12: '',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'attendance'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-17 Сб',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position3',
                    __EMPTY_4: 'division3',
                    __EMPTY_5: '',
                    __EMPTY_6: '',
                    __EMPTY_7: '',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '',
                    __EMPTY_11: '',
                    __EMPTY_12: '',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'attendance'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-18 Вс',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position3',
                    __EMPTY_4: 'division3',
                    __EMPTY_5: '',
                    __EMPTY_6: '',
                    __EMPTY_7: '',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '',
                    __EMPTY_11: '',
                    __EMPTY_12: '',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'attendance'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-19 Пн',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position3',
                    __EMPTY_4: 'division3',
                    __EMPTY_5: '',
                    __EMPTY_6: '',
                    __EMPTY_7: '',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '',
                    __EMPTY_11: '',
                    __EMPTY_12: '',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'attendance'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-20 Вт',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position3',
                    __EMPTY_4: 'division3',
                    __EMPTY_5: '',
                    __EMPTY_6: '',
                    __EMPTY_7: '',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '',
                    __EMPTY_11: '',
                    __EMPTY_12: '',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'attendance'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-21 Ср',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position3',
                    __EMPTY_4: 'division3',
                    __EMPTY_5: '',
                    __EMPTY_6: '',
                    __EMPTY_7: '',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '',
                    __EMPTY_11: '',
                    __EMPTY_12: '',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'attendance'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-22 Чт',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position3',
                    __EMPTY_4: 'division3',
                    __EMPTY_5: '',
                    __EMPTY_6: '',
                    __EMPTY_7: '',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '',
                    __EMPTY_11: '',
                    __EMPTY_12: '',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'attendance'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-23 Пт',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position3',
                    __EMPTY_4: 'division3',
                    __EMPTY_5: '',
                    __EMPTY_6: '',
                    __EMPTY_7: '',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '',
                    __EMPTY_11: '',
                    __EMPTY_12: '',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'attendance'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-24 Сб',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position3',
                    __EMPTY_4: 'division3',
                    __EMPTY_5: '',
                    __EMPTY_6: '',
                    __EMPTY_7: '',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '',
                    __EMPTY_11: '',
                    __EMPTY_12: '',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'attendance'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-25 Вс',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position3',
                    __EMPTY_4: 'division3',
                    __EMPTY_5: '',
                    __EMPTY_6: '',
                    __EMPTY_7: '',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '',
                    __EMPTY_11: '',
                    __EMPTY_12: '',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'attendance'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-26 Пн',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position3',
                    __EMPTY_4: 'division3',
                    __EMPTY_5: '',
                    __EMPTY_6: '',
                    __EMPTY_7: '',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '',
                    __EMPTY_11: '',
                    __EMPTY_12: '',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'attendance'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-27 Вт',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position3',
                    __EMPTY_4: 'division3',
                    __EMPTY_5: '',
                    __EMPTY_6: '',
                    __EMPTY_7: '',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '',
                    __EMPTY_11: '',
                    __EMPTY_12: '',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'attendance'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-28 Ср',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position3',
                    __EMPTY_4: 'division3',
                    __EMPTY_5: '',
                    __EMPTY_6: '',
                    __EMPTY_7: '',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '',
                    __EMPTY_11: '',
                    __EMPTY_12: '',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'attendance'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-29 Чт',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position3',
                    __EMPTY_4: 'division3',
                    __EMPTY_5: '',
                    __EMPTY_6: '',
                    __EMPTY_7: '',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '',
                    __EMPTY_11: '',
                    __EMPTY_12: '',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'attendance'
                },
                {
                'Отчет "Учет рабочего времени"': '2023-06-30 Пт',
                __EMPTY: '',
                __EMPTY_1: '',
                __EMPTY_2: '',
                __EMPTY_3: 'position3',
                __EMPTY_4: 'division3',
                __EMPTY_5: '',
                __EMPTY_6: '',
                __EMPTY_7: '',
                __EMPTY_8: '',
                __EMPTY_9: '',
                __EMPTY_10: '',
                __EMPTY_11: '',
                __EMPTY_12: '',
                __EMPTY_13: '',
                __EMPTY_14: '',
                __EMPTY_15: 'attendance'
            },
                {
                    'Отчет "Учет рабочего времени"': 'staff',
                    __EMPTY: 'name',
                    __EMPTY_1: '4',
                    __EMPTY_2: '4',
                    __EMPTY_3: 'position4',
                    __EMPTY_4: 'division4',
                    __EMPTY_5: '94:52',
                    __EMPTY_6: '87:52',
                    __EMPTY_7: '132:08',
                    __EMPTY_8: '00:08',
                    __EMPTY_9: '',
                    __EMPTY_10: '11:00',
                    __EMPTY_11: '00:02',
                    __EMPTY_12: '-00:08',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'violation'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-01 Чт',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position4',
                    __EMPTY_4: 'division4',
                    __EMPTY_5: '08:00',
                    __EMPTY_6: '08:00',
                    __EMPTY_7: '',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '01:00',
                    __EMPTY_11: '',
                    __EMPTY_12: '',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'violation'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-02 Пт',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position4',
                    __EMPTY_4: 'division4',
                    __EMPTY_5: '09:00',
                    __EMPTY_6: '08:00',
                    __EMPTY_7: '',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '01:00',
                    __EMPTY_11: '',
                    __EMPTY_12: '',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'violation'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-03 Сб',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position4',
                    __EMPTY_4: 'division4',
                    __EMPTY_5: '08:59',
                    __EMPTY_6: '08:00',
                    __EMPTY_7: '',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '01:00',
                    __EMPTY_11: '',
                    __EMPTY_12: '-00:01',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'violation'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-04 Вс',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position4',
                    __EMPTY_4: 'division4',
                    __EMPTY_5: '08:58',
                    __EMPTY_6: '07:58',
                    __EMPTY_7: '00:02',
                    __EMPTY_8: '00:02',
                    __EMPTY_9: '',
                    __EMPTY_10: '01:00',
                    __EMPTY_11: '',
                    __EMPTY_12: '-00:02',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'violation'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-05 Пн',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position4',
                    __EMPTY_4: 'division4',
                    __EMPTY_5: '08:59',
                    __EMPTY_6: '08:00',
                    __EMPTY_7: '',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '01:00',
                    __EMPTY_11: '',
                    __EMPTY_12: '-00:01',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'violation'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-06 Вт',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position4',
                    __EMPTY_4: 'division4',
                    __EMPTY_5: '08:58',
                    __EMPTY_6: '07:58',
                    __EMPTY_7: '00:02',
                    __EMPTY_8: '00:02',
                    __EMPTY_9: '',
                    __EMPTY_10: '01:00',
                    __EMPTY_11: '',
                    __EMPTY_12: '-00:02',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'violation'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-07 Ср',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position4',
                    __EMPTY_4: 'division4',
                    __EMPTY_5: '07:59',
                    __EMPTY_6: '08:00',
                    __EMPTY_7: '',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '01:00',
                    __EMPTY_11: '',
                    __EMPTY_12: '-00:01',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'violation'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-08 Чт',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position4',
                    __EMPTY_4: 'division4',
                    __EMPTY_5: '07:58',
                    __EMPTY_6: '07:58',
                    __EMPTY_7: '00:02',
                    __EMPTY_8: '00:02',
                    __EMPTY_9: '',
                    __EMPTY_10: '01:00',
                    __EMPTY_11: '',
                    __EMPTY_12: '-00:02',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'violation'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-09 Пт',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position4',
                    __EMPTY_4: 'division4',
                    __EMPTY_5: '07:58',
                    __EMPTY_6: '07:58',
                    __EMPTY_7: '00:02',
                    __EMPTY_8: '00:02',
                    __EMPTY_9: '',
                    __EMPTY_10: '01:00',
                    __EMPTY_11: '',
                    __EMPTY_12: '-00:02',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'violation'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-10 Сб',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position4',
                    __EMPTY_4: 'division4',
                    __EMPTY_5: '09:01',
                    __EMPTY_6: '08:00',
                    __EMPTY_7: '',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '01:00',
                    __EMPTY_11: '',
                    __EMPTY_12: '00:01',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'violation'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-11 Вс',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position4',
                    __EMPTY_4: 'division4',
                    __EMPTY_5: '09:02',
                    __EMPTY_6: '08:00',
                    __EMPTY_7: '',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '01:00',
                    __EMPTY_11: '00:02',
                    __EMPTY_12: '00:02',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'violation'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-12 Пн',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position4',
                    __EMPTY_4: 'division4',
                    __EMPTY_5: '',
                    __EMPTY_6: '',
                    __EMPTY_7: '',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '',
                    __EMPTY_11: '',
                    __EMPTY_12: '',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'violation'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-13 Вт',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position4',
                    __EMPTY_4: 'division4',
                    __EMPTY_5: '',
                    __EMPTY_6: '',
                    __EMPTY_7: '06:00',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '',
                    __EMPTY_11: '',
                    __EMPTY_12: '',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'violation'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-14 Ср',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position4',
                    __EMPTY_4: 'division4',
                    __EMPTY_5: '',
                    __EMPTY_6: '',
                    __EMPTY_7: '08:00',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '',
                    __EMPTY_11: '',
                    __EMPTY_12: '',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'violation'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-15 Чт',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position4',
                    __EMPTY_4: 'division4',
                    __EMPTY_5: '',
                    __EMPTY_6: '',
                    __EMPTY_7: '08:00',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '',
                    __EMPTY_11: '',
                    __EMPTY_12: '',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'violation'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-16 Пт',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position4',
                    __EMPTY_4: 'division4',
                    __EMPTY_5: '',
                    __EMPTY_6: '',
                    __EMPTY_7: '',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '',
                    __EMPTY_11: '',
                    __EMPTY_12: '',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'violation'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-17 Сб',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position4',
                    __EMPTY_4: 'division4',
                    __EMPTY_5: '',
                    __EMPTY_6: '',
                    __EMPTY_7: '06:00',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '',
                    __EMPTY_11: '',
                    __EMPTY_12: '',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'violation'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-18 Вс',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position4',
                    __EMPTY_4: 'division4',
                    __EMPTY_5: '',
                    __EMPTY_6: '',
                    __EMPTY_7: '08:00',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '',
                    __EMPTY_11: '',
                    __EMPTY_12: '',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'violation'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-19 Пн',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position4',
                    __EMPTY_4: 'division4',
                    __EMPTY_5: '',
                    __EMPTY_6: '',
                    __EMPTY_7: '08:00',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '',
                    __EMPTY_11: '',
                    __EMPTY_12: '',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'violation'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-20 Вт',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position4',
                    __EMPTY_4: 'division4',
                    __EMPTY_5: '',
                    __EMPTY_6: '',
                    __EMPTY_7: '08:00',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '',
                    __EMPTY_11: '',
                    __EMPTY_12: '',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'violation'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-21 Ср',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position4',
                    __EMPTY_4: 'division4',
                    __EMPTY_5: '',
                    __EMPTY_6: '',
                    __EMPTY_7: '08:00',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '',
                    __EMPTY_11: '',
                    __EMPTY_12: '',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'violation'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-22 Чт',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position4',
                    __EMPTY_4: 'division4',
                    __EMPTY_5: '',
                    __EMPTY_6: '',
                    __EMPTY_7: '08:00',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '',
                    __EMPTY_11: '',
                    __EMPTY_12: '',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'violation'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-23 Пт',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position4',
                    __EMPTY_4: 'division4',
                    __EMPTY_5: '',
                    __EMPTY_6: '',
                    __EMPTY_7: '08:00',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '',
                    __EMPTY_11: '',
                    __EMPTY_12: '',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'violation'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-24 Сб',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position4',
                    __EMPTY_4: 'division4',
                    __EMPTY_5: '',
                    __EMPTY_6: '',
                    __EMPTY_7: '08:00',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '',
                    __EMPTY_11: '',
                    __EMPTY_12: '',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'violation'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-25 Вс',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position4',
                    __EMPTY_4: 'division4',
                    __EMPTY_5: '',
                    __EMPTY_6: '',
                    __EMPTY_7: '08:00',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '',
                    __EMPTY_11: '',
                    __EMPTY_12: '',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'violation'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-26 Пн',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position4',
                    __EMPTY_4: 'division4',
                    __EMPTY_5: '',
                    __EMPTY_6: '',
                    __EMPTY_7: '08:00',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '',
                    __EMPTY_11: '',
                    __EMPTY_12: '',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'violation'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-27 Вт',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position4',
                    __EMPTY_4: 'division4',
                    __EMPTY_5: '',
                    __EMPTY_6: '',
                    __EMPTY_7: '08:00',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '',
                    __EMPTY_11: '',
                    __EMPTY_12: '',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'violation'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-28 Ср',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position4',
                    __EMPTY_4: 'division4',
                    __EMPTY_5: '',
                    __EMPTY_6: '',
                    __EMPTY_7: '08:00',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '',
                    __EMPTY_11: '',
                    __EMPTY_12: '',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'violation'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-29 Чт',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position4',
                    __EMPTY_4: 'division4',
                    __EMPTY_5: '',
                    __EMPTY_6: '',
                    __EMPTY_7: '08:00',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '',
                    __EMPTY_11: '',
                    __EMPTY_12: '',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'violation'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-30 Пт',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position4',
                    __EMPTY_4: 'division4',
                    __EMPTY_5: '',
                    __EMPTY_6: '',
                    __EMPTY_7: '08:00',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '',
                    __EMPTY_11: '',
                    __EMPTY_12: '',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'violation'
                },
                {
                    'Отчет "Учет рабочего времени"': 'staff',
                    __EMPTY: 'name',
                    __EMPTY_1: '5',
                    __EMPTY_2: '5',
                    __EMPTY_3: 'position5',
                    __EMPTY_4: 'division5',
                    __EMPTY_5: '68:54',
                    __EMPTY_6: '63:52',
                    __EMPTY_7: '156:08',
                    __EMPTY_8: '00:07',
                    __EMPTY_9: '00:06',
                    __EMPTY_10: '08:00',
                    __EMPTY_11: '00:02',
                    __EMPTY_12: '-00:07',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'balance'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-01 Чт',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position5',
                    __EMPTY_4: 'division5',
                    __EMPTY_5: '08:00',
                    __EMPTY_6: '08:00',
                    __EMPTY_7: '',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '01:00',
                    __EMPTY_11: '',
                    __EMPTY_12: '',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'balance'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-02 Пт',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position5',
                    __EMPTY_4: 'division5',
                    __EMPTY_5: '09:02',
                    __EMPTY_6: '08:00',
                    __EMPTY_7: '',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '01:00',
                    __EMPTY_11: '00:02',
                    __EMPTY_12: '00:01',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'balance'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-03 Сб',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position5',
                    __EMPTY_4: 'division5',
                    __EMPTY_5: '08:59',
                    __EMPTY_6: '07:59',
                    __EMPTY_7: '00:01',
                    __EMPTY_8: '00:00 (00:01)',
                    __EMPTY_9: '00:01',
                    __EMPTY_10: '01:00',
                    __EMPTY_11: '',
                    __EMPTY_12: '',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'balance'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-04 Вс',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position5',
                    __EMPTY_4: 'division5',
                    __EMPTY_5: '08:58',
                    __EMPTY_6: '07:58',
                    __EMPTY_7: '00:02',
                    __EMPTY_8: '00:02',
                    __EMPTY_9: '00:02',
                    __EMPTY_10: '01:00',
                    __EMPTY_11: '',
                    __EMPTY_12: '-00:02',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'balance'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-05 Пн',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position5',
                    __EMPTY_4: 'division5',
                    __EMPTY_5: '08:59',
                    __EMPTY_6: '07:59',
                    __EMPTY_7: '00:01',
                    __EMPTY_8: '00:01',
                    __EMPTY_9: '00:01',
                    __EMPTY_10: '01:00',
                    __EMPTY_11: '',
                    __EMPTY_12: '-00:01',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'balance'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-06 Вт',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position5',
                    __EMPTY_4: 'division5',
                    __EMPTY_5: '08:58',
                    __EMPTY_6: '07:58',
                    __EMPTY_7: '00:02',
                    __EMPTY_8: '00:02',
                    __EMPTY_9: '00:02',
                    __EMPTY_10: '01:00',
                    __EMPTY_11: '',
                    __EMPTY_12: '-00:02',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'balance'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-07 Ср',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position5',
                    __EMPTY_4: 'division5',
                    __EMPTY_5: '07:59',
                    __EMPTY_6: '07:59',
                    __EMPTY_7: '00:01',
                    __EMPTY_8: '00:01',
                    __EMPTY_9: '',
                    __EMPTY_10: '01:00',
                    __EMPTY_11: '',
                    __EMPTY_12: '-00:01',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'balance'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-08 Чт',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position5',
                    __EMPTY_4: 'division5',
                    __EMPTY_5: '07:59',
                    __EMPTY_6: '07:59',
                    __EMPTY_7: '00:01',
                    __EMPTY_8: '00:01',
                    __EMPTY_9: '',
                    __EMPTY_10: '01:00',
                    __EMPTY_11: '',
                    __EMPTY_12: '-00:01',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'balance'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-09 Пт',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position5',
                    __EMPTY_4: 'division5',
                    __EMPTY_5: '',
                    __EMPTY_6: '',
                    __EMPTY_7: '08:00',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '',
                    __EMPTY_11: '',
                    __EMPTY_12: '',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'balance'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-10 Сб',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position5',
                    __EMPTY_4: 'division5',
                    __EMPTY_5: '',
                    __EMPTY_6: '',
                    __EMPTY_7: '08:00',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '',
                    __EMPTY_11: '',
                    __EMPTY_12: '',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'balance'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-11 Вс',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position5',
                    __EMPTY_4: 'division5',
                    __EMPTY_5: '',
                    __EMPTY_6: '',
                    __EMPTY_7: '08:00',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '',
                    __EMPTY_11: '',
                    __EMPTY_12: '',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'balance'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-12 Пн',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position5',
                    __EMPTY_4: 'division5',
                    __EMPTY_5: '',
                    __EMPTY_6: '',
                    __EMPTY_7: '',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '',
                    __EMPTY_11: '',
                    __EMPTY_12: '',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'balance'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-13 Вт',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position5',
                    __EMPTY_4: 'division5',
                    __EMPTY_5: '',
                    __EMPTY_6: '',
                    __EMPTY_7: '06:00',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '',
                    __EMPTY_11: '',
                    __EMPTY_12: '',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'balance'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-14 Ср',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position5',
                    __EMPTY_4: 'division5',
                    __EMPTY_5: '',
                    __EMPTY_6: '',
                    __EMPTY_7: '08:00',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '',
                    __EMPTY_11: '',
                    __EMPTY_12: '',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'balance'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-15 Чт',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position5',
                    __EMPTY_4: 'division5',
                    __EMPTY_5: '',
                    __EMPTY_6: '',
                    __EMPTY_7: '08:00',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '',
                    __EMPTY_11: '',
                    __EMPTY_12: '',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'balance'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-16 Пт',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position5',
                    __EMPTY_4: 'division5',
                    __EMPTY_5: '',
                    __EMPTY_6: '',
                    __EMPTY_7: '',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '',
                    __EMPTY_11: '',
                    __EMPTY_12: '',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'balance'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-17 Сб',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position5',
                    __EMPTY_4: 'division5',
                    __EMPTY_5: '',
                    __EMPTY_6: '',
                    __EMPTY_7: '06:00',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '',
                    __EMPTY_11: '',
                    __EMPTY_12: '',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'balance'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-18 Вс',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position5',
                    __EMPTY_4: 'division5',
                    __EMPTY_5: '',
                    __EMPTY_6: '',
                    __EMPTY_7: '08:00',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '',
                    __EMPTY_11: '',
                    __EMPTY_12: '',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'balance'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-19 Пн',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position5',
                    __EMPTY_4: 'division5',
                    __EMPTY_5: '',
                    __EMPTY_6: '',
                    __EMPTY_7: '08:00',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '',
                    __EMPTY_11: '',
                    __EMPTY_12: '',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'balance'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-20 Вт',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position5',
                    __EMPTY_4: 'division5',
                    __EMPTY_5: '',
                    __EMPTY_6: '',
                    __EMPTY_7: '08:00',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '',
                    __EMPTY_11: '',
                    __EMPTY_12: '',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'balance'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-21 Ср',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position5',
                    __EMPTY_4: 'division5',
                    __EMPTY_5: '',
                    __EMPTY_6: '',
                    __EMPTY_7: '08:00',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '',
                    __EMPTY_11: '',
                    __EMPTY_12: '',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'balance'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-22 Чт',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position5',
                    __EMPTY_4: 'division5',
                    __EMPTY_5: '',
                    __EMPTY_6: '',
                    __EMPTY_7: '08:00',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '',
                    __EMPTY_11: '',
                    __EMPTY_12: '',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'balance'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-23 Пт',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position5',
                    __EMPTY_4: 'division5',
                    __EMPTY_5: '',
                    __EMPTY_6: '',
                    __EMPTY_7: '08:00',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '',
                    __EMPTY_11: '',
                    __EMPTY_12: '',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'balance'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-24 Сб',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position5',
                    __EMPTY_4: 'division5',
                    __EMPTY_5: '',
                    __EMPTY_6: '',
                    __EMPTY_7: '08:00',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '',
                    __EMPTY_11: '',
                    __EMPTY_12: '',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'balance'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-25 Вс',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position5',
                    __EMPTY_4: 'division5',
                    __EMPTY_5: '',
                    __EMPTY_6: '',
                    __EMPTY_7: '08:00',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '',
                    __EMPTY_11: '',
                    __EMPTY_12: '',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'balance'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-26 Пн',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position5',
                    __EMPTY_4: 'division5',
                    __EMPTY_5: '',
                    __EMPTY_6: '',
                    __EMPTY_7: '08:00',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '',
                    __EMPTY_11: '',
                    __EMPTY_12: '',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'balance'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-27 Вт',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position5',
                    __EMPTY_4: 'division5',
                    __EMPTY_5: '',
                    __EMPTY_6: '',
                    __EMPTY_7: '08:00',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '',
                    __EMPTY_11: '',
                    __EMPTY_12: '',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'balance'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-28 Ср',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position5',
                    __EMPTY_4: 'division5',
                    __EMPTY_5: '',
                    __EMPTY_6: '',
                    __EMPTY_7: '08:00',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '',
                    __EMPTY_11: '',
                    __EMPTY_12: '',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'balance'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-29 Чт',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position5',
                    __EMPTY_4: 'division5',
                    __EMPTY_5: '',
                    __EMPTY_6: '',
                    __EMPTY_7: '08:00',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '',
                    __EMPTY_11: '',
                    __EMPTY_12: '',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'balance'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-30 Пт',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position5',
                    __EMPTY_4: 'division5',
                    __EMPTY_5: '',
                    __EMPTY_6: '',
                    __EMPTY_7: '08:00',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '',
                    __EMPTY_11: '',
                    __EMPTY_12: '',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'balance'
                },
                {
                    'Отчет "Учет рабочего времени"': 'staff',
                    __EMPTY: 'name',
                    __EMPTY_1: '6',
                    __EMPTY_2: '6',
                    __EMPTY_3: 'position6',
                    __EMPTY_4: 'division6',
                    __EMPTY_5: '09:00',
                    __EMPTY_6: '08:00',
                    __EMPTY_7: '232:00',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '01:00',
                    __EMPTY_11: '',
                    __EMPTY_12: '-232:00',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'week_2'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-01 Чт',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position6',
                    __EMPTY_4: 'division6',
                    __EMPTY_5: '09:00',
                    __EMPTY_6: '08:00',
                    __EMPTY_7: '',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '01:00',
                    __EMPTY_11: '',
                    __EMPTY_12: '',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'week_2'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-02 Пт',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position6',
                    __EMPTY_4: 'division6',
                    __EMPTY_5: '',
                    __EMPTY_6: '',
                    __EMPTY_7: '08:00',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '',
                    __EMPTY_11: '',
                    __EMPTY_12: '-08:00',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'week_2'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-03 Сб',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position6',
                    __EMPTY_4: 'division6',
                    __EMPTY_5: '',
                    __EMPTY_6: '',
                    __EMPTY_7: '08:00',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '',
                    __EMPTY_11: '',
                    __EMPTY_12: '-08:00',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'week_2'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-04 Вс',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position6',
                    __EMPTY_4: 'division6',
                    __EMPTY_5: '',
                    __EMPTY_6: '',
                    __EMPTY_7: '08:00',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '',
                    __EMPTY_11: '',
                    __EMPTY_12: '-08:00',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'week_2'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-05 Пн',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position6',
                    __EMPTY_4: 'division6',
                    __EMPTY_5: '',
                    __EMPTY_6: '',
                    __EMPTY_7: '08:00',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '',
                    __EMPTY_11: '',
                    __EMPTY_12: '-08:00',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'week_2'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-06 Вт',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position6',
                    __EMPTY_4: 'division6',
                    __EMPTY_5: '',
                    __EMPTY_6: '',
                    __EMPTY_7: '08:00',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '',
                    __EMPTY_11: '',
                    __EMPTY_12: '-08:00',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'week_2'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-07 Ср',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position6',
                    __EMPTY_4: 'division6',
                    __EMPTY_5: '',
                    __EMPTY_6: '',
                    __EMPTY_7: '08:00',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '',
                    __EMPTY_11: '',
                    __EMPTY_12: '-08:00',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'week_2'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-08 Чт',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position6',
                    __EMPTY_4: 'division6',
                    __EMPTY_5: '',
                    __EMPTY_6: '',
                    __EMPTY_7: '08:00',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '',
                    __EMPTY_11: '',
                    __EMPTY_12: '-08:00',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'week_2'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-09 Пт',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position6',
                    __EMPTY_4: 'division6',
                    __EMPTY_5: '',
                    __EMPTY_6: '',
                    __EMPTY_7: '08:00',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '',
                    __EMPTY_11: '',
                    __EMPTY_12: '-08:00',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'week_2'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-10 Сб',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position6',
                    __EMPTY_4: 'division6',
                    __EMPTY_5: '',
                    __EMPTY_6: '',
                    __EMPTY_7: '08:00',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '',
                    __EMPTY_11: '',
                    __EMPTY_12: '-08:00',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'week_2'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-11 Вс',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position6',
                    __EMPTY_4: 'division6',
                    __EMPTY_5: '',
                    __EMPTY_6: '',
                    __EMPTY_7: '08:00',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '',
                    __EMPTY_11: '',
                    __EMPTY_12: '-08:00',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'week_2'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-12 Пн',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position6',
                    __EMPTY_4: 'division6',
                    __EMPTY_5: '',
                    __EMPTY_6: '',
                    __EMPTY_7: '08:00',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '',
                    __EMPTY_11: '',
                    __EMPTY_12: '-08:00',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'week_2'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-13 Вт',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position6',
                    __EMPTY_4: 'division6',
                    __EMPTY_5: '',
                    __EMPTY_6: '',
                    __EMPTY_7: '08:00',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '',
                    __EMPTY_11: '',
                    __EMPTY_12: '-08:00',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'week_2'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-14 Ср',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position6',
                    __EMPTY_4: 'division6',
                    __EMPTY_5: '',
                    __EMPTY_6: '',
                    __EMPTY_7: '08:00',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '',
                    __EMPTY_11: '',
                    __EMPTY_12: '-08:00',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'week_2'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-15 Чт',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position6',
                    __EMPTY_4: 'division6',
                    __EMPTY_5: '',
                    __EMPTY_6: '',
                    __EMPTY_7: '08:00',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '',
                    __EMPTY_11: '',
                    __EMPTY_12: '-08:00',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'week_2'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-16 Пт',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position6',
                    __EMPTY_4: 'division6',
                    __EMPTY_5: '',
                    __EMPTY_6: '',
                    __EMPTY_7: '08:00',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '',
                    __EMPTY_11: '',
                    __EMPTY_12: '-08:00',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'week_2'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-17 Сб',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position6',
                    __EMPTY_4: 'division6',
                    __EMPTY_5: '',
                    __EMPTY_6: '',
                    __EMPTY_7: '08:00',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '',
                    __EMPTY_11: '',
                    __EMPTY_12: '-08:00',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'week_2'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-18 Вс',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position6',
                    __EMPTY_4: 'division6',
                    __EMPTY_5: '',
                    __EMPTY_6: '',
                    __EMPTY_7: '08:00',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '',
                    __EMPTY_11: '',
                    __EMPTY_12: '-08:00',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'week_2'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-19 Пн',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position6',
                    __EMPTY_4: 'division6',
                    __EMPTY_5: '',
                    __EMPTY_6: '',
                    __EMPTY_7: '08:00',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '',
                    __EMPTY_11: '',
                    __EMPTY_12: '-08:00',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'week_2'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-20 Вт',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position6',
                    __EMPTY_4: 'division6',
                    __EMPTY_5: '',
                    __EMPTY_6: '',
                    __EMPTY_7: '08:00',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '',
                    __EMPTY_11: '',
                    __EMPTY_12: '-08:00',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'week_2'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-21 Ср',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position6',
                    __EMPTY_4: 'division6',
                    __EMPTY_5: '',
                    __EMPTY_6: '',
                    __EMPTY_7: '08:00',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '',
                    __EMPTY_11: '',
                    __EMPTY_12: '-08:00',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'week_2'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-22 Чт',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position6',
                    __EMPTY_4: 'division6',
                    __EMPTY_5: '',
                    __EMPTY_6: '',
                    __EMPTY_7: '08:00',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '',
                    __EMPTY_11: '',
                    __EMPTY_12: '-08:00',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'week_2'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-23 Пт',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position6',
                    __EMPTY_4: 'division6',
                    __EMPTY_5: '',
                    __EMPTY_6: '',
                    __EMPTY_7: '08:00',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '',
                    __EMPTY_11: '',
                    __EMPTY_12: '-08:00',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'week_2'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-24 Сб',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position6',
                    __EMPTY_4: 'division6',
                    __EMPTY_5: '',
                    __EMPTY_6: '',
                    __EMPTY_7: '08:00',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '',
                    __EMPTY_11: '',
                    __EMPTY_12: '-08:00',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'week_2'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-25 Вс',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position6',
                    __EMPTY_4: 'division6',
                    __EMPTY_5: '',
                    __EMPTY_6: '',
                    __EMPTY_7: '08:00',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '',
                    __EMPTY_11: '',
                    __EMPTY_12: '-08:00',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'week_2'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-26 Пн',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position6',
                    __EMPTY_4: 'division6',
                    __EMPTY_5: '',
                    __EMPTY_6: '',
                    __EMPTY_7: '08:00',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '',
                    __EMPTY_11: '',
                    __EMPTY_12: '-08:00',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'week_2'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-27 Вт',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position6',
                    __EMPTY_4: 'division6',
                    __EMPTY_5: '',
                    __EMPTY_6: '',
                    __EMPTY_7: '08:00',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '',
                    __EMPTY_11: '',
                    __EMPTY_12: '-08:00',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'week_2'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-28 Ср',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position6',
                    __EMPTY_4: 'division6',
                    __EMPTY_5: '',
                    __EMPTY_6: '',
                    __EMPTY_7: '08:00',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '',
                    __EMPTY_11: '',
                    __EMPTY_12: '-08:00',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'week_2'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-29 Чт',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position6',
                    __EMPTY_4: 'division6',
                    __EMPTY_5: '',
                    __EMPTY_6: '',
                    __EMPTY_7: '08:00',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '',
                    __EMPTY_11: '',
                    __EMPTY_12: '-08:00',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'week_2'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-30 Пт',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position6',
                    __EMPTY_4: 'division6',
                    __EMPTY_5: '',
                    __EMPTY_6: '',
                    __EMPTY_7: '08:00',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '',
                    __EMPTY_11: '',
                    __EMPTY_12: '-08:00',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'week_2'
                },
                {
                    'Отчет "Учет рабочего времени"': 'staff',
                    __EMPTY: 'name',
                    __EMPTY_1: '7',
                    __EMPTY_2: '7',
                    __EMPTY_3: 'position7',
                    __EMPTY_4: 'division7',
                    __EMPTY_5: '24:00',
                    __EMPTY_6: '15:00',
                    __EMPTY_7: '336:00',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '01:00',
                    __EMPTY_11: '',
                    __EMPTY_12: '-336:00',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'shift_2'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-01 Чт',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position7',
                    __EMPTY_4: 'division7',
                    __EMPTY_5: '',
                    __EMPTY_6: '',
                    __EMPTY_7: '',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '',
                    __EMPTY_11: '',
                    __EMPTY_12: '',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'shift_2'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-02 Пт',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position7',
                    __EMPTY_4: 'division7',
                    __EMPTY_5: '24:00',
                    __EMPTY_6: '15:00',
                    __EMPTY_7: '',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '01:00',
                    __EMPTY_11: '',
                    __EMPTY_12: '',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'shift_2'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-03 Сб',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position7',
                    __EMPTY_4: 'division7',
                    __EMPTY_5: '',
                    __EMPTY_6: '',
                    __EMPTY_7: '',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '',
                    __EMPTY_11: '',
                    __EMPTY_12: '',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'shift_2'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-04 Вс',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position7',
                    __EMPTY_4: 'division7',
                    __EMPTY_5: '',
                    __EMPTY_6: '',
                    __EMPTY_7: '24:00',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '',
                    __EMPTY_11: '',
                    __EMPTY_12: '-24:00',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'shift_2'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-05 Пн',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position7',
                    __EMPTY_4: 'division7',
                    __EMPTY_5: '',
                    __EMPTY_6: '',
                    __EMPTY_7: '',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '',
                    __EMPTY_11: '',
                    __EMPTY_12: '',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'shift_2'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-06 Вт',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position7',
                    __EMPTY_4: 'division7',
                    __EMPTY_5: '',
                    __EMPTY_6: '',
                    __EMPTY_7: '24:00',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '',
                    __EMPTY_11: '',
                    __EMPTY_12: '-24:00',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'shift_2'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-07 Ср',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position7',
                    __EMPTY_4: 'division7',
                    __EMPTY_5: '',
                    __EMPTY_6: '',
                    __EMPTY_7: '',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '',
                    __EMPTY_11: '',
                    __EMPTY_12: '',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'shift_2'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-08 Чт',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position7',
                    __EMPTY_4: 'division7',
                    __EMPTY_5: '',
                    __EMPTY_6: '',
                    __EMPTY_7: '24:00',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '',
                    __EMPTY_11: '',
                    __EMPTY_12: '-24:00',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'shift_2'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-09 Пт',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position7',
                    __EMPTY_4: 'division7',
                    __EMPTY_5: '',
                    __EMPTY_6: '',
                    __EMPTY_7: '',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '',
                    __EMPTY_11: '',
                    __EMPTY_12: '',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'shift_2'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-10 Сб',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position7',
                    __EMPTY_4: 'division7',
                    __EMPTY_5: '',
                    __EMPTY_6: '',
                    __EMPTY_7: '24:00',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '',
                    __EMPTY_11: '',
                    __EMPTY_12: '-24:00',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'shift_2'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-11 Вс',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position7',
                    __EMPTY_4: 'division7',
                    __EMPTY_5: '',
                    __EMPTY_6: '',
                    __EMPTY_7: '',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '',
                    __EMPTY_11: '',
                    __EMPTY_12: '',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'shift_2'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-12 Пн',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position7',
                    __EMPTY_4: 'division7',
                    __EMPTY_5: '',
                    __EMPTY_6: '',
                    __EMPTY_7: '24:00',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '',
                    __EMPTY_11: '',
                    __EMPTY_12: '-24:00',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'shift_2'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-13 Вт',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position7',
                    __EMPTY_4: 'division7',
                    __EMPTY_5: '',
                    __EMPTY_6: '',
                    __EMPTY_7: '',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '',
                    __EMPTY_11: '',
                    __EMPTY_12: '',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'shift_2'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-14 Ср',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position7',
                    __EMPTY_4: 'division7',
                    __EMPTY_5: '',
                    __EMPTY_6: '',
                    __EMPTY_7: '24:00',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '',
                    __EMPTY_11: '',
                    __EMPTY_12: '-24:00',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'shift_2'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-15 Чт',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position7',
                    __EMPTY_4: 'division7',
                    __EMPTY_5: '',
                    __EMPTY_6: '',
                    __EMPTY_7: '',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '',
                    __EMPTY_11: '',
                    __EMPTY_12: '',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'shift_2'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-16 Пт',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position7',
                    __EMPTY_4: 'division7',
                    __EMPTY_5: '',
                    __EMPTY_6: '',
                    __EMPTY_7: '24:00',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '',
                    __EMPTY_11: '',
                    __EMPTY_12: '-24:00',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'shift_2'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-17 Сб',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position7',
                    __EMPTY_4: 'division7',
                    __EMPTY_5: '',
                    __EMPTY_6: '',
                    __EMPTY_7: '',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '',
                    __EMPTY_11: '',
                    __EMPTY_12: '',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'shift_2'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-18 Вс',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position7',
                    __EMPTY_4: 'division7',
                    __EMPTY_5: '',
                    __EMPTY_6: '',
                    __EMPTY_7: '24:00',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '',
                    __EMPTY_11: '',
                    __EMPTY_12: '-24:00',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'shift_2'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-19 Пн',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position7',
                    __EMPTY_4: 'division7',
                    __EMPTY_5: '',
                    __EMPTY_6: '',
                    __EMPTY_7: '',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '',
                    __EMPTY_11: '',
                    __EMPTY_12: '',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'shift_2'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-20 Вт',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position7',
                    __EMPTY_4: 'division7',
                    __EMPTY_5: '',
                    __EMPTY_6: '',
                    __EMPTY_7: '24:00',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '',
                    __EMPTY_11: '',
                    __EMPTY_12: '-24:00',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'shift_2'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-21 Ср',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position7',
                    __EMPTY_4: 'division7',
                    __EMPTY_5: '',
                    __EMPTY_6: '',
                    __EMPTY_7: '',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '',
                    __EMPTY_11: '',
                    __EMPTY_12: '',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'shift_2'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-22 Чт',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position7',
                    __EMPTY_4: 'division7',
                    __EMPTY_5: '',
                    __EMPTY_6: '',
                    __EMPTY_7: '24:00',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '',
                    __EMPTY_11: '',
                    __EMPTY_12: '-24:00',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'shift_2'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-23 Пт',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position7',
                    __EMPTY_4: 'division7',
                    __EMPTY_5: '',
                    __EMPTY_6: '',
                    __EMPTY_7: '',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '',
                    __EMPTY_11: '',
                    __EMPTY_12: '',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'shift_2'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-24 Сб',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position7',
                    __EMPTY_4: 'division7',
                    __EMPTY_5: '',
                    __EMPTY_6: '',
                    __EMPTY_7: '24:00',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '',
                    __EMPTY_11: '',
                    __EMPTY_12: '-24:00',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'shift_2'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-25 Вс',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position7',
                    __EMPTY_4: 'division7',
                    __EMPTY_5: '',
                    __EMPTY_6: '',
                    __EMPTY_7: '',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '',
                    __EMPTY_11: '',
                    __EMPTY_12: '',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'shift_2'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-26 Пн',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position7',
                    __EMPTY_4: 'division7',
                    __EMPTY_5: '',
                    __EMPTY_6: '',
                    __EMPTY_7: '24:00',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '',
                    __EMPTY_11: '',
                    __EMPTY_12: '-24:00',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'shift_2'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-27 Вт',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position7',
                    __EMPTY_4: 'division7',
                    __EMPTY_5: '',
                    __EMPTY_6: '',
                    __EMPTY_7: '',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '',
                    __EMPTY_11: '',
                    __EMPTY_12: '',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'shift_2'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-28 Ср',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position7',
                    __EMPTY_4: 'division7',
                    __EMPTY_5: '',
                    __EMPTY_6: '',
                    __EMPTY_7: '24:00',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '',
                    __EMPTY_11: '',
                    __EMPTY_12: '-24:00',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'shift_2'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-29 Чт',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position7',
                    __EMPTY_4: 'division7',
                    __EMPTY_5: '',
                    __EMPTY_6: '',
                    __EMPTY_7: '',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '',
                    __EMPTY_11: '',
                    __EMPTY_12: '',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'shift_2'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-30 Пт',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position7',
                    __EMPTY_4: 'division7',
                    __EMPTY_5: '',
                    __EMPTY_6: '',
                    __EMPTY_7: '24:00',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '',
                    __EMPTY_11: '',
                    __EMPTY_12: '-24:00',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'shift_2'
                },
                {
                    'Отчет "Учет рабочего времени"': 'staff',
                    __EMPTY: 'name',
                    __EMPTY_1: '8',
                    __EMPTY_2: '8',
                    __EMPTY_3: 'position8',
                    __EMPTY_4: 'division8',
                    __EMPTY_5: '09:00',
                    __EMPTY_6: '09:00',
                    __EMPTY_7: '',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '01:00',
                    __EMPTY_11: '',
                    __EMPTY_12: '',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'attendance_2'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-01 Чт',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position8',
                    __EMPTY_4: 'division8',
                    __EMPTY_5: '09:00',
                    __EMPTY_6: '09:00',
                    __EMPTY_7: '',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '01:00',
                    __EMPTY_11: '',
                    __EMPTY_12: '',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'attendance_2'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-02 Пт',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position8',
                    __EMPTY_4: 'division8',
                    __EMPTY_5: '',
                    __EMPTY_6: '',
                    __EMPTY_7: '',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '',
                    __EMPTY_11: '',
                    __EMPTY_12: '',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'attendance_2'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-03 Сб',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position8',
                    __EMPTY_4: 'division8',
                    __EMPTY_5: '',
                    __EMPTY_6: '',
                    __EMPTY_7: '',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '',
                    __EMPTY_11: '',
                    __EMPTY_12: '',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'attendance_2'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-04 Вс',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position8',
                    __EMPTY_4: 'division8',
                    __EMPTY_5: '',
                    __EMPTY_6: '',
                    __EMPTY_7: '',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '',
                    __EMPTY_11: '',
                    __EMPTY_12: '',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'attendance_2'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-05 Пн',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position8',
                    __EMPTY_4: 'division8',
                    __EMPTY_5: '',
                    __EMPTY_6: '',
                    __EMPTY_7: '',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '',
                    __EMPTY_11: '',
                    __EMPTY_12: '',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'attendance_2'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-06 Вт',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position8',
                    __EMPTY_4: 'division8',
                    __EMPTY_5: '',
                    __EMPTY_6: '',
                    __EMPTY_7: '',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '',
                    __EMPTY_11: '',
                    __EMPTY_12: '',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'attendance_2'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-07 Ср',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position8',
                    __EMPTY_4: 'division8',
                    __EMPTY_5: '',
                    __EMPTY_6: '',
                    __EMPTY_7: '',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '',
                    __EMPTY_11: '',
                    __EMPTY_12: '',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'attendance_2'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-08 Чт',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position8',
                    __EMPTY_4: 'division8',
                    __EMPTY_5: '',
                    __EMPTY_6: '',
                    __EMPTY_7: '',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '',
                    __EMPTY_11: '',
                    __EMPTY_12: '',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'attendance_2'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-09 Пт',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position8',
                    __EMPTY_4: 'division8',
                    __EMPTY_5: '',
                    __EMPTY_6: '',
                    __EMPTY_7: '',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '',
                    __EMPTY_11: '',
                    __EMPTY_12: '',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'attendance_2'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-10 Сб',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position8',
                    __EMPTY_4: 'division8',
                    __EMPTY_5: '',
                    __EMPTY_6: '',
                    __EMPTY_7: '',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '',
                    __EMPTY_11: '',
                    __EMPTY_12: '',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'attendance_2'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-11 Вс',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position8',
                    __EMPTY_4: 'division8',
                    __EMPTY_5: '',
                    __EMPTY_6: '',
                    __EMPTY_7: '',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '',
                    __EMPTY_11: '',
                    __EMPTY_12: '',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'attendance_2'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-12 Пн',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position8',
                    __EMPTY_4: 'division8',
                    __EMPTY_5: '',
                    __EMPTY_6: '',
                    __EMPTY_7: '',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '',
                    __EMPTY_11: '',
                    __EMPTY_12: '',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'attendance_2'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-13 Вт',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position8',
                    __EMPTY_4: 'division8',
                    __EMPTY_5: '',
                    __EMPTY_6: '',
                    __EMPTY_7: '',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '',
                    __EMPTY_11: '',
                    __EMPTY_12: '',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'attendance_2'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-14 Ср',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position8',
                    __EMPTY_4: 'division8',
                    __EMPTY_5: '',
                    __EMPTY_6: '',
                    __EMPTY_7: '',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '',
                    __EMPTY_11: '',
                    __EMPTY_12: '',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'attendance_2'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-15 Чт',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position8',
                    __EMPTY_4: 'division8',
                    __EMPTY_5: '',
                    __EMPTY_6: '',
                    __EMPTY_7: '',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '',
                    __EMPTY_11: '',
                    __EMPTY_12: '',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'attendance_2'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-16 Пт',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position8',
                    __EMPTY_4: 'division8',
                    __EMPTY_5: '',
                    __EMPTY_6: '',
                    __EMPTY_7: '',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '',
                    __EMPTY_11: '',
                    __EMPTY_12: '',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'attendance_2'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-17 Сб',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position8',
                    __EMPTY_4: 'division8',
                    __EMPTY_5: '',
                    __EMPTY_6: '',
                    __EMPTY_7: '',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '',
                    __EMPTY_11: '',
                    __EMPTY_12: '',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'attendance_2'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-18 Вс',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position8',
                    __EMPTY_4: 'division8',
                    __EMPTY_5: '',
                    __EMPTY_6: '',
                    __EMPTY_7: '',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '',
                    __EMPTY_11: '',
                    __EMPTY_12: '',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'attendance_2'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-19 Пн',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position8',
                    __EMPTY_4: 'division8',
                    __EMPTY_5: '',
                    __EMPTY_6: '',
                    __EMPTY_7: '',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '',
                    __EMPTY_11: '',
                    __EMPTY_12: '',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'attendance_2'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-20 Вт',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position8',
                    __EMPTY_4: 'division8',
                    __EMPTY_5: '',
                    __EMPTY_6: '',
                    __EMPTY_7: '',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '',
                    __EMPTY_11: '',
                    __EMPTY_12: '',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'attendance_2'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-21 Ср',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position8',
                    __EMPTY_4: 'division8',
                    __EMPTY_5: '',
                    __EMPTY_6: '',
                    __EMPTY_7: '',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '',
                    __EMPTY_11: '',
                    __EMPTY_12: '',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'attendance_2'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-22 Чт',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position8',
                    __EMPTY_4: 'division8',
                    __EMPTY_5: '',
                    __EMPTY_6: '',
                    __EMPTY_7: '',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '',
                    __EMPTY_11: '',
                    __EMPTY_12: '',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'attendance_2'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-23 Пт',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position8',
                    __EMPTY_4: 'division8',
                    __EMPTY_5: '',
                    __EMPTY_6: '',
                    __EMPTY_7: '',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '',
                    __EMPTY_11: '',
                    __EMPTY_12: '',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'attendance_2'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-24 Сб',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position8',
                    __EMPTY_4: 'division8',
                    __EMPTY_5: '',
                    __EMPTY_6: '',
                    __EMPTY_7: '',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '',
                    __EMPTY_11: '',
                    __EMPTY_12: '',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'attendance_2'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-25 Вс',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position8',
                    __EMPTY_4: 'division8',
                    __EMPTY_5: '',
                    __EMPTY_6: '',
                    __EMPTY_7: '',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '',
                    __EMPTY_11: '',
                    __EMPTY_12: '',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'attendance_2'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-26 Пн',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position8',
                    __EMPTY_4: 'division8',
                    __EMPTY_5: '',
                    __EMPTY_6: '',
                    __EMPTY_7: '',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '',
                    __EMPTY_11: '',
                    __EMPTY_12: '',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'attendance_2'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-27 Вт',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position8',
                    __EMPTY_4: 'division8',
                    __EMPTY_5: '',
                    __EMPTY_6: '',
                    __EMPTY_7: '',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '',
                    __EMPTY_11: '',
                    __EMPTY_12: '',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'attendance_2'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-28 Ср',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position8',
                    __EMPTY_4: 'division8',
                    __EMPTY_5: '',
                    __EMPTY_6: '',
                    __EMPTY_7: '',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '',
                    __EMPTY_11: '',
                    __EMPTY_12: '',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'attendance_2'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-29 Чт',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position8',
                    __EMPTY_4: 'division8',
                    __EMPTY_5: '',
                    __EMPTY_6: '',
                    __EMPTY_7: '',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '',
                    __EMPTY_11: '',
                    __EMPTY_12: '',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'attendance_2'
                },
                {
                    'Отчет "Учет рабочего времени"': '2023-06-30 Пт',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'position8',
                    __EMPTY_4: 'division8',
                    __EMPTY_5: '',
                    __EMPTY_6: '',
                    __EMPTY_7: '',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '',
                    __EMPTY_11: '',
                    __EMPTY_12: '',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: 'attendance_2'
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

    const exportWorkedJournalCSV = () => describe('УРВ. Журнал отработанного времени. Проверка экспорта CSV.',
        () => {

        const params = {
            nameFile: 'workedjournal.csv',
            json: [
                {
                    'Фамилия': 'staff',
                    'Имя': 'name',
                    'Отчество': 1,
                    'Табельный номер': 1,
                    'Должность': 'position1',
                    'Подразделение': 'division1',
                    'Присутствие': '86:54',
                    'Рабочее время': '79:54',
                    'Отсутствие': '140:06',
                    'Работа в ночное время': '10:00',
                    'Переработка': '00:02',
                    'Баланс отработанного времени': '-140:06',
                    'График работы': 'week'
                },
                {
                    'Фамилия': '2023-06-01 Чт',
                    'Должность': 'position1',
                    'Подразделение': 'division1',
                    'Присутствие': '08:00',
                    'Рабочее время': '08:00',
                    'Работа в ночное время': '01:00',
                    'График работы': 'week'
                },
                {
                    'Фамилия': '2023-06-02 Пт',
                    'Должность': 'position1',
                    'Подразделение': 'division1',
                    'Присутствие': '09:00',
                    'Рабочее время': '08:00',
                    'Работа в ночное время': '01:00',
                    'График работы': 'week'
                },
                {
                    'Фамилия': '2023-06-03 Сб',
                    'Должность': 'position1',
                    'Подразделение': 'division1',
                    'Присутствие': '08:59',
                    'Рабочее время': '08:00',
                    'Работа в ночное время': '01:00',
                    'Баланс отработанного времени': '-00:01',
                    'График работы': 'week'
                },
                {
                    'Фамилия': '2023-06-04 Вс',
                    'Должность': 'position1',
                    'Подразделение': 'division1',
                    'Присутствие': '08:58',
                    'Рабочее время': '07:58',
                    'Отсутствие': '00:02',
                    'Работа в ночное время': '01:00',
                    'Баланс отработанного времени': '-00:02',
                    'График работы': 'week'
                },
                {
                    'Фамилия': '2023-06-05 Пн',
                    'Должность': 'position1',
                    'Подразделение': 'division1',
                    'Присутствие': '08:59',
                    'Рабочее время': '08:00',
                    'Работа в ночное время': '01:00',
                    'Баланс отработанного времени': '-00:01',
                    'График работы': 'week'
                },
                {
                    'Фамилия': '2023-06-06 Вт',
                    'Должность': 'position1',
                    'Подразделение': 'division1',
                    'Присутствие': '08:58',
                    'Рабочее время': '07:58',
                    'Отсутствие': '00:02',
                    'Работа в ночное время': '01:00',
                    'Баланс отработанного времени': '-00:02',
                    'График работы': 'week'
                },
                {
                    'Фамилия': '2023-06-07 Ср',
                    'Должность': 'position1',
                    'Подразделение': 'division1',
                    'Присутствие': '07:59',
                    'Рабочее время': '08:00',
                    'Работа в ночное время': '01:00',
                    'Баланс отработанного времени': '-00:01',
                    'График работы': 'week'
                },
                {
                    'Фамилия': '2023-06-08 Чт',
                    'Должность': 'position1',
                    'Подразделение': 'division1',
                    'Присутствие': '07:58',
                    'Рабочее время': '07:58',
                    'Отсутствие': '00:02',
                    'Работа в ночное время': '01:00',
                    'Баланс отработанного времени': '-00:02',
                    'График работы': 'week'
                },
                {
                    'Фамилия': '2023-06-09 Пт',
                    'Должность': 'position1',
                    'Подразделение': 'division1',
                    'Присутствие': '09:01',
                    'Рабочее время': '08:00',
                    'Работа в ночное время': '01:00',
                    'Баланс отработанного времени': '00:01',
                    'График работы': 'week'
                },
                {
                    'Фамилия': '2023-06-10 Сб',
                    'Должность': 'position1',
                    'Подразделение': 'division1',
                    'Присутствие': '09:02',
                    'Рабочее время': '08:00',
                    'Работа в ночное время': '01:00',
                    'Переработка': '00:02',
                    'Баланс отработанного времени': '00:02',
                    'График работы': 'week'
                },
                {
                    'Фамилия': '2023-06-11 Вс',
                    'Должность': 'position1',
                    'Подразделение': 'division1',
                    'Отсутствие': '08:00',
                    'Баланс отработанного времени': '-08:00',
                    'График работы': 'week'
                },
                {
                    'Фамилия': '2023-06-12 Пн',
                    'Должность': 'position1',
                    'Подразделение': 'division1',
                    'График работы': 'week'
                },
                {
                    'Фамилия': '2023-06-13 Вт',
                    'Должность': 'position1',
                    'Подразделение': 'division1',
                    'Отсутствие': '06:00',
                    'Баланс отработанного времени': '-06:00',
                    'График работы': 'week'
                },
                {
                    'Фамилия': '2023-06-14 Ср',
                    'Должность': 'position1',
                    'Подразделение': 'division1',
                    'Отсутствие': '08:00',
                    'Баланс отработанного времени': '-08:00',
                    'График работы': 'week'
                },
                {
                    'Фамилия': '2023-06-15 Чт',
                    'Должность': 'position1',
                    'Подразделение': 'division1',
                    'Отсутствие': '08:00',
                    'Баланс отработанного времени': '-08:00',
                    'График работы': 'week'
                },
                {
                    'Фамилия': '2023-06-16 Пт',
                    'Должность': 'position1',
                    'Подразделение': 'division1',
                    'График работы': 'week'
                },
                {
                    'Фамилия': '2023-06-17 Сб',
                    'Должность': 'position1',
                    'Подразделение': 'division1',
                    'Отсутствие': '06:00',
                    'Баланс отработанного времени': '-06:00',
                    'График работы': 'week'
                },
                {
                    'Фамилия': '2023-06-18 Вс',
                    'Должность': 'position1',
                    'Подразделение': 'division1',
                    'Отсутствие': '08:00',
                    'Баланс отработанного времени': '-08:00',
                    'График работы': 'week'
                },
                {
                    'Фамилия': '2023-06-19 Пн',
                    'Должность': 'position1',
                    'Подразделение': 'division1',
                    'Отсутствие': '08:00',
                    'Баланс отработанного времени': '-08:00',
                    'График работы': 'week'
                },
                {
                    'Фамилия': '2023-06-20 Вт',
                    'Должность': 'position1',
                    'Подразделение': 'division1',
                    'Отсутствие': '08:00',
                    'Баланс отработанного времени': '-08:00',
                    'График работы': 'week'
                },
                {
                    'Фамилия': '2023-06-21 Ср',
                    'Должность': 'position1',
                    'Подразделение': 'division1',
                    'Отсутствие': '08:00',
                    'Баланс отработанного времени': '-08:00',
                    'График работы': 'week'
                },
                {
                    'Фамилия': '2023-06-22 Чт',
                    'Должность': 'position1',
                    'Подразделение': 'division1',
                    'Отсутствие': '08:00',
                    'Баланс отработанного времени': '-08:00',
                    'График работы': 'week'
                },
                {
                    'Фамилия': '2023-06-23 Пт',
                    'Должность': 'position1',
                    'Подразделение': 'division1',
                    'Отсутствие': '08:00',
                    'Баланс отработанного времени': '-08:00',
                    'График работы': 'week'
                },
                {
                    'Фамилия': '2023-06-24 Сб',
                    'Должность': 'position1',
                    'Подразделение': 'division1',
                    'Отсутствие': '08:00',
                    'Баланс отработанного времени': '-08:00',
                    'График работы': 'week'
                },
                {
                    'Фамилия': '2023-06-25 Вс',
                    'Должность': 'position1',
                    'Подразделение': 'division1',
                    'Отсутствие': '08:00',
                    'Баланс отработанного времени': '-08:00',
                    'График работы': 'week'
                },
                {
                    'Фамилия': '2023-06-26 Пн',
                    'Должность': 'position1',
                    'Подразделение': 'division1',
                    'Отсутствие': '08:00',
                    'Баланс отработанного времени': '-08:00',
                    'График работы': 'week'
                },
                {
                    'Фамилия': '2023-06-27 Вт',
                    'Должность': 'position1',
                    'Подразделение': 'division1',
                    'Отсутствие': '08:00',
                    'Баланс отработанного времени': '-08:00',
                    'График работы': 'week'
                },
                {
                    'Фамилия': '2023-06-28 Ср',
                    'Должность': 'position1',
                    'Подразделение': 'division1',
                    'Отсутствие': '08:00',
                    'Баланс отработанного времени': '-08:00',
                    'График работы': 'week'
                },
                {
                    'Фамилия': '2023-06-29 Чт',
                    'Должность': 'position1',
                    'Подразделение': 'division1',
                    'Отсутствие': '08:00',
                    'Баланс отработанного времени': '-08:00',
                    'График работы': 'week'
                },
                {
                    'Фамилия': '2023-06-30 Пт',
                    'Должность': 'position1',
                    'Подразделение': 'division1',
                    'Отсутствие': '08:00',
                    'Баланс отработанного времени': '-08:00',
                    'График работы': 'week'
                },
                {
                    'Фамилия': 'staff',
                    'Имя': 'name',
                    'Отчество': 2,
                    'Табельный номер': 2,
                    'Должность': 'position2',
                    'Подразделение': 'division2',
                    'Присутствие': '296:54',
                    'Рабочее время': '215:56',
                    'Отсутствие': '144:04',
                    'Работа в ночное время': '18:00',
                    'Переработка': '00:02',
                    'Баланс отработанного времени': '-144:06',
                    'График работы': 'shift'
                },
                {
                    'Фамилия': '2023-06-01 Чт',
                    'Должность': 'position2',
                    'Подразделение': 'division2',
                    'График работы': 'shift'
                },
                {
                    'Фамилия': '2023-06-02 Пт',
                    'Должность': 'position2',
                    'Подразделение': 'division2',
                    'Присутствие': '33:00',
                    'Рабочее время': '24:00',
                    'Работа в ночное время': '02:00',
                    'График работы': 'shift'
                },
                {
                    'Фамилия': '2023-06-03 Сб',
                    'Должность': 'position2',
                    'Подразделение': 'division2',
                    'График работы': 'shift'
                },
                {
                    'Фамилия': '2023-06-04 Вс',
                    'Должность': 'position2',
                    'Подразделение': 'division2',
                    'Присутствие': '32:59',
                    'Рабочее время': '24:00',
                    'Работа в ночное время': '02:00',
                    'Баланс отработанного времени': '-00:01',
                    'График работы': 'shift'
                },
                {
                    'Фамилия': '2023-06-05 Пн',
                    'Должность': 'position2',
                    'Подразделение': 'division2',
                    'График работы': 'shift'
                },
                {
                    'Фамилия': '2023-06-06 Вт',
                    'Должность': 'position2',
                    'Подразделение': 'division2',
                    'Присутствие': '32:58',
                    'Рабочее время': '23:58',
                    'Отсутствие': '00:02',
                    'Работа в ночное время': '02:00',
                    'Баланс отработанного времени': '-00:02',
                    'График работы': 'shift'
                },
                {
                    'Фамилия': '2023-06-07 Ср',
                    'Должность': 'position2',
                    'Подразделение': 'division2',
                    'График работы': 'shift'
                },
                {
                    'Фамилия': '2023-06-08 Чт',
                    'Должность': 'position2',
                    'Подразделение': 'division2',
                    'Присутствие': '32:59',
                    'Рабочее время': '24:00',
                    'Работа в ночное время': '02:00',
                    'Баланс отработанного времени': '-00:01',
                    'График работы': 'shift'
                },
                {
                    'Фамилия': '2023-06-09 Пт',
                    'Должность': 'position2',
                    'Подразделение': 'division2',
                    'График работы': 'shift'
                },
                {
                    'Фамилия': '2023-06-10 Сб',
                    'Должность': 'position2',
                    'Подразделение': 'division2',
                    'Присутствие': '32:58',
                    'Рабочее время': '23:58',
                    'Отсутствие': '00:02',
                    'Работа в ночное время': '02:00',
                    'Баланс отработанного времени': '-00:02',
                    'График работы': 'shift'
                },
                {
                    'Фамилия': '2023-06-11 Вс',
                    'Должность': 'position2',
                    'Подразделение': 'division2',
                    'График работы': 'shift'
                },
                {
                    'Фамилия': '2023-06-12 Пн',
                    'Должность': 'position2',
                    'Подразделение': 'division2',
                    'Присутствие': '32:59',
                    'Рабочее время': '24:00',
                    'Работа в ночное время': '02:00',
                    'Баланс отработанного времени': '-00:01',
                    'График работы': 'shift'
                },
                {
                    'Фамилия': '2023-06-13 Вт',
                    'Должность': 'position2',
                    'Подразделение': 'division2',
                    'График работы': 'shift'
                },
                {
                    'Фамилия': '2023-06-14 Ср',
                    'Должность': 'position2',
                    'Подразделение': 'division2',
                    'Присутствие': '32:58',
                    'Рабочее время': '24:00',
                    'Работа в ночное время': '02:00',
                    'Баланс отработанного времени': '-00:02',
                    'График работы': 'shift'
                },
                {
                    'Фамилия': '2023-06-15 Чт',
                    'Должность': 'position2',
                    'Подразделение': 'division2',
                    'График работы': 'shift'
                },
                {
                    'Фамилия': '2023-06-16 Пт',
                    'Должность': 'position2',
                    'Подразделение': 'division2',
                    'Присутствие': '33:01',
                    'Рабочее время': '24:00',
                    'Работа в ночное время': '02:00',
                    'Баланс отработанного времени': '00:01',
                    'График работы': 'shift'
                },
                {
                    'Фамилия': '2023-06-17 Сб',
                    'Должность': 'position2',
                    'Подразделение': 'division2',
                    'График работы': 'shift'
                },
                {
                    'Фамилия': '2023-06-18 Вс',
                    'Должность': 'position2',
                    'Подразделение': 'division2',
                    'Присутствие': '33:02',
                    'Рабочее время': '24:00',
                    'Работа в ночное время': '02:00',
                    'Переработка': '00:02',
                    'Баланс отработанного времени': '00:02',
                    'График работы': 'shift'
                },
                {
                    'Фамилия': '2023-06-19 Пн',
                    'Должность': 'position2',
                    'Подразделение': 'division2',
                    'График работы': 'shift'
                },
                {
                    'Фамилия': '2023-06-20 Вт',
                    'Должность': 'position2',
                    'Подразделение': 'division2',
                    'Отсутствие': '24:00',
                    'Баланс отработанного времени': '-24:00',
                    'График работы': 'shift'
                },
                {
                    'Фамилия': '2023-06-21 Ср',
                    'Должность': 'position2',
                    'Подразделение': 'division2',
                    'График работы': 'shift'
                },
                {
                    'Фамилия': '2023-06-22 Чт',
                    'Должность': 'position2',
                    'Подразделение': 'division2',
                    'Отсутствие': '24:00',
                    'Баланс отработанного времени': '-24:00',
                    'График работы': 'shift'
                },
                {
                    'Фамилия': '2023-06-23 Пт',
                    'Должность': 'position2',
                    'Подразделение': 'division2',
                    'График работы': 'shift'
                },
                {
                    'Фамилия': '2023-06-24 Сб',
                    'Должность': 'position2',
                    'Подразделение': 'division2',
                    'Отсутствие': '24:00',
                    'Баланс отработанного времени': '-24:00',
                    'График работы': 'shift'
                },
                {
                    'Фамилия': '2023-06-25 Вс',
                    'Должность': 'position2',
                    'Подразделение': 'division2',
                    'График работы': 'shift'
                },
                {
                    'Фамилия': '2023-06-26 Пн',
                    'Должность': 'position2',
                    'Подразделение': 'division2',
                    'Отсутствие': '24:00',
                    'Баланс отработанного времени': '-24:00',
                    'График работы': 'shift'
                },
                {
                    'Фамилия': '2023-06-27 Вт',
                    'Должность': 'position2',
                    'Подразделение': 'division2',
                    'График работы': 'shift'
                },
                {
                    'Фамилия': '2023-06-28 Ср',
                    'Должность': 'position2',
                    'Подразделение': 'division2',
                    'Отсутствие': '24:00',
                    'Баланс отработанного времени': '-24:00',
                    'График работы': 'shift'
                },
                {
                    'Фамилия': '2023-06-29 Чт',
                    'Должность': 'position2',
                    'Подразделение': 'division2',
                    'График работы': 'shift'
                },
                {
                    'Фамилия': '2023-06-30 Пт',
                    'Должность': 'position2',
                    'Подразделение': 'division2',
                    'Отсутствие': '24:00',
                    'Баланс отработанного времени': '-24:00',
                    'График работы': 'shift'
                },
                {
                    'Фамилия': 'staff',
                    'Имя': 'name',
                    'Отчество': 3,
                    'Табельный номер': 3,
                    'Должность': 'position3',
                    'Подразделение': 'division3',
                    'Присутствие': '23:59',
                    'Рабочее время': '23:59',
                    'Работа в ночное время': '01:00',
                    'График работы': 'attendance'
                },
                {
                    'Фамилия': '2023-06-01 Чт',
                    'Должность': 'position3',
                    'Подразделение': 'division3',
                    'Присутствие': '23:59',
                    'Рабочее время': '23:59',
                    'Работа в ночное время': '01:00',
                    'График работы': 'attendance'
                },
                {
                    'Фамилия': '2023-06-02 Пт',
                    'Должность': 'position3',
                    'Подразделение': 'division3',
                    'График работы': 'attendance'
                },
                {
                    'Фамилия': '2023-06-03 Сб',
                    'Должность': 'position3',
                    'Подразделение': 'division3',
                    'График работы': 'attendance'
                },
                {
                    'Фамилия': '2023-06-04 Вс',
                    'Должность': 'position3',
                    'Подразделение': 'division3',
                    'График работы': 'attendance'
                },
                {
                    'Фамилия': '2023-06-05 Пн',
                    'Должность': 'position3',
                    'Подразделение': 'division3',
                    'График работы': 'attendance'
                },
                {
                    'Фамилия': '2023-06-06 Вт',
                    'Должность': 'position3',
                    'Подразделение': 'division3',
                    'График работы': 'attendance'
                },
                {
                    'Фамилия': '2023-06-07 Ср',
                    'Должность': 'position3',
                    'Подразделение': 'division3',
                    'График работы': 'attendance'
                },
                {
                    'Фамилия': '2023-06-08 Чт',
                    'Должность': 'position3',
                    'Подразделение': 'division3',
                    'График работы': 'attendance'
                },
                {
                    'Фамилия': '2023-06-09 Пт',
                    'Должность': 'position3',
                    'Подразделение': 'division3',
                    'График работы': 'attendance'
                },
                {
                    'Фамилия': '2023-06-10 Сб',
                    'Должность': 'position3',
                    'Подразделение': 'division3',
                    'График работы': 'attendance'
                },
                {
                    'Фамилия': '2023-06-11 Вс',
                    'Должность': 'position3',
                    'Подразделение': 'division3',
                    'График работы': 'attendance'
                },
                {
                    'Фамилия': '2023-06-12 Пн',
                    'Должность': 'position3',
                    'Подразделение': 'division3',
                    'График работы': 'attendance'
                },
                {
                    'Фамилия': '2023-06-13 Вт',
                    'Должность': 'position3',
                    'Подразделение': 'division3',
                    'График работы': 'attendance'
                },
                {
                    'Фамилия': '2023-06-14 Ср',
                    'Должность': 'position3',
                    'Подразделение': 'division3',
                    'График работы': 'attendance'
                },
                {
                    'Фамилия': '2023-06-15 Чт',
                    'Должность': 'position3',
                    'Подразделение': 'division3',
                    'График работы': 'attendance'
                },
                {
                    'Фамилия': '2023-06-16 Пт',
                    'Должность': 'position3',
                    'Подразделение': 'division3',
                    'График работы': 'attendance'
                },
                {
                    'Фамилия': '2023-06-17 Сб',
                    'Должность': 'position3',
                    'Подразделение': 'division3',
                    'График работы': 'attendance'
                },
                {
                    'Фамилия': '2023-06-18 Вс',
                    'Должность': 'position3',
                    'Подразделение': 'division3',
                    'График работы': 'attendance'
                },
                {
                    'Фамилия': '2023-06-19 Пн',
                    'Должность': 'position3',
                    'Подразделение': 'division3',
                    'График работы': 'attendance'
                },
                {
                    'Фамилия': '2023-06-20 Вт',
                    'Должность': 'position3',
                    'Подразделение': 'division3',
                    'График работы': 'attendance'
                },
                {
                    'Фамилия': '2023-06-21 Ср',
                    'Должность': 'position3',
                    'Подразделение': 'division3',
                    'График работы': 'attendance'
                },
                {
                    'Фамилия': '2023-06-22 Чт',
                    'Должность': 'position3',
                    'Подразделение': 'division3',
                    'График работы': 'attendance'
                },
                {
                    'Фамилия': '2023-06-23 Пт',
                    'Должность': 'position3',
                    'Подразделение': 'division3',
                    'График работы': 'attendance'
                },
                {
                    'Фамилия': '2023-06-24 Сб',
                    'Должность': 'position3',
                    'Подразделение': 'division3',
                    'График работы': 'attendance'
                },
                {
                    'Фамилия': '2023-06-25 Вс',
                    'Должность': 'position3',
                    'Подразделение': 'division3',
                    'График работы': 'attendance'
                },
                {
                    'Фамилия': '2023-06-26 Пн',
                    'Должность': 'position3',
                    'Подразделение': 'division3',
                    'График работы': 'attendance'
                },
                {
                    'Фамилия': '2023-06-27 Вт',
                    'Должность': 'position3',
                    'Подразделение': 'division3',
                    'График работы': 'attendance'
                },
                {
                    'Фамилия': '2023-06-28 Ср',
                    'Должность': 'position3',
                    'Подразделение': 'division3',
                    'График работы': 'attendance'
                },
                {
                    'Фамилия': '2023-06-29 Чт',
                    'Должность': 'position3',
                    'Подразделение': 'division3',
                    'График работы': 'attendance'
                },
                {
                    'Фамилия': '2023-06-30 Пт',
                    'Должность': 'position3',
                    'Подразделение': 'division3',
                    'График работы': 'attendance'
                },
                {
                    'Фамилия': 'staff',
                    'Имя': 'name',
                    'Отчество': 4,
                    'Табельный номер': 4,
                    'Должность': 'position4',
                    'Подразделение': 'division4',
                    'Присутствие': '94:52',
                    'Рабочее время': '87:52',
                    'Отсутствие': '132:08',
                    'Задолженность': '00:08',
                    'Работа в ночное время': '11:00',
                    'Переработка': '00:02',
                    'Баланс отработанного времени': '-00:08',
                    'График работы': 'violation'
                },
                {
                    'Фамилия': '2023-06-01 Чт',
                    'Должность': 'position4',
                    'Подразделение': 'division4',
                    'Присутствие': '08:00',
                    'Рабочее время': '08:00',
                    'Работа в ночное время': '01:00',
                    'График работы': 'violation'
                },
                {
                    'Фамилия': '2023-06-02 Пт',
                    'Должность': 'position4',
                    'Подразделение': 'division4',
                    'Присутствие': '09:00',
                    'Рабочее время': '08:00',
                    'Работа в ночное время': '01:00',
                    'График работы': 'violation'
                },
                {
                    'Фамилия': '2023-06-03 Сб',
                    'Должность': 'position4',
                    'Подразделение': 'division4',
                    'Присутствие': '08:59',
                    'Рабочее время': '08:00',
                    'Работа в ночное время': '01:00',
                    'Баланс отработанного времени': '-00:01',
                    'График работы': 'violation'
                },
                {
                    'Фамилия': '2023-06-04 Вс',
                    'Должность': 'position4',
                    'Подразделение': 'division4',
                    'Присутствие': '08:58',
                    'Рабочее время': '07:58',
                    'Отсутствие': '00:02',
                    'Задолженность': '00:02',
                    'Работа в ночное время': '01:00',
                    'Баланс отработанного времени': '-00:02',
                    'График работы': 'violation'
                },
                {
                    'Фамилия': '2023-06-05 Пн',
                    'Должность': 'position4',
                    'Подразделение': 'division4',
                    'Присутствие': '08:59',
                    'Рабочее время': '08:00',
                    'Работа в ночное время': '01:00',
                    'Баланс отработанного времени': '-00:01',
                    'График работы': 'violation'
                },
                {
                    'Фамилия': '2023-06-06 Вт',
                    'Должность': 'position4',
                    'Подразделение': 'division4',
                    'Присутствие': '08:58',
                    'Рабочее время': '07:58',
                    'Отсутствие': '00:02',
                    'Задолженность': '00:02',
                    'Работа в ночное время': '01:00',
                    'Баланс отработанного времени': '-00:02',
                    'График работы': 'violation'
                },
                {
                    'Фамилия': '2023-06-07 Ср',
                    'Должность': 'position4',
                    'Подразделение': 'division4',
                    'Присутствие': '07:59',
                    'Рабочее время': '08:00',
                    'Работа в ночное время': '01:00',
                    'Баланс отработанного времени': '-00:01',
                    'График работы': 'violation'
                },
                {
                    'Фамилия': '2023-06-08 Чт',
                    'Должность': 'position4',
                    'Подразделение': 'division4',
                    'Присутствие': '07:58',
                    'Рабочее время': '07:58',
                    'Отсутствие': '00:02',
                    'Задолженность': '00:02',
                    'Работа в ночное время': '01:00',
                    'Баланс отработанного времени': '-00:02',
                    'График работы': 'violation'
                },
                {
                    'Фамилия': '2023-06-09 Пт',
                    'Должность': 'position4',
                    'Подразделение': 'division4',
                    'Присутствие': '07:58',
                    'Рабочее время': '07:58',
                    'Отсутствие': '00:02',
                    'Задолженность': '00:02',
                    'Работа в ночное время': '01:00',
                    'Баланс отработанного времени': '-00:02',
                    'График работы': 'violation'
                },
                {
                    'Фамилия': '2023-06-10 Сб',
                    'Должность': 'position4',
                    'Подразделение': 'division4',
                    'Присутствие': '09:01',
                    'Рабочее время': '08:00',
                    'Работа в ночное время': '01:00',
                    'Баланс отработанного времени': '00:01',
                    'График работы': 'violation'
                },
                {
                    'Фамилия': '2023-06-11 Вс',
                    'Должность': 'position4',
                    'Подразделение': 'division4',
                    'Присутствие': '09:02',
                    'Рабочее время': '08:00',
                    'Работа в ночное время': '01:00',
                    'Переработка': '00:02',
                    'Баланс отработанного времени': '00:02',
                    'График работы': 'violation'
                },
                {
                    'Фамилия': '2023-06-12 Пн',
                    'Должность': 'position4',
                    'Подразделение': 'division4',
                    'График работы': 'violation'
                },
                {
                    'Фамилия': '2023-06-13 Вт',
                    'Должность': 'position4',
                    'Подразделение': 'division4',
                    'Отсутствие': '06:00',
                    'График работы': 'violation'
                },
                {
                    'Фамилия': '2023-06-14 Ср',
                    'Должность': 'position4',
                    'Подразделение': 'division4',
                    'Отсутствие': '08:00',
                    'График работы': 'violation'
                },
                {
                    'Фамилия': '2023-06-15 Чт',
                    'Должность': 'position4',
                    'Подразделение': 'division4',
                    'Отсутствие': '08:00',
                    'График работы': 'violation'
                },
                {
                    'Фамилия': '2023-06-16 Пт',
                    'Должность': 'position4',
                    'Подразделение': 'division4',
                    'График работы': 'violation'
                },
                {
                    'Фамилия': '2023-06-17 Сб',
                    'Должность': 'position4',
                    'Подразделение': 'division4',
                    'Отсутствие': '06:00',
                    'График работы': 'violation'
                },
                {
                    'Фамилия': '2023-06-18 Вс',
                    'Должность': 'position4',
                    'Подразделение': 'division4',
                    'Отсутствие': '08:00',
                    'График работы': 'violation'
                },
                {
                    'Фамилия': '2023-06-19 Пн',
                    'Должность': 'position4',
                    'Подразделение': 'division4',
                    'Отсутствие': '08:00',
                    'График работы': 'violation'
                },
                {
                    'Фамилия': '2023-06-20 Вт',
                    'Должность': 'position4',
                    'Подразделение': 'division4',
                    'Отсутствие': '08:00',
                    'График работы': 'violation'
                },
                {
                    'Фамилия': '2023-06-21 Ср',
                    'Должность': 'position4',
                    'Подразделение': 'division4',
                    'Отсутствие': '08:00',
                    'График работы': 'violation'
                },
                {
                    'Фамилия': '2023-06-22 Чт',
                    'Должность': 'position4',
                    'Подразделение': 'division4',
                    'Отсутствие': '08:00',
                    'График работы': 'violation'
                },
                {
                    'Фамилия': '2023-06-23 Пт',
                    'Должность': 'position4',
                    'Подразделение': 'division4',
                    'Отсутствие': '08:00',
                    'График работы': 'violation'
                },
                {
                    'Фамилия': '2023-06-24 Сб',
                    'Должность': 'position4',
                    'Подразделение': 'division4',
                    'Отсутствие': '08:00',
                    'График работы': 'violation'
                },
                {
                    'Фамилия': '2023-06-25 Вс',
                    'Должность': 'position4',
                    'Подразделение': 'division4',
                    'Отсутствие': '08:00',
                    'График работы': 'violation'
                },
                {
                    'Фамилия': '2023-06-26 Пн',
                    'Должность': 'position4',
                    'Подразделение': 'division4',
                    'Отсутствие': '08:00',
                    'График работы': 'violation'
                },
                {
                    'Фамилия': '2023-06-27 Вт',
                    'Должность': 'position4',
                    'Подразделение': 'division4',
                    'Отсутствие': '08:00',
                    'График работы': 'violation'
                },
                {
                    'Фамилия': '2023-06-28 Ср',
                    'Должность': 'position4',
                    'Подразделение': 'division4',
                    'Отсутствие': '08:00',
                    'График работы': 'violation'
                },
                {
                    'Фамилия': '2023-06-29 Чт',
                    'Должность': 'position4',
                    'Подразделение': 'division4',
                    'Отсутствие': '08:00',
                    'График работы': 'violation'
                },
                {
                    'Фамилия': '2023-06-30 Пт',
                    'Должность': 'position4',
                    'Подразделение': 'division4',
                    'Отсутствие': '08:00',
                    'График работы': 'violation'
                },
                {
                    'Фамилия': 'staff',
                    'Имя': 'name',
                    'Отчество': 5,
                    'Табельный номер': 5,
                    'Должность': 'position5',
                    'Подразделение': 'division5',
                    'Присутствие': '68:54',
                    'Рабочее время': '63:52',
                    'Отсутствие': '156:08',
                    'Задолженность': '00:07',
                    'Непогашаемая задолженность': '00:06',
                    'Работа в ночное время': '08:00',
                    'Переработка': '00:02',
                    'Баланс отработанного времени': '-00:07',
                    'График работы': 'balance'
                },
                {
                    'Фамилия': '2023-06-01 Чт',
                    'Должность': 'position5',
                    'Подразделение': 'division5',
                    'Присутствие': '08:00',
                    'Рабочее время': '08:00',
                    'Работа в ночное время': '01:00',
                    'График работы': 'balance'
                },
                {
                    'Фамилия': '2023-06-02 Пт',
                    'Должность': 'position5',
                    'Подразделение': 'division5',
                    'Присутствие': '09:02',
                    'Рабочее время': '08:00',
                    'Работа в ночное время': '01:00',
                    'Переработка': '00:02',
                    'Баланс отработанного времени': '00:01',
                    'График работы': 'balance'
                },
                {
                    'Фамилия': '2023-06-03 Сб',
                    'Должность': 'position5',
                    'Подразделение': 'division5',
                    'Присутствие': '08:59',
                    'Рабочее время': '07:59',
                    'Отсутствие': '00:01',
                    'Задолженность': '00:00 (00:01)',
                    'Непогашаемая задолженность': '00:01',
                    'Работа в ночное время': '01:00',
                    'График работы': 'balance'
                },
                {
                    'Фамилия': '2023-06-04 Вс',
                    'Должность': 'position5',
                    'Подразделение': 'division5',
                    'Присутствие': '08:58',
                    'Рабочее время': '07:58',
                    'Отсутствие': '00:02',
                    'Задолженность': '00:02',
                    'Непогашаемая задолженность': '00:02',
                    'Работа в ночное время': '01:00',
                    'Баланс отработанного времени': '-00:02',
                    'График работы': 'balance'
                },
                {
                    'Фамилия': '2023-06-05 Пн',
                    'Должность': 'position5',
                    'Подразделение': 'division5',
                    'Присутствие': '08:59',
                    'Рабочее время': '07:59',
                    'Отсутствие': '00:01',
                    'Задолженность': '00:01',
                    'Непогашаемая задолженность': '00:01',
                    'Работа в ночное время': '01:00',
                    'Баланс отработанного времени': '-00:01',
                    'График работы': 'balance'
                },
                {
                    'Фамилия': '2023-06-06 Вт',
                    'Должность': 'position5',
                    'Подразделение': 'division5',
                    'Присутствие': '08:58',
                    'Рабочее время': '07:58',
                    'Отсутствие': '00:02',
                    'Задолженность': '00:02',
                    'Непогашаемая задолженность': '00:02',
                    'Работа в ночное время': '01:00',
                    'Баланс отработанного времени': '-00:02',
                    'График работы': 'balance'
                },
                {
                    'Фамилия': '2023-06-07 Ср',
                    'Должность': 'position5',
                    'Подразделение': 'division5',
                    'Присутствие': '07:59',
                    'Рабочее время': '07:59',
                    'Отсутствие': '00:01',
                    'Задолженность': '00:01',
                    'Работа в ночное время': '01:00',
                    'Баланс отработанного времени': '-00:01',
                    'График работы': 'balance'
                },
                {
                    'Фамилия': '2023-06-08 Чт',
                    'Должность': 'position5',
                    'Подразделение': 'division5',
                    'Присутствие': '07:59',
                    'Рабочее время': '07:59',
                    'Отсутствие': '00:01',
                    'Задолженность': '00:01',
                    'Работа в ночное время': '01:00',
                    'Баланс отработанного времени': '-00:01',
                    'График работы': 'balance'
                },
                {
                    'Фамилия': '2023-06-09 Пт',
                    'Должность': 'position5',
                    'Подразделение': 'division5',
                    'Отсутствие': '08:00',
                    'График работы': 'balance'
                },
                {
                    'Фамилия': '2023-06-10 Сб',
                    'Должность': 'position5',
                    'Подразделение': 'division5',
                    'Отсутствие': '08:00',
                    'График работы': 'balance'
                },
                {
                    'Фамилия': '2023-06-11 Вс',
                    'Должность': 'position5',
                    'Подразделение': 'division5',
                    'Отсутствие': '08:00',
                    'График работы': 'balance'
                },
                {
                    'Фамилия': '2023-06-12 Пн',
                    'Должность': 'position5',
                    'Подразделение': 'division5',
                    'График работы': 'balance'
                },
                {
                    'Фамилия': '2023-06-13 Вт',
                    'Должность': 'position5',
                    'Подразделение': 'division5',
                    'Отсутствие': '06:00',
                    'График работы': 'balance'
                },
                {
                    'Фамилия': '2023-06-14 Ср',
                    'Должность': 'position5',
                    'Подразделение': 'division5',
                    'Отсутствие': '08:00',
                    'График работы': 'balance'
                },
                {
                    'Фамилия': '2023-06-15 Чт',
                    'Должность': 'position5',
                    'Подразделение': 'division5',
                    'Отсутствие': '08:00',
                    'График работы': 'balance'
                },
                {
                    'Фамилия': '2023-06-16 Пт',
                    'Должность': 'position5',
                    'Подразделение': 'division5',
                    'График работы': 'balance'
                },
                {
                    'Фамилия': '2023-06-17 Сб',
                    'Должность': 'position5',
                    'Подразделение': 'division5',
                    'Отсутствие': '06:00',
                    'График работы': 'balance'
                },
                {
                    'Фамилия': '2023-06-18 Вс',
                    'Должность': 'position5',
                    'Подразделение': 'division5',
                    'Отсутствие': '08:00',
                    'График работы': 'balance'
                },
                {
                    'Фамилия': '2023-06-19 Пн',
                    'Должность': 'position5',
                    'Подразделение': 'division5',
                    'Отсутствие': '08:00',
                    'График работы': 'balance'
                },
                {
                    'Фамилия': '2023-06-20 Вт',
                    'Должность': 'position5',
                    'Подразделение': 'division5',
                    'Отсутствие': '08:00',
                    'График работы': 'balance'
                },
                {
                    'Фамилия': '2023-06-21 Ср',
                    'Должность': 'position5',
                    'Подразделение': 'division5',
                    'Отсутствие': '08:00',
                    'График работы': 'balance'
                },
                {
                    'Фамилия': '2023-06-22 Чт',
                    'Должность': 'position5',
                    'Подразделение': 'division5',
                    'Отсутствие': '08:00',
                    'График работы': 'balance'
                },
                {
                    'Фамилия': '2023-06-23 Пт',
                    'Должность': 'position5',
                    'Подразделение': 'division5',
                    'Отсутствие': '08:00',
                    'График работы': 'balance'
                },
                {
                    'Фамилия': '2023-06-24 Сб',
                    'Должность': 'position5',
                    'Подразделение': 'division5',
                    'Отсутствие': '08:00',
                    'График работы': 'balance'
                },
                {
                    'Фамилия': '2023-06-25 Вс',
                    'Должность': 'position5',
                    'Подразделение': 'division5',
                    'Отсутствие': '08:00',
                    'График работы': 'balance'
                },
                {
                    'Фамилия': '2023-06-26 Пн',
                    'Должность': 'position5',
                    'Подразделение': 'division5',
                    'Отсутствие': '08:00',
                    'График работы': 'balance'
                },
                {
                    'Фамилия': '2023-06-27 Вт',
                    'Должность': 'position5',
                    'Подразделение': 'division5',
                    'Отсутствие': '08:00',
                    'График работы': 'balance'
                },
                {
                    'Фамилия': '2023-06-28 Ср',
                    'Должность': 'position5',
                    'Подразделение': 'division5',
                    'Отсутствие': '08:00',
                    'График работы': 'balance'
                },
                {
                    'Фамилия': '2023-06-29 Чт',
                    'Должность': 'position5',
                    'Подразделение': 'division5',
                    'Отсутствие': '08:00',
                    'График работы': 'balance'
                },
                {
                    'Фамилия': '2023-06-30 Пт',
                    'Должность': 'position5',
                    'Подразделение': 'division5',
                    'Отсутствие': '08:00',
                    'График работы': 'balance'
                },
                {
                    'Фамилия': 'staff',
                    'Имя': 'name',
                    'Отчество': 6,
                    'Табельный номер': 6,
                    'Должность': 'position6',
                    'Подразделение': 'division6',
                    'Присутствие': '09:00',
                    'Рабочее время': '08:00',
                    'Отсутствие': '232:00',
                    'Работа в ночное время': '01:00',
                    'Баланс отработанного времени': '-232:00',
                    'График работы': 'week_2'
                },
                {
                    'Фамилия': '2023-06-01 Чт',
                    'Должность': 'position6',
                    'Подразделение': 'division6',
                    'Присутствие': '09:00',
                    'Рабочее время': '08:00',
                    'Работа в ночное время': '01:00',
                    'График работы': 'week_2'
                },
                {
                    'Фамилия': '2023-06-02 Пт',
                    'Должность': 'position6',
                    'Подразделение': 'division6',
                    'Отсутствие': '08:00',
                    'Баланс отработанного времени': '-08:00',
                    'График работы': 'week_2'
                },
                {
                    'Фамилия': '2023-06-03 Сб',
                    'Должность': 'position6',
                    'Подразделение': 'division6',
                    'Отсутствие': '08:00',
                    'Баланс отработанного времени': '-08:00',
                    'График работы': 'week_2'
                },
                {
                    'Фамилия': '2023-06-04 Вс',
                    'Должность': 'position6',
                    'Подразделение': 'division6',
                    'Отсутствие': '08:00',
                    'Баланс отработанного времени': '-08:00',
                    'График работы': 'week_2'
                },
                {
                    'Фамилия': '2023-06-05 Пн',
                    'Должность': 'position6',
                    'Подразделение': 'division6',
                    'Отсутствие': '08:00',
                    'Баланс отработанного времени': '-08:00',
                    'График работы': 'week_2'
                },
                {
                    'Фамилия': '2023-06-06 Вт',
                    'Должность': 'position6',
                    'Подразделение': 'division6',
                    'Отсутствие': '08:00',
                    'Баланс отработанного времени': '-08:00',
                    'График работы': 'week_2'
                },
                {
                    'Фамилия': '2023-06-07 Ср',
                    'Должность': 'position6',
                    'Подразделение': 'division6',
                    'Отсутствие': '08:00',
                    'Баланс отработанного времени': '-08:00',
                    'График работы': 'week_2'
                },
                {
                    'Фамилия': '2023-06-08 Чт',
                    'Должность': 'position6',
                    'Подразделение': 'division6',
                    'Отсутствие': '08:00',
                    'Баланс отработанного времени': '-08:00',
                    'График работы': 'week_2'
                },
                {
                    'Фамилия': '2023-06-09 Пт',
                    'Должность': 'position6',
                    'Подразделение': 'division6',
                    'Отсутствие': '08:00',
                    'Баланс отработанного времени': '-08:00',
                    'График работы': 'week_2'
                },
                {
                    'Фамилия': '2023-06-10 Сб',
                    'Должность': 'position6',
                    'Подразделение': 'division6',
                    'Отсутствие': '08:00',
                    'Баланс отработанного времени': '-08:00',
                    'График работы': 'week_2'
                },
                {
                    'Фамилия': '2023-06-11 Вс',
                    'Должность': 'position6',
                    'Подразделение': 'division6',
                    'Отсутствие': '08:00',
                    'Баланс отработанного времени': '-08:00',
                    'График работы': 'week_2'
                },
                {
                    'Фамилия': '2023-06-12 Пн',
                    'Должность': 'position6',
                    'Подразделение': 'division6',
                    'Отсутствие': '08:00',
                    'Баланс отработанного времени': '-08:00',
                    'График работы': 'week_2'
                },
                {
                    'Фамилия': '2023-06-13 Вт',
                    'Должность': 'position6',
                    'Подразделение': 'division6',
                    'Отсутствие': '08:00',
                    'Баланс отработанного времени': '-08:00',
                    'График работы': 'week_2'
                },
                {
                    'Фамилия': '2023-06-14 Ср',
                    'Должность': 'position6',
                    'Подразделение': 'division6',
                    'Отсутствие': '08:00',
                    'Баланс отработанного времени': '-08:00',
                    'График работы': 'week_2'
                },
                {
                    'Фамилия': '2023-06-15 Чт',
                    'Должность': 'position6',
                    'Подразделение': 'division6',
                    'Отсутствие': '08:00',
                    'Баланс отработанного времени': '-08:00',
                    'График работы': 'week_2'
                },
                {
                    'Фамилия': '2023-06-16 Пт',
                    'Должность': 'position6',
                    'Подразделение': 'division6',
                    'Отсутствие': '08:00',
                    'Баланс отработанного времени': '-08:00',
                    'График работы': 'week_2'
                },
                {
                    'Фамилия': '2023-06-17 Сб',
                    'Должность': 'position6',
                    'Подразделение': 'division6',
                    'Отсутствие': '08:00',
                    'Баланс отработанного времени': '-08:00',
                    'График работы': 'week_2'
                },
                {
                    'Фамилия': '2023-06-18 Вс',
                    'Должность': 'position6',
                    'Подразделение': 'division6',
                    'Отсутствие': '08:00',
                    'Баланс отработанного времени': '-08:00',
                    'График работы': 'week_2'
                },
                {
                    'Фамилия': '2023-06-19 Пн',
                    'Должность': 'position6',
                    'Подразделение': 'division6',
                    'Отсутствие': '08:00',
                    'Баланс отработанного времени': '-08:00',
                    'График работы': 'week_2'
                },
                {
                    'Фамилия': '2023-06-20 Вт',
                    'Должность': 'position6',
                    'Подразделение': 'division6',
                    'Отсутствие': '08:00',
                    'Баланс отработанного времени': '-08:00',
                    'График работы': 'week_2'
                },
                {
                    'Фамилия': '2023-06-21 Ср',
                    'Должность': 'position6',
                    'Подразделение': 'division6',
                    'Отсутствие': '08:00',
                    'Баланс отработанного времени': '-08:00',
                    'График работы': 'week_2'
                },
                {
                    'Фамилия': '2023-06-22 Чт',
                    'Должность': 'position6',
                    'Подразделение': 'division6',
                    'Отсутствие': '08:00',
                    'Баланс отработанного времени': '-08:00',
                    'График работы': 'week_2'
                },
                {
                    'Фамилия': '2023-06-23 Пт',
                    'Должность': 'position6',
                    'Подразделение': 'division6',
                    'Отсутствие': '08:00',
                    'Баланс отработанного времени': '-08:00',
                    'График работы': 'week_2'
                },
                {
                    'Фамилия': '2023-06-24 Сб',
                    'Должность': 'position6',
                    'Подразделение': 'division6',
                    'Отсутствие': '08:00',
                    'Баланс отработанного времени': '-08:00',
                    'График работы': 'week_2'
                },
                {
                    'Фамилия': '2023-06-25 Вс',
                    'Должность': 'position6',
                    'Подразделение': 'division6',
                    'Отсутствие': '08:00',
                    'Баланс отработанного времени': '-08:00',
                    'График работы': 'week_2'
                },
                {
                    'Фамилия': '2023-06-26 Пн',
                    'Должность': 'position6',
                    'Подразделение': 'division6',
                    'Отсутствие': '08:00',
                    'Баланс отработанного времени': '-08:00',
                    'График работы': 'week_2'
                },
                {
                    'Фамилия': '2023-06-27 Вт',
                    'Должность': 'position6',
                    'Подразделение': 'division6',
                    'Отсутствие': '08:00',
                    'Баланс отработанного времени': '-08:00',
                    'График работы': 'week_2'
                },
                {
                    'Фамилия': '2023-06-28 Ср',
                    'Должность': 'position6',
                    'Подразделение': 'division6',
                    'Отсутствие': '08:00',
                    'Баланс отработанного времени': '-08:00',
                    'График работы': 'week_2'
                },
                {
                    'Фамилия': '2023-06-29 Чт',
                    'Должность': 'position6',
                    'Подразделение': 'division6',
                    'Отсутствие': '08:00',
                    'Баланс отработанного времени': '-08:00',
                    'График работы': 'week_2'
                },
                {
                    'Фамилия': '2023-06-30 Пт',
                    'Должность': 'position6',
                    'Подразделение': 'division6',
                    'Отсутствие': '08:00',
                    'Баланс отработанного времени': '-08:00',
                    'График работы': 'week_2'
                },
                {
                    'Фамилия': 'staff',
                    'Имя': 'name',
                    'Отчество': 7,
                    'Табельный номер': 7,
                    'Должность': 'position7',
                    'Подразделение': 'division7',
                    'Присутствие': '24:00',
                    'Рабочее время': '15:00',
                    'Отсутствие': '336:00',
                    'Работа в ночное время': '01:00',
                    'Баланс отработанного времени': '-336:00',
                    'График работы': 'shift_2'
                },
                {
                    'Фамилия': '2023-06-01 Чт',
                    'Должность': 'position7',
                    'Подразделение': 'division7',
                    'График работы': 'shift_2'
                },
                {
                    'Фамилия': '2023-06-02 Пт',
                    'Должность': 'position7',
                    'Подразделение': 'division7',
                    'Присутствие': '24:00',
                    'Рабочее время': '15:00',
                    'Работа в ночное время': '01:00',
                    'График работы': 'shift_2'
                },
                {
                    'Фамилия': '2023-06-03 Сб',
                    'Должность': 'position7',
                    'Подразделение': 'division7',
                    'График работы': 'shift_2'
                },
                {
                    'Фамилия': '2023-06-04 Вс',
                    'Должность': 'position7',
                    'Подразделение': 'division7',
                    'Отсутствие': '24:00',
                    'Баланс отработанного времени': '-24:00',
                    'График работы': 'shift_2'
                },
                {
                    'Фамилия': '2023-06-05 Пн',
                    'Должность': 'position7',
                    'Подразделение': 'division7',
                    'График работы': 'shift_2'
                },
                {
                    'Фамилия': '2023-06-06 Вт',
                    'Должность': 'position7',
                    'Подразделение': 'division7',
                    'Отсутствие': '24:00',
                    'Баланс отработанного времени': '-24:00',
                    'График работы': 'shift_2'
                },
                {
                    'Фамилия': '2023-06-07 Ср',
                    'Должность': 'position7',
                    'Подразделение': 'division7',
                    'График работы': 'shift_2'
                },
                {
                    'Фамилия': '2023-06-08 Чт',
                    'Должность': 'position7',
                    'Подразделение': 'division7',
                    'Отсутствие': '24:00',
                    'Баланс отработанного времени': '-24:00',
                    'График работы': 'shift_2'
                },
                {
                    'Фамилия': '2023-06-09 Пт',
                    'Должность': 'position7',
                    'Подразделение': 'division7',
                    'График работы': 'shift_2'
                },
                {
                    'Фамилия': '2023-06-10 Сб',
                    'Должность': 'position7',
                    'Подразделение': 'division7',
                    'Отсутствие': '24:00',
                    'Баланс отработанного времени': '-24:00',
                    'График работы': 'shift_2'
                },
                {
                    'Фамилия': '2023-06-11 Вс',
                    'Должность': 'position7',
                    'Подразделение': 'division7',
                    'График работы': 'shift_2'
                },
                {
                    'Фамилия': '2023-06-12 Пн',
                    'Должность': 'position7',
                    'Подразделение': 'division7',
                    'Отсутствие': '24:00',
                    'Баланс отработанного времени': '-24:00',
                    'График работы': 'shift_2'
                },
                {
                    'Фамилия': '2023-06-13 Вт',
                    'Должность': 'position7',
                    'Подразделение': 'division7',
                    'График работы': 'shift_2'
                },
                {
                    'Фамилия': '2023-06-14 Ср',
                    'Должность': 'position7',
                    'Подразделение': 'division7',
                    'Отсутствие': '24:00',
                    'Баланс отработанного времени': '-24:00',
                    'График работы': 'shift_2'
                },
                {
                    'Фамилия': '2023-06-15 Чт',
                    'Должность': 'position7',
                    'Подразделение': 'division7',
                    'График работы': 'shift_2'
                },
                {
                    'Фамилия': '2023-06-16 Пт',
                    'Должность': 'position7',
                    'Подразделение': 'division7',
                    'Отсутствие': '24:00',
                    'Баланс отработанного времени': '-24:00',
                    'График работы': 'shift_2'
                },
                {
                    'Фамилия': '2023-06-17 Сб',
                    'Должность': 'position7',
                    'Подразделение': 'division7',
                    'График работы': 'shift_2'
                },
                {
                    'Фамилия': '2023-06-18 Вс',
                    'Должность': 'position7',
                    'Подразделение': 'division7',
                    'Отсутствие': '24:00',
                    'Баланс отработанного времени': '-24:00',
                    'График работы': 'shift_2'
                },
                {
                    'Фамилия': '2023-06-19 Пн',
                    'Должность': 'position7',
                    'Подразделение': 'division7',
                    'График работы': 'shift_2'
                },
                {
                    'Фамилия': '2023-06-20 Вт',
                    'Должность': 'position7',
                    'Подразделение': 'division7',
                    'Отсутствие': '24:00',
                    'Баланс отработанного времени': '-24:00',
                    'График работы': 'shift_2'
                },
                {
                    'Фамилия': '2023-06-21 Ср',
                    'Должность': 'position7',
                    'Подразделение': 'division7',
                    'График работы': 'shift_2'
                },
                {
                    'Фамилия': '2023-06-22 Чт',
                    'Должность': 'position7',
                    'Подразделение': 'division7',
                    'Отсутствие': '24:00',
                    'Баланс отработанного времени': '-24:00',
                    'График работы': 'shift_2'
                },
                {
                    'Фамилия': '2023-06-23 Пт',
                    'Должность': 'position7',
                    'Подразделение': 'division7',
                    'График работы': 'shift_2'
                },
                {
                    'Фамилия': '2023-06-24 Сб',
                    'Должность': 'position7',
                    'Подразделение': 'division7',
                    'Отсутствие': '24:00',
                    'Баланс отработанного времени': '-24:00',
                    'График работы': 'shift_2'
                },
                {
                    'Фамилия': '2023-06-25 Вс',
                    'Должность': 'position7',
                    'Подразделение': 'division7',
                    'График работы': 'shift_2'
                },
                {
                    'Фамилия': '2023-06-26 Пн',
                    'Должность': 'position7',
                    'Подразделение': 'division7',
                    'Отсутствие': '24:00',
                    'Баланс отработанного времени': '-24:00',
                    'График работы': 'shift_2'
                },
                {
                    'Фамилия': '2023-06-27 Вт',
                    'Должность': 'position7',
                    'Подразделение': 'division7',
                    'График работы': 'shift_2'
                },
                {
                    'Фамилия': '2023-06-28 Ср',
                    'Должность': 'position7',
                    'Подразделение': 'division7',
                    'Отсутствие': '24:00',
                    'Баланс отработанного времени': '-24:00',
                    'График работы': 'shift_2'
                },
                {
                    'Фамилия': '2023-06-29 Чт',
                    'Должность': 'position7',
                    'Подразделение': 'division7',
                    'График работы': 'shift_2'
                },
                {
                    'Фамилия': '2023-06-30 Пт',
                    'Должность': 'position7',
                    'Подразделение': 'division7',
                    'Отсутствие': '24:00',
                    'Баланс отработанного времени': '-24:00',
                    'График работы': 'shift_2'
                },
                {
                    'Фамилия': 'staff',
                    'Имя': 'name',
                    'Отчество': 8,
                    'Табельный номер': 8,
                    'Должность': 'position8',
                    'Подразделение': 'division8',
                    'Присутствие': '09:00',
                    'Рабочее время': '09:00',
                    'Работа в ночное время': '01:00',
                    'График работы': 'attendance_2'
                },
                {
                    'Фамилия': '2023-06-01 Чт',
                    'Должность': 'position8',
                    'Подразделение': 'division8',
                    'Присутствие': '09:00',
                    'Рабочее время': '09:00',
                    'Работа в ночное время': '01:00',
                    'График работы': 'attendance_2'
                },
                {
                    'Фамилия': '2023-06-02 Пт',
                    'Должность': 'position8',
                    'Подразделение': 'division8',
                    'График работы': 'attendance_2'
                },
                {
                    'Фамилия': '2023-06-03 Сб',
                    'Должность': 'position8',
                    'Подразделение': 'division8',
                    'График работы': 'attendance_2'
                },
                {
                    'Фамилия': '2023-06-04 Вс',
                    'Должность': 'position8',
                    'Подразделение': 'division8',
                    'График работы': 'attendance_2'
                },
                {
                    'Фамилия': '2023-06-05 Пн',
                    'Должность': 'position8',
                    'Подразделение': 'division8',
                    'График работы': 'attendance_2'
                },
                {
                    'Фамилия': '2023-06-06 Вт',
                    'Должность': 'position8',
                    'Подразделение': 'division8',
                    'График работы': 'attendance_2'
                },
                {
                    'Фамилия': '2023-06-07 Ср',
                    'Должность': 'position8',
                    'Подразделение': 'division8',
                    'График работы': 'attendance_2'
                },
                {
                    'Фамилия': '2023-06-08 Чт',
                    'Должность': 'position8',
                    'Подразделение': 'division8',
                    'График работы': 'attendance_2'
                },
                {
                    'Фамилия': '2023-06-09 Пт',
                    'Должность': 'position8',
                    'Подразделение': 'division8',
                    'График работы': 'attendance_2'
                },
                {
                    'Фамилия': '2023-06-10 Сб',
                    'Должность': 'position8',
                    'Подразделение': 'division8',
                    'График работы': 'attendance_2'
                },
                {
                    'Фамилия': '2023-06-11 Вс',
                    'Должность': 'position8',
                    'Подразделение': 'division8',
                    'График работы': 'attendance_2'
                },
                {
                    'Фамилия': '2023-06-12 Пн',
                    'Должность': 'position8',
                    'Подразделение': 'division8',
                    'График работы': 'attendance_2'
                },
                {
                    'Фамилия': '2023-06-13 Вт',
                    'Должность': 'position8',
                    'Подразделение': 'division8',
                    'График работы': 'attendance_2'
                },
                {
                    'Фамилия': '2023-06-14 Ср',
                    'Должность': 'position8',
                    'Подразделение': 'division8',
                    'График работы': 'attendance_2'
                },
                {
                    'Фамилия': '2023-06-15 Чт',
                    'Должность': 'position8',
                    'Подразделение': 'division8',
                    'График работы': 'attendance_2'
                },
                {
                    'Фамилия': '2023-06-16 Пт',
                    'Должность': 'position8',
                    'Подразделение': 'division8',
                    'График работы': 'attendance_2'
                },
                {
                    'Фамилия': '2023-06-17 Сб',
                    'Должность': 'position8',
                    'Подразделение': 'division8',
                    'График работы': 'attendance_2'
                },
                {
                    'Фамилия': '2023-06-18 Вс',
                    'Должность': 'position8',
                    'Подразделение': 'division8',
                    'График работы': 'attendance_2'
                },
                {
                    'Фамилия': '2023-06-19 Пн',
                    'Должность': 'position8',
                    'Подразделение': 'division8',
                    'График работы': 'attendance_2'
                },
                {
                    'Фамилия': '2023-06-20 Вт',
                    'Должность': 'position8',
                    'Подразделение': 'division8',
                    'График работы': 'attendance_2'
                },
                {
                    'Фамилия': '2023-06-21 Ср',
                    'Должность': 'position8',
                    'Подразделение': 'division8',
                    'График работы': 'attendance_2'
                },
                {
                    'Фамилия': '2023-06-22 Чт',
                    'Должность': 'position8',
                    'Подразделение': 'division8',
                    'График работы': 'attendance_2'
                },
                {
                    'Фамилия': '2023-06-23 Пт',
                    'Должность': 'position8',
                    'Подразделение': 'division8',
                    'График работы': 'attendance_2'
                },
                {
                    'Фамилия': '2023-06-24 Сб',
                    'Должность': 'position8',
                    'Подразделение': 'division8',
                    'График работы': 'attendance_2'
                },
                {
                    'Фамилия': '2023-06-25 Вс',
                    'Должность': 'position8',
                    'Подразделение': 'division8',
                    'График работы': 'attendance_2'
                },
                {
                    'Фамилия': '2023-06-26 Пн',
                    'Должность': 'position8',
                    'Подразделение': 'division8',
                    'График работы': 'attendance_2'
                },
                {
                    'Фамилия': '2023-06-27 Вт',
                    'Должность': 'position8',
                    'Подразделение': 'division8',
                    'График работы': 'attendance_2'
                },
                {
                    'Фамилия': '2023-06-28 Ср',
                    'Должность': 'position8',
                    'Подразделение': 'division8',
                    'График работы': 'attendance_2'
                },
                {
                    'Фамилия': '2023-06-29 Чт',
                    'Должность': 'position8',
                    'Подразделение': 'division8',
                    'График работы': 'attendance_2'
                },
                {
                    'Фамилия': '2023-06-30 Пт',
                    'Должность': 'position8',
                    'Подразделение': 'division8',
                    'График работы': 'attendance_2'
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

    const documentCalculationWorkedJournal = () => describe('УРВ. Журнал отработанного времени. ' +
        'Добавление оправдатаельных документов и перересчет .', () => {

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

        describe(`Добавление оправдательных документов сотруднику "${data.fio.staff1}"`, () => {

            describe('Добавление оправдательного документа с добавлением рабочего времени', () => {
                describe(`Открытие расчетов по дням`, () => {
                    decorate.el.table.strHandler({
                        strNumber: 1,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.page.workedJournal.staffParams({
                        param: 'Подразделение',
                        value: data.divisions.division1.name,
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.staffParams({
                        param: 'Должность',
                        value: data.positions.position1.name,
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.staffParams({
                        param: 'График работы',
                        value: data.schedules.schedule1.name,
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.staffFIO({
                        value: data.fio.staff1,
                        timeout: entry.max
                    });
                });

                describe('Открытие информации "Оправдательные документы"', () => {
                    decorate.el.simpleCell.handler({
                        name: 'Оправдательные документы',
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.simpleCell.active({
                        name: 'Оправдательные документы',
                        timeout: entry.max
                    });
                });

                describe('Добавить документ', () => {
                    decorate.el.button.handler({
                        name: 'Добавить запись',
                        timeout: entry.max
                    });
                    decorate.modal.documentSupport.init({
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.iconInputClock({
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.timepicker.timepicker({
                        timeout: entry.max
                    });
                    decorate.el.timepicker.hourSendKeys({
                        value: data.documents.document1.hour,
                        timeout: entry.max
                    });
                    decorate.el.timepicker.minuteSendKeys({
                        value: data.documents.document1.minute,
                        timeout: entry.max
                    });
                    decorate.el.input.sendKeys({
                        title: 'Номер документа',
                        placeholder: '',
                        value: data.documents.document1.number,
                        timeout: entry.max
                    });
                    decorate.el.select.iconXpand({
                        title: 'Тип документа',
                        value: 'Оправдательный',
                        text: 'Оправдательный',
                        timeout: entry.max
                    });
                    decorate.el.input.sendKeys({
                        title: 'Код / наименование',
                        placeholder: '',
                        value: data.documents.document1.name,
                        timeout: entry.max
                    });
                    decorate.el.selectXpand.xpand({
                        timeout: entry.max
                    });
                    decorate.el.selectXpand.handler({
                        value: data.documents.document1.name,
                        timeout: entry.max
                    });
                    decorate.el.selectXpand.xpandNoElement({
                        timeout: entry.max
                    });
                    decorate.el.input.iconCalendar({
                        title: 'Дата начала',
                        placeholder: '',
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.datepicker.datepicker({
                        timeout: entry.max
                    });
                    decorate.el.datepicker.daySelect({
                        day: 4,
                        timeout: entry.max
                    });
                    decorate.el.datepicker.datepickerNoElement({
                        timeout: entry.max
                    });
                    decorate.el.input.iconCalendar({
                        title: 'Дата окончания',
                        placeholder: '',
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.datepicker.datepicker({
                        timeout: entry.sleep2
                    });
                    decorate.el.datepicker.daySelect({
                        day: 4,
                        timeout: entry.max
                    });
                    decorate.el.datepicker.datepickerNoElement({
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.button.handler({
                        name: 'Сохранить',
                        timeout: entry.max
                    });
                    decorate.modal.documentSupport.initClose({
                        timeout: entry.max
                    });
                });

                describe('Закрытие расчетов по дням', () => {
                    decorate.el.button.handler({
                        name: 'Закрыть',
                        timeout: entry.max
                    });
                    decorate.el.success.success({
                        text: '"Расчет УРВ запущен"',
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                });
            });

            describe('Добавление оправдательного документа без добавления рабочего времени', () => {

                describe(`Открытие расчетов по дням`, () => {
                    decorate.el.table.strHandler({
                        strNumber: 1,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.page.workedJournal.staffParams({
                        param: 'Подразделение',
                        value: data.divisions.division1.name,
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.staffParams({
                        param: 'Должность',
                        value: data.positions.position1.name,
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.staffParams({
                        param: 'График работы',
                        value: data.schedules.schedule1.name,
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.staffFIO({
                        value: data.fio.staff1,
                        timeout: entry.max
                    });
                });

                describe('Открытие информации "Оправдательные документы"', () => {
                    decorate.el.simpleCell.handler({
                        name: 'Оправдательные документы',
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.simpleCell.active({
                        name: 'Оправдательные документы',
                        timeout: entry.max
                    });
                });

                describe('Добавить документ', () => {
                    decorate.el.button.handler({
                        name: 'Добавить запись',
                        timeout: entry.max
                    });
                    decorate.modal.documentSupport.init({
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.iconInputClock({
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.timepicker.timepicker({
                        timeout: entry.max
                    });
                    decorate.el.timepicker.hourSendKeys({
                        value: data.documents.document2.hour,
                        timeout: entry.max
                    });
                    decorate.el.timepicker.minuteSendKeys({
                        value: data.documents.document2.minute,
                        timeout: entry.max
                    });
                    decorate.el.input.sendKeys({
                        title: 'Номер документа',
                        placeholder: '',
                        value: data.documents.document2.number,
                        timeout: entry.max
                    });
                    decorate.el.select.iconXpand({
                        title: 'Тип документа',
                        value: 'Оправдательный',
                        text: 'Оправдательный',
                        timeout: entry.max
                    });
                    decorate.el.selectInput.iconXpand({
                        title: 'Код / наименование',
                        placeholder: '',
                        timeout: entry.max
                    });
                    decorate.el.selectXpand.xpand({
                        timeout: entry.max
                    });
                    decorate.el.selectXpand.handler({
                        value: data.documents.document2.name,
                        timeout: entry.max
                    });
                    decorate.el.selectXpand.xpandNoElement({
                        timeout: entry.max
                    });
                    decorate.el.input.iconCalendar({
                        title: 'Дата начала',
                        placeholder: '',
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.datepicker.datepicker({
                        timeout: entry.sleep2
                    });
                    decorate.el.datepicker.daySelect({
                        day: 6,
                        timeout: entry.max
                    });
                    decorate.el.datepicker.datepickerNoElement({
                        timeout: entry.max
                    });
                    decorate.el.input.iconCalendar({
                        title: 'Дата окончания',
                        placeholder: '',
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.datepicker.datepicker({
                        timeout: entry.max
                    });
                    decorate.el.datepicker.daySelect({
                        day: 6,
                        timeout: entry.max
                    });
                    decorate.el.datepicker.datepickerNoElement({
                        timeout: entry.max
                    });
                    decorate.el.button.handler({
                        name: 'Сохранить',
                        timeout: entry.max
                    });
                    decorate.el.success.success({
                        text: '"Расчет УРВ запущен"',
                        timeout: entry.max
                    });
                    decorate.modal.documentSupport.initClose({
                        timeout: entry.max
                    });
                });

                describe('Закрытие расчетов по дням', () => {
                    decorate.el.button.handler({
                        name: 'Закрыть',
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                });
            });

            describe('Добавление сверхурочного документа', () => {

                describe(`Открытие расчетов по дням`, () => {
                    decorate.el.table.strHandler({
                        strNumber: 1,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.page.workedJournal.staffParams({
                        param: 'Подразделение',
                        value: data.divisions.division1.name,
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.staffParams({
                        param: 'Должность',
                        value: data.positions.position1.name,
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.staffParams({
                        param: 'График работы',
                        value: data.schedules.schedule1.name,
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.staffFIO({
                        value: data.fio.staff1,
                        timeout: entry.max
                    });
                });

                describe('Открытие информации "Оправдательные документы"', () => {
                    decorate.el.simpleCell.handler({
                        name: 'Оправдательные документы',
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.simpleCell.active({
                        name: 'Оправдательные документы',
                        timeout: entry.max
                    });
                });

                describe('Добавить документ', () => {
                    decorate.el.button.handler({
                        name: 'Добавить запись',
                        timeout: entry.max
                    });
                    decorate.modal.documentSupport.init({
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.iconInputClock({
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.timepicker.timepicker({
                        timeout: entry.max
                    });
                    decorate.el.timepicker.hourSendKeys({
                        value: data.documents.document3.hour,
                        timeout: entry.max
                    });
                    decorate.el.timepicker.minuteSendKeys({
                        value: data.documents.document3.minute,
                        timeout: entry.max
                    });
                    decorate.el.input.sendKeys({
                        title: 'Номер документа',
                        placeholder: '',
                        value: data.documents.document3.number,
                        timeout: entry.max
                    });
                    decorate.el.select.iconXpand({
                        title: 'Тип документа',
                        value: 'Оправдательный',
                        text: 'Сверхурочный',
                        timeout: entry.max
                    });
                    decorate.el.selectInput.iconXpand({
                        title: 'Код / наименование',
                        placeholder: '',
                        timeout: entry.max
                    });
                    decorate.el.selectXpand.xpand({
                        timeout: entry.max
                    });
                    decorate.el.selectXpand.handler({
                        value: data.documents.document3.name,
                        timeout: entry.max
                    });
                    decorate.el.selectXpand.xpandNoElement({
                        timeout: entry.max
                    });
                    decorate.el.input.iconCalendar({
                        title: 'Дата начала',
                        placeholder: '',
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.datepicker.datepicker({
                        timeout: entry.sleep2
                    });
                    decorate.el.datepicker.daySelect({
                        day: 10,
                        timeout: entry.max
                    });
                    decorate.el.datepicker.datepickerNoElement({
                        timeout: entry.max
                    });
                    decorate.el.button.handler({
                        name: 'Сохранить',
                        timeout: entry.max
                    });
                    decorate.modal.documentSupport.initClose({
                        timeout: entry.max
                    });
                });

                describe('Закрытие расчетов по дням', () => {
                    decorate.el.button.handler({
                        name: 'Закрыть',
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                });
            });

        });

        describe(`Добавление оправдательных документов сотруднику "${data.fio.staff2}"`, () => {

            describe('Добавление оправдательного документа с добавлением рабочего времени', () => {
                describe(`Открытие расчетов по дням`, () => {
                    decorate.el.table.strHandler({
                        strNumber: 2,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.page.workedJournal.staffParams({
                        param: 'Подразделение',
                        value: data.divisions.division2.name,
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.staffParams({
                        param: 'Должность',
                        value: data.positions.position2.name,
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.staffParams({
                        param: 'График работы',
                        value: data.schedules.schedule2.name,
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.staffFIO({
                        value: data.fio.staff2,
                        timeout: entry.max
                    });
                });

                describe('Открытие информации "Оправдательные документы"', () => {
                    decorate.el.simpleCell.handler({
                        name: 'Оправдательные документы',
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.simpleCell.active({
                        name: 'Оправдательные документы',
                        timeout: entry.max
                    });
                });

                describe('Добавить документ', () => {
                    decorate.el.button.handler({
                        name: 'Добавить запись',
                        timeout: entry.max
                    });
                    decorate.modal.documentSupport.init({
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.iconInputClock({
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.timepicker.timepicker({
                        timeout: entry.max
                    });
                    decorate.el.timepicker.hourSendKeys({
                        value: data.documents.document1.hour,
                        timeout: entry.max
                    });
                    decorate.el.timepicker.minuteSendKeys({
                        value: data.documents.document1.minute,
                        timeout: entry.max
                    });
                    decorate.el.input.sendKeys({
                        title: 'Номер документа',
                        placeholder: '',
                        value: data.documents.document1.number,
                        timeout: entry.max
                    });
                    decorate.el.select.iconXpand({
                        title: 'Тип документа',
                        value: 'Оправдательный',
                        text: 'Оправдательный',
                        timeout: entry.max
                    });
                    decorate.el.input.sendKeys({
                        title: 'Код / наименование',
                        placeholder: '',
                        value: data.documents.document1.name,
                        timeout: entry.max
                    });
                    decorate.el.selectXpand.xpand({
                        timeout: entry.max
                    });
                    decorate.el.selectXpand.handler({
                        value: data.documents.document1.name,
                        timeout: entry.max
                    });
                    decorate.el.selectXpand.xpandNoElement({
                        timeout: entry.max
                    });
                    decorate.el.input.iconCalendar({
                        title: 'Дата начала',
                        placeholder: '',
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.datepicker.datepicker({
                        timeout: entry.max
                    });
                    decorate.el.datepicker.daySelect({
                        day: 6,
                        timeout: entry.max
                    });
                    decorate.el.datepicker.datepickerNoElement({
                        timeout: entry.max
                    });
                    decorate.el.input.iconCalendar({
                        title: 'Дата окончания',
                        placeholder: '',
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.datepicker.datepicker({
                        timeout: entry.sleep2
                    });
                    decorate.el.datepicker.daySelect({
                        day: 6,
                        timeout: entry.max
                    });
                    decorate.el.datepicker.datepickerNoElement({
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.button.handler({
                        name: 'Сохранить',
                        timeout: entry.max
                    });
                    decorate.modal.documentSupport.initClose({
                        timeout: entry.max
                    });
                });

                describe('Закрытие расчетов по дням', () => {
                    decorate.el.button.handler({
                        name: 'Закрыть',
                        timeout: entry.max
                    });
                    decorate.el.success.success({
                        text: '"Расчет УРВ запущен"',
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                });
            });

            describe('Добавление оправдательного документа без добавления рабочего времени', () => {

                describe(`Открытие расчетов по дням`, () => {
                    decorate.el.table.strHandler({
                        strNumber: 2,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.page.workedJournal.staffParams({
                        param: 'Подразделение',
                        value: data.divisions.division2.name,
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.staffParams({
                        param: 'Должность',
                        value: data.positions.position2.name,
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.staffParams({
                        param: 'График работы',
                        value: data.schedules.schedule2.name,
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.staffFIO({
                        value: data.fio.staff2,
                        timeout: entry.max
                    });
                });

                describe('Открытие информации "Оправдательные документы"', () => {
                    decorate.el.simpleCell.handler({
                        name: 'Оправдательные документы',
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.simpleCell.active({
                        name: 'Оправдательные документы',
                        timeout: entry.max
                    });
                });

                describe('Добавить документ', () => {
                    decorate.el.button.handler({
                        name: 'Добавить запись',
                        timeout: entry.max
                    });
                    decorate.modal.documentSupport.init({
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.iconInputClock({
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.timepicker.timepicker({
                        timeout: entry.max
                    });
                    decorate.el.timepicker.hourSendKeys({
                        value: data.documents.document2.hour,
                        timeout: entry.max
                    });
                    decorate.el.timepicker.minuteSendKeys({
                        value: data.documents.document2.minute,
                        timeout: entry.max
                    });
                    decorate.el.input.sendKeys({
                        title: 'Номер документа',
                        placeholder: '',
                        value: data.documents.document2.number,
                        timeout: entry.max
                    });
                    decorate.el.select.iconXpand({
                        title: 'Тип документа',
                        value: 'Оправдательный',
                        text: 'Оправдательный',
                        timeout: entry.max
                    });
                    decorate.el.selectInput.iconXpand({
                        title: 'Код / наименование',
                        placeholder: '',
                        timeout: entry.max
                    });
                    decorate.el.selectXpand.xpand({
                        timeout: entry.max
                    });
                    decorate.el.selectXpand.handler({
                        value: data.documents.document2.name,
                        timeout: entry.max
                    });
                    decorate.el.selectXpand.xpandNoElement({
                        timeout: entry.max
                    });
                    decorate.el.input.iconCalendar({
                        title: 'Дата начала',
                        placeholder: '',
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.datepicker.datepicker({
                        timeout: entry.sleep2
                    });
                    decorate.el.datepicker.daySelect({
                        day: 10,
                        timeout: entry.max
                    });
                    decorate.el.datepicker.datepickerNoElement({
                        timeout: entry.max
                    });
                    decorate.el.input.iconCalendar({
                        title: 'Дата окончания',
                        placeholder: '',
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.datepicker.datepicker({
                        timeout: entry.max
                    });
                    decorate.el.datepicker.daySelect({
                        day: 10,
                        timeout: entry.max
                    });
                    decorate.el.datepicker.datepickerNoElement({
                        timeout: entry.max
                    });
                    decorate.el.button.handler({
                        name: 'Сохранить',
                        timeout: entry.max
                    });
                    decorate.el.success.success({
                        text: '"Расчет УРВ запущен"',
                        timeout: entry.max
                    });
                    decorate.modal.documentSupport.initClose({
                        timeout: entry.max
                    });
                });

                describe('Закрытие расчетов по дням', () => {
                    decorate.el.button.handler({
                        name: 'Закрыть',
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                });
            });

            describe('Добавление сверхурочного документа', () => {

                describe(`Открытие расчетов по дням`, () => {
                    decorate.el.table.strHandler({
                        strNumber: 2,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.page.workedJournal.staffParams({
                        param: 'Подразделение',
                        value: data.divisions.division2.name,
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.staffParams({
                        param: 'Должность',
                        value: data.positions.position2.name,
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.staffParams({
                        param: 'График работы',
                        value: data.schedules.schedule2.name,
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.staffFIO({
                        value: data.fio.staff2,
                        timeout: entry.max
                    });
                });

                describe('Открытие информации "Оправдательные документы"', () => {
                    decorate.el.simpleCell.handler({
                        name: 'Оправдательные документы',
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.simpleCell.active({
                        name: 'Оправдательные документы',
                        timeout: entry.max
                    });
                });

                describe('Добавить документ', () => {
                    decorate.el.button.handler({
                        name: 'Добавить запись',
                        timeout: entry.max
                    });
                    decorate.modal.documentSupport.init({
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.iconInputClock({
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.timepicker.timepicker({
                        timeout: entry.max
                    });
                    decorate.el.timepicker.hourSendKeys({
                        value: data.documents.document3.hour,
                        timeout: entry.max
                    });
                    decorate.el.timepicker.minuteSendKeys({
                        value: data.documents.document3.minute,
                        timeout: entry.max
                    });
                    decorate.el.input.sendKeys({
                        title: 'Номер документа',
                        placeholder: '',
                        value: data.documents.document3.number,
                        timeout: entry.max
                    });
                    decorate.el.select.iconXpand({
                        title: 'Тип документа',
                        value: 'Оправдательный',
                        text: 'Сверхурочный',
                        timeout: entry.max
                    });
                    decorate.el.selectInput.iconXpand({
                        title: 'Код / наименование',
                        placeholder: '',
                        timeout: entry.max
                    });
                    decorate.el.selectXpand.xpand({
                        timeout: entry.max
                    });
                    decorate.el.selectXpand.handler({
                        value: data.documents.document3.name,
                        timeout: entry.max
                    });
                    decorate.el.selectXpand.xpandNoElement({
                        timeout: entry.max
                    });
                    decorate.el.input.iconCalendar({
                        title: 'Дата начала',
                        placeholder: '',
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.datepicker.datepicker({
                        timeout: entry.sleep2
                    });
                    decorate.el.datepicker.daySelect({
                        day: 18,
                        timeout: entry.max
                    });
                    decorate.el.datepicker.datepickerNoElement({
                        timeout: entry.max
                    });
                    decorate.el.button.handler({
                        name: 'Сохранить',
                        timeout: entry.max
                    });
                    decorate.modal.documentSupport.initClose({
                        timeout: entry.max
                    });
                });

                describe('Закрытие расчетов по дням', () => {
                    decorate.el.button.handler({
                        name: 'Закрыть',
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                });
            });

        });

        describe(`Добавление оправдательных документов сотруднику "${data.fio.staff4}"`, () => {

            describe('Добавление оправдательного документа через фунционал Задолженности', () => {
                describe(`Открытие расчетов по дням`, () => {
                    decorate.el.table.strHandler({
                        strNumber: 4,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.page.workedJournal.staffParams({
                        param: 'Подразделение',
                        value: data.divisions.division4.name,
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.staffParams({
                        param: 'Должность',
                        value: data.positions.position4.name,
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.staffParams({
                        param: 'График работы',
                        value: data.schedules.schedule4.name,
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.staffFIO({
                        value: data.fio.staff4,
                        timeout: entry.max
                    });
                });

                describe('Открытие информации "Задолженности"', () => {
                    decorate.el.simpleCell.handler({
                        name: 'Задолженности',
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.simpleCell.active({
                        name: 'Задолженности',
                        timeout: entry.max
                    });
                });

                describe('Добавить документ', () => {
                    decorate.page.workedJournal.docCheckboxHandler({
                        strNumber: 1,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.page.workedJournal.docCheckboxHandler({
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
                    decorate.el.button.handler({
                        name: 'Погасить задолженность',
                        timeout: entry.max
                    });
                    decorate.el.success.success({
                        text: 'Операция успешно завершена',
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                });

                describe('Закрытие расчетов по дням', () => {
                    decorate.el.button.handler({
                        name: 'Закрыть',
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                });
            });

            describe('Добавление сверхурочного документа', () => {

                describe(`Открытие расчетов по дням`, () => {
                    decorate.el.table.strHandler({
                        strNumber: 4,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.page.workedJournal.staffParams({
                        param: 'Подразделение',
                        value: data.divisions.division4.name,
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.staffParams({
                        param: 'Должность',
                        value: data.positions.position4.name,
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.staffParams({
                        param: 'График работы',
                        value: data.schedules.schedule4.name,
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.staffFIO({
                        value: data.fio.staff4,
                        timeout: entry.max
                    });
                });

                describe('Открытие информации "Оправдательные документы"', () => {
                    decorate.el.simpleCell.handler({
                        name: 'Оправдательные документы',
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.simpleCell.active({
                        name: 'Оправдательные документы',
                        timeout: entry.max
                    });
                });

                describe('Добавить документ', () => {
                    decorate.el.button.handler({
                        name: 'Добавить запись',
                        timeout: entry.max
                    });
                    decorate.modal.documentSupport.init({
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.iconInputClock({
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.timepicker.timepicker({
                        timeout: entry.max
                    });
                    decorate.el.timepicker.hourSendKeys({
                        value: data.documents.document3.hour,
                        timeout: entry.max
                    });
                    decorate.el.timepicker.minuteSendKeys({
                        value: data.documents.document3.minute,
                        timeout: entry.max
                    });
                    decorate.el.input.sendKeys({
                        title: 'Номер документа',
                        placeholder: '',
                        value: data.documents.document3.number,
                        timeout: entry.max
                    });
                    decorate.el.select.iconXpand({
                        title: 'Тип документа',
                        value: 'Оправдательный',
                        text: 'Сверхурочный',
                        timeout: entry.max
                    });
                    decorate.el.selectInput.iconXpand({
                        title: 'Код / наименование',
                        placeholder: '',
                        timeout: entry.max
                    });
                    decorate.el.selectXpand.xpand({
                        timeout: entry.max
                    });
                    decorate.el.selectXpand.handler({
                        value: data.documents.document3.name,
                        timeout: entry.max
                    });
                    decorate.el.selectXpand.xpandNoElement({
                        timeout: entry.max
                    });
                    decorate.el.input.iconCalendar({
                        title: 'Дата начала',
                        placeholder: '',
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.datepicker.datepicker({
                        timeout: entry.sleep2
                    });
                    decorate.el.datepicker.daySelect({
                        day: 11,
                        timeout: entry.max
                    });
                    decorate.el.datepicker.datepickerNoElement({
                        timeout: entry.max
                    });
                    decorate.el.button.handler({
                        name: 'Сохранить',
                        timeout: entry.max
                    });
                    decorate.modal.documentSupport.initClose({
                        timeout: entry.max
                    });
                });

                describe('Закрытие расчетов по дням', () => {
                    decorate.el.button.handler({
                        name: 'Закрыть',
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                });
            });

        });

        describe(`Добавление оправдательных документов сотруднику "${data.fio.staff5}" `, () => {

            describe('Добавление оправдательного документа через фунционал Задолженности', () => {
                describe(`Открытие расчетов по дням`, () => {
                    decorate.el.table.strHandler({
                        strNumber: 5,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.page.workedJournal.staffParams({
                        param: 'Подразделение',
                        value: data.divisions.division5.name,
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.staffParams({
                        param: 'Должность',
                        value: data.positions.position5.name,
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.staffParams({
                        param: 'График работы',
                        value: data.schedules.schedule5.name,
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.staffFIO({
                        value: data.fio.staff5,
                        timeout: entry.max
                    });
                });

                describe('Открытие информации "Задолженности"', () => {
                    decorate.el.simpleCell.handler({
                        name: 'Задолженности',
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.simpleCell.active({
                        name: 'Задолженности',
                        timeout: entry.max
                    });
                });

                describe('Добавить документ', () => {
                    decorate.page.workedJournal.docCheckboxHandler({
                        strNumber: 1,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.page.workedJournal.docCheckboxHandler({
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
                    decorate.el.button.handler({
                        name: 'Погасить задолженность',
                        timeout: entry.max
                    });
                    decorate.el.success.success({
                        text: 'Операция успешно завершена',
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                });

                describe('Закрытие расчетов по дням', () => {
                    decorate.el.button.handler({
                        name: 'Закрыть',
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                });
            });

            describe('Добавление сверхурочного документа', () => {

                describe(`Открытие расчетов по дням`, () => {
                    decorate.el.table.strHandler({
                        strNumber: 5,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.page.workedJournal.staffParams({
                        param: 'Подразделение',
                        value: data.divisions.division5.name,
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.staffParams({
                        param: 'Должность',
                        value: data.positions.position5.name,
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.staffParams({
                        param: 'График работы',
                        value: data.schedules.schedule5.name,
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.staffFIO({
                        value: data.fio.staff5,
                        timeout: entry.max
                    });
                });

                describe('Открытие информации "Оправдательные документы"', () => {
                    decorate.el.simpleCell.handler({
                        name: 'Оправдательные документы',
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.simpleCell.active({
                        name: 'Оправдательные документы',
                        timeout: entry.max
                    });
                });

                describe('Добавить документ', () => {
                    decorate.el.button.handler({
                        name: 'Добавить запись',
                        timeout: entry.max
                    });
                    decorate.modal.documentSupport.init({
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.iconInputClock({
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.timepicker.timepicker({
                        timeout: entry.max
                    });
                    decorate.el.timepicker.hourSendKeys({
                        value: data.documents.document3.hour,
                        timeout: entry.max
                    });
                    decorate.el.timepicker.minuteSendKeys({
                        value: data.documents.document3.minute,
                        timeout: entry.max
                    });
                    decorate.el.input.sendKeys({
                        title: 'Номер документа',
                        placeholder: '',
                        value: data.documents.document3.number,
                        timeout: entry.max
                    });
                    decorate.el.select.iconXpand({
                        title: 'Тип документа',
                        value: 'Оправдательный',
                        text: 'Сверхурочный',
                        timeout: entry.max
                    });
                    decorate.el.selectInput.iconXpand({
                        title: 'Код / наименование',
                        placeholder: '',
                        timeout: entry.max
                    });
                    decorate.el.selectXpand.xpand({
                        timeout: entry.max
                    });
                    decorate.el.selectXpand.handler({
                        value: data.documents.document3.name,
                        timeout: entry.max
                    });
                    decorate.el.selectXpand.xpandNoElement({
                        timeout: entry.max
                    });
                    decorate.el.input.iconCalendar({
                        title: 'Дата начала',
                        placeholder: '',
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.datepicker.datepicker({
                        timeout: entry.sleep2
                    });
                    decorate.el.datepicker.daySelect({
                        day: 2,
                        timeout: entry.max
                    });
                    decorate.el.datepicker.datepickerNoElement({
                        timeout: entry.max
                    });
                    decorate.el.button.handler({
                        name: 'Сохранить',
                        timeout: entry.max
                    });
                    decorate.modal.documentSupport.initClose({
                        timeout: entry.max
                    });
                });

                describe('Закрытие расчетов по дням', () => {
                    decorate.el.button.handler({
                        name: 'Закрыть',
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                });
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

        describe('Проверка изменения таблицы и расчетов.', () => {

            describe('Проверка строки 1', () => {
                decorate.el.table.cellNoIconWarn({
                    strNumber: 1,
                    cellNumber: 1,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Табельный номер',
                    strNumber: 1,
                    cellNumber: 2,
                    value: data.staffs.staff1.tabel_number,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Должность',
                    strNumber: 1,
                    cellNumber: 3,
                    value: data.positions.position1.name,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Сотрудники',
                    strNumber: 1,
                    cellNumber: 4,
                    value: data.fio.staff1,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Подразделение',
                    strNumber: 1,
                    cellNumber: 5,
                    value: data.divisions.division1.name,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Присутствие',
                    strNumber: 1,
                    cellNumber: 6,
                    value: '86:54',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Рабочее время',
                    strNumber: 1,
                    cellNumber: 7,
                    value: '79:56',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Отсутствие',
                    strNumber: 1,
                    cellNumber: 8,
                    value: '140:04',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Задолженность',
                    strNumber: 1,
                    cellNumber: 9,
                    value: '',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Непогашаемая задолженность',
                    strNumber: 1,
                    cellNumber: 10,
                    value: '',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Работа в ночное время',
                    strNumber: 1,
                    cellNumber: 11,
                    value: '10:00',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Переработка',
                    strNumber: 1,
                    cellNumber: 12,
                    value: '00:02',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Баланс отработанного времени',
                    strNumber: 1,
                    cellNumber: 13,
                    value: '-140:02',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Оправдательные документы с добавлением рабочего времени',
                    strNumber: 1,
                    cellNumber: 14,
                    value: '00:02',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Документы без добавления времени / Сверхурочные',
                    strNumber: 1,
                    cellNumber: 15,
                    value: '00:02/00:02',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'График работы',
                    strNumber: 1,
                    cellNumber: 16,
                    value: data.schedules.schedule1.name,
                    timeout: entry.max
                });
            });

            describe('Проверка строки 2', () => {
                decorate.el.table.cellNoIconWarn({
                    strNumber: 2,
                    cellNumber: 1,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Табельный номер',
                    strNumber: 2,
                    cellNumber: 2,
                    value: data.staffs.staff2.tabel_number,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Должность',
                    strNumber: 2,
                    cellNumber: 3,
                    value: data.positions.position2.name,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Сотрудники',
                    strNumber: 2,
                    cellNumber: 4,
                    value: data.fio.staff2,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Подразделение',
                    strNumber: 2,
                    cellNumber: 5,
                    value: data.divisions.division2.name,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Присутствие',
                    strNumber: 2,
                    cellNumber: 6,
                    value: '296:54',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Рабочее время',
                    strNumber: 2,
                    cellNumber: 7,
                    value: '215:58',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Отсутствие',
                    strNumber: 2,
                    cellNumber: 8,
                    value: '144:02',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Задолженность',
                    strNumber: 2,
                    cellNumber: 9,
                    value: '',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Непогашаемая задолженность',
                    strNumber: 2,
                    cellNumber: 10,
                    value: '',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Работа в ночное время',
                    strNumber: 2,
                    cellNumber: 11,
                    value: '18:00',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Переработка',
                    strNumber: 2,
                    cellNumber: 12,
                    value: '00:02',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Баланс отработанного времени',
                    strNumber: 2,
                    cellNumber: 13,
                    value: '-144:02',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Оправдательные документы с добавлением рабочего времени',
                    strNumber: 2,
                    cellNumber: 14,
                    value: '00:02',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Документы без добавления времени / Сверхурочные',
                    strNumber: 2,
                    cellNumber: 15,
                    value: '00:02/00:02',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'График работы',
                    strNumber: 2,
                    cellNumber: 16,
                    value: data.schedules.schedule2.name,
                    timeout: entry.max
                });
            });

            describe('Проверка строки 4', () => {
                decorate.el.table.cellNoIconWarn({
                    strNumber: 4,
                    cellNumber: 1,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Табельный номер',
                    strNumber: 4,
                    cellNumber: 2,
                    value: data.staffs.staff4.tabel_number,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Должность',
                    strNumber: 4,
                    cellNumber: 3,
                    value: data.positions.position4.name,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Сотрудники',
                    strNumber: 4,
                    cellNumber: 4,
                    value: data.fio.staff4,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Подразделение',
                    strNumber: 4,
                    cellNumber: 5,
                    value: data.divisions.division4.name,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Присутствие',
                    strNumber: 4,
                    cellNumber: 6,
                    value: '94:52',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Рабочее время',
                    strNumber: 4,
                    cellNumber: 7,
                    value: '87:56',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Отсутствие',
                    strNumber: 4,
                    cellNumber: 8,
                    value: '132:04',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Задолженность',
                    strNumber: 4,
                    cellNumber: 9,
                    value: '00:04',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Непогашаемая задолженность',
                    strNumber: 4,
                    cellNumber: 10,
                    value: '',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Работа в ночное время',
                    strNumber: 4,
                    cellNumber: 11,
                    value: '11:00',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Переработка',
                    strNumber: 4,
                    cellNumber: 12,
                    value: '00:02',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Баланс отработанного времени',
                    strNumber: 4,
                    cellNumber: 13,
                    value: '-00:04',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Оправдательные документы с добавлением рабочего времени',
                    strNumber: 4,
                    cellNumber: 14,
                    value: '',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Документы без добавления времени / Сверхурочные',
                    strNumber: 4,
                    cellNumber: 15,
                    value: '00:04/00:02',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'График работы',
                    strNumber: 4,
                    cellNumber: 16,
                    value: data.schedules.schedule4.name,
                    timeout: entry.max
                });
            });

            describe('Проверка строки 5', () => {
                decorate.el.table.cellNoIconWarn({
                    strNumber: 5,
                    cellNumber: 1,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Табельный номер',
                    strNumber: 5,
                    cellNumber: 2,
                    value: data.staffs.staff5.tabel_number,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Должность',
                    strNumber: 5,
                    cellNumber: 3,
                    value: data.positions.position5.name,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Сотрудники',
                    strNumber: 5,
                    cellNumber: 4,
                    value: data.fio.staff5,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Подразделение',
                    strNumber: 5,
                    cellNumber: 5,
                    value: data.divisions.division5.name,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Присутствие',
                    strNumber: 5,
                    cellNumber: 6,
                    value: '68:54',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Рабочее время',
                    strNumber: 5,
                    cellNumber: 7,
                    value: '63:55',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Отсутствие',
                    strNumber: 5,
                    cellNumber: 8,
                    value: '156:05',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Задолженность',
                    strNumber: 5,
                    cellNumber: 9,
                    value: '00:04',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Непогашаемая задолженность',
                    strNumber: 5,
                    cellNumber: 10,
                    value: '00:03',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Работа в ночное время',
                    strNumber: 5,
                    cellNumber: 11,
                    value: '08:00',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Переработка',
                    strNumber: 5,
                    cellNumber: 12,
                    value: '00:02',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Баланс отработанного времени',
                    strNumber: 5,
                    cellNumber: 13,
                    value: '-00:04',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Оправдательные документы с добавлением рабочего времени',
                    strNumber: 5,
                    cellNumber: 14,
                    value: '',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Документы без добавления времени / Сверхурочные',
                    strNumber: 5,
                    cellNumber: 15,
                    value: '00:03/00:02',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'График работы',
                    strNumber: 5,
                    cellNumber: 16,
                    value: data.schedules.schedule5.name,
                    timeout: entry.max
                });
            });

            describe(`Проверка расчетов по дням у сотрудника "${data.fio.staff1}"`, () => {
                describe('Открытие расчетов по дням', () => {
                    decorate.el.table.strHandler({
                        strNumber: 1,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.page.workedJournal.staffParams({
                        param: 'Подразделение',
                        value: data.divisions.division1.name,
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.staffParams({
                        param: 'Должность',
                        value: data.positions.position1.name,
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.staffParams({
                        param: 'График работы',
                        value: data.schedules.schedule1.name,
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.staffFIO({
                        value: data.fio.staff1,
                        timeout: entry.max
                    });
                });

                describe('Проверка день 4', () => {
                    decorate.page.workedJournal.tableCellGetText({
                        headTitle: 'Дата',
                        strNumber: 4,
                        cellNumber: 1,
                        value: '2023-06-04 Вс',
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.tableCellGetText({
                        headTitle: 'Присутствие',
                        strNumber: 4,
                        cellNumber: 2,
                        value: '08:58',
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.tableCellGetText({
                        headTitle: 'Рабочее время',
                        strNumber: 4,
                        cellNumber: 3,
                        value: '08:00',
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.tableCellGetText({
                        headTitle: 'Отсутствие',
                        strNumber: 4,
                        cellNumber: 4,
                        value: '',
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.tableCellGetText({
                        headTitle: 'Задолженность',
                        strNumber: 4,
                        cellNumber: 5,
                        value: '',
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.tableCellGetText({
                        headTitle: 'Непогашаемая задолженность',
                        strNumber: 4,
                        cellNumber: 6,
                        value: '',
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.tableCellGetText({
                        headTitle: 'Работа в ночное время',
                        strNumber: 4,
                        cellNumber: 7,
                        value: '01:00',
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.tableCellGetText({
                        headTitle: 'Переработка',
                        strNumber: 4,
                        cellNumber: 8,
                        value: '',
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.tableCellGetText({
                        headTitle: 'Баланс отработанного времени',
                        strNumber: 4,
                        cellNumber: 9,
                        value: '',
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.tableCellGetText({
                        headTitle: 'Оправдательные документы с добавлением рабочего времени',
                        strNumber: 4,
                        cellNumber: 10,
                        value: '00:02',
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.tableCellGetText({
                        headTitle: 'Документы без добавления времени / Сверхурочные',
                        strNumber: 4,
                        cellNumber: 11,
                        value: '',
                        timeout: entry.max
                    });
                });

                describe('Проверка день 6', () => {
                    decorate.page.workedJournal.tableCellGetText({
                        headTitle: 'Дата',
                        strNumber: 6,
                        cellNumber: 1,
                        value: '2023-06-06 Вт',
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.tableCellGetText({
                        headTitle: 'Присутствие',
                        strNumber: 6,
                        cellNumber: 2,
                        value: '08:58',
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.tableCellGetText({
                        headTitle: 'Рабочее время',
                        strNumber: 6,
                        cellNumber: 3,
                        value: '07:58',
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.tableCellGetText({
                        headTitle: 'Отсутствие',
                        strNumber: 6,
                        cellNumber: 4,
                        value: '00:02',
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.tableCellGetText({
                        headTitle: 'Задолженность',
                        strNumber: 6,
                        cellNumber: 5,
                        value: '',
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.tableCellGetText({
                        headTitle: 'Непогашаемая задолженность',
                        strNumber: 6,
                        cellNumber: 6,
                        value: '',
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.tableCellGetText({
                        headTitle: 'Работа в ночное время',
                        strNumber: 6,
                        cellNumber: 7,
                        value: '01:00',
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.tableCellGetText({
                        headTitle: 'Переработка',
                        strNumber: 6,
                        cellNumber: 8,
                        value: '',
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.tableCellGetText({
                        headTitle: 'Баланс отработанного времени',
                        strNumber: 6,
                        cellNumber: 9,
                        value: '',
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.tableCellGetText({
                        headTitle: 'Оправдательные документы с добавлением рабочего времени',
                        strNumber: 6,
                        cellNumber: 10,
                        value: '',
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.tableCellGetText({
                        headTitle: 'Документы без добавления времени / Сверхурочные',
                        strNumber: 6,
                        cellNumber: 11,
                        value: '00:02',
                        timeout: entry.max
                    });
                });

                describe('Проверка день 10', () => {
                    decorate.page.workedJournal.tableCellGetText({
                        headTitle: 'Дата',
                        strNumber: 10,
                        cellNumber: 1,
                        value: '2023-06-10 Сб',
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.tableCellGetText({
                        headTitle: 'Присутствие',
                        strNumber: 10,
                        cellNumber: 2,
                        value: '09:02',
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.tableCellGetText({
                        headTitle: 'Рабочее время',
                        strNumber: 10,
                        cellNumber: 3,
                        value: '08:00',
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.tableCellGetText({
                        headTitle: 'Отсутствие',
                        strNumber: 10,
                        cellNumber: 4,
                        value: '',
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.tableCellGetText({
                        headTitle: 'Задолженность',
                        strNumber: 10,
                        cellNumber: 5,
                        value: '',
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.tableCellGetText({
                        headTitle: 'Непогашаемая задолженность',
                        strNumber: 10,
                        cellNumber: 6,
                        value: '',
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.tableCellGetText({
                        headTitle: 'Работа в ночное время',
                        strNumber: 10,
                        cellNumber: 7,
                        value: '01:00',
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.tableCellGetText({
                        headTitle: 'Переработка',
                        strNumber: 10,
                        cellNumber: 8,
                        value: '00:02',
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.tableCellGetText({
                        headTitle: 'Баланс отработанного времени',
                        strNumber: 10,
                        cellNumber: 9,
                        value: '00:02',
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.tableCellGetText({
                        headTitle: 'Оправдательные документы с добавлением рабочего времени',
                        strNumber: 10,
                        cellNumber: 10,
                        value: '',
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.tableCellGetText({
                        headTitle: 'Документы без добавления времени / Сверхурочные',
                        strNumber: 10,
                        cellNumber: 11,
                        value: '/00:02',
                        timeout: entry.max
                    });
                });

                describe('Проверка "Оправдательные документы"', () => {
                    describe('Открытие информации "Оправдательные документы"', () => {
                        decorate.el.simpleCell.handler({
                            name: 'Оправдательные документы',
                            timeout: entry.max
                        });
                        decorate.el.simpleCell.active({
                            name: 'Оправдательные документы',
                            timeout: entry.max
                        });
                    });

                    describe('Проверка строки 1', () => {
                        decorate.page.workedJournal.docTableCellGetText({
                            headTitle: '№',
                            strNumber: 1,
                            cellNumber: 1,
                            value: data.documents.document1.number,
                            timeout: entry.max
                        });
                        decorate.page.workedJournal.docTableCellGetText({
                            headTitle: 'Тип',
                            strNumber: 1,
                            cellNumber: 2,
                            value: 'Оправдательный',
                            timeout: entry.max
                        });
                        decorate.page.workedJournal.docTableCellGetText({
                            headTitle: 'Наименование',
                            strNumber: 1,
                            cellNumber: 3,
                            value: data.documents.document1.name,
                            timeout: entry.max
                        });
                        decorate.page.workedJournal.docTableCellGetText({
                            headTitle: 'Продолжительность',
                            strNumber: 1,
                            cellNumber: 4,
                            value: data.documents.document1.hour + ':' + data.documents.document1.minute + ':00',
                            timeout: entry.max
                        });
                        decorate.page.workedJournal.docTableCellGetText({
                            headTitle: 'Дата документа',
                            strNumber: 1,
                            cellNumber: 5,
                            value: data.today,
                            timeout: entry.max
                        });
                        decorate.page.workedJournal.docTableCellGetText({
                            headTitle: 'Начало действия',
                            strNumber: 1,
                            cellNumber: 6,
                            value: '2023-06-04',
                            timeout: entry.max
                        });
                        decorate.page.workedJournal.docTableCellGetText({
                            headTitle: 'Конец действия',
                            strNumber: 1,
                            cellNumber: 7,
                            value: '2023-06-04',
                            timeout: entry.max
                        });

                    });

                    describe('Проверка строки 2', () => {
                        decorate.page.workedJournal.docTableCellGetText({
                            headTitle: '№',
                            strNumber: 2,
                            cellNumber: 1,
                            value: data.documents.document2.number,
                            timeout: entry.max
                        });
                        decorate.page.workedJournal.docTableCellGetText({
                            headTitle: 'Тип',
                            strNumber: 2,
                            cellNumber: 2,
                            value: 'Оправдательный',
                            timeout: entry.max
                        });
                        decorate.page.workedJournal.docTableCellGetText({
                            headTitle: 'Наименование',
                            strNumber: 2,
                            cellNumber: 3,
                            value: data.documents.document2.name,
                            timeout: entry.max
                        });
                        decorate.page.workedJournal.docTableCellGetText({
                            headTitle: 'Продолжительность',
                            strNumber: 2,
                            cellNumber: 4,
                            value: data.documents.document2.hour + ':' + data.documents.document2.minute + ':00',
                            timeout: entry.max
                        });
                        decorate.page.workedJournal.docTableCellGetText({
                            headTitle: 'Дата документа',
                            strNumber: 2,
                            cellNumber: 5,
                            value: data.today,
                            timeout: entry.max
                        });
                        decorate.page.workedJournal.docTableCellGetText({
                            headTitle: 'Начало действия',
                            strNumber: 2,
                            cellNumber: 6,
                            value: '2023-06-06',
                            timeout: entry.max
                        });
                        decorate.page.workedJournal.docTableCellGetText({
                            headTitle: 'Конец действия',
                            strNumber: 2,
                            cellNumber: 7,
                            value: '2023-06-06',
                            timeout: entry.max
                        });

                    });

                    describe('Проверка строки 3', () => {
                        decorate.page.workedJournal.docTableCellGetText({
                            headTitle: '№',
                            strNumber: 3,
                            cellNumber: 1,
                            value: data.documents.document3.number,
                            timeout: entry.max
                        });
                        decorate.page.workedJournal.docTableCellGetText({
                            headTitle: 'Тип',
                            strNumber: 3,
                            cellNumber: 2,
                            value: 'Сверхурочный',
                            timeout: entry.max
                        });
                        decorate.page.workedJournal.docTableCellGetText({
                            headTitle: 'Наименование',
                            strNumber: 3,
                            cellNumber: 3,
                            value: data.documents.document3.name,
                            timeout: entry.max
                        });
                        decorate.page.workedJournal.docTableCellGetText({
                            headTitle: 'Продолжительность',
                            strNumber: 3,
                            cellNumber: 4,
                            value: data.documents.document3.hour + ':' + data.documents.document3.minute + ':00',
                            timeout: entry.max
                        });
                        decorate.page.workedJournal.docTableCellGetText({
                            headTitle: 'Дата документа',
                            strNumber: 3,
                            cellNumber: 5,
                            value: data.today,
                            timeout: entry.max
                        });
                        decorate.page.workedJournal.docTableCellGetText({
                            headTitle: 'Начало действия',
                            strNumber: 3,
                            cellNumber: 6,
                            value: '2023-06-10',
                            timeout: entry.max
                        });
                        decorate.page.workedJournal.docTableCellGetText({
                            headTitle: 'Конец действия',
                            strNumber: 3,
                            cellNumber: 7,
                            value: '2023-06-10',
                            timeout: entry.max
                        });

                    });
                });

                describe('Закрытие расчетов по дням', () => {
                    decorate.el.button.handler({
                        name: 'Закрыть',
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                });
            });

            describe(`Проверка расчетов по дням у сотрудника "${data.fio.staff2}"`, () => {
                describe('Открытие расчетов по дням', () => {
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.table.strHandler({
                        strNumber: 2,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.page.workedJournal.staffParams({
                        param: 'Подразделение',
                        value: data.divisions.division2.name,
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.staffParams({
                        param: 'Должность',
                        value: data.positions.position2.name,
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.staffParams({
                        param: 'График работы',
                        value: data.schedules.schedule2.name,
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.staffFIO({
                        value: data.fio.staff2,
                        timeout: entry.max
                    });
                });

                describe('Проверка день 6', () => {
                    decorate.page.workedJournal.tableCellGetText({
                        headTitle: 'Дата',
                        strNumber: 6,
                        cellNumber: 1,
                        value: '2023-06-06 Вт',
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.tableCellGetText({
                        headTitle: 'Присутствие',
                        strNumber: 6,
                        cellNumber: 2,
                        value: '32:58',
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.tableCellGetText({
                        headTitle: 'Рабочее время',
                        strNumber: 6,
                        cellNumber: 3,
                        value: '24:00',
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.tableCellGetText({
                        headTitle: 'Отсутствие',
                        strNumber: 6,
                        cellNumber: 4,
                        value: '',
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.tableCellGetText({
                        headTitle: 'Задолженность',
                        strNumber: 6,
                        cellNumber: 5,
                        value: '',
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.tableCellGetText({
                        headTitle: 'Непогашаемая задолженность',
                        strNumber: 6,
                        cellNumber: 6,
                        value: '',
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.tableCellGetText({
                        headTitle: 'Работа в ночное время',
                        strNumber: 6,
                        cellNumber: 7,
                        value: '02:00',
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.tableCellGetText({
                        headTitle: 'Переработка',
                        strNumber: 6,
                        cellNumber: 8,
                        value: '',
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.tableCellGetText({
                        headTitle: 'Баланс отработанного времени',
                        strNumber: 6,
                        cellNumber: 9,
                        value: '',
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.tableCellGetText({
                        headTitle: 'Оправдательные документы с добавлением рабочего времени',
                        strNumber: 6,
                        cellNumber: 10,
                        value: '00:02',
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.tableCellGetText({
                        headTitle: 'Документы без добавления времени / Сверхурочные',
                        strNumber: 6,
                        cellNumber: 11,
                        value: '',
                        timeout: entry.max
                    });
                });

                describe('Проверка день 10', () => {
                    decorate.page.workedJournal.tableCellGetText({
                        headTitle: 'Дата',
                        strNumber: 10,
                        cellNumber: 1,
                        value: '2023-06-10 Сб',
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.tableCellGetText({
                        headTitle: 'Присутствие',
                        strNumber: 10,
                        cellNumber: 2,
                        value: '32:58',
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.tableCellGetText({
                        headTitle: 'Рабочее время',
                        strNumber: 10,
                        cellNumber: 3,
                        value: '23:58',
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.tableCellGetText({
                        headTitle: 'Отсутствие',
                        strNumber: 10,
                        cellNumber: 4,
                        value: '00:02',
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.tableCellGetText({
                        headTitle: 'Задолженность',
                        strNumber: 10,
                        cellNumber: 5,
                        value: '',
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.tableCellGetText({
                        headTitle: 'Непогашаемая задолженность',
                        strNumber: 10,
                        cellNumber: 6,
                        value: '',
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.tableCellGetText({
                        headTitle: 'Работа в ночное время',
                        strNumber: 10,
                        cellNumber: 7,
                        value: '02:00',
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.tableCellGetText({
                        headTitle: 'Переработка',
                        strNumber: 10,
                        cellNumber: 8,
                        value: '',
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.tableCellGetText({
                        headTitle: 'Баланс отработанного времени',
                        strNumber: 10,
                        cellNumber: 9,
                        value: '',
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.tableCellGetText({
                        headTitle: 'Оправдательные документы с добавлением рабочего времени',
                        strNumber: 10,
                        cellNumber: 10,
                        value: '',
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.tableCellGetText({
                        headTitle: 'Документы без добавления времени / Сверхурочные',
                        strNumber: 10,
                        cellNumber: 11,
                        value: '00:02',
                        timeout: entry.max
                    });
                });

                describe('Проверка день 18', () => {
                    decorate.page.workedJournal.tableCellGetText({
                        headTitle: 'Дата',
                        strNumber: 18,
                        cellNumber: 1,
                        value: '2023-06-18 Вс',
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.tableCellGetText({
                        headTitle: 'Присутствие',
                        strNumber: 18,
                        cellNumber: 2,
                        value: '33:02',
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.tableCellGetText({
                        headTitle: 'Рабочее время',
                        strNumber: 18,
                        cellNumber: 3,
                        value: '24:00',
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.tableCellGetText({
                        headTitle: 'Отсутствие',
                        strNumber: 18,
                        cellNumber: 4,
                        value: '',
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.tableCellGetText({
                        headTitle: 'Задолженность',
                        strNumber: 18,
                        cellNumber: 5,
                        value: '',
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.tableCellGetText({
                        headTitle: 'Непогашаемая задолженность',
                        strNumber: 18,
                        cellNumber: 6,
                        value: '',
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.tableCellGetText({
                        headTitle: 'Работа в ночное время',
                        strNumber: 18,
                        cellNumber: 7,
                        value: '02:00',
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.tableCellGetText({
                        headTitle: 'Переработка',
                        strNumber: 18,
                        cellNumber: 8,
                        value: '00:02',
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.tableCellGetText({
                        headTitle: 'Баланс отработанного времени',
                        strNumber: 18,
                        cellNumber: 9,
                        value: '00:02',
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.tableCellGetText({
                        headTitle: 'Оправдательные документы с добавлением рабочего времени',
                        strNumber: 18,
                        cellNumber: 10,
                        value: '',
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.tableCellGetText({
                        headTitle: 'Документы без добавления времени / Сверхурочные',
                        strNumber: 18,
                        cellNumber: 11,
                        value: '/00:02',
                        timeout: entry.max
                    });
                });

                describe('Проверка "Оправдательные документы"', () => {
                    describe('Открытие информации "Оправдательные документы"', () => {
                        decorate.el.simpleCell.handler({
                            name: 'Оправдательные документы',
                            timeout: entry.max
                        });
                        decorate.el.simpleCell.active({
                            name: 'Оправдательные документы',
                            timeout: entry.max
                        });
                    });

                    describe('Проверка строки 1', () => {
                        decorate.page.workedJournal.docTableCellGetText({
                            headTitle: '№',
                            strNumber: 1,
                            cellNumber: 1,
                            value: data.documents.document1.number,
                            timeout: entry.max
                        });
                        decorate.page.workedJournal.docTableCellGetText({
                            headTitle: 'Тип',
                            strNumber: 1,
                            cellNumber: 2,
                            value: 'Оправдательный',
                            timeout: entry.max
                        });
                        decorate.page.workedJournal.docTableCellGetText({
                            headTitle: 'Наименование',
                            strNumber: 1,
                            cellNumber: 3,
                            value: data.documents.document1.name,
                            timeout: entry.max
                        });
                        decorate.page.workedJournal.docTableCellGetText({
                            headTitle: 'Продолжительность',
                            strNumber: 1,
                            cellNumber: 4,
                            value: data.documents.document1.hour + ':' + data.documents.document1.minute + ':00',
                            timeout: entry.max
                        });
                        decorate.page.workedJournal.docTableCellGetText({
                            headTitle: 'Дата документа',
                            strNumber: 1,
                            cellNumber: 5,
                            value: data.today,
                            timeout: entry.max
                        });
                        decorate.page.workedJournal.docTableCellGetText({
                            headTitle: 'Начало действия',
                            strNumber: 1,
                            cellNumber: 6,
                            value: '2023-06-06',
                            timeout: entry.max
                        });
                        decorate.page.workedJournal.docTableCellGetText({
                            headTitle: 'Конец действия',
                            strNumber: 1,
                            cellNumber: 7,
                            value: '2023-06-06',
                            timeout: entry.max
                        });
                    });

                    describe('Проверка строки 2', () => {
                        decorate.page.workedJournal.docTableCellGetText({
                            headTitle: '№',
                            strNumber: 2,
                            cellNumber: 1,
                            value: data.documents.document2.number,
                            timeout: entry.max
                        });
                        decorate.page.workedJournal.docTableCellGetText({
                            headTitle: 'Тип',
                            strNumber: 2,
                            cellNumber: 2,
                            value: 'Оправдательный',
                            timeout: entry.max
                        });
                        decorate.page.workedJournal.docTableCellGetText({
                            headTitle: 'Наименование',
                            strNumber: 2,
                            cellNumber: 3,
                            value: data.documents.document2.name,
                            timeout: entry.max
                        });
                        decorate.page.workedJournal.docTableCellGetText({
                            headTitle: 'Продолжительность',
                            strNumber: 2,
                            cellNumber: 4,
                            value: data.documents.document2.hour + ':' + data.documents.document2.minute + ':00',
                            timeout: entry.max
                        });
                        decorate.page.workedJournal.docTableCellGetText({
                            headTitle: 'Дата документа',
                            strNumber: 2,
                            cellNumber: 5,
                            value: data.today,
                            timeout: entry.max
                        });
                        decorate.page.workedJournal.docTableCellGetText({
                            headTitle: 'Начало действия',
                            strNumber: 2,
                            cellNumber: 6,
                            value: '2023-06-10',
                            timeout: entry.max
                        });
                        decorate.page.workedJournal.docTableCellGetText({
                            headTitle: 'Конец действия',
                            strNumber: 2,
                            cellNumber: 7,
                            value: '2023-06-10',
                            timeout: entry.max
                        });

                    });

                    describe('Проверка строки 3', () => {
                        decorate.page.workedJournal.docTableCellGetText({
                            headTitle: '№',
                            strNumber: 3,
                            cellNumber: 1,
                            value: data.documents.document3.number,
                            timeout: entry.max
                        });
                        decorate.page.workedJournal.docTableCellGetText({
                            headTitle: 'Тип',
                            strNumber: 3,
                            cellNumber: 2,
                            value: 'Сверхурочный',
                            timeout: entry.max
                        });
                        decorate.page.workedJournal.docTableCellGetText({
                            headTitle: 'Наименование',
                            strNumber: 3,
                            cellNumber: 3,
                            value: data.documents.document3.name,
                            timeout: entry.max
                        });
                        decorate.page.workedJournal.docTableCellGetText({
                            headTitle: 'Продолжительность',
                            strNumber: 3,
                            cellNumber: 4,
                            value: data.documents.document3.hour + ':' + data.documents.document3.minute + ':00',
                            timeout: entry.max
                        });
                        decorate.page.workedJournal.docTableCellGetText({
                            headTitle: 'Дата документа',
                            strNumber: 3,
                            cellNumber: 5,
                            value: data.today,
                            timeout: entry.max
                        });
                        decorate.page.workedJournal.docTableCellGetText({
                            headTitle: 'Начало действия',
                            strNumber: 3,
                            cellNumber: 6,
                            value: '2023-06-18',
                            timeout: entry.max
                        });
                        decorate.page.workedJournal.docTableCellGetText({
                            headTitle: 'Конец действия',
                            strNumber: 3,
                            cellNumber: 7,
                            value: '2023-06-18',
                            timeout: entry.max
                        });

                    });
                });

                describe('Закрытие расчетов по дням', () => {
                    decorate.el.button.handler({
                        name: 'Закрыть',
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                });
            });

            describe(`Проверка расчетов по дням у сотрудника "${data.fio.staff4}"`, () => {
                describe('Открытие расчетов по дням', () => {
                    decorate.el.table.strHandler({
                        strNumber: 4,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.page.workedJournal.staffParams({
                        param: 'Подразделение',
                        value: data.divisions.division4.name,
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.staffParams({
                        param: 'Должность',
                        value: data.positions.position4.name,
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.staffParams({
                        param: 'График работы',
                        value: data.schedules.schedule4.name,
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.staffFIO({
                        value: data.fio.staff4,
                        timeout: entry.max
                    });
                });

                describe('Проверка день 4', () => {
                    decorate.page.workedJournal.tableCellGetText({
                        headTitle: 'Дата',
                        strNumber: 4,
                        cellNumber: 1,
                        value: '2023-06-04 Вс',
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.tableCellGetText({
                        headTitle: 'Присутствие',
                        strNumber: 4,
                        cellNumber: 2,
                        value: '08:58',
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.tableCellGetText({
                        headTitle: 'Рабочее время',
                        strNumber: 4,
                        cellNumber: 3,
                        value: '08:00',
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.tableCellGetText({
                        headTitle: 'Отсутствие',
                        strNumber: 4,
                        cellNumber: 4,
                        value: '',
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.tableCellGetText({
                        headTitle: 'Задолженность',
                        strNumber: 4,
                        cellNumber: 5,
                        value: '',
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.tableCellGetText({
                        headTitle: 'Непогашаемая задолженность',
                        strNumber: 4,
                        cellNumber: 6,
                        value: '',
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.tableCellGetText({
                        headTitle: 'Работа в ночное время',
                        strNumber: 4,
                        cellNumber: 7,
                        value: '01:00',
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.tableCellGetText({
                        headTitle: 'Переработка',
                        strNumber: 4,
                        cellNumber: 8,
                        value: '',
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.tableCellGetText({
                        headTitle: 'Баланс отработанного времени',
                        strNumber: 4,
                        cellNumber: 9,
                        value: '',
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.tableCellGetText({
                        headTitle: 'Оправдательные документы с добавлением рабочего времени',
                        strNumber: 4,
                        cellNumber: 10,
                        value: '',
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.tableCellGetText({
                        headTitle: 'Документы без добавления времени / Сверхурочные',
                        strNumber: 4,
                        cellNumber: 11,
                        value: '00:02',
                        timeout: entry.max
                    });
                });

                describe('Проверка день 6', () => {
                    decorate.page.workedJournal.tableCellGetText({
                        headTitle: 'Дата',
                        strNumber: 6,
                        cellNumber: 1,
                        value: '2023-06-06 Вт',
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.tableCellGetText({
                        headTitle: 'Присутствие',
                        strNumber: 6,
                        cellNumber: 2,
                        value: '08:58',
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.tableCellGetText({
                        headTitle: 'Рабочее время',
                        strNumber: 6,
                        cellNumber: 3,
                        value: '08:00',
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.tableCellGetText({
                        headTitle: 'Отсутствие',
                        strNumber: 6,
                        cellNumber: 4,
                        value: '',
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.tableCellGetText({
                        headTitle: 'Задолженность',
                        strNumber: 6,
                        cellNumber: 5,
                        value: '',
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.tableCellGetText({
                        headTitle: 'Непогашаемая задолженность',
                        strNumber: 6,
                        cellNumber: 6,
                        value: '',
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.tableCellGetText({
                        headTitle: 'Работа в ночное время',
                        strNumber: 6,
                        cellNumber: 7,
                        value: '01:00',
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.tableCellGetText({
                        headTitle: 'Переработка',
                        strNumber: 6,
                        cellNumber: 8,
                        value: '',
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.tableCellGetText({
                        headTitle: 'Баланс отработанного времени',
                        strNumber: 6,
                        cellNumber: 9,
                        value: '',
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.tableCellGetText({
                        headTitle: 'Оправдательные документы с добавлением рабочего времени',
                        strNumber: 6,
                        cellNumber: 10,
                        value: '',
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.tableCellGetText({
                        headTitle: 'Документы без добавления времени / Сверхурочные',
                        strNumber: 6,
                        cellNumber: 11,
                        value: '00:02',
                        timeout: entry.max
                    });
                });

                describe('Проверка день 11', () => {
                    decorate.page.workedJournal.tableCellGetText({
                        headTitle: 'Дата',
                        strNumber: 11,
                        cellNumber: 1,
                        value: '2023-06-11 Вс',
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.tableCellGetText({
                        headTitle: 'Присутствие',
                        strNumber: 11,
                        cellNumber: 2,
                        value: '09:02',
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.tableCellGetText({
                        headTitle: 'Рабочее время',
                        strNumber: 11,
                        cellNumber: 3,
                        value: '08:00',
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.tableCellGetText({
                        headTitle: 'Отсутствие',
                        strNumber: 11,
                        cellNumber: 4,
                        value: '',
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.tableCellGetText({
                        headTitle: 'Задолженность',
                        strNumber: 11,
                        cellNumber: 5,
                        value: '',
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.tableCellGetText({
                        headTitle: 'Непогашаемая задолженность',
                        strNumber: 11,
                        cellNumber: 6,
                        value: '',
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.tableCellGetText({
                        headTitle: 'Работа в ночное время',
                        strNumber: 11,
                        cellNumber: 7,
                        value: '01:00',
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.tableCellGetText({
                        headTitle: 'Переработка',
                        strNumber: 11,
                        cellNumber: 8,
                        value: '00:02',
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.tableCellGetText({
                        headTitle: 'Баланс отработанного времени',
                        strNumber: 11,
                        cellNumber: 9,
                        value: '00:02',
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.tableCellGetText({
                        headTitle: 'Оправдательные документы с добавлением рабочего времени',
                        strNumber: 11,
                        cellNumber: 10,
                        value: '',
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.tableCellGetText({
                        headTitle: 'Документы без добавления времени / Сверхурочные',
                        strNumber: 11,
                        cellNumber: 11,
                        value: '/00:02',
                        timeout: entry.max
                    });
                });

                describe('Проверка "Оправдательные документы"', () => {
                    describe('Открытие информации "Оправдательные документы"', () => {
                        decorate.el.simpleCell.handler({
                            name: 'Оправдательные документы',
                            timeout: entry.max
                        });
                        decorate.el.simpleCell.active({
                            name: 'Оправдательные документы',
                            timeout: entry.max
                        });
                    });

                    describe('Проверка строки 1', () => {
                        decorate.page.workedJournal.docTableCellGetText({
                            headTitle: '№',
                            strNumber: 1,
                            cellNumber: 1,
                            value: 'Составной оправдательный документ',
                            timeout: entry.max
                        });
                        decorate.page.workedJournal.docTableCellGetText({
                            headTitle: 'Тип',
                            strNumber: 1,
                            cellNumber: 2,
                            value: 'Оправдательный',
                            timeout: entry.max
                        });
                        decorate.page.workedJournal.docTableCellGetText({
                            headTitle: 'Наименование',
                            strNumber: 1,
                            cellNumber: 3,
                            value: data.documents.document4.name,
                            timeout: entry.max
                        });
                        decorate.page.workedJournal.docTableCellGetText({
                            headTitle: 'Продолжительность',
                            strNumber: 1,
                            cellNumber: 4,
                            value: data.documents.document3.hour + ':' + data.documents.document3.minute + ':00',
                            timeout: entry.max
                        });
                        decorate.page.workedJournal.docTableCellGetText({
                            headTitle: 'Дата документа',
                            strNumber: 1,
                            cellNumber: 5,
                            value: data.today,
                            timeout: entry.max
                        });
                        decorate.page.workedJournal.docTableCellGetText({
                            headTitle: 'Начало действия',
                            strNumber: 1,
                            cellNumber: 6,
                            value: '2023-06-04',
                            timeout: entry.max
                        });
                        decorate.page.workedJournal.docTableCellGetText({
                            headTitle: 'Конец действия',
                            strNumber: 1,
                            cellNumber: 7,
                            value: '2023-06-04',
                            timeout: entry.max
                        });

                    });

                    describe('Проверка строки 2', () => {
                        decorate.page.workedJournal.docTableCellGetText({
                            headTitle: '№',
                            strNumber: 2,
                            cellNumber: 1,
                            value: 'Составной оправдательный документ',
                            timeout: entry.max
                        });
                        decorate.page.workedJournal.docTableCellGetText({
                            headTitle: 'Тип',
                            strNumber: 2,
                            cellNumber: 2,
                            value: 'Оправдательный',
                            timeout: entry.max
                        });
                        decorate.page.workedJournal.docTableCellGetText({
                            headTitle: 'Наименование',
                            strNumber: 2,
                            cellNumber: 3,
                            value: data.documents.document4.name,
                            timeout: entry.max
                        });
                        decorate.page.workedJournal.docTableCellGetText({
                            headTitle: 'Продолжительность',
                            strNumber: 2,
                            cellNumber: 4,
                            value: '00:02:00',
                            timeout: entry.max
                        });
                        decorate.page.workedJournal.docTableCellGetText({
                            headTitle: 'Дата документа',
                            strNumber: 2,
                            cellNumber: 5,
                            value: data.today,
                            timeout: entry.max
                        });
                        decorate.page.workedJournal.docTableCellGetText({
                            headTitle: 'Начало действия',
                            strNumber: 2,
                            cellNumber: 6,
                            value: '2023-06-06',
                            timeout: entry.max
                        });
                        decorate.page.workedJournal.docTableCellGetText({
                            headTitle: 'Конец действия',
                            strNumber: 2,
                            cellNumber: 7,
                            value: '2023-06-06',
                            timeout: entry.max
                        });
                    });

                    describe('Проверка строки 3', () => {
                        decorate.page.workedJournal.docTableCellGetText({
                            headTitle: '№',
                            strNumber: 3,
                            cellNumber: 1,
                            value: data.documents.document3.number,
                            timeout: entry.max
                        });
                        decorate.page.workedJournal.docTableCellGetText({
                            headTitle: 'Тип',
                            strNumber: 3,
                            cellNumber: 2,
                            value: 'Сверхурочный',
                            timeout: entry.max
                        });
                        decorate.page.workedJournal.docTableCellGetText({
                            headTitle: 'Наименование',
                            strNumber: 3,
                            cellNumber: 3,
                            value: data.documents.document3.name,
                            timeout: entry.max
                        });
                        decorate.page.workedJournal.docTableCellGetText({
                            headTitle: 'Продолжительность',
                            strNumber: 3,
                            cellNumber: 4,
                            value: '00:02:00',
                            timeout: entry.max
                        });
                        decorate.page.workedJournal.docTableCellGetText({
                            headTitle: 'Дата документа',
                            strNumber: 3,
                            cellNumber: 5,
                            value: data.today,
                            timeout: entry.max
                        });
                        decorate.page.workedJournal.docTableCellGetText({
                            headTitle: 'Начало действия',
                            strNumber: 3,
                            cellNumber: 6,
                            value: '2023-06-11',
                            timeout: entry.max
                        });
                        decorate.page.workedJournal.docTableCellGetText({
                            headTitle: 'Конец действия',
                            strNumber: 3,
                            cellNumber: 7,
                            value: '2023-06-11',
                            timeout: entry.max
                        });
                    });
                });

                describe('Закрытие расчетов по дням', () => {
                    decorate.el.button.handler({
                        name: 'Закрыть',
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                });
            });

            describe(`Проверка расчетов по дням у сотрудника "${data.fio.staff5}"`, () => {
                describe('Открытие расчетов по дням', () => {
                    decorate.el.table.strHandler({
                        strNumber: 5,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.page.workedJournal.staffParams({
                        param: 'Подразделение',
                        value: data.divisions.division5.name,
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.staffParams({
                        param: 'Должность',
                        value: data.positions.position5.name,
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.staffParams({
                        param: 'График работы',
                        value: data.schedules.schedule5.name,
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.staffFIO({
                        value: data.fio.staff5,
                        timeout: entry.max
                    });
                });

                describe('Проверка день 2', () => {
                    decorate.page.workedJournal.tableCellGetText({
                        headTitle: 'Дата',
                        strNumber: 2,
                        cellNumber: 1,
                        value: '2023-06-02 Пт',
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.tableCellGetText({
                        headTitle: 'Присутствие',
                        strNumber: 2,
                        cellNumber: 2,
                        value: '09:02',
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.tableCellGetText({
                        headTitle: 'Рабочее время',
                        strNumber: 2,
                        cellNumber: 3,
                        value: '08:00',
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.tableCellGetText({
                        headTitle: 'Отсутствие',
                        strNumber: 2,
                        cellNumber: 4,
                        value: '',
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.tableCellGetText({
                        headTitle: 'Задолженность',
                        strNumber: 2,
                        cellNumber: 5,
                        value: '',
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.tableCellGetText({
                        headTitle: 'Непогашаемая задолженность',
                        strNumber: 2,
                        cellNumber: 6,
                        value: '',
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.tableCellGetText({
                        headTitle: 'Работа в ночное время',
                        strNumber: 2,
                        cellNumber: 7,
                        value: '01:00',
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.tableCellGetText({
                        headTitle: 'Переработка',
                        strNumber: 2,
                        cellNumber: 8,
                        value: '00:02',
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.tableCellGetText({
                        headTitle: 'Баланс отработанного времени',
                        strNumber: 2,
                        cellNumber: 9,
                        value: '00:01',
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.tableCellGetText({
                        headTitle: 'Оправдательные документы с добавлением рабочего времени',
                        strNumber: 2,
                        cellNumber: 10,
                        value: '',
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.tableCellGetText({
                        headTitle: 'Документы без добавления времени / Сверхурочные',
                        strNumber: 2,
                        cellNumber: 11,
                        value: '/00:02',
                        timeout: entry.max
                    });
                });

                describe('Проверка день 3', () => {
                    decorate.page.workedJournal.tableCellGetText({
                        headTitle: 'Дата',
                        strNumber: 3,
                        cellNumber: 1,
                        value: '2023-06-03 Сб',
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.tableCellGetText({
                        headTitle: 'Присутствие',
                        strNumber: 3,
                        cellNumber: 2,
                        value: '08:59',
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.tableCellGetText({
                        headTitle: 'Рабочее время',
                        strNumber: 3,
                        cellNumber: 3,
                        value: '08:00',
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.tableCellGetText({
                        headTitle: 'Отсутствие',
                        strNumber: 3,
                        cellNumber: 4,
                        value: '',
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.tableCellGetText({
                        headTitle: 'Задолженность',
                        strNumber: 3,
                        cellNumber: 5,
                        value: '',
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.tableCellGetText({
                        headTitle: 'Непогашаемая задолженность',
                        strNumber: 3,
                        cellNumber: 6,
                        value: '',
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.tableCellGetText({
                        headTitle: 'Работа в ночное время',
                        strNumber: 3,
                        cellNumber: 7,
                        value: '01:00',
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.tableCellGetText({
                        headTitle: 'Переработка',
                        strNumber: 3,
                        cellNumber: 8,
                        value: '',
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.tableCellGetText({
                        headTitle: 'Баланс отработанного времени',
                        strNumber: 3,
                        cellNumber: 9,
                        value: '',
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.tableCellGetText({
                        headTitle: 'Оправдательные документы с добавлением рабочего времени',
                        strNumber: 3,
                        cellNumber: 10,
                        value: '',
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.tableCellGetText({
                        headTitle: 'Документы без добавления времени / Сверхурочные',
                        strNumber: 3,
                        cellNumber: 11,
                        value: '00:01',
                        timeout: entry.max
                    });
                });

                describe('Проверка день 4', () => {
                    decorate.page.workedJournal.tableCellGetText({
                        headTitle: 'Дата',
                        strNumber: 4,
                        cellNumber: 1,
                        value: '2023-06-04 Вс',
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.tableCellGetText({
                        headTitle: 'Присутствие',
                        strNumber: 4,
                        cellNumber: 2,
                        value: '08:58',
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.tableCellGetText({
                        headTitle: 'Рабочее время',
                        strNumber: 4,
                        cellNumber: 3,
                        value: '08:00',
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.tableCellGetText({
                        headTitle: 'Отсутствие',
                        strNumber: 4,
                        cellNumber: 4,
                        value: '',
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.tableCellGetText({
                        headTitle: 'Задолженность',
                        strNumber: 4,
                        cellNumber: 5,
                        value: '',
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.tableCellGetText({
                        headTitle: 'Непогашаемая задолженность',
                        strNumber: 4,
                        cellNumber: 6,
                        value: '',
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.tableCellGetText({
                        headTitle: 'Работа в ночное время',
                        strNumber: 4,
                        cellNumber: 7,
                        value: '01:00',
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.tableCellGetText({
                        headTitle: 'Переработка',
                        strNumber: 4,
                        cellNumber: 8,
                        value: '',
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.tableCellGetText({
                        headTitle: 'Баланс отработанного времени',
                        strNumber: 4,
                        cellNumber: 9,
                        value: '',
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.tableCellGetText({
                        headTitle: 'Оправдательные документы с добавлением рабочего времени',
                        strNumber: 4,
                        cellNumber: 10,
                        value: '',
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.tableCellGetText({
                        headTitle: 'Документы без добавления времени / Сверхурочные',
                        strNumber: 4,
                        cellNumber: 11,
                        value: '00:02',
                        timeout: entry.max
                    });
                });

                describe('Проверка "Оправдательные документы"', () => {
                    describe('Открытие информации "Оправдательные документы"', () => {
                        decorate.el.simpleCell.handler({
                            name: 'Оправдательные документы',
                            timeout: entry.max
                        });
                        decorate.el.simpleCell.active({
                            name: 'Оправдательные документы',
                            timeout: entry.max
                        });
                    });

                    describe('Проверка строки 1', () => {
                        decorate.page.workedJournal.docTableCellGetText({
                            headTitle: '№',
                            strNumber: 1,
                            cellNumber: 1,
                            value: 'Составной оправдательный документ',
                            timeout: entry.max
                        });
                        decorate.page.workedJournal.docTableCellGetText({
                            headTitle: 'Тип',
                            strNumber: 1,
                            cellNumber: 2,
                            value: 'Оправдательный',
                            timeout: entry.max
                        });
                        decorate.page.workedJournal.docTableCellGetText({
                            headTitle: 'Наименование',
                            strNumber: 1,
                            cellNumber: 3,
                            value: data.documents.document4.name,
                            timeout: entry.max
                        });
                        decorate.page.workedJournal.docTableCellGetText({
                            headTitle: 'Продолжительность',
                            strNumber: 1,
                            cellNumber: 4,
                            value: '00:01:00',
                            timeout: entry.max
                        });
                        decorate.page.workedJournal.docTableCellGetText({
                            headTitle: 'Дата документа',
                            strNumber: 1,
                            cellNumber: 5,
                            value: data.today,
                            timeout: entry.max
                        });
                        decorate.page.workedJournal.docTableCellGetText({
                            headTitle: 'Начало действия',
                            strNumber: 1,
                            cellNumber: 6,
                            value: '2023-06-03',
                            timeout: entry.max
                        });
                        decorate.page.workedJournal.docTableCellGetText({
                            headTitle: 'Конец действия',
                            strNumber: 1,
                            cellNumber: 7,
                            value: '2023-06-03',
                            timeout: entry.max
                        });
                    });

                    describe('Проверка строки 2', () => {
                        decorate.page.workedJournal.docTableCellGetText({
                            headTitle: '№',
                            strNumber: 2,
                            cellNumber: 1,
                            value: 'Составной оправдательный документ',
                            timeout: entry.max
                        });
                        decorate.page.workedJournal.docTableCellGetText({
                            headTitle: 'Тип',
                            strNumber: 2,
                            cellNumber: 2,
                            value: 'Оправдательный',
                            timeout: entry.max
                        });
                        decorate.page.workedJournal.docTableCellGetText({
                            headTitle: 'Наименование',
                            strNumber: 2,
                            cellNumber: 3,
                            value: data.documents.document4.name,
                            timeout: entry.max
                        });
                        decorate.page.workedJournal.docTableCellGetText({
                            headTitle: 'Продолжительность',
                            strNumber: 2,
                            cellNumber: 4,
                            value: '00:02:00',
                            timeout: entry.max
                        });
                        decorate.page.workedJournal.docTableCellGetText({
                            headTitle: 'Дата документа',
                            strNumber: 2,
                            cellNumber: 5,
                            value: data.today,
                            timeout: entry.max
                        });
                        decorate.page.workedJournal.docTableCellGetText({
                            headTitle: 'Начало действия',
                            strNumber: 2,
                            cellNumber: 6,
                            value: '2023-06-04',
                            timeout: entry.max
                        });
                        decorate.page.workedJournal.docTableCellGetText({
                            headTitle: 'Конец действия',
                            strNumber: 2,
                            cellNumber: 7,
                            value: '2023-06-04',
                            timeout: entry.max
                        });
                    });

                    describe('Проверка строки 3', () => {
                        decorate.page.workedJournal.docTableCellGetText({
                            headTitle: '№',
                            strNumber: 3,
                            cellNumber: 1,
                            value: data.documents.document3.number,
                            timeout: entry.max
                        });
                        decorate.page.workedJournal.docTableCellGetText({
                            headTitle: 'Тип',
                            strNumber: 3,
                            cellNumber: 2,
                            value: 'Сверхурочный',
                            timeout: entry.max
                        });
                        decorate.page.workedJournal.docTableCellGetText({
                            headTitle: 'Наименование',
                            strNumber: 3,
                            cellNumber: 3,
                            value: data.documents.document3.name,
                            timeout: entry.max
                        });
                        decorate.page.workedJournal.docTableCellGetText({
                            headTitle: 'Продолжительность',
                            strNumber: 3,
                            cellNumber: 4,
                            value: '00:02:00',
                            timeout: entry.max
                        });
                        decorate.page.workedJournal.docTableCellGetText({
                            headTitle: 'Дата документа',
                            strNumber: 3,
                            cellNumber: 5,
                            value: data.today,
                            timeout: entry.max
                        });
                        decorate.page.workedJournal.docTableCellGetText({
                            headTitle: 'Начало действия',
                            strNumber: 3,
                            cellNumber: 6,
                            value: '2023-06-02',
                            timeout: entry.max
                        });
                        decorate.page.workedJournal.docTableCellGetText({
                            headTitle: 'Конец действия',
                            strNumber: 3,
                            cellNumber: 7,
                            value: '2023-06-02',
                            timeout: entry.max
                        });
                    });
                });

                describe('Закрытие расчетов по дням', () => {
                    decorate.el.button.handler({
                        name: 'Закрыть',
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                });
            });
        });
    });

    const deleteCompositeDocumentWorkedJournal = () => describe('УРВ. Журнал отработанного времени. ' +
        'Проверка настройки "Расчет с удалением составных документов".', () => {

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

        describe('Проверка изменения таблицы и расчетов.', () => {

            describe('Проверка строки 4', () => {
                decorate.el.table.cellNoIconWarn({
                    strNumber: 4,
                    cellNumber: 1,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Табельный номер',
                    strNumber: 4,
                    cellNumber: 2,
                    value: data.staffs.staff4.tabel_number,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Должность',
                    strNumber: 4,
                    cellNumber: 3,
                    value: data.positions.position4.name,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Сотрудники',
                    strNumber: 4,
                    cellNumber: 4,
                    value: data.fio.staff4,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Подразделение',
                    strNumber: 4,
                    cellNumber: 5,
                    value: data.divisions.division4.name,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Присутствие',
                    strNumber: 4,
                    cellNumber: 6,
                    value: '94:52',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Рабочее время',
                    strNumber: 4,
                    cellNumber: 7,
                    value: '87:52',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Отсутствие',
                    strNumber: 4,
                    cellNumber: 8,
                    value: '132:08',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Задолженность',
                    strNumber: 4,
                    cellNumber: 9,
                    value: '00:08',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Непогашаемая задолженность',
                    strNumber: 4,
                    cellNumber: 10,
                    value: '',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Работа в ночное время',
                    strNumber: 4,
                    cellNumber: 11,
                    value: '11:00',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Переработка',
                    strNumber: 4,
                    cellNumber: 12,
                    value: '00:02',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Баланс отработанного времени',
                    strNumber: 4,
                    cellNumber: 13,
                    value: '-00:08',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Оправдательные документы с добавлением рабочего времени',
                    strNumber: 4,
                    cellNumber: 14,
                    value: '',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Документы без добавления времени / Сверхурочные',
                    strNumber: 4,
                    cellNumber: 15,
                    value: '/00:02',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'График работы',
                    strNumber: 4,
                    cellNumber: 16,
                    value: data.schedules.schedule4.name,
                    timeout: entry.max
                });
            });

            describe('Проверка строки 5', () => {
                decorate.el.table.cellNoIconWarn({
                    strNumber: 5,
                    cellNumber: 1,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Табельный номер',
                    strNumber: 5,
                    cellNumber: 2,
                    value: data.staffs.staff5.tabel_number,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Должность',
                    strNumber: 5,
                    cellNumber: 3,
                    value: data.positions.position5.name,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Сотрудники',
                    strNumber: 5,
                    cellNumber: 4,
                    value: data.fio.staff5,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Подразделение',
                    strNumber: 5,
                    cellNumber: 5,
                    value: data.divisions.division5.name,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Присутствие',
                    strNumber: 5,
                    cellNumber: 6,
                    value: '68:54',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Рабочее время',
                    strNumber: 5,
                    cellNumber: 7,
                    value: '63:52',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Отсутствие',
                    strNumber: 5,
                    cellNumber: 8,
                    value: '156:08',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Задолженность',
                    strNumber: 5,
                    cellNumber: 9,
                    value: '00:07',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Непогашаемая задолженность',
                    strNumber: 5,
                    cellNumber: 10,
                    value: '00:06',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Работа в ночное время',
                    strNumber: 5,
                    cellNumber: 11,
                    value: '08:00',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Переработка',
                    strNumber: 5,
                    cellNumber: 12,
                    value: '00:02',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Баланс отработанного времени',
                    strNumber: 5,
                    cellNumber: 13,
                    value: '-00:07',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Оправдательные документы с добавлением рабочего времени',
                    strNumber: 5,
                    cellNumber: 14,
                    value: '',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Документы без добавления времени / Сверхурочные',
                    strNumber: 5,
                    cellNumber: 15,
                    value: '/00:02',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'График работы',
                    strNumber: 5,
                    cellNumber: 16,
                    value: data.schedules.schedule5.name,
                    timeout: entry.max
                });
            });

            describe(`Проверка расчетов по дням у сотрудника "${data.fio.staff4}"`, () => {
                describe('Открытие расчетов по дням', () => {
                    decorate.el.table.strHandler({
                        strNumber: 4,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.page.workedJournal.staffParams({
                        param: 'Подразделение',
                        value: data.divisions.division4.name,
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.staffParams({
                        param: 'Должность',
                        value: data.positions.position4.name,
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.staffParams({
                        param: 'График работы',
                        value: data.schedules.schedule4.name,
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.staffFIO({
                        value: data.fio.staff4,
                        timeout: entry.max
                    });
                });

                describe('Проверка день 4', () => {
                    decorate.page.workedJournal.tableCellGetText({
                        headTitle: 'Дата',
                        strNumber: 4,
                        cellNumber: 1,
                        value: '2023-06-04 Вс',
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.tableCellGetText({
                        headTitle: 'Присутствие',
                        strNumber: 4,
                        cellNumber: 2,
                        value: '08:58',
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.tableCellGetText({
                        headTitle: 'Рабочее время',
                        strNumber: 4,
                        cellNumber: 3,
                        value: '07:58',
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.tableCellGetText({
                        headTitle: 'Отсутствие',
                        strNumber: 4,
                        cellNumber: 4,
                        value: '00:02',
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.tableCellGetText({
                        headTitle: 'Задолженность',
                        strNumber: 4,
                        cellNumber: 5,
                        value: '00:02',
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.tableCellGetText({
                        headTitle: 'Непогашаемая задолженность',
                        strNumber: 4,
                        cellNumber: 6,
                        value: '',
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.tableCellGetText({
                        headTitle: 'Работа в ночное время',
                        strNumber: 4,
                        cellNumber: 7,
                        value: '01:00',
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.tableCellGetText({
                        headTitle: 'Переработка',
                        strNumber: 4,
                        cellNumber: 8,
                        value: '',
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.tableCellGetText({
                        headTitle: 'Баланс отработанного времени',
                        strNumber: 4,
                        cellNumber: 9,
                        value: '-00:02',
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.tableCellGetText({
                        headTitle: 'Оправдательные документы с добавлением рабочего времени',
                        strNumber: 4,
                        cellNumber: 10,
                        value: '',
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.tableCellGetText({
                        headTitle: 'Документы без добавления времени / Сверхурочные',
                        strNumber: 4,
                        cellNumber: 11,
                        value: '',
                        timeout: entry.max
                    });
                });

                describe('Проверка день 6', () => {
                    decorate.page.workedJournal.tableCellGetText({
                        headTitle: 'Дата',
                        strNumber: 6,
                        cellNumber: 1,
                        value: '2023-06-06 Вт',
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.tableCellGetText({
                        headTitle: 'Присутствие',
                        strNumber: 6,
                        cellNumber: 2,
                        value: '08:58',
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.tableCellGetText({
                        headTitle: 'Рабочее время',
                        strNumber: 6,
                        cellNumber: 3,
                        value: '07:58',
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.tableCellGetText({
                        headTitle: 'Отсутствие',
                        strNumber: 6,
                        cellNumber: 4,
                        value: '00:02',
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.tableCellGetText({
                        headTitle: 'Задолженность',
                        strNumber: 6,
                        cellNumber: 5,
                        value: '00:02',
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.tableCellGetText({
                        headTitle: 'Непогашаемая задолженность',
                        strNumber: 6,
                        cellNumber: 6,
                        value: '',
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.tableCellGetText({
                        headTitle: 'Работа в ночное время',
                        strNumber: 6,
                        cellNumber: 7,
                        value: '01:00',
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.tableCellGetText({
                        headTitle: 'Переработка',
                        strNumber: 6,
                        cellNumber: 8,
                        value: '',
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.tableCellGetText({
                        headTitle: 'Баланс отработанного времени',
                        strNumber: 6,
                        cellNumber: 9,
                        value: '-00:02',
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.tableCellGetText({
                        headTitle: 'Оправдательные документы с добавлением рабочего времени',
                        strNumber: 6,
                        cellNumber: 10,
                        value: '',
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.tableCellGetText({
                        headTitle: 'Документы без добавления времени / Сверхурочные',
                        strNumber: 6,
                        cellNumber: 11,
                        value: '',
                        timeout: entry.max
                    });
                });

                describe('Проверка день 11', () => {
                    decorate.page.workedJournal.tableCellGetText({
                        headTitle: 'Дата',
                        strNumber: 11,
                        cellNumber: 1,
                        value: '2023-06-11 Вс',
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.tableCellGetText({
                        headTitle: 'Присутствие',
                        strNumber: 11,
                        cellNumber: 2,
                        value: '09:02',
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.tableCellGetText({
                        headTitle: 'Рабочее время',
                        strNumber: 11,
                        cellNumber: 3,
                        value: '08:00',
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.tableCellGetText({
                        headTitle: 'Отсутствие',
                        strNumber: 11,
                        cellNumber: 4,
                        value: '',
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.tableCellGetText({
                        headTitle: 'Задолженность',
                        strNumber: 11,
                        cellNumber: 5,
                        value: '',
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.tableCellGetText({
                        headTitle: 'Непогашаемая задолженность',
                        strNumber: 11,
                        cellNumber: 6,
                        value: '',
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.tableCellGetText({
                        headTitle: 'Работа в ночное время',
                        strNumber: 11,
                        cellNumber: 7,
                        value: '01:00',
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.tableCellGetText({
                        headTitle: 'Переработка',
                        strNumber: 11,
                        cellNumber: 8,
                        value: '00:02',
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.tableCellGetText({
                        headTitle: 'Баланс отработанного времени',
                        strNumber: 11,
                        cellNumber: 9,
                        value: '00:02',
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.tableCellGetText({
                        headTitle: 'Оправдательные документы с добавлением рабочего времени',
                        strNumber: 11,
                        cellNumber: 10,
                        value: '',
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.tableCellGetText({
                        headTitle: 'Документы без добавления времени / Сверхурочные',
                        strNumber: 11,
                        cellNumber: 11,
                        value: '/00:02',
                        timeout: entry.max
                    });
                });

                describe('Проверка "Оправдательные документы"', () => {
                    describe('Открытие информации "Оправдательные документы"', () => {
                        decorate.el.simpleCell.handler({
                            name: 'Оправдательные документы',
                            timeout: entry.max
                        });
                        decorate.el.simpleCell.active({
                            name: 'Оправдательные документы',
                            timeout: entry.max
                        });
                    });

                    describe('Проверка строки 1', () => {
                        decorate.page.workedJournal.docTableCellGetText({
                            headTitle: '№',
                            strNumber: 1,
                            cellNumber: 1,
                            value: data.documents.document3.number,
                            timeout: entry.max
                        });
                        decorate.page.workedJournal.docTableCellGetText({
                            headTitle: 'Тип',
                            strNumber: 1,
                            cellNumber: 2,
                            value: 'Сверхурочный',
                            timeout: entry.max
                        });
                        decorate.page.workedJournal.docTableCellGetText({
                            headTitle: 'Наименование',
                            strNumber: 1,
                            cellNumber: 3,
                            value: data.documents.document3.name,
                            timeout: entry.max
                        });
                        decorate.page.workedJournal.docTableCellGetText({
                            headTitle: 'Продолжительность',
                            strNumber: 1,
                            cellNumber: 4,
                            value: '00:02:00',
                            timeout: entry.max
                        });
                        decorate.page.workedJournal.docTableCellGetText({
                            headTitle: 'Дата документа',
                            strNumber: 1,
                            cellNumber: 5,
                            value: data.today,
                            timeout: entry.max
                        });
                        decorate.page.workedJournal.docTableCellGetText({
                            headTitle: 'Начало действия',
                            strNumber: 1,
                            cellNumber: 6,
                            value: '2023-06-11',
                            timeout: entry.max
                        });
                        decorate.page.workedJournal.docTableCellGetText({
                            headTitle: 'Конец действия',
                            strNumber: 1,
                            cellNumber: 7,
                            value: '2023-06-11',
                            timeout: entry.max
                        });
                    });
                });

                describe('Закрытие расчетов по дням', () => {
                    decorate.el.button.handler({
                        name: 'Закрыть',
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                });
            });

            describe(`Проверка расчетов по дням у сотрудника "${data.fio.staff5}"`, () => {
                describe('Открытие расчетов по дням', () => {
                    decorate.el.table.strHandler({
                        strNumber: 5,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.page.workedJournal.staffParams({
                        param: 'Подразделение',
                        value: data.divisions.division5.name,
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.staffParams({
                        param: 'Должность',
                        value: data.positions.position5.name,
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.staffParams({
                        param: 'График работы',
                        value: data.schedules.schedule5.name,
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.staffFIO({
                        value: data.fio.staff5,
                        timeout: entry.max
                    });
                });

                describe('Проверка день 2', () => {
                    decorate.page.workedJournal.tableCellGetText({
                        headTitle: 'Дата',
                        strNumber: 2,
                        cellNumber: 1,
                        value: '2023-06-02 Пт',
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.tableCellGetText({
                        headTitle: 'Присутствие',
                        strNumber: 2,
                        cellNumber: 2,
                        value: '09:02',
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.tableCellGetText({
                        headTitle: 'Рабочее время',
                        strNumber: 2,
                        cellNumber: 3,
                        value: '08:00',
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.tableCellGetText({
                        headTitle: 'Отсутствие',
                        strNumber: 2,
                        cellNumber: 4,
                        value: '',
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.tableCellGetText({
                        headTitle: 'Задолженность',
                        strNumber: 2,
                        cellNumber: 5,
                        value: '',
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.tableCellGetText({
                        headTitle: 'Непогашаемая задолженность',
                        strNumber: 2,
                        cellNumber: 6,
                        value: '',
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.tableCellGetText({
                        headTitle: 'Работа в ночное время',
                        strNumber: 2,
                        cellNumber: 7,
                        value: '01:00',
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.tableCellGetText({
                        headTitle: 'Переработка',
                        strNumber: 2,
                        cellNumber: 8,
                        value: '00:02',
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.tableCellGetText({
                        headTitle: 'Баланс отработанного времени',
                        strNumber: 2,
                        cellNumber: 9,
                        value: '00:01',
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.tableCellGetText({
                        headTitle: 'Оправдательные документы с добавлением рабочего времени',
                        strNumber: 2,
                        cellNumber: 10,
                        value: '',
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.tableCellGetText({
                        headTitle: 'Документы без добавления времени / Сверхурочные',
                        strNumber: 2,
                        cellNumber: 11,
                        value: '/00:02',
                        timeout: entry.max
                    });
                });

                describe('Проверка день 3', () => {
                    decorate.page.workedJournal.tableCellGetText({
                        headTitle: 'Дата',
                        strNumber: 3,
                        cellNumber: 1,
                        value: '2023-06-03 Сб',
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.tableCellGetText({
                        headTitle: 'Присутствие',
                        strNumber: 3,
                        cellNumber: 2,
                        value: '08:59',
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.tableCellGetText({
                        headTitle: 'Рабочее время',
                        strNumber: 3,
                        cellNumber: 3,
                        value: '07:59',
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.tableCellGetText({
                        headTitle: 'Отсутствие',
                        strNumber: 3,
                        cellNumber: 4,
                        value: '00:01',
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.tableCellGetText({
                        headTitle: 'Задолженность',
                        strNumber: 3,
                        cellNumber: 5,
                        value: '00:00 (00:01)',
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.tableCellGetText({
                        headTitle: 'Непогашаемая задолженность',
                        strNumber: 3,
                        cellNumber: 6,
                        value: '00:01',
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.tableCellGetText({
                        headTitle: 'Работа в ночное время',
                        strNumber: 3,
                        cellNumber: 7,
                        value: '01:00',
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.tableCellGetText({
                        headTitle: 'Переработка',
                        strNumber: 3,
                        cellNumber: 8,
                        value: '',
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.tableCellGetText({
                        headTitle: 'Баланс отработанного времени',
                        strNumber: 3,
                        cellNumber: 9,
                        value: '',
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.tableCellGetText({
                        headTitle: 'Оправдательные документы с добавлением рабочего времени',
                        strNumber: 3,
                        cellNumber: 10,
                        value: '',
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.tableCellGetText({
                        headTitle: 'Документы без добавления времени / Сверхурочные',
                        strNumber: 3,
                        cellNumber: 11,
                        value: '',
                        timeout: entry.max
                    });
                });

                describe('Проверка день 4', () => {
                    decorate.page.workedJournal.tableCellGetText({
                        headTitle: 'Дата',
                        strNumber: 4,
                        cellNumber: 1,
                        value: '2023-06-04 Вс',
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.tableCellGetText({
                        headTitle: 'Присутствие',
                        strNumber: 4,
                        cellNumber: 2,
                        value: '08:58',
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.tableCellGetText({
                        headTitle: 'Рабочее время',
                        strNumber: 4,
                        cellNumber: 3,
                        value: '07:58',
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.tableCellGetText({
                        headTitle: 'Отсутствие',
                        strNumber: 4,
                        cellNumber: 4,
                        value: '00:02',
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.tableCellGetText({
                        headTitle: 'Задолженность',
                        strNumber: 4,
                        cellNumber: 5,
                        value: '00:02',
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.tableCellGetText({
                        headTitle: 'Непогашаемая задолженность',
                        strNumber: 4,
                        cellNumber: 6,
                        value: '00:02',
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.tableCellGetText({
                        headTitle: 'Работа в ночное время',
                        strNumber: 4,
                        cellNumber: 7,
                        value: '01:00',
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.tableCellGetText({
                        headTitle: 'Переработка',
                        strNumber: 4,
                        cellNumber: 8,
                        value: '',
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.tableCellGetText({
                        headTitle: 'Баланс отработанного времени',
                        strNumber: 4,
                        cellNumber: 9,
                        value: '-00:02',
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.tableCellGetText({
                        headTitle: 'Оправдательные документы с добавлением рабочего времени',
                        strNumber: 4,
                        cellNumber: 10,
                        value: '',
                        timeout: entry.max
                    });
                    decorate.page.workedJournal.tableCellGetText({
                        headTitle: 'Документы без добавления времени / Сверхурочные',
                        strNumber: 4,
                        cellNumber: 11,
                        value: '',
                        timeout: entry.max
                    });
                });

                describe('Проверка "Оправдательные документы"', () => {
                    describe('Открытие информации "Оправдательные документы"', () => {
                        decorate.el.simpleCell.handler({
                            name: 'Оправдательные документы',
                            timeout: entry.max
                        });
                        decorate.el.simpleCell.active({
                            name: 'Оправдательные документы',
                            timeout: entry.max
                        });
                    });

                    describe('Проверка строки 1', () => {
                        decorate.page.workedJournal.docTableCellGetText({
                            headTitle: '№',
                            strNumber: 1,
                            cellNumber: 1,
                            value: data.documents.document3.number,
                            timeout: entry.max
                        });
                        decorate.page.workedJournal.docTableCellGetText({
                            headTitle: 'Тип',
                            strNumber: 1,
                            cellNumber: 2,
                            value: 'Сверхурочный',
                            timeout: entry.max
                        });
                        decorate.page.workedJournal.docTableCellGetText({
                            headTitle: 'Наименование',
                            strNumber: 1,
                            cellNumber: 3,
                            value: data.documents.document3.name,
                            timeout: entry.max
                        });
                        decorate.page.workedJournal.docTableCellGetText({
                            headTitle: 'Продолжительность',
                            strNumber: 1,
                            cellNumber: 4,
                            value: '00:02:00',
                            timeout: entry.max
                        });
                        decorate.page.workedJournal.docTableCellGetText({
                            headTitle: 'Дата документа',
                            strNumber: 1,
                            cellNumber: 5,
                            value: data.today,
                            timeout: entry.max
                        });
                        decorate.page.workedJournal.docTableCellGetText({
                            headTitle: 'Начало действия',
                            strNumber: 1,
                            cellNumber: 6,
                            value: '2023-06-02',
                            timeout: entry.max
                        });
                        decorate.page.workedJournal.docTableCellGetText({
                            headTitle: 'Конец действия',
                            strNumber: 1,
                            cellNumber: 7,
                            value: '2023-06-02',
                            timeout: entry.max
                        });
                    });
                });

                describe('Закрытие расчетов по дням', () => {
                    decorate.el.button.handler({
                        name: 'Закрыть',
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
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

    const staffDeptWorkedJournal = () => describe('УРВ. Журнал отработанного времени. Проверка настройки ' +
        '"Показать только сотрудников с задолженностями".', () => {

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
        });

        describe('Проверка расчетов в общей таблицы у всех сотрудников', () => {
            describe('Проверка строки 1', () => {
                decorate.el.table.cellNoIconWarn({
                    strNumber: 1,
                    cellNumber: 1,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Табельный номер',
                    strNumber: 1,
                    cellNumber: 2,
                    value: data.staffs.staff1.tabel_number,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Должность',
                    strNumber: 1,
                    cellNumber: 3,
                    value: data.positions.position1.name,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Сотрудники',
                    strNumber: 1,
                    cellNumber: 4,
                    value: data.fio.staff1,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Подразделение',
                    strNumber: 1,
                    cellNumber: 5,
                    value: data.divisions.division1.name,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Присутствие',
                    strNumber: 1,
                    cellNumber: 6,
                    value: '',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Рабочее время',
                    strNumber: 1,
                    cellNumber: 7,
                    value: '',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Отсутствие',
                    strNumber: 1,
                    cellNumber: 8,
                    value: '',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Задолженность',
                    strNumber: 1,
                    cellNumber: 9,
                    value: '',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Непогашаемая задолженность',
                    strNumber: 1,
                    cellNumber: 10,
                    value: '',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Работа в ночное время',
                    strNumber: 1,
                    cellNumber: 11,
                    value: '',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Переработка',
                    strNumber: 1,
                    cellNumber: 12,
                    value: '',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Баланс отработанного времени',
                    strNumber: 1,
                    cellNumber: 13,
                    value: '',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Оправдательные документы с добавлением рабочего времени',
                    strNumber: 1,
                    cellNumber: 14,
                    value: '',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Документы без добавления времени / Сверхурочные',
                    strNumber: 1,
                    cellNumber: 15,
                    value: '',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'График работы',
                    strNumber: 1,
                    cellNumber: 16,
                    value: '',
                    timeout: entry.max
                });
            });

            describe('Проверка строки 2', () => {
                decorate.el.table.cellNoIconWarn({
                    strNumber: 2,
                    cellNumber: 1,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Табельный номер',
                    strNumber: 2,
                    cellNumber: 2,
                    value: data.staffs.staff2.tabel_number,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Должность',
                    strNumber: 2,
                    cellNumber: 3,
                    value: data.positions.position2.name,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Сотрудники',
                    strNumber: 2,
                    cellNumber: 4,
                    value: data.fio.staff2,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Подразделение',
                    strNumber: 2,
                    cellNumber: 5,
                    value: data.divisions.division2.name,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Присутствие',
                    strNumber: 2,
                    cellNumber: 6,
                    value: '',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Рабочее время',
                    strNumber: 2,
                    cellNumber: 7,
                    value: '',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Отсутствие',
                    strNumber: 2,
                    cellNumber: 8,
                    value: '',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Задолженность',
                    strNumber: 2,
                    cellNumber: 9,
                    value: '',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Непогашаемая задолженность',
                    strNumber: 2,
                    cellNumber: 10,
                    value: '',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Работа в ночное время',
                    strNumber: 2,
                    cellNumber: 11,
                    value: '',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Переработка',
                    strNumber: 2,
                    cellNumber: 12,
                    value: '',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Баланс отработанного времени',
                    strNumber: 2,
                    cellNumber: 13,
                    value: '',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Оправдательные документы с добавлением рабочего времени',
                    strNumber: 2,
                    cellNumber: 14,
                    value: '',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Документы без добавления времени / Сверхурочные',
                    strNumber: 2,
                    cellNumber: 15,
                    value: '',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'График работы',
                    strNumber: 2,
                    cellNumber: 16,
                    value: '',
                    timeout: entry.max
                });
            });

            describe('Проверка строки 3', () => {
                decorate.el.table.cellNoIconWarn({
                    strNumber: 3,
                    cellNumber: 1,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Табельный номер',
                    strNumber: 3,
                    cellNumber: 2,
                    value: data.staffs.staff3.tabel_number,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Должность',
                    strNumber: 3,
                    cellNumber: 3,
                    value: data.positions.position3.name,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Сотрудники',
                    strNumber: 3,
                    cellNumber: 4,
                    value: data.fio.staff3,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Подразделение',
                    strNumber: 3,
                    cellNumber: 5,
                    value: data.divisions.division3.name,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Присутствие',
                    strNumber: 3,
                    cellNumber: 6,
                    value: '',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Рабочее время',
                    strNumber: 3,
                    cellNumber: 7,
                    value: '',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Отсутствие',
                    strNumber: 3,
                    cellNumber: 8,
                    value: '',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Задолженность',
                    strNumber: 3,
                    cellNumber: 9,
                    value: '',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Непогашаемая задолженность',
                    strNumber: 3,
                    cellNumber: 10,
                    value: '',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Работа в ночное время',
                    strNumber: 3,
                    cellNumber: 11,
                    value: '',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Переработка',
                    strNumber: 3,
                    cellNumber: 12,
                    value: '',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Баланс отработанного времени',
                    strNumber: 3,
                    cellNumber: 13,
                    value: '',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Оправдательные документы с добавлением рабочего времени',
                    strNumber: 3,
                    cellNumber: 14,
                    value: '',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Документы без добавления времени / Сверхурочные',
                    strNumber: 3,
                    cellNumber: 15,
                    value: '',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'График работы',
                    strNumber: 3,
                    cellNumber: 16,
                    value: '',
                    timeout: entry.max
                });
            });

            describe('Проверка строки 4', () => {
                decorate.el.table.cellNoIconWarn({
                    strNumber: 4,
                    cellNumber: 1,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Табельный номер',
                    strNumber: 4,
                    cellNumber: 2,
                    value: data.staffs.staff4.tabel_number,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Должность',
                    strNumber: 4,
                    cellNumber: 3,
                    value: data.positions.position4.name,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Сотрудники',
                    strNumber: 4,
                    cellNumber: 4,
                    value: data.fio.staff4,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Подразделение',
                    strNumber: 4,
                    cellNumber: 5,
                    value: data.divisions.division4.name,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Присутствие',
                    strNumber: 4,
                    cellNumber: 6,
                    value: '33:52',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Рабочее время',
                    strNumber: 4,
                    cellNumber: 7,
                    value: '31:52',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Отсутствие',
                    strNumber: 4,
                    cellNumber: 8,
                    value: '00:08',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Задолженность',
                    strNumber: 4,
                    cellNumber: 9,
                    value: '00:08',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Непогашаемая задолженность',
                    strNumber: 4,
                    cellNumber: 10,
                    value: '',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Работа в ночное время',
                    strNumber: 4,
                    cellNumber: 11,
                    value: '04:00',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Переработка',
                    strNumber: 4,
                    cellNumber: 12,
                    value: '',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Баланс отработанного времени',
                    strNumber: 4,
                    cellNumber: 13,
                    value: '-00:08',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Оправдательные документы с добавлением рабочего времени',
                    strNumber: 4,
                    cellNumber: 14,
                    value: '',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Документы без добавления времени / Сверхурочные',
                    strNumber: 4,
                    cellNumber: 15,
                    value: '',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'График работы',
                    strNumber: 4,
                    cellNumber: 16,
                    value: data.schedules.schedule4.name,
                    timeout: entry.max
                });
            });

            describe('Проверка строки 5', () => {
                decorate.el.table.cellNoIconWarn({
                    strNumber: 5,
                    cellNumber: 1,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Табельный номер',
                    strNumber: 5,
                    cellNumber: 2,
                    value: data.staffs.staff5.tabel_number,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Должность',
                    strNumber: 5,
                    cellNumber: 3,
                    value: data.positions.position5.name,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Сотрудники',
                    strNumber: 5,
                    cellNumber: 4,
                    value: data.fio.staff5,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Подразделение',
                    strNumber: 5,
                    cellNumber: 5,
                    value: data.divisions.division5.name,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Присутствие',
                    strNumber: 5,
                    cellNumber: 6,
                    value: '51:52',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Рабочее время',
                    strNumber: 5,
                    cellNumber: 7,
                    value: '47:52',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Отсутствие',
                    strNumber: 5,
                    cellNumber: 8,
                    value: '00:08',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Задолженность',
                    strNumber: 5,
                    cellNumber: 9,
                    value: '00:08',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Непогашаемая задолженность',
                    strNumber: 5,
                    cellNumber: 10,
                    value: '00:06',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Работа в ночное время',
                    strNumber: 5,
                    cellNumber: 11,
                    value: '06:00',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Переработка',
                    strNumber: 5,
                    cellNumber: 12,
                    value: '',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Баланс отработанного времени',
                    strNumber: 5,
                    cellNumber: 13,
                    value: '-00:08',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Оправдательные документы с добавлением рабочего времени',
                    strNumber: 5,
                    cellNumber: 14,
                    value: '',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Документы без добавления времени / Сверхурочные',
                    strNumber: 5,
                    cellNumber: 15,
                    value: '',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'График работы',
                    strNumber: 5,
                    cellNumber: 16,
                    value: data.schedules.schedule5.name,
                    timeout: entry.max
                });
            });

            describe('Проверка строки 6', () => {
                decorate.el.table.cellNoIconWarn({
                    strNumber: 6,
                    cellNumber: 1,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Табельный номер',
                    strNumber: 6,
                    cellNumber: 2,
                    value: data.staffs.staff6.tabel_number,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Должность',
                    strNumber: 6,
                    cellNumber: 3,
                    value: data.positions.position6.name,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Сотрудники',
                    strNumber: 6,
                    cellNumber: 4,
                    value: data.fio.staff6,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Подразделение',
                    strNumber: 6,
                    cellNumber: 5,
                    value: data.divisions.division6.name,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Присутствие',
                    strNumber: 6,
                    cellNumber: 6,
                    value: '',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Рабочее время',
                    strNumber: 6,
                    cellNumber: 7,
                    value: '',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Отсутствие',
                    strNumber: 6,
                    cellNumber: 8,
                    value: '',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Задолженность',
                    strNumber: 6,
                    cellNumber: 9,
                    value: '',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Непогашаемая задолженность',
                    strNumber: 6,
                    cellNumber: 10,
                    value: '',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Работа в ночное время',
                    strNumber: 6,
                    cellNumber: 11,
                    value: '',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Переработка',
                    strNumber: 6,
                    cellNumber: 12,
                    value: '',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Баланс отработанного времени',
                    strNumber: 6,
                    cellNumber: 13,
                    value: '',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Оправдательные документы с добавлением рабочего времени',
                    strNumber: 6,
                    cellNumber: 14,
                    value: '',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Документы без добавления времени / Сверхурочные',
                    strNumber: 6,
                    cellNumber: 15,
                    value: '',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'График работы',
                    strNumber: 6,
                    cellNumber: 16,
                    value: '',
                    timeout: entry.max
                });
            });

            describe('Проверка строки 7', () => {
                decorate.el.table.cellNoIconWarn({
                    strNumber: 7,
                    cellNumber: 1,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Табельный номер',
                    strNumber: 7,
                    cellNumber: 2,
                    value: data.staffs.staff7.tabel_number,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Должность',
                    strNumber: 7,
                    cellNumber: 3,
                    value: data.positions.position7.name,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Сотрудники',
                    strNumber: 7,
                    cellNumber: 4,
                    value: data.fio.staff7,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Подразделение',
                    strNumber: 7,
                    cellNumber: 5,
                    value: data.divisions.division7.name,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Присутствие',
                    strNumber: 7,
                    cellNumber: 6,
                    value: '',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Рабочее время',
                    strNumber: 7,
                    cellNumber: 7,
                    value: '',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Отсутствие',
                    strNumber: 7,
                    cellNumber: 8,
                    value: '',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Задолженность',
                    strNumber: 7,
                    cellNumber: 9,
                    value: '',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Непогашаемая задолженность',
                    strNumber: 7,
                    cellNumber: 10,
                    value: '',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Работа в ночное время',
                    strNumber: 7,
                    cellNumber: 11,
                    value: '',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Переработка',
                    strNumber: 7,
                    cellNumber: 12,
                    value: '',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Баланс отработанного времени',
                    strNumber: 7,
                    cellNumber: 13,
                    value: '',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Оправдательные документы с добавлением рабочего времени',
                    strNumber: 7,
                    cellNumber: 14,
                    value: '',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Документы без добавления времени / Сверхурочные',
                    strNumber: 7,
                    cellNumber: 15,
                    value: '',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'График работы',
                    strNumber: 7,
                    cellNumber: 16,
                    value: '',
                    timeout: entry.max
                });
            });

            describe('Проверка строки 8', () => {
                decorate.el.table.cellNoIconWarn({
                    strNumber: 8,
                    cellNumber: 1,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Табельный номер',
                    strNumber: 8,
                    cellNumber: 2,
                    value: data.staffs.staff8.tabel_number,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Должность',
                    strNumber: 8,
                    cellNumber: 3,
                    value: data.positions.position8.name,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Сотрудники',
                    strNumber: 8,
                    cellNumber: 4,
                    value: data.fio.staff8,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Подразделение',
                    strNumber: 8,
                    cellNumber: 5,
                    value: data.divisions.division8.name,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Присутствие',
                    strNumber: 8,
                    cellNumber: 6,
                    value: '',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Рабочее время',
                    strNumber: 8,
                    cellNumber: 7,
                    value: '',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Отсутствие',
                    strNumber: 8,
                    cellNumber: 8,
                    value: '',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Задолженность',
                    strNumber: 8,
                    cellNumber: 9,
                    value: '',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Непогашаемая задолженность',
                    strNumber: 8,
                    cellNumber: 10,
                    value: '',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Работа в ночное время',
                    strNumber: 8,
                    cellNumber: 11,
                    value: '',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Переработка',
                    strNumber: 8,
                    cellNumber: 12,
                    value: '',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Баланс отработанного времени',
                    strNumber: 8,
                    cellNumber: 13,
                    value: '',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Оправдательные документы с добавлением рабочего времени',
                    strNumber: 8,
                    cellNumber: 14,
                    value: '',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Документы без добавления времени / Сверхурочные',
                    strNumber: 8,
                    cellNumber: 15,
                    value: '',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'График работы',
                    strNumber: 8,
                    cellNumber: 16,
                    value: '',
                    timeout: entry.max
                });
            });
        });

        describe(`Проверка расчетов по дням у сотрудника "${data.fio.staff4}"`, () => {
            describe('Открытие расчетов по дням', () => {
                decorate.el.table.strHandler({
                    strNumber: 4,
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.page.workedJournal.staffParams({
                    param: 'Подразделение',
                    value: data.divisions.division4.name,
                    timeout: entry.max
                });
                decorate.page.workedJournal.staffParams({
                    param: 'Должность',
                    value: data.positions.position4.name,
                    timeout: entry.max
                });
                decorate.page.workedJournal.staffParams({
                    param: 'График работы',
                    value: data.schedules.schedule4.name,
                    timeout: entry.max
                });
                decorate.page.workedJournal.staffFIO({
                    value: data.fio.staff4,
                    timeout: entry.max
                });
            });

            describe('Проверка день 1', () => {
                decorate.page.workedJournal.tableCellGetText({
                    headTitle: 'Дата',
                    strNumber: 1,
                    cellNumber: 1,
                    value: '2023-06-04 Вс',
                    timeout: entry.max
                });
                decorate.page.workedJournal.tableCellGetText({
                    headTitle: 'Присутствие',
                    strNumber: 1,
                    cellNumber: 2,
                    value: '08:58',
                    timeout: entry.max
                });
                decorate.page.workedJournal.tableCellGetText({
                    headTitle: 'Рабочее время',
                    strNumber: 1,
                    cellNumber: 3,
                    value: '07:58',
                    timeout: entry.max
                });
                decorate.page.workedJournal.tableCellGetText({
                    headTitle: 'Отсутствие',
                    strNumber: 1,
                    cellNumber: 4,
                    value: '00:02',
                    timeout: entry.max
                });
                decorate.page.workedJournal.tableCellGetText({
                    headTitle: 'Задолженность',
                    strNumber: 1,
                    cellNumber: 5,
                    value: '00:02',
                    timeout: entry.max
                });
                decorate.page.workedJournal.tableCellGetText({
                    headTitle: 'Непогашаемая задолженность',
                    strNumber: 1,
                    cellNumber: 6,
                    value: '',
                    timeout: entry.max
                });
                decorate.page.workedJournal.tableCellGetText({
                    headTitle: 'Работа в ночное время',
                    strNumber: 1,
                    cellNumber: 7,
                    value: '01:00',
                    timeout: entry.max
                });
                decorate.page.workedJournal.tableCellGetText({
                    headTitle: 'Переработка',
                    strNumber: 1,
                    cellNumber: 8,
                    value: '',
                    timeout: entry.max
                });
                decorate.page.workedJournal.tableCellGetText({
                    headTitle: 'Баланс отработанного времени',
                    strNumber: 1,
                    cellNumber: 9,
                    value: '-00:02',
                    timeout: entry.max
                });
                decorate.page.workedJournal.tableCellGetText({
                    headTitle: 'Оправдательные документы с добавлением рабочего времени',
                    strNumber: 1,
                    cellNumber: 10,
                    value: '',
                    timeout: entry.max
                });
                decorate.page.workedJournal.tableCellGetText({
                    headTitle: 'Документы без добавления времени / Сверхурочные',
                    strNumber: 1,
                    cellNumber: 11,
                    value: '',
                    timeout: entry.max
                });
            });

            describe('Проверка день 2', () => {
                decorate.page.workedJournal.tableCellGetText({
                    headTitle: 'Дата',
                    strNumber: 2,
                    cellNumber: 1,
                    value: '2023-06-06 Вт',
                    timeout: entry.max
                });
                decorate.page.workedJournal.tableCellGetText({
                    headTitle: 'Присутствие',
                    strNumber: 2,
                    cellNumber: 2,
                    value: '08:58',
                    timeout: entry.max
                });
                decorate.page.workedJournal.tableCellGetText({
                    headTitle: 'Рабочее время',
                    strNumber: 2,
                    cellNumber: 3,
                    value: '07:58',
                    timeout: entry.max
                });
                decorate.page.workedJournal.tableCellGetText({
                    headTitle: 'Отсутствие',
                    strNumber: 2,
                    cellNumber: 4,
                    value: '00:02',
                    timeout: entry.max
                });
                decorate.page.workedJournal.tableCellGetText({
                    headTitle: 'Задолженность',
                    strNumber: 2,
                    cellNumber: 5,
                    value: '00:02',
                    timeout: entry.max
                });
                decorate.page.workedJournal.tableCellGetText({
                    headTitle: 'Непогашаемая задолженность',
                    strNumber: 2,
                    cellNumber: 6,
                    value: '',
                    timeout: entry.max
                });
                decorate.page.workedJournal.tableCellGetText({
                    headTitle: 'Работа в ночное время',
                    strNumber: 2,
                    cellNumber: 7,
                    value: '01:00',
                    timeout: entry.max
                });
                decorate.page.workedJournal.tableCellGetText({
                    headTitle: 'Переработка',
                    strNumber: 2,
                    cellNumber: 8,
                    value: '',
                    timeout: entry.max
                });
                decorate.page.workedJournal.tableCellGetText({
                    headTitle: 'Баланс отработанного времени',
                    strNumber: 2,
                    cellNumber: 9,
                    value: '-00:02',
                    timeout: entry.max
                });
                decorate.page.workedJournal.tableCellGetText({
                    headTitle: 'Оправдательные документы с добавлением рабочего времени',
                    strNumber: 2,
                    cellNumber: 10,
                    value: '',
                    timeout: entry.max
                });
                decorate.page.workedJournal.tableCellGetText({
                    headTitle: 'Документы без добавления времени / Сверхурочные',
                    strNumber: 2,
                    cellNumber: 11,
                    value: '',
                    timeout: entry.max
                });
            });

            describe('Проверка день 3', () => {
                decorate.page.workedJournal.tableCellGetText({
                    headTitle: 'Дата',
                    strNumber: 3,
                    cellNumber: 1,
                    value: '2023-06-08 Чт',
                    timeout: entry.max
                });
                decorate.page.workedJournal.tableCellGetText({
                    headTitle: 'Присутствие',
                    strNumber: 3,
                    cellNumber: 2,
                    value: '07:58',
                    timeout: entry.max
                });
                decorate.page.workedJournal.tableCellGetText({
                    headTitle: 'Рабочее время',
                    strNumber: 3,
                    cellNumber: 3,
                    value: '07:58',
                    timeout: entry.max
                });
                decorate.page.workedJournal.tableCellGetText({
                    headTitle: 'Отсутствие',
                    strNumber: 3,
                    cellNumber: 4,
                    value: '00:02',
                    timeout: entry.max
                });
                decorate.page.workedJournal.tableCellGetText({
                    headTitle: 'Задолженность',
                    strNumber: 3,
                    cellNumber: 5,
                    value: '00:02',
                    timeout: entry.max
                });
                decorate.page.workedJournal.tableCellGetText({
                    headTitle: 'Непогашаемая задолженность',
                    strNumber: 3,
                    cellNumber: 6,
                    value: '',
                    timeout: entry.max
                });
                decorate.page.workedJournal.tableCellGetText({
                    headTitle: 'Работа в ночное время',
                    strNumber: 3,
                    cellNumber: 7,
                    value: '01:00',
                    timeout: entry.max
                });
                decorate.page.workedJournal.tableCellGetText({
                    headTitle: 'Переработка',
                    strNumber: 3,
                    cellNumber: 8,
                    value: '',
                    timeout: entry.max
                });
                decorate.page.workedJournal.tableCellGetText({
                    headTitle: 'Баланс отработанного времени',
                    strNumber: 3,
                    cellNumber: 9,
                    value: '-00:02',
                    timeout: entry.max
                });
                decorate.page.workedJournal.tableCellGetText({
                    headTitle: 'Оправдательные документы с добавлением рабочего времени',
                    strNumber: 3,
                    cellNumber: 10,
                    value: '',
                    timeout: entry.max
                });
                decorate.page.workedJournal.tableCellGetText({
                    headTitle: 'Документы без добавления времени / Сверхурочные',
                    strNumber: 3,
                    cellNumber: 11,
                    value: '',
                    timeout: entry.max
                });
            });

            describe('Проверка день 4', () => {
                decorate.page.workedJournal.tableCellGetText({
                    headTitle: 'Дата',
                    strNumber: 4,
                    cellNumber: 1,
                    value: '2023-06-09 Пт',
                    timeout: entry.max
                });
                decorate.page.workedJournal.tableCellGetText({
                    headTitle: 'Присутствие',
                    strNumber: 4,
                    cellNumber: 2,
                    value: '07:58',
                    timeout: entry.max
                });
                decorate.page.workedJournal.tableCellGetText({
                    headTitle: 'Рабочее время',
                    strNumber: 4,
                    cellNumber: 3,
                    value: '07:58',
                    timeout: entry.max
                });
                decorate.page.workedJournal.tableCellGetText({
                    headTitle: 'Отсутствие',
                    strNumber: 4,
                    cellNumber: 4,
                    value: '00:02',
                    timeout: entry.max
                });
                decorate.page.workedJournal.tableCellGetText({
                    headTitle: 'Задолженность',
                    strNumber: 4,
                    cellNumber: 5,
                    value: '00:02',
                    timeout: entry.max
                });
                decorate.page.workedJournal.tableCellGetText({
                    headTitle: 'Непогашаемая задолженность',
                    strNumber: 4,
                    cellNumber: 6,
                    value: '',
                    timeout: entry.max
                });
                decorate.page.workedJournal.tableCellGetText({
                    headTitle: 'Работа в ночное время',
                    strNumber: 4,
                    cellNumber: 7,
                    value: '01:00',
                    timeout: entry.max
                });
                decorate.page.workedJournal.tableCellGetText({
                    headTitle: 'Переработка',
                    strNumber: 4,
                    cellNumber: 8,
                    value: '',
                    timeout: entry.max
                });
                decorate.page.workedJournal.tableCellGetText({
                    headTitle: 'Баланс отработанного времени',
                    strNumber: 4,
                    cellNumber: 9,
                    value: '-00:02',
                    timeout: entry.max
                });
                decorate.page.workedJournal.tableCellGetText({
                    headTitle: 'Оправдательные документы с добавлением рабочего времени',
                    strNumber: 4,
                    cellNumber: 10,
                    value: '',
                    timeout: entry.max
                });
                decorate.page.workedJournal.tableCellGetText({
                    headTitle: 'Документы без добавления времени / Сверхурочные',
                    strNumber: 4,
                    cellNumber: 11,
                    value: '',
                    timeout: entry.max
                });
            });

            describe('Закрытие расчетов по дням', () => {
                decorate.el.button.handler({
                    name: 'Закрыть',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
            });
        });

        describe(`Проверка расчетов по дням у сотрудника "${data.fio.staff5}"`, () => {
            describe('Открытие расчетов по дням', () => {
                decorate.el.table.strHandler({
                    strNumber: 5,
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.page.workedJournal.staffParams({
                    param: 'Подразделение',
                    value: data.divisions.division5.name,
                    timeout: entry.max
                });
                decorate.page.workedJournal.staffParams({
                    param: 'Должность',
                    value: data.positions.position5.name,
                    timeout: entry.max
                });
                decorate.page.workedJournal.staffParams({
                    param: 'График работы',
                    value: data.schedules.schedule5.name,
                    timeout: entry.max
                });
                decorate.page.workedJournal.staffFIO({
                    value: data.fio.staff5,
                    timeout: entry.max
                });
            });

            describe('Проверка день 1', () => {
                decorate.page.workedJournal.tableCellGetText({
                    headTitle: 'Дата',
                    strNumber: 1,
                    cellNumber: 1,
                    value: '2023-06-03 Сб',
                    timeout: entry.max
                });
                decorate.page.workedJournal.tableCellGetText({
                    headTitle: 'Присутствие',
                    strNumber: 1,
                    cellNumber: 2,
                    value: '08:59',
                    timeout: entry.max
                });
                decorate.page.workedJournal.tableCellGetText({
                    headTitle: 'Рабочее время',
                    strNumber: 1,
                    cellNumber: 3,
                    value: '07:59',
                    timeout: entry.max
                });
                decorate.page.workedJournal.tableCellGetText({
                    headTitle: 'Отсутствие',
                    strNumber: 1,
                    cellNumber: 4,
                    value: '00:01',
                    timeout: entry.max
                });
                decorate.page.workedJournal.tableCellGetText({
                    headTitle: 'Задолженность',
                    strNumber: 1,
                    cellNumber: 5,
                    value: '00:01',
                    timeout: entry.max
                });
                decorate.page.workedJournal.tableCellGetText({
                    headTitle: 'Непогашаемая задолженность',
                    strNumber: 1,
                    cellNumber: 6,
                    value: '00:01',
                    timeout: entry.max
                });
                decorate.page.workedJournal.tableCellGetText({
                    headTitle: 'Работа в ночное время',
                    strNumber: 1,
                    cellNumber: 7,
                    value: '01:00',
                    timeout: entry.max
                });
                decorate.page.workedJournal.tableCellGetText({
                    headTitle: 'Переработка',
                    strNumber: 1,
                    cellNumber: 8,
                    value: '',
                    timeout: entry.max
                });
                decorate.page.workedJournal.tableCellGetText({
                    headTitle: 'Баланс отработанного времени',
                    strNumber: 1,
                    cellNumber: 9,
                    value: '-00:01',
                    timeout: entry.max
                });
                decorate.page.workedJournal.tableCellGetText({
                    headTitle: 'Оправдательные документы с добавлением рабочего времени',
                    strNumber: 1,
                    cellNumber: 10,
                    value: '',
                    timeout: entry.max
                });
                decorate.page.workedJournal.tableCellGetText({
                    headTitle: 'Документы без добавления времени / Сверхурочные',
                    strNumber: 1,
                    cellNumber: 11,
                    value: '',
                    timeout: entry.max
                });
            });

            describe('Проверка день 2', () => {
                decorate.page.workedJournal.tableCellGetText({
                    headTitle: 'Дата',
                    strNumber: 2,
                    cellNumber: 1,
                    value: '2023-06-04 Вс',
                    timeout: entry.max
                });
                decorate.page.workedJournal.tableCellGetText({
                    headTitle: 'Присутствие',
                    strNumber: 2,
                    cellNumber: 2,
                    value: '08:58',
                    timeout: entry.max
                });
                decorate.page.workedJournal.tableCellGetText({
                    headTitle: 'Рабочее время',
                    strNumber: 2,
                    cellNumber: 3,
                    value: '07:58',
                    timeout: entry.max
                });
                decorate.page.workedJournal.tableCellGetText({
                    headTitle: 'Отсутствие',
                    strNumber: 2,
                    cellNumber: 4,
                    value: '00:02',
                    timeout: entry.max
                });
                decorate.page.workedJournal.tableCellGetText({
                    headTitle: 'Задолженность',
                    strNumber: 2,
                    cellNumber: 5,
                    value: '00:02',
                    timeout: entry.max
                });
                decorate.page.workedJournal.tableCellGetText({
                    headTitle: 'Непогашаемая задолженность',
                    strNumber: 2,
                    cellNumber: 6,
                    value: '00:02',
                    timeout: entry.max
                });
                decorate.page.workedJournal.tableCellGetText({
                    headTitle: 'Работа в ночное время',
                    strNumber: 2,
                    cellNumber: 7,
                    value: '01:00',
                    timeout: entry.max
                });
                decorate.page.workedJournal.tableCellGetText({
                    headTitle: 'Переработка',
                    strNumber: 2,
                    cellNumber: 8,
                    value: '',
                    timeout: entry.max
                });
                decorate.page.workedJournal.tableCellGetText({
                    headTitle: 'Баланс отработанного времени',
                    strNumber: 2,
                    cellNumber: 9,
                    value: '-00:02',
                    timeout: entry.max
                });
                decorate.page.workedJournal.tableCellGetText({
                    headTitle: 'Оправдательные документы с добавлением рабочего времени',
                    strNumber: 2,
                    cellNumber: 10,
                    value: '',
                    timeout: entry.max
                });
                decorate.page.workedJournal.tableCellGetText({
                    headTitle: 'Документы без добавления времени / Сверхурочные',
                    strNumber: 2,
                    cellNumber: 11,
                    value: '',
                    timeout: entry.max
                });
            });

            describe('Проверка день 3', () => {
                decorate.page.workedJournal.tableCellGetText({
                    headTitle: 'Дата',
                    strNumber: 3,
                    cellNumber: 1,
                    value: '2023-06-05 Пн',
                    timeout: entry.max
                });
                decorate.page.workedJournal.tableCellGetText({
                    headTitle: 'Присутствие',
                    strNumber: 3,
                    cellNumber: 2,
                    value: '08:59',
                    timeout: entry.max
                });
                decorate.page.workedJournal.tableCellGetText({
                    headTitle: 'Рабочее время',
                    strNumber: 3,
                    cellNumber: 3,
                    value: '07:59',
                    timeout: entry.max
                });
                decorate.page.workedJournal.tableCellGetText({
                    headTitle: 'Отсутствие',
                    strNumber: 3,
                    cellNumber: 4,
                    value: '00:01',
                    timeout: entry.max
                });
                decorate.page.workedJournal.tableCellGetText({
                    headTitle: 'Задолженность',
                    strNumber: 3,
                    cellNumber: 5,
                    value: '00:01',
                    timeout: entry.max
                });
                decorate.page.workedJournal.tableCellGetText({
                    headTitle: 'Непогашаемая задолженность',
                    strNumber: 3,
                    cellNumber: 6,
                    value: '00:01',
                    timeout: entry.max
                });
                decorate.page.workedJournal.tableCellGetText({
                    headTitle: 'Работа в ночное время',
                    strNumber: 3,
                    cellNumber: 7,
                    value: '01:00',
                    timeout: entry.max
                });
                decorate.page.workedJournal.tableCellGetText({
                    headTitle: 'Переработка',
                    strNumber: 3,
                    cellNumber: 8,
                    value: '',
                    timeout: entry.max
                });
                decorate.page.workedJournal.tableCellGetText({
                    headTitle: 'Баланс отработанного времени',
                    strNumber: 3,
                    cellNumber: 9,
                    value: '-00:01',
                    timeout: entry.max
                });
                decorate.page.workedJournal.tableCellGetText({
                    headTitle: 'Оправдательные документы с добавлением рабочего времени',
                    strNumber: 3,
                    cellNumber: 10,
                    value: '',
                    timeout: entry.max
                });
                decorate.page.workedJournal.tableCellGetText({
                    headTitle: 'Документы без добавления времени / Сверхурочные',
                    strNumber: 3,
                    cellNumber: 11,
                    value: '',
                    timeout: entry.max
                });
            });

            describe('Проверка день 4', () => {
                decorate.page.workedJournal.tableCellGetText({
                    headTitle: 'Дата',
                    strNumber: 4,
                    cellNumber: 1,
                    value: '2023-06-06 Вт',
                    timeout: entry.max
                });
                decorate.page.workedJournal.tableCellGetText({
                    headTitle: 'Присутствие',
                    strNumber: 4,
                    cellNumber: 2,
                    value: '08:58',
                    timeout: entry.max
                });
                decorate.page.workedJournal.tableCellGetText({
                    headTitle: 'Рабочее время',
                    strNumber: 4,
                    cellNumber: 3,
                    value: '07:58',
                    timeout: entry.max
                });
                decorate.page.workedJournal.tableCellGetText({
                    headTitle: 'Отсутствие',
                    strNumber: 4,
                    cellNumber: 4,
                    value: '00:02',
                    timeout: entry.max
                });
                decorate.page.workedJournal.tableCellGetText({
                    headTitle: 'Задолженность',
                    strNumber: 4,
                    cellNumber: 5,
                    value: '00:02',
                    timeout: entry.max
                });
                decorate.page.workedJournal.tableCellGetText({
                    headTitle: 'Непогашаемая задолженность',
                    strNumber: 4,
                    cellNumber: 6,
                    value: '00:02',
                    timeout: entry.max
                });
                decorate.page.workedJournal.tableCellGetText({
                    headTitle: 'Работа в ночное время',
                    strNumber: 4,
                    cellNumber: 7,
                    value: '01:00',
                    timeout: entry.max
                });
                decorate.page.workedJournal.tableCellGetText({
                    headTitle: 'Переработка',
                    strNumber: 4,
                    cellNumber: 8,
                    value: '',
                    timeout: entry.max
                });
                decorate.page.workedJournal.tableCellGetText({
                    headTitle: 'Баланс отработанного времени',
                    strNumber: 4,
                    cellNumber: 9,
                    value: '-00:02',
                    timeout: entry.max
                });
                decorate.page.workedJournal.tableCellGetText({
                    headTitle: 'Оправдательные документы с добавлением рабочего времени',
                    strNumber: 4,
                    cellNumber: 10,
                    value: '',
                    timeout: entry.max
                });
                decorate.page.workedJournal.tableCellGetText({
                    headTitle: 'Документы без добавления времени / Сверхурочные',
                    strNumber: 4,
                    cellNumber: 11,
                    value: '',
                    timeout: entry.max
                });
            });

            describe('Проверка день 5', () => {
                decorate.page.workedJournal.tableCellGetText({
                    headTitle: 'Дата',
                    strNumber: 5,
                    cellNumber: 1,
                    value: '2023-06-07 Ср',
                    timeout: entry.max
                });
                decorate.page.workedJournal.tableCellGetText({
                    headTitle: 'Присутствие',
                    strNumber: 5,
                    cellNumber: 2,
                    value: '07:59',
                    timeout: entry.max
                });
                decorate.page.workedJournal.tableCellGetText({
                    headTitle: 'Рабочее время',
                    strNumber: 5,
                    cellNumber: 3,
                    value: '07:59',
                    timeout: entry.max
                });
                decorate.page.workedJournal.tableCellGetText({
                    headTitle: 'Отсутствие',
                    strNumber: 5,
                    cellNumber: 4,
                    value: '00:01',
                    timeout: entry.max
                });
                decorate.page.workedJournal.tableCellGetText({
                    headTitle: 'Задолженность',
                    strNumber: 5,
                    cellNumber: 5,
                    value: '00:01',
                    timeout: entry.max
                });
                decorate.page.workedJournal.tableCellGetText({
                    headTitle: 'Непогашаемая задолженность',
                    strNumber: 5,
                    cellNumber: 6,
                    value: '',
                    timeout: entry.max
                });
                decorate.page.workedJournal.tableCellGetText({
                    headTitle: 'Работа в ночное время',
                    strNumber: 5,
                    cellNumber: 7,
                    value: '01:00',
                    timeout: entry.max
                });
                decorate.page.workedJournal.tableCellGetText({
                    headTitle: 'Переработка',
                    strNumber: 5,
                    cellNumber: 8,
                    value: '',
                    timeout: entry.max
                });
                decorate.page.workedJournal.tableCellGetText({
                    headTitle: 'Баланс отработанного времени',
                    strNumber: 5,
                    cellNumber: 9,
                    value: '-00:01',
                    timeout: entry.max
                });
                decorate.page.workedJournal.tableCellGetText({
                    headTitle: 'Оправдательные документы с добавлением рабочего времени',
                    strNumber: 5,
                    cellNumber: 10,
                    value: '',
                    timeout: entry.max
                });
                decorate.page.workedJournal.tableCellGetText({
                    headTitle: 'Документы без добавления времени / Сверхурочные',
                    strNumber: 5,
                    cellNumber: 11,
                    value: '',
                    timeout: entry.max
                });
            });

            describe('Проверка день 6', () => {
                decorate.page.workedJournal.tableCellGetText({
                    headTitle: 'Дата',
                    strNumber: 6,
                    cellNumber: 1,
                    value: '2023-06-08 Чт',
                    timeout: entry.max
                });
                decorate.page.workedJournal.tableCellGetText({
                    headTitle: 'Присутствие',
                    strNumber: 6,
                    cellNumber: 2,
                    value: '07:59',
                    timeout: entry.max
                });
                decorate.page.workedJournal.tableCellGetText({
                    headTitle: 'Рабочее время',
                    strNumber: 6,
                    cellNumber: 3,
                    value: '07:59',
                    timeout: entry.max
                });
                decorate.page.workedJournal.tableCellGetText({
                    headTitle: 'Отсутствие',
                    strNumber: 6,
                    cellNumber: 4,
                    value: '00:01',
                    timeout: entry.max
                });
                decorate.page.workedJournal.tableCellGetText({
                    headTitle: 'Задолженность',
                    strNumber: 6,
                    cellNumber: 5,
                    value: '00:01',
                    timeout: entry.max
                });
                decorate.page.workedJournal.tableCellGetText({
                    headTitle: 'Непогашаемая задолженность',
                    strNumber: 6,
                    cellNumber: 6,
                    value: '',
                    timeout: entry.max
                });
                decorate.page.workedJournal.tableCellGetText({
                    headTitle: 'Работа в ночное время',
                    strNumber: 6,
                    cellNumber: 7,
                    value: '01:00',
                    timeout: entry.max
                });
                decorate.page.workedJournal.tableCellGetText({
                    headTitle: 'Переработка',
                    strNumber: 6,
                    cellNumber: 8,
                    value: '',
                    timeout: entry.max
                });
                decorate.page.workedJournal.tableCellGetText({
                    headTitle: 'Баланс отработанного времени',
                    strNumber: 6,
                    cellNumber: 9,
                    value: '-00:01',
                    timeout: entry.max
                });
                decorate.page.workedJournal.tableCellGetText({
                    headTitle: 'Оправдательные документы с добавлением рабочего времени',
                    strNumber: 6,
                    cellNumber: 10,
                    value: '',
                    timeout: entry.max
                });
                decorate.page.workedJournal.tableCellGetText({
                    headTitle: 'Документы без добавления времени / Сверхурочные',
                    strNumber: 6,
                    cellNumber: 11,
                    value: '',
                    timeout: entry.max
                });
            });

            describe('Закрытие расчетов по дням', () => {
                decorate.el.button.handler({
                    name: 'Закрыть',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
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

    const divisionFilterWorkedJournal = () => describe('УРВ. Журнал отработанного времени. ' +
        'Проверка фильтра по подразделению.', () => {

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

        describe('Проверка таблицы до иcпользования фильтра "Подразделение"', () => {
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
                cellNumber: 5,
                value: data.divisions.division1.name,
                timeout: entry.max
            });
            decorate.el.table.cellGetText({
                headTitle: 'Подразделение',
                strNumber: 2,
                cellNumber: 5,
                value: data.divisions.division2.name,
                timeout: entry.max
            });
            decorate.el.table.cellGetText({
                headTitle: 'Подразделение',
                strNumber: 3,
                cellNumber: 5,
                value: data.divisions.division3.name,
                timeout: entry.max
            });
            decorate.el.table.cellGetText({
                headTitle: 'Подразделение',
                strNumber: 4,
                cellNumber: 5,
                value: data.divisions.division4.name,
                timeout: entry.max
            });
            decorate.el.table.cellGetText({
                headTitle: 'Подразделение',
                strNumber: 5,
                cellNumber: 5,
                value: data.divisions.division5.name,
                timeout: entry.max
            });
            decorate.el.table.cellGetText({
                headTitle: 'Подразделение',
                strNumber: 6,
                cellNumber: 5,
                value: data.divisions.division6.name,
                timeout: entry.max
            });
            decorate.el.table.cellGetText({
                headTitle: 'Подразделение',
                strNumber: 7,
                cellNumber: 5,
                value: data.divisions.division7.name,
                timeout: entry.max
            });
            decorate.el.table.cellGetText({
                headTitle: 'Подразделение',
                strNumber: 8,
                cellNumber: 5,
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
                cellNumber: 5,
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
                    cellNumber: 5,
                    value: data.divisions.division3.name,
                    timeout: entry.max
                });
            });
    });

    const searchFilterWorkedJournal = () => describe('УРВ. Журнал отработанного времени.  Проверка фильтра "Поиск...".',
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

        describe('Проверка таблицы до иcпользования фильтра "Поиск..."', () => {
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
                cellNumber: 4,
                value: data.fio.staff1,
                timeout: entry.max
            });
            decorate.el.table.cellGetText({
                headTitle: 'Сотрудники',
                strNumber: 2,
                cellNumber: 4,
                value: data.fio.staff2,
                timeout: entry.max
            });
            decorate.el.table.cellGetText({
                headTitle: 'Сотрудники',
                strNumber: 3,
                cellNumber: 4,
                value: data.fio.staff3,
                timeout: entry.max
            });
            decorate.el.table.cellGetText({
                headTitle: 'Сотрудники',
                strNumber: 4,
                cellNumber: 4,
                value: data.fio.staff4,
                timeout: entry.max
            });
            decorate.el.table.cellGetText({
                headTitle: 'Сотрудники',
                strNumber: 5,
                cellNumber: 4,
                value: data.fio.staff5,
                timeout: entry.max
            });
            decorate.el.table.cellGetText({
                headTitle: 'Сотрудники',
                strNumber: 6,
                cellNumber: 4,
                value: data.fio.staff6,
                timeout: entry.max
            });
            decorate.el.table.cellGetText({
                headTitle: 'Сотрудники',
                strNumber: 7,
                cellNumber: 4,
                value: data.fio.staff7,
                timeout: entry.max
            });
            decorate.el.table.cellGetText({
                headTitle: 'Сотрудники',
                strNumber: 8,
                cellNumber: 4,
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
                cellNumber: 4,
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
                cellNumber: 4,
                value: data.fio.staff1,
                timeout: entry.max
            });
            decorate.el.table.cellGetText({
                headTitle: 'Сотрудники',
                strNumber: 2,
                cellNumber: 4,
                value: data.fio.staff2,
                timeout: entry.max
            });
            decorate.el.table.cellGetText({
                headTitle: 'Сотрудники',
                strNumber: 3,
                cellNumber: 4,
                value: data.fio.staff3,
                timeout: entry.max
            });
            decorate.el.table.cellGetText({
                headTitle: 'Сотрудники',
                strNumber: 4,
                cellNumber: 4,
                value: data.fio.staff4,
                timeout: entry.max
            });
            decorate.el.table.cellGetText({
                headTitle: 'Сотрудники',
                strNumber: 5,
                cellNumber: 4,
                value: data.fio.staff5,
                timeout: entry.max
            });
            decorate.el.table.cellGetText({
                headTitle: 'Сотрудники',
                strNumber: 6,
                cellNumber: 4,
                value: data.fio.staff6,
                timeout: entry.max
            });
            decorate.el.table.cellGetText({
                headTitle: 'Сотрудники',
                strNumber: 7,
                cellNumber: 4,
                value: data.fio.staff7,
                timeout: entry.max
            });
            decorate.el.table.cellGetText({
                headTitle: 'Сотрудники',
                strNumber: 8,
                cellNumber: 4,
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
        calculateСurrentWorkedJournal,
        calculationDateWorkedJournal,
        checkCalculationWorkedJournal,
        printTableWorkedJournal,
        exportWorkedJournalXLSX,
        exportWorkedJournalCSV,
        documentCalculationWorkedJournal,
        deleteCompositeDocumentWorkedJournal,
        staffDeptWorkedJournal,
        divisionFilterWorkedJournal,
        searchFilterWorkedJournal,
        resetFilter
    }
};

module.exports = {
    other: other()
}