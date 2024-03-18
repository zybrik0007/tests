const {describe, it, before, after} = require('mocha');

const entry = require('../../../../../../entry');
const page = require('../../../../pages');
const el = require('../../../../elements');
const dec = require('../../../../dictionaries/decorate');
const sec = require('../../../../dictionaries/section');
const sub = require('../../../../dictionaries/subsection');
const but = require('../../../../dictionaries/button-icon');
const icon = require('../../../../dictionaries/icon');
const api = require('../../../other/api');
const deleteData = require('../../../other/deleteData');
const oth = require('../../../other/other');
const decItApi = require('../../../../dictionaries/decorate-it-api');
const decorate = require('../../../../decorates');
const db = require('../../../../database');
const data = require('../../data').dataControlAccess;

const bef = () => before('Вход и открытие подраздела "Журнал верификации".', async () => {
    await dec.auth(entry.customLogin, entry.customPassword);
    await dec.simple(el.section.handler, [sec.con, entry.max], el.section);
    await dec.simple(el.subsection.handler, [sub.con.verif, entry.max], el.subsection);
    await dec.simple(page.verificationJournal.init, [entry.max], page.verificationJournal);
    await page.base.loading(2000);
});

const aft = () => after('Выход', async () => await dec.exit());

const other = () => {

    const display = () => describe(`Контроль доступа / Журнал верификации. Общая проверка без данных.`,
        () => {

            bef();
            aft();

            describe('Общее отображение', () => {

                decorate.el.section.active({
                    section: sec.con,
                    timeout: entry.max
                });

                decorate.el.subsection.active({
                    subsection: sub.con.verif,
                    timeout: entry.max
                });

                decorate.el.subsection.headerGetText({
                    value: 'КОНТРОЛЬ ДОСТУПА',
                    timeout: entry.max
                });

                decorate.el.header.getText({
                    value: 'Журнал верификации',
                    timeout: entry.max
                });

                decorate.el.header.userGetText({
                    value: entry.user,
                    timeout: entry.max
                })

            });

            describe('Отображение фильтров и кнопок', () => {

                decorate.el.butIcBefore.active({
                    icon: but.action_autorenew,
                    timeout: entry.max
                });

                decorate.el.butIc.button({
                    icon: icon.expanded_filter,
                    timeout: entry.max
                });

                decorate.el.butIcBefore.active({
                    icon: but.menu,
                    timeout: entry.max
                });

                it('Отображение поле выбора', async () => await dec.simple(el.selectMulti.select,
                    ['', entry.max],
                    el.selectMulti));

                it(`Отображение календаря и выбранной даты ${data.dateTimeToday()}`,
                    async () => await dec.simpleText(el.input.getValue,
                        ['', '', entry.max],
                        data.dateTimeToday(),
                        el.input));

                decorate.el.input.input({
                    title: '',
                    placeholder: 'Поиск...'
                });
            });

            describe('Отображние данных в таблице', () => {
                decorate.el.table.noStr({
                    timeout: entry.max
                });

                decorate.el.rowEmpty.getText({
                    value: 'Нет данных для отображения',
                    timeout: entry.max
                });
            });
        });

    const checkData = () => describe(`Контроль доступа / Журнал верификации. Проверка отображения данных .`, () => {

        bef();
        aft();

        describe('Общие проверки', () => {

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
        test: () => require('../../data').addDataControlAccess()
    }

}


module.exports = {
    other: () => other(),
}