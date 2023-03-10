const BasePage = require('../../../base-page/base-page')
const elements = require('../../../../dictionaries/selenium-elements')
const {licenseTitle} = require('../../../../dictionaries/title')
const {licenseUrl} = require('../../../../dictionaries/url')

//Страница раздел "Администрирование", подраздел "Лицензии"
class LicensePage extends BasePage {

    constructor() {
        super();
    }

    //Отображение страницы
    async init(timeout) {
        const title =  await this.titleCompare(licenseTitle, timeout)
        if(title.error) {
            return title
        }

        const url = await this.urlCompare(licenseUrl, timeout)
        if(url.error) {
            return url
        }

        return {
            error: false,
            description: `Заглавие валидно. Url валиден.`,
        }
    }

    //Статус лицензии не активироан
    async disabled(license, timeout) {
        return await this.xpathElement(elements.licenseDisabled(license.title, license.name),
            `Лицензия ${license.title} ${license.name} не активна.`,
            timeout)
    }

    //Статус лицензии активироан
    async active(license, timeout) {
        return await this.xpathElement(elements.licenseActive(license.title, license.name),
            `Лицензия ${license.title} ${license.name} активна.`,
            timeout)
    }

    //Иформация по лицензии
    async info(license, text, timeout) {
        return await this.xpathElement(elements.licenseInfo(license.title, license.name, text),
            `Отображение ${text} у лензии ${license.title} ${license.name}.`,
            timeout)
    }

    //Нажатие кнопки включение/выключения лицензии
    async switch(license, timeout) {
        return await this.xpathHandler(elements.licenseSwitch(license.title, license.name),
            `Нажатие переключателя у лицензии ${license.title} ${license.name}.`,
            timeout)
    }

    //Нажатие "Подробнее"
    async more(license, timeout) {
        return await this.xpathHandler(elements.licenseMore(license.title, license.name),
            `Нажатие ссылки "Подробно" у лицензии ${license.title} ${license.name}.`,
            timeout)
    }

}

module.exports = LicensePage