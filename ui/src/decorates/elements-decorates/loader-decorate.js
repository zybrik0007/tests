const {it} = require('mocha');
const el = require('../../elements');
const dec = require('../../dictionaries/decorate');


module.exports = {
    loaderLargeNoElement: ({timeout}) => it(`Отсутствие большого лоудера.`,
        async () => await dec.simple(el.loader.loaderLargeNoElement,
            [timeout],
            el.loader)),
}
