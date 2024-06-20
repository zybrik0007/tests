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
const data = require('../../data').dataTask;
const befPosition  = require('../personal/position-ui').befPosition;

const befOperator = () => before('Вход и открытие подраздела "Операторы"', async () => {
    await page.base.loading(entry.sleep1);
    await dec.auth(entry.customLogin, entry.customPassword);
    await dec.simple(el.section.handler, [sec.adm, entry.max], el.section);
    await dec.simple(el.subsection.handler, [sub.adm.operator, entry.max], el.subsection);
    await dec.simple(page.operator.init, [entry.max], page.operator);
    await page.base.loading(entry.sleep1);
});

const befRole = () => before('Вход и открытие подраздела "Роли и права операторов"', async () => {
    await page.base.loading(entry.sleep1);
    await dec.auth(entry.customLogin, entry.customPassword);
    await dec.simple(el.section.handler, [sec.adm, entry.max], el.section);
    await dec.simple(el.subsection.handler, [sub.adm.role, entry.max], el.subsection);
    await dec.simple(page.role.init, [entry.max], page.role);
    await page.base.loading(entry.sleep1);
});

const aft = () => after('Выход', async () => {
    await page.base.loading(entry.sleep1);
    await dec.exit();
});

const other = () => {

    const add = (type, text) => describe(text + 'Добавление.', () => {
        if(type === 'role') {}

        if(type === 'operator') {}
    });

    const edit = (type, text) => describe(text + 'Редактирование.', () => {
        if(type === 'role') {}

        if(type === 'operator') {}
    });

    const block = (type, text) => describe(text + 'Блокировка оператора.', () => {
        if(type === 'role') {}

        if(type === 'operator') {}
    });

    const unblock = (type, text) => describe(text + 'Разблокировка оператора.', () => {
        if(type === 'role') {}

        if(type === 'operator') {}
    });

    const copy = (type, text) => describe(text + 'Копирование.', () => {
        if(type === 'role') {}

        if(type === 'operator') {}
    });

    const search = (type, text) => describe(text + 'Проверка фльтра "Поиск...".', () => {
        if(type === 'role') {}

        if(type === 'operator') {}
    });

    const deleted = (type, text) => describe(text + 'Удаление.', () => {
        if(type === 'role') {}

        if(type === 'operator') {}
    });

    return {
        add,
        edit,
        block,
        unblock,
        copy,
        search,
        deleted
    }
}

module.exports = {
    other: other()
}