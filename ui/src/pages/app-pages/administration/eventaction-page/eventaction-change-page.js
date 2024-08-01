const BasePage = require('../../../base-page/base-page');
const elements = require('../../../../dictionaries/selenium-elements');
const {eventactionTITLE} = require('../../../../dictionaries/title');
const {eventactionAddURL, eventactionEditURL} = require('../../../../dictionaries/url');

class EventactionChangePage extends BasePage {

    constructor() {
        super();
    }

    //Отображение страницы
    async initAdd(timeout) {
        const title =  await this.titleCompare(eventactionTITLE, timeout);
        if(title.error) {
            return title;
        }

        const url = await this.urlCompare(eventactionAddURL, timeout);
        if(url.error) {
            return url;
        }

        return {
            error: false,
            description: `Заглавие валидно. Url валиден.`,
        }
    }

    async initEdit(timeout) {
        const title =  await this.titleCompare(eventactionTITLE, timeout);
        if(title.error) {
            return title;
        }

        const url = await this.urlCompare(eventactionEditURL, timeout);
        if(url.error) {
            return url;
        }

        return {
            error: false,
            description: `Заглавие валидно. Url валиден.`,
        }
    }

    async addCondition(icon, timeout) {
        console.log('//div[@class="col-sm-6"][1]' + elements.buttonIconBefore(icon.name))
        return await this.xpathHandler('//div[@class="col-sm-6"][1]' + elements.buttonIconBefore(icon.name),
            'Нажатие кнопки Добавить условие.',
            timeout);
    }

    async addAction(icon, timeout) {
        return await this.xpathHandler('//div[@class="col-sm-6"][2]' + elements.buttonIconBefore(icon.name),
            'Нажатие кнопки Добавить действие.',
            timeout);
    }

    async deleteCondition(icon, num, timeout) {
        return await this.xpathHandler(`//div[@class="col-sm-6"][1]//div[@class="ng-scroll-content"]/div[${num}]`
            + elements.buttonIconBefore(icon),
            `Удаление условия ${num}.`,
            timeout);
    }

    async deleteAction(icon, num, timeout) {
        return await this.xpathHandler(`//div[@class="col-sm-6"][2]//div[@class="ng-scroll-content"]/div[${num}]`
            + elements.buttonIconBefore(icon),
            `Удаление действия ${num}.`,
            timeout);
    }

    async conditionColumnName(timeout) {
        return await this.xpathGetText('//div[@class="col-sm-6"][1]//pw-title',
            'Получение названия колонки Условия.',
            timeout);
    }

    async actionColumnName(timeout) {
        return await this.xpathGetText('//div[@class="col-sm-6"][2]//pw-title',
            'Получение названия колонки Действие.',
            timeout);
    }

    async conditionTitle(num, timeout) {
        return await this.xpathGetText(`//div[@class="col-sm-6"][1]//div[@class="ng-scroll-content"]
            /div[${num}]//div[@class="actionItem__title"]`,
            `Получение названия заглавия условия ${num}.`,
            timeout);
    }

    async actionTitle(num, timeout) {
        return await this.xpathGetText(`//div[@class="col-sm-6"][2]//div[@class="ng-scroll-content"]
            /div[${num}]//div[@class="actionItem__title"]`,
            `Получение названия заглавия действия ${num}.`,
            timeout);
    }

    async conditionName(num, timeout) {
        return await this.xpathGetText(`//div[@class="col-sm-6"][1]//div[@class="ng-scroll-content"]
            /div[${num}]//div[@class="actionItem__text"]`,
            `Получение описания условия ${num}.`,
            timeout);
    }

    async actionName(num, timeout) {
        return await this.xpathGetText(`//div[@class="col-sm-6"][2]//div[@class="ng-scroll-content"]
            /div[${num}]//div[@class="actionItem__text"]`,
            `Получение описания действия ${num}.`,
            timeout);
    }

}

module.exports = EventactionChangePage;


