const BasePage = require('../../../base-page/base-page')
const elements = require('../../../../dictionaries/selenium-elements')
const {orderpassOrderpassTitle} = require('../../../../dictionaries/title')
const {orderpassChangeAdd, orderpassChangeEdit} = require('../../../../dictionaries/url')

//Страница разделе "Бюро пропусков", подраздел "Посетители", вкладка "Действующие"
class OrderpassChangePage extends BasePage {

    constructor() {
        super();
    }

    //Отображение страницы
    async initAdd(timeout) {
        const elementTitle = await this.titleCompare(orderpassOrderpassTitle, timeout)
        if (elementTitle.error) {
            return elementTitle
        }

        const elementUrl = await this.urlCompare(orderpassChangeAdd, timeout)
        if(elementUrl.error) {
            return elementUrl
        }

        return {
            error: false,
            description: 'Заглавие валидно. Url валиден.',
        }
    }

    async initEdit(timeout) {
        const elementTitle = await this.titleCompare(orderpassOrderpassTitle, timeout)
        if (elementTitle.error) {
            return elementTitle
        }

        const elementUrl = await this.urlContains(orderpassChangeEdit, timeout)
        if(elementUrl.error) {
            return elementUrl
        }

        return {
            error: false,
            description: 'Заглавие валидно. Url валиден.',
        }
    }

}

module.exports = OrderpassChangePage
