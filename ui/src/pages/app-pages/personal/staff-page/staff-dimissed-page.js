const BasePage = require('../../../base-page/base-page');
const elements = require('../../../../dictionaries/selenium-elements');
const {staffTITLE} = require('../../../../dictionaries/title');
const {staffDismissedURL} = require('../../../../dictionaries/url');

//Страница разделе "Персонал", подраздел "Сотрудники", вкладка "Уволенные"
class StaffDimissedPage extends BasePage {

    constructor() {
        super();
    }

    //Отображение страницы
    async init(timeout) {
        const elementTitle = await this.titleCompare(staffTITLE, timeout)
        if (elementTitle.error) {
            return elementTitle
        }

        const elementUrl = await this.urlCompare(staffDismissedURL, timeout)
        if(elementUrl.error) {
            return elementUrl
        }

        return {
            error: false,
            description: 'Заглавие валидно. Url валиден.',
        }
    }
}

module.exports = StaffDimissedPage