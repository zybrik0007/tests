const {describe, it, before, after} = require('mocha');

const entry = require('../../../../../../entry');
const page = require('../../../../pages');
const el = require('../../../../elements');
const dec = require('../../../../dictionaries/decorate');
const sec = require('../../../../dictionaries/section');
const sub = require('../../../../dictionaries/subsection');
const but = require('../../../../dictionaries/button-icon');
const imp = require('../../../../upload-files');
const oth = require('../../../other/other');
const api = require('../../../other/api');
const deleteData = require('../../../other/deleteData');

const bef = () => before('Вход и открытие подраздела "Должности"', async () => {
    await dec.auth(entry.customLogin, entry.customPassword)
    await dec.simple(el.section.handler, [sec.per, entry.max], el.section)
    await dec.simple(el.subsection.handler, [sub.per.position, entry.max], el.subsection)
    await dec.simple(page.position.init, [entry.max], page.position)
});
const aft = () => after('Выход', async () => await dec.exit());

/*// api - Добавление должности
const addPosition = (name, description) => it('Добавление должности', async () => {
    const cook = await page.base.getCookie('token');
    const obj = {
        "name": name,
        "comment": description
    }

    await dec.simple(api.putPosition,
        [[obj], cook.text],
        api.putPosition);
});*/

// api - Добавление должности
const addPosition = (name, description) => it('Добавление должности', async () => {
    const cook = await page.base.getCookie('token');
    const obj = {
        "name": name,
        "comment": description
    }
    await dec.simple(api.putPosition,
        [[obj], cook.text],
        api.putPosition);
});

const deletePosition = () => describe('Удаление должностей', async () => {
    aft();
    bef();
    deleteData.deletePosition();
});

//Отображение первичное
const display = () => describe('Отображение страницы "Должности".', () => {

    bef();
    aft();

    describe('Общие проверки', () => {
        bef();
        aft();

        it('Отображение "title", "url"', async () => await dec.simple(page.position.init,
            [entry.max],
            page.position))

        it('Отображение раздела "Персонал" - активен', async () => await dec.simple(el.section.active,
            [sec.per, entry.max],
            el.section))

        it('Отображение подраздела "Должности" - активен', async () => await dec.simple(el.subsection.active,
            [sub.per.position, entry.max],
            el.section))

        it('Отображение "Персонал" в заглавие навигации', async () => await dec.simpleText(el.subsection.headerGetText,
            [entry.max],
            'ПЕРСОНАЛ',
            el.subsection))

        it('Отображение "Должности" в заглавие', async () => await dec.simpleText(el.header.getText,
            [entry.max],
            'Должности',
            el.header))

        it('Отображение имя пользователя в заглавии', async () => await dec.simpleText(el.header.userGetText,
            [entry.max],
            entry.user,
            el.header))

        it('Отображение кнопки "Добавить" - активна', async () => await dec.simple(el.butIcBefore.active,
            [but.add, entry.max],
            el.butIcBefore))

        it('Отображение кнопки "Редактировать" - не активна', async () => await dec.simple(el.butIcBefore.disabled,
            [but.edit, entry.max],
            el.butIcBefore))

        it('Отображение кнопки "Удалить" - не активна', async () => await dec.simple(el.butIcBefore.disabled,
            [but.delete, entry.max],
            el.butIcBefore))

        it('Отображение кнопки "Меню" - активна', async () => await dec.simple(el.butIcBefore.active,
            [but.menu, entry.max],
            el.butIcBefore))

        it('Отображение фильтра "Поиск..."', async () => await dec.simple(el.input.input,
            ['', 'Поиск...', entry.max],
            el.input))

        it('Отображение заглавия колонки "Должности"', async () => await dec.simpleText(el.table.headGetText,
            [1, entry.max],
            'Должности',
            el.table))

        it('Отображение заглавия колонки "Описание"', async () => await dec.simpleText(el.table.headGetText,
            [2, entry.max],
            'Описание',
            el.table))

        it('Отображение в таблице "Нет данных для отображения."', async () => await dec.simpleText(el.rowEmpty.getText,
            [entry.max],
            'Нет данных для отображения.',
            el.rowEmpty))

        it('Отображение "20" в выборе количества строк', async () => await dec.simpleText(el.footer.selectGetText,
            [entry.max],
            '20',
            el.footer))

        it('Отображение "0 записей" в количестве строк', async () => await dec.simpleText(el.footer.countGetText,
            [entry.max],
            '0 записей',
            el.footer))

        it('Нажатие кнопки "Меню"', async () => await dec.simple(el.butIcBefore.handler,
            [but.menu, entry.max],
            el.butIcBefore))

        it('Отображение "Меню"', async () => await dec.simple(el.menu.menu,
            [entry.max],
            el.menu))

        it('Отображение "Печать таблицы" - не активна', async () => await dec.simple(el.menu.itemDisabled,
            ['Печать таблицы', entry.max],
            el.menu))

        it('Отображение "Экспорт" - активна', async () => await dec.simple(el.menu.itemActive,
            ['Экспорт', entry.max],
            el.menu))

        it('Отображение "Импорт из XLS, XLSX" - активна', async () => await dec.simple(el.menu.itemActive,
            ['Импорт из XLS, XLSX', entry.max],
            el.menu))
    });

    describe('Проверка формы добавления должности', () => {

        bef();
        aft();

        it('Нажатие кнопки "Добавить"', async () => await dec.simple(el.butIcBefore.handler,
            [but.add, entry.max],
            el.butIcBefore))

        it('Отображение модального окна "Добавление должности"', async () => await dec.simple(el.modal.positionAdd.init,
            [entry.max],
            el.modal.positionAdd))

        it('Отображение поля ввода "Название"', async () => await dec.simple(el.input.input,
            ['Название', '', entry.max],
            el.input))

        it('Отображение поля ввода "Описание"', async () => await dec.simple(el.input.input,
            ['Описание', '', entry.max],
            el.input))

        it('Отображение кнопки закрытия', async () => await dec.simple(el.modal.positionAdd.close,
            [entry.max],
            el.modal.positionAdd))

        it('Отображение кнопки "Отмена" - активна', async () => await dec.simple(el.modal.positionAdd.buttonActive,
            ['Отмена', entry.max],
            el.modal.positionAdd))

        it('Отображение кнопки "Сохранить" - не активна', async () => await dec.simple(el.modal.positionAdd.buttonDisabled,
            ['Сохранить', entry.max],
            el.modal.positionAdd))

        it('Нажатие кнопки "Отмена"', async () => await dec.simple(el.modal.positionAdd.buttonHandler,
            ['Отмена', entry.max],
            el.modal.positionAdd))

        it('Отсутствие модального окна "Добавление должности"', async () => await dec.simple(el.modal.positionAdd.initClose,
            [entry.max],
            el.modal.positionAdd))

        it('Нажатие кнопки "Добавить"', async () => await dec.simple(el.butIcBefore.handler,
            [but.add, entry.max],
            el.butIcBefore))

        it('Отображение модального окна "Добавление должности"', async () => await dec.simple(el.modal.positionAdd.init,
            [entry.max],
            el.modal.positionAdd))

        it('Нажатие кнопки закрытия', async () => await dec.simple(el.modal.positionAdd.closeHandler,
            [entry.max],
            el.modal.positionAdd))

        it('Отсутствие модального окна "Добавление должности"', async () => await dec.simple(el.modal.positionAdd.initClose,
            [entry.max],
            el.modal.positionAdd))

    })

});

