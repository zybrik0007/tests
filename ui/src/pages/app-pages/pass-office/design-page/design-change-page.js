const BasePage = require('../../../base-page/base-page');
const {designTITLE} = require('../../../../dictionaries/title');
const {designAddURL, designEditURL, designCopyURL} = require('../../../../dictionaries/url');


class DesignChangePage extends BasePage {
    constructor() {
        super();
    }

    //Отображение страницы добавления
    async initAdd(timeout) {
        const title =  await this.titleCompare(designTITLE, timeout)
        if(title.error) {
            return  elementTitle
        }

        const url = await this.urlCompare(designAddURL, timeout)
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
        const title =  await this.titleCompare(designTITLE, timeout)
        if(title.error) {
            return  title
        }

        const url = await this.urlContains(designEditURL, timeout)
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
        const title =  await this.titleCompare(designTITLE, timeout)
        if(title.error) {
            return  title
        }

        const url = await this.urlContains(designCopyURL, timeout)
        if(url.error) {
            return url
        }

        return {
            error: false,
            description: `Заглавие валидно. Url валиден.`,
        }
    }

}

module.exports = DesignChangePage;