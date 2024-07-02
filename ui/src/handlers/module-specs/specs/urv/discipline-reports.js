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

const befViolator = () => before('Вход и открытие подраздела "Отчеты по дисциплине" - вкладка "Нарушители"',
    async () => {
    await page.base.loading(entry.sleep1);
    await dec.auth(entry.customLogin, entry.customPassword);
    await dec.simple(el.section.handler, [sec.urv, entry.max], el.section);
    await dec.simple(el.subsection.handler, [sub.urv.violator, entry.max], el.subsection);
    await dec.simple(el.tab.handler, ['Нарушители', entry.max], el.tab);
    await dec.simple(page.violator.init, [entry.max], page.violator);
    await page.base.loading(entry.sleep1);
});

const befPresence = () => before('Вход и открытие подраздела "Отчеты по дисциплине" - вкладка ' +
    '"Присутствующие на данный момент"', async () => {
    await page.base.loading(entry.sleep1);
    await dec.auth(entry.customLogin, entry.customPassword);
    await dec.simple(el.section.handler, [sec.urv, entry.max], el.section);
    await dec.simple(el.subsection.handler, [sub.urv.violator, entry.max], el.subsection);
    await dec.simple(el.tab.handler, ['Присутствующие на данный момент', entry.max], el.tab);
    await dec.simple(page.presence.init, [entry.max], page.presence);
    await page.base.loading(entry.sleep1);
});

const befAbsent = () => before('Вход и открытие подраздела "Отчеты по дисциплине" - вкладка "Отсутствующие сегодня"',
    async () => {
    await page.base.loading(entry.sleep1);
    await dec.auth(entry.customLogin, entry.customPassword);
    await dec.simple(el.section.handler, [sec.urv, entry.max], el.section);
    await dec.simple(el.subsection.handler, [sub.urv.violator, entry.max], el.subsection);
    await dec.simple(el.tab.handler, ['Отсутствующие сегодня', entry.max], el.tab);
    await dec.simple(page.absent.init, [entry.max], page.absent);
    await page.base.loading(entry.sleep1);
});

const befLate = () => before('Вход и открытие подраздела "Отчеты по дисциплине" - вкладка "Опоздавшие сегодня"',
    async () => {
    await page.base.loading(entry.sleep1);
    await dec.auth(entry.customLogin, entry.customPassword);
    await dec.simple(el.section.handler, [sec.urv, entry.max], el.section);
    await dec.simple(el.subsection.handler, [sub.urv.violator, entry.max], el.subsection);
    await dec.simple(el.tab.handler, ['Опоздавшие сегодня', entry.max], el.tab);
    await dec.simple(page.late.init, [entry.max], page.late);
    await page.base.loading(entry.sleep1);
});

const befEarly = () => before('Вход и открытие подраздела "Отчеты по дисциплине" - вкладка "Ушедшие раньше сегодня"',
    async () => {
    await page.base.loading(entry.sleep1);
    await dec.auth(entry.customLogin, entry.customPassword);
    await dec.simple(el.section.handler, [sec.urv, entry.max], el.section);
    await dec.simple(el.subsection.handler, [sub.urv.violator, entry.max], el.subsection);
    await dec.simple(el.tab.handler, ['Ушедшие раньше сегодня', entry.max], el.tab);
    await dec.simple(page.early.init, [entry.max], page.early);
    await page.base.loading(entry.sleep1);
});

const befOverwork = () => before('Вход и открытие подраздела "Отчеты по дисциплине" - вкладка "Переработка"',
    async () => {
    await page.base.loading(entry.sleep1);
    await dec.auth(entry.customLogin, entry.customPassword);
    await dec.simple(el.section.handler, [sec.urv, entry.max], el.section);
    await dec.simple(el.subsection.handler, [sub.urv.violator, entry.max], el.subsection);
    await dec.simple(el.tab.handler, ['Переработка', entry.max], el.tab);
    await dec.simple(page.overwork.init, [entry.max], page.overwork);
    await page.base.loading(entry.sleep1);
});

const aft = () => after('Выход', async () => {
    await page.base.loading(entry.sleep1);
    await dec.exit();
    await page.base.loading(entry.sleep1);
});

