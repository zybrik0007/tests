const BasePage = require('../../../base-page/base-page');
const {deviceManagementTitle} = require('../../../../dictionaries/title');
const {deviceManagementUrl} = require('../../../../dictionaries/url');

class DeviceManagementPage extends BasePage {
    async init (timeout) {
        const title =  await this.titleCompare(deviceManagementTitle, timeout)
        if(title.error) {
            return  elementTitle
        }

        const url = await this.urlCompare(deviceManagementUrl, timeout)
        if(url.error) {
            return url
        }

        return {
            error: false,
            description: `Заглавие валидно. Url валиден.`,
        }
    }
}

module.exports = DeviceManagementPage;