const BasePage = require('../../../base-page/base-page')
const elements = require('../../../../dictionaries/selenium-elements')
const {accessTemplatesTitle} = require('../../../../dictionaries/title')
const {accessAddTemplateUrl, accessEditTemplateUrl} = require('../../../../dictionaries/url')

class AccessTemplateChangePage extends BasePage {
    constructor() {
        super();
    }

    async initAdd(timeout) {
        const title =  await this.titleCompare(accessTemplatesTitle, timeout)
        if(title.error) {
            return  elementTitle
        }

        const url = await this.urlCompare(accessAddTemplateUrl, timeout)
        if(url.error) {
            return url
        }

        return {error: false, description: `Заглавие валидно. Url валиден.`}
    }

    async initEdit(id, timeout) {
        const title =  await this.titleCompare(accessTemplatesTitle, timeout)
        if(title.error) {
            return  title
        }

        const url = await this.urlCompare(accessEditTemplateUrl + `${id}`, timeout)
        if(url.error) {
            return url
        }

        return {error: false, description: `Заглавие валидно. Url валиден.`}
    }

    async room(name, type, criterion, access, commission, protection, verif, antipass, timeout) {
        console.log(name, type, criterion, access, commission, protection, verif, antipass, timeout)
        console.log(elements.pasAccessTemplateChangeRoomParams(name, type, criterion, access, commission, protection, verif, antipass))
        return await this.xpathElement(elements.pasAccessTemplateChangeRoomParams(name, type, criterion, access, commission, protection, verif, antipass),
            `Отображение помещения ${name} с заданными параметрами`, timeout)
    }

    async roomHandler(name, timeout) {
        return await this.xpathHandler(elements.pasAccessTemplateChangeRoom(name), `Нажатие по помещению ${name}`, timeout)
    }

}

module.exports = AccessTemplateChangePage