const BasePage = require('../../../base-page/base-page');
const element = require('../../../../dictionaries/selenium-elements');
const {positionsTITLE} = require('../../../../dictionaries/title');
const {positionsURL} = require('../../../../dictionaries/url');

//Страница разделе "Персонал", подраздел "Должности"
class PositionsPage extends BasePage {

    constructor() {
        super();
    }

    //Отображение страницы
    async init(timeout) {
        const elementTitle = await this.titleCompare(positionsTITLE, timeout)
        if (elementTitle.error) {
            return elementTitle
        }

        const elementUrl = await this.urlCompare(positionsURL, timeout)
        if(elementUrl.error) {
            return elementUrl
        }

        return {
            error: false,
            description: 'Заглавие валидно. Url валиден.',
        }
    }

}

module.exports = PositionsPage;