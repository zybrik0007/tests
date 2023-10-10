const {it} = require('mocha');

const page = require('../../pages');
const api = require('../other/api');
const dec = require('../../dictionaries/decorate');

// Удаление подразделений
const deleteDivision = () => it('Удаление подразделений', async () => {
    const cook = await page.base.getCookie('token');
    const get = await api.getDivision(cook.text);
    const filter = get.text.map(item => item['id']).reverse();
    for(const id of filter) {
        await dec.simple(api.deleteDivision,
            [[id], cook.text],
            api.deleteDivision);
    }
});

// Удаление шаблонов доступа
const deleteAccess = () => it('Удаление шаблонов доступа', async () => {
    const cook = await page.base.getCookie('token');
    const get = await api.getAccessTemplate(cook.text);
    const filter = get.text.map(item => item['id']);
    await dec.simple(api.deleteAccessTemplate,
        [filter, cook.text],
        api.deleteAccessTemplate);
});

// Удаление графиков работы
const deleteSchedule = () => it('Удаление графиков работы', async () => {
    const cook = await page.base.getCookie('token');
    const get = await api.getSchedule(cook.text);
    const filter = get.text.map(item => item['id']);
    await dec.simple(api.deleteSchedule,
        [filter, cook.text],
        api.deleteSchedule);
});

// Удаление сотрудников
const deleteStaff = () => it('Удаление сотрудников', async () => {
    const cook = await page.base.getCookie('token');
    const get = await api.getStaff(cook.text);
    const filter = get.text.map(item => item['id']);
    await dec.simple(api.deleteStaff,
        [filter, cook.text],
        api.deleteStaff);
});

// Удаление посетителей
const deleteVisitor = () => it('Удаление посетителей', async () => {
    const cook = await page.base.getCookie('token');
    const get = await api.getVisitor(cook.text);
    const filter = get.text.map(item => item['id']);
    await dec.simple(api.deleteVisitor,
        [filter, cook.text],
        api.deleteStaff);
});

// Удаление должностей
const deletePosition= () => it('Удаление должностей', async () => {
    const cook = await page.base.getCookie('token');
    const get = await api.getPosition(cook.text);
    console.log('get', get)
    const filter = get.text.map(item => item['id']);
    await dec.simple(api.deletePosition,
        [filter, cook.text],
        api.deletePosition);
});

// Удаление временных зон
const deleteTZ = () => it('Удаление временных зон', async () => {
    const cook = await page.base.getCookie('token');
    const tz = await api.getAccessSchedules({type: 1}, cook.text);
    const filterTZ = JSON.parse(tz.text).intervals.filter(item => item.is_const !== 1);
    await dec.simple(api.deleteAccessSchedule,
        [filterTZ, cook.text],
        api.deleteAccessSchedule);
});

// Удаление недельных графиков
const deleteW = () =>  it('Удаление недельных графиков', async () => {
    const cook = await page.base.getCookie('token');
    const w = await api.getAccessSchedules({type: 2}, cook.text);
    const filterW = JSON.parse(w.text);
    await dec.simple(api.deleteAccessSchedule,
        [filterW, cook.text],
        api.deleteAccessSchedule);
});

// Удаление скользящих посуточных графиков
const deleteSTZ = () => it('Удаление скользящих посуточных графиков', async () => {
    const cook = await page.base.getCookie('token');
    const stz = await api.getAccessSchedules({type: 3}, cook.text);
    const filterSTZ = JSON.parse(stz.text).filter(item => item.is_const !== 1);
    await dec.simple(api.deleteAccessSchedule,
        [filterSTZ, cook.text],
        api.deleteAccessSchedule);
});

// Удаление скользящих понедельных графиков
const deleteSW = () => it('Удаление скользящих понедельных графиков', async () => {
    const cook = await page.base.getCookie('token');
    const sw = await api.getAccessSchedules({type: 4}, cook.text);
    const filterSW = JSON.parse(sw.text).filter(item => item.is_const !== 1);
    await dec.simple(api.deleteAccessSchedule,
        [filterSW, cook.text],
        api.deleteAccessSchedule);
});


module.exports = {
    deleteDivision,
    deleteAccess,
    deleteSchedule,
    deleteStaff,
    deleteVisitor,
    deletePosition,
    deleteTZ,
    deleteW,
    deleteSTZ,
    deleteSW
}