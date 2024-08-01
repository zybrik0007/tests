const BasePage = require('../../pages/base-page/base-page')
const element = require('../../dictionaries/selenium-elements')

//Прдразделы
class Subsection extends BasePage {

    constructor() {
        super();
    }

    //Отображение подраздела
    async subsection(subsection, timeout) {
        //await this.loading(1000);
        return await this.xpathElement(element.subsection(subsection.url),
            `Отображение подраздела "${subsection.description}".`,
            timeout)
    }

    //Отображение активного подраздела
    async active(subsection, timeout) {
        //await this.loading(1000);
        return await this.xpathElement(element.subsectionActive(subsection.url),
            `Подраздел "${subsection.description}" активен.`,
            timeout)
    }

    //Нажатие кнопки подраздела
    async handler(subsection, timeout) {
        //await this.loading(1000);
        return  await this.xpathHandler(element.subsection(subsection.url),
            `Нажатие подраздела "${subsection.description}".`,
            timeout)
    }

    //Отсутствие подраздела
    async noElement(subsection, timeout) {
        //await this.loading(1000);
        return await this.xpathNoElement(element.subsection(subsection.url),
            `Отсутствие подраздела "${subsection.description}".`,
            timeout)
    }

    //Получение значения текста в заглавии навигации
    async headerGetText(timeout) {
        //await this.loading(1000);
        return await this.xpathGetText(element.subsectionHeader(),
            'Получение значения заглавия в навигации подразделов.',
            timeout)
    }
}

module.exports = Subsection