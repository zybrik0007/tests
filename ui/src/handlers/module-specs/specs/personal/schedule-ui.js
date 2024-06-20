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
const data = require('../../data').dataSchedule;


const bef = () => before('Вход и открытие подраздела "Графики работы"', async () => {
    await page.base.loading(entry.sleep1);
    await dec.auth(entry.customLogin, entry.customPassword);
    await dec.simple(el.section.handler, [sec.per, entry.max], el.section);
    await dec.simple(el.subsection.handler, [sub.per.schedule, entry.max], el.subsection);
    await dec.simple(page.schedule.init, [entry.max], page.schedule);
    await page.base.loading(entry.sleep1);
});

const aft = () => after('Выход', async () => await dec.exit());

const other = () => {

    const editWeek = () => describe('Персонал / Графики работы. Редактирование недельного графика работы.', () => {

        describe('API добавление недельного графика работы', () => {
            bef();
            aft();

            it(`Добавление графика работы "${data.weekly1.name}"`, async () => {
                const cook = await page.base.getCookie('token');
                await dec.simple(api.putSchedule,
                    [[data.weekly1.db], cook.text],
                    api.putSchedule);
            });
        });

        describe('Редактирование', () => {
            bef();
            aft();

            describe('Открытие на редактирование', () => {
                decorate.el.table.strHandler({
                    strNumber: 1,
                    timeout: entry.max
                });
                decorate.el.butIcBefore.handler({
                    icon: but.edit,
                    timeout: entry.max
                });
                decorate.page.scheduleChange.initEdit({
                    timeout: entry.max
                });
            });

            describe('Общие параметры', () => {
                decorate.el.simpleCell.active({
                    name: 'Регистрирующие помещения',
                    timeout: entry.max
                });
                decorate.el.input.backSpace({
                    title: 'Имя графика',
                    placeholder: '',
                    timeout: entry.max
                });
                decorate.el.input.sendKeys({
                    title: 'Имя графика',
                    placeholder: '',
                    value: data.weekly2.name,
                    timeout: entry.max
                });
                decorate.el.input.backSpace({
                    title: 'Описание графика',
                    placeholder: '',
                    timeout: entry.max
                });
                decorate.el.input.sendKeys({
                    title: 'Описание графика',
                    placeholder: '',
                    value: data.weekly2.description,
                    timeout: entry.max
                });
                decorate.el.select.select({
                    title: 'Тип графика',
                    value: 'Недельный',
                    timeout: entry.max
                });
            });

            describe('Регистрирующие помещения', () => {
                decorate.el.simpleCell.active({
                    name: 'Регистрирующие помещения',
                    timeout: entry.max
                });
                decorate.page.scheduleChange.checkboxWorkHandler({
                    name: data.weekly2.rooms.room1.name,
                    timeout: entry.max
                });
                decorate.page.scheduleChange.checkboxNoWorkHandler({
                    name: data.weekly2.rooms.room2.name,
                    timeout: entry.max
                });
                decorate.page.scheduleChange.checkboxWorkHandler({
                    name: data.weekly2.rooms.room3.name,
                    timeout: entry.max
                });
            });

            describe('Интервалы', () => {
                describe('Открытие настроек "Интервалы"', () => {
                    decorate.el.simpleCell.handler({
                        name: 'Интервалы',
                        timeout: entry.max
                    });
                    decorate.el.simpleCell.active({
                        name: 'Интервалы',
                        timeout: entry.max
                    });
                });

                describe('Изменение "Понедельник"', () => {
                    decorate.page.scheduleChange.startTimeSendKeys({
                        numInterval: 1,
                        numTime: 1,
                        value: data.weekly2.intervals.day1.interval1.begin,
                        timeout: entry.max
                    });

                    decorate.page.scheduleChange.endTimeSendKeys({
                        numInterval: 1,
                        numTime: 1,
                        value: data.weekly2.intervals.day1.interval1.end,
                        timeout: entry.max
                    });
                });

                describe('Изменение "Вторник"', () => {
                    decorate.page.scheduleChange.timeRemove({
                        numInterval: 2,
                        numTime: 1,
                        timeout: entry.max
                    });
                });

                describe('Изменение "Среда"', () => {
                    decorate.page.scheduleChange.startTimeSendKeys({
                        numInterval: 3,
                        numTime: 1,
                        value: data.weekly2.intervals.day3.interval1.begin,
                        timeout: entry.max
                    });

                    decorate.page.scheduleChange.endTimeSendKeys({
                        numInterval: 3,
                        numTime: 1,
                        value: data.weekly2.intervals.day3.interval1.end,
                        timeout: entry.max
                    });
                });

                describe('Изменение "Пятница"', () => {
                    decorate.page.scheduleChange.timeRemove({
                        numInterval: 5,
                        numTime: 2,
                        timeout: entry.max
                    });

                    decorate.page.scheduleChange.startTimeSendKeys({
                        numInterval: 5,
                        numTime: 1,
                        value: data.weekly2.intervals.day5.interval1.begin,
                        timeout: entry.max
                    });
                    decorate.page.scheduleChange.endTimeSendKeys({
                        numInterval: 5,
                        numTime: 1,
                        value: data.weekly2.intervals.day5.interval1.end,
                        timeout: entry.max
                    });

                    decorate.page.scheduleChange.startTimeSendKeys({
                        numInterval: 5,
                        numTime: 3,
                        value: data.weekly2.intervals.day5.interval3.begin,
                        timeout: entry.max
                    });
                    decorate.page.scheduleChange.endTimeSendKeys({
                        numInterval: 5,
                        numTime: 3,
                        value: data.weekly2.intervals.day5.interval3.end,
                        timeout: entry.max
                    });

                    decorate.page.scheduleChange.startTimeSendKeys({
                        numInterval: 5,
                        numTime: 2,
                        value: data.weekly2.intervals.day5.interval2.begin,
                        timeout: entry.max
                    });
                    decorate.page.scheduleChange.endTimeSendKeys({
                        numInterval: 5,
                        numTime: 2,
                        value: data.weekly2.intervals.day5.interval2.end,
                        timeout: entry.max
                    });
                });

                describe('Изменение "Суббота"', () => {
                    decorate.page.scheduleChange.timeRemove({
                        numInterval: 6,
                        numTime: 1,
                        timeout: entry.max
                    });
                    decorate.page.scheduleChange.timeRemove({
                        numInterval: 6,
                        numTime: 3,
                        timeout: entry.max
                    });

                    decorate.page.scheduleChange.selectTypeInterval({
                        numInterval: 6,
                        numTime: 1,
                        value: 'Начало смены',
                        timeout: entry.max
                    });
                    decorate.page.scheduleChange.startTimeSendKeys({
                        numInterval: 6,
                        numTime: 1,
                        value: data.weekly2.intervals.day6.interval1.begin,
                        timeout: entry.max
                    });
                    decorate.page.scheduleChange.endTimeSendKeys({
                        numInterval: 6,
                        numTime: 1,
                        value: data.weekly2.intervals.day6.interval1.end,
                        timeout: entry.max
                    });

                    decorate.page.scheduleChange.selectTypeInterval({
                        numInterval: 6,
                        numTime: 2,
                        value: 'Конец смены',
                        timeout: entry.max
                    });
                    decorate.page.scheduleChange.endTimeSendKeys({
                        numInterval: 6,
                        numTime: 2,
                        value: data.weekly2.intervals.day6.interval2.end,
                        timeout: entry.max
                    });
                    decorate.page.scheduleChange.startTimeSendKeys({
                        numInterval: 6,
                        numTime: 2,
                        value: data.weekly2.intervals.day6.interval2.begin,
                        timeout: entry.max
                    });
                });

                describe('Изменение "Воскресенье"', () => {
                    decorate.page.scheduleChange.scrollTop({
                        scroll: 500,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.page.scheduleChange.timeRemove({
                        numInterval: 7,
                        numTime: 2,
                        timeout: entry.max
                    });

                    decorate.page.scheduleChange.startTimeSendKeys({
                        numInterval: 7,
                        numTime: 1,
                        value: data.weekly2.intervals.day7.interval1.begin,
                        timeout: entry.max
                    });
                    decorate.page.scheduleChange.endTimeSendKeys({
                        numInterval: 7,
                        numTime: 1,
                        value: data.weekly2.intervals.day7.interval1.end,
                        timeout: entry.max
                    });

                    decorate.page.scheduleChange.startTimeSendKeys({
                        numInterval: 5,
                        numTime: 3,
                        value: data.weekly2.intervals.day7.interval3.begin,
                        timeout: entry.max
                    });
                    decorate.page.scheduleChange.endTimeSendKeys({
                        numInterval: 7,
                        numTime: 3,
                        value: data.weekly2.intervals.day7.interval3.end,
                        timeout: entry.max
                    });

                    decorate.page.scheduleChange.startTimeSendKeys({
                        numInterval: 7,
                        numTime: 2,
                        value: data.weekly2.intervals.day7.interval2.begin,
                        timeout: entry.max
                    });
                    decorate.page.scheduleChange.endTimeSendKeys({
                        numInterval: 7,
                        numTime: 2,
                        value: data.weekly2.intervals.day7.interval2.end,
                        timeout: entry.max
                    });
                });

            });

            describe('Настройки отчетов', () => {
                describe('Открытие настроек "Настройки отчетов"', () => {
                    decorate.el.simpleCell.handler({
                        name: 'Настройки отчетов',
                        timeout: entry.max
                    });
                    decorate.el.simpleCell.active({
                        name: 'Настройки отчетов',
                        timeout: entry.max
                    });
                });

                describe('Изменение "Не учитывать праздники"', () => {
                    decorate.el.checkbox.handler({
                        name: 'Не учитывать праздники',
                        timeout: entry.max
                    });

                });

                describe('Изменение "Учитывать только первый вход и последний выход"', () => {
                    decorate.el.checkbox.handler({
                        name: 'Учитывать только первый вход и последний выход',
                        timeout: entry.max
                    });
                });

                describe('Изменение "Не считать нарушением, разрешить опоздание не более чем на:"', () => {
                    decorate.page.scheduleChange.hourSendKeys({
                        name: 'Не считать нарушением, разрешить опоздание не более чем на:',
                        value: data.weekly2.setting.arrival.hour,
                        timeout: entry.max
                    });
                    decorate.page.scheduleChange.minuteSendKeys({
                        name: 'Не считать нарушением, разрешить опоздание не более чем на:',
                        value: data.weekly2.setting.arrival.minute,
                        timeout: entry.max
                    });
                });

                describe('Изменение "Не учитывать нарушения менее чем на:"', () => {
                    decorate.page.scheduleChange.hourSendKeys({
                        name: 'Не учитывать нарушения менее чем на:',
                        value: data.weekly2.setting.less.hour,
                        timeout: entry.max
                    });
                    decorate.page.scheduleChange.minuteSendKeys({
                        name: 'Не учитывать нарушения менее чем на:',
                        value: data.weekly2.setting.less.minute,
                        timeout: entry.max
                    });
                });

                describe('Изменение "Не считать нарушением, разрешить уход раньше не более чем на:"', () => {
                    decorate.page.scheduleChange.hourSendKeys({
                        name: 'Не считать нарушением, разрешить уход раньше не более чем на:',
                        value: data.weekly2.setting.early.hour,
                        timeout: entry.max
                    });
                    decorate.page.scheduleChange.minuteSendKeys({
                        name: 'Не считать нарушением, разрешить уход раньше не более чем на:',
                        value: data.weekly2.setting.early.minute,
                        timeout: entry.max
                    });
                });

                describe('Изменение "Не учитывать переработку менее чем на:"', () => {
                    decorate.page.scheduleChange.hourSendKeys({
                        name: 'Не учитывать переработку менее чем на:',
                        value: data.weekly2.setting.overtime.hour,
                        timeout: entry.max
                    });
                    decorate.page.scheduleChange.minuteSendKeys({
                        name: 'Не учитывать переработку менее чем на:',
                        value: data.weekly2.setting.overtime.minute,
                        timeout: entry.max
                    });
                });

            });

            describe('Сохранение', () => {
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

        describe('Проверка', () => {
            bef();
            aft();

            describe('Проверка таблицы', () => {
                decorate.el.table.size({
                    strCount: 1,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Название',
                    strNumber: 1,
                    cellNumber: 1,
                    value: data.weekly2.name,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Тип графика',
                    strNumber: 1,
                    cellNumber: 2,
                    value: 'Недельный',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Описание',
                    strNumber: 1,
                    cellNumber: 3,
                    value: data.weekly2.description,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Примечание',
                    strNumber: 1,
                    cellNumber: 4,
                    value: '',
                    timeout: entry.max
                });
            });

            describe('Проверка параметров', () => {
                describe('Открытие на редактирование', () => {
                    decorate.el.table.strHandler({
                        strNumber: 1,
                        timeout: entry.max
                    });
                    decorate.el.butIcBefore.handler({
                        icon: but.edit,
                        timeout: entry.max
                    });
                    decorate.page.scheduleChange.initEdit({
                        timeout: entry.max
                    });
                });

                describe('Общие параметры', () => {
                    decorate.el.simpleCell.active({
                        name: 'Регистрирующие помещения',
                        timeout: entry.max
                    });
                    decorate.el.input.getValue({
                        title: 'Имя графика',
                        placeholder: '',
                        value: data.weekly2.name,
                        timeout: entry.max
                    });
                    decorate.el.input.getValue({
                        title: 'Описание графика',
                        placeholder: '',
                        value: data.weekly2.description,
                        timeout: entry.max
                    });
                    decorate.el.select.select({
                        title: 'Тип графика',
                        value: 'Недельный',
                        timeout: entry.max
                    });
                });

                describe('Регистрирующие помещения', () => {
                    decorate.el.simpleCell.active({
                        name: 'Регистрирующие помещения',
                        timeout: entry.max
                    });
                    decorate.page.scheduleChange.room({
                        name: data.weekly2.rooms.room1.name,
                        work: data.weekly2.rooms.room1.work,
                        noWork: data.weekly2.rooms.room1.noWork,
                        timeout: entry.max
                    });
                    decorate.page.scheduleChange.room({
                        name: data.weekly2.rooms.room2.name,
                        work: data.weekly2.rooms.room2.work,
                        noWork: data.weekly2.rooms.room2.noWork,
                        timeout: entry.max
                    });
                    decorate.page.scheduleChange.room({
                        name: data.weekly2.rooms.room3.name,
                        work: data.weekly2.rooms.room3.work,
                        noWork: data.weekly2.rooms.room3.noWork,
                        timeout: entry.max
                    });
                });

                describe('Интервалы', () => {
                    describe('Открытие настроек "Интервалы"', () => {
                        decorate.el.simpleCell.handler({
                            name: 'Интервалы',
                            timeout: entry.max
                        });
                        decorate.el.simpleCell.active({
                            name: 'Интервалы',
                            timeout: entry.max
                        });
                    });

                    describe('Проверка "Понедельник"', () => {
                        decorate.page.scheduleChange.intervalName({
                            numInterval: 1,
                            value:data.weekly2.intervals.day1.name,
                            timeout: entry.max
                        });
                        decorate.page.scheduleChange.intervalSumTime({
                            numInterval: 1,
                            value: data.weekly2.intervals.day1.time,
                            timeout: entry.max
                        });
                        decorate.page.scheduleChange.getTypeInterval({
                            numInterval: 1,
                            numTime: 1,
                            value: 'Полная смена',
                            timeout: entry.max
                        });
                        decorate.page.scheduleChange.startTimeGetValue({
                            numInterval: 1,
                            numTime: 1,
                            value: data.weekly2.intervals.day1.interval1.begin,
                            timeout: entry.max
                        });
                        decorate.page.scheduleChange.endTimeGetValue({
                            numInterval: 1,
                            numTime: 1,
                            value: data.weekly2.intervals.day1.interval1.end,
                            timeout: entry.max
                        });
                    });

                    describe('Проверка "Вторник"', () => {
                        decorate.page.scheduleChange.intervalName({
                            numInterval: 2,
                            value:data.weekly2.intervals.day2.name,
                            timeout: entry.max
                        });
                        decorate.page.scheduleChange.intervalSumTime({
                            numInterval: 2,
                            value: data.weekly2.intervals.day2.time,
                            timeout: entry.max
                        });
                        decorate.page.scheduleChange.noTimeInterval({
                            numInterval: 2,
                            timeout: entry.max
                        });
                    });

                    describe('Изменение "Среда"', () => {
                        decorate.page.scheduleChange.intervalName({
                            numInterval: 3,
                            value:data.weekly2.intervals.day3.name,
                            timeout: entry.max
                        });
                        decorate.page.scheduleChange.intervalSumTime({
                            numInterval: 3,
                            value: data.weekly2.intervals.day3.time,
                            timeout: entry.max
                        });
                        decorate.page.scheduleChange.getTypeInterval({
                            numInterval: 1,
                            numTime: 1,
                            value: 'Полная смена',
                            timeout: entry.max
                        });
                        decorate.page.scheduleChange.startTimeSendKeys({
                            numInterval: 3,
                            numTime: 1,
                            value: data.weekly2.intervals.day3.interval1.begin,
                            timeout: entry.max
                        });
                        decorate.page.scheduleChange.endTimeSendKeys({
                            numInterval: 3,
                            numTime: 1,
                            value: data.weekly2.intervals.day3.interval1.end,
                            timeout: entry.max
                        });
                    });

                    describe('Проверка "Четверг"', () => {
                        decorate.page.scheduleChange.intervalName({
                            numInterval: 4,
                            value:data.weekly2.intervals.day4.name,
                            timeout: entry.max
                        });
                        decorate.page.scheduleChange.intervalSumTime({
                            numInterval: 4,
                            value: data.weekly2.intervals.day4.time,
                            timeout: entry.max
                        });
                        decorate.page.scheduleChange.noTimeInterval({
                            numInterval: 4,
                            timeout: entry.max
                        });
                    });

                    describe('Проверка "Пятница"', () => {
                        decorate.page.scheduleChange.intervalName({
                            numInterval: 5,
                            value:data.weekly2.intervals.day5.name,
                            timeout: entry.max
                        });
                        decorate.page.scheduleChange.intervalSumTime({
                            numInterval: 5,
                            value: data.weekly2.intervals.day5.time,
                            timeout: entry.max
                        });

                        decorate.page.scheduleChange.getTypeInterval({
                            numInterval: 5,
                            numTime: 1,
                            value: 'Начало смены',
                            timeout: entry.max
                        });
                        decorate.page.scheduleChange.startTimeGetValue({
                            numInterval: 5,
                            numTime: 1,
                            value: data.weekly2.intervals.day5.interval1.begin,
                            timeout: entry.max
                        });
                        decorate.page.scheduleChange.endTimeGetValue({
                            numInterval: 5,
                            numTime: 1,
                            value: data.weekly2.intervals.day5.interval1.end,
                            timeout: entry.max
                        });

                        decorate.page.scheduleChange.getTypeInterval({
                            numInterval: 5,
                            numTime: 2,
                            value: 'Промежуточный интервал',
                            timeout: entry.max
                        });
                        decorate.page.scheduleChange.startTimeGetValue({
                            numInterval: 5,
                            numTime: 2,
                            value: data.weekly2.intervals.day5.interval2.begin,
                            timeout: entry.max
                        });
                        decorate.page.scheduleChange.endTimeGetValue({
                            numInterval: 5,
                            numTime: 2,
                            value: data.weekly2.intervals.day5.interval2.end,
                            timeout: entry.max
                        });

                        decorate.page.scheduleChange.getTypeInterval({
                            numInterval: 5,
                            numTime: 3,
                            value: 'Конец смены',
                            timeout: entry.max
                        });
                        decorate.page.scheduleChange.startTimeGetValue({
                            numInterval: 5,
                            numTime: 3,
                            value: data.weekly2.intervals.day5.interval3.begin,
                            timeout: entry.max
                        });
                        decorate.page.scheduleChange.endTimeGetValue({
                            numInterval: 5,
                            numTime: 3,
                            value: data.weekly2.intervals.day5.interval3.end,
                            timeout: entry.max
                        });
                    });

                    describe('Проверка "Суббота"', () => {
                        decorate.page.scheduleChange.intervalName({
                            numInterval: 6,
                            value: data.weekly2.intervals.day6.name,
                            timeout: entry.max
                        });
                        decorate.page.scheduleChange.intervalSumTime({
                            numInterval: 6,
                            value: data.weekly2.intervals.day6.time,
                            timeout: entry.max
                        });

                        decorate.page.scheduleChange.getTypeInterval({
                            numInterval: 6,
                            numTime: 1,
                            value: 'Начало смены',
                            timeout: entry.max
                        });
                        decorate.page.scheduleChange.startTimeGetValue({
                            numInterval: 6,
                            numTime: 1,
                            value: data.weekly2.intervals.day6.interval1.begin,
                            timeout: entry.max
                        });
                        decorate.page.scheduleChange.endTimeGetValue({
                            numInterval: 6,
                            numTime: 1,
                            value: data.weekly2.intervals.day6.interval1.end,
                            timeout: entry.max
                        });

                        decorate.page.scheduleChange.getTypeInterval({
                            numInterval: 6,
                            numTime: 2,
                            value: 'Конец смены',
                            timeout: entry.max
                        });
                        decorate.page.scheduleChange.startTimeGetValue({
                            numInterval: 6,
                            numTime: 2,
                            value: data.weekly2.intervals.day6.interval2.begin,
                            timeout: entry.max
                        });
                        decorate.page.scheduleChange.endTimeGetValue({
                            numInterval: 6,
                            numTime: 2,
                            value: data.weekly2.intervals.day6.interval2.end,
                            timeout: entry.max
                        });
                    });

                    describe('Проверка "Воскресенье"', () => {
                        decorate.page.scheduleChange.scrollTop({
                            scroll: 500,
                            timeout: entry.max
                        });
                        decorate.page.base.loading({
                            timeout: entry.sleep2
                        });
                        decorate.page.scheduleChange.intervalName({
                            numInterval: 7,
                            value:data.weekly2.intervals.day7.name,
                            timeout: entry.max
                        });
                        decorate.page.scheduleChange.intervalSumTime({
                            numInterval: 7,
                            value: data.weekly2.intervals.day7.time,
                            timeout: entry.max
                        });

                        decorate.page.scheduleChange.getTypeInterval({
                            numInterval: 7,
                            numTime: 1,
                            value: 'Начало смены',
                            timeout: entry.max
                        });
                        decorate.page.scheduleChange.startTimeGetValue({
                            numInterval: 7,
                            numTime: 1,
                            value: data.weekly2.intervals.day7.interval1.begin,
                            timeout: entry.max
                        });
                        decorate.page.scheduleChange.endTimeGetValue({
                            numInterval: 7,
                            numTime: 1,
                            value: data.weekly2.intervals.day7.interval1.end,
                            timeout: entry.max
                        });

                        decorate.page.scheduleChange.getTypeInterval({
                            numInterval: 7,
                            numTime: 2,
                            value: 'Промежуточный интервал',
                            timeout: entry.max
                        });
                        decorate.page.scheduleChange.startTimeGetValue({
                            numInterval: 5,
                            numTime: 3,
                            value: data.weekly2.intervals.day7.interval3.begin,
                            timeout: entry.max
                        });
                        decorate.page.scheduleChange.endTimeGetValue({
                            numInterval: 7,
                            numTime: 3,
                            value: data.weekly2.intervals.day7.interval3.end,
                            timeout: entry.max
                        });

                        decorate.page.scheduleChange.getTypeInterval({
                            numInterval: 7,
                            numTime: 3,
                            value: 'Конец смены',
                            timeout: entry.max
                        });
                        decorate.page.scheduleChange.startTimeGetValue({
                            numInterval: 7,
                            numTime: 2,
                            value: data.weekly2.intervals.day7.interval2.begin,
                            timeout: entry.max
                        });
                        decorate.page.scheduleChange.endTimeGetValue({
                            numInterval: 7,
                            numTime: 2,
                            value: data.weekly2.intervals.day7.interval2.end,
                            timeout: entry.max
                        });
                    });

                });

                describe('Настройки отчетов', () => {
                    describe('Открытие настроек "Настройки отчетов"', () => {
                        decorate.el.simpleCell.handler({
                            name: 'Настройки отчетов',
                            timeout: entry.max
                        });
                        decorate.el.simpleCell.active({
                            name: 'Настройки отчетов',
                            timeout: entry.max
                        });
                    });

                    describe('Проверка "Не учитывать праздники"', () => {
                        decorate.el.checkbox.checked({
                            name: 'Не учитывать праздники',
                            timeout: entry.max
                        });

                    });

                    describe('Проверка "Учитывать только первый вход и последний выход"', () => {
                        decorate.el.checkbox.checked({
                            name: 'Учитывать только первый вход и последний выход',
                            timeout: entry.max
                        });
                    });

                    describe('Проверка "Не считать нарушением, разрешить опоздание не более чем на:"', () => {
                        decorate.page.scheduleChange.hourGetValue({
                            name: 'Не считать нарушением, разрешить опоздание не более чем на:',
                            value: data.weekly2.setting.arrival.hour,
                            timeout: entry.max
                        });
                        decorate.page.scheduleChange.minuteGetValue({
                            name: 'Не считать нарушением, разрешить опоздание не более чем на:',
                            value: data.weekly2.setting.arrival.minute,
                            timeout: entry.max
                        });
                    });

                    describe('Проверка "Не учитывать нарушения менее чем на:"', () => {
                        decorate.page.scheduleChange.hourGetValue({
                            name: 'Не учитывать нарушения менее чем на:',
                            value: data.weekly2.setting.less.hour,
                            timeout: entry.max
                        });
                        decorate.page.scheduleChange.minuteGetValue({
                            name: 'Не учитывать нарушения менее чем на:',
                            value: data.weekly2.setting.less.minute,
                            timeout: entry.max
                        });
                    });

                    describe('Проверка "Не считать нарушением, разрешить уход раньше не более чем на:"', () => {
                        decorate.page.scheduleChange.hourGetValue({
                            name: 'Не считать нарушением, разрешить уход раньше не более чем на:',
                            value: data.weekly2.setting.early.hour,
                            timeout: entry.max
                        });
                        decorate.page.scheduleChange.minuteGetValue({
                            name: 'Не считать нарушением, разрешить уход раньше не более чем на:',
                            value: data.weekly2.setting.early.minute,
                            timeout: entry.max
                        });
                    });

                    describe('Проверка "Не учитывать переработку менее чем на:"', () => {
                        decorate.page.scheduleChange.hourGetValue({
                            name: 'Не учитывать переработку менее чем на:',
                            value: data.weekly2.setting.overtime.hour,
                            timeout: entry.max
                        });
                        decorate.page.scheduleChange.minuteGetValue({
                            name: 'Не учитывать переработку менее чем на:',
                            value: data.weekly2.setting.overtime.minute,
                            timeout: entry.max
                        });
                    });

                });
            });
        });
    });

    const editWeekInvalidParams = () => describe('Персонал / Графики работы. Попытка редактирования недельного графика' +
        ' c невалидной настройкой интервалов.', () => {

        bef();
        aft();

        describe('Открытие на редактирование', () => {
            decorate.el.table.strHandler({
                strNumber: 1,
                timeout: entry.max
            });
            decorate.el.butIcBefore.handler({
                icon: but.edit,
                timeout: entry.max
            });
            decorate.page.scheduleChange.initEdit({
                timeout: entry.max
            });
        });

        describe('Открытие настроек "Интервалы"', () => {
            decorate.el.simpleCell.handler({
                name: 'Интервалы',
                timeout: entry.max
            });
            decorate.el.simpleCell.active({
                name: 'Интервалы',
                timeout: entry.max
            });
        });

        describe('Попытка редактирования без конца смены', () => {
            decorate.page.scheduleChange.selectTypeInterval({
                numInterval: 3,
                numTime: 1,
                value: 'Начало смены',
                timeout: entry.max
            });
            decorate.el.button.handler({
                name: 'Сохранить изменения',
                timeout: entry.max
            });
            decorate.el.error.error({
                text: 'Началу смены не сопоставлен конец смены',
                timeout: entry.max
            });
        });

        describe('Попытка редактирования без начала смены', () => {
            decorate.page.scheduleChange.selectTypeInterval({
                numInterval: 3,
                numTime: 1,
                value: 'Конец смены',
                timeout: entry.max
            });
            decorate.el.button.handler({
                name: 'Сохранить изменения',
                timeout: entry.max
            });
            decorate.el.error.error({
                text: 'Началу смены не сопоставлен конец смены',
                timeout: entry.max
            });
        });

        describe('Попытка редактирования без начала и конца смены', () => {
            decorate.page.scheduleChange.selectTypeInterval({
                numInterval: 3,
                numTime: 1,
                value: 'Промежуточный интервал',
                timeout: entry.max
            });
            decorate.el.button.handler({
                name: 'Сохранить изменения',
                timeout: entry.max
            });
            decorate.el.error.error({
                text: 'Некоторые интервалы заданы неправильно (отмечены красным). Наведите курсор на ' +
                    'интервал для просмотра информации об ошибке',
                timeout: entry.max
            });
        });
    });

    const addWeekNoParams = () => describe('Персонал / Графики работы. Попытка добавления недельного графика ' +
        'без помещения и интервалов.', () => {

        bef();
        aft();

        describe('Открытие на добавление', () => {
            decorate.el.butIcBefore.handler({
                icon: but.add,
                timeout: entry.max
            });
            decorate.page.scheduleChange.initAdd({
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
            decorate.el.select.iconXpand({
                title: 'Тип графика',
                value: 'Недельный',
                text: 'Недельный',
                timeout: entry.max
            });
        });

        describe('Попытка добавления без помещения', () => {
            decorate.el.button.handler({
                name: 'Сохранить изменения',
                timeout: entry.max
            });
            decorate.el.error.error({
                text: 'Должны быть заданы параметры хотя бы для одного помещения',
                timeout: entry.max
            });
        });

        describe('Попытка добавления без интервалов', () => {
            decorate.page.scheduleChange.checkboxWorkHandler({
                name: data.weekly2.rooms.room1.name,
                timeout: entry.max
            });
            decorate.el.button.handler({
                name: 'Сохранить изменения',
                timeout: entry.max
            });
            decorate.el.error.error({
                text: 'В графике работы обязательно должны присутствовать временные интервалы.',
                timeout: entry.max
            });
        });
    });

    const copyWeek = () => describe('Персонал / Графики работы. Копирование недельного графика работы.', () => {

        describe('Копирование', () => {
            bef();
            aft();

            decorate.el.table.strHandler({
                strNumber: 1,
                timeout: entry.max
            });
            decorate.el.butIcBefore.handler({
                icon: but.copy,
                timeout: entry.max
            });
            decorate.page.scheduleChange.initCopy({
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

        describe('Проверка', () => {
            bef();
            aft();

            describe('Проверка таблицы', () => {
                decorate.el.table.size({
                    strCount: 2,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Название',
                    strNumber: 1,
                    cellNumber: 1,
                    value: data.weekly2.name + ' (Копия)',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Тип графика',
                    strNumber: 1,
                    cellNumber: 2,
                    value: 'Недельный',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Описание',
                    strNumber: 1,
                    cellNumber: 3,
                    value: data.weekly2.description,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Примечание',
                    strNumber: 1,
                    cellNumber: 4,
                    value: '',
                    timeout: entry.max
                });
            });

            describe('Проверка параметров', () => {
                describe('Открытие на редактирование', () => {
                    decorate.el.table.strHandler({
                        strNumber: 1,
                        timeout: entry.max
                    });
                    decorate.el.butIcBefore.handler({
                        icon: but.edit,
                        timeout: entry.max
                    });
                    decorate.page.scheduleChange.initEdit({
                        timeout: entry.max
                    });
                });

                describe('Общие параметры', () => {
                    decorate.el.simpleCell.active({
                        name: 'Регистрирующие помещения',
                        timeout: entry.max
                    });
                    decorate.el.input.getValue({
                        title: 'Имя графика',
                        placeholder: '',
                        value: data.weekly2.name + ' (Копия)',
                        timeout: entry.max
                    });
                    decorate.el.input.getValue({
                        title: 'Описание графика',
                        placeholder: '',
                        value: data.weekly2.description,
                        timeout: entry.max
                    });
                    decorate.el.select.select({
                        title: 'Тип графика',
                        value: 'Недельный',
                        timeout: entry.max
                    });
                });

                describe('Регистрирующие помещения', () => {
                    decorate.el.simpleCell.active({
                        name: 'Регистрирующие помещения',
                        timeout: entry.max
                    });
                    decorate.page.scheduleChange.room({
                        name: data.weekly2.rooms.room1.name,
                        work: data.weekly2.rooms.room1.work,
                        noWork: data.weekly2.rooms.room1.noWork,
                        timeout: entry.max
                    });
                    decorate.page.scheduleChange.room({
                        name: data.weekly2.rooms.room2.name,
                        work: data.weekly2.rooms.room2.work,
                        noWork: data.weekly2.rooms.room2.noWork,
                        timeout: entry.max
                    });
                    decorate.page.scheduleChange.room({
                        name: data.weekly2.rooms.room3.name,
                        work: data.weekly2.rooms.room3.work,
                        noWork: data.weekly2.rooms.room3.noWork,
                        timeout: entry.max
                    });
                });

                describe('Интервалы', () => {
                    describe('Открытие настроек "Интервалы"', () => {
                        decorate.el.simpleCell.handler({
                            name: 'Интервалы',
                            timeout: entry.max
                        });
                        decorate.el.simpleCell.active({
                            name: 'Интервалы',
                            timeout: entry.max
                        });
                    });

                    describe('Проверка "Понедельник"', () => {
                        decorate.page.scheduleChange.intervalName({
                            numInterval: 1,
                            value:data.weekly2.intervals.day1.name,
                            timeout: entry.max
                        });
                        decorate.page.scheduleChange.intervalSumTime({
                            numInterval: 1,
                            value: data.weekly2.intervals.day1.time,
                            timeout: entry.max
                        });
                        decorate.page.scheduleChange.getTypeInterval({
                            numInterval: 1,
                            numTime: 1,
                            value: 'Полная смена',
                            timeout: entry.max
                        });
                        decorate.page.scheduleChange.startTimeGetValue({
                            numInterval: 1,
                            numTime: 1,
                            value: data.weekly2.intervals.day1.interval1.begin,
                            timeout: entry.max
                        });
                        decorate.page.scheduleChange.endTimeGetValue({
                            numInterval: 1,
                            numTime: 1,
                            value: data.weekly2.intervals.day1.interval1.end,
                            timeout: entry.max
                        });
                    });

                    describe('Проверка "Вторник"', () => {
                        decorate.page.scheduleChange.intervalName({
                            numInterval: 2,
                            value:data.weekly2.intervals.day2.name,
                            timeout: entry.max
                        });
                        decorate.page.scheduleChange.intervalSumTime({
                            numInterval: 2,
                            value: data.weekly2.intervals.day2.time,
                            timeout: entry.max
                        });
                        decorate.page.scheduleChange.noTimeInterval({
                            numInterval: 2,
                            timeout: entry.max
                        });
                    });

                    describe('Изменение "Среда"', () => {
                        decorate.page.scheduleChange.intervalName({
                            numInterval: 3,
                            value:data.weekly2.intervals.day3.name,
                            timeout: entry.max
                        });
                        decorate.page.scheduleChange.intervalSumTime({
                            numInterval: 3,
                            value: data.weekly2.intervals.day3.time,
                            timeout: entry.max
                        });
                        decorate.page.scheduleChange.getTypeInterval({
                            numInterval: 1,
                            numTime: 1,
                            value: 'Полная смена',
                            timeout: entry.max
                        });
                        decorate.page.scheduleChange.startTimeSendKeys({
                            numInterval: 3,
                            numTime: 1,
                            value: data.weekly2.intervals.day3.interval1.begin,
                            timeout: entry.max
                        });
                        decorate.page.scheduleChange.endTimeSendKeys({
                            numInterval: 3,
                            numTime: 1,
                            value: data.weekly2.intervals.day3.interval1.end,
                            timeout: entry.max
                        });
                    });

                    describe('Проверка "Четверг"', () => {
                        decorate.page.scheduleChange.intervalName({
                            numInterval: 4,
                            value:data.weekly2.intervals.day4.name,
                            timeout: entry.max
                        });
                        decorate.page.scheduleChange.intervalSumTime({
                            numInterval: 4,
                            value: data.weekly2.intervals.day4.time,
                            timeout: entry.max
                        });
                        decorate.page.scheduleChange.noTimeInterval({
                            numInterval: 4,
                            timeout: entry.max
                        });
                    });

                    describe('Проверка "Пятница"', () => {
                        decorate.page.scheduleChange.intervalName({
                            numInterval: 5,
                            value:data.weekly2.intervals.day5.name,
                            timeout: entry.max
                        });
                        decorate.page.scheduleChange.intervalSumTime({
                            numInterval: 5,
                            value: data.weekly2.intervals.day5.time,
                            timeout: entry.max
                        });

                        decorate.page.scheduleChange.getTypeInterval({
                            numInterval: 5,
                            numTime: 1,
                            value: 'Начало смены',
                            timeout: entry.max
                        });
                        decorate.page.scheduleChange.startTimeGetValue({
                            numInterval: 5,
                            numTime: 1,
                            value: data.weekly2.intervals.day5.interval1.begin,
                            timeout: entry.max
                        });
                        decorate.page.scheduleChange.endTimeGetValue({
                            numInterval: 5,
                            numTime: 1,
                            value: data.weekly2.intervals.day5.interval1.end,
                            timeout: entry.max
                        });

                        decorate.page.scheduleChange.getTypeInterval({
                            numInterval: 5,
                            numTime: 2,
                            value: 'Промежуточный интервал',
                            timeout: entry.max
                        });
                        decorate.page.scheduleChange.startTimeGetValue({
                            numInterval: 5,
                            numTime: 2,
                            value: data.weekly2.intervals.day5.interval2.begin,
                            timeout: entry.max
                        });
                        decorate.page.scheduleChange.endTimeGetValue({
                            numInterval: 5,
                            numTime: 2,
                            value: data.weekly2.intervals.day5.interval2.end,
                            timeout: entry.max
                        });

                        decorate.page.scheduleChange.getTypeInterval({
                            numInterval: 5,
                            numTime: 3,
                            value: 'Конец смены',
                            timeout: entry.max
                        });
                        decorate.page.scheduleChange.startTimeGetValue({
                            numInterval: 5,
                            numTime: 3,
                            value: data.weekly2.intervals.day5.interval3.begin,
                            timeout: entry.max
                        });
                        decorate.page.scheduleChange.endTimeGetValue({
                            numInterval: 5,
                            numTime: 3,
                            value: data.weekly2.intervals.day5.interval3.end,
                            timeout: entry.max
                        });
                    });

                    describe('Проверка "Суббота"', () => {
                        decorate.page.scheduleChange.intervalName({
                            numInterval: 6,
                            value: data.weekly2.intervals.day6.name,
                            timeout: entry.max
                        });
                        decorate.page.scheduleChange.intervalSumTime({
                            numInterval: 6,
                            value: data.weekly2.intervals.day6.time,
                            timeout: entry.max
                        });

                        decorate.page.scheduleChange.getTypeInterval({
                            numInterval: 6,
                            numTime: 1,
                            value: 'Начало смены',
                            timeout: entry.max
                        });
                        decorate.page.scheduleChange.startTimeGetValue({
                            numInterval: 6,
                            numTime: 1,
                            value: data.weekly2.intervals.day6.interval1.begin,
                            timeout: entry.max
                        });
                        decorate.page.scheduleChange.endTimeGetValue({
                            numInterval: 6,
                            numTime: 1,
                            value: data.weekly2.intervals.day6.interval1.end,
                            timeout: entry.max
                        });

                        decorate.page.scheduleChange.getTypeInterval({
                            numInterval: 6,
                            numTime: 2,
                            value: 'Конец смены',
                            timeout: entry.max
                        });
                        decorate.page.scheduleChange.startTimeGetValue({
                            numInterval: 6,
                            numTime: 2,
                            value: data.weekly2.intervals.day6.interval2.begin,
                            timeout: entry.max
                        });
                        decorate.page.scheduleChange.endTimeGetValue({
                            numInterval: 6,
                            numTime: 2,
                            value: data.weekly2.intervals.day6.interval2.end,
                            timeout: entry.max
                        });
                    });

                    describe('Проверка "Воскресенье"', () => {
                        decorate.page.scheduleChange.scrollTop({
                            scroll: 500,
                            timeout: entry.max
                        });
                        decorate.page.base.loading({
                            timeout: entry.sleep2
                        });
                        decorate.page.scheduleChange.intervalName({
                            numInterval: 7,
                            value:data.weekly2.intervals.day7.name,
                            timeout: entry.max
                        });
                        decorate.page.scheduleChange.intervalSumTime({
                            numInterval: 7,
                            value: data.weekly2.intervals.day7.time,
                            timeout: entry.max
                        });

                        decorate.page.scheduleChange.getTypeInterval({
                            numInterval: 7,
                            numTime: 1,
                            value: 'Начало смены',
                            timeout: entry.max
                        });
                        decorate.page.scheduleChange.startTimeGetValue({
                            numInterval: 7,
                            numTime: 1,
                            value: data.weekly2.intervals.day7.interval1.begin,
                            timeout: entry.max
                        });
                        decorate.page.scheduleChange.endTimeGetValue({
                            numInterval: 7,
                            numTime: 1,
                            value: data.weekly2.intervals.day7.interval1.end,
                            timeout: entry.max
                        });

                        decorate.page.scheduleChange.getTypeInterval({
                            numInterval: 7,
                            numTime: 2,
                            value: 'Промежуточный интервал',
                            timeout: entry.max
                        });
                        decorate.page.scheduleChange.startTimeGetValue({
                            numInterval: 5,
                            numTime: 3,
                            value: data.weekly2.intervals.day7.interval3.begin,
                            timeout: entry.max
                        });
                        decorate.page.scheduleChange.endTimeGetValue({
                            numInterval: 7,
                            numTime: 3,
                            value: data.weekly2.intervals.day7.interval3.end,
                            timeout: entry.max
                        });

                        decorate.page.scheduleChange.getTypeInterval({
                            numInterval: 7,
                            numTime: 3,
                            value: 'Конец смены',
                            timeout: entry.max
                        });
                        decorate.page.scheduleChange.startTimeGetValue({
                            numInterval: 7,
                            numTime: 2,
                            value: data.weekly2.intervals.day7.interval2.begin,
                            timeout: entry.max
                        });
                        decorate.page.scheduleChange.endTimeGetValue({
                            numInterval: 7,
                            numTime: 2,
                            value: data.weekly2.intervals.day7.interval2.end,
                            timeout: entry.max
                        });
                    });

                });

                describe('Настройки отчетов', () => {
                    describe('Открытие настроек "Настройки отчетов"', () => {
                        decorate.el.simpleCell.handler({
                            name: 'Настройки отчетов',
                            timeout: entry.max
                        });
                        decorate.el.simpleCell.active({
                            name: 'Настройки отчетов',
                            timeout: entry.max
                        });
                    });

                    describe('Проверка "Не учитывать праздники"', () => {
                        decorate.el.checkbox.checked({
                            name: 'Не учитывать праздники',
                            timeout: entry.max
                        });

                    });

                    describe('Проверка "Учитывать только первый вход и последний выход"', () => {
                        decorate.el.checkbox.checked({
                            name: 'Учитывать только первый вход и последний выход',
                            timeout: entry.max
                        });
                    });

                    describe('Проверка "Не считать нарушением, разрешить опоздание не более чем на:"', () => {
                        decorate.page.scheduleChange.hourGetValue({
                            name: 'Не считать нарушением, разрешить опоздание не более чем на:',
                            value: data.weekly2.setting.arrival.hour,
                            timeout: entry.max
                        });
                        decorate.page.scheduleChange.minuteGetValue({
                            name: 'Не считать нарушением, разрешить опоздание не более чем на:',
                            value: data.weekly2.setting.arrival.minute,
                            timeout: entry.max
                        });
                    });

                    describe('Проверка "Не учитывать нарушения менее чем на:"', () => {
                        decorate.page.scheduleChange.hourGetValue({
                            name: 'Не учитывать нарушения менее чем на:',
                            value: data.weekly2.setting.less.hour,
                            timeout: entry.max
                        });
                        decorate.page.scheduleChange.minuteGetValue({
                            name: 'Не учитывать нарушения менее чем на:',
                            value: data.weekly2.setting.less.minute,
                            timeout: entry.max
                        });
                    });

                    describe('Проверка "Не считать нарушением, разрешить уход раньше не более чем на:"', () => {
                        decorate.page.scheduleChange.hourGetValue({
                            name: 'Не считать нарушением, разрешить уход раньше не более чем на:',
                            value: data.weekly2.setting.early.hour,
                            timeout: entry.max
                        });
                        decorate.page.scheduleChange.minuteGetValue({
                            name: 'Не считать нарушением, разрешить уход раньше не более чем на:',
                            value: data.weekly2.setting.early.minute,
                            timeout: entry.max
                        });
                    });

                    describe('Проверка "Не учитывать переработку менее чем на:"', () => {
                        decorate.page.scheduleChange.hourGetValue({
                            name: 'Не учитывать переработку менее чем на:',
                            value: data.weekly2.setting.overtime.hour,
                            timeout: entry.max
                        });
                        decorate.page.scheduleChange.minuteGetValue({
                            name: 'Не учитывать переработку менее чем на:',
                            value: data.weekly2.setting.overtime.minute,
                            timeout: entry.max
                        });
                    });

                });
            });
        });
    });

    const deleteSchedule = () => describe('Персонал / Графики работы. Удаление графика.', () => {
        bef();
        aft();
        decorate.el.table.strHandler({
            strNumber: 1,
            timeout: entry.max
        });
        decorate.el.butIcBefore.handler({
            icon: but.delete,
            timeout: entry.max
        });
        decorate.page.base.loading({
            timeout: entry.sleep2
        });
        decorate.el.button.handler({
            name: 'Удалить',
            timeout: entry.max
        });
        decorate.el.success.success({
            text: 'График работы успешно удален',
            timeout: entry.max
        });
        decorate.page.base.loading({
            timeout: entry.sleep2
        });
    });

    const noStr = () => describe('Персонал / Графики работы. Проверка отсутствия строк в таблице.', () => {
        bef();
        aft();
        decorate.el.table.noStr({
            timeout: entry.max
        });
    });

    const editShift = () => describe('Персонал / Графики работы. Редактирование сменного графика.', () => {

        describe('API добавление сменного графика работы', () => {
            bef();
            aft();

            it(`Добавление графика работы "${data.shift1.name}"`, async () => {
                const cook = await page.base.getCookie('token');
                await dec.simple(api.putSchedule,
                    [[data.shift1.db], cook.text],
                    api.putSchedule);
            });
        });

        describe('Редактирование', () => {
            bef();
            aft();

            describe('Открытие на редактирование', () => {
                decorate.el.table.strHandler({
                    strNumber: 1,
                    timeout: entry.max
                });
                decorate.el.butIcBefore.handler({
                    icon: but.edit,
                    timeout: entry.max
                });
                decorate.page.scheduleChange.initEdit({
                    timeout: entry.max
                });
            });

            describe('Общие параметры', () => {
                decorate.el.simpleCell.active({
                    name: 'Регистрирующие помещения',
                    timeout: entry.max
                });
                decorate.el.input.backSpace({
                    title: 'Имя графика',
                    placeholder: '',
                    timeout: entry.max
                });
                decorate.el.input.sendKeys({
                    title: 'Имя графика',
                    placeholder: '',
                    value: data.shift2.name,
                    timeout: entry.max
                });
                decorate.el.input.backSpace({
                    title: 'Описание графика',
                    placeholder: '',
                    timeout: entry.max
                });
                decorate.el.input.sendKeys({
                    title: 'Описание графика',
                    placeholder: '',
                    value: data.shift2.description,
                    timeout: entry.max
                });
                decorate.el.select.select({
                    title: 'Тип графика',
                    value: 'Сменный',
                    timeout: entry.max
                });
            });

            describe('Регистрирующие помещения', () => {
                decorate.el.simpleCell.active({
                    name: 'Регистрирующие помещения',
                    timeout: entry.max
                });
                decorate.page.scheduleChange.checkboxWorkHandler({
                    name: data.weekly2.rooms.room1.name,
                    timeout: entry.max
                });
                decorate.page.scheduleChange.checkboxNoWorkHandler({
                    name: data.weekly2.rooms.room2.name,
                    timeout: entry.max
                });
                decorate.page.scheduleChange.checkboxWorkHandler({
                    name: data.weekly2.rooms.room3.name,
                    timeout: entry.max
                });
            });

            describe('Интервалы', () => {
                describe('Открытие настроек "Интервалы"', () => {
                    decorate.el.simpleCell.handler({
                        name: 'Интервалы',
                        timeout: entry.max
                    });
                    decorate.el.simpleCell.active({
                        name: 'Интервалы',
                        timeout: entry.max
                    });
                });

                describe('Изменение "День 2"', () => {
                    decorate.page.scheduleChange.endTimeSendKeys({
                        numInterval: 2,
                        numTime: 1,
                        value: data.shift2.intervals.day2.interval1.end,
                        timeout: entry.max
                    });
                });

                describe('Изменение "День 1"', () => {
                    decorate.page.scheduleChange.startTimeSendKeys({
                        numInterval: 1,
                        numTime: 1,
                        value: data.shift2.intervals.day1.interval1.begin,
                        timeout: entry.max
                    });
                });

                describe('Изменение "День 3"', () => {
                    decorate.page.scheduleChange.timeRemove({
                        numInterval: 3,
                        numTime: 3,
                        timeout: entry.max
                    });
                    decorate.page.scheduleChange.timeRemove({
                        numInterval: 3,
                        numTime: 4,
                        timeout: entry.max
                    });
                    decorate.page.scheduleChange.timeRemove({
                        numInterval: 3,
                        numTime: 1,
                        timeout: entry.max
                    });

                    decorate.page.scheduleChange.selectTypeInterval({
                        numInterval: 3,
                        numTime: 1,
                        value: 'Начало смены',
                        timeout: entry.max
                    });
                    decorate.page.scheduleChange.startTimeSendKeys({
                        numInterval: 3,
                        numTime: 1,
                        value: data.shift2.intervals.day3.interval1.begin,
                        timeout: entry.max
                    });
                    decorate.page.scheduleChange.endTimeSendKeys({
                        numInterval: 3,
                        numTime: 1,
                        value: data.shift2.intervals.day3.interval1.end,
                        timeout: entry.max
                    });

                    decorate.page.scheduleChange.selectTypeInterval({
                        numInterval: 3,
                        numTime: 2,
                        value: 'Конец смены',
                        timeout: entry.max
                    });
                    decorate.page.scheduleChange.startTimeSendKeys({
                        numInterval: 3,
                        numTime: 2,
                        value: data.shift2.intervals.day3.interval2.begin,
                        timeout: entry.max
                    });
                    decorate.page.scheduleChange.endTimeSendKeys({
                        numInterval: 3,
                        numTime: 2,
                        value: data.shift2.intervals.day3.interval2.end,
                        timeout: entry.max
                    });
                });

                describe('Добавлние "День 4"', () => {
                    decorate.page.scheduleChange.noInterval({
                        numInterval: 4,
                        timeout: entry.max
                    });
                    decorate.el.butIcBefore.handler({
                        icon: but.add,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.page.scheduleChange.interval({
                        numInterval: 4,
                        timeout: entry.max
                    });
                });

                describe('Добавлние "День 5"', () => {
                    decorate.page.scheduleChange.noInterval({
                        numInterval: 5,
                        timeout: entry.max
                    });
                    decorate.el.butIcBefore.handler({
                        icon: but.add,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.page.scheduleChange.interval({
                        numInterval: 5,
                        timeout: entry.max
                    });
                });

                describe('Удаление "День 5"', () => {
                    decorate.el.butIcBefore.handler({
                        icon: but.delete,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.page.scheduleChange.noInterval({
                        numInterval: 5,
                        timeout: entry.max
                    });
                });

                describe('Изменение даты', () => {
                    decorate.el.input.iconCalendar({
                        title: '',
                        placeholder: '',
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.datepicker.dateParse({
                        day: data.shift2.date.day,
                        month: data.shift2.date.month,
                        year: data.shift2.date.year,
                        timeout: entry.max
                    });
                });

            });

            describe('Настройки отчетов', () => {
                describe('Открытие настроек "Настройки отчетов"', () => {
                    decorate.el.simpleCell.handler({
                        name: 'Настройки отчетов',
                        timeout: entry.max
                    });
                    decorate.el.simpleCell.active({
                        name: 'Настройки отчетов',
                        timeout: entry.max
                    });
                });

                describe('Изменение "Учитывать только первый вход и последний выход"', () => {
                    decorate.el.checkbox.handler({
                        name: 'Учитывать только первый вход и последний выход',
                        timeout: entry.max
                    });
                });

                describe('Изменение "Не считать нарушением, разрешить опоздание не более чем на:"', () => {
                    decorate.page.scheduleChange.hourSendKeys({
                        name: 'Не считать нарушением, разрешить опоздание не более чем на:',
                        value: data.weekly2.setting.arrival.hour,
                        timeout: entry.max
                    });
                    decorate.page.scheduleChange.minuteSendKeys({
                        name: 'Не считать нарушением, разрешить опоздание не более чем на:',
                        value: data.weekly2.setting.arrival.minute,
                        timeout: entry.max
                    });
                });

                describe('Изменение "Не учитывать нарушения менее чем на:"', () => {
                    decorate.page.scheduleChange.hourSendKeys({
                        name: 'Не учитывать нарушения менее чем на:',
                        value: data.weekly2.setting.less.hour,
                        timeout: entry.max
                    });
                    decorate.page.scheduleChange.minuteSendKeys({
                        name: 'Не учитывать нарушения менее чем на:',
                        value: data.weekly2.setting.less.minute,
                        timeout: entry.max
                    });
                });

                describe('Изменение "Не считать нарушением, разрешить уход раньше не более чем на:"', () => {
                    decorate.page.scheduleChange.hourSendKeys({
                        name: 'Не считать нарушением, разрешить уход раньше не более чем на:',
                        value: data.weekly2.setting.early.hour,
                        timeout: entry.max
                    });
                    decorate.page.scheduleChange.minuteSendKeys({
                        name: 'Не считать нарушением, разрешить уход раньше не более чем на:',
                        value: data.weekly2.setting.early.minute,
                        timeout: entry.max
                    });
                });

                describe('Изменение "Не учитывать переработку менее чем на:"', () => {
                    decorate.page.scheduleChange.hourSendKeys({
                        name: 'Не учитывать переработку менее чем на:',
                        value: data.weekly2.setting.overtime.hour,
                        timeout: entry.max
                    });
                    decorate.page.scheduleChange.minuteSendKeys({
                        name: 'Не учитывать переработку менее чем на:',
                        value: data.weekly2.setting.overtime.minute,
                        timeout: entry.max
                    });
                });

            });

            describe('Сохранение', () => {
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

        describe('Проверка', () => {
            bef();
            aft();

            describe('Проверка таблицы', () => {
                decorate.el.table.size({
                    strCount: 1,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Название',
                    strNumber: 1,
                    cellNumber: 1,
                    value: data.shift2.name,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Тип графика',
                    strNumber: 1,
                    cellNumber: 2,
                    value: 'Сменный',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Описание',
                    strNumber: 1,
                    cellNumber: 3,
                    value: data.shift2.description,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Примечание',
                    strNumber: 1,
                    cellNumber: 4,
                    value: '',
                    timeout: entry.max
                });
            });

            describe('Проверка параметров', () => {
                describe('Открытие на редактирование', () => {
                    decorate.el.table.strHandler({
                        strNumber: 1,
                        timeout: entry.max
                    });
                    decorate.el.butIcBefore.handler({
                        icon: but.edit,
                        timeout: entry.max
                    });
                    decorate.page.scheduleChange.initEdit({
                        timeout: entry.max
                    });
                });

                describe('Общие параметры', () => {
                    decorate.el.simpleCell.active({
                        name: 'Регистрирующие помещения',
                        timeout: entry.max
                    });
                    decorate.el.input.getValue({
                        title: 'Имя графика',
                        placeholder: '',
                        value: data.shift2.name,
                        timeout: entry.max
                    });
                    decorate.el.input.getValue({
                        title: 'Описание графика',
                        placeholder: '',
                        value: data.shift2.description,
                        timeout: entry.max
                    });
                    decorate.el.select.select({
                        title: 'Тип графика',
                        value: 'Сменный',
                        timeout: entry.max
                    });
                });

                describe('Регистрирующие помещения', () => {
                    decorate.el.simpleCell.active({
                        name: 'Регистрирующие помещения',
                        timeout: entry.max
                    });
                    decorate.page.scheduleChange.room({
                        name: data.weekly2.rooms.room1.name,
                        work: data.weekly2.rooms.room1.work,
                        noWork: data.weekly2.rooms.room1.noWork,
                        timeout: entry.max
                    });
                    decorate.page.scheduleChange.room({
                        name: data.weekly2.rooms.room2.name,
                        work: data.weekly2.rooms.room2.work,
                        noWork: data.weekly2.rooms.room2.noWork,
                        timeout: entry.max
                    });
                    decorate.page.scheduleChange.room({
                        name: data.weekly2.rooms.room3.name,
                        work: data.weekly2.rooms.room3.work,
                        noWork: data.weekly2.rooms.room3.noWork,
                        timeout: entry.max
                    });
                });

                describe('Интервалы', () => {
                    describe('Открытие настроек "Интервалы"', () => {
                        decorate.el.simpleCell.handler({
                            name: 'Интервалы',
                            timeout: entry.max
                        });
                        decorate.el.simpleCell.active({
                            name: 'Интервалы',
                            timeout: entry.max
                        });
                    });

                    describe('Проверка "День 1"', () => {
                        decorate.page.scheduleChange.intervalName({
                            numInterval: 1,
                            value: data.shift2.intervals.day1.name,
                            timeout: entry.max
                        });
                        decorate.page.scheduleChange.intervalSumTime({
                            numInterval: 1,
                            value: data.shift2.intervals.day1.time,
                            timeout: entry.max
                        });
                        decorate.page.scheduleChange.getTypeInterval({
                            numInterval: 1,
                            numTime: 1,
                            value: 'Полная смена',
                            timeout: entry.max
                        });
                        decorate.page.scheduleChange.startTimeGetValue({
                            numInterval: 1,
                            numTime: 1,
                            value: data.shift2.intervals.day1.interval1.begin,
                            timeout: entry.max
                        });
                    });

                    describe('Проверка "День 2"', () => {
                        decorate.page.scheduleChange.intervalName({
                            numInterval: 2,
                            value:data.shift2.intervals.day2.name,
                            timeout: entry.max
                        });
                        decorate.page.scheduleChange.intervalSumTime({
                            numInterval: 2,
                            value: data.shift2.intervals.day2.time,
                            timeout: entry.max
                        });
                        decorate.page.scheduleChange.getTypeInterval({
                            numInterval: 2,
                            numTime: 1,
                            value: 'Полная смена',
                            timeout: entry.max
                        });
                        decorate.page.scheduleChange.endTimeGetValue({
                            numInterval: 2,
                            numTime: 1,
                            value: data.shift2.intervals.day2.interval1.end,
                            timeout: entry.max
                        });
                    });

                    describe('Изменение "День 3"', () => {
                        decorate.page.scheduleChange.intervalName({
                            numInterval: 3,
                            value:data.shift2.intervals.day3.name,
                            timeout: entry.max
                        });
                        decorate.page.scheduleChange.intervalSumTime({
                            numInterval: 3,
                            value: data.shift2.intervals.day3.time,
                            timeout: entry.max
                        });

                        decorate.page.scheduleChange.getTypeInterval({
                            numInterval: 3,
                            numTime: 1,
                            value: 'Начало смены',
                            timeout: entry.max
                        });
                        decorate.page.scheduleChange.startTimeGetValue({
                            numInterval: 3,
                            numTime: 1,
                            value: data.shift2.intervals.day3.interval1.begin,
                            timeout: entry.max
                        });
                        decorate.page.scheduleChange.endTimeSendKeys({
                            numInterval: 3,
                            numTime: 1,
                            value: data.shift2.intervals.day3.interval1.end,
                            timeout: entry.max
                        });

                        decorate.page.scheduleChange.getTypeInterval({
                            numInterval: 3,
                            numTime: 2,
                            value: 'Конец смены',
                            timeout: entry.max
                        });
                        decorate.page.scheduleChange.startTimeGetValue({
                            numInterval: 3,
                            numTime: 2,
                            value: data.shift2.intervals.day3.interval2.begin,
                            timeout: entry.max
                        });
                        decorate.page.scheduleChange.endTimeSendKeys({
                            numInterval: 3,
                            numTime: 1,
                            value: data.shift2.intervals.day3.interval2.end,
                            timeout: entry.max
                        });
                    });

                    describe('Проверка "День 4"', () => {
                        decorate.page.scheduleChange.intervalName({
                            numInterval: 4,
                            value:data.shift2.intervals.day4.name,
                            timeout: entry.max
                        });
                        decorate.page.scheduleChange.intervalSumTime({
                            numInterval: 4,
                            value: data.shift2.intervals.day4.time,
                            timeout: entry.max
                        });
                        decorate.page.scheduleChange.noTimeInterval({
                            numInterval: 4,
                            timeout: entry.max
                        });
                    });

                });

                describe('Настройки отчетов', () => {
                    describe('Открытие настроек "Настройки отчетов"', () => {
                        decorate.el.simpleCell.handler({
                            name: 'Настройки отчетов',
                            timeout: entry.max
                        });
                        decorate.el.simpleCell.active({
                            name: 'Настройки отчетов',
                            timeout: entry.max
                        });
                    });

                    describe('Проверка "Учитывать только первый вход и последний выход"', () => {
                        decorate.el.checkbox.checked({
                            name: 'Учитывать только первый вход и последний выход',
                            timeout: entry.max
                        });
                    });

                    describe('Проверка "Не считать нарушением, разрешить опоздание не более чем на:"', () => {
                        decorate.page.scheduleChange.hourGetValue({
                            name: 'Не считать нарушением, разрешить опоздание не более чем на:',
                            value: data.weekly2.setting.arrival.hour,
                            timeout: entry.max
                        });
                        decorate.page.scheduleChange.minuteGetValue({
                            name: 'Не считать нарушением, разрешить опоздание не более чем на:',
                            value: data.weekly2.setting.arrival.minute,
                            timeout: entry.max
                        });
                    });

                    describe('Проверка "Не учитывать нарушения менее чем на:"', () => {
                        decorate.page.scheduleChange.hourGetValue({
                            name: 'Не учитывать нарушения менее чем на:',
                            value: data.weekly2.setting.less.hour,
                            timeout: entry.max
                        });
                        decorate.page.scheduleChange.minuteGetValue({
                            name: 'Не учитывать нарушения менее чем на:',
                            value: data.weekly2.setting.less.minute,
                            timeout: entry.max
                        });
                    });

                    describe('Проверка "Не считать нарушением, разрешить уход раньше не более чем на:"', () => {
                        decorate.page.scheduleChange.hourGetValue({
                            name: 'Не считать нарушением, разрешить уход раньше не более чем на:',
                            value: data.weekly2.setting.early.hour,
                            timeout: entry.max
                        });
                        decorate.page.scheduleChange.minuteGetValue({
                            name: 'Не считать нарушением, разрешить уход раньше не более чем на:',
                            value: data.weekly2.setting.early.minute,
                            timeout: entry.max
                        });
                    });

                    describe('Проверка "Не учитывать переработку менее чем на:"', () => {
                        decorate.page.scheduleChange.hourGetValue({
                            name: 'Не учитывать переработку менее чем на:',
                            value: data.weekly2.setting.overtime.hour,
                            timeout: entry.max
                        });
                        decorate.page.scheduleChange.minuteGetValue({
                            name: 'Не учитывать переработку менее чем на:',
                            value: data.weekly2.setting.overtime.minute,
                            timeout: entry.max
                        });
                    });

                });
            });
        });
    });

    const editShiftInvalidParams = () => describe('Персонал / Графики работы. Попытка редактирования сменного графика' +
        ' c невалидной настрйкой интервалов.', () => {

        bef();
        aft();

        describe('Открытие на редактирование', () => {
            decorate.el.table.strHandler({
                strNumber: 1,
                timeout: entry.max
            });
            decorate.el.butIcBefore.handler({
                icon: but.edit,
                timeout: entry.max
            });
            decorate.page.scheduleChange.initEdit({
                timeout: entry.max
            });
        });

        describe('Открытие настроек "Интервалы"', () => {
            decorate.el.simpleCell.handler({
                name: 'Интервалы',
                timeout: entry.max
            });
            decorate.el.simpleCell.active({
                name: 'Интервалы',
                timeout: entry.max
            });
        });

        describe('Попытка редактирования без конца смены', () => {
            decorate.page.scheduleChange.selectTypeInterval({
                numInterval: 1,
                numTime: 1,
                value: 'Начало смены',
                timeout: entry.max
            });
            decorate.el.button.handler({
                name: 'Сохранить изменения',
                timeout: entry.max
            });
            decorate.el.error.error({
                text: 'Началу смены не сопоставлен конец смены',
                timeout: entry.max
            });
        });

        describe('Попытка редактирования без начала смены', () => {
            decorate.page.scheduleChange.selectTypeInterval({
                numInterval: 1,
                numTime: 1,
                value: 'Конец смены',
                timeout: entry.max
            });
            decorate.el.button.handler({
                name: 'Сохранить изменения',
                timeout: entry.max
            });
            decorate.el.error.error({
                text: 'Началу смены не сопоставлен конец смены',
                timeout: entry.max
            });
        });

        describe('Попытка редактирования без начала и конца смены', () => {
            decorate.page.scheduleChange.selectTypeInterval({
                numInterval: 1,
                numTime: 1,
                value: 'Промежуточный интервал',
                timeout: entry.max
            });
            decorate.el.button.handler({
                name: 'Сохранить изменения',
                timeout: entry.max
            });
            decorate.el.error.error({
                text: 'Некоторые интервалы заданы неправильно (отмечены красным). Наведите курсор на ' +
                    'интервал для просмотра информации об ошибке',
                timeout: entry.max
            });
        });
    });

    const addShiftNoParams = () => describe('Персонал / Графики работы. Попытка добавления сменного графика ' +
        'без помещения и интервалов.', () => {

        bef();
        aft();

        describe('Открытие на добавление', () => {
            decorate.el.butIcBefore.handler({
                icon: but.add,
                timeout: entry.max
            });
            decorate.page.scheduleChange.initAdd({
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
            decorate.el.select.iconXpand({
                title: 'Тип графика',
                value: 'Недельный',
                text: 'Сменный',
                timeout: entry.max
            });
        });

        describe('Попытка добавления без помещения', () => {
            decorate.el.button.handler({
                name: 'Сохранить изменения',
                timeout: entry.max
            });
            decorate.el.error.error({
                text: 'Должны быть заданы параметры хотя бы для одного помещения',
                timeout: entry.max
            });
        });

        describe('Попытка добавления без интервалов', () => {
            decorate.page.scheduleChange.checkboxWorkHandler({
                name: data.weekly2.rooms.room1.name,
                timeout: entry.max
            });
            decorate.el.button.handler({
                name: 'Сохранить изменения',
                timeout: entry.max
            });
            decorate.el.error.error({
                text: 'В графике работы обязательно должны присутствовать временные интервалы.',
                timeout: entry.max
            });
        });
    });

    const copyShift = () => describe('Персонал / Графики работы. Копирование сменного графика работы.', () => {

        describe('Копирование', () => {
            bef();
            aft();

            decorate.el.table.strHandler({
                strNumber: 1,
                timeout: entry.max
            });
            decorate.el.butIcBefore.handler({
                icon: but.copy,
                timeout: entry.max
            });
            decorate.page.scheduleChange.initCopy({
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

        describe('Проверка', () => {
            bef();
            aft();

            describe('Проверка таблицы', () => {
                decorate.el.table.size({
                    strCount: 2,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Название',
                    strNumber: 1,
                    cellNumber: 1,
                    value: data.shift2.name + ' (Копия)',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Тип графика',
                    strNumber: 1,
                    cellNumber: 2,
                    value: 'Сменный',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Описание',
                    strNumber: 1,
                    cellNumber: 3,
                    value: data.shift2.description,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Примечание',
                    strNumber: 1,
                    cellNumber: 4,
                    value: '',
                    timeout: entry.max
                });
            });

            describe('Проверка параметров', () => {
                describe('Открытие на редактирование', () => {
                    decorate.el.table.strHandler({
                        strNumber: 1,
                        timeout: entry.max
                    });
                    decorate.el.butIcBefore.handler({
                        icon: but.edit,
                        timeout: entry.max
                    });
                    decorate.page.scheduleChange.initEdit({
                        timeout: entry.max
                    });
                });

                describe('Общие параметры', () => {
                    decorate.el.simpleCell.active({
                        name: 'Регистрирующие помещения',
                        timeout: entry.max
                    });
                    decorate.el.input.getValue({
                        title: 'Имя графика',
                        placeholder: '',
                        value: data.shift2.name + ' (Копия)',
                        timeout: entry.max
                    });
                    decorate.el.input.getValue({
                        title: 'Описание графика',
                        placeholder: '',
                        value: data.shift2.description,
                        timeout: entry.max
                    });
                    decorate.el.select.select({
                        title: 'Тип графика',
                        value: 'Сменный',
                        timeout: entry.max
                    });
                });

                describe('Регистрирующие помещения', () => {
                    decorate.el.simpleCell.active({
                        name: 'Регистрирующие помещения',
                        timeout: entry.max
                    });
                    decorate.page.scheduleChange.room({
                        name: data.weekly2.rooms.room1.name,
                        work: data.weekly2.rooms.room1.work,
                        noWork: data.weekly2.rooms.room1.noWork,
                        timeout: entry.max
                    });
                    decorate.page.scheduleChange.room({
                        name: data.weekly2.rooms.room2.name,
                        work: data.weekly2.rooms.room2.work,
                        noWork: data.weekly2.rooms.room2.noWork,
                        timeout: entry.max
                    });
                    decorate.page.scheduleChange.room({
                        name: data.weekly2.rooms.room3.name,
                        work: data.weekly2.rooms.room3.work,
                        noWork: data.weekly2.rooms.room3.noWork,
                        timeout: entry.max
                    });
                });

                describe('Интервалы', () => {
                    describe('Открытие настроек "Интервалы"', () => {
                        decorate.el.simpleCell.handler({
                            name: 'Интервалы',
                            timeout: entry.max
                        });
                        decorate.el.simpleCell.active({
                            name: 'Интервалы',
                            timeout: entry.max
                        });
                    });

                    describe('Проверка "День 1"', () => {
                        decorate.page.scheduleChange.intervalName({
                            numInterval: 1,
                            value: data.shift2.intervals.day1.name,
                            timeout: entry.max
                        });
                        decorate.page.scheduleChange.intervalSumTime({
                            numInterval: 1,
                            value: data.shift2.intervals.day1.time,
                            timeout: entry.max
                        });
                        decorate.page.scheduleChange.getTypeInterval({
                            numInterval: 1,
                            numTime: 1,
                            value: 'Полная смена',
                            timeout: entry.max
                        });
                        decorate.page.scheduleChange.startTimeGetValue({
                            numInterval: 1,
                            numTime: 1,
                            value: data.shift2.intervals.day1.interval1.begin,
                            timeout: entry.max
                        });
                    });

                    describe('Проверка "День 2"', () => {
                        decorate.page.scheduleChange.intervalName({
                            numInterval: 2,
                            value:data.shift2.intervals.day2.name,
                            timeout: entry.max
                        });
                        decorate.page.scheduleChange.intervalSumTime({
                            numInterval: 2,
                            value: data.shift2.intervals.day2.time,
                            timeout: entry.max
                        });
                        decorate.page.scheduleChange.getTypeInterval({
                            numInterval: 2,
                            numTime: 1,
                            value: 'Полная смена',
                            timeout: entry.max
                        });
                        decorate.page.scheduleChange.endTimeGetValue({
                            numInterval: 2,
                            numTime: 1,
                            value: data.shift2.intervals.day2.interval1.end,
                            timeout: entry.max
                        });
                    });

                    describe('Изменение "День 3"', () => {
                        decorate.page.scheduleChange.intervalName({
                            numInterval: 3,
                            value:data.shift2.intervals.day3.name,
                            timeout: entry.max
                        });
                        decorate.page.scheduleChange.intervalSumTime({
                            numInterval: 3,
                            value: data.shift2.intervals.day3.time,
                            timeout: entry.max
                        });

                        decorate.page.scheduleChange.getTypeInterval({
                            numInterval: 3,
                            numTime: 1,
                            value: 'Начало смены',
                            timeout: entry.max
                        });
                        decorate.page.scheduleChange.startTimeGetValue({
                            numInterval: 3,
                            numTime: 1,
                            value: data.shift2.intervals.day3.interval1.begin,
                            timeout: entry.max
                        });
                        decorate.page.scheduleChange.endTimeSendKeys({
                            numInterval: 3,
                            numTime: 1,
                            value: data.shift2.intervals.day3.interval1.end,
                            timeout: entry.max
                        });

                        decorate.page.scheduleChange.getTypeInterval({
                            numInterval: 3,
                            numTime: 2,
                            value: 'Конец смены',
                            timeout: entry.max
                        });
                        decorate.page.scheduleChange.startTimeGetValue({
                            numInterval: 3,
                            numTime: 2,
                            value: data.shift2.intervals.day3.interval2.begin,
                            timeout: entry.max
                        });
                        decorate.page.scheduleChange.endTimeSendKeys({
                            numInterval: 3,
                            numTime: 1,
                            value: data.shift2.intervals.day3.interval2.end,
                            timeout: entry.max
                        });
                    });

                    describe('Проверка "День 4"', () => {
                        decorate.page.scheduleChange.intervalName({
                            numInterval: 4,
                            value:data.shift2.intervals.day4.name,
                            timeout: entry.max
                        });
                        decorate.page.scheduleChange.intervalSumTime({
                            numInterval: 4,
                            value: data.shift2.intervals.day4.time,
                            timeout: entry.max
                        });
                        decorate.page.scheduleChange.noTimeInterval({
                            numInterval: 4,
                            timeout: entry.max
                        });
                    });

                });

                describe('Настройки отчетов', () => {
                    describe('Открытие настроек "Настройки отчетов"', () => {
                        decorate.el.simpleCell.handler({
                            name: 'Настройки отчетов',
                            timeout: entry.max
                        });
                        decorate.el.simpleCell.active({
                            name: 'Настройки отчетов',
                            timeout: entry.max
                        });
                    });

                    describe('Проверка "Учитывать только первый вход и последний выход"', () => {
                        decorate.el.checkbox.checked({
                            name: 'Учитывать только первый вход и последний выход',
                            timeout: entry.max
                        });
                    });

                    describe('Проверка "Не считать нарушением, разрешить опоздание не более чем на:"', () => {
                        decorate.page.scheduleChange.hourGetValue({
                            name: 'Не считать нарушением, разрешить опоздание не более чем на:',
                            value: data.weekly2.setting.arrival.hour,
                            timeout: entry.max
                        });
                        decorate.page.scheduleChange.minuteGetValue({
                            name: 'Не считать нарушением, разрешить опоздание не более чем на:',
                            value: data.weekly2.setting.arrival.minute,
                            timeout: entry.max
                        });
                    });

                    describe('Проверка "Не учитывать нарушения менее чем на:"', () => {
                        decorate.page.scheduleChange.hourGetValue({
                            name: 'Не учитывать нарушения менее чем на:',
                            value: data.weekly2.setting.less.hour,
                            timeout: entry.max
                        });
                        decorate.page.scheduleChange.minuteGetValue({
                            name: 'Не учитывать нарушения менее чем на:',
                            value: data.weekly2.setting.less.minute,
                            timeout: entry.max
                        });
                    });

                    describe('Проверка "Не считать нарушением, разрешить уход раньше не более чем на:"', () => {
                        decorate.page.scheduleChange.hourGetValue({
                            name: 'Не считать нарушением, разрешить уход раньше не более чем на:',
                            value: data.weekly2.setting.early.hour,
                            timeout: entry.max
                        });
                        decorate.page.scheduleChange.minuteGetValue({
                            name: 'Не считать нарушением, разрешить уход раньше не более чем на:',
                            value: data.weekly2.setting.early.minute,
                            timeout: entry.max
                        });
                    });

                    describe('Проверка "Не учитывать переработку менее чем на:"', () => {
                        decorate.page.scheduleChange.hourGetValue({
                            name: 'Не учитывать переработку менее чем на:',
                            value: data.weekly2.setting.overtime.hour,
                            timeout: entry.max
                        });
                        decorate.page.scheduleChange.minuteGetValue({
                            name: 'Не учитывать переработку менее чем на:',
                            value: data.weekly2.setting.overtime.minute,
                            timeout: entry.max
                        });
                    });

                });
            });
        });
    });

    const addAttendance = () => describe('Персонал / Графики работы. Добавление графика по присутствию.', () => {

        describe('Добавление', () => {
            bef();
            aft();

            describe('Открытие на добавление', () => {
                decorate.el.butIcBefore.handler({
                    icon: but.add,
                    timeout: entry.max
                });
                decorate.page.scheduleChange.initAdd({
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
            });

            describe('Общие параметры', () => {
                decorate.el.simpleCell.active({
                    name: 'Регистрирующие помещения',
                    timeout: entry.max
                });
                decorate.el.input.backSpace({
                    title: 'Имя графика',
                    placeholder: '',
                    timeout: entry.max
                });
                decorate.el.input.sendKeys({
                    title: 'Имя графика',
                    placeholder: '',
                    value: data.attendance1.name,
                    timeout: entry.max
                });
                decorate.el.input.sendKeys({
                    title: 'Описание графика',
                    placeholder: '',
                    value: data.attendance1.description,
                    timeout: entry.max
                });
                decorate.el.select.iconXpand({
                    title: 'Тип графика',
                    value: 'Недельный',
                    text: 'По присутствию',
                    timeout: entry.max
                });
            });

            describe('Регистрирующие помещения', () => {
                decorate.el.simpleCell.active({
                    name: 'Регистрирующие помещения',
                    timeout: entry.max
                });
                decorate.page.scheduleChange.checkboxNoWorkHandler({
                    name: data.attendance1.rooms.room1.name,
                    timeout: entry.max
                });
                decorate.page.scheduleChange.checkboxWorkHandler({
                    name: data.attendance1.rooms.room2.name,
                    timeout: entry.max
                });
                decorate.page.scheduleChange.checkboxNoWorkHandler({
                    name: data.attendance1.rooms.room3.name,
                    timeout: entry.max
                });
            });

            describe('Сохранение', () => {
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

        describe('Проверка', () => {
            bef();
            aft();

            describe('Проверка таблицы', () => {
                decorate.el.table.size({
                    strCount: 1,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Название',
                    strNumber: 1,
                    cellNumber: 1,
                    value: data.attendance1.name,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Тип графика',
                    strNumber: 1,
                    cellNumber: 2,
                    value: 'По присутствию',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Описание',
                    strNumber: 1,
                    cellNumber: 3,
                    value: data.attendance1.description,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Примечание',
                    strNumber: 1,
                    cellNumber: 4,
                    value: '',
                    timeout: entry.max
                });
            });

            describe('Проверка параметров', () => {
                describe('Открытие на редактирование', () => {
                    decorate.el.table.strHandler({
                        strNumber: 1,
                        timeout: entry.max
                    });
                    decorate.el.butIcBefore.handler({
                        icon: but.edit,
                        timeout: entry.max
                    });
                    decorate.page.scheduleChange.initEdit({
                        timeout: entry.max
                    });
                });

                describe('Общие параметры', () => {
                    decorate.el.simpleCell.active({
                        name: 'Регистрирующие помещения',
                        timeout: entry.max
                    });
                    decorate.el.input.getValue({
                        title: 'Имя графика',
                        placeholder: '',
                        value: data.attendance1.name,
                        timeout: entry.max
                    });
                    decorate.el.input.getValue({
                        title: 'Описание графика',
                        placeholder: '',
                        value: data.attendance1.description,
                        timeout: entry.max
                    });
                    decorate.el.select.select({
                        title: 'Тип графика',
                        value: 'По присутствию',
                        timeout: entry.max
                    });
                });

                describe('Регистрирующие помещения', () => {
                    decorate.el.simpleCell.active({
                        name: 'Регистрирующие помещения',
                        timeout: entry.max
                    });
                    decorate.page.scheduleChange.room({
                        name: data.attendance1.rooms.room1.name,
                        work: data.attendance1.rooms.room1.work,
                        noWork: data.attendance1.rooms.room1.noWork,
                        timeout: entry.max
                    });
                    decorate.page.scheduleChange.room({
                        name: data.attendance1.rooms.room2.name,
                        work: data.attendance1.rooms.room2.work,
                        noWork: data.attendance1.rooms.room2.noWork,
                        timeout: entry.max
                    });
                    decorate.page.scheduleChange.room({
                        name: data.attendance1.rooms.room3.name,
                        work: data.attendance1.rooms.room3.work,
                        noWork: data.attendance1.rooms.room3.noWork,
                        timeout: entry.max
                    });
                });

                describe('Настройки отчетов', () => {
                    describe('Открытие настроек "Настройки отчетов"', () => {
                        decorate.el.simpleCell.handler({
                            name: 'Настройки отчетов',
                            timeout: entry.max
                        });
                        decorate.el.simpleCell.active({
                            name: 'Настройки отчетов',
                            timeout: entry.max
                        });
                    });

                    describe('Проверка "Учитывать только первый вход и последний выход"', () => {
                        decorate.el.checkbox.unchecked({
                            name: 'Учитывать только первый вход и последний выход',
                            timeout: entry.max
                        });
                    });

                });
            });
        });
    });

    const editAttendance = () => describe('Персонал / Графики работы. Редактирование графика по присутствию.', () => {

        describe('Редактирование', () => {
            bef();
            aft();

            describe('Открытие на редактирование', () => {
                decorate.el.table.strHandler({
                    strNumber: 1,
                    timeout: entry.max
                });
                decorate.el.butIcBefore.handler({
                    icon: but.edit,
                    timeout: entry.max
                });
                decorate.page.scheduleChange.initEdit({
                    timeout: entry.max
                });
            });

            describe('Общие параметры', () => {
                decorate.el.simpleCell.active({
                    name: 'Регистрирующие помещения',
                    timeout: entry.max
                });
                decorate.el.input.backSpace({
                    title: 'Имя графика',
                    placeholder: '',
                    timeout: entry.max
                });
                decorate.el.input.sendKeys({
                    title: 'Имя графика',
                    placeholder: '',
                    value: data.attendance2.name,
                    timeout: entry.max
                });
                decorate.el.input.backSpace({
                    title: 'Описание графика',
                    placeholder: '',
                    timeout: entry.max
                });
                decorate.el.input.sendKeys({
                    title: 'Описание графика',
                    placeholder: '',
                    value: data.attendance2.description,
                    timeout: entry.max
                });
                decorate.el.select.select({
                    title: 'Тип графика',
                    value: 'По присутствию',
                    timeout: entry.max
                });
            });

            describe('Регистрирующие помещения', () => {
                decorate.el.simpleCell.active({
                    name: 'Регистрирующие помещения',
                    timeout: entry.max
                });
                decorate.page.scheduleChange.checkboxWorkHandler({
                    name: data.attendance2.rooms.room1.name,
                    timeout: entry.max
                });
                decorate.page.scheduleChange.checkboxNoWorkHandler({
                    name: data.attendance2.rooms.room2.name,
                    timeout: entry.max
                });
                decorate.page.scheduleChange.checkboxWorkHandler({
                    name: data.attendance2.rooms.room3.name,
                    timeout: entry.max
                });
            });

            describe('Настройки отчетов', () => {
                describe('Открытие настроек "Настройки отчетов"', () => {
                    decorate.el.simpleCell.handler({
                        name: 'Настройки отчетов',
                        timeout: entry.max
                    });
                    decorate.el.simpleCell.active({
                        name: 'Настройки отчетов',
                        timeout: entry.max
                    });
                });

                describe('Изменение "Учитывать только первый вход и последний выход"', () => {
                    decorate.el.checkbox.handler({
                        name: 'Учитывать только первый вход и последний выход',
                        timeout: entry.max
                    });
                });
            });

            describe('Сохранение', () => {
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

        describe('Проверка', () => {
            bef();
            aft();

            describe('Проверка таблицы', () => {
                decorate.el.table.size({
                    strCount: 1,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Название',
                    strNumber: 1,
                    cellNumber: 1,
                    value: data.attendance2.name,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Тип графика',
                    strNumber: 1,
                    cellNumber: 2,
                    value: 'По присутствию',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Описание',
                    strNumber: 1,
                    cellNumber: 3,
                    value: data.attendance2.description,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Примечание',
                    strNumber: 1,
                    cellNumber: 4,
                    value: '',
                    timeout: entry.max
                });
            });

            describe('Проверка параметров', () => {
                describe('Открытие на редактирование', () => {
                    decorate.el.table.strHandler({
                        strNumber: 1,
                        timeout: entry.max
                    });
                    decorate.el.butIcBefore.handler({
                        icon: but.edit,
                        timeout: entry.max
                    });
                    decorate.page.scheduleChange.initEdit({
                        timeout: entry.max
                    });
                });

                describe('Общие параметры', () => {
                    decorate.el.simpleCell.active({
                        name: 'Регистрирующие помещения',
                        timeout: entry.max
                    });
                    decorate.el.input.getValue({
                        title: 'Имя графика',
                        placeholder: '',
                        value: data.attendance2.name,
                        timeout: entry.max
                    });
                    decorate.el.input.getValue({
                        title: 'Описание графика',
                        placeholder: '',
                        value: data.attendance2.description,
                        timeout: entry.max
                    });
                    decorate.el.select.select({
                        title: 'Тип графика',
                        value: 'По присутствию',
                        timeout: entry.max
                    });
                });

                describe('Регистрирующие помещения', () => {
                    decorate.el.simpleCell.active({
                        name: 'Регистрирующие помещения',
                        timeout: entry.max
                    });
                    decorate.page.scheduleChange.room({
                        name: data.attendance2.rooms.room1.name,
                        work: data.attendance2.rooms.room1.work,
                        noWork: data.attendance2.rooms.room1.noWork,
                        timeout: entry.max
                    });
                    decorate.page.scheduleChange.room({
                        name: data.attendance2.rooms.room2.name,
                        work: data.attendance2.rooms.room2.work,
                        noWork: data.attendance2.rooms.room2.noWork,
                        timeout: entry.max
                    });
                    decorate.page.scheduleChange.room({
                        name: data.attendance2.rooms.room3.name,
                        work: data.attendance2.rooms.room3.work,
                        noWork: data.attendance2.rooms.room3.noWork,
                        timeout: entry.max
                    });
                });

                describe('Настройки отчетов', () => {
                    describe('Открытие настроек "Настройки отчетов"', () => {
                        decorate.el.simpleCell.handler({
                            name: 'Настройки отчетов',
                            timeout: entry.max
                        });
                        decorate.el.simpleCell.active({
                            name: 'Настройки отчетов',
                            timeout: entry.max
                        });
                    });

                    describe('Проверка "Учитывать только первый вход и последний выход"', () => {
                        decorate.el.checkbox.checked({
                            name: 'Учитывать только первый вход и последний выход',
                            timeout: entry.max
                        });
                    });

                });
            });
        });
    });

    const copyAttendance = () => describe('Персонал / Графики работы. Копирование графика по присутствию.', () => {

        describe('Копирование', () => {
            bef();
            aft();

            decorate.el.table.strHandler({
                strNumber: 1,
                timeout: entry.max
            });
            decorate.el.butIcBefore.handler({
                icon: but.copy,
                timeout: entry.max
            });
            decorate.page.scheduleChange.initCopy({
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

        describe('Проверка', () => {
            bef();
            aft();

            describe('Проверка таблицы', () => {
                decorate.el.table.size({
                    strCount: 2,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Название',
                    strNumber: 1,
                    cellNumber: 1,
                    value: data.attendance2.name + ' (Копия)',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Тип графика',
                    strNumber: 1,
                    cellNumber: 2,
                    value: 'По присутствию',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Описание',
                    strNumber: 1,
                    cellNumber: 3,
                    value: data.attendance2.description,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Примечание',
                    strNumber: 1,
                    cellNumber: 4,
                    value: '',
                    timeout: entry.max
                });
            });

            describe('Проверка параметров', () => {
                describe('Открытие на редактирование', () => {
                    decorate.el.table.strHandler({
                        strNumber: 1,
                        timeout: entry.max
                    });
                    decorate.el.butIcBefore.handler({
                        icon: but.edit,
                        timeout: entry.max
                    });
                    decorate.page.scheduleChange.initEdit({
                        timeout: entry.max
                    });
                });

                describe('Общие параметры', () => {
                    decorate.el.simpleCell.active({
                        name: 'Регистрирующие помещения',
                        timeout: entry.max
                    });
                    decorate.el.input.getValue({
                        title: 'Имя графика',
                        placeholder: '',
                        value: data.attendance2.name + ' (Копия)',
                        timeout: entry.max
                    });
                    decorate.el.input.getValue({
                        title: 'Описание графика',
                        placeholder: '',
                        value: data.attendance2.description,
                        timeout: entry.max
                    });
                    decorate.el.select.select({
                        title: 'Тип графика',
                        value: 'По присутствию',
                        timeout: entry.max
                    });
                });

                describe('Регистрирующие помещения', () => {
                    decorate.el.simpleCell.active({
                        name: 'Регистрирующие помещения',
                        timeout: entry.max
                    });
                    decorate.page.scheduleChange.room({
                        name: data.attendance2.rooms.room1.name,
                        work: data.attendance2.rooms.room1.work,
                        noWork: data.attendance2.rooms.room1.noWork,
                        timeout: entry.max
                    });
                    decorate.page.scheduleChange.room({
                        name: data.attendance2.rooms.room2.name,
                        work: data.attendance2.rooms.room2.work,
                        noWork: data.attendance2.rooms.room2.noWork,
                        timeout: entry.max
                    });
                    decorate.page.scheduleChange.room({
                        name: data.attendance2.rooms.room3.name,
                        work: data.attendance2.rooms.room3.work,
                        noWork: data.attendance2.rooms.room3.noWork,
                        timeout: entry.max
                    });
                });

                describe('Настройки отчетов', () => {
                    describe('Открытие настроек "Настройки отчетов"', () => {
                        decorate.el.simpleCell.handler({
                            name: 'Настройки отчетов',
                            timeout: entry.max
                        });
                        decorate.el.simpleCell.active({
                            name: 'Настройки отчетов',
                            timeout: entry.max
                        });
                    });

                    describe('Проверка "Учитывать только первый вход и последний выход"', () => {
                        decorate.el.checkbox.checked({
                            name: 'Учитывать только первый вход и последний выход',
                            timeout: entry.max
                        });
                    });

                });
            });
        });
    });

    const addDuplicateAttendance = () => describe('Персонал / Графики работы. Попытка добавление графика c дублирующем'+
        ' названием.', () => {

        describe('Добавление', () => {
            bef();
            aft();

            describe('Открытие на добавление', () => {
                decorate.el.butIcBefore.handler({
                    icon: but.add,
                    timeout: entry.max
                });
                decorate.page.scheduleChange.initAdd({
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
            });

            describe('Общие параметры', () => {
                decorate.el.simpleCell.active({
                    name: 'Регистрирующие помещения',
                    timeout: entry.max
                });
                decorate.el.input.backSpace({
                    title: 'Имя графика',
                    placeholder: '',
                    timeout: entry.max
                });
                decorate.el.input.sendKeys({
                    title: 'Имя графика',
                    placeholder: '',
                    value: data.attendance2.name,
                    timeout: entry.max
                });
                decorate.el.input.sendKeys({
                    title: 'Описание графика',
                    placeholder: '',
                    value: data.attendance1.description,
                    timeout: entry.max
                });
                decorate.el.select.iconXpand({
                    title: 'Тип графика',
                    value: 'Недельный',
                    text: 'По присутствию',
                    timeout: entry.max
                });
            });

            describe('Регистрирующие помещения', () => {
                decorate.el.simpleCell.active({
                    name: 'Регистрирующие помещения',
                    timeout: entry.max
                });
                decorate.page.scheduleChange.checkboxNoWorkHandler({
                    name: data.attendance1.rooms.room1.name,
                    timeout: entry.max
                });
                decorate.page.scheduleChange.checkboxWorkHandler({
                    name: data.attendance1.rooms.room2.name,
                    timeout: entry.max
                });
                decorate.page.scheduleChange.checkboxNoWorkHandler({
                    name: data.attendance1.rooms.room3.name,
                    timeout: entry.max
                });
            });

            describe('Сохранение', () => {
                decorate.el.button.handler({
                    name: 'Сохранить изменения',
                    timeout: entry.max
                });
                decorate.el.error.error({
                    text: 'Такое название уже используется',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
            });
        });
    });

    const editViolation = () => describe('Персонал / Графики работы. Редактирование графика с накоплением ' +
        'нарушений', () => {

        describe('API добавление графика работы c накоплением нарушений', () => {
            bef();
            aft();

            it(`Добавление графика работы "${data.violation1.name}"`, async () => {
                const cook = await page.base.getCookie('token');
                await dec.simple(api.putSchedule,
                    [[data.violation1.db], cook.text],
                    api.putSchedule);
            });
        });

        describe('Редактирование', () => {
            bef();
            aft();

            describe('Открытие на редактирование', () => {
                decorate.el.table.strHandler({
                    strNumber: 1,
                    timeout: entry.max
                });
                decorate.el.butIcBefore.handler({
                    icon: but.edit,
                    timeout: entry.max
                });
                decorate.page.scheduleChange.initEdit({
                    timeout: entry.max
                });
            });

            describe('Общие параметры', () => {
                decorate.el.simpleCell.active({
                    name: 'Регистрирующие помещения',
                    timeout: entry.max
                });
                decorate.el.input.backSpace({
                    title: 'Имя графика',
                    placeholder: '',
                    timeout: entry.max
                });
                decorate.el.input.sendKeys({
                    title: 'Имя графика',
                    placeholder: '',
                    value: data.violation2.name,
                    timeout: entry.max
                });
                decorate.el.input.backSpace({
                    title: 'Описание графика',
                    placeholder: '',
                    timeout: entry.max
                });
                decorate.el.input.sendKeys({
                    title: 'Описание графика',
                    placeholder: '',
                    value: data.violation2.description,
                    timeout: entry.max
                });
                decorate.el.select.select({
                    title: 'Тип графика',
                    value: 'С накоплением нарушений',
                    timeout: entry.max
                });
            });

            describe('Регистрирующие помещения', () => {
                decorate.el.simpleCell.active({
                    name: 'Регистрирующие помещения',
                    timeout: entry.max
                });
                decorate.page.scheduleChange.checkboxWorkHandler({
                    name: data.weekly2.rooms.room1.name,
                    timeout: entry.max
                });
                decorate.page.scheduleChange.checkboxNoWorkHandler({
                    name: data.weekly2.rooms.room2.name,
                    timeout: entry.max
                });
                decorate.page.scheduleChange.checkboxWorkHandler({
                    name: data.weekly2.rooms.room3.name,
                    timeout: entry.max
                });
            });

            describe('Интервалы', () => {
                describe('Открытие настроек "Интервалы"', () => {
                    decorate.el.simpleCell.handler({
                        name: 'Интервалы',
                        timeout: entry.max
                    });
                    decorate.el.simpleCell.active({
                        name: 'Интервалы',
                        timeout: entry.max
                    });
                });

                describe('Изменение "Понедельник"', () => {
                    decorate.page.scheduleChange.timeRemove({
                        numInterval: 1,
                        numTime: 4,
                        timeout: entry.max
                    });
                    decorate.page.scheduleChange.timeRemove({
                        numInterval: 1,
                        numTime: 1,
                        timeout: entry.max
                    });

                    decorate.page.scheduleChange.selectTypeInterval({
                        numInterval: 1,
                        numTime: 1,
                        value: 'Начало смены',
                        timeout: entry.max
                    });
                    decorate.page.scheduleChange.startTimeSendKeys({
                        numInterval: 1,
                        numTime: 1,
                        value: data.violation2.intervals.day1.interval1.begin,
                        timeout: entry.max
                    });
                    decorate.page.scheduleChange.endTimeSendKeys({
                        numInterval: 1,
                        numTime: 1,
                        value: data.violation2.intervals.day1.interval1.end,
                        timeout: entry.max
                    });

                    decorate.page.scheduleChange.selectTypeInterval({
                        numInterval: 1,
                        numTime: 2,
                        value: 'Конец смены',
                        timeout: entry.max
                    });
                    decorate.page.scheduleChange.endTimeSendKeys({
                        numInterval: 1,
                        numTime: 2,
                        value: data.violation2.intervals.day1.interval2.end,
                        timeout: entry.max
                    });
                    decorate.page.scheduleChange.startTimeSendKeys({
                        numInterval: 1,
                        numTime: 2,
                        value: data.violation2.intervals.day1.interval2.begin,
                        timeout: entry.max
                    });
                });

                describe('Изменение "Вторник"', () => {
                    decorate.page.scheduleChange.timeRemove({
                        numInterval: 2,
                        numTime: 4,
                        timeout: entry.max
                    });
                    decorate.page.scheduleChange.timeRemove({
                        numInterval: 2,
                        numTime: 3,
                        timeout: entry.max
                    });
                    decorate.page.scheduleChange.timeRemove({
                        numInterval: 2,
                        numTime: 2,
                        timeout: entry.max
                    });
                    decorate.page.scheduleChange.timeRemove({
                        numInterval: 2,
                        numTime: 1,
                        timeout: entry.max
                    });
                });

                describe('Изменение "Среда"', () => {
                    decorate.page.scheduleChange.timeRemove({
                        numInterval: 3,
                        numTime: 2,
                        timeout: entry.max
                    });

                    decorate.page.scheduleChange.startTimeSendKeys({
                        numInterval: 3,
                        numTime: 1,
                        value: data.violation2.intervals.day3.interval1.begin,
                        timeout: entry.max
                    });
                    decorate.page.scheduleChange.endTimeSendKeys({
                        numInterval: 3,
                        numTime: 1,
                        value: data.violation2.intervals.day3.interval1.end,
                        timeout: entry.max
                    });

                    decorate.page.scheduleChange.endTimeSendKeys({
                        numInterval: 3,
                        numTime: 3,
                        value: data.violation2.intervals.day3.interval3.end,
                        timeout: entry.max
                    });
                    decorate.page.scheduleChange.startTimeSendKeys({
                        numInterval: 3,
                        numTime: 3,
                        value: data.violation2.intervals.day3.interval3.begin,
                        timeout: entry.max
                    });

                    decorate.page.scheduleChange.startTimeSendKeys({
                        numInterval: 3,
                        numTime: 2,
                        value: data.violation2.intervals.day3.interval2.begin,
                        timeout: entry.max
                    });
                    decorate.page.scheduleChange.endTimeSendKeys({
                        numInterval: 3,
                        numTime: 2,
                        value: data.violation2.intervals.day3.interval2.end,
                        timeout: entry.max
                    });
                });

                describe('Изменение "Четверг"', () => {
                    decorate.page.scheduleChange.timeRemove({
                        numInterval: 4,
                        numTime: 4,
                        timeout: entry.max
                    });
                    decorate.page.scheduleChange.timeRemove({
                        numInterval: 4,
                        numTime: 3,
                        timeout: entry.max
                    });
                    decorate.page.scheduleChange.timeRemove({
                        numInterval: 4,
                        numTime: 2,
                        timeout: entry.max
                    });
                    decorate.page.scheduleChange.timeRemove({
                        numInterval: 4,
                        numTime: 1,
                        timeout: entry.max
                    });
                });

                describe('Изменение "Пятница"', () => {
                    decorate.page.scheduleChange.startTimeSendKeys({
                        numInterval: 5,
                        numTime: 1,
                        value: data.violation2.intervals.day5.interval1.begin,
                        timeout: entry.max
                    });
                    decorate.page.scheduleChange.endTimeSendKeys({
                        numInterval: 5,
                        numTime: 1,
                        value: data.violation2.intervals.day5.interval1.end,
                        timeout: entry.max
                    });

                    decorate.page.scheduleChange.endTimeSendKeys({
                        numInterval: 5,
                        numTime: 4,
                        value: data.violation2.intervals.day5.interval4.end,
                        timeout: entry.max
                    });
                    decorate.page.scheduleChange.startTimeSendKeys({
                        numInterval: 5,
                        numTime: 4,
                        value: data.violation2.intervals.day5.interval4.begin,
                        timeout: entry.max
                    });

                    decorate.page.scheduleChange.startTimeSendKeys({
                        numInterval: 5,
                        numTime: 2,
                        value: data.violation2.intervals.day5.interval2.begin,
                        timeout: entry.max
                    });
                    decorate.page.scheduleChange.endTimeSendKeys({
                        numInterval: 5,
                        numTime: 2,
                        value: data.violation2.intervals.day5.interval2.end,
                        timeout: entry.max
                    });


                    decorate.page.scheduleChange.startTimeSendKeys({
                        numInterval: 5,
                        numTime: 3,
                        value: data.violation2.intervals.day5.interval3.begin,
                        timeout: entry.max
                    });
                    decorate.page.scheduleChange.endTimeSendKeys({
                        numInterval: 5,
                        numTime: 3,
                        value: data.violation2.intervals.day5.interval3.end,
                        timeout: entry.max
                    });


                });

                describe('Изменение "Суббота"', () => {
                    decorate.page.scheduleChange.timeRemove({
                        numInterval: 6,
                        numTime: 1,
                        timeout: entry.max
                    });
                    decorate.page.scheduleChange.timeRemove({
                        numInterval: 6,
                        numTime: 3,
                        timeout: entry.max
                    });

                    decorate.page.scheduleChange.selectTypeInterval({
                        numInterval: 6,
                        numTime: 1,
                        value: 'Начало смены',
                        timeout: entry.max
                    });
                    decorate.page.scheduleChange.startTimeSendKeys({
                        numInterval: 6,
                        numTime: 1,
                        value: data.violation2.intervals.day6.interval1.begin,
                        timeout: entry.max
                    });
                    decorate.page.scheduleChange.endTimeSendKeys({
                        numInterval: 6,
                        numTime: 1,
                        value: data.violation2.intervals.day6.interval1.end,
                        timeout: entry.max
                    });

                    decorate.page.scheduleChange.selectTypeInterval({
                        numInterval: 6,
                        numTime: 2,
                        value: 'Конец смены',
                        timeout: entry.max
                    });
                    decorate.page.scheduleChange.endTimeSendKeys({
                        numInterval: 6,
                        numTime: 2,
                        value: data.violation2.intervals.day6.interval2.end,
                        timeout: entry.max
                    });
                    decorate.page.scheduleChange.startTimeSendKeys({
                        numInterval: 6,
                        numTime: 2,
                        value: data.violation2.intervals.day6.interval2.begin,
                        timeout: entry.max
                    });
                });

                describe('Изменение "Воскресенье"', () => {
                    decorate.page.scheduleChange.scrollTop({
                        scroll: 500,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.page.scheduleChange.timeRemove({
                        numInterval: 7,
                        numTime: 2,
                        timeout: entry.max
                    });

                    decorate.page.scheduleChange.startTimeSendKeys({
                        numInterval: 7,
                        numTime: 1,
                        value: data.violation2.intervals.day7.interval1.begin,
                        timeout: entry.max
                    });
                    decorate.page.scheduleChange.endTimeSendKeys({
                        numInterval: 7,
                        numTime: 1,
                        value: data.violation2.intervals.day7.interval1.end,
                        timeout: entry.max
                    });

                    decorate.page.scheduleChange.startTimeSendKeys({
                        numInterval: 7,
                        numTime: 2,
                        value: data.violation2.intervals.day7.interval2.begin,
                        timeout: entry.max
                    });
                    decorate.page.scheduleChange.endTimeSendKeys({
                        numInterval: 7,
                        numTime: 2,
                        value: data.violation2.intervals.day7.interval2.end,
                        timeout: entry.max
                    });

                    decorate.page.scheduleChange.endTimeSendKeys({
                        numInterval: 7,
                        numTime: 3,
                        value: data.violation2.intervals.day7.interval3.end,
                        timeout: entry.max
                    });
                    decorate.page.scheduleChange.startTimeSendKeys({
                        numInterval: 7,
                        numTime: 3,
                        value: data.violation2.intervals.day7.interval3.begin,
                        timeout: entry.max
                    });
                });
            });

            describe('Настройки отчетов', () => {
                describe('Открытие настроек "Настройки отчетов"', () => {
                    decorate.el.simpleCell.handler({
                        name: 'Настройки отчетов',
                        timeout: entry.max
                    });
                    decorate.el.simpleCell.active({
                        name: 'Настройки отчетов',
                        timeout: entry.max
                    });
                });

                describe('Изменение "Продолжительность перерывов, включая обед:"', () => {
                    decorate.page.scheduleChange.hourSendKeys({
                        name: 'Продолжительность перерывов, включая обед:',
                        value: data.violation2.setting.lunch.hour,
                        timeout: entry.max
                    });
                    decorate.page.scheduleChange.minuteSendKeys({
                        name: 'Продолжительность перерывов, включая обед:',
                        value: data.violation2.setting.lunch.minute,
                        timeout: entry.max
                    });
                });

                describe('Изменение "Не считать нарушением, разрешить опоздание не более чем на:"', () => {
                    decorate.page.scheduleChange.hourSendKeys({
                        name: 'Не считать нарушением, разрешить опоздание не более чем на:',
                        value: data.violation2.setting.arrival.hour,
                        timeout: entry.max
                    });
                    decorate.page.scheduleChange.minuteSendKeys({
                        name: 'Не считать нарушением, разрешить опоздание не более чем на:',
                        value: data.violation2.setting.arrival.minute,
                        timeout: entry.max
                    });
                });

                describe('Изменение "Не учитывать нарушения менее чем на:"', () => {
                    decorate.page.scheduleChange.hourSendKeys({
                        name: 'Не учитывать нарушения менее чем на:',
                        value: data.violation2.setting.less.hour,
                        timeout: entry.max
                    });
                    decorate.page.scheduleChange.minuteSendKeys({
                        name: 'Не учитывать нарушения менее чем на:',
                        value: data.violation2.setting.less.minute,
                        timeout: entry.max
                    });
                });

                describe('Изменение "Не считать нарушением, разрешить уход раньше не более чем на:"', () => {
                    decorate.page.scheduleChange.hourSendKeys({
                        name: 'Не считать нарушением, разрешить уход раньше не более чем на:',
                        value: data.violation2.setting.early.hour,
                        timeout: entry.max
                    });
                    decorate.page.scheduleChange.minuteSendKeys({
                        name: 'Не считать нарушением, разрешить уход раньше не более чем на:',
                        value: data.violation2.setting.early.minute,
                        timeout: entry.max
                    });
                });

                describe('Изменение "Не учитывать переработку менее чем на:"', () => {
                    decorate.page.scheduleChange.hourSendKeys({
                        name: 'Не учитывать переработку менее чем на:',
                        value: data.violation2.setting.overtime.hour,
                        timeout: entry.max
                    });
                    decorate.page.scheduleChange.minuteSendKeys({
                        name: 'Не учитывать переработку менее чем на:',
                        value: data.violation2.setting.overtime.minute,
                        timeout: entry.max
                    });
                });

            });

            describe('Сохранение', () => {
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

        describe('Проверка', () => {
            bef();
            aft();

            describe('Проверка таблицы', () => {
                decorate.el.table.size({
                    strCount: 1,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Название',
                    strNumber: 1,
                    cellNumber: 1,
                    value: data.violation2.name,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Тип графика',
                    strNumber: 1,
                    cellNumber: 2,
                    value: 'С накоплением нарушений',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Описание',
                    strNumber: 1,
                    cellNumber: 3,
                    value: data.violation2.description,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Примечание',
                    strNumber: 1,
                    cellNumber: 4,
                    value: '',
                    timeout: entry.max
                });
            });

            describe('Проверка параметров', () => {
                describe('Открытие на редактирование', () => {
                    decorate.el.table.strHandler({
                        strNumber: 1,
                        timeout: entry.max
                    });
                    decorate.el.butIcBefore.handler({
                        icon: but.edit,
                        timeout: entry.max
                    });
                    decorate.page.scheduleChange.initEdit({
                        timeout: entry.max
                    });
                });

                describe('Общие параметры', () => {
                    decorate.el.simpleCell.active({
                        name: 'Регистрирующие помещения',
                        timeout: entry.max
                    });
                    decorate.el.input.getValue({
                        title: 'Имя графика',
                        placeholder: '',
                        value: data.violation2.name,
                        timeout: entry.max
                    });
                    decorate.el.input.getValue({
                        title: 'Описание графика',
                        placeholder: '',
                        value: data.violation2.description,
                        timeout: entry.max
                    });
                    decorate.el.select.select({
                        title: 'Тип графика',
                        value: 'С накоплением нарушений',
                        timeout: entry.max
                    });
                });

                describe('Регистрирующие помещения', () => {
                    decorate.el.simpleCell.active({
                        name: 'Регистрирующие помещения',
                        timeout: entry.max
                    });
                    decorate.page.scheduleChange.room({
                        name: data.weekly2.rooms.room1.name,
                        work: data.weekly2.rooms.room1.work,
                        noWork: data.weekly2.rooms.room1.noWork,
                        timeout: entry.max
                    });
                    decorate.page.scheduleChange.room({
                        name: data.weekly2.rooms.room2.name,
                        work: data.weekly2.rooms.room2.work,
                        noWork: data.weekly2.rooms.room2.noWork,
                        timeout: entry.max
                    });
                    decorate.page.scheduleChange.room({
                        name: data.weekly2.rooms.room3.name,
                        work: data.weekly2.rooms.room3.work,
                        noWork: data.weekly2.rooms.room3.noWork,
                        timeout: entry.max
                    });
                });

                describe('Интервалы', () => {
                    describe('Открытие настроек "Интервалы"', () => {
                        decorate.el.simpleCell.handler({
                            name: 'Интервалы',
                            timeout: entry.max
                        });
                        decorate.el.simpleCell.active({
                            name: 'Интервалы',
                            timeout: entry.max
                        });
                    });

                    describe('Проверка "Понедельник"', () => {
                        decorate.page.scheduleChange.intervalName({
                            numInterval: 1,
                            value:data.violation2.intervals.day1.name,
                            timeout: entry.max
                        });
                        decorate.page.scheduleChange.intervalSumTime({
                            numInterval: 1,
                            value: data.violation2.intervals.day1.time,
                            timeout: entry.max
                        });

                        decorate.page.scheduleChange.getTypeInterval({
                            numInterval: 1,
                            numTime: 1,
                            value: 'Начало смены',
                            timeout: entry.max
                        });
                        decorate.page.scheduleChange.startTimeGetValue({
                            numInterval: 1,
                            numTime: 1,
                            value: data.violation2.intervals.day1.interval1.begin,
                            timeout: entry.max
                        });
                        decorate.page.scheduleChange.endTimeGetValue({
                            numInterval: 1,
                            numTime: 1,
                            value: data.violation2.intervals.day1.interval1.end,
                            timeout: entry.max
                        });

                        decorate.page.scheduleChange.getTypeInterval({
                            numInterval: 1,
                            numTime: 2,
                            value: 'Конец смены',
                            timeout: entry.max
                        });
                        decorate.page.scheduleChange.startTimeGetValue({
                            numInterval: 1,
                            numTime: 2,
                            value: data.violation2.intervals.day1.interval2.begin,
                            timeout: entry.max
                        });
                        decorate.page.scheduleChange.endTimeGetValue({
                            numInterval: 1,
                            numTime: 2,
                            value: data.violation2.intervals.day1.interval2.end,
                            timeout: entry.max
                        });
                    });

                    describe('Проверка "Вторник"', () => {
                        decorate.page.scheduleChange.intervalName({
                            numInterval: 2,
                            value:data.weekly2.intervals.day2.name,
                            timeout: entry.max
                        });
                        decorate.page.scheduleChange.intervalSumTime({
                            numInterval: 2,
                            value: data.violation2.intervals.day2.time,
                            timeout: entry.max
                        });
                        decorate.page.scheduleChange.noTimeInterval({
                            numInterval: 2,
                            timeout: entry.max
                        });
                    });

                    describe('Изменение "Среда"', () => {
                        decorate.page.scheduleChange.intervalName({
                            numInterval: 3,
                            value:data.weekly2.intervals.day3.name,
                            timeout: entry.max
                        });
                        decorate.page.scheduleChange.intervalSumTime({
                            numInterval: 3,
                            value: data.violation2.intervals.day3.time,
                            timeout: entry.max
                        });

                        decorate.page.scheduleChange.getTypeInterval({
                            numInterval: 3,
                            numTime: 1,
                            value: 'Начало смены',
                            timeout: entry.max
                        });
                        decorate.page.scheduleChange.startTimeSendKeys({
                            numInterval: 3,
                            numTime: 1,
                            value: data.violation2.intervals.day3.interval1.begin,
                            timeout: entry.max
                        });
                        decorate.page.scheduleChange.endTimeSendKeys({
                            numInterval: 3,
                            numTime: 1,
                            value: data.violation2.intervals.day3.interval1.end,
                            timeout: entry.max
                        });

                        decorate.page.scheduleChange.getTypeInterval({
                            numInterval: 3,
                            numTime: 2,
                            value: 'Промежуточный интервал',
                            timeout: entry.max
                        });
                        decorate.page.scheduleChange.startTimeSendKeys({
                            numInterval: 3,
                            numTime: 2,
                            value: data.violation2.intervals.day3.interval2.begin,
                            timeout: entry.max
                        });
                        decorate.page.scheduleChange.endTimeSendKeys({
                            numInterval: 3,
                            numTime: 2,
                            value: data.violation2.intervals.day3.interval2.end,
                            timeout: entry.max
                        });

                        decorate.page.scheduleChange.getTypeInterval({
                            numInterval: 3,
                            numTime: 3,
                            value: 'Конец смены',
                            timeout: entry.max
                        });
                        decorate.page.scheduleChange.startTimeSendKeys({
                            numInterval: 3,
                            numTime: 3,
                            value: data.violation2.intervals.day3.interval3.begin,
                            timeout: entry.max
                        });
                        decorate.page.scheduleChange.endTimeSendKeys({
                            numInterval: 3,
                            numTime: 3,
                            value: data.violation2.intervals.day3.interval3.end,
                            timeout: entry.max
                        });
                    });

                    describe('Проверка "Четверг"', () => {
                        decorate.page.scheduleChange.intervalName({
                            numInterval: 4,
                            value:data.weekly2.intervals.day4.name,
                            timeout: entry.max
                        });
                        decorate.page.scheduleChange.intervalSumTime({
                            numInterval: 4,
                            value: data.violation2.intervals.day4.time,
                            timeout: entry.max
                        });
                        decorate.page.scheduleChange.noTimeInterval({
                            numInterval: 4,
                            timeout: entry.max
                        });
                    });

                    describe('Проверка "Пятница"', () => {
                        decorate.page.scheduleChange.intervalName({
                            numInterval: 5,
                            value:data.violation2.intervals.day5.name,
                            timeout: entry.max
                        });
                        decorate.page.scheduleChange.intervalSumTime({
                            numInterval: 5,
                            value: data.violation2.intervals.day5.time,
                            timeout: entry.max
                        });

                        decorate.page.scheduleChange.getTypeInterval({
                            numInterval: 5,
                            numTime: 1,
                            value: 'Начало смены',
                            timeout: entry.max
                        });
                        decorate.page.scheduleChange.startTimeGetValue({
                            numInterval: 5,
                            numTime: 1,
                            value: data.violation2.intervals.day5.interval1.begin,
                            timeout: entry.max
                        });
                        decorate.page.scheduleChange.endTimeGetValue({
                            numInterval: 5,
                            numTime: 1,
                            value: data.violation2.intervals.day5.interval1.end,
                            timeout: entry.max
                        });

                        decorate.page.scheduleChange.getTypeInterval({
                            numInterval: 5,
                            numTime: 2,
                            value: 'Промежуточный интервал',
                            timeout: entry.max
                        });
                        decorate.page.scheduleChange.startTimeGetValue({
                            numInterval: 5,
                            numTime: 2,
                            value: data.violation2.intervals.day5.interval2.begin,
                            timeout: entry.max
                        });
                        decorate.page.scheduleChange.endTimeGetValue({
                            numInterval: 5,
                            numTime: 2,
                            value: data.violation2.intervals.day5.interval2.end,
                            timeout: entry.max
                        });

                        decorate.page.scheduleChange.getTypeInterval({
                            numInterval: 5,
                            numTime: 3,
                            value: 'Промежуточный интервал',
                            timeout: entry.max
                        });
                        decorate.page.scheduleChange.startTimeGetValue({
                            numInterval: 5,
                            numTime: 3,
                            value: data.violation2.intervals.day5.interval3.begin,
                            timeout: entry.max
                        });
                        decorate.page.scheduleChange.endTimeGetValue({
                            numInterval: 5,
                            numTime: 3,
                            value: data.violation2.intervals.day5.interval3.end,
                            timeout: entry.max
                        });

                        decorate.page.scheduleChange.getTypeInterval({
                            numInterval: 5,
                            numTime: 4,
                            value: 'Конец смены',
                            timeout: entry.max
                        });
                        decorate.page.scheduleChange.startTimeGetValue({
                            numInterval: 5,
                            numTime: 4,
                            value: data.violation2.intervals.day5.interval4.begin,
                            timeout: entry.max
                        });
                        decorate.page.scheduleChange.endTimeGetValue({
                            numInterval: 5,
                            numTime: 4,
                            value: data.violation2.intervals.day5.interval4.end,
                            timeout: entry.max
                        });
                    });

                    describe('Проверка "Суббота"', () => {
                        decorate.page.scheduleChange.intervalName({
                            numInterval: 6,
                            value: data.violation2.intervals.day6.name,
                            timeout: entry.max
                        });
                        decorate.page.scheduleChange.intervalSumTime({
                            numInterval: 6,
                            value: data.violation2.intervals.day6.time,
                            timeout: entry.max
                        });

                        decorate.page.scheduleChange.getTypeInterval({
                            numInterval: 6,
                            numTime: 1,
                            value: 'Начало смены',
                            timeout: entry.max
                        });
                        decorate.page.scheduleChange.startTimeGetValue({
                            numInterval: 6,
                            numTime: 1,
                            value: data.violation2.intervals.day6.interval1.begin,
                            timeout: entry.max
                        });
                        decorate.page.scheduleChange.endTimeGetValue({
                            numInterval: 6,
                            numTime: 1,
                            value: data.violation2.intervals.day6.interval1.end,
                            timeout: entry.max
                        });

                        decorate.page.scheduleChange.getTypeInterval({
                            numInterval: 6,
                            numTime: 2,
                            value: 'Конец смены',
                            timeout: entry.max
                        });
                        decorate.page.scheduleChange.startTimeGetValue({
                            numInterval: 6,
                            numTime: 2,
                            value: data.violation2.intervals.day6.interval2.begin,
                            timeout: entry.max
                        });
                        decorate.page.scheduleChange.endTimeGetValue({
                            numInterval: 6,
                            numTime: 2,
                            value: data.violation2.intervals.day6.interval2.end,
                            timeout: entry.max
                        });
                    });

                    describe('Проверка "Воскресенье"', () => {
                        decorate.page.scheduleChange.scrollTop({
                            scroll: 500,
                            timeout: entry.max
                        });
                        decorate.page.base.loading({
                            timeout: entry.sleep2
                        });
                        decorate.page.scheduleChange.intervalName({
                            numInterval: 7,
                            value:data.violation2.intervals.day7.name,
                            timeout: entry.max
                        });
                        decorate.page.scheduleChange.intervalSumTime({
                            numInterval: 7,
                            value: data.violation2.intervals.day7.time,
                            timeout: entry.max
                        });

                        decorate.page.scheduleChange.getTypeInterval({
                            numInterval: 7,
                            numTime: 1,
                            value: 'Начало смены',
                            timeout: entry.max
                        });
                        decorate.page.scheduleChange.startTimeGetValue({
                            numInterval: 7,
                            numTime: 1,
                            value: data.violation2.intervals.day7.interval1.begin,
                            timeout: entry.max
                        });
                        decorate.page.scheduleChange.endTimeGetValue({
                            numInterval: 7,
                            numTime: 1,
                            value: data.violation2.intervals.day7.interval1.end,
                            timeout: entry.max
                        });

                        decorate.page.scheduleChange.getTypeInterval({
                            numInterval: 7,
                            numTime: 2,
                            value: 'Промежуточный интервал',
                            timeout: entry.max
                        });
                        decorate.page.scheduleChange.startTimeGetValue({
                            numInterval: 7,
                            numTime: 3,
                            value: data.violation2.intervals.day7.interval3.begin,
                            timeout: entry.max
                        });
                        decorate.page.scheduleChange.endTimeGetValue({
                            numInterval: 7,
                            numTime: 3,
                            value: data.violation2.intervals.day7.interval3.end,
                            timeout: entry.max
                        });

                        decorate.page.scheduleChange.getTypeInterval({
                            numInterval: 7,
                            numTime: 3,
                            value: 'Конец смены',
                            timeout: entry.max
                        });
                        decorate.page.scheduleChange.startTimeGetValue({
                            numInterval: 7,
                            numTime: 2,
                            value: data.violation2.intervals.day7.interval2.begin,
                            timeout: entry.max
                        });
                        decorate.page.scheduleChange.endTimeGetValue({
                            numInterval: 7,
                            numTime: 2,
                            value: data.violation2.intervals.day7.interval2.end,
                            timeout: entry.max
                        });
                    });

                });

                describe('Настройки отчетов', () => {
                    describe('Открытие настроек "Настройки отчетов"', () => {
                        decorate.el.simpleCell.handler({
                            name: 'Настройки отчетов',
                            timeout: entry.max
                        });
                        decorate.el.simpleCell.active({
                            name: 'Настройки отчетов',
                            timeout: entry.max
                        });
                    });

                    describe('Проверка "Продолжительность перерывов, включая обед:"', () => {
                        decorate.page.scheduleChange.hourGetValue({
                            name: 'Продолжительность перерывов, включая обед:',
                            value: data.violation2.setting.lunch.hour,
                            timeout: entry.max
                        });
                        decorate.page.scheduleChange.minuteGetValue({
                            name: 'Продолжительность перерывов, включая обед:',
                            value: data.violation2.setting.lunch.minute,
                            timeout: entry.max
                        });
                    });

                    describe('Проверка "Не считать нарушением, разрешить опоздание не более чем на:"', () => {
                        decorate.page.scheduleChange.hourGetValue({
                            name: 'Не считать нарушением, разрешить опоздание не более чем на:',
                            value: data.violation2.setting.arrival.hour,
                            timeout: entry.max
                        });
                        decorate.page.scheduleChange.minuteGetValue({
                            name: 'Не считать нарушением, разрешить опоздание не более чем на:',
                            value: data.violation2.setting.arrival.minute,
                            timeout: entry.max
                        });
                    });

                    describe('Проверка "Не учитывать нарушения менее чем на:"', () => {
                        decorate.page.scheduleChange.hourGetValue({
                            name: 'Не учитывать нарушения менее чем на:',
                            value: data.violation2.setting.less.hour,
                            timeout: entry.max
                        });
                        decorate.page.scheduleChange.minuteGetValue({
                            name: 'Не учитывать нарушения менее чем на:',
                            value: data.violation2.setting.less.minute,
                            timeout: entry.max
                        });
                    });

                    describe('Проверка "Не считать нарушением, разрешить уход раньше не более чем на:"', () => {
                        decorate.page.scheduleChange.hourGetValue({
                            name: 'Не считать нарушением, разрешить уход раньше не более чем на:',
                            value: data.violation2.setting.early.hour,
                            timeout: entry.max
                        });
                        decorate.page.scheduleChange.minuteGetValue({
                            name: 'Не считать нарушением, разрешить уход раньше не более чем на:',
                            value: data.violation2.setting.early.minute,
                            timeout: entry.max
                        });
                    });

                    describe('Проверка "Не учитывать переработку менее чем на:"', () => {
                        decorate.page.scheduleChange.hourGetValue({
                            name: 'Не учитывать переработку менее чем на:',
                            value: data.violation2.setting.overtime.hour,
                            timeout: entry.max
                        });
                        decorate.page.scheduleChange.minuteGetValue({
                            name: 'Не учитывать переработку менее чем на:',
                            value: data.violation2.setting.overtime.minute,
                            timeout: entry.max
                        });
                    });

                });
            });
        });

    });

    const editViolationInvalidParams = () => describe('Персонал / Графики работы. Попытка редактирования графика ' +
        'с накоплением нарушений c невалидной настройкой интервалов.', () => {

        bef();
        aft();

        describe('Открытие на редактирование', () => {
            decorate.el.table.strHandler({
                strNumber: 1,
                timeout: entry.max
            });
            decorate.el.butIcBefore.handler({
                icon: but.edit,
                timeout: entry.max
            });
            decorate.page.scheduleChange.initEdit({
                timeout: entry.max
            });
        });

        describe('Открытие настроек "Интервалы"', () => {
            decorate.el.simpleCell.handler({
                name: 'Интервалы',
                timeout: entry.max
            });
            decorate.el.simpleCell.active({
                name: 'Интервалы',
                timeout: entry.max
            });
        });

        describe('Попытка редактирования без конца смены', () => {
            decorate.page.scheduleChange.timeRemove({
                numInterval: 1,
                numTime: 2,
                timeout: entry.max
            });
            decorate.page.scheduleChange.selectTypeInterval({
                numInterval: 1,
                numTime: 1,
                value: 'Начало смены',
                timeout: entry.max
            });
            decorate.el.button.handler({
                name: 'Сохранить изменения',
                timeout: entry.max
            });
            decorate.el.error.error({
                text: 'Началу смены не сопоставлен конец смены',
                timeout: entry.max
            });
        });

        describe('Попытка редактирования без начала смены', () => {
            decorate.page.scheduleChange.selectTypeInterval({
                numInterval: 1,
                numTime: 1,
                value: 'Конец смены',
                timeout: entry.max
            });
            decorate.el.button.handler({
                name: 'Сохранить изменения',
                timeout: entry.max
            });
            decorate.el.error.error({
                text: 'Началу смены не сопоставлен конец смены',
                timeout: entry.max
            });
        });

        describe('Попытка редактирования без начала и конца смены', () => {
            decorate.page.scheduleChange.selectTypeInterval({
                numInterval: 1,
                numTime: 1,
                value: 'Промежуточный интервал',
                timeout: entry.max
            });
            decorate.el.button.handler({
                name: 'Сохранить изменения',
                timeout: entry.max
            });
            decorate.el.error.error({
                text: 'Некоторые интервалы заданы неправильно (отмечены красным). Наведите курсор на ' +
                    'интервал для просмотра информации об ошибке',
                timeout: entry.max
            });
        });
    });

    const addViolationNoParams = () => describe('Персонал / Графики работы. Попытка добавления графика с накоплением ' +
        'нарушений без помещения и интервалов.', () => {

        bef();
        aft();

        describe('Открытие на добавление', () => {
            decorate.el.butIcBefore.handler({
                icon: but.add,
                timeout: entry.max
            });
            decorate.page.scheduleChange.initAdd({
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
            decorate.el.select.iconXpand({
                title: 'Тип графика',
                value: 'Недельный',
                text: 'С накоплением нарушений',
                timeout: entry.max
            });
        });

        describe('Попытка добавления без помещения', () => {
            decorate.el.button.handler({
                name: 'Сохранить изменения',
                timeout: entry.max
            });
            decorate.el.error.error({
                text: 'Должны быть заданы параметры хотя бы для одного помещения',
                timeout: entry.max
            });
        });

        describe('Попытка добавления без интервалов', () => {
            decorate.page.scheduleChange.checkboxWorkHandler({
                name: data.weekly2.rooms.room1.name,
                timeout: entry.max
            });
            decorate.el.button.handler({
                name: 'Сохранить изменения',
                timeout: entry.max
            });
            decorate.el.error.error({
                text: 'В графике работы обязательно должны присутствовать временные интервалы.',
                timeout: entry.max
            });
        });
    });

    const copyViolation = () => describe('Персонал / Графики работы. Копирование графика с накоплением нарушений.',
        () => {

        describe('Копирование', () => {
            bef();
            aft();

            decorate.el.table.strHandler({
                strNumber: 1,
                timeout: entry.max
            });
            decorate.el.butIcBefore.handler({
                icon: but.copy,
                timeout: entry.max
            });
            decorate.page.scheduleChange.initCopy({
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

        describe('Проверка', () => {
            bef();
            aft();

            describe('Проверка таблицы', () => {
                decorate.el.table.size({
                    strCount: 2,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Название',
                    strNumber: 1,
                    cellNumber: 1,
                    value: data.violation2.name + ' (Копия)',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Тип графика',
                    strNumber: 1,
                    cellNumber: 2,
                    value: 'С накоплением нарушений',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Описание',
                    strNumber: 1,
                    cellNumber: 3,
                    value: data.violation2.description,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Примечание',
                    strNumber: 1,
                    cellNumber: 4,
                    value: '',
                    timeout: entry.max
                });
            });

            describe('Проверка параметров', () => {
                describe('Открытие на редактирование', () => {
                    decorate.el.table.strHandler({
                        strNumber: 1,
                        timeout: entry.max
                    });
                    decorate.el.butIcBefore.handler({
                        icon: but.edit,
                        timeout: entry.max
                    });
                    decorate.page.scheduleChange.initEdit({
                        timeout: entry.max
                    });
                });

                describe('Общие параметры', () => {
                    decorate.el.simpleCell.active({
                        name: 'Регистрирующие помещения',
                        timeout: entry.max
                    });
                    decorate.el.input.getValue({
                        title: 'Имя графика',
                        placeholder: '',
                        value: data.violation2.name + ' (Копия)',
                        timeout: entry.max
                    });
                    decorate.el.input.getValue({
                        title: 'Описание графика',
                        placeholder: '',
                        value: data.violation2.description,
                        timeout: entry.max
                    });
                    decorate.el.select.select({
                        title: 'Тип графика',
                        value: 'С накоплением нарушений',
                        timeout: entry.max
                    });
                });

                describe('Регистрирующие помещения', () => {
                    decorate.el.simpleCell.active({
                        name: 'Регистрирующие помещения',
                        timeout: entry.max
                    });
                    decorate.page.scheduleChange.room({
                        name: data.weekly2.rooms.room1.name,
                        work: data.weekly2.rooms.room1.work,
                        noWork: data.weekly2.rooms.room1.noWork,
                        timeout: entry.max
                    });
                    decorate.page.scheduleChange.room({
                        name: data.weekly2.rooms.room2.name,
                        work: data.weekly2.rooms.room2.work,
                        noWork: data.weekly2.rooms.room2.noWork,
                        timeout: entry.max
                    });
                    decorate.page.scheduleChange.room({
                        name: data.weekly2.rooms.room3.name,
                        work: data.weekly2.rooms.room3.work,
                        noWork: data.weekly2.rooms.room3.noWork,
                        timeout: entry.max
                    });
                });

                describe('Интервалы', () => {
                    describe('Открытие настроек "Интервалы"', () => {
                        decorate.el.simpleCell.handler({
                            name: 'Интервалы',
                            timeout: entry.max
                        });
                        decorate.el.simpleCell.active({
                            name: 'Интервалы',
                            timeout: entry.max
                        });
                    });

                    describe('Проверка "Понедельник"', () => {
                        decorate.page.scheduleChange.intervalName({
                            numInterval: 1,
                            value:data.violation2.intervals.day1.name,
                            timeout: entry.max
                        });
                        decorate.page.scheduleChange.intervalSumTime({
                            numInterval: 1,
                            value: data.violation2.intervals.day1.time,
                            timeout: entry.max
                        });

                        decorate.page.scheduleChange.getTypeInterval({
                            numInterval: 1,
                            numTime: 1,
                            value: 'Начало смены',
                            timeout: entry.max
                        });
                        decorate.page.scheduleChange.startTimeGetValue({
                            numInterval: 1,
                            numTime: 1,
                            value: data.violation2.intervals.day1.interval1.begin,
                            timeout: entry.max
                        });
                        decorate.page.scheduleChange.endTimeGetValue({
                            numInterval: 1,
                            numTime: 1,
                            value: data.violation2.intervals.day1.interval1.end,
                            timeout: entry.max
                        });

                        decorate.page.scheduleChange.getTypeInterval({
                            numInterval: 1,
                            numTime: 2,
                            value: 'Конец смены',
                            timeout: entry.max
                        });
                        decorate.page.scheduleChange.startTimeGetValue({
                            numInterval: 1,
                            numTime: 2,
                            value: data.violation2.intervals.day1.interval2.begin,
                            timeout: entry.max
                        });
                        decorate.page.scheduleChange.endTimeGetValue({
                            numInterval: 1,
                            numTime: 2,
                            value: data.violation2.intervals.day1.interval2.end,
                            timeout: entry.max
                        });
                    });

                    describe('Проверка "Вторник"', () => {
                        decorate.page.scheduleChange.intervalName({
                            numInterval: 2,
                            value:data.weekly2.intervals.day2.name,
                            timeout: entry.max
                        });
                        decorate.page.scheduleChange.intervalSumTime({
                            numInterval: 2,
                            value: data.violation2.intervals.day2.time,
                            timeout: entry.max
                        });
                        decorate.page.scheduleChange.noTimeInterval({
                            numInterval: 2,
                            timeout: entry.max
                        });
                    });

                    describe('Изменение "Среда"', () => {
                        decorate.page.scheduleChange.intervalName({
                            numInterval: 3,
                            value:data.weekly2.intervals.day3.name,
                            timeout: entry.max
                        });
                        decorate.page.scheduleChange.intervalSumTime({
                            numInterval: 3,
                            value: data.violation2.intervals.day3.time,
                            timeout: entry.max
                        });

                        decorate.page.scheduleChange.getTypeInterval({
                            numInterval: 3,
                            numTime: 1,
                            value: 'Начало смены',
                            timeout: entry.max
                        });
                        decorate.page.scheduleChange.startTimeSendKeys({
                            numInterval: 3,
                            numTime: 1,
                            value: data.violation2.intervals.day3.interval1.begin,
                            timeout: entry.max
                        });
                        decorate.page.scheduleChange.endTimeSendKeys({
                            numInterval: 3,
                            numTime: 1,
                            value: data.violation2.intervals.day3.interval1.end,
                            timeout: entry.max
                        });

                        decorate.page.scheduleChange.getTypeInterval({
                            numInterval: 3,
                            numTime: 2,
                            value: 'Промежуточный интервал',
                            timeout: entry.max
                        });
                        decorate.page.scheduleChange.startTimeSendKeys({
                            numInterval: 3,
                            numTime: 2,
                            value: data.violation2.intervals.day3.interval2.begin,
                            timeout: entry.max
                        });
                        decorate.page.scheduleChange.endTimeSendKeys({
                            numInterval: 3,
                            numTime: 2,
                            value: data.violation2.intervals.day3.interval2.end,
                            timeout: entry.max
                        });

                        decorate.page.scheduleChange.getTypeInterval({
                            numInterval: 3,
                            numTime: 3,
                            value: 'Конец смены',
                            timeout: entry.max
                        });
                        decorate.page.scheduleChange.startTimeSendKeys({
                            numInterval: 3,
                            numTime: 3,
                            value: data.violation2.intervals.day3.interval3.begin,
                            timeout: entry.max
                        });
                        decorate.page.scheduleChange.endTimeSendKeys({
                            numInterval: 3,
                            numTime: 3,
                            value: data.violation2.intervals.day3.interval3.end,
                            timeout: entry.max
                        });
                    });

                    describe('Проверка "Четверг"', () => {
                        decorate.page.scheduleChange.intervalName({
                            numInterval: 4,
                            value:data.weekly2.intervals.day4.name,
                            timeout: entry.max
                        });
                        decorate.page.scheduleChange.intervalSumTime({
                            numInterval: 4,
                            value: data.violation2.intervals.day4.time,
                            timeout: entry.max
                        });
                        decorate.page.scheduleChange.noTimeInterval({
                            numInterval: 4,
                            timeout: entry.max
                        });
                    });

                    describe('Проверка "Пятница"', () => {
                        decorate.page.scheduleChange.intervalName({
                            numInterval: 5,
                            value:data.violation2.intervals.day5.name,
                            timeout: entry.max
                        });
                        decorate.page.scheduleChange.intervalSumTime({
                            numInterval: 5,
                            value: data.violation2.intervals.day5.time,
                            timeout: entry.max
                        });

                        decorate.page.scheduleChange.getTypeInterval({
                            numInterval: 5,
                            numTime: 1,
                            value: 'Начало смены',
                            timeout: entry.max
                        });
                        decorate.page.scheduleChange.startTimeGetValue({
                            numInterval: 5,
                            numTime: 1,
                            value: data.violation2.intervals.day5.interval1.begin,
                            timeout: entry.max
                        });
                        decorate.page.scheduleChange.endTimeGetValue({
                            numInterval: 5,
                            numTime: 1,
                            value: data.violation2.intervals.day5.interval1.end,
                            timeout: entry.max
                        });

                        decorate.page.scheduleChange.getTypeInterval({
                            numInterval: 5,
                            numTime: 2,
                            value: 'Промежуточный интервал',
                            timeout: entry.max
                        });
                        decorate.page.scheduleChange.startTimeGetValue({
                            numInterval: 5,
                            numTime: 2,
                            value: data.violation2.intervals.day5.interval2.begin,
                            timeout: entry.max
                        });
                        decorate.page.scheduleChange.endTimeGetValue({
                            numInterval: 5,
                            numTime: 2,
                            value: data.violation2.intervals.day5.interval2.end,
                            timeout: entry.max
                        });

                        decorate.page.scheduleChange.getTypeInterval({
                            numInterval: 5,
                            numTime: 3,
                            value: 'Промежуточный интервал',
                            timeout: entry.max
                        });
                        decorate.page.scheduleChange.startTimeGetValue({
                            numInterval: 5,
                            numTime: 3,
                            value: data.violation2.intervals.day5.interval3.begin,
                            timeout: entry.max
                        });
                        decorate.page.scheduleChange.endTimeGetValue({
                            numInterval: 5,
                            numTime: 3,
                            value: data.violation2.intervals.day5.interval3.end,
                            timeout: entry.max
                        });

                        decorate.page.scheduleChange.getTypeInterval({
                            numInterval: 5,
                            numTime: 4,
                            value: 'Конец смены',
                            timeout: entry.max
                        });
                        decorate.page.scheduleChange.startTimeGetValue({
                            numInterval: 5,
                            numTime: 4,
                            value: data.violation2.intervals.day5.interval4.begin,
                            timeout: entry.max
                        });
                        decorate.page.scheduleChange.endTimeGetValue({
                            numInterval: 5,
                            numTime: 4,
                            value: data.violation2.intervals.day5.interval4.end,
                            timeout: entry.max
                        });
                    });

                    describe('Проверка "Суббота"', () => {
                        decorate.page.scheduleChange.intervalName({
                            numInterval: 6,
                            value: data.violation2.intervals.day6.name,
                            timeout: entry.max
                        });
                        decorate.page.scheduleChange.intervalSumTime({
                            numInterval: 6,
                            value: data.violation2.intervals.day6.time,
                            timeout: entry.max
                        });

                        decorate.page.scheduleChange.getTypeInterval({
                            numInterval: 6,
                            numTime: 1,
                            value: 'Начало смены',
                            timeout: entry.max
                        });
                        decorate.page.scheduleChange.startTimeGetValue({
                            numInterval: 6,
                            numTime: 1,
                            value: data.violation2.intervals.day6.interval1.begin,
                            timeout: entry.max
                        });
                        decorate.page.scheduleChange.endTimeGetValue({
                            numInterval: 6,
                            numTime: 1,
                            value: data.violation2.intervals.day6.interval1.end,
                            timeout: entry.max
                        });

                        decorate.page.scheduleChange.getTypeInterval({
                            numInterval: 6,
                            numTime: 2,
                            value: 'Конец смены',
                            timeout: entry.max
                        });
                        decorate.page.scheduleChange.startTimeGetValue({
                            numInterval: 6,
                            numTime: 2,
                            value: data.violation2.intervals.day6.interval2.begin,
                            timeout: entry.max
                        });
                        decorate.page.scheduleChange.endTimeGetValue({
                            numInterval: 6,
                            numTime: 2,
                            value: data.violation2.intervals.day6.interval2.end,
                            timeout: entry.max
                        });
                    });

                    describe('Проверка "Воскресенье"', () => {
                        decorate.page.scheduleChange.scrollTop({
                            scroll: 500,
                            timeout: entry.max
                        });
                        decorate.page.base.loading({
                            timeout: entry.sleep2
                        });
                        decorate.page.scheduleChange.intervalName({
                            numInterval: 7,
                            value:data.violation2.intervals.day7.name,
                            timeout: entry.max
                        });
                        decorate.page.scheduleChange.intervalSumTime({
                            numInterval: 7,
                            value: data.violation2.intervals.day7.time,
                            timeout: entry.max
                        });

                        decorate.page.scheduleChange.getTypeInterval({
                            numInterval: 7,
                            numTime: 1,
                            value: 'Начало смены',
                            timeout: entry.max
                        });
                        decorate.page.scheduleChange.startTimeGetValue({
                            numInterval: 7,
                            numTime: 1,
                            value: data.violation2.intervals.day7.interval1.begin,
                            timeout: entry.max
                        });
                        decorate.page.scheduleChange.endTimeGetValue({
                            numInterval: 7,
                            numTime: 1,
                            value: data.violation2.intervals.day7.interval1.end,
                            timeout: entry.max
                        });

                        decorate.page.scheduleChange.getTypeInterval({
                            numInterval: 7,
                            numTime: 2,
                            value: 'Промежуточный интервал',
                            timeout: entry.max
                        });
                        decorate.page.scheduleChange.startTimeGetValue({
                            numInterval: 7,
                            numTime: 3,
                            value: data.violation2.intervals.day7.interval3.begin,
                            timeout: entry.max
                        });
                        decorate.page.scheduleChange.endTimeGetValue({
                            numInterval: 7,
                            numTime: 3,
                            value: data.violation2.intervals.day7.interval3.end,
                            timeout: entry.max
                        });

                        decorate.page.scheduleChange.getTypeInterval({
                            numInterval: 7,
                            numTime: 3,
                            value: 'Конец смены',
                            timeout: entry.max
                        });
                        decorate.page.scheduleChange.startTimeGetValue({
                            numInterval: 7,
                            numTime: 2,
                            value: data.violation2.intervals.day7.interval2.begin,
                            timeout: entry.max
                        });
                        decorate.page.scheduleChange.endTimeGetValue({
                            numInterval: 7,
                            numTime: 2,
                            value: data.violation2.intervals.day7.interval2.end,
                            timeout: entry.max
                        });
                    });

                });

                describe('Настройки отчетов', () => {
                    describe('Открытие настроек "Настройки отчетов"', () => {
                        decorate.el.simpleCell.handler({
                            name: 'Настройки отчетов',
                            timeout: entry.max
                        });
                        decorate.el.simpleCell.active({
                            name: 'Настройки отчетов',
                            timeout: entry.max
                        });
                    });

                    describe('Проверка "Продолжительность перерывов, включая обед:"', () => {
                        decorate.page.scheduleChange.hourGetValue({
                            name: 'Продолжительность перерывов, включая обед:',
                            value: data.violation2.setting.lunch.hour,
                            timeout: entry.max
                        });
                        decorate.page.scheduleChange.minuteGetValue({
                            name: 'Продолжительность перерывов, включая обед:',
                            value: data.violation2.setting.lunch.minute,
                            timeout: entry.max
                        });
                    });

                    describe('Проверка "Не считать нарушением, разрешить опоздание не более чем на:"', () => {
                        decorate.page.scheduleChange.hourGetValue({
                            name: 'Не считать нарушением, разрешить опоздание не более чем на:',
                            value: data.violation2.setting.arrival.hour,
                            timeout: entry.max
                        });
                        decorate.page.scheduleChange.minuteGetValue({
                            name: 'Не считать нарушением, разрешить опоздание не более чем на:',
                            value: data.violation2.setting.arrival.minute,
                            timeout: entry.max
                        });
                    });

                    describe('Проверка "Не учитывать нарушения менее чем на:"', () => {
                        decorate.page.scheduleChange.hourGetValue({
                            name: 'Не учитывать нарушения менее чем на:',
                            value: data.violation2.setting.less.hour,
                            timeout: entry.max
                        });
                        decorate.page.scheduleChange.minuteGetValue({
                            name: 'Не учитывать нарушения менее чем на:',
                            value: data.violation2.setting.less.minute,
                            timeout: entry.max
                        });
                    });

                    describe('Проверка "Не считать нарушением, разрешить уход раньше не более чем на:"', () => {
                        decorate.page.scheduleChange.hourGetValue({
                            name: 'Не считать нарушением, разрешить уход раньше не более чем на:',
                            value: data.violation2.setting.early.hour,
                            timeout: entry.max
                        });
                        decorate.page.scheduleChange.minuteGetValue({
                            name: 'Не считать нарушением, разрешить уход раньше не более чем на:',
                            value: data.violation2.setting.early.minute,
                            timeout: entry.max
                        });
                    });

                    describe('Проверка "Не учитывать переработку менее чем на:"', () => {
                        decorate.page.scheduleChange.hourGetValue({
                            name: 'Не учитывать переработку менее чем на:',
                            value: data.violation2.setting.overtime.hour,
                            timeout: entry.max
                        });
                        decorate.page.scheduleChange.minuteGetValue({
                            name: 'Не учитывать переработку менее чем на:',
                            value: data.violation2.setting.overtime.minute,
                            timeout: entry.max
                        });
                    });

                });
            });
        });
    });

    const addBalance = () => describe('Персонал / Графики работы. Добавление графика с накоплением нарушений ' +
        'на основе баланса.', () => {

        describe('Добавление', () => {
            bef();
            aft();

            describe('Открытие на добавление', () => {
                decorate.el.butIcBefore.handler({
                    icon: but.add,
                    timeout: entry.max
                });
                decorate.page.scheduleChange.initAdd({
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
            });

            describe('Общие параметры', () => {
                decorate.el.simpleCell.active({
                    name: 'Регистрирующие помещения',
                    timeout: entry.max
                });
                decorate.el.input.backSpace({
                    title: 'Имя графика',
                    placeholder: '',
                    timeout: entry.max
                });
                decorate.el.input.sendKeys({
                    title: 'Имя графика',
                    placeholder: '',
                    value: data.balance1.name,
                    timeout: entry.max
                });
                decorate.el.select.iconXpand({
                    title: 'Тип графика',
                    value: 'Недельный',
                    text: 'С накоплением нарушений на основе баланса',
                    timeout: entry.max
                });
                decorate.page.scheduleChange.dayHandler({
                    name: 'ПН',
                    timeout: entry.max
                });
                decorate.page.scheduleChange.dayHandler({
                    name: 'ВТ',
                    timeout: entry.max
                });
                decorate.page.scheduleChange.dayHandler({
                    name: 'СР',
                    timeout: entry.max
                });
                decorate.page.scheduleChange.dayHandler({
                    name: 'ЧТ',
                    timeout: entry.max
                });
                decorate.page.scheduleChange.dayHandler({
                    name: 'ПТ',
                    timeout: entry.max
                });
            });

            describe('Регистрирующие помещения', () => {
                decorate.el.simpleCell.active({
                    name: 'Регистрирующие помещения',
                    timeout: entry.max
                });
                decorate.page.scheduleChange.checkboxWorkHandler({
                    name: data.balance1.rooms.room1.name,
                    timeout: entry.max
                });
            });

            describe('Сохранение', () => {
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

        describe('Проверка', () => {
            bef();
            aft();

            describe('Проверка таблицы', () => {
                decorate.el.table.size({
                    strCount: 1,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Название',
                    strNumber: 1,
                    cellNumber: 1,
                    value: data.balance1.name,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Тип графика',
                    strNumber: 1,
                    cellNumber: 2,
                    value: 'С накоплением нарушений на основе баланса',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Описание',
                    strNumber: 1,
                    cellNumber: 3,
                    value: '',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Примечание',
                    strNumber: 1,
                    cellNumber: 4,
                    value: '',
                    timeout: entry.max
                });
            });

            describe('Проверка параметров', () => {
                describe('Открытие на редактирование', () => {
                    decorate.el.table.strHandler({
                        strNumber: 1,
                        timeout: entry.max
                    });
                    decorate.el.butIcBefore.handler({
                        icon: but.edit,
                        timeout: entry.max
                    });
                    decorate.page.scheduleChange.initEdit({
                        timeout: entry.max
                    });
                });

                describe('Общие параметры', () => {
                    decorate.el.simpleCell.active({
                        name: 'Регистрирующие помещения',
                        timeout: entry.max
                    });
                    decorate.el.input.getValue({
                        title: 'Имя графика',
                        placeholder: '',
                        value: data.balance1.name,
                        timeout: entry.max
                    });
                    decorate.el.input.getValue({
                        title: 'Описание графика',
                        placeholder: '',
                        value: '',
                        timeout: entry.max
                    });
                    decorate.el.select.select({
                        title: 'Тип графика',
                        value: 'С накоплением нарушений на основе баланса',
                        timeout: entry.max
                    });
                    decorate.page.scheduleChange.dayActive({
                        name: 'ПН',
                        timeout: entry.max
                    });
                    decorate.page.scheduleChange.dayActive({
                        name: 'ВТ',
                        timeout: entry.max
                    });
                    decorate.page.scheduleChange.dayActive({
                        name: 'СР',
                        timeout: entry.max
                    });
                    decorate.page.scheduleChange.dayActive({
                        name: 'ЧТ',
                        timeout: entry.max
                    });
                    decorate.page.scheduleChange.dayActive({
                        name: 'ПТ',
                        timeout: entry.max
                    });
                    decorate.page.scheduleChange.dayNoActive({
                        name: 'СБ',
                        timeout: entry.max
                    });
                    decorate.page.scheduleChange.dayNoActive({
                        name: 'ВС',
                        timeout: entry.max
                    });
                });

                describe('Регистрирующие помещения', () => {
                    decorate.el.simpleCell.active({
                        name: 'Регистрирующие помещения',
                        timeout: entry.max
                    });
                    decorate.page.scheduleChange.room({
                        name: data.balance1.rooms.room1.name,
                        work: data.balance1.rooms.room1.work,
                        noWork: data.balance1.rooms.room1.noWork,
                        timeout: entry.max
                    });
                    decorate.page.scheduleChange.room({
                        name: data.balance1.rooms.room2.name,
                        work: data.balance1.rooms.room2.work,
                        noWork: data.balance1.rooms.room2.noWork,
                        timeout: entry.max
                    });
                    decorate.page.scheduleChange.room({
                        name: data.balance1.rooms.room3.name,
                        work: data.balance1.rooms.room3.work,
                        noWork: data.balance1.rooms.room3.noWork,
                        timeout: entry.max
                    });
                });

                describe('Настройки отчетов', () => {
                    describe('Открытие настроек "Настройки отчетов"', () => {
                        decorate.el.simpleCell.handler({
                            name: 'Настройки отчетов',
                            timeout: entry.max
                        });
                        decorate.el.simpleCell.active({
                            name: 'Настройки отчетов',
                            timeout: entry.max
                        });
                    });

                    describe('Проверка "Продолжительность перерывов, включая обед:"', () => {
                        decorate.page.scheduleChange.hourGetValue({
                            name: 'Продолжительность перерывов, включая обед:',
                            value: '00',
                            timeout: entry.max
                        });
                        decorate.page.scheduleChange.minuteGetValue({
                            name: 'Продолжительность перерывов, включая обед:',
                            value: '00',
                            timeout: entry.max
                        });
                    });

                    describe('Проверка "Допустимое время работы с:"', () => {
                        decorate.page.scheduleChange.hourGetValue({
                            name: 'Допустимое время работы с:',
                            value: '00',
                            timeout: entry.max
                        });
                        decorate.page.scheduleChange.minuteGetValue({
                            name: 'Допустимое время работы с:',
                            value: '00',
                            timeout: entry.max
                        });
                    });

                    describe('Проверка "Количество часов в неделю, включая перерывы:"', () => {
                        decorate.page.scheduleChange.hourGetValue({
                            name: 'Количество часов в неделю, включая перерывы:',
                            value: '40',
                            timeout: entry.max
                        });
                        decorate.page.scheduleChange.minuteGetValue({
                            name: 'Количество часов в неделю, включая перерывы:',
                            value: '00',
                            timeout: entry.max
                        });
                    });

                    describe('Проверка "Считать опозданием приход позже, чем в:"', () => {
                        decorate.page.scheduleChange.hourGetValue({
                            name: 'Считать опозданием приход позже, чем в:',
                            value: '00',
                            timeout: entry.max
                        });
                        decorate.page.scheduleChange.minuteGetValue({
                            name: 'Считать опозданием приход позже, чем в:',
                            value: '00',
                            timeout: entry.max
                        });
                    });

                    describe('Проверка "Считать уходом раньше уход раньше, чем в:"', () => {
                        decorate.page.scheduleChange.hourGetValue({
                            name: 'Считать уходом раньше уход раньше, чем в:',
                            value: '00',
                            timeout: entry.max
                        });
                        decorate.page.scheduleChange.minuteGetValue({
                            name: 'Считать уходом раньше уход раньше, чем в:',
                            value: '00',
                            timeout: entry.max
                        });
                    });

                    describe('Проверка "Максимально допустимая величина положительного баланса за период расчета ' +
                        '(месяц):"', () => {
                        decorate.page.scheduleChange.hourGetValue({
                            name: 'Максимально допустимая величина положительного баланса за период расчета (месяц):',
                            value: '00',
                            timeout: entry.max
                        });
                        decorate.page.scheduleChange.minuteGetValue({
                            name: 'Максимально допустимая величина положительного баланса за период расчета (месяц):',
                            value: '00',
                            timeout: entry.max
                        });
                    });

                });
            });
        });
    });

    const editBalance = () => describe('Персонал / Графики работы. Редактирование графика с накоплением нарушений ' +
        'на основе баланса.', () => {

        describe('Редактирование', () => {
            bef();
            aft();

            describe('Открытие на редактирование', () => {
                decorate.el.table.strHandler({
                    strNumber: 1,
                    timeout: entry.max
                });
                decorate.el.butIcBefore.handler({
                    icon: but.edit,
                    timeout: entry.max
                });
                decorate.page.scheduleChange.initEdit({
                    timeout: entry.max
                });
            });

            describe('Общие параметры', () => {
                decorate.el.simpleCell.active({
                    name: 'Регистрирующие помещения',
                    timeout: entry.max
                });
                decorate.el.input.backSpace({
                    title: 'Имя графика',
                    placeholder: '',
                    timeout: entry.max
                });
                decorate.el.input.sendKeys({
                    title: 'Имя графика',
                    placeholder: '',
                    value: data.balance2.name,
                    timeout: entry.max
                });
                decorate.el.input.sendKeys({
                    title: 'Описание графика',
                    placeholder: '',
                    value: data.balance2.description,
                    timeout: entry.max
                });
                decorate.el.select.select({
                    title: 'Тип графика',
                    value: 'С накоплением нарушений на основе баланса',
                    timeout: entry.max
                });
                decorate.page.scheduleChange.dayHandler({
                    name: 'СБ',
                    timeout: entry.max
                });
                decorate.page.scheduleChange.dayHandler({
                    name: 'ВС',
                    timeout: entry.max
                });
            });

            describe('Регистрирующие помещения', () => {
                decorate.el.simpleCell.active({
                    name: 'Регистрирующие помещения',
                    timeout: entry.max
                });
                decorate.page.scheduleChange.checkboxNoWorkHandler({
                    name: data.weekly2.rooms.room2.name,
                    timeout: entry.max
                });
                decorate.page.scheduleChange.checkboxWorkHandler({
                    name: data.weekly2.rooms.room3.name,
                    timeout: entry.max
                });
            });

            describe('Настройки отчетов', () => {
                describe('Открытие настроек "Настройки отчетов"', () => {
                    decorate.el.simpleCell.handler({
                        name: 'Настройки отчетов',
                        timeout: entry.max
                    });
                    decorate.el.simpleCell.active({
                        name: 'Настройки отчетов',
                        timeout: entry.max
                    });
                });

                describe('Изменение "Продолжительность перерывов, включая обед:"', () => {
                    decorate.page.scheduleChange.hourSendKeys({
                        name: 'Продолжительность перерывов, включая обед:',
                        value: data.balance2.setting.lunch.hour,
                        timeout: entry.max
                    });
                    decorate.page.scheduleChange.minuteSendKeys({
                        name: 'Продолжительность перерывов, включая обед:',
                        value: data.balance2.setting.lunch.minute,
                        timeout: entry.max
                    });
                });

                describe('Изменение "Допустимое время работы с:"', () => {
                    decorate.page.scheduleChange.hourSendKeys({
                        name: 'Допустимое время работы с:',
                        value: data.balance2.setting.workTime.hour,
                        timeout: entry.max
                    });
                    decorate.page.scheduleChange.minuteSendKeys({
                        name: 'Допустимое время работы с:',
                        value: data.balance2.setting.workTime.minute,
                        timeout: entry.max
                    });
                });

                describe('Изменение "Количество часов в неделю, включая перерывы:"', () => {
                    decorate.page.scheduleChange.hourSendKeys({
                        name: 'Количество часов в неделю, включая перерывы:',
                        value: data.balance2.setting.weekTime.hour,
                        timeout: entry.max
                    });
                    decorate.page.scheduleChange.minuteSendKeys({
                        name: 'Количество часов в неделю, включая перерывы:',
                        value: data.balance2.setting.weekTime.minute,
                        timeout: entry.max
                    });
                });

                describe('Изменение "Считать опозданием приход позже, чем в:"', () => {
                    decorate.page.scheduleChange.hourSendKeys({
                        name: 'Считать опозданием приход позже, чем в:',
                        value: data.balance2.setting.lately.hour,
                        timeout: entry.max
                    });
                    decorate.page.scheduleChange.minuteSendKeys({
                        name: 'Считать опозданием приход позже, чем в:',
                        value: data.balance2.setting.lately.minute,
                        timeout: entry.max
                    });
                });

                describe('Изменение "Считать уходом раньше уход раньше, чем в:"', () => {
                    decorate.page.scheduleChange.hourSendKeys({
                        name: 'Считать уходом раньше уход раньше, чем в:',
                        value: data.balance2.setting.lately.hour,
                        timeout: entry.max
                    });
                    decorate.page.scheduleChange.minuteSendKeys({
                        name: 'Считать уходом раньше уход раньше, чем в:',
                        value: data.balance2.setting.lately.minute,
                        timeout: entry.max
                    });
                });

                describe('Изменение "Максимально допустимая величина положительного баланса за период расчета (месяц):"',
                    () => {
                    decorate.page.scheduleChange.hourSendKeys({
                        name: 'Максимально допустимая величина положительного баланса за период расчета (месяц):',
                        value: data.balance2.setting.maxTime.hour,
                        timeout: entry.max
                    });
                    decorate.page.scheduleChange.minuteSendKeys({
                        name: 'Максимально допустимая величина положительного баланса за период расчета (месяц):',
                        value: data.balance2.setting.maxTime.minute,
                        timeout: entry.max
                    });
                });
            });

            describe('Сохранение', () => {
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

        describe('Проверка', () => {
            bef();
            aft();

            describe('Проверка таблицы', () => {
                decorate.el.table.size({
                    strCount: 1,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Название',
                    strNumber: 1,
                    cellNumber: 1,
                    value: data.balance2.name,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Тип графика',
                    strNumber: 1,
                    cellNumber: 2,
                    value: 'С накоплением нарушений на основе баланса',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Описание',
                    strNumber: 1,
                    cellNumber: 3,
                    value: data.balance2.description,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Примечание',
                    strNumber: 1,
                    cellNumber: 4,
                    value: '',
                    timeout: entry.max
                });
            });

            describe('Проверка параметров', () => {
                describe('Открытие на редактирование', () => {
                    decorate.el.table.strHandler({
                        strNumber: 1,
                        timeout: entry.max
                    });
                    decorate.el.butIcBefore.handler({
                        icon: but.edit,
                        timeout: entry.max
                    });
                    decorate.page.scheduleChange.initEdit({
                        timeout: entry.max
                    });
                });

                describe('Общие параметры', () => {
                    decorate.el.simpleCell.active({
                        name: 'Регистрирующие помещения',
                        timeout: entry.max
                    });
                    decorate.el.input.getValue({
                        title: 'Имя графика',
                        placeholder: '',
                        value: data.balance2.name,
                        timeout: entry.max
                    });
                    decorate.el.input.getValue({
                        title: 'Описание графика',
                        placeholder: '',
                        value: data.balance2.description,
                        timeout: entry.max
                    });
                    decorate.el.select.select({
                        title: 'Тип графика',
                        value: 'С накоплением нарушений на основе баланса',
                        timeout: entry.max
                    });
                    decorate.page.scheduleChange.dayActive({
                        name: 'ПН',
                        timeout: entry.max
                    });
                    decorate.page.scheduleChange.dayActive({
                        name: 'ВТ',
                        timeout: entry.max
                    });
                    decorate.page.scheduleChange.dayActive({
                        name: 'СР',
                        timeout: entry.max
                    });
                    decorate.page.scheduleChange.dayActive({
                        name: 'ЧТ',
                        timeout: entry.max
                    });
                    decorate.page.scheduleChange.dayActive({
                        name: 'ПТ',
                        timeout: entry.max
                    });
                    decorate.page.scheduleChange.dayActive({
                        name: 'СБ',
                        timeout: entry.max
                    });
                    decorate.page.scheduleChange.dayActive({
                        name: 'ВС',
                        timeout: entry.max
                    });
                });

                describe('Регистрирующие помещения', () => {
                    decorate.el.simpleCell.active({
                        name: 'Регистрирующие помещения',
                        timeout: entry.max
                    });
                    decorate.page.scheduleChange.room({
                        name: data.balance2.rooms.room1.name,
                        work: data.balance2.rooms.room1.work,
                        noWork: data.balance2.rooms.room1.noWork,
                        timeout: entry.max
                    });
                    decorate.page.scheduleChange.room({
                        name: data.balance2.rooms.room2.name,
                        work: data.balance2.rooms.room2.work,
                        noWork: data.balance2.rooms.room2.noWork,
                        timeout: entry.max
                    });
                    decorate.page.scheduleChange.room({
                        name: data.balance2.rooms.room3.name,
                        work: data.balance2.rooms.room3.work,
                        noWork: data.balance2.rooms.room3.noWork,
                        timeout: entry.max
                    });
                });

                describe('Настройки отчетов', () => {
                    describe('Открытие настроек "Настройки отчетов"', () => {
                        decorate.el.simpleCell.handler({
                            name: 'Настройки отчетов',
                            timeout: entry.max
                        });
                        decorate.el.simpleCell.active({
                            name: 'Настройки отчетов',
                            timeout: entry.max
                        });
                    });

                    describe('Проверка "Продолжительность перерывов, включая обед:"', () => {
                        decorate.page.scheduleChange.hourGetValue({
                            name: 'Продолжительность перерывов, включая обед:',
                            value: data.balance2.setting.lunch.hour,
                            timeout: entry.max
                        });
                        decorate.page.scheduleChange.minuteGetValue({
                            name: 'Продолжительность перерывов, включая обед:',
                            value: data.balance2.setting.lunch.minute,
                            timeout: entry.max
                        });
                    });

                    describe('Проверка "Допустимое время работы с:"', () => {
                        decorate.page.scheduleChange.hourGetValue({
                            name: 'Допустимое время работы с:',
                            value: data.balance2.setting.workTime.hour,
                            timeout: entry.max
                        });
                        decorate.page.scheduleChange.minuteGetValue({
                            name: 'Допустимое время работы с:',
                            value: data.balance2.setting.workTime.minute,
                            timeout: entry.max
                        });
                    });

                    describe('Проверка "Количество часов в неделю, включая перерывы:"', () => {
                        decorate.page.scheduleChange.hourGetValue({
                            name: 'Количество часов в неделю, включая перерывы:',
                            value: data.balance2.setting.weekTime.hour,
                            timeout: entry.max
                        });
                        decorate.page.scheduleChange.minuteGetValue({
                            name: 'Количество часов в неделю, включая перерывы:',
                            value: data.balance2.setting.weekTime.minute,
                            timeout: entry.max
                        });
                    });

                    describe('Проверка "Считать опозданием приход позже, чем в:"', () => {
                        decorate.page.scheduleChange.hourGetValue({
                            name: 'Считать опозданием приход позже, чем в:',
                            value: data.balance2.setting.lately.hour,
                            timeout: entry.max
                        });
                        decorate.page.scheduleChange.minuteGetValue({
                            name: 'Считать опозданием приход позже, чем в:',
                            value: data.balance2.setting.lately.minute,
                            timeout: entry.max
                        });
                    });

                    describe('Проверка "Считать уходом раньше уход раньше, чем в:"', () => {
                        decorate.page.scheduleChange.hourGetValue({
                            name: 'Считать уходом раньше уход раньше, чем в:',
                            value: data.balance2.setting.lately.hour,
                            timeout: entry.max
                        });
                        decorate.page.scheduleChange.minuteGetValue({
                            name: 'Считать уходом раньше уход раньше, чем в:',
                            value: data.balance2.setting.lately.minute,
                            timeout: entry.max
                        });
                    });

                    describe('Проверка "Максимально допустимая величина положительного баланса за период расчета (месяц):"',
                        () => {
                            decorate.page.scheduleChange.hourGetValue({
                                name: 'Максимально допустимая величина положительного баланса за период расчета (месяц):',
                                value: data.balance2.setting.maxTime.hour,
                                timeout: entry.max
                            });
                            decorate.page.scheduleChange.minuteGetValue({
                                name: 'Максимально допустимая величина положительного баланса за период расчета (месяц):',
                                value: data.balance2.setting.maxTime.minute,
                                timeout: entry.max
                            });
                        });

                });
            });
        });
    });

    const copyBalance = () => describe('Персонал / Графики работы. Копирование графика с накоплением нарушений ' +
        'на основе баланса.', () => {

        describe('Копирование', () => {
            bef();
            aft();

            decorate.el.table.strHandler({
                strNumber: 1,
                timeout: entry.max
            });
            decorate.el.butIcBefore.handler({
                icon: but.copy,
                timeout: entry.max
            });
            decorate.page.scheduleChange.initCopy({
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

        describe('Проверка', () => {
            bef();
            aft();

            describe('Проверка таблицы', () => {
                decorate.el.table.size({
                    strCount: 2,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Название',
                    strNumber: 1,
                    cellNumber: 1,
                    value: data.balance2.name + ' (Копия)',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Тип графика',
                    strNumber: 1,
                    cellNumber: 2,
                    value: 'С накоплением нарушений на основе баланса',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Описание',
                    strNumber: 1,
                    cellNumber: 3,
                    value: data.balance2.description,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Примечание',
                    strNumber: 1,
                    cellNumber: 4,
                    value: '',
                    timeout: entry.max
                });
            });

            describe('Проверка параметров', () => {
                describe('Открытие на редактирование', () => {
                    decorate.el.table.strHandler({
                        strNumber: 1,
                        timeout: entry.max
                    });
                    decorate.el.butIcBefore.handler({
                        icon: but.edit,
                        timeout: entry.max
                    });
                    decorate.page.scheduleChange.initEdit({
                        timeout: entry.max
                    });
                });

                describe('Общие параметры', () => {
                    decorate.el.simpleCell.active({
                        name: 'Регистрирующие помещения',
                        timeout: entry.max
                    });
                    decorate.el.input.getValue({
                        title: 'Имя графика',
                        placeholder: '',
                        value: data.balance2.name + ' (Копия)',
                        timeout: entry.max
                    });
                    decorate.el.input.getValue({
                        title: 'Описание графика',
                        placeholder: '',
                        value: data.balance2.description,
                        timeout: entry.max
                    });
                    decorate.el.select.select({
                        title: 'Тип графика',
                        value: 'С накоплением нарушений на основе баланса',
                        timeout: entry.max
                    });
                    decorate.page.scheduleChange.dayActive({
                        name: 'ПН',
                        timeout: entry.max
                    });
                    decorate.page.scheduleChange.dayActive({
                        name: 'ВТ',
                        timeout: entry.max
                    });
                    decorate.page.scheduleChange.dayActive({
                        name: 'СР',
                        timeout: entry.max
                    });
                    decorate.page.scheduleChange.dayActive({
                        name: 'ЧТ',
                        timeout: entry.max
                    });
                    decorate.page.scheduleChange.dayActive({
                        name: 'ПТ',
                        timeout: entry.max
                    });
                    decorate.page.scheduleChange.dayActive({
                        name: 'СБ',
                        timeout: entry.max
                    });
                    decorate.page.scheduleChange.dayActive({
                        name: 'ВС',
                        timeout: entry.max
                    });
                });

                describe('Регистрирующие помещения', () => {
                    decorate.el.simpleCell.active({
                        name: 'Регистрирующие помещения',
                        timeout: entry.max
                    });
                    decorate.page.scheduleChange.room({
                        name: data.balance2.rooms.room1.name,
                        work: data.balance2.rooms.room1.work,
                        noWork: data.balance2.rooms.room1.noWork,
                        timeout: entry.max
                    });
                    decorate.page.scheduleChange.room({
                        name: data.balance2.rooms.room2.name,
                        work: data.balance2.rooms.room2.work,
                        noWork: data.balance2.rooms.room2.noWork,
                        timeout: entry.max
                    });
                    decorate.page.scheduleChange.room({
                        name: data.balance2.rooms.room3.name,
                        work: data.balance2.rooms.room3.work,
                        noWork: data.balance2.rooms.room3.noWork,
                        timeout: entry.max
                    });
                });

                describe('Настройки отчетов', () => {
                    describe('Открытие настроек "Настройки отчетов"', () => {
                        decorate.el.simpleCell.handler({
                            name: 'Настройки отчетов',
                            timeout: entry.max
                        });
                        decorate.el.simpleCell.active({
                            name: 'Настройки отчетов',
                            timeout: entry.max
                        });
                    });

                    describe('Проверка "Продолжительность перерывов, включая обед:"', () => {
                        decorate.page.scheduleChange.hourGetValue({
                            name: 'Продолжительность перерывов, включая обед:',
                            value: data.balance2.setting.lunch.hour,
                            timeout: entry.max
                        });
                        decorate.page.scheduleChange.minuteGetValue({
                            name: 'Продолжительность перерывов, включая обед:',
                            value: data.balance2.setting.lunch.minute,
                            timeout: entry.max
                        });
                    });

                    describe('Проверка "Допустимое время работы с:"', () => {
                        decorate.page.scheduleChange.hourGetValue({
                            name: 'Допустимое время работы с:',
                            value: data.balance2.setting.workTime.hour,
                            timeout: entry.max
                        });
                        decorate.page.scheduleChange.minuteGetValue({
                            name: 'Допустимое время работы с:',
                            value: data.balance2.setting.workTime.minute,
                            timeout: entry.max
                        });
                    });

                    describe('Проверка "Количество часов в неделю, включая перерывы:"', () => {
                        decorate.page.scheduleChange.hourGetValue({
                            name: 'Количество часов в неделю, включая перерывы:',
                            value: data.balance2.setting.weekTime.hour,
                            timeout: entry.max
                        });
                        decorate.page.scheduleChange.minuteGetValue({
                            name: 'Количество часов в неделю, включая перерывы:',
                            value: data.balance2.setting.weekTime.minute,
                            timeout: entry.max
                        });
                    });

                    describe('Проверка "Считать опозданием приход позже, чем в:"', () => {
                        decorate.page.scheduleChange.hourGetValue({
                            name: 'Считать опозданием приход позже, чем в:',
                            value: data.balance2.setting.lately.hour,
                            timeout: entry.max
                        });
                        decorate.page.scheduleChange.minuteGetValue({
                            name: 'Считать опозданием приход позже, чем в:',
                            value: data.balance2.setting.lately.minute,
                            timeout: entry.max
                        });
                    });

                    describe('Проверка "Считать уходом раньше уход раньше, чем в:"', () => {
                        decorate.page.scheduleChange.hourGetValue({
                            name: 'Считать уходом раньше уход раньше, чем в:',
                            value: data.balance2.setting.lately.hour,
                            timeout: entry.max
                        });
                        decorate.page.scheduleChange.minuteGetValue({
                            name: 'Считать уходом раньше уход раньше, чем в:',
                            value: data.balance2.setting.lately.minute,
                            timeout: entry.max
                        });
                    });

                    describe('Проверка "Максимально допустимая величина положительного баланса за период расчета (месяц):"',
                        () => {
                            decorate.page.scheduleChange.hourGetValue({
                                name: 'Максимально допустимая величина положительного баланса за период расчета (месяц):',
                                value: data.balance2.setting.maxTime.hour,
                                timeout: entry.max
                            });
                            decorate.page.scheduleChange.minuteGetValue({
                                name: 'Максимально допустимая величина положительного баланса за период расчета (месяц):',
                                value: data.balance2.setting.maxTime.minute,
                                timeout: entry.max
                            });
                        });

                });
            });
        });
    });

    const searchFilter = () => describe('Персонал / Графики работы. Проверка фильтра "Поиск..."', () => {

        describe('API добавление недельного графика работы', () => {
            bef();
            aft();

            it(`Добавление графика работы "${data.weekly1.name}"`, async () => {
                const cook = await page.base.getCookie('token');
                await dec.simple(api.putSchedule,
                    [[data.weekly1.db], cook.text],
                    api.putSchedule);
            });

            it(`Добавление графика работы "${data.weekly2.name}"`, async () => {
                const cook = await page.base.getCookie('token');
                await dec.simple(api.putSchedule,
                    [[data.weekly2.db], cook.text],
                    api.putSchedule);
            });
        });

        describe('Проверка', () => {
            bef();
            aft();

            describe('Проверка таблицы, до применения фильтра "Поиск..."', () => {
                decorate.el.table.size({
                    strCount: 2,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Название',
                    strNumber: 1,
                    cellNumber: 1,
                    value: data.weekly2.name,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Название',
                    strNumber: 2,
                    cellNumber: 1,
                    value: data.weekly1.name,
                    timeout: entry.max
                });
            });

            describe(`Ввод "${data.weekly1.name}" в "Поиск..."`, () => {
                decorate.el.input.sendKeys({
                    title: '',
                    placeholder: 'Поиск...',
                    value: data.weekly1.name,
                    timeout: entry.amx
                });
            });

            describe('Проверка таблицы, после применения фильтра "Поиск..."', () => {
                decorate.el.table.size({
                    strCount: 1,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Название',
                    strNumber: 1,
                    cellNumber: 1,
                    value: data.weekly1.name,
                    timeout: entry.max
                });
            });

            describe(`Удаление "${data.weekly1.name}" из фильтра "Поиск..." и проверка таблицы`, () => {
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
                    strCount: 2,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Название',
                    strNumber: 1,
                    cellNumber: 1,
                    value: data.weekly2.name,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Название',
                    strNumber: 2,
                    cellNumber: 1,
                    value: data.weekly1.name,
                    timeout: entry.max
                });
            });
        });

        describe('API удаление недельного графика работы', () => {
            bef();
            aft();

            decItApi.deleteSchedule({
                name: data.weekly1.name
            });
            decItApi.deleteSchedule({
                name: data.weekly2.name
            });
        });
    });

    const deleteStaffSchedule = () => describe('Персонал / Графики работы. Попытка удаления графика добавленного ' +
        'сотруднику', () => {

        describe('API добавление', () => {
            bef();
            aft();

            it(`Добавление графика работы "${data.weekly1.name}"`, async () => {
                const cook = await page.base.getCookie('token');
                await dec.simple(api.putSchedule,
                    [[data.weekly1.db], cook.text],
                    api.putSchedule);
            });

            it(`Добавление сотрудника`, async () => {
                const cook = await page.base.getCookie('token');
                const arrSchedule = await api.getSchedule(cook.text);
                const scheduleId = arrSchedule.text.filter(obj => obj.name === data.weekly1.name)[0].id;
                const staff = {
                    last_name: 'staff',
                    first_name: 'name',
                    middle_name: '1',
                    hiring_date: '2023-01-01',
                    division: 1,
                    begin_datetime: '2023-01-01 00:00:00',
                    end_datetime: '2033-01-01 00:00:00',
                    work_schedule: scheduleId

                }
                await dec.simple(api.putStaff,
                    [[staff], cook.text],
                    api.putStaff);
            });
        });

        describe('Попытка удаления', () => {
            bef();
            aft();
            decorate.el.table.strHandler({
                strNumber: 1,
                timeout: entry.max
            });
            decorate.el.butIcBefore.handler({
                icon: but.delete,
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
            decorate.el.button.handler({
                name: 'Удалить',
                timeout: entry.max
            });
            decorate.el.error.error({
                text: 'График работы используется и не может быть удалён',
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
        });

        describe('API удаление', () => {
            bef();
            aft();

            it(`Удаление сотрудника`, async () => {
                const cook = await page.base.getCookie('token');
                const arrStaff = await api.getStaff(cook.text);
                const staff1 = arrStaff.text.filter(obj => obj.name === 'staff name 1')[0].id;

                await dec.simple(db.deleteUser,
                    [staff1],
                    db.deleteUser);
            });

            decItApi.deleteSchedule({
                name: data.weekly1.name
            });
        });
    });


    return {
        editWeek,
        editWeekInvalidParams,
        addWeekNoParams,
        copyWeek,
        editShift,
        editShiftInvalidParams,
        addShiftNoParams,
        copyShift,
        addAttendance,
        editAttendance,
        copyAttendance,
        addDuplicateAttendance,
        editViolation,
        editViolationInvalidParams,
        addViolationNoParams,
        copyViolation,
        addBalance,
        editBalance,
        copyBalance,
        searchFilter,
        deleteStaffSchedule,
        deleteSchedule,
        noStr
    }
}

module.exports = {
    otherSchedule: other(),
    bef: bef,
    aft: aft
}
