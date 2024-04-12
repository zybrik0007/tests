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

    // Нажатие по карте
    async handler(num, timeout) {
        return this.xpathHandler(elements.designCard(num),
            `Нажатие по дизайну пропуска с порядковым номером "${num}".`,
            timeout)
    }

    // Количество карт
    async size(size, timeout) {
        return await this.xpathList(elements.designCardSize,
            `Отображение `,
            timeout)
    }

    // Получение названия наименования
    async name() {}

    // Получение названия юзера
    async user() {}


}

module.exports = DesignPage