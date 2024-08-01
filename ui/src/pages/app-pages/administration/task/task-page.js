const BasePage = require('../../../base-page/base-page');
const elements = require('../../../../dictionaries/selenium-elements');
const {taskTITLE} = require('../../../../dictionaries/title');
const {taskURL} = require('../../../../dictionaries/url');

class TaskPage extends BasePage {
    constructor() {
        super();
    }

    //Отображение страницы
    async init(timeout) {
        const title =  await this.titleCompare(taskTITLE, timeout);
        if(title.error) {
            return title;
        }

        const url = await this.urlCompare(taskURL, timeout);
        if(url.error) {
            return url;
        }

        return {
            error: false,
            description: `Заглавие валидно. Url валиден.`,
        }
    }

}

module.exports = TaskPage;


