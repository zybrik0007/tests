const BasePage = require('../../../base-page/base-page')
const elements = require('../../../../dictionaries/selenium-elements')
const {divisionsTitle} = require('../../../../dictionaries/title')
const {divisionsUrl} = require('../../../../dictionaries/url')

//Страница разделе "Персонал", подраздел "Подразделения"
class DivisionPage extends BasePage {
    constructor() {
        super();
    }

    //Отображение страницы
    async init(timeout) {
        const elementTitle = await this.titleCompare(divisionsTitle, timeout)
        if (elementTitle.error) {
            return elementTitle
        }

        const elementUrl = await this.urlCompare(divisionsUrl, timeout)
        if(elementUrl.error) {
            return elementUrl
        }

        return {
            error: false,
            description: 'Заглавие валидно. Url валиден.',
        }
    }

    //Отображения подразделения
    async division(arr, timeout) {
        return await this.xpathElement(elements.perDivisionTree(arr),
            `Отображения подразделения ${arr[arr.length - 1]}.`,
            timeout)
    }

    //Нажатие по подразделению
    async handler(arr, timeout) {
        return await this.xpathHandler(elements.perDivisionTree(arr),
            `Нажатие по подразделению ${arr[arr.length - 1]}.`,
            timeout)
    }

    //Отсутствие подразделения
    async noElement(arr, timeout) {
        return await this.xpathNoElement(elements.perDivisionTree(arr),
            `Отсутствие подразделения ${arr[arr.length - 1]}.`,
            timeout)
    }

}

module.exports = DivisionPage