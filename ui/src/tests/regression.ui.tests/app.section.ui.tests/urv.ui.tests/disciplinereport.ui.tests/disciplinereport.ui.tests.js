const {describe, it} = require('mocha');

const entry = require('../../../../../../../entry');
const page = require('../../../../../pages');
const dec = require('../../../../../dictionaries/decorate');
const but = require('../../../../../dictionaries/button-icon');
const decorate = require('../../../../../decorates');
const data = require('./disciplinereport.data');

const befViolator = () => decorate.befAft.before.beforeReportViolator();
const befPresence = () => decorate.befAft.before.beforeReportPresence();
const befAbsent = () => decorate.befAft.before.beforeReportAbsent();
const befLate = () => decorate.befAft.before.beforeReportLate();
const befEarly = () => decorate.befAft.before.beforeReportEarly();
const befOverwork = () => decorate.befAft.before.beforeReportOverwork();
const aft = () => decorate.befAft.after.after();

const test = (type, text) => {

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
                    decorate.el.error.checkError({
                        timeout: entry.sleep2
                    });
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
                    decorate.el.error.checkError({
                        timeout: entry.sleep2
                    });
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
                    decorate.el.error.checkError({
                        timeout: entry.sleep2
                    });
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
                    decorate.el.error.checkError({
                        timeout: entry.sleep2
                    });
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
                decorate.el.error.checkError({
                    timeout: entry.sleep2
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
                decorate.el.error.checkError({
                    timeout: entry.sleep2
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
                decorate.el.error.checkError({
                    timeout: entry.sleep2
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
                decorate.el.error.checkError({
                    timeout: entry.sleep2
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
                decorate.el.error.checkError({
                    timeout: entry.sleep2
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
                decorate.el.error.checkError({
                    timeout: entry.sleep2
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
                decorate.el.error.checkError({
                    timeout: entry.sleep2
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
                decorate.el.error.checkError({
                    timeout: entry.sleep2
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
                decorate.el.error.checkError({
                    timeout: entry.sleep2
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
                decorate.el.error.checkError({
                    timeout: entry.sleep2
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
                decorate.el.error.checkError({
                    timeout: entry.sleep2
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
                decorate.el.error.checkError({
                    timeout: entry.sleep2
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
                decorate.el.error.checkError({
                    timeout: entry.sleep2
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
                decorate.el.error.checkError({
                    timeout: entry.sleep2
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
                decorate.el.error.checkError({
                    timeout: entry.sleep2
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
            ddecorate.api.addDivision(params.divisions.division4);
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
            ddecorate.api.addPosition(params.positions.position7);
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
    testViolator: test('violator', 'УРВ / Отчеты по дисциплине - вкладка "Нарушители".'),
    testPresence: test('presence', 'УРВ / Отчеты по дисциплине - вкладка "Присутствующие на данный момент".'),
    testAbsent: test('absent', 'УРВ / Отчеты по дисциплине - вкладка "Отсутствующие сегодня".'),
    testLate: test('late', 'УРВ / Отчеты по дисциплине - вкладка "Опоздавшие сегодня".'),
    testEarly: test('early', 'УРВ / Отчеты по дисциплине - вкладка "Ушедшие раньше сегодня".'),
    testOverwork: test('overwork', 'УРВ / Отчеты по дисциплине - вкладка "Переработка".'),
    other: other()
}