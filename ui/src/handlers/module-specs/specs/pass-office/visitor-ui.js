const {describe, it, before, after} = require('mocha');
const {expect} = require('chai');

const entry = require('../../../../../../entry');
const page = require('../../../../pages');
const el = require('../../../../elements');
const dec = require('../../../../dictionaries/decorate');
const sec = require('../../../../dictionaries/section');
const sub = require('../../../../dictionaries/subsection');
const but = require('../../../../dictionaries/button-icon');
const icon = require('../../../../dictionaries/icon');
const api = require('../../../other/api');
const imp = require('../../../../upload-files');
const deleteData = require('../../../other/deleteData');
const oth = require('../../../other/other');
const decItApi = require('../../../../dictionaries/decorate-it-api');
const decorate = require('../../../../decorates');
const db = require('../../../../database');
const data = require('../../data').dataVisitor;

const befOrdered = () => before('Вход и открытие подраздела "Посетители" вкладка "Заказанные"', async () => {
    await page.base.loading(entry.sleep1);
    await dec.auth(entry.customLogin, entry.customPassword);
    await dec.simple(el.section.handler, [sec.pas, entry.max], el.section);
    await dec.simple(el.subsection.handler, [sub.pas.visitor, entry.max], el.subsection);
    await dec.simple(el.tab.handler, ['Заказанные', entry.max], el.tab);
    await dec.simple(page.visitorOrdered.init, [entry.max], page.visitorOrdered);
    await page.base.loading(entry.sleep1);
});

const befActive = () => before('Вход и открытие подраздела "Посетители" вкладка "Действующие"', async () => {
    await page.base.loading(entry.sleep1);
    await dec.auth(entry.customLogin, entry.customPassword);
    await dec.simple(el.section.handler, [sec.pas, entry.max], el.section);
    await dec.simple(el.subsection.handler, [sub.pas.visitor, entry.max], el.subsection);
    await dec.simple(el.tab.handler, ['Действующие', entry.max], el.tab);
    await dec.simple(page.visitorCurrent.init, [entry.max], page.visitorCurrent);
    await page.base.loading(entry.sleep1);
});

const befArchive = () => before('Вход и открытие подраздела "Посетители" вкладка "Архив"', async () => {
    await page.base.loading(entry.sleep1);
    await dec.auth(entry.customLogin, entry.customPassword);
    await dec.simple(el.section.handler, [sec.pas, entry.max], el.section);
    await dec.simple(el.subsection.handler, [sub.pas.visitor, entry.max], el.subsection);
    await dec.simple(el.tab.handler, ['Архив', entry.max], el.tab);
    await dec.simple(page.visitorArchive.init, [entry.max], page.visitorArchive);
    await page.base.loading(entry.sleep1);
});

const befPassOrder = () => before('Вход и открытие подраздела "Заказ пропуска" вкладка "Заказ пропуска"', async () => {
    await page.base.loading(entry.sleep1);
    await dec.auth(entry.customLogin, entry.customPassword);
    await dec.simple(el.section.handler, [sec.ord, entry.max], el.section);
    await dec.simple(el.subsection.handler, [sub.ord.order, entry.max], el.subsection);
    await dec.simple(el.tab.handler, ['Заказ пропуска', entry.max], el.tab);
    await dec.simple(page.orderpassOrder.init, [entry.max], page.orderpassOrder);
    await page.base.loading(entry.sleep1);
});

const befPassArchive = () => before('Вход и открытие подраздела "Заказ пропуска" вкладка "Архив"', async () => {
    await page.base.loading(entry.sleep1);
    await dec.auth(entry.customLogin, entry.customPassword);
    await dec.simple(el.section.handler, [sec.ord, entry.max], el.section);
    await dec.simple(el.subsection.handler, [sub.ord.order, entry.max], el.subsection);
    await dec.simple(el.tab.handler, ['Архив', entry.max], el.tab);
    await dec.simple(page.orderpassArchive.init, [entry.max], page.orderpassArchive);
    await page.base.loading(entry.sleep1);
});

const aft = () => after('Выход', async () => {
    await page.base.loading(entry.sleep1);
    await dec.exit();
});

