const {describe, it, before, after} = require('mocha');

const entry = require('../../../../../../entry');
const page = require('../../../../pages');
const el = require('../../../../elements');
const dec = require('../../../../dictionaries/decorate');
const sec = require('../../../../dictionaries/section');
const sub = require('../../../../dictionaries/subsection');
const but = require('../../../../dictionaries/button-icon');
const api = require('../../../other/api');
const deleteData = require('../../../other/deleteData');
const oth = require('../../../other/other');

const bef = () => before('Вход и открытие подраздела "Шаблоны доступа" вкладка "Временные критерии доступа"', async () => {
    await dec.auth(entry.customLogin, entry.customPassword);
    await dec.simple(el.section.handler, [sec.pas, entry.max], el.section);
    await dec.simple(el.subsection.handler, [sub.pas.template, entry.max], el.subsection);
    await dec.simple(el.tab.handler, ['Временные критерии доступа', entry.max], el.tab);
    await dec.simple(page.accessTemplateSchedulePage.init, [entry.max], page.accessTemplateSchedulePage);
});

const aft = () => after('Выход', async () => await dec.exit());

// Добавление временной зоны
const addTZ = (tz) => it('Добавление временной зоны', async () => {
    const cook = await page.base.getCookie('token');
    await dec.simple(api.putArrayTimeZone,
        [[tz], cook.text],
        api.putArrayTimeZone);
});

// Добавление недельных графиков
const addWeek = (week) => it('Добавление недельных графиков', async () => {
    const cook = await page.base.getCookie('token');
    await dec.simple(api.putArrayWeek,
        [[week], cook.text],
        api.putArrayWeek);
});

// Добавление скользящих посуточных графиков
const addSTZ = (stz) => it('Добавление скользящих посуточных графиков', async () => {
    const cook = await page.base.getCookie('token');
    await dec.simple(api.putArraySTZ,
        [[stz], cook.text],
        api.putArraySTZ)
});

// Добавление скользящих понедельных графиков
const addSWeek = (sw) => it('Добавление скользящих понедельных графиков', async () => {
    const cook = await page.base.getCookie('token');
    await dec.simple(api.putArraySW,
        [[sw], cook.text],
        api.putArraySW)
});

// Удаление скользящих понедельных графиков
const removeSW = () => it('Удаление скользящих понедельных графиков', async () => {
    const cook = await page.base.getCookie('token');
    const sw = await api.getAccessSchedules({type: 4}, cook.text);
    const filterSW = accessShFilter(JSON.parse(sw.text));
    await dec.simple(api.deleteAccessSchedule,
        [filterSW, cook.text],
        api.deleteAccessSchedule);
});

const accessShFilter = (event) => {
    return event.filter(item => item.is_const !== 1)
};

const deleteParams = () => describe('Удаление тестовых данных', () => {
    bef();
    aft();
    deleteData.deleteSW();
    deleteData.deleteSTZ()
    deleteData.deleteW();
    deleteData.deleteTZ();
});

const checkTable = (name, description, type) => describe('Проверка таблицы', () => {

    bef();
    aft();

    it('Ввод в "Поиск..."', async () => await dec.simple(el.input.sendKeys,
        ['', 'Поиск...', name, entry.max],
        el.input));

    it('Отображение в таблице одной строки', async () => await dec.simple(el.table.singleSize,
        [entry.max],
        el.table));

    it('Поле "Название"', async () => await dec.simpleText(el.table.cellGetText,
        ['Название', 1, 1, entry.max],
        name,
        el.table));

    it('Поле "Описание"', async () => await dec.simpleText(el.table.cellGetText,
        ['Описание', 1, 2, entry.max],
        description,
        el.table));

    it('Поле "Тип"', async () => await dec.simpleText(el.table.cellGetText,
        ['Тип', 1, 3, entry.max],
        type,
        el.table));
});

const checkFalseTable = (name) => describe('Проверка таблицы', () => {

    bef();
    aft();

    it('Ввод в "Поиск..."', async () => await dec.simple(el.input.sendKeys,
        ['', 'Поиск...', name, entry.max],
        el.input));

    it('Отображение в таблице 0 строк', async () => await dec.simple(el.table.noStr,
        [entry.max],
        el.table));

    it('Отображение "Нет данных для отображения."', async () => await dec.simpleText(el.rowEmpty.getText,
        [entry.max],
        'Нет данных для отображения.',
        el.table));
});

const checkWeek = (obj) => describe(`Проверка интервала "${obj.title}"`, () => {

    it('Назавание', async () => await dec.simpleText(page.accessTemplateScheduleChangePage.intervalName,
        [obj.countInterval, entry.max],
        obj.name,
        page.accessTemplateScheduleChangePage));

    it('Заглавие', async () => await dec.simpleText(page.accessTemplateScheduleChangePage.intervalTitle,
        [obj.countInterval, entry.max],
        obj.title,
        page.accessTemplateScheduleChangePage));

    it('Отображения интервала', async () => await dec.simple(page.accessTemplateScheduleChangePage.interval,
        [obj.countInterval, entry.max],
        page.accessTemplateScheduleChangePage));

    if(obj.intervals.length > 0) {
        obj.intervals.forEach((interval, index) => {
            it(`Начало временного блока ${index + 1}`,
                async () => await dec.simpleText(page.accessTemplateScheduleChangePage.startTimeGetValue,
                    [obj.countInterval, index + 1, entry.max],
                    interval.begin,
                    page.accessTemplateScheduleChangePage));

            it('Окончание временного блока',
                async () => await dec.simpleText(page.accessTemplateScheduleChangePage.endTimeGetValue,
                    [obj.countInterval, index + 1, entry.max],
                    interval.end,
                    page.accessTemplateScheduleChangePage));
        });
    }

    if(obj.intervals.length === 0) {
        it('Отсутствие временных блоков в интервале',
            async () => await dec.simple(page.accessTemplateScheduleChangePage.noTimeInterval,
                [obj.countInterval, entry.max],
                page.accessTemplateScheduleChangePage));
    }
});

const week = (obj) => describe(`Добавление интервала "${obj.title}"`, () => {
    if(obj.countInterval === 6 || obj.countInterval === 11) {
        it('Скролл модального окна', async () => await dec.simple(el.modal.timeZoneModalSelect.scrollTop,
            [],
            el.modal.timeZoneModalSelect));
    }

    it(`Отображения интервала ${obj.title}`, async () =>
        await dec.simple(page.accessTemplateScheduleChangePage.interval,
            [obj.countInterval, entry.max],
            page.accessTemplateScheduleChangePage));

    it('Нажатие по интевалу', async () =>
        await dec.simple(page.accessTemplateScheduleChangePage.handler,
            [obj.countInterval, entry.max],
            page.accessTemplateScheduleChangePage));

    it('Интервал выделен',
        async () => await dec.simple(page.accessTemplateScheduleChangePage.intervalActive,
            [obj.countInterval, entry.max],
            page.accessTemplateScheduleChangePage));

    it('Нажатие кнопки "Редактировать"', async () => await dec.simple(el.button.handler,
        ['Редактировать', entry.max],
        el.button));

    it('Отображенение модального окна выборы временной зоны',
        async () => await dec.simple(el.modal.timeZoneModalSelect.init,
            [entry.max],
            el.modal.timeZoneModalSelect));

    it('Отображение интервала', async () => {
        await dec.simple(el.modal.timeZoneModalSelect.interval,
            [obj.tz, entry.max],
            el.modal.timeZoneModalSelect)
    });

    if(obj.tz > 5) {
        it('Скролл модального окна', async () => await dec.simple(el.modal.timeZoneModalSelect.scrollTop,
            [],
            el.modal.timeZoneModalSelect));
    }

    it(`Нажатие по временной зоне`,
        async () => await dec.simple(el.modal.timeZoneModalSelect.intervalHandler,
            [obj.tz, entry.max],
            el.modal.timeZoneModalSelect));

    it('Нажатие кнопки "Применить"', async () => await dec.simple(el.button.handler,
        ['Применить', entry.max],
        el.button));

    it('Отсутствие модального окна выборы временной зоны',
        async () => await dec.simple(el.modal.timeZoneModalSelect.initClose,
            [entry.max],
            el.modal.timeZoneModalSelect));
});

const checkSTZ = (obj) => describe(`Проверка интервала "День ${obj.countInterval}"`, () => {
    it('Назавание', async () => await dec.simpleText(page.accessTemplateScheduleChangePage.intervalName,
        [obj.countInterval, entry.max],
        obj.name,
        page.accessTemplateScheduleChangePage));

    it('Отображения интервала', async () => await dec.simple(page.accessTemplateScheduleChangePage.interval,
        [obj.countInterval, entry.max],
        page.accessTemplateScheduleChangePage));

    if(obj.intervals.length > 0) {
        obj.intervals.forEach((interval, index) => {
            it(`Начало временного блока ${index + 1}`,
                async () => await dec.simpleText(page.accessTemplateScheduleChangePage.startTimeGetValue,
                    [obj.countInterval, index + 1, entry.max],
                    interval.begin,
                    page.accessTemplateScheduleChangePage));

            it(`Окончание временного блока ${index + 1}`,
                async () => await dec.simpleText(page.accessTemplateScheduleChangePage.endTimeGetValue,
                    [obj.countInterval, index + 1, entry.max],
                    interval.end,
                    page.accessTemplateScheduleChangePage));
        });
    }

    if(obj.intervals.length === 0) {
        it('Отсутствие временных блоков в интервале',
            async () => await dec.simple(page.accessTemplateScheduleChangePage.noTimeInterval,
                [obj.countInterval, entry.max],
                page.accessTemplateScheduleChangePage));
    }
});

const stz = (obj) => describe(`Добавление интервала "День ${obj.countInterval}"`, () => {

    it('Нажатие кнопки "Добавить"', async () => await dec.simple(el.butIcBefore.handler,
        [but.add, entry.max],
        el.butIcBefore));

    it('Отображенение модального окна выборы временной зоны',
        async () => await dec.simple(el.modal.timeZoneModalSelect.init,
            [entry.max],
            el.modal.timeZoneModalSelect));

    it('Отображение интервала', async () => await dec.simple(el.modal.timeZoneModalSelect.interval,
        [obj.tz, entry.max],
        el.modal.timeZoneModalSelect));

    if(obj.tz > 5) {
        it('Скролл модального окна', async () => await dec.simple(el.modal.timeZoneModalSelect.scrollTop,
            [],
            el.modal.timeZoneModalSelect));
    }

    it(`Нажатие по временной зоне`,
        async () => await dec.simple(el.modal.timeZoneModalSelect.intervalHandler,
            [obj.tz, entry.max],
            el.modal.timeZoneModalSelect));

    it('Нажатие кнопки "Применить"', async () => await dec.simple(el.button.handler,
        ['Применить', entry.max],
        el.button));

    it('Отсутствие модального окна выборы временной зоны',
        async () => await dec.simple(el.modal.timeZoneModalSelect.initClose,
            [entry.max],
            el.modal.timeZoneModalSelect));
});

const checkSW = (obj) => describe(`Проверка "Неделя ${obj.countInterval}"`, () => {
    it('Отображение недели в списки выбранных', async () => {
        await dec.simpleText(page.accessTemplateScheduleChangePage.sWeekSelectedName,
            [obj.countInterval, entry.max],
            obj.nameWeek,
            page.accessTemplateScheduleChangePage)});
});

const sw = (obj) => describe(`Добавление "Неделя ${obj.countInterval}"`, () => {
    it(`Нажатие кнопки "Добавить" неделю ${obj.numWeek}`,
        async () => await dec.simple(page.accessTemplateScheduleChangePage.sWeekHandler,
            [obj.numWeek, entry.max],
            page.accessTemplateScheduleChangePage));

    it('Отображение недели в списки выбранных', async () => {
        const week = await page.accessTemplateScheduleChangePage.sWeekName(obj.numWeek, entry.max);
        await dec.simpleText(page.accessTemplateScheduleChangePage.sWeekSelectedName,
            [obj.countInterval, entry.max],
            week.text,
            page.accessTemplateScheduleChangePage);
    });
});

const display = () => describe('Отображение страницы "Шаблоны доступа" - вкладка "Временные критерии доступа"', () => {

    bef();
    aft();

    describe('Общее отображение', () => {

        it('Отображение "title", "url"', async () => await dec.simple(page.accessTemplateSchedulePage.init,
            [entry.max],
            page.accessTemplateSchedulePage));

        it('Отображение раздела "Бюро пропусков" - активен', async () => await dec.simple(el.section.active,
            [sec.pas, entry.max],
            el.section));

        it('Отображение подраздела "Шаблоны доступа" - активен',
            async () => await dec.simple(el.subsection.active,
                [sub.pas.template, entry.max],
                el.section));

        it('Отображение "БЮРО ПРОПУСКОВ" в заглавие навигации',
            async () => await dec.simpleText(el.subsection.headerGetText,
                [entry.max],
                'БЮРО ПРОПУСКОВ',
                el.subsection));

        it('Отображение "Шаблоны доступа" в заглавие', async () => await dec.simpleText(el.header.getText,
            [entry.max],
            'Шаблоны доступа',
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

        it('Отображение фильтра "Поиск..."', async () => await dec.simple(el.input.input,
            ['', 'Поиск...', entry.max],
            el.input));

        it('Отображение фильтра по типу', async () => await dec.simple(el.selectMulti.select,
            ['', entry.max],
            el.selectMulti));

        it('Отображение "20" в выборе количества строк', async () => await dec.simpleText(el.footer.selectGetText,
            [entry.max],
            '20',
            el.footer));

        it(`Отображение "3 записи" в количестве строк`, async () => await dec.simpleText(el.footer.countGetText,
            [entry.max],
            `3 записи`,
            el.footer));

        it('Отображение в таблице 3 строки', async () => await dec.simple(el.table.size,
            [3, entry.max],
            el.table));
    });

    describe('Общее отображение страницы добавления временного критерия', () => {

        it('Нажатие кнопки "Добавить"', async () => await dec.simple(el.butIcBefore.handler,
            [but.add, entry.max],
            el.butIcBefore));

        it('Отображение "title", "url"', async () => await dec.simple(page.accessTemplateScheduleChangePage.initAdd,
            [entry.max],
            page.accessTemplateScheduleChangePage));

        it('Отображение поля ввода "Название"', async () => await dec.simple(el.input.input,
            ['Название', '', entry.max],
            el.input));

        it('Отображение поля ввода "Описание"', async () => await dec.simple(el.input.input,
            ['Описание', '', entry.max],
            el.input));

        it('Отображение поля выбора "Временной критерий"', async () => await dec.simple(el.select.select,
            ['Временной критерий', '', entry.max],
            el.select));

        it('Отображение "Необходимо выбрать тип временного критерия доступа"', async () => await dec.simpleText(
            el.placeText.getText,
            [entry.max],
            'Необходимо выбрать тип временного критерия доступа',
            el.placeText));

        it('Отображение кнопки "Вернуться к списку графиков" - активна', async () => await dec.simple(
            el.button.active,
            ['Вернуться к списку графиков', entry.max],
            el.button));

        it('Отображение кнопки "Сохранить изменения" - не активна', async () => await dec.simple(el.button.disabled,
            ['Сохранить изменения', entry.max],
            el.button))
    });

    describe('Отображение - "Временные зоны"', () => {

        it('Выбор значения "Временные зоны" в поле выбора "Временной критерий"',
            async () => await dec.simple(el.select.iconXpand,
                ['Временной критерий', '', 'Временные зоны', entry.max],
                el.select));

        it('Отображение в поле выбора "Временной критерий" - "Временные зоны"',
            async () => await dec.simpleText(el.select.getText,
                ['Временной критерий', 'Временные зоны', entry.max],
                'Временные зоны',
                el.select));

        it('Отображение интервала', async () => await dec.simple(page.accessTemplateScheduleChangePage.interval,
            [1, entry.max],
            page.accessTemplateScheduleChangePage));

        it('Отсутствие временных блоков',
            async () => await dec.simple(page.accessTemplateScheduleChangePage.noTimeInterval,
                [1, entry.max],
                page.accessTemplateScheduleChangePage))
    });

    describe('Отображение - "Недельный график"', () => {

        describe('Общее отображение', () => {

            it('Выбор значения "Недельный график" в поле выбора "Временной критерий"', async () => await dec.simple(
                el.select.iconXpand,
                ['Временной критерий', 'Временные зоны', 'Недельный график', entry.max],
                el.select));

            it('Отображение в поле выбора "Временной критерий" - "Недельный график"',
                async () => await dec.simpleText(
                    el.select.getText,
                    ['Временной критерий', 'Недельный график', entry.max],
                    'Недельный график',
                    el.select));

            it('Отображенер кнопки "Редактировать"', async () => await dec.simple(el.button.button,
                ['Редактировать', entry.max],
                el.button))

        });

        describe('Модальное окно выбора временных зон', () => {

            it('Нажатие по интервалу - "Понедельник"', async () => await dec.simple(
                page.accessTemplateScheduleChangePage.handler,
                [1, entry.max],
                page.accessTemplateScheduleChangePage));

            it('Интервал "Понедельник" - нажат', async () => await dec.simple(
                page.accessTemplateScheduleChangePage.intervalActive,
                [1, entry.max],
                page.accessTemplateScheduleChangePage));

            it('Нажатие кнопки "Редактировать"', async () => await dec.simple(el.button.handler,
                ['Редактировать', entry.max],
                el.button));

            it('Отображение модального окна выбора временной зоны', async () => await dec.simple(
                el.modal.timeZoneModalSelect.init,
                [entry.max],
                el.modal.timeZoneModalSelect));

            it('Отображение интервала "Никода"', async () => await dec.simpleText(
                el.modal.timeZoneModalSelect.intervalName,
                [1, entry.max],
                'Никогда',
                el.modal.timeZoneModalSelect));

            it('Отобарежение интервала "Всегда"', async () => await dec.simpleText(
                el.modal.timeZoneModalSelect.intervalName,
                [2, entry.max],
                'Всегда',
                el.modal.timeZoneModalSelect));

            it('Отображение кнопки "Отмена"', async () => await dec.simple(
                el.modal.timeZoneModalSelect.buttonActive,
                ['Отмена', entry.max],
                el.modal.timeZoneModalSelect));

            it('Отображение кнопки "Применить"', async () => await dec.simple(
                el.modal.timeZoneModalSelect.buttonDisabled,
                ['Применить', entry.max],
                el.modal.timeZoneModalSelect));

            it('Отображение кнопки закрытия', async () => await dec.simple(el.modal.timeZoneModalSelect.close,
                [entry.max],
                el.modal.timeZoneModalSelect));

            it('Нажатие кнопки "Отмена"', async () => await dec.simple(el.modal.timeZoneModalSelect.buttonHandler,
                ['Отмена', entry.max],
                el.modal.timeZoneModalSelect));

            it('Отсутствие модального окна выбора временной зоны', async () => await dec.simple(
                el.modal.timeZoneModalSelect.initClose,
                [entry.max],
                el.modal.timeZoneModalSelect));

            it('Нажатие по интервалу - "Понедельник"', async () => await dec.simple(
                page.accessTemplateScheduleChangePage.handler,
                [1, entry.max],
                page.accessTemplateScheduleChangePage));

            it('Интервал "Понедельник" - нажат', async () => await dec.simple(
                page.accessTemplateScheduleChangePage.intervalActive,
                [1, entry.max],
                page.accessTemplateScheduleChangePage));

            it('Нажатие кнопки "Редактировать"', async () => await dec.simple(el.button.handler,
                ['Редактировать', entry.max],
                el.button));

            it('Отображение модального окна выбора временной зоны', async () => await dec.simple(
                el.modal.timeZoneModalSelect.init,
                [entry.max],
                el.modal.timeZoneModalSelect));

            it('Нажатие  кнопки закрытия', async () => await dec.simple(el.modal.timeZoneModalSelect.closeHandler,
                [entry.max],
                el.modal.timeZoneModalSelect));

            it('Отсутствие модального окна выбора временной зоны', async () => await dec.simple(
                el.modal.timeZoneModalSelect.initClose,
                [entry.max],
                el.modal.timeZoneModalSelect))
        });

        describe('Интервальный блок "Понедельник"', () => {

            it('Назавание - "Никогда"', async () => await dec.simpleText(
                page.accessTemplateScheduleChangePage.intervalName,
                [1, entry.max],
                'Никогда',
                page.accessTemplateScheduleChangePage));

            it('Заглавие - "ПН"', async () => await dec.simpleText(
                page.accessTemplateScheduleChangePage.intervalTitle,
                [1, entry.max],
                'ПН',
                page.accessTemplateScheduleChangePage));

            it('Отображения интервала', async () => await dec.simple(page.accessTemplateScheduleChangePage.interval,
                [1, entry.max],
                page.accessTemplateScheduleChangePage));

            it('Отсутствие временных блоков в интервале', async () => await dec.simple(
                page.accessTemplateScheduleChangePage.noTimeInterval,
                [1, entry.max],
                page.accessTemplateScheduleChangePage))
        });

        describe('Интервальный блок "Вторник"', () => {

            it('Назавание - "Никогда"', async () => await dec.simpleText(
                page.accessTemplateScheduleChangePage.intervalName,
                [2, entry.max],
                'Никогда',
                page.accessTemplateScheduleChangePage));

            it('Заглавие - "ВТ"', async () => await dec.simpleText(
                page.accessTemplateScheduleChangePage.intervalTitle,
                [2, entry.max],
                'ВТ',
                page.accessTemplateScheduleChangePage));

            it('Отображения интервала', async () => await dec.simple(page.accessTemplateScheduleChangePage.interval,
                [2, entry.max],
                page.accessTemplateScheduleChangePage));

            it('Отсутствие временных блоков в интервале', async () => await dec.simple(
                page.accessTemplateScheduleChangePage.noTimeInterval,
                [2, entry.max],
                page.accessTemplateScheduleChangePage))

        });

        describe('Интервальный блок "Среда"', () => {

            it('Назавание - "Никогда"', async () => await dec.simpleText(
                page.accessTemplateScheduleChangePage.intervalName,
                [3, entry.max],
                'Никогда',
                page.accessTemplateScheduleChangePage));

            it('Заглавие - "СР"', async () => await dec.simpleText(
                page.accessTemplateScheduleChangePage.intervalTitle,
                [3, entry.max],
                'СР',
                page.accessTemplateScheduleChangePage));

            it('Отображения интервала', async () => await dec.simple(page.accessTemplateScheduleChangePage.interval,
                [3, entry.max],
                page.accessTemplateScheduleChangePage));

            it('Отсутствие временных блоков в интервале', async () => await dec.simple(
                page.accessTemplateScheduleChangePage.noTimeInterval,
                [3, entry.max],
                page.accessTemplateScheduleChangePage))

        });

        describe('Интервальный блок "Четверг"', () => {

            it('Назавание - "Никогда"', async () => await dec.simpleText(
                page.accessTemplateScheduleChangePage.intervalName,
                [4, entry.max],
                'Никогда',
                page.accessTemplateScheduleChangePage));

            it('Заглавие - "ЧТ"', async () => await dec.simpleText(
                page.accessTemplateScheduleChangePage.intervalTitle,
                [4, entry.max],
                'ЧТ',
                page.accessTemplateScheduleChangePage));

            it('Отображения интервала', async () => await dec.simple(page.accessTemplateScheduleChangePage.interval,
                [4, entry.max],
                page.accessTemplateScheduleChangePage));

            it('Отсутствие временных блоков в интервале', async () => await dec.simple(
                page.accessTemplateScheduleChangePage.noTimeInterval,
                [4, entry.max],
                page.accessTemplateScheduleChangePage))

        });

        describe('Интервальный блок "Пятница"', () => {

            it('Назавание - "Никогда"', async () => await dec.simpleText(
                page.accessTemplateScheduleChangePage.intervalName,
                [5, entry.max],
                'Никогда',
                page.accessTemplateScheduleChangePage));

            it('Заглавие - "ПТ"', async () => await dec.simpleText(
                page.accessTemplateScheduleChangePage.intervalTitle,
                [5, entry.max],
                'ПТ',
                page.accessTemplateScheduleChangePage));

            it('Отображения интервала', async () => await dec.simple(page.accessTemplateScheduleChangePage.interval,
                [5, entry.max],
                page.accessTemplateScheduleChangePage));

            it('Отсутствие временных блоков в интервале', async () => await dec.simple(
                page.accessTemplateScheduleChangePage.noTimeInterval,
                [5, entry.max],
                page.accessTemplateScheduleChangePage))

        });

        describe('Интервальный блок "Суббота"', () => {

            it('Назавание - "Никогда"', async () => await dec.simpleText(
                page.accessTemplateScheduleChangePage.intervalName,
                [6, entry.max],
                'Никогда',
                page.accessTemplateScheduleChangePage));

            it('Заглавие - "СБ"', async () => await dec.simpleText(
                page.accessTemplateScheduleChangePage.intervalTitle,
                [6, entry.max],
                'СБ',
                page.accessTemplateScheduleChangePage));

            it('Отображения интервала', async () => await dec.simple(page.accessTemplateScheduleChangePage.interval,
                [6, entry.max],
                page.accessTemplateScheduleChangePage));

            it('Отсутствие временных блоков в интервале', async () => await dec.simple(
                page.accessTemplateScheduleChangePage.noTimeInterval,
                [6, entry.max],
                page.accessTemplateScheduleChangePage))

        });

        describe('Интервальный блок "Воскресенье"', () => {

            it('Назавание - "Никогда"', async () => await dec.simpleText(
                page.accessTemplateScheduleChangePage.intervalName,
                [7, entry.max],
                'Никогда',
                page.accessTemplateScheduleChangePage));

            it('Заглавие - "ВС"', async () => await dec.simpleText(
                page.accessTemplateScheduleChangePage.intervalTitle,
                [7, entry.max],
                'ВС',
                page.accessTemplateScheduleChangePage));

            it('Отображения интервала', async () => await dec.simple(page.accessTemplateScheduleChangePage.interval,
                [7, entry.max],
                page.accessTemplateScheduleChangePage));

            it('Отсутствие временных блоков в интервале', async () => await dec.simple(
                page.accessTemplateScheduleChangePage.noTimeInterval,
                [7, entry.max],
                page.accessTemplateScheduleChangePage))

        });

        describe('Интервальный блок "Тип 1"', () => {

            it('Назавание - "Никогда"', async () => await dec.simpleText(
                page.accessTemplateScheduleChangePage.intervalName,
                [8, entry.max],
                'Никогда',
                page.accessTemplateScheduleChangePage));

            it('Заглавие - "Тип 1"', async () => await dec.simpleText(
                page.accessTemplateScheduleChangePage.intervalTitle,
                [8, entry.max],
                'Тип 1',
                page.accessTemplateScheduleChangePage));

            it('Отображения интервала', async () => await dec.simple(page.accessTemplateScheduleChangePage.interval,
                [8, entry.max],
                page.accessTemplateScheduleChangePage));

            it('Отсутствие временных блоков в интервале', async () => await dec.simple(
                page.accessTemplateScheduleChangePage.noTimeInterval,
                [8, entry.max],
                page.accessTemplateScheduleChangePage))

        });

        describe('Интервальный блок "Тип 2"', () => {

            it('Назавание - "Никогда"', async () => await dec.simpleText(
                page.accessTemplateScheduleChangePage.intervalName,
                [9, entry.max],
                'Никогда',
                page.accessTemplateScheduleChangePage));

            it('Заглавие - "Тип 2"', async () => await dec.simpleText(
                page.accessTemplateScheduleChangePage.intervalTitle,
                [9, entry.max],
                'Тип 2',
                page.accessTemplateScheduleChangePage));

            it('Отображения интервала', async () => await dec.simple(page.accessTemplateScheduleChangePage.interval,
                [9, entry.max],
                page.accessTemplateScheduleChangePage));

            it('Отсутствие временных блоков в интервале', async () => await dec.simple(
                page.accessTemplateScheduleChangePage.noTimeInterval,
                [9, entry.max],
                page.accessTemplateScheduleChangePage))

        });

        describe('Интервальный блок "Тип 3"', () => {

            it('Назавание - "Никогда"', async () => await dec.simpleText(
                page.accessTemplateScheduleChangePage.intervalName,
                [10, entry.max],
                'Никогда',
                page.accessTemplateScheduleChangePage));

            it('Заглавие - "Тип 3"', async () => await dec.simpleText(
                page.accessTemplateScheduleChangePage.intervalTitle,
                [10, entry.max],
                'Тип 3',
                page.accessTemplateScheduleChangePage));

            it('Отображения интервала', async () => await dec.simple(page.accessTemplateScheduleChangePage.interval,
                [10, entry.max],
                page.accessTemplateScheduleChangePage));

            it('Отсутствие временных блоков в интервале', async () => await dec.simple(
                page.accessTemplateScheduleChangePage.noTimeInterval,
                [10, entry.max],
                page.accessTemplateScheduleChangePage))

        });

        describe('Интервальный блок "Тип 4"', () => {

            it('Назавание - "Никогда"', async () => await dec.simpleText(
                page.accessTemplateScheduleChangePage.intervalName,
                [11, entry.max],
                'Никогда',
                page.accessTemplateScheduleChangePage));

            it('Заглавие - "Тип 4"', async () => await dec.simpleText(
                page.accessTemplateScheduleChangePage.intervalTitle,
                [11, entry.max],
                'Тип 4',
                page.accessTemplateScheduleChangePage));

            it('Отображения интервала', async () => await dec.simple(page.accessTemplateScheduleChangePage.interval,
                [11, entry.max],
                page.accessTemplateScheduleChangePage));

            it('Отсутствие временных блоков в интервале', async () => await dec.simple(
                page.accessTemplateScheduleChangePage.noTimeInterval,
                [11, entry.max],
                page.accessTemplateScheduleChangePage))

        });

        describe('Интервальный блок "Тип 5"', () => {

            it('Назавание - "Никогда"', async () => await dec.simpleText(
                page.accessTemplateScheduleChangePage.intervalName,
                [12, entry.max],
                'Никогда',
                page.accessTemplateScheduleChangePage));

            it('Заглавие - "Тип 5"', async () => await dec.simpleText(
                page.accessTemplateScheduleChangePage.intervalTitle,
                [12, entry.max],
                'Тип 5',
                page.accessTemplateScheduleChangePage));

            it('Отображения интервала', async () => await dec.simple(page.accessTemplateScheduleChangePage.interval,
                [12, entry.max],
                page.accessTemplateScheduleChangePage));

            it('Отсутствие временных блоков в интервале', async () => await dec.simple(
                page.accessTemplateScheduleChangePage.noTimeInterval,
                [12, entry.max],
                page.accessTemplateScheduleChangePage))

        });

        describe('Интервальный блок "Тип 6"', () => {

            it('Назавание - "Никогда"', async () => await dec.simpleText(
                page.accessTemplateScheduleChangePage.intervalName,
                [13, entry.max],
                'Никогда',
                page.accessTemplateScheduleChangePage));

            it('Заглавие - "Тип 6"', async () => await dec.simpleText(
                page.accessTemplateScheduleChangePage.intervalTitle,
                [13, entry.max],
                'Тип 6',
                page.accessTemplateScheduleChangePage));

            it('Отображения интервала', async () => await dec.simple(page.accessTemplateScheduleChangePage.interval,
                [13, entry.max],
                page.accessTemplateScheduleChangePage));

            it('Отсутствие временных блоков в интервале', async () => await dec.simple(
                page.accessTemplateScheduleChangePage.noTimeInterval,
                [13, entry.max],
                page.accessTemplateScheduleChangePage))

        });

        describe('Интервальный блок "Тип 7"', () => {

            it('Назавание - "Никогда"', async () => await dec.simpleText(
                page.accessTemplateScheduleChangePage.intervalName,
                [14, entry.max],
                'Никогда',
                page.accessTemplateScheduleChangePage));

            it('Заглавие - "Тип 7"', async () => await dec.simpleText(
                page.accessTemplateScheduleChangePage.intervalTitle,
                [14, entry.max],
                'Тип 7',
                page.accessTemplateScheduleChangePage));

            it('Отображения интервала', async () => await dec.simple(page.accessTemplateScheduleChangePage.interval,
                [14, entry.max],
                page.accessTemplateScheduleChangePage));

            it('Отсутствие временных блоков в интервале', async () => await dec.simple(
                page.accessTemplateScheduleChangePage.noTimeInterval,
                [14, entry.max],
                page.accessTemplateScheduleChangePage))

        });

        describe('Интервальный блок "Тип 8"', () => {

            it('Назавание - "Никогда"', async () => await dec.simpleText(
                page.accessTemplateScheduleChangePage.intervalName,
                [15, entry.max],
                'Никогда',
                page.accessTemplateScheduleChangePage));

            it('Заглавие - "Тип 8"', async () => await dec.simpleText(
                page.accessTemplateScheduleChangePage.intervalTitle,
                [15, entry.max],
                'Тип 8',
                page.accessTemplateScheduleChangePage));

            it('Отображения интервала', async () => await dec.simple(page.accessTemplateScheduleChangePage.interval,
                [15, entry.max],
                page.accessTemplateScheduleChangePage));

            it('Отсутствие временных блоков в интервале', async () => await dec.simple(
                page.accessTemplateScheduleChangePage.noTimeInterval,
                [15, entry.max],
                page.accessTemplateScheduleChangePage))

        })
    });

    describe('Отображение - "Скользящий посуточный график"', () => {

        describe('Общее отображение', () => {

            it('Выбор значения "Скользящий посуточный график" в поле выбора "Временной критерий"',
                async () => await dec.simple(el.select.iconXpand,
                    ['Временной критерий', 'Недельный график', 'Скользящий посуточный график', entry.max],
                    el.select));

            it('Поле выбора "Временной критерий" - "Скользящий посуточный график"',
                async () => await dec.simpleText(el.select.getText,
                    ['Временной критерий', 'Скользящий посуточный график', entry.max],
                    'Скользящий посуточный график',
                    el.select));

            it('Отображение поля ввода "Дата начала смены"', async () => await dec.simple(el.input.input,
                ['Дата начала смены', '', entry.max],
                el.input));

            it('Поле выбор "Дата начала смены" - текущая дата', async () => {
                const date = new Date().toISOString().slice(0, 10);
                await dec.simpleText(el.input.getValue,
                    ['Дата начала смены', '', entry.max],
                    date,
                    el.input)
            });

            it('Отображение календаря', async () => {
                await dec.simple(el.input.handler,
                    ['Дата начала смены', '', entry.max],
                    el.input);

                await dec.simple(el.input.handler,
                    ['Дата начала смены', '', entry.max],
                    el.input);

                await dec.simple(el.datepicker.datepicker,
                    [entry.max],
                    el.datepicker);
            });

            it('Отображение кнопки "Редактировать" - не активна', async () => await dec.simple(el.button.button,
                ['Редактировать', entry.max],
                el.button));

            it('Отображение кнопки "Добавить" - активна', async () => await dec.simple(el.butIcBefore.active,
                [but.add, entry.max],
                el.button));

            it('Отображение кнопки "Удалить" - не активна', async () => await dec.simple(el.butIcBefore.disabled,
                [but.delete, entry.max],
                el.button))
        });

        describe('Модальное окно выбора временных зон', () => {

            it('Нажатие кнопки "Добавить"', async () => await dec.simple(el.butIcBefore.handler,
                [but.add, entry.max],
                el.butIcBefore));

            it('Отображение модального окна выбора временной зоны',
                async () => await dec.simple(el.modal.timeZoneModalSelect.init,
                    [entry.max],
                    el.modal.timeZoneModalSelect));

            it('Отображение интервала "Никода"',
                async () => await dec.simpleText(el.modal.timeZoneModalSelect.intervalName,
                    [1, entry.max],
                    'Никогда',
                    el.modal.timeZoneModalSelect));

            it('Отобарежение интервала "Всегда"',
                async () => await dec.simpleText(el.modal.timeZoneModalSelect.intervalName,
                    [2, entry.max],
                    'Всегда',
                    el.modal.timeZoneModalSelect));

            it('Отображение кнопки "Отмена"',
                async () => await dec.simple(el.modal.timeZoneModalSelect.buttonActive,
                    ['Отмена', entry.max],
                    el.modal.timeZoneModalSelect));

            it('Отображение кнопки "Применить"',
                async () => await dec.simple(el.modal.timeZoneModalSelect.buttonDisabled,
                    ['Применить', entry.max],
                    el.modal.timeZoneModalSelect));

            it('Отображение кнопки закрытия', async () => await dec.simple(el.modal.timeZoneModalSelect.close,
                [entry.max],
                el.modal.timeZoneModalSelect));

            it('Нажатие кнопки "Отмена"', async () => await dec.simple(el.modal.timeZoneModalSelect.buttonHandler,
                ['Отмена', entry.max],
                el.modal.timeZoneModalSelect));

            it('Отсутствие модального окна выбора временной зоны',
                async () => await dec.simple(el.modal.timeZoneModalSelect.initClose,
                    [entry.max],
                    el.modal.timeZoneModalSelect));

            it('Нажатие кнопки "Добавить"', async () => await dec.simple(el.butIcBefore.handler,
                [but.add, entry.max],
                el.butIcBefore));

            it('Отображение модального окна выбора временной зоны',
                async () => await dec.simple(el.modal.timeZoneModalSelect.init,
                    [entry.max],
                    el.modal.timeZoneModalSelect));

            it('Нажатие  кнопки закрытия', async () => await dec.simple(el.modal.timeZoneModalSelect.closeHandler,
                [entry.max],
                el.modal.timeZoneModalSelect));

            it('Отсутствие модального окна выбора временной зоны',
                async () => await dec.simple(el.modal.timeZoneModalSelect.initClose,
                    [entry.max],
                    el.modal.timeZoneModalSelect))
        })


    });

    describe('Отображение - "Скользящий понедельный график"', () => {

        it('Выбор значения "Скользящий понедельный график" в поле выбора "Временной критерий"',
            async () => await dec.simple(el.select.iconXpand,
                ['Временной критерий', 'Скользящий посуточный график', 'Скользящий понедельный график', entry.max],
                el.select));

        it('Поле выбора "Временной критерий" - "Скользящий понедельный график"',
            async () => await dec.simpleText(el.select.getText,
                ['Временной критерий', 'Скользящий понедельный график', entry.max],
                'Скользящий понедельный график',
                el.select));

        it('Отображение поля ввода "Дата начала смены"', async () => await dec.simple(el.input.input,
            ['Дата начала смены', '', entry.max],
            el.input));

        it('Поле выбор "Дата начала смены" - текущая дата', async () => {
            const date = new Date().toISOString().slice(0, 10);
            await dec.simpleText(el.input.getValue,
                ['Дата начала смены', '', entry.max],
                date,
                el.input)
        });

        it('Отображение календаря', async () => {
            await dec.simple(el.input.handler,
                ['Дата начала смены', '', entry.max],
                el.input);

            await dec.simple(el.datepicker.datepicker,
                [entry.max],
                el.datepicker);
        });

        it('Отображениер поля ввода "Поиск..."', async () => await dec.simple(el.input.input,
            ['', 'Поиск...', entry.max],
            el.input));

        it('Отображение "Необходимо выбрать тип временного критерия доступа"', async () => await dec.simpleText(
            el.placeText.getText,
            [entry.max],
            'Пустой список',
            el.placeText))

    })


});

// Добавление временных критериев
const add = () => {

    // Временные зоны
    // Минимальное количество параметров - с минимальным отрезком времени.
    const TZMinParamsMinInterval = () =>
        describe('Временные зоны. Добавление. Минимальное количество параметров - с минимальным отрезком времени',
            () => {

            const params = {
                name: 'TimeZoneMinParamsMinInterval',
                start: '00:00',
                end: '00:30',
            };

            describe('Добавление', () => {

                bef();
                aft();

                it('Нажатие кнопки "Добавить"', async () => await dec.simple(el.butIcBefore.handler,
                    [but.add, entry.max],
                    el.butIcBefore));

                it('Отображение "title", "url"',
                    async () => await dec.simple(page.accessTemplateScheduleChangePage.initAdd,
                        [entry.max],
                        page.accessTemplateScheduleChangePage));

                it('Ввода "Название"', async () => await dec.simple(el.input.sendKeys,
                    ['Название', '', params.name, entry.max],
                    el.input));

                it('Выбор значения "Временные зоны" в поле выбора "Временной критерий"',
                    async () => await dec.simple(el.select.iconXpand,
                        ['Временной критерий', '', 'Временные зоны', entry.max],
                        el.select));

                it('Добавление произвольного временного блока',
                    async () => await dec.simple(page.accessTemplateScheduleChangePage.addInterval,
                        [1, entry.max],
                        page.accessTemplateScheduleChangePage));

                it('Отображение временного блока', async () =>
                    await dec.simple(page.accessTemplateScheduleChangePage.time,
                        [1, 1, entry.max],
                        page.accessTemplateScheduleChangePage));

                it('Ввод начала временного блока',
                    async () => await dec.simple(page.accessTemplateScheduleChangePage.startTimeSendKeys,
                        [1, 1, params.start, entry.max],
                        page.accessTemplateScheduleChangePage));

                it('Ввод окончания временного блока',
                    async () => await dec.simple(page.accessTemplateScheduleChangePage.endTimeSendKeys,
                        [1, 1, params.end, entry.max],
                        page.accessTemplateScheduleChangePage));

                it('Нажатие кнопки "Сохранить изменения"', async () => await dec.simple(el.button.handler,
                    ['Сохранить изменения', entry.max],
                    el.button));

                it('Отображение уведомления "Сохранено успешно"', async () => await dec.simple(el.success.success,
                    ['Сохранено успешно', entry.max],
                    el.success));
            });

            checkTable(params.name, '', 'Временные зоны');

            describe('Проверка параметров', () => {

                bef();
                aft();

                it('Ввод в "Поиск..."', async () => await dec.simple(el.input.sendKeys,
                    ['', 'Поиск...', params.name, entry.max],
                    el.input));

                it('Отображение в таблице одной строки', async () => await dec.simple(el.table.singleSize,
                    [entry.max],
                    el.table));

                it('Нажатие по первой строке таблицы', async () => await dec.simple(el.table.strHandler,
                    [1, entry.max],
                    el.table));

                it('Нажатие кнопки "Редактировать"', async () => await dec.simple(el.butIcBefore.handler,
                    [but.edit, entry.max],
                    el.butIcBefore));

                it('Отображение "title", "url"',
                    async () => await dec.simple(page.accessTemplateScheduleChangePage.initEdit,
                        [entry.max],
                        page.accessTemplateScheduleChangePage));

                it('Проверка "Название"', async () => await dec.simpleText(el.input.getValue,
                    ['Название', '', entry.max],
                    params.name,
                    el.input));

                it('Проверка "Описание"', async () => await dec.simpleText(el.input.getValue,
                    ['Описание', '', entry.max],
                    '',
                    el.input));

                it('Проверка "Временной критерий"', async () => await dec.simpleText(el.select.getText,
                    ['Временной критерий', 'Временные зоны', entry.max],
                    'Временные зоны',
                    el.input));

                it('Отображение временного блока',
                    async () => await dec.simple(page.accessTemplateScheduleChangePage.time,
                        [1, 1, entry.max],
                        page.accessTemplateScheduleChangePage));

                it('Начало временного блока',
                    async () => await dec.simpleText(page.accessTemplateScheduleChangePage.startTimeGetValue,
                        [1, 1, entry.max],
                        params.start,
                        page.accessTemplateScheduleChangePage));

                it('Окончание временного блока',
                    async () => await dec.simpleText(page.accessTemplateScheduleChangePage.endTimeGetValue,
                        [1, 1, entry.max],
                        params.end,
                        page.accessTemplateScheduleChangePage));
            });

            deleteParams();
        });

    // Минимальное количество параметров — с  максимальным отрезком времени
    const TZMinParamsMaxInterval = () =>
        describe('Временные зоны. Добавление. Минимальное количество параметров - с максимальным отрезком времени',
            () => {

            const params = {
                name: 'TZMinParamsMaxInterval',
                start: '00:00',
                end: '23:59',
            };

            describe('Добавление', () => {

                bef();
                aft();

                it('Нажатие кнопки "Добавить"', async () => await dec.simple(el.butIcBefore.handler,
                    [but.add, entry.max],
                    el.butIcBefore));

                it('Отображение "title", "url"',
                    async () => await dec.simple(page.accessTemplateScheduleChangePage.initAdd,
                        [entry.max],
                        page.accessTemplateScheduleChangePage));

                it('Ввода "Название"', async () => await dec.simple(el.input.sendKeys,
                    ['Название', '', params.name, entry.max],
                    el.input));

                it('Выбор значения "Временные зоны" в поле выбора "Временной критерий"',
                    async () => await dec.simple(el.select.iconXpand,
                        ['Временной критерий', '', 'Временные зоны', entry.max],
                        el.select));

                it('Добавление произвольного временного блока',
                    async () => await dec.simple(page.accessTemplateScheduleChangePage.addInterval,
                        [1, entry.max],
                        page.accessTemplateScheduleChangePage));

                it('Отображение произвольного временного блока', async () => await dec.simple(page.accessTemplateScheduleChangePage.time,
                    [1, 1, entry.max],
                    page.accessTemplateScheduleChangePage));

                it('Ввод начала временного блока',
                    async () => await dec.simple(page.accessTemplateScheduleChangePage.startTimeSendKeys,
                        [1, 1, params.start, entry.max],
                        page.accessTemplateScheduleChangePage));

                it('Ввод окончания временного блока',
                    async () => await dec.simple(page.accessTemplateScheduleChangePage.endTimeSendKeys,
                        [1, 1, params.end, entry.max],
                        page.accessTemplateScheduleChangePage));

                it('Нажатие кнопки "Сохранить изменения"', async () => await dec.simple(el.button.handler,
                    ['Сохранить изменения', entry.max],
                    el.button));

                it('Отображение уведомления "Сохранено успешно"', async () => await dec.simple(el.success.success,
                    ['Сохранено успешно', entry.max],
                    el.success))
            });

            checkTable(params.name, '', 'Временные зоны');

            describe('Проверка параметров', () => {

                bef();
                aft();

                it('Ввод в "Поиск..."', async () => await dec.simple(el.input.sendKeys,
                    ['', 'Поиск...', params.name, entry.max],
                    el.input));

                it('Отображение в таблице одной строки', async () => await dec.simple(el.table.singleSize,
                    [entry.max],
                    el.table));

                it('Нажатие по первой строке таблицы', async () => await dec.simple(el.table.strHandler,
                    [1, entry.max],
                    el.table));

                it('Нажатие кнопки "Редактировать"', async () => await dec.simple(el.butIcBefore.handler,
                    [but.edit, entry.max],
                    el.butIcBefore));

                it('Отображение "title", "url"',
                    async () => await dec.simple(page.accessTemplateScheduleChangePage.initEdit,
                        [entry.max],
                        page.accessTemplateScheduleChangePage));

                it('Проверка "Название"', async () => await dec.simpleText(el.input.getValue,
                    ['Название', '', entry.max],
                    params.name,
                    el.input));

                it('Проверка "Описание"', async () => await dec.simpleText(el.input.getValue,
                    ['Описание', '', entry.max],
                    '',
                    el.input));

                it('Проверка "Временной критерий"', async () => await dec.simpleText(el.select.getText,
                    ['Временной критерий', 'Временные зоны', entry.max],
                    'Временные зоны',
                    el.input));

                it('Отображение интервала', async () => await dec.simple(page.accessTemplateScheduleChangePage.interval,
                    [1, entry.max],
                    page.accessTemplateScheduleChangePage));

                it('Отображение временного блока', async () => await dec.simple(page.accessTemplateScheduleChangePage.time,
                    [1, 1, entry.max],
                    page.accessTemplateScheduleChangePage));

                it('Начало временного блока',
                    async () => await dec.simpleText(page.accessTemplateScheduleChangePage.startTimeGetValue,
                        [1, 1, entry.max],
                        params.start,
                        page.accessTemplateScheduleChangePage));

                it('Окончание временного блока',
                    async () => await dec.simpleText(page.accessTemplateScheduleChangePage.endTimeGetValue,
                        [1, 1, entry.max],
                        params.end,
                        page.accessTemplateScheduleChangePage));
            });

            deleteParams();
        });

    // Максимальное количество параметров — с максимальным отрезком времени
    const TZMaxParamsMaxInterval = () => describe('Временные зоны. Добавление. ' +
        'Максимальное количество параметров — с максимальным максимальным количеством отрезков времени',
        () => {

        const params = {
                name: 'TZMaxParamsMaxIntervalName',
                description: 'TZMaxParamsMaxIntervalDescription',
                interval_1: {
                    start: '00:00',
                    end: '05:59',
                },
                interval_2: {
                    start: '06:00',
                    end: '11:59',
                },
                interval_3: {
                    start: '17:00',
                    end: '23:59',
                },
                interval_4: {
                    start: '12:00',
                    end: '16:59',
                },
            };

        describe('Добавление', () => {

            bef();
            aft();

            it('Нажатие кнопки "Добавить"', async () => await dec.simple(el.butIcBefore.handler,
                [but.add, entry.max],
                el.butIcBefore));

            it('Отображение "title", "url"',
                async () => await dec.simple(page.accessTemplateScheduleChangePage.initAdd,
                    [entry.max],
                    page.accessTemplateScheduleChangePage));

            it('Ввода "Название"', async () => await dec.simple(el.input.sendKeys,
                ['Название', '', params.name, entry.max],
                el.input));

            it('Ввода "Описание"', async () => await dec.simple(el.input.sendKeys,
                ['Описание', '', params.description, entry.max],
                el.input));

            it('Выбор значения "Временные зоны" в поле выбора "Временной критерий"',
                async () => await dec.simple(el.select.iconXpand,
                    ['Временной критерий', '', 'Временные зоны', entry.max],
                    el.select));

            it('Добавление 1 произвольного временного блока',
                async () => await dec.simple(page.accessTemplateScheduleChangePage.addInterval,
                    [1, entry.max],
                    page.accessTemplateScheduleChangePage));

            it('Отображение 1 произвольного временного блока', async () => await dec.simple(page.accessTemplateScheduleChangePage.time,
                [1, 1, entry.max],
                page.accessTemplateScheduleChangePage));

            it('Ввод начала 1 временного блока',
                async () => await dec.simple(page.accessTemplateScheduleChangePage.startTimeSendKeys,
                    [1, 1, params.interval_1.start, entry.max],
                    page.accessTemplateScheduleChangePage));

            it('Ввод окончания 1 временного блока',
                async () => await dec.simple(page.accessTemplateScheduleChangePage.endTimeSendKeys,
                    [1, 1, params.interval_1.end, entry.max],
                    page.accessTemplateScheduleChangePage));

            it('Добавление 2 временного блока',
                async () => await dec.simple(page.accessTemplateScheduleChangePage.addInterval,
                    [1, entry.max],
                    page.accessTemplateScheduleChangePage));

            it('Отображение 2 произвольного временного блока',
                async () => await dec.simple(page.accessTemplateScheduleChangePage.time,
                    [1, 2, entry.max],
                    page.accessTemplateScheduleChangePage));

            it('Ввод начала 2 временного блока',
                async () => await dec.simple(page.accessTemplateScheduleChangePage.startTimeSendKeys,
                    [1, 2, params.interval_2.start, entry.max],
                    page.accessTemplateScheduleChangePage));

            it('Ввод окончания 2 временного блока',
                async () => await dec.simple(page.accessTemplateScheduleChangePage.endTimeSendKeys,
                    [1, 2, params.interval_2.end, entry.max],
                    page.accessTemplateScheduleChangePage));

            it('Добавление 3 временного блока',
                async () => await dec.simple(page.accessTemplateScheduleChangePage.addInterval,
                    [1, entry.max],
                    page.accessTemplateScheduleChangePage));

            it('Отображение 3 произвольного временного блока', async () => await dec.simple(page.accessTemplateScheduleChangePage.time,
                [1, 3, entry.max],
                page.accessTemplateScheduleChangePage));

            it('Ввод окончания 3 временного блока',
                async () => await dec.simple(page.accessTemplateScheduleChangePage.endTimeSendKeys,
                    [1, 3, params.interval_3.end, entry.max],
                    page.accessTemplateScheduleChangePage));

            it('Ввод начала 3 временного блока',
                async () => await dec.simple(page.accessTemplateScheduleChangePage.startTimeSendKeys,
                    [1, 3, params.interval_3.start, entry.max],
                    page.accessTemplateScheduleChangePage));

            it('Добавление 4 временного блока',
                async () => await dec.simple(page.accessTemplateScheduleChangePage.addInterval,
                    [1, entry.max],
                    page.accessTemplateScheduleChangePage));

            it('Отображение 4 произвольного временного блока', async () => await dec.simple(page.accessTemplateScheduleChangePage.time,
                [1, 3, entry.max],
                page.accessTemplateScheduleChangePage));

            it('Ввод начала 4 временного блока',
                async () => await dec.simple(page.accessTemplateScheduleChangePage.startTimeSendKeys,
                    [1, 3, params.interval_4.start, entry.max],
                    page.accessTemplateScheduleChangePage));

            it('Ввод окончания 4 временного блока',
                async () => await dec.simple(page.accessTemplateScheduleChangePage.endTimeSendKeys,
                    [1, 3, params.interval_4.end, entry.max],
                    page.accessTemplateScheduleChangePage));

            it('Нажатие кнопки "Сохранить изменения"', async () => await dec.simple(el.button.handler,
                ['Сохранить изменения', entry.max],
                el.button));

            it('Отображение уведомления "Сохранено успешно"', async () => await dec.simple(el.success.success,
                ['Сохранено успешно', entry.max],
                el.success));
        });

        checkTable(params.name, params.description, 'Временные зоны');

        describe('Проверка параметров', () => {

            bef();
            aft();

            it('Ввод в "Поиск..."', async () => await dec.simple(el.input.sendKeys,
                ['', 'Поиск...', params.name, entry.max],
                el.input));

            it('Отображение в таблице одной строки', async () => await dec.simple(el.table.singleSize,
                [entry.max],
                el.table));

            it('Нажатие по первой строке таблицы', async () => await dec.simple(el.table.strHandler,
                [1, entry.max],
                el.table));

            it('Нажатие кнопки "Редактировать"', async () => await dec.simple(el.butIcBefore.handler,
                [but.edit, entry.max],
                el.butIcBefore));

            it('Отображение "title", "url"',
                async () => await dec.simple(page.accessTemplateScheduleChangePage.initEdit,
                    [entry.max],
                    page.accessTemplateScheduleChangePage));

            it('Проверка "Название"', async () => await dec.simpleText(el.input.getValue,
                ['Название', '', entry.max],
                params.name,
                el.input));

            it('Проверка "Описание"', async () => await dec.simpleText(el.input.getValue,
                ['Описание', '', entry.max],
                params.description,
                el.input));

            it('Проверка "Временной критерий"', async () => await dec.simpleText(el.select.getText,
                ['Временной критерий', 'Временные зоны', entry.max],
                'Временные зоны',
                el.input));

            it('Отображение интервала', async () => await dec.simple(page.accessTemplateScheduleChangePage.interval,
                [1, entry.max],
                page.accessTemplateScheduleChangePage));

            it('Отображение 1 временного блока',async () => await dec.simple(page.accessTemplateScheduleChangePage.time,
                [1, 1, entry.max],
                page.accessTemplateScheduleChangePage));

            it('Начало 1 временного блока',
                async () => await dec.simpleText(page.accessTemplateScheduleChangePage.startTimeGetValue,
                    [1, 1, entry.max],
                    params.interval_1.start,
                    page.accessTemplateScheduleChangePage));

            it('Окончание 1 временного блока',
                async () => await dec.simpleText(page.accessTemplateScheduleChangePage.endTimeGetValue,
                    [1, 1, entry.max],
                    params.interval_1.end,
                    page.accessTemplateScheduleChangePage));

            it('Отображение 2 временного блока',async () => await dec.simple(page.accessTemplateScheduleChangePage.time,
                [1, 2, entry.max],
                page.accessTemplateScheduleChangePage));

            it('Начало 2 временного блока',
                async () => await dec.simpleText(page.accessTemplateScheduleChangePage.startTimeGetValue,
                    [1, 2, entry.max],
                    params.interval_2.start,
                    page.accessTemplateScheduleChangePage));

            it('Окончание 2 временного блока',
                async () => await dec.simpleText(page.accessTemplateScheduleChangePage.endTimeGetValue,
                    [1, 2, entry.max],
                    params.interval_2.end,
                    page.accessTemplateScheduleChangePage));

            it('Отображение 3 временного блока',async () => await dec.simple(page.accessTemplateScheduleChangePage.time,
                [1, 3, entry.max],
                page.accessTemplateScheduleChangePage));

            it('Начало 3 временного блока',
                async () => await dec.simpleText(page.accessTemplateScheduleChangePage.startTimeGetValue,
                    [1, 3, entry.max],
                    params.interval_4.start,
                    page.accessTemplateScheduleChangePage));

            it('Окончание 3 временного блока',
                async () => await dec.simpleText(page.accessTemplateScheduleChangePage.endTimeGetValue,
                    [1, 3, entry.max],
                    params.interval_4.end,
                    page.accessTemplateScheduleChangePage));

            it('Отображение 4 временного блока',async () => await dec.simple(page.accessTemplateScheduleChangePage.time,
                [1, 4, entry.max],
                page.accessTemplateScheduleChangePage));

            it('Начало 4 временного блока',
                async () => await dec.simpleText(page.accessTemplateScheduleChangePage.startTimeGetValue,
                    [1, 4, entry.max],
                    params.interval_3.start,
                    page.accessTemplateScheduleChangePage));

            it('Окончание 4 временного блока',
                async () => await dec.simpleText(page.accessTemplateScheduleChangePage.endTimeGetValue,
                    [1, 4, entry.max],
                    params.interval_3.end,
                    page.accessTemplateScheduleChangePage));
        });

        deleteParams();
    });

    // Минимальное количество отрезков времени — попытка создания отрезка с временем меньше чем минимальное
    const TZFailedTimeMinInterval = () =>
        describe('Временные зоны. Добавление. Минимальное количество отрезков времени — попытка создания отрезка ' +
            'с временем меньше чем минимальное',
            () => {

            const params = {
                    name: 'TZFailedMinInterval',
                    start: '00:00',
                    end: '00:29',
                    error: 'Интервал не может быть меньше 30 минут'
                };

            describe('Добавление', () => {

                bef();
                aft();

                it('Нажатие кнопки "Добавить"', async () => await dec.simple(el.butIcBefore.handler,
                    [but.add, entry.max],
                    el.butIcBefore));

                it('Отображение "title", "url"',
                    async () => await dec.simple(page.accessTemplateScheduleChangePage.initAdd,
                        [entry.max],
                        page.accessTemplateScheduleChangePage));

                it('Ввода "Название"', async () => await dec.simple(el.input.sendKeys,
                    ['Название', '', params.name, entry.max],
                    el.input));

                it('Выбор значения "Временные зоны" в поле выбора "Временной критерий"',
                    async () => await dec.simple(el.select.iconXpand,
                        ['Временной критерий', '', 'Временные зоны', entry.max],
                        el.select));

                it('Добавление произвольного временного блока',
                    async () => await dec.simple(page.accessTemplateScheduleChangePage.addInterval,
                        [1, entry.max],
                        page.accessTemplateScheduleChangePage));

                it('Отображение временного блока', async () => await dec.simple(page.accessTemplateScheduleChangePage.time,
                    [1, 1, entry.max],
                    page.accessTemplateScheduleChangePage));

                it('Ввод начала временного блока',
                    async () => await dec.simple(page.accessTemplateScheduleChangePage.startTimeSendKeys,
                        [1, 1, params.start, entry.max],
                        page.accessTemplateScheduleChangePage));

                it('Ввод окончания временного блока',
                    async () => await dec.simple(page.accessTemplateScheduleChangePage.endTimeSendKeys,
                        [1, 1, params.end, entry.max],
                        page.accessTemplateScheduleChangePage));

                it('Нажатие кнопки "Сохранить изменения"', async () => await dec.simple(el.button.handler,
                    ['Сохранить изменения', entry.max],
                    el.button));

                it('Отображение ошибки',
                    async () => await dec.simple(el.error.error,
                        [params.error, entry.max],
                        el.success));
            });

            describe('Проверка таблицы', () => {

                bef();
                aft();

                it('Ввод в "Поиск..."', async () => await dec.simple(el.input.sendKeys,
                    ['', 'Поиск...', params.name, entry.max],
                    el.input));

                it('Отображение в таблице 0 строк', async () => await dec.simple(el.table.noStr,
                    [entry.max],
                    el.table));

                it('Отображение "Нет данных для отображения."', async () => await dec.simpleText(el.rowEmpty.getText,
                    [entry.max],
                    'Нет данных для отображения.',
                    el.table));
            });
        });

    // Максимальное количество отрезков времени — попытка создания отрезка с временем меньше чем минимальное
    const TZFailedTimeMaxInterval = () =>
        describe('Временные зоны. Добавление. Максимальное количество отрезков времени, попытка создания отрезка ' +
            'с временем меньше чем минимальное', () => {

            const params = {
                    name: 'TZFailedTimeMaxInterval',
                    interval_1: {
                        start: '00:00',
                        end: '00:30',
                    },
                    interval_2: {
                        start: '01:00',
                        end: '01:29',
                    },
                    interval_3: {
                        start: '02:00',
                        end: '02:31',
                    },
                    interval_4: {
                        start: '03:00',
                        end: '03:29',
                    },
                    error: 'Интервал не может быть меньше 30 минут',
                };

            describe('Добавление', () => {

                bef();
                aft();

                it('Нажатие кнопки "Добавить"', async () => await dec.simple(el.butIcBefore.handler,
                    [but.add, entry.max],
                    el.butIcBefore));

                it('Отображение "title", "url"',
                    async () => await dec.simple(page.accessTemplateScheduleChangePage.initAdd,
                        [entry.max],
                        page.accessTemplateScheduleChangePage));

                it('Ввода "Название"', async () => await dec.simple(el.input.sendKeys,
                    ['Название', '', params.name, entry.max],
                    el.input));

                it('Выбор значения "Временные зоны" в поле выбора "Временной критерий"',
                    async () => await dec.simple(el.select.iconXpand,
                        ['Временной критерий', '', 'Временные зоны', entry.max],
                        el.select));

                it('Добавление 1 произвольного временного блока',
                    async () => await dec.simple(page.accessTemplateScheduleChangePage.addInterval,
                        [1, entry.max],
                        page.accessTemplateScheduleChangePage));

                it('Отображение 1 произвольного временного блока', async () => await dec.simple(page.accessTemplateScheduleChangePage.time,
                    [1, 1, entry.max],
                    page.accessTemplateScheduleChangePage));

                it('Ввод начала 1 временного блока',
                    async () => await dec.simple(page.accessTemplateScheduleChangePage.startTimeSendKeys,
                        [1, 1, params.interval_1.start, entry.max],
                        page.accessTemplateScheduleChangePage));

                it('Ввод окончания 1 временного блока',
                    async () => await dec.simple(page.accessTemplateScheduleChangePage.endTimeSendKeys,
                        [1, 1, params.interval_1.end, entry.max],
                        page.accessTemplateScheduleChangePage));

                it('Добавление 2 временного блока',
                    async () => await dec.simple(page.accessTemplateScheduleChangePage.addInterval,
                        [1, entry.max],
                        page.accessTemplateScheduleChangePage));

                it('Отображение 2 произвольного временного блока',
                    async () => await dec.simple(page.accessTemplateScheduleChangePage.time,
                        [1, 2, entry.max],
                        page.accessTemplateScheduleChangePage));

                it('Ввод начала 2 временного блока',
                    async () => await dec.simple(page.accessTemplateScheduleChangePage.startTimeSendKeys,
                        [1, 2, params.interval_2.start, entry.max],
                        page.accessTemplateScheduleChangePage));

                it('Ввод окончания 2 временного блока',
                    async () => await dec.simple(page.accessTemplateScheduleChangePage.endTimeSendKeys,
                        [1, 2, params.interval_2.end, entry.max],
                        page.accessTemplateScheduleChangePage));

                it('Добавление 3 временного блока',
                    async () => await dec.simple(page.accessTemplateScheduleChangePage.addInterval,
                        [1, entry.max],
                        page.accessTemplateScheduleChangePage));

                it('Отображение 3 произвольного временного блока', async () => await dec.simple(page.accessTemplateScheduleChangePage.time,
                    [1, 3, entry.max],
                    page.accessTemplateScheduleChangePage));

                it('Ввод начала 3 временного блока',
                    async () => await dec.simple(page.accessTemplateScheduleChangePage.startTimeSendKeys,
                        [1, 3, params.interval_3.start, entry.max],
                        page.accessTemplateScheduleChangePage));

                it('Ввод окончания 3 временного блока',
                    async () => await dec.simple(page.accessTemplateScheduleChangePage.endTimeSendKeys,
                        [1, 3, params.interval_3.end, entry.max],
                        page.accessTemplateScheduleChangePage));

                it('Добавление 4 временного блока',
                    async () => await dec.simple(page.accessTemplateScheduleChangePage.addInterval,
                        [1, entry.max],
                        page.accessTemplateScheduleChangePage));

                it('Отображение 4 произвольного временного блока', async () => await dec.simple(page.accessTemplateScheduleChangePage.time,
                    [1, 4, entry.max],
                    page.accessTemplateScheduleChangePage));

                it('Ввод начала 4 временного блока',
                    async () => await dec.simple(page.accessTemplateScheduleChangePage.startTimeSendKeys,
                        [1, 4, params.interval_4.start, entry.max],
                        page.accessTemplateScheduleChangePage));

                it('Ввод окончания 4 временного блока',
                    async () => await dec.simple(page.accessTemplateScheduleChangePage.endTimeSendKeys,
                        [1, 4, params.interval_4.end, entry.max],
                        page.accessTemplateScheduleChangePage));

                it('Нажатие кнопки "Сохранить изменения"', async () => await dec.simple(el.button.handler,
                    ['Сохранить изменения', entry.max],
                    el.button));

                it('Отображение ошибки', async () => await dec.simple(el.error.error,
                    [params.error, entry.max],
                    el.error));
            });

            checkFalseTable(params.name);
        });

    // Попытка создания создания отрезка с временем больше, чем максимальное
    const TZMaxTimeFailed = () =>
        describe('Временные зоны. Добавление. Попытка создания создания отрезка с временем больше, чем максимальное',
            () => {

            const params = {
                name: 'TZMaxTimeFailed',
                end: '24:00',
            };

            describe('Выполнение теста', () => {

                bef();
                aft();

                it('Нажатие кнопки "Добавить"', async () => await dec.simple(el.butIcBefore.handler,
                    [but.add, entry.max],
                    el.butIcBefore));

                it('Отображение "title", "url"',
                    async () => await dec.simple(page.accessTemplateScheduleChangePage.initAdd,
                        [entry.max],
                        page.accessTemplateScheduleChangePage));

                it('Ввода "Название"', async () => await dec.simple(el.input.sendKeys,
                    ['Название', '', params.name, entry.max],
                    el.input));

                it('Выбор значения "Временные зоны" в поле выбора "Временной критерий"',
                    async () => await dec.simple(el.select.iconXpand,
                        ['Временной критерий', '', 'Временные зоны', entry.max],
                        el.select));

                it('Добавление произвольного временного блока',
                    async () => await dec.simple(page.accessTemplateScheduleChangePage.addInterval,
                        [1, entry.max],
                        page.accessTemplateScheduleChangePage));

                it('Изменения времени окончания', async () =>
                    await dec.simple(page.accessTemplateScheduleChangePage.endTimeSendKeys,
                        [1, 1, params.end, entry.max],
                        page.accessTemplateScheduleChangePage));

                it('Время не изменилось',
                    async () => await dec.simpleNotText(page.accessTemplateScheduleChangePage.endTimeGetValue,
                        [1, 1, entry.max],
                        params.end,
                        page.accessTemplateScheduleChangePage))
            });

        });

    // Попытка создания больше максимального количества отрезков времени
    const TZMaxIntervalFailed = () =>
        describe('Временные зоны. Добавление. Попытка создания больше максимального количества отрезков времени',
            () => {

            const params = {
                name: 'TZFailedTimeMaxInterval',
                interval_1: {
                    start: '00:00',
                    end: '00:30',
                },
                interval_2: {
                    start: '01:00',
                    end: '01:30',
                },
                interval_3: {
                    start: '02:00',
                    end: '02:30',
                },
                interval_4: {
                    start: '03:00',
                    end: '03:30',
                },
                interval_5: {
                    start: '04:00',
                    end: '04:30',
                },
                error: 'В поле items превышено количество элементов, максимально допустимое количество 4' +
                    'Лишнее поле items.type при передаче данных' +
                    'Лишнее поле items.type при передаче данных' +
                    'Лишнее поле items.type при передаче данных' +
                    'Лишнее поле items.type при передаче данных' +
                    'Лишнее поле items.type при передаче данных'
            };

            describe('Добавление', () => {

                bef();
                aft();

                it('Нажатие кнопки "Добавить"', async () => await dec.simple(el.butIcBefore.handler,
                    [but.add, entry.max],
                    el.butIcBefore));

                it('Отображение "title", "url"',
                    async () => await dec.simple(page.accessTemplateScheduleChangePage.initAdd,
                        [entry.max],
                        page.accessTemplateScheduleChangePage));

                it('Ввода "Название"', async () => await dec.simple(el.input.sendKeys,
                    ['Название', '', params.name, entry.max],
                    el.input));

                it('Выбор значения "Временные зоны" в поле выбора "Временной критерий"',
                    async () => await dec.simple(el.select.iconXpand,
                        ['Временной критерий', '', 'Временные зоны', entry.max],
                        el.select));

                it('Добавление 1 произвольного временного блока',
                    async () => await dec.simple(page.accessTemplateScheduleChangePage.addInterval,
                        [1, entry.max],
                        page.accessTemplateScheduleChangePage));

                it('Отображение 1 произвольного временного блока', async () => await dec.simple(page.accessTemplateScheduleChangePage.time,
                    [1, 1, entry.max],
                    page.accessTemplateScheduleChangePage));

                it('Ввод начала 1 временного блока',
                    async () => await dec.simple(page.accessTemplateScheduleChangePage.startTimeSendKeys,
                        [1, 1, params.interval_1.start, entry.max],
                        page.accessTemplateScheduleChangePage));

                it('Ввод окончания 1 временного блока',
                    async () => await dec.simple(page.accessTemplateScheduleChangePage.endTimeSendKeys,
                        [1, 1, params.interval_1.end, entry.max],
                        page.accessTemplateScheduleChangePage));

                it('Добавление 2 временного блока',
                    async () => await dec.simple(page.accessTemplateScheduleChangePage.addInterval,
                        [1, entry.max],
                        page.accessTemplateScheduleChangePage));

                it('Отображение 2 произвольного временного блока',
                    async () => await dec.simple(page.accessTemplateScheduleChangePage.time,
                        [1, 2, entry.max],
                        page.accessTemplateScheduleChangePage));

                it('Ввод начала 2 временного блока',
                    async () => await dec.simple(page.accessTemplateScheduleChangePage.startTimeSendKeys,
                        [1, 2, params.interval_2.start, entry.max],
                        page.accessTemplateScheduleChangePage));

                it('Ввод окончания 2 временного блока',
                    async () => await dec.simple(page.accessTemplateScheduleChangePage.endTimeSendKeys,
                        [1, 2, params.interval_2.end, entry.max],
                        page.accessTemplateScheduleChangePage));

                it('Добавление 3 временного блока',
                    async () => await dec.simple(page.accessTemplateScheduleChangePage.addInterval,
                        [1, entry.max],
                        page.accessTemplateScheduleChangePage));

                it('Отображение 3 произвольного временного блока', async () => await dec.simple(page.accessTemplateScheduleChangePage.time,
                    [1, 3, entry.max],
                    page.accessTemplateScheduleChangePage));

                it('Ввод начала 3 временного блока',
                    async () => await dec.simple(page.accessTemplateScheduleChangePage.startTimeSendKeys,
                        [1, 3, params.interval_3.start, entry.max],
                        page.accessTemplateScheduleChangePage));

                it('Ввод окончания 3 временного блока',
                    async () => await dec.simple(page.accessTemplateScheduleChangePage.endTimeSendKeys,
                        [1, 3, params.interval_3.end, entry.max],
                        page.accessTemplateScheduleChangePage));

                it('Добавление 4 временного блока',
                    async () => await dec.simple(page.accessTemplateScheduleChangePage.addInterval,
                        [1, entry.max],
                        page.accessTemplateScheduleChangePage));

                it('Отображение 4 произвольного временного блока', async () => await dec.simple(page.accessTemplateScheduleChangePage.time,
                    [1, 4, entry.max],
                    page.accessTemplateScheduleChangePage));

                it('Ввод начала 4 временного блока',
                    async () => await dec.simple(page.accessTemplateScheduleChangePage.startTimeSendKeys,
                        [1, 4, params.interval_4.start, entry.max],
                        page.accessTemplateScheduleChangePage));

                it('Ввод окончания 4 временного блока',
                    async () => await dec.simple(page.accessTemplateScheduleChangePage.endTimeSendKeys,
                        [1, 4, params.interval_4.end, entry.max],
                        page.accessTemplateScheduleChangePage));

                it('Добавление 5 временного блока',
                    async () => await dec.simple(page.accessTemplateScheduleChangePage.addInterval,
                        [1, entry.max],
                        page.accessTemplateScheduleChangePage));

                it('Отображение 5 произвольного временного блока', async () => await dec.simple(page.accessTemplateScheduleChangePage.time,
                    [1, 5, entry.max],
                    page.accessTemplateScheduleChangePage));

                it('Ввод начала 5 временного блока',
                    async () => await dec.simple(page.accessTemplateScheduleChangePage.startTimeSendKeys,
                        [1, 5, params.interval_5.start, entry.max],
                        page.accessTemplateScheduleChangePage));

                it('Ввод окончания 5 временного блока',
                    async () => await dec.simple(page.accessTemplateScheduleChangePage.endTimeSendKeys,
                        [1, 5, params.interval_5.end, entry.max],
                        page.accessTemplateScheduleChangePage));

                it('Нажатие кнопки "Сохранить изменения"', async () => await dec.simple(el.button.handler,
                    ['Сохранить изменения', entry.max],
                    el.button));

                it('Отображение ошибки', async () => await dec.simple(el.error.error,
                    [params.error, entry.max],
                    el.error));
            });

            checkFalseTable(params.name);
        });

    // Попытка создания без всех обязательных параметров
    const TZNoParams = () => describe('Временные зоны. Добавление. Попытка создания без всех обязательных параметров',
        () => {

        const params = {
            description: 'TZNoParams',
        };

        describe('Добавление', () => {

            bef();
            aft();

            it('Нажатие кнопки "Добавить"', async () => await dec.simple(el.butIcBefore.handler,
                [but.add, entry.max],
                el.butIcBefore));

            it('Отображение "title", "url"',
                async () => await dec.simple(page.accessTemplateScheduleChangePage.initAdd,
                    [entry.max],
                    page.accessTemplateScheduleChangePage));

            it('Ввода "Описание"', async () => await dec.simple(el.input.sendKeys,
                ['Описание', '', params.description, entry.max],
                el.input));

            it('Выбор значения "Временные зоны" в поле выбора "Временной критерий"',
                async () => await dec.simple(el.select.iconXpand,
                    ['Временной критерий', '', 'Временные зоны', entry.max],
                    el.select));

            it('Отображение интервала', async () => await dec.simple(page.accessTemplateScheduleChangePage.interval,
                [1, entry.max],
                page.accessTemplateScheduleChangePage));

            it('Кнопка "Сохранить изменения" - заблокирована', async () => await dec.simple(el.button.disabled,
                ['Сохранить изменения', entry.max],
                el.button));

            it('Нажатие кнопки "Сохранить изменения"', async () => await dec.simpleFalse(el.button.handlerNoActive,
                ['Сохранить изменения', entry.max],
                el.button));

            it('Отображение "title", "url" не изменилось',
                async () => await dec.simple(page.accessTemplateScheduleChangePage.initAdd,
                    [entry.max],
                    page.accessTemplateScheduleChangePage));
        });

        checkFalseTable(params.description);
    });

    // Попытка создания без настройки интервала
    const TZNoInterval = () => describe('Временные зоны. Добавление. Попытка создания без настройки интервала',
        () => {

        const params = {
            name: 'ZNoInterval',
            error: 'Заполните все обязательные поля'
        };

        describe('Добавление', () => {

            bef();
            aft();

            it('Нажатие кнопки "Добавить"', async () => await dec.simple(el.butIcBefore.handler,
                [but.add, entry.max],
                el.butIcBefore));

            it('Отображение "title", "url"',
                async () => await dec.simple(page.accessTemplateScheduleChangePage.initAdd,
                    [entry.max],
                    page.accessTemplateScheduleChangePage));

            it('Ввода "Название"', async () => await dec.simple(el.input.sendKeys,
                ['Название', '', params.name, entry.max],
                el.input));

            it('Выбор значения "Временные зоны" в поле выбора "Временной критерий"',
                async () => await dec.simple(el.select.iconXpand,
                    ['Временной критерий', '', 'Временные зоны', entry.max],
                    el.select));

            it('Нажатие кнопки "Сохранить изменения"', async () => await dec.simple(el.button.handler,
                ['Сохранить изменения', entry.max],
                el.button));

            it('Отображение ошибки', async () => await dec.simple(el.error.error,
                [params.error, entry.max],
                el.error));

        });

        checkFalseTable(params.name);
    });

    // Попытка создания без ввода "Название"
    const TZNoName = () => describe('Временные зоны. Добавление. Попытка создания без ввода "Название"', () => {

        const params = {
            start: '00:00',
            end: '01:00',
        };

        describe('Добавление', () => {

            bef();

            aft();

            it('Нажатие кнопки "Добавить"', async () => await dec.simple(el.butIcBefore.handler,
                [but.add, entry.max],
                el.butIcBefore));

            it('Отображение "title", "url"',
                async () => await dec.simple(page.accessTemplateScheduleChangePage.initAdd,
                    [entry.max],
                    page.accessTemplateScheduleChangePage));

            it('Выбор значения "Временные зоны" в поле выбора "Временной критерий"',
                async () => await dec.simple(el.select.iconXpand,
                    ['Временной критерий', '', 'Временные зоны', entry.max],
                    el.select));

            it('Отображение интервала', async () => await dec.simple(page.accessTemplateScheduleChangePage.interval,
                [1, entry.max],
                page.accessTemplateScheduleChangePage));

            it('Добавление произвольного временного блока',
                async () => await dec.simple(page.accessTemplateScheduleChangePage.addInterval,
                    [1, entry.max],
                    page.accessTemplateScheduleChangePage));

            it('Отображение временного блока', async () => await dec.simple(page.accessTemplateScheduleChangePage.time,
                [1, 1, entry.max],
                page.accessTemplateScheduleChangePage));

            it('Ввод начала временного блока',
                async () => await dec.simple(page.accessTemplateScheduleChangePage.startTimeSendKeys,
                    [1, 1, params.start, entry.max],
                    page.accessTemplateScheduleChangePage));

            it('Ввод окончания временного блока',
                async () => await dec.simple(page.accessTemplateScheduleChangePage.endTimeSendKeys,
                    [1, 1, params.end, entry.max],
                    page.accessTemplateScheduleChangePage));

            it('Кнопка "Сохранить изменения" - заблокирована', async () => await dec.simple(el.button.disabled,
                ['Сохранить изменения', entry.max],
                el.button));

            it('Нажатие кнопки "Сохранить изменения"', async () => await dec.simpleFalse(el.button.handlerNoActive,
                ['Сохранить изменения', entry.max],
                el.button));

            it('Отображение "title", "url" не изменилось',
                async () => await dec.simple(page.accessTemplateScheduleChangePage.initAdd,
                    [entry.max],
                    page.accessTemplateScheduleChangePage))
        });
    });

    //Попытка дублирования "Название", "Описание" и "Временной критерий" — "Временные зоны".
    const TZDuplicateTZ = () =>
        describe('Временные зоны. Добавление. Попытка дублирования "Название", "Описание" и "Временной критерий" — ' +
            '"Временные зоны"', () => {

            const params = {
                name: 'TZDuplicateTZName',
                description: 'TZDuplicateTZDescription',
                error: 'Такое название уже используется',
                start: '00:00',
                end: '00:30',
            };

            describe('API - Добавление', () => {
                bef();
                aft();
                addTZ({
                    name: params.name,
                    comment: params.description,
                    items: [{
                        begin: 0,
                        end: 10000
                    }]
                });
            });

            describe('Добавление', () => {

                bef();
                aft();

                it('Нажатие кнопки "Добавить"', async () => await dec.simple(el.butIcBefore.handler,
                    [but.add, entry.max],
                    el.butIcBefore));

                it('Отображение "title", "url"',
                    async () => await dec.simple(page.accessTemplateScheduleChangePage.initAdd,
                        [entry.max],
                        page.accessTemplateScheduleChangePage));

                it('Ввода "Название"', async () => await dec.simple(el.input.sendKeys,
                    ['Название', '', params.name, entry.max],
                    el.input));

                it('Ввода "Описание"', async () => await dec.simple(el.input.sendKeys,
                    ['Описание', '', params.description, entry.max],
                    el.input));

                it('Выбор значения "Временные зоны" в поле выбора "Временной критерий"',
                    async () => await dec.simple(el.select.iconXpand,
                        ['Временной критерий', '', 'Временные зоны', entry.max],
                        el.select));

                it('Отображение интервала', async () => await dec.simple(page.accessTemplateScheduleChangePage.interval,
                    [1, entry.max],
                    page.accessTemplateScheduleChangePage));

                it('Отображение интервала', async () => await dec.simple(page.accessTemplateScheduleChangePage.interval,
                    [1, entry.max],
                    page.accessTemplateScheduleChangePage));

                it('Добавление произвольного временного блока',
                    async () => await dec.simple(page.accessTemplateScheduleChangePage.addInterval,
                        [1, entry.max],
                        page.accessTemplateScheduleChangePage));

                it('Отображение временного блока', async () => await dec.simple(page.accessTemplateScheduleChangePage.time,
                    [1, 1, entry.max],
                    page.accessTemplateScheduleChangePage));

                it('Ввод начала временного блока',
                    async () => await dec.simple(page.accessTemplateScheduleChangePage.startTimeSendKeys,
                        [1, 1, params.start, entry.max],
                        page.accessTemplateScheduleChangePage));

                it('Ввод окончания временного блока',
                    async () => await dec.simple(page.accessTemplateScheduleChangePage.endTimeSendKeys,
                        [1, 1, params.end, entry.max],
                        page.accessTemplateScheduleChangePage));

                it('Нажатие кнопки "Сохранить изменения"', async () => await dec.simple(el.button.handler,
                    ['Сохранить изменения', entry.max],
                    el.button));

                it('Отображение ошибки', async () => await dec.simple(el.error.error,
                    [params.error, entry.max],
                    el.error))
            });

            checkTable(params.name, params.description, 'Временные зоны');

            deleteParams();
        });

    // Попытка дублирования "Название", "Описание" и "Временной критерий" — "Недельный график",
    // "Скользящий посуточный график", "Скользящий понедельный график".
    const TZDuplicateWKsWKsTZ = () => describe('Временные зоны. Добавление. Дублирования "Название", "Описание" и ' +
        '"Временной критерий" — "Недельный график", "Скользящий посуточный график", "Скользящий понедельный график".',
        () => {

            const params = {
                name: 'TZDuplicateWKsWKsTZName',
                description: 'TZDuplicateWKsWKsTZDescription',
                start: 0,
                end: 10000,
                date: '2001-01-01'
            };

            describe('API - добавление', () => {
                bef();
                aft();
                addWeek({
                    name: params.name,
                    comment: params.description,
                    items: {
                        days: [{id: 1}, {id: 1}, {id: 1}, {id: 1}, {id: 1}, {id: 1}, {id: 1}],
                        holidays: [{dayId: 1}, {dayId: 1}, {dayId: 1}, {dayId: 1}, {dayId: 1}, {dayId: 1}, {dayId: 1},
                            {dayId: 1}]
                    }
                });
                addSTZ({
                    name: params.name,
                    comment: params.description,
                    begin_date: params.date,
                    items: {days: [{id: 1}]}
                });
                it('Добавление скользящего понедельного графика', async () => {
                    const cook = await page.base.getCookie('token');
                    const get = await api.getAccessSchedules({type: 2}, cook.text);
                    const parse = JSON.parse(get.text);
                    const sw = {
                        name: params.name,
                        comment: params.description,
                        begin_date: params.date,
                        items: [parse.filter(item => item.name === params.name)[0]['id']]
                    }
                    await dec.simple(api.putArraySW,
                        [[sw], cook.text],
                        api.putArraySW);
                });
            });

            describe('Добавление', () => {

                bef();
                aft();

                it('Нажатие кнопки "Добавить"', async () => await dec.simple(el.butIcBefore.handler,
                    [but.add, entry.max],
                    el.butIcBefore));

                it('Отображение "title", "url"',
                    async () => await dec.simple(page.accessTemplateScheduleChangePage.initAdd,
                        [entry.max],
                        page.accessTemplateScheduleChangePage));

                it('Ввода "Название"', async () => await dec.simple(el.input.sendKeys,
                    ['Название', '', params.name, entry.max],
                    el.input));

                it('Ввода "Описание"', async () => await dec.simple(el.input.sendKeys,
                    ['Описание', '', params.description, entry.max],
                    el.input));

                it('Выбор значения "Временные зоны" в поле выбора "Временной критерий"',
                    async () => await dec.simple(el.select.iconXpand,
                        ['Временной критерий', '', 'Временные зоны', entry.max],
                        el.select));

                it('Отображение интервала', async () => await dec.simple(page.accessTemplateScheduleChangePage.interval,
                    [1, entry.max],
                    page.accessTemplateScheduleChangePage));

                it('Отображение интервала', async () => await dec.simple(page.accessTemplateScheduleChangePage.interval,
                    [1, entry.max],
                    page.accessTemplateScheduleChangePage));

                it('Добавление произвольного временного блока',
                    async () => await dec.simple(page.accessTemplateScheduleChangePage.addInterval,
                        [1, entry.max],
                        page.accessTemplateScheduleChangePage));

                it('Отображение временного блока', async () => await dec.simple(page.accessTemplateScheduleChangePage.time,
                    [1, 1, entry.max],
                    page.accessTemplateScheduleChangePage));

                it('Ввод начала временного блока',
                    async () => await dec.simple(page.accessTemplateScheduleChangePage.startTimeSendKeys,
                        [1, 1, params.start, entry.max],
                        page.accessTemplateScheduleChangePage));

                it('Ввод окончания временного блока',
                    async () => await dec.simple(page.accessTemplateScheduleChangePage.endTimeSendKeys,
                        [1, 1, params.end, entry.max],
                        page.accessTemplateScheduleChangePage));

                it('Нажатие кнопки "Сохранить изменения"', async () => await dec.simple(el.button.handler,
                    ['Сохранить изменения', entry.max],
                    el.button));

                it('Отображение уведомления "Сохранено успешно"', async () => await dec.simple(el.success.success,
                    ['Сохранено успешно', entry.max],
                    el.success))
            });

            describe('Проверка таблицы', () => {

                bef();
                aft();

                it('Отображение в таблице 7 строки', async () => await dec.simple(el.table.size,
                    [7, entry.max],
                    el.table));

                it('Ввод в "Поиск..."', async () => await dec.simple(el.input.sendKeys,
                    ['', 'Поиск...', params.name, entry.max],
                    el.input));

                it('Отображение в таблице 4 строки', async () => await dec.simple(el.table.size,
                    [4, entry.max],
                    el.table));
            });

            deleteParams();
    });

    // Недельный график
    // Минимальное количество параметров
    const WMinParams = () => describe('Недельный график. Добавление. Минимальное количество параметров', () => {

        const params = {
            name: 'WMinParams',
            intervals: [
                {name: 'Никогда', title: 'ПН', intervals: []},
                {name: 'Никогда', title: 'ВТ', intervals: []},
                {name: 'Никогда', title: 'СР', intervals: []},
                {name: 'Никогда', title: 'ЧТ', intervals: []},
                {name: 'Никогда', title: 'ПТ', intervals: []},
                {name: 'Никогда', title: 'СБ', intervals: []},
                {name: 'Никогда', title: 'ВС', intervals: []},
                {name: 'Никогда', title: 'Тип 1', intervals: []},
                {name: 'Никогда', title: 'Тип 2', intervals: []},
                {name: 'Никогда', title: 'Тип 3', intervals: []},
                {name: 'Никогда', title: 'Тип 4', intervals: []},
                {name: 'Никогда', title: 'Тип 5', intervals: []},
                {name: 'Никогда', title: 'Тип 6', intervals: []},
                {name: 'Никогда', title: 'Тип 7', intervals: []},
                {name: 'Никогда', title: 'Тип 8', intervals: []}
            ]
        };

        describe('Добавление', () => {

            bef();
            aft();

            it('Нажатие кнопки "Добавить"', async () => await dec.simple(el.butIcBefore.handler,
                [but.add, entry.max],
                el.butIcBefore));

            it('Отображение "title", "url"',
                async () => await dec.simple(page.accessTemplateScheduleChangePage.initAdd,
                    [entry.max],
                    page.accessTemplateScheduleChangePage));

            it('Ввод "Название"', async () => await dec.simple(el.input.sendKeys,
                ['Название', '', params.name, entry.max],
                el.input));

            it('Выбор значения "Недельный график" в поле выбора "Временной критерий"',
                async () => await dec.simple(el.select.iconXpand,
                    ['Временной критерий', '', 'Недельный график', entry.max],
                    el.select));

            it('Нажатие кнопки "Сохранить изменения"', async () => await dec.simple(el.button.handler,
                ['Сохранить изменения', entry.max],
                el.button));

            it('Отображение уведомления "Сохранено успешно"', async () => await dec.simple(el.success.success,
                ['Сохранено успешно', entry.max],
                el.success))
        });

        checkTable(params.name, '', 'Недельный график');

        describe('Проверка параметров', () => {

            bef();
            aft();

            describe('Проверка общих праметров', () => {

                it('Ввод в "Поиск..."', async () => await dec.simple(el.input.sendKeys,
                    ['', 'Поиск...', params.name, entry.max],
                    el.input));

                it('Отображение в таблице одной строки', async () => await dec.simple(el.table.singleSize,
                    [entry.max],
                    el.table));

                it('Нажатие по первой строке таблицы', async () => await dec.simple(el.table.strHandler,
                    [1, entry.max],
                    el.table));

                it('Нажатие кнопки "Редактировать"', async () => await dec.simple(el.butIcBefore.handler,
                    [but.edit, entry.max],
                    el.butIcBefore));

                it('Отображение "title", "url"',
                    async () => await dec.simple(page.accessTemplateScheduleChangePage.initEdit,
                        [entry.max],
                        page.accessTemplateScheduleChangePage));

                it('Проверка "Название"', async () => await dec.simpleText(el.input.getValue,
                    ['Название', '', entry.max],
                    params.name,
                    el.input));

                it('Проверка "Описание"', async () => await dec.simpleText(el.input.getValue,
                    ['Описание', '', entry.max],
                    '',
                    el.input));

                it('Проверка "Временной критерий"', async () => await dec.simpleText(el.select.getText,
                    ['Временной критерий', 'Недельный график', entry.max],
                    'Недельный график',
                    el.input));
            });

            params.intervals.forEach((item, index) => checkWeek({...item, countInterval: index + 1}));
        });

        deleteParams();
    });

    // Минимальное количество параметров - с изменением интервального блока.
    const WMinParamsMinInterval = () =>
        describe('Недельный график. Добавление. Минимальное количество параметров - с изменением интервального блока',
            () => {

            const params = {
                name: 'WMinParamsMinIntervalName',
                intervals: [
                    {
                        name: 'tz1',
                        tz: 3,
                        title: 'ПН',
                        intervals: [{begin: '00:00', end: '00:30'}],
                        intervalsValue: [{begin: 0, end: 1800}]
                    },
                    {name: 'Никогда', title: 'ВТ', intervals: []},
                    {name: 'Никогда', title: 'СР', intervals: []},
                    {name: 'Никогда', title: 'ЧТ', intervals: []},
                    {name: 'Никогда', title: 'ПТ', intervals: []},
                    {name: 'Никогда', title: 'СБ', intervals: []},
                    {name: 'Никогда', title: 'ВС', intervals: []},
                    {name: 'Никогда', title: 'Тип 1', intervals: []},
                    {name: 'Никогда', title: 'Тип 2', intervals: []},
                    {name: 'Никогда', title: 'Тип 3', intervals: []},
                    {name: 'Никогда', title: 'Тип 4', intervals: []},
                    {name: 'Никогда', title: 'Тип 5', intervals: []},
                    {name: 'Никогда', title: 'Тип 6', intervals: []},
                    {name: 'Никогда', title: 'Тип 7', intervals: []},
                    {name: 'Никогда', title: 'Тип 8', intervals: []}
                ],
            };

            describe('API - добавление', () => {
                bef();
                aft();
                addTZ({
                    name: params.intervals[0].name,
                    comment: '',
                    items: params.intervals[0].intervalsValue
                });
            });

            describe('Добавление', () => {

                bef();
                aft();

                describe('Добавление общих параметров', () => {
                    it('Нажатие кнопки "Добавить"', async () => await dec.simple(el.butIcBefore.handler,
                        [but.add, entry.max],
                        el.butIcBefore));

                    it('Отображение "title", "url"',
                        async () => await dec.simple(page.accessTemplateScheduleChangePage.initAdd,
                            [entry.max],
                            page.accessTemplateScheduleChangePage));

                    it('Ввод "Название"', async () => await dec.simple(el.input.sendKeys,
                        ['Название', '', params.name, entry.max],
                        el.input));

                    it('Выбор значения "Недельный график" в поле выбора "Временной критерий"', async () =>
                        await dec.simple(el.select.iconXpand,
                            ['Временной критерий', '', 'Недельный график', entry.max],
                            el.select));

                    it('Отображения интервала', async () => await dec.simple(page.accessTemplateScheduleChangePage.interval,
                        [1, entry.max],
                        page.accessTemplateScheduleChangePage));
                });

                week({...params['intervals'][0], countInterval: 1});

                describe('Сохранение изменений', () => {

                        it('Нажатие кнопки "Сохранить изменения"', async () => await dec.simple(el.button.handler,
                            ['Сохранить изменения', entry.max],
                            el.button));

                        it('Отображение уведомления "Сохранено успешно"', async () => await dec.simple(el.success.success,
                            ['Сохранено успешно', entry.max],
                            el.success));
                    });
            });

            checkTable(params.name, '', 'Недельный график');

            describe('Проверка параметров', () => {

                bef();
                aft();

                describe('Проверка общих праметров', () => {
                    it('Ввод в "Поиск..."', async () => await dec.simple(el.input.sendKeys,
                        ['', 'Поиск...', params.name, entry.max],
                        el.input));
                    it('Отображение в таблице одной строки', async () => await dec.simple(el.table.singleSize,
                        [entry.max],
                        el.table));

                    it('Нажатие по первой строке таблицы', async () => await dec.simple(el.table.strHandler,
                        [1, entry.max],
                        el.table));

                    it('Нажатие кнопки "Редактировать"', async () => await dec.simple(el.butIcBefore.handler,
                        [but.edit, entry.max],
                        el.butIcBefore));

                    it('Отображение "title", "url"',
                        async () => await dec.simple(page.accessTemplateScheduleChangePage.initEdit,
                            [entry.max],
                            page.accessTemplateScheduleChangePage));

                    it('Проверка "Название"', async () => await dec.simpleText(el.input.getValue,
                        ['Название', '', entry.max],
                        params.name,
                        el.input));

                    it('Проверка "Описание"', async () => await dec.simpleText(el.input.getValue,
                        ['Описание', '', entry.max],
                        '',
                        el.input));

                    it('Проверка "Временной критерий"', async () => await dec.simpleText(el.select.getText,
                        ['Временной критерий', 'Недельный график', entry.max],
                        'Недельный график',
                        el.input));
                });

                params.intervals.forEach((item,index) =>
                    checkWeek({...item, countInterval: index + 1}));
            });

            deleteParams();
        });

    // Максимальное количество параметров — с разными интервальными блоками
    const WMaxParams = () => describe('Недельный график. Добавление. ' +
        'Максимальное количество параметров — с разными интервальными блоками', () => {

        const params = {
            name: 'WMaxParamsName',
            description: 'WMaxParamsDescription',
            intervals: [
                {
                    name: 'tz1',
                    tz: 3,
                    title: 'ПН',
                    intervals: [{begin: '00:00', end: '00:30'}],
                    intervalsValue: [{begin: 0, end: 1800}]
                },
                {
                    name: 'tz2',
                    tz: 4,
                    title: 'ВТ',
                    intervals: [{begin: '00:00', end: '23:59'}],
                    intervalsValue: [{begin: 0, end: 86340}]
                },
                {
                    name: 'Всегда',
                    tz: 2,
                    title: 'СР',
                    intervals: [{begin: '00:00', end: '23:59'}]
                },
                {
                    name: 'tz3',
                    tz: 5,
                    title: 'ЧТ',
                    intervals: [{begin: '00:00', end: '05:59'}],
                    intervalsValue: [{begin: 0, end: 21540}]
                },
                {
                    name: 'tz4',
                    tz: 6,
                    title: 'ПТ',
                    intervals: [
                        {begin: '00:00', end: '05:59'},
                        {begin: '06:00', end: '11:59'}],
                    intervalsValue: [
                        {begin: 0, end: 21540},
                        {begin: 21600, end: 43140}]
                },
                {
                    name: 'tz5',
                    tz: 7,
                    title: 'СБ',
                    intervals: [
                        {begin: '00:00', end: '05:59'},
                        {begin: '06:00', end: '11:59'},
                        {begin: '12:00', end: '17:59'}],
                    intervalsValue: [
                        {begin: 0, end: 21540},
                        {begin: 21600, end: 43140},
                        {begin: 43200, end: 64740}]
                },
                {
                    name: 'tz6',
                    tz: 8,
                    title: 'ВС',
                    intervals: [
                        {begin: '00:00', end: '05:59'},
                        {begin: '06:00', end: '11:59'},
                        {begin: '12:00', end: '17:59'},
                        {begin: '18:00', end: '23:59'}],
                    intervalsValue: [
                        {begin: 0, end: 21540},
                        {begin: 21600, end: 43140},
                        {begin: 43200, end: 64740},
                        {begin: 64800, end: 86340}]
                },
                {
                    name: 'tz1',
                    tz: 3,
                    title: 'Тип 1',
                    intervals: [{begin: '00:00', end: '00:30'}],
                    intervalsValue: [{begin: 0, end: 1800}]
                },
                {
                    name: 'tz2',
                    tz: 4,
                    title: 'Тип 2',
                    intervals: [{begin: '00:00', end: '23:59'}],
                    intervalsValue: [{begin: 0, end: 86340}]
                },
                {
                    name: 'Всегда',
                    tz: 2,
                    title: 'Тип 3',
                    intervals: [{begin: '00:00', end: '23:59'}]
                },
                {
                    name: 'Никогда',
                    tz: 1,
                    title: 'Тип 4',
                    intervals: []
                },
                {
                    name: 'tz3',
                    tz: 5,
                    title: 'Тип 5',
                    intervals: [{begin: '00:00', end: '05:59'}],
                    intervalsValue: [{begin: 0, end: 21540}]
                },
                {
                    name: 'tz4',
                    tz: 6,
                    title: 'Тип 6',
                    intervals: [
                        {begin: '00:00', end: '05:59'},
                        {begin: '06:00', end: '11:59'}],
                    intervalsValue: [
                        {begin: 0, end: 21540},
                        {begin: 21600, end: 43140}]
                },
                {name: 'tz5',
                    tz: 7,
                    title: 'Тип 7',
                    intervals: [
                        {begin: '00:00', end: '05:59'},
                        {begin: '06:00', end: '11:59'},
                        {begin: '12:00', end: '17:59'}],
                    intervalsValue: [
                        {begin: 0, end: 21540},
                        {begin: 21600, end: 43140},
                        {begin: 43200, end: 64740}]
                },
                {
                    name: 'tz6',
                    tz: 8,
                    title: 'Тип 8',
                    intervals: [
                        {begin: '00:00', end: '05:59'},
                        {begin: '06:00', end: '11:59'},
                        {begin: '12:00', end: '17:59'},
                        {begin: '18:00', end: '23:59'}],
                    intervalsValue: [
                        {begin: 0, end: 21540},
                        {begin: 21600, end: 43140},
                        {begin: 43200, end: 64740},
                        {begin: 43200, end: 64740}]
                }
            ]
        };

        describe('API - добавление', () => {
            bef();
            aft();
            addTZ({
                name: params.intervals[0].name,
                comment: '',
                items: params.intervals[0].intervalsValue
            });
            addTZ({
                name: params.intervals[1].name,
                comment: '',
                items: params.intervals[1].intervalsValue
            });
            addTZ({
                name: params.intervals[3].name,
                comment: '',
                items: params.intervals[3].intervalsValue
            });
            addTZ({
                name: params.intervals[4].name,
                comment: '',
                items: params.intervals[4].intervalsValue
            });
            addTZ({
                name: params.intervals[5].name,
                comment: '',
                items: params.intervals[5].intervalsValue
            });
            addTZ({
                name: params.intervals[6].name,
                comment: '',
                items: params.intervals[6].intervalsValue
            });
        });

        describe('Добавление', () => {

            bef();
            aft();

            describe('Добавление общих параметров', () => {

                it('Нажатие кнопки "Добавить"', async () => await dec.simple(el.butIcBefore.handler,
                    [but.add, entry.max],
                    el.butIcBefore));

                it('Отображение "title", "url"',
                    async () => await dec.simple(page.accessTemplateScheduleChangePage.initAdd,
                        [entry.max],
                        page.accessTemplateScheduleChangePage));

                it('Ввод "Название"', async () => await dec.simple(el.input.sendKeys,
                    ['Название', '', params.name, entry.max],
                    el.input));

                it('Ввод "Описание"', async () => await dec.simple(el.input.sendKeys,
                    ['Описание', '', params.description, entry.max],
                    el.input));

                it('Выбор значения "Недельный график" в поле выбора "Временной критерий"', async () =>
                    await dec.simple(el.select.iconXpand,
                        ['Временной критерий', '', 'Недельный график', entry.max],
                        el.select));

                it('Отображения интервала', async () => await dec.simple(page.accessTemplateScheduleChangePage.interval,
                    [1, entry.max],
                    page.accessTemplateScheduleChangePage))
            });

            params.intervals.forEach((item, index) => week({...item, countInterval: index + 1}));

            describe('Сохранение изменений', () => {

                it('Нажатие кнопки "Сохранить изменения"', async () => await dec.simple(el.button.handler,
                    ['Сохранить изменения', entry.max],
                    el.button));

                it('Отображение уведомления "Сохранено успешно"', async () => await dec.simple(el.success.success,
                    ['Сохранено успешно', entry.max],
                    el.success));
            });
        });

        checkTable(params.name, params.description, 'Недельный график');

        describe('Проверка параметров', () => {

            bef();
            aft();

            describe('Проверка общих праметров', () => {

                it('Ввод в "Поиск..."', async () => await dec.simple(el.input.sendKeys,
                    ['', 'Поиск...', params.name, entry.max],
                    el.input));

                it('Отображение в таблице одной строки', async () => await dec.simple(el.table.singleSize,
                    [entry.max],
                    el.table));

                it('Нажатие по первой строке таблицы', async () => await dec.simple(el.table.strHandler,
                    [1, entry.max],
                    el.table));

                it('Нажатие кнопки "Редактировать"', async () => await dec.simple(el.butIcBefore.handler,
                    [but.edit, entry.max],
                    el.butIcBefore));

                it('Отображение "title", "url"',
                    async () => await dec.simple(page.accessTemplateScheduleChangePage.initEdit,
                        [entry.max],
                        page.accessTemplateScheduleChangePage));

                it('Проверка "Название"', async () => await dec.simpleText(el.input.getValue,
                    ['Название', '', entry.max],
                    params.name,
                    el.input));

                it('Проверка "Описание"', async () => await dec.simpleText(el.input.getValue,
                    ['Описание', '', entry.max],
                    params.description,
                    el.input));

                it('Проверка "Временной критерий"', async () => await dec.simpleText(el.select.getText,
                    ['Временной критерий', 'Недельный график', entry.max],
                    'Недельный график',
                    el.input));
            });

            params.intervals.forEach((item, index) =>  checkWeek({...item, countInterval: index + 1}));
        });

        deleteParams();
    });

    // Попытка создания без ввода "Название"
    const WNoName = () => describe('Недельный график. Добавление. Попытка создания без ввода "Название"', () => {

        describe('Добавление', () => {

            bef();
            aft();

            it('Нажатие кнопки "Добавить"', async () => await dec.simple(el.butIcBefore.handler,
                [but.add, entry.max],
                el.butIcBefore));

            it('Отображение "title", "url"',
                async () => await dec.simple(page.accessTemplateScheduleChangePage.initAdd,
                    [entry.max],
                    page.accessTemplateScheduleChangePage));

            it('Выбор значения "Недельный график" в поле выбора "Временной критерий"',
                async () => await dec.simple(el.select.iconXpand,
                    ['Временной критерий', '', 'Недельный график', entry.max],
                    el.select));

            it('Отображение интервала', async () => await dec.simple(page.accessTemplateScheduleChangePage.interval,
                [2, entry.max],
                page.accessTemplateScheduleChangePage));

            it('Кнопка "Сохранить изменения" - заблокирована', async () => await dec.simple(el.button.disabled,
                ['Сохранить изменения', entry.max],
                el.button));

            it('Нажатие кнопки "Сохранить изменения"',
                async () => await dec.simpleFalse(el.button.handlerNoActive,
                    ['Сохранить изменения', entry.max],
                    el.button));

            it('Отображение "title", "url" не изменилось',
                async () => await dec.simple(page.accessTemplateScheduleChangePage.initAdd,
                    [entry.max],
                    page.accessTemplateScheduleChangePage));
        });
    });

    // Попытка дублирования "Название", "Описание" и "Временной критерий" — "Недельный график"
    const WDuplicateW = () =>
        describe('Недельный график. Добавление. Попытка дублирования "Название", "Описание" и "Временной критерий" — '+
            '"Недельный график".', () => {

            const params = {
                name: 'WDuplicateWName',
                description: 'WDuplicateWDescription',
                error: 'Такое название уже используется',
            };

            describe('API - добавление', () => {
                bef();
                aft();
                addWeek({
                    name: params.name,
                    comment: params.description,
                    items: {
                        days: [{id: 1}, {id: 1}, {id: 1}, {id: 1}, {id: 1}, {id: 1}, {id: 1}],
                        holidays: [{dayId: 1}, {dayId: 1}, {dayId: 1}, {dayId: 1}, {dayId: 1}, {dayId: 1}, {dayId: 1},
                            {dayId: 1}]
                    }
                });
            });

            describe('Добавление', () => {

                bef();
                aft();

                it('Нажатие кнопки "Добавить"', async () => await dec.simple(el.butIcBefore.handler,
                    [but.add, entry.max],
                    el.butIcBefore));

                it('Отображение "title", "url"',
                    async () => await dec.simple(page.accessTemplateScheduleChangePage.initAdd,
                        [entry.max],
                        page.accessTemplateScheduleChangePage));

                it('Ввод "Название"', async () => await dec.simple(el.input.sendKeys,
                    ['Название', '', params.name, entry.max],
                    el.input));

                it('Ввод "Описание"', async () => await dec.simple(el.input.sendKeys,
                    ['Описание', '', params.description, entry.max],
                    el.input));

                it('Выбор значения "Недельный график" в поле выбора "Временной критерий"',
                    async () => await dec.simple(el.select.iconXpand,
                        ['Временной критерий', '', 'Недельный график', entry.max],
                        el.select));

                it('Нажатие кнопки "Сохранить изменения"', async () => await dec.simple(el.button.handler,
                    ['Сохранить изменения', entry.max],
                    el.button));

                it('Отображение ошибки', async () => await dec.simple(el.error.error,
                    [params.error, entry.max],
                    el.error))
            });

            checkTable(params.name, params.description, 'Недельный график');

            deleteParams();
        });

    // Дублирования "Название", "Описание" и "Временной критерий" — "Временные зоны", "Скользящий посуточный график",
    // "Скользящий понедельный график".
    const WDuplicateTZKsWKsTZ = () =>
        describe('Недельный график. Добавление. Дублирования "Название", "Описание" и "Временной критерий" — ' +
            'Временные зоны", "Скользящий посуточный график", "Скользящий понедельный график".', () => {

            const params = {
                name: 'WDuplicateTZKsWKsTZName',
                testName: 'weekTest',
                description: 'WDuplicateTZKsWKsTZDescription',
                date: '2001-01-01'
            };

            describe('API - добавление', () => {
                bef();
                aft();
                addTZ({
                    name: params.name,
                    comment: params.description,
                    items: [{
                        begin: 0,
                        end: 10000
                    }]
                });
                addWeek({
                    name: params.testName,
                    comment: '',
                    items: {
                        days: [{id: 1}, {id: 1}, {id: 1}, {id: 1}, {id: 1}, {id: 1}, {id: 1}],
                        holidays: [{dayId: 1}, {dayId: 1}, {dayId: 1}, {dayId: 1}, {dayId: 1}, {dayId: 1}, {dayId: 1},
                            {dayId: 1}]
                    }
                });
                addSTZ({
                    name: params.name,
                    comment: params.description,
                    begin_date: params.date,
                    items: {days: [{id: 1}]}
                });
                it('Добавление скользящего понедельного графика', async () => {
                    const cook = await page.base.getCookie('token');
                    const get = await api.getAccessSchedules({type: 2}, cook.text);
                    const parse = JSON.parse(get.text);
                    const sw = {
                        name: params.name,
                        comment: params.description,
                        begin_date: params.date,
                        items: [parse.filter(item => item.name === params.testName)[0]['id']]
                    }
                    await dec.simple(api.putArraySW,
                        [[sw], cook.text],
                        api.putArraySW);
                });
            });

            describe('Добавление', () => {

                bef();
                aft();

                it('Нажатие кнопки "Добавить"', async () => await dec.simple(el.butIcBefore.handler,
                    [but.add, entry.max],
                    el.butIcBefore));

                it('Отображение "title", "url"',
                    async () => await dec.simple(page.accessTemplateScheduleChangePage.initAdd,
                        [entry.max],
                        page.accessTemplateScheduleChangePage));

                it('Ввод "Название"', async () => await dec.simple(el.input.sendKeys,
                    ['Название', '', params.name, entry.max],
                    el.input));

                it('Ввод "Описание"', async () => await dec.simple(el.input.sendKeys,
                    ['Описание', '', params.description, entry.max],
                    el.input));

                it('Выбор значения "Недельный график" в поле выбора "Временной критерий"',
                    async () => await dec.simple(el.select.iconXpand,
                        ['Временной критерий', '', 'Недельный график', entry.max],
                        el.select));

                it('Нажатие кнопки "Сохранить изменения"', async () => await dec.simple(el.button.handler,
                    ['Сохранить изменения', entry.max],
                    el.button));

                it('Отображение уведомления "Сохранено успешно"', async () => await dec.simple(el.success.success,
                    ['Сохранено успешно', entry.max],
                    el.success));
            });

            describe('Проверка таблицы', () => {

                bef();
                aft();

                it('Отображение в таблице 8 строки', async () => await dec.simple(el.table.size,
                    [8, entry.max],
                    el.table));

                it('Ввод в "Поиск..."', async () => await dec.simple(el.input.sendKeys,
                    ['', 'Поиск...', params.name, entry.max],
                    el.input));

                it('Отображение в таблице 4 строки', async () => await dec.simple(el.table.size,
                    [4, entry.max],
                    el.table));
            });

            deleteParams();
        });

    // Скользящий посуточный график
    // Минимальное количество параметров
    const STZMinParams = () => describe('Скользящий посуточный график. Добавление. Минимальное количество параметров',
        () => {
        const params = {
            name: 'STZMinParams',
            intervals: {
                name: 'Всегда',
                tz: 2,
                intervals: [{begin: '00:00', end: '23:59'}]
            }
        };

        describe('Добавление', () => {

            bef();
            aft();

            describe('Добавление общих параметров', () => {
                it('Нажатие кнопки "Добавить"', async () => await dec.simple(el.butIcBefore.handler,
                    [but.add, entry.max],
                    el.butIcBefore));

                it('Отображение "title", "url"',
                    async () => await dec.simple(page.accessTemplateScheduleChangePage.initAdd,
                        [entry.max],
                        page.accessTemplateScheduleChangePage));

                it('Ввод "Название"', async () => await dec.simple(el.input.sendKeys,
                    ['Название', '', params.name, entry.max],
                    el.input));

                it('Выбор значения "Скользящий посуточный график" в поле выбора "Временной критерий"',
                    async () => await dec.simple(el.select.iconXpand,
                        ['Временной критерий', '', 'Скользящий посуточный график', entry.max],
                        el.select));
            });

            stz({...params.intervals, countInterval: 1});

            describe('Сохранение', () => {

                it('Нажатие кнопки "Сохранить изменения"', async () => await dec.simple(el.button.handler,
                    ['Сохранить изменения', entry.max],
                    el.button));

                it('Отображение уведомления "Сохранено успешно"', async () => await dec.simple(el.success.success,
                    ['Сохранено успешно', entry.max],
                    el.success));
            });

        });

        checkTable(params.name, '', 'Скользящий посуточный график');

        describe('Проверка параметров', () => {

            bef();
            aft();

            describe('Проверка общих праметров', () => {
                it('Ввод в "Поиск..."', async () => await dec.simple(el.input.sendKeys,
                    ['', 'Поиск...', params.name, entry.max],
                    el.input));

                it('Отображение в таблице одной строки', async () => await dec.simple(el.table.singleSize,
                    [entry.max],
                    el.table));

                it('Нажатие по первой строке таблицы', async () => await dec.simple(el.table.strHandler,
                    [1, entry.max],
                    el.table));

                it('Нажатие кнопки "Редактировать"', async () => await dec.simple(el.butIcBefore.handler,
                    [but.edit, entry.max],
                    el.butIcBefore));

                it('Отображение "title", "url"',
                    async () => await dec.simple(page.accessTemplateScheduleChangePage.initEdit,
                        [entry.max],
                        page.accessTemplateScheduleChangePage));

                it('Проверка "Название"', async () => await dec.simpleText(el.input.getValue,
                    ['Название', '', entry.max],
                    params.name,
                    el.input));

                it('Проверка "Описание"', async () => await dec.simpleText(el.input.getValue,
                    ['Описание', '', entry.max],
                    '',
                    el.input));

                it('Проверка "Дата начала смены"', async () => {
                    const date = new Date().toISOString().slice(0, 10);
                    await dec.simpleText(el.input.getValue,
                        ['Дата начала смены', '', entry.max],
                        date,
                        el.input)
                });

                it('Проверка "Временной критерий"', async () => await dec.simpleText(el.select.getText,
                    ['Временной критерий', 'Скользящий посуточный график', entry.max],
                    'Скользящий посуточный график',
                    el.input));
            });

            checkSTZ({...params.intervals, countInterval: 1});
        });

        deleteParams();
    });

    // Минимальное количество параметров - с изменением интервального блока
    const STZMinEditInterval = () =>
        describe('Скользящий посуточный график. Добавление.' +
            'Минимальное количество параметров - с изменением интервального блока',
            () => {

            const params = {
                name: 'STZMinEditInterval',
                intervals: [
                    {name: 'Всегда', tz: 2, intervals: [{begin: '00:00', end: '23:59'}]},
                    {name: 'Всегда', tz: 2, intervals: [{begin: '00:00', end: '23:59'}]},
                ]
            };

            describe('Добавление', () => {

                bef();
                aft();

                describe('Добавление общих параметров', () => {
                    it('Нажатие кнопки "Добавить"', async () => await dec.simple(el.butIcBefore.handler,
                        [but.add, entry.max],
                        el.butIcBefore));

                    it('Отображение "title", "url"',
                        async () => await dec.simple(page.accessTemplateScheduleChangePage.initAdd,
                            [entry.max],
                            page.accessTemplateScheduleChangePage));

                    it('Ввод "Название"', async () => await dec.simple(el.input.sendKeys,
                        ['Название', '', params.name, entry.max],
                        el.input));

                    it('Проверка "Описание"', async () => await dec.simpleText(el.input.getValue,
                        ['Описание', '', entry.max],
                        '',
                        el.input));

                    it('Выбор значения "Скользящий посуточный график" в поле выбора "Временной критерий"',
                        async () => await dec.simple(el.select.iconXpand,
                            ['Временной критерий', '', 'Скользящий посуточный график', entry.max],
                            el.select));
                });

                params.intervals.forEach((item, index) => stz({...item, countInterval: index + 1}));

                describe('Изменение временной зоны в "День 2"', () => {

                    it('Нажатие по интевалу', async () =>
                        await dec.simple(page.accessTemplateScheduleChangePage.handler,
                            [2, entry.max],
                            page.accessTemplateScheduleChangePage));

                    it('Интервал выделен',
                        async () => await dec.simple(page.accessTemplateScheduleChangePage.intervalActive,
                            [2, entry.max],
                            page.accessTemplateScheduleChangePage));

                    it('Нажатие кнопки "Редактировать"', async () => await dec.simple(el.button.handler,
                        ['Редактировать', entry.max],
                        el.button));

                    it('Отображенение модального окна выборы временной зоны',
                        async () => await dec.simple(el.modal.timeZoneModalSelect.init,
                            [entry.max],
                            el.modal.timeZoneModalSelect));

                    it('Отображение интервала', async () => await dec.simple(el.modal.timeZoneModalSelect.interval,
                        [1, entry.max],
                        el.modal.timeZoneModalSelect));

                    it(`Нажатие по временной зоне`,
                        async () => await dec.simple(el.modal.timeZoneModalSelect.intervalHandler,
                            [1, entry.max],
                            el.modal.timeZoneModalSelect));

                    it('Нажатие кнопки "Применить"', async () => await dec.simple(el.button.handler,
                        ['Применить', entry.max],
                        el.button));

                    it('Отсутствие модального окна выборы временной зоны',
                        async () => await dec.simple(el.modal.timeZoneModalSelect.initClose,
                            [entry.max],
                            el.modal.timeZoneModalSelect));
                });

                describe('Сохранение', () => {

                    it('Нажатие кнопки "Сохранить изменения"', async () => await dec.simple(el.button.handler,
                        ['Сохранить изменения', entry.max],
                        el.button));

                    it('Отображение уведомления "Сохранено успешно"', async () => await dec.simple(el.success.success,
                        ['Сохранено успешно', entry.max],
                        el.success));
                });
            });

            checkTable(params.name, '', 'Скользящий посуточный график');

            describe('Проверка параметров', () => {

                bef();
                aft();

                describe('Проверка общих праметров', () => {
                    it('Ввод в "Поиск..."', async () => await dec.simple(el.input.sendKeys,
                        ['', 'Поиск...', params.name, entry.max],
                        el.input));

                    it('Отображение в таблице одной строки', async () => await dec.simple(el.table.singleSize,
                        [entry.max],
                        el.table));

                    it('Нажатие по первой строке таблицы', async () => await dec.simple(el.table.strHandler,
                        [1, entry.max],
                        el.table));

                    it('Нажатие кнопки "Редактировать"', async () => await dec.simple(el.butIcBefore.handler,
                        [but.edit, entry.max],
                        el.butIcBefore));

                    it('Отображение "title", "url"',
                        async () => await dec.simple(page.accessTemplateScheduleChangePage.initEdit,
                            [entry.max],
                            page.accessTemplateScheduleChangePage));

                    it('Проверка "Название"', async () => await dec.simpleText(el.input.getValue,
                        ['Название', '', entry.max],
                        params.name,
                        el.input));

                    it('Проверка "Описание"', async () => await dec.simpleText(el.input.getValue,
                        ['Описание', '', entry.max],
                        '',
                        el.input));

                    it('Проверка "Дата начала смены"', async () => {
                        const date = new Date().toISOString().slice(0, 10);
                        await dec.simpleText(el.input.getValue,
                            ['Дата начала смены', '', entry.max],
                            date,
                            el.input)
                    });

                    it('Проверка "Временной критерий"', async () => await dec.simpleText(el.select.getText,
                        ['Временной критерий', 'Скользящий посуточный график', entry.max],
                        'Скользящий посуточный график',
                        el.input));
                });

                checkSTZ({...params.intervals[0], countInterval: 1});

                checkSTZ({name: 'Никогда', intervals: [], countInterval: 2});
            });

            deleteParams();
        });

    // Минимальное количество параметров - с удалением интервального блока
    const STZMinRemoveInterval = () =>
        describe('Скользящий посуточный график. Добавление. ' +
            'Минимальное количество параметров - с удалением интервального блока',
            () => {
            const params = {
                    name: 'STZMinRemoveInterval',
                    intervals: [
                        {name: 'Всегда', tz: 2, intervals: [{begin: '00:00', end: '23:59'}]},
                        {name: 'Всегда', tz: 2, intervals: [{begin: '00:00', end: '23:59'}]},
                    ]
                };

            describe('Добавление', () => {

                    bef();
                    aft();

                    describe('Добавление общих параметров', () => {
                        it('Нажатие кнопки "Добавить"', async () => await dec.simple(el.butIcBefore.handler,
                            [but.add, entry.max],
                            el.butIcBefore));

                        it('Отображение "title", "url"',
                            async () => await dec.simple(page.accessTemplateScheduleChangePage.initAdd,
                                [entry.max],
                                page.accessTemplateScheduleChangePage));

                        it('Ввод "Название"', async () => await dec.simple(el.input.sendKeys,
                            ['Название', '', params.name, entry.max],
                            el.input));

                        it('Проверка "Описание"', async () => await dec.simpleText(el.input.getValue,
                            ['Описание', '', entry.max],
                            '',
                            el.input));

                        it('Выбор значения "Скользящий посуточный график" в поле выбора "Временной критерий"',
                            async () => await dec.simple(el.select.iconXpand,
                                ['Временной критерий', '', 'Скользящий посуточный график', entry.max],
                                el.select));
                    });

                    params.intervals.forEach((item, index) => stz({...item,countInterval: index + 1}));

                    describe('Удаление "День 2"', () => {

                        it('Нажатие по интевалу', async () =>
                            await dec.simple(page.accessTemplateScheduleChangePage.handler,
                                [2, entry.max],
                                page.accessTemplateScheduleChangePage));

                        it('Интервал выделен',
                            async () => await dec.simple(page.accessTemplateScheduleChangePage.intervalActive,
                                [2, entry.max],
                                page.accessTemplateScheduleChangePage));

                        it('Нажатие кнопки "Удалить"', async () => await dec.simple(el.butIcBefore.handler,
                            [but.delete, entry.max],
                            el.butIcBefore));
                    });

                    describe('Сохранение', () => {

                        it('Нажатие кнопки "Сохранить изменения"', async () => await dec.simple(el.button.handler,
                            ['Сохранить изменения', entry.max],
                            el.button));

                        it('Отображение уведомления "Сохранено успешно"', async () => await dec.simple(el.success.success,
                            ['Сохранено успешно', entry.max],
                            el.success));
                    });
                });

            checkTable(params.name, '', 'Скользящий посуточный график');

            describe('Проверка параметров', () => {

                bef();
                aft();

                describe('Проверка общих праметров', () => {
                    it('Ввод в "Поиск..."', async () => await dec.simple(el.input.sendKeys,
                        ['', 'Поиск...', params.name, entry.max],
                        el.input));

                    it('Отображение в таблице одной строки', async () => await dec.simple(el.table.singleSize,
                        [entry.max],
                        el.table));

                    it('Нажатие по первой строке таблицы', async () => await dec.simple(el.table.strHandler,
                        [1, entry.max],
                        el.table));

                    it('Нажатие кнопки "Редактировать"', async () => await dec.simple(el.butIcBefore.handler,
                        [but.edit, entry.max],
                        el.butIcBefore));

                    it('Отображение "title", "url"',
                        async () => await dec.simple(page.accessTemplateScheduleChangePage.initEdit,
                            [entry.max],
                            page.accessTemplateScheduleChangePage));

                    it('Проверка "Название"', async () => await dec.simpleText(el.input.getValue,
                        ['Название', '', entry.max],
                        params.name,
                        el.input));

                    it('Проверка "Описание"', async () => await dec.simpleText(el.input.getValue,
                        ['Описание', '', entry.max],
                        '',
                        el.input));

                    it('Проверка "Дата начала смены"', async () => {
                        const date = new Date().toISOString().slice(0, 10);
                        await dec.simpleText(el.input.getValue,
                            ['Дата начала смены', '', entry.max],
                            date,
                            el.input)
                    });

                    it('Проверка "Временной критерий"', async () => await dec.simpleText(el.select.getText,
                        ['Временной критерий', 'Скользящий посуточный график', entry.max],
                        'Скользящий посуточный график',
                        el.input));
                });

                checkSTZ({...params.intervals[0], countInterval: 1});

                describe('Отсутствие "День 2"', () => {
                    it('Отсутствие интервала',
                        async () => await dec.simpleFalse(page.accessTemplateScheduleChangePage.interval,
                            [2, entry.min],
                            page.accessTemplateScheduleChangePage));
                });
            });

            deleteParams();
        });

    // Максимальное количество параметров с разными интервальными блоками — 30 дней
    const STZMaxParams = () =>
        describe('Скользящий посуточный график. Добавление. ' +
            'Максимальное количество параметров с разными интервальными блоками — 30 дней',
            () => {

            const params = {
                name: 'STZMaxParamsName',
                description: 'STZMaxParamsDescription',
                date: '2022-01-01',
                objDate: {
                    day: '1',
                    month: 'Январь',
                    year: '2022',
                },
                intervals: [
                    {
                        name: 'tz1',
                        tz: 3,
                        intervals: [{begin: '00:00', end: '00:30'}],
                        intervalsValue: [{begin: 0, end: 1800}]
                    },
                    {
                        name: 'tz2',
                        tz: 4,
                        intervals: [{begin: '00:00', end: '23:59'}],
                        intervalsValue: [{begin: 0, end: 86340}]
                    },
                    {
                        name: 'tz3',
                        tz: 5,
                        intervals: [{begin: '00:00', end: '05:59'}],
                        intervalsValue: [{begin: 0, end: 21540}]
                    },
                    {
                        name: 'tz4',
                        tz: 6,
                        intervals: [
                            {begin: '00:00', end: '05:59'},
                            {begin: '06:00', end: '11:59'}],
                        intervalsValue: [
                            {begin: 0, end: 21540},
                            {begin: 21600, end: 43140}]
                    },
                    {name: 'tz5',
                        tz: 7,
                        intervals: [
                            {begin: '00:00', end: '05:59'},
                            {begin: '06:00', end: '11:59'},
                            {begin: '12:00', end: '17:59'}],
                        intervalsValue: [
                            {begin: 0, end: 21540},
                            {begin: 21600, end: 43140},
                            {begin: 43200, end: 64740}]
                    },
                    {
                        name: 'tz6',
                        tz: 8,
                        intervals: [
                            {begin: '00:00', end: '05:59'},
                            {begin: '06:00', end: '11:59'},
                            {begin: '12:00', end: '17:59'},
                            {begin: '18:00', end: '23:59'}],
                        intervalsValue: [
                            {begin: 0, end: 21540},
                            {begin: 21600, end: 43140},
                            {begin: 43200, end: 64740},
                            {begin: 64800, end: 86340}]
                    },
                    {
                        name: 'Всегда',
                        tz: 2,
                        intervals: [{begin: '00:00', end: '23:59'}]
                    },
                    {
                        name: 'Никогда',
                        tz: 1,
                        intervals: []
                    },
                    {
                        name: 'tz1',
                        tz: 3,
                        intervals: [{begin: '00:00', end: '00:30'}]
                    },
                    {
                        name: 'tz2',
                        tz: 4,
                        intervals: [{begin: '00:00', end: '23:59'}]
                    },
                    {
                        name: 'tz3',
                        tz: 5,
                        intervals: [{begin: '00:00', end: '05:59'}]
                    },
                    {
                        name: 'tz4',
                        tz: 6,
                        intervals: [
                            {begin: '00:00', end: '05:59'},
                            {begin: '06:00', end: '11:59'}],
                    },
                    {name: 'tz5',
                        tz: 7,
                        intervals: [
                            {begin: '00:00', end: '05:59'},
                            {begin: '06:00', end: '11:59'},
                            {begin: '12:00', end: '17:59'}]
                    },
                    {
                        name: 'tz6',
                        tz: 8,
                        intervals: [
                            {begin: '00:00', end: '05:59'},
                            {begin: '06:00', end: '11:59'},
                            {begin: '12:00', end: '17:59'},
                            {begin: '18:00', end: '23:59'}]
                    },
                    {
                        name: 'Всегда',
                        tz: 2,
                        intervals: [{begin: '00:00', end: '23:59'}]
                    },
                    {
                        name: 'Никогда',
                        tz: 1,
                        intervals: []
                    },
                    {
                        name: 'tz1',
                        tz: 3,
                        intervals: [{begin: '00:00', end: '00:30'}]
                    },
                    {
                        name: 'tz2',
                        tz: 4,
                        intervals: [{begin: '00:00', end: '23:59'}]
                    },
                    {
                        name: 'tz3',
                        tz: 5,
                        intervals: [{begin: '00:00', end: '05:59'}]
                    },
                    {
                        name: 'tz4',
                        tz: 6,
                        intervals: [
                            {begin: '00:00', end: '05:59'},
                            {begin: '06:00', end: '11:59'}],
                    },
                    {name: 'tz5',
                        tz: 7,
                        intervals: [
                            {begin: '00:00', end: '05:59'},
                            {begin: '06:00', end: '11:59'},
                            {begin: '12:00', end: '17:59'}]
                    },
                    {
                        name: 'tz6',
                        tz: 8,
                        intervals: [
                            {begin: '00:00', end: '05:59'},
                            {begin: '06:00', end: '11:59'},
                            {begin: '12:00', end: '17:59'},
                            {begin: '18:00', end: '23:59'}]
                    },
                    {
                        name: 'Всегда',
                        tz: 2,
                        intervals: [{begin: '00:00', end: '23:59'}]
                    },
                    {
                        name: 'Никогда',
                        tz: 1,
                        intervals: []
                    },
                    {
                        name: 'tz1',
                        tz: 3,
                        intervals: [{begin: '00:00', end: '00:30'}]
                    },
                    {
                        name: 'tz2',
                        tz: 4,
                        intervals: [{begin: '00:00', end: '23:59'}]
                    },
                    {
                        name: 'tz3',
                        tz: 5,
                        intervals: [{begin: '00:00', end: '05:59'}]
                    },
                    {
                        name: 'tz4',
                        tz: 6,
                        intervals: [
                            {begin: '00:00', end: '05:59'},
                            {begin: '06:00', end: '11:59'}],
                    },
                    {name: 'tz5',
                        tz: 7,
                        intervals: [
                            {begin: '00:00', end: '05:59'},
                            {begin: '06:00', end: '11:59'},
                            {begin: '12:00', end: '17:59'}]
                    },
                    {
                        name: 'tz6',
                        tz: 8,
                        intervals: [
                            {begin: '00:00', end: '05:59'},
                            {begin: '06:00', end: '11:59'},
                            {begin: '12:00', end: '17:59'},
                            {begin: '18:00', end: '23:59'}]
                    }
                ]
            };

            describe('API - добавление', () => {
                bef();
                aft();
                addTZ({
                    name: params.intervals[0].name,
                    comment: '',
                    items: params.intervals[0].intervalsValue
                });
                addTZ({
                    name: params.intervals[1].name,
                    comment: '',
                    items: params.intervals[1].intervalsValue
                });
                addTZ({
                    name: params.intervals[2].name,
                    comment: '',
                    items: params.intervals[2].intervalsValue
                });
                addTZ({
                    name: params.intervals[3].name,
                    comment: '',
                    items: params.intervals[3].intervalsValue
                });
                addTZ({
                    name: params.intervals[4].name,
                    comment: '',
                    items: params.intervals[4].intervalsValue
                });
                addTZ({
                    name: params.intervals[5].name,
                    comment: '',
                    items: params.intervals[5].intervalsValue
                });
            });

            describe('Добавление', () => {

                bef();
                aft();

                describe('Добавление общий параметров', () => {
                    it('Нажатие кнопки "Добавить"', async () => await dec.simple(el.butIcBefore.handler,
                        [but.add, entry.max],
                        el.butIcBefore));

                    it('Отображение "title", "url"',
                        async () => await dec.simple(page.accessTemplateScheduleChangePage.initAdd,
                            [entry.max],
                            page.accessTemplateScheduleChangePage));

                    it('Выбор значения "Скользящий посуточный график" в поле выбора "Временной критерий"',
                        async () => await dec.simple(el.select.iconXpand,
                            ['Временной критерий', '', 'Скользящий посуточный график', entry.max],
                            el.select));


                    it('Ввод "Название"', async () => await dec.simple(el.input.sendKeys,
                        ['Название', '', params.name, entry.max],
                        el.input));

                    it('Ввод "Описание"', async () => await dec.simple(el.input.sendKeys,
                        ['Описание', '', params.description, entry.max],
                        el.input));

                    it('Выбор "Дата начала смены"', async () => {

                        await dec.simple(el.input.handler,
                            ['Дата начала смены', '', entry.max],
                            el.input);

                        await dec.simple(el.datepicker.dateParse,
                            [params.objDate, entry.max],
                            el.datepicker)

                    });
                });

                params.intervals.forEach((item, index) => stz({...item, countInterval: index + 1}));

                describe('Сохранение', () => {

                    it('Нажатие кнопки "Сохранить изменения"', async () => await dec.simple(el.button.handler,
                        ['Сохранить изменения', entry.max],
                        el.button));

                    it('Отображение уведомления "Сохранено успешно"', async () => await dec.simple(el.success.success,
                        ['Сохранено успешно', entry.max],
                        el.success));
                });
            });

            checkTable(params.name, params.description, 'Скользящий посуточный график');

            describe('Проверка параметров', () => {

                bef();

                aft();

                describe('Проверка общих праметров', () => {

                    it('Ввод в "Поиск..."', async () => await dec.simple(el.input.sendKeys,
                        ['', 'Поиск...', params.name, entry.max],
                        el.input));

                    it('Отображение в таблице одной строки', async () => await dec.simple(el.table.singleSize,
                        [entry.max],
                        el.table));

                    it('Нажатие по первой строке таблицы', async () => await dec.simple(el.table.strHandler,
                        [1, entry.max],
                        el.table));

                    it('Нажатие кнопки "Редактировать"', async () => await dec.simple(el.butIcBefore.handler,
                        [but.edit, entry.max],
                        el.butIcBefore));

                    it('Отображение "title", "url"',
                        async () => await dec.simple(page.accessTemplateScheduleChangePage.initEdit,
                            [entry.max],
                            page.accessTemplateScheduleChangePage));

                    it('Проверка "Название"', async () => await dec.simpleText(el.input.getValue,
                        ['Название', '', entry.max],
                        params.name,
                        el.input));

                    it('Проверка "Описание"', async () => await dec.simpleText(el.input.getValue,
                        ['Описание', '', entry.max],
                        params.description,
                        el.input));

                    it('Проверка "Дата начала смены"', async () => await dec.simpleText(el.input.getValue,
                        ['Дата начала смены', '', entry.max],
                        params.date,
                        el.input));

                    it('Проверка "Временной критерий"', async () => await dec.simpleText(el.select.getText,
                        ['Временной критерий', 'Скользящий посуточный график', entry.max],
                        'Скользящий посуточный график',
                        el.input));
                });

                params.intervals.forEach((item,index) => checkSTZ({
                    ...item, countInterval: index + 1
                }));
            });

            deleteParams();
        });

    // Попытка добавления без всех обязательных параметров.
    const STZNoParams = () =>
        describe('Скользящий посуточный график. Добавление. Попытка добавления без всех обязательных параметров',
            () => {
            describe('Добавление', () => {

                bef();
                aft();

                it('Нажатие кнопки "Добавить"', async () => await dec.simple(el.butIcBefore.handler,
                    [but.add, entry.max],
                    el.butIcBefore));

                it('Отображение "title", "url"',
                    async () => await dec.simple(page.accessTemplateScheduleChangePage.initAdd,
                        [entry.max],
                        page.accessTemplateScheduleChangePage));

                it('Выбор значения "Скользящий посуточный график" в поле выбора "Временной критерий"',
                    async () => await dec.simple(el.select.iconXpand,
                        ['Временной критерий', '', 'Скользящий посуточный график', entry.max],
                        el.select));

                it('Кнопка "Сохранить изменения" - заблокирована', async () => await dec.simple(el.button.disabled,
                    ['Сохранить изменения', entry.max],
                    el.button));

                it('Нажатие кнопки "Сохранить изменения"', async () => await dec.simpleFalse(el.button.handlerNoActive,
                    ['Сохранить изменения', entry.max],
                    el.button));

                it('Отображение "title", "url" не изменилось',
                    async () => await dec.simple(page.accessTemplateScheduleChangePage.initAdd,
                        [entry.max],
                        page.accessTemplateScheduleChangePage));
            });
        });

    // Попытка добавления без названия.
    const STZNoName = () =>
        describe('Скользящий посуточный график. Добавление. Попытка добавления без "Название"', () => {

            const params = {
                intervals: {
                    name: 'Всегда',
                    tz: 2,
                    intervals: [{begin: '00:00', end: '23:59'}]
                }
            };

            describe('Добавление', () => {

                bef();
                aft();

                describe('Добавление общих параметров', () => {
                    it('Нажатие кнопки "Добавить"', async () => await dec.simple(el.butIcBefore.handler,
                        [but.add, entry.max],
                        el.butIcBefore));

                    it('Отображение "title", "url"',
                        async () => await dec.simple(page.accessTemplateScheduleChangePage.initAdd,
                            [entry.max],
                            page.accessTemplateScheduleChangePage));

                    it('Выбор значения "Скользящий посуточный график" в поле выбора "Временной критерий"',
                        async () => await dec.simple(el.select.iconXpand,
                            ['Временной критерий', '', 'Скользящий посуточный график', entry.max],
                            el.select));
                });

                stz({...params.intervals, countInterval: 1});

                describe('Сохранение', () => {
                    it('Кнопка "Сохранить изменения" - заблокирована', async () => await dec.simple(el.button.disabled,
                        ['Сохранить изменения', entry.max],
                        el.button));

                    it('Нажатие кнопки "Сохранить изменения"', async () => await dec.simpleFalse(el.button.handlerNoActive,
                        ['Сохранить изменения', entry.max],
                        el.button));

                    it('Отображение "title", "url" не изменилось',
                        async () => await dec.simple(page.accessTemplateScheduleChangePage.initAdd,
                            [entry.max],
                            page.accessTemplateScheduleChangePage));
                });
            });
        });

    // Попытка добавления без интервала.
    const STZNoInterval = () => describe('Скользящий посуточный график. Добавление. Попытка добавления без интервала.',
        () => {

        const params = {
            name: 'STZNoInterval',
            error: 'Не указано ни одного суточного графика'
        };

        describe('Добавление', () => {

            bef();
            aft();

            it('Нажатие кнопки "Добавить"', async () => await dec.simple(el.butIcBefore.handler,
                [but.add, entry.max],
                el.butIcBefore));

            it('Отображение "title", "url"',
                async () => await dec.simple(page.accessTemplateScheduleChangePage.initAdd,
                    [entry.max],
                    page.accessTemplateScheduleChangePage));

            it('Выбор значения "Скользящий посуточный график" в поле выбора "Временной критерий"',
                async () => await dec.simple(el.select.iconXpand,
                    ['Временной критерий', '', 'Скользящий посуточный график', entry.max],
                    el.select));

            it('Ввод "Название"', async () => await dec.simple(el.input.sendKeys,
                ['Название', '', params.name, entry.max],
                el.input));

            it('Нажатие кнопки "Сохранить изменения"', async () => await dec.simple(el.button.handler,
                ['Сохранить изменения', entry.max],
                el.button));

            it('Отображене ошибки', async () => await dec.simple(el.error.error,
                [params.error, entry.max],
                el.error));
        });

        checkFalseTable(params.name);
    });

    // Попытка добавить 31 день.
    const STZFailedInterval = () => describe('Скользящий посуточный график. Добавление. Попытка добавить 31 день.',
        () => {
        const params = {
            name: 'STZFailedInterval',
            intervals: [
                {
                    name: 'Всегда',
                    tz: 2,
                    intervals: [{begin: '00:00', end: '23:59'}]
                },
                {
                    name: 'Всегда',
                    tz: 2,
                    intervals: [{begin: '00:00', end: '23:59'}]
                },
                {
                    name: 'Всегда',
                    tz: 2,
                    intervals: [{begin: '00:00', end: '23:59'}]
                },
                {
                    name: 'Всегда',
                    tz: 2,
                    intervals: [{begin: '00:00', end: '23:59'}]
                },
                {
                    name: 'Всегда',
                    tz: 2,
                    intervals: [{begin: '00:00', end: '23:59'}]
                },
                {
                    name: 'Всегда',
                    tz: 2,
                    intervals: [{begin: '00:00', end: '23:59'}]
                },
                {
                    name: 'Всегда',
                    tz: 2,
                    intervals: [{begin: '00:00', end: '23:59'}]
                },
                {
                    name: 'Всегда',
                    tz: 2,
                    intervals: [{begin: '00:00', end: '23:59'}]
                },
                {
                    name: 'Всегда',
                    tz: 2,
                    intervals: [{begin: '00:00', end: '23:59'}]
                },
                {
                    name: 'Всегда',
                    tz: 2,
                    intervals: [{begin: '00:00', end: '23:59'}]
                },
                {
                    name: 'Всегда',
                    tz: 2,
                    intervals: [{begin: '00:00', end: '23:59'}]
                },
                {
                    name: 'Всегда',
                    tz: 2,
                    intervals: [{begin: '00:00', end: '23:59'}]
                },
                {
                    name: 'Всегда',
                    tz: 2,
                    intervals: [{begin: '00:00', end: '23:59'}]
                },
                {
                    name: 'Всегда',
                    tz: 2,
                    intervals: [{begin: '00:00', end: '23:59'}]
                },
                {
                    name: 'Всегда',
                    tz: 2,
                    intervals: [{begin: '00:00', end: '23:59'}]
                },
                {
                    name: 'Всегда',
                    tz: 2,
                    intervals: [{begin: '00:00', end: '23:59'}]
                },
                {
                    name: 'Всегда',
                    tz: 2,
                    intervals: [{begin: '00:00', end: '23:59'}]
                },
                {
                    name: 'Всегда',
                    tz: 2,
                    intervals: [{begin: '00:00', end: '23:59'}]
                },
                {
                    name: 'Всегда',
                    tz: 2,
                    intervals: [{begin: '00:00', end: '23:59'}]
                },
                {
                    name: 'Всегда',
                    tz: 2,
                    intervals: [{begin: '00:00', end: '23:59'}]
                },
                {
                    name: 'Всегда',
                    tz: 2,
                    intervals: [{begin: '00:00', end: '23:59'}]
                },
                {
                    name: 'Всегда',
                    tz: 2,
                    intervals: [{begin: '00:00', end: '23:59'}]
                },
                {
                    name: 'Всегда',
                    tz: 2,
                    intervals: [{begin: '00:00', end: '23:59'}]
                },
                {
                    name: 'Всегда',
                    tz: 2,
                    intervals: [{begin: '00:00', end: '23:59'}]
                },
                {
                    name: 'Всегда',
                    tz: 2,
                    intervals: [{begin: '00:00', end: '23:59'}]
                },
                {
                    name: 'Всегда',
                    tz: 2,
                    intervals: [{begin: '00:00', end: '23:59'}]
                },
                {
                    name: 'Всегда',
                    tz: 2,
                    intervals: [{begin: '00:00', end: '23:59'}]
                },
                {
                    name: 'Всегда',
                    tz: 2,
                    intervals: [{begin: '00:00', end: '23:59'}]
                },
                {
                    name: 'Всегда',
                    tz: 2,
                    intervals: [{begin: '00:00', end: '23:59'}]
                },
                {
                    name: 'Всегда',
                    tz: 2,
                    intervals: [{begin: '00:00', end: '23:59'}]
                },
            ]
        };

        describe('Добавление', () => {

            bef();
            aft();

            describe('Добавление общий параметров', () => {
                it('Нажатие кнопки "Добавить"', async () => await dec.simple(el.butIcBefore.handler,
                    [but.add, entry.max],
                    el.butIcBefore));

                it('Отображение "title", "url"',
                    async () => await dec.simple(page.accessTemplateScheduleChangePage.initAdd,
                        [entry.max],
                        page.accessTemplateScheduleChangePage));

                it('Выбор значения "Скользящий посуточный график" в поле выбора "Временной критерий"',
                    async () => await dec.simple(el.select.iconXpand,
                        ['Временной критерий', '', 'Скользящий посуточный график', entry.max],
                        el.select));

                it('Ввод "Название"', async () => await dec.simple(el.input.sendKeys,
                    ['Название', '', params.name, entry.max],
                    el.input));
            });

            params.intervals.forEach((item, index) => stz({...item, countInterval: index + 1}));

            describe('Попытка добавление "День 31"', () => {
                it('Кнопка "Добавить" - заблокирована', async () => await dec.simple(el.butIcBefore.disabled,
                    [but.add, entry.max],
                    el.butIcBefore));
            });

            describe('Сохранение', () => {
                it('Нажатие кнопки "Сохранить изменения"', async () => await dec.simple(el.button.handler,
                    ['Сохранить изменения', entry.max],
                    el.button));

                it('Отображение уведомления "Сохранено успешно"', async () => await dec.simple(el.success.success,
                    ['Сохранено успешно', entry.max],
                    el.success));
            });
        });

        checkTable(params.name, '', 'Скользящий посуточный график');

        describe('Проверка параметров', () => {

            bef();
            aft();

            describe('Проверка общих праметров', () => {
                it('Ввод в "Поиск..."', async () => await dec.simple(el.input.sendKeys,
                    ['', 'Поиск...', params.name, entry.max],
                    el.input));

                it('Отображение в таблице одной строки', async () => await dec.simple(el.table.singleSize,
                    [entry.max],
                    el.table));

                it('Нажатие по первой строке таблицы', async () => await dec.simple(el.table.strHandler,
                    [1, entry.max],
                    el.table));

                it('Нажатие кнопки "Редактировать"', async () => await dec.simple(el.butIcBefore.handler,
                    [but.edit, entry.max],
                    el.butIcBefore));

                it('Отображение "title", "url"',
                    async () => await dec.simple(page.accessTemplateScheduleChangePage.initEdit,
                        [entry.max],
                        page.accessTemplateScheduleChangePage));

                it('Проверка "Название"', async () => await dec.simpleText(el.input.getValue,
                    ['Название', '', entry.max],
                    params.name,
                    el.input));

                it('Проверка "Описание"', async () => await dec.simpleText(el.input.getValue,
                    ['Описание', '', entry.max],
                    '',
                    el.input));

                it('Проверка "Дата начала смены"', async () => {
                    const date = new Date().toISOString().slice(0, 10);
                    await dec.simpleText(el.input.getValue,
                        ['Дата начала смены', '', entry.max],
                        date,
                        el.input)
                });

                it('Проверка "Временной критерий"', async () => await dec.simpleText(el.select.getText,
                    ['Временной критерий', 'Скользящий посуточный график', entry.max],
                    'Скользящий посуточный график',
                    el.input));
            });

            params.intervals.forEach((item,index) => {
                if(index !== 30) {
                    checkSTZ({...item, countInterval: index + 1});
                }
            });

            describe('Отсутствие "День 31"', () => {
                it('Отсутствие интервала',
                    async () => await dec.simpleFalse(page.accessTemplateScheduleChangePage.interval,
                        [31, entry.min],
                        page.accessTemplateScheduleChangePage));
            });
        });

        deleteParams();
    });

    // Попытка дублирования "Название", "Описание" и "Временной критерий" — "Недельный график"
    const STZDuplicateSTZ = () =>
        describe('Скользящий посуточный график. Добавление. Попытка дублирования "Название", "Описание" и ' +
            '"Временной критерий" — "Скользящий посуточный график".', () => {

            const params = {
                name: 'STZDuplicateSTZName',
                description: 'STZDuplicateSTZDescription',
                date: '2001-01-01',
                error: 'Такое название уже используется',
                intervals: {
                    name: 'Всегда',
                    tz: 2,
                    intervals: [{begin: '00:00', end: '23:59'}]
                }
            };

            describe('API - добавление', () => {
                bef();
                aft();
                addSTZ({
                    name: params.name,
                    comment: params.description,
                    begin_date: params.date,
                    items: {days: [{id: 1}]}
                });
            });

            describe('Добавление', () => {

                bef();
                aft();

                describe('Добавление общих параметров', () => {

                    it('Нажатие кнопки "Добавить"', async () => await dec.simple(el.butIcBefore.handler,
                        [but.add, entry.max],
                        el.butIcBefore));

                    it('Отображение "title", "url"',
                        async () => await dec.simple(page.accessTemplateScheduleChangePage.initAdd,
                            [entry.max],
                            page.accessTemplateScheduleChangePage));

                    it('Выбор значения "Скользящий посуточный график" в поле выбора "Временной критерий"',
                        async () => await dec.simple(el.select.iconXpand,
                            ['Временной критерий', '', 'Скользящий посуточный график', entry.max],
                            el.select));

                    it('Ввод "Название"', async () => await dec.simple(el.input.sendKeys,
                        ['Название', '', params.name, entry.max],
                        el.input));

                    it('Ввод "Описание"', async () => await dec.simple(el.input.sendKeys,
                        ['Описание', '', params.description, entry.max],
                        el.input));
                });

                stz({...params.intervals, countInterval: 1});

                describe('Сохранение', () => {

                    it('Нажатие кнопки "Сохранить изменения"', async () => await dec.simple(el.button.handler,
                        ['Сохранить изменения', entry.max],
                        el.button));

                    it('Отображение ошибки', async () => await dec.simple(el.error.error,
                        [params.error, entry.max],
                        el.error))
                })
            });

            checkTable(params.name, params.description, 'Скользящий посуточный график');

            deleteParams();
        });

    // Дублирования "Название", "Описание" и "Временной критерий" — "Временные зоны", "Недельный график",
    // "Скользящий понедельный график".
    const STZDuplicateTZKsWsWK = () =>
        describe('Скользящий посуточный график. Добавление. Дублирования "Название", "Описание" и ' +
            '"Временной критерий" —Временные зоны", "Недельный график", "Скользящий понедельный график".', () => {

            const params = {
                name: 'STZDuplicateTZKsWsWKName',
                description: 'STZDuplicateTZKsWsWKDescription',
                date: '2001-01-01',
                error: 'Такое название уже используется',
                intervals: {
                    name: 'Всегда',
                    tz: 2,
                    intervals: [{begin: '00:00', end: '23:59'}]
                }
            };

            describe('API - добавление', () => {
                bef();
                aft();
                addTZ({
                    name: params.name,
                    comment: params.description,
                    items: [{
                        begin: 0,
                        end: 10000
                    }]
                });
                addWeek({
                    name: params.name,
                    comment: params.description,
                    items: {
                        days: [{id: 1}, {id: 1}, {id: 1}, {id: 1}, {id: 1}, {id: 1}, {id: 1}],
                        holidays: [{dayId: 1}, {dayId: 1}, {dayId: 1}, {dayId: 1}, {dayId: 1}, {dayId: 1}, {dayId: 1},
                            {dayId: 1}]
                    }
                });
                it('Добавление скользящего понедельного графика', async () => {
                    const cook = await page.base.getCookie('token');
                    const get = await api.getAccessSchedules({type: 2}, cook.text);
                    const parse = JSON.parse(get.text);
                    const sw = {
                        name: params.name,
                        comment: params.description,
                        begin_date: params.date,
                        items: [parse.filter(item => item.name === params.name)[0]['id']]
                    }
                    await dec.simple(api.putArraySW,
                        [[sw], cook.text],
                        api.putArraySW);
                });
            });

            describe('Добавление', () => {

                bef();
                aft();

                describe('Добавление общих параметров', () => {

                    it('Нажатие кнопки "Добавить"', async () => await dec.simple(el.butIcBefore.handler,
                        [but.add, entry.max],
                        el.butIcBefore));

                    it('Отображение "title", "url"',
                        async () => await dec.simple(page.accessTemplateScheduleChangePage.initAdd,
                            [entry.max],
                            page.accessTemplateScheduleChangePage));

                    it('Выбор значения "Скользящий посуточный график" в поле выбора "Временной критерий"',
                        async () => await dec.simple(el.select.iconXpand,
                            ['Временной критерий', '', 'Скользящий посуточный график', entry.max],
                            el.select));

                    it('Ввод "Название"', async () => await dec.simple(el.input.sendKeys,
                        ['Название', '', params.name, entry.max],
                        el.input));

                    it('Ввод "Описание"', async () => await dec.simple(el.input.sendKeys,
                        ['Описание', '', params.description, entry.max],
                        el.input));
                });

                stz({...params.intervals, countInterval: 1});

                describe('Сохранение', () => {

                    it('Нажатие кнопки "Сохранить изменения"', async () => await dec.simple(el.button.handler,
                        ['Сохранить изменения', entry.max],
                        el.button));

                    it('Отображение уведомления "Сохранено успешно"', async () => await dec.simple(el.success.success,
                        ['Сохранено успешно', entry.max],
                        el.success))
                });
            });

            describe('Проверка таблицы', () => {

                bef();
                aft();

                it('Отображение в таблице 7 строк', async () => await dec.simple(el.table.size,
                    [7, entry.max],
                    el.table));

                it('Ввод в "Поиск..."', async () => await dec.simple(el.input.sendKeys,
                    ['', 'Поиск...', params.name, entry.max],
                    el.input));

                it('Отображение в таблице 4 строки', async () => await dec.simple(el.table.size,
                    [4, entry.max],
                    el.table));
            });

            deleteParams();
        });

    // Скользящий понедельный график
    // Минимальное количество параметров.
    const SWMinParams = () =>
        describe('Скользящий понедельный график. Добавление. Минимальное количество параметров.', () => {

            const params = {
                name: 'SWMinParams',
                nameWeek: 'week1',
            };

            describe('API - добавление', () => {
                bef();
                aft();
                addWeek({
                    name: params.nameWeek,
                    items: {
                        days: [{id: 1}, {id: 1}, {id: 1}, {id: 1}, {id: 1}, {id: 1}, {id: 1}],
                        holidays: [{dayId: 1}, {dayId: 1}, {dayId: 1}, {dayId: 1}, {dayId: 1}, {dayId: 1}, {dayId: 1},
                            {dayId: 1}]
                    }
                });
            });

            describe('Добавление', () => {

                bef();
                aft();

                describe('Добавление общих параметров', () => {

                    it('Нажатие кнопки "Добавить"', async () => await dec.simple(el.butIcBefore.handler,
                        [but.add, entry.max],
                        el.butIcBefore));

                    it('Отображение "title", "url"',
                        async () => await dec.simple(page.accessTemplateScheduleChangePage.initAdd,
                            [entry.max],
                            page.accessTemplateScheduleChangePage));

                    it('Выбор значения "Скользящий понедельный график" в поле выбора "Временной критерий"',
                        async () => await dec.simple(el.select.iconXpand,
                            ['Временной критерий', '', 'Скользящий понедельный график', entry.max],
                            el.select));

                    it('Ввод "Название"', async () => await dec.simple(el.input.sendKeys,
                        ['Название', '', params.name, entry.max],
                        el.input))
                });

                sw({numWeek: 1, countInterval: 1});

                describe('Сохранение', () => {

                    it('Нажатие кнопки "Сохранить изменения"', async () => await dec.simple(el.button.handler,
                        ['Сохранить изменения', entry.max],
                        el.button));

                    it('Отображение уведомления "Сохранено успешно"', async () => await dec.simple(el.success.success,
                        ['Сохранено успешно', entry.max],
                        el.success))
                });
            });

            checkTable(params.name, '', 'Скользящий понедельный график');

            describe('Проверка параметров', () => {

                bef();
                aft();

                describe('Проверка общих праметров', () => {

                    it('Ввод в "Поиск..."', async () => await dec.simple(el.input.sendKeys,
                        ['', 'Поиск...', params.name, entry.max],
                        el.input));

                    it('Отображение в таблице одной строки', async () => await dec.simple(el.table.singleSize,
                        [entry.max],
                        el.table));

                    it('Нажатие по первой строке таблицы', async () => await dec.simple(el.table.strHandler,
                        [1, entry.max],
                        el.table));

                    it('Нажатие кнопки "Редактировать"', async () => await dec.simple(el.butIcBefore.handler,
                        [but.edit, entry.max],
                        el.butIcBefore));

                    it('Отображение "title", "url"',
                        async () => await dec.simple(page.accessTemplateScheduleChangePage.initEdit,
                            [entry.max],
                            page.accessTemplateScheduleChangePage));

                    it('Проверка "Название"', async () => await dec.simpleText(el.input.getValue,
                        ['Название', '', entry.max],
                        params.name,
                        el.input));

                    it('Проверка "Описание"', async () => await dec.simpleText(el.input.getValue,
                        ['Описание', '', entry.max],
                        '',
                        el.input));

                    it('Проверка "Дата начала смены"', async () => {
                        const date = new Date().toISOString().slice(0, 10);
                        await dec.simpleText(el.input.getValue,
                            ['Дата начала смены', '', entry.max],
                            date,
                            el.input)
                    });

                    it('Проверка "Временной критерий"', async () => await dec.simpleText(el.select.getText,
                        ['Временной критерий', 'Скользящий понедельный график', entry.max],
                        'Скользящий понедельный график',
                        el.input))
                });

                checkSW({nameWeek: params.nameWeek, countInterval: 1});
            });

            deleteParams();
        });

    // Минимальное количество параметров - с удалением недели.
    const SWMinParamsDeleteWeek = () =>
        describe('Скользящий понедельный график. Добавление. Минимальное количество параметров - с удалением недели.',
            () => {

            const params = {
                    name: 'SWMinParamsDeleteWeek',
                    week1: 'week1',
                    week2: 'week2',
                };

            describe('API - добавление', () => {
                bef();
                aft();
                addWeek({
                    name: params.week1,
                    items: {
                        days: [{id: 1}, {id: 1}, {id: 1}, {id: 1}, {id: 1}, {id: 1}, {id: 1}],
                        holidays: [{dayId: 1}, {dayId: 1}, {dayId: 1}, {dayId: 1}, {dayId: 1}, {dayId: 1}, {dayId: 1},
                            {dayId: 1}]
                    }
                });
                addWeek({
                    name: params.week2,
                    items: {
                        days: [{id: 1}, {id: 1}, {id: 1}, {id: 1}, {id: 1}, {id: 1}, {id: 1}],
                        holidays: [{dayId: 1}, {dayId: 1}, {dayId: 1}, {dayId: 1}, {dayId: 1}, {dayId: 1}, {dayId: 1},
                            {dayId: 1}]
                    }
                });
            });

            describe('Добавление', () => {

                bef();
                aft();

                describe('Добавление общий параметров', () => {
                    it('Нажатие кнопки "Добавить"', async () => await dec.simple(el.butIcBefore.handler,
                        [but.add, entry.max],
                        el.butIcBefore));

                    it('Отображение "title", "url"',
                        async () => await dec.simple(page.accessTemplateScheduleChangePage.initAdd,
                            [entry.max],
                            page.accessTemplateScheduleChangePage));

                    it('Выбор значения "Скользящий понедельный график" в поле выбора "Временной критерий"',
                        async () => await dec.simple(el.select.iconXpand,
                            ['Временной критерий', '', 'Скользящий понедельный график', entry.max],
                            el.select));

                    it('Ввод "Название"', async () => await dec.simple(el.input.sendKeys,
                        ['Название', '', params.name, entry.max],
                        el.input));
                });

                sw({numWeek: 1, countInterval: 1});
                sw({numWeek: 2, countInterval: 2});

                describe('Удаление недели 2', () => {
                    it('Нажатие кнопки "Удалить" неделю 2', async () =>
                        await dec.simple(page.accessTemplateScheduleChangePage.sWeekSelectedHandler,
                            [2, entry.max],
                            page.accessTemplateScheduleChangePage));

                    it('Отсутствие недели в списки выбранных', async () =>
                        await dec.simple(page.accessTemplateScheduleChangePage.sWeekSelectedList,
                            [1, entry.max],
                            page.accessTemplateScheduleChangePage));
                });

                describe('Сохранение', () => {
                    it('Нажатие кнопки "Сохранить изменения"', async () => await dec.simple(el.button.handler,
                        ['Сохранить изменения', entry.max],
                        el.button));

                    it('Отображение уведомления "Сохранено успешно"', async () => await dec.simple(el.success.success,
                        ['Сохранено успешно', entry.max],
                        el.success));
                });
            });

            checkTable(params.name, '', 'Скользящий понедельный график');

            describe('Проверка параметров', () => {

                bef();
                aft();

                describe('Проверка общих праметров', () => {
                    it('Ввод в "Поиск..."', async () => await dec.simple(el.input.sendKeys,
                        ['', 'Поиск...', params.name, entry.max],
                        el.input));

                    it('Отображение в таблице одной строки', async () => await dec.simple(el.table.singleSize,
                        [entry.max],
                        el.table));

                    it('Нажатие по первой строке таблицы', async () => await dec.simple(el.table.strHandler,
                        [1, entry.max],
                        el.table));

                    it('Нажатие кнопки "Редактировать"', async () => await dec.simple(el.butIcBefore.handler,
                        [but.edit, entry.max],
                        el.butIcBefore));

                    it('Отображение "title", "url"',
                        async () => await dec.simple(page.accessTemplateScheduleChangePage.initEdit,
                            [entry.max],
                            page.accessTemplateScheduleChangePage));

                    it('Проверка "Название"', async () => await dec.simpleText(el.input.getValue,
                        ['Название', '', entry.max],
                        params.name,
                        el.input));

                    it('Проверка "Описание"', async () => await dec.simpleText(el.input.getValue,
                        ['Описание', '', entry.max],
                        '',
                        el.input));

                    it('Проверка "Дата начала смены"', async () => {
                        const date = new Date().toISOString().slice(0, 10);
                        await dec.simpleText(el.input.getValue,
                            ['Дата начала смены', '', entry.max],
                            date,
                            el.input)
                    });

                    it('Проверка "Временной критерий"', async () => await dec.simpleText(el.select.getText,
                        ['Временной критерий', 'Скользящий понедельный график', entry.max],
                        'Скользящий понедельный график',
                        el.input));
                });

                describe('Проверка списка выбранных недель', () => {
                    it('Отображение 1 недели в списке',
                        async () => await dec.simple(page.accessTemplateScheduleChangePage.sWeekSelectedList,
                            [1, entry.max],
                            page.accessTemplateScheduleChangePage));
                });

                checkSW({nameWeek: params.week1, countInterval: 1});
            });

            deleteParams();
        });

    // Максимальное количество параметров.
    const SWMaxParams = () => describe('Скользящий понедельный график. Добавление. Максимальное количество параметров.',
        () => {

        const params = {
                name: 'SWMaxParamsName',
                description: 'SWMaxParamsDescription',
                nameWeek: 'week',
                date: '2022-01-01',
                objDate: {
                    day: '1',
                    month: 'Январь',
                    year: '2022',
                },
                intervals: [...Array(52).keys()].map(item => {
                    return {
                        numWeek: item + 1,
                        countInterval: item + 1
                    }
                }),
            };

        describe('API - добавление', () => {
            bef();
            aft();
            [...Array(52).keys()].forEach(item => {
                addWeek({
                    name: params.nameWeek + (Number(item) + 1),
                    items: {
                        days: [{id: 1}, {id: 1}, {id: 1}, {id: 1}, {id: 1}, {id: 1}, {id: 1}],
                        holidays: [{dayId: 1}, {dayId: 1}, {dayId: 1}, {dayId: 1}, {dayId: 1}, {dayId: 1}, {dayId: 1},
                            {dayId: 1}]
                    }
                });
            });
        });

        describe('Добавление', () => {

            bef();
            aft();

            describe('Добавление общий параметров', () => {
                it('Нажатие кнопки "Добавить"', async () => await dec.simple(el.butIcBefore.handler,
                    [but.add, entry.max],
                    el.butIcBefore));

                it('Отображение "title", "url"',
                    async () => await dec.simple(page.accessTemplateScheduleChangePage.initAdd,
                        [entry.max],
                        page.accessTemplateScheduleChangePage));

                it('Выбор значения "Скользящий понедельный график" в поле выбора "Временной критерий"',
                    async () => await dec.simple(el.select.iconXpand,
                        ['Временной критерий', '', 'Скользящий понедельный график', entry.max],
                        el.select));

                it('Ввод "Название"', async () => await dec.simple(el.input.sendKeys,
                    ['Название', '', params.name, entry.max],
                    el.input));

                it('Ввод "Описание"', async () => await dec.simple(el.input.sendKeys,
                    ['Описание', '', params.description, entry.max],
                    el.input));

                it('Выбор "Дата начала смены"', async () => {

                    await dec.simple(el.input.handler,
                        ['Дата начала смены', '', entry.max],
                        el.input);

                    await dec.simple(el.datepicker.dateParse,
                        [params.objDate, entry.max],
                        el.datepicker);
                });
            });

            params.intervals.forEach(item => sw(item));

            describe('Сохранение', () => {
                it('Нажатие кнопки "Сохранить изменения"', async () => await dec.simple(el.button.handler,
                    ['Сохранить изменения', entry.max],
                    el.button));

                it('Отображение уведомления "Сохранено успешно"', async () => await dec.simple(el.success.success,
                    ['Сохранено успешно', entry.max],
                    el.success));
            });
        });

        checkTable(params.name, params.description, 'Скользящий понедельный график');

        describe('Проверка параметров', () => {

            bef();
            aft();

            describe('Проверка общих праметров', () => {

                    it('Ввод в "Поиск..."', async () => await dec.simple(el.input.sendKeys,
                        ['', 'Поиск...', params.name, entry.max],
                        el.input));

                    it('Отображение в таблице одной строки', async () => await dec.simple(el.table.singleSize,
                        [entry.max],
                        el.table));

                    it('Нажатие по первой строке таблицы', async () => await dec.simple(el.table.strHandler,
                        [1, entry.max],
                        el.table));

                    it('Нажатие кнопки "Редактировать"', async () => await dec.simple(el.butIcBefore.handler,
                        [but.edit, entry.max],
                        el.butIcBefore));

                    it('Отображение "title", "url"',
                        async () => await dec.simple(page.accessTemplateScheduleChangePage.initEdit,
                            [entry.max],
                            page.accessTemplateScheduleChangePage));

                    it('Проверка "Название"', async () => await dec.simpleText(el.input.getValue,
                        ['Название', '', entry.max],
                        params.name,
                        el.input));

                    it('Проверка "Описание"', async () => await dec.simpleText(el.input.getValue,
                        ['Описание', '', entry.max],
                        params.description,
                        el.input));

                    it('Проверка "Дата начала смены"', async () => await dec.simpleText(el.input.getValue,
                        ['Дата начала смены', '', entry.max],
                        params.date,
                        el.input));

                    it('Проверка "Временной критерий"', async () => await dec.simpleText(el.select.getText,
                        ['Временной критерий', 'Скользящий понедельный график', entry.max],
                        'Скользящий понедельный график',
                        el.input));
                });

            params.intervals.forEach(item => {
                checkSW({nameWeek: params.nameWeek  + item.numWeek, countInterval: item.countInterval});
            });
        });

        deleteParams();
    });

    // Проверка "Поиск...".
    const SWSearch = () => describe('Скользящий понедельный график. Добавление. Проверка "Поиск...".', () => {

        const params = {
            name: 'SWSearch',
            week1: 'week1',
            week2: 'week2',
            week22: 'week22',
        };

        describe('API - добавление', () => {
            bef();
            aft();
            addWeek({
                name: params.week1,
                items: {
                    days: [{id: 1}, {id: 1}, {id: 1}, {id: 1}, {id: 1}, {id: 1}, {id: 1}],
                    holidays: [{dayId: 1}, {dayId: 1}, {dayId: 1}, {dayId: 1}, {dayId: 1}, {dayId: 1}, {dayId: 1},
                        {dayId: 1}]
                }
            });
            addWeek({
                name: params.week2,
                items: {
                    days: [{id: 1}, {id: 1}, {id: 1}, {id: 1}, {id: 1}, {id: 1}, {id: 1}],
                    holidays: [{dayId: 1}, {dayId: 1}, {dayId: 1}, {dayId: 1}, {dayId: 1}, {dayId: 1}, {dayId: 1},
                        {dayId: 1}]
                }
            });
            addWeek({
                name: params.week22,
                items: {
                    days: [{id: 1}, {id: 1}, {id: 1}, {id: 1}, {id: 1}, {id: 1}, {id: 1}],
                    holidays: [{dayId: 1}, {dayId: 1}, {dayId: 1}, {dayId: 1}, {dayId: 1}, {dayId: 1}, {dayId: 1},
                        {dayId: 1}]
                }
            });
        });

        describe('Добавление', () => {

            bef();
            aft();

            describe('Добавление общих параметров', () => {

                it('Нажатие кнопки "Добавить"', async () => await dec.simple(el.butIcBefore.handler,
                    [but.add, entry.max],
                    el.butIcBefore));

                it('Отображение "title", "url"',
                    async () => await dec.simple(page.accessTemplateScheduleChangePage.initAdd,
                        [entry.max],
                        page.accessTemplateScheduleChangePage));

                it('Выбор значения "Скользящий понедельный график" в поле выбора "Временной критерий"',
                    async () => await dec.simple(el.select.iconXpand,
                        ['Временной критерий', '', 'Скользящий понедельный график', entry.max],
                        el.select));

                it('Ввод "Название"', async () => await dec.simple(el.input.sendKeys,
                    ['Название', '', params.name, entry.max],
                    el.input));
            });

            describe('Добавление недели с проверкой "Поиск..." c полным совпадением', () => {

                it('Отображение 3 недели в списке выбора недель',
                    async () => await dec.simple(page.accessTemplateScheduleChangePage.sWeekList,
                        [3, entry.max],
                        page.accessTemplateScheduleChangePage));

                it('Ввод в "Поиск..."', async () => await dec.simple(el.input.sendKeys,
                    ['', 'Поиск...', params.week1, entry.max],
                    el.input));

                it('Отображение 1 недели в списке выбора недель',
                    async () => await dec.simple(page.accessTemplateScheduleChangePage.sWeekList,
                        [1, entry.max],
                        page.accessTemplateScheduleChangePage));

                it('Проверка название недели 1',
                    async () => await dec.simpleText(page.accessTemplateScheduleChangePage.sWeekName,
                        [1, entry.max],
                        params.week1,
                        page.accessTemplateScheduleChangePage));

                it('Нажатие кнопки "Добавить" неделю 1',
                    async () => await dec.simple(page.accessTemplateScheduleChangePage.sWeekHandler,
                        [1, entry.max],
                        page.accessTemplateScheduleChangePage));

                it('Отображение 1 недели в списке выбранных недель',
                    async () => await dec.simple(page.accessTemplateScheduleChangePage.sWeekSelectedList,
                        [1, entry.max],
                        page.accessTemplateScheduleChangePage));

                it('Проверка название выбранной недели 1',
                    async () => await dec.simpleText(page.accessTemplateScheduleChangePage.sWeekSelectedName,
                        [1, entry.max],
                        params.week1,
                        page.accessTemplateScheduleChangePage));

                it('Удаление "Поиск..."', async () => await dec.simple(el.input.iconClear,
                    ['', 'Поиск...', entry.max],
                    el.input));
            });

            describe('Добавление недели с проверкой "Поиск..." c частичным совпадением', () => {

                it('Отображение 3 недели в списке выбора недель',
                    async () => await dec.simple(page.accessTemplateScheduleChangePage.sWeekList,
                        [3, entry.max],
                        page.accessTemplateScheduleChangePage));

                it('Ввод в "Поиск..."', async () => await dec.simple(el.input.sendKeys,
                    ['', 'Поиск...', params.week2, entry.max],
                    el.input));

                it('Отображение 2 недели в списке выбора недель',
                    async () => await dec.simple(page.accessTemplateScheduleChangePage.sWeekList,
                        [2, entry.max],
                        page.accessTemplateScheduleChangePage));

                it('Поверка название недели 1',
                    async () => await dec.simpleText(page.accessTemplateScheduleChangePage.sWeekName,
                        [1, entry.max],
                        params.week2,
                        page.accessTemplateScheduleChangePage));

                it('Название неделя 2',async () => await dec.simpleText(page.accessTemplateScheduleChangePage.sWeekName,
                    [2, entry.max],
                    params.week22,
                    page.accessTemplateScheduleChangePage));

                it('Нажатие кнопки "Добавить" неделю 2',
                    async () => await dec.simple(page.accessTemplateScheduleChangePage.sWeekHandler,
                        [2, entry.max],
                        page.accessTemplateScheduleChangePage));

                it('Отображение 2 недели в списке выбранных недель',
                    async () => await dec.simple(page.accessTemplateScheduleChangePage.sWeekSelectedList,
                        [2, entry.max],
                        page.accessTemplateScheduleChangePage));

                it('Проверка названия выбранной неделя 2',
                    async () => await dec.simpleText(page.accessTemplateScheduleChangePage.sWeekSelectedName,
                        [2, entry.max],
                        params.week22,
                        page.accessTemplateScheduleChangePage));
            });

            describe('Сохранение', () => {

                it('Нажатие кнопки "Сохранить изменения"', async () => await dec.simple(el.button.handler,
                    ['Сохранить изменения', entry.max],
                    el.button));

                it('Отображение уведомления "Сохранено успешно"', async () => await dec.simple(el.success.success,
                    ['Сохранено успешно', entry.max],
                    el.success));
            });

        });

        checkTable(params.name, '', 'Скользящий понедельный график');

        describe('Проверка параметров', () => {

            bef();
            aft();

            describe('Проверка общих праметров', () => {

                it('Ввод в "Поиск..."', async () => await dec.simple(el.input.sendKeys,
                    ['', 'Поиск...', params.name, entry.max],
                    el.input));

                it('Отображение в таблице одной строки', async () => await dec.simple(el.table.singleSize,
                    [entry.max],
                    el.table));

                it('Нажатие по первой строке таблицы', async () => await dec.simple(el.table.strHandler,
                    [1, entry.max],
                    el.table));

                it('Нажатие кнопки "Редактировать"', async () => await dec.simple(el.butIcBefore.handler,
                    [but.edit, entry.max],
                    el.butIcBefore));

                it('Отображение "title", "url"',
                    async () => await dec.simple(page.accessTemplateScheduleChangePage.initEdit,
                        [entry.max],
                        page.accessTemplateScheduleChangePage));

                it('Проверка "Название"', async () => await dec.simpleText(el.input.getValue,
                    ['Название', '', entry.max],
                    params.name,
                    el.input));

                it('Проверка "Описание"', async () => await dec.simpleText(el.input.getValue,
                    ['Описание', '', entry.max],
                    '',
                    el.input));

                it('Проверка "Дата начала смены"', async () => {
                    const date = new Date().toISOString().slice(0, 10);
                    await dec.simpleText(el.input.getValue,
                        ['Дата начала смены', '', entry.max],
                        date,
                        el.input)
                });

                it('Проверка "Временной критерий"', async () => await dec.simpleText(el.select.getText,
                    ['Временной критерий', 'Скользящий понедельный график', entry.max],
                    'Скользящий понедельный график',
                    el.input));
            });

            describe('Проверка списка недель для выбора', () => {

                it('Отображение 3 недели в списке',
                    async () => await dec.simple(page.accessTemplateScheduleChangePage.sWeekList,
                        [3, entry.max],
                        page.accessTemplateScheduleChangePage));

                it('Название недели 1',
                    async () => await dec.simpleText(page.accessTemplateScheduleChangePage.sWeekName,
                        [1, entry.max],
                        params.week1,
                        page.accessTemplateScheduleChangePage));

                it('Название недели 2',
                    async () => await dec.simpleText(page.accessTemplateScheduleChangePage.sWeekName,
                        [2, entry.max],
                        params.week2,
                        page.accessTemplateScheduleChangePage));

                it('Название недели 3',
                    async () => await dec.simpleText(page.accessTemplateScheduleChangePage.sWeekName,
                        [3, entry.max],
                        params.week22,
                        page.accessTemplateScheduleChangePage));

            });

            describe('Проверка списка выбранных недель', () => {

                it('Отображение 2 недели в списке',
                    async () => await dec.simple(page.accessTemplateScheduleChangePage.sWeekSelectedList,
                        [2, entry.max],
                        page.accessTemplateScheduleChangePage));

                it('Название недели 1',
                    async () => await dec.simpleText(page.accessTemplateScheduleChangePage.sWeekSelectedName,
                        [1, entry.max],
                        params.week1,
                        page.accessTemplateScheduleChangePage));

                it('Название недели 2',
                    async () => await dec.simpleText(page.accessTemplateScheduleChangePage.sWeekSelectedName,
                        [2, entry.max],
                        params.week22,
                        page.accessTemplateScheduleChangePage));
            });
        });

        deleteParams();
    });

    // Попытка добавления без всех обязательных параметров.
    const SWNoParams = () =>
        describe('Скользящий понедельный график. Добавление. Попытка добавления без всех обязательных параметров.',
            () => {
            const params = {
                week1: 'week1'
            };

            describe('API - добавление', () => {
                bef();
                aft();
                addWeek({
                    name: params.week1,
                    items: {
                        days: [{id: 1}, {id: 1}, {id: 1}, {id: 1}, {id: 1}, {id: 1}, {id: 1}],
                        holidays: [{dayId: 1}, {dayId: 1}, {dayId: 1}, {dayId: 1}, {dayId: 1}, {dayId: 1}, {dayId: 1},
                            {dayId: 1}]
                    }
                });
            });

            describe('Добавление', () => {

                bef();
                aft();

                it('Нажатие кнопки "Добавить"', async () => await dec.simple(el.butIcBefore.handler,
                    [but.add, entry.max],
                    el.butIcBefore));

                it('Отображение "title", "url"',
                    async () => await dec.simple(page.accessTemplateScheduleChangePage.initAdd,
                        [entry.max],
                        page.accessTemplateScheduleChangePage));

                it('Выбор значения "Скользящий понедельный график" в поле выбора "Временной критерий"',
                    async () => await dec.simple(el.select.iconXpand,
                        ['Временной критерий', '', 'Скользящий понедельный график', entry.max],
                        el.select));

                it('Кнопка "Сохранить изменения" - заблокирована', async () => await dec.simple(el.button.disabled,
                    ['Сохранить изменения', entry.max],
                    el.button));

                it('Нажатие кнопки "Сохранить изменения"', async () => await dec.simpleFalse(el.button.handlerNoActive,
                    ['Сохранить изменения', entry.max],
                    el.button));

                it('Отображение "title", "url" не изменилось',
                    async () => await dec.simple(page.accessTemplateScheduleChangePage.initAdd,
                        [entry.max],
                        page.accessTemplateScheduleChangePage));
            });

            deleteParams();

        });

    // Попытка создания без интервального блока.
    const SWNoInterval = () =>
        describe('Скользящий понедельный график. Добавление. Попытка добавления без интервального блока.', () => {

            const params = {
                name: 'SWNoInterval',
                week1: 'week1',
                error: 'Выберите временной критерий'
            };

            describe('API - добавление', () => {
                bef();
                aft();
                addWeek({
                    name: params.week1,
                    items: {
                        days: [{id: 1}, {id: 1}, {id: 1}, {id: 1}, {id: 1}, {id: 1}, {id: 1}],
                        holidays: [{dayId: 1}, {dayId: 1}, {dayId: 1}, {dayId: 1}, {dayId: 1}, {dayId: 1}, {dayId: 1},
                            {dayId: 1}]
                    }
                });
            });

            describe('Добавление', () => {

                bef();
                aft();

                it('Нажатие кнопки "Добавить"', async () => await dec.simple(el.butIcBefore.handler,
                    [but.add, entry.max],
                    el.butIcBefore));

                it('Отображение "title", "url"',
                    async () => await dec.simple(page.accessTemplateScheduleChangePage.initAdd,
                        [entry.max],
                        page.accessTemplateScheduleChangePage));

                it('Ввод "Название"', async () => await dec.simple(el.input.sendKeys,
                    ['Название', '', params.name, entry.max],
                    el.input));

                it('Выбор значения "Скользящий понедельный график" в поле выбора "Временной критерий"',
                    async () => await dec.simple(el.select.iconXpand,
                        ['Временной критерий', '', 'Скользящий понедельный график', entry.max],
                        el.select));

                it('Нажатие кнопки "Сохранить изменения"', async () => await dec.simple(el.button.handler,
                    ['Сохранить изменения', entry.max],
                    el.button));

                it('Отображение ошибки', async () => await dec.simple(el.error.error,
                    [params.error, entry.max],
                    el.error));
            });

            checkFalseTable(params.name);

            deleteParams();
        });

    // Попытка создания без ввода "Название".
    const SWNoName = () =>
        describe('Скользящий понедельный график. Добавление. Попытка создания без ввода "Название".', () => {

            const params = {
                week1: 'week1',
            };

            describe('API - добавление', () => {
                bef();
                aft();
                addWeek({
                    name: params.week1,
                    items: {
                        days: [{id: 1}, {id: 1}, {id: 1}, {id: 1}, {id: 1}, {id: 1}, {id: 1}],
                        holidays: [{dayId: 1}, {dayId: 1}, {dayId: 1}, {dayId: 1}, {dayId: 1}, {dayId: 1}, {dayId: 1},
                            {dayId: 1}]
                    }
                });
            });

            describe('Добавление', () => {

                bef();
                aft();

                it('Нажатие кнопки "Добавить"', async () => await dec.simple(el.butIcBefore.handler,
                    [but.add, entry.max],
                    el.butIcBefore));

                it('Отображение "title", "url"',
                    async () => await dec.simple(page.accessTemplateScheduleChangePage.initAdd,
                        [entry.max],
                        page.accessTemplateScheduleChangePage));

                it('Выбор значения "Скользящий понедельный график" в поле выбора "Временной критерий"',
                    async () => await dec.simple(el.select.iconXpand,
                        ['Временной критерий', '', 'Скользящий понедельный график', entry.max],
                        el.select));

                it('Нажатие кнопки "Добавить" неделю 1',
                    async () => await dec.simple(page.accessTemplateScheduleChangePage.sWeekHandler,
                    [1, entry.max],
                        page.accessTemplateScheduleChangePage));

                it('Отображение 1 недели в списке выбранных недель',
                    async () => await dec.simple(page.accessTemplateScheduleChangePage.sWeekSelectedList,
                        [1, entry.max],
                        page.accessTemplateScheduleChangePage));

                it('Проверка название выбранной недели 1',
                    async () => await dec.simpleText(page.accessTemplateScheduleChangePage.sWeekSelectedName,
                        [1, entry.max],
                        params.week1,
                        page.accessTemplateScheduleChangePage));

                it('Кнопка "Сохранить изменения" - заблокирована', async () => await dec.simple(el.button.disabled,
                    ['Сохранить изменения', entry.max],
                    el.button));

                it('Нажатие кнопки "Сохранить изменения"', async () => await dec.simpleFalse(el.button.handlerNoActive,
                    ['Сохранить изменения', entry.max],
                    el.button));

                it('Отображение "title", "url" не изменилось',
                    async () => await dec.simple(page.accessTemplateScheduleChangePage.initAdd,
                        [entry.max],
                        page.accessTemplateScheduleChangePage));
            });

            deleteParams();
        });

    // Попытка добавления с 53 неделями.
    const SWFailedInterval = () =>
        describe('Скользящий понедельный график. Добавление. Попытка добавления с 53 неделями.', () => {

            const params = {
                name: 'SWFailedInterval',
                week1: 'week1',
                intervals: [...Array(52).keys()].map(item => {
                    return {
                        numWeek: 1,
                        countInterval: item + 1
                    }
                }),
                error: '',
            };

            describe('API - добавление', () => {
                bef();
                aft();
                addWeek({
                    name: params.week1,
                    items: {
                        days: [{id: 1}, {id: 1}, {id: 1}, {id: 1}, {id: 1}, {id: 1}, {id: 1}],
                        holidays: [{dayId: 1}, {dayId: 1}, {dayId: 1}, {dayId: 1}, {dayId: 1}, {dayId: 1}, {dayId: 1},
                            {dayId: 1}]
                    }
                });
            });

            describe('Добавление', () => {

                bef();
                aft();

                describe('Добавление общий параметров', () => {

                    it('Нажатие кнопки "Добавить"', async () => await dec.simple(el.butIcBefore.handler,
                        [but.add, entry.max],
                        el.butIcBefore));

                    it('Отображение "title", "url"',
                        async () => await dec.simple(page.accessTemplateScheduleChangePage.initAdd,
                            [entry.max],
                            page.accessTemplateScheduleChangePage));

                    it('Выбор значения "Скользящий понедельный график" в поле выбора "Временной критерий"',
                        async () => await dec.simple(el.select.iconXpand,
                            ['Временной критерий', '', 'Скользящий понедельный график', entry.max],
                            el.select));

                    it('Ввод "Название"', async () => await dec.simple(el.input.sendKeys,
                        ['Название', '', params.name, entry.max],
                        el.input));
                });

                params.intervals.forEach(item => sw(item));

                describe('Добавление недели 53', () => {

                    it('Двойное нажатие кнопки "Добавить" неделю 1', async () => {
                        await dec.simple(page.accessTemplateScheduleChangePage.sWeekDBHandler,
                            [1, entry.max],
                            page.accessTemplateScheduleChangePage);

                        await dec.simple(page.accessTemplateScheduleChangePage.sWeekDBHandler,
                            [1, entry.max],
                            page.accessTemplateScheduleChangePage);

                        await dec.simple(page.accessTemplateScheduleChangePage.sWeekDBHandler,
                            [1, entry.max],
                            page.accessTemplateScheduleChangePage);
                    });

                    it('Отображение недели в списки выбранных', async () =>
                        await dec.simpleText(page.accessTemplateScheduleChangePage.sWeekSelectedName,
                            [53, entry.max],
                            params.week1,
                            page.accessTemplateScheduleChangePage));
                });

                describe('Сохранение', () => {

                    it('Нажатие кнопки "Сохранить изменения"', async () => await dec.simple(el.button.handler,
                        ['Сохранить изменения', entry.max],
                        el.button));

                    it('Отображение ошибки', async () => await dec.simple(el.error.error,
                        [params.error, entry.max],
                        el.error))
                });
            });

            deleteParams();
        });

    // Попытка дублирования "Название", "Описание" и "Временной критерий" — "Скользящий понедельный график".
    const SWDuplicateSW = () =>
        describe('Скользящий понедельный график. Добавление. Попытка дублирования "Название", "Описание" и '+
            '"Временной критерий" — "Скользящий понедельный график".', () => {

            const params = {
                name: 'SWDuplicateSWName',
                description: 'SWDuplicateSWDescription',
                week1: 'week1',
                date: '2001-01-01',
                error: 'Такое название уже используется',
            };

            describe('API - добавление', () => {
                bef();
                aft();
                addWeek({
                    name: params.week1,
                    items: {
                        days: [{id: 1}, {id: 1}, {id: 1}, {id: 1}, {id: 1}, {id: 1}, {id: 1}],
                        holidays: [{dayId: 1}, {dayId: 1}, {dayId: 1}, {dayId: 1}, {dayId: 1}, {dayId: 1}, {dayId: 1},
                            {dayId: 1}]
                    }
                });
                it('Добавление скользящего понедельного графика', async () => {
                    const cook = await page.base.getCookie('token');
                    const get = await api.getAccessSchedules({type: 2}, cook.text);
                    const parse = JSON.parse(get.text);
                    const sw = {
                        name: params.name,
                        comment: params.description,
                        begin_date: params.date,
                        items: [parse.filter(item => item.name === params.week1)[0]['id']]
                    }
                    await dec.simple(api.putArraySW,
                        [[sw], cook.text],
                        api.putArraySW);
                });
            });

            describe('Добавление', () => {

                bef();
                aft();

                describe('Добавление общиx параметров', () => {

                    it('Нажатие кнопки "Добавить"', async () => await dec.simple(el.butIcBefore.handler,
                        [but.add, entry.max],
                        el.butIcBefore));

                    it('Отображение "title", "url"',
                        async () => await dec.simple(page.accessTemplateScheduleChangePage.initAdd,
                            [entry.max],
                            page.accessTemplateScheduleChangePage));

                    it('Выбор значения "Скользящий понедельный график" в поле выбора "Временной критерий"',
                        async () => await dec.simple(el.select.iconXpand,
                            ['Временной критерий', '', 'Скользящий понедельный график', entry.max],
                            el.select));

                    it('Ввод "Название"', async () => await dec.simple(el.input.sendKeys,
                        ['Название', '', params.name, entry.max],
                        el.input))

                    it('Ввод "Описание"', async () => await dec.simple(el.input.sendKeys,
                        ['Описание', '', params.description, entry.max],
                        el.input))
                });

                sw({numWeek: 1, countInterval: 1});

                describe('Сохранение', () => {

                    it('Нажатие кнопки "Сохранить изменения"', async () => await dec.simple(el.button.handler,
                        ['Сохранить изменения', entry.max],
                        el.button));

                    it('Отображение ошибки', async () => await dec.simple(el.error.error,
                        [params.error, entry.max],
                        el.error))
                })
            });

            checkTable(params.name, params.description, 'Скользящий понедельный график');

            deleteParams();
        });

    // Дублирования "Название", "Описание" и '
    // '"Временной критерий" — Временные зоны", "Недельный график", "Скользящий посуточный график".
    const SWDuplicateTZWSTZ = () =>
        describe('Скользящий понедельный график. Добавление. Дублирования "Название", "Описание" и ' +
            '"Временной критерий" — Временные зоны", "Недельный график", "Скользящий посуточный график".', () => {

            const params = {
                name: 'SWDuplicateTZWSTZName',
                description: 'SWDuplicateTZWSTZDescription',
                date: '2001-01-01',
            };

            describe('API - добавление', () => {
                bef();
                aft();
                addTZ({
                    name: params.name,
                    comment: params.description,
                    items: [{
                        begin: 0,
                        end: 10000
                    }]
                });
                addWeek({
                    name: params.name,
                    comment: params.description,
                    items: {
                        days: [{id: 1}, {id: 1}, {id: 1}, {id: 1}, {id: 1}, {id: 1}, {id: 1}],
                        holidays: [{dayId: 1}, {dayId: 1}, {dayId: 1}, {dayId: 1}, {dayId: 1}, {dayId: 1}, {dayId: 1},
                            {dayId: 1}]
                    }
                });
                addSTZ({
                    name: params.name,
                    comment: params.description,
                    begin_date: params.date,
                    items: {days: [{id: 1}]}
                });
            });

            describe('Добавление', () => {

                bef();

                aft();

                describe('Добавление общий параметров', () => {

                    it('Нажатие кнопки "Добавить"', async () => await dec.simple(el.butIcBefore.handler,
                        [but.add, entry.max],
                        el.butIcBefore));

                    it('Отображение "title", "url"',
                        async () => await dec.simple(page.accessTemplateScheduleChangePage.initAdd,
                            [entry.max],
                            page.accessTemplateScheduleChangePage));

                    it('Выбор значения "Скользящий понедельный график" в поле выбора "Временной критерий"',
                        async () => await dec.simple(el.select.iconXpand,
                            ['Временной критерий', '', 'Скользящий понедельный график', entry.max],
                            el.select));

                    it('Ввод "Название"', async () => await dec.simple(el.input.sendKeys,
                        ['Название', '', params.name, entry.max],
                        el.input))

                    it('Ввод "Описание"', async () => await dec.simple(el.input.sendKeys,
                        ['Описание', '', params.description, entry.max],
                        el.input))
                });

                sw({numWeek: 1, countInterval: 1});

                describe('Сохранение', () => {

                    it('Нажатие кнопки "Сохранить изменения"', async () => await dec.simple(el.button.handler,
                        ['Сохранить изменения', entry.max],
                        el.button));

                    it('Отображение уведомления "Сохранено успешно"', async () => await dec.simple(el.success.success,
                        ['Сохранено успешно', entry.max],
                        el.success))
                })
            });

            describe('Проверка таблицы', () => {

                bef();
                aft();

                it('Отобраюжение в таблице 7 строки', async () => await dec.simple(el.table.size,
                    [7, entry.max],
                    el.table));

                it('Ввод в "Поиск..."', async () => await dec.simple(el.input.sendKeys,
                    ['', 'Поиск...', params.name, entry.max],
                    el.input));

                it('Отображение в таблице 4 строки', async () => await dec.simple(el.table.size,
                    [4, entry.max],
                    el.table));
            });

            deleteParams();
        });

    return {
        TZMinParamsMinInterval,
        TZMinParamsMaxInterval,
        TZMaxParamsMaxInterval,
        TZFailedTimeMinInterval,
        TZFailedTimeMaxInterval,
        TZMaxTimeFailed,
        TZMaxIntervalFailed,
        TZNoParams,
        TZNoInterval,
        TZNoName,
        TZDuplicateTZ,
        TZDuplicateWKsWKsTZ,
        WMinParams,
        WMinParamsMinInterval,
        WMaxParams,
        WNoName,
        WDuplicateW,
        WDuplicateTZKsWKsTZ,
        STZMinParams,
        STZMinEditInterval,
        STZMinRemoveInterval,
        STZMaxParams,
        STZNoParams,
        STZNoName,
        STZNoInterval,
        STZFailedInterval,
        STZDuplicateSTZ,
        STZDuplicateTZKsWsWK,
        SWMinParams,
        SWMinParamsDeleteWeek,
        SWMaxParams,
        SWSearch,
        SWNoParams,
        SWNoInterval,
        SWNoName,
        SWFailedInterval,
        SWDuplicateSW,
        SWDuplicateTZWSTZ
    }
};

// Редактирование временных критериев
const edit = () => {

    // Временные зоны
    // Добавление необязательных параметров с минимальным количеством параметров
    const TZAddParamsMinParams = () =>
        describe('Временные зоны. Редактирование. ' +
            'Добавление необязательных параметров с минимальным количеством параметров.', () => {

            const params = {
                name: 'TZAddParamsMinParamsName',
                description: 'TZAddParamsMinParamsDescription',
                intervals: [{begin: '00:00', end: '00:30'}],
                intervalsValue: [{begin: 0, end: 1800}]
            };

            describe('API - Добавление', () => {
                bef();
                aft();
                addTZ({
                    name: params.name,
                    items: params.intervalsValue
                });
            });

            describe('Редактирование', () => {

                bef();
                aft();

                it('Ввод в "Поиск..."', async () => await dec.simple(el.input.sendKeys,
                    ['', 'Поиск...', params.name, entry.max],
                    el.input));

                it('Отображение в таблице одной строки в таблице', async () => await dec.simple(el.table.singleSize,
                    [entry.max],
                    el.table));

                it('Нажатие по первой строке таблицы', async () => await dec.simple(el.table.strHandler,
                    [1, entry.max],
                    el.table));

                it('Нажатие кнопки "Редактировать"', async () => await dec.simple(el.butIcBefore.handler,
                    [but.edit, entry.max],
                    el.butIcBefore));

                it('Отображение "title", "url"',
                    async () => await dec.simple(page.accessTemplateScheduleChangePage.initEdit,
                        [entry.max],
                        page.accessTemplateScheduleChangePage));

                it('Ввод "Описание"', async () => await dec.simple(el.input.sendKeys,
                    ['Описание', '', params.description, entry.max],
                    el.input));

                it('Нажатие кнопки "Сохранить изменения"', async () => await dec.simple(el.button.handler,
                    ['Сохранить изменения', entry.max],
                    el.button));

                it('Отображение уведомления "Сохранено успешно"', async () => await dec.simple(el.success.success,
                    ['Сохранено успешно', entry.max],
                    el.success));
            });

            checkTable(params.name, params.description, 'Временные зоны');

            describe('Проверка параметров', () => {

                bef();
                aft();

                it('Ввод в "Поиск..."', async () => await dec.simple(el.input.sendKeys,
                    ['', 'Поиск...', params.name, entry.max],
                    el.input));

                it('Отображение в таблице одной строки в таблице', async () => await dec.simple(el.table.singleSize,
                    [entry.max],
                    el.table));

                it('Нажатие по первой строке таблицы', async () => await dec.simple(el.table.strHandler,
                    [1, entry.max],
                    el.table));

                it('Нажатие кнопки "Редактировать"', async () => await dec.simple(el.butIcBefore.handler,
                    [but.edit, entry.max],
                    el.butIcBefore));

                it('Отображение "title", "url"',
                    async () => await dec.simple(page.accessTemplateScheduleChangePage.initEdit,
                        [entry.max],
                        page.accessTemplateScheduleChangePage));

                it('Проверка "Название"', async () => await dec.simpleText(el.input.getValue,
                    ['Название', '', entry.max],
                    params.name,
                    el.input));

                it('Проверка "Описание"', async () => await dec.simpleText(el.input.getValue,
                    ['Описание', '', entry.max],
                    params.description,
                    el.input));

                it('Проверка "Временной критерий"', async () => await dec.simpleText(el.select.getText,
                    ['Временной критерий', 'Временные зоны', entry.max],
                    'Временные зоны',
                    el.input));

                it('Отображение временного блока',
                    async () => await dec.simple(page.accessTemplateScheduleChangePage.time,
                        [1, 1, entry.max],
                        page.accessTemplateScheduleChangePage));

                it('Начало временного блока 1',
                    async () => await dec.simpleText(page.accessTemplateScheduleChangePage.startTimeGetValue,
                        [1, 1, entry.max],
                        params.intervals[0].begin,
                        page.accessTemplateScheduleChangePage));

                it('Окончание временного блока 1',
                    async () => await dec.simpleText(page.accessTemplateScheduleChangePage.endTimeGetValue,
                        [1, 1, entry.max],
                        params.intervals[0].end,
                        page.accessTemplateScheduleChangePage));
            });

            deleteParams();
        });

    // Удаление необязательных параметров с максимальным количеством параметров.
    const TZRemoveParamsMaxParams = () => describe('Временные зоны. Редактирование. ' +
        'Удаление необязательных параметров с максимальным количеством параметров.', () => {

        const params = {
            name: 'TZRemoveParamsMaxParamsName',
            description: 'TZRemoveParamsMaxParamsDescription',
            intervals: [
                {begin: '00:00', end: '05:59'},
                {begin: '06:00', end: '11:59'},
                {begin: '12:00', end: '17:59'},
                {begin: '18:00', end: '23:59'}],
            intervalsValue: [
                {begin: 0, end: 21540},
                {begin: 21600, end: 43140},
                {begin: 43200, end: 64740},
                {begin: 64800, end: 86340}]
        };

        describe('API - Добавление', () => {
            bef();
            aft();
            addTZ({
                name: params.name,
                comment: params.description,
                items: params.intervalsValue
            });
        });

        describe('Редактирование', () => {

            bef();
            aft();

            it('Ввод в "Поиск..."', async () => await dec.simple(el.input.sendKeys,
                ['', 'Поиск...', params.name, entry.max],
                el.input));

            it('Отображение в таблице одной строки в таблице', async () => await dec.simple(el.table.singleSize,
                [entry.max],
                el.table));

            it('Нажатие по первой строке таблицы', async () => await dec.simple(el.table.strHandler,
                [1, entry.max],
                el.table));

            it('Нажатие кнопки "Редактировать"', async () => await dec.simple(el.butIcBefore.handler,
                [but.edit, entry.max],
                el.butIcBefore));

            it('Отображение "title", "url"',
                async () => await dec.simple(page.accessTemplateScheduleChangePage.initEdit,
                    [entry.max],
                    page.accessTemplateScheduleChangePage));

            it('Удаление "Описание"', async () => await dec.simple(el.input.backSpace,
                ['Описание', '', entry.max],
                el.input));

            it('Удаление временного блока 4',
                async () => await dec.simple(page.accessTemplateScheduleChangePage.timeRemove,
                    [1, 4, entry.max],
                    page.accessTemplateScheduleChangePage));

            it('Удаление временного блока 3',
                async () => await dec.simple(page.accessTemplateScheduleChangePage.timeRemove,
                    [1, 3, entry.max],
                    page.accessTemplateScheduleChangePage));

            it('Удаление временного блока 2',
                async () => await dec.simple(page.accessTemplateScheduleChangePage.timeRemove,
                    [1, 2, entry.max],
                    page.accessTemplateScheduleChangePage));

            it('Нажатие кнопки "Сохранить изменения"', async () => await dec.simple(el.button.handler,
                ['Сохранить изменения', entry.max],
                el.button));

            it('Отображение уведомления "Сохранено успешно"', async () => await dec.simple(el.success.success,
                ['Сохранено успешно', entry.max],
                el.success));
        });

        checkTable(params.name, '', 'Временные зоны');

        describe('Проверка параметров', () => {

            bef();
            aft();

            it('Ввод в "Поиск..."', async () => await dec.simple(el.input.sendKeys,
                ['', 'Поиск...', params.name, entry.max],
                el.input));

            it('Отображение в таблице одной строки в таблице', async () => await dec.simple(el.table.singleSize,
                [entry.max],
                el.table));

            it('Нажатие по первой строке таблицы', async () => await dec.simple(el.table.strHandler,
                [1, entry.max],
                el.table));

            it('Нажатие кнопки "Редактировать"', async () => await dec.simple(el.butIcBefore.handler,
                [but.edit, entry.max],
                el.butIcBefore));

            it('Отображение "title", "url"',
                async () => await dec.simple(page.accessTemplateScheduleChangePage.initEdit,
                    [entry.max],
                    page.accessTemplateScheduleChangePage));

            it('Проверка "Название"', async () => await dec.simpleText(el.input.getValue,
                ['Название', '', entry.max],
                params.name,
                el.input));

            it('Проверка "Описание"', async () => await dec.simpleText(el.input.getValue,
                ['Описание', '', entry.max],
                '',
                el.input));

            it('Проверка "Временной критерий"', async () => await dec.simpleText(el.select.getText,
                ['Временной критерий', 'Временные зоны', entry.max],
                'Временные зоны',
                el.input));

            it('Отображение временного блока',
                async () => await dec.simple(page.accessTemplateScheduleChangePage.time,
                    [1, 1, entry.max],
                    page.accessTemplateScheduleChangePage));

            it('Начало временного блока 1',
                async () => await dec.simpleText(page.accessTemplateScheduleChangePage.startTimeGetValue,
                    [1, 1, entry.max],
                    params.intervals[0].begin,
                    page.accessTemplateScheduleChangePage));

            it('Окончание временного блока 1',
                async () => await dec.simpleText(page.accessTemplateScheduleChangePage.endTimeGetValue,
                    [1, 1, entry.max],
                    params.intervals[0].end,
                    page.accessTemplateScheduleChangePage));

            it('Отсутствие временного блока 2',
                async () => await dec.simpleFalse(page.accessTemplateScheduleChangePage.time,
                    [1, 2, entry.min],
                    page.accessTemplateScheduleChangePage));
        });

        deleteParams();
    });

    // Редактирование всех параметров с максимальным количеством параметров.
    const TZEditAllMaxParams = () => describe('Временные зоны. Редактирование. ' +
        'Редактирование всех параметров с максимальным количеством параметров.', () => {

        const params = {
            name: 'TZEditAllMaxParamsName',
            nameUpdate: 'TZEditAllMaxParamsNameUpdate',
            description: 'TZEditAllMaxParamsDescription',
            descriptionUpdate :'TZEditAllMaxParamsDescriptionUpdate',
            intervals: [
                {begin: '01:00', end: '04:59'},
                {begin: '07:00', end: '10:59'},
                {begin: '13:00', end: '16:59'},
                {begin: '19:00', end: '22:59'}],
            intervalsValue: [
                {begin: 0, end: 21540},
                {begin: 21600, end: 43140},
                {begin: 43200, end: 64740},
                {begin: 64800, end: 86340}]
        };

        describe('API - Добавление', () => {
            bef();
            aft();
            addTZ({
                name: params.name,
                comment: params.description,
                items: params.intervalsValue
            });
        });

        describe('Редактирование', () => {

            bef();
            aft();

            it('Ввод в "Поиск..."', async () => await dec.simple(el.input.sendKeys,
                ['', 'Поиск...', params.name, entry.max],
                el.input));

            it('Отображение в таблице одной строки в таблице', async () => await dec.simple(el.table.singleSize,
                [entry.max],
                el.table));

            it('Нажатие по первой строке таблицы', async () => await dec.simple(el.table.strHandler,
                [1, entry.max],
                el.table));

            it('Нажатие кнопки "Редактировать"', async () => await dec.simple(el.butIcBefore.handler,
                [but.edit, entry.max],
                el.butIcBefore));

            it('Отображение "title", "url"',
                async () => await dec.simple(page.accessTemplateScheduleChangePage.initEdit,
                    [entry.max],
                    page.accessTemplateScheduleChangePage));

            it('Удаление "Название"', async () => await dec.simple(el.input.backSpace,
                ['Название', '', entry.max],
                el.input));

            it('Ввод "Название"', async () => await dec.simple(el.input.sendKeys,
                ['Название', '', params.nameUpdate, entry.max],
                el.input));

            it('Удаление "Описание"', async () => await dec.simple(el.input.backSpace,
                ['Описание', '', entry.max],
                el.input));

            it('Ввод "Описание"', async () => await dec.simple(el.input.sendKeys,
                ['Описание', '', params.descriptionUpdate, entry.max],
                el.input));

            it('Изменение начала временного блока 1',
                async () => await dec.simple(page.accessTemplateScheduleChangePage.startTimeSendKeys,
                    [1, 1, params.intervals[0].begin, entry.max],
                    page.accessTemplateScheduleChangePage));

            it('Изменение окончания временного блока 1',
                async () => await dec.simple(page.accessTemplateScheduleChangePage.endTimeSendKeys,
                    [1, 1, params.intervals[0].end, entry.max],
                    page.accessTemplateScheduleChangePage));

            it('Изменение начала временного блока 2',
                async () => await dec.simple(page.accessTemplateScheduleChangePage.startTimeSendKeys,
                    [1, 2, params.intervals[1].begin, entry.max],
                    page.accessTemplateScheduleChangePage));

            it('Изменение окончания временного блока 2',
                async () => await dec.simple(page.accessTemplateScheduleChangePage.endTimeSendKeys,
                    [1, 2, params.intervals[1].end, entry.max],
                    page.accessTemplateScheduleChangePage));

            it('Изменение начала временного блока 3',
                async () => await dec.simple(page.accessTemplateScheduleChangePage.startTimeSendKeys,
                    [1, 3, params.intervals[2].begin, entry.max],
                    page.accessTemplateScheduleChangePage));

            it('Изменение окончания временного блока 3',
                async () => await dec.simple(page.accessTemplateScheduleChangePage.endTimeSendKeys,
                    [1, 3, params.intervals[2].end, entry.max],
                    page.accessTemplateScheduleChangePage));

            it('Изменение начала временного блока 4',
                async () => await dec.simple(page.accessTemplateScheduleChangePage.startTimeSendKeys,
                    [1, 4, params.intervals[3].begin, entry.max],
                    page.accessTemplateScheduleChangePage));

            it('Изменение окончания временного блока 4',
                async () => await dec.simple(page.accessTemplateScheduleChangePage.endTimeSendKeys,
                    [1, 4, params.intervals[3].end, entry.max],
                    page.accessTemplateScheduleChangePage));

            it('Нажатие кнопки "Сохранить изменения"', async () => await dec.simple(el.button.handler,
                ['Сохранить изменения', entry.max],
                el.button));

            it('Отображение уведомления "Сохранено успешно"', async () => await dec.simple(el.success.success,
                ['Сохранено успешно', entry.max],
                el.success));
        });

        checkTable(params.nameUpdate, params.descriptionUpdate, 'Временные зоны');

        describe('Проверка параметров', () => {

            bef();
            aft();

            it('Ввод в "Поиск..."', async () => await dec.simple(el.input.sendKeys,
                ['', 'Поиск...', params.name, entry.max],
                el.input));

            it('Отображение в таблице одной строки в таблице', async () => await dec.simple(el.table.singleSize,
                [entry.max],
                el.table));

            it('Нажатие по первой строке таблицы', async () => await dec.simple(el.table.strHandler,
                [1, entry.max],
                el.table));

            it('Нажатие кнопки "Редактировать"', async () => await dec.simple(el.butIcBefore.handler,
                [but.edit, entry.max],
                el.butIcBefore));

            it('Отображение "title", "url"',
                async () => await dec.simple(page.accessTemplateScheduleChangePage.initEdit,
                    [entry.max],
                    page.accessTemplateScheduleChangePage));

            it('Проверка "Название"', async () => await dec.simpleText(el.input.getValue,
                ['Название', '', entry.max],
                params.nameUpdate,
                el.input));

            it('Проверка "Описание"', async () => await dec.simpleText(el.input.getValue,
                ['Описание', '', entry.max],
                params.descriptionUpdate,
                el.input));

            it('Проверка "Временной критерий"', async () => await dec.simpleText(el.select.getText,
                ['Временной критерий', 'Временные зоны', entry.max],
                'Временные зоны',
                el.input));

            it('Отображение временного блока',
                async () => await dec.simple(page.accessTemplateScheduleChangePage.time,
                    [1, 1, entry.max],
                    page.accessTemplateScheduleChangePage));

            it('Начало временного блока 1',
                async () => await dec.simpleText(page.accessTemplateScheduleChangePage.startTimeGetValue,
                    [1, 1, entry.max],
                    params.intervals[0].begin,
                    page.accessTemplateScheduleChangePage));

            it('Окончание временного блока 1',
                async () => await dec.simpleText(page.accessTemplateScheduleChangePage.endTimeGetValue,
                    [1, 1, entry.max],
                    params.intervals[0].end,
                    page.accessTemplateScheduleChangePage));

            it('Начало временного блока 2',
                async () => await dec.simpleText(page.accessTemplateScheduleChangePage.startTimeGetValue,
                    [1, 2, entry.max],
                    params.intervals[1].begin,
                    page.accessTemplateScheduleChangePage));

            it('Окончание временного блока 2',
                async () => await dec.simpleText(page.accessTemplateScheduleChangePage.endTimeGetValue,
                    [1, 2, entry.max],
                    params.intervals[1].end,
                    page.accessTemplateScheduleChangePage));

            it('Начало временного блока 3',
                async () => await dec.simpleText(page.accessTemplateScheduleChangePage.startTimeGetValue,
                    [1, 3, entry.max],
                    params.intervals[2].begin,
                    page.accessTemplateScheduleChangePage));

            it('Окончание временного блока 3',
                async () => await dec.simpleText(page.accessTemplateScheduleChangePage.endTimeGetValue,
                    [1, 3, entry.max],
                    params.intervals[2].end,
                    page.accessTemplateScheduleChangePage));

            it('Начало временного блока 4',
                async () => await dec.simpleText(page.accessTemplateScheduleChangePage.startTimeGetValue,
                    [1, 4, entry.max],
                    params.intervals[3].begin,
                    page.accessTemplateScheduleChangePage));

            it('Окончание временного блока 4',
                async () => await dec.simpleText(page.accessTemplateScheduleChangePage.endTimeGetValue,
                    [1, 4, entry.max],
                    params.intervals[3].end,
                    page.accessTemplateScheduleChangePage));
        });

        deleteParams();
    });

    // Попытка редактирования с удалением всех параметров с максимальным количеством параметров.
    const TZRemoveAllMaxParams = () => describe('Временные зоны. Редактирование. ' +
        'Попытка редактирования с удалением всех параметров с максимальным количеством параметров.', () =>  {

        const params = {
            name: 'TZRemoveAllMaxParamsName',
            description: 'TZRemoveAllMaxParamsDescription',
            intervals: [{begin: '00:00', end: '23:59'}],
            intervalsValue: [{begin: 0, end: 86340}],
        };

        describe('API - Добавление', () => {
            bef();
            aft();
            addTZ({
                name: params.name,
                comment: params.description,
                items: params.intervalsValue
            });
        });

        describe('Редактирование', () => {

            bef();
            aft();

            it('Ввод в "Поиск..."', async () => await dec.simple(el.input.sendKeys,
                ['', 'Поиск...', params.name, entry.max],
                el.input));

            it('Отображение в таблице одной строки в таблице', async () => await dec.simple(el.table.singleSize,
                [entry.max],
                el.table));

            it('Нажатие по первой строке таблицы', async () => await dec.simple(el.table.strHandler,
                [1, entry.max],
                el.table));

            it('Нажатие кнопки "Редактировать"', async () => await dec.simple(el.butIcBefore.handler,
                [but.edit, entry.max],
                el.butIcBefore));

            it('Отображение "title", "url"',
                async () => await dec.simple(page.accessTemplateScheduleChangePage.initEdit,
                    [entry.max],
                    page.accessTemplateScheduleChangePage));

            it('Удаление "Название"', async () => await dec.simple(el.input.backSpace,
                ['Название', '', entry.max],
                el.input));

            it('Удаление "Описание"', async () => await dec.simple(el.input.backSpace,
                ['Описание', '', entry.max],
                el.input));

            it('Удаление временного блока 1',
                async () => await dec.simple(page.accessTemplateScheduleChangePage.timeRemove,
                    [1, 1, entry.max],
                    page.accessTemplateScheduleChangePage));

            it('Отсутствие временного блока 1',
                async () => await dec.simple(page.accessTemplateScheduleChangePage.noTimeInterval,
                    [1, entry.max],
                    page.accessTemplateScheduleChangePage));

            it('Кнопка "Сохранить изменения" - заблокирована', async () => await dec.simple(el.button.disabled,
                ['Сохранить изменения', entry.max],
                el.button));

            it('Нажатие кнопки "Сохранить изменения"', async () => await dec.simpleFalse(el.button.handlerNoActive,
                ['Сохранить изменения', entry.max],
                el.button));

            it('Отображение "title", "url" не изменилось',
                async () => await dec.simple(page.accessTemplateScheduleChangePage.initEdit,
                    [entry.max],
                    page.accessTemplateScheduleChangePage))
        });

        checkTable(params.name, params.description, 'Временные зоны');

        describe('Проверка параметров', () => {

            bef();
            aft();

            it('Ввод в "Поиск..."', async () => await dec.simple(el.input.sendKeys,
                ['', 'Поиск...', params.name, entry.max],
                el.input));

            it('Отображение в таблице одной строки в таблице', async () => await dec.simple(el.table.singleSize,
                [entry.max],
                el.table));

            it('Нажатие по первой строке таблицы', async () => await dec.simple(el.table.strHandler,
                [1, entry.max],
                el.table));

            it('Нажатие кнопки "Редактировать"', async () => await dec.simple(el.butIcBefore.handler,
                [but.edit, entry.max],
                el.butIcBefore));

            it('Отображение "title", "url"',
                async () => await dec.simple(page.accessTemplateScheduleChangePage.initEdit,
                    [entry.max],
                    page.accessTemplateScheduleChangePage));

            it('Проверка "Название"', async () => await dec.simpleText(el.input.getValue,
                ['Название', '', entry.max],
                params.name,
                el.input));

            it('Проверка "Описание"', async () => await dec.simpleText(el.input.getValue,
                ['Описание', '', entry.max],
                params.description,
                el.input));

            it('Проверка "Временной критерий"', async () => await dec.simpleText(el.select.getText,
                ['Временной критерий', 'Временные зоны', entry.max],
                'Временные зоны',
                el.input));

            it('Отображение временного блока 1',
                async () => await dec.simple(page.accessTemplateScheduleChangePage.time,
                    [1, 1, entry.max],
                    page.accessTemplateScheduleChangePage));

            it('Начало временного блока 1',
                async () => await dec.simpleText(page.accessTemplateScheduleChangePage.startTimeGetValue,
                    [1, 1, entry.max],
                    params.intervals[0].begin,
                    page.accessTemplateScheduleChangePage));

            it('Окончание временного блока 1',
                async () => await dec.simpleText(page.accessTemplateScheduleChangePage.endTimeGetValue,
                    [1, 1, entry.max],
                    params.intervals[0].end,
                    page.accessTemplateScheduleChangePage));
        });

        deleteParams();
    });

    // Попытка редактирования с удалением параметра "Название".
    const TZRemoveName = () => describe('Временные зоны. Редактирование.' +
        'Попытка редактирования с удалением параметра "Название".', () => {

        const params = {
            name: 'TZRemoveNameName',
            description: 'TZRemoveNameDescription',
            intervals: [{begin: '00:00', end: '00:30'}],
            intervalsValue: [{begin: 0, end: 1800}]
        };

        describe('API - Добавление', () => {
            bef();
            aft();
            addTZ({
                name: params.name,
                comment: params.description,
                items: params.intervalsValue
            });
        });

        describe('Редактирование', () => {

            bef();
            aft();

            it('Ввод в "Поиск..."', async () => await dec.simple(el.input.sendKeys,
                ['', 'Поиск...', params.name, entry.max],
                el.input));

            it('Отображение в таблице одной строки в таблице', async () => await dec.simple(el.table.singleSize,
                [entry.max],
                el.table));

            it('Нажатие по первой строке таблицы', async () => await dec.simple(el.table.strHandler,
                [1, entry.max],
                el.table));

            it('Нажатие кнопки "Редактировать"', async () => await dec.simple(el.butIcBefore.handler,
                [but.edit, entry.max],
                el.butIcBefore));

            it('Отображение "title", "url"',
                async () => await dec.simple(page.accessTemplateScheduleChangePage.initEdit,
                    [entry.max],
                    page.accessTemplateScheduleChangePage));

            it('Удаление "Название"', async () => await dec.simple(el.input.backSpace,
                ['Название', '', entry.max],
                el.input));

            it('Кнопка "Сохранить изменения" - заблокирована', async () => await dec.simple(el.button.disabled,
                ['Сохранить изменения', entry.max],
                el.button));

            it('Нажатие кнопки "Сохранить изменения"', async () => await dec.simpleFalse(el.button.handlerNoActive,
                ['Сохранить изменения', entry.max],
                el.button));

            it('Отображение "title", "url" не изменилось',
                async () => await dec.simple(page.accessTemplateScheduleChangePage.initEdit,
                    [entry.max],
                    page.accessTemplateScheduleChangePage));
        });

        checkTable(params.name, params.description, 'Временные зоны');

        describe('Проверка параметров', () => {

            bef();
            aft();

            it('Ввод в "Поиск..."', async () => await dec.simple(el.input.sendKeys,
                ['', 'Поиск...', params.name, entry.max],
                el.input));

            it('Отображение в таблице одной строки в таблице', async () => await dec.simple(el.table.singleSize,
                [entry.max],
                el.table));

            it('Нажатие по первой строке таблицы', async () => await dec.simple(el.table.strHandler,
                [1, entry.max],
                el.table));

            it('Нажатие кнопки "Редактировать"', async () => await dec.simple(el.butIcBefore.handler,
                [but.edit, entry.max],
                el.butIcBefore));

            it('Отображение "title", "url"',
                async () => await dec.simple(page.accessTemplateScheduleChangePage.initEdit,
                    [entry.max],
                    page.accessTemplateScheduleChangePage));

            it('Проверка "Название"', async () => await dec.simpleText(el.input.getValue,
                ['Название', '', entry.max],
                params.name,
                el.input));

            it('Проверка "Описание"', async () => await dec.simpleText(el.input.getValue,
                ['Описание', '', entry.max],
                params.description,
                el.input));

            it('Проверка "Временной критерий"', async () => await dec.simpleText(el.select.getText,
                ['Временной критерий', 'Временные зоны', entry.max],
                'Временные зоны',
                el.input));

            it('Отображение временного блока 1',
                async () => await dec.simple(page.accessTemplateScheduleChangePage.time,
                    [1, 1, entry.max],
                    page.accessTemplateScheduleChangePage));

            it('Начало временного блока 1',
                async () => await dec.simpleText(page.accessTemplateScheduleChangePage.startTimeGetValue,
                    [1, 1, entry.max],
                    params.intervals[0].begin,
                    page.accessTemplateScheduleChangePage));

            it('Окончание временного блока 1 ',
                async () => await dec.simpleText(page.accessTemplateScheduleChangePage.endTimeGetValue,
                    [1, 1, entry.max],
                    params.intervals[0].end,
                    page.accessTemplateScheduleChangePage));

        });

        deleteParams();
    });

    // Попытка редактирования с удалением параметра временного блока.
    const TZRemoveInterval = () => describe('Временные зоны. Редактирование. ' +
        'Попытка редактирования с удалением параметра временного блока.', () => {

        const params = {
            name: 'TZRemoveIntervalName',
            description: 'TZRemoveIntervalDescription',
            intervals: [{begin: '00:00', end: '00:30'}],
            intervalsValue: [{begin: 0, end: 1800}],
            error: 'Заполните все обязательные поля',
        };

        describe('API - Добавление', () => {
            bef();
            aft();
            addTZ({
                name: params.name,
                comment: params.description,
                items: params.intervalsValue
            });
        });

        describe('Редактирование', () => {

            bef();
            aft();

            it('Ввод в "Поиск..."', async () => await dec.simple(el.input.sendKeys,
                ['', 'Поиск...', params.name, entry.max],
                el.input));

            it('Отображение в таблице одной строки в таблице', async () => await dec.simple(el.table.singleSize,
                [entry.max],
                el.table));

            it('Нажатие по первой строке таблицы', async () => await dec.simple(el.table.strHandler,
                [1, entry.max],
                el.table));

            it('Нажатие кнопки "Редактировать"', async () => await dec.simple(el.butIcBefore.handler,
                [but.edit, entry.max],
                el.butIcBefore));

            it('Отображение "title", "url"',
                async () => await dec.simple(page.accessTemplateScheduleChangePage.initEdit,
                    [entry.max],
                    page.accessTemplateScheduleChangePage));

            it('Удаление временного блока',
                async () => await dec.simple(page.accessTemplateScheduleChangePage.timeRemove,
                    [1, 1, entry.max],
                    page.accessTemplateScheduleChangePage));

            it('Отсутствие временного блока',
                async () => await dec.simple(page.accessTemplateScheduleChangePage.noTimeInterval,
                    [1, entry.max],
                    page.accessTemplateScheduleChangePage));

            it('Нажатие кнопки "Сохранить изменения"', async () => await dec.simple(el.button.handler,
                ['Сохранить изменения', entry.max],
                el.button));

            it('Отображение ошибки', async () => await dec.simple(el.error.error,
                [params.error, entry.max],
                el.error));
        });

        checkTable(params.name, params.description, 'Временные зоны');

        describe('Проверка параметров', () => {

            bef();
            aft();

            it('Ввод в "Поиск..."', async () => await dec.simple(el.input.sendKeys,
                ['', 'Поиск...', params.name, entry.max],
                el.input));

            it('Отображение в таблице одной строки в таблице', async () => await dec.simple(el.table.singleSize,
                [entry.max],
                el.table));

            it('Нажатие по первой строке таблицы', async () => await dec.simple(el.table.strHandler,
                [1, entry.max],
                el.table));

            it('Нажатие кнопки "Редактировать"', async () => await dec.simple(el.butIcBefore.handler,
                [but.edit, entry.max],
                el.butIcBefore));

            it('Отображение "title", "url"',
                async () => await dec.simple(page.accessTemplateScheduleChangePage.initEdit,
                    [entry.max],
                    page.accessTemplateScheduleChangePage));

            it('Проверка "Название"', async () => await dec.simpleText(el.input.getValue,
                ['Название', '', entry.max],
                params.name,
                el.input));

            it('Проверка "Описание"', async () => await dec.simpleText(el.input.getValue,
                ['Описание', '', entry.max],
                params.description,
                el.input));

            it('Проверка "Временной критерий"', async () => await dec.simpleText(el.select.getText,
                ['Временной критерий', 'Временные зоны', entry.max],
                'Временные зоны',
                el.input));

            it('Отображение временного блока 1',
                async () => await dec.simple(page.accessTemplateScheduleChangePage.time,
                    [1, 1, entry.max],
                    page.accessTemplateScheduleChangePage));

            it('Начало временного блока 1',
                async () => await dec.simpleText(page.accessTemplateScheduleChangePage.startTimeGetValue,
                    [1, 1, entry.max],
                    params.intervals[0].begin,
                    page.accessTemplateScheduleChangePage));

            it('Окончание временного блока 1 ',
                async () => await dec.simpleText(page.accessTemplateScheduleChangePage.endTimeGetValue,
                    [1, 1, entry.max],
                    params.intervals[0].end,
                    page.accessTemplateScheduleChangePage));
        });

        deleteParams();
    });

    // Попытка редактирования с дублированием "Название", "Описание" и "Временной критерий" — "Временные зоны".
    const TZDuplicateTZ = () => describe('Временные зоны. Редактирование. Попытка редактирования с дублированием ' +
        '"Название", "Описание" и "Временной критерий" — "Временные зоны".', () => {

        const params = {
            tz1: {
                name: 'TZDuplicateTZName',
                description: 'TZDuplicateTZDescription',
                intervalsValue: [{begin: 0, end: 1800}]
            },
            tz2: {
                name: 'Test',
                description: 'Test',
                intervalsValue: [{begin: 0, end: 1800}]
            },
            error: 'Такое название уже используется',
        };

        describe('API - Добавление', () => {
            bef();
            aft();
            addTZ({
                name: params.tz1.name,
                comment: params.tz1.description,
                items: params.tz1.intervalsValue
            });
            addTZ({
                name: params.tz2.name,
                comment: params.tz2.description,
                items: params.tz2.intervalsValue
            });
        });

        describe('Редактирование временной зоны 2', () => {

            bef();
            aft();

            it('Ввод в "Поиск..."', async () => await dec.simple(el.input.sendKeys,
                ['', 'Поиск...', params.tz2.name, entry.max],
                el.input));

            it('Отображение в таблице одной строки в таблице', async () => await dec.simple(el.table.singleSize,
                [entry.max],
                el.table));

            it('Нажатие по первой строке таблицы', async () => await dec.simple(el.table.strHandler,
                [1, entry.max],
                el.table));

            it('Нажатие кнопки "Редактировать"', async () => await dec.simple(el.butIcBefore.handler,
                [but.edit, entry.max],
                el.butIcBefore));

            it('Отображение "title", "url"',
                async () => await dec.simple(page.accessTemplateScheduleChangePage.initEdit,
                    [entry.max],
                    page.accessTemplateScheduleChangePage));

            it('Удаление "Название"', async () => await dec.simple(el.input.backSpace,
                ['Название', '', entry.max],
                el.input));

            it('Ввод "Название" временной зоны 1', async () => await dec.simple(el.input.sendKeys,
                ['Название', '', params.tz1.name, entry.max],
                el.input));

            it('Нажатие кнопки "Сохранить изменения"', async () => await dec.simple(el.button.handler,
                ['Сохранить изменения', entry.max],
                el.button));

            it('Отображение ошибки', async () => await dec.simple(el.error.error,
                [params.error, entry.max],
                el.error));
        });

        describe('Проверка временной зоны 1 в таблице', () =>  {
            checkTable(params.tz1.name, params.tz1.description, 'Временные зоны');
        });

        describe('Проверка временной зоны 2 в таблице', () =>  {
            checkTable(params.tz2.name, params.tz2.description, 'Временные зоны');
        });

        deleteParams();
    });

    // Временные зоны. Редактирование. Дублирования "Название", "Описание" и
    // '"Временной критерий" — "Недельный график", "Скользящий посуточный график", "Скользящий понедельный график".
    const TZDuplicateWSTZSW = () => describe('Временные зоны. Редактирование. Дублирования "Название", "Описание" и ' +
        '"Временной критерий" — "Недельный график", "Скользящий посуточный график", "Скользящий понедельный график".',
        () => {

        const params = {
            name: 'TZDuplicateWKsWKsTZName',
            description: 'TZDuplicateWKsWKsTZDescription',
            start: 0,
            end: 10000,
            date: '2001-01-01',
            error: 'Такое название уже используется',
            tz: {
                name: 'Test',
                description: 'Test',
                time: {
                    start1: '00:00',
                    end1: '23:59',
                    valueStart1: 0,
                    valueEnd1:  86340,
                },
            },
        };

        describe('API - добавление', () => {
            bef();
            aft();
            addTZ({
                name: params.tz.name,
                comment: params.tz.description,
                items: [{
                    begin: params.tz.time.valueStart1,
                    end: params.tz.time.valueEnd1
                }]
            });
            addWeek({
                name: params.name,
                comment: params.description,
                items: {
                    days: [{id: 1}, {id: 1}, {id: 1}, {id: 1}, {id: 1}, {id: 1}, {id: 1}],
                    holidays: [{dayId: 1}, {dayId: 1}, {dayId: 1}, {dayId: 1}, {dayId: 1}, {dayId: 1}, {dayId: 1},
                        {dayId: 1}]
                }
            });
            addSTZ({
                name: params.name,
                comment: params.description,
                begin_date: params.date,
                items: {days: [{id: 1}]}
            });
            it('Добавление скользящего понедельного графика', async () => {
                const cook = await page.base.getCookie('token');
                const get = await api.getAccessSchedules({type: 2}, cook.text);
                const parse = JSON.parse(get.text);
                const sw = {
                    name: params.name,
                    comment: params.description,
                    begin_date: params.date,
                    items: [parse[0]['id']]
                };
                await dec.simple(api.putArraySW,
                    [[sw], cook.text],
                    api.putArraySW)
            });
        });

        describe('Редактирование временной зоны', () => {

            bef();
            aft();

            it('Ввод в "Поиск..."', async () => await dec.simple(el.input.sendKeys,
                ['', 'Поиск...', params.tz.name, entry.max],
                el.input));

            it('Отображение в таблице одной строки в таблице', async () => await dec.simple(el.table.singleSize,
                [entry.max],
                el.table));

            it('Нажатие по первой строке таблицы', async () => await dec.simple(el.table.strHandler,
                [1, entry.max],
                el.table));

            it('Нажатие кнопки "Редактировать"', async () => await dec.simple(el.butIcBefore.handler,
                [but.edit, entry.max],
                el.butIcBefore));

            it('Отображение "title", "url"',
                async () => await dec.simple(page.accessTemplateScheduleChangePage.initEdit,
                    [entry.max],
                    page.accessTemplateScheduleChangePage));

            it('Удаление "Название"', async () => await dec.simple(el.input.backSpace,
                ['Название', '', entry.max],
                el.input));

            it('Ввод "Название"', async () => await dec.simple(el.input.sendKeys,
                ['Название', '', params.name, entry.max],
                el.input));

            it('Нажатие кнопки "Сохранить изменения"', async () => await dec.simple(el.button.handler,
                ['Сохранить изменения', entry.max],
                el.button));

            it('Отображение уведомления "Сохранено успешно"', async () => await dec.simple(el.success.success,
                ['Сохранено успешно', entry.max],
                el.success));
        });

        describe('Проверка таблицы', () => {
            bef();
            aft();

            it('Отображение в таблице 7 строки', async () => await dec.simple(el.table.size,
                [7, entry.max],
                el.table));

            it('Ввод в "Поиск..."', async () => await dec.simple(el.input.sendKeys,
                ['', 'Поиск...', params.name, entry.max],
                el.input));

            it('Отображение в таблице 4 строки', async () => await dec.simple(el.table.size,
                [4, entry.max],
                el.table));
        });

        deleteParams();
    });

    // Недельный график
    // Добавление необязательных параметров с минимальным количеством параметров.
    const WAddParamsMinParams = () => describe('Недельный график. Редактирование. ' +
        'Добавление необязательных параметров с минимальным количеством параметров.', () => {

        const params = {
            name: 'WAddParamsMinParamsName',
            description: 'WAddParamsMinParamsDescription',
            intervals: [
                {name: 'Никогда', title: 'ПН', intervals: []},
                {name: 'Никогда', title: 'ВТ', intervals: []},
                {name: 'Никогда', title: 'СР', intervals: []},
                {name: 'Никогда', title: 'ЧТ', intervals: []},
                {name: 'Никогда', title: 'ПТ', intervals: []},
                {name: 'Никогда', title: 'СБ', intervals: []},
                {name: 'Никогда', title: 'ВС', intervals: []},
                {name: 'Никогда', title: 'Тип 1', intervals: []},
                {name: 'Никогда', title: 'Тип 2', intervals: []},
                {name: 'Никогда', title: 'Тип 3', intervals: []},
                {name: 'Никогда', title: 'Тип 4', intervals: []},
                {name: 'Никогда', title: 'Тип 5', intervals: []},
                {name: 'Никогда', title: 'Тип 6', intervals: []},
                {name: 'Никогда', title: 'Тип 7', intervals: []},
                {name: 'Никогда', title: 'Тип 8', intervals: []}
            ],
        };

        describe('API - добавление', () => {
            bef();
            aft();
            addWeek({
                name: params.name,
                items: {
                    days: [
                        {id: 1},
                        {id: 1},
                        {id: 1},
                        {id: 1},
                        {id: 1},
                        {id: 1},
                        {id: 1}],
                    holidays: [
                        {dayId: 1},
                        {dayId: 1},
                        {dayId: 1},
                        {dayId: 1},
                        {dayId: 1},
                        {dayId: 1},
                        {dayId: 1},
                        {dayId: 1}]
                }
            });
        });

        describe('Редактирование', () => {
            bef();
            aft();

            describe('Редактирование общих параметров', () => {

                it('Ввод в "Поиск..."', async () => await dec.simple(el.input.sendKeys,
                    ['', 'Поиск...', params.name, entry.max],
                    el.input));

                it('Отображение в таблице одной строки', async () => await dec.simple(el.table.singleSize,
                    [entry.max],
                    el.table));

                it('Нажатие по первой строке таблицы', async () => await dec.simple(el.table.strHandler,
                    [1, entry.max],
                    el.table));

                it('Нажатие кнопки "Редактировать"', async () => await dec.simple(el.butIcBefore.handler,
                    [but.edit, entry.max],
                    el.butIcBefore));

                it('Отображение "title", "url"',
                    async () => await dec.simple(page.accessTemplateScheduleChangePage.initEdit,
                        [entry.max],
                        page.accessTemplateScheduleChangePage));

                it('Ввод "Описание"', async () => await dec.simple(el.input.sendKeys,
                    ['Описание', '', params.description, entry.max],
                    el.input));

            });

            params.intervals.forEach((item,index) => week({...item, countInterval: index + 1, tz: 2}));

            describe('Сохранение изменений', () => {

                it('Нажатие кнопки "Сохранить изменения"', async () => await dec.simple(el.button.handler,
                    ['Сохранить изменения', entry.max],
                    el.button));

                it('Отображение уведомления "Сохранено успешно"', async () => await dec.simple(el.success.success,
                    ['Сохранено успешно', entry.max],
                    el.success));
            });
        });

        checkTable(params.name, params.description, 'Недельный график');

        describe('Проверка параметров', () => {

            bef();
            aft();

            describe('Проверка общих праметров', () => {

                it('Ввод в "Поиск..."', async () => await dec.simple(el.input.sendKeys,
                    ['', 'Поиск...', params.name, entry.max],
                    el.input));

                it('Отображение в таблице одной строки', async () => await dec.simple(el.table.singleSize,
                    [entry.max],
                    el.table));

                it('Нажатие по первой строке таблицы', async () => await dec.simple(el.table.strHandler,
                    [1, entry.max],
                    el.table));

                it('Нажатие кнопки "Редактировать"', async () => await dec.simple(el.butIcBefore.handler,
                    [but.edit, entry.max],
                    el.butIcBefore));

                it('Отображение "title", "url"',
                    async () => await dec.simple(page.accessTemplateScheduleChangePage.initEdit,
                        [entry.max],
                        page.accessTemplateScheduleChangePage));

                it('Проверка "Название"', async () => await dec.simpleText(el.input.getValue,
                    ['Название', '', entry.max],
                    params.name,
                    el.input));

                it('Проверка "Описание"', async () => await dec.simpleText(el.input.getValue,
                    ['Описание', '', entry.max],
                    params.description,
                    el.input));

                it('Проверка "Временной критерий"', async () => await dec.simpleText(el.select.getText,
                    ['Временной критерий', 'Недельный график', entry.max],
                    'Недельный график',
                    el.input))
            });

            params.intervals.forEach((item, index) => checkWeek({
                ...item,
                countInterval: index + 1,
                name: 'Всегда',
                intervals: [{begin: '00:00', end: '23:59'}]
            }));
        });

        deleteParams();

    });

    // Удаление необязательных параметров с максимальным количеством параметров.
    const WRemoveParamsMaxParams = () => describe('Недельный график. Редактирование. ' +
        'Удаление необязательных параметров с максимальным количеством параметров.', () => {

        const params = {
            name: 'WRemoveParamsMaxParamsName',
            description: 'WRemoveParamsMaxParams',
            intervals: [
                {
                    name: 'tz1',
                    tz: 3,
                    title: 'ПН',
                    intervals: [{begin: '00:00', end: '00:30'}],
                    intervalsValue: [{begin: 0, end: 1800}]
                },
                {
                    name: 'tz1',
                    tz: 3,
                    title: 'ВТ',
                    intervals: [{begin: '00:00', end: '00:30'}],
                    intervalsValue: [{begin: 0, end: 1800}]
                },
                {
                    name: 'tz1',
                    tz: 3,
                    title: 'СР',
                    intervals: [{begin: '00:00', end: '00:30'}],
                    intervalsValue: [{begin: 0, end: 1800}]
                },
                {
                    name: 'tz1',
                    tz: 3,
                    title: 'ЧТ',
                    intervals: [{begin: '00:00', end: '00:30'}],
                    intervalsValue: [{begin: 0, end: 1800}]
                },
                {
                    name: 'tz1',
                    tz: 3,
                    title: 'ПТ',
                    intervals: [{begin: '00:00', end: '00:30'}],
                    intervalsValue: [{begin: 0, end: 1800}]
                },
                {
                    name: 'tz1',
                    tz: 3,
                    title: 'СБ',
                    intervals: [{begin: '00:00', end: '00:30'}],
                    intervalsValue: [{begin: 0, end: 1800}]
                },
                {
                    name: 'tz1',
                    tz: 3,
                    title: 'ВС',
                    intervals: [{begin: '00:00', end: '00:30'}],
                    intervalsValue: [{begin: 0, end: 1800}]
                },
                {
                    name: 'tz1',
                    tz: 3,
                    title: 'Тип 1',
                    intervals: [{begin: '00:00', end: '00:30'}],
                    intervalsValue: [{begin: 0, end: 1800}]
                },
                {
                    name: 'tz1',
                    tz: 3,
                    title: 'Тип 2',
                    intervals: [{begin: '00:00', end: '00:30'}],
                    intervalsValue: [{begin: 0, end: 1800}]
                },
                {
                    name: 'tz1',
                    tz: 3,
                    title: 'Тип 3',
                    intervals: [{begin: '00:00', end: '00:30'}],
                    intervalsValue: [{begin: 0, end: 1800}]
                },
                {
                    name: 'tz1',
                    tz: 3,
                    title: 'Тип 4',
                    intervals: [{begin: '00:00', end: '00:30'}],
                    intervalsValue: [{begin: 0, end: 1800}]
                },
                {
                    name: 'tz1',
                    tz: 3,
                    title: 'Тип 5',
                    intervals: [{begin: '00:00', end: '00:30'}],
                    intervalsValue: [{begin: 0, end: 1800}]
                },
                {
                    name: 'tz1',
                    tz: 3,
                    title: 'Тип 6',
                    intervals: [{begin: '00:00', end: '00:30'}],
                    intervalsValue: [{begin: 0, end: 1800}]
                },
                {
                    name: 'tz1',
                    tz: 3,
                    title: 'Тип 7',
                    intervals: [{begin: '00:00', end: '00:30'}],
                    intervalsValue: [{begin: 0, end: 1800}]
                },
                {
                    name: 'tz1',
                    tz: 3,
                    title: 'Тип 8',
                    intervals: [{begin: '00:00', end: '00:30'}],
                    intervalsValue: [{begin: 0, end: 1800}]
                }
            ]
        };

        describe('API - добавление', () => {
            bef();
            aft();
            addTZ({
                name: params.intervals[0].name,
                comment: '',
                items: params.intervals[0].intervalsValue
            });
            it('Добавление недельного графика', async () => {
                const cook = await page.base.getCookie('token');
                const arrayTZ = await api.getAccessSchedules({type: 1},  cook.text);
                const arrayTZParse = JSON.parse(arrayTZ.text);
                const tzId = arrayTZParse.intervals.filter(el => el.desc === params.intervals[0].name)[0]['id']
                const week = {
                    name: params.name,
                    comment: params.description,
                    items: {
                        days: [...Array(7).keys()].map(() => {
                            return {
                                id: tzId
                            }
                        }),
                        holidays:
                            [...Array(8).keys()].map(() => {
                                return {
                                    dayId: tzId
                                }
                            })
                    }
                };
                await dec.simple(api.putArrayWeek,
                    [[week], cook.text],
                    api.putArrayWeek);
            });
        });

        describe('Редактирование', () => {

            bef();
            aft();

            describe('Редактирование общих параметров', () => {

                it('Ввод в "Поиск..."', async () => await dec.simple(el.input.sendKeys,
                    ['', 'Поиск...', params.name, entry.max],
                    el.input));

                it('Отображение в таблице одной строки', async () => await dec.simple(el.table.singleSize,
                    [entry.max],
                    el.table));

                it('Нажатие по первой строке таблицы', async () => await dec.simple(el.table.strHandler,
                    [1, entry.max],
                    el.table));

                it('Нажатие кнопки "Редактировать"', async () => await dec.simple(el.butIcBefore.handler,
                    [but.edit, entry.max],
                    el.butIcBefore));

                it('Отображение "title", "url"',
                    async () => await dec.simple(page.accessTemplateScheduleChangePage.initEdit,
                        [entry.max],
                        page.accessTemplateScheduleChangePage));

                it('Удаление "Описание"', async () => await dec.simple(el.input.backSpace,
                    ['Описание', '', entry.max],
                    el.input));
            });

            params.intervals.forEach((item, index) => week({
                ...item,
                countInterval: index + 1,
                tz: 1
            }));

            describe('Сохранение изменений', () => {

                it('Нажатие кнопки "Сохранить изменения"', async () => await dec.simple(el.button.handler,
                    ['Сохранить изменения', entry.max],
                    el.button));

                it('Отображение уведомления "Сохранено успешно"', async () => await dec.simple(el.success.success,
                    ['Сохранено успешно', entry.max],
                    el.success));
            });
        });

        checkTable(params.name, '', 'Недельный график');

        describe('Проверка параметров', () => {

            bef();
            aft();

            describe('Проверка общих праметров', () => {

                it('Ввод в "Поиск..."', async () => await dec.simple(el.input.sendKeys,
                    ['', 'Поиск...', params.name, entry.max],
                    el.input));

                it('Отображение в таблице одной строки', async () => await dec.simple(el.table.singleSize,
                    [entry.max],
                    el.table));

                it('Нажатие по первой строке таблицы', async () => await dec.simple(el.table.strHandler,
                    [1, entry.max],
                    el.table));

                it('Нажатие кнопки "Редактировать"', async () => await dec.simple(el.butIcBefore.handler,
                    [but.edit, entry.max],
                    el.butIcBefore));

                it('Отображение "title", "url"',
                    async () => await dec.simple(page.accessTemplateScheduleChangePage.initEdit,
                        [entry.max],
                        page.accessTemplateScheduleChangePage));

                it('Проверка "Название"', async () => await dec.simpleText(el.input.getValue,
                    ['Название', '', entry.max],
                    params.name,
                    el.input));

                it('Проверка "Описание"', async () => await dec.simpleText(el.input.getValue,
                    ['Описание', '', entry.max],
                    '',
                    el.input));

                it('Проверка "Временной критерий"', async () => await dec.simpleText(el.select.getText,
                    ['Временной критерий', 'Недельный график', entry.max],
                    'Недельный график',
                    el.input))
            });

            params.intervals.forEach((item, index) => checkWeek({
                ...item,
                countInterval: index + 1,
                name: 'Никогда',
                intervals: []
            }));
        });

        deleteParams();
    });

    // Редактирование всех параметров с максимальным количеством параметров.
    const WEditMaxParams = () => describe('Недельный график. Редактирование. ' +
        'Редактирование всех параметров с максимальным количеством параметров.', () => {

        const params = {
            name: 'WEditMaxParamsName',
            description: 'WEditMaxParamsDescription',
            nameUpdate: 'WEditMaxParamsNameUpdate',
            descriptionUpdate: 'WEditMaxParamsDescriptionUpdate',
            tz2: {
                name: 'tz2',
                tz: 4,
                intervals: [{begin: '00:00', end: '23:59'}],
                intervalsValue: [{begin: 0, end: 86340}]
            },
            intervals: [
                {
                    name: 'tz1',
                    tz: 3,
                    title: 'ПН',
                    intervals: [{begin: '00:00', end: '00:30'}],
                    intervalsValue: [{begin: 0, end: 1800}]
                },
                {
                    name: 'tz1',
                    tz: 3,
                    title: 'ВТ',
                    intervals: [{begin: '00:00', end: '00:30'}],
                    intervalsValue: [{begin: 0, end: 1800}]
                },
                {
                    name: 'tz1',
                    tz: 3,
                    title: 'СР',
                    intervals: [{begin: '00:00', end: '00:30'}],
                    intervalsValue: [{begin: 0, end: 1800}]
                },
                {
                    name: 'tz1',
                    tz: 3,
                    title: 'ЧТ',
                    intervals: [{begin: '00:00', end: '00:30'}],
                    intervalsValue: [{begin: 0, end: 1800}]
                },
                {
                    name: 'tz1',
                    tz: 3,
                    title: 'ПТ',
                    intervals: [{begin: '00:00', end: '00:30'}],
                    intervalsValue: [{begin: 0, end: 1800}]
                },
                {
                    name: 'tz1',
                    tz: 3,
                    title: 'СБ',
                    intervals: [{begin: '00:00', end: '00:30'}],
                    intervalsValue: [{begin: 0, end: 1800}]
                },
                {
                    name: 'tz1',
                    tz: 3,
                    title: 'ВС',
                    intervals: [{begin: '00:00', end: '00:30'}],
                    intervalsValue: [{begin: 0, end: 1800}]
                },
                {
                    name: 'tz1',
                    tz: 3,
                    title: 'Тип 1',
                    intervals: [{begin: '00:00', end: '00:30'}],
                    intervalsValue: [{begin: 0, end: 1800}]
                },
                {
                    name: 'tz1',
                    tz: 3,
                    title: 'Тип 2',
                    intervals: [{begin: '00:00', end: '00:30'}],
                    intervalsValue: [{begin: 0, end: 1800}]
                },
                {
                    name: 'tz1',
                    tz: 3,
                    title: 'Тип 3',
                    intervals: [{begin: '00:00', end: '00:30'}],
                    intervalsValue: [{begin: 0, end: 1800}]
                },
                {
                    name: 'tz1',
                    tz: 3,
                    title: 'Тип 4',
                    intervals: [{begin: '00:00', end: '00:30'}],
                    intervalsValue: [{begin: 0, end: 1800}]
                },
                {
                    name: 'tz1',
                    tz: 3,
                    title: 'Тип 5',
                    intervals: [{begin: '00:00', end: '00:30'}],
                    intervalsValue: [{begin: 0, end: 1800}]
                },
                {
                    name: 'tz1',
                    tz: 3,
                    title: 'Тип 6',
                    intervals: [{begin: '00:00', end: '00:30'}],
                    intervalsValue: [{begin: 0, end: 1800}]
                },
                {
                    name: 'tz1',
                    tz: 3,
                    title: 'Тип 7',
                    intervals: [{begin: '00:00', end: '00:30'}],
                    intervalsValue: [{begin: 0, end: 1800}]
                },
                {
                    name: 'tz1',
                    tz: 3,
                    title: 'Тип 8',
                    intervals: [{begin: '00:00', end: '00:30'}],
                    intervalsValue: [{begin: 0, end: 1800}]
                }
            ]
        };

        describe('API - добавление', () => {
            bef();
            aft();
            addTZ({
                name: params.intervals[0].name,
                comment: '',
                items: params.intervals[0].intervalsValue
            });
            addTZ({
                name: params.tz2.name,
                comment: '',
                items: params.tz2.intervalsValue
            });
            it('Добавление недельных графиков', async () => {
                const cook = await page.base.getCookie('token');
                const arrayTZ = await api.getAccessSchedules({type: 1},  cook.text);
                const arrayTZParse = JSON.parse(arrayTZ.text);
                const tzId = arrayTZParse.intervals.filter(el => el.desc === params.intervals[0].name)[0]['id']
                const week = {
                    name: params.name,
                    comment: params.description,
                    items: {
                        days: [...Array(7).keys()].map(() => {
                            return {
                                id: tzId
                            }
                        }),
                        holidays:
                            [...Array(8).keys()].map(() => {
                                return {
                                    dayId: tzId
                                }
                            })
                    }
                }
                await dec.simple(api.putArrayWeek,
                    [[week], cook.text],
                    api.putArrayWeek);
            });
        });

        describe('Редактирование', () => {

            bef();
            aft();

            describe('Редактирование общих параметров', () => {

                it('Ввод в "Поиск..."', async () => await dec.simple(el.input.sendKeys,
                    ['', 'Поиск...', params.name, entry.max],
                    el.input));

                it('Отображение в таблице одной строки', async () => await dec.simple(el.table.singleSize,
                    [entry.max],
                    el.table));

                it('Нажатие по первой строке таблицы', async () => await dec.simple(el.table.strHandler,
                    [1, entry.max],
                    el.table));

                it('Нажатие кнопки "Редактировать"', async () => await dec.simple(el.butIcBefore.handler,
                    [but.edit, entry.max],
                    el.butIcBefore));

                it('Отображение "title", "url"',
                    async () => await dec.simple(page.accessTemplateScheduleChangePage.initEdit,
                        [entry.max],
                        page.accessTemplateScheduleChangePage));

                it('Удаление "Название"', async () => await dec.simple(el.input.backSpace,
                    ['Название', '', entry.max],
                    el.input));

                it('Ввод "Название"', async () => await dec.simple(el.input.sendKeys,
                    ['Название', '', params.nameUpdate, entry.max],
                    el.input));

                it('Удаление "Описание"', async () => await dec.simple(el.input.backSpace,
                    ['Описание', '', entry.max],
                    el.input));

                it('Ввод "Описание"', async () => await dec.simple(el.input.sendKeys,
                    ['Описание', '', params.descriptionUpdate, entry.max],
                    el.input));
            });

            params.intervals.forEach((item, index) => week({
                ...item,
                countInterval: index + 1,
                tz: params.tz2.tz,
                intervals: params.tz2.intervals,
                intervalsValue: params.tz2.intervalsValue
            }));

            describe('Сохранение изменений', () => {

                it('Нажатие кнопки "Сохранить изменения"', async () => await dec.simple(el.button.handler,
                    ['Сохранить изменения', entry.max],
                    el.button));

                it('Отображение уведомления "Сохранено успешно"', async () => await dec.simple(el.success.success,
                    ['Сохранено успешно', entry.max],
                    el.success));
            });
        });

        checkTable(params.nameUpdate, params.descriptionUpdate, 'Недельный график');

        describe('Проверка параметров', () => {

            bef();
            aft();

            describe('Проверка общих праметров', () => {

                it('Ввод в "Поиск..."', async () => await dec.simple(el.input.sendKeys,
                    ['', 'Поиск...', params.name, entry.max],
                    el.input));

                it('Отображение в таблице одной строки', async () => await dec.simple(el.table.singleSize,
                    [entry.max],
                    el.table));

                it('Нажатие по первой строке таблицы', async () => await dec.simple(el.table.strHandler,
                    [1, entry.max],
                    el.table));

                it('Нажатие кнопки "Редактировать"', async () => await dec.simple(el.butIcBefore.handler,
                    [but.edit, entry.max],
                    el.butIcBefore));

                it('Отображение "title", "url"',
                    async () => await dec.simple(page.accessTemplateScheduleChangePage.initEdit,
                        [entry.max],
                        page.accessTemplateScheduleChangePage));

                it('Проверка "Название"', async () => await dec.simpleText(el.input.getValue,
                    ['Название', '', entry.max],
                    params.nameUpdate,
                    el.input));

                it('Проверка "Описание"', async () => await dec.simpleText(el.input.getValue,
                    ['Описание', '', entry.max],
                    params.descriptionUpdate,
                    el.input));

                it('Проверка "Временной критерий"', async () => await dec.simpleText(el.select.getText,
                    ['Временной критерий', 'Недельный график', entry.max],
                    'Недельный график',
                    el.input))
            });

            params.intervals.forEach((item, index) => checkWeek({
                ...item,
                countInterval: index + 1,
                name: params.tz2.name,
                intervals: params.tz2.intervals,
                intervalsValue: params.tz2.intervalsValue
            }));
        });

        deleteParams();

    });

    // Попытка редактирования с удалением параметра  "Название".
    const WRemoveName = () => describe('Недельный график. Редактирование. ' +
        'Попытка редактирования с удалением параметра  "Название".', () => {

        const params = {
            name: 'WRemoveName',
            description: 'WRemoveDescription',
            intervals: [
                {
                    name: 'tz1',
                    tz: 3,
                    title: 'ПН',
                    intervals: [{begin: '00:00', end: '00:30'}],
                    intervalsValue: [{begin: 0, end: 1800}]
                },
                {
                    name: 'tz1',
                    tz: 3,
                    title: 'ВТ',
                    intervals: [{begin: '00:00', end: '00:30'}],
                    intervalsValue: [{begin: 0, end: 1800}]
                },
                {
                    name: 'tz1',
                    tz: 3,
                    title: 'СР',
                    intervals: [{begin: '00:00', end: '00:30'}],
                    intervalsValue: [{begin: 0, end: 1800}]
                },
                {
                    name: 'tz1',
                    tz: 3,
                    title: 'ЧТ',
                    intervals: [{begin: '00:00', end: '00:30'}],
                    intervalsValue: [{begin: 0, end: 1800}]
                },
                {
                    name: 'tz1',
                    tz: 3,
                    title: 'ПТ',
                    intervals: [{begin: '00:00', end: '00:30'}],
                    intervalsValue: [{begin: 0, end: 1800}]
                },
                {
                    name: 'tz1',
                    tz: 3,
                    title: 'СБ',
                    intervals: [{begin: '00:00', end: '00:30'}],
                    intervalsValue: [{begin: 0, end: 1800}]
                },
                {
                    name: 'tz1',
                    tz: 3,
                    title: 'ВС',
                    intervals: [{begin: '00:00', end: '00:30'}],
                    intervalsValue: [{begin: 0, end: 1800}]
                },
                {
                    name: 'tz1',
                    tz: 3,
                    title: 'Тип 1',
                    intervals: [{begin: '00:00', end: '00:30'}],
                    intervalsValue: [{begin: 0, end: 1800}]
                },
                {
                    name: 'tz1',
                    tz: 3,
                    title: 'Тип 2',
                    intervals: [{begin: '00:00', end: '00:30'}],
                    intervalsValue: [{begin: 0, end: 1800}]
                },
                {
                    name: 'tz1',
                    tz: 3,
                    title: 'Тип 3',
                    intervals: [{begin: '00:00', end: '00:30'}],
                    intervalsValue: [{begin: 0, end: 1800}]
                },
                {
                    name: 'tz1',
                    tz: 3,
                    title: 'Тип 4',
                    intervals: [{begin: '00:00', end: '00:30'}],
                    intervalsValue: [{begin: 0, end: 1800}]
                },
                {
                    name: 'tz1',
                    tz: 3,
                    title: 'Тип 5',
                    intervals: [{begin: '00:00', end: '00:30'}],
                    intervalsValue: [{begin: 0, end: 1800}]
                },
                {
                    name: 'tz1',
                    tz: 3,
                    title: 'Тип 6',
                    intervals: [{begin: '00:00', end: '00:30'}],
                    intervalsValue: [{begin: 0, end: 1800}]
                },
                {
                    name: 'tz1',
                    tz: 3,
                    title: 'Тип 7',
                    intervals: [{begin: '00:00', end: '00:30'}],
                    intervalsValue: [{begin: 0, end: 1800}]
                },
                {
                    name: 'tz1',
                    tz: 3,
                    title: 'Тип 8',
                    intervals: [{begin: '00:00', end: '00:30'}],
                    intervalsValue: [{begin: 0, end: 1800}]
                }
            ]
        }

        describe('API - добавление', () => {
            bef();
            aft();
            addTZ({
                name: params.intervals[0].name,
                comment: '',
                items: params.intervals[0].intervalsValue
            });
            it('Добавление недельных графиков', async () => {
                const cook = await page.base.getCookie('token');
                const arrayTZ = await api.getAccessSchedules({type: 1},  cook.text);
                const arrayTZParse = JSON.parse(arrayTZ.text);
                const tzId = arrayTZParse.intervals.filter(el => el.desc === params.intervals[0].name)[0]['id']
                const week = {
                    name: params.name,
                    comment: params.description,
                    items: {
                        days: [...Array(7).keys()].map(() => {
                            return {
                                id: tzId
                            }
                        }),
                        holidays:
                            [...Array(8).keys()].map(() => {
                                return {
                                    dayId: tzId
                                }
                            })
                    }
                }
                await dec.simple(api.putArrayWeek,
                    [[week], cook.text],
                    api.putArrayWeek);
            });
        });

        describe('Редактирование', () => {

            bef();
            aft();

            it('Ввод в "Поиск..."', async () => await dec.simple(el.input.sendKeys,
                ['', 'Поиск...', params.name, entry.max],
                el.input));

            it('Отображение в таблице одной строки', async () => await dec.simple(el.table.singleSize,
                [entry.max],
                el.table));

            it('Нажатие по первой строке таблицы', async () => await dec.simple(el.table.strHandler,
                [1, entry.max],
                el.table));

            it('Нажатие кнопки "Редактировать"', async () => await dec.simple(el.butIcBefore.handler,
                [but.edit, entry.max],
                el.butIcBefore));

            it('Отображение "title", "url"',
                async () => await dec.simple(page.accessTemplateScheduleChangePage.initEdit,
                    [entry.max],
                    page.accessTemplateScheduleChangePage));

            it('Удаление "Название"', async () => await dec.simple(el.input.backSpace,
                ['Название', '', entry.max],
                el.input));

            it('Ввод "Описание"', async () => await dec.simple(el.input.sendKeys,
                ['Описание', '', params.description, entry.max],
                el.input));

            it('Кнопка "Сохранить изменения" - заблокирована', async () => await dec.simple(el.button.disabled,
                ['Сохранить изменения', entry.max],
                el.button));

            it('Нажатие кнопки "Сохранить изменения"', async () => await dec.simpleFalse(el.button.handlerNoActive,
                ['Сохранить изменения', entry.max],
                el.button));

            it('Отображение "title", "url" не изменилось',
                async () => await dec.simple(page.accessTemplateScheduleChangePage.initEdit,
                    [entry.max],
                    page.accessTemplateScheduleChangePage));
        });

        deleteParams();
    });

    // Попытка редактирования с дублированием "Название", "Описание" и "Временной критерий" — "Недельный график".
    const WDuplicateW = () => describe('Недельный график. Редактирование. Попытка редактирования с дублированием ' +
        '"Название", "Описание" и "Временной критерий" — "Недельный график".', () => {

        const params = {
            week1: {
                name: 'WDuplicateWName',
                description: 'WDuplicateWDescription',
            },
            week2: {
                name: 'TestName',
                description: 'TestDescription'
            },
            error: 'Такое название уже используется',
        };

        describe('API - добавление', () => {
            bef();
            aft();
            addWeek({
                name: params.week1.name,
                comment: params.week1.description,
                items: {
                    days: [
                        {id: 1},
                        {id: 1},
                        {id: 1},
                        {id: 1},
                        {id: 1},
                        {id: 1},
                        {id: 1}],
                    holidays: [
                        {dayId: 1},
                        {dayId: 1},
                        {dayId: 1},
                        {dayId: 1},
                        {dayId: 1},
                        {dayId: 1},
                        {dayId: 1},
                        {dayId: 1}]
                }
            });
            addWeek({
                name: params.week2.name,
                comment: params.week2.description,
                items: {
                    days: [
                        {id: 1},
                        {id: 1},
                        {id: 1},
                        {id: 1},
                        {id: 1},
                        {id: 1},
                        {id: 1}],
                    holidays: [
                        {dayId: 1},
                        {dayId: 1},
                        {dayId: 1},
                        {dayId: 1},
                        {dayId: 1},
                        {dayId: 1},
                        {dayId: 1},
                        {dayId: 1}]
                }
            });

        });

        describe('Редактирование второй недели', () => {

            bef();
            aft();

            it('Ввод в "Поиск..."', async () => await dec.simple(el.input.sendKeys,
                ['', 'Поиск...', params.week2.name, entry.max],
                el.input));

            it('Отображение в таблице одной строки', async () => await dec.simple(el.table.singleSize,
                [entry.max],
                el.table));

            it('Нажатие по первой строке таблицы', async () => await dec.simple(el.table.strHandler,
                [1, entry.max],
                el.table));

            it('Нажатие кнопки "Редактировать"', async () => await dec.simple(el.butIcBefore.handler,
                [but.edit, entry.max],
                el.butIcBefore));

            it('Отображение "title", "url"',
                async () => await dec.simple(page.accessTemplateScheduleChangePage.initEdit,
                    [entry.max],
                    page.accessTemplateScheduleChangePage));

            it('Удаление "Название"', async () => await dec.simple(el.input.backSpace,
                ['Название', '', entry.max],
                el.input));

            it('Ввод "Название"', async () => await dec.simple(el.input.sendKeys,
                ['Название', '', params.week1.name, entry.max],
                el.input));

            it('Нажатие кнопки "Сохранить изменения"', async () => await dec.simple(el.button.handler,
                ['Сохранить изменения', entry.max],
                el.button));

            it('Отображение ошибки', async () => await dec.simple(el.error.error,
                [params.error, entry.max],
                el.error));
        });

        checkTable(params.week1.name, params.week1.description, 'Недельный график');

        deleteParams();

    });

    // Недельный график. Редактирование. Дублирования "Название", "Описание" и
    // '"Временной критерий" — "Временные зоны", "Скользящий посуточный график", "Скользящий понедельный график".
    const WDuplicateTZSTZSW = () => describe('Недельный график. Редактирование. Дублирования "Название", "Описание" и '+
        '"Временной критерий" — "Временные зоны", "Скользящий посуточный график", "Скользящий понедельный график"',
        () => {

        const params = {
            name: 'WDuplicateTZSTZSWName',
            description: 'WDuplicateTZSTZSWDescription',
            start: 0,
            end: 10000,
            date: '2001-01-01',
            error: 'Такое название уже используется',
            week: {
                name: 'TestName',
            }
        };

        describe('API - добавление', () => {
            bef();
            aft();

            addTZ({
                name: params.name,
                comment: params.description,
                items: [{
                    begin: params.start,
                    end: params.end
                }]
            });

            addWeek({
                name: params.week.name,
                comment: '',
                items: {
                    days: [{id: 1}, {id: 1}, {id: 1}, {id: 1}, {id: 1}, {id: 1}, {id: 1}],
                    holidays: [{dayId: 1}, {dayId: 1}, {dayId: 1}, {dayId: 1}, {dayId: 1}, {dayId: 1}, {dayId: 1},
                        {dayId: 1}]
                }
            });

            addSTZ({
                name: params.name,
                comment: params.description,
                begin_date: params.date,
                items: {days: [{id: 1}]}
            });

            it('Добавление скользящего понедельного графика', async () => {
                const cook = await page.base.getCookie('token');
                const get = await api.getAccessSchedules({type: 2}, cook.text);
                const parse = JSON.parse(get.text);
                const sw = {
                    name: params.name,
                    comment: params.description,
                    begin_date: params.date,
                    items: [parse[0]['id']]
                };
                await dec.simple(api.putArraySW,
                    [[sw], cook.text],
                    api.putArraySW)
            })

        });

        describe('Редактирование недельного графика', () => {

            bef();
            aft();

            it('Ввод в "Поиск..."', async () => await dec.simple(el.input.sendKeys,
                ['', 'Поиск...', params.week.name, entry.max],
                el.input));

            it('Отображение в таблице одной строки', async () => await dec.simple(el.table.singleSize,
                [entry.max],
                el.table));

            it('Нажатие по первой строке таблицы', async () => await dec.simple(el.table.strHandler,
                [1, entry.max],
                el.table));

            it('Нажатие кнопки "Редактировать"', async () => await dec.simple(el.butIcBefore.handler,
                [but.edit, entry.max],
                el.butIcBefore));

            it('Отображение "title", "url"',
                async () => await dec.simple(page.accessTemplateScheduleChangePage.initEdit,
                    [entry.max],
                    page.accessTemplateScheduleChangePage));

            it('Удаление "Название"', async () => await dec.simple(el.input.backSpace,
                ['Название', '', entry.max],
                el.input));

            it('Ввод "Название"', async () => await dec.simple(el.input.sendKeys,
                ['Название', '', params.name, entry.max],
                el.input));

            it('Нажатие кнопки "Сохранить изменения"', async () => await dec.simple(el.button.handler,
                ['Сохранить изменения', entry.max],
                el.button));

            it('Отображение уведомления "Сохранено успешно"', async () => await dec.simple(el.success.success,
                ['Сохранено успешно', entry.max],
                el.success));
        });

        describe('Проверка таблицы', () => {
            bef();
            aft();

            it('Отображение в таблице 7 строки', async () => await dec.simple(el.table.size,
                [7, entry.max],
                el.table));

            it('Ввод в "Поиск..."', async () => await dec.simple(el.input.sendKeys,
                ['', 'Поиск...', params.name, entry.max],
                el.input));

            it('Отображение в таблице 4 строки', async () => await dec.simple(el.table.size,
                [4, entry.max],
                el.table));
        });

        deleteParams();

    });

    // Скользящий посуточный график
    // Добавление необязательных параметров с минимальным количеством параметров.
    const STZAddParamsMinParams = () => describe('Скользящий посуточный график. Редактирование. ' +
        'Добавление необязательных параметров с минимальным количеством параметров.', () => {

        const params = {
            name: 'STZAddParamsMinParamsName',
            description: 'STZAddParamsMinParamsDescription',
            date: '2001-01-01',
            intervals: {
                name: 'Всегда',
                tz: 2,
                intervals: [{begin: '00:00', end: '23:59'}]
            }
        }

        describe('API - добавление', () => {
            bef();
            aft();
            addSTZ({
                name: params.name,
                begin_date: params.date,
                items: {days: [{id: 1}]}
            });
        });

        describe('Редактирование', () => {

            bef();
            aft();

            describe('Редактирование общих параметров', () => {

                it('Ввод в "Поиск..."', async () => await dec.simple(el.input.sendKeys,
                    ['', 'Поиск...', params.name, entry.max],
                    el.input));

                it('Отображение в таблице одной строки', async () => await dec.simple(el.table.singleSize,
                    [entry.max],
                    el.table));

                it('Нажатие по первой строке таблицы', async () => await dec.simple(el.table.strHandler,
                    [1, entry.max],
                    el.table));

                it('Нажатие кнопки "Редактировать"', async () => await dec.simple(el.butIcBefore.handler,
                    [but.edit, entry.max],
                    el.butIcBefore));

                it('Отображение "title", "url"',
                    async () => await dec.simple(page.accessTemplateScheduleChangePage.initEdit,
                        [entry.max],
                        page.accessTemplateScheduleChangePage));

                it('Ввод "Описание"', async () => await dec.simple(el.input.sendKeys,
                    ['Описание', '', params.description, entry.max],
                    el.input));
            });

            stz({...params.intervals, countInterval: 2});

            describe('Сохранение изменений', () => {

                it('Нажатие кнопки "Сохранить изменения"', async () => await dec.simple(el.button.handler,
                    ['Сохранить изменения', entry.max],
                    el.button));

                it('Отображение уведомления "Сохранено успешно"', async () => await dec.simple(el.success.success,
                    ['Сохранено успешно', entry.max],
                    el.success));
            });
        });

        checkTable(params.name, params.description, 'Скользящий посуточный график');

        describe('Проверка параметров', () => {

            bef();
            aft();

            describe('Проверка общих праметров', () => {

                it('Ввод в "Поиск..."', async () => await dec.simple(el.input.sendKeys,
                    ['', 'Поиск...', params.name, entry.max],
                    el.input));

                it('Отображение в таблице одной строки', async () => await dec.simple(el.table.singleSize,
                    [entry.max],
                    el.table));

                it('Нажатие по первой строке таблицы', async () => await dec.simple(el.table.strHandler,
                    [1, entry.max],
                    el.table));

                it('Нажатие кнопки "Редактировать"', async () => await dec.simple(el.butIcBefore.handler,
                    [but.edit, entry.max],
                    el.butIcBefore));

                it('Отображение "title", "url"',
                    async () => await dec.simple(page.accessTemplateScheduleChangePage.initEdit,
                        [entry.max],
                        page.accessTemplateScheduleChangePage));

                it('Проверка "Название"', async () => await dec.simpleText(el.input.getValue,
                    ['Название', '', entry.max],
                    params.name,
                    el.input));

                it('Проверка "Описание"', async () => await dec.simpleText(el.input.getValue,
                    ['Описание', '', entry.max],
                    params.description,
                    el.input));

                it('Проверка "Дата начала смены"', async () => {
                    await dec.simpleText(el.input.getValue,
                        ['Дата начала смены', '', entry.max],
                        params.date,
                        el.input)
                });

                it('Проверка "Временной критерий"', async () => await dec.simpleText(el.select.getText,
                    ['Временной критерий', 'Скользящий посуточный график', entry.max],
                    'Скользящий посуточный график',
                    el.input));
            });

            checkSTZ({name: 'Никогда', countInterval: 1, intervals: []});
            checkSTZ({...params.intervals, countInterval: 2})
        });

        deleteParams();

    });

    // Удаление необязательных параметров с максимальным количеством параметров.
    const STZRemoveParamsMaxParams = () => describe('Скользящий посуточный график. Редактирование. ' +
        'Удаление необязательных параметров с максимальным количеством параметров.', () => {

        const params = {
            name: 'STZRemoveParamsMaxParamsName',
            description: 'STZRemoveParamsMaxParamsDescription',
            date: '2022-01-01',
            objDate: {
                day: '1',
                month: 'Январь',
                year: '2022',
            },
            intervals: [
                {
                    name: 'Никогда',
                    tz: 1,
                    intervals: [],
                },
                {
                    name: 'Никогда',
                    tz: 1,
                    intervals: [],
                },
                {
                    name: 'Никогда',
                    tz: 1,
                    intervals: [],
                },
                {
                    name: 'Никогда',
                    tz: 1,
                    intervals: [],
                },
                {
                    name: 'Никогда',
                    tz: 1,
                    intervals: [],
                },
                {
                    name: 'Никогда',
                    tz: 1,
                    intervals: [],
                },
                {
                    name: 'Никогда',
                    tz: 1,
                    intervals: [],
                },
                {
                    name: 'Никогда',
                    tz: 1,
                    intervals: [],
                },
                {
                    name: 'Никогда',
                    tz: 1,
                    intervals: [],
                },
                {
                    name: 'Никогда',
                    tz: 1,
                    intervals: [],
                },
                {
                    name: 'Никогда',
                    tz: 1,
                    intervals: [],
                },
                {
                    name: 'Никогда',
                    tz: 1,
                    intervals: [],
                },
                {
                    name: 'Никогда',
                    tz: 1,
                    intervals: [],
                },
                {
                    name: 'Никогда',
                    tz: 1,
                    intervals: [],
                },
                {
                    name: 'Никогда',
                    tz: 1,
                    intervals: [],
                },
                {
                    name: 'Никогда',
                    tz: 1,
                    intervals: [],
                },
                {
                    name: 'Никогда',
                    tz: 1,
                    intervals: [],
                },
                {
                    name: 'Никогда',
                    tz: 1,
                    intervals: [],
                },
                {
                    name: 'Никогда',
                    tz: 1,
                    intervals: [],
                },
                {
                    name: 'Никогда',
                    tz: 1,
                    intervals: [],
                },
                {
                    name: 'Никогда',
                    tz: 1,
                    intervals: [],
                },
                {
                    name: 'Никогда',
                    tz: 1,
                    intervals: [],
                },
                {
                    name: 'Никогда',
                    tz: 1,
                    intervals: [],
                },
                {
                    name: 'Никогда',
                    tz: 1,
                    intervals: [],
                },
                {
                    name: 'Никогда',
                    tz: 1,
                    intervals: [],
                },
                {
                    name: 'Никогда',
                    tz: 1,
                    intervals: [],
                },
                {
                    name: 'Никогда',
                    tz: 1,
                    intervals: [],
                },
                {
                    name: 'Никогда',
                    tz: 1,
                    intervals: [],
                },
                {
                    name: 'Никогда',
                    tz: 1,
                    intervals: [],
                },
                {
                    name: 'Никогда',
                    tz: 1,
                    intervals: [],
                },
            ]
        };

        describe('API - добавление', () => {
            bef();
            aft();
            it('Добавление скользящего посуточного графика', async () => {
                const cook = await page.base.getCookie('token');
                const stz = {
                    name: params.name,
                    comment: params.description,
                    begin_date: params.date,
                    items: {
                        days:  [...Array(params.intervals.length).keys()].map(() => {
                            return {
                                id: 1
                            }
                        })
                    }
                };
                await dec.simple(api.putArraySTZ,
                    [[stz], cook.text],
                    api.putArrayWeek);
            })
        });

        describe('Редактирование', () => {

            bef();
            aft();

            describe('Редактирование общих параметров', () => {

                it('Ввод в "Поиск..."', async () => await dec.simple(el.input.sendKeys,
                    ['', 'Поиск...', params.name, entry.max],
                    el.input));

                it('Отображение в таблице одной строки', async () => await dec.simple(el.table.singleSize,
                    [entry.max],
                    el.table));

                it('Нажатие по первой строке таблицы', async () => await dec.simple(el.table.strHandler,
                    [1, entry.max],
                    el.table));

                it('Нажатие кнопки "Редактировать"', async () => await dec.simple(el.butIcBefore.handler,
                    [but.edit, entry.max],
                    el.butIcBefore));

                it('Отображение "title", "url"',
                    async () => await dec.simple(page.accessTemplateScheduleChangePage.initEdit,
                        [entry.max],
                        page.accessTemplateScheduleChangePage));

                it('Удаление "Описание"', async () => await dec.simple(el.input.backSpace,
                    ['Описание', '', entry.max],
                    el.input));

            });

            [...Array(params.intervals.length - 1).keys()].forEach((item) => {
                describe(`Удаление День ${item + 1}`, () => {
                    it('Нажатие по интервалу',
                        async () => await dec.simple(page.accessTemplateScheduleChangePage.handler,
                            [1, entry.max],
                            page.accessTemplateScheduleChangePage));

                    it('Интервал выделен',
                        async () => await dec.simple(page.accessTemplateScheduleChangePage.intervalActive,
                            [entry.max],
                            page.accessTemplateScheduleChangePage));

                    it('Нажатие кнопки "Удалить"', async () => await dec.simple(el.butIcBefore.handler,
                        [but.delete, entry.max],
                        el.butIcBefore));
                });
            });

            describe('Сохранение изменений', () => {

                it('Нажатие кнопки "Сохранить изменения"', async () => await dec.simple(el.button.handler,
                    ['Сохранить изменения', entry.max],
                    el.button));

                it('Отображение уведомления "Сохранено успешно"', async () => await dec.simple(el.success.success,
                    ['Сохранено успешно', entry.max],
                    el.success));
            });
        });

        checkTable(params.name, '', 'Скользящий посуточный график');

        describe('Проверка параметров', () => {

            bef();
            aft();

            describe('Проверка общих праметров', () => {

                it('Ввод в "Поиск..."', async () => await dec.simple(el.input.sendKeys,
                    ['', 'Поиск...', params.name, entry.max],
                    el.input));

                it('Отображение в таблице одной строки', async () => await dec.simple(el.table.singleSize,
                    [entry.max],
                    el.table));

                it('Нажатие по первой строке таблицы', async () => await dec.simple(el.table.strHandler,
                    [1, entry.max],
                    el.table));

                it('Нажатие кнопки "Редактировать"', async () => await dec.simple(el.butIcBefore.handler,
                    [but.edit, entry.max],
                    el.butIcBefore));

                it('Отображение "title", "url"',
                    async () => await dec.simple(page.accessTemplateScheduleChangePage.initEdit,
                        [entry.max],
                        page.accessTemplateScheduleChangePage));

                it('Проверка "Название"', async () => await dec.simpleText(el.input.getValue,
                    ['Название', '', entry.max],
                    params.name,
                    el.input));

                it('Проверка "Описание"', async () => await dec.simpleText(el.input.getValue,
                    ['Описание', '', entry.max],
                    '',
                    el.input));

                it('Проверка "Дата начала смены"', async () => await dec.simpleText(el.input.getValue,
                    ['Дата начала смены', '', entry.max],
                    params.date,
                    el.input));

                it('Проверка "Временной критерий"', async () => await dec.simpleText(el.select.getText,
                    ['Временной критерий', 'Скользящий посуточный график', entry.max],
                    'Скользящий посуточный график',
                    el.input))
            });

            checkSTZ({name: 'Никогда', countInterval: 1, intervals: []});

            describe('Отсутствие интервала День 2', () => {
                it('Отсутствие интервала', async () => {
                    await dec.simple(page.accessTemplateScheduleChangePage.noTimeInterval,
                        [2, entry.max],
                        page.accessTemplateScheduleChangePage)
                });
            });

        });

        deleteParams();
    });

    // Редактирование всех параметров с максимальным количеством параметров.
    const STZEditALLParamsMaxParams = () => describe('Скользящий посуточный график. Редактирование. ' +
        'Редактирование всех параметров с максимальным количеством параметров.', () => {

        const params = {
            name: 'STZEditALLParamsMaxParamsName',
            description: 'STZEditALLParamsMaxParamsDescription',
            date: '2022-01-01',
            nameUpdate: 'STZEditALLParamsMaxParamsNameUpdate',
            descriptionUpdate: 'STZEditALLParamsMaxParamsDescriptionUpdate',
            dateUpdate: '2022-01-01',
            objDate: {
                day: '1',
                month: 'Январь',
                year: '2022',
            },
            intervals: [
                {
                    name: 'Никогда',
                    tz: 1,
                    intervals: [],
                },
                {
                    name: 'Никогда',
                    tz: 1,
                    intervals: [],
                },
                {
                    name: 'Никогда',
                    tz: 1,
                    intervals: [],
                },
                {
                    name: 'Никогда',
                    tz: 1,
                    intervals: [],
                },
                {
                    name: 'Никогда',
                    tz: 1,
                    intervals: [],
                },
                {
                    name: 'Никогда',
                    tz: 1,
                    intervals: [],
                },
                {
                    name: 'Никогда',
                    tz: 1,
                    intervals: [],
                },
                {
                    name: 'Никогда',
                    tz: 1,
                    intervals: [],
                },
                {
                    name: 'Никогда',
                    tz: 1,
                    intervals: [],
                },
                {
                    name: 'Никогда',
                    tz: 1,
                    intervals: [],
                },
                {
                    name: 'Никогда',
                    tz: 1,
                    intervals: [],
                },
                {
                    name: 'Никогда',
                    tz: 1,
                    intervals: [],
                },
                {
                    name: 'Никогда',
                    tz: 1,
                    intervals: [],
                },
                {
                    name: 'Никогда',
                    tz: 1,
                    intervals: [],
                },
                {
                    name: 'Никогда',
                    tz: 1,
                    intervals: [],
                },
                {
                    name: 'Никогда',
                    tz: 1,
                    intervals: [],
                },
                {
                    name: 'Никогда',
                    tz: 1,
                    intervals: [],
                },
                {
                    name: 'Никогда',
                    tz: 1,
                    intervals: [],
                },
                {
                    name: 'Никогда',
                    tz: 1,
                    intervals: [],
                },
                {
                    name: 'Никогда',
                    tz: 1,
                    intervals: [],
                },
                {
                    name: 'Никогда',
                    tz: 1,
                    intervals: [],
                },
                {
                    name: 'Никогда',
                    tz: 1,
                    intervals: [],
                },
                {
                    name: 'Никогда',
                    tz: 1,
                    intervals: [],
                },
                {
                    name: 'Никогда',
                    tz: 1,
                    intervals: [],
                },
                {
                    name: 'Никогда',
                    tz: 1,
                    intervals: [],
                },
                {
                    name: 'Никогда',
                    tz: 1,
                    intervals: [],
                },
                {
                    name: 'Никогда',
                    tz: 1,
                    intervals: [],
                },
                {
                    name: 'Никогда',
                    tz: 1,
                    intervals: [],
                },
                {
                    name: 'Никогда',
                    tz: 1,
                    intervals: [],
                },
                {
                    name: 'Никогда',
                    tz: 1,
                    intervals: [],
                },
            ]
        };

        describe('API - добавление', () => {
            bef();
            aft();
            it('Добавление скользящего посуточного графика', async () => {
                const cook = await page.base.getCookie('token');
                const stz = {
                    name: params.name,
                    comment: params.description,
                    begin_date: params.date,
                    items: {
                        days:  [...Array(params.intervals.length).keys()].map(() => {
                            return {
                                id: 1
                            }
                        })
                    }
                };
                await dec.simple(api.putArraySTZ,
                    [[stz], cook.text],
                    api.putArrayWeek);
            })
        });

        describe('Редактирование', () => {

            bef();
            aft();

            describe('Редактирование общих параметров', () => {

                it('Ввод в "Поиск..."', async () => await dec.simple(el.input.sendKeys,
                    ['', 'Поиск...', params.name, entry.max],
                    el.input));

                it('Отображение в таблице одной строки', async () => await dec.simple(el.table.singleSize,
                    [entry.max],
                    el.table));

                it('Нажатие по первой строке таблицы', async () => await dec.simple(el.table.strHandler,
                    [1, entry.max],
                    el.table));

                it('Нажатие кнопки "Редактировать"', async () => await dec.simple(el.butIcBefore.handler,
                    [but.edit, entry.max],
                    el.butIcBefore));

                it('Отображение "title", "url"',
                    async () => await dec.simple(page.accessTemplateScheduleChangePage.initEdit,
                        [entry.max],
                        page.accessTemplateScheduleChangePage));

                it('Удаление "Название"', async () => await dec.simple(el.input.backSpace,
                    ['Название', '', entry.max],
                    el.input));

                it('Ввод "Название"', async () => await dec.simple(el.input.sendKeys,
                    ['Название', '', params.nameUpdate, entry.max],
                    el.input));

                it('Удаление "Описание"', async () => await dec.simple(el.input.backSpace,
                    ['Описание', '', entry.max],
                    el.input));

                it('Ввод "Описание"', async () => await dec.simple(el.input.sendKeys,
                    ['Описание', '', params.descriptionUpdate, entry.max],
                    el.input));
            });

            params.intervals.forEach((item, index) => {

                return(
                    describe(`Редактирование интервала День ${index + 1}`, () => {

                        it('Нажатие по интервалу',
                            async () => await dec.simple(page.accessTemplateScheduleChangePage.handler,
                                [`${index + 1}`, entry.max],
                                page.accessTemplateScheduleChangePage));

                        it('Интервал выделен',
                            async () => await dec.simple(page.accessTemplateScheduleChangePage.intervalActive,
                                [entry.max],
                                page.accessTemplateScheduleChangePage));

                        it('Нажатие кнопки "Редактировать"', async () => await dec.simple(el.butIcBefore.handler,
                            [but.edit, entry.max],
                            el.butIcBefore));

                        it('Отображенение модального окна выборы временной зоны',
                            async () => await dec.simple(el.modal.timeZoneModalSelect.init,
                                [entry.max],
                                el.modal.timeZoneModalSelect));

                        it('Отображение интервала', async () => {
                            await dec.simple(el.modal.timeZoneModalSelect.interval,
                                [2, entry.max],
                                el.modal.timeZoneModalSelect)
                        });

                        it('Нажатие по интервалу', async () =>
                            await dec.simple(el.modal.timeZoneModalSelect.intervalHandler,
                                [2, entry.max],
                                el.modal.timeZoneModalSelect));

                        it('Интервал выделен', async () => {
                            await dec.simple(el.modal.timeZoneModalSelect.intervalActive,
                                [entry.max],
                                el.modal.timeZoneModalSelect)
                        });

                        it('Нажатие кнопки "Применить"', async () => await dec.simple(el.button.handler,
                            ['Применить', entry.max],
                            el.button));

                        it('Отсутствие модального окна выборы временной зоны', async () =>
                            await dec.simple(el.modal.timeZoneModalSelect.initClose,
                                [entry.max],
                                el.modal.timeZoneModalSelect));
                    })
                )
            });

            describe('Сохранение изменений', () => {

                it('Нажатие кнопки "Сохранить изменения"', async () => await dec.simple(el.button.handler,
                    ['Сохранить изменения', entry.max],
                    el.button));

                it('Отображение уведомления "Сохранено успешно"', async () => await dec.simple(el.success.success,
                    ['Сохранено успешно', entry.max],
                    el.success));
            });

        });

        checkTable(params.nameUpdate, params.descriptionUpdate, 'Скользящий посуточный график');

        describe('Проверка параметров', () => {

            bef();
            aft();

            describe('Проверка общих праметров', () => {

                it('Ввод в "Поиск..."', async () => await dec.simple(el.input.sendKeys,
                    ['', 'Поиск...', params.nameUpdate, entry.max],
                    el.input));

                it('Отображение в таблице одной строки', async () => await dec.simple(el.table.singleSize,
                    [entry.max],
                    el.table));

                it('Нажатие по первой строке таблицы', async () => await dec.simple(el.table.strHandler,
                    [1, entry.max],
                    el.table));

                it('Нажатие кнопки "Редактировать"', async () => await dec.simple(el.butIcBefore.handler,
                    [but.edit, entry.max],
                    el.butIcBefore));

                it('Отображение "title", "url"',
                    async () => await dec.simple(page.accessTemplateScheduleChangePage.initEdit,
                        [entry.max],
                        page.accessTemplateScheduleChangePage));

                it('Проверка "Название"', async () => await dec.simpleText(el.input.getValue,
                    ['Название', '', entry.max],
                    params.nameUpdate,
                    el.input));

                it('Проверка "Описание"', async () => await dec.simpleText(el.input.getValue,
                    ['Описание', '', entry.max],
                    params.descriptionUpdate,
                    el.input));

                it('Проверка "Дата начала смены"', async () => await dec.simpleText(el.input.getValue,
                    ['Дата начала смены', '', entry.max],
                    params.dateUpdate,
                    el.input));

                it('Проверка "Временной критерий"', async () => await dec.simpleText(el.select.getText,
                    ['Временной критерий', 'Скользящий посуточный график', entry.max],
                    'Скользящий посуточный график',
                    el.input))
            });

            params.intervals.forEach((item, index) => checkSTZ({
                ...item,
                name: 'Всегда',
                countInterval: index + 1,
                intervals: [{begin: '00:00', end: '23:59'}]
            }));

        });

        deleteParams();
    });

    // Попытка редактирования с удалением параметра  "Название".
    const STZEditNoName = () => describe('Скользящий посуточный график. Редактирование. ' +
        'Попытка редактирования с удалением параметра  "Название".', () => {

        const params = {
            name: 'STZEditNoNameName',
            description: 'STZEditNoNameDescription',
            date: '2001-01-01',
            intervals: {
                name: 'Всегда',
                tz: 2,
                intervals: [{begin: '00:00', end: '23:59'}]
            }
        }

        describe('API - добавление', () => {
            bef();
            aft();
            addSTZ({
                name: params.name,
                comment: params.description,
                begin_date: params.date,
                items: {days: [{id: 1}]}
            });
        });

        describe('Редактирование', () => {

            bef();
            aft();

            it('Ввод в "Поиск..."', async () => await dec.simple(el.input.sendKeys,
                ['', 'Поиск...', params.name, entry.max],
                el.input));

            it('Отображение в таблице одной строки', async () => await dec.simple(el.table.singleSize,
                [entry.max],
                el.table));

            it('Нажатие по первой строке таблицы', async () => await dec.simple(el.table.strHandler,
                [1, entry.max],
                el.table));

            it('Нажатие кнопки "Редактировать"', async () => await dec.simple(el.butIcBefore.handler,
                [but.edit, entry.max],
                el.butIcBefore));

            it('Отображение "title", "url"',
                async () => await dec.simple(page.accessTemplateScheduleChangePage.initEdit,
                    [entry.max],
                    page.accessTemplateScheduleChangePage));

            it('Удаление "Название"', async () => await dec.simple(el.input.backSpace,
                ['Название', '', entry.max],
                el.input));

            it('Кнопка "Сохранить изменения" - заблокирована', async () => await dec.simple(el.button.disabled,
                ['Сохранить изменения', entry.max],
                el.button));

            it('Нажатие кнопки "Сохранить изменения"', async () => await dec.simpleFalse(el.button.handlerNoActive,
                ['Сохранить изменения', entry.max],
                el.button));

            it('Отображение "title", "url" не изменилось',
                async () => await dec.simple(page.accessTemplateScheduleChangePage.initEdit,
                    [entry.max],
                    page.accessTemplateScheduleChangePage));
        });

        deleteParams();

    });

    // Попытка редактирования с удалением параметра временного блока.
    const STZEditNoNInterval = () => describe('Скользящий посуточный график. Редактирование. ' +
        'Попытка редактирования с удалением параметра временного блока.', () => {

        const params = {
            name: 'STZEditNoNameName',
            description: 'STZEditNoNameDescription',
            date: '2001-01-01',
            intervals: {
                name: 'Всегда',
                tz: 2,
                intervals: [{begin: '00:00', end: '23:59'}]
            },
            error: 'Не указано ни одного суточного графика'
        }

        describe('API - добавление', () => {
            bef();
            aft();
            addSTZ({
                name: params.name,
                comment: params.description,
                begin_date: params.date,
                items: {days: [{id: 1}]}
            });
        });

        describe('Редактирование', () => {

            bef();
            aft();

            it('Ввод в "Поиск..."', async () => await dec.simple(el.input.sendKeys,
                ['', 'Поиск...', params.name, entry.max],
                el.input));

            it('Отображение в таблице одной строки', async () => await dec.simple(el.table.singleSize,
                [entry.max],
                el.table));

            it('Нажатие по первой строке таблицы', async () => await dec.simple(el.table.strHandler,
                [1, entry.max],
                el.table));

            it('Нажатие кнопки "Редактировать"', async () => await dec.simple(el.butIcBefore.handler,
                [but.edit, entry.max],
                el.butIcBefore));

            it('Отображение "title", "url"',
                async () => await dec.simple(page.accessTemplateScheduleChangePage.initEdit,
                    [entry.max],
                    page.accessTemplateScheduleChangePage));

            it('Нажатие по интервалу',
                async () => await dec.simple(page.accessTemplateScheduleChangePage.handler,
                    [1, entry.max],
                    page.accessTemplateScheduleChangePage));

            it('Интервал выделен',
                async () => await dec.simple(page.accessTemplateScheduleChangePage.intervalActive,
                    [entry.max],
                    page.accessTemplateScheduleChangePage));

            it('Нажатие кнопки "Удалить"', async () => await dec.simple(el.butIcBefore.handler,
                [but.delete, entry.max],
                el.butIcBefore));

            it('Нажатие кнопки "Сохранить изменения"', async () => await dec.simple(el.button.handler,
                ['Сохранить изменения', entry.max],
                el.button));

            it('Отображение ошибки', async () => await dec.simple(el.error.error,
                [params.error, entry.max],
                el.error));
        });

        deleteParams();

    });

    // Попытка дублирования "Название", "Описание" и "Временной критерий" — "Недельный график"
    const STZDuplicateSTZ = () =>
        describe('Скользящий посуточный график. Редактирование. Попытка дублирования "Название", "Описание" и ' +
            '"Временной критерий" — "Скользящий посуточный график".', () => {

            const params = {
                name1: 'STZDuplicateSTZName1',
                name2: 'Test1',
                date: '2001-01-01',
                error: 'Такое название уже используется',
                intervals: {
                    name: 'Всегда',
                    tz: 2,
                    intervals: [{begin: '00:00', end: '23:59'}]
                }
            };

            describe('API - добавление', () => {
                bef();
                aft();
                addSTZ({
                    name: params.name1,
                    comment: '',
                    begin_date: params.date,
                    items: {days: [{id: 1}]}
                });
                addSTZ({
                    name: params.name2,
                    comment: '',
                    begin_date: params.date,
                    items: {days: [{id: 1}]}
                });
            });

            describe('Редактирование', () =>  {

                bef();
                aft();

                it('Ввод в "Поиск..."', async () => await dec.simple(el.input.sendKeys,
                    ['', 'Поиск...', params.name2, entry.max],
                    el.input));

                it('Отображение в таблице одной строки', async () => await dec.simple(el.table.singleSize,
                    [entry.max],
                    el.table));

                it('Нажатие по первой строке таблицы', async () => await dec.simple(el.table.strHandler,
                    [1, entry.max],
                    el.table));

                it('Нажатие кнопки "Редактировать"', async () => await dec.simple(el.butIcBefore.handler,
                    [but.edit, entry.max],
                    el.butIcBefore));

                it('Отображение "title", "url"',
                    async () => await dec.simple(page.accessTemplateScheduleChangePage.initEdit,
                        [entry.max],
                        page.accessTemplateScheduleChangePage));

                it('Удаление "Название"', async () => await dec.simple(el.input.backSpace,
                    ['Название', '', entry.max],
                    el.input));

                it('Ввод "Название"', async () => await dec.simple(el.input.sendKeys,
                    ['Название', '', params.name1, entry.max],
                    el.input));

                it('Нажатие кнопки "Сохранить изменения"', async () => await dec.simple(el.button.handler,
                    ['Сохранить изменения', entry.max],
                    el.button));

                it('Отображение ошибки', async () => await dec.simple(el.error.error,
                    [params.error, entry.max],
                    el.error));
            });

            checkTable(params.name2, '', 'Скользящий посуточный график');

            deleteParams();
        });

    // Дублирования "Название", "Описание" и "Временной критерий" — "Временные зоны", "Недельный график",
    // "Скользящий понедельный график".
    const STZDuplicateTZKsWsWK = () =>
        describe('Скользящий посуточный график. Редактирование. Дублирования "Название", "Описание" и ' +
            '"Временной критерий" —Временные зоны", "Недельный график", "Скользящий понедельный график".', () => {

            const params = {
                name1: 'STZDuplicateSTZName1',
                name2: 'Test1',
                date: '2001-01-01',
                error: 'Такое название уже используется',
                intervals: {
                    name: 'Всегда',
                    tz: 2,
                    intervals: [{begin: '00:00', end: '23:59'}]
                }
            };

            describe('API - добавление', () => {
                bef();
                aft();
                addTZ({
                    name: params.name1,
                    comment: '',
                    items: [{
                        begin: 0,
                        end: 10000
                    }]
                });
                addWeek({
                    name: params.name1,
                    comment: '',
                    items: {
                        days: [{id: 1}, {id: 1}, {id: 1}, {id: 1}, {id: 1}, {id: 1}, {id: 1}],
                        holidays: [{dayId: 1}, {dayId: 1}, {dayId: 1}, {dayId: 1}, {dayId: 1}, {dayId: 1}, {dayId: 1},
                            {dayId: 1}]
                    }
                });
                addSTZ({
                    name: params.name2,
                    comment: '',
                    begin_date: params.date,
                    items: {days: [{id: 1}]}
                });
                it('Добавление скользящего понедельного графика', async () => {
                    const cook = await page.base.getCookie('token');
                    const get = await api.getAccessSchedules({type: 2}, cook.text);
                    const parse = JSON.parse(get.text);
                    const sw = {
                        name: params.name1,
                        comment: '',
                        begin_date: params.date,
                        items: [parse.filter(item => item.name === params.name1)[0]['id']]
                    }
                    await dec.simple(api.putArraySW,
                        [[sw], cook.text],
                        api.putArraySW);
                });
            });

            describe('Редактирование', () =>  {

                bef();
                aft();

                it('Ввод в "Поиск..."', async () => await dec.simple(el.input.sendKeys,
                    ['', 'Поиск...', params.name2, entry.max],
                    el.input));

                it('Отображение в таблице одной строки', async () => await dec.simple(el.table.singleSize,
                    [entry.max],
                    el.table));

                it('Нажатие по первой строке таблицы', async () => await dec.simple(el.table.strHandler,
                    [1, entry.max],
                    el.table));

                it('Нажатие кнопки "Редактировать"', async () => await dec.simple(el.butIcBefore.handler,
                    [but.edit, entry.max],
                    el.butIcBefore));

                it('Отображение "title", "url"',
                    async () => await dec.simple(page.accessTemplateScheduleChangePage.initEdit,
                        [entry.max],
                        page.accessTemplateScheduleChangePage));

                it('Удаление "Название"', async () => await dec.simple(el.input.backSpace,
                    ['Название', '', entry.max],
                    el.input));

                it('Ввод "Название"', async () => await dec.simple(el.input.sendKeys,
                    ['Название', '', params.name1, entry.max],
                    el.input));

                it('Нажатие кнопки "Сохранить изменения"', async () => await dec.simple(el.button.handler,
                    ['Сохранить изменения', entry.max],
                    el.button));

                it('Отображение уведомления "Сохранено успешно"', async () => await dec.simple(el.success.success,
                    ['Сохранено успешно', entry.max],
                    el.success));
            });

            describe('Проверка таблицы', () => {

                bef();
                aft();

                it('Отображение в таблице 7 строк', async () => await dec.simple(el.table.size,
                    [7, entry.max],
                    el.table));

                it('Ввод в "Поиск..."', async () => await dec.simple(el.input.sendKeys,
                    ['', 'Поиск...', params.name1, entry.max],
                    el.input));

                it('Отображение в таблице 4 строки', async () => await dec.simple(el.table.size,
                    [4, entry.max],
                    el.table));
            });

            deleteParams();
        });

    // Добавление необязательных параметров с минимальным количеством параметров.
    const SWEditMinParams = () => describe('Скользящий понедельный график. Редактирование. ' +
        'Добавление необязательных параметров с минимальным количеством параметров.',
        () => {

        const params = {
            name: 'SWMaxParamsName',
            description: 'SWMaxParamsDescription',
            week1: 'week1',
            date: '2022-01-01',
            objDate: {
                day: '1',
                month: 'Январь',
                year: '2022',
            },
            intervals: [...Array(51).keys()].map(item => {
                return {
                    numWeek: 1,
                    countInterval: item + 1
                }
            })
        };

        describe('API - добавление', () => {
            bef();
            aft();
            addWeek({
                name: params.week1,
                items: {
                    days: [{id: 1}, {id: 1}, {id: 1}, {id: 1}, {id: 1}, {id: 1}, {id: 1}],
                    holidays: [{dayId: 1}, {dayId: 1}, {dayId: 1}, {dayId: 1}, {dayId: 1}, {dayId: 1}, {dayId: 1},
                        {dayId: 1}]
                }
            });
            it('Добавление скользящего понедельного графика', async () => {
                const cook = await page.base.getCookie('token');
                const get = await api.getAccessSchedules({type: 2}, cook.text);
                const parse = JSON.parse(get.text);
                const sw = {
                    name: params.name,
                    comment: '',
                    begin_date: params.date,
                    items: [parse.filter(item => item.name === params.week1)[0]['id']]
                }
                await dec.simple(api.putArraySW,
                    [[sw], cook.text],
                    api.putArraySW);
            });
        });

        describe('Редактирование', () => {

            bef();
            aft();

            describe('Редактирование общих параметров', () => {
                it('Ввод в "Поиск..."', async () => await dec.simple(el.input.sendKeys,
                    ['', 'Поиск...', params.name, entry.max],
                    el.input));

                it('Отображение в таблице одной строки', async () => await dec.simple(el.table.singleSize,
                    [entry.max],
                    el.table));

                it('Нажатие по первой строке таблицы', async () => await dec.simple(el.table.strHandler,
                    [1, entry.max],
                    el.table));

                it('Нажатие кнопки "Редактировать"', async () => await dec.simple(el.butIcBefore.handler,
                    [but.edit, entry.max],
                    el.butIcBefore));

                it('Отображение "title", "url"',
                    async () => await dec.simple(page.accessTemplateScheduleChangePage.initEdit,
                        [entry.max],
                        page.accessTemplateScheduleChangePage));

                it('Ввод "Описание"', async () => await dec.simple(el.input.sendKeys,
                    ['Описание', '', params.description, entry.max],
                    el.input));

                it('Выбор "Дата начала смены"', async () => {

                    await dec.simple(el.input.handler,
                        ['Дата начала смены', '', entry.max],
                        el.input);

                    await dec.simple(el.datepicker.dateParse,
                        [params.objDate, entry.max],
                        el.datepicker);
                });
            });

            params.intervals.forEach(item => sw(item));

            describe('Сохранение', () => {
                it('Нажатие кнопки "Сохранить изменения"', async () => await dec.simple(el.button.handler,
                    ['Сохранить изменения', entry.max],
                    el.button));

                it('Отображение уведомления "Сохранено успешно"', async () => await dec.simple(el.success.success,
                    ['Сохранено успешно', entry.max],
                    el.success));
            });
        });

        checkTable(params.name, params.description, 'Скользящий понедельный график');

        describe('Проверка параметров', () => {

            bef();
            aft();

            describe('Проверка общих праметров', () => {

                it('Ввод в "Поиск..."', async () => await dec.simple(el.input.sendKeys,
                    ['', 'Поиск...', params.name, entry.max],
                    el.input));

                it('Отображение в таблице одной строки', async () => await dec.simple(el.table.singleSize,
                    [entry.max],
                    el.table));

                it('Нажатие по первой строке таблицы', async () => await dec.simple(el.table.strHandler,
                    [1, entry.max],
                    el.table));

                it('Нажатие кнопки "Редактировать"', async () => await dec.simple(el.butIcBefore.handler,
                    [but.edit, entry.max],
                    el.butIcBefore));

                it('Отображение "title", "url"',
                    async () => await dec.simple(page.accessTemplateScheduleChangePage.initEdit,
                        [entry.max],
                        page.accessTemplateScheduleChangePage));

                it('Проверка "Название"', async () => await dec.simpleText(el.input.getValue,
                    ['Название', '', entry.max],
                    params.name,
                    el.input));

                it('Проверка "Описание"', async () => await dec.simpleText(el.input.getValue,
                    ['Описание', '', entry.max],
                    params.description,
                    el.input));

                it('Проверка "Дата начала смены"', async () => await dec.simpleText(el.input.getValue,
                    ['Дата начала смены', '', entry.max],
                    params.date,
                    el.input));

                it('Проверка "Временной критерий"', async () => await dec.simpleText(el.select.getText,
                    ['Временной критерий', 'Скользящий понедельный график', entry.max],
                    'Скользящий понедельный график',
                    el.input));
            });

            params.intervals.forEach(item => {
                checkSW({nameWeek: params.week1, countInterval: item.countInterval});
            });
        });

        deleteParams();
    });

    // Удаление необязательных параметров с максимальным количеством параметров.
    const SWEditMaxParams = () => describe('Скользящий понедельный график. Редактирование. ' +
        'Удаление необязательных параметров с максимальным количеством параметров.', () => {

        const params = {
            name: 'SWEditMaxParamsName',
            description: 'SWEditMaxParamsDescription',
            week1: 'week1',
            date: '2022-01-01',
            objDate: {
                day: '1',
                month: 'Январь',
                year: '2022',
            },
            intervals: [...Array(52).keys()].map(item => {
                return {
                    numWeek: 1,
                    countInterval: item + 1
                }
            })
        }

        describe('API - добавление', () => {
            bef();
            aft();
            addWeek({
                name: params.week1,
                items: {
                    days: [{id: 1}, {id: 1}, {id: 1}, {id: 1}, {id: 1}, {id: 1}, {id: 1}],
                    holidays: [{dayId: 1}, {dayId: 1}, {dayId: 1}, {dayId: 1}, {dayId: 1}, {dayId: 1}, {dayId: 1},
                        {dayId: 1}]
                }
            });
            it('Добавление скользящего понедельного графика', async () => {
                const cook = await page.base.getCookie('token');
                const get = await api.getAccessSchedules({type: 2}, cook.text);
                const parse = JSON.parse(get.text);
                const filter = parse.filter(item => item.name === params.week1)[0]['id'];
                const sw = {
                    name: params.name,
                    comment: '',
                    begin_date: params.date,
                    items: [...Array(52).keys()].map(() => filter)
                }
                await dec.simple(api.putArraySW,
                    [[sw], cook.text],
                    api.putArraySW);
            });
        });

        describe('Редактирование', () => {

            bef();
            aft();

            describe('Редактирование общих параметров', () => {
                it('Ввод в "Поиск..."', async () => await dec.simple(el.input.sendKeys,
                    ['', 'Поиск...', params.name, entry.max],
                    el.input));

                it('Отображение в таблице одной строки', async () => await dec.simple(el.table.singleSize,
                    [entry.max],
                    el.table));

                it('Нажатие по первой строке таблицы', async () => await dec.simple(el.table.strHandler,
                    [1, entry.max],
                    el.table));

                it('Нажатие кнопки "Редактировать"', async () => await dec.simple(el.butIcBefore.handler,
                    [but.edit, entry.max],
                    el.butIcBefore));

                it('Отображение "title", "url"',
                    async () => await dec.simple(page.accessTemplateScheduleChangePage.initEdit,
                        [entry.max],
                        page.accessTemplateScheduleChangePage));

                it('Удаление "Описание"', async () => await dec.simple(el.input.backSpace,
                    ['Описание', '', entry.max],
                    el.input));

                it('Выбор "Дата начала смены"', async () => {

                    await dec.simple(el.input.handler,
                        ['Дата начала смены', '', entry.max],
                        el.input);

                    await dec.simple(el.datepicker.dateParse,
                        [params.objDate, entry.max],
                        el.datepicker);
                });
            });

            [...Array(51).keys()].forEach(item => {
                describe(`Удаление недели ${item + 1}`, () => {
                    it(`Нажатие кнопки "Удалить" неделю ${item + 1}`, async () =>
                        await dec.simple(page.accessTemplateScheduleChangePage.sWeekSelectedHandler,
                            [1, entry.max],
                            page.accessTemplateScheduleChangePage));

                    it('Отсутствие недели в списки выбранных', async () =>
                        await dec.simple(page.accessTemplateScheduleChangePage.sWeekSelectedList,
                            [params.intervals.length - (item + 1), entry.max],
                            page.accessTemplateScheduleChangePage));
                });
            });

            describe('Сохранение', () => {
                it('Нажатие кнопки "Сохранить изменения"', async () => await dec.simple(el.button.handler,
                    ['Сохранить изменения', entry.max],
                    el.button));

                it('Отображение уведомления "Сохранено успешно"', async () => await dec.simple(el.success.success,
                    ['Сохранено успешно', entry.max],
                    el.success));
            });
        });

        checkTable(params.name, '', 'Скользящий понедельный график');

        describe('Проверка параметров', () => {

            bef();
            aft();

            describe('Проверка общих праметров', () => {

                it('Ввод в "Поиск..."', async () => await dec.simple(el.input.sendKeys,
                    ['', 'Поиск...', params.name, entry.max],
                    el.input));

                it('Отображение в таблице одной строки', async () => await dec.simple(el.table.singleSize,
                    [entry.max],
                    el.table));

                it('Нажатие по первой строке таблицы', async () => await dec.simple(el.table.strHandler,
                    [1, entry.max],
                    el.table));

                it('Нажатие кнопки "Редактировать"', async () => await dec.simple(el.butIcBefore.handler,
                    [but.edit, entry.max],
                    el.butIcBefore));

                it('Отображение "title", "url"',
                    async () => await dec.simple(page.accessTemplateScheduleChangePage.initEdit,
                        [entry.max],
                        page.accessTemplateScheduleChangePage));

                it('Проверка "Название"', async () => await dec.simpleText(el.input.getValue,
                    ['Название', '', entry.max],
                    params.name,
                    el.input));

                it('Проверка "Описание"', async () => await dec.simpleText(el.input.getValue,
                    ['Описание', '', entry.max],
                    '',
                    el.input));

                it('Проверка "Дата начала смены"', async () => await dec.simpleText(el.input.getValue,
                    ['Дата начала смены', '', entry.max],
                    params.date,
                    el.input));

                it('Проверка "Временной критерий"', async () => await dec.simpleText(el.select.getText,
                    ['Временной критерий', 'Скользящий понедельный график', entry.max],
                    'Скользящий понедельный график',
                    el.input));
            });

            describe('Проверка списка выбранных недель', () => {
                it('Отображение 1 неделеи в списке выбранных', async () => {
                    await dec.simple(page.accessTemplateScheduleChangePage.sWeekSelectedList,
                        [1, entry.max],
                        page.accessTemplateScheduleChangePage)});
            });

            checkSW({nameWeek: params.week1, countInterval: 1});

        });

        deleteParams();
    });

    // Редактирование всех параметров с максимальным количеством параметров. С использованием фильтра "Поиск…".
    const SWEditAllParams = () => describe('Скользящий понедельный график. Редактирование. ' +
        'Редактирование всех параметров с максимальным количеством параметров. С использованием фильтра "Поиск…".',
        () => {

        const params = {
            name1: 'SWEditAllParamsName1',
            description1: 'SWEditAllParamsDescription1',
            name2: 'SWEditAllParamsName2',
            description2: 'SWEditAllParamsDescription2',
            week1: 'week1',
            week2: 'week2',
            date: '2022-01-01',
            objDate: {
                day: '1',
                month: 'Январь',
                year: '2022',
            },
            intervals: [...Array(52).keys()].map(item => {
                return {
                    numWeek: 1,
                    countInterval: item + 1
                }
            })
        }

        describe('API - добавление', () => {
            bef();
            aft();
            addWeek({
                name: params.week1,
                items: {
                    days: [{id: 1}, {id: 1}, {id: 1}, {id: 1}, {id: 1}, {id: 1}, {id: 1}],
                    holidays: [{dayId: 1}, {dayId: 1}, {dayId: 1}, {dayId: 1}, {dayId: 1}, {dayId: 1}, {dayId: 1},
                        {dayId: 1}]
                }
            });
            addWeek({
                name: params.week2,
                items: {
                    days: [{id: 1}, {id: 1}, {id: 1}, {id: 1}, {id: 1}, {id: 1}, {id: 1}],
                    holidays: [{dayId: 1}, {dayId: 1}, {dayId: 1}, {dayId: 1}, {dayId: 1}, {dayId: 1}, {dayId: 1},
                        {dayId: 1}]
                }
            });
            it('Добавление скользящего понедельного графика', async () => {
                const cook = await page.base.getCookie('token');
                const get = await api.getAccessSchedules({type: 2}, cook.text);
                const parse = JSON.parse(get.text);
                const filter = parse.filter(item => item.name === params.week1)[0]['id'];
                const sw = {
                    name: params.name1,
                    comment: params.description1,
                    begin_date: params.date,
                    items: [...Array(52).keys()].map(() => filter)
                }
                await dec.simple(api.putArraySW,
                    [[sw], cook.text],
                    api.putArraySW);
            });
        });

        describe('Редактирование', () => {

            bef();
            aft();

            describe('Редактирование общих параметров', () => {
                it('Ввод в "Поиск..."', async () => await dec.simple(el.input.sendKeys,
                    ['', 'Поиск...', params.name1, entry.max],
                    el.input));

                it('Отображение в таблице одной строки', async () => await dec.simple(el.table.singleSize,
                    [entry.max],
                    el.table));

                it('Нажатие по первой строке таблицы', async () => await dec.simple(el.table.strHandler,
                    [1, entry.max],
                    el.table));

                it('Нажатие кнопки "Редактировать"', async () => await dec.simple(el.butIcBefore.handler,
                    [but.edit, entry.max],
                    el.butIcBefore));

                it('Отображение "title", "url"',
                    async () => await dec.simple(page.accessTemplateScheduleChangePage.initEdit,
                        [entry.max],
                        page.accessTemplateScheduleChangePage));

                it('Удаление "Название"', async () => await dec.simple(el.input.backSpace,
                    ['Название', '', entry.max],
                    el.input));

                it('Ввод "Название"', async () => await dec.simple(el.input.sendKeys,
                    ['Название', '', params.name2, entry.max],
                    el.input));

                it('Удаление "Описание"', async () => await dec.simple(el.input.backSpace,
                    ['Описание',  '', entry.max],
                    el.input));

                it('Ввод "Описание"', async () => await dec.simple(el.input.sendKeys,
                    ['Описание', '', params.description2, entry.max],
                    el.input));

                it('Выбор "Дата начала смены"', async () => {

                    await dec.simple(el.input.handler,
                        ['Дата начала смены', '', entry.max],
                        el.input);

                    await dec.simple(el.datepicker.dateParse,
                        [params.objDate, entry.max],
                        el.datepicker);
                });
            });

            [...Array(52).keys()].forEach(item => {
                describe(`Удаление недели ${item + 1}`, () => {
                    it(`Нажатие кнопки "Удалить" неделю ${item + 1}`, async () =>
                        await dec.simple(page.accessTemplateScheduleChangePage.sWeekSelectedHandler,
                            [1, entry.max],
                            page.accessTemplateScheduleChangePage));

                    it('Отсутствие недели в списки выбранных', async () =>
                        await dec.simple(page.accessTemplateScheduleChangePage.sWeekSelectedList,
                            [params.intervals.length - (item + 1), entry.max],
                            page.accessTemplateScheduleChangePage));
                });
            });

            describe('Проверка списка выбранных недель', () => {
                it('Отсуствие недель в списке выбранных', async () => {
                    await dec.simple(page.accessTemplateScheduleChangePage.sWeekSelectedList,
                        [0, entry.max],
                        page.accessTemplateScheduleChangePage)});
            });

            describe('Применение фильтра "Поиск..."', () => {
                it('Отображение 2 недели в списке выбора недель',
                    async () => await dec.simple(page.accessTemplateScheduleChangePage.sWeekList,
                        [2, entry.max],
                        page.accessTemplateScheduleChangePage));

                it('Ввод в "Поиск..."', async () => await dec.simple(el.input.sendKeys,
                    ['', 'Поиск...', params.week2, entry.max],
                    el.input));

                it('Отображение 1 недели в списке выбора недель',
                    async () => await dec.simple(page.accessTemplateScheduleChangePage.sWeekList,
                        [1, entry.max],
                        page.accessTemplateScheduleChangePage));
            });

            params.intervals.forEach(item => sw(item));

            describe('Сохранение', () => {
                it('Нажатие кнопки "Сохранить изменения"', async () => await dec.simple(el.button.handler,
                    ['Сохранить изменения', entry.max],
                    el.button));

                it('Отображение уведомления "Сохранено успешно"', async () => await dec.simple(el.success.success,
                    ['Сохранено успешно', entry.max],
                    el.success));
            });
        });

        checkTable(params.name2, params.description2, 'Скользящий понедельный график');

        describe('Проверка параметров', () => {

            bef();
            aft();

            describe('Проверка общих праметров', () => {

                it('Ввод в "Поиск..."', async () => await dec.simple(el.input.sendKeys,
                    ['', 'Поиск...', params.name2, entry.max],
                    el.input));

                it('Отображение в таблице одной строки', async () => await dec.simple(el.table.singleSize,
                    [entry.max],
                    el.table));

                it('Нажатие по первой строке таблицы', async () => await dec.simple(el.table.strHandler,
                    [1, entry.max],
                    el.table));

                it('Нажатие кнопки "Редактировать"', async () => await dec.simple(el.butIcBefore.handler,
                    [but.edit, entry.max],
                    el.butIcBefore));

                it('Отображение "title", "url"',
                    async () => await dec.simple(page.accessTemplateScheduleChangePage.initEdit,
                        [entry.max],
                        page.accessTemplateScheduleChangePage));

                it('Проверка "Название"', async () => await dec.simpleText(el.input.getValue,
                    ['Название', '', entry.max],
                    params.name2,
                    el.input));

                it('Проверка "Описание"', async () => await dec.simpleText(el.input.getValue,
                    ['Описание', '', entry.max],
                    params.description2,
                    el.input));

                it('Проверка "Дата начала смены"', async () => await dec.simpleText(el.input.getValue,
                    ['Дата начала смены', '', entry.max],
                    params.date,
                    el.input));

                it('Проверка "Временной критерий"', async () => await dec.simpleText(el.select.getText,
                    ['Временной критерий', 'Скользящий понедельный график', entry.max],
                    'Скользящий понедельный график',
                    el.input));
            });

            params.intervals.forEach(item => {
                checkSW({nameWeek: params.week1, countInterval: item.countInterval, nameWeek: params.week2});
            });

        });

        deleteParams();

    });

    // Попытка редактирования с удалением параметра  "Название".
    const SWEditRemoveName = () => describe('Скользящий понедельный график. Редактирование. Попытка редактирования ' +
        'с удалением параметра  "Название".', () => {

        const params = {
            name: 'SWEditNoNameName',
            description: 'SWEditNoNameDescription',
            week1: 'week1',
            date: '2022-01-01'
        };

        describe('API - добавление', () => {
            bef();
            aft();
            addWeek({
                name: params.week1,
                items: {
                    days: [{id: 1}, {id: 1}, {id: 1}, {id: 1}, {id: 1}, {id: 1}, {id: 1}],
                    holidays: [{dayId: 1}, {dayId: 1}, {dayId: 1}, {dayId: 1}, {dayId: 1}, {dayId: 1}, {dayId: 1},
                        {dayId: 1}]
                }
            });
            it('Добавление скользящего понедельного графика', async () => {
                const cook = await page.base.getCookie('token');
                const get = await api.getAccessSchedules({type: 2}, cook.text);
                const parse = JSON.parse(get.text);
                const sw = {
                    name: params.name,
                    comment: params.description,
                    begin_date: params.date,
                    items: [parse.filter(item => item.name === params.week1)[0]['id']]
                }
                await dec.simple(api.putArraySW,
                    [[sw], cook.text],
                    api.putArraySW);
            });
        });

        describe('Редактирование', () => {

            bef();
            aft();

            it('Ввод в "Поиск..."', async () => await dec.simple(el.input.sendKeys,
                ['', 'Поиск...', params.name, entry.max],
                el.input));

            it('Отображение в таблице одной строки', async () => await dec.simple(el.table.singleSize,
                [entry.max],
                el.table));

            it('Нажатие по первой строке таблицы', async () => await dec.simple(el.table.strHandler,
                [1, entry.max],
                el.table));

            it('Нажатие кнопки "Редактировать"', async () => await dec.simple(el.butIcBefore.handler,
                [but.edit, entry.max],
                el.butIcBefore));

            it('Отображение "title", "url"',
                async () => await dec.simple(page.accessTemplateScheduleChangePage.initEdit,
                    [entry.max],
                    page.accessTemplateScheduleChangePage));

            it('Удаление "Название"', async () => await dec.simple(el.input.backSpace,
                ['Название', '', entry.max],
                el.input));

            it('Ввод "Описание"', async () => await dec.simple(el.input.sendKeys,
                ['Описание', '', params.description, entry.max],
                el.input));

            it('Кнопка "Сохранить изменения" - заблокирована', async () => await dec.simple(el.button.disabled,
                ['Сохранить изменения', entry.max],
                el.button));

            it('Нажатие кнопки "Сохранить изменения"', async () => await dec.simpleFalse(el.button.handlerNoActive,
                ['Сохранить изменения', entry.max],
                el.button));

            it('Отображение "title", "url" не изменилось',
                async () => await dec.simple(page.accessTemplateScheduleChangePage.initEdit,
                    [entry.max],
                    page.accessTemplateScheduleChangePage));
        });

        deleteParams();

    });

    // Попытка редактирования с удалением параметра  "Название".
    const SWEditRemoveInterval = () => describe('Скользящий понедельный график. Редактирование. ' +
        'Попытка редактирования с удалением параметра  "Название".', () => {

        const params = {
            name: 'SWEditNoNameName',
            description: 'SWEditNoNameDescription',
            week1: 'week1',
            date: '2022-01-01',
            error: 'Выберите временной критерий'
        };

        describe('API - добавление', () => {
            bef();
            aft();
            addWeek({
                name: params.week1,
                items: {
                    days: [{id: 1}, {id: 1}, {id: 1}, {id: 1}, {id: 1}, {id: 1}, {id: 1}],
                    holidays: [{dayId: 1}, {dayId: 1}, {dayId: 1}, {dayId: 1}, {dayId: 1}, {dayId: 1}, {dayId: 1},
                        {dayId: 1}]
                }
            });
            it('Добавление скользящего понедельного графика', async () => {
                const cook = await page.base.getCookie('token');
                const get = await api.getAccessSchedules({type: 2}, cook.text);
                const parse = JSON.parse(get.text);
                const sw = {
                    name: params.name,
                    comment: params.description,
                    begin_date: params.date,
                    items: [parse.filter(item => item.name === params.week1)[0]['id']]
                }
                await dec.simple(api.putArraySW,
                    [[sw], cook.text],
                    api.putArraySW);
            });
        });

        describe('Редактирование', () => {

            bef();
            aft();

            it('Ввод в "Поиск..."', async () => await dec.simple(el.input.sendKeys,
                ['', 'Поиск...', params.name, entry.max],
                el.input));

            it('Отображение в таблице одной строки', async () => await dec.simple(el.table.singleSize,
                [entry.max],
                el.table));

            it('Нажатие по первой строке таблицы', async () => await dec.simple(el.table.strHandler,
                [1, entry.max],
                el.table));

            it('Нажатие кнопки "Редактировать"', async () => await dec.simple(el.butIcBefore.handler,
                [but.edit, entry.max],
                el.butIcBefore));

            it('Отображение "title", "url"',
                async () => await dec.simple(page.accessTemplateScheduleChangePage.initEdit,
                    [entry.max],
                    page.accessTemplateScheduleChangePage));

            it('Нажатие кнопки "Удалить" неделю 1', async () =>
                await dec.simple(page.accessTemplateScheduleChangePage.sWeekSelectedHandler,
                    [1, entry.max],
                    page.accessTemplateScheduleChangePage));

            it('Отсутствие недели в списки выбранных', async () =>
                await dec.simple(page.accessTemplateScheduleChangePage.sWeekSelectedList,
                    [0, entry.max],
                    page.accessTemplateScheduleChangePage));

            it('Нажатие кнопки "Сохранить изменения"', async () => await dec.simple(el.button.handler,
                ['Сохранить изменения', entry.max],
                el.button));

            it('Отображене ошибки', async () => await dec.simple(el.error.error,
                [params.error, entry.max],
                el.error));
        });

        deleteParams();

    });

    // Попытка дублирования "Название", "Описание" и "Временной критерий"—"Скользящий понедельный график".
    const SWDuplicateSW = () => describe('Скользящий понедельный график. Редактирование. ' +
        'Попытка дублирования "Название", "Описание" и "Временной критерий"—"Скользящий понедельный график".',() => {

        const params = {
            name1: 'SWDuplicateSWName1',
            name2: 'SWDuplicateSWName2',
            week1: 'week1',
            date: '2001-01-01',
            error: 'Такое название уже используется'
        }

        describe('API - добавление', () => {
            bef();
            aft();
            addWeek({
                name: params.week1,
                items: {
                    days: [{id: 1}, {id: 1}, {id: 1}, {id: 1}, {id: 1}, {id: 1}, {id: 1}],
                    holidays: [{dayId: 1}, {dayId: 1}, {dayId: 1}, {dayId: 1}, {dayId: 1}, {dayId: 1}, {dayId: 1},
                        {dayId: 1}]
                }
            });
            it('Добавление скользящего понедельного графика', async () => {
                const cook = await page.base.getCookie('token');
                const get = await api.getAccessSchedules({type: 2}, cook.text);
                const parse = JSON.parse(get.text);
                const sw = {
                    name: params.name1,
                    comment: '',
                    begin_date: params.date,
                    items: [parse.filter(item => item.name === params.week1)[0]['id']]
                }
                await dec.simple(api.putArraySW,
                    [[sw], cook.text],
                    api.putArraySW);
            });
            it('Добавление скользящего понедельного графика', async () => {
                const cook = await page.base.getCookie('token');
                const get = await api.getAccessSchedules({type: 2}, cook.text);
                const parse = JSON.parse(get.text);
                const sw = {
                    name: params.name2,
                    comment: '',
                    begin_date: params.date,
                    items: [parse.filter(item => item.name === params.week1)[0]['id']]
                }
                await dec.simple(api.putArraySW,
                    [[sw], cook.text],
                    api.putArraySW);
            });
        });

        describe('Редактирование', () =>  {

            bef();
            aft();

            it('Ввод в "Поиск..."', async () => await dec.simple(el.input.sendKeys,
                ['', 'Поиск...', params.name2, entry.max],
                el.input));

            it('Отображение в таблице одной строки', async () => await dec.simple(el.table.singleSize,
                [entry.max],
                el.table));

            it('Нажатие по первой строке таблицы', async () => await dec.simple(el.table.strHandler,
                [1, entry.max],
                el.table));

            it('Нажатие кнопки "Редактировать"', async () => await dec.simple(el.butIcBefore.handler,
                [but.edit, entry.max],
                el.butIcBefore));

            it('Отображение "title", "url"',
                async () => await dec.simple(page.accessTemplateScheduleChangePage.initEdit,
                    [entry.max],
                    page.accessTemplateScheduleChangePage));

            it('Удаление "Название"', async () => await dec.simple(el.input.backSpace,
                ['Название', '', entry.max],
                el.input));

            it('Ввод "Название"', async () => await dec.simple(el.input.sendKeys,
                ['Название', '', params.name1, entry.max],
                el.input));

            it('Нажатие кнопки "Сохранить изменения"', async () => await dec.simple(el.button.handler,
                ['Сохранить изменения', entry.max],
                el.button));

            it('Отображение ошибки', async () => await dec.simple(el.error.error,
                [params.error, entry.max],
                el.error));
        });

        checkTable(params.name2, '', 'Скользящий понедельный график');

        deleteParams();

    });

    // Дублирования "Название", '+
    //'"Описание" и "Временной критерий" — Временные зоны", "Недельный график", "Скользящий посуточный график".
    const SWDuplicateTZWSTZ = () => describe('Скользящий понедельный график. Редактирование. Дублирования "Название", '+
        '"Описание" и "Временной критерий" — Временные зоны", "Недельный график", "Скользящий посуточный график".',
        () => {

        const params = {
            name1: 'SWDuplicateTZWSTZName1',
            name2: 'SWDuplicateTZWSTZName2',
            date: '2001-01-01'
        }

        describe('API - добавление', () => {

            bef();
            aft();

            addTZ({
                name: params.name1,
                comment: '',
                items: [{
                    begin: 0,
                    end: 7000
                }]
            });

            addWeek({
                name: params.name1,
                comment: '',
                items: {
                    days: [{id: 1}, {id: 1}, {id: 1}, {id: 1}, {id: 1}, {id: 1}, {id: 1}],
                    holidays: [{dayId: 1}, {dayId: 1}, {dayId: 1}, {dayId: 1}, {dayId: 1}, {dayId: 1}, {dayId: 1},
                        {dayId: 1}]
                }
            });

            addSTZ({
                name: params.name1,
                comment: '',
                begin_date: params.date,
                items: {days: [{id: 1}]}
            });

            it('Добавление скользящего понедельного графика', async () => {
                const cook = await page.base.getCookie('token');
                const get = await api.getAccessSchedules({type: 2}, cook.text);
                const parse = JSON.parse(get.text);
                const sw = {
                    name: params.name2,
                    comment: '',
                    begin_date: params.date,
                    items: [parse[0]['id']]
                };
                await dec.simple(api.putArraySW,
                    [[sw], cook.text],
                    api.putArraySW)
            });

        });

        describe('Редактирование', () => {

            bef();
            aft();

            it('Ввод в "Поиск..."', async () => await dec.simple(el.input.sendKeys,
                ['', 'Поиск...', params.name2, entry.max],
                el.input));

            it('Отображение в таблице одной строки', async () => await dec.simple(el.table.singleSize,
                [entry.max],
                el.table));

            it('Нажатие по первой строке таблицы', async () => await dec.simple(el.table.strHandler,
                [1, entry.max],
                el.table));

            it('Нажатие кнопки "Редактировать"', async () => await dec.simple(el.butIcBefore.handler,
                [but.edit, entry.max],
                el.butIcBefore));

            it('Отображение "title", "url"',
                async () => await dec.simple(page.accessTemplateScheduleChangePage.initEdit,
                    [entry.max],
                    page.accessTemplateScheduleChangePage));

            it('Удаление "Название"', async () => await dec.simple(el.input.backSpace,
                ['Название', '', entry.max],
                el.input));

            it('Ввод "Название"', async () => await dec.simple(el.input.sendKeys,
                ['Название', '', params.name1, entry.max],
                el.input));

            it('Нажатие кнопки "Сохранить изменения"', async () => await dec.simple(el.button.handler,
                ['Сохранить изменения', entry.max],
                el.button));

            it('Отображение уведомления "Сохранено успешно"', async () => await dec.simple(el.success.success,
                ['Сохранено успешно', entry.max],
                el.success));
        });

        describe('Проверка таблицы', () => {
            bef();
            aft();

            it('Отображение в таблице 7 строки', async () => await dec.simple(el.table.size,
                [7, entry.max],
                el.table));

            it('Ввод в "Поиск..."', async () => await dec.simple(el.input.sendKeys,
                ['', 'Поиск...', params.name1, entry.max],
                el.input));

            it('Отображение в таблице 4 строки', async () => await dec.simple(el.table.size,
                [4, entry.max],
                el.table));
        });

        deleteParams();

    });

    return {
        TZAddParamsMinParams,
        TZRemoveParamsMaxParams,
        TZEditAllMaxParams,
        TZRemoveAllMaxParams,
        TZRemoveName,
        TZRemoveInterval,
        TZDuplicateTZ,
        TZDuplicateWSTZSW,
        WAddParamsMinParams,
        WRemoveParamsMaxParams,
        WEditMaxParams,
        WRemoveName,
        WDuplicateW,
        WDuplicateTZSTZSW,
        STZAddParamsMinParams,
        STZRemoveParamsMaxParams,
        STZEditALLParamsMaxParams,
        STZEditNoName,
        STZEditNoNInterval,
        STZDuplicateSTZ,
        STZDuplicateTZKsWsWK,
        SWEditMinParams,
        SWEditMaxParams,
        SWEditAllParams,
        SWEditRemoveName,
        SWEditRemoveInterval,
        SWDuplicateSW,
        SWDuplicateTZWSTZ
    }

};

// Удаление
const deleteSchedule = () => {

    const deleteTZ = () => describe('Удаление временной зоны.', () => {

        const params = {
            name: 'deleteTZName',
            intervalsValue: [{begin: 0, end: 1800}]
        };

        describe('API - Добавление', () => {
            bef();
            aft();
            addTZ({
                name: params.name,
                items: params.intervalsValue
            });
        });

        describe('Удаление', () => {

            bef();
            aft();

            it('Ввод в "Поиск..."', async () => await dec.simple(el.input.sendKeys,
                ['', 'Поиск...', params.name, entry.max],
                el.input));

            it('Отображение в таблице одной строки в таблице', async () => await dec.simple(el.table.singleSize,
                [entry.max],
                el.table));

            it('Нажатие по первой строке таблицы', async () => await dec.simple(el.table.strHandler,
                [1, entry.max],
                el.table));

            it('Нажатие кнопки "Удалить"', async () => await dec.simple(el.butIcBefore.handler,
                [but.delete, entry.max],
                el.butIcBefore));

            it('Отображение модального окна "Удаление шаблона доступа"',
                async () => await dec.simple(el.modalConfirm.accessSchedulesDelete.init,
                    [entry.max],
                    el.modalConfirm.accessSchedulesDelete));

            it('Нажатие кнопки "Удалить" в модально окне', async () => await dec.simple(el.button.handler,
                ['Удалить', entry.max],
                el.button));

            it(`Отображение сообщения "Сохранено успешно"`, async () => await dec.simple(el.success.success,
                ['Сохранено успешно', entry.max],
                el.success));

            it('Отсутствие модального окна "Удаление шаблона доступа"',
                async () => await dec.simple(el.modalConfirm.accessSchedulesDelete.initClose,
                    [entry.max],
                    el.modalConfirm.accessSchedulesDelete));
        });

        describe('Проверка таблицы', () => {

            bef();
            aft();

            it('Ввод в "Поиск..."', async () => await dec.simple(el.input.sendKeys,
                ['', 'Поиск...', params.name, entry.max],
                el.input));

            it('Отсутствие строк в таблице', async () => await dec.simple(el.table.noStr,
                [entry.max],
                el.table));
        });

    });

    const deleteW = () => describe('Удаление недельного графика.', () => {

        const params = {
            name: 'deleteWName',
            intervalsValue: [{begin: 0, end: 1800}]
        };

        describe('API - добавление', () => {
            bef();
            aft();
            addWeek({
                name: params.name,
                items: {
                    days: [
                        {id: 1},
                        {id: 1},
                        {id: 1},
                        {id: 1},
                        {id: 1},
                        {id: 1},
                        {id: 1}],
                    holidays: [
                        {dayId: 1},
                        {dayId: 1},
                        {dayId: 1},
                        {dayId: 1},
                        {dayId: 1},
                        {dayId: 1},
                        {dayId: 1},
                        {dayId: 1}]
                }
            });
        });

        describe('Удаление', () => {

            bef();
            aft();

            it('Ввод в "Поиск..."', async () => await dec.simple(el.input.sendKeys,
                ['', 'Поиск...', params.name, entry.max],
                el.input));

            it('Отображение в таблице одной строки в таблице', async () => await dec.simple(el.table.singleSize,
                [entry.max],
                el.table));

            it('Нажатие по первой строке таблицы', async () => await dec.simple(el.table.strHandler,
                [1, entry.max],
                el.table));

            it('Нажатие кнопки "Удалить"', async () => await dec.simple(el.butIcBefore.handler,
                [but.delete, entry.max],
                el.butIcBefore));

            it('Отображение модального окна "Удаление шаблона доступа"',
                async () => await dec.simple(el.modalConfirm.accessSchedulesDelete.init,
                    [entry.max],
                    el.modalConfirm.accessSchedulesDelete));

            it('Нажатие кнопки "Удалить" в модально окне', async () => await dec.simple(el.button.handler,
                ['Удалить', entry.max],
                el.button));

            it(`Отображение сообщения "Сохранено успешно"`, async () => await dec.simple(el.success.success,
                ['Сохранено успешно', entry.max],
                el.success));

            it('Отсутствие модального окна "Удаление шаблона доступа"',
                async () => await dec.simple(el.modalConfirm.accessSchedulesDelete.initClose,
                    [entry.max],
                    el.modalConfirm.accessSchedulesDelete));
        });

        describe('Проверка таблицы', () => {

            bef();
            aft();

            it('Ввод в "Поиск..."', async () => await dec.simple(el.input.sendKeys,
                ['', 'Поиск...', params.name, entry.max],
                el.input));

            it('Отсутствие строк в таблице', async () => await dec.simple(el.table.noStr,
                [entry.max],
                el.table));
        });

    });

    const deleteSTZ = () => describe('Удаление скользящего посуточного графика.', () => {

        const params = {
            name: 'deleteSTZName',
            date: '2001-01-01',
            intervals: {
                name: 'Всегда',
                tz: 2,
                intervals: [{begin: '00:00', end: '23:59'}]
            }
        }

        describe('API - добавление', () => {
            bef();
            aft();
            addSTZ({
                name: params.name,
                begin_date: params.date,
                items: {days: [{id: 1}]}
            });
        });

        describe('Удаление', () => {

            bef();
            aft();

            it('Ввод в "Поиск..."', async () => await dec.simple(el.input.sendKeys,
                ['', 'Поиск...', params.name, entry.max],
                el.input));

            it('Отображение в таблице одной строки в таблице', async () => await dec.simple(el.table.singleSize,
                [entry.max],
                el.table));

            it('Нажатие по первой строке таблицы', async () => await dec.simple(el.table.strHandler,
                [1, entry.max],
                el.table));

            it('Нажатие кнопки "Удалить"', async () => await dec.simple(el.butIcBefore.handler,
                [but.delete, entry.max],
                el.butIcBefore));

            it('Отображение модального окна "Удаление шаблона доступа"',
                async () => await dec.simple(el.modalConfirm.accessSchedulesDelete.init,
                    [entry.max],
                    el.modalConfirm.accessSchedulesDelete));

            it('Нажатие кнопки "Удалить" в модально окне', async () => await dec.simple(el.button.handler,
                ['Удалить', entry.max],
                el.button));

            it(`Отображение сообщения "Сохранено успешно"`, async () => await dec.simple(el.success.success,
                ['Сохранено успешно', entry.max],
                el.success));

            it('Отсутствие модального окна "Удаление шаблона доступа"',
                async () => await dec.simple(el.modalConfirm.accessSchedulesDelete.initClose,
                    [entry.max],
                    el.modalConfirm.accessSchedulesDelete));
        });

        describe('Проверка таблицы', () => {

            bef();
            aft();

            it('Ввод в "Поиск..."', async () => await dec.simple(el.input.sendKeys,
                ['', 'Поиск...', params.name, entry.max],
                el.input));

            it('Отсутствие строк в таблице', async () => await dec.simple(el.table.noStr,
                [entry.max],
                el.table));
        });
    });

    const deleteSW = () => describe('Удаление скользящего понедельного графика.', () => {

        const params = {
            name: 'deleteSWName',
            week1: 'week1',
            date: '2022-01-01',
            objDate: {
                day: '1',
                month: 'Январь',
                year: '2022',
            },
            intervals: [...Array(51).keys()].map(item => {
                return {
                    numWeek: 1,
                    countInterval: item + 1
                }
            })
        };

        describe('API - добавление', () => {
            bef();
            aft();
            addWeek({
                name: params.week1,
                items: {
                    days: [{id: 1}, {id: 1}, {id: 1}, {id: 1}, {id: 1}, {id: 1}, {id: 1}],
                    holidays: [{dayId: 1}, {dayId: 1}, {dayId: 1}, {dayId: 1}, {dayId: 1}, {dayId: 1}, {dayId: 1},
                        {dayId: 1}]
                }
            });
            it('Добавление скользящего понедельного графика', async () => {
                const cook = await page.base.getCookie('token');
                const get = await api.getAccessSchedules({type: 2}, cook.text);
                const parse = JSON.parse(get.text);
                const sw = {
                    name: params.name,
                    comment: '',
                    begin_date: params.date,
                    items: [parse.filter(item => item.name === params.week1)[0]['id']]
                }
                await dec.simple(api.putArraySW,
                    [[sw], cook.text],
                    api.putArraySW);
            });
        });

        describe('Удаление', () => {

            bef();
            aft();

            it('Ввод в "Поиск..."', async () => await dec.simple(el.input.sendKeys,
                ['', 'Поиск...', params.name, entry.max],
                el.input));

            it('Отображение в таблице одной строки в таблице', async () => await dec.simple(el.table.singleSize,
                [entry.max],
                el.table));

            it('Нажатие по первой строке таблицы', async () => await dec.simple(el.table.strHandler,
                [1, entry.max],
                el.table));

            it('Нажатие кнопки "Удалить"', async () => await dec.simple(el.butIcBefore.handler,
                [but.delete, entry.max],
                el.butIcBefore));

            it('Отображение модального окна "Удаление шаблона доступа"',
                async () => await dec.simple(el.modalConfirm.accessSchedulesDelete.init,
                    [entry.max],
                    el.modalConfirm.accessSchedulesDelete));

            it('Нажатие кнопки "Удалить" в модально окне', async () => await dec.simple(el.button.handler,
                ['Удалить', entry.max],
                el.button));

            it(`Отображение сообщения "Сохранено успешно"`, async () => await dec.simple(el.success.success,
                ['Сохранено успешно', entry.max],
                el.success));

            it('Отсутствие модального окна "Удаление шаблона доступа"',
                async () => await dec.simple(el.modalConfirm.accessSchedulesDelete.initClose,
                    [entry.max],
                    el.modalConfirm.accessSchedulesDelete));
        });

        describe('Проверка таблицы', () => {

            bef();
            aft();

            it('Ввод в "Поиск..."', async () => await dec.simple(el.input.sendKeys,
                ['', 'Поиск...', params.name, entry.max],
                el.input));

            it('Отсутствие строк в таблице', async () => await dec.simple(el.table.noStr,
                [entry.max],
                el.table));
        });

        deleteParams();
    });

    const deleteTZinW = () => describe('Удаление временной зоны, используемой в недельном графике.', () => {

        const params = {
            name: 'deleteTZinWName',
            week1: 'week1',
            error: 'График доступа используется и не может быть удален',
            intervalsValue: [{begin: 0, end: 1800}]
        }

        describe('API - добавление', () => {
            bef();
            aft();
            addTZ({
                name: params.name,
                comment: '',
                items: params.intervalsValue
            });
            it('Добавление недельного графика', async () => {
                const cook = await page.base.getCookie('token');
                const arrayTZ = await api.getAccessSchedules({type: 1},  cook.text);
                const arrayTZParse = JSON.parse(arrayTZ.text);
                const tzId = arrayTZParse.intervals.filter(el => el.desc === params.name)[0]['id']
                const week = {
                    name: params.week1,
                    comment: '',
                    items: {
                        days: [
                            {id: tzId},
                            {id: 1},
                            {id: 1},
                            {id: 1},
                            {id: 1},
                            {id: 1},
                            {id: 1}],
                        holidays: [
                            {dayId: 1},
                            {dayId: 1},
                            {dayId: 1},
                            {dayId: 1},
                            {dayId: 1},
                            {dayId: 1},
                            {dayId: 1},
                            {dayId: 1}]
                    }
                };
                await dec.simple(api.putArrayWeek,
                    [[week], cook.text],
                    api.putArrayWeek);
            });
        });

        describe('Удаление', () => {

            bef();
            aft();

            it('Ввод в "Поиск..."', async () => await dec.simple(el.input.sendKeys,
                ['', 'Поиск...', params.name, entry.max],
                el.input));

            it('Отображение в таблице одной строки в таблице', async () => await dec.simple(el.table.singleSize,
                [entry.max],
                el.table));

            it('Нажатие по первой строке таблицы', async () => await dec.simple(el.table.strHandler,
                [1, entry.max],
                el.table));

            it('Нажатие кнопки "Удалить"', async () => await dec.simple(el.butIcBefore.handler,
                [but.delete, entry.max],
                el.butIcBefore));

            it('Отображение модального окна "Удаление шаблона доступа"',
                async () => await dec.simple(el.modalConfirm.accessSchedulesDelete.init,
                    [entry.max],
                    el.modalConfirm.accessSchedulesDelete));

            it('Нажатие кнопки "Удалить" в модально окне', async () => await dec.simple(el.button.handler,
                ['Удалить', entry.max],
                el.button));

            it(`Отображение ошибки ${params.error}`, async () => await dec.simple(el.error.error,
                [params.error, entry.max],
                el.error));

            it('Отсутствие модального окна "Удаление шаблона доступа"',
                async () => await dec.simple(el.modalConfirm.accessSchedulesDelete.initClose,
                    [entry.max],
                    el.modalConfirm.accessSchedulesDelete));
        });

        checkTable(params.name, '', 'Временные зоны');

        deleteParams();

    });

    const deleteTZinSTZ = () => describe('Удаление временной зоны, используемой ' +
        'в скользящем посуточном графике.', () => {

        const params = {
            name: 'deleteTZinSTZName',
            stz1: 'stz1',
            date: '2001-01-01',
            error: 'График доступа используется и не может быть удален',
            intervalsValue: [{begin: 0, end: 1800}]
        }

        describe('API - добавление', () => {
            bef();
            aft();
            addTZ({
                name: params.name,
                comment: '',
                items: params.intervalsValue
            });
            it('Добавление скользящего посуточного графика', async () => {
                const cook = await page.base.getCookie('token');
                const arrayTZ = await api.getAccessSchedules({type: 1},  cook.text);
                const arrayTZParse = JSON.parse(arrayTZ.text);
                const tzId = arrayTZParse.intervals.filter(el => el.desc === params.name)[0]['id']
                const stz = {
                    name: params.stz1,
                    comment: '',
                    begin_date: params.date,
                    items: {
                        days:  [{id: tzId}]
                    }
                };
                await dec.simple(api.putArraySTZ,
                    [[stz], cook.text],
                    api.putArrayWeek);
            })
        });

        describe('Удаление', () => {

            bef();
            aft();

            it('Ввод в "Поиск..."', async () => await dec.simple(el.input.sendKeys,
                ['', 'Поиск...', params.name, entry.max],
                el.input));

            it('Отображение в таблице одной строки в таблице', async () => await dec.simple(el.table.singleSize,
                [entry.max],
                el.table));

            it('Нажатие по первой строке таблицы', async () => await dec.simple(el.table.strHandler,
                [1, entry.max],
                el.table));

            it('Нажатие кнопки "Удалить"', async () => await dec.simple(el.butIcBefore.handler,
                [but.delete, entry.max],
                el.butIcBefore));

            it('Отображение модального окна "Удаление шаблона доступа"',
                async () => await dec.simple(el.modalConfirm.accessSchedulesDelete.init,
                    [entry.max],
                    el.modalConfirm.accessSchedulesDelete));

            it('Нажатие кнопки "Удалить" в модально окне', async () => await dec.simple(el.button.handler,
                ['Удалить', entry.max],
                el.button));

            it(`Отображение ошибки ${params.error}`, async () => await dec.simple(el.error.error,
                [params.error, entry.max],
                el.error));

            it('Отсутствие модального окна "Удаление шаблона доступа"',
                async () => await dec.simple(el.modalConfirm.accessSchedulesDelete.initClose,
                    [entry.max],
                    el.modalConfirm.accessSchedulesDelete));
        });

        checkTable(params.name, '', 'Временные зоны');

        deleteParams();

    });

    const deleteWinSW = () => describe('Удаление недельного графика, использовуемого ' +
        'в скользящем понедельном графике', () => {

        const params = {
            name: 'deleteWinSWName',
            sw1: 'sw1',
            date: '2001-01-01',
            error: 'График доступа используется и не может быть удален',
        }

        describe('API - добавление', () => {
            bef();
            aft();
            addWeek({
                name: params.name,
                items: {
                    days: [
                        {id: 1},
                        {id: 1},
                        {id: 1},
                        {id: 1},
                        {id: 1},
                        {id: 1},
                        {id: 1}],
                    holidays: [
                        {dayId: 1},
                        {dayId: 1},
                        {dayId: 1},
                        {dayId: 1},
                        {dayId: 1},
                        {dayId: 1},
                        {dayId: 1},
                        {dayId: 1}]
                }
            });
            it('Добавление скользящего понедельного графика', async () => {
                const cook = await page.base.getCookie('token');
                const get = await api.getAccessSchedules({type: 2}, cook.text);
                const parse = JSON.parse(get.text);
                const sw = {
                    name: params.sw1,
                    comment: '',
                    begin_date: params.date,
                    items: [parse.filter(item => item.name === params.name)[0]['id']]
                }
                await dec.simple(api.putArraySW,
                    [[sw], cook.text],
                    api.putArraySW);
            });
        });

        describe('Удаление', () => {

            bef();
            aft();

            it('Ввод в "Поиск..."', async () => await dec.simple(el.input.sendKeys,
                ['', 'Поиск...', params.name, entry.max],
                el.input));

            it('Отображение в таблице одной строки в таблице', async () => await dec.simple(el.table.singleSize,
                [entry.max],
                el.table));

            it('Нажатие по первой строке таблицы', async () => await dec.simple(el.table.strHandler,
                [1, entry.max],
                el.table));

            it('Нажатие кнопки "Удалить"', async () => await dec.simple(el.butIcBefore.handler,
                [but.delete, entry.max],
                el.butIcBefore));

            it('Отображение модального окна "Удаление шаблона доступа"',
                async () => await dec.simple(el.modalConfirm.accessSchedulesDelete.init,
                    [entry.max],
                    el.modalConfirm.accessSchedulesDelete));

            it('Нажатие кнопки "Удалить" в модально окне', async () => await dec.simple(el.button.handler,
                ['Удалить', entry.max],
                el.button));

            it(`Отображение ошибки ${params.error}`, async () => await dec.simple(el.error.error,
                [params.error, entry.max],
                el.error));

            it('Отсутствие модального окна "Удаление шаблона доступа"',
                async () => await dec.simple(el.modalConfirm.accessSchedulesDelete.initClose,
                    [entry.max],
                    el.modalConfirm.accessSchedulesDelete));
        });

        checkTable(params.name, '', 'Недельный график');

        deleteParams();
    });

    return {
        deleteTZ,
        deleteW,
        deleteSTZ,
        deleteSW,
        deleteTZinW,
        deleteTZinSTZ,
        deleteWinSW
    }
};

// Праздничное расписание
const holiday = () => {

    const addIntervalMin = () => describe('Праздничное расписание. Добавление два праздничного дня ' +
        'с удалением 1 праздничного дня. Удаление второго праздничного дня.',
        () => {

            const params = {
                month1: {
                    month: 'Январь',
                    day: 1,
                    type: 1
                },
                month2: {
                    month: 'Февраль',
                    day: 1,
                    type: 1
                }
            }

            describe('Редактирвоание', () => {

                bef();
                aft();

                it('Ввод в "Поиск..."', async () => await dec.simple(el.input.sendKeys,
                    ['', 'Поиск...', 'Праздничное расписание', entry.max],
                    el.input));

                it('Отображение в таблице одной строки в таблице', async () => await dec.simple(el.table.singleSize,
                    [entry.max],
                    el.table));

                it('Нажатие по первой строке таблицы', async () => await dec.simple(el.table.strHandler,
                    [1, entry.max],
                    el.table));

                it('Нажатие кнопки "Редактировать"', async () => await dec.simple(el.butIcBefore.handler,
                    [but.edit, entry.max],
                    el.butIcBefore));

                it('Отображение "title", "url"',
                    async () => await dec.simple(page.accessTemplateScheduleHoliday.init,
                        [entry.max],
                        page.accessTemplateScheduleChangePage));

                it(`Выбор значения "${params.month1.month}" в поле выбора "Месяц"`,
                    async () => await dec.simple(el.select.iconXpand,
                        ['Месяц', 'Выберите месяц', params.month1.month, entry.max],
                        el.select));

                it(`Выбор значения "${params.month1.day}" в поле выбора "День"`,
                    async () => {
                        await dec.simple(el.select.iconXpand,
                            ['День', 'Выберите день', params.month1.day, entry.max],
                            el.select)
                    });

                it(`Выбор значения "${params.month1.type}" в поле выбора "Тип"`,
                    async () => await dec.simple(el.select.iconXpand,
                        ['Тип', 'Выберите тип', params.month1.type, entry.max],
                        el.select));

                it('Нажатие кнопки "Добавить праздничный день"', async () => await dec.simple(el.button.handler,
                    ['Добавить праздничный день', entry.max],
                    el.button));

                it(`Выбор значения "${params.month2.month}" в поле выбора "Месяц"`,
                    async () => await dec.simple(el.select.iconXpand,
                        ['Месяц', params.month1.month, params.month2.month, entry.max],
                        el.select));

                it('Нажатие кнопки "Добавить праздничный день"', async () => await dec.simple(el.button.handler,
                    ['Добавить праздничный день', entry.max],
                    el.button));

                it(`Удаление строки 2 из праздничного расписания`,
                    async () => await dec.simple(page.accessTemplateScheduleHoliday.holidayDelete,
                        [2, entry.max],
                        page.accessTemplateScheduleHoliday));

                it('Нажатие кнопки "Сохранить изменения"', async () => await dec.simple(el.button.handler,
                    ['Сохранить изменения', entry.max],
                    el.button));

                it('Отображение уведомления "Сохранено успешно"', async () => await dec.simple(el.success.success,
                    ['Сохранено успешно', entry.max],
                    el.success));
            });

            describe('Проверка параметров', () => {

                bef();
                aft();

                it('Ввод в "Поиск..."', async () => await dec.simple(el.input.sendKeys,
                    ['', 'Поиск...', 'Праздничное расписание', entry.max],
                    el.input));

                it('Отображение в таблице одной строки в таблице', async () => await dec.simple(el.table.singleSize,
                    [entry.max],
                    el.table));

                it('Нажатие по первой строке таблицы', async () => await dec.simple(el.table.strHandler,
                    [1, entry.max],
                    el.table));

                it('Нажатие кнопки "Редактировать"', async () => await dec.simple(el.butIcBefore.handler,
                    [but.edit, entry.max],
                    el.butIcBefore));

                it('Отображение "title", "url"',
                    async () => await dec.simple(page.accessTemplateScheduleHoliday.init,
                        [entry.max],
                        page.accessTemplateScheduleChangePage));

                it('Проверка "Название"', async () => await dec.simpleText(el.input.getValue,
                    ['Название', '', entry.max],
                    'Праздничное расписание',
                    el.input));

                it('Проверка "Временной критерий"', async () => await dec.simpleText(el.select.getText,
                    ['Временной критерий', 'Праздничное расписание', entry.max],
                    'Праздничное расписание',
                    el.input));

                it('Отображение одного праздника',
                    async () => await dec.simple(page.accessTemplateScheduleHoliday.holidayCount,
                        [1, entry.max],
                        page.accessTemplateScheduleHoliday));

                it(`Название ${params.month1.day} ${params.month1.month}`, async () =>
                    dec.simpleText(page.accessTemplateScheduleHoliday.holidayDate,
                        [1, entry.max],
                        `${params.month1.day} ${params.month1.month}`,
                        page.accessTemplateScheduleHoliday));

                it(`Тип ${params.month1.type}`, async () =>
                    dec.simpleText(page.accessTemplateScheduleHoliday.holidayType,
                        [1, entry.max],
                        `${params.month1.type} Тип`,
                        page.accessTemplateScheduleHoliday));

            });

            describe('Редактирование - удаление 2 праздничного дня', () => {

                bef();
                aft();

                it('Ввод в "Поиск..."', async () => await dec.simple(el.input.sendKeys,
                    ['', 'Поиск...', 'Праздничное расписание', entry.max],
                    el.input));

                it('Отображение в таблице одной строки в таблице', async () => await dec.simple(el.table.singleSize,
                    [entry.max],
                    el.table));

                it('Нажатие по первой строке таблицы', async () => await dec.simple(el.table.strHandler,
                    [1, entry.max],
                    el.table));

                it('Нажатие кнопки "Редактировать"', async () => await dec.simple(el.butIcBefore.handler,
                    [but.edit, entry.max],
                    el.butIcBefore));

                it('Отображение "title", "url"',
                    async () => await dec.simple(page.accessTemplateScheduleHoliday.init,
                        [entry.max],
                        page.accessTemplateScheduleChangePage));

                it(`Удаление строки 1 из праздничного расписания`,
                    async () => await dec.simple(page.accessTemplateScheduleHoliday.holidayDelete,
                        [1, entry.max],
                        page.accessTemplateScheduleHoliday));

                it('Нажатие кнопки "Сохранить изменения"', async () => await dec.simple(el.button.handler,
                    ['Сохранить изменения', entry.max],
                    el.button));

                it('Отображение уведомления "Сохранено успешно"', async () => await dec.simple(el.success.success,
                    ['Сохранено успешно', entry.max],
                    el.success));
            });

            describe('Проверка параметров', () => {

                bef();
                aft();

                it('Ввод в "Поиск..."', async () => await dec.simple(el.input.sendKeys,
                    ['', 'Поиск...', 'Праздничное расписание', entry.max],
                    el.input));

                it('Отображение в таблице одной строки в таблице', async () => await dec.simple(el.table.singleSize,
                    [entry.max],
                    el.table));

                it('Нажатие по первой строке таблицы', async () => await dec.simple(el.table.strHandler,
                    [1, entry.max],
                    el.table));

                it('Нажатие кнопки "Редактировать"', async () => await dec.simple(el.butIcBefore.handler,
                    [but.edit, entry.max],
                    el.butIcBefore));

                it('Отображение "title", "url"',
                    async () => await dec.simple(page.accessTemplateScheduleHoliday.init,
                        [entry.max],
                        page.accessTemplateScheduleChangePage));

                it('Отсутствие праздников',
                    async () => await dec.simple(page.accessTemplateScheduleHoliday.holidayCount,
                        [0, entry.max],
                        page.accessTemplateScheduleHoliday));
            });
        });

    const addDuplicate = () => describe('Праздничное расписание. Добавление 2 праздничных дня на одну дату', () => {

        const params = {
            month1: {
                month: 'Январь',
                day: 1,
                type: 1
            },
            month2: {
                month: 'Январь',
                day: 1,
                type: 8
            },
            error: 'На этот день праздник уже добавлен'
        }

        describe('Редактирвоание', () => {

            bef();
            aft();

            it('Ввод в "Поиск..."', async () => await dec.simple(el.input.sendKeys,
                ['', 'Поиск...', 'Праздничное расписание', entry.max],
                el.input));

            it('Отображение в таблице одной строки в таблице', async () => await dec.simple(el.table.singleSize,
                [entry.max],
                el.table));

            it('Нажатие по первой строке таблицы', async () => await dec.simple(el.table.strHandler,
                [1, entry.max],
                el.table));

            it('Нажатие кнопки "Редактировать"', async () => await dec.simple(el.butIcBefore.handler,
                [but.edit, entry.max],
                el.butIcBefore));

            it('Отображение "title", "url"',
                async () => await dec.simple(page.accessTemplateScheduleHoliday.init,
                    [entry.max],
                    page.accessTemplateScheduleChangePage));

            it(`Выбор значения "${params.month1.month}" в поле выбора "Месяц"`,
                async () => await dec.simple(el.select.iconXpand,
                    ['Месяц', 'Выберите месяц', params.month1.month, entry.max],
                    el.select));

            it(`Выбор значения "${params.month1.day}" в поле выбора "День"`,
                async () => {
                    await dec.simple(el.select.iconXpand,
                        ['День', 'Выберите день', params.month1.day, entry.max],
                        el.select)
                });

            it(`Выбор значения "${params.month1.type}" в поле выбора "Тип"`,
                async () => await dec.simple(el.select.iconXpand,
                    ['Тип', 'Выберите тип', params.month1.type, entry.max],
                    el.select));

            it('Нажатие кнопки "Добавить праздничный день"', async () => await dec.simple(el.button.handler,
                ['Добавить праздничный день', entry.max],
                el.button));

            it('Отображение одной строки в списке выбранных праздников',
                async () => dec.simple(page.accessTemplateScheduleHoliday.holidayCount,
                    [1, entry.max],
                    page.accessTemplateScheduleHoliday));

            it(`Выбор значения "${params.month2.type}" в поле выбора "Тип"`,
                async () => await dec.simple(el.select.iconXpand,
                    ['Тип', '1', params.month2.type, entry.max],
                    el.select));

            it('Нажатие кнопки "Добавить праздничный день"', async () => await dec.simple(el.button.handler,
                ['Добавить праздничный день', entry.max],
                el.button));

            it(`Отображение ошибки ${params.error}`, async () => await dec.simple(el.error.error,
                [params.error, entry.max],
                el.error));

            it('Отображение одной строки в списке выбранных праздников',
                async () => dec.simple(page.accessTemplateScheduleHoliday.holidayCount,
                    [1, entry.max],
                    page.accessTemplateScheduleHoliday));
        });
    });

    const editMaxParams = () => describe('Праздничное расписание. Редактирование названия и добавления праздничных' +
        'дней. Обратное изменнеие названия и удаление праздничных дней',
        () => {

            const params = {
                name: 'Праздничное расписание',
                nameUpdate: 'editMaxParamsName',
                data: [
                    {
                        month: 'Январь',
                        days: {begin: 1, end: 31},
                        types: {begin: 1, end: 8}
                    },
                    {
                        month: 'Февраль',
                        days: {begin: 1, end: 29},
                        types: {begin: 1, end: 8}
                    },
                    {
                        month: 'Март',
                        days: {begin: 1, end: 31},
                        types: {begin: 1, end: 8}
                    },
                    {
                        month: 'Апрель',
                        days: {begin: 1, end: 30},
                        types: {begin: 1, end: 8}
                    },
                    {
                        month: 'Май',
                        days: {begin: 1, end: 31},
                        types: {begin: 1, end: 8}
                    },
                    {
                        month: 'Июнь',
                        days: {begin: 1, end: 30},
                        types: {begin: 1, end: 8}
                    },
                    {
                        month: 'Июль',
                        days: {begin: 1, end: 31},
                        types: {begin: 1, end: 8}
                    },
                    {
                        month: 'Август',
                        days: {begin: 1, end: 31},
                        types: {begin: 1, end: 8}
                    },
                    {
                        month: 'Сентябрь',
                        days: {begin: 1, end: 30},
                        types: {begin: 1, end: 8}
                    },
                    {
                        month: 'Октябрь',
                        days: {begin: 1, end: 31},
                        types: {begin: 1, end: 8}
                    },
                    {
                        month: 'Ноябрь',
                        days: {begin: 1, end: 30},
                        types: {begin: 1, end: 8}
                    },
                    {
                        month: 'Декабрь',
                        days: {begin: 1, end: 31},
                        types: {begin: 1, end: 8}
                    },
                ],
            }

            describe('Редактирвоание', () => {

                bef();
                aft();

                describe('Редактирвоание общих параметров', () => {
                    it('Ввод в "Поиск..."', async () => await dec.simple(el.input.sendKeys,
                        ['', 'Поиск...', params.name, entry.max],
                        el.input));

                    it('Отображение в таблице одной строки в таблице', async () => await dec.simple(el.table.singleSize,
                        [entry.max],
                        el.table));

                    it('Нажатие по первой строке таблицы', async () => await dec.simple(el.table.strHandler,
                        [1, entry.max],
                        el.table));

                    it('Нажатие кнопки "Редактировать"', async () => await dec.simple(el.butIcBefore.handler,
                        [but.edit, entry.max],
                        el.butIcBefore));

                    it('Отображение "title", "url"',
                        async () => await dec.simple(page.accessTemplateScheduleHoliday.init,
                            [entry.max],
                            page.accessTemplateScheduleChangePage));

                    it('Удаление "Название"', async () => await dec.simple(el.input.backSpace,
                        ['Название', '', entry.max],
                        el.input));

                    it('Ввод "Название"', async () => await dec.simple(el.input.sendKeys,
                        ['Название', '', params.nameUpdate, entry.max],
                        el.input));
                });

                params.data.forEach((obj, index) => {

                    describe(`Выбор "${obj.days.begin} ${obj.month}".`, () => {

                        if(index === 0) {
                            it(`Выбор значения "${obj.month}" в поле выбора "Месяц"`,
                                async () => await dec.simple(el.select.iconXpand,
                                    ['Месяц', 'Выберите месяц', obj.month, entry.max],
                                    el.select));

                            it(`Выбор значения "${obj.days.begin}" в поле выбора "День"`,
                                async () => {
                                    await dec.simple(el.select.iconXpand,
                                        ['День', 'Выберите день', obj.days.begin, entry.max],
                                        el.select)
                                });

                            it(`Выбор значения "${obj.types.begin}" в поле выбора "Тип"`,
                                async () => await dec.simple(el.select.iconXpand,
                                    ['Тип', 'Выберите тип', obj.types.begin, entry.max],
                                    el.select));
                        }

                        if(index > 0) {
                            it(`Выбор значения "${obj.month}" в поле выбора "Месяц"`,
                                async () => await dec.simple(el.select.iconXpand,
                                    ['Месяц', params.data[index - 1].month, obj.month, entry.max],
                                    el.select));

                            it(`Выбор значения "${obj.days.begin}" в поле выбора "День"`,
                                async () => {

                                    let day = params.data[index - 1].days.end > obj.days.end ?
                                        'Выберите день' :params.data[index - 1].days.end

                                    await dec.simple(el.select.iconExpand,
                                        ['День',
                                            day,
                                            entry.max],
                                        el.select);

                                    await page.base.loading(500);

                                    await dec.simple(el.selectXpand.xpand,
                                        [entry.max],
                                        el.selectXpand);

                                    await dec.simple(el.selectXpand.scrollTop,
                                        [-1000],
                                        el.selectXpand);

                                    await dec.simple(el.selectXpand.handler,
                                        [obj.days.begin, entry.max],
                                        el.selectXpand);

                                    await dec.simple(el.selectXpand.xpandNoElement,
                                        [entry.max],
                                        el.selectXpand);

                                    await dec.simple(el.select.select,
                                        ['День', obj.days.begin, entry.max],
                                        el.select);

                                    await page.base.loading(500);
                                });

                            it(`Выбор значения "${obj.types.begin}" в поле выбора "Тип"`,
                                async () => await dec.simple(el.select.iconXpand,
                                    ['Тип', '8', obj.types.begin, entry.max],
                                    el.select));
                        }

                        it('Нажатие кнопки "Добавить праздничный день"', async () => await dec.simple(el.button.handler,
                            ['Добавить праздничный день', entry.max],
                            el.button));
                    });

                    describe(`Выбор "${obj.days.end} ${obj.month}".`, () => {
                        it(`Выбор значения "${obj.month}" в поле выбора "Месяц"`,
                            async () => await dec.simple(el.select.iconXpand,
                                ['Месяц', obj.month, obj.month, entry.max],
                                el.select));

                        it(`Выбор значения "${obj.days.end}" в поле выбора "День"`,
                            async () => {

                                await dec.simple(el.select.iconExpand,
                                    ['День', obj.days.begin, entry.max],
                                    el.select);

                                await page.base.loading(500);

                                await dec.simple(el.selectXpand.xpand,
                                    [entry.max],
                                    el.selectXpand);

                                await dec.simple(el.selectXpand.scrollTop,
                                    [1000],
                                    el.selectXpand);

                                await dec.simple(el.selectXpand.handler,
                                    [obj.days.end, entry.max],
                                    el.selectXpand);

                                await dec.simple(el.selectXpand.xpandNoElement,
                                    [entry.max],
                                    el.selectXpand);

                                await dec.simple(el.select.select,
                                    ['День', obj.days.end, entry.max],
                                    el.select);

                                await page.base.loading(500);
                            });

                        it(`Выбор значения "${obj.types.end}" в поле выбора "Тип"`,
                            async () => await dec.simple(el.select.iconXpand,
                                ['Тип', '1', obj.types.end, entry.max],
                                el.select));

                        it('Нажатие кнопки "Добавить праздничный день"', async () => await dec.simple(el.button.handler,
                            ['Добавить праздничный день', entry.max],
                            el.button));
                    });
                });

                describe('Сохранение', () => {
                    it('Нажатие кнопки "Сохранить изменения"', async () => await dec.simple(el.button.handler,
                        ['Сохранить изменения', entry.max],
                        el.button));

                    it('Отображение уведомления "Сохранено успешно"', async () => await dec.simple(el.success.success,
                        ['Сохранено успешно', entry.max],
                        el.success));
                });

            });

            checkTable(params.nameUpdate, '', params.name);

            describe('Проверка параметров', () => {

                bef();
                aft();

                describe('Проверка общих параметров', () => {

                    it('Ввод в "Поиск..."', async () => await dec.simple(el.input.sendKeys,
                        ['', 'Поиск...', params.nameUpdate, entry.max],
                        el.input));

                    it('Отображение в таблице одной строки в таблице', async () => await dec.simple(el.table.singleSize,
                        [entry.max],
                        el.table));

                    it('Нажатие по первой строке таблицы', async () => await dec.simple(el.table.strHandler,
                        [1, entry.max],
                        el.table));

                    it('Нажатие кнопки "Редактировать"', async () => await dec.simple(el.butIcBefore.handler,
                        [but.edit, entry.max],
                        el.butIcBefore));

                    it('Отображение "title", "url"',
                        async () => await dec.simple(page.accessTemplateScheduleHoliday.init,
                            [entry.max],
                            page.accessTemplateScheduleChangePage));

                    it('Проверка "Название"', async () => await dec.simpleText(el.input.getValue,
                        ['Название', '', entry.max],
                        params.nameUpdate,
                        el.input));

                    it('Проверка "Временной критерий"', async () => await dec.simpleText(el.select.getText,
                        ['Временной критерий', params.name, entry.max],
                        params.name,
                        el.input));
                });

                params.data.forEach((obj, index) => {
                    describe(`Проверка строки ${index + 1}`, () => {
                        it(`Название ${obj.days.begin} ${obj.month}`, async () =>
                            dec.simpleText(page.accessTemplateScheduleHoliday.holidayDate,
                                [index + 1, entry.max],
                                `${obj.days.begin} ${obj.month}`,
                                page.accessTemplateScheduleHoliday));

                        it(`Тип ${obj.types.begin}`, async () =>
                            dec.simpleText(page.accessTemplateScheduleHoliday.holidayType,
                                [index + 1, entry.max],
                                `${obj.types.begin} Тип`,
                                page.accessTemplateScheduleHoliday));
                    });
                });

                params.data.forEach((obj, index) => {
                    describe(`Проверка строки ${index + 13}`, () => {
                        it(`Название ${obj.days.end} ${obj.month}`, async () =>
                            dec.simpleText(page.accessTemplateScheduleHoliday.holidayDate,
                                [index + 13, entry.max],
                                `${obj.days.end} ${obj.month}`,
                                page.accessTemplateScheduleHoliday));

                        it(`Тип ${obj.types.end}`, async () =>
                            dec.simpleText(page.accessTemplateScheduleHoliday.holidayType,
                                [index + 13, entry.max],
                                `${obj.types.end} Тип`,
                                page.accessTemplateScheduleHoliday));
                    });
                });
            });

            describe('Изменение название и удаление праздников', () => {

                bef();
                aft();

                it('Ввод в "Поиск..."', async () => await dec.simple(el.input.sendKeys,
                    ['', 'Поиск...', params.name, entry.max],
                    el.input));

                it('Отображение в таблице одной строки в таблице', async () => await dec.simple(el.table.singleSize,
                    [entry.max],
                    el.table));

                it('Нажатие по первой строке таблицы', async () => await dec.simple(el.table.strHandler,
                    [1, entry.max],
                    el.table));

                it('Нажатие кнопки "Редактировать"', async () => await dec.simple(el.butIcBefore.handler,
                    [but.edit, entry.max],
                    el.butIcBefore));

                it('Отображение "title", "url"',
                    async () => await dec.simple(page.accessTemplateScheduleHoliday.init,
                        [entry.max],
                        page.accessTemplateScheduleChangePage));

                it('Удаление "Название"', async () => await dec.simple(el.input.backSpace,
                    ['Название', '', entry.max],
                    el.input));

                it('Ввод "Название"', async () => await dec.simple(el.input.sendKeys,
                    ['Название', '', params.name, entry.max],
                    el.input));

                [...Array(24).keys()].forEach(item => {
                    it(`Удаление строки ${item + 1} из праздничного расписания`,
                        async () => await dec.simple(page.accessTemplateScheduleHoliday.holidayDelete,
                            [1, entry.max],
                            page.accessTemplateScheduleHoliday))});

                it('Нажатие кнопки "Сохранить изменения"', async () => await dec.simple(el.button.handler,
                    ['Сохранить изменения', entry.max],
                    el.button));

                it('Отображение уведомления "Сохранено успешно"', async () => await dec.simple(el.success.success,
                    ['Сохранено успешно', entry.max],
                    el.success));
            });

            checkTable(params.name, '', params.name);

            describe('Проверка параметров', () => {

                bef();
                aft();

                it('Ввод в "Поиск..."', async () => await dec.simple(el.input.sendKeys,
                    ['', 'Поиск...', params.name, entry.max],
                    el.input));

                it('Отображение в таблице одной строки в таблице', async () => await dec.simple(el.table.singleSize,
                    [entry.max],
                    el.table));

                it('Нажатие по первой строке таблицы', async () => await dec.simple(el.table.strHandler,
                    [1, entry.max],
                    el.table));

                it('Нажатие кнопки "Редактировать"', async () => await dec.simple(el.butIcBefore.handler,
                    [but.edit, entry.max],
                    el.butIcBefore));

                it('Отображение "title", "url"',
                    async () => await dec.simple(page.accessTemplateScheduleHoliday.init,
                        [entry.max],
                        page.accessTemplateScheduleChangePage));

                it('Проверка "Название"', async () => await dec.simpleText(el.input.getValue,
                    ['Название', '', entry.max],
                    params.name,
                    el.input));

                it('Проверка "Временной критерий"', async () => await dec.simpleText(el.select.getText,
                    ['Временной критерий', params.name, entry.max],
                    params.name,
                    el.input));

                it('Отсуствтие праздников',
                    async () => await dec.simple(page.accessTemplateScheduleHoliday.holidayCount,
                        [0, entry.max],
                        page.accessTemplateScheduleHoliday));
            });
        });

    const deleteHoliday = () => describe('Праздничное расписание. Попытка удаления.', () => {

        bef();
        aft();

        it('Ввод в "Поиск..."', async () => await dec.simple(el.input.sendKeys,
            ['', 'Поиск...', 'Праздничное расписание', entry.max],
            el.input));

        it('Отображение в таблице одной строки в таблице', async () => await dec.simple(el.table.singleSize,
            [entry.max],
            el.table));

        it('Нажатие по первой строке таблицы', async () => await dec.simple(el.table.strHandler,
            [1, entry.max],
            el.table));

        it('Нажатие кнопки "Удалить"', async () => await dec.simple(el.butIcBefore.handler,
            [but.delete, entry.max],
            el.butIcBefore));

        it('Отображение модального окна "Удаление шаблона доступа"',
            async () => await dec.simple(el.modalConfirm.accessSchedulesDelete.init,
                [entry.max],
                el.modalConfirm.accessSchedulesDelete));

        it('Нажатие кнопки "Удалить" в модально окне', async () => await dec.simple(el.button.handler,
            ['Удалить', entry.max],
            el.button));

        it(`Отображение ошибки "Праздничное расписание удалить нельзя"`, async () => await dec.simple(el.error.error,
            ['Праздничное расписание удалить нельзя', entry.max],
            el.error));

        it('Отсутствие модального окна "Удаление шаблона доступа"',
            async () => await dec.simple(el.modalConfirm.accessSchedulesDelete.initClose,
                [entry.max],
                el.modalConfirm.accessSchedulesDelete));
    });

    return {
        addIntervalMin,
        editMaxParams,
        addDuplicate,
        deleteHoliday
    }
};

// Временные зоны - Всегда, Никогда
const service = () => {

    const editNameAlways = () => describe('Временные зоны. Редактирование название у временной зоны "Всегда".',
        () => {
            const params = {
                name: 'Всегда',
                nameUpdate: 'editNameAlwaysName',
                error: 'Служебные графики редактировать запрещено'
            }

            describe('Редактирование', () => {

                bef();
                aft();

                it('Ввод в "Поиск..."', async () => await dec.simple(el.input.sendKeys,
                    ['', 'Поиск...', params.name, entry.max],
                    el.input));

                it('Отображение в таблице одной строки в таблице', async () => await dec.simple(el.table.singleSize,
                    [entry.max],
                    el.table));

                it('Нажатие по первой строке таблицы', async () => await dec.simple(el.table.strHandler,
                    [1, entry.max],
                    el.table));

                it('Нажатие кнопки "Редактировать"', async () => await dec.simple(el.butIcBefore.handler,
                    [but.edit, entry.max],
                    el.butIcBefore));

                it('Отображение "title", "url"',
                    async () => await dec.simple(page.accessTemplateScheduleChangePage.initEdit,
                        [entry.max],
                        page.accessTemplateScheduleChangePage));

                it('Удаление "Название"', async () => await dec.simple(el.input.backSpace,
                    ['Название', '', entry.max],
                    el.input));

                it('Ввод "Название"', async () => await dec.simple(el.input.sendKeys,
                    ['Название', '', params.nameUpdate, entry.max],
                    el.input));

                it('Нажатие кнопки "Сохранить изменения"', async () => await dec.simple(el.button.handler,
                    ['Сохранить изменения', entry.max],
                    el.button));

                it(`Отображение ошибки ${params.error}`, async () => await dec.simple(el.error.error,
                    [params.error, entry.max],
                    el.error));
            });

            checkTable(params.name, '', 'Временные зоны');
        });

    const editDescriptionAlways = () => describe('Временные зоны. ' +
        'Редактирование описание у временной зоны "Всегда".', () => {

        const params = {
            name: 'Всегда',
            description: 'editNameAlwaysDescription',
            error: 'Служебные графики редактировать запрещено'
        }

        describe('Редактирование', () => {

            bef();
            aft();

            it('Ввод в "Поиск..."', async () => await dec.simple(el.input.sendKeys,
                ['', 'Поиск...', params.name, entry.max],
                el.input));

            it('Отображение в таблице одной строки в таблице', async () => await dec.simple(el.table.singleSize,
                [entry.max],
                el.table));

            it('Нажатие по первой строке таблицы', async () => await dec.simple(el.table.strHandler,
                [1, entry.max],
                el.table));

            it('Нажатие кнопки "Редактировать"', async () => await dec.simple(el.butIcBefore.handler,
                [but.edit, entry.max],
                el.butIcBefore));

            it('Отображение "title", "url"',
                async () => await dec.simple(page.accessTemplateScheduleChangePage.initEdit,
                    [entry.max],
                    page.accessTemplateScheduleChangePage));

            it('Удаление "Описание"', async () => await dec.simple(el.input.backSpace,
                ['Описание', '', entry.max],
                el.input));

            it('Ввод "Описание"', async () => await dec.simple(el.input.sendKeys,
                ['Описание', '', params.description, entry.max],
                el.input));

            it('Нажатие кнопки "Сохранить изменения"', async () => await dec.simple(el.button.handler,
                ['Сохранить изменения', entry.max],
                el.button));

            it(`Отображение ошибки ${params.error}`, async () => await dec.simple(el.error.error,
                [params.error, entry.max],
                el.error));
        });

        checkTable(params.name, '', 'Временные зоны');

    });

    const deleteAlways = () => describe('Временные зоны. Удаление временной зоны "Всегда".', () => {

        const params = {
            name: 'Всегда',
            error: 'Служебные графики удалять запрещено'
        }

        describe('Удаление', () => {

            bef();
            aft();

            it('Ввод в "Поиск..."', async () => await dec.simple(el.input.sendKeys,
                ['', 'Поиск...', params.name, entry.max],
                el.input));

            it('Отображение в таблице одной строки в таблице', async () => await dec.simple(el.table.singleSize,
                [entry.max],
                el.table));

            it('Нажатие по первой строке таблицы', async () => await dec.simple(el.table.strHandler,
                [1, entry.max],
                el.table));

            it('Нажатие кнопки "Удалить"', async () => await dec.simple(el.butIcBefore.handler,
                [but.delete, entry.max],
                el.butIcBefore));

            it('Отображение модального окна "Удаление шаблона доступа"',
                async () => await dec.simple(el.modalConfirm.accessSchedulesDelete.init,
                    [entry.max],
                    el.modalConfirm.accessSchedulesDelete));

            it('Нажатие кнопки "Удалить" в модально окне', async () => await dec.simple(el.button.handler,
                ['Удалить', entry.max],
                el.button));

            it(`Отображение ошибки ${params.error}`, async () => await dec.simple(el.error.error,
                [params.error, entry.max],
                el.error));

            it('Отсутствие модального окна "Удаление шаблона доступа"',
                async () => await dec.simple(el.modalConfirm.accessSchedulesDelete.initClose,
                    [entry.max],
                    el.modalConfirm.accessSchedulesDelete));

            it('Отображение в таблице одной строки в таблице', async () => await dec.simple(el.table.singleSize,
                [entry.max],
                el.table));
        });

    });

    const editNameNever = () => describe('Временные зоны. Редактирование название у временной зоны "Никогда".',
        () => {
            const params = {
                name: 'Никогда',
                nameUpdate: 'editNameNeverName',
                error: 'Интервал не может быть меньше 30 минут'
            }

            describe('Редактирование', () => {

                bef();
                aft();

                it('Ввод в "Поиск..."', async () => await dec.simple(el.input.sendKeys,
                    ['', 'Поиск...', params.name, entry.max],
                    el.input));

                it('Отображение в таблице одной строки в таблице', async () => await dec.simple(el.table.singleSize,
                    [entry.max],
                    el.table));

                it('Нажатие по первой строке таблицы', async () => await dec.simple(el.table.strHandler,
                    [1, entry.max],
                    el.table));

                it('Нажатие кнопки "Редактировать"', async () => await dec.simple(el.butIcBefore.handler,
                    [but.edit, entry.max],
                    el.butIcBefore));

                it('Отображение "title", "url"',
                    async () => await dec.simple(page.accessTemplateScheduleChangePage.initEdit,
                        [entry.max],
                        page.accessTemplateScheduleChangePage));

                it('Удаление "Название"', async () => await dec.simple(el.input.backSpace,
                    ['Название', '', entry.max],
                    el.input));

                it('Ввод "Название"', async () => await dec.simple(el.input.sendKeys,
                    ['Название', '', params.nameUpdate, entry.max],
                    el.input));

                it('Нажатие кнопки "Сохранить изменения"', async () => await dec.simple(el.button.handler,
                    ['Сохранить изменения', entry.max],
                    el.button));

                it(`Отображение ошибки ${params.error}`, async () => await dec.simple(el.error.error,
                    [params.error, entry.max],
                    el.error));
            });

            checkTable(params.name, '', 'Временные зоны');
        });

    const editDescriptionNever = () => describe('Временные зоны. ' +
        'Редактирование описание у временной зоны "Никогда".', () => {

        const params = {
            name: 'Никогда',
            description: 'editNameNeverDescription',
            error: 'Интервал не может быть меньше 30 минут'
        }

        describe('Редактирование', () => {

            bef();
            aft();

            it('Ввод в "Поиск..."', async () => await dec.simple(el.input.sendKeys,
                ['', 'Поиск...', params.name, entry.max],
                el.input));

            it('Отображение в таблице одной строки в таблице', async () => await dec.simple(el.table.singleSize,
                [entry.max],
                el.table));

            it('Нажатие по первой строке таблицы', async () => await dec.simple(el.table.strHandler,
                [1, entry.max],
                el.table));

            it('Нажатие кнопки "Редактировать"', async () => await dec.simple(el.butIcBefore.handler,
                [but.edit, entry.max],
                el.butIcBefore));

            it('Отображение "title", "url"',
                async () => await dec.simple(page.accessTemplateScheduleChangePage.initEdit,
                    [entry.max],
                    page.accessTemplateScheduleChangePage));

            it('Удаление "Описание"', async () => await dec.simple(el.input.backSpace,
                ['Описание', '', entry.max],
                el.input));

            it('Ввод "Описание"', async () => await dec.simple(el.input.sendKeys,
                ['Описание', '', params.description, entry.max],
                el.input));

            it('Нажатие кнопки "Сохранить изменения"', async () => await dec.simple(el.button.handler,
                ['Сохранить изменения', entry.max],
                el.button));

            it(`Отображение ошибки ${params.error}`, async () => await dec.simple(el.error.error,
                [params.error, entry.max],
                el.error));
        });

        checkTable(params.name, '', 'Временные зоны');
    });

    const deleteNever = () => describe('Временные зоны. Удаление временной зоны "Никогда".', () => {

        const params = {
            name: 'Никогда',
            error: 'Служебные графики удалять запрещено'
        }

        describe('Удаление', () => {

            bef();
            aft();

            it('Ввод в "Поиск..."', async () => await dec.simple(el.input.sendKeys,
                ['', 'Поиск...', params.name, entry.max],
                el.input));

            it('Отображение в таблице одной строки в таблице', async () => await dec.simple(el.table.singleSize,
                [entry.max],
                el.table));

            it('Нажатие по первой строке таблицы', async () => await dec.simple(el.table.strHandler,
                [1, entry.max],
                el.table));

            it('Нажатие кнопки "Удалить"', async () => await dec.simple(el.butIcBefore.handler,
                [but.delete, entry.max],
                el.butIcBefore));

            it('Отображение модального окна "Удаление шаблона доступа"',
                async () => await dec.simple(el.modalConfirm.accessSchedulesDelete.init,
                    [entry.max],
                    el.modalConfirm.accessSchedulesDelete));

            it('Нажатие кнопки "Удалить" в модально окне', async () => await dec.simple(el.button.handler,
                ['Удалить', entry.max],
                el.button));

            it(`Отображение ошибки ${params.error}`, async () => await dec.simple(el.error.error,
                [params.error, entry.max],
                el.error));

            it('Отсутствие модального окна "Удаление шаблона доступа"',
                async () => await dec.simple(el.modalConfirm.accessSchedulesDelete.initClose,
                    [entry.max],
                    el.modalConfirm.accessSchedulesDelete));

            it('Отображение в таблице одной строки в таблице', async () => await dec.simple(el.table.singleSize,
                [entry.max],
                el.table));
        });
    });

    return {
        editNameAlways,
        editDescriptionAlways,
        deleteAlways,
        editNameNever,
        editDescriptionNever,
        deleteNever
    }

};

// Фильтр Поиск...
const search = () => describe('Временные критерии доступа. Проверка фильтра "Поиск...".', () => {

    const params = {
        tz1: 'tz1',
        week1: 'week1',
        week1Description: 'week1Description',
        stz1: 'грпонедельный',
        sw1: 'sw1',
        tz2: 'tz2',
        tz2Description: 'шаблон понедельный тест',
        date: '2001-01-01',
    }

    describe('API - Добавление', () => {
        bef();
        aft();
        addTZ({
            name: params.tz1,
            items: [{begin: 0, end: 1800}]
        });
        addTZ({
            name: params.tz2,
            comment: params.tz2Description,
            items: [{begin: 0, end: 1800}]
        });
        addWeek({
            name: params.week1,
            comment: params.week1Description,
            items: {
                days: [
                    {id: 1},
                    {id: 1},
                    {id: 1},
                    {id: 1},
                    {id: 1},
                    {id: 1},
                    {id: 1}],
                holidays: [
                    {dayId: 1},
                    {dayId: 1},
                    {dayId: 1},
                    {dayId: 1},
                    {dayId: 1},
                    {dayId: 1},
                    {dayId: 1},
                    {dayId: 1}]
            }
        });
        addSTZ({
            name: params.stz1,
            begin_date: params.date,
            items: {days: [{id: 1}]}
        });
        it('Добавление скользящего понедельного графика', async () => {
            const cook = await page.base.getCookie('token');
            const get = await api.getAccessSchedules({type: 2}, cook.text);
            const parse = JSON.parse(get.text);
            const sw = {
                name: params.sw1,
                comment: '',
                begin_date: params.date,
                items: [parse.filter(item => item.name === params.week1)[0]['id']]
            }
            await dec.simple(api.putArraySW,
                [[sw], cook.text],
                api.putArraySW);
        });
    });

    describe('Поиск по столбцу "Название"', () => {

        bef();
        aft();

        it(`Ввод в "Поиск..." - ${params.tz1}`, async () => await dec.simple(el.input.sendKeys,
            ['', 'Поиск...', params.tz1, entry.max],
            el.input));

        it('Отображение в таблице одной строки', async () => await dec.simple(el.table.singleSize,
            [entry.max],
            el.table));

        it('Поле "Название"', async () => await dec.simpleText(el.table.cellGetText,
            ['Название', 1, 1, entry.max],
            params.tz1,
            el.table));
    });

    describe('Поиск по столбцу "Описание"', () => {

        bef();
        aft();

        it(`Ввод в "Поиск..." - ${params.week1Description}`, async () => await dec.simple(el.input.sendKeys,
            ['', 'Поиск...', params.week1Description, entry.max],
            el.input));

        it('Отображение в таблице одной строки', async () => await dec.simple(el.table.singleSize,
            [entry.max],
            el.table));

        it('Поле "Описание"', async () => await dec.simpleText(el.table.cellGetText,
            ['Описание', 1, 2, entry.max],
            params.week1Description,
            el.table));
    });

    describe('Поиск по столбцу "Тип"', () => {

        bef();
        aft();

        it(`Ввод в "Поиск..." - Праздничное расписание`, async () => await dec.simple(el.input.sendKeys,
            ['', 'Поиск...', 'Праздничное расписание', entry.max],
            el.input));

        it('Отображение в таблице одной строки', async () => await dec.simple(el.table.singleSize,
            [entry.max],
            el.table));

        it('Поле "Тип"', async () => await dec.simpleText(el.table.cellGetText,
            ['Тип', 1, 3, entry.max],
            'Праздничное расписание',
            el.table));
    });

    describe('Совпадение по всем столбцам', () => {

        bef();
        aft();

        it(`Ввод в "Поиск..." - понедельный`, async () => await dec.simple(el.input.sendKeys,
            ['', 'Поиск...', 'понедельный', entry.max],
            el.input));

        it('Отображение в таблице 3 строки', async () => await dec.simple(el.table.size,
            [3, entry.max],
            el.table));

        it('Строка 1 - поле "Тип"', async () => await dec.simpleText(el.table.cellGetText,
            ['Тип', 1, 3, entry.max],
            'Скользящий понедельный график',
            el.table));

        it('Строка 2 - поле "Название"', async () => await dec.simpleText(el.table.cellGetText,
            ['Название', 2, 1, entry.max],
            params.stz1,
            el.table));

        it('Строка 3 - поле "Описание"', async () => await dec.simpleText(el.table.cellGetText,
            ['Описание', 3, 2, entry.max],
            params.tz2Description,
            el.table));
    });

    describe('Отсутствие совпадений', () => {

        bef();
        aft();

        it(`Ввод в "Поиск..." - test`, async () => await dec.simple(el.input.sendKeys,
            ['', 'Поиск...', 'test', entry.max],
            el.input));

        it('Отсутствие строк в таблице', async () => await dec.simple(el.table.noStr,
            [entry.max],
            el.table));

        it('Отображение в таблице "Нет данных для отображения."', async () => await dec.simpleText(el.rowEmpty.getText,
            [entry.max],
            'Нет данных для отображения.',
            el.rowEmpty));


    });

    deleteParams();
});

// Проверка количества страниц и переключения страниц
const footer = () => describe('Временные критерии доступа. ' +
    'Проверка количества страниц и переключения страниц.', () => {
    const params = [...Array(96).keys()].map(item => {
        return {
            name: 'tz ' + (item + 1),
            comment: '',
            items: [{begin: 0, end: 1800}]
        }
    });

    describe('API - Добавление', () => {
        bef();
        aft();
        params.forEach(obj => addTZ(obj));
        addTZ({
            name: 'tz ' + 100,
            comment: '',
            items: [{begin: 0, end: 1800}]
        })
    });

    oth.footer('Название', 'tz', 1, 1, bef, aft);

    deleteParams();

});

// Фильтр Тип
const type = () => describe('Временные критерии доступа. Проверка фильтра по типу.', () => {

    const params = {
        tz1: 'tz1',
        week1: 'week1',
        stz1: 'stz1',
        sw1: 'sw1',
        date: '2001-01-01',
    }

    describe('API - Добавление', () => {
        bef();
        aft();
        addTZ({
            name: params.tz1,
            items: [{begin: 0, end: 1800}]
        });
        addWeek({
            name: params.week1,
            comment: '',
            items: {
                days: [
                    {id: 1},
                    {id: 1},
                    {id: 1},
                    {id: 1},
                    {id: 1},
                    {id: 1},
                    {id: 1}],
                holidays: [
                    {dayId: 1},
                    {dayId: 1},
                    {dayId: 1},
                    {dayId: 1},
                    {dayId: 1},
                    {dayId: 1},
                    {dayId: 1},
                    {dayId: 1}]
            }
        });
        addSTZ({
            name: params.stz1,
            begin_date: params.date,
            items: {days: [{id: 1}]}
        });
        it('Добавление скользящего понедельного графика', async () => {
            const cook = await page.base.getCookie('token');
            const get = await api.getAccessSchedules({type: 2}, cook.text);
            const parse = JSON.parse(get.text);
            const sw = {
                name: params.sw1,
                comment: '',
                begin_date: params.date,
                items: [parse.filter(item => item.name === params.week1)[0]['id']]
            }
            await dec.simple(api.putArraySW,
                [[sw], cook.text],
                api.putArraySW);
        });
    });

    describe('Проверки фильтрации', () => {

        bef();
        aft();

        describe('Тип "Временные зоны"', () => {

            it('Выбор "Временные зоны"', async () => await dec.simple(el.selectMulti.iconXpandSelected,
                ['', 'Временные зоны', entry.max],
                el.selectMulti));

            it('Отображение в таблице 3 строки', async () => await dec.simple(el.table.size,
                [3, entry.max],
                el.table));

            it(`Строка 1 поле "Название" - ${params.tz1}`, async () => await dec.simpleText(el.table.cellGetText,
                ['Название', 1, 1, entry.max],
                params.tz1,
                el.table));

            it('Строка 2 поле "Название" - Всегда', async () => await dec.simpleText(el.table.cellGetText,
                ['Название', 2, 1, entry.max],
                'Всегда',
                el.table));

            it('Строка 3 поле "Название" - Никогда', async () => await dec.simpleText(el.table.cellGetText,
                ['Название', 3, 1, entry.max],
                'Никогда',
                el.table));
        });

        describe('Тип "Недельный график"', () => {

            it('Выбор "Недельный график"', async () => await dec.simple(el.selectMulti.iconXpandSelected,
                ['', 'Недельный график', entry.max],
                el.selectMulti));

            it('Отображение в таблице 1 строки', async () => await dec.simple(el.table.size,
                [1, entry.max],
                el.table));

            it(`Строка 1 поле "Название" - ${params.week1}`, async () => await dec.simpleText(el.table.cellGetText,
                ['Название', 1, 1, entry.max],
                params.week1,
                el.table));
        });

        describe('Тип "Скользящий посуточный график"', () => {

            it('Выбор "Скользящий посуточный график"', async () => await dec.simple(el.selectMulti.iconXpandSelected,
                ['', 'Скользящий посуточный график', entry.max],
                el.selectMulti));

            it('Отображение в таблице 1 строки', async () => await dec.simple(el.table.size,
                [1, entry.max],
                el.table));

            it(`Строка 1 поле "Название" - ${params.stz1}`, async () => await dec.simpleText(el.table.cellGetText,
                ['Название', 1, 1, entry.max],
                params.stz1,
                el.table));
        });

        describe('Тип "Скользящий понедельный график"', () => {

            it('Выбор "Скользящий понедельный график"', async () => await dec.simple(el.selectMulti.iconXpandSelected,
                ['', 'Скользящий понедельный график', entry.max],
                el.selectMulti));

            it('Отображение в таблице 1 строки', async () => await dec.simple(el.table.size,
                [1, entry.max],
                el.table));

            it(`Строка 1 поле "Название" - ${params.stz1}`, async () => await dec.simpleText(el.table.cellGetText,
                ['Название', 1, 1, entry.max],
                params.sw1,
                el.table));
        });

        describe('Тип "Праздничное расписание"', () => {

            it('Выбор "Праздничное расписание"', async () => await dec.simple(el.selectMulti.iconXpandSelected,
                ['', 'Праздничное расписание', entry.max],
                el.selectMulti));

            it('Отображение в таблице 1 строки', async () => await dec.simple(el.table.size,
                [1, entry.max],
                el.table));

            it(`Строка 1 поле "Название" - Праздничное расписание`, async () => await dec.simpleText(el.table.cellGetText,
                ['Название', 1, 1, entry.max],
                'Праздничное расписание',
                el.table));
        });

        describe('Тип "Все"', () => {

            it('Выбор "Временные зоны"', async () => await dec.simple(el.selectMulti.iconXpandSelected,
                ['', 'Все', entry.max],
                el.selectMulti));

            it('Отображение в таблице 7 строк', async () => await dec.simple(el.table.size,
                [7, entry.max],
                el.table));

            it(`Строка 1 поле "Название" - ${params.sw1}`, async () => await dec.simpleText(el.table.cellGetText,
                ['Название', 1, 1, entry.max],
                params.sw1,
                el.table));

            it(`Строка 2 поле "Название" - ${params.stz1}`, async () => await dec.simpleText(el.table.cellGetText,
                ['Название', 2, 1, entry.max],
                params.stz1,
                el.table));

            it(`Строка 3 поле "Название" - ${params.week1}`, async () => await dec.simpleText(el.table.cellGetText,
                ['Название', 3, 1, entry.max],
                params.week1,
                el.table));

            it(`Строка 4 поле "Название" - ${params.tz1}`, async () => await dec.simpleText(el.table.cellGetText,
                ['Название', 4, 1, entry.max],
                params.tz1,
                el.table));

            it(`Строка 5 поле "Название" - Праздничное расписание`,
                async () => await dec.simpleText(el.table.cellGetText,
                    ['Название', 5, 1, entry.max],
                    'Праздничное расписание',
                    el.table));

            it('Строка 6 поле "Название" - Всегда', async () => await dec.simpleText(el.table.cellGetText,
                ['Название', 6, 1, entry.max],
                'Всегда',
                el.table));

            it('Строка 7 поле "Название" - Никогда', async () => await dec.simpleText(el.table.cellGetText,
                ['Название', 7, 1, entry.max],
                'Никогда',
                el.table));


        });
    });

    deleteParams();
});

// Сортировски по столбцам
const sort = () => describe('Временные критерии доступа. Проверка сортировки столбцов.', () => {

    const params = {
        sort: ['0', '01', '1', '10', 'a', 'ab', 'ac', 'z', 'а', 'аб', 'ав', 'я'],
        name: ['Всегда', 'Никогда', 'Праздничное расписание'],
        description: ['', '', ''],
        type: ['Временные зоны', 'Временные зоны', 'Праздничное расписание']
    }

    describe('API - Добавление', () => {
        bef();
        aft();
        params.sort.forEach(item => {
            addTZ({
                name: item,
                comment: item,
                items: [{begin: 0, end: 1800}]
            });
        });
    });

    describe('Проверка столбца "Название"', () => {
        bef();
        aft();
        const array = [...params.sort, ...params.name].sort((a, b) => {
            if(a.toLowerCase() < b.toLowerCase()) {
                return -1
            }
        });
        oth.sorter('Название', 1, array);
    });

    describe('Проверка столбца "Описание"', () => {
        bef();
        aft();
        const array = [...params.sort, ...params.description].sort((a, b) => {
            if(a.toLowerCase() < b.toLowerCase()) {
                return -1
            }
        });
        oth.sorter('Описание', 2, array);
    });

    describe('Проверка столбца "Тип"', () => {
        bef();
        aft();
        const array = [...params.sort.map(() => 'Временные зоны'), ...params.type].sort((a, b) =>
        {
            if(a.toLowerCase() < b.toLowerCase()) {
                return -1
            }
        });
        oth.sorter('Тип', 3, array);
    });

    deleteParams();
});


module.exports = {
    display,
    add: add(),
    edit: edit(),
    delete: deleteSchedule(),
    holiday: holiday(),
    service: service(),
    search,
    footer,
    type,
    sort
};
