const Modal = require('../elements/modal')
const elements = require('../../dictionaries/selenium-elements')

class TimeZoneModalSelect extends Modal {

    constructor(id, title) {
        super();
        this.id = id
        this.title = title
    }

    //Отображение интервала по порядковому номеру
    async interval(numInterval, timeout) {
        return this.xpathElement(elements.modalId(this.id) + elements.pasAccessSchedule(numInterval),
            `Отображение интевала с порядковым номером ${numInterval} в модальном окне ${this.id}.`,
            timeout)
    }

    async noInterval(numInterval, timeout) {
        return this.xpathNoElement(elements.modalId(this.id) + elements.pasAccessSchedule(numInterval),
            `Отсутствие интевала с порядковым номером ${numInterval} в модальном окне ${this.id}.`,
            timeout)
    }

    //Отображение активности интервала по порядковому номеру
    async intervalActive(timeout) {
        return this.xpathElement(elements.modalId(this.id) + elements.pasAccessScheduleActive,
            `Интерввал активен в модальном окне ${this.id}.`,
            timeout)
    }

    //Отображение не активности интервала по порядковому номеру
    async intervalDisabled(numInterval, timeout) {
        return this.xpathElement(elements.modalId(this.id) + elements.pasAccessScheduleDisabled(numInterval),
            `Интерввал с порядковым номер ${numInterval} - не активен в модальном окне ${this.id}.`,
            timeout)
    }

    //Получение значения имени интервального
    async intervalName(numInterval, timeout) {
        console.log(elements.modalId(this.id) + elements.pasAccessScheduleName(numInterval))
        return this.xpathGetText(elements.modalId(this.id) + elements.pasAccessScheduleName(numInterval),
            `Получение значения имени у интервала с порядковым номер ${numInterval}  
            в модальном окне ${this.id}.`,
            timeout)
    }

    //Нажатие по интервалу по порядковому номеру
    async intervalHandler(numInterval, timeout) {
        return this.xpathHandler(elements.modalId(this.id) + elements.pasAccessScheduleDisabled(numInterval),
            `Нажатие по интервалу с порядковым номер ${numInterval} в модальном окне ${this.id}.`,
            timeout)
    }

    //скролл топ
    async scrollTop() {
        const scroll = await this.script(elements.passAccessScheduleChangeWeekScroll(0, 630),
            'Скролл в моадальном окне выбора временных зон.')
        await this.loading(1000)
        return scroll
    }

    //скролл топ
    async scrollBottom() {
        const scroll = await this.script(elements.passAccessScheduleChangeWeekScroll(0, 630),
            'Скролл в моадальном окне выбора временных зон.')
        await this.loading(1000)
        return scroll
    }
}

module.exports = TimeZoneModalSelect