//Проверка добавление
const add = () => {

    // Добавление. Добавление должности с минимальным набором параметров.
    const addMinParams = () => describe('Должности. Добавление. Добавление должности с минимальным набором параметров.',
        () => {

        const params = {
            name: 'SeleniumPositionMinName',
        }

        describe('Добавление', () => {

            bef();
            aft();

            it('Нажатие кнопки "Добавить"', async () => await dec.simple(el.butIcBefore.handler,
                [but.add, entry.max],
                el.butIcBefore))

            it('Отображение модального окна "Добавление должности"', async () => await dec.simple(el.modal.positionAdd.init,
                [entry.max],
                el.modal.positionAdd))

            it('Ввод "Название"', async () => await dec.simple(el.input.sendKeys,
                ['Название', '', params.name, entry.max],
                el.input))

            it('Нажатие кнопки "Сохранить"', async () => await dec.simple(el.modal.positionAdd.buttonHandler,
                ['Сохранить', entry.max],
                el.modal.positionAdd))

            it('Отображение сообщения "Должность успешно создана"', async () => await dec.simple(el.success.success,
                ['Должность успешно создана', entry.max],
                el.success))

        })

        describe('Проверка таблицы', () => {

            bef();
            aft();

            it('Отображение в таблице 1 строка', async () => await dec.simple(el.table.size,
                [1, entry.max],
                el.table))

            it('Поле "Должности"', async () => await dec.simpleText(el.table.cellGetText,
                ['Должности', 1, 1, entry.max],
                params.name,
                el.table))

            it('Поле "Описание"', async () => await dec.simpleText(el.table.cellGetText,
                ['Описание', 1, 2, entry.max],
                '',
                el.table))

        })

        deletePosition();
    });

    // Добавление должности с максимальным набором параметров.
    const addMaxParams = ()=> describe('Должности. Добавление. Добавление должности с максимальным набором параметров.',
        () => {

        const params = {
            name: 'SeleniumPositionMaxName',
            description: 'SeleniumPositionMaxDescription',
        }

        describe('Добавление', () => {

            bef()

            aft()

            it('Нажатие кнопки "Добавить"', async () => await dec.simple(el.butIcBefore.handler,
                [but.add, entry.max],
                el.butIcBefore))

            it('Отображение модального окна "Добавление должности"', async () => await dec.simple(el.modal.positionAdd.init,
                [entry.max],
                el.modal.positionAdd))

            it('Ввод "Название"', async () => await dec.simple(el.input.sendKeys,
                ['Название', '', params.name, entry.max],
                el.input))

            it('Ввод "Описание"', async () => await dec.simple(el.input.sendKeys,
                ['Описание', '', params.description, entry.max],
                el.input))

            it('Нажатие кнопки "Сохранить"', async () => await dec.simple(el.modal.positionAdd.buttonHandler,
                ['Сохранить', entry.max],
                el.modal.positionAdd))

            it('Отображение сообщения "Должность успешно создана"', async () => await dec.simple(el.success.success,
                ['Должность успешно создана', entry.max],
                el.success))
        })

        describe('Проверка таблицы', () => {

            bef()

            aft()

            it('Отображение в таблице 1 строка', async () => await dec.simple(el.table.size,
                [1, entry.max],
                el.table))

            it('Поле "Должности"', async () => await dec.simpleText(el.table.cellGetText,
                ['Должности', 1, 1, entry.max],
                params.name,
                el.table))

            it('Поле "Описание"', async () => await dec.simpleText(el.table.cellGetText,
                ['Описание', 1, 2, entry.max],
                params.description,
                el.table))

            })

        deletePosition();
    });

    // Попытка добавление должности без ввода всех параметров.
    const addNoParams = () => describe('Должности. Добавление. Попытка добавление должности без ввода всех параметров.',
        () => {

            describe('Попытка добавления', () => {

                bef();
                aft();

                it('Нажатие кнопки "Добавить"', async () => await dec.simple(el.butIcBefore.handler,
                    [but.add, entry.max],
                    el.butIcBefore))

                it('Отображение модального окна "Добавление должности"',
                    async () => await dec.simple(el.modal.positionAdd.init,
                        [entry.min],
                        el.modal.positionAdd))

                it('Попытка нажатие кнопки "Сохранить"',
                    async () => await dec.simpleFalse(el.modal.positionAdd.buttonHandler,
                        ['Сохранить', entry.min],
                        el.modal.positionAdd))

                it('Попытка ожидания исчезнования модального окна',
                    async () => await dec.simpleFalse(el.modal.positionAdd.initClose,
                        [entry.min],
                        el.modal.positionAdd))

                it('Отображение модального окна "Добавление должности"',
                    async () => await dec.simple(el.modal.positionAdd.init,
                        [entry.min],
                        el.modal.positionAdd))

                it('Закрытие модального окна', async () => await dec.simple(el.modal.positionAdd.closeHandler,
                    [entry.max],
                    el.modal.positionAdd))

                it('Отсутствие модального окна "Добавление должности"',
                    async () => await dec.simple(el.modal.positionAdd.initClose,
                        [entry.max],
                        el.modal.positionAdd))


            });

            describe('Проверка таблицы', () => {

                bef();
                aft();

                it('Отображение в таблице 0 строк', async () => await dec.simple(el.table.size,
                    [0, entry.max],
                    el.table))
            });

            deletePosition();
    })

    // Добавление. Попытка добавление должности без ввода "Названия".
    const addNoName = () => describe('Должности. Добавление. Попытка добавление должности без ввода "Названия".',
        () => {

            const params = {
                description: 'addNoName'
            }

            describe('Попытка добавления', () => {

                bef()
                aft()

                it('Нажатие кнопки "Добавить"', async () => await dec.simple(el.butIcBefore.handler,
                    [but.add, entry.max],
                    el.butIcBefore))

                it('Отображение модального окна "Добавление должности"',
                    async () => await dec.simple(el.modal.positionAdd.init,
                        [entry.min],
                        el.modal.positionAdd))

                it('Ввод "Описание"', async () => await dec.simple(el.input.sendKeys,
                    ['Описание', '', params.description, entry.max],
                    el.input))

                it('Попытка нажатие кнопки "Сохранить"',
                    async () => await dec.simpleFalse(el.modal.positionAdd.buttonHandler,
                        ['Сохранить', entry.min],
                        el.modal.positionAdd))

                it('Ожидание исчезнования модального окна',
                    async () => await dec.simpleFalse(el.modal.positionAdd.initClose,
                        [entry.min],
                        el.modal.positionAdd))

                it('Отображение модального окна "Добавление должности"',
                    async () => await dec.simple(el.modal.positionAdd.init,
                        [entry.min],
                        el.modal.positionAdd))

                it('Закрытие модального окна', async () => await dec.simple(el.modal.positionAdd.closeHandler,
                    [entry.max],
                    el.modal.positionAdd))

                it('Отображение в таблице 0 строк', async () => await dec.simple(el.table.size,
                    [0, entry.max],
                    el.table))
            });

            describe('Проверка таблицы', () => {

                bef()
                aft()

                it('Отображение в таблице 0 строк', async () => await dec.simple(el.table.size,
                    [0, entry.max],
                    el.table))

            });

            deletePosition();
        });

    // Попытка добавления дублирющий должности.
    const addDuplicate = () => describe('Должности. Добавление. Попытка добавления дублирующий должности.', () => {

        const params = {
            name: 'addDuplicateName',
            error: 'Должность с таким названием уже существует'
        }

        describe('API - добавление', () => {
            bef();
            aft();
            addPosition(params.name);
        });

        describe('Попытка добавления', () => {

            bef()
            aft()

            it('Нажатие кнопки "Добавить"', async () => await dec.simple(el.butIcBefore.handler,
                [but.add, entry.max],
                el.butIcBefore))

            it('Отображение модального окна "Добавление должности"',
                async () => await dec.simple(el.modal.positionAdd.init,
                    [entry.min],
                    el.modal.positionAdd))

            it('Ввод "Название"', async () => await dec.simple(el.input.sendKeys,
                ['Название', '', params.name, entry.max],
                el.input))

            it('Нажатие кнопки "Сохранить"', async () => await dec.simple(el.modal.positionAdd.buttonHandler,
                ['Сохранить', entry.min],
                el.modal.positionAdd))

            it('Отображение ошибки "Должность с таким названием уже существует"',
                async () => await dec.simple(el.error.error,
                    [params.error, entry.max],
                    el.error))

            it('Закрытие модального окна', async () => await dec.simple(el.modal.positionAdd.closeHandler,
                [entry.max],
                el.modal.positionAdd))

            it('Отсутствие модального окна "Добавление должности"',
                async () => await dec.simple(el.modal.positionAdd.init,
                    [entry.min],
                    el.modal.positionAdd))
        });

        describe('Проверка таблицы', () => {

            bef()

            aft()

            it('Отображение в таблице 1 строка', async () => await dec.simple(el.table.size,
                [1, entry.max],
                el.table))

            it('Поле "Должности"', async () => await dec.simpleText(el.table.cellGetText,
                ['Должности', 1, 1, entry.max],
                params.name,
                el.table))

            it('Поле "Описание"', async () => await dec.simpleText(el.table.cellGetText,
                ['Описание', 1, 2, entry.max],
                '',
                el.table))
        });

        deletePosition();
    });

    // Проверки добавления.
    const main = () => describe('Должности. Проверки добавления.', () => {
        addMinParams();
        addMaxParams();
        addNoParams();
        addNoName();
        addDuplicate();
    });

    return {
        addMinParams,
        addMaxParams,
        addNoParams,
        addNoName,
        addDuplicate,
        main,
    }
};

