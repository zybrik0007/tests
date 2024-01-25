const {it} = require('mocha');
const page = require('../../pages');
const dec = require('../../dictionaries/decorate');

module.exports = {
    initAdd: ({timeout}) => it('Проверка заглавия и url.', async () => await dec.simple(page.staffChange.initAdd,
        [timeout],
        page.staffChange)),

    initEdit: ({timeout}) => it('Проверка заглавия и url.', async () => await dec.simple(page.staffChange.initEdit,
        ['', timeout],
        page.staffChange)),

    getValueCard: ({cardNumber, value, timeout}) => it(`Значение дополнительной карты ${cardNumber} 
    равно "${value}".`,
        async () => await dec.simpleText(page.staffChange.cardAdditionalValue,
            [cardNumber, timeout],
            value,
            page.staffChange)),

    addCardAdditional: ({cardNumber, timeout}) => it(`Нажатие кнопки добавление допольниетльной карты в дополнительной 
    карте ${cardNumber}.`,
        async () => await dec.simple(page.staffChange.addCardAdditional,
            [cardNumber, timeout],
            page.staffChange)),

    deleteCardAdditional: ({cardNumber, timeout}) => it(`Нажатие кнопки удаления допольнительной карты ${cardNumber}.`,
        async () => await dec.simple(page.staffChange.deleteCardAdditional,
            [cardNumber, timeout],
            page.staffChange)),

    replaceCardAdditional: ({cardNumber, timeout}) => it(`Нажатие кнопки замены допольнительной карты ${cardNumber} 
    на основную.`,
        async () => await dec.simple(page.staffChange.replaceCardAdditional,
            [cardNumber, timeout],
            page.staffChange)),

    addCardButtonHandler: ({timeout}) => it(`Нажатие кнопки "Добавить карту".`,
        async () => await dec.simple(page.staffChange.addCardButtonHandler,
            [timeout],
            page.staffChange)),

    getValueCarInput: ({title, number, value, timeout}) => it(`${title} в карточке TC ${number} равно "${value}".`,
        async () => await dec.simpleText(page.staffChange.getValueCarInput,
            [title, number, timeout],
            value,
            page.staffChange)),

    sendKeysCarInput: ({title, number, value, timeout}) => it(`Ввод "${value}" в ${title} в карточке TC ${number}.`,
        async () => await dec.simple(page.staffChange.sendKeysCarInput,
            [title, number, value, timeout],
            page.staffChange)),

    addCarButton: ({name, timeout}) => it(`Нажатие кнопки "${name}".`,
        async () => await dec.simple(page.staffChange.addCarButton,
            [name, timeout],
            page.staffChange)),

    addCarImg: ({name, number, timeout}) => it(`Нажатие кнопки "${name}" в карточки ТС ${number}.`,
        async () => await dec.simple(page.staffChange.addCarImg,
            [name, number, timeout],
            page.staffChange)),

    сarImg: ({number, timeout}) => it(`Отображение тега img в карточке ТС ${number}.`,
        async () => await dec.simple(page.staffChange.carImg,
            [number, timeout],
            page.staffChange)),

    getDimissedValue: ({value, timeout}) => it(`В заглавии карточки уволенного сотрудника отображается дата "${value}".`,
        async () => await dec.simpleText(page.staffChange.getDimissedValue,
            [timeout],
            value,
            page.staffChange)),
}