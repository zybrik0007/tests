const Modal = require('../elements/modal')
const elements = require('../../dictionaries/selenium-elements')

//Модально окно поиска устройств в подразделе Конфигурация
class SearchDevice extends Modal {

    constructor(id, title) {
        super()
        this.id = id
        this.title = title
    }

    //Нажатие по устроству по названию и ip
    async deviceHandler(ip, timeout) {
        const handler = await this.xpathHandler(elements.admSearchDevice(ip),
            `Нажатие по контроллеру c ip "${ip}" в модальном окне ${this.title}.`,
            timeout)

        if(handler.error) {
            return handler
        }

        const elementActive = await this.xpathElement(elements.admSearchDeviceActive(ip),
            `Контроллер c ip "${ip}" в модальном окне ${this.title} нажат.`,
            timeout)

        if(elementActive.error) {
            return elementActive
        }

        return elementActive
    }

}

module.exports = SearchDevice