const BasePage = require('../../../base-page/base-page');
const {whereAboutsTITLE} = require('../../../../dictionaries/title');
const {whereAboutsAllURL} = require('../../../../dictionaries/url');

class WhereAboutsAllPage extends BasePage {
    async init (timeout) {
        const title =  await this.titleCompare(whereAboutsTITLE, timeout)
        if(title.error) {
            return  elementTitle
        }

        const url = await this.urlCompare(whereAboutsAllURL, timeout)
        if(url.error) {
            return url
        }

        return {
            error: false,
            description: `Заглавие валидно. Url валиден.`,
        }
    }
}

module.exports = WhereAboutsAllPage;