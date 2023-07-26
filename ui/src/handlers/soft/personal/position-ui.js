const {describe, it, before, after} = require('mocha')

const entry = require('../../../../../entry')
const page = require('../../../pages')
const el = require('../../../elements')
const dec = require('../../../dictionaries/decorate')
const sec = require('../../../dictionaries/section')
const sub = require('../../../dictionaries/subsection')
const but = require('../../../dictionaries/button-icon')
const imp = require('../../../upload-files')
const oth = require('../../other/other')
const api = require('../../other/api')

const bef = () => before('Вход и открытие подраздела "Должности"', async () => {
    await dec.auth(entry.customLogin, entry.customPassword)
    await dec.simple(el.section.handler, [sec.per, entry.max], el.section)
    await dec.simple(el.subsection.handler, [sub.per.position, entry.max], el.subsection)
    await dec.simple(page.position.init, [entry.max], page.position)
})
const aft = () => after('Выход', async () => await dec.exit())

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

// api - Удаление должности
const deletePosition = () => describe('Удаление тестовых данных', () => {
    bef();
    aft();
    it('Добавление должностей', async () => {
        const cook = await page.base.getCookie('token');
        const get = await api.getPosition(cook.text);
        const filter = get.text.map(item => item['id']);
        await dec.simple(api.putPosition,
            [filter, cook.text],
            api.putPosition);
    });
});

//Отображение первичное
const display = () => describe('Первичное отображение.', () => {

    describe('Общие проверки', () => {
        bef()

        aft()

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

        bef()

        aft()

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

})

//Проверка добавление
const add = () => describe('Проверка добавления.', () => {

    const params = {
        min: {
            name: 'SeleniumPositionMinName',
        },
        max: {
            name: 'SeleniumPositionMaxName',
            description: 'SeleniumPositionMaxDescription',
        },
        noName: {
            description: 'SeleniumPositionNoNameDescription',
        },
        duplicate: {
            name: 'SeleniumPositionMaxName',
        }
    }

    // Добавление. Добавление должности с минимальным набором параметров.
    const addMinParams = () => describe('Должности. Добавление. Добавление должности с минимальным набором параметров.',
        () => {

        const params = {
            name: 'SeleniumPositionMinName',
        }

        describe('Проверка таблицы', () => {

                bef()

                aft()

                it('Отображение в таблице 0 строк', async () => await dec.simple(el.table.size,
                    [0, entry.max],
                    el.table))
            })

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
                '',
                el.table))

        })

        deletePosition();
    })

    // Добавление должности с максимальным набором параметров.
    const addMaxParams = describe('Должности. Добавление. Добавление должности с максимальным набором параметров.', () => {

        const params = {
            name: 'SeleniumPositionMaxName',
            description: 'SeleniumPositionMaxDescription',
        }

        describe('Проверка таблицы', () => {

            bef()

            aft()

            it('Отображение в таблице 0 строк', async () => await dec.simple(el.table.size,
                [0, entry.max],
                el.table))
        })

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
    const addNoParams = describe('Должности. Добавление. Попытка добавление должности без ввода всех параметров.',
        () => {
            describe('Проверка таблицы', () => {

                bef()

                aft()

                it('Отображение в таблице 0 строк', async () => await dec.simple(el.table.size,
                    [0, entry.max],
                    el.table))
            })

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

                deletePosition();
            })

            describe('Проверка таблицы', () => {

                bef()

                aft()

                it('Отображение в таблице 0 строк', async () => await dec.simple(el.table.size,
                    [0, entry.max],
                    el.table))
            })

            deletePosition();

    })

    // Добавление. Попытка добавление должности без ввода "Названия".
    const addNoName = describe('Должности. Добавление. Попытка добавление должности без ввода "Названия".',
        () => {

            const params = {
                description: 'addNoName'
            }
            describe('Проверка таблицы', () => {

                bef()

                aft()

                it('Отображение в таблице 0 строк', async () => await dec.simple(el.table.size,
                    [0, entry.max],
                    el.table))
            })

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

                it('Отображение в таблице 2 строки', async () => await dec.simple(el.table.size,
                    [2, entry.max],
                    el.table))
            });

            describe('Проверка таблицы', () => {

                bef()

                aft()

                it('Отображение в таблице 0 строк', async () => await dec.simple(el.table.size,
                    [0, entry.max],
                    el.table))

            })

            deletePosition();
        });

    // Попытка добавления дублирющий должности.
    const addDuplicate = describe('Должности. Добавление. Попытка добавления дублирющий должности.', () => {

        const params = {
            name: 'addDuplicateName',
            error: 'Должность с таким названием уже существует'
        }

        describe('API - добавление', () => {
            addPosition(params.name)
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

        })

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
                ['Название', '', params.duplicate.name, entry.max],
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

        })

        deletePosition()
    });

    // Проверки добавления.
    const add = () => describe('Должности. Проверки добавления.', () => {
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
        add,
    }
})

