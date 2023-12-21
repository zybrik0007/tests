const BasePage = require('../../pages/base-page/base-page')
const elements = require('../../dictionaries/selenium-elements')
const selectXpand = new(require('./select-xpand'))

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
    async dateParse({day, month, year, hour, minute}, timeout) {
        await this.loading(500);
        const yearSelect = await this.yearSelect(year, timeout)
        if(yearSelect.error) {
            return yearSelect
        }

        await this.loading(500);
        const monthSelect = await this.monthSelect(month, timeout)
        if(monthSelect.error) {
            return monthSelect
        }

        await this.loading(500);
        const daySelect = await this.daySelect(day, timeout)
        if(daySelect.error) {
            return daySelect
        }

        await this.loading(500);
        if(hour) {
            const hourSelect = await this.hourSelect(hour, timeout)
            if(hourSelect.error) {
                return hourSelect
            }
        }

        await this.loading(500);
        if(minute) {
            const minuteSelect = await this.minuteSelect(minute, timeout)
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
        await this.loading(500);
        const datepicker = await this.datepicker(timeout)
        if(datepicker.error) {
            return datepicker
        }

        await this.loading(500);
        const dateSelect = await this.dateParse(obj, timeout)
        if(dateSelect.error) {
            return dateSelect
        }

        await this.loading(500);
        const apply = await this.applyHandler(timeout)
        if(apply.error) {
            return apply
        }

        await this.loading(500);
        const datepickerClose = await this.datepickerNoElement(timeout)
        if(datepickerClose.error) {
            return await datepickerClose
        }

        return dateSelect
    }

    //Выбор даты с двойным календарем
    async dateRange(objStart, objEnd, timeout) {
        await this.loading(500);
        const datepicker = await this.datepicker(timeout)
        if(datepicker.error) {
            return datepicker
        }

        await this.loading(500);
        const dateStartSelect = await this.dateParse(objStart, timeout)
        if(dateStartSelect.error) {
            return dateStartSelect
        }

        await this.loading(500);
        const dateEndSelect = await this.dateParse(objEnd, timeout)
        if(dateEndSelect.error) {
            return dateEndSelect
        }

        //await this.loading(500);
        const apply = await this.applyHandler(timeout)
        if(apply.error) {
            return apply
        }

        await this.loading(500);
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
    async yearSelect(year, timeout) {
        await this.loading(500);
        const selectHandler = await this.xpathHandler(elements.datepickerButtonYear,
            'Нажатие по выбору года',
            timeout);
        if(selectHandler.error) {
            return selectHandler
        }

        await this.loading(500);
        const xpand = await selectXpand.xpand(timeout)
        if(xpand.error) {
            return xpand
        }

        //await this.loading(1000);

        await this.loading(500);
        const yearHandler = await selectXpand.handler(year, timeout)
        if(yearHandler.error) {
            return yearHandler
        }

        await this.loading(500);
        const xpandClose = await selectXpand.xpandNoElement(timeout)
        if(xpandClose.error) {
            return xpandClose
        }

        await this.loading(500);
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
    async monthSelect(month, timeout) {
        await this.loading(500);
        const selectHandler = await this.xpathHandler(elements.datepickerButtonMonth,
            'Нажатие по выбору месяца',
            timeout)
        if(selectHandler.error) {
            return selectHandler
        }

        await this.loading(500);
        const xpand = await selectXpand.xpand(timeout)
        if(xpand.error) {
            return xpand
        }

        await this.loading(500);
        const monthHandler = await selectXpand.handler(month, timeout)
        if(monthHandler.error) {
            return monthHandler
        }

        await this.loading(500);
        const xpandClose = await selectXpand.xpandNoElement(timeout)
        if(xpandClose.error) {
            return xpandClose
        }

        await this.loading(500);
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
    async hourSelect(hour, timeout) {
        await this.loading(500);
        const selectHandler = await this.xpathHandler(elements.datepickerButtonHour,
            'Нажатие по выбору часа',
            timeout)
        if(selectHandler.error) {
            return selectHandler
        }

        await this.loading(500);
        const xpand = await selectXpand.xpand(timeout)
        if(xpand.error) {
            return xpand
        }

        await this.loading(1000);
        await selectXpand.scrollTop(1000);

        await this.loading(1000);
        const hourHandler = await selectXpand.handler(hour, timeout)
        if(hourHandler.error) {
            return hourHandler
        }

        await this.loading(1000);
        const xpandClose = await selectXpand.xpandNoElement(timeout)
        if(xpandClose.error) {
            return xpandClose
        }

        await this.loading(1000);
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
    async minuteSelect(minute, timeout) {
        await this.loading(500);
        const selectHandler = await this.xpathHandler(elements.datepickerButtonMinute,
            'Нажатие по выбору минуты.',
            timeout)
        if(selectHandler.error) {
            return selectHandler
        }

        await this.loading(500);
        const xpand = await selectXpand.xpand(timeout)
        if(xpand.error) {
            return xpand
        }

        await this.loading(1000);
        await selectXpand.scrollTop(1000);

        await this.loading(500);
        const minuteHandler = await selectXpand.handler(minute, timeout)
        if(minuteHandler.error) {
            return minuteHandler
        }

        await this.loading(1000);
        const xpandClose = await selectXpand.xpandNoElement(timeout)
        if(xpandClose.error) {
            return xpandClose
        }

        await this.loading(1000);
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
        await this.loading(500);
        const dayHandler = await this.xpathHandler(elements.datepickerSelectDay(day),
            `Нажатие по дню "${day}".`,
            timeout)
        if(dayHandler.error) {
            return dayHandler
        }

        await this.loading(500);
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