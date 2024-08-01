const BasePage = require('../../../base-page/base-page');
const elements = require('../../../../dictionaries/selenium-elements');
const {eventTITLE} = require('../../../../dictionaries/title');
const {eventURL} = require('../../../../dictionaries/url');

class EventPage extends BasePage {
    constructor() {
        super();
    }

    //Отображение страницы
    async init(timeout) {
        const title =  await this.titleCompare(eventTITLE, timeout);
        if(title.error) {
            return title;
        }

        const url = await this.urlCompare(eventURL, timeout);
        if(url.error) {
            return url;
        }

        return {
            error: false,
            description: `Заглавие валидно. Url валиден.`,
        }
    }

}

module.exports = EventPage;


