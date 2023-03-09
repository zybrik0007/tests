const Modal = require('../elements/modal')
const elements = require('../../dictionaries/selenium-elements')

class ScheduleSelect extends Modal {
    constructor(id, title) {
        super();
        this.id = id
        this.title = title
    }

    async scheduleHandler(name, timeout) {
        const handler = await this.xpathHandler(elements.pasSchedulesModalSelectSchedule(name),
            `Нажатие по графику "${name}" в модальном окне c ip "${this.id}"`, timeout)
        if(handler.error) {
            return error
        }

        const scheduleActive = await this.xpathElement(elements.pasSchedulesModalSelectScheduleActive(name),
            `График "${name}" в модальном окне c ip "${this.id}" нажат`, timeout)

        if(scheduleActive.error) {
            return scheduleActive
        }

        return scheduleActive

    }
}

module.exports = ScheduleSelect