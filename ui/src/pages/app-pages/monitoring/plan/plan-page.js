const BasePage = require('../../../base-page/base-page');
const {planTITLE} = require('../../../../dictionaries/title');
const {planURL} = require('../../../../dictionaries/url');

class PlanPage extends BasePage {

    constructor() {
        super();
    }

    //Отображение страницы
    async init(timeout) {
        const elementTitle = await this.titleCompare(planTITLE, timeout)
        if (elementTitle.error) {
            return elementTitle
        }

        const elementUrl = await this.urlContains(planURL, timeout)
        if(elementUrl.error) {
            return elementUrl
        }

        return {
            error: false,
            description: 'Заглавие валидно. Url валиден.',
        }
    }
}

module.exports = PlanPage;