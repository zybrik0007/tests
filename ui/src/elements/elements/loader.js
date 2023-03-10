const BasePage = require('../../pages/base-page/base-page')
const elements = require('../../dictionaries/selenium-elements')

//Элелемент загрузки
class Loader extends BasePage {
    constructor() {
        super();
    }

    //Отсутствие большого лоудера
    async loaderLargeNoElement(timeout) {
        return await this.xpathNoElement(elements.loader('l'),
            'Отсутствие большого лоудера.',
            timeout)
    }

}

module.exports = Loader