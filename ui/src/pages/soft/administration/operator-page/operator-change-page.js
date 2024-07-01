const BasePage = require('../../../base-page/base-page');
const elements = require('../../../../dictionaries/selenium-elements');
const {operatorTitle} = require('../../../../dictionaries/title');
const {operatorAddUrl, operatorEditUrl, operatorCopyUrl} = require('../../../../dictionaries/url');

class OperatorChangePage extends BasePage {

    constructor() {
        super();
    }

    //Отображение страницы
    async initAdd(timeout) {
        const title =  await this.titleCompare(operatorTitle, timeout);
        if(title.error) {
            return title;
        }

        const url = await this.urlCompare(operatorAddUrl, timeout);
        if(url.error) {
            return url;
        }

        return {
            error: false,
            description: `Заглавие валидно. Url валиден.`,
        }
    }

    async initEdit(timeout) {
        const title =  await this.titleCompare(operatorTitle, timeout);
        if(title.error) {
            return title;
        }

        const url = await this.urlContains(operatorEditUrl, timeout);
        if(url.error) {
            return url;
        }

        return {
            error: false,
            description: `Заглавие валидно. Url валиден.`,
        }
    }

    async initCopy(timeout) {
        const title =  await this.titleCompare(operatorTitle, timeout);
        if(title.error) {
            return title;
        }

        const url = await this.urlCompare(operatorCopyUrl, timeout);
        if(url.error) {
            return url;
        }

        return {
            error: false,
            description: `Заглавие валидно. Url валиден.`,
        }
    }

    async hideShow(section, timeout) {
        return await this.xpathHandler(elements.operatorHideShow(section),
            `Показать / скрыть пдразделы в разделе "${section}".`,
            timeout);
    }

    async sectionCheckboxHandler(section, timeout) {
        return await this.xpathHandler(elements.operatorSectionCheckbox(section),
            `Нажатие по чекбоксу раздела "${section}".`,
            timeout);
    }

    async sectionChecked(section, timeout) {
        return await this.xpathElement(elements.operatorSectionChecked(section),
            `Чекбокс раздела "${section}" нажат.`,
            timeout);
    }

    async sectionUnchecked(section, timeout) {
        return await this.xpathElement(elements.operatorSectionUnchecked(section),
            `Чекбокс раздела "${section}" не нажат.`,
            timeout);
    }

    async subsectionCheckboxHandler(section, subsection, timeout) {
        return await this.xpathHandler(elements.operatorSubsectionCheckbox(section, subsection),
            `Нажатие по чекбоксу пораздела "${subsection}" в разделе "${section}".`,
            timeout);
    }

    async subsectionChecked(section, subsection, timeout) {
        return await this.xpathElement(elements.operatorSubsectionChecked(section, subsection),
            `Чекбокс пораздела "${subsection}" в разделе "${section}" нажат.`,
            timeout);
    }

    async subsectionUnchecked(section, subsection, timeout) {
        return await this.xpathElement(elements.operatorSubsectionChecked(section, subsection),
            `Чекбокс пораздела "${subsection}" в разделе "${section}" не нажат.`,
            timeout);
    }
}

module.exports = OperatorChangePage;


