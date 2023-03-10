const Modal = require('../elements/modal')
const elements = require('../../dictionaries/selenium-elements')

//Модальное окно выбора графика в странице измения шаблона доступа
class ScheduleSelect extends Modal {

    constructor(id, title) {
        super();
        this.id = id
        this.title = title
    }

    //Нажатие по графику с интервалом
    async scheduleHandler(name, timeout) {
        const handler = await this.xpathHandler(elements.pasSchedulesModalSelectSchedule(name),
            `Нажатие по графику "${name}" в модальном окне c ip "${this.id}".`,
            timeout)

        if(handler.error) {
            return error
        }

        const scheduleActive = await this.xpathElement(elements.pasSchedulesModalSelectScheduleActive(name),
            `График "${name}" в модальном окне c ip "${this.id}" нажат.`,
            timeout)

        if(scheduleActive.error) {
            return scheduleActive
        }

        return scheduleActive
    }
}

module.exports = ScheduleSelect