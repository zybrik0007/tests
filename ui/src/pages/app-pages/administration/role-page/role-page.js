const BasePage = require('../../../base-page/base-page');
const {roleTITLE} = require('../../../../dictionaries/title');
const {roleURL} = require('../../../../dictionaries/url');

class RolePage extends BasePage {

    constructor() {
        super();
    }

    //Отображение страницы
    async init(timeout) {
        const title =  await this.titleCompare(roleTITLE, timeout)
        if(title.error) {
            return title
        }

        const url = await this.urlCompare(roleURL, timeout)
        if(url.error) {
            return url
        }

        return {
            error: false,
            description: `Заглавие валидно. Url валиден.`,
        }
    }

}

module.exports = RolePage;