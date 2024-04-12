const BasePage = require('../../../base-page/base-page');
const elements = require('../../../../dictionaries/selenium-elements');
const {accessTemplatesTitle} = require('../../../../dictionaries/title');
const {accessTemplateCommissionUrl} = require('../../../../dictionaries/url');

//Страница изменения в "Бюро пропусков", подраздел "Шабалоны доступа", вкладка "Шаблоны доступа"
class AccessTemplateComissionPage extends BasePage {

    constructor() {
        super();
    }

    //Отображение страницы добавления
    async init(timeout) {
        const title =  await this.titleCompare(accessTemplatesTitle, timeout)
        if(title.error) {
            return  elementTitle
        }

        const url = await this.urlCompare(accessTemplateCommissionUrl, timeout)
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

module.exports = AccessTemplateComissionPage