//Проверка редактирования
const edit = () => describe('Проверка редактирование.', () => {

    // Удаление необязательных параметров с максимальным количеством параметров.
    const editMaxParams = describe('Должности. Редактирование. ' +
        'Удаление необязательных параметров с максимальным количеством параметров.', () => {

        const params = {
            name: 'editMaxParamsName',
            description: 'editMaxParamsDescription'
        }

        describe('API - добавление', () => {
            addPosition(params.name, params.description)
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
        })

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

        })

        deletePosition();

    })

    // Добавление необязательных параметров с минимальным количеством параметров
    const editMinParams = describe('Должности. Редактирование. ' +
        'Добавление необязательных параметров с минимальным количеством параметров', () => {

        const params = {
            name: 'editMinParamsName',
            description: 'editMinParamsDescription'
        }

        describe('API - добавление', () => {
            addPosition(params.name)
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

        })

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
        })

        deletePosition();
    })

    // Редактирование всех параметров.
    const editAllParams = describe('Должности. Редактирование. ' +
        'Редактирование всех параметров.', () => {

        const params = {
            name1: 'editAllParamsName1',
            description1: 'editAllParamsDescription1',
            name2: 'editAllParamsName2',
            description2: 'editAllParamsDescription2',
        }

        describe('API - добавление', () => {
            addPosition(params.name1, params.description1)
        });

        describe('Проверка таблицы', () => {

            bef()

            aft()

            it('Отображение в таблице 1 строка', async () => await dec.simple(el.table.size,
                [1, entry.max],
                el.table))

            it('Поле "Должности"', async () => await dec.simpleText(el.table.cellGetText,
                ['Должности', 1, 1, entry.max],
                params.name1,
                el.table))

            it('Поле "Описание"', async () => await dec.simpleText(el.table.cellGetText,
                ['Описание', 1, 2, entry.max],
                params.description1,
                el.table))

        })

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

        })

        deletePosition();
    })

    // Попытка дублирования.
    const editDuplicate = describe('Должности. Редактирование. Попытка дублирования.', () => {

        const params = {
            name1: 'editAllParamsName1',
            description1: 'editAllParamsDescription1',
            name2: 'editAllParamsName2',
            description2: 'editAllParamsDescription2',
            error: 'Должность с таким названием уже существует'
        }

        describe('API - добавление', () => {
            addPosition(params.name1, params.description1);
            addPosition(params.name2, params.description2)
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

        })

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

        })

        deletePosition();
    })

    return {
        editMinParams,
        editMaxParams,
        editAllParams,
        editDuplicate
    }

})

