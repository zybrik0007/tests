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
            timeout);
    }

    // Количество карт
    async size(size, timeout) {
        return await this.xpathList(elements.designCardSize,
            `Количество дизайнов пропуска равно "${size}".`,
            size,
            timeout);
    }

    // Получение названия наименования
    async name(num, timeout) {
        return await this.xpathGetText(elements.designCardName(num),
            `Получение значение наименования дизайна пропуска с порядковым номером ${num}`,
            timeout);
    }

    // Получение названия типа
    async type(num, timeout) {
        return await this.xpathGetText(elements.designCardType(num),
            `Получение значение типа дизайна пропуска с порядковым номером ${num}`,
            timeout);
    }

}

module.exports = DesignPage