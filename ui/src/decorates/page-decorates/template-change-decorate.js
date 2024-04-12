const {it} = require('mocha');
const page = require('../../pages');
const dec = require('../../dictionaries/decorate');

module.exports = {
    room: ({name, type, criterion, access, commission, protection, verif, antipass, timeout}) =>
        it(`Отображения строки помещения с названием "${name}" и параметрам: Тип критерия доступа - "${type}",
        Критерий доступа = "${criterion}", Тип доступа - "${access}", Комиссионирование - "${commission}",
        Охрана - "${protection}", Верификация - "${verif}", Антипасс - "${antipass}"`,
            async () => await dec.simple(page.accessTemplateChange.room,
        [name, type, criterion, access, commission, protection, verif, antipass, timeout],
        page.accessTemplateChange)),

    roomHandler: ({name, timeout}) => it(`Нажатие по помещению "${name}"`,
        async () => await dec.simple(page.accessTemplateChange.roomHandler,
            [name, timeout],
        page.accessTemplateChange))
}