const BasePage = require('../../../base-page/base-page');
const {eventactionTITLE} = require('../../../../dictionaries/title');
const {eventactionURL} = require('../../../../dictionaries/url');

class EventactionPage extends BasePage {
    constructor() {
        super();
    }

    //Отображение страницы
    async init(timeout) {
        const title =  await this.titleCompare(eventactionTITLE, timeout);
        if(title.error) {
            return title;
        }

        const url = await this.urlCompare(eventactionURL, timeout);
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


