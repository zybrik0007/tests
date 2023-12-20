const BasePage = require('../../../base-page/base-page');
const {identifiersTitle} = require('../../../../dictionaries/title');
const {identifiersStaffUrl} = require('../../../../dictionaries/url');

class IdentifiersStaffPage extends BasePage {
    async init (timeout) {
        const title =  await this.titleCompare(identifiersTitle, timeout)
        if(title.error) {
            return  elementTitle
        }

        const url = await this.urlCompare(identifiersStaffUrl, timeout)
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