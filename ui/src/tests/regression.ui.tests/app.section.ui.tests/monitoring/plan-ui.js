const {describe, it, before, after} = require('mocha');

const entry = require('../../../../../../entry');
const page = require('../../../../pages');
const el = require('../../../../elements');
const dec = require('../../../../dictionaries/decorate');
const sec = require('../../../../dictionaries/section');
const sub = require('../../../../dictionaries/subsection');
const but = require('../../../../dictionaries/button-icon');
const imp = require('../../../../upload-files');
const oth = require('../../../../other/other');
const api = require('../../../../dictionaries/api');
const deleteData = require('../../../../other/deleteData');
const decItApi = require('../../../../decorates/api-decorates/decorate-it-api');
const decorate = require('../../../../decorates');
const db = require('../../../../database');
const data = require('../../data').dataPosition;


const bef = () => before('Вход и открытие подраздела "Конфигурация верификации"', async () => {
    await dec.auth(entry.customLogin, entry.customPassword)
    await dec.simple(el.section.handler, [sec.ver, entry.max], el.section)
    await dec.simple(el.subsection.handler, [sub.ver.config, entry.max], el.subsection)
    await dec.simple(page.verifyConfig.init, [entry.max], page.verifyConfig)
});
const aft = () => after('Выход', async () => {
    await page.base.loading(entry.sleep1);
    await dec.exitNoLoader();
});

const other = () => {

    return {
    }
}

module.exports = {
    other: other(),
}
