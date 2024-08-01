const BasePage = require('../../../base-page/base-page');
const {whereAboutsTITLE} = require('../../../../dictionaries/title');
const {whereAboutsVisitorURL} = require('../../../../dictionaries/url');

class WhereAboutsVisitorPage extends BasePage {
    async init (timeout) {
        const title =  await this.titleCompare(whereAboutsTITLE, timeout)
        if(title.error) {
            return  elementTitle
        }

        const url = await this.urlCompare(whereAboutsVisitorURL, timeout)
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