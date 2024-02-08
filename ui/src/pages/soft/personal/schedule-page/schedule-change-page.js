const BasePage = require('../../../base-page/base-page')
const elements = require('../../../../dictionaries/selenium-elements')
const {schedulesTitle} = require('../../../../dictionaries/title')
const {schedulesAddUrl, schedulesEditUrl} = require('../../../../dictionaries/url')

//Страница изменения в разделе "Персонал", подраздел "Графики работы"
class ScheduleChangePage extends BasePage {

    constructor() {
        super();
    }

    //Отображение страницы добавления
    async initAdd(timeout) {
        const elementTitle = await this.titleCompare(schedulesTitle, timeout)
        if (elementTitle.error) {
            return elementTitle
        }

        const elementUrl = await this.urlCompare(schedulesAddUrl, timeout)
        if(elementUrl.error) {
            return elementUrl
        }

        return {
            error: false,
            description: 'Заглавие валидно. Url валиден.',
        }
    }

    async initEdit(timeout) {
        const elementTitle = await this.titleCompare(schedulesTitle, timeout)
        if (elementTitle.error) {
            return elementTitle
        }

        const elementUrl = await this.urlCompare(schedulesEditUrl, timeout)
        if(elementUrl.error) {
            return elementUrl
        }

        return {
            error: false,
            description: 'Заглавие валидно. Url валиден.',
        }
    }

    async room(name, work, nowWork, timeout) {
        return await this.xpathElement(elements.perSchedule(name, work, nowWork),
            `Отображение регистрируещего помещения ${name} с настройкой ${work ? "Учет рабочего времени" : ""}
             ${work ? "и Учет рабочего времени." : "."}`,
            timeout)
    }

    /*Нажатие по Учет рабочего времени*/
    async checkboxWorkHandler(name, timeout) {
        return await this.xpathHandler(elements.perScheduleCheckbox(name, 1),
            `Нажатие по сheckbox "Учет рабочего времени" для "${name}"`,
            timeout)
    }

    /*Нажатие по Учет нерабочего времени*/
    async checkboxNoWorkHandler(name, timeout) {
        return await this.xpathHandler(elements.perScheduleCheckbox(name, 2),
            `Нажатие по сheckbox "Учет нерабочего времени" для "${name}"`,
            timeout)
    }

    async handler(numInterval, timeout) {
        return await this.xpathHandler(elements.pasAccessSchedule(numInterval),
            `Нажатие по интервалу с порядковым номером ${numInterval}.`,
            timeout)
    }

    //Отображение интервала блока по номеру
    async interval(numInterval, timeout) {
        return await this.xpathElement(elements.pasAccessSchedule(numInterval),
            `Отображение интервала c порядковым номером ${numInterval}.`,
            timeout)
    }

    //Отображение активности интервального блока по номеру
    async intervalActive(timeout) {
        return await this.xpathElement(elements.pasAccessScheduleActive,
            `Интерввал активен.`,
            timeout)
    }

    async noTimeInterval(numInterval, timeout) {
        return await this.xpathNoElement(elements.pasAccessScheduleInterval(numInterval, 1),
            `Отсутствие временных блоков в интервале с порядковым номер ${numInterval}.`,
            timeout)
    }

    //Получение значения имени интервального
    async intervalName(numInterval, timeout) {
        return await this.xpathGetText(elements.pasAccessScheduleName(numInterval),
            `Получение значение имени у инеравала с порядковым номером ${numInterval}.`,
            timeout)
    }

    //Получение значения title интервального блока
    async intervalTitle(numInterval, timeout) {
        return await this.xpathGetText(elements.pasAccessScheduleTitle(numInterval),
            `Получение значение заголовка у инеравала с порядковым номером ${numInterval}.`,
            timeout)
    }