//Проверка редактирования
const edit = () => {

    // Добавление необязательных параметров с минимальным количеством параметров
    const editMinParams = () => describe('Должности. Редактирование. ' +
        'Добавление необязательных параметров с минимальным количеством параметров', () => {

        const params = {
            name: 'editMinParamsName',
            description: 'editMinParamsDescription'
        }

        describe('API - добавление', () => {
            bef();
            aft();
            addPosition(params.name)
        });

        describe('Редактирование', () => {
            bef()

            aft()

            it('Нажатие в таблице строка 1', async () => await dec.simple(el.table.strHandler,
                [1, entry.max],
                el.table))

            it('Нажатие кнопки "Редактировать"', async () => await dec.simple(el.butIcBefore.handler,
                [but.edit, entry.max],
                el.butIcBefore))

            it('Отображение модального окна "Редактирование должности"', async () => await dec.simple(el.modal.positionEdit.init,
                [entry.max],
                el.modal.positionEdit))

            it('Ввод "Описание"', async () => await dec.simple(el.input.sendKeys,
                ['Описание', '', params.description, entry.max],
                el.input))

            it('Нажатие кнопки "Сохранить"', async () => await dec.simple(el.modal.positionEdit.buttonHandler,
                ['Сохранить', entry.max],
                el.modal.positionEdit))

            it('Отображение сообщения "Должность успешно изменена"', async () => await dec.simple(el.success.success,
                ['Должность успешно изменена', entry.max],
                el.success))

            it('Отсутствие модального окна "Редактирование должности"', async () => await dec.simple(el.modal.positionEdit.initClose,
                [entry.max],
                el.modal.positionEdit))

        });

        describe('Проверка таблицы', () => {

            bef()

            aft()

            it('Отображение в таблице 1 строка', async () => await dec.simple(el.table.size,
                [1, entry.max],
                el.table))

            it('Поле "Должности"', async () => await dec.simpleText(el.table.cellGetText,
                ['Должности', 1, 1, entry.max],
                params.name,
                el.table))

            it('Поле "Описание"', async () => await dec.simpleText(el.table.cellGetText,
                ['Описание', 1, 2, entry.max],
                params.description,
                el.table))
        });

        deletePosition();
    });

    // Удаление необязательных параметров с максимальным количеством параметров.
    const editMaxParams = () => describe('Должности. Редактирование. ' +
        'Удаление необязательных параметров с максимальным количеством параметров.', () => {

        const params = {
            name: 'editMaxParamsName',
            description: 'editMaxParamsDescription'
        }

        describe('API - добавление', () => {
            bef();
            aft();
            addPosition(params.name, params.description)
        });

        describe('Редактирование', () => {
            bef()

            aft()

            it('Нажатие в таблице строка 1', async () => await dec.simple(el.table.strHandler,
                [1, entry.max],
                el.table))

            it('Нажатие кнопки "Редактировать"', async () => await dec.simple(el.butIcBefore.handler,
                [but.edit, entry.max],
                el.butIcBefore))

            it('Отображение модального окна "Редактирование должности"', async () => await dec.simple(el.modal.positionEdit.init,
                [entry.max],
                el.modal.positionEdit))

            it('Удаление "Описание"', async () => await dec.simple(el.input.backSpace,
                ['Описание', '', entry.max],
                el.input))

            it('Нажатие кнопки "Сохранить"', async () => await dec.simple(el.modal.positionEdit.buttonHandler,
                ['Сохранить', entry.max],
                el.modal.positionEdit))

            it('Отображение сообщения "Должность успешно изменена"', async () => await dec.simple(el.success.success,
                ['Должность успешно изменена', entry.max],
                el.success))

            it('Отсутствие модального окна "Редактирование должности"', async () => await dec.simple(el.modal.positionEdit.initClose,
                [entry.max],
                el.modal.positionEdit))

        });

        describe('Проверка таблицы', () => {

            bef()

            aft()

            it('Отображение в таблице 1 строка', async () => await dec.simple(el.table.size,
                [1, entry.max],
                el.table))

            it('Поле "Должности"', async () => await dec.simpleText(el.table.cellGetText,
                ['Должности', 1, 1, entry.max],
                params.name,
                el.table))

            it('Поле "Описание"', async () => await dec.simpleText(el.table.cellGetText,
                ['Описание', 1, 2, entry.max],
                '',
                el.table))

        });

        deletePosition();

    });

    // Редактирование всех параметров.
    const editAllParams = () => describe('Должности. Редактирование. Редактирование всех параметров.', () => {

        const params = {
            name1: 'editAllParamsName1',
            description1: 'editAllParamsDescription1',
            name2: 'editAllParamsName2',
            description2: 'editAllParamsDescription2',
        }

        describe('API - добавление', () => {
            bef();
            aft();
            addPosition(params.name1, params.description1)
        });

        describe('Редактирование', () => {
            bef()

            aft()

            it('Нажатие в таблице строка 1', async () => await dec.simple(el.table.strHandler,
                [1, entry.max],
                el.table))

            it('Нажатие кнопки "Редактировать"', async () => await dec.simple(el.butIcBefore.handler,
                [but.edit, entry.max],
                el.butIcBefore))

            it('Отображение модального окна "Редактирование должности"', async () => await dec.simple(el.modal.positionEdit.init,
                [entry.max],
                el.modal.positionEdit))

            it('Удаление "Название"', async () => await dec.simple(el.input.backSpace,
                ['Название', '', entry.max],
                el.input))

            it('Удаление "Описание"', async () => await dec.simple(el.input.backSpace,
                ['Описание', '', entry.max],
                el.input))

            it('Ввод "Название"', async () => await dec.simple(el.input.sendKeys,
                ['Название', '', params.name2, entry.max],
                el.input))

            it('Ввод "Описание"', async () => await dec.simple(el.input.sendKeys,
                ['Описание', '', params.description2, entry.max],
                el.input))

            it('Нажатие кнопки "Сохранить"', async () => await dec.simple(el.modal.positionEdit.buttonHandler,
                ['Сохранить', entry.max],
                el.modal.positionEdit))

            it('Отображение сообщения "Должность успешно изменена"', async () => await dec.simple(el.success.success,
                ['Должность успешно изменена', entry.max],
                el.success))

            it('Отсутствие модального окна "Редактирование должности"', async () => await dec.simple(el.modal.positionEdit.initClose,
                [entry.max],
                el.modal.positionEdit))

        });

        describe('Проверка таблицы', () => {

            bef()

            aft()

            it('Отображение в таблице 1 строка', async () => await dec.simple(el.table.size,
                [1, entry.max],
                el.table))

            it('Поле "Должности"', async () => await dec.simpleText(el.table.cellGetText,
                ['Должности', 1, 1, entry.max],
                params.name2,
                el.table))

            it('Поле "Описание"', async () => await dec.simpleText(el.table.cellGetText,
                ['Описание', 1, 2, entry.max],
                params.description2,
                el.table))

        });

        deletePosition();
    })

    // Попытка дублирования.
    const editDuplicate = () => describe('Должности. Редактирование. Попытка дублирования.', () => {

        const params = {
            name1: 'editAllParamsName1',
            description1: 'editAllParamsDescription1',
            name2: 'editAllParamsName2',
            description2: 'editAllParamsDescription2',
            error: 'Должность с таким названием уже существует'
        }

        describe('API - добавление', () => {
            bef();
            aft();
            addPosition(params.name1, params.description1);
            addPosition(params.name2, params.description2)
        });

        describe('Редактирование', () => {
            bef()

            aft()

            it('Нажатие в таблице строка 1', async () => await dec.simple(el.table.strHandler,
                [1, entry.max],
                el.table))

            it('Нажатие кнопки "Редактировать"', async () => await dec.simple(el.butIcBefore.handler,
                [but.edit, entry.max],
                el.butIcBefore))

            it('Отображение модального окна "Редактирование должности"',
                async () => await dec.simple(el.modal.positionEdit.init,
                    [entry.max],
                    el.modal.positionEdit))

            it('Удаление "Название"', async () => await dec.simple(el.input.backSpace,
                ['Название', '', entry.max],
                el.input))

            it('Удаление "Описание"', async () => await dec.simple(el.input.backSpace,
                ['Описание', '', entry.max],
                el.input))

            it('Ввод "Название"', async () => await dec.simple(el.input.sendKeys,
                ['Название', '', params.name1, entry.max],
                el.input))

            it('Ввод "Описание"', async () => await dec.simple(el.input.sendKeys,
                ['Описание', '', params.description1, entry.max],
                el.input))

            it('Нажатие кнопки "Сохранить"', async () => await dec.simple(el.modal.positionEdit.buttonHandler,
                ['Сохранить', entry.max],
                el.modal.positionEdit))

            it('Отображение ошибки "Должность с таким названием уже существует"',
                async () => dec.simple(el.error.error,
                    [params.error, entry.max],
                    el.error));

            it('Закрытие модального окна', async () => await dec.simple(el.modal.positionEdit.closeHandler,
                [entry.max],
                el.modal.positionEdit))

            it('Отсутствие модального окна "Редактирование должности"',
                async () => await dec.simple(el.modal.positionEdit.initClose,
                    [entry.max],
                    el.modal.positionEdit))
        });

        describe('Проверка таблицы', () => {

            bef()

            aft()

            describe('Общие проверки', () => {
                it('Отображение в таблице 2 строки', async () => await dec.simple(el.table.size,
                    [2, entry.max],
                    el.table))
            });

            describe('Проверка таблицы строка 1', () => {
                it('Поле "Должности"', async () => await dec.simpleText(el.table.cellGetText,
                    ['Должности', 1, 1, entry.max],
                    params.name2,
                    el.table))

                it('Поле "Описание"', async () => await dec.simpleText(el.table.cellGetText,
                    ['Описание', 1, 2, entry.max],
                    params.description2,
                    el.table))
            });

            describe('Проверка таблицы строка 2', () => {
                it('Поле "Должности"', async () => await dec.simpleText(el.table.cellGetText,
                    ['Должности', 2, 1, entry.max],
                    params.name1,
                    el.table))

                it('Поле "Описание"', async () => await dec.simpleText(el.table.cellGetText,
                    ['Описание', 2, 2, entry.max],
                    params.description1,
                    el.table))
            });

        });

        deletePosition();
    });

    return {
        editMinParams,
        editMaxParams,
        editAllParams,
        editDuplicate
    }
};

//Проверка удаления
const remove = () => {

    const deleteOne = () => describe('Должности. Удаление. Удаление одной должности.', () => {

        const params = {
            position: 'SeleniumPositionRemoveName1'
        }

        describe('API - добавление', () => {
            bef();
            aft();
            addPosition(params.position);
        });

        describe('Удаление должности', () => {

            bef();
            aft();

            it('Отображение 1 строки в таблице', async () => await dec.simple(el.table.size,
                [1, entry.max],
                el.table))

            it('Нажатие по первой строке', async () => await dec.simple(el.table.strHandler,
                [1, entry.max],
                el.table))

            it('Нажите кнопки удаления', async () => await dec.simple(el.butIcBefore.handler,
                [but.delete, entry.max],
                el.butIcBefore))

            it('Отображение модального окна удаления должности',
                async () => await dec.simple(el.modalConfirm.positionDelete.init,
                    [entry.max],
                    el.modalConfirm.positionDelete))

            it('Нажатие кнопки "Удалить"', async () => await dec.simple(el.modalConfirm.positionDelete.buttonHandler,
                ['Удалить', entry.max],
                el.modalConfirm.positionDelete))

            it('Отображение сообщения "Должность удалена"', async () => await dec.simple(el.success.success,
                ['Должность удалена', entry.max],
                el.success))

            it('Отсутствие модального окна удаления должности',
                async () => await dec.simple(el.modalConfirm.positionDelete.initClose,
                    [entry.max],
                    el.modalConfirm.positionDelete))
        });

        describe('Проверка таблицы', () => {
           bef();

            aft();

            it('Отображение 0 строк в таблице', async () => await dec.simple(el.table.size,
                [0, entry.max],
                el.table));
        });

        deletePosition();
    });

    const deleteTwo = () => describe('Должности. Удаление. Удаление две должности.', () => {

        const params = {
            position1: 'SeleniumPositionRemoveName1',
            position2: 'SeleniumPositionRemoveName2'
        }

        describe('API - добавление', () => {
            bef();
            aft();
            addPosition(params.position1, '');
            addPosition(params.position2, '');
        });

        describe('Удаление должности', () => {

            bef();
            aft();

            it('Отображение 2 строки в таблице', async () => await dec.simple(el.table.size,
                [2, entry.max],
                el.table));

            it('Нажатие "Control" и по превой строке',
                async () => await dec.simple(el.table.controlStrHandler,
                    [1, entry.max],
                    el.table));

            it('Нажатие "Control" и по второй строке',
                async () => await dec.simple(el.table.controlStrHandler,
                    [2, entry.max],
                    el.table));

            it('Нажатие кнопки удаления', async () => await dec.simple(el.butIcBefore.handler,
                [but.delete, entry.max],
                el.butIcBefore));

            it('Отображение модального окна удаления должности',
                async () => await dec.simple(el.modalConfirm.positionDelete.init,
                    [entry.max],
                    el.modalConfirm.positionDelete));

            it('Нажатие кнопки "Удалить"', async () => await dec.simple(el.modalConfirm.positionDelete.buttonHandler,
                ['Удалить', entry.max],
                el.modalConfirm.positionDelete));

            it('Отображение сообщения "Должность удалена"', async () => await dec.simple(el.success.success,
                ['Должность удалена', entry.max],
                el.success));

            it('Отсутствие модального окна удаления должности',
                async () => await dec.simple(el.modalConfirm.positionDelete.initClose,
                    [entry.max],
                    el.modalConfirm.positionDelete));
        });

        describe('Проверка таблицы', () => {
            bef();
            aft();

            it('Отображение 0 строк в таблице', async () => await dec.simple(el.table.size,
                [0, entry.max],
                el.table));
        });

        deletePosition();
    });

    const deleteStaff = () => describe('Должности. Удаление. Удаление должности, добавленной сотруднику.', () => {

        const params = {
            position: 'SeleniumPositionRemoveName1',
            error: 'Должность используется и не может быть удалена',
            fio: {
                lastName: 'staff',
                firstName: '1',
                middleName: '' ,
                divisionId: '',
                date: '2001-01-01'
            },
        }

        describe('API - добавление', () => {
            bef();
            aft();
            addPosition(params.position);
            it('Добавление сотрудника', async () => {
                const cook = await page.base.getCookie('token');
                const get = await api.getPosition(cook.text);
                const filter = get.text.filter(item => item.name === params.position)[0]['id'];
                const obj = {
                    "last_name": params.fio.lastName,
                    "first_name": params.fio.firstName,
                    "middle_name": params.fio.middleName,
                    "division": 1,
                    "position": filter,
                    "hiring_date": params.fio.date,
                };
                await dec.simple(api.putStaff,
                    [[obj], cook.text],
                    api.putStaff);
            });
        });

        describe('Попытка удаление должности', () => {

            bef();
            aft();

            it('Отображение 1 строки в таблице', async () => await dec.simple(el.table.size,
                [1, entry.max],
                el.table))

            it('Нажатие по первой строке', async () => await dec.simple(el.table.strHandler,
                [1, entry.max],
                el.table))

            it('Нажите кнопки удаления', async () => await dec.simple(el.butIcBefore.handler,
                [but.delete, entry.max],
                el.butIcBefore))

            it('Отображение модального окна удаления должности',
                async () => await dec.simple(el.modalConfirm.positionDelete.init,
                    [entry.max],
                    el.modalConfirm.positionDelete))

            it('Нажатие кнопки "Удалить"', async () => await dec.simple(el.modalConfirm.positionDelete.buttonHandler,
                ['Удалить', entry.max],
                el.modalConfirm.positionDelete))

            it('Отображение ошибки', async () => await dec.simple(el.error.error,
                [params.error, entry.max],
                el.error));

            it('Отсутствие модального окна удаления должности',
                async () => await dec.simple(el.modalConfirm.positionDelete.initClose,
                    [entry.max],
                    el.modalConfirm.positionDelete))
        });

        describe('Проверка таблицы', () => {

            bef();
            aft();

            it('Отображение в таблице 1 строка', async () => await dec.simple(el.table.size,
                [1, entry.max],
                el.table));

            it('Поле "Должности"', async () => await dec.simpleText(el.table.cellGetText,
                ['Должности', 1, 1, entry.max],
                params.position,
                el.table));

            it('Поле "Описание"', async () => await dec.simpleText(el.table.cellGetText,
                ['Описание', 1, 2, entry.max],
                '',
                el.table));
        });

        describe('Удаление тестовых данных', () => {
            aft();
            bef();
            deleteData.deleteStaff();
            deleteData.deletePosition();
        });
    });

    return {
        deleteOne,
        deleteTwo,
        deleteStaff,
    }
};

