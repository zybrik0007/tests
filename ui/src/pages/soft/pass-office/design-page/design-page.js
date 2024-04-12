const BasePage = require('../../../base-page/base-page');
const elements = require('../../../../dictionaries/selenium-elements');
const {designTitle} = require('../../../../dictionaries/title');
const {designUrl} = require('../../../../dictionaries/url');


class DesignPage extends BasePage {
    constructor() {
        super();
    }

    //Отображение страницы добавления
    async init(timeout) {
        const title =  await this.titleCompare(designTitle, timeout)
        if(title.error) {
            return  elementTitle
        }

        const url = await this.urlCompare(designUrl, timeout)
        if(url.error) {
            return url
        }

        return {
            error: false,
            description: `Заглавие валидно. Url валиден.`,
        }
    }

    // Количество карт
    async cardCount() {}

    // Получение названия наименования
    async cardGetName() {}

    // Получение названия юзера
    async cardGetUser() {}


}

module.exports = DesignPage