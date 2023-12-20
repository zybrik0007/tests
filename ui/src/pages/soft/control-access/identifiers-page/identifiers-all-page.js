const BasePage = require('../../../base-page/base-page');
const {identifiersTitle} = require('../../../../dictionaries/title');
const {identifiersAllUrl} = require('../../../../dictionaries/url');

class IdentifiersAllPage extends BasePage {
    async init (timeout) {
        const title =  await this.titleCompare(identifiersTitle, timeout)
        if(title.error) {
            return  elementTitle
        }

        const url = await this.urlCompare(identifiersAllUrl, timeout)
        if(url.error) {
            return url
        }

        return {
            error: false,
            description: `Заглавие валидно. Url валиден.`,
        }
    }
}

module.exports = IdentifiersAllPage;