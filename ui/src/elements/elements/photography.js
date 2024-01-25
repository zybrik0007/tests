const BasePage = require('../../pages/base-page/base-page');
const elements = require('../../dictionaries/selenium-elements');

//Элемент загрузки фотографии
class Photography extends BasePage {
    constructor() {
        super();
    }

    //Нажатие загрузить фотографию у сотрудника
    async addImage(name, timeout) {
        return await this.xpathHandler(elements.photoAddButton(name),
            `Нажатие кнопки "${name}".`,
            timeout);
    }

    // Отображение фотографии у сотруднкиа
    async imageStaff(timeout) {
        return await this.xpathElement(elements.photoStaff,
            `Отображение тега img.`,
            timeout);
    }

    // Отсутстви фотографии у сотруднкиа
    async noImageStaff(timeout) {
        return await this.xpathNoElement(elements.photoStaff,
            `Отсутствие тега img.`,
            timeout);
    }

    //Нажатие загрузить фотографию у допольнительного поля
    async addImageAdditional(name, number, timeout) {
        return await this.xpathHandler(elements.photoAdditional(number, name),
            `Нажатие кнопки "${name}" в дполнительном поле по номеру ${number}.`,
            timeout);
    }

    // Отображение фотографии у допольнительного поля
    async imageAdditional(number, timeout) {
        return await this.xpathElement(elements.photoAdditionalImage(number),
            `Отображение тега img в дполнительном поле по номеру ${number}.`,
            timeout);
    }

    // Отсутстви фотографии у допольнительного поля
    async noImageAdditional(number, timeout) {
        return await this.xpathNoElement(elements.photoAdditionalImage(number),
            `Отсутствие тега img в дполнительном поле по номеру ${number}.`,
            timeout);
    }

    //Получение назавани ядополниетльного поля
    async getAdditionalName (number, timeout) {
        return await this.xpathGetText(elements.photoAdditionalName(number),
            `Получение значения названия допонительного поля по номеру ${number}.`,
            timeout);
    }
}

module.exports = Photography