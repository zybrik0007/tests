const BasePage = require('../../../base-page/base-page')
const element = require('../../../../dictionaries/selenium-elements')
const {schedulesTitle} = require('../../../../dictionaries/title')
const {schedulesUrl} = require('../../../../dictionaries/url')

//Страница разделе "Персонал", подраздел "Графики работы"
class SchedulePage extends BasePage {

    constructor() {
        super();
    }

    //Отображение страницы
    async init(timeout) {
        const elementTitle = await this.titleCompare(schedulesTitle, timeout)
        if (elementTitle.error) {
            return elementTitle
        }

        const elementUrl = await this.urlCompare(schedulesUrl, timeout)
        if(elementUrl.error) {
            return elementUrl
        }

        return {
            error: false,
            description: 'Заглавие валидно. Url валиден.',
        }
    }


}

module.exports = SchedulePage