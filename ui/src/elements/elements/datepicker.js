const BasePage = require('../../pages/base-page/base-page');
const elements = require('../../dictionaries/selenium-elements');
const selectXpand = new(require('./select-xpand'));
const entry = require('../../../../entry');

//Календарь
class Datepicker extends BasePage {

    constructor() {
        super();
    }

    //Отображение календаря
    async datepicker(timeout) {
        return await this.xpathElement(elements.datepicker,
            'Отображение календаря',
            timeout)
    }

    //Отсутствие календаря
    async datepickerNoElement(timeout) {
        return await this.xpathNoElement(elements.datepicker,
            'Отсутсвует отображение календаря',
            timeout)
    }

    //Выбор дня, месяца, года, часа, минуты
    async dateParse({day, month, year, hour, minute, scrollMonth, scrollYear, scrollHour, scrollMinute}, timeout) {
        await this.loading(entry.datepicker);
        const yearSelect = await this.yearSelect({year, scrollYear, timeout})
        if(yearSelect.error) {
            return yearSelect
        }

        await this.loading(entry.datepicker);
        const monthSelect = await this.monthSelect({month, scrollMonth, timeout})
        if(monthSelect.error) {
            return monthSelect
        }

        await this.loading(entry.datepicker);
        const daySelect = await this.daySelect(day, timeout)
        if(daySelect.error) {
            return daySelect
        }

        await this.loading(entry.datepicker);
        if(hour) {
            const hourSelect = await this.hourSelect({hour, scrollHour, timeout})
            if(hourSelect.error) {
                return hourSelect
            }
        }

        await this.loading(entry.datepicker);
        if(minute) {
            const minuteSelect = await this.minuteSelect({minute, scrollMinute, timeout})
            if(minuteSelect.error) {
                return minuteSelect
            }
        }

        return {
            error: false,
            description: `Выбрана дата ${day} ${month} ${yearSelect}`,
        }

    }

    //Выбор даты
    async date(obj, timeout) {
        await this.loading(entry.datepicker);
        const datepicker = await this.datepicker(timeout)
        if(datepicker.error) {
            return datepicker
        }

        await this.loading(entry.datepicker);
        const dateSelect = await this.dateParse(obj, timeout)
        if(dateSelect.error) {
            return dateSelect
        }

        await this.loading(entry.datepicker);
        const apply = await this.applyHandler(timeout)
        if(apply.error) {
            return apply
        }

        await this.loading(entry.datepicker);
        const datepickerClose = await this.datepickerNoElement(timeout)
        if(datepickerClose.error) {
            return await datepickerClose
        }

        return dateSelect
    }

    //Выбор даты с двойным календарем
    async dateRange(objStart, objEnd, timeout) {
        await this.loading(entry.datepicker);
        const datepicker = await this.datepicker(timeout)
        if(datepicker.error) {
            return datepicker
        }

        await this.loading(entry.datepicker);
        const dateStartSelect = await this.dateParse(objStart, timeout)
        if(dateStartSelect.error) {
            return dateStartSelect
        }

        await this.loading(entry.datepicker);
        const dateEndSelect = await this.dateParse(objEnd, timeout)
        if(dateEndSelect.error) {
            return dateEndSelect
        }

        //await this.loading(500);
        const apply = await this.applyHandler(timeout)
        if(apply.error) {
            return apply
        }

        await this.loading(entry.datepicker);
        const datepickerClose = await this.datepickerNoElement(timeout)
        if(datepickerClose.error) {
            return await datepickerClose
        }

        return {
            error: false,
            description: `Выбран промежуток дат: ${dateStartSelect}, ${dateEndSelect}`,
        }

    }

    //Выбор года в календаре
    async yearSelect({year, scrollYear, timeout}) {
        await this.loading(entry.datepicker);
        const selectHandler = await this.xpathHandler(elements.datepickerButtonYear,
            'Нажатие по выбору года',
            timeout);
        if(selectHandler.error) {
            return selectHandler
        }

        await this.loading(entry.datepicker);
        const xpand = await selectXpand.xpand(timeout)
        if(xpand.error) {
            return xpand
        }

        await this.loading(entry.datepicker);

        if(scrollYear) {
            const xpandScroll = await selectXpand.scrollTop(scrollYear);
            if(xpandScroll.error) {
                return xpandScroll
            }
        }

        await this.loading(entry.datepicker);
        const yearHandler = await selectXpand.handler(year, timeout)
        if(yearHandler.error) {
            return yearHandler
        }

        await this.loading(entry.datepicker);
        const xpandClose = await selectXpand.xpandNoElement(timeout)
        if(xpandClose.error) {
            return xpandClose
        }

        await this.loading(entry.datepicker);
        const yearSelected = await this.xpathElement(elements.datepickerYear(year),
            `Отображние выбраннго года "${year}" в календаре`,
            timeout)

        if(yearSelected.error) {
            return yearSelected
        }

        return {
            error: false,
            description: `Выбран год "${year}"`,
        }
    }

