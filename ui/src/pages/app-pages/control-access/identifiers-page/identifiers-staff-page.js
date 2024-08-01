const BasePage = require('../../../base-page/base-page');
const {identifiersTITLE} = require('../../../../dictionaries/title');
const {identifiersStaffURL} = require('../../../../dictionaries/url');

class IdentifiersStaffPage extends BasePage {
    async init (timeout) {
        const title =  await this.titleCompare(identifiersTITLE, timeout)
        if(title.error) {
            return  elementTitle
        }

        const url = await this.urlCompare(identifiersStaffURL, timeout)
        if(url.error) {
            return url
        }

        return {
            error: false,
            description: `Заглавие валидно. Url валиден.`,
        }
    }
}

module.exports = IdentifiersStaffPage;