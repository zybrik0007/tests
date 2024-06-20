const {describe, it, before, after} = require('mocha');

const entry = require('../../../../../../entry');
const page = require('../../../../pages');
const el = require('../../../../elements');
const dec = require('../../../../dictionaries/decorate');
const sec = require('../../../../dictionaries/section');
const sub = require('../../../../dictionaries/subsection');
const but = require('../../../../dictionaries/button-icon');
const api = require('../../../other/api');
const imp = require('../../../../upload-files');
const deleteData = require('../../../other/deleteData');
const oth = require('../../../other/other');
const decItApi = require('../../../../dictionaries/decorate-it-api');
const decorate = require('../../../../decorates');
const db = require('../../../../database');
const data = require('../../data').dataDivision;

const bef = () => before('Вход и открытие подраздела "Подразделения"', async () => {
    await dec.auth(entry.customLogin, entry.customPassword);
    await dec.simple(el.section.handler, [sec.per, entry.max], el.section);
    await dec.simple(el.subsection.handler, [sub.per.division, entry.max], el.subsection);
    await dec.simple(page.division.init, [entry.max], page.division);
});

const aft = () => after('Выход', async () => {
    await page.base.loading(entry.sleep1);
    await dec.exit();
});

const other = () => {

    const add = () => describe('Персонал / Подразделения. Добавление.', () => {

        describe('Добавление', () => {
            bef();
            aft();

            describe('Добавления подразделения 1', () => {
                decorate.el.butIcBefore.handler({
                    icon: but.add,
                    timeout: entry.max
                });
                decorate.modal.divisionAdd.init({
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.input.sendKeys({
                    title: 'Подразделение',
                    placeholder: '',
                    value: data.divisions.division1,
                    timeout: entry.max
                });
                decorate.el.button.handler({
                    name: 'Сохранить',
                    timeout: entry.max
                });
                decorate.el.success.success({
                    text: 'Подразделение успешно добавлено!',
                    timeout: entry.max
                });
                decorate.modal.divisionAdd.initClose({
                    timeout: entry.max
                });
            });

            describe('Добавления подразделения 2', () => {
                decorate.page.division.handler({
                    arr: [data.divisions.division1],
                    timeout: entry.max
                });
                decorate.page.division.selected({
                    division: data.divisions.division1,
                    timeout: entry.max
                });
                decorate.el.butIcBefore.handler({
                    icon: but.add,
                    timeout: entry.max
                });
                decorate.modal.divisionAdd.init({
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.input.sendKeys({
                    title: 'Подразделение',
                    placeholder: '',
                    value: data.divisions.division2,
                    timeout: entry.max
                });
                decorate.el.button.handler({
                    name: 'Сохранить',
                    timeout: entry.max
                });
                decorate.el.success.success({
                    text: 'Подразделение успешно добавлено!',
                    timeout: entry.max
                });
                decorate.modal.divisionAdd.initClose({
                    timeout: entry.max
                });
            });

            describe('Добавления подразделения 3', () => {
                decorate.page.division.handler({
                    arr: [data.divisions.division1, data.divisions.division2],
                    timeout: entry.max
                });
                decorate.page.division.selected({
                    division: data.divisions.division2,
                    timeout: entry.max
                });
                decorate.el.butIcBefore.handler({
                    icon: but.add,
                    timeout: entry.max
                });
                decorate.modal.divisionAdd.init({
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.input.sendKeys({
                    title: 'Подразделение',
                    placeholder: '',
                    value: data.divisions.division3,
                    timeout: entry.max
                });
                decorate.el.button.handler({
                    name: 'Сохранить',
                    timeout: entry.max
                });
                decorate.el.success.success({
                    text: 'Подразделение успешно добавлено!',
                    timeout: entry.max
                });
                decorate.modal.divisionAdd.initClose({
                    timeout: entry.max
                });
            });
        });

        describe('Проверка', () => {
            bef();
            aft();
            decorate.page.division.size({
                size: 4,
                timeout: entry.max
            });
            decorate.page.division.division({
                arr: [data.divisions.division1],
                timeout: entry.max
            });
            decorate.page.division.division({
                arr: [data.divisions.division1, data.divisions.division2],
                timeout: entry.max
            });
            decorate.page.division.division({
                arr: [data.divisions.division1, data.divisions.division2, data.divisions.division3],
                timeout: entry.max
            });
        });
    });

    const edit = () => describe('Персонал / Подразделения. Редактирование.', () => {

        describe('Редактирование', () => {
            bef();
            aft();

            describe('Редактировнаие подразделение 1', () => {
                decorate.page.division.handler({
                    arr: [data.divisions.division1],
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.page.division.selected({
                    division: data.divisions.division1,
                    timeout: entry.max
                });
                decorate.el.butIcBefore.handler({
                    icon: but.edit,
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.modal.divisionEdit.init({
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.input.backSpace({
                    title: 'Подразделение',
                    placeholder: '',
                    timeout: entry.max
                });
                decorate.el.input.sendKeys({
                    title: 'Подразделение',
                    placeholder: '',
                    value: data.divisionsUpdate.division1.division,
                    timeout: entry.max
                });
                decorate.modal.divisionEdit.inputSendKeys({
                    title: 'Телефон',
                    placeholder: '',
                    value: data.divisionsUpdate.division1.phone,
                    timeout: entry.max
                });
                decorate.modal.divisionEdit.inputSendKeys({
                    title: 'Описание',
                    placeholder: '',
                    value: data.divisionsUpdate.division1.description,
                    timeout: entry.max
                });

                decorate.el.select.iconXpand({
                    title: 'Сопровождающий',
                    value: '',
                    text: data.fio.staff2,
                    timeout: entry.max
                });
                decorate.el.select.iconMenu({
                    title: 'Сопровождающий',
                    value: data.fio.staff2,
                    timeout: entry.max
                });
                decorate.el.groupCell.handler({
                    name: data.fio.staff1,
                    timeout: entry.max
                });
                decorate.el.groupCell.active({
                    name: data.fio.staff1,
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.button.handler({
                    name: 'Применить',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });

                decorate.el.selectMulti.iconXpandSelected({
                    title: 'Шаблон доступа для сотрудника',
                    value:  data.templates.template1,
                    timeout: entry.max
                });
                decorate.el.selectMulti.iconMenu({
                    title: 'Шаблон доступа для сотрудника',
                    timeout: entry.max
                });
                decorate.el.groupCell.handler({
                    name: data.templates.template2,
                    timeout: entry.max
                });
                decorate.el.groupCell.active({
                    name: data.templates.template2,
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.button.handler({
                    name: 'Применить',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });

                decorate.el.select.iconXpand({
                    title: 'Шаблон доступа для посетителя',
                    value: '',
                    text: data.templates.template2,
                    timeout: entry.max
                });
                decorate.el.select.iconMenu({
                    title: 'Шаблон доступа для посетителя',
                    value: data.templates.template2,
                    timeout: entry.max
                });
                decorate.el.groupCell.handler({
                    name: data.templates.template1,
                    timeout: entry.max
                });
                decorate.el.groupCell.active({
                    name: data.templates.template1,
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.button.handler({
                    name: 'Применить',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });

                decorate.el.select.iconXpand({
                    title: 'График работы',
                    value: '',
                    text: data.schedules.schedule2.name,
                    timeout: entry.max
                });
                decorate.el.select.iconMenu({
                    title:'График работы',
                    value: data.schedules.schedule2.name,
                    timeout: entry.max
                });
                decorate.el.groupCell.handler({
                    name: data.schedules.schedule1.name,
                    timeout: entry.max
                });
                decorate.el.groupCell.active({
                    name: data.schedules.schedule1.name,
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.button.handler({
                    name: 'Применить',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });

                decorate.el.button.handler({
                    name: 'Сохранить',
                    timeout: entry.max
                });
                decorate.modal.divisionEdit.initClose({
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
            });

            describe('Редактировнаие подразделение 2', () => {
                decorate.page.division.handler({
                    arr: [data.divisionsUpdate.division1.division, data.divisions.division2],
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.page.division.selected({
                    division: data.divisions.division2,
                    timeout: entry.max
                });
                decorate.el.butIcBefore.handler({
                    icon: but.edit,
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.modal.divisionEdit.init({
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.input.backSpace({
                    title: 'Подразделение',
                    placeholder: '',
                    timeout: entry.max
                });
                decorate.el.input.sendKeys({
                    title: 'Подразделение',
                    placeholder: '',
                    value: data.divisionsUpdate.division2.division,
                    timeout: entry.max
                });
                decorate.modal.divisionEdit.inputSendKeys({
                    title: 'Телефон',
                    placeholder: '',
                    value: data.divisionsUpdate.division2.phone,
                    timeout: entry.max
                });
                decorate.modal.divisionEdit.inputSendKeys({
                    title: 'Описание',
                    placeholder: '',
                    value: data.divisionsUpdate.division2.description,
                    timeout: entry.max
                });

                decorate.el.select.iconXpand({
                    title: 'Сопровождающий',
                    value: '',
                    text: data.fio.staff2,
                    timeout: entry.max
                });
                decorate.el.select.iconMenu({
                    title: 'Сопровождающий',
                    value: data.fio.staff2,
                    timeout: entry.max
                });
                decorate.el.groupCell.handler({
                    name: data.fio.staff1,
                    timeout: entry.max
                });
                decorate.el.groupCell.active({
                    name: data.fio.staff1,
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.button.handler({
                    name: 'Применить',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });

                decorate.el.selectMulti.iconXpandSelected({
                    title: 'Шаблон доступа для сотрудника',
                    value:  data.templates.template1,
                    timeout: entry.max
                });
                decorate.el.selectMulti.iconMenu({
                    title: 'Шаблон доступа для сотрудника',
                    timeout: entry.max
                });
                decorate.el.groupCell.handler({
                    name: data.templates.template2,
                    timeout: entry.max
                });
                decorate.el.groupCell.active({
                    name: data.templates.template2,
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.button.handler({
                    name: 'Применить',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });

                decorate.el.select.iconXpand({
                    title: 'Шаблон доступа для посетителя',
                    value: '',
                    text: data.templates.template2,
                    timeout: entry.max
                });
                decorate.el.select.iconMenu({
                    title: 'Шаблон доступа для посетителя',
                    value: data.templates.template2,
                    timeout: entry.max
                });
                decorate.el.groupCell.handler({
                    name: data.templates.template1,
                    timeout: entry.max
                });
                decorate.el.groupCell.active({
                    name: data.templates.template1,
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.button.handler({
                    name: 'Применить',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });

                decorate.el.select.iconXpand({
                    title: 'График работы',
                    value: '',
                    text: data.schedules.schedule2.name,
                    timeout: entry.max
                });
                decorate.el.select.iconMenu({
                    title:'График работы',
                    value: data.schedules.schedule2.name,
                    timeout: entry.max
                });
                decorate.el.groupCell.handler({
                    name: data.schedules.schedule1.name,
                    timeout: entry.max
                });
                decorate.el.groupCell.active({
                    name: data.schedules.schedule1.name,
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.button.handler({
                    name: 'Применить',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });

                decorate.el.button.handler({
                    name: 'Сохранить',
                    timeout: entry.max
                });
                decorate.modal.divisionEdit.initClose({
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
            });

            describe('Редактировнаие подразделение 3', () => {
                decorate.page.division.handler({
                    arr: [
                        data.divisionsUpdate.division1.division,
                        data.divisionsUpdate.division2.division,
                        data.divisions.division3
                    ],
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.page.division.selected({
                    division: data.divisions.division3,
                    timeout: entry.max
                });
                decorate.el.butIcBefore.handler({
                    icon: but.edit,
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.modal.divisionEdit.init({
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.input.backSpace({
                    title: 'Подразделение',
                    placeholder: '',
                    timeout: entry.max
                });
                decorate.el.input.sendKeys({
                    title: 'Подразделение',
                    placeholder: '',
                    value: data.divisionsUpdate.division3.division,
                    timeout: entry.max
                });
                decorate.modal.divisionEdit.inputSendKeys({
                    title: 'Телефон',
                    placeholder: '',
                    value: data.divisionsUpdate.division3.phone,
                    timeout: entry.max
                });
                decorate.modal.divisionEdit.inputSendKeys({
                    title: 'Описание',
                    placeholder: '',
                    value: data.divisionsUpdate.division3.description,
                    timeout: entry.max
                });

                decorate.el.select.iconXpand({
                    title: 'Сопровождающий',
                    value: '',
                    text: data.fio.staff2,
                    timeout: entry.max
                });
                decorate.el.select.iconMenu({
                    title: 'Сопровождающий',
                    value: data.fio.staff2,
                    timeout: entry.max
                });
                decorate.el.groupCell.handler({
                    name: data.fio.staff1,
                    timeout: entry.max
                });
                decorate.el.groupCell.active({
                    name: data.fio.staff1,
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.button.handler({
                    name: 'Применить',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });

                decorate.el.selectMulti.iconXpandSelected({
                    title: 'Шаблон доступа для сотрудника',
                    value:  data.templates.template1,
                    timeout: entry.max
                });
                decorate.el.selectMulti.iconMenu({
                    title: 'Шаблон доступа для сотрудника',
                    timeout: entry.max
                });
                decorate.el.groupCell.handler({
                    name: data.templates.template2,
                    timeout: entry.max
                });
                decorate.el.groupCell.active({
                    name: data.templates.template2,
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.button.handler({
                    name: 'Применить',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });

                decorate.el.select.iconXpand({
                    title: 'Шаблон доступа для посетителя',
                    value: '',
                    text: data.templates.template2,
                    timeout: entry.max
                });
                decorate.el.select.iconMenu({
                    title: 'Шаблон доступа для посетителя',
                    value: data.templates.template2,
                    timeout: entry.max
                });
                decorate.el.groupCell.handler({
                    name: data.templates.template1,
                    timeout: entry.max
                });
                decorate.el.groupCell.active({
                    name: data.templates.template1,
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.button.handler({
                    name: 'Применить',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });

                decorate.el.select.iconXpand({
                    title: 'График работы',
                    value: '',
                    text: data.schedules.schedule2.name,
                    timeout: entry.max
                });
                decorate.el.select.iconMenu({
                    title:'График работы',
                    value: data.schedules.schedule2.name,
                    timeout: entry.max
                });
                decorate.el.groupCell.handler({
                    name: data.schedules.schedule1.name,
                    timeout: entry.max
                });
                decorate.el.groupCell.active({
                    name: data.schedules.schedule1.name,
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.button.handler({
                    name: 'Применить',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });

                decorate.el.button.handler({
                    name: 'Сохранить',
                    timeout: entry.max
                });
                decorate.modal.divisionEdit.initClose({
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
            });
        });

        describe('Проверка', () => {
            bef();
            aft();

            describe('Общие проверки', () => {
                decorate.page.division.size({
                    size: 4,
                    timeout: entry.max
                });
                decorate.page.division.division({
                    arr: [data.divisionsUpdate.division1.division],
                    timeout: entry.max
                });
                decorate.page.division.division({
                    arr: [data.divisionsUpdate.division1.division, data.divisionsUpdate.division2.division],
                    timeout: entry.max
                });
                decorate.page.division.division({
                    arr: [
                        data.divisionsUpdate.division1.division,
                        data.divisionsUpdate.division2.division,
                        data.divisionsUpdate.division3.division
                    ],
                    timeout: entry.max
                });
            });

            describe('Проверка подразделение 1', () => {
                decorate.page.division.handler({
                    arr: [data.divisionsUpdate.division1.division],
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.page.division.selected({
                    division: data.divisionsUpdate.division1.division,
                    timeout: entry.max
                });
                decorate.el.input.getValue({
                    title: 'Телефон',
                    placeholder: '',
                    value: data.divisionsUpdate.division1.phone,
                    timeout: entry.max
                });
                decorate.el.input.getValue({
                    title: 'Описание',
                    placeholder: '',
                    value: data.divisionsUpdate.division1.description,
                    timeout: entry.max
                });
                decorate.el.input.getValue({
                    title: 'Сопровождающий',
                    placeholder: '',
                    value: data.fio.staff1,
                    timeout: entry.max
                });
                decorate.el.input.getValue({
                    title: 'Шаблон доступа для сотрудника',
                    placeholder: '',
                    value: data.templates.template1 + ', ' + data.templates.template2,
                    timeout: entry.max
                });
                decorate.el.input.getValue({
                    title: 'Шаблон доступа для посетителя',
                    placeholder: '',
                    value: data.templates.template1,
                    timeout: entry.max
                });
                decorate.el.input.getValue({
                    title: 'График работы',
                    placeholder: '',
                    value: data.schedules.schedule1.name,
                    timeout: entry.max
                });
            });

            describe('Проверка подразделение 2', () => {
                decorate.page.division.handler({
                    arr: [data.divisionsUpdate.division1.division, data.divisionsUpdate.division2.division],
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.page.division.selected({
                    division: data.divisionsUpdate.division2.division,
                    timeout: entry.max
                });
                decorate.el.input.getValue({
                    title: 'Телефон',
                    placeholder: '',
                    value: data.divisionsUpdate.division2.phone,
                    timeout: entry.max
                });
                decorate.el.input.getValue({
                    title: 'Описание',
                    placeholder: '',
                    value: data.divisionsUpdate.division2.description,
                    timeout: entry.max
                });
                decorate.el.input.getValue({
                    title: 'Сопровождающий',
                    placeholder: '',
                    value: data.fio.staff1,
                    timeout: entry.max
                });
                decorate.el.input.getValue({
                    title: 'Шаблон доступа для сотрудника',
                    placeholder: '',
                    value: data.templates.template1 + ', ' + data.templates.template2,
                    timeout: entry.max
                });
                decorate.el.input.getValue({
                    title: 'Шаблон доступа для посетителя',
                    placeholder: '',
                    value: data.templates.template1,
                    timeout: entry.max
                });
                decorate.el.input.getValue({
                    title: 'График работы',
                    placeholder: '',
                    value: data.schedules.schedule1.name,
                    timeout: entry.max
                });
            });

            describe('Проверка подразделение 3', () => {
                decorate.page.division.handler({
                    arr: [
                        data.divisionsUpdate.division1.division,
                        data.divisionsUpdate.division2.division,
                        data.divisionsUpdate.division3.division
                    ],
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.page.division.selected({
                    division: data.divisionsUpdate.division3.division,
                    timeout: entry.max
                });
                decorate.el.input.getValue({
                    title: 'Телефон',
                    placeholder: '',
                    value: data.divisionsUpdate.division3.phone,
                    timeout: entry.max
                });
                decorate.el.input.getValue({
                    title: 'Описание',
                    placeholder: '',
                    value: data.divisionsUpdate.division3.description,
                    timeout: entry.max
                });
                decorate.el.input.getValue({
                    title: 'Сопровождающий',
                    placeholder: '',
                    value: data.fio.staff1,
                    timeout: entry.max
                });
                decorate.el.input.getValue({
                    title: 'Шаблон доступа для сотрудника',
                    placeholder: '',
                    value: data.templates.template1 + ', ' + data.templates.template2,
                    timeout: entry.max
                });
                decorate.el.input.getValue({
                    title: 'Шаблон доступа для посетителя',
                    placeholder: '',
                    value: data.templates.template1,
                    timeout: entry.max
                });
                decorate.el.input.getValue({
                    title: 'График работы',
                    placeholder: '',
                    value: data.schedules.schedule1.name,
                    timeout: entry.max
                });
            });

        });
    });

    const print = () => describe('Персонал / Подразделения. Проверка печати.', () => {

        bef();
        aft();

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

        describe('Проверка строк', () => {
            decorate.modal.printTable.cellGetText({
                head: 'Наименование',
                str: 1,
                cell: 1,
                value: data.divisionsUpdate.division1.division,
                timeout: entry.max
            });
            decorate.modal.printTable.cellGetText({
                head: 'Телефон',
                str: 1,
                cell: 2,
                value: data.divisionsUpdate.division1.phone,
                timeout: entry.max
            });
            decorate.modal.printTable.cellGetText({
                head: 'Описание',
                str: 1,
                cell: 3,
                value: data.divisionsUpdate.division1.description,
                timeout: entry.max
            });

            decorate.modal.printTable.cellGetText({
                head: 'Наименование',
                str: 2,
                cell: 1,
                value: data.divisionsUpdate.division2.division,
                timeout: entry.max
            });
            decorate.modal.printTable.cellGetText({
                head: 'Телефон',
                str: 2,
                cell: 2,
                value: data.divisionsUpdate.division2.phone,
                timeout: entry.max
            });
            decorate.modal.printTable.cellGetText({
                head: 'Описание',
                str: 2,
                cell: 3,
                value: data.divisionsUpdate.division2.description,
                timeout: entry.max
            });

            decorate.modal.printTable.cellGetText({
                head: 'Наименование',
                str: 3,
                cell: 1,
                value: data.divisionsUpdate.division3.division,
                timeout: entry.max
            });
            decorate.modal.printTable.cellGetText({
                head: 'Телефон',
                str: 3,
                cell: 2,
                value: data.divisionsUpdate.division3.phone,
                timeout: entry.max
            });
            decorate.modal.printTable.cellGetText({
                head: 'Описание',
                str: 3,
                cell: 3,
                value: data.divisionsUpdate.division3.description,
                timeout: entry.max
            });

            decorate.modal.printTable.cellGetText({
                head: 'Наименование',
                str: 4,
                cell: 1,
                value: 'Администраторы системы',
                timeout: entry.max
            });
            decorate.modal.printTable.cellGetText({
                head: 'Телефон',
                str: 4,
                cell: 2,
                value: '',
                timeout: entry.max
            });
            decorate.modal.printTable.cellGetText({
                head: 'Описание',
                str: 4,
                cell: 3,
                value: '',
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

    const printTree = () => describe('Персонал / Подразделения. Проверка печати дерева.', () => {

        bef();
        aft();

        describe('Открытие печатной формы дерева', () => {
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
                name: 'Печать дерева',
                timeout: entry.max
            });
            decorate.modal.printTable.init({
                timeout: entry.max
            });
        });

        describe('Проверка строк', () => {
            decorate.modal.printTable.cellGetText({
                head: 'Название',
                str: 1,
                cell: 1,
                value: data.divisionsUpdate.division1.division,
                timeout: entry.max
            });
            decorate.modal.printTable.cellGetText({
                head: 'Телефон',
                str: 1,
                cell: 2,
                value: data.divisionsUpdate.division1.phone,
                timeout: entry.max
            });
            decorate.modal.printTable.cellGetText({
                head: 'Описание',
                str: 1,
                cell: 3,
                value: data.divisionsUpdate.division1.description,
                timeout: entry.max
            });

            decorate.modal.printTable.cellGetText({
                head: 'Название',
                str: 2,
                cell: 1,
                value: data.divisionsUpdate.division2.division,
                timeout: entry.max
            });
            decorate.modal.printTable.cellGetText({
                head: 'Телефон',
                str: 2,
                cell: 2,
                value: data.divisionsUpdate.division2.phone,
                timeout: entry.max
            });
            decorate.modal.printTable.cellGetText({
                head: 'Описание',
                str: 2,
                cell: 3,
                value: data.divisionsUpdate.division2.description,
                timeout: entry.max
            });

            decorate.modal.printTable.cellGetText({
                head: 'Название',
                str: 3,
                cell: 1,
                value: data.divisionsUpdate.division3.division,
                timeout: entry.max
            });
            decorate.modal.printTable.cellGetText({
                head: 'Телефон',
                str: 3,
                cell: 2,
                value: data.divisionsUpdate.division3.phone,
                timeout: entry.max
            });
            decorate.modal.printTable.cellGetText({
                head: 'Описание',
                str: 3,
                cell: 3,
                value: data.divisionsUpdate.division3.description,
                timeout: entry.max
            });

            decorate.modal.printTable.cellGetText({
                head: 'Название',
                str: 4,
                cell: 1,
                value: 'Администраторы системы',
                timeout: entry.max
            });
            decorate.modal.printTable.cellGetText({
                head: 'Телефон',
                str: 4,
                cell: 2,
                value: '',
                timeout: entry.max
            });
            decorate.modal.printTable.cellGetText({
                head: 'Описание',
                str: 4,
                cell: 3,
                value: '',
                timeout: entry.max
            });
        });

        describe('Закрытие печатной формы дерева', () => {
            decorate.modal.printTable.closeHandler({
                timeout: entry.max
            });
            decorate.modal.printTable.initClose({
                timeout: entry.max
            });
        });
    });

    const exportXLSX = () => describe('Персонал / Подразделения. Проверка экспорта XLSX.',
        () => {

            const params = {
                nameFile: 'division.xlsx',
                json: [
                    {
                        'Отчет "Подразделения"': 'Подразделение',
                        __EMPTY: 'Телефон',
                        __EMPTY_1: 'Описание',
                        __EMPTY_2: 'Шаблон доступа для сотрудников',
                        __EMPTY_3: 'Шаблон доступа для посетителей',
                        __EMPTY_4: 'График работы',
                        __EMPTY_5: 'Сопровождающий'
                    },
                    {
                        'Отчет "Подразделения"': 'division1Update',
                        __EMPTY: 'phone1',
                        __EMPTY_1: 'description1',
                        __EMPTY_2: 'template1, template2',
                        __EMPTY_3: 'template1',
                        __EMPTY_4: 'schedule1',
                        __EMPTY_5: 'staff name 1'
                    },
                    {
                        'Отчет "Подразделения"': 'division1Update/division2Update',
                        __EMPTY: 'phone2',
                        __EMPTY_1: 'description2',
                        __EMPTY_2: 'template1, template2',
                        __EMPTY_3: 'template1',
                        __EMPTY_4: 'schedule1',
                        __EMPTY_5: 'staff name 1'
                    },
                    {
                        'Отчет "Подразделения"': 'division1Update/division2Update/division3Update',
                        __EMPTY: 'phone3',
                        __EMPTY_1: 'description3',
                        __EMPTY_2: 'template1, template2',
                        __EMPTY_3: 'template1',
                        __EMPTY_4: 'schedule1',
                        __EMPTY_5: 'staff name 1'
                    },
                    {
                        'Отчет "Подразделения"': 'Администраторы системы',
                        __EMPTY: '',
                        __EMPTY_1: '',
                        __EMPTY_2: '',
                        __EMPTY_3: '',
                        __EMPTY_4: '',
                        __EMPTY_5: ''
                    }
                ]
            }

            bef();
            aft();

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

    const exportCSV = () => describe('Персонал / Подразделения. Проверка экспорта CSV.',
        () => {

            const params = {
                nameFile: 'division.csv',
                json: [
                    {
                        'Подразделение': 'division1Update',
                        'Телефон': 'phone1',
                        'Описание': 'description1',
                        'Шаблон доступа для сотрудников': 'template1, template2',
                        'Шаблон доступа для посетителей': 'template1',
                        'График работы': 'schedule1',
                        'Сопровождающий': 'staff name 1'
                    },
                    {
                        'Подразделение': 'division1Update/division2Update',
                        'Телефон': 'phone2',
                        'Описание': 'description2',
                        'Шаблон доступа для сотрудников': 'template1, template2',
                        'Шаблон доступа для посетителей': 'template1',
                        'График работы': 'schedule1',
                        'Сопровождающий': 'staff name 1'
                    },
                    {
                        'Подразделение': 'division1Update/division2Update/division3Update',
                        'Телефон': 'phone3',
                        'Описание': 'description3',
                        'Шаблон доступа для сотрудников': 'template1, template2',
                        'Шаблон доступа для посетителей': 'template1',
                        'График работы': 'schedule1',
                        'Сопровождающий': 'staff name 1'
                    },
                    { 'Подразделение': 'Администраторы системы' }
                ]
            }

            bef();
            aft();

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

    const searchFilter = () => describe('Персонал / Подразделения. Проверка фильтра "Поиск...".', () => {
        bef();
        aft();

        describe('Проверка таблицы до использования фильтра "Поиск..."', () => {
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
            decorate.page.division.size({
                size: 4,
                timeout: entry.max
            });
            decorate.page.division.division({
                arr: [data.divisionsUpdate.division1.division],
                timeout: entry.max
            });
            decorate.page.division.division({
                arr: [data.divisionsUpdate.division1.division, data.divisionsUpdate.division2.division],
                timeout: entry.max
            });
            decorate.page.division.division({
                arr: [
                    data.divisionsUpdate.division1.division,
                    data.divisionsUpdate.division2.division,
                    data.divisionsUpdate.division3.division
                ],
                timeout: entry.max
            });
            decorate.page.division.division({
                arr: ['Администраторы системы'],
                timeout: entry.max
            });
        });

        describe(`Ввод в фильтр "${data.divisionsUpdate.division2.division}"`, () => {
            decorate.el.input.sendKeys({
                title: '',
                placeholder: 'Поиск...',
                value: data.divisionsUpdate.division2.division,
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
        });

        describe('Проверка таблицы после измпользования фильтра "Поиск..."', () => {
            decorate.page.division.size({
                size: 2,
                timeout: entry.max
            });
            decorate.page.division.division({
                arr: [data.divisionsUpdate.division1.division],
                timeout: entry.max
            });
            decorate.page.division.division({
                arr: [data.divisionsUpdate.division1.division, data.divisionsUpdate.division2.division],
                timeout: entry.max
            });
            decorate.page.division.noDivision({
                arr: [
                    data.divisionsUpdate.division1.division,
                    data.divisionsUpdate.division2.division,
                    data.divisionsUpdate.division3.division
                ],
                timeout: entry.max
            });
            decorate.page.division.noDivision({
                arr: ['Администраторы системы'],
                timeout: entry.max
            });
        });

        describe(`Удаление "${data.divisionsUpdate.division2.division}" из фильтра "Поиск..." и проверка`,() => {
            decorate.el.input.backSpace({
                title: '',
                placeholder: 'Поиск...',
                timeout: entry.max
            });
            dec.animation();
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
            decorate.page.division.size({
                size: 4,
                timeout: entry.max
            });
            decorate.page.division.division({
                arr: [data.divisionsUpdate.division1.division],
                timeout: entry.max
            });
            decorate.page.division.division({
                arr: [data.divisionsUpdate.division1.division, data.divisionsUpdate.division2.division],
                timeout: entry.max
            });
            decorate.page.division.division({
                arr: [
                    data.divisionsUpdate.division1.division,
                    data.divisionsUpdate.division2.division,
                    data.divisionsUpdate.division3.division
                ],
                timeout: entry.max
            });
            decorate.page.division.division({
                arr: ['Администраторы системы'],
                timeout: entry.max
            });
        });
    });

    const addDuplicate = () => describe('Персонал / Подразделения. Проверка добавления дупликатов', () => {

        bef();
        aft();

        describe('Попытка добавления дубликата подразделения на одном уровне', () => {
            decorate.page.division.handler({
                arr: [data.divisionsUpdate.division1.division],
                timeout: entry.max
            });
            decorate.page.division.selected({
                division: data.divisionsUpdate.division1.division,
                timeout: entry.max
            });
            decorate.el.butIcBefore.handler({
                icon: but.add,
                timeout: entry.max
            });
            decorate.modal.divisionAdd.init({
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
            decorate.el.input.sendKeys({
                title: 'Подразделение',
                placeholder: '',
                value: data.divisionsUpdate.division2.division,
                timeout: entry.max
            });
            decorate.el.button.handler({
                name: 'Сохранить',
                timeout: entry.max
            });
            decorate.el.error.error({
                text: 'Данное подразделение уже существует',
                timeout: entry.max
            });
            decorate.modal.divisionAdd.closeHandler({
                timeout: entry.max
            });
            decorate.modal.divisionAdd.initClose({
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
            decorate.page.base.refresh();
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
        });

        describe('Попытка добавления дубликата подразделения на разном уровне', () => {
            decorate.el.butIcBefore.handler({
                icon: but.add,
                timeout: entry.max
            });
            decorate.modal.divisionAdd.init({
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
            decorate.el.input.sendKeys({
                title: 'Подразделение',
                placeholder: '',
                value: data.divisionsUpdate.division2.division,
                timeout: entry.max
            });
            decorate.el.button.handler({
                name: 'Сохранить',
                timeout: entry.max
            });
            decorate.el.success.success({
                text: 'Подразделение успешно добавлено!',
                timeout: entry.max
            });
            decorate.modal.divisionAdd.initClose({
                timeout: entry.max
            });
        });

        describe('Отображение добавленного подразделения', () => {
            decorate.page.division.size({
                size: 5,
                timeout: entry.max
            });
            decorate.page.division.division({
                arr: [data.divisionsUpdate.division2.division],
                timeout: entry.max
            });
        });
    });

    const deletedFailedHead = () => describe('Персонал / Подразделения. Попытка удаление головного подразделения.',
        () => {
        bef();
        aft();
        decorate.page.division.handler({
            arr: [data.divisionsUpdate.division1.division, data.divisionsUpdate.division2.division],
            timeout: entry.max
        });
        decorate.page.division.selected({
            division: data.divisionsUpdate.division2.division,
            timeout: entry.max
        });
        decorate.el.butIcBefore.handler({
            icon: but.delete,
            timeout: entry.max
        });
        decorate.modalConfirm.divisionDelete.init({
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
            text: 'Нельзя удалить подразделение, содержащее дочерние подразделения',
            timeout: entry.max
        });
        decorate.modal.divisionAdd.initClose({
            timeout: entry.max
        });
    });

    const deletedFailedStaff = () => describe('Персонал / Подразделения. Попытка удаление подразделения, ' +
        'добавленного сотруднику.',
        () => {
            bef();
            aft();
            decorate.page.division.handler({
                arr: [data.divisionsUpdate.division1.division],
                timeout: entry.max
            });
            decorate.page.division.selected({
                division: data.divisionsUpdate.division1.division,
                timeout: entry.max
            });
            decorate.el.butIcBefore.handler({
                icon: but.delete,
                timeout: entry.max
            });
            decorate.modalConfirm.divisionDelete.init({
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
                text: 'Подразделение используется и не может быть удалено',
                timeout: entry.max
            });
            decorate.modalConfirm.divisionDelete.initClose({
                timeout: entry.max
            });
        });

    const importFile = () => describe('Персонал / Подразделения. Проверка импорта.', () => {

        describe('Импорт', () => {
            bef();
            aft();
            decorate.el.butIcBefore.handler({
                icon: but.menu,
                timeout: entry.max
            });
            decorate.el.menu.menu({
                timeout: entry.max
            });
            decorate.el.menu.handler({
                name: 'Импорт из XLS, XLSX',
                timeout: entry.max
            });
            decorate.modal.importFile.init({
                timeout: entry.max
            });
            decorate.modal.importFile.uploadFile({
                src: imp.division.importDivision,
                timeout: entry.upload
            });
            decorate.el.select.iconXpand({
                title: 'Подразделение',
                value: '',
                text: 'Подразделение1',
                timeout: entry.max
            });
            decorate.el.select.iconXpand({
                title: 'Телефон',
                value: '',
                text: 'Телефон1',
                timeout: entry.max
            });
            decorate.el.select.iconXpand({
                title: 'Описание',
                value: '',
                text: 'Описание1',
                timeout: entry.max
            });
            decorate.el.select.iconXpand({
                title: 'Сопровождающий',
                value: '',
                text: 'Сопровождающий1',
                timeout: entry.max
            });
            decorate.el.select.iconXpand({
                title: 'Шаблон доступа для сотрудника',
                value: '',
                text: 'Шаблон доступа для сотрудника1',
                timeout: entry.max
            });
            decorate.el.select.iconXpand({
                title: 'Шаблон доступа для посетителя',
                value: '',
                text: 'Шаблон доступа для посетителя1',
                timeout: entry.max
            });
            decorate.el.select.iconXpand({
                title: 'График работы',
                value: '',
                text: 'График работы1',
                timeout: entry.max
            });
            decorate.el.button.handler({
                name: 'Далее',
                timeout: entry.max
            });
            decorate.el.button.button({
                name: 'Готово',
                timeout: entry.max
            });
            decorate.modal.importFile.bodyGetText({
                value: 'Импорт завершен',
                timeout: entry.max
            });
            decorate.el.button.handler({
                name: 'Готово',
                timeout: entry.max
            });
            decorate.modal.importFile.initClose({
                timeout: entry.max
            });
        });

        describe('Проверка', () => {
            bef();
            aft();

            describe('Общие проверки', () => {
                decorate.page.division.size({
                    size: 8,
                    timeout: entry.max
                });
                decorate.page.division.division({
                    arr: [data.divisions.division1],
                    timeout: entry.max
                });
                decorate.page.division.division({
                    arr: [data.divisions.division1, data.divisions.division2],
                    timeout: entry.max
                });
                decorate.page.division.division({
                    arr: [data.divisions.division1, data.divisions.division2, data.divisions.division3],
                    timeout: entry.max
                });
            });

            describe('Проверка подразделение 1', () => {
                decorate.page.division.handler({
                    arr: [data.divisions.division1],
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.page.division.selected({
                    division: data.divisions.division1,
                    timeout: entry.max
                });
                decorate.el.input.getValue({
                    title: 'Телефон',
                    placeholder: '',
                    value: data.divisionsUpdate.division1.phone,
                    timeout: entry.max
                });
                decorate.el.input.getValue({
                    title: 'Описание',
                    placeholder: '',
                    value: data.divisionsUpdate.division1.description,
                    timeout: entry.max
                });
                decorate.el.input.getValue({
                    title: 'Сопровождающий',
                    placeholder: '',
                    value: data.fio.staff1,
                    timeout: entry.max
                });
                decorate.el.input.getValue({
                    title: 'Шаблон доступа для сотрудника',
                    placeholder: '',
                    value: data.templates.template1,
                    timeout: entry.max
                });
                decorate.el.input.getValue({
                    title: 'Шаблон доступа для посетителя',
                    placeholder: '',
                    value: data.templates.template2,
                    timeout: entry.max
                });
                decorate.el.input.getValue({
                    title: 'График работы',
                    placeholder: '',
                    value: data.schedules.schedule1.name,
                    timeout: entry.max
                });
            });

            describe('Проверка подразделение 2', () => {
                decorate.page.division.handler({
                    arr: [data.divisions.division1, data.divisions.division2],
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.page.division.selected({
                    division: data.divisions.division2,
                    timeout: entry.max
                });
                decorate.el.input.getValue({
                    title: 'Телефон',
                    placeholder: '',
                    value: data.divisionsUpdate.division2.phone,
                    timeout: entry.max
                });
                decorate.el.input.getValue({
                    title: 'Описание',
                    placeholder: '',
                    value: data.divisionsUpdate.division2.description,
                    timeout: entry.max
                });
                decorate.el.input.getValue({
                    title: 'Сопровождающий',
                    placeholder: '',
                    value: data.fio.staff1,
                    timeout: entry.max
                });
                decorate.el.input.getValue({
                    title: 'Шаблон доступа для сотрудника',
                    placeholder: '',
                    value: data.templates.template1,
                    timeout: entry.max
                });
                decorate.el.input.getValue({
                    title: 'Шаблон доступа для посетителя',
                    placeholder: '',
                    value: data.templates.template2,
                    timeout: entry.max
                });
                decorate.el.input.getValue({
                    title: 'График работы',
                    placeholder: '',
                    value: data.schedules.schedule1.name,
                    timeout: entry.max
                });
            });

            describe('Проверка подразделение 3', () => {
                decorate.page.division.handler({
                    arr: [data.divisions.division1, data.divisions.division2, data.divisions.division3],
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.page.division.selected({
                    division: data.divisions.division3,
                    timeout: entry.max
                });
                decorate.el.input.getValue({
                    title: 'Телефон',
                    placeholder: '',
                    value: data.divisionsUpdate.division3.phone,
                    timeout: entry.max
                });
                decorate.el.input.getValue({
                    title: 'Описание',
                    placeholder: '',
                    value: data.divisionsUpdate.division3.description,
                    timeout: entry.max
                });
                decorate.el.input.getValue({
                    title: 'Сопровождающий',
                    placeholder: '',
                    value: data.fio.staff1,
                    timeout: entry.max
                });
                decorate.el.input.getValue({
                    title: 'Шаблон доступа для сотрудника',
                    placeholder: '',
                    value: data.templates.template1,
                    timeout: entry.max
                });
                decorate.el.input.getValue({
                    title: 'Шаблон доступа для посетителя',
                    placeholder: '',
                    value: data.templates.template2,
                    timeout: entry.max
                });
                decorate.el.input.getValue({
                    title: 'График работы',
                    placeholder: '',
                    value: data.schedules.schedule1.name,
                    timeout: entry.max
                });
            });

        });
    });

    const importFailed = () => describe('Персонал / Подразделения. Проверка импорта с ошибкой - без шаблона доступа.',
        () => {

        const params = {
                fileName: 'unimported.xlsx',
                json: [
                    {
                        'Отчет "Неимпортированные данные"': 'Подразделение1',
                        __EMPTY: 'Телефон1',
                        __EMPTY_1: 'Описание1',
                        __EMPTY_2: 'Шаблон доступа для сотрудника1',
                        __EMPTY_3: 'Шаблон доступа для посетителя1',
                        __EMPTY_4: 'График работы1',
                        __EMPTY_5: 'Сопровождающий1',
                        __EMPTY_6: 'Ошибка'
                    },
                    {
                        'Отчет "Неимпортированные данные"': 'division1',
                        __EMPTY: 'phone1',
                        __EMPTY_1: 'description1',
                        __EMPTY_2: 'template1',
                        __EMPTY_3: 'template2',
                        __EMPTY_4: 'schedule1',
                        __EMPTY_5: 'staff name 1',
                        __EMPTY_6: 'Отдел уже существует'
                    },
                    {
                        'Отчет "Неимпортированные данные"': 'division1/division2',
                        __EMPTY: 'phone2',
                        __EMPTY_1: 'description2',
                        __EMPTY_2: 'template1',
                        __EMPTY_3: 'template2',
                        __EMPTY_4: 'schedule1',
                        __EMPTY_5: 'staff name 1',
                        __EMPTY_6: 'Отдел уже существует'
                    },
                    {
                        'Отчет "Неимпортированные данные"': 'division1/division2/division3',
                        __EMPTY: 'phone3',
                        __EMPTY_1: 'description3',
                        __EMPTY_2: 'template1',
                        __EMPTY_3: 'template2',
                        __EMPTY_4: 'schedule1',
                        __EMPTY_5: 'staff name 1',
                        __EMPTY_6: 'Отдел уже существует'
                    }
                ]
            }

        describe('Импорт', () => {
            bef();
            aft();
            decorate.el.butIcBefore.handler({
                icon: but.menu,
                timeout: entry.max
            });
            decorate.el.menu.menu({
                timeout: entry.max
            });
            decorate.el.menu.handler({
                name: 'Импорт из XLS, XLSX',
                timeout: entry.max
            });
            decorate.modal.importFile.init({
                timeout: entry.max
            });
            decorate.modal.importFile.uploadFile({
                src: imp.division.importDivision,
                timeout: entry.upload
            });
            decorate.el.select.iconXpand({
                title: 'Подразделение',
                value: '',
                text: 'Подразделение1',
                timeout: entry.max
            });
            decorate.el.select.iconXpand({
                title: 'Телефон',
                value: '',
                text: 'Телефон1',
                timeout: entry.max
            });
            decorate.el.select.iconXpand({
                title: 'Описание',
                value: '',
                text: 'Описание1',
                timeout: entry.max
            });
            decorate.el.select.iconXpand({
                title: 'Сопровождающий',
                value: '',
                text: 'Сопровождающий1',
                timeout: entry.max
            });
            decorate.el.select.iconXpand({
                title: 'Шаблон доступа для сотрудника',
                value: '',
                text: 'Шаблон доступа для сотрудника1',
                timeout: entry.max
            });
            decorate.el.button.handler({
                name: 'Далее',
                timeout: entry.max
            });
            decorate.el.button.button({
                name: 'Экспорт остатка в файл',
                timeout: entry.max
            });
            decorate.modal.importFile.bodyGetText({
                value: 'Импорт завершен. 3 записей из 3 не было импортировано',
                timeout: entry.max
            });
            decorate.el.button.handler({
                name: 'Экспорт остатка в файл',
                timeout: entry.max
            });
            decorate.modal.importFile.initClose({
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
        });

        describe('Проверка', () => {
            bef();
            aft();

            describe('Общие проверки', () => {
                decorate.page.division.size({
                    size: 8,
                    timeout: entry.max
                });
            });
        });

        describe('Проверка файла с ошибками', () => {
            decorate.el.file.display({
                file: params.fileName,
                timeout: entry.upload
            });
            decorate.el.file.comparison({
                file: params.fileName,
                json: params.json
            });
            decorate.el.file.delete({
                file: params.fileName,
                timeout: entry.upload
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
        });
    });

    const deleted = () => describe('Персонал / Подразделения. Удаление подразделений.', () => {

        describe('Удаление', () => {
            bef();
            aft();

            decorate.page.division.handler({
                arr: [
                    data.divisionsUpdate.division1.division,
                    data.divisionsUpdate.division2.division,
                    data.divisionsUpdate.division3.division
                ],
                timeout: entry.max
            });
            decorate.page.division.selected({
                division: data.divisionsUpdate.division3.division,
                timeout: entry.max
            });
            decorate.el.butIcBefore.handler({
                icon: but.delete,
                timeout: entry.max
            });
            decorate.modalConfirm.divisionDelete.init({
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
                text: 'Выбранное подразделение было удалено',
                timeout: entry.max
            });
            decorate.modalConfirm.divisionDelete.initClose({
                timeout: entry.max
            });

            decorate.page.division.handler({
                arr: [
                    data.divisionsUpdate.division1.division,
                    data.divisionsUpdate.division2.division
                ],
                timeout: entry.max
            });
            decorate.page.division.selected({
                division: data.divisionsUpdate.division2.division,
                timeout: entry.max
            });
            decorate.el.butIcBefore.handler({
                icon: but.delete,
                timeout: entry.max
            });
            decorate.modalConfirm.divisionDelete.init({
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
                text: 'Выбранное подразделение было удалено',
                timeout: entry.max
            });
            decorate.modalConfirm.divisionDelete.initClose({
                timeout: entry.max
            });

            decorate.page.division.handler({
                arr: [data.divisionsUpdate.division1.division,],
                timeout: entry.max
            });
            decorate.page.division.selected({
                division: data.divisionsUpdate.division1.division,
                timeout: entry.max
            });
            decorate.el.butIcBefore.handler({
                icon: but.delete,
                timeout: entry.max
            });
            decorate.modalConfirm.divisionDelete.init({
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
                text: 'Выбранное подразделение было удалено',
                timeout: entry.max
            });
            decorate.modalConfirm.divisionDelete.initClose({
                timeout: entry.max
            });

            decorate.page.division.handler({
                arr: [data.divisions.division1, data.divisions.division2, data.divisions.division3],
                timeout: entry.max
            });
            decorate.page.division.selected({
                division: data.divisions.division3,
                timeout: entry.max
            });
            decorate.el.butIcBefore.handler({
                icon: but.delete,
                timeout: entry.max
            });
            decorate.modalConfirm.divisionDelete.init({
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
                text: 'Выбранное подразделение было удалено',
                timeout: entry.max
            });
            decorate.modalConfirm.divisionDelete.initClose({
                timeout: entry.max
            });

            decorate.page.division.handler({
                arr: [data.divisions.division1, data.divisions.division2],
                timeout: entry.max
            });
            decorate.page.division.selected({
                division: data.divisions.division2,
                timeout: entry.max
            });
            decorate.el.butIcBefore.handler({
                icon: but.delete,
                timeout: entry.max
            });
            decorate.modalConfirm.divisionDelete.init({
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
                text: 'Выбранное подразделение было удалено',
                timeout: entry.max
            });
            decorate.modalConfirm.divisionDelete.initClose({
                timeout: entry.max
            });

            decorate.page.division.handler({
                arr: [data.divisions.division1],
                timeout: entry.max
            });
            decorate.page.division.selected({
                division: data.divisions.division1,
                timeout: entry.max
            });
            decorate.el.butIcBefore.handler({
                icon: but.delete,
                timeout: entry.max
            });
            decorate.modalConfirm.divisionDelete.init({
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
                text: 'Выбранное подразделение было удалено',
                timeout: entry.max
            });
            decorate.modalConfirm.divisionDelete.initClose({
                timeout: entry.max
            });

            decorate.page.division.handler({
                arr: [data.divisionsUpdate.division2.division,],
                timeout: entry.max
            });
            decorate.page.division.selected({
                division: data.divisionsUpdate.division2.division,
                timeout: entry.max
            });
            decorate.el.butIcBefore.handler({
                icon: but.delete,
                timeout: entry.max
            });
            decorate.modalConfirm.divisionDelete.init({
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
                text: 'Выбранное подразделение было удалено',
                timeout: entry.max
            });
            decorate.modalConfirm.divisionDelete.initClose({
                timeout: entry.max
            });
        });

        describe('Проверка', () => {
            bef();
            aft();
            decorate.page.division.size({
                size: 1,
                timeout: entry.max
            });
            decorate.page.division.division({
                arr: ['Администраторы системы'],
                timeout: entry.max
            });
        });
    });

    return {
        add,
        edit,
        print,
        printTree,
        exportXLSX,
        exportCSV,
        searchFilter,
        addDuplicate,
        deletedFailedHead,
        deletedFailedStaff,
        importFile,
        importFailed,
        deleted
    }
}

module.exports = {
    other: other(),
    befDivision: () => bef()
}
