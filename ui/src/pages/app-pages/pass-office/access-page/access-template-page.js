const BasePage = require('../../../base-page/base-page')
const {accessTemplatesTITLE} = require('../../../../dictionaries/title')
const {accessTemplatesURL} = require('../../../../dictionaries/url')

//Страница разделе "Бюро пропусков", подраздел "Шабалоны доступа", вкладка "Шаблоны доступа"
class AccessTemplatePage extends BasePage {

    constructor() {
        super();
    }

    //Отображение страницы
    async init(timeout) {
        const title =  await this.titleCompare(accessTemplatesTITLE, timeout)
        if(title.error) {
            return title
        }

        const url = await this.urlCompare(accessTemplatesURL, timeout)
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