const BasePage = require('../../../base-page/base-page')
const elements = require('../../../../dictionaries/selenium-elements')
const {orderpassOrderpassTitle} = require('../../../../dictionaries/title')
const {orderpassArchive} = require('../../../../dictionaries/url')

//Страница разделе "Бюро пропусков", подраздел "Посетители", вкладка "Действующие"
class OrderpassArchivePage extends BasePage {

    constructor() {
        super();
    }

    //Отображение страницы
    async init(timeout) {
        const elementTitle = await this.titleCompare(orderpassOrderpassTitle, timeout)
        if (elementTitle.error) {
            return elementTitle
        }

        const elementUrl = await this.urlCompare(orderpassArchive, timeout)
        if(elementUrl.error) {
            return elementUrl
        }

        return {
            error: false,
            description: 'Заглавие валидно. Url валиден.',
        }
    }

}

module.exports = OrderpassArchivePage
