const {it} = require('mocha');
const page = require('../pages');
const el = require('../elements');
const dec = require('./decorate');

class DecorateItElement {

    butIcBefore = () => {

        const handler = (obj) => it(`Нажатие кнопки "${obj.button.description}"`,
            async () => await dec.simple(el.butIcBefore.handler,
                [obj.button, obj.timeout],
                el.butIcBefore));

        return {
            handler
        }
    }

    selectMulti = () => {

        const iconXpandSelected = (obj) => it(`Выбор в поле выбора "${obj.title}" значение "${obj.value}".`,
            async() => await dec.simple(el.selectMulti.iconXpandSelected,
                [obj.title, obj.value, obj.timeout],
                el.selectMulti));

        const getText = (obj) => it(`Отображение в поле выбора "${obj.title}" значение "${obj.value}".`,
            async () => await dec.simpleText(el.selectMulti.getText,
            [obj.title, obj.value, obj.timeout],
            obj.text,
            obj.timeout));


        return {
            iconXpandSelected,
            getText
        }
    }

    input = () => {

        const sendKeys = ({title, placeholder, value, timeout}) => it(`Ввод в "${title}" значение "${value}".`,
            async () => await  dec.simple(el.input.sendKeys,
                [title, placeholder, value, timeout],
                el.input));

        return {
            sendKeys
        }
    }
}

const decorateItElementClass = new DecorateItElement();

module.exports = {
    selectMulti: new DecorateItElement().selectMulti(),
    butIcBefore: new DecorateItElement().butIcBefore(),
    input: new DecorateItElement().input()
}