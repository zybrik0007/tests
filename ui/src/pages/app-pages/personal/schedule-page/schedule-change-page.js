const BasePage = require('../../../base-page/base-page');
const elements = require('../../../../dictionaries/selenium-elements');
const {schedulesTITLE} = require('../../../../dictionaries/title');
const {schedulesAddURL, schedulesEditURL, schedulesCopyURL} = require('../../../../dictionaries/url');

//Страница изменения в разделе "Персонал", подраздел "Графики работы"
class ScheduleChangePage extends BasePage {

    constructor() {
        super();
    }

    //Отображение страницы добавления
    async initAdd(timeout) {
        const elementTitle = await this.titleCompare(schedulesTTITLE, timeout)
        if (elementTitle.error) {
            return elementTitle
        }

        const elementUrl = await this.urlCompare(schedulesAddURL, timeout)
        if(elementUrl.error) {
            return elementUrl
        }

        return {
            error: false,
            description: 'Заглавие валидно. Url валиден.',
        }
    }

    async initEdit(timeout) {
        const elementTitle = await this.titleCompare(schedulesTITLE, timeout)
        if (elementTitle.error) {
            return elementTitle
        }

        const elementUrl = await this.urlContains(schedulesEditURL, timeout)
        if(elementUrl.error) {
            return elementUrl
        }

        return {
            error: false,
            description: 'Заглавие валидно. Url валиден.',
        }
    }

    async initCopy(timeout) {
        const elementTitle = await this.titleCompare(schedulesTITLE, timeout);
        if (elementTitle.error) {
            return elementTitle
        }

        const elementUrl = await this.urlContains(schedulesCopyURL, timeout);
        if(elementUrl.error) {
            return elementUrl
        }

        return {
            error: false,
            description: 'Заглавие валидно. Url валиден.',
        }
    }

    //Отображение интервала блока по номеру
    async interval(numInterval, timeout) {
        return await this.xpathElement(elements.pasAccessSchedule(numInterval),
            `Отображение интервала c порядковым номером ${numInterval}.`,
            timeout);
    }

    //Отображение интервала блока по номеру
    async noInterval(numInterval, timeout) {
        return await this.xpathNoElement(elements.pasAccessSchedule(numInterval),
            `Отсутствие интервала c порядковым номером ${numInterval}.`,
            timeout);
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

    async selectTypeInterval(numInterval, numTime, value, timeout) {
        const handler = await this.xpathHandler(elements.pasAccessScheduleInterval(numInterval, numTime),
            `Нажатие по временному блоку с порядковым номером ${numTime} в интревале ${numInterval}.`,
            timeout);

        if(handler.error) {
            return handler
        }

        return await this.xpathSelectPutText(elements.pasAccessScheduleInterval(numInterval, numTime) + '//select',
            value,
            `Выбор тип "${value} у временного блока с порядковым номером ${numTime} в интревале ${numInterval}".`,
            timeout);
    }

    async selectGetTypeInterval(numInterval, numTime, timeout){
        const get = await this.xpathGetAttribute(elements.pasAccessScheduleInterval(numInterval, numTime),
            `Получение типа у временного блока с порядковым номером ${numTime} в интревале ${numInterval}".`,
            'data-interval-type',
            timeout);

        if(get.error) {
            return get
        }

        switch (get.text) {
            case '0':
                return {...get, text: 'Промежуточный интервал'}
            case '1':
                return {...get, text: 'Начало смены'}
            case '2':
                return {...get, text: 'Конец смены'}
            case '3':
                return {...get, text: 'Полная смена'}
        }
    }

    //Получение значения cуммы инетвалов интервального блока
    async intervalSumTime(numInterval, timeout) {
        return await this.xpathGetText(elements.pasAccessScheduleTitle(numInterval),
            `Получение значение cуммы инетвалов у инеравала с порядковым номером ${numInterval}.`,
            timeout)
    }

    //Получение значения имени интервального
    async intervalName(numInterval, timeout) {
        return await this.xpathGetText(elements.pasAccessScheduleName(numInterval),
            `Получение значение имени у инеравала с порядковым номером ${numInterval}.`,
            timeout)
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

    async scrollTop(scroll, timeout) {
        return await this.script(elements.perScheduleScroll(0, scroll),
            'Скролл интервалов.',
            timeout);
    }

    async hourSendKeys(name, value, timeout) {
        return await this.xpathSendKeys(elements.perScheduleSettingsHour(name),
            `Ввод "${value}" часов в "${name}".`,
            value,
            timeout);
    }

    async hourGetValue(name, timeout) {
        return await this.xpathGetAttribute(elements.perScheduleSettingsHour(name),
            `Полученние значения часов "${name}."`,
            'value',
            timeout);
    }

    async minuteSendKeys(name, value, timeout) {
        return await this.xpathSendKeys(elements.perScheduleSettingsMinute(name),
            `Ввод "${value}" минут в "${name}".`,
            value,
            timeout);
    }

    async minuteGetValue(name, timeout) {
        return await this.xpathGetAttribute(elements.perScheduleSettingsMinute(name),
            `Полученние значения минут "${name}."`,
            'value',
            timeout);
    }

    async room(name, work, nowWork, timeout) {
        return await this.xpathElement(elements.perScheduleRoomCheckbox(name, work, nowWork),
            `Отображение регистрируещего помещения ${name} с настройкой ${work ? "Учет рабочего времени" : ""}
             ${work ? "и Учет рабочего времени." : "."}`,
            timeout);
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

    async noTimeInterval(numInterval, timeout) {
        return await this.xpathNoElement(elements.pasAccessScheduleInterval(numInterval, 1),
            `Отсутствие временных блоков в интервале с порядковым номер ${numInterval}.`,
            timeout)
    }

    async dayHandler (day, timeout) {
        return await this.xpathHandler(elements.perScheduleDay(day),
            `Нажатие по дню ${day}.`,
            timeout);
    }

    async dayActive (day, timeout) {
        return await this.xpathElement(elements.perScheduleDayActive(day),
            `День ${day} активен.`,
            timeout);
    }

    async dayNoActive (day, timeout) {
        return await this.xpathElement(elements.perScheduleDayNoActive(day),
            `День ${day} не активен.`,
            timeout);
    }

}

module.exports = ScheduleChangePage;