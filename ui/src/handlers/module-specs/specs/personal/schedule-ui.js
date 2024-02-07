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
    await dec.simple(page.staffPass.init, [entry.max], page.staffPass);
    await page.base.loading(2000);
});

const aft = () => after('Выход', async () => await dec.exit());

const other = () => {
    const addWeekMinParams = () => describe('Добавление недельного графика работы ' +
        'с минимальными количеством параметров', () => {



    });
}