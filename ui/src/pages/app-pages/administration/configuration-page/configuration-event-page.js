const BasePage = require('../../../base-page/base-page');
const {eventRenameTITLE} = require('../../../../dictionaries/title');
const {eventRenameURL} = require('../../../../dictionaries/url');


class ConfigurationEventPage extends BasePage {
    constructor() {
        super();
    }

    //Отображение страницы
    async init(timeout) {
        const title =  await this.titleCompare(eventRenameTITLE, timeout)
        if(title.error) {
            return  elementTitle
        }

        const url = await this.urlCompare(eventRenameURL, timeout)
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


