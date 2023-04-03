const BasePage = require('../../pages/base-page/base-page')
const elements = require('../../dictionaries/selenium-elements')

//Заглавие страницы
class Header extends BasePage {
    constructor() {
        super();
    }

    //Нажатие по профилю
    async profileHandler(timeout) {
        return await this.xpathHandler(elements.headerProfile,
            'Нажатие по проофилю в заглавии.',
            timeout)
    }

    //Отображение меню профиля
    async menu(timeout) {
        return await this.xpathElement(elements.headerMenu,
            'Отображение меню профиля в заглавии.',
            timeout)
    }

    //Отсуствие меню профиля
    async menuNoElement(timeout) {
        return await this.xpathNoElement(elements.headerMenu,
            'Отсутствия отображения меню профиля в заглавии.',
            timeout)
    }

    //Нажатие Выхода
    async exitHandler(timeout) {
        return await this.xpathHandler(elements.headerMenuItem('Выход'),
            'Нажатие "Выход" в заглавии.',
            timeout)
    }

    //Получение значения текста в заглавии
    async getText(timeout) {
        return await this.xpathGetText(elements.headerText,
            'Получение значения текста в заглавии.',
            timeout)
    }

    async userGetText(timeout) {
        return await this.xpathGetText(elements.headerProfile,
            'Получение значения имени пользотваеля в заглавии.',
            timeout)
    }



}

module.exports = Header