//Проверка количества страниц и переключения страниц
const footer = () => describe('Должности. Проверка настройки отображений записей и перехода по страницам.', () => {

    const params = [...Array(100).keys()].map(item => {
        return {
            name: 'Position ' + (item + 1),
            comment: 'Description ' + (item + 1),
        }
    })

    describe('API - добавление.', () => {
        bef();
        aft();
        it('Добавление 100 должностей api методом', async () => {
            const cook = await page.base.getCookie('token')

            await dec.simple(api.putArrayPosition,
                [params, cook.text],
                api.putManyPosition)
        })
    });

    oth.footer('Должности', 'Position', 1, 1, bef, aft);

    deletePosition();
});

//Проверка сортировки по столбцам
const sort = () => describe('Должности. Проверка сортировки столбцов.', () => {

    const params = {
        sort: ['0', '01', '1', '10', 'a', 'ab', 'ac', 'z', 'а', 'аб', 'ав', 'я'],
    }

    describe('API - добавление', () => {
        bef();
        aft();
        it('Добавление должностей', async () => {
            const array = params.sort.map(item => {return {name: item, comment: item}})
            const token = await page.base.getCookie('token')
            await dec.simple(api.putArrayPosition,
                [array, token.text],
                api.putArrayPosition)
        })
    });

    describe('Проверка столбца "Должности"', () => {
        bef();
        aft();
        const array = [...params.sort].sort();
        oth.sorter('Должности', 1, array);
    });

    describe('Проверка столбца "Описание"', () => {
        bef();
        aft();
        const array = [...params.sort].sort();
        oth.sorter('Описание', 2, array);
    });

    deletePosition();
});

//Проверка фильтра "Поиск..."
const filterSearch = () => describe('Должности. Проверка фильтра "Поиск...".', () =>  {

    const params = {
        search: [
            {name: 'SeleniumPositionNameOne', comment: 'SeleniumPositionDescriptionOne'},
            {name: 'SeleniumPositionNameTwo', comment:'SeleniumPositionDescriptionTwo'},
            {name: 'SeleniumPositionAllNoSuccess', comment:'SeleniumPositionAllSuccess'},
            {name: 'SeleniumPositionAllSuccess', comment:'SeleniumPositionAllNoSuccess'},
        ],
        searchSuccess: 'SeleniumPositionAllSuccess',
        searchFailed: 'failed',
    }

    describe('API - добавление', () => {
        bef();
        aft();
        it('Добавление должностей', async () => {
            const token = await page.base.getCookie('token')

            await dec.simple(api.putArrayPosition,
                [params.search, token.text],
                api.putArrayPosition())
        })
    });

    describe('Поиск по столбцу "Должности"', () => {

        bef();
        aft();

        it('Ввод "Поиск..."', async () => await dec.simple(el.input.sendKeys,
            ['', 'Поиск...', params.search[0].name, entry.max],
            el.input))
        it('Отображение одной строки в таблице', async () => await dec.simple(el.table.singleSize,
            [entry.max],
            el.table))
        it('Проверка столбец "Должности"', async () => await dec.simpleText(el.table.cellGetText,
            ['Должности', 1, 1, entry.max],
            params.search[0].name,
            el.table))
        it('Проверка столбец "Описание"', async () => await dec.simpleText(el.table.cellGetText,
            ['Описание', 1, 2, entry.max],
            params.search[0].comment,
            el.table))
        it('Очистка "Поиск..."',  async () => await dec.simple(el.input.iconClear,
            ['', 'Поиск...', entry.max],
            el.input))
        it('Отображение всех должностей', async () => {
            await dec.animation()
            await dec.simple(el.table.size,
                [params.search.length, entry.max],
                el.table)
        })
    })

    describe('Поиск по столбцу "Описание"', () => {

        bef();
        aft();

        it('Ввод "Поиск..."', async () => await dec.simple(el.input.sendKeys,
            ['', 'Поиск...', params.search[1].comment, entry.max],
            el.input))
        it('Отображение одной строки в таблице', async () => await dec.simple(el.table.singleSize,
            [entry.max],
            el.table))
        it('Проверка столбец "Описание"', async () => await dec.simpleText(el.table.cellGetText,
            ['Описание', 1, 2, entry.max],
            params.search[1].comment,
            el.table))
        it('Проверка столбец "Должности"', async () => await dec.simpleText(el.table.cellGetText,
            ['Должности', 1, 1, entry.max],
            params.search[1].name,
            el.table))
        it('Очистка "Поиск..."',  async () => await dec.simple(el.input.iconClear,
            ['', 'Поиск...', entry.max],
            el.input))
        it('Отображение всех должностей', async () => {
            await dec.animation()
            await dec.simple(el.table.size,
                [params.search.length, entry.max],
                el.table)
        })
    })

    describe('Проверка совпадения по всем столбцам', () => {

        bef();
        aft();

        it('Ввод "Поиск..."', async () => await dec.simple(el.input.sendKeys,
            ['', 'Поиск...', params.searchSuccess, entry.max],
            el.input))
        it('Отображение отображение двух строк в таблице', async () => await dec.simple(el.table.size,
            [2, entry.max],
            el.table))
        it('Нажатие по заглавию столбца "Должности"', async () => await dec.simple(el.table.headHandler,
            ['Должности', 1, entry.max],
            el.table))
        it('Столбец "Должности" отсортирован по возрастанию', async () => await dec.simple(el.table.headSortAsc,
            ['Должности', 1, entry.max],
            el.table))
        it('Отсуствиие анимаций', async () => await dec.animation())
        it('Проверка столбец "Должности" 2 строка', async () => await dec.simpleText(el.table.cellGetText,
            ['Должности', 2, 1, entry.max],
            params.searchSuccess,
            el.table))
        it('Проверка столбец "Описание" 1 строка', async () => await dec.simpleText(el.table.cellGetText,
            ['Описание', 1, 2, entry.max],
            params.searchSuccess,
            el.table))
        it('Очистка "Поиск..."',  async () => await dec.simple(el.input.iconClear,
            ['', 'Поиск...', entry.max],
            el.input))
        it('Удаление LocalStorage', async () => await dec.simple(page.base.clearLocalStorage,
            [],
            page.base))

        it('Обновленние страницы', async () => await dec.simple(page.base.refresh,
            [],
            page.base))

        it('Отображение всех должностей', async () => {
            await dec.animation()
            await dec.simple(el.table.size,
                [params.search.length, entry.max],
                el.table)
        })
    })

    describe('Проверка отсутствия совпадений во всех столбцах', () => {

        bef();
        aft();

        it('Ввод "Поиск..."', async () => await dec.simple(el.input.sendKeys,
            ['', 'Поиск...', params.searchFailed, entry.max],
            el.input))
        it('Отсутствие строк в таблице', async () => await dec.simple(el.table.noStr,
            [entry.max],
            el.table))
        it('Отображение в таблице "Нет данных для отображения."', async () => await dec.simpleText(el.rowEmpty.getText,
            [entry.max],
            'Нет данных для отображения.',
            el.rowEmpty))
        it('Очистка "Поиск..."',  async () => await dec.simple(el.input.iconClear,
            ['', 'Поиск...', entry.max],
            el.input))
        it('Отображение всех должностей', async () => {
            await dec.animation()
            await dec.simple(el.table.size,
                [params.search.length, entry.max],
                el.table)
        })
        it('Удаление данных из LocalStorage', async () => await dec.simple(page.base.clearLocalStorage,
            [],
            page.base))
    })

    deletePosition();
});

