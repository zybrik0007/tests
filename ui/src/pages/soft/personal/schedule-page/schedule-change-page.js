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
}

module.exports = ScheduleChangePage