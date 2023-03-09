const Modal = require('../elements/modal')
const elements = require('../../dictionaries/selenium-elements')

class SearchDevice extends Modal {
    constructor(id, title) {
        super()
        this.id = id
        this.title = title
    }

    async deviceHandler(device, ip, timeout) {
        const handler = await this.xpathHandler(elements.admSearchDeviceModalCEll(device ,ip),
            `Нажатие по контроллеру "${device}" c ip "${ip}" в модальном окне ${this.title}`, timeout)
        if(handler.error) {
            return handler
        }

        const elementActive = await this.xpathElement(elements.admSearchDeviceModalCEllActive(device, ip),
            `Контроллер  "${device}" c ip "${ip}" в модальном окне ${this.title} нажат`)
        if(elementActive.error) {
            return elementActive
        }

        return elementActive
    }

}

module.exports = SearchDevice