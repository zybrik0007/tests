const BasePage = require('../../../base-page/base-page');
const {premiseAccessTITLE} = require('../../../../dictionaries/title');
const {premiseAccessAllURL} = require('../../../../dictionaries/url');

class PremiseAccessAllPage extends BasePage {
    async init (timeout) {
        const title =  await this.titleCompare(premiseAccessTITLE, timeout)
        if(title.error) {
            return  elementTitle
        }

        const url = await this.urlCompare(premiseAccessAllURL, timeout)
        if(url.error) {
            return url
        }

        return {
            error: false,
            description: `Заглавие валидно. Url валиден.`,
        }
    }
}

module.exports = PremiseAccessAllPage;