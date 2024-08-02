const {describe, it} = require('mocha');

const entry = require('../../../../../../../entry');
const page = require('../../../../../pages');
const el = require('../../../../../elements');
const dec = require('../../../../../dictionaries/decorate');
const sec = require('../../../../../dictionaries/section');
const sub = require('../../../../../dictionaries/subsection');
const but = require('../../../../../dictionaries/button-icon');
const icon = require('../../../../../dictionaries/icon');
const api = require('../../../../../dictionaries/api');
const decorate = require('../../../../../decorates');
const db = require('../../../../../database');
const data = require('./verificationjournal.data');

const bef = () => decorate.befAft.before.beforeReportVerificationJournal();
const aft = () =>  decorate.befAft.after.after();

const test = () => {

    const checkData = () => describe(`Контроль доступа / Журнал верификации. Проверка отображения данных .`, () => {

        bef();
        aft();

        describe('Общие проверки', () => {

            decorate.el.error.checkError({
                timeout: entry.sleep2
            });

            it(`Отображение календаря и выбранной даты ${data.dateTimeToday()}`,
                async () => await dec.simpleText(el.input.getValue,
                    ['', '', entry.max],
                    data.dateTimeToday(),
                    el.input));

            decorate.el.table.size({
                strCount: 6,
                timeout: entry.max
            });
        });

        describe('Проверка строки 1.', () => {
            decorate.el.table.cellGetText({
                headTitle: 'Время',
                strNumber: 1,
                cellNumber: 1,
                value: data.event.visitor2.event2.time_label.replace(/"/g, ''),
                timeout: entry.max
            });
            decorate.el.table.cellGetText({
                headTitle: 'Событие',
                strNumber: 1,
                cellNumber: 2,
                value: 'Верификация: проход сотрудника',
                timeout: entry.max
            });
            decorate.el.table.cellGetText({
                headTitle: 'ФИО',
                strNumber: 1,
                cellNumber: 8,
                value: data.fio.visitor2,
                timeout: entry.max
            });
        });

        describe('Проверка строки 2.', () => {
            decorate.el.table.cellGetText({
                headTitle: 'Время',
                strNumber: 2,
                cellNumber: 1,
                value: data.event.visitor2.event1.time_label.replace(/"/g, ''),
                timeout: entry.max
            });
            decorate.el.table.cellGetText({
                headTitle: 'Событие',
                strNumber: 2,
                cellNumber: 2,
                value: 'Верификация: проход сотрудника',
                timeout: entry.max
            });
            decorate.el.table.cellGetText({
                headTitle: 'ФИО',
                strNumber: 2,
                cellNumber: 8,
                value: data.fio.visitor2,
                timeout: entry.max
            });
        });

        describe('Проверка строки 3.', () => {
            decorate.el.table.cellGetText({
                headTitle: 'Время',
                strNumber: 3,
                cellNumber: 1,
                value: data.event.visitor1.event1.time_label.replace(/"/g, ''),
                timeout: entry.max
            });
            decorate.el.table.cellGetText({
                headTitle: 'Событие',
                strNumber: 3,
                cellNumber: 2,
                value: 'Верификация: проход сотрудника',
                timeout: entry.max
            });
            decorate.el.table.cellGetText({
                headTitle: 'ФИО',
                strNumber: 3,
                cellNumber: 8,
                value: data.fio.visitor1,
                timeout: entry.max
            });
        });

        describe('Проверка строки 4.', () => {
            decorate.el.table.cellGetText({
                headTitle: 'Время',
                strNumber: 4,
                cellNumber: 1,
                value: data.event.staff2.event2.time_label.replace(/"/g, ''),
                timeout: entry.max
            });
            decorate.el.table.cellGetText({
                headTitle: 'Событие',
                strNumber: 4,
                cellNumber: 2,
                value: 'Верификация: проход сотрудника',
                timeout: entry.max
            });
            decorate.el.table.cellGetText({
                headTitle: 'ФИО',
                strNumber: 4,
                cellNumber: 8,
                value: data.fio.staff2,
                timeout: entry.max
            });
        });

        describe('Проверка строки 5.', () => {
            decorate.el.table.cellGetText({
                headTitle: 'Время',
                strNumber: 5,
                cellNumber: 1,
                value: data.event.staff2.event1.time_label.replace(/"/g, ''),
                timeout: entry.max
            });
            decorate.el.table.cellGetText({
                headTitle: 'Событие',
                strNumber: 5,
                cellNumber: 2,
                value: 'Верификация: проход сотрудника',
                timeout: entry.max
            });
            decorate.el.table.cellGetText({
                headTitle: 'ФИО',
                strNumber: 5,
                cellNumber: 8,
                value: data.fio.staff2,
                timeout: entry.max
            });
        });

        describe('Проверка строки 6.', () => {
            decorate.el.table.cellGetText({
                headTitle: 'Время',
                strNumber: 6,
                cellNumber: 1,
                value: data.event.staff1.event1.time_label.replace(/"/g, ''),
                timeout: entry.max
            });
            decorate.el.table.cellGetText({
                headTitle: 'Событие',
                strNumber: 6,
                cellNumber: 2,
                value: 'Верификация: проход сотрудника',
                timeout: entry.max
            });
            decorate.el.table.cellGetText({
                headTitle: 'ФИО',
                strNumber: 6,
                cellNumber: 8,
                value: data.fio.staff1,
                timeout: entry.max
            });
        });
    });

    const filterUser = () => describe(`Контроль доступа / Журнал верификации. Проверка фильтра по пользователям.`,
        () => {

        bef();
        aft();

        describe('Тип Сотрудники', () => {
            decorate.el.selectMulti.iconXpand({
                title: '',
                timeout: entry.max
            });
            decorate.el.selectXpand.xpand({
                timeout: entry.max
            });
            decorate.el.selectXpand.handler({
                value: 'Сотрудник',
                timeout: entry.max
            });
            decorate.el.selectXpand.xpandNoElement({
                timeout: entry.max
            });
            decorate.el.error.checkError({
                timeout: entry.sleep2
            });
            decorate.el.table.size({
                strCount: 3,
                timeout: entry.max
            });
            decorate.el.table.cellGetText({
                headTitle: 'ФИО',
                strNumber: 1,
                cellNumber: 8,
                value: data.fio.staff2,
                timeout: entry.max
            });
            decorate.el.table.cellGetText({
                headTitle: 'ФИО',
                strNumber: 2,
                cellNumber: 8,
                value: data.fio.staff2,
                timeout: entry.max
            });
            decorate.el.table.cellGetText({
                headTitle: 'ФИО',
                strNumber: 3,
                cellNumber: 8,
                value: data.fio.staff1,
                timeout: entry.max
            });
        });

        describe('Тип Посетитель', () => {
            decorate.el.selectMulti.iconXpand({
                title: '',
                timeout: entry.max
            });
            decorate.el.selectXpand.xpand({
                timeout: entry.max
            });
            decorate.el.selectXpand.handler({
                value: 'Посетитель',
                timeout: entry.max
            });
            decorate.el.selectXpand.xpandNoElement({
                timeout: entry.max
            });
            decorate.el.error.checkError({
                timeout: entry.sleep2
            });
            decorate.el.table.size({
                strCount: 3,
                timeout: entry.max
            });
            decorate.el.table.cellGetText({
                headTitle: 'ФИО',
                strNumber: 1,
                cellNumber: 8,
                value: data.fio.visitor2,
                timeout: entry.max
            });
            decorate.el.table.cellGetText({
                headTitle: 'ФИО',
                strNumber: 2,
                cellNumber: 8,
                value: data.fio.visitor2,
                timeout: entry.max
            });
            decorate.el.table.cellGetText({
                headTitle: 'ФИО',
                strNumber: 3,
                cellNumber: 8,
                value: data.fio.visitor1,
                timeout: entry.max
            });
        });

        describe('Тип Все', () => {
            decorate.el.selectMulti.iconXpand({
                title: '',
                timeout: entry.max
            });
            decorate.el.selectXpand.xpand({
                timeout: entry.max
            });
            decorate.el.selectXpand.handler({
                value: 'Все',
                timeout: entry.max
            });
            decorate.el.selectXpand.xpandNoElement({
                timeout: entry.max
            });
            decorate.el.error.checkError({
                timeout: entry.sleep2
            });
            decorate.el.table.size({
                strCount: 6,
                timeout: entry.max
            });
            decorate.el.table.cellGetText({
                headTitle: 'ФИО',
                strNumber: 1,
                cellNumber: 8,
                value: data.fio.visitor2,
                timeout: entry.max
            });
            decorate.el.table.cellGetText({
                headTitle: 'ФИО',
                strNumber: 2,
                cellNumber: 8,
                value: data.fio.visitor2,
                timeout: entry.max
            });
            decorate.el.table.cellGetText({
                headTitle: 'ФИО',
                strNumber: 3,
                cellNumber: 8,
                value: data.fio.visitor1,
                timeout: entry.max
            });
            decorate.el.table.cellGetText({
                headTitle: 'ФИО',
                strNumber: 4,
                cellNumber: 8,
                value: data.fio.staff2,
                timeout: entry.max
            });
            decorate.el.table.cellGetText({
                headTitle: 'ФИО',
                strNumber: 5,
                cellNumber: 8,
                value: data.fio.staff2,
                timeout: entry.max
            });
            decorate.el.table.cellGetText({
                headTitle: 'ФИО',
                strNumber: 6,
                cellNumber: 8,
                value: data.fio.staff1,
                timeout: entry.max
            });
        });
    });

    const filterSearch = () => describe(`Контроль доступа / Журнал верификации. Проверка фильтра по поиску.`, () => {

        bef();
        aft();

        describe('Количество строк до применения фильтра по поиску', () => {
            decorate.el.table.size({
                strCount: 6,
                timeout: entry.max
            });
        });

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
                cellNumber: 8,
                value: data.fio.staff1,
                timeout: entry.max
            });
        });
    });

    const filterDate = () => describe(`Контроль доступа / Журнал верификации. Проверка фильтра по дате.`, () => {

        bef();
        aft();

        describe('Количество строк до применения фильтра по дате', () => {
            decorate.el.table.size({
                strCount: 6,
                timeout: entry.max
            });
        });

        describe('Выбор промежутка времени 2023-06-06 - 2023-06-07', () => {

                it(`Нажатие по фильтру выбора даты.`,
                    async () => await dec.simple(el.input.handler,
                        ['', '', entry.max],
                        el.input));

                decorate.el.datepicker.dateRange({
                    objStart: {
                        day: 6,
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

                it(`Нажатие по фильтру выбора даты.`,
                    async () => await dec.simple(el.input.handler,
                        ['', '', entry.max],
                        el.input));

                decorate.el.error.checkError({
                timeout: entry.sleep2
            });
            });

        describe('Количество строк после применения фильтра по дате', () => {
            decorate.el.table.size({
                strCount: 2,
                timeout: entry.max
            });
        });

        describe('Проверка строки 1.', () => {
            decorate.el.table.cellGetText({
                headTitle: 'ФИО',
                strNumber: 1,
                cellNumber: 8,
                value: data.fio.visitor2,
                timeout: entry.max
            });
            decorate.el.table.cellGetText({
                headTitle: 'Время',
                strNumber: 1,
                cellNumber: 1,
                value: data.event.visitor2.event3.time_label.replace(/"/g, ''),
                timeout: entry.max
            });
        });

        describe('Проверка строки 2.', () => {
            decorate.el.table.cellGetText({
                headTitle: 'ФИО',
                strNumber: 2,
                cellNumber: 8,
                value: data.fio.staff2,
                timeout: entry.max
            });
            decorate.el.table.cellGetText({
                headTitle: 'Время',
                strNumber: 2,
                cellNumber: 1,
                value: data.event.staff2.event3.time_label.replace(/"/g, ''),
                timeout: entry.max
            });
        });

    });

    const printTable = () => describe(`Контроль доступа / Журнал верификации. Проверка печати.`, () => {

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

        describe('Проверка строки 1', () => {
            decorate.modal.printTable.cellGetText({
                head: 'Время',
                str: 1,
                cell: 1,
                value: data.event.visitor2.event2.time_label.replace(/"/g, ''),
                timeout: entry.max
            });
            decorate.modal.printTable.cellGetText({
                head: 'Событие',
                str: 1,
                cell: 2,
                value: 'Верификация: проход сотрудника',
                timeout: entry.max
            });
            decorate.modal.printTable.cellGetText({
                head: 'Точка верификации',
                str: 1,
                cell: 3,
                value: '',
                timeout: entry.max
            });
            decorate.modal.printTable.cellGetText({
                head: 'Ответ на запрос',
                str: 1,
                cell: 4,
                value: '',
                timeout: entry.max
            });
            decorate.modal.printTable.cellGetText({
                head: 'Выход',
                str: 1,
                cell: 5,
                value:  data.event.visitor2.event2.access_zone_id1,
                timeout: entry.max
            });
            decorate.modal.printTable.cellGetText({
                head: 'Вход',
                str: 1,
                cell: 6,
                value: data.event.visitor2.event2.access_zone_id2,
                timeout: entry.max
            });
            decorate.modal.printTable.cellGetText({
                head: 'Идентификатор',
                str: 1,
                cell: 7,
                value: data.visitor.visitor2.identifier[0].identifier,
                timeout: entry.max
            });
            decorate.modal.printTable.cellGetText({
                head: 'ФИО',
                str: 1,
                cell: 8,
                value: data.fio.visitor2,
                timeout: entry.max
            });
            decorate.modal.printTable.cellGetText({
                head: 'Оператор',
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

    const exportXLSX = () => describe(`Контроль доступа / Журнал верификации. Экспорт XLSX.`, () => {

        const params = {
            nameFile: 'verifyjournal.xlsx',
            json: [
                { 'Отчет "Журнал верификации"': 'Подразделение: Все' },
                {
                    'Отчет "Журнал верификации"': `${data.dateTimeToday2()}`
                },
                {
                    'Отчет "Журнал верификации"': 'Время',
                    __EMPTY: 'Событие',
                    __EMPTY_1: 'Точка верификации',
                    __EMPTY_2: 'Ответ на запрос',
                    __EMPTY_3: 'Выход',
                    __EMPTY_4: 'Вход',
                    __EMPTY_5: 'Идентификатор',
                    __EMPTY_6: 'Фамилия',
                    __EMPTY_7: 'Имя',
                    __EMPTY_8: 'Отчество',
                    __EMPTY_9: 'Подразделение',
                    __EMPTY_10: 'Оператор'
                },
                {
                    'Отчет "Журнал верификации"': `${data.eventDate.event1}`,
                    __EMPTY: 'Верификация: проход сотрудника',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'room1',
                    __EMPTY_4: 'room2',
                    __EMPTY_5: '5',
                    __EMPTY_6: 'visitor',
                    __EMPTY_7: 'name',
                    __EMPTY_8: '2',
                    __EMPTY_9: 'division2',
                    __EMPTY_10: ''
                },
                {
                    'Отчет "Журнал верификации"': `${data.eventDate.event2}`,
                    __EMPTY: 'Верификация: проход сотрудника',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'Неконтролируемая территория',
                    __EMPTY_4: 'room1',
                    __EMPTY_5: '5',
                    __EMPTY_6: 'visitor',
                    __EMPTY_7: 'name',
                    __EMPTY_8: '2',
                    __EMPTY_9: 'division2',
                    __EMPTY_10: ''
                },
                {
                    'Отчет "Журнал верификации"': `${data.eventDate.event3}`,
                    __EMPTY: 'Верификация: проход сотрудника',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'Неконтролируемая территория',
                    __EMPTY_4: 'room1',
                    __EMPTY_5: '4',
                    __EMPTY_6: 'visitor',
                    __EMPTY_7: 'name',
                    __EMPTY_8: '1',
                    __EMPTY_9: 'division1',
                    __EMPTY_10: ''
                },
                {
                    'Отчет "Журнал верификации"': `${data.eventDate.event1}`,
                    __EMPTY: 'Верификация: проход сотрудника',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'room1',
                    __EMPTY_4: 'room2',
                    __EMPTY_5: '2',
                    __EMPTY_6: 'staff',
                    __EMPTY_7: 'name',
                    __EMPTY_8: '2',
                    __EMPTY_9: 'division2',
                    __EMPTY_10: ''
                },
                {
                    'Отчет "Журнал верификации"': `${data.eventDate.event2}`,
                    __EMPTY: 'Верификация: проход сотрудника',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'Неконтролируемая территория',
                    __EMPTY_4: 'room1',
                    __EMPTY_5: '2',
                    __EMPTY_6: 'staff',
                    __EMPTY_7: 'name',
                    __EMPTY_8: '2',
                    __EMPTY_9: 'division2',
                    __EMPTY_10: ''
                },
                {
                    'Отчет "Журнал верификации"': `${data.eventDate.event3}`,
                    __EMPTY: 'Верификация: проход сотрудника',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: 'Неконтролируемая территория',
                    __EMPTY_4: 'room1',
                    __EMPTY_5: '1',
                    __EMPTY_6: 'staff',
                    __EMPTY_7: 'name',
                    __EMPTY_8: '1',
                    __EMPTY_9: 'division1',
                    __EMPTY_10: ''
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
            decorate.el.file.comparison({
                file: params.nameFile,
                json: params.json
            });
            decorate.el.file.delete({
                file: params.nameFile,
                timeout: entry.upload
            });
        });
    });

    const exportCSV = () => describe(`Контроль доступа / Журнал верификации. Экспорт CSV.`, () => {
        const params = {
            nameFile: 'verifyjournal.csv',
            json: [
                {
                    'Время': `${data.eventDate.event1}`,
                    'Событие': 'Верификация: проход сотрудника',
                    'Выход': 'room1',
                    'Вход': 'room2',
                    'Идентификатор': 5,
                    'Фамилия': 'visitor',
                    'Имя': 'name',
                    'Отчество': 2,
                    'Подразделение': 'division2'
                },
                {
                    'Время': `${data.eventDate.event2}`,
                    'Событие': 'Верификация: проход сотрудника',
                    'Выход': 'Неконтролируемая территория',
                    'Вход': 'room1',
                    'Идентификатор': 5,
                    'Фамилия': 'visitor',
                    'Имя': 'name',
                    'Отчество': 2,
                    'Подразделение': 'division2'
                },
                {
                    'Время': `${data.eventDate.event3}`,
                    'Событие': 'Верификация: проход сотрудника',
                    'Выход': 'Неконтролируемая территория',
                    'Вход': 'room1',
                    'Идентификатор': 4,
                    'Фамилия': 'visitor',
                    'Имя': 'name',
                    'Отчество': 1,
                    'Подразделение': 'division1'
                },
                {
                    'Время': `${data.eventDate.event1}`,
                    'Событие': 'Верификация: проход сотрудника',
                    'Выход': 'room1',
                    'Вход': 'room2',
                    'Идентификатор': 2,
                    'Фамилия': 'staff',
                    'Имя': 'name',
                    'Отчество': 2,
                    'Подразделение': 'division2'
                },
                {
                    'Время': `${data.eventDate.event2}`,
                    'Событие': 'Верификация: проход сотрудника',
                    'Выход': 'Неконтролируемая территория',
                    'Вход': 'room1',
                    'Идентификатор': 2,
                    'Фамилия': 'staff',
                    'Имя': 'name',
                    'Отчество': 2,
                    'Подразделение': 'division2'
                },
                {
                    'Время': `${data.eventDate.event3}`,
                    'Событие': 'Верификация: проход сотрудника',
                    'Выход': 'Неконтролируемая территория',
                    'Вход': 'room1',
                    'Идентификатор': 1,
                    'Фамилия': 'staff',
                    'Имя': 'name',
                    'Отчество': 1,
                    'Подразделение': 'division1'
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
            decorate.el.file.comparison({
                file: params.nameFile,
                json: params.json
            });
            decorate.el.file.delete({
                file: params.nameFile,
                timeout: entry.upload
            });
        });
    });

    const updateData = () => describe('Контроль доступа / Журнал верификации. Проверка кнопки Обновить данные', () => {

        bef();
        aft();

        describe('Отображение данных до нажатия кнопки Обновить данные', () => {
            decorate.el.table.size({
                strCount: 6,
                timeout: entry.max
            });
            decorate.el.input.sendKeys({
                title: '',
                placeholder: 'Поиск...',
                value: data.fio.staff3,
                timeout: entry.max
            });
            decorate.el.table.noStr({
                timeout: entry.max
            });
            decorate.el.rowEmpty.getText({
                value: 'Нет данных для отображения',
                timeout: entry.max
            });
            decorate.el.input.backSpace({
                title: '',
                placeholder: 'Поиск...',
                timeout: entry.max
            });
            decorate.el.table.size({
                strCount: 6,
                timeout: entry.max
            });
        });

        describe(`Добавление события для сотрудника ${data.fio.staff3}`, () => {
            it('Добавление события.', async () => {
                const cook = await page.base.getCookie('token');
                const arrStaff = await api.getStaff(cook.text);
                const staff3 = arrStaff.text.filter(obj => obj.name === data.fio.staff3)[0].id;

                const arrDevice = await api.getDevice(cook.text);
                const device1 = arrDevice.text.filter(obj => obj.ip_addr === data.devices.device1.ip)[0].id;

                const arrRooms = await api.getRoom(cook.text);
                const room0 = arrRooms.text.filter(obj => obj.name === 'Неконтролируемая территория')[0].id;
                const room1 = arrRooms.text.filter(obj => obj.name === data.rooms.room1)[0].id;

                //События сотрудника 1
                await dec.simple(db.addEvent,
                    [{
                        ...data.event.staff3.event1,
                        user_id: staff3,
                        device_id: device1,
                        access_zone_id1: room1,
                        access_zone_id2: room0,
                        event_type: 65544
                    }],
                    db.addEvent);

                await page.base.loading(5000);
            });
        });

        describe('Нажатие кнопки Обновить данные', () => {
            decorate.el.butIcBefore.handler({
                icon: but.action_autorenew,
                timeout: entry.max
            });
            decorate.el.error.checkError({
                timeout: entry.sleep2
            });
        });

        describe('Отображение данных после нажатия кнопки Обновить данные', () => {
            decorate.el.table.size({
                strCount: 7,
                timeout: entry.max
            });
            decorate.el.input.sendKeys({
                title: '',
                placeholder: 'Поиск...',
                value: data.fio.staff3,
                timeout: entry.max
            });
            decorate.el.table.size({
                strCount: 1,
                timeout: entry.max
            });
            decorate.el.table.cellGetText({
                headTitle: 'ФИО',
                strNumber: 1,
                cellNumber: 8,
                value: data.fio.staff3,
                timeout: entry.max
            });
            decorate.el.input.backSpace({
                title: '',
                placeholder: 'Поиск...',
                timeout: entry.max
            });
            decorate.el.table.size({
                strCount: 7,
                timeout: entry.max
            });
        });

        describe(`Удаление события у сотруднкиа ${data.fio.staff3}.`, () => {
            it('Удаление события', async () => {
                const cook = await page.base.getCookie('token');
                const arrStaff = await api.getStaff(cook.text);
                const staff3 = arrStaff.text.filter(obj => obj.name === data.fio.staff3)[0].id;

                await dec.simple(db.deleteEventFioId,
                    [staff3],
                    db.deleteEventFioId);
            });
        });

    });

    return  {
        checkData,
        display,
        filterUser,
        filterSearch,
        filterDate,
        printTable,
        exportXLSX,
        exportCSV,
        updateData,
    }

}

const other = () => {
    const addDataControlAccess = () => describe('Добавление данных для тестирования отчетов раздела Котроль доступа',
        () => {
            const params = {...data}

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
    test: test(),
    other: other(),
}