const other = (type, text) => {

    const addVisitorMaxParams = () => describe(text +
        'Добавление посетителя с максимальными количествои параметров.', () => {

        if(type === 'visitorOrder') {
            describe('Добавление', () => {

                befOrdered();
                aft();

                describe('Открытие страницы добавления', () => {
                    decorate.el.butIcBefore.handler({
                        icon: but.add,
                        timeout: entry.max
                    });
                    decorate.page.visitorChange.initAdd({
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                });

                describe('Ввод данных "Общая информация"', () => {
                    describe('Основная информация', () => {
                        decorate.el.input.sendKeys({
                            title: 'Фамилия',
                            placeholder: 'Фамилия',
                            value: data.visitor1.lastName,
                            timeout: entry.max
                        });
                        decorate.el.input.sendKeys({
                            title: 'Имя',
                            placeholder: 'Имя',
                            value: data.visitor1.firstName,
                            timeout: entry.max
                        });
                        decorate.el.input.sendKeys({
                            title: 'Отчество',
                            placeholder: 'Отчество',
                            value: data.visitor1.middleName,
                            timeout: entry.max
                        });
                        decorate.el.input.sendKeys({
                            title: 'E-Mail',
                            placeholder: 'E-Mail',
                            value: data.visitor1.mail,
                            timeout: entry.max
                        });
                    });

                    describe('Учетные данные', () => {
                        decorate.el.selectInput.iconXpand({
                            title: 'Куда (подразделение)',
                            placeholder: 'Куда (подразделение)',
                            timeout: entry.max
                        });
                        decorate.el.selectXpand.xpand({
                            timeout: entry.max
                        });
                        decorate.el.selectXpand.handler({
                            value: data.divisions.division3.name,
                            timeout: entry.max
                        });
                        decorate.el.selectXpand.xpandNoElement({
                            timeout: entry.max
                        });
                        decorate.el.selectInput.iconOutline({
                            title: 'Куда (подразделение)',
                            placeholder: 'Куда (подразделение)',
                            timeout: entry.max
                        });
                        decorate.modal.divisionFilter.init({
                            timeout: entry.max
                        });
                        decorate.el.filterTreeNode.handler({
                            name: data.visitor1.division,
                            timeout: entry.max
                        });
                        decorate.el.button.handler({
                            name: 'Выбрать',
                            timeout: entry.max
                        });
                        decorate.modal.divisionFilter.initClose({
                            timeout: entry.max
                        });

                        decorate.el.selectInput.iconXpand({
                            title: 'Сопровождающий',
                            placeholder: 'Сопровождающий',
                            timeout: entry.max
                        });
                        decorate.el.selectXpand.xpand({
                            timeout: entry.max
                        });
                        decorate.el.selectXpand.handler({
                            value: data.visitor1.staff,
                            timeout: entry.max
                        });
                        decorate.el.selectXpand.xpandNoElement({
                            timeout: entry.max
                        });

                        decorate.el.input.iconCard({
                            title: 'Карта / идентификатор',
                            placeholder: 'Карта / идентификатор',
                            timeout: entry.max
                        });
                        decorate.modal.cardControlsAdd.init({
                            timeout: entry.max
                        });
                        decorate.modal.cardControlsNumber.inputSendKeys( {
                            title: 'Идентификатор карты',
                            placeholder: '',
                            value: data.visitor1.card,
                            timeout: entry.max
                        });
                        decorate.modal.cardControlsNumber.buttonHandler({
                            name: 'Сохранить',
                            timeout: entry.max
                        });
                        decorate.modal.cardControlsNumber.initClose({
                            timeout: entry.max
                        });

                        decorate.el.input.iconCalendar({
                            title: 'Действует с',
                            placeholder: 'Действует с',
                            timeout: entry.max
                        });
                        decorate.el.datepicker.date({
                            day: data.visitor1.dateIn.day,
                            month: data.visitor1.dateIn.month,
                            year: data.visitor1.dateIn.year,
                            scrollYear: -500,
                            timeout: entry.max
                        });

                        decorate.el.input.sendKeys({
                            title: 'Подтверждающий документ',
                            placeholder: 'Подтверждающий документ',
                            value: data.visitor1.document,
                            timeout: entry.max
                        });
                        decorate.el.input.sendKeys({
                            title: 'Номер документа',
                            placeholder: 'Номер документа',
                            value: data.visitor1.documentNumber,
                            timeout: entry.max
                        });

                        decorate.el.input.iconCalendar({
                            title: 'Действует до',
                            placeholder: 'Действует до',
                            timeout: entry.max
                        });
                        decorate.el.datepicker.date({
                            day: data.visitor1.dateAfter.day,
                            month: data.visitor1.dateAfter.month,
                            year: data.visitor1.dateAfter.year,
                            scrollYear: -500,
                            timeout: entry.max
                        });
                    });

                    describe('Дополнительные поля', () => {
                        decorate.el.input.sendKeys({
                            title: 'Пин-код',
                            placeholder: '',
                            value: data.visitor1.pinCode,
                            timeout: entry.max
                        });
                    });

                    describe('Фотография', () => {
                        decorate.el.photography.addImage({
                            name: 'Загрузить фотографию',
                            timeout: entry.max
                        });
                        decorate.modal.changePhoto.init({
                            timeout: entry.max
                        });
                        decorate.modal.changePhoto.noImage({
                            timeout: entry.max
                        });
                        decorate.modal.changePhoto.addImage({
                            src: imp.photo.photo1,
                            timeout: entry.max
                        });
                        decorate.modal.changePhoto.image({
                            timeout: entry.max
                        });
                        decorate.el.button.handler({
                            name: 'Сохранить',
                            timeout: entry.max
                        });
                        decorate.modal.changePhoto.initClose({
                            timeout: entry.max
                        });
                        decorate.el.photography.imageVisitor({
                            timeout: entry.max
                        });
                    });
                });

                describe('Ввод данных "Шрихкод"', () => {
                    describe('Открытие информации "Штрихкод"', () => {
                        decorate.el.simpleCell.handler({
                            name: 'Штрихкод',
                            timeout: entry.max
                        });
                        decorate.el.simpleCell.active({
                            name: 'Штрихкод',
                            timeout: entry.max
                        });
                    });

                    describe('Генерация штрикода по кнопке', () => {
                        it('Нажатие кнопки "Сгенерировать новый штрикод" и проверка обновления картинки штрикода и поля ' +
                            'идентификатор на числа', async () => {
                            const barcodeBefore = await page.staffChange.getBarcodeSrc(entry.max);
                            await dec.simpleText(page.staffChange.getBarcodeSrc,
                                [entry.max],
                                barcodeBefore.text,
                                page.staffChange);
                            await dec.simple(el.butIcBefore.handler,
                                [but.unsorted_replay_outline, entry.max],
                                el.butIcBefore);
                            await page.base.loading(2000);
                            await dec.simpleNotText(page.staffChange.getBarcodeSrc,
                                [entry.max],
                                barcodeBefore.text,
                                page.staffChange);

                            const barcodeAfter = await page.staffChange.getBarcodeSrc(entry.max);
                            expect(!!barcodeAfter.text).to.equal(true);

                            const barcodeInput = await el.input.getValue('', '', entry.max);
                            expect(Number.isInteger(Number(barcodeInput.text))).to.equal(true);
                        });
                    });

                    describe('Удаление штрикода по кнопке в поле ввода', () => {
                        decorate.el.input.iconClear({
                            title: '',
                            placeholder: '',
                            timeout: entry.max
                        });
                        decorate.modalConfirm.staffChangeDeleteBarcode.init({
                            timeout: entry.max
                        });
                        decorate.el.button.handler({
                            name: 'Подтвердить',
                            timeout: entry.max
                        });
                        decorate.modalConfirm.staffChangeDeleteBarcode.initClose({
                            timeout: entry.max
                        });
                        decorate.el.input.getValue({
                            title: '',
                            placeholder: '',
                            value: '',
                            timeout: entry.max
                        });
                    });

                    describe('Ввод штрикода', () => {
                        decorate.el.input.sendKeys({
                            title: '',
                            placeholder: '',
                            value: data.visitor1.barcode,
                            timeout: entry.max
                        });
                    });
                });

                describe('Открытие информации "Отпечаток"', () => {
                    decorate.el.simpleCell.handler({
                        name: 'Отпечаток',
                        timeout: entry.max
                    });
                    decorate.el.simpleCell.active({
                        name: 'Отпечаток',
                        timeout: entry.max
                    });
                });

                describe('Открытие информации "Ладонь"', () => {
                    decorate.el.simpleCell.handler({
                        name: 'Ладонь',
                        timeout: entry.max
                    });
                    decorate.el.simpleCell.active({
                        name: 'Ладонь',
                        timeout: entry.max
                    });
                });

                describe('Открытие информации "Лицо"', () => {
                    decorate.el.simpleCell.handler({
                        name: 'Лицо',
                        timeout: entry.max
                    });
                    decorate.el.simpleCell.active({
                        name: 'Лицо',
                        timeout: entry.max
                    });
                });

                describe('Ввод данных "Транспортное средство"', () => {
                    describe('Открытие информации "Транспортное средство"', () => {
                        decorate.el.simpleCell.handler({
                            name: 'Транспортное средство',
                            timeout: entry.max
                        });
                        decorate.el.simpleCell.active({
                            name: 'Транспортное средство',
                            timeout: entry.max
                        });
                    });

                    data.visitor1.ts.arrTS.forEach((obj, index) => {
                        describe(`Добавление ТС ${index + 1}`, () => {
                            decorate.page.staffChange.addCarButton({
                                name: 'Добавить транспортное средство',
                                timeout: entry.max
                            });
                            decorate.page.staffChange.addCarImg({
                                name: 'Загрузить фотографию',
                                number: index + 1,
                                timeout: entry.max
                            });
                            decorate.modal.addPhoto.init({
                                timeout: entry.max
                            });
                            decorate.modal.addPhoto.noImage({
                                timeout: entry.max
                            });
                            decorate.modal.addPhoto.addImage({
                                src: imp.photo.photo1,
                                timeout: entry.max
                            });
                            decorate.modal.addPhoto.image({
                                timeout: entry.max
                            });
                            decorate.el.button.handler({
                                name: 'Сохранить',
                                timeout: entry.max
                            });
                            decorate.modal.addPhoto.initClose({
                                timeout: entry.max
                            });
                            decorate.page.staffChange.сarImg({
                                number: index + 1,
                                timeout: entry.max
                            });
                            decorate.page.staffChange.sendKeysCarInput({
                                title: 'Номер транспортного средства',
                                number: index + 1,
                                value: obj.number,
                                timeout: entry.max
                            });
                            decorate.page.staffChange.sendKeysCarInput({
                                title: 'Модель транспортного средства',
                                number: index + 1,
                                value: obj.model,
                                timeout: entry.max
                            });
                        });
                    });
                });

                describe('Сохранение посетителя', () => {
                    decorate.el.button.handler({
                        name: 'Сохранить изменения',
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                });
            });

            describe('Изменение даты заказа в базе данных', () => {
                befOrdered();
                aft();
                it('Изменение даты.', async () => {
                    const cook = await page.base.getCookie('token');
                    const arrVisitor = await api.getVisitor(cook.text);
                    const visitor1 = arrVisitor.text.filter(obj => obj.name === data.visitor1.fio)[0].id;
                    await dec.simple(db.updateUserCrateDate,
                        [{
                            id: visitor1,
                            create_date: data.event1
                        }],
                        db.updateUserCrateDate);
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
            });

            describe('Проверка таблицы', () => {
                befOrdered();
                aft();
                decorate.el.table.size({
                    strCount: 1,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Посетитель',
                    strNumber: 1,
                    cellNumber: 1,
                    value: data.visitor1.fio,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Сопровождающий',
                    strNumber: 1,
                    cellNumber: 2,
                    value: data.visitor1.staff,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Документ',
                    strNumber: 1,
                    cellNumber: 3,
                    value: data.visitor1.document,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Номер документа',
                    strNumber: 1,
                    cellNumber: 4,
                    value: data.visitor1.documentNumber,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Шаблон доступа',
                    strNumber: 1,
                    cellNumber: 5,
                    value: '',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Дата заказа',
                    strNumber: 1,
                    cellNumber: 6,
                    value: data.event1,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Действует с',
                    strNumber: 1,
                    cellNumber: 7,
                    value: data.visitor1.dateIn.date + ':00',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Действителен до',
                    strNumber: 1,
                    cellNumber: 8,
                    value: data.visitor1.dateAfter.date + ':00',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Куда (подразделение)',
                    strNumber: 1,
                    cellNumber: 9,
                    value: data.visitor1.division,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Карта',
                    strNumber: 1,
                    cellNumber: 10,
                    value: data.visitor1.card,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Штрихкод',
                    strNumber: 1,
                    cellNumber: 11,
                    value: data.visitor1.barcode,
                    timeout: entry.max
                });
                decorate.el.table.cellImg({
                    headTitle: 'Фотография',
                    strNumber: 1,
                    cellNumber: 12,
                    timeout: entry.max
                });
            });

            describe('Проверка параметров', () => {
                befOrdered();
                aft();

                describe('Открытие посетителя на редактирование', () => {
                    decorate.el.table.strHandler({
                        strNumber: 1,
                        timeout: entry.max
                    });
                    decorate.el.butIcBefore.handler({
                        icon: but.edit,
                        timeout: entry.max
                    });
                    decorate.page.visitorChange.initEdit({
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                });

                describe('Проверка данных "Общая информация"', () => {
                    describe('Основная информация', () => {
                        decorate.el.input.getValue({
                            title: 'Фамилия',
                            placeholder: 'Фамилия',
                            value: data.visitor1.lastName,
                            timeout: entry.max
                        });
                        decorate.el.input.getValue({
                            title: 'Имя',
                            placeholder: 'Имя',
                            value: data.visitor1.firstName,
                            timeout: entry.max
                        });
                        decorate.el.input.getValue({
                            title: 'Отчество',
                            placeholder: 'Отчество',
                            value: data.visitor1.middleName,
                            timeout: entry.max
                        });
                        decorate.el.input.getValue({
                            title: 'E-Mail',
                            placeholder: 'E-Mail',
                            value: data.visitor1.mail,
                            timeout: entry.max
                        });
                    });

                    describe('Учетные данные', () => {
                        decorate.el.input.getValue({
                            title: 'Куда (подразделение)',
                            placeholder: 'Куда (подразделение)',
                            value: data.visitor1.division,
                            timeout: entry.max
                        });
                        decorate.el.input.getValue({
                            title: 'Сопровождающий',
                            placeholder: 'Сопровождающий',
                            value: data.visitor1.staff,
                            timeout: entry.max
                        });
                        decorate.el.input.getValue({
                            title: 'Карта / идентификатор',
                            placeholder: 'Карта / идентификатор',
                            value: data.visitor1.card,
                            timeout: entry.max
                        });
                        decorate.el.input.getValue({
                            title: 'Подтверждающий документ',
                            placeholder: 'Подтверждающий документ',
                            value: data.visitor1.document,
                            timeout: entry.max
                        });
                        decorate.el.input.getValue({
                            title: 'Номер документа',
                            placeholder: 'Номер документа',
                            value: data.visitor1.documentNumber,
                            timeout: entry.max
                        });
                        decorate.el.input.getValue({
                            title: 'Действует с',
                            placeholder: 'Действует с',
                            value: data.visitor1.dateIn.date,
                            timeout: entry.max
                        });
                        decorate.el.input.getValue({
                            title: 'Шаблон доступа',
                            placeholder: 'Шаблон доступа',
                            value: '',
                            timeout: entry.max
                        });
                        decorate.el.input.getValue({
                            title: 'Действует до',
                            placeholder: 'Действует до',
                            value: data.visitor1.dateAfter.date,
                            timeout: entry.max
                        });
                    });

                    describe('Дополнительные поля', () => {
                        decorate.el.input.getValue({
                            title: 'Пин-код',
                            placeholder: '',
                            value: data.visitor1.pinCode,
                            timeout: entry.max
                        });
                    });

                    describe('Фотография', () => {
                        decorate.el.photography.imageVisitor({
                            timeout: entry.max
                        });
                    });
                });

                describe('Проверка данных "Шрихкод"', () => {
                    describe('Открытие информации "Штрихкод"', () => {
                        decorate.el.simpleCell.handler({
                            name: 'Штрихкод',
                            timeout: entry.max
                        });
                        decorate.el.simpleCell.active({
                            name: 'Штрихкод',
                            timeout: entry.max
                        });
                    });

                    describe('Проверка штрихкода', () => {
                        it('Проверка отображение картинки штрикода', async () => {
                            const barcode = await page.staffChange.getBarcodeSrc(entry.max);
                            expect(!!barcode.text).to.equal(true);
                        });
                        decorate.el.input.getValue({
                            title: '',
                            placeholder: '',
                            value: data.visitor1.barcode,
                            timeout: entry.max
                        });
                    });
                });

                describe('Проверка информации "Отпечаток"', () => {
                    decorate.el.simpleCell.handler({
                        name: 'Отпечаток',
                        timeout: entry.max
                    });
                    decorate.el.simpleCell.active({
                        name: 'Отпечаток',
                        timeout: entry.max
                    });
                });

                describe('Проверка информации "Ладонь"', () => {
                    decorate.el.simpleCell.handler({
                        name: 'Ладонь',
                        timeout: entry.max
                    });
                    decorate.el.simpleCell.active({
                        name: 'Ладонь',
                        timeout: entry.max
                    });
                });

                describe('Проверка информации "Лицо"', () => {
                    decorate.el.simpleCell.handler({
                        name: 'Лицо',
                        timeout: entry.max
                    });
                    decorate.el.simpleCell.active({
                        name: 'Лицо',
                        timeout: entry.max
                    });
                });

                describe('Проверка данных "Транспортное средство"', () => {
                    describe('Открытие информации "Транспортное средство"', () => {
                        decorate.el.simpleCell.handler({
                            name: 'Транспортное средство',
                            timeout: entry.max
                        });
                        decorate.el.simpleCell.active({
                            name: 'Транспортное средство',
                            timeout: entry.max
                        });
                    });

                    data.visitor1.ts.arrTS.forEach((obj, index) => {
                        describe(`Проверка ТС ${index + 1}`, () => {
                            decorate.page.staffChange.сarImg({
                                number: index + 1,
                                timeout: entry.max
                            });
                            decorate.page.staffChange.getValueCarInput({
                                title: 'Номер транспортного средства',
                                number: index + 1,
                                value: obj.number,
                                timeout: entry.max
                            });
                            decorate.page.staffChange.getValueCarInput({
                                title: 'Модель транспортного средства',
                                number: index + 1,
                                value: obj.model,
                                timeout: entry.max
                            });
                        });
                    });
                });

                describe('Нажатие кнопки "Вернуться к списку посетителей".', () => {
                    decorate.el.button.handler({
                        name: 'Вернуться к списку посетителей',
                        timeout: entry.max
                    });
                    decorate.modalConfirm.staffReturn.init({
                        timeout: entry.max
                    });
                    decorate.el.button.handler({
                        name: 'Подтвердить',
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.page.visitorOrder.init({
                        timeout: entry.max
                    });
                });
            });
        }

        if(type === 'visitorActive') {
            describe('Добавление', () => {

                befActive();
                aft();

                describe('Открытие страницы добавления', () => {
                    decorate.el.butIcBefore.handler({
                        icon: but.add,
                        timeout: entry.max
                    });
                    decorate.page.visitorChange.initAdd({
                        timeout: entry.max
                    });
                });

                describe('Ввод данных "Общая информация"', () => {
                    describe('Основная информация', () => {
                        decorate.el.input.sendKeys({
                            title: 'Фамилия',
                            placeholder: 'Фамилия',
                            value: data.visitor1.lastName,
                            timeout: entry.max
                        });
                        decorate.el.input.sendKeys({
                            title: 'Имя',
                            placeholder: 'Имя',
                            value: data.visitor1.firstName,
                            timeout: entry.max
                        });
                        decorate.el.input.sendKeys({
                            title: 'Отчество',
                            placeholder: 'Отчество',
                            value: data.visitor1.middleName,
                            timeout: entry.max
                        });
                        decorate.el.input.sendKeys({
                            title: 'E-Mail',
                            placeholder: 'E-Mail',
                            value: data.visitor1.mail,
                            timeout: entry.max
                        });
                    });

                    describe('Учетные данные', () => {
                        decorate.el.selectInput.iconXpand({
                            title: 'Куда (подразделение)',
                            placeholder: 'Куда (подразделение)',
                            timeout: entry.max
                        });
                        decorate.el.selectXpand.xpand({
                            timeout: entry.max
                        });
                        decorate.el.selectXpand.handler({
                            value: data.divisions.division3.name,
                            timeout: entry.max
                        });
                        decorate.el.selectXpand.xpandNoElement({
                            timeout: entry.max
                        });
                        decorate.el.selectInput.iconOutline({
                            title: 'Куда (подразделение)',
                            placeholder: 'Куда (подразделение)',
                            timeout: entry.max
                        });
                        decorate.modal.divisionFilter.init({
                            timeout: entry.max
                        });
                        decorate.el.filterTreeNode.handler({
                            name: data.visitor1.division,
                            timeout: entry.max
                        });
                        decorate.el.button.handler({
                            name: 'Выбрать',
                            timeout: entry.max
                        });
                        decorate.modal.divisionFilter.initClose({
                            timeout: entry.max
                        });

                        decorate.el.selectInput.iconXpand({
                            title: 'Сопровождающий',
                            placeholder: 'Сопровождающий',
                            timeout: entry.max
                        });
                        decorate.el.selectXpand.xpand({
                            timeout: entry.max
                        });
                        decorate.el.selectXpand.handler({
                            value: data.visitor1.staff,
                            timeout: entry.max
                        });
                        decorate.el.selectXpand.xpandNoElement({
                            timeout: entry.max
                        });

                        decorate.el.input.iconCard({
                            title: 'Карта / идентификатор',
                            placeholder: 'Карта / идентификатор',
                            timeout: entry.max
                        });
                        decorate.modal.cardControlsAdd.init({
                            timeout: entry.max
                        });
                        decorate.modal.cardControlsNumber.inputSendKeys( {
                            title: 'Идентификатор карты',
                            placeholder: '',
                            value: data.visitor1.card,
                            timeout: entry.max
                        });
                        decorate.modal.cardControlsNumber.buttonHandler({
                            name: 'Сохранить',
                            timeout: entry.max
                        });
                        decorate.modal.cardControlsNumber.initClose({
                            timeout: entry.max
                        });

                        decorate.el.input.iconCalendar({
                            title: 'Действует с',
                            placeholder: 'Действует с',
                            timeout: entry.max
                        });
                        decorate.el.datepicker.date({
                            day: data.visitor1.dateIn.day,
                            month: data.visitor1.dateIn.month,
                            year: data.visitor1.dateIn.year,
                            scrollYear: -500,
                            timeout: entry.max
                        });

                        decorate.el.selectInput.iconXpand({
                            title: 'Шаблон доступа',
                            placeholder: 'Шаблон доступа',
                            timeout: entry.max
                        });
                        decorate.el.selectXpand.xpand({
                            timeout: entry.max
                        });
                        decorate.el.selectXpand.handler({
                            value: data.visitor1.template,
                            timeout: entry.max
                        });
                        decorate.el.selectXpand.xpandNoElement({
                            timeout: entry.max
                        });

                        decorate.el.input.sendKeys({
                            title: 'Подтверждающий документ',
                            placeholder: 'Подтверждающий документ',
                            value: data.visitor1.document,
                            timeout: entry.max
                        });
                        decorate.el.input.sendKeys({
                            title: 'Номер документа',
                            placeholder: 'Номер документа',
                            value: data.visitor1.documentNumber,
                            timeout: entry.max
                        });

                        decorate.el.input.iconCalendar({
                            title: 'Действует до',
                            placeholder: 'Действует до',
                            timeout: entry.max
                        });
                        decorate.el.datepicker.date({
                            day: data.visitor1.dateAfter.day,
                            month: data.visitor1.dateAfter.month,
                            year: data.visitor1.dateAfter.year,
                            scrollYear: -500,
                            timeout: entry.max
                        });
                    });

                    describe('Дополнительные поля', () => {
                        decorate.el.input.sendKeys({
                            title: 'Пин-код',
                            placeholder: '',
                            value: data.visitor1.pinCode,
                            timeout: entry.max
                        });
                    });

                    describe('Фотография', () => {
                        decorate.el.photography.addImage({
                            name: 'Загрузить фотографию',
                            timeout: entry.max
                        });
                        decorate.modal.changePhoto.init({
                            timeout: entry.max
                        });
                        decorate.modal.changePhoto.noImage({
                            timeout: entry.max
                        });
                        decorate.modal.changePhoto.addImage({
                            src: imp.photo.photo1,
                            timeout: entry.max
                        });
                        decorate.modal.changePhoto.image({
                            timeout: entry.max
                        });
                        decorate.el.button.handler({
                            name: 'Сохранить',
                            timeout: entry.max
                        });
                        decorate.modal.changePhoto.initClose({
                            timeout: entry.max
                        });
                        decorate.el.photography.imageVisitor({
                            timeout: entry.max
                        });
                    });
                });

                describe('Ввод данных "Шрихкод"', () => {
                    describe('Открытие информации "Штрихкод"', () => {
                        decorate.el.simpleCell.handler({
                            name: 'Штрихкод',
                            timeout: entry.max
                        });
                        decorate.el.simpleCell.active({
                            name: 'Штрихкод',
                            timeout: entry.max
                        });
                    });

                    describe('Генерация штрикода по кнопке', () => {
                        it('Нажатие кнопки "Сгенерировать новый штрикод" и проверка обновления картинки штрикода и поля ' +
                            'идентификатор на числа', async () => {
                            const barcodeBefore = await page.staffChange.getBarcodeSrc(entry.max);
                            await dec.simpleText(page.staffChange.getBarcodeSrc,
                                [entry.max],
                                barcodeBefore.text,
                                page.staffChange);
                            await dec.simple(el.butIcBefore.handler,
                                [but.unsorted_replay_outline, entry.max],
                                el.butIcBefore);
                            await page.base.loading(2000);
                            await dec.simpleNotText(page.staffChange.getBarcodeSrc,
                                [entry.max],
                                barcodeBefore.text,
                                page.staffChange);

                            const barcodeAfter = await page.staffChange.getBarcodeSrc(entry.max);
                            expect(!!barcodeAfter.text).to.equal(true);

                            const barcodeInput = await el.input.getValue('', '', entry.max);
                            expect(Number.isInteger(Number(barcodeInput.text))).to.equal(true);
                        });
                    });

                    describe('Удаление штрикода по кнопке в поле ввода', () => {
                        decorate.el.input.iconClear({
                            title: '',
                            placeholder: '',
                            timeout: entry.max
                        });
                        decorate.modalConfirm.staffChangeDeleteBarcode.init({
                            timeout: entry.max
                        });
                        decorate.el.button.handler({
                            name: 'Подтвердить',
                            timeout: entry.max
                        });
                        decorate.modalConfirm.staffChangeDeleteBarcode.initClose({
                            timeout: entry.max
                        });
                        decorate.el.input.getValue({
                            title: '',
                            placeholder: '',
                            value: '',
                            timeout: entry.max
                        });
                    });

                    describe('Ввод штрикода', () => {
                        decorate.el.input.sendKeys({
                            title: '',
                            placeholder: '',
                            value: data.visitor1.barcode,
                            timeout: entry.max
                        });
                    });
                });

                describe('Открытие информации "Отпечаток"', () => {
                    decorate.el.simpleCell.handler({
                        name: 'Отпечаток',
                        timeout: entry.max
                    });
                    decorate.el.simpleCell.active({
                        name: 'Отпечаток',
                        timeout: entry.max
                    });
                });

                describe('Открытие информации "Ладонь"', () => {
                    decorate.el.simpleCell.handler({
                        name: 'Ладонь',
                        timeout: entry.max
                    });
                    decorate.el.simpleCell.active({
                        name: 'Ладонь',
                        timeout: entry.max
                    });
                });

                describe('Открытие информации "Лицо"', () => {
                    decorate.el.simpleCell.handler({
                        name: 'Лицо',
                        timeout: entry.max
                    });
                    decorate.el.simpleCell.active({
                        name: 'Лицо',
                        timeout: entry.max
                    });
                });

                describe('Ввод данных "Транспортное средство"', () => {
                    describe('Открытие информации "Транспортное средство"', () => {
                        decorate.el.simpleCell.handler({
                            name: 'Транспортное средство',
                            timeout: entry.max
                        });
                        decorate.el.simpleCell.active({
                            name: 'Транспортное средство',
                            timeout: entry.max
                        });
                    });

                    data.visitor1.ts.arrTS.forEach((obj, index) => {
                        describe(`Добавление ТС ${index + 1}`, () => {
                            decorate.page.staffChange.addCarButton({
                                name: 'Добавить транспортное средство',
                                timeout: entry.max
                            });
                            decorate.page.staffChange.addCarImg({
                                name: 'Загрузить фотографию',
                                number: index + 1,
                                timeout: entry.max
                            });
                            decorate.modal.addPhoto.init({
                                timeout: entry.max
                            });
                            decorate.modal.addPhoto.noImage({
                                timeout: entry.max
                            });
                            decorate.modal.addPhoto.addImage({
                                src: imp.photo.photo1,
                                timeout: entry.max
                            });
                            decorate.modal.addPhoto.image({
                                timeout: entry.max
                            });
                            decorate.el.button.handler({
                                name: 'Сохранить',
                                timeout: entry.max
                            });
                            decorate.modal.addPhoto.initClose({
                                timeout: entry.max
                            });
                            decorate.page.staffChange.сarImg({
                                number: index + 1,
                                timeout: entry.max
                            });
                            decorate.page.staffChange.sendKeysCarInput({
                                title: 'Номер транспортного средства',
                                number: index + 1,
                                value: obj.number,
                                timeout: entry.max
                            });
                            decorate.page.staffChange.sendKeysCarInput({
                                title: 'Модель транспортного средства',
                                number: index + 1,
                                value: obj.model,
                                timeout: entry.max
                            });
                        });
                    });
                });

                describe('Сохранение посетителя', () => {
                    decorate.el.button.handler({
                        name: 'Сохранить изменения',
                        timeout: entry.max
                    });
                    decorate.el.success.success({
                        text: 'Посетитель успешно добавлен',
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                });
            });

            describe('Изменение даты заказа в базе данных', () => {
                befActive();
                aft();
                it('Изменение даты.', async () => {
                    const cook = await page.base.getCookie('token');
                    const arrVisitor = await api.getVisitor(cook.text);
                    const visitor1 = arrVisitor.text.filter(obj => obj.name === data.visitor1.fio)[0].id;
                    await dec.simple(db.updateUserCrateDate,
                        [{
                            id: visitor1,
                            create_date: data.event1
                        }],
                        db.updateUserCrateDate);
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
            });

            describe('Проверка таблицы', () => {
                befActive();
                aft();
                decorate.el.table.size({
                    strCount: 1,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Посетитель',
                    strNumber: 1,
                    cellNumber: 2,
                    value: data.visitor1.fio,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Сопровождающий',
                    strNumber: 1,
                    cellNumber: 3,
                    value: data.visitor1.staff,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Документ',
                    strNumber: 1,
                    cellNumber: 4,
                    value: data.visitor1.document,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Номер документа',
                    strNumber: 1,
                    cellNumber: 5,
                    value: data.visitor1.documentNumber,
                    timeout: entry.max
                });
                decorate.el.table.cellNoIconLock({
                    strNumber: 1,
                    cellNumber: 6,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Дата заказа',
                    strNumber: 1,
                    cellNumber: 7,
                    value: data.event1,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Действует с',
                    strNumber: 1,
                    cellNumber: 8,
                    value: data.visitor1.dateIn.date + ':00',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Действителен до',
                    strNumber: 1,
                    cellNumber: 9,
                    value: data.visitor1.dateAfter.date + ':00',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Куда (подразделение)',
                    strNumber: 1,
                    cellNumber: 10,
                    value: data.visitor1.division,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Шаблон доступа',
                    strNumber: 1,
                    cellNumber: 11,
                    value: data.visitor1.template,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Карта',
                    strNumber: 1,
                    cellNumber: 12,
                    value: data.visitor1.card,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Штрихкод',
                    strNumber: 1,
                    cellNumber: 13,
                    value: data.visitor1.barcode,
                    timeout: entry.max
                });
            });

            describe('Проверка параметров', () => {
                befActive();
                aft();

                describe('Открытие посетителя на редактирование', () => {
                    decorate.el.table.strHandler({
                        strNumber: 1,
                        timeout: entry.max
                    });
                    decorate.el.butIcBefore.handler({
                        icon: but.edit,
                        timeout: entry.max
                    });
                    decorate.page.visitorChange.initEdit({
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                });

                describe('Проверка данных "Общая информация"', () => {
                    describe('Основная информация', () => {
                        decorate.el.input.getValue({
                            title: 'Фамилия',
                            placeholder: 'Фамилия',
                            value: data.visitor1.lastName,
                            timeout: entry.max
                        });
                        decorate.el.input.getValue({
                            title: 'Имя',
                            placeholder: 'Имя',
                            value: data.visitor1.firstName,
                            timeout: entry.max
                        });
                        decorate.el.input.getValue({
                            title: 'Отчество',
                            placeholder: 'Отчество',
                            value: data.visitor1.middleName,
                            timeout: entry.max
                        });
                        decorate.el.input.getValue({
                            title: 'E-Mail',
                            placeholder: 'E-Mail',
                            value: data.visitor1.mail,
                            timeout: entry.max
                        });
                    });

                    describe('Учетные данные', () => {
                        decorate.el.input.getValue({
                            title: 'Куда (подразделение)',
                            placeholder: 'Куда (подразделение)',
                            value: data.visitor1.division,
                            timeout: entry.max
                        });
                        decorate.el.input.getValue({
                            title: 'Сопровождающий',
                            placeholder: 'Сопровождающий',
                            value: data.visitor1.staff,
                            timeout: entry.max
                        });
                        decorate.el.input.getValue({
                            title: 'Карта / идентификатор',
                            placeholder: 'Карта / идентификатор',
                            value: data.visitor1.card,
                            timeout: entry.max
                        });
                        decorate.el.input.getValue({
                            title: 'Подтверждающий документ',
                            placeholder: 'Подтверждающий документ',
                            value: data.visitor1.document,
                            timeout: entry.max
                        });
                        decorate.el.input.getValue({
                            title: 'Номер документа',
                            placeholder: 'Номер документа',
                            value: data.visitor1.documentNumber,
                            timeout: entry.max
                        });
                        decorate.el.input.getValue({
                            title: 'Действует с',
                            placeholder: 'Действует с',
                            value: data.visitor1.dateIn.date,
                            timeout: entry.max
                        });
                        decorate.el.input.getValue({
                            title: 'Шаблон доступа',
                            placeholder: 'Шаблон доступа',
                            value: data.visitor1.template,
                            timeout: entry.max
                        });
                        decorate.el.input.getValue({
                            title: 'Действует до',
                            placeholder: 'Действует до',
                            value: data.visitor1.dateAfter.date,
                            timeout: entry.max
                        });
                    });

                    describe('Дополнительные поля', () => {
                        decorate.el.input.getValue({
                            title: 'Пин-код',
                            placeholder: '',
                            value: data.visitor1.pinCode,
                            timeout: entry.max
                        });
                    });

                    describe('Фотография', () => {
                        decorate.el.photography.imageVisitor({
                            timeout: entry.max
                        });
                    });
                });

                describe('Проверка данных "Шрихкод"', () => {
                    describe('Открытие информации "Штрихкод"', () => {
                        decorate.el.simpleCell.handler({
                            name: 'Штрихкод',
                            timeout: entry.max
                        });
                        decorate.el.simpleCell.active({
                            name: 'Штрихкод',
                            timeout: entry.max
                        });
                    });

                    describe('Проверка штрихкода', () => {
                        it('Проверка отображение картинки штрикода', async () => {
                            const barcode = await page.staffChange.getBarcodeSrc(entry.max);
                            expect(!!barcode.text).to.equal(true);
                        });
                        decorate.el.input.getValue({
                            title: '',
                            placeholder: '',
                            value: data.visitor1.barcode,
                            timeout: entry.max
                        });
                    });
                });

                describe('Проверка информации "Отпечаток"', () => {
                    decorate.el.simpleCell.handler({
                        name: 'Отпечаток',
                        timeout: entry.max
                    });
                    decorate.el.simpleCell.active({
                        name: 'Отпечаток',
                        timeout: entry.max
                    });
                });

                describe('Проверка информации "Ладонь"', () => {
                    decorate.el.simpleCell.handler({
                        name: 'Ладонь',
                        timeout: entry.max
                    });
                    decorate.el.simpleCell.active({
                        name: 'Ладонь',
                        timeout: entry.max
                    });
                });

                describe('Проверка информации "Лицо"', () => {
                    decorate.el.simpleCell.handler({
                        name: 'Лицо',
                        timeout: entry.max
                    });
                    decorate.el.simpleCell.active({
                        name: 'Лицо',
                        timeout: entry.max
                    });
                });

                describe('Проверка данных "Транспортное средство"', () => {
                    describe('Открытие информации "Транспортное средство"', () => {
                        decorate.el.simpleCell.handler({
                            name: 'Транспортное средство',
                            timeout: entry.max
                        });
                        decorate.el.simpleCell.active({
                            name: 'Транспортное средство',
                            timeout: entry.max
                        });
                    });

                    data.visitor1.ts.arrTS.forEach((obj, index) => {
                        describe(`Проверка ТС ${index + 1}`, () => {
                            decorate.page.staffChange.сarImg({
                                number: index + 1,
                                timeout: entry.max
                            });
                            decorate.page.staffChange.getValueCarInput({
                                title: 'Номер транспортного средства',
                                number: index + 1,
                                value: obj.number,
                                timeout: entry.max
                            });
                            decorate.page.staffChange.getValueCarInput({
                                title: 'Модель транспортного средства',
                                number: index + 1,
                                value: obj.model,
                                timeout: entry.max
                            });
                        });
                    });
                });

                describe('Нажатие кнопки "Вернуться к списку посетителей".', () => {
                    decorate.el.button.handler({
                        name: 'Вернуться к списку посетителей',
                        timeout: entry.max
                    });
                    decorate.modalConfirm.staffReturn.init({
                        timeout: entry.max
                    });
                    decorate.el.button.handler({
                        name: 'Подтвердить',
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.page.visitorCurrent.init({
                        timeout: entry.max
                    });
                });
            });
        }

        if(type === 'visitorPassOrder') {

            describe('Добавление', () => {

                befPassOrder();
                aft();

                describe('Открытие страницы добавления', () => {
                    decorate.el.butIcBefore.handler({
                        icon: but.add,
                        timeout: entry.max
                    });
                    decorate.page.orderpassChange.initAdd({
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                });

                describe('Ввод данных "Общая информация"', () => {
                    describe('Основная информация', () => {
                        decorate.el.input.sendKeys({
                            title: 'Фамилия',
                            placeholder: 'Фамилия',
                            value: data.visitor1.lastName,
                            timeout: entry.max
                        });
                        decorate.el.input.sendKeys({
                            title: 'Имя',
                            placeholder: 'Имя',
                            value: data.visitor1.firstName,
                            timeout: entry.max
                        });
                        decorate.el.input.sendKeys({
                            title: 'Отчество',
                            placeholder: 'Отчество',
                            value: data.visitor1.middleName,
                            timeout: entry.max
                        });
                        decorate.el.input.sendKeys({
                            title: 'E-Mail',
                            placeholder: 'E-Mail',
                            value: data.visitor1.mail,
                            timeout: entry.max
                        });
                    });

                    describe('Учетные данные', () => {
                        decorate.el.selectInput.iconXpand({
                            title: 'Куда (подразделение)',
                            placeholder: 'Куда (подразделение)',
                            timeout: entry.max
                        });
                        decorate.el.selectXpand.xpand({
                            timeout: entry.max
                        });
                        decorate.el.selectXpand.handler({
                            value: data.divisions.division3.name,
                            timeout: entry.max
                        });
                        decorate.el.selectXpand.xpandNoElement({
                            timeout: entry.max
                        });
                        decorate.el.selectInput.iconOutline({
                            title: 'Куда (подразделение)',
                            placeholder: 'Куда (подразделение)',
                            timeout: entry.max
                        });
                        decorate.modal.divisionFilter.init({
                            timeout: entry.max
                        });
                        decorate.el.filterTreeNode.handler({
                            name: data.visitor1.division,
                            timeout: entry.max
                        });
                        decorate.el.button.handler({
                            name: 'Выбрать',
                            timeout: entry.max
                        });
                        decorate.modal.divisionFilter.initClose({
                            timeout: entry.max
                        });

                        decorate.el.selectInput.iconXpand({
                            title: 'Сопровождающий',
                            placeholder: 'Сопровождающий',
                            timeout: entry.max
                        });
                        decorate.el.selectXpand.xpand({
                            timeout: entry.max
                        });
                        decorate.el.selectXpand.handler({
                            value: data.visitor1.staff,
                            timeout: entry.max
                        });
                        decorate.el.selectXpand.xpandNoElement({
                            timeout: entry.max
                        });

                        decorate.el.input.iconCalendar({
                            title: 'Действует с',
                            placeholder: 'Действует с',
                            timeout: entry.max
                        });
                        decorate.el.datepicker.date({
                            day: data.visitor1.dateIn.day,
                            month: data.visitor1.dateIn.month,
                            year: data.visitor1.dateIn.year,
                            scrollYear: -500,
                            timeout: entry.max
                        });

                        decorate.el.input.sendKeys({
                            title: 'Подтверждающий документ',
                            placeholder: 'Подтверждающий документ',
                            value: data.visitor1.document,
                            timeout: entry.max
                        });
                        decorate.el.input.sendKeys({
                            title: 'Номер документа',
                            placeholder: 'Номер документа',
                            value: data.visitor1.documentNumber,
                            timeout: entry.max
                        });

                        decorate.el.input.iconCalendar({
                            title: 'Действует до',
                            placeholder: 'Действует до',
                            timeout: entry.max
                        });
                        decorate.el.datepicker.date({
                            day: data.visitor1.dateAfter.day,
                            month: data.visitor1.dateAfter.month,
                            year: data.visitor1.dateAfter.year,
                            scrollYear: -500,
                            timeout: entry.max
                        });
                    });

                    describe('Фотография', () => {
                        decorate.el.photography.addImage({
                            name: 'Загрузить фотографию',
                            timeout: entry.max
                        });
                        decorate.modal.changePhoto.init({
                            timeout: entry.max
                        });
                        decorate.modal.changePhoto.noImage({
                            timeout: entry.max
                        });
                        decorate.modal.changePhoto.addImage({
                            src: imp.photo.photo1,
                            timeout: entry.max
                        });
                        decorate.modal.changePhoto.image({
                            timeout: entry.max
                        });
                        decorate.el.button.handler({
                            name: 'Сохранить',
                            timeout: entry.max
                        });
                        decorate.modal.changePhoto.initClose({
                            timeout: entry.max
                        });
                        decorate.el.photography.imageVisitor({
                            timeout: entry.max
                        });
                    });
                });

                describe('Ввод данных "Транспортное средство"', () => {
                    describe('Открытие информации "Транспортное средство"', () => {
                        decorate.el.simpleCell.handler({
                            name: 'Транспортное средство',
                            timeout: entry.max
                        });
                        decorate.el.simpleCell.active({
                            name: 'Транспортное средство',
                            timeout: entry.max
                        });
                    });

                    data.visitor1.ts.arrTS.forEach((obj, index) => {
                        describe(`Добавление ТС ${index + 1}`, () => {
                            decorate.page.staffChange.addCarButton({
                                name: 'Добавить транспортное средство',
                                timeout: entry.max
                            });
                            decorate.page.staffChange.addCarImg({
                                name: 'Загрузить фотографию',
                                number: index + 1,
                                timeout: entry.max
                            });
                            decorate.modal.addPhoto.init({
                                timeout: entry.max
                            });
                            decorate.modal.addPhoto.noImage({
                                timeout: entry.max
                            });
                            decorate.modal.addPhoto.addImage({
                                src: imp.photo.photo1,
                                timeout: entry.max
                            });
                            decorate.modal.addPhoto.image({
                                timeout: entry.max
                            });
                            decorate.el.button.handler({
                                name: 'Сохранить',
                                timeout: entry.max
                            });
                            decorate.modal.addPhoto.initClose({
                                timeout: entry.max
                            });
                            decorate.page.staffChange.сarImg({
                                number: index + 1,
                                timeout: entry.max
                            });
                            decorate.page.staffChange.sendKeysCarInput({
                                title: 'Номер транспортного средства',
                                number: index + 1,
                                value: obj.number,
                                timeout: entry.max
                            });
                            decorate.page.staffChange.sendKeysCarInput({
                                title: 'Модель транспортного средства',
                                number: index + 1,
                                value: obj.model,
                                timeout: entry.max
                            });
                        });
                    });
                });

                describe('Сохранение посетителя', () => {
                    decorate.el.button.handler({
                        name: 'Сохранить изменения',
                        timeout: entry.max
                    });
                    decorate.el.success.success({
                        text: 'Посетитель успешно добавлен',
                        timeout: entry.max
                    });
                });
            });

            describe('Изменение даты заказа в базе данных', () => {
                befPassOrder();
                aft();
                it('Изменение даты.', async () => {
                    const cook = await page.base.getCookie('token');
                    const arrVisitor = await api.getVisitor(cook.text);
                    const visitor1 = arrVisitor.text.filter(obj => obj.name === data.visitor1.fio)[0].id;
                    await dec.simple(db.updateUserCrateDate,
                        [{
                            id: visitor1,
                            create_date: data.event1
                        }],
                        db.updateUserCrateDate);
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
            });

            describe('Проверка таблицы', () => {
                befPassOrder();
                aft();
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.table.size({
                    strCount: 1,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Посетитель',
                    strNumber: 1,
                    cellNumber: 1,
                    value: data.visitor1.fio,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Сопровождающий',
                    strNumber: 1,
                    cellNumber: 2,
                    value: data.visitor1.staff,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Документ',
                    strNumber: 1,
                    cellNumber: 3,
                    value: data.visitor1.document,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Номер документа',
                    strNumber: 1,
                    cellNumber: 4,
                    value: data.visitor1.documentNumber,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Дата заказа',
                    strNumber: 1,
                    cellNumber: 5,
                    value: data.event1,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Куда (подразделение)',
                    strNumber: 1,
                    cellNumber: 6,
                    value: data.visitor1.division,
                    timeout: entry.max
                });
                decorate.el.table.cellImg({
                    headTitle: 'Фотография',
                    strNumber: 1,
                    cellNumber: 7,
                    timeout: entry.max
                });
            });

            describe('Проверка параметров', () => {
                befPassOrder();
                aft();

                describe('Открытие посетителя на редактирование', () => {
                    decorate.el.table.strHandler({
                        strNumber: 1,
                        timeout: entry.max
                    });
                    decorate.el.butIcBefore.handler({
                        icon: but.edit,
                        timeout: entry.max
                    });
                    decorate.page.orderpassChange.initEdit({
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                });

                describe('Проверка данных "Общая информация"', () => {
                    describe('Основная информация', () => {
                        decorate.el.input.getValue({
                            title: 'Фамилия',
                            placeholder: 'Фамилия',
                            value: data.visitor1.lastName,
                            timeout: entry.max
                        });
                        decorate.el.input.getValue({
                            title: 'Имя',
                            placeholder: 'Имя',
                            value: data.visitor1.firstName,
                            timeout: entry.max
                        });
                        decorate.el.input.getValue({
                            title: 'Отчество',
                            placeholder: 'Отчество',
                            value: data.visitor1.middleName,
                            timeout: entry.max
                        });
                        decorate.el.input.getValue({
                            title: 'E-Mail',
                            placeholder: 'E-Mail',
                            value: data.visitor1.mail,
                            timeout: entry.max
                        });
                    });

                    describe('Учетные данные', () => {
                        decorate.el.input.getValue({
                            title: 'Куда (подразделение)',
                            placeholder: 'Куда (подразделение)',
                            value: data.visitor1.division,
                            timeout: entry.max
                        });
                        decorate.el.input.getValue({
                            title: 'Сопровождающий',
                            placeholder: 'Сопровождающий',
                            value: data.visitor1.staff,
                            timeout: entry.max
                        });
                        decorate.el.input.getValue({
                            title: 'Подтверждающий документ',
                            placeholder: 'Подтверждающий документ',
                            value: data.visitor1.document,
                            timeout: entry.max
                        });
                        decorate.el.input.getValue({
                            title: 'Номер документа',
                            placeholder: 'Номер документа',
                            value: data.visitor1.documentNumber,
                            timeout: entry.max
                        });
                        decorate.el.input.getValue({
                            title: 'Действует с',
                            placeholder: 'Действует с',
                            value: data.visitor1.dateIn.date,
                            timeout: entry.max
                        });
                        decorate.el.input.getValue({
                            title: 'Действует до',
                            placeholder: 'Действует до',
                            value: data.visitor1.dateAfter.date,
                            timeout: entry.max
                        });
                    });

                    describe('Фотография', () => {
                        decorate.el.photography.imageVisitor({
                            timeout: entry.max
                        });
                    });
                });

                describe('Проверка данных "Транспортное средство"', () => {
                    describe('Открытие информации "Транспортное средство"', () => {
                        decorate.el.simpleCell.handler({
                            name: 'Транспортное средство',
                            timeout: entry.max
                        });
                        decorate.el.simpleCell.active({
                            name: 'Транспортное средство',
                            timeout: entry.max
                        });
                    });

                    data.visitor1.ts.arrTS.forEach((obj, index) => {
                        describe(`Проверка ТС ${index + 1}`, () => {
                            decorate.page.staffChange.сarImg({
                                number: index + 1,
                                timeout: entry.max
                            });
                            decorate.page.staffChange.getValueCarInput({
                                title: 'Номер транспортного средства',
                                number: index + 1,
                                value: obj.number,
                                timeout: entry.max
                            });
                            decorate.page.staffChange.getValueCarInput({
                                title: 'Модель транспортного средства',
                                number: index + 1,
                                value: obj.model,
                                timeout: entry.max
                            });
                        });
                    });
                });

                describe('Нажатие кнопки "Вернуться к списку посетителей".', () => {
                    decorate.el.button.handler({
                        name: 'Вернуться к списку посетителей',
                        timeout: entry.max
                    });
                    decorate.modalConfirm.staffReturn.init({
                        timeout: entry.max
                    });
                    decorate.el.button.handler({
                        name: 'Подтвердить',
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.page.orderpassOrder.init({
                        timeout: entry.max
                    });
                });
            });
        }
    });

    const printTableVisitorMaxParams = () => describe(text + 'Проверка печати таблицы.', () => {

        if(type === 'visitorOrder') {
            befOrdered();
            aft();

            describe('Открытие печатной формы', () => {
                decorate.el.butIcBefore.handler({
                    icon: but.menu,
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.menu.menu({
                    timeout: entry.max
                });
                decorate.el.menu.handler({
                    name: 'Печать таблицы',
                    timeout: entry.max
                });
                decorate.modal.printTable.init({
                    timeout: entry.max
                });
            });

            describe('Проверка строки 1', () => {
                decorate.modal.printTable.cellGetText({
                    head: 'Посетитель',
                    str: 1,
                    cell: 1,
                    value: data.visitor1.fio,
                    timeout: entry.max
                });
                decorate.modal.printTable.cellGetText({
                    head: 'Сопровождающий',
                    str: 1,
                    cell: 2,
                    value: data.visitor1.staff,
                    timeout: entry.max
                });
                decorate.modal.printTable.cellGetText({
                    head: 'Документ',
                    str: 1,
                    cell: 3,
                    value: data.visitor1.document,
                    timeout: entry.max
                });
                decorate.modal.printTable.cellGetText({
                    head: 'Номер документа',
                    str: 1,
                    cell: 4,
                    value: data.visitor1.documentNumber,
                    timeout: entry.max
                });
                decorate.modal.printTable.cellGetText({
                    head: 'Шаблон доступа',
                    str: 1,
                    cell: 5,
                    value: '',
                    timeout: entry.max
                });
                decorate.modal.printTable.cellGetText({
                    head: 'Дата заказа',
                    str: 1,
                    cell: 6,
                    value: data.event1,
                    timeout: entry.max
                });
                decorate.modal.printTable.cellGetText({
                    head: 'Действует с',
                    str: 1,
                    cell: 7,
                    value: data.visitor1.dateIn.date + ':00',
                    timeout: entry.max
                });
                decorate.modal.printTable.cellGetText({
                    head: 'Действителен до',
                    str: 1,
                    cell: 8,
                    value: data.visitor1.dateAfter.date + ':00',
                    timeout: entry.max
                });
                decorate.modal.printTable.cellGetText({
                    head: 'Куда (подразделение)',
                    str: 1,
                    cell: 9,
                    value: data.visitor1.division,
                    timeout: entry.max
                });
                decorate.modal.printTable.cellGetText({
                    head: 'Карта',
                    str: 1,
                    cell: 10,
                    value: data.visitor1.card,
                    timeout: entry.max
                });
                decorate.modal.printTable.cellGetText({
                    head: 'Штрихкод',
                    str: 1,
                    cell: 11,
                    value: data.visitor1.barcode,
                    timeout: entry.max
                });
                decorate.modal.printTable.cellImg({
                    head: 'Фотография',
                    str: 1,
                    cell: 12,
                    timeout: entry.max
                });
            });

            describe('Закрытие печатной формы', () => {
                decorate.modal.printTable.closeHandler({
                    timeout: entry.max
                });
                decorate.modal.printTable.initClose({
                    timeout: entry.max
                });
            });
        }

        if(type === 'visitorActive') {
            befActive();
            aft();

            describe('Открытие печатной формы', () => {
                decorate.el.butIcBefore.handler({
                    icon: but.menu,
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.menu.menu({
                    timeout: entry.max
                });
                decorate.el.menu.handler({
                    name: 'Печать таблицы',
                    timeout: entry.max
                });
                decorate.modal.printTable.init({
                    timeout: entry.max
                });
            });

            describe('Проверка строки 1', () => {
                decorate.modal.printTable.cellGetText({
                    head: 'Посетитель',
                    str: 1,
                    cell: 1,
                    value: data.visitor1.fio,
                    timeout: entry.max
                });
                decorate.modal.printTable.cellGetText({
                    head: 'Сопровождающий',
                    str: 1,
                    cell: 2,
                    value: data.visitor1.staff,
                    timeout: entry.max
                });
                decorate.modal.printTable.cellGetText({
                    head: 'Документ',
                    str: 1,
                    cell: 3,
                    value: data.visitor1.document,
                    timeout: entry.max
                });
                decorate.modal.printTable.cellGetText({
                    head: 'Номер документа',
                    str: 1,
                    cell: 4,
                    value: data.visitor1.documentNumber,
                    timeout: entry.max
                });
                decorate.modal.printTable.cellGetText({
                    head: 'Блокировка',
                    str: 1,
                    cell: 5,
                    value: '',
                    timeout: entry.max
                });
                decorate.modal.printTable.cellGetText({
                    head: 'Дата заказа',
                    str: 1,
                    cell: 6,
                    value: data.event1,
                    timeout: entry.max
                });
                decorate.modal.printTable.cellGetText({
                    head: 'Действует с',
                    str: 1,
                    cell: 7,
                    value: data.visitor1.dateIn.date + ':00',
                    timeout: entry.max
                });
                decorate.modal.printTable.cellGetText({
                    head: 'Действителен до',
                    str: 1,
                    cell: 8,
                    value: data.visitor1.dateAfter.date + ':00',
                    timeout: entry.max
                });
                decorate.modal.printTable.cellGetText({
                    head: 'Куда (подразделение)',
                    str: 1,
                    cell: 9,
                    value: data.visitor1.division,
                    timeout: entry.max
                });
                decorate.modal.printTable.cellGetText({
                    head: 'Шаблон доступа',
                    str: 1,
                    cell: 10,
                    value: data.visitor1.template,
                    timeout: entry.max
                });
                decorate.modal.printTable.cellGetText({
                    head: 'Карта',
                    str: 1,
                    cell: 11,
                    value: data.visitor1.card,
                    timeout: entry.max
                });
                decorate.modal.printTable.cellGetText({
                    head: 'Штрихкод',
                    str: 1,
                    cell: 12,
                    value: data.visitor1.barcode,
                    timeout: entry.max
                });
                decorate.modal.printTable.cellImg({
                    head: 'Фотография',
                    str: 1,
                    cell: 13,
                    timeout: entry.max
                });
            });

            describe('Закрытие печатной формы', () => {
                decorate.modal.printTable.closeHandler({
                    timeout: entry.max
                });
                decorate.modal.printTable.initClose({
                    timeout: entry.max
                });
            });
        }

        if(type === 'visitorArchive') {
            befArchive();
            aft();

            describe('Открытие печатной формы', () => {
                decorate.el.butIcBefore.handler({
                    icon: but.menu,
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.menu.menu({
                    timeout: entry.max
                });
                decorate.el.menu.handler({
                    name: 'Печать таблицы',
                    timeout: entry.max
                });
                decorate.modal.printTable.init({
                    timeout: entry.max
                });
            });

            describe('Проверка строки 1', () => {
                decorate.modal.printTable.cellGetText({
                    head: 'Посетитель',
                    str: 1,
                    cell: 1,
                    value: data.visitor1.fio,
                    timeout: entry.max
                });
                decorate.modal.printTable.cellGetText({
                    head: 'Сопровождающий',
                    str: 1,
                    cell: 2,
                    value: data.visitor1.staff,
                    timeout: entry.max
                });
                decorate.modal.printTable.cellGetText({
                    head: 'Документ',
                    str: 1,
                    cell: 3,
                    value: data.visitor1.document,
                    timeout: entry.max
                });
                decorate.modal.printTable.cellGetText({
                    head: 'Номер документа',
                    str: 1,
                    cell: 4,
                    value: data.visitor1.documentNumber,
                    timeout: entry.max
                });
                decorate.modal.printTable.cellGetText({
                    head: 'Дата заказа',
                    str: 1,
                    cell: 5,
                    value: data.event1,
                    timeout: entry.max
                });
                decorate.modal.printTable.cellGetText({
                    head: 'Дата архивирования пропуска',
                    str: 1,
                    cell: 6,
                    value: data.event2,
                    timeout: entry.max
                });
                decorate.modal.printTable.cellGetText({
                    head: 'Куда (подразделение)',
                    str: 1,
                    cell: 7,
                    value: data.visitor1.division,
                    timeout: entry.max
                });

                decorate.modal.printTable.cellImg({
                    head: 'Фотография',
                    str: 1,
                    cell: 8,
                    timeout: entry.max
                });
            });

            describe('Закрытие печатной формы', () => {
                decorate.modal.printTable.closeHandler({
                    timeout: entry.max
                });
                decorate.modal.printTable.initClose({
                    timeout: entry.max
                });
            });
        }

        if(type === 'visitorPassOrder') {
            befPassOrder();
            aft();

            describe('Открытие печатной формы', () => {
                decorate.page.base.loading({
                    timeout: 5000
                });
                decorate.el.butIcBefore.handler({
                    icon: but.menu,
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: 2000
                });
                decorate.el.menu.menu({
                    timeout: entry.max
                });
                decorate.el.menu.handler({
                    name: 'Печать таблицы',
                    timeout: entry.max
                });
                decorate.modal.printTable.init({
                    timeout: entry.max
                });
            });

            describe('Проверка строки 1', () => {
                decorate.modal.printTable.cellGetText({
                    head: 'Посетитель',
                    str: 1,
                    cell: 1,
                    value: data.visitor1.fio,
                    timeout: entry.max
                });
                decorate.modal.printTable.cellGetText({
                    head: 'Сопровождающий',
                    str: 1,
                    cell: 2,
                    value: data.visitor1.staff,
                    timeout: entry.max
                });
                decorate.modal.printTable.cellGetText({
                    head: 'Документ',
                    str: 1,
                    cell: 3,
                    value: data.visitor1.document,
                    timeout: entry.max
                });
                decorate.modal.printTable.cellGetText({
                    head: 'Номер документа',
                    str: 1,
                    cell: 4,
                    value: data.visitor1.documentNumber,
                    timeout: entry.max
                });
                decorate.modal.printTable.cellGetText({
                    head: 'Дата заказа',
                    str: 1,
                    cell: 5,
                    value: data.event1,
                    timeout: entry.max
                });
                decorate.modal.printTable.cellGetText({
                    head: 'Куда (подразделение)',
                    str: 1,
                    cell: 6,
                    value: data.visitor1.division,
                    timeout: entry.max
                });
                decorate.modal.printTable.cellImg({
                    head: 'Фотография',
                    str: 1,
                    cell: 7,
                    timeout: entry.max
                });
            });

            describe('Закрытие печатной формы', () => {
                decorate.modal.printTable.closeHandler({
                    timeout: entry.max
                });
                decorate.modal.printTable.initClose({
                    timeout: entry.max
                });
            });
        }

        if(type === 'visitorPassArchive') {
            befPassArchive();
            aft();

            describe('Открытие печатной формы', () => {
                decorate.el.butIcBefore.handler({
                    icon: but.menu,
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.menu.menu({
                    timeout: entry.max
                });
                decorate.el.menu.handler({
                    name: 'Печать таблицы',
                    timeout: entry.max
                });
                decorate.modal.printTable.init({
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
            });

            describe('Проверка строки 1', () => {
                decorate.modal.printTable.cellGetText({
                    head: 'Посетитель',
                    str: 1,
                    cell: 1,
                    value: data.visitor1.fio,
                    timeout: entry.max
                });
                decorate.modal.printTable.cellGetText({
                    head: 'Сопровождающий',
                    str: 1,
                    cell: 2,
                    value: data.visitor1.staff,
                    timeout: entry.max
                });
                decorate.modal.printTable.cellGetText({
                    head: 'Документ',
                    str: 1,
                    cell: 3,
                    value: data.visitor1.document,
                    timeout: entry.max
                });
                decorate.modal.printTable.cellGetText({
                    head: 'Номер документа',
                    str: 1,
                    cell: 4,
                    value: data.visitor1.documentNumber,
                    timeout: entry.max
                });
                decorate.modal.printTable.cellGetText({
                    head: 'Дата заказа',
                    str: 1,
                    cell: 5,
                    value: data.event1,
                    timeout: entry.max
                });
                decorate.modal.printTable.cellGetText({
                    head: 'Дата архивирования пропуска',
                    str: 1,
                    cell: 6,
                    value: data.event2,
                    timeout: entry.max
                });
                decorate.modal.printTable.cellGetText({
                    head: 'Куда (подразделение)',
                    str: 1,
                    cell: 7,
                    value: data.visitor1.division,
                    timeout: entry.max
                });
                decorate.modal.printTable.cellImg({
                    head: 'Фотография',
                    str: 1,
                    cell: 8,
                    timeout: entry.max
                });
            });

            describe('Закрытие печатной формы', () => {
                decorate.modal.printTable.closeHandler({
                    timeout: entry.max
                });
                decorate.modal.printTable.initClose({
                    timeout: entry.max
                });
            });
        }

    });

    const exportXLSXVisitorMaxParams = () => describe(text + 'Проверка экспорта XLSX.', () => {

        const params = {
            nameFile: 'visitor.xlsx',
            nameFilePass: 'passorder.xlsx',
            jsonVisitorOrdered: [
                {
                    'Отчет "Посетители (Заказные)"': "Подразделение: 'division1, division2, division3, Администраторы системы'"
                },
                {
                    'Отчет "Посетители (Заказные)"': 'Фамилия',
                    __EMPTY: 'Имя',
                    __EMPTY_1: 'Отчество',
                    __EMPTY_2: 'Сопровождающий',
                    __EMPTY_3: 'Документ',
                    __EMPTY_4: 'Номер документа',
                    __EMPTY_5: 'Подразделение',
                    __EMPTY_6: 'Дата заказа',
                    __EMPTY_7: 'Действителен до',
                    __EMPTY_8: 'Шаблон доступа',
                    __EMPTY_9: 'Карта',
                    __EMPTY_10: 'Штрих-код',
                    __EMPTY_11: 'Фото'
                },
                {
                    'Отчет "Посетители (Заказные)"': 'last1',
                    __EMPTY: 'name1',
                    __EMPTY_1: 'middle1',
                    __EMPTY_2: 'staff name 1',
                    __EMPTY_3: 'passport',
                    __EMPTY_4: '2202 191535',
                    __EMPTY_5: 'division1',
                    __EMPTY_6: data.event1,
                    __EMPTY_7: '2033-06-01 23:59:00',
                    __EMPTY_8: '',
                    __EMPTY_9: '1',
                    __EMPTY_10: '2184201005502',
                    __EMPTY_11: 'Есть'
                }
            ],
            jsonVisitorActive: [
                {
                    'Отчет "Посетители (Действующие)"': "Подразделение: 'division1, division2, division3, Администраторы системы'"
                },
                {
                    'Отчет "Посетители (Действующие)"': 'Фамилия',
                    __EMPTY: 'Имя',
                    __EMPTY_1: 'Отчество',
                    __EMPTY_2: 'Блокировка',
                    __EMPTY_3: 'Сопровождающий',
                    __EMPTY_4: 'Документ',
                    __EMPTY_5: 'Номер документа',
                    __EMPTY_6: 'Подразделение',
                    __EMPTY_7: 'Дата заказа',
                    __EMPTY_8: 'Действителен до',
                    __EMPTY_9: 'Шаблон доступа',
                    __EMPTY_10: 'Карта',
                    __EMPTY_11: 'Штрих-код',
                    __EMPTY_12: 'Фото'
                },
                {
                    'Отчет "Посетители (Действующие)"': 'last1',
                    __EMPTY: 'name1',
                    __EMPTY_1: 'middle1',
                    __EMPTY_2: '',
                    __EMPTY_3: 'staff name 1',
                    __EMPTY_4: 'passport',
                    __EMPTY_5: '2202 191535',
                    __EMPTY_6: 'division1',
                    __EMPTY_7: data.event1,
                    __EMPTY_8: '2033-06-01 23:59:00',
                    __EMPTY_9: 'template1',
                    __EMPTY_10: '1',
                    __EMPTY_11: '2184201005502',
                    __EMPTY_12: 'Есть'
                }
            ],
            jsonVisitorArchive: [
                {
                    'Отчет "Посетители (Архив)"': "Подразделение: 'division1, division2, division3, Администраторы системы'"
                },
                {
                    'Отчет "Посетители (Архив)"': 'Фамилия',
                    __EMPTY: 'Имя',
                    __EMPTY_1: 'Отчество',
                    __EMPTY_2: 'Сопровождающий',
                    __EMPTY_3: 'Документ',
                    __EMPTY_4: 'Номер документа',
                    __EMPTY_5: 'Подразделение',
                    __EMPTY_6: 'Дата заказа',
                    __EMPTY_7: 'Дата архивирования пропуска',
                    __EMPTY_8: 'Фото'
                },
                {
                    'Отчет "Посетители (Архив)"': 'last1',
                    __EMPTY: 'name1',
                    __EMPTY_1: 'middle1',
                    __EMPTY_2: 'staff name 1',
                    __EMPTY_3: 'passport',
                    __EMPTY_4: '2202 191535',
                    __EMPTY_5: 'division1',
                    __EMPTY_6: data.event1,
                    __EMPTY_7: data.event2,
                    __EMPTY_8: 'Есть'
                }
            ],
            jsonVisitorPassOrdered:   [
                {
                    'Отчет "Список заказанных пропусков"': 'Фамилия',
                    __EMPTY: 'Имя',
                    __EMPTY_1: 'Отчество',
                    __EMPTY_2: 'Сопровождающий',
                    __EMPTY_3: 'Документ',
                    __EMPTY_4: 'Номер документа',
                    __EMPTY_5: 'Куда (подразделение)',
                    __EMPTY_6: 'Дата заказа'
                },
                {
                    'Отчет "Список заказанных пропусков"': 'last1',
                    __EMPTY: 'name1',
                    __EMPTY_1: 'middle1',
                    __EMPTY_2: 'staff name 1',
                    __EMPTY_3: 'passport',
                    __EMPTY_4: '2202 191535',
                    __EMPTY_5: 'division1',
                    __EMPTY_6: data.event1
                }
            ],
            jsonVisitorPassArchive: [
                {
                    'Отчет "Посетители (Архив)"': "Подразделение: 'division1, division2, division3, Администраторы системы'"
                },
                {
                    'Отчет "Посетители (Архив)"': 'Фамилия',
                    __EMPTY: 'Имя',
                    __EMPTY_1: 'Отчество',
                    __EMPTY_2: 'Сопровождающий',
                    __EMPTY_3: 'Документ',
                    __EMPTY_4: 'Номер документа',
                    __EMPTY_5: 'Подразделение',
                    __EMPTY_6: 'Дата заказа',
                    __EMPTY_7: 'Дата архивирования пропуска',
                    __EMPTY_8: 'Фото'
                },
                {
                    'Отчет "Посетители (Архив)"': 'last1',
                    __EMPTY: 'name1',
                    __EMPTY_1: 'middle1',
                    __EMPTY_2: 'staff name 1',
                    __EMPTY_3: 'passport',
                    __EMPTY_4: '2202 191535',
                    __EMPTY_5: 'division1',
                    __EMPTY_6: data.event1,
                    __EMPTY_7: data.event2,
                    __EMPTY_8: 'Есть'
                }
            ]
        }

        if(type === 'visitorOrder') {
            befOrdered();
            aft();

            describe('Экспорт', () => {
                decorate.el.butIcBefore.handler({
                    icon: but.menu,
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.menu.menu({
                    timeout: entry.max
                });
                decorate.el.menu.handler({
                    name: 'Экспорт',
                    timeout: entry.max
                });
                decorate.modal.exportData.init({
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.select.iconXpand({
                    title: 'Выберите тип файла для экспорта',
                    value: 'XLSX',
                    text: 'XLSX',
                    timeout: entry.max
                });
                decorate.el.input.getValue({
                    title: 'Имя выходного файла',
                    placeholder: 'Определяется системой',
                    value: '',
                    timeout: entry.max
                });
                decorate.el.select.iconXpand({
                    title: 'Заголовок',
                    value: 'Добавить заголовок к файлу',
                    text: 'Добавить заголовок к файлу',
                    timeout: entry.max
                });
                decorate.el.button.handler({
                    name: 'Экспортировать',
                    timeout: entry.max
                });
                decorate.modal.exportData.initClose({
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
            });

            describe('Проверка файла', () => {
                decorate.el.file.display({
                    file: params.nameFile,
                    timeout: entry.upload
                });
                decorate.el.file.comparison({
                    file: params.nameFile,
                    json: params.jsonVisitorOrdered
                });
                decorate.el.file.delete({
                    file: params.nameFile,
                    timeout: entry.upload
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
            });
        }

        if(type === 'visitorActive') {
            befActive();
            aft();

            describe('Экспорт', () => {
                decorate.el.butIcBefore.handler({
                    icon: but.menu,
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.menu.menu({
                    timeout: entry.max
                });
                decorate.el.menu.handler({
                    name: 'Экспорт',
                    timeout: entry.max
                });
                decorate.modal.exportData.init({
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.select.iconXpand({
                    title: 'Выберите тип файла для экспорта',
                    value: 'XLSX',
                    text: 'XLSX',
                    timeout: entry.max
                });
                decorate.el.input.getValue({
                    title: 'Имя выходного файла',
                    placeholder: 'Определяется системой',
                    value: '',
                    timeout: entry.max
                });
                decorate.el.select.iconXpand({
                    title: 'Заголовок',
                    value: 'Добавить заголовок к файлу',
                    text: 'Добавить заголовок к файлу',
                    timeout: entry.max
                });
                decorate.el.button.handler({
                    name: 'Экспортировать',
                    timeout: entry.max
                });
                decorate.modal.exportData.initClose({
                    timeout: entry.max
                });
            });

            describe('Проверка файла', () => {
                decorate.el.file.display({
                    file: params.nameFile,
                    timeout: entry.upload
                });
                decorate.el.file.comparison({
                    file: params.nameFile,
                    json: params.jsonVisitorActive
                });
                decorate.el.file.delete({
                    file: params.nameFile,
                    timeout: entry.upload
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
            });
        }

        if(type === 'visitorArchive') {
            befArchive();
            aft();

            describe('Экспорт', () => {
                decorate.el.butIcBefore.handler({
                    icon: but.menu,
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.menu.menu({
                    timeout: entry.max
                });
                decorate.el.menu.handler({
                    name: 'Экспорт',
                    timeout: entry.max
                });
                decorate.modal.exportData.init({
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.select.iconXpand({
                    title: 'Выберите тип файла для экспорта',
                    value: 'XLSX',
                    text: 'XLSX',
                    timeout: entry.max
                });
                decorate.el.input.getValue({
                    title: 'Имя выходного файла',
                    placeholder: 'Определяется системой',
                    value: '',
                    timeout: entry.max
                });
                decorate.el.select.iconXpand({
                    title: 'Заголовок',
                    value: 'Добавить заголовок к файлу',
                    text: 'Добавить заголовок к файлу',
                    timeout: entry.max
                });
                decorate.el.button.handler({
                    name: 'Экспортировать',
                    timeout: entry.max
                });
                decorate.modal.exportData.initClose({
                    timeout: entry.max
                });
            });

            describe('Проверка файла', () => {
                decorate.el.file.display({
                    file: params.nameFile,
                    timeout: entry.upload
                });
                decorate.el.file.comparison({
                    file: params.nameFile,
                    json: params.jsonVisitorArchive
                });
                decorate.el.file.delete({
                    file: params.nameFile,
                    timeout: entry.upload
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
            });
        }

        if(type === 'visitorPassOrder') {
            befPassOrder();
            aft();

            describe('Экспорт', () => {
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.butIcBefore.handler({
                    icon: but.menu,
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.menu.menu({
                    timeout: entry.max
                });
                decorate.el.menu.handler({
                    name: 'Экспорт',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.modal.exportData.init({
                    timeout: entry.max
                });
                decorate.el.select.iconXpand({
                    title: 'Выберите тип файла для экспорта',
                    value: 'XLSX',
                    text: 'XLSX',
                    timeout: entry.max
                });
                decorate.el.input.getValue({
                    title: 'Имя выходного файла',
                    placeholder: 'Определяется системой',
                    value: '',
                    timeout: entry.max
                });
                decorate.el.select.iconXpand({
                    title: 'Заголовок',
                    value: 'Добавить заголовок к файлу',
                    text: 'Добавить заголовок к файлу',
                    timeout: entry.max
                });
                decorate.el.button.handler({
                    name: 'Экспортировать',
                    timeout: entry.max
                });
                decorate.modal.exportData.initClose({
                    timeout: entry.max
                });
            });

            describe('Проверка файла', () => {
                decorate.el.file.display({
                    file: params.nameFilePass,
                    timeout: entry.upload
                });
                decorate.el.file.comparison({
                    file: params.nameFilePass,
                    json: params.jsonVisitorPassOrdered
                });
                decorate.el.file.delete({
                    file: params.nameFilePass,
                    timeout: entry.upload
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
            });
        }

        if(type === 'visitorPassArchive') {
            befPassArchive();
            aft();

            describe('Экспорт', () => {
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.butIcBefore.handler({
                    icon: but.menu,
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.menu.menu({
                    timeout: entry.max
                });
                decorate.el.menu.handler({
                    name: 'Экспорт',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.modal.exportData.init({
                    timeout: entry.max
                });
                decorate.el.select.iconXpand({
                    title: 'Выберите тип файла для экспорта',
                    value: 'XLSX',
                    text: 'XLSX',
                    timeout: entry.max
                });
                decorate.el.input.getValue({
                    title: 'Имя выходного файла',
                    placeholder: 'Определяется системой',
                    value: '',
                    timeout: entry.max
                });
                decorate.el.select.iconXpand({
                    title: 'Заголовок',
                    value: 'Добавить заголовок к файлу',
                    text: 'Добавить заголовок к файлу',
                    timeout: entry.max
                });
                decorate.el.button.handler({
                    name: 'Экспортировать',
                    timeout: entry.max
                });
                decorate.modal.exportData.initClose({
                    timeout: entry.max
                });
            });

            describe('Проверка файла', () => {
                decorate.el.file.display({
                    file: params.nameFile,
                    timeout: entry.upload
                });
                decorate.el.file.comparison({
                    file: params.nameFile,
                    json: params.jsonVisitorPassArchive
                });
                decorate.el.file.delete({
                    file: params.nameFile,
                    timeout: entry.upload
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
            });
        }
    });

    const exportCSVVisitorMaxParams = () => describe(text + 'Проверка экспорта CSV.', () => {

        const params = {
            nameFile: 'visitor.csv',
            nameFilePass: 'passorder.csv',
            jsonVisitorOrdered: [
                {
                    'Фамилия': 'last1',
                    'Имя': 'name1',
                    'Отчество': 'middle1',
                    'Сопровождающий': 'staff name 1',
                    'Документ': 'passport',
                    'Номер документа': '2202 191535',
                    'Подразделение': 'division1',
                    'Дата заказа': data.event1,
                    'Действителен до': '2033-06-01 23:59:00',
                    'Карта': 1,
                    'Штрих-код': 2184201005502,
                    'Фото': 'Есть'
                }
            ],
            jsonVisitorActive: [
                {
                    'Фамилия': 'last1',
                    'Имя': 'name1',
                    'Отчество': 'middle1',
                    'Сопровождающий': 'staff name 1',
                    'Документ': 'passport',
                    'Номер документа': '2202 191535',
                    'Подразделение': 'division1',
                    'Дата заказа': data.event1,
                    'Действителен до': '2033-06-01 23:59:00',
                    'Шаблон доступа': 'template1',
                    'Карта': 1,
                    'Штрих-код': 2184201005502,
                    'Фото': 'Есть'
                }
            ],
            jsonVisitorArchive: [
                {
                    'Фамилия': 'last1',
                    'Имя': 'name1',
                    'Отчество': 'middle1',
                    'Сопровождающий': 'staff name 1',
                    'Документ': 'passport',
                    'Номер документа': '2202 191535',
                    'Подразделение': 'division1',
                    'Дата заказа': data.event1,
                    'Дата архивирования пропуска': data.event2,
                    'Фото': 'Есть'
                }
            ],
            jsonVisitorPassOrdered: [
                {
                    'Фамилия': 'last1',
                    'Имя': 'name1',
                    'Отчество': 'middle1',
                    'Сопровождающий': 'staff name 1',
                    'Документ': 'passport',
                    'Номер документа': '2202 191535',
                    'Куда (подразделение)': 'division1',
                    'Дата заказа': data.event1
                }
            ],
            jsonVisitorPassArchive: [
                {
                    'Фамилия': 'last1',
                    'Имя': 'name1',
                    'Отчество': 'middle1',
                    'Сопровождающий': 'staff name 1',
                    'Документ': 'passport',
                    'Номер документа': '2202 191535',
                    'Подразделение': 'division1',
                    'Дата заказа': data.event1,
                    'Дата архивирования пропуска': data.event2,
                    'Фото': 'Есть'
                }
            ],
        }

        if(type === 'visitorOrder') {
            befOrdered();
            aft();

            describe('Экспорт', () => {
                decorate.el.butIcBefore.handler({
                    icon: but.menu,
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.menu.menu({
                    timeout: entry.max
                });
                decorate.el.menu.menu({
                    timeout: entry.max
                });
                decorate.el.menu.handler({
                    name: 'Экспорт',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.modal.exportData.init({
                    timeout: entry.max
                });
                decorate.el.select.iconXpand({
                    title: 'Выберите тип файла для экспорта',
                    value: 'XLSX',
                    text: 'CSV',
                    timeout: entry.max
                });
                decorate.el.input.getValue({
                    title: 'Имя выходного файла',
                    placeholder: 'Определяется системой',
                    value: '',
                    timeout: entry.max
                });
                decorate.el.button.handler({
                    name: 'Экспортировать',
                    timeout: entry.max
                });
                decorate.modal.exportData.initClose({
                    timeout: entry.max
                });
            });

            describe('Проверка файла', () => {
                decorate.el.file.display({
                    file: params.nameFile,
                    timeout: entry.upload
                });
                decorate.el.file.comparison({
                    file: params.nameFile,
                    json: params.jsonVisitorOrdered
                });
                decorate.el.file.delete({
                    file: params.nameFile,
                    timeout: entry.upload
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
            });
        }

        if(type === 'visitorActive') {
            befActive();
            aft();

            describe('Экспорт', () => {
                decorate.el.butIcBefore.handler({
                    icon: but.menu,
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.menu.menu({
                    timeout: entry.max
                });
                decorate.el.menu.menu({
                    timeout: entry.max
                });
                decorate.el.menu.handler({
                    name: 'Экспорт',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.modal.exportData.init({
                    timeout: entry.max
                });
                decorate.el.select.iconXpand({
                    title: 'Выберите тип файла для экспорта',
                    value: 'XLSX',
                    text: 'CSV',
                    timeout: entry.max
                });
                decorate.el.input.getValue({
                    title: 'Имя выходного файла',
                    placeholder: 'Определяется системой',
                    value: '',
                    timeout: entry.max
                });
                decorate.el.button.handler({
                    name: 'Экспортировать',
                    timeout: entry.max
                });
                decorate.modal.exportData.initClose({
                    timeout: entry.max
                });
            });

            describe('Проверка файла', () => {
                decorate.el.file.display({
                    file: params.nameFile,
                    timeout: entry.upload
                });
                decorate.el.file.comparison({
                    file: params.nameFile,
                    json: params.jsonVisitorActive
                });
                decorate.el.file.delete({
                    file: params.nameFile,
                    timeout: entry.upload
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
            });
        }

        if(type === 'visitorArchive') {
            befArchive();
            aft();

            describe('Экспорт', () => {
                decorate.el.butIcBefore.handler({
                    icon: but.menu,
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.menu.menu({
                    timeout: entry.max
                });
                decorate.el.menu.menu({
                    timeout: entry.max
                });
                decorate.el.menu.handler({
                    name: 'Экспорт',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.modal.exportData.init({
                    timeout: entry.max
                });
                decorate.el.select.iconXpand({
                    title: 'Выберите тип файла для экспорта',
                    value: 'XLSX',
                    text: 'CSV',
                    timeout: entry.max
                });
                decorate.el.input.getValue({
                    title: 'Имя выходного файла',
                    placeholder: 'Определяется системой',
                    value: '',
                    timeout: entry.max
                });
                decorate.el.button.handler({
                    name: 'Экспортировать',
                    timeout: entry.max
                });
                decorate.modal.exportData.initClose({
                    timeout: entry.max
                });
            });

            describe('Проверка файла', () => {
                decorate.el.file.display({
                    file: params.nameFile,
                    timeout: entry.upload
                });
                decorate.el.file.comparison({
                    file: params.nameFile,
                    json: params.jsonVisitorArchive
                });
                decorate.el.file.delete({
                    file: params.nameFile,
                    timeout: entry.upload
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
            });
        }

        if(type === 'visitorPassOrder') {
            befPassOrder();
            aft();

            describe('Экспорт', () => {
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.butIcBefore.handler({
                    icon: but.menu,
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.menu.menu({
                    timeout: entry.max
                });
                decorate.el.menu.menu({
                    timeout: entry.max
                });
                decorate.el.menu.handler({
                    name: 'Экспорт',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.modal.exportData.init({
                    timeout: entry.max
                });
                decorate.el.select.iconXpand({
                    title: 'Выберите тип файла для экспорта',
                    value: 'XLSX',
                    text: 'CSV',
                    timeout: entry.max
                });
                decorate.el.input.getValue({
                    title: 'Имя выходного файла',
                    placeholder: 'Определяется системой',
                    value: '',
                    timeout: entry.max
                });
                decorate.el.button.handler({
                    name: 'Экспортировать',
                    timeout: entry.max
                });
                decorate.modal.exportData.initClose({
                    timeout: entry.max
                });
            });

            describe('Проверка файла', () => {
                decorate.el.file.display({
                    file: params.nameFilePass,
                    timeout: entry.upload
                });
                decorate.el.file.comparison({
                    file: params.nameFilePass,
                    json: params.jsonVisitorPassOrdered
                });
                decorate.el.file.delete({
                    file: params.nameFilePass,
                    timeout: entry.upload
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
            });
        }

        if(type === 'visitorPassArchive') {
            befPassArchive();
            aft();

            describe('Экспорт', () => {
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.butIcBefore.handler({
                    icon: but.menu,
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.menu.menu({
                    timeout: entry.max
                });
                decorate.el.menu.menu({
                    timeout: entry.max
                });
                decorate.el.menu.handler({
                    name: 'Экспорт',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.modal.exportData.init({
                    timeout: entry.max
                });
                decorate.el.select.iconXpand({
                    title: 'Выберите тип файла для экспорта',
                    value: 'XLSX',
                    text: 'CSV',
                    timeout: entry.max
                });
                decorate.el.input.getValue({
                    title: 'Имя выходного файла',
                    placeholder: 'Определяется системой',
                    value: '',
                    timeout: entry.max
                });
                decorate.el.button.handler({
                    name: 'Экспортировать',
                    timeout: entry.max
                });
                decorate.modal.exportData.initClose({
                    timeout: entry.max
                });
            });

            describe('Проверка файла', () => {
                decorate.el.file.display({
                    file: params.nameFile,
                    timeout: entry.upload
                });
                decorate.el.file.comparison({
                    file: params.nameFile,
                    json: params.jsonVisitorPassArchive
                });
                decorate.el.file.delete({
                    file: params.nameFile,
                    timeout: entry.upload
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
            });
        }
    });

    const printBarcodeVisitorMaxParams = () => describe(text + 'Проверка печати "Печать штрихкода".', () => {

        if(type === 'visitorOrder') {
            befOrdered();
            aft();

            describe('Открытие модального окна "Печать штрихкода"', () => {
                decorate.el.table.strHandler({
                    strNumber: 1,
                    timeout: entry.max
                });
                decorate.el.butIcBefore.handler({
                    icon: but.menu,
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.menu.menu({
                    timeout: entry.max
                });
                decorate.el.menu.handler({
                    name: 'Печать штрихкода',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.modal.printVisitorBarcode.init({
                    timeout: entry.max
                });
            });

            describe('Проверка отображения данных в модальном окне "Печать штрихкода"', () => {
                decorate.modal.printVisitorBarcode.data({
                    title: 'Фамилия',
                    value: data.visitor1.lastName,
                    number: 1,
                    timeout: entry.max
                });
                decorate.modal.printVisitorBarcode.data({
                    title: 'Имя',
                    value: data.visitor1.firstName,
                    number: 2,
                    timeout: entry.max
                });
                decorate.modal.printVisitorBarcode.data({
                    title: 'Отчество',
                    value: data.visitor1.middleName,
                    number: 3,
                    timeout: entry.max
                });
                decorate.el.button.button({
                    name: 'Отмена',
                    timeout: entry.max
                });
                decorate.el.button.active({
                    name: 'Печать',
                    timeout: entry.max
                });
            });

            describe('Закрытие модального окна "Печать штрихкода"', () => {
                decorate.modal.printVisitorBarcode.closeHandler({
                    timeout: entry.max
                });
                decorate.modal.printVisitorBarcode.initClose({
                    timeout: entry.max
                });
            });
        }

    });

    const printDesignCardVisitorMaxParams = () => describe(text + 'Проверка "Печать пропуска".', () => {

        if(type === 'visitorOrder') {
            befOrdered();
            aft();

            describe('Открытие модального окна "Печать пропуска"', () => {
                decorate.el.table.strHandler({
                    strNumber: 1,
                    timeout: entry.max
                });
                decorate.el.butIcBefore.handler({
                    icon: but.unsorted_user_card_outline,
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.modal.printDesignCard.init({
                    timeout: entry.max
                });
            });

            describe('Проверка отображения данных в модальном окне "Печать пропуска"', () => {
                decorate.el.select.select({
                    title: 'Шаблон',
                    value: '',
                    timeout: entry.max
                });
                decorate.el.select.iconXpand({
                    title: 'Рамка',
                    value: 'Стандартный',
                    text: 'Пунктир',
                    timeout: entry.max
                });
                decorate.el.button.button({
                    name: 'Отмена',
                    timeout: entry.max
                });
                decorate.el.button.active({
                    name: 'Печать',
                    timeout: entry.max
                });
            });

            describe('Закрытие модального окна "Печать пропуска"', () => {
                decorate.modal.printDesignCard.closeHandler({
                    timeout: entry.max
                });
                decorate.modal.printDesignCard.initClose({
                    timeout: entry.max
                });
            });
        }

    });

    const currentVisitorMaxParamsFromOrder = () => describe('Бюро пропусков / Посетители - вкладка - Заказанные. ' +
        'Проверка перехода посетителя из вкладки Заказанные на вкладку Действующую и обратно.', () => {

        describe('Бюро пропусков / Посетители - вкладка - Заказанные. Редактирование', () => {
            befOrdered();
            aft();

            decorate.el.table.strHandler({
                strNumber: 1,
                timeout: entry.max
            });
            decorate.el.butIcBefore.handler({
                icon: but.edit,
                timeout: entry.max
            });
            decorate.page.visitorChange.initEdit({
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });

            decorate.el.selectInput.iconXpand({
                title: 'Шаблон доступа',
                placeholder: 'Шаблон доступа',
                timeout: entry.max
            });
            decorate.el.selectXpand.xpand({
                timeout: entry.max
            });
            decorate.el.selectXpand.handler({
                value: data.visitor1.template,
                timeout: entry.max
            });
            decorate.el.selectXpand.xpandNoElement({
                timeout: entry.max
            });

            decorate.el.button.handler({
                name: 'Сохранить изменения',
                timeout: entry.max
            });
            decorate.el.success.success({
                text: 'Данные успешно изменены',
                timeout: entry.max
            });
            decorate.el.button.handler({
                name: 'Вернуться к списку посетителей',
                timeout: entry.max
            });
            decorate.page.visitorOrder.init({
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
            decorate.el.table.noStr({
                timeout: entry.max
            });
        });

        describe('Проверка таблицы Бюро пропусков / Посетители - вкладка - Действующие', () => {
            befActive();
            aft();
            decorate.el.table.size({
                strCount: 1,
                timeout: entry.max
            });
            decorate.el.table.cellGetText({
                headTitle: 'Посетитель',
                strNumber: 1,
                cellNumber: 2,
                value: data.visitor1.fio,
                timeout: entry.max
            });
            decorate.el.table.cellGetText({
                headTitle: 'Сопровождающий',
                strNumber: 1,
                cellNumber: 3,
                value: data.visitor1.staff,
                timeout: entry.max
            });
            decorate.el.table.cellGetText({
                headTitle: 'Документ',
                strNumber: 1,
                cellNumber: 4,
                value: data.visitor1.document,
                timeout: entry.max
            });
            decorate.el.table.cellGetText({
                headTitle: 'Номер документа',
                strNumber: 1,
                cellNumber: 5,
                value: data.visitor1.documentNumber,
                timeout: entry.max
            });
            decorate.el.table.cellNoIconLock({
                strNumber: 1,
                cellNumber: 6,
                timeout: entry.max
            });
            decorate.el.table.cellGetText({
                headTitle: 'Дата заказа',
                strNumber: 1,
                cellNumber: 7,
                value: data.event1,
                timeout: entry.max
            });
            decorate.el.table.cellGetText({
                headTitle: 'Действует с',
                strNumber: 1,
                cellNumber: 8,
                value: data.visitor1.dateIn.date + ':00',
                timeout: entry.max
            });
            decorate.el.table.cellGetText({
                headTitle: 'Действителен до',
                strNumber: 1,
                cellNumber: 9,
                value: data.visitor1.dateAfter.date + ':00',
                timeout: entry.max
            });
            decorate.el.table.cellGetText({
                headTitle: 'Куда (подразделение)',
                strNumber: 1,
                cellNumber: 10,
                value: data.visitor1.division,
                timeout: entry.max
            });
            decorate.el.table.cellGetText({
                headTitle: 'Шаблон доступа',
                strNumber: 1,
                cellNumber: 11,
                value: data.visitor1.template,
                timeout: entry.max
            });
            decorate.el.table.cellGetText({
                headTitle: 'Карта',
                strNumber: 1,
                cellNumber: 12,
                value: data.visitor1.card,
                timeout: entry.max
            });
            decorate.el.table.cellGetText({
                headTitle: 'Штрихкод',
                strNumber: 1,
                cellNumber: 13,
                value: data.visitor1.barcode,
                timeout: entry.max
            });
        });

        describe('Бюро пропусков / Посетители - вкладка - Действующие. Редактирование', () => {
            befActive();
            aft();
            decorate.el.table.strHandler({
                strNumber: 1,
                timeout: entry.max
            });
            decorate.el.butIcBefore.handler({
                icon: but.edit,
                timeout: entry.max
            });
            decorate.page.visitorChange.initEdit({
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
            decorate.el.selectInput.iconClear({
                title: 'Шаблон доступа',
                placeholder: 'Шаблон доступа',
                timeout: entry.max
            });
            decorate.el.button.handler({
                name: 'Сохранить изменения',
                timeout: entry.max
            });
            decorate.el.success.success({
                text: 'Данные успешно изменены',
                timeout: entry.max
            });
            decorate.el.button.handler({
                name: 'Вернуться к списку посетителей',
                timeout: entry.max
            });
            decorate.page.visitorCurrent.init({
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
            decorate.el.table.noStr({
                timeout: entry.max
            });
        });

        describe('Проверка таблицы', () => {
            befOrdered();
            aft();
            decorate.el.table.size({
                strCount: 1,
                timeout: entry.max
            });
            decorate.el.table.cellGetText({
                headTitle: 'Посетитель',
                strNumber: 1,
                cellNumber: 1,
                value: data.visitor1.fio,
                timeout: entry.max
            });
            decorate.el.table.cellGetText({
                headTitle: 'Сопровождающий',
                strNumber: 1,
                cellNumber: 2,
                value: data.visitor1.staff,
                timeout: entry.max
            });
            decorate.el.table.cellGetText({
                headTitle: 'Документ',
                strNumber: 1,
                cellNumber: 3,
                value: data.visitor1.document,
                timeout: entry.max
            });
            decorate.el.table.cellGetText({
                headTitle: 'Номер документа',
                strNumber: 1,
                cellNumber: 4,
                value: data.visitor1.documentNumber,
                timeout: entry.max
            });
            decorate.el.table.cellGetText({
                headTitle: 'Шаблон доступа',
                strNumber: 1,
                cellNumber: 5,
                value: '',
                timeout: entry.max
            });
            decorate.el.table.cellGetText({
                headTitle: 'Дата заказа',
                strNumber: 1,
                cellNumber: 6,
                value: data.event1,
                timeout: entry.max
            });
            decorate.el.table.cellGetText({
                headTitle: 'Действует с',
                strNumber: 1,
                cellNumber: 7,
                value: data.visitor1.dateIn.date + ':00',
                timeout: entry.max
            });
            decorate.el.table.cellGetText({
                headTitle: 'Действителен до',
                strNumber: 1,
                cellNumber: 8,
                value: data.visitor1.dateAfter.date + ':00',
                timeout: entry.max
            });
            decorate.el.table.cellGetText({
                headTitle: 'Куда (подразделение)',
                strNumber: 1,
                cellNumber: 9,
                value: data.visitor1.division,
                timeout: entry.max
            });
            decorate.el.table.cellGetText({
                headTitle: 'Карта',
                strNumber: 1,
                cellNumber: 10,
                value: data.visitor1.card,
                timeout: entry.max
            });
            decorate.el.table.cellGetText({
                headTitle: 'Штрихкод',
                strNumber: 1,
                cellNumber: 11,
                value: data.visitor1.barcode,
                timeout: entry.max
            });
            decorate.el.table.cellImg({
                headTitle: 'Фотография',
                strNumber: 1,
                cellNumber: 12,
                timeout: entry.max
            });
        });
    });

    const archiveVisitorMaxParamsFromOrder = () => describe(text +
        'Добавление посетителя в архив и восстановление из архива.', () => {

        if(type === 'visitorOrder') {
            describe('Добавление в Архив', () => {
                befOrdered();
                aft();
                decorate.el.table.strHandler({
                    strNumber: 1,
                    timeout: entry.max
                });
                decorate.el.butIcBefore.handler({
                    icon: but.delete,
                    timeout: entry.max
                });
                decorate.modalConfirm.visitorArchive.init({
                    timeout: entry.max
                });
                decorate.el.button.handler({
                    name: 'Подтвердить',
                    timeout: entry.max
                });
                decorate.modalConfirm.visitorArchive.initClose({
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
            });

            describe('Проверка таблицы Архива', () => {
                befArchive();
                aft();
                decorate.el.table.size({
                    strCount: 1,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Посетитель',
                    strNumber: 1,
                    cellNumber: 1,
                    value: data.visitor1.fio,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Сопровождающий',
                    strNumber: 1,
                    cellNumber: 2,
                    value: data.visitor1.staff,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Документ',
                    strNumber: 1,
                    cellNumber: 3,
                    value: data.visitor1.document,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Номер документа',
                    strNumber: 1,
                    cellNumber: 4,
                    value: data.visitor1.documentNumber,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Дата заказа',
                    strNumber: 1,
                    cellNumber: 5,
                    value: data.event1,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Куда (подразделение)',
                    strNumber: 1,
                    cellNumber: 7,
                    value: data.visitor1.division,
                    timeout: entry.max
                });
                decorate.el.table.cellImg({
                    headTitle: 'Фотография',
                    strNumber: 1,
                    cellNumber: 8,
                    timeout: entry.max
                });
            });

            describe('Проверка параметров и изменение "Действует до"', () => {
                befArchive();
                aft();

                describe('Открытие посетителя на редактирование', () => {
                    decorate.el.table.strHandler({
                        strNumber: 1,
                        timeout: entry.max
                    });
                    decorate.el.butIcBefore.handler({
                        icon: but.unsorted_reply_outline,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.page.visitorChange.initEdit({
                        timeout: entry.max
                    });
                });

                describe('Проверка данных "Общая информация"', () => {
                    describe('Основная информация', () => {
                        decorate.el.input.getValue({
                            title: 'Фамилия',
                            placeholder: 'Фамилия',
                            value: data.visitor1.lastName,
                            timeout: entry.max
                        });
                        decorate.el.input.getValue({
                            title: 'Имя',
                            placeholder: 'Имя',
                            value: data.visitor1.firstName,
                            timeout: entry.max
                        });
                        decorate.el.input.getValue({
                            title: 'Отчество',
                            placeholder: 'Отчество',
                            value: data.visitor1.middleName,
                            timeout: entry.max
                        });
                        decorate.el.input.getValue({
                            title: 'E-Mail',
                            placeholder: 'E-Mail',
                            value: data.visitor1.mail,
                            timeout: entry.max
                        });
                    });

                    describe('Учетные данные', () => {
                        decorate.el.input.getValue({
                            title: 'Куда (подразделение)',
                            placeholder: 'Куда (подразделение)',
                            value: data.visitor1.division,
                            timeout: entry.max
                        });
                        decorate.el.input.getValue({
                            title: 'Сопровождающий',
                            placeholder: 'Сопровождающий',
                            value: data.visitor1.staff,
                            timeout: entry.max
                        });
                        decorate.el.input.getValue({
                            title: 'Карта / идентификатор',
                            placeholder: 'Карта / идентификатор',
                            value: '',
                            timeout: entry.max
                        });
                        decorate.el.input.getValue({
                            title: 'Подтверждающий документ',
                            placeholder: 'Подтверждающий документ',
                            value: data.visitor1.document,
                            timeout: entry.max
                        });
                        decorate.el.input.getValue({
                            title: 'Номер документа',
                            placeholder: 'Номер документа',
                            value: data.visitor1.documentNumber,
                            timeout: entry.max
                        });
                        decorate.el.input.getValue({
                            title: 'Действует с',
                            placeholder: 'Действует с',
                            value: data.visitor1.dateIn.date,
                            timeout: entry.max
                        });
                        decorate.el.input.getValue({
                            title: 'Шаблон доступа',
                            placeholder: 'Шаблон доступа',
                            value: '',
                            timeout: entry.max
                        });
                        decorate.el.input.handler({
                            title: 'Действует до',
                            placeholder: 'Действует до',
                            timeout: entry.max
                        });
                        decorate.el.datepicker.date({
                            day: data.visitor1.dateAfter.day,
                            month: data.visitor1.dateAfter.month,
                            year: data.visitor1.dateAfter.year,
                            hour: '23',
                            minute: '59',
                            scrollYear: -500,
                            scrollHour: 1000,
                            scrollMinute: 1000,
                            timeout: entry.max
                        });
                    });

                    describe('Дополнительные поля', () => {
                        decorate.el.input.getValue({
                            title: 'Пин-код',
                            placeholder: '',
                            value: data.visitor1.pinCode,
                            timeout: entry.max
                        });
                    });

                    describe('Фотография', () => {
                        decorate.el.photography.imageVisitor({
                            timeout: entry.max
                        });
                    });
                });

                describe('Проверка данных "Шрихкод"', () => {
                    describe('Открытие информации "Штрихкод"', () => {
                        decorate.el.simpleCell.handler({
                            name: 'Штрихкод',
                            timeout: entry.max
                        });
                        decorate.el.simpleCell.active({
                            name: 'Штрихкод',
                            timeout: entry.max
                        });
                    });

                    describe('Проверка штрихкода', () => {
                        it('Проверка отображение картинки штрикода', async () => {
                            const barcode = await page.staffChange.getBarcodeSrc(entry.max);
                            expect(!!barcode.text).to.equal(true);
                        });
                        decorate.el.input.getValue({
                            title: '',
                            placeholder: '',
                            value: '',
                            timeout: entry.max
                        });
                    });
                });

                describe('Проверка информации "Отпечаток"', () => {
                    decorate.el.simpleCell.handler({
                        name: 'Отпечаток',
                        timeout: entry.max
                    });
                    decorate.el.simpleCell.active({
                        name: 'Отпечаток',
                        timeout: entry.max
                    });
                });

                describe('Проверка информации "Ладонь"', () => {
                    decorate.el.simpleCell.handler({
                        name: 'Ладонь',
                        timeout: entry.max
                    });
                    decorate.el.simpleCell.active({
                        name: 'Ладонь',
                        timeout: entry.max
                    });
                });

                describe('Проверка информации "Лицо"', () => {
                    decorate.el.simpleCell.handler({
                        name: 'Лицо',
                        timeout: entry.max
                    });
                    decorate.el.simpleCell.active({
                        name: 'Лицо',
                        timeout: entry.max
                    });
                });

                describe('Проверка данных "Транспортное средство"', () => {
                    describe('Открытие информации "Транспортное средство"', () => {
                        decorate.el.simpleCell.handler({
                            name: 'Транспортное средство',
                            timeout: entry.max
                        });
                        decorate.el.simpleCell.active({
                            name: 'Транспортное средство',
                            timeout: entry.max
                        });
                    });

                    data.visitor1.ts.arrTS.forEach((obj, index) => {
                        describe(`Проверка ТС ${index + 1}`, () => {
                            decorate.page.staffChange.сarImg({
                                number: index + 1,
                                timeout: entry.max
                            });
                            decorate.page.staffChange.getValueCarInput({
                                title: 'Номер транспортного средства',
                                number: index + 1,
                                value: obj.number,
                                timeout: entry.max
                            });
                            decorate.page.staffChange.getValueCarInput({
                                title: 'Модель транспортного средства',
                                number: index + 1,
                                value: obj.model,
                                timeout: entry.max
                            });
                        });
                    });
                });

                describe('Сохранение и нажатие кнопки "Вернуться к списку посетителей".', () => {
                    decorate.el.button.handler({
                        name: 'Сохранить изменения'
                    });
                    decorate.el.success.success({
                        text: 'Данные успешно изменены',
                        timeout: entry.max
                    });
                    decorate.el.button.handler({
                        name: 'Вернуться к списку посетителей',
                        timeout: entry.max
                    });
                    decorate.page.visitorArchive.init({
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.table.noStr({
                        timeout: entry.max
                    });
                });
            });

            describe('Проверка таблицы Заказанные', () => {
                befOrdered();
                aft();
                decorate.el.table.size({
                    strCount: 1,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Посетитель',
                    strNumber: 1,
                    cellNumber: 1,
                    value: data.visitor1.fio,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Сопровождающий',
                    strNumber: 1,
                    cellNumber: 2,
                    value: data.visitor1.staff,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Документ',
                    strNumber: 1,
                    cellNumber: 3,
                    value: data.visitor1.document,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Номер документа',
                    strNumber: 1,
                    cellNumber: 4,
                    value: data.visitor1.documentNumber,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Шаблон доступа',
                    strNumber: 1,
                    cellNumber: 5,
                    value: '',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Дата заказа',
                    strNumber: 1,
                    cellNumber: 6,
                    value: data.event1,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Действует с',
                    strNumber: 1,
                    cellNumber: 7,
                    value: data.visitor1.dateIn.date + ':00',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Действителен до',
                    strNumber: 1,
                    cellNumber: 8,
                    value: data.visitor1.dateAfter.date + ':00',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Куда (подразделение)',
                    strNumber: 1,
                    cellNumber: 9,
                    value: data.visitor1.division,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Карта',
                    strNumber: 1,
                    cellNumber: 10,
                    value: '',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Штрихкод',
                    strNumber: 1,
                    cellNumber: 11,
                    value: '',
                    timeout: entry.max
                });
                decorate.el.table.cellImg({
                    headTitle: 'Фотография',
                    strNumber: 1,
                    cellNumber: 12,
                    timeout: entry.max
                });
            });
        }

        if(type === 'visitorPassOrder') {
            describe('Добавление в Архив', () => {
                befPassOrder();
                aft();
                decorate.el.table.strHandler({
                    strNumber: 1,
                    timeout: entry.max
                });
                decorate.el.butIcBefore.handler({
                    icon: but.delete,
                    timeout: entry.max
                });
                decorate.modalConfirm.visitorArchive.init({
                    timeout: entry.max
                });
                decorate.el.button.handler({
                    name: 'Подтвердить',
                    timeout: entry.max
                });
                decorate.modalConfirm.visitorArchive.initClose({
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
            });

            describe('Проверка таблицы Архива', () => {
                befPassArchive();
                aft();
                decorate.el.table.size({
                    strCount: 1,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Посетитель',
                    strNumber: 1,
                    cellNumber: 1,
                    value: data.visitor1.fio,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Сопровождающий',
                    strNumber: 1,
                    cellNumber: 2,
                    value: data.visitor1.staff,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Документ',
                    strNumber: 1,
                    cellNumber: 3,
                    value: data.visitor1.document,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Номер документа',
                    strNumber: 1,
                    cellNumber: 4,
                    value: data.visitor1.documentNumber,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Дата заказа',
                    strNumber: 1,
                    cellNumber: 5,
                    value: data.event1,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Куда (подразделение)',
                    strNumber: 1,
                    cellNumber: 7,
                    value: data.visitor1.division,
                    timeout: entry.max
                });
            });

            describe('Проверка параметров и изменение "Действует до"', () => {
                befPassArchive();
                aft();

                describe('Открытие посетителя на редактирование', () => {
                    decorate.el.table.strHandler({
                        strNumber: 1,
                        timeout: entry.max
                    });
                    decorate.el.butIcBefore.handler({
                        icon: but.unsorted_reply_outline,
                        timeout: entry.max
                    });
                    decorate.page.orderpassChange.initEdit({
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                });

                describe('Проверка данных "Общая информация"', () => {
                    describe('Основная информация', () => {
                        decorate.el.input.getValue({
                            title: 'Фамилия',
                            placeholder: 'Фамилия',
                            value: data.visitor1.lastName,
                            timeout: entry.max
                        });
                        decorate.el.input.getValue({
                            title: 'Имя',
                            placeholder: 'Имя',
                            value: data.visitor1.firstName,
                            timeout: entry.max
                        });
                        decorate.el.input.getValue({
                            title: 'Отчество',
                            placeholder: 'Отчество',
                            value: data.visitor1.middleName,
                            timeout: entry.max
                        });
                        decorate.el.input.getValue({
                            title: 'E-Mail',
                            placeholder: 'E-Mail',
                            value: data.visitor1.mail,
                            timeout: entry.max
                        });
                    });

                    describe('Учетные данные', () => {
                        decorate.el.input.getValue({
                            title: 'Куда (подразделение)',
                            placeholder: 'Куда (подразделение)',
                            value: data.visitor1.division,
                            timeout: entry.max
                        });
                        decorate.el.input.getValue({
                            title: 'Сопровождающий',
                            placeholder: 'Сопровождающий',
                            value: data.visitor1.staff,
                            timeout: entry.max
                        });
                        decorate.el.input.getValue({
                            title: 'Действует с',
                            placeholder: 'Действует с',
                            value: data.visitor1.dateIn.date,
                            timeout: entry.max
                        });
                        decorate.el.input.getValue({
                            title: 'Подтверждающий документ',
                            placeholder: 'Подтверждающий документ',
                            value: data.visitor1.document,
                            timeout: entry.max
                        });
                        decorate.el.input.getValue({
                            title: 'Номер документа',
                            placeholder: 'Номер документа',
                            value: data.visitor1.documentNumber,
                            timeout: entry.max
                        });
                        decorate.page.base.loading({
                            timeout: entry.sleep2
                        });
                        decorate.el.input.handler({
                            title: 'Действует до',
                            placeholder: 'Действует до',
                            timeout: entry.max
                        });
                        decorate.page.base.loading({
                            timeout: entry.sleep2
                        });
                        decorate.el.datepicker.date({
                            day: data.visitor1.dateAfter.day,
                            month: data.visitor1.dateAfter.month,
                            year: data.visitor1.dateAfter.year,
                            hour: '23',
                            minute: '59',
                            scrollYear: -500,
                            scrollHour: 1000,
                            scrollMinute: 1000,
                            timeout: entry.max
                        });
                    });
                });

                describe('Проверка данных "Транспортное средство"', () => {
                    describe('Открытие информации "Транспортное средство"', () => {
                        decorate.el.simpleCell.handler({
                            name: 'Транспортное средство',
                            timeout: entry.max
                        });
                        decorate.el.simpleCell.active({
                            name: 'Транспортное средство',
                            timeout: entry.max
                        });
                    });

                    data.visitor1.ts.arrTS.forEach((obj, index) => {
                        describe(`Проверка ТС ${index + 1}`, () => {
                            decorate.page.staffChange.сarImg({
                                number: index + 1,
                                timeout: entry.max
                            });
                            decorate.page.staffChange.getValueCarInput({
                                title: 'Номер транспортного средства',
                                number: index + 1,
                                value: obj.number,
                                timeout: entry.max
                            });
                            decorate.page.staffChange.getValueCarInput({
                                title: 'Модель транспортного средства',
                                number: index + 1,
                                value: obj.model,
                                timeout: entry.max
                            });
                        });
                    });
                });

                describe('Сохранение и нажатие кнопки "Вернуться к списку посетителей".', () => {
                    decorate.el.button.handler({
                        name: 'Сохранить изменения'
                    });
                    decorate.el.success.success({
                        text: 'Данные успешно изменены',
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.button.handler({
                        name: 'Вернуться к списку посетителей',
                        timeout: entry.max
                    });
                    decorate.page.orderpassArchive.init({
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.table.noStr({
                        timeout: entry.max
                    });
                });
            });

            describe('Проверка таблицы Заказ пропуска', () => {
                befPassOrder();
                aft();
                decorate.el.table.size({
                    strCount: 1,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Посетитель',
                    strNumber: 1,
                    cellNumber: 1,
                    value: data.visitor1.fio,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Сопровождающий',
                    strNumber: 1,
                    cellNumber: 2,
                    value: data.visitor1.staff,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Документ',
                    strNumber: 1,
                    cellNumber: 3,
                    value: data.visitor1.document,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Номер документа',
                    strNumber: 1,
                    cellNumber: 4,
                    value: data.visitor1.documentNumber,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Дата заказа',
                    strNumber: 1,
                    cellNumber: 5,
                    value: data.event1,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Куда (подразделение)',
                    strNumber: 1,
                    cellNumber: 6,
                    value: data.visitor1.division,
                    timeout: entry.max
                });
            });
        }
    });

    const archiveVisitorMaxParamsFromActive = () => describe(text + 'Добавление посетителя в архив', () => {

        if(type === 'visitorActive') {
            describe('Добавление в Архив', () => {
                befActive();
                aft();
                decorate.el.table.strHandler({
                    strNumber: 1,
                    timeout: entry.max
                });
                decorate.el.butIcBefore.handler({
                    icon: but.delete,
                    timeout: entry.max
                });
                decorate.modalConfirm.visitorArchive.init({
                    timeout: entry.max
                });
                decorate.el.button.handler({
                    name: 'Подтвердить',
                    timeout: entry.max
                });
                decorate.modalConfirm.visitorArchive.initClose({
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.table.noStr({
                    timeout: entry.max
                });
            });

            describe('Изменение даты окончания в базе данных', () => {
                befActive();
                aft();
                it('Изменение даты.', async () => {
                    const cook = await page.base.getCookie('token');
                    const arrVisitor = await api.getVisitor(cook.text);
                    const visitor1 = arrVisitor.text.filter(obj =>
                        obj.name === data.visitor1.fio || obj.name === data.visitor2.fio)[0].id;
                    await dec.simple(db.updateUserEndDate,
                        [{
                            id: visitor1,
                            end_date: data.event2
                        }],
                        db.updateUserCrateDate);
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
            });

            describe('Проверка таблицы Архива', () => {
                befArchive();
                aft();
                decorate.el.table.size({
                    strCount: 1,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Посетитель',
                    strNumber: 1,
                    cellNumber: 1,
                    value: data.visitor1.fio,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Сопровождающий',
                    strNumber: 1,
                    cellNumber: 2,
                    value: data.visitor1.staff,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Документ',
                    strNumber: 1,
                    cellNumber: 3,
                    value: data.visitor1.document,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Номер документа',
                    strNumber: 1,
                    cellNumber: 4,
                    value: data.visitor1.documentNumber,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Дата заказа',
                    strNumber: 1,
                    cellNumber: 5,
                    value: data.event1,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Куда (подразделение)',
                    strNumber: 1,
                    cellNumber: 7,
                    value: data.visitor1.division,
                    timeout: entry.max
                });
                decorate.el.table.cellImg({
                    headTitle: 'Фотография',
                    strNumber: 1,
                    cellNumber: 8,
                    timeout: entry.max
                });
            });
        }
    });

    const returnVisitorMaxParamsToActive = () => describe(text + 'Восстановление посетителя из архива', () => {

        if(type === 'visitorArchive') {
            describe('Проверка параметров и изменение "Действует до", "Карта/идентификатор", "Шаблон доступа"', () => {
                befArchive();
                aft();

                describe('Открытие посетителя на редактирование', () => {
                    decorate.el.table.strHandler({
                        strNumber: 1,
                        timeout: entry.max
                    });
                    decorate.el.butIcBefore.handler({
                        icon: but.unsorted_reply_outline,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.page.visitorChange.initEdit({
                        timeout: entry.max
                    });
                });

                describe('Проверка данных "Общая информация"', () => {
                    describe('Основная информация', () => {
                        decorate.el.input.getValue({
                            title: 'Фамилия',
                            placeholder: 'Фамилия',
                            value: data.visitor1.lastName,
                            timeout: entry.max
                        });
                        decorate.el.input.getValue({
                            title: 'Имя',
                            placeholder: 'Имя',
                            value: data.visitor1.firstName,
                            timeout: entry.max
                        });
                        decorate.el.input.getValue({
                            title: 'Отчество',
                            placeholder: 'Отчество',
                            value: data.visitor1.middleName,
                            timeout: entry.max
                        });
                        decorate.el.input.getValue({
                            title: 'E-Mail',
                            placeholder: 'E-Mail',
                            value: data.visitor1.mail,
                            timeout: entry.max
                        });
                    });

                    describe('Учетные данные', () => {
                        decorate.el.input.getValue({
                            title: 'Куда (подразделение)',
                            placeholder: 'Куда (подразделение)',
                            value: data.visitor1.division,
                            timeout: entry.max
                        });
                        decorate.el.input.getValue({
                            title: 'Сопровождающий',
                            placeholder: 'Сопровождающий',
                            value: data.visitor1.staff,
                            timeout: entry.max
                        });
                        decorate.el.input.getValue({
                            title: 'Карта / идентификатор',
                            placeholder: 'Карта / идентификатор',
                            value: '',
                            timeout: entry.max
                        });

                        decorate.el.input.iconCard({
                            title: 'Карта / идентификатор',
                            placeholder: 'Карта / идентификатор',
                            timeout: entry.max
                        });
                        decorate.modal.cardControlsAdd.init({
                            timeout: entry.max
                        });
                        decorate.modal.cardControlsNumber.inputSendKeys( {
                            title: 'Идентификатор карты',
                            placeholder: '',
                            value: data.visitor1.card,
                            timeout: entry.max
                        });
                        decorate.modal.cardControlsNumber.buttonHandler({
                            name: 'Сохранить',
                            timeout: entry.max
                        });
                        decorate.modal.cardControlsNumber.initClose({
                            timeout: entry.max
                        });

                        decorate.el.input.getValue({
                            title: 'Подтверждающий документ',
                            placeholder: 'Подтверждающий документ',
                            value: data.visitor1.document,
                            timeout: entry.max
                        });
                        decorate.el.input.getValue({
                            title: 'Номер документа',
                            placeholder: 'Номер документа',
                            value: data.visitor1.documentNumber,
                            timeout: entry.max
                        });
                        decorate.el.input.getValue({
                            title: 'Действует с',
                            placeholder: 'Действует с',
                            value: data.visitor1.dateIn.date,
                            timeout: entry.max
                        });
                        decorate.el.input.getValue({
                            title: 'Шаблон доступа',
                            placeholder: 'Шаблон доступа',
                            value: '',
                            timeout: entry.max
                        });

                        decorate.el.selectInput.iconXpand({
                            title: 'Шаблон доступа',
                            placeholder: 'Шаблон доступа',
                            timeout: entry.max
                        });
                        decorate.el.selectXpand.xpand({
                            timeout: entry.max
                        });
                        decorate.el.selectXpand.handler({
                            value: data.visitor1.template,
                            timeout: entry.max
                        });
                        decorate.el.selectXpand.xpandNoElement({
                            timeout: entry.max
                        });

                        decorate.el.input.handler({
                            title: 'Действует до',
                            placeholder: 'Действует до',
                            timeout: entry.max
                        });
                        decorate.el.datepicker.date({
                            day: data.visitor1.dateAfter.day,
                            month: data.visitor1.dateAfter.month,
                            year: data.visitor1.dateAfter.year,
                            hour: '23',
                            minute: '59',
                            scrollYear: -500,
                            scrollHour: 1000,
                            scrollMinute: 1000,
                            timeout: entry.max
                        });
                    });

                    describe('Дополнительные поля', () => {
                        decorate.el.input.getValue({
                            title: 'Пин-код',
                            placeholder: '',
                            value: data.visitor1.pinCode,
                            timeout: entry.max
                        });
                    });

                    describe('Фотография', () => {
                        decorate.el.photography.imageVisitor({
                            timeout: entry.max
                        });
                    });
                });

                describe('Проверка данных "Шрихкод"', () => {
                    describe('Открытие информации "Штрихкод"', () => {
                        decorate.el.simpleCell.handler({
                            name: 'Штрихкод',
                            timeout: entry.max
                        });
                        decorate.el.simpleCell.active({
                            name: 'Штрихкод',
                            timeout: entry.max
                        });
                    });

                    describe('Проверка штрихкода', () => {
                        it('Проверка отображение картинки штрикода', async () => {
                            const barcode = await page.staffChange.getBarcodeSrc(entry.max);
                            expect(!!barcode.text).to.equal(true);
                        });
                        decorate.el.input.getValue({
                            title: '',
                            placeholder: '',
                            value: '',
                            timeout: entry.max
                        });
                    });
                });

                describe('Проверка информации "Отпечаток"', () => {
                    decorate.el.simpleCell.handler({
                        name: 'Отпечаток',
                        timeout: entry.max
                    });
                    decorate.el.simpleCell.active({
                        name: 'Отпечаток',
                        timeout: entry.max
                    });
                });

                describe('Проверка информации "Ладонь"', () => {
                    decorate.el.simpleCell.handler({
                        name: 'Ладонь',
                        timeout: entry.max
                    });
                    decorate.el.simpleCell.active({
                        name: 'Ладонь',
                        timeout: entry.max
                    });
                });

                describe('Проверка информации "Лицо"', () => {
                    decorate.el.simpleCell.handler({
                        name: 'Лицо',
                        timeout: entry.max
                    });
                    decorate.el.simpleCell.active({
                        name: 'Лицо',
                        timeout: entry.max
                    });
                });

                describe('Проверка данных "Транспортное средство"', () => {
                    describe('Открытие информации "Транспортное средство"', () => {
                        decorate.el.simpleCell.handler({
                            name: 'Транспортное средство',
                            timeout: entry.max
                        });
                        decorate.el.simpleCell.active({
                            name: 'Транспортное средство',
                            timeout: entry.max
                        });
                    });

                    data.visitor1.ts.arrTS.forEach((obj, index) => {
                        describe(`Проверка ТС ${index + 1}`, () => {
                            decorate.page.staffChange.сarImg({
                                number: index + 1,
                                timeout: entry.max
                            });
                            decorate.page.staffChange.getValueCarInput({
                                title: 'Номер транспортного средства',
                                number: index + 1,
                                value: obj.number,
                                timeout: entry.max
                            });
                            decorate.page.staffChange.getValueCarInput({
                                title: 'Модель транспортного средства',
                                number: index + 1,
                                value: obj.model,
                                timeout: entry.max
                            });
                        });
                    });
                });

                describe('Сохранение и нажатие кнопки "Вернуться к списку посетителей".', () => {
                    decorate.el.button.handler({
                        name: 'Сохранить изменения'
                    });
                    decorate.el.success.success({
                        text: 'Данные успешно изменены',
                        timeout: entry.max
                    });
                    decorate.el.button.handler({
                        name: 'Вернуться к списку посетителей',
                        timeout: entry.max
                    });
                    decorate.page.visitorArchive.init({
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.table.noStr({
                        timeout: entry.max
                    });
                });
            });

            describe('Проверка таблицы Действующие', () => {
                befActive();
                aft();
                decorate.el.table.size({
                    strCount: 1,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Посетитель',
                    strNumber: 1,
                    cellNumber: 2,
                    value: data.visitor1.fio,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Сопровождающий',
                    strNumber: 1,
                    cellNumber: 3,
                    value: data.visitor1.staff,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Документ',
                    strNumber: 1,
                    cellNumber: 4,
                    value: data.visitor1.document,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Номер документа',
                    strNumber: 1,
                    cellNumber: 5,
                    value: data.visitor1.documentNumber,
                    timeout: entry.max
                });
                decorate.el.table.cellNoIconLock({
                    strNumber: 1,
                    cellNumber: 6,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Дата заказа',
                    strNumber: 1,
                    cellNumber: 7,
                    value: data.event1,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Действует с',
                    strNumber: 1,
                    cellNumber: 8,
                    value: data.visitor1.dateIn.date + ':00',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Действителен до',
                    strNumber: 1,
                    cellNumber: 9,
                    value: data.visitor1.dateAfter.date + ':00',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Куда (подразделение)',
                    strNumber: 1,
                    cellNumber: 10,
                    value: data.visitor1.division,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Шаблон доступа',
                    strNumber: 1,
                    cellNumber: 11,
                    value: data.visitor1.template,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Карта',
                    strNumber: 1,
                    cellNumber: 12,
                    value: data.visitor1.card,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Штрихкод',
                    strNumber: 1,
                    cellNumber: 13,
                    value: '',
                    timeout: entry.max
                });
                decorate.el.table.cellImg({
                    headTitle: 'Фотография',
                    strNumber: 1,
                    cellNumber: 14,
                    timeout: entry.max
                });
            });
        }
    });

    const blockCardVisitorMaxParams = () => describe(text +
        'Заблокировать посетителя по кнопке "Заблокировать".', () => {

        if(type === 'visitorActive') {
            describe('Проверка таблицы до блокирования сотрудника', () => {
                befActive();
                aft();
                decorate.el.table.size({
                    strCount: 1,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Посетитель',
                    strNumber: 1,
                    cellNumber: 2,
                    value: data.visitor1.fio,
                    timeout: entry.max
                });
                decorate.el.table.cellNoIconLock({
                    strNumber: 1,
                    cellNumber: 6,
                    timeout: entry.max
                });
            });

            describe('Заблокировать', () => {
                befActive();
                aft();
                decorate.el.table.strHandler({
                    strNumber: 1,
                    timeout: entry.max
                });
                decorate.el.butIcBefore.handler({
                    icon: but.lock,
                    timeout: entry.max
                });
                decorate.modalConfirm.visitorBlock.init({
                    timeout: entry.max
                });
                decorate.el.button.handler({
                    name: 'Заблокировать',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.modalConfirm.visitorBlock.initClose({
                    timeout: entry.max
                });
            });

            describe('Проверка таблицы после блокирования сотрудника', () => {
                befActive();
                aft();
                decorate.el.table.size({
                    strCount: 1,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Посетитель',
                    strNumber: 1,
                    cellNumber: 2,
                    value: data.visitor1.fio,
                    timeout: entry.max
                });
                decorate.el.table.cellGetIconLock({
                    strNumber: 1,
                    cellNumber: 6,
                    timeout: entry.max
                });
            });
        }

    });

    const unblockCardVisitorMaxParams = () => describe(text +
        'Разблокировать посетителя по кнопке "Разблокировать".', () => {

        if(type === 'visitorActive') {
            describe('Проверка таблицы до разблокирования сотрудника', () => {
                befActive();
                aft();
                decorate.el.table.size({
                    strCount: 1,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Посетитель',
                    strNumber: 1,
                    cellNumber: 2,
                    value: data.visitor1.fio,
                    timeout: entry.max
                });
                decorate.el.table.cellGetIconLock({
                    strNumber: 1,
                    cellNumber: 6,
                    timeout: entry.max
                });
            });

            describe('Разблокировать', () => {
                befActive();
                aft();
                decorate.el.table.strHandler({
                    strNumber: 1,
                    timeout: entry.max
                });
                decorate.el.butIcBefore.handler({
                    icon: but.unlock,
                    timeout: entry.max
                });
                decorate.modalConfirm.visitorUnBlock.init({
                    timeout: entry.max
                });
                decorate.el.button.handler({
                    name: 'Разблокировать',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.modalConfirm.visitorUnBlock.initClose({
                    timeout: entry.max
                });
            });

            describe('Проверка таблицы после разблокирования сотрудника', () => {
                befActive();
                aft();
                decorate.el.table.size({
                    strCount: 1,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Посетитель',
                    strNumber: 1,
                    cellNumber: 2,
                    value: data.visitor1.fio,
                    timeout: entry.max
                });
                decorate.el.table.cellNoIconLock({
                    strNumber: 1,
                    cellNumber: 6,
                    timeout: entry.max
                });
            });
        }
    });

    const editVisitorMaxParams = () => describe(text +
        'Редактирование посетителя с максимальным количеством параметров.', () => {

        if(type === 'visitorOrder') {
            describe('Редактирование', () => {
                befOrdered();
                aft();

                describe('Открытие страницы на редактирование', () => {
                    decorate.el.table.strHandler({
                        strNumber: 1,
                        timeout: entry.max
                    });
                    decorate.el.butIcBefore.handler({
                        icon: but.edit,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.page.visitorChange.initEdit({
                        timeout: entry.max
                    });
                });

                describe('Изменение данных "Общая информация"', () => {
                    describe('Основная информация', () => {
                        decorate.el.input.backSpace({
                            title: 'Фамилия',
                            placeholder: 'Фамилия',
                            timeout: entry.max
                        });
                        decorate.el.input.sendKeys({
                            title: 'Фамилия',
                            placeholder: 'Фамилия',
                            value: data.visitor2.lastName,
                            timeout: entry.max
                        });

                        decorate.el.input.backSpace({
                            title: 'Имя',
                            placeholder: 'Имя',
                            timeout: entry.max
                        });
                        decorate.el.input.sendKeys({
                            title: 'Имя',
                            placeholder: 'Имя',
                            value: data.visitor2.firstName,
                            timeout: entry.max
                        });

                        decorate.el.input.backSpace({
                            title: 'Отчество',
                            placeholder: 'Отчество',
                            timeout: entry.max
                        });
                        decorate.el.input.sendKeys({
                            title: 'Отчество',
                            placeholder: 'Отчество',
                            value: data.visitor2.middleName,
                            timeout: entry.max
                        });

                        decorate.el.input.backSpace({
                            title: 'E-Mail',
                            placeholder: 'E-Mail',
                            timeout: entry.max
                        });
                        decorate.el.input.sendKeys({
                            title: 'E-Mail',
                            placeholder: 'E-Mail',
                            value: data.visitor2.mail,
                            timeout: entry.max
                        });
                    });

                    describe('Учетные данные', () => {
                        decorate.el.selectInput.iconXpand({
                            title: 'Куда (подразделение)',
                            placeholder: 'Куда (подразделение)',
                            timeout: entry.max
                        });
                        decorate.el.selectXpand.xpand({
                            timeout: entry.max
                        });
                        decorate.el.selectXpand.handler({
                            value: data.divisions.division3.name,
                            timeout: entry.max
                        });
                        decorate.el.selectXpand.xpandNoElement({
                            timeout: entry.max
                        });
                        decorate.el.selectInput.iconOutline({
                            title: 'Куда (подразделение)',
                            placeholder: 'Куда (подразделение)',
                            timeout: entry.max
                        });
                        decorate.modal.divisionFilter.init({
                            timeout: entry.max
                        });
                        decorate.el.filterTreeNode.handler({
                            name: data.visitor2.division,
                            timeout: entry.max
                        });
                        decorate.el.button.handler({
                            name: 'Выбрать',
                            timeout: entry.max
                        });
                        decorate.modal.divisionFilter.initClose({
                            timeout: entry.max
                        });

                        decorate.el.selectInput.iconXpand({
                            title: 'Сопровождающий',
                            placeholder: 'Сопровождающий',
                            timeout: entry.max
                        });
                        decorate.el.selectXpand.xpand({
                            timeout: entry.max
                        });
                        decorate.el.selectXpand.handler({
                            value: data.visitor2.staff,
                            timeout: entry.max
                        });
                        decorate.el.selectXpand.xpandNoElement({
                            timeout: entry.max
                        });

                        decorate.el.input.iconCard({
                            title: 'Карта / идентификатор',
                            placeholder: 'Карта / идентификатор',
                            timeout: entry.max
                        });
                        decorate.modal.cardControlsAdd.init({
                            timeout: entry.max
                        });
                        decorate.modal.cardControlsNumber.inputSendKeys( {
                            title: 'Идентификатор карты',
                            placeholder: '',
                            value: data.visitor2.card,
                            timeout: entry.max
                        });
                        decorate.modal.cardControlsNumber.buttonHandler({
                            name: 'Сохранить',
                            timeout: entry.max
                        });
                        decorate.modal.cardControlsNumber.initClose({
                            timeout: entry.max
                        });

                        decorate.el.input.backSpace({
                            title: 'Подтверждающий документ',
                            placeholder: 'Подтверждающий документ',
                            value: data.visitor1.document,
                            timeout: entry.max
                        });
                        decorate.el.input.sendKeys({
                            title: 'Подтверждающий документ',
                            placeholder: 'Подтверждающий документ',
                            value: data.visitor2.document,
                            timeout: entry.max
                        });

                        decorate.el.input.backSpace({
                            title: 'Номер документа',
                            placeholder: 'Номер документа',
                            timeout: entry.max
                        });
                        decorate.el.input.sendKeys({
                            title: 'Номер документа',
                            placeholder: 'Номер документа',
                            value: data.visitor2.documentNumber,
                            timeout: entry.max
                        });

                        decorate.el.input.iconCalendar({
                            title: 'Действует до',
                            placeholder: 'Действует до',
                            timeout: entry.max
                        });
                        decorate.el.datepicker.date({
                            day: data.visitor2.dateAfter.day,
                            month: data.visitor2.dateAfter.month,
                            year: data.visitor2.dateAfter.year,
                            scrollYear: -500,
                            timeout: entry.max
                        });

                    });

                    describe('Дополнительные поля', () => {
                        decorate.el.input.backSpace({
                            title: 'Пин-код',
                            placeholder: '',
                            timeout: entry.max
                        });
                        decorate.el.input.sendKeys({
                            title: 'Пин-код',
                            placeholder: '',
                            value: data.visitor2.pinCode,
                            timeout: entry.max
                        });
                    });

                    describe('Фотография', () => {
                        decorate.el.photography.imageVisitor({
                            timeout: entry.max
                        });
                        decorate.el.butIcBefore.handler({
                            icon: but.unsorted_delete_outline_android,
                            timeout: entry.max
                        });
                        decorate.modalConfirm.staffDeleteImage.init({
                            timeout: entry.max
                        });
                        decorate.el.button.handler({
                            name: 'Удалить',
                            timeout: entry.max
                        });
                        decorate.modalConfirm.staffDeleteImage.initClose({
                            timeout: entry.max
                        });
                        decorate.el.photography.noImageVisitor({
                            timeout: entry.max
                        });
                        decorate.el.photography.addImage({
                            name: 'Загрузить фотографию',
                            timeout: entry.max
                        });
                        decorate.modal.changePhoto.init({
                            timeout: entry.max
                        });
                        decorate.modal.changePhoto.noImage({
                            timeout: entry.max
                        });
                        decorate.modal.changePhoto.addImage({
                            src: imp.photo.photo1,
                            timeout: entry.max
                        });
                        decorate.modal.changePhoto.image({
                            timeout: entry.max
                        });
                        decorate.el.button.handler({
                            name: 'Сохранить',
                            timeout: entry.max
                        });
                        decorate.modal.changePhoto.initClose({
                            timeout: entry.max
                        });
                        decorate.el.photography.imageVisitor({
                            timeout: entry.max
                        });
                    });
                });

                describe('Изменение данных "Шрихкод"', () => {
                    describe('Открытие информации "Штрихкод"', () => {
                        decorate.el.simpleCell.handler({
                            name: 'Штрихкод',
                            timeout: entry.max
                        });
                        decorate.el.simpleCell.active({
                            name: 'Штрихкод',
                            timeout: entry.max
                        });
                    });


                    describe('Удаление штрикода по кнопке в поле ввода', () => {
                        decorate.el.input.iconClear({
                            title: '',
                            placeholder: '',
                            timeout: entry.max
                        });
                        decorate.modalConfirm.staffChangeDeleteBarcode.init({
                            timeout: entry.max
                        });
                        decorate.el.button.handler({
                            name: 'Подтвердить',
                            timeout: entry.max
                        });
                        decorate.modalConfirm.staffChangeDeleteBarcode.initClose({
                            timeout: entry.max
                        });
                        decorate.el.input.getValue({
                            title: '',
                            placeholder: '',
                            value: '',
                            timeout: entry.max
                        });
                    });

                    describe('Ввод штрикода', () => {
                        decorate.el.input.sendKeys({
                            title: '',
                            placeholder: '',
                            value: data.visitor2.barcode,
                            timeout: entry.max
                        });
                    });
                });

                describe('Открытие информации "Отпечаток"', () => {
                    decorate.el.simpleCell.handler({
                        name: 'Отпечаток',
                        timeout: entry.max
                    });
                    decorate.el.simpleCell.active({
                        name: 'Отпечаток',
                        timeout: entry.max
                    });
                });

                describe('Открытие информации "Ладонь"', () => {
                    decorate.el.simpleCell.handler({
                        name: 'Ладонь',
                        timeout: entry.max
                    });
                    decorate.el.simpleCell.active({
                        name: 'Ладонь',
                        timeout: entry.max
                    });
                });

                describe('Открытие информации "Лицо"', () => {
                    decorate.el.simpleCell.handler({
                        name: 'Лицо',
                        timeout: entry.max
                    });
                    decorate.el.simpleCell.active({
                        name: 'Лицо',
                        timeout: entry.max
                    });
                });

                describe('Изменение данных "Транспортное средство"', () => {
                    describe('Открытие информации "Транспортное средство"', () => {
                        decorate.el.simpleCell.handler({
                            name: 'Транспортное средство',
                            timeout: entry.max
                        });
                        decorate.el.simpleCell.active({
                            name: 'Транспортное средство',
                            timeout: entry.max
                        });
                    });

                    describe('Удаление транспортных средств', () => {
                        [...Array(4).keys()].forEach(() => {
                            decorate.el.button.handler({
                                name: 'Удалить',
                                timeout: entry.max
                            });
                            decorate.modalConfirm.staffDeleteCar.init({
                                timeout: entry.max
                            });
                            decorate.el.button.handler({
                                name: 'Подтвердить',
                                timeout: entry.max
                            });
                            decorate.modalConfirm.staffDeleteCar.initClose({
                                timeout: entry.max
                            });
                        });
                    });

                    data.visitor2.ts.arrTS.forEach((obj, index) => {
                        describe(`Добавление ТС ${index + 1}`, () => {
                            decorate.page.staffChange.addCarButton({
                                name: 'Добавить транспортное средство',
                                timeout: entry.max
                            });
                            decorate.page.staffChange.addCarImg({
                                name: 'Загрузить фотографию',
                                number: index + 1,
                                timeout: entry.max
                            });
                            decorate.modal.addPhoto.init({
                                timeout: entry.max
                            });
                            decorate.modal.addPhoto.noImage({
                                timeout: entry.max
                            });
                            decorate.modal.addPhoto.addImage({
                                src: imp.photo.photo1,
                                timeout: entry.max
                            });
                            decorate.modal.addPhoto.image({
                                timeout: entry.max
                            });
                            decorate.el.button.handler({
                                name: 'Сохранить',
                                timeout: entry.max
                            });
                            decorate.modal.addPhoto.initClose({
                                timeout: entry.max
                            });
                            decorate.page.staffChange.сarImg({
                                number: index + 1,
                                timeout: entry.max
                            });
                            decorate.page.staffChange.sendKeysCarInput({
                                title: 'Номер транспортного средства',
                                number: index + 1,
                                value: obj.number,
                                timeout: entry.max
                            });
                            decorate.page.staffChange.sendKeysCarInput({
                                title: 'Модель транспортного средства',
                                number: index + 1,
                                value: obj.model,
                                timeout: entry.max
                            });
                        });
                    });
                });

                describe('Сохранение и нажатие кнопки "Вернуться к списку посетителей".', () => {
                    decorate.el.button.handler({
                        name: 'Сохранить изменения'
                    });
                    decorate.el.success.success({
                        text: 'Данные успешно изменены',
                        timeout: entry.max
                    });
                    decorate.el.button.handler({
                        name: 'Вернуться к списку посетителей',
                        timeout: entry.max
                    });
                    decorate.page.visitorOrder.init({
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                });

            });

            describe('Проверка таблицы', () => {
                befOrdered();
                aft();
                decorate.el.table.size({
                    strCount: 1,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Посетитель',
                    strNumber: 1,
                    cellNumber: 1,
                    value: data.visitor2.fio,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Сопровождающий',
                    strNumber: 1,
                    cellNumber: 2,
                    value: data.visitor2.staff,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Документ',
                    strNumber: 1,
                    cellNumber: 3,
                    value: data.visitor2.document,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Номер документа',
                    strNumber: 1,
                    cellNumber: 4,
                    value: data.visitor2.documentNumber,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Шаблон доступа',
                    strNumber: 1,
                    cellNumber: 5,
                    value: '',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Дата заказа',
                    strNumber: 1,
                    cellNumber: 6,
                    value: data.event1,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Действует с',
                    strNumber: 1,
                    cellNumber: 7,
                    value: data.visitor2.dateIn.date + ':00',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Действителен до',
                    strNumber: 1,
                    cellNumber: 8,
                    value: data.visitor2.dateAfter.date + ':00',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Куда (подразделение)',
                    strNumber: 1,
                    cellNumber: 9,
                    value: data.visitor2.division,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Карта',
                    strNumber: 1,
                    cellNumber: 10,
                    value: data.visitor2.card,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Штрихкод',
                    strNumber: 1,
                    cellNumber: 11,
                    value: data.visitor2.barcode,
                    timeout: entry.max
                });
                decorate.el.table.cellImg({
                    headTitle: 'Фотография',
                    strNumber: 1,
                    cellNumber: 12,
                    timeout: entry.max
                });
            });

            describe('Проверка параметров', () => {
                befOrdered();
                aft();

                describe('Открытие посетителя на редактирование', () => {
                    decorate.el.table.strHandler({
                        strNumber: 1,
                        timeout: entry.max
                    });
                    decorate.el.butIcBefore.handler({
                        icon: but.edit,
                        timeout: entry.max
                    });
                    decorate.page.visitorChange.initEdit({
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                });

                describe('Проверка данных "Общая информация"', () => {
                    describe('Основная информация', () => {
                        decorate.el.input.getValue({
                            title: 'Фамилия',
                            placeholder: 'Фамилия',
                            value: data.visitor2.lastName,
                            timeout: entry.max
                        });
                        decorate.el.input.getValue({
                            title: 'Имя',
                            placeholder: 'Имя',
                            value: data.visitor2.firstName,
                            timeout: entry.max
                        });
                        decorate.el.input.getValue({
                            title: 'Отчество',
                            placeholder: 'Отчество',
                            value: data.visitor2.middleName,
                            timeout: entry.max
                        });
                        decorate.el.input.getValue({
                            title: 'E-Mail',
                            placeholder: 'E-Mail',
                            value: data.visitor2.mail,
                            timeout: entry.max
                        });
                    });

                    describe('Учетные данные', () => {
                        decorate.el.input.getValue({
                            title: 'Куда (подразделение)',
                            placeholder: 'Куда (подразделение)',
                            value: data.visitor2.division,
                            timeout: entry.max
                        });
                        decorate.el.input.getValue({
                            title: 'Сопровождающий',
                            placeholder: 'Сопровождающий',
                            value: data.visitor2.staff,
                            timeout: entry.max
                        });
                        decorate.el.input.getValue({
                            title: 'Карта / идентификатор',
                            placeholder: 'Карта / идентификатор',
                            value: data.visitor2.card,
                            timeout: entry.max
                        });
                        decorate.el.input.getValue({
                            title: 'Подтверждающий документ',
                            placeholder: 'Подтверждающий документ',
                            value: data.visitor2.document,
                            timeout: entry.max
                        });
                        decorate.el.input.getValue({
                            title: 'Номер документа',
                            placeholder: 'Номер документа',
                            value: data.visitor2.documentNumber,
                            timeout: entry.max
                        });
                        decorate.el.input.getValue({
                            title: 'Действует с',
                            placeholder: 'Действует с',
                            value: data.visitor2.dateIn.date,
                            timeout: entry.max
                        });
                        decorate.el.input.getValue({
                            title: 'Шаблон доступа',
                            placeholder: 'Шаблон доступа',
                            value: '',
                            timeout: entry.max
                        });
                        decorate.el.input.getValue({
                            title: 'Действует до',
                            placeholder: 'Действует до',
                            value: data.visitor2.dateAfter.date,
                            timeout: entry.max
                        });
                    });

                    describe('Дополнительные поля', () => {
                        decorate.el.input.getValue({
                            title: 'Пин-код',
                            placeholder: '',
                            value: data.visitor2.pinCode,
                            timeout: entry.max
                        });
                    });

                    describe('Фотография', () => {
                        decorate.el.photography.imageVisitor({
                            timeout: entry.max
                        });
                    });
                });

                describe('Проверка данных "Шрихкод"', () => {
                    describe('Открытие информации "Штрихкод"', () => {
                        decorate.el.simpleCell.handler({
                            name: 'Штрихкод',
                            timeout: entry.max
                        });
                        decorate.el.simpleCell.active({
                            name: 'Штрихкод',
                            timeout: entry.max
                        });
                    });

                    describe('Проверка штрихкода', () => {
                        it('Проверка отображение картинки штрикода', async () => {
                            const barcode = await page.staffChange.getBarcodeSrc(entry.max);
                            expect(!!barcode.text).to.equal(true);
                        });
                        decorate.el.input.getValue({
                            title: '',
                            placeholder: '',
                            value: data.visitor2.barcode,
                            timeout: entry.max
                        });
                    });
                });

                describe('Проверка информации "Отпечаток"', () => {
                    decorate.el.simpleCell.handler({
                        name: 'Отпечаток',
                        timeout: entry.max
                    });
                    decorate.el.simpleCell.active({
                        name: 'Отпечаток',
                        timeout: entry.max
                    });
                });

                describe('Проверка информации "Ладонь"', () => {
                    decorate.el.simpleCell.handler({
                        name: 'Ладонь',
                        timeout: entry.max
                    });
                    decorate.el.simpleCell.active({
                        name: 'Ладонь',
                        timeout: entry.max
                    });
                });

                describe('Проверка информации "Лицо"', () => {
                    decorate.el.simpleCell.handler({
                        name: 'Лицо',
                        timeout: entry.max
                    });
                    decorate.el.simpleCell.active({
                        name: 'Лицо',
                        timeout: entry.max
                    });
                });

                describe('Проверка данных "Транспортное средство"', () => {
                    describe('Открытие информации "Транспортное средство"', () => {
                        decorate.el.simpleCell.handler({
                            name: 'Транспортное средство',
                            timeout: entry.max
                        });
                        decorate.el.simpleCell.active({
                            name: 'Транспортное средство',
                            timeout: entry.max
                        });
                    });

                    data.visitor2.ts.arrTS.forEach((obj, index) => {
                        describe(`Проверка ТС ${index + 1}`, () => {
                            decorate.page.staffChange.сarImg({
                                number: index + 1,
                                timeout: entry.max
                            });
                            decorate.page.staffChange.getValueCarInput({
                                title: 'Номер транспортного средства',
                                number: index + 1,
                                value: obj.number,
                                timeout: entry.max
                            });
                            decorate.page.staffChange.getValueCarInput({
                                title: 'Модель транспортного средства',
                                number: index + 1,
                                value: obj.model,
                                timeout: entry.max
                            });
                        });
                    });
                });

                describe('Нажатие кнопки "Вернуться к списку посетителей".', () => {
                    decorate.el.button.handler({
                        name: 'Вернуться к списку посетителей',
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.button.handler({
                        name: 'Вернуться к списку посетителей',
                        timeout: entry.max
                    });
                    decorate.modalConfirm.staffReturn.init({
                        timeout: entry.max
                    });
                    decorate.el.button.handler({
                        name: 'Подтвердить',
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                });
            });
        }

        if(type ==='visitorActive') {
            describe('Редактирование', () => {
                befActive();
                aft();

                describe('Открытие страницы на редактирование', () => {
                    decorate.el.table.strHandler({
                        strNumber: 1,
                        timeout: entry.max
                    });
                    decorate.el.butIcBefore.handler({
                        icon: but.edit,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.page.visitorChange.initEdit({
                        timeout: entry.max
                    });
                });

                describe('Изменение данных "Общая информация"', () => {
                    describe('Основная информация', () => {
                        decorate.el.input.backSpace({
                            title: 'Фамилия',
                            placeholder: 'Фамилия',
                            timeout: entry.max
                        });
                        decorate.el.input.sendKeys({
                            title: 'Фамилия',
                            placeholder: 'Фамилия',
                            value: data.visitor2.lastName,
                            timeout: entry.max
                        });

                        decorate.el.input.backSpace({
                            title: 'Имя',
                            placeholder: 'Имя',
                            timeout: entry.max
                        });
                        decorate.el.input.sendKeys({
                            title: 'Имя',
                            placeholder: 'Имя',
                            value: data.visitor2.firstName,
                            timeout: entry.max
                        });

                        decorate.el.input.backSpace({
                            title: 'Отчество',
                            placeholder: 'Отчество',
                            timeout: entry.max
                        });
                        decorate.el.input.sendKeys({
                            title: 'Отчество',
                            placeholder: 'Отчество',
                            value: data.visitor2.middleName,
                            timeout: entry.max
                        });

                        decorate.el.input.backSpace({
                            title: 'E-Mail',
                            placeholder: 'E-Mail',
                            timeout: entry.max
                        });
                        decorate.el.input.sendKeys({
                            title: 'E-Mail',
                            placeholder: 'E-Mail',
                            value: data.visitor2.mail,
                            timeout: entry.max
                        });
                    });

                    describe('Учетные данные', () => {
                        decorate.el.selectInput.iconXpand({
                            title: 'Куда (подразделение)',
                            placeholder: 'Куда (подразделение)',
                            timeout: entry.max
                        });
                        decorate.el.selectXpand.xpand({
                            timeout: entry.max
                        });
                        decorate.el.selectXpand.handler({
                            value: data.divisions.division3.name,
                            timeout: entry.max
                        });
                        decorate.el.selectXpand.xpandNoElement({
                            timeout: entry.max
                        });
                        decorate.el.selectInput.iconOutline({
                            title: 'Куда (подразделение)',
                            placeholder: 'Куда (подразделение)',
                            timeout: entry.max
                        });
                        decorate.modal.divisionFilter.init({
                            timeout: entry.max
                        });
                        decorate.el.filterTreeNode.handler({
                            name: data.visitor2.division,
                            timeout: entry.max
                        });
                        decorate.el.button.handler({
                            name: 'Выбрать',
                            timeout: entry.max
                        });
                        decorate.modal.divisionFilter.initClose({
                            timeout: entry.max
                        });

                        decorate.el.selectInput.iconXpand({
                            title: 'Сопровождающий',
                            placeholder: 'Сопровождающий',
                            timeout: entry.max
                        });
                        decorate.el.selectXpand.xpand({
                            timeout: entry.max
                        });
                        decorate.el.selectXpand.handler({
                            value: data.visitor2.staff,
                            timeout: entry.max
                        });
                        decorate.el.selectXpand.xpandNoElement({
                            timeout: entry.max
                        });

                        decorate.el.input.iconCard({
                            title: 'Карта / идентификатор',
                            placeholder: 'Карта / идентификатор',
                            timeout: entry.max
                        });
                        decorate.modal.cardControlsAdd.init({
                            timeout: entry.max
                        });
                        decorate.modal.cardControlsNumber.inputSendKeys( {
                            title: 'Идентификатор карты',
                            placeholder: '',
                            value: data.visitor2.card,
                            timeout: entry.max
                        });
                        decorate.modal.cardControlsNumber.buttonHandler({
                            name: 'Сохранить',
                            timeout: entry.max
                        });
                        decorate.modal.cardControlsNumber.initClose({
                            timeout: entry.max
                        });

                        decorate.el.input.backSpace({
                            title: 'Подтверждающий документ',
                            placeholder: 'Подтверждающий документ',
                            value: data.visitor1.document,
                            timeout: entry.max
                        });
                        decorate.el.input.sendKeys({
                            title: 'Подтверждающий документ',
                            placeholder: 'Подтверждающий документ',
                            value: data.visitor2.document,
                            timeout: entry.max
                        });

                        decorate.el.selectInput.iconXpand({
                            title: 'Шаблон доступа',
                            placeholder: 'Шаблон доступа',
                            timeout: entry.max
                        });
                        decorate.el.selectXpand.xpand({
                            timeout: entry.max
                        });
                        decorate.el.selectXpand.handler({
                            value: data.visitor2.template,
                            timeout: entry.max
                        });
                        decorate.el.selectXpand.xpandNoElement({
                            timeout: entry.max
                        });

                        decorate.el.input.backSpace({
                            title: 'Номер документа',
                            placeholder: 'Номер документа',
                            timeout: entry.max
                        });
                        decorate.el.input.sendKeys({
                            title: 'Номер документа',
                            placeholder: 'Номер документа',
                            value: data.visitor2.documentNumber,
                            timeout: entry.max
                        });

                        decorate.el.input.iconCalendar({
                            title: 'Действует до',
                            placeholder: 'Действует до',
                            timeout: entry.max
                        });
                        decorate.el.datepicker.date({
                            day: data.visitor2.dateAfter.day,
                            month: data.visitor2.dateAfter.month,
                            year: data.visitor2.dateAfter.year,
                            scrollYear: -500,
                            timeout: entry.max
                        });

                    });

                    describe('Дополнительные поля', () => {
                        decorate.el.input.backSpace({
                            title: 'Пин-код',
                            placeholder: '',
                            timeout: entry.max
                        });
                        decorate.el.input.sendKeys({
                            title: 'Пин-код',
                            placeholder: '',
                            value: data.visitor2.pinCode,
                            timeout: entry.max
                        });
                    });

                    describe('Фотография', () => {
                        decorate.el.photography.imageVisitor({
                            timeout: entry.max
                        });
                        decorate.el.butIcBefore.handler({
                            icon: but.unsorted_delete_outline_android,
                            timeout: entry.max
                        });
                        decorate.modalConfirm.staffDeleteImage.init({
                            timeout: entry.max
                        });
                        decorate.el.button.handler({
                            name: 'Удалить',
                            timeout: entry.max
                        });
                        decorate.modalConfirm.staffDeleteImage.initClose({
                            timeout: entry.max
                        });
                        decorate.el.photography.noImageVisitor({
                            timeout: entry.max
                        });
                        decorate.el.photography.addImage({
                            name: 'Загрузить фотографию',
                            timeout: entry.max
                        });
                        decorate.modal.changePhoto.init({
                            timeout: entry.max
                        });
                        decorate.modal.changePhoto.noImage({
                            timeout: entry.max
                        });
                        decorate.modal.changePhoto.addImage({
                            src: imp.photo.photo1,
                            timeout: entry.max
                        });
                        decorate.modal.changePhoto.image({
                            timeout: entry.max
                        });
                        decorate.el.button.handler({
                            name: 'Сохранить',
                            timeout: entry.max
                        });
                        decorate.modal.changePhoto.initClose({
                            timeout: entry.max
                        });
                        decorate.el.photography.imageVisitor({
                            timeout: entry.max
                        });
                    });
                });

                describe('Изменение данных "Шрихкод"', () => {
                    describe('Открытие информации "Штрихкод"', () => {
                        decorate.el.simpleCell.handler({
                            name: 'Штрихкод',
                            timeout: entry.max
                        });
                        decorate.el.simpleCell.active({
                            name: 'Штрихкод',
                            timeout: entry.max
                        });
                    });


                    describe('Удаление штрикода по кнопке в поле ввода', () => {
                        decorate.el.input.iconClear({
                            title: '',
                            placeholder: '',
                            timeout: entry.max
                        });
                        decorate.modalConfirm.staffChangeDeleteBarcode.init({
                            timeout: entry.max
                        });
                        decorate.el.button.handler({
                            name: 'Подтвердить',
                            timeout: entry.max
                        });
                        decorate.modalConfirm.staffChangeDeleteBarcode.initClose({
                            timeout: entry.max
                        });
                        decorate.el.input.getValue({
                            title: '',
                            placeholder: '',
                            value: '',
                            timeout: entry.max
                        });
                    });

                    describe('Ввод штрикода', () => {
                        decorate.el.input.sendKeys({
                            title: '',
                            placeholder: '',
                            value: data.visitor2.barcode,
                            timeout: entry.max
                        });
                    });
                });

                describe('Открытие информации "Отпечаток"', () => {
                    decorate.el.simpleCell.handler({
                        name: 'Отпечаток',
                        timeout: entry.max
                    });
                    decorate.el.simpleCell.active({
                        name: 'Отпечаток',
                        timeout: entry.max
                    });
                });

                describe('Открытие информации "Ладонь"', () => {
                    decorate.el.simpleCell.handler({
                        name: 'Ладонь',
                        timeout: entry.max
                    });
                    decorate.el.simpleCell.active({
                        name: 'Ладонь',
                        timeout: entry.max
                    });
                });

                describe('Открытие информации "Лицо"', () => {
                    decorate.el.simpleCell.handler({
                        name: 'Лицо',
                        timeout: entry.max
                    });
                    decorate.el.simpleCell.active({
                        name: 'Лицо',
                        timeout: entry.max
                    });
                });

                describe('Изменение данных "Транспортное средство"', () => {
                    describe('Открытие информации "Транспортное средство"', () => {
                        decorate.el.simpleCell.handler({
                            name: 'Транспортное средство',
                            timeout: entry.max
                        });
                        decorate.el.simpleCell.active({
                            name: 'Транспортное средство',
                            timeout: entry.max
                        });
                    });

                    describe('Удаление транспортных средств', () => {
                        [...Array(4).keys()].forEach(() => {
                            decorate.el.button.handler({
                                name: 'Удалить',
                                timeout: entry.max
                            });
                            decorate.modalConfirm.staffDeleteCar.init({
                                timeout: entry.max
                            });
                            decorate.el.button.handler({
                                name: 'Подтвердить',
                                timeout: entry.max
                            });
                            decorate.modalConfirm.staffDeleteCar.initClose({
                                timeout: entry.max
                            });
                        });
                    });

                    data.visitor2.ts.arrTS.forEach((obj, index) => {
                        describe(`Добавление ТС ${index + 1}`, () => {
                            decorate.page.staffChange.addCarButton({
                                name: 'Добавить транспортное средство',
                                timeout: entry.max
                            });
                            decorate.page.staffChange.addCarImg({
                                name: 'Загрузить фотографию',
                                number: index + 1,
                                timeout: entry.max
                            });
                            decorate.modal.addPhoto.init({
                                timeout: entry.max
                            });
                            decorate.modal.addPhoto.noImage({
                                timeout: entry.max
                            });
                            decorate.modal.addPhoto.addImage({
                                src: imp.photo.photo1,
                                timeout: entry.max
                            });
                            decorate.modal.addPhoto.image({
                                timeout: entry.max
                            });
                            decorate.el.button.handler({
                                name: 'Сохранить',
                                timeout: entry.max
                            });
                            decorate.modal.addPhoto.initClose({
                                timeout: entry.max
                            });
                            decorate.page.staffChange.сarImg({
                                number: index + 1,
                                timeout: entry.max
                            });
                            decorate.page.staffChange.sendKeysCarInput({
                                title: 'Номер транспортного средства',
                                number: index + 1,
                                value: obj.number,
                                timeout: entry.max
                            });
                            decorate.page.staffChange.sendKeysCarInput({
                                title: 'Модель транспортного средства',
                                number: index + 1,
                                value: obj.model,
                                timeout: entry.max
                            });
                        });
                    });
                });

                describe('Сохранение и нажатие кнопки "Вернуться к списку посетителей".', () => {
                    decorate.el.button.handler({
                        name: 'Сохранить изменения'
                    });
                    decorate.el.success.success({
                        text: 'Данные успешно изменены',
                        timeout: entry.max
                    });
                    decorate.el.button.handler({
                        name: 'Вернуться к списку посетителей',
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.page.visitorCurrent.init({
                        timeout: entry.max
                    });
                });

            });

            describe('Проверка таблицы', () => {
                befActive();
                aft();
                decorate.el.table.size({
                    strCount: 1,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Посетитель',
                    strNumber: 1,
                    cellNumber: 2,
                    value: data.visitor2.fio,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Сопровождающий',
                    strNumber: 1,
                    cellNumber: 3,
                    value: data.visitor2.staff,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Документ',
                    strNumber: 1,
                    cellNumber: 4,
                    value: data.visitor2.document,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Номер документа',
                    strNumber: 1,
                    cellNumber: 5,
                    value: data.visitor2.documentNumber,
                    timeout: entry.max
                });
                decorate.el.table.cellNoIconLock({
                    strNumber: 1,
                    cellNumber: 6,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Дата заказа',
                    strNumber: 1,
                    cellNumber: 7,
                    value: data.event1,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Действует с',
                    strNumber: 1,
                    cellNumber: 8,
                    value: data.visitor2.dateIn.date + ':00',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Действителен до',
                    strNumber: 1,
                    cellNumber: 9,
                    value: data.visitor2.dateAfter.date + ':00',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Куда (подразделение)',
                    strNumber: 1,
                    cellNumber: 10,
                    value: data.visitor2.division,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Карта',
                    strNumber: 1,
                    cellNumber: 12,
                    value: data.visitor2.card,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Штрихкод',
                    strNumber: 1,
                    cellNumber: 13,
                    value: data.visitor2.barcode,
                    timeout: entry.max
                });
                decorate.el.table.cellImg({
                    headTitle: 'Фотография',
                    strNumber: 1,
                    cellNumber: 14,
                    timeout: entry.max
                });
            });

            describe('Проверка параметров', () => {
                befActive();
                aft();

                describe('Открытие посетителя на редактирование', () => {
                    decorate.el.table.strHandler({
                        strNumber: 1,
                        timeout: entry.max
                    });
                    decorate.el.butIcBefore.handler({
                        icon: but.edit,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.page.visitorChange.initEdit({
                        timeout: entry.max
                    });
                });

                describe('Проверка данных "Общая информация"', () => {
                    describe('Основная информация', () => {
                        decorate.el.input.getValue({
                            title: 'Фамилия',
                            placeholder: 'Фамилия',
                            value: data.visitor2.lastName,
                            timeout: entry.max
                        });
                        decorate.el.input.getValue({
                            title: 'Имя',
                            placeholder: 'Имя',
                            value: data.visitor2.firstName,
                            timeout: entry.max
                        });
                        decorate.el.input.getValue({
                            title: 'Отчество',
                            placeholder: 'Отчество',
                            value: data.visitor2.middleName,
                            timeout: entry.max
                        });
                        decorate.el.input.getValue({
                            title: 'E-Mail',
                            placeholder: 'E-Mail',
                            value: data.visitor2.mail,
                            timeout: entry.max
                        });
                    });

                    describe('Учетные данные', () => {
                        decorate.el.input.getValue({
                            title: 'Куда (подразделение)',
                            placeholder: 'Куда (подразделение)',
                            value: data.visitor2.division,
                            timeout: entry.max
                        });
                        decorate.el.input.getValue({
                            title: 'Сопровождающий',
                            placeholder: 'Сопровождающий',
                            value: data.visitor2.staff,
                            timeout: entry.max
                        });
                        decorate.el.input.getValue({
                            title: 'Карта / идентификатор',
                            placeholder: 'Карта / идентификатор',
                            value: data.visitor2.card,
                            timeout: entry.max
                        });
                        decorate.el.input.getValue({
                            title: 'Подтверждающий документ',
                            placeholder: 'Подтверждающий документ',
                            value: data.visitor2.document,
                            timeout: entry.max
                        });
                        decorate.el.input.getValue({
                            title: 'Номер документа',
                            placeholder: 'Номер документа',
                            value: data.visitor2.documentNumber,
                            timeout: entry.max
                        });
                        decorate.el.input.getValue({
                            title: 'Действует с',
                            placeholder: 'Действует с',
                            value: data.visitor2.dateIn.date,
                            timeout: entry.max
                        });
                        decorate.el.input.getValue({
                            title: 'Шаблон доступа',
                            placeholder: 'Шаблон доступа',
                            value: data.visitor2.template,
                            timeout: entry.max
                        });
                        decorate.el.input.getValue({
                            title: 'Действует до',
                            placeholder: 'Действует до',
                            value: data.visitor2.dateAfter.date,
                            timeout: entry.max
                        });
                    });

                    describe('Дополнительные поля', () => {
                        decorate.el.input.getValue({
                            title: 'Пин-код',
                            placeholder: '',
                            value: data.visitor2.pinCode,
                            timeout: entry.max
                        });
                    });

                    describe('Фотография', () => {
                        decorate.el.photography.imageVisitor({
                            timeout: entry.max
                        });
                    });
                });

                describe('Проверка данных "Шрихкод"', () => {
                    describe('Открытие информации "Штрихкод"', () => {
                        decorate.el.simpleCell.handler({
                            name: 'Штрихкод',
                            timeout: entry.max
                        });
                        decorate.el.simpleCell.active({
                            name: 'Штрихкод',
                            timeout: entry.max
                        });
                    });

                    describe('Проверка штрихкода', () => {
                        it('Проверка отображение картинки штрикода', async () => {
                            const barcode = await page.staffChange.getBarcodeSrc(entry.max);
                            expect(!!barcode.text).to.equal(true);
                        });
                        decorate.el.input.getValue({
                            title: '',
                            placeholder: '',
                            value: data.visitor2.barcode,
                            timeout: entry.max
                        });
                    });
                });

                describe('Проверка информации "Отпечаток"', () => {
                    decorate.el.simpleCell.handler({
                        name: 'Отпечаток',
                        timeout: entry.max
                    });
                    decorate.el.simpleCell.active({
                        name: 'Отпечаток',
                        timeout: entry.max
                    });
                });

                describe('Проверка информации "Ладонь"', () => {
                    decorate.el.simpleCell.handler({
                        name: 'Ладонь',
                        timeout: entry.max
                    });
                    decorate.el.simpleCell.active({
                        name: 'Ладонь',
                        timeout: entry.max
                    });
                });

                describe('Проверка информации "Лицо"', () => {
                    decorate.el.simpleCell.handler({
                        name: 'Лицо',
                        timeout: entry.max
                    });
                    decorate.el.simpleCell.active({
                        name: 'Лицо',
                        timeout: entry.max
                    });
                });

                describe('Проверка данных "Транспортное средство"', () => {
                    describe('Открытие информации "Транспортное средство"', () => {
                        decorate.el.simpleCell.handler({
                            name: 'Транспортное средство',
                            timeout: entry.max
                        });
                        decorate.el.simpleCell.active({
                            name: 'Транспортное средство',
                            timeout: entry.max
                        });
                    });

                    data.visitor2.ts.arrTS.forEach((obj, index) => {
                        describe(`Проверка ТС ${index + 1}`, () => {
                            decorate.page.staffChange.сarImg({
                                number: index + 1,
                                timeout: entry.max
                            });
                            decorate.page.staffChange.getValueCarInput({
                                title: 'Номер транспортного средства',
                                number: index + 1,
                                value: obj.number,
                                timeout: entry.max
                            });
                            decorate.page.staffChange.getValueCarInput({
                                title: 'Модель транспортного средства',
                                number: index + 1,
                                value: obj.model,
                                timeout: entry.max
                            });
                        });
                    });
                });

                describe('Нажатие кнопки "Вернуться к списку посетителей".', () => {
                    decorate.el.button.handler({
                        name: 'Вернуться к списку посетителей',
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.button.handler({
                        name: 'Вернуться к списку посетителей',
                        timeout: entry.max
                    });
                    decorate.page.visitorCurrent.init({
                        timeout: entry.max
                    });
                    decorate.el.button.handler({
                        name: 'Подтвердить',
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                });
            });
        }
    });

    const importMinParams = () => describe(text + 'Проверка импорта с минимальным количеством параметров.', () => {

        if(type === 'visitorOrder') {
            describe('Импорт', () => {
                befOrdered();
                aft();
                decorate.el.butIcBefore.handler({
                    icon: but.menu,
                    timeout: entry.max
                });
                decorate.el.menu.menu({
                    timeout: entry.max
                });
                decorate.el.menu.handler({
                    name: 'Импорт из XLS, XLSX',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.modal.importFile.init({
                    timeout: entry.max
                });
                decorate.modal.importFile.uploadFile({
                    src: imp.visitor.importVisitor,
                    timeout: entry.upload
                });
                decorate.el.select.iconXpand({
                    title: 'Имя',
                    value: '',
                    text: 'Имя1',
                    timeout: entry.max
                });
                decorate.el.select.iconXpand({
                    title: 'Фамилия',
                    value: '',
                    text: 'Фамилия1',
                    timeout: entry.max
                });
                decorate.el.select.iconXpand({
                    title: 'Отчество',
                    value: '',
                    text: 'Отчество1',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.select.iconXpand({
                    title: 'Подразделение',
                    value: '',
                    text: 'Подразделение1',
                    timeout: entry.max
                });
                decorate.modal.importFile.scrollTop({
                   number: 500,
                   timout: entry.max
                });
                decorate.el.checkbox.handler({
                    name: 'Импорт несуществующих подразделений',
                    timout: entry.max
                });
                decorate.el.checkbox.checked({
                    name: 'Импорт несуществующих подразделений',
                    timout: entry.max
                });
                decorate.el.button.handler({
                    name: 'Далее',
                    timeout: entry.max
                });
                decorate.el.button.button({
                    name: 'Готово',
                    timeout: entry.max
                });
                decorate.modal.importFile.bodyGetText({
                    value: 'Импорт завершен',
                    timeout: entry.max
                });
                decorate.el.button.handler({
                    name: 'Готово',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.modal.importFile.initClose({
                    timeout: entry.max
                });
            });

            describe('Проверка отображения посетителя в таблице', () => {
                befOrdered();
                aft();
                decorate.el.table.size({
                    strCount: 1,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Посетитель',
                    strNumber: 1,
                    cellNumber: 1,
                    value: data.visitor1.fio,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Куда (подразделение)',
                    strNumber: 1,
                    cellNumber: 9,
                    value: data.divisions.division4.name,
                    timeout: entry.max
                });
            });

            describe('Проверка отображения параметров посетителя', () => {
                befOrdered();
                aft();

                describe('Открытие сотрудника на редактирование', () => {
                    decorate.el.table.strHandler({
                        strNumber: 1,
                        timeout: entry.max
                    });
                    decorate.el.butIcBefore.handler({
                        icon: but.edit,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.page.visitorChange.initEdit({
                        timeout: entry.max
                    });
                });

                describe('Проверка данных "Общая информация"', () => {
                    describe('Основная информация', () => {
                        decorate.el.input.getValue({
                            title: 'Фамилия',
                            placeholder: 'Фамилия',
                            value: data.visitor1.lastName,
                            timeout: entry.max
                        });
                        decorate.el.input.getValue({
                            title: 'Имя',
                            placeholder: 'Имя',
                            value:  data.visitor1.firstName,
                            timeout: entry.max
                        });
                        decorate.el.input.getValue({
                            title: 'Отчество',
                            placeholder: 'Отчество',
                            value: data.visitor1.middleName,
                            timeout: entry.max
                        });
                    });
                    describe('Учетные данные', () => {
                        decorate.el.input.getValue({
                            title: 'Куда (подразделение)',
                            placeholder: 'Куда (подразделение)',
                            value: data.divisions.division4.name,
                            timeout: entry.max
                        });
                    });
                });

                describe('Нажатие кнопки "Вернуться к списку посетителей".', () => {
                    decorate.el.button.handler({
                        name: 'Вернуться к списку посетителей',
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.page.visitorOrder.init({
                        timeout: entry.max
                    });
                });
            });

            describe('Удаление посетителя из БД', () => {
                befOrdered();
                aft();
                it('Удаление посетителей', async () => {
                    const cook = await page.base.getCookie('token');
                    const arrVisitor = await api.getVisitor(cook.text);
                    console.log( arrVisitor)
                    const visitor1 = arrVisitor.text.filter(obj => obj.name === data.visitor1.fio)[0].id;
                    await dec.simple(db.deleteAlUserAdditionalData,
                        [],
                        db.deleteAlUserAdditionalData);
                    await dec.simple(db.deleteUser,
                        [visitor1],
                        db.deleteUser);
                });
                it('Удаление подразделения', async () => {
                    const cook = await page.base.getCookie('token');
                    const arrDivision = await api.getDivision(cook.text);
                    const division1 = arrDivision.text.filter(obj => obj.name === data.divisions.division4.name)[0].id;

                    await dec.simple(api.deleteDivision,
                        [[division1], cook.text],
                        api.deleteDivision);
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
            });
        }

        if(type === 'visitorActive') {
            describe('Импорт', () => {
                befActive();
                aft();
                decorate.el.butIcBefore.handler({
                    icon: but.menu,
                    timeout: entry.max
                });
                decorate.el.menu.menu({
                    timeout: entry.max
                });
                decorate.el.menu.handler({
                    name: 'Импорт из XLS, XLSX',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.modal.importFile.init({
                    timeout: entry.max
                });
                decorate.modal.importFile.uploadFile({
                    src: imp.visitor.importVisitor,
                    timeout: entry.upload
                });
                decorate.el.select.iconXpand({
                    title: 'Имя',
                    value: '',
                    text: 'Имя1',
                    timeout: entry.max
                });
                decorate.el.select.iconXpand({
                    title: 'Фамилия',
                    value: '',
                    text: 'Фамилия1',
                    timeout: entry.max
                });
                decorate.el.select.iconXpand({
                    title: 'Отчество',
                    value: '',
                    text: 'Отчество1',
                    timeout: entry.max
                });
                decorate.el.select.iconXpand({
                    title: 'Подразделение',
                    value: '',
                    text: 'Подразделение1',
                    timeout: entry.max
                });
                decorate.el.select.iconXpand({
                    title: 'Шаблон доступа',
                    value: '',
                    text: 'Шаблон доступа1',
                    timeout: entry.max
                });
                decorate.el.select.iconXpand({
                    title: 'Карта доступа',
                    value: '',
                    text: 'Карта1',
                    timeout: entry.max
                });
                decorate.modal.importFile.scrollTop({
                    number: 500,
                    timout: entry.max
                });
                decorate.el.checkbox.handler({
                    name: 'Импорт несуществующих подразделений',
                    timout: entry.max
                });
                decorate.el.checkbox.checked({
                    name: 'Импорт несуществующих подразделений',
                    timout: entry.max
                });
                decorate.el.button.handler({
                    name: 'Далее',
                    timeout: entry.max
                });
                decorate.el.button.button({
                    name: 'Готово',
                    timeout: entry.max
                });
                decorate.modal.importFile.bodyGetText({
                    value: 'Импорт завершен',
                    timeout: entry.max
                });
                decorate.el.button.handler({
                    name: 'Готово',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.modal.importFile.initClose({
                    timeout: entry.max
                });
            });

            describe('Проверка отображения посетителя в таблице', () => {
                befActive();
                aft();
                decorate.el.table.size({
                    strCount: 1,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Посетитель',
                    strNumber: 1,
                    cellNumber: 2,
                    value: data.visitor1.fio,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Куда (подразделение)',
                    strNumber: 1,
                    cellNumber: 10,
                    value: data.divisions.division4.name,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Шаблон доступа',
                    strNumber: 1,
                    cellNumber: 11,
                    value: data.visitor1.template,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Карта',
                    strNumber: 1,
                    cellNumber: 12,
                    value: data.visitor1.card,
                    timeout: entry.max
                });
            });

            describe('Проверка отображения параметров посетителя', () => {
                befActive();
                aft();

                describe('Открытие сотрудника на редактирование', () => {
                    decorate.el.table.strHandler({
                        strNumber: 1,
                        timeout: entry.max
                    });
                    decorate.el.butIcBefore.handler({
                        icon: but.edit,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.page.visitorChange.initEdit({
                        timeout: entry.max
                    });
                });

                describe('Проверка данных "Общая информация"', () => {
                    describe('Основная информация', () => {
                        decorate.el.input.getValue({
                            title: 'Фамилия',
                            placeholder: 'Фамилия',
                            value: data.visitor1.lastName,
                            timeout: entry.max
                        });
                        decorate.el.input.getValue({
                            title: 'Имя',
                            placeholder: 'Имя',
                            value:  data.visitor1.firstName,
                            timeout: entry.max
                        });
                        decorate.el.input.getValue({
                            title: 'Отчество',
                            placeholder: 'Отчество',
                            value: data.visitor1.middleName,
                            timeout: entry.max
                        });
                    });
                    describe('Учетные данные', () => {
                        decorate.el.input.getValue({
                            title: 'Куда (подразделение)',
                            placeholder: 'Куда (подразделение)',
                            value: data.divisions.division4.name,
                            timeout: entry.max
                        });
                        decorate.el.input.getValue({
                            title: 'Карта / идентификатор',
                            placeholder: 'Карта / идентификатор',
                            value: data.visitor1.card,
                            timeout: entry.max
                        });
                        decorate.el.input.getValue({
                            title: 'Шаблон доступа',
                            placeholder: 'Шаблон доступа',
                            value: data.visitor1.template,
                            timeout: entry.max
                        });
                    });
                });

                describe('Нажатие кнопки "Вернуться к списку посетителей".', () => {
                    decorate.el.button.handler({
                        name: 'Вернуться к списку посетителей',
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.page.visitorCurrent.init({
                        timeout: entry.max
                    });
                });
            });

            describe('Удаление посетителя из БД', () => {
                befActive();
                aft();
                it('Удаление посетителей', async () => {
                    const cook = await page.base.getCookie('token');
                    const arrVisitor = await api.getVisitor(cook.text);
                    console.log( arrVisitor)
                    const visitor1 = arrVisitor.text.filter(obj => obj.name === data.visitor1.fio)[0].id;
                    await dec.simple(db.deleteAlUserAdditionalData,
                        [],
                        db.deleteAlUserAdditionalData);
                    await dec.simple(db.deleteUser,
                        [visitor1],
                        db.deleteUser);
                });
                it('Удаление подразделения', async () => {
                    const cook = await page.base.getCookie('token');
                    const arrDivision = await api.getDivision(cook.text);
                    const division1 = arrDivision.text.filter(obj => obj.name === data.divisions.division4.name)[0].id;

                    await dec.simple(api.deleteDivision,
                        [[division1], cook.text],
                        api.deleteDivision);
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
            });
        }

        if(type === 'visitorPassOrder') {
            describe('Импорт', () => {
                befPassOrder();
                aft();
                decorate.el.butIcBefore.handler({
                    icon: but.menu,
                    timeout: entry.max
                });
                decorate.el.menu.menu({
                    timeout: entry.max
                });
                decorate.el.menu.handler({
                    name: 'Импорт из XLS, XLSX',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.modal.importFile.init({
                    timeout: entry.max
                });
                decorate.modal.importFile.uploadFile({
                    src: imp.visitor.importVisitor,
                    timeout: entry.upload
                });
                decorate.el.select.iconXpand({
                    title: 'Имя',
                    value: '',
                    text: 'Имя1',
                    timeout: entry.max
                });
                decorate.el.select.iconXpand({
                    title: 'Фамилия',
                    value: '',
                    text: 'Фамилия1',
                    timeout: entry.max
                });
                decorate.el.select.iconXpand({
                    title: 'Отчество',
                    value: '',
                    text: 'Отчество1',
                    timeout: entry.max
                });
                decorate.modal.importFile.iconXpand({
                    title: 'Подразделение',
                    value: '',
                    text: 'Подразделение1',
                    timeout: entry.max
                });
                decorate.modal.importFile.scrollTop({
                    number: 500,
                    timout: entry.max
                });
                decorate.el.checkbox.handler({
                    name: 'Импорт несуществующих подразделений',
                    timout: entry.max
                });
                decorate.el.checkbox.checked({
                    name: 'Импорт несуществующих подразделений',
                    timout: entry.max
                });
                decorate.el.button.handler({
                    name: 'Далее',
                    timeout: entry.max
                });
                decorate.el.button.button({
                    name: 'Готово',
                    timeout: entry.max
                });
                decorate.modal.importFile.bodyGetText({
                    value: 'Импорт завершен',
                    timeout: entry.max
                });
                decorate.el.button.handler({
                    name: 'Готово',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.modal.importFile.initClose({
                    timeout: entry.max
                });
            });

            describe('Проверка отображения посетителя в таблице', () => {
                befPassOrder();
                aft();
                decorate.el.table.size({
                    strCount: 1,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Посетитель',
                    strNumber: 1,
                    cellNumber: 1,
                    value: data.visitor1.fio,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Куда (подразделение)',
                    strNumber: 1,
                    cellNumber: 6,
                    value: data.divisions.division4.name,
                    timeout: entry.max
                });
            });

            describe('Проверка отображения параметров посетителя', () => {
                befPassOrder();
                aft();

                describe('Открытие сотрудника на редактирование', () => {
                    decorate.el.table.strHandler({
                        strNumber: 1,
                        timeout: entry.max
                    });
                    decorate.el.butIcBefore.handler({
                        icon: but.edit,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.page.orderpassChange.initEdit({
                        timeout: entry.max
                    });
                });

                describe('Проверка данных "Общая информация"', () => {
                    describe('Основная информация', () => {
                        decorate.el.input.getValue({
                            title: 'Фамилия',
                            placeholder: 'Фамилия',
                            value: data.visitor1.lastName,
                            timeout: entry.max
                        });
                        decorate.el.input.getValue({
                            title: 'Имя',
                            placeholder: 'Имя',
                            value:  data.visitor1.firstName,
                            timeout: entry.max
                        });
                        decorate.el.input.getValue({
                            title: 'Отчество',
                            placeholder: 'Отчество',
                            value: data.visitor1.middleName,
                            timeout: entry.max
                        });
                    });
                    describe('Учетные данные', () => {
                        decorate.el.input.getValue({
                            title: 'Куда (подразделение)',
                            placeholder: 'Куда (подразделение)',
                            value: data.divisions.division4.name,
                            timeout: entry.max
                        });
                    });
                });

                describe('Нажатие кнопки "Вернуться к списку посетителей".', () => {
                    decorate.el.button.handler({
                        name: 'Вернуться к списку посетителей',
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.page.orderpassOrder.init({
                        timeout: entry.max
                    });
                });
            });

            describe('Удаление посетителя из БД', () => {
                befPassOrder();
                aft();
                it('Удаление посетителей', async () => {
                    const cook = await page.base.getCookie('token');
                    const arrVisitor = await api.getVisitor(cook.text);
                    console.log( arrVisitor)
                    const visitor1 = arrVisitor.text.filter(obj => obj.name === data.visitor1.fio)[0].id;
                    await dec.simple(db.deleteAlUserAdditionalData,
                        [],
                        db.deleteAlUserAdditionalData);
                    await dec.simple(db.deleteUser,
                        [visitor1],
                        db.deleteUser);
                });
                it('Удаление подразделения', async () => {
                    const cook = await page.base.getCookie('token');
                    const arrDivision = await api.getDivision(cook.text);
                    const division1 = arrDivision.text.filter(obj => obj.name === data.divisions.division4.name)[0].id;

                    await dec.simple(api.deleteDivision,
                        [[division1], cook.text],
                        api.deleteDivision);
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
            });
        }
    });

    const importMaxParams = () => describe(text + 'Проверка импорта с максимальным количеством параметров.', () => {

        if(type === 'visitorOrder') {
            describe('Импорт', () => {
                befOrdered();
                aft();
                decorate.el.butIcBefore.handler({
                    icon: but.menu,
                    timeout: entry.max
                });
                decorate.el.menu.menu({
                    timeout: entry.max
                });
                decorate.el.menu.handler({
                    name: 'Импорт из XLS, XLSX',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.modal.importFile.init({
                    timeout: entry.max
                });
                decorate.modal.importFile.uploadFile({
                    src: imp.visitor.importVisitor,
                    timeout: entry.upload
                });
                decorate.el.select.iconXpand({
                    title: 'Имя',
                    value: '',
                    text: 'Имя1',
                    timeout: entry.max
                });
                decorate.el.select.iconXpand({
                    title: 'Фамилия',
                    value: '',
                    text: 'Фамилия1',
                    timeout: entry.max
                });
                decorate.el.select.iconXpand({
                    title: 'Отчество',
                    value: '',
                    text: 'Отчество1',
                    timeout: entry.max
                });
                decorate.el.select.iconXpand({
                    title: 'Подразделение',
                    value: '',
                    text: 'Подразделение1',
                    timeout: entry.max
                });
                decorate.el.select.iconXpand({
                    title: 'Действует с',
                    value: '',
                    text: 'Действителен c1',
                    timeout: entry.max
                });
                decorate.el.select.iconXpand({
                    title: 'Действует до',
                    value: '',
                    text: 'Действителен до1',
                    timeout: entry.max
                });
                decorate.el.select.iconXpand({
                    title: 'Транспортные средства',
                    value: '',
                    text: 'Транспортные средства1',
                    timeout: entry.max
                });
                decorate.modal.importFile.scrollTop({
                    number: 500,
                    timout: entry.max
                });
                decorate.el.select.iconXpand({
                    title: 'Дата заказа',
                    value: '',
                    text: 'Дата заказа1',
                    timeout: entry.max
                });
                decorate.el.select.iconXpand({
                    title: 'Email',
                    value: '',
                    text: 'Email1',
                    timeout: entry.max
                });
                decorate.el.select.iconXpand({
                    title: 'Пин-код',
                    value: '',
                    text: 'Пин-код1',
                    timeout: entry.max
                });
                decorate.el.checkbox.handler({
                    name: 'Импорт несуществующих подразделений',
                    timout: entry.max
                });
                decorate.el.checkbox.checked({
                    name: 'Импорт несуществующих подразделений',
                    timout: entry.max
                });
                decorate.el.button.handler({
                    name: 'Далее',
                    timeout: entry.max
                });
                decorate.el.button.button({
                    name: 'Готово',
                    timeout: entry.max
                });
                decorate.modal.importFile.bodyGetText({
                    value: 'Импорт завершен',
                    timeout: entry.max
                });
                decorate.el.button.handler({
                    name: 'Готово',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.modal.importFile.initClose({
                    timeout: entry.max
                });
            });

            describe('Проверка таблицы', () => {
                befOrdered();
                aft();
                decorate.el.table.size({
                    strCount: 1,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Посетитель',
                    strNumber: 1,
                    cellNumber: 1,
                    value: data.visitor1.fio,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Сопровождающий',
                    strNumber: 1,
                    cellNumber: 2,
                    value: '',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Документ',
                    strNumber: 1,
                    cellNumber: 3,
                    value: '',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Номер документа',
                    strNumber: 1,
                    cellNumber: 4,
                    value: '',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Шаблон доступа',
                    strNumber: 1,
                    cellNumber: 5,
                    value: '',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Дата заказа',
                    strNumber: 1,
                    cellNumber: 6,
                    value: data.visitor1.dateIn.date + ':00',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Действует с',
                    strNumber: 1,
                    cellNumber: 7,
                    value: data.visitor1.dateIn.date + ':00',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Действителен до',
                    strNumber: 1,
                    cellNumber: 8,
                    value: data.visitor1.dateAfter.date + ':00',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Куда (подразделение)',
                    strNumber: 1,
                    cellNumber: 9,
                    value: data.divisions.division4.name,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Карта',
                    strNumber: 1,
                    cellNumber: 10,
                    value: '',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Штрихкод',
                    strNumber: 1,
                    cellNumber: 11,
                    value: '',
                    timeout: entry.max
                });
            });

            describe('Проверка параметров', () => {
                befOrdered();
                aft();

                describe('Открытие посетителя на редактирование', () => {
                    decorate.el.table.strHandler({
                        strNumber: 1,
                        timeout: entry.max
                    });
                    decorate.el.butIcBefore.handler({
                        icon: but.edit,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.page.visitorChange.initEdit({
                        timeout: entry.max
                    });
                });

                describe('Проверка данных "Общая информация"', () => {
                    describe('Основная информация', () => {
                        decorate.el.input.getValue({
                            title: 'Фамилия',
                            placeholder: 'Фамилия',
                            value: data.visitor1.lastName,
                            timeout: entry.max
                        });
                        decorate.el.input.getValue({
                            title: 'Имя',
                            placeholder: 'Имя',
                            value: data.visitor1.firstName,
                            timeout: entry.max
                        });
                        decorate.el.input.getValue({
                            title: 'Отчество',
                            placeholder: 'Отчество',
                            value: data.visitor1.middleName,
                            timeout: entry.max
                        });
                        decorate.el.input.getValue({
                            title: 'E-Mail',
                            placeholder: 'E-Mail',
                            value: data.visitor1.mail,
                            timeout: entry.max
                        });
                    });

                    describe('Учетные данные', () => {
                        decorate.el.input.getValue({
                            title: 'Куда (подразделение)',
                            placeholder: 'Куда (подразделение)',
                            value: data.divisions.division4.name,
                            timeout: entry.max
                        });
                        decorate.el.input.getValue({
                            title: 'Сопровождающий',
                            placeholder: 'Сопровождающий',
                            value: '',
                            timeout: entry.max
                        });
                        decorate.el.input.getValue({
                            title: 'Карта / идентификатор',
                            placeholder: 'Карта / идентификатор',
                            value: '',
                            timeout: entry.max
                        });
                        decorate.el.input.getValue({
                            title: 'Подтверждающий документ',
                            placeholder: 'Подтверждающий документ',
                            value: '',
                            timeout: entry.max
                        });
                        decorate.el.input.getValue({
                            title: 'Номер документа',
                            placeholder: 'Номер документа',
                            value: '',
                            timeout: entry.max
                        });
                        decorate.el.input.getValue({
                            title: 'Действует с',
                            placeholder: 'Действует с',
                            value: data.visitor1.dateIn.date,
                            timeout: entry.max
                        });
                        decorate.el.input.getValue({
                            title: 'Шаблон доступа',
                            placeholder: 'Шаблон доступа',
                            value: '',
                            timeout: entry.max
                        });
                        decorate.el.input.getValue({
                            title: 'Действует до',
                            placeholder: 'Действует до',
                            value: data.visitor1.dateAfter.date,
                            timeout: entry.max
                        });
                    });

                    describe('Дополнительные поля', () => {
                        decorate.el.input.getValue({
                            title: 'Пин-код',
                            placeholder: '',
                            value: data.visitor1.pinCode,
                            timeout: entry.max
                        });
                    });
                });

                describe('Проверка данных "Транспортное средство"', () => {
                    describe('Открытие информации "Транспортное средство"', () => {
                        decorate.el.simpleCell.handler({
                            name: 'Транспортное средство',
                            timeout: entry.max
                        });
                        decorate.el.simpleCell.active({
                            name: 'Транспортное средство',
                            timeout: entry.max
                        });
                    });

                    data.visitor1.ts.arrTS.forEach((obj, index) => {
                        describe(`Проверка ТС ${index + 1}`, () => {
                            decorate.page.staffChange.getValueCarInput({
                                title: 'Номер транспортного средства',
                                number: index + 1,
                                value: obj.number,
                                timeout: entry.max
                            });
                            decorate.page.staffChange.getValueCarInput({
                                title: 'Модель транспортного средства',
                                number: index + 1,
                                value: obj.model,
                                timeout: entry.max
                            });
                        });
                    });
                });

                describe('Нажатие кнопки "Вернуться к списку посетителей".', () => {
                    decorate.el.button.handler({
                        name: 'Вернуться к списку посетителей',
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.button.handler({
                        name: 'Вернуться к списку посетителей',
                        timeout: entry.max
                    });
                    decorate.modalConfirm.staffReturn.init({
                        timeout: entry.max
                    });
                    decorate.el.button.handler({
                        name: 'Подтвердить',
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.page.visitorOrder.init({
                        timeout: entry.max
                    });
                });
            });

            describe('Удаление посетителя из БД', () => {
                befOrdered();
                aft();
                it('Удаление посетителя', async () => {
                    const cook = await page.base.getCookie('token');
                    const arrVisitor = await api.getVisitor(cook.text);
                    console.log(arrVisitor)
                    const visitor1 = arrVisitor.text.filter(obj => obj.name === data.visitor1.fio)[0].id;
                    await dec.simple(db.deleteAlUserAdditionalData,
                        [],
                        db.deleteAlUserAdditionalData);
                    await dec.simple(db.deleteUser,
                        [visitor1],
                        db.deleteUser);
                });
                it('Удаление подразделения', async () => {
                    const cook = await page.base.getCookie('token');
                    const arrDivision = await api.getDivision(cook.text);
                    const division1 = arrDivision.text.filter(obj => obj.name === data.divisions.division4.name)[0].id;

                    await dec.simple(api.deleteDivision,
                        [[division1], cook.text],
                        api.deleteDivision);
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
            });
        }

        if(type === 'visitorActive') {
            describe('Импорт', () => {
                befActive();
                aft();
                decorate.el.butIcBefore.handler({
                    icon: but.menu,
                    timeout: entry.max
                });
                decorate.el.menu.menu({
                    timeout: entry.max
                });
                decorate.el.menu.handler({
                    name: 'Импорт из XLS, XLSX',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.modal.importFile.init({
                    timeout: entry.max
                });
                decorate.modal.importFile.uploadFile({
                    src: imp.visitor.importVisitor,
                    timeout: entry.upload
                });
                decorate.el.select.iconXpand({
                    title: 'Имя',
                    value: '',
                    text: 'Имя1',
                    timeout: entry.max
                });
                decorate.el.select.iconXpand({
                    title: 'Фамилия',
                    value: '',
                    text: 'Фамилия1',
                    timeout: entry.max
                });
                decorate.el.select.iconXpand({
                    title: 'Отчество',
                    value: '',
                    text: 'Отчество1',
                    timeout: entry.max
                });
                decorate.el.select.iconXpand({
                    title: 'Подразделение',
                    value: '',
                    text: 'Подразделение1',
                    timeout: entry.max
                });
                decorate.el.select.iconXpand({
                    title: 'Шаблон доступа',
                    value: '',
                    text: 'Шаблон доступа1',
                    timeout: entry.max
                });
                decorate.el.select.iconXpand({
                    title: 'Карта доступа',
                    value: '',
                    text: 'Карта1',
                    timeout: entry.max
                });
                decorate.el.select.iconXpand({
                    title: 'Действует с',
                    value: '',
                    text: 'Действителен c1',
                    timeout: entry.max
                });
                decorate.modal.importFile.scrollTop({
                    number: 500,
                    timout: entry.max
                });
                decorate.el.select.iconXpand({
                    title: 'Действует до',
                    value: '',
                    text: 'Действителен до1',
                    timeout: entry.max
                });
                decorate.el.select.iconXpand({
                    title: 'Транспортные средства',
                    value: '',
                    text: 'Транспортные средства1',
                    timeout: entry.max
                });
                decorate.el.select.iconXpand({
                    title: 'Дата создания',
                    value: '',
                    text: 'Дата заказа1',
                    timeout: entry.max
                });
                decorate.el.select.iconXpand({
                    title: 'Email',
                    value: '',
                    text: 'Email1',
                    timeout: entry.max
                });
                decorate.el.select.iconXpand({
                    title: 'Пин-код',
                    value: '',
                    text: 'Пин-код1',
                    timeout: entry.max
                });
                decorate.el.checkbox.handler({
                    name: 'Импорт несуществующих подразделений',
                    timout: entry.max
                });
                decorate.el.checkbox.checked({
                    name: 'Импорт несуществующих подразделений',
                    timout: entry.max
                });
                decorate.el.button.handler({
                    name: 'Далее',
                    timeout: entry.max
                });
                decorate.el.button.button({
                    name: 'Готово',
                    timeout: entry.max
                });
                decorate.modal.importFile.bodyGetText({
                    value: 'Импорт завершен',
                    timeout: entry.max
                });
                decorate.el.button.handler({
                    name: 'Готово',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.modal.importFile.initClose({
                    timeout: entry.max
                });
            });

            describe('Проверка таблицы', () => {
                befActive();
                aft();
                decorate.el.table.size({
                    strCount: 1,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Посетитель',
                    strNumber: 1,
                    cellNumber: 2,
                    value: data.visitor1.fio,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Сопровождающий',
                    strNumber: 1,
                    cellNumber: 3,
                    value: '',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Документ',
                    strNumber: 1,
                    cellNumber: 4,
                    value: '',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Номер документа',
                    strNumber: 1,
                    cellNumber: 5,
                    value: '',
                    timeout: entry.max
                });
                decorate.el.table.cellNoIconLock({
                    strNumber: 1,
                    cellNumber: 6,
                    value: '',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Дата заказа',
                    strNumber: 1,
                    cellNumber: 7,
                    value: data.visitor1.dateIn.date + ':00',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Действует с',
                    strNumber: 1,
                    cellNumber: 8,
                    value: data.visitor1.dateIn.date + ':00',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Действителен до',
                    strNumber: 1,
                    cellNumber: 9,
                    value: data.visitor1.dateAfter.date + ':00',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Куда (подразделение)',
                    strNumber: 1,
                    cellNumber: 10,
                    value: data.divisions.division4.name,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Шаблон доступа',
                    strNumber: 1,
                    cellNumber: 11,
                    value: data.visitor1.template,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Карта',
                    strNumber: 1,
                    cellNumber: 12,
                    value: data.visitor1.card,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Штрихкод',
                    strNumber: 1,
                    cellNumber: 13,
                    value: '',
                    timeout: entry.max
                });
            });

            describe('Проверка параметров', () => {
                befActive();
                aft();

                describe('Открытие посетителя на редактирование', () => {
                    decorate.el.table.strHandler({
                        strNumber: 1,
                        timeout: entry.max
                    });
                    decorate.el.butIcBefore.handler({
                        icon: but.edit,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.page.visitorChange.initEdit({
                        timeout: entry.max
                    });
                });

                describe('Проверка данных "Общая информация"', () => {
                    describe('Основная информация', () => {
                        decorate.el.input.getValue({
                            title: 'Фамилия',
                            placeholder: 'Фамилия',
                            value: data.visitor1.lastName,
                            timeout: entry.max
                        });
                        decorate.el.input.getValue({
                            title: 'Имя',
                            placeholder: 'Имя',
                            value: data.visitor1.firstName,
                            timeout: entry.max
                        });
                        decorate.el.input.getValue({
                            title: 'Отчество',
                            placeholder: 'Отчество',
                            value: data.visitor1.middleName,
                            timeout: entry.max
                        });
                        decorate.el.input.getValue({
                            title: 'E-Mail',
                            placeholder: 'E-Mail',
                            value: data.visitor1.mail,
                            timeout: entry.max
                        });
                    });

                    describe('Учетные данные', () => {
                        decorate.el.input.getValue({
                            title: 'Куда (подразделение)',
                            placeholder: 'Куда (подразделение)',
                            value: data.divisions.division4.name,
                            timeout: entry.max
                        });
                        decorate.el.input.getValue({
                            title: 'Сопровождающий',
                            placeholder: 'Сопровождающий',
                            value: '',
                            timeout: entry.max
                        });
                        decorate.el.input.getValue({
                            title: 'Карта / идентификатор',
                            placeholder: 'Карта / идентификатор',
                            value: data.visitor1.card,
                            timeout: entry.max
                        });
                        decorate.el.input.getValue({
                            title: 'Подтверждающий документ',
                            placeholder: 'Подтверждающий документ',
                            value: '',
                            timeout: entry.max
                        });
                        decorate.el.input.getValue({
                            title: 'Номер документа',
                            placeholder: 'Номер документа',
                            value: '',
                            timeout: entry.max
                        });
                        decorate.el.input.getValue({
                            title: 'Действует с',
                            placeholder: 'Действует с',
                            value: data.visitor1.dateIn.date,
                            timeout: entry.max
                        });
                        decorate.el.input.getValue({
                            title: 'Шаблон доступа',
                            placeholder: 'Шаблон доступа',
                            value: data.visitor1.template,
                            timeout: entry.max
                        });
                        decorate.el.input.getValue({
                            title: 'Действует до',
                            placeholder: 'Действует до',
                            value: data.visitor1.dateAfter.date,
                            timeout: entry.max
                        });
                    });

                    describe('Дополнительные поля', () => {
                        decorate.el.input.getValue({
                            title: 'Пин-код',
                            placeholder: '',
                            value: data.visitor1.pinCode,
                            timeout: entry.max
                        });
                    });
                });

                describe('Проверка данных "Транспортное средство"', () => {
                    describe('Открытие информации "Транспортное средство"', () => {
                        decorate.el.simpleCell.handler({
                            name: 'Транспортное средство',
                            timeout: entry.max
                        });
                        decorate.el.simpleCell.active({
                            name: 'Транспортное средство',
                            timeout: entry.max
                        });
                    });

                    data.visitor1.ts.arrTS.forEach((obj, index) => {
                        describe(`Проверка ТС ${index + 1}`, () => {
                            decorate.page.staffChange.getValueCarInput({
                                title: 'Номер транспортного средства',
                                number: index + 1,
                                value: obj.number,
                                timeout: entry.max
                            });
                            decorate.page.staffChange.getValueCarInput({
                                title: 'Модель транспортного средства',
                                number: index + 1,
                                value: obj.model,
                                timeout: entry.max
                            });
                        });
                    });
                });

                describe('Нажатие кнопки "Вернуться к списку посетителей".', () => {
                    decorate.el.button.handler({
                        name: 'Вернуться к списку посетителей',
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.button.handler({
                        name: 'Вернуться к списку посетителей',
                        timeout: entry.max
                    });
                    decorate.modalConfirm.staffReturn.init({
                        timeout: entry.max
                    });
                    decorate.el.button.handler({
                        name: 'Подтвердить',
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.page.visitorCurrent.init({
                        timeout: entry.max
                    });
                });
            });

            describe('Удаление посетителя из БД', () => {
                befActive();
                aft();
                it('Удаление посетителей', async () => {
                    const cook = await page.base.getCookie('token');
                    const arrVisitor = await api.getVisitor(cook.text);
                    console.log( arrVisitor)
                    const visitor1 = arrVisitor.text.filter(obj => obj.name === data.visitor1.fio)[0].id;
                    await dec.simple(db.deleteAlUserAdditionalData,
                        [],
                        db.deleteAlUserAdditionalData);
                    await dec.simple(db.deleteUser,
                        [visitor1],
                        db.deleteUser);
                });
                it('Удаление подразделения', async () => {
                    const cook = await page.base.getCookie('token');
                    const arrDivision = await api.getDivision(cook.text);
                    const division1 = arrDivision.text.filter(obj => obj.name === data.divisions.division4.name)[0].id;

                    await dec.simple(api.deleteDivision,
                        [[division1], cook.text],
                        api.deleteDivision);
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
            });
        }

        if(type === 'visitorPassOrder') {
            describe('Импорт', () => {
                befPassOrder();
                aft();
                decorate.el.butIcBefore.handler({
                    icon: but.menu,
                    timeout: entry.max
                });
                decorate.el.menu.menu({
                    timeout: entry.max
                });
                decorate.el.menu.handler({
                    name: 'Импорт из XLS, XLSX',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.modal.importFile.init({
                    timeout: entry.max
                });
                decorate.modal.importFile.uploadFile({
                    src: imp.visitor.importVisitor,
                    timeout: entry.upload
                });
                decorate.el.select.iconXpand({
                    title: 'Имя',
                    value: '',
                    text: 'Имя1',
                    timeout: entry.max
                });
                decorate.el.select.iconXpand({
                    title: 'Фамилия',
                    value: '',
                    text: 'Фамилия1',
                    timeout: entry.max
                });
                decorate.el.select.iconXpand({
                    title: 'Отчество',
                    value: '',
                    text: 'Отчество1',
                    timeout: entry.max
                });
                decorate.modal.importFile.iconXpand({
                    title: 'Подразделение',
                    value: '',
                    text: 'Подразделение1',
                    timeout: entry.max
                });
                decorate.el.select.iconXpand({
                    title: 'Действует с',
                    value: '',
                    text: 'Действителен c',
                    timeout: entry.max
                });
                decorate.el.select.iconXpand({
                    title: 'Действует до',
                    value: '',
                    text: 'Действителен до',
                    timeout: entry.max
                });
                decorate.el.select.iconXpand({
                    title: 'Транспортные средства',
                    value: '',
                    text: 'Транспортные средства1',
                    timeout: entry.max
                });
                decorate.modal.importFile.scrollTop({
                    number: 500,
                    timout: entry.max
                });
                decorate.el.select.iconXpand({
                    title: 'Email',
                    value: '',
                    text: 'Email',
                    timeout: entry.max
                });
                decorate.el.checkbox.handler({
                    name: 'Импорт несуществующих подразделений',
                    timout: entry.max
                });
                decorate.el.checkbox.checked({
                    name: 'Импорт несуществующих подразделений',
                    timout: entry.max
                });
                decorate.el.button.handler({
                    name: 'Далее',
                    timeout: entry.max
                });
                decorate.el.button.button({
                    name: 'Готово',
                    timeout: entry.max
                });
                decorate.modal.importFile.bodyGetText({
                    value: 'Импорт завершен',
                    timeout: entry.max
                });
                decorate.el.button.handler({
                    name: 'Готово',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.modal.importFile.initClose({
                    timeout: entry.max
                });
            });

            describe('Проверка таблицы', () => {
                befPassOrder();
                aft();
                decorate.el.table.size({
                    strCount: 1,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Посетитель',
                    strNumber: 1,
                    cellNumber: 1,
                    value: data.visitor1.fio,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Сопровождающий',
                    strNumber: 1,
                    cellNumber: 2,
                    value: '',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Документ',
                    strNumber: 1,
                    cellNumber: 3,
                    value: '',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Номер документа',
                    strNumber: 1,
                    cellNumber: 4,
                    value: '',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Куда (подразделение)',
                    strNumber: 1,
                    cellNumber: 6,
                    value: data.divisions.division4.name,
                    timeout: entry.max
                });
            });

            describe('Проверка параметров', () => {
                befPassOrder();
                aft();

                describe('Открытие посетителя на редактирование', () => {
                    decorate.el.table.strHandler({
                        strNumber: 1,
                        timeout: entry.max
                    });
                    decorate.el.butIcBefore.handler({
                        icon: but.edit,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.page.orderpassChange.initEdit({
                        timeout: entry.max
                    });
                });

                describe('Проверка данных "Общая информация"', () => {
                    describe('Основная информация', () => {
                        decorate.el.input.getValue({
                            title: 'Фамилия',
                            placeholder: 'Фамилия',
                            value: data.visitor1.lastName,
                            timeout: entry.max
                        });
                        decorate.el.input.getValue({
                            title: 'Имя',
                            placeholder: 'Имя',
                            value: data.visitor1.firstName,
                            timeout: entry.max
                        });
                        decorate.el.input.getValue({
                            title: 'Отчество',
                            placeholder: 'Отчество',
                            value: data.visitor1.middleName,
                            timeout: entry.max
                        });
                        decorate.el.input.getValue({
                            title: 'E-Mail',
                            placeholder: 'E-Mail',
                            value: data.visitor1.mail,
                            timeout: entry.max
                        });
                    });

                    describe('Учетные данные', () => {
                        decorate.el.input.getValue({
                            title: 'Куда (подразделение)',
                            placeholder: 'Куда (подразделение)',
                            value: data.divisions.division4.name,
                            timeout: entry.max
                        });
                        decorate.el.input.getValue({
                            title: 'Сопровождающий',
                            placeholder: 'Сопровождающий',
                            value: '',
                            timeout: entry.max
                        });
                        decorate.el.input.getValue({
                            title: 'Подтверждающий документ',
                            placeholder: 'Подтверждающий документ',
                            value: '',
                            timeout: entry.max
                        });
                        decorate.el.input.getValue({
                            title: 'Номер документа',
                            placeholder: 'Номер документа',
                            value: '',
                            timeout: entry.max
                        });
                        decorate.el.input.getValue({
                            title: 'Действует с',
                            placeholder: 'Действует с',
                            value: data.visitor1.dateIn.date,
                            timeout: entry.max
                        });
                        decorate.el.input.getValue({
                            title: 'Действует до',
                            placeholder: 'Действует до',
                            value: data.visitor1.dateAfter.date,
                            timeout: entry.max
                        });
                    });
                });

                describe('Проверка данных "Транспортное средство"', () => {
                    describe('Открытие информации "Транспортное средство"', () => {
                        decorate.el.simpleCell.handler({
                            name: 'Транспортное средство',
                            timeout: entry.max
                        });
                        decorate.el.simpleCell.active({
                            name: 'Транспортное средство',
                            timeout: entry.max
                        });
                    });

                    data.visitor1.ts.arrTS.forEach((obj, index) => {
                        describe(`Проверка ТС ${index + 1}`, () => {
                            decorate.page.staffChange.getValueCarInput({
                                title: 'Номер транспортного средства',
                                number: index + 1,
                                value: obj.number,
                                timeout: entry.max
                            });
                            decorate.page.staffChange.getValueCarInput({
                                title: 'Модель транспортного средства',
                                number: index + 1,
                                value: obj.model,
                                timeout: entry.max
                            });
                        });
                    });
                });

                describe('Нажатие кнопки "Вернуться к списку посетителей".', () => {
                    decorate.el.button.handler({
                        name: 'Вернуться к списку посетителей',
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.button.handler({
                        name: 'Вернуться к списку посетителей',
                        timeout: entry.max
                    });
                    decorate.modalConfirm.staffReturn.init({
                        timeout: entry.max
                    });
                    decorate.el.button.handler({
                        name: 'Подтвердить',
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.page.orderpassOrder.init({
                        timeout: entry.max
                    });
                });
            });

            describe('Удаление посетителя из БД', () => {
                befPassOrder();
                aft();
                it('Удаление посетителей', async () => {
                    const cook = await page.base.getCookie('token');
                    const arrVisitor = await api.getVisitor(cook.text);
                    console.log( arrVisitor)
                    const visitor1 = arrVisitor.text.filter(obj => obj.name === data.visitor1.fio)[0].id;
                    await dec.simple(db.deleteAlUserAdditionalData,
                        [],
                        db.deleteAlUserAdditionalData);
                    await dec.simple(db.deleteUser,
                        [visitor1],
                        db.deleteUser);
                });
                it('Удаление подразделения', async () => {
                    const cook = await page.base.getCookie('token');
                    const arrDivision = await api.getDivision(cook.text);
                    const division1 = arrDivision.text.filter(obj => obj.name === data.divisions.division4.name)[0].id;

                    await dec.simple(api.deleteDivision,
                        [[division1], cook.text],
                        api.deleteDivision);
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
            });
        }
    });

    const importFailed = () => describe(text + 'Проверка импорта с ошибкой - без подразделения.', () => {
        const params = {
            fileName: 'unimported.xlsx',
            jsonVisitorOrder: [
                {
                    'Отчет "Неимпортированные данные"': 'Фамилия1',
                    __EMPTY: 'Имя1',
                    __EMPTY_1: 'Отчество1',
                    __EMPTY_2: 'Сопровождающий1',
                    __EMPTY_3: 'Документ1',
                    __EMPTY_4: 'Номер документа1',
                    __EMPTY_5: 'Подразделение1',
                    __EMPTY_6: 'Дата заказа1',
                    __EMPTY_7: 'Действителен c1',
                    __EMPTY_8: 'Действителен до1',
                    __EMPTY_9: 'Шаблон доступа1',
                    __EMPTY_10: 'Карта1',
                    __EMPTY_11: 'Транспортные средства1',
                    __EMPTY_12: 'Email1',
                    __EMPTY_13: 'Пин-код1',
                    __EMPTY_14: 'Ошибка'
                },
                {
                    'Отчет "Неимпортированные данные"': 'last1',
                    __EMPTY: 'name1',
                    __EMPTY_1: 'middle1',
                    __EMPTY_2: 'staff name 1',
                    __EMPTY_3: 'passport',
                    __EMPTY_4: '2202 191535',
                    __EMPTY_5: 'division100',
                    __EMPTY_6: '2023-06-01',
                    __EMPTY_7: '2023-06-01 00:00:00',
                    __EMPTY_8: '2033-06-01 23:59:00',
                    __EMPTY_9: 'template1',
                    __EMPTY_10: '1',
                    __EMPTY_11: 'abc123 xyz123;abc1234 xyz1234;abc12345 xyz12345;abc12346 xyz123456',
                    __EMPTY_12: 'zybrik007@gmail.com',
                    __EMPTY_13: 'test-123456',
                    __EMPTY_14: 'Подразделение не валидно или не существует'
                }
            ],
            jsonVisitorActive: [
                {
                    'Отчет "Неимпортированные данные"': 'Фамилия1',
                    __EMPTY: 'Имя1',
                    __EMPTY_1: 'Отчество1',
                    __EMPTY_2: 'Сопровождающий1',
                    __EMPTY_3: 'Документ1',
                    __EMPTY_4: 'Номер документа1',
                    __EMPTY_5: 'Подразделение1',
                    __EMPTY_6: 'Дата заказа1',
                    __EMPTY_7: 'Действителен c1',
                    __EMPTY_8: 'Действителен до1',
                    __EMPTY_9: 'Шаблон доступа1',
                    __EMPTY_10: 'Карта1',
                    __EMPTY_11: 'Транспортные средства1',
                    __EMPTY_12: 'Email1',
                    __EMPTY_13: 'Пин-код1',
                    __EMPTY_14: 'Ошибка'
                },
                {
                    'Отчет "Неимпортированные данные"': 'last1',
                    __EMPTY: 'name1',
                    __EMPTY_1: 'middle1',
                    __EMPTY_2: 'staff name 1',
                    __EMPTY_3: 'passport',
                    __EMPTY_4: '2202 191535',
                    __EMPTY_5: 'division100',
                    __EMPTY_6: '2023-06-01',
                    __EMPTY_7: '2023-06-01 00:00:00',
                    __EMPTY_8: '2033-06-01 23:59:00',
                    __EMPTY_9: 'template1',
                    __EMPTY_10: '1',
                    __EMPTY_11: 'abc123 xyz123;abc1234 xyz1234;abc12345 xyz12345;abc12346 xyz123456',
                    __EMPTY_12: 'zybrik007@gmail.com',
                    __EMPTY_13: 'test-123456',
                    __EMPTY_14: 'Подразделение не валидно или не существует'
                }
            ],
            jsonVisitorPassOrder: [
                {
                    'Отчет "Неимпортированные данные"': 'Фамилия',
                    __EMPTY: 'Имя',
                    __EMPTY_1: 'Отчество',
                    __EMPTY_2: 'Сопровождающий',
                    __EMPTY_3: 'Документ',
                    __EMPTY_4: 'Номер документа',
                    __EMPTY_5: 'Подразделение',
                    __EMPTY_6: 'Дата заказа',
                    __EMPTY_7: 'Действителен c',
                    __EMPTY_8: 'Действителен до',
                    __EMPTY_9: 'Шаблон доступа',
                    __EMPTY_10: 'Карта',
                    __EMPTY_11: 'Транспортные средства',
                    __EMPTY_12: 'Email',
                    __EMPTY_13: 'Пин-код',
                    __EMPTY_14: 'Ошибка'
                },
                {
                    'Отчет "Неимпортированные данные"': 'last1',
                    __EMPTY: 'name1',
                    __EMPTY_1: 'middle1',
                    __EMPTY_2: 'staff name 1',
                    __EMPTY_3: 'passport',
                    __EMPTY_4: '2202 191535',
                    __EMPTY_5: 'division4',
                    __EMPTY_6: '2023-06-01',
                    __EMPTY_7: '2023-06-01 00:00:00',
                    __EMPTY_8: '2033-06-01 23:59:00',
                    __EMPTY_9: 'template1',
                    __EMPTY_10: '1',
                    __EMPTY_11: 'abc123 xyz123;abc1234 xyz1234;abc12345 xyz12345;abc12346 xyz123456',
                    __EMPTY_12: 'zybrik007@gmail.com',
                    __EMPTY_13: 'test-123456',
                    __EMPTY_14: 'Отсутствует обязательное поле Подразделение'
                }
            ]
        }

        if(type === 'visitorOrder') {
            describe('Импорт', () => {
                befOrdered();
                aft();
                decorate.el.butIcBefore.handler({
                    icon: but.menu,
                    timeout: entry.max
                });
                decorate.el.menu.menu({
                    timeout: entry.max
                });
                decorate.el.menu.handler({
                    name: 'Импорт из XLS, XLSX',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.modal.importFile.init({
                    timeout: entry.max
                });
                decorate.modal.importFile.uploadFile({
                    src: imp.visitor.importVisitorFaild,
                    timeout: entry.upload
                });
                decorate.el.select.iconXpand({
                    title: 'Имя',
                    value: '',
                    text: 'Имя1',
                    timeout: entry.max
                });
                decorate.el.select.iconXpand({
                    title: 'Фамилия',
                    value: '',
                    text: 'Фамилия1',
                    timeout: entry.max
                });
                decorate.el.select.iconXpand({
                    title: 'Отчество',
                    value: '',
                    text: 'Отчество1',
                    timeout: entry.max
                });
                decorate.el.select.iconXpand({
                    title: 'Подразделение',
                    value: '',
                    text: 'Подразделение1',
                    timeout: entry.max
                });
                decorate.el.button.handler({
                    name: 'Далее',
                    timeout: entry.max
                });
                decorate.el.button.button({
                    name: 'Экспорт остатка в файл',
                    timeout: entry.max
                });
                decorate.modal.importFile.bodyGetText({
                    value: 'Импорт завершен. 1 записей из 1 не было импортировано',
                    timeout: entry.max
                });
                decorate.el.button.handler({
                    name: 'Экспорт остатка в файл',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.modal.importFile.initClose({
                    timeout: entry.max
                });
            });

            describe('Проверка таблицы', () => {
                befOrdered();
                aft();
                decorate.el.table.noStr({
                    timeout: entry.max
                });
            });

            describe('Проверка файла с ошибками', () => {
                decorate.el.file.display({
                    file: params.fileName,
                    timeout: entry.upload
                });
                decorate.el.file.comparison({
                    file: params.fileName,
                    json: params.jsonVisitorOrder
                });
                decorate.el.file.delete({
                    file: params.fileName,
                    timeout: entry.upload
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
            });
        }

        if(type === 'visitorActive') {
            describe('Импорт', () => {
                befOrdered();
                aft();
                decorate.el.butIcBefore.handler({
                    icon: but.menu,
                    timeout: entry.max
                });
                decorate.el.menu.menu({
                    timeout: entry.max
                });
                decorate.el.menu.handler({
                    name: 'Импорт из XLS, XLSX',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.modal.importFile.init({
                    timeout: entry.max
                });
                decorate.modal.importFile.uploadFile({
                    src: imp.visitor.importVisitorFaild,
                    timeout: entry.upload
                });
                decorate.el.select.iconXpand({
                    title: 'Имя',
                    value: '',
                    text: 'Имя1',
                    timeout: entry.max
                });
                decorate.el.select.iconXpand({
                    title: 'Фамилия',
                    value: '',
                    text: 'Фамилия1',
                    timeout: entry.max
                });
                decorate.el.select.iconXpand({
                    title: 'Отчество',
                    value: '',
                    text: 'Отчество1',
                    timeout: entry.max
                });
                decorate.el.select.iconXpand({
                    title: 'Подразделение',
                    value: '',
                    text: 'Подразделение1',
                    timeout: entry.max
                });
                decorate.el.button.handler({
                    name: 'Далее',
                    timeout: entry.max
                });
                decorate.el.button.button({
                    name: 'Экспорт остатка в файл',
                    timeout: entry.max
                });
                decorate.modal.importFile.bodyGetText({
                    value: 'Импорт завершен. 1 записей из 1 не было импортировано',
                    timeout: entry.max
                });
                decorate.el.button.handler({
                    name: 'Экспорт остатка в файл',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.modal.importFile.initClose({
                    timeout: entry.max
                });
            });

            describe('Проверка таблицы', () => {
                befOrdered();
                aft();
                decorate.el.table.noStr({
                    timeout: entry.max
                });
            });

            describe('Проверка файла с ошибками', () => {
                decorate.el.file.display({
                    file: params.fileName,
                    timeout: entry.upload
                });
                decorate.el.file.comparison({
                    file: params.fileName,
                    json: params.jsonVisitorActive
                });
                decorate.el.file.delete({
                    file: params.fileName,
                    timeout: entry.upload
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
            });
        }

        if(type === 'visitorPassOrder') {
            describe('Импорт', () => {
                befOrdered();
                aft();
                decorate.el.butIcBefore.handler({
                    icon: but.menu,
                    timeout: entry.max
                });
                decorate.el.menu.menu({
                    timeout: entry.max
                });
                decorate.el.menu.handler({
                    name: 'Импорт из XLS, XLSX',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.modal.importFile.init({
                    timeout: entry.max
                });
                decorate.modal.importFile.uploadFile({
                    src: imp.visitor.importVisitorFaild,
                    timeout: entry.upload
                });
                decorate.el.select.iconXpand({
                    title: 'Имя',
                    value: '',
                    text: 'Имя1',
                    timeout: entry.max
                });
                decorate.el.select.iconXpand({
                    title: 'Фамилия',
                    value: '',
                    text: 'Фамилия1',
                    timeout: entry.max
                });
                decorate.el.select.iconXpand({
                    title: 'Отчество',
                    value: '',
                    text: 'Отчество1',
                    timeout: entry.max
                });
                decorate.el.select.iconXpand({
                    title: 'Подразделение',
                    value: '',
                    text: 'Подразделение1',
                    timeout: entry.max
                });
                decorate.el.button.handler({
                    name: 'Далее',
                    timeout: entry.max
                });
                decorate.el.button.button({
                    name: 'Экспорт остатка в файл',
                    timeout: entry.max
                });
                decorate.modal.importFile.bodyGetText({
                    value: 'Импорт завершен. 1 записей из 1 не было импортировано',
                    timeout: entry.max
                });
                decorate.el.button.handler({
                    name: 'Экспорт остатка в файл',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.modal.importFile.initClose({
                    timeout: entry.max
                });
            });

            describe('Проверка таблицы', () => {
                befOrdered();
                aft();
                decorate.el.table.noStr({
                    timeout: entry.max
                });
            });

            describe('Проверка файла с ошибками', () => {
                decorate.el.file.display({
                    file: params.fileName,
                    timeout: entry.upload
                });
                decorate.el.file.comparison({
                    file: params.fileName,
                    json: params.jsonVisitorPassOrder
                });
                decorate.el.file.delete({
                    file: params.fileName,
                    timeout: entry.upload
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
            });
        }
    });

    const addCardVisitorMaxParams = () => describe(text + 'Добавление карты по кнопке "Выдать карту".', () => {

        if(type === 'visitorOrder') {
            describe('Проверка таблицы до добавления карты', () => {
                befOrdered();
                aft();
                decorate.el.table.cellGetText({
                    headTitle: 'Посетитель',
                    strNumber: 1,
                    cellNumber: 1,
                    value: data.visitor1.fio,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Карта',
                    strNumber: 1,
                    cellNumber: 10,
                    value: '',
                    timeout: entry.max
                });
            });

            describe('Добавление карты', () => {
                befOrdered();
                aft();
                decorate.el.table.strHandler({
                    strNumber: 1,
                    timeout: entry.max
                });
                decorate.el.butIcBefore.handler({
                    icon: but.card_add,
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.modal.cardControls.init({
                    timeout: entry.max
                });
                decorate.el.input.sendKeys({
                    title: 'Идентификатор карты',
                    placeholder: '',
                    value: data.visitor1.card,
                    timeout: entry.max
                });
                decorate.el.button.handler({
                    name: 'Сохранить',
                    timeout: entry.max
                });
                decorate.modal.cardControls.initClose({
                    timeout: entry.max
                });
            });

            describe('Проверка таблицы после добавления карты', () => {
                befOrdered();
                aft();
                decorate.el.table.cellGetText({
                    headTitle: 'Посетитель',
                    strNumber: 1,
                    cellNumber: 1,
                    value: data.visitor1.fio,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Карта',
                    strNumber: 1,
                    cellNumber: 10,
                    value: data.visitor1.card,
                    timeout: entry.max
                });
            });
        }
    });

    const addCardDuplicateVisitorMaxParams = () => describe(text +
        'Попытка добавление посетителя с дублированием карты', () => {

        if(type === 'visitorOrder') {
            describe('Попытка добавления посетителя c дублирующей картой', () => {

                befOrdered();
                aft();

                describe('Открытие страницы добавления', () => {
                    decorate.el.butIcBefore.handler({
                        icon: but.add,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.page.visitorChange.initAdd({
                        timeout: entry.max
                    });
                });

                describe('Ввод данных "Общая информация"', () => {
                    describe('Основная информация', () => {
                        decorate.el.input.sendKeys({
                            title: 'Фамилия',
                            placeholder: 'Фамилия',
                            value: data.visitor2.lastName,
                            timeout: entry.max
                        });
                        decorate.el.input.sendKeys({
                            title: 'Имя',
                            placeholder: 'Имя',
                            value: data.visitor2.firstName,
                            timeout: entry.max
                        });
                    });

                    describe('Учетные данные', () => {
                        decorate.el.selectInput.iconXpand({
                            title: 'Куда (подразделение)',
                            placeholder: 'Куда (подразделение)',
                            timeout: entry.max
                        });
                        decorate.el.selectXpand.xpand({
                            timeout: entry.max
                        });
                        decorate.el.selectXpand.handler({
                            value: data.divisions.division3.name,
                            timeout: entry.max
                        });
                        decorate.el.selectXpand.xpandNoElement({
                            timeout: entry.max
                        });

                        decorate.el.input.iconCard({
                            title: 'Карта / идентификатор',
                            placeholder: 'Карта / идентификатор',
                            timeout: entry.max
                        });
                        decorate.modal.cardControlsAdd.init({
                            timeout: entry.max
                        });
                        decorate.modal.cardControlsNumber.inputSendKeys( {
                            title: 'Идентификатор карты',
                            placeholder: '',
                            value: data.visitor1.card,
                            timeout: entry.max
                        });
                        decorate.modal.cardControlsNumber.buttonHandler({
                            name: 'Сохранить',
                            timeout: entry.max
                        });
                        decorate.modal.cardControlsNumber.initClose({
                            timeout: entry.max
                        });
                    });
                });

                describe('Сохранение посетителя', () => {
                    decorate.el.button.handler({
                        name: 'Сохранить изменения',
                        timeout: entry.max
                    });
                    decorate.el.error.error({
                        text: 'Карта 1 уже используется у посетителя "last1 name1 middle1", ' +
                            'подразделение division1 в качестве карты',
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.button.handler({
                        name: 'Вернуться к списку посетителей',
                        timeout: entry.max
                    });
                    decorate.modalConfirm.staffReturn.init({
                        timeout: entry.max
                    });
                    decorate.el.button.handler({
                        name: 'Подтвердить',
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.page.visitorOrder.init({
                        timeout: entry.max
                    });
                });
            });
        }
    });

    const addBarcodeVisitorMaxParams = () => describe(text +
        'Добавление штрихкода посетителю по кнопке "Выдать штрихкод".', () => {

        if(type === 'visitorOrder') {
            describe('Проверка таблицы до добавления штрихкода', () => {
                befOrdered();
                aft();
                decorate.el.table.cellGetText({
                    headTitle: 'Посетитель',
                    strNumber: 1,
                    cellNumber: 1,
                    value: data.visitor1.fio,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Штрихкод',
                    strNumber: 1,
                    cellNumber: 11,
                    value: '',
                    timeout: entry.max
                });
            });

            describe('Добавление штрихкода', () => {
                befOrdered();
                aft();
                describe('Открытие модального окна "Выдать штрихкод"', () => {
                    decorate.el.table.strHandler({
                        strNumber: 1,
                        timeout: entry.max
                    });
                    decorate.el.butIcBefore.handler({
                        icon: but.barcode_add,
                        timeout: entry.max
                    });
                    decorate.modal.barcode.init({
                        timeout: entry.max
                    });
                });

                describe('Проверка генерации штрикода по кнопке в модальнмо окне "Выдать штрихкод"', () => {
                    decorate.el.input.getValue({
                        title: 'Идентификатор',
                        placeholder: '',
                        value: '',
                        timeout: entry.max
                    });
                    decorate.el.butIcBefore.handler({
                        icon: but.unsorted_replay_outline,
                        timeout: entry.max
                    });

                    it('Провека поля идентификатор на числа', async () => {
                        const barcodeInput = await el.input.getValue('Идентификатор', '', entry.max);
                        expect(Number.isInteger(Number(barcodeInput.text))).to.equal(true);
                    });
                });

                describe('Удаление сгенерированного штрихкода в модальнмо окне "Выдать штрихкод"', () => {
                    decorate.el.input.backSpace({
                        title: 'Идентификатор',
                        placeholder: '',
                        timeout: entry.max
                    });
                });

                describe('Добавление штрихкода вручную и сохранение', () => {
                    decorate.el.input.sendKeys({
                        title: 'Идентификатор',
                        placeholder: '',
                        value: data.visitor1.barcode,
                        timeout: entry.max
                    });
                    decorate.el.button.handler({
                        name: 'Сохранить',
                        timeout: entry.max
                    });
                    decorate.el.success.success({
                        text: 'Штрихкод выдан',
                        timeout: entry.max
                    });
                    decorate.modal.barcode.initClose({
                        timeout: entry.max
                    });
                });
            });

            describe('Проверка таблицы после добавления штрихкода', () => {
                befOrdered();
                aft();
                decorate.el.table.cellGetText({
                    headTitle: 'Посетитель',
                    strNumber: 1,
                    cellNumber: 1,
                    value: data.visitor1.fio,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Штрихкод',
                    strNumber: 1,
                    cellNumber: 11,
                    value: data.visitor1.barcode,
                    timeout: entry.max
                });
            });
        }

        if(type === 'visitorActive') {
            describe('Проверка таблицы до добавления штрихкода', () => {
                befActive();
                aft();
                decorate.el.table.cellGetText({
                    headTitle: 'Посетитель',
                    strNumber: 1,
                    cellNumber: 2,
                    value: data.visitor1.fio,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Штрихкод',
                    strNumber: 1,
                    cellNumber: 13,
                    value: '',
                    timeout: entry.max
                });
            });

            describe('Добавление штрихкода', () => {
                befActive();
                aft();
                describe('Открытие модального окна "Выдать штрихкод"', () => {
                    decorate.el.table.strHandler({
                        strNumber: 1,
                        timeout: entry.max
                    });
                    decorate.el.butIcBefore.handler({
                        icon: but.barcode_add,
                        timeout: entry.max
                    });
                    decorate.modal.barcode.init({
                        timeout: entry.max
                    });
                });

                describe('Проверка генерации штрикода по кнопке в модальнмо окне "Выдать штрихкод"', () => {
                    decorate.el.input.getValue({
                        title: 'Идентификатор',
                        placeholder: '',
                        value: '',
                        timeout: entry.max
                    });
                    decorate.el.butIcBefore.handler({
                        icon: but.unsorted_replay_outline,
                        timeout: entry.max
                    });

                    it('Провека поля идентификатор на числа', async () => {
                        const barcodeInput = await el.input.getValue('Идентификатор', '', entry.max);
                        expect(Number.isInteger(Number(barcodeInput.text))).to.equal(true);
                    });
                });

                describe('Удаление сгенерированного штрихкода в модальнмо окне "Выдать штрихкод"', () => {
                    decorate.el.input.backSpace({
                        title: 'Идентификатор',
                        placeholder: '',
                        timeout: entry.max
                    });
                });

                describe('Добавление штрихкода вручную и сохранение', () => {
                    decorate.el.input.sendKeys({
                        title: 'Идентификатор',
                        placeholder: '',
                        value: data.visitor1.barcode,
                        timeout: entry.max
                    });
                    decorate.el.button.handler({
                        name: 'Сохранить',
                        timeout: entry.max
                    });
                    decorate.el.success.success({
                        text: 'Штрихкод выдан',
                        timeout: entry.max
                    });
                    decorate.modal.barcode.initClose({
                        timeout: entry.max
                    });
                });
            });

            describe('Проверка таблицы после добавления штрихкода', () => {
                befActive();
                aft();
                decorate.el.table.cellGetText({
                    headTitle: 'Посетитель',
                    strNumber: 1,
                    cellNumber: 2,
                    value: data.visitor1.fio,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Штрихкод',
                    strNumber: 1,
                    cellNumber: 13,
                    value: data.visitor1.barcode,
                    timeout: entry.max
                });
            });
        }
    });

    const addBarcodeDuplicateVisitor = () => describe(text +
        'Попытка добавление посетителя с дублированием штрихкода.', () => {

        if(type === 'visitorOrder') {
            describe('Попытка добавление посетителя с дублированием штрихкода', () => {

                befOrdered();
                aft();

                describe('Открытие страницы добавления', () => {
                    decorate.el.butIcBefore.handler({
                        icon: but.add,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.page.visitorChange.initAdd({
                        timeout: entry.max
                    });
                });

                describe('Ввод данных "Общая информация"', () => {
                    describe('Основная информация', () => {
                        decorate.el.input.sendKeys({
                            title: 'Фамилия',
                            placeholder: 'Фамилия',
                            value: data.visitor2.lastName,
                            timeout: entry.max
                        });
                        decorate.el.input.sendKeys({
                            title: 'Имя',
                            placeholder: 'Имя',
                            value: data.visitor2.firstName,
                            timeout: entry.max
                        });
                    });

                    describe('Учетные данные', () => {
                        decorate.el.selectInput.iconXpand({
                            title: 'Куда (подразделение)',
                            placeholder: 'Куда (подразделение)',
                            timeout: entry.max
                        });
                        decorate.el.selectXpand.xpand({
                            timeout: entry.max
                        });
                        decorate.el.selectXpand.handler({
                            value: data.divisions.division2.name,
                            timeout: entry.max
                        });
                        decorate.el.selectXpand.xpandNoElement({
                            timeout: entry.max
                        });
                    });

                });

                describe('Ввод данных "Шрихкод"', () => {
                    describe('Открытие информации "Штрихкод"', () => {
                        decorate.el.simpleCell.handler({
                            name: 'Штрихкод',
                            timeout: entry.max
                        });
                        decorate.el.simpleCell.active({
                            name: 'Штрихкод',
                            timeout: entry.max
                        });
                    });

                    describe('Ввод штрикода', () => {
                        decorate.el.input.sendKeys({
                            title: '',
                            placeholder: '',
                            value: data.visitor1.barcode,
                            timeout: entry.max
                        });
                    });
                });

                describe('Сохранение посетителя', () => {
                    decorate.el.button.handler({
                        name: 'Сохранить изменения',
                        timeout: entry.max
                    });
                    decorate.el.error.error({
                        text: 'Карта 2184201005502 уже используется у посетителя "last1 name1 middle1", ' +
                            'подразделение division1 в качестве штрих-кода',
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.button.handler({
                        name: 'Вернуться к списку посетителей',
                        timeout: entry.max
                    });
                    decorate.modalConfirm.staffReturn.init({
                        timeout: entry.max
                    });
                    decorate.el.button.handler({
                        name: 'Подтвердить',
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.page.visitorOrder.init({
                        timeout: entry.max
                    });
                });
            });
        }
    });

    const toArchiveVisitor = () => describe(text + 'Удаления посетителя в архив.', () => {

        if(type === 'visitorOrder') {
            describe('Удаление в Архив', () => {
                befOrdered();
                aft();
                decorate.el.table.strHandler({
                    strNumber: 1,
                    timeout: entry.max
                });
                decorate.el.butIcBefore.handler({
                    icon: but.delete,
                    timeout: entry.max
                });
                decorate.modalConfirm.visitorArchive.init({
                    timeout: entry.max
                });
                decorate.el.button.handler({
                    name: 'Подтвердить',
                    timeout: entry.max
                });
                decorate.modalConfirm.visitorArchive.initClose({
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
            });

            describe('Изменение даты окончания в базе данных', () => {
                befOrdered();
                aft();
                it('Изменение даты.', async () => {
                    const cook = await page.base.getCookie('token');
                    const arrVisitor = await api.getVisitor(cook.text);
                    const visitor1 = arrVisitor.text.filter(obj =>
                        obj.name === data.visitor1.fio || obj.name === data.visitor2.fio)[0].id;
                    await dec.simple(db.updateUserEndDate,
                        [{
                            id: visitor1,
                            end_date: data.event2
                        }],
                        db.updateUserCrateDate);
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
            });
        }

        if(type === 'visitorActive') {
            describe('Удаление в Архив', () => {
                befActive();
                aft();
                decorate.el.table.strHandler({
                    strNumber: 1,
                    timeout: entry.max
                });
                decorate.el.butIcBefore.handler({
                    icon: but.delete,
                    timeout: entry.max
                });
                decorate.modalConfirm.visitorArchive.init({
                    timeout: entry.max
                });
                decorate.el.button.handler({
                    name: 'Подтвердить',
                    timeout: entry.max
                });
                decorate.modalConfirm.visitorArchive.initClose({
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
            });
        }

        if(type === 'visitorPassOrder') {
            describe('Удаление в Архив', () => {
                befPassOrder();
                aft();
                decorate.el.table.strHandler({
                    strNumber: 1,
                    timeout: entry.max
                });
                decorate.el.butIcBefore.handler({
                    icon: but.delete,
                    timeout: entry.max
                });
                decorate.modalConfirm.visitorArchive.init({
                    timeout: entry.max
                });
                decorate.el.button.handler({
                    name: 'Подтвердить',
                    timeout: entry.max
                });
                decorate.modalConfirm.visitorArchive.initClose({
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
            });

            describe('Изменение даты окончания в базе данных', () => {
                befPassOrder();
                aft();
                it('Изменение даты.', async () => {
                    const cook = await page.base.getCookie('token');
                    const arrVisitor = await api.getVisitor(cook.text);
                    const visitor1 = arrVisitor.text.filter(obj => obj.name === data.visitor1.fio)[0].id;
                    await dec.simple(db.updateUserEndDate,
                        [{
                            id: visitor1,
                            end_date: data.event2
                        }],
                        db.updateUserCrateDate);
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
            });
        }
    });

    const deleteVisitor = () => describe(text + 'Удаления посетителя из архива.', () => {

        if(type === 'visitorArchive') {
            describe('Удаление из Архива', () => {
                befArchive();
                aft();
                decorate.el.table.strHandler({
                    strNumber: 1,
                    timeout: entry.max
                });
                decorate.el.butIcBefore.handler({
                    icon: but.delete,
                    timeout: entry.max
                });
                decorate.modalConfirm.visitorDelete.init({
                    timeout: entry.max
                });
                decorate.el.button.handler({
                    name: 'Подтвердить',
                    timeout: entry.max
                });
                decorate.modalConfirm.visitorDelete.initClose({
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
            });
        }

        if(type === 'visitorPassArchive') {
            describe('Удаление из Архива', () => {
                befPassArchive();
                aft();
                decorate.el.table.strHandler({
                    strNumber: 1,
                    timeout: entry.max
                });
                decorate.el.butIcBefore.handler({
                    icon: but.delete,
                    timeout: entry.max
                });
                decorate.modalConfirm.visitorDelete.init({
                    timeout: entry.max
                });
                decorate.el.button.handler({
                    name: 'Подтвердить',
                    timeout: entry.max
                });
                decorate.modalConfirm.visitorDelete.initClose({
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
            });
        }
    });

    const addDataVisitorFilter = () => describe(text + 'Добавление данных для тестирвоания фильтров.', () => {

        const params = {...data}

        if(type === 'visitorOrder') {
            befOrdered();
            aft();
            describe('Добавление посетителей', () => {
                it(`Добавление посетиеля "${params.visitor1.fio}".`, async () => {
                    const cook = await page.base.getCookie('token');
                    const arrDivision = await api.getDivision(cook.text);
                    const divisionId = arrDivision.text.filter(obj => obj.name === params.visitor1.division)[0].id;
                    const visitor = {
                        last_name: params.visitor1.db.last_name,
                        first_name: params.visitor1.db.first_name,
                        middle_name: params.visitor1.db.middle_name,
                        division: divisionId,
                        begin_datetime: params.visitor1.db.begin_datetime,
                        end_datetime: params.visitor1.db.end_datetime
                    }
                    await dec.simple(api.putVisitor,
                        [[visitor], cook.text],
                        api.putVisitor);
                });

                it(`Добавление посетиеля "${params.visitor2.fio}".`, async () => {
                    const cook = await page.base.getCookie('token');
                    const arrDivision = await api.getDivision(cook.text);
                    const divisionId = arrDivision.text.filter(obj => obj.name === params.visitor2.division)[0].id;
                    const visitor = {
                        last_name: params.visitor2.db.last_name,
                        first_name: params.visitor2.db.first_name,
                        middle_name: params.visitor2.db.middle_name,
                        division: divisionId,
                        begin_datetime: params.visitor2.db.begin_datetime,
                        end_datetime: params.visitor2.db.end_datetime
                    }
                    await dec.simple(api.putVisitor,
                        [[visitor], cook.text],
                        api.putVisitor);
                });

                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
            });
        }

        if(type === 'visitorActive') {
            befActive();
            aft();
            describe('Добавление посетителей', () => {
                it(`Добавление посетиеля "${params.visitor1.fio}".`, async () => {
                    const cook = await page.base.getCookie('token');
                    const arrDivision = await api.getDivision(cook.text);
                    const divisionId = arrDivision.text.filter(obj => obj.name === params.visitor1.division)[0].id;
                    const arrTemplate = await api.getTemplate(cook.text);
                    const templateId = arrTemplate.text.filter(obj => obj.name === params.visitor1.template)[0].id;
                    const visitor = {
                        last_name: params.visitor1.db.last_name,
                        first_name: params.visitor1.db.first_name,
                        middle_name: params.visitor1.db.middle_name,
                        division: divisionId,
                        access_template: templateId,
                        identifier: params.visitor1.db.identifier,
                        begin_datetime: params.visitor1.db.begin_datetime,
                        end_datetime: params.visitor1.db.end_datetime
                    }
                    await dec.simple(api.putVisitor,
                        [[visitor], cook.text],
                        api.putVisitor);
                });

                it(`Добавление посетиеля "${params.visitor2.fio}".`, async () => {
                    const cook = await page.base.getCookie('token');
                    const arrDivision = await api.getDivision(cook.text);
                    const divisionId = arrDivision.text.filter(obj => obj.name === params.visitor2.division)[0].id;
                    const arrTemplate = await api.getTemplate(cook.text);
                    const templateId = arrTemplate.text.filter(obj => obj.name === params.visitor2.template)[0].id;
                    const visitor = {
                        last_name: params.visitor2.db.last_name,
                        first_name: params.visitor2.db.first_name,
                        middle_name: params.visitor2.db.middle_name,
                        division: divisionId,
                        access_template: templateId,
                        identifier: params.visitor2.db.identifier,
                        begin_datetime: params.visitor2.db.begin_datetime,
                        end_datetime: params.visitor2.db.end_datetime
                    }
                    await dec.simple(api.putVisitor,
                        [[visitor], cook.text],
                        api.putVisitor);
                });

                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
            });
        }

        if(type === 'visitorPassOrder') {
            befPassOrder();
            aft();
            describe('Добавление посетителей', () => {
                it(`Добавление посетиеля "${params.visitor1.fio}".`, async () => {
                    const cook = await page.base.getCookie('token');
                    const arrDivision = await api.getDivision(cook.text);
                    const divisionId = arrDivision.text.filter(obj => obj.name === params.visitor1.division)[0].id;
                    const visitor = {
                        last_name: params.visitor1.db.last_name,
                        first_name: params.visitor1.db.first_name,
                        middle_name: params.visitor1.db.middle_name,
                        division: divisionId,
                        begin_datetime: params.visitor1.db.begin_datetime,
                        end_datetime: params.visitor1.db.end_datetime
                    }
                    await dec.simple(api.putVisitor,
                        [[visitor], cook.text],
                        api.putVisitor);
                });

                it(`Добавление посетиеля "${params.visitor2.fio}".`, async () => {
                    const cook = await page.base.getCookie('token');
                    const arrDivision = await api.getDivision(cook.text);
                    const divisionId = arrDivision.text.filter(obj => obj.name === params.visitor2.division)[0].id;
                    const visitor = {
                        last_name: params.visitor2.db.last_name,
                        first_name: params.visitor2.db.first_name,
                        middle_name: params.visitor2.db.middle_name,
                        division: divisionId,
                        begin_datetime: params.visitor2.db.begin_datetime,
                        end_datetime: params.visitor2.db.end_datetime
                    }
                    await dec.simple(api.putVisitor,
                        [[visitor], cook.text],
                        api.putVisitor);
                });

                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
            });
        }
    });

    const deleteDataVisitorFilter = () => describe(text + 'Удаление данных для тестирвоания фильтров.', () => {

        const params = {...data}

        befOrdered();
        aft();

        it('Удаление посетителей', async () => {
            const cook = await page.base.getCookie('token');
            const arrVisitor = await api.getVisitor(cook.text);
            const visitor1 = arrVisitor.text.filter(obj => obj.name === params.visitor1.fio)[0].id;
            const visitor2 = arrVisitor.text.filter(obj => obj.name ===params.visitor2.fio)[0].id;

            await dec.simple(db.deleteUser,
                [visitor1],
                db.deleteUser);

            await dec.simple(db.deleteUser,
                [visitor2],
                db.deleteUser);
        });

        decorate.page.base.loading({
            timeout: entry.sleep2
        });
    });

    const divisionFilterVisitor = () => describe(text + 'Проверка фильтра "Подразделение".', () => {

        if(type === 'visitorOrder') {
            befOrdered();
            aft();

            describe('Проверка таблицы до изпользования фильтра "Подразделение"', () => {
                decorate.el.table.size({
                    strCount: 2,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Куда (подразделение)',
                    strNumber: 1,
                    cellNumber: 9,
                    value: data.divisions.division2.name,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Куда (подразделение)',
                    strNumber: 2,
                    cellNumber: 9,
                    value: data.divisions.division1.name,
                    timeout: entry.max
                });
            });

            describe(`Выбор в фильтре "${data.divisions.division2.name}" через окно выбора`, () => {
                decorate.el.selectInput.iconXpand({
                    title: '',
                    placeholder: 'Подразделение',
                    timeout: entry.max
                });
                decorate.el.selectXpand.xpand({
                    timeout: entry.max
                });
                decorate.el.selectXpand.handler({
                    value: data.divisions.division2.name,
                    timeout: entry.max
                });
                decorate.el.selectXpand.xpandNoElement({
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
            });

            describe('Проверка таблицы после изпользования фильтра "Подразделение" через окно выбора', () => {
                decorate.el.table.size({
                    strCount: 1,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Куда (подразделение)',
                    strNumber: 1,
                    cellNumber: 9,
                    value: data.divisions.division2.name,
                    timeout: entry.max
                });
            });

            describe(`Выбор в фильтре "${data.divisions.division1.name}" через модальное окно "Подразделение"`, () => {
                decorate.el.selectInput.iconOutline({
                    title: '',
                    placeholder: 'Подразделение',
                    timeout: entry.max
                });
                decorate.modal.divisionFilter.init({
                    timeout: entry.max
                });
                decorate.el.filterTreeNode.handler({
                    name: data.divisions.division1.name,
                    timeout: entry.max
                });
                decorate.el.button.handler({
                    name: 'Выбрать',
                    timeout: entry.max
                });
                decorate.modal.divisionFilter.initClose({
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
            });

            describe('Проверка таблицы после изпользования фильтра "Подразделение" через модальное окно "Подразделение"',
                () => {
                    decorate.el.table.size({
                        strCount: 1,
                        timeout: entry.max
                    });
                    decorate.el.table.cellGetText({
                        headTitle: 'Куда (подразделение)',
                        strNumber: 1,
                        cellNumber: 9,
                        value: data.divisions.division1.name,
                        timeout: entry.max
                    });
                });
        }

        if(type === 'visitorActive') {
            befActive();
            aft();

            describe('Проверка таблицы до изпользования фильтра "Подразделение"', () => {
                decorate.el.table.size({
                    strCount: 2,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Куда (подразделение)',
                    strNumber: 1,
                    cellNumber: 10,
                    value: data.divisions.division2.name,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Куда (подразделение)',
                    strNumber: 2,
                    cellNumber: 10,
                    value: data.divisions.division1.name,
                    timeout: entry.max
                });
            });

            describe(`Выбор в фильтре "${data.divisions.division2.name}" через окно выбора`, () => {
                decorate.el.selectInput.iconXpand({
                    title: '',
                    placeholder: 'Подразделение',
                    timeout: entry.max
                });
                decorate.el.selectXpand.xpand({
                    timeout: entry.max
                });
                decorate.el.selectXpand.handler({
                    value: data.divisions.division2.name,
                    timeout: entry.max
                });
                decorate.el.selectXpand.xpandNoElement({
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
            });

            describe('Проверка таблицы после изпользования фильтра "Подразделение" через окно выбора', () => {
                decorate.el.table.size({
                    strCount: 1,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Куда (подразделение)',
                    strNumber: 1,
                    cellNumber: 10,
                    value: data.divisions.division2.name,
                    timeout: entry.max
                });
            });

            describe(`Выбор в фильтре "${data.divisions.division1.name}" через модальное окно "Подразделение"`, () => {
                decorate.el.selectInput.iconOutline({
                    title: '',
                    placeholder: 'Подразделение',
                    timeout: entry.max
                });
                decorate.modal.divisionFilter.init({
                    timeout: entry.max
                });
                decorate.el.filterTreeNode.handler({
                    name: data.divisions.division1.name,
                    timeout: entry.max
                });
                decorate.el.button.handler({
                    name: 'Выбрать',
                    timeout: entry.max
                });
                decorate.modal.divisionFilter.initClose({
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
            });

            describe('Проверка таблицы после изпользования фильтра "Подразделение" через модальное окно "Подразделение"',
                () => {
                    decorate.el.table.size({
                        strCount: 1,
                        timeout: entry.max
                    });
                    decorate.el.table.cellGetText({
                        headTitle: 'Куда (подразделение)',
                        strNumber: 1,
                        cellNumber: 10,
                        value: data.divisions.division1.name,
                        timeout: entry.max
                    });
                });
        }

        if(type === 'visitorPassOrder') {
            befPassOrder();
            aft();

            describe('Проверка таблицы до изпользования фильтра "Подразделение"', () => {
                decorate.el.table.size({
                    strCount: 2,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Куда (подразделение)',
                    strNumber: 1,
                    cellNumber: 6,
                    value: data.divisions.division2.name,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Куда (подразделение)',
                    strNumber: 2,
                    cellNumber: 6,
                    value: data.divisions.division1.name,
                    timeout: entry.max
                });
            });

            describe(`Выбор в фильтре "${data.divisions.division2.name}" через окно выбора`, () => {
                decorate.el.selectInput.iconXpand({
                    title: '',
                    placeholder: 'Подразделение',
                    timeout: entry.max
                });
                decorate.el.selectXpand.xpand({
                    timeout: entry.max
                });
                decorate.el.selectXpand.handler({
                    value: data.divisions.division2.name,
                    timeout: entry.max
                });
                decorate.el.selectXpand.xpandNoElement({
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
            });

            describe('Проверка таблицы после изпользования фильтра "Подразделение" через окно выбора', () => {
                decorate.el.table.size({
                    strCount: 1,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Куда (подразделение)',
                    strNumber: 1,
                    cellNumber: 6,
                    value: data.divisions.division2.name,
                    timeout: entry.max
                });
            });

            describe(`Выбор в фильтре "${data.divisions.division1.name}" через модальное окно "Подразделение"`, () => {
                decorate.el.selectInput.iconOutline({
                    title: '',
                    placeholder: 'Подразделение',
                    timeout: entry.max
                });
                decorate.modal.divisionFilter.init({
                    timeout: entry.max
                });
                decorate.el.filterTreeNode.handler({
                    name: data.divisions.division1.name,
                    timeout: entry.max
                });
                decorate.el.button.handler({
                    name: 'Выбрать',
                    timeout: entry.max
                });
                decorate.modal.divisionFilter.initClose({
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
            });

            describe('Проверка таблицы после изпользования фильтра "Подразделение" через модальное окно "Подразделение"',
                () => {
                    decorate.el.table.size({
                        strCount: 1,
                        timeout: entry.max
                    });
                    decorate.el.table.cellGetText({
                        headTitle: 'Куда (подразделение)',
                        strNumber: 1,
                        cellNumber: 6,
                        value: data.divisions.division1.name,
                        timeout: entry.max
                    });
                });
        }

    });

    const searchFilterVisitorActive = () => describe(text + 'Проверка фильтра "Поиск...".', () => {

        if(type === 'visitorOrder') {
            befOrdered();
            aft();

            describe('Проверка таблицы до изпользования фильтра "Поиск..."', () => {
                decorate.el.table.size({
                    strCount: 2,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Посетитель',
                    strNumber: 1,
                    cellNumber: 1,
                    value: data.visitor2.fio,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Посетитель',
                    strNumber: 2,
                    cellNumber: 1,
                    value: data.visitor1.fio,
                    timeout: entry.max
                });
            });

            describe(`Ввод в фильтр "${data.visitor2.lastName}"`, () => {
                decorate.el.input.sendKeys({
                    title: '',
                    placeholder: 'Поиск...',
                    value: data.visitor2.lastName,
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
            });

            describe('Проверка таблицы после иcпользования фильтра "Поиск..."', () => {
                decorate.el.table.size({
                    strCount: 1,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Посетитель',
                    strNumber: 1,
                    cellNumber: 1,
                    value: data.visitor2.fio,
                    timeout: entry.max
                });
            });

            describe(`Удаление "${data.visitor2.lastName}" из фильтра "Поиск..." и проверка таблицы`, () => {
                decorate.el.input.backSpace({
                    title: '',
                    placeholder: 'Поиск...',
                    timeout: entry.max
                });
                dec.animation();
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.table.size({
                    strCount: 2,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Посетитель',
                    strNumber: 1,
                    cellNumber: 1,
                    value: data.visitor2.fio,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Посетитель',
                    strNumber: 2,
                    cellNumber: 1,
                    value: data.visitor1.fio,
                    timeout: entry.max
                });
            });
        }

        if(type === 'visitorActive') {
            befActive();
            aft();

            describe('Проверка таблицы до изпользования фильтра "Поиск..."', () => {
                decorate.el.table.size({
                    strCount: 2,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Посетитель',
                    strNumber: 1,
                    cellNumber: 2,
                    value: data.visitor2.fio,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Посетитель',
                    strNumber: 2,
                    cellNumber: 2,
                    value: data.visitor1.fio,
                    timeout: entry.max
                });
            });

            describe(`Ввод в фильтр "${data.visitor2.lastName}"`, () => {
                decorate.el.input.sendKeys({
                    title: '',
                    placeholder: 'Поиск...',
                    value: data.visitor2.lastName,
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
            });

            describe('Проверка таблицы после иcпользования фильтра "Поиск..."', () => {
                decorate.el.table.size({
                    strCount: 1,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Посетитель',
                    strNumber: 1,
                    cellNumber: 2,
                    value: data.visitor2.fio,
                    timeout: entry.max
                });
            });

            describe(`Удаление "${data.visitor2.lastName}" из фильтра "Поиск..." и проверка таблицы`, () => {
                decorate.el.input.backSpace({
                    title: '',
                    placeholder: 'Поиск...',
                    timeout: entry.max
                });
                dec.animation();
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.table.size({
                    strCount: 2,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Посетитель',
                    strNumber: 1,
                    cellNumber: 2,
                    value: data.visitor2.fio,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Посетитель',
                    strNumber: 2,
                    cellNumber: 2,
                    value: data.visitor1.fio,
                    timeout: entry.max
                });
            });
        }

        if(type === 'visitorPassOrder') {
            befPassOrder();
            aft();

            describe('Проверка таблицы до изпользования фильтра "Поиск..."', () => {
                decorate.el.table.size({
                    strCount: 2,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Посетитель',
                    strNumber: 1,
                    cellNumber: 1,
                    value: data.visitor2.fio,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Посетитель',
                    strNumber: 2,
                    cellNumber: 1,
                    value: data.visitor1.fio,
                    timeout: entry.max
                });
            });

            describe(`Ввод в фильтр "${data.visitor2.lastName}"`, () => {
                decorate.el.input.sendKeys({
                    title: '',
                    placeholder: 'Поиск...',
                    value: data.visitor2.lastName,
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
            });

            describe('Проверка таблицы после иcпользования фильтра "Поиск..."', () => {
                decorate.el.table.size({
                    strCount: 1,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Посетитель',
                    strNumber: 1,
                    cellNumber: 1,
                    value: data.visitor2.fio,
                    timeout: entry.max
                });
            });

            describe(`Удаление "${data.visitor2.lastName}" из фильтра "Поиск..." и проверка таблицы`, () => {
                decorate.el.input.backSpace({
                    title: '',
                    placeholder: 'Поиск...',
                    timeout: entry.max
                });
                dec.animation();
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.table.size({
                    strCount: 2,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Посетитель',
                    strNumber: 1,
                    cellNumber: 1,
                    value: data.visitor2.fio,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Посетитель',
                    strNumber: 2,
                    cellNumber: 1,
                    value: data.visitor1.fio,
                    timeout: entry.max
                });
            });
        }
    });

    return {
        addVisitorMaxParams,
        printTableVisitorMaxParams,
        exportXLSXVisitorMaxParams,
        exportCSVVisitorMaxParams,
        printBarcodeVisitorMaxParams,
        printDesignCardVisitorMaxParams,
        currentVisitorMaxParamsFromOrder,
        archiveVisitorMaxParamsFromOrder,
        addCardVisitorMaxParams,
        addCardDuplicateVisitorMaxParams,
        addBarcodeVisitorMaxParams,
        addBarcodeDuplicateVisitor,
        editVisitorMaxParams,
        blockCardVisitorMaxParams,
        unblockCardVisitorMaxParams,
        archiveVisitorMaxParamsFromActive,
        returnVisitorMaxParamsToActive,
        importMinParams,
        importMaxParams,
        importFailed,
        addDataVisitorFilter,
        deleteDataVisitorFilter,
        divisionFilterVisitor,
        searchFilterVisitorActive,
        toArchiveVisitor,
        deleteVisitor,
    }
}

module.exports = {
    otherVisitorOrder: other('visitorOrder', 'Бюро пропусков / Посетители - вкладка - Заказанные. '),
    otherVisitorActive: other('visitorActive', 'Бюро пропусков / Посетители - вкладка - Действующие. '),
    otherVisitorArchive: other('visitorArchive', 'Бюро пропусков / Посетители - вкладка - Архив. '),
    otherVisitorPassOrder: other('visitorPassOrder', 'Заказ пропуска / Заказ пропуска - вкладка - Заказ пропуска. '),
    otherVisitorPassArchive: other('visitorPassArchive', 'Заказ пропуска / Заказ пропуска - вкладка - Архив. '),
}