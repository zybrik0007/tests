const BasePage = require('../../../base-page/base-page');
const elements = require('../../../../dictionaries/selenium-elements');
const {verificationJournalTitle} = require('../../../../dictionaries/title');
const {verificationJournalUrl} = require('../../../../dictionaries/url');

class VerificationJournalPage extends BasePage {
    async init (timeout) {
        const title =  await this.titleCompare(verificationJournalTitle, timeout)
        if(title.error) {
            return  elementTitle
        }

        const url = await this.urlCompare(verificationJournalUrl, timeout)
        if(url.error) {
            return url
        }

        return {
            error: false,
            description: `Заглавие валидно. Url валиден.`,
        }
    }
}

module.exports = VerificationJournalPage;