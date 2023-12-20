const BasePage = require('../../../base-page/base-page');
const {premisesAccessReportTitle} = require('../../../../dictionaries/title');
const {premisesAccessReportVisitorUrl} = require('../../../../dictionaries/url');

class PremisesAccessReportVisitorPage extends BasePage {
    async init (timeout) {
        const title =  await this.titleCompare(premisesAccessReportTitle, timeout)
        if(title.error) {
            return  elementTitle
        }

        const url = await this.urlCompare(premisesAccessReportVisitorUrl, timeout)
        if(url.error) {
            return url
        }

        return {
            error: false,
            description: `Заглавие валидно. Url валиден.`,
        }
    }
}

module.exports = PremisesAccessReportVisitorPage;