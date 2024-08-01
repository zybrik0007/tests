const BasePage = require('../../../base-page/base-page');
const {roleTITLE} = require('../../../../dictionaries/title');
const {roleAddURL, roleEditURL, roleCopyURL} = require('../../../../dictionaries/url');

class RoleChangePage extends BasePage {

    constructor() {
        super();
    }

    //Отображение страницы
    async initAdd(timeout) {
        const title =  await this.titleCompare(roleTITLE, timeout);
        if(title.error) {
            return title;
        }

        const url = await this.urlCompare(roleAddURL, timeout);
        if(url.error) {
            return url;
        }

        return {
            error: false,
            description: `Заглавие валидно. Url валиден.`,
        }
    }

    async initEdit(timeout) {
        const title =  await this.titleCompare(roleTITLE, timeout);
        if(title.error) {
            return title;
        }

        const url = await this.urlContains(roleEditURL, timeout);
        if(url.error) {
            return url;
        }

        return {
            error: false,
            description: `Заглавие валидно. Url валиден.`,
        }
    }

    async initCopy(timeout) {
        const title =  await this.titleCompare(roleTITLE, timeout);
        if(title.error) {
            return title;
        }

        const url = await this.urlContains(roleCopyURL, timeout);
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


