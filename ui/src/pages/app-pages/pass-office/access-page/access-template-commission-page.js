const BasePage = require('../../../base-page/base-page');
const elements = require('../../../../dictionaries/selenium-elements');
const {accessTemplatesTITLE} = require('../../../../dictionaries/title');
const {accessTemplateCommissionURL} = require('../../../../dictionaries/url');

//Страница изменения в "Бюро пропусков", подраздел "Шабалоны доступа", вкладка "Шаблоны доступа"
class AccessTemplateCommissionPage extends BasePage {

    constructor() {
        super();
    }

    //Отображение страницы добавления
    async init(timeout) {
        const title =  await this.titleCompare(accessTemplatesTITLE, timeout)
        if(title.error) {
            return  elementTitle
        }

        const url = await this.urlCompare(accessTemplateCommissionURL, timeout)
        if(url.error) {
            return url
        }

        return {
            error: false,
            description: `Заглавие валидно. Url валиден.`,
        }
    }

    async room(room, timeout) {
        return await this.xpathElement(elements.passAccessRoom(room),
            `Отображения помещения "${room}"`,
            timeout)
    }

    async roomHandler(room, timeout) {
        return await this.xpathHandler(elements.passAccessRoom(room),
            `Нажатие по помещению "${room}"`,
            timeout)
    }



}

module.exports = AccessTemplateCommissionPage