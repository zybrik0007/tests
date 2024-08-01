const BasePage = require('../../../base-page/base-page');
const element = require('../../../../dictionaries/selenium-elements');
const {orderpassOrderpassTITLE} = require('../../../../dictionaries/title');
const {orderpassOrderURL} = require('../../../../dictionaries/url');

//Страница разделе "Бюро пропусков", подраздел "Посетители", вкладка "Заказанные"
class OrderpassOrderPage extends BasePage {

    constructor() {
        super();
    }

    //Отображение страницы
    async init(timeout) {
        const elementTitle = await this.titleCompare(orderpassOrderpassTITLE, timeout)
        if (elementTitle.error) {
            return elementTitle
        }

        const elementUrl = await this.urlCompare(orderpassOrderURL, timeout)
        if(elementUrl.error) {
            return elementUrl
        }

        return {
            error: false,
            description: 'Заглавие валидно. Url валиден.',
        }
    }
}

module.exports = OrderpassOrderPage