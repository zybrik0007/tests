const BasePage = require('../../../base-page/base-page');
const elements = require('../../../../dictionaries/selenium-elements');
const {operatorTitle} = require('../../../../dictionaries/title');
const {operatorAddUrl, operatorEditUrl, operatorCopyUrl} = require('../../../../dictionaries/url');

class OperatorChangePage extends BasePage {

    constructor() {
        super();
    }

    //Отображение страницы
    async initAdd(timeout) {
        const title =  await this.titleCompare(operatorTitle, timeout);
        if(title.error) {
            return title;
        }

        const url = await this.urlCompare(operatorAddUrl, timeout);
        if(url.error) {
            return url;
        }

        return {
            error: false,
            description: `Заглавие валидно. Url валиден.`,
        }
    }

    async initEdit(timeout) {
        const title =  await this.titleCompare(operatorTitle, timeout);
        if(title.error) {
            return title;
        }

        const url = await this.urlCompare(operatorEditUrl, timeout);
        if(url.error) {
            return url;
        }

        return {
            error: false,
            description: `Заглавие валидно. Url валиден.`,
        }
    }

    async initCopy(timeout) {
        const title =  await this.titleCompare(operatorTitle, timeout);
        if(title.error) {
            return title;
        }

        const url = await this.urlCompare(operatorCopyUrl, timeout);
        if(url.error) {
            return url;
        }

        return {
            error: false,
            description: `Заглавие валидно. Url валиден.`,
        }
    }

}

module.exports = OperatorChangePage;


