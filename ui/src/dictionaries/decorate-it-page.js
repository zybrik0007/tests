const {it} = require('mocha');
const page = require('../pages');
const el = require('../elements');
const dec = require('./decorate');

class DecorateItPage {

    accessTemplate = () => {}

    accessTemplateChange = () => {

        const initAdd = (obj) => it('Отображение страницы добавления шаблона доступа.',
            async () => await dec.simple(page.accessTemplateChange.initAdd,
                [obj.timeout],
                page.accessTemplateChange));

        const roomHandler = ({room, timeout}) => it(``, async () => await dec.simple(page.accessTemplateChange.roomHandler,
            [room, timeout],
            page.accessTemplateChange));

        return {
            initAdd,
            roomHandler
        }
    }
}

module.exports = {
    accessTemplateChange: new DecorateItPage().accessTemplateChange()
}