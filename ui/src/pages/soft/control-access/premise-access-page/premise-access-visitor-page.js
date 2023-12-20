const BasePage = require('../../../base-page/base-page');
const elements = require('../../../../dictionaries/selenium-elements');
const {premiseAccessTitle} = require('../../../../dictionaries/title');
const {premiseAccessVisitorUrl} = require('../../../../dictionaries/url');

class PremiseAccessVisitorPage extends BasePage {
    async init (timeout) {
        const title =  await this.titleCompare(premiseAccessTitle, timeout)
        if(title.error) {
            return  elementTitle
        }

        const url = await this.urlCompare(premiseAccessVisitorUrl, timeout)
        if(url.error) {
            return url
        }

        return {
            error: false,
            description: `Заглавие валидно. Url валиден.`,
        }
    }
}

module.exports = PremiseAccessVisitorPage;