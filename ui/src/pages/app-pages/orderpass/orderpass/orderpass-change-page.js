const BasePage = require('../../../base-page/base-page');
const {orderpassOrderpassTITLE} = require('../../../../dictionaries/title');
const {orderpassChangeAddURL, orderpassChangeEditURL} = require('../../../../dictionaries/url');

//Страница разделе "Бюро пропусков", подраздел "Посетители", вкладка "Действующие"
class OrderpassChangePage extends BasePage {

    constructor() {
        super();
    }

    //Отображение страницы
    async initAdd(timeout) {
        const elementTitle = await this.titleCompare(orderpassOrderpassTITLE, timeout)
        if (elementTitle.error) {
            return elementTitle
        }

        const elementUrl = await this.urlCompare(orderpassChangeAddURL, timeout)
        if(elementUrl.error) {
            return elementUrl
        }

        return {
            error: false,
            description: 'Заглавие валидно. Url валиден.',
        }
    }

    async initEdit(timeout) {
        const elementTitle = await this.titleCompare(orderpassOrderpassTITLE, timeout)
        if (elementTitle.error) {
            return elementTitle
        }

        const elementUrl = await this.urlContains(orderpassChangeEditURL, timeout)
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
