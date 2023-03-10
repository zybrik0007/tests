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
    async deviceHandler(device, ip, timeout) {
        const handler = await this.xpathHandler(elements.admSearchDeviceModalCEll(device ,ip),
            `Нажатие по контроллеру "${device}" c ip "${ip}" в модальном окне ${this.title}`,
            timeout)

        if(handler.error) {
            return handler
        }

        const elementActive = await this.xpathElement(elements.admSearchDeviceModalCEllActive(device, ip),
            `Контроллер  "${device}" c ip "${ip}" в модальном окне ${this.title} нажат`,
            timeout)

        if(elementActive.error) {
            return elementActive
        }

        return elementActive
    }

}

module.exports = SearchDevice