//Проверка экспорта
const exportFiles = () => {

    const xlsxNoHeaderSystem = () => describe('Должности. Экспорт должностей в xlsx файл. Без заголовка. ' +
        'Системное имя файла.', () => {

        const params = {
            xlsx: 'position.xlsx',
            division: {
                name: 'SeleniumPositionImportXLSXNameOne',
                comment: 'SeleniumPositionImportXLSXDescriptionOne',
            },
            file: [
                { 'Должность': 'SeleniumPositionImportXLSXNameOne', 'Описание': 'SeleniumPositionImportXLSXDescriptionOne' }
            ],
        }

        describe('API - добавление', () => {
            bef();
            aft();
            it('Добавление должностей', async () => {
                const cook = await page.base.getCookie('token')
                const array = [params.division]

                await dec.simple(api.putArrayPosition,
                    [array, cook.text],
                    api.putManyPosition)
            });
        });

        describe('Экспорт', () => {

            bef();
            aft();

            it('Нажатие кнопки "Меню"', async () => await dec.simple(el.butIcBefore.handler,
                [but.menu, entry.max],
                el.butIcBefore))

            it('Отображение "Меню"', async () => await dec.simple(el.menu.menu,
                [entry.max],
                el.menu))

            it('Нажатие параметра "Экспорт"', async () => await dec.simple(el.menu.handler,
                ['Экспорт', entry.max],
                el.menu))

            it('Отображение модального окна "Экспортировать данные"', async () => await dec.simple(el.modal.exportData.init,
                [entry.max],
                el.modal.exportData))

            it('Выбор "Выберите тип файла для экспорта"', async () => await dec.simple(el.select.iconXpand,
                ['Выберите тип файла для экспорта', 'XLSX', 'XLSX', entry.max],
                el.select))

            it('Выбор "Заголовок"', async () => await dec.simple(el.select.iconXpand,
                ['Заголовок', 'Добавить заголовок к файлу',  'Не добавлять заголовок', entry.max],
                el.select))

            it('Проверка "Выберите тип файла для экспорта"', async () => await dec.simpleText(el.select.getText,
                ['Выберите тип файла для экспорта', 'XLSX', entry.max],
                'XLSX',
                el.select))

            it('Проверка "Заголовок"', async () => await dec.simpleText(el.select.getText,
                ['Заголовок', 'Не добавлять заголовок', entry.max],
                'Не добавлять заголовок',
                el.select))

            it('Проверка "Имя выходного файла"', async () => await dec.simpleText(el.input.getValue,
                ['Имя выходного файла', 'Определяется системой', entry.max],
                '',
                el.input))

            it('Нажатие кнопки "Экспортировать"', async () => await dec.simple(el.button.handler,
                ['Экспортировать', entry.max],
                el.button))

            it('Отсутствие модального окна "Экспортировать данные"', async () => await dec.simple(el.modal.exportData.initClose,
                [entry.max],
                el.modal.exportData))
        })

        describe('Проверка файла', () => {

            bef();
            aft();

            it('Отображение файла', async () => await dec.simple(el.file.display,
                [params.xlsx, entry.upload],
                el.file))

            it('Проверка строк файла', async () => {
                const jsonFile = await el.file.readNum(params.xlsx)
                await dec.exportFile(params.file, jsonFile)
            })

            it('Удаление файла', async () => await dec.simple(el.file.delete,
                [params.xlsx, entry.upload],
                el.file))
        })

        deletePosition();
    });

    const xlsxHeaderSystem = () => describe('Должности. Экспорт должностей в xlsx файл. ' +
        'C заголовком. Системное имя файла.', () => {

        const params = {
                xlsx: 'position.xlsx',
                division: {
                    name: 'SeleniumPositionImportXLSXNameOne',
                    comment: 'SeleniumPositionImportXLSXDescriptionOne',
                },
                file: [
                    { 'Отчет "Должности"': 'Должность', __EMPTY: 'Описание' },
                    {
                        'Отчет "Должности"': 'SeleniumPositionImportXLSXNameOne',
                        __EMPTY: 'SeleniumPositionImportXLSXDescriptionOne'
                    }
                ],
            }

        describe('API - добавление', () => {
            bef();
            aft();
            it('Добавление должностей', async () => {
                const cook = await page.base.getCookie('token')
                const array = [params.division]

                await dec.simple(api.putArrayPosition,
                    [array, cook.text],
                    api.putManyPosition)
            });
        });

        describe('Экспорт', () => {

            bef();
            aft();

            it('Нажатие кнопки "Меню"', async () => await dec.simple(el.butIcBefore.handler,
                [but.menu, entry.max],
                el.butIcBefore))

            it('Отображение "Меню"', async () => await dec.simple(el.menu.menu,
                [entry.max],
                el.menu))

            it('Нажатие параметра "Экспорт"', async () => await dec.simple(el.menu.handler,
                ['Экспорт', entry.max],
                el.menu))

            it('Отображение модального окна "Экспортировать данные"', async () => await dec.simple(el.modal.exportData.init,
                [entry.max],
                el.modal.exportData))

            it('Выбор "Выберите тип файла для экспорта"', async () => await dec.simple(el.select.iconXpand,
                ['Выберите тип файла для экспорта', 'XLSX', 'XLSX', entry.max],
                el.select))

            it('Выбор "Заголовок"', async () => await dec.simple(el.select.iconXpand,
                ['Заголовок', 'Добавить заголовок к файлу', 'Добавить заголовок к файлу', entry.max],
                el.select))

            it('Проверка "Выберите тип файла для экспорта"', async () => await dec.simpleText(el.select.getText,
                ['Выберите тип файла для экспорта', 'XLSX', entry.max],
                'XLSX',
                el.select))

            it('Проверка "Заголовок"', async () => await dec.simpleText(el.select.getText,
                ['Заголовок', 'Добавить заголовок к файлу', entry.max],
                'Добавить заголовок к файлу',
                el.select))

            it('Проверка "Имя выходного файла"', async () => await dec.simpleText(el.input.getValue,
                ['Имя выходного файла', 'Определяется системой', entry.max],
                '',
                el.input))

            it('Нажатие кнопки "Экспортировать"', async () => await dec.simple(el.button.handler,
                ['Экспортировать', entry.max],
                el.button))

            it('Отсутствие модального окна "Экспортировать данные"', async () => await dec.simple(el.modal.exportData.initClose,
                [entry.max],
                el.modal.exportData))
        })

        describe('Проверка файла', () => {

            bef();
            aft();

            it('Отображение файла', async () => await dec.simple(el.file.display,
                [params.xlsx, entry.upload],
                el.file))

            it('Проверка строк файла', async () => {
                const jsonFile = await el.file.readNum(params.xlsx)
                dec.exportFile(params.file, jsonFile)
            })

            it('Удаление файла', async () => await dec.simple(el.file.delete,
                [params.xlsx, entry.upload],
                el.file))
        })

        deletePosition();
    });

    const xlsxHeaderNameSystem = () => describe('Должности. Экспорт должностей в xlsx файл. Свой заголовок. ' +
        'Системное имя файла.', () => {

        const params = {
                xlsx: 'position.xlsx',
                header: 'header',
                division: {
                    name: 'SeleniumPositionImportXLSXNameOne',
                    comment: 'SeleniumPositionImportXLSXDescriptionOne',
                },
                file: [
                    { header: 'Должность', __EMPTY: 'Описание' },
                    {
                        header: 'SeleniumPositionImportXLSXNameOne',
                        __EMPTY: 'SeleniumPositionImportXLSXDescriptionOne'
                    },
                ],
            }

        describe('API - добавление', () => {
            bef();
            aft();
            it('Добавление должностей', async () => {
                const cook = await page.base.getCookie('token')
                const array = [params.division]

                await dec.simple(api.putArrayPosition,
                    [array, cook.text],
                    api.putManyPosition)
            });
        });

        describe('Экспорт', () => {

            bef()
            aft()

            it('Нажатие кнопки "Меню"', async () => await dec.simple(el.butIcBefore.handler,
                [but.menu, entry.max],
                el.butIcBefore))

            it('Отображение "Меню"', async () => await dec.simple(el.menu.menu,
                [entry.max],
                el.menu))

            it('Нажатие параметра "Экспорт"', async () => await dec.simple(el.menu.handler,
                ['Экспорт', entry.max],
                el.menu))

            it('Отображение модального окна "Экспортировать данные"', async () => await dec.simple(el.modal.exportData.init,
                [entry.max],
                el.modal.exportData))

            it('Выбор "Выберите тип файла для экспорта"', async () => await dec.simple(el.select.iconXpand,
                ['Выберите тип файла для экспорта', 'XLSX', 'XLSX', entry.max],
                el.select))

            it('Выбор "Заголовок"', async () => await dec.simple(el.select.iconXpand,
                ['Заголовок', 'Добавить заголовок к файлу', 'Добавить свой заголовок', entry.max],
                el.select))

            it('Ввод "Наименование"', async () => await dec.simple(el.input.sendKeys,
                ['Наименование', '', params.header, entry.max],
                el.input))

            it('Проверка "Выберите тип файла для экспорта"', async () => await dec.simpleText(el.select.getText,
                ['Выберите тип файла для экспорта', 'XLSX', entry.max],
                'XLSX',
                el.select))

            it('Проверка "Заголовок"', async () => await dec.simpleText(el.select.getText,
                ['Заголовок', 'Добавить свой заголовок', entry.max],
                'Добавить свой заголовок',
                el.select))

            it('Проверка "Наименование"', async () => await dec.simpleText(el.input.getValue,
                ['Наименование', '', entry.max],
                params.header,
                el.input))

            it('Проверка "Имя выходного файла"', async () => await dec.simpleText(el.input.getValue,
                ['Имя выходного файла', 'Определяется системой', entry.max],
                '',
                el.input))

            it('Нажатие кнопки "Экспортировать"', async () => await dec.simple(el.button.handler,
                ['Экспортировать', entry.max],
                el.button))

            it('Отсутствие модального окна "Экспортировать данные"', async () => await dec.simple(el.modal.exportData.initClose,
                [entry.max],
                el.modal.exportData))
        });

        describe('Проверка файла', () => {

            bef()
            aft()

            it('Отображение файла', async () => await dec.simple(el.file.display,
                [params.xlsx, entry.upload],
                el.file))

            it('Проверка строк файла', async () => {
                const jsonFile = await el.file.readNum(params.xlsx)
                await dec.exportFile(params.file, jsonFile)
            })

            it('Удаление файла', async () => await dec.simple(el.file.delete,
                [params.xlsx,  entry.upload],
                el.file))
        });

        deletePosition();

    });

    const xlsxNoHeaderName = () => describe('Должности. Экспорт должностей в xlsx файл. Без заголовка.' +
        'Собственное имя.', () => {

        const params = {
                fileName: 'SeleniumTestFile',
                division: {
                    name: 'SeleniumPositionImportXLSXNameOne',
                    comment: 'SeleniumPositionImportXLSXDescriptionOne',
                },
                file: [
                    { 'Должность': 'SeleniumPositionImportXLSXNameOne', 'Описание': 'SeleniumPositionImportXLSXDescriptionOne' }
                ],
            }

        describe('API - добавление', () => {
            bef();
            aft();
            it('Добавление должностей', async () => {
                const cook = await page.base.getCookie('token')
                const array = [params.division]

                await dec.simple(api.putArrayPosition,
                    [array, cook.text],
                    api.putManyPosition)
            });
        });

        describe('Экспорт', () => {

            bef();
            aft();

            it('Нажатие кнопки "Меню"', async () => await dec.simple(el.butIcBefore.handler,
                [but.menu, entry.max],
                el.butIcBefore))

            it('Отображение "Меню"', async () => await dec.simple(el.menu.menu,
                [entry.max],
                el.menu))

            it('Нажатие параметра "Экспорт"', async () => await dec.simple(el.menu.handler,
                ['Экспорт', entry.max],
                el.menu))

            it('Отображение модального окна "Экспортировать данные"', async () => await dec.simple(el.modal.exportData.init,
                [entry.max],
                el.modal.exportData))

            it('Выбор "Выберите тип файла для экспорта"', async () => await dec.simple(el.select.iconXpand,
                ['Выберите тип файла для экспорта', 'XLSX', 'XLSX', entry.max],
                el.select))

            it('Выбор "Заголовок"', async () => await dec.simple(el.select.iconXpand,
                ['Заголовок', 'Добавить заголовок к файлу',  'Не добавлять заголовок', entry.max],
                el.select))

            it('Ввод "Имя выходного файла"', async () => await dec.simple(el.input.sendKeys,
                ['Имя выходного файла', 'Определяется системой', params.fileName, entry.max],
                el.input))

            it('Проверка "Выберите тип файла для экспорта"', async () => await dec.simpleText(el.select.getText,
                ['Выберите тип файла для экспорта', 'XLSX', entry.max],
                'XLSX',
                el.select))

            it('Проверка "Заголовок"', async () => await dec.simpleText(el.select.getText,
                ['Заголовок', 'Не добавлять заголовок', entry.max],
                'Не добавлять заголовок',
                el.select))

            it('Проверка "Имя выходного файла"', async () => await dec.simpleText(el.input.getValue,
                ['Имя выходного файла', 'Определяется системой', entry.max],
                params.fileName,
                el.input))

            it('Нажатие кнопки "Экспортировать"', async () => await dec.simple(el.button.handler,
                ['Экспортировать', entry.max],
                el.button))

            it('Отсутствие модального окна "Экспортировать данные"', async () => await dec.simple(el.modal.exportData.initClose,
                [entry.max],
                el.modal.exportData))
        })

        describe('Проверка файла', () => {

            bef();
            aft();

            it('Отображение файла', async () => await dec.simple(el.file.display,
                [params.fileName + '.xlsx', entry.upload],
                el.file))

            it('Проверка строк файла', async () => {
                const jsonFile = await el.file.readNum(params.fileName + '.xlsx')
                await dec.exportFile(params.file, jsonFile)
            })

            it('Удаление файла', async () => await dec.simple(el.file.delete,
                [params.fileName + '.xlsx', entry.upload],
                el.file))
        })

        deletePosition();
    });

    const xlsxHeaderName = () => describe('Должности. Экспорт должностей в xlsx файл. C заголовком. Собственное имя.',
        () => {

        const params = {
            fileName: 'SeleniumTestFile',
            division: {
                name: 'SeleniumPositionImportXLSXNameOne',
                comment: 'SeleniumPositionImportXLSXDescriptionOne',
            },
            file: [
                { 'Отчет "Должности"': 'Должность', __EMPTY: 'Описание' },
                {
                    'Отчет "Должности"': 'SeleniumPositionImportXLSXNameOne',
                    __EMPTY: 'SeleniumPositionImportXLSXDescriptionOne'
                }
            ],
        }

        describe('API - добавление', () => {
            bef();
            aft();
            it('Добавление должностей', async () => {
                const cook = await page.base.getCookie('token')
                const array = [params.division]

                await dec.simple(api.putArrayPosition,
                    [array, cook.text],
                    api.putManyPosition)
            });
        });

        describe('Экспорт', () => {

            bef();
            aft();

            it('Нажатие кнопки "Меню"', async () => await dec.simple(el.butIcBefore.handler,
                [but.menu, entry.max],
                el.butIcBefore))

            it('Отображение "Меню"', async () => await dec.simple(el.menu.menu,
                [entry.max],
                el.menu))

            it('Нажатие параметра "Экспорт"', async () => await dec.simple(el.menu.handler,
                ['Экспорт', entry.max],
                el.menu))

            it('Отображение модального окна "Экспортировать данные"', async () => await dec.simple(el.modal.exportData.init,
                [entry.max],
                el.modal.exportData))

            it('Выбор "Выберите тип файла для экспорта"', async () => await dec.simple(el.select.iconXpand,
                ['Выберите тип файла для экспорта', 'XLSX', 'XLSX', entry.max],
                el.select))

            it('Выбор "Заголовок"', async () => await dec.simple(el.select.iconXpand,
                ['Заголовок', 'Добавить заголовок к файлу', 'Добавить заголовок к файлу', entry.max],
                el.select))

            it('Ввод "Имя выходного файла"', async () => await dec.simple(el.input.sendKeys,
                ['Имя выходного файла', 'Определяется системой', params.fileName, entry.max],
                el.input))

            it('Проверка "Выберите тип файла для экспорта"', async () => await dec.simpleText(el.select.getText,
                ['Выберите тип файла для экспорта', 'XLSX', entry.max],
                'XLSX',
                el.select))

            it('Проверка "Заголовок"', async () => await dec.simpleText(el.select.getText,
                ['Заголовок', 'Добавить заголовок к файлу', entry.max],
                'Добавить заголовок к файлу',
                el.select))

            it('Проверка "Имя выходного файла"', async () => await dec.simpleText(el.input.getValue,
                ['Имя выходного файла', 'Определяется системой', entry.max],
                params.fileName,
                el.input))

            it('Нажатие кнопки "Экспортировать"', async () => await dec.simple(el.button.handler,
                ['Экспортировать', entry.max],
                el.button))

            it('Отсутствие модального окна "Экспортировать данные"', async () => await dec.simple(el.modal.exportData.initClose,
                [entry.max],
                el.modal.exportData))
        })

        describe('Проверка файла', () => {

            bef();
            aft();

            it('Отображение файла', async () => await dec.simple(el.file.display,
                [params.fileName + '.xlsx', entry.upload],
                el.file))

            it('Проверка строк файла', async () => {
                const jsonFile = await el.file.readNum(params.fileName + '.xlsx')
                await dec.exportFile(params.file, jsonFile)
            })

            it('Удаление файла', async () => await dec.simple(el.file.delete,
                [params.fileName + '.xlsx', entry.upload],
                el.file))
        })

        deletePosition();
    });

    const xlsxHeaderNameName = () => describe('Должности. Экспорт должностей в xlsx файл. Свой заголовок. ' +
        'Собственное имя.', () => {

        const params = {
                header: 'header',
                fileName: 'SeleniumTestFile',
                division: {
                    name: 'SeleniumPositionImportXLSXNameOne',
                    comment: 'SeleniumPositionImportXLSXDescriptionOne',
                },
                file: [
                    { header: 'Должность', __EMPTY: 'Описание' },
                    {
                        header: 'SeleniumPositionImportXLSXNameOne',
                        __EMPTY: 'SeleniumPositionImportXLSXDescriptionOne'
                    },
                ],
            }

        describe('API - добавление', () => {
            bef();
            aft();
            it('Добавление должностей', async () => {
                const cook = await page.base.getCookie('token')
                const array = [params.division]

                await dec.simple(api.putArrayPosition,
                    [array, cook.text],
                    api.putManyPosition)
            });
        });

        describe('Экспорт', () => {

            bef();
            aft();

            it('Нажатие кнопки "Меню"', async () => await dec.simple(el.butIcBefore.handler,
                [but.menu, entry.max],
                el.butIcBefore))

            it('Отображение "Меню"', async () => await dec.simple(el.menu.menu,
                [entry.max],
                el.menu))

            it('Нажатие параметра "Экспорт"', async () => await dec.simple(el.menu.handler,
                ['Экспорт', entry.max],
                el.menu))

            it('Отображение модального окна "Экспортировать данные"', async () => await dec.simple(el.modal.exportData.init,
                [entry.max],
                el.modal.exportData))

            it('Выбор "Выберите тип файла для экспорта"', async () => await dec.simple(el.select.iconXpand,
                ['Выберите тип файла для экспорта', 'XLSX', 'XLSX', entry.max],
                el.select))

            it('Выбор "Заголовок"', async () => await dec.simple(el.select.iconXpand,
                ['Заголовок', 'Добавить заголовок к файлу', 'Добавить свой заголовок', entry.max],
                el.select))

            it('Ввод "Наименование"', async () => await dec.simple(el.input.sendKeys,
                ['Наименование', '', params.header, entry.max],
                el.input))

            it('Ввод "Имя выходного файла"', async () => await dec.simple(el.input.sendKeys,
                ['Имя выходного файла', 'Определяется системой', params.fileName, entry.max],
                el.input))

            it('Проверка "Выберите тип файла для экспорта"', async () => await dec.simpleText(el.select.getText,
                ['Выберите тип файла для экспорта', 'XLSX', entry.max],
                'XLSX',
                el.select))

            it('Проверка "Заголовок"', async () => await dec.simpleText(el.select.getText,
                ['Заголовок', 'Добавить свой заголовок', entry.max],
                'Добавить свой заголовок',
                el.select))

            it('Проверка "Наименование"', async () => await dec.simpleText(el.input.getValue,
                ['Наименование', '', entry.max],
                params.header,
                el.input))

            it('Проверка "Имя выходного файла"', async () => await dec.simpleText(el.input.getValue,
                ['Имя выходного файла', 'Определяется системой', entry.max],
                params.fileName,
                el.input))

            it('Нажатие кнопки "Экспортировать"', async () => await dec.simple(el.button.handler,
                ['Экспортировать', entry.max],
                el.button))

            it('Отсутствие модального окна "Экспортировать данные"', async () => await dec.simple(el.modal.exportData.initClose,
                [entry.max],
                el.modal.exportData))
        });

        describe('Проверка файла', () => {

            bef();
            aft();

            it('Отображение файла', async () => await dec.simple(el.file.display,
                [params.fileName + '.xlsx', entry.upload],
                el.file))

            it('Проверка строк файла', async () => {
                const jsonFile = await el.file.readNum(params.fileName + '.xlsx')
                await dec.exportFile(params.file, jsonFile)
            })

            it('Удаление файла', async () => await dec.simple(el.file.delete,
                [params.fileName + '.xlsx',  entry.upload],
                el.file))
        });

        deletePosition();

    });

    const csvSystem = () => describe('Должности. Экспорт должностей в csv файл. Системное имя файла.', () => {

        const params = {
            csv: 'position.csv',
            division: {
                name: 'SeleniumPositionImportXLSXNameOne',
                comment: 'SeleniumPositionImportXLSXDescriptionOne',
            },
            file: [
                {
                    'Должность': 'SeleniumPositionImportXLSXNameOne',
                    'Описание': 'SeleniumPositionImportXLSXDescriptionOne'
                },
            ],
        }

        describe('API - добавление', () => {
            bef();
            aft();
            it('Добавление должностей', async () => {
                const cook = await page.base.getCookie('token')
                const array = [params.division]

                await dec.simple(api.putArrayPosition,
                    [array, cook.text],
                    api.putManyPosition)
            });
        });

        describe('Экспорт', () => {

            bef();
            aft();

            it('Нажатие кнопки "Меню"', async () => await dec.simple(el.butIcBefore.handler,
                [but.menu, entry.max],
                el.butIcBefore))

            it('Отображение "Меню"', async () => await dec.simple(el.menu.menu,
                [entry.max],
                el.menu))

            it('Нажатие параметра "Экспорт"', async () => await dec.simple(el.menu.handler,
                ['Экспорт', entry.max],
                el.menu))

            it('Отображение модального окна "Экспортировать данные"', async () => await dec.simple(el.modal.exportData.init,
                [entry.max],
                el.modal.exportData))

            it('Выбор "Выберите тип файла для экспорта"', async () => await dec.simple(el.select.iconXpand,
                ['Выберите тип файла для экспорта', 'XLSX', 'CSV', entry.max],
                el.select))

            it('Осутствие "Заголовок"', async () => await dec.simple(el.select.noSelect,
                ['Заголовок', 'Добавить заголовок к файлу', entry.max],
                el.select))

            it('Проверка "Выберите тип файла для экспорта"', async () => await dec.simpleText(el.select.getText,
                ['Выберите тип файла для экспорта', 'CSV', entry.max],
                'CSV',
                el.select))

            it('Проверка "Имя выходного файла"', async () => await dec.simpleText(el.input.getValue,
                ['Имя выходного файла', 'Определяется системой', entry.max],
                '',
                el.input))

            it('Нажатие кнопки "Экспортировать"', async () => await dec.simple(el.button.handler,
                ['Экспортировать', entry.max],
                el.button))

            it('Отсутствие модального окна "Экспортировать данные"', async () => await dec.simple(el.modal.exportData.initClose,
                [entry.max],
                el.modal.exportData))
        });

        describe('Проверка файла', () => {

            bef();
            aft();

            it('Отображение файла', async () => await dec.simple(el.file.display,
                [params.csv, entry.upload],
                el.file))

            it('Проверка строк файла', async () => {
                const jsonFile = await el.file.readNum(params.csv)
                dec.exportFile(params.file, jsonFile)
            })

            it('Удаление файла', async () => await dec.simple(el.file.delete,
                [params.csv, entry.upload],
                el.file))
        });

        deletePosition();

    });

    const csvName = () => describe('Должности. Экспорт должностей в csv файл. Собственное имя.', () => {
        const params = {
            fileName: 'SeleniumTestFile',
            division: {
                name: 'SeleniumPositionImportXLSXNameOne',
                comment: 'SeleniumPositionImportXLSXDescriptionOne',
            },
            file: [
                {
                    'Должность': 'SeleniumPositionImportXLSXNameOne',
                    'Описание': 'SeleniumPositionImportXLSXDescriptionOne'
                }
            ],
        }

        describe('API - добавление', () => {
            bef();
            aft();
            it('Добавление должностей', async () => {
                const cook = await page.base.getCookie('token')
                const array = [params.division]
                await dec.simple(api.putArrayPosition,
                    [array, cook.text],
                    api.putManyPosition)
            });
        });

        describe('Экспорт', () => {

            bef();
            aft();

            it('Нажатие кнопки "Меню"', async () => await dec.simple(el.butIcBefore.handler,
                [but.menu, entry.max],
                el.butIcBefore))

            it('Отображение "Меню"', async () => await dec.simple(el.menu.menu,
                [entry.max],
                el.menu))

            it('Нажатие параметра "Экспорт"', async () => await dec.simple(el.menu.handler,
                ['Экспорт', entry.max],
                el.menu))

            it('Отображение модального окна "Экспортировать данные"', async () => await dec.simple(el.modal.exportData.init,
                [entry.max],
                el.modal.exportData))

            it('Выбор "Выберите тип файла для экспорта"', async () => await dec.simple(el.select.iconXpand,
                ['Выберите тип файла для экспорта', 'XLSX', 'CSV', entry.max],
                el.select))

            it('Осутствие "Заголовок"', async () => await dec.simple(el.select.noSelect,
                ['Заголовок', 'Добавить заголовок к файлу', entry.max],
                el.select))

            it('Ввод "Имя выходного файла"', async () => await dec.simple(el.input.sendKeys,
                ['Имя выходного файла', 'Определяется системой', params.fileName, entry.max],
                el.input))

            it('Проверка "Выберите тип файла для экспорта"', async () => await dec.simpleText(el.select.getText,
                ['Выберите тип файла для экспорта', 'CSV', entry.max],
                'CSV',
                el.select))

            it('Проверка "Имя выходного файла"', async () => await dec.simpleText(el.input.getValue,
                ['Имя выходного файла', 'Определяется системой', entry.max],
                params.fileName,
                el.input))

            it('Нажатие кнопки "Экспортировать"', async () => await dec.simple(el.button.handler,
                ['Экспортировать', entry.max],
                el.button))

            it('Отсутствие модального окна "Экспортировать данные"', async () => await dec.simple(el.modal.exportData.initClose,
                [entry.max],
                el.modal.exportData))
        });

        describe('Проверка файла', () => {

            bef();
            aft();

            it('Отображение файла', async () => await dec.simple(el.file.display,
                [params.fileName + '.csv', entry.upload],
                el.file))

            it('Проверка строк файла', async () => {
                const jsonFile = await el.file.readNum(params.fileName + '.csv')
                console.log(jsonFile)
                dec.exportFile(params.file, jsonFile)
            })

            it('Удаление файла', async () => await dec.simple(el.file.delete,
                [params.fileName + '.csv', entry.upload],
                el.file))
        });

        deletePosition();
    });

    return {
        xlsxNoHeaderSystem,
        xlsxHeaderSystem,
        xlsxHeaderNameSystem,
        xlsxNoHeaderName,
        xlsxHeaderName,
        xlsxHeaderNameName,
        csvSystem,
        csvName
    }
}

