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
    await dec.auth(entry.customLogin, entry.customPassword);
    await dec.simple(el.section.handler, [sec.per, entry.max], el.section);
    await dec.simple(el.subsection.handler, [sub.per.schedule, entry.max], el.subsection);
    await dec.simple(page.schedule.init, [entry.max], page.schedule);
    await page.base.loading(2000);
});

const aft = () => after('Выход', async () => await dec.exit());

const other = () => {

    const addWeekMinParams = () => describe('Редактирование недельного графика работы ' +
        'с минимальными количеством параметров', () => {

/*        describe('API добавление недельного графика работы', () => {
            bef();
            aft();

            it(`Добавление графика работы "${data.weekly1.name}"`, async () => {
                const cook = await page.base.getCookie('token');
                await dec.simple(api.putSchedule,
                    [[data.weekly1.db], cook.text],
                    api.putSchedule);
            });
        });*/

        describe('Редактирование', () => {
            bef();
            //aft();

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

            /*describe('Общие параметры', () => {
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
                    value: data.weekly1.name,
                    timeout: entry.max
                });
                decorate.el.input.sendKeys({
                    title: 'Описание графика',
                    placeholder: '',
                    value: data.weekly1.description,
                    timeout: entry.max
                });
                decorate.el.select.iconXpand({
                    title: 'Тип графика',
                    value: 'Недельный',
                    text: 'Недельный',
                    timeout: entry.max
                });
            });*/

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
                    decorate.page.scheduleChange.startTimeSendKeys({
                        numInterval: 6,
                        numTime: 2,
                        value: data.weekly2.intervals.day6.interval2.begin,
                        timeout: entry.max
                    });
                    decorate.page.scheduleChange.endTimeSendKeys({
                        numInterval: 6,
                        numTime: 2,
                        value: data.weekly2.intervals.day6.interval2.end,
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

            });

        });
    });

    return {
        addWeekMinParams
    }
}


module.exports = {
    otherSchedule: other()
}
