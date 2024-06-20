const BasePage = require('../../../base-page/base-page');
const elements = require('../../../../dictionaries/selenium-elements');
const {roleTitle} = require('../../../../dictionaries/title');
const {roleAddUrl, roleEditUrl, roleCopyUrl} = require('../../../../dictionaries/url');

class RoleChangePage extends BasePage {

    constructor() {
        super();
    }

    //Отображение страницы
    async initAdd(timeout) {
        const title =  await this.titleCompare(roleTitle, timeout);
        if(title.error) {
            return title;
        }

        const url = await this.urlCompare(roleAddUrl, timeout);
        if(url.error) {
            return url;
        }

        return {
            error: false,
            description: `Заглавие валидно. Url валиден.`,
        }
    }

    async initEdit(timeout) {
        const title =  await this.titleCompare(roleTitle, timeout);
        if(title.error) {
            return title;
        }

        const url = await this.urlCompare(roleEditUrl, timeout);
        if(url.error) {
            return url;
        }

        return {
            error: false,
            description: `Заглавие валидно. Url валиден.`,
        }
    }

    async initCopy(timeout) {
        const title =  await this.titleCompare(roleTitle, timeout);
        if(title.error) {
            return title;
        }

        const url = await this.urlCompare(roleCopyUrl, timeout);
        if(url.error) {
            return url;
        }

        return {
            error: false,
            description: `Заглавие валидно. Url валиден.`,
        }
    }

}

module.exports = RoleChangePage;


