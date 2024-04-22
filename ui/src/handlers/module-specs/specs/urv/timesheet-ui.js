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
const data = require('../../data').dataURV;
const url = require('../../../../dictionaries/url');

const bef = () => before('Вход и открытие подраздела "Формирование табеля"', async () => {
    await page.base.loading(entry.sleep1);
    await dec.auth(entry.customLogin, entry.customPassword);
    await dec.simple(el.section.handler, [sec.urv, entry.max], el.section);
    await dec.simple(el.subsection.handler, [sub.urv.tabel, entry.max], el.subsection);
    await dec.simple(page.timesheet.init, [entry.max], page.timesheet);
    await page.base.loading(entry.sleep1);
});

const aft = () => after('Выход', async () => {
    await page.base.loading(entry.sleep1);
    await dec.exit();
    await page.base.loading(entry.sleep1);
});

const other = () => {

    const checkTimesheet = () => describe('УРВ / Формировнаие табеля. Проверка табеля и расчетов.', () => {
        bef();
        aft();

        describe('Выбор Июнь 2023 - Весь месяц.', () => {
            describe('Выбрать "Считать за"', () => {
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.page.timesheet.selectIconExpand({
                    title: 'Считать за',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.selectXpand.xpand({
                    timeout: entry.max
                });
                decorate.el.selectXpand.handler({
                    value: 'Весь месяц',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.selectXpand.xpandNoElement({
                    timeout: entry.max
                });
            });

            describe('Выбрать "Месяц"', () => {
                decorate.page.timesheet.selectIconExpand({
                    title: 'Месяц',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.selectXpand.xpand({
                    timeout: entry.max
                });
                decorate.el.selectXpand.handler({
                    value: 'Июнь',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.selectXpand.xpandNoElement({
                    timeout: entry.max
                });
            });

            describe('Выбрать "Год"', () => {
                decorate.page.timesheet.selectIconExpand({
                    title: 'Год',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.selectXpand.xpand({
                    timeout: entry.max
                });
                decorate.el.selectXpand.handler({
                    value: '2023',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.selectXpand.xpandNoElement({
                    timeout: entry.max
                });
            });
        });

        describe('Формирование табеля', () => {
            decorate.el.button.handler({
                name: 'Сформировать табель',
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
        });

        describe('Проверка табеля', () => {

            describe('Проверка даты', () => {
                decorate.page.timesheet.table({
                    tr: 15,
                    td: 20,
                    value: '01.06.2023',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 15,
                    td: 21,
                    value: '30.06.2023',
                    timeout: entry.max
                });
            });

            describe('Проверка сотрудника 1', () => {
                decorate.page.timesheet.table({
                    tr: 32,
                    td: 1,
                    value: '1',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 32,
                    td: 2,
                    value: `${data.fio.staff1}\n${data.positions.position1.name}`,
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 32,
                    td: 3,
                    value: data.staffs.staff1.tabel_number,
                    timeout: entry.max
                });

                decorate.page.timesheet.table({
                    tr: 32,
                    td: 4,
                    value: 'я/н',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 32,
                    td: 5,
                    value: 'я/н',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 32,
                    td: 6,
                    value: 'я/н',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 32,
                    td: 7,
                    value: 'я/н',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 32,
                    td: 8,
                    value: 'я/н',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 32,
                    td: 9,
                    value: 'ОВ/н',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 32,
                    td: 10,
                    value: 'я/н',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 32,
                    td: 11,
                    value: 'я/н',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 32,
                    td: 12,
                    value: 'я/н',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 32,
                    td: 13,
                    value: 'я/н',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 32,
                    td: 14,
                    value: 'нн',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 32,
                    td: 15,
                    value: 'в',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 32,
                    td: 16,
                    value: 'нн',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 32,
                    td: 17,
                    value: 'нн',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 32,
                    td: 18,
                    value: 'нн',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 32,
                    td: 20,
                    value: '10',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 32,
                    td: 21,
                    value: '10',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 32,
                    td: 28,
                    value: 'ОВ',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 32,
                    td: 29,
                    value: '1()',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 32,
                    td: 30,
                    value: 'нн',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 32,
                    td: 31,
                    value: '18(140)',
                    timeout: entry.max
                });

                decorate.page.timesheet.table({
                    tr: 33,
                    td: 1,
                    value: '7/1',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 33,
                    td: 2,
                    value: '7/1',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 33,
                    td: 3,
                    value: '7/1',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 33,
                    td: 4,
                    value: '7/1',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 33,
                    td: 5,
                    value: '7/1',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 33,
                    td: 6,
                    value: '7/1',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 33,
                    td: 7,
                    value: '7/1',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 33,
                    td: 8,
                    value: '7/1',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 33,
                    td: 9,
                    value: '7/1',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 33,
                    td: 10,
                    value: '7/1',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 33,
                    td: 11,
                    value: '',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 33,
                    td: 12,
                    value: '',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 33,
                    td: 13,
                    value: '',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 33,
                    td: 14,
                    value: '',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 33,
                    td: 15,
                    value: '',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 33,
                    td: 17,
                    value: '80',
                    timeout: entry.max
                });
            });

            describe('Проверка сотруднка 2', () => {
                decorate.page.timesheet.table({
                    tr: 36,
                    td: 1,
                    value: '2',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 36,
                    td: 2,
                    value: `${data.fio.staff2}\n${data.positions.position2.name}`,
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 36,
                    td: 3,
                    value: data.staffs.staff2.tabel_number,
                    timeout: entry.max
                });

                decorate.page.timesheet.table({
                    tr: 36,
                    td: 4,
                    value: 'в',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 36,
                    td: 5,
                    value: 'я/н',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 36,
                    td: 6,
                    value: 'в',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 36,
                    td: 7,
                    value: 'я/н',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 36,
                    td: 8,
                    value: 'в',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 36,
                    td: 9,
                    value: 'я/н',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 36,
                    td: 10,
                    value: 'в',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 36,
                    td: 11,
                    value: 'я/н',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 36,
                    td: 12,
                    value: 'в',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 36,
                    td: 13,
                    value: 'ОВ/н',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 36,
                    td: 14,
                    value: 'в',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 36,
                    td: 15,
                    value: 'я/н',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 36,
                    td: 16,
                    value: 'в',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 36,
                    td: 17,
                    value: 'я/н',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 36,
                    td: 18,
                    value: 'в',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 36,
                    td: 20,
                    value: '7',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 36,
                    td: 21,
                    value: '9',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 36,
                    td: 28,
                    value: 'ОВ',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 36,
                    td: 29,
                    value: '1()',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 36,
                    td: 30,
                    value: 'нн',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 36,
                    td: 31,
                    value: '6(198)',
                    timeout: entry.max
                });

                decorate.page.timesheet.table({
                    tr: 37,
                    td: 1,
                    value: '',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 37,
                    td: 2,
                    value: '31/2',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 37,
                    td: 3,
                    value: '',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 37,
                    td: 4,
                    value: '31/2',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 37,
                    td: 5,
                    value: '',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 37,
                    td: 6,
                    value: '31/2',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 37,
                    td: 7,
                    value: '',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 37,
                    td: 8,
                    value: '31/2',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 37,
                    td: 9,
                    value: '',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 37,
                    td: 10,
                    value: '31/2',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 37,
                    td: 11,
                    value: '',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 37,
                    td: 12,
                    value: '31/2',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 37,
                    td: 13,
                    value: '',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 37,
                    td: 14,
                    value: '31/2',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 37,
                    td: 15,
                    value: '',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 37,
                    td: 17,
                    value: '229',
                    timeout: entry.max
                });

                decorate.page.timesheet.table({
                    tr: 38,
                    td: 1,
                    value: 'я/н',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 38,
                    td: 2,
                    value: 'в',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 38,
                    td: 3,
                    value: 'я/н',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 38,
                    td: 4,
                    value: 'в',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 38,
                    td: 5,
                    value: 'нн',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 38,
                    td: 17,
                    value: '2',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 38,
                    td: 18,
                    value: '294',
                    timeout: entry.max
                });

                decorate.page.timesheet.table({
                    tr: 39,
                    td: 1,
                    value: '31/2',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 39,
                    td: 2,
                    value: '',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 39,
                    td: 3,
                    value: '31/2',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 39,
                    td: 4,
                    value: '',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 39,
                    td: 5,
                    value: '',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 39,
                    td: 17,
                    value: '65',
                    timeout: entry.max
                });
            });

            describe('Проверка сотруднка 3', () => {
                decorate.page.timesheet.table({
                    tr: 40,
                    td: 1,
                    value: '3',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 40,
                    td: 2,
                    value: `${data.fio.staff3}\n${data.positions.position3.name}`,
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 40,
                    td: 3,
                    value: data.staffs.staff3.tabel_number,
                    timeout: entry.max
                });

                decorate.page.timesheet.table({
                    tr: 40,
                    td: 4,
                    value: 'я/н',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 40,
                    td: 5,
                    value: 'в',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 40,
                    td: 20,
                    value: '1',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 40,
                    td: 21,
                    value: '1',
                    timeout: entry.max
                });

                decorate.page.timesheet.table({
                    tr: 41,
                    td: 1,
                    value: '23/1',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 41,
                    td: 17,
                    value: '24',
                    timeout: entry.max
                });

                decorate.page.timesheet.table({
                    tr: 42,
                    td: 17,
                    value: '0',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 42,
                    td: 18,
                    value: '24',
                    timeout: entry.max
                });

                decorate.page.timesheet.table({
                    tr: 43,
                    td: 17,
                    value: '',
                    timeout: entry.max
                });
            });

            describe('Проверка сотрудника 4', () => {
                decorate.page.timesheet.table({
                    tr: 44,
                    td: 1,
                    value: '4',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 44,
                    td: 2,
                    value: `${data.fio.staff4}\n${data.positions.position4.name}`,
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 44,
                    td: 3,
                    value: data.staffs.staff4.tabel_number,
                    timeout: entry.max
                });

                decorate.page.timesheet.table({
                    tr: 44,
                    td: 4,
                    value: 'я/н',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 44,
                    td: 5,
                    value: 'я/н',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 44,
                    td: 6,
                    value: 'я/н',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 44,
                    td: 7,
                    value: 'я/н',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 44,
                    td: 8,
                    value: 'я/н',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 44,
                    td: 9,
                    value: 'я/н',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 44,
                    td: 10,
                    value: 'я/н',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 44,
                    td: 11,
                    value: 'я/н',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 44,
                    td: 12,
                    value: 'я/н',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 44,
                    td: 13,
                    value: 'я/н',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 44,
                    td: 14,
                    value: 'я/н',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 44,
                    td: 15,
                    value: 'в',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 44,
                    td: 16,
                    value: 'нн',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 44,
                    td: 28,
                    value: 'нн',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 44,
                    td: 29,
                    value: '17(132)',
                    timeout: entry.max
                });

                decorate.page.timesheet.table({
                    tr: 45,
                    td: 1,
                    value: '7/1',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 45,
                    td: 2,
                    value: '7/1',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 45,
                    td: 3,
                    value: '7/1',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 45,
                    td: 4,
                    value: '7/1',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 45,
                    td: 5,
                    value: '7/1',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 45,
                    td: 6,
                    value: '7/1',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 45,
                    td: 7,
                    value: '7/1',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 45,
                    td: 8,
                    value: '7/1',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 45,
                    td: 9,
                    value: '7/1',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 45,
                    td: 10,
                    value: '7/1',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 45,
                    td: 11,
                    value: '7/1',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 45,
                    td: 12,
                    value: '',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 45,
                    td: 13,
                    value: '',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 45,
                    td: 14,
                    value: '',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 45,
                    td: 15,
                    value: '',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 45,
                    td: 17,
                    value: '88',
                    timeout: entry.max
                });
            });

            describe('Проверка сотрудника 5', () => {
                decorate.page.timesheet.table({
                    tr: 48,
                    td: 1,
                    value: '5',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 48,
                    td: 2,
                    value: `${data.fio.staff5}\n${data.positions.position5.name}`,
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 48,
                    td: 3,
                    value: data.staffs.staff5.tabel_number,
                    timeout: entry.max
                });

                decorate.page.timesheet.table({
                    tr: 48,
                    td: 4,
                    value: 'я/н',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 48,
                    td: 5,
                    value: 'я/н',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 48,
                    td: 6,
                    value: 'я/н',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 48,
                    td: 7,
                    value: 'я/н',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 48,
                    td: 8,
                    value: 'я/н',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 48,
                    td: 9,
                    value: 'я/н',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 48,
                    td: 10,
                    value: 'я/н',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 48,
                    td: 11,
                    value: 'я/н',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 48,
                    td: 12,
                    value: 'нн',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 48,
                    td: 13,
                    value: 'нн',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 48,
                    td: 14,
                    value: 'нн',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 48,
                    td: 15,
                    value: 'в',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 48,
                    td: 16,
                    value: 'нн',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 48,
                    td: 28,
                    value: 'нн',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 48,
                    td: 29,
                    value: '20(156)',
                    timeout: entry.max
                });

                decorate.page.timesheet.table({
                    tr: 49,
                    td: 1,
                    value: '7/1',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 49,
                    td: 2,
                    value: '7/1',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 49,
                    td: 3,
                    value: '7/1',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 49,
                    td: 4,
                    value: '7/1',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 49,
                    td: 5,
                    value: '7/1',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 49,
                    td: 6,
                    value: '7/1',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 49,
                    td: 7,
                    value: '7/1',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 49,
                    td: 8,
                    value: '7/1',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 49,
                    td: 12,
                    value: '',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 47,
                    td: 13,
                    value: '',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 49,
                    td: 14,
                    value: '',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 49,
                    td: 15,
                    value: '',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 49,
                    td: 17,
                    value: '64',
                    timeout: entry.max
                });
            });
        });
    });

    const showMinuteTimesheet = () => describe('УРВ / Формировнаие табеля. ' +
        'Проверка настройки "Показать минуты."', () => {

        bef();
        aft();

        describe('Выбор Июнь 2023 - Весь месяц.', () => {
            describe('Выбрать "Считать за"', () => {
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.page.timesheet.selectIconExpand({
                    title: 'Считать за',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.selectXpand.xpand({
                    timeout: entry.max
                });
                decorate.el.selectXpand.handler({
                    value: 'Весь месяц',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.selectXpand.xpandNoElement({
                    timeout: entry.max
                });
            });

            describe('Выбрать "Месяц"', () => {
                decorate.page.timesheet.selectIconExpand({
                    title: 'Месяц',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.selectXpand.xpand({
                    timeout: entry.max
                });
                decorate.el.selectXpand.handler({
                    value: 'Июнь',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.selectXpand.xpandNoElement({
                    timeout: entry.max
                });
            });

            describe('Выбрать "Год"', () => {
                decorate.page.timesheet.selectIconExpand({
                    title: 'Год',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.selectXpand.xpand({
                    timeout: entry.max
                });
                decorate.el.selectXpand.handler({
                    value: '2023',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.selectXpand.xpandNoElement({
                    timeout: entry.max
                });
            });
        });

        describe('Формирование табеля', () => {
            decorate.el.button.handler({
                name: 'Сформировать табель',
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
        });

        describe('Включение настройки "Показать минуты" и формирование табеля', () => {
            decorate.el.checkbox.handler({
                name: 'Показать минуты',
                timeout: entry.max
            });
            decorate.el.checkbox.checked({
                name: 'Показать минуты',
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
            decorate.el.button.handler({
                name: 'Сформировать табель',
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
        });

        describe('Проверка табеля с включенной настройкой "Показать минуты"', () => {
            decorate.page.timesheet.table({
                tr: 33,
                td: 1,
                value: '7:00/1:00',
                timeout: entry.max
            });
            decorate.page.timesheet.table({
                tr: 33,
                td: 8,
                value: '6:58/1:00',
                timeout: entry.max
            });
            decorate.page.timesheet.table({
                tr: 32,
                td: 29,
                value: '1(0:02)',
                timeout: entry.max
            });
        });

        describe('Отключение настройки "Показать минуты" и формирование табеля', () => {
            decorate.el.checkbox.handler({
                name: 'Показать минуты',
                timeout: entry.max
            });
            decorate.el.checkbox.unchecked({
                name: 'Показать минуты',
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
            decorate.el.button.handler({
                name: 'Сформировать табель',
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
        });

        describe('Проверка табеля с выключенной настройкой "Показать минуты"', () => {
            decorate.page.timesheet.table({
                tr: 33,
                td: 1,
                value: '7/1',
                timeout: entry.max
            });
            decorate.page.timesheet.table({
                tr: 33,
                td: 8,
                value: '7/1',
                timeout: entry.max
            });
            decorate.page.timesheet.table({
                tr: 32,
                td: 29,
                value: '1()',
                timeout: entry.max
            });
        });
    });

    const filterDateTimesheet = () => describe('УРВ / Формировнаие табеля. Проверка фильтра "Считать за."', () => {

        bef();
        aft();

        describe('Выбор Июнь 2023 - Первую половину месяца.', () => {
            describe('Выбрать "Считать за"', () => {
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.page.timesheet.selectIconExpand({
                    title: 'Считать за',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.selectXpand.xpand({
                    timeout: entry.max
                });
                decorate.el.selectXpand.handler({
                    value: 'Первую половину месяца',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.selectXpand.xpandNoElement({
                    timeout: entry.max
                });
            });

            describe('Выбрать "Месяц"', () => {
                decorate.page.timesheet.selectIconExpand({
                    title: 'Месяц',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.selectXpand.xpand({
                    timeout: entry.max
                });
                decorate.el.selectXpand.handler({
                    value: 'Июнь',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.selectXpand.xpandNoElement({
                    timeout: entry.max
                });
            });

            describe('Выбрать "Год"', () => {
                decorate.page.timesheet.selectIconExpand({
                    title: 'Год',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.selectXpand.xpand({
                    timeout: entry.max
                });
                decorate.el.selectXpand.handler({
                    value: '2023',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.selectXpand.xpandNoElement({
                    timeout: entry.max
                });
            });
        });

        describe('Формирование табеля', () => {
            decorate.el.button.handler({
                name: 'Сформировать табель',
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
        });

        describe('Проверка табеля с настройкой "Считать за" - "Первую половину месяца".', () => {

            describe('Проверка даты', () => {
                decorate.page.timesheet.table({
                    tr: 15,
                    td: 20,
                    value: '01.06.2023',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 15,
                    td: 21,
                    value: '15.06.2023',
                    timeout: entry.max
                });
            });

            describe('Проверка сотрудника 2', () => {
                decorate.page.timesheet.table({
                    tr: 36,
                    td: 4,
                    value: 'в',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 36,
                    td: 5,
                    value: 'я/н',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 36,
                    td: 18,
                    value: 'в',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 36,
                    td: 20,
                    value: '7',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 36,
                    td: 21,
                    value: '7',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 36,
                    td: 30,
                    value: '',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 36,
                    td: 31,
                    value: '',
                    timeout: entry.max
                });

                decorate.page.timesheet.table({
                    tr: 37,
                    td: 1,
                    value: '',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 37,
                    td: 2,
                    value: '31/2',
                    timeout: entry.max
                });

                decorate.page.timesheet.table({
                    tr: 38,
                    td: 1,
                    value: '',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 38,
                    td: 15,
                    value: '',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 38,
                    td: 17,
                    value: '0',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 38,
                    td: 18,
                    value: '229',
                    timeout: entry.max
                });

                decorate.page.timesheet.table({
                    tr: 39,
                    td: 1,
                    value: '',
                    timeout: entry.max
                });
            });
        });

        describe('Выбор Июнь 2023 - Вторую половину месяца.', () => {
            describe('Выбрать "Считать за"', () => {
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.page.timesheet.selectIconExpand({
                    title: 'Считать за',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.selectXpand.xpand({
                    timeout: entry.max
                });
                decorate.el.selectXpand.handler({
                    value: 'Вторую половину месяца',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.selectXpand.xpandNoElement({
                    timeout: entry.max
                });
            });
        });

        describe('Формирование табеля', () => {
            decorate.el.button.handler({
                name: 'Сформировать табель',
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
        });

        describe('Проверка табеля с настройкой "Считать за" - "Вторую половину месяца".', () => {

            describe('Проверка даты', () => {
                decorate.page.timesheet.table({
                    tr: 15,
                    td: 20,
                    value: '16.06.2023',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 15,
                    td: 21,
                    value: '30.06.2023',
                    timeout: entry.max
                });
            });

            describe('Проверка сотрудника 2', () => {
                decorate.page.timesheet.table({
                    tr: 36,
                    td: 4,
                    value: '',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 36,
                    td: 5,
                    value: '',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 36,
                    td: 18,
                    value: '',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 36,
                    td: 20,
                    value: '0',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 36,
                    td: 21,
                    value: '2',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 36,
                    td: 28,
                    value: 'нн',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 36,
                    td: 29,
                    value: '6(198)',
                    timeout: entry.max
                });

                decorate.page.timesheet.table({
                    tr: 37,
                    td: 1,
                    value: '',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 37,
                    td: 2,
                    value: '',
                    timeout: entry.max
                });

                decorate.page.timesheet.table({
                    tr: 38,
                    td: 1,
                    value: 'я/н',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 38,
                    td: 15,
                    value: 'нн',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 38,
                    td: 17,
                    value: '2',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 38,
                    td: 18,
                    value: '65',
                    timeout: entry.max
                });

                decorate.page.timesheet.table({
                    tr: 39,
                    td: 17,
                    value: '65',
                    timeout: entry.max
                });
            });
        });

        describe('Выбор Июнь 2023 - Указанный период - 05.06.2023 - 06.06.2023.', () => {
            describe('Выбрать "Считать за"', () => {
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.page.timesheet.selectIconExpand({
                    title: 'Считать за',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.selectXpand.xpand({
                    timeout: entry.max
                });
                decorate.el.selectXpand.handler({
                    value: 'Указанный период',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.selectXpand.xpandNoElement({
                    timeout: entry.max
                });
                decorate.el.input.iconCalendar({
                    title: 'Период',
                    placeholder: '',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.datepicker.dateParse({
                    day: 5,
                    month: 'Июнь',
                    year: '2023',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.datepicker.daySelect({
                    day: 6,
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.datepicker.applyHandler({
                    timeout: entry.max
                });
                decorate.el.datepicker.datepickerNoElement({
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
            });
        });

        describe('Формирование табеля', () => {
            decorate.el.button.handler({
                name: 'Сформировать табель',
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
        });

        describe('Проверка табеля с настройкой "Считать за" - "Указанный период".', () => {

            describe('Проверка даты', () => {
                decorate.page.timesheet.table({
                    tr: 15,
                    td: 20,
                    value: '05.06.2023',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 15,
                    td: 21,
                    value: '06.06.2023',
                    timeout: entry.max
                });
            });

            describe('Проверка сотрудника 1', () => {
                decorate.page.timesheet.table({
                    tr: 32,
                    td: 4,
                    value: '',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 32,
                    td: 7,
                    value: '',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 32,
                    td: 8,
                    value: 'я/н',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 32,
                    td: 9,
                    value: 'ОВ/н',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 32,
                    td: 18,
                    value: '',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 32,
                    td: 20,
                    value: '2',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 32,
                    td: 21,
                    value: '2',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 32,
                    td: 28,
                    value: 'ОВ',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 32,
                    td: 29,
                    value: '1()',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 32,
                    td: 30,
                    value: '',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 32,
                    td: 31,
                    value: '',
                    timeout: entry.max
                });

                decorate.page.timesheet.table({
                    tr: 33,
                    td: 1,
                    value: '',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 33,
                    td: 4,
                    value: '',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 33,
                    td: 5,
                    value: '7/1',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 33,
                    td: 6,
                    value: '7/1',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 33,
                    td: 7,
                    value: '',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 33,
                    td: 15,
                    value: '',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 33,
                    td: 17,
                    value: '16',
                    timeout: entry.max
                });

                decorate.page.timesheet.table({
                    tr: 34,
                    td: 1,
                    value: '',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 34,
                    td: 15,
                    value: '',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 35,
                    td: 1,
                    value: '',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 35,
                    td: 15,
                    value: '',
                    timeout: entry.max
                });
            });
        });

    });

    const filterDivisionTimesheet = () => describe('УРВ / Формировнаие табеля. Проверка фильтра "Подразделние".', () => {

        bef();
        aft();

        describe('Выбор Июнь 2023 - Весь месяц.', () => {
            describe('Выбрать "Считать за"', () => {
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.page.timesheet.selectIconExpand({
                    title: 'Считать за',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.selectXpand.xpand({
                    timeout: entry.max
                });
                decorate.el.selectXpand.handler({
                    value: 'Весь месяц',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.selectXpand.xpandNoElement({
                    timeout: entry.max
                });
            });

            describe('Выбрать "Месяц"', () => {
                decorate.page.timesheet.selectIconExpand({
                    title: 'Месяц',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.selectXpand.xpand({
                    timeout: entry.max
                });
                decorate.el.selectXpand.handler({
                    value: 'Июнь',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.selectXpand.xpandNoElement({
                    timeout: entry.max
                });
            });

            describe('Выбрать "Год"', () => {
                decorate.page.timesheet.selectIconExpand({
                    title: 'Год',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.selectXpand.xpand({
                    timeout: entry.max
                });
                decorate.el.selectXpand.handler({
                    value: '2023',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.selectXpand.xpandNoElement({
                    timeout: entry.max
                });
            });
        });

        describe(`Выбор "${data.divisions.division1.name}" через окно выбора`, () => {
            decorate.el.selectInput.iconXpand({
                title: '',
                placeholder: 'Подразделение',
                timeout: entry.max
            });
            decorate.el.selectXpand.xpand({
                timeout: entry.max
            });
            decorate.el.selectXpand.handler({
                value: data.divisions.division1.name,
                timeout: entry.max
            });
            decorate.el.selectXpand.xpandNoElement({
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
        });

        describe(`Выбор "${data.divisions.division2.name}" через модальное окно "Подразделение"`, () => {
            decorate.el.selectInput.iconOutline({
                title: '',
                placeholder: 'Подразделение',
                timeout: entry.max
            });
            decorate.modal.divisionFilter.init({
                timeout: entry.max
            });
            decorate.el.filterTreeNode.handler({
                name: data.divisions.division2.name,
                timeout: entry.max
            });
            decorate.el.button.handler({
                name: 'Выбрать',
                timeout: entry.max
            });
            decorate.modal.divisionFilter.initClose({
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
        });

        describe('Формирование табеля', () => {
            decorate.el.button.handler({
                name: 'Сформировать табель',
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
        });

        describe('Проверка табеля', () => {

            describe('Проверка даты', () => {
                decorate.page.timesheet.table({
                    tr: 15,
                    td: 20,
                    value: '01.06.2023',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 15,
                    td: 21,
                    value: '30.06.2023',
                    timeout: entry.max
                });
            });

            describe('Проверка сотрудника 1', () => {
                decorate.page.timesheet.table({
                    tr: 32,
                    td: 1,
                    value: '1',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 32,
                    td: 2,
                    value: `${data.fio.staff2}\n${data.positions.position2.name}`,
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 32,
                    td: 3,
                    value: data.staffs.staff2.tabel_number,
                    timeout: entry.max
                });

                decorate.page.timesheet.table({
                    tr: 32,
                    td: 4,
                    value: 'в',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 32,
                    td: 5,
                    value: 'я/н',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 32,
                    td: 6,
                    value: 'в',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 32,
                    td: 7,
                    value: 'я/н',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 32,
                    td: 8,
                    value: 'в',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 32,
                    td: 9,
                    value: 'я/н',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 32,
                    td: 10,
                    value: 'в',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 32,
                    td: 11,
                    value: 'я/н',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 32,
                    td: 12,
                    value: 'в',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 32,
                    td: 13,
                    value: 'ОВ/н',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 32,
                    td: 14,
                    value: 'в',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 32,
                    td: 15,
                    value: 'я/н',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 32,
                    td: 16,
                    value: 'в',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 32,
                    td: 17,
                    value: 'я/н',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 32,
                    td: 18,
                    value: 'в',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 32,
                    td: 20,
                    value: '7',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 32,
                    td: 21,
                    value: '9',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 32,
                    td: 28,
                    value: 'ОВ',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 32,
                    td: 29,
                    value: '1()',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 32,
                    td: 30,
                    value: 'нн',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 32,
                    td: 31,
                    value: '6(198)',
                    timeout: entry.max
                });

                decorate.page.timesheet.table({
                    tr: 33,
                    td: 1,
                    value: '',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 33,
                    td: 2,
                    value: '31/2',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 33,
                    td: 3,
                    value: '',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 33,
                    td: 4,
                    value: '31/2',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 33,
                    td: 5,
                    value: '',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 33,
                    td: 6,
                    value: '31/2',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 33,
                    td: 7,
                    value: '',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 33,
                    td: 8,
                    value: '31/2',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 33,
                    td: 9,
                    value: '',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 33,
                    td: 10,
                    value: '31/2',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 33,
                    td: 11,
                    value: '',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 33,
                    td: 12,
                    value: '31/2',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 33,
                    td: 13,
                    value: '',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 33,
                    td: 14,
                    value: '31/2',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 33,
                    td: 15,
                    value: '',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 33,
                    td: 17,
                    value: '229',
                    timeout: entry.max
                });

                decorate.page.timesheet.table({
                    tr: 34,
                    td: 1,
                    value: 'я/н',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 34,
                    td: 2,
                    value: 'в',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 34,
                    td: 3,
                    value: 'я/н',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 34,
                    td: 4,
                    value: 'в',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 34,
                    td: 5,
                    value: 'нн',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 34,
                    td: 17,
                    value: '2',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 34,
                    td: 18,
                    value: '294',
                    timeout: entry.max
                });

                decorate.page.timesheet.table({
                    tr: 35,
                    td: 1,
                    value: '31/2',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 35,
                    td: 2,
                    value: '',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 35,
                    td: 3,
                    value: '31/2',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 35,
                    td: 4,
                    value: '',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 35,
                    td: 5,
                    value: '',
                    timeout: entry.max
                });
                decorate.page.timesheet.table({
                    tr: 35,
                    td: 17,
                    value: '65',
                    timeout: entry.max
                });
            });

            describe('Проверка сотрудника 2', () => {
                it('Отсутствие сотрудника 2', async () => await dec.simpleFalse(page.timesheet.table,
                    [36, 3, entry.min],
                    page.timesheet));
            });

        });

    });

    const downloadXLSXTimesheet = () => describe('УРВ / Формирование табеля. Проверка "Скачать файл в Excel".', () => {

        const params = {
            nameFile: 't13.xlsx',
            json: [
                {
                    __EMPTY_20: 'Постановление Госкомстата РФ от 5 января 2004 г. № 1'
                },
                {
                    __EMPTY_14: '"Об утверждении унифицированных форм первичной учетной документации по учету труда и его оплаты"'
                },
                { __EMPTY_27: 'Код' },
                { __EMPTY_24: 'Форма по ОКУД', __EMPTY_27: '0301008' },
                { __EMPTY_1: 'наименование организации', __EMPTY_24: 'по ОКПО' },
                { __EMPTY_1: '' },
                { __EMPTY_1: 'структурное подразделение' },
                {
                    __EMPTY_17: 'Номер документа',
                    __EMPTY_19: 'Дата составления',
                    __EMPTY_22: 'Отчетный период'
                },
                { __EMPTY_22: 'с', __EMPTY_24: 'по' },
                { __EMPTY_22: '01.06.2023', __EMPTY_24: '30.06.2023' },
                { __EMPTY_5: 'ТАБЕЛЬ' },
                { __EMPTY_5: 'учета рабочего времени' },
                {
                    __EMPTY: 'Номер по порядку',
                    __EMPTY_1: 'Фамилия, инициалы, должность (специальность, профессия)',
                    __EMPTY_2: 'Табельный номер ',
                    __EMPTY_3: 'Отметки о явках и неявках на работу по числам месяца',
                    __EMPTY_19: 'Отработано за',
                    __EMPTY_21: 'Данные для начисления заработной платы по видам и направлениям затрат',
                    __EMPTY_26: 'Неявки по причинам'
                },
                {
                    __EMPTY_3: 1,
                    __EMPTY_4: 2,
                    __EMPTY_5: 3,
                    __EMPTY_6: 4,
                    __EMPTY_7: 5,
                    __EMPTY_8: 6,
                    __EMPTY_9: 7,
                    __EMPTY_10: 8,
                    __EMPTY_11: 9,
                    __EMPTY_12: 10,
                    __EMPTY_13: 11,
                    __EMPTY_14: 12,
                    __EMPTY_15: 13,
                    __EMPTY_16: 14,
                    __EMPTY_17: 15,
                    __EMPTY_18: 'X',
                    __EMPTY_19: 'половину месяца (I, II)',
                    __EMPTY_20: 'месяц',
                    __EMPTY_21: 'код вида оплаты',
                    __EMPTY_26: 'код',
                    __EMPTY_27: 'дни (часы)',
                    __EMPTY_28: 'код',
                    __EMPTY_29: 'дни (часы)'
                },
                { __EMPTY_21: 'корреспондирующий счет' },
                {
                    __EMPTY_21: 'код вида оплаты',
                    __EMPTY_22: 'корре-спондир-ующий счет',
                    __EMPTY_23: 'дни (часы)',
                    'Унифицированная форма № Т-13': 'код вида оплаты',
                    __EMPTY_24: 'корре-спондир-ующий счет',
                    __EMPTY_25: 'дни (часы)'
                },
                {
                    __EMPTY_3: 16,
                    __EMPTY_4: 17,
                    __EMPTY_5: 18,
                    __EMPTY_6: 19,
                    __EMPTY_7: 20,
                    __EMPTY_8: 21,
                    __EMPTY_9: 22,
                    __EMPTY_10: 23,
                    __EMPTY_11: 24,
                    __EMPTY_12: 25,
                    __EMPTY_13: 26,
                    __EMPTY_14: 27,
                    __EMPTY_15: 28,
                    __EMPTY_16: 29,
                    __EMPTY_17: 30,
                    __EMPTY_18: 31
                },
                { __EMPTY_19: 'дни' },
                { __EMPTY_19: 'часы' },
                {
                    __EMPTY: 1,
                    __EMPTY_1: 2,
                    __EMPTY_2: 3,
                    __EMPTY_3: 4,
                    __EMPTY_19: 5,
                    __EMPTY_20: 6,
                    __EMPTY_21: 7,
                    __EMPTY_22: 8,
                    __EMPTY_23: 9,
                    'Унифицированная форма № Т-13': 7,
                    __EMPTY_24: 8,
                    __EMPTY_25: 9,
                    __EMPTY_26: 10,
                    __EMPTY_27: 11,
                    __EMPTY_28: 12,
                    __EMPTY_29: 13
                },
                {
                    __EMPTY: 1,
                    __EMPTY_1: 'staff name 1\nposition1',
                    __EMPTY_2: '1',
                    __EMPTY_3: 'я/н',
                    __EMPTY_4: 'я/н',
                    __EMPTY_5: 'я/н',
                    __EMPTY_6: 'я/н',
                    __EMPTY_7: 'я/н',
                    __EMPTY_8: 'ОВ/н',
                    __EMPTY_9: 'я/н',
                    __EMPTY_10: 'я/н',
                    __EMPTY_11: 'я/н',
                    __EMPTY_12: 'я/н',
                    __EMPTY_13: 'нн',
                    __EMPTY_14: 'в',
                    __EMPTY_15: 'нн',
                    __EMPTY_16: 'нн',
                    __EMPTY_17: 'нн',
                    __EMPTY_18: 'X',
                    __EMPTY_19: 10,
                    __EMPTY_20: 10,
                    __EMPTY_26: 'ОВ',
                    __EMPTY_27: '1 ()',
                    __EMPTY_28: 'нн',
                    __EMPTY_29: '18 (140)'
                },
                {
                    __EMPTY_3: '7/1',
                    __EMPTY_4: '7/1',
                    __EMPTY_5: '7/1',
                    __EMPTY_6: '7/1',
                    __EMPTY_7: '7/1',
                    __EMPTY_8: '7/1',
                    __EMPTY_9: '7/1',
                    __EMPTY_10: '7/1',
                    __EMPTY_11: '7/1',
                    __EMPTY_12: '7/1',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: '',
                    __EMPTY_16: '',
                    __EMPTY_17: '',
                    __EMPTY_18: 'X',
                    __EMPTY_19: 80,
                    __EMPTY_26: '',
                    __EMPTY_27: '',
                    __EMPTY_28: '',
                    __EMPTY_29: ''
                },
                {
                    __EMPTY_3: 'в',
                    __EMPTY_4: 'нн',
                    __EMPTY_5: 'нн',
                    __EMPTY_6: 'нн',
                    __EMPTY_7: 'нн',
                    __EMPTY_8: 'нн',
                    __EMPTY_9: 'нн',
                    __EMPTY_10: 'нн',
                    __EMPTY_11: 'нн',
                    __EMPTY_12: 'нн',
                    __EMPTY_13: 'нн',
                    __EMPTY_14: 'нн',
                    __EMPTY_15: 'нн',
                    __EMPTY_16: 'нн',
                    __EMPTY_17: 'нн',
                    __EMPTY_19: 0,
                    __EMPTY_20: 80,
                    __EMPTY_26: '',
                    __EMPTY_27: '',
                    __EMPTY_28: '',
                    __EMPTY_29: ''
                },
                {
                    __EMPTY_3: '',
                    __EMPTY_4: '',
                    __EMPTY_5: '',
                    __EMPTY_6: '',
                    __EMPTY_7: '',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '',
                    __EMPTY_11: '',
                    __EMPTY_12: '',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: '',
                    __EMPTY_16: '',
                    __EMPTY_17: '',
                    __EMPTY_19: '',
                    __EMPTY_26: '',
                    __EMPTY_27: '',
                    __EMPTY_28: '',
                    __EMPTY_29: ''
                },
                {
                    __EMPTY: 2,
                    __EMPTY_1: 'staff name 2\nposition2',
                    __EMPTY_2: '2',
                    __EMPTY_3: 'в',
                    __EMPTY_4: 'я/н',
                    __EMPTY_5: 'в',
                    __EMPTY_6: 'я/н',
                    __EMPTY_7: 'в',
                    __EMPTY_8: 'я/н',
                    __EMPTY_9: 'в',
                    __EMPTY_10: 'я/н',
                    __EMPTY_11: 'в',
                    __EMPTY_12: 'ОВ/н',
                    __EMPTY_13: 'в',
                    __EMPTY_14: 'я/н',
                    __EMPTY_15: 'в',
                    __EMPTY_16: 'я/н',
                    __EMPTY_17: 'в',
                    __EMPTY_18: 'X',
                    __EMPTY_19: 7,
                    __EMPTY_20: 9,
                    __EMPTY_26: 'ОВ',
                    __EMPTY_27: '1 ()',
                    __EMPTY_28: 'нн',
                    __EMPTY_29: '6 (198)'
                },
                {
                    __EMPTY_3: '',
                    __EMPTY_4: '31/2',
                    __EMPTY_5: '',
                    __EMPTY_6: '31/2',
                    __EMPTY_7: '',
                    __EMPTY_8: '31/2',
                    __EMPTY_9: '',
                    __EMPTY_10: '31/2',
                    __EMPTY_11: '',
                    __EMPTY_12: '31/2',
                    __EMPTY_13: '',
                    __EMPTY_14: '31/2',
                    __EMPTY_15: '',
                    __EMPTY_16: '31/2',
                    __EMPTY_17: '',
                    __EMPTY_18: 'X',
                    __EMPTY_19: 229,
                    __EMPTY_26: '',
                    __EMPTY_27: '',
                    __EMPTY_28: '',
                    __EMPTY_29: ''
                },
                {
                    __EMPTY_3: 'я/н',
                    __EMPTY_4: 'в',
                    __EMPTY_5: 'я/н',
                    __EMPTY_6: 'в',
                    __EMPTY_7: 'нн',
                    __EMPTY_8: 'в',
                    __EMPTY_9: 'нн',
                    __EMPTY_10: 'в',
                    __EMPTY_11: 'нн',
                    __EMPTY_12: 'в',
                    __EMPTY_13: 'нн',
                    __EMPTY_14: 'в',
                    __EMPTY_15: 'нн',
                    __EMPTY_16: 'в',
                    __EMPTY_17: 'нн',
                    __EMPTY_19: 2,
                    __EMPTY_20: 294,
                    __EMPTY_26: '',
                    __EMPTY_27: '',
                    __EMPTY_28: '',
                    __EMPTY_29: ''
                },
                {
                    __EMPTY_3: '31/2',
                    __EMPTY_4: '',
                    __EMPTY_5: '31/2',
                    __EMPTY_6: '',
                    __EMPTY_7: '',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '',
                    __EMPTY_11: '',
                    __EMPTY_12: '',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: '',
                    __EMPTY_16: '',
                    __EMPTY_17: '',
                    __EMPTY_19: 65,
                    __EMPTY_26: '',
                    __EMPTY_27: '',
                    __EMPTY_28: '',
                    __EMPTY_29: ''
                },
                {
                    __EMPTY: 3,
                    __EMPTY_1: 'staff name 3\nposition3',
                    __EMPTY_2: '3',
                    __EMPTY_3: 'я/н',
                    __EMPTY_4: 'в',
                    __EMPTY_5: 'в',
                    __EMPTY_6: 'в',
                    __EMPTY_7: 'в',
                    __EMPTY_8: 'в',
                    __EMPTY_9: 'в',
                    __EMPTY_10: 'в',
                    __EMPTY_11: 'в',
                    __EMPTY_12: 'в',
                    __EMPTY_13: 'в',
                    __EMPTY_14: 'в',
                    __EMPTY_15: 'в',
                    __EMPTY_16: 'в',
                    __EMPTY_17: 'в',
                    __EMPTY_18: 'X',
                    __EMPTY_19: 1,
                    __EMPTY_20: 1,
                    __EMPTY_26: '',
                    __EMPTY_27: '',
                    __EMPTY_28: '',
                    __EMPTY_29: ''
                },
                {
                    __EMPTY_3: '23/1',
                    __EMPTY_4: '',
                    __EMPTY_5: '',
                    __EMPTY_6: '',
                    __EMPTY_7: '',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '',
                    __EMPTY_11: '',
                    __EMPTY_12: '',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: '',
                    __EMPTY_16: '',
                    __EMPTY_17: '',
                    __EMPTY_18: 'X',
                    __EMPTY_19: 24,
                    __EMPTY_26: '',
                    __EMPTY_27: '',
                    __EMPTY_28: '',
                    __EMPTY_29: ''
                },
                {
                    __EMPTY_3: 'в',
                    __EMPTY_4: 'в',
                    __EMPTY_5: 'в',
                    __EMPTY_6: 'в',
                    __EMPTY_7: 'в',
                    __EMPTY_8: 'в',
                    __EMPTY_9: 'в',
                    __EMPTY_10: 'в',
                    __EMPTY_11: 'в',
                    __EMPTY_12: 'в',
                    __EMPTY_13: 'в',
                    __EMPTY_14: 'в',
                    __EMPTY_15: 'в',
                    __EMPTY_16: 'в',
                    __EMPTY_17: 'в',
                    __EMPTY_19: 0,
                    __EMPTY_20: 24,
                    __EMPTY_26: '',
                    __EMPTY_27: '',
                    __EMPTY_28: '',
                    __EMPTY_29: ''
                },
                {
                    __EMPTY_3: '',
                    __EMPTY_4: '',
                    __EMPTY_5: '',
                    __EMPTY_6: '',
                    __EMPTY_7: '',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '',
                    __EMPTY_11: '',
                    __EMPTY_12: '',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: '',
                    __EMPTY_16: '',
                    __EMPTY_17: '',
                    __EMPTY_19: '',
                    __EMPTY_26: '',
                    __EMPTY_27: '',
                    __EMPTY_28: '',
                    __EMPTY_29: ''
                },
                {
                    __EMPTY: 4,
                    __EMPTY_1: 'staff name 4\nposition4',
                    __EMPTY_2: '4',
                    __EMPTY_3: 'я/н',
                    __EMPTY_4: 'я/н',
                    __EMPTY_5: 'я/н',
                    __EMPTY_6: 'я/н',
                    __EMPTY_7: 'я/н',
                    __EMPTY_8: 'я/н',
                    __EMPTY_9: 'я/н',
                    __EMPTY_10: 'я/н',
                    __EMPTY_11: 'я/н',
                    __EMPTY_12: 'я/н',
                    __EMPTY_13: 'я/н',
                    __EMPTY_14: 'в',
                    __EMPTY_15: 'нн',
                    __EMPTY_16: 'нн',
                    __EMPTY_17: 'нн',
                    __EMPTY_18: 'X',
                    __EMPTY_19: 11,
                    __EMPTY_20: 11,
                    __EMPTY_26: 'нн',
                    __EMPTY_27: '17 (132)',
                    __EMPTY_28: '',
                    __EMPTY_29: ''
                },
                {
                    __EMPTY_3: '7/1',
                    __EMPTY_4: '7/1',
                    __EMPTY_5: '7/1',
                    __EMPTY_6: '7/1',
                    __EMPTY_7: '7/1',
                    __EMPTY_8: '7/1',
                    __EMPTY_9: '7/1',
                    __EMPTY_10: '7/1',
                    __EMPTY_11: '7/1',
                    __EMPTY_12: '7/1',
                    __EMPTY_13: '7/1',
                    __EMPTY_14: '',
                    __EMPTY_15: '',
                    __EMPTY_16: '',
                    __EMPTY_17: '',
                    __EMPTY_18: 'X',
                    __EMPTY_19: 88,
                    __EMPTY_26: '',
                    __EMPTY_27: '',
                    __EMPTY_28: '',
                    __EMPTY_29: ''
                },
                {
                    __EMPTY_3: 'в',
                    __EMPTY_4: 'нн',
                    __EMPTY_5: 'нн',
                    __EMPTY_6: 'нн',
                    __EMPTY_7: 'нн',
                    __EMPTY_8: 'нн',
                    __EMPTY_9: 'нн',
                    __EMPTY_10: 'нн',
                    __EMPTY_11: 'нн',
                    __EMPTY_12: 'нн',
                    __EMPTY_13: 'нн',
                    __EMPTY_14: 'нн',
                    __EMPTY_15: 'нн',
                    __EMPTY_16: 'нн',
                    __EMPTY_17: 'нн',
                    __EMPTY_19: 0,
                    __EMPTY_20: 88,
                    __EMPTY_26: '',
                    __EMPTY_27: '',
                    __EMPTY_28: '',
                    __EMPTY_29: ''
                },
                {
                    __EMPTY_3: '',
                    __EMPTY_4: '',
                    __EMPTY_5: '',
                    __EMPTY_6: '',
                    __EMPTY_7: '',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '',
                    __EMPTY_11: '',
                    __EMPTY_12: '',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: '',
                    __EMPTY_16: '',
                    __EMPTY_17: '',
                    __EMPTY_19: '',
                    __EMPTY_26: '',
                    __EMPTY_27: '',
                    __EMPTY_28: '',
                    __EMPTY_29: ''
                },
                {
                    __EMPTY: 5,
                    __EMPTY_1: 'staff name 5\nposition5',
                    __EMPTY_2: '5',
                    __EMPTY_3: 'я/н',
                    __EMPTY_4: 'я/н',
                    __EMPTY_5: 'я/н',
                    __EMPTY_6: 'я/н',
                    __EMPTY_7: 'я/н',
                    __EMPTY_8: 'я/н',
                    __EMPTY_9: 'я/н',
                    __EMPTY_10: 'я/н',
                    __EMPTY_11: 'нн',
                    __EMPTY_12: 'нн',
                    __EMPTY_13: 'нн',
                    __EMPTY_14: 'в',
                    __EMPTY_15: 'нн',
                    __EMPTY_16: 'нн',
                    __EMPTY_17: 'нн',
                    __EMPTY_18: 'X',
                    __EMPTY_19: 8,
                    __EMPTY_20: 8,
                    __EMPTY_26: 'нн',
                    __EMPTY_27: '20 (156)',
                    __EMPTY_28: '',
                    __EMPTY_29: ''
                },
                {
                    __EMPTY_3: '7/1',
                    __EMPTY_4: '7/1',
                    __EMPTY_5: '7/1',
                    __EMPTY_6: '7/1',
                    __EMPTY_7: '7/1',
                    __EMPTY_8: '7/1',
                    __EMPTY_9: '7/1',
                    __EMPTY_10: '7/1',
                    __EMPTY_11: '',
                    __EMPTY_12: '',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: '',
                    __EMPTY_16: '',
                    __EMPTY_17: '',
                    __EMPTY_18: 'X',
                    __EMPTY_19: 64,
                    __EMPTY_26: '',
                    __EMPTY_27: '',
                    __EMPTY_28: '',
                    __EMPTY_29: ''
                },
                {
                    __EMPTY_3: 'в',
                    __EMPTY_4: 'нн',
                    __EMPTY_5: 'нн',
                    __EMPTY_6: 'нн',
                    __EMPTY_7: 'нн',
                    __EMPTY_8: 'нн',
                    __EMPTY_9: 'нн',
                    __EMPTY_10: 'нн',
                    __EMPTY_11: 'нн',
                    __EMPTY_12: 'нн',
                    __EMPTY_13: 'нн',
                    __EMPTY_14: 'нн',
                    __EMPTY_15: 'нн',
                    __EMPTY_16: 'нн',
                    __EMPTY_17: 'нн',
                    __EMPTY_19: 0,
                    __EMPTY_20: 64,
                    __EMPTY_26: '',
                    __EMPTY_27: '',
                    __EMPTY_28: '',
                    __EMPTY_29: ''
                },
                {
                    __EMPTY_3: '',
                    __EMPTY_4: '',
                    __EMPTY_5: '',
                    __EMPTY_6: '',
                    __EMPTY_7: '',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '',
                    __EMPTY_11: '',
                    __EMPTY_12: '',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: '',
                    __EMPTY_16: '',
                    __EMPTY_17: '',
                    __EMPTY_19: '',
                    __EMPTY_26: '',
                    __EMPTY_27: '',
                    __EMPTY_28: '',
                    __EMPTY_29: ''
                },
                {
                    __EMPTY: 6,
                    __EMPTY_1: 'staff name 6\nposition6',
                    __EMPTY_2: '6',
                    __EMPTY_3: 'я/н',
                    __EMPTY_4: 'нн',
                    __EMPTY_5: 'нн',
                    __EMPTY_6: 'нн',
                    __EMPTY_7: 'нн',
                    __EMPTY_8: 'нн',
                    __EMPTY_9: 'нн',
                    __EMPTY_10: 'нн',
                    __EMPTY_11: 'нн',
                    __EMPTY_12: 'нн',
                    __EMPTY_13: 'нн',
                    __EMPTY_14: 'нн',
                    __EMPTY_15: 'нн',
                    __EMPTY_16: 'нн',
                    __EMPTY_17: 'нн',
                    __EMPTY_18: 'X',
                    __EMPTY_19: 1,
                    __EMPTY_20: 1,
                    __EMPTY_26: 'нн',
                    __EMPTY_27: '29 (232)',
                    __EMPTY_28: '',
                    __EMPTY_29: ''
                },
                {
                    __EMPTY_3: '7/1',
                    __EMPTY_4: '',
                    __EMPTY_5: '',
                    __EMPTY_6: '',
                    __EMPTY_7: '',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '',
                    __EMPTY_11: '',
                    __EMPTY_12: '',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: '',
                    __EMPTY_16: '',
                    __EMPTY_17: '',
                    __EMPTY_18: 'X',
                    __EMPTY_19: 8,
                    __EMPTY_26: '',
                    __EMPTY_27: '',
                    __EMPTY_28: '',
                    __EMPTY_29: ''
                },
                {
                    __EMPTY_3: 'нн',
                    __EMPTY_4: 'нн',
                    __EMPTY_5: 'нн',
                    __EMPTY_6: 'нн',
                    __EMPTY_7: 'нн',
                    __EMPTY_8: 'нн',
                    __EMPTY_9: 'нн',
                    __EMPTY_10: 'нн',
                    __EMPTY_11: 'нн',
                    __EMPTY_12: 'нн',
                    __EMPTY_13: 'нн',
                    __EMPTY_14: 'нн',
                    __EMPTY_15: 'нн',
                    __EMPTY_16: 'нн',
                    __EMPTY_17: 'нн',
                    __EMPTY_19: 0,
                    __EMPTY_20: 8,
                    __EMPTY_26: '',
                    __EMPTY_27: '',
                    __EMPTY_28: '',
                    __EMPTY_29: ''
                },
                {
                    __EMPTY_3: '',
                    __EMPTY_4: '',
                    __EMPTY_5: '',
                    __EMPTY_6: '',
                    __EMPTY_7: '',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '',
                    __EMPTY_11: '',
                    __EMPTY_12: '',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: '',
                    __EMPTY_16: '',
                    __EMPTY_17: '',
                    __EMPTY_19: '',
                    __EMPTY_26: '',
                    __EMPTY_27: '',
                    __EMPTY_28: '',
                    __EMPTY_29: ''
                },
                {
                    __EMPTY: 7,
                    __EMPTY_1: 'staff name 7\nposition7',
                    __EMPTY_2: '7',
                    __EMPTY_3: 'в',
                    __EMPTY_4: 'я/н',
                    __EMPTY_5: 'в',
                    __EMPTY_6: 'нн',
                    __EMPTY_7: 'в',
                    __EMPTY_8: 'нн',
                    __EMPTY_9: 'в',
                    __EMPTY_10: 'нн',
                    __EMPTY_11: 'в',
                    __EMPTY_12: 'нн',
                    __EMPTY_13: 'в',
                    __EMPTY_14: 'нн',
                    __EMPTY_15: 'в',
                    __EMPTY_16: 'нн',
                    __EMPTY_17: 'в',
                    __EMPTY_18: 'X',
                    __EMPTY_19: 1,
                    __EMPTY_20: 1,
                    __EMPTY_26: 'нн',
                    __EMPTY_27: '14 (462)',
                    __EMPTY_28: '',
                    __EMPTY_29: ''
                },
                {
                    __EMPTY_3: '',
                    __EMPTY_4: '23/1',
                    __EMPTY_5: '',
                    __EMPTY_6: '',
                    __EMPTY_7: '',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '',
                    __EMPTY_11: '',
                    __EMPTY_12: '',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: '',
                    __EMPTY_16: '',
                    __EMPTY_17: '',
                    __EMPTY_18: 'X',
                    __EMPTY_19: 24,
                    __EMPTY_26: '',
                    __EMPTY_27: '',
                    __EMPTY_28: '',
                    __EMPTY_29: ''
                },
                {
                    __EMPTY_3: 'нн',
                    __EMPTY_4: 'в',
                    __EMPTY_5: 'нн',
                    __EMPTY_6: 'в',
                    __EMPTY_7: 'нн',
                    __EMPTY_8: 'в',
                    __EMPTY_9: 'нн',
                    __EMPTY_10: 'в',
                    __EMPTY_11: 'нн',
                    __EMPTY_12: 'в',
                    __EMPTY_13: 'нн',
                    __EMPTY_14: 'в',
                    __EMPTY_15: 'нн',
                    __EMPTY_16: 'в',
                    __EMPTY_17: 'нн',
                    __EMPTY_19: 0,
                    __EMPTY_20: 24,
                    __EMPTY_26: '',
                    __EMPTY_27: '',
                    __EMPTY_28: '',
                    __EMPTY_29: ''
                },
                {
                    __EMPTY_3: '',
                    __EMPTY_4: '',
                    __EMPTY_5: '',
                    __EMPTY_6: '',
                    __EMPTY_7: '',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '',
                    __EMPTY_11: '',
                    __EMPTY_12: '',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: '',
                    __EMPTY_16: '',
                    __EMPTY_17: '',
                    __EMPTY_19: '',
                    __EMPTY_26: '',
                    __EMPTY_27: '',
                    __EMPTY_28: '',
                    __EMPTY_29: ''
                },
                {
                    __EMPTY: 8,
                    __EMPTY_1: 'staff name 8\nposition8',
                    __EMPTY_2: '8',
                    __EMPTY_3: 'я/н',
                    __EMPTY_4: 'в',
                    __EMPTY_5: 'в',
                    __EMPTY_6: 'в',
                    __EMPTY_7: 'в',
                    __EMPTY_8: 'в',
                    __EMPTY_9: 'в',
                    __EMPTY_10: 'в',
                    __EMPTY_11: 'в',
                    __EMPTY_12: 'в',
                    __EMPTY_13: 'в',
                    __EMPTY_14: 'в',
                    __EMPTY_15: 'в',
                    __EMPTY_16: 'в',
                    __EMPTY_17: 'в',
                    __EMPTY_18: 'X',
                    __EMPTY_19: 1,
                    __EMPTY_20: 1,
                    __EMPTY_26: '',
                    __EMPTY_27: '',
                    __EMPTY_28: '',
                    __EMPTY_29: ''
                },
                {
                    __EMPTY_3: '8/1',
                    __EMPTY_4: '',
                    __EMPTY_5: '',
                    __EMPTY_6: '',
                    __EMPTY_7: '',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '',
                    __EMPTY_11: '',
                    __EMPTY_12: '',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: '',
                    __EMPTY_16: '',
                    __EMPTY_17: '',
                    __EMPTY_18: 'X',
                    __EMPTY_19: 9,
                    __EMPTY_26: '',
                    __EMPTY_27: '',
                    __EMPTY_28: '',
                    __EMPTY_29: ''
                },
                {
                    __EMPTY_3: 'в',
                    __EMPTY_4: 'в',
                    __EMPTY_5: 'в',
                    __EMPTY_6: 'в',
                    __EMPTY_7: 'в',
                    __EMPTY_8: 'в',
                    __EMPTY_9: 'в',
                    __EMPTY_10: 'в',
                    __EMPTY_11: 'в',
                    __EMPTY_12: 'в',
                    __EMPTY_13: 'в',
                    __EMPTY_14: 'в',
                    __EMPTY_15: 'в',
                    __EMPTY_16: 'в',
                    __EMPTY_17: 'в',
                    __EMPTY_19: 0,
                    __EMPTY_20: 9,
                    __EMPTY_26: '',
                    __EMPTY_27: '',
                    __EMPTY_28: '',
                    __EMPTY_29: ''
                },
                {
                    __EMPTY_3: '',
                    __EMPTY_4: '',
                    __EMPTY_5: '',
                    __EMPTY_6: '',
                    __EMPTY_7: '',
                    __EMPTY_8: '',
                    __EMPTY_9: '',
                    __EMPTY_10: '',
                    __EMPTY_11: '',
                    __EMPTY_12: '',
                    __EMPTY_13: '',
                    __EMPTY_14: '',
                    __EMPTY_15: '',
                    __EMPTY_16: '',
                    __EMPTY_17: '',
                    __EMPTY_19: '',
                    __EMPTY_26: '',
                    __EMPTY_27: '',
                    __EMPTY_28: '',
                    __EMPTY_29: ''
                }
            ]
        }

        bef();
        aft();

        describe('Выбор Июнь 2023 - Весь месяц.', () => {
            describe('Выбрать "Считать за"', () => {
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.page.timesheet.selectIconExpand({
                    title: 'Считать за',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.selectXpand.xpand({
                    timeout: entry.max
                });
                decorate.el.selectXpand.handler({
                    value: 'Весь месяц',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.selectXpand.xpandNoElement({
                    timeout: entry.max
                });
            });

            describe('Выбрать "Месяц"', () => {
                decorate.page.timesheet.selectIconExpand({
                    title: 'Месяц',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.selectXpand.xpand({
                    timeout: entry.max
                });
                decorate.el.selectXpand.handler({
                    value: 'Июнь',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.selectXpand.xpandNoElement({
                    timeout: entry.max
                });
            });

            describe('Выбрать "Год"', () => {
                decorate.page.timesheet.selectIconExpand({
                    title: 'Год',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.selectXpand.xpand({
                    timeout: entry.max
                });
                decorate.el.selectXpand.handler({
                    value: '2023',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.selectXpand.xpandNoElement({
                    timeout: entry.max
                });
            });
        });

        describe('Формирование табеля', () => {
            decorate.el.button.handler({
                name: 'Сформировать табель',
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
        });

        describe('Скачать файл в Excel', () => {
            decorate.el.button.handler({
                name: 'Скачать в Excel',
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

    return {
        checkTimesheet,
        showMinuteTimesheet,
        filterDateTimesheet,
        filterDivisionTimesheet,
        downloadXLSXTimesheet
    }
};

module.exports = {
    other: other()
}