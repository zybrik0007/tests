const BasePage = require('../../../base-page/base-page');
const {premisesAccessReportTITLE} = require('../../../../dictionaries/title');
const {premisesAccessReportStaffURL} = require('../../../../dictionaries/url');

class PremisesAccessReportStaffPage extends BasePage {
    async init (timeout) {
        const title =  await this.titleCompare(premisesAccessReportTITLE, timeout)
        if(title.error) {
            return  elementTitle
        }

        const url = await this.urlCompare(premisesAccessReportStaffURL, timeout)
        if(url.error) {
            return url
        }

        return {
            error: false,
            description: `Заглавие валидно. Url валиден.`,
        }
    }
}

module.exports = PremisesAccessReportStaffPage;