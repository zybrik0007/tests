const Modal = require('../elements/modal');
const elements = require('../../dictionaries/selenium-elements');

class Departments extends Modal {

    constructor(id, title) {
        super();
        this.id = id;
        this.title = title;
        this.titleStaff = 'Сопровождающий';
        this.titleTemplateStaff = 'Шаблон доступа для сотрудника';
        this.titleTemplateUser = 'Шаблон доступа для посетителя';
        this.schedule = 'График работы';
    };

    async initStaff(timeout) {
        const modal = await this.xpathElement(elements.modalId(this.id),
            `Отображение Модального окна "${this.titleStaff}"`,
            timeout);

        if(modal.error) {
            return modal;
        }

        const title = await this.xpathElement(elements.modalTitle(this.titleStaff),
            `Отображение Модального окна "${this.titleStaff}"`,
            timeout);

        if(title.error) {
            return title
        }

        return {
            error: false,
            description: `Модальное окно "${this.titleStaff}" отображается`,
        }
    }

    async initTemplateStaff(timeout) {
        const modal = await this.xpathElement(elements.modalId(this.id),
            `Отображение Модального окна "${this.titleTemplateStaff}"`,
            timeout);

        if(modal.error) {
            return modal;
        }

        const title = await this.xpathElement(elements.modalTitle(this.titleTemplateStaff),
            `Отображение Модального окна "${this.titleTemplateStaff}"`,
            timeout);

        if(title.error) {
            return title
        }

        return {
            error: false,
            description: `Модальное окно "${this.titleTemplateStaff}" отображается`,
        }
    }

    async initTemplateUser(timeout) {
        const modal = await this.xpathElement(elements.modalId(this.id),
            `Отображение Модального окна "${this.titleTemplateUser}"`,
            timeout);

        if(modal.error) {
            return modal;
        }

        const title = await this.xpathElement(elements.modalTitle(this.titleTemplateUser),
            `Отображение Модального окна "${this.titleTemplateUser}"`,
            timeout);

        if(title.error) {
            return title
        }

        return {
            error: false,
            description: `Модальное окно "${this.titleTemplateUser}" отображается`,
        }
    }

    async initSchedule(timeout) {
        const modal = await this.xpathElement(elements.modalId(this.id),
            `Отображение Модального окна "${this.schedule}"`,
            timeout);

        if(modal.error) {
            return modal;
        }

        const title = await this.xpathElement(elements.modalTitle(this.schedule),
            `Отображение Модального окна "${this.schedule}"`,
            timeout);

        if(title.error) {
            return title
        }

        return {
            error: false,
            description: `Модальное окно "${this.schedule}" отображается`,
        }
    }

    async cellHandler(name, timeout) {
        const handler = await this.xpathHandler(elements.pwGroupCell(name),
            `Нажатие по ${name} в списке выбора.`,
            timeout)

        if(handler.error) {
            return handler
        }

        return await this.xpathElement(elements.pwGroupCellChecked(name),
            `Выделен ${name} в списке выбора`,
            timeout)
    }


}

module.exports = Departments;