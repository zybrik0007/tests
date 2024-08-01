const BasePage = require('../../../base-page/base-page');
const elements = require('../../../../dictionaries/selenium-elements');
const {deviceURL} = require('../../../../dictionaries/url');
const {deviceTITLE} = require('../../../../dictionaries/title');

//Страница раздел "Администрирование", подраздел "Конфигурация", вкладка "Устройства"
class ConfigurationDevicePage extends BasePage {
    constructor() {
        super();
    }

    //Отображение страницы
    async init(timeout) {
        const title =  await this.titleCompare(deviceTITLE, timeout)
        if(title.error) {
            return  elementTitle
        }

        const url = await this.urlCompare(deviceURL, timeout)
        if(url.error) {
            return url
        }

        return {
            error: false,
            description: `Заглавие валидно. Url валиден.`,
        }
    }

    //Отображение устройства
    async deviceElement(name, ip, timeout) {
        return await this.xpathElement(elements.admDevice(name, ip),
            `Отображение устройства "${name}" c ip "${ip}"`,
            timeout)
    }

    //Отсутствие устройства
    async deviceNoElement(name, ip, timeout) {
        return await this.xpathNoElement(elements.admDevice(name, ip),
            `Отсутствие устройства "${name}" c ip "${ip}"`,
            timeout)
    }

    //Нажатие по устройству
    async deviceHandler(name, ip,timeout) {
        return await this.xpathHandler(elements.admDevice(name, ip),
            `Нажатие по устройству "${name}" c ip "${ip}"`,
            timeout)
    }

    async deviceActive(name, ip, timeout) {
        return await this.xpathElement(elements.admDeviceActive(name, ip),
            `Устройства "${name}" c ip "${ip}" активно.`,
            timeout)
    }

    async deviceNoActive(name, ip, timeout) {
        return await this.xpathNoElement(elements.admDeviceActive(name, ip),
            `Устройства "${name}" c ip "${ip}" не активно.`,
            timeout)
    }

    async deviceGetStatusLock(name, ip, timeout) {
        return await this.xpathGetAttribute(elements.admDeviceLockStatus(name, ip),
            `Получение значения статуса замка у устройства "${name}" c ip "${ip}"`,
            'title',
            timeout);
    }

    async deviceGetStatusIU(name, ip, timeout) {
        console.log('elements.admDeviceIUStatus(name, ip)', elements.admDeviceIUStatus(name, ip))
        return await this.xpathGetAttribute(elements.admDeviceIUStatus(name, ip),
            `Получение значения статуса ИУ у устройства "${name}" c ip "${ip}"`,
            'title',
            timeout);
    }

    async deviceGetStatusAlarm(name, ip, timeout) {
        return await this.xpathGetText(elements.admDeviceAlarmStatus(name, ip),
            `Получение значения статуса тревоги у устройства "${name}" c ip "${ip}"`,
            timeout);
    }

    async deviceNoStatusAlarm(name, ip, timeout) {
        return await this.xpathNoElement(elements.admDeviceAlarmStatus(name, ip),
            `Получение значения статуса тревоги у устройства "${name}" c ip "${ip}"`,
            timeout);
    }


}

module.exports = ConfigurationDevicePage