    //Выбор месяца в календаре
    async monthSelect({month, scrollMonth, timeout}) {
        await this.loading(entry.datepicker);
        const selectHandler = await this.xpathHandler(elements.datepickerButtonMonth,
            'Нажатие по выбору месяца',
            timeout)
        if(selectHandler.error) {
            return selectHandler
        }

        await this.loading(entry.datepicker);
        const xpand = await selectXpand.xpand(timeout)
        if(xpand.error) {
            return xpand
        }

        if(scrollMonth) {
            const xpandScroll = await selectXpand.scrollTop(scrollMonth);
            if(xpandScroll.error) {
                return xpandScroll
            }
        }

        await this.loading(entry.datepicker);
        const monthHandler = await selectXpand.handler(month, timeout)
        if(monthHandler.error) {
            return monthHandler
        }

        await this.loading(entry.datepicker);
        const xpandClose = await selectXpand.xpandNoElement(timeout)
        if(xpandClose.error) {
            return xpandClose
        }

        await this.loading(entry.datepicker);
        const monthSelected = await this.xpathElement(elements.datepickerMonth(month),
            `Отображние выбраннго месяца "${month}" в календаре`,
            timeout)
        if(monthSelected.error) {
            return monthSelected
        }

        return {
            error: false,
            description: `Выбран месяц "${month}"`,
        }
    }

    //Выбор часа в календаре
    async hourSelect({hour, scrollHour, timeout}) {
        await this.loading(entry.datepicker);
        const selectHandler = await this.xpathHandler(elements.datepickerButtonHour,
            'Нажатие по выбору часа',
            timeout)
        if(selectHandler.error) {
            return selectHandler
        }

        await this.loading(entry.datepicker);
        const xpand = await selectXpand.xpand(timeout)
        if(xpand.error) {
            return xpand
        }

        await this.loading(entry.datepicker);
        if(scrollHour) {
            const xpandScroll = await selectXpand.scrollTop(scrollHour);
            if(xpandScroll.error) {
                return xpandScroll
            }
        }

        await this.loading(entry.datepicker);
        const hourHandler = await selectXpand.handler(hour, timeout)
        if(hourHandler.error) {
            return hourHandler
        }

        await this.loading(entry.datepicker);
        const xpandClose = await selectXpand.xpandNoElement(timeout)
        if(xpandClose.error) {
            return xpandClose
        }

        await this.loading(entry.datepicker);
        const hourSelected = await this.xpathElement(elements.datepickerHour(hour),
            `Отображние выбраннго часа "${hour}" в календаре`,
            timeout)
        if(hourSelected.error) {
            return monthSelected
        }

        return {
            error: false,
            description: `Выбран час "${hour}"`,
        }
    }

    //Выбор минуты в календаре
    async minuteSelect({minute, scrollMinute, timeout}) {
        await this.loading(entry.datepicker);
        const selectHandler = await this.xpathHandler(elements.datepickerButtonMinute,
            'Нажатие по выбору минуты.',
            timeout)
        if(selectHandler.error) {
            return selectHandler
        }

        await this.loading(entry.datepicker);
        const xpand = await selectXpand.xpand(timeout)
        if(xpand.error) {
            return xpand
        }

        await this.loading(entry.datepicker);
        if(scrollMinute) {
            const xpandScroll = await selectXpand.scrollTop(scrollMinute);
            if(xpandScroll.error) {
                return xpandScroll
            }
        }

        await this.loading(entry.datepicker);
        const minuteHandler = await selectXpand.handler(minute, timeout)
        if(minuteHandler.error) {
            return minuteHandler
        }

        await this.loading(entry.datepicker);
        const xpandClose = await selectXpand.xpandNoElement(timeout)
        if(xpandClose.error) {
            return xpandClose
        }

        await this.loading(entry.datepicker);
        const minuteSelected = await this.xpathElement(elements.datepickerMinute(minute),
            `Отображние выбранной минуты "${minute}" в календаре.`,
            timeout)

        if(minuteSelected.error) {
            return minuteSelected
        }

        return {
            error: false,
            description: `Выбрана минута "${minute}"`,
        }
    }

    //Выбор дня в календаре
    async daySelect(day, timeout) {
        await this.loading(entry.datepicker);
        const dayHandler = await this.xpathHandler(elements.datepickerSelectDay(day),
            `Нажатие по дню "${day}".`,
            timeout)
        if(dayHandler.error) {
            return dayHandler
        }

        await this.loading(entry.datepicker);
        const daySelected = await this.xpathElement(elements.datepickerDay(day),
            `Отображение выбранного дня "${day}".`,
            timeout)
        if(daySelected.error) {
            return daySelected
        }

        return {
            error: false,
            description: `Выбран день ${day}.`,
        }
    }

    //Нажатие кнопки Применить
    async applyHandler(timeout) {
        const handler =  await this.xpathHandler(elements.datepickerApply,
            'Нажатие кнопки применить в календаре',
            timeout);

        return handler;
    }

}

module.exports = Datepicker