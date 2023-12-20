const BasePage = require('../../../base-page/base-page');
const {premisesAccessReportTitle} = require('../../../../dictionaries/title');
const {premisesAccessReportStaffUrl} = require('../../../../dictionaries/url');

class PremisesAccessReportStaffPage extends BasePage {
    async init (timeout) {
        const title =  await this.titleCompare(premisesAccessReportTitle, timeout)
        if(title.error) {
            return  elementTitle
        }

        const url = await this.urlCompare(premisesAccessReportStaffUrl, timeout)
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