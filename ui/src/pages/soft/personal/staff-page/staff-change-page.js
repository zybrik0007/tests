const BasePage = require('../../../base-page/base-page')
const elements = require('../../../../dictionaries/selenium-elements')
const {staffTitle} = require('../../../../dictionaries/title')
const {staffAddUrl, staffEditUrl} = require('../../../../dictionaries/url')

class StaffChangePage extends BasePage {
    constructor() {
        super();
    }

    async initAdd(timeout) {
        const elementTitle = await this.titleCompare(staffTitle, timeout)
        if (elementTitle.error) {
            return elementTitle
        }

        const elementUrl = await this.urlCompare(staffAddUrl, timeout)
        if(elementUrl.error) {
            return elementUrl
        }

        return {
            error: false,
            description: 'Заглавие валидно. Url валиден.'
        }
    }

    async initEdit(id, timeout) {
        const elementTitle =  await this.titleCompare(staffTitle, timeout)
        if(elementTitle.error) {
            return  elementTitle
        }

        const elementUrl = await this.urlCompare(staffEditUrl + `${id}`, timeout)
        if(elementUrl.error) {
            return elementUrl
        }

        return {error: false, description: `Заглавие валидно. Url валиден.`}
    }
}

module.exports = StaffChangePage