//Проверка импорта
const importFiles = () => {

    const importXLSX = () => describe('Должности. Импорт должностей из xlsx файла.', () => {

        const params = {
            one: {
                name: 'SeleniumPositionImportXLSXNameOne',
                description: '',
            },
            two: {
                name: 'SeleniumPositionImportXLSXNameTwo',
                description: 'SeleniumPositionImportXLSXDescriptionTwo',
            },
            message: 'Импорт завершен 0 записей из 2 не было импортировано',
        }

        describe('Импорт', () => {

            bef();
            aft();

            it('Нажатие кнопки "Меню"', async () => await dec.simple(el.butIcBefore.handler,
                [but.menu, entry.max],
                el.butIcBefore))

            it('Отображение "Меню"', async () => await dec.simple(el.menu.menu,
                [entry.max],
                el.menu))

            it('Нажатие параметра "Импорт из XLS, XLSX"', async () => await dec.simple(el.menu.handler,
                ['Импорт из XLS, XLSX', entry.max],
                el.menu))

            it('Отображение модального окна "Импорт"', async () => await dec.simple(el.modal.importData.init,
                [entry.max],
                el.modal.importData))

            it('Выбор тестового файла', async () => await dec.simple(el.modal.importData.sendKeys,
                [imp.position.importXLSXSuccess, entry.upload],
                el.modal.importData))

            it('Отображение "Должность"', async () => await dec.simple(el.select.select,
                ['Должность', '', entry.upload],
                el.select))

            it('Выбор "Должность"', async () => await dec.simple(el.select.iconXpand,
                ['Должность', '', 'Должность', entry.max],
                el.select))

            it('Отображение "Описание"', async () => await dec.simple(el.select.select,
                ['Описание', '', entry.upload],
                el.select))

            it('Выбор "Описание"', async () => await dec.simple(el.select.iconXpand,
                ['Описание', '', 'Описание', entry.max],
                el.select))

            it('Нажатие кнопки "Далее"', async () => await dec.simple(el.button.handler,
                ['Далее', entry.max],
                el.button))

            it('Сообщение о загрузке файлов', async () => await dec.simpleText(el.modal.importData.bodyGetText,
                [entry.upload],
                params.message,
                el.modal.importData))

            it('Нажатие кнопки "Готово"', async () => await dec.simple(el.button.handler,
                ['Готово', entry.max],
                el.button))
        });

        describe('Проверка таблицы', () => {

            bef()

            aft()

            describe('Проверка первой строки', () => {
                it('Поле "Должности"', async () => await dec.simpleText(el.table.cellGetText,
                    ['Должности', 1, 1, entry.max],
                    params.two.name,
                    el.table))

                it('Поле "Описание"', async () => await dec.simpleText(el.table.cellGetText,
                    ['Описание', 1, 2, entry.max],
                    params.two.description,
                    el.table))
            })

            describe('Проверка второй строки', () => {
                it('Поле "Должности"', async () => await dec.simpleText(el.table.cellGetText,
                    ['Должности', 2, 1, entry.max],
                    params.one.name,
                    el.table))

                it('Поле "Описание"', async () => await dec.simpleText(el.table.cellGetText,
                    ['Описание', 2, 2, entry.max],
                    params.one.description,
                    el.table))
            })
        });

        deletePosition();
    });

    const importXLS = () => describe('Должности. Импорт должностей из xls файла.', () => {

        const params = {
            one: {
                name: 'SeleniumPositionImportXLSXNameOne',
                description: '',
            },
            two: {
                name: 'SeleniumPositionImportXLSXNameTwo',
                description: 'SeleniumPositionImportXLSXDescriptionTwo',
            },
            message: 'Импорт завершен 0 записей из 2 не было импортировано',
        }

        describe('Импорт', () => {

            bef();
            aft();

            it('Нажатие кнопки "Меню"', async () => await dec.simple(el.butIcBefore.handler,
                [but.menu, entry.max],
                el.butIcBefore))

            it('Отображение "Меню"', async () => await dec.simple(el.menu.menu,
                [entry.max],
                el.menu))

            it('Нажатие параметра "Импорт из XLS, XLSX"', async () => await dec.simple(el.menu.handler,
                ['Импорт из XLS, XLSX', entry.max],
                el.menu))

            it('Отображение модального окна "Импорт"', async () => await dec.simple(el.modal.importData.init,
                [entry.max],
                el.modal.importData))

            it('Выбор тестового файла', async () => await dec.simple(el.modal.importData.sendKeys,
                [imp.position.importXLSSuccess, entry.upload],
                el.modal.importData))

            it('Отображение "Должность"', async () => await dec.simple(el.select.select,
                ['Должность', '', entry.max],
                el.select))

            it('Выбор "Должность"', async () => await dec.simple(el.select.iconXpand,
                ['Должность', '', 'Должность', entry.upload],
                el.select))

            it('Отображение "Описание"', async () => await dec.simple(el.select.select,
                ['Описание', '', entry.max],
                el.select))

            it('Выбор "Описание"', async () => await dec.simple(el.select.iconXpand,
                ['Описание', '', 'Описание', entry.upload],
                el.select))

            it('Нажатие кнопки "Далее"', async () => await dec.simple(el.button.handler,
                ['Далее', entry.max],
                el.button))

            it('Сообщение о загрузке файлов', async () => await dec.simpleText(el.modal.importData.bodyGetText,
                [entry.upload],
                params.message,
                el.modal.importData))

            it('Нажатие кнопки "Готово"', async () => await dec.simple(el.button.handler,
                ['Готово', entry.max],
                el.button))
        });

        describe('Проверка таблицы', () => {

            bef();
            aft();

            describe('Проверка первой строки', () => {
                it('Поле "Должности"', async () => await dec.simpleText(el.table.cellGetText,
                    ['Должности', 1, 1, entry.max],
                    params.two.name,
                    el.table))

                it('Поле "Описание"', async () => await dec.simpleText(el.table.cellGetText,
                    ['Описание', 1, 2, entry.max],
                    params.two.description,
                    el.table))
            })

            describe('Проверка второй строки', () => {
                it('Поле "Должности"', async () => await dec.simpleText(el.table.cellGetText,
                    ['Должности', 2, 1, entry.max],
                    params.one.name,
                    el.table))

                it('Поле "Описание"', async () => await dec.simpleText(el.table.cellGetText,
                    ['Описание', 2, 2, entry.max],
                    params.one.description,
                    el.table))
            })
        });

        deletePosition();

    });

    const importXLSXNoNameFile = () => describe('Должности. Импорт должностей из xlsx без имени с экспортом файла ' +
        'с ошибками.', () => {

        const params = {
                message: 'Импорт завершен 1 записей из 1 не было импортировано',
                file: [
                    {
                        'Отчет "Не импортированные данные"': 'Должность',
                        __EMPTY: 'Описание',
                        __EMPTY_1: 'Ошибка'
                    },
                    {
                        'Отчет "Не импортированные данные"': '',
                        __EMPTY: 'SeleniumPositionImportXLSXDescriptionOne',
                        __EMPTY_1: 'Отсутствует обязательное поле Должность'
                    }
                ]
            }

        describe('Импорт', () => {

            bef();
            aft();

            it('Нажатие кнопки "Меню"', async () => await dec.simple(el.butIcBefore.handler,
                [but.menu, entry.max],
                el.butIcBefore))

            it('Отображение "Меню"', async () => await dec.simple(el.menu.menu,
                [entry.max],
                el.menu))

            it('Нажатие параметра "Импорт из XLS, XLSX"', async () => await dec.simple(el.menu.handler,
                ['Импорт из XLS, XLSX', entry.max],
                el.menu))

            it('Отображение модального окна "Импорт"', async () => await dec.simple(el.modal.importData.init,
                [entry.max],
                el.modal.importData))

            it('Выбор тестового файла', async () => await dec.simple(el.modal.importData.sendKeys,
                [imp.position.importXLSXFailed, entry.upload],
                el.modal.importData))

            it('Отображение "Должность"', async () => await dec.simple(el.select.select,
                ['Должность', '', entry.max],
                el.select))

            it('Выбор "Должность"', async () => await dec.simple(el.select.iconXpand,
                ['Должность', '', 'Должность', entry.max],
                el.select))

            it('Отображение "Описание"', async () => await dec.simple(el.select.select,
                ['Описание', '', entry.max],
                el.select))

            it('Выбор "Описание"', async () => await dec.simple(el.select.iconXpand,
                ['Описание', '', 'Описание', entry.max],
                el.select))

            it('Нажатие кнопки "Далее"', async () => await dec.simple(el.button.handler,
                ['Далее', entry.max],
                el.button))

            it('Сообщение о загрузке файлов', async () => await dec.simpleText(el.modal.importData.bodyGetText,
                [entry.upload],
                params.message,
                el.modal.importData))

            it('Нажатие кнопки "Экспорт остатка в файл"', async () => await dec.simple(el.button.handler,
                ['Экспорт остатка в файл', entry.max],
                el.button));

            it('Отсутствие модального окна "Импорт"', async () => await dec.simple(el.modal.importData.initClose,
                [entry.upload],
                el.modal.importData));

            it('Отсутствие модального окна "Импорт"', async () => await dec.simple(el.modal.importData.initClose,
                [entry.max],
                el.modal.importData))
        })

        describe('Проверка файла', () => {

            it('Отображение файла в директории', async () => await dec.simple(el.file.display,
                [entry.failedExport, entry.upload],
                el.file))

            it('Проверка строк файла', async () => {
                const jsonFile = await el.file.readNum(entry.failedExport)
                dec.exportFile(params.file, jsonFile)
            })

            it('Удаление файла', async () => await dec.simple(el.file.delete,
                [entry.failedExport, entry.upload],
                el.file))
        });

        describe('Проверка таблицы', () => {

            bef();
            aft();

            it('Отсутствие строк в таблице', async () => await dec.simple(el.table.noStr,
                [entry.max],
                el.table))
        })

        deletePosition();
    });

    const importXLSXPartly = () => describe('Должности. Импорт. Частичный импорт должностей из xlsx.', () => {

        const params = {
            one: {
                name: 'SeleniumPositionImportXLSXNameOne',
                description: '',
            },
            two: {
                name: 'SeleniumPositionImportXLSXNameTwo',
                description: 'SeleniumPositionImportXLSXDescriptionTwo',
            },
            message: 'Импорт завершен 1 записей из 3 не было импортировано',
            file: [
                {
                    'Отчет "Не импортированные данные"': 'Должность',
                    __EMPTY: 'Описание',
                    __EMPTY_1: 'Ошибка'
                },
                {
                    'Отчет "Не импортированные данные"': '',
                    __EMPTY: 'SeleniumPositionImportXLSXDescriptionThree',
                    __EMPTY_1: 'Отсутствует обязательное поле Должность'
                }
            ]
        }

        describe('Импорт', () => {

            bef();
            aft();

            it('Нажатие кнопки "Меню"', async () => await dec.simple(el.butIcBefore.handler,
                [but.menu, entry.max],
                el.butIcBefore))

            it('Отображение "Меню"', async () => await dec.simple(el.menu.menu,
                [entry.max],
                el.menu))

            it('Нажатие параметра "Импорт из XLS, XLSX"', async () => await dec.simple(el.menu.handler,
                ['Импорт из XLS, XLSX', entry.max],
                el.menu))

            it('Отображение модального окна "Импорт"', async () => await dec.simple(el.modal.importData.init,
                [entry.max],
                el.modal.importData))

            it('Выбор тестового файла', async () => await dec.simple(el.modal.importData.sendKeys,
                [imp.position.importXLSXPartlySuccess, entry.upload],
                el.modal.importData))

            it('Отображение "Должность"', async () => await dec.simple(el.select.select,
                ['Должность', '', entry.upload],
                el.select))

            it('Выбор "Должность"', async () => await dec.simple(el.select.iconXpand,
                ['Должность', '', 'Должность', entry.max],
                el.select))

            it('Отображение "Описание"', async () => await dec.simple(el.select.select,
                ['Описание', '', entry.upload],
                el.select))

            it('Выбор "Описание"', async () => await dec.simple(el.select.iconXpand,
                ['Описание', '', 'Описание', entry.max],
                el.select))

            it('Нажатие кнопки "Далее"', async () => await dec.simple(el.button.handler,
                ['Далее', entry.max],
                el.button))

            it('Сообщение о загрузке файлов', async () => await dec.simpleText(el.modal.importData.bodyGetText,
                [entry.upload],
                params.message,
                el.modal.importData))

            it('Нажатие кнопки закрытия', async () => await dec.simple(el.modal.importData.closeHandler,
                [entry.max],
                el.modal.importData))

            it('Отсутствие модального окна "Импорт"', async () => await dec.simple(el.modal.importData.initClose,
                [entry.upload],
                el.modal.importData))
        })

        describe('Проверка таблицы', () => {

            bef();
            aft();

            describe('Проверка первой строки', () => {
                it('Поле "Должности"', async () => await dec.simpleText(el.table.cellGetText,
                    ['Должности', 1, 1, entry.max],
                    params.two.name,
                    el.table))

                it('Поле "Описание"', async () => await dec.simpleText(el.table.cellGetText,
                    ['Описание', 1, 2, entry.max],
                    params.two.description,
                    el.table))
            })

            describe('Проверка второй строки', () => {
                it('Поле "Должности"', async () => await dec.simpleText(el.table.cellGetText,
                    ['Должности', 2, 1, entry.max],
                    params.one.name,
                    el.table))

                it('Поле "Описание"', async () => await dec.simpleText(el.table.cellGetText,
                    ['Описание', 2, 2, entry.max],
                    params.one.description,
                    el.table))
            })
        })

        deletePosition();
    });

    return {
        importXLSX,
        importXLS,
        importXLSXNoNameFile,
        importXLSXPartly
    }

};

