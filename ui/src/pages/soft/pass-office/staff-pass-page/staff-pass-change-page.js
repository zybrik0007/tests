const BasePage = require('../../../base-page/base-page');
const {staffTitle} = require('../../../../dictionaries/title');
const {staffPassEditUrl} = require('../../../../dictionaries/url');

//Страница разделе "Бюро пропусков", подраздел "Сотрудники"
class StaffPassChangePage extends BasePage {

    constructor() {
        super();
    }

    //Отображение страницы
    async init(timeout) {
        const title =  await this.titleCompare(staffTitle, timeout);
        if(title.error) {
            return title
        }

        const url = await this.urlContains(staffPassEditUrl, timeout);
        if(url.error) {
            return url
        }

        return {
            error: false,
            description: `Заглавие валидно. Url валиден.`,
        }
    }
}

module.exports = StaffPassChangePage