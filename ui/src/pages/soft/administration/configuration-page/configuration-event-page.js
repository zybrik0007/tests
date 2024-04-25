const BasePage = require('../../../base-page/base-page')
const elements = require('../../../../dictionaries/selenium-elements')
const {eventRenameTitle} = require('../../../../dictionaries/title')
const {eventRenameUrl} = require('../../../../dictionaries/url')


class ConfigurationEventPage extends BasePage {
    constructor() {
        super();
    }

    //Отображение страницы
    async init(timeout) {
        const title =  await this.titleCompare(eventRenameTitle, timeout)
        if(title.error) {
            return  elementTitle
        }

        const url = await this.urlCompare(eventRenameUrl, timeout)
        if(url.error) {
            return url
        }

        return {
            error: false,
            description: `Заглавие валидно. Url валиден.`,
        }
    }

}

module.exports = ConfigurationEventPage