//Проверка печати
const print = () => describe('Должности. Проверка печати.', () => {

    const params = {
        one: {
            name: 'SeleniumPositionPrintNameOne',
            comment: 'SeleniumPositionPrintDescriptionOne',
        },
    }

    describe('API - добавление', () => {
        bef();
        aft();
        it('Добавление должностей', async () => {
            const cook = await page.base.getCookie('token')
            const array = [params.one]
            await dec.simple(api.putArrayPosition,
                [array, cook.text],
                api.putManyPosition)
        });
    });

    describe('Проверка печатной формы', () => {

        bef();
        aft();

        describe('Открытие печатной формы', () => {
            it('Нажатие кнопки "Меню"', async () => await dec.simple(el.butIcBefore.handler,
                [but.menu, entry.max],
                el.butIcBefore))

            it('Отображение "Меню"', async () => await dec.simple(el.menu.menu,
                [entry.max],
                el.menu))

            it('Нажатие параметра "Печать таблицы"', async () => await dec.simple(el.menu.handler,
                ['Печать таблицы', entry.max],
                el.menu))

            it('Отображение печатной формы', async () => await dec.simple(el.modal.printTable.init,
                [entry.max],
                el.modal.printTable))
        })

        describe('Проверка первой строки', () => {
            it('Поле "Должности"', async () => await dec.simpleText(el.modal.printTable.cellGetText,
                ['Должности', '1', '1', entry.max],
                params.one.name,
                el.modal.printTable))

            it('Поле "Описание"', async () => await dec.simpleText(el.modal.printTable.cellGetText,
                ['Описание', '1', '2', entry.max],
                params.one.comment,
                el.modal.printTable))
        })

        describe('Закрытие печатной формы', () => {

            it('Нажатие кнопки закрытия', async () => await dec.simple(el.modal.printTable.closeHandler,
                [entry.max],
                el.modal.printTable))

            it('Отсутствие печатной формы', async () => await dec.simple(el.modal.printTable.initClose,
                [entry.max],
                el.modal.printTable))
        })

    })

    deletePosition();
})


module.exports = {
    display,
    add: add(),
    edit: edit(),
    delete: remove(),
    export: exportFiles(),
    import: importFiles(),
    print,
    footer,
    filterSearch,
    sort
}
