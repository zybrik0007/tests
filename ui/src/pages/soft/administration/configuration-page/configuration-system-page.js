const BasePage = require('../../../base-page/base-page')
const elements = require('../../../../dictionaries/selenium-elements')
const {systemTitle} = require('../../../../dictionaries/title')
const {systemUrl} = require('../../../../dictionaries/url')


class ConfigurationSystemPage extends BasePage {
    constructor() {
        super();
    }

    //Отображение страницы
    async init(timeout) {
        const title =  await this.titleCompare(systemTitle, timeout)
        if(title.error) {
            return  elementTitle
        }

        const url = await this.urlCompare(systemUrl, timeout)
        if(url.error) {
            return url
        }

        return {
            error: false,
            description: `Заглавие валидно. Url валиден.`,
        }
    }

}

module.exports = ConfigurationSystemPage


