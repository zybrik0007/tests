const BasePage = require('../../../base-page/base-page');
const {accessTemplatesTITLE} = require('../../../../dictionaries/title');
const {accessScheduleURL} = require('../../../../dictionaries/url');

class AccessTemplateSchedulePage extends BasePage {

    constructor() {
        super()
    }

    //Отображение страницы
    async init(timeout) {
        const title =  await this.titleCompare(accessTemplatesTITLE, timeout)
        if(title.error) {
            return title
        }

        const url = await this.urlCompare(accessScheduleURL, timeout)
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

