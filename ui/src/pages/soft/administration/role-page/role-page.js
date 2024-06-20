const BasePage = require('../../../base-page/base-page')
const elements = require('../../../../dictionaries/selenium-elements')
const {roleTitle} = require('../../../../dictionaries/title')
const {roleUrl} = require('../../../../dictionaries/url')

class RolePage extends BasePage {

    constructor() {
        super();
    }

    //Отображение страницы
    async init(timeout) {
        const title =  await this.titleCompare(roleTitle, timeout)
        if(title.error) {
            return title
        }

        const url = await this.urlCompare(roleUrl, timeout)
        if(url.error) {
            return url
        }

        return {
            error: false,
            description: `Заглавие валидно. Url валиден.`,
        }
    }

}

module.exports = RolePage;