//Проверка удаления
const remove = () => describe('Проверка удаления', () => {

    const params = {
        one: {
            name: 'SeleniumPositionRemoveName1',
            comment: 'SeleniumPositionEditDescription1'
        },
        two: {
            name: 'SeleniumPositionRemoveName2',
            comment: 'SeleniumPositionRemoveDescription2'
        },
        three: {
            name: 'SeleniumPositionRemoveName3',
            comment: 'SeleniumPositionRemoveDescription3'
        }
    }

    describe('Предварительные действия.', () => {

        describe('Добавление api методом должностей', () => {

            bef()

            aft()

            it('Добавление', async () => {
                const token = await page.base.getCookie('token')

                await dec.simple(api.putArrayPosition,
                    [[params.one, params.two, params.three], token.text],
                    api.putArrayPosition)
            })

        })
    })

    describe('Выполнение тестов.', () => {

        describe('Проверка формы удаления должности', () => {

            bef()

            aft()

            it('Отображение 3 строки в таблице', async () => await dec.simple(el.table.size,
                [3, entry.max],
                el.table))

            it('Нажатие по первой строке', async () => await dec.simple(el.table.strHandler,
                [1, entry.max],
                el.table))

            it('Нажатие кнопки удаления', async () => await dec.simple(el.butIcBefore.handler,
                [but.delete, entry.max],
                el.butIcBefore))

            it('Отображение модального окна удаления должности',
                async () => await dec.simple(el.modalConfirm.positionDelete.init,
                    [entry.max],
                    el.modalConfirm.positionDelete))

            it('Отображение кнопки закрытия', async () => await dec.simple(el.modalConfirm.positionDelete.close,
                [entry.max],
                el.modalConfirm.positionDelete))

            it('Отображение кнопки "Отмена" - активна',
                async () => await dec.simple(el.modalConfirm.positionDelete.buttonActive,
                    ['Отмена', entry.max],
                    el.modalConfirm.positionDelete))

            it('Отображение кнопки "Удалить" - активна',
                async () => await dec.simple(el.modalConfirm.positionDelete.buttonActive,
                    ['Отмена', entry.max],
                    el.modalConfirm.positionDelete))

            it('Нажатие кнопки "Отмена"', async () => await dec.simple(el.modalConfirm.positionDelete.buttonHandler,
                ['Отмена', entry.max],
                el.modalConfirm.positionDelete))

            it('Отсутствие модального окна удаления должности',
                async () => await dec.simple(el.modalConfirm.positionDelete.initClose,
                    [entry.max],
                    el.modalConfirm.positionDelete))

            it('Отображение 3 строки в таблице', async () => await dec.simple(el.table.size,
                [3, entry.max],
                el.table))

            it('Нажатие по первой строке', async () => await dec.simple(el.table.strHandler,
                [1, entry.max],
                el.table))

            it('Нажатие кнопки удаления', async () => await dec.simple(el.butIcBefore.handler,
                [but.delete, entry.max],
                el.butIcBefore))

            it('Отображение модального окна удаления должности',
                async () => await dec.simple(el.modalConfirm.positionDelete.init,
                    [entry.max],
                    el.modalConfirm.positionDelete))

            it('Нажатие кнопки закрытия модального окна',
                async () => await dec.simple(el.modalConfirm.positionDelete.buttonHandler,
                    ['Отмена', entry.max],
                    el.modalConfirm.positionDelete))

            it('Отсутствие модального окна удаления должности',
                async () => await dec.simple(el.modalConfirm.positionDelete.initClose,
                    [entry.max],
                    el.modalConfirm.positionDelete))

            it('Отображение 3 строки в таблице', async () => await dec.simple(el.table.size,
                [3, entry.max],
                el.table))
        })

        describe('Удаление одной должности', () => {

            bef()

            aft()

            it('Отображение 3 строки в таблице', async () => await dec.simple(el.table.size,
                [3, entry.max],
                el.table))

            it('Сортировка по ворзрастанию столбца "Должности"', async () => {
                await dec.simple(el.table.headHandler,
                    ["Должности", 1, entry.max],
                    el.table)
                await dec.simple(el.table.headSortAsc,
                    ["Должности", 1, entry.max],
                    el.table)
                await dec.animation()
            })

            it('Проверка значения 1 строка - 1 столбец', async () => await dec.simpleText(el.table.cellGetText,
                ["Должности", 1, 1, entry.max],
                params.one.name,
                el.table
            ))

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

            it('Отображение 2 строки в таблице', async () => await dec.simple(el.table.size,
                [2, entry.max],
                el.table))

            it('Изменение значения 1 строка 1 столбец', async () => await dec.simpleText(el.table.cellGetText,
                ["Должности", 1, 1, entry.max],
                params.two.name,
                el.table
            ))
        })

        describe('Удаление две должности', () => {

            bef()

            aft()

            it('Отображение 2 строки в таблице', async () => await dec.simple(el.table.size,
                [2, entry.max],
                el.table))

            it('Нажатие "Control" и по превой стрроке',
                async () => await dec.simple(el.table.controlStrHandler,
                    [1, entry.max],
                    el.table))

            it('Нажатие "Control" и по второй стрроке',
                async () => await dec.simple(el.table.controlStrHandler,
                    [2, entry.max],
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

            it('Отображение 0 строк в таблице', async () => await dec.simple(el.table.size,
                [0, entry.max],
                el.table))

            it('Отображение в таблице "Нет данных для отображения."', async () => await dec.simpleText(el.rowEmpty.getText,
                [entry.max],
                'Нет данных для отображения.',
                el.rowEmpty))

            it('Удаление Local Storage', async () => await dec.simple(page.base.clearLocalStorage,
                [],
                page.base))
        })

    })

    oth.rebase()
})

//Проверка количества страниц и переключения страниц
const footer = () => describe('Проверка настройки отображений записей и перехода по страницам.', () => {

    const params = [...Array(100).keys()].map(item => {
        return {
            name: 'Position ' + (item + 1),
            comment: 'Description ' + (item + 1),
        }
    })

    describe('Предварительные действия.', () => {

        bef()

        aft()

        it('Добавление 100 должностей api методом', async () => {
            const cook = await page.base.getCookie('token')

            await dec.simple(api.putArrayPosition,
                [params, cook.text],
                api.putManyPosition)
        })
    })

    describe('Выполнение тестов.', () => {
        oth.footer('Должности', 'Position', 1, 1, bef, aft)
    })

    oth.rebase()

})

//Проверка сортировки по столбцам
const sort = () => describe('Проверка сортировки столбцов.', () => {

    const params = {
        sort: ['0', '01', '1', '10', 'a', 'ab', 'ac', 'z', 'а', 'аб', 'ав', 'я'],
    }

    describe('Предварительные действия.', () => {

        bef()

        aft()

        it('Добавление api методом должностей', async () => {
            const array = params.sort.map(item => {return {name: item, comment: item}})
            const token = await page.base.getCookie('token')

            await dec.simple(api.putArrayPosition,
                [array, token.text],
                api.putArrayPosition)
        })

    })

    describe('Выполнение тестов.', () => {

        bef()

        aft()

        describe('Проверка столбца "Должности"', () => {

            describe('Сортировка по возрастанию', () => {

                it('Нажатие по заглавию столбца', async () => await dec.simple(el.table.headHandler,
                    ['Должности', 1, entry.max],
                    el.table))

                it('Столбец отсортирован по возрастанию', async () => await dec.simple(el.table.headSortAsc,
                    ['Должности', 1, entry.max],
                    el.table))

                it('Отсуствиие анимаций', async () => await dec.animation())

                it('Проверка строк', async () => {
                    const promises = params.sort.sort().map((item, index ) => dec.simpleText(el.table.cellGetText,
                        ['Должности', index + 1, 1, entry.max],
                        item,
                        el.table))
                    await Promise.all(promises)
                })

            })

            describe('Сортировка по убываниию', () => {
                it('Нажатие по заглавию столбца', async () => await dec.simple(el.table.headHandler,
                    ['Должности', 1, entry.max],
                    el.table))
                it('Столбец отсортирован по убыванию', async () => await dec.simple(el.table.headSortDesc,
                    ['Должности', 1, entry.max],
                    el.table))
                it('Отсуствиие анимаций', async () => await dec.animation())
                it('Проверка строк', async () => {
                    const promises = params.sort.sort().reverse().map((item, index) => dec.simpleText(el.table.cellGetText,
                        ['Должности', index + 1, 1, entry.max],
                        item,
                        el.table))
                    await Promise.all(promises)
                })
                it('Удаление данных из LocalStorage', async () => await dec.simple(page.base.clearLocalStorage,
                    [],
                    page.base))
            })

        })

        describe('Проверка столбца "Описание"', () => {

            describe('Сортировка по возрастанию', () => {

                it('Нажатие по заглавию столбца', async () => await dec.simple(el.table.headHandler,
                    ['Описание', 2, entry.max],
                    el.table))

                it('Столбец отсортирован по возрастанию', async () => await dec.simple(el.table.headSortAsc,
                    ['Описание', 2, entry.max],
                    el.table))

                it('Отсуствиие анимаций', async () => await dec.animation())

                it('Проверка строк', async () => {
                    const promises = params.sort.sort().map((item, index ) => dec.simpleText(el.table.cellGetText,
                        ['Описание', index + 1, 2, entry.max],
                        item,
                        el.table))
                    await Promise.all(promises)
                })

            })

            describe('Сортировка по убываниию', () => {
                it('Нажатие по заглавию столбца', async () => await dec.simple(el.table.headHandler,
                    ['Описание', 2, entry.max],
                    el.table))
                it('Столбец отсортирован по убыванию', async () => await dec.simple(el.table.headSortDesc,
                    ['Описание', 2, entry.max],
                    el.table))
                it('Отсуствиие анимаций', async () => await dec.animation())
                it('Проверка строк', async () => {
                    const promises = params.sort.sort().reverse().map((item, index ) => dec.simpleText(el.table.cellGetText,
                        ['Описание', index + 1, 2, entry.max],
                        item,
                        el.table))
                    await Promise.all(promises)
                })
                it('Удаление данных из LocalStorage', async () => await dec.simple(page.base.clearLocalStorage,
                    [],
                    page.base))
            })

        })
    })

    oth.rebase()
});

//Проверка фильтра "Поиск..."
const filterSearch = () => describe('Проверка фильтра "Поиск...".', () =>  {

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

    describe('Предварительные действия.', () => {

        describe('Добавление api методом должностей', () => {
            bef()

            aft()

            it('Добавление', async () => {
                const token = await page.base.getCookie('token')

                await dec.simple(api.putArrayPosition,
                    [params.search, token.text],
                    api.putArrayPosition())
            })

            })
    })

    describe('Выполнение тестов.', () => {

        bef()

        aft()

        describe('Поиск по столбцу "Должности"', () => {

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
    })

    oth.rebase()

})

//Проверка экспорта
const exportFiles = () => describe('Проверка экспорта.', () => {

    const params = {
        xlsx: 'position.xlsx',
        csv: 'position.csv',
        header: 'header',
        fileName: 'SeleniumTestFile',
        one: {
            name: 'SeleniumPositionImportXLSXNameOne',
            comment: 'SeleniumPositionImportXLSXDescriptionOne',
        },
        file1: [
            { 'Должность': 'SeleniumPositionImportXLSXNameOne', 'Описание': 'SeleniumPositionImportXLSXDescriptionOne' }
        ],
        file2: [
            { 'Отчет "Должности"': 'Должность', __EMPTY: 'Описание' },
            {
                'Отчет "Должности"': 'SeleniumPositionImportXLSXNameOne',
                __EMPTY: 'SeleniumPositionImportXLSXDescriptionOne'
            }
        ],
        file3: [
            { header: 'Должность', __EMPTY: 'Описание' },
            {
                header: 'SeleniumPositionImportXLSXNameOne',
                __EMPTY: 'SeleniumPositionImportXLSXDescriptionOne'
            },
        ],
        file4: [
            {
                'Должность': 'SeleniumPositionImportXLSXNameOne',
                'Описание': 'SeleniumPositionImportXLSXDescriptionOne'
            }
        ],
        file5: [
            {
                'Должность': 'SeleniumPositionImportXLSXNameOne',
                'Описание': 'SeleniumPositionImportXLSXDescriptionOne'
            },
        ],
        file6: [
            {
                'Должность': 'SeleniumPositionImportXLSXNameOne',
                'Описание': 'SeleniumPositionImportXLSXDescriptionOne'
            }
        ],
    }

    describe('Предварительные действия.', () => {

        bef()

        aft()

        it('Добавление должностей api методом', async () => {
            const cook = await page.base.getCookie('token')
            const array = [params.one]

            await dec.simple(api.putArrayPosition,
                [array, cook.text],
                api.putManyPosition)
        })

    })

    describe('Выполнение тестов.', () => {

        describe('Экспорт должностей в xlsx файл. Без заголовка. Системное имя файла.', () => {

            bef()

            aft()

            describe('Экспорт', () => {

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

                it('Удаление Local Storage', async () => await dec.simple(page.base.clearLocalStorage,
                    [],
                    page.base))
            })

            describe('Проверка файла', () => {

                it('Отображение файла', async () => await dec.simple(el.file.display,
                    [params.xlsx, entry.upload],
                    el.file))

                it('Проверка строк файла', async () => {
                    const jsonFile = await el.file.readNum(params.xlsx)
                    await dec.exportFile(params.file1, jsonFile)
                })

                it('Удаление файла', async () => await dec.simple(el.file.delete,
                    [params.xlsx, entry.upload],
                    el.file))
            })
        })

        describe('Экспорт должностей в xlsx файл. C заголовком. Системное имя файла.', () => {

            bef()

            aft()

            describe('Экспорт', () => {

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

                it('Удаление Local Storage', async () => await dec.simple(page.base.clearLocalStorage,
                    [],
                    page.base))
            })

            describe('Проверка файла', () => {

                it('Отображение файла', async () => await dec.simple(el.file.display,
                    [params.xlsx, entry.upload],
                    el.file))

                it('Проверка строк файла', async () => {
                    const jsonFile = await el.file.readNum(params.xlsx)
                    dec.exportFile(params.file2, jsonFile)
                })

                it('Удаление файла', async () => await dec.simple(el.file.delete,
                    [params.xlsx, entry.upload],
                    el.file))
            })
        })

        describe('Экспорт должностей в xlsx файл. Свой заголовок. Системное имя файла.', () => {

            bef()

            aft()

            describe('Экспорт', () => {

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

                it('Удаление Local Storage', async () => await dec.simple(page.base.clearLocalStorage,
                    [],
                    page.base))
            })

            describe('Проверка файла', () => {

                it('Отображение файла', async () => await dec.simple(el.file.display,
                    [params.xlsx, entry.upload],
                    el.file))

                it('Проверка строк файла', async () => {
                    const jsonFile = await el.file.readNum(params.xlsx)
                    await dec.exportFile(params.file3, jsonFile)
                })

                it('Удаление файла', async () => await dec.simple(el.file.delete,
                    [params.xlsx,  entry.upload],
                    el.file))
            })

        })

        describe('Экспорт должностей в xlsx файл. Без заголовка. Собственное имя.', () => {

            bef()

            aft()

            describe('Экспорт', () => {

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

                it('Удаление Local Storage', async () => await dec.simple(page.base.clearLocalStorage,
                    [],
                    page.base))
            })

            describe('Проверка файла', () => {

                it('Отображение файла', async () => await dec.simple(el.file.display,
                    [params.fileName + '.xlsx', entry.upload],
                    el.file))

                it('Проверка строк файла', async () => {
                    const jsonFile = await el.file.readNum(params.fileName + '.xlsx')
                    await dec.exportFile(params.file1, jsonFile)
                })

                it('Удаление файла', async () => await dec.simple(el.file.delete,
                    [params.fileName + '.xlsx', entry.upload],
                    el.file))
            })
        })

        describe('Экспорт должностей в xlsx файл. C заголовком. Собственное имя.', () => {

            bef()

            aft()

            describe('Экспорт', () => {

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

                it('Удаление Local Storage', async () => await dec.simple(page.base.clearLocalStorage,
                    [],
                    page.base))
            })

            describe('Проверка файла', () => {

                it('Отображение файла', async () => await dec.simple(el.file.display,
                    [params.fileName + '.xlsx', entry.upload],
                    el.file))

                it('Проверка строк файла', async () => {
                    const jsonFile = await el.file.readNum(params.fileName + '.xlsx')
                    await dec.exportFile(params.file2, jsonFile)
                })

                it('Удаление файла', async () => await dec.simple(el.file.delete,
                    [params.fileName + '.xlsx', entry.upload],
                    el.file))
            })
        })

        describe('Экспорт должностей в xlsx файл. Свой заголовок. Собственное имя.', () => {

            bef()

            aft()

            describe('Экспорт', () => {

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

                it('Удаление Local Storage', async () => await dec.simple(page.base.clearLocalStorage,
                    [],
                    page.base))
            })

            describe('Проверка файла', () => {

                it('Отображение файла', async () => await dec.simple(el.file.display,
                    [params.fileName + '.xlsx', entry.upload],
                    el.file))

                it('Проверка строк файла', async () => {
                    const jsonFile = await el.file.readNum(params.fileName + '.xlsx')
                    await dec.exportFile(params.file3, jsonFile)
                })

                it('Удаление файла', async () => await dec.simple(el.file.delete,
                    [params.fileName + '.xlsx',  entry.upload],
                    el.file))
            })

        })

        describe('Экспорт должностей в csv файл. Системное имя файла.', () => {

            bef()

            aft()

            describe('Экспорт', () => {

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

                it('Удаление Local Storage', async () => await dec.simple(page.base.clearLocalStorage,
                    [],
                    page.base))
            })

            describe('Проверка файла', () => {

                it('Отображение файла', async () => await dec.simple(el.file.display,
                    [params.csv, entry.upload],
                    el.file))

                it('Проверка строк файла', async () => {
                    const jsonFile = await el.file.readNum(params.csv)
                    dec.exportFile(params.file5, jsonFile)
                })

                it('Удаление файла', async () => await dec.simple(el.file.delete,
                    [params.csv, entry.upload],
                    el.file))
            })
        })

        describe('Экспорт должностей в csv файл. Собственное имя.', () => {

            bef()

            aft()

            describe('Экспорт', () => {

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

                it('Удаление Local Storage', async () => await dec.simple(page.base.clearLocalStorage,
                    [],
                    page.base))
            })

            describe('Проверка файла', () => {

                it('Отображение файла', async () => await dec.simple(el.file.display,
                    [params.fileName + '.csv', entry.upload],
                    el.file))

                it('Проверка строк файла', async () => {
                    const jsonFile = await el.file.readNum(params.fileName + '.csv')
                    console.log(jsonFile)
                    dec.exportFile(params.file6, jsonFile)
                })

                it('Удаление файла', async () => await dec.simple(el.file.delete,
                    [params.fileName + '.csv', entry.upload],
                    el.file))
            })
        })
    })

    oth.rebase()

})

//Проверка импорта
const importFiles = () => describe('Проверка импорта.', () => {

    describe('Выполнение тестов.', () => {

        describe('Положительный импорт должностей', () => {

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

            describe('Импорт должностей из xlsx файла.', () => {

                describe('Импорт', () => {

                    bef()

                    aft()

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
                        el.modal.importData)
                    )

                    it('Нажатие кнопки "Готово"', async () => await dec.simple(el.button.handler,
                        ['Готово', entry.max],
                        el.button))
                })

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
                })

                oth.rebase()

            })

            describe('Импорт должностей из xls файла.', () => {

                describe('Импорт', () => {

                    bef()

                    aft()

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
                        el.modal.importData)
                    )

                    it('Нажатие кнопки "Готово"', async () => await dec.simple(el.button.handler,
                        ['Готово', entry.max],
                        el.button))
                })

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
                })

                oth.rebase()

            })

        })

        describe('Отрицательный импорт должностей', () => {

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

            describe('Импорт должностей из xlsx файла.', () => {

                describe('Импорт без экспорта файла с ошибками', () => {

                    describe('Импорт', () => {

                        before('Вход и открытие подраздела "Должности"', async () => {
                            await dec.auth(entry.customLogin, entry.customPassword)
                            await dec.simple(el.section.handler, [sec.per, entry.max], el.section)
                            await dec.simple(el.subsection.handler, [sub.per.position, entry.max], el.subsection)
                            await dec.simple(page.position.init, [entry.max], page.position)
                        })

                        after('Выход', async () => await dec.exit())

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
                            el.modal.importData)
                        )

                        it('Нажатие кнопки "Отмена"', async () => await dec.simple(el.modal.importData.buttonHandler,
                            ['Отмена', entry.max],
                            el.modal.importData))

                        it('Отсутствие модального окна "Импорт"', async () => await dec.simple(el.modal.importData.initClose,
                            [entry.max],
                            el.modal.importData))
                    })

                    describe('Проверка таблицы', () => {

                        before('Вход и открытие подраздела "Должности"', async () => {
                            await dec.auth(entry.customLogin, entry.customPassword)
                            await dec.simple(el.section.handler, [sec.per, entry.max], el.section)
                            await dec.simple(el.subsection.handler, [sub.per.position, entry.max], el.subsection)
                            await dec.simple(page.position.init, [entry.max], page.position)
                        })

                        after('Выход', async () => await dec.exit())

                        it('Отсутствие строк в таблице', async () => await dec.simple(el.table.noStr,
                            [entry.max],
                            el.table))
                    })
                })

                describe('Импорт c экспортом файла с ошибками', () => {

                    describe('Импорт', () => {

                        before('Вход и открытие подраздела "Должности"', async () => {
                            await dec.auth(entry.customLogin, entry.customPassword)
                            await dec.simple(el.section.handler, [sec.per, entry.max], el.section)
                            await dec.simple(el.subsection.handler, [sub.per.position, entry.max], el.subsection)
                            await dec.simple(page.position.init, [entry.max], page.position)
                        })

                        after('Выход', async () => await dec.exit())

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
                            el.modal.importData)
                        )

                        it('Нажатие кнопки "Далее"', async () => await dec.simple(el.button.handler,
                            ['Экспорт остатка в файл', entry.max],
                            el.button))

                        it('Отсутствие модального окна "Импорт"', async () => await dec.simple(el.modal.importData.initClose,
                            [entry.upload],
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
                    })

                    describe('Проверка таблицы', () => {

                        before('Вход и открытие подраздела "Должности"', async () => {
                            await dec.auth(entry.customLogin, entry.customPassword)
                            await dec.simple(el.section.handler, [sec.per, entry.max], el.section)
                            await dec.simple(el.subsection.handler, [sub.per.position, entry.max], el.subsection)
                            await dec.simple(page.position.init, [entry.max], page.position)
                        })

                        after('Выход', async () => await dec.exit())

                        it('Отсутствие строк в таблице', async () => await dec.simple(el.table.noStr,
                            [entry.max],
                            el.table))
                    })

                })

            })

            describe('Импорт должностей из xls файла.', () => {

                describe('Импорт без экспорта файла с ошибками', () => {

                    describe('Импорт', () => {

                        before('Вход и открытие подраздела "Должности"', async () => {
                            await dec.auth(entry.customLogin, entry.customPassword)
                            await dec.simple(el.section.handler, [sec.per, entry.max], el.section)
                            await dec.simple(el.subsection.handler, [sub.per.position, entry.max], el.subsection)
                            await dec.simple(page.position.init, [entry.max], page.position)
                        })

                        after('Выход', async () => await dec.exit())

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
                            [imp.position.importXLSFailed, entry.upload],
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
                            el.modal.importData)
                        )

                        it('Нажатие кнопки "Отмена"', async () => await dec.simple(el.modal.importData.buttonHandler,
                            ['Отмена', entry.max],
                            el.modal.importData))

                        it('Отсутствие модального окна "Импорт"', async () => await dec.simple(el.modal.importData.initClose,
                            [entry.upload],
                            el.modal.importData))
                    })

                    describe('Проверка таблицы', () => {

                        before('Вход и открытие подраздела "Должности"', async () => {
                            await dec.auth(entry.customLogin, entry.customPassword)
                            await dec.simple(el.section.handler, [sec.per, entry.max], el.section)
                            await dec.simple(el.subsection.handler, [sub.per.position, entry.max], el.subsection)
                            await dec.simple(page.position.init, [entry.max], page.position)
                        })

                        after('Выход', async () => await dec.exit())

                        it('Отсутствие строк в таблице', async () => await dec.simple(el.table.noStr,
                            [entry.max],
                            el.table))
                    })
                })

                describe('Импорт c экспортом файла с ошибками', () => {

                    describe('Импорт', () => {

                        before('Вход и открытие подраздела "Должности"', async () => {
                            await dec.auth(entry.customLogin, entry.customPassword)
                            await dec.simple(el.section.handler, [sec.per, entry.max], el.section)
                            await dec.simple(el.subsection.handler, [sub.per.position, entry.max], el.subsection)
                            await dec.simple(page.position.init, [entry.max], page.position)
                        })

                        after('Выход', async () => await dec.exit())

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
                            [imp.position.importXLSFailed, entry.upload],
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
                            el.modal.importData)
                        )

                        it('Нажатие кнопки "Далее"', async () => await dec.simple(el.button.handler,
                            ['Экспорт остатка в файл', entry.max],
                            el.button))

                        it('Отсутствие модального окна "Импорт"', async () => await dec.simple(el.modal.importData.initClose,
                            [entry.upload],
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
                    })

                    describe('Проверка таблицы', () => {

                        before('Вход и открытие подраздела "Должности"', async () => {
                            await dec.auth(entry.customLogin, entry.customPassword)
                            await dec.simple(el.section.handler, [sec.per, entry.max], el.section)
                            await dec.simple(el.subsection.handler, [sub.per.position, entry.max], el.subsection)
                            await dec.simple(page.position.init, [entry.max], page.position)
                        })

                        after('Выход', async () => await dec.exit())

                        it('Отсутствие строк в таблице', async () => await dec.simple(el.table.noStr,
                            [entry.max],
                            el.table))
                    })


                })

            })
        })

        describe('Частично положительный импорт должностей', () => {

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

            describe('Импорт должностей из xlsx файла.', () => {

                describe('Импорт без экспорта файла с ошибками', () => {

                    describe('Импорт', () => {

                        before('Вход и открытие подраздела "Должности"', async () => {
                            await dec.auth(entry.customLogin, entry.customPassword)
                            await dec.simple(el.section.handler, [sec.per, entry.max], el.section)
                            await dec.simple(el.subsection.handler, [sub.per.position, entry.max], el.subsection)
                            await dec.simple(page.position.init, [entry.max], page.position)
                        })

                        after('Выход', async () => await dec.exit())

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
                            el.modal.importData)
                        )

                        it('Нажатие кнопки "Отмена"', async () => await dec.simple(el.modal.importData.buttonHandler,
                            ['Отмена', entry.max],
                            el.modal.importData))

                        it('Отсутствие модального окна "Импорт"', async () => await dec.simple(el.modal.importData.initClose,
                            [entry.upload],
                            el.modal.importData))
                    })

                    describe('Проверка таблицы', () => {

                        before('Вход и открытие подраздела "Должности"', async () => {
                            await dec.auth(entry.customLogin, entry.customPassword)
                            await dec.simple(el.section.handler, [sec.per, entry.max], el.section)
                            await dec.simple(el.subsection.handler, [sub.per.position, entry.max], el.subsection)
                            await dec.simple(page.position.init, [entry.max], page.position)
                        })

                        after('Выход', async () => await dec.exit())

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

                    oth.rebase()
                })

                describe('Импорт c экспортом файла с ошибками', () => {

                    describe('Импорт', () => {

                        before('Вход и открытие подраздела "Должности"', async () => {
                            await dec.auth(entry.customLogin, entry.customPassword)
                            await dec.simple(el.section.handler, [sec.per, entry.max], el.section)
                            await dec.simple(el.subsection.handler, [sub.per.position, entry.max], el.subsection)
                            await dec.simple(page.position.init, [entry.max], page.position)
                        })

                        after('Выход', async () => await dec.exit())

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
                            el.modal.importData)
                        )

                        it('Нажатие кнопки "Далее"', async () => await dec.simple(el.button.handler,
                            ['Экспорт остатка в файл', entry.max],
                            el.button))

                        it('Отсутствие модального окна "Импорт"', async () => await dec.simple(el.modal.importData.initClose,
                            [entry.upload],
                            el.modal.importData))
                    })

                    describe('Проверка таблицы', () => {

                        before('Вход и открытие подраздела "Должности"', async () => {
                            await dec.auth(entry.customLogin, entry.customPassword)
                            await dec.simple(el.section.handler, [sec.per, entry.max], el.section)
                            await dec.simple(el.subsection.handler, [sub.per.position, entry.max], el.subsection)
                            await dec.simple(page.position.init, [entry.max], page.position)
                        })

                        after('Выход', async () => await dec.exit())

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
                    })

                    oth.rebase()
                })

            })

            describe('Импорт должностей из xls файла.', () => {

                describe('Импорт без экспорта файла с ошибками', () => {

                    describe('Импорт', () => {

                        before('Вход и открытие подраздела "Должности"', async () => {
                            await dec.auth(entry.customLogin, entry.customPassword)
                            await dec.simple(el.section.handler, [sec.per, entry.max], el.section)
                            await dec.simple(el.subsection.handler, [sub.per.position, entry.max], el.subsection)
                            await dec.simple(page.position.init, [entry.max], page.position)
                        })

                        after('Выход', async () => await dec.exit())

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
                            [entry.upload],
                            el.modal.importData))

                        it('Выбор тестового файла', async () => await dec.simple(el.modal.importData.sendKeys,
                            [imp.position.importXLSPartlySuccess, entry.upload],
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
                            el.modal.importData)
                        )

                        it('Нажатие кнопки "Отмена"', async () => await dec.simple(el.modal.importData.buttonHandler,
                            ['Отмена', entry.max],
                            el.modal.importData))

                        it('Отсутствие модального окна "Импорт"', async () => await dec.simple(el.modal.importData.initClose,
                            [entry.upload],
                            el.modal.importData))
                    })

                    describe('Проверка таблицы', () => {

                        before('Вход и открытие подраздела "Должности"', async () => {
                            await dec.auth(entry.customLogin, entry.customPassword)
                            await dec.simple(el.section.handler, [sec.per, entry.max], el.section)
                            await dec.simple(el.subsection.handler, [sub.per.position, entry.max], el.subsection)
                            await dec.simple(page.position.init, [entry.max], page.position)
                        })

                        after('Выход', async () => await dec.exit())

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

                    oth.rebase()
                })

                describe('Импорт c экспортом файла с ошибками', () => {

                    describe('Импорт', () => {

                        before('Вход и открытие подраздела "Должности"', async () => {
                            await dec.auth(entry.customLogin, entry.customPassword)
                            await dec.simple(el.section.handler, [sec.per, entry.max], el.section)
                            await dec.simple(el.subsection.handler, [sub.per.position, entry.max], el.subsection)
                            await dec.simple(page.position.init, [entry.max], page.position)
                        })

                        after('Выход', async () => await dec.exit())

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
                            [entry.upload],
                            el.modal.importData))

                        it('Выбор тестового файла', async () => await dec.simple(el.modal.importData.sendKeys,
                            [imp.position.importXLSPartlySuccess, entry.upload],
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
                            el.modal.importData)
                        )

                        it('Нажатие кнопки "Далее"', async () => await dec.simple(el.button.handler,
                            ['Экспорт остатка в файл', entry.max],
                            el.button))

                        it('Отсутствие модального окна "Импорт"', async () => await dec.simple(el.modal.importData.initClose,
                            [entry.upload],
                            el.modal.importData))
                    })

                    describe('Проверка таблицы', () => {

                        before('Вход и открытие подраздела "Должности"', async () => {
                            await dec.auth(entry.customLogin, entry.customPassword)
                            await dec.simple(el.section.handler, [sec.per, entry.max], el.section)
                            await dec.simple(el.subsection.handler, [sub.per.position, entry.max], el.subsection)
                            await dec.simple(page.position.init, [entry.max], page.position)
                        })

                        after('Выход', async () => await dec.exit())

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
                    })

                    oth.rebase()
                })

            })
        })

    })

})

