const BasePage = require('../../../base-page/base-page');
const {visitorTITLE} = require('../../../../dictionaries/title');
const {visitorAddURL, visitorEditURL} = require('../../../../dictionaries/url');

//Страница изменения в разделе "Бюро пропусков", подраздел "Посетители"
class VisitorChangePage extends BasePage {

    constructor() {
        super();
    }

    async initAdd(timeout) {
        const title = await this.titleCompare(visitorTITLE, timeout)
        if (title.error) {
            return title
        }

        const url = await this.urlCompare(visitorAddURL, timeout)
        if(url.error) {
            return url
        }

        return {
            error: false,
            description: 'Заглавие валидно. Url валиден.'
        }
    }

    async initEdit(timeout) {
        const title =  await this.titleCompare(visitorTITLE, timeout)
        if(title.error) {
            return  title
        }

        const url = await this.urlContains(visitorEditURL, timeout)
        if(url.error) {
            return url
        }

        return {error: false, description: `Заглавие валидно. Url валиден.`}
    }
}

module.exports = VisitorChangePage;