    //Отображение временного блока в интервале по номеру
    async time(numInterval, numTime, timeout) {
        return await this.xpathElement(elements.pasAccessScheduleInterval(numInterval, numTime),
            `Отображение временного блока с порядковым номером ${numTime} в интревале ${numInterval}.`,
            timeout)
    }

    async timeRemove(numInterval, numTime, timeout) {

        const handler = await this.xpathHandler(elements.pasAccessScheduleInterval(numInterval, numTime),
            `Нажатие по временному блоку с порядковым номером ${numTime} в интревале ${numInterval}.`,
            timeout);

        if(handler.error) {
            return handler
        }

        return await this.xpathHandler(elements.pasAccessScheduleIntervalIcon(numInterval, numTime),
            `Удаление временного блока с порядковым номером ${numTime} в интревале ${numInterval}.`,
            timeout);
    }

    //Ввод значения начала временного блока в интервале
    async startTimeSendKeys(numInterval, numTime, value, timeout) {

        const handler = await this.xpathHandler(elements.pasAccessScheduleIntervalInput(numInterval, numTime, 1),
            'click',
            timeout)
        if(handler.error) {
            return handler
        }

        const send = await this.xpathSendKeys(elements.pasAccessScheduleIntervalInput(numInterval, numTime, 1),
            `Ввод ${value} как значение начала в интервале с порядковым номером ${numInterval} и временным блоком ${numTime}.`,
            value,
            timeout)

        if(send.error) {
            return error
        }

        const enterHandler = await this.enter()
        if(enterHandler.error) {
            return error
        }

        return {
            error: false,
            description: `Введено ${value} как значение начала 
            в интервале с порядковым номером ${numInterval} и временным блоком ${numTime}.`,
        }

    }

    //Ввод значения окончания временного блока в интервале
    async endTimeSendKeys(numInterval, numTime, value, timeout) {
        const handler = await this.xpathHandler(elements.pasAccessScheduleIntervalInput(numInterval, numTime, 2),
            'click',
            timeout)
        if(handler.error) {
            return handler
        }

        const send = await this.xpathSendKeys(elements.pasAccessScheduleIntervalInput(numInterval, numTime, 2),
            `Ввод ${value} как значение окончания в интервале 
            с порядковым номером ${numInterval} и временным блоком ${numTime}.`,
            value,
            timeout)
        if(send.error) {
            return error
        }

        const enterHandler = await this.enter()
        if(enterHandler.error) {
            return error
        }

        return {
            error: false,
            description: `Введено ${value} как значение окончания в интервале 
            с порядковым номером ${numInterval} и временным блоком ${numTime}.`,
        }
    }

    //Получение значения врмени начала в интервале по по номеру
    async startTimeGetValue(numInterval, numTime, timeout) {
        return await this.xpathGetAttribute(elements.pasAccessScheduleIntervalInput(numInterval, numTime, 1),
            `Получение значения времени начала в интервале с порядковым номером ${numInterval} 
            и временного блока с порядковым номером ${numTime}`,
            'value',
            timeout)
    }

    //Получение значения врмени окончания в интервале по по номеру
    async endTimeGetValue(numInterval, numTime, timeout) {
        return await this.xpathGetAttribute(elements.pasAccessScheduleIntervalInput(numInterval, numTime, 2),
            `Получение значения времени окончания в интервале с порядковым номером ${numInterval} 
            и временного блока с порядковым номером ${numTime}`,
            'value',
            timeout)
    }

    // Скролл в недельном графике от верха
    async scrollWeekTop() {
        const scroll = await this.script(elements.passAccessScheduleChangeWeekScroll(0, 737),
            'Скролл недельных интервалов.')
        await this.loading(1000)
        return scroll
    }

    //Скролл н недель из списка выбранных
    async sWeekSelectedScroll() {
        const scroll = await this.script(elements.passAccessScheduleChangeSWeekSelectedScroll(0, 726),
            'Скролл недель из списка выбранных.')
        await this.loading(1000)
        return scroll
    }
}

module.exports = ScheduleChangePage