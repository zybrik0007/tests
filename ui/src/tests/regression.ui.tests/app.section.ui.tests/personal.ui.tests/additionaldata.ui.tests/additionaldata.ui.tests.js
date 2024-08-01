const {describe, it} = require('mocha');

const entry = require('../../../../../../../entry');
const el = require('../../../../../elements');
const dec = require('../../../../../dictionaries/decorate');
const but = require('../../../../../dictionaries/button-icon');
const decorate = require('../../../../../decorates');
const data = require('./additionaldata.data');

const befStaff = () => decorate.befAft.before.beforeAdditionalStaff();
const befVisitor = () => decorate.befAft.before.beforeAdditionalVisitor();
const aft = () => decorate.befAft.after.afterNoLoader();

const test = (type, text) => {
    const add = () => describe(text +  'Добавление.', () => {

        if(type === 'staff') {
            describe('Добавление', () => {
                befStaff();
                aft();

                describe('Добавление - Тип поля Текстовый', () => {
                    decorate.el.butIcBefore.handler({
                        icon: but.add,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.modal.additionalDataAdd.init({
                        timeout: entry.max
                    });
                    decorate.el.select.iconXpand({
                        title: 'Тип поля',
                        value: 'Текстовый',
                        text: 'Текстовый',
                        timeout: entry.max
                    });
                    decorate.el.input.sendKeys({
                        title: 'Название поля',
                        placeholder: '',
                        value: data.text.name,
                        timeout: entry.max
                    });
                    decorate.el.button.handler({
                        name: 'Сохранить',
                        timeout: entry.max
                    });
                    decorate.el.error.checkError({
                        timeout: entry.sleep2
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.modal.additionalDataAdd.initClose({
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                });

                describe('Добавление - Тип поля Графический', () => {
                    decorate.el.butIcBefore.handler({
                        icon: but.add,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.modal.additionalDataAdd.init({
                        timeout: entry.max
                    });
                    decorate.el.select.iconXpand({
                        title: 'Тип поля',
                        value: 'Текстовый',
                        text: 'Графический',
                        timeout: entry.max
                    });
                    decorate.el.input.sendKeys({
                        title: 'Название поля',
                        placeholder: '',
                        value: data.grafic.name,
                        timeout: entry.max
                    });
                    decorate.el.button.handler({
                        name: 'Сохранить',
                        timeout: entry.max
                    });
                    decorate.el.error.checkError({
                        timeout: entry.sleep2
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.modal.additionalDataAdd.initClose({
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                });

                describe('Добавление - Тип поля Выпадающий список', () => {
                    decorate.el.butIcBefore.handler({
                        icon: but.add,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.modal.additionalDataAdd.init({
                        timeout: entry.max
                    });
                    decorate.el.select.iconXpand({
                        title: 'Тип поля',
                        value: 'Текстовый',
                        text: 'Выпадающий список',
                        timeout: entry.max
                    });
                    decorate.el.input.sendKeys({
                        title: 'Название поля',
                        placeholder: '',
                        value: data.list.name,
                        timeout: entry.max
                    });
                    it(`Ввод значение в поле 1 в списке полей ввода "Поля"`,
                        async () => await dec.simple(el.modal.additionalDataAdd.selectTypeSendKeys,
                            [1, data.list.data, entry.max],
                            el.modal.additionalDataAdd));
                    decorate.el.button.handler({
                        name: 'Сохранить',
                        timeout: entry.max
                    });
                    decorate.el.error.checkError({
                        timeout: entry.sleep2
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.modal.additionalDataAdd.initClose({
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                });

                describe('Добавление - Тип поля Чекбокс', () => {
                    decorate.el.butIcBefore.handler({
                        icon: but.add,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.modal.additionalDataAdd.init({
                        timeout: entry.max
                    });
                    decorate.el.select.iconXpand({
                        title: 'Тип поля',
                        value: 'Текстовый',
                        text: 'Чекбокс',
                        timeout: entry.max
                    });
                    decorate.el.input.sendKeys({
                        title: 'Название поля',
                        placeholder: '',
                        value: data.checkbox.name,
                        timeout: entry.max
                    });
                    decorate.el.button.handler({
                        name: 'Сохранить',
                        timeout: entry.max
                    });
                    decorate.el.error.checkError({
                        timeout: entry.sleep2
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.modal.additionalDataAdd.initClose({
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                });

                describe('Добавление - Тип поля Дата', () => {
                    decorate.el.butIcBefore.handler({
                        icon: but.add,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.modal.additionalDataAdd.init({
                        timeout: entry.max
                    });
                    decorate.el.select.iconXpand({
                        title: 'Тип поля',
                        value: 'Текстовый',
                        text: 'Дата',
                        timeout: entry.max
                    });
                    decorate.el.input.sendKeys({
                        title: 'Название поля',
                        placeholder: '',
                        value: data.date.name,
                        timeout: entry.max
                    });
                    decorate.el.button.handler({
                        name: 'Сохранить',
                        timeout: entry.max
                    });
                    decorate.el.error.checkError({
                        timeout: entry.sleep2
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.modal.additionalDataAdd.initClose({
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                });

                describe('Добавление - Тип поля Дата и время', () => {
                    decorate.el.butIcBefore.handler({
                        icon: but.add,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.modal.additionalDataAdd.init({
                        timeout: entry.max
                    });
                    decorate.el.select.iconXpand({
                        title: 'Тип поля',
                        value: 'Текстовый',
                        text: 'Дата и время',
                        timeout: entry.max
                    });
                    decorate.el.input.sendKeys({
                        title: 'Название поля',
                        placeholder: '',
                        value: data.dateTime.name,
                        timeout: entry.max
                    });
                    decorate.el.button.handler({
                        name: 'Сохранить',
                        timeout: entry.max
                    });
                    decorate.el.error.checkError({
                        timeout: entry.sleep2
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.modal.additionalDataAdd.initClose({
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                });
            });

            describe('Проверка', () => {
                befStaff();
                aft();

                describe('Общая проверка', () => {
                    decorate.el.table.size({
                        strCount: 12,
                        timeout: entry.max
                    });
                });

                describe('Проверка таблицы', () => {
                    const head = ['Названеи поля', 'Тип поля', 'Описание', 'Значение по умолчанию'];
                    const table = [
                        ['dateTimeName', 'Дата и время', '', ''],
                        ['dateName', 'Дата', '', ''],
                        ['checkboxName', 'Чекбокс', '', 'Да'],
                        ['listName', 'Выпадающий список', '', ''],
                        ['graficName', 'Графический', '', ''],
                        ['textName', 'Текстовый', '', ''],
                        ['Фотография', 'Графический', 'Служебное поле', ''],
                        ['Пин-код', 'Пин-код', 'Служебное поле', ''],
                        ['Viber', 'Viber', 'Служебное поле', ''],
                        ['Телефон', 'Телефон', 'Служебное поле', ''],
                        ['Email', 'Email', 'Служебное поле', ''],
                        ['Telegram', 'Telegram', 'Служебное поле', ''],

                    ];

                    table.forEach((item1, index1) => {
                        describe(`Проверка строки ${index1 + 1}`, () => {
                            item1.forEach((item2, index2) => {
                                decorate.el.table.cellGetText({
                                    headTitle: head[index2],
                                    strNumber: index1 + 1,
                                    cellNumber: index2 + 1,
                                    value: item2,
                                    timeout: entry.max
                                });
                            });
                        });
                    })
                });

                describe('Проверка строки 1', () => {
                    decorate.el.table.strHandler({
                        strNumber: 1,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.butIcBefore.handler({
                        icon: but.edit,
                        timeout: entry.max
                    });
                    decorate.modal.additionalDataEdit.init({
                        timeout: entry.max
                    });
                    decorate.el.input.getValue({
                        title: 'Название поля',
                        placeholder: '',
                        value: data.dateTime.name,
                        timeout: entry.max
                    });
                    decorate.el.input.getValue({
                        title: 'Описание',
                        placeholder: '',
                        value: '',
                        timeout: entry.max
                    });
                    decorate.el.select.select({
                        title: 'Тип поля',
                        value: 'Дата и время',
                        timeout: entry.max
                    });
                    decorate.modal.additionalDataEdit.closeHandler({
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                });

                describe('Проверка строки 2', () => {
                    decorate.el.table.strHandler({
                        strNumber: 2,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.butIcBefore.handler({
                        icon: but.edit,
                        timeout: entry.max
                    });
                    decorate.modal.additionalDataEdit.init({
                        timeout: entry.max
                    });
                    decorate.el.input.getValue({
                        title: 'Название поля',
                        placeholder: '',
                        value: data.date.name,
                        timeout: entry.max
                    });
                    decorate.el.input.getValue({
                        title: 'Описание',
                        placeholder: '',
                        value: '',
                        timeout: entry.max
                    });
                    decorate.el.select.select({
                        title: 'Тип поля',
                        value: 'Дата',
                        timeout: entry.max
                    });
                    decorate.modal.additionalDataEdit.closeHandler({
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                });

                describe('Проверка строки 3', () => {
                    decorate.el.table.strHandler({
                        strNumber: 3,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.butIcBefore.handler({
                        icon: but.edit,
                        timeout: entry.max
                    });
                    decorate.modal.additionalDataEdit.init({
                        timeout: entry.max
                    });
                    decorate.el.input.getValue({
                        title: 'Название поля',
                        placeholder: '',
                        value: data.checkbox.name,
                        timeout: entry.max
                    });
                    decorate.el.input.getValue({
                        title: 'Описание',
                        placeholder: '',
                        value: '',
                        timeout: entry.max
                    });
                    decorate.el.select.select({
                        title: 'Тип поля',
                        value: 'Чекбокс',
                        timeout: entry.max
                    });
                    decorate.el.select.select({
                        title: 'Значение по умолчанию',
                        value: 'Да',
                        timeout: entry.max
                    });
                    decorate.modal.additionalDataEdit.closeHandler({
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                });

                describe('Проверка строки 4', () => {
                    decorate.el.table.strHandler({
                        strNumber: 4,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.butIcBefore.handler({
                        icon: but.edit,
                        timeout: entry.max
                    });
                    decorate.modal.additionalDataEdit.init({
                        timeout: entry.max
                    });
                    decorate.el.input.getValue({
                        title: 'Название поля',
                        placeholder: '',
                        value: data.list.name,
                        timeout: entry.max
                    });
                    decorate.el.input.getValue({
                        title: 'Описание',
                        placeholder: '',
                        value: '',
                        timeout: entry.max
                    });
                    decorate.el.select.select({
                        title: 'Тип поля',
                        value: 'Выпадающий список',
                        timeout: entry.max
                    });
                    it(`Отображение в группе полей "Поля", поле 1 - "${data.list.data}"`,
                        async () => await dec.simpleText(el.modal.additionalDataAdd.selectTypeGetValue,
                            [1, entry.max],
                            data.list.data,
                            el.modal.additionalDataAdd));
                    decorate.el.select.select({
                        title: 'Значение по умолчанию',
                        value: 'Заполните поле',
                        timeout: entry.max
                    });
                    decorate.modal.additionalDataEdit.closeHandler({
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                });

                describe('Проверка строки 5', () => {
                    decorate.el.table.strHandler({
                        strNumber: 5,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.butIcBefore.handler({
                        icon: but.edit,
                        timeout: entry.max
                    });
                    decorate.modal.additionalDataEdit.init({
                        timeout: entry.max
                    });
                    decorate.el.input.getValue({
                        title: 'Название поля',
                        placeholder: '',
                        value: data.grafic.name,
                        timeout: entry.max
                    });
                    decorate.el.input.getValue({
                        title: 'Описание',
                        placeholder: '',
                        value: '',
                        timeout: entry.max
                    });
                    decorate.el.select.select({
                        title: 'Тип поля',
                        value: 'Графический',
                        timeout: entry.max
                    });
                    decorate.modal.additionalDataEdit.closeHandler({
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                });

                describe('Проверка строки 6', () => {
                    decorate.el.table.strHandler({
                        strNumber: 6,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.butIcBefore.handler({
                        icon: but.edit,
                        timeout: entry.max
                    });
                    decorate.modal.additionalDataEdit.init({
                        timeout: entry.max
                    });
                    decorate.el.input.getValue({
                        title: 'Название поля',
                        placeholder: '',
                        value: data.text.name,
                        timeout: entry.max
                    });
                    decorate.el.input.getValue({
                        title: 'Описание',
                        placeholder: '',
                        value: '',
                        timeout: entry.max
                    });
                    decorate.el.select.select({
                        title: 'Тип поля',
                        value: 'Текстовый',
                        timeout: entry.max
                    });
                    decorate.el.input.getValue({
                        title: 'Значение по умолчанию',
                        placeholder: '',
                        value: '',
                        timeout: entry.max
                    });
                    decorate.modal.additionalDataEdit.closeHandler({
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                });
            });
        }

        if(type === 'visitor') {
            describe('Добавление', () => {
                befVisitor();
                aft();

                describe('Добавление - Тип поля Текстовый', () => {
                    decorate.el.butIcBefore.handler({
                        icon: but.add,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.modal.additionalDataAdd.init({
                        timeout: entry.max
                    });
                    decorate.el.select.iconXpand({
                        title: 'Тип поля',
                        value: 'Текстовый',
                        text: 'Текстовый',
                        timeout: entry.max
                    });
                    decorate.el.input.sendKeys({
                        title: 'Название поля',
                        placeholder: '',
                        value: data.text.name,
                        timeout: entry.max
                    });
                    decorate.el.button.handler({
                        name: 'Сохранить',
                        timeout: entry.max
                    });
                    decorate.el.error.checkError({
                        timeout: entry.sleep2
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.modal.additionalDataAdd.initClose({
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                });

                describe('Добавление - Тип поля Графический', () => {
                    decorate.el.butIcBefore.handler({
                        icon: but.add,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.modal.additionalDataAdd.init({
                        timeout: entry.max
                    });
                    decorate.el.select.iconXpand({
                        title: 'Тип поля',
                        value: 'Текстовый',
                        text: 'Графический',
                        timeout: entry.max
                    });
                    decorate.el.input.sendKeys({
                        title: 'Название поля',
                        placeholder: '',
                        value: data.grafic.name,
                        timeout: entry.max
                    });
                    decorate.el.button.handler({
                        name: 'Сохранить',
                        timeout: entry.max
                    });
                    decorate.el.error.checkError({
                        timeout: entry.sleep2
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.modal.additionalDataAdd.initClose({
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                });

                describe('Добавление - Тип поля Выпадающий список', () => {
                    decorate.el.butIcBefore.handler({
                        icon: but.add,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.modal.additionalDataAdd.init({
                        timeout: entry.max
                    });
                    decorate.el.select.iconXpand({
                        title: 'Тип поля',
                        value: 'Текстовый',
                        text: 'Выпадающий список',
                        timeout: entry.max
                    });
                    decorate.el.input.sendKeys({
                        title: 'Название поля',
                        placeholder: '',
                        value: data.list.name,
                        timeout: entry.max
                    });
                    it(`Ввод значение в поле 1 в списке полей ввода "Поля"`,
                        async () => await dec.simple(el.modal.additionalDataAdd.selectTypeSendKeys,
                            [1, data.list.data, entry.max],
                            el.modal.additionalDataAdd));
                    decorate.el.button.handler({
                        name: 'Сохранить',
                        timeout: entry.max
                    });
                    decorate.el.error.checkError({
                        timeout: entry.sleep2
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.modal.additionalDataAdd.initClose({
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                });

                describe('Добавление - Тип поля Чекбокс', () => {
                    decorate.el.butIcBefore.handler({
                        icon: but.add,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.modal.additionalDataAdd.init({
                        timeout: entry.max
                    });
                    decorate.el.select.iconXpand({
                        title: 'Тип поля',
                        value: 'Текстовый',
                        text: 'Чекбокс',
                        timeout: entry.max
                    });
                    decorate.el.input.sendKeys({
                        title: 'Название поля',
                        placeholder: '',
                        value: data.checkbox.name,
                        timeout: entry.max
                    });
                    decorate.el.button.handler({
                        name: 'Сохранить',
                        timeout: entry.max
                    });
                    decorate.el.error.checkError({
                        timeout: entry.sleep2
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.modal.additionalDataAdd.initClose({
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                });

                describe('Добавление - Тип поля Дата', () => {
                    decorate.el.butIcBefore.handler({
                        icon: but.add,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.modal.additionalDataAdd.init({
                        timeout: entry.max
                    });
                    decorate.el.select.iconXpand({
                        title: 'Тип поля',
                        value: 'Текстовый',
                        text: 'Дата',
                        timeout: entry.max
                    });
                    decorate.el.input.sendKeys({
                        title: 'Название поля',
                        placeholder: '',
                        value: data.date.name,
                        timeout: entry.max
                    });
                    decorate.el.button.handler({
                        name: 'Сохранить',
                        timeout: entry.max
                    });
                    decorate.el.error.checkError({
                        timeout: entry.sleep2
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.modal.additionalDataAdd.initClose({
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                });

                describe('Добавление - Тип поля Дата и время', () => {
                    decorate.el.butIcBefore.handler({
                        icon: but.add,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.modal.additionalDataAdd.init({
                        timeout: entry.max
                    });
                    decorate.el.select.iconXpand({
                        title: 'Тип поля',
                        value: 'Текстовый',
                        text: 'Дата и время',
                        timeout: entry.max
                    });
                    decorate.el.input.sendKeys({
                        title: 'Название поля',
                        placeholder: '',
                        value: data.dateTime.name,
                        timeout: entry.max
                    });
                    decorate.el.button.handler({
                        name: 'Сохранить',
                        timeout: entry.max
                    });
                    decorate.el.error.checkError({
                        timeout: entry.sleep2
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.modal.additionalDataAdd.initClose({
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                });
            });

            describe('Проверка', () => {
                befVisitor();
                aft();

                describe('Общая проверка', () => {
                    decorate.el.table.size({
                        strCount: 9,
                        timeout: entry.max
                    });
                });

                describe('Проверка таблицы', () => {
                    const head = ['Названеи поля', 'Тип поля', 'Описание', 'Значение по умолчанию'];
                    const table = [
                        ['dateTimeName', 'Дата и время', '', ''],
                        ['dateName', 'Дата', '', ''],
                        ['checkboxName', 'Чекбокс', '', 'Да'],
                        ['listName', 'Выпадающий список', '', ''],
                        ['graficName', 'Графический', '', ''],
                        ['textName', 'Текстовый', '', ''],
                        ['Фотография', 'Графический', 'Служебное поле', ''],
                        ['Пин-код', 'Пин-код', 'Служебное поле', ''],
                        ['Email', 'Email', 'Служебное поле', ''],
                    ];

                    table.forEach((item1, index1) => {
                        describe(`Проверка строки ${index1 + 1}`, () => {
                            item1.forEach((item2, index2) => {
                                decorate.el.table.cellGetText({
                                    headTitle: head[index2],
                                    strNumber: index1 + 1,
                                    cellNumber: index2 + 1,
                                    value: item2,
                                    timeout: entry.max
                                });
                            });
                        });
                    })
                });

                describe('Проверка строки 1', () => {
                    decorate.el.table.strHandler({
                        strNumber: 1,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.butIcBefore.handler({
                        icon: but.edit,
                        timeout: entry.max
                    });
                    decorate.modal.additionalDataEdit.init({
                        timeout: entry.max
                    });
                    decorate.el.input.getValue({
                        title: 'Название поля',
                        placeholder: '',
                        value: data.dateTime.name,
                        timeout: entry.max
                    });
                    decorate.el.input.getValue({
                        title: 'Описание',
                        placeholder: '',
                        value: '',
                        timeout: entry.max
                    });
                    decorate.el.select.select({
                        title: 'Тип поля',
                        value: 'Дата и время',
                        timeout: entry.max
                    });
                    decorate.modal.additionalDataEdit.closeHandler({
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                });

                describe('Проверка строки 2', () => {
                    decorate.el.table.strHandler({
                        strNumber: 2,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.butIcBefore.handler({
                        icon: but.edit,
                        timeout: entry.max
                    });
                    decorate.modal.additionalDataEdit.init({
                        timeout: entry.max
                    });
                    decorate.el.input.getValue({
                        title: 'Название поля',
                        placeholder: '',
                        value: data.date.name,
                        timeout: entry.max
                    });
                    decorate.el.input.getValue({
                        title: 'Описание',
                        placeholder: '',
                        value: '',
                        timeout: entry.max
                    });
                    decorate.el.select.select({
                        title: 'Тип поля',
                        value: 'Дата',
                        timeout: entry.max
                    });
                    decorate.modal.additionalDataEdit.closeHandler({
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                });

                describe('Проверка строки 3', () => {
                    decorate.el.table.strHandler({
                        strNumber: 3,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.butIcBefore.handler({
                        icon: but.edit,
                        timeout: entry.max
                    });
                    decorate.modal.additionalDataEdit.init({
                        timeout: entry.max
                    });
                    decorate.el.input.getValue({
                        title: 'Название поля',
                        placeholder: '',
                        value: data.checkbox.name,
                        timeout: entry.max
                    });
                    decorate.el.input.getValue({
                        title: 'Описание',
                        placeholder: '',
                        value: '',
                        timeout: entry.max
                    });
                    decorate.el.select.select({
                        title: 'Тип поля',
                        value: 'Чекбокс',
                        timeout: entry.max
                    });
                    decorate.el.select.select({
                        title: 'Значение по умолчанию',
                        value: 'Да',
                        timeout: entry.max
                    });
                    decorate.modal.additionalDataEdit.closeHandler({
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                });

                describe('Проверка строки 4', () => {
                    decorate.el.table.strHandler({
                        strNumber: 4,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.butIcBefore.handler({
                        icon: but.edit,
                        timeout: entry.max
                    });
                    decorate.modal.additionalDataEdit.init({
                        timeout: entry.max
                    });
                    decorate.el.input.getValue({
                        title: 'Название поля',
                        placeholder: '',
                        value: data.list.name,
                        timeout: entry.max
                    });
                    decorate.el.input.getValue({
                        title: 'Описание',
                        placeholder: '',
                        value: '',
                        timeout: entry.max
                    });
                    decorate.el.select.select({
                        title: 'Тип поля',
                        value: 'Выпадающий список',
                        timeout: entry.max
                    });
                    it(`Отображение в группе полей "Поля", поле 1 - "${data.list.data}"`,
                        async () => await dec.simpleText(el.modal.additionalDataAdd.selectTypeGetValue,
                            [1, entry.max],
                            data.list.data,
                            el.modal.additionalDataAdd));
                    decorate.el.select.select({
                        title: 'Значение по умолчанию',
                        value: 'Заполните поле',
                        timeout: entry.max
                    });
                    decorate.modal.additionalDataEdit.closeHandler({
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                });

                describe('Проверка строки 5', () => {
                    decorate.el.table.strHandler({
                        strNumber: 5,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.butIcBefore.handler({
                        icon: but.edit,
                        timeout: entry.max
                    });
                    decorate.modal.additionalDataEdit.init({
                        timeout: entry.max
                    });
                    decorate.el.input.getValue({
                        title: 'Название поля',
                        placeholder: '',
                        value: data.grafic.name,
                        timeout: entry.max
                    });
                    decorate.el.input.getValue({
                        title: 'Описание',
                        placeholder: '',
                        value: '',
                        timeout: entry.max
                    });
                    decorate.el.select.select({
                        title: 'Тип поля',
                        value: 'Графический',
                        timeout: entry.max
                    });
                    decorate.modal.additionalDataEdit.closeHandler({
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                });

                describe('Проверка строки 6', () => {
                    decorate.el.table.strHandler({
                        strNumber: 6,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.butIcBefore.handler({
                        icon: but.edit,
                        timeout: entry.max
                    });
                    decorate.modal.additionalDataEdit.init({
                        timeout: entry.max
                    });
                    decorate.el.input.getValue({
                        title: 'Название поля',
                        placeholder: '',
                        value: data.text.name,
                        timeout: entry.max
                    });
                    decorate.el.input.getValue({
                        title: 'Описание',
                        placeholder: '',
                        value: '',
                        timeout: entry.max
                    });
                    decorate.el.select.select({
                        title: 'Тип поля',
                        value: 'Текстовый',
                        timeout: entry.max
                    });
                    decorate.el.input.getValue({
                        title: 'Значение по умолчанию',
                        placeholder: '',
                        value: '',
                        timeout: entry.max
                    });
                    decorate.modal.additionalDataEdit.closeHandler({
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                });
            });
        }

    });

    const edit = () => describe(text + 'Редактирование.', () => {

        if(type === 'staff') {
            describe('Редактирование', () => {
                befStaff();
                aft();

                describe('Редактирование строки 1 - Тип поля Дата и время', () => {
                    decorate.el.table.strHandler({
                        strNumber: 1,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.butIcBefore.handler({
                        icon: but.edit,
                        timeout: entry.max
                    });
                    decorate.modal.additionalDataEdit.init({
                        timeout: entry.max
                    });
                    decorate.el.input.backSpace({
                        title: 'Название поля',
                        placeholder: '',
                        timeout: entry.max
                    });
                    decorate.el.input.sendKeys({
                        title: 'Название поля',
                        placeholder: '',
                        value: data.dateTimeUpdate.name,
                        timeout: entry.max
                    });
                    decorate.el.input.sendKeys({
                        title: 'Описание',
                        placeholder: '',
                        value: data.dateTimeUpdate.description,
                        timeout: entry.max
                    });
                    decorate.el.select.select({
                        title: 'Тип поля',
                        value: 'Дата и время',
                        timeout: entry.max
                    });
                    decorate.el.button.handler({
                        name: 'Сохранить',
                        timeout: entry.max
                    });
                    decorate.el.error.checkError({
                        timeout: entry.sleep2
                    });
                    decorate.modal.additionalDataEdit.initClose({
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                });

                describe('Редактирование строки 2 - Тип поля Дата', () => {
                    decorate.el.table.strHandler({
                        strNumber: 2,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.butIcBefore.handler({
                        icon: but.edit,
                        timeout: entry.max
                    });
                    decorate.modal.additionalDataEdit.init({
                        timeout: entry.max
                    });
                    decorate.el.input.backSpace({
                        title: 'Название поля',
                        placeholder: '',
                        timeout: entry.max
                    });
                    decorate.el.input.sendKeys({
                        title: 'Название поля',
                        placeholder: '',
                        value: data.dateUpdate.name,
                        timeout: entry.max
                    });
                    decorate.el.input.sendKeys({
                        title: 'Описание',
                        placeholder: '',
                        value: data.dateUpdate.description,
                        timeout: entry.max
                    });
                    decorate.el.select.select({
                        title: 'Тип поля',
                        value: 'Дата',
                        timeout: entry.max
                    });
                    decorate.el.button.handler({
                        name: 'Сохранить',
                        timeout: entry.max
                    });
                    decorate.el.error.checkError({
                        timeout: entry.sleep2
                    });
                    decorate.modal.additionalDataEdit.initClose({
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                });

                describe('Редактирование строки 3 - Тип поля Чекбокс', () => {
                    decorate.el.table.strHandler({
                        strNumber: 3,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.butIcBefore.handler({
                        icon: but.edit,
                        timeout: entry.max
                    });
                    decorate.modal.additionalDataEdit.init({
                        timeout: entry.max
                    });
                    decorate.el.input.backSpace({
                        title: 'Название поля',
                        placeholder: '',
                        timeout: entry.max
                    });
                    decorate.el.input.sendKeys({
                        title: 'Название поля',
                        placeholder: '',
                        value: data.checkboxUpdate.name,
                        timeout: entry.max
                    });
                    decorate.el.input.sendKeys({
                        title: 'Описание',
                        placeholder: '',
                        value: data.checkboxUpdate.description,
                        timeout: entry.max
                    });
                    decorate.el.select.select({
                        title: 'Тип поля',
                        value: 'Чекбокс',
                        timeout: entry.max
                    });
                    decorate.el.select.iconXpand({
                        title: 'Значение по умолчанию',
                        value: 'Да',
                        text: data.checkboxUpdate.data,
                        timeout: entry.max
                    });
                    decorate.el.button.handler({
                        name: 'Сохранить',
                        timeout: entry.max
                    });
                    decorate.el.error.checkError({
                        timeout: entry.sleep2
                    });
                    decorate.modal.additionalDataEdit.initClose({
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                });

                describe('Редактирование строки 4 - Тип поля Выпадающий список', () => {
                    decorate.el.table.strHandler({
                        strNumber: 4,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.butIcBefore.handler({
                        icon: but.edit,
                        timeout: entry.max
                    });
                    decorate.modal.additionalDataEdit.init({
                        timeout: entry.max
                    });
                    decorate.el.input.backSpace({
                        title: 'Название поля',
                        placeholder: '',
                        timeout: entry.max
                    });
                    decorate.el.input.sendKeys({
                        title: 'Название поля',
                        placeholder: '',
                        value: data.listUpdate.name,
                        timeout: entry.max
                    });
                    decorate.el.input.sendKeys({
                        title: 'Описание',
                        placeholder: '',
                        value: data.listUpdate.description,
                        timeout: entry.max
                    });
                    decorate.el.select.select({
                        title: 'Тип поля',
                        value: 'Выпадающий список',
                        timeout: entry.max
                    });
                    it(`Удаление в группе полей "Поля", поле 1 - "${data.list.data}"`,
                        async () => await dec.simple(el.modal.additionalDataEdit.selectTypeRemove,
                            [1, entry.max],
                            el.modal.additionalDataEdit));
                    [...Array(8).keys()].forEach((item1) => {
                        decorate.el.button.handler({
                            name: 'Добавить поле',
                            timeout: entry.max
                        });
                        decorate.page.base.loading({
                            timeout: entry.sleep2
                        });
                    });
                    [...Array(8).keys()].forEach((item2) => {
                        it(`Ввод значение "data${item2 + 1}Update" в поле ${item2 + 1} в списке полей ввода "Поля"`,
                            async () => await dec.simple(el.modal.additionalDataAdd.selectTypeSendKeys,
                                [item2 + 1, 'data' + (item2 + 1) + 'Update', entry.max],
                                el.modal.additionalDataAdd));
                    });
                    decorate.el.select.iconXpand({
                        title: 'Значение по умолчанию',
                        value: 'Заполните поле',
                        text: data.listUpdate.data2,
                        timeout: entry.max
                    });
                    decorate.el.button.handler({
                        name: 'Сохранить',
                        timeout: entry.max
                    });
                    decorate.el.error.checkError({
                        timeout: entry.sleep2
                    });
                    decorate.modal.additionalDataEdit.initClose({
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                });

                describe('Редактирование строки 5 - Тип поля Графический', () => {
                    decorate.el.table.strHandler({
                        strNumber: 5,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.butIcBefore.handler({
                        icon: but.edit,
                        timeout: entry.max
                    });
                    decorate.modal.additionalDataEdit.init({
                        timeout: entry.max
                    });
                    decorate.el.input.backSpace({
                        title: 'Название поля',
                        placeholder: '',
                        timeout: entry.max
                    });
                    decorate.el.input.sendKeys({
                        title: 'Название поля',
                        placeholder: '',
                        value: data.graficUpdate.name,
                        timeout: entry.max
                    });
                    decorate.el.input.sendKeys({
                        title: 'Описание',
                        placeholder: '',
                        value: data.graficUpdate.description,
                        timeout: entry.max
                    });
                    decorate.el.select.select({
                        title: 'Тип поля',
                        value: 'Графический',
                        timeout: entry.max
                    });
                    decorate.el.button.handler({
                        name: 'Сохранить',
                        timeout: entry.max
                    });
                    decorate.el.error.checkError({
                        timeout: entry.sleep2
                    });
                    decorate.modal.additionalDataEdit.initClose({
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                });

                describe('Редактирование строки 6 - Тип поля Текстовый', () => {
                    decorate.el.table.strHandler({
                        strNumber: 6,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.butIcBefore.handler({
                        icon: but.edit,
                        timeout: entry.max
                    });
                    decorate.modal.additionalDataEdit.init({
                        timeout: entry.max
                    });
                    decorate.el.input.backSpace({
                        title: 'Название поля',
                        placeholder: '',
                        timeout: entry.max
                    });
                    decorate.el.input.sendKeys({
                        title: 'Название поля',
                        placeholder: '',
                        value: data.textUpdate.name,
                        timeout: entry.max
                    });
                    decorate.el.input.sendKeys({
                        title: 'Описание',
                        placeholder: '',
                        value: data.textUpdate.description,
                        timeout: entry.max
                    });
                    decorate.el.select.select({
                        title: 'Тип поля',
                        value: 'Текстовый',
                        timeout: entry.max
                    });
                    decorate.el.input.sendKeys({
                        title: 'Значение по умолчанию',
                        placeholder: '',
                        value: data.textUpdate.data,
                        timeout: entry.max
                    });
                    decorate.el.button.handler({
                        name: 'Сохранить',
                        timeout: entry.max
                    });
                    decorate.el.error.checkError({
                        timeout: entry.sleep2
                    });
                    decorate.modal.additionalDataEdit.initClose({
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                });

            });

            describe('Проверка', () => {
                befStaff();
                aft();

                describe('Общая проверка', () => {
                    decorate.el.table.size({
                        strCount: 12,
                        timeout: entry.max
                    });
                });

                describe('Проверка таблицы', () => {
                    const head = ['Названеи поля', 'Тип поля', 'Описание', 'Значение по умолчанию'];
                    const table = [
                        ['dateTimeNameUpdate', 'Дата и время', 'dateTimeDescriptionUpdate', ''],
                        ['dateNameUpdate', 'Дата', 'dateDescriptionUpdate', ''],
                        ['checkboxNameUpdate', 'Чекбокс', 'checkboxDescriptionUpdate', 'Нет'],
                        ['listNameUpdate', 'Выпадающий список', 'listDescriptionUpdate', 'data2Update'],
                        ['graficNameUpdate', 'Графический', 'graficDescriptionUpdate', ''],
                        ['textNameUpdate', 'Текстовый', 'textDescriptionUpdate', 'textDataUpdate'],
                        ['Фотография', 'Графический', 'Служебное поле', ''],
                        ['Пин-код', 'Пин-код', 'Служебное поле', ''],
                        ['Viber', 'Viber', 'Служебное поле', ''],
                        ['Телефон', 'Телефон', 'Служебное поле', ''],
                        ['Email', 'Email', 'Служебное поле', ''],
                        ['Telegram', 'Telegram', 'Служебное поле', ''],

                    ];

                    table.forEach((item1, index1) => {
                        describe(`Проверка строки ${index1 + 1}`, () => {
                            item1.forEach((item2, index2) => {
                                decorate.el.table.cellGetText({
                                    headTitle: head[index2],
                                    strNumber: index1 + 1,
                                    cellNumber: index2 + 1,
                                    value: item2,
                                    timeout: entry.max
                                });
                            });
                        });
                    })
                });

                describe('Проверка строки 1 - Тип поля Дата и время', () => {
                    decorate.el.table.strHandler({
                        strNumber: 1,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.butIcBefore.handler({
                        icon: but.edit,
                        timeout: entry.max
                    });
                    decorate.modal.additionalDataEdit.init({
                        timeout: entry.max
                    });
                    decorate.el.input.getValue({
                        title: 'Название поля',
                        placeholder: '',
                        value: data.dateTimeUpdate.name,
                        timeout: entry.max
                    });
                    decorate.el.input.getValue({
                        title: 'Описание',
                        placeholder: '',
                        value: data.dateTimeUpdate.description,
                        timeout: entry.max
                    });
                    decorate.el.select.select({
                        title: 'Тип поля',
                        value: 'Дата и время',
                        timeout: entry.max
                    });
                    decorate.modal.additionalDataEdit.closeHandler({
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                });

                describe('Проверка строки 2 - Тип поля Дата', () => {
                    decorate.el.table.strHandler({
                        strNumber: 2,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.butIcBefore.handler({
                        icon: but.edit,
                        timeout: entry.max
                    });
                    decorate.modal.additionalDataEdit.init({
                        timeout: entry.max
                    });
                    decorate.el.input.getValue({
                        title: 'Название поля',
                        placeholder: '',
                        value: data.dateUpdate.name,
                        timeout: entry.max
                    });
                    decorate.el.input.getValue({
                        title: 'Описание',
                        placeholder: '',
                        value: data.dateUpdate.description,
                        timeout: entry.max
                    });
                    decorate.el.select.select({
                        title: 'Тип поля',
                        value: 'Дата',
                        timeout: entry.max
                    });
                    decorate.modal.additionalDataEdit.closeHandler({
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                });

                describe('Проверка строки 3 - Тип поля Чекбокс', () => {
                    decorate.el.table.strHandler({
                        strNumber: 3,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.butIcBefore.handler({
                        icon: but.edit,
                        timeout: entry.max
                    });
                    decorate.modal.additionalDataEdit.init({
                        timeout: entry.max
                    });
                    decorate.el.input.getValue({
                        title: 'Название поля',
                        placeholder: '',
                        value: data.checkboxUpdate.name,
                        timeout: entry.max
                    });
                    decorate.el.input.getValue({
                        title: 'Описание',
                        placeholder: '',
                        value: data.checkboxUpdate.description,
                        timeout: entry.max
                    });
                    decorate.el.select.select({
                        title: 'Тип поля',
                        value: 'Чекбокс',
                        timeout: entry.max
                    });
                    decorate.el.select.select({
                        title: 'Значение по умолчанию',
                        value: 'Нет',
                        timeout: entry.max
                    });
                    decorate.modal.additionalDataEdit.closeHandler({
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                });

                describe('Проверка строки 4 - Тип поля Выпадающий список', () => {
                    decorate.el.table.strHandler({
                        strNumber: 4,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.butIcBefore.handler({
                        icon: but.edit,
                        timeout: entry.max
                    });
                    decorate.modal.additionalDataEdit.init({
                        timeout: entry.max
                    });
                    decorate.el.input.getValue({
                        title: 'Название поля',
                        placeholder: '',
                        value: data.listUpdate.name,
                        timeout: entry.max
                    });
                    decorate.el.input.getValue({
                        title: 'Описание',
                        placeholder: '',
                        value: data.listUpdate.description,
                        timeout: entry.max
                    });
                    decorate.el.select.select({
                        title: 'Тип поля',
                        value: 'Выпадающий список',
                        timeout: entry.max
                    });
                    [...Array(8).keys()].forEach((item) => {
                        it(`Отображение в группе полей "Поля", поле ${item + 1} - "data${item + 1}Update"`,
                            async () => await dec.simpleText(el.modal.additionalDataAdd.selectTypeGetValue,
                                [item + 1, entry.max],
                                'data' + (item + 1) + 'Update',
                                el.modal.additionalDataAdd));
                    });
                    decorate.el.select.select({
                        title: 'Значение по умолчанию',
                        value: data.listUpdate.defaultData,
                        timeout: entry.max
                    });
                    decorate.modal.additionalDataEdit.closeHandler({
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                });

                describe('Проверка строки 5 - Тип поля Графический', () => {
                    decorate.el.table.strHandler({
                        strNumber: 5,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.butIcBefore.handler({
                        icon: but.edit,
                        timeout: entry.max
                    });
                    decorate.modal.additionalDataEdit.init({
                        timeout: entry.max
                    });
                    decorate.el.input.getValue({
                        title: 'Название поля',
                        placeholder: '',
                        value: data.graficUpdate.name,
                        timeout: entry.max
                    });
                    decorate.el.input.getValue({
                        title: 'Описание',
                        placeholder: '',
                        value: data.graficUpdate.description,
                        timeout: entry.max
                    });
                    decorate.el.select.select({
                        title: 'Тип поля',
                        value: 'Графический',
                        timeout: entry.max
                    });
                    decorate.modal.additionalDataEdit.closeHandler({
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                });

                describe('Проверка строки 6 - Тип поля Текстовый', () => {
                    decorate.el.table.strHandler({
                        strNumber: 6,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.butIcBefore.handler({
                        icon: but.edit,
                        timeout: entry.max
                    });
                    decorate.modal.additionalDataEdit.init({
                        timeout: entry.max
                    });
                    decorate.el.input.getValue({
                        title: 'Название поля',
                        placeholder: '',
                        value: data.textUpdate.name,
                        timeout: entry.max
                    });
                    decorate.el.input.getValue({
                        title: 'Описание',
                        placeholder: '',
                        value: data.textUpdate.description,
                        timeout: entry.max
                    });
                    decorate.el.select.select({
                        title: 'Тип поля',
                        value: 'Текстовый',
                        timeout: entry.max
                    });
                    decorate.el.input.getValue({
                        title: 'Значение по умолчанию',
                        placeholder: '',
                        value: data.textUpdate.data,
                        timeout: entry.max
                    });
                    decorate.modal.additionalDataEdit.closeHandler({
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                });

            });
        }

        if(type === 'visitor') {
            describe('Редактирование', () => {
                befVisitor();
                aft();

                describe('Редактирование строки 1 - Тип поля Дата и время', () => {
                    decorate.el.table.strHandler({
                        strNumber: 1,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.butIcBefore.handler({
                        icon: but.edit,
                        timeout: entry.max
                    });
                    decorate.modal.additionalDataEdit.init({
                        timeout: entry.max
                    });
                    decorate.el.input.backSpace({
                        title: 'Название поля',
                        placeholder: '',
                        timeout: entry.max
                    });
                    decorate.el.input.sendKeys({
                        title: 'Название поля',
                        placeholder: '',
                        value: data.dateTimeUpdate.name,
                        timeout: entry.max
                    });
                    decorate.el.input.sendKeys({
                        title: 'Описание',
                        placeholder: '',
                        value: data.dateTimeUpdate.description,
                        timeout: entry.max
                    });
                    decorate.el.select.select({
                        title: 'Тип поля',
                        value: 'Дата и время',
                        timeout: entry.max
                    });
                    decorate.el.button.handler({
                        name: 'Сохранить',
                        timeout: entry.max
                    });
                    decorate.el.error.checkError({
                        timeout: entry.sleep2
                    });
                    decorate.modal.additionalDataEdit.initClose({
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                });

                describe('Редактирование строки 2 - Тип поля Дата', () => {
                    decorate.el.table.strHandler({
                        strNumber: 2,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.butIcBefore.handler({
                        icon: but.edit,
                        timeout: entry.max
                    });
                    decorate.modal.additionalDataEdit.init({
                        timeout: entry.max
                    });
                    decorate.el.input.backSpace({
                        title: 'Название поля',
                        placeholder: '',
                        timeout: entry.max
                    });
                    decorate.el.input.sendKeys({
                        title: 'Название поля',
                        placeholder: '',
                        value: data.dateUpdate.name,
                        timeout: entry.max
                    });
                    decorate.el.input.sendKeys({
                        title: 'Описание',
                        placeholder: '',
                        value: data.dateUpdate.description,
                        timeout: entry.max
                    });
                    decorate.el.select.select({
                        title: 'Тип поля',
                        value: 'Дата',
                        timeout: entry.max
                    });
                    decorate.el.button.handler({
                        name: 'Сохранить',
                        timeout: entry.max
                    });
                    decorate.el.error.checkError({
                        timeout: entry.sleep2
                    });
                    decorate.modal.additionalDataEdit.initClose({
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                });

                describe('Редактирование строки 3 - Тип поля Чекбокс', () => {
                    decorate.el.table.strHandler({
                        strNumber: 3,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.butIcBefore.handler({
                        icon: but.edit,
                        timeout: entry.max
                    });
                    decorate.modal.additionalDataEdit.init({
                        timeout: entry.max
                    });
                    decorate.el.input.backSpace({
                        title: 'Название поля',
                        placeholder: '',
                        timeout: entry.max
                    });
                    decorate.el.input.sendKeys({
                        title: 'Название поля',
                        placeholder: '',
                        value: data.checkboxUpdate.name,
                        timeout: entry.max
                    });
                    decorate.el.input.sendKeys({
                        title: 'Описание',
                        placeholder: '',
                        value: data.checkboxUpdate.description,
                        timeout: entry.max
                    });
                    decorate.el.select.select({
                        title: 'Тип поля',
                        value: 'Чекбокс',
                        timeout: entry.max
                    });
                    decorate.el.select.iconXpand({
                        title: 'Значение по умолчанию',
                        value: 'Да',
                        text: data.checkboxUpdate.data,
                        timeout: entry.max
                    });
                    decorate.el.button.handler({
                        name: 'Сохранить',
                        timeout: entry.max
                    });
                    decorate.el.error.checkError({
                        timeout: entry.sleep2
                    });
                    decorate.modal.additionalDataEdit.initClose({
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                });

                describe('Редактирование строки 4 - Тип поля Выпадающий список', () => {
                    decorate.el.table.strHandler({
                        strNumber: 4,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.butIcBefore.handler({
                        icon: but.edit,
                        timeout: entry.max
                    });
                    decorate.modal.additionalDataEdit.init({
                        timeout: entry.max
                    });
                    decorate.el.input.backSpace({
                        title: 'Название поля',
                        placeholder: '',
                        timeout: entry.max
                    });
                    decorate.el.input.sendKeys({
                        title: 'Название поля',
                        placeholder: '',
                        value: data.listUpdate.name,
                        timeout: entry.max
                    });
                    decorate.el.input.sendKeys({
                        title: 'Описание',
                        placeholder: '',
                        value: data.listUpdate.description,
                        timeout: entry.max
                    });
                    decorate.el.select.select({
                        title: 'Тип поля',
                        value: 'Выпадающий список',
                        timeout: entry.max
                    });
                    it(`Удаление в группе полей "Поля", поле 1 - "${data.list.data}"`,
                        async () => await dec.simple(el.modal.additionalDataEdit.selectTypeRemove,
                            [1, entry.max],
                            el.modal.additionalDataEdit));
                    [...Array(8).keys()].forEach((item1) => {
                        decorate.el.button.handler({
                            name: 'Добавить поле',
                            timeout: entry.max
                        });
                        decorate.page.base.loading({
                            timeout: entry.sleep2
                        });
                    });
                    [...Array(8).keys()].forEach((item2) => {
                        it(`Ввод значение "data${item2 + 1}Update" в поле ${item2 + 1} в списке полей ввода "Поля"`,
                            async () => await dec.simple(el.modal.additionalDataAdd.selectTypeSendKeys,
                                [item2 + 1, 'data' + (item2 + 1) + 'Update', entry.max],
                                el.modal.additionalDataAdd));
                    });
                    decorate.el.select.iconXpand({
                        title: 'Значение по умолчанию',
                        value: 'Заполните поле',
                        text: data.listUpdate.data2,
                        timeout: entry.max
                    });
                    decorate.el.button.handler({
                        name: 'Сохранить',
                        timeout: entry.max
                    });
                    decorate.el.error.checkError({
                        timeout: entry.sleep2
                    });
                    decorate.modal.additionalDataEdit.initClose({
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                });

                describe('Редактирование строки 5 - Тип поля Графический', () => {
                    decorate.el.table.strHandler({
                        strNumber: 5,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.butIcBefore.handler({
                        icon: but.edit,
                        timeout: entry.max
                    });
                    decorate.modal.additionalDataEdit.init({
                        timeout: entry.max
                    });
                    decorate.el.input.backSpace({
                        title: 'Название поля',
                        placeholder: '',
                        timeout: entry.max
                    });
                    decorate.el.input.sendKeys({
                        title: 'Название поля',
                        placeholder: '',
                        value: data.graficUpdate.name,
                        timeout: entry.max
                    });
                    decorate.el.input.sendKeys({
                        title: 'Описание',
                        placeholder: '',
                        value: data.graficUpdate.description,
                        timeout: entry.max
                    });
                    decorate.el.select.select({
                        title: 'Тип поля',
                        value: 'Графический',
                        timeout: entry.max
                    });
                    decorate.el.button.handler({
                        name: 'Сохранить',
                        timeout: entry.max
                    });
                    decorate.el.error.checkError({
                        timeout: entry.sleep2
                    });
                    decorate.modal.additionalDataEdit.initClose({
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                });

                describe('Редактирование строки 6 - Тип поля Текстовый', () => {
                    decorate.el.table.strHandler({
                        strNumber: 6,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.butIcBefore.handler({
                        icon: but.edit,
                        timeout: entry.max
                    });
                    decorate.modal.additionalDataEdit.init({
                        timeout: entry.max
                    });
                    decorate.el.input.backSpace({
                        title: 'Название поля',
                        placeholder: '',
                        timeout: entry.max
                    });
                    decorate.el.input.sendKeys({
                        title: 'Название поля',
                        placeholder: '',
                        value: data.textUpdate.name,
                        timeout: entry.max
                    });
                    decorate.el.input.sendKeys({
                        title: 'Описание',
                        placeholder: '',
                        value: data.textUpdate.description,
                        timeout: entry.max
                    });
                    decorate.el.select.select({
                        title: 'Тип поля',
                        value: 'Текстовый',
                        timeout: entry.max
                    });
                    decorate.el.input.sendKeys({
                        title: 'Значение по умолчанию',
                        placeholder: '',
                        value: data.textUpdate.data,
                        timeout: entry.max
                    });
                    decorate.el.button.handler({
                        name: 'Сохранить',
                        timeout: entry.max
                    });
                    decorate.el.error.checkError({
                        timeout: entry.sleep2
                    });
                    decorate.modal.additionalDataEdit.initClose({
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                });

            });

            describe('Проверка', () => {
                befVisitor();
                aft();

                describe('Общая проверка', () => {
                    decorate.el.table.size({
                        strCount: 9,
                        timeout: entry.max
                    });
                });

                describe('Проверка таблицы', () => {
                    const head = ['Названеи поля', 'Тип поля', 'Описание', 'Значение по умолчанию'];
                    const table = [
                        ['dateTimeNameUpdate', 'Дата и время', 'dateTimeDescriptionUpdate', ''],
                        ['dateNameUpdate', 'Дата', 'dateDescriptionUpdate', ''],
                        ['checkboxNameUpdate', 'Чекбокс', 'checkboxDescriptionUpdate', 'Нет'],
                        ['listNameUpdate', 'Выпадающий список', 'listDescriptionUpdate', 'data2Update'],
                        ['graficNameUpdate', 'Графический', 'graficDescriptionUpdate', ''],
                        ['textNameUpdate', 'Текстовый', 'textDescriptionUpdate', 'textDataUpdate'],
                        ['Фотография', 'Графический', 'Служебное поле', ''],
                        ['Пин-код', 'Пин-код', 'Служебное поле', ''],
                        ['Email', 'Email', 'Служебное поле', ''],
                    ];

                    table.forEach((item1, index1) => {
                        describe(`Проверка строки ${index1 + 1}`, () => {
                            item1.forEach((item2, index2) => {
                                decorate.el.table.cellGetText({
                                    headTitle: head[index2],
                                    strNumber: index1 + 1,
                                    cellNumber: index2 + 1,
                                    value: item2,
                                    timeout: entry.max
                                });
                            });
                        });
                    })
                });

                describe('Проверка строки 1 - Тип поля Дата и время', () => {
                    decorate.el.table.strHandler({
                        strNumber: 1,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.butIcBefore.handler({
                        icon: but.edit,
                        timeout: entry.max
                    });
                    decorate.modal.additionalDataEdit.init({
                        timeout: entry.max
                    });
                    decorate.el.input.getValue({
                        title: 'Название поля',
                        placeholder: '',
                        value: data.dateTimeUpdate.name,
                        timeout: entry.max
                    });
                    decorate.el.input.getValue({
                        title: 'Описание',
                        placeholder: '',
                        value: data.dateTimeUpdate.description,
                        timeout: entry.max
                    });
                    decorate.el.select.select({
                        title: 'Тип поля',
                        value: 'Дата и время',
                        timeout: entry.max
                    });
                    decorate.modal.additionalDataEdit.closeHandler({
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                });

                describe('Проверка строки 2 - Тип поля Дата', () => {
                    decorate.el.table.strHandler({
                        strNumber: 2,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.butIcBefore.handler({
                        icon: but.edit,
                        timeout: entry.max
                    });
                    decorate.modal.additionalDataEdit.init({
                        timeout: entry.max
                    });
                    decorate.el.input.getValue({
                        title: 'Название поля',
                        placeholder: '',
                        value: data.dateUpdate.name,
                        timeout: entry.max
                    });
                    decorate.el.input.getValue({
                        title: 'Описание',
                        placeholder: '',
                        value: data.dateUpdate.description,
                        timeout: entry.max
                    });
                    decorate.el.select.select({
                        title: 'Тип поля',
                        value: 'Дата',
                        timeout: entry.max
                    });
                    decorate.modal.additionalDataEdit.closeHandler({
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                });

                describe('Проверка строки 3 - Тип поля Чекбокс', () => {
                    decorate.el.table.strHandler({
                        strNumber: 3,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.butIcBefore.handler({
                        icon: but.edit,
                        timeout: entry.max
                    });
                    decorate.modal.additionalDataEdit.init({
                        timeout: entry.max
                    });
                    decorate.el.input.getValue({
                        title: 'Название поля',
                        placeholder: '',
                        value: data.checkboxUpdate.name,
                        timeout: entry.max
                    });
                    decorate.el.input.getValue({
                        title: 'Описание',
                        placeholder: '',
                        value: data.checkboxUpdate.description,
                        timeout: entry.max
                    });
                    decorate.el.select.select({
                        title: 'Тип поля',
                        value: 'Чекбокс',
                        timeout: entry.max
                    });
                    decorate.el.select.select({
                        title: 'Значение по умолчанию',
                        value: 'Нет',
                        timeout: entry.max
                    });
                    decorate.modal.additionalDataEdit.closeHandler({
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                });

                describe('Проверка строки 4 - Тип поля Выпадающий список', () => {
                    decorate.el.table.strHandler({
                        strNumber: 4,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.butIcBefore.handler({
                        icon: but.edit,
                        timeout: entry.max
                    });
                    decorate.modal.additionalDataEdit.init({
                        timeout: entry.max
                    });
                    decorate.el.input.getValue({
                        title: 'Название поля',
                        placeholder: '',
                        value: data.listUpdate.name,
                        timeout: entry.max
                    });
                    decorate.el.input.getValue({
                        title: 'Описание',
                        placeholder: '',
                        value: data.listUpdate.description,
                        timeout: entry.max
                    });
                    decorate.el.select.select({
                        title: 'Тип поля',
                        value: 'Выпадающий список',
                        timeout: entry.max
                    });
                    [...Array(8).keys()].forEach((item) => {
                        it(`Отображение в группе полей "Поля", поле ${item + 1} - "data${item + 1}Update"`,
                            async () => await dec.simpleText(el.modal.additionalDataAdd.selectTypeGetValue,
                                [item + 1, entry.max],
                                'data' + (item + 1) + 'Update',
                                el.modal.additionalDataAdd));
                    });
                    decorate.el.select.select({
                        title: 'Значение по умолчанию',
                        value: data.listUpdate.defaultData,
                        timeout: entry.max
                    });
                    decorate.modal.additionalDataEdit.closeHandler({
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                });

                describe('Проверка строки 5 - Тип поля Графический', () => {
                    decorate.el.table.strHandler({
                        strNumber: 5,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.butIcBefore.handler({
                        icon: but.edit,
                        timeout: entry.max
                    });
                    decorate.modal.additionalDataEdit.init({
                        timeout: entry.max
                    });
                    decorate.el.input.getValue({
                        title: 'Название поля',
                        placeholder: '',
                        value: data.graficUpdate.name,
                        timeout: entry.max
                    });
                    decorate.el.input.getValue({
                        title: 'Описание',
                        placeholder: '',
                        value: data.graficUpdate.description,
                        timeout: entry.max
                    });
                    decorate.el.select.select({
                        title: 'Тип поля',
                        value: 'Графический',
                        timeout: entry.max
                    });
                    decorate.modal.additionalDataEdit.closeHandler({
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                });

                describe('Проверка строки 6 - Тип поля Текстовый', () => {
                    decorate.el.table.strHandler({
                        strNumber: 6,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.butIcBefore.handler({
                        icon: but.edit,
                        timeout: entry.max
                    });
                    decorate.modal.additionalDataEdit.init({
                        timeout: entry.max
                    });
                    decorate.el.input.getValue({
                        title: 'Название поля',
                        placeholder: '',
                        value: data.textUpdate.name,
                        timeout: entry.max
                    });
                    decorate.el.input.getValue({
                        title: 'Описание',
                        placeholder: '',
                        value: data.textUpdate.description,
                        timeout: entry.max
                    });
                    decorate.el.select.select({
                        title: 'Тип поля',
                        value: 'Текстовый',
                        timeout: entry.max
                    });
                    decorate.el.input.getValue({
                        title: 'Значение по умолчанию',
                        placeholder: '',
                        value: data.textUpdate.data,
                        timeout: entry.max
                    });
                    decorate.modal.additionalDataEdit.closeHandler({
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                });

            });
        }

    });

    const deleted = () => describe(text + 'Удаление.', () => {

        if(type === 'staff') {
            [...Array(6).keys()].forEach((item, index) => {
                describe(`Удаление строки  ${item + 1}`, () => {
                    befStaff();
                    aft();
                    decorate.el.table.strHandler({
                        strNumber: 1,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.butIcBefore.handler({
                        icon: but.delete,
                        timeout: entry.max
                    });
                    decorate.modalConfirm.deleteAdditionalData.init({
                        timeout: entry.max
                    });
                    decorate.el.button.handler({
                        name: 'Удалить',
                        timeout: entry.max
                    });
                    decorate.el.error.checkError({
                        timeout: entry.sleep2
                    });
                    decorate.modalConfirm.deleteAdditionalData.initClose({
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.page.base.refresh();
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.table.size({
                        strCount: 12 - (item + 1),
                        timeout: entry.max
                    });

                });
            });

        }

        if(type === 'visitor') {
            [...Array(6).keys()].forEach((item, index) => {
                describe(`Удаление строки  ${item + 1}`, () => {
                    befVisitor();
                    aft();
                    decorate.el.table.strHandler({
                        strNumber: 1,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.butIcBefore.handler({
                        icon: but.delete,
                        timeout: entry.max
                    });
                    decorate.modalConfirm.deleteAdditionalData.init({
                        timeout: entry.max
                    });
                    decorate.el.button.handler({
                        name: 'Удалить',
                        timeout: entry.max
                    });
                    decorate.el.error.checkError({
                        timeout: entry.sleep2
                    });
                    decorate.modalConfirm.deleteAdditionalData.initClose({
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                });

                describe(`Проверка`, () => {
                    befVisitor();
                    aft();
                    decorate.el.table.size({
                        strCount: 9 - (item + 1),
                        timeout: entry.max
                    });
                });
            });
        }

    });

    return {
        add,
        edit,
        deleted
    }
}

module.exports = {
    testStaff: test('staff', 'Персонал / Дополнительные данные - вкладка "Сотрудник". '),
    testVisitor: test('visitor', 'Персонал / Дополнительные данные - вкладка "Посетители". ')
};

