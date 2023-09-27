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

const bef = () => before('Вход и открытие подраздела "Подразделения"', async () => {
    await dec.auth(entry.customLogin, entry.customPassword);
    await dec.simple(el.section.handler, [sec.per, entry.max], el.section);
    await dec.simple(el.subsection.handler, [sub.per.division, entry.max], el.subsection);
    await dec.simple(page.division.init, [entry.max], page.division);
});

const aft = () => after('Выход', async () => await dec.exit());

//api добавление подразделения
const addDivision = (obj) => it('Добавление подразделения', async () => {
    const cook = await page.base.getCookie('token');
    await dec.simple(api.putDivision,
        [[obj], cook.text],
        api.putDivision);
});

// api добавление шаблона доступа
const addAccessTemplate = (name, description) => it('Добавление шаблона доступа', async () => {
    const cook = await page.base.getCookie('token');
    const obj ={
        name: name,
        comment: description,
        access: [
            {
                access_zone_id: 1,
                template_type: 0,
                rights: {
                    schedule_type_id: 1,
                    schedule_id: 1,
                    right_type: 1,
                    commission_type: 0,
                    is_guard: 0,
                    is_verify: 0,
                    is_antipass: 0,
                    commission_group_1: 0,
                    commission_group_2: 0,
                    verify_po_schedule: 0,
                    verify_vvu_schedule: 0,
                    verify_pdu_schedule: 0,
                    verify_alcobarier_schedule: 0
                }
            }
        ]
    };
    await dec.simple(api.putAccessTemplate,
        [[obj], cook.text],
        api.putAccessTemplate);
});

// api добавление сотрудника
const addStaff = (lastName, firstName, middleName, divisionId, date) => it('Добавление сотрудника', async () => {
    const cook = await page.base.getCookie('token');
    const obj = {
        "last_name": lastName,
        "first_name": firstName,
        "middle_name": middleName,
        "division": divisionId,
        "hiring_date": date,
    };
    await dec.simple(api.putStaff,
        [[obj], cook.text],
        api.putStaff);
});

// api добавление графика работы
const addSchedule = (name, description) => it('Добавление графика работы', async () => {
    const cook = await page.base.getCookie('token');
    const obj = {
        "name": name,
        "work_schedule_type_id": 4,
        "comment": description
    };
    await dec.simple(api.putSchedule,
        [[obj], cook.text],
        api.putSchedule);
});

// api удаление тестовых данных
const deleteParams = () => describe('Удаление тестовых данных', () => {

    aft();
    bef();

    deleteData.deleteAccess();
    deleteData.deleteSchedule();
    deleteData.deleteStaff();
    deleteData.deleteVisitor();
    deleteData.deleteDivision();

});

//Отображение первичное
const display = () => describe(`Отображение страницы "Подразделения".`, () => {

    bef();
    aft();

    it('Отображение "title", "url"', async () => await dec.simple(page.division.init,
        [entry.max],
        page.division));

    it('Отображение раздела "Персонал" - активен', async () => await dec.simple(el.section.active,
        [sec.per, entry.max],
        el.section));

    it('Отображение подраздела "Подразделения" - активен', async () => await dec.simple(el.subsection.active,
        [sub.per.division, entry.max],
        el.section));

    it('Отображение "Персонал" в заглавие навигации', async () => await dec.simpleText(el.subsection.headerGetText,
        [entry.max],
        'ПЕРСОНАЛ',
        el.subsection));

    it('Отображение "Подразделения" в заглавие', async () => await dec.simpleText(el.header.getText,
        [entry.max],
        'Подразделения',
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

    it('Отображение кнопки "Меню" - активна', async () => await dec.simple(el.butIcBefore.active,
        [but.menu, entry.max],
        el.butIcBefore));

    it('Отображение фильтра "Поиск..."', async () => await dec.simple(el.input.input,
        ['', 'Поиск...', entry.max],
        el.input));

    it('Нажатие кнопки "Меню"', async () => await dec.simple(el.butIcBefore.handler,
        [but.menu, entry.max],
        el.butIcBefore));

    it('Отображение "Меню"', async () => await dec.simple(el.menu.menu,
        [entry.max],
        el.menu));

    it('Отображение "Печать таблицы" - активна', async () => await dec.simple(el.menu.itemActive,
        ['Печать таблицы', entry.max],
        el.menu));

    it('Отображение "Печать дерева" - активна', async () => await dec.simple(el.menu.itemActive,
        ['Печать дерева', entry.max],
        el.menu));

    it('Отображение "Экспорт" - активна', async () => await dec.simple(el.menu.itemActive,
        ['Экспорт', entry.max],
        el.menu));

    it('Отображение "Импорт из XLS, XLSX" - активна', async () => await dec.simple(el.menu.itemActive,
        ['Импорт из XLS, XLSX', entry.max],
        el.menu));

    it('Отображение подразделения "Администраторы системы"', async ()=> await dec.simple(page.division.division,
        [[ "Администраторы системы"], entry.max],
        page.division));
});

// Тесты добавления
const add = () => {

    // Добавление родительского и дочернего подразделения с минимальным количеством параметров.
    const addMinParams = () => describe('Подразделение. Добавление. Добавление подраздления 1 уровня и подразделения '+
        '2 уровня с минимальным количеством параметров.', () => {

        const params = {
            name1: 'addMinParamsName1',
            name2: 'addMinParamsName2',
        };

        describe('Проверка списка подразделений', () => {

            bef();
            aft();

            it('Отображние 1 подраздление', async () => await dec.simple(page.division.size,
                [1, entry.max],
                page.division));

            it('Отображение подразделения "Администраторы системы"', async ()=> await dec.simple(page.division.division,
                [[ "Администраторы системы"], entry.max],
                page.division));

        });

        describe('Добавление подразделений', () => {
            bef();
            aft();

            describe('Добавление подразделения 1 уровня', () => {

                it('Нажатие кноки "Добавить"', async () => await dec.simple(el.butIcBefore.handler,
                    [but.add, entry.max],
                    el.butIcBefore));

                it('Отображение модального окна "Добавить подразделение"',
                    async () => await  dec.simple(el.modal.divisionAdd.init,
                        [entry.max],
                        el.modal.divisionAdd));

                it('Ввод "Подразделение"', async () => await dec.simple(el.input.sendKeys,
                    ['Подразделение', '', params.name1, entry.max],
                    el.input));

                it('Нажатие кнопки "Сохранить"', async () => await dec.simple(el.button.handler,
                    ["Сохранить", entry.max],
                    el.button));

                it('Отображение сообщения "Подразделение успешно добавлено!"',
                    async () => await dec.simple(el.success.success,
                        ['Подразделение успешно добавлено!', entry.max],
                        el.success));

                it('Отсутствие модального окна "Добавить подразделение"',
                    async () => await  dec.simple(el.modal.divisionAdd.initClose,
                        [entry.max],
                        el.modal.divisionAdd));

                it('Отображенние добавленного подразделения', async () => await dec.simple(page.division.division,
                    [[params.name1], entry.max],
                    page.division));

            });

            describe('добавление подразделения 2 уровня', () => {

                it('Нажатие по подразделению 1 уровня', async () => await dec.simple(page.division.handler,
                    [[params.name1], entry.max],
                    page.division));

                it('Подразделение 1 уровня выделен', async () => await dec.simple(page.division.selected,
                    [params.name1, entry.max],
                    page.division));

                it('Нажатие кноки "Добавить"', async () => await dec.simple(el.butIcBefore.handler,
                    [but.add, entry.max],
                    el.butIcBefore));

                it('Отображение модального окна "Добавить подразделение"',
                    async () => await  dec.simple(el.modal.divisionAdd.init,
                        [entry.max],
                        el.modal.divisionAdd));

                it('Ввод "Подразделение"', async () => await dec.simple(el.input.sendKeys,
                    ['Подразделение', '', params.name2, entry.max],
                    el.input));

                it('Нажатие кнопки "Сохранить"', async () => await dec.simple(el.button.handler,
                    ["Сохранить", entry.max],
                    el.button));

                it('Отображение сообщения "Подразделение успешно добавлено!"',
                    async () => await dec.simple(el.success.success,
                        ['Подразделение успешно добавлено!', entry.max],
                        el.success));

                it('Отсутствие модального окна "Добавить подразделение"',
                    async () => await  dec.simple(el.modal.divisionAdd.initClose,
                        [entry.max],
                        el.modal.divisionAdd));

                it('Отображенние добавленного подразделения', async () => await dec.simple(page.division.division,
                    [[params.name1, params.name2], entry.max],
                    page.division));

            });
        });

        describe('Проверка отображения в разделе', () => {
            bef();
            aft();

            describe('Общие проверки', () => {

                it('Отображние 3 подраздлениий', async () => await dec.simple(page.division.size,
                    [3, entry.max],
                    page.division));
            });

            describe('Проверка подразделения 1 уровня', () => {

                it('Отображенние подразделения', async () => await dec.simple(page.division.division,
                    [[params.name1], entry.max],
                    page.division));

                it('Нажатие по подразделению', async () => await dec.simple(page.division.handler,
                    [[params.name1], entry.max],
                    page.division));

                it('Подразделение выделено', async () => await dec.simple(page.division.selected,
                    [params.name1, entry.max],
                    page.division));

                it('Проверка "Телефон"', async () => await dec.simpleText(el.input.getValue,
                    ['Телефон', '', entry.max],
                    '',
                    el.input));

                it('Проверка "Описание"', async () => await dec.simpleText(el.input.getValue,
                    ['Описание', '', entry.max],
                    '',
                    el.input));

                it('Проверка "Сопровождающий"', async () => await dec.simpleText(el.input.getValue,
                    ['Сопровождающий', '', entry.max],
                    '',
                    el.input));

                it('Проверка "Шаблон доступа для сотрудника"', async () => await dec.simpleText(el.input.getValue,
                    ['Шаблон доступа для сотрудника', '', entry.max],
                    '',
                    el.input));

                it('Проверка "Шаблон доступа для посетителя"', async () => await dec.simpleText(el.input.getValue,
                    ['Шаблон доступа для посетителя', '', entry.max],
                    '',
                    el.input));

                it('Проверка "График работы"', async () => await dec.simpleText(el.input.getValue,
                    ['График работы', '', entry.max],
                    '',
                    el.input));
            });

            describe('Проверка подразделения 2 уровня', () => {

                it('Отображенние подразделения', async () => await dec.simple(page.division.division,
                    [[params.name1, params.name2], entry.max],
                    page.division));

                it('Нажатие по подразделению', async () => await dec.simple(page.division.handler,
                    [[params.name1, params.name2], entry.max],
                    page.division));

                it('Подразделение выделено', async () => await dec.simple(page.division.selected,
                    [params.name2, entry.max],
                    page.division));

                it('Проверка "Телефон"', async () => await dec.simpleText(el.input.getValue,
                    ['Телефон', '', entry.max],
                    '',
                    el.input));

                it('Проверка "Описание"', async () => await dec.simpleText(el.input.getValue,
                    ['Описание', '', entry.max],
                    '',
                    el.input));

                it('Проверка "Сопровождающий"', async () => await dec.simpleText(el.input.getValue,
                    ['Сопровождающий', '', entry.max],
                    '',
                    el.input));

                it('Проверка "Шаблон доступа для сотрудника"', async () => await dec.simpleText(el.input.getValue,
                    ['Шаблон доступа для сотрудника', '', entry.max],
                    '',
                    el.input));

                it('Проверка "Шаблон доступа для посетителя"', async () => await dec.simpleText(el.input.getValue,
                    ['Шаблон доступа для посетителя', '', entry.max],
                    '',
                    el.input));

                it('Проверка "График работы"', async () => await dec.simpleText(el.input.getValue,
                    ['График работы', '', entry.max],
                    '',
                    el.input));
            });
        });

        describe('Проверка параметров', () => {

            bef();
            aft();

            describe('Проверка подразделения 1 уровня', () => {

                it('Отображенние подразделения', async () => await dec.simple(page.division.division,
                    [[params.name1], entry.max],
                    page.division));

                it('Нажатие по подразделению', async () => await dec.simple(page.division.handler,
                    [[params.name1], entry.max],
                    page.division));

                it('Подразделение выделено', async () => await dec.simple(page.division.selected,
                    [params.name1, entry.max],
                    page.division));

                it('Нажатие кноки "Редактировать"', async () => await dec.simple(el.butIcBefore.handler,
                    [but.edit, entry.max],
                    el.butIcBefore));

                it('Отображение модального окна "Редактировать подразделение"',
                    async () => await  dec.simple(el.modal.divisionEdit.init,
                        [entry.max],
                        el.modal.divisionEdit));

                it('Проверка "Подразделение"', async () => await dec.simpleText(el.input.getValue,
                    ['Подразделение', '', entry.max],
                    params.name1,
                    el.input));

                it('Проверка "Телефон"', async () => await dec.simpleText(el.modal.divisionEdit.inputGetValue,
                    ['Телефон', '', entry.max],
                    '',
                    el.modal.divisionEdit));

                it('Проверка "Описание"', async () => await dec.simpleText(el.modal.divisionEdit.inputGetValue,
                    ['Описание', '', entry.max],
                    '',
                    el.modal.divisionEdit));

                it('Проверка "Сопровождающий"', async () => await dec.simpleText(el.select.getText,
                    ['Сопровождающий', '', entry.max],
                    '',
                    el.input));

                it('Проверка "Шаблон доступа для сотрудника"', async () => await dec.simpleFalse(el.selectMulti.getText,
                    ['Шаблон доступа для сотрудника', 1, entry.min],
                    el.input));

                it('Проверка "Шаблон доступа для посетителя"', async () => await dec.simpleText(el.select.getText,
                    ['Шаблон доступа для посетителя', '', entry.max],
                    '',
                    el.input));

                it('Проверка "График работы"', async () => await dec.simpleText(el.select.getText,
                    ['График работы', '', entry.max],
                    '',
                    el.input));

                it('Нажатие кнопки закрытия модального окна',
                    async () => await dec.simple(el.modal.divisionEdit.closeHandler,
                        [entry.max],
                        el.modal.divisionEdit));

                it('Отсутствие модального окна "Редактировать подразделение"',
                    async () => await  dec.simple(el.modal.divisionEdit.initClose,
                        [entry.max],
                        el.modal.divisionEdit));

            });

            describe('Проверка подразделения 2 уровня', () => {

                it('Отображенние подразделения', async () => await dec.simple(page.division.division,
                    [[params.name1, params.name2], entry.max],
                    page.division));

                it('Нажатие по подразделению', async () => await dec.simple(page.division.handler,
                    [[params.name1, params.name2], entry.max],
                    page.division));

                it('Подразделение выделено', async () => await dec.simple(page.division.selected,
                    [params.name2, entry.max],
                    page.division));

                it('Нажатие кноки "Редактировать"', async () => await dec.simple(el.butIcBefore.handler,
                    [but.edit, entry.max],
                    el.butIcBefore));

                it('Отображение модального окна "Редактировать подразделение"',
                    async () => await  dec.simple(el.modal.divisionEdit.init,
                        [entry.max],
                        el.modal.divisionEdit));

                it('Проверка "Подразделение"', async () => await dec.simpleText(el.input.getValue,
                    ['Подразделение', '', entry.max],
                    params.name2,
                    el.input));

                it('Проверка "Телефон"', async () => await dec.simpleText(el.modal.divisionEdit.inputGetValue,
                    ['Телефон', '', entry.max],
                    '',
                    el.modal.divisionEdit));

                it('Проверка "Описание"', async () => await dec.simpleText(el.modal.divisionEdit.inputGetValue,
                    ['Описание', '', entry.max],
                    '',
                    el.modal.divisionEdit));

                it('Проверка "Сопровождающий"', async () => await dec.simpleText(el.select.getText,
                    ['Сопровождающий', '', entry.max],
                    '',
                    el.input));

                it('Проверка "Шаблон доступа для сотрудника"', async () => await dec.simpleFalse(el.selectMulti.getText,
                    ['Шаблон доступа для сотрудника', 1, entry.min],
                    el.input));

                it('Проверка "Шаблон доступа для посетителя"', async () => await dec.simpleText(el.select.getText,
                    ['Шаблон доступа для посетителя', '', entry.max],
                    '',
                    el.input));

                it('Проверка "График работы"', async () => await dec.simpleText(el.select.getText,
                    ['График работы', '', entry.max],
                    '',
                    el.input));

                it('Нажатие кнопки закрытия модального окна', async () => await dec.simple(el.modal.divisionEdit.closeHandler,
                    [entry.max],
                    el.modal.divisionEdit));

                it('Отсутствие модального окна "Редактировать подразделение"',
                    async () => await  dec.simple(el.modal.divisionEdit.initClose,
                        [entry.max],
                        el.modal.divisionEdit));
            });

        });

        deleteParams();

    });

    // Добавление родительского и дочернего подразделения с максимальным количеством параметров.
    const addMaxParams = () => describe('Подразделение. Добавление. Добавление подразделение 1 уровня и подразделение ' +
        '2 уровня с максимальным количеством параметров.', () => {

        const params = {
            division1: {
                name: 'addMaxParamsName1',
                phone: 'addMaxParamsPhone1',
                description: 'addMaxParamsDescription1',
                fio: {
                    lastName: 'staff',
                    firstName: '1',
                    middleName: '' ,
                    divisionId: 1,
                    date: '2001-01-01'
                },
                template1: 'template11',
                template2: 'template12',
                template3: 'template13',
                schedule: 'schedule1',
            },
            division2: {
                name: 'addMaxParamsName2',
                phone: 'addMaxParamsPhone2',
                description: 'addMaxParamsDescription2',
                fio: {
                    lastName: 'staff',
                    firstName: '2',
                    middleName: '' ,
                    divisionId: 1,
                    date: '2001-01-01'
                },
                template1: 'template21',
                template2: 'template22',
                template3: 'template23',
                schedule: 'schedule2',
            },
        };

        describe('API - добавление', () => {
            bef();
            aft();
            addAccessTemplate(params.division1.template1, '');
            addAccessTemplate(params.division1.template2, '');
            addAccessTemplate(params.division1.template3, '');
            addAccessTemplate(params.division2.template1, '');
            addAccessTemplate(params.division2.template2, '');
            addAccessTemplate(params.division2.template3, '');
            addSchedule(params.division1.schedule);
            addSchedule(params.division2.schedule);
            addStaff(...Object.values(params.division1.fio));
            addStaff(...Object.values(params.division2.fio));
        });

        describe('Проверка списка подразделений', () => {

            bef();
            aft();

            it('Отображние 1 подраздление', async () => await dec.simple(page.division.size,
                [1, entry.max],
                page.division));

            it('Отображение подразделения "Администраторы системы"', async ()=> await dec.simple(page.division.division,
                [[ "Администраторы системы"], entry.max],
                page.division));

        });

        describe('Добавление подразделений', () => {
            bef();
            aft();

            describe('Добавление подразделения 1 уровня', () => {

                it('Нажатие кноки "Добавить"', async () => await dec.simple(el.butIcBefore.handler,
                    [but.add, entry.max],
                    el.butIcBefore));

                it('Отображение модального окна "Добавить подразделение"',
                    async () => await  dec.simple(el.modal.divisionAdd.init,
                        [entry.max],
                        el.modal.divisionAdd));

                it('Ввод "Подразделение"', async () => await dec.simple(el.input.sendKeys,
                    ['Подразделение', '', params.division1.name, entry.max],
                    el.input));

                it('Ввод "Телефон"', async () => await dec.simple(el.input.sendKeys,
                    ['Телефон', '', params.division1.phone, entry.max],
                    el.input));

                it('Ввод "Описание"', async () => await dec.simple(el.input.sendKeys,
                    ['Описание', '', params.division1.description, entry.max],
                    el.input));

                it('Выбор "Сопровождающий"', async () => await dec.simple(el.select.iconXpand,
                    ['Сопровождающий', '',
                        `${params.division1.fio.lastName} ${params.division1.fio.firstName}`,
                        entry.max],
                    el.select));

                it('Выбор значение 1 в "Шаблон доступа для сотрудника"',
                    async () => await dec.simple(el.selectMulti.iconXpandSelected,
                        ['Шаблон доступа для сотрудника', params.division1.template1, entry.max],
                        el.selectMulti));

                it('Выбор значение 2 в "Шаблон доступа для сотрудника"',
                    async () => await dec.simple(el.selectMulti.iconXpandSelected,
                        ['Шаблон доступа для сотрудника', params.division1.template2, entry.max],
                        el.selectMulti));

                it('Выбор "Шаблон доступа для посетителя"', async () => await dec.simple(el.select.iconXpand,
                    ['Шаблон доступа для посетителя', '', params.division1.template3, entry.max],
                    el.select));

                it('Выбор "График работы"', async () => await dec.simple(el.select.iconXpand,
                    ['График работы', '', params.division1.schedule, entry.max],
                    el.select));

                it('Нажатие кнопки "Сохранить"', async () => await dec.simple(el.button.handler,
                    ["Сохранить", entry.max],
                    el.button));

                it('Отображение сообщения "Подразделение успешно добавлено!"',
                    async () => await dec.simple(el.success.success,
                        ['Подразделение успешно добавлено!', entry.max],
                        el.success));

                it('Отсутствие модального окна "Добавить подразделение"',
                    async () => await  dec.simple(el.modal.divisionAdd.initClose,
                        [entry.max],
                        el.modal.divisionAdd));

                it('Отображенние добавленного подразделения', async () => await dec.simple(page.division.division,
                    [[params.division1.name], entry.max],
                    page.division));

            });

            describe('добавление подразделения 2 уровня', () => {

                it('Нажатие по подразделению 1 уровня', async () => await dec.simple(page.division.handler,
                    [[params.division1.name], entry.max],
                    page.division));

                it('Подразделение 1 уровня выделен', async () => await dec.simple(page.division.selected,
                    [params.division1.name, entry.max],
                    page.division));

                it('Нажатие кноки "Добавить"', async () => await dec.simple(el.butIcBefore.handler,
                    [but.add, entry.max],
                    el.butIcBefore));

                it('Отображение модального окна "Добавить подразделение"',
                    async () => await  dec.simple(el.modal.divisionAdd.init,
                        [entry.max],
                        el.modal.divisionAdd));

                it('Ввод "Подразделение"', async () => await dec.simple(el.input.sendKeys,
                    ['Подразделение', '', params.division2.name, entry.max],
                    el.input));

                it('Ввод "Телефон"', async () => await dec.simple(el.modal.divisionAdd.inputSendKeys,
                    ['Телефон', '', params.division2.phone, entry.max],
                    el.modal.divisionAdd));

                it('Ввод "Описание"', async () => await dec.simple(el.modal.divisionAdd.inputSendKeys,
                    ['Описание', '', params.division2.description, entry.max],
                    el.modal.divisionAdd));

                it('Выбор "Сопровождающий"', async () => await dec.simple(el.select.iconXpand,
                    ['Сопровождающий', `${params.division1.fio.lastName} ${params.division1.fio.firstName}`,
                        `${params.division2.fio.lastName} ${params.division2.fio.firstName}`,
                        entry.max],
                    el.select));

                it('Удаление значение 2 в "Шаблон доступа для сотрудника"',
                    async () => await  dec.simple(el.selectMulti.delete,
                        ['Шаблон доступа для сотрудника', 2, entry.max],
                        el.selectMulti));

                it('Удаление значение 1 в "Шаблон доступа для сотрудника"',
                    async () => await  dec.simple(el.selectMulti.delete,
                        ['Шаблон доступа для сотрудника', 1, entry.max],
                        el.selectMulti));

                it('Выбор значение 1 в "Шаблон доступа для сотрудника"',
                    async () => await dec.simple(el.selectMulti.iconXpandSelected,
                        ['Шаблон доступа для сотрудника', params.division2.template1, entry.max],
                        el.selectMulti));

                it('Выбор значение 2 в "Шаблон доступа для сотрудника"',
                    async () => await dec.simple(el.selectMulti.iconXpandSelected,
                        ['Шаблон доступа для сотрудника', params.division2.template2, entry.max],
                        el.selectMulti));

                it('Выбор "Шаблон доступа для посетителя"', async () => await dec.simple(el.select.iconXpand,
                    ['Шаблон доступа для посетителя', params.division1.template3,
                        params.division2.template3, entry.max],
                    el.select));

                it('Выбор "График работы"', async () => await dec.simple(el.select.iconXpand,
                    ['График работы', params.division1.schedule, params.division2.schedule, entry.max],
                    el.select));

                it('Нажатие кнопки "Сохранить"', async () => await dec.simple(el.button.handler,
                    ["Сохранить", entry.max],
                    el.button));

                it('Отображение сообщения "Подразделение успешно добавлено!"',
                    async () => await dec.simple(el.success.success,
                        ['Подразделение успешно добавлено!', entry.max],
                        el.success));

                it('Отсутствие модального окна "Добавить подразделение"',
                    async () => await  dec.simple(el.modal.divisionAdd.initClose,
                        [entry.max],
                        el.modal.divisionAdd));

                it('Отображенние добавленного подразделения', async () => await dec.simple(page.division.division,
                    [[params.division1.name, params.division2.name], entry.max],
                    page.division));

            });
        });

        describe('Проверка отображения в разделе', () => {
            bef();
            aft();

            describe('Общие проверки', () => {

                it('Отображние 3 подраздлениий', async () => await dec.simple(page.division.size,
                    [3, entry.max],
                    page.division));

            });

            describe('Проверка подразделения 1 уровня', () => {

                it('Отображенние подразделения', async () => await dec.simple(page.division.division,
                    [[params.division1.name], entry.max],
                    page.division));

                it('Нажатие по подразделению', async () => await dec.simple(page.division.handler,
                    [[params.division1.name], entry.max],
                    page.division));

                it('Подразделение выделено', async () => await dec.simple(page.division.selected,
                    [params.division1.name, entry.max],
                    page.division));

                it('Проверка "Телефон"', async () => await dec.simpleText(el.input.getValue,
                    ['Телефон', '', entry.max],
                    params.division1.phone,
                    el.input));

                it('Проверка "Описание"', async () => await dec.simpleText(el.input.getValue,
                    ['Описание', '', entry.max],
                    params.division1.description,
                    el.input));

                it('Проверка "Сопровождающий"', async () => await dec.simpleText(el.input.getValue,
                    ['Сопровождающий', '', entry.max],
                    `${params.division1.fio.lastName} ${params.division1.fio.firstName}`,
                    el.input));

                it('Проверка "Шаблон доступа для сотрудника"', async () => await dec.simpleText(el.input.getValue,
                    ['Шаблон доступа для сотрудника', '', entry.max],
                    `${params.division1.template1}, ${params.division1.template2}`,
                    el.input));

                it('Проверка "Шаблон доступа для посетителя"', async () => await dec.simpleText(el.input.getValue,
                    ['Шаблон доступа для посетителя', '', entry.max],
                    `${params.division1.template3}`,
                    el.input));

                it('Проверка "График работы"', async () => await dec.simpleText(el.input.getValue,
                    ['График работы', '', entry.max],
                    `${params.division1.schedule}`,
                    el.input));
            });

            describe('Проверка подразделения 2 уровня', () => {

                it('Отображенние подразделения', async () => await dec.simple(page.division.division,
                    [[params.division1.name, params.division2.name], entry.max],
                    page.division));

                it('Нажатие по подразделению', async () => await dec.simple(page.division.handler,
                    [[params.division1.name, params.division2.name], entry.max],
                    page.division));

                it('Подразделение выделено', async () => await dec.simple(page.division.selected,
                    [params.division2.name, entry.max],
                    page.division));

                it('Проверка "Телефон"', async () => await dec.simpleText(el.input.getValue,
                    ['Телефон', '', entry.max],
                    params.division2.phone,
                    el.input));

                it('Проверка "Описание"', async () => await dec.simpleText(el.input.getValue,
                    ['Описание', '', entry.max],
                    params.division2.description,
                    el.input));

                it('Проверка "Сопровождающий"', async () => await dec.simpleText(el.input.getValue,
                    ['Сопровождающий', '', entry.max],
                    `${params.division2.fio.lastName} ${params.division2.fio.firstName}`,
                    el.input));

                it('Проверка "Шаблон доступа для сотрудника"', async () => await dec.simpleText(el.input.getValue,
                    ['Шаблон доступа для сотрудника', '', entry.max],
                    `${params.division2.template1}, ${params.division2.template2}`,
                    el.input));

                it('Проверка "Шаблон доступа для посетителя"', async () => await dec.simpleText(el.input.getValue,
                    ['Шаблон доступа для посетителя', '', entry.max],
                    `${params.division2.template3}`,
                    el.input));

                it('Проверка "График работы"', async () => await dec.simpleText(el.input.getValue,
                    ['График работы', '', entry.max],
                    `${params.division2.schedule}`,
                    el.input));
            });
        });

        describe('Проверка параметров', () => {

            bef();
            aft();

            describe('Проверка подразделения 1 уровня', () => {

                it('Отображенние подразделения', async () => await dec.simple(page.division.division,
                    [[params.division1.name], entry.max],
                    page.division));

                it('Нажатие по подразделению', async () => await dec.simple(page.division.handler,
                    [[params.division1.name], entry.max],
                    page.division));

                it('Подразделение выделено', async () => await dec.simple(page.division.selected,
                    [params.division1.name, entry.max],
                    page.division));

                it('Нажатие кноки "Редактировать"', async () => await dec.simple(el.butIcBefore.handler,
                    [but.edit, entry.max],
                    el.butIcBefore));

                it('Отображение модального окна "Редактировать подразделение"',
                    async () => await  dec.simple(el.modal.divisionEdit.init,
                        [entry.max],
                        el.modal.divisionEdit));

                it('Проверка "Подразделение"', async () => await dec.simpleText(el.modal.divisionEdit.inputGetValue,
                    ['Подразделение', '', entry.max],
                    params.division1.name,
                    el.modal.divisionEdit));

                it('Проверка "Телефон"', async () => await dec.simpleText(el.modal.divisionEdit.inputGetValue,
                    ['Телефон', '', entry.max],
                    params.division1.phone,
                    el.modal.divisionEdit));

                it('Проверка "Описание"', async () => await dec.simpleText(el.modal.divisionEdit.inputGetValue,
                    ['Описание', '', entry.max],
                    params.division1.description,
                    el.modal.divisionEdit));

                it('Проверка "Сопровождающий"', async () => await dec.simpleText(el.select.getText,
                    ['Сопровождающий', `${params.division1.fio.lastName} ${params.division1.fio.firstName}`,
                        entry.max],
                    `${params.division1.fio.lastName} ${params.division1.fio.firstName}`,
                    el.select));

                it('Проверка значение 1 "Шаблон доступа для сотрудника"',
                    async () => await dec.simpleText(el.selectMulti.getText,
                        ['Шаблон доступа для сотрудника', 1, entry.min],
                        params.division1.template1,
                        el.selectMulti));

                it('Проверка значение 2 "Шаблон доступа для сотрудника"',
                    async () => await dec.simpleText(el.selectMulti.getText,
                        ['Шаблон доступа для сотрудника', 2, entry.min],
                        params.division1.template2,
                        el.selectMulti));

                it('Проверка "Шаблон доступа для посетителя"',
                    async () => await dec.simpleText(el.select.getText,
                    ['Шаблон доступа для посетителя',  params.division1.template3, entry.max],
                    params.division1.template3,
                    el.input));

                it('Проверка "График работы"', async () => await dec.simpleText(el.select.getText,
                    ['График работы',  params.division1.schedule, entry.max],
                    params.division1.schedule,
                    el.select));

                it('Нажатие кнопки закрытия модального окна',
                    async () => await dec.simple(el.modal.divisionEdit.closeHandler,
                        [entry.max],
                        el.modal.divisionEdit));

                it('Отсутствие модального окна "Редактировать подразделение"',
                    async () => await  dec.simple(el.modal.divisionEdit.initClose,
                        [entry.max],
                        el.modal.divisionEdit));

            });

            describe('Проверка подразделения 2 уровня', () => {

                it('Отображенние подразделения', async () => await dec.simple(page.division.division,
                    [[params.division1.name, params.division2.name], entry.max],
                    page.division));

                it('Нажатие по подразделению', async () => await dec.simple(page.division.handler,
                    [[params.division1.name, params.division2.name], entry.max],
                    page.division));

                it('Подразделение выделено', async () => await dec.simple(page.division.selected,
                    [params.division2.name, entry.max],
                    page.division));

                it('Нажатие кноки "Редактировать"', async () => await dec.simple(el.butIcBefore.handler,
                    [but.edit, entry.max],
                    el.butIcBefore));

                it('Отображение модального окна "Редактировать подразделение"',
                    async () => await  dec.simple(el.modal.divisionEdit.init,
                        [entry.max],
                        el.modal.divisionEdit));

                it('Проверка "Подразделение"', async () => await dec.simpleText(el.modal.divisionEdit.inputGetValue,
                    ['Подразделение', '', entry.max],
                    params.division2.name,
                    el.modal.divisionEdit));

                it('Проверка "Телефон"', async () => await dec.simpleText(el.modal.divisionEdit.inputGetValue,
                    ['Телефон', '', entry.max],
                    params.division2.phone,
                    el.modal.divisionEdit));

                it('Проверка "Описание"', async () => await dec.simpleText(el.modal.divisionEdit.inputGetValue,
                    ['Описание', '', entry.max],
                    params.division2.description,
                    el.modal.divisionEdit));

                it('Проверка "Сопровождающий"', async () => await dec.simpleText(el.select.getText,
                    ['Сопровождающий', `${params.division2.fio.lastName} ${params.division2.fio.firstName}`,
                        entry.max],
                    `${params.division2.fio.lastName} ${params.division2.fio.firstName}`,
                    el.select));

                it('Проверка значение 1 "Шаблон доступа для сотрудника"',
                    async () => await dec.simpleText(el.selectMulti.getText,
                        ['Шаблон доступа для сотрудника', 1, entry.min],
                        params.division2.template1,
                        el.selectMulti));

                it('Проверка значение 2 "Шаблон доступа для сотрудника"',
                    async () => await dec.simpleText(el.selectMulti.getText,
                        ['Шаблон доступа для сотрудника', 2, entry.min],
                        params.division2.template2,
                        el.selectMulti));

                it('Проверка "Шаблон доступа для посетителя"',
                    async () => await dec.simpleText(el.select.getText,
                        ['Шаблон доступа для посетителя',  params.division2.template3, entry.max],
                        params.division2.template3,
                        el.input));

                it('Проверка "График работы"', async () => await dec.simpleText(el.select.getText,
                    ['График работы',  params.division2.schedule, entry.max],
                    params.division2.schedule,
                    el.select));

                it('Нажатие кнопки закрытия модального окна',
                    async () => await dec.simple(el.modal.divisionEdit.closeHandler,
                        [entry.max],
                        el.modal.divisionEdit));

                it('Отсутствие модального окна "Редактировать подразделение"',
                    async () => await  dec.simple(el.modal.divisionEdit.initClose,
                        [entry.max],
                        el.modal.divisionEdit));

            });

        });

        deleteParams();

    });

    // Добавление родительского и дочернего подразделения с максимальным количеством параметров, через формы выбора:
    // «Сопровождающий», «Шаблон доступа для сотрудника», «Шаблон доступа для посетителя», «График работы».
    const addFormsMaxParams = () => describe('Подразделение. Добавление. Добавление родительского и дочернего ' +
        'подразделения с максимальным количеством параметров, через формы выбора: «Сопровождающий», ' +
        '«Шаблон доступа для сотрудника», «Шаблон доступа для посетителя», «График работы».', () => {

        const params = {
            division1: {
                name: 'addFormsMaxParamsName1',
                phone: 'addFormsMaxParamsPhone1',
                description: 'addFormsMaxParamsDescription1',
                fio: {
                    lastName: 'staff',
                    firstName: '1',
                    middleName: '' ,
                    divisionId: 1,
                    date: '2001-01-01'
                },
                template1: 'template11',
                template2: 'template12',
                template3: 'template13',
                schedule: 'schedule1',
            },
            division2: {
                name: 'addFormsMaxParamsName2',
                phone: 'addFormsMaxParamsPhone2',
                description: 'addFormsMaxParamsDescription2',
                fio: {
                    lastName: 'staff',
                    firstName: '2',
                    middleName: '' ,
                    divisionId: 1,
                    date: '2001-01-01'
                },
                template1: 'template21',
                template2: 'template22',
                template3: 'template23',
                schedule: 'schedule2',
            },
        };

        describe('API - добавление', () => {
            bef();
            aft();
            addAccessTemplate(params.division1.template1, '');
            addAccessTemplate(params.division1.template2, '');
            addAccessTemplate(params.division1.template3, '');
            addAccessTemplate(params.division2.template1, '');
            addAccessTemplate(params.division2.template2, '');
            addAccessTemplate(params.division2.template3, '');
            addSchedule(params.division1.schedule);
            addSchedule(params.division2.schedule);
            addStaff(...Object.values(params.division1.fio));
            addStaff(...Object.values(params.division2.fio));
        });

        describe('Проверка списка подразделений', () => {

            bef();
            aft();

            it('Отображение 1 подраздление', async () => await dec.simple(page.division.size,
                [1, entry.max],
                page.division));

            it('Отображение подразделения "Администраторы системы"', async ()=> await dec.simple(page.division.division,
                [[ "Администраторы системы"], entry.max],
                page.division));

        });

        describe('Добавление подразделений', () => {
            bef();
            aft();

            describe('Добавление подразделения 1 уровня', () => {

                it('Нажатие кноки "Добавить"', async () => await dec.simple(el.butIcBefore.handler,
                    [but.add, entry.max],
                    el.butIcBefore));

                it('Отображение модального окна "Добавить подразделение"',
                    async () => await  dec.simple(el.modal.divisionAdd.init,
                        [entry.max],
                        el.modal.divisionAdd));

                it('Ввод "Подразделение"', async () => await dec.simple(el.input.sendKeys,
                    ['Подразделение', '', params.division1.name, entry.max],
                    el.input));

                it('Ввод "Телефон"', async () => await dec.simple(el.input.sendKeys,
                    ['Телефон', '', params.division1.phone, entry.max],
                    el.input));

                it('Ввод "Описание"', async () => await dec.simple(el.input.sendKeys,
                    ['Описание', '', params.division1.description, entry.max],
                    el.input));

                it('Нажатие кнопки меню в выборе "Сопровождающий"', async () => await dec.simple(el.select.iconMenu,
                    ['Сопровождающий', '', entry.max],
                    el.select));

                it('Отображение модального окна "Сопровождающий"',
                    async () => await dec.simple(el.modal.divisionAdd.initStaff,
                        [entry.max],
                        el.modal.divisionAdd));

                it('Выбор сотрудника',
                    async () => await dec.simple(el.modal.divisionAdd.cellHandler,
                        [`${params.division1.fio.lastName} ${params.division1.fio.firstName}`, entry.max],
                        el.modal.divisionAdd));

                it('Нажатие кнопки "Применить"', async () => await dec.simple(el.button.handler,
                    ['Применить', entry.max],
                    el.button));

                it('Отображение модального окна "Добавить подразделение"',
                    async () => await  dec.simple(el.modal.divisionAdd.init,
                        [entry.max],
                        el.modal.divisionAdd));

                it('Проверка "Сопровождающий"', async () => await  dec.simple(el.select.select,
                    ["Сопровождающий",
                        `${params.division1.fio.lastName} ${params.division1.fio.firstName}`,
                        entry.max],
                    el.select));

                it('Нажатие кнопки меню в выборе "Шаблон доступа для сотрудника"',
                    async () => await dec.simple(el.selectMulti.iconMenu,
                        ['Шаблон доступа для сотрудника', entry.max],
                        el.selectMulti));

                it('Отображение модального окна "Шаблон доступа для сотрудника"',
                    async () => await dec.simple(el.modal.divisionAdd.initTemplateStaff,
                        [entry.max],
                        el.modal.divisionAdd));

                it('Выбор шаблон доступа 1',
                    async () => await dec.simple(el.modal.divisionAdd.cellHandler,
                        [`${params.division1.template1}`, entry.max],
                        el.modal.divisionAdd));

                it('Выбор шаблон доступа 2',
                    async () => await dec.simple(el.modal.divisionAdd.cellHandler,
                        [`${params.division1.template2}`, entry.max],
                        el.modal.divisionAdd));

                it('Нажатие кнопки "Применить"', async () => await dec.simple(el.button.handler,
                    ['Применить', entry.max],
                    el.button));

                it('Отображение модального окна "Добавить подразделение"',
                    async () => await  dec.simple(el.modal.divisionAdd.init,
                        [entry.max],
                        el.modal.divisionAdd));

                it('Проверка значение 1 "Шаблон доступа для сотрудника"',
                    async () => await dec.simpleText(el.selectMulti.getText,
                        ['Шаблон доступа для сотрудника', 1, entry.min],
                        params.division1.template1,
                        el.selectMulti));

                it('Проверка значение 2 "Шаблон доступа для сотрудника"',
                    async () => await dec.simpleText(el.selectMulti.getText,
                        ['Шаблон доступа для сотрудника', 2, entry.min],
                        params.division1.template2,
                        el.selectMulti));

                it('Нажатие кнопки меню в выборе "Шаблон доступа для посетителя"',
                    async () => await dec.simple(el.select.iconMenu,
                        ['Шаблон доступа для посетителя', '', entry.max],
                        el.select));

                it('Отображение модального окна "Шаблон доступа для посетителя"',
                    async () => await dec.simple(el.modal.divisionAdd.initTemplateUser,
                        [entry.max],
                        el.modal.divisionAdd));

                it('Выбор шаблон доступа',
                    async () => await dec.simple(el.modal.divisionAdd.cellHandler,
                        [params.division1.template3, entry.max],
                        el.modal.divisionAdd));

                it('Нажатие кнопки "Применить"', async () => await dec.simple(el.button.handler,
                    ['Применить', entry.max],
                    el.button));

                it('Отображение модального окна "Добавить подразделение"',
                    async () => await  dec.simple(el.modal.divisionAdd.init,
                        [entry.max],
                        el.modal.divisionAdd));

                it('Проверка "Шаблон доступа для посетителя"', async () => await  dec.simple(el.select.select,
                    ["Шаблон доступа для посетителя", params.division1.template3, entry.max],
                    el.select));

                it('Нажатие кнопки меню в выборе "График работы"',
                    async () => await dec.simple(el.select.iconMenu,
                        ['График работы', '', entry.max],
                        el.select));

                it('Отображение модального окна "График работы"',
                    async () => await dec.simple(el.modal.divisionAdd.initSchedule,
                        [entry.max],
                        el.modal.divisionAdd));

                it('Выбор шаблон доступа',
                    async () => await dec.simple(el.modal.divisionAdd.cellHandler,
                        [params.division1.schedule, entry.max],
                        el.modal.divisionAdd));

                it('Нажатие кнопки "Применить"', async () => await dec.simple(el.button.handler,
                    ['Применить', entry.max],
                    el.button));

                it('Отображение модального окна "Добавить подразделение"',
                    async () => await  dec.simple(el.modal.divisionAdd.init,
                        [entry.max],
                        el.modal.divisionAdd));

                it('Проверка "График работы"', async () => await  dec.simple(el.select.select,
                    ["График работы", params.division1.schedule, entry.max],
                    el.select));

                it('Нажатие кнопки "Сохранить"', async () => await dec.simple(el.button.handler,
                    ["Сохранить", entry.max],
                    el.button));

                it('Отображение сообщения "Подразделение успешно добавлено!"',
                    async () => await dec.simple(el.success.success,
                        ['Подразделение успешно добавлено!', entry.max],
                        el.success));

                it('Отсутствие модального окна "Добавить подразделение"',
                    async () => await  dec.simple(el.modal.divisionAdd.initClose,
                        [entry.max],
                        el.modal.divisionAdd));

                it('Отображенние добавленного подразделения', async () => await dec.simple(page.division.division,
                    [[params.division1.name], entry.max],
                    page.division));

            });

            describe('Добавление подразделения 2 уровня', () => {

                it('Нажатие по подразделению 1 уровня', async () => await dec.simple(page.division.handler,
                    [[params.division1.name], entry.max],
                    page.division));

                it('Подразделение 1 уровня выделен', async () => await dec.simple(page.division.selected,
                    [params.division1.name, entry.max],
                    page.division));

                it('Нажатие кноки "Добавить"', async () => await dec.simple(el.butIcBefore.handler,
                    [but.add, entry.max],
                    el.butIcBefore));

                it('Отображение модального окна "Добавить подразделение"',
                    async () => await  dec.simple(el.modal.divisionAdd.init,
                        [entry.max],
                        el.modal.divisionAdd));

                it('Ввод "Подразделение"', async () => await dec.simple(el.input.sendKeys,
                    ['Подразделение', '', params.division2.name, entry.max],
                    el.input));

                it('Ввод "Телефон"', async () => await dec.simple(el.modal.divisionAdd.inputSendKeys,
                    ['Телефон', '', params.division2.phone, entry.max],
                    el.modal.divisionAdd));

                it('Ввод "Описание"', async () => await dec.simple(el.modal.divisionAdd.inputSendKeys,
                    ['Описание', '', params.division2.description, entry.max],
                    el.modal.divisionAdd));

                it('Нажатие кнопки меню в выборе "Сопровождающий"', async () => await dec.simple(el.select.iconMenu,
                    ['Сопровождающий',
                        `${params.division1.fio.lastName} ${params.division1.fio.firstName}`,
                        entry.max],
                    el.select));

                it('Отображение модального окна "Сопровождающий"',
                    async () => await dec.simple(el.modal.divisionAdd.initStaff,
                        [entry.max],
                        el.modal.divisionAdd));

                it('Выбор сотрудника',
                    async () => await dec.simple(el.modal.divisionAdd.cellHandler,
                        [`${params.division2.fio.lastName} ${params.division2.fio.firstName}`, entry.max],
                        el.modal.divisionAdd));

                it('Нажатие кнопки "Применить"', async () => await dec.simple(el.button.handler,
                    ['Применить', entry.max],
                    el.button));

                it('Отображение модального окна "Добавить подразделение"',
                    async () => await  dec.simple(el.modal.divisionAdd.init,
                        [entry.max],
                        el.modal.divisionAdd));

                it('Удаление "Шаблон доступа для сотрудника"', async () => await dec.simple(el.selectMulti.iconClear,
                    ['Шаблон доступа для сотрудника', entry.max],
                    el.selectMulti));

                it('Нажатие кнопки меню в выборе "Шаблон доступа для сотрудника"',
                    async () => await dec.simple(el.selectMulti.iconMenu,
                        ['Шаблон доступа для сотрудника', entry.max],
                        el.selectMulti));

                it('Отображение модального окна "Шаблон доступа для сотрудника"',
                    async () => await dec.simple(el.modal.divisionAdd.initTemplateStaff,
                        [entry.max],
                        el.modal.divisionAdd));

                it('Выбор шаблон доступа 1',
                    async () => await dec.simple(el.modal.divisionAdd.cellHandler,
                        [`${params.division2.template1}`, entry.max],
                        el.modal.divisionAdd));

                it('Выбор шаблон доступа 2',
                    async () => await dec.simple(el.modal.divisionAdd.cellHandler,
                        [`${params.division2.template2}`, entry.max],
                        el.modal.divisionAdd));

                it('Нажатие кнопки "Применить"', async () => await dec.simple(el.button.handler,
                    ['Применить', entry.max],
                    el.button));

                it('Отображение модального окна "Добавить подразделение"',
                    async () => await  dec.simple(el.modal.divisionAdd.init,
                        [entry.max],
                        el.modal.divisionAdd));

                it('Нажатие кнопки меню в выборе "Шаблон доступа для посетителя"',
                    async () => await dec.simple(el.select.iconMenu,
                        ['Шаблон доступа для посетителя', params.division1.template3, entry.max],
                        el.select));

                it('Отображение модального окна "Шаблон доступа для посетителя"',
                    async () => await dec.simple(el.modal.divisionAdd.initTemplateUser,
                        [entry.max],
                        el.modal.divisionAdd));

                it('Выбор шаблон доступа',
                    async () => await dec.simple(el.modal.divisionAdd.cellHandler,
                        [params.division2.template3, entry.max],
                        el.modal.divisionAdd));

                it('Нажатие кнопки "Применить"', async () => await dec.simple(el.button.handler,
                    ['Применить', entry.max],
                    el.button));

                it('Отображение модального окна "Добавить подразделение"',
                    async () => await  dec.simple(el.modal.divisionAdd.init,
                        [entry.max],
                        el.modal.divisionAdd));

                it('Нажатие кнопки меню в выборе "График работы"',
                    async () => await dec.simple(el.select.iconMenu,
                        ['График работы', params.division1.schedule, entry.max],
                        el.select));

                it('Отображение модального окна "График работы"',
                    async () => await dec.simple(el.modal.divisionAdd.initSchedule,
                        [entry.max],
                        el.modal.divisionAdd));

                it('Выбор шаблон доступа',
                    async () => await dec.simple(el.modal.divisionAdd.cellHandler,
                        [params.division2.schedule, entry.max],
                        el.modal.divisionAdd));

                it('Нажатие кнопки "Применить"', async () => await dec.simple(el.button.handler,
                    ['Применить', entry.max],
                    el.button));

                it('Отображение модального окна "Добавить подразделение"',
                    async () => await  dec.simple(el.modal.divisionAdd.init,
                        [entry.max],
                        el.modal.divisionAdd));

                it('Нажатие кнопки "Сохранить"', async () => await dec.simple(el.button.handler,
                    ["Сохранить", entry.max],
                    el.button));

                it('Отображение сообщения "Подразделение успешно добавлено!"',
                    async () => await dec.simple(el.success.success,
                        ['Подразделение успешно добавлено!', entry.max],
                        el.success));

                it('Отсутствие модального окна "Добавить подразделение"',
                    async () => await  dec.simple(el.modal.divisionAdd.initClose,
                        [entry.max],
                        el.modal.divisionAdd));

                it('Отображенние добавленного подразделения', async () => await dec.simple(page.division.division,
                    [[params.division1.name, params.division2.name], entry.max],
                    page.division));

            });
        });

        describe('Проверка отображения в разделе', () => {
            bef();
            aft();

            describe('Общие проверки', () => {

                it('Отображние 3 подраздлениий', async () => await dec.simple(page.division.size,
                    [3, entry.max],
                    page.division));

            });

            describe('Проверка подразделения 1 уровня', () => {

                it('Отображенние подразделения', async () => await dec.simple(page.division.division,
                    [[params.division1.name], entry.max],
                    page.division));

                it('Нажатие по подразделению', async () => await dec.simple(page.division.handler,
                    [[params.division1.name], entry.max],
                    page.division));

                it('Подразделение выделено', async () => await dec.simple(page.division.selected,
                    [params.division1.name, entry.max],
                    page.division));

                it('Проверка "Телефон"', async () => await dec.simpleText(el.input.getValue,
                    ['Телефон', '', entry.max],
                    params.division1.phone,
                    el.input));

                it('Проверка "Описание"', async () => await dec.simpleText(el.input.getValue,
                    ['Описание', '', entry.max],
                    params.division1.description,
                    el.input));

                it('Проверка "Сопровождающий"', async () => await dec.simpleText(el.input.getValue,
                    ['Сопровождающий', '', entry.max],
                    `${params.division1.fio.lastName} ${params.division1.fio.firstName}`,
                    el.input));

                it('Проверка "Шаблон доступа для сотрудника"', async () => await dec.simpleText(el.input.getValue,
                    ['Шаблон доступа для сотрудника', '', entry.max],
                    `${params.division1.template1}, ${params.division1.template2}`,
                    el.input));

                it('Проверка "Шаблон доступа для посетителя"', async () => await dec.simpleText(el.input.getValue,
                    ['Шаблон доступа для посетителя', '', entry.max],
                    `${params.division1.template3}`,
                    el.input));

                it('Проверка "График работы"', async () => await dec.simpleText(el.input.getValue,
                    ['График работы', '', entry.max],
                    `${params.division1.schedule}`,
                    el.input));
            });

            describe('Проверка подразделения 2 уровня', () => {

                it('Отображенние подразделения', async () => await dec.simple(page.division.division,
                    [[params.division1.name, params.division2.name], entry.max],
                    page.division));

                it('Нажатие по подразделению', async () => await dec.simple(page.division.handler,
                    [[params.division1.name, params.division2.name], entry.max],
                    page.division));

                it('Подразделение выделено', async () => await dec.simple(page.division.selected,
                    [params.division2.name, entry.max],
                    page.division));

                it('Проверка "Телефон"', async () => await dec.simpleText(el.input.getValue,
                    ['Телефон', '', entry.max],
                    params.division2.phone,
                    el.input));

                it('Проверка "Описание"', async () => await dec.simpleText(el.input.getValue,
                    ['Описание', '', entry.max],
                    params.division2.description,
                    el.input));

                it('Проверка "Сопровождающий"', async () => await dec.simpleText(el.input.getValue,
                    ['Сопровождающий', '', entry.max],
                    `${params.division2.fio.lastName} ${params.division2.fio.firstName}`,
                    el.input));

                it('Проверка "Шаблон доступа для сотрудника"', async () => await dec.simpleText(el.input.getValue,
                    ['Шаблон доступа для сотрудника', '', entry.max],
                    `${params.division2.template1}, ${params.division2.template2}`,
                    el.input));

                it('Проверка "Шаблон доступа для посетителя"', async () => await dec.simpleText(el.input.getValue,
                    ['Шаблон доступа для посетителя', '', entry.max],
                    `${params.division2.template3}`,
                    el.input));

                it('Проверка "График работы"', async () => await dec.simpleText(el.input.getValue,
                    ['График работы', '', entry.max],
                    `${params.division2.schedule}`,
                    el.input));
            });
        });

        describe('Проверка параметров', () => {

            bef();
            aft();

            describe('Проверка подразделения 1 уровня', () => {

                it('Отображенние подразделения', async () => await dec.simple(page.division.division,
                    [[params.division1.name], entry.max],
                    page.division));

                it('Нажатие по подразделению', async () => await dec.simple(page.division.handler,
                    [[params.division1.name], entry.max],
                    page.division));

                it('Подразделение выделено', async () => await dec.simple(page.division.selected,
                    [params.division1.name, entry.max],
                    page.division));

                it('Нажатие кноки "Редактировать"', async () => await dec.simple(el.butIcBefore.handler,
                    [but.edit, entry.max],
                    el.butIcBefore));

                it('Отображение модального окна "Редактировать подразделение"',
                    async () => await  dec.simple(el.modal.divisionEdit.init,
                        [entry.max],
                        el.modal.divisionEdit));

                it('Проверка "Подразделение"', async () => await dec.simpleText(el.modal.divisionEdit.inputGetValue,
                    ['Подразделение', '', entry.max],
                    params.division1.name,
                    el.modal.divisionEdit));

                it('Проверка "Телефон"', async () => await dec.simpleText(el.modal.divisionEdit.inputGetValue,
                    ['Телефон', '', entry.max],
                    params.division1.phone,
                    el.modal.divisionEdit));

                it('Проверка "Описание"', async () => await dec.simpleText(el.modal.divisionEdit.inputGetValue,
                    ['Описание', '', entry.max],
                    params.division1.description,
                    el.modal.divisionEdit));

                it('Проверка "Сопровождающий"', async () => await dec.simpleText(el.select.getText,
                    ['Сопровождающий', `${params.division1.fio.lastName} ${params.division1.fio.firstName}`,
                        entry.max],
                    `${params.division1.fio.lastName} ${params.division1.fio.firstName}`,
                    el.select));

                it('Проверка значение 1 "Шаблон доступа для сотрудника"',
                    async () => await dec.simpleText(el.selectMulti.getText,
                        ['Шаблон доступа для сотрудника', 1, entry.min],
                        params.division1.template1,
                        el.selectMulti));

                it('Проверка значение 2 "Шаблон доступа для сотрудника"',
                    async () => await dec.simpleText(el.selectMulti.getText,
                        ['Шаблон доступа для сотрудника', 2, entry.min],
                        params.division1.template2,
                        el.selectMulti));

                it('Проверка "Шаблон доступа для посетителя"',
                    async () => await dec.simpleText(el.select.getText,
                        ['Шаблон доступа для посетителя',  params.division1.template3, entry.max],
                        params.division1.template3,
                        el.input));

                it('Проверка "График работы"', async () => await dec.simpleText(el.select.getText,
                    ['График работы',  params.division1.schedule, entry.max],
                    params.division1.schedule,
                    el.select));

                it('Нажатие кнопки закрытия модального окна',
                    async () => await dec.simple(el.modal.divisionEdit.closeHandler,
                        [entry.max],
                        el.modal.divisionEdit));

                it('Отсутствие модального окна "Редактировать подразделение"',
                    async () => await  dec.simple(el.modal.divisionEdit.initClose,
                        [entry.max],
                        el.modal.divisionEdit));

            });

            describe('Проверка подразделения 2 уровня', () => {

                it('Отображенние подразделения', async () => await dec.simple(page.division.division,
                    [[params.division1.name, params.division2.name], entry.max],
                    page.division));

                it('Нажатие по подразделению', async () => await dec.simple(page.division.handler,
                    [[params.division1.name, params.division2.name], entry.max],
                    page.division));

                it('Подразделение выделено', async () => await dec.simple(page.division.selected,
                    [params.division2.name, entry.max],
                    page.division));

                it('Нажатие кноки "Редактировать"', async () => await dec.simple(el.butIcBefore.handler,
                    [but.edit, entry.max],
                    el.butIcBefore));

                it('Отображение модального окна "Редактировать подразделение"',
                    async () => await  dec.simple(el.modal.divisionEdit.init,
                        [entry.max],
                        el.modal.divisionEdit));

                it('Проверка "Подразделение"', async () => await dec.simpleText(el.modal.divisionEdit.inputGetValue,
                    ['Подразделение', '', entry.max],
                    params.division2.name,
                    el.modal.divisionEdit));

                it('Проверка "Телефон"', async () => await dec.simpleText(el.modal.divisionEdit.inputGetValue,
                    ['Телефон', '', entry.max],
                    params.division2.phone,
                    el.modal.divisionEdit));

                it('Проверка "Описание"', async () => await dec.simpleText(el.modal.divisionEdit.inputGetValue,
                    ['Описание', '', entry.max],
                    params.division2.description,
                    el.modal.divisionEdit));

                it('Проверка "Сопровождающий"', async () => await dec.simpleText(el.select.getText,
                    ['Сопровождающий', `${params.division2.fio.lastName} ${params.division2.fio.firstName}`,
                        entry.max],
                    `${params.division2.fio.lastName} ${params.division2.fio.firstName}`,
                    el.select));

                it('Проверка значение 1 "Шаблон доступа для сотрудника"',
                    async () => await dec.simpleText(el.selectMulti.getText,
                        ['Шаблон доступа для сотрудника', 1, entry.min],
                        params.division2.template1,
                        el.selectMulti));

                it('Проверка значение 2 "Шаблон доступа для сотрудника"',
                    async () => await dec.simpleText(el.selectMulti.getText,
                        ['Шаблон доступа для сотрудника', 2, entry.min],
                        params.division2.template2,
                        el.selectMulti));

                it('Проверка "Шаблон доступа для посетителя"',
                    async () => await dec.simpleText(el.select.getText,
                        ['Шаблон доступа для посетителя',  params.division2.template3, entry.max],
                        params.division2.template3,
                        el.input));

                it('Проверка "График работы"', async () => await dec.simpleText(el.select.getText,
                    ['График работы',  params.division2.schedule, entry.max],
                    params.division2.schedule,
                    el.select));

                it('Нажатие кнопки закрытия модального окна',
                    async () => await dec.simple(el.modal.divisionEdit.closeHandler,
                        [entry.max],
                        el.modal.divisionEdit));

                it('Отсутствие модального окна "Редактировать подразделение"',
                    async () => await  dec.simple(el.modal.divisionEdit.initClose,
                        [entry.max],
                        el.modal.divisionEdit));

            });

        });

        deleteParams();

    });

    // Добавление 5 подразделений 1 уровня с вложенннными подразделениямми прогрессией до 5.
    const addIncludeProgression =() => describe('Подразделение. Добавление. Добавление 5 подразделений 1 уровня ' +
        'с вложенными подразделениями ' + 'прогрессией до 5.', () => {

        const params = {
            array: [...Array(5).keys()].map(item1 => {
                return [...Array(item1 + 1).keys()].map(item2 => {
                    return 'addIncludeProgressionName' + (item1 + 1) +  (item2 + 1)
                });
            }),
        };

        describe('Добавление подразделений', () => {
            bef();
            aft();

            params.array.forEach((item1) => {
                let arr =[];
                item1.forEach((item2, index2) => {
                    describe(`Добавление подразделения ${index2 + 1} уровня - ${item2}`, () => {

                        if(index2 > 0) {
                            it(`Нажатие по подразделению ${index2} уровня - ${item1[index2 - 1]}`,
                                async () => await dec.simple(page.division.handler,
                                    [arr, entry.max],
                                    page.division));

                            it(`Подразделение ${index2} уровня - ${item1[index2 - 1]} выделен`,
                                async () => await dec.simple(page.division.selected,
                                    [item1[index2 - 1], entry.max],
                                    page.division));
                        }

                        it('Нажатие кноки "Добавить"', async () => await dec.simple(el.butIcBefore.handler,
                            [but.add, entry.max],
                            el.butIcBefore));

                        it('Отображение модального окна "Добавить подразделение"',
                            async () => await  dec.simple(el.modal.divisionAdd.init,
                                [entry.max],
                                el.modal.divisionAdd));

                        it('Ввод "Подразделение"', async () => {
                            await dec.simple(el.input.sendKeys,
                                ['Подразделение', '', item2, entry.max],
                                el.input)
                        });

                        it('Нажатие кнопки "Сохранить"', async () => await dec.simple(el.button.handler,
                            ["Сохранить", entry.max],
                            el.button));

                        it('Отображение сообщения "Подразделение успешно добавлено!"',
                            async () => await dec.simple(el.success.success,
                                ['Подразделение успешно добавлено!', entry.max],
                                el.success));

                        it('Отсутствие модального окна "Добавить подразделение"',
                            async () => await  dec.simple(el.modal.divisionAdd.initClose,
                                [entry.max],
                                el.modal.divisionAdd));

                        it('Отображенние добавленного подразделения', async () => {
                            arr.push(item2);
                            await dec.simple(page.division.division,
                                [arr, entry.max],
                                page.division)
                        });

                    });
                });
            });

        });

        describe('Проверка отображения в разделе', () => {
            bef();
            aft();

            describe('Общие проверки', () => {

                it('Отображние 16 подраздлениий', async () => await dec.simple(page.division.size,
                    [16, entry.max],
                    page.division));

                params.array.forEach((item1) => {
                    let arr =[];
                    item1.forEach((item2, index2) => {
                        it(`Отображенние подразделения ${index2 + 1} уровня - ${item2}`, async () => {
                            arr.push(item2);
                            await dec.simple(page.division.division,
                                [arr, entry.max],
                                page.division)
                        });
                    });
                });

            });


        });

        deleteParams();
    });

    // Попытка дублирования корневого подразделения к родительскому.
    const addDuplicateOneLevel = () => describe('Подразделение. Добавление. Попытка дублирования подразделения ' +
        '1 уровня к подразделению 1 уровня.', () => {

        const params = {
                name: 'addDuplicateOneLevelName',
                error: 'Данное подразделение уже существует'
            };

        describe('API - добавление', () => {
                bef();
                aft();
                const obj = {
                    parent_id: 0,
                    name: params.name,
                };
                addDivision(obj);
            });

        describe('Проверка списка подразделений', () => {

                bef();
                aft();

                it('Отображение 2 подраздление', async () => await dec.simple(page.division.size,
                    [2, entry.max],
                    page.division));

                it('Отображение добавленного подразделения', async ()=> await dec.simple(page.division.division,
                    [[params.name], entry.max],
                    page.division));
            });

        describe('Добавление подразделений', () => {
                bef();
                aft();

                it('Нажатие кноки "Добавить"', async () => await dec.simple(el.butIcBefore.handler,
                    [but.add, entry.max],
                    el.butIcBefore));

                it('Отображение модального окна "Добавить подразделение"',
                    async () => await  dec.simple(el.modal.divisionAdd.init,
                        [entry.max],
                        el.modal.divisionAdd));

                it('Ввод "Подразделение"', async () => await dec.simple(el.input.sendKeys,
                    ['Подразделение', '', params.name, entry.max],
                    el.input));

                it('Нажатие кнопки "Сохранить"', async () => await dec.simple(el.button.handler,
                    ["Сохранить", entry.max],
                    el.button));

                it('Отображение ошибки "Данное подразделение уже существует"',
                    async () => await dec.simple(el.error.error,
                        [params.error, entry.max],
                        el.error));

                it('Модального окно "Добавить подразделение" не закрыто',
                    async () => await  dec.simpleFalse(el.modal.divisionAdd.initClose,
                        [entry.min],
                        el.modal.divisionAdd));

                it('Нажатие кнопки закрытия модального окна',
                    async () => await dec.simple(el.modal.divisionAdd.closeHandler,
                        [entry.max],
                        el.modal.divisionAdd));

                it('Отсутствие модального окна "Добавить подразделение"',
                    async () => await  dec.simple(el.modal.divisionAdd.initClose,
                        [entry.max],
                        el.modal.divisionAdd));
            });

        describe('Проверка списка подразделений', () => {

                bef();
                aft();

                it('Отображение 2 подраздление', async () => await dec.simple(page.division.size,
                    [2, entry.max],
                    page.division));

            });

        deleteParams();
    });

    // Попытка дублирования корневого подразделения к дочернему.
    const addDuplicateTwoLevel = () => describe('Подразделение. Добавление. Попытка дублирования подразделения ' +
        '1 уровня к подразделению 2 уровня.', () => {

        const params = {
                name1: 'addDuplicateTwoLevelName1',
                name2: 'addDuplicateTwoLevelName2',
                error: 'Данное подразделение уже существует'
            };

        describe('API - добавление', () => {
                bef();
                aft();

                describe('Добавление подразделения 1 уровня', () => {
                    const obj = {
                        parent_id: 0,
                        name: params.name1,
                    };
                    addDivision(obj);
                });

                describe('Добавление подразделения 2 уровня', () => {
                    it('Добавление подразделения', async () => {
                        const cook = await page.base.getCookie('token');
                        const get = await api.getDivision(cook.text);
                        const obj = {
                            parent_id: get.text[0]['id'],
                            name: params.name2
                        };
                        await dec.simple(api.putDivision,
                            [[obj], cook.text],
                            api.putDivision);
                    });
                });
            });

        describe('Проверка списка подразделений', () => {

                bef();
                aft();

                it('Отображение 3 подраздление', async () => await dec.simple(page.division.size,
                    [3, entry.max],
                    page.division));

                it('Отображение добавленного подразделения 1 уровня', async ()=> await dec.simple(page.division.division,
                    [[params.name1], entry.max],
                    page.division));

                it('Отображение добавленного подразделения 2 уровня', async ()=> await dec.simple(page.division.division,
                    [[params.name1, params.name2], entry.max],
                    page.division));
            });

        describe('Добавление подразделений', () => {
                bef();
                aft();

                it('Нажатие кноки "Добавить"', async () => await dec.simple(el.butIcBefore.handler,
                    [but.add, entry.max],
                    el.butIcBefore));

                it('Отображение модального окна "Добавить подразделение"',
                    async () => await  dec.simple(el.modal.divisionAdd.init,
                        [entry.max],
                        el.modal.divisionAdd));

                it('Ввод "Подразделение"', async () => await dec.simple(el.input.sendKeys,
                    ['Подразделение', '', params.name2, entry.max],
                    el.input));

                it('Нажатие кнопки "Сохранить"', async () => await dec.simple(el.button.handler,
                    ["Сохранить", entry.max],
                    el.button));

                it('Отображение ошибки "Данное подразделение уже существует"',
                    async () => await dec.simple(el.error.error,
                        [params.error, entry.max],
                        el.error));

                it('Модального окно "Добавить подразделение" не закрыто',
                    async () => await  dec.simpleFalse(el.modal.divisionAdd.initClose,
                        [entry.min],
                        el.modal.divisionAdd));

                it('Нажатие кнопки закрытия модального окна',
                    async () => await dec.simple(el.modal.divisionAdd.closeHandler,
                        [entry.max],
                        el.modal.divisionAdd));

                it('Отсутствие модального окна "Добавить подразделение"',
                    async () => await  dec.simple(el.modal.divisionAdd.initClose,
                        [entry.max],
                        el.modal.divisionAdd));
            });

        describe('Проверка списка подразделений', () => {

                bef();
                aft();

                it('Отображение 3 подраздление', async () => await dec.simple(page.division.size,
                    [3, entry.max],
                    page.division));

                it('Отображение добавленного подразделения 1 уровня', async ()=> await dec.simple(page.division.division,
                    [[params.name1], entry.max],
                    page.division));

                it('Отображение добавленного подразделения 2 уровня', async ()=> await dec.simple(page.division.division,
                    [[params.name2], entry.max],
                    page.division));
            });

        deleteParams();
    });

    // Попытка добавления без «Подразделение».
    const addNoName = () => describe('Подразделение. Добавление. Попытка добавления без "Подразделение»".',
        () => {

        describe('Проверка списка подразделений', () => {

                bef();
                aft();

                it('Отображние 1 подраздление', async () => await dec.simple(page.division.size,
                    [1, entry.max],
                    page.division));

                it('Отображение подразделения "Администраторы системы"', async ()=> await dec.simple(page.division.division,
                    [[ "Администраторы системы"], entry.max],
                    page.division));

            });

        describe('Добавление подразделений', () => {
                bef();
                aft();

                it('Нажатие кноки "Добавить"', async () => await dec.simple(el.butIcBefore.handler,
                    [but.add, entry.max],
                    el.butIcBefore));

                it('Отображение модального окна "Добавить подразделение"',
                    async () => await  dec.simple(el.modal.divisionAdd.init,
                        [entry.max],
                        el.modal.divisionAdd));

                it('Кнопки "Сохранить" - не активна', async () => await dec.simple(el.button.disabled,
                    ["Сохранить", entry.max],
                    el.button));

                it('Нажатие кнопки "Сохранить"', async () => await dec.simple(el.button.handlerNoActive,
                    ["Сохранить", entry.max],
                    el.button));

                it('Модального окно "Добавить подразделение" не закрыто',
                    async () => await  dec.simpleFalse(el.modal.divisionAdd.initClose,
                        [entry.min],
                        el.modal.divisionAdd));

                it('Нажатие кнопки закрытия модального окна',
                    async () => await dec.simple(el.modal.divisionAdd.closeHandler,
                        [entry.max],
                        el.modal.divisionAdd));

                it('Отсутствие модального окна "Добавить подразделение"',
                    async () => await  dec.simple(el.modal.divisionAdd.initClose,
                        [entry.max],
                        el.modal.divisionAdd));
            });

        describe('Проверка списка подразделений', () => {

                bef();
                aft();

                it('Отображние 1 подраздление', async () => await dec.simple(page.division.size,
                    [1, entry.max],
                    page.division));

                it('Отображение подразделения "Администраторы системы"', async ()=> await dec.simple(page.division.division,
                    [[ "Администраторы системы"], entry.max],
                    page.division));

            });

        deleteParams();
    });

    const add = () => describe('Подразделение. Проверки добавления.', () => {
        addMinParams();
        addMaxParams();
        addFormsMaxParams();
        addIncludeProgression();
        addDuplicateOneLevel();
        addDuplicateTwoLevel();
        addNoName();
    });

    return {
        addMinParams,
        addMaxParams,
        addFormsMaxParams,
        addIncludeProgression,
        addDuplicateOneLevel,
        addDuplicateTwoLevel,
        addNoName,
        add,
    }
};

// Тесты редактирования
const edit = () => {

    // Добавление необязательных параметров с минимальным количеством параметров в родительское и дочернее подразделение
    // с минимальным количеством параметров.
    const editMinParams = () => describe('Подразделение. Редактирование. Добавление необязательных параметров ' +
        'с минимальным количеством параметров в подразделение 1 уровня и подразделние 2 уровня', () => {

        const params = {
            division1: {
                name: 'editMinParamsName1',
                phone: 'editMinParamsPhone1',
                description: 'editMinParamsDescription1',
                fio: {
                    lastName: 'staff',
                    firstName: '1',
                    middleName: '' ,
                    divisionId: 1,
                    date: '2001-01-01'
                },
                template1: 'template11',
                template2: 'template12',
                template3: 'template13',
                schedule: 'schedule1',
            },
            division2: {
                name: 'editMinParamsName2',
                phone: 'editMinParamsPhone2',
                description: 'editMinParamsDescription2',
                fio: {
                    lastName: 'staff',
                    firstName: '2',
                    middleName: '' ,
                    divisionId: 1,
                    date: '2001-01-01'
                },
                template1: 'template21',
                template2: 'template22',
                template3: 'template23',
                schedule: 'schedule2',
            },
        };

        describe('API - добавление', () => {
            bef();
            aft();
            addAccessTemplate(params.division1.template1, '');
            addAccessTemplate(params.division1.template2, '');
            addAccessTemplate(params.division1.template3, '');
            addAccessTemplate(params.division2.template1, '');
            addAccessTemplate(params.division2.template2, '');
            addAccessTemplate(params.division2.template3, '');
            addSchedule(params.division1.schedule);
            addSchedule(params.division2.schedule);
            addStaff(...Object.values(params.division1.fio));
            addStaff(...Object.values(params.division2.fio));
            describe('Добавление подразделения 1 уровня', () => {
                const obj = {
                    parent_id: 0,
                    name: params.division1.name,
                };
                addDivision(obj);
            });
            describe('Добавление подразделения 2 уровня', () => {
                it('Добавление подразделения', async () => {
                    const cook = await page.base.getCookie('token');
                    const get = await api.getDivision(cook.text);
                    const obj = {
                        parent_id: get.text[0]['id'],
                        name: params.division2.name
                    };
                    await dec.simple(api.putDivision,
                        [[obj], cook.text],
                        api.putDivision);
                });
            });
        });

        describe('Проверка отображения в разделе', () => {
            bef();
            aft();

            describe('Общие проверки', () => {

                it('Отображение 3 подраздление', async () => await dec.simple(page.division.size,
                    [3, entry.max],
                    page.division));

                it('Отображение добавленного подразделения 1 уровня', async ()=> await dec.simple(page.division.division,
                    [[params.division1.name], entry.max],
                    page.division));

                it('Отображение добавленного подразделения 2 уровня', async ()=> await dec.simple(page.division.division,
                    [[params.division1.name, params.division2.name], entry.max],
                    page.division));
            });

            describe('Проверка подразделения 1 уровня', () => {

                it('Отображенние подразделения', async () => await dec.simple(page.division.division,
                    [[params.division1.name], entry.max],
                    page.division));

                it('Нажатие по подразделению', async () => await dec.simple(page.division.handler,
                    [[params.division1.name], entry.max],
                    page.division));

                it('Подразделение выделено', async () => await dec.simple(page.division.selected,
                    [params.division1.name, entry.max],
                    page.division));

                it('Проверка "Телефон"', async () => await dec.simpleText(el.input.getValue,
                    ['Телефон', '', entry.max],
                    '',
                    el.input));

                it('Проверка "Описание"', async () => await dec.simpleText(el.input.getValue,
                    ['Описание', '', entry.max],
                    '',
                    el.input));

                it('Проверка "Сопровождающий"', async () => await dec.simpleText(el.input.getValue,
                    ['Сопровождающий', '', entry.max],
                    '',
                    el.input));

                it('Проверка "Шаблон доступа для сотрудника"', async () => await dec.simpleText(el.input.getValue,
                    ['Шаблон доступа для сотрудника', '', entry.max],
                    '',
                    el.input));

                it('Проверка "Шаблон доступа для посетителя"', async () => await dec.simpleText(el.input.getValue,
                    ['Шаблон доступа для посетителя', '', entry.max],
                    '',
                    el.input));

                it('Проверка "График работы"', async () => await dec.simpleText(el.input.getValue,
                    ['График работы', '', entry.max],
                    '',
                    el.input));
            });

            describe('Проверка подразделения 2 уровня', () => {

                it('Отображенние подразделения', async () => await dec.simple(page.division.division,
                    [[params.division1.name, params.division2.name], entry.max],
                    page.division));

                it('Нажатие по подразделению', async () => await dec.simple(page.division.handler,
                    [[params.division1.name, params.division2.name], entry.max],
                    page.division));

                it('Подразделение выделено', async () => await dec.simple(page.division.selected,
                    [params.division2.name, entry.max],
                    page.division));

                it('Проверка "Телефон"', async () => await dec.simpleText(el.input.getValue,
                    ['Телефон', '', entry.max],
                    '',
                    el.input));

                it('Проверка "Описание"', async () => await dec.simpleText(el.input.getValue,
                    ['Описание', '', entry.max],
                    '',
                    el.input));

                it('Проверка "Сопровождающий"', async () => await dec.simpleText(el.input.getValue,
                    ['Сопровождающий', '', entry.max],
                    '',
                    el.input));

                it('Проверка "Шаблон доступа для сотрудника"', async () => await dec.simpleText(el.input.getValue,
                    ['Шаблон доступа для сотрудника', '', entry.max],
                    '',
                    el.input));

                it('Проверка "Шаблон доступа для посетителя"', async () => await dec.simpleText(el.input.getValue,
                    ['Шаблон доступа для посетителя', '', entry.max],
                    '',
                    el.input));

                it('Проверка "График работы"', async () => await dec.simpleText(el.input.getValue,
                    ['График работы', '', entry.max],
                    '',
                    el.input));
            });
        });

        describe('Редактирование подразделений', () => {
            bef();
            aft();

            describe('Редактирование подразделения 1 уровня', () => {

                it('Нажатие по подразделению 1 уровня', async () => await dec.simple(page.division.handler,
                    [[params.division1.name], entry.max],
                    page.division));

                it('Подразделение 1 уровня выделен', async () => await dec.simple(page.division.selected,
                    [params.division1.name, entry.max],
                    page.division));

                it('Нажатие кноки "Редактировать"', async () => await dec.simple(el.butIcBefore.handler,
                    [but.edit, entry.max],
                    el.butIcBefore));

                it('Отображение модального окна "Редактировать подразделение"',
                    async () => await  dec.simple(el.modal.divisionEdit.init,
                        [entry.max],
                        el.modal.divisionEdit));

                it('Ввод "Телефон"', async () => await dec.simple(el.modal.divisionEdit.inputSendKeys,
                    ['Телефон', '', params.division1.phone, entry.max],
                    el.modal.divisionEdit));

                it('Ввод "Описание"', async () => await dec.simple(el.modal.divisionEdit.inputSendKeys,
                    ['Описание', '', params.division1.description, entry.max],
                    el.modal.divisionEdit));

                it('Выбор "Сопровождающий"', async () => await dec.simple(el.select.iconXpand,
                    ['Сопровождающий', '',
                        `${params.division1.fio.lastName} ${params.division1.fio.firstName}`,
                        entry.max],
                    el.select));

                it('Выбор значение 1 в "Шаблон доступа для сотрудника"',
                    async () => await dec.simple(el.selectMulti.iconXpandSelected,
                        ['Шаблон доступа для сотрудника', params.division1.template1, entry.max],
                        el.selectMulti));

                it('Выбор значение 2 в "Шаблон доступа для сотрудника"',
                    async () => await dec.simple(el.selectMulti.iconXpandSelected,
                        ['Шаблон доступа для сотрудника', params.division1.template2, entry.max],
                        el.selectMulti));

                it('Выбор "Шаблон доступа для посетителя"', async () => await dec.simple(el.select.iconXpand,
                    ['Шаблон доступа для посетителя', '', params.division1.template3, entry.max],
                    el.select));

                it('Выбор "График работы"', async () => await dec.simple(el.select.iconXpand,
                    ['График работы', '', params.division1.schedule, entry.max],
                    el.select));

                it('Нажатие кнопки "Сохранить"', async () => await dec.simple(el.button.handler,
                    ["Сохранить", entry.max],
                    el.button));

                it('Отображение сообщения "Подразделение успешно отредактировано!"',
                    async () => await dec.simple(el.success.success,
                        ['Подразделение успешно отредактировано!', entry.max],
                        el.success));

                it('Отсутствие модального окна "Редактировать подразделение"',
                    async () => await  dec.simple(el.modal.divisionEdit.initClose,
                        [entry.max],
                        el.modal.divisionEdit));

            });

            describe('Редактирование подразделения 2 уровня', () => {

                it('Нажатие по подразделению 2 уровня', async () => await dec.simple(page.division.handler,
                    [[params.division1.name, params.division2.name], entry.max],
                    page.division));

                it('Подразделение 2 уровня выделен', async () => await dec.simple(page.division.selected,
                    [params.division2.name, entry.max],
                    page.division));

                it('Нажатие кноки "Редактировать"', async () => await dec.simple(el.butIcBefore.handler,
                    [but.edit, entry.max],
                    el.butIcBefore));

                it('Отображение модального окна "Редактировать подразделение"',
                    async () => await  dec.simple(el.modal.divisionEdit.init,
                        [entry.max],
                        el.modal.divisionEdit));

                it('Ввод "Телефон"', async () => await dec.simple(el.modal.divisionEdit.inputSendKeys,
                    ['Телефон', '', params.division2.phone, entry.max],
                    el.modal.divisionEdit));

                it('Ввод "Описание"', async () => await dec.simple(el.modal.divisionEdit.inputSendKeys,
                    ['Описание', '', params.division2.description, entry.max],
                    el.modal.divisionEdit));

                it('Выбор "Сопровождающий"', async () => await dec.simple(el.select.iconXpand,
                    ['Сопровождающий', '',
                        `${params.division2.fio.lastName} ${params.division2.fio.firstName}`, entry.max],
                    el.select));

                it('Выбор значение 1 в "Шаблон доступа для сотрудника"',
                    async () => await dec.simple(el.selectMulti.iconXpandSelected,
                        ['Шаблон доступа для сотрудника', params.division2.template1, entry.max],
                        el.selectMulti));

                it('Выбор значение 2 в "Шаблон доступа для сотрудника"',
                    async () => await dec.simple(el.selectMulti.iconXpandSelected,
                        ['Шаблон доступа для сотрудника', params.division2.template2, entry.max],
                        el.selectMulti));

                it('Выбор "Шаблон доступа для посетителя"', async () => await dec.simple(el.select.iconXpand,
                        ['Шаблон доступа для посетителя', '', params.division2.template3, entry.max],
                    el.select));

                it('Выбор "График работы"', async () => await dec.simple(el.select.iconXpand,
                    ['График работы', '', params.division2.schedule, entry.max],
                    el.select));

                it('Нажатие кнопки "Сохранить"', async () => await dec.simple(el.button.handler,
                    ["Сохранить", entry.max],
                    el.button));

                it('Отображение сообщения "Подразделение успешно отредактировано!"',
                    async () => await dec.simple(el.success.success,
                        ['Подразделение успешно отредактировано!', entry.max],
                        el.success));

                it('Отсутствие модального окна "Редактировать подразделение"',
                    async () => await  dec.simple(el.modal.divisionEdit.initClose,
                        [entry.max],
                        el.modal.divisionEdit));
            });
        });

        describe('Проверка отображения в разделе', () => {
            bef();
            aft();

            describe('Общие проверки', () => {

                it('Отображние 3 подраздлениий', async () => await dec.simple(page.division.size,
                    [3, entry.max],
                    page.division));

            });

            describe('Проверка подразделения 1 уровня', () => {

                it('Отображенние подразделения', async () => await dec.simple(page.division.division,
                    [[params.division1.name], entry.max],
                    page.division));

                it('Нажатие по подразделению', async () => await dec.simple(page.division.handler,
                    [[params.division1.name], entry.max],
                    page.division));

                it('Подразделение выделено', async () => await dec.simple(page.division.selected,
                    [params.division1.name, entry.max],
                    page.division));

                it('Проверка "Телефон"', async () => await dec.simpleText(el.input.getValue,
                    ['Телефон', '', entry.max],
                    params.division1.phone,
                    el.input));

                it('Проверка "Описание"', async () => await dec.simpleText(el.input.getValue,
                    ['Описание', '', entry.max],
                    params.division1.description,
                    el.input));

                it('Проверка "Сопровождающий"', async () => await dec.simpleText(el.input.getValue,
                    ['Сопровождающий', '', entry.max],
                    `${params.division1.fio.lastName} ${params.division1.fio.firstName}`,
                    el.input));

                it('Проверка "Шаблон доступа для сотрудника"', async () => await dec.simpleText(el.input.getValue,
                    ['Шаблон доступа для сотрудника', '', entry.max],
                    `${params.division1.template1}, ${params.division1.template2}`,
                    el.input));

                it('Проверка "Шаблон доступа для посетителя"', async () => await dec.simpleText(el.input.getValue,
                    ['Шаблон доступа для посетителя', '', entry.max],
                    `${params.division1.template3}`,
                    el.input));

                it('Проверка "График работы"', async () => await dec.simpleText(el.input.getValue,
                    ['График работы', '', entry.max],
                    `${params.division1.schedule}`,
                    el.input));
            });

            describe('Проверка подразделения 2 уровня', () => {

                it('Отображенние подразделения', async () => await dec.simple(page.division.division,
                    [[params.division1.name, params.division2.name], entry.max],
                    page.division));

                it('Нажатие по подразделению', async () => await dec.simple(page.division.handler,
                    [[params.division1.name, params.division2.name], entry.max],
                    page.division));

                it('Подразделение выделено', async () => await dec.simple(page.division.selected,
                    [params.division2.name, entry.max],
                    page.division));

                it('Проверка "Телефон"', async () => await dec.simpleText(el.input.getValue,
                    ['Телефон', '', entry.max],
                    params.division2.phone,
                    el.input));

                it('Проверка "Описание"', async () => await dec.simpleText(el.input.getValue,
                    ['Описание', '', entry.max],
                    params.division2.description,
                    el.input));

                it('Проверка "Сопровождающий"', async () => await dec.simpleText(el.input.getValue,
                    ['Сопровождающий', '', entry.max],
                    `${params.division2.fio.lastName} ${params.division2.fio.firstName}`,
                    el.input));

                it('Проверка "Шаблон доступа для сотрудника"', async () => await dec.simpleText(el.input.getValue,
                    ['Шаблон доступа для сотрудника', '', entry.max],
                    `${params.division2.template1}, ${params.division2.template2}`,
                    el.input));

                it('Проверка "Шаблон доступа для посетителя"', async () => await dec.simpleText(el.input.getValue,
                    ['Шаблон доступа для посетителя', '', entry.max],
                    `${params.division2.template3}`,
                    el.input));

                it('Проверка "График работы"', async () => await dec.simpleText(el.input.getValue,
                    ['График работы', '', entry.max],
                    `${params.division2.schedule}`,
                    el.input));
            });
        });

        describe('Проверка параметров', () => {

            bef();
            aft();

            describe('Проверка подразделения 1 уровня', () => {

                it('Отображенние подразделения', async () => await dec.simple(page.division.division,
                    [[params.division1.name], entry.max],
                    page.division));

                it('Нажатие по подразделению', async () => await dec.simple(page.division.handler,
                    [[params.division1.name], entry.max],
                    page.division));

                it('Подразделение выделено', async () => await dec.simple(page.division.selected,
                    [params.division1.name, entry.max],
                    page.division));

                it('Нажатие кноки "Редактировать"', async () => await dec.simple(el.butIcBefore.handler,
                    [but.edit, entry.max],
                    el.butIcBefore));

                it('Отображение модального окна "Редактировать подразделение"',
                    async () => await  dec.simple(el.modal.divisionEdit.init,
                        [entry.max],
                        el.modal.divisionEdit));

                it('Проверка "Подразделение"', async () => await dec.simpleText(el.modal.divisionEdit.inputGetValue,
                    ['Подразделение', '', entry.max],
                    params.division1.name,
                    el.modal.divisionEdit));

                it('Проверка "Телефон"', async () => await dec.simpleText(el.modal.divisionEdit.inputGetValue,
                    ['Телефон', '', entry.max],
                    params.division1.phone,
                    el.modal.divisionEdit));

                it('Проверка "Описание"', async () => await dec.simpleText(el.modal.divisionEdit.inputGetValue,
                    ['Описание', '', entry.max],
                    params.division1.description,
                    el.modal.divisionEdit));

                it('Проверка "Сопровождающий"', async () => await dec.simpleText(el.select.getText,
                    ['Сопровождающий', `${params.division1.fio.lastName} ${params.division1.fio.firstName}`,
                        entry.max],
                    `${params.division1.fio.lastName} ${params.division1.fio.firstName}`,
                    el.select));

                it('Проверка значение 1 "Шаблон доступа для сотрудника"',
                    async () => await dec.simpleText(el.selectMulti.getText,
                        ['Шаблон доступа для сотрудника', 1, entry.min],
                        params.division1.template1,
                        el.selectMulti));

                it('Проверка значение 2 "Шаблон доступа для сотрудника"',
                    async () => await dec.simpleText(el.selectMulti.getText,
                        ['Шаблон доступа для сотрудника', 2, entry.min],
                        params.division1.template2,
                        el.selectMulti));

                it('Проверка "Шаблон доступа для посетителя"',
                    async () => await dec.simpleText(el.select.getText,
                        ['Шаблон доступа для посетителя',  params.division1.template3, entry.max],
                        params.division1.template3,
                        el.input));

                it('Проверка "График работы"', async () => await dec.simpleText(el.select.getText,
                    ['График работы',  params.division1.schedule, entry.max],
                    params.division1.schedule,
                    el.select));

                it('Нажатие кнопки закрытия модального окна',
                    async () => await dec.simple(el.modal.divisionEdit.closeHandler,
                        [entry.max],
                        el.modal.divisionEdit));

                it('Отсутствие модального окна "Редактировать подразделение"',
                    async () => await  dec.simple(el.modal.divisionEdit.initClose,
                        [entry.max],
                        el.modal.divisionEdit));

            });

            describe('Проверка подразделения 2 уровня', () => {

                it('Отображенние подразделения', async () => await dec.simple(page.division.division,
                    [[params.division1.name, params.division2.name], entry.max],
                    page.division));

                it('Нажатие по подразделению', async () => await dec.simple(page.division.handler,
                    [[params.division1.name, params.division2.name], entry.max],
                    page.division));

                it('Подразделение выделено', async () => await dec.simple(page.division.selected,
                    [params.division2.name, entry.max],
                    page.division));

                it('Нажатие кноки "Редактировать"', async () => await dec.simple(el.butIcBefore.handler,
                    [but.edit, entry.max],
                    el.butIcBefore));

                it('Отображение модального окна "Редактировать подразделение"',
                    async () => await  dec.simple(el.modal.divisionEdit.init,
                        [entry.max],
                        el.modal.divisionEdit));

                it('Проверка "Подразделение"', async () => await dec.simpleText(el.modal.divisionEdit.inputGetValue,
                    ['Подразделение', '', entry.max],
                    params.division2.name,
                    el.modal.divisionEdit));

                it('Проверка "Телефон"', async () => await dec.simpleText(el.modal.divisionEdit.inputGetValue,
                    ['Телефон', '', entry.max],
                    params.division2.phone,
                    el.modal.divisionEdit));

                it('Проверка "Описание"', async () => await dec.simpleText(el.modal.divisionEdit.inputGetValue,
                    ['Описание', '', entry.max],
                    params.division2.description,
                    el.modal.divisionEdit));

                it('Проверка "Сопровождающий"', async () => await dec.simpleText(el.select.getText,
                    ['Сопровождающий', `${params.division2.fio.lastName} ${params.division2.fio.firstName}`,
                        entry.max],
                    `${params.division2.fio.lastName} ${params.division2.fio.firstName}`,
                    el.select));

                it('Проверка значение 1 "Шаблон доступа для сотрудника"',
                    async () => await dec.simpleText(el.selectMulti.getText,
                        ['Шаблон доступа для сотрудника', 1, entry.min],
                        params.division2.template1,
                        el.selectMulti));

                it('Проверка значение 2 "Шаблон доступа для сотрудника"',
                    async () => await dec.simpleText(el.selectMulti.getText,
                        ['Шаблон доступа для сотрудника', 2, entry.min],
                        params.division2.template2,
                        el.selectMulti));

                it('Проверка "Шаблон доступа для посетителя"',
                    async () => await dec.simpleText(el.select.getText,
                        ['Шаблон доступа для посетителя',  params.division2.template3, entry.max],
                        params.division2.template3,
                        el.input));

                it('Проверка "График работы"', async () => await dec.simpleText(el.select.getText,
                    ['График работы',  params.division2.schedule, entry.max],
                    params.division2.schedule,
                    el.select));

                it('Нажатие кнопки закрытия модального окна',
                    async () => await dec.simple(el.modal.divisionEdit.closeHandler,
                        [entry.max],
                        el.modal.divisionEdit));

                it('Отсутствие модального окна "Редактировать подразделение"',
                    async () => await  dec.simple(el.modal.divisionEdit.initClose,
                        [entry.max],
                        el.modal.divisionEdit));

            });

        });

        deleteParams();
    });

    // Удаление необязательных параметров с минимальным количеством параметров у родительского и дочернего подразделения
    // с максимальным количеством параметров.
    const editMaxParams = () => describe('Подразделение. Редактирование. Удаление необязательных параметров ' +
        'с максимальным количеством параметров в подразделение 1 уровня и подразделние 2 уровня', () => {

        const params = {
            division1: {
                name: 'editMaxParamsName1',
                phone: 'editMaxParamsPhone1',
                description: 'editMaxParamsDescription1',
                fio: {
                    lastName: 'staff',
                    firstName: '1',
                    middleName: '' ,
                    divisionId: 1,
                    date: '2001-01-01'
                },
                template1: 'template11',
                template2: 'template12',
                template3: 'template13',
                schedule: 'schedule1',
            },
            division2: {
                name: 'editMaxParamsName2',
                phone: 'editMaxParamsPhone2',
                description: 'editMaxParamsDescription2',
                fio: {
                    lastName: 'staff',
                    firstName: '2',
                    middleName: '' ,
                    divisionId: 1,
                    date: '2001-01-01'
                },
                template1: 'template21',
                template2: 'template22',
                template3: 'template23',
                schedule: 'schedule2',
            },
        };

        describe('API - добавление', () => {
            bef();
            aft();
            addAccessTemplate(params.division1.template1, '');
            addAccessTemplate(params.division1.template2, '');
            addAccessTemplate(params.division1.template3, '');
            addAccessTemplate(params.division2.template1, '');
            addAccessTemplate(params.division2.template2, '');
            addAccessTemplate(params.division2.template3, '');
            addSchedule(params.division1.schedule);
            addSchedule(params.division2.schedule);
            addStaff(...Object.values(params.division1.fio));
            addStaff(...Object.values(params.division2.fio));
            it('Добавление подразделени 1 уровня', async () => {
                const cook = await page.base.getCookie('token');
                const getStaff = await api.getStaff(cook.text);
                const getTemplate = await api.getAccessTemplate(cook.text);
                const getSchedule = await api.getSchedule(cook.text);

                const obj = {
                    "parent_id": 0,
                    "name": params.division1.name,
                    "comment": params.division1.description,
                    "accompanying": getStaff.text[0]['id'],
                    "staff_access_template": [
                        getTemplate.text[0]['id'], getTemplate.text[1]['id']
                    ],
                    "visitor_access_template": getTemplate.text[2]['id'],
                    "work_schedule": getSchedule.text[0]['id'],
                    "tel": params.division1.phone
                };
                await dec.simple(api.putDivision,
                    [[obj], cook.text],
                    api.putDivision);
            });
            it('Добавление подразделени 2 уровня', async () => {
                const cook = await page.base.getCookie('token');
                const getStaff = await api.getStaff(cook.text);
                const getTemplate = await api.getAccessTemplate(cook.text);
                const getSchedule = await api.getSchedule(cook.text);
                const getDivision = await api.getDivision(cook.text);

                const obj = {
                    "parent_id": getDivision.text[0]['id'],
                    "name": params.division2.name,
                    "comment": params.division2.description,
                    "accompanying": getStaff.text[1]['id'],
                    "staff_access_template": [
                        getTemplate.text[3]['id'], getTemplate.text[4]['id']
                    ],
                    "visitor_access_template": getTemplate.text[5]['id'],
                    "work_schedule": getSchedule.text[1]['id'],
                    "tel": params.division2.phone
                };
                await dec.simple(api.putDivision,
                    [[obj], cook.text],
                    api.putDivision);
            });
        });

        describe('Проверка отображения в разделе', () => {
            bef();
            aft();

            describe('Общие проверки', () => {

                it('Отображние 3 подраздлениий', async () => await dec.simple(page.division.size,
                    [3, entry.max],
                    page.division));

            });

            describe('Проверка подразделения 1 уровня', () => {

                it('Отображенние подразделения', async () => await dec.simple(page.division.division,
                    [[params.division1.name], entry.max],
                    page.division));

                it('Нажатие по подразделению', async () => await dec.simple(page.division.handler,
                    [[params.division1.name], entry.max],
                    page.division));

                it('Подразделение выделено', async () => await dec.simple(page.division.selected,
                    [params.division1.name, entry.max],
                    page.division));

                it('Проверка "Телефон"', async () => await dec.simpleText(el.input.getValue,
                    ['Телефон', '', entry.max],
                    params.division1.phone,
                    el.input));

                it('Проверка "Описание"', async () => await dec.simpleText(el.input.getValue,
                    ['Описание', '', entry.max],
                    params.division1.description,
                    el.input));

                it('Проверка "Сопровождающий"', async () => await dec.simpleText(el.input.getValue,
                    ['Сопровождающий', '', entry.max],
                    `${params.division1.fio.lastName} ${params.division1.fio.firstName}`,
                    el.input));

                it('Проверка "Шаблон доступа для сотрудника"', async () => await dec.simpleText(el.input.getValue,
                    ['Шаблон доступа для сотрудника', '', entry.max],
                    `${params.division1.template1}, ${params.division1.template2}`,
                    el.input));

                it('Проверка "Шаблон доступа для посетителя"', async () => await dec.simpleText(el.input.getValue,
                    ['Шаблон доступа для посетителя', '', entry.max],
                    `${params.division1.template3}`,
                    el.input));

                it('Проверка "График работы"', async () => await dec.simpleText(el.input.getValue,
                    ['График работы', '', entry.max],
                    `${params.division1.schedule}`,
                    el.input));
            });

            describe('Проверка подразделения 2 уровня', () => {

                it('Отображенние подразделения', async () => await dec.simple(page.division.division,
                    [[params.division1.name, params.division2.name], entry.max],
                    page.division));

                it('Нажатие по подразделению', async () => await dec.simple(page.division.handler,
                    [[params.division1.name, params.division2.name], entry.max],
                    page.division));

                it('Подразделение выделено', async () => await dec.simple(page.division.selected,
                    [params.division2.name, entry.max],
                    page.division));

                it('Проверка "Телефон"', async () => await dec.simpleText(el.input.getValue,
                    ['Телефон', '', entry.max],
                    params.division2.phone,
                    el.input));

                it('Проверка "Описание"', async () => await dec.simpleText(el.input.getValue,
                    ['Описание', '', entry.max],
                    params.division2.description,
                    el.input));

                it('Проверка "Сопровождающий"', async () => await dec.simpleText(el.input.getValue,
                    ['Сопровождающий', '', entry.max],
                    `${params.division2.fio.lastName} ${params.division2.fio.firstName}`,
                    el.input));

                it('Проверка "Шаблон доступа для сотрудника"', async () => await dec.simpleText(el.input.getValue,
                    ['Шаблон доступа для сотрудника', '', entry.max],
                    `${params.division2.template1}, ${params.division2.template2}`,
                    el.input));

                it('Проверка "Шаблон доступа для посетителя"', async () => await dec.simpleText(el.input.getValue,
                    ['Шаблон доступа для посетителя', '', entry.max],
                    `${params.division2.template3}`,
                    el.input));

                it('Проверка "График работы"', async () => await dec.simpleText(el.input.getValue,
                    ['График работы', '', entry.max],
                    `${params.division2.schedule}`,
                    el.input));
            });
        });

        describe('Проверка параметров', () => {

            bef();
            aft();

            describe('Проверка подразделения 1 уровня', () => {

                it('Отображенние подразделения', async () => await dec.simple(page.division.division,
                    [[params.division1.name], entry.max],
                    page.division));

                it('Нажатие по подразделению', async () => await dec.simple(page.division.handler,
                    [[params.division1.name], entry.max],
                    page.division));

                it('Подразделение выделено', async () => await dec.simple(page.division.selected,
                    [params.division1.name, entry.max],
                    page.division));

                it('Нажатие кноки "Редактировать"', async () => await dec.simple(el.butIcBefore.handler,
                    [but.edit, entry.max],
                    el.butIcBefore));

                it('Отображение модального окна "Редактировать подразделение"',
                    async () => await  dec.simple(el.modal.divisionEdit.init,
                        [entry.max],
                        el.modal.divisionEdit));

                it('Проверка "Подразделение"', async () => await dec.simpleText(el.modal.divisionEdit.inputGetValue,
                    ['Подразделение', '', entry.max],
                    params.division1.name,
                    el.modal.divisionEdit));

                it('Проверка "Телефон"', async () => await dec.simpleText(el.modal.divisionEdit.inputGetValue,
                    ['Телефон', '', entry.max],
                    params.division1.phone,
                    el.modal.divisionEdit));

                it('Проверка "Описание"', async () => await dec.simpleText(el.modal.divisionEdit.inputGetValue,
                    ['Описание', '', entry.max],
                    params.division1.description,
                    el.modal.divisionEdit));

                it('Проверка "Сопровождающий"', async () => await dec.simpleText(el.select.getText,
                    ['Сопровождающий', `${params.division1.fio.lastName} ${params.division1.fio.firstName}`,
                        entry.max],
                    `${params.division1.fio.lastName} ${params.division1.fio.firstName}`,
                    el.select));

                it('Проверка значение 1 "Шаблон доступа для сотрудника"',
                    async () => await dec.simpleText(el.selectMulti.getText,
                        ['Шаблон доступа для сотрудника', 1, entry.min],
                        params.division1.template1,
                        el.selectMulti));

                it('Проверка значение 2 "Шаблон доступа для сотрудника"',
                    async () => await dec.simpleText(el.selectMulti.getText,
                        ['Шаблон доступа для сотрудника', 2, entry.min],
                        params.division1.template2,
                        el.selectMulti));

                it('Проверка "Шаблон доступа для посетителя"',
                    async () => await dec.simpleText(el.select.getText,
                        ['Шаблон доступа для посетителя',  params.division1.template3, entry.max],
                        params.division1.template3,
                        el.input));

                it('Проверка "График работы"', async () => await dec.simpleText(el.select.getText,
                    ['График работы',  params.division1.schedule, entry.max],
                    params.division1.schedule,
                    el.select));

                it('Нажатие кнопки закрытия модального окна',
                    async () => await dec.simple(el.modal.divisionEdit.closeHandler,
                        [entry.max],
                        el.modal.divisionEdit));

                it('Отсутствие модального окна "Редактировать подразделение"',
                    async () => await  dec.simple(el.modal.divisionEdit.initClose,
                        [entry.max],
                        el.modal.divisionEdit));

            });

            describe('Проверка подразделения 2 уровня', () => {

                it('Отображенние подразделения', async () => await dec.simple(page.division.division,
                    [[params.division1.name, params.division2.name], entry.max],
                    page.division));

                it('Нажатие по подразделению', async () => await dec.simple(page.division.handler,
                    [[params.division1.name, params.division2.name], entry.max],
                    page.division));

                it('Подразделение выделено', async () => await dec.simple(page.division.selected,
                    [params.division2.name, entry.max],
                    page.division));

                it('Нажатие кноки "Редактировать"', async () => await dec.simple(el.butIcBefore.handler,
                    [but.edit, entry.max],
                    el.butIcBefore));

                it('Отображение модального окна "Редактировать подразделение"',
                    async () => await  dec.simple(el.modal.divisionEdit.init,
                        [entry.max],
                        el.modal.divisionEdit));

                it('Проверка "Подразделение"', async () => await dec.simpleText(el.modal.divisionEdit.inputGetValue,
                    ['Подразделение', '', entry.max],
                    params.division2.name,
                    el.modal.divisionEdit));

                it('Проверка "Телефон"', async () => await dec.simpleText(el.modal.divisionEdit.inputGetValue,
                    ['Телефон', '', entry.max],
                    params.division2.phone,
                    el.modal.divisionEdit));

                it('Проверка "Описание"', async () => await dec.simpleText(el.modal.divisionEdit.inputGetValue,
                    ['Описание', '', entry.max],
                    params.division2.description,
                    el.modal.divisionEdit));

                it('Проверка "Сопровождающий"', async () => await dec.simpleText(el.select.getText,
                    ['Сопровождающий', `${params.division2.fio.lastName} ${params.division2.fio.firstName}`,
                        entry.max],
                    `${params.division2.fio.lastName} ${params.division2.fio.firstName}`,
                    el.select));

                it('Проверка значение 1 "Шаблон доступа для сотрудника"',
                    async () => await dec.simpleText(el.selectMulti.getText,
                        ['Шаблон доступа для сотрудника', 1, entry.min],
                        params.division2.template1,
                        el.selectMulti));

                it('Проверка значение 2 "Шаблон доступа для сотрудника"',
                    async () => await dec.simpleText(el.selectMulti.getText,
                        ['Шаблон доступа для сотрудника', 2, entry.min],
                        params.division2.template2,
                        el.selectMulti));

                it('Проверка "Шаблон доступа для посетителя"',
                    async () => await dec.simpleText(el.select.getText,
                        ['Шаблон доступа для посетителя',  params.division2.template3, entry.max],
                        params.division2.template3,
                        el.input));

                it('Проверка "График работы"', async () => await dec.simpleText(el.select.getText,
                    ['График работы',  params.division2.schedule, entry.max],
                    params.division2.schedule,
                    el.select));

                it('Нажатие кнопки закрытия модального окна',
                    async () => await dec.simple(el.modal.divisionEdit.closeHandler,
                        [entry.max],
                        el.modal.divisionEdit));

                it('Отсутствие модального окна "Редактировать подразделение"',
                    async () => await  dec.simple(el.modal.divisionEdit.initClose,
                        [entry.max],
                        el.modal.divisionEdit));

            });

        });

        describe('Редактирование подразделений', () => {
            bef();
            aft();

            describe('Редактирование подразделения 1 уровня', () => {

                it('Нажатие по подразделению 1 уровня', async () => await dec.simple(page.division.handler,
                    [[params.division1.name], entry.max],
                    page.division));

                it('Подразделение 1 уровня выделен', async () => await dec.simple(page.division.selected,
                    [params.division1.name, entry.max],
                    page.division));

                it('Нажатие кноки "Редактировать"', async () => await dec.simple(el.butIcBefore.handler,
                    [but.edit, entry.max],
                    el.butIcBefore));

                it('Отображение модального окна "Редактировать подразделение"',
                    async () => await  dec.simple(el.modal.divisionEdit.init,
                        [entry.max],
                        el.modal.divisionEdit));

                it('Удаление "Телефон"', async () => await dec.simple(el.modal.divisionEdit.inputBackSpace,
                    ['Телефон', '', entry.max],
                    el.modal.divisionEdit));

                it('Удаление "Описание"', async () => await dec.simple(el.modal.divisionEdit.inputBackSpace,
                    ['Описание', '', entry.max],
                    el.modal.divisionEdit));

                it('Удаление "Сопровождающий"', async () => await dec.simple(el.select.iconClear,
                    ['Сопровождающий', `${params.division1.fio.lastName} ${params.division1.fio.firstName}`,
                        entry.max],
                    el.select));

                it('Удаление "Шаблон доступа для сотрудника"',
                    async () => await dec.simple(el.selectMulti.iconClear,
                        ['Шаблон доступа для сотрудника', entry.max],
                        el.selectMulti));

                it('Удаление "Шаблон доступа для посетителя"', async () => await dec.simple(el.select.iconClear,
                    ['Шаблон доступа для посетителя', params.division1.template3, entry.max],
                    el.select));

                it('Удаление "График работы"', async () => await dec.simple(el.select.iconClear,
                    ['График работы', params.division1.schedule, entry.max],
                    el.select));

                it('Нажатие кнопки "Сохранить"', async () => await dec.simple(el.button.handler,
                    ["Сохранить", entry.max],
                    el.button));

                it('Отображение сообщения "Подразделение успешно отредактировано!"',
                    async () => await dec.simple(el.success.success,
                        ['Подразделение успешно отредактировано!', entry.max],
                        el.success));

                it('Отсутствие модального окна "Редактировать подразделение"',
                    async () => await  dec.simple(el.modal.divisionEdit.initClose,
                        [entry.max],
                        el.modal.divisionEdit));
            });

            describe('Редактирование подразделения 2 уровня', () => {

                it('Нажатие по подразделению 2 уровня', async () => await dec.simple(page.division.handler,
                    [[params.division1.name, params.division2.name], entry.max],
                    page.division));

                it('Подразделение 2 уровня выделен', async () => await dec.simple(page.division.selected,
                    [params.division2.name, entry.max],
                    page.division));

                it('Нажатие кноки "Редактировать"', async () => await dec.simple(el.butIcBefore.handler,
                    [but.edit, entry.max],
                    el.butIcBefore));

                it('Отображение модального окна "Редактировать подразделение"',
                    async () => await  dec.simple(el.modal.divisionEdit.init,
                        [entry.max],
                        el.modal.divisionEdit));

                it('Удаление "Телефон"', async () => await dec.simple(el.modal.divisionEdit.inputBackSpace,
                    ['Телефон', '', entry.max],
                    el.modal.divisionEdit));

                it('Удаление "Описание"', async () => await dec.simple(el.modal.divisionEdit.inputBackSpace,
                    ['Описание', '', entry.max],
                    el.modal.divisionEdit));

                it('Удаление "Сопровождающий"', async () => await dec.simple(el.select.iconClear,
                    ['Сопровождающий', `${params.division2.fio.lastName} ${params.division2.fio.firstName}`,
                        entry.max],
                    el.select));

                it('Удаление "Шаблон доступа для сотрудника"',
                    async () => await dec.simple(el.selectMulti.iconClear,
                        ['Шаблон доступа для сотрудника', entry.max],
                        el.selectMulti));

                it('Удаление "Шаблон доступа для посетителя"', async () => await dec.simple(el.select.iconClear,
                    ['Шаблон доступа для посетителя', params.division2.template3, entry.max],
                    el.select));

                it('Удаление "График работы"', async () => await dec.simple(el.select.iconClear,
                    ['График работы', params.division2.schedule, entry.max],
                    el.select));

                it('Нажатие кнопки "Сохранить"', async () => await dec.simple(el.button.handler,
                    ["Сохранить", entry.max],
                    el.button));

                it('Отображение сообщения "Подразделение успешно отредактировано!"',
                    async () => await dec.simple(el.success.success,
                        ['Подразделение успешно отредактировано!', entry.max],
                        el.success));

                it('Отсутствие модального окна "Редактировать подразделение"',
                    async () => await  dec.simple(el.modal.divisionEdit.initClose,
                        [entry.max],
                        el.modal.divisionEdit));
            });
        });

        describe('Проверка отображения в разделе', () => {
            bef();
            aft();

            describe('Общие проверки', () => {

                it('Отображение 3 подраздление', async () => await dec.simple(page.division.size,
                    [3, entry.max],
                    page.division));

                it('Отображение добавленного подразделения 1 уровня', async ()=> await dec.simple(page.division.division,
                    [[params.division1.name], entry.max],
                    page.division));

                it('Отображение добавленного подразделения 2 уровня', async ()=> await dec.simple(page.division.division,
                    [[params.division1.name, params.division2.name], entry.max],
                    page.division));
            });

            describe('Проверка подразделения 1 уровня', () => {

                it('Отображенние подразделения', async () => await dec.simple(page.division.division,
                    [[params.division1.name], entry.max],
                    page.division));

                it('Нажатие по подразделению', async () => await dec.simple(page.division.handler,
                    [[params.division1.name], entry.max],
                    page.division));

                it('Подразделение выделено', async () => await dec.simple(page.division.selected,
                    [params.division1.name, entry.max],
                    page.division));

                it('Проверка "Телефон"', async () => await dec.simpleText(el.input.getValue,
                    ['Телефон', '', entry.max],
                    '',
                    el.input));

                it('Проверка "Описание"', async () => await dec.simpleText(el.input.getValue,
                    ['Описание', '', entry.max],
                    '',
                    el.input));

                it('Проверка "Сопровождающий"', async () => await dec.simpleText(el.input.getValue,
                    ['Сопровождающий', '', entry.max],
                    '',
                    el.input));

                it('Проверка "Шаблон доступа для сотрудника"', async () => await dec.simpleText(el.input.getValue,
                    ['Шаблон доступа для сотрудника', '', entry.max],
                    '',
                    el.input));

                it('Проверка "Шаблон доступа для посетителя"', async () => await dec.simpleText(el.input.getValue,
                    ['Шаблон доступа для посетителя', '', entry.max],
                    '',
                    el.input));

                it('Проверка "График работы"', async () => await dec.simpleText(el.input.getValue,
                    ['График работы', '', entry.max],
                    '',
                    el.input));
            });

            describe('Проверка подразделения 2 уровня', () => {

                it('Отображенние подразделения', async () => await dec.simple(page.division.division,
                    [[params.division1.name, params.division2.name], entry.max],
                    page.division));

                it('Нажатие по подразделению', async () => await dec.simple(page.division.handler,
                    [[params.division1.name, params.division2.name], entry.max],
                    page.division));

                it('Подразделение выделено', async () => await dec.simple(page.division.selected,
                    [params.division2.name, entry.max],
                    page.division));

                it('Проверка "Телефон"', async () => await dec.simpleText(el.input.getValue,
                    ['Телефон', '', entry.max],
                    '',
                    el.input));

                it('Проверка "Описание"', async () => await dec.simpleText(el.input.getValue,
                    ['Описание', '', entry.max],
                    '',
                    el.input));

                it('Проверка "Сопровождающий"', async () => await dec.simpleText(el.input.getValue,
                    ['Сопровождающий', '', entry.max],
                    '',
                    el.input));

                it('Проверка "Шаблон доступа для сотрудника"', async () => await dec.simpleText(el.input.getValue,
                    ['Шаблон доступа для сотрудника', '', entry.max],
                    '',
                    el.input));

                it('Проверка "Шаблон доступа для посетителя"', async () => await dec.simpleText(el.input.getValue,
                    ['Шаблон доступа для посетителя', '', entry.max],
                    '',
                    el.input));

                it('Проверка "График работы"', async () => await dec.simpleText(el.input.getValue,
                    ['График работы', '', entry.max],
                    '',
                    el.input));
            });
        });

        describe('Проверка параметров', () => {

            bef();
            aft();

            describe('Проверка подразделения 1 уровня', () => {

                it('Отображенние подразделения', async () => await dec.simple(page.division.division,
                    [[params.division1.name], entry.max],
                    page.division));

                it('Нажатие по подразделению', async () => await dec.simple(page.division.handler,
                    [[params.division1.name], entry.max],
                    page.division));

                it('Подразделение выделено', async () => await dec.simple(page.division.selected,
                    [params.division1.name, entry.max],
                    page.division));

                it('Нажатие кноки "Редактировать"', async () => await dec.simple(el.butIcBefore.handler,
                    [but.edit, entry.max],
                    el.butIcBefore));

                it('Отображение модального окна "Редактировать подразделение"',
                    async () => await  dec.simple(el.modal.divisionEdit.init,
                        [entry.max],
                        el.modal.divisionEdit));

                it('Проверка "Подразделение"', async () => await dec.simpleText(el.modal.divisionEdit.inputGetValue,
                    ['Подразделение', '', entry.max],
                    params.division1.name,
                    el.modal.divisionEdit));

                it('Проверка "Телефон"', async () => await dec.simpleText(el.modal.divisionEdit.inputGetValue,
                    ['Телефон', '', entry.max],
                    '',
                    el.modal.divisionEdit));

                it('Проверка "Описание"', async () => await dec.simpleText(el.modal.divisionEdit.inputGetValue,
                    ['Описание', '', entry.max],
                    '',
                    el.modal.divisionEdit));

                it('Проверка "Сопровождающий"', async () => await dec.simpleText(el.select.getText,
                    ['Сопровождающий', '', entry.max],
                    '',
                    el.select));

                it('Проверка "Шаблон доступа для сотрудника"',
                    async () => await dec.simpleFalse(el.selectMulti.getText,
                        ['Шаблон доступа для сотрудника', 1, entry.min],
                        el.selectMulti));

                it('Проверка "Шаблон доступа для посетителя"',
                    async () => await dec.simpleText(el.select.getText,
                        ['Шаблон доступа для посетителя',  '', entry.max],
                        '',
                        el.input));

                it('Проверка "График работы"', async () => await dec.simpleText(el.select.getText,
                    ['График работы', '', entry.max],
                    '',
                    el.select));

                it('Нажатие кнопки закрытия модального окна',
                    async () => await dec.simple(el.modal.divisionEdit.closeHandler,
                        [entry.max],
                        el.modal.divisionEdit));

                it('Отсутствие модального окна "Редактировать подразделение"',
                    async () => await  dec.simple(el.modal.divisionEdit.initClose,
                        [entry.max],
                        el.modal.divisionEdit));

            });

            describe('Проверка подразделения 2 уровня', () => {

                it('Отображенние подразделения', async () => await dec.simple(page.division.division,
                    [[params.division1.name, params.division2.name], entry.max],
                    page.division));

                it('Нажатие по подразделению', async () => await dec.simple(page.division.handler,
                    [[params.division1.name, params.division2.name], entry.max],
                    page.division));

                it('Подразделение выделено', async () => await dec.simple(page.division.selected,
                    [params.division2.name, entry.max],
                    page.division));

                it('Нажатие кноки "Редактировать"', async () => await dec.simple(el.butIcBefore.handler,
                    [but.edit, entry.max],
                    el.butIcBefore));

                it('Отображение модального окна "Редактировать подразделение"',
                    async () => await  dec.simple(el.modal.divisionEdit.init,
                        [entry.max],
                        el.modal.divisionEdit));

                it('Проверка "Подразделение"', async () => await dec.simpleText(el.modal.divisionEdit.inputGetValue,
                    ['Подразделение', '', entry.max],
                    params.division2.name,
                    el.modal.divisionEdit));

                it('Проверка "Телефон"', async () => await dec.simpleText(el.modal.divisionEdit.inputGetValue,
                    ['Телефон', '', entry.max],
                    '',
                    el.modal.divisionEdit));

                it('Проверка "Описание"', async () => await dec.simpleText(el.modal.divisionEdit.inputGetValue,
                    ['Описание', '', entry.max],
                    '',
                    el.modal.divisionEdit));

                it('Проверка "Сопровождающий"', async () => await dec.simpleText(el.select.getText,
                    ['Сопровождающий', '', entry.max],
                    '',
                    el.select));

                it('Проверка "Шаблон доступа для сотрудника"',
                    async () => await dec.simpleFalse(el.selectMulti.getText,
                        ['Шаблон доступа для сотрудника', 1, entry.min],
                        el.selectMulti));

                it('Проверка "Шаблон доступа для посетителя"',
                    async () => await dec.simpleText(el.select.getText,
                        ['Шаблон доступа для посетителя',  '', entry.max],
                        '',
                        el.input));

                it('Проверка "График работы"', async () => await dec.simpleText(el.select.getText,
                    ['График работы', '', entry.max],
                    '',
                    el.select));

                it('Нажатие кнопки закрытия модального окна',
                    async () => await dec.simple(el.modal.divisionEdit.closeHandler,
                        [entry.max],
                        el.modal.divisionEdit));

                it('Отсутствие модального окна "Редактировать подразделение"',
                    async () => await  dec.simple(el.modal.divisionEdit.initClose,
                        [entry.max],
                        el.modal.divisionEdit));

            });

        });

        deleteParams();
    });

    // Редактирование всех параметров родительского и дочернего подразделения с максимальным количеством параметров.
    const editAllParamsMaxParams = () => describe('Подразделение. Редактирование. Редактирование всех параметров ' +
        'пеодразделение 1 уровня и подразделени 2 уровня,c максимальным количеством параметров', () => {

        const params = {
            division1: {
                name: 'editMaxParamsName1',
                phone: 'editMaxParamsPhone1',
                description: 'editMaxParamsDescription1',
                fio: {
                    lastName: 'staff',
                    firstName: '1',
                    middleName: '' ,
                    divisionId: 1,
                    date: '2001-01-01'
                },
                template1: 'template11',
                template2: 'template12',
                template3: 'template13',
                schedule: 'schedule1',
            },
            division2: {
                name: 'editMaxParamsName2',
                phone: 'editMaxParamsPhone2',
                description: 'editMaxParamsDescription2',
                fio: {
                    lastName: 'staff',
                    firstName: '2',
                    middleName: '' ,
                    divisionId: 1,
                    date: '2001-01-01'
                },
                template1: 'template21',
                template2: 'template22',
                template3: 'template23',
                schedule: 'schedule2',
            },
            divisionUpdate1: {
                name: 'editMaxParamsNameUpdate1',
                phone: 'editMaxParamsPhoneUpdate1',
                description: 'editMaxParamsDescriptionUpdate1',
                fio: {
                    lastName: 'staffUpdate',
                    firstName: '1',
                    middleName: '' ,
                    divisionId: 1,
                    date: '2001-01-01'
                },
                template1: 'template1Update1',
                template2: 'template1Update2',
                template3: 'template1Update3',
                schedule: 'scheduleUpdate1',
            },
            divisionUpdate2: {
                name: 'editMaxParamsNameUpdate2',
                phone: 'editMaxParamsPhoneUpdate2',
                description: 'editMaxParamsDescriptionUpdate2',
                fio: {
                    lastName: 'staffUpdate',
                    firstName: '2',
                    middleName: '' ,
                    divisionId: 1,
                    date: '2001-01-01'
                },
                template1: 'templateUpdate21',
                template2: 'templateUpdate22',
                template3: 'templateUpdate23',
                schedule: 'scheduleUpdate2',
            },
        };

        describe('API - добавление', () => {
            bef();
            aft();
            addAccessTemplate(params.division1.template1, '');
            addAccessTemplate(params.division1.template2, '');
            addAccessTemplate(params.division1.template3, '');
            addAccessTemplate(params.division2.template1, '');
            addAccessTemplate(params.division2.template2, '');
            addAccessTemplate(params.division2.template3, '');
            addSchedule(params.division1.schedule);
            addSchedule(params.division2.schedule);
            addStaff(...Object.values(params.division1.fio));
            addStaff(...Object.values(params.division2.fio));
            it('Добавление подразделени 1 уровня', async () => {
                const cook = await page.base.getCookie('token');
                const getStaff = await api.getStaff(cook.text);
                const getTemplate = await api.getAccessTemplate(cook.text);
                const getSchedule = await api.getSchedule(cook.text);

                const obj = {
                    "parent_id": 0,
                    "name": params.division1.name,
                    "comment": params.division1.description,
                    "accompanying": getStaff.text[0]['id'],
                    "staff_access_template": [
                        getTemplate.text[0]['id'], getTemplate.text[1]['id']
                    ],
                    "visitor_access_template": getTemplate.text[2]['id'],
                    "work_schedule": getSchedule.text[0]['id'],
                    "tel": params.division1.phone
                };
                await dec.simple(api.putDivision,
                    [[obj], cook.text],
                    api.putDivision);
            });
            it('Добавление подразделени 2 уровня', async () => {
                const cook = await page.base.getCookie('token');
                const getStaff = await api.getStaff(cook.text);
                const getTemplate = await api.getAccessTemplate(cook.text);
                const getSchedule = await api.getSchedule(cook.text);
                const getDivision = await api.getDivision(cook.text);

                const obj = {
                    "parent_id": getDivision.text[0]['id'],
                    "name": params.division2.name,
                    "comment": params.division2.description,
                    "accompanying": getStaff.text[1]['id'],
                    "staff_access_template": [
                        getTemplate.text[3]['id'], getTemplate.text[4]['id']
                    ],
                    "visitor_access_template": getTemplate.text[5]['id'],
                    "work_schedule": getSchedule.text[1]['id'],
                    "tel": params.division2.phone
                };
                await dec.simple(api.putDivision,
                    [[obj], cook.text],
                    api.putDivision);
            });

            addAccessTemplate(params.divisionUpdate1.template1, '');
            addAccessTemplate(params.divisionUpdate1.template2, '');
            addAccessTemplate(params.divisionUpdate1.template3, '');
            addAccessTemplate(params.divisionUpdate2.template1, '');
            addAccessTemplate(params.divisionUpdate2.template2, '');
            addAccessTemplate(params.divisionUpdate2.template3, '');
            addSchedule(params.divisionUpdate1.schedule);
            addSchedule(params.divisionUpdate2.schedule);
            addStaff(...Object.values(params.divisionUpdate1.fio));
            addStaff(...Object.values(params.divisionUpdate2.fio));
        });

        describe('Проверка отображения в разделе', () => {
            bef();
            aft();

            describe('Общие проверки', () => {

                it('Отображние 3 подраздлениий', async () => await dec.simple(page.division.size,
                    [3, entry.max],
                    page.division));

            });

            describe('Проверка подразделения 1 уровня', () => {

                it('Отображенние подразделения', async () => await dec.simple(page.division.division,
                    [[params.division1.name], entry.max],
                    page.division));

                it('Нажатие по подразделению', async () => await dec.simple(page.division.handler,
                    [[params.division1.name], entry.max],
                    page.division));

                it('Подразделение выделено', async () => await dec.simple(page.division.selected,
                    [params.division1.name, entry.max],
                    page.division));

                it('Проверка "Телефон"', async () => await dec.simpleText(el.input.getValue,
                    ['Телефон', '', entry.max],
                    params.division1.phone,
                    el.input));

                it('Проверка "Описание"', async () => await dec.simpleText(el.input.getValue,
                    ['Описание', '', entry.max],
                    params.division1.description,
                    el.input));

                it('Проверка "Сопровождающий"', async () => await dec.simpleText(el.input.getValue,
                    ['Сопровождающий', '', entry.max],
                    `${params.division1.fio.lastName} ${params.division1.fio.firstName}`,
                    el.input));

                it('Проверка "Шаблон доступа для сотрудника"', async () => await dec.simpleText(el.input.getValue,
                    ['Шаблон доступа для сотрудника', '', entry.max],
                    `${params.division1.template1}, ${params.division1.template2}`,
                    el.input));

                it('Проверка "Шаблон доступа для посетителя"', async () => await dec.simpleText(el.input.getValue,
                    ['Шаблон доступа для посетителя', '', entry.max],
                    `${params.division1.template3}`,
                    el.input));

                it('Проверка "График работы"', async () => await dec.simpleText(el.input.getValue,
                    ['График работы', '', entry.max],
                    `${params.division1.schedule}`,
                    el.input));
            });

            describe('Проверка подразделения 2 уровня', () => {

                it('Отображенние подразделения', async () => await dec.simple(page.division.division,
                    [[params.division1.name, params.division2.name], entry.max],
                    page.division));

                it('Нажатие по подразделению', async () => await dec.simple(page.division.handler,
                    [[params.division1.name, params.division2.name], entry.max],
                    page.division));

                it('Подразделение выделено', async () => await dec.simple(page.division.selected,
                    [params.division2.name, entry.max],
                    page.division));

                it('Проверка "Телефон"', async () => await dec.simpleText(el.input.getValue,
                    ['Телефон', '', entry.max],
                    params.division2.phone,
                    el.input));

                it('Проверка "Описание"', async () => await dec.simpleText(el.input.getValue,
                    ['Описание', '', entry.max],
                    params.division2.description,
                    el.input));

                it('Проверка "Сопровождающий"', async () => await dec.simpleText(el.input.getValue,
                    ['Сопровождающий', '', entry.max],
                    `${params.division2.fio.lastName} ${params.division2.fio.firstName}`,
                    el.input));

                it('Проверка "Шаблон доступа для сотрудника"', async () => await dec.simpleText(el.input.getValue,
                    ['Шаблон доступа для сотрудника', '', entry.max],
                    `${params.division2.template1}, ${params.division2.template2}`,
                    el.input));

                it('Проверка "Шаблон доступа для посетителя"', async () => await dec.simpleText(el.input.getValue,
                    ['Шаблон доступа для посетителя', '', entry.max],
                    `${params.division2.template3}`,
                    el.input));

                it('Проверка "График работы"', async () => await dec.simpleText(el.input.getValue,
                    ['График работы', '', entry.max],
                    `${params.division2.schedule}`,
                    el.input));
            });
        });

        describe('Проверка параметров', () => {

            bef();
            aft();

            describe('Проверка подразделения 1 уровня', () => {

                it('Отображенние подразделения', async () => await dec.simple(page.division.division,
                    [[params.division1.name], entry.max],
                    page.division));

                it('Нажатие по подразделению', async () => await dec.simple(page.division.handler,
                    [[params.division1.name], entry.max],
                    page.division));

                it('Подразделение выделено', async () => await dec.simple(page.division.selected,
                    [params.division1.name, entry.max],
                    page.division));

                it('Нажатие кноки "Редактировать"', async () => await dec.simple(el.butIcBefore.handler,
                    [but.edit, entry.max],
                    el.butIcBefore));

                it('Отображение модального окна "Редактировать подразделение"',
                    async () => await  dec.simple(el.modal.divisionEdit.init,
                        [entry.max],
                        el.modal.divisionEdit));

                it('Проверка "Подразделение"', async () => await dec.simpleText(el.modal.divisionEdit.inputGetValue,
                    ['Подразделение', '', entry.max],
                    params.division1.name,
                    el.modal.divisionEdit));

                it('Проверка "Телефон"', async () => await dec.simpleText(el.modal.divisionEdit.inputGetValue,
                    ['Телефон', '', entry.max],
                    params.division1.phone,
                    el.modal.divisionEdit));

                it('Проверка "Описание"', async () => await dec.simpleText(el.modal.divisionEdit.inputGetValue,
                    ['Описание', '', entry.max],
                    params.division1.description,
                    el.modal.divisionEdit));

                it('Проверка "Сопровождающий"', async () => await dec.simpleText(el.select.getText,
                    ['Сопровождающий', `${params.division1.fio.lastName} ${params.division1.fio.firstName}`,
                        entry.max],
                    `${params.division1.fio.lastName} ${params.division1.fio.firstName}`,
                    el.select));

                it('Проверка значение 1 "Шаблон доступа для сотрудника"',
                    async () => await dec.simpleText(el.selectMulti.getText,
                        ['Шаблон доступа для сотрудника', 1, entry.min],
                        params.division1.template1,
                        el.selectMulti));

                it('Проверка значение 2 "Шаблон доступа для сотрудника"',
                    async () => await dec.simpleText(el.selectMulti.getText,
                        ['Шаблон доступа для сотрудника', 2, entry.min],
                        params.division1.template2,
                        el.selectMulti));

                it('Проверка "Шаблон доступа для посетителя"',
                    async () => await dec.simpleText(el.select.getText,
                        ['Шаблон доступа для посетителя',  params.division1.template3, entry.max],
                        params.division1.template3,
                        el.input));

                it('Проверка "График работы"', async () => await dec.simpleText(el.select.getText,
                    ['График работы',  params.division1.schedule, entry.max],
                    params.division1.schedule,
                    el.select));

                it('Нажатие кнопки закрытия модального окна',
                    async () => await dec.simple(el.modal.divisionEdit.closeHandler,
                        [entry.max],
                        el.modal.divisionEdit));

                it('Отсутствие модального окна "Редактировать подразделение"',
                    async () => await  dec.simple(el.modal.divisionEdit.initClose,
                        [entry.max],
                        el.modal.divisionEdit));

            });

            describe('Проверка подразделения 2 уровня', () => {

                it('Отображенние подразделения', async () => await dec.simple(page.division.division,
                    [[params.division1.name, params.division2.name], entry.max],
                    page.division));

                it('Нажатие по подразделению', async () => await dec.simple(page.division.handler,
                    [[params.division1.name, params.division2.name], entry.max],
                    page.division));

                it('Подразделение выделено', async () => await dec.simple(page.division.selected,
                    [params.division2.name, entry.max],
                    page.division));

                it('Нажатие кноки "Редактировать"', async () => await dec.simple(el.butIcBefore.handler,
                    [but.edit, entry.max],
                    el.butIcBefore));

                it('Отображение модального окна "Редактировать подразделение"',
                    async () => await  dec.simple(el.modal.divisionEdit.init,
                        [entry.max],
                        el.modal.divisionEdit));

                it('Проверка "Подразделение"', async () => await dec.simpleText(el.modal.divisionEdit.inputGetValue,
                    ['Подразделение', '', entry.max],
                    params.division2.name,
                    el.modal.divisionEdit));

                it('Проверка "Телефон"', async () => await dec.simpleText(el.modal.divisionEdit.inputGetValue,
                    ['Телефон', '', entry.max],
                    params.division2.phone,
                    el.modal.divisionEdit));

                it('Проверка "Описание"', async () => await dec.simpleText(el.modal.divisionEdit.inputGetValue,
                    ['Описание', '', entry.max],
                    params.division2.description,
                    el.modal.divisionEdit));

                it('Проверка "Сопровождающий"', async () => await dec.simpleText(el.select.getText,
                    ['Сопровождающий', `${params.division2.fio.lastName} ${params.division2.fio.firstName}`,
                        entry.max],
                    `${params.division2.fio.lastName} ${params.division2.fio.firstName}`,
                    el.select));

                it('Проверка значение 1 "Шаблон доступа для сотрудника"',
                    async () => await dec.simpleText(el.selectMulti.getText,
                        ['Шаблон доступа для сотрудника', 1, entry.min],
                        params.division2.template1,
                        el.selectMulti));

                it('Проверка значение 2 "Шаблон доступа для сотрудника"',
                    async () => await dec.simpleText(el.selectMulti.getText,
                        ['Шаблон доступа для сотрудника', 2, entry.min],
                        params.division2.template2,
                        el.selectMulti));

                it('Проверка "Шаблон доступа для посетителя"',
                    async () => await dec.simpleText(el.select.getText,
                        ['Шаблон доступа для посетителя',  params.division2.template3, entry.max],
                        params.division2.template3,
                        el.input));

                it('Проверка "График работы"', async () => await dec.simpleText(el.select.getText,
                    ['График работы',  params.division2.schedule, entry.max],
                    params.division2.schedule,
                    el.select));

                it('Нажатие кнопки закрытия модального окна',
                    async () => await dec.simple(el.modal.divisionEdit.closeHandler,
                        [entry.max],
                        el.modal.divisionEdit));

                it('Отсутствие модального окна "Редактировать подразделение"',
                    async () => await  dec.simple(el.modal.divisionEdit.initClose,
                        [entry.max],
                        el.modal.divisionEdit));

            });

        });

        describe('Редактирование подразделений', () => {
            bef();
            aft();

            describe('Редактирование подразделения 1 уровня', () => {

                it('Нажатие по подразделению 1 уровня', async () => await dec.simple(page.division.handler,
                    [[params.division1.name], entry.max],
                    page.division));

                it('Подразделение 1 уровня выделен', async () => await dec.simple(page.division.selected,
                    [params.division1.name, entry.max],
                    page.division));

                it('Нажатие кноки "Редактировать"', async () => await dec.simple(el.butIcBefore.handler,
                    [but.edit, entry.max],
                    el.butIcBefore));

                it('Отображение модального окна "Редактировать подразделение"',
                    async () => await  dec.simple(el.modal.divisionEdit.init,
                        [entry.max],
                        el.modal.divisionEdit));

                it('Удаление "Подразделение"', async () => await dec.simple(el.modal.divisionEdit.inputBackSpace,
                    ['Подразделение', '', entry.max],
                    el.modal.divisionEdit));

                it('Ввод "Подразделение"', async () => await dec.simple(el.modal.divisionEdit.inputSendKeys,
                    ['Подразделение', '', params.divisionUpdate1.name, entry.max],
                    el.modal.divisionEdit));

                it('Удаление "Телефон"', async () => await dec.simple(el.modal.divisionEdit.inputBackSpace,
                    ['Телефон', '', entry.max],
                    el.modal.divisionEdit));

                it('Ввод "Телефон"', async () => await dec.simple(el.modal.divisionEdit.inputSendKeys,
                    ['Телефон', '', params.divisionUpdate1.phone, entry.max],
                    el.modal.divisionEdit));

                it('Удаление "Описание"', async () => await dec.simple(el.modal.divisionEdit.inputBackSpace,
                    ['Описание', '', entry.max],
                    el.modal.divisionEdit));

                it('Ввод "Описание"', async () => await dec.simple(el.modal.divisionEdit.inputSendKeys,
                    ['Описание', '', params.divisionUpdate1.description, entry.max],
                    el.modal.divisionEdit));

                it('Удаление "Сопровождающий"', async () => await dec.simple(el.select.iconClear,
                    ['Сопровождающий', `${params.division1.fio.lastName} ${params.division1.fio.firstName}`,
                        entry.max],
                    el.select));

                it('Выбор "Сопровождающий"', async () => await dec.simple(el.select.iconXpand,
                    ['Сопровождающий', '',
                        `${params.divisionUpdate1.fio.lastName} ${params.divisionUpdate1.fio.firstName}`,
                        entry.max],
                    el.select));

                it('Удаление "Шаблон доступа для сотрудника"',
                    async () => await dec.simple(el.selectMulti.iconClear,
                        ['Шаблон доступа для сотрудника', entry.max],
                        el.selectMulti));

                it('Выбор значение 1 в "Шаблон доступа для сотрудника"',
                    async () => await dec.simple(el.selectMulti.iconXpandSelected,
                        ['Шаблон доступа для сотрудника', params.divisionUpdate1.template1, entry.max],
                        el.selectMulti));

                it('Выбор значение 2 в "Шаблон доступа для сотрудника"',
                    async () => await dec.simple(el.selectMulti.iconXpandSelected,
                        ['Шаблон доступа для сотрудника', params.divisionUpdate1.template2, entry.max],
                        el.selectMulti));

                it('Удаление "Шаблон доступа для посетителя"', async () => await dec.simple(el.select.iconClear,
                    ['Шаблон доступа для посетителя', params.division1.template3, entry.max],
                    el.select));

                it('Выбор "Шаблон доступа для посетителя"', async () => await dec.simple(el.select.iconXpand,
                    ['Шаблон доступа для посетителя', '', params.divisionUpdate1.template3, entry.max],
                    el.select));

                it('Удаление "График работы"', async () => await dec.simple(el.select.iconClear,
                    ['График работы', params.division1.schedule, entry.max],
                    el.select));

                it('Выбор "График работы"', async () => await dec.simple(el.select.iconXpand,
                    ['График работы', '', params.divisionUpdate1.schedule, entry.max],
                    el.select));

                it('Нажатие кнопки "Сохранить"', async () => await dec.simple(el.button.handler,
                    ["Сохранить", entry.max],
                    el.button));

                it('Отображение сообщения "Подразделение успешно отредактировано!"',
                    async () => await dec.simple(el.success.success,
                        ['Подразделение успешно отредактировано!', entry.max],
                        el.success));

                it('Отсутствие модального окна "Редактировать подразделение"',
                    async () => await  dec.simple(el.modal.divisionEdit.initClose,
                        [entry.max],
                        el.modal.divisionEdit));

            });

            describe('Редактирование подразделения 2 уровня', () => {

                it('Нажатие по подразделению 2 уровня', async () => await dec.simple(page.division.handler,
                    [[params.divisionUpdate1.name, params.division2.name], entry.max],
                    page.division));

                it('Подразделение 2 уровня выделен', async () => await dec.simple(page.division.selected,
                    [params.division2.name, entry.max],
                    page.division));

                it('Нажатие кноки "Редактировать"', async () => await dec.simple(el.butIcBefore.handler,
                    [but.edit, entry.max],
                    el.butIcBefore));

                it('Отображение модального окна "Редактировать подразделение"',
                    async () => await  dec.simple(el.modal.divisionEdit.init,
                        [entry.max],
                        el.modal.divisionEdit));

                it('Удаление "Подразделение"', async () => await dec.simple(el.modal.divisionEdit.inputBackSpace,
                    ['Подразделение', '', entry.max],
                    el.modal.divisionEdit));

                it('Ввод "Подразделение"', async () => await dec.simple(el.modal.divisionEdit.inputSendKeys,
                    ['Подразделение', '', params.divisionUpdate2.name, entry.max],
                    el.modal.divisionEdit));

                it('Удаление "Телефон"', async () => await dec.simple(el.modal.divisionEdit.inputBackSpace,
                    ['Телефон', '', entry.max],
                    el.modal.divisionEdit));

                it('Ввод "Телефон"', async () => await dec.simple(el.modal.divisionEdit.inputSendKeys,
                    ['Телефон', '', params.divisionUpdate2.phone, entry.max],
                    el.modal.divisionEdit));

                it('Удаление "Описание"', async () => await dec.simple(el.modal.divisionEdit.inputBackSpace,
                    ['Описание', '', entry.max],
                    el.modal.divisionEdit));

                it('Ввод "Описание"', async () => await dec.simple(el.modal.divisionEdit.inputSendKeys,
                    ['Описание', '', params.divisionUpdate2.description, entry.max],
                    el.modal.divisionEdit));

                it('Удаление "Сопровождающий"', async () => await dec.simple(el.select.iconClear,
                    ['Сопровождающий', `${params.division2.fio.lastName} ${params.division2.fio.firstName}`,
                        entry.max],
                    el.select));

                it('Выбор "Сопровождающий"', async () => await dec.simple(el.select.iconXpand,
                    ['Сопровождающий', '',
                        `${params.divisionUpdate2.fio.lastName} ${params.divisionUpdate2.fio.firstName}`,
                        entry.max],
                    el.select));

                it('Удаление "Шаблон доступа для сотрудника"',
                    async () => await dec.simple(el.selectMulti.iconClear,
                        ['Шаблон доступа для сотрудника', entry.max],
                        el.selectMulti));

                it('Выбор значение 1 в "Шаблон доступа для сотрудника"',
                    async () => await dec.simple(el.selectMulti.iconXpandSelected,
                        ['Шаблон доступа для сотрудника', params.divisionUpdate2.template1, entry.max],
                        el.selectMulti));

                it('Выбор значение 2 в "Шаблон доступа для сотрудника"',
                    async () => await dec.simple(el.selectMulti.iconXpandSelected,
                        ['Шаблон доступа для сотрудника', params.divisionUpdate2.template2, entry.max],
                        el.selectMulti));

                it('Удаление "Шаблон доступа для посетителя"', async () => await dec.simple(el.select.iconClear,
                    ['Шаблон доступа для посетителя', params.division2.template3, entry.max],
                    el.select));

                it('Выбор "Шаблон доступа для посетителя"', async () => await dec.simple(el.select.iconXpand,
                    ['Шаблон доступа для посетителя', '', params.divisionUpdate2.template3, entry.max],
                    el.select));

                it('Удаление "График работы"', async () => await dec.simple(el.select.iconClear,
                    ['График работы', params.division2.schedule, entry.max],
                    el.select));

                it('Выбор "График работы"', async () => await dec.simple(el.select.iconXpand,
                    ['График работы', '', params.divisionUpdate2.schedule, entry.max],
                    el.select));

                it('Нажатие кнопки "Сохранить"', async () => await dec.simple(el.button.handler,
                    ["Сохранить", entry.max],
                    el.button));

                it('Отображение сообщения "Подразделение успешно отредактировано!"',
                    async () => await dec.simple(el.success.success,
                        ['Подразделение успешно отредактировано!', entry.max],
                        el.success));

                it('Отсутствие модального окна "Редактировать подразделение"',
                    async () => await  dec.simple(el.modal.divisionEdit.initClose,
                        [entry.max],
                        el.modal.divisionEdit));

            });
        });

        describe('Проверка отображения в разделе', () => {
            bef();
            aft();

            describe('Общие проверки', () => {

                it('Отображние 3 подраздлениий', async () => await dec.simple(page.division.size,
                    [3, entry.max],
                    page.division));

            });

            describe('Проверка подразделения 1 уровня', () => {

                it('Отображенние подразделения', async () => await dec.simple(page.division.division,
                    [[params.divisionUpdate1.name], entry.max],
                    page.division));

                it('Нажатие по подразделению', async () => await dec.simple(page.division.handler,
                    [[params.divisionUpdate1.name], entry.max],
                    page.division));

                it('Подразделение выделено', async () => await dec.simple(page.division.selected,
                    [params.divisionUpdate1.name, entry.max],
                    page.division));

                it('Проверка "Телефон"', async () => await dec.simpleText(el.input.getValue,
                    ['Телефон', '', entry.max],
                    params.divisionUpdate1.phone,
                    el.input));

                it('Проверка "Описание"', async () => await dec.simpleText(el.input.getValue,
                    ['Описание', '', entry.max],
                    params.divisionUpdate1.description,
                    el.input));

                it('Проверка "Сопровождающий"', async () => await dec.simpleText(el.input.getValue,
                    ['Сопровождающий', '', entry.max],
                    `${params.divisionUpdate1.fio.lastName} ${params.divisionUpdate1.fio.firstName}`,
                    el.input));

                it('Проверка "Шаблон доступа для сотрудника"', async () => await dec.simpleText(el.input.getValue,
                    ['Шаблон доступа для сотрудника', '', entry.max],
                    `${params.divisionUpdate1.template1}, ${params.divisionUpdate1.template2}`,
                    el.input));

                it('Проверка "Шаблон доступа для посетителя"', async () => await dec.simpleText(el.input.getValue,
                    ['Шаблон доступа для посетителя', '', entry.max],
                    `${params.divisionUpdate1.template3}`,
                    el.input));

                it('Проверка "График работы"', async () => await dec.simpleText(el.input.getValue,
                    ['График работы', '', entry.max],
                    `${params.divisionUpdate1.schedule}`,
                    el.input));
            });

            describe('Проверка подразделения 2 уровня', () => {

                it('Отображенние подразделения', async () => await dec.simple(page.division.division,
                    [[params.divisionUpdate1.name, params.divisionUpdate2.name], entry.max],
                    page.division));

                it('Нажатие по подразделению', async () => await dec.simple(page.division.handler,
                    [[params.divisionUpdate1.name, params.divisionUpdate2.name], entry.max],
                    page.division));

                it('Подразделение выделено', async () => await dec.simple(page.division.selected,
                    [params.divisionUpdate2.name, entry.max],
                    page.division));

                it('Проверка "Телефон"', async () => await dec.simpleText(el.input.getValue,
                    ['Телефон', '', entry.max],
                    params.divisionUpdate2.phone,
                    el.input));

                it('Проверка "Описание"', async () => await dec.simpleText(el.input.getValue,
                    ['Описание', '', entry.max],
                    params.divisionUpdate2.description,
                    el.input));

                it('Проверка "Сопровождающий"', async () => await dec.simpleText(el.input.getValue,
                    ['Сопровождающий', '', entry.max],
                    `${params.divisionUpdate2.fio.lastName} ${params.divisionUpdate2.fio.firstName}`,
                    el.input));

                it('Проверка "Шаблон доступа для сотрудника"', async () => await dec.simpleText(el.input.getValue,
                    ['Шаблон доступа для сотрудника', '', entry.max],
                    `${params.divisionUpdate2.template1}, ${params.divisionUpdate2.template2}`,
                    el.input));

                it('Проверка "Шаблон доступа для посетителя"', async () => await dec.simpleText(el.input.getValue,
                    ['Шаблон доступа для посетителя', '', entry.max],
                    `${params.divisionUpdate2.template3}`,
                    el.input));

                it('Проверка "График работы"', async () => await dec.simpleText(el.input.getValue,
                    ['График работы', '', entry.max],
                    `${params.divisionUpdate2.schedule}`,
                    el.input));
            });
        });

        describe('Проверка параметров', () => {

            bef();
            aft();

            describe('Проверка подразделения 1 уровня', () => {

                it('Отображенние подразделения', async () => await dec.simple(page.division.division,
                    [[params.divisionUpdate1.name], entry.max],
                    page.division));

                it('Нажатие по подразделению', async () => await dec.simple(page.division.handler,
                    [[params.divisionUpdate1.name], entry.max],
                    page.division));

                it('Подразделение выделено', async () => await dec.simple(page.division.selected,
                    [params.divisionUpdate1.name, entry.max],
                    page.division));

                it('Нажатие кноки "Редактировать"', async () => await dec.simple(el.butIcBefore.handler,
                    [but.edit, entry.max],
                    el.butIcBefore));

                it('Отображение модального окна "Редактировать подразделение"',
                    async () => await  dec.simple(el.modal.divisionEdit.init,
                        [entry.max],
                        el.modal.divisionEdit));

                it('Проверка "Подразделение"', async () => await dec.simpleText(el.modal.divisionEdit.inputGetValue,
                    ['Подразделение', '', entry.max],
                    params.divisionUpdate1.name,
                    el.modal.divisionEdit));

                it('Проверка "Телефон"', async () => await dec.simpleText(el.modal.divisionEdit.inputGetValue,
                    ['Телефон', '', entry.max],
                    params.divisionUpdate1.phone,
                    el.modal.divisionEdit));

                it('Проверка "Описание"', async () => await dec.simpleText(el.modal.divisionEdit.inputGetValue,
                    ['Описание', '', entry.max],
                    params.divisionUpdate1.description,
                    el.modal.divisionEdit));

                it('Проверка "Сопровождающий"', async () => await dec.simpleText(el.select.getText,
                    ['Сопровождающий',
                        `${params.divisionUpdate1.fio.lastName} ${params.divisionUpdate1.fio.firstName}`,
                        entry.max],
                    `${params.divisionUpdate1.fio.lastName} ${params.divisionUpdate1.fio.firstName}`,
                    el.select));

                it('Проверка значение 1 "Шаблон доступа для сотрудника"',
                    async () => await dec.simpleText(el.selectMulti.getText,
                        ['Шаблон доступа для сотрудника', 1, entry.min],
                        params.divisionUpdate1.template1,
                        el.selectMulti));

                it('Проверка значение 2 "Шаблон доступа для сотрудника"',
                    async () => await dec.simpleText(el.selectMulti.getText,
                        ['Шаблон доступа для сотрудника', 2, entry.min],
                        params.divisionUpdate1.template2,
                        el.selectMulti));

                it('Проверка "Шаблон доступа для посетителя"',
                    async () => await dec.simpleText(el.select.getText,
                        ['Шаблон доступа для посетителя',  params.divisionUpdate1.template3, entry.max],
                        params.divisionUpdate1.template3,
                        el.input));

                it('Проверка "График работы"', async () => await dec.simpleText(el.select.getText,
                    ['График работы',  params.divisionUpdate1.schedule, entry.max],
                    params.divisionUpdate1.schedule,
                    el.select));

                it('Нажатие кнопки закрытия модального окна',
                    async () => await dec.simple(el.modal.divisionEdit.closeHandler,
                        [entry.max],
                        el.modal.divisionEdit));

                it('Отсутствие модального окна "Редактировать подразделение"',
                    async () => await  dec.simple(el.modal.divisionEdit.initClose,
                        [entry.max],
                        el.modal.divisionEdit));

            });

            describe('Проверка подразделения 2 уровня', () => {

                it('Отображенние подразделения', async () => await dec.simple(page.division.division,
                    [[params.divisionUpdate1.name, params.divisionUpdate2.name], entry.max],
                    page.division));

                it('Нажатие по подразделению', async () => await dec.simple(page.division.handler,
                    [[params.divisionUpdate1.name, params.divisionUpdate2.name], entry.max],
                    page.division));

                it('Подразделение выделено', async () => await dec.simple(page.division.selected,
                    [params.divisionUpdate2.name, entry.max],
                    page.division));

                it('Нажатие кноки "Редактировать"', async () => await dec.simple(el.butIcBefore.handler,
                    [but.edit, entry.max],
                    el.butIcBefore));

                it('Отображение модального окна "Редактировать подразделение"',
                    async () => await  dec.simple(el.modal.divisionEdit.init,
                        [entry.max],
                        el.modal.divisionEdit));

                it('Проверка "Подразделение"', async () => await dec.simpleText(el.modal.divisionEdit.inputGetValue,
                    ['Подразделение', '', entry.max],
                    params.divisionUpdate2.name,
                    el.modal.divisionEdit));

                it('Проверка "Телефон"', async () => await dec.simpleText(el.modal.divisionEdit.inputGetValue,
                    ['Телефон', '', entry.max],
                    params.divisionUpdate2.phone,
                    el.modal.divisionEdit));

                it('Проверка "Описание"', async () => await dec.simpleText(el.modal.divisionEdit.inputGetValue,
                    ['Описание', '', entry.max],
                    params.divisionUpdate2.description,
                    el.modal.divisionEdit));

                it('Проверка "Сопровождающий"', async () => await dec.simpleText(el.select.getText,
                    ['Сопровождающий', `${params.divisionUpdate2.fio.lastName} ${params.divisionUpdate2.fio.firstName}`,
                        entry.max],
                    `${params.divisionUpdate2.fio.lastName} ${params.divisionUpdate2.fio.firstName}`,
                    el.select));

                it('Проверка значение 1 "Шаблон доступа для сотрудника"',
                    async () => await dec.simpleText(el.selectMulti.getText,
                        ['Шаблон доступа для сотрудника', 1, entry.min],
                        params.divisionUpdate2.template1,
                        el.selectMulti));

                it('Проверка значение 2 "Шаблон доступа для сотрудника"',
                    async () => await dec.simpleText(el.selectMulti.getText,
                        ['Шаблон доступа для сотрудника', 2, entry.min],
                        params.divisionUpdate2.template2,
                        el.selectMulti));

                it('Проверка "Шаблон доступа для посетителя"',
                    async () => await dec.simpleText(el.select.getText,
                        ['Шаблон доступа для посетителя',  params.divisionUpdate2.template3, entry.max],
                        params.divisionUpdate2.template3,
                        el.input));

                it('Проверка "График работы"', async () => await dec.simpleText(el.select.getText,
                    ['График работы',  params.divisionUpdate2.schedule, entry.max],
                    params.divisionUpdate2.schedule,
                    el.select));

                it('Нажатие кнопки закрытия модального окна',
                    async () => await dec.simple(el.modal.divisionEdit.closeHandler,
                        [entry.max],
                        el.modal.divisionEdit));

                it('Отсутствие модального окна "Редактировать подразделение"',
                    async () => await  dec.simple(el.modal.divisionEdit.initClose,
                        [entry.max],
                        el.modal.divisionEdit));

            });

        });

        deleteParams();
    });

    // Редактирование всех параметров родительского и дочернего подразделения с максимальным количеством параметров,
    // через формы выбора: «Сопровождающий», «Шаблон доступа для сотрудника», «Шаблон доступа для посетителя»,
    // «График работы».
    const editAllParamsFormsMaxParams = () => describe('Подразделение. Редактирование. Редактирование всех параметров '+
        'пеодразделение 1 уровня и подразделени 2 уровня, c максимальным количеством параметров, через формы выбора: ' +
        '"Сопровождающий", "Шаблон доступа для сотрудника", "Шаблон доступа для посетителя", "График работы".', () => {

        const params = {
            division1: {
                name: 'editMaxParamsName1',
                phone: 'editMaxParamsPhone1',
                description: 'editMaxParamsDescription1',
                fio: {
                    lastName: 'staff',
                    firstName: '1',
                    middleName: '' ,
                    divisionId: 1,
                    date: '2001-01-01'
                },
                template1: 'template11',
                template2: 'template12',
                template3: 'template13',
                schedule: 'schedule1',
            },
            division2: {
                name: 'editMaxParamsName2',
                phone: 'editMaxParamsPhone2',
                description: 'editMaxParamsDescription2',
                fio: {
                    lastName: 'staff',
                    firstName: '2',
                    middleName: '' ,
                    divisionId: 1,
                    date: '2001-01-01'
                },
                template1: 'template21',
                template2: 'template22',
                template3: 'template23',
                schedule: 'schedule2',
            },
            divisionUpdate1: {
                name: 'editMaxParamsNameUpdate1',
                phone: 'editMaxParamsPhoneUpdate1',
                description: 'editMaxParamsDescriptionUpdate1',
                fio: {
                    lastName: 'staffUpdate',
                    firstName: '1',
                    middleName: '' ,
                    divisionId: 1,
                    date: '2001-01-01'
                },
                template1: 'template1Update1',
                template2: 'template1Update2',
                template3: 'template1Update3',
                schedule: 'scheduleUpdate1',
            },
            divisionUpdate2: {
                name: 'editMaxParamsNameUpdate2',
                phone: 'editMaxParamsPhoneUpdate2',
                description: 'editMaxParamsDescriptionUpdate2',
                fio: {
                    lastName: 'staffUpdate',
                    firstName: '2',
                    middleName: '' ,
                    divisionId: 1,
                    date: '2001-01-01'
                },
                template1: 'templateUpdate21',
                template2: 'templateUpdate22',
                template3: 'templateUpdate23',
                schedule: 'scheduleUpdate2',
            },
        };

        describe('API - добавление', () => {
            bef();
            aft();
            addAccessTemplate(params.division1.template1, '');
            addAccessTemplate(params.division1.template2, '');
            addAccessTemplate(params.division1.template3, '');
            addAccessTemplate(params.division2.template1, '');
            addAccessTemplate(params.division2.template2, '');
            addAccessTemplate(params.division2.template3, '');
            addSchedule(params.division1.schedule);
            addSchedule(params.division2.schedule);
            addStaff(...Object.values(params.division1.fio));
            addStaff(...Object.values(params.division2.fio));
            it('Добавление подразделени 1 уровня', async () => {
                const cook = await page.base.getCookie('token');
                const getStaff = await api.getStaff(cook.text);
                const getTemplate = await api.getAccessTemplate(cook.text);
                const getSchedule = await api.getSchedule(cook.text);

                const obj = {
                    "parent_id": 0,
                    "name": params.division1.name,
                    "comment": params.division1.description,
                    "accompanying": getStaff.text[0]['id'],
                    "staff_access_template": [
                        getTemplate.text[0]['id'], getTemplate.text[1]['id']
                    ],
                    "visitor_access_template": getTemplate.text[2]['id'],
                    "work_schedule": getSchedule.text[0]['id'],
                    "tel": params.division1.phone
                };
                await dec.simple(api.putDivision,
                    [[obj], cook.text],
                    api.putDivision);
            });
            it('Добавление подразделени 2 уровня', async () => {
                const cook = await page.base.getCookie('token');
                const getStaff = await api.getStaff(cook.text);
                const getTemplate = await api.getAccessTemplate(cook.text);
                const getSchedule = await api.getSchedule(cook.text);
                const getDivision = await api.getDivision(cook.text);

                const obj = {
                    "parent_id": getDivision.text[0]['id'],
                    "name": params.division2.name,
                    "comment": params.division2.description,
                    "accompanying": getStaff.text[1]['id'],
                    "staff_access_template": [
                        getTemplate.text[3]['id'], getTemplate.text[4]['id']
                    ],
                    "visitor_access_template": getTemplate.text[5]['id'],
                    "work_schedule": getSchedule.text[1]['id'],
                    "tel": params.division2.phone
                };
                await dec.simple(api.putDivision,
                    [[obj], cook.text],
                    api.putDivision);
            });

            addAccessTemplate(params.divisionUpdate1.template1, '');
            addAccessTemplate(params.divisionUpdate1.template2, '');
            addAccessTemplate(params.divisionUpdate1.template3, '');
            addAccessTemplate(params.divisionUpdate2.template1, '');
            addAccessTemplate(params.divisionUpdate2.template2, '');
            addAccessTemplate(params.divisionUpdate2.template3, '');
            addSchedule(params.divisionUpdate1.schedule);
            addSchedule(params.divisionUpdate2.schedule);
            addStaff(...Object.values(params.divisionUpdate1.fio));
            addStaff(...Object.values(params.divisionUpdate2.fio));
        });

        describe('Проверка отображения в разделе', () => {
            bef();
            aft();

            describe('Общие проверки', () => {

                it('Отображние 3 подраздлениий', async () => await dec.simple(page.division.size,
                    [3, entry.max],
                    page.division));

            });

            describe('Проверка подразделения 1 уровня', () => {

                it('Отображенние подразделения', async () => await dec.simple(page.division.division,
                    [[params.division1.name], entry.max],
                    page.division));

                it('Нажатие по подразделению', async () => await dec.simple(page.division.handler,
                    [[params.division1.name], entry.max],
                    page.division));

                it('Подразделение выделено', async () => await dec.simple(page.division.selected,
                    [params.division1.name, entry.max],
                    page.division));

                it('Проверка "Телефон"', async () => await dec.simpleText(el.input.getValue,
                    ['Телефон', '', entry.max],
                    params.division1.phone,
                    el.input));

                it('Проверка "Описание"', async () => await dec.simpleText(el.input.getValue,
                    ['Описание', '', entry.max],
                    params.division1.description,
                    el.input));

                it('Проверка "Сопровождающий"', async () => await dec.simpleText(el.input.getValue,
                    ['Сопровождающий', '', entry.max],
                    `${params.division1.fio.lastName} ${params.division1.fio.firstName}`,
                    el.input));

                it('Проверка "Шаблон доступа для сотрудника"', async () => await dec.simpleText(el.input.getValue,
                    ['Шаблон доступа для сотрудника', '', entry.max],
                    `${params.division1.template1}, ${params.division1.template2}`,
                    el.input));

                it('Проверка "Шаблон доступа для посетителя"', async () => await dec.simpleText(el.input.getValue,
                    ['Шаблон доступа для посетителя', '', entry.max],
                    `${params.division1.template3}`,
                    el.input));

                it('Проверка "График работы"', async () => await dec.simpleText(el.input.getValue,
                    ['График работы', '', entry.max],
                    `${params.division1.schedule}`,
                    el.input));
            });

            describe('Проверка подразделения 2 уровня', () => {

                it('Отображенние подразделения', async () => await dec.simple(page.division.division,
                    [[params.division1.name, params.division2.name], entry.max],
                    page.division));

                it('Нажатие по подразделению', async () => await dec.simple(page.division.handler,
                    [[params.division1.name, params.division2.name], entry.max],
                    page.division));

                it('Подразделение выделено', async () => await dec.simple(page.division.selected,
                    [params.division2.name, entry.max],
                    page.division));

                it('Проверка "Телефон"', async () => await dec.simpleText(el.input.getValue,
                    ['Телефон', '', entry.max],
                    params.division2.phone,
                    el.input));

                it('Проверка "Описание"', async () => await dec.simpleText(el.input.getValue,
                    ['Описание', '', entry.max],
                    params.division2.description,
                    el.input));

                it('Проверка "Сопровождающий"', async () => await dec.simpleText(el.input.getValue,
                    ['Сопровождающий', '', entry.max],
                    `${params.division2.fio.lastName} ${params.division2.fio.firstName}`,
                    el.input));

                it('Проверка "Шаблон доступа для сотрудника"', async () => await dec.simpleText(el.input.getValue,
                    ['Шаблон доступа для сотрудника', '', entry.max],
                    `${params.division2.template1}, ${params.division2.template2}`,
                    el.input));

                it('Проверка "Шаблон доступа для посетителя"', async () => await dec.simpleText(el.input.getValue,
                    ['Шаблон доступа для посетителя', '', entry.max],
                    `${params.division2.template3}`,
                    el.input));

                it('Проверка "График работы"', async () => await dec.simpleText(el.input.getValue,
                    ['График работы', '', entry.max],
                    `${params.division2.schedule}`,
                    el.input));
            });
        });

        describe('Проверка параметров', () => {

            bef();
            aft();

            describe('Проверка подразделения 1 уровня', () => {

                it('Отображенние подразделения', async () => await dec.simple(page.division.division,
                    [[params.division1.name], entry.max],
                    page.division));

                it('Нажатие по подразделению', async () => await dec.simple(page.division.handler,
                    [[params.division1.name], entry.max],
                    page.division));

                it('Подразделение выделено', async () => await dec.simple(page.division.selected,
                    [params.division1.name, entry.max],
                    page.division));

                it('Нажатие кноки "Редактировать"', async () => await dec.simple(el.butIcBefore.handler,
                    [but.edit, entry.max],
                    el.butIcBefore));

                it('Отображение модального окна "Редактировать подразделение"',
                    async () => await  dec.simple(el.modal.divisionEdit.init,
                        [entry.max],
                        el.modal.divisionEdit));

                it('Проверка "Подразделение"', async () => await dec.simpleText(el.modal.divisionEdit.inputGetValue,
                    ['Подразделение', '', entry.max],
                    params.division1.name,
                    el.modal.divisionEdit));

                it('Проверка "Телефон"', async () => await dec.simpleText(el.modal.divisionEdit.inputGetValue,
                    ['Телефон', '', entry.max],
                    params.division1.phone,
                    el.modal.divisionEdit));

                it('Проверка "Описание"', async () => await dec.simpleText(el.modal.divisionEdit.inputGetValue,
                    ['Описание', '', entry.max],
                    params.division1.description,
                    el.modal.divisionEdit));

                it('Проверка "Сопровождающий"', async () => await dec.simpleText(el.select.getText,
                    ['Сопровождающий', `${params.division1.fio.lastName} ${params.division1.fio.firstName}`,
                        entry.max],
                    `${params.division1.fio.lastName} ${params.division1.fio.firstName}`,
                    el.select));

                it('Проверка значение 1 "Шаблон доступа для сотрудника"',
                    async () => await dec.simpleText(el.selectMulti.getText,
                        ['Шаблон доступа для сотрудника', 1, entry.min],
                        params.division1.template1,
                        el.selectMulti));

                it('Проверка значение 2 "Шаблон доступа для сотрудника"',
                    async () => await dec.simpleText(el.selectMulti.getText,
                        ['Шаблон доступа для сотрудника', 2, entry.min],
                        params.division1.template2,
                        el.selectMulti));

                it('Проверка "Шаблон доступа для посетителя"',
                    async () => await dec.simpleText(el.select.getText,
                        ['Шаблон доступа для посетителя',  params.division1.template3, entry.max],
                        params.division1.template3,
                        el.input));

                it('Проверка "График работы"', async () => await dec.simpleText(el.select.getText,
                    ['График работы',  params.division1.schedule, entry.max],
                    params.division1.schedule,
                    el.select));

                it('Нажатие кнопки закрытия модального окна',
                    async () => await dec.simple(el.modal.divisionEdit.closeHandler,
                        [entry.max],
                        el.modal.divisionEdit));

                it('Отсутствие модального окна "Редактировать подразделение"',
                    async () => await  dec.simple(el.modal.divisionEdit.initClose,
                        [entry.max],
                        el.modal.divisionEdit));

            });

            describe('Проверка подразделения 2 уровня', () => {

                it('Отображенние подразделения', async () => await dec.simple(page.division.division,
                    [[params.division1.name, params.division2.name], entry.max],
                    page.division));

                it('Нажатие по подразделению', async () => await dec.simple(page.division.handler,
                    [[params.division1.name, params.division2.name], entry.max],
                    page.division));

                it('Подразделение выделено', async () => await dec.simple(page.division.selected,
                    [params.division2.name, entry.max],
                    page.division));

                it('Нажатие кноки "Редактировать"', async () => await dec.simple(el.butIcBefore.handler,
                    [but.edit, entry.max],
                    el.butIcBefore));

                it('Отображение модального окна "Редактировать подразделение"',
                    async () => await  dec.simple(el.modal.divisionEdit.init,
                        [entry.max],
                        el.modal.divisionEdit));

                it('Проверка "Подразделение"', async () => await dec.simpleText(el.modal.divisionEdit.inputGetValue,
                    ['Подразделение', '', entry.max],
                    params.division2.name,
                    el.modal.divisionEdit));

                it('Проверка "Телефон"', async () => await dec.simpleText(el.modal.divisionEdit.inputGetValue,
                    ['Телефон', '', entry.max],
                    params.division2.phone,
                    el.modal.divisionEdit));

                it('Проверка "Описание"', async () => await dec.simpleText(el.modal.divisionEdit.inputGetValue,
                    ['Описание', '', entry.max],
                    params.division2.description,
                    el.modal.divisionEdit));

                it('Проверка "Сопровождающий"', async () => await dec.simpleText(el.select.getText,
                    ['Сопровождающий', `${params.division2.fio.lastName} ${params.division2.fio.firstName}`,
                        entry.max],
                    `${params.division2.fio.lastName} ${params.division2.fio.firstName}`,
                    el.select));

                it('Проверка значение 1 "Шаблон доступа для сотрудника"',
                    async () => await dec.simpleText(el.selectMulti.getText,
                        ['Шаблон доступа для сотрудника', 1, entry.min],
                        params.division2.template1,
                        el.selectMulti));

                it('Проверка значение 2 "Шаблон доступа для сотрудника"',
                    async () => await dec.simpleText(el.selectMulti.getText,
                        ['Шаблон доступа для сотрудника', 2, entry.min],
                        params.division2.template2,
                        el.selectMulti));

                it('Проверка "Шаблон доступа для посетителя"',
                    async () => await dec.simpleText(el.select.getText,
                        ['Шаблон доступа для посетителя',  params.division2.template3, entry.max],
                        params.division2.template3,
                        el.input));

                it('Проверка "График работы"', async () => await dec.simpleText(el.select.getText,
                    ['График работы',  params.division2.schedule, entry.max],
                    params.division2.schedule,
                    el.select));

                it('Нажатие кнопки закрытия модального окна',
                    async () => await dec.simple(el.modal.divisionEdit.closeHandler,
                        [entry.max],
                        el.modal.divisionEdit));

                it('Отсутствие модального окна "Редактировать подразделение"',
                    async () => await  dec.simple(el.modal.divisionEdit.initClose,
                        [entry.max],
                        el.modal.divisionEdit));

            });

        });

        describe('Редактирование подразделений', () => {

            bef();
            aft();

            describe('Редактирование подразделения 1 уровня', () => {

                it('Нажатие по подразделению 1 уровня', async () => await dec.simple(page.division.handler,
                    [[params.division1.name], entry.max],
                    page.division));

                it('Подразделение 1 уровня выделен', async () => await dec.simple(page.division.selected,
                    [params.division1.name, entry.max],
                    page.division));

                it('Нажатие кноки "Редактировать"', async () => await dec.simple(el.butIcBefore.handler,
                    [but.edit, entry.max],
                    el.butIcBefore));

                it('Отображение модального окна "Редактировать подразделение"',
                    async () => await  dec.simple(el.modal.divisionEdit.init,
                        [entry.max],
                        el.modal.divisionEdit));

                it('Удаление "Подразделение"', async () => await dec.simple(el.modal.divisionEdit.inputBackSpace,
                    ['Подразделение', '', entry.max],
                    el.modal.divisionEdit));

                it('Ввод "Подразделение"', async () => await dec.simple(el.modal.divisionEdit.inputSendKeys,
                    ['Подразделение', '', params.divisionUpdate1.name, entry.max],
                    el.modal.divisionEdit));

                it('Удаление "Телефон"', async () => await dec.simple(el.modal.divisionEdit.inputBackSpace,
                    ['Телефон', '', entry.max],
                    el.modal.divisionEdit));

                it('Ввод "Телефон"', async () => await dec.simple(el.modal.divisionEdit.inputSendKeys,
                    ['Телефон', '', params.divisionUpdate1.phone, entry.max],
                    el.modal.divisionEdit));

                it('Удаление "Описание"', async () => await dec.simple(el.modal.divisionEdit.inputBackSpace,
                    ['Описание', '', entry.max],
                    el.modal.divisionEdit));

                it('Ввод "Описание"', async () => await dec.simple(el.modal.divisionEdit.inputSendKeys,
                    ['Описание', '', params.divisionUpdate1.description, entry.max],
                    el.modal.divisionEdit));

                it('Удаление "Сопровождающий"', async () => await dec.simple(el.select.iconClear,
                    ['Сопровождающий', `${params.division1.fio.lastName} ${params.division1.fio.firstName}`,
                        entry.max],
                    el.select));

                it('Нажатие кнопки меню в выборе "Сопровождающий"', async () => await dec.simple(el.select.iconMenu,
                    ['Сопровождающий', '', entry.max],
                    el.select));

                it('Отображение модального окна "Сопровождающий"',
                    async () => await dec.simple(el.modal.divisionAdd.initStaff,
                        [entry.max],
                        el.modal.divisionAdd));

                it('Выбор сотрудника',
                    async () => await dec.simple(el.modal.divisionAdd.cellHandler,
                        [`${params.divisionUpdate1.fio.lastName} ${params.divisionUpdate1.fio.firstName}`,
                            entry.max],
                        el.modal.divisionAdd));

                it('Нажатие кнопки "Применить"', async () => await dec.simple(el.button.handler,
                    ['Применить', entry.max],
                    el.button));

                it('Отображение модального окна "Редактировать подразделение"',
                    async () => await  dec.simple(el.modal.divisionEdit.init,
                        [entry.max],
                        el.modal.divisionEdit));

                it('Удаление "Шаблон доступа для сотрудника"',
                    async () => await dec.simple(el.selectMulti.iconClear,
                        ['Шаблон доступа для сотрудника', entry.max],
                        el.selectMulti));

                it('Нажатие кнопки меню в выборе "Шаблон доступа для сотрудника"',
                    async () => await dec.simple(el.selectMulti.iconMenu,
                        ['Шаблон доступа для сотрудника', entry.max],
                        el.selectMulti));

                it('Отображение модального окна "Шаблон доступа для сотрудника"',
                    async () => await dec.simple(el.modal.divisionAdd.initTemplateStaff,
                        [entry.max],
                        el.modal.divisionAdd));

                it('Выбор шаблон доступа 1',
                    async () => await dec.simple(el.modal.divisionAdd.cellHandler,
                        [params.divisionUpdate1.template1, entry.max],
                        el.modal.divisionAdd));

                it('Выбор шаблон доступа 2',
                    async () => await dec.simple(el.modal.divisionAdd.cellHandler,
                        [params.divisionUpdate1.template2, entry.max],
                        el.modal.divisionAdd));

                it('Нажатие кнопки "Применить"', async () => await dec.simple(el.button.handler,
                    ['Применить', entry.max],
                    el.button));

                it('Отображение модального окна "Редактировать подразделение"',
                    async () => await  dec.simple(el.modal.divisionEdit.init,
                        [entry.max],
                        el.modal.divisionEdit));

                it('Удаление "Шаблон доступа для посетителя"', async () => await dec.simple(el.select.iconClear,
                    ['Шаблон доступа для посетителя', params.division1.template3, entry.max],
                    el.select));

                it('Нажатие кнопки меню в выборе "Шаблон доступа для посетителя"',
                    async () => await dec.simple(el.select.iconMenu,
                        ['Шаблон доступа для посетителя', '', entry.max],
                        el.select));

                it('Отображение модального окна "Шаблон доступа для посетителя"',
                    async () => await dec.simple(el.modal.divisionAdd.initTemplateUser,
                        [entry.max],
                        el.modal.divisionAdd));

                it('Выбор шаблон доступа',
                    async () => await dec.simple(el.modal.divisionAdd.cellHandler,
                        [params.divisionUpdate1.template3, entry.max],
                        el.modal.divisionAdd));

                it('Нажатие кнопки "Применить"', async () => await dec.simple(el.button.handler,
                    ['Применить', entry.max],
                    el.button));

                it('Отображение модального окна "Редактировать подразделение"',
                    async () => await  dec.simple(el.modal.divisionEdit.init,
                        [entry.max],
                        el.modal.divisionEdit));

                it('Удаление "График работы"', async () => await dec.simple(el.select.iconClear,
                    ['График работы', params.division1.schedule, entry.max],
                    el.select));

                it('Нажатие кнопки меню в выборе "График работы"',
                    async () => await dec.simple(el.select.iconMenu,
                        ['График работы', '', entry.max],
                        el.select));

                it('Отображение модального окна "График работы"',
                    async () => await dec.simple(el.modal.divisionAdd.initSchedule,
                        [entry.max],
                        el.modal.divisionAdd));

                it('Выбор "График работы"',
                    async () => await dec.simple(el.modal.divisionAdd.cellHandler,
                        [params.divisionUpdate1.schedule, entry.max],
                        el.modal.divisionAdd));

                it('Нажатие кнопки "Применить"', async () => await dec.simple(el.button.handler,
                    ['Применить', entry.max],
                    el.button));

                it('Отображение модального окна "Редактировать подразделение"',
                    async () => await  dec.simple(el.modal.divisionEdit.init,
                        [entry.max],
                        el.modal.divisionEdit));

                it('Нажатие кнопки "Сохранить"', async () => await dec.simple(el.button.handler,
                    ["Сохранить", entry.max],
                    el.button));

                it('Отображение сообщения "Подразделение успешно отредактировано!"',
                    async () => await dec.simple(el.success.success,
                        ['Подразделение успешно отредактировано!', entry.max],
                        el.success));

                it('Отсутствие модального окна "Редактировать подразделение"',
                    async () => await  dec.simple(el.modal.divisionEdit.initClose,
                        [entry.max],
                        el.modal.divisionEdit));
            });

            describe('Редактирование подразделения 2 уровня', () => {

                it('Нажатие по подразделению 2 уровня', async () => await dec.simple(page.division.handler,
                    [[params.divisionUpdate1.name, params.division2.name], entry.max],
                    page.division));

                it('Подразделение 2 уровня выделен', async () => await dec.simple(page.division.selected,
                    [params.division2.name, entry.max],
                    page.division));

                it('Нажатие кноки "Редактировать"', async () => await dec.simple(el.butIcBefore.handler,
                    [but.edit, entry.max],
                    el.butIcBefore));

                it('Отображение модального окна "Редактировать подразделение"',
                    async () => await  dec.simple(el.modal.divisionEdit.init,
                        [entry.max],
                        el.modal.divisionEdit));

                it('Удаление "Подразделение"', async () => await dec.simple(el.modal.divisionEdit.inputBackSpace,
                    ['Подразделение', '', entry.max],
                    el.modal.divisionEdit));

                it('Ввод "Подразделение"', async () => await dec.simple(el.modal.divisionEdit.inputSendKeys,
                    ['Подразделение', '', params.divisionUpdate2.name, entry.max],
                    el.modal.divisionEdit));

                it('Удаление "Телефон"', async () => await dec.simple(el.modal.divisionEdit.inputBackSpace,
                    ['Телефон', '', entry.max],
                    el.modal.divisionEdit));

                it('Ввод "Телефон"', async () => await dec.simple(el.modal.divisionEdit.inputSendKeys,
                    ['Телефон', '', params.divisionUpdate2.phone, entry.max],
                    el.modal.divisionEdit));

                it('Удаление "Описание"', async () => await dec.simple(el.modal.divisionEdit.inputBackSpace,
                    ['Описание', '', entry.max],
                    el.modal.divisionEdit));

                it('Ввод "Описание"', async () => await dec.simple(el.modal.divisionEdit.inputSendKeys,
                    ['Описание', '', params.divisionUpdate2.description, entry.max],
                    el.modal.divisionEdit));

                it('Удаление "Сопровождающий"', async () => await dec.simple(el.select.iconClear,
                    ['Сопровождающий', `${params.division2.fio.lastName} ${params.division2.fio.firstName}`,
                        entry.max],
                    el.select));

                it('Нажатие кнопки меню в выборе "Сопровождающий"', async () => await dec.simple(el.select.iconMenu,
                    ['Сопровождающий', '', entry.max],
                    el.select));

                it('Отображение модального окна "Сопровождающий"',
                    async () => await dec.simple(el.modal.divisionAdd.initStaff,
                        [entry.max],
                        el.modal.divisionAdd));

                it('Выбор сотрудника',
                    async () => await dec.simple(el.modal.divisionAdd.cellHandler,
                        [`${params.divisionUpdate2.fio.lastName} ${params.divisionUpdate2.fio.firstName}`,
                            entry.max],
                        el.modal.divisionAdd));

                it('Нажатие кнопки "Применить"', async () => await dec.simple(el.button.handler,
                    ['Применить', entry.max],
                    el.button));

                it('Отображение модального окна "Редактировать подразделение"',
                    async () => await  dec.simple(el.modal.divisionEdit.init,
                        [entry.max],
                        el.modal.divisionEdit));

                it('Удаление "Шаблон доступа для сотрудника"',
                    async () => await dec.simple(el.selectMulti.iconClear,
                        ['Шаблон доступа для сотрудника', entry.max],
                        el.selectMulti));

                it('Нажатие кнопки меню в выборе "Шаблон доступа для сотрудника"',
                    async () => await dec.simple(el.selectMulti.iconMenu,
                        ['Шаблон доступа для сотрудника', entry.max],
                        el.selectMulti));

                it('Отображение модального окна "Шаблон доступа для сотрудника"',
                    async () => await dec.simple(el.modal.divisionAdd.initTemplateStaff,
                        [entry.max],
                        el.modal.divisionAdd));

                it('Выбор шаблон доступа 1',
                    async () => await dec.simple(el.modal.divisionAdd.cellHandler,
                        [params.divisionUpdate2.template1, entry.max],
                        el.modal.divisionAdd));

                it('Выбор шаблон доступа 2',
                    async () => await dec.simple(el.modal.divisionAdd.cellHandler,
                        [params.divisionUpdate2.template2, entry.max],
                        el.modal.divisionAdd));

                it('Нажатие кнопки "Применить"', async () => await dec.simple(el.button.handler,
                    ['Применить', entry.max],
                    el.button));

                it('Отображение модального окна "Редактировать подразделение"',
                    async () => await  dec.simple(el.modal.divisionEdit.init,
                        [entry.max],
                        el.modal.divisionEdit));

                it('Удаление "Шаблон доступа для посетителя"', async () => await dec.simple(el.select.iconClear,
                    ['Шаблон доступа для посетителя', params.division2.template3, entry.max],
                    el.select));

                it('Нажатие кнопки меню в выборе "Шаблон доступа для посетителя"',
                    async () => await dec.simple(el.select.iconMenu,
                        ['Шаблон доступа для посетителя', '', entry.max],
                        el.select));

                it('Отображение модального окна "Шаблон доступа для посетителя"',
                    async () => await dec.simple(el.modal.divisionAdd.initTemplateUser,
                        [entry.max],
                        el.modal.divisionAdd));

                it('Выбор шаблон доступа',
                    async () => await dec.simple(el.modal.divisionAdd.cellHandler,
                        [params.divisionUpdate2.template3, entry.max],
                        el.modal.divisionAdd));

                it('Нажатие кнопки "Применить"', async () => await dec.simple(el.button.handler,
                    ['Применить', entry.max],
                    el.button));

                it('Отображение модального окна "Редактировать подразделение"',
                    async () => await  dec.simple(el.modal.divisionEdit.init,
                        [entry.max],
                        el.modal.divisionEdit));

                it('Удаление "График работы"', async () => await dec.simple(el.select.iconClear,
                    ['График работы', params.division2.schedule, entry.max],
                    el.select));

                it('Нажатие кнопки меню в выборе "График работы"',
                    async () => await dec.simple(el.select.iconMenu,
                        ['График работы', '', entry.max],
                        el.select));

                it('Отображение модального окна "График работы"',
                    async () => await dec.simple(el.modal.divisionAdd.initSchedule,
                        [entry.max],
                        el.modal.divisionAdd));

                it('Выбор "График работы"',
                    async () => await dec.simple(el.modal.divisionAdd.cellHandler,
                        [params.divisionUpdate2.schedule, entry.max],
                        el.modal.divisionAdd));

                it('Нажатие кнопки "Применить"', async () => await dec.simple(el.button.handler,
                    ['Применить', entry.max],
                    el.button));

                it('Отображение модального окна "Редактировать подразделение"',
                    async () => await  dec.simple(el.modal.divisionEdit.init,
                        [entry.max],
                        el.modal.divisionEdit));

                it('Нажатие кнопки "Сохранить"', async () => await dec.simple(el.button.handler,
                    ["Сохранить", entry.max],
                    el.button));

                it('Отображение сообщения "Подразделение успешно отредактировано!"',
                    async () => await dec.simple(el.success.success,
                        ['Подразделение успешно отредактировано!', entry.max],
                        el.success));

                it('Отсутствие модального окна "Редактировать подразделение"',
                    async () => await  dec.simple(el.modal.divisionEdit.initClose,
                        [entry.max],
                        el.modal.divisionEdit));
            });
        });

        describe('Проверка отображения в разделе', () => {
            bef();
            aft();

            describe('Общие проверки', () => {

                it('Отображние 3 подраздлениий', async () => await dec.simple(page.division.size,
                    [3, entry.max],
                    page.division));

            });

            describe('Проверка подразделения 1 уровня', () => {

                it('Отображенние подразделения', async () => await dec.simple(page.division.division,
                    [[params.divisionUpdate1.name], entry.max],
                    page.division));

                it('Нажатие по подразделению', async () => await dec.simple(page.division.handler,
                    [[params.divisionUpdate1.name], entry.max],
                    page.division));

                it('Подразделение выделено', async () => await dec.simple(page.division.selected,
                    [params.divisionUpdate1.name, entry.max],
                    page.division));

                it('Проверка "Телефон"', async () => await dec.simpleText(el.input.getValue,
                    ['Телефон', '', entry.max],
                    params.divisionUpdate1.phone,
                    el.input));

                it('Проверка "Описание"', async () => await dec.simpleText(el.input.getValue,
                    ['Описание', '', entry.max],
                    params.divisionUpdate1.description,
                    el.input));

                it('Проверка "Сопровождающий"', async () => await dec.simpleText(el.input.getValue,
                    ['Сопровождающий', '', entry.max],
                    `${params.divisionUpdate1.fio.lastName} ${params.divisionUpdate1.fio.firstName}`,
                    el.input));

                it('Проверка "Шаблон доступа для сотрудника"', async () => await dec.simpleText(el.input.getValue,
                    ['Шаблон доступа для сотрудника', '', entry.max],
                    `${params.divisionUpdate1.template1}, ${params.divisionUpdate1.template2}`,
                    el.input));

                it('Проверка "Шаблон доступа для посетителя"', async () => await dec.simpleText(el.input.getValue,
                    ['Шаблон доступа для посетителя', '', entry.max],
                    `${params.divisionUpdate1.template3}`,
                    el.input));

                it('Проверка "График работы"', async () => await dec.simpleText(el.input.getValue,
                    ['График работы', '', entry.max],
                    `${params.divisionUpdate1.schedule}`,
                    el.input));
            });

            describe('Проверка подразделения 2 уровня', () => {

                it('Отображенние подразделения', async () => await dec.simple(page.division.division,
                    [[params.divisionUpdate1.name, params.divisionUpdate2.name], entry.max],
                    page.division));

                it('Нажатие по подразделению', async () => await dec.simple(page.division.handler,
                    [[params.divisionUpdate1.name, params.divisionUpdate2.name], entry.max],
                    page.division));

                it('Подразделение выделено', async () => await dec.simple(page.division.selected,
                    [params.divisionUpdate2.name, entry.max],
                    page.division));

                it('Проверка "Телефон"', async () => await dec.simpleText(el.input.getValue,
                    ['Телефон', '', entry.max],
                    params.divisionUpdate2.phone,
                    el.input));

                it('Проверка "Описание"', async () => await dec.simpleText(el.input.getValue,
                    ['Описание', '', entry.max],
                    params.divisionUpdate2.description,
                    el.input));

                it('Проверка "Сопровождающий"', async () => await dec.simpleText(el.input.getValue,
                    ['Сопровождающий', '', entry.max],
                    `${params.divisionUpdate2.fio.lastName} ${params.divisionUpdate2.fio.firstName}`,
                    el.input));

                it('Проверка "Шаблон доступа для сотрудника"', async () => await dec.simpleText(el.input.getValue,
                    ['Шаблон доступа для сотрудника', '', entry.max],
                    `${params.divisionUpdate2.template1}, ${params.divisionUpdate2.template2}`,
                    el.input));

                it('Проверка "Шаблон доступа для посетителя"', async () => await dec.simpleText(el.input.getValue,
                    ['Шаблон доступа для посетителя', '', entry.max],
                    `${params.divisionUpdate2.template3}`,
                    el.input));

                it('Проверка "График работы"', async () => await dec.simpleText(el.input.getValue,
                    ['График работы', '', entry.max],
                    `${params.divisionUpdate2.schedule}`,
                    el.input));
            });
        });

        describe('Проверка параметров', () => {

            bef();
            aft();

            describe('Проверка подразделения 1 уровня', () => {

                it('Отображенние подразделения', async () => await dec.simple(page.division.division,
                    [[params.divisionUpdate1.name], entry.max],
                    page.division));

                it('Нажатие по подразделению', async () => await dec.simple(page.division.handler,
                    [[params.divisionUpdate1.name], entry.max],
                    page.division));

                it('Подразделение выделено', async () => await dec.simple(page.division.selected,
                    [params.divisionUpdate1.name, entry.max],
                    page.division));

                it('Нажатие кноки "Редактировать"', async () => await dec.simple(el.butIcBefore.handler,
                    [but.edit, entry.max],
                    el.butIcBefore));

                it('Отображение модального окна "Редактировать подразделение"',
                    async () => await  dec.simple(el.modal.divisionEdit.init,
                        [entry.max],
                        el.modal.divisionEdit));

                it('Проверка "Подразделение"', async () => await dec.simpleText(el.modal.divisionEdit.inputGetValue,
                    ['Подразделение', '', entry.max],
                    params.divisionUpdate1.name,
                    el.modal.divisionEdit));

                it('Проверка "Телефон"', async () => await dec.simpleText(el.modal.divisionEdit.inputGetValue,
                    ['Телефон', '', entry.max],
                    params.divisionUpdate1.phone,
                    el.modal.divisionEdit));

                it('Проверка "Описание"', async () => await dec.simpleText(el.modal.divisionEdit.inputGetValue,
                    ['Описание', '', entry.max],
                    params.divisionUpdate1.description,
                    el.modal.divisionEdit));

                it('Проверка "Сопровождающий"', async () => await dec.simpleText(el.select.getText,
                    ['Сопровождающий',
                        `${params.divisionUpdate1.fio.lastName} ${params.divisionUpdate1.fio.firstName}`,
                        entry.max],
                    `${params.divisionUpdate1.fio.lastName} ${params.divisionUpdate1.fio.firstName}`,
                    el.select));

                it('Проверка значение 1 "Шаблон доступа для сотрудника"',
                    async () => await dec.simpleText(el.selectMulti.getText,
                        ['Шаблон доступа для сотрудника', 1, entry.min],
                        params.divisionUpdate1.template1,
                        el.selectMulti));

                it('Проверка значение 2 "Шаблон доступа для сотрудника"',
                    async () => await dec.simpleText(el.selectMulti.getText,
                        ['Шаблон доступа для сотрудника', 2, entry.min],
                        params.divisionUpdate1.template2,
                        el.selectMulti));

                it('Проверка "Шаблон доступа для посетителя"',
                    async () => await dec.simpleText(el.select.getText,
                        ['Шаблон доступа для посетителя',  params.divisionUpdate1.template3, entry.max],
                        params.divisionUpdate1.template3,
                        el.input));

                it('Проверка "График работы"', async () => await dec.simpleText(el.select.getText,
                    ['График работы',  params.divisionUpdate1.schedule, entry.max],
                    params.divisionUpdate1.schedule,
                    el.select));

                it('Нажатие кнопки закрытия модального окна',
                    async () => await dec.simple(el.modal.divisionEdit.closeHandler,
                        [entry.max],
                        el.modal.divisionEdit));

                it('Отсутствие модального окна "Редактировать подразделение"',
                    async () => await  dec.simple(el.modal.divisionEdit.initClose,
                        [entry.max],
                        el.modal.divisionEdit));

            });

            describe('Проверка подразделения 2 уровня', () => {

                it('Отображенние подразделения', async () => await dec.simple(page.division.division,
                    [[params.divisionUpdate1.name, params.divisionUpdate2.name], entry.max],
                    page.division));

                it('Нажатие по подразделению', async () => await dec.simple(page.division.handler,
                    [[params.divisionUpdate1.name, params.divisionUpdate2.name], entry.max],
                    page.division));

                it('Подразделение выделено', async () => await dec.simple(page.division.selected,
                    [params.divisionUpdate2.name, entry.max],
                    page.division));

                it('Нажатие кноки "Редактировать"', async () => await dec.simple(el.butIcBefore.handler,
                    [but.edit, entry.max],
                    el.butIcBefore));

                it('Отображение модального окна "Редактировать подразделение"',
                    async () => await  dec.simple(el.modal.divisionEdit.init,
                        [entry.max],
                        el.modal.divisionEdit));

                it('Проверка "Подразделение"', async () => await dec.simpleText(el.modal.divisionEdit.inputGetValue,
                    ['Подразделение', '', entry.max],
                    params.divisionUpdate2.name,
                    el.modal.divisionEdit));

                it('Проверка "Телефон"', async () => await dec.simpleText(el.modal.divisionEdit.inputGetValue,
                    ['Телефон', '', entry.max],
                    params.divisionUpdate2.phone,
                    el.modal.divisionEdit));

                it('Проверка "Описание"', async () => await dec.simpleText(el.modal.divisionEdit.inputGetValue,
                    ['Описание', '', entry.max],
                    params.divisionUpdate2.description,
                    el.modal.divisionEdit));

                it('Проверка "Сопровождающий"', async () => await dec.simpleText(el.select.getText,
                    ['Сопровождающий', `${params.divisionUpdate2.fio.lastName} ${params.divisionUpdate2.fio.firstName}`,
                        entry.max],
                    `${params.divisionUpdate2.fio.lastName} ${params.divisionUpdate2.fio.firstName}`,
                    el.select));

                it('Проверка значение 1 "Шаблон доступа для сотрудника"',
                    async () => await dec.simpleText(el.selectMulti.getText,
                        ['Шаблон доступа для сотрудника', 1, entry.min],
                        params.divisionUpdate2.template1,
                        el.selectMulti));

                it('Проверка значение 2 "Шаблон доступа для сотрудника"',
                    async () => await dec.simpleText(el.selectMulti.getText,
                        ['Шаблон доступа для сотрудника', 2, entry.min],
                        params.divisionUpdate2.template2,
                        el.selectMulti));

                it('Проверка "Шаблон доступа для посетителя"',
                    async () => await dec.simpleText(el.select.getText,
                        ['Шаблон доступа для посетителя',  params.divisionUpdate2.template3, entry.max],
                        params.divisionUpdate2.template3,
                        el.input));

                it('Проверка "График работы"', async () => await dec.simpleText(el.select.getText,
                    ['График работы',  params.divisionUpdate2.schedule, entry.max],
                    params.divisionUpdate2.schedule,
                    el.select));

                it('Нажатие кнопки закрытия модального окна',
                    async () => await dec.simple(el.modal.divisionEdit.closeHandler,
                        [entry.max],
                        el.modal.divisionEdit));

                it('Отсутствие модального окна "Редактировать подразделение"',
                    async () => await  dec.simple(el.modal.divisionEdit.initClose,
                        [entry.max],
                        el.modal.divisionEdit));

            });

        });

        deleteParams();
    });

    // Скрытие - открытие подразделений с 3 вложенностью.
    const editHideShow = () => describe('Подразделение. Редактирование. Скрытие / открытие подразделений ' +
        'с 3 вложенностью', () => {

        const params = {
            name1: 'editHideShowName1',
            name2: 'editHideShowName2',
            name3: 'editHideShowName3'
        };

        describe('API - добавление', () => {
            bef();
            aft();

            it('Добавление подразделени 1 уровня', async () => {
                const cook = await page.base.getCookie('token');
                const obj = {
                    "parent_id": 0,
                    "name": params.name1
                };
                await dec.simple(api.putDivision,
                    [[obj], cook.text],
                    api.putDivision);
            });

            it('Добавление подразделени 2 уровня', async () => {
                const cook = await page.base.getCookie('token');
                const getDivision = await api.getDivision(cook.text);

                const obj = {
                    "parent_id": getDivision.text[0]['id'],
                    "name": params.name2
                };
                await dec.simple(api.putDivision,
                    [[obj], cook.text],
                    api.putDivision);
            });

            it('Добавление подразделени 3 уровня', async () => {
                const cook = await page.base.getCookie('token');
                const getDivision = await api.getDivision(cook.text);

                const obj = {
                    "parent_id": getDivision.text[1]['id'],
                    "name": params.name3
                };
                await dec.simple(api.putDivision,
                    [[obj], cook.text],
                    api.putDivision);
            });

        });

        describe('Проверка отображения в разделе', () => {
            bef();
            aft();

            describe('Общие проверки', () => {

                it('Отображние 4 подраздлениий', async () => await dec.simple(page.division.size,
                    [4, entry.max],
                    page.division));

            });

            describe('Проверка подразделения 1 уровня', () => {

                it('Отображенние подразделения', async () => await dec.simple(page.division.division,
                    [[params.name1], entry.max],
                    page.division));

                it('Нажатие по подразделению', async () => await dec.simple(page.division.handler,
                    [[params.name1], entry.max],
                    page.division));

                it('Подразделение выделено', async () => await dec.simple(page.division.selected,
                    [params.name1, entry.max],
                    page.division));
            });

            describe('Проверка подразделения 2 уровня', () => {

                it('Отображенние подразделения', async () => await dec.simple(page.division.division,
                    [[params.name1, params.name2], entry.max],
                    page.division));

                it('Нажатие по подразделению', async () => await dec.simple(page.division.handler,
                    [[params.name1, params.name2], entry.max],
                    page.division));

                it('Подразделение выделено', async () => await dec.simple(page.division.selected,
                    [params.name2, entry.max],
                    page.division));
            });

            describe('Проверка подразделения 3 уровня', () => {

                it('Отображенние подразделения', async () => await dec.simple(page.division.division,
                    [[params.name1, params.name2, params.name3], entry.max],
                    page.division));

                it('Нажатие по подразделению', async () => await dec.simple(page.division.handler,
                    [[params.name1, params.name2, params.name3], entry.max],
                    page.division));

                it('Подразделение выделено', async () => await dec.simple(page.division.selected,
                    [params.name3, entry.max],
                    page.division));
            });
        });

        describe('Скрытие / открытие подразделения 3 уровня', () => {

            bef();
            aft();

            describe('Скрытие подразделения 3 уровня', () => {

                it('Нажатие по иконки скрытия у подразделения 2 уровня',
                    async () => await dec.simple(page.division.minus,
                        [params.name2, entry.max],
                        page.division));

                it('Отсутствие подразделения 3 уровня',
                    async () => await dec.simple(page.division.noElement,
                        [[params.name1, params.name2, params.name3], entry.max],
                        page.division));

                it('Попытка нажатия по подразделению 3 уровня',
                    async () => await dec.simpleFalse(page.division.handler,
                        [[params.name1, params.name2, params.name3], entry.min],
                        page.division));
            });

            describe('Открытие подразделения 3 уровня', () => {

                it('Нажатие по иконки открытия у подразделения 2 уровня',
                    async () => await dec.simple(page.division.plus,
                        [params.name2, entry.max],
                        page.division));

                it('Отображения подразделения 3 уровня',
                    async () => await dec.simple(page.division.division,
                        [[params.name1, params.name2, params.name3], entry.max],
                        page.division));

                it('Нажатие по подразделению 3 уровня',
                    async () => await dec.simple(page.division.handler,
                        [[params.name1, params.name2, params.name3], entry.max],
                        page.division));

                it('Подразделение выделено', async () => await dec.simple(page.division.selected,
                    [params.name3, entry.max],
                    page.division));
            });
        });

        describe('Скрытие / открытие подразделений 2 уровня и 3 уровня', () => {

            bef();
            aft();

            describe('Скрытие подразделения 2 уровня и 3 уровня', () => {

                it('Нажатие по иконки скрытия у подразделения 1 уровня',
                    async () => await dec.simple(page.division.minus,
                        [params.name1, entry.max],
                        page.division));

                it('Отсутствие подразделения 2 уровня',
                    async () => await dec.simple(page.division.noElement,
                        [[params.name1, params.name2], entry.max],
                        page.division));

                it('Попытка нажатия по подразделению 2 уровня',
                    async () => await dec.simpleFalse(page.division.handler,
                        [[params.name1, params.name2], entry.min],
                        page.division));

                it('Отсутствие подразделения 3 уровня',
                    async () => await dec.simple(page.division.noElement,
                        [[params.name1, params.name2, params.name3], entry.max],
                        page.division));

                it('Попытка нажатия по подразделению 3 уровня',
                    async () => await dec.simpleFalse(page.division.handler,
                        [[params.name1, params.name2, params.name3], entry.min],
                        page.division));
            });

            describe('Открытие подразделения 2 уровня и 3 уровня', () => {

                it('Нажатие по иконки открытия у подразделения 1 уровня',
                    async () => await dec.simple(page.division.plus,
                        [params.name1, entry.max],
                        page.division));

                it('Отображения подразделения 2 уровня',
                    async () => await dec.simple(page.division.division,
                        [[params.name1, params.name2], entry.max],
                        page.division));

                it('Нажатие по подразделению 2 уровня',
                    async () => await dec.simple(page.division.handler,
                        [[params.name1, params.name2], entry.max],
                        page.division));

                it('Подразделение 2 уровня выделено', async () => await dec.simple(page.division.selected,
                    [params.name2, entry.max],
                    page.division));

                it('Отображения подразделения 3 уровня',
                    async () => await dec.simple(page.division.division,
                        [[params.name1, params.name2, params.name3], entry.max],
                        page.division));

                it('Нажатие по подразделению 2 уровня',
                    async () => await dec.simple(page.division.handler,
                        [[params.name1, params.name2, params.name3], entry.max],
                        page.division));

                it('Подразделение 3 уровня выделено', async () => await dec.simple(page.division.selected,
                    [params.name3, entry.max],
                    page.division));
            });
        });

        deleteParams();
    });

    // Попытка дублирования родительского  подразделения к корневому.
    const editDuplicateOneLevel = () => describe('Подразделение. Редактирование. Попытка дублирования подразделения ' +
        '1 уровня к подразделению 1 уровня', () => {

        const params = {
                name1: 'editDuplicateOneLevelName1',
                name2: 'editDuplicateOneLevelName2',
                error: 'Такое название уже используется'
            };

        describe('API - добавление', () => {
                bef();
                aft();

                const obj1 = {
                    parent_id: 0,
                    name: params.name1,
                };
                addDivision(obj1);

                const obj2 = {
                    parent_id: 0,
                    name: params.name2,
                };
                addDivision(obj2);
            });

        describe('Проверка списка подразделений', () => {

                bef();
                aft();

                it('Отображение 3 подраздление', async () => await dec.simple(page.division.size,
                    [3, entry.max],
                    page.division));

                it('Отображение добавленного подразделения 1', async ()=> await dec.simple(page.division.division,
                    [[params.name1], entry.max],
                    page.division));

                it('Отображение добавленного подразделения 2', async ()=> await dec.simple(page.division.division,
                    [[params.name2], entry.max],
                    page.division));
            });

        describe('Попытка редактирование подразделения 2', () => {
                bef();
                aft();

                it('Нажатие по подразделению', async () => await dec.simple(page.division.handler,
                    [[params.name2], entry.max],
                    page.division));

                it('Подразделение выделено', async () => await dec.simple(page.division.selected,
                    [params.name2, entry.max],
                    page.division));

                it('Нажатие кноки "Редактировать"', async () => await dec.simple(el.butIcBefore.handler,
                    [but.edit, entry.max],
                    el.butIcBefore));

                it('Отображение модального окна "Редактировать подразделение"',
                    async () => await  dec.simple(el.modal.divisionEdit.init,
                        [entry.max],
                        el.modal.divisionEdit));

                it('Удаление "Подразделение"', async () => await dec.simple(el.modal.divisionEdit.inputBackSpace,
                    ['Подразделение', '', entry.max],
                    el.modal.divisionEdit));

                it('Ввод "Подразделение"', async () => await dec.simple(el.modal.divisionEdit.inputSendKeys,
                    ['Подразделение', '', params.name1, entry.max],
                    el.modal.divisionEdit));

                it('Нажатие кнопки "Сохранить"', async () => await dec.simple(el.button.handler,
                    ["Сохранить", entry.max],
                    el.button));

                it('Отображение ошибки "Такое название уже используется"',
                    async () => await dec.simple(el.error.error,
                        [params.error, entry.max],
                        el.error));

                it('Модального окно "Редактировать подразделение" не закрыто',
                    async () => await  dec.simpleFalse(el.modal.divisionEdit.initClose,
                        [entry.min],
                        el.modal.divisionEdit));

                it('Нажатие кнопки закрытия модального окна',
                    async () => await dec.simple(el.modal.divisionEdit.closeHandler,
                        [entry.max],
                        el.modal.divisionEdit));

                it('Отсутствие модального окна "Добавить подразделение"',
                    async () => await  dec.simple(el.modal.divisionEdit.initClose,
                        [entry.max],
                        el.modal.divisionEdit));

            });

        describe('Проверка списка подразделений', () => {

                bef();
                aft();

                it('Отображение 3 подраздление', async () => await dec.simple(page.division.size,
                    [3, entry.max],
                    page.division));

                it('Отображение добавленного подразделения 1', async ()=> await dec.simple(page.division.division,
                    [[params.name1], entry.max],
                    page.division));

                it('Отображение добавленного подразделения 2', async ()=> await dec.simple(page.division.division,
                    [[params.name2], entry.max],
                    page.division));
            });

        deleteParams();
    });

    // Попытка дублирования родительского подразделения к дочернему.
    const editDuplicateTwoLevel = () => describe('Подразделение. Редактирование. Попытка дублирования подразделения ' +
        '1 уровня к подразделению 2 уровня', () => {

        const params = {
                name1: 'editDuplicateTwoLevelName1',
                name2: 'editDuplicateTwoLevelName2',
                name3: 'editDuplicateTwoLevelName3',
                error: 'Такое название уже используется'
            };

        describe('API - добавление', () => {
                bef();
                aft();

                it('Добавление подразделени 1 уровня - 1', async () => {
                    const cook = await page.base.getCookie('token');

                    const obj = {
                        "parent_id": 0,
                        "name": params.name1
                    };
                    await dec.simple(api.putDivision,
                        [[obj], cook.text],
                        api.putDivision);
                });
                it('Добавление подразделени 2 уровня - 1', async () => {
                    const cook = await page.base.getCookie('token');
                    const getDivision = await api.getDivision(cook.text);

                    const obj = {
                        "parent_id": getDivision.text[0]['id'],
                        "name": params.name2
                    };
                    await dec.simple(api.putDivision,
                        [[obj], cook.text],
                        api.putDivision);
                });
                it('Добавление подразделени 1 уровня - 2', async () => {
                    const cook = await page.base.getCookie('token');

                    const obj = {
                        "parent_id": 0,
                        "name": params.name3
                    };
                    await dec.simple(api.putDivision,
                        [[obj], cook.text],
                        api.putDivision);
                });
            });

        describe('Проверка списка подразделений', () => {

                bef();
                aft();

                it('Отображение 4 подраздление', async () => await dec.simple(page.division.size,
                    [4, entry.max],
                    page.division));

                it('Отображение добавленного подразделения 1 уровня - 1', async ()=> await dec.simple(page.division.division,
                    [[params.name1], entry.max],
                    page.division));

                it('Отображение добавленного подразделения 1 уровня - 2', async ()=> await dec.simple(page.division.division,
                    [[params.name1, params.name2], entry.max],
                    page.division));

                it('Отображение добавленного подразделения 1 уровня - 2', async ()=> await dec.simple(page.division.division,
                    [[params.name3], entry.max],
                    page.division));
            });

        describe('Попытка редактирование подразделения 1 уровня - 2', () => {
                bef();
                aft();

                it('Нажатие по подразделению', async () => await dec.simple(page.division.handler,
                    [[params.name3], entry.max],
                    page.division));

                it('Подразделение выделено', async () => await dec.simple(page.division.selected,
                    [params.name3, entry.max],
                    page.division));

                it('Нажатие кноки "Редактировать"', async () => await dec.simple(el.butIcBefore.handler,
                    [but.edit, entry.max],
                    el.butIcBefore));

                it('Отображение модального окна "Редактировать подразделение"',
                    async () => await  dec.simple(el.modal.divisionEdit.init,
                        [entry.max],
                        el.modal.divisionEdit));

                it('Удаление "Подразделение"', async () => await dec.simple(el.modal.divisionEdit.inputBackSpace,
                    ['Подразделение', '', entry.max],
                    el.modal.divisionEdit));

                it('Ввод "Подразделение"', async () => await dec.simple(el.modal.divisionEdit.inputSendKeys,
                    ['Подразделение', '', params.name2, entry.max],
                    el.modal.divisionEdit));

                it('Нажатие кнопки "Сохранить"', async () => await dec.simple(el.button.handler,
                    ["Сохранить", entry.max],
                    el.button));

                it('Отображение ошибки "Такое название уже используется"',
                    async () => await dec.simple(el.error.error,
                        [params.error, entry.max],
                        el.error));

                it('Модального окно "Редактировать подразделение" не закрыто',
                    async () => await  dec.simpleFalse(el.modal.divisionEdit.initClose,
                        [entry.min],
                        el.modal.divisionEdit));

                it('Нажатие кнопки закрытия модального окна',
                    async () => await dec.simple(el.modal.divisionEdit.closeHandler,
                        [entry.max],
                        el.modal.divisionEdit));

                it('Отсутствие модального окна "Добавить подразделение"',
                    async () => await  dec.simple(el.modal.divisionEdit.initClose,
                        [entry.max],
                        el.modal.divisionEdit));

            });

        describe('Проверка списка подразделений', () => {

                bef();
                aft();

                it('Отображение 4 подраздление', async () => await dec.simple(page.division.size,
                    [4, entry.max],
                    page.division));

                it('Отображение добавленного подразделения 1 уровня - 1', async ()=> await dec.simple(page.division.division,
                    [[params.name1], entry.max],
                    page.division));

                it('Отображение добавленного подразделения 1 уровня - 2', async ()=> await dec.simple(page.division.division,
                    [[params.name1, params.name2], entry.max],
                    page.division));

                it('Отображение добавленного подразделения 1 уровня - 2', async ()=> await dec.simple(page.division.division,
                    [[params.name3], entry.max],
                    page.division));
            });

        deleteParams();
    });

    // Попытка редактирования без "Подразделение".
    const editNoName = () => describe('Подразделение. Редактирование. Попытка редактирования без "Подразделение".',
        () => {

        const params = {
            name: 'editNoName',
            error: 'Поле "Подразделение" не может быть пустым'
        };

        describe('API - добавление', () => {
            bef();
            aft();

            const obj1 = {
                parent_id: 0,
                name: params.name,
            };
            addDivision(obj1);

        });

        describe('Проверка списка подразделений', () => {

            bef();
            aft();

            it('Отображение 2 подраздление', async () => await dec.simple(page.division.size,
                [2, entry.max],
                page.division));

            it('Отображение добавленного подразделения', async ()=> await dec.simple(page.division.division,
                [[params.name], entry.max],
                page.division));
        });

        describe('Попытка редактирование', () => {
            bef();
            aft();

            it('Нажатие по подразделению', async () => await dec.simple(page.division.handler,
                [[params.name], entry.max],
                page.division));

            it('Подразделение выделено', async () => await dec.simple(page.division.selected,
                [params.name, entry.max],
                page.division));

            it('Нажатие кноки "Редактировать"', async () => await dec.simple(el.butIcBefore.handler,
                [but.edit, entry.max],
                el.butIcBefore));

            it('Отображение модального окна "Редактировать подразделение"',
                async () => await  dec.simple(el.modal.divisionEdit.init,
                    [entry.max],
                    el.modal.divisionEdit));

            it('Удаление "Подразделение"', async () => await dec.simple(el.modal.divisionEdit.inputBackSpace,
                ['Подразделение', '', entry.max],
                el.modal.divisionEdit));

            it('Нажатие кнопки "Сохранить"', async () => await dec.simple(el.button.handler,
                ["Сохранить", entry.max],
                el.button));

            it('Отображение ошибки',
                async () => await dec.simple(el.error.error,
                    [params.error, entry.max],
                    el.error));

            it('Модального окно "Редактировать подразделение" не закрыто',
                async () => await  dec.simpleFalse(el.modal.divisionEdit.initClose,
                    [entry.min],
                    el.modal.divisionEdit));

            it('Нажатие кнопки закрытия модального окна',
                async () => await dec.simple(el.modal.divisionEdit.closeHandler,
                    [entry.max],
                    el.modal.divisionEdit));

            it('Отсутствие модального окна "Добавить подразделение"',
                async () => await  dec.simple(el.modal.divisionEdit.initClose,
                    [entry.max],
                    el.modal.divisionEdit));

        });

        describe('Проверка списка подразделений', () => {

            bef();
            aft();

            it('Отображение 2 подраздление', async () => await dec.simple(page.division.size,
                [2, entry.max],
                page.division));

            it('Отображение добавленного подразделения', async ()=> await dec.simple(page.division.division,
                [[params.name], entry.max],
                page.division));
        });

        deleteParams();
    });

    const edit = () => describe('Подразделение. Проверки редактирвоания.', () => {
        editMinParams();
        editMaxParams();
        editAllParamsMaxParams();
        editAllParamsFormsMaxParams();
        editHideShow();
        editDuplicateOneLevel();
        editDuplicateTwoLevel();
        editNoName();
    });

    return {
        editMinParams,
        editMaxParams,
        editAllParamsMaxParams,
        editAllParamsFormsMaxParams,
        editHideShow,
        editDuplicateOneLevel,
        editDuplicateTwoLevel,
        editNoName,
        edit
    }
};

// Тесты удаления
const remove = () => {

    // Удаление корневого подразделения.
    const deleteLevelOne = () => describe('Подразделение. Удаление. Удаление подразделения 1 уровня', () => {

        const params = {
            name: 'removeLevelOneName'
        };

        describe('API - добавление', () => {
            bef();
            aft();
            const obj = {
                parent_id: 0,
                name: params.name,
            };
            addDivision(obj);
        });

        describe('Проверка списка подразделений', () => {

            bef();
            aft();

            it('Отображение 2 подраздление', async () => await dec.simple(page.division.size,
                [2, entry.max],
                page.division));

            it('Отображение добавленного подразделения', async ()=> await dec.simple(page.division.division,
                [[params.name], entry.max],
                page.division));
        });

        describe('Удаление подразделения', () => {

            bef();
            aft();

            it('Нажатие по подразделению', async () => await dec.simple(page.division.handler,
                [[params.name], entry.max],
                page.division));

            it('Подразделение выделено', async () => await dec.simple(page.division.selected,
                [params.name, entry.max],
                page.division));

            it('Нажатие кноки "Удалить"', async () => await dec.simple(el.butIcBefore.handler,
                [but.delete, entry.max],
                el.butIcBefore));

            it('Отображение модального окна "Удаление подразделения"',
                async () => await dec.simple(el.modalConfirm.divisionDelete.init,
                    [entry.max],
                    el.modalConfirm.divisionDelete));

            it('Нажатие кноки "Удалить"', async () => await dec.simple(el.button.handler,
                ['Удалить', entry.max],
                el.button));

            it('Отображение сообщения "Выбранное подразделение было удалено"',
                async () => await dec.simple(el.success.success,
                    ['Выбранное подразделение было удалено', entry.max],
                    el.success));

            it('Отсутствие модального окна "Удаление подразделения"',
                async () => await dec.simple(el.modalConfirm.divisionDelete.initClose,
                    [entry.max],
                    el.modalConfirm.divisionDelete));

        });

        describe('Проверка списка подразделений', () => {

            bef();
            aft();

            it('Отображение 1 подраздление', async () => await dec.simple(page.division.size,
                [1, entry.max],
                page.division));

            it('Отсутствие добавленного подразделения', async ()=> await dec.simple(page.division.noElement,
                [[params.name], entry.max],
                page.division));
        });

        deleteParams();

    });

    // Удаление дочернего подразделения.
    const deleteLevelTwo = () => describe('Подразделение. Удаление. Удаление подразделения 2 уровня', () => {

        const params = {
            name1: 'deleteLevelTwo1',
            name2: 'deleteLevelTwo2'
        };

        describe('API - добавление', () => {
            bef();
            aft();
            describe('Добавление подразделения 1 уровня', () => {
                const obj = {
                    parent_id: 0,
                    name: params.name1,
                };
                addDivision(obj);
            });
            describe('Добавление подразделения 2 уровня', () => {
                it('Добавление подразделения', async () => {
                    const cook = await page.base.getCookie('token');
                    const get = await api.getDivision(cook.text);
                    const obj = {
                        parent_id: get.text[0]['id'],
                        name: params.name2
                    };
                    await dec.simple(api.putDivision,
                        [[obj], cook.text],
                        api.putDivision);
                });
            });
        });

        describe('Проверка отображения в разделе', () => {
            bef();
            aft();

            it('Отображение 3 подраздление', async () => await dec.simple(page.division.size,
                [3, entry.max],
                page.division));

            it('Отображение добавленного подразделения 1 уровня', async ()=> await dec.simple(page.division.division,
                [[params.name1], entry.max],
                page.division));

            it('Отображение добавленного подразделения 2 уровня', async ()=> await dec.simple(page.division.division,
                [[params.name1, params.name2], entry.max],
                page.division));
        });

        describe('Удаление подразделения', () => {

            bef();
            aft();

            it('Нажатие по подразделению', async () => await dec.simple(page.division.handler,
                [[params.name1, params.name2], entry.max],
                page.division));

            it('Подразделение выделено', async () => await dec.simple(page.division.selected,
                [params.name2, entry.max],
                page.division));

            it('Нажатие кноки "Удалить"', async () => await dec.simple(el.butIcBefore.handler,
                [but.delete, entry.max],
                el.butIcBefore));

            it('Отображение модального окна "Удаление подразделения"',
                async () => await dec.simple(el.modalConfirm.divisionDelete.init,
                    [entry.max],
                    el.modalConfirm.divisionDelete));

            it('Нажатие кноки "Удалить"', async () => await dec.simple(el.button.handler,
                ['Удалить', entry.max],
                el.button));

            it('Отображение сообщения "Выбранное подразделение было удалено"',
                async () => await dec.simple(el.success.success,
                    ['Выбранное подразделение было удалено', entry.max],
                    el.success));

            it('Отсутствие модального окна "Удаление подразделения"',
                async () => await dec.simple(el.modalConfirm.divisionDelete.initClose,
                    [entry.max],
                    el.modalConfirm.divisionDelete));

        });

        describe('Проверка отображения в разделе', () => {
            bef();
            aft();

            it('Отображение 2 подраздление', async () => await dec.simple(page.division.size,
                [2, entry.max],
                page.division));

            it('Отображение добавленного подразделения 1 уровня', async ()=> await dec.simple(page.division.division,
                [[params.name1], entry.max],
                page.division));

            it('Отсутствие добавленного подразделения 2 уровня', async ()=> await dec.simple(page.division.noElement,
                [[params.name1, params.name2], entry.max],
                page.division));
        });

        deleteParams();

    });

    // Попытка удалить родительское 1 уровня из списка вложенных 2 подразделений.
    const deleteLevelOneFailed = () => describe('Подразделение. Удаление. Попытка удаления подразделения 1 уровня ' +
        'из списка 2 вложенных подразделений.', () => {

        const params = {
            name1: 'deleteLevelOneFailed1',
            name2: 'deleteLevelOneFailed2',
            error: 'Нельзя удалить подразделение, содержащее дочерние подразделения'
        };

        describe('API - добавление', () => {
            bef();
            aft();
            describe('Добавление подразделения 1 уровня', () => {
                const obj = {
                    parent_id: 0,
                    name: params.name1,
                };
                addDivision(obj);
            });
            describe('Добавление подразделения 2 уровня', () => {
                it('Добавление подразделения', async () => {
                    const cook = await page.base.getCookie('token');
                    const get = await api.getDivision(cook.text);
                    const obj = {
                        parent_id: get.text[0]['id'],
                        name: params.name2
                    };
                    await dec.simple(api.putDivision,
                        [[obj], cook.text],
                        api.putDivision);
                });
            });
        });

        describe('Проверка отображения в разделе', () => {
            bef();
            aft();

            it('Отображение 3 подраздление', async () => await dec.simple(page.division.size,
                [3, entry.max],
                page.division));

            it('Отображение добавленного подразделения 1 уровня', async ()=> await dec.simple(page.division.division,
                [[params.name1], entry.max],
                page.division));

            it('Отображение добавленного подразделения 2 уровня', async ()=> await dec.simple(page.division.division,
                [[params.name1, params.name2], entry.max],
                page.division));
        });

        describe('Попытка удаления', () => {

            bef();
            aft();

            it('Нажатие по подразделению', async () => await dec.simple(page.division.handler,
                [[params.name1], entry.max],
                page.division));

            it('Подразделение выделено', async () => await dec.simple(page.division.selected,
                [params.name1, entry.max],
                page.division));

            it('Нажатие кноки "Удалить"', async () => await dec.simple(el.butIcBefore.handler,
                [but.delete, entry.max],
                el.butIcBefore));

            it('Отображение модального окна "Удаление подразделения"',
                async () => await dec.simple(el.modalConfirm.divisionDelete.init,
                    [entry.max],
                    el.modalConfirm.divisionDelete));

            it('Нажатие кноки "Удалить"', async () => await dec.simple(el.button.handler,
                ['Удалить', entry.max],
                el.button));

            it('Отображение ошибки "Нельзя удалить подразделение, содержащее дочерние подразделения"',
                async () => await dec.simple(el.error.error,
                    [params.error, entry.max],
                    el.error));

            it('Отсутствие модального окна "Удаление подразделения"',
                async () => await dec.simple(el.modalConfirm.divisionDelete.initClose,
                    [entry.max],
                    el.modalConfirm.divisionDelete));

        });

        describe('Проверка отображения в разделе', () => {
            bef();
            aft();

            it('Отображение 3 подраздление', async () => await dec.simple(page.division.size,
                [3, entry.max],
                page.division));

            it('Отображение добавленного подразделения 1 уровня', async ()=> await dec.simple(page.division.division,
                [[params.name1], entry.max],
                page.division));

            it('Отображение добавленного подразделения 2 уровня', async ()=> await dec.simple(page.division.division,
                [[params.name1, params.name2], entry.max],
                page.division));
        });

        deleteParams();
    });

    // Попытка удалить родительское 2 уровня из списка вложенных 3 подразделений.
    const deleteLevelTwoFailed = () => describe('Подразделение. Удаление. Попытка удаления подразделения 2 уровня ' +
        'из списка 3 вложенных подразделений.', () => {

        const params = {
            name1: 'deleteLevelTwoFailed1',
            name2: 'deleteLevelTwoFailed2',
            name3: 'deleteLevelTwoFailed3',
            error: 'Нельзя удалить подразделение, содержащее дочерние подразделения'
        };

        describe('API - добавление', () => {
            bef();
            aft();
            describe('Добавление подразделения 1 уровня', () => {
                const obj = {
                    parent_id: 0,
                    name: params.name1,
                };
                addDivision(obj);
            });
            describe('Добавление подразделения 2 уровня', () => {
                it('Добавление подразделения', async () => {
                    const cook = await page.base.getCookie('token');
                    const get = await api.getDivision(cook.text);
                    const obj = {
                        parent_id: get.text[0]['id'],
                        name: params.name2
                    };
                    await dec.simple(api.putDivision,
                        [[obj], cook.text],
                        api.putDivision);
                });
            });
            describe('Добавление подразделения 3 уровня', () => {
                it('Добавление подразделения', async () => {
                    const cook = await page.base.getCookie('token');
                    const get = await api.getDivision(cook.text);
                    const obj = {
                        parent_id: get.text[1]['id'],
                        name: params.name3
                    };
                    await dec.simple(api.putDivision,
                        [[obj], cook.text],
                        api.putDivision);
                });
            });
        });

        describe('Проверка отображения в разделе', () => {
            bef();
            aft();

            it('Отображение 4 подраздление', async () => await dec.simple(page.division.size,
                [4, entry.max],
                page.division));

            it('Отображение добавленного подразделения 1 уровня', async ()=> await dec.simple(page.division.division,
                [[params.name1], entry.max],
                page.division));

            it('Отображение добавленного подразделения 2 уровня', async ()=> await dec.simple(page.division.division,
                [[params.name1, params.name2], entry.max],
                page.division));

            it('Отображение добавленного подразделения 3 уровня', async ()=> await dec.simple(page.division.division,
                [[params.name1, params.name2, params.name3], entry.max],
                page.division));
        });

        describe('Попытка удаления', () => {

            bef();
            aft();

            it('Нажатие по подразделению', async () => await dec.simple(page.division.handler,
                [[params.name1, params.name2], entry.max],
                page.division));

            it('Подразделение выделено', async () => await dec.simple(page.division.selected,
                [params.name2, entry.max],
                page.division));

            it('Нажатие кноки "Удалить"', async () => await dec.simple(el.butIcBefore.handler,
                [but.delete, entry.max],
                el.butIcBefore));

            it('Отображение модального окна "Удаление подразделения"',
                async () => await dec.simple(el.modalConfirm.divisionDelete.init,
                    [entry.max],
                    el.modalConfirm.divisionDelete));

            it('Нажатие кноки "Удалить"', async () => await dec.simple(el.button.handler,
                ['Удалить', entry.max],
                el.button));

            it('Отображение ошибки "Нельзя удалить подразделение, содержащее дочерние подразделения"',
                async () => await dec.simple(el.error.error,
                    [params.error, entry.max],
                    el.error));

            it('Отсутствие модального окна "Удаление подразделения"',
                async () => await dec.simple(el.modalConfirm.divisionDelete.initClose,
                    [entry.max],
                    el.modalConfirm.divisionDelete));

        });

        describe('Проверка отображения в разделе', () => {
            bef();
            aft();

            it('Отображение 4 подраздление', async () => await dec.simple(page.division.size,
                [4, entry.max],
                page.division));

            it('Отображение добавленного подразделения 1 уровня', async ()=> await dec.simple(page.division.division,
                [[params.name1], entry.max],
                page.division));

            it('Отображение добавленного подразделения 2 уровня', async ()=> await dec.simple(page.division.division,
                [[params.name1, params.name2], entry.max],
                page.division));

            it('Отображение добавленного подразделения 3 уровня', async ()=> await dec.simple(page.division.division,
                [[params.name1, params.name2, params.name3], entry.max],
                page.division));
        });

        deleteParams();
    });

    // Попытка удаления подразделения добавленное сотруднику.
    const deleteStaffFailed = () => describe('Подразделение. Удаление. Попытка удаления подразделения добавленное ' +
        'сотруднику.', () => {

        const params = {
            name: 'deleteStaffFailed1',
            fio: {
                lastName: 'staff',
                firstName: '1',
                middleName: '' ,
                divisionId: '',
                date: '2001-01-01'
            },
            error: 'Подразделение используется и не может быть удалено'
        };

        describe('API - добавление', () => {
            bef();
            aft();

            const obj = {
                parent_id: 0,
                name: params.name,
            };
            addDivision(obj);

            it('Добавление сотрудника', async () => {
                const cook = await page.base.getCookie('token');
                const get = await api.getDivision(cook.text);

                const obj = {
                    "last_name": params.fio.lastName,
                    "first_name": params.fio.firstName,
                    "middle_name": params.fio.middleName,
                    "division": get.text[0]['id'],
                    "hiring_date": params.fio.date,
                };
                await dec.simple(api.putStaff,
                    [[obj], cook.text],
                    api.putStaff);
            });

        });

        describe('Проверка отображения в разделе', () => {
            bef();
            aft();

            it('Отображение 2 подраздление', async () => await dec.simple(page.division.size,
                [2, entry.max],
                page.division));

            it('Отображение добавленного подразделения', async ()=> await dec.simple(page.division.division,
                [[params.name], entry.max],
                page.division));

        });

        describe('Попытка удаления', () => {

            bef();
            aft();

            it('Нажатие по подразделению', async () => await dec.simple(page.division.handler,
                [[params.name], entry.max],
                page.division));

            it('Подразделение выделено', async () => await dec.simple(page.division.selected,
                [params.name, entry.max],
                page.division));

            it('Нажатие кноки "Удалить"', async () => await dec.simple(el.butIcBefore.handler,
                [but.delete, entry.max],
                el.butIcBefore));

            it('Отображение модального окна "Удаление подразделения"',
                async () => await dec.simple(el.modalConfirm.divisionDelete.init,
                    [entry.max],
                    el.modalConfirm.divisionDelete));

            it('Нажатие кноки "Удалить"', async () => await dec.simple(el.button.handler,
                ['Удалить', entry.max],
                el.button));

            it('Отображение ошибки "Подразделение используется и не может быть удалено"',
                async () => await dec.simple(el.error.error,
                    [params.error, entry.max],
                    el.error));

            it('Отсутствие модального окна "Удаление подразделения"',
                async () => await dec.simple(el.modalConfirm.divisionDelete.initClose,
                    [entry.max],
                    el.modalConfirm.divisionDelete));
        });

        describe('Проверка отображения в разделе', () => {
            bef();
            aft();

            it('Отображение 2 подраздление', async () => await dec.simple(page.division.size,
                [2, entry.max],
                page.division));

            it('Отображение добавленного подразделения', async ()=> await dec.simple(page.division.division,
                [[params.name], entry.max],
                page.division));

        });

        deleteParams();

    });

    // Попытка удаления подразделения добавленное посетителю.
    const deleteVisitorFailed = () => describe('Подразделение. Удаление. Попытка удаления подразделения добавленное ' +
        'посетителю.', () => {

        const params = {
            name: 'deleteVisitorFailed1',
            fio: {
                lastName: 'visitor',
                firstName: '1',
                middleName: '' ,
                divisionId: '',
            },
            error: 'Подразделение используется и не может быть удалено'
        };

        describe('API - добавление', () => {
            bef();
            aft();

            const obj = {
                parent_id: 0,
                name: params.name,
            };
            addDivision(obj);

            it('Добавление посетителя', async () => {
                const cook = await page.base.getCookie('token');
                const get = await api.getDivision(cook.text);

                const obj = {
                    "last_name": params.fio.lastName,
                    "first_name": params.fio.firstName,
                    "middle_name": params.fio.middleName,
                    "division": get.text[0]['id'],
                };
                await dec.simple(api.putVisitor,
                    [[obj], cook.text],
                    api.putVisitor);
            });

        });

        describe('Проверка отображения в разделе', () => {
            bef();
            aft();

            it('Отображение 2 подраздление', async () => await dec.simple(page.division.size,
                [2, entry.max],
                page.division));

            it('Отображение добавленного подразделения', async ()=> await dec.simple(page.division.division,
                [[params.name], entry.max],
                page.division));

        });

        describe('Попытка удаления', () => {

            bef();
            aft();

            it('Нажатие по подразделению', async () => await dec.simple(page.division.handler,
                [[params.name], entry.max],
                page.division));

            it('Подразделение выделено', async () => await dec.simple(page.division.selected,
                [params.name, entry.max],
                page.division));

            it('Нажатие кноки "Удалить"', async () => await dec.simple(el.butIcBefore.handler,
                [but.delete, entry.max],
                el.butIcBefore));

            it('Отображение модального окна "Удаление подразделения"',
                async () => await dec.simple(el.modalConfirm.divisionDelete.init,
                    [entry.max],
                    el.modalConfirm.divisionDelete));

            it('Нажатие кноки "Удалить"', async () => await dec.simple(el.button.handler,
                ['Удалить', entry.max],
                el.button));

            it('Отображение ошибки "Подразделение используется и не может быть удалено"',
                async () => await dec.simple(el.error.error,
                    [params.error, entry.max],
                    el.error));

            it('Отсутствие модального окна "Удаление подразделения"',
                async () => await dec.simple(el.modalConfirm.divisionDelete.initClose,
                    [entry.max],
                    el.modalConfirm.divisionDelete));
        });

        describe('Проверка отображения в разделе', () => {
            bef();
            aft();

            it('Отображение 2 подраздление', async () => await dec.simple(page.division.size,
                [2, entry.max],
                page.division));

            it('Отображение добавленного подразделения', async ()=> await dec.simple(page.division.division,
                [[params.name], entry.max],
                page.division));

        });

        deleteParams();

    });

    const remove = () => describe('Подразделение. Проверки удаления.', () => {
        deleteLevelOne();
        deleteLevelTwo();
        deleteLevelOneFailed();
        deleteLevelTwoFailed();
        deleteStaffFailed();
        deleteVisitorFailed();
    });

    return {
        deleteLevelOne,
        deleteLevelTwo,
        deleteLevelOneFailed,
        deleteLevelTwoFailed,
        deleteStaffFailed,
        deleteVisitorFailed,
        remove,
    }
};

//Тесты с пользовательсим подразделением "Администраторы системы"
const serviceDivision = () => {

    // Попытка добавить дочернее подразделение
    const addDivision = () => describe('Подразделение "Администраторы системы". ' +
        'Попытка добавить дочернее подразделение', () => {

        const params = {
            name1: 'Администраторы системы',
            name2: 'addDivision',
        };

        describe('Проверка отображения в разделе', () => {
            bef();
            aft();

            it('Отображение 1 подраздление', async () => await dec.simple(page.division.size,
                [1, entry.max],
                page.division));

            it('Отображение подразделения "Администраторы системы"', async ()=> await dec.simple(page.division.division,
                [[params.name1], entry.max],
                page.division));
        });

        describe('Попытка добавления', () => {

            bef();
            aft();

            it('Нажатие по подразделению', async () => await dec.simple(page.division.handler,
                [[params.name1], entry.max],
                page.division));

            it('Подразделение выделено', async () => await dec.simple(page.division.selected,
                [params.name1, entry.max],
                page.division));

            it('Нажатие кноки "Добавить"', async () => await dec.simple(el.butIcBefore.handler,
                [but.add, entry.min],
                el.butIcBefore));

            it('Отображение модального окна "Добавить подразделение"',
                async () => await dec.simple(el.modal.divisionAdd.init,
                    [entry.max],
                    el.modal.divisionAdd));

            it('Ввод "Подразделение"', async () => await dec.simple(el.input.sendKeys,
                ['Подразделение', '', params.name2, entry.max],
                el.input));

            it('Нажатие кноки "Сохранить"', async () => await dec.simple(el.button.handler,
                ['Сохранить', entry.max],
                el.button));

            it('Отсутствие модального окна "Добавить подразделение"',
                async () => await dec.simple(el.modal.divisionAdd.initClose,
                    [entry.max],
                    el.modal.divisionAdd));
        });

        describe('Проверка отображения в разделе', () => {
            bef();
            aft();

            it('Отображение 2 подраздление', async () => await dec.simple(page.division.size,
                [2, entry.max],
                page.division));

            it('Отображение подразделения "Администраторы системы"', async ()=> await dec.simple(page.division.division,
                [[params.name1], entry.max],
                page.division));

            it('Отсуствие подразделения 2 уровня', async ()=> await dec.simple(page.division.noElement,
                [[params.name1, params.name2], entry.min],
                page.division));

            it('Отображение подразделения 1 уровня', async ()=> await dec.simple(page.division.division,
                [[params.name2], entry.max],
                page.division));
        });

        deleteParams();
    });

    // Попытка редактирования
    const editDivision = () => describe('Подразделение "Администраторы системы". Попытка редактирования', () => {

        const params = {
            name: 'Администраторы системы'
        };

        describe('Проверка отображения в разделе', () => {
            bef();
            aft();

            it('Отображение 1 подраздление', async () => await dec.simple(page.division.size,
                [1, entry.max],
                page.division));

            it('Отображение подразделения "Администраторы системы"', async ()=> await dec.simple(page.division.division,
                [[params.name], entry.max],
                page.division));
        });

        describe('Попытка редактирования', () => {

            bef();
            aft();

            it('Нажатие по подразделению', async () => await dec.simple(page.division.handler,
                [[params.name], entry.max],
                page.division));

            it('Подразделение выделено', async () => await dec.simple(page.division.selected,
                [params.name, entry.max],
                page.division));

            it('Кнопка "Редактировать" - заблокирована', async () => await dec.simple(el.butIcBefore.disabled,
                [but.edit, entry.max],
                el.butIcBefore));

            it('Попытка нажатия кноки "Редактировать"', async () => await dec.simpleFalse(el.butIcBefore.handler,
                [but.edit, entry.min],
                el.butIcBefore));

            it('Модальное окно "Редактирование подразделения" не отображается',
                async () => await dec.simpleFalse(el.modal.divisionEdit.init,
                    [entry.min],
                    el.modal.divisionEdit));
        });

        describe('Проверка отображения в разделе', () => {
            bef();
            aft();

            it('Отображение 1 подраздление', async () => await dec.simple(page.division.size,
                [1, entry.max],
                page.division));

            it('Отображение подразделения "Администраторы системы"', async ()=> await dec.simple(page.division.division,
                [[params.name], entry.max],
                page.division));
        });

    });

    // Попытка редактирования
    const deleteDivision = () => describe('Подразделение "Администраторы системы". Попытка удаления', () => {

        const params = {
            name: 'Администраторы системы'
        };

        describe('Проверка отображения в разделе', () => {
            bef();
            aft();

            it('Отображение 1 подраздление', async () => await dec.simple(page.division.size,
                [1, entry.max],
                page.division));

            it('Отображение подразделения "Администраторы системы"', async ()=> await dec.simple(page.division.division,
                [[params.name], entry.max],
                page.division));
        });

        describe('Попытка удаления', () => {

            bef();
            aft();

            it('Нажатие по подразделению', async () => await dec.simple(page.division.handler,
                [[params.name], entry.max],
                page.division));

            it('Подразделение выделено', async () => await dec.simple(page.division.selected,
                [params.name, entry.max],
                page.division));

            it('Кнопка "Удалить" - заблокирована', async () => await dec.simple(el.butIcBefore.disabled,
                [but.delete, entry.max],
                el.butIcBefore));

            it('Попытка нажатия кноки "Удалить"', async () => await dec.simpleFalse(el.butIcBefore.handler,
                [but.delete, entry.min],
                el.butIcBefore));

            it('Модальное окно "Удаление подразделения" не отображается',
                async () => await dec.simpleFalse(el.modalConfirm.divisionDelete.init,
                    [entry.min],
                    el.modalConfirm.divisionDelete));
        });

        describe('Проверка отображения в разделе', () => {
            bef();
            aft();

            it('Отображение 1 подраздление', async () => await dec.simple(page.division.size,
                [1, entry.max],
                page.division));

            it('Отображение подразделения "Администраторы системы"', async ()=> await dec.simple(page.division.division,
                [[params.name], entry.max],
                page.division));
        });

    });

    // Проверки подразделения "Администраторы системы"
    const serviceDivision = () => describe('Проверки подразделения "Администраторы системы".', () => {
        addDivision();
        editDivision();
        deleteDivision();
    });

    return {
        addDivision,
        editDivision,
        deleteDivision,
        serviceDivision,
    }
};

//Тесты печати таблицы
const print = () => {

    // Проверка печати с двумя подразделениями 1 и 2 уровня с минимальным количеством параметров.
    const printMinParams = () => describe('Подразделение. Печать. Проверка печати с двумя подразделениями ' +
        '1 и 2 уровня с минимальным количеством параметров.', () => {

        const params = {
            name1: 'printMinParamsName1',
            name2: 'printMinParamsName2'
        };

        describe('API - добавление', () => {
            bef();
            aft();
            describe('Добавление подразделения 1 уровня', () => {
                const obj = {
                    parent_id: 0,
                    name: params.name1,
                };
                addDivision(obj);
            });
            describe('Добавление подразделения 2 уровня', () => {
                it('Добавление подразделения', async () => {
                    const cook = await page.base.getCookie('token');
                    const get = await api.getDivision(cook.text);
                    const obj = {
                        parent_id: get.text[0]['id'],
                        name: params.name2
                    };
                    await dec.simple(api.putDivision,
                        [[obj], cook.text],
                        api.putDivision);
                });
            });
        });

        describe('Проверка отображения в разделе', () => {
            bef();
            aft();

            describe('Общие проверки', () => {

                it('Отображение 3 подраздление', async () => await dec.simple(page.division.size,
                    [3, entry.max],
                    page.division));

                it('Отображение добавленного подразделения 1 уровня', async ()=> await dec.simple(page.division.division,
                    [[params.name1], entry.max],
                    page.division));

                it('Отображение добавленного подразделения 2 уровня', async ()=> await dec.simple(page.division.division,
                    [[params.name1, params.name2], entry.max],
                    page.division));
            });

            describe('Проверка подразделения 1 уровня', () => {

                it('Отображенние подразделения', async () => await dec.simple(page.division.division,
                    [[params.name1], entry.max],
                    page.division));

                it('Нажатие по подразделению', async () => await dec.simple(page.division.handler,
                    [[params.name1], entry.max],
                    page.division));

                it('Подразделение выделено', async () => await dec.simple(page.division.selected,
                    [params.name1, entry.max],
                    page.division));

                it('Проверка "Телефон"', async () => await dec.simpleText(el.input.getValue,
                    ['Телефон', '', entry.max],
                    '',
                    el.input));

                it('Проверка "Описание"', async () => await dec.simpleText(el.input.getValue,
                    ['Описание', '', entry.max],
                    '',
                    el.input));

            });

            describe('Проверка подразделения 2 уровня', () => {

                it('Отображенние подразделения', async () => await dec.simple(page.division.division,
                    [[params.name1, params.name2], entry.max],
                    page.division));

                it('Нажатие по подразделению', async () => await dec.simple(page.division.handler,
                    [[params.name1, params.name2], entry.max],
                    page.division));

                it('Подразделение выделено', async () => await dec.simple(page.division.selected,
                    [params.name2, entry.max],
                    page.division));

                it('Проверка "Телефон"', async () => await dec.simpleText(el.input.getValue,
                    ['Телефон', '', entry.max],
                    '',
                    el.input));

                it('Проверка "Описание"', async () => await dec.simpleText(el.input.getValue,
                    ['Описание', '', entry.max],
                    '',
                    el.input));
            });

        });

        describe('Печать таблицы', () => {

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
            });

            describe('Проверка строки 1', () => {

                it('Поле "Наименование"', async () => await dec.simpleText(el.modal.printTable.cellGetText,
                    ['Наименование', '1', '1', entry.max],
                    params.name1,
                    el.modal.printTable));

                it('Поле "Телефон"', async () => await dec.simpleText(el.modal.printTable.cellGetText,
                    ['Телефон', '1', '2', entry.max],
                    '',
                    el.modal.printTable));

                it('Поле "Описание"', async () => await dec.simpleText(el.modal.printTable.cellGetText,
                    ['Описание', '1', '3', entry.max],
                    '',
                    el.modal.printTable));
            });

            describe('Проверка строки 2', () => {

                it('Поле "Наименование"', async () => await dec.simpleText(el.modal.printTable.cellGetText,
                    ['Наименование', '2', '1', entry.max],
                    params.name2,
                    el.modal.printTable));

                it('Поле "Телефон"', async () => await dec.simpleText(el.modal.printTable.cellGetText,
                    ['Телефон', '2', '2', entry.max],
                    '',
                    el.modal.printTable));

                it('Поле "Описание"', async () => await dec.simpleText(el.modal.printTable.cellGetText,
                    ['Описание', '2', '3', entry.max],
                    '',
                    el.modal.printTable));
            });

            describe('Проверка строки 3', () => {

                it('Поле "Наименование"', async () => await dec.simpleText(el.modal.printTable.cellGetText,
                    ['Наименование', '3', '1', entry.max],
                    'Администраторы системы',
                    el.modal.printTable));

                it('Поле "Телефон"', async () => await dec.simpleText(el.modal.printTable.cellGetText,
                    ['Телефон', '3', '2', entry.max],
                    '',
                    el.modal.printTable));

                it('Поле "Описание"', async () => await dec.simpleText(el.modal.printTable.cellGetText,
                    ['Описание', '3', '3', entry.max],
                    '',
                    el.modal.printTable));
            });

            describe('Закрытие печатной формы', () => {

                it('Нажатие кнопки закрытия', async () => await dec.simple(el.modal.printTable.closeHandler,
                    [entry.max],
                    el.modal.printTable));

                it('Отсутствие печатной формы', async () => await dec.simple(el.modal.printTable.initClose,
                    [entry.max],
                    el.modal.printTable))
            });

        });

        deleteParams();
    });

    // Проверка печати 5 подразделений 1 уровня с вложенннными подразделениями прогрессией до, 5 с заполненными параметрами "Телефон" и "Описание"
    const printMaxParams = () => describe('Подразделение. Печать. Проверка печати 5 подразделений 1 уровня ' +
        'с вложенными подразделениями прогрессией до 5 с заполненными параметрами "Телефон" и "Описание"', () => {

        const params = {
            array: [...Array(5).keys()].map(item1 => {
                return [...Array(item1 + 1).keys()].map(item2 => {
                    return {
                        name: 'printMaxParamsName' + (item1 + 1) +  (item2 + 1),
                        phone: 'printMaxParamsPhone' + (item1 + 1) +  (item2 + 1),
                        description: 'printMaxParamsDescription' + (item1 + 1) +  (item2 + 1)
                    }
                });
            }),
        };

        describe('API - добавление', () => {
            bef();
            aft();

            params.array.forEach((item1) => {
                item1.forEach((item2, index2) => {

                    describe(`Добавление подразделения ${index2 + 1} уровня - ${item2.name}`, () => {

                        if(index2 === 0) {
                            describe('Добавление подразделения 1 уровня', () => {
                                const obj = {
                                    parent_id: 0,
                                    name: item2.name,
                                    comment: item2.description,
                                    tel: item2.phone
                                };
                                addDivision(obj);
                            });
                        }

                        if(index2 > 0) {
                            describe(`Добавление подразделения ${index2 + 1} уровня`, () => {
                                it('Добавление подразделения', async () => {
                                    const cook = await page.base.getCookie('token');
                                    const get = await api.getDivision(cook.text);
                                    const obj = {
                                        parent_id: get.text[get.text.length - 1]['id'],
                                        name: item2.name,
                                        comment: item2.description,
                                        tel: item2.phone
                                    };
                                    await dec.simple(api.putDivision,
                                        [[obj], cook.text],
                                        api.putDivision);
                                });
                            });

                        }

                    });
                });
            });
        });

        describe('Проверка отображения в разделе', () => {
            bef();
            aft();

            it('Отображние 16 подраздлениий', async () => await dec.simple(page.division.size,
                [16, entry.max],
                page.division));

            params.array.forEach((item1) => {
                let arr =[];
                item1.forEach((item2, index2) => {
                    it(`Отображенние подразделения ${index2 + 1} уровня - ${item2.name}`, async () => {
                        arr.push(item2.name);
                        await dec.simple(page.division.division,
                            [arr, entry.max],
                            page.division)
                    });
                    it(`Нажатие по подразделению ${index2 + 1} уровня -  ${item2.name}`,
                        async () => await dec.simple(page.division.handler,
                            [arr, entry.max],
                            page.division));
                    it(`Подразделение ${index2 + 1} уровня -  ${item2.name} выделено`,
                        async () => await dec.simple(page.division.selected,
                            [item2.name, entry.max],
                            page.division));
                    it(`Проверка "Телефон"`,
                        async () => await dec.simpleText(el.input.getValue,
                            ['Телефон', '', entry.max],
                            item2.phone,
                            el.input));
                    it(`Проверка "Описание"`,
                        async () => await dec.simpleText(el.input.getValue,
                            ['Описание', '', entry.max],
                            item2.description,
                            el.input));
                });
            });

        });

        describe('Печать таблицы', () => {

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
            });

            params.array.flat().forEach((item, index) => {
                describe(`Проверка строки ${index + 1}`, () => {
                    it('Поле "Наименование"', async () => await dec.simpleText(el.modal.printTable.cellGetText,
                        ['Наименование', index + 1, '1', entry.max],
                        item.name,
                        el.modal.printTable));

                    it('Поле "Телефон"', async () => await dec.simpleText(el.modal.printTable.cellGetText,
                        ['Телефон', index + 1, '2', entry.max],
                        item.phone,
                        el.modal.printTable));

                    it('Поле "Описание"', async () => {
                        await dec.simpleText(el.modal.printTable.cellGetText,
                            ['Описание', index + 1, '3', entry.max],
                            item.description,
                            el.modal.printTable);
                    });

                });
            });

            describe(`Проверка строки 16`, () => {
                it('Поле "Наименование"', async () => await dec.simpleText(el.modal.printTable.cellGetText,
                    ['Наименование', 16, '1', entry.max],
                    'Администраторы системы',
                    el.modal.printTable));

                it('Поле "Телефон"', async () => await dec.simpleText(el.modal.printTable.cellGetText,
                    ['Телефон', 16, '2', entry.max],
                    '',
                    el.modal.printTable));

                it('Поле "Описание"', async () => {
                    await dec.simpleText(el.modal.printTable.cellGetText,
                        ['Описание', 16, '3', entry.max],
                        '',
                        el.modal.printTable);
                });

            });

            describe('Закрытие печатной формы', () => {

                it('Нажатие кнопки закрытия', async () => await dec.simple(el.modal.printTable.closeHandler,
                    [entry.max],
                    el.modal.printTable));

                it('Отсутствие печатной формы', async () => await dec.simple(el.modal.printTable.initClose,
                    [entry.max],
                    el.modal.printTable))
            });

        });

        deleteParams();
    });

    // Проверки печати
    const print = () => describe('Подразделение. Печать. Проверки печати.', () => {
        printMinParams();
        printMaxParams();
    });

    return {
        printMinParams,
        printMaxParams,
        print,
    }

};

//Тесты печати дерева
const printTree = () => {

    const printTreeMinParams = () => describe('Подразделение. Печать дерева. Проверка печати с двумя подразделениями ' +
        '1 и 2 уровня с минимальным количеством параметров.', () => {
        const params = {
            name1: 'printTreeMinParamsName1',
            name2: 'printTreeMinParamsName2',
            space: '    ',
        };

        describe('API - добавление', () => {
            bef();
            aft();
            describe('Добавление подразделения 1 уровня', () => {
                const obj = {
                    parent_id: 0,
                    name: params.name1,
                };
                addDivision(obj);
            });
            describe('Добавление подразделения 2 уровня', () => {
                it('Добавление подразделения', async () => {
                    const cook = await page.base.getCookie('token');
                    const get = await api.getDivision(cook.text);
                    const obj = {
                        parent_id: get.text[0]['id'],
                        name: params.name2
                    };
                    await dec.simple(api.putDivision,
                        [[obj], cook.text],
                        api.putDivision);
                });
            });
        });

        describe('Проверка отображения в разделе', () => {
            bef();
            aft();

            describe('Общие проверки', () => {

                it('Отображение 3 подраздление', async () => await dec.simple(page.division.size,
                    [3, entry.max],
                    page.division));

                it('Отображение добавленного подразделения 1 уровня', async ()=> await dec.simple(page.division.division,
                    [[params.name1], entry.max],
                    page.division));

                it('Отображение добавленного подразделения 2 уровня', async ()=> await dec.simple(page.division.division,
                    [[params.name1, params.name2], entry.max],
                    page.division));
            });

            describe('Проверка подразделения 1 уровня', () => {

                it('Отображенние подразделения', async () => await dec.simple(page.division.division,
                    [[params.name1], entry.max],
                    page.division));

                it('Нажатие по подразделению', async () => await dec.simple(page.division.handler,
                    [[params.name1], entry.max],
                    page.division));

                it('Подразделение выделено', async () => await dec.simple(page.division.selected,
                    [params.name1, entry.max],
                    page.division));

                it('Проверка "Телефон"', async () => await dec.simpleText(el.input.getValue,
                    ['Телефон', '', entry.max],
                    '',
                    el.input));

                it('Проверка "Описание"', async () => await dec.simpleText(el.input.getValue,
                    ['Описание', '', entry.max],
                    '',
                    el.input));
            });

            describe('Проверка подразделения 2 уровня', () => {

                it('Отображенние подразделения', async () => await dec.simple(page.division.division,
                    [[params.name1, params.name2], entry.max],
                    page.division));

                it('Нажатие по подразделению', async () => await dec.simple(page.division.handler,
                    [[params.name1, params.name2], entry.max],
                    page.division));

                it('Подразделение выделено', async () => await dec.simple(page.division.selected,
                    [params.name2, entry.max],
                    page.division));

                it('Проверка "Телефон"', async () => await dec.simpleText(el.input.getValue,
                    ['Телефон', '', entry.max],
                    '',
                    el.input));

                it('Проверка "Описание"', async () => await dec.simpleText(el.input.getValue,
                    ['Описание', '', entry.max],
                    '',
                    el.input));
            });

        });

        describe('Печать дерева', () => {

            bef();
            aft();

            describe('Открытие печатной формы', () => {
                it('Нажатие кнопки "Меню"', async () => await dec.simple(el.butIcBefore.handler,
                    [but.menu, entry.max],
                    el.butIcBefore));

                it('Отображение "Меню"', async () => await dec.simple(el.menu.menu,
                    [entry.max],
                    el.menu));

                it('Нажатие параметра "Печать дерева"', async () => await dec.simple(el.menu.handler,
                    ['Печать дерева', entry.max],
                    el.menu));

                it('Отображение печатной формы', async () => await dec.simple(el.modal.printTable.init,
                    [entry.max],
                    el.modal.printTable));
            });

            describe('Проверка строки 1', () => {

                it('Поле "Название"', async () => await dec.simpleTextNoSpace(el.modal.printTable.cellGetText,
                    ['Название', '1', '1', entry.max],
                    `${params.name1}`,
                    el.modal.printTable));

                it('Поле "Телефон"', async () => await dec.simpleText(el.modal.printTable.cellGetText,
                    ['Телефон', '1', '2', entry.max],
                    '',
                    el.modal.printTable));

                it('Поле "Описание"', async () => await dec.simpleText(el.modal.printTable.cellGetText,
                    ['Описание', '1', '3', entry.max],
                    '',
                    el.modal.printTable));
            });

            describe('Проверка строки 2', () => {

                it('Поле "Название"', async () => await dec.simpleTextNoSpace(el.modal.printTable.cellGetText,
                    ['Название', '2', '1', entry.max],
                    params.space + params.name2,
                    el.modal.printTable));

                it('Поле "Телефон"', async () => await dec.simpleText(el.modal.printTable.cellGetText,
                    ['Телефон', '2', '2', entry.max],
                    '',
                    el.modal.printTable));

                it('Поле "Описание"', async () => await dec.simpleText(el.modal.printTable.cellGetText,
                    ['Описание', '2', '3', entry.max],
                    '',
                    el.modal.printTable));
            });

            describe('Проверка строки 3', () => {

                it('Поле "Название"', async () => await dec.simpleTextNoSpace(el.modal.printTable.cellGetText,
                    ['Название', '3', '1', entry.max],
                    'Администраторы системы',
                    el.modal.printTable));

                it('Поле "Телефон"', async () => await dec.simpleText(el.modal.printTable.cellGetText,
                    ['Телефон', '3', '2', entry.max],
                    '',
                    el.modal.printTable));

                it('Поле "Описание"', async () => await dec.simpleText(el.modal.printTable.cellGetText,
                    ['Описание', '3', '3', entry.max],
                    '',
                    el.modal.printTable));
            });

            describe('Закрытие печатной формы', () => {

                it('Нажатие кнопки закрытия', async () => await dec.simple(el.modal.printTable.closeHandler,
                    [entry.max],
                    el.modal.printTable));

                it('Отсутствие печатной формы', async () => await dec.simple(el.modal.printTable.initClose,
                    [entry.max],
                    el.modal.printTable))
            });

        });

        deleteParams();

    });

    // Проверка печати 5 подразделений 1 уровня с вложенннными подразделениями прогрессией до, 5 с заполненными параметрами "Телефон" и "Описание"
    const printTreeMaxParams = () => describe('Подразделение. Печать дерева. Проверка печати 5 подразделений ' +
        '1 уровня с вложенннными подразделениями прогрессией до 5 с заполненными параметрами "Телефон" и "Описание"',
        () => {

        const params = {
            array: [...Array(5).keys()].map(item1 => {
                return [...Array(item1 + 1).keys()].map(item2 => {
                    return {
                        name: 'printMaxParamsName' + (item1 + 1) +  (item2 + 1),
                        phone: 'printMaxParamsPhone' + (item1 + 1) +  (item2 + 1),
                        description: 'printMaxParamsDescription' + (item1 + 1) +  (item2 + 1)
                    }
                });
            }),
            space: '    ',
            flag: 1
        };

        describe('API - добавление', () => {
            bef();
            aft();

            params.array.forEach((item1) => {
                item1.forEach((item2, index2) => {

                    describe(`Добавление подразделения ${index2 + 1} уровня - ${item2.name}`, () => {

                        if(index2 === 0) {
                            describe('Добавление подразделения 1 уровня', () => {
                                const obj = {
                                    parent_id: 0,
                                    name: item2.name,
                                    comment: item2.description,
                                    tel: item2.phone
                                };
                                addDivision(obj);
                            });
                        }

                        if(index2 > 0) {
                            describe(`Добавление подразделения ${index2 + 1} уровня`, () => {
                                it('Добавление подразделения', async () => {
                                    const cook = await page.base.getCookie('token');
                                    const get = await api.getDivision(cook.text);
                                    const obj = {
                                        parent_id: get.text[get.text.length - 1]['id'],
                                        name: item2.name,
                                        comment: item2.description,
                                        tel: item2.phone
                                    };
                                    await dec.simple(api.putDivision,
                                        [[obj], cook.text],
                                        api.putDivision);
                                });
                            });

                        }

                    });
                });
            });
        });

        describe('Проверка отображения в разделе', () => {
            bef();
            aft();

            it('Отображние 16 подраздлениий', async () => await dec.simple(page.division.size,
                [16, entry.max],
                page.division));

            params.array.forEach((item1) => {
                let arr =[];
                item1.forEach((item2, index2) => {
                    it(`Отображенние подразделения ${index2 + 1} уровня - ${item2.name}`, async () => {
                        arr.push(item2.name);
                        await dec.simple(page.division.division,
                            [arr, entry.max],
                            page.division)
                    });
                    it(`Нажатие по подразделению ${index2 + 1} уровня -  ${item2.name}`,
                        async () => await dec.simple(page.division.handler,
                            [arr, entry.max],
                            page.division));
                    it(`Подразделение ${index2 + 1} уровня -  ${item2.name} выделено`,
                        async () => await dec.simple(page.division.selected,
                            [item2.name, entry.max],
                            page.division));
                    it(`Проверка "Телефон"`,
                        async () => await dec.simpleText(el.input.getValue,
                            ['Телефон', '', entry.max],
                            item2.phone,
                            el.input));
                    it(`Проверка "Описание"`,
                        async () => await dec.simpleText(el.input.getValue,
                            ['Описание', '', entry.max],
                            item2.description,
                            el.input));
                });
            });

        });

        describe('Печать дерева', () => {

            bef();
            aft();

            describe('Открытие печатной формы', () => {
                it('Нажатие кнопки "Меню"', async () => await dec.simple(el.butIcBefore.handler,
                    [but.menu, entry.max],
                    el.butIcBefore))

                it('Отображение "Меню"', async () => await dec.simple(el.menu.menu,
                    [entry.max],
                    el.menu))

                it('Нажатие параметра "Печать дерева"', async () => await dec.simple(el.menu.handler,
                    ['Печать дерева', entry.max],
                    el.menu));

                it('Отображение печатной формы', async () => await dec.simple(el.modal.printTable.init,
                    [entry.max],
                    el.modal.printTable));
            });
            describe('Проверка строк', () => {
                params.array.forEach((item1) => {
                    item1.forEach((item2, index2) => {
                        const str = params.array.flat().indexOf(item2);
                        describe(`Проверка строки ${str + 1}`, () => {
                            it('Поле "Название"', async () => {
                                await dec.simpleTextNoSpace(el.modal.printTable.cellGetText,
                                    ['Название', params.flag, '1', entry.max],
                                    [...Array(index2).keys()].map(() => params.space).join('') + item2.name,
                                    el.modal.printTable)
                            });

                            it('Поле "Телефон"', async () => await dec.simpleText(el.modal.printTable.cellGetText,
                                ['Телефон', params.flag, '2', entry.max],
                                item2.phone,
                                el.modal.printTable));

                            it('Поле "Описание"', async () => {
                                await dec.simpleText(el.modal.printTable.cellGetText,
                                    ['Описание', params.flag, '3', entry.max],
                                    item2.description,
                                    el.modal.printTable);
                                params.flag += 1;
                            });

                        });

                    });
                });
            })



            describe(`Проверка строки 16`, () => {
                it('Поле "Название"', async () => await dec.simpleTextNoSpace(el.modal.printTable.cellGetText,
                    ['Название', 16, '1', entry.max],
                    'Администраторы системы',
                    el.modal.printTable));

                it('Поле "Телефон"', async () => await dec.simpleText(el.modal.printTable.cellGetText,
                    ['Телефон', 16, '2', entry.max],
                    '',
                    el.modal.printTable));

                it('Поле "Описание"', async () => {
                    await dec.simpleText(el.modal.printTable.cellGetText,
                        ['Описание', 16, '3', entry.max],
                        '',
                        el.modal.printTable);
                });

            });

            describe('Закрытие печатной формы', () => {

                it('Нажатие кнопки закрытия', async () => await dec.simple(el.modal.printTable.closeHandler,
                    [entry.max],
                    el.modal.printTable));

                it('Отсутствие печатной формы', async () => await dec.simple(el.modal.printTable.initClose,
                    [entry.max],
                    el.modal.printTable))
            });

        });

        deleteParams();
    });

    const printTree = () => {
        printTreeMinParams();
        printTreeMaxParams();
    };

    return {
        printTreeMinParams,
        printTreeMaxParams,
        printTree,
    };

};

//Тесты экспорта
const exportFile = (agr, str, format) => {

    const apiMax = () => describe('API - добавление', () => {
        const params = {
            division1: 'apiMaxdivision1',
            division2: [...Array(2).keys()].map(item => 'apiMaxDivision2' + (item + 1)),
            division3: [...Array(3).keys()].map(item => 'apiMaxDivision3' + (item + 1)),
            division4: [...Array(4).keys()].map(item => 'apiMaxDivision4' + (item + 1)),
            division5: [...Array(5).keys()].map(item => 'apiMaxDivision5' + (item + 1)),
            division6: [...Array(6).keys()].map(item => 'apiMaxDivision6' + (item + 1)),
            division7: [...Array(7).keys()].map(item => 'apiMaxDivision7' + (item + 1)),
            fio: {
                lastName: 'staff',
                firstName: '1',
                middleName: '' ,
                divisionId: 1,
                date: '2001-01-01'
            },
            template1: 'apiMaxTemplate1',
            template2: 'apiMaxTemplate2',
            schedule: 'apiMaxSchedule',
            description: 'apiMaxDescription',
            phone: 'apiMaxPhone'
        };

        describe('Добавление', () => {
            bef();
            aft();

            addAccessTemplate(params.template1, '');
            addAccessTemplate(params.template2, '');
            addSchedule(params.schedule);
            addStaff(...Object.values(params.fio));

            it(`Добавление подразделения 1 уровня - ${params.division1}`, async () => {
                const cook = await page.base.getCookie('token');
                const obj = {
                    "parent_id": 0,
                    "name": params.division1,
                };
                await dec.simple(api.putDivision,
                    [[obj], cook.text],
                    api.putDivision);
            });

            params.division2.forEach((item, index) => {
                it(`Добавлние подразделения ${index + 1} уровня - ${item}`, async () => {
                    const cook = await page.base.getCookie('token');
                    const getDivision = await api.getDivision(cook.text);
                    console.log('id: ', getDivision.text[getDivision.text.length - 1]);
                    console.log('index: ', index);
                    const obj = {
                        "parent_id": index === 0 ? 0 : getDivision.text[getDivision.text.length - 1]['id'],
                        "name": item,
                        "tel": params.phone
                    };
                    console.log('obj: ', obj);
                    await dec.simple(api.putDivision,
                        [[obj], cook.text],
                        api.putDivision);

                });
            });

            params.division3.forEach((item, index) => {
                it(`Добавлние подразделения ${index + 1} уровня - ${item}`, async () => {
                    const cook = await page.base.getCookie('token');
                    const getDivision = await api.getDivision(cook.text);
                    console.log('id: ', getDivision.text[getDivision.text.length - 1]);
                    console.log('index: ', index);
                    const obj = {
                        "parent_id": index === 0 ? 0 : getDivision.text[getDivision.text.length - 1]['id'],
                        "name": item,
                        "comment": params.description,
                        "tel": params.phone,
                    };
                    console.log('obj: ', obj);
                    await dec.simple(api.putDivision,
                        [[obj], cook.text],
                        api.putDivision);

                });
            });

            params.division4.forEach((item, index) => {
                it(`Добавлние подразделения ${index + 1} уровня - ${item}`, async () => {
                    const cook = await page.base.getCookie('token');
                    const getDivision = await api.getDivision(cook.text);
                    const getTemplate = await api.getAccessTemplate(cook.text);
                    console.log('id: ', getDivision.text[getDivision.text.length - 1]['id']);
                    console.log('index: ', index);
                    const obj = {
                        "parent_id": index === 0 ? 0 : getDivision.text[getDivision.text.length - 1]['id'],
                        "name": item,
                        "comment": params.description,
                        "tel": params.phone,
                        "staff_access_template": [getTemplate.text[0]['id'], getTemplate.text[1]['id']],
                    };
                    console.log('obj: ', obj);
                    await dec.simple(api.putDivision,
                        [[obj], cook.text],
                        api.putDivision);

                });
            });

            params.division5.forEach((item, index) => {
                it(`Добавлние подразделения ${index + 1} уровня - ${item}`, async () => {
                    const cook = await page.base.getCookie('token');
                    const getDivision = await api.getDivision(cook.text);
                    const getTemplate = await api.getAccessTemplate(cook.text);
                    const obj = {
                        "parent_id": index === 0 ? 0 : getDivision.text[getDivision.text.length - 1]['id'],
                        "name": item,
                        "comment": params.description,
                        "tel": params.phone,
                        "staff_access_template": [getTemplate.text[0]['id'], getTemplate.text[1]['id']],
                        "visitor_access_template": getTemplate.text[0]['id'],
                    };
                    console.log('obj: ', obj);
                    await dec.simple(api.putDivision,
                        [[obj], cook.text],
                        api.putDivision);

                });
            });

            params.division6.forEach((item, index) => {
                it(`Добавлние подразделения ${index + 1} уровня - ${item}`, async () => {
                    const cook = await page.base.getCookie('token');
                    const getDivision = await api.getDivision(cook.text);
                    const getTemplate = await api.getAccessTemplate(cook.text);
                    const getSchedule = await api.getSchedule(cook.text);
                    const obj = {
                        "parent_id": index === 0 ? 0 : getDivision.text[getDivision.text.length - 1]['id'],
                        "name": item,
                        "comment": params.description,
                        "tel": params.phone,
                        "staff_access_template": [getTemplate.text[0]['id'], getTemplate.text[1]['id']],
                        "visitor_access_template": getTemplate.text[0]['id'],
                        "work_schedule": getSchedule.text[0]['id'],
                    };
                    await dec.simple(api.putDivision,
                        [[obj], cook.text],
                        api.putDivision);

                });
            });

            params.division7.forEach((item, index) => {
                it(`Добавлние подразделения ${index + 1} уровня - ${item}`, async () => {
                    const cook = await page.base.getCookie('token');
                    const getStaff = await api.getStaff(cook.text);
                    const getDivision = await api.getDivision(cook.text);
                    const getTemplate = await api.getAccessTemplate(cook.text);
                    const getSchedule = await api.getSchedule(cook.text);
                    const obj = {
                        "parent_id": index === 0 ? 0 :  getDivision.text[getDivision.text.length - 1]['id'],
                        "name": item,
                        "comment": params.description,
                        "tel": params.phone,
                        "accompanying": getStaff.text[0]['id'],
                        "staff_access_template": [getTemplate.text[0]['id'], getTemplate.text[1]['id']],
                        "visitor_access_template": getTemplate.text[0]['id'],
                        "work_schedule": getSchedule.text[0]['id'],
                    };
                    await dec.simple(api.putDivision,
                        [[obj], cook.text],
                        api.putDivision);

                });
            });
        });

        describe('Проверка отображения в разделе', () => {
            bef();
            aft();

            it('Отображние 29 подраздлениий', async () => await dec.simple(page.division.size,
                [29, entry.max],
                page.division));

            it(`Отображенние подразделения 1 уровня - ${params.division1}`, async () => {
                await dec.simple(page.division.division,
                    [[params.division1], entry.max],
                    page.division)
            });

            const array = [params.division2,
                params.division3,
                params.division4,
                params.division5,
                params.division6,
                params.division7];

            array.forEach((item1) => {
                let arr =[];
                item1.forEach((item2, index2) => {
                    it(`Отображенние подразделения ${index2 + 1} уровня - ${item2}`, async () => {
                        arr.push(item2);
                        await dec.simple(page.division.division,
                            [arr, entry.max],
                            page.division)
                    });
                });
            });

        });

    });

    const apiMin = () => describe('API - добавление', () => {
        const params = {
            division1: 'apiMinDivision1',
            division2:  'apiMinDivision2',
        };

        describe('Добавление', () => {
            bef();
            aft();

            it('Добавление подразделени 1 уровня', async () => {
                const cook = await page.base.getCookie('token');
                const obj = {
                    "parent_id": 0,
                    "name": params.division1
                };
                await dec.simple(api.putDivision,
                    [[obj], cook.text],
                    api.putDivision);
            });
            it('Добавление подразделени 2 уровня', async () => {
                const cook = await page.base.getCookie('token');
                const getDivision = await api.getDivision(cook.text);

                const obj = {
                    "parent_id": getDivision.text[0]['id'],
                    "name": params.division2
                };
                await dec.simple(api.putDivision,
                    [[obj], cook.text],
                    api.putDivision);
            });
        });

        describe('Проверка отображения в разделе', () => {
            bef();
            aft();

            it('Отображние 3 подраздлениий', async () => await dec.simple(page.division.size,
                [3, entry.max],
                page.division));

            it('Отображенние подразделения 1', async () => await dec.simple(page.division.division,
                [[params.division1], entry.max],
                page.division));

            it('Отображенние подразделения 2', async () => await dec.simple(page.division.division,
                [[params.division2], entry.max],
                page.division));
        });

    });

    // Имя выходного файла — системное имя. Заголовок — Не добавлять заголовок.
    const systemNameNoHead = () => describe(`Подразделение. Экспорт. ${format}. Имя выходного файла — системное имя. 
        Заголовок — Не добавлять заголовок. ${str}.`, () => {

        const params = {
            name: format === 'XLSX' ? 'division.xlsx' : 'division.csv',
            file1: [
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
                    'Отчет "Подразделения"': 'apiMaxdivision1',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: '',
                    __EMPTY_4: '',
                    __EMPTY_5: ''
                },
                {
                    'Отчет "Подразделения"': 'apiMaxDivision21',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: '',
                    __EMPTY_4: '',
                    __EMPTY_5: ''
                },
                {
                    'Отчет "Подразделения"': 'apiMaxDivision21/apiMaxDivision22',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: '',
                    __EMPTY_4: '',
                    __EMPTY_5: ''
                },
                {
                    'Отчет "Подразделения"': 'apiMaxDivision31',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: '',
                    __EMPTY_4: '',
                    __EMPTY_5: ''
                },
                {
                    'Отчет "Подразделения"': 'apiMaxDivision31/apiMaxDivision32',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: '',
                    __EMPTY_4: '',
                    __EMPTY_5: ''
                },
                {
                    'Отчет "Подразделения"': 'apiMaxDivision31/apiMaxDivision32/apiMaxDivision33',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: '',
                    __EMPTY_4: '',
                    __EMPTY_5: ''
                },
                {
                    'Отчет "Подразделения"': 'apiMaxDivision41',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: '',
                    __EMPTY_4: '',
                    __EMPTY_5: ''
                },
                {
                    'Отчет "Подразделения"': 'apiMaxDivision41/apiMaxDivision42',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: '',
                    __EMPTY_4: '',
                    __EMPTY_5: ''
                },
                {
                    'Отчет "Подразделения"': 'apiMaxDivision41/apiMaxDivision42/apiMaxDivision43',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: '',
                    __EMPTY_4: '',
                    __EMPTY_5: ''
                },
                {
                    'Отчет "Подразделения"': 'apiMaxDivision41/apiMaxDivision42/apiMaxDivision43/apiMaxDivision44',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: '',
                    __EMPTY_4: '',
                    __EMPTY_5: ''
                },
                {
                    'Отчет "Подразделения"': 'apiMaxDivision51',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: 'apiMaxTemplate1',
                    __EMPTY_4: '',
                    __EMPTY_5: ''
                },
                {
                    'Отчет "Подразделения"': 'apiMaxDivision51/apiMaxDivision52',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: 'apiMaxTemplate1',
                    __EMPTY_4: '',
                    __EMPTY_5: ''
                },
                {
                    'Отчет "Подразделения"': 'apiMaxDivision51/apiMaxDivision52/apiMaxDivision53',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: 'apiMaxTemplate1',
                    __EMPTY_4: '',
                    __EMPTY_5: ''
                },
                {
                    'Отчет "Подразделения"': 'apiMaxDivision51/apiMaxDivision52/apiMaxDivision53/apiMaxDivision54',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: 'apiMaxTemplate1',
                    __EMPTY_4: '',
                    __EMPTY_5: ''
                },
                {
                    'Отчет "Подразделения"': 'apiMaxDivision51/apiMaxDivision52/apiMaxDivision53/apiMaxDivision54/apiMaxDivision55',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: 'apiMaxTemplate1',
                    __EMPTY_4: '',
                    __EMPTY_5: ''
                },
                {
                    'Отчет "Подразделения"': 'apiMaxDivision61',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: 'apiMaxTemplate1',
                    __EMPTY_4: 'apiMaxSchedule',
                    __EMPTY_5: ''
                },
                {
                    'Отчет "Подразделения"': 'apiMaxDivision61/apiMaxDivision62',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: 'apiMaxTemplate1',
                    __EMPTY_4: 'apiMaxSchedule',
                    __EMPTY_5: ''
                },
                {
                    'Отчет "Подразделения"': 'apiMaxDivision61/apiMaxDivision62/apiMaxDivision63',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: 'apiMaxTemplate1',
                    __EMPTY_4: 'apiMaxSchedule',
                    __EMPTY_5: ''
                },
                {
                    'Отчет "Подразделения"': 'apiMaxDivision61/apiMaxDivision62/apiMaxDivision63/apiMaxDivision64',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: 'apiMaxTemplate1',
                    __EMPTY_4: 'apiMaxSchedule',
                    __EMPTY_5: ''
                },
                {
                    'Отчет "Подразделения"': 'apiMaxDivision61/apiMaxDivision62/apiMaxDivision63/apiMaxDivision64/apiMaxDivision65',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: 'apiMaxTemplate1',
                    __EMPTY_4: 'apiMaxSchedule',
                    __EMPTY_5: ''
                },
                {
                    'Отчет "Подразделения"': 'apiMaxDivision61/apiMaxDivision62/apiMaxDivision63/apiMaxDivision64/apiMaxDivision65/apiMaxDivision66',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: 'apiMaxTemplate1',
                    __EMPTY_4: 'apiMaxSchedule',
                    __EMPTY_5: ''
                },
                {
                    'Отчет "Подразделения"': 'apiMaxDivision71',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: 'apiMaxTemplate1',
                    __EMPTY_4: 'apiMaxSchedule',
                    __EMPTY_5: 'staff 1 '
                },
                {
                    'Отчет "Подразделения"': 'apiMaxDivision71/apiMaxDivision72',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: 'apiMaxTemplate1',
                    __EMPTY_4: 'apiMaxSchedule',
                    __EMPTY_5: 'staff 1 '
                },
                {
                    'Отчет "Подразделения"': 'apiMaxDivision71/apiMaxDivision72/apiMaxDivision73',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: 'apiMaxTemplate1',
                    __EMPTY_4: 'apiMaxSchedule',
                    __EMPTY_5: 'staff 1 '
                },
                {
                    'Отчет "Подразделения"': 'apiMaxDivision71/apiMaxDivision72/apiMaxDivision73/apiMaxDivision74',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: 'apiMaxTemplate1',
                    __EMPTY_4: 'apiMaxSchedule',
                    __EMPTY_5: 'staff 1 '
                },
                {
                    'Отчет "Подразделения"': 'apiMaxDivision71/apiMaxDivision72/apiMaxDivision73/apiMaxDivision74/apiMaxDivision75',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: 'apiMaxTemplate1',
                    __EMPTY_4: 'apiMaxSchedule',
                    __EMPTY_5: 'staff 1 '
                },
                {
                    'Отчет "Подразделения"': 'apiMaxDivision71/apiMaxDivision72/apiMaxDivision73/apiMaxDivision74/apiMaxDivision75/apiMaxDivision76',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: 'apiMaxTemplate1',
                    __EMPTY_4: 'apiMaxSchedule',
                    __EMPTY_5: 'staff 1 '
                },
                {
                    'Отчет "Подразделения"': 'apiMaxDivision71/apiMaxDivision72/apiMaxDivision73/apiMaxDivision74/apiMaxDivision75/apiMaxDivision76/apiMaxDivision77',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: 'apiMaxTemplate1',
                    __EMPTY_4: 'apiMaxSchedule',
                    __EMPTY_5: 'staff 1 '
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
            ],
            file2: [
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
                    'Отчет "Подразделения"': 'apiMinDivision1',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: '',
                    __EMPTY_4: '',
                    __EMPTY_5: ''
                },
                {
                    'Отчет "Подразделения"': 'apiMinDivision1/apiMinDivision2',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: '',
                    __EMPTY_4: '',
                    __EMPTY_5: ''
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
            ],
            file3: [
                {
                    "Подразделение": "apiMaxdivision1"
                },
                {
                    "Подразделение": "apiMaxDivision21",
                    "Телефон": "apiMaxPhone"
                },
                {
                    "Подразделение": "apiMaxDivision21/apiMaxDivision22",
                    "Телефон": "apiMaxPhone"
                },
                {
                    "Описание": "apiMaxDescription",
                    "Подразделение": "apiMaxDivision31",
                    "Телефон": "apiMaxPhone"
                },
                {
                    "Описание": "apiMaxDescription",
                    "Подразделение": "apiMaxDivision31/apiMaxDivision32",
                    "Телефон": "apiMaxPhone"
                },
                {
                    "Описание": "apiMaxDescription",
                    "Подразделение": "apiMaxDivision31/apiMaxDivision32/apiMaxDivision33",
                    "Телефон": "apiMaxPhone"
                },
                {
                    "Описание": "apiMaxDescription",
                    "Подразделение": "apiMaxDivision41",
                    "Телефон": "apiMaxPhone"
                },
                {
                    "Описание": "apiMaxDescription",
                    "Подразделение": "apiMaxDivision41/apiMaxDivision42",
                    "Телефон": "apiMaxPhone"
                },
                {
                    "Описание": "apiMaxDescription",
                    "Подразделение": "apiMaxDivision41/apiMaxDivision42/apiMaxDivision43",
                    "Телефон": "apiMaxPhone"
                },
                {
                    "Описание": "apiMaxDescription",
                    "Подразделение": "apiMaxDivision41/apiMaxDivision42/apiMaxDivision43/apiMaxDivision44",
                    "Телефон": "apiMaxPhone"
                },
                {
                    "Описание": "apiMaxDescription",
                    "Подразделение": "apiMaxDivision51",
                    "Телефон": "apiMaxPhone",
                    "Шаблон доступа для посетителей": "apiMaxTemplate1"
                },
                {
                    "Описание": "apiMaxDescription",
                    "Подразделение": "apiMaxDivision51/apiMaxDivision52",
                    "Телефон": "apiMaxPhone",
                    "Шаблон доступа для посетителей": "apiMaxTemplate1"
                },
                {
                    "Описание": "apiMaxDescription",
                    "Подразделение": "apiMaxDivision51/apiMaxDivision52/apiMaxDivision53",
                    "Телефон": "apiMaxPhone",
                    "Шаблон доступа для посетителей": "apiMaxTemplate1"
                },
                {
                    "Описание": "apiMaxDescription",
                    "Подразделение": "apiMaxDivision51/apiMaxDivision52/apiMaxDivision53/apiMaxDivision54",
                    "Телефон": "apiMaxPhone",
                    "Шаблон доступа для посетителей": "apiMaxTemplate1"
                },
                {
                    "Описание": "apiMaxDescription",
                    "Подразделение": "apiMaxDivision51/apiMaxDivision52/apiMaxDivision53/apiMaxDivision54/apiMaxDivision55",
                    "Телефон": "apiMaxPhone",
                    "Шаблон доступа для посетителей": "apiMaxTemplate1"
                },
                {
                    "График работы": "apiMaxSchedule",
                    "Описание": "apiMaxDescription",
                    "Подразделение": "apiMaxDivision61",
                    "Телефон": "apiMaxPhone",
                    "Шаблон доступа для посетителей": "apiMaxTemplate1"
                },
                {
                    "График работы": "apiMaxSchedule",
                    "Описание": "apiMaxDescription",
                    "Подразделение": "apiMaxDivision61/apiMaxDivision62",
                    "Телефон": "apiMaxPhone",
                    "Шаблон доступа для посетителей": "apiMaxTemplate1"
                },
                {
                    "График работы": "apiMaxSchedule",
                    "Описание": "apiMaxDescription",
                    "Подразделение": "apiMaxDivision61/apiMaxDivision62/apiMaxDivision63",
                    "Телефон": "apiMaxPhone",
                    "Шаблон доступа для посетителей": "apiMaxTemplate1",
                },
                {
                    "График работы": "apiMaxSchedule",
                    "Описание": "apiMaxDescription",
                    "Подразделение": "apiMaxDivision61/apiMaxDivision62/apiMaxDivision63/apiMaxDivision64",
                    "Телефон": "apiMaxPhone",
                    "Шаблон доступа для посетителей": "apiMaxTemplate1"
                },
                {
                    "График работы": "apiMaxSchedule",
                    "Описание": "apiMaxDescription",
                    "Подразделение": "apiMaxDivision61/apiMaxDivision62/apiMaxDivision63/apiMaxDivision64/apiMaxDivision65",
                    "Телефон": "apiMaxPhone",
                    "Шаблон доступа для посетителей": "apiMaxTemplate1"
                },
                {
                    "График работы": "apiMaxSchedule",
                    "Описание": "apiMaxDescription",
                    "Подразделение": "apiMaxDivision61/apiMaxDivision62/apiMaxDivision63/apiMaxDivision64/apiMaxDivision65/apiMaxDivision66",
                    "Телефон": "apiMaxPhone",
                    "Шаблон доступа для посетителей": "apiMaxTemplate1"
                },
                {
                    "График работы": "apiMaxSchedule",
                    "Описание": "apiMaxDescription",
                    "Подразделение": "apiMaxDivision71",
                    "Сопровождающий": "staff 1 ",
                    "Телефон": "apiMaxPhone",
                    "Шаблон доступа для посетителей": "apiMaxTemplate1"
                },
                {
                    "График работы": "apiMaxSchedule",
                    "Описание": "apiMaxDescription",
                    "Подразделение": "apiMaxDivision71/apiMaxDivision72",
                    "Сопровождающий": "staff 1 ",
                    "Телефон": "apiMaxPhone",
                    "Шаблон доступа для посетителей": "apiMaxTemplate1"
                },
                {
                    "График работы": "apiMaxSchedule",
                    "Описание": "apiMaxDescription",
                    "Подразделение": "apiMaxDivision71/apiMaxDivision72/apiMaxDivision73",
                    "Сопровождающий": "staff 1 ",
                    "Телефон": "apiMaxPhone",
                    "Шаблон доступа для посетителей": "apiMaxTemplate1"
                },
                {
                    "График работы": "apiMaxSchedule",
                    "Описание": "apiMaxDescription",
                    "Подразделение": "apiMaxDivision71/apiMaxDivision72/apiMaxDivision73/apiMaxDivision74",
                    "Сопровождающий": "staff 1 ",
                    "Телефон": "apiMaxPhone",
                    "Шаблон доступа для посетителей": "apiMaxTemplate1"
                },
                {
                    "График работы": "apiMaxSchedule",
                    "Описание": "apiMaxDescription",
                    "Подразделение": "apiMaxDivision71/apiMaxDivision72/apiMaxDivision73/apiMaxDivision74/apiMaxDivision75",
                    "Сопровождающий": "staff 1 ",
                    "Телефон": "apiMaxPhone",
                    "Шаблон доступа для посетителей": "apiMaxTemplate1"
                },
                {
                    "График работы": "apiMaxSchedule",
                    "Описание": "apiMaxDescription",
                    "Подразделение": "apiMaxDivision71/apiMaxDivision72/apiMaxDivision73/apiMaxDivision74/apiMaxDivision75/apiMaxDivision76",
                    "Сопровождающий": "staff 1 ",
                    "Телефон": "apiMaxPhone",
                    "Шаблон доступа для посетителей": "apiMaxTemplate1"
                },
                {
                    "График работы": "apiMaxSchedule",
                    "Описание": "apiMaxDescription",
                    "Подразделение": "apiMaxDivision71/apiMaxDivision72/apiMaxDivision73/apiMaxDivision74/apiMaxDivision75/apiMaxDivision76/apiMaxDivision77",
                    "Сопровождающий": "staff 1 ",
                    "Телефон": "apiMaxPhone",
                    "Шаблон доступа для посетителей": "apiMaxTemplate1"
                },
                {
                    "Подразделение": "Администраторы системы"
                }
            ],
            file4: [
                { 'Подразделение': 'apiMinDivision1' },
                { 'Подразделение': 'apiMinDivision1/apiMinDivision2' },
                { 'Подразделение': 'Администраторы системы' }
            ]
        };

        agr === 'min' ? apiMin() : apiMax();

        describe('Экспорт', () => {

            bef();
            aft();

            it('Нажатие кнопки "Меню"', async () => await dec.simple(el.butIcBefore.handler,
                [but.menu, entry.max],
                el.butIcBefore));

            it('Отображение "Меню"', async () => await dec.simple(el.menu.menu,
                [entry.max],
                el.menu));

            it('Нажатие параметра "Экспорт"', async () => await dec.simple(el.menu.handler,
                ['Экспорт', entry.max],
                el.menu));

            it('Отображение модального окна "Экспортировать данные"', async () => await dec.simple(el.modal.exportData.init,
                [entry.max],
                el.modal.exportData));

            switch (format) {
                case 'XLSX':
                    it('Выбор "Выберите тип файла для экспорта"', async () => await dec.simple(el.select.iconXpand,
                        ['Выберите тип файла для экспорта', 'XLSX', 'XLSX', entry.max],
                        el.select));

                    it('Выбор "Заголовок"', async () => await dec.simple(el.select.iconXpand,
                        ['Заголовок', 'Добавить заголовок к файлу', 'Не добавлять заголовок', entry.max],
                        el.select));
                    break;
                case 'CSV':
                    it('Выбор "Выберите тип файла для экспорта"', async () => await dec.simple(el.select.iconXpand,
                        ['Выберите тип файла для экспорта', 'XLSX', 'CSV', entry.max],
                        el.select));
                    break;
                default:
                    it('Выбор "Выберите тип файла для экспорта"', async () => await dec.simple(el.select.iconXpand,
                        ['Выберите тип файла для экспорта', 'XLSX', 'XLSX', entry.max],
                        el.select));

                    it('Выбор "Заголовок"', async () => await dec.simple(el.select.iconXpand,
                        ['Заголовок', 'Добавить заголовок к файлу', 'Не добавлять заголовок', entry.max],
                        el.select));
                    break;
            }

            it('Нажатие кнопки "Экспортировать"', async () => await dec.simple(el.button.handler,
                ['Экспортировать', entry.max],
                el.button));

            it('Отсутствие модального окна "Экспортировать данные"',
                async () => await dec.simple(el.modal.exportData.initClose,
                    [entry.max],
                    el.modal.exportData));

        });

        describe('Проверка файла экспорта', () => {

            it('Отображение файла', async () => await dec.simple(el.file.display,
                [params.name, entry.upload],
                el.file));

            switch (format) {
                case 'XLSX':
                    it('Проверка строк файла', async () => {
                        const jsonFile = await el.file.readNum(params.name);
                        const file = agr === 'min' ? params.file2 : params.file1;
                        await dec.exportFile(file, jsonFile);
                    });
                    break;
                case 'CSV':
                    it('Проверка строк файла', async () => {
                        const jsonFile = await el.file.readNum(params.name);
                        const file = agr === 'min' ? params.file4 : params.file3;
                        await dec.exportFile(file, jsonFile);
                    });
                    break;
                default:
                    it('Проверка строк файла', async () => {
                        const jsonFile = await el.file.readNum(params.name);
                        const file = agr === 'min' ? params.file2 : params.file1;
                        await dec.exportFile(file, jsonFile);
                    });
                    break;

            }

            it('Удаление файла', async () => await dec.simple(el.file.delete,
                [params.name, entry.upload],
                el.file));
        });

        deleteParams();

    });

    // Имя выходного файла — системное имя. Заголовок — Добавить заголовок к файлу.
    const systemNameAddHead = () => describe(`Подразделение. Экспорт. ${format}. Имя выходного файла — системное имя. '
        'Заголовок — Добавить заголовок к файлу. ${str}.`, () => {

        const params = {
            name: 'division.xlsx',
            file1: [
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
                    'Отчет "Подразделения"': 'apiMaxdivision1',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: '',
                    __EMPTY_4: '',
                    __EMPTY_5: ''
                },
                {
                    'Отчет "Подразделения"': 'apiMaxDivision21',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: '',
                    __EMPTY_4: '',
                    __EMPTY_5: ''
                },
                {
                    'Отчет "Подразделения"': 'apiMaxDivision21/apiMaxDivision22',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: '',
                    __EMPTY_4: '',
                    __EMPTY_5: ''
                },
                {
                    'Отчет "Подразделения"': 'apiMaxDivision31',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: '',
                    __EMPTY_4: '',
                    __EMPTY_5: ''
                },
                {
                    'Отчет "Подразделения"': 'apiMaxDivision31/apiMaxDivision32',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: '',
                    __EMPTY_4: '',
                    __EMPTY_5: ''
                },
                {
                    'Отчет "Подразделения"': 'apiMaxDivision31/apiMaxDivision32/apiMaxDivision33',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: '',
                    __EMPTY_4: '',
                    __EMPTY_5: ''
                },
                {
                    'Отчет "Подразделения"': 'apiMaxDivision41',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: '',
                    __EMPTY_4: '',
                    __EMPTY_5: ''
                },
                {
                    'Отчет "Подразделения"': 'apiMaxDivision41/apiMaxDivision42',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: '',
                    __EMPTY_4: '',
                    __EMPTY_5: ''
                },
                {
                    'Отчет "Подразделения"': 'apiMaxDivision41/apiMaxDivision42/apiMaxDivision43',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: '',
                    __EMPTY_4: '',
                    __EMPTY_5: ''
                },
                {
                    'Отчет "Подразделения"': 'apiMaxDivision41/apiMaxDivision42/apiMaxDivision43/apiMaxDivision44',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: '',
                    __EMPTY_4: '',
                    __EMPTY_5: ''
                },
                {
                    'Отчет "Подразделения"': 'apiMaxDivision51',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: 'apiMaxTemplate1',
                    __EMPTY_4: '',
                    __EMPTY_5: ''
                },
                {
                    'Отчет "Подразделения"': 'apiMaxDivision51/apiMaxDivision52',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: 'apiMaxTemplate1',
                    __EMPTY_4: '',
                    __EMPTY_5: ''
                },
                {
                    'Отчет "Подразделения"': 'apiMaxDivision51/apiMaxDivision52/apiMaxDivision53',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: 'apiMaxTemplate1',
                    __EMPTY_4: '',
                    __EMPTY_5: ''
                },
                {
                    'Отчет "Подразделения"': 'apiMaxDivision51/apiMaxDivision52/apiMaxDivision53/apiMaxDivision54',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: 'apiMaxTemplate1',
                    __EMPTY_4: '',
                    __EMPTY_5: ''
                },
                {
                    'Отчет "Подразделения"': 'apiMaxDivision51/apiMaxDivision52/apiMaxDivision53/apiMaxDivision54/apiMaxDivision55',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: 'apiMaxTemplate1',
                    __EMPTY_4: '',
                    __EMPTY_5: ''
                },
                {
                    'Отчет "Подразделения"': 'apiMaxDivision61',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: 'apiMaxTemplate1',
                    __EMPTY_4: 'apiMaxSchedule',
                    __EMPTY_5: ''
                },
                {
                    'Отчет "Подразделения"': 'apiMaxDivision61/apiMaxDivision62',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: 'apiMaxTemplate1',
                    __EMPTY_4: 'apiMaxSchedule',
                    __EMPTY_5: ''
                },
                {
                    'Отчет "Подразделения"': 'apiMaxDivision61/apiMaxDivision62/apiMaxDivision63',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: 'apiMaxTemplate1',
                    __EMPTY_4: 'apiMaxSchedule',
                    __EMPTY_5: ''
                },
                {
                    'Отчет "Подразделения"': 'apiMaxDivision61/apiMaxDivision62/apiMaxDivision63/apiMaxDivision64',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: 'apiMaxTemplate1',
                    __EMPTY_4: 'apiMaxSchedule',
                    __EMPTY_5: ''
                },
                {
                    'Отчет "Подразделения"': 'apiMaxDivision61/apiMaxDivision62/apiMaxDivision63/apiMaxDivision64/apiMaxDivision65',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: 'apiMaxTemplate1',
                    __EMPTY_4: 'apiMaxSchedule',
                    __EMPTY_5: ''
                },
                {
                    'Отчет "Подразделения"': 'apiMaxDivision61/apiMaxDivision62/apiMaxDivision63/apiMaxDivision64/apiMaxDivision65/apiMaxDivision66',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: 'apiMaxTemplate1',
                    __EMPTY_4: 'apiMaxSchedule',
                    __EMPTY_5: ''
                },
                {
                    'Отчет "Подразделения"': 'apiMaxDivision71',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: 'apiMaxTemplate1',
                    __EMPTY_4: 'apiMaxSchedule',
                    __EMPTY_5: 'staff 1 '
                },
                {
                    'Отчет "Подразделения"': 'apiMaxDivision71/apiMaxDivision72',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: 'apiMaxTemplate1',
                    __EMPTY_4: 'apiMaxSchedule',
                    __EMPTY_5: 'staff 1 '
                },
                {
                    'Отчет "Подразделения"': 'apiMaxDivision71/apiMaxDivision72/apiMaxDivision73',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: 'apiMaxTemplate1',
                    __EMPTY_4: 'apiMaxSchedule',
                    __EMPTY_5: 'staff 1 '
                },
                {
                    'Отчет "Подразделения"': 'apiMaxDivision71/apiMaxDivision72/apiMaxDivision73/apiMaxDivision74',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: 'apiMaxTemplate1',
                    __EMPTY_4: 'apiMaxSchedule',
                    __EMPTY_5: 'staff 1 '
                },
                {
                    'Отчет "Подразделения"': 'apiMaxDivision71/apiMaxDivision72/apiMaxDivision73/apiMaxDivision74/apiMaxDivision75',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: 'apiMaxTemplate1',
                    __EMPTY_4: 'apiMaxSchedule',
                    __EMPTY_5: 'staff 1 '
                },
                {
                    'Отчет "Подразделения"': 'apiMaxDivision71/apiMaxDivision72/apiMaxDivision73/apiMaxDivision74/apiMaxDivision75/apiMaxDivision76',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: 'apiMaxTemplate1',
                    __EMPTY_4: 'apiMaxSchedule',
                    __EMPTY_5: 'staff 1 '
                },
                {
                    'Отчет "Подразделения"': 'apiMaxDivision71/apiMaxDivision72/apiMaxDivision73/apiMaxDivision74/apiMaxDivision75/apiMaxDivision76/apiMaxDivision77',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: 'apiMaxTemplate1',
                    __EMPTY_4: 'apiMaxSchedule',
                    __EMPTY_5: 'staff 1 '
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
            ],
            file2: [
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
                    'Отчет "Подразделения"': 'apiMinDivision1',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: '',
                    __EMPTY_4: '',
                    __EMPTY_5: ''
                },
                {
                    'Отчет "Подразделения"': 'apiMinDivision1/apiMinDivision2',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: '',
                    __EMPTY_4: '',
                    __EMPTY_5: ''
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
        };

        agr === 'min' ? apiMin() : apiMax();

        describe('Экспорт', () => {

            bef();
            aft();

            it('Нажатие кнопки "Меню"', async () => await dec.simple(el.butIcBefore.handler,
                [but.menu, entry.max],
                el.butIcBefore));

            it('Отображение "Меню"', async () => await dec.simple(el.menu.menu,
                [entry.max],
                el.menu));

            it('Нажатие параметра "Экспорт"', async () => await dec.simple(el.menu.handler,
                ['Экспорт', entry.max],
                el.menu));

            it('Отображение модального окна "Экспортировать данные"', async () => await dec.simple(el.modal.exportData.init,
                [entry.max],
                el.modal.exportData));

            it('Выбор "Выберите тип файла для экспорта"', async () => await dec.simple(el.select.iconXpand,
                ['Выберите тип файла для экспорта', 'XLSX', 'XLSX', entry.max],
                el.select));

            it('Выбор "Заголовок"', async () => await dec.simple(el.select.iconXpand,
                ['Заголовок', 'Добавить заголовок к файлу', 'Добавить заголовок к файлу', entry.max],
                el.select));

            it('Нажатие кнопки "Экспортировать"', async () => await dec.simple(el.button.handler,
                ['Экспортировать', entry.max],
                el.button));

            it('Отсутствие модального окна "Экспортировать данные"',
                async () => await dec.simple(el.modal.exportData.initClose,
                    [entry.max],
                    el.modal.exportData));
        });

        describe('Проверка файла экспорта', () => {

            it('Отображение файла', async () => await dec.simple(el.file.display,
                [params.name, entry.upload],
                el.file));

            it('Проверка строк файла', async () => {
                const jsonFile = await el.file.readNum(params.name);
                console.log('jsonFile', jsonFile)
                const file = agr === 'min' ? params.file2 : params.file1;
                await dec.exportFile(file, jsonFile);
            })

            it('Удаление файла', async () => await dec.simple(el.file.delete,
                [params.name, entry.upload],
                el.file));
        });

        deleteParams();

    });

    // Имя выходного файла — системное имя. Заголовок — Добавить свой заголовок.
    const systemNameItHead = () => describe(`Подразделение. Экспорт. ${format}. Имя выходного файла — системное имя. 
        Заголовок — Добавить свой заголовок. ${str}.`, () => {

        const params = {
            name: 'division.xlsx',
            head: 'systemNameItHead',
            file1: [
                {
                    systemNameItHead: 'Подразделение',
                    __EMPTY: 'Телефон',
                    __EMPTY_1: 'Описание',
                    __EMPTY_2: 'Шаблон доступа для сотрудников',
                    __EMPTY_3: 'Шаблон доступа для посетителей',
                    __EMPTY_4: 'График работы',
                    __EMPTY_5: 'Сопровождающий'
                },
                {
                    systemNameItHead: 'apiMaxdivision1',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: '',
                    __EMPTY_4: '',
                    __EMPTY_5: ''
                },
                {
                    systemNameItHead: 'apiMaxDivision21',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: '',
                    __EMPTY_4: '',
                    __EMPTY_5: ''
                },
                {
                    systemNameItHead: 'apiMaxDivision21/apiMaxDivision22',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: '',
                    __EMPTY_4: '',
                    __EMPTY_5: ''
                },
                {
                    systemNameItHead: 'apiMaxDivision31',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: '',
                    __EMPTY_4: '',
                    __EMPTY_5: ''
                },
                {
                    systemNameItHead: 'apiMaxDivision31/apiMaxDivision32',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: '',
                    __EMPTY_4: '',
                    __EMPTY_5: ''
                },
                {
                    systemNameItHead: 'apiMaxDivision31/apiMaxDivision32/apiMaxDivision33',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: '',
                    __EMPTY_4: '',
                    __EMPTY_5: ''
                },
                {
                    systemNameItHead: 'apiMaxDivision41',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: '',
                    __EMPTY_4: '',
                    __EMPTY_5: ''
                },
                {
                    systemNameItHead: 'apiMaxDivision41/apiMaxDivision42',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: '',
                    __EMPTY_4: '',
                    __EMPTY_5: ''
                },
                {
                    systemNameItHead: 'apiMaxDivision41/apiMaxDivision42/apiMaxDivision43',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: '',
                    __EMPTY_4: '',
                    __EMPTY_5: ''
                },
                {
                    systemNameItHead: 'apiMaxDivision41/apiMaxDivision42/apiMaxDivision43/apiMaxDivision44',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: '',
                    __EMPTY_4: '',
                    __EMPTY_5: ''
                },
                {
                    systemNameItHead: 'apiMaxDivision51',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: 'apiMaxTemplate1',
                    __EMPTY_4: '',
                    __EMPTY_5: ''
                },
                {
                    systemNameItHead: 'apiMaxDivision51/apiMaxDivision52',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: 'apiMaxTemplate1',
                    __EMPTY_4: '',
                    __EMPTY_5: ''
                },
                {
                    systemNameItHead: 'apiMaxDivision51/apiMaxDivision52/apiMaxDivision53',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: 'apiMaxTemplate1',
                    __EMPTY_4: '',
                    __EMPTY_5: ''
                },
                {
                    systemNameItHead: 'apiMaxDivision51/apiMaxDivision52/apiMaxDivision53/apiMaxDivision54',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: 'apiMaxTemplate1',
                    __EMPTY_4: '',
                    __EMPTY_5: ''
                },
                {
                    systemNameItHead: 'apiMaxDivision51/apiMaxDivision52/apiMaxDivision53/apiMaxDivision54/apiMaxDivision55',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: 'apiMaxTemplate1',
                    __EMPTY_4: '',
                    __EMPTY_5: ''
                },
                {
                    systemNameItHead: 'apiMaxDivision61',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: 'apiMaxTemplate1',
                    __EMPTY_4: 'apiMaxSchedule',
                    __EMPTY_5: ''
                },
                {
                    systemNameItHead: 'apiMaxDivision61/apiMaxDivision62',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: 'apiMaxTemplate1',
                    __EMPTY_4: 'apiMaxSchedule',
                    __EMPTY_5: ''
                },
                {
                    systemNameItHead: 'apiMaxDivision61/apiMaxDivision62/apiMaxDivision63',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: 'apiMaxTemplate1',
                    __EMPTY_4: 'apiMaxSchedule',
                    __EMPTY_5: ''
                },
                {
                    systemNameItHead: 'apiMaxDivision61/apiMaxDivision62/apiMaxDivision63/apiMaxDivision64',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: 'apiMaxTemplate1',
                    __EMPTY_4: 'apiMaxSchedule',
                    __EMPTY_5: ''
                },
                {
                    systemNameItHead: 'apiMaxDivision61/apiMaxDivision62/apiMaxDivision63/apiMaxDivision64/apiMaxDivision65',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: 'apiMaxTemplate1',
                    __EMPTY_4: 'apiMaxSchedule',
                    __EMPTY_5: ''
                },
                {
                    systemNameItHead: 'apiMaxDivision61/apiMaxDivision62/apiMaxDivision63/apiMaxDivision64/apiMaxDivision65/apiMaxDivision66',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: 'apiMaxTemplate1',
                    __EMPTY_4: 'apiMaxSchedule',
                    __EMPTY_5: ''
                },
                {
                    systemNameItHead: 'apiMaxDivision71',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: 'apiMaxTemplate1',
                    __EMPTY_4: 'apiMaxSchedule',
                    __EMPTY_5: 'staff 1 '
                },
                {
                    systemNameItHead: 'apiMaxDivision71/apiMaxDivision72',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: 'apiMaxTemplate1',
                    __EMPTY_4: 'apiMaxSchedule',
                    __EMPTY_5: 'staff 1 '
                },
                {
                    systemNameItHead: 'apiMaxDivision71/apiMaxDivision72/apiMaxDivision73',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: 'apiMaxTemplate1',
                    __EMPTY_4: 'apiMaxSchedule',
                    __EMPTY_5: 'staff 1 '
                },
                {
                    systemNameItHead: 'apiMaxDivision71/apiMaxDivision72/apiMaxDivision73/apiMaxDivision74',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: 'apiMaxTemplate1',
                    __EMPTY_4: 'apiMaxSchedule',
                    __EMPTY_5: 'staff 1 '
                },
                {
                    systemNameItHead: 'apiMaxDivision71/apiMaxDivision72/apiMaxDivision73/apiMaxDivision74/apiMaxDivision75',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: 'apiMaxTemplate1',
                    __EMPTY_4: 'apiMaxSchedule',
                    __EMPTY_5: 'staff 1 '
                },
                {
                    systemNameItHead: 'apiMaxDivision71/apiMaxDivision72/apiMaxDivision73/apiMaxDivision74/apiMaxDivision75/apiMaxDivision76',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: 'apiMaxTemplate1',
                    __EMPTY_4: 'apiMaxSchedule',
                    __EMPTY_5: 'staff 1 '
                },
                {
                    systemNameItHead: 'apiMaxDivision71/apiMaxDivision72/apiMaxDivision73/apiMaxDivision74/apiMaxDivision75/apiMaxDivision76/apiMaxDivision77',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: 'apiMaxTemplate1',
                    __EMPTY_4: 'apiMaxSchedule',
                    __EMPTY_5: 'staff 1 '
                },
                {
                    systemNameItHead: 'Администраторы системы',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: '',
                    __EMPTY_4: '',
                    __EMPTY_5: ''
                }
            ],
            file2: [
                {
                    systemNameItHead: 'Подразделение',
                    __EMPTY: 'Телефон',
                    __EMPTY_1: 'Описание',
                    __EMPTY_2: 'Шаблон доступа для сотрудников',
                    __EMPTY_3: 'Шаблон доступа для посетителей',
                    __EMPTY_4: 'График работы',
                    __EMPTY_5: 'Сопровождающий'
                },
                {
                    systemNameItHead: 'apiMinDivision1',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: '',
                    __EMPTY_4: '',
                    __EMPTY_5: ''
                },
                {
                    systemNameItHead: 'apiMinDivision1/apiMinDivision2',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: '',
                    __EMPTY_4: '',
                    __EMPTY_5: ''
                },
                {
                    systemNameItHead: 'Администраторы системы',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: '',
                    __EMPTY_4: '',
                    __EMPTY_5: ''
                }
            ]
        };

        agr === 'min' ? apiMin() : apiMax();

        describe('Экспорт', () => {

            bef();
            aft();

            it('Нажатие кнопки "Меню"', async () => await dec.simple(el.butIcBefore.handler,
                [but.menu, entry.max],
                el.butIcBefore));

            it('Отображение "Меню"', async () => await dec.simple(el.menu.menu,
                [entry.max],
                el.menu));

            it('Нажатие параметра "Экспорт"', async () => await dec.simple(el.menu.handler,
                ['Экспорт', entry.max],
                el.menu));

            it('Отображение модального окна "Экспортировать данные"', async () => await dec.simple(el.modal.exportData.init,
                [entry.max],
                el.modal.exportData));

            it('Выбор "Выберите тип файла для экспорта"', async () => await dec.simple(el.select.iconXpand,
                ['Выберите тип файла для экспорта', 'XLSX', 'XLSX', entry.max],
                el.select));

            it('Выбор "Заголовок"', async () => await dec.simple(el.select.iconXpand,
                ['Заголовок', 'Добавить заголовок к файлу', 'Добавить свой заголовок', entry.max],
                el.select));

            it('Ввод "Наименование"', async () => await dec.simple(el.input.sendKeys,
                ['Наименование', '', params.head, entry.max],
                el.input));

            it('Нажатие кнопки "Экспортировать"', async () => await dec.simple(el.button.handler,
                ['Экспортировать', entry.max],
                el.button));

            it('Отсутствие модального окна "Экспортировать данные"',
                async () => await dec.simple(el.modal.exportData.initClose,
                    [entry.max],
                    el.modal.exportData));
        });

        describe('Проверка файла экспорта', () => {

            it('Отображение файла', async () => await dec.simple(el.file.display,
                [params.name, entry.upload],
                el.file));

            it('Проверка строк файла', async () => {
                const jsonFile = await el.file.readNum(params.name);
                console.log('jsonFile', jsonFile)
                const file = agr === 'min' ? params.file2 : params.file1;
                await dec.exportFile(file, jsonFile);
            })

            it('Удаление файла', async () => await dec.simple(el.file.delete,
                [params.name, entry.upload],
                el.file));
        });

        deleteParams();

    });

    // Имя выходного файла — свое имя. Заголовок — Не добавлять заголовок.
    const nameNoHead = () => describe(`Подразделение. Экспорт. ${format}. Имя выходного файла — свое имя. 
        Заголовок — Не добавлять заголовок. ${str}.`, () => {

        const params = {
            name: format === 'XLSX' ? 'nameNoHead.xlsx' : 'nameNoHead.csv',
            file1: [
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
                    'Отчет "Подразделения"': 'apiMaxdivision1',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: '',
                    __EMPTY_4: '',
                    __EMPTY_5: ''
                },
                {
                    'Отчет "Подразделения"': 'apiMaxDivision21',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: '',
                    __EMPTY_4: '',
                    __EMPTY_5: ''
                },
                {
                    'Отчет "Подразделения"': 'apiMaxDivision21/apiMaxDivision22',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: '',
                    __EMPTY_4: '',
                    __EMPTY_5: ''
                },
                {
                    'Отчет "Подразделения"': 'apiMaxDivision31',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: '',
                    __EMPTY_4: '',
                    __EMPTY_5: ''
                },
                {
                    'Отчет "Подразделения"': 'apiMaxDivision31/apiMaxDivision32',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: '',
                    __EMPTY_4: '',
                    __EMPTY_5: ''
                },
                {
                    'Отчет "Подразделения"': 'apiMaxDivision31/apiMaxDivision32/apiMaxDivision33',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: '',
                    __EMPTY_4: '',
                    __EMPTY_5: ''
                },
                {
                    'Отчет "Подразделения"': 'apiMaxDivision41',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: '',
                    __EMPTY_4: '',
                    __EMPTY_5: ''
                },
                {
                    'Отчет "Подразделения"': 'apiMaxDivision41/apiMaxDivision42',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: '',
                    __EMPTY_4: '',
                    __EMPTY_5: ''
                },
                {
                    'Отчет "Подразделения"': 'apiMaxDivision41/apiMaxDivision42/apiMaxDivision43',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: '',
                    __EMPTY_4: '',
                    __EMPTY_5: ''
                },
                {
                    'Отчет "Подразделения"': 'apiMaxDivision41/apiMaxDivision42/apiMaxDivision43/apiMaxDivision44',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: '',
                    __EMPTY_4: '',
                    __EMPTY_5: ''
                },
                {
                    'Отчет "Подразделения"': 'apiMaxDivision51',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: 'apiMaxTemplate1',
                    __EMPTY_4: '',
                    __EMPTY_5: ''
                },
                {
                    'Отчет "Подразделения"': 'apiMaxDivision51/apiMaxDivision52',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: 'apiMaxTemplate1',
                    __EMPTY_4: '',
                    __EMPTY_5: ''
                },
                {
                    'Отчет "Подразделения"': 'apiMaxDivision51/apiMaxDivision52/apiMaxDivision53',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: 'apiMaxTemplate1',
                    __EMPTY_4: '',
                    __EMPTY_5: ''
                },
                {
                    'Отчет "Подразделения"': 'apiMaxDivision51/apiMaxDivision52/apiMaxDivision53/apiMaxDivision54',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: 'apiMaxTemplate1',
                    __EMPTY_4: '',
                    __EMPTY_5: ''
                },
                {
                    'Отчет "Подразделения"': 'apiMaxDivision51/apiMaxDivision52/apiMaxDivision53/apiMaxDivision54/apiMaxDivision55',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: 'apiMaxTemplate1',
                    __EMPTY_4: '',
                    __EMPTY_5: ''
                },
                {
                    'Отчет "Подразделения"': 'apiMaxDivision61',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: 'apiMaxTemplate1',
                    __EMPTY_4: 'apiMaxSchedule',
                    __EMPTY_5: ''
                },
                {
                    'Отчет "Подразделения"': 'apiMaxDivision61/apiMaxDivision62',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: 'apiMaxTemplate1',
                    __EMPTY_4: 'apiMaxSchedule',
                    __EMPTY_5: ''
                },
                {
                    'Отчет "Подразделения"': 'apiMaxDivision61/apiMaxDivision62/apiMaxDivision63',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: 'apiMaxTemplate1',
                    __EMPTY_4: 'apiMaxSchedule',
                    __EMPTY_5: ''
                },
                {
                    'Отчет "Подразделения"': 'apiMaxDivision61/apiMaxDivision62/apiMaxDivision63/apiMaxDivision64',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: 'apiMaxTemplate1',
                    __EMPTY_4: 'apiMaxSchedule',
                    __EMPTY_5: ''
                },
                {
                    'Отчет "Подразделения"': 'apiMaxDivision61/apiMaxDivision62/apiMaxDivision63/apiMaxDivision64/apiMaxDivision65',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: 'apiMaxTemplate1',
                    __EMPTY_4: 'apiMaxSchedule',
                    __EMPTY_5: ''
                },
                {
                    'Отчет "Подразделения"': 'apiMaxDivision61/apiMaxDivision62/apiMaxDivision63/apiMaxDivision64/apiMaxDivision65/apiMaxDivision66',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: 'apiMaxTemplate1',
                    __EMPTY_4: 'apiMaxSchedule',
                    __EMPTY_5: ''
                },
                {
                    'Отчет "Подразделения"': 'apiMaxDivision71',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: 'apiMaxTemplate1',
                    __EMPTY_4: 'apiMaxSchedule',
                    __EMPTY_5: 'staff 1 '
                },
                {
                    'Отчет "Подразделения"': 'apiMaxDivision71/apiMaxDivision72',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: 'apiMaxTemplate1',
                    __EMPTY_4: 'apiMaxSchedule',
                    __EMPTY_5: 'staff 1 '
                },
                {
                    'Отчет "Подразделения"': 'apiMaxDivision71/apiMaxDivision72/apiMaxDivision73',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: 'apiMaxTemplate1',
                    __EMPTY_4: 'apiMaxSchedule',
                    __EMPTY_5: 'staff 1 '
                },
                {
                    'Отчет "Подразделения"': 'apiMaxDivision71/apiMaxDivision72/apiMaxDivision73/apiMaxDivision74',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: 'apiMaxTemplate1',
                    __EMPTY_4: 'apiMaxSchedule',
                    __EMPTY_5: 'staff 1 '
                },
                {
                    'Отчет "Подразделения"': 'apiMaxDivision71/apiMaxDivision72/apiMaxDivision73/apiMaxDivision74/apiMaxDivision75',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: 'apiMaxTemplate1',
                    __EMPTY_4: 'apiMaxSchedule',
                    __EMPTY_5: 'staff 1 '
                },
                {
                    'Отчет "Подразделения"': 'apiMaxDivision71/apiMaxDivision72/apiMaxDivision73/apiMaxDivision74/apiMaxDivision75/apiMaxDivision76',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: 'apiMaxTemplate1',
                    __EMPTY_4: 'apiMaxSchedule',
                    __EMPTY_5: 'staff 1 '
                },
                {
                    'Отчет "Подразделения"': 'apiMaxDivision71/apiMaxDivision72/apiMaxDivision73/apiMaxDivision74/apiMaxDivision75/apiMaxDivision76/apiMaxDivision77',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: 'apiMaxTemplate1',
                    __EMPTY_4: 'apiMaxSchedule',
                    __EMPTY_5: 'staff 1 '
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
            ],
            file2: [
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
                    'Отчет "Подразделения"': 'apiMinDivision1',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: '',
                    __EMPTY_4: '',
                    __EMPTY_5: ''
                },
                {
                    'Отчет "Подразделения"': 'apiMinDivision1/apiMinDivision2',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: '',
                    __EMPTY_4: '',
                    __EMPTY_5: ''
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
            ],
            file3: [
                {
                    "Подразделение": "apiMaxdivision1"
                },
                {
                    "Подразделение": "apiMaxDivision21",
                    "Телефон": "apiMaxPhone"
                },
                {
                    "Подразделение": "apiMaxDivision21/apiMaxDivision22",
                    "Телефон": "apiMaxPhone"
                },
                {
                    "Описание": "apiMaxDescription",
                    "Подразделение": "apiMaxDivision31",
                    "Телефон": "apiMaxPhone"
                },
                {
                    "Описание": "apiMaxDescription",
                    "Подразделение": "apiMaxDivision31/apiMaxDivision32",
                    "Телефон": "apiMaxPhone"
                },
                {
                    "Описание": "apiMaxDescription",
                    "Подразделение": "apiMaxDivision31/apiMaxDivision32/apiMaxDivision33",
                    "Телефон": "apiMaxPhone"
                },
                {
                    "Описание": "apiMaxDescription",
                    "Подразделение": "apiMaxDivision41",
                    "Телефон": "apiMaxPhone"
                },
                {
                    "Описание": "apiMaxDescription",
                    "Подразделение": "apiMaxDivision41/apiMaxDivision42",
                    "Телефон": "apiMaxPhone"
                },
                {
                    "Описание": "apiMaxDescription",
                    "Подразделение": "apiMaxDivision41/apiMaxDivision42/apiMaxDivision43",
                    "Телефон": "apiMaxPhone"
                },
                {
                    "Описание": "apiMaxDescription",
                    "Подразделение": "apiMaxDivision41/apiMaxDivision42/apiMaxDivision43/apiMaxDivision44",
                    "Телефон": "apiMaxPhone"
                },
                {
                    "Описание": "apiMaxDescription",
                    "Подразделение": "apiMaxDivision51",
                    "Телефон": "apiMaxPhone",
                    "Шаблон доступа для посетителей": "apiMaxTemplate1"
                },
                {
                    "Описание": "apiMaxDescription",
                    "Подразделение": "apiMaxDivision51/apiMaxDivision52",
                    "Телефон": "apiMaxPhone",
                    "Шаблон доступа для посетителей": "apiMaxTemplate1"
                },
                {
                    "Описание": "apiMaxDescription",
                    "Подразделение": "apiMaxDivision51/apiMaxDivision52/apiMaxDivision53",
                    "Телефон": "apiMaxPhone",
                    "Шаблон доступа для посетителей": "apiMaxTemplate1"
                },
                {
                    "Описание": "apiMaxDescription",
                    "Подразделение": "apiMaxDivision51/apiMaxDivision52/apiMaxDivision53/apiMaxDivision54",
                    "Телефон": "apiMaxPhone",
                    "Шаблон доступа для посетителей": "apiMaxTemplate1"
                },
                {
                    "Описание": "apiMaxDescription",
                    "Подразделение": "apiMaxDivision51/apiMaxDivision52/apiMaxDivision53/apiMaxDivision54/apiMaxDivision55",
                    "Телефон": "apiMaxPhone",
                    "Шаблон доступа для посетителей": "apiMaxTemplate1"
                },
                {
                    "График работы": "apiMaxSchedule",
                    "Описание": "apiMaxDescription",
                    "Подразделение": "apiMaxDivision61",
                    "Телефон": "apiMaxPhone",
                    "Шаблон доступа для посетителей": "apiMaxTemplate1"
                },
                {
                    "График работы": "apiMaxSchedule",
                    "Описание": "apiMaxDescription",
                    "Подразделение": "apiMaxDivision61/apiMaxDivision62",
                    "Телефон": "apiMaxPhone",
                    "Шаблон доступа для посетителей": "apiMaxTemplate1"
                },
                {
                    "График работы": "apiMaxSchedule",
                    "Описание": "apiMaxDescription",
                    "Подразделение": "apiMaxDivision61/apiMaxDivision62/apiMaxDivision63",
                    "Телефон": "apiMaxPhone",
                    "Шаблон доступа для посетителей": "apiMaxTemplate1",
                },
                {
                    "График работы": "apiMaxSchedule",
                    "Описание": "apiMaxDescription",
                    "Подразделение": "apiMaxDivision61/apiMaxDivision62/apiMaxDivision63/apiMaxDivision64",
                    "Телефон": "apiMaxPhone",
                    "Шаблон доступа для посетителей": "apiMaxTemplate1"
                },
                {
                    "График работы": "apiMaxSchedule",
                    "Описание": "apiMaxDescription",
                    "Подразделение": "apiMaxDivision61/apiMaxDivision62/apiMaxDivision63/apiMaxDivision64/apiMaxDivision65",
                    "Телефон": "apiMaxPhone",
                    "Шаблон доступа для посетителей": "apiMaxTemplate1"
                },
                {
                    "График работы": "apiMaxSchedule",
                    "Описание": "apiMaxDescription",
                    "Подразделение": "apiMaxDivision61/apiMaxDivision62/apiMaxDivision63/apiMaxDivision64/apiMaxDivision65/apiMaxDivision66",
                    "Телефон": "apiMaxPhone",
                    "Шаблон доступа для посетителей": "apiMaxTemplate1"
                },
                {
                    "График работы": "apiMaxSchedule",
                    "Описание": "apiMaxDescription",
                    "Подразделение": "apiMaxDivision71",
                    "Сопровождающий": "staff 1 ",
                    "Телефон": "apiMaxPhone",
                    "Шаблон доступа для посетителей": "apiMaxTemplate1"
                },
                {
                    "График работы": "apiMaxSchedule",
                    "Описание": "apiMaxDescription",
                    "Подразделение": "apiMaxDivision71/apiMaxDivision72",
                    "Сопровождающий": "staff 1 ",
                    "Телефон": "apiMaxPhone",
                    "Шаблон доступа для посетителей": "apiMaxTemplate1"
                },
                {
                    "График работы": "apiMaxSchedule",
                    "Описание": "apiMaxDescription",
                    "Подразделение": "apiMaxDivision71/apiMaxDivision72/apiMaxDivision73",
                    "Сопровождающий": "staff 1 ",
                    "Телефон": "apiMaxPhone",
                    "Шаблон доступа для посетителей": "apiMaxTemplate1"
                },
                {
                    "График работы": "apiMaxSchedule",
                    "Описание": "apiMaxDescription",
                    "Подразделение": "apiMaxDivision71/apiMaxDivision72/apiMaxDivision73/apiMaxDivision74",
                    "Сопровождающий": "staff 1 ",
                    "Телефон": "apiMaxPhone",
                    "Шаблон доступа для посетителей": "apiMaxTemplate1"
                },
                {
                    "График работы": "apiMaxSchedule",
                    "Описание": "apiMaxDescription",
                    "Подразделение": "apiMaxDivision71/apiMaxDivision72/apiMaxDivision73/apiMaxDivision74/apiMaxDivision75",
                    "Сопровождающий": "staff 1 ",
                    "Телефон": "apiMaxPhone",
                    "Шаблон доступа для посетителей": "apiMaxTemplate1"
                },
                {
                    "График работы": "apiMaxSchedule",
                    "Описание": "apiMaxDescription",
                    "Подразделение": "apiMaxDivision71/apiMaxDivision72/apiMaxDivision73/apiMaxDivision74/apiMaxDivision75/apiMaxDivision76",
                    "Сопровождающий": "staff 1 ",
                    "Телефон": "apiMaxPhone",
                    "Шаблон доступа для посетителей": "apiMaxTemplate1"
                },
                {
                    "График работы": "apiMaxSchedule",
                    "Описание": "apiMaxDescription",
                    "Подразделение": "apiMaxDivision71/apiMaxDivision72/apiMaxDivision73/apiMaxDivision74/apiMaxDivision75/apiMaxDivision76/apiMaxDivision77",
                    "Сопровождающий": "staff 1 ",
                    "Телефон": "apiMaxPhone",
                    "Шаблон доступа для посетителей": "apiMaxTemplate1"
                },
                {
                    "Подразделение": "Администраторы системы"
                }
            ],
            file4: [
                { 'Подразделение': 'apiMinDivision1' },
                { 'Подразделение': 'apiMinDivision1/apiMinDivision2' },
                { 'Подразделение': 'Администраторы системы' }
            ],
            fileName: 'nameNoHead'
        };

        agr === 'min' ? apiMin() : apiMax();

        describe('Экспорт', () => {

            bef();
            aft();

            it('Нажатие кнопки "Меню"', async () => await dec.simple(el.butIcBefore.handler,
                [but.menu, entry.max],
                el.butIcBefore));

            it('Отображение "Меню"', async () => await dec.simple(el.menu.menu,
                [entry.max],
                el.menu));

            it('Нажатие параметра "Экспорт"', async () => await dec.simple(el.menu.handler,
                ['Экспорт', entry.max],
                el.menu));

            it('Отображение модального окна "Экспортировать данные"', async () => await dec.simple(el.modal.exportData.init,
                [entry.max],
                el.modal.exportData));

            switch (format) {
                case 'XLSX':
                    it('Выбор "Выберите тип файла для экспорта"', async () => await dec.simple(el.select.iconXpand,
                        ['Выберите тип файла для экспорта', 'XLSX', 'XLSX', entry.max],
                        el.select));

                    it('Ввод "Имя выходного файла"', async () => await dec.simple(el.input.sendKeys,
                        ['Имя выходного файла', 'Определяется системой', params.fileName, entry.max],
                        el.input));

                    it('Выбор "Заголовок"', async () => await dec.simple(el.select.iconXpand,
                        ['Заголовок', 'Добавить заголовок к файлу', 'Не добавлять заголовок', entry.max],
                        el.select));
                    break;
                case 'CSV':
                    it('Выбор "Выберите тип файла для экспорта"', async () => await dec.simple(el.select.iconXpand,
                        ['Выберите тип файла для экспорта', 'XLSX', 'CSV', entry.max],
                        el.select));

                    it('Ввод "Имя выходного файла"', async () => await dec.simple(el.input.sendKeys,
                        ['Имя выходного файла', 'Определяется системой', params.fileName, entry.max],
                        el.input));
                    break;
                default:
                    it('Выбор "Выберите тип файла для экспорта"', async () => await dec.simple(el.select.iconXpand,
                        ['Выберите тип файла для экспорта', 'XLSX', 'XLSX', entry.max],
                        el.select));

                    it('Ввод "Имя выходного файла"', async () => await dec.simple(el.input.sendKeys,
                        ['Имя выходного файла', 'Определяется системой', params.fileName, entry.max],
                        el.input));

                    it('Выбор "Заголовок"', async () => await dec.simple(el.select.iconXpand,
                        ['Заголовок', 'Добавить заголовок к файлу', 'Не добавлять заголовок', entry.max],
                        el.select));
                    break;
            }

            it('Нажатие кнопки "Экспортировать"', async () => await dec.simple(el.button.handler,
                ['Экспортировать', entry.max],
                el.button));

            it('Отсутствие модального окна "Экспортировать данные"',
                async () => await dec.simple(el.modal.exportData.initClose,
                    [entry.max],
                    el.modal.exportData));


        });

        describe('Проверка файла экспорта', () => {

            it('Отображение файла', async () => await dec.simple(el.file.display,
                [params.name, entry.upload],
                el.file));

            switch (format) {
                case 'XLSX':
                    it('Проверка строк файла', async () => {
                        const jsonFile = await el.file.readNum(params.name);
                        console.log('jsonFile', jsonFile)
                        const file = agr === 'min' ? params.file2 : params.file1;
                        await dec.exportFile(file, jsonFile);
                    });
                    break;
                case 'CSV':
                    it('Проверка строк файла', async () => {
                        const jsonFile = await el.file.readNum(params.name);
                        console.log('jsonFile', jsonFile)
                        const file = agr === 'min' ? params.file4 : params.file3;
                        await dec.exportFile(file, jsonFile);
                    });
                    break;
                default:
                    it('Проверка строк файла', async () => {
                        const jsonFile = await el.file.readNum(params.name);
                        console.log('jsonFile', jsonFile)
                        const file = agr === 'min' ? params.file2 : params.file1;
                        await dec.exportFile(file, jsonFile);
                    });
                    break;
            }

            it('Удаление файла', async () => await dec.simple(el.file.delete,
                [params.name, entry.upload],
                el.file));
        });

        deleteParams();

    });

    // Экспорт. Имя выходного файла — свое имя.Заголовок — Добавить заголовок к файлу.
    const nameAddHead = () => describe(`Подразделение. Экспорт. ${format}. Имя выходного файла — свое имя. 
        Заголовок — Добавить заголовок к файлу. ${str}.`, () => {

        const params = {
            name: 'nameAddHead.xlsx',
            file1: [
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
                    'Отчет "Подразделения"': 'apiMaxdivision1',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: '',
                    __EMPTY_4: '',
                    __EMPTY_5: ''
                },
                {
                    'Отчет "Подразделения"': 'apiMaxDivision21',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: '',
                    __EMPTY_4: '',
                    __EMPTY_5: ''
                },
                {
                    'Отчет "Подразделения"': 'apiMaxDivision21/apiMaxDivision22',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: '',
                    __EMPTY_4: '',
                    __EMPTY_5: ''
                },
                {
                    'Отчет "Подразделения"': 'apiMaxDivision31',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: '',
                    __EMPTY_4: '',
                    __EMPTY_5: ''
                },
                {
                    'Отчет "Подразделения"': 'apiMaxDivision31/apiMaxDivision32',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: '',
                    __EMPTY_4: '',
                    __EMPTY_5: ''
                },
                {
                    'Отчет "Подразделения"': 'apiMaxDivision31/apiMaxDivision32/apiMaxDivision33',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: '',
                    __EMPTY_4: '',
                    __EMPTY_5: ''
                },
                {
                    'Отчет "Подразделения"': 'apiMaxDivision41',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: '',
                    __EMPTY_4: '',
                    __EMPTY_5: ''
                },
                {
                    'Отчет "Подразделения"': 'apiMaxDivision41/apiMaxDivision42',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: '',
                    __EMPTY_4: '',
                    __EMPTY_5: ''
                },
                {
                    'Отчет "Подразделения"': 'apiMaxDivision41/apiMaxDivision42/apiMaxDivision43',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: '',
                    __EMPTY_4: '',
                    __EMPTY_5: ''
                },
                {
                    'Отчет "Подразделения"': 'apiMaxDivision41/apiMaxDivision42/apiMaxDivision43/apiMaxDivision44',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: '',
                    __EMPTY_4: '',
                    __EMPTY_5: ''
                },
                {
                    'Отчет "Подразделения"': 'apiMaxDivision51',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: 'apiMaxTemplate1',
                    __EMPTY_4: '',
                    __EMPTY_5: ''
                },
                {
                    'Отчет "Подразделения"': 'apiMaxDivision51/apiMaxDivision52',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: 'apiMaxTemplate1',
                    __EMPTY_4: '',
                    __EMPTY_5: ''
                },
                {
                    'Отчет "Подразделения"': 'apiMaxDivision51/apiMaxDivision52/apiMaxDivision53',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: 'apiMaxTemplate1',
                    __EMPTY_4: '',
                    __EMPTY_5: ''
                },
                {
                    'Отчет "Подразделения"': 'apiMaxDivision51/apiMaxDivision52/apiMaxDivision53/apiMaxDivision54',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: 'apiMaxTemplate1',
                    __EMPTY_4: '',
                    __EMPTY_5: ''
                },
                {
                    'Отчет "Подразделения"': 'apiMaxDivision51/apiMaxDivision52/apiMaxDivision53/apiMaxDivision54/apiMaxDivision55',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: 'apiMaxTemplate1',
                    __EMPTY_4: '',
                    __EMPTY_5: ''
                },
                {
                    'Отчет "Подразделения"': 'apiMaxDivision61',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: 'apiMaxTemplate1',
                    __EMPTY_4: 'apiMaxSchedule',
                    __EMPTY_5: ''
                },
                {
                    'Отчет "Подразделения"': 'apiMaxDivision61/apiMaxDivision62',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: 'apiMaxTemplate1',
                    __EMPTY_4: 'apiMaxSchedule',
                    __EMPTY_5: ''
                },
                {
                    'Отчет "Подразделения"': 'apiMaxDivision61/apiMaxDivision62/apiMaxDivision63',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: 'apiMaxTemplate1',
                    __EMPTY_4: 'apiMaxSchedule',
                    __EMPTY_5: ''
                },
                {
                    'Отчет "Подразделения"': 'apiMaxDivision61/apiMaxDivision62/apiMaxDivision63/apiMaxDivision64',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: 'apiMaxTemplate1',
                    __EMPTY_4: 'apiMaxSchedule',
                    __EMPTY_5: ''
                },
                {
                    'Отчет "Подразделения"': 'apiMaxDivision61/apiMaxDivision62/apiMaxDivision63/apiMaxDivision64/apiMaxDivision65',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: 'apiMaxTemplate1',
                    __EMPTY_4: 'apiMaxSchedule',
                    __EMPTY_5: ''
                },
                {
                    'Отчет "Подразделения"': 'apiMaxDivision61/apiMaxDivision62/apiMaxDivision63/apiMaxDivision64/apiMaxDivision65/apiMaxDivision66',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: 'apiMaxTemplate1',
                    __EMPTY_4: 'apiMaxSchedule',
                    __EMPTY_5: ''
                },
                {
                    'Отчет "Подразделения"': 'apiMaxDivision71',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: 'apiMaxTemplate1',
                    __EMPTY_4: 'apiMaxSchedule',
                    __EMPTY_5: 'staff 1 '
                },
                {
                    'Отчет "Подразделения"': 'apiMaxDivision71/apiMaxDivision72',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: 'apiMaxTemplate1',
                    __EMPTY_4: 'apiMaxSchedule',
                    __EMPTY_5: 'staff 1 '
                },
                {
                    'Отчет "Подразделения"': 'apiMaxDivision71/apiMaxDivision72/apiMaxDivision73',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: 'apiMaxTemplate1',
                    __EMPTY_4: 'apiMaxSchedule',
                    __EMPTY_5: 'staff 1 '
                },
                {
                    'Отчет "Подразделения"': 'apiMaxDivision71/apiMaxDivision72/apiMaxDivision73/apiMaxDivision74',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: 'apiMaxTemplate1',
                    __EMPTY_4: 'apiMaxSchedule',
                    __EMPTY_5: 'staff 1 '
                },
                {
                    'Отчет "Подразделения"': 'apiMaxDivision71/apiMaxDivision72/apiMaxDivision73/apiMaxDivision74/apiMaxDivision75',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: 'apiMaxTemplate1',
                    __EMPTY_4: 'apiMaxSchedule',
                    __EMPTY_5: 'staff 1 '
                },
                {
                    'Отчет "Подразделения"': 'apiMaxDivision71/apiMaxDivision72/apiMaxDivision73/apiMaxDivision74/apiMaxDivision75/apiMaxDivision76',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: 'apiMaxTemplate1',
                    __EMPTY_4: 'apiMaxSchedule',
                    __EMPTY_5: 'staff 1 '
                },
                {
                    'Отчет "Подразделения"': 'apiMaxDivision71/apiMaxDivision72/apiMaxDivision73/apiMaxDivision74/apiMaxDivision75/apiMaxDivision76/apiMaxDivision77',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: 'apiMaxTemplate1',
                    __EMPTY_4: 'apiMaxSchedule',
                    __EMPTY_5: 'staff 1 '
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
            ],
            file2: [
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
                    'Отчет "Подразделения"': 'apiMinDivision1',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: '',
                    __EMPTY_4: '',
                    __EMPTY_5: ''
                },
                {
                    'Отчет "Подразделения"': 'apiMinDivision1/apiMinDivision2',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: '',
                    __EMPTY_4: '',
                    __EMPTY_5: ''
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
            ],
            fileName: 'nameAddHead'
        };

        agr === 'min' ? apiMin() : apiMax();

        describe('Экспорт', () => {

            bef();
            aft();

            it('Нажатие кнопки "Меню"', async () => await dec.simple(el.butIcBefore.handler,
                [but.menu, entry.max],
                el.butIcBefore));

            it('Отображение "Меню"', async () => await dec.simple(el.menu.menu,
                [entry.max],
                el.menu));

            it('Нажатие параметра "Экспорт"', async () => await dec.simple(el.menu.handler,
                ['Экспорт', entry.max],
                el.menu));

            it('Отображение модального окна "Экспортировать данные"', async () => await dec.simple(el.modal.exportData.init,
                [entry.max],
                el.modal.exportData));

            it('Выбор "Выберите тип файла для экспорта"', async () => await dec.simple(el.select.iconXpand,
                ['Выберите тип файла для экспорта', 'XLSX', 'XLSX', entry.max],
                el.select));

            it('Ввод "Имя выходного файла"', async () => await dec.simple(el.input.sendKeys,
                ['Имя выходного файла', 'Определяется системой', params.fileName, entry.max],
                el.input));

            it('Выбор "Заголовок"', async () => await dec.simple(el.select.iconXpand,
                ['Заголовок', 'Добавить заголовок к файлу', 'Добавить заголовок к файлу', entry.max],
                el.select));

            it('Нажатие кнопки "Экспортировать"', async () => await dec.simple(el.button.handler,
                ['Экспортировать', entry.max],
                el.button));

            it('Отсутствие модального окна "Экспортировать данные"',
                async () => await dec.simple(el.modal.exportData.initClose,
                    [entry.max],
                    el.modal.exportData));
        });

        describe('Проверка файла экспорта', () => {

            it('Отображение файла', async () => await dec.simple(el.file.display,
                [params.name, entry.upload],
                el.file));

            it('Проверка строк файла', async () => {
                const jsonFile = await el.file.readNum(params.name);
                console.log('jsonFile', jsonFile)
                const file = agr === 'min' ? params.file2 : params.file1;
                await dec.exportFile(file, jsonFile);
            })

            it('Удаление файла', async () => await dec.simple(el.file.delete,
                [params.name, entry.upload],
                el.file));
        });

        deleteParams();

    });

    // Экспорт. Имя выходного файла — свое имя.Заголовок — Добавить заголовок к файлу.
    const nameItHead = () => describe(`Подразделение. Экспорт. ${format}. Имя выходного файла — свое имя. 
        Заголовок — Добавить свой заголовок. ${str}.`, () => {

        const params = {
            name: 'nameItHead.xlsx',
            head: 'systemNameItHead',
            file1: [
                {
                    systemNameItHead: 'Подразделение',
                    __EMPTY: 'Телефон',
                    __EMPTY_1: 'Описание',
                    __EMPTY_2: 'Шаблон доступа для сотрудников',
                    __EMPTY_3: 'Шаблон доступа для посетителей',
                    __EMPTY_4: 'График работы',
                    __EMPTY_5: 'Сопровождающий'
                },
                {
                    systemNameItHead: 'apiMaxdivision1',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: '',
                    __EMPTY_4: '',
                    __EMPTY_5: ''
                },
                {
                    systemNameItHead: 'apiMaxDivision21',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: '',
                    __EMPTY_4: '',
                    __EMPTY_5: ''
                },
                {
                    systemNameItHead: 'apiMaxDivision21/apiMaxDivision22',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: '',
                    __EMPTY_4: '',
                    __EMPTY_5: ''
                },
                {
                    systemNameItHead: 'apiMaxDivision31',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: '',
                    __EMPTY_4: '',
                    __EMPTY_5: ''
                },
                {
                    systemNameItHead: 'apiMaxDivision31/apiMaxDivision32',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: '',
                    __EMPTY_4: '',
                    __EMPTY_5: ''
                },
                {
                    systemNameItHead: 'apiMaxDivision31/apiMaxDivision32/apiMaxDivision33',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: '',
                    __EMPTY_4: '',
                    __EMPTY_5: ''
                },
                {
                    systemNameItHead: 'apiMaxDivision41',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: '',
                    __EMPTY_4: '',
                    __EMPTY_5: ''
                },
                {
                    systemNameItHead: 'apiMaxDivision41/apiMaxDivision42',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: '',
                    __EMPTY_4: '',
                    __EMPTY_5: ''
                },
                {
                    systemNameItHead: 'apiMaxDivision41/apiMaxDivision42/apiMaxDivision43',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: '',
                    __EMPTY_4: '',
                    __EMPTY_5: ''
                },
                {
                    systemNameItHead: 'apiMaxDivision41/apiMaxDivision42/apiMaxDivision43/apiMaxDivision44',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: '',
                    __EMPTY_4: '',
                    __EMPTY_5: ''
                },
                {
                    systemNameItHead: 'apiMaxDivision51',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: 'apiMaxTemplate1',
                    __EMPTY_4: '',
                    __EMPTY_5: ''
                },
                {
                    systemNameItHead: 'apiMaxDivision51/apiMaxDivision52',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: 'apiMaxTemplate1',
                    __EMPTY_4: '',
                    __EMPTY_5: ''
                },
                {
                    systemNameItHead: 'apiMaxDivision51/apiMaxDivision52/apiMaxDivision53',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: 'apiMaxTemplate1',
                    __EMPTY_4: '',
                    __EMPTY_5: ''
                },
                {
                    systemNameItHead: 'apiMaxDivision51/apiMaxDivision52/apiMaxDivision53/apiMaxDivision54',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: 'apiMaxTemplate1',
                    __EMPTY_4: '',
                    __EMPTY_5: ''
                },
                {
                    systemNameItHead: 'apiMaxDivision51/apiMaxDivision52/apiMaxDivision53/apiMaxDivision54/apiMaxDivision55',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: 'apiMaxTemplate1',
                    __EMPTY_4: '',
                    __EMPTY_5: ''
                },
                {
                    systemNameItHead: 'apiMaxDivision61',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: 'apiMaxTemplate1',
                    __EMPTY_4: 'apiMaxSchedule',
                    __EMPTY_5: ''
                },
                {
                    systemNameItHead: 'apiMaxDivision61/apiMaxDivision62',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: 'apiMaxTemplate1',
                    __EMPTY_4: 'apiMaxSchedule',
                    __EMPTY_5: ''
                },
                {
                    systemNameItHead: 'apiMaxDivision61/apiMaxDivision62/apiMaxDivision63',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: 'apiMaxTemplate1',
                    __EMPTY_4: 'apiMaxSchedule',
                    __EMPTY_5: ''
                },
                {
                    systemNameItHead: 'apiMaxDivision61/apiMaxDivision62/apiMaxDivision63/apiMaxDivision64',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: 'apiMaxTemplate1',
                    __EMPTY_4: 'apiMaxSchedule',
                    __EMPTY_5: ''
                },
                {
                    systemNameItHead: 'apiMaxDivision61/apiMaxDivision62/apiMaxDivision63/apiMaxDivision64/apiMaxDivision65',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: 'apiMaxTemplate1',
                    __EMPTY_4: 'apiMaxSchedule',
                    __EMPTY_5: ''
                },
                {
                    systemNameItHead: 'apiMaxDivision61/apiMaxDivision62/apiMaxDivision63/apiMaxDivision64/apiMaxDivision65/apiMaxDivision66',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: 'apiMaxTemplate1',
                    __EMPTY_4: 'apiMaxSchedule',
                    __EMPTY_5: ''
                },
                {
                    systemNameItHead: 'apiMaxDivision71',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: 'apiMaxTemplate1',
                    __EMPTY_4: 'apiMaxSchedule',
                    __EMPTY_5: 'staff 1 '
                },
                {
                    systemNameItHead: 'apiMaxDivision71/apiMaxDivision72',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: 'apiMaxTemplate1',
                    __EMPTY_4: 'apiMaxSchedule',
                    __EMPTY_5: 'staff 1 '
                },
                {
                    systemNameItHead: 'apiMaxDivision71/apiMaxDivision72/apiMaxDivision73',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: 'apiMaxTemplate1',
                    __EMPTY_4: 'apiMaxSchedule',
                    __EMPTY_5: 'staff 1 '
                },
                {
                    systemNameItHead: 'apiMaxDivision71/apiMaxDivision72/apiMaxDivision73/apiMaxDivision74',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: 'apiMaxTemplate1',
                    __EMPTY_4: 'apiMaxSchedule',
                    __EMPTY_5: 'staff 1 '
                },
                {
                    systemNameItHead: 'apiMaxDivision71/apiMaxDivision72/apiMaxDivision73/apiMaxDivision74/apiMaxDivision75',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: 'apiMaxTemplate1',
                    __EMPTY_4: 'apiMaxSchedule',
                    __EMPTY_5: 'staff 1 '
                },
                {
                    systemNameItHead: 'apiMaxDivision71/apiMaxDivision72/apiMaxDivision73/apiMaxDivision74/apiMaxDivision75/apiMaxDivision76',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: 'apiMaxTemplate1',
                    __EMPTY_4: 'apiMaxSchedule',
                    __EMPTY_5: 'staff 1 '
                },
                {
                    systemNameItHead: 'apiMaxDivision71/apiMaxDivision72/apiMaxDivision73/apiMaxDivision74/apiMaxDivision75/apiMaxDivision76/apiMaxDivision77',
                    __EMPTY: 'apiMaxPhone',
                    __EMPTY_1: 'apiMaxDescription',
                    __EMPTY_2: '',
                    __EMPTY_3: 'apiMaxTemplate1',
                    __EMPTY_4: 'apiMaxSchedule',
                    __EMPTY_5: 'staff 1 '
                },
                {
                    systemNameItHead: 'Администраторы системы',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: '',
                    __EMPTY_4: '',
                    __EMPTY_5: ''
                }
            ],
            file2: [
                {
                    systemNameItHead: 'Подразделение',
                    __EMPTY: 'Телефон',
                    __EMPTY_1: 'Описание',
                    __EMPTY_2: 'Шаблон доступа для сотрудников',
                    __EMPTY_3: 'Шаблон доступа для посетителей',
                    __EMPTY_4: 'График работы',
                    __EMPTY_5: 'Сопровождающий'
                },
                {
                    systemNameItHead: 'apiMinDivision1',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: '',
                    __EMPTY_4: '',
                    __EMPTY_5: ''
                },
                {
                    systemNameItHead: 'apiMinDivision1/apiMinDivision2',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: '',
                    __EMPTY_4: '',
                    __EMPTY_5: ''
                },
                {
                    systemNameItHead: 'Администраторы системы',
                    __EMPTY: '',
                    __EMPTY_1: '',
                    __EMPTY_2: '',
                    __EMPTY_3: '',
                    __EMPTY_4: '',
                    __EMPTY_5: ''
                }
            ],
            fileName: 'nameItHead'
        };

        agr === 'min' ? apiMin() : apiMax();

        describe('Экспорт', () => {

            bef();
            aft();

            it('Нажатие кнопки "Меню"', async () => await dec.simple(el.butIcBefore.handler,
                [but.menu, entry.max],
                el.butIcBefore));

            it('Отображение "Меню"', async () => await dec.simple(el.menu.menu,
                [entry.max],
                el.menu));

            it('Нажатие параметра "Экспорт"', async () => await dec.simple(el.menu.handler,
                ['Экспорт', entry.max],
                el.menu));

            it('Отображение модального окна "Экспортировать данные"', async () => await dec.simple(el.modal.exportData.init,
                [entry.max],
                el.modal.exportData));

            it('Выбор "Выберите тип файла для экспорта"', async () => await dec.simple(el.select.iconXpand,
                ['Выберите тип файла для экспорта', 'XLSX', 'XLSX', entry.max],
                el.select));

            it('Ввод "Имя выходного файла"', async () => await dec.simple(el.input.sendKeys,
                ['Имя выходного файла', 'Определяется системой', params.fileName, entry.max],
                el.input));

            it('Выбор "Заголовок"', async () => await dec.simple(el.select.iconXpand,
                ['Заголовок', 'Добавить заголовок к файлу', 'Добавить свой заголовок', entry.max],
                el.select));

            it('Ввод "Наименование"', async () => await dec.simple(el.input.sendKeys,
                ['Наименование', '', params.head, entry.max],
                el.input));

            it('Нажатие кнопки "Экспортировать"', async () => await dec.simple(el.button.handler,
                ['Экспортировать', entry.max],
                el.button));

            it('Отсутствие модального окна "Экспортировать данные"',
                async () => await dec.simple(el.modal.exportData.initClose,
                    [entry.max],
                    el.modal.exportData));
        });

        describe('Проверка файла экспорта', () => {

            it('Отображение файла', async () => await dec.simple(el.file.display,
                [params.name, entry.upload],
                el.file));

            it('Проверка строк файла', async () => {
                const jsonFile = await el.file.readNum(params.name);
                console.log('jsonFile', jsonFile)
                const file = agr === 'min' ? params.file2 : params.file1;
                await dec.exportFile(file, jsonFile);
            })

            it('Удаление файла', async () => await dec.simple(el.file.delete,
                [params.name, entry.upload],
                el.file));
        });

        deleteParams();

    });

    const mainXLSX = () => describe(`Подразделение. Проверки экспорта - ${format}. ${str}.`, () => {
        systemNameNoHead();
        systemNameAddHead();
        systemNameItHead();
        nameNoHead();
        nameAddHead();
        nameItHead();
    });

    const mainCSV = () => describe(`Подразделение. Проверки экспорта - ${format}. ${str}.`, () => {
        systemNameNoHead();
        nameNoHead();
    });

    return {
        xlsx: {
            systemNameNoHead,
            systemNameAddHead,
            systemNameItHead,
            nameNoHead,
            nameAddHead,
            nameItHead,
            main: () => mainXLSX()
        },
        csv: {
            systemNameNoHead,
            nameNoHead,
            main: () => mainCSV()
        }
    }

};

//Тесты импорта
const importFile = () => {

    // Импорт xlsx с минимальным количеством параметров.
    const importXLSXMinParams = () => describe('Подразделение. Импорт. Импорт с минимальным количеством параметров ' +
        'из xlsx файла. ', () => {

        const params = {
            name1: 'importMinParamsName1',
            name2: 'importMinParamsName2',
            message: 'Импорт завершен 0 записей из 2 не было импортировано',
        };

        describe('Проверка списка подразделений', () => {

            bef();
            aft();

            it('Отображние 1 подраздление', async () => await dec.simple(page.division.size,
                [1, entry.max],
                page.division));

            it('Отображение подразделения "Администраторы системы"', async ()=> await dec.simple(page.division.division,
                [[ "Администраторы системы"], entry.max],
                page.division));

        });

        describe('Импорт', () => {

            bef();

            aft();

            it('Нажатие кнопки "Меню"', async () => await dec.simple(el.butIcBefore.handler,
                [but.menu, entry.max],
                el.butIcBefore));

            it('Отображение "Меню"', async () => await dec.simple(el.menu.menu,
                [entry.max],
                el.menu));

            it('Нажатие параметра "Импорт из XLS, XLSX"', async () => await dec.simple(el.menu.handler,
                ['Импорт из XLS, XLSX', entry.max],
                el.menu));

            it('Отображение модального окна "Импорт"', async () => await dec.simple(el.modal.importData.init,
                [entry.max],
                el.modal.importData));

            it('Выбор тестового файла', async () => await dec.simple(el.modal.importData.sendKeys,
                [imp.division.importXLSXMinSuccess, entry.upload],
                el.modal.importData));

            it('Отображение "Подразделение"', async () => await dec.simple(el.select.select,
                ['Подразделение', '', entry.upload],
                el.select));

            it('Выбор "Подразделение"', async () => await dec.simple(el.select.iconXpand,
                ['Подразделение', '', 'Подразделение', entry.max],
                el.select));

            it('Отображение "Телефон"', async () => await dec.simple(el.select.select,
                ['Телефон', '', entry.max],
                el.select));

            it('Отображение "Описание"', async () => await dec.simple(el.select.select,
                ['Описание', '', entry.max],
                el.select));

            it('Отображение "Сопровождающий"', async () => await dec.simple(el.select.select,
                ['Сопровождающий', '', entry.max],
                el.select));

            it('Отображение "Шаблон доступа для сотрудника"', async () => await dec.simple(el.select.select,
                ['Шаблон доступа для сотрудника', '', entry.max],
                el.select));

            it('Отображение "Шаблон доступа для посетителя"', async () => await dec.simple(el.select.select,
                ['Шаблон доступа для посетителя', '', entry.max],
                el.select));

            it('Отображение "График работы"', async () => await dec.simple(el.select.select,
                ['График работы', '', entry.max],
                el.select));

            it('Нажатие кнопки "Далее"', async () => await dec.simple(el.button.handler,
                ['Далее', entry.max],
                el.button));

            it('Сообщение о загрузке файлов', async () => await dec.simpleText(el.modal.importData.bodyGetText,
                [entry.upload],
                params.message,
                el.modal.importData));

            it('Нажатие кнопки "Готово"', async () => await dec.simple(el.button.handler,
                ['Готово', entry.max],
                el.button));
        });

        describe('Проверка отображения в разделе', () => {
            bef();
            aft();

            describe('Общие проверки', () => {

                it('Отображние 3 подраздлениий', async () => await dec.simple(page.division.size,
                    [3, entry.max],
                    page.division));
            });

            describe('Проверка подразделения 1 уровня', () => {

                it('Отображенние подразделения', async () => await dec.simple(page.division.division,
                    [[params.name1], entry.max],
                    page.division));

                it('Нажатие по подразделению', async () => await dec.simple(page.division.handler,
                    [[params.name1], entry.max],
                    page.division));

                it('Подразделение выделено', async () => await dec.simple(page.division.selected,
                    [params.name1, entry.max],
                    page.division));

                it('Проверка "Телефон"', async () => await dec.simpleText(el.input.getValue,
                    ['Телефон', '', entry.max],
                    '',
                    el.input));

                it('Проверка "Описание"', async () => await dec.simpleText(el.input.getValue,
                    ['Описание', '', entry.max],
                    '',
                    el.input));

                it('Проверка "Сопровождающий"', async () => await dec.simpleText(el.input.getValue,
                    ['Сопровождающий', '', entry.max],
                    '',
                    el.input));

                it('Проверка "Шаблон доступа для сотрудника"', async () => await dec.simpleText(el.input.getValue,
                    ['Шаблон доступа для сотрудника', '', entry.max],
                    '',
                    el.input));

                it('Проверка "Шаблон доступа для посетителя"', async () => await dec.simpleText(el.input.getValue,
                    ['Шаблон доступа для посетителя', '', entry.max],
                    '',
                    el.input));

                it('Проверка "График работы"', async () => await dec.simpleText(el.input.getValue,
                    ['График работы', '', entry.max],
                    '',
                    el.input));
            });

            describe('Проверка подразделения 2 уровня', () => {

                it('Отображенние подразделения', async () => await dec.simple(page.division.division,
                    [[params.name1, params.name2], entry.max],
                    page.division));

                it('Нажатие по подразделению', async () => await dec.simple(page.division.handler,
                    [[params.name1, params.name2], entry.max],
                    page.division));

                it('Подразделение выделено', async () => await dec.simple(page.division.selected,
                    [params.name2, entry.max],
                    page.division));

                it('Проверка "Телефон"', async () => await dec.simpleText(el.input.getValue,
                    ['Телефон', '', entry.max],
                    '',
                    el.input));

                it('Проверка "Описание"', async () => await dec.simpleText(el.input.getValue,
                    ['Описание', '', entry.max],
                    '',
                    el.input));

                it('Проверка "Сопровождающий"', async () => await dec.simpleText(el.input.getValue,
                    ['Сопровождающий', '', entry.max],
                    '',
                    el.input));

                it('Проверка "Шаблон доступа для сотрудника"', async () => await dec.simpleText(el.input.getValue,
                    ['Шаблон доступа для сотрудника', '', entry.max],
                    '',
                    el.input));

                it('Проверка "Шаблон доступа для посетителя"', async () => await dec.simpleText(el.input.getValue,
                    ['Шаблон доступа для посетителя', '', entry.max],
                    '',
                    el.input));

                it('Проверка "График работы"', async () => await dec.simpleText(el.input.getValue,
                    ['График работы', '', entry.max],
                    '',
                    el.input));
            });
        });

        deleteParams();
    });

    // Импорт xls с минимальным количеством параметров.
    const importXLSMinParams = () => describe('Подразделение. Импорт. Импорт с минимальным количеством параметров ' +
        'из xls файла. ', () => {

        const params = {
            name1: 'importMinParamsName1',
            name2: 'importMinParamsName2',
            message: 'Импорт завершен 0 записей из 2 не было импортировано',
        };

        describe('Проверка списка подразделений', () => {

            bef();
            aft();

            it('Отображние 1 подраздление', async () => await dec.simple(page.division.size,
                [1, entry.max],
                page.division));

            it('Отображение подразделения "Администраторы системы"', async ()=> await dec.simple(page.division.division,
                [[ "Администраторы системы"], entry.max],
                page.division));

        });

        describe('Импорт', () => {

            bef();

            aft();

            it('Нажатие кнопки "Меню"', async () => await dec.simple(el.butIcBefore.handler,
                [but.menu, entry.max],
                el.butIcBefore));

            it('Отображение "Меню"', async () => await dec.simple(el.menu.menu,
                [entry.max],
                el.menu));

            it('Нажатие параметра "Импорт из XLS, XLSX"', async () => await dec.simple(el.menu.handler,
                ['Импорт из XLS, XLSX', entry.max],
                el.menu));

            it('Отображение модального окна "Импорт"', async () => await dec.simple(el.modal.importData.init,
                [entry.max],
                el.modal.importData));

            it('Выбор тестового файла', async () => await dec.simple(el.modal.importData.sendKeys,
                [imp.division.importXLSMinSuccess, entry.upload],
                el.modal.importData));

            it('Отображение "Подразделение"', async () => await dec.simple(el.select.select,
                ['Подразделение', '', entry.upload],
                el.select));

            it('Выбор "Подразделение"', async () => await dec.simple(el.select.iconXpand,
                ['Подразделение', '', 'Подразделение', entry.max],
                el.select));

            it('Отображение "Телефон"', async () => await dec.simple(el.select.select,
                ['Телефон', '', entry.max],
                el.select));

            it('Отображение "Описание"', async () => await dec.simple(el.select.select,
                ['Описание', '', entry.max],
                el.select));

            it('Отображение "Сопровождающий"', async () => await dec.simple(el.select.select,
                ['Сопровождающий', '', entry.max],
                el.select));

            it('Отображение "Шаблон доступа для сотрудника"', async () => await dec.simple(el.select.select,
                ['Шаблон доступа для сотрудника', '', entry.max],
                el.select));

            it('Отображение "Шаблон доступа для посетителя"', async () => await dec.simple(el.select.select,
                ['Шаблон доступа для посетителя', '', entry.max],
                el.select));

            it('Отображение "График работы"', async () => await dec.simple(el.select.select,
                ['График работы', '', entry.max],
                el.select));

            it('Нажатие кнопки "Далее"', async () => await dec.simple(el.button.handler,
                ['Далее', entry.max],
                el.button));

            it('Сообщение о загрузке файлов', async () => await dec.simpleText(el.modal.importData.bodyGetText,
                [entry.upload],
                params.message,
                el.modal.importData));

            it('Нажатие кнопки "Готово"', async () => await dec.simple(el.button.handler,
                ['Готово', entry.max],
                el.button));
        });

        describe('Проверка отображения в разделе', () => {
            bef();
            aft();

            describe('Общие проверки', () => {

                it('Отображние 3 подраздлениий', async () => await dec.simple(page.division.size,
                    [3, entry.max],
                    page.division));
            });

            describe('Проверка подразделения 1 уровня', () => {

                it('Отображенние подразделения', async () => await dec.simple(page.division.division,
                    [[params.name1], entry.max],
                    page.division));

                it('Нажатие по подразделению', async () => await dec.simple(page.division.handler,
                    [[params.name1], entry.max],
                    page.division));

                it('Подразделение выделено', async () => await dec.simple(page.division.selected,
                    [params.name1, entry.max],
                    page.division));

                it('Проверка "Телефон"', async () => await dec.simpleText(el.input.getValue,
                    ['Телефон', '', entry.max],
                    '',
                    el.input));

                it('Проверка "Описание"', async () => await dec.simpleText(el.input.getValue,
                    ['Описание', '', entry.max],
                    '',
                    el.input));

                it('Проверка "Сопровождающий"', async () => await dec.simpleText(el.input.getValue,
                    ['Сопровождающий', '', entry.max],
                    '',
                    el.input));

                it('Проверка "Шаблон доступа для сотрудника"', async () => await dec.simpleText(el.input.getValue,
                    ['Шаблон доступа для сотрудника', '', entry.max],
                    '',
                    el.input));

                it('Проверка "Шаблон доступа для посетителя"', async () => await dec.simpleText(el.input.getValue,
                    ['Шаблон доступа для посетителя', '', entry.max],
                    '',
                    el.input));

                it('Проверка "График работы"', async () => await dec.simpleText(el.input.getValue,
                    ['График работы', '', entry.max],
                    '',
                    el.input));
            });

            describe('Проверка подразделения 2 уровня', () => {

                it('Отображенние подразделения', async () => await dec.simple(page.division.division,
                    [[params.name1, params.name2], entry.max],
                    page.division));

                it('Нажатие по подразделению', async () => await dec.simple(page.division.handler,
                    [[params.name1, params.name2], entry.max],
                    page.division));

                it('Подразделение выделено', async () => await dec.simple(page.division.selected,
                    [params.name2, entry.max],
                    page.division));

                it('Проверка "Телефон"', async () => await dec.simpleText(el.input.getValue,
                    ['Телефон', '', entry.max],
                    '',
                    el.input));

                it('Проверка "Описание"', async () => await dec.simpleText(el.input.getValue,
                    ['Описание', '', entry.max],
                    '',
                    el.input));

                it('Проверка "Сопровождающий"', async () => await dec.simpleText(el.input.getValue,
                    ['Сопровождающий', '', entry.max],
                    '',
                    el.input));

                it('Проверка "Шаблон доступа для сотрудника"', async () => await dec.simpleText(el.input.getValue,
                    ['Шаблон доступа для сотрудника', '', entry.max],
                    '',
                    el.input));

                it('Проверка "Шаблон доступа для посетителя"', async () => await dec.simpleText(el.input.getValue,
                    ['Шаблон доступа для посетителя', '', entry.max],
                    '',
                    el.input));

                it('Проверка "График работы"', async () => await dec.simpleText(el.input.getValue,
                    ['График работы', '', entry.max],
                    '',
                    el.input));
            });
        });

        deleteParams();
    });

    // Импорт xlsx с максимальным количеством параметров.
    const importXLSXMaxParams = () => describe('Подразделение. Импорт. Импорт с максимальным количеством параметров ' +
    'из xlsx файла.', () => {
        const params = {
            division1: {
                name: 'importXLSXMaxParamsName1',
                phone: 'importXLSXMaxParamsPhone1',
                description: 'importXLSXMaxParamsDescription1',
                fio: {
                    lastName: 'staff',
                    firstName: '1',
                    middleName: '' ,
                    divisionId: 1,
                    date: '2001-01-01'
                },
                template1: 'template11',
                template2: 'template12',
                template3: 'template13',
                schedule: 'schedule1',
            },
            division2: {
                name: 'importXLSXMaxParamsName2',
                phone: 'importXLSXMaxParamsPhone2',
                description: 'importXLSXMaxParamsDescription2',
                fio: {
                    lastName: 'staff',
                    firstName: '2',
                    middleName: '' ,
                    divisionId: 1,
                    date: '2001-01-01'
                },
                template1: 'template21',
                template2: 'template22',
                template3: 'template23',
                schedule: 'schedule2',
            },
            message: 'Импорт завершен 0 записей из 2 не было импортировано',
        };

        describe('API - добавление', () => {
            bef();
            aft();
            addAccessTemplate(params.division1.template1, '');
            addAccessTemplate(params.division1.template2, '');
            addAccessTemplate(params.division1.template3, '');
            addAccessTemplate(params.division2.template1, '');
            addAccessTemplate(params.division2.template2, '');
            addAccessTemplate(params.division2.template3, '');
            addSchedule(params.division1.schedule);
            addSchedule(params.division2.schedule);
            addStaff(...Object.values(params.division1.fio));
            addStaff(...Object.values(params.division2.fio));
        });

        describe('Проверка списка подразделений', () => {

            bef();
            aft();

            it('Отображние 1 подраздление', async () => await dec.simple(page.division.size,
                [1, entry.max],
                page.division));

            it('Отображение подразделения "Администраторы системы"', async ()=> await dec.simple(page.division.division,
                [[ "Администраторы системы"], entry.max],
                page.division));

        });

        describe('Импорт', () => {

            bef();

            aft();

            it('Нажатие кнопки "Меню"', async () => await dec.simple(el.butIcBefore.handler,
                [but.menu, entry.max],
                el.butIcBefore));

            it('Отображение "Меню"', async () => await dec.simple(el.menu.menu,
                [entry.max],
                el.menu));

            it('Нажатие параметра "Импорт из XLS, XLSX"', async () => await dec.simple(el.menu.handler,
                ['Импорт из XLS, XLSX', entry.max],
                el.menu));

            it('Отображение модального окна "Импорт"', async () => await dec.simple(el.modal.importData.init,
                [entry.max],
                el.modal.importData));

            it('Выбор тестового файла', async () => await dec.simple(el.modal.importData.sendKeys,
                [imp.division.importXLSXMaxSuccess, entry.upload],
                el.modal.importData));

            it('Отображение "Подразделение"', async () => await dec.simple(el.select.select,
                ['Подразделение', '', entry.upload],
                el.select));

            it('Выбор "Подразделение"', async () => await dec.simple(el.select.iconXpand,
                ['Подразделение', '', 'Подразделение', entry.max],
                el.select));

            it('Отображение "Телефон"', async () => await dec.simple(el.select.select,
                ['Телефон', '', entry.max],
                el.select));

            it('Выбор "Телефон"', async () => await dec.simple(el.select.iconXpand,
                ['Телефон', '', 'Телефон', entry.max],
                el.select));

            it('Отображение "Описание"', async () => await dec.simple(el.select.select,
                ['Описание', '', entry.max],
                el.select));

            it('Выбор "Описание"', async () => await dec.simple(el.select.iconXpand,
                ['Описание', '', 'Описание', entry.max],
                el.select));

            it('Отображение "Сопровождающий"', async () => await dec.simple(el.select.select,
                ['Сопровождающий', '', entry.max],
                el.select));

            it('Выбор "Сопровождающий"', async () => await dec.simple(el.select.iconXpand,
                ['Сопровождающий', '', 'Сопровождающий', entry.max],
                el.select));

            it('Отображение "Шаблон доступа для сотрудника"', async () => await dec.simple(el.select.select,
                ['Шаблон доступа для сотрудника', '', entry.max],
                el.select));

            it('Выбор "Шаблон доступа для сотрудника"', async () => await dec.simple(el.select.iconXpand,
                ['Шаблон доступа для сотрудника', '', 'Шаблон доступа для сотрудников', entry.max],
                el.select));

            it('Отображение "Шаблон доступа для посетителя"', async () => await dec.simple(el.select.select,
                ['Шаблон доступа для посетителя', '', entry.max],
                el.select));

            it('Выбор "Шаблон доступа для посетителя"', async () => await dec.simple(el.select.iconXpand,
                ['Шаблон доступа для посетителя', '', 'Шаблон доступа для посетителей', entry.max],
                el.select));

            it('Отображение "График работы"', async () => await dec.simple(el.select.select,
                ['График работы', '', entry.max],
                el.select));

            it('Выбор "График работы"', async () => await dec.simple(el.select.iconXpand,
                ['График работы', '', 'График работы', entry.max],
                el.select));

            it('Нажатие кнопки "Далее"', async () => await dec.simple(el.button.handler,
                ['Далее', entry.max],
                el.button));

            it('Сообщение о загрузке файлов', async () => await dec.simpleText(el.modal.importData.bodyGetText,
                [entry.upload],
                params.message,
                el.modal.importData));

            it('Нажатие кнопки "Готово"', async () => await dec.simple(el.button.handler,
                ['Готово', entry.max],
                el.button));
        });

        describe('Проверка отображения в разделе', () => {
            bef();
            aft();

            describe('Общие проверки', () => {

                it('Отображние 3 подраздлениий', async () => await dec.simple(page.division.size,
                    [3, entry.max],
                    page.division));

            });

            describe('Проверка подразделения 1 уровня', () => {

                it('Отображенние подразделения', async () => await dec.simple(page.division.division,
                    [[params.division1.name], entry.max],
                    page.division));

                it('Нажатие по подразделению', async () => await dec.simple(page.division.handler,
                    [[params.division1.name], entry.max],
                    page.division));

                it('Подразделение выделено', async () => await dec.simple(page.division.selected,
                    [params.division1.name, entry.max],
                    page.division));

                it('Проверка "Телефон"', async () => await dec.simpleText(el.input.getValue,
                    ['Телефон', '', entry.max],
                    params.division1.phone,
                    el.input));

                it('Проверка "Описание"', async () => await dec.simpleText(el.input.getValue,
                    ['Описание', '', entry.max],
                    params.division1.description,
                    el.input));

                it('Проверка "Сопровождающий"', async () => await dec.simpleText(el.input.getValue,
                    ['Сопровождающий', '', entry.max],
                    `${params.division1.fio.lastName} ${params.division1.fio.firstName}`,
                    el.input));

                it('Проверка "Шаблон доступа для сотрудника"', async () => await dec.simpleText(el.input.getValue,
                    ['Шаблон доступа для сотрудника', '', entry.max],
                    `${params.division1.template1}, ${params.division1.template2}`,
                    el.input));

                it('Проверка "Шаблон доступа для посетителя"', async () => await dec.simpleText(el.input.getValue,
                    ['Шаблон доступа для посетителя', '', entry.max],
                    `${params.division1.template3}`,
                    el.input));

                it('Проверка "График работы"', async () => await dec.simpleText(el.input.getValue,
                    ['График работы', '', entry.max],
                    `${params.division1.schedule}`,
                    el.input));
            });

            describe('Проверка подразделения 2 уровня', () => {

                it('Отображенние подразделения', async () => await dec.simple(page.division.division,
                    [[params.division1.name, params.division2.name], entry.max],
                    page.division));

                it('Нажатие по подразделению', async () => await dec.simple(page.division.handler,
                    [[params.division1.name, params.division2.name], entry.max],
                    page.division));

                it('Подразделение выделено', async () => await dec.simple(page.division.selected,
                    [params.division2.name, entry.max],
                    page.division));

                it('Проверка "Телефон"', async () => await dec.simpleText(el.input.getValue,
                    ['Телефон', '', entry.max],
                    params.division2.phone,
                    el.input));

                it('Проверка "Описание"', async () => await dec.simpleText(el.input.getValue,
                    ['Описание', '', entry.max],
                    params.division2.description,
                    el.input));

                it('Проверка "Сопровождающий"', async () => await dec.simpleText(el.input.getValue,
                    ['Сопровождающий', '', entry.max],
                    `${params.division2.fio.lastName} ${params.division2.fio.firstName}`,
                    el.input));

                it('Проверка "Шаблон доступа для сотрудника"', async () => await dec.simpleText(el.input.getValue,
                    ['Шаблон доступа для сотрудника', '', entry.max],
                    `${params.division2.template1}, ${params.division2.template2}`,
                    el.input));

                it('Проверка "Шаблон доступа для посетителя"', async () => await dec.simpleText(el.input.getValue,
                    ['Шаблон доступа для посетителя', '', entry.max],
                    `${params.division2.template3}`,
                    el.input));

                it('Проверка "График работы"', async () => await dec.simpleText(el.input.getValue,
                    ['График работы', '', entry.max],
                    `${params.division2.schedule}`,
                    el.input));
            });
        });

        deleteParams();

    });

    // Импорт с отсутствием "Подразделения" и максимальным количетсвом параметров
    const importXLSXMaxParamsNoName = () => describe('Подразделение. Импорт. Импорт с отсутствием "Подразделения" и ' +
        'максимальным количеством параметров из xlsx файла и экспортом файла с ошибками.', () => {
        const params = {
            division1: {
                fio: {
                    lastName: 'staff',
                    firstName: '1',
                    middleName: '' ,
                    divisionId: 1,
                    date: '2001-01-01'
                },
                template1: 'template11',
                template2: 'template12',
                template3: 'template13',
                schedule: 'schedule1',
            },
            division2: {
                fio: {
                    lastName: 'staff',
                    firstName: '2',
                    middleName: '' ,
                    divisionId: 1,
                    date: '2001-01-01'
                },
                template1: 'template21',
                template2: 'template22',
                template3: 'template23',
                schedule: 'schedule2',
            },
            message: 'Импорт завершен 2 записей из 2 не было импортировано',
            file: [
                {
                    'Отчет "Не импортированные данные"': 'Подразделение',
                    __EMPTY: 'Телефон',
                    __EMPTY_1: 'Описание',
                    __EMPTY_2: 'Шаблон доступа для сотрудников',
                    __EMPTY_3: 'Шаблон доступа для посетителей',
                    __EMPTY_4: 'График работы',
                    __EMPTY_5: 'Сопровождающий',
                    __EMPTY_6: 'Ошибка'
                },
                {
                    'Отчет "Не импортированные данные"': '',
                    __EMPTY: 'importXLSXMaxParamsPhone1',
                    __EMPTY_1: 'importXLSXMaxParamsDescription1',
                    __EMPTY_2: 'template11;template12',
                    __EMPTY_3: 'template13',
                    __EMPTY_4: 'schedule1',
                    __EMPTY_5: 'staff 1',
                    __EMPTY_6: 'Отсутствует обязательное поле Подразделение'
                },
                {
                    'Отчет "Не импортированные данные"': 'importXLSXMaxParamsName1/importXLSXMaxParamsName2',
                    __EMPTY: 'importXLSXMaxParamsPhone2',
                    __EMPTY_1: 'importXLSXMaxParamsDescription2',
                    __EMPTY_2: 'template21;template22;',
                    __EMPTY_3: 'template23',
                    __EMPTY_4: 'schedule2',
                    __EMPTY_5: 'staff 2',
                    __EMPTY_6: 'Цепочка отделов не валидна или отдел существует'
                }
            ]
        };

        describe('API - добавление', () => {
            bef();
            aft();
            addAccessTemplate(params.division1.template1, '');
            addAccessTemplate(params.division1.template2, '');
            addAccessTemplate(params.division1.template3, '');
            addAccessTemplate(params.division2.template1, '');
            addAccessTemplate(params.division2.template2, '');
            addAccessTemplate(params.division2.template3, '');
            addSchedule(params.division1.schedule);
            addSchedule(params.division2.schedule);
            addStaff(...Object.values(params.division1.fio));
            addStaff(...Object.values(params.division2.fio));
        });

        describe('Проверка списка подразделений', () => {

            bef();
            aft();

            it('Отображние 1 подраздление', async () => await dec.simple(page.division.size,
                [1, entry.max],
                page.division));

            it('Отображение подразделения "Администраторы системы"', async ()=> await dec.simple(page.division.division,
                [[ "Администраторы системы"], entry.max],
                page.division));

        });

        describe('Импорт', () => {

            bef();

            aft();

            it('Нажатие кнопки "Меню"', async () => await dec.simple(el.butIcBefore.handler,
                [but.menu, entry.max],
                el.butIcBefore));

            it('Отображение "Меню"', async () => await dec.simple(el.menu.menu,
                [entry.max],
                el.menu));

            it('Нажатие параметра "Импорт из XLS, XLSX"', async () => await dec.simple(el.menu.handler,
                ['Импорт из XLS, XLSX', entry.max],
                el.menu));

            it('Отображение модального окна "Импорт"', async () => await dec.simple(el.modal.importData.init,
                [entry.max],
                el.modal.importData));

            it('Выбор тестового файла', async () => await dec.simple(el.modal.importData.sendKeys,
                [imp.division.importXLSXMaxNoNameFailed, entry.upload],
                el.modal.importData));

            it('Отображение "Подразделение"', async () => await dec.simple(el.select.select,
                ['Подразделение', '', entry.upload],
                el.select));

            it('Выбор "Подразделение"', async () => await dec.simple(el.select.iconXpand,
                ['Подразделение', '', 'Подразделение', entry.max],
                el.select));

            it('Отображение "Телефон"', async () => await dec.simple(el.select.select,
                ['Телефон', '', entry.max],
                el.select));

            it('Выбор "Телефон"', async () => await dec.simple(el.select.iconXpand,
                ['Телефон', '', 'Телефон', entry.max],
                el.select));

            it('Отображение "Описание"', async () => await dec.simple(el.select.select,
                ['Описание', '', entry.max],
                el.select));

            it('Выбор "Описание"', async () => await dec.simple(el.select.iconXpand,
                ['Описание', '', 'Описание', entry.max],
                el.select));

            it('Отображение "Сопровождающий"', async () => await dec.simple(el.select.select,
                ['Сопровождающий', '', entry.max],
                el.select));

            it('Выбор "Сопровождающий"', async () => await dec.simple(el.select.iconXpand,
                ['Сопровождающий', '', 'Сопровождающий', entry.max],
                el.select));

            it('Отображение "Шаблон доступа для сотрудника"', async () => await dec.simple(el.select.select,
                ['Шаблон доступа для сотрудника', '', entry.max],
                el.select));

            it('Выбор "Шаблон доступа для сотрудника"', async () => await dec.simple(el.select.iconXpand,
                ['Шаблон доступа для сотрудника', '', 'Шаблон доступа для сотрудников', entry.max],
                el.select));

            it('Отображение "Шаблон доступа для посетителя"', async () => await dec.simple(el.select.select,
                ['Шаблон доступа для посетителя', '', entry.max],
                el.select));

            it('Выбор "Шаблон доступа для посетителя"', async () => await dec.simple(el.select.iconXpand,
                ['Шаблон доступа для посетителя', '', 'Шаблон доступа для посетителей', entry.max],
                el.select));

            it('Отображение "График работы"', async () => await dec.simple(el.select.select,
                ['График работы', '', entry.max],
                el.select));

            it('Выбор "График работы"', async () => await dec.simple(el.select.iconXpand,
                ['График работы', '', 'График работы', entry.max],
                el.select));

            it('Нажатие кнопки "Далее"', async () => await dec.simple(el.button.handler,
                ['Далее', entry.max],
                el.button));

            it('Сообщение о загрузке файлов', async () => await dec.simpleText(el.modal.importData.bodyGetText,
                [entry.upload],
                params.message,
                el.modal.importData));

            it('Нажатие кнопки "Экспорт остатка в файл"', async () => await dec.simple(el.button.handler,
                ['Экспорт остатка в файл', entry.max],
                el.button))

            it('Отсутствие модального окна "Импорт"', async () => await dec.simple(el.modal.importData.initClose,
                [entry.upload],
                el.modal.importData))
        });

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

        describe('Проверка списка подразделений', () => {

            bef();
            aft();

            it('Отображние 1 подраздление', async () => await dec.simple(page.division.size,
                [1, entry.max],
                page.division));

            it('Отображение подразделения "Администраторы системы"', async ()=> await dec.simple(page.division.division,
                [[ "Администраторы системы"], entry.max],
                page.division));

        });

        deleteParams();

    });

    // Импорт с максимальным количеством параметров, отсутствующих в системе
    const importXLSXMaxParamsNoParams = () => describe('Подразделение. Импорт. Импорт с'+
        'максимальным количеством параметров, отсутствующих в системе из xlsx файла.',
        () => {
        const params = {
            message: 'Импорт завершен 2 записей из 2 не было импортировано',
        };

        describe('Проверка списка подразделений', () => {

            bef();
            aft();

            it('Отображние 1 подраздление', async () => await dec.simple(page.division.size,
                [1, entry.max],
                page.division));

            it('Отображение подразделения "Администраторы системы"', async ()=> await dec.simple(page.division.division,
                [["Администраторы системы"], entry.max],
                page.division));

        });

        describe('Импорт', () => {

            bef();

            aft();

            it('Нажатие кнопки "Меню"', async () => await dec.simple(el.butIcBefore.handler,
                [but.menu, entry.max],
                el.butIcBefore));

            it('Отображение "Меню"', async () => await dec.simple(el.menu.menu,
                [entry.max],
                el.menu));

            it('Нажатие параметра "Импорт из XLS, XLSX"', async () => await dec.simple(el.menu.handler,
                ['Импорт из XLS, XLSX', entry.max],
                el.menu));

            it('Отображение модального окна "Импорт"', async () => await dec.simple(el.modal.importData.init,
                [entry.max],
                el.modal.importData));

            it('Выбор тестового файла', async () => await dec.simple(el.modal.importData.sendKeys,
                [imp.division.importXLSXMaxNoParamsFailed, entry.upload],
                el.modal.importData));

            it('Отображение "Подразделение"', async () => await dec.simple(el.select.select,
                ['Подразделение', '', entry.upload],
                el.select));

            it('Выбор "Подразделение"', async () => await dec.simple(el.select.iconXpand,
                ['Подразделение', '', 'Подразделение', entry.max],
                el.select));

            it('Отображение "Телефон"', async () => await dec.simple(el.select.select,
                ['Телефон', '', entry.max],
                el.select));

            it('Выбор "Телефон"', async () => await dec.simple(el.select.iconXpand,
                ['Телефон', '', 'Телефон', entry.max],
                el.select));

            it('Отображение "Описание"', async () => await dec.simple(el.select.select,
                ['Описание', '', entry.max],
                el.select));

            it('Выбор "Описание"', async () => await dec.simple(el.select.iconXpand,
                ['Описание', '', 'Описание', entry.max],
                el.select));

            it('Отображение "Сопровождающий"', async () => await dec.simple(el.select.select,
                ['Сопровождающий', '', entry.max],
                el.select));

            it('Выбор "Сопровождающий"', async () => await dec.simple(el.select.iconXpand,
                ['Сопровождающий', '', 'Сопровождающий', entry.max],
                el.select));

            it('Отображение "Шаблон доступа для сотрудника"', async () => await dec.simple(el.select.select,
                ['Шаблон доступа для сотрудника', '', entry.max],
                el.select));

            it('Выбор "Шаблон доступа для сотрудника"', async () => await dec.simple(el.select.iconXpand,
                ['Шаблон доступа для сотрудника', '', 'Шаблон доступа для сотрудников', entry.max],
                el.select));

            it('Отображение "Шаблон доступа для посетителя"', async () => await dec.simple(el.select.select,
                ['Шаблон доступа для посетителя', '', entry.max],
                el.select));

            it('Выбор "Шаблон доступа для посетителя"', async () => await dec.simple(el.select.iconXpand,
                ['Шаблон доступа для посетителя', '', 'Шаблон доступа для посетителей', entry.max],
                el.select));

            it('Отображение "График работы"', async () => await dec.simple(el.select.select,
                ['График работы', '', entry.max],
                el.select));

            it('Выбор "График работы"', async () => await dec.simple(el.select.iconXpand,
                ['График работы', '', 'График работы', entry.max],
                el.select));

            it('Нажатие кнопки "Далее"', async () => await dec.simple(el.button.handler,
                ['Далее', entry.max],
                el.button));

            it('Сообщение о загрузке файлов', async () => await dec.simpleText(el.modal.importData.bodyGetText,
                [entry.upload],
                params.message,
                el.modal.importData));

            it('Нажатие кнопки закрытия', async () => await dec.simple(el.modal.importData.closeHandler,
                [entry.max],
                el.modal.importData));

            it('Отсутствие модального окна "Импорт"', async () => await dec.simple(el.modal.importData.initClose,
                [entry.max],
                el.modal.importData));
        });

        describe('Проверка списка подразделений', () => {

            bef();
            aft();

            it('Отображние 1 подраздление', async () => await dec.simple(page.division.size,
                [1, entry.max],
                page.division));

            it('Отображение подразделения "Администраторы системы"', async ()=> await dec.simple(page.division.division,
                [[ "Администраторы системы"], entry.max],
                page.division));

        });

    });

    // Импорт 5 подразделений 1 уровня с вложенннными подразделениямми прогрессией до 5 с минимальным количеством
    // параметров
    const importProgression = () => describe('Подразделение. Импорт. Импорт  подразделений 1 уровня ' +
        'с вложенными подразделениями прогрессией до 5.', () => {
        const params = {
            array: [...Array(5).keys()].map(item1 => {
                return [...Array(item1 + 1).keys()].map(item2 => {
                    return 'division' + (item1 + 1) +  (item2 + 1)
                });
            }),
            message: 'Импорт завершен 0 записей из 15 не было импортировано',
        };

        describe('Проверка списка подразделений', () => {

            bef();
            aft();

            it('Отображние 1 подраздление', async () => await dec.simple(page.division.size,
                [1, entry.max],
                page.division));

            it('Отображение подразделения "Администраторы системы"', async ()=> await dec.simple(page.division.division,
                [["Администраторы системы"], entry.max],
                page.division));

        });

        describe('Импорт', () => {

            bef();

            aft();

            it('Нажатие кнопки "Меню"', async () => await dec.simple(el.butIcBefore.handler,
                [but.menu, entry.max],
                el.butIcBefore));

            it('Отображение "Меню"', async () => await dec.simple(el.menu.menu,
                [entry.max],
                el.menu));

            it('Нажатие параметра "Импорт из XLS, XLSX"', async () => await dec.simple(el.menu.handler,
                ['Импорт из XLS, XLSX', entry.max],
                el.menu));

            it('Отображение модального окна "Импорт"', async () => await dec.simple(el.modal.importData.init,
                [entry.max],
                el.modal.importData));

            it('Выбор тестового файла', async () => await dec.simple(el.modal.importData.sendKeys,
                [imp.division.importXLSXProgressionSuccess, entry.upload],
                el.modal.importData));

            it('Отображение "Подразделение"', async () => await dec.simple(el.select.select,
                ['Подразделение', '', entry.upload],
                el.select));

            it('Выбор "Подразделение"', async () => await dec.simple(el.select.iconXpand,
                ['Подразделение', '', 'Подразделение', entry.max],
                el.select));

            it('Нажатие кнопки "Далее"', async () => await dec.simple(el.button.handler,
                ['Далее', entry.max],
                el.button));

            it('Сообщение о загрузке файлов', async () => await dec.simpleText(el.modal.importData.bodyGetText,
                [entry.upload],
                params.message,
                el.modal.importData));

            it('Нажатие кнопки закрытия', async () => await dec.simple(el.modal.importData.closeHandler,
                [entry.max],
                el.modal.importData));

            it('Отсутствие модального окна "Импорт"', async () => await dec.simple(el.modal.importData.initClose,
                [entry.max],
                el.modal.importData));
        });

        describe('Проверка отображения в разделе', () => {
            bef();
            aft();

            describe('Общие проверки', () => {

                it('Отображние 16 подраздлениий', async () => await dec.simple(page.division.size,
                    [16, entry.max],
                    page.division));

                params.array.forEach((item1) => {
                    let arr =[];
                    item1.forEach((item2, index2) => {
                        it(`Отображенние подразделения ${index2 + 1} уровня - ${item2}`, async () => {
                            arr.push(item2);
                            await dec.simple(page.division.division,
                                [arr, entry.max],
                                page.division)
                        });
                    });
                });

            });

        });

        deleteParams();

    });

    // Импорт с дублированием подразделения 1 уровня к подразделению 1 уровню
    const importDuplicateOneLevel = () => describe('Подразделение. Импорт. Импорт с дублированием подразделения ' +
        '1 уровня к подразделению 1 уровня из xlsx файла.', () => {
        const params = {
            division1: {
                name: 'importDuplicateOneLevelName1',
            },
            division2: {
                name: 'importDuplicateOneLevelName2',
            },
            message: 'Импорт завершен 1 записей из 1 не было импортировано',
        };

        describe('API - добавление', () => {
            bef();
            aft();

            describe('Добавление подразделения 1 уровня', () => {
                const obj = {
                    parent_id: 0,
                    name: params.division1.name,
                };
                addDivision(obj);
            });
            describe('Добавление подразделения 2 уровня', () => {
                it('Добавление подразделения', async () => {
                    const cook = await page.base.getCookie('token');
                    const get = await api.getDivision(cook.text);
                    const obj = {
                        parent_id: get.text[0]['id'],
                        name: params.division2.name
                    };
                    await dec.simple(api.putDivision,
                        [[obj], cook.text],
                        api.putDivision);
                });
            });
        });

        describe('Проверка списка подразделений', () => {

            bef();
            aft();

            it('Отображние 3 подраздления', async () => await dec.simple(page.division.size,
                [3, entry.max],
                page.division));

            it('Отображение подразделения "Администраторы системы"', async ()=> await dec.simple(page.division.division,
                [["Администраторы системы"], entry.max],
                page.division));

            it('Отображенние подразделения 1 уровня', async () => await dec.simple(page.division.division,
                [[params.division1.name], entry.max],
                page.division));

            it('Отображенние подразделения 2 уровня', async () => await dec.simple(page.division.division,
                [[params.division1.name, params.division2.name], entry.max],
                page.division));

        });

        describe('Импорт', () => {

            bef();

            aft();

            it('Нажатие кнопки "Меню"', async () => await dec.simple(el.butIcBefore.handler,
                [but.menu, entry.max],
                el.butIcBefore));

            it('Отображение "Меню"', async () => await dec.simple(el.menu.menu,
                [entry.max],
                el.menu));

            it('Нажатие параметра "Импорт из XLS, XLSX"', async () => await dec.simple(el.menu.handler,
                ['Импорт из XLS, XLSX', entry.max],
                el.menu));

            it('Отображение модального окна "Импорт"', async () => await dec.simple(el.modal.importData.init,
                [entry.max],
                el.modal.importData));

            it('Выбор тестового файла', async () => await dec.simple(el.modal.importData.sendKeys,
                [imp.division.importXLSXDupOneFailed, entry.upload],
                el.modal.importData));

            it('Отображение "Подразделение"', async () => await dec.simple(el.select.select,
                ['Подразделение', '', entry.upload],
                el.select));

            it('Выбор "Подразделение"', async () => await dec.simple(el.select.iconXpand,
                ['Подразделение', '', 'Подразделение', entry.max],
                el.select));

            it('Нажатие кнопки "Далее"', async () => await dec.simple(el.button.handler,
                ['Далее', entry.max],
                el.button));

            it('Сообщение о загрузке файлов', async () => await dec.simpleText(el.modal.importData.bodyGetText,
                [entry.upload],
                params.message,
                el.modal.importData));

            it('Нажатие кнопки закрытия', async () => await dec.simple(el.modal.importData.closeHandler,
                [entry.max],
                el.modal.importData));

            it('Отсутствие модального окна "Импорт"', async () => await dec.simple(el.modal.importData.initClose,
                [entry.max],
                el.modal.importData));
        });

        describe('Проверка списка подразделений', () => {

            bef();
            aft();

            it('Отображние 3 подраздления', async () => await dec.simple(page.division.size,
                [3, entry.max],
                page.division));

            it('Отображение подразделения "Администраторы системы"', async ()=> await dec.simple(page.division.division,
                [["Администраторы системы"], entry.max],
                page.division));

            it('Отображенние подразделения 1 уровня', async () => await dec.simple(page.division.division,
                [[params.division1.name], entry.max],
                page.division));

            it('Отображенние подразделения 2 уровня', async () => await dec.simple(page.division.division,
                [[params.division1.name, params.division2.name], entry.max],
                page.division));

        });

        deleteParams();

    });

    // Импорт с дублированием подразделения 1 уровня к подразделению 2 уровню
    const importDuplicateTwoLevel = () => describe('Подразделение. Импорт. Импорт с дублированием подразделения ' +
        '1 уровня к подразделению 2 уровня из xlsx файла.', () => {
        const params = {
            division1: {
                name: 'importDuplicateTwoLevelName1',
            },
            division2: {
                name: 'importDuplicateTwoLevelName2',
            },
            message: 'Импорт завершен 1 записей из 1 не было импортировано',
        };

        describe('API - добавление', () => {
            bef();
            aft();

            describe('Добавление подразделения 1 уровня', () => {
                const obj = {
                    parent_id: 0,
                    name: params.division1.name,
                };
                addDivision(obj);
            });
            describe('Добавление подразделения 2 уровня', () => {
                it('Добавление подразделения', async () => {
                    const cook = await page.base.getCookie('token');
                    const get = await api.getDivision(cook.text);
                    const obj = {
                        parent_id: get.text[0]['id'],
                        name: params.division2.name
                    };
                    await dec.simple(api.putDivision,
                        [[obj], cook.text],
                        api.putDivision);
                });
            });
        });

        describe('Проверка списка подразделений', () => {

            bef();
            aft();

            it('Отображние 3 подраздления', async () => await dec.simple(page.division.size,
                [3, entry.max],
                page.division));

            it('Отображение подразделения "Администраторы системы"', async ()=> await dec.simple(page.division.division,
                [["Администраторы системы"], entry.max],
                page.division));

            it('Отображенние подразделения 1 уровня', async () => await dec.simple(page.division.division,
                [[params.division1.name], entry.max],
                page.division));

            it('Отображенние подразделения 2 уровня', async () => await dec.simple(page.division.division,
                [[params.division1.name, params.division2.name], entry.max],
                page.division));

        });

        describe('Импорт', () => {

            bef();

            aft();

            it('Нажатие кнопки "Меню"', async () => await dec.simple(el.butIcBefore.handler,
                [but.menu, entry.max],
                el.butIcBefore));

            it('Отображение "Меню"', async () => await dec.simple(el.menu.menu,
                [entry.max],
                el.menu));

            it('Нажатие параметра "Импорт из XLS, XLSX"', async () => await dec.simple(el.menu.handler,
                ['Импорт из XLS, XLSX', entry.max],
                el.menu));

            it('Отображение модального окна "Импорт"', async () => await dec.simple(el.modal.importData.init,
                [entry.max],
                el.modal.importData));

            it('Выбор тестового файла', async () => await dec.simple(el.modal.importData.sendKeys,
                [imp.division.importXLSXDupTwoFailed, entry.upload],
                el.modal.importData));

            it('Отображение "Подразделение"', async () => await dec.simple(el.select.select,
                ['Подразделение', '', entry.upload],
                el.select));

            it('Выбор "Подразделение"', async () => await dec.simple(el.select.iconXpand,
                ['Подразделение', '', 'Подразделение', entry.max],
                el.select));

            it('Нажатие кнопки "Далее"', async () => await dec.simple(el.button.handler,
                ['Далее', entry.max],
                el.button));

            it('Сообщение о загрузке файлов', async () => await dec.simpleText(el.modal.importData.bodyGetText,
                [entry.upload],
                params.message,
                el.modal.importData));

            it('Нажатие кнопки закрытия', async () => await dec.simple(el.modal.importData.closeHandler,
                [entry.max],
                el.modal.importData));

            it('Отсутствие модального окна "Импорт"', async () => await dec.simple(el.modal.importData.initClose,
                [entry.max],
                el.modal.importData));
        });

        describe('Проверка списка подразделений', () => {

            bef();
            aft();

            it('Отображние 3 подраздления', async () => await dec.simple(page.division.size,
                [3, entry.max],
                page.division));

            it('Отображение подразделения "Администраторы системы"', async ()=> await dec.simple(page.division.division,
                [["Администраторы системы"], entry.max],
                page.division));

            it('Отображенние подразделения 1 уровня', async () => await dec.simple(page.division.division,
                [[params.division1.name], entry.max],
                page.division));

            it('Отображенние подразделения 2 уровня', async () => await dec.simple(page.division.division,
                [[params.division1.name, params.division2.name], entry.max],
                page.division));

        });

        deleteParams();

    });

    return {
        importXLSXMinParams,
        importXLSMinParams,
        importXLSXMaxParams,
        importXLSXMaxParamsNoName,
        importXLSXMaxParamsNoParams,
        importDuplicateOneLevel,
        importDuplicateTwoLevel,
        importProgression,
    }

};

//Тесты фильтра "Поиск..."
const filterSearch = () => describe('Проверка фильтра "Поиск..."', () => {

    const params = {
        array1: [...Array(3).keys()].map(item => 'division' + (item + 1)),
        array2: [...Array(3).keys()].map(item => 'test' + (item + 1))
    }

    describe('API - добавление', () => {
        bef();
        aft();

        params.array1.forEach((item1, index1) => {
            describe(`Добавление подразделения ${index1 + 1} уровня - ${item1}`, () => {
                it('Добавление подразделения', async () => {
                    const cook = await page.base.getCookie('token');
                    const get = await api.getDivision(cook.text);
                    const obj = {
                        parent_id: index1 === 0 ? 0 : get.text[get.text.length - 1]['id'],
                        name: item1
                    };
                    await dec.simple(api.putDivision,
                        [[obj], cook.text],
                        api.putDivision);
                });
            });
        });

        params.array2.forEach((item2, index2) => {
            describe(`Добавление подразделения ${index2 + 1} уровня - ${item2}`, () => {
                it('Добавление подразделения', async () => {
                    const cook = await page.base.getCookie('token');
                    const get = await api.getDivision(cook.text);
                    const obj = {
                        parent_id: index2 === 0 ? 0 : get.text[get.text.length - 1]['id'],
                        name: item2
                    };
                    await dec.simple(api.putDivision,
                        [[obj], cook.text],
                        api.putDivision);
                });
            });
        });

    });

    describe('Проверка отображения', () => {

        bef();
        aft();

        it('Отображение 7 подраздление', async () => await dec.simple(page.division.size,
            [7, entry.max],
            page.division));

        [params.array1, params.array2].forEach((item1) => {
            const arr = [];
            item1.forEach((item2, index2) => {
                it(`Отображенние подразделения ${index2 + 1} уровня - ${item2}`, async () => {
                    arr.push(item2);
                    await dec.simple(page.division.division,
                        [arr, entry.max],
                        page.division)
                });
            });
        });

    });

    describe('Проверка фильтра для подразделения 1 уровня', () => {

        bef();
        aft();

        it('Отображение 7 подраздление', async () => await dec.simple(page.division.size,
            [7, entry.max],
            page.division));

        it(`Ввод в "Поиск..." - "${params.array1[0]}"`, async () => await dec.simple(el.input.sendKeys,
            ['', 'Поиск...', params.array1[0], entry.max],
            el.input));

        it('Отображение 1 подразделение', async () => await dec.simple(page.division.size,
            [1, entry.max],
            page.division));

        it(`Проверка отображения подразделения 1 уровня - "${params.array1[0]}"`,
            async ()=> await dec.simple(page.division.division,
                [[params.array1[0]], entry.max],
                page.division));
    });

    describe('Проверка фильтра для подразделения 2 уровня', () => {

        bef();
        aft();

        it('Отображение 7 подраздление', async () => await dec.simple(page.division.size,
            [7, entry.max],
            page.division));

        it(`Ввод в "Поиск..." - "${params.array1[1]}"`, async () => await dec.simple(el.input.sendKeys,
            ['', 'Поиск...', params.array1[1], entry.max],
            el.input));

        it('Отображение 2 подразделение', async () => await dec.simple(page.division.size,
            [2, entry.max],
            page.division));

        it(`Проверка отображения подразделения 1 уровня - "${params.array1[0]}"`,
            async ()=> await dec.simple(page.division.division,
                [[params.array1[0]], entry.max],
                page.division));

        it(`Проверка отображения подразделения 2 уровня - "${params.array1[1]}"`,
            async ()=> await dec.simple(page.division.division,
                [[params.array1[0], params.array1[1]], entry.max],
                page.division));

    });

    describe('Проверка фильтра для подразделения 3 уровня', () => {

        bef();
        aft();

        it('Отображение 7 подраздление', async () => await dec.simple(page.division.size,
            [7, entry.max],
            page.division));

        it(`Ввод в "Поиск..." - "${params.array1[2]}"`, async () => await dec.simple(el.input.sendKeys,
            ['', 'Поиск...', params.array1[2], entry.max],
            el.input));

        it('Отображение 3 подразделение', async () => await dec.simple(page.division.size,
            [3, entry.max],
            page.division));

        it(`Проверка отображения подразделения 1 уровня - "${params.array1[0]}"`,
            async ()=> await dec.simple(page.division.division,
                [[params.array1[0]], entry.max],
                page.division));

        it(`Проверка отображения подразделения 2 уровня - "${params.array1[1]}"`,
            async ()=> await dec.simple(page.division.division,
                [[params.array1[0], params.array1[1]], entry.max],
                page.division));

        it(`Проверка отображения подразделения 3 уровня - "${params.array1[2]}"`,
            async ()=> await dec.simple(page.division.division,
                [[params.array1[0], params.array1[1],  params.array1[2]], entry.max],
                page.division));

    });

    describe('Проверка фильтра без совпадений', () => {

        bef();
        aft();

        it('Отображение 7 подраздление', async () => await dec.simple(page.division.size,
            [7, entry.max],
            page.division));

        it('Ввод в "Поиск..." - "Hello World"', async () => await dec.simple(el.input.sendKeys,
            ['', 'Поиск...', 'Hello World', entry.max],
            el.input));

        it('Отображение 0 подразделений', async () => await dec.simple(page.division.size,
            [0, entry.max],
            page.division));

    });

    describe('Проверка фильтра с частичным совпадением', () => {

        bef();
        aft();

        it('Отображение 7 подраздление', async () => await dec.simple(page.division.size,
            [7, entry.max],
            page.division));

        it('Ввод в "Поиск..." - "3"', async () => await dec.simple(el.input.sendKeys,
            ['', 'Поиск...', '3', entry.max],
            el.input));

        it('Отображение 6 подразделений', async () => await dec.simple(page.division.size,
            [6, entry.max],
            page.division));

        it(`Проверка отображения подразделения 1 уровня - "${params.array1[0]}"`,
            async ()=> await dec.simple(page.division.division,
                [[params.array1[0]], entry.max],
                page.division));

        it(`Проверка отображения подразделения 2 уровня - "${params.array1[1]}"`,
            async ()=> await dec.simple(page.division.division,
                [[params.array1[0], params.array1[1]], entry.max],
                page.division));

        it(`Проверка отображения подразделения 3 уровня - "${params.array1[2]}"`,
            async ()=> await dec.simple(page.division.division,
                [[params.array1[0], params.array1[1],  params.array1[2]], entry.max],
                page.division));

        it(`Проверка отображения подразделения 1 уровня - "${params.array2[0]}"`,
            async ()=> await dec.simple(page.division.division,
                [[params.array2[0]], entry.max],
                page.division));

        it(`Проверка отображения подразделения 2 уровня - "${params.array2[1]}"`,
            async ()=> await dec.simple(page.division.division,
                [[params.array2[0], params.array2[1]], entry.max],
                page.division));

        it(`Проверка отображения подразделения 3 уровня - "${params.array2[2]}"`,
            async ()=> await dec.simple(page.division.division,
                [[params.array2[0], params.array2[1],  params.array2[2]], entry.max],
                page.division));



    });

    deleteParams();

});

module.exports = {
    display,
    add: add(),
    edit: edit(),
    delete: remove(),
    service: serviceDivision(),
    print: print(),
    printTree: printTree(),
    export: {
        minXLSX: exportFile('min',  'Минимальное количество данных', 'XLSX').xlsx,
        maxXLSX: exportFile('max', 'Максимальное количество данных', 'XLSX').xlsx,
        minCSV: exportFile('min',  'Минимальное количество данных', 'CSV').csv,
        maxCSV: exportFile('max',  'Максимальное количество данных', 'CSV').csv,
    },
    import: importFile(),
    filterSearch,
    main: () => {
        add().add();
        edit().edit();
        remove().remove();
        //serviceDivision().serviceDivision();
        //print().print();
        //printTree().printTree();
        //filterSearch();
        //exportFile('min',  'Минимальное количество данных', 'XLSX').xlsx.main();
        //exportFile('max', 'Максимальное количество данных', 'XLSX').xlsx.main();
        //exportFile('min',  'Минимальное количество данных', 'CSV').csv.main();
        //exportFile('max',  'Максимальное количество данных', 'CSV').csv.main();
    },
}
