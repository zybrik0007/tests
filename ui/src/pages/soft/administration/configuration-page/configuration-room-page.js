const BasePage = require('../../../base-page/base-page')
const elements = require('../../../../dictionaries/selenium-elements')
const {roomsTitle} = require('../../../../dictionaries/title')
const {roomUrl} = require('../../../../dictionaries/url')

class Rooms extends BasePage {
    constructor() {
        super();
    }

    async init(timeout) {
        const title =  await this.titleCompare(roomsTitle, timeout)
        if(title.error) {
            return  elementTitle
        }

        const url = await this.urlCompare(roomUrl, timeout)
        if(url.error) {
            return url
        }

        return {error: false, description: `Заглавие валидно. Url валиден.`}
    }

    async rootElement(timeout) {
        return await this.xpathElement(elements.admConfRoomTreeRoot, 'Отображение "Неконтролируемая территория".', timeout)
    }

    async rootHandler(timeout) {
        return await this.xpathHandler(elements.admConfRoomTreeRoot, 'Нжатие по "Неконтролируемая территория".', timeout)
    }

    async roomElement(arr, timeout) {
        return await this.xpathElement(elements.admConfRoomTree(arr), `Отображение помещения "${arr[arr.length - 1]}".`, timeout)
    }

    async roomHandler(arr, timeout) {
        return await this.xpathHandler(elements.admConfRoomTree(arr), `Нажатие по помещению "${arr[arr.length - 1]}"`, timeout)
    }

    async roomNoElement(arr, timeout) {
        return await this.xpathNoElement(elements.admConfRoomTree(arr), `Отсутствие помещения "${arr[arr.length - 1]}"`, timeout)
    }

    async deviceElement(arr, name, ip, active, timeout){
        return await this.xpathElement(elements.admConfRoomTreeDevice(arr, name, ip, active),
            `Отображение ${active ? 'активированого': 'деактивированого'} устройства "${name}" c ip ${ip} в помещении "${arr[arr.length - 1]}".`,
            timeout)
    }

    async deviceHandler(arr, name, ip, active, timeout) {
        return await this.xpathHandler(elements.admConfRoomTreeDevice(arr, name, ip, active),
            `Нажатие по ${active ? 'активированому': 'деактивированому'} устройству "${name}" c ip "${ip}" в помещении "${arr[arr.length - 1]}".`,
            timeout)
    }

    async deviceNoElement(arr, name, ip, active, timeout) {
        return await this.xpathElement(elements.admConfRoomTreeDevice(arr, name, ip, active),
            `Отсутствие ${active ? 'активированого': 'деактивированого'} устройства "${name}" c ip ${ip} в помещении "${arr[arr.length - 1]}".`,
            timeout)
    }

}

module.exports = Rooms


