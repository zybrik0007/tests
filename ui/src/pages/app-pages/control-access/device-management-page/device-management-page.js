const BasePage = require('../../../base-page/base-page');
const {deviceManagementTITLE} = require('../../../../dictionaries/title');
const {deviceManagementURL} = require('../../../../dictionaries/url');

class DeviceManagementPage extends BasePage {
    async init (timeout) {
        const title =  await this.titleCompare(deviceManagementTITLE, timeout)
        if(title.error) {
            return  elementTitle
        }

        const url = await this.urlCompare(deviceManagementURL, timeout)
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