const BasePage = require('../../../base-page/base-page')
const elements = require('../../../../dictionaries/selenium-elements')
const {deviceUrl} = require('../../../../dictionaries/url')
const {deviceTitle} = require('../../../../dictionaries/title')

//Страница раздел "Администрирование", подраздел "Конфигурация", вкладка "Устройства"
class ConfigurationDevicePage extends BasePage {
    constructor() {
        super();
    }

    //Отображение страницы
    async init(timeout) {
        const title =  await this.titleCompare(deviceTitle, timeout)
        if(title.error) {
            return  elementTitle
        }

        const url = await this.urlCompare(deviceUrl, timeout)
        if(url.error) {
            return url
        }

        return {
            error: false,
            description: `Заглавие валидно. Url валиден.`,
        }
    }

    //Отображение устройства
    async deviceElement(name, ip, active, timeout) {
        return await this.xpathElement(elements.admConfDevice(name, ip, active),
            `Отображение ${active ? 'активированного' : 'деактивированного'} устройства "${name}" c ip "${ip}"`,
            timeout)
    }

    //Нажатие по устройству
    async deviceHandler(name, ip, active, timeout) {
        return await this.xpathHandler(elements.admConfDevice(name, ip, active),
            `Нажатие по ${active ? 'активированному' : 'деактивированному'} устройству "${name}" c ip "${ip}"`,
            timeout)
    }

    //Отсутствие устройства
    async deviceNoElement(name, ip, active, timeout) {
        return await this.xpathNoElement(elements.admConfDevice(name, ip, active),
            `Отсутствие ${active ? 'активированного' : 'деактивированного'} устройства "${name}" c ip "${ip}"`,
            timeout)
    }

}

module.exports = ConfigurationDevicePage