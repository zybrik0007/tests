const BasePage = require('../../../base-page/base-page')
const {accessTemplatesTitle} = require('../../../../dictionaries/title')
const {accessScheduleUrl} = require('../../../../dictionaries/url')

class AccessTemplateSchedulePage extends BasePage {

    constructor() {
        super()
    }

    //Отображение страницы
    async init(timeout) {
        const title =  await this.titleCompare(accessTemplatesTitle, timeout)
        if(title.error) {
            return title
        }

        const url = await this.urlCompare(accessScheduleUrl, timeout)
        if(url.error) {
            return url
        }

        return {
            error: false,
            description: `Заглавие валидно. Url валиден.`,
        }
    }
}

module.exports = AccessTemplateSchedulePage

