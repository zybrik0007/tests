const BasePage = require('../../pages/base-page/base-page')
const elements = require('../../dictionaries/selenium-elements')

class Header extends BasePage {
    constructor() {
        super();
    }

    async profileHandler(timeout) {
        return await this.xpathHandler(elements.headerProfile, 'Нажатие по проофилю в заглавии.', timeout)
    }

    async menu(timeout) {
        return await this.xpathElement(elements.headerMenu, 'Отображение меню профиля в заглавии.', timeout)
    }

    async menuNoElement(timeout) {
        return await this.xpathNoElement(elements.headerMenu, 'Отсутствия отображения меню профиля в заглавии.', timeout)
    }

    async exitHandler(timeout) {
        return await this.xpathHandler(elements.headerMenuItem('Выход'), 'Нажатие "Выход" в заглавии.', timeout)
    }


}

module.exports = Header