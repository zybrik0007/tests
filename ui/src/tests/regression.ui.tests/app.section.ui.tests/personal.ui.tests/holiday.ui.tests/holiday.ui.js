const {describe, it} = require('mocha');

const entry = require('../../../../../../../entry');
const but = require('../../../../../dictionaries/button-icon');
const decorate = require('../../../../../decorates');

const bef = () => decorate.befAft.before.beforeHoliday();
const aft = () => decorate.befAft.after.afterNoLoader();

const test = () => {

    const addHoliday = () =>  describe('Персонал / Праздничные дни. Добавление праздничного дня.', () => {

        describe('Добавление праздника на 1 января 2024', () => {
            bef();
            aft();

            decorate.page.holiday.dayHandler({
                monthNumber: 1,
                dayNumber: 1,
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
            decorate.modal.holidayType.init({
                timeout: entry.max
            });
            decorate.el.select.iconXpand({
                title: 'Тип',
                value: 'Обычный день',
                text: 'Праздник',
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
            decorate.el.input.sendKeys({
                title: 'Название',
                placeholder: '',
                value: 'test',
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
        });

        describe('Проверка', () => {
            bef();
            aft();

            decorate.page.holiday.monthGetValue({
                monthNumber: 1,
                value: 'Январь',
                timeout: entry.max
            });
            decorate.page.holiday.dayGetValue({
                monthNumber: 1,
                dayNumber: 1,
                value: '1',
                timeout: entry.max
            });
            decorate.page.holiday.dayTypeGetValue({
                monthNumber: 1,
                dayNumber: 1,
                value: 'Праздник',
                timeout: entry.max
            });
            decorate.page.holiday.dayHandler({
                monthNumber: 1,
                dayNumber: 1,
                timeout: entry.max
            });
            decorate.modal.holidayType.init({
                timeout: entry.max
            });
            decorate.el.select.select({
                title: 'Тип',
                value: 'Праздник',
                timeout: entry.max
            });
            decorate.el.input.getValue({
                title: 'Название',
                placeholder: '',
                value: 'test',
                timeout: entry.max
            });
            decorate.modal.holidayType.closeHandler({
                timeout: entry.sleep2
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
        });
    });

    const addPreHoliday = () => describe('Персонал / Праздничные дни. Добавление предпраздничного дня.', () => {
        describe('Добавление предпраздничного дня на 2 января 2024', () => {
            bef();
            aft();

            decorate.page.holiday.dayHandler({
                monthNumber: 1,
                dayNumber: 2,
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
            decorate.modal.holidayType.init({
                timeout: entry.max
            });
            decorate.el.select.iconXpand({
                title: 'Тип',
                value: 'Обычный день',
                text: 'Предпраздничный день',
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
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
        });

        describe('Проверка', () => {
            bef();
            aft();

            decorate.page.holiday.monthGetValue({
                monthNumber: 1,
                value: 'Январь',
                timeout: entry.max
            });
            decorate.page.holiday.dayGetValue({
                monthNumber: 1,
                dayNumber: 2,
                value: '2',
                timeout: entry.max
            });
            decorate.page.holiday.dayTypeGetValue({
                monthNumber: 1,
                dayNumber: 2,
                value: 'Предпраздничный день',
                timeout: entry.max
            });
            decorate.page.holiday.dayHandler({
                monthNumber: 1,
                dayNumber: 2,
                timeout: entry.max
            });
            decorate.modal.holidayType.init({
                timeout: entry.max
            });
            decorate.el.select.select({
                title: 'Тип',
                value: 'Предпраздничный день',
                timeout: entry.max
            });
            decorate.el.input.getValue({
                title: 'Величина сокращения',
                placeholder: '',
                value: '00:00',
                timeout: entry.max
            });
            decorate.modal.holidayType.closeHandler({
                timeout: entry.sleep2
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
        });
    });

    const addMark = () => describe('Персонал / Праздничные дни. Добавление помеченного дня.', () => {
        describe('Добавление помеченного дня на 3 января 2024', () => {
            bef();
            aft();

            decorate.page.holiday.dayHandler({
                monthNumber: 1,
                dayNumber: 3,
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
            decorate.modal.holidayType.init({
                timeout: entry.max
            });
            decorate.el.select.iconXpand({
                title: 'Тип',
                value: 'Обычный день',
                text: 'Пометка',
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
            decorate.el.input.sendKeys({
                title: 'Текст',
                placeholder: '',
                value: 'test',
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
        });

        describe('Проверка', () => {
            bef();
            aft();

            decorate.page.holiday.monthGetValue({
                monthNumber: 1,
                value: 'Январь',
                timeout: entry.max
            });
            decorate.page.holiday.dayGetValue({
                monthNumber: 1,
                dayNumber: 3,
                value: '3',
                timeout: entry.max
            });
            decorate.page.holiday.dayTypeGetValue({
                monthNumber: 1,
                dayNumber: 3,
                value: 'Пометка',
                timeout: entry.max
            });
            decorate.page.holiday.dayHandler({
                monthNumber: 1,
                dayNumber: 3,
                timeout: entry.max
            });
            decorate.modal.holidayType.init({
                timeout: entry.max
            });
            decorate.el.select.select({
                title: 'Тип',
                value: 'Пометка',
                timeout: entry.max
            });
            decorate.el.input.getValue({
                title: 'Текст',
                placeholder: '',
                value: 'test',
                timeout: entry.max
            });
            decorate.modal.holidayType.closeHandler({
                timeout: entry.sleep2
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
        });
    });

    const addWork = () => describe('Персонал / Праздничные дни. Добавление рабочего выходного дня.', () => {
        describe('Добавление рабочего выходного дня на 6 января 2024', () => {
            bef();
            aft();

            decorate.page.holiday.dayHandler({
                monthNumber: 1,
                dayNumber: 6,
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
            decorate.modal.holidayType.init({
                timeout: entry.max
            });
            decorate.el.select.iconXpand({
                title: 'Тип',
                value: 'Обычный день',
                text: 'Рабочий выходной',
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
            decorate.el.input.iconCalendar({
                title: 'Дата переноса',
                placeholder: '',
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
            decorate.el.datepicker.dateParse({
                year: '2024',
                month: 'Январь',
                day: 4,
                scrollYear: -500,
                scrollMinute: -500,
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
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
        });

        describe('Проверка', () => {
            bef();
            aft();

            decorate.page.holiday.monthGetValue({
                monthNumber: 1,
                value: 'Январь',
                timeout: entry.max
            });
            decorate.page.holiday.dayGetValue({
                monthNumber: 1,
                dayNumber: 4,
                value: '4',
                timeout: entry.max
            });
            decorate.page.holiday.dayTypeGetValue({
                monthNumber: 1,
                dayNumber: 4,
                value: 'Праздник',
                timeout: entry.max
            });
            decorate.page.holiday.dayGetValue({
                monthNumber: 1,
                dayNumber: 6,
                value: '6',
                timeout: entry.max
            });
            decorate.page.holiday.dayTypeGetValue({
                monthNumber: 1,
                dayNumber: 6,
                value: 'Рабочий выходной',
                timeout: entry.max
            });
            decorate.page.holiday.dayHandler({
                monthNumber: 1,
                dayNumber: 6,
                timeout: entry.max
            });
            decorate.modal.holidayType.init({
                timeout: entry.max
            });
            decorate.el.select.select({
                title: 'Тип',
                value: 'Рабочий выходной',
                timeout: entry.max
            });
            decorate.el.input.getValue({
                title: 'Величина сокращения',
                placeholder: '',
                value: '00:00',
                timeout: entry.max
            });
            decorate.el.input.getValue({
                title: 'Дата переноса',
                placeholder: '',
                value: '2024-01-04',
                timeout: entry.max
            });
            decorate.modal.holidayType.closeHandler({
                timeout: entry.sleep2
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
        });
    });

    const yearFilter = () => describe('Персонал / Праздничные дни. Проверка фильтра по году.', () => {
        bef();
        aft();
        decorate.el.select.iconXpand({
            title: '',
            value: '2024',
            text: '2025',
            timeout: entry.max
        });
        decorate.page.holiday.dayTypeGetValue({
            monthNumber: 1,
            dayNumber: 1,
            value: 'Обычный день',
            timeout: entry.max
        });
    });

    const reset = () => describe('Персонал / Праздничные дни. Проверка кнопки "Очистить".', () => {
        bef();
        aft();
        decorate.el.butIcBefore.handler({
            icon: but.unsorted_delete_outline_android,
            timeout: entry.max
        });
        decorate.modalConfirm.resetHoliday.init({
            timeout: entry.max
        });
        decorate.page.base.loading({
            timeout: entry.sleep2
        });
        decorate.el.button.handler({
            name: 'Подтвердить',
            timeout: entry.max
        });
        decorate.modalConfirm.resetHoliday.initClose({
            timeout: entry.max
        });
        decorate.page.base.loading({
            timeout: entry.sleep2
        });
        decorate.page.holiday.dayTypeGetValue({
            monthNumber: 1,
            dayNumber: 1,
            value: 'Обычный день',
            timeout: entry.max
        });
        decorate.page.holiday.dayTypeGetValue({
            monthNumber: 1,
            dayNumber: 2,
            value: 'Обычный день',
            timeout: entry.max
        });
        decorate.page.holiday.dayTypeGetValue({
            monthNumber: 1,
            dayNumber: 3,
            value: 'Обычный день',
            timeout: entry.max
        });
        decorate.page.holiday.dayTypeGetValue({
            monthNumber: 1,
            dayNumber: 4,
            value: 'Обычный день',
            timeout: entry.max
        });
        decorate.page.holiday.dayTypeGetValue({
            monthNumber: 1,
            dayNumber: 6,
            value: 'Обычный день',
            timeout: entry.max
        });
    });

    const addCalendar = () => describe('Персонал / Праздничные дни. ' +
        'Добавление дня в "Календарь предопределенных праздничных дней" и заполение из него.', () => {

        bef();
        aft();
        decorate.el.button.handler({
            name: 'Список праздничных дней',
            timeout: entry.max
        });
        decorate.modal.holiday.init({
            timeout: entry.max
        });
        decorate.page.base.loading({
            timeout: entry.sleep2
        });
        decorate.el.select.iconXpand({
            title: 'Месяц',
            value: '',
            text: 'Январь',
            timeout: entry.max
        });
        decorate.el.select.iconXpand({
            title: 'День',
            value: '',
            text: '1',
            timeout: entry.max
        });
        decorate.el.input.sendKeys({
            title: 'Название праздника',
            placeholder: '',
            value: 'test',
            timeout: entry.max
        });
        decorate.el.button.handler({
            name: 'Добавить праздничный день',
            timeout: entry.max
        });
        decorate.page.base.loading({
            timeout: entry.sleep2
        });
        decorate.el.error.checkError({
            timeout: entry.sleep2
        });
        decorate.el.button.handler({
            name: 'Список праздничных дней',
            timeout: entry.max
        });
        decorate.modal.holiday.closeHandler({
            timeout: entry.max
        });
        decorate.modal.holiday.initClose({
            timeout: entry.max
        });
        decorate.page.base.loading({
            timeout: entry.sleep2
        });
        decorate.el.butIcBefore.handler({
            icon: but.action_open_in_browser,
            timeout: entry.max
        });
        decorate.modalConfirm.addHoliday.init({
            timeout: entry.max
        });
        decorate.page.base.loading({
            timeout: entry.sleep2
        });
        decorate.el.button.handler({
            name: 'Подтвердить',
            timeout: entry.max
        });
        decorate.modalConfirm.addHoliday.initClose({
            timeout: entry.max
        });
        decorate.page.base.loading({
            timeout: entry.sleep2
        });
        decorate.page.holiday.dayTypeGetValue({
            dayNumber: 1,
            monthNumber: 1,
            value: 'Праздник',
            timeout: entry.max
        });
    })

    return {
        addHoliday,
        addPreHoliday,
        addMark,
        addWork,
        yearFilter,
        reset,
        addCalendar
    }
}


module.exports = {
    test: test()
}
