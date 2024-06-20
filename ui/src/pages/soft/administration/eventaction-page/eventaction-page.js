const BasePage = require('../../../base-page/base-page');
const elements = require('../../../../dictionaries/selenium-elements');
const {eventactionTitle} = require('../../../../dictionaries/title');
const {eventactionUrl} = require('../../../../dictionaries/url');


class EventactionPage extends BasePage {
    constructor() {
        super();
    }

    //Отображение страницы
    async init(timeout) {
        const title =  await this.titleCompare(eventactionTitle, timeout);
        if(title.error) {
            return title;
        }

        const url = await this.urlCompare(eventactionUrl, timeout);
        if(url.error) {
            return url;
        }

        return {
            error: false,
            description: `Заглавие валидно. Url валиден.`,
        }
    }

}

module.exports = EventactionPage;


