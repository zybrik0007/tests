const BasePage = require('../../../base-page/base-page')
const {visitorTitle} = require('../../../../dictionaries/title')
const {visitorAddUrl, visitorEditUrl} = require('../../../../dictionaries/url')

//Страница изменения в разделе "Бюро пропусков", подраздел "Посетители"
class VisitorChangePage extends BasePage {

    constructor() {
        super();
    }

    async initAdd(timeout) {
        const title = await this.titleCompare(visitorTitle, timeout)
        if (title.error) {
            return title
        }

        const url = await this.urlCompare(visitorAddUrl, timeout)
        if(url.error) {
            return url
        }

        return {
            error: false,
            description: 'Заглавие валидно. Url валиден.'
        }
    }

    async initEdit(timeout) {
        const title =  await this.titleCompare(visitorTitle, timeout)
        if(title.error) {
            return  title
        }

        const url = await this.urlContains(visitorEditUrl, timeout)
        if(url.error) {
            return url
        }

        return {error: false, description: `Заглавие валидно. Url валиден.`}
    }
}

module.exports = VisitorChangePage