const other = (type, text) => {

    const checkTable = () => describe(text + ' Проверка таблицы.', () => {
        if(type === 'violator') {
            const arrHead = [
                'Табельный номер',
                'Сотрудники',
                'Подразделение',
                'Должность',
                'Опозданий',
                'Уходов раньше',
                'Нарушений дисциплины в течение рабочего дня',
                'Оправдательные документы',
                'Итого нарушений дисциплины',
                'Неявок'
            ];
            const  arrData = [
                ['1', 'staff name 1', 'division1', 'position1', '00:02', '00:02', '00:02', '', '00:06', '18'],
                ['2', 'staff name 2', 'division2', 'position2', '00:02', '00:02', '', '', '00:04', '6'],
                ['4', 'staff name 4', 'division4', 'position4', '00:02', '00:02', '00:04', '', '00:08', '17'],
                ['5', 'staff name 5', 'division5', 'position5', '00:03', '00:03', '00:02', '', '00:08', '20'],
                ['6', 'staff name 6', 'division6', 'position6', '', '', '', '', '', '29'],
                ['7', 'staff name 7', 'division7', 'position7', '', '', '', '', '', '14']
            ];

            befViolator();
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
                    strCount: 6,
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

        if(type === 'presence') {
            const arrHead = [
                'Таб. №',
                'Сотрудники',
                'Подразделение',
                'Должность'
            ];
            const  arrData = [
                ['3', 'staff name 3', 'division3', 'position3'],
                ['5', 'staff name 5', 'division5', 'position5'],
            ];

            befPresence();
            aft();

            describe('Проверка таблицы', () => {

                describe('Количество строк в таблице', () => {
                    decorate.el.table.size({
                        strCount: 2,
                        timeout: entry.max
                    });
                });

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
                })
            });
        }

        if(type === 'absent') {
            const arrHead = [
                'Таб. №',
                'Сотрудники',
                'Подразделение',
                'Должность'
            ];
            const  arrData = [
                ['2', 'staff name 2', 'division2', 'position2'],
                ['6', 'staff name 6', 'division6', 'position6'],
                ['7', 'staff name 7', 'division7', 'position7'],
            ];

            befAbsent();
            aft();

            describe('Проверка таблицы', () => {

                describe('Количество строк в таблице', () => {
                    decorate.el.table.size({
                        strCount: 3,
                        timeout: entry.max
                    });
                });

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
                })
            });
        }

        if(type === 'late') {
            const arrHead = [
                'Таб. №',
                'Сотрудники',
                'Подразделение',
                'Должность',
                'Время'
            ];
            const  arrData = [
                ['1', 'staff name 1', 'division1', 'position1', '03:00'],
                ['4', 'staff name 4', 'division4', 'position4', '03:00'],
                ['5', 'staff name 5', 'division5', 'position5', '03:00'],

            ];

            befLate();
            aft();

            describe('Проверка таблицы', () => {

                describe('Количество строк в таблице', () => {
                    decorate.el.table.size({
                        strCount: 3,
                        timeout: entry.max
                    });
                });

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
                })
            });
        }

        if(type === 'early') {
            const arrHead = [
                'Таб. №',
                'Сотрудники',
                'Подразделение',
                'Должность',
                'Время'
            ];
            const  arrData = [
                ['1', 'staff name 1', 'division1', 'position1', '05:00'],
                ['4', 'staff name 4', 'division4', 'position4', '05:00'],
            ];

            befEarly();
            aft();

            describe('Проверка таблицы', () => {

                describe('Количество строк в таблице', () => {
                    decorate.el.table.size({
                        strCount: 2,
                        timeout: entry.max
                    });
                });

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
                })
            });
        }

        if(type === 'overwork') {
            const arrHead = [
                'Табельный номер',
                'Сотрудники',
                'Подразделение',
                'Должность',
                'Присутствие до начала рабочего дня',
                'Присутствие после окончания рабочего дня'
            ];
            const  arrData = [
                ['1', 'staff name 1', 'division1', 'position1', '00:01', '00:01'],
                ['2', 'staff name 2', 'division2', 'position2', '', ''],
                ['4', 'staff name 4', 'division4', 'position4', '00:01', '00:01'],
                ['5', 'staff name 5', 'division5', 'position5', '', ''],
            ];

            befOverwork();
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

    const printTable = () => describe(text + ' Проверка печати.', () => {
        if(type === 'violator') {

            befViolator();
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
                    strCount: 6,
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
                    head: 'Табельный номер',
                    str: 1,
                    cell: 1,
                    value: '1',
                    timeout: entry.max
                });
                decorate.modal.printTable.cellGetText({
                    head: 'Сотрудники',
                    str: 1,
                    cell: 2,
                    value: 'staff name 1',
                    timeout: entry.max
                });
                decorate.modal.printTable.cellGetText({
                    head: 'Подразделение',
                    str: 1,
                    cell: 3,
                    value: 'division1',
                    timeout: entry.max
                });
                decorate.modal.printTable.cellGetText({
                    head: 'Должность',
                    str: 1,
                    cell: 4,
                    value: 'position1',
                    timeout: entry.max
                });
                decorate.modal.printTable.cellGetText({
                    head: 'Опозданий',
                    str: 1,
                    cell: 5,
                    value: '00:02',
                    timeout: entry.max
                });
                decorate.modal.printTable.cellGetText({
                    head: 'Уходов раньше',
                    str: 1,
                    cell: 6,
                    value: '00:02',
                    timeout: entry.max
                });
                decorate.modal.printTable.cellGetText({
                    head: 'Нарушений дисциплины в течение рабочего дня',
                    str: 1,
                    cell: 7,
                    value: '00:02',
                    timeout: entry.max
                });
                decorate.modal.printTable.cellGetText({
                    head: 'Оправдательные документы',
                    str: 1,
                    cell: 8,
                    value: '',
                    timeout: entry.max
                });
                decorate.modal.printTable.cellGetText({
                    head: 'Итого нарушений дисциплины',
                    str: 1,
                    cell: 9,
                    value: '00:06',
                    timeout: entry.max
                });
                decorate.modal.printTable.cellGetText({
                    head: 'Неявок',
                    str: 1,
                    cell: 10,
                    value: '18',
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

        if(type === 'presence') {
            befPresence();
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
                decorate.modal.printTable.init({
                    timeout: entry.max
                });
            });

            describe('Проверка таблицы', () => {
                decorate.modal.printTable.cellGetText({
                    head: 'Таб. №',
                    str: 1,
                    cell: 1,
                    value: '3',
                    timeout: entry.max
                });
                decorate.modal.printTable.cellGetText({
                    head: 'Сотрудники',
                    str: 1,
                    cell: 2,
                    value: 'staff name 3',
                    timeout: entry.max
                });
                decorate.modal.printTable.cellGetText({
                    head: 'Подразделение',
                    str: 1,
                    cell: 3,
                    value: 'division3',
                    timeout: entry.max
                });
                decorate.modal.printTable.cellGetText({
                    head: 'Должность',
                    str: 1,
                    cell: 4,
                    value: 'position3',
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

        if(type === 'absent') {
            befAbsent();
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
                decorate.modal.printTable.init({
                    timeout: entry.max
                });
            });

            describe('Проверка таблицы', () => {
                decorate.modal.printTable.cellGetText({
                    head: 'Таб. №',
                    str: 1,
                    cell: 1,
                    value: '2',
                    timeout: entry.max
                });
                decorate.modal.printTable.cellGetText({
                    head: 'Сотрудники',
                    str: 1,
                    cell: 2,
                    value: 'staff name 2',
                    timeout: entry.max
                });
                decorate.modal.printTable.cellGetText({
                    head: 'Подразделение',
                    str: 1,
                    cell: 3,
                    value: 'division2',
                    timeout: entry.max
                });
                decorate.modal.printTable.cellGetText({
                    head: 'Должность',
                    str: 1,
                    cell: 4,
                    value: 'position2',
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

        if(type === 'late') {
            befLate();
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
                decorate.modal.printTable.init({
                    timeout: entry.max
                });
            });

            describe('Проверка таблицы', () => {
                decorate.modal.printTable.cellGetText({
                    head: 'Таб. №',
                    str: 1,
                    cell: 1,
                    value: '1',
                    timeout: entry.max
                });
                decorate.modal.printTable.cellGetText({
                    head: 'Сотрудники',
                    str: 1,
                    cell: 2,
                    value: 'staff name 1',
                    timeout: entry.max
                });
                decorate.modal.printTable.cellGetText({
                    head: 'Подразделение',
                    str: 1,
                    cell: 3,
                    value: 'division1',
                    timeout: entry.max
                });
                decorate.modal.printTable.cellGetText({
                    head: 'Должность',
                    str: 1,
                    cell: 4,
                    value: 'position1',
                    timeout: entry.max
                });
                decorate.modal.printTable.cellGetText({
                    head: 'Время',
                    str: 1,
                    cell: 5,
                    value: '03:00',
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

        if(type === 'early') {
            befEarly();
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
                decorate.modal.printTable.init({
                    timeout: entry.max
                });
            });

            describe('Проверка таблицы', () => {
                decorate.modal.printTable.cellGetText({
                    head: 'Таб. №',
                    str: 1,
                    cell: 1,
                    value: '1',
                    timeout: entry.max
                });
                decorate.modal.printTable.cellGetText({
                    head: 'Сотрудники',
                    str: 1,
                    cell: 2,
                    value: 'staff name 1',
                    timeout: entry.max
                });
                decorate.modal.printTable.cellGetText({
                    head: 'Подразделение',
                    str: 1,
                    cell: 3,
                    value: 'division1',
                    timeout: entry.max
                });
                decorate.modal.printTable.cellGetText({
                    head: 'Должность',
                    str: 1,
                    cell: 4,
                    value: 'position1',
                    timeout: entry.max
                });
                decorate.modal.printTable.cellGetText({
                    head: 'Время',
                    str: 1,
                    cell: 5,
                    value: '05:00',
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

        if(type === 'overwork') {

            befOverwork();
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
                    head: 'Табельный номер',
                    str: 1,
                    cell: 1,
                    value: '1',
                    timeout: entry.max
                });
                decorate.modal.printTable.cellGetText({
                    head: 'Сотрудники',
                    str: 1,
                    cell: 2,
                    value: 'staff name 1',
                    timeout: entry.max
                });
                decorate.modal.printTable.cellGetText({
                    head: 'Подразделение',
                    str: 1,
                    cell: 3,
                    value: 'division1',
                    timeout: entry.max
                });
                decorate.modal.printTable.cellGetText({
                    head: 'Должность',
                    str: 1,
                    cell: 4,
                    value: 'position1',
                    timeout: entry.max
                });
                decorate.modal.printTable.cellGetText({
                    head: 'Присутствие до начала рабочего дня',
                    str: 1,
                    cell: 5,
                    value: '00:01',
                    timeout: entry.max
                });
                decorate.modal.printTable.cellGetText({
                    head: 'Присутствие после окончания рабочего дня',
                    str: 1,
                    cell: 6,
                    value: '00:01',
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

    const exportXLSX = () => describe(text + ' Проверка экспорта XLSX.', () => {
        if(type === 'violator') {
            const params = {
                nameFile: 'violators.xlsx',
                json: [
                    {
                        'Отчет "Отчеты по дисциплине:Нарушители"': 'Табельный номер',
                        __EMPTY: 'Фамилия',
                        __EMPTY_1: 'Имя',
                        __EMPTY_2: 'Отчество',
                        __EMPTY_3: 'Подразделение',
                        __EMPTY_4: 'Должность',
                        __EMPTY_5: 'Опозданий',
                        __EMPTY_6: 'Уходов раньше',
                        __EMPTY_7: 'Нарушений дисциплины в течение рабочего дня',
                        __EMPTY_8: 'Оправдательные документы',
                        __EMPTY_9: 'Итого нарушений дисциплины',
                        __EMPTY_10: 'Неявок'
                    },
                    {
                        'Отчет "Отчеты по дисциплине:Нарушители"': '1',
                        __EMPTY: 'staff',
                        __EMPTY_1: 'name',
                        __EMPTY_2: '1',
                        __EMPTY_3: 'division1',
                        __EMPTY_4: 'position1',
                        __EMPTY_5: '00:02',
                        __EMPTY_6: '00:02',
                        __EMPTY_7: '00:02',
                        __EMPTY_8: '',
                        __EMPTY_9: '00:06',
                        __EMPTY_10: 18
                    },
                    {
                        'Отчет "Отчеты по дисциплине:Нарушители"': '',
                        __EMPTY: '2023-06-04 Вс',
                        __EMPTY_1: '',
                        __EMPTY_2: '',
                        __EMPTY_3: 'division1',
                        __EMPTY_4: 'position1',
                        __EMPTY_5: '00:02',
                        __EMPTY_6: '',
                        __EMPTY_7: '',
                        __EMPTY_8: '',
                        __EMPTY_9: '00:02',
                        __EMPTY_10: 0
                    },
                    {
                        'Отчет "Отчеты по дисциплине:Нарушители"': '',
                        __EMPTY: '2023-06-06 Вт',
                        __EMPTY_1: '',
                        __EMPTY_2: '',
                        __EMPTY_3: 'division1',
                        __EMPTY_4: 'position1',
                        __EMPTY_5: '',
                        __EMPTY_6: '00:02',
                        __EMPTY_7: '',
                        __EMPTY_8: '',
                        __EMPTY_9: '00:02',
                        __EMPTY_10: 0
                    },
                    {
                        'Отчет "Отчеты по дисциплине:Нарушители"': '',
                        __EMPTY: '2023-06-08 Чт',
                        __EMPTY_1: '',
                        __EMPTY_2: '',
                        __EMPTY_3: 'division1',
                        __EMPTY_4: 'position1',
                        __EMPTY_5: '',
                        __EMPTY_6: '',
                        __EMPTY_7: '00:02',
                        __EMPTY_8: '',
                        __EMPTY_9: '00:02',
                        __EMPTY_10: 0
                    },
                    {
                        'Отчет "Отчеты по дисциплине:Нарушители"': '',
                        __EMPTY: '2023-06-11 Вс',
                        __EMPTY_1: '',
                        __EMPTY_2: '',
                        __EMPTY_3: 'division1',
                        __EMPTY_4: 'position1',
                        __EMPTY_5: '',
                        __EMPTY_6: '',
                        __EMPTY_7: '',
                        __EMPTY_8: '',
                        __EMPTY_9: '',
                        __EMPTY_10: 1
                    },
                    {
                        'Отчет "Отчеты по дисциплине:Нарушители"': '',
                        __EMPTY: '2023-06-13 Вт',
                        __EMPTY_1: '',
                        __EMPTY_2: '',
                        __EMPTY_3: 'division1',
                        __EMPTY_4: 'position1',
                        __EMPTY_5: '',
                        __EMPTY_6: '',
                        __EMPTY_7: '',
                        __EMPTY_8: '',
                        __EMPTY_9: '',
                        __EMPTY_10: 1
                    },
                    {
                        'Отчет "Отчеты по дисциплине:Нарушители"': '',
                        __EMPTY: '2023-06-14 Ср',
                        __EMPTY_1: '',
                        __EMPTY_2: '',
                        __EMPTY_3: 'division1',
                        __EMPTY_4: 'position1',
                        __EMPTY_5: '',
                        __EMPTY_6: '',
                        __EMPTY_7: '',
                        __EMPTY_8: '',
                        __EMPTY_9: '',
                        __EMPTY_10: 1
                    },
                    {
                        'Отчет "Отчеты по дисциплине:Нарушители"': '',
                        __EMPTY: '2023-06-15 Чт',
                        __EMPTY_1: '',
                        __EMPTY_2: '',
                        __EMPTY_3: 'division1',
                        __EMPTY_4: 'position1',
                        __EMPTY_5: '',
                        __EMPTY_6: '',
                        __EMPTY_7: '',
                        __EMPTY_8: '',
                        __EMPTY_9: '',
                        __EMPTY_10: 1
                    },
                    {
                        'Отчет "Отчеты по дисциплине:Нарушители"': '',
                        __EMPTY: '2023-06-17 Сб',
                        __EMPTY_1: '',
                        __EMPTY_2: '',
                        __EMPTY_3: 'division1',
                        __EMPTY_4: 'position1',
                        __EMPTY_5: '',
                        __EMPTY_6: '',
                        __EMPTY_7: '',
                        __EMPTY_8: '',
                        __EMPTY_9: '',
                        __EMPTY_10: 1
                    },
                    {
                        'Отчет "Отчеты по дисциплине:Нарушители"': '',
                        __EMPTY: '2023-06-18 Вс',
                        __EMPTY_1: '',
                        __EMPTY_2: '',
                        __EMPTY_3: 'division1',
                        __EMPTY_4: 'position1',
                        __EMPTY_5: '',
                        __EMPTY_6: '',
                        __EMPTY_7: '',
                        __EMPTY_8: '',
                        __EMPTY_9: '',
                        __EMPTY_10: 1
                    },
                    {
                        'Отчет "Отчеты по дисциплине:Нарушители"': '',
                        __EMPTY: '2023-06-19 Пн',
                        __EMPTY_1: '',
                        __EMPTY_2: '',
                        __EMPTY_3: 'division1',
                        __EMPTY_4: 'position1',
                        __EMPTY_5: '',
                        __EMPTY_6: '',
                        __EMPTY_7: '',
                        __EMPTY_8: '',
                        __EMPTY_9: '',
                        __EMPTY_10: 1
                    },
                    {
                        'Отчет "Отчеты по дисциплине:Нарушители"': '',
                        __EMPTY: '2023-06-20 Вт',
                        __EMPTY_1: '',
                        __EMPTY_2: '',
                        __EMPTY_3: 'division1',
                        __EMPTY_4: 'position1',
                        __EMPTY_5: '',
                        __EMPTY_6: '',
                        __EMPTY_7: '',
                        __EMPTY_8: '',
                        __EMPTY_9: '',
                        __EMPTY_10: 1
                    },
                    {
                        'Отчет "Отчеты по дисциплине:Нарушители"': '',
                        __EMPTY: '2023-06-21 Ср',
                        __EMPTY_1: '',
                        __EMPTY_2: '',
                        __EMPTY_3: 'division1',
                        __EMPTY_4: 'position1',
                        __EMPTY_5: '',
                        __EMPTY_6: '',
                        __EMPTY_7: '',
                        __EMPTY_8: '',
                        __EMPTY_9: '',
                        __EMPTY_10: 1
                    },
                    {
                        'Отчет "Отчеты по дисциплине:Нарушители"': '',
                        __EMPTY: '2023-06-22 Чт',
                        __EMPTY_1: '',
                        __EMPTY_2: '',
                        __EMPTY_3: 'division1',
                        __EMPTY_4: 'position1',
                        __EMPTY_5: '',
                        __EMPTY_6: '',
                        __EMPTY_7: '',
                        __EMPTY_8: '',
                        __EMPTY_9: '',
                        __EMPTY_10: 1
                    },
                    {
                        'Отчет "Отчеты по дисциплине:Нарушители"': '',
                        __EMPTY: '2023-06-23 Пт',
                        __EMPTY_1: '',
                        __EMPTY_2: '',
                        __EMPTY_3: 'division1',
                        __EMPTY_4: 'position1',
                        __EMPTY_5: '',
                        __EMPTY_6: '',
                        __EMPTY_7: '',
                        __EMPTY_8: '',
                        __EMPTY_9: '',
                        __EMPTY_10: 1
                    },
                    {
                        'Отчет "Отчеты по дисциплине:Нарушители"': '',
                        __EMPTY: '2023-06-24 Сб',
                        __EMPTY_1: '',
                        __EMPTY_2: '',
                        __EMPTY_3: 'division1',
                        __EMPTY_4: 'position1',
                        __EMPTY_5: '',
                        __EMPTY_6: '',
                        __EMPTY_7: '',
                        __EMPTY_8: '',
                        __EMPTY_9: '',
                        __EMPTY_10: 1
                    },
                    {
                        'Отчет "Отчеты по дисциплине:Нарушители"': '',
                        __EMPTY: '2023-06-25 Вс',
                        __EMPTY_1: '',
                        __EMPTY_2: '',
                        __EMPTY_3: 'division1',
                        __EMPTY_4: 'position1',
                        __EMPTY_5: '',
                        __EMPTY_6: '',
                        __EMPTY_7: '',
                        __EMPTY_8: '',
                        __EMPTY_9: '',
                        __EMPTY_10: 1
                    },
                    {
                        'Отчет "Отчеты по дисциплине:Нарушители"': '',
                        __EMPTY: '2023-06-26 Пн',
                        __EMPTY_1: '',
                        __EMPTY_2: '',
                        __EMPTY_3: 'division1',
                        __EMPTY_4: 'position1',
                        __EMPTY_5: '',
                        __EMPTY_6: '',
                        __EMPTY_7: '',
                        __EMPTY_8: '',
                        __EMPTY_9: '',
                        __EMPTY_10: 1
                    },
                    {
                        'Отчет "Отчеты по дисциплине:Нарушители"': '',
                        __EMPTY: '2023-06-27 Вт',
                        __EMPTY_1: '',
                        __EMPTY_2: '',
                        __EMPTY_3: 'division1',
                        __EMPTY_4: 'position1',
                        __EMPTY_5: '',
                        __EMPTY_6: '',
                        __EMPTY_7: '',
                        __EMPTY_8: '',
                        __EMPTY_9: '',
                        __EMPTY_10: 1
                    },
                    {
                        'Отчет "Отчеты по дисциплине:Нарушители"': '',
                        __EMPTY: '2023-06-28 Ср',
                        __EMPTY_1: '',
                        __EMPTY_2: '',
                        __EMPTY_3: 'division1',
                        __EMPTY_4: 'position1',
                        __EMPTY_5: '',
                        __EMPTY_6: '',
                        __EMPTY_7: '',
                        __EMPTY_8: '',
                        __EMPTY_9: '',
                        __EMPTY_10: 1
                    },
                    {
                        'Отчет "Отчеты по дисциплине:Нарушители"': '',
                        __EMPTY: '2023-06-29 Чт',
                        __EMPTY_1: '',
                        __EMPTY_2: '',
                        __EMPTY_3: 'division1',
                        __EMPTY_4: 'position1',
                        __EMPTY_5: '',
                        __EMPTY_6: '',
                        __EMPTY_7: '',
                        __EMPTY_8: '',
                        __EMPTY_9: '',
                        __EMPTY_10: 1
                    },
                    {
                        'Отчет "Отчеты по дисциплине:Нарушители"': '',
                        __EMPTY: '2023-06-30 Пт',
                        __EMPTY_1: '',
                        __EMPTY_2: '',
                        __EMPTY_3: 'division1',
                        __EMPTY_4: 'position1',
                        __EMPTY_5: '',
                        __EMPTY_6: '',
                        __EMPTY_7: '',
                        __EMPTY_8: '',
                        __EMPTY_9: '',
                        __EMPTY_10: 1
                    },
                    {
                        'Отчет "Отчеты по дисциплине:Нарушители"': '2',
                        __EMPTY: 'staff',
                        __EMPTY_1: 'name',
                        __EMPTY_2: '2',
                        __EMPTY_3: 'division2',
                        __EMPTY_4: 'position2',
                        __EMPTY_5: '00:02',
                        __EMPTY_6: '00:02',
                        __EMPTY_7: '',
                        __EMPTY_8: '',
                        __EMPTY_9: '00:04',
                        __EMPTY_10: 6
                    },
                    {
                        'Отчет "Отчеты по дисциплине:Нарушители"': '',
                        __EMPTY: '2023-06-06 Вт',
                        __EMPTY_1: '',
                        __EMPTY_2: '',
                        __EMPTY_3: 'division2',
                        __EMPTY_4: 'position2',
                        __EMPTY_5: '00:02',
                        __EMPTY_6: '',
                        __EMPTY_7: '',
                        __EMPTY_8: '',
                        __EMPTY_9: '00:02',
                        __EMPTY_10: 0
                    },
                    {
                        'Отчет "Отчеты по дисциплине:Нарушители"': '',
                        __EMPTY: '2023-06-10 Сб',
                        __EMPTY_1: '',
                        __EMPTY_2: '',
                        __EMPTY_3: 'division2',
                        __EMPTY_4: 'position2',
                        __EMPTY_5: '',
                        __EMPTY_6: '00:02',
                        __EMPTY_7: '',
                        __EMPTY_8: '',
                        __EMPTY_9: '00:02',
                        __EMPTY_10: 0
                    },
                    {
                        'Отчет "Отчеты по дисциплине:Нарушители"': '',
                        __EMPTY: '2023-06-20 Вт',
                        __EMPTY_1: '',
                        __EMPTY_2: '',
                        __EMPTY_3: 'division2',
                        __EMPTY_4: 'position2',
                        __EMPTY_5: '',
                        __EMPTY_6: '',
                        __EMPTY_7: '',
                        __EMPTY_8: '',
                        __EMPTY_9: '',
                        __EMPTY_10: 1
                    },
                    {
                        'Отчет "Отчеты по дисциплине:Нарушители"': '',
                        __EMPTY: '2023-06-22 Чт',
                        __EMPTY_1: '',
                        __EMPTY_2: '',
                        __EMPTY_3: 'division2',
                        __EMPTY_4: 'position2',
                        __EMPTY_5: '',
                        __EMPTY_6: '',
                        __EMPTY_7: '',
                        __EMPTY_8: '',
                        __EMPTY_9: '',
                        __EMPTY_10: 1
                    },
                    {
                        'Отчет "Отчеты по дисциплине:Нарушители"': '',
                        __EMPTY: '2023-06-24 Сб',
                        __EMPTY_1: '',
                        __EMPTY_2: '',
                        __EMPTY_3: 'division2',
                        __EMPTY_4: 'position2',
                        __EMPTY_5: '',
                        __EMPTY_6: '',
                        __EMPTY_7: '',
                        __EMPTY_8: '',
                        __EMPTY_9: '',
                        __EMPTY_10: 1
                    },
                    {
                        'Отчет "Отчеты по дисциплине:Нарушители"': '',
                        __EMPTY: '2023-06-26 Пн',
                        __EMPTY_1: '',
                        __EMPTY_2: '',
                        __EMPTY_3: 'division2',
                        __EMPTY_4: 'position2',
                        __EMPTY_5: '',
                        __EMPTY_6: '',
                        __EMPTY_7: '',
                        __EMPTY_8: '',
                        __EMPTY_9: '',
                        __EMPTY_10: 1
                    },
                    {
                        'Отчет "Отчеты по дисциплине:Нарушители"': '',
                        __EMPTY: '2023-06-28 Ср',
                        __EMPTY_1: '',
                        __EMPTY_2: '',
                        __EMPTY_3: 'division2',
                        __EMPTY_4: 'position2',
                        __EMPTY_5: '',
                        __EMPTY_6: '',
                        __EMPTY_7: '',
                        __EMPTY_8: '',
                        __EMPTY_9: '',
                        __EMPTY_10: 1
                    },
                    {
                        'Отчет "Отчеты по дисциплине:Нарушители"': '',
                        __EMPTY: '2023-06-30 Пт',
                        __EMPTY_1: '',
                        __EMPTY_2: '',
                        __EMPTY_3: 'division2',
                        __EMPTY_4: 'position2',
                        __EMPTY_5: '',
                        __EMPTY_6: '',
                        __EMPTY_7: '',
                        __EMPTY_8: '',
                        __EMPTY_9: '',
                        __EMPTY_10: 1
                    },
                    {
                        'Отчет "Отчеты по дисциплине:Нарушители"': '4',
                        __EMPTY: 'staff',
                        __EMPTY_1: 'name',
                        __EMPTY_2: '4',
                        __EMPTY_3: 'division4',
                        __EMPTY_4: 'position4',
                        __EMPTY_5: '00:02',
                        __EMPTY_6: '00:02',
                        __EMPTY_7: '00:04',
                        __EMPTY_8: '',
                        __EMPTY_9: '00:08',
                        __EMPTY_10: 17
                    },
                    {
                        'Отчет "Отчеты по дисциплине:Нарушители"': '',
                        __EMPTY: '2023-06-04 Вс',
                        __EMPTY_1: '',
                        __EMPTY_2: '',
                        __EMPTY_3: 'division4',
                        __EMPTY_4: 'position4',
                        __EMPTY_5: '00:02',
                        __EMPTY_6: '',
                        __EMPTY_7: '',
                        __EMPTY_8: '',
                        __EMPTY_9: '00:02',
                        __EMPTY_10: 0
                    },
                    {
                        'Отчет "Отчеты по дисциплине:Нарушители"': '',
                        __EMPTY: '2023-06-06 Вт',
                        __EMPTY_1: '',
                        __EMPTY_2: '',
                        __EMPTY_3: 'division4',
                        __EMPTY_4: 'position4',
                        __EMPTY_5: '',
                        __EMPTY_6: '00:02',
                        __EMPTY_7: '',
                        __EMPTY_8: '',
                        __EMPTY_9: '00:02',
                        __EMPTY_10: 0
                    },
                    {
                        'Отчет "Отчеты по дисциплине:Нарушители"': '',
                        __EMPTY: '2023-06-08 Чт',
                        __EMPTY_1: '',
                        __EMPTY_2: '',
                        __EMPTY_3: 'division4',
                        __EMPTY_4: 'position4',
                        __EMPTY_5: '',
                        __EMPTY_6: '',
                        __EMPTY_7: '00:02',
                        __EMPTY_8: '',
                        __EMPTY_9: '00:02',
                        __EMPTY_10: 0
                    },
                    {
                        'Отчет "Отчеты по дисциплине:Нарушители"': '',
                        __EMPTY: '2023-06-09 Пт',
                        __EMPTY_1: '',
                        __EMPTY_2: '',
                        __EMPTY_3: 'division4',
                        __EMPTY_4: 'position4',
                        __EMPTY_5: '',
                        __EMPTY_6: '',
                        __EMPTY_7: '00:02',
                        __EMPTY_8: '',
                        __EMPTY_9: '00:02',
                        __EMPTY_10: 0
                    },
                    {
                        'Отчет "Отчеты по дисциплине:Нарушители"': '',
                        __EMPTY: '2023-06-13 Вт',
                        __EMPTY_1: '',
                        __EMPTY_2: '',
                        __EMPTY_3: 'division4',
                        __EMPTY_4: 'position4',
                        __EMPTY_5: '',
                        __EMPTY_6: '',
                        __EMPTY_7: '',
                        __EMPTY_8: '',
                        __EMPTY_9: '',
                        __EMPTY_10: 1
                    },
                    {
                        'Отчет "Отчеты по дисциплине:Нарушители"': '',
                        __EMPTY: '2023-06-14 Ср',
                        __EMPTY_1: '',
                        __EMPTY_2: '',
                        __EMPTY_3: 'division4',
                        __EMPTY_4: 'position4',
                        __EMPTY_5: '',
                        __EMPTY_6: '',
                        __EMPTY_7: '',
                        __EMPTY_8: '',
                        __EMPTY_9: '',
                        __EMPTY_10: 1
                    },
                    {
                        'Отчет "Отчеты по дисциплине:Нарушители"': '',
                        __EMPTY: '2023-06-15 Чт',
                        __EMPTY_1: '',
                        __EMPTY_2: '',
                        __EMPTY_3: 'division4',
                        __EMPTY_4: 'position4',
                        __EMPTY_5: '',
                        __EMPTY_6: '',
                        __EMPTY_7: '',
                        __EMPTY_8: '',
                        __EMPTY_9: '',
                        __EMPTY_10: 1
                    },
                    {
                        'Отчет "Отчеты по дисциплине:Нарушители"': '',
                        __EMPTY: '2023-06-17 Сб',
                        __EMPTY_1: '',
                        __EMPTY_2: '',
                        __EMPTY_3: 'division4',
                        __EMPTY_4: 'position4',
                        __EMPTY_5: '',
                        __EMPTY_6: '',
                        __EMPTY_7: '',
                        __EMPTY_8: '',
                        __EMPTY_9: '',
                        __EMPTY_10: 1
                    },
                    {
                        'Отчет "Отчеты по дисциплине:Нарушители"': '',
                        __EMPTY: '2023-06-18 Вс',
                        __EMPTY_1: '',
                        __EMPTY_2: '',
                        __EMPTY_3: 'division4',
                        __EMPTY_4: 'position4',
                        __EMPTY_5: '',
                        __EMPTY_6: '',
                        __EMPTY_7: '',
                        __EMPTY_8: '',
                        __EMPTY_9: '',
                        __EMPTY_10: 1
                    },
                    {
                        'Отчет "Отчеты по дисциплине:Нарушители"': '',
                        __EMPTY: '2023-06-19 Пн',
                        __EMPTY_1: '',
                        __EMPTY_2: '',
                        __EMPTY_3: 'division4',
                        __EMPTY_4: 'position4',
                        __EMPTY_5: '',
                        __EMPTY_6: '',
                        __EMPTY_7: '',
                        __EMPTY_8: '',
                        __EMPTY_9: '',
                        __EMPTY_10: 1
                    },
                    {
                        'Отчет "Отчеты по дисциплине:Нарушители"': '',
                        __EMPTY: '2023-06-20 Вт',
                        __EMPTY_1: '',
                        __EMPTY_2: '',
                        __EMPTY_3: 'division4',
                        __EMPTY_4: 'position4',
                        __EMPTY_5: '',
                        __EMPTY_6: '',
                        __EMPTY_7: '',
                        __EMPTY_8: '',
                        __EMPTY_9: '',
                        __EMPTY_10: 1
                    },
                    {
                        'Отчет "Отчеты по дисциплине:Нарушители"': '',
                        __EMPTY: '2023-06-21 Ср',
                        __EMPTY_1: '',
                        __EMPTY_2: '',
                        __EMPTY_3: 'division4',
                        __EMPTY_4: 'position4',
                        __EMPTY_5: '',
                        __EMPTY_6: '',
                        __EMPTY_7: '',
                        __EMPTY_8: '',
                        __EMPTY_9: '',
                        __EMPTY_10: 1
                    },
                    {
                        'Отчет "Отчеты по дисциплине:Нарушители"': '',
                        __EMPTY: '2023-06-22 Чт',
                        __EMPTY_1: '',
                        __EMPTY_2: '',
                        __EMPTY_3: 'division4',
                        __EMPTY_4: 'position4',
                        __EMPTY_5: '',
                        __EMPTY_6: '',
                        __EMPTY_7: '',
                        __EMPTY_8: '',
                        __EMPTY_9: '',
                        __EMPTY_10: 1
                    },
                    {
                        'Отчет "Отчеты по дисциплине:Нарушители"': '',
                        __EMPTY: '2023-06-23 Пт',
                        __EMPTY_1: '',
                        __EMPTY_2: '',
                        __EMPTY_3: 'division4',
                        __EMPTY_4: 'position4',
                        __EMPTY_5: '',
                        __EMPTY_6: '',
                        __EMPTY_7: '',
                        __EMPTY_8: '',
                        __EMPTY_9: '',
                        __EMPTY_10: 1
                    },
                    {
                        'Отчет "Отчеты по дисциплине:Нарушители"': '',
                        __EMPTY: '2023-06-24 Сб',
                        __EMPTY_1: '',
                        __EMPTY_2: '',
                        __EMPTY_3: 'division4',
                        __EMPTY_4: 'position4',
                        __EMPTY_5: '',
                        __EMPTY_6: '',
                        __EMPTY_7: '',
                        __EMPTY_8: '',
                        __EMPTY_9: '',
                        __EMPTY_10: 1
                    },
                    {
                        'Отчет "Отчеты по дисциплине:Нарушители"': '',
                        __EMPTY: '2023-06-25 Вс',
                        __EMPTY_1: '',
                        __EMPTY_2: '',
                        __EMPTY_3: 'division4',
                        __EMPTY_4: 'position4',
                        __EMPTY_5: '',
                        __EMPTY_6: '',
                        __EMPTY_7: '',
                        __EMPTY_8: '',
                        __EMPTY_9: '',
                        __EMPTY_10: 1
                    },
                    {
                        'Отчет "Отчеты по дисциплине:Нарушители"': '',
                        __EMPTY: '2023-06-26 Пн',
                        __EMPTY_1: '',
                        __EMPTY_2: '',
                        __EMPTY_3: 'division4',
                        __EMPTY_4: 'position4',
                        __EMPTY_5: '',
                        __EMPTY_6: '',
                        __EMPTY_7: '',
                        __EMPTY_8: '',
                        __EMPTY_9: '',
                        __EMPTY_10: 1
                    },
                    {
                        'Отчет "Отчеты по дисциплине:Нарушители"': '',
                        __EMPTY: '2023-06-27 Вт',
                        __EMPTY_1: '',
                        __EMPTY_2: '',
                        __EMPTY_3: 'division4',
                        __EMPTY_4: 'position4',
                        __EMPTY_5: '',
                        __EMPTY_6: '',
                        __EMPTY_7: '',
                        __EMPTY_8: '',
                        __EMPTY_9: '',
                        __EMPTY_10: 1
                    },
                    {
                        'Отчет "Отчеты по дисциплине:Нарушители"': '',
                        __EMPTY: '2023-06-28 Ср',
                        __EMPTY_1: '',
                        __EMPTY_2: '',
                        __EMPTY_3: 'division4',
                        __EMPTY_4: 'position4',
                        __EMPTY_5: '',
                        __EMPTY_6: '',
                        __EMPTY_7: '',
                        __EMPTY_8: '',
                        __EMPTY_9: '',
                        __EMPTY_10: 1
                    },
                    {
                        'Отчет "Отчеты по дисциплине:Нарушители"': '',
                        __EMPTY: '2023-06-29 Чт',
                        __EMPTY_1: '',
                        __EMPTY_2: '',
                        __EMPTY_3: 'division4',
                        __EMPTY_4: 'position4',
                        __EMPTY_5: '',
                        __EMPTY_6: '',
                        __EMPTY_7: '',
                        __EMPTY_8: '',
                        __EMPTY_9: '',
                        __EMPTY_10: 1
                    },
                    {
                        'Отчет "Отчеты по дисциплине:Нарушители"': '',
                        __EMPTY: '2023-06-30 Пт',
                        __EMPTY_1: '',
                        __EMPTY_2: '',
                        __EMPTY_3: 'division4',
                        __EMPTY_4: 'position4',
                        __EMPTY_5: '',
                        __EMPTY_6: '',
                        __EMPTY_7: '',
                        __EMPTY_8: '',
                        __EMPTY_9: '',
                        __EMPTY_10: 1
                    },
                    {
                        'Отчет "Отчеты по дисциплине:Нарушители"': '5',
                        __EMPTY: 'staff',
                        __EMPTY_1: 'name',
                        __EMPTY_2: '5',
                        __EMPTY_3: 'division5',
                        __EMPTY_4: 'position5',
                        __EMPTY_5: '00:03',
                        __EMPTY_6: '00:03',
                        __EMPTY_7: '00:02',
                        __EMPTY_8: '',
                        __EMPTY_9: '00:08',
                        __EMPTY_10: 20
                    },
                    {
                        'Отчет "Отчеты по дисциплине:Нарушители"': '',
                        __EMPTY: '2023-06-03 Сб',
                        __EMPTY_1: '',
                        __EMPTY_2: '',
                        __EMPTY_3: 'division5',
                        __EMPTY_4: 'position5',
                        __EMPTY_5: '00:01',
                        __EMPTY_6: '',
                        __EMPTY_7: '',
                        __EMPTY_8: '',
                        __EMPTY_9: '00:01',
                        __EMPTY_10: 0
                    },
                    {
                        'Отчет "Отчеты по дисциплине:Нарушители"': '',
                        __EMPTY: '2023-06-04 Вс',
                        __EMPTY_1: '',
                        __EMPTY_2: '',
                        __EMPTY_3: 'division5',
                        __EMPTY_4: 'position5',
                        __EMPTY_5: '00:02',
                        __EMPTY_6: '',
                        __EMPTY_7: '',
                        __EMPTY_8: '',
                        __EMPTY_9: '00:02',
                        __EMPTY_10: 0
                    },
                    {
                        'Отчет "Отчеты по дисциплине:Нарушители"': '',
                        __EMPTY: '2023-06-05 Пн',
                        __EMPTY_1: '',
                        __EMPTY_2: '',
                        __EMPTY_3: 'division5',
                        __EMPTY_4: 'position5',
                        __EMPTY_5: '',
                        __EMPTY_6: '00:01',
                        __EMPTY_7: '',
                        __EMPTY_8: '',
                        __EMPTY_9: '00:01',
                        __EMPTY_10: 0
                    },
                    {
                        'Отчет "Отчеты по дисциплине:Нарушители"': '',
                        __EMPTY: '2023-06-06 Вт',
                        __EMPTY_1: '',
                        __EMPTY_2: '',
                        __EMPTY_3: 'division5',
                        __EMPTY_4: 'position5',
                        __EMPTY_5: '',
                        __EMPTY_6: '00:02',
                        __EMPTY_7: '',
                        __EMPTY_8: '',
                        __EMPTY_9: '00:02',
                        __EMPTY_10: 0
                    },
                    {
                        'Отчет "Отчеты по дисциплине:Нарушители"': '',
                        __EMPTY: '2023-06-07 Ср',
                        __EMPTY_1: '',
                        __EMPTY_2: '',
                        __EMPTY_3: 'division5',
                        __EMPTY_4: 'position5',
                        __EMPTY_5: '',
                        __EMPTY_6: '',
                        __EMPTY_7: '00:01',
                        __EMPTY_8: '',
                        __EMPTY_9: '00:01',
                        __EMPTY_10: 0
                    },
                    {
                        'Отчет "Отчеты по дисциплине:Нарушители"': '',
                        __EMPTY: '2023-06-08 Чт',
                        __EMPTY_1: '',
                        __EMPTY_2: '',
                        __EMPTY_3: 'division5',
                        __EMPTY_4: 'position5',
                        __EMPTY_5: '',
                        __EMPTY_6: '',
                        __EMPTY_7: '00:01',
                        __EMPTY_8: '',
                        __EMPTY_9: '00:01',
                        __EMPTY_10: 0
                    },
                    {
                        'Отчет "Отчеты по дисциплине:Нарушители"': '',
                        __EMPTY: '2023-06-09 Пт',
                        __EMPTY_1: '',
                        __EMPTY_2: '',
                        __EMPTY_3: 'division5',
                        __EMPTY_4: 'position5',
                        __EMPTY_5: '',
                        __EMPTY_6: '',
                        __EMPTY_7: '',
                        __EMPTY_8: '',
                        __EMPTY_9: '',
                        __EMPTY_10: 1
                    },
                    {
                        'Отчет "Отчеты по дисциплине:Нарушители"': '',
                        __EMPTY: '2023-06-10 Сб',
                        __EMPTY_1: '',
                        __EMPTY_2: '',
                        __EMPTY_3: 'division5',
                        __EMPTY_4: 'position5',
                        __EMPTY_5: '',
                        __EMPTY_6: '',
                        __EMPTY_7: '',
                        __EMPTY_8: '',
                        __EMPTY_9: '',
                        __EMPTY_10: 1
                    },
                    {
                        'Отчет "Отчеты по дисциплине:Нарушители"': '',
                        __EMPTY: '2023-06-11 Вс',
                        __EMPTY_1: '',
                        __EMPTY_2: '',
                        __EMPTY_3: 'division5',
                        __EMPTY_4: 'position5',
                        __EMPTY_5: '',
                        __EMPTY_6: '',
                        __EMPTY_7: '',
                        __EMPTY_8: '',
                        __EMPTY_9: '',
                        __EMPTY_10: 1
                    },
                    {
                        'Отчет "Отчеты по дисциплине:Нарушители"': '',
                        __EMPTY: '2023-06-13 Вт',
                        __EMPTY_1: '',
                        __EMPTY_2: '',
                        __EMPTY_3: 'division5',
                        __EMPTY_4: 'position5',
                        __EMPTY_5: '',
                        __EMPTY_6: '',
                        __EMPTY_7: '',
                        __EMPTY_8: '',
                        __EMPTY_9: '',
                        __EMPTY_10: 1
                    },
                    {
                        'Отчет "Отчеты по дисциплине:Нарушители"': '',
                        __EMPTY: '2023-06-14 Ср',
                        __EMPTY_1: '',
                        __EMPTY_2: '',
                        __EMPTY_3: 'division5',
                        __EMPTY_4: 'position5',
                        __EMPTY_5: '',
                        __EMPTY_6: '',
                        __EMPTY_7: '',
                        __EMPTY_8: '',
                        __EMPTY_9: '',
                        __EMPTY_10: 1
                    },
                    {
                        'Отчет "Отчеты по дисциплине:Нарушители"': '',
                        __EMPTY: '2023-06-15 Чт',
                        __EMPTY_1: '',
                        __EMPTY_2: '',
                        __EMPTY_3: 'division5',
                        __EMPTY_4: 'position5',
                        __EMPTY_5: '',
                        __EMPTY_6: '',
                        __EMPTY_7: '',
                        __EMPTY_8: '',
                        __EMPTY_9: '',
                        __EMPTY_10: 1
                    },
                    {
                        'Отчет "Отчеты по дисциплине:Нарушители"': '',
                        __EMPTY: '2023-06-17 Сб',
                        __EMPTY_1: '',
                        __EMPTY_2: '',
                        __EMPTY_3: 'division5',
                        __EMPTY_4: 'position5',
                        __EMPTY_5: '',
                        __EMPTY_6: '',
                        __EMPTY_7: '',
                        __EMPTY_8: '',
                        __EMPTY_9: '',
                        __EMPTY_10: 1
                    },
                    {
                        'Отчет "Отчеты по дисциплине:Нарушители"': '',
                        __EMPTY: '2023-06-18 Вс',
                        __EMPTY_1: '',
                        __EMPTY_2: '',
                        __EMPTY_3: 'division5',
                        __EMPTY_4: 'position5',
                        __EMPTY_5: '',
                        __EMPTY_6: '',
                        __EMPTY_7: '',
                        __EMPTY_8: '',
                        __EMPTY_9: '',
                        __EMPTY_10: 1
                    },
                    {
                        'Отчет "Отчеты по дисциплине:Нарушители"': '',
                        __EMPTY: '2023-06-19 Пн',
                        __EMPTY_1: '',
                        __EMPTY_2: '',
                        __EMPTY_3: 'division5',
                        __EMPTY_4: 'position5',
                        __EMPTY_5: '',
                        __EMPTY_6: '',
                        __EMPTY_7: '',
                        __EMPTY_8: '',
                        __EMPTY_9: '',
                        __EMPTY_10: 1
                    },
                    {
                        'Отчет "Отчеты по дисциплине:Нарушители"': '',
                        __EMPTY: '2023-06-20 Вт',
                        __EMPTY_1: '',
                        __EMPTY_2: '',
                        __EMPTY_3: 'division5',
                        __EMPTY_4: 'position5',
                        __EMPTY_5: '',
                        __EMPTY_6: '',
                        __EMPTY_7: '',
                        __EMPTY_8: '',
                        __EMPTY_9: '',
                        __EMPTY_10: 1
                    },
                    {
                        'Отчет "Отчеты по дисциплине:Нарушители"': '',
                        __EMPTY: '2023-06-21 Ср',
                        __EMPTY_1: '',
                        __EMPTY_2: '',
                        __EMPTY_3: 'division5',
                        __EMPTY_4: 'position5',
                        __EMPTY_5: '',
                        __EMPTY_6: '',
                        __EMPTY_7: '',
                        __EMPTY_8: '',
                        __EMPTY_9: '',
                        __EMPTY_10: 1
                    },
                    {
                        'Отчет "Отчеты по дисциплине:Нарушители"': '',
                        __EMPTY: '2023-06-22 Чт',
                        __EMPTY_1: '',
                        __EMPTY_2: '',
                        __EMPTY_3: 'division5',
                        __EMPTY_4: 'position5',
                        __EMPTY_5: '',
                        __EMPTY_6: '',
                        __EMPTY_7: '',
                        __EMPTY_8: '',
                        __EMPTY_9: '',
                        __EMPTY_10: 1
                    },
                    {
                        'Отчет "Отчеты по дисциплине:Нарушители"': '',
                        __EMPTY: '2023-06-23 Пт',
                        __EMPTY_1: '',
                        __EMPTY_2: '',
                        __EMPTY_3: 'division5',
                        __EMPTY_4: 'position5',
                        __EMPTY_5: '',
                        __EMPTY_6: '',
                        __EMPTY_7: '',
                        __EMPTY_8: '',
                        __EMPTY_9: '',
                        __EMPTY_10: 1
                    },
                    {
                        'Отчет "Отчеты по дисциплине:Нарушители"': '',
                        __EMPTY: '2023-06-24 Сб',
                        __EMPTY_1: '',
                        __EMPTY_2: '',
                        __EMPTY_3: 'division5',
                        __EMPTY_4: 'position5',
                        __EMPTY_5: '',
                        __EMPTY_6: '',
                        __EMPTY_7: '',
                        __EMPTY_8: '',
                        __EMPTY_9: '',
                        __EMPTY_10: 1
                    },
                    {
                        'Отчет "Отчеты по дисциплине:Нарушители"': '',
                        __EMPTY: '2023-06-25 Вс',
                        __EMPTY_1: '',
                        __EMPTY_2: '',
                        __EMPTY_3: 'division5',
                        __EMPTY_4: 'position5',
                        __EMPTY_5: '',
                        __EMPTY_6: '',
                        __EMPTY_7: '',
                        __EMPTY_8: '',
                        __EMPTY_9: '',
                        __EMPTY_10: 1
                    },
                    {
                        'Отчет "Отчеты по дисциплине:Нарушители"': '',
                        __EMPTY: '2023-06-26 Пн',
                        __EMPTY_1: '',
                        __EMPTY_2: '',
                        __EMPTY_3: 'division5',
                        __EMPTY_4: 'position5',
                        __EMPTY_5: '',
                        __EMPTY_6: '',
                        __EMPTY_7: '',
                        __EMPTY_8: '',
                        __EMPTY_9: '',
                        __EMPTY_10: 1
                    },
                    {
                        'Отчет "Отчеты по дисциплине:Нарушители"': '',
                        __EMPTY: '2023-06-27 Вт',
                        __EMPTY_1: '',
                        __EMPTY_2: '',
                        __EMPTY_3: 'division5',
                        __EMPTY_4: 'position5',
                        __EMPTY_5: '',
                        __EMPTY_6: '',
                        __EMPTY_7: '',
                        __EMPTY_8: '',
                        __EMPTY_9: '',
                        __EMPTY_10: 1
                    },
                    {
                        'Отчет "Отчеты по дисциплине:Нарушители"': '',
                        __EMPTY: '2023-06-28 Ср',
                        __EMPTY_1: '',
                        __EMPTY_2: '',
                        __EMPTY_3: 'division5',
                        __EMPTY_4: 'position5',
                        __EMPTY_5: '',
                        __EMPTY_6: '',
                        __EMPTY_7: '',
                        __EMPTY_8: '',
                        __EMPTY_9: '',
                        __EMPTY_10: 1
                    },
                    {
                        'Отчет "Отчеты по дисциплине:Нарушители"': '',
                        __EMPTY: '2023-06-29 Чт',
                        __EMPTY_1: '',
                        __EMPTY_2: '',
                        __EMPTY_3: 'division5',
                        __EMPTY_4: 'position5',
                        __EMPTY_5: '',
                        __EMPTY_6: '',
                        __EMPTY_7: '',
                        __EMPTY_8: '',
                        __EMPTY_9: '',
                        __EMPTY_10: 1
                    },
                    {
                        'Отчет "Отчеты по дисциплине:Нарушители"': '',
                        __EMPTY: '2023-06-30 Пт',
                        __EMPTY_1: '',
                        __EMPTY_2: '',
                        __EMPTY_3: 'division5',
                        __EMPTY_4: 'position5',
                        __EMPTY_5: '',
                        __EMPTY_6: '',
                        __EMPTY_7: '',
                        __EMPTY_8: '',
                        __EMPTY_9: '',
                        __EMPTY_10: 1
                    },
                    {
                        'Отчет "Отчеты по дисциплине:Нарушители"': '6',
                        __EMPTY: 'staff',
                        __EMPTY_1: 'name',
                        __EMPTY_2: '6',
                        __EMPTY_3: 'division6',
                        __EMPTY_4: 'position6',
                        __EMPTY_5: '',
                        __EMPTY_6: '',
                        __EMPTY_7: '',
                        __EMPTY_8: '',
                        __EMPTY_9: '',
                        __EMPTY_10: 29
                    },
                    {
                        'Отчет "Отчеты по дисциплине:Нарушители"': '',
                        __EMPTY: '2023-06-02 Пт',
                        __EMPTY_1: '',
                        __EMPTY_2: '',
                        __EMPTY_3: 'division6',
                        __EMPTY_4: 'position6',
                        __EMPTY_5: '',
                        __EMPTY_6: '',
                        __EMPTY_7: '',
                        __EMPTY_8: '',
                        __EMPTY_9: '',
                        __EMPTY_10: 1
                    },
                    {
                        'Отчет "Отчеты по дисциплине:Нарушители"': '',
                        __EMPTY: '2023-06-03 Сб',
                        __EMPTY_1: '',
                        __EMPTY_2: '',
                        __EMPTY_3: 'division6',
                        __EMPTY_4: 'position6',
                        __EMPTY_5: '',
                        __EMPTY_6: '',
                        __EMPTY_7: '',
                        __EMPTY_8: '',
                        __EMPTY_9: '',
                        __EMPTY_10: 1
                    },
                    {
                        'Отчет "Отчеты по дисциплине:Нарушители"': '',
                        __EMPTY: '2023-06-04 Вс',
                        __EMPTY_1: '',
                        __EMPTY_2: '',
                        __EMPTY_3: 'division6',
                        __EMPTY_4: 'position6',
                        __EMPTY_5: '',
                        __EMPTY_6: '',
                        __EMPTY_7: '',
                        __EMPTY_8: '',
                        __EMPTY_9: '',
                        __EMPTY_10: 1
                    },
                    {
                        'Отчет "Отчеты по дисциплине:Нарушители"': '',
                        __EMPTY: '2023-06-05 Пн',
                        __EMPTY_1: '',
                        __EMPTY_2: '',
                        __EMPTY_3: 'division6',
                        __EMPTY_4: 'position6',
                        __EMPTY_5: '',
                        __EMPTY_6: '',
                        __EMPTY_7: '',
                        __EMPTY_8: '',
                        __EMPTY_9: '',
                        __EMPTY_10: 1
                    },
                    {
                        'Отчет "Отчеты по дисциплине:Нарушители"': '',
                        __EMPTY: '2023-06-06 Вт',
                        __EMPTY_1: '',
                        __EMPTY_2: '',
                        __EMPTY_3: 'division6',
                        __EMPTY_4: 'position6',
                        __EMPTY_5: '',
                        __EMPTY_6: '',
                        __EMPTY_7: '',
                        __EMPTY_8: '',
                        __EMPTY_9: '',
                        __EMPTY_10: 1
                    },
                    {
                        'Отчет "Отчеты по дисциплине:Нарушители"': '',
                        __EMPTY: '2023-06-07 Ср',
                        __EMPTY_1: '',
                        __EMPTY_2: '',
                        __EMPTY_3: 'division6',
                        __EMPTY_4: 'position6',
                        __EMPTY_5: '',
                        __EMPTY_6: '',
                        __EMPTY_7: '',
                        __EMPTY_8: '',
                        __EMPTY_9: '',
                        __EMPTY_10: 1
                    },
                    {
                        'Отчет "Отчеты по дисциплине:Нарушители"': '',
                        __EMPTY: '2023-06-08 Чт',
                        __EMPTY_1: '',
                        __EMPTY_2: '',
                        __EMPTY_3: 'division6',
                        __EMPTY_4: 'position6',
                        __EMPTY_5: '',
                        __EMPTY_6: '',
                        __EMPTY_7: '',
                        __EMPTY_8: '',
                        __EMPTY_9: '',
                        __EMPTY_10: 1
                    },
                    {
                        'Отчет "Отчеты по дисциплине:Нарушители"': '',
                        __EMPTY: '2023-06-09 Пт',
                        __EMPTY_1: '',
                        __EMPTY_2: '',
                        __EMPTY_3: 'division6',
                        __EMPTY_4: 'position6',
                        __EMPTY_5: '',
                        __EMPTY_6: '',
                        __EMPTY_7: '',
                        __EMPTY_8: '',
                        __EMPTY_9: '',
                        __EMPTY_10: 1
                    },
                    {
                        'Отчет "Отчеты по дисциплине:Нарушители"': '',
                        __EMPTY: '2023-06-10 Сб',
                        __EMPTY_1: '',
                        __EMPTY_2: '',
                        __EMPTY_3: 'division6',
                        __EMPTY_4: 'position6',
                        __EMPTY_5: '',
                        __EMPTY_6: '',
                        __EMPTY_7: '',
                        __EMPTY_8: '',
                        __EMPTY_9: '',
                        __EMPTY_10: 1
                    },
                    {
                        'Отчет "Отчеты по дисциплине:Нарушители"': '',
                        __EMPTY: '2023-06-11 Вс',
                        __EMPTY_1: '',
                        __EMPTY_2: '',
                        __EMPTY_3: 'division6',
                        __EMPTY_4: 'position6',
                        __EMPTY_5: '',
                        __EMPTY_6: '',
                        __EMPTY_7: '',
                        __EMPTY_8: '',
                        __EMPTY_9: '',
                        __EMPTY_10: 1
                    },
                    {
                        'Отчет "Отчеты по дисциплине:Нарушители"': '',
                        __EMPTY: '2023-06-12 Пн',
                        __EMPTY_1: '',
                        __EMPTY_2: '',
                        __EMPTY_3: 'division6',
                        __EMPTY_4: 'position6',
                        __EMPTY_5: '',
                        __EMPTY_6: '',
                        __EMPTY_7: '',
                        __EMPTY_8: '',
                        __EMPTY_9: '',
                        __EMPTY_10: 1
                    },
                    {
                        'Отчет "Отчеты по дисциплине:Нарушители"': '',
                        __EMPTY: '2023-06-13 Вт',
                        __EMPTY_1: '',
                        __EMPTY_2: '',
                        __EMPTY_3: 'division6',
                        __EMPTY_4: 'position6',
                        __EMPTY_5: '',
                        __EMPTY_6: '',
                        __EMPTY_7: '',
                        __EMPTY_8: '',
                        __EMPTY_9: '',
                        __EMPTY_10: 1
                    },
                    {
                        'Отчет "Отчеты по дисциплине:Нарушители"': '',
                        __EMPTY: '2023-06-14 Ср',
                        __EMPTY_1: '',
                        __EMPTY_2: '',
                        __EMPTY_3: 'division6',
                        __EMPTY_4: 'position6',
                        __EMPTY_5: '',
                        __EMPTY_6: '',
                        __EMPTY_7: '',
                        __EMPTY_8: '',
                        __EMPTY_9: '',
                        __EMPTY_10: 1
                    },
                    {
                        'Отчет "Отчеты по дисциплине:Нарушители"': '',
                        __EMPTY: '2023-06-15 Чт',
                        __EMPTY_1: '',
                        __EMPTY_2: '',
                        __EMPTY_3: 'division6',
                        __EMPTY_4: 'position6',
                        __EMPTY_5: '',
                        __EMPTY_6: '',
                        __EMPTY_7: '',
                        __EMPTY_8: '',
                        __EMPTY_9: '',
                        __EMPTY_10: 1
                    },
                    {
                        'Отчет "Отчеты по дисциплине:Нарушители"': '',
                        __EMPTY: '2023-06-16 Пт',
                        __EMPTY_1: '',
                        __EMPTY_2: '',
                        __EMPTY_3: 'division6',
                        __EMPTY_4: 'position6',
                        __EMPTY_5: '',
                        __EMPTY_6: '',
                        __EMPTY_7: '',
                        __EMPTY_8: '',
                        __EMPTY_9: '',
                        __EMPTY_10: 1
                    },
                    {
                        'Отчет "Отчеты по дисциплине:Нарушители"': '',
                        __EMPTY: '2023-06-17 Сб',
                        __EMPTY_1: '',
                        __EMPTY_2: '',
                        __EMPTY_3: 'division6',
                        __EMPTY_4: 'position6',
                        __EMPTY_5: '',
                        __EMPTY_6: '',
                        __EMPTY_7: '',
                        __EMPTY_8: '',
                        __EMPTY_9: '',
                        __EMPTY_10: 1
                    },
                    {
                        'Отчет "Отчеты по дисциплине:Нарушители"': '',
                        __EMPTY: '2023-06-18 Вс',
                        __EMPTY_1: '',
                        __EMPTY_2: '',
                        __EMPTY_3: 'division6',
                        __EMPTY_4: 'position6',
                        __EMPTY_5: '',
                        __EMPTY_6: '',
                        __EMPTY_7: '',
                        __EMPTY_8: '',
                        __EMPTY_9: '',
                        __EMPTY_10: 1
                    },
                    {
                        'Отчет "Отчеты по дисциплине:Нарушители"': '',
                        __EMPTY: '2023-06-19 Пн',
                        __EMPTY_1: '',
                        __EMPTY_2: '',
                        __EMPTY_3: 'division6',
                        __EMPTY_4: 'position6',
                        __EMPTY_5: '',
                        __EMPTY_6: '',
                        __EMPTY_7: '',
                        __EMPTY_8: '',
                        __EMPTY_9: '',
                        __EMPTY_10: 1
                    },
                    {
                        'Отчет "Отчеты по дисциплине:Нарушители"': '',
                        __EMPTY: '2023-06-20 Вт',
                        __EMPTY_1: '',
                        __EMPTY_2: '',
                        __EMPTY_3: 'division6',
                        __EMPTY_4: 'position6',
                        __EMPTY_5: '',
                        __EMPTY_6: '',
                        __EMPTY_7: '',
                        __EMPTY_8: '',
                        __EMPTY_9: '',
                        __EMPTY_10: 1
                    },
                    {
                        'Отчет "Отчеты по дисциплине:Нарушители"': '',
                        __EMPTY: '2023-06-21 Ср',
                        __EMPTY_1: '',
                        __EMPTY_2: '',
                        __EMPTY_3: 'division6',
                        __EMPTY_4: 'position6',
                        __EMPTY_5: '',
                        __EMPTY_6: '',
                        __EMPTY_7: '',
                        __EMPTY_8: '',
                        __EMPTY_9: '',
                        __EMPTY_10: 1
                    },
                    {
                        'Отчет "Отчеты по дисциплине:Нарушители"': '',
                        __EMPTY: '2023-06-22 Чт',
                        __EMPTY_1: '',
                        __EMPTY_2: '',
                        __EMPTY_3: 'division6',
                        __EMPTY_4: 'position6',
                        __EMPTY_5: '',
                        __EMPTY_6: '',
                        __EMPTY_7: '',
                        __EMPTY_8: '',
                        __EMPTY_9: '',
                        __EMPTY_10: 1
                    },
                    {
                        'Отчет "Отчеты по дисциплине:Нарушители"': '',
                        __EMPTY: '2023-06-23 Пт',
                        __EMPTY_1: '',
                        __EMPTY_2: '',
                        __EMPTY_3: 'division6',
                        __EMPTY_4: 'position6',
                        __EMPTY_5: '',
                        __EMPTY_6: '',
                        __EMPTY_7: '',
                        __EMPTY_8: '',
                        __EMPTY_9: '',
                        __EMPTY_10: 1
                    },
                    {
                        'Отчет "Отчеты по дисциплине:Нарушители"': '',
                        __EMPTY: '2023-06-24 Сб',
                        __EMPTY_1: '',
                        __EMPTY_2: '',
                        __EMPTY_3: 'division6',
                        __EMPTY_4: 'position6',
                        __EMPTY_5: '',
                        __EMPTY_6: '',
                        __EMPTY_7: '',
                        __EMPTY_8: '',
                        __EMPTY_9: '',
                        __EMPTY_10: 1
                    },
                    {
                        'Отчет "Отчеты по дисциплине:Нарушители"': '',
                        __EMPTY: '2023-06-25 Вс',
                        __EMPTY_1: '',
                        __EMPTY_2: '',
                        __EMPTY_3: 'division6',
                        __EMPTY_4: 'position6',
                        __EMPTY_5: '',
                        __EMPTY_6: '',
                        __EMPTY_7: '',
                        __EMPTY_8: '',
                        __EMPTY_9: '',
                        __EMPTY_10: 1
                    },
                    {
                        'Отчет "Отчеты по дисциплине:Нарушители"': '',
                        __EMPTY: '2023-06-26 Пн',
                        __EMPTY_1: '',
                        __EMPTY_2: '',
                        __EMPTY_3: 'division6',
                        __EMPTY_4: 'position6',
                        __EMPTY_5: '',
                        __EMPTY_6: '',
                        __EMPTY_7: '',
                        __EMPTY_8: '',
                        __EMPTY_9: '',
                        __EMPTY_10: 1
                    },
                    {
                        'Отчет "Отчеты по дисциплине:Нарушители"': '',
                        __EMPTY: '2023-06-27 Вт',
                        __EMPTY_1: '',
                        __EMPTY_2: '',
                        __EMPTY_3: 'division6',
                        __EMPTY_4: 'position6',
                        __EMPTY_5: '',
                        __EMPTY_6: '',
                        __EMPTY_7: '',
                        __EMPTY_8: '',
                        __EMPTY_9: '',
                        __EMPTY_10: 1
                    },
                    {
                        'Отчет "Отчеты по дисциплине:Нарушители"': '',
                        __EMPTY: '2023-06-28 Ср',
                        __EMPTY_1: '',
                        __EMPTY_2: '',
                        __EMPTY_3: 'division6',
                        __EMPTY_4: 'position6',
                        __EMPTY_5: '',
                        __EMPTY_6: '',
                        __EMPTY_7: '',
                        __EMPTY_8: '',
                        __EMPTY_9: '',
                        __EMPTY_10: 1
                    },
                    {
                        'Отчет "Отчеты по дисциплине:Нарушители"': '',
                        __EMPTY: '2023-06-29 Чт',
                        __EMPTY_1: '',
                        __EMPTY_2: '',
                        __EMPTY_3: 'division6',
                        __EMPTY_4: 'position6',
                        __EMPTY_5: '',
                        __EMPTY_6: '',
                        __EMPTY_7: '',
                        __EMPTY_8: '',
                        __EMPTY_9: '',
                        __EMPTY_10: 1
                    },
                    {
                        'Отчет "Отчеты по дисциплине:Нарушители"': '',
                        __EMPTY: '2023-06-30 Пт',
                        __EMPTY_1: '',
                        __EMPTY_2: '',
                        __EMPTY_3: 'division6',
                        __EMPTY_4: 'position6',
                        __EMPTY_5: '',
                        __EMPTY_6: '',
                        __EMPTY_7: '',
                        __EMPTY_8: '',
                        __EMPTY_9: '',
                        __EMPTY_10: 1
                    },
                    {
                        'Отчет "Отчеты по дисциплине:Нарушители"': '7',
                        __EMPTY: 'staff',
                        __EMPTY_1: 'name',
                        __EMPTY_2: '7',
                        __EMPTY_3: 'division7',
                        __EMPTY_4: 'position7',
                        __EMPTY_5: '',
                        __EMPTY_6: '',
                        __EMPTY_7: '',
                        __EMPTY_8: '',
                        __EMPTY_9: '',
                        __EMPTY_10: 14
                    },
                    {
                        'Отчет "Отчеты по дисциплине:Нарушители"': '',
                        __EMPTY: '2023-06-04 Вс',
                        __EMPTY_1: '',
                        __EMPTY_2: '',
                        __EMPTY_3: 'division7',
                        __EMPTY_4: 'position7',
                        __EMPTY_5: '',
                        __EMPTY_6: '',
                        __EMPTY_7: '',
                        __EMPTY_8: '',
                        __EMPTY_9: '',
                        __EMPTY_10: 1
                    },
                    {
                        'Отчет "Отчеты по дисциплине:Нарушители"': '',
                        __EMPTY: '2023-06-06 Вт',
                        __EMPTY_1: '',
                        __EMPTY_2: '',
                        __EMPTY_3: 'division7',
                        __EMPTY_4: 'position7',
                        __EMPTY_5: '',
                        __EMPTY_6: '',
                        __EMPTY_7: '',
                        __EMPTY_8: '',
                        __EMPTY_9: '',
                        __EMPTY_10: 1
                    },
                    {
                        'Отчет "Отчеты по дисциплине:Нарушители"': '',
                        __EMPTY: '2023-06-08 Чт',
                        __EMPTY_1: '',
                        __EMPTY_2: '',
                        __EMPTY_3: 'division7',
                        __EMPTY_4: 'position7',
                        __EMPTY_5: '',
                        __EMPTY_6: '',
                        __EMPTY_7: '',
                        __EMPTY_8: '',
                        __EMPTY_9: '',
                        __EMPTY_10: 1
                    },
                    {
                        'Отчет "Отчеты по дисциплине:Нарушители"': '',
                        __EMPTY: '2023-06-10 Сб',
                        __EMPTY_1: '',
                        __EMPTY_2: '',
                        __EMPTY_3: 'division7',
                        __EMPTY_4: 'position7',
                        __EMPTY_5: '',
                        __EMPTY_6: '',
                        __EMPTY_7: '',
                        __EMPTY_8: '',
                        __EMPTY_9: '',
                        __EMPTY_10: 1
                    },
                    {
                        'Отчет "Отчеты по дисциплине:Нарушители"': '',
                        __EMPTY: '2023-06-12 Пн',
                        __EMPTY_1: '',
                        __EMPTY_2: '',
                        __EMPTY_3: 'division7',
                        __EMPTY_4: 'position7',
                        __EMPTY_5: '',
                        __EMPTY_6: '',
                        __EMPTY_7: '',
                        __EMPTY_8: '',
                        __EMPTY_9: '',
                        __EMPTY_10: 1
                    },
                    {
                        'Отчет "Отчеты по дисциплине:Нарушители"': '',
                        __EMPTY: '2023-06-14 Ср',
                        __EMPTY_1: '',
                        __EMPTY_2: '',
                        __EMPTY_3: 'division7',
                        __EMPTY_4: 'position7',
                        __EMPTY_5: '',
                        __EMPTY_6: '',
                        __EMPTY_7: '',
                        __EMPTY_8: '',
                        __EMPTY_9: '',
                        __EMPTY_10: 1
                    },
                    {
                        'Отчет "Отчеты по дисциплине:Нарушители"': '',
                        __EMPTY: '2023-06-16 Пт',
                        __EMPTY_1: '',
                        __EMPTY_2: '',
                        __EMPTY_3: 'division7',
                        __EMPTY_4: 'position7',
                        __EMPTY_5: '',
                        __EMPTY_6: '',
                        __EMPTY_7: '',
                        __EMPTY_8: '',
                        __EMPTY_9: '',
                        __EMPTY_10: 1
                    },
                    {
                        'Отчет "Отчеты по дисциплине:Нарушители"': '',
                        __EMPTY: '2023-06-18 Вс',
                        __EMPTY_1: '',
                        __EMPTY_2: '',
                        __EMPTY_3: 'division7',
                        __EMPTY_4: 'position7',
                        __EMPTY_5: '',
                        __EMPTY_6: '',
                        __EMPTY_7: '',
                        __EMPTY_8: '',
                        __EMPTY_9: '',
                        __EMPTY_10: 1
                    },
                    {
                        'Отчет "Отчеты по дисциплине:Нарушители"': '',
                        __EMPTY: '2023-06-20 Вт',
                        __EMPTY_1: '',
                        __EMPTY_2: '',
                        __EMPTY_3: 'division7',
                        __EMPTY_4: 'position7',
                        __EMPTY_5: '',
                        __EMPTY_6: '',
                        __EMPTY_7: '',
                        __EMPTY_8: '',
                        __EMPTY_9: '',
                        __EMPTY_10: 1
                    },
                    {
                        'Отчет "Отчеты по дисциплине:Нарушители"': '',
                        __EMPTY: '2023-06-22 Чт',
                        __EMPTY_1: '',
                        __EMPTY_2: '',
                        __EMPTY_3: 'division7',
                        __EMPTY_4: 'position7',
                        __EMPTY_5: '',
                        __EMPTY_6: '',
                        __EMPTY_7: '',
                        __EMPTY_8: '',
                        __EMPTY_9: '',
                        __EMPTY_10: 1
                    },
                    {
                        'Отчет "Отчеты по дисциплине:Нарушители"': '',
                        __EMPTY: '2023-06-24 Сб',
                        __EMPTY_1: '',
                        __EMPTY_2: '',
                        __EMPTY_3: 'division7',
                        __EMPTY_4: 'position7',
                        __EMPTY_5: '',
                        __EMPTY_6: '',
                        __EMPTY_7: '',
                        __EMPTY_8: '',
                        __EMPTY_9: '',
                        __EMPTY_10: 1
                    },
                    {
                        'Отчет "Отчеты по дисциплине:Нарушители"': '',
                        __EMPTY: '2023-06-26 Пн',
                        __EMPTY_1: '',
                        __EMPTY_2: '',
                        __EMPTY_3: 'division7',
                        __EMPTY_4: 'position7',
                        __EMPTY_5: '',
                        __EMPTY_6: '',
                        __EMPTY_7: '',
                        __EMPTY_8: '',
                        __EMPTY_9: '',
                        __EMPTY_10: 1
                    },
                    {
                        'Отчет "Отчеты по дисциплине:Нарушители"': '',
                        __EMPTY: '2023-06-28 Ср',
                        __EMPTY_1: '',
                        __EMPTY_2: '',
                        __EMPTY_3: 'division7',
                        __EMPTY_4: 'position7',
                        __EMPTY_5: '',
                        __EMPTY_6: '',
                        __EMPTY_7: '',
                        __EMPTY_8: '',
                        __EMPTY_9: '',
                        __EMPTY_10: 1
                    },
                    {
                        'Отчет "Отчеты по дисциплине:Нарушители"': '',
                        __EMPTY: '2023-06-30 Пт',
                        __EMPTY_1: '',
                        __EMPTY_2: '',
                        __EMPTY_3: 'division7',
                        __EMPTY_4: 'position7',
                        __EMPTY_5: '',
                        __EMPTY_6: '',
                        __EMPTY_7: '',
                        __EMPTY_8: '',
                        __EMPTY_9: '',
                        __EMPTY_10: 1
                    }
                ]
            }

            befViolator();
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
                    strCount: 6,
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

        if(type === 'presence') {
            const params = {
                nameFile: 'presence.xlsx',
                json:  [
                    {
                        'Отчет "Отчеты по дисциплине:Присутствующие на данный момент"': 'Табельный номер',
                        __EMPTY: 'Фамилия',
                        __EMPTY_1: 'Имя',
                        __EMPTY_2: 'Отчество',
                        __EMPTY_3: 'Подразделение',
                        __EMPTY_4: 'Должность'
                    },
                    {
                        'Отчет "Отчеты по дисциплине:Присутствующие на данный момент"': '3',
                        __EMPTY: 'staff',
                        __EMPTY_1: 'name',
                        __EMPTY_2: '3',
                        __EMPTY_3: 'division3',
                        __EMPTY_4: 'position3'
                    },
                    {
                        'Отчет "Отчеты по дисциплине:Присутствующие на данный момент"': '5',
                        __EMPTY: 'staff',
                        __EMPTY_1: 'name',
                        __EMPTY_2: '5',
                        __EMPTY_3: 'division5',
                        __EMPTY_4: 'position5'
                    }
                ]
            }

            befPresence();
            aft();

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

        if(type === 'absent') {
            const params = {
                nameFile: 'absence.xlsx',
                json: [
                    {
                        'Отчет "Отчеты по дисциплине:Отсутствующие сегодня"': 'Табельный номер',
                        __EMPTY: 'Фамилия',
                        __EMPTY_1: 'Имя',
                        __EMPTY_2: 'Отчество',
                        __EMPTY_3: 'Подразделение',
                        __EMPTY_4: 'Должность'
                    },
                    {
                        'Отчет "Отчеты по дисциплине:Отсутствующие сегодня"': '2',
                        __EMPTY: 'staff',
                        __EMPTY_1: 'name',
                        __EMPTY_2: '2',
                        __EMPTY_3: 'division2',
                        __EMPTY_4: 'position2'
                    },
                    {
                        'Отчет "Отчеты по дисциплине:Отсутствующие сегодня"': '6',
                        __EMPTY: 'staff',
                        __EMPTY_1: 'name',
                        __EMPTY_2: '6',
                        __EMPTY_3: 'division6',
                        __EMPTY_4: 'position6'
                    },
                    {
                        'Отчет "Отчеты по дисциплине:Отсутствующие сегодня"': '7',
                        __EMPTY: 'staff',
                        __EMPTY_1: 'name',
                        __EMPTY_2: '7',
                        __EMPTY_3: 'division7',
                        __EMPTY_4: 'position7'
                    }
                ]
            }

            befAbsent();
            aft();

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

        if(type === 'late') {
            const params = {
                nameFile: 'late.xlsx',
                json: [
                    {
                        'Отчет "Отчеты по дисциплине: Опоздавшие сегодня"': 'Табельный номер',
                        __EMPTY: 'Фамилия',
                        __EMPTY_1: 'Имя',
                        __EMPTY_2: 'Отчество',
                        __EMPTY_3: 'Подразделение',
                        __EMPTY_4: 'Должность',
                        __EMPTY_5: 'Время'
                    },
                    {
                        'Отчет "Отчеты по дисциплине: Опоздавшие сегодня"': '1',
                        __EMPTY: 'staff',
                        __EMPTY_1: 'name',
                        __EMPTY_2: '1',
                        __EMPTY_3: 'division1',
                        __EMPTY_4: 'position1',
                        __EMPTY_5: '03:00'
                    },
                    {
                        'Отчет "Отчеты по дисциплине: Опоздавшие сегодня"': '4',
                        __EMPTY: 'staff',
                        __EMPTY_1: 'name',
                        __EMPTY_2: '4',
                        __EMPTY_3: 'division4',
                        __EMPTY_4: 'position4',
                        __EMPTY_5: '03:00'
                    },
                    {
                        'Отчет "Отчеты по дисциплине: Опоздавшие сегодня"': '5',
                        __EMPTY: 'staff',
                        __EMPTY_1: 'name',
                        __EMPTY_2: '5',
                        __EMPTY_3: 'division5',
                        __EMPTY_4: 'position5',
                        __EMPTY_5: '03:00'
                    }
                ]
            }

            befLate();
            aft();

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

        if(type === 'early') {
            const params = {
                nameFile: 'early.xlsx',
                json: [
                    {
                        'Отчет "Отчеты по дисциплине:Ушедшие раньше сегодня"': 'Табельный номер',
                        __EMPTY: 'Фамилия',
                        __EMPTY_1: 'Имя',
                        __EMPTY_2: 'Отчество',
                        __EMPTY_3: 'Подразделение',
                        __EMPTY_4: 'Должность',
                        __EMPTY_5: 'Время'
                    },
                    {
                        'Отчет "Отчеты по дисциплине:Ушедшие раньше сегодня"': '1',
                        __EMPTY: 'staff',
                        __EMPTY_1: 'name',
                        __EMPTY_2: '1',
                        __EMPTY_3: 'division1',
                        __EMPTY_4: 'position1',
                        __EMPTY_5: '05:00'
                    },
                    {
                        'Отчет "Отчеты по дисциплине:Ушедшие раньше сегодня"': '4',
                        __EMPTY: 'staff',
                        __EMPTY_1: 'name',
                        __EMPTY_2: '4',
                        __EMPTY_3: 'division4',
                        __EMPTY_4: 'position4',
                        __EMPTY_5: '05:00'
                    }
                ]
            }

            befEarly();
            aft();

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

        if(type === 'overwork') {
            const params = {
                nameFile: 'overwork.xlsx',
                json: [
                    {
                        'Отчет "Отчеты по дисциплине:Переработка"': 'Табельный номер',
                        __EMPTY: 'Фамилия',
                        __EMPTY_1: 'Имя',
                        __EMPTY_2: 'Отчество',
                        __EMPTY_3: 'Подразделение',
                        __EMPTY_4: 'Должность',
                        __EMPTY_5: 'Присутствие до начала рабочего дня',
                        __EMPTY_6: 'Присутствие после окончания рабочего дня',
                        __EMPTY_7: 'Переработка'
                    },
                    {
                        'Отчет "Отчеты по дисциплине:Переработка"': '1',
                        __EMPTY: 'staff',
                        __EMPTY_1: 'name',
                        __EMPTY_2: '1',
                        __EMPTY_3: 'division1',
                        __EMPTY_4: 'position1',
                        __EMPTY_5: '00:01',
                        __EMPTY_6: '00:01',
                        __EMPTY_7: '00:02'
                    },
                    {
                        'Отчет "Отчеты по дисциплине:Переработка"': '',
                        __EMPTY: '2023-06-10 Сб',
                        __EMPTY_1: '',
                        __EMPTY_2: '',
                        __EMPTY_3: 'division1',
                        __EMPTY_4: 'position1',
                        __EMPTY_5: '00:01',
                        __EMPTY_6: '00:01',
                        __EMPTY_7: '00:02'
                    },
                    {
                        'Отчет "Отчеты по дисциплине:Переработка"': '2',
                        __EMPTY: 'staff',
                        __EMPTY_1: 'name',
                        __EMPTY_2: '2',
                        __EMPTY_3: 'division2',
                        __EMPTY_4: 'position2',
                        __EMPTY_5: '',
                        __EMPTY_6: '',
                        __EMPTY_7: '00:02'
                    },
                    {
                        'Отчет "Отчеты по дисциплине:Переработка"': '',
                        __EMPTY: '2023-06-18 Вс',
                        __EMPTY_1: '',
                        __EMPTY_2: '',
                        __EMPTY_3: 'division2',
                        __EMPTY_4: 'position2',
                        __EMPTY_5: '',
                        __EMPTY_6: '',
                        __EMPTY_7: '00:02'
                    },
                    {
                        'Отчет "Отчеты по дисциплине:Переработка"': '4',
                        __EMPTY: 'staff',
                        __EMPTY_1: 'name',
                        __EMPTY_2: '4',
                        __EMPTY_3: 'division4',
                        __EMPTY_4: 'position4',
                        __EMPTY_5: '00:01',
                        __EMPTY_6: '00:01',
                        __EMPTY_7: '00:02'
                    },
                    {
                        'Отчет "Отчеты по дисциплине:Переработка"': '',
                        __EMPTY: '2023-06-11 Вс',
                        __EMPTY_1: '',
                        __EMPTY_2: '',
                        __EMPTY_3: 'division4',
                        __EMPTY_4: 'position4',
                        __EMPTY_5: '00:01',
                        __EMPTY_6: '00:01',
                        __EMPTY_7: '00:02'
                    },
                    {
                        'Отчет "Отчеты по дисциплине:Переработка"': '5',
                        __EMPTY: 'staff',
                        __EMPTY_1: 'name',
                        __EMPTY_2: '5',
                        __EMPTY_3: 'division5',
                        __EMPTY_4: 'position5',
                        __EMPTY_5: '',
                        __EMPTY_6: '',
                        __EMPTY_7: '00:02'
                    },
                    {
                        'Отчет "Отчеты по дисциплине:Переработка"': '',
                        __EMPTY: '2023-06-02 Пт',
                        __EMPTY_1: '',
                        __EMPTY_2: '',
                        __EMPTY_3: 'division5',
                        __EMPTY_4: 'position5',
                        __EMPTY_5: '',
                        __EMPTY_6: '',
                        __EMPTY_7: '00:02'
                    }
                ]
            }

            befOverwork();
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

    const exportCSV = () => describe(text + ' Проверка экспорта CSV.', () => {
        if(type === 'violator') {
            const params = {
                nameFile: 'violators.csv',
                json: [
                    {
                        'Табельный номер': 1,
                        'Фамилия': 'staff',
                        'Имя': 'name',
                        'Отчество': 1,
                        'Подразделение': 'division1',
                        'Должность': 'position1',
                        'Опозданий': '00:02',
                        'Уходов раньше': '00:02',
                        'Нарушений дисциплины в течение рабочего дня': '00:02',
                        'Итого нарушений дисциплины': '00:06',
                        'Неявок': 18
                    },
                    {
                        'Фамилия': '2023-06-04 Вс',
                        'Подразделение': 'division1',
                        'Должность': 'position1',
                        'Опозданий': '00:02',
                        'Итого нарушений дисциплины': '00:02',
                        'Неявок': 0
                    },
                    {
                        'Фамилия': '2023-06-06 Вт',
                        'Подразделение': 'division1',
                        'Должность': 'position1',
                        'Уходов раньше': '00:02',
                        'Итого нарушений дисциплины': '00:02',
                        'Неявок': 0
                    },
                    {
                        'Фамилия': '2023-06-08 Чт',
                        'Подразделение': 'division1',
                        'Должность': 'position1',
                        'Нарушений дисциплины в течение рабочего дня': '00:02',
                        'Итого нарушений дисциплины': '00:02',
                        'Неявок': 0
                    },
                    {
                        'Фамилия': '2023-06-11 Вс',
                        'Подразделение': 'division1',
                        'Должность': 'position1',
                        'Неявок': 1
                    },
                    {
                        'Фамилия': '2023-06-13 Вт',
                        'Подразделение': 'division1',
                        'Должность': 'position1',
                        'Неявок': 1
                    },
                    {
                        'Фамилия': '2023-06-14 Ср',
                        'Подразделение': 'division1',
                        'Должность': 'position1',
                        'Неявок': 1
                    },
                    {
                        'Фамилия': '2023-06-15 Чт',
                        'Подразделение': 'division1',
                        'Должность': 'position1',
                        'Неявок': 1
                    },
                    {
                        'Фамилия': '2023-06-17 Сб',
                        'Подразделение': 'division1',
                        'Должность': 'position1',
                        'Неявок': 1
                    },
                    {
                        'Фамилия': '2023-06-18 Вс',
                        'Подразделение': 'division1',
                        'Должность': 'position1',
                        'Неявок': 1
                    },
                    {
                        'Фамилия': '2023-06-19 Пн',
                        'Подразделение': 'division1',
                        'Должность': 'position1',
                        'Неявок': 1
                    },
                    {
                        'Фамилия': '2023-06-20 Вт',
                        'Подразделение': 'division1',
                        'Должность': 'position1',
                        'Неявок': 1
                    },
                    {
                        'Фамилия': '2023-06-21 Ср',
                        'Подразделение': 'division1',
                        'Должность': 'position1',
                        'Неявок': 1
                    },
                    {
                        'Фамилия': '2023-06-22 Чт',
                        'Подразделение': 'division1',
                        'Должность': 'position1',
                        'Неявок': 1
                    },
                    {
                        'Фамилия': '2023-06-23 Пт',
                        'Подразделение': 'division1',
                        'Должность': 'position1',
                        'Неявок': 1
                    },
                    {
                        'Фамилия': '2023-06-24 Сб',
                        'Подразделение': 'division1',
                        'Должность': 'position1',
                        'Неявок': 1
                    },
                    {
                        'Фамилия': '2023-06-25 Вс',
                        'Подразделение': 'division1',
                        'Должность': 'position1',
                        'Неявок': 1
                    },
                    {
                        'Фамилия': '2023-06-26 Пн',
                        'Подразделение': 'division1',
                        'Должность': 'position1',
                        'Неявок': 1
                    },
                    {
                        'Фамилия': '2023-06-27 Вт',
                        'Подразделение': 'division1',
                        'Должность': 'position1',
                        'Неявок': 1
                    },
                    {
                        'Фамилия': '2023-06-28 Ср',
                        'Подразделение': 'division1',
                        'Должность': 'position1',
                        'Неявок': 1
                    },
                    {
                        'Фамилия': '2023-06-29 Чт',
                        'Подразделение': 'division1',
                        'Должность': 'position1',
                        'Неявок': 1
                    },
                    {
                        'Фамилия': '2023-06-30 Пт',
                        'Подразделение': 'division1',
                        'Должность': 'position1',
                        'Неявок': 1
                    },
                    {
                        'Табельный номер': 2,
                        'Фамилия': 'staff',
                        'Имя': 'name',
                        'Отчество': 2,
                        'Подразделение': 'division2',
                        'Должность': 'position2',
                        'Опозданий': '00:02',
                        'Уходов раньше': '00:02',
                        'Итого нарушений дисциплины': '00:04',
                        'Неявок': 6
                    },
                    {
                        'Фамилия': '2023-06-06 Вт',
                        'Подразделение': 'division2',
                        'Должность': 'position2',
                        'Опозданий': '00:02',
                        'Итого нарушений дисциплины': '00:02',
                        'Неявок': 0
                    },
                    {
                        'Фамилия': '2023-06-10 Сб',
                        'Подразделение': 'division2',
                        'Должность': 'position2',
                        'Уходов раньше': '00:02',
                        'Итого нарушений дисциплины': '00:02',
                        'Неявок': 0
                    },
                    {
                        'Фамилия': '2023-06-20 Вт',
                        'Подразделение': 'division2',
                        'Должность': 'position2',
                        'Неявок': 1
                    },
                    {
                        'Фамилия': '2023-06-22 Чт',
                        'Подразделение': 'division2',
                        'Должность': 'position2',
                        'Неявок': 1
                    },
                    {
                        'Фамилия': '2023-06-24 Сб',
                        'Подразделение': 'division2',
                        'Должность': 'position2',
                        'Неявок': 1
                    },
                    {
                        'Фамилия': '2023-06-26 Пн',
                        'Подразделение': 'division2',
                        'Должность': 'position2',
                        'Неявок': 1
                    },
                    {
                        'Фамилия': '2023-06-28 Ср',
                        'Подразделение': 'division2',
                        'Должность': 'position2',
                        'Неявок': 1
                    },
                    {
                        'Фамилия': '2023-06-30 Пт',
                        'Подразделение': 'division2',
                        'Должность': 'position2',
                        'Неявок': 1
                    },
                    {
                        'Табельный номер': 4,
                        'Фамилия': 'staff',
                        'Имя': 'name',
                        'Отчество': 4,
                        'Подразделение': 'division4',
                        'Должность': 'position4',
                        'Опозданий': '00:02',
                        'Уходов раньше': '00:02',
                        'Нарушений дисциплины в течение рабочего дня': '00:04',
                        'Итого нарушений дисциплины': '00:08',
                        'Неявок': 17
                    },
                    {
                        'Фамилия': '2023-06-04 Вс',
                        'Подразделение': 'division4',
                        'Должность': 'position4',
                        'Опозданий': '00:02',
                        'Итого нарушений дисциплины': '00:02',
                        'Неявок': 0
                    },
                    {
                        'Фамилия': '2023-06-06 Вт',
                        'Подразделение': 'division4',
                        'Должность': 'position4',
                        'Уходов раньше': '00:02',
                        'Итого нарушений дисциплины': '00:02',
                        'Неявок': 0
                    },
                    {
                        'Фамилия': '2023-06-08 Чт',
                        'Подразделение': 'division4',
                        'Должность': 'position4',
                        'Нарушений дисциплины в течение рабочего дня': '00:02',
                        'Итого нарушений дисциплины': '00:02',
                        'Неявок': 0
                    },
                    {
                        'Фамилия': '2023-06-09 Пт',
                        'Подразделение': 'division4',
                        'Должность': 'position4',
                        'Нарушений дисциплины в течение рабочего дня': '00:02',
                        'Итого нарушений дисциплины': '00:02',
                        'Неявок': 0
                    },
                    {
                        'Фамилия': '2023-06-13 Вт',
                        'Подразделение': 'division4',
                        'Должность': 'position4',
                        'Неявок': 1
                    },
                    {
                        'Фамилия': '2023-06-14 Ср',
                        'Подразделение': 'division4',
                        'Должность': 'position4',
                        'Неявок': 1
                    },
                    {
                        'Фамилия': '2023-06-15 Чт',
                        'Подразделение': 'division4',
                        'Должность': 'position4',
                        'Неявок': 1
                    },
                    {
                        'Фамилия': '2023-06-17 Сб',
                        'Подразделение': 'division4',
                        'Должность': 'position4',
                        'Неявок': 1
                    },
                    {
                        'Фамилия': '2023-06-18 Вс',
                        'Подразделение': 'division4',
                        'Должность': 'position4',
                        'Неявок': 1
                    },
                    {
                        'Фамилия': '2023-06-19 Пн',
                        'Подразделение': 'division4',
                        'Должность': 'position4',
                        'Неявок': 1
                    },
                    {
                        'Фамилия': '2023-06-20 Вт',
                        'Подразделение': 'division4',
                        'Должность': 'position4',
                        'Неявок': 1
                    },
                    {
                        'Фамилия': '2023-06-21 Ср',
                        'Подразделение': 'division4',
                        'Должность': 'position4',
                        'Неявок': 1
                    },
                    {
                        'Фамилия': '2023-06-22 Чт',
                        'Подразделение': 'division4',
                        'Должность': 'position4',
                        'Неявок': 1
                    },
                    {
                        'Фамилия': '2023-06-23 Пт',
                        'Подразделение': 'division4',
                        'Должность': 'position4',
                        'Неявок': 1
                    },
                    {
                        'Фамилия': '2023-06-24 Сб',
                        'Подразделение': 'division4',
                        'Должность': 'position4',
                        'Неявок': 1
                    },
                    {
                        'Фамилия': '2023-06-25 Вс',
                        'Подразделение': 'division4',
                        'Должность': 'position4',
                        'Неявок': 1
                    },
                    {
                        'Фамилия': '2023-06-26 Пн',
                        'Подразделение': 'division4',
                        'Должность': 'position4',
                        'Неявок': 1
                    },
                    {
                        'Фамилия': '2023-06-27 Вт',
                        'Подразделение': 'division4',
                        'Должность': 'position4',
                        'Неявок': 1
                    },
                    {
                        'Фамилия': '2023-06-28 Ср',
                        'Подразделение': 'division4',
                        'Должность': 'position4',
                        'Неявок': 1
                    },
                    {
                        'Фамилия': '2023-06-29 Чт',
                        'Подразделение': 'division4',
                        'Должность': 'position4',
                        'Неявок': 1
                    },
                    {
                        'Фамилия': '2023-06-30 Пт',
                        'Подразделение': 'division4',
                        'Должность': 'position4',
                        'Неявок': 1
                    },
                    {
                        'Табельный номер': 5,
                        'Фамилия': 'staff',
                        'Имя': 'name',
                        'Отчество': 5,
                        'Подразделение': 'division5',
                        'Должность': 'position5',
                        'Опозданий': '00:03',
                        'Уходов раньше': '00:03',
                        'Нарушений дисциплины в течение рабочего дня': '00:02',
                        'Итого нарушений дисциплины': '00:08',
                        'Неявок': 20
                    },
                    {
                        'Фамилия': '2023-06-03 Сб',
                        'Подразделение': 'division5',
                        'Должность': 'position5',
                        'Опозданий': '00:01',
                        'Итого нарушений дисциплины': '00:01',
                        'Неявок': 0
                    },
                    {
                        'Фамилия': '2023-06-04 Вс',
                        'Подразделение': 'division5',
                        'Должность': 'position5',
                        'Опозданий': '00:02',
                        'Итого нарушений дисциплины': '00:02',
                        'Неявок': 0
                    },
                    {
                        'Фамилия': '2023-06-05 Пн',
                        'Подразделение': 'division5',
                        'Должность': 'position5',
                        'Уходов раньше': '00:01',
                        'Итого нарушений дисциплины': '00:01',
                        'Неявок': 0
                    },
                    {
                        'Фамилия': '2023-06-06 Вт',
                        'Подразделение': 'division5',
                        'Должность': 'position5',
                        'Уходов раньше': '00:02',
                        'Итого нарушений дисциплины': '00:02',
                        'Неявок': 0
                    },
                    {
                        'Фамилия': '2023-06-07 Ср',
                        'Подразделение': 'division5',
                        'Должность': 'position5',
                        'Нарушений дисциплины в течение рабочего дня': '00:01',
                        'Итого нарушений дисциплины': '00:01',
                        'Неявок': 0
                    },
                    {
                        'Фамилия': '2023-06-08 Чт',
                        'Подразделение': 'division5',
                        'Должность': 'position5',
                        'Нарушений дисциплины в течение рабочего дня': '00:01',
                        'Итого нарушений дисциплины': '00:01',
                        'Неявок': 0
                    },
                    {
                        'Фамилия': '2023-06-09 Пт',
                        'Подразделение': 'division5',
                        'Должность': 'position5',
                        'Неявок': 1
                    },
                    {
                        'Фамилия': '2023-06-10 Сб',
                        'Подразделение': 'division5',
                        'Должность': 'position5',
                        'Неявок': 1
                    },
                    {
                        'Фамилия': '2023-06-11 Вс',
                        'Подразделение': 'division5',
                        'Должность': 'position5',
                        'Неявок': 1
                    },
                    {
                        'Фамилия': '2023-06-13 Вт',
                        'Подразделение': 'division5',
                        'Должность': 'position5',
                        'Неявок': 1
                    },
                    {
                        'Фамилия': '2023-06-14 Ср',
                        'Подразделение': 'division5',
                        'Должность': 'position5',
                        'Неявок': 1
                    },
                    {
                        'Фамилия': '2023-06-15 Чт',
                        'Подразделение': 'division5',
                        'Должность': 'position5',
                        'Неявок': 1
                    },
                    {
                        'Фамилия': '2023-06-17 Сб',
                        'Подразделение': 'division5',
                        'Должность': 'position5',
                        'Неявок': 1
                    },
                    {
                        'Фамилия': '2023-06-18 Вс',
                        'Подразделение': 'division5',
                        'Должность': 'position5',
                        'Неявок': 1
                    },
                    {
                        'Фамилия': '2023-06-19 Пн',
                        'Подразделение': 'division5',
                        'Должность': 'position5',
                        'Неявок': 1
                    },
                    {
                        'Фамилия': '2023-06-20 Вт',
                        'Подразделение': 'division5',
                        'Должность': 'position5',
                        'Неявок': 1
                    },
                    {
                        'Фамилия': '2023-06-21 Ср',
                        'Подразделение': 'division5',
                        'Должность': 'position5',
                        'Неявок': 1
                    },
                    {
                        'Фамилия': '2023-06-22 Чт',
                        'Подразделение': 'division5',
                        'Должность': 'position5',
                        'Неявок': 1
                    },
                    {
                        'Фамилия': '2023-06-23 Пт',
                        'Подразделение': 'division5',
                        'Должность': 'position5',
                        'Неявок': 1
                    },
                    {
                        'Фамилия': '2023-06-24 Сб',
                        'Подразделение': 'division5',
                        'Должность': 'position5',
                        'Неявок': 1
                    },
                    {
                        'Фамилия': '2023-06-25 Вс',
                        'Подразделение': 'division5',
                        'Должность': 'position5',
                        'Неявок': 1
                    },
                    {
                        'Фамилия': '2023-06-26 Пн',
                        'Подразделение': 'division5',
                        'Должность': 'position5',
                        'Неявок': 1
                    },
                    {
                        'Фамилия': '2023-06-27 Вт',
                        'Подразделение': 'division5',
                        'Должность': 'position5',
                        'Неявок': 1
                    },
                    {
                        'Фамилия': '2023-06-28 Ср',
                        'Подразделение': 'division5',
                        'Должность': 'position5',
                        'Неявок': 1
                    },
                    {
                        'Фамилия': '2023-06-29 Чт',
                        'Подразделение': 'division5',
                        'Должность': 'position5',
                        'Неявок': 1
                    },
                    {
                        'Фамилия': '2023-06-30 Пт',
                        'Подразделение': 'division5',
                        'Должность': 'position5',
                        'Неявок': 1
                    },
                    {
                        'Табельный номер': 6,
                        'Фамилия': 'staff',
                        'Имя': 'name',
                        'Отчество': 6,
                        'Подразделение': 'division6',
                        'Должность': 'position6',
                        'Неявок': 29
                    },
                    {
                        'Фамилия': '2023-06-02 Пт',
                        'Подразделение': 'division6',
                        'Должность': 'position6',
                        'Неявок': 1
                    },
                    {
                        'Фамилия': '2023-06-03 Сб',
                        'Подразделение': 'division6',
                        'Должность': 'position6',
                        'Неявок': 1
                    },
                    {
                        'Фамилия': '2023-06-04 Вс',
                        'Подразделение': 'division6',
                        'Должность': 'position6',
                        'Неявок': 1
                    },
                    {
                        'Фамилия': '2023-06-05 Пн',
                        'Подразделение': 'division6',
                        'Должность': 'position6',
                        'Неявок': 1
                    },
                    {
                        'Фамилия': '2023-06-06 Вт',
                        'Подразделение': 'division6',
                        'Должность': 'position6',
                        'Неявок': 1
                    },
                    {
                        'Фамилия': '2023-06-07 Ср',
                        'Подразделение': 'division6',
                        'Должность': 'position6',
                        'Неявок': 1
                    },
                    {
                        'Фамилия': '2023-06-08 Чт',
                        'Подразделение': 'division6',
                        'Должность': 'position6',
                        'Неявок': 1
                    },
                    {
                        'Фамилия': '2023-06-09 Пт',
                        'Подразделение': 'division6',
                        'Должность': 'position6',
                        'Неявок': 1
                    },
                    {
                        'Фамилия': '2023-06-10 Сб',
                        'Подразделение': 'division6',
                        'Должность': 'position6',
                        'Неявок': 1
                    },
                    {
                        'Фамилия': '2023-06-11 Вс',
                        'Подразделение': 'division6',
                        'Должность': 'position6',
                        'Неявок': 1
                    },
                    {
                        'Фамилия': '2023-06-12 Пн',
                        'Подразделение': 'division6',
                        'Должность': 'position6',
                        'Неявок': 1
                    },
                    {
                        'Фамилия': '2023-06-13 Вт',
                        'Подразделение': 'division6',
                        'Должность': 'position6',
                        'Неявок': 1
                    },
                    {
                        'Фамилия': '2023-06-14 Ср',
                        'Подразделение': 'division6',
                        'Должность': 'position6',
                        'Неявок': 1
                    },
                    {
                        'Фамилия': '2023-06-15 Чт',
                        'Подразделение': 'division6',
                        'Должность': 'position6',
                        'Неявок': 1
                    },
                    {
                        'Фамилия': '2023-06-16 Пт',
                        'Подразделение': 'division6',
                        'Должность': 'position6',
                        'Неявок': 1
                    },
                    {
                        'Фамилия': '2023-06-17 Сб',
                        'Подразделение': 'division6',
                        'Должность': 'position6',
                        'Неявок': 1
                    },
                    {
                        'Фамилия': '2023-06-18 Вс',
                        'Подразделение': 'division6',
                        'Должность': 'position6',
                        'Неявок': 1
                    },
                    {
                        'Фамилия': '2023-06-19 Пн',
                        'Подразделение': 'division6',
                        'Должность': 'position6',
                        'Неявок': 1
                    },
                    {
                        'Фамилия': '2023-06-20 Вт',
                        'Подразделение': 'division6',
                        'Должность': 'position6',
                        'Неявок': 1
                    },
                    {
                        'Фамилия': '2023-06-21 Ср',
                        'Подразделение': 'division6',
                        'Должность': 'position6',
                        'Неявок': 1
                    },
                    {
                        'Фамилия': '2023-06-22 Чт',
                        'Подразделение': 'division6',
                        'Должность': 'position6',
                        'Неявок': 1
                    },
                    {
                        'Фамилия': '2023-06-23 Пт',
                        'Подразделение': 'division6',
                        'Должность': 'position6',
                        'Неявок': 1
                    },
                    {
                        'Фамилия': '2023-06-24 Сб',
                        'Подразделение': 'division6',
                        'Должность': 'position6',
                        'Неявок': 1
                    },
                    {
                        'Фамилия': '2023-06-25 Вс',
                        'Подразделение': 'division6',
                        'Должность': 'position6',
                        'Неявок': 1
                    },
                    {
                        'Фамилия': '2023-06-26 Пн',
                        'Подразделение': 'division6',
                        'Должность': 'position6',
                        'Неявок': 1
                    },
                    {
                        'Фамилия': '2023-06-27 Вт',
                        'Подразделение': 'division6',
                        'Должность': 'position6',
                        'Неявок': 1
                    },
                    {
                        'Фамилия': '2023-06-28 Ср',
                        'Подразделение': 'division6',
                        'Должность': 'position6',
                        'Неявок': 1
                    },
                    {
                        'Фамилия': '2023-06-29 Чт',
                        'Подразделение': 'division6',
                        'Должность': 'position6',
                        'Неявок': 1
                    },
                    {
                        'Фамилия': '2023-06-30 Пт',
                        'Подразделение': 'division6',
                        'Должность': 'position6',
                        'Неявок': 1
                    },
                    {
                        'Табельный номер': 7,
                        'Фамилия': 'staff',
                        'Имя': 'name',
                        'Отчество': 7,
                        'Подразделение': 'division7',
                        'Должность': 'position7',
                        'Неявок': 14
                    },
                    {
                        'Фамилия': '2023-06-04 Вс',
                        'Подразделение': 'division7',
                        'Должность': 'position7',
                        'Неявок': 1
                    },
                    {
                        'Фамилия': '2023-06-06 Вт',
                        'Подразделение': 'division7',
                        'Должность': 'position7',
                        'Неявок': 1
                    },
                    {
                        'Фамилия': '2023-06-08 Чт',
                        'Подразделение': 'division7',
                        'Должность': 'position7',
                        'Неявок': 1
                    },
                    {
                        'Фамилия': '2023-06-10 Сб',
                        'Подразделение': 'division7',
                        'Должность': 'position7',
                        'Неявок': 1
                    },
                    {
                        'Фамилия': '2023-06-12 Пн',
                        'Подразделение': 'division7',
                        'Должность': 'position7',
                        'Неявок': 1
                    },
                    {
                        'Фамилия': '2023-06-14 Ср',
                        'Подразделение': 'division7',
                        'Должность': 'position7',
                        'Неявок': 1
                    },
                    {
                        'Фамилия': '2023-06-16 Пт',
                        'Подразделение': 'division7',
                        'Должность': 'position7',
                        'Неявок': 1
                    },
                    {
                        'Фамилия': '2023-06-18 Вс',
                        'Подразделение': 'division7',
                        'Должность': 'position7',
                        'Неявок': 1
                    },
                    {
                        'Фамилия': '2023-06-20 Вт',
                        'Подразделение': 'division7',
                        'Должность': 'position7',
                        'Неявок': 1
                    },
                    {
                        'Фамилия': '2023-06-22 Чт',
                        'Подразделение': 'division7',
                        'Должность': 'position7',
                        'Неявок': 1
                    },
                    {
                        'Фамилия': '2023-06-24 Сб',
                        'Подразделение': 'division7',
                        'Должность': 'position7',
                        'Неявок': 1
                    },
                    {
                        'Фамилия': '2023-06-26 Пн',
                        'Подразделение': 'division7',
                        'Должность': 'position7',
                        'Неявок': 1
                    },
                    {
                        'Фамилия': '2023-06-28 Ср',
                        'Подразделение': 'division7',
                        'Должность': 'position7',
                        'Неявок': 1
                    },
                    {
                        'Фамилия': '2023-06-30 Пт',
                        'Подразделение': 'division7',
                        'Должность': 'position7',
                        'Неявок': 1
                    }
                ]
            }

            befViolator();
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
                    strCount: 6,
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

        if(type === 'presence') {
            const params = {
                nameFile: 'presence.csv',
                json:  [
                    {
                        'Табельный номер': 3,
                        'Фамилия': 'staff',
                        'Имя': 'name',
                        'Отчество': 3,
                        'Подразделение': 'division3',
                        'Должность': 'position3'
                    },
                    {
                        'Табельный номер': 5,
                        'Фамилия': 'staff',
                        'Имя': 'name',
                        'Отчество': 5,
                        'Подразделение': 'division5',
                        'Должность': 'position5'
                    }
                ]
            }

            befPresence();
            aft();

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

        if(type === 'absent') {
            const params = {
                nameFile: 'absence.csv',
                json: [
                    {
                        'Табельный номер': 2,
                        'Фамилия': 'staff',
                        'Имя': 'name',
                        'Отчество': 2,
                        'Подразделение': 'division2',
                        'Должность': 'position2'
                    },
                    {
                        'Табельный номер': 6,
                        'Фамилия': 'staff',
                        'Имя': 'name',
                        'Отчество': 6,
                        'Подразделение': 'division6',
                        'Должность': 'position6'
                    },
                    {
                        'Табельный номер': 7,
                        'Фамилия': 'staff',
                        'Имя': 'name',
                        'Отчество': 7,
                        'Подразделение': 'division7',
                        'Должность': 'position7'
                    }
                ]
            }

            befAbsent();
            aft();

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

        if(type === 'late') {
            const params = {
                nameFile: 'late.csv',
                json: [
                    {
                        'Табельный номер': 1,
                        'Фамилия': 'staff',
                        'Имя': 'name',
                        'Отчество': 1,
                        'Подразделение': 'division1',
                        'Должность': 'position1',
                        'Время': '03:00'
                    },
                    {
                        'Табельный номер': 4,
                        'Фамилия': 'staff',
                        'Имя': 'name',
                        'Отчество': 4,
                        'Подразделение': 'division4',
                        'Должность': 'position4',
                        'Время': '03:00'
                    },
                    {
                        'Табельный номер': 5,
                        'Фамилия': 'staff',
                        'Имя': 'name',
                        'Отчество': 5,
                        'Подразделение': 'division5',
                        'Должность': 'position5',
                        'Время': '03:00'
                    }
                ]
            }

            befLate();
            aft();

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

        if(type === 'early') {
            const params = {
                nameFile: 'early.csv',
                json: [
                    {
                        'Табельный номер': 1,
                        'Фамилия': 'staff',
                        'Имя': 'name',
                        'Отчество': 1,
                        'Подразделение': 'division1',
                        'Должность': 'position1',
                        'Время': '05:00'
                    },
                    {
                        'Табельный номер': 4,
                        'Фамилия': 'staff',
                        'Имя': 'name',
                        'Отчество': 4,
                        'Подразделение': 'division4',
                        'Должность': 'position4',
                        'Время': '05:00'
                    }
                ]
            }

            befEarly();
            aft();

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

        if(type === 'overwork') {
            const params = {
                nameFile: 'overwork.csv',
                json: [
                    {
                        'Табельный номер': 1,
                        'Фамилия': 'staff',
                        'Имя': 'name',
                        'Отчество': 1,
                        'Подразделение': 'division1',
                        'Должность': 'position1',
                        'Присутствие до начала рабочего дня': '00:01',
                        'Присутствие после окончания рабочего дня': '00:01',
                        'Переработка': '00:02'
                    },
                    {
                        'Фамилия': '2023-06-10 Сб',
                        'Подразделение': 'division1',
                        'Должность': 'position1',
                        'Присутствие до начала рабочего дня': '00:01',
                        'Присутствие после окончания рабочего дня': '00:01',
                        'Переработка': '00:02'
                    },
                    {
                        'Табельный номер': 2,
                        'Фамилия': 'staff',
                        'Имя': 'name',
                        'Отчество': 2,
                        'Подразделение': 'division2',
                        'Должность': 'position2',
                        'Переработка': '00:02'
                    },
                    {
                        'Фамилия': '2023-06-18 Вс',
                        'Подразделение': 'division2',
                        'Должность': 'position2',
                        'Переработка': '00:02'
                    },
                    {
                        'Табельный номер': 4,
                        'Фамилия': 'staff',
                        'Имя': 'name',
                        'Отчество': 4,
                        'Подразделение': 'division4',
                        'Должность': 'position4',
                        'Присутствие до начала рабочего дня': '00:01',
                        'Присутствие после окончания рабочего дня': '00:01',
                        'Переработка': '00:02'
                    },
                    {
                        'Фамилия': '2023-06-11 Вс',
                        'Подразделение': 'division4',
                        'Должность': 'position4',
                        'Присутствие до начала рабочего дня': '00:01',
                        'Присутствие после окончания рабочего дня': '00:01',
                        'Переработка': '00:02'
                    },
                    {
                        'Табельный номер': 5,
                        'Фамилия': 'staff',
                        'Имя': 'name',
                        'Отчество': 5,
                        'Подразделение': 'division5',
                        'Должность': 'position5',
                        'Переработка': '00:02'
                    },
                    {
                        'Фамилия': '2023-06-02 Пт',
                        'Подразделение': 'division5',
                        'Должность': 'position5',
                        'Переработка': '00:02'
                    }
                ]
            }

            befOverwork();
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

    const divisionFilter = () => describe(text + ' Проверка фильтра по подразделению.', () => {
        if(type === 'violator') {
            befViolator();
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
                    strCount: 6,
                    timeout: entry.max
                });
            });

            describe('Проверка таблицы до изпользования фильтра "Подразделение"', () => {
                decorate.el.table.size({
                    strCount: 6,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Подразделение',
                    strNumber: 1,
                    cellNumber: 3,
                    value: data.divisions.division1.name,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Подразделение',
                    strNumber: 2,
                    cellNumber: 3,
                    value: data.divisions.division2.name,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Подразделение',
                    strNumber: 3,
                    cellNumber: 3,
                    value: data.divisions.division4.name,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Подразделение',
                    strNumber: 4,
                    cellNumber: 3,
                    value: data.divisions.division5.name,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Подразделение',
                    strNumber: 5,
                    cellNumber: 3,
                    value: data.divisions.division6.name,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Подразделение',
                    strNumber: 6,
                    cellNumber: 3,
                    value: data.divisions.division7.name,
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
                    cellNumber: 3,
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
                        strCount: 1,
                        timeout: entry.max
                    });
                    decorate.el.table.cellGetText({
                        headTitle: 'Подразделение',
                        strNumber: 1,
                        cellNumber: 3,
                        value: data.divisions.division1.name,
                        timeout: entry.max
                    });
                });
        }

        if(type === 'presence') {
            befPresence();
            aft();

            describe('Проверка таблицы до изпользования фильтра "Подразделение"', () => {
                decorate.el.table.size({
                    strCount: 2,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Подразделение',
                    strNumber: 1,
                    cellNumber: 3,
                    value: data.divisions.division3.name,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Подразделение',
                    strNumber: 2,
                    cellNumber: 3,
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
                    cellNumber: 3,
                    value: data.divisions.division5.name,
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
                        cellNumber: 3,
                        value: data.divisions.division3.name,
                        timeout: entry.max
                    });
                });
        }

        if(type === 'absent') {
            befAbsent();
            aft();

            describe('Проверка таблицы до изпользования фильтра "Подразделение"', () => {
                decorate.el.table.size({
                    strCount: 3,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Подразделение',
                    strNumber: 1,
                    cellNumber: 3,
                    value: data.divisions.division2.name,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Подразделение',
                    strNumber: 2,
                    cellNumber: 3,
                    value: data.divisions.division6.name,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Подразделение',
                    strNumber: 3,
                    cellNumber: 3,
                    value: data.divisions.division7.name,
                    timeout: entry.max
                });
            });

            describe(`Выбор в фильтре "${data.divisions.division6.name}" через окно выбора`, () => {
                decorate.el.selectInput.iconXpand({
                    title: '',
                    placeholder: 'Подразделение',
                    timeout: entry.max
                });
                decorate.el.selectXpand.xpand({
                    timeout: entry.max
                });
                decorate.el.selectXpand.handler({
                    value: data.divisions.division6.name,
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
                    cellNumber: 3,
                    value: data.divisions.division6.name,
                    timeout: entry.max
                });
            });

            describe(`Выбор в фильтре "${data.divisions.division7.name}" через модальное окно "Подразделение"`, () => {
                decorate.el.selectInput.iconOutline({
                    title: '',
                    placeholder: 'Подразделение',
                    timeout: entry.max
                });
                decorate.modal.divisionFilter.init({
                    timeout: entry.max
                });
                decorate.el.filterTreeNode.handler({
                    name: data.divisions.division7.name,
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
                        cellNumber: 3,
                        value: data.divisions.division7.name,
                        timeout: entry.max
                    });
                });
        }

        if(type === 'late') {
            befLate();
            aft();

            describe('Проверка таблицы до изпользования фильтра "Подразделение"', () => {
                decorate.el.table.size({
                    strCount: 3,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Подразделение',
                    strNumber: 1,
                    cellNumber: 3,
                    value: data.divisions.division1.name,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Подразделение',
                    strNumber: 2,
                    cellNumber: 3,
                    value: data.divisions.division4.name,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Подразделение',
                    strNumber: 3,
                    cellNumber: 3,
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
                    cellNumber: 3,
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
                        cellNumber: 3,
                        value: data.divisions.division4.name,
                        timeout: entry.max
                    });
                });
        }

        if(type === 'early') {
            befEarly();
            aft();

            describe('Проверка таблицы до изпользования фильтра "Подразделение"', () => {
                decorate.el.table.size({
                    strCount: 2,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Подразделение',
                    strNumber: 1,
                    cellNumber: 3,
                    value: data.divisions.division1.name,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Подразделение',
                    strNumber: 2,
                    cellNumber: 3,
                    value: data.divisions.division4.name,
                    timeout: entry.max
                });
            });

            describe(`Выбор в фильтре "${data.divisions.division1.name}" через окно выбора`, () => {
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
                    cellNumber: 3,
                    value: data.divisions.division1.name,
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
                        cellNumber: 3,
                        value: data.divisions.division4.name,
                        timeout: entry.max
                    });
                });
        }

        if(type === 'overwork') {
            befOverwork();
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
                    cellNumber: 3,
                    value: data.divisions.division1.name,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Подразделение',
                    strNumber: 2,
                    cellNumber: 3,
                    value: data.divisions.division2.name,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Подразделение',
                    strNumber: 3,
                    cellNumber: 3,
                    value: data.divisions.division4.name,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Подразделение',
                    strNumber: 4,
                    cellNumber: 3,
                    value: data.divisions.division5.name,
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
                    cellNumber: 3,
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
                        strCount: 1,
                        timeout: entry.max
                    });
                    decorate.el.table.cellGetText({
                        headTitle: 'Подразделение',
                        strNumber: 1,
                        cellNumber: 3,
                        value: data.divisions.division1.name,
                        timeout: entry.max
                    });
                });
        }
    });

    const searchFilter = () => describe(text + 'Проверка фильтра "Поиск...".', () => {
        if(type === 'violator') {
            befViolator();
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
                    strCount: 6,
                    timeout: entry.max
                });
            });

            describe('Проверка таблицы до использования фильтра "Поиск..."', () => {
                decorate.el.table.size({
                    strCount: 6,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Сотрудники',
                    strNumber: 1,
                    cellNumber: 2,
                    value: data.fio.staff1,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Сотрудники',
                    strNumber: 2,
                    cellNumber: 2,
                    value: data.fio.staff2,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Сотрудники',
                    strNumber: 3,
                    cellNumber: 2,
                    value: data.fio.staff4,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Сотрудники',
                    strNumber: 4,
                    cellNumber: 2,
                    value: data.fio.staff5,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Сотрудники',
                    strNumber: 5,
                    cellNumber: 2,
                    value: data.fio.staff6,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Сотрудники',
                    strNumber: 6,
                    cellNumber: 2,
                    value: data.fio.staff7,
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
                    headTitle: 'Сотрудники',
                    strNumber: 1,
                    cellNumber: 2,
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
                    strCount: 6,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Сотрудники',
                    strNumber: 1,
                    cellNumber: 2,
                    value: data.fio.staff1,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Сотрудники',
                    strNumber: 2,
                    cellNumber: 2,
                    value: data.fio.staff2,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Сотрудники',
                    strNumber: 3,
                    cellNumber: 2,
                    value: data.fio.staff4,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Сотрудники',
                    strNumber: 4,
                    cellNumber: 2,
                    value: data.fio.staff5,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Сотрудники',
                    strNumber: 5,
                    cellNumber: 2,
                    value: data.fio.staff6,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Сотрудники',
                    strNumber: 6,
                    cellNumber: 2,
                    value: data.fio.staff7,
                    timeout: entry.max
                });
            });
        }

        if(type === 'presence') {
            befPresence();
            aft();

            describe('Проверка таблицы до использования фильтра "Поиск..."', () => {
                decorate.el.table.size({
                    strCount: 2,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Сотрудники',
                    strNumber: 1,
                    cellNumber: 2,
                    value: data.fio.staff3,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Сотрудники',
                    strNumber: 2,
                    cellNumber: 2,
                    value: data.fio.staff5,
                    timeout: entry.max
                });
            });

            describe(`Ввод в фильтр "${data.fio.staff3}"`, () => {
                decorate.el.input.sendKeys({
                    title: '',
                    placeholder: 'Поиск...',
                    value: data.fio.staff3,
                    timeout: entry.max
                });
            });

            describe('Проверка таблицы после использования фильтра "Поиск..."', () => {
                decorate.el.table.size({
                    strCount: 1,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Сотрудники',
                    strNumber: 1,
                    cellNumber: 2,
                    value: data.fio.staff3,
                    timeout: entry.max
                });
            });

            describe(`Удаление "${data.fio.staff3}" из фильтра "Поиск..." и проверка таблицы`, () => {
                decorate.el.input.backSpace({
                    title: '',
                    placeholder: 'Поиск...',
                    timeout: entry.max
                });
                dec.animation();
                decorate.el.table.size({
                    strCount: 2,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Сотрудники',
                    strNumber: 1,
                    cellNumber: 2,
                    value: data.fio.staff3,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Сотрудники',
                    strNumber: 2,
                    cellNumber: 2,
                    value: data.fio.staff5,
                    timeout: entry.max
                });
            });
        }

        if(type === 'absent') {
            befAbsent();
            aft();

            describe('Проверка таблицы до использования фильтра "Поиск..."', () => {
                decorate.el.table.size({
                    strCount: 3,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Сотрудники',
                    strNumber: 1,
                    cellNumber: 2,
                    value: data.fio.staff2,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Сотрудники',
                    strNumber: 2,
                    cellNumber: 2,
                    value: data.fio.staff6,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Сотрудники',
                    strNumber: 3,
                    cellNumber: 2,
                    value: data.fio.staff7,
                    timeout: entry.max
                });
            });

            describe(`Ввод в фильтр "${data.fio.staff6}"`, () => {
                decorate.el.input.sendKeys({
                    title: '',
                    placeholder: 'Поиск...',
                    value: data.fio.staff6,
                    timeout: entry.max
                });
            });

            describe('Проверка таблицы после использования фильтра "Поиск..."', () => {
                decorate.el.table.size({
                    strCount: 1,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Сотрудники',
                    strNumber: 1,
                    cellNumber: 2,
                    value: data.fio.staff6,
                    timeout: entry.max
                });
            });

            describe(`Удаление "${data.fio.staff6}" из фильтра "Поиск..." и проверка таблицы`, () => {
                decorate.el.input.backSpace({
                    title: '',
                    placeholder: 'Поиск...',
                    timeout: entry.max
                });
                dec.animation();
                decorate.el.table.size({
                    strCount: 3,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Сотрудники',
                    strNumber: 1,
                    cellNumber: 2,
                    value: data.fio.staff2,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Сотрудники',
                    strNumber: 2,
                    cellNumber: 2,
                    value: data.fio.staff6,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Сотрудники',
                    strNumber: 3,
                    cellNumber: 2,
                    value: data.fio.staff7,
                    timeout: entry.max
                });
            });
        }

        if(type === 'late') {
            befLate();
            aft();

            describe('Проверка таблицы до использования фильтра "Поиск..."', () => {
                decorate.el.table.size({
                    strCount: 3,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Сотрудники',
                    strNumber: 1,
                    cellNumber: 2,
                    value: data.fio.staff1,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Сотрудники',
                    strNumber: 2,
                    cellNumber: 2,
                    value: data.fio.staff4,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Сотрудники',
                    strNumber: 3,
                    cellNumber: 2,
                    value: data.fio.staff5,
                    timeout: entry.max
                });
            });

            describe(`Ввод в фильтр "${data.fio.staff4}"`, () => {
                decorate.el.input.sendKeys({
                    title: '',
                    placeholder: 'Поиск...',
                    value: data.fio.staff4,
                    timeout: entry.max
                });
            });

            describe('Проверка таблицы после использования фильтра "Поиск..."', () => {
                decorate.el.table.size({
                    strCount: 1,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Сотрудники',
                    strNumber: 1,
                    cellNumber: 2,
                    value: data.fio.staff4,
                    timeout: entry.max
                });
            });

            describe(`Удаление "${data.fio.staff4}" из фильтра "Поиск..." и проверка таблицы`, () => {
                decorate.el.input.backSpace({
                    title: '',
                    placeholder: 'Поиск...',
                    timeout: entry.max
                });
                dec.animation();
                decorate.el.table.size({
                    strCount: 3,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Сотрудники',
                    strNumber: 1,
                    cellNumber: 2,
                    value: data.fio.staff1,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Сотрудники',
                    strNumber: 2,
                    cellNumber: 2,
                    value: data.fio.staff4,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Сотрудники',
                    strNumber: 3,
                    cellNumber: 2,
                    value: data.fio.staff5,
                    timeout: entry.max
                });
            });

        }

        if(type === 'early') {
            befEarly();
            aft();

            describe('Проверка таблицы до использования фильтра "Поиск..."', () => {
                decorate.el.table.size({
                    strCount: 2,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Сотрудники',
                    strNumber: 1,
                    cellNumber: 2,
                    value: data.fio.staff1,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Сотрудники',
                    strNumber: 2,
                    cellNumber: 2,
                    value: data.fio.staff4,
                    timeout: entry.max
                });
            });

            describe(`Ввод в фильтр "${data.fio.staff4}"`, () => {
                decorate.el.input.sendKeys({
                    title: '',
                    placeholder: 'Поиск...',
                    value: data.fio.staff4,
                    timeout: entry.max
                });
            });

            describe('Проверка таблицы после использования фильтра "Поиск..."', () => {
                decorate.el.table.size({
                    strCount: 1,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Сотрудники',
                    strNumber: 1,
                    cellNumber: 2,
                    value: data.fio.staff4,
                    timeout: entry.max
                });
            });

            describe(`Удаление "${data.fio.staff4}" из фильтра "Поиск..." и проверка таблицы`, () => {
                decorate.el.input.backSpace({
                    title: '',
                    placeholder: 'Поиск...',
                    timeout: entry.max
                });
                dec.animation();
                decorate.el.table.size({
                    strCount: 2,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Сотрудники',
                    strNumber: 1,
                    cellNumber: 2,
                    value: data.fio.staff1,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Сотрудники',
                    strNumber: 2,
                    cellNumber: 2,
                    value: data.fio.staff4,
                    timeout: entry.max
                });
            });
        }

        if(type === 'overwork') {
            befOverwork();
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
                    headTitle: 'Сотрудники',
                    strNumber: 1,
                    cellNumber: 2,
                    value: data.fio.staff1,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Сотрудники',
                    strNumber: 2,
                    cellNumber: 2,
                    value: data.fio.staff2,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Сотрудники',
                    strNumber: 3,
                    cellNumber: 2,
                    value: data.fio.staff4,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Сотрудники',
                    strNumber: 4,
                    cellNumber: 2,
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
                    headTitle: 'Сотрудники',
                    strNumber: 1,
                    cellNumber: 2,
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
                    headTitle: 'Сотрудники',
                    strNumber: 1,
                    cellNumber: 2,
                    value: data.fio.staff1,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Сотрудники',
                    strNumber: 2,
                    cellNumber: 2,
                    value: data.fio.staff2,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Сотрудники',
                    strNumber: 3,
                    cellNumber: 2,
                    value: data.fio.staff4,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Сотрудники',
                    strNumber: 4,
                    cellNumber: 2,
                    value: data.fio.staff5,
                    timeout: entry.max
                });
            });
        }
    });

    const resetFilter = () => describe(text + 'Проверка "Сбросить фильтры".', () => {
        if(type === 'violator') {
            befViolator();
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
                    strCount: 6,
                    timeout: entry.max
                });
            });

            describe('Проверка таблицы до использования фильтров', () => {
                decorate.el.table.size({
                    strCount: 6,
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
                    strCount: 6,
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

        if(type === 'overwork') {
            befOverwork();
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
                    strCount: 6,
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
    otherViolator: other('violator', 'УРВ / Отчеты по дисциплине - вкладка "Нарушители".'),
    otherPresence: other('presence', 'УРВ / Отчеты по дисциплине - вкладка "Присутствующие на данный момент".'),
    otherAbsent: other('absent', 'УРВ / Отчеты по дисциплине - вкладка "Отсутствующие сегодня".'),
    otherLate: other('late', 'УРВ / Отчеты по дисциплине - вкладка "Опоздавшие сегодня".'),
    otherEarly: other('early', 'УРВ / Отчеты по дисциплине - вкладка "Ушедшие раньше сегодня".'),
    otherOverwork: other('overwork', 'УРВ / Отчеты по дисциплине - вкладка "Переработка".'),
}