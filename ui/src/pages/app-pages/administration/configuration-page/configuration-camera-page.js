const BasePage = require('../../../base-page/base-page');
const {templateCameraTITLE} = require('../../../../dictionaries/title');
const {templateCameraURL} = require('../../../../dictionaries/url');

class ConfigurationCameraPage extends BasePage {
    constructor() {
        super();
    }

    //Отображение страницы
    async init(timeout) {
        const title =  await this.titleCompare(templateCameraTITLE, timeout)
        if(title.error) {
            return  elementTitle
        }

        const url = await this.urlCompare(templateCameraURL, timeout)
        if(url.error) {
            return url
        }

        return {
            error: false,
            description: `Заглавие валидно. Url валиден.`,
        }
    }

}

module.exports = ConfigurationCameraPage


