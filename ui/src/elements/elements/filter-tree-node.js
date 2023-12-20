const BasePage = require('../../pages/base-page/base-page');
const elements = require('../../dictionaries/selenium-elements');

//Строки
class FilterTreeNode extends BasePage {
    constructor() {
        super();
    }

    //Нажатие чекбокса
    async handler(name, timeout)  {
        return await this.xpathHandler(elements.pwTreeNode(name),
            `Нажатие по строке "${name}".`,
            timeout);
    }
}

module.exports = FilterTreeNode;