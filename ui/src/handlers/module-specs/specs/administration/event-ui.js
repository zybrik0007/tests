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
const data = require('../../data').dataEvent;

const bef = () => before('Вход и открытие подраздела "События системы"', async () => {
    await page.base.loading(entry.sleep1);
    await dec.auth(entry.customLogin, entry.customPassword);
    await dec.simple(el.section.handler, [sec.adm, entry.max], el.section);
    await dec.simple(el.subsection.handler, [sub.adm.event, entry.max], el.subsection);
    await dec.simple(page.event.init, [entry.max], page.event);
    await page.base.loading(entry.sleep1);
});

const aft = () => after('Выход', async () => {
    await page.base.loading(entry.sleep1);
    await dec.exit();
});

const other = () => {

    const updateData = () => describe('Администрирование / События системы. Проверка кнопки "Обновить данные".', () => {

        bef();
        aft();

        describe('Удаление всех событий и добавление должности через API', () => {
            decorate.el.checkbox.unchecked({
                name: 'Автообновление',
                timeout: entry.max
            });
            decorate.el.input.getValue({
                title: '',
                placeholder: '',
                value: data.date1.data,
                timeout: entry.max
            });
            it('Удаление событий', async () => await dec.simple(db.truncateEvent,
                [],
                db.truncateEvent));
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
            decorate.page.base.refresh();
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
            decItApi.addPosition(data.position);
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
        });

        describe('Нажатие кнопки "Обновить данные" и проверка отображения события', () => {
            decorate.el.table.noStr({
                timeout: entry.max
            });
            decorate.el.butIcBefore.handler({
                icon: but.action_autorenew,
                timeout: entry.max
            });
            decorate.el.table.size({
                strCount: 1,
                timeout: entry.max
            });
            decorate.el.table.cellGetText({
                headTitle: 'Событие',
                strNumber: 1,
                cellNumber: 2,
                value: data.event1.name,
                timeout: entry.max
            });
            decorate.el.table.cellGetText({
                headTitle: 'Дата события UTC',
                strNumber: 1,
                cellNumber: 4,
                value: '',
                timeout: entry.max
            });
            decorate.el.table.cellGetText({
                headTitle: 'Дополнительная информация',
                strNumber: 1,
                cellNumber: 5,
                value: '',
                timeout: entry.max
            });
            decorate.el.table.cellGetText({
                headTitle: 'IP-адрес',
                strNumber: 1,
                cellNumber: 6,
                value: '',
                timeout: entry.max
            });
            decorate.el.table.cellGetText({
                headTitle: 'Устройство',
                strNumber: 1,
                cellNumber: 7,
                value: '',
                timeout: entry.max
            });
            decorate.el.table.cellGetText({
                headTitle: 'Устройство/Посетитель',
                strNumber: 1,
                cellNumber: 8,
                value: '',
                timeout: entry.max
            });
            decorate.el.table.cellGetText({
                headTitle: 'Идентификатор',
                strNumber: 1,
                cellNumber: 9,
                value: '',
                timeout: entry.max
            });
            decorate.el.table.cellGetText({
                headTitle: 'Выход',
                strNumber: 1,
                cellNumber: 10,
                value: '',
                timeout: entry.max
            });
            decorate.el.table.cellGetText({
                headTitle: 'Вход',
                strNumber: 1,
                cellNumber: 11,
                value: '',
                timeout: entry.max
            });
            decorate.el.table.cellGetText({
                headTitle: 'Оператор',
                strNumber: 1,
                cellNumber: 12,
                value: data.event1.operator,
                timeout: entry.max
            });
            decorate.el.table.cellGetText({
                headTitle: 'Категория',
                strNumber: 1,
                cellNumber: 13,
                value: data.event1.category,
                timeout: entry.max
            });
            decorate.el.table.cellGetText({
                headTitle: 'Подкатегория',
                strNumber: 1,
                cellNumber: 14,
                value: data.event1.subcategory,
                timeout: entry.max
            });
            decorate.el.table.cellGetText({
                headTitle: 'Сегмент',
                strNumber: 1,
                cellNumber: 15,
                value: '',
                timeout: entry.max
            });
            it('API удаление должности', async () => {
                const cook = await page.base.getCookie('token');
                const arrPosition = await api.getPosition(cook.text);
                const position1 = arrPosition.text.filter(obj => obj.name === data.position.name)[0].id;
                await dec.simple(api.deletePosition,
                    [[position1], cook.text],
                    api.deletePosition);
            });
        });
    });

    const print = () => describe('Администрирование / События системы. Проверка печати таблицы.', () => {

        describe('Удаление всех событий и добавление прохода', () => {
            it('Удаление событий', async () => await dec.simple(db.truncateEvent,
                [],
                db.truncateEvent));
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
            decorate.page.base.open({
                url: 'http://172.17.100.4/api/setEvent?uid=617&card=13242237&dir=0&date=1685620800'
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
        });

        describe('Проверка печати', () => {
            bef();
            aft();

            describe('Выбор даты 2023-06-01 - 2023-06-01', () => {
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
                        day: 1,
                        month: 'Июнь',
                        scrollYear: -500,
                        year: 2023
                    },
                    objEnd: {
                        day: 1,
                        month: 'Июнь',
                        scrollYear: -500,
                        year: 2023
                    },
                    timeout: entry.max
                });
                decorate.el.table.size({
                    strCount: 3,
                    timeout :entry.max
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
                    head: 'Событие',
                    str: 1,
                    cell: 1,
                    value: data.event2.name,
                    timeout: entry.max
                });
                decorate.modal.printTable.cellGetText({
                    head: 'Дата события',
                    str: 1,
                    cell: 2,
                    value: data.event2.date,
                    timeout: entry.max
                });
                decorate.modal.printTable.cellGetText({
                    head: 'Дата события UTC',
                    str: 1,
                    cell: 3,
                    value: data.event2.utc,
                    timeout: entry.max
                });
                decorate.modal.printTable.cellGetText({
                    head: 'Дополнительная информация',
                    str: 1,
                    cell: 4,
                    value: data.event2.additional,
                    timeout: entry.max
                });
                decorate.modal.printTable.cellGetText({
                    head: 'IP-адрес',
                    str: 1,
                    cell: 5,
                    value: data.event2.ip,
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
    });

    const exportXLSX  = () => describe('Администрирование / События системы. Проверка экспорта в XLSX.', () => {

        const params = {
            nameFile: 'systemevent.xlsx',
            json: [
                {
                    'Отчет "Журнал событий"': '2023-06-01 00:00:00 - 2023-06-01 23:59:59'
                },
                {
                    'Отчет "Журнал событий"': 'Событие',
                    __EMPTY: 'Дата события',
                    __EMPTY_1: 'Дата события UTC',
                    __EMPTY_2: 'Дополнительная информация',
                    __EMPTY_3: 'IP-адрес',
                    __EMPTY_4: 'Устройство',
                    __EMPTY_5: 'Фамилия',
                    __EMPTY_6: 'Имя',
                    __EMPTY_7: 'Отчество',
                    __EMPTY_8: 'Идентификатор',
                    __EMPTY_9: 'Выход',
                    __EMPTY_10: 'Вход',
                    __EMPTY_11: 'Оператор',
                    __EMPTY_12: 'Категория',
                    __EMPTY_13: 'Подкатегория',
                    __EMPTY_14: 'Сегмент'
                },
                {
                    'Отчет "Журнал событий"': 'Нормализация входа',
                    __EMPTY: '2023-06-01 15:00:00',
                    __EMPTY_1: '2023-06-01 12:00:00',
                    __EMPTY_2: 'Вход 1',
                    __EMPTY_3: '172.17.100.4',
                    __EMPTY_4: 'Контроллер CL15',
                    __EMPTY_5: '',
                    __EMPTY_6: '',
                    __EMPTY_7: '',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '',
                    __EMPTY_11: '',
                    __EMPTY_12: 'События контроллеров',
                    __EMPTY_13: 'События, связанные с состояниями входов/выходов',
                    __EMPTY_14: ''
                },
                {
                    'Отчет "Журнал событий"': 'Проход по идентификатору',
                    __EMPTY: '2023-06-01 15:00:00',
                    __EMPTY_1: '2023-06-01 12:00:00',
                    __EMPTY_2: 'Считыватель 1',
                    __EMPTY_3: '172.17.100.4',
                    __EMPTY_4: 'Контроллер CL15',
                    __EMPTY_5: '',
                    __EMPTY_6: '',
                    __EMPTY_7: '',
                    __EMPTY_8: '13242237',
                    __EMPTY_9: '',
                    __EMPTY_10: '',
                    __EMPTY_11: '',
                    __EMPTY_12: 'События контроллеров',
                    __EMPTY_13: 'События, связанные с доступом по коду идентификатора',
                    __EMPTY_14: ''
                },
                {
                    'Отчет "Журнал событий"': 'Активизация входа',
                    __EMPTY: '2023-06-01 15:00:00',
                    __EMPTY_1: '2023-06-01 12:00:00',
                    __EMPTY_2: 'Вход 1',
                    __EMPTY_3: '172.17.100.4',
                    __EMPTY_4: 'Контроллер CL15',
                    __EMPTY_5: '',
                    __EMPTY_6: '',
                    __EMPTY_7: '',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '',
                    __EMPTY_11: '',
                    __EMPTY_12: 'События контроллеров',
                    __EMPTY_13: 'События, связанные с состояниями входов/выходов',
                    __EMPTY_14: ''
                }
            ]
        }

        describe('Удаление всех событий и добавление прохода', () => {
            it('Удаление событий', async () => await dec.simple(db.truncateEvent,
                [],
                db.truncateEvent));
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
            decorate.page.base.open({
                url: 'http://172.17.100.4/api/setEvent?uid=617&card=13242237&dir=0&date=1685620800'
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
        });

        describe('Проверка', () => {
            bef();
            aft();

            describe('Выбор даты 2023-06-01 - 2023-06-01', () => {
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
                        day: 1,
                        month: 'Июнь',
                        scrollYear: -500,
                        year: 2023
                    },
                    objEnd: {
                        day: 1,
                        month: 'Июнь',
                        scrollYear: -500,
                        year: 2023
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
    });

    const exportCSV  = () => describe('Администрирование / События системы. Проверка экспорта в CSV.', () => {

        const params = {
            nameFile: 'systemevent.csv',
            json: [
                {
                    'Событие': 'Нормализация входа',
                    'Дата события': '2023-06-01 15:00:00',
                    'Дата события UTC': '2023-06-01 12:00:00',
                    'Дополнительная информация': 'Вход 1',
                    'IP-адрес': '172.17.100.4',
                    'Устройство': 'Контроллер CL15',
                    'Категория': 'События контроллеров',
                    'Подкатегория': 'События, связанные с состояниями входов/выходов'
                },
                {
                    'Событие': 'Проход по идентификатору',
                    'Дата события': '2023-06-01 15:00:00',
                    'Дата события UTC': '2023-06-01 12:00:00',
                    'Дополнительная информация': 'Считыватель 1',
                    'IP-адрес': '172.17.100.4',
                    'Устройство': 'Контроллер CL15',
                    'Идентификатор': 13242237,
                    'Категория': 'События контроллеров',
                    'Подкатегория': 'События, связанные с доступом по коду идентификатора'
                },
                {
                    'Событие': 'Активизация входа',
                    'Дата события': '2023-06-01 15:00:00',
                    'Дата события UTC': '2023-06-01 12:00:00',
                    'Дополнительная информация': 'Вход 1',
                    'IP-адрес': '172.17.100.4',
                    'Устройство': 'Контроллер CL15',
                    'Категория': 'События контроллеров',
                    'Подкатегория': 'События, связанные с состояниями входов/выходов'
                }
            ]
        }

        describe('Удаление всех событий и добавление прохода', () => {
            it('Удаление событий', async () => await dec.simple(db.truncateEvent,
                [],
                db.truncateEvent));
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
            decorate.page.base.open({
                url: 'http://172.17.100.4/api/setEvent?uid=617&card=13242237&dir=0&date=1685620800'
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
        });

        describe('Проверка', () => {
            bef();
            aft();

            describe('Выбор даты 2023-06-01 - 2023-06-01', () => {
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
                        day: 1,
                        month: 'Июнь',
                        scrollYear: -500,
                        year: 2023
                    },
                    objEnd: {
                        day: 1,
                        month: 'Июнь',
                        scrollYear: -500,
                        year: 2023
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
    });

    const filterSearch  = () => describe('Администрирование / События системы. Проверка фильтра "Поиск...".', () => {

        describe('Удаление всех событий и добавление прохода', () => {
            it('Удаление событий', async () => await dec.simple(db.truncateEvent,
                [],
                db.truncateEvent));
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
            decorate.page.base.open({
                url: 'http://172.17.100.4/api/setEvent?uid=617&card=13242237&dir=0&date=1685620800'
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
        });

        describe('Проверка фильтра', () => {
            bef();
            aft();

            describe('Выбор даты 2023-06-01 - 2023-06-01', () => {
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
                        day: 1,
                        month: 'Июнь',
                        scrollYear: -500,
                        year: 2023
                    },
                    objEnd: {
                        day: 1,
                        month: 'Июнь',
                        scrollYear: -500,
                        year: 2023
                    },
                    timeout: entry.max
                });
            });

            describe('Проверка таблицы до изпользования фильтра "Поиск..."', () => {
                decorate.el.table.size({
                    strCount: 3,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Событие',
                    strNumber: 1,
                    cellNumber: 2,
                    value: data.event2.name,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Событие',
                    strNumber: 2,
                    cellNumber: 2,
                    value: data.event3.name,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Событие',
                    strNumber: 3,
                    cellNumber: 2,
                    value: data.event4.name,
                    timeout: entry.max
                });
            });

            describe(`Ввод в фильтр "${data.event3.name}"`, () => {
                decorate.el.input.sendKeys({
                    title: '',
                    placeholder: 'Поиск...',
                    value: data.event3.name,
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
                    headTitle: 'Событие',
                    strNumber: 1,
                    cellNumber: 2,
                    value: data.event3.name,
                    timeout: entry.max
                });
            });

            describe(`Удаление "${data.event3.name}" из фильтра "Поиск..." и проверка таблицы`, () => {
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
                    strCount: 3,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Событие',
                    strNumber: 1,
                    cellNumber: 2,
                    value: data.event2.name,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Событие',
                    strNumber: 2,
                    cellNumber: 2,
                    value: data.event3.name,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Событие',
                    strNumber: 3,
                    cellNumber: 2,
                    value: data.event4.name,
                    timeout: entry.max
                });
            });
        });

    });

    const filterDate  = () => describe('Администрирование / События системы. Проверка фильтра по дате.', () => {

        describe('Удаление всех событий и добавление прохода', () => {
            it('Удаление событий', async () => await dec.simple(db.truncateEvent,
                [],
                db.truncateEvent));
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
            decorate.page.base.open({
                url: 'http://172.17.100.4/api/setEvent?uid=617&card=13242237&dir=0&date=1685620800'
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
        });

        describe('Проверка фильтра', () => {
            bef();
            aft();

            describe('Выбор даты 2023-06-01 - 2023-06-01', () => {
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
                        day: 1,
                        month: 'Июнь',
                        scrollYear: -500,
                        year: 2023
                    },
                    objEnd: {
                        day: 1,
                        month: 'Июнь',
                        scrollYear: -500,
                        year: 2023
                    },
                    timeout: entry.max
                });
            });

            describe('Проверка строки 1', () => {
                decorate.el.table.cellGetText({
                    headTitle: 'Событие',
                    strNumber: 1,
                    cellNumber: 2,
                    value: data.event2.name,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Дата события',
                    strNumber: 1,
                    cellNumber: 3,
                    value: data.event2.date,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Дата события UTC',
                    strNumber: 1,
                    cellNumber: 4,
                    value: data.event2.utc,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Дополнительная информация',
                    strNumber: 1,
                    cellNumber: 5,
                    value: data.event2.additional,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'IP-адрес',
                    strNumber: 1,
                    cellNumber: 6,
                    value:  data.event2.ip,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Устройство',
                    strNumber: 1,
                    cellNumber: 7,
                    value: data.event2.device,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Сотрудник/Посетитель',
                    strNumber: 1,
                    cellNumber: 8,
                    value: '',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Идентификатор',
                    strNumber: 1,
                    cellNumber: 9,
                    value: '',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Выход',
                    strNumber: 1,
                    cellNumber: 10,
                    value: '',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Вход',
                    strNumber: 1,
                    cellNumber: 11,
                    value: '',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Оператор',
                    strNumber: 1,
                    cellNumber: 12,
                    value: '',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Категория',
                    strNumber: 1,
                    cellNumber: 13,
                    value: data.event2.category,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Подкатегория',
                    strNumber: 1,
                    cellNumber: 14,
                    value: data.event2.subcategory,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Сегмент',
                    strNumber: 1,
                    cellNumber: 15,
                    value: '',
                    timeout: entry.max
                });
            });

            describe('Проверка строки 2', () => {
                decorate.el.table.cellGetText({
                    headTitle: 'Событие',
                    strNumber: 2,
                    cellNumber: 2,
                    value: data.event3.name,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Дата события',
                    strNumber: 2,
                    cellNumber: 3,
                    value: data.event3.date,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Дата события UTC',
                    strNumber: 2,
                    cellNumber: 4,
                    value: data.event3.utc,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Дополнительная информация',
                    strNumber: 2,
                    cellNumber: 5,
                    value: data.event3.additional,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'IP-адрес',
                    strNumber: 2,
                    cellNumber: 6,
                    value:  data.event3.ip,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Устройство',
                    strNumber: 2,
                    cellNumber: 7,
                    value: data.event3.device,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Сотрудник/Посетитель',
                    strNumber: 2,
                    cellNumber: 8,
                    value: '',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Идентификатор',
                    strNumber: 2,
                    cellNumber: 9,
                    value: data.event3.card,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Выход',
                    strNumber: 2,
                    cellNumber: 10,
                    value: '',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Вход',
                    strNumber: 2,
                    cellNumber: 11,
                    value: '',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Оператор',
                    strNumber: 2,
                    cellNumber: 12,
                    value: '',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Категория',
                    strNumber: 2,
                    cellNumber: 13,
                    value: data.event3.category,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Подкатегория',
                    strNumber: 2,
                    cellNumber: 14,
                    value: data.event3.subcategory,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Сегмент',
                    strNumber: 2,
                    cellNumber: 15,
                    value: '',
                    timeout: entry.max
                });
            });

            describe('Проверка строки 3', () => {
                decorate.el.table.cellGetText({
                    headTitle: 'Событие',
                    strNumber: 3,
                    cellNumber: 2,
                    value: data.event4.name,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Дата события',
                    strNumber: 3,
                    cellNumber: 3,
                    value: data.event4.date,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Дата события UTC',
                    strNumber: 3,
                    cellNumber: 4,
                    value: data.event4.utc,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Дополнительная информация',
                    strNumber: 3,
                    cellNumber: 5,
                    value: data.event4.additional,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'IP-адрес',
                    strNumber: 3,
                    cellNumber: 6,
                    value:  data.event4.ip,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Устройство',
                    strNumber: 3,
                    cellNumber: 7,
                    value: data.event4.device,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Сотрудник/Посетитель',
                    strNumber: 3,
                    cellNumber: 8,
                    value: '',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Идентификатор',
                    strNumber: 3,
                    cellNumber: 9,
                    value: '',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Выход',
                    strNumber: 3,
                    cellNumber: 10,
                    value: '',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Вход',
                    strNumber: 3,
                    cellNumber: 11,
                    value: '',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Оператор',
                    strNumber: 3,
                    cellNumber: 12,
                    value: '',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Категория',
                    strNumber: 3,
                    cellNumber: 13,
                    value: data.event4.category,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Подкатегория',
                    strNumber: 3,
                    cellNumber: 14,
                    value: data.event4.subcategory,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Сегмент',
                    strNumber: 3,
                    cellNumber: 15,
                    value: '',
                    timeout: entry.max
                });
            });
        });
    });

    const resetFilter = () => describe('Администрирование / События системы. Проверка "Сбросить фильтры".', () => {

        describe('Удаление всех событий и добавление прохода', () => {
            it('Удаление событий', async () => await dec.simple(db.truncateEvent,
                [],
                db.truncateEvent));
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
            decorate.page.base.open({
                url: 'http://172.17.100.4/api/setEvent?uid=617&card=13242237&dir=0&date=1685620800'
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
        });

        describe('Проверка "Сбросить фильтры"', () => {
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
                    day: 1,
                    month: 'Июнь',
                    scrollYear: -500,
                    year: 2023
                },
                objEnd: {
                    day: 1,
                    month: 'Июнь',
                    scrollYear: -500,
                    year: 2023
                },
                timeout: entry.max
            });
            decorate.el.table.size({
                strCount: 3,
                timeout: entry.max
            });
            decorate.el.input.sendKeys({
                title: '',
                placeholder: 'Поиск...',
                value: data.event3.name,
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
            decorate.el.table.size({
                strCount: 1,
                timeout: entry.max
            });
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
            decorate.el.input.getValue({
                title: '',
                placeholder: 'Поиск...',
                value: '',
                timeout: entry.max
            });
            decorate.el.table.size({
                strCount: 3,
                timeout: entry.max
            });
        });
    });

    return {
        updateData,
        print,
        exportXLSX,
        exportCSV,
        filterSearch,
        filterDate,
        resetFilter
    }
}

module.exports = {
    other: () => other(),
    befEvent: () => bef(),
}