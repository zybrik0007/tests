const BasePage = require('../../pages/base-page/base-page')
const elements = require('../../dictionaries/selenium-elements')

class Loader extends BasePage {
    constructor() {
        super();
    }

    async loaderLargeNoElement(timeout) {
        return await this.xpathNoElement(elements.loader('l'), 'Отсутствие большого лоудера.', timeout)
    }

}

module.exports = Loader