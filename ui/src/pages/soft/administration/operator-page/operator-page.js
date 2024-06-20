const BasePage = require('../../../base-page/base-page')
const elements = require('../../../../dictionaries/selenium-elements')
const {operatorTitle} = require('../../../../dictionaries/title')
const {operatorUrl} = require('../../../../dictionaries/url')

class OperatorPage extends BasePage {

    constructor() {
        super();
    }

    //Отображение страницы
    async init(timeout) {
        const title =  await this.titleCompare(operatorTitle, timeout)
        if(title.error) {
            return title
        }

        const url = await this.urlCompare(operatorUrl, timeout)
        if(url.error) {
            return url
        }

        return {
            error: false,
            description: `Заглавие валидно. Url валиден.`,
        }
    }

}

module.exports = OperatorPage