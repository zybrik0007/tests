const BasePage = require('../../../base-page/base-page')
const elements = require('../../../../dictionaries/selenium-elements')
const {templateCameraTitle} = require('../../../../dictionaries/title')
const {templateCameraUrl} = require('../../../../dictionaries/url')


class ConfigurationCameraPage extends BasePage {
    constructor() {
        super();
    }

    //Отображение страницы
    async init(timeout) {
        const title =  await this.titleCompare(templateCameraTitle, timeout)
        if(title.error) {
            return  elementTitle
        }

        const url = await this.urlCompare(templateCameraUrl, timeout)
        if(url.error) {
            return url
        }

        return {
            error: false,
            description: `Заглавие валидно. Url валиден.`,
        }
    }

}

module.exports = ConfigurationCameraPage


