const BasePage = require('../../../base-page/base-page');
const elements = require('../../../../dictionaries/selenium-elements');
const {licenseTITLE} = require('../../../../dictionaries/title');
const {licenseURL} = require('../../../../dictionaries/url');

//Страница раздел "Администрирование", подраздел "Лицензии"
class LicensePage extends BasePage {

    constructor() {
        super();
    }

    //Отображение страницы
    async init(timeout) {
        const title =  await this.titleCompare(licenseTITLE, timeout);
        if(title.error) {
            return title;
        }

        const url = await this.urlCompare(licenseURL, timeout);
        if(url.error) {
            return url;
        }

        return {
            error: false,
            description: `Заглавие валидно. Url валиден.`,
        }
    }

    async headerText(number, timeout) {
        return await this.xpathGetText(elements.licenseHeader(number),
            `Получение значения заглавия лицензии с порядковым номером ${number}.`,
            timeout);
    }

    async contentText(number, timeout) {
        return await this.xpathGetText(elements.licenseContent(number),
            `Получение значения пользовательского описания лицензии с порядковым номером ${number}.`,
            timeout);
    }

    async checkedText(number, value, timeout) {
        console.log(elements.licenseChecked(number, value))
        return await this.xpathElement(elements.licenseChecked(number, value),
            `Проверка значения проверки лицензии с порядковым номером ${number}.`,
            timeout);
    }

    async uncheckedText(number, timeout) {
        return await this.xpathNoElement(elements.licenseUnchecked(number),
            `Отсустствия значения проверки лицензии с порядковым номером ${number}.`,
            timeout);
    }

    async detailHandler(number,timeout) {
        return await this.xpathHandler(elements.licenseDetail(number),
            `Нажатия "Подробнее" у лицензии с порядковым номером ${number}.`,
            timeout);
    }

    async enterKeyTextHandler(number,timeout) {
        return await this.xpathHandler(elements.licenseKey(number),
            `Нажатия "Ввести лицензионный ключ" у лицензии с порядковым номером ${number}.`,
            timeout);
    }

    async turnHandler(number,timeout) {
        return await this.xpathHandler(elements.licenseTurn(number),
            `Нажатия переключателя включения / выключения лицензии с порядковым номером ${number}.`,
            timeout);
    }

    async viewText(timeout) {
        return await this.xpathGetText(elements.licenseView,
            `Получение значения описания лицензии.`,
            timeout);
    }

}

module.exports = LicensePage;