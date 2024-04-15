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
const data = require('../../data').dataDesign;
const {befStaffActive} = require('../personal/staff-ui');
const {befVisitorOrdered} = require('../pass-office/visitor-ui');

const befDesign = () => before('Вход и открытие подраздела "Дизайн пропуска"',
    async () => {
        await page.base.loading(entry.sleep1);
        await dec.auth(entry.customLogin, entry.customPassword);
        await dec.simple(el.section.handler, [sec.pas, entry.max], el.section);
        await dec.simple(el.subsection.handler, [sub.pas.design, entry.max], el.subsection);
        await dec.simple(page.design.init, [entry.max], page.design);
        await page.base.loading(entry.sleep1);
    });

const aft = () => after('Выход', async () => {
    await page.base.loading(entry.sleep1);
    await dec.exit();
});

const other = (type, text) => {

    const add = () => describe('Бюро пропусков / Дизайн пропуска.' + text + 'Добавление.', () => {

        if(type === 'staff') {
            describe('Добавление', () => {
                befDesign();
                aft();
                decorate.el.butIcBefore.handler({
                    icon: but.add,
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.init.designAdd();
                decorate.el.input.backSpace({
                    title: 'Название',
                    placeholder: '',
                    timeout: entry.max
                });
                decorate.el.input.sendKeys({
                    title: 'Название',
                    placeholder: '',
                    value: data.designStaff1,
                    timeout: entry.max
                });
                decorate.el.select.iconXpand({
                    title: 'Тип',
                    value: 'Сотрудники',
                    text: 'Сотрудники',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.button.handler({
                    name: 'Сохранить',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
            });

            describe('Проверка', () => {
                describe('Проверка таблицы', () => {
                    befDesign();
                    aft();
                    decorate.page.design.size({
                        size: 1,
                        timeout: entry.max
                    });
                    decorate.page.design.name({
                        num: 1,
                        value: data.designStaff1,
                        timeout: entry.max
                    });
                    decorate.page.design.type({
                        num: 1,
                        value: 'Сотрудник',
                        timeout: entry.max
                    });
                });

                describe('Проверка отображения в Персонал / Сотрудники', () => {
                    befStaffActive();
                    aft();
                    decorate.el.table.strHandler({
                        strNumber: 1,
                        timeout: entry.max
                    });
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
                        name: 'Печать пропуска',
                        timeout: entry.max
                    });
                    decorate.modal.printDesignCard.init({
                        timeout: entry.max
                    });
                    decorate.el.select.iconXpand({
                        title: 'Шаблон',
                        value: '',
                        text: data.designStaff1,
                        timeout: entry.max
                    });
                    decorate.modal.printDesignCard.closeHandler({
                        timeout: entry.max
                    });
                    decorate.modal.printDesignCard.initClose({
                        timeout: entry.max
                    });
                });
            });
        }

        if(type === 'visitor') {
            describe('Добавление', () => {
                befDesign();
                aft();
                decorate.el.butIcBefore.handler({
                    icon: but.add,
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.init.designAdd();
                decorate.el.input.backSpace({
                    title: 'Название',
                    placeholder: '',
                    timeout: entry.max
                });
                decorate.el.input.sendKeys({
                    title: 'Название',
                    placeholder: '',
                    value: data.designVisitor1,
                    timeout: entry.max
                });
                decorate.el.select.iconXpand({
                    title: 'Тип',
                    value: 'Сотрудники',
                    text: 'Посетители',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.button.handler({
                    name: 'Сохранить',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
            });

            describe('Проверка', () => {
                describe('Проверка таблицы', () => {
                    befDesign();
                    aft();
                    decorate.page.design.size({
                        size: 2,
                        timeout: entry.max
                    });
                    decorate.page.design.name({
                        num: 2,
                        value: data.designVisitor1,
                        timeout: entry.max
                    });
                    decorate.page.design.type({
                        num: 2,
                        value: 'Посетитель',
                        timeout: entry.max
                    });
                });

                describe('Проверка отображения в Бюро пропусков / Посетители', () => {
                    befVisitorOrdered();
                    aft();
                    decorate.el.table.strHandler({
                        strNumber: 1,
                        timeout: entry.max
                    });
                    decorate.el.butIcBefore.handler({
                        icon: but.unsorted_user_card_outline,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.modal.printDesignCard.init({
                        timeout: entry.max
                    });
                    decorate.el.select.iconXpand({
                        title: 'Шаблон',
                        value: '',
                        text: data.designVisitor1,
                        timeout: entry.max
                    });
                    decorate.modal.printDesignCard.closeHandler({
                        timeout: entry.max
                    });
                    decorate.modal.printDesignCard.initClose({
                        timeout: entry.max
                    });
                });
            });
        }
        
    });

    const edit = () => describe('Бюро пропусков / Дизайн пропуска.' + text + 'Редактирование.', () => {

        if(type === 'staff') {
            describe('Редактирование', () => {
                befDesign();
                aft();
                decorate.page.design.handler({
                    num: 1,
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.butIcBefore.handler({
                    icon: but.edit,
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.init.designEdit();
                decorate.el.input.backSpace({
                    title: 'Название',
                    placeholder: '',
                    timeout: entry.max
                });
                decorate.el.input.sendKeys({
                    title: 'Название',
                    placeholder: '',
                    value: data.designVisitor2,
                    timeout: entry.max
                });
                decorate.el.select.iconXpand({
                    title: 'Тип',
                    value: 'Сотрудники',
                    text: 'Посетители',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.button.handler({
                    name: 'Сохранить',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
            });

            describe('Проверка таблицы', () => {
                befDesign();
                aft();
                decorate.page.design.size({
                    size: 2,
                    timeout: entry.max
                });
                decorate.page.design.name({
                    num: 2,
                    value: data.designVisitor2,
                    timeout: entry.max
                });
                decorate.page.design.type({
                    num: 2,
                    value: 'Посетитель',
                    timeout: entry.max
                });
            });
        }

        if(type === 'visitor') {
            describe('Редактирование', () => {
                befDesign();
                aft();
                decorate.page.design.handler({
                    num: 1,
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.butIcBefore.handler({
                    icon: but.edit,
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.init.designEdit();
                decorate.el.input.backSpace({
                    title: 'Название',
                    placeholder: '',
                    timeout: entry.max
                });
                decorate.el.input.sendKeys({
                    title: 'Название',
                    placeholder: '',
                    value: data.designStaff2,
                    timeout: entry.max
                });
                decorate.el.select.iconXpand({
                    title: 'Тип',
                    value: 'Посетители',
                    text: 'Сотрудники',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.button.handler({
                    name: 'Сохранить',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
            });

            describe('Проверка таблицы', () => {
                befDesign();
                aft();
                decorate.page.design.size({
                    size: 2,
                    timeout: entry.max
                });
                decorate.page.design.name({
                    num: 1,
                    value: data.designStaff2,
                    timeout: entry.max
                });
                decorate.page.design.type({
                    num: 1,
                    value: 'Сотрудник',
                    timeout: entry.max
                });
            });
        }
    });

    const copy = () => describe('Бюро пропусков / Дизайн пропуска.' + text + 'Копирование.', () => {

        if(type === 'staff') {
            describe('Копирование', () => {
                befDesign();
                aft();
                decorate.page.design.handler({
                    num: 1,
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.butIcBefore.handler({
                    icon: but.copy,
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.init.designCopy();
                decorate.el.input.backSpace({
                    title: 'Название',
                    placeholder: '',
                    timeout: entry.max
                });
                decorate.el.input.sendKeys({
                    title: 'Название',
                    placeholder: '',
                    value: data.designStaff3,
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.button.handler({
                    name: 'Сохранить',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
            });

            describe('Проверка таблицы', () => {
                befDesign();
                aft();
                decorate.page.design.size({
                    size: 3,
                    timeout: entry.max
                });
                decorate.page.design.name({
                    num: 2,
                    value: data.designStaff3,
                    timeout: entry.max
                });
                decorate.page.design.type({
                    num: 2,
                    value: 'Сотрудник',
                    timeout: entry.max
                });
            });
        }

        if(type === 'visitor') {
            describe('Копирование', () => {
                befDesign();
                aft();
                decorate.page.design.handler({
                    num: 3,
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.butIcBefore.handler({
                    icon: but.copy,
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.init.designCopy();
                decorate.el.input.backSpace({
                    title: 'Название',
                    placeholder: '',
                    timeout: entry.max
                });
                decorate.el.input.sendKeys({
                    title: 'Название',
                    placeholder: '',
                    value: data.designVisitor3,
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.button.handler({
                    name: 'Сохранить',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
            });

            describe('Проверка таблицы', () => {
                befDesign();
                aft();
                decorate.page.design.size({
                    size: 4,
                    timeout: entry.max
                });
                decorate.page.design.name({
                    num: 4,
                    value: data.designVisitor3,
                    timeout: entry.max
                });
                decorate.page.design.type({
                    num: 4,
                    value: 'Посетитель',
                    timeout: entry.max
                });
            });
        }
    });

    const typeFilter = () => describe('Бюро пропусков / Дизайн пропуска. Фильтр по типу', () => {
        befDesign();
        aft();

        describe('Отображение до применения фильтра по типу - Сотрудники', () => {
            decorate.page.design.size({
                size: 4,
                timeout: entry.max
            });
            decorate.page.design.type({
                num: 1,
                value: 'Сотрудник',
                timeout: entry.max
            });
            decorate.page.design.type({
                num: 2,
                value: 'Сотрудник',
                timeout: entry.max
            });
            decorate.page.design.type({
                num: 3,
                value: 'Посетитель',
                timeout: entry.max
            });
            decorate.page.design.type({
                num: 4,
                value: 'Посетитель',
                timeout: entry.max
            });
        });

        describe('Выбор тип - Сотрудники', () => {
            decorate.el.select.iconXpand({
                title: '',
                value: 'Отображать все',
                text: 'Сотрудники',
                timeout: entry.max
            });
        });

        describe('Отображение после применения фильтра по типу - Сотрудники', () => {
            decorate.page.design.size({
                size: 2,
                timeout: entry.max
            });
            decorate.page.design.type({
                num: 1,
                value: 'Сотрудник',
                timeout: entry.max
            });
            decorate.page.design.type({
                num: 2,
                value: 'Сотрудник',
                timeout: entry.max
            });
        });

        describe('Выбор тип - Посетители', () => {
            decorate.el.select.iconXpand({
                title: '',
                value: 'Сотрудники',
                text: 'Посетители',
                timeout: entry.max
            });
        });

        describe('Отображение после применения фильтра по типу - Посетители', () => {
            decorate.page.design.size({
                size: 2,
                timeout: entry.max
            });
            decorate.page.design.type({
                num: 1,
                value: 'Посетитель',
                timeout: entry.max
            });
            decorate.page.design.type({
                num: 2,
                value: 'Посетитель',
                timeout: entry.max
            });
        });

        describe('Выбор тип - Отображать все', () => {
            decorate.el.select.iconXpand({
                title: '',
                value: 'Посетители',
                text: 'Отображать все',
                timeout: entry.max
            });
        });

        describe('Отображение после применения фильтра по типу - Отображать все', () => {
            decorate.page.design.size({
                size: 4,
                timeout: entry.max
            });
            decorate.page.design.type({
                num: 1,
                value: 'Сотрудник',
                timeout: entry.max
            });
            decorate.page.design.type({
                num: 2,
                value: 'Сотрудник',
                timeout: entry.max
            });
            decorate.page.design.type({
                num: 3,
                value: 'Посетитель',
                timeout: entry.max
            });
            decorate.page.design.type({
                num: 4,
                value: 'Посетитель',
                timeout: entry.max
            });
        });
    });

    const deleted = () => describe('Бюро пропусков / Дизайн пропуска. Удаление', () => {
        [...Array(4).keys()].forEach(item => {
            describe(`Удаление дизайн пропуска ${item + 1}`, () => {
                befDesign();
                aft();
                decorate.page.design.handler({
                    num: 1,
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.butIcBefore.handler({
                    icon: but.delete,
                    timeout: entry.max
                });
                decorate.modalConfirm.designDelete.init({
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.button.handler({
                    name: 'Удалить',
                    timeout: entry.max
                });
                decorate.modalConfirm.designDelete.initClose({
                    timeout: entry.max
                });
            });
        });

        describe('Проверка отсутствия дизайнов пропуска', () => {
            befDesign();
            aft();
            decorate.page.design.size({
                size: 0,
                timeout: entry.max
            });
        });
    });


    return {
        add,
        edit,
        copy,
        typeFilter,
        deleted
    }
}

module.exports = {
    otherStaff: other('staff', 'Тип - Сотрудник.'),
    otherVisitor: other('visitor', 'Тип - Посетитель.'),
    other: other()

}