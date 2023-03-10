const BasePage = require('../../../base-page/base-page')
const elements = require('../../../../dictionaries/selenium-elements')
const {roomsTitle} = require('../../../../dictionaries/title')
const {roomUrl} = require('../../../../dictionaries/url')

//Страница раздел "Администрирование", подраздел "Конфигурация", вкладка "Помещения"
class Rooms extends BasePage {
    constructor() {
        super();
    }

    //Отображение страницы
    async init(timeout) {
        const title =  await this.titleCompare(roomsTitle, timeout)
        if(title.error) {
            return  elementTitle
        }

        const url = await this.urlCompare(roomUrl, timeout)
        if(url.error) {
            return url
        }

        return {
            error: false,
            description: `Заглавие валидно. Url валиден.`,
        }
    }

    //Отображение "Неконтролируемая территория"
    async rootElement(timeout) {
        return await this.xpathElement(elements.admConfRoomTreeRoot,
            'Отображение "Неконтролируемая территория".',
            timeout)
    }

    //Нжатие по "Неконтролируемая территория"
    async rootHandler(timeout) {
        return await this.xpathHandler(elements.admConfRoomTreeRoot,
            'Нжатие по "Неконтролируемая территория".',
            timeout)
    }

    //Отображение помещения
    async roomElement(arr, timeout) {
        return await this.xpathElement(elements.admConfRoomTree(arr),
            `Отображение помещения "${arr[arr.length - 1]}".`,
            timeout)
    }

    //Нажатие по помещению
    async roomHandler(arr, timeout) {
        return await this.xpathHandler(elements.admConfRoomTree(arr),
            `Нажатие по помещению "${arr[arr.length - 1]}"`,
            timeout)
    }

    //Отсутствие помещения
    async roomNoElement(arr, timeout) {
        return await this.xpathNoElement(elements.admConfRoomTree(arr),
            `Отсутствие помещения "${arr[arr.length - 1]}"`,
            timeout)
    }

    //Отсутствие устройства
    async deviceElement(arr, name, ip, active, timeout){
        return await this.xpathElement(elements.admConfRoomTreeDevice(arr, name, ip, active),
            `Отображение ${active ? 'активированого': 'деактивированого'} устройства "${name}"
             c ip ${ip} в помещении "${arr[arr.length - 1]}".`,
            timeout)
    }

    //Нажатие по стройству
    async deviceHandler(arr, name, ip, active, timeout) {
        return await this.xpathHandler(elements.admConfRoomTreeDevice(arr, name, ip, active),
            `Нажатие по ${active ? 'активированому': 'деактивированому'} устройству "${name}" 
            c ip "${ip}" в помещении "${arr[arr.length - 1]}".`,
            timeout)
    }

    //Отсутствие устройства
    async deviceNoElement(arr, name, ip, active, timeout) {
        return await this.xpathElement(elements.admConfRoomTreeDevice(arr, name, ip, active),
            `Отсутствие ${active ? 'активированого': 'деактивированого'} устройства "${name}" 
            c ip ${ip} в помещении "${arr[arr.length - 1]}".`,
            timeout)
    }

}

module.exports = Rooms


