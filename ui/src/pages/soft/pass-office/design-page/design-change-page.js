const BasePage = require('../../../base-page/base-page');
const elements = require('../../../../dictionaries/selenium-elements');
const {designTitle} = require('../../../../dictionaries/title');
const {designAddUrl, designEditUrl, designCopyUrl} = require('../../../../dictionaries/url');


class DesignChangePage extends BasePage {
    constructor() {
        super();
    }

    //Отображение страницы добавления
    async initAdd(timeout) {
        const title =  await this.titleCompare(designTitle, timeout)
        if(title.error) {
            return  elementTitle
        }

        const url = await this.urlCompare(designAddUrl, timeout)
        if(url.error) {
            return url
        }

        return {
            error: false,
            description: `Заглавие валидно. Url валиден.`,
        }
    }

    //Отображение страницы редактирования
    async initEdit(timeout) {
        const title =  await this.titleCompare(designTitle, timeout)
        if(title.error) {
            return  title
        }

        const url = await this.urlContains(designEditUrl, timeout)
        if(url.error) {
            return url
        }

        return {
            error: false,
            description: `Заглавие валидно. Url валиден.`,
        }
    }

    //Отображение страницы копирования
    async initCopy(timeout) {
        const title =  await this.titleCompare(designTitle, timeout)
        if(title.error) {
            return  title
        }

        const url = await this.urlContains(designCopyUrl, timeout)
        if(url.error) {
            return url
        }

        return {
            error: false,
            description: `Заглавие валидно. Url валиден.`,
        }
    }

}

module.exports = DesignChangePage