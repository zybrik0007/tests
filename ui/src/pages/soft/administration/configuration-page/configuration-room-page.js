const BasePage = require('../../../base-page/base-page')
const elements = require('../../../../dictionaries/selenium-elements')
const {roomsTitle} = require('../../../../dictionaries/title')
const {roomUrl} = require('../../../../dictionaries/url')

//Страница раздел "Администрирование", подраздел "Конфигурация", вкладка "Помещения"
class Rooms extends BasePage {
    constructor() {
        super();
    }

    //Отображение страницы
    async init(timeout) {
        const title =  await this.titleCompare(roomsTitle, timeout)
        if(title.error) {
            return  elementTitle
        }

        const url = await this.urlCompare(roomUrl, timeout)
        if(url.error) {
            return url
        }

        return {
            error: false,
            description: `Заглавие валидно. Url валиден.`,
        }
    }

    //Отображение помещения
    async room(arr, timeout) {
        return await this.xpathElement(elements.room(arr),
            `Отображение помещения "${arr[arr.length - 1]}".`,
            timeout);
    }

    async noRoom(arr, timeout) {
        return await this.xpathNoElement(elements.room(arr),
            `Отсутсвие помещения "${arr[arr.length - 1]}".`,
            timeout);
    }

    async device(arr, timeout) {
        console.log(elements.roomDevice(arr) + elements.admDevice(arr[arr.length - 2], arr[arr.length - 1]));
        return await this.xpathElement(elements.roomDevice(arr) +
            elements.admDevice(arr[arr.length - 2], arr[arr.length - 1]),
            `Отображение устройства "${arr[arr.length - 2]} - ${arr[arr.length - 1]}" 
            в помещении "${arr[arr.length - 3]}".`,
            timeout);
    }

    async noDevice(arr, timeout) {
        return await this.xpathNoElement(elements.roomDevice(arr) +
            elements.admDevice(arr[arr.length - 2], arr[arr.length - 1]),
            `Отсутсвие устройства "${arr[arr.length - 2]} - ${arr[arr.length - 1]}" 
            в помещении "${arr[arr.length - 3]}".`,
            timeout);
    }

    async roomHandler(arr, timeout) {
        return await this.xpathHandler(elements.room(arr),
            `Нажатие по помещению "${arr[arr.length - 1]}".`,
            timeout);
    }
}

module.exports = Rooms


