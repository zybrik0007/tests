const BasePage = require('../../../base-page/base-page');
const elements = require('../../../../dictionaries/selenium-elements');
const {taskTitle} = require('../../../../dictionaries/title');
const {taskUrlAdd, taskUrlEdit} = require('../../../../dictionaries/url');


class TaskChangePage extends BasePage {

    constructor() {
        super();
    }

    //Отображение страницы
    async initAdd(timeout) {
        const title =  await this.titleCompare(taskTitle, timeout);
        if(title.error) {
            return title;
        }

        const url = await this.urlCompare(taskUrlAdd, timeout);
        if(url.error) {
            return url;
        }

        return {
            error: false,
            description: `Заглавие валидно. Url валиден.`,
        }
    }

    //Отображение страницы
    async initEdit(timeout) {
        const title =  await this.titleCompare(taskTitle, timeout);
        if(title.error) {
            return title;
        }

        const url = await this.urlContains(taskUrlEdit, timeout);
        if(url.error) {
            return url;
        }

        return {
            error: false,
            description: `Заглавие валидно. Url валиден.`,
        }
    }

    async dayHandler(day, timeout) {
        return await this.xpathHandler(elements.taskDay(day),
            `Нажатие по дню "${day}".`,
            timeout);
    }

    async dayNoActive(day, timeout) {
        return await this.xpathElement(elements.taskDayNoActive(day),
            `День "${day}" не выбран.`,
            timeout);
    }

    async dayActive(day, timeout) {
        return await this.xpathElement(elements.taskDayActive(day),
            `День "${day}"  выбран.`,
            timeout);
    }

    async actionSelectedGetText(number, timeout) {
        return await this.xpathGetText(elements.taskActionSelectedGetText(number),
            `Получение значения выбранного действия с порядковым номером ${number}.`,
            timeout);
    }

    async actionSelectedDelete(number, timeout) {
        return await this.xpathHandler(elements.taskActionSelectedDelete(number),
            `Удаление значения выбранного действия с порядковым номером ${number}.`,
            timeout);
    }

    async actionHandler(name, timeout) {
        return await this.xpathHandler(elements.taskActionHandler(name),
            `Выбор "${name}" в списке Добавить действия.`,
            timeout);
    }

}

module.exports = TaskChangePage;


