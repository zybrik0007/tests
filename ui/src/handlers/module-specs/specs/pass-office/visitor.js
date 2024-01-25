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
const data = require('../../data').dataStaff;

const befActive = () => before('Вход и открытие подраздела "Сотрудники" вкладка "Действующие"', async () => {
    await dec.auth(entry.customLogin, entry.customPassword);
    await dec.simple(el.section.handler, [sec.per, entry.max], el.section);
    await dec.simple(el.subsection.handler, [sub.per.staff, entry.max], el.subsection);
    await dec.simple(el.tab.handler, ['Действующие', entry.max], el.tab);
    await dec.simple(page.staffActive.init, [entry.max], page.staffActive);
    //await page.base.loading(2000);
});

const befDismissed = () => before('Вход и открытие подраздела "Сотрудники" вкладка "Уволенные"', async () => {
    await dec.auth(entry.customLogin, entry.customPassword);
    await dec.simple(el.section.handler, [sec.per, entry.max], el.section);
    await dec.simple(el.subsection.handler, [sub.per.staff, entry.max], el.subsection);
    await dec.simple(el.tab.handler, ['Уволенные', entry.max], el.tab);
    await dec.simple(page.staffDimissed.init, [entry.max], page.staffDimissed);
    await page.base.loading(2000);
});

const befPass = () => before('Вход и открытие подраздела "Сотрудники"', async () => {
    await dec.auth(entry.customLogin, entry.customPassword);
    await dec.simple(el.section.handler, [sec.pas, entry.max], el.section);
    await dec.simple(el.subsection.handler, [sub.pas.staff, entry.max], el.subsection);
    await dec.simple(page.staffPass.init, [entry.max], page.staffPass);
    await page.base.loading(2000);
});

const aft = () => after('Выход', async () => await dec.exit());

const other = (type, text) => {

}