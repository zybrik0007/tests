const BasePage = require('../../../base-page/base-page')
const {accessTemplatesTitle} = require('../../../../dictionaries/title')
const {accessTemplatesUrl} = require('../../../../dictionaries/url')

//Страница разделе "Бюро пропусков", подраздел "Шабалоны доступа", вкладка "Шаблоны доступа"
class AccessTemplatePage extends BasePage {

    constructor() {
        super();
    }

    //Отображение страницы
    async init(timeout) {
        const title =  await this.titleCompare(accessTemplatesTitle, timeout)
        if(title.error) {
            return title
        }

        const url = await this.urlCompare(accessTemplatesUrl, timeout)
        if(url.error) {
            return url
        }

        return {
            error: false,
            description: `Заглавие валидно. Url валиден.`,
        }
    }
}

module.exports = AccessTemplatePage