const BasePage = require('../../../base-page/base-page');
const {staffTITLE} = require('../../../../dictionaries/title');
const {staffPresentURL} = require('../../../../dictionaries/url');

//Страница разделе "Персонал", подраздел "Сотрудники", вкладка "Действующие"
class StaffActivePage extends BasePage {

    constructor() {
        super();
    }

    //Отображение страницы
    async init(timeout) {
        const elementTitle = await this.titleCompare(staffTITLE, timeout)
        if (elementTitle.error) {
            return elementTitle
        }

        const elementUrl = await this.urlCompare(staffPresentURL, timeout)
        if(elementUrl.error) {
            return elementUrl
        }

        return {
            error: false,
            description: 'Заглавие валидно. Url валиден.',
        }
    }
}

module.exports = StaffActivePage;