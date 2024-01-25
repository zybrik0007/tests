const {it} = require('mocha');
const el = require('../../elements');
const dec = require('../../dictionaries/decorate');
const modalPhoto = require('../../elements/modals/photo');

const photo = (id, title) => {
    const modal = new modalPhoto(id, title);

    const init = ({timeout}) => it(`Отображение модального "Изменение фотографии".`,
        async() => await dec.simple(modal.init,
            [timeout],
            modal));

    const initClose = ({timeout}) => it(`Отсутствие модального окна "Изменение фотографии".`,
        async() => await dec.simple(modal.initClose,
            [timeout],
            modal));

    const addImage =  ({src, timeout}) => it(`Добавление фотографии в модальное окно "Измение фотографии".`,
        async() => await dec.simple(modal.addImage,
            [src, timeout],
            modal));

    const image = ({timeout}) => it(`Отображение изображения в модальном окне "Измение фотографии".`,
        async() => await dec.simple(modal.image,
            [timeout],
            modal));

    const noImage = ({timeout}) => it(`Отсутствие изображения в модальном окне "Измение фотографии".`,
        async() => await dec.simple(modal.noImage,
            [timeout],
            modal));

    return {
        init,
        initClose,
        addImage,
        image,
        noImage
    }
}

module.exports = photo


