const {describe, it, before, after} = require('mocha');

const entry = require('../../../../../../entry');
const page = require('../../../../pages');
const el = require('../../../../elements');
const dec = require('../../../../dictionaries/decorate');
const sec = require('../../../../dictionaries/section');
const sub = require('../../../../dictionaries/subsection');
const but = require('../../../../dictionaries/button-icon');
const api = require('../../../other/api');
const oth = require('../../../other/other');

const filter = (obj) => {
    return obj.rows.filter(item => item['id'] > 1);
};

const befStaff = () => before('Вход и открытие подраздела "Дополнительные данные" вкладка "Сотрудник"',
    async () => {
        await dec.auth(entry.customLogin, entry.customPassword);
        await dec.simple(el.section.handler, [sec.per, entry.max], el.section);
        await dec.simple(el.subsection.handler, [sub.per.data, entry.max], el.subsection);
        await dec.simple(el.tab.handler, ['Сотрудник', entry.max], el.tab);
        await dec.simple(page.additionalData.init, [entry.max], page.additionalData);
});

const befVisitor = () => before('Вход и открытие подраздела "Дополнительные данные" вкладка "Посетитель"',
    async () => {
        await dec.auth(entry.customLogin, entry.customPassword);
        await dec.simple(el.section.handler, [sec.per, entry.max], el.section);
        await dec.simple(el.subsection.handler, [sub.per.data, entry.max], el.subsection);
        await dec.simple(el.tab.handler, ['Посетители', entry.max], el.tab);
        await dec.simple(page.additionalData.init, [entry.max], page.additionalData);
    });

const settings = {
    staff: {
        person: 'Сотрудник',
        api: {target: 'staff'},
        count: 6,
        bef: befStaff,
        footer: 'записей'
    },
    visitor: {
        person: 'Посетители',
        api: {target: 'visitor'},
        count: 3,
        bef: befVisitor,
        footer: 'записи'
    }
};

const aft = () => after('Выход', async () => await dec.exit());

const dataRemove = (type) => it('Удаление дополнительных полей', async () => {
    const cook = await page.base.getCookie('token');
    const get = await api.getAdditionalData(type.api, cook.text);
    const parse = filter(JSON.parse(get.text));
    await dec.simple(api.deleteAdditionalData,
        [parse, type.api, cook.text],
        api.deleteAdditionalData)
});

const display = (type) => describe(`Отображение страницы "Дополнительные данные" - вкладка "${type.person}"`,
    () => {
        type.bef();

        aft();

        describe('Общее отображение', () => {

            it('Отображение "title", "url"', async () => await dec.simple(page.additionalData.init,
                [entry.max],
                page.additionalData));

            it('Отображение раздела "Персонал" - активен', async () => await dec.simple(el.section.active,
                [sec.per, entry.max],
                el.section));

            it('Отображение подраздела "Дополнительные данные"-активен', async () => await dec.simple(el.subsection.active,
                [sub.per.data, entry.max],
                el.section));

            it('Отображение "Персонал" в заглавие навигации', async () => await dec.simpleText(el.subsection.headerGetText,
                [entry.max],
                'ПЕРСОНАЛ',
                el.subsection));

            it('Отображение "Дополнительные данные" в заглавие', async () => await dec.simpleText(el.header.getText,
                [entry.max],
                'Дополнительные данные',
                el.header));

            it('Отображение имя пользователя в заглавии', async () => await dec.simpleText(el.header.userGetText,
                [entry.max],
                entry.user,
                el.header));

            it('Отображение кнопки "Добавить" - активна', async () => await dec.simple(el.butIcBefore.active,
                [but.add, entry.max],
                el.butIcBefore));

            it('Отображение кнопки "Редактировать" - не активна', async () => await dec.simple(el.butIcBefore.disabled,
                [but.edit, entry.max],
                el.butIcBefore));

            it('Отображение кнопки "Удалить" - не активна', async () => await dec.simple(el.butIcBefore.disabled,
                [but.delete, entry.max],
                el.butIcBefore));

            it('Отображение "20" в выборе количества строк', async () => await dec.simpleText(el.footer.selectGetText,
                [entry.max],
                '20',
                el.footer));

            it(`Отображение "${type.count} записей" в количестве строк`, async () => await dec.simpleText(el.footer.countGetText,
                [entry.max],
                `${type.count} ${type.footer}`,
                el.footer));
        });

        describe('Отображение таблицы', () => {

            it('Отображение заглавия колонки "Название поля"', async () => await dec.simpleText(el.table.headGetText,
                [1, entry.max],
                'Название поля',
                el.table));

            it('Отображение заглавия колонки "Тип поля"', async () => await dec.simpleText(el.table.headGetText,
                [2, entry.max],
                'Тип поля',
                el.table));

            it('Отображение заглавия колонки "Описание"', async () => await dec.simpleText(el.table.headGetText,
                [3, entry.max],
                'Описание',
                el.table));

            it('Отображение заглавия колонки "Значение по умолчанию"', async () => await dec.simpleText(el.table.headGetText,
                [4, entry.max],
                'Значение по умолчанию',
                el.table));

        });

        describe('Отображене модального окна "Добавить дополнительное поле"', () => {

            describe('Общее отображение', () => {
                it('Нажатие кнопки "Добавить"', async () => await dec.simple(el.butIcBefore.handler,
                    [but.add, entry.max],
                    el.butIcBefore));

                it('Отображение модального окна и заглавия "Добавить дополнительное поле"',
                    async () => await dec.simple(el.modal.additionalDataAdd.init,
                        [entry.max],
                        el.modal.additionalDataAdd));

                it('Отображение кнопки закрытия',
                    async () => await dec.simple(el.modal.additionalDataAdd.close,
                        [entry.max],
                        el.modal.additionalDataAdd));

                it('Отображение кнопки "Отмена" - активна',
                    async () => await dec.simple(el.button.button,
                        ['Отмена', entry.max],
                        el.button));

                it('Отображение кнопки "Сохранить" - не активна',
                    async () => await dec.simple(el.button.disabled,
                        ['Сохранить', entry.max],
                        el.button));

                it('Нажатие кнопки закрытия',
                    async () => await dec.simple(el.modal.additionalDataAdd.closeHandler,
                        [entry.max],
                        el.modal.additionalDataAdd));

                it('Отсутствие модального модального',
                    async () => await dec.simple(el.modal.additionalDataAdd.initClose,
                        [entry.max],
                        el.modal.additionalDataAdd));

                it('Нажатие кнопки "Добавить"', async () => await dec.simple(el.butIcBefore.handler,
                    [but.add, entry.max],
                    el.butIcBefore));

                it('Отображение модального окна',
                    async () => await dec.simple(el.modal.additionalDataAdd.init,
                        [entry.max],
                        el.modal.additionalDataAdd));

                it('Нажатие кнопки "Отмена"',
                    async () => await dec.simple(el.modal.additionalDataAdd.buttonHandler,
                        ['Отмена', entry.max],
                        el.modal.additionalDataAdd));

                it('Отсутствие модального модального',
                    async () => await dec.simple(el.modal.additionalDataAdd.initClose,
                        [entry.max],
                        el.modal.additionalDataAdd));
            });

            describe('Отображение с настройкой типа - "Текстовый"', () => {

                it('Нажатие кнопки "Добавить"', async () => await dec.simple(el.butIcBefore.handler,
                    [but.add, entry.max],
                    el.butIcBefore));

                it('Отображение модального окна',
                    async () => await dec.simple(el.modal.additionalDataAdd.init,
                        [entry.max],
                        el.modal.additionalDataAdd));

                it('Выбор "Текстовый" в "Тип поля"', async () => await dec.simple(el.select.iconXpand,
                    ['Тип поля', 'Текстовый', 'Текстовый', entry.max],
                    el.select));

                it('Отображение поле выбора "Тип поля" - "Текстовый" ', async () => await dec.simple(el.select.select,
                    ['Тип поля', 'Текстовый', entry.max],
                    el.select));

                it('Отображение поле ввода "Название поля"', async () => await dec.simple(el.input.input,
                    ['Название поля', '', entry.max],
                    el.input));

                it('Отображение поле ввода "Описание"', async () => await dec.simple(el.input.input,
                    ['Описание', '', entry.max],
                    el.input));

                it('Отображение поле ввода "Значение по умолчанию"', async () => await dec.simple(el.input.input,
                    ['Значение по умолчанию', '', entry.max],
                    el.input));

                it('Отсутствие поле выбора "Значение по умолчанию" - "Да" ',
                    async () => await dec.simple(el.select.noSelect,
                        ['Значение по умолчанию', 'Да', entry.max],
                        el.select));

                it('Отсутствие поле выбора "Значение по умолчанию" - "Заполните поле"',
                    async () => await dec.simple(el.select.noSelect,
                        ['Значение по умолчанию', 'Заполните поле', entry.max],
                        el.select));

                it('Отсутствие кнопки "Добавить поле"',
                    async () => await dec.simpleFalse(el.button.button,
                        ['Добавить поле', entry.min],
                        el.button));

                it('Отсутсвие полей из списка ввода "Поля"',
                    async () => await dec.simple(el.modal.additionalDataAdd.noSelectTypeNum,
                        [1, entry.max],
                        el.modal.additionalDataAdd));
            });

            describe('Отображение с настройкой типа - "Графический"', () => {

                it('Выбор "Графический" в "Тип поля"', async () => await dec.simple(el.select.iconXpand,
                    ['Тип поля', 'Текстовый', 'Графический', entry.max],
                    el.select));

                it('Отображение поле выбора "Тип поля" - "Графический" ', async () => await dec.simple(el.select.select,
                    ['Тип поля', 'Графический', entry.max],
                    el.select));

                it('Отображение поле ввода "Название поля"', async () => await dec.simple(el.input.input,
                    ['Название поля', '', entry.max],
                    el.input));

                it('Отображение поле ввода "Описание"', async () => await dec.simple(el.input.input,
                    ['Описание', '', entry.max],
                    el.input));

                it('Отсутствие поле ввода "Значение по умолчанию"', async () => await dec.simpleFalse(el.input.input,
                    ['Значение по умолчанию', '', entry.min],
                    el.input));

                it('Отсутствие поле выбора "Значение по умолчанию" - "Да" ',
                    async () => await dec.simple(el.select.noSelect,
                        ['Значение по умолчанию', 'Да', entry.max],
                        el.select));

                it('Отсутствие поле выбора "Значение по умолчанию" - "Заполните поле"',
                    async () => await dec.simple(el.select.noSelect,
                        ['Значение по умолчанию', 'Заполните поле', entry.max],
                        el.select));

                it('Отсутствие кнопки "Добавить поле"',
                    async () => await dec.simpleFalse(el.button.button,
                        ['Добавить поле', entry.min],
                        el.button));

                it('Отсутсвие полей из списка ввода "Поля"',
                    async () => await dec.simple(el.modal.additionalDataAdd.noSelectTypeNum,
                        [1, entry.max],
                        el.modal.additionalDataAdd));
            });

            describe('Отображение с настройкой типа - "Выпадающий список"', () => {

            it('Выбор "Выпадающий список" в "Тип поля"', async () => await dec.simple(el.select.iconXpand,
                ['Тип поля', 'Графический', 'Выпадающий список', entry.max],
                el.select));

            it('Отображение поле выбора "Тип поля" - "Выпадающий список"',async () => await dec.simple(el.select.select,
                ['Тип поля', 'Выпадающий список', entry.max],
                el.select));

            it('Отображение поле ввода "Название поля"', async () => await dec.simple(el.input.input,
                ['Название поля', '', entry.max],
                el.input));

            it('Отображение поле ввода "Описание"', async () => await dec.simple(el.input.input,
                ['Описание', '', entry.max],
                el.input));

            it('Отсутствие поле ввода "Значение по умолчанию"', async () => await dec.simpleFalse(el.input.input,
                ['Значение по умолчанию', '', entry.min],
                el.input));

            it('Отсутствие поле выбора "Значение по умолчанию" - "Да" ',
                async () => await dec.simple(el.select.noSelect,
                    ['Значение по умолчанию', 'Да', entry.max],
                    el.select));

            it('Отображение поле выбора "Значение по умолчанию" - "Заполните поле"',
                async () => await dec.simple(el.select.select,
                    ['Значение по умолчанию', 'Заполните поле', entry.max],
                    el.select));

            it('Отображение кнопки "Добавить поле"',
                async () => await dec.simple(el.button.button,
                    ['Добавить поле', entry.max],
                    el.button));

            [...Array(7).keys()].map(() => {
                return(it('Нажатие кнопки "Добавить поле"',
                    async () => await dec.simple(el.button.handler,
                        ['Добавить поле', entry.min],
                        el.button))
            )});

            [...Array(8).keys()].map(item => {
                return(it(`Отображение поле ${item + 1} в списке полей ввода "Поля"`,
                    async () => await dec.simpleText(el.modal.additionalDataAdd.selectTypeGetValue,
                        [item + 1, entry.min],
                        '',
                        el.modal.additionalDataAdd))
            )});

        });

            describe('Отображение с настройкой типа - "Чекбокс"', () => {

                it('Отображение модального окна',
                    async () => await dec.simple(el.modal.additionalDataAdd.init,
                        [entry.max],
                        el.modal.additionalDataAdd));

                it('Выбор "Чекбокс" в "Тип поля"', async () => await dec.simple(el.select.iconXpand,
                    ['Тип поля', 'Выпадающий список', 'Чекбокс', entry.max],
                    el.select));

                it('Отображение поле выбора "Тип поля" - "Чекбокс"', async () => await dec.simple(el.select.select,
                    ['Тип поля', 'Чекбокс', entry.max],
                    el.select));

                it('Отображение поле ввода "Название поля"', async () => await dec.simple(el.input.input,
                    ['Название поля', '', entry.max],
                    el.input));

                it('Отображение поле ввода "Описание"', async () => await dec.simple(el.input.input,
                    ['Описание', '', entry.max],
                    el.input));

                it('Отсутствие поле ввода "Значение по умолчанию"', async () => await dec.simpleFalse(el.input.input,
                    ['Значение по умолчанию', '', entry.min],
                    el.input));

                it('Отображение поле выбора "Значение по умолчанию" - "Да" ',
                    async () => await dec.simple(el.select.select,
                        ['Значение по умолчанию', 'Да', entry.max],
                        el.select));

                it('Отсутствие поле выбора "Значение по умолчанию" - "Заполните поле"',
                    async () => await dec.simple(el.select.noSelect,
                        ['Значение по умолчанию', 'Заполните поле', entry.max],
                        el.select));

                it('Отсутствие кнопки "Добавить поле"',
                    async () => await dec.simpleFalse(el.button.button,
                        ['Добавить поле', entry.min],
                        el.button));

                it('Отсутсвие полей из списка ввода "Поля"',
                    async () => await dec.simple(el.modal.additionalDataAdd.noSelectTypeNum,
                        [1, entry.max],
                        el.modal.additionalDataAdd));
            });

            describe('Отображение с настройкой типа - "Дата"', () => {

                it('Выбор "Дата" в "Тип поля"', async () => await dec.simple(el.select.iconXpand,
                    ['Тип поля', 'Чекбокс', 'Дата', entry.max],
                    el.select));

                it('Отображение поле выбора "Тип поля" - "Дата" ', async () => await dec.simple(el.select.select,
                    ['Тип поля', 'Дата', entry.max],
                    el.select));

                it('Отображение поле ввода "Название поля"', async () => await dec.simple(el.input.input,
                    ['Название поля', '', entry.max],
                    el.input));

                it('Отображение поле ввода "Описание"', async () => await dec.simple(el.input.input,
                    ['Описание', '', entry.max],
                    el.input));

                it('Отсутствие поле ввода "Значение по умолчанию"', async () => await dec.simpleFalse(el.input.input,
                    ['Значение по умолчанию', '', entry.min],
                    el.input));

                it('Отсутствие поле выбора "Значение по умолчанию" - "Да"',
                    async () => await dec.simple(el.select.noSelect,
                        ['Значение по умолчанию', 'Да', entry.max],
                        el.select));

                it('Отсутствие поле выбора "Значение по умолчанию" - "Заполните поле"',
                    async () => await dec.simple(el.select.noSelect,
                        ['Значение по умолчанию', 'Заполните поле', entry.max],
                        el.select));

                it('Отсутствие кнопки "Добавить поле"',
                    async () => await dec.simpleFalse(el.button.button,
                        ['Добавить поле', entry.min],
                        el.button));

                it('Отсутсвие полей из списка ввода "Поля"',
                    async () => await dec.simple(el.modal.additionalDataAdd.noSelectTypeNum,
                        [1, entry.max],
                        el.modal.additionalDataAdd));
            });

            describe('Отображение с настройкой типа - "Дата и время"', () => {

                it('Выбор "Дата и время" в "Тип поля"', async () => await dec.simple(el.select.iconXpand,
                    ['Тип поля', 'Дата', 'Дата и время', entry.max],
                    el.select));

                it('Отображение поле выбора "Тип поля" - "Дата и время"', async () => await dec.simple(el.select.select,
                    ['Тип поля', 'Дата и время', entry.max],
                    el.select));

                it('Отображение поле ввода "Название поля"', async () => await dec.simple(el.input.input,
                    ['Название поля', '', entry.max],
                    el.input));

                it('Отображение поле ввода "Описание"', async () => await dec.simple(el.input.input,
                    ['Описание', '', entry.max],
                    el.input));

                it('Отсутствие поле ввода "Значение по умолчанию"', async () => await dec.simpleFalse(el.input.input,
                    ['Значение по умолчанию', '', entry.min],
                    el.input));

                it('Отсутствие поле выбора "Значение по умолчанию" - "Да"',
                    async () => await dec.simple(el.select.noSelect,
                        ['Значение по умолчанию', 'Да', entry.max],
                        el.select));

                it('Отсутствие поле выбора "Значение по умолчанию" - "Заполните поле"',
                    async () => await dec.simple(el.select.noSelect,
                        ['Значение по умолчанию', 'Заполните поле', entry.max],
                        el.select));

                it('Отсутствие кнопки "Добавить поле"',
                    async () => await dec.simpleFalse(el.button.button,
                        ['Добавить поле', entry.min],
                        el.button));

                it('Отсутсвие полей из списка ввода "Поля"',
                    async () => await dec.simple(el.modal.additionalDataAdd.noSelectTypeNum,
                        [1, entry.max],
                        el.modal.additionalDataAdd));
                it('Нажатие кнопки закрытия',
                    async () => await dec.simple(el.modal.additionalDataAdd.closeHandler,
                        [entry.max],
                        el.modal.additionalDataAdd));

                it('Отсутствие модального модального',
                    async () => await dec.simple(el.modal.additionalDataAdd.initClose,
                        [entry.max],
                        el.modal.additionalDataAdd));

            });
        });
});

// Тесты добавления
const add = (type) => {

    // Тип поля «Текстовый».
    // Тип поля «Текстовый». Минимальное количество параметров.
    const typeTextMinParams = () => describe(`Дополнительные данные. Тип поля: "Текстовый". ${type.person}. Добавление. 
    Минимальное количество параметров.`, () => {

        const params = {
            name: 'typeTextMinParamsName',
        };

        describe('Добавление', () => {
            type.bef();

            aft();

            it(`Отображение ${type.count} записей в таблице`, async () => await dec.simple(el.table.size,
                [type.count, entry.max],
                el.table,));

            it('Нажатие кнопки "Добавить"', async () => await dec.simple(el.butIcBefore.handler,
                [but.add, entry.max],
                el.butIcBefore));

            it('Отображене модального окна "Добавить дополнительное поле"',
                async () => await dec.simple(el.modal.additionalDataAdd.init,
                    [entry.max],
                    el.modal.additionalDataAdd));

            it('Выбор "Текстовый" в "Тип поля"', async () => await dec.simple(el.select.iconXpand,
                ['Тип поля', 'Текстовый', 'Текстовый', entry.max],
                el.select));

            it('Ввод "Название поля"', async () => await dec.simple(el.input.sendKeys,
                ['Название поля', '', params.name, entry.max],
                el.input));

            it('Нажатие кнопки "Сохранить"', async () => await dec.simple(el.button.handler,
                ['Сохранить', entry.max],
                el.button));

            it('Отображение сообщения "Дополнительное поле успешно добавлено"',
                async () => await dec.simple(el.success.success,
                    ['Дополнительное поле успешно добавлено', entry.max],
                    el.success));

            it('Отсутствие модального окна "Добавить дополнительное поле"',
                async () => await dec.simple(el.modal.additionalDataAdd.initClose,
                    [entry.max],
                    el.modal.additionalDataAdd));
        });

        describe('Проверка таблицы', () => {
            type.bef();

            aft();

            it(`Отображение ${type.count + 1} записей в таблице`, async () => await dec.simple(el.table.size,
                [type.count + 1, entry.max],
                el.table));

            it('Проверка "Название поля"', async () => await dec.simpleText(el.table.cellGetText,
                ['Название поля', 1, 1, entry.max],
                params.name,
                el.table));

            it('Проверка "Тип поля"', async () => await dec.simpleText(el.table.cellGetText,
                ['Тип поля', 1, 2, entry.max],
                'Текстовый',
                el.table));

            it('Проверка "Описание"', async () => await dec.simpleText(el.table.cellGetText,
                ['Описание', 1, 3, entry.max],
                '',
                el.table));

            it('Проверка "Значение по умолчанию"', async () => await dec.simpleText(el.table.cellGetText,
                ['Значение по умолчанию', 1, 4, entry.max],
                '',
                el.table));
        });

        describe('Проверка параметров', () => {
            type.bef();

            aft();

            it(`Нажатие по первой строке в таблице`, async () => await dec.simple(el.table.strHandler,
                [1, entry.max],
                el.table));

            it('Нажатие кнопки "Редактировать"', async () => await dec.simple(el.butIcBefore.handler,
                [but.edit, entry.max],
                el.butIcBefore));

            it('Отображене модального окна "Редактировать дополнительное поле"',
                async () => await dec.simple(el.modal.additionalDataEdit.init,
                    [entry.max],
                    el.modal.additionalDataEdit));

            it('Проверка "Название поля"', async () => await dec.simpleText(el.input.getValue,
                ['Название поля', '', entry.max],
                params.name,
                el.input));

            it('Проверка "Описание"', async () => await dec.simpleText(el.input.getValue,
                ['Описание', '', entry.max],
                '',
                el.input));

            it('Проверка "Тип поля"', async () => await dec.simpleText(el.select.getText,
                ['Тип поля', 'Текстовый', entry.max],
                'Текстовый',
                el.input));

            it('Проверка "Значение по умолчанию"', async () => await dec.simpleText(el.input.getValue,
                ['Значение по умолчанию', '', entry.max],
                '',
                el.input));

            it('Нажатие кнопки закрытия модального окна',
                async () => await dec.simple(el.modal.additionalDataEdit.closeHandler,
                    [entry.max],
                    el.modal.additionalDataEdit));

            it('Отсутствие модального окна "Добавить дополнительное поле"',
                async () => await dec.simple(el.modal.additionalDataEdit.initClose,
                    [entry.max],
                    el.modal.additionalDataEdit));
        });

        describe('Удаление тестовых данных', () => {
            type.bef();
            aft();
            dataRemove(type);
        });

    });

    // Тип поля «Текстовый». Максимальное количество параметров.
    const typeTextMaxParams = () => describe(`Дополнительные данные. Тип поля: "Текстовый". ${type.person}. Добавление. 
    Максимальное количество параметров.`, () => {

        const params = {
            name: 'typeTextMaxParamsName',
            description: 'typeTextMaxParamsDescription',
            defaultValue: 'typeTextMaxParamsValue'
        };

        describe('Добавление', () => {
            type.bef();

            aft();

            it(`Отображение ${type.count} записей в таблице`, async () => await dec.simple(el.table.size,
                [type.count, entry.max],
                el.table,));

            it('Нажатие кнопки "Добавить"', async () => await dec.simple(el.butIcBefore.handler,
                [but.add, entry.max],
                el.butIcBefore));

            it('Отображене модального окна "Добавить дополнительное поле"',
                async () => await dec.simple(el.modal.additionalDataAdd.init,
                    [entry.max],
                    el.modal.additionalDataAdd));

            it('Выбор "Текстовый" в "Тип поля"', async () => await dec.simple(el.select.iconXpand,
                ['Тип поля', 'Текстовый', 'Текстовый', entry.max],
                el.select));

            it('Ввод "Название поля"', async () => await dec.simple(el.input.sendKeys,
                ['Название поля', '', params.name, entry.max],
                el.input));

            it('Ввод "Описание"', async () => await dec.simple(el.input.sendKeys,
                ['Описание', '', params.description, entry.max],
                el.input));

            it('Ввод "Значение по умолчанию"', async () => await dec.simple(el.input.sendKeys,
                ['Значение по умолчанию', '', params.defaultValue, entry.max],
                el.input));

            it('Нажатие кнопки "Сохранить"', async () => await dec.simple(el.button.handler,
                ['Сохранить', entry.max],
                el.button));

            it('Отображение сообщения "Дополнительное поле успешно добавлено"',
                async () => await dec.simple(el.success.success,
                    ['Дополнительное поле успешно добавлено', entry.max],
                    el.success));

            it('Отсутствие модального окна "Добавить дополнительное поле"',
                async () => await dec.simple(el.modal.additionalDataAdd.initClose,
                    [entry.max],
                    el.modal.additionalDataAdd));
        });

        describe('Проверка таблицы', () => {
            type.bef();

            aft();

            it(`Отображение ${type.count + 1} записей в таблице`, async () => await dec.simple(el.table.size,
                [type.count + 1, entry.max],
                el.table));

            it('Проверка "Название поля"', async () => await dec.simpleText(el.table.cellGetText,
                ['Название поля', 1, 1, entry.max],
                params.name,
                el.table));

            it('Проверка "Тип поля"', async () => await dec.simpleText(el.table.cellGetText,
                ['Тип поля', 1, 2, entry.max],
                'Текстовый',
                el.table));

            it('Проверка "Описание"', async () => await dec.simpleText(el.table.cellGetText,
                ['Описание', 1, 3, entry.max],
                params.description,
                el.table));

            it('Проверка "Значение по умолчанию"', async () => await dec.simpleText(el.table.cellGetText,
                ['Значение по умолчанию', 1, 4, entry.max],
                params.defaultValue,
                el.table));
        });

        describe('Проверка параметров', () => {
            type.bef();

            aft();

            it(`Нажатие по первой строке в таблице`, async () => await dec.simple(el.table.strHandler,
                [1, entry.max],
                el.table));

            it('Нажатие кнопки "Редактировать"', async () => await dec.simple(el.butIcBefore.handler,
                [but.edit, entry.max],
                el.butIcBefore));

            it('Отображене модального окна "Редактировать дополнительное поле"',
                async () => await dec.simple(el.modal.additionalDataEdit.init,
                    [entry.max],
                    el.modal.additionalDataEdit));

            it('Проверка "Название поля"', async () => await dec.simpleText(el.input.getValue,
                ['Название поля', '', entry.max],
                params.name,
                el.input));

            it('Проверка "Описание"', async () => await dec.simpleText(el.input.getValue,
                ['Описание', '', entry.max],
                params.description,
                el.input));

            it('Проверка "Тип поля"', async () => await dec.simpleText(el.select.getText,
                ['Тип поля', 'Текстовый', entry.max],
                'Текстовый',
                el.input));

            it('Проверка "Значение по умолчанию"', async () => await dec.simpleText(el.input.getValue,
                ['Значение по умолчанию', '', entry.max],
                params.defaultValue,
                el.input));

            it('Нажатие кнопки закрытия модального окна',
                async () => await dec.simple(el.modal.additionalDataEdit.closeHandler,
                    [entry.max],
                    el.modal.additionalDataEdit));

            it('Отсутствие модального окна "Добавить дополнительное поле"',
                async () => await dec.simple(el.modal.additionalDataEdit.initClose,
                    [entry.max],
                    el.modal.additionalDataEdit));
        });

        describe('Удаление тестовых данных', () => {
            type.bef();
            aft();
            dataRemove(type);
        });
    });

    // Тип поля «Текстовый». Попытка добавления без «Название поля».
    const typeTextNoName = () => describe(`Дополнительные данные. Тип поля: "Текстовый". ${type.person}. Добавление.
    Попытка добавления без "Название поля".`, () => {

        const params = {
            description: 'typeTextNoNameDescription',
            defaultValue: 'typeTextNoNameValue'
        };

        describe('Добавление', () => {
            type.bef();

            aft();

            it(`Отображение ${type.count} записей в таблице`, async () => await dec.simple(el.table.size,
                [type.count, entry.max],
                el.table,));

            it('Нажатие кнопки "Добавить"', async () => await dec.simple(el.butIcBefore.handler,
                [but.add, entry.max],
                el.butIcBefore));

            it('Отображене модального окна "Добавить дополнительное поле"',
                async () => await dec.simple(el.modal.additionalDataAdd.init,
                    [entry.max],
                    el.modal.additionalDataAdd));

            it('Выбор "Текстовый" в "Тип поля"', async () => await dec.simple(el.select.iconXpand,
                ['Тип поля', 'Текстовый', 'Текстовый', entry.max],
                el.select));

            it('Ввод "Описание"', async () => await dec.simple(el.input.sendKeys,
                ['Описание', '', params.description, entry.max],
                el.input));

            it('Ввод "Значение по умолчанию"', async () => await dec.simple(el.input.sendKeys,
                ['Значение по умолчанию', '', params.defaultValue, entry.max],
                el.input));

            it('Кнопка "Сохранить" - не активна', async () => await dec.simple(el.button.disabled,
                ['Сохранить', entry.max],
                el.button));

            it('Нажатие кнопки "Сохранить"', async () => await dec.simpleFalse(el.button.handlerNoActive,
                ['Сохранить', entry.max],
                el.button));

            it('Модальное окно "Добавить дополнительное поле" не закрыто',
                async () => await dec.simpleFalse(el.modal.additionalDataAdd.initClose,
                    [entry.min],
                    el.modal.additionalDataAdd));

            it('Нажатие кнопки закрытия модального окна',
                async () => await dec.simple(el.modal.additionalDataEdit.closeHandler,
                    [entry.max],
                    el.modal.additionalDataEdit));

            it('Отсутствие модального окна "Добавить дополнительное поле"',
                async () => await dec.simple(el.modal.additionalDataEdit.initClose,
                    [entry.max],
                    el.modal.additionalDataEdit));
        });

        describe('Проверка таблицы', () => {
            type.bef();

            aft();

            it(`Отображение ${type.count} записей в таблице`, async () => await dec.simple(el.table.size,
                [type.count, entry.max],
                el.table));
        });

    });

    // Тип поля «Текстовый». Попытка дублирования.
    const typeTextDuplicate = () => describe(`Дополнительные данные. Тип поля: "Текстовый". ${type.person}. Добавление.
    Попытка дублирования.`, () => {

        const params = {
            name: 'typeTextDuplicate',
            error: 'Такое название уже используется'
        };

        describe('API - добавление', () => {
            type.bef();

            aft();

            it('Добавление дополнительных данных', async () => {
                const data = {
                    name: params.name,
                    comment: '',
                    type_id: 2,
                    default_value: '',
                    items: ''
                };
                const cook = await page.base.getCookie('token');
                await dec.simple(api.putAdditionalData,
                    [[data], type.api, cook.text],
                    api.putAdditionalData);
            });
        });

        describe('Добавление', () => {
            type.bef();

            aft();

            it(`Отображение ${type.count + 1} записей в таблице`, async () => await dec.simple(el.table.size,
                [type.count + 1, entry.max],
                el.table,));

            it('Нажатие кнопки "Добавить"', async () => await dec.simple(el.butIcBefore.handler,
                [but.add, entry.max],
                el.butIcBefore));

            it('Отображене модального окна "Добавить дополнительное поле"',
                async () => await dec.simple(el.modal.additionalDataAdd.init,
                    [entry.max],
                    el.modal.additionalDataAdd));

            it('Выбор "Текстовый" в "Тип поля"', async () => await dec.simple(el.select.iconXpand,
                ['Тип поля', 'Текстовый', 'Текстовый', entry.max],
                el.select));

            it('Ввод "Название поля"', async () => await dec.simple(el.input.sendKeys,
                ['Название поля', '', params.name, entry.max],
                el.input));

            it('Нажатие кнопки "Сохранить"', async () => await dec.simple(el.button.handler,
                ['Сохранить', entry.max],
                el.button));

            it('Отображение ошибки',
                async () => await dec.simple(el.error.error,
                    [params.error, entry.max],
                    el.error));

            it('Нажатие кнопки закрытия модального окна',
                async () => await dec.simple(el.modal.additionalDataEdit.closeHandler,
                    [entry.max],
                    el.modal.additionalDataEdit));

            it('Отсутствие модального окна "Добавить дополнительное поле"',
                async () => await dec.simple(el.modal.additionalDataAdd.initClose,
                    [entry.max],
                    el.modal.additionalDataAdd));
        });

        describe('Проверка таблицы', () => {
            type.bef();

            aft();

            it(`Отображение ${type.count + 1} записей в таблице`, async () => await dec.simple(el.table.size,
                [type.count + 1, entry.max],
                el.table));

            it('Проверка "Название поля"', async () => await dec.simpleText(el.table.cellGetText,
                ['Название поля', 1, 1, entry.max],
                params.name,
                el.table));

            it('Проверка "Тип поля"', async () => await dec.simpleText(el.table.cellGetText,
                ['Тип поля', 1, 2, entry.max],
                'Графический',
                el.table));

            it('Проверка "Описание"', async () => await dec.simpleText(el.table.cellGetText,
                ['Описание', 1, 3, entry.max],
                '',
                el.table));

            it('Проверка "Значение по умолчанию"', async () => await dec.simpleText(el.table.cellGetText,
                ['Значение по умолчанию', 1, 4, entry.max],
                '',
                el.table));
        });

        describe('Удаление тестовый данных', () => {
            type.bef();
            aft();
            dataRemove(type);
        });
    });

    // Тип поля «Текстовый». Проверки редактирования.
    const typeText = () => describe(`Дополнительные данные. Тип поля "Текстовый". ${type.person}. 
    Проверки добавления.`, () => {
        typeTextMinParams();
        typeTextMaxParams();
        typeTextNoName();
        typeTextDuplicate();
    });

    // Тип поля «Графический».
    // Тип поля «Графический». Минимальное количество параметров.
    const typeGraficMinParams = () => describe(`Дополнительные данные. Тип поля "Графический". ${type.person}. 
    Добавление. Минимальное количество параметров.`,() => {

        const params = {
            name: 'typeGraficMinParams',
        };

        describe('Добавление', () => {
            type.bef();

            aft();

            it(`Отображение ${type.count} записей в таблице`, async () => await dec.simple(el.table.size,
                [type.count, entry.max],
                el.table,));

            it('Нажатие кнопки "Добавить"', async () => await dec.simple(el.butIcBefore.handler,
                [but.add, entry.max],
                el.butIcBefore));

            it('Отображене модального окна "Добавить дополнительное поле"',
                async () => await dec.simple(el.modal.additionalDataAdd.init,
                    [entry.max],
                    el.modal.additionalDataAdd));

            it('Выбор "Графический" в "Тип поля"', async () => await dec.simple(el.select.iconXpand,
                ['Тип поля', 'Текстовый', 'Графический', entry.max],
                el.select));

            it('Ввод "Название поля"', async () => await dec.simple(el.input.sendKeys,
                ['Название поля', '', params.name, entry.max],
                el.input));

            it('Нажатие кнопки "Сохранить"', async () => await dec.simple(el.button.handler,
                ['Сохранить', entry.max],
                el.button));

            it('Отображение сообщения "Дополнительное поле успешно добавлено"',
                async () => await dec.simple(el.success.success,
                    ['Дополнительное поле успешно добавлено', entry.max],
                    el.success));

            it('Отсутствие модального окна "Добавить дополнительное поле"',
                async () => await dec.simple(el.modal.additionalDataAdd.initClose,
                    [entry.max],
                    el.modal.additionalDataAdd));
        });

        describe('Проверка таблицы', () => {
            type.bef();

            aft();

            it(`Отображение ${type.count + 1} записей в таблице`, async () => await dec.simple(el.table.size,
                [type.count + 1, entry.max],
                el.table));

            it('Проверка "Название поля"', async () => await dec.simpleText(el.table.cellGetText,
                ['Название поля', 1, 1, entry.max],
                params.name,
                el.table));

            it('Проверка "Тип поля"', async () => await dec.simpleText(el.table.cellGetText,
                ['Тип поля', 1, 2, entry.max],
                'Графический',
                el.table));

            it('Проверка "Описание"', async () => await dec.simpleText(el.table.cellGetText,
                ['Описание', 1, 3, entry.max],
                '',
                el.table));

            it('Проверка "Значение по умолчанию"', async () => await dec.simpleText(el.table.cellGetText,
                ['Значение по умолчанию', 1, 4, entry.max],
                '',
                el.table));
        });

        describe('Проверка параметров', () => {
            type.bef();

            aft();

            it(`Нажатие по первой строке в таблице`, async () => await dec.simple(el.table.strHandler,
                [1, entry.max],
                el.table));

            it('Нажатие кнопки "Редактировать"', async () => await dec.simple(el.butIcBefore.handler,
                [but.edit, entry.max],
                el.butIcBefore));

            it('Отображене модального окна "Редактировать дополнительное поле"',
                async () => await dec.simple(el.modal.additionalDataEdit.init,
                    [entry.max],
                    el.modal.additionalDataEdit));

            it('Проверка "Название поля"', async () => await dec.simpleText(el.input.getValue,
                ['Название поля', '', entry.max],
                params.name,
                el.input));

            it('Проверка "Описание"', async () => await dec.simpleText(el.input.getValue,
                ['Описание', '', entry.max],
                '',
                el.input));

            it('Проверка "Тип поля"', async () => await dec.simpleText(el.select.getText,
                ['Тип поля', 'Графический', entry.max],
                'Графический',
                el.input));

            it('Нажатие кнопки закрытия модального окна',
                async () => await dec.simple(el.modal.additionalDataEdit.closeHandler,
                    [entry.max],
                    el.modal.additionalDataEdit));

            it('Отсутствие модального окна "Добавить дополнительное поле"',
                async () => await dec.simple(el.modal.additionalDataEdit.initClose,
                    [entry.max],
                    el.modal.additionalDataEdit));
        });

        describe('Удаление тестовых данных', () => {
            type.bef();
            aft();
            dataRemove(type);
        });
    });

    // Тип поля «Графический». Максимальное количество параметров.
    const typeGraficMaxParams = () => describe(`Дополнительные данные. Тип поля "Графический". ${type.person}. 
    Добавление. Максимальное количество параметров.`,() => {

        const params = {
            name: 'typeGraficMaxParamsName',
            description: 'typeGraficMaxParamsDescription'
        };

        describe('Добавление', () => {
            type.bef();

            aft();

            it(`Отображение ${type.count} записей в таблице`, async () => await dec.simple(el.table.size,
                [type.count, entry.max],
                el.table,));

            it('Нажатие кнопки "Добавить"', async () => await dec.simple(el.butIcBefore.handler,
                [but.add, entry.max],
                el.butIcBefore));

            it('Отображене модального окна "Добавить дополнительное поле"',
                async () => await dec.simple(el.modal.additionalDataAdd.init,
                    [entry.max],
                    el.modal.additionalDataAdd));

            it('Выбор "Графический" в "Тип поля"', async () => await dec.simple(el.select.iconXpand,
                ['Тип поля', 'Текстовый', 'Графический', entry.max],
                el.select));

            it('Ввод "Название поля"', async () => await dec.simple(el.input.sendKeys,
                ['Название поля', '', params.name, entry.max],
                el.input));

            it('Ввод "Описание"', async () => await dec.simple(el.input.sendKeys,
                ['Описание', '', params.description, entry.max],
                el.input));

            it('Нажатие кнопки "Сохранить"', async () => await dec.simple(el.button.handler,
                ['Сохранить', entry.max],
                el.button));

            it('Отображение сообщения "Дополнительное поле успешно добавлено"',
                async () => await dec.simple(el.success.success,
                    ['Дополнительное поле успешно добавлено', entry.max],
                    el.success));

            it('Отсутствие модального окна "Добавить дополнительное поле"',
                async () => await dec.simple(el.modal.additionalDataAdd.initClose,
                    [entry.max],
                    el.modal.additionalDataAdd));
        });

        describe('Проверка таблицы', () => {
            type.bef();

            aft();

            it(`Отображение ${type.count + 1} записей в таблице`, async () => await dec.simple(el.table.size,
                [type.count + 1, entry.max],
                el.table));

            it('Проверка "Название поля"', async () => await dec.simpleText(el.table.cellGetText,
                ['Название поля', 1, 1, entry.max],
                params.name,
                el.table));

            it('Проверка "Тип поля"', async () => await dec.simpleText(el.table.cellGetText,
                ['Тип поля', 1, 2, entry.max],
                'Графический',
                el.table));

            it('Проверка "Описание"', async () => await dec.simpleText(el.table.cellGetText,
                ['Описание', 1, 3, entry.max],
                params.description,
                el.table));

            it('Проверка "Значение по умолчанию"', async () => await dec.simpleText(el.table.cellGetText,
                ['Значение по умолчанию', 1, 4, entry.max],
                '',
                el.table));
        });

        describe('Проверка параметров', () => {
            type.bef();

            aft();

            it(`Нажатие по первой строке в таблице`, async () => await dec.simple(el.table.strHandler,
                [1, entry.max],
                el.table));

            it('Нажатие кнопки "Редактировать"', async () => await dec.simple(el.butIcBefore.handler,
                [but.edit, entry.max],
                el.butIcBefore));

            it('Отображене модального окна "Редактировать дополнительное поле"',
                async () => await dec.simple(el.modal.additionalDataEdit.init,
                    [entry.max],
                    el.modal.additionalDataEdit));

            it('Проверка "Название поля"', async () => await dec.simpleText(el.input.getValue,
                ['Название поля', '', entry.max],
                params.name,
                el.input));

            it('Проверка "Описание"', async () => await dec.simpleText(el.input.getValue,
                ['Описание', '', entry.max],
                params.description,
                el.input));

            it('Проверка "Тип поля"', async () => await dec.simpleText(el.select.getText,
                ['Тип поля', 'Графический', entry.max],
                'Графический',
                el.input));

            it('Нажатие кнопки закрытия модального окна',
                async () => await dec.simple(el.modal.additionalDataEdit.closeHandler,
                    [entry.max],
                    el.modal.additionalDataEdit));

            it('Отсутствие модального окна "Добавить дополнительное поле"',
                async () => await dec.simple(el.modal.additionalDataEdit.initClose,
                    [entry.max],
                    el.modal.additionalDataEdit));
        });

        describe('Удаление тестовых данных', () => {
            type.bef();
            aft();
            dataRemove(type);
        });
    });

    // Тип поля «Графический». Попытка добавления без "Название поля".
    const typeGraficNoName = () => describe(`Дополнительные данные. Тип поля "Графический". ${type.person}. Добавление.
     Попытка добавления без "Название поля".`,() => {

        const params = {
            description: 'typeGraficNoNameDescription'
        };

        describe('Добавление', () => {
            type.bef();

            aft();

            it(`Отображение ${type.count} записей в таблице`, async () => await dec.simple(el.table.size,
                [type.count, entry.max],
                el.table,));

            it('Нажатие кнопки "Добавить"', async () => await dec.simple(el.butIcBefore.handler,
                [but.add, entry.max],
                el.butIcBefore));

            it('Отображене модального окна "Добавить дополнительное поле"',
                async () => await dec.simple(el.modal.additionalDataAdd.init,
                    [entry.max],
                    el.modal.additionalDataAdd));

            it('Выбор "Графический" в "Тип поля"', async () => await dec.simple(el.select.iconXpand,
                ['Тип поля', 'Текстовый', 'Графический', entry.max],
                el.select));

            it('Ввод "Описание"', async () => await dec.simple(el.input.sendKeys,
                ['Описание', '', params.description, entry.max],
                el.input));

            it('Кнопка "Сохранить" - не активна', async () => await dec.simple(el.button.disabled,
                ['Сохранить', entry.max],
                el.button));

            it('Нажатие кнопки "Сохранить"', async () => await dec.simpleFalse(el.button.handlerNoActive,
                ['Сохранить', entry.max],
                el.button));

            it('Модальное окно "Добавить дополнительное поле" не закрыто',
                async () => await dec.simpleFalse(el.modal.additionalDataAdd.initClose,
                    [entry.min],
                    el.modal.additionalDataAdd));

            it('Нажатие кнопки закрытия модального окна',
                async () => await dec.simple(el.modal.additionalDataEdit.closeHandler,
                    [entry.max],
                    el.modal.additionalDataEdit));

            it('Отсутствие модального окна "Добавить дополнительное поле"',
                async () => await dec.simple(el.modal.additionalDataEdit.initClose,
                    [entry.max],
                    el.modal.additionalDataEdit));
        });

        describe('Проверка таблицы', () => {
            type.bef();

            aft();

            it(`Отображение ${type.count} записей в таблице`, async () => await dec.simple(el.table.size,
                [type.count, entry.max],
                el.table));
        });

    });

    // Тип поля «Графический». Попытка дублирования.
    const typeGraficDuplicate = () => describe(`Дополнительные данные. Тип поля "Графический". ${type.person}.
    Добавление. Попытка дублирования.`, () => {

        const params = {
            name: 'typeGraficDuplicate',
            error: 'Такое название уже используется'
        };

        describe('API - добавление', () => {
            type.bef();

            aft();

            it('Добавление дополнительных данных', async () => {
                const data = {
                    name: params.name,
                    comment: '',
                    type_id: 1,
                    default_value: '',
                    items: ''
                };
                const cook = await page.base.getCookie('token');
                await dec.simple(api.putAdditionalData,
                    [[data], type.api, cook.text],
                    api.putAdditionalData);
            });
        });

        describe('Добавление', () => {
            type.bef();

            aft();

            it(`Отображение ${type.count + 1} записей в таблице`, async () => await dec.simple(el.table.size,
                [type.count + 1, entry.max],
                el.table,));

            it('Нажатие кнопки "Добавить"', async () => await dec.simple(el.butIcBefore.handler,
                [but.add, entry.max],
                el.butIcBefore));

            it('Отображене модального окна "Добавить дополнительное поле"',
                async () => await dec.simple(el.modal.additionalDataAdd.init,
                    [entry.max],
                    el.modal.additionalDataAdd));

            it('Выбор "Графический" в "Тип поля"', async () => await dec.simple(el.select.iconXpand,
                ['Тип поля', 'Текстовый', 'Графический', entry.max],
                el.select));

            it('Ввод "Название поля"', async () => await dec.simple(el.input.sendKeys,
                ['Название поля', '', params.name, entry.max],
                el.input));

            it('Нажатие кнопки "Сохранить"', async () => await dec.simple(el.button.handler,
                ['Сохранить', entry.max],
                el.button));

            it('Отображение ошибки',
                async () => await dec.simple(el.error.error,
                    [params.error, entry.max],
                    el.error));

            it('Нажатие кнопки закрытия модального окна',
                async () => await dec.simple(el.modal.additionalDataEdit.closeHandler,
                    [entry.max],
                    el.modal.additionalDataEdit));

            it('Отсутствие модального окна "Добавить дополнительное поле"',
                async () => await dec.simple(el.modal.additionalDataAdd.initClose,
                    [entry.max],
                    el.modal.additionalDataAdd));
        });

        describe('Проверка таблицы', () => {
            type.bef();

            aft();

            it(`Отображение ${type.count + 1} записей в таблице`, async () => await dec.simple(el.table.size,
                [type.count + 1, entry.max],
                el.table));

            it('Проверка "Название поля"', async () => await dec.simpleText(el.table.cellGetText,
                ['Название поля', 1, 1, entry.max],
                params.name,
                el.table));

            it('Проверка "Тип поля"', async () => await dec.simpleText(el.table.cellGetText,
                ['Тип поля', 1, 2, entry.max],
                'Текстовый',
                el.table));

            it('Проверка "Описание"', async () => await dec.simpleText(el.table.cellGetText,
                ['Описание', 1, 3, entry.max],
                '',
                el.table));

            it('Проверка "Значение по умолчанию"', async () => await dec.simpleText(el.table.cellGetText,
                ['Значение по умолчанию', 1, 4, entry.max],
                '',
                el.table));
        });

        describe('Удаление тестовый данных', () => {
            type.bef();
            aft();
            dataRemove(type);
        });
    });

    // Тип поля «Графический». Проверки редактирования.
    const typeGrafic = () => describe(`Дополнительные данные. Тип поля "Графический". ${type.person}. 
    Проверки добавления.`, () => {
        typeGraficMinParams();
        typeGraficMaxParams();
        typeGraficNoName();
        typeGraficDuplicate();
    });

    // Тип поля "Выпадающий список"
    // Тип поля "Выпадающий список". Минимальное количество параметров.
    const typeSelectMinParams = () => describe(`Дополнительные данные. Тип поля "Выпадающий список". ${type.person}.
    Добавление. Минимальное количество параметров.`, () => {

        const params = {
            name: 'typeSelectMinParamsName',
        };

        describe('Добавление', () => {
            type.bef();

            aft();

            it(`Отображение ${type.count} записей в таблице`, async () => await dec.simple(el.table.size,
                [type.count, entry.max],
                el.table,));

            it('Нажатие кнопки "Добавить"', async () => await dec.simple(el.butIcBefore.handler,
                [but.add, entry.max],
                el.butIcBefore));

            it('Отображене модального окна "Добавить дополнительное поле"',
                async () => await dec.simple(el.modal.additionalDataAdd.init,
                    [entry.max],
                    el.modal.additionalDataAdd));

            it('Выбор "Выпадающий список" в "Тип поля"', async () => await dec.simple(el.select.iconXpand,
                ['Тип поля', 'Текстовый', 'Выпадающий список', entry.max],
                el.select));

            it('Ввод "Название поля"', async () => await dec.simple(el.input.sendKeys,
                ['Название поля', '', params.name, entry.max],
                el.input));

            it('Удаление поля 1 в списке полей ввода "Поля"',
                async () => await dec.simple(el.modal.additionalDataAdd.selectTypeRemove,
                    [1, entry.max],
                    el.modal.additionalDataAdd));

            it('Отсутствие полей в списке полей ввода "Поля"',
                async () => await dec.simple(el.modal.additionalDataAdd.noSelectType,
                    [entry.max],
                    el.modal.additionalDataAdd));

            it('Нажатие кнопки "Сохранить"', async () => await dec.simple(el.button.handler,
                ['Сохранить', entry.max],
                el.button));

            it('Отображение сообщения "Дополнительное поле успешно добавлено"',
                async () => await dec.simple(el.success.success,
                    ['Дополнительное поле успешно добавлено', entry.max],
                    el.success));

            it('Отсутствие модального окна "Добавить дополнительное поле"',
                async () => await dec.simple(el.modal.additionalDataAdd.initClose,
                    [entry.max],
                    el.modal.additionalDataAdd));
        });

        describe('Проверка таблицы', () => {
            type.bef();

            aft();

            it(`Отображение ${type.count + 1} записей в таблице`, async () => await dec.simple(el.table.size,
                [type.count + 1, entry.max],
                el.table));

            it('Проверка "Название поля"', async () => await dec.simpleText(el.table.cellGetText,
                ['Название поля', 1, 1, entry.max],
                params.name,
                el.table));

            it('Проверка "Тип поля"', async () => await dec.simpleText(el.table.cellGetText,
                ['Тип поля', 1, 2, entry.max],
                'Выпадающий список',
                el.table));

            it('Проверка "Описание"', async () => await dec.simpleText(el.table.cellGetText,
                ['Описание', 1, 3, entry.max],
                '',
                el.table));

            it('Проверка "Значение по умолчанию"', async () => await dec.simpleText(el.table.cellGetText,
                ['Значение по умолчанию', 1, 4, entry.max],
                '',
                el.table));
        });

        describe('Проверка параметров', () => {
            type.bef();

            aft();

            it(`Нажатие по первой строке в таблице`, async () => await dec.simple(el.table.strHandler,
                [1, entry.max],
                el.table));

            it('Нажатие кнопки "Редактировать"', async () => await dec.simple(el.butIcBefore.handler,
                [but.edit, entry.max],
                el.butIcBefore));

            it('Отображене модального окна "Редактировать дополнительное поле"',
                async () => await dec.simple(el.modal.additionalDataEdit.init,
                    [entry.max],
                    el.modal.additionalDataEdit));

            it('Проверка "Название поля"', async () => await dec.simpleText(el.input.getValue,
                ['Название поля', '', entry.max],
                params.name,
                el.input));

            it('Проверка "Описание"', async () => await dec.simpleText(el.input.getValue,
                ['Описание', '', entry.max],
                '',
                el.input));

            it('Проверка "Тип поля"', async () => await dec.simpleText(el.select.getText,
                ['Тип поля', 'Выпадающий список', entry.max],
                'Выпадающий список',
                el.input));

            it('Отсутствие полей в списке полей ввода "Поля"',
                async () => await dec.simple(el.modal.additionalDataAdd.noSelectType,
                    [entry.max],
                    el.modal.additionalDataAdd));

            it('Проверка "Значение по умолчанию"', async () => await dec.simpleText(el.select.getText,
                ['Значение по умолчанию', 'Заполните поле', entry.max],
                'Заполните поле',
                el.input));

            it('Нажатие кнопки закрытия модального окна',
                async () => await dec.simple(el.modal.additionalDataEdit.closeHandler,
                    [entry.max],
                    el.modal.additionalDataEdit));

            it('Отсутствие модального окна "Добавить дополнительное поле"',
                async () => await dec.simple(el.modal.additionalDataEdit.initClose,
                    [entry.max],
                    el.modal.additionalDataEdit));
        });

        describe('Удаление тестовых данных', () => {
            type.bef();
            aft();
            dataRemove(type);
        });

    });

    // Тип поля "Выпадающий список". Максиимальное количество параметров.
    const typeSelectMaxParams = () => describe(`Дополнительные данные. Тип поля: "Выпадающий список". ${type.person}. 
    Добавление. Максимальное количество параметров.`, () => {

        const params = {
            name: 'typeSelectMaxParamsName',
            description: 'typeSelectMaxParamsDescription',
            valueName: 'typeSelectMaxParamsValue',
            defaultValue: 'typeSelectMaxParamsValue8',
        };

        describe('Добавление', () => {

            type.bef();

            aft();

            it(`Отображение ${type.count} записей в таблице`, async () => await dec.simple(el.table.size,
                [type.count, entry.max],
                el.table,));

            it('Нажатие кнопки "Добавить"', async () => await dec.simple(el.butIcBefore.handler,
                [but.add, entry.max],
                el.butIcBefore));

            it('Отображене модального окна "Добавить дополнительное поле"',
                async () => await dec.simple(el.modal.additionalDataAdd.init,
                    [entry.max],
                    el.modal.additionalDataAdd));

            it('Выбор "Выпадающий список" в "Тип поля"', async () => await dec.simple(el.select.iconXpand,
                ['Тип поля', 'Текстовый', 'Выпадающий список', entry.max],
                el.select));

            it('Ввод "Название поля"', async () => await dec.simple(el.input.sendKeys,
                ['Название поля', '', params.name, entry.max],
                el.input));

            it('Ввод "Описание"', async () => await dec.simple(el.input.sendKeys,
                ['Описание', '', params.description, entry.max],
                el.input));

            it('Удаление поля 1 в списке полей ввода "Поля"',
                async () => await dec.simple(el.modal.additionalDataAdd.selectTypeRemove,
                    [1, entry.max],
                    el.modal.additionalDataAdd));


            [...Array(8).keys()].forEach(() => {
                return (
                    it(`Нажатие кнопки "Добавить поле"`, async () => await dec.simple(el.button.handler,
                        ['Добавить поле', entry.max],
                        el.button)));
            });

            [...Array(8).keys()].forEach(item => {
                return (
                    it(`Ввод значение в поле ${item + 1} в списке полей ввода "Поля"`,
                        async () => await dec.simple(el.modal.additionalDataAdd.selectTypeSendKeys,
                            [item + 1, params.valueName + (item + 1), entry.max],
                            el.modal.additionalDataAdd)));
            });

            it(`Выбор "Значение по умолчанию"`,
                async () => await dec.simple(el.select.iconXpand,
                    ['Значение по умолчанию', 'Заполните поле', params.defaultValue, entry.max],
                    el.select));

            it('Нажатие кнопки "Сохранить"', async () => await dec.simple(el.button.handler,
                ['Сохранить', entry.max],
                el.button));

            it('Отображение сообщения "Дополнительное поле успешно добавлено"',
                async () => await dec.simple(el.success.success,
                    ['Дополнительное поле успешно добавлено', entry.max],
                    el.success));

            it('Отсутствие модального окна "Добавить дополнительное поле"',
                async () => await dec.simple(el.modal.additionalDataAdd.initClose,
                    [entry.max],
                    el.modal.additionalDataAdd));
        });

        describe('Проверка таблицы', () => {
            type.bef();

            aft();

            it(`Отображение ${type.count + 1} записей в таблице`, async () => await dec.simple(el.table.size,
                [type.count + 1, entry.max],
                el.table));

            it('Проверка "Название поля"', async () => await dec.simpleText(el.table.cellGetText,
                ['Название поля', 1, 1, entry.max],
                params.name,
                el.table));

            it('Проверка "Тип поля"', async () => await dec.simpleText(el.table.cellGetText,
                ['Тип поля', 1, 2, entry.max],
                'Выпадающий список',
                el.table));

            it('Проверка "Описание"', async () => await dec.simpleText(el.table.cellGetText,
                ['Описание', 1, 3, entry.max],
                params.description,
                el.table));

            it('Проверка "Значение по умолчанию"', async () => await dec.simpleText(el.table.cellGetText,
                ['Значение по умолчанию', 1, 4, entry.max],
                params.defaultValue,
                el.table));
        });

        describe('Проверка параметров', () => {
            type.bef();

            aft();

            it(`Нажатие по первой строке в таблице`, async () => await dec.simple(el.table.strHandler,
                [1, entry.max],
                el.table));

            it('Нажатие кнопки "Редактировать"', async () => await dec.simple(el.butIcBefore.handler,
                [but.edit, entry.max],
                el.butIcBefore));

            it('Отображене модального окна "Редактировать дополнительное поле"',
                async () => await dec.simple(el.modal.additionalDataEdit.init,
                    [entry.max],
                    el.modal.additionalDataEdit));

            it('Проверка "Название поля"', async () => await dec.simpleText(el.input.getValue,
                ['Название поля', '', entry.max],
                params.name,
                el.input));

            it('Проверка "Описание"', async () => await dec.simpleText(el.input.getValue,
                ['Описание', '', entry.max],
                params.description,
                el.input));

            it('Проверка "Тип поля"', async () => await dec.simpleText(el.select.getText,
                ['Тип поля', 'Выпадающий список', entry.max],
                'Выпадающий список',
                el.input));

            [...Array(8).keys()].forEach(item => {
                return (
                    it(`Проверка поле ${item + 1} в списке полей ввода "Поля"`,
                        async () => await dec.simpleText(el.modal.additionalDataAdd.selectTypeGetValue,
                            [item + 1, entry.max],
                            params.valueName + (item + 1),
                            el.modal.additionalDataAdd)));
            });

            it('Проверка "Значение по умолчанию"', async () => await dec.simpleText(el.select.getText,
                ['Значение по умолчанию', params.defaultValue, entry.max],
                params.defaultValue,
                el.input));

            it('Нажатие кнопки закрытия модального окна',
                async () => await dec.simple(el.modal.additionalDataEdit.closeHandler,
                    [entry.max],
                    el.modal.additionalDataEdit));

            it('Отсутствие модального окна "Добавить дополнительное поле"',
                async () => await dec.simple(el.modal.additionalDataEdit.initClose,
                    [entry.max],
                    el.modal.additionalDataEdit));
        });

        describe('Удаление тестовых данных', () => {
            type.bef();
            aft();
            dataRemove(type);
        });

    });

    // Тип поля "Выпадающий список". Попытка добавления без "Название поля".
    const typeSelectNoName = () =>  describe(`Дополнительные данные. Тип поля: "Выпадающий список". ${type.person}.
    Добавление. Попытка добавления без "Название поля".`, () => {

        const params = {
            description: 'typeSelectNoNameDescription',
            value: 'typeSelectNoNameValue'
        };

        describe('Добавление', () => {
            type.bef();

            aft();

            it(`Отображение ${type.count} записей в таблице`, async () => await dec.simple(el.table.size,
                [type.count, entry.max],
                el.table,));

            it('Нажатие кнопки "Добавить"', async () => await dec.simple(el.butIcBefore.handler,
                [but.add, entry.max],
                el.butIcBefore));

            it('Отображене модального окна "Добавить дополнительное поле"',
                async () => await dec.simple(el.modal.additionalDataAdd.init,
                    [entry.max],
                    el.modal.additionalDataAdd));

            it('Выбор "Выпадающий список" в "Тип поля"', async () => await dec.simple(el.select.iconXpand,
                ['Тип поля', 'Текстовый', 'Выпадающий список', entry.max],
                el.select));

            it('Ввод "Описание"', async () => await dec.simple(el.input.sendKeys,
                ['Описание', '', params.description, entry.max],
                el.input));

            it(`Ввод значение в поле 1 в списке полей ввода "Поля"`,
                async () => await dec.simple(el.modal.additionalDataAdd.selectTypeSendKeys,
                    [1, params.value, entry.max],
                    el.modal.additionalDataAdd));

            it(`Выбор "Значение по умолчанию"`,
                async () => await dec.simple(el.select.iconXpand,
                    ['Значение по умолчанию', 'Заполните поле', params.value, entry.max],
                    el.select));

            it('Кнопка "Сохранить" - не активна', async () => await dec.simple(el.button.disabled,
                ['Сохранить', entry.max],
                el.button));

            it('Нажатие кнопки "Сохранить"', async () => await dec.simpleFalse(el.button.handlerNoActive,
                ['Сохранить', entry.max],
                el.button));

            it('Модальное окно "Добавить дополнительное поле" не закрыто',
                async () => await dec.simpleFalse(el.modal.additionalDataAdd.initClose,
                    [entry.min],
                    el.modal.additionalDataAdd));

            it('Нажатие кнопки закрытия модального окна',
                async () => await dec.simple(el.modal.additionalDataEdit.closeHandler,
                    [entry.max],
                    el.modal.additionalDataEdit));

            it('Отсутствие модального окна "Добавить дополнительное поле"',
                async () => await dec.simple(el.modal.additionalDataEdit.initClose,
                    [entry.max],
                    el.modal.additionalDataEdit));
        });

        describe('Проверка таблицы', () => {
            type.bef();

            aft();

            it(`Отображение ${type.count} записей в таблице`, async () => await dec.simple(el.table.size,
                [type.count, entry.max],
                el.table));
        });

    });

    //Тип поля "Выпадающий список". Добавление с добавлением и удалением поля в списке полей ввода "Поля"
    const typeSelectDeleteBox = () => describe(`Дополнительные данные. Тип поля: "Выпадающий список". ${type.person}.
    Добавление. Добавление с добавлением и удалением поля в списке полей ввода "Поля".`, () => {

        const params = {
            name: 'typeSelectDeleteBoxName',
            value1: 'typeSelectDeleteBoxValue1',
            value2: 'typeSelectDeleteBoxValue2'
        };

        describe('Добавление', () => {

            type.bef();

            aft();

            it(`Отображение ${type.count} записей в таблице`, async () => await dec.simple(el.table.size,
                [type.count, entry.max],
                el.table,));

            it('Нажатие кнопки "Добавить"', async () => await dec.simple(el.butIcBefore.handler,
                [but.add, entry.max],
                el.butIcBefore));

            it('Отображение модального окна "Добавить дополнительное поле"',
                async () => await dec.simple(el.modal.additionalDataAdd.init,
                    [entry.max],
                    el.modal.additionalDataAdd));

            it('Выбор "Выпадающий список" в "Тип поля"', async () => await dec.simple(el.select.iconXpand,
                ['Тип поля', 'Текстовый', 'Выпадающий список', entry.max],
                el.select));

            it('Ввод "Название поля"', async () => await dec.simple(el.input.sendKeys,
                ['Название поля', '', params.name, entry.max],
                el.input));

            it(`Нажатие кнопки "Добавить поле"`, async () => await dec.simple(el.button.handler,
                ['Добавить поле', entry.max],
                el.button));

            it(`Ввод значение в поле 1 в списке полей ввода "Поля"`,
                async () => await dec.simple(el.modal.additionalDataAdd.selectTypeSendKeys,
                    [1, params.value1, entry.max],
                    el.modal.additionalDataAdd));

            it(`Ввод значение в поле 2 в списке полей ввода "Поля"`,
                async () => await dec.simple(el.modal.additionalDataAdd.selectTypeSendKeys,
                    [2, params.value2, entry.max],
                    el.modal.additionalDataAdd));

            it(`Выбор "Значение по умолчанию", равное полю 2`,
                async () => await dec.simple(el.select.iconXpand,
                    ['Значение по умолчанию', 'Заполните поле', params.value2, entry.max],
                    el.select));

            it(`Удаление поле 2 в списке полей ввода "Поля"`,
                async () => await dec.simple(el.modal.additionalDataAdd.selectTypeRemove,
                    [2, entry.max],
                    el.modal.additionalDataAdd));

            it(`Проверка "Значение по умолчанию"`,
                async () => await dec.simpleText(el.select.getText,
                    ['Значение по умолчанию', 'Заполните поле', entry.max],
                    'Заполните поле',
                    el.select));

            it('Нажатие кнопки "Сохранить"', async () => await dec.simple(el.button.handler,
                ['Сохранить', entry.max],
                el.button));

            it('Отображение сообщения "Дополнительное поле успешно добавлено"',
                async () => await dec.simple(el.success.success,
                    ['Дополнительное поле успешно добавлено', entry.max],
                    el.success));

            it('Отсутствие модального окна "Добавить дополнительное поле"',
                async () => await dec.simple(el.modal.additionalDataAdd.initClose,
                    [entry.max],
                    el.modal.additionalDataAdd));
        });

        describe('Проверка таблицы', () => {
            type.bef();

            aft();

            it(`Отображение ${type.count + 1} записей в таблице`, async () => await dec.simple(el.table.size,
                [type.count + 1, entry.max],
                el.table));

            it('Проверка "Название поля"', async () => await dec.simpleText(el.table.cellGetText,
                ['Название поля', 1, 1, entry.max],
                params.name,
                el.table));

            it('Проверка "Тип поля"', async () => await dec.simpleText(el.table.cellGetText,
                ['Тип поля', 1, 2, entry.max],
                'Выпадающий список',
                el.table));


            it('Проверка "Описание"', async () => await dec.simpleText(el.table.cellGetText,
                ['Описание', 1, 3, entry.max],
                '',
                el.table));

            it('Проверка "Значение по умолчанию"', async () => await dec.simpleText(el.table.cellGetText,
                ['Значение по умолчанию', 1, 4, entry.max],
                '',
                el.table));
        });

        describe('Проверка параметров', () => {
            type.bef();

            aft();

            it(`Нажатие по первой строке в таблице`, async () => await dec.simple(el.table.strHandler,
                [1, entry.max],
                el.table));

            it('Нажатие кнопки "Редактировать"', async () => await dec.simple(el.butIcBefore.handler,
                [but.edit, entry.max],
                el.butIcBefore));

            it('Отображене модального окна "Редактировать дополнительное поле"',
                async () => await dec.simple(el.modal.additionalDataEdit.init,
                    [entry.max],
                    el.modal.additionalDataEdit));

            it('Проверка "Название поля"', async () => await dec.simpleText(el.input.getValue,
                ['Название поля', '', entry.max],
                params.name,
                el.input));

            it('Проверка "Тип поля"', async () => await dec.simpleText(el.select.getText,
                ['Тип поля', 'Выпадающий список', entry.max],
                'Выпадающий список',
                el.input));

            it(`Проверка поле 1 в списке полей ввода "Поля"`,
                async () => await dec.simpleText(el.modal.additionalDataAdd.selectTypeGetValue,
                    [1, entry.max],
                    params.value1,
                    el.modal.additionalDataAdd));

            it(`Отсутствие поля 2 в списке полей ввода "Поля"`,
                async () => await dec.simple(el.modal.additionalDataAdd.noSelectTypeNum,
                    [2, entry.max],
                    el.modal.additionalDataAdd));

            it('Проверка "Значение по умолчанию"', async () => await dec.simpleText(el.select.getText,
                ['Значение по умолчанию', 'Заполните поле', entry.max],
                'Заполните поле',
                el.input));

            it('Нажатие кнопки закрытия модального окна',
                async () => await dec.simple(el.modal.additionalDataEdit.closeHandler,
                    [entry.max],
                    el.modal.additionalDataEdit));

            it('Отсутствие модального окна "Добавить дополнительное поле"',
                async () => await dec.simple(el.modal.additionalDataEdit.initClose,
                    [entry.max],
                    el.modal.additionalDataEdit));
        });

        describe('Удаление тестовых данных', () => {
            type.bef();
            aft();
            dataRemove(type);
        });

    });

    // Тип поля "Выпадающий список". Попытка создания без заполненного поля с минимальным количеством параметров.
    const typeSelectNoValueBoxMinParams = () => describe(`Дополнительные данные. Тип поля: "Выпадающий список". 
    ${type.person}. Добавление. Попытка добавления без заполненного поля в списке полей ввода "Поля". 
    Минимальное количество параметров.`,
        () => {

        const params = {
            name: 'typeSelectNoValueBoxMinParamsName'
        };

        describe('Добавление', () => {
            type.bef();

            aft();

            it(`Отображение ${type.count} записей в таблице`, async () => await dec.simple(el.table.size,
                [type.count, entry.max],
                el.table,));

            it('Нажатие кнопки "Добавить"', async () => await dec.simple(el.butIcBefore.handler,
                [but.add, entry.max],
                el.butIcBefore));

            it('Отображене модального окна "Добавить дополнительное поле"',
                async () => await dec.simple(el.modal.additionalDataAdd.init,
                    [entry.max],
                    el.modal.additionalDataAdd));

            it('Выбор "Выпадающий список" в "Тип поля"', async () => await dec.simple(el.select.iconXpand,
                ['Тип поля', 'Текстовый', 'Выпадающий список', entry.max],
                el.select));

            it('Ввод "Название поля"', async () => await dec.simple(el.input.sendKeys,
                ['Название поля', '', params.name, entry.max],
                el.input));

            it(`Отображение поле 1 в списке полей ввода "Поля"`,
                async () => await dec.simple(el.modal.additionalDataAdd.selectType,
                    [1, entry.max],
                    el.modal.additionalDataAdd));

            it('Кнопка "Сохранить" - не активна', async () => await dec.simple(el.button.disabled,
                ['Сохранить', entry.max],
                el.button));

            it('Нажатие кнопки "Сохранить"', async () => await dec.simpleFalse(el.button.handlerNoActive,
                ['Сохранить', entry.max],
                el.button));

            it('Модальное окно "Добавить дополнительное поле" не закрыто',
                async () => await dec.simpleFalse(el.modal.additionalDataAdd.initClose,
                    [entry.min],
                    el.modal.additionalDataAdd));

            it('Нажатие кнопки закрытия модального окна',
                async () => await dec.simple(el.modal.additionalDataEdit.closeHandler,
                    [entry.max],
                    el.modal.additionalDataEdit));

            it('Отсутствие модального окна "Добавить дополнительное поле"',
                async () => await dec.simple(el.modal.additionalDataEdit.initClose,
                    [entry.max],
                    el.modal.additionalDataEdit));
        });

        describe('Проверка таблицы', () => {
            type.bef();

            aft();

            it(`Отображение ${type.count} записей в таблице`, async () => await dec.simple(el.table.size,
                [type.count, entry.max],
                el.table));
        });

    });

    // Тип поля "Выпадающий список". Попытка создания без заполненного поля с минимальным количеством параметров.
    const typeSelectNoValueBoxMaxParams = () => describe(`Дополнительные данные. Тип поля: "Выпадающий список". 
    ${type.person}. Добавление. Попытка добавления без заполненного поля в списке полей ввода "Поля". 
    Максимальное количество параметров.`,
        () => {

        const params = {
            name: 'typeSelectNoValueBoxMaxParamsName',
            description: 'typeSelectNoValueBoxMaxParamsDescription',
            valueName: 'typeSelectNoValueBoxMaxParamsValue',
            defaultValue: 'typeSelectNoValueBoxMaxParamsValue2'
        };

        describe('Добавление', () => {

            type.bef();

            aft();

            it(`Отображение ${type.count} записей в таблице`, async () => await dec.simple(el.table.size,
                [type.count, entry.max],
                el.table,));

            it('Нажатие кнопки "Добавить"', async () => await dec.simple(el.butIcBefore.handler,
                [but.add, entry.max],
                el.butIcBefore));

            it('Отображене модального окна "Добавить дополнительное поле"',
                async () => await dec.simple(el.modal.additionalDataAdd.init,
                    [entry.max],
                    el.modal.additionalDataAdd));

            it('Выбор "Выпадающий список" в "Тип поля"', async () => await dec.simple(el.select.iconXpand,
                ['Тип поля', 'Текстовый', 'Выпадающий список', entry.max],
                el.select));

            it('Ввод "Название поля"', async () => await dec.simple(el.input.sendKeys,
                ['Название поля', '', params.name, entry.max],
                el.input));

            it('Ввод "Описание"', async () => await dec.simple(el.input.sendKeys,
                ['Описание', '', params.description, entry.max],
                el.input));

            it('Удаление поля 1 в списке полей ввода "Поля"',
                async () => await dec.simple(el.modal.additionalDataAdd.selectTypeRemove,
                    [1, entry.max],
                    el.modal.additionalDataAdd));


            [...Array(8).keys()].forEach(() => {
                return (
                    it(`Нажатие кнопки "Добавить поле"`, async () => await dec.simple(el.button.handler,
                        ['Добавить поле', entry.max],
                        el.button)));
            });

            [...Array(8).keys()].forEach(item => {
                return (
                    it(`Ввод значение в поле ${item + 1} в списке полей ввода "Поля"`,
                        async () => await dec.simple(el.modal.additionalDataAdd.selectTypeSendKeys,
                            [item + 1, params.valueName + (item + 1), entry.max],
                            el.modal.additionalDataAdd)));
            });

            it('Удаление значения в поле 4 в списке полей ввода "Поля"',
                async () => await dec.simple(el.modal.additionalDataAdd.selectTypeBackSpace,
                    [4, entry.max],
                    el.modal.additionalDataAdd));

            it(`Выбор "Значение по умолчанию"`,
                async () => await dec.simple(el.select.iconXpand,
                    ['Значение по умолчанию', 'Заполните поле', params.defaultValue, entry.max],
                    el.select));

            it('Кнопка "Сохранить" - не активна', async () => await dec.simple(el.button.disabled,
                ['Сохранить', entry.max],
                el.button));

            it('Нажатие кнопки "Сохранить"', async () => await dec.simpleFalse(el.button.handlerNoActive,
                ['Сохранить', entry.max],
                el.button));

            it('Модальное окно "Добавить дополнительное поле" не закрыто',
                async () => await dec.simpleFalse(el.modal.additionalDataAdd.initClose,
                    [entry.min],
                    el.modal.additionalDataAdd));

            it('Нажатие кнопки закрытия модального окна',
                async () => await dec.simple(el.modal.additionalDataEdit.closeHandler,
                    [entry.max],
                    el.modal.additionalDataEdit));

            it('Отсутствие модального окна "Добавить дополнительное поле"',
                async () => await dec.simple(el.modal.additionalDataEdit.initClose,
                    [entry.max],
                    el.modal.additionalDataEdit));
        });

        describe('Проверка таблицы', () => {
            type.bef();

            aft();

            it(`Отображение ${type.count} записей в таблице`, async () => await dec.simple(el.table.size,
                [type.count, entry.max],
                el.table));
        });

    });

    // Тип поля "Выпадающий список". Попытка дублирования.
    const typeSelectDuplicate = () => describe(`Дополнительные данные. Тип поля: "Выпадающий список". ${type.person}. 
    Добавление. Попытка дублирования.`, () => {

        const params = {
            name: 'typeSelectDuplicate',
            error: 'Такое название уже используется'
        };

        describe('API - добавление', () => {
            type.bef();

            aft();

            it('Добавление дополнительных данных', async () => {
                const data = {
                    name: params.name,
                    comment: '',
                    type_id: 1,
                    default_value: '',
                    items: ''
                };
                const cook = await page.base.getCookie('token');
                await dec.simple(api.putAdditionalData,
                    [[data], type.api, cook.text],
                    api.putAdditionalData);
            });
        });

        describe('Добавление', () => {
            type.bef();

            aft();

            it(`Отображение ${type.count + 1} записей в таблице`, async () => await dec.simple(el.table.size,
                [type.count + 1, entry.max],
                el.table,));

            it('Нажатие кнопки "Добавить"', async () => await dec.simple(el.butIcBefore.handler,
                [but.add, entry.max],
                el.butIcBefore));

            it('Отображене модального окна "Добавить дополнительное поле"',
                async () => await dec.simple(el.modal.additionalDataAdd.init,
                    [entry.max],
                    el.modal.additionalDataAdd));

            it('Выбор "Выпадающий список" в "Тип поля"', async () => await dec.simple(el.select.iconXpand,
                ['Тип поля', 'Текстовый', 'Выпадающий список', entry.max],
                el.select));

            it('Ввод "Название поля"', async () => await dec.simple(el.input.sendKeys,
                ['Название поля', '', params.name, entry.max],
                el.input));

            it('Удаление поля 1 в списке полей ввода "Поля"',
                async () => await dec.simple(el.modal.additionalDataAdd.selectTypeRemove,
                    [1, entry.max],
                    el.modal.additionalDataAdd));

            it('Отсутствие полей в списке полей ввода "Поля"',
                async () => await dec.simple(el.modal.additionalDataAdd.noSelectType,
                    [entry.max],
                    el.modal.additionalDataAdd));

            it('Нажатие кнопки "Сохранить"', async () => await dec.simple(el.button.handler,
                ['Сохранить', entry.max],
                el.button));

            it('Отображение ошибки',
                async () => await dec.simple(el.error.error,
                    [params.error, entry.max],
                    el.error));

            it('Нажатие кнопки закрытия модального окна',
                async () => await dec.simple(el.modal.additionalDataEdit.closeHandler,
                    [entry.max],
                    el.modal.additionalDataEdit));

            it('Отсутствие модального окна "Добавить дополнительное поле"',
                async () => await dec.simple(el.modal.additionalDataAdd.initClose,
                    [entry.max],
                    el.modal.additionalDataAdd));
        });

        describe('Проверка таблицы', () => {
            type.bef();

            aft();

            it(`Отображение ${type.count + 1} записей в таблице`, async () => await dec.simple(el.table.size,
                [type.count + 1, entry.max],
                el.table));

            it('Проверка "Название поля"', async () => await dec.simpleText(el.table.cellGetText,
                ['Название поля', 1, 1, entry.max],
                params.name,
                el.table));

            it('Проверка "Тип поля"', async () => await dec.simpleText(el.table.cellGetText,
                ['Тип поля', 1, 2, entry.max],
                'Текстовый',
                el.table));

            it('Проверка "Описание"', async () => await dec.simpleText(el.table.cellGetText,
                ['Описание', 1, 3, entry.max],
                '',
                el.table));

            it('Проверка "Значение по умолчанию"', async () => await dec.simpleText(el.table.cellGetText,
                ['Значение по умолчанию', 1, 4, entry.max],
                '',
                el.table));
        });

        describe('Удаление тестовых данных', () => {
            type.bef();
            aft();
            dataRemove(type);
        });

    });

    // Тип поля «Выпадающий список». Проверки редактирования.
    const typeSelect = () => describe(`Дополнительные данные. Тип поля "Выпадающий список". ${type.person}. 
    Проверки добавления.`, () => {
        typeSelectMinParams();
        typeSelectMaxParams();
        typeSelectNoName();
        typeSelectDeleteBox();
        typeSelectNoValueBoxMinParams();
        typeSelectNoValueBoxMaxParams();
        typeSelectDuplicate();
    });

    // Тип поля "Чекбокс".
    // Тип поля "Чекбокс". Минимальное количество параметров.
    const typeCheckboxMinParams = () => describe(`Дополнительные данные. Тип поля: "Чекбокс". ${type.person}. 
    Добавление. Минимальное количество параметров.`, () => {
        const params = {
            name: 'typeTextMinParamsName',
            value: 'Да'
        };

        describe('Добавление', () => {
            type.bef();

            aft();

            it(`Отображение ${type.count} записей в таблице`, async () => await dec.simple(el.table.size,
                [type.count, entry.max],
                el.table,));

            it('Нажатие кнопки "Добавить"', async () => await dec.simple(el.butIcBefore.handler,
                [but.add, entry.max],
                el.butIcBefore));

            it('Отображене модального окна "Добавить дополнительное поле"',
                async () => await dec.simple(el.modal.additionalDataAdd.init,
                    [entry.max],
                    el.modal.additionalDataAdd));

            it('Выбор "Чекбокс" в "Тип поля"', async () => await dec.simple(el.select.iconXpand,
                ['Тип поля', 'Текстовый', 'Чекбокс', entry.max],
                el.select));

            it('Ввод "Название поля"', async () => await dec.simple(el.input.sendKeys,
                ['Название поля', '', params.name, entry.max],
                el.input));

            it('Выбор "Значение по умолчанию"', async () => await dec.simple(el.select.iconXpand,
                ['Значение по умолчанию', 'Да', 'Да', entry.max],
                el.select));

            it('Нажатие кнопки "Сохранить"', async () => await dec.simple(el.button.handler,
                ['Сохранить', entry.max],
                el.button));

            it('Отображение сообщения "Дополнительное поле успешно добавлено"',
                async () => await dec.simple(el.success.success,
                    ['Дополнительное поле успешно добавлено', entry.max],
                    el.success));

            it('Отсутствие модального окна "Добавить дополнительное поле"',
                async () => await dec.simple(el.modal.additionalDataAdd.initClose,
                    [entry.max],
                    el.modal.additionalDataAdd));
        });

        describe('Проверка таблицы', () => {
            type.bef();

            aft();

            it(`Отображение ${type.count + 1} записей в таблице`, async () => await dec.simple(el.table.size,
                [type.count + 1, entry.max],
                el.table));

            it('Проверка "Название поля"', async () => await dec.simpleText(el.table.cellGetText,
                ['Название поля', 1, 1, entry.max],
                params.name,
                el.table));

            it('Проверка "Тип поля"', async () => await dec.simpleText(el.table.cellGetText,
                ['Тип поля', 1, 2, entry.max],
                'Чекбокс',
                el.table));

            it('Проверка "Описание"', async () => await dec.simpleText(el.table.cellGetText,
                ['Описание', 1, 3, entry.max],
                '',
                el.table));

            it('Проверка "Значение по умолчанию"', async () => await dec.simpleText(el.table.cellGetText,
                ['Значение по умолчанию', 1, 4, entry.max],
                params.value,
                el.table));
        });

        describe('Проверка параметров', () => {
            type.bef();

            aft();

            it(`Нажатие по первой строке в таблице`, async () => await dec.simple(el.table.strHandler,
                [1, entry.max],
                el.table));

            it('Нажатие кнопки "Редактировать"', async () => await dec.simple(el.butIcBefore.handler,
                [but.edit, entry.max],
                el.butIcBefore));

            it('Отображене модального окна "Редактировать дополнительное поле"',
                async () => await dec.simple(el.modal.additionalDataEdit.init,
                    [entry.max],
                    el.modal.additionalDataEdit));

            it('Проверка "Название поля"', async () => await dec.simpleText(el.input.getValue,
                ['Название поля', '', entry.max],
                params.name,
                el.input));

            it('Проверка "Описание"', async () => await dec.simpleText(el.input.getValue,
                ['Описание', '', entry.max],
                '',
                el.input));

            it('Проверка "Тип поля"', async () => await dec.simpleText(el.select.getText,
                ['Тип поля', 'Чекбокс', entry.max],
                'Чекбокс',
                el.input));

            it('Проверка "Значение по умолчанию"', async () => await dec.simpleText(el.select.getText,
                ['Значение по умолчанию', params.value, entry.max],
                params.value,
                el.input));

            it('Нажатие кнопки закрытия модального окна',
                async () => await dec.simple(el.modal.additionalDataEdit.closeHandler,
                    [entry.max],
                    el.modal.additionalDataEdit));

            it('Отсутствие модального окна "Добавить дополнительное поле"',
                async () => await dec.simple(el.modal.additionalDataEdit.initClose,
                    [entry.max],
                    el.modal.additionalDataEdit));
        });

        describe('Удаление тестовых данных', () => {
            type.bef();
            aft();
            dataRemove(type);
        });
    });

    // Тип поля "Чекбокс". Максиимальное количество параметров.
    const typeCheckboxMaxParams = () => describe(`Дополнительные данные. Тип поля: "Чекбокс". ${type.person}. 
    Добавление. Максимальное количество параметров.`, () => {
        const params = {
            name: 'typeCheckboxMaxParamsName',
            description: 'typeCheckboxMaxParamsDescription',
            value: 'Нет'
        };

        describe('Добавление', () => {
            type.bef();

            aft();

            it(`Отображение ${type.count} записей в таблице`, async () => await dec.simple(el.table.size,
                [type.count, entry.max],
                el.table,));

            it('Нажатие кнопки "Добавить"', async () => await dec.simple(el.butIcBefore.handler,
                [but.add, entry.max],
                el.butIcBefore));

            it('Отображене модального окна "Добавить дополнительное поле"',
                async () => await dec.simple(el.modal.additionalDataAdd.init,
                    [entry.max],
                    el.modal.additionalDataAdd));

            it('Выбор "Чекбокс" в "Тип поля"', async () => await dec.simple(el.select.iconXpand,
                ['Тип поля', 'Текстовый', 'Чекбокс', entry.max],
                el.select));

            it('Ввод "Название поля"', async () => await dec.simple(el.input.sendKeys,
                ['Название поля', '', params.name, entry.max],
                el.input));

            it('Ввод "Описание"', async () => await dec.simple(el.input.sendKeys,
                ['Описание', '', params.description, entry.max],
                el.input));

            it('Выбор "Значение по умолчанию"', async () => await dec.simple(el.select.iconXpand,
                ['Значение по умолчанию', 'Да', 'Нет', entry.max],
                el.select));

            it('Нажатие кнопки "Сохранить"', async () => await dec.simple(el.button.handler,
                ['Сохранить', entry.max],
                el.button));

            it('Отображение сообщения "Дополнительное поле успешно добавлено"',
                async () => await dec.simple(el.success.success,
                    ['Дополнительное поле успешно добавлено', entry.max],
                    el.success));

            it('Отсутствие модального окна "Добавить дополнительное поле"',
                async () => await dec.simple(el.modal.additionalDataAdd.initClose,
                    [entry.max],
                    el.modal.additionalDataAdd));
        });

        describe('Проверка таблицы', () => {
            type.bef();

            aft();

            it(`Отображение ${type.count + 1} записей в таблице`, async () => await dec.simple(el.table.size,
                [type.count + 1, entry.max],
                el.table));

            it('Проверка "Название поля"', async () => await dec.simpleText(el.table.cellGetText,
                ['Название поля', 1, 1, entry.max],
                params.name,
                el.table));

            it('Проверка "Тип поля"', async () => await dec.simpleText(el.table.cellGetText,
                ['Тип поля', 1, 2, entry.max],
                'Чекбокс',
                el.table));

            it('Проверка "Описание"', async () => await dec.simpleText(el.table.cellGetText,
                ['Описание', 1, 3, entry.max],
                params.description,
                el.table));

            it('Проверка "Значение по умолчанию"', async () => await dec.simpleText(el.table.cellGetText,
                ['Значение по умолчанию', 1, 4, entry.max],
                params.value,
                el.table));
        });

        describe('Проверка параметров', () => {
            type.bef();

            aft();

            it(`Нажатие по первой строке в таблице`, async () => await dec.simple(el.table.strHandler,
                [1, entry.max],
                el.table));

            it('Нажатие кнопки "Редактировать"', async () => await dec.simple(el.butIcBefore.handler,
                [but.edit, entry.max],
                el.butIcBefore));

            it('Отображене модального окна "Редактировать дополнительное поле"',
                async () => await dec.simple(el.modal.additionalDataEdit.init,
                    [entry.max],
                    el.modal.additionalDataEdit));

            it('Проверка "Название поля"', async () => await dec.simpleText(el.input.getValue,
                ['Название поля', '', entry.max],
                params.name,
                el.input));

            it('Проверка "Описание"', async () => await dec.simpleText(el.input.getValue,
                ['Описание', '', entry.max],
                params.description,
                el.input));

            it('Проверка "Тип поля"', async () => await dec.simpleText(el.select.getText,
                ['Тип поля', 'Чекбокс', entry.max],
                'Чекбокс',
                el.input));

            it('Проверка "Значение по умолчанию"', async () => await dec.simpleText(el.select.getText,
                ['Значение по умолчанию', params.value, entry.max],
                params.value,
                el.input));

            it('Нажатие кнопки закрытия модального окна',
                async () => await dec.simple(el.modal.additionalDataEdit.closeHandler,
                    [entry.max],
                    el.modal.additionalDataEdit));

            it('Отсутствие модального окна "Добавить дополнительное поле"',
                async () => await dec.simple(el.modal.additionalDataEdit.initClose,
                    [entry.max],
                    el.modal.additionalDataEdit));
        });

        describe('Удаление тестовых данных', () => {
            type.bef();
            aft();
            dataRemove(type);
        });
    });

    // Тип поля "Чекбокс". Попытка добавления без «Название поля».
    const typeCheckboxNoName = () => describe(`Дополнительные данные. Тип поля: "Чекбокс". ${type.person}. 
    Добавление. Попытка добавления без "Название поля".`, () => {
        const params = {
            description: 'typeCheckboxNoNameDescription',
            value: 'Нет'
        };

        describe('Добавление', () => {
            type.bef();

            aft();

            it(`Отображение ${type.count} записей в таблице`, async () => await dec.simple(el.table.size,
                [type.count, entry.max],
                el.table,));

            it('Нажатие кнопки "Добавить"', async () => await dec.simple(el.butIcBefore.handler,
                [but.add, entry.max],
                el.butIcBefore));

            it('Отображене модального окна "Добавить дополнительное поле"',
                async () => await dec.simple(el.modal.additionalDataAdd.init,
                    [entry.max],
                    el.modal.additionalDataAdd));

            it('Выбор "Чекбокс" в "Тип поля"', async () => await dec.simple(el.select.iconXpand,
                ['Тип поля', 'Текстовый', 'Чекбокс', entry.max],
                el.select));

            it('Ввод "Описание"', async () => await dec.simple(el.input.sendKeys,
                ['Описание', '', params.description, entry.max],
                el.input));

            it('Выбор "Значение по умолчанию"', async () => await dec.simple(el.select.iconXpand,
                ['Значение по умолчанию', 'Да', 'Нет', entry.max],
                el.select));

            it('Кнопка "Сохранить" - не активна', async () => await dec.simple(el.button.disabled,
                ['Сохранить', entry.max],
                el.button));

            it('Нажатие кнопки "Сохранить"', async () => await dec.simpleFalse(el.button.handlerNoActive,
                ['Сохранить', entry.max],
                el.button));

            it('Модальное окно "Добавить дополнительное поле" не закрыто',
                async () => await dec.simpleFalse(el.modal.additionalDataAdd.initClose,
                    [entry.min],
                    el.modal.additionalDataAdd));

            it('Нажатие кнопки закрытия модального окна',
                async () => await dec.simple(el.modal.additionalDataEdit.closeHandler,
                    [entry.max],
                    el.modal.additionalDataEdit));

            it('Отсутствие модального окна "Добавить дополнительное поле"',
                async () => await dec.simple(el.modal.additionalDataEdit.initClose,
                    [entry.max],
                    el.modal.additionalDataEdit));
        });

        describe('Проверка таблицы', () => {
            type.bef();

            aft();

            it(`Отображение ${type.count} записей в таблице`, async () => await dec.simple(el.table.size,
                [type.count, entry.max],
                el.table));
        });

    });

    // Тип поля "Чекбокс". Попытка дублирования.
    const typeCheckboxDuplicate = () => describe(`Дополнительные данные. Тип поля: "Чекбокс". ${type.person}. 
    Добавление. Попытка дублирования.`, () => {
        const params = {
            name: 'typeCheckboxDuplicateName',
            value: 'Да',
            error: 'Такое название уже используется'
        };

        describe('API - добавление', () => {
            type.bef();

            aft();

            it('Добавление дополнительных данных', async () => {
                const data = {
                    name: params.name,
                    comment: '',
                    type_id: 1,
                    default_value: '',
                    items: ''
                };
                const cook = await page.base.getCookie('token');
                await dec.simple(api.putAdditionalData,
                    [[data], type.api, cook.text],
                    api.putAdditionalData);
            });
        });

        describe('Добавление', () => {
            type.bef();

            aft();

            it(`Отображение ${type.count + 1} записей в таблице`, async () => await dec.simple(el.table.size,
                [type.count + 1, entry.max],
                el.table,));

            it('Нажатие кнопки "Добавить"', async () => await dec.simple(el.butIcBefore.handler,
                [but.add, entry.max],
                el.butIcBefore));

            it('Отображене модального окна "Добавить дополнительное поле"',
                async () => await dec.simple(el.modal.additionalDataAdd.init,
                    [entry.max],
                    el.modal.additionalDataAdd));

            it('Выбор "Чекбокс" в "Тип поля"', async () => await dec.simple(el.select.iconXpand,
                ['Тип поля', 'Текстовый', 'Чекбокс', entry.max],
                el.select));

            it('Ввод "Название поля"', async () => await dec.simple(el.input.sendKeys,
                ['Название поля', '', params.name, entry.max],
                el.input));

            it('Выбор "Значение по умолчанию"', async () => await dec.simple(el.select.iconXpand,
                ['Значение по умолчанию', 'Да', 'Да', entry.max],
                el.select));

            it('Нажатие кнопки "Сохранить"', async () => await dec.simple(el.button.handler,
                ['Сохранить', entry.max],
                el.button));

            it('Отображение ошибки',
                async () => await dec.simple(el.error.error,
                    [params.error, entry.max],
                    el.error));

            it('Нажатие кнопки закрытия модального окна',
                async () => await dec.simple(el.modal.additionalDataEdit.closeHandler,
                    [entry.max],
                    el.modal.additionalDataEdit));

            it('Отсутствие модального окна "Добавить дополнительное поле"',
                async () => await dec.simple(el.modal.additionalDataAdd.initClose,
                    [entry.max],
                    el.modal.additionalDataAdd));
        });

        describe('Проверка таблицы', () => {
            type.bef();

            aft();

            it(`Отображение ${type.count + 1} записей в таблице`, async () => await dec.simple(el.table.size,
                [type.count + 1, entry.max],
                el.table));

            it('Проверка "Название поля"', async () => await dec.simpleText(el.table.cellGetText,
                ['Название поля', 1, 1, entry.max],
                params.name,
                el.table));

            it('Проверка "Тип поля"', async () => await dec.simpleText(el.table.cellGetText,
                ['Тип поля', 1, 2, entry.max],
                'Текстовый',
                el.table));

            it('Проверка "Описание"', async () => await dec.simpleText(el.table.cellGetText,
                ['Описание', 1, 3, entry.max],
                '',
                el.table));

            it('Проверка "Значение по умолчанию"', async () => await dec.simpleText(el.table.cellGetText,
                ['Значение по умолчанию', 1, 4, entry.max],
                '',
                el.table));
        });

        describe('Удаление тестовых данных', () => {
            type.bef();
            aft();
            dataRemove(type);
        });
    });

    // Тип поля «Чекбокс». Проверки редактирования.
    const typeCheckbox = () => describe(`Дополнительные данные. Тип поля "Чекбокс". ${type.person}. 
    Проверки добавления.`, () => {
        typeCheckboxMinParams();
        typeCheckboxMaxParams();
        typeCheckboxNoName();
        typeCheckboxDuplicate();
    });

    // Тип поля "Дата".
    // Тип поля "Дата". Минимальное количество параметров.
    const typeDateMinParams = () => describe(`Дополнительные данные. Тип поля: "Дата". ${type.person}. Добавление. 
    Минимальное количество параметров.`, () => {

        const params = {
            name: 'typeDataMinParamsName',
        };

        describe('Добавление', () => {
            type.bef();

            aft();

            it(`Отображение ${type.count} записей в таблице`, async () => await dec.simple(el.table.size,
                [type.count, entry.max],
                el.table,));

            it('Нажатие кнопки "Добавить"', async () => await dec.simple(el.butIcBefore.handler,
                [but.add, entry.max],
                el.butIcBefore));

            it('Отображене модального окна "Добавить дополнительное поле"',
                async () => await dec.simple(el.modal.additionalDataAdd.init,
                    [entry.max],
                    el.modal.additionalDataAdd));

            it('Выбор "Дата" в "Тип поля"', async () => await dec.simple(el.select.iconXpand,
                ['Тип поля', 'Текстовый', 'Дата', entry.max],
                el.select));

            it('Ввод "Название поля"', async () => await dec.simple(el.input.sendKeys,
                ['Название поля', '', params.name, entry.max],
                el.input));

            it('Нажатие кнопки "Сохранить"', async () => await dec.simple(el.button.handler,
                ['Сохранить', entry.max],
                el.button));

            it('Отображение сообщения "Дополнительное поле успешно добавлено"',
                async () => await dec.simple(el.success.success,
                    ['Дополнительное поле успешно добавлено', entry.max],
                    el.success));

            it('Отсутствие модального окна "Добавить дополнительное поле"',
                async () => await dec.simple(el.modal.additionalDataAdd.initClose,
                    [entry.max],
                    el.modal.additionalDataAdd));
        });

        describe('Проверка таблицы', () => {
            type.bef();

            aft();

            it(`Отображение ${type.count + 1} записей в таблице`, async () => await dec.simple(el.table.size,
                [type.count + 1, entry.max],
                el.table));

            it('Проверка "Название поля"', async () => await dec.simpleText(el.table.cellGetText,
                ['Название поля', 1, 1, entry.max],
                params.name,
                el.table));

            it('Проверка "Тип поля"', async () => await dec.simpleText(el.table.cellGetText,
                ['Тип поля', 1, 2, entry.max],
                'Дата',
                el.table));

            it('Проверка "Описание"', async () => await dec.simpleText(el.table.cellGetText,
                ['Описание', 1, 3, entry.max],
                '',
                el.table));

            it('Проверка "Значение по умолчанию"', async () => await dec.simpleText(el.table.cellGetText,
                ['Значение по умолчанию', 1, 4, entry.max],
                '',
                el.table));
        });

        describe('Проверка параметров', () => {
            type.bef();

            aft();

            it(`Нажатие по первой строке в таблице`, async () => await dec.simple(el.table.strHandler,
                [1, entry.max],
                el.table));

            it('Нажатие кнопки "Редактировать"', async () => await dec.simple(el.butIcBefore.handler,
                [but.edit, entry.max],
                el.butIcBefore));

            it('Отображене модального окна "Редактировать дополнительное поле"',
                async () => await dec.simple(el.modal.additionalDataEdit.init,
                    [entry.max],
                    el.modal.additionalDataEdit));

            it('Проверка "Название поля"', async () => await dec.simpleText(el.input.getValue,
                ['Название поля', '', entry.max],
                params.name,
                el.input));

            it('Проверка "Описание"', async () => await dec.simpleText(el.input.getValue,
                ['Описание', '', entry.max],
                '',
                el.input));

            it('Проверка "Тип поля"', async () => await dec.simpleText(el.select.getText,
                ['Тип поля', 'Дата', entry.max],
                'Дата',
                el.input));

            it('Нажатие кнопки закрытия модального окна',
                async () => await dec.simple(el.modal.additionalDataEdit.closeHandler,
                    [entry.max],
                    el.modal.additionalDataEdit));

            it('Отсутствие модального окна "Добавить дополнительное поле"',
                async () => await dec.simple(el.modal.additionalDataEdit.initClose,
                    [entry.max],
                    el.modal.additionalDataEdit));
        });

        describe('Удаление тестовых данных', () => {
            type.bef();
            aft();
            dataRemove(type);
        });

    });

    // Тип поля "Дата". Максиимальное количество параметров.
    const typeDateMaxParams = () => describe(`Дополнительные данные. Тип поля: "Дата". ${type.person}. Добавление. 
    Максиимальное количество параметров.`, () => {

        const params = {
            name: 'typeDateMaxParamsName',
            description: 'typeDateMaxParamsDescription'
        };

        describe('Добавление', () => {
            type.bef();

            aft();

            it(`Отображение ${type.count} записей в таблице`, async () => await dec.simple(el.table.size,
                [type.count, entry.max],
                el.table,));

            it('Нажатие кнопки "Добавить"', async () => await dec.simple(el.butIcBefore.handler,
                [but.add, entry.max],
                el.butIcBefore));

            it('Отображене модального окна "Добавить дополнительное поле"',
                async () => await dec.simple(el.modal.additionalDataAdd.init,
                    [entry.max],
                    el.modal.additionalDataAdd));

            it('Выбор "Дата" в "Тип поля"', async () => await dec.simple(el.select.iconXpand,
                ['Тип поля', 'Текстовый', 'Дата', entry.max],
                el.select));

            it('Ввод "Название поля"', async () => await dec.simple(el.input.sendKeys,
                ['Название поля', '', params.name, entry.max],
                el.input));

            it('Ввод "Описание"', async () => await dec.simple(el.input.sendKeys,
                ['Описание', '', params.description, entry.max],
                el.input));

            it('Нажатие кнопки "Сохранить"', async () => await dec.simple(el.button.handler,
                ['Сохранить', entry.max],
                el.button));

            it('Отображение сообщения "Дополнительное поле успешно добавлено"',
                async () => await dec.simple(el.success.success,
                    ['Дополнительное поле успешно добавлено', entry.max],
                    el.success));

            it('Отсутствие модального окна "Добавить дополнительное поле"',
                async () => await dec.simple(el.modal.additionalDataAdd.initClose,
                    [entry.max],
                    el.modal.additionalDataAdd));
        });

        describe('Проверка таблицы', () => {
            type.bef();

            aft();

            it(`Отображение ${type.count + 1} записей в таблице`, async () => await dec.simple(el.table.size,
                [type.count + 1, entry.max],
                el.table));

            it('Проверка "Название поля"', async () => await dec.simpleText(el.table.cellGetText,
                ['Название поля', 1, 1, entry.max],
                params.name,
                el.table));

            it('Проверка "Тип поля"', async () => await dec.simpleText(el.table.cellGetText,
                ['Тип поля', 1, 2, entry.max],
                'Дата',
                el.table));

            it('Проверка "Описание"', async () => await dec.simpleText(el.table.cellGetText,
                ['Описание', 1, 3, entry.max],
                params.description,
                el.table));

            it('Проверка "Значение по умолчанию"', async () => await dec.simpleText(el.table.cellGetText,
                ['Значение по умолчанию', 1, 4, entry.max],
                '',
                el.table));
        });

        describe('Проверка параметров', () => {
            type.bef();

            aft();

            it(`Нажатие по первой строке в таблице`, async () => await dec.simple(el.table.strHandler,
                [1, entry.max],
                el.table));

            it('Нажатие кнопки "Редактировать"', async () => await dec.simple(el.butIcBefore.handler,
                [but.edit, entry.max],
                el.butIcBefore));

            it('Отображене модального окна "Редактировать дополнительное поле"',
                async () => await dec.simple(el.modal.additionalDataEdit.init,
                    [entry.max],
                    el.modal.additionalDataEdit));

            it('Проверка "Название поля"', async () => await dec.simpleText(el.input.getValue,
                ['Название поля', '', entry.max],
                params.name,
                el.input));

            it('Проверка "Описание"', async () => await dec.simpleText(el.input.getValue,
                ['Описание', '', entry.max],
                params.description,
                el.input));

            it('Проверка "Тип поля"', async () => await dec.simpleText(el.select.getText,
                ['Тип поля', 'Дата', entry.max],
                'Дата',
                el.input));

            it('Нажатие кнопки закрытия модального окна',
                async () => await dec.simple(el.modal.additionalDataEdit.closeHandler,
                    [entry.max],
                    el.modal.additionalDataEdit));

            it('Отсутствие модального окна "Добавить дополнительное поле"',
                async () => await dec.simple(el.modal.additionalDataEdit.initClose,
                    [entry.max],
                    el.modal.additionalDataEdit));
        });

        describe('Удаление тестовых данных', () => {
            type.bef();
            aft();
            dataRemove(type);
        });
    });

    // Тип поля "Дата". Попытка добавления без «Название поля».
    const typeDateNoName = () => describe(`Дополнительные данные. Тип поля: "Дата". ${type.person}. Добавление. 
    Попытка добавления без "Название поля".`, () => {

        const params = {
            description: 'typeDateNoName'
        };

        describe('Проверка таблицы', () => {
            type.bef();

            aft();

            it(`Отображение ${type.count} записей в таблице`, async () => await dec.simple(el.table.size,
                [type.count, entry.max],
                el.table));
        });

        describe('Добавление', () => {
            type.bef();

            aft();

            it(`Отображение ${type.count} записей в таблице`, async () => await dec.simple(el.table.size,
                [type.count, entry.max],
                el.table,));

            it('Нажатие кнопки "Добавить"', async () => await dec.simple(el.butIcBefore.handler,
                [but.add, entry.max],
                el.butIcBefore));

            it('Отображене модального окна "Добавить дополнительное поле"',
                async () => await dec.simple(el.modal.additionalDataAdd.init,
                    [entry.max],
                    el.modal.additionalDataAdd));

            it('Выбор "Дата" в "Тип поля"', async () => await dec.simple(el.select.iconXpand,
                ['Тип поля', 'Текстовый', 'Дата', entry.max],
                el.select));

            it('Ввод "Описание"', async () => await dec.simple(el.input.sendKeys,
                ['Описание', '', params.description, entry.max],
                el.input));

            it('Кнопка "Сохранить" - не активна', async () => await dec.simple(el.button.disabled,
                ['Сохранить', entry.max],
                el.button));

            it('Нажатие кнопки "Сохранить"', async () => await dec.simpleFalse(el.button.handlerNoActive,
                ['Сохранить', entry.max],
                el.button));

            it('Модальное окно "Добавить дополнительное поле" не закрыто',
                async () => await dec.simpleFalse(el.modal.additionalDataAdd.initClose,
                    [entry.min],
                    el.modal.additionalDataAdd));

            it('Нажатие кнопки закрытия модального окна',
                async () => await dec.simple(el.modal.additionalDataEdit.closeHandler,
                    [entry.max],
                    el.modal.additionalDataEdit));

            it('Отсутствие модального окна "Добавить дополнительное поле"',
                async () => await dec.simple(el.modal.additionalDataEdit.initClose,
                    [entry.max],
                    el.modal.additionalDataEdit));


        });

        describe('Проверка таблицы', () => {
            type.bef();

            aft();

            it(`Отображение ${type.count} записей в таблице`, async () => await dec.simple(el.table.size,
                [type.count, entry.max],
                el.table));
        });

    });

    // Тип поля "Дата". Попытка дублирования.
    const typeDateDuplicate = () => describe(`Дополнительные данные. Тип поля: "Дата". ${type.person}. Добавление.
    Попытка дублирования.`, () => {

        const params = {
            name: 'typeDateDuplicate',
            error: 'Такое название уже используется'
        };

        describe('API - добавление', () => {
            type.bef();

            aft();

            it('Добавление дополнительных данных', async () => {
                const data = {
                    name: params.name,
                    comment: '',
                    type_id: 2,
                    default_value: '',
                    items: ''
                };
                const cook = await page.base.getCookie('token');
                await dec.simple(api.putAdditionalData,
                    [[data], type.api, cook.text],
                    api.putAdditionalData);
            });
        });

        describe('Добавление', () => {
            type.bef();

            aft();

            it(`Отображение ${type.count + 1} записей в таблице`, async () => await dec.simple(el.table.size,
                [type.count + 1, entry.max],
                el.table,));

            it('Нажатие кнопки "Добавить"', async () => await dec.simple(el.butIcBefore.handler,
                [but.add, entry.max],
                el.butIcBefore));

            it('Отображене модального окна "Добавить дополнительное поле"',
                async () => await dec.simple(el.modal.additionalDataAdd.init,
                    [entry.max],
                    el.modal.additionalDataAdd));

            it('Выбор "Дата" в "Тип поля"', async () => await dec.simple(el.select.iconXpand,
                ['Тип поля', 'Текстовый', 'Дата', entry.max],
                el.select));

            it('Ввод "Название поля"', async () => await dec.simple(el.input.sendKeys,
                ['Название поля', '', params.name, entry.max],
                el.input));

            it('Нажатие кнопки "Сохранить"', async () => await dec.simple(el.button.handler,
                ['Сохранить', entry.max],
                el.button));

            it('Отображение ошибки',
                async () => await dec.simple(el.error.error,
                    [params.error, entry.max],
                    el.error));

            it('Нажатие кнопки закрытия модального окна',
                async () => await dec.simple(el.modal.additionalDataEdit.closeHandler,
                    [entry.max],
                    el.modal.additionalDataEdit));

            it('Отсутствие модального окна "Добавить дополнительное поле"',
                async () => await dec.simple(el.modal.additionalDataAdd.initClose,
                    [entry.max],
                    el.modal.additionalDataAdd));
        });

        describe('Проверка таблицы', () => {
            type.bef();

            aft();

            it(`Отображение ${type.count + 1} записей в таблице`, async () => await dec.simple(el.table.size,
                [type.count + 1, entry.max],
                el.table));

            it('Проверка "Название поля"', async () => await dec.simpleText(el.table.cellGetText,
                ['Название поля', 1, 1, entry.max],
                params.name,
                el.table));

            it('Проверка "Тип поля"', async () => await dec.simpleText(el.table.cellGetText,
                ['Тип поля', 1, 2, entry.max],
                'Графический',
                el.table));

            it('Проверка "Описание"', async () => await dec.simpleText(el.table.cellGetText,
                ['Описание', 1, 3, entry.max],
                '',
                el.table));

            it('Проверка "Значение по умолчанию"', async () => await dec.simpleText(el.table.cellGetText,
                ['Значение по умолчанию', 1, 4, entry.max],
                '',
                el.table));
        });

        describe('Удаление тестовых данных', () => {
            type.bef();
            aft();
            dataRemove(type);
        });
    });

    // Тип поля «Дата». Проверки редактирования.
    const typeDate = () => describe(`Дополнительные данные. Тип поля "Дата". ${type.person}. 
    Проверки добавления.`, () => {
        typeDateMinParams();
        typeDateMaxParams();
        typeDateNoName();
        typeDateDuplicate();
    });

    // Тип поля "Дата и время".
    // Тип поля "Дата и время". Минимальное количество параметров.
    const typeDateTimeMinParams = () => describe(`Дополнительные данные. Тип поля: "Дата и время". ${type.person}. Добавление. 
    Минимальное количество параметров.`, () => {

        const params = {
            name: 'typeDateTimeMinParams',
        };

        describe('Добавление', () => {
            type.bef();

            aft();

            it(`Отображение ${type.count} записей в таблице`, async () => await dec.simple(el.table.size,
                [type.count, entry.max],
                el.table,));

            it('Нажатие кнопки "Добавить"', async () => await dec.simple(el.butIcBefore.handler,
                [but.add, entry.max],
                el.butIcBefore));

            it('Отображене модального окна "Добавить дополнительное поле"',
                async () => await dec.simple(el.modal.additionalDataAdd.init,
                    [entry.max],
                    el.modal.additionalDataAdd));

            it('Выбор "Дата" в "Тип поля"', async () => await dec.simple(el.select.iconXpand,
                ['Тип поля', 'Текстовый', 'Дата и время', entry.max],
                el.select));

            it('Ввод "Название поля"', async () => await dec.simple(el.input.sendKeys,
                ['Название поля', '', params.name, entry.max],
                el.input));

            it('Нажатие кнопки "Сохранить"', async () => await dec.simple(el.button.handler,
                ['Сохранить', entry.max],
                el.button));

            it('Отображение сообщения "Дополнительное поле успешно добавлено"',
                async () => await dec.simple(el.success.success,
                    ['Дополнительное поле успешно добавлено', entry.max],
                    el.success));

            it('Отсутствие модального окна "Добавить дополнительное поле"',
                async () => await dec.simple(el.modal.additionalDataAdd.initClose,
                    [entry.max],
                    el.modal.additionalDataAdd));
        });

        describe('Проверка таблицы', () => {
            type.bef();

            aft();

            it(`Отображение ${type.count + 1} записей в таблице`, async () => await dec.simple(el.table.size,
                [type.count + 1, entry.max],
                el.table));

            it('Проверка "Название поля"', async () => await dec.simpleText(el.table.cellGetText,
                ['Название поля', 1, 1, entry.max],
                params.name,
                el.table));

            it('Проверка "Тип поля"', async () => await dec.simpleText(el.table.cellGetText,
                ['Тип поля', 1, 2, entry.max],
                'Дата и время',
                el.table));

            it('Проверка "Описание"', async () => await dec.simpleText(el.table.cellGetText,
                ['Описание', 1, 3, entry.max],
                '',
                el.table));

            it('Проверка "Значение по умолчанию"', async () => await dec.simpleText(el.table.cellGetText,
                ['Значение по умолчанию', 1, 4, entry.max],
                '',
                el.table));
        });

        describe('Проверка параметров', () => {
            type.bef();

            aft();

            it(`Нажатие по первой строке в таблице`, async () => await dec.simple(el.table.strHandler,
                [1, entry.max],
                el.table));

            it('Нажатие кнопки "Редактировать"', async () => await dec.simple(el.butIcBefore.handler,
                [but.edit, entry.max],
                el.butIcBefore));

            it('Отображене модального окна "Редактировать дополнительное поле"',
                async () => await dec.simple(el.modal.additionalDataEdit.init,
                    [entry.max],
                    el.modal.additionalDataEdit));

            it('Проверка "Название поля"', async () => await dec.simpleText(el.input.getValue,
                ['Название поля', '', entry.max],
                params.name,
                el.input));

            it('Проверка "Описание"', async () => await dec.simpleText(el.input.getValue,
                ['Описание', '', entry.max],
                '',
                el.input));

            it('Проверка "Тип поля"', async () => await dec.simpleText(el.select.getText,
                ['Тип поля', 'Дата и время', entry.max],
                'Дата и время',
                el.input));

            it('Нажатие кнопки закрытия модального окна',
                async () => await dec.simple(el.modal.additionalDataEdit.closeHandler,
                    [entry.max],
                    el.modal.additionalDataEdit));

            it('Отсутствие модального окна "Добавить дополнительное поле"',
                async () => await dec.simple(el.modal.additionalDataEdit.initClose,
                    [entry.max],
                    el.modal.additionalDataEdit));
        });

        describe('Удаление тестовых данных', () => {
            type.bef();
            aft();
            dataRemove(type);
        });

    });

    // Тип поля "Дата и время". Максиимальное количество параметров.
    const typeDateTimeMaxParams = () => describe(`Дополнительные данные. Тип поля: "Дата и время". ${type.person}. 
    Добавление. Максимальное количество параметров.`, () => {

        const params = {
            name: 'typeDateTimeMaxParamsName',
            description: 'typeDateTimeMaxParamsDescription'
        };

        describe('Добавление', () => {
            type.bef();

            aft();

            it(`Отображение ${type.count} записей в таблице`, async () => await dec.simple(el.table.size,
                [type.count, entry.max],
                el.table,));

            it('Нажатие кнопки "Добавить"', async () => await dec.simple(el.butIcBefore.handler,
                [but.add, entry.max],
                el.butIcBefore));

            it('Отображене модального окна "Добавить дополнительное поле"',
                async () => await dec.simple(el.modal.additionalDataAdd.init,
                    [entry.max],
                    el.modal.additionalDataAdd));

            it('Выбор "Дата и время" в "Тип поля"', async () => await dec.simple(el.select.iconXpand,
                ['Тип поля', 'Текстовый', 'Дата и время', entry.max],
                el.select));

            it('Ввод "Название поля"', async () => await dec.simple(el.input.sendKeys,
                ['Название поля', '', params.name, entry.max],
                el.input));

            it('Ввод "Описание"', async () => await dec.simple(el.input.sendKeys,
                ['Описание', '', params.description, entry.max],
                el.input));

            it('Нажатие кнопки "Сохранить"', async () => await dec.simple(el.button.handler,
                ['Сохранить', entry.max],
                el.button));

            it('Отображение сообщения "Дополнительное поле успешно добавлено"',
                async () => await dec.simple(el.success.success,
                    ['Дополнительное поле успешно добавлено', entry.max],
                    el.success));

            it('Отсутствие модального окна "Добавить дополнительное поле"',
                async () => await dec.simple(el.modal.additionalDataAdd.initClose,
                    [entry.max],
                    el.modal.additionalDataAdd));
        });

        describe('Проверка таблицы', () => {
            type.bef();

            aft();

            it(`Отображение ${type.count + 1} записей в таблице`, async () => await dec.simple(el.table.size,
                [type.count + 1, entry.max],
                el.table));

            it('Проверка "Название поля"', async () => await dec.simpleText(el.table.cellGetText,
                ['Название поля', 1, 1, entry.max],
                params.name,
                el.table));

            it('Проверка "Тип поля"', async () => await dec.simpleText(el.table.cellGetText,
                ['Тип поля', 1, 2, entry.max],
                'Дата и время',
                el.table));

            it('Проверка "Описание"', async () => await dec.simpleText(el.table.cellGetText,
                ['Описание', 1, 3, entry.max],
                params.description,
                el.table));

            it('Проверка "Значение по умолчанию"', async () => await dec.simpleText(el.table.cellGetText,
                ['Значение по умолчанию', 1, 4, entry.max],
                '',
                el.table));
        });

        describe('Проверка параметров', () => {
            type.bef();

            aft();

            it(`Нажатие по первой строке в таблице`, async () => await dec.simple(el.table.strHandler,
                [1, entry.max],
                el.table));

            it('Нажатие кнопки "Редактировать"', async () => await dec.simple(el.butIcBefore.handler,
                [but.edit, entry.max],
                el.butIcBefore));

            it('Отображене модального окна "Редактировать дополнительное поле"',
                async () => await dec.simple(el.modal.additionalDataEdit.init,
                    [entry.max],
                    el.modal.additionalDataEdit));

            it('Проверка "Название поля"', async () => await dec.simpleText(el.input.getValue,
                ['Название поля', '', entry.max],
                params.name,
                el.input));

            it('Проверка "Описание"', async () => await dec.simpleText(el.input.getValue,
                ['Описание', '', entry.max],
                params.description,
                el.input));

            it('Проверка "Тип поля"', async () => await dec.simpleText(el.select.getText,
                ['Тип поля', 'Дата и время', entry.max],
                'Дата и время',
                el.input));

            it('Нажатие кнопки закрытия модального окна',
                async () => await dec.simple(el.modal.additionalDataEdit.closeHandler,
                    [entry.max],
                    el.modal.additionalDataEdit));

            it('Отсутствие модального окна "Добавить дополнительное поле"',
                async () => await dec.simple(el.modal.additionalDataEdit.initClose,
                    [entry.max],
                    el.modal.additionalDataEdit));
        });

        describe('Удаление тестовых данных', () => {
            type.bef();
            aft();
            dataRemove(type);
        });
    });

    // Тип поля "Дата и время". Попытка добавления без «Название поля».
    const typeDateTimeNoName = () => describe(`Дополнительные данные. Тип поля: "Дата и время". ${type.person}. 
    Добавление. Попытка добавления без "Название поля".`, () => {

        const params = {
            description: 'typeDateTimeNoName'
        };

        describe('Добавление', () => {
            type.bef();

            aft();

            it(`Отображение ${type.count} записей в таблице`, async () => await dec.simple(el.table.size,
                [type.count, entry.max],
                el.table,));

            it('Нажатие кнопки "Добавить"', async () => await dec.simple(el.butIcBefore.handler,
                [but.add, entry.max],
                el.butIcBefore));

            it('Отображене модального окна "Добавить дополнительное поле"',
                async () => await dec.simple(el.modal.additionalDataAdd.init,
                    [entry.max],
                    el.modal.additionalDataAdd));

            it('Выбор "Дата и время" в "Тип поля"', async () => await dec.simple(el.select.iconXpand,
                ['Тип поля', 'Текстовый', 'Дата и время', entry.max],
                el.select));

            it('Ввод "Описание"', async () => await dec.simple(el.input.sendKeys,
                ['Описание', '', params.description, entry.max],
                el.input));

            it('Кнопка "Сохранить" - не активна', async () => await dec.simple(el.button.disabled,
                ['Сохранить', entry.max],
                el.button));

            it('Нажатие кнопки "Сохранить"', async () => await dec.simpleFalse(el.button.handlerNoActive,
                ['Сохранить', entry.max],
                el.button));

            it('Модальное окно "Добавить дополнительное поле" не закрыто',
                async () => await dec.simpleFalse(el.modal.additionalDataAdd.initClose,
                    [entry.min],
                    el.modal.additionalDataAdd));

            it('Нажатие кнопки закрытия модального окна',
                async () => await dec.simple(el.modal.additionalDataEdit.closeHandler,
                    [entry.max],
                    el.modal.additionalDataEdit));

            it('Отсутствие модального окна "Добавить дополнительное поле"',
                async () => await dec.simple(el.modal.additionalDataEdit.initClose,
                    [entry.max],
                    el.modal.additionalDataEdit));


        });

        describe('Проверка таблицы', () => {
            type.bef();

            aft();

            it(`Отображение ${type.count} записей в таблице`, async () => await dec.simple(el.table.size,
                [type.count, entry.max],
                el.table));
        });

    });

    // Тип поля "Дата и время". Попытка дублирования.
    const typeDateTimeDuplicate = () => describe(`Дополнительные данные. Тип поля: "Дата и время". ${type.person}. 
    Добавление. Попытка дублирования.`, () => {

        const params = {
            name: 'typeDateTimeDuplicate',
            error: 'Такое название уже используется'
        };

        describe('API - добавление', () => {
            type.bef();

            aft();

            it('Добавление дополнительных данных', async () => {
                const data = {
                    name: params.name,
                    comment: '',
                    type_id: 2,
                    default_value: '',
                    items: ''
                };
                const cook = await page.base.getCookie('token');
                await dec.simple(api.putAdditionalData,
                    [[data], type.api, cook.text],
                    api.putAdditionalData);
            });
        });

        describe('Добавление', () => {
            type.bef();

            aft();

            it(`Отображение ${type.count + 1} записей в таблице`, async () => await dec.simple(el.table.size,
                [type.count + 1, entry.max],
                el.table,));

            it('Нажатие кнопки "Добавить"', async () => await dec.simple(el.butIcBefore.handler,
                [but.add, entry.max],
                el.butIcBefore));

            it('Отображене модального окна "Добавить дополнительное поле"',
                async () => await dec.simple(el.modal.additionalDataAdd.init,
                    [entry.max],
                    el.modal.additionalDataAdd));

            it('Выбор "Дата и время" в "Тип поля"', async () => await dec.simple(el.select.iconXpand,
                ['Тип поля', 'Текстовый', 'Дата и время', entry.max],
                el.select));

            it('Ввод "Название поля"', async () => await dec.simple(el.input.sendKeys,
                ['Название поля', '', params.name, entry.max],
                el.input));

            it('Нажатие кнопки "Сохранить"', async () => await dec.simple(el.button.handler,
                ['Сохранить', entry.max],
                el.button));

            it('Отображение ошибки',
                async () => await dec.simple(el.error.error,
                    [params.error, entry.max],
                    el.error));

            it('Нажатие кнопки закрытия модального окна',
                async () => await dec.simple(el.modal.additionalDataEdit.closeHandler,
                    [entry.max],
                    el.modal.additionalDataEdit));

            it('Отсутствие модального окна "Добавить дополнительное поле"',
                async () => await dec.simple(el.modal.additionalDataAdd.initClose,
                    [entry.max],
                    el.modal.additionalDataAdd));
        });

        describe('Проверка таблицы', () => {
            type.bef();

            aft();

            it(`Отображение ${type.count + 1} записей в таблице`, async () => await dec.simple(el.table.size,
                [type.count + 1, entry.max],
                el.table));

            it('Проверка "Название поля"', async () => await dec.simpleText(el.table.cellGetText,
                ['Название поля', 1, 1, entry.max],
                params.name,
                el.table));

            it('Проверка "Тип поля"', async () => await dec.simpleText(el.table.cellGetText,
                ['Тип поля', 1, 2, entry.max],
                'Графический',
                el.table));

            it('Проверка "Описание"', async () => await dec.simpleText(el.table.cellGetText,
                ['Описание', 1, 3, entry.max],
                '',
                el.table));

            it('Проверка "Значение по умолчанию"', async () => await dec.simpleText(el.table.cellGetText,
                ['Значение по умолчанию', 1, 4, entry.max],
                '',
                el.table));
        });

        describe('Удаление тестовых данных', () => {
            type.bef();
            aft();
            dataRemove(type);
        });
    });

    // Тип поля «Дата». Проверки редактирования.
    const typeDateTime = () => describe(`Дополнительные данные. Тип поля "Дата и время". ${type.person}. 
    Добавление. Проверки добавления.`, () => {
        typeDateTimeMinParams();
        typeDateTimeMaxParams();
        typeDateTimeNoName();
        typeDateTimeDuplicate();
    });

    //  Попытки превышения лимита текстовых полей.
    const textLimit = () => describe(`Дополнительные данные. ${type.person}. 
    Добавление. Попытки превышения лимита текстовых полей.`, () => {

        const params = {
            array: [...Array(15).keys()].map(item => {
                return {
                    name: 'additionalData' + (item + 1),
                    type_id: 1
                };
            }),
            text1: 'text1',
            text2: 'text2',
            checkbox: 'checkbox',
            select: 'select',
            date: 'date',
            dateTime: 'dateTime',
            error: 'Превышен лимит для текстовых полей, максимум 16',
            countBefore: type.person === 'Сотрудник' ? 20 : 15 + type.count,
            countAfter: type.person === 'Сотрудник' ? 20 : 15 + type.count + 1,
        };

        describe('API - добавление', () => {
                    type.bef();

                    aft();

                    it('Добавление дополнительных данных', async () => {
                        const cook = await page.base.getCookie('token');
                        await dec.simple(api.putAdditionalData,
                            [params.array, type.api, cook.text],
                            api.putAdditionalData);
                    });
                });

        describe('Проверка таблицы', () => {
            type.bef();

            aft();

            it(`Отображение ${params.countBefore} записей в таблице`, async () => await dec.simple(el.table.size,
                [params.countBefore, entry.max],
                el.table));
        });

        describe('Добавление поля с типом "Текстовый"', () => {
            type.bef();

            aft();

            it(`Отображение ${params.countBefore} записей в таблице`, async () => await dec.simple(el.table.size,
                [params.countBefore, entry.max],
                el.table,));

            it('Нажатие кнопки "Добавить"', async () => await dec.simple(el.butIcBefore.handler,
                [but.add, entry.max],
                el.butIcBefore));

            it('Отображене модального окна "Добавить дополнительное поле"',
                async () => await dec.simple(el.modal.additionalDataAdd.init,
                    [entry.max],
                    el.modal.additionalDataAdd));

            it('Выбор "Текстовый" в "Тип поля"', async () => await dec.simple(el.select.iconXpand,
                ['Тип поля', 'Текстовый', 'Текстовый', entry.max],
                el.select));

            it('Ввод "Название поля"', async () => await dec.simple(el.input.sendKeys,
                ['Название поля', '', params.text1, entry.max],
                el.input));

            it('Нажатие кнопки "Сохранить"', async () => await dec.simple(el.button.handler,
                ['Сохранить', entry.max],
                el.button));

            it('Отображение сообщения "Дополнительное поле успешно добавлено"',
                async () => await dec.simple(el.success.success,
                    ['Дополнительное поле успешно добавлено', entry.max],
                    el.success));

            it('Отсутствие модального окна "Добавить дополнительное поле"',
                async () => await dec.simple(el.modal.additionalDataAdd.initClose,
                    [entry.max],
                    el.modal.additionalDataAdd));
        });

        describe('Проверка таблицы', () => {
            type.bef();

            aft();

            it(`Отображение ${params.countAfter} записей в таблице`, async () => await dec.simple(el.table.size,
                [params.countAfter, entry.max],
                el.table));
        });

        describe('Попытка добавление поля с типом "Текстовый"', () => {
            type.bef();

            aft();

            it(`Отображение ${params.countAfter} записей в таблице`, async () => await dec.simple(el.table.size,
                [params.countAfter, entry.max],
                el.table));

            it('Нажатие кнопки "Добавить"', async () => await dec.simple(el.butIcBefore.handler,
                [but.add, entry.max],
                el.butIcBefore));

            it('Отображене модального окна "Добавить дополнительное поле"',
                async () => await dec.simple(el.modal.additionalDataAdd.init,
                    [entry.max],
                    el.modal.additionalDataAdd));

            it('Выбор "Текстовый" в "Тип поля"', async () => await dec.simple(el.select.iconXpand,
                ['Тип поля', 'Текстовый', 'Текстовый', entry.max],
                el.select));

            it('Ввод "Название поля"', async () => await dec.simple(el.input.sendKeys,
                ['Название поля', '', params.text2, entry.max],
                el.input));

            it('Нажатие кнопки "Сохранить"', async () => await dec.simple(el.button.handler,
                ['Сохранить', entry.max],
                el.button));

            it('Отображение ошибки',
                async () => await dec.simple(el.error.error,
                    [params.error, entry.max],
                    el.error));

            it('Нажатие кнопки закрытия модального окна',
                async () => await dec.simple(el.modal.additionalDataEdit.closeHandler,
                    [entry.max],
                    el.modal.additionalDataEdit));

            it('Отсутствие модального окна "Добавить дополнительное поле"',
                async () => await dec.simple(el.modal.additionalDataAdd.initClose,
                    [entry.max],
                    el.modal.additionalDataAdd));
        });

        describe('Проверка таблицы', () => {
            type.bef();

            aft();

            it(`Отображение ${params.countAfter} записей в таблице`, async () => await dec.simple(el.table.size,
                [params.countAfter, entry.max],
                el.table));

            it('Проверка "Название поля"', async () => await dec.simpleText(el.table.cellGetText,
                ['Название поля', 1, 1, entry.max],
                params.text1,
                el.table));

            it('Проверка "Тип поля"', async () => await dec.simpleText(el.table.cellGetText,
                ['Тип поля', 1, 2, entry.max],
                'Текстовый',
                el.table));

            it('Проверка "Описание"', async () => await dec.simpleText(el.table.cellGetText,
                ['Описание', 1, 3, entry.max],
                '',
                el.table));

            it('Проверка "Значение по умолчанию"', async () => await dec.simpleText(el.table.cellGetText,
                ['Значение по умолчанию', 1, 4, entry.max],
                '',
                el.table));
        });

        describe('Попытка добавление поля с типом "Выпадающий список"', () => {
            type.bef();

            aft();

            it(`Отображение ${params.countAfter} записей в таблице`, async () => await dec.simple(el.table.size,
                [params.countAfter, entry.max],
                el.table));

            it('Нажатие кнопки "Добавить"', async () => await dec.simple(el.butIcBefore.handler,
                [but.add, entry.max],
                el.butIcBefore));

            it('Отображене модального окна "Добавить дополнительное поле"',
                async () => await dec.simple(el.modal.additionalDataAdd.init,
                    [entry.max],
                    el.modal.additionalDataAdd));

            it('Выбор "Текстовый" в "Тип поля"', async () => await dec.simple(el.select.iconXpand,
                ['Тип поля', 'Текстовый', 'Выпадающий список', entry.max],
                el.select));

            it('Ввод "Название поля"', async () => await dec.simple(el.input.sendKeys,
                ['Название поля', '', params.select, entry.max],
                el.input));

            it('Удаление поля 1 из списка полей "Поля"',
                async () => await dec.simple(el.modal.additionalDataAdd.selectTypeRemove,
                    [1, entry.max],
                    el.modal.additionalDataAdd));

            it('Отсуствие полей в списке полей "Поля"',
                async () => await dec.simple(el.modal.additionalDataAdd.noSelectTypeNum,
                    [1, entry.max],
                    el.modal.additionalDataAdd));

            it('Нажатие кнопки "Сохранить"', async () => await dec.simple(el.button.handler,
                ['Сохранить', entry.max],
                el.button));

            it('Отображение ошибки',
                async () => await dec.simple(el.error.error,
                    [params.error, entry.max],
                    el.error));

            it('Нажатие кнопки закрытия модального окна',
                async () => await dec.simple(el.modal.additionalDataEdit.closeHandler,
                    [entry.max],
                    el.modal.additionalDataEdit));

            it('Отсутствие модального окна "Добавить дополнительное поле"',
                async () => await dec.simple(el.modal.additionalDataAdd.initClose,
                    [entry.max],
                    el.modal.additionalDataAdd));



        });

        describe('Проверка таблицы', () => {
            type.bef();

            aft();

            it(`Отображение ${params.countAfter} записей в таблице`, async () => await dec.simple(el.table.size,
                [params.countAfter, entry.max],
                el.table));

            it('Проверка "Название поля"', async () => await dec.simpleText(el.table.cellGetText,
                ['Название поля', 1, 1, entry.max],
                params.text1,
                el.table));

            it('Проверка "Тип поля"', async () => await dec.simpleText(el.table.cellGetText,
                ['Тип поля', 1, 2, entry.max],
                'Текстовый',
                el.table));

            it('Проверка "Описание"', async () => await dec.simpleText(el.table.cellGetText,
                ['Описание', 1, 3, entry.max],
                '',
                el.table));

            it('Проверка "Значение по умолчанию"', async () => await dec.simpleText(el.table.cellGetText,
                ['Значение по умолчанию', 1, 4, entry.max],
                '',
                el.table));
        });

        describe('Попытка добавление поля с типом "Чекбокс"', () => {
            type.bef();

            aft();

            it(`Отображение ${params.countAfter} записей в таблице`, async () => await dec.simple(el.table.size,
                [params.countAfter, entry.max],
                el.table,));

            it('Нажатие кнопки "Добавить"', async () => await dec.simple(el.butIcBefore.handler,
                [but.add, entry.max],
                el.butIcBefore));

            it('Отображене модального окна "Добавить дополнительное поле"',
                async () => await dec.simple(el.modal.additionalDataAdd.init,
                    [entry.max],
                    el.modal.additionalDataAdd));

            it('Выбор "Текстовый" в "Тип поля"', async () => await dec.simple(el.select.iconXpand,
                ['Тип поля', 'Текстовый', 'Чекбокс', entry.max],
                el.select));

            it('Ввод "Название поля"', async () => await dec.simple(el.input.sendKeys,
                ['Название поля', '', params.checkbox, entry.max],
                el.input));

            it('Нажатие кнопки "Сохранить"', async () => await dec.simple(el.button.handler,
                ['Сохранить', entry.max],
                el.button));

            it('Отображение ошибки',
                async () => await dec.simple(el.error.error,
                    [params.error, entry.max],
                    el.error));

            it('Нажатие кнопки закрытия модального окна',
                async () => await dec.simple(el.modal.additionalDataEdit.closeHandler,
                    [entry.max],
                    el.modal.additionalDataEdit));

            it('Отсутствие модального окна "Добавить дополнительное поле"',
                async () => await dec.simple(el.modal.additionalDataAdd.initClose,
                    [entry.max],
                    el.modal.additionalDataAdd));



        });

        describe('Проверка таблицы', () => {
            type.bef();

            aft();

            it(`Отображение ${params.countAfter} записей в таблице`, async () => await dec.simple(el.table.size,
                [params.countAfter, entry.max],
                el.table));

            it('Проверка "Название поля"', async () => await dec.simpleText(el.table.cellGetText,
                ['Название поля', 1, 1, entry.max],
                params.text1,
                el.table));

            it('Проверка "Тип поля"', async () => await dec.simpleText(el.table.cellGetText,
                ['Тип поля', 1, 2, entry.max],
                'Текстовый',
                el.table));

            it('Проверка "Описание"', async () => await dec.simpleText(el.table.cellGetText,
                ['Описание', 1, 3, entry.max],
                '',
                el.table));

            it('Проверка "Значение по умолчанию"', async () => await dec.simpleText(el.table.cellGetText,
                ['Значение по умолчанию', 1, 4, entry.max],
                '',
                el.table));
        });

        describe('Попытка добавление поля с типом "Дата"', () => {
            type.bef();

            aft();

            it(`Отображение ${params.countAfter} записей в таблице`, async () => await dec.simple(el.table.size,
                [params.countAfter, entry.max],
                el.table,));

            it('Нажатие кнопки "Добавить"', async () => await dec.simple(el.butIcBefore.handler,
                [but.add, entry.max],
                el.butIcBefore));

            it('Отображене модального окна "Добавить дополнительное поле"',
                async () => await dec.simple(el.modal.additionalDataAdd.init,
                    [entry.max],
                    el.modal.additionalDataAdd));

            it('Выбор "Дата" в "Тип поля"', async () => await dec.simple(el.select.iconXpand,
                ['Тип поля', 'Текстовый', 'Дата', entry.max],
                el.select));

            it('Ввод "Название поля"', async () => await dec.simple(el.input.sendKeys,
                ['Название поля', '', params.date, entry.max],
                el.input));

            it('Нажатие кнопки "Сохранить"', async () => await dec.simple(el.button.handler,
                ['Сохранить', entry.max],
                el.button));

            it('Отображение ошибки',
                async () => await dec.simple(el.error.error,
                    [params.error, entry.max],
                    el.error));

            it('Нажатие кнопки закрытия модального окна',
                async () => await dec.simple(el.modal.additionalDataEdit.closeHandler,
                    [entry.max],
                    el.modal.additionalDataEdit));

            it('Отсутствие модального окна "Добавить дополнительное поле"',
                async () => await dec.simple(el.modal.additionalDataAdd.initClose,
                    [entry.max],
                    el.modal.additionalDataAdd));



        });

        describe('Проверка таблицы', () => {
            type.bef();

            aft();

            it(`Отображение ${params.countAfter} записей в таблице`, async () => await dec.simple(el.table.size,
                [params.countAfter, entry.max],
                el.table));

            it('Проверка "Название поля"', async () => await dec.simpleText(el.table.cellGetText,
                ['Название поля', 1, 1, entry.max],
                params.text1,
                el.table));

            it('Проверка "Тип поля"', async () => await dec.simpleText(el.table.cellGetText,
                ['Тип поля', 1, 2, entry.max],
                'Текстовый',
                el.table));

            it('Проверка "Описание"', async () => await dec.simpleText(el.table.cellGetText,
                ['Описание', 1, 3, entry.max],
                '',
                el.table));

            it('Проверка "Значение по умолчанию"', async () => await dec.simpleText(el.table.cellGetText,
                ['Значение по умолчанию', 1, 4, entry.max],
                '',
                el.table));
        });

        describe('Попытка добавление поля с типом "Дата и время"', () => {
            type.bef();

            aft();

            it(`Отображение ${params.countAfter} записей в таблице`, async () => await dec.simple(el.table.size,
                [params.countAfter, entry.max],
                el.table,));

            it('Нажатие кнопки "Добавить"', async () => await dec.simple(el.butIcBefore.handler,
                [but.add, entry.max],
                el.butIcBefore));

            it('Отображене модального окна "Добавить дополнительное поле"',
                async () => await dec.simple(el.modal.additionalDataAdd.init,
                    [entry.max],
                    el.modal.additionalDataAdd));

            it('Выбор "Дата" в "Тип поля"', async () => await dec.simple(el.select.iconXpand,
                ['Тип поля', 'Текстовый', 'Дата и время', entry.max],
                el.select));

            it('Ввод "Название поля"', async () => await dec.simple(el.input.sendKeys,
                ['Название поля', '', params.dateTime, entry.max],
                el.input));

            it('Нажатие кнопки "Сохранить"', async () => await dec.simple(el.button.handler,
                ['Сохранить', entry.max],
                el.button));

            it('Отображение ошибки',
                async () => await dec.simple(el.error.error,
                    [params.error, entry.max],
                    el.error));

            it('Нажатие кнопки закрытия модального окна',
                async () => await dec.simple(el.modal.additionalDataEdit.closeHandler,
                    [entry.max],
                    el.modal.additionalDataEdit));

            it('Отсутствие модального окна "Добавить дополнительное поле"',
                async () => await dec.simple(el.modal.additionalDataAdd.initClose,
                    [entry.max],
                    el.modal.additionalDataAdd));
        });

        describe('Проверка таблицы', () => {
            type.bef();

            aft();

            it(`Отображение ${params.countAfter} записей в таблице`, async () => await dec.simple(el.table.size,
                [params.countAfter, entry.max],
                el.table));

            it('Проверка "Название поля"', async () => await dec.simpleText(el.table.cellGetText,
                ['Название поля', 1, 1, entry.max],
                params.text1,
                el.table));

            it('Проверка "Тип поля"', async () => await dec.simpleText(el.table.cellGetText,
                ['Тип поля', 1, 2, entry.max],
                'Текстовый',
                el.table));

            it('Проверка "Описание"', async () => await dec.simpleText(el.table.cellGetText,
                ['Описание', 1, 3, entry.max],
                '',
                el.table));

            it('Проверка "Значение по умолчанию"', async () => await dec.simpleText(el.table.cellGetText,
                ['Значение по умолчанию', 1, 4, entry.max],
                '',
                el.table));
        });

        describe('Удаление тестовых данных', () => {
            type.bef();
            aft();
            dataRemove(type);
        });

    });

    // Попытки превышения лимита графических полей.
    const graficLimit = () => describe(`Дополнительные данные. ${type.person}. 
    Добавление. Попытки превышения лимита графических полей.`, () => {

        const params = {
            array: [...Array(9).keys()].map(item => {
                return {
                    name: 'additionalData' + (item + 1),
                    type_id: 2
                };
            }),
            grafic1: 'grafic1',
            grafic2: 'grafic2',
            error: 'Превышен лимит для графических полей, максимум 10'
        };

        describe('API - добавление', () => {
            type.bef();

            aft();

            it('Добавление дополнительных данных', async () => {
                const cook = await page.base.getCookie('token');
                await dec.simple(api.putAdditionalData,
                    [params.array, type.api, cook.text],
                    api.putAdditionalData);
            });
        });

        describe('Проверка таблицы', () => {
            type.bef();

            aft();

            it(`Отображение ${type.count + 9} записей в таблице`, async () => await dec.simple(el.table.size,
                [type.count + 9, entry.max],
                el.table));
        });

        describe('Добавление поля с типом "Графический"', () => {
            type.bef();

            aft();

            it(`Отображение ${type.count + 9} записей в таблице`, async () => await dec.simple(el.table.size,
                [type.count + 9, entry.max],
                el.table,));

            it('Нажатие кнопки "Добавить"', async () => await dec.simple(el.butIcBefore.handler,
                [but.add, entry.max],
                el.butIcBefore));

            it('Отображене модального окна "Добавить дополнительное поле"',
                async () => await dec.simple(el.modal.additionalDataAdd.init,
                    [entry.max],
                    el.modal.additionalDataAdd));

            it('Выбор "Текстовый" в "Тип поля"', async () => await dec.simple(el.select.iconXpand,
                ['Тип поля', 'Текстовый', 'Графический', entry.max],
                el.select));

            it('Ввод "Название поля"', async () => await dec.simple(el.input.sendKeys,
                ['Название поля', '', params.grafic1, entry.max],
                el.input));

            it('Нажатие кнопки "Сохранить"', async () => await dec.simple(el.button.handler,
                ['Сохранить', entry.max],
                el.button));

            it('Отображение сообщения "Дополнительное поле успешно добавлено"',
                async () => await dec.simple(el.success.success,
                    ['Дополнительное поле успешно добавлено', entry.max],
                    el.success));

            it('Отсутствие модального окна "Добавить дополнительное поле"',
                async () => await dec.simple(el.modal.additionalDataAdd.initClose,
                    [entry.max],
                    el.modal.additionalDataAdd));
        });

        describe('Проверка таблицы', () => {
            type.bef();

            aft();

            it(`Отображение ${type.count + 10} записей в таблице`, async () => await dec.simple(el.table.size,
                [type.count + 10, entry.max],
                el.table));
        });

        describe('Попытка добавление поля с типом "Графический"', () => {
            type.bef();

            aft();

            it(`Отображение ${type.count + 10} записей в таблице`, async () => await dec.simple(el.table.size,
                [type.count + 10, entry.max],
                el.table));

            it('Нажатие кнопки "Добавить"', async () => await dec.simple(el.butIcBefore.handler,
                [but.add, entry.max],
                el.butIcBefore));

            it('Отображене модального окна "Добавить дополнительное поле"',
                async () => await dec.simple(el.modal.additionalDataAdd.init,
                    [entry.max],
                    el.modal.additionalDataAdd));

            it('Выбор "Текстовый" в "Тип поля"', async () => await dec.simple(el.select.iconXpand,
                ['Тип поля', 'Текстовый', 'Графический', entry.max],
                el.select));

            it('Ввод "Название поля"', async () => await dec.simple(el.input.sendKeys,
                ['Название поля', '', params.grafic2, entry.max],
                el.input));

            it('Нажатие кнопки "Сохранить"', async () => await dec.simple(el.button.handler,
                ['Сохранить', entry.max],
                el.button));

            it('Отображение ошибки',
                async () => await dec.simple(el.error.error,
                    [params.error, entry.max],
                    el.error));

            it('Нажатие кнопки закрытия модального окна',
                async () => await dec.simple(el.modal.additionalDataEdit.closeHandler,
                    [entry.max],
                    el.modal.additionalDataEdit));

            it('Отсутствие модального окна "Добавить дополнительное поле"',
                async () => await dec.simple(el.modal.additionalDataAdd.initClose,
                    [entry.max],
                    el.modal.additionalDataAdd));
        });

        describe('Проверка таблицы', () => {
            type.bef();

            aft();

            it(`Отображение ${type.count + 10} записей в таблице`, async () => await dec.simple(el.table.size,
                [type.count + 10, entry.max],
                el.table));
        });

        describe('Удаление тестовых данных', () => {
            type.bef();
            aft();
            dataRemove(type);
        });
    });

    // Проверки добавления.
    const add = () => describe(`Дополнительные данные. ${type.person}. Проверки добавления.`, () => {
        typeText();
        typeGrafic();
        typeSelect();
        typeCheckbox();
        typeDate();
        typeDateTime();
        textLimit();
        graficLimit();
    });

    return {
        typeTextMinParams,
        typeTextDuplicate,
        typeTextNoName,
        typeTextMaxParams,
        typeText,
        typeGraficMinParams,
        typeGraficMaxParams,
        typeGraficNoName,
        typeGraficDuplicate,
        typeGrafic,
        typeSelectMinParams,
        typeSelectMaxParams,
        typeSelectNoName,
        typeSelectDeleteBox,
        typeSelectNoValueBoxMinParams,
        typeSelectNoValueBoxMaxParams,
        typeSelectDuplicate,
        typeSelect,
        typeCheckboxMinParams,
        typeCheckboxMaxParams,
        typeCheckboxNoName,
        typeCheckboxDuplicate,
        typeCheckbox,
        typeDateMinParams,
        typeDateMaxParams,
        typeDateNoName,
        typeDateDuplicate,
        typeDate,
        typeDateTimeMinParams,
        typeDateTimeMaxParams,
        typeDateTimeNoName,
        typeDateTimeDuplicate,
        typeDateTime,
        textLimit,
        graficLimit,
        add,
    };

};

// Тесты редактирования
const edit = (type) => {

    // Тип поля «Текстовый».
    // Тип поля «Текстовый». Добавление необязательных параметров с минимальным количеством параметров.
    const typeTextMinParams = () => describe(`Дополнительные данные. Тип поля: "Текстовый". ${type.person}. 
    Редактирование. Добавление необязательных параметров с минимальным количеством параметров.`, () => {
        const params = {
            name: 'typeTextMinParamsName',
            description: 'typeTextMinParamsDescription',
            defaultValue: 'typeTextMinParamsValue'
        };

        describe('API - добавление', () => {
            type.bef();

            aft();

            it('Добавление дополнительных данных', async () => {
                const data = {
                    name: params.name,
                    comment: '',
                    type_id: 1,
                    default_value: '',
                    items: ''
                };
                const cook = await page.base.getCookie('token');
                await dec.simple(api.putAdditionalData,
                    [[data], type.api, cook.text],
                    api.putAdditionalData);
            });
        });

        describe('Проверка таблицы', () => {
            type.bef();

            aft();

            it(`Отображение ${type.count + 1} записей в таблице`, async () => await dec.simple(el.table.size,
                [type.count + 1, entry.max],
                el.table));

            it('Проверка "Название поля"', async () => await dec.simpleText(el.table.cellGetText,
                ['Название поля', 1, 1, entry.max],
                params.name,
                el.table));

            it('Проверка "Тип поля"', async () => await dec.simpleText(el.table.cellGetText,
                ['Тип поля', 1, 2, entry.max],
                'Текстовый',
                el.table));

            it('Проверка "Описание"', async () => await dec.simpleText(el.table.cellGetText,
                ['Описание', 1, 3, entry.max],
                '',
                el.table));

            it('Проверка "Значение по умолчанию"', async () => await dec.simpleText(el.table.cellGetText,
                ['Значение по умолчанию', 1, 4, entry.max],
                '',
                el.table));
        });

        describe('Проверка параметров', () => {
            type.bef();

            aft();

            it(`Нажатие по первой строке в таблице`, async () => await dec.simple(el.table.strHandler,
                [1, entry.max],
                el.table));

            it('Нажатие кнопки "Редактировать"', async () => await dec.simple(el.butIcBefore.handler,
                [but.edit, entry.max],
                el.butIcBefore));

            it('Отображене модального окна "Редактировать дополнительное поле"',
                async () => await dec.simple(el.modal.additionalDataEdit.init,
                    [entry.max],
                    el.modal.additionalDataEdit));

            it('Проверка "Название поля"', async () => await dec.simpleText(el.input.getValue,
                ['Название поля', '', entry.max],
                params.name,
                el.input));

            it('Проверка "Описание"', async () => await dec.simpleText(el.input.getValue,
                ['Описание', '', entry.max],
                '',
                el.input));

            it('Проверка "Тип поля"', async () => await dec.simpleText(el.select.getText,
                ['Тип поля', 'Текстовый', entry.max],
                'Текстовый',
                el.input));

            it('Проверка "Значение по умолчанию"', async () => await dec.simpleText(el.input.getValue,
                ['Значение по умолчанию', '', entry.max],
                '',
                el.input));

            it('Нажатие кнопки закрытия модального окна',
                async () => await dec.simple(el.modal.additionalDataEdit.closeHandler,
                    [entry.max],
                    el.modal.additionalDataEdit));

            it('Отсутствие модального окна "Добавить дополнительное поле"',
                async () => await dec.simple(el.modal.additionalDataEdit.initClose,
                    [entry.max],
                    el.modal.additionalDataEdit));
        });

        describe('Редактирование', () => {
            type.bef();

            aft();

            it(`Отображение ${type.count + 1} записей в таблице`, async () => await dec.simple(el.table.size,
                [type.count + 1, entry.max],
                el.table,));

            it(`Нажатие по первой строке в таблице`, async () => await dec.simple(el.table.strHandler,
                [1, entry.max],
                el.table));

            it('Нажатие кнопки "Редактировать"', async () => await dec.simple(el.butIcBefore.handler,
                [but.edit, entry.max],
                el.butIcBefore));

            it('Отображене модального окна "Редактировать дополнительное поле"',
                async () => await dec.simple(el.modal.additionalDataEdit.init,
                    [entry.max],
                    el.modal.additionalDataEdit));

            it('Ввод "Описание"', async () => await dec.simple(el.input.sendKeys,
                ['Описание', '', params.description, entry.max],
                el.input));

            it('Ввод "Значение по умолчанию"', async () => await dec.simple(el.input.sendKeys,
                ['Значение по умолчанию', '', params.defaultValue, entry.max],
                el.input));

            it('Нажатие кнопки "Сохранить"', async () => await dec.simple(el.button.handler,
                ['Сохранить', entry.max],
                el.button));

            it('Отображение сообщения "Сохранено успешно"',
                async () => await dec.simple(el.success.success,
                    ['Сохранено успешно', entry.max],
                    el.success));

            it('Отсутствие модального окна "Добавить дополнительное поле"',
                async () => await dec.simple(el.modal.additionalDataAdd.initClose,
                    [entry.max],
                    el.modal.additionalDataAdd));
        });

        describe('Проверка таблицы', () => {
            type.bef();

            aft();

            it(`Отображение ${type.count + 1} записей в таблице`, async () => await dec.simple(el.table.size,
                [type.count + 1, entry.max],
                el.table));

            it('Проверка "Название поля"', async () => await dec.simpleText(el.table.cellGetText,
                ['Название поля', 1, 1, entry.max],
                params.name,
                el.table));

            it('Проверка "Тип поля"', async () => await dec.simpleText(el.table.cellGetText,
                ['Тип поля', 1, 2, entry.max],
                'Текстовый',
                el.table));

            it('Проверка "Описание"', async () => await dec.simpleText(el.table.cellGetText,
                ['Описание', 1, 3, entry.max],
                params.description,
                el.table));

            it('Проверка "Значение по умолчанию"', async () => await dec.simpleText(el.table.cellGetText,
                ['Значение по умолчанию', 1, 4, entry.max],
                params.defaultValue,
                el.table));
        });

        describe('Проверка параметров', () => {
            type.bef();

            aft();

            it(`Нажатие по первой строке в таблице`, async () => await dec.simple(el.table.strHandler,
                [1, entry.max],
                el.table));

            it('Нажатие кнопки "Редактировать"', async () => await dec.simple(el.butIcBefore.handler,
                [but.edit, entry.max],
                el.butIcBefore));

            it('Отображене модального окна "Редактировать дополнительное поле"',
                async () => await dec.simple(el.modal.additionalDataEdit.init,
                    [entry.max],
                    el.modal.additionalDataEdit));

            it('Проверка "Название поля"', async () => await dec.simpleText(el.input.getValue,
                ['Название поля', '', entry.max],
                params.name,
                el.input));

            it('Проверка "Описание"', async () => await dec.simpleText(el.input.getValue,
                ['Описание', '', entry.max],
                params.description,
                el.input));

            it('Проверка "Тип поля"', async () => await dec.simpleText(el.select.getText,
                ['Тип поля', 'Текстовый', entry.max],
                'Текстовый',
                el.input));

            it('Проверка "Значение по умолчанию"', async () => await dec.simpleText(el.input.getValue,
                ['Значение по умолчанию', '', entry.max],
                params.defaultValue,
                el.input));

            it('Нажатие кнопки закрытия модального окна',
                async () => await dec.simple(el.modal.additionalDataEdit.closeHandler,
                    [entry.max],
                    el.modal.additionalDataEdit));

            it('Отсутствие модального окна "Добавить дополнительное поле"',
                async () => await dec.simple(el.modal.additionalDataEdit.initClose,
                    [entry.max],
                    el.modal.additionalDataEdit));
        });

        describe('Удаление тестовых данных', () => {
            type.bef();
            aft();
            dataRemove(type);
        });

    });

    // Тип поля «Текстовый». Удаление необязательных параметров с максимальным количеством параметров.
    const typeTextMaxParams = () => describe(`Дополнительные данные. Тип поля: "Текстовый". ${type.person}. 
    Редактирование. Удаление необязательных параметров с максимальным количеством параметров.`, () => {
        const params = {
            name: 'typeTextMaxParamsName',
            description: 'typeTextMaxParamsDescription',
            defaultValue: 'typeTextMaxParamsValue'
        };

        describe('API - добавление', () => {
            type.bef();

            aft();

            it('Добавление дополнительных данных', async () => {
                const data = {
                    name: params.name,
                    comment: params.description,
                    type_id: 1,
                    default_value: params.defaultValue,
                    items: ''
                };
                const cook = await page.base.getCookie('token');
                await dec.simple(api.putAdditionalData,
                    [[data], type.api, cook.text],
                    api.putAdditionalData);
            });
        });

        describe('Редактирование', () => {
            type.bef();

            aft();

            it(`Отображение ${type.count + 1} записей в таблице`, async () => await dec.simple(el.table.size,
                [type.count + 1, entry.max],
                el.table,));

            it(`Нажатие по первой строке в таблице`, async () => await dec.simple(el.table.strHandler,
                [1, entry.max],
                el.table));

            it('Нажатие кнопки "Редактировать"', async () => await dec.simple(el.butIcBefore.handler,
                [but.edit, entry.max],
                el.butIcBefore));

            it('Отображене модального окна "Редактировать дополнительное поле"',
                async () => await dec.simple(el.modal.additionalDataEdit.init,
                    [entry.max],
                    el.modal.additionalDataEdit));

            it('Удаление значения "Описание"',async () => await dec.simple(el.input.backSpace,
                ['Описание', '', entry.max],
                el.input));

            it('Удаление значения "Значение по умолчанию"',async () => await dec.simple(el.input.backSpace,
                ['Значение по умолчанию', '', entry.max],
                el.input));

            it('Нажатие кнопки "Сохранить"', async () => await dec.simple(el.button.handler,
                ['Сохранить', entry.max],
                el.button));

            it('Отображение сообщения "Сохранено успешно"',
                async () => await dec.simple(el.success.success,
                    ['Сохранено успешно', entry.max],
                    el.success));

            it('Отсутствие модального окна "Добавить дополнительное поле"',
                async () => await dec.simple(el.modal.additionalDataAdd.initClose,
                    [entry.max],
                    el.modal.additionalDataAdd));
        });

        describe('Проверка таблицы', () => {
            type.bef();

            aft();

            it(`Отображение ${type.count + 1} записей в таблице`, async () => await dec.simple(el.table.size,
                [type.count + 1, entry.max],
                el.table));

            it('Проверка "Название поля"', async () => await dec.simpleText(el.table.cellGetText,
                ['Название поля', 1, 1, entry.max],
                params.name,
                el.table));

            it('Проверка "Тип поля"', async () => await dec.simpleText(el.table.cellGetText,
                ['Тип поля', 1, 2, entry.max],
                'Текстовый',
                el.table));

            it('Проверка "Описание"', async () => await dec.simpleText(el.table.cellGetText,
                ['Описание', 1, 3, entry.max],
                '',
                el.table));

            it('Проверка "Значение по умолчанию"', async () => await dec.simpleText(el.table.cellGetText,
                ['Значение по умолчанию', 1, 4, entry.max],
                '',
                el.table));
        });

        describe('Проверка параметров', () => {
            type.bef();

            aft();

            it(`Нажатие по первой строке в таблице`, async () => await dec.simple(el.table.strHandler,
                [1, entry.max],
                el.table));

            it('Нажатие кнопки "Редактировать"', async () => await dec.simple(el.butIcBefore.handler,
                [but.edit, entry.max],
                el.butIcBefore));

            it('Отображене модального окна "Редактировать дополнительное поле"',
                async () => await dec.simple(el.modal.additionalDataEdit.init,
                    [entry.max],
                    el.modal.additionalDataEdit));

            it('Проверка "Название поля"', async () => await dec.simpleText(el.input.getValue,
                ['Название поля', '', entry.max],
                params.name,
                el.input));

            it('Проверка "Описание"', async () => await dec.simpleText(el.input.getValue,
                ['Описание', '', entry.max],
               '',
                el.input));

            it('Проверка "Тип поля"', async () => await dec.simpleText(el.select.getText,
                ['Тип поля', 'Текстовый', entry.max],
                'Текстовый',
                el.input));

            it('Проверка "Значение по умолчанию"', async () => await dec.simpleText(el.input.getValue,
                ['Значение по умолчанию', '', entry.max],
               '',
                el.input));

            it('Нажатие кнопки закрытия модального окна',
                async () => await dec.simple(el.modal.additionalDataEdit.closeHandler,
                    [entry.max],
                    el.modal.additionalDataEdit));

            it('Отсутствие модального окна "Добавить дополнительное поле"',
                async () => await dec.simple(el.modal.additionalDataEdit.initClose,
                    [entry.max],
                    el.modal.additionalDataEdit));
        });

        describe('Удаление тестовых данных', () => {
            type.bef();
            aft();
            dataRemove(type);
        });

    });

    // Тип поля «Текстовый». Добавление необязательных параметров с максимальным количеством параметров.
    const typeTextEditAllMaxParams = () => describe(`Дополнительные данные. Тип поля: "Текстовый". ${type.person}.
    Редактирование. Редактирование всех параметров с максимальным количеством параметров.`, () => {
        const params = {
            data1: {
                name: 'TestName',
                description: 'TestDescription',
                defaultValue: 'TestValue'
            },
            data2: {
                name: 'typeTextMaxParamsName',
                description: 'typeTextMaxParamsDescription',
                defaultValue: 'typeTextMaxParamsValue'
            }
        };

        describe('API - добавление', () => {
            type.bef();

            aft();

            it('Добавление дополнительных данных', async () => {
                const data = {
                    name: params.data1.name,
                    comment: params.data1.description,
                    type_id: 1,
                    default_value: params.data1.defaultValue,
                    items: ''
                };
                const cook = await page.base.getCookie('token');
                await dec.simple(api.putAdditionalData,
                    [[data], type.api, cook.text],
                    api.putAdditionalData);
            });
        });

        describe('Редактирование', () => {
            type.bef();

            aft();

            it(`Отображение ${type.count + 1} записей в таблице`, async () => await dec.simple(el.table.size,
                [type.count + 1, entry.max],
                el.table,));

            it(`Нажатие по первой строке в таблице`, async () => await dec.simple(el.table.strHandler,
                [1, entry.max],
                el.table));

            it('Нажатие кнопки "Редактировать"', async () => await dec.simple(el.butIcBefore.handler,
                [but.edit, entry.max],
                el.butIcBefore));

            it('Отображене модального окна "Редактировать дополнительное поле"',
                async () => await dec.simple(el.modal.additionalDataEdit.init,
                    [entry.max],
                    el.modal.additionalDataEdit));

            it('Удаление значения "Название поля"',async () => await dec.simple(el.input.backSpace,
                ['Название поля', '', entry.max],
                el.input));

            it('Ввод "Название поля"', async () => await dec.simple(el.input.sendKeys,
                ['Название поля', '', params.data2.name, entry.max],
                el.input));

            it('Удаление значения "Описание"',async () => await dec.simple(el.input.backSpace,
                ['Описание', '', entry.max],
                el.input));

            it('Ввод "Описание"', async () => await dec.simple(el.input.sendKeys,
                ['Описание', '', params.data2.description, entry.max],
                el.input));

            it('Удаление значения "Значение по умолчанию"',async () => await dec.simple(el.input.backSpace,
                ['Значение по умолчанию', '', entry.max],
                el.input));

            it('Ввод "Значение по умолчанию"', async () => await dec.simple(el.input.sendKeys,
                ['Значение по умолчанию', '', params.data2.defaultValue, entry.max],
                el.input));

            it('Нажатие кнопки "Сохранить"', async () => await dec.simple(el.button.handler,
                ['Сохранить', entry.max],
                el.button));

            it('Отображение сообщения "Сохранено успешно"',
                async () => await dec.simple(el.success.success,
                    ['Сохранено успешно', entry.max],
                    el.success));

            it('Отсутствие модального окна "Добавить дополнительное поле"',
                async () => await dec.simple(el.modal.additionalDataAdd.initClose,
                    [entry.max],
                    el.modal.additionalDataAdd));
        });

        describe('Проверка таблицы', () => {
            type.bef();

            aft();

            it(`Отображение ${type.count + 1} записей в таблице`, async () => await dec.simple(el.table.size,
                [type.count + 1, entry.max],
                el.table));

            it('Проверка "Название поля"', async () => await dec.simpleText(el.table.cellGetText,
                ['Название поля', 1, 1, entry.max],
                params.data2.name,
                el.table));

            it('Проверка "Тип поля"', async () => await dec.simpleText(el.table.cellGetText,
                ['Тип поля', 1, 2, entry.max],
                'Текстовый',
                el.table));

            it('Проверка "Описание"', async () => await dec.simpleText(el.table.cellGetText,
                ['Описание', 1, 3, entry.max],
                params.data2.description,
                el.table));

            it('Проверка "Значение по умолчанию"', async () => await dec.simpleText(el.table.cellGetText,
                ['Значение по умолчанию', 1, 4, entry.max],
                params.data2.defaultValue,
                el.table));
        });

        describe('Проверка параметров', () => {
            type.bef();

            aft();

            it(`Нажатие по первой строке в таблице`, async () => await dec.simple(el.table.strHandler,
                [1, entry.max],
                el.table));

            it('Нажатие кнопки "Редактировать"', async () => await dec.simple(el.butIcBefore.handler,
                [but.edit, entry.max],
                el.butIcBefore));

            it('Отображене модального окна "Редактировать дополнительное поле"',
                async () => await dec.simple(el.modal.additionalDataEdit.init,
                    [entry.max],
                    el.modal.additionalDataEdit));

            it('Проверка "Название поля"', async () => await dec.simpleText(el.input.getValue,
                ['Название поля', '', entry.max],
                params.data2.name,
                el.input));

            it('Проверка "Описание"', async () => await dec.simpleText(el.input.getValue,
                ['Описание', '', entry.max],
                params.data2.description,
                el.input));

            it('Проверка "Тип поля"', async () => await dec.simpleText(el.select.getText,
                ['Тип поля', 'Текстовый', entry.max],
                'Текстовый',
                el.input));

            it('Проверка "Значение по умолчанию"', async () => await dec.simpleText(el.input.getValue,
                ['Значение по умолчанию', '', entry.max],
                params.data2.defaultValue,
                el.input));

            it('Нажатие кнопки закрытия модального окна',
                async () => await dec.simple(el.modal.additionalDataEdit.closeHandler,
                    [entry.max],
                    el.modal.additionalDataEdit));

            it('Отсутствие модального окна "Добавить дополнительное поле"',
                async () => await dec.simple(el.modal.additionalDataEdit.initClose,
                    [entry.max],
                    el.modal.additionalDataEdit));
        });

        describe('Удаление тестовых данных', () => {
            type.bef();
            aft();
            dataRemove(type);
        });

    });

    // Тип поля «Текстовый». Попытка редактирования без «Название поля».
    const typeTextRemoveName = () => describe(`Дополнительные данные. Тип поля: "Текстовый". ${type.person}. 
    Редактирование. Попытка редактирования без «Название поля».`, () => {
        const params = {
            name: 'typeTextMaxParamsName',
            description: 'typeTextMaxParamsDescription',
            defaultValue: 'typeTextMaxParamsValue'
        };

        describe('API - добавление', () => {
            type.bef();

            aft();

            it('Добавление дополнительных данных', async () => {
                const data = {
                    name: params.name,
                    comment: params.description,
                    type_id: 1,
                    default_value: params.defaultValue,
                    items: ''
                };
                const cook = await page.base.getCookie('token');
                await dec.simple(api.putAdditionalData,
                    [[data], type.api, cook.text],
                    api.putAdditionalData);
            });
        });

        describe('Редактирование', () => {
            type.bef();

            aft();

            it(`Отображение ${type.count + 1} записей в таблице`, async () => await dec.simple(el.table.size,
                [type.count + 1, entry.max],
                el.table,));

            it(`Нажатие по первой строке в таблице`, async () => await dec.simple(el.table.strHandler,
                [1, entry.max],
                el.table));

            it('Нажатие кнопки "Редактировать"', async () => await dec.simple(el.butIcBefore.handler,
                [but.edit, entry.max],
                el.butIcBefore));

            it('Отображене модального окна "Редактировать дополнительное поле"',
                async () => await dec.simple(el.modal.additionalDataEdit.init,
                    [entry.max],
                    el.modal.additionalDataEdit));

            it('Удаление значения "Название поля"',async () => await dec.simple(el.input.backSpace,
                ['Название поля', '', entry.max],
                el.input));

            it('Кнопка "Сохранить" - не активна', async () => await dec.simple(el.button.disabled,
                ['Сохранить', entry.max],
                el.button));

            it('Нажатие кнопки "Сохранить"', async () => await dec.simpleFalse(el.button.handlerNoActive,
                ['Сохранить', entry.max],
                el.button));

            it('Модальное окно "Редактировать дополнительное поле" не закрыто',
                async () => await dec.simpleFalse(el.modal.additionalDataEdit.initClose,
                    [entry.min],
                    el.modal.additionalDataEdit));

            it('Нажатие кнопки закрытия модального окна',
                async () => await dec.simple(el.modal.additionalDataEdit.closeHandler,
                    [entry.max],
                    el.modal.additionalDataEdit));

            it('Отсутствие модального окна "Добавить дополнительное поле"',
                async () => await dec.simple(el.modal.additionalDataEdit.initClose,
                    [entry.max],
                    el.modal.additionalDataEdit));
        });

        describe('Проверка таблицы', () => {
            type.bef();

            aft();

            it(`Отображение ${type.count + 1} записей в таблице`, async () => await dec.simple(el.table.size,
                [type.count + 1, entry.max],
                el.table));

            it('Проверка "Название поля"', async () => await dec.simpleText(el.table.cellGetText,
                ['Название поля', 1, 1, entry.max],
                params.name,
                el.table));

            it('Проверка "Тип поля"', async () => await dec.simpleText(el.table.cellGetText,
                ['Тип поля', 1, 2, entry.max],
                'Текстовый',
                el.table));

            it('Проверка "Описание"', async () => await dec.simpleText(el.table.cellGetText,
                ['Описание', 1, 3, entry.max],
                params.description,
                el.table));

            it('Проверка "Значение по умолчанию"', async () => await dec.simpleText(el.table.cellGetText,
                ['Значение по умолчанию', 1, 4, entry.max],
                params.defaultValue,
                el.table));
        });

        describe('Проверка параметров', () => {
            type.bef();

            aft();

            it(`Нажатие по первой строке в таблице`, async () => await dec.simple(el.table.strHandler,
                [1, entry.max],
                el.table));

            it('Нажатие кнопки "Редактировать"', async () => await dec.simple(el.butIcBefore.handler,
                [but.edit, entry.max],
                el.butIcBefore));

            it('Отображене модального окна "Редактировать дополнительное поле"',
                async () => await dec.simple(el.modal.additionalDataEdit.init,
                    [entry.max],
                    el.modal.additionalDataEdit));

            it('Проверка "Название поля"', async () => await dec.simpleText(el.input.getValue,
                ['Название поля', '', entry.max],
                params.name,
                el.input));

            it('Проверка "Описание"', async () => await dec.simpleText(el.input.getValue,
                ['Описание', '', entry.max],
                params.description,
                el.input));

            it('Проверка "Тип поля"', async () => await dec.simpleText(el.select.getText,
                ['Тип поля', 'Текстовый', entry.max],
                'Текстовый',
                el.input));

            it('Проверка "Значение по умолчанию"', async () => await dec.simpleText(el.input.getValue,
                ['Значение по умолчанию', '', entry.max],
                params.defaultValue,
                el.input));

            it('Нажатие кнопки закрытия модального окна',
                async () => await dec.simple(el.modal.additionalDataEdit.closeHandler,
                    [entry.max],
                    el.modal.additionalDataEdit));

            it('Отсутствие модального окна "Добавить дополнительное поле"',
                async () => await dec.simple(el.modal.additionalDataEdit.initClose,
                    [entry.max],
                    el.modal.additionalDataEdit));
        });

        describe('Удаление тестовых данных', () => {
            type.bef();
            aft();
            dataRemove(type);
        });

    });

    // Тип поля «Текстовый». Попытка дублирования.
    const typeTextDuplicate = () => describe(`Дополнительные данные. Тип поля: "Текстовый". ${type.person}. 
    Редактирование. Попытка дублирования.`, () => {
        const params = {
            data1: {
                name: 'typeTextDuplicateName',
            },
            data2: {
                name: 'TestName',
            },
            error: 'Такое название уже используется'
        };

        describe('API - добавление', () => {
            type.bef();

            aft();

            it('Добавление дополнительных данных', async () => {
                const cook = await page.base.getCookie('token');

                const data1 = {
                    name: params.data1.name,
                    comment: '',
                    type_id: 2,
                    default_value: '',
                    items: ''
                };
                await dec.simple(api.putAdditionalData,
                    [[data1], type.api, cook.text],
                    api.putAdditionalData);

                const data2 = {
                    name: params.data2.name,
                    comment: '',
                    type_id: 1,
                    default_value: '',
                    items: ''
                };
                await dec.simple(api.putAdditionalData,
                    [[data2], type.api, cook.text],
                    api.putAdditionalData);
            });
        });

        describe('Редактирование', () => {
            type.bef();

            aft();

            it(`Отображение ${type.count + 2} записей в таблице`, async () => await dec.simple(el.table.size,
                [type.count + 2, entry.max],
                el.table,));

            it(`Нажатие по первой строке в таблице`, async () => await dec.simple(el.table.strHandler,
                [1, entry.max],
                el.table));

            it('Нажатие кнопки "Редактировать"', async () => await dec.simple(el.butIcBefore.handler,
                [but.edit, entry.max],
                el.butIcBefore));

            it('Отображене модального окна "Редактировать дополнительное поле"',
                async () => await dec.simple(el.modal.additionalDataEdit.init,
                    [entry.max],
                    el.modal.additionalDataEdit));

            it('Удаление значения "Название поля"',async () => await dec.simple(el.input.backSpace,
                ['Название поля', '', entry.max],
                el.input));

            it('Ввод "Название поля"', async () => await dec.simple(el.input.sendKeys,
                ['Название поля', '', params.data1.name, entry.max],
                el.input));

            it('Нажатие кнопки "Сохранить"', async () => await dec.simple(el.button.handler,
                ['Сохранить', entry.max],
                el.button));

            it('Отображение ошибки',
                async () => await dec.simple(el.error.error,
                    [params.error, entry.max],
                    el.error));

            it('Нажатие кнопки закрытия модального окна',
                async () => await dec.simple(el.modal.additionalDataEdit.closeHandler,
                    [entry.max],
                    el.modal.additionalDataEdit));

            it('Отсутствие модального окна "Добавить дополнительное поле"',
                async () => await dec.simple(el.modal.additionalDataAdd.initClose,
                    [entry.max],
                    el.modal.additionalDataAdd));
        });

        describe('Проверка таблицы', () => {
            type.bef();

            aft();

            it(`Отображение ${type.count + 2} записей в таблице`, async () => await dec.simple(el.table.size,
                [type.count + 2, entry.max],
                el.table));

            it('Проверка "Название поля"', async () => await dec.simpleText(el.table.cellGetText,
                ['Название поля', 1, 1, entry.max],
                params.data2.name,
                el.table));

            it('Проверка "Тип поля"', async () => await dec.simpleText(el.table.cellGetText,
                ['Тип поля', 1, 2, entry.max],
                'Текстовый',
                el.table));

            it('Проверка "Описание"', async () => await dec.simpleText(el.table.cellGetText,
                ['Описание', 1, 3, entry.max],
                '',
                el.table));

            it('Проверка "Значение по умолчанию"', async () => await dec.simpleText(el.table.cellGetText,
                ['Значение по умолчанию', 1, 4, entry.max],
                '',
                el.table));

        });

        describe('Проверка параметров', () => {
            type.bef();

            aft();

            it(`Отображение ${type.count + 2} записей в таблице`, async () => await dec.simple(el.table.size,
                [type.count + 2, entry.max],
                el.table));

            it(`Нажатие по первой строке в таблице`, async () => await dec.simple(el.table.strHandler,
                [1, entry.max],
                el.table));

            it('Нажатие кнопки "Редактировать"', async () => await dec.simple(el.butIcBefore.handler,
                [but.edit, entry.max],
                el.butIcBefore));

            it('Отображене модального окна "Редактировать дополнительное поле"',
                async () => await dec.simple(el.modal.additionalDataEdit.init,
                    [entry.max],
                    el.modal.additionalDataEdit));

            it('Проверка "Название поля"', async () => await dec.simpleText(el.input.getValue,
                ['Название поля', '', entry.max],
                params.data2.name,
                el.input));

            it('Проверка "Описание"', async () => await dec.simpleText(el.input.getValue,
                ['Описание', '', entry.max],
                '',
                el.input));

            it('Проверка "Тип поля"', async () => await dec.simpleText(el.select.getText,
                ['Тип поля', 'Текстовый', entry.max],
                'Текстовый',
                el.input));

            it('Проверка "Значение по умолчанию"', async () => await dec.simpleText(el.input.getValue,
                ['Значение по умолчанию', '', entry.max],
                '',
                el.input));

            it('Нажатие кнопки закрытия модального окна',
                async () => await dec.simple(el.modal.additionalDataEdit.closeHandler,
                    [entry.max],
                    el.modal.additionalDataEdit));

            it('Отсутствие модального окна "Добавить дополнительное поле"',
                async () => await dec.simple(el.modal.additionalDataEdit.initClose,
                    [entry.max],
                    el.modal.additionalDataEdit));
        });

        describe('Удаление тестовых данных', () => {
            type.bef();
            aft();
            dataRemove(type);
        });

    });

    // Тип поля «Текстовый». Проверки редактирования.
    const typeText = () => describe(`Дополнительные данные. Тип поля: "Текстовый". ${type.person}. 
    Проверки редактирования.`, () => {
        typeTextMinParams();
        typeTextMaxParams();
        typeTextEditAllMaxParams();
        typeTextRemoveName();
        typeTextDuplicate();
    });

    // Тип поля «Графический».
    // Тип поля «Графический». Добавление необязательных параметров с минимальным количеством параметров.
    const typeGraficMinParams = () => describe(`Дополнительные данные. Тип поля: "Графический. ${type.person}. 
    Редактирование. Добавление необязательных параметров с минимальным количеством параметров.`, () => {
        const params = {
            name: 'typeGraficMinParamsName',
            description: 'typeGraficMinParamsDescription'
        };

        describe('API - добавление', () => {
            type.bef();

            aft();

            it('Добавление дополнительных данных', async () => {
                const data = {
                    name: params.name,
                    comment: '',
                    type_id: 2,
                    default_value: '',
                    items: ''
                };
                const cook = await page.base.getCookie('token');
                await dec.simple(api.putAdditionalData,
                    [[data], type.api, cook.text],
                    api.putAdditionalData);
            });
        });

        describe('Редактирование', () => {
            type.bef();

            aft();

            it(`Отображение ${type.count + 1} записей в таблице`, async () => await dec.simple(el.table.size,
                [type.count + 1, entry.max],
                el.table,));

            it(`Нажатие по первой строке в таблице`, async () => await dec.simple(el.table.strHandler,
                [1, entry.max],
                el.table));

            it('Нажатие кнопки "Редактировать"', async () => await dec.simple(el.butIcBefore.handler,
                [but.edit, entry.max],
                el.butIcBefore));

            it('Отображене модального окна "Редактировать дополнительное поле"',
                async () => await dec.simple(el.modal.additionalDataEdit.init,
                    [entry.max],
                    el.modal.additionalDataEdit));

            it('Ввод "Описание"', async () => await dec.simple(el.input.sendKeys,
                ['Описание', '', params.description, entry.max],
                el.input));

            it('Нажатие кнопки "Сохранить"', async () => await dec.simple(el.button.handler,
                ['Сохранить', entry.max],
                el.button));

            it('Отображение сообщения "Сохранено успешно"',
                async () => await dec.simple(el.success.success,
                    ['Сохранено успешно', entry.max],
                    el.success));

            it('Отсутствие модального окна "Добавить дополнительное поле"',
                async () => await dec.simple(el.modal.additionalDataAdd.initClose,
                    [entry.max],
                    el.modal.additionalDataAdd));
        });

        describe('Проверка таблицы', () => {
            type.bef();

            aft();

            it(`Отображение ${type.count + 1} записей в таблице`, async () => await dec.simple(el.table.size,
                [type.count + 1, entry.max],
                el.table));

            it('Проверка "Название поля"', async () => await dec.simpleText(el.table.cellGetText,
                ['Название поля', 1, 1, entry.max],
                params.name,
                el.table));

            it('Проверка "Тип поля"', async () => await dec.simpleText(el.table.cellGetText,
                ['Тип поля', 1, 2, entry.max],
                'Графический',
                el.table));

            it('Проверка "Описание"', async () => await dec.simpleText(el.table.cellGetText,
                ['Описание', 1, 3, entry.max],
                params.description,
                el.table));

            it('Проверка "Значение по умолчанию"', async () => await dec.simpleText(el.table.cellGetText,
                ['Значение по умолчанию', 1, 4, entry.max],
                '',
                el.table));
        });

        describe('Проверка параметров', () => {
            type.bef();

            aft();

            it(`Нажатие по первой строке в таблице`, async () => await dec.simple(el.table.strHandler,
                [1, entry.max],
                el.table));

            it('Нажатие кнопки "Редактировать"', async () => await dec.simple(el.butIcBefore.handler,
                [but.edit, entry.max],
                el.butIcBefore));

            it('Отображене модального окна "Редактировать дополнительное поле"',
                async () => await dec.simple(el.modal.additionalDataEdit.init,
                    [entry.max],
                    el.modal.additionalDataEdit));

            it('Проверка "Название поля"', async () => await dec.simpleText(el.input.getValue,
                ['Название поля', '', entry.max],
                params.name,
                el.input));

            it('Проверка "Описание"', async () => await dec.simpleText(el.input.getValue,
                ['Описание', '', entry.max],
                params.description,
                el.input));

            it('Проверка "Тип поля"', async () => await dec.simpleText(el.select.getText,
                ['Тип поля', 'Графический', entry.max],
                'Графический',
                el.input));

            it('Нажатие кнопки закрытия модального окна',
                async () => await dec.simple(el.modal.additionalDataEdit.closeHandler,
                    [entry.max],
                    el.modal.additionalDataEdit));

            it('Отсутствие модального окна "Добавить дополнительное поле"',
                async () => await dec.simple(el.modal.additionalDataEdit.initClose,
                    [entry.max],
                    el.modal.additionalDataEdit));
        });

        describe('Удаление тестовых данных', () => {
            type.bef();
            aft();
            dataRemove(type);
        });

    });

    // Тип поля «Графический». Удаление необязательных параметров с максимальным количеством параметров.
    const typeGraficMaxParams = () => describe(`Дополнительные данные. Тип поля: "Графический". ${type.person}. 
    Редактирование. Удаление необязательных параметров с максимальным количеством параметров.`, () => {
        const params = {
            name: 'typeGraficMaxParamsName',
            description: 'typeGraficMaxParamsDescription',
        };

        describe('API - добавление', () => {

            type.bef();
            aft();

            it('Добавление дополнительных данных', async () => {
                const data = {
                    name: params.name,
                    comment: params.description,
                    type_id: 2,
                    default_value: '',
                    items: ''
                };
                const cook = await page.base.getCookie('token');
                await dec.simple(api.putAdditionalData,
                    [[data], type.api, cook.text],
                    api.putAdditionalData);
            });
        });

        describe('Редактирование', () => {
            type.bef();

            aft();

            it(`Отображение ${type.count + 1} записей в таблице`, async () => await dec.simple(el.table.size,
                [type.count + 1, entry.max],
                el.table,));

            it(`Нажатие по первой строке в таблице`, async () => await dec.simple(el.table.strHandler,
                [1, entry.max],
                el.table));

            it('Нажатие кнопки "Редактировать"', async () => await dec.simple(el.butIcBefore.handler,
                [but.edit, entry.max],
                el.butIcBefore));

            it('Отображене модального окна "Редактировать дополнительное поле"',
                async () => await dec.simple(el.modal.additionalDataEdit.init,
                    [entry.max],
                    el.modal.additionalDataEdit));

            it('Удаление значения "Описание"',async () => await dec.simple(el.input.backSpace,
                ['Описание', '', entry.max],
                el.input));

            it('Нажатие кнопки "Сохранить"', async () => await dec.simple(el.button.handler,
                ['Сохранить', entry.max],
                el.button));

            it('Отображение сообщения "Сохранено успешно"',
                async () => await dec.simple(el.success.success,
                    ['Сохранено успешно', entry.max],
                    el.success));

            it('Отсутствие модального окна "Добавить дополнительное поле"',
                async () => await dec.simple(el.modal.additionalDataAdd.initClose,
                    [entry.max],
                    el.modal.additionalDataAdd));
        });

        describe('Проверка таблицы', () => {
            type.bef();

            aft();

            it(`Отображение ${type.count + 1} записей в таблице`, async () => await dec.simple(el.table.size,
                [type.count + 1, entry.max],
                el.table));

            it('Проверка "Название поля"', async () => await dec.simpleText(el.table.cellGetText,
                ['Название поля', 1, 1, entry.max],
                params.name,
                el.table));

            it('Проверка "Тип поля"', async () => await dec.simpleText(el.table.cellGetText,
                ['Тип поля', 1, 2, entry.max],
                'Графический',
                el.table));

            it('Проверка "Описание"', async () => await dec.simpleText(el.table.cellGetText,
                ['Описание', 1, 3, entry.max],
                '',
                el.table));
        });

        describe('Проверка параметров', () => {
            type.bef();

            aft();

            it(`Нажатие по первой строке в таблице`, async () => await dec.simple(el.table.strHandler,
                [1, entry.max],
                el.table));

            it('Нажатие кнопки "Редактировать"', async () => await dec.simple(el.butIcBefore.handler,
                [but.edit, entry.max],
                el.butIcBefore));

            it('Отображене модального окна "Редактировать дополнительное поле"',
                async () => await dec.simple(el.modal.additionalDataEdit.init,
                    [entry.max],
                    el.modal.additionalDataEdit));

            it('Проверка "Название поля"', async () => await dec.simpleText(el.input.getValue,
                ['Название поля', '', entry.max],
                params.name,
                el.input));

            it('Проверка "Описание"', async () => await dec.simpleText(el.input.getValue,
                ['Описание', '', entry.max],
                '',
                el.input));

            it('Проверка "Тип поля"', async () => await dec.simpleText(el.select.getText,
                ['Тип поля', 'Графический', entry.max],
                'Графический',
                el.input));

            it('Нажатие кнопки закрытия модального окна',
                async () => await dec.simple(el.modal.additionalDataEdit.closeHandler,
                    [entry.max],
                    el.modal.additionalDataEdit));

            it('Отсутствие модального окна "Добавить дополнительное поле"',
                async () => await dec.simple(el.modal.additionalDataEdit.initClose,
                    [entry.max],
                    el.modal.additionalDataEdit));
        });

        describe('Удаление тестовых данных', () => {
            type.bef();
            aft();
            dataRemove(type);
        });

    });

    // Тип поля «Графический». Редактирование всех параметров с максимальным количеством параметров.
    const typeGraficEditAllMaxParams = () => describe(`Дополнительные данные. Тип поля: "Графический". ${type.person}.
    Редактирование. Редактирование всех параметров с максимальным количеством параметров.`, () => {
        const params = {
            data1: {
                name: 'TestName',
                description: 'TestDescription',
            },
            data2: {
                name: 'typeGraficMaxParamsName',
                description: 'typeGraficMaxParamsDescription',
            }
        };

        describe('API - добавление', () => {
            type.bef();

            aft();

            it('Добавление дополнительных данных', async () => {
                const data = {
                    name: params.data1.name,
                    comment: params.data1.description,
                    type_id: 2,
                    default_value: '',
                    items: ''
                };
                const cook = await page.base.getCookie('token');
                await dec.simple(api.putAdditionalData,
                    [[data], type.api, cook.text],
                    api.putAdditionalData);
            });
        });

        describe('Редактирование', () => {
            type.bef();

            aft();

            it(`Отображение ${type.count + 1} записей в таблице`, async () => await dec.simple(el.table.size,
                [type.count + 1, entry.max],
                el.table,));

            it(`Нажатие по первой строке в таблице`, async () => await dec.simple(el.table.strHandler,
                [1, entry.max],
                el.table));

            it('Нажатие кнопки "Редактировать"', async () => await dec.simple(el.butIcBefore.handler,
                [but.edit, entry.max],
                el.butIcBefore));

            it('Отображене модального окна "Редактировать дополнительное поле"',
                async () => await dec.simple(el.modal.additionalDataEdit.init,
                    [entry.max],
                    el.modal.additionalDataEdit));

            it('Удаление значения "Название поля"',async () => await dec.simple(el.input.backSpace,
                ['Название поля', '', entry.max],
                el.input));

            it('Ввод "Название поля"', async () => await dec.simple(el.input.sendKeys,
                ['Название поля', '', params.data2.name, entry.max],
                el.input));

            it('Удаление значения "Описание"',async () => await dec.simple(el.input.backSpace,
                ['Описание', '', entry.max],
                el.input));

            it('Ввод "Описание"', async () => await dec.simple(el.input.sendKeys,
                ['Описание', '', params.data2.description, entry.max],
                el.input));

            it('Нажатие кнопки "Сохранить"', async () => await dec.simple(el.button.handler,
                ['Сохранить', entry.max],
                el.button));

            it('Отображение сообщения "Сохранено успешно"',
                async () => await dec.simple(el.success.success,
                    ['Сохранено успешно', entry.max],
                    el.success));

            it('Отсутствие модального окна "Добавить дополнительное поле"',
                async () => await dec.simple(el.modal.additionalDataAdd.initClose,
                    [entry.max],
                    el.modal.additionalDataAdd));
        });

        describe('Проверка таблицы', () => {
            type.bef();

            aft();

            it(`Отображение ${type.count + 1} записей в таблице`, async () => await dec.simple(el.table.size,
                [type.count + 1, entry.max],
                el.table));

            it('Проверка "Название поля"', async () => await dec.simpleText(el.table.cellGetText,
                ['Название поля', 1, 1, entry.max],
                params.data2.name,
                el.table));

            it('Проверка "Тип поля"', async () => await dec.simpleText(el.table.cellGetText,
                ['Тип поля', 1, 2, entry.max],
                'Графический',
                el.table));

            it('Проверка "Описание"', async () => await dec.simpleText(el.table.cellGetText,
                ['Описание', 1, 3, entry.max],
                params.data2.description,
                el.table));
        });

        describe('Проверка параметров', () => {
            type.bef();

            aft();

            it(`Нажатие по первой строке в таблице`, async () => await dec.simple(el.table.strHandler,
                [1, entry.max],
                el.table));

            it('Нажатие кнопки "Редактировать"', async () => await dec.simple(el.butIcBefore.handler,
                [but.edit, entry.max],
                el.butIcBefore));

            it('Отображене модального окна "Редактировать дополнительное поле"',
                async () => await dec.simple(el.modal.additionalDataEdit.init,
                    [entry.max],
                    el.modal.additionalDataEdit));

            it('Проверка "Название поля"', async () => await dec.simpleText(el.input.getValue,
                ['Название поля', '', entry.max],
                params.data2.name,
                el.input));

            it('Проверка "Описание"', async () => await dec.simpleText(el.input.getValue,
                ['Описание', '', entry.max],
                params.data2.description,
                el.input));

            it('Проверка "Тип поля"', async () => await dec.simpleText(el.select.getText,
                ['Тип поля', 'Графический', entry.max],
                'Графический',
                el.input));

            it('Нажатие кнопки закрытия модального окна',
                async () => await dec.simple(el.modal.additionalDataEdit.closeHandler,
                    [entry.max],
                    el.modal.additionalDataEdit));

            it('Отсутствие модального окна "Добавить дополнительное поле"',
                async () => await dec.simple(el.modal.additionalDataEdit.initClose,
                    [entry.max],
                    el.modal.additionalDataEdit));
        });

        describe('Удаление тестовых данных', () => {
            type.bef();
            aft();
            dataRemove(type);
        });

    });

    // Тип поля «Графический». Попытка редактирования без «Название поля».
    const typeGraficRemoveName = () => describe(`Дополнительные данные. Тип поля: "Графический". ${type.person}. 
    Редактирование. Попытка редактирования без "Название поля".`, () => {
        const params = {
            name: 'typeGraficRemoveNameName',
            description: 'typeGraficRemoveNameDescription',
        };

        describe('API - добавление', () => {
            type.bef();

            aft();

            it('Добавление дополнительных данных', async () => {
                const data = {
                    name: params.name,
                    comment: params.description,
                    type_id: 2,
                    default_value: '',
                    items: ''
                };
                const cook = await page.base.getCookie('token');
                await dec.simple(api.putAdditionalData,
                    [[data], type.api, cook.text],
                    api.putAdditionalData);
            });
        });

        describe('Редактирование', () => {
            type.bef();

            aft();

            it(`Отображение ${type.count + 1} записей в таблице`, async () => await dec.simple(el.table.size,
                [type.count + 1, entry.max],
                el.table,));

            it(`Нажатие по первой строке в таблице`, async () => await dec.simple(el.table.strHandler,
                [1, entry.max],
                el.table));

            it('Нажатие кнопки "Редактировать"', async () => await dec.simple(el.butIcBefore.handler,
                [but.edit, entry.max],
                el.butIcBefore));

            it('Отображене модального окна "Редактировать дополнительное поле"',
                async () => await dec.simple(el.modal.additionalDataEdit.init,
                    [entry.max],
                    el.modal.additionalDataEdit));

            it('Удаление значения "Название поля"',async () => await dec.simple(el.input.backSpace,
                ['Название поля', '', entry.max],
                el.input));

            it('Кнопка "Сохранить" - не активна', async () => await dec.simple(el.button.disabled,
                ['Сохранить', entry.max],
                el.button));

            it('Нажатие кнопки "Сохранить"', async () => await dec.simpleFalse(el.button.handlerNoActive,
                ['Сохранить', entry.max],
                el.button));

            it('Модальное окно "Редактировать дополнительное поле" не закрыто',
                async () => await dec.simpleFalse(el.modal.additionalDataEdit.initClose,
                    [entry.min],
                    el.modal.additionalDataEdit));

            it('Нажатие кнопки закрытия модального окна',
                async () => await dec.simple(el.modal.additionalDataEdit.closeHandler,
                    [entry.max],
                    el.modal.additionalDataEdit));

            it('Отсутствие модального окна "Добавить дополнительное поле"',
                async () => await dec.simple(el.modal.additionalDataEdit.initClose,
                    [entry.max],
                    el.modal.additionalDataEdit));
        });

        describe('Проверка таблицы', () => {
            type.bef();

            aft();

            it(`Отображение ${type.count + 1} записей в таблице`, async () => await dec.simple(el.table.size,
                [type.count + 1, entry.max],
                el.table));

            it('Проверка "Название поля"', async () => await dec.simpleText(el.table.cellGetText,
                ['Название поля', 1, 1, entry.max],
                params.name,
                el.table));

            it('Проверка "Тип поля"', async () => await dec.simpleText(el.table.cellGetText,
                ['Тип поля', 1, 2, entry.max],
                'Графический',
                el.table));

            it('Проверка "Описание"', async () => await dec.simpleText(el.table.cellGetText,
                ['Описание', 1, 3, entry.max],
                params.description,
                el.table));

            it('Проверка "Значение по умолчанию"', async () => await dec.simpleText(el.table.cellGetText,
                ['Значение по умолчанию', 1, 4, entry.max],
                '',
                el.table));
        });

        describe('Проверка параметров', () => {
            type.bef();

            aft();

            it(`Нажатие по первой строке в таблице`, async () => await dec.simple(el.table.strHandler,
                [1, entry.max],
                el.table));

            it('Нажатие кнопки "Редактировать"', async () => await dec.simple(el.butIcBefore.handler,
                [but.edit, entry.max],
                el.butIcBefore));

            it('Отображене модального окна "Редактировать дополнительное поле"',
                async () => await dec.simple(el.modal.additionalDataEdit.init,
                    [entry.max],
                    el.modal.additionalDataEdit));

            it('Проверка "Название поля"', async () => await dec.simpleText(el.input.getValue,
                ['Название поля', '', entry.max],
                params.name,
                el.input));

            it('Проверка "Описание"', async () => await dec.simpleText(el.input.getValue,
                ['Описание', '', entry.max],
                params.description,
                el.input));

            it('Проверка "Тип поля"', async () => await dec.simpleText(el.select.getText,
                ['Тип поля', 'Графический', entry.max],
                'Графический',
                el.input));

            it('Нажатие кнопки закрытия модального окна',
                async () => await dec.simple(el.modal.additionalDataEdit.closeHandler,
                    [entry.max],
                    el.modal.additionalDataEdit));

            it('Отсутствие модального окна "Добавить дополнительное поле"',
                async () => await dec.simple(el.modal.additionalDataEdit.initClose,
                    [entry.max],
                    el.modal.additionalDataEdit));
        });

        describe('Удаление тестовых данных', () => {
            type.bef();
            aft();
            dataRemove(type);
        });

    });

    // Тип поля «Графический». Попытка дублирования.
    const typeGraficDuplicate = () => describe(`Дополнительные данные. Тип поля: "Графический". ${type.person}. 
    Редактирование. Попытка дублирования.`, () => {
        const params = {
            data1: {
                name: 'typeGraficDuplicate',
            },
            data2: {
                name: 'TestName',
            },
            error: 'Такое название уже используется'
        };

        describe('API - добавление', () => {
            type.bef();

            aft();

            it('Добавление дополнительных данных', async () => {
                const cook = await page.base.getCookie('token');

                const data1 = {
                    name: params.data1.name,
                    comment: '',
                    type_id: 1,
                    default_value: '',
                    items: ''
                };
                await dec.simple(api.putAdditionalData,
                    [[data1], type.api, cook.text],
                    api.putAdditionalData);

                const data2 = {
                    name: params.data2.name,
                    comment: '',
                    type_id: 2,
                    default_value: '',
                    items: ''
                };
                await dec.simple(api.putAdditionalData,
                    [[data2], type.api, cook.text],
                    api.putAdditionalData);
            });
        });

        describe('Редактирование', () => {
            type.bef();

            aft();

            it(`Отображение ${type.count + 2} записей в таблице`, async () => await dec.simple(el.table.size,
                [type.count + 2, entry.max],
                el.table,));

            it(`Нажатие по первой строке в таблице`, async () => await dec.simple(el.table.strHandler,
                [1, entry.max],
                el.table));

            it('Нажатие кнопки "Редактировать"', async () => await dec.simple(el.butIcBefore.handler,
                [but.edit, entry.max],
                el.butIcBefore));

            it('Отображене модального окна "Редактировать дополнительное поле"',
                async () => await dec.simple(el.modal.additionalDataEdit.init,
                    [entry.max],
                    el.modal.additionalDataEdit));

            it('Удаление значения "Название поля"',async () => await dec.simple(el.input.backSpace,
                ['Название поля', '', entry.max],
                el.input));

            it('Ввод "Название поля"', async () => await dec.simple(el.input.sendKeys,
                ['Название поля', '', params.data1.name, entry.max],
                el.input));

            it('Нажатие кнопки "Сохранить"', async () => await dec.simple(el.button.handler,
                ['Сохранить', entry.max],
                el.button));

            it('Отображение ошибки',
                async () => await dec.simple(el.error.error,
                    [params.error, entry.max],
                    el.error));

            it('Нажатие кнопки закрытия модального окна',
                async () => await dec.simple(el.modal.additionalDataEdit.closeHandler,
                    [entry.max],
                    el.modal.additionalDataEdit));

            it('Отсутствие модального окна "Добавить дополнительное поле"',
                async () => await dec.simple(el.modal.additionalDataAdd.initClose,
                    [entry.max],
                    el.modal.additionalDataAdd));
        });

        describe('Проверка таблицы', () => {
            type.bef();

            aft();

            it(`Отображение ${type.count + 2} записей в таблице`, async () => await dec.simple(el.table.size,
                [type.count + 2, entry.max],
                el.table));

            it('Проверка "Название поля"', async () => await dec.simpleText(el.table.cellGetText,
                ['Название поля', 1, 1, entry.max],
                params.data2.name,
                el.table));

            it('Проверка "Тип поля"', async () => await dec.simpleText(el.table.cellGetText,
                ['Тип поля', 1, 2, entry.max],
                'Графический',
                el.table));

            it('Проверка "Описание"', async () => await dec.simpleText(el.table.cellGetText,
                ['Описание', 1, 3, entry.max],
                '',
                el.table));

            it('Проверка "Значение по умолчанию"', async () => await dec.simpleText(el.table.cellGetText,
                ['Значение по умолчанию', 1, 4, entry.max],
                '',
                el.table));

        });

        describe('Проверка параметров', () => {
            type.bef();

            aft();

            it(`Отображение ${type.count + 2} записей в таблице`, async () => await dec.simple(el.table.size,
                [type.count + 2, entry.max],
                el.table));

            it(`Нажатие по первой строке в таблице`, async () => await dec.simple(el.table.strHandler,
                [1, entry.max],
                el.table));

            it('Нажатие кнопки "Редактировать"', async () => await dec.simple(el.butIcBefore.handler,
                [but.edit, entry.max],
                el.butIcBefore));

            it('Отображене модального окна "Редактировать дополнительное поле"',
                async () => await dec.simple(el.modal.additionalDataEdit.init,
                    [entry.max],
                    el.modal.additionalDataEdit));

            it('Проверка "Название поля"', async () => await dec.simpleText(el.input.getValue,
                ['Название поля', '', entry.max],
                params.data2.name,
                el.input));

            it('Проверка "Описание"', async () => await dec.simpleText(el.input.getValue,
                ['Описание', '', entry.max],
                '',
                el.input));

            it('Проверка "Тип поля"', async () => await dec.simpleText(el.select.getText,
                ['Тип поля', 'Графический', entry.max],
                'Графический',
                el.input));

            it('Нажатие кнопки закрытия модального окна',
                async () => await dec.simple(el.modal.additionalDataEdit.closeHandler,
                    [entry.max],
                    el.modal.additionalDataEdit));

            it('Отсутствие модального окна "Добавить дополнительное поле"',
                async () => await dec.simple(el.modal.additionalDataEdit.initClose,
                    [entry.max],
                    el.modal.additionalDataEdit));
        });

        describe('Удаление тестовых данных', () => {
            type.bef();
            aft();
            dataRemove(type);
        });

    });

    // Тип поля «Графический». Проверки редактирования.
    const typeGrafic = () => describe(`Дополнительные данные. Тип поля: "Графический". ${type.person}. 
    Проверки редактирования.`, () => {
        typeGraficMinParams();
        typeGraficMaxParams();
        typeGraficEditAllMaxParams();
        typeGraficRemoveName();
        typeGraficDuplicate();
    });

    // Тип поля «Выпадающий список»
    // Тип поля «Выпадающий список». Добавление необязательных параметров с минимальным количеством параметров.
    const typeSelectMinParams = () => describe(`Дополнительные данные. Тип поля: "Выпадающий список". ${type.person}. 
    Редактирование. Добавление необязательных параметров с минимальным количеством параметров.`, () => {

        const params = {
            name: 'typeSelectMinParamsName',
            description: 'typeSelectMinParamsDescription',
            valueName: 'typeSelectMinParamsValue',
            defaultValue: 'typeSelectMinParamsValue3'
        };

        describe('API - добавление', () => {
            type.bef();

            aft();

            it('Добавление дополнительных данных', async () => {
                const data = {
                    name: params.name,
                    comment: '',
                    type_id: 9,
                    default_value: '',
                    items: ''
                };
                const cook = await page.base.getCookie('token');
                await dec.simple(api.putAdditionalData,
                    [[data], type.api, cook.text],
                    api.putAdditionalData);
            });
        });

        describe('Редактирование', () => {

            type.bef();

            aft();

            it(`Нажатие по первой строке в таблице`, async () => await dec.simple(el.table.strHandler,
                [1, entry.max],
                el.table));

            it('Нажатие кнопки "Редактировать"', async () => await dec.simple(el.butIcBefore.handler,
                [but.edit, entry.max],
                el.butIcBefore));

            it('Отображене модального окна "Редактировать дополнительное поле"',
                async () => await dec.simple(el.modal.additionalDataEdit.init,
                    [entry.max],
                    el.modal.additionalDataEdit));

            it('Ввод "Описание"', async () => await dec.simple(el.input.sendKeys,
                ['Описание', '', params.description, entry.max],
                el.input));

            [...Array(8).keys()].forEach(() => {
                return(
                    it('Нажатие кнопки "Добавить поле"', async () => await dec.simple(el.button.handler,
                        ['Добавить поле', entry.max],
                        el.button)));
            });

            [...Array(8).keys()].forEach(item => {
                return (
                    it(`Ввод значение в поле ${item + 1} в списке полей ввода "Поля"`,
                        async () => await dec.simple(el.modal.additionalDataEdit.selectTypeSendKeys,
                            [item + 1, params.valueName + (item + 1), entry.max],
                            el.modal.additionalDataEdit)));
            });

            it(`Выбор "Значение по умолчанию"`,
                async () => await dec.simple(el.select.iconXpand,
                    ['Значение по умолчанию', 'Заполните поле', params.defaultValue, entry.max],
                    el.select));

            it('Нажатие кнопки "Сохранить"', async () => await dec.simple(el.button.handler,
                ['Сохранить', entry.max],
                el.button));

            it('Отображение сообщения "Сохранено успешно"',
                async () => await dec.simple(el.success.success,
                    ['Сохранено успешно', entry.max],
                    el.success));

            it('Отсутствие модального окна "Добавить дополнительное поле"',
                async () => await dec.simple(el.modal.additionalDataAdd.initClose,
                    [entry.max],
                    el.modal.additionalDataAdd));
        });

        describe('Проверка таблицы', () => {
            type.bef();

            aft();

            it(`Отображение ${type.count + 1} записей в таблице`, async () => await dec.simple(el.table.size,
                [type.count + 1, entry.max],
                el.table));

            it('Проверка "Название поля"', async () => await dec.simpleText(el.table.cellGetText,
                ['Название поля', 1, 1, entry.max],
                params.name,
                el.table));

            it('Проверка "Тип поля"', async () => await dec.simpleText(el.table.cellGetText,
                ['Тип поля', 1, 2, entry.max],
                'Выпадающий список',
                el.table));

            it('Проверка "Описание"', async () => await dec.simpleText(el.table.cellGetText,
                ['Описание', 1, 3, entry.max],
                params.description,
                el.table));

            it('Проверка "Значение по умолчанию"', async () => await dec.simpleText(el.table.cellGetText,
                ['Значение по умолчанию', 1, 4, entry.max],
                params.defaultValue,
                el.table));
        });

        describe('Проверка параметров', () => {
            type.bef();

            aft();

            it(`Нажатие по первой строке в таблице`, async () => await dec.simple(el.table.strHandler,
                [1, entry.max],
                el.table));

            it('Нажатие кнопки "Редактировать"', async () => await dec.simple(el.butIcBefore.handler,
                [but.edit, entry.max],
                el.butIcBefore));

            it('Отображене модального окна "Редактировать дополнительное поле"',
                async () => await dec.simple(el.modal.additionalDataEdit.init,
                    [entry.max],
                    el.modal.additionalDataEdit));

            it('Проверка "Название поля"', async () => await dec.simpleText(el.input.getValue,
                ['Название поля', '', entry.max],
                params.name,
                el.input));

            it('Проверка "Описание"', async () => await dec.simpleText(el.input.getValue,
                ['Описание', '', entry.max],
                params.description,
                el.input));

            it('Проверка "Тип поля"', async () => await dec.simpleText(el.select.getText,
                ['Тип поля', 'Выпадающий список', entry.max],
                'Выпадающий список',
                el.input));

            [...Array(8).keys()].forEach(item => {
                return (
                    it(`Проверка поле ${item + 1} в списке полей ввода "Поля"`,
                        async () => await dec.simpleText(el.modal.additionalDataAdd.selectTypeGetValue,
                            [item + 1, entry.max],
                            params.valueName + (item + 1),
                            el.modal.additionalDataAdd)));
            });

            it('Проверка "Значение по умолчанию"', async () => await dec.simpleText(el.select.getText,
                ['Значение по умолчанию', params.defaultValue, entry.max],
                params.defaultValue,
                el.input));

            it('Нажатие кнопки закрытия модального окна',
                async () => await dec.simple(el.modal.additionalDataEdit.closeHandler,
                    [entry.max],
                    el.modal.additionalDataEdit));

            it('Отсутствие модального окна "Добавить дополнительное поле"',
                async () => await dec.simple(el.modal.additionalDataEdit.initClose,
                    [entry.max],
                    el.modal.additionalDataEdit));
        });

        describe('Удаление тестовых данных', () => {
            type.bef();
            aft();
            dataRemove(type);
        });

    });

    // Тип поля «Выпадающий список». Удаление необязательных параметров с максимальным количеством параметров.
    const typeSelectMaxParams = () => describe(`Дополнительные данные. Тип поля: "Выпадающий список". ${type.person}. 
    Редактирование. Удаление необязательных параметров с максимальным количеством параметров.`, () => {

        const params = {
            name: 'typeSelectMinParamsName',
            description: 'typeSelectMinParamsDescription',
            valueName: 'typeSelectMinParamsValue',
            defaultValue: 'typeSelectMinParamsValue3'
        };

        describe('API - добавление', () => {
            type.bef();

            aft();

            it('Добавление дополнительных данных', async () => {
                const arr = [...Array(8).keys()].map(item => {return {name: params.valueName + (item + 1)}});
                const data = {
                    name: params.name,
                    comment: params.description,
                    type_id: 9,
                    default_value: params.defaultValue,
                    items: JSON.stringify(arr)
                };
                const cook = await page.base.getCookie('token');
                await dec.simple(api.putAdditionalData,
                    [[data], type.api, cook.text],
                    api.putAdditionalData);
            });
        });

        describe('Редактирование', () => {

            type.bef();

            aft();

            it(`Нажатие по первой строке в таблице`, async () => await dec.simple(el.table.strHandler,
                [1, entry.max],
                el.table));

            it('Нажатие кнопки "Редактировать"', async () => await dec.simple(el.butIcBefore.handler,
                [but.edit, entry.max],
                el.butIcBefore));

            it('Отображене модального окна "Редактировать дополнительное поле"',
                async () => await dec.simple(el.modal.additionalDataEdit.init,
                    [entry.max],
                    el.modal.additionalDataEdit));

            it('Удаление значения "Описание"',async () => await dec.simple(el.input.backSpace,
                ['Описание', '', entry.max],
                el.input));

            [...Array(8).keys()].reverse().forEach(item => {
                return (
                    it(`Удаление поля ${item + 1} в списке полей ввода "Поля"`,
                        async () => await dec.simple(el.modal.additionalDataEdit.selectTypeRemove,
                            [item + 1, entry.max],
                            el.modal.additionalDataEdit)));
            });

            it('Нажатие кнопки "Сохранить"', async () => await dec.simple(el.button.handler,
                ['Сохранить', entry.max],
                el.button));

            it('Отображение сообщения "Сохранено успешно"',
                async () => await dec.simple(el.success.success,
                    ['Сохранено успешно', entry.max],
                    el.success));

            it('Отсутствие модального окна "Добавить дополнительное поле"',
                async () => await dec.simple(el.modal.additionalDataAdd.initClose,
                    [entry.max],
                    el.modal.additionalDataAdd));
        });

        describe('Проверка таблицы', () => {
            type.bef();

            aft();

            it(`Отображение ${type.count + 1} записей в таблице`, async () => await dec.simple(el.table.size,
                [type.count + 1, entry.max],
                el.table));

            it('Проверка "Название поля"', async () => await dec.simpleText(el.table.cellGetText,
                ['Название поля', 1, 1, entry.max],
                params.name,
                el.table));

            it('Проверка "Тип поля"', async () => await dec.simpleText(el.table.cellGetText,
                ['Тип поля', 1, 2, entry.max],
                'Выпадающий список',
                el.table));

            it('Проверка "Описание"', async () => await dec.simpleText(el.table.cellGetText,
                ['Описание', 1, 3, entry.max],
                '',
                el.table));

            it('Проверка "Значение по умолчанию"', async () => await dec.simpleText(el.table.cellGetText,
                ['Значение по умолчанию', 1, 4, entry.max],
                '',
                el.table));
        });

        describe('Проверка параметров', () => {
            type.bef();

            aft();

            it(`Нажатие по первой строке в таблице`, async () => await dec.simple(el.table.strHandler,
                [1, entry.max],
                el.table));

            it('Нажатие кнопки "Редактировать"', async () => await dec.simple(el.butIcBefore.handler,
                [but.edit, entry.max],
                el.butIcBefore));

            it('Отображене модального окна "Редактировать дополнительное поле"',
                async () => await dec.simple(el.modal.additionalDataEdit.init,
                    [entry.max],
                    el.modal.additionalDataEdit));

            it('Проверка "Название поля"', async () => await dec.simpleText(el.input.getValue,
                ['Название поля', '', entry.max],
                params.name,
                el.input));

            it('Проверка "Описание"', async () => await dec.simpleText(el.input.getValue,
                ['Описание', '', entry.max],
                '',
                el.input));

            it('Проверка "Тип поля"', async () => await dec.simpleText(el.select.getText,
                ['Тип поля', 'Выпадающий список', entry.max],
                'Выпадающий список',
                el.input));

            it('Отсутствие полей в списке полей ввода "Поля"',
                async () => await dec.simple(el.modal.additionalDataAdd.noSelectType,
                    [entry.max],
                    el.modal.additionalDataAdd));

            it('Проверка "Значение по умолчанию"', async () => await dec.simpleText(el.select.getText,
                ['Значение по умолчанию', 'Заполните поле', entry.max],
                'Заполните поле',
                el.input));

            it('Нажатие кнопки закрытия модального окна',
                async () => await dec.simple(el.modal.additionalDataEdit.closeHandler,
                    [entry.max],
                    el.modal.additionalDataEdit));

            it('Отсутствие модального окна "Добавить дополнительное поле"',
                async () => await dec.simple(el.modal.additionalDataEdit.initClose,
                    [entry.max],
                    el.modal.additionalDataEdit));
        });

        describe('Удаление тестовых данных', () => {
            type.bef();
            aft();
            dataRemove(type);
        });

    });

    // Тип поля «Выпадающий список». Удаление необязательных параметров с максимальным количеством параметров.
    const typeSelectEditAllMaxParams = () => describe(`Дополнительные данные. Тип поля: "Выпадающий список".
    ${type.person}.Редактирование. Редактирование всех параметров с максимальным количеством параметров.`, () => {

        const params = {
            data1: {
                name: 'TestName',
                description: 'TestDescription',
                valueName: 'TestValue',
                defaultValue: 'TestValue3'
            },
            data2: {
                name: 'typeSelectMinParamsName',
                description: 'typeSelectMinParamsDescription',
                valueName: 'typeSelectMinParamsValue',
                defaultValue: 'typeSelectMinParamsValue3'
            },

        };

        describe('API - добавление', () => {
            type.bef();

            aft();

            it('Добавление дополнительных данных', async () => {
                const cook = await page.base.getCookie('token');
                const arr1 = [...Array(8).keys()].map(item => {return {name: params.data1.valueName + (item + 1)}});
                const data1 = {
                    name: params.data1.name,
                    comment: params.data1.description,
                    type_id: 9,
                    default_value: params.data1.defaultValue,
                    items: JSON.stringify(arr1)
                };
                await dec.simple(api.putAdditionalData,
                    [[data1], type.api, cook.text],
                    api.putAdditionalData);
            });
        });

        describe('Редактирование', () => {

            type.bef();

            aft();

            it(`Нажатие по первой строке в таблице`, async () => await dec.simple(el.table.strHandler,
                [1, entry.max],
                el.table));

            it('Нажатие кнопки "Редактировать"', async () => await dec.simple(el.butIcBefore.handler,
                [but.edit, entry.max],
                el.butIcBefore));

            it('Отображене модального окна "Редактировать дополнительное поле"',
                async () => await dec.simple(el.modal.additionalDataEdit.init,
                    [entry.max],
                    el.modal.additionalDataEdit));

            it('Удаление значения "Название поля"',async () => await dec.simple(el.input.backSpace,
                ['Название поля', '', entry.max],
                el.input));

            it('Ввод "Название поля"', async () => await dec.simple(el.input.sendKeys,
                ['Название поля', '', params.data2.name, entry.max],
                el.input));

            it('Удаление значения "Описание"',async () => await dec.simple(el.input.backSpace,
                ['Описание', '', entry.max],
                el.input));

            it('Ввод "Описание"', async () => await dec.simple(el.input.sendKeys,
                ['Описание', '', params.data2.description, entry.max],
                el.input));

            [...Array(8).keys()].forEach(item => {
                return (
                    it(`Удаление значения поля ${item + 1} в списке полей ввода "Поля"`,
                        async () => await dec.simple(el.modal.additionalDataEdit.selectTypeBackSpace,
                            [item + 1, entry.max],
                            el.modal.additionalDataEdit)));
            });

            [...Array(8).keys()].forEach(item => {
                return (
                    it(`Ввод поле ${item + 1} в списке полей ввода "Поля"`,
                        async () => await dec.simple(el.modal.additionalDataEdit.selectTypeSendKeys,
                            [item + 1, params.data2.valueName + (item + 1), entry.max],
                            el.modal.additionalDataEdit)));
            });

            it(`Выбор "Значение по умолчанию"`,
                async () => await dec.simple(el.select.iconXpand,
                    ['Значение по умолчанию', 'Заполните поле', params.data2.defaultValue, entry.max],
                    el.select));

            it('Нажатие кнопки "Сохранить"', async () => await dec.simple(el.button.handler,
                ['Сохранить', entry.max],
                el.button));

            it('Отображение сообщения "Сохранено успешно"',
                async () => await dec.simple(el.success.success,
                    ['Сохранено успешно', entry.max],
                    el.success));

            it('Отсутствие модального окна "Добавить дополнительное поле"',
                async () => await dec.simple(el.modal.additionalDataAdd.initClose,
                    [entry.max],
                    el.modal.additionalDataAdd));
        });

        describe('Проверка таблицы', () => {
            type.bef();

            aft();

            it(`Отображение ${type.count + 1} записей в таблице`, async () => await dec.simple(el.table.size,
                [type.count + 1, entry.max],
                el.table));

            it('Проверка "Название поля"', async () => await dec.simpleText(el.table.cellGetText,
                ['Название поля', 1, 1, entry.max],
                params.data2.name,
                el.table));

            it('Проверка "Тип поля"', async () => await dec.simpleText(el.table.cellGetText,
                ['Тип поля', 1, 2, entry.max],
                'Выпадающий список',
                el.table));

            it('Проверка "Описание"', async () => await dec.simpleText(el.table.cellGetText,
                ['Описание', 1, 3, entry.max],
                params.data2.description,
                el.table));

            it('Проверка "Значение по умолчанию"', async () => await dec.simpleText(el.table.cellGetText,
                ['Значение по умолчанию', 1, 4, entry.max],
                params.data2.defaultValue,
                el.table));
        });

        describe('Проверка параметров', () => {
            type.bef();

            aft();

            it(`Отображение ${type.count + 1} записей в таблице`, async () => await dec.simple(el.table.size,
                [type.count + 1, entry.max],
                el.table));


            it(`Нажатие по первой строке в таблице`, async () => await dec.simple(el.table.strHandler,
                [1, entry.max],
                el.table));

            it('Нажатие кнопки "Редактировать"', async () => await dec.simple(el.butIcBefore.handler,
                [but.edit, entry.max],
                el.butIcBefore));

            it('Отображене модального окна "Редактировать дополнительное поле"',
                async () => await dec.simple(el.modal.additionalDataEdit.init,
                    [entry.max],
                    el.modal.additionalDataEdit));

            it('Проверка "Название поля"', async () => await dec.simpleText(el.input.getValue,
                ['Название поля', '', entry.max],
                params.data2.name,
                el.input));

            it('Проверка "Описание"', async () => await dec.simpleText(el.input.getValue,
                ['Описание', '', entry.max],
                params.data2.description,
                el.input));

            it('Проверка "Тип поля"', async () => await dec.simpleText(el.select.getText,
                ['Тип поля', 'Выпадающий список', entry.max],
                'Выпадающий список',
                el.input));

            [...Array(8).keys()].forEach(item => {
                return (
                    it(`Проверка поле ${item + 1} в списке полей ввода "Поля"`,
                        async () => await dec.simpleText(el.modal.additionalDataAdd.selectTypeGetValue,
                            [item + 1, entry.max],
                            params.data2.valueName + (item + 1),
                            el.modal.additionalDataAdd)));
            });

            it('Проверка "Значение по умолчанию"', async () => await dec.simpleText(el.select.getText,
                ['Значение по умолчанию', params.data2.defaultValue, entry.max],
                params.data2.defaultValue,
                el.input));

            it('Нажатие кнопки закрытия модального окна',
                async () => await dec.simple(el.modal.additionalDataEdit.closeHandler,
                    [entry.max],
                    el.modal.additionalDataEdit));

            it('Отсутствие модального окна "Добавить дополнительное поле"',
                async () => await dec.simple(el.modal.additionalDataEdit.initClose,
                    [entry.max],
                    el.modal.additionalDataEdit));
        });

        describe('Удаление тестовых данных', () => {
            type.bef();
            aft();
            dataRemove(type);
        });

    });

    // Тип поля «Выпадающий список». Попытка редактирования без заполненного поля в списке полей ввода «Поля»
    // с минимальным количеством параметров и одним полем.
    const typeSelectRemoveValueMinParams = () => describe(`Дополнительные данные. Тип поля: "Выпадающий список".
    ${type.person}. Редактирование. Попытка редактирования без заполненного поля в списке полей ввода «Поля» 
    с минимальным количеством параметров и одним полем.`, () => {

        const params = {
            name: 'typeSelectRemoveValueMinParamsName',
            value1: 'typeSelectRemoveValueMinParamsValue1'
        };

        describe('API - добавление', () => {
            type.bef();

            aft();

            it('Добавление дополнительных данных', async () => {
                const data = {
                    name: params.name,
                    comment: '',
                    type_id: 9,
                    default_value: '',
                    items: JSON.stringify([{name: params.value1}])
                };
                const cook = await page.base.getCookie('token');
                await dec.simple(api.putAdditionalData,
                    [[data], type.api, cook.text],
                    api.putAdditionalData);
            });
        });

        describe('Редактирование', () => {

            type.bef();

            aft();

            it(`Нажатие по первой строке в таблице`, async () => await dec.simple(el.table.strHandler,
                [1, entry.max],
                el.table));

            it('Нажатие кнопки "Редактировать"', async () => await dec.simple(el.butIcBefore.handler,
                [but.edit, entry.max],
                el.butIcBefore));

            it('Отображене модального окна "Редактировать дополнительное поле"',
                async () => await dec.simple(el.modal.additionalDataEdit.init,
                    [entry.max],
                    el.modal.additionalDataEdit));

            it(`Удаление значения поля 1 в списке полей ввода "Поля"`,
                async () => await dec.simple(el.modal.additionalDataEdit.selectTypeBackSpace,
                    [1, entry.max],
                    el.modal.additionalDataEdit));

            it('Кнопка "Сохранить" - не активна', async () => await dec.simple(el.button.disabled,
                ['Сохранить', entry.max],
                el.button));

            it('Нажатие кнопки "Сохранить"', async () => await dec.simpleFalse(el.button.handlerNoActive,
                ['Сохранить', entry.max],
                el.button));

            it('Модальное окно "Редактировать дополнительное поле" не закрыто',
                async () => await dec.simpleFalse(el.modal.additionalDataEdit.initClose,
                    [entry.min],
                    el.modal.additionalDataEdit));

            it('Нажатие кнопки закрытия модального окна',
                async () => await dec.simple(el.modal.additionalDataEdit.closeHandler,
                    [entry.max],
                    el.modal.additionalDataEdit));

            it('Отсутствие модального окна "Добавить дополнительное поле"',
                async () => await dec.simple(el.modal.additionalDataEdit.initClose,
                    [entry.max],
                    el.modal.additionalDataEdit));
        });

        describe('Проверка таблицы', () => {
            type.bef();

            aft();

            it(`Отображение ${type.count + 1} записей в таблице`, async () => await dec.simple(el.table.size,
                [type.count + 1, entry.max],
                el.table));

            it('Проверка "Название поля"', async () => await dec.simpleText(el.table.cellGetText,
                ['Название поля', 1, 1, entry.max],
                params.name,
                el.table));

            it('Проверка "Тип поля"', async () => await dec.simpleText(el.table.cellGetText,
                ['Тип поля', 1, 2, entry.max],
                'Выпадающий список',
                el.table));

            it('Проверка "Описание"', async () => await dec.simpleText(el.table.cellGetText,
                ['Описание', 1, 3, entry.max],
                '',
                el.table));

            it('Проверка "Значение по умолчанию"', async () => await dec.simpleText(el.table.cellGetText,
                ['Значение по умолчанию', 1, 4, entry.max],
                '',
                el.table));
        });

        describe('Проверка параметров', () => {
            type.bef();

            aft();

            it(`Нажатие по первой строке в таблице`, async () => await dec.simple(el.table.strHandler,
                [1, entry.max],
                el.table));

            it('Нажатие кнопки "Редактировать"', async () => await dec.simple(el.butIcBefore.handler,
                [but.edit, entry.max],
                el.butIcBefore));

            it('Отображене модального окна "Редактировать дополнительное поле"',
                async () => await dec.simple(el.modal.additionalDataEdit.init,
                    [entry.max],
                    el.modal.additionalDataEdit));

            it('Проверка "Название поля"', async () => await dec.simpleText(el.input.getValue,
                ['Название поля', '', entry.max],
                params.name,
                el.input));

            it('Проверка "Описание"', async () => await dec.simpleText(el.input.getValue,
                ['Описание', '', entry.max],
                '',
                el.input));

            it('Проверка "Тип поля"', async () => await dec.simpleText(el.select.getText,
                ['Тип поля', 'Выпадающий список', entry.max],
                'Выпадающий список',
                el.input));

            it('Проверка поле 1 в списке полей ввода "Поля"',
                async () => await dec.simpleText(el.modal.additionalDataAdd.selectTypeGetValue,
                    [1, entry.max],
                    params.value1,
                    el.modal.additionalDataAdd));

            it('Проверка "Значение по умолчанию"', async () => await dec.simpleText(el.select.getText,
                ['Значение по умолчанию', 'Заполните поле', entry.max],
                'Заполните поле',
                el.input));

            it('Нажатие кнопки закрытия модального окна',
                async () => await dec.simple(el.modal.additionalDataEdit.closeHandler,
                    [entry.max],
                    el.modal.additionalDataEdit));

            it('Отсутствие модального окна "Добавить дополнительное поле"',
                async () => await dec.simple(el.modal.additionalDataEdit.initClose,
                    [entry.max],
                    el.modal.additionalDataEdit));
        });

        describe('Удаление тестовых данных', () => {
            type.bef();
            aft();
            dataRemove(type);
        });

    });

    // Тип поля «Выпадающий список». Попытка редактирования без заполненного поля в списке полей ввода «Поля»
    // с максимальным количеством параметров.
    const typeSelectRemoveValueMaxParams = () => describe(`Дополнительные данные. Тип поля: "Выпадающий список".
    ${type.person}. Редактирование. Попытка редактирования без заполненного поля в списке полей ввода «Поля» 
    с минимальным количеством параметров и одним полем.`, () => {

        const params = {
            name: 'typeSelectRemoveValueMaxParamsName',
            description: 'typeSelectRemoveValueMaxParamsDescription',
            valueName: 'typeSelectRemoveValueMaxParamsValue',
            defaultValue: 'typeSelectRemoveValueMaxParamsValue3'
        };

        describe('API - добавление', () => {
            type.bef();

            aft();

            it('Добавление дополнительных данных', async () => {
                const cook = await page.base.getCookie('token');
                const arr1 = [...Array(8).keys()].map(item => {return {name: params.valueName + (item + 1)}});
                const data1 = {
                    name: params.name,
                    comment: params.description,
                    type_id: 9,
                    default_value: params.defaultValue,
                    items: JSON.stringify(arr1)
                };
                await dec.simple(api.putAdditionalData,
                    [[data1], type.api, cook.text],
                    api.putAdditionalData);
            });
        });

        describe('Редактирование', () => {

            type.bef();

            aft();

            it(`Нажатие по первой строке в таблице`, async () => await dec.simple(el.table.strHandler,
                [1, entry.max],
                el.table));

            it('Нажатие кнопки "Редактировать"', async () => await dec.simple(el.butIcBefore.handler,
                [but.edit, entry.max],
                el.butIcBefore));

            it('Отображене модального окна "Редактировать дополнительное поле"',
                async () => await dec.simple(el.modal.additionalDataEdit.init,
                    [entry.max],
                    el.modal.additionalDataEdit));

            it(`Удаление значения поля 5 в списке полей ввода "Поля"`,
                async () => await dec.simple(el.modal.additionalDataEdit.selectTypeBackSpace,
                    [5, entry.max],
                    el.modal.additionalDataEdit));

            it('Кнопка "Сохранить" - не активна', async () => await dec.simple(el.button.disabled,
                ['Сохранить', entry.max],
                el.button));

            it('Нажатие кнопки "Сохранить"', async () => await dec.simpleFalse(el.button.handlerNoActive,
                ['Сохранить', entry.max],
                el.button));

            it('Модальное окно "Редактировать дополнительное поле" не закрыто',
                async () => await dec.simpleFalse(el.modal.additionalDataEdit.initClose,
                    [entry.min],
                    el.modal.additionalDataEdit));

            it('Нажатие кнопки закрытия модального окна',
                async () => await dec.simple(el.modal.additionalDataEdit.closeHandler,
                    [entry.max],
                    el.modal.additionalDataEdit));

            it('Отсутствие модального окна "Добавить дополнительное поле"',
                async () => await dec.simple(el.modal.additionalDataEdit.initClose,
                    [entry.max],
                    el.modal.additionalDataEdit));
        });

        describe('Проверка таблицы', () => {
            type.bef();

            aft();

            it(`Отображение ${type.count + 1} записей в таблице`, async () => await dec.simple(el.table.size,
                [type.count + 1, entry.max],
                el.table));

            it('Проверка "Название поля"', async () => await dec.simpleText(el.table.cellGetText,
                ['Название поля', 1, 1, entry.max],
                params.name,
                el.table));

            it('Проверка "Тип поля"', async () => await dec.simpleText(el.table.cellGetText,
                ['Тип поля', 1, 2, entry.max],
                'Выпадающий список',
                el.table));

            it('Проверка "Описание"', async () => await dec.simpleText(el.table.cellGetText,
                ['Описание', 1, 3, entry.max],
                params.description,
                el.table));

            it('Проверка "Значение по умолчанию"', async () => await dec.simpleText(el.table.cellGetText,
                ['Значение по умолчанию', 1, 4, entry.max],
                params.defaultValue,
                el.table));
        });

        describe('Проверка параметров', () => {
            type.bef();

            aft();

            it(`Отображение ${type.count + 1} записей в таблице`, async () => await dec.simple(el.table.size,
                [type.count + 1, entry.max],
                el.table));


            it(`Нажатие по первой строке в таблице`, async () => await dec.simple(el.table.strHandler,
                [1, entry.max],
                el.table));

            it('Нажатие кнопки "Редактировать"', async () => await dec.simple(el.butIcBefore.handler,
                [but.edit, entry.max],
                el.butIcBefore));

            it('Отображене модального окна "Редактировать дополнительное поле"',
                async () => await dec.simple(el.modal.additionalDataEdit.init,
                    [entry.max],
                    el.modal.additionalDataEdit));

            it('Проверка "Название поля"', async () => await dec.simpleText(el.input.getValue,
                ['Название поля', '', entry.max],
                params.name,
                el.input));

            it('Проверка "Описание"', async () => await dec.simpleText(el.input.getValue,
                ['Описание', '', entry.max],
                params.description,
                el.input));

            it('Проверка "Тип поля"', async () => await dec.simpleText(el.select.getText,
                ['Тип поля', 'Выпадающий список', entry.max],
                'Выпадающий список',
                el.input));

            [...Array(8).keys()].forEach(item => {
                return (
                    it(`Проверка поле ${item + 1} в списке полей ввода "Поля"`,
                        async () => await dec.simpleText(el.modal.additionalDataAdd.selectTypeGetValue,
                            [item + 1, entry.max],
                            params.valueName + (item + 1),
                            el.modal.additionalDataAdd)));
            });

            it('Проверка "Значение по умолчанию"', async () => await dec.simpleText(el.select.getText,
                ['Значение по умолчанию', params.defaultValue, entry.max],
                params.defaultValue,
                el.input));

            it('Нажатие кнопки закрытия модального окна',
                async () => await dec.simple(el.modal.additionalDataEdit.closeHandler,
                    [entry.max],
                    el.modal.additionalDataEdit));

            it('Отсутствие модального окна "Добавить дополнительное поле"',
                async () => await dec.simple(el.modal.additionalDataEdit.initClose,
                    [entry.max],
                    el.modal.additionalDataEdit));
        });

        describe('Удаление тестовых данных', () => {
            type.bef();
            aft();
            dataRemove(type);
        });

    });

    // Тип поля «Выпадающий список». Попытка редактирования без "Название поля".
    const typeSelectRemoveName = () => describe(`Дополнительные данные. Тип поля: "Выпадающий список".
    ${type.person}. Редактирование. Попытка редактирования без "Название поля".`, () => {

        const params = {
            name: 'typeSelectRemoveNameMinParamsName',
            description: 'typeSelectRemoveNameMinParamsDescription',
            value1: 'typeSelectRemoveNameMinParamsValue1'
        };

        describe('API - добавление', () => {
            type.bef();

            aft();

            it('Добавление дополнительных данных', async () => {
                const data = {
                    name: params.name,
                    comment: params.description,
                    type_id: 9,
                    default_value: '',
                    items: JSON.stringify([{name: params.value1}])
                };
                const cook = await page.base.getCookie('token');
                await dec.simple(api.putAdditionalData,
                    [[data], type.api, cook.text],
                    api.putAdditionalData);
            });
        });

        describe('Редактирование', () => {

            type.bef();

            aft();

            it(`Нажатие по первой строке в таблице`, async () => await dec.simple(el.table.strHandler,
                [1, entry.max],
                el.table));

            it('Нажатие кнопки "Редактировать"', async () => await dec.simple(el.butIcBefore.handler,
                [but.edit, entry.max],
                el.butIcBefore));

            it('Отображене модального окна "Редактировать дополнительное поле"',
                async () => await dec.simple(el.modal.additionalDataEdit.init,
                    [entry.max],
                    el.modal.additionalDataEdit));

            it('Удаление значения "Название поля"',async () => await dec.simple(el.input.backSpace,
                ['Название поля', '', entry.max],
                el.input));

            it('Кнопка "Сохранить" - не активна', async () => await dec.simple(el.button.disabled,
                ['Сохранить', entry.max],
                el.button));

            it('Нажатие кнопки "Сохранить"', async () => await dec.simpleFalse(el.button.handlerNoActive,
                ['Сохранить', entry.max],
                el.button));

            it('Модальное окно "Редактировать дополнительное поле" не закрыто',
                async () => await dec.simpleFalse(el.modal.additionalDataEdit.initClose,
                    [entry.min],
                    el.modal.additionalDataEdit));

            it('Нажатие кнопки закрытия модального окна',
                async () => await dec.simple(el.modal.additionalDataEdit.closeHandler,
                    [entry.max],
                    el.modal.additionalDataEdit));

            it('Отсутствие модального окна "Добавить дополнительное поле"',
                async () => await dec.simple(el.modal.additionalDataEdit.initClose,
                    [entry.max],
                    el.modal.additionalDataEdit));
        });

        describe('Проверка таблицы', () => {
            type.bef();

            aft();

            it(`Отображение ${type.count + 1} записей в таблице`, async () => await dec.simple(el.table.size,
                [type.count + 1, entry.max],
                el.table));

            it('Проверка "Название поля"', async () => await dec.simpleText(el.table.cellGetText,
                ['Название поля', 1, 1, entry.max],
                params.name,
                el.table));

            it('Проверка "Тип поля"', async () => await dec.simpleText(el.table.cellGetText,
                ['Тип поля', 1, 2, entry.max],
                'Выпадающий список',
                el.table));

            it('Проверка "Описание"', async () => await dec.simpleText(el.table.cellGetText,
                ['Описание', 1, 3, entry.max],
                params.description,
                el.table));

            it('Проверка "Значение по умолчанию"', async () => await dec.simpleText(el.table.cellGetText,
                ['Значение по умолчанию', 1, 4, entry.max],
                '',
                el.table));
        });

        describe('Проверка параметров', () => {
            type.bef();

            aft();

            it(`Нажатие по первой строке в таблице`, async () => await dec.simple(el.table.strHandler,
                [1, entry.max],
                el.table));

            it('Нажатие кнопки "Редактировать"', async () => await dec.simple(el.butIcBefore.handler,
                [but.edit, entry.max],
                el.butIcBefore));

            it('Отображене модального окна "Редактировать дополнительное поле"',
                async () => await dec.simple(el.modal.additionalDataEdit.init,
                    [entry.max],
                    el.modal.additionalDataEdit));

            it('Проверка "Название поля"', async () => await dec.simpleText(el.input.getValue,
                ['Название поля', '', entry.max],
                params.name,
                el.input));

            it('Проверка "Описание"', async () => await dec.simpleText(el.input.getValue,
                ['Описание', '', entry.max],
                params.description,
                el.input));

            it('Проверка "Тип поля"', async () => await dec.simpleText(el.select.getText,
                ['Тип поля', 'Выпадающий список', entry.max],
                'Выпадающий список',
                el.input));

            it('Проверка поле 1 в списке полей ввода "Поля"',
                async () => await dec.simpleText(el.modal.additionalDataAdd.selectTypeGetValue,
                    [1, entry.max],
                    params.value1,
                    el.modal.additionalDataAdd));

            it('Проверка "Значение по умолчанию"', async () => await dec.simpleText(el.select.getText,
                ['Значение по умолчанию', 'Заполните поле', entry.max],
                'Заполните поле',
                el.input));

            it('Нажатие кнопки закрытия модального окна',
                async () => await dec.simple(el.modal.additionalDataEdit.closeHandler,
                    [entry.max],
                    el.modal.additionalDataEdit));

            it('Отсутствие модального окна "Добавить дополнительное поле"',
                async () => await dec.simple(el.modal.additionalDataEdit.initClose,
                    [entry.max],
                    el.modal.additionalDataEdit));
        });

        describe('Удаление тестовых данных', () => {
            type.bef();
            aft();
            dataRemove(type);
        });

    });

    // Тип поля «Выпадающий список». Попытка дублиирования
    const typeSelectDuplicate = () => describe(`Дополнительные данные. Тип поля: "Выпадающий список".
    ${type.person}. Редактирование. Попытка дублиирования.`, () => {

        const params = {
            data1: {
                name: 'typeSelectDuplicate',
            },
            data2: {
                name: 'TestName',
            },
            error: 'Такое название уже используется'
        };

        describe('API - добавление', () => {
            type.bef();

            aft();

            it('Добавление дополнительных данных', async () => {
                const cook = await page.base.getCookie('token');

                const data1 = {
                    name: params.data1.name,
                    comment: '',
                    type_id: 1,
                    default_value: '',
                    items: ''
                };
                await dec.simple(api.putAdditionalData,
                    [[data1], type.api, cook.text],
                    api.putAdditionalData);

                const data2 = {
                    name: params.data2.name,
                    comment: '',
                    type_id: 9,
                    default_value: '',
                    items: ''
                };
                await dec.simple(api.putAdditionalData,
                    [[data2], type.api, cook.text],
                    api.putAdditionalData);
            });
        });

        describe('Редактирование', () => {
            type.bef();

            aft();

            it(`Отображение ${type.count + 2} записей в таблице`, async () => await dec.simple(el.table.size,
                [type.count + 2, entry.max],
                el.table,));

            it(`Нажатие по первой строке в таблице`, async () => await dec.simple(el.table.strHandler,
                [1, entry.max],
                el.table));

            it('Нажатие кнопки "Редактировать"', async () => await dec.simple(el.butIcBefore.handler,
                [but.edit, entry.max],
                el.butIcBefore));

            it('Отображене модального окна "Редактировать дополнительное поле"',
                async () => await dec.simple(el.modal.additionalDataEdit.init,
                    [entry.max],
                    el.modal.additionalDataEdit));

            it('Удаление значения "Название поля"',async () => await dec.simple(el.input.backSpace,
                ['Название поля', '', entry.max],
                el.input));

            it('Ввод "Название поля"', async () => await dec.simple(el.input.sendKeys,
                ['Название поля', '', params.data1.name, entry.max],
                el.input));

            it('Нажатие кнопки "Сохранить"', async () => await dec.simple(el.button.handler,
                ['Сохранить', entry.max],
                el.button));

            it('Отображение ошибки',
                async () => await dec.simple(el.error.error,
                    [params.error, entry.max],
                    el.error));

            it('Нажатие кнопки закрытия модального окна',
                async () => await dec.simple(el.modal.additionalDataEdit.closeHandler,
                    [entry.max],
                    el.modal.additionalDataEdit));

            it('Отсутствие модального окна "Добавить дополнительное поле"',
                async () => await dec.simple(el.modal.additionalDataAdd.initClose,
                    [entry.max],
                    el.modal.additionalDataAdd));
        });

        describe('Проверка таблицы', () => {
            type.bef();

            aft();

            it(`Отображение ${type.count + 2} записей в таблице`, async () => await dec.simple(el.table.size,
                [type.count + 2, entry.max],
                el.table));

            it('Проверка "Название поля"', async () => await dec.simpleText(el.table.cellGetText,
                ['Название поля', 1, 1, entry.max],
                params.data2.name,
                el.table));

            it('Проверка "Тип поля"', async () => await dec.simpleText(el.table.cellGetText,
                ['Тип поля', 1, 2, entry.max],
                'Выпадающий список',
                el.table));

            it('Проверка "Описание"', async () => await dec.simpleText(el.table.cellGetText,
                ['Описание', 1, 3, entry.max],
                '',
                el.table));

            it('Проверка "Значение по умолчанию"', async () => await dec.simpleText(el.table.cellGetText,
                ['Значение по умолчанию', 1, 4, entry.max],
                '',
                el.table));

        });

        describe('Проверка параметров', () => {
            type.bef();

            aft();

            it(`Отображение ${type.count + 2} записей в таблице`, async () => await dec.simple(el.table.size,
                [type.count + 2, entry.max],
                el.table));

            it(`Нажатие по первой строке в таблице`, async () => await dec.simple(el.table.strHandler,
                [1, entry.max],
                el.table));

            it('Нажатие кнопки "Редактировать"', async () => await dec.simple(el.butIcBefore.handler,
                [but.edit, entry.max],
                el.butIcBefore));

            it('Отображене модального окна "Редактировать дополнительное поле"',
                async () => await dec.simple(el.modal.additionalDataEdit.init,
                    [entry.max],
                    el.modal.additionalDataEdit));

            it('Проверка "Название поля"', async () => await dec.simpleText(el.input.getValue,
                ['Название поля', '', entry.max],
                params.data2.name,
                el.input));

            it('Проверка "Описание"', async () => await dec.simpleText(el.input.getValue,
                ['Описание', '', entry.max],
                '',
                el.input));

            it('Проверка "Тип поля"', async () => await dec.simpleText(el.select.getText,
                ['Тип поля', 'Выпадающий список', entry.max],
                'Выпадающий список',
                el.input));

            it('Нажатие кнопки закрытия модального окна',
                async () => await dec.simple(el.modal.additionalDataEdit.closeHandler,
                    [entry.max],
                    el.modal.additionalDataEdit));

            it('Отсутствие модального окна "Добавить дополнительное поле"',
                async () => await dec.simple(el.modal.additionalDataEdit.initClose,
                    [entry.max],
                    el.modal.additionalDataEdit));
        });

        describe('Удаление тестовых данных', () => {
            type.bef();
            aft();
            dataRemove(type);
        });
    });

    // Тип поля «Выпадающий список». Проверки редактирования.
    const typeSelect = () => describe(`Дополнительные данные. Тип поля: "Выпадающий список". ${type.person}. 
    Проверки редактирования.`, () => {
        typeSelectMinParams();
        typeSelectMaxParams();
        typeSelectEditAllMaxParams();
        typeSelectRemoveValueMinParams();
        typeSelectRemoveValueMaxParams();
        typeSelectRemoveName();
        typeSelectDuplicate();
    });

    // Тип поля «Чекбокс». Добавление необязательных параметров с минимальным количеством параметров.
    const typeCheckboxMinParams = () => describe(`Дополнительные данные. Тип поля: "Чекбокс". ${type.person}.
    Редактирование. Добавление необязательных параметров с минимальным количеством параметров.`, () => {

        const params = {
            name: 'typeCheckboxMinParamsName',
            description: 'typeCheckboxMinParamsDescription',
            defaultValue1: 'Нет',
            defaultValue2: 'Да'
        };

        describe('API - добавление', () => {
            type.bef();

            aft();

            it('Добавление дополнительных данных', async () => {
                const data = {
                    name: params.name,
                    comment: '',
                    type_id: 8,
                    default_value: '',
                    items: ''
                };
                const cook = await page.base.getCookie('token');
                await dec.simple(api.putAdditionalData,
                    [[data], type.api, cook.text],
                    api.putAdditionalData);
            });
        });

        describe('Редактирование', () => {
            type.bef();

            aft();

            it(`Отображение ${type.count + 1} записей в таблице`, async () => await dec.simple(el.table.size,
                [type.count + 1, entry.max],
                el.table,));

            it(`Нажатие по первой строке в таблице`, async () => await dec.simple(el.table.strHandler,
                [1, entry.max],
                el.table));

            it('Нажатие кнопки "Редактировать"', async () => await dec.simple(el.butIcBefore.handler,
                [but.edit, entry.max],
                el.butIcBefore));

            it('Отображене модального окна "Редактировать дополнительное поле"',
                async () => await dec.simple(el.modal.additionalDataEdit.init,
                    [entry.max],
                    el.modal.additionalDataEdit));

            it('Ввод "Описание"', async () => await dec.simple(el.input.sendKeys,
                ['Описание', '', params.description, entry.max],
                el.input));

            it('Выбор "Значение по умолчанию"', async () => await dec.simple(el.select.iconXpand,
                ['Значение по умолчанию', params.defaultValue1, params.defaultValue2, entry.max],
                el.select));

            it('Нажатие кнопки "Сохранить"', async () => await dec.simple(el.button.handler,
                ['Сохранить', entry.max],
                el.button));

            it('Отображение сообщения "Сохранено успешно"',
                async () => await dec.simple(el.success.success,
                    ['Сохранено успешно', entry.max],
                    el.success));

            it('Отсутствие модального окна "Добавить дополнительное поле"',
                async () => await dec.simple(el.modal.additionalDataAdd.initClose,
                    [entry.max],
                    el.modal.additionalDataAdd));
        });

        describe('Проверка таблицы', () => {
            type.bef();

            aft();

            it(`Отображение ${type.count + 1} записей в таблице`, async () => await dec.simple(el.table.size,
                [type.count + 1, entry.max],
                el.table));

            it('Проверка "Название поля"', async () => await dec.simpleText(el.table.cellGetText,
                ['Название поля', 1, 1, entry.max],
                params.name,
                el.table));

            it('Проверка "Тип поля"', async () => await dec.simpleText(el.table.cellGetText,
                ['Тип поля', 1, 2, entry.max],
                'Чекбокс',
                el.table));

            it('Проверка "Описание"', async () => await dec.simpleText(el.table.cellGetText,
                ['Описание', 1, 3, entry.max],
                params.description,
                el.table));

            it('Проверка "Значение по умолчанию"', async () => await dec.simpleText(el.table.cellGetText,
                ['Значение по умолчанию', 1, 4, entry.max],
                params.defaultValue2,
                el.table));
        });

        describe('Проверка параметров', () => {
            type.bef();

            aft();

            it(`Нажатие по первой строке в таблице`, async () => await dec.simple(el.table.strHandler,
                [1, entry.max],
                el.table));

            it('Нажатие кнопки "Редактировать"', async () => await dec.simple(el.butIcBefore.handler,
                [but.edit, entry.max],
                el.butIcBefore));

            it('Отображене модального окна "Редактировать дополнительное поле"',
                async () => await dec.simple(el.modal.additionalDataEdit.init,
                    [entry.max],
                    el.modal.additionalDataEdit));

            it('Проверка "Название поля"', async () => await dec.simpleText(el.input.getValue,
                ['Название поля', '', entry.max],
                params.name,
                el.input));

            it('Проверка "Описание"', async () => await dec.simpleText(el.input.getValue,
                ['Описание', '', entry.max],
                params.description,
                el.input));

            it('Проверка "Тип поля"', async () => await dec.simpleText(el.select.getText,
                ['Тип поля', 'Чекбокс', entry.max],
                'Чекбокс',
                el.input));

            it('Проверка "Значение по умолчанию"', async () => await dec.simpleText(el.select.getText,
                ['Значение по умолчанию', params.defaultValue2, entry.max],
                params.defaultValue2,
                el.input));

            it('Нажатие кнопки закрытия модального окна',
                async () => await dec.simple(el.modal.additionalDataEdit.closeHandler,
                    [entry.max],
                    el.modal.additionalDataEdit));

            it('Отсутствие модального окна "Добавить дополнительное поле"',
                async () => await dec.simple(el.modal.additionalDataEdit.initClose,
                    [entry.max],
                    el.modal.additionalDataEdit));
        });

        describe('Удаление тестовых данных', () => {
            type.bef();
            aft();
            dataRemove(type);
        });

    });

    // Тип поля «Чекбокс». Удаление необязательных параметров с максимальным количеством параметров.
    const typeCheckboxMaxParams = () => describe(`Дополнительные данные. Тип поля: "Чекбокс". ${type.person}.
    Редактирование. Удаление необязательных параметров с максимальным количеством параметров.`, () => {

        const params = {
            name: 'typeCheckboxMaxParamsName',
            description: 'typeCheckboxMaxParamsDescription',
            defaultValue1: 'Да',
            defaultValue2: 'Нет'
        };

        describe('API - добавление', () => {
            type.bef();

            aft();

            it('Добавление дополнительных данных', async () => {
                const data = {
                    name: params.name,
                    comment: params.description,
                    type_id: 8,
                    default_value: '1',
                    items: ''
                };
                const cook = await page.base.getCookie('token');
                await dec.simple(api.putAdditionalData,
                    [[data], type.api, cook.text],
                    api.putAdditionalData);
            });
        });

        describe('Редактирование', () => {
            type.bef();

            aft();

            it(`Отображение ${type.count + 1} записей в таблице`, async () => await dec.simple(el.table.size,
                [type.count + 1, entry.max],
                el.table,));

            it(`Нажатие по первой строке в таблице`, async () => await dec.simple(el.table.strHandler,
                [1, entry.max],
                el.table));

            it('Нажатие кнопки "Редактировать"', async () => await dec.simple(el.butIcBefore.handler,
                [but.edit, entry.max],
                el.butIcBefore));

            it('Отображене модального окна "Редактировать дополнительное поле"',
                async () => await dec.simple(el.modal.additionalDataEdit.init,
                    [entry.max],
                    el.modal.additionalDataEdit));

            it('Удаление "Описание"', async () => await dec.simple(el.input.backSpace,
                ['Описание', '', entry.max],
                el.input));

            it('Выбор "Значение по умолчанию"', async () => await dec.simple(el.select.iconXpand,
                ['Значение по умолчанию', params.defaultValue1, params.defaultValue2, entry.max],
                el.select));

            it('Нажатие кнопки "Сохранить"', async () => await dec.simple(el.button.handler,
                ['Сохранить', entry.max],
                el.button));

            it('Отображение сообщения "Сохранено успешно"',
                async () => await dec.simple(el.success.success,
                    ['Сохранено успешно', entry.max],
                    el.success));

            it('Отсутствие модального окна "Добавить дополнительное поле"',
                async () => await dec.simple(el.modal.additionalDataAdd.initClose,
                    [entry.max],
                    el.modal.additionalDataAdd));
        });

        describe('Проверка таблицы', () => {
            type.bef();

            aft();

            it(`Отображение ${type.count + 1} записей в таблице`, async () => await dec.simple(el.table.size,
                [type.count + 1, entry.max],
                el.table));

            it('Проверка "Название поля"', async () => await dec.simpleText(el.table.cellGetText,
                ['Название поля', 1, 1, entry.max],
                params.name,
                el.table));

            it('Проверка "Тип поля"', async () => await dec.simpleText(el.table.cellGetText,
                ['Тип поля', 1, 2, entry.max],
                'Чекбокс',
                el.table));

            it('Проверка "Описание"', async () => await dec.simpleText(el.table.cellGetText,
                ['Описание', 1, 3, entry.max],
                '',
                el.table));

            it('Проверка "Значение по умолчанию"', async () => await dec.simpleText(el.table.cellGetText,
                ['Значение по умолчанию', 1, 4, entry.max],
                params.defaultValue2,
                el.table));
        });

        describe('Проверка параметров', () => {
            type.bef();

            aft();

            it(`Нажатие по первой строке в таблице`, async () => await dec.simple(el.table.strHandler,
                [1, entry.max],
                el.table));

            it('Нажатие кнопки "Редактировать"', async () => await dec.simple(el.butIcBefore.handler,
                [but.edit, entry.max],
                el.butIcBefore));

            it('Отображене модального окна "Редактировать дополнительное поле"',
                async () => await dec.simple(el.modal.additionalDataEdit.init,
                    [entry.max],
                    el.modal.additionalDataEdit));

            it('Проверка "Название поля"', async () => await dec.simpleText(el.input.getValue,
                ['Название поля', '', entry.max],
                params.name,
                el.input));

            it('Проверка "Описание"', async () => await dec.simpleText(el.input.getValue,
                ['Описание', '', entry.max],
                '',
                el.input));

            it('Проверка "Тип поля"', async () => await dec.simpleText(el.select.getText,
                ['Тип поля', 'Чекбокс', entry.max],
                'Чекбокс',
                el.input));

            it('Проверка "Значение по умолчанию"', async () => await dec.simpleText(el.select.getText,
                ['Значение по умолчанию', params.defaultValue2, entry.max],
                params.defaultValue2,
                el.input));

            it('Нажатие кнопки закрытия модального окна',
                async () => await dec.simple(el.modal.additionalDataEdit.closeHandler,
                    [entry.max],
                    el.modal.additionalDataEdit));

            it('Отсутствие модального окна "Добавить дополнительное поле"',
                async () => await dec.simple(el.modal.additionalDataEdit.initClose,
                    [entry.max],
                    el.modal.additionalDataEdit));
        });

        describe('Удаление тестовых данных', () => {
            type.bef();
            aft();
            dataRemove(type);
        });



    });

    // Тип поля «Чекбокс». Редактирование всех параметров с максимальным количеством параметров.
    const typeCheckboxEditAllParams = () => describe(`Дополнительные данные. Тип поля: "Чекбокс". ${type.person}.
    Редактирование. Редактирование всех параметров с максимальным количеством параметров.`, () => {

        const params = {
            data1: {
                name: 'TestName',
                description: 'TestDescription',
                defaultValue: 'Да'
            },
            data2: {
                name: 'typeCheckboxEditAllParamsName',
                description: 'typeCheckboxEditAllParamsDescription',
                defaultValue: 'Нет'
            }
        };

        describe('API - добавление', () => {
            type.bef();

            aft();

            it('Добавление дополнительных данных', async () => {
                const data = {
                    name: params.data1.name,
                    comment: params.data1.description,
                    type_id: 8,
                    default_value: '1',
                    items: ''
                };
                const cook = await page.base.getCookie('token');
                await dec.simple(api.putAdditionalData,
                    [[data], type.api, cook.text],
                    api.putAdditionalData);
            });
        });

        describe('Редактирование', () => {
            type.bef();

            aft();

            it(`Отображение ${type.count + 1} записей в таблице`, async () => await dec.simple(el.table.size,
                [type.count + 1, entry.max],
                el.table,));

            it(`Нажатие по первой строке в таблице`, async () => await dec.simple(el.table.strHandler,
                [1, entry.max],
                el.table));

            it('Нажатие кнопки "Редактировать"', async () => await dec.simple(el.butIcBefore.handler,
                [but.edit, entry.max],
                el.butIcBefore));

            it('Отображене модального окна "Редактировать дополнительное поле"',
                async () => await dec.simple(el.modal.additionalDataEdit.init,
                    [entry.max],
                    el.modal.additionalDataEdit));

            it('Удаление значения "Название поля"',async () => await dec.simple(el.input.backSpace,
                ['Название поля', '', entry.max],
                el.input));

            it('Ввод "Название поля"', async () => await dec.simple(el.input.sendKeys,
                ['Название поля', '', params.data2.name, entry.max],
                el.input));

            it('Удаление значения "Описание"',async () => await dec.simple(el.input.backSpace,
                ['Описание', '', entry.max],
                el.input));

            it('Ввод "Описание"', async () => await dec.simple(el.input.sendKeys,
                ['Описание', '', params.data2.description, entry.max],
                el.input));

            it('Выбор "Значение по умолчанию"', async () => await dec.simple(el.select.iconXpand,
                ['Значение по умолчанию', params.data1.defaultValue, params.data2.defaultValue, entry.max],
                el.select));

            it('Нажатие кнопки "Сохранить"', async () => await dec.simple(el.button.handler,
                ['Сохранить', entry.max],
                el.button));

            it('Отображение сообщения "Сохранено успешно"',
                async () => await dec.simple(el.success.success,
                    ['Сохранено успешно', entry.max],
                    el.success));

            it('Отсутствие модального окна "Добавить дополнительное поле"',
                async () => await dec.simple(el.modal.additionalDataAdd.initClose,
                    [entry.max],
                    el.modal.additionalDataAdd));
        });

        describe('Проверка таблицы', () => {
            type.bef();

            aft();

            it(`Отображение ${type.count + 1} записей в таблице`, async () => await dec.simple(el.table.size,
                [type.count + 1, entry.max],
                el.table));

            it('Проверка "Название поля"', async () => await dec.simpleText(el.table.cellGetText,
                ['Название поля', 1, 1, entry.max],
                params.data2.name,
                el.table));

            it('Проверка "Тип поля"', async () => await dec.simpleText(el.table.cellGetText,
                ['Тип поля', 1, 2, entry.max],
                'Чекбокс',
                el.table));

            it('Проверка "Описание"', async () => await dec.simpleText(el.table.cellGetText,
                ['Описание', 1, 3, entry.max],
                params.data2.description,
                el.table));

            it('Проверка "Значение по умолчанию"', async () => await dec.simpleText(el.table.cellGetText,
                ['Значение по умолчанию', 1, 4, entry.max],
                params.data2.defaultValue,
                el.table));
        });

        describe('Проверка параметров', () => {
            type.bef();

            aft();

            it(`Нажатие по первой строке в таблице`, async () => await dec.simple(el.table.strHandler,
                [1, entry.max],
                el.table));

            it('Нажатие кнопки "Редактировать"', async () => await dec.simple(el.butIcBefore.handler,
                [but.edit, entry.max],
                el.butIcBefore));

            it('Отображене модального окна "Редактировать дополнительное поле"',
                async () => await dec.simple(el.modal.additionalDataEdit.init,
                    [entry.max],
                    el.modal.additionalDataEdit));

            it('Проверка "Название поля"', async () => await dec.simpleText(el.input.getValue,
                ['Название поля', '', entry.max],
                params.data2.name,
                el.input));

            it('Проверка "Описание"', async () => await dec.simpleText(el.input.getValue,
                ['Описание', '', entry.max],
                params.data2.description,
                el.input));

            it('Проверка "Тип поля"', async () => await dec.simpleText(el.select.getText,
                ['Тип поля', 'Чекбокс', entry.max],
                'Чекбокс',
                el.input));

            it('Проверка "Значение по умолчанию"', async () => await dec.simpleText(el.select.getText,
                ['Значение по умолчанию', params.data2.defaultValue, entry.max],
                params.data2.defaultValue,
                el.input));

            it('Нажатие кнопки закрытия модального окна',
                async () => await dec.simple(el.modal.additionalDataEdit.closeHandler,
                    [entry.max],
                    el.modal.additionalDataEdit));

            it('Отсутствие модального окна "Добавить дополнительное поле"',
                async () => await dec.simple(el.modal.additionalDataEdit.initClose,
                    [entry.max],
                    el.modal.additionalDataEdit));
        });

        describe('Удаление тестовых данных', () => {
            type.bef();
            aft();
            dataRemove(type);
        });
    });

    // Тип поля «Чекбокс». Попытка редактирования без "Название поля".
    const typeCheckboxRemoveName = () => describe(`Дополнительные данные. Тип поля: "Чекбокс". ${type.person}. 
    Редактирование. Попытка редактирования без "Название поля".`, () => {

        const params = {
            name: 'typeCheckboxRemoveNameName',
            description: 'typeCheckboxRemoveNameDescription',
            defaultValue: 'Нет'
        };

        describe('API - добавление', () => {
            type.bef();

            aft();

            it('Добавление дополнительных данных', async () => {
                const data = {
                    name: params.name,
                    comment: params.description,
                    type_id: 8,
                    default_value: '',
                    items: ''
                };
                const cook = await page.base.getCookie('token');
                await dec.simple(api.putAdditionalData,
                    [[data], type.api, cook.text],
                    api.putAdditionalData);
            });
        });

        describe('Редактирование', () => {
            type.bef();

            aft();

            it(`Отображение ${type.count + 1} записей в таблице`, async () => await dec.simple(el.table.size,
                [type.count + 1, entry.max],
                el.table,));

            it(`Нажатие по первой строке в таблице`, async () => await dec.simple(el.table.strHandler,
                [1, entry.max],
                el.table));

            it('Нажатие кнопки "Редактировать"', async () => await dec.simple(el.butIcBefore.handler,
                [but.edit, entry.max],
                el.butIcBefore));

            it('Отображене модального окна "Редактировать дополнительное поле"',
                async () => await dec.simple(el.modal.additionalDataEdit.init,
                    [entry.max],
                    el.modal.additionalDataEdit));

            it('Удаление значения "Название поля"',async () => await dec.simple(el.input.backSpace,
                ['Название поля', '', entry.max],
                el.input));

            it('Кнопка "Сохранить" - не активна', async () => await dec.simple(el.button.disabled,
                ['Сохранить', entry.max],
                el.button));

            it('Нажатие кнопки "Сохранить"', async () => await dec.simpleFalse(el.button.handlerNoActive,
                ['Сохранить', entry.max],
                el.button));

            it('Модальное окно "Редактировать дополнительное поле" не закрыто',
                async () => await dec.simpleFalse(el.modal.additionalDataEdit.initClose,
                    [entry.min],
                    el.modal.additionalDataEdit));

            it('Нажатие кнопки закрытия модального окна',
                async () => await dec.simple(el.modal.additionalDataEdit.closeHandler,
                    [entry.max],
                    el.modal.additionalDataEdit));

            it('Отсутствие модального окна "Добавить дополнительное поле"',
                async () => await dec.simple(el.modal.additionalDataEdit.initClose,
                    [entry.max],
                    el.modal.additionalDataEdit));
        });

        describe('Проверка таблицы', () => {
            type.bef();

            aft();

            it(`Отображение ${type.count + 1} записей в таблице`, async () => await dec.simple(el.table.size,
                [type.count + 1, entry.max],
                el.table));

            it('Проверка "Название поля"', async () => await dec.simpleText(el.table.cellGetText,
                ['Название поля', 1, 1, entry.max],
                params.name,
                el.table));

            it('Проверка "Тип поля"', async () => await dec.simpleText(el.table.cellGetText,
                ['Тип поля', 1, 2, entry.max],
                'Чекбокс',
                el.table));

            it('Проверка "Описание"', async () => await dec.simpleText(el.table.cellGetText,
                ['Описание', 1, 3, entry.max],
                params.description,
                el.table));

            it('Проверка "Значение по умолчанию"', async () => await dec.simpleText(el.table.cellGetText,
                ['Значение по умолчанию', 1, 4, entry.max],
                params.defaultValue,
                el.table));

        });

        describe('Проверка параметров', () => {
            type.bef();

            aft();

            it(`Нажатие по первой строке в таблице`, async () => await dec.simple(el.table.strHandler,
                [1, entry.max],
                el.table));

            it('Нажатие кнопки "Редактировать"', async () => await dec.simple(el.butIcBefore.handler,
                [but.edit, entry.max],
                el.butIcBefore));

            it('Отображене модального окна "Редактировать дополнительное поле"',
                async () => await dec.simple(el.modal.additionalDataEdit.init,
                    [entry.max],
                    el.modal.additionalDataEdit));

            it('Проверка "Название поля"', async () => await dec.simpleText(el.input.getValue,
                ['Название поля', '', entry.max],
                params.name,
                el.input));

            it('Проверка "Описание"', async () => await dec.simpleText(el.input.getValue,
                ['Описание', '', entry.max],
                params.description,
                el.input));

            it('Проверка "Тип поля"', async () => await dec.simpleText(el.select.getText,
                ['Тип поля', 'Чекбокс', entry.max],
                'Чекбокс',
                el.input));

            it('Проверка "Значение по умолчанию"', async () => await dec.simpleText(el.select.getText,
                ['Значение по умолчанию', params.defaultValue, entry.max],
                params.defaultValue,
                el.input));

            it('Нажатие кнопки закрытия модального окна',
                async () => await dec.simple(el.modal.additionalDataEdit.closeHandler,
                    [entry.max],
                    el.modal.additionalDataEdit));

            it('Отсутствие модального окна "Добавить дополнительное поле"',
                async () => await dec.simple(el.modal.additionalDataEdit.initClose,
                    [entry.max],
                    el.modal.additionalDataEdit));
        });

        describe('Удаление тестовых данных', () => {
            type.bef();
            aft();
            dataRemove(type);
        });

    });

    // Тип поля «Чекбокс». Попытка дублиирования
    const typeCheckboxDuplicate = () => describe(`Дополнительные данные. Тип поля: "Выпадающий список".
    ${type.person}. Редактирование. Попытка дублирования.`, () => {

        const params = {
            data1: {
                name: 'typeCheckboxDuplicate',
            },
            data2: {
                name: 'TestName',
            },
            error: 'Такое название уже используется'
        };

        describe('API - добавление', () => {
            type.bef();

            aft();

            it('Добавление дополнительных данных', async () => {
                const cook = await page.base.getCookie('token');

                const data1 = {
                    name: params.data1.name,
                    comment: '',
                    type_id: 8,
                    default_value: '',
                    items: ''
                };
                await dec.simple(api.putAdditionalData,
                    [[data1], type.api, cook.text],
                    api.putAdditionalData);

                const data2 = {
                    name: params.data2.name,
                    comment: '',
                    type_id: 8,
                    default_value: '',
                    items: ''
                };
                await dec.simple(api.putAdditionalData,
                    [[data2], type.api, cook.text],
                    api.putAdditionalData);
            });
        });

        describe('Редактирование', () => {
            type.bef();

            aft();

            it(`Отображение ${type.count + 2} записей в таблице`, async () => await dec.simple(el.table.size,
                [type.count + 2, entry.max],
                el.table,));

            it(`Нажатие по первой строке в таблице`, async () => await dec.simple(el.table.strHandler,
                [1, entry.max],
                el.table));

            it('Нажатие кнопки "Редактировать"', async () => await dec.simple(el.butIcBefore.handler,
                [but.edit, entry.max],
                el.butIcBefore));

            it('Отображене модального окна "Редактировать дополнительное поле"',
                async () => await dec.simple(el.modal.additionalDataEdit.init,
                    [entry.max],
                    el.modal.additionalDataEdit));

            it('Удаление значения "Название поля"',async () => await dec.simple(el.input.backSpace,
                ['Название поля', '', entry.max],
                el.input));

            it('Ввод "Название поля"', async () => await dec.simple(el.input.sendKeys,
                ['Название поля', '', params.data1.name, entry.max],
                el.input));

            it('Нажатие кнопки "Сохранить"', async () => await dec.simple(el.button.handler,
                ['Сохранить', entry.max],
                el.button));

            it('Отображение ошибки',
                async () => await dec.simple(el.error.error,
                    [params.error, entry.max],
                    el.error));

            it('Нажатие кнопки закрытия модального окна',
                async () => await dec.simple(el.modal.additionalDataEdit.closeHandler,
                    [entry.max],
                    el.modal.additionalDataEdit));

            it('Отсутствие модального окна "Добавить дополнительное поле"',
                async () => await dec.simple(el.modal.additionalDataAdd.initClose,
                    [entry.max],
                    el.modal.additionalDataAdd));
        });

        describe('Проверка таблицы', () => {
            type.bef();

            aft();

            it(`Отображение ${type.count + 2} записей в таблице`, async () => await dec.simple(el.table.size,
                [type.count + 2, entry.max],
                el.table));

            it('Проверка "Название поля"', async () => await dec.simpleText(el.table.cellGetText,
                ['Название поля', 1, 1, entry.max],
                params.data2.name,
                el.table));

            it('Проверка "Тип поля"', async () => await dec.simpleText(el.table.cellGetText,
                ['Тип поля', 1, 2, entry.max],
                'Чекбокс',
                el.table));

            it('Проверка "Описание"', async () => await dec.simpleText(el.table.cellGetText,
                ['Описание', 1, 3, entry.max],
                '',
                el.table));

            it('Проверка "Значение по умолчанию"', async () => await dec.simpleText(el.table.cellGetText,
                ['Значение по умолчанию', 1, 4, entry.max],
                'Нет',
                el.table));

        });

        describe('Проверка параметров', () => {
            type.bef();

            aft();

            it(`Отображение ${type.count + 2} записей в таблице`, async () => await dec.simple(el.table.size,
                [type.count + 2, entry.max],
                el.table));

            it(`Нажатие по первой строке в таблице`, async () => await dec.simple(el.table.strHandler,
                [1, entry.max],
                el.table));

            it('Нажатие кнопки "Редактировать"', async () => await dec.simple(el.butIcBefore.handler,
                [but.edit, entry.max],
                el.butIcBefore));

            it('Отображене модального окна "Редактировать дополнительное поле"',
                async () => await dec.simple(el.modal.additionalDataEdit.init,
                    [entry.max],
                    el.modal.additionalDataEdit));

            it('Проверка "Название поля"', async () => await dec.simpleText(el.input.getValue,
                ['Название поля', '', entry.max],
                params.data2.name,
                el.input));

            it('Проверка "Описание"', async () => await dec.simpleText(el.input.getValue,
                ['Описание', '', entry.max],
                '',
                el.input));

            it('Проверка "Тип поля"', async () => await dec.simpleText(el.select.getText,
                ['Тип поля', 'Чекбокс', entry.max],
                'Чекбокс',
                el.input));

            it('Проверка "Значение по умолчанию"', async () => await dec.simpleText(el.select.getText,
                ['Значение по умолчанию', 'Нет', entry.max],
                'Нет',
                el.input));

            it('Нажатие кнопки закрытия модального окна',
                async () => await dec.simple(el.modal.additionalDataEdit.closeHandler,
                    [entry.max],
                    el.modal.additionalDataEdit));

            it('Отсутствие модального окна "Добавить дополнительное поле"',
                async () => await dec.simple(el.modal.additionalDataEdit.initClose,
                    [entry.max],
                    el.modal.additionalDataEdit));
        });

        describe('Удаление тестовых данных', () => {
            type.bef();
            aft();
            dataRemove(type);
        });
    });

    // Тип поля «Чекбокс». Проверки редактирования.
    const typeCheckbox = () => describe(`Дополнительные данные. Тип поля: "Чекбокс". ${type.person}. 
    Проверки редактирования.`, () => {
        typeCheckboxMinParams();
        typeCheckboxMaxParams();
        typeCheckboxEditAllParams();
        typeCheckboxRemoveName();
        typeCheckboxDuplicate();
    });

    // Тип поля «Дата».
    // Тип поля «Дата». Добавление необязательных параметров с минимальным количеством параметров.
    const typeDateMinParams = () => describe(`Дополнительные данные. Тип поля: "Дата". ${type.person}. 
    Редактирование. Добавление необязательных параметров с минимальным количеством параметров.`, () => {
        const params = {
            name: 'typeDateMinParamsName',
            description: 'typeDateMinParamsDescription',
        };

        describe('API - добавление', () => {
            type.bef();

            aft();

            it('Добавление дополнительных данных', async () => {
                const data = {
                    name: params.name,
                    comment: '',
                    type_id: 10,
                    default_value: '',
                    items: ''
                };
                const cook = await page.base.getCookie('token');
                await dec.simple(api.putAdditionalData,
                    [[data], type.api, cook.text],
                    api.putAdditionalData);
            });
        });

        describe('Редактирование', () => {
            type.bef();

            aft();

            it(`Отображение ${type.count + 1} записей в таблице`, async () => await dec.simple(el.table.size,
                [type.count + 1, entry.max],
                el.table,));

            it(`Нажатие по первой строке в таблице`, async () => await dec.simple(el.table.strHandler,
                [1, entry.max],
                el.table));

            it('Нажатие кнопки "Редактировать"', async () => await dec.simple(el.butIcBefore.handler,
                [but.edit, entry.max],
                el.butIcBefore));

            it('Отображене модального окна "Редактировать дополнительное поле"',
                async () => await dec.simple(el.modal.additionalDataEdit.init,
                    [entry.max],
                    el.modal.additionalDataEdit));

            it('Ввод "Описание"', async () => await dec.simple(el.input.sendKeys,
                ['Описание', '', params.description, entry.max],
                el.input));

            it('Нажатие кнопки "Сохранить"', async () => await dec.simple(el.button.handler,
                ['Сохранить', entry.max],
                el.button));

            it('Отображение сообщения "Сохранено успешно"',
                async () => await dec.simple(el.success.success,
                    ['Сохранено успешно', entry.max],
                    el.success));

            it('Отсутствие модального окна "Добавить дополнительное поле"',
                async () => await dec.simple(el.modal.additionalDataAdd.initClose,
                    [entry.max],
                    el.modal.additionalDataAdd));
        });

        describe('Проверка таблицы', () => {
            type.bef();

            aft();

            it(`Отображение ${type.count + 1} записей в таблице`, async () => await dec.simple(el.table.size,
                [type.count + 1, entry.max],
                el.table));

            it('Проверка "Название поля"', async () => await dec.simpleText(el.table.cellGetText,
                ['Название поля', 1, 1, entry.max],
                params.name,
                el.table));

            it('Проверка "Тип поля"', async () => await dec.simpleText(el.table.cellGetText,
                ['Тип поля', 1, 2, entry.max],
                'Дата',
                el.table));

            it('Проверка "Описание"', async () => await dec.simpleText(el.table.cellGetText,
                ['Описание', 1, 3, entry.max],
                params.description,
                el.table));

            it('Проверка "Значение по умолчанию"', async () => await dec.simpleText(el.table.cellGetText,
                ['Значение по умолчанию', 1, 4, entry.max],
                '',
                el.table));
        });

        describe('Проверка параметров', () => {
            type.bef();

            aft();

            it(`Нажатие по первой строке в таблице`, async () => await dec.simple(el.table.strHandler,
                [1, entry.max],
                el.table));

            it('Нажатие кнопки "Редактировать"', async () => await dec.simple(el.butIcBefore.handler,
                [but.edit, entry.max],
                el.butIcBefore));

            it('Отображене модального окна "Редактировать дополнительное поле"',
                async () => await dec.simple(el.modal.additionalDataEdit.init,
                    [entry.max],
                    el.modal.additionalDataEdit));

            it('Проверка "Название поля"', async () => await dec.simpleText(el.input.getValue,
                ['Название поля', '', entry.max],
                params.name,
                el.input));

            it('Проверка "Описание"', async () => await dec.simpleText(el.input.getValue,
                ['Описание', '', entry.max],
                params.description,
                el.input));

            it('Проверка "Тип поля"', async () => await dec.simpleText(el.select.getText,
                ['Тип поля', 'Дата', entry.max],
                'Дата',
                el.input));

            it('Нажатие кнопки закрытия модального окна',
                async () => await dec.simple(el.modal.additionalDataEdit.closeHandler,
                    [entry.max],
                    el.modal.additionalDataEdit));

            it('Отсутствие модального окна "Добавить дополнительное поле"',
                async () => await dec.simple(el.modal.additionalDataEdit.initClose,
                    [entry.max],
                    el.modal.additionalDataEdit));
        });

        describe('Удаление тестовых данных', () => {
            type.bef();
            aft();
            dataRemove(type);
        });

    });

    // Тип поля «Дата». Удаление необязательных параметров с максимальным количеством параметров.
    const typeDateMaxParams = () => describe(`Дополнительные данные. Тип поля: "Дата". ${type.person}. 
    Редактирование. Удаление необязательных параметров с максимальным количеством параметров.`, () => {
        const params = {
            name: 'typeDateMaxParamsName',
            description: 'typeDateMaxParamsDescription',
        };

        describe('API - добавление', () => {
            type.bef();

            aft();

            it('Добавление дополнительных данных', async () => {
                const data = {
                    name: params.name,
                    comment: params.description,
                    type_id: 10,
                    default_value: '',
                    items: ''
                };
                const cook = await page.base.getCookie('token');
                await dec.simple(api.putAdditionalData,
                    [[data], type.api, cook.text],
                    api.putAdditionalData);
            });
        });

        describe('Редактирование', () => {
            type.bef();

            aft();

            it(`Отображение ${type.count + 1} записей в таблице`, async () => await dec.simple(el.table.size,
                [type.count + 1, entry.max],
                el.table,));

            it(`Нажатие по первой строке в таблице`, async () => await dec.simple(el.table.strHandler,
                [1, entry.max],
                el.table));

            it('Нажатие кнопки "Редактировать"', async () => await dec.simple(el.butIcBefore.handler,
                [but.edit, entry.max],
                el.butIcBefore));

            it('Отображене модального окна "Редактировать дополнительное поле"',
                async () => await dec.simple(el.modal.additionalDataEdit.init,
                    [entry.max],
                    el.modal.additionalDataEdit));

            it('Удаление значения "Описание"',async () => await dec.simple(el.input.backSpace,
                ['Описание', '', entry.max],
                el.input));

            it('Нажатие кнопки "Сохранить"', async () => await dec.simple(el.button.handler,
                ['Сохранить', entry.max],
                el.button));

            it('Отображение сообщения "Сохранено успешно"',
                async () => await dec.simple(el.success.success,
                    ['Сохранено успешно', entry.max],
                    el.success));

            it('Отсутствие модального окна "Добавить дополнительное поле"',
                async () => await dec.simple(el.modal.additionalDataAdd.initClose,
                    [entry.max],
                    el.modal.additionalDataAdd));
        });

        describe('Проверка таблицы', () => {
            type.bef();

            aft();

            it(`Отображение ${type.count + 1} записей в таблице`, async () => await dec.simple(el.table.size,
                [type.count + 1, entry.max],
                el.table));

            it('Проверка "Название поля"', async () => await dec.simpleText(el.table.cellGetText,
                ['Название поля', 1, 1, entry.max],
                params.name,
                el.table));

            it('Проверка "Тип поля"', async () => await dec.simpleText(el.table.cellGetText,
                ['Тип поля', 1, 2, entry.max],
                'Дата',
                el.table));

            it('Проверка "Описание"', async () => await dec.simpleText(el.table.cellGetText,
                ['Описание', 1, 3, entry.max],
                '',
                el.table));

            it('Проверка "Значение по умолчанию"', async () => await dec.simpleText(el.table.cellGetText,
                ['Значение по умолчанию', 1, 4, entry.max],
                '',
                el.table));
        });

        describe('Проверка параметров', () => {
            type.bef();

            aft();

            it(`Нажатие по первой строке в таблице`, async () => await dec.simple(el.table.strHandler,
                [1, entry.max],
                el.table));

            it('Нажатие кнопки "Редактировать"', async () => await dec.simple(el.butIcBefore.handler,
                [but.edit, entry.max],
                el.butIcBefore));

            it('Отображене модального окна "Редактировать дополнительное поле"',
                async () => await dec.simple(el.modal.additionalDataEdit.init,
                    [entry.max],
                    el.modal.additionalDataEdit));

            it('Проверка "Название поля"', async () => await dec.simpleText(el.input.getValue,
                ['Название поля', '', entry.max],
                params.name,
                el.input));

            it('Проверка "Описание"', async () => await dec.simpleText(el.input.getValue,
                ['Описание', '', entry.max],
                '',
                el.input));

            it('Проверка "Тип поля"', async () => await dec.simpleText(el.select.getText,
                ['Тип поля', 'Дата', entry.max],
                'Дата',
                el.input));

            it('Нажатие кнопки закрытия модального окна',
                async () => await dec.simple(el.modal.additionalDataEdit.closeHandler,
                    [entry.max],
                    el.modal.additionalDataEdit));

            it('Отсутствие модального окна "Добавить дополнительное поле"',
                async () => await dec.simple(el.modal.additionalDataEdit.initClose,
                    [entry.max],
                    el.modal.additionalDataEdit));
        });

        describe('Удаление тестовых данных', () => {
            type.bef();
            aft();
            dataRemove(type);
        });

    });

    // Тип поля «Дата». Добавление необязательных параметров с максимальным количеством параметров.
    const typeDateEditAllMaxParams = () => describe(`Дополнительные данные. Тип поля: "Дата". ${type.person}.
    Редактирование. Редактирование всех параметров с максимальным количеством параметров.`, () => {
        const params = {
            data1: {
                name: 'TestName',
                description: 'TestDescription',
            },
            data2: {
                name: 'typeTextMaxParamsName',
                description: 'typeTextMaxParamsDescription',
            }
        };

        describe('API - добавление', () => {
            type.bef();

            aft();

            it('Добавление дополнительных данных', async () => {
                const data = {
                    name: params.data1.name,
                    comment: params.data1.description,
                    type_id: 10,
                    default_value: '',
                    items: ''
                };
                const cook = await page.base.getCookie('token');
                await dec.simple(api.putAdditionalData,
                    [[data], type.api, cook.text],
                    api.putAdditionalData);
            });
        });

        describe('Редактирование', () => {
            type.bef();

            aft();

            it(`Отображение ${type.count + 1} записей в таблице`, async () => await dec.simple(el.table.size,
                [type.count + 1, entry.max],
                el.table,));

            it(`Нажатие по первой строке в таблице`, async () => await dec.simple(el.table.strHandler,
                [1, entry.max],
                el.table));

            it('Нажатие кнопки "Редактировать"', async () => await dec.simple(el.butIcBefore.handler,
                [but.edit, entry.max],
                el.butIcBefore));

            it('Отображене модального окна "Редактировать дополнительное поле"',
                async () => await dec.simple(el.modal.additionalDataEdit.init,
                    [entry.max],
                    el.modal.additionalDataEdit));

            it('Удаление значения "Название поля"',async () => await dec.simple(el.input.backSpace,
                ['Название поля', '', entry.max],
                el.input));

            it('Ввод "Название поля"', async () => await dec.simple(el.input.sendKeys,
                ['Название поля', '', params.data2.name, entry.max],
                el.input));

            it('Удаление значения "Описание"',async () => await dec.simple(el.input.backSpace,
                ['Описание', '', entry.max],
                el.input));

            it('Ввод "Описание"', async () => await dec.simple(el.input.sendKeys,
                ['Описание', '', params.data2.description, entry.max],
                el.input));

            it('Нажатие кнопки "Сохранить"', async () => await dec.simple(el.button.handler,
                ['Сохранить', entry.max],
                el.button));

            it('Отображение сообщения "Сохранено успешно"',
                async () => await dec.simple(el.success.success,
                    ['Сохранено успешно', entry.max],
                    el.success));

            it('Отсутствие модального окна "Добавить дополнительное поле"',
                async () => await dec.simple(el.modal.additionalDataAdd.initClose,
                    [entry.max],
                    el.modal.additionalDataAdd));
        });

        describe('Проверка таблицы', () => {
            type.bef();

            aft();

            it(`Отображение ${type.count + 1} записей в таблице`, async () => await dec.simple(el.table.size,
                [type.count + 1, entry.max],
                el.table));

            it('Проверка "Название поля"', async () => await dec.simpleText(el.table.cellGetText,
                ['Название поля', 1, 1, entry.max],
                params.data2.name,
                el.table));

            it('Проверка "Тип поля"', async () => await dec.simpleText(el.table.cellGetText,
                ['Тип поля', 1, 2, entry.max],
                'Дата',
                el.table));

            it('Проверка "Описание"', async () => await dec.simpleText(el.table.cellGetText,
                ['Описание', 1, 3, entry.max],
                params.data2.description,
                el.table));

            it('Проверка "Значение по умолчанию"', async () => await dec.simpleText(el.table.cellGetText,
                ['Значение по умолчанию', 1, 4, entry.max],
                '',
                el.table));

        });

        describe('Проверка параметров', () => {
            type.bef();

            aft();

            it(`Нажатие по первой строке в таблице`, async () => await dec.simple(el.table.strHandler,
                [1, entry.max],
                el.table));

            it('Нажатие кнопки "Редактировать"', async () => await dec.simple(el.butIcBefore.handler,
                [but.edit, entry.max],
                el.butIcBefore));

            it('Отображене модального окна "Редактировать дополнительное поле"',
                async () => await dec.simple(el.modal.additionalDataEdit.init,
                    [entry.max],
                    el.modal.additionalDataEdit));

            it('Проверка "Название поля"', async () => await dec.simpleText(el.input.getValue,
                ['Название поля', '', entry.max],
                params.data2.name,
                el.input));

            it('Проверка "Описание"', async () => await dec.simpleText(el.input.getValue,
                ['Описание', '', entry.max],
                params.data2.description,
                el.input));

            it('Проверка "Тип поля"', async () => await dec.simpleText(el.select.getText,
                ['Тип поля', 'Дата', entry.max],
                'Дата',
                el.input));

            it('Нажатие кнопки закрытия модального окна',
                async () => await dec.simple(el.modal.additionalDataEdit.closeHandler,
                    [entry.max],
                    el.modal.additionalDataEdit));

            it('Отсутствие модального окна "Добавить дополнительное поле"',
                async () => await dec.simple(el.modal.additionalDataEdit.initClose,
                    [entry.max],
                    el.modal.additionalDataEdit));
        });

        describe('Удаление тестовых данных', () => {
            type.bef();
            aft();
            dataRemove(type);
        });

    });

    // ип поля «Дата». Попытка редактирования без «Название поля».
    const typeDateRemoveName = () => describe(`Дополнительные данные. Тип поля: "Дата". ${type.person}. 
    Редактирование. Попытка редактирования без "Название поля".`, () => {
        const params = {
            name: 'typeDateRemoveNameName',
            description: 'typeDateRemoveNameDescription',
        };

        describe('API - добавление', () => {
            type.bef();

            aft();

            it('Добавление дополнительных данных', async () => {
                const data = {
                    name: params.name,
                    comment: params.description,
                    type_id: 10,
                    default_value: '',
                    items: ''
                };
                const cook = await page.base.getCookie('token');
                await dec.simple(api.putAdditionalData,
                    [[data], type.api, cook.text],
                    api.putAdditionalData);
            });
        });

        describe('Редактирование', () => {
            type.bef();

            aft();

            it(`Отображение ${type.count + 1} записей в таблице`, async () => await dec.simple(el.table.size,
                [type.count + 1, entry.max],
                el.table,));

            it(`Нажатие по первой строке в таблице`, async () => await dec.simple(el.table.strHandler,
                [1, entry.max],
                el.table));

            it('Нажатие кнопки "Редактировать"', async () => await dec.simple(el.butIcBefore.handler,
                [but.edit, entry.max],
                el.butIcBefore));

            it('Отображене модального окна "Редактировать дополнительное поле"',
                async () => await dec.simple(el.modal.additionalDataEdit.init,
                    [entry.max],
                    el.modal.additionalDataEdit));

            it('Удаление значения "Название поля"',async () => await dec.simple(el.input.backSpace,
                ['Название поля', '', entry.max],
                el.input));

            it('Кнопка "Сохранить" - не активна', async () => await dec.simple(el.button.disabled,
                ['Сохранить', entry.max],
                el.button));

            it('Нажатие кнопки "Сохранить"', async () => await dec.simpleFalse(el.button.handlerNoActive,
                ['Сохранить', entry.max],
                el.button));

            it('Модальное окно "Редактировать дополнительное поле" не закрыто',
                async () => await dec.simpleFalse(el.modal.additionalDataEdit.initClose,
                    [entry.min],
                    el.modal.additionalDataEdit));

            it('Нажатие кнопки закрытия модального окна',
                async () => await dec.simple(el.modal.additionalDataEdit.closeHandler,
                    [entry.max],
                    el.modal.additionalDataEdit));

            it('Отсутствие модального окна "Добавить дополнительное поле"',
                async () => await dec.simple(el.modal.additionalDataEdit.initClose,
                    [entry.max],
                    el.modal.additionalDataEdit));
        });

        describe('Проверка таблицы', () => {
            type.bef();

            aft();

            it(`Отображение ${type.count + 1} записей в таблице`, async () => await dec.simple(el.table.size,
                [type.count + 1, entry.max],
                el.table));

            it('Проверка "Название поля"', async () => await dec.simpleText(el.table.cellGetText,
                ['Название поля', 1, 1, entry.max],
                params.name,
                el.table));

            it('Проверка "Тип поля"', async () => await dec.simpleText(el.table.cellGetText,
                ['Тип поля', 1, 2, entry.max],
                'Дата',
                el.table));

            it('Проверка "Описание"', async () => await dec.simpleText(el.table.cellGetText,
                ['Описание', 1, 3, entry.max],
                params.description,
                el.table));

            it('Проверка "Значение по умолчанию"', async () => await dec.simpleText(el.table.cellGetText,
                ['Значение по умолчанию', 1, 4, entry.max],
                '',
                el.table));
        });

        describe('Проверка параметров', () => {
            type.bef();

            aft();

            it(`Нажатие по первой строке в таблице`, async () => await dec.simple(el.table.strHandler,
                [1, entry.max],
                el.table));

            it('Нажатие кнопки "Редактировать"', async () => await dec.simple(el.butIcBefore.handler,
                [but.edit, entry.max],
                el.butIcBefore));

            it('Отображене модального окна "Редактировать дополнительное поле"',
                async () => await dec.simple(el.modal.additionalDataEdit.init,
                    [entry.max],
                    el.modal.additionalDataEdit));

            it('Проверка "Название поля"', async () => await dec.simpleText(el.input.getValue,
                ['Название поля', '', entry.max],
                params.name,
                el.input));

            it('Проверка "Описание"', async () => await dec.simpleText(el.input.getValue,
                ['Описание', '', entry.max],
                params.description,
                el.input));

            it('Проверка "Тип поля"', async () => await dec.simpleText(el.select.getText,
                ['Тип поля', 'Дата', entry.max],
                'Дата',
                el.input));


            it('Нажатие кнопки закрытия модального окна',
                async () => await dec.simple(el.modal.additionalDataEdit.closeHandler,
                    [entry.max],
                    el.modal.additionalDataEdit));

            it('Отсутствие модального окна "Добавить дополнительное поле"',
                async () => await dec.simple(el.modal.additionalDataEdit.initClose,
                    [entry.max],
                    el.modal.additionalDataEdit));
        });

        describe('Удаление тестовых данных', () => {
            type.bef();
            aft();
            dataRemove(type);
        });

    });

    // Тип поля «Дата». Попытка дублирования.
    const typeDateDuplicate = () => describe(`Дополнительные данные. Тип поля: "Дата". ${type.person}. 
    Редактирование. Попытка дублирования.`, () => {
        const params = {
            data1: {
                name: 'typeTextDuplicateName',
            },
            data2: {
                name: 'TestName',
            },
            error: 'Такое название уже используется'
        };

        describe('API - добавление', () => {
            type.bef();

            aft();

            it('Добавление дополнительных данных', async () => {
                const cook = await page.base.getCookie('token');

                const data1 = {
                    name: params.data1.name,
                    comment: '',
                    type_id: 2,
                    default_value: '',
                    items: ''
                };
                await dec.simple(api.putAdditionalData,
                    [[data1], type.api, cook.text],
                    api.putAdditionalData);

                const data2 = {
                    name: params.data2.name,
                    comment: '',
                    type_id: 10,
                    default_value: '',
                    items: ''
                };
                await dec.simple(api.putAdditionalData,
                    [[data2], type.api, cook.text],
                    api.putAdditionalData);
            });
        });

        describe('Редактирование', () => {
            type.bef();

            aft();

            it(`Отображение ${type.count + 2} записей в таблице`, async () => await dec.simple(el.table.size,
                [type.count + 2, entry.max],
                el.table,));

            it(`Нажатие по первой строке в таблице`, async () => await dec.simple(el.table.strHandler,
                [1, entry.max],
                el.table));

            it('Нажатие кнопки "Редактировать"', async () => await dec.simple(el.butIcBefore.handler,
                [but.edit, entry.max],
                el.butIcBefore));

            it('Отображене модального окна "Редактировать дополнительное поле"',
                async () => await dec.simple(el.modal.additionalDataEdit.init,
                    [entry.max],
                    el.modal.additionalDataEdit));

            it('Удаление значения "Название поля"',async () => await dec.simple(el.input.backSpace,
                ['Название поля', '', entry.max],
                el.input));

            it('Ввод "Название поля"', async () => await dec.simple(el.input.sendKeys,
                ['Название поля', '', params.data1.name, entry.max],
                el.input));

            it('Нажатие кнопки "Сохранить"', async () => await dec.simple(el.button.handler,
                ['Сохранить', entry.max],
                el.button));

            it('Отображение ошибки',
                async () => await dec.simple(el.error.error,
                    [params.error, entry.max],
                    el.error));

            it('Нажатие кнопки закрытия модального окна',
                async () => await dec.simple(el.modal.additionalDataEdit.closeHandler,
                    [entry.max],
                    el.modal.additionalDataEdit));

            it('Отсутствие модального окна "Добавить дополнительное поле"',
                async () => await dec.simple(el.modal.additionalDataAdd.initClose,
                    [entry.max],
                    el.modal.additionalDataAdd));
        });

        describe('Проверка таблицы', () => {
            type.bef();

            aft();

            it(`Отображение ${type.count + 2} записей в таблице`, async () => await dec.simple(el.table.size,
                [type.count + 2, entry.max],
                el.table));

            it('Проверка "Название поля"', async () => await dec.simpleText(el.table.cellGetText,
                ['Название поля', 1, 1, entry.max],
                params.data2.name,
                el.table));

            it('Проверка "Тип поля"', async () => await dec.simpleText(el.table.cellGetText,
                ['Тип поля', 1, 2, entry.max],
                'Дата',
                el.table));

            it('Проверка "Описание"', async () => await dec.simpleText(el.table.cellGetText,
                ['Описание', 1, 3, entry.max],
                '',
                el.table));

            it('Проверка "Значение по умолчанию"', async () => await dec.simpleText(el.table.cellGetText,
                ['Значение по умолчанию', 1, 4, entry.max],
                '',
                el.table));

        });

        describe('Проверка параметров', () => {
            type.bef();

            aft();

            it(`Отображение ${type.count + 2} записей в таблице`, async () => await dec.simple(el.table.size,
                [type.count + 2, entry.max],
                el.table));

            it(`Нажатие по первой строке в таблице`, async () => await dec.simple(el.table.strHandler,
                [1, entry.max],
                el.table));

            it('Нажатие кнопки "Редактировать"', async () => await dec.simple(el.butIcBefore.handler,
                [but.edit, entry.max],
                el.butIcBefore));

            it('Отображене модального окна "Редактировать дополнительное поле"',
                async () => await dec.simple(el.modal.additionalDataEdit.init,
                    [entry.max],
                    el.modal.additionalDataEdit));

            it('Проверка "Название поля"', async () => await dec.simpleText(el.input.getValue,
                ['Название поля', '', entry.max],
                params.data2.name,
                el.input));

            it('Проверка "Описание"', async () => await dec.simpleText(el.input.getValue,
                ['Описание', '', entry.max],
                '',
                el.input));

            it('Проверка "Тип поля"', async () => await dec.simpleText(el.select.getText,
                ['Тип поля', 'Дата', entry.max],
                'Дата',
                el.input));

            it('Нажатие кнопки закрытия модального окна',
                async () => await dec.simple(el.modal.additionalDataEdit.closeHandler,
                    [entry.max],
                    el.modal.additionalDataEdit));

            it('Отсутствие модального окна "Добавить дополнительное поле"',
                async () => await dec.simple(el.modal.additionalDataEdit.initClose,
                    [entry.max],
                    el.modal.additionalDataEdit));
        });

        describe('Удаление тестовых данных', () => {
            type.bef();
            aft();
            dataRemove(type);
        });

    });

    // Тип поля «Дата». Проверки редактирования.
    const typeDate = () => describe(`Дополнительные данные. Тип поля: "Дата". ${type.person}. 
    Проверки редактирования.`, () => {
        typeDateMinParams();
        typeDateMaxParams();
        typeDateEditAllMaxParams();
        typeDateRemoveName();
        typeDateDuplicate();
    });

    // Тип поля «Дата и время».
    // Тип поля «Дата и время». Добавление необязательных параметров с минимальным количеством параметров.
    const typeDateTimeMinParams = () => describe(`Дополнительные данные. Тип поля: "Дата и время". ${type.person}. 
    Редактирование. Добавление необязательных параметров с минимальным количеством параметров.`, () => {
        const params = {
            name: 'typeDateTimeMinParamsName',
            description: 'typeDateTimeMinParamsDescription',
        };

        describe('API - добавление', () => {
            type.bef();

            aft();

            it('Добавление дополнительных данных', async () => {
                const data = {
                    name: params.name,
                    comment: '',
                    type_id: 11,
                    default_value: '',
                    items: ''
                };
                const cook = await page.base.getCookie('token');
                await dec.simple(api.putAdditionalData,
                    [[data], type.api, cook.text],
                    api.putAdditionalData);
            });
        });

        describe('Редактирование', () => {
            type.bef();

            aft();

            it(`Отображение ${type.count + 1} записей в таблице`, async () => await dec.simple(el.table.size,
                [type.count + 1, entry.max],
                el.table,));

            it(`Нажатие по первой строке в таблице`, async () => await dec.simple(el.table.strHandler,
                [1, entry.max],
                el.table));

            it('Нажатие кнопки "Редактировать"', async () => await dec.simple(el.butIcBefore.handler,
                [but.edit, entry.max],
                el.butIcBefore));

            it('Отображене модального окна "Редактировать дополнительное поле"',
                async () => await dec.simple(el.modal.additionalDataEdit.init,
                    [entry.max],
                    el.modal.additionalDataEdit));

            it('Ввод "Описание"', async () => await dec.simple(el.input.sendKeys,
                ['Описание', '', params.description, entry.max],
                el.input));

            it('Нажатие кнопки "Сохранить"', async () => await dec.simple(el.button.handler,
                ['Сохранить', entry.max],
                el.button));

            it('Отображение сообщения "Сохранено успешно"',
                async () => await dec.simple(el.success.success,
                    ['Сохранено успешно', entry.max],
                    el.success));

            it('Отсутствие модального окна "Добавить дополнительное поле"',
                async () => await dec.simple(el.modal.additionalDataAdd.initClose,
                    [entry.max],
                    el.modal.additionalDataAdd));
        });

        describe('Проверка таблицы', () => {
            type.bef();

            aft();

            it(`Отображение ${type.count + 1} записей в таблице`, async () => await dec.simple(el.table.size,
                [type.count + 1, entry.max],
                el.table));

            it('Проверка "Название поля"', async () => await dec.simpleText(el.table.cellGetText,
                ['Название поля', 1, 1, entry.max],
                params.name,
                el.table));

            it('Проверка "Тип поля"', async () => await dec.simpleText(el.table.cellGetText,
                ['Тип поля', 1, 2, entry.max],
                'Дата и время',
                el.table));

            it('Проверка "Описание"', async () => await dec.simpleText(el.table.cellGetText,
                ['Описание', 1, 3, entry.max],
                params.description,
                el.table));

            it('Проверка "Значение по умолчанию"', async () => await dec.simpleText(el.table.cellGetText,
                ['Значение по умолчанию', 1, 4, entry.max],
                '',
                el.table));
        });

        describe('Проверка параметров', () => {
            type.bef();

            aft();

            it(`Нажатие по первой строке в таблице`, async () => await dec.simple(el.table.strHandler,
                [1, entry.max],
                el.table));

            it('Нажатие кнопки "Редактировать"', async () => await dec.simple(el.butIcBefore.handler,
                [but.edit, entry.max],
                el.butIcBefore));

            it('Отображене модального окна "Редактировать дополнительное поле"',
                async () => await dec.simple(el.modal.additionalDataEdit.init,
                    [entry.max],
                    el.modal.additionalDataEdit));

            it('Проверка "Название поля"', async () => await dec.simpleText(el.input.getValue,
                ['Название поля', '', entry.max],
                params.name,
                el.input));

            it('Проверка "Описание"', async () => await dec.simpleText(el.input.getValue,
                ['Описание', '', entry.max],
                params.description,
                el.input));

            it('Проверка "Тип поля"', async () => await dec.simpleText(el.select.getText,
                ['Тип поля', 'Дата и время', entry.max],
                'Дата и время',
                el.input));

            it('Нажатие кнопки закрытия модального окна',
                async () => await dec.simple(el.modal.additionalDataEdit.closeHandler,
                    [entry.max],
                    el.modal.additionalDataEdit));

            it('Отсутствие модального окна "Добавить дополнительное поле"',
                async () => await dec.simple(el.modal.additionalDataEdit.initClose,
                    [entry.max],
                    el.modal.additionalDataEdit));
        });

        describe('Удаление тестовых данных', () => {
            type.bef();
            aft();
            dataRemove(type);
        });

    });

    // Тип поля «Дата и время». Удаление необязательных параметров с максимальным количеством параметров.
    const typeDateTimeMaxParams = () => describe(`Дополнительные данные. Тип поля: "Дата и время". ${type.person}. 
    Редактирование. Удаление необязательных параметров с максимальным количеством параметров.`, () => {
        const params = {
            name: 'typeDateTimeMaxParamsName',
            description: 'typeDateTimeMaxParamsDescription',
        };

        describe('API - добавление', () => {
            type.bef();

            aft();

            it('Добавление дополнительных данных', async () => {
                const data = {
                    name: params.name,
                    comment: params.description,
                    type_id: 11,
                    default_value: '',
                    items: ''
                };
                const cook = await page.base.getCookie('token');
                await dec.simple(api.putAdditionalData,
                    [[data], type.api, cook.text],
                    api.putAdditionalData);
            });
        });

        describe('Редактирование', () => {
            type.bef();

            aft();

            it(`Отображение ${type.count + 1} записей в таблице`, async () => await dec.simple(el.table.size,
                [type.count + 1, entry.max],
                el.table,));

            it(`Нажатие по первой строке в таблице`, async () => await dec.simple(el.table.strHandler,
                [1, entry.max],
                el.table));

            it('Нажатие кнопки "Редактировать"', async () => await dec.simple(el.butIcBefore.handler,
                [but.edit, entry.max],
                el.butIcBefore));

            it('Отображене модального окна "Редактировать дополнительное поле"',
                async () => await dec.simple(el.modal.additionalDataEdit.init,
                    [entry.max],
                    el.modal.additionalDataEdit));

            it('Удаление значения "Описание"',async () => await dec.simple(el.input.backSpace,
                ['Описание', '', entry.max],
                el.input));

            it('Нажатие кнопки "Сохранить"', async () => await dec.simple(el.button.handler,
                ['Сохранить', entry.max],
                el.button));

            it('Отображение сообщения "Сохранено успешно"',
                async () => await dec.simple(el.success.success,
                    ['Сохранено успешно', entry.max],
                    el.success));

            it('Отсутствие модального окна "Добавить дополнительное поле"',
                async () => await dec.simple(el.modal.additionalDataAdd.initClose,
                    [entry.max],
                    el.modal.additionalDataAdd));
        });

        describe('Проверка таблицы', () => {
            type.bef();

            aft();

            it(`Отображение ${type.count + 1} записей в таблице`, async () => await dec.simple(el.table.size,
                [type.count + 1, entry.max],
                el.table));

            it('Проверка "Название поля"', async () => await dec.simpleText(el.table.cellGetText,
                ['Название поля', 1, 1, entry.max],
                params.name,
                el.table));

            it('Проверка "Тип поля"', async () => await dec.simpleText(el.table.cellGetText,
                ['Тип поля', 1, 2, entry.max],
                'Дата и время',
                el.table));

            it('Проверка "Описание"', async () => await dec.simpleText(el.table.cellGetText,
                ['Описание', 1, 3, entry.max],
                '',
                el.table));

            it('Проверка "Значение по умолчанию"', async () => await dec.simpleText(el.table.cellGetText,
                ['Значение по умолчанию', 1, 4, entry.max],
                '',
                el.table));
        });

        describe('Проверка параметров', () => {
            type.bef();

            aft();

            it(`Нажатие по первой строке в таблице`, async () => await dec.simple(el.table.strHandler,
                [1, entry.max],
                el.table));

            it('Нажатие кнопки "Редактировать"', async () => await dec.simple(el.butIcBefore.handler,
                [but.edit, entry.max],
                el.butIcBefore));

            it('Отображене модального окна "Редактировать дополнительное поле"',
                async () => await dec.simple(el.modal.additionalDataEdit.init,
                    [entry.max],
                    el.modal.additionalDataEdit));

            it('Проверка "Название поля"', async () => await dec.simpleText(el.input.getValue,
                ['Название поля', '', entry.max],
                params.name,
                el.input));

            it('Проверка "Описание"', async () => await dec.simpleText(el.input.getValue,
                ['Описание', '', entry.max],
                '',
                el.input));

            it('Проверка "Тип поля"', async () => await dec.simpleText(el.select.getText,
                ['Тип поля', 'Дата и время', entry.max],
                'Дата и время',
                el.input));

            it('Нажатие кнопки закрытия модального окна',
                async () => await dec.simple(el.modal.additionalDataEdit.closeHandler,
                    [entry.max],
                    el.modal.additionalDataEdit));

            it('Отсутствие модального окна "Добавить дополнительное поле"',
                async () => await dec.simple(el.modal.additionalDataEdit.initClose,
                    [entry.max],
                    el.modal.additionalDataEdit));
        });

        describe('Удаление тестовых данных', () => {
            type.bef();
            aft();
            dataRemove(type);
        });

    });

    // Тип поля «Дата и время». Добавление необязательных параметров с максимальным количеством параметров.
    const typeDateTimeEditAllMaxParams = () => describe(`Дополнительные данные. Тип поля: "Дата и время".${type.person}.
    Редактирование. Редактирование всех параметров с максимальным количеством параметров.`, () => {
        const params = {
            data1: {
                name: 'TestName',
                description: 'TestDescription',
            },
            data2: {
                name: 'typeDateTimeEditAllMaxParamsName',
                description: 'typeDateTimeEditAllMaxParamsDescription',
            }
        };

        describe('API - добавление', () => {
            type.bef();

            aft();

            it('Добавление дополнительных данных', async () => {
                const data = {
                    name: params.data1.name,
                    comment: params.data1.description,
                    type_id: 11,
                    default_value: '',
                    items: ''
                };
                const cook = await page.base.getCookie('token');
                await dec.simple(api.putAdditionalData,
                    [[data], type.api, cook.text],
                    api.putAdditionalData);
            });
        });

        describe('Редактирование', () => {
            type.bef();

            aft();

            it(`Отображение ${type.count + 1} записей в таблице`, async () => await dec.simple(el.table.size,
                [type.count + 1, entry.max],
                el.table,));

            it(`Нажатие по первой строке в таблице`, async () => await dec.simple(el.table.strHandler,
                [1, entry.max],
                el.table));

            it('Нажатие кнопки "Редактировать"', async () => await dec.simple(el.butIcBefore.handler,
                [but.edit, entry.max],
                el.butIcBefore));

            it('Отображене модального окна "Редактировать дополнительное поле"',
                async () => await dec.simple(el.modal.additionalDataEdit.init,
                    [entry.max],
                    el.modal.additionalDataEdit));

            it('Удаление значения "Название поля"',async () => await dec.simple(el.input.backSpace,
                ['Название поля', '', entry.max],
                el.input));

            it('Ввод "Название поля"', async () => await dec.simple(el.input.sendKeys,
                ['Название поля', '', params.data2.name, entry.max],
                el.input));

            it('Удаление значения "Описание"',async () => await dec.simple(el.input.backSpace,
                ['Описание', '', entry.max],
                el.input));

            it('Ввод "Описание"', async () => await dec.simple(el.input.sendKeys,
                ['Описание', '', params.data2.description, entry.max],
                el.input));

            it('Нажатие кнопки "Сохранить"', async () => await dec.simple(el.button.handler,
                ['Сохранить', entry.max],
                el.button));

            it('Отображение сообщения "Сохранено успешно"',
                async () => await dec.simple(el.success.success,
                    ['Сохранено успешно', entry.max],
                    el.success));

            it('Отсутствие модального окна "Добавить дополнительное поле"',
                async () => await dec.simple(el.modal.additionalDataAdd.initClose,
                    [entry.max],
                    el.modal.additionalDataAdd));
        });

        describe('Проверка таблицы', () => {
            type.bef();

            aft();

            it(`Отображение ${type.count + 1} записей в таблице`, async () => await dec.simple(el.table.size,
                [type.count + 1, entry.max],
                el.table));

            it('Проверка "Название поля"', async () => await dec.simpleText(el.table.cellGetText,
                ['Название поля', 1, 1, entry.max],
                params.data2.name,
                el.table));

            it('Проверка "Тип поля"', async () => await dec.simpleText(el.table.cellGetText,
                ['Тип поля', 1, 2, entry.max],
                'Дата и время',
                el.table));

            it('Проверка "Описание"', async () => await dec.simpleText(el.table.cellGetText,
                ['Описание', 1, 3, entry.max],
                params.data2.description,
                el.table));

            it('Проверка "Значение по умолчанию"', async () => await dec.simpleText(el.table.cellGetText,
                ['Значение по умолчанию', 1, 4, entry.max],
                '',
                el.table));

        });

        describe('Проверка параметров', () => {
            type.bef();

            aft();

            it(`Нажатие по первой строке в таблице`, async () => await dec.simple(el.table.strHandler,
                [1, entry.max],
                el.table));

            it('Нажатие кнопки "Редактировать"', async () => await dec.simple(el.butIcBefore.handler,
                [but.edit, entry.max],
                el.butIcBefore));

            it('Отображене модального окна "Редактировать дополнительное поле"',
                async () => await dec.simple(el.modal.additionalDataEdit.init,
                    [entry.max],
                    el.modal.additionalDataEdit));

            it('Проверка "Название поля"', async () => await dec.simpleText(el.input.getValue,
                ['Название поля', '', entry.max],
                params.data2.name,
                el.input));

            it('Проверка "Описание"', async () => await dec.simpleText(el.input.getValue,
                ['Описание', '', entry.max],
                params.data2.description,
                el.input));

            it('Проверка "Тип поля"', async () => await dec.simpleText(el.select.getText,
                ['Тип поля', 'Дата и время', entry.max],
                'Дата и время',
                el.input));

            it('Нажатие кнопки закрытия модального окна',
                async () => await dec.simple(el.modal.additionalDataEdit.closeHandler,
                    [entry.max],
                    el.modal.additionalDataEdit));

            it('Отсутствие модального окна "Добавить дополнительное поле"',
                async () => await dec.simple(el.modal.additionalDataEdit.initClose,
                    [entry.max],
                    el.modal.additionalDataEdit));
        });

        describe('Удаление тестовых данных', () => {
            type.bef();
            aft();
            dataRemove(type);
        });

    });

    // ип поля «Дата и время». Попытка редактирования без «Название поля».
    const typeDateTimeRemoveName = () => describe(`Дополнительные данные. Тип поля: "Дата и время". ${type.person}. 
    Редактирование. Попытка редактирования без "Название поля".`, () => {
        const params = {
            name: 'typeDateTimeRemoveNameName',
            description: 'typeDateTimeRemoveNameDescription',
        };

        describe('API - добавление', () => {
            type.bef();

            aft();

            it('Добавление дополнительных данных', async () => {
                const data = {
                    name: params.name,
                    comment: params.description,
                    type_id: 11,
                    default_value: '',
                    items: ''
                };
                const cook = await page.base.getCookie('token');
                await dec.simple(api.putAdditionalData,
                    [[data], type.api, cook.text],
                    api.putAdditionalData);
            });
        });

        describe('Редактирование', () => {
            type.bef();

            aft();

            it(`Отображение ${type.count + 1} записей в таблице`, async () => await dec.simple(el.table.size,
                [type.count + 1, entry.max],
                el.table,));

            it(`Нажатие по первой строке в таблице`, async () => await dec.simple(el.table.strHandler,
                [1, entry.max],
                el.table));

            it('Нажатие кнопки "Редактировать"', async () => await dec.simple(el.butIcBefore.handler,
                [but.edit, entry.max],
                el.butIcBefore));

            it('Отображене модального окна "Редактировать дополнительное поле"',
                async () => await dec.simple(el.modal.additionalDataEdit.init,
                    [entry.max],
                    el.modal.additionalDataEdit));

            it('Удаление значения "Название поля"',async () => await dec.simple(el.input.backSpace,
                ['Название поля', '', entry.max],
                el.input));

            it('Кнопка "Сохранить" - не активна', async () => await dec.simple(el.button.disabled,
                ['Сохранить', entry.max],
                el.button));

            it('Нажатие кнопки "Сохранить"', async () => await dec.simpleFalse(el.button.handlerNoActive,
                ['Сохранить', entry.max],
                el.button));

            it('Модальное окно "Редактировать дополнительное поле" не закрыто',
                async () => await dec.simpleFalse(el.modal.additionalDataEdit.initClose,
                    [entry.min],
                    el.modal.additionalDataEdit));

            it('Нажатие кнопки закрытия модального окна',
                async () => await dec.simple(el.modal.additionalDataEdit.closeHandler,
                    [entry.max],
                    el.modal.additionalDataEdit));

            it('Отсутствие модального окна "Добавить дополнительное поле"',
                async () => await dec.simple(el.modal.additionalDataEdit.initClose,
                    [entry.max],
                    el.modal.additionalDataEdit));
        });

        describe('Проверка таблицы', () => {
            type.bef();

            aft();

            it(`Отображение ${type.count + 1} записей в таблице`, async () => await dec.simple(el.table.size,
                [type.count + 1, entry.max],
                el.table));

            it('Проверка "Название поля"', async () => await dec.simpleText(el.table.cellGetText,
                ['Название поля', 1, 1, entry.max],
                params.name,
                el.table));

            it('Проверка "Тип поля"', async () => await dec.simpleText(el.table.cellGetText,
                ['Тип поля', 1, 2, entry.max],
                'Дата и время',
                el.table));

            it('Проверка "Описание"', async () => await dec.simpleText(el.table.cellGetText,
                ['Описание', 1, 3, entry.max],
                params.description,
                el.table));

            it('Проверка "Значение по умолчанию"', async () => await dec.simpleText(el.table.cellGetText,
                ['Значение по умолчанию', 1, 4, entry.max],
                '',
                el.table));
        });

        describe('Проверка параметров', () => {
            type.bef();

            aft();

            it(`Нажатие по первой строке в таблице`, async () => await dec.simple(el.table.strHandler,
                [1, entry.max],
                el.table));

            it('Нажатие кнопки "Редактировать"', async () => await dec.simple(el.butIcBefore.handler,
                [but.edit, entry.max],
                el.butIcBefore));

            it('Отображене модального окна "Редактировать дополнительное поле"',
                async () => await dec.simple(el.modal.additionalDataEdit.init,
                    [entry.max],
                    el.modal.additionalDataEdit));

            it('Проверка "Название поля"', async () => await dec.simpleText(el.input.getValue,
                ['Название поля', '', entry.max],
                params.name,
                el.input));

            it('Проверка "Описание"', async () => await dec.simpleText(el.input.getValue,
                ['Описание', '', entry.max],
                params.description,
                el.input));

            it('Проверка "Тип поля"', async () => await dec.simpleText(el.select.getText,
                ['Тип поля', 'Дата и время', entry.max],
                'Дата и время',
                el.input));


            it('Нажатие кнопки закрытия модального окна',
                async () => await dec.simple(el.modal.additionalDataEdit.closeHandler,
                    [entry.max],
                    el.modal.additionalDataEdit));

            it('Отсутствие модального окна "Добавить дополнительное поле"',
                async () => await dec.simple(el.modal.additionalDataEdit.initClose,
                    [entry.max],
                    el.modal.additionalDataEdit));
        });

        describe('Удаление тестовых данных', () => {
            type.bef();
            aft();
            dataRemove(type);
        });

    });

    // Тип поля «Дата и время». Попытка дублирования.
    const typeDateTimeDuplicate = () => describe(`Дополнительные данные. Тип поля: "Дата и время". ${type.person}. 
    Редактирование. Попытка дублирования.`, () => {
        const params = {
            data1: {
                name: 'typeDateTimeDuplicate',
            },
            data2: {
                name: 'TestName',
            },
            error: 'Такое название уже используется'
        };

        describe('API - добавление', () => {
            type.bef();

            aft();

            it('Добавление дополнительных данных', async () => {
                const cook = await page.base.getCookie('token');

                const data1 = {
                    name: params.data1.name,
                    comment: '',
                    type_id: 2,
                    default_value: '',
                    items: ''
                };
                await dec.simple(api.putAdditionalData,
                    [[data1], type.api, cook.text],
                    api.putAdditionalData);

                const data2 = {
                    name: params.data2.name,
                    comment: '',
                    type_id: 11,
                    default_value: '',
                    items: ''
                };
                await dec.simple(api.putAdditionalData,
                    [[data2], type.api, cook.text],
                    api.putAdditionalData);
            });
        });

        describe('Редактирование', () => {
            type.bef();

            aft();

            it(`Отображение ${type.count + 2} записей в таблице`, async () => await dec.simple(el.table.size,
                [type.count + 2, entry.max],
                el.table,));

            it(`Нажатие по первой строке в таблице`, async () => await dec.simple(el.table.strHandler,
                [1, entry.max],
                el.table));

            it('Нажатие кнопки "Редактировать"', async () => await dec.simple(el.butIcBefore.handler,
                [but.edit, entry.max],
                el.butIcBefore));

            it('Отображене модального окна "Редактировать дополнительное поле"',
                async () => await dec.simple(el.modal.additionalDataEdit.init,
                    [entry.max],
                    el.modal.additionalDataEdit));

            it('Удаление значения "Название поля"',async () => await dec.simple(el.input.backSpace,
                ['Название поля', '', entry.max],
                el.input));

            it('Ввод "Название поля"', async () => await dec.simple(el.input.sendKeys,
                ['Название поля', '', params.data1.name, entry.max],
                el.input));

            it('Нажатие кнопки "Сохранить"', async () => await dec.simple(el.button.handler,
                ['Сохранить', entry.max],
                el.button));

            it('Отображение ошибки',
                async () => await dec.simple(el.error.error,
                    [params.error, entry.max],
                    el.error));

            it('Нажатие кнопки закрытия модального окна',
                async () => await dec.simple(el.modal.additionalDataEdit.closeHandler,
                    [entry.max],
                    el.modal.additionalDataEdit));

            it('Отсутствие модального окна "Добавить дополнительное поле"',
                async () => await dec.simple(el.modal.additionalDataAdd.initClose,
                    [entry.max],
                    el.modal.additionalDataAdd));
        });

        describe('Проверка таблицы', () => {
            type.bef();

            aft();

            it(`Отображение ${type.count + 2} записей в таблице`, async () => await dec.simple(el.table.size,
                [type.count + 2, entry.max],
                el.table));

            it('Проверка "Название поля"', async () => await dec.simpleText(el.table.cellGetText,
                ['Название поля', 1, 1, entry.max],
                params.data2.name,
                el.table));

            it('Проверка "Тип поля"', async () => await dec.simpleText(el.table.cellGetText,
                ['Тип поля', 1, 2, entry.max],
                'Дата и время',
                el.table));

            it('Проверка "Описание"', async () => await dec.simpleText(el.table.cellGetText,
                ['Описание', 1, 3, entry.max],
                '',
                el.table));

            it('Проверка "Значение по умолчанию"', async () => await dec.simpleText(el.table.cellGetText,
                ['Значение по умолчанию', 1, 4, entry.max],
                '',
                el.table));

        });

        describe('Проверка параметров', () => {
            type.bef();

            aft();

            it(`Отображение ${type.count + 2} записей в таблице`, async () => await dec.simple(el.table.size,
                [type.count + 2, entry.max],
                el.table));

            it(`Нажатие по первой строке в таблице`, async () => await dec.simple(el.table.strHandler,
                [1, entry.max],
                el.table));

            it('Нажатие кнопки "Редактировать"', async () => await dec.simple(el.butIcBefore.handler,
                [but.edit, entry.max],
                el.butIcBefore));

            it('Отображене модального окна "Редактировать дополнительное поле"',
                async () => await dec.simple(el.modal.additionalDataEdit.init,
                    [entry.max],
                    el.modal.additionalDataEdit));

            it('Проверка "Название поля"', async () => await dec.simpleText(el.input.getValue,
                ['Название поля', '', entry.max],
                params.data2.name,
                el.input));

            it('Проверка "Описание"', async () => await dec.simpleText(el.input.getValue,
                ['Описание', '', entry.max],
                '',
                el.input));

            it('Проверка "Тип поля"', async () => await dec.simpleText(el.select.getText,
                ['Тип поля', 'Дата и время', entry.max],
                'Дата и время',
                el.input));

            it('Нажатие кнопки закрытия модального окна',
                async () => await dec.simple(el.modal.additionalDataEdit.closeHandler,
                    [entry.max],
                    el.modal.additionalDataEdit));

            it('Отсутствие модального окна "Добавить дополнительное поле"',
                async () => await dec.simple(el.modal.additionalDataEdit.initClose,
                    [entry.max],
                    el.modal.additionalDataEdit));
        });

        describe('Удаление тестовых данных', () => {
            type.bef();
            aft();
            dataRemove(type);
        });

    });

    // Тип поля «Дата и время». Проверки редактирования.
    const typeDateTime = () => describe(`Дополнительные данные. Тип поля: "Дата и время". ${type.person}. 
    Проверки редактирования.`, () => {
        typeDateTimeMinParams();
        typeDateTimeMaxParams();
        typeDateTimeEditAllMaxParams();
        typeDateTimeRemoveName();
        typeDateTimeDuplicate();
    });

    // Проверки редактирования.
    const edit = () => describe(`Дополнительные данные. ${type.person}. Проверки редактирования.`, () => {
        typeText();
        typeGrafic();
        typeSelect();
        typeCheckbox();
        typeDate();
        typeDateTime();
    });

    return {
        typeTextMinParams,
        typeTextMaxParams,
        typeTextEditAllMaxParams,
        typeTextRemoveName,
        typeTextDuplicate,
        typeText,
        typeGraficMinParams,
        typeGraficMaxParams,
        typeGraficEditAllMaxParams,
        typeGraficRemoveName,
        typeGraficDuplicate,
        typeGrafic,
        typeSelectMinParams,
        typeSelectMaxParams,
        typeSelectEditAllMaxParams,
        typeSelectRemoveValueMinParams,
        typeSelectRemoveValueMaxParams,
        typeSelectRemoveName,
        typeSelectDuplicate,
        typeSelect,
        typeCheckboxMinParams,
        typeCheckboxMaxParams,
        typeCheckboxEditAllParams,
        typeCheckboxRemoveName,
        typeCheckboxDuplicate,
        typeCheckbox,
        typeDateMinParams,
        typeDateMaxParams,
        typeDateEditAllMaxParams,
        typeDateRemoveName,
        typeDateDuplicate,
        typeDate,
        typeDateTimeMinParams,
        typeDateTimeMaxParams,
        typeDateTimeEditAllMaxParams,
        typeDateTimeRemoveName,
        typeDateTimeDuplicate,
        typeDateTime,
        edit,
    };
};

// Тесты удаления
const remove = (type) => {

    // Тип поля «Текстовый». Удаление.
    const typeTextDelete = () => describe(`Дополнительные данные. Тип поля: "Текстовый". ${type.person}. Удаление.`,
        () => {
            const params = {
            name: 'typeTextRemoveName',
        };

            describe('API - добавление', () => {
                type.bef();

                aft();

                it('Добавление дополнительных данных', async () => {
                    const data = {
                        name: params.name,
                        comment: '',
                        type_id: 1,
                        default_value: '',
                        items: ''
                    };
                    const cook = await page.base.getCookie('token');
                    await dec.simple(api.putAdditionalData,
                        [[data], type.api, cook.text],
                        api.putAdditionalData);
                });
            });

            describe('Удаление', () => {
                type.bef();

                aft();

                it(`Отображение ${type.count + 1} записей в таблице`, async () => await dec.simple(el.table.size,
                    [type.count + 1, entry.max],
                    el.table,));

                it(`Нажатие по первой строке в таблице`, async () => await dec.simple(el.table.strHandler,
                    [1, entry.max],
                    el.table));

                it('Нажатие кнопки "Удалить"', async () => await dec.simple(el.butIcBefore.handler,
                    [but.delete, entry.max],
                    el.butIcBefore));

                it('Отображене модального окна "Подтвердите действие"',
                    async () => await dec.simple(el.modalConfirm.additionalDataDelete.init,
                        [entry.max],
                        el.modalConfirm.additionalDataDelete));

                it('Нажатие кнопки "Удалить"', async () => await dec.simple(el.button.handler,
                    ['Удалить', entry.max],
                    el.button));

                it('Отображение сообщения "Дополнительное поле успешно удалено"',
                    async () => await dec.simple(el.success.success,
                        ['Дополнительное поле успешно удалено', entry.max],
                        el.success));

                it('Отсутствие модального окна "Подтвердите действие"',
                    async () => await dec.simple(el.modalConfirm.additionalDataDelete.initClose,
                        [entry.max],
                        el.modalConfirm.additionalDataDelete));
            });

            describe('Проверка таблицы', () => {
                type.bef();

                aft();

                it(`Отображение ${type.count} записей в таблице`, async () => await dec.simple(el.table.size,
                    [type.count, entry.max],
                    el.table));
            });

    });

    // Тип поля «Графический». Удаление.
    const typeGraficDelete = () => describe(`Дополнительные данные. Тип поля: "Графический". ${type.person}. Удаление.`,
        () => {

            const params = {
                name: 'typeGraficDeleteName',
            };

            describe('API - добавление', () => {
                type.bef();

                aft();

                it('Добавление дополнительных данных', async () => {
                    const data = {
                        name: params.name,
                        comment: '',
                        type_id: 2,
                        default_value: '',
                        items: ''
                    };
                    const cook = await page.base.getCookie('token');
                    await dec.simple(api.putAdditionalData,
                        [[data], type.api, cook.text],
                        api.putAdditionalData);
                });
            });

            describe('Удаление', () => {
                type.bef();

                aft();

                it(`Отображение ${type.count + 1} записей в таблице`, async () => await dec.simple(el.table.size,
                    [type.count + 1, entry.max],
                    el.table,));

                it(`Нажатие по первой строке в таблице`, async () => await dec.simple(el.table.strHandler,
                    [1, entry.max],
                    el.table));

                it('Нажатие кнопки "Удалить"', async () => await dec.simple(el.butIcBefore.handler,
                    [but.delete, entry.max],
                    el.butIcBefore));

                it('Отображене модального окна "Подтвердите действие"',
                    async () => await dec.simple(el.modalConfirm.additionalDataDelete.init,
                        [entry.max],
                        el.modalConfirm.additionalDataDelete));

                it('Нажатие кнопки "Удалить"', async () => await dec.simple(el.button.handler,
                    ['Удалить', entry.max],
                    el.button));

                it('Отображение сообщения "Дополнительное поле успешно удалено"',
                    async () => await dec.simple(el.success.success,
                        ['Дополнительное поле успешно удалено', entry.max],
                        el.success));

                it('Отсутствие модального окна "Подтвердите действие"',
                    async () => await dec.simple(el.modalConfirm.additionalDataDelete.initClose,
                        [entry.max],
                        el.modalConfirm.additionalDataDelete));
            });

            describe('Проверка таблицы', () => {
                type.bef();

                aft();

                it(`Отображение ${type.count} записей в таблице`, async () => await dec.simple(el.table.size,
                    [type.count, entry.max],
                    el.table));
            });

    });

    // Тип поля «Выпадающий список». Удаление.
    const typeSelectDelete = () => describe(`Дополнительные данные. Тип поля: "Выпадающий список". ${type.person}. 
    Удаление.`, () => {

        const params = {
            name: 'typeSelectDeleteName',
        };

        describe('API - добавление', () => {
                type.bef();

                aft();

                it('Добавление дополнительных данных', async () => {
                    const data = {
                        name: params.name,
                        comment: '',
                        type_id: 9,
                        default_value: '',
                        items: ''
                    };
                    const cook = await page.base.getCookie('token');
                    await dec.simple(api.putAdditionalData,
                        [[data], type.api, cook.text],
                        api.putAdditionalData);
                });
            });

        describe('Удаление', () => {
            type.bef();

            aft();

            it(`Отображение ${type.count + 1} записей в таблице`, async () => await dec.simple(el.table.size,
                [type.count + 1, entry.max],
                el.table,));

            it(`Нажатие по первой строке в таблице`, async () => await dec.simple(el.table.strHandler,
                [1, entry.max],
                el.table));

            it('Нажатие кнопки "Удалить"', async () => await dec.simple(el.butIcBefore.handler,
                [but.delete, entry.max],
                el.butIcBefore));

            it('Отображене модального окна "Подтвердите действие"',
                async () => await dec.simple(el.modalConfirm.additionalDataDelete.init,
                    [entry.max],
                    el.modalConfirm.additionalDataDelete));

            it('Нажатие кнопки "Удалить"', async () => await dec.simple(el.button.handler,
                ['Удалить', entry.max],
                el.button));

            it('Отображение сообщения "Дополнительное поле успешно удалено"',
                async () => await dec.simple(el.success.success,
                    ['Дополнительное поле успешно удалено', entry.max],
                    el.success));

            it('Отсутствие модального окна "Подтвердите действие"',
                async () => await dec.simple(el.modalConfirm.additionalDataDelete.initClose,
                    [entry.max],
                    el.modalConfirm.additionalDataDelete));
        });

        describe('Проверка таблицы', () => {
            type.bef();

            aft();

            it(`Отображение ${type.count} записей в таблице`, async () => await dec.simple(el.table.size,
                [type.count, entry.max],
                el.table));
        });

    });

    // Тип поля «Чекбокс». Удаление.
    const typeCheckboxDelete = () => describe(`Дополнительные данные. Тип поля: "Чекбокс". ${type.person}. 
    Удаление.`, () => {

        const params = {
            name: 'typeCheckboxDeleteName',
        };

        describe('API - добавление', () => {
            type.bef();

            aft();

            it('Добавление дополнительных данных', async () => {
                const data = {
                    name: params.name,
                    comment: '',
                    type_id: 8,
                    default_value: '',
                    items: ''
                };
                const cook = await page.base.getCookie('token');
                await dec.simple(api.putAdditionalData,
                    [[data], type.api, cook.text],
                    api.putAdditionalData);
            });
        });

        describe('Удаление', () => {
            type.bef();

            aft();

            it(`Отображение ${type.count + 1} записей в таблице`, async () => await dec.simple(el.table.size,
                [type.count + 1, entry.max],
                el.table,));

            it(`Нажатие по первой строке в таблице`, async () => await dec.simple(el.table.strHandler,
                [1, entry.max],
                el.table));

            it('Нажатие кнопки "Удалить"', async () => await dec.simple(el.butIcBefore.handler,
                [but.delete, entry.max],
                el.butIcBefore));

            it('Отображене модального окна "Подтвердите действие"',
                async () => await dec.simple(el.modalConfirm.additionalDataDelete.init,
                    [entry.max],
                    el.modalConfirm.additionalDataDelete));

            it('Нажатие кнопки "Удалить"', async () => await dec.simple(el.button.handler,
                ['Удалить', entry.max],
                el.button));

            it('Отображение сообщения "Дополнительное поле успешно удалено"',
                async () => await dec.simple(el.success.success,
                    ['Дополнительное поле успешно удалено', entry.max],
                    el.success));

            it('Отсутствие модального окна "Подтвердите действие"',
                async () => await dec.simple(el.modalConfirm.additionalDataDelete.initClose,
                    [entry.max],
                    el.modalConfirm.additionalDataDelete));
        });

        describe('Проверка таблицы', () => {
            type.bef();

            aft();

            it(`Отображение ${type.count} записей в таблице`, async () => await dec.simple(el.table.size,
                [type.count, entry.max],
                el.table));
        });

    });

    // Тип поля «Дата». Удаление.
    const typeDateDelete = () => describe(`Дополнительные данные. Тип поля: "Дата". ${type.person}. 
    Удаление.`, () => {

        const params = {
            name: 'typeDateDeleteName',
        };

        describe('API - добавление', () => {
            type.bef();

            aft();

            it('Добавление дополнительных данных', async () => {
                const data = {
                    name: params.name,
                    comment: '',
                    type_id: 10,
                    default_value: '',
                    items: ''
                };
                const cook = await page.base.getCookie('token');
                await dec.simple(api.putAdditionalData,
                    [[data], type.api, cook.text],
                    api.putAdditionalData);
            });
        });

        describe('Удаление', () => {
            type.bef();

            aft();

            it(`Отображение ${type.count + 1} записей в таблице`, async () => await dec.simple(el.table.size,
                [type.count + 1, entry.max],
                el.table,));

            it(`Нажатие по первой строке в таблице`, async () => await dec.simple(el.table.strHandler,
                [1, entry.max],
                el.table));

            it('Нажатие кнопки "Удалить"', async () => await dec.simple(el.butIcBefore.handler,
                [but.delete, entry.max],
                el.butIcBefore));

            it('Отображене модального окна "Подтвердите действие"',
                async () => await dec.simple(el.modalConfirm.additionalDataDelete.init,
                    [entry.max],
                    el.modalConfirm.additionalDataDelete));

            it('Нажатие кнопки "Удалить"', async () => await dec.simple(el.button.handler,
                ['Удалить', entry.max],
                el.button));

            it('Отображение сообщения "Дополнительное поле успешно удалено"',
                async () => await dec.simple(el.success.success,
                    ['Дополнительное поле успешно удалено', entry.max],
                    el.success));

            it('Отсутствие модального окна "Подтвердите действие"',
                async () => await dec.simple(el.modalConfirm.additionalDataDelete.initClose,
                    [entry.max],
                    el.modalConfirm.additionalDataDelete));
        });

        describe('Проверка таблицы', () => {
            type.bef();

            aft();

            it(`Отображение ${type.count} записей в таблице`, async () => await dec.simple(el.table.size,
                [type.count, entry.max],
                el.table));
        });

    });

    // Тип поля «Дата и время». Удаление.
    const typeDateTimeDelete = () => describe(`Дополнительные данные. Тип поля: "Дата и время". ${type.person}. 
    Удаление.`, () => {

        const params = {
            name: 'typeDateTimeName',
        };

        describe('API - добавление', () => {
            type.bef();

            aft();

            it('Добавление дополнительных данных', async () => {
                const data = {
                    name: params.name,
                    comment: '',
                    type_id: 11,
                    default_value: '',
                    items: ''
                };
                const cook = await page.base.getCookie('token');
                await dec.simple(api.putAdditionalData,
                    [[data], type.api, cook.text],
                    api.putAdditionalData);
            });
        });

        describe('Удаление', () => {
            type.bef();

            aft();

            it(`Отображение ${type.count + 1} записей в таблице`, async () => await dec.simple(el.table.size,
                [type.count + 1, entry.max],
                el.table,));

            it(`Нажатие по первой строке в таблице`, async () => await dec.simple(el.table.strHandler,
                [1, entry.max],
                el.table));

            it('Нажатие кнопки "Удалить"', async () => await dec.simple(el.butIcBefore.handler,
                [but.delete, entry.max],
                el.butIcBefore));

            it('Отображене модального окна "Подтвердите действие"',
                async () => await dec.simple(el.modalConfirm.additionalDataDelete.init,
                    [entry.max],
                    el.modalConfirm.additionalDataDelete));

            it('Нажатие кнопки "Удалить"', async () => await dec.simple(el.button.handler,
                ['Удалить', entry.max],
                el.button));

            it('Отображение сообщения "Дополнительное поле успешно удалено"',
                async () => await dec.simple(el.success.success,
                    ['Дополнительное поле успешно удалено', entry.max],
                    el.success));

            it('Отсутствие модального окна "Подтвердите действие"',
                async () => await dec.simple(el.modalConfirm.additionalDataDelete.initClose,
                    [entry.max],
                    el.modalConfirm.additionalDataDelete));
        });

        describe('Проверка таблицы', () => {
            type.bef();

            aft();

            it(`Отображение ${type.count} записей в таблице`, async () => await dec.simple(el.table.size,
                [type.count, entry.max],
                el.table));
        });

    });

    // Проверки удаления.
    const remove = () => describe(`Дополнительные данные. ${type.person}. Проверки удаления.`, () => {
        typeTextDelete();
        typeGraficDelete();
        typeSelectDelete();
        typeCheckboxDelete();
        typeDateDelete();
        typeDateTimeDelete();
    });

    return {
        typeTextDelete,
        typeGraficDelete,
        typeSelectDelete,
        typeCheckboxDelete,
        typeDateDelete,
        typeDateTimeDelete,
        remove
    }

};

// Класс тестирвования служебных полей
class Service {
    constructor(type, params) {
        this.person = type.person;
        this.type = type;
        this.params = params;
    }

    editName() {
        return (
            describe(`Дополнительные данные. ${this.type.person}. Служебное поле "${this.params.name}". 
            Попытка редактирования "Название поля".`, () => {

                describe('Редактирование', () => {
                    this.type.bef();

                    aft();

                    it(`Отображение ${this.type.count} записей в таблице`, async () => await dec.simple(el.table.size,
                        [this.type.count, entry.max],
                        el.table,));

                    it(`Нажатие по строке ${this.num} в таблице`, async () => await dec.simple(el.table.strHandler,
                        [this.params.num, entry.max],
                        el.table));

                    it('Нажатие кнопки "Редактировать"', async () => await dec.simple(el.butIcBefore.handler,
                        [but.edit, entry.max],
                        el.butIcBefore));

                    it('Отображене модального окна "Редактировать дополнительное поле"',
                        async () => await dec.simple(el.modal.additionalDataEdit.init,
                            [entry.max],
                            el.modal.additionalDataEdit));

                    it('Удаление значения "Название поля"', async () => await dec.simple(el.input.backSpace,
                        ['Название поля', '', entry.max],
                        el.input));

                    it('Ввод "Название поля"', async () => await dec.simple(el.input.sendKeys,
                        ['Название поля', '', this.params.newName, entry.max],
                        el.input));

                    it('Нажатие кнопки "Сохранить"', async () => await dec.simple(el.button.handler,
                        ['Сохранить', entry.max],
                        el.button));

                    it('Отображение ошибки "Служебные поля редактировать запрещено"',
                        async () => await dec.simple(el.error.error,
                            [this.params.error1, entry.max],
                            el.error));

                    it('Нажатие кнопки закрытия модального окна',
                        async () => await dec.simple(el.modal.additionalDataEdit.closeHandler,
                            [entry.max],
                            el.modal.additionalDataEdit));

                    it('Отсутствие модального окна "Добавить дополнительное поле"',
                        async () => await dec.simple(el.modal.additionalDataAdd.initClose,
                            [entry.max],
                            el.modal.additionalDataAdd));

                });

                describe('Проверка таблицы', () => {
                    this.type.bef();

                    aft();

                    it(`Отображение ${this.type.count} записей в таблице`, async () => await dec.simple(el.table.size,
                        [this.type.count, entry.max],
                        el.table));

                    it('Проверка "Название поля"', async () => await dec.simpleText(el.table.cellGetText,
                        ['Название поля', this.params.num, 1, entry.max],
                        this.params.name,
                        el.table));

                    it('Проверка "Тип поля"', async () => await dec.simpleText(el.table.cellGetText,
                        ['Тип поля', this.params.num, 2, entry.max],
                        this.params.type,
                        el.table));

                    it('Проверка "Описание"', async () => await dec.simpleText(el.table.cellGetText,
                        ['Описание', this.params.num, 3, entry.max],
                        this.params.description,
                        el.table));

                    it('Проверка "Значение по умолчанию"', async () => await dec.simpleText(el.table.cellGetText,
                        ['Значение по умолчанию', this.params.num, 4, entry.max],
                        '',
                        el.table));
                });

                describe('Проверка параметров', () => {
                    this.type.bef();

                    aft();

                    it(`Нажатие по строке ${this.params.num} в таблице`, async () => await dec.simple(el.table.strHandler,
                        [this.params.num, entry.max],
                        el.table));

                    it('Нажатие кнопки "Редактировать"', async () => await dec.simple(el.butIcBefore.handler,
                        [but.edit, entry.max],
                        el.butIcBefore));

                    it('Отображене модального окна "Редактировать дополнительное поле"',
                        async () => await dec.simple(el.modal.additionalDataEdit.init,
                            [entry.max],
                            el.modal.additionalDataEdit));

                    it('Проверка "Название поля"', async () => await dec.simpleText(el.input.getValue,
                        ['Название поля', '', entry.max],
                        this.params.name,
                        el.input));

                    it('Проверка "Описание"', async () => await dec.simpleText(el.input.getValue,
                        ['Описание', '', entry.max],
                        this.params.description,
                        el.input));

                    it('Проверка "Тип поля"', async () => await dec.simpleText(el.select.getText,
                        ['Тип поля', this.params.type, entry.max],
                        this.params.type,
                        el.input));

                    it('Нажатие кнопки закрытия модального окна',
                        async () => await dec.simple(el.modal.additionalDataEdit.closeHandler,
                            [entry.max],
                            el.modal.additionalDataEdit));

                    it('Отсутствие модального окна "Добавить дополнительное поле"',
                        async () => await dec.simple(el.modal.additionalDataEdit.initClose,
                            [entry.max],
                            el.modal.additionalDataEdit));
                });

            }));
    }

    editDescription() {
        return (
            describe(`Дополнительные данные. ${this.type.person}. Служебное поле "${this.params.name}". 
            Попытка редактирования "Описание".`, () => {

                describe('Редактирование', () => {
                    this.type.bef();

                    aft();

                    it(`Отображение ${this.type.count} записей в таблице`, async () => await dec.simple(el.table.size,
                        [this.type.count, entry.max],
                        el.table,));

                    it(`Нажатие по строке ${this.params.num} в таблице`, async () => await dec.simple(el.table.strHandler,
                        [this.params.num, entry.max],
                        el.table));

                    it('Нажатие кнопки "Редактировать"', async () => await dec.simple(el.butIcBefore.handler,
                        [but.edit, entry.max],
                        el.butIcBefore));

                    it('Отображене модального окна "Редактировать дополнительное поле"',
                        async () => await dec.simple(el.modal.additionalDataEdit.init,
                            [entry.max],
                            el.modal.additionalDataEdit));

                    it('Удаление значения "Описание"', async () => await dec.simple(el.input.backSpace,
                        ['Описание', '', entry.max],
                        el.input));

                    it('Ввод "Описание"', async () => await dec.simple(el.input.sendKeys,
                        ['Описание', '', this.params.newDescription, entry.max],
                        el.input));

                    it('Нажатие кнопки "Сохранить"', async () => await dec.simple(el.button.handler,
                        ['Сохранить', entry.max],
                        el.button));

                    it('Отображение ошибки "Служебные поля редактировать запрещено"',
                        async () => await dec.simple(el.error.error,
                            [this.params.error1, entry.max],
                            el.error));

                    it('Нажатие кнопки закрытия модального окна',
                        async () => await dec.simple(el.modal.additionalDataEdit.closeHandler,
                            [entry.max],
                            el.modal.additionalDataEdit));

                    it('Отсутствие модального окна "Добавить дополнительное поле"',
                        async () => await dec.simple(el.modal.additionalDataAdd.initClose,
                            [entry.max],
                            el.modal.additionalDataAdd));

                });

                describe('Проверка таблицы', () => {
                    this.type.bef();

                    aft();

                    it(`Отображение ${this.type.count} записей в таблице`, async () => await dec.simple(el.table.size,
                        [this.type.count, entry.max],
                        el.table));

                    it('Проверка "Название поля"', async () => await dec.simpleText(el.table.cellGetText,
                        ['Название поля', this.params.num, 1, entry.max],
                        this.params.name,
                        el.table));

                    it('Проверка "Тип поля"', async () => await dec.simpleText(el.table.cellGetText,
                        ['Тип поля', this.params.num, 2, entry.max],
                        this.params.type,
                        el.table));

                    it('Проверка "Описание"', async () => await dec.simpleText(el.table.cellGetText,
                        ['Описание', this.params.num, 3, entry.max],
                        this.params.description,
                        el.table));

                    it('Проверка "Значение по умолчанию"', async () => await dec.simpleText(el.table.cellGetText,
                        ['Значение по умолчанию', this.params.num, 4, entry.max],
                        '',
                        el.table));
                });

                describe('Проверка параметров', () => {
                    this.type.bef();

                    aft();

                    it(`Нажатие по строке ${this.params.num} в таблице`, async () => await dec.simple(el.table.strHandler,
                        [this.params.num, entry.max],
                        el.table));

                    it('Нажатие кнопки "Редактировать"', async () => await dec.simple(el.butIcBefore.handler,
                        [but.edit, entry.max],
                        el.butIcBefore));

                    it('Отображене модального окна "Редактировать дополнительное поле"',
                        async () => await dec.simple(el.modal.additionalDataEdit.init,
                            [entry.max],
                            el.modal.additionalDataEdit));

                    it('Проверка "Название поля"', async () => await dec.simpleText(el.input.getValue,
                        ['Название поля', '', entry.max],
                        this.params.name,
                        el.input));

                    it('Проверка "Описание"', async () => await dec.simpleText(el.input.getValue,
                        ['Описание', '', entry.max],
                        this.params.description,
                        el.input));

                    it('Проверка "Тип поля"', async () => await dec.simpleText(el.select.getText,
                        ['Тип поля', this.params.type, entry.max],
                        this.params.type,
                        el.input));

                    it('Нажатие кнопки закрытия модального окна',
                        async () => await dec.simple(el.modal.additionalDataEdit.closeHandler,
                            [entry.max],
                            el.modal.additionalDataEdit));

                    it('Отсутствие модального окна "Добавить дополнительное поле"',
                        async () => await dec.simple(el.modal.additionalDataEdit.initClose,
                            [entry.max],
                            el.modal.additionalDataEdit));
                });

            }));
    }

    deleteService() {
        return (
            describe(`Дополнительные данные. ${this.type.person}. Служебное поле "${this.params.name}". 
            Попытка удаления.`, () => {

                describe('Удаление', () => {
                    this.type.bef();

                    aft();

                    it(`Отображение ${this.type.count} записей в таблице`, async () => await dec.simple(el.table.size,
                        [this.type.count, entry.max],
                        el.table,));

                    it(`Нажатие по строке ${this.params.num} в таблице`, async () => await dec.simple(el.table.strHandler,
                        [this.params.num, entry.max],
                        el.table));

                    it('Нажатие кнопки "Удалить"', async () => await dec.simple(el.butIcBefore.handler,
                        [but.delete, entry.max],
                        el.butIcBefore));

                    it('Отображене модального окна "Подтвердите действие"',
                        async () => await dec.simple(el.modalConfirm.additionalDataDelete.init,
                            [entry.max],
                            el.modalConfirm.additionalDataDelete));

                    it('Нажатие кнопки "Удалить"', async () => await dec.simple(el.button.handler,
                        ['Удалить', entry.max],
                        el.button));

                    it('Отображение ошибки "Служебные поля удалять запрещено"',
                        async () => await dec.simple(el.error.error,
                            [this.params.error2, entry.max],
                            el.error));

                    it('Отсутствие модального окна "Подтвердите действие"',
                        async () => await dec.simple(el.modalConfirm.additionalDataDelete.initClose,
                            [entry.max],
                            el.modalConfirm.additionalDataDelete));
                });

                describe('Проверка таблицы', () => {
                    this.type.bef();

                    aft();

                    it(`Отображение ${this.type.count} записей в таблице`, async () => await dec.simple(el.table.size,
                        [this.type.count, entry.max],
                        el.table));

                    it('Проверка "Название поля"', async () => await dec.simpleText(el.table.cellGetText,
                        ['Название поля', this.params.num, 1, entry.max],
                        this.params.name,
                        el.table));

                    it('Проверка "Тип поля"', async () => await dec.simpleText(el.table.cellGetText,
                        ['Тип поля', this.params.num, 2, entry.max],
                        this.params.type,
                        el.table));

                    it('Проверка "Описание"', async () => await dec.simpleText(el.table.cellGetText,
                        ['Описание', this.params.num, 3, entry.max],
                        this.params.description,
                        el.table));

                    it('Проверка "Значение по умолчанию"', async () => await dec.simpleText(el.table.cellGetText,
                        ['Значение по умолчанию', this.params.num, 4, entry.max],
                        '',
                        el.table));
                });

            }));
    }

    service() {
        this.editName();
        this.editDescription();
        this.deleteService();
    }

}

// Тесты служебных полей для сотрудника
const serviceStaff = (type) => {

    const photoParams = {
        name: 'Фотография',
        type: 'Графический',
        description: 'Служебное поле',
        defaultValue: '',
        newName: 'photoName',
        newDescription: 'photoDescription',
        error1: 'Служебные поля редактировать запрещено',
        error2: 'Служебные поля удалять запрещено',
        num: 1
    };

    const pinCodeParams = {
        name: 'Пин-код',
        type: 'Пин-код',
        description: 'Служебное поле',
        defaultValue: '',
        newName: 'pinCodeParamsName',
        newDescription: 'pinCodeParamsDescription',
        error1: 'Служебные поля редактировать запрещено',
        error2: 'Служебные поля удалять запрещено',
        num: 2
    };

    const viberParams = {
        name: 'Viber',
        type: 'Viber',
        description: 'Служебное поле',
        defaultValue: '',
        newName: 'viberParamsName',
        newDescription: 'viberParamsDescription',
        error1: 'Служебные поля редактировать запрещено',
        error2: 'Служебные поля удалять запрещено',
        num: 3
    };

    const phoneParams = {
        name: 'Телефон',
        type: 'Телефон',
        description: 'Служебное поле',
        defaultValue: '',
        newName: 'phoneParamsName',
        newDescription: 'phoneParamsDescription',
        error1: 'Служебные поля редактировать запрещено',
        error2: 'Служебные поля удалять запрещено',
        num: 4
    };

    const emailParams = {
        name: 'Email',
        type: 'Email',
        description: 'Служебное поле',
        defaultValue: '',
        newName: 'emailParamsName',
        newDescription: 'emailParamsDescription',
        error1: 'Служебные поля редактировать запрещено',
        error2: 'Служебные поля удалять запрещено',
        num: 5
    };

    const telegramParams = {
        name: 'Telegram',
        type: 'Telegram',
        description: 'Служебное поле',
        defaultValue: '',
        newName: 'emailParamsName',
        newDescription: 'emailParamsDescription',
        error1: 'Служебные поля редактировать запрещено',
        error2: 'Служебные поля удалять запрещено',
        num: 6
    };

    const service = () => describe(`Дополнительные данные. ${type.person}. Проверки служебных полей.`, () => {
        new Service(settings.staff, photoParams).service(context);
        new Service(settings.staff, pinCodeParams).service(context);
        new Service(settings.staff, viberParams).service(context);
        new Service(settings.staff, phoneParams).service(context);
        new Service(settings.staff, emailParams).service(context);
        new Service(settings.staff, telegramParams).service(context);
    });

    return {
        photoEditName: () => new Service(settings.staff, photoParams).editName(context),
        photoEditDescription: () => new Service(settings.staff, photoParams).editDescription(context),
        photoDelete: () => new Service(settings.staff, photoParams).deleteService(context),
        photo: () => new Service(settings.staff, photoParams).service(context),
        pinCodeEditName: () => new Service(settings.staff, pinCodeParams).editName(context),
        pinCodeEditDescription: () => new Service(settings.staff, pinCodeParams).editDescription(context),
        pinCodeDelete: () => new Service(settings.staff, pinCodeParams).deleteService(context),
        pinCode: () => new Service(settings.staff, pinCodeParams).service(context),
        viberEditName: () => new Service(settings.staff, viberParams).editName(context),
        viberEditDescription: () => new Service(settings.staff, viberParams).editDescription(context),
        viberDelete: () => new Service(settings.staff, viberParams).deleteService(context),
        viber: () => new Service(settings.staff, viberParams).service(context),
        phoneEditName: () => new Service(settings.staff, phoneParams).editName(context),
        phoneEditDescription: () => new Service(settings.staff, phoneParams).editDescription(context),
        phoneDelete: () => new Service(settings.staff, phoneParams).deleteService(context),
        phone: () => new Service(settings.staff, phoneParams).service(context),
        emailEditName: () => new Service(settings.staff, emailParams).editName(context),
        emailEditDescription: () => new Service(settings.staff, emailParams).editDescription(context),
        emailDelete: () => new Service(settings.staff, emailParams).deleteService(context),
        email: () => new Service(settings.staff, emailParams).service(context),
        telegramEditName: () => new Service(settings.staff, telegramParams).editName(context),
        telegramEditDescription: () => new Service(settings.staff, telegramParams).editDescription(context),
        telegramDelete: () => new Service(settings.staff, telegramParams).deleteService(context),
        telegram: () => new Service(settings.staff, telegramParams).service(context),
        service,
    }
};

// Тесты служебных полей для посетителя
const serviceVisitor = (type) => {

    const photoParams = {
        name: 'Фотография',
        type: 'Графический',
        description: 'Служебное поле',
        defaultValue: '',
        newName: 'photoName',
        newDescription: 'photoDescription',
        error1: 'Служебные поля редактировать запрещено',
        error2: 'Служебные поля удалять запрещено',
        num: 1
    };

    const pinCodeParams = {
        name: 'Пин-код',
        type: 'Пин-код',
        description: 'Служебное поле',
        defaultValue: '',
        newName: 'pinCodeParamsName',
        newDescription: 'pinCodeParamsDescription',
        error1: 'Служебные поля редактировать запрещено',
        error2: 'Служебные поля удалять запрещено',
        num: 2
    };

    const emailParams = {
        name: 'Email',
        type: 'Email',
        description: 'Служебное поле',
        defaultValue: '',
        newName: 'emailParamsName',
        newDescription: 'emailParamsDescription',
        error1: 'Служебные поля редактировать запрещено',
        error2: 'Служебные поля удалять запрещено',
        num: 3
    };

    const service = () => describe(`Дополнительные данные. ${type.person}. Проверки служебных полей.`, () => {
        new Service(settings.visitor, photoParams).service(context);
        new Service(settings.visitor, pinCodeParams).service(context);
        new Service(settings.visitor, emailParams).service(context);
    });

    return {
        photoEditName: () => new Service(settings.visitor, photoParams).editName(context),
        photoEditDescription: () => new Service(settings.visitor, photoParams).editDescription(context),
        photoDelete: () => new Service(settings.visitor, photoParams).deleteService(context),
        photo: () => new Service(settings.visitor, photoParams).service(context),
        pinCodeEditName: () => new Service(settings.visitor, pinCodeParams).editName(context),
        pinCodeEditDescription: () => new Service(settings.visitor, pinCodeParams).editDescription(context),
        pinCodeDelete: () => new Service(settings.visitor, pinCodeParams).deleteService(context),
        pinCode: () => new Service(settings.visitor, pinCodeParams).service(context),
        emailEditName: () => new Service(settings.visitor, emailParams).editName(context),
        emailEditDescription: () => new Service(settings.visitor, emailParams).editDescription(context),
        emailDelete: () => new Service(settings.visitor, emailParams).deleteService(context),
        email: () => new Service(settings.visitor, emailParams).service(context),
        service,
    }
};

// Тесты сортировки по столбцам
const sort = (type) => describe('Дополнительные данные. Проверка сортировки столбцов.', () => {

    const params = {
        sort: ['0', '01', '1', '10', 'a', 'ab', 'ac', 'z', 'а', 'аб', 'ав', 'я'],
        name: [],
        type: [],
        description: [],
        defaultValue: [],
    };

    switch (type.person) {
        case "Сотрудник":
            params.name = ['Фотография', 'Пин-код', 'Viber', 'Телефон','Email', 'Telegram'];
            params.type = ['Графический', 'Пин-код', 'Viber', 'Телефон','Email', 'Telegram'];
            params.description = [...Array(6).keys()].map(() => 'Служебное поле');
            params.defaultValue = [...Array(6).keys()].map(() => '');
            break;
        case "Посетители":
            params.name = ['Фотография', 'Пин-код', 'Email'];
            params.type = ['Графический', 'Пин-код', 'Email'];
            params.description = [...Array(3).keys()].map(() => 'Служебное поле');
            params.defaultValue = [...Array(3).keys()].map(() => '');
            break;
        default:
            return;
    }

    describe('API - добавление', () => {
        type.bef();

        aft();

        it('Добавление дополнительных данных', async () => {
            const array = params.sort.map(item => {
                return {
                    name: item,
                    comment: item,
                    type_id: 1,
                    default_value: item
                }
            });
            const token = await page.base.getCookie('token');
            await dec.simple(api.putAdditionalData,
                [array, type.api, token.text],
                api.putAdditionalData)
        });
    });

    describe('Проверка столбца "Название поля"', () => {
        type.bef();
        aft();
        const array = [...params.sort, ...params.name].sort((a, b) => {
            if(a.toLowerCase() < b.toLowerCase()) {
                return -1
            }
        });
        oth.sorter('Название поля', 1, array);
    });

    describe('Проверка столбца "Тип поля"', () => {
        type.bef();
        aft();
        const arrText = params.sort.map(() => 'Текстовый');
        const array = [...params.type, ...arrText].sort((a, b) => {
            if(a.toLowerCase() < b.toLowerCase()) {
                return -1
            }
        });
        oth.sorter('Тип поля', 2, array);
    });

    describe('Проверка столбца "Описание"', () => {
        type.bef();
        aft();
        const array = [...params.sort, ...params.description].sort((a, b) => {
            if(a.toLowerCase() < b.toLowerCase()) {
                return -1
            }
        });
        oth.sorter('Описание', 3 , array);
    });

    describe('Проверка столбца "Значение по умолчанию"', () => {
        type.bef();
        aft();
        const array = [...params.sort, ...params.defaultValue].sort((a, b) => {
            if(a.toLowerCase() < b.toLowerCase()) {
                return -1
            }
        });
        oth.sorter('Значение по умолчанию', 4 , array);
    });

    describe('Удаление тестовых данных', () => {
        type.bef();
        aft();
        dataRemove(type);
    });

});


module.exports = {
    staff: (() => {
        return {
            display: () => display(settings.staff),
            add: add(settings.staff),
            edit: edit(settings.staff),
            delete: remove(settings.staff),
            service: serviceStaff(settings.staff),
            sort: () => sort(settings.staff),
            main: () => describe('Проверки раздела "Персонал", подраздела - "Дополнительные данные, вкладка - ' +
                '"Сотрудники""', () => {
                display(settings.staff);
                add(settings.staff).add();
                edit(settings.staff).edit();
                remove(settings.staff).remove();
                serviceStaff(settings.staff).service();
                sort(settings.staff);
            }),
        };
    })(),
    visitor: (() => {
        return {
            display: () => display(settings.visitor),
            add: add(settings.visitor),
            edit: edit(settings.visitor),
            delete: remove(settings.visitor),
            service: serviceVisitor(settings.visitor),
            sort: () => sort(settings.visitor),
            main: () => describe('Проверки раздела "Персонал", подраздела - "Дополнительные данные, вкладка - ' +
                '"Посетители""', () => {
                display(settings.visitor);
                add(settings.visitor).add();
                edit(settings.visitor).edit();
                remove(settings.visitor).remove();
                serviceVisitor(settings.visitor).service();
                sort(settings.visitor);
            })
        }
    })()
};

