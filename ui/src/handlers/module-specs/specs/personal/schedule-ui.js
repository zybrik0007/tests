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
                decorate.el.simpleCell.handler({
                    name: 'Интервалы',
                    timeout: entry.max
                });
                decorate.el.simpleCell.active({
                    name: 'Интервалы',
                    timeout: entry.max
                });
                decorate.page.scheduleChange.getTypeInterval({
                    numInterval: 1,
                    numTime: 1,
                    value: 'Полная смена',
                    timeout: entry.max
                });
/*                decorate.page.scheduleChange.selectTypeInterval({
                    numInterval: 1,
                    numTime: 1,
                    value: 'Конец смены',
                    timeout: entry.max
                });*/
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