//Проверка печати
const print = () => describe('Проверка печати.', () => {

    const params = {
        one: {
            name: 'SeleniumPositionPrintNameOne',
            comment: 'SeleniumPositionPrintDescriptionOne',
        },
    }

    describe('Предварительные действия.', () => {

        bef()

        aft()

        it('Добавление должностей api методом', async () => {
            const cook = await page.base.getCookie('token')
            const array = [params.one]

            await dec.simple(api.putArrayPosition,
                [array, cook.text],
                api.putManyPosition)
        })
    })

    describe('Выполнение тестов.', () => {

        before('Вход и открытие подраздела "Должности"', async () => {
            await dec.auth(entry.customLogin, entry.customPassword)
            await dec.simple(el.section.handler, [sec.per, entry.max], el.section)
            await dec.simple(el.subsection.handler, [sub.per.position, entry.max], el.subsection)
            await dec.simple(page.position.init, [entry.max], page.position)
        })

        after('Выход', async () => await dec.exit())

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

    oth.rebase()
})

//Тестирование всего подраздела "Должности"
const main = () => describe('Проверка подраздела "Должности".', () => {
    display()
    add()
    edit()
    remove()
    footer()
    sort()
    filterSearch()
    print()
    exportFiles()
    importFiles()
})

module.exports = {
    main,
    display,
    exportFiles,
    importFiles,
    print,
    add,
    edit,
    remove,
    footer,
    filterSearch,
    sort,
}
