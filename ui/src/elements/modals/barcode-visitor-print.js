const Modal = require('../elements/modal');
const elements = require('../../dictionaries/selenium-elements');

class BarcodeVisitorPrint extends Modal{

    constructor(id, title) {
        super();
        this.id = id;
        this.title = title;
    }

    async data(title, number, timeout) {
        const titleText = await this.xpathGetText(elements.modalPrintVisitorBarcodeName(number),
            `Получение заглавия текста в информации по номеру ${number}.`,
            timeout);
        if(titleText.text.trim() !== title) {
            return {
                error: true,
                description: `Заглавие текста в информации по номеру ${number} не равно ${title}`,
                text: ''
            }
        }
        return await this.xpathGetText(elements.modalPrintVisitorBarcodeValue(number),
            `Получение текста в информации по номеру ${number}.`,
            timeout);
    }

}

module.exports = BarcodeVisitorPrint