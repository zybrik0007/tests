const BasePage = require('../../../base-page/base-page');
const {schedulesTITLE} = require('../../../../dictionaries/title');
const {schedulesURL} = require('../../../../dictionaries/url');

//Страница разделе "Персонал", подраздел "Графики работы"
class SchedulePage extends BasePage {

    constructor() {
        super();
    }

    //Отображение страницы
    async init(timeout) {
        const elementTitle = await this.titleCompare(schedulesTITLE, timeout)
        if (elementTitle.error) {
            return elementTitle
        }

        const elementUrl = await this.urlCompare(schedulesURL, timeout)
        if(elementUrl.error) {
            return elementUrl
        }

        return {
            error: false,
            description: 'Заглавие валидно. Url валиден.',
        }
    }


}

module.exports = SchedulePage;