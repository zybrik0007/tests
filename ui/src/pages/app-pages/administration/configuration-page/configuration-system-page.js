const BasePage = require('../../../base-page/base-page');
const elements = require('../../../../dictionaries/selenium-elements');
const {systemTITLE} = require('../../../../dictionaries/title');
const {systemURL} = require('../../../../dictionaries/url');

class ConfigurationSystemPage extends BasePage {
    constructor() {
        super();
    }

    //Отображение страницы
    async init(timeout) {
        const title =  await this.titleCompare(systemTITLE, timeout)
        if(title.error) {
            return  elementTitle
        }

        const url = await this.urlCompare(systemURL, timeout)
        if(url.error) {
            return url
        }

        return {
            error: false,
            description: `Заглавие валидно. Url валиден.`,
        }
    }

    async getVersion(timeout) {
        return await this.xpathGetText(elements.admSystemVersionNumber(1),
            `Получение значение версии системы.`,
            timeout)
    }

    async getNumber(timeout) {
        return await this.xpathGetText(elements.admSystemVersionNumber(2),
            `Получение значение номера сборки.`,
            timeout)
    }

}

module.exports = ConfigurationSystemPage


