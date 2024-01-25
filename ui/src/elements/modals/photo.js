const Modal = require('../elements/modal');
const elements = require('../../dictionaries/selenium-elements');

class Photo extends Modal {

    constructor(id, title) {
        super();
        this.id = id;
        this.title = title;
    }

    async addImage(src, timeout) {
        return await this.xpathSendKeys(elements.modalChangePhotoInput(this.id),
            'Добавление фотографии в модальное окно "Измение фотографии".',
            src,
            timeout);
    }

    async image(timeout) {
        return await this.xpathElement(elements.modalChangePhotoImg(this.id),
            'Отображение изображения в модальном окне "Измение фотографии".',
            timeout);
    }

    async noImage (timeout) {
        return await this.xpathNoElement(elements.modalChangePhotoImg(this.id),
            'Отсутствие изображения в модальном окне "Измение фотографии".',
            timeout);
    }
}

module.exports = Photo;