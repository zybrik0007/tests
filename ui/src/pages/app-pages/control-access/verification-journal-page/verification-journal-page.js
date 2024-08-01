const BasePage = require('../../../base-page/base-page');
const {verificationJournalTITLE} = require('../../../../dictionaries/title');
const {verificationJournalURL} = require('../../../../dictionaries/url');

class VerificationJournalPage extends BasePage {
    async init (timeout) {
        const title =  await this.titleCompare(verificationJournalTITLE, timeout)
        if(title.error) {
            return  elementTitle
        }

        const url = await this.urlCompare(verificationJournalURL, timeout)
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