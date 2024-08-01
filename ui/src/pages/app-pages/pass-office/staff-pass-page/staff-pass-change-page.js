const BasePage = require('../../../base-page/base-page');
const {staffTITLE} = require('../../../../dictionaries/title');
const {staffPassEditURL} = require('../../../../dictionaries/url');

//Страница разделе "Бюро пропусков", подраздел "Сотрудники"
class StaffPassChangePage extends BasePage {

    constructor() {
        super();
    }

    //Отображение страницы
    async init(timeout) {
        const title =  await this.titleCompare(staffTITLE, timeout);
        if(title.error) {
            return title
        }

        const url = await this.urlContains(staffPassEditURL, timeout);
        if(url.error) {
            return url
        }

        return {
            error: false,
            description: `Заглавие валидно. Url валиден.`,
        }
    }
}

module.exports = StaffPassChangePage;