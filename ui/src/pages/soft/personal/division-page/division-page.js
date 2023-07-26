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
    };

    //Нажатие по подразделению
    async handler(arr, timeout) {
        return await this.xpathHandler(elements.perDivisionTree(arr),
            `Нажатие по подразделению ${arr[arr.length - 1]}.`,
            timeout)
    };

    async selected(division, timeout) {
        const select = await this.xpathElement(elements.perDivisionSelected(division),
            `Подразделение ${division} выделено.`,
            timeout);
        await this.loading(1000)
        return select;
    };

    async size(count, timeout) {
        return await this.xpathList(elements.perDivisionList,
            `Отображение ${count} подразделения.`,
            count,
            timeout)
    };

    //Отсутствие подразделения
    async noElement(arr, timeout) {
        return await this.xpathNoElement(elements.perDivisionTree(arr),
            `Отсутствие подразделения ${arr[arr.length - 1]}.`,
            timeout)
    };

    // Нажатие по минусу у полразделения
    async minus(name, timeout) {
        const handler = await this.xpathHandler(elements.perDivisionIcon(name, 'Icon--minus'),
            `Скрытие дочерних подразделений у подразделения ${name}`,
            timeout);
        await this.loading(1000);
        return handler;
    }

    // Нажатие по плюсу у полразделения
    async plus(name, timeout) {
        const handler = await this.xpathHandler(elements.perDivisionIcon(name, 'Icon--add_outline'),
            `Открытие дочерних подразделений у подразделения ${name}`,
            timeout);
        await this.loading(1000);
        return handler;
    }

}

module.exports = DivisionPage