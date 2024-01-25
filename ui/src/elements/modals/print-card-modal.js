const Modal = require('../elements/modal');
const elements = require('../../dictionaries/selenium-elements');

class PrintCardModal extends Modal {

    constructor(id, title) {
        super();
        this.id = id;
        this.title = title;
    }

    async lastName(title, name, timeout) {
        console.log(elements.perStaffPrintCardLast(`${title}: ${name}`));
        return await this.xpathElement(elements.perStaffPrintCardLast(`${title}: ${name}`),
            `Отображение ${title}: ${name}.`,
            timeout);
    }

    async noLastName(title, name, timeout) {
        return await this.xpathNoElement(elements.perStaffPrintCardLast(`${title}: ${name}`),
            `Отсутствие ${title}: ${name}.`,
            timeout);
    }
}

module.exports = PrintCardModal;