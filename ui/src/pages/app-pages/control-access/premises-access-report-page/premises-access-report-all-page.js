const BasePage = require('../../../base-page/base-page');
const {premisesAccessReportTITLE} = require('../../../../dictionaries/title');
const {premisesAccessReportAllURL} = require('../../../../dictionaries/url');

class PremisesAccessReportAllPage extends BasePage {
    async init (timeout) {
        const title =  await this.titleCompare(premisesAccessReportTITLE, timeout)
        if(title.error) {
            return  elementTitle
        }

        const url = await this.urlCompare(premisesAccessReportAllURL, timeout)
        if(url.error) {
            return url
        }

        return {
            error: false,
            description: `Заглавие валидно. Url валиден.`,
        }
    }
}

module.exports = PremisesAccessReportAllPage;