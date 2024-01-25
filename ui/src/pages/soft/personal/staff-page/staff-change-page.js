const BasePage = require('../../../base-page/base-page')
const elements = require('../../../../dictionaries/selenium-elements')
const {staffTitle} = require('../../../../dictionaries/title')
const {staffAddUrl, staffEditUrl} = require('../../../../dictionaries/url')

//Страница изменения разделе "Персонал", подраздел "Сотрудники"
class StaffChangePage extends BasePage {

    constructor() {
        super();
    }

    // Отображение страницы добавления
    async initAdd(timeout) {
        const elementTitle = await this.titleCompare(staffTitle, timeout)
        if (elementTitle.error) {
            return elementTitle
        }

        const elementUrl = await this.urlCompare(staffAddUrl, timeout)
        if(elementUrl.error) {
            return elementUrl
        }

        return {
            error: false,
            description: 'Заглавие валидно. Url валиден.',
        }
    }

    // Отображение страницы редактирования
    async initEdit(id, timeout) {
        const elementTitle =  await this.titleCompare(staffTitle, timeout)
        if(elementTitle.error) {
            return  elementTitle
        }

        const elementUrl = await this.urlContains(staffEditUrl + `${id}`, timeout)
        if(elementUrl.error) {
            return elementUrl
        }

        return {
            error: false,
            description: `Заглавие валидно. Url валиден.`,
        }
    }

    // Получение значение дополнительной карты по номеру
    async cardAdditionalValue(number, timeout) {
        return await this.xpathGetAttribute(elements.perStaffCardAdditionalInput(number),
            `Получение значения допольниетльной карты ${number}.`,
            'value',
            timeout);
    }

    // Нажатие кнопки добавления дополнительной карты по номеру
    async addCardAdditional(number, timeout) {
        await this.loading(1000);
        return await this.xpathHandler(elements.perStaffCardAdditionalIcon(number, 'Icon--payment_card_outline'),
            `Нажатие кнопки добавление допольниетльной карты ${number}.`,
            timeout);
    }

    // Нажатие кнопки удаления дополнительной карты по номеру
    async deleteCardAdditional(number, timeout) {
        return await this.xpathHandler(elements.perStaffCardAdditionalIcon(number, 'Icon--remove_circle_outline'),
            `Нажатие кнопки удаления допольниетльной карты ${number}.`,
            timeout);
    }

    // Нажатие кнопки замены основной карты по номеру
    async replaceCardAdditional(number, timeout) {
        return await this.xpathHandler(elements.perStaffCardAdditionalIcon(number, 'Icon--sort_horizontal_outline'),
            `Нажатие кнопки замены допольниетльной карты ${number}.`,
            timeout);
    }

    // Нажатие кнопки добавления дополнительной карты
    async addCardButtonHandler(timeout) {
        return await this.xpathHandler(elements.perStaffAddCardButton,
            `Нажатие кнопки добавления.`,
            timeout);
    }

    // Получение значени src у img шрихкода
    async getBarcodeSrc(timeout) {
        return await this.xpathGetAttribute(elements.perStaffBarcodeImg,
            'Получение значения src у img шрихкода',
            'src',
            timeout);
    }

    // Получения значения поля ввода по номеру и заглавию
    async getValueCarInput(title, number, timeout) {
        return await this.xpathGetAttribute(elements.perStaffCarData(title, number),
            `Получение значения поля  ввода ${title} в карточке ТС по номеру ${number}.`,
            'value',
            timeout);
    }

    //Ввод значения поля ввода по номеру и заглавию
    async sendKeysCarInput(title, number, value, timeout) {
        return await this.xpathSendKeys(elements.perStaffCarData(title, number),
            `Ввод значения ${value} поля ввод ${title} в карточке ТС по номеру ${number}.`,
            value,
            timeout);
    }

    //Нажатие кнопки Добавить транспорное средство
    async addCarButton(name, timeout) {
        return await this.xpathHandler(elements.perStaffCarButton(name),
            `Нажатие кнопки "${name}".`,
            timeout);
    }

    //Нажатие кнопки Загурить фотографию
    async addCarImg(name, number, timeout) {
        return await this.xpathHandler(elements.perStaffCarAddImg(name, number),
            `Нажатие кнопки "${name}" в карточки ТС по номеру ${number}`,
            timeout);
    }

    //Отображения тега img в карточке по номеру
    async carImg(number, timeout) {
        return await this.xpathElement(elements.perStaffCarImg(number),
            `Отображение тега img в карточке ТС по номеру ${number}`,
            timeout);
    }

    // Получение значения даты увольнения
    async getDimissedValue(timeout) {
        return await this.xpathGetText(elements.perStaffDimissedValue,
            'Получение значения даты увольнения',
            timeout);
    }

}

module.exports = StaffChangePage