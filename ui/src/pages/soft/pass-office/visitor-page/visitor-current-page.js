const BasePage = require('../../../base-page/base-page')
const elements = require('../../../../dictionaries/selenium-elements')
const {visitorTitle} = require('../../../../dictionaries/title')
const {visitorCurrentUrl} = require('../../../../dictionaries/url')

//Страница разделе "Бюро пропусков", подраздел "Посетители", вкладка "Действующие"
class VisitorCurrentPage extends BasePage {

    constructor() {
        super();
    }

    //Отображение страницы
    async init(timeout) {
        const elementTitle = await this.titleCompare(visitorTitle, timeout)
        if (elementTitle.error) {
            return elementTitle
        }

        const elementUrl = await this.urlCompare(visitorCurrentUrl, timeout)
        if(elementUrl.error) {
            return elementUrl
        }

        return {
            error: false,
            description: 'Заглавие валидно. Url валиден.',
        }
    }


}

module.exports = VisitorCurrentPage
