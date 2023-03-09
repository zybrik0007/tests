const Modal = require('../elements/modal')
const elements = require('../../dictionaries/selenium-elements')

class DeviceSelect extends Modal {
    constructor(id, title) {
        super();
        this.id = id
        this.title = title
    }

    async deviceHandler(device, ip, timeout) {
        return await this.xpathHandler(elements.admSelectDeviceModalCell(device, ip), `Нажитие по контроллеру ${device} c IP ${ip}.`, timeout)
    }
}

module.exports = DeviceSelect
