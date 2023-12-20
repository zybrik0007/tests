const BasePage = require('../../../base-page/base-page');
const {accessTemplatesTitle} = require('../../../../dictionaries/title');
const {accessAddScheduleUrl, accessEditScheduleUrl} = require('../../../../dictionaries/url');
const elements = require('../../../../dictionaries/selenium-elements');

class AccessTemplateScheduleChangePage extends BasePage{
    constructor() {
        super()
    }

    //Отображение страницы добавления
    async initAdd(timeout) {
        const title =  await this.titleCompare(accessTemplatesTitle, timeout)
        if(title.error) {
            return  elementTitle
        }

        const url = await this.urlCompare(accessAddScheduleUrl, timeout)
        if(url.error) {
            return url
        }

        return {
            error: false,
            description: `Заглавие валидно. Url валиден.`,
        }
    }

    //Отображение страницы редактирования
    async initEdit(timeout) {

        const title =  await this.titleCompare(accessTemplatesTitle, timeout)
        if(title.error) {
            return  elementTitle
        }

        const url = await this.urlContains(accessEditScheduleUrl, timeout)
        if(url.error) {
            return url
        }

        return {
            error: false,
            description: `Заглавие валидно. Url валиден.`,
        }
    }

    //Создание интервала во временной зоне
    async addInterval(numInterval, timeout) {
        return await this.xpathClickMouseSlideRight(elements.pasAccessSchedule(numInterval),
            `Создание интервала временной зоны для интервала c порядковым номером ${numInterval}.`,
            100,
            0,
            2000,
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

    //Отображение не активности интервального блока по номеру
    async intervalDisabled(numInterval, timeout) {
        return await this.xpathElement(elements.pasAccessScheduleDisabled(numInterval),
            `Интерввал с порядковым номер ${numInterval} - не активен.`,
            timeout)
    }

    async handler(numInterval, timeout) {
        return await this.xpathHandler(elements.pasAccessSchedule(numInterval),
            `Нажатие по интервалу с порядковым номером ${numInterval}.`,
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

    //Имя недели из списка недель для выбора по порядковому номеру
    async sWeekName(strNum, timeout) {
        return await this.xpathGetText(elements.passAccessScheduleChangeSWeekName(1, strNum),
            `Получение значения названия недели с порядковым номером ${strNum}, в списке выбора недель.`,
            timeout)
    }

    //Кнопка из списка недель для выбора по порядковому номеру
    async sWeekHandler(strNum, timeout) {
        const handler = await this.xpathHandler(elements.passAccessScheduleChangeSWeekBut(1, strNum),
            `Нажатие по кнопке добавления недели с порядковым номером ${strNum}, в списке выбора недель.`,
            timeout)
        await this.loading(500);
        return handler
    }

    //Двйное нажатие кнопка из списка недель для выбора по порядковому номеру
    async sWeekDBHandler(strNum, timeout) {
        const handler =  await this.xpathDbHandler(elements.passAccessScheduleChangeSWeekBut(1, strNum),
            `Двойное нажатие по кнопке добавления недели с порядковым номером ${strNum}, 
            в списке выбора недель.`,
            timeout)
        await this.loading(500)
        return handler
    }

    //Список недель из списка для выбора
    async sWeekList(size, timeout) {
        return await this.xpathList(elements.passAccessScheduleChangeSWeekList(1),
            `Количетсво недель для выбора равно ${size}.`,
            size,
            timeout)
    }

    //Скролл недель из списка для выбора
    async sWeekScroll() {
        const scroll = await this.script(elements.passAccessScheduleChangeSWeekScroll(0, 726),
            'Скролл недель из списка для выбора.')
        await this.loading(1000)
        return scroll
    }

    //Имя недели из списка выбранных недель по порядковому номеру
    async sWeekSelectedName(strNum, timeout) {
        return await this.xpathGetText(elements.passAccessScheduleChangeSWeekName(2, strNum),
            `Получение значения названия недели с порядковым номером ${strNum}, в списке выбранных недель.`,
            timeout)
    }

    //Кнопка из списка выбранных недель по порядковому номеру
    async sWeekSelectedHandler(strNum, timeout) {
        const handler = await this.xpathHandler(elements.passAccessScheduleChangeSWeekBut(2, strNum),
            `Нажатие по кнопке удаление недели с порядковым номером ${strNum}, в списке выбранных недель.`,
            timeout)
        await this.loading(500)
        return handler
    }

    //Список недель из списка выбранных
    async sWeekSelectedList(size, timeout) {
        return await this.xpathList(elements.passAccessScheduleChangeSWeekList(2),
            `Количетсво выбранных недель равно ${size}.`,
            size,
            timeout)
    }

    //Скролл н недель из списка выбранных
    async sWeekSelectedScroll() {
        const scroll = await this.script(elements.passAccessScheduleChangeSWeekSelectedScroll(0, 726),
            'Скролл недель из списка выбранных.')
        await this.loading(1000)
        return scroll
    }
}

module.exports = AccessTemplateScheduleChangePage

