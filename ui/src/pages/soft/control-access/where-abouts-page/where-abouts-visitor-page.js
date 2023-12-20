const BasePage = require('../../../base-page/base-page');
const elements = require('../../../../dictionaries/selenium-elements');
const {whereAboutsTitle} = require('../../../../dictionaries/title');
const {whereAboutsVisitorUrl} = require('../../../../dictionaries/url');

class WhereAboutsVisitorPage extends BasePage {
    async init (timeout) {
        const title =  await this.titleCompare(whereAboutsTitle, timeout)
        if(title.error) {
            return  elementTitle
        }

        const url = await this.urlCompare(whereAboutsVisitorUrl, timeout)
        if(url.error) {
            return url
        }

        return {
            error: false,
            description: `Заглавие валидно. Url валиден.`,
        }
    }
}

module.exports = WhereAboutsVisitorPage;