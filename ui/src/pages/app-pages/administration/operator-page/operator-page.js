const BasePage = require('../../../base-page/base-page');
const {operatorTITLE} = require('../../../../dictionaries/title');
const {operatorURL} = require('../../../../dictionaries/url');

class OperatorPage extends BasePage {

    constructor() {
        super();
    }

    //Отображение страницы
    async init(timeout) {
        const title =  await this.titleCompare(operatorTITLE, timeout)
        if(title.error) {
            return title
        }

        const url = await this.urlCompare(operatorURL, timeout)
        if(url.error) {
            return url
        }

        return {
            error: false,
            description: `Заглавие валидно. Url валиден.`,
        }
    }

}

module.exports = OperatorPage