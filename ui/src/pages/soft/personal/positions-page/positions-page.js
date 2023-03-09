const BasePage = require('../../../base-page/base-page')
const element = require('../../../../dictionaries/selenium-elements')
const {positionsTitle} = require('../../../../dictionaries/title')
const {positionsUrl} = require('../../../../dictionaries/url')


class PositionsPage extends BasePage {
    constructor() {
        super();
    }

    async init(timeout) {
        const elementTitle = await this.titleCompare(positionsTitle, timeout)
        if (elementTitle.error) {
            return elementTitle
        }

        const elementUrl = await this.urlCompare(positionsUrl, timeout)
        if(elementUrl.error) {
            return elementUrl
        }

        return {
            error: false,
            description: 'Заглавие валидно. Url валиден.'
        }
    }

}

module.exports = PositionsPage