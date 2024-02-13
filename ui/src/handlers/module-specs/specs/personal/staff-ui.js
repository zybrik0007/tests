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
const data = require('../../data').dataStaff;
const url = require('../../../../dictionaries/url');

const befActive = () => before('Вход и открытие подраздела "Сотрудники" вкладка "Действующие"', async () => {
    await dec.auth(entry.customLogin, entry.customPassword);
    await dec.simple(el.section.handler, [sec.per, entry.max], el.section);
    await dec.simple(el.subsection.handler, [sub.per.staff, entry.max], el.subsection);
    await dec.simple(el.tab.handler, ['Действующие', entry.max], el.tab);
    await dec.simple(page.staffActive.init, [entry.max], page.staffActive);
    //await page.base.loading(2000);
});

const befDismissed = () => before('Вход и открытие подраздела "Сотрудники" вкладка "Уволенные"', async () => {
    await dec.auth(entry.customLogin, entry.customPassword);
    await dec.simple(el.section.handler, [sec.per, entry.max], el.section);
    await dec.simple(el.subsection.handler, [sub.per.staff, entry.max], el.subsection);
    await dec.simple(el.tab.handler, ['Уволенные', entry.max], el.tab);
    await dec.simple(page.staffDimissed.init, [entry.max], page.staffDimissed);
    await page.base.loading(2000);
});

const befPass = () => before('Вход и открытие подраздела "Сотрудники"', async () => {
    await dec.auth(entry.customLogin, entry.customPassword);
    await dec.simple(el.section.handler, [sec.pas, entry.max], el.section);
    await dec.simple(el.subsection.handler, [sub.pas.staff, entry.max], el.subsection);
    await dec.simple(page.staffPass.init, [entry.max], page.staffPass);
    await page.base.loading(2000);
});

const aft = () => after('Выход', async () => await dec.exit());

const other = (type, text) => {

    const addStaffMaxParams = () => describe('Персонал / Сотрудники - вкладка - Действующие. ' +
        'Добавление сотрудника с максимальным количеством параметров.', () => {

        describe('Добавление', () => {

            befActive();
            aft();

            describe('Открытие страницы добавления', () => {
                decorate.el.butIcBefore.handler({
                    icon: but.add,
                    timeout: entry.max
                });
                decorate.page.staffChange.initAdd({
                    timeout: entry.max
                });
            });

            describe('Ввод данных "Общая информация"', () => {
                describe('Основная информация', () => {
                    decorate.el.input.sendKeys({
                        title: 'Фамилия',
                        placeholder: 'Фамилия',
                        value: data.staff.staff1.lastName,
                        timeout: entry.max
                    });

                    decorate.el.input.sendKeys({
                        title: 'Имя',
                        placeholder: 'Имя',
                        value: data.staff.staff1.firstName,
                        timeout: entry.max
                    });

                    decorate.el.input.sendKeys({
                        title: 'Отчество',
                        placeholder: 'Отчество',
                        value: data.staff.staff1.middleName,
                        timeout: entry.max
                    });

                    decorate.el.input.sendKeys({
                        title: 'Номер телефона',
                        placeholder: 'Номер телефона',
                        value: data.staff.staff1.phone,
                        timeout: entry.max
                    });

                    decorate.el.input.sendKeys({
                        title: 'E-Mail',
                        placeholder: 'E-Mail',
                        value: data.staff.staff1.mail,
                        timeout: entry.max
                    });

                    decorate.el.input.iconCalendar({
                        title: 'Дата рождения',
                        placeholder: 'Дата рождения',
                        timeout: entry.max
                    });
                    decorate.el.datepicker.dateParse({
                        day: data.staff.staff1.dateBirthday.day,
                        month: data.staff.staff1.dateBirthday.month,
                        year: data.staff.staff1.dateBirthday.year,
                        scrollYear: -500,
                        timeout: entry.max
                    });
                });

                describe('Учетные данные', () => {
                    decorate.el.input.sendKeys({
                        title: 'Табельный номер',
                        placeholder: 'Табельный номер',
                        value: data.staff.staff1.tabelNumber,
                        timeout: entry.max
                    });

                    decorate.el.input.iconCalendar({
                        title: 'Дата приема',
                        placeholder: 'Дата приема',
                        timeout: entry.max
                    });
                    decorate.el.datepicker.dateParse({
                        day: data.staff.staff1.date.day,
                        month: data.staff.staff1.date.month,
                        year: data.staff.staff1.date.year,
                        scrollYear: -500,
                        timeout: entry.max
                    });

                    decorate.el.input.iconCalendar({
                        title: 'Действует с',
                        placeholder: 'Действует с',
                        timeout: entry.max
                    });
                    decorate.el.datepicker.date({
                        day: data.staff.staff1.dateIn.day,
                        month: data.staff.staff1.dateIn.month,
                        year: data.staff.staff1.dateIn.year,
                        scrollYear: -500,
                        timeout: entry.max
                    });

                    decorate.el.selectInput.iconXpand({
                        title: 'Подразделение',
                        placeholder: 'Подразделение',
                        timeout: entry.max
                    });
                    decorate.el.selectXpand.xpand({
                        timeout: entry.max
                    });
                    decorate.el.selectXpand.handler({
                        value: data.staff.staff1.division,
                        timeout: entry.max
                    });
                    decorate.el.selectXpand.xpandNoElement({
                        timeout: entry.max
                    });

                    decorate.el.selectInput.iconXpand({
                        title: 'Должность',
                        placeholder: 'Должность',
                        timeout: entry.max
                    });
                    decorate.el.selectXpand.xpand({
                        timeout: entry.max
                    });
                    decorate.el.selectXpand.handler({
                        value: data.staff.staff1.position,
                        timeout: entry.max
                    });
                    decorate.el.selectXpand.xpandNoElement({
                        timeout: entry.max
                    });

                    decorate.el.input.iconCalendar({
                        title: 'Действует до',
                        placeholder: 'Действует до',
                        timeout: entry.max
                    });
                    decorate.el.datepicker.date({
                        day: data.staff.staff1.dateAfter.day,
                        month: data.staff.staff1.dateAfter.month,
                        year: data.staff.staff1.dateAfter.year,
                        scrollYear: -500,
                        timeout: entry.max
                    });

                    decorate.el.selectInput.iconXpand({
                        title: 'График работы',
                        placeholder: 'График работы',
                        timeout: entry.max
                    });
                    decorate.el.selectXpand.xpand({
                        timeout: entry.max
                    });
                    decorate.el.selectXpand.handler({
                        value: data.staff.staff1.schedule,
                        timeout: entry.max
                    });
                    decorate.el.selectXpand.xpandNoElement({
                        timeout: entry.max
                    });

                    decorate.el.selectMulti.iconXpand({
                        title: 'Шаблон доступа',
                        placeholder: 'Шаблон доступа',
                        timeout: entry.max
                    });
                    decorate.el.selectXpand.xpand({
                        timeout: entry.max
                    });
                    decorate.el.selectXpand.handler({
                        value: data.staff.staff1.template.template1,
                        timeout: entry.max
                    });
                    decorate.el.selectXpand.xpandNoElement({
                        timeout: entry.max
                    });

                    decorate.el.selectMulti.iconXpand({
                        title: 'Шаблон доступа',
                        placeholder: 'Шаблон доступа',
                        timeout: entry.max
                    });
                    decorate.el.selectXpand.xpand({
                        timeout: entry.max
                    });
                    decorate.el.selectXpand.handler({
                        value: data.staff.staff1.template.template2,
                        timeout: entry.max
                    });
                    decorate.el.selectXpand.xpandNoElement({
                        timeout: entry.max
                    });
                });

                describe('Дополнительные поля', () => {
                    decorate.el.input.sendKeys({
                        title: 'Пин-код',
                        placeholder: '',
                        value: data.staff.staff1.pinCode,
                        timeout: entry.max
                    });

                    decorate.el.input.sendKeys({
                        title: data.additionalData.data1Text.name,
                        placeholder: '',
                        value: data.staff.staff1.data1,
                        timeout: entry.max
                    });

                    decorate.el.select.iconXpand({
                        title: data.additionalData.data3Select.name,
                        value: '',
                        text: data.staff.staff1.data3,
                        timeout: entry.max
                    });

                    decorate.el.select.iconXpand({
                        title: data.additionalData.data4Checkbox.name,
                        value: 'Нет',
                        text: data.staff.staff1.data4,
                        timeout: entry.max
                    });

                    decorate.el.input.iconCalendar({
                        title: data.additionalData.data5Date.name,
                        placeholder: '',
                        timeout: entry.max
                    });
                    decorate.el.datepicker.dateParse({
                        day: data.staff.staff1.data5.day,
                        month: data.staff.staff1.data5.month,
                        year: data.staff.staff1.data5.year,
                        scrollYear: -500,
                        timeout: entry.max
                    });

                    decorate.el.input.iconCalendar({
                        title: data.additionalData.data6DateTime.name,
                        placeholder: '',
                        timeout: entry.max
                    });
                    decorate.el.datepicker.date({
                        day: data.staff.staff1.data6.day,
                        month: data.staff.staff1.data6.month,
                        year: data.staff.staff1.data6.year,
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
                    decorate.el.photography.imageStaff({
                        timeout: entry.max
                    });
                });
            });

            describe('Ввод данных "Карта доступа"', () => {

                describe('Открытие информации "Карта доступа"', () => {
                    decorate.el.simpleCell.handler({
                        name: 'Карта доступа',
                        timeout: entry.max
                    });
                    decorate.el.simpleCell.active({
                        name: 'Карта доступа',
                        timeout: entry.max
                    });
                });

                describe(`Добавление идентификатора "Основная карта" ${data.staff.staff1.card.card1}`, () => {
                    decorate.el.input.iconCard({
                        title: 'Идентификатор',
                        placeholder: '',
                        timeout: entry.max
                    });
                    decorate.modal.cardControlsAdd.init({
                        timeout: entry.max
                    });
                    decorate.modal.cardControlsNumber.inputSendKeys({
                        title: 'Идентификатор карты',
                        placeholder: '',
                        value: data.staff.staff1.card.card1,
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
                        value: data.staff.staff1.barcode,
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

                data.staff.staff1.ts.arrTS.forEach((obj, index) => {
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

            describe('Сохранение сотрудника', () => {
                decorate.el.button.handler({
                    name: 'Сохранить изменения',
                    timeout: entry.max
                });
                decorate.el.success.success({
                    text: 'Сотрудник успешно добавлен',
                    timeout: entry.max
                });
                decorate.el.button.handler({
                    name: 'Вернуться к списку сотрудников',
                    timeout: entry.max
                });
                decorate.page.staffActive.init({
                    timeout: entry.max
                });
            });
        });

        describe('Проверка', () => {
            befActive();
            aft();

            describe('Проверка таблицы', () => {
                decorate.el.table.size({
                    strCount: 1,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'ФИО',
                    strNumber: 1,
                    cellNumber: 2,
                    value: data.staff.staff1.lastName + ' ' + data.staff.staff1.firstName + ' ' + data.staff.staff1.middleName,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Табельный номер',
                    strNumber: 1,
                    cellNumber: 3,
                    value: data.staff.staff1.tabelNumber,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Дата приема',
                    strNumber: 1,
                    cellNumber: 4,
                    value: data.staff.staff1.dateIn.date.substr(0, 10),
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Карта',
                    strNumber: 1,
                    cellNumber: 5,
                    value: data.staff.staff1.card.card1,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Штрихкод',
                    strNumber: 1,
                    cellNumber: 6,
                    value: data.staff.staff1.barcode,
                    timeout: entry.max
                });
                decorate.el.table.cellNoIconLock({
                    strNumber: 1,
                    cellNumber: 7,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Подразделение',
                    strNumber: 1,
                    cellNumber: 8,
                    value: data.staff.staff1.division,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Должность',
                    strNumber: 1,
                    cellNumber: 9,
                    value: data.staff.staff1.position,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'График работы',
                    strNumber: 1,
                    cellNumber: 10,
                    value: data.staff.staff1.schedule,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Шаблон доступа',
                    strNumber: 1,
                    cellNumber: 11,
                    value: '2 шаблона доступа',
                    timeout: entry.max
                });
                decorate.el.table.cellImg({
                    headTitle: 'Фотография',
                    strNumber: 1,
                    cellNumber: 12,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Транспортное средство',
                    strNumber: 1,
                    cellNumber: 13,
                    value: data.staff.staff1.ts.arrTS.map(obj => obj.number + ' ' + obj.model).join(';'),
                    timeout: entry.max
                });
            });

            describe('Проверка параметров', () => {

                describe('Открытие сотрудника на редактирование', () => {
                    decorate.el.table.strHandler({
                        strNumber: 1,
                        timeout: entry.max
                    });
                    decorate.el.butIcBefore.handler({
                        icon: but.edit,
                        timeout: entry.max
                    });
                    decorate.page.staffChange.initEdit({
                        timeout: entry.max
                    });
                });

                describe('Проверка данных "Общая информация"', () => {
                    describe('Основная информация', () => {
                        decorate.el.input.getValue({
                            title: 'Фамилия',
                            placeholder: 'Фамилия',
                            value: data.staff.staff1.lastName,
                            timeout: entry.max
                        });

                        decorate.el.input.getValue({
                            title: 'Имя',
                            placeholder: 'Имя',
                            value: data.staff.staff1.firstName,
                            timeout: entry.max
                        });

                        decorate.el.input.getValue({
                            title: 'Отчество',
                            placeholder: 'Отчество',
                            value: data.staff.staff1.middleName,
                            timeout: entry.max
                        });

                        decorate.el.input.getValue({
                            title: 'Номер телефона',
                            placeholder: 'Номер телефона',
                            value: data.staff.staff1.phone,
                            timeout: entry.max
                        });

                        decorate.el.input.getValue({
                            title: 'E-Mail',
                            placeholder: 'E-Mail',
                            value: data.staff.staff1.mail,
                            timeout: entry.max
                        });

                        decorate.el.input.getValue({
                            title: 'Дата рождения',
                            placeholder: 'Дата рождения',
                            value: data.staff.staff1.dateBirthday.date,
                            timeout: entry.max
                        });
                    });

                    describe('Учетные данные', () => {
                        decorate.el.input.getValue({
                            title: 'Табельный номер',
                            placeholder: 'Табельный номер',
                            value: data.staff.staff1.tabelNumber,
                            timeout: entry.max
                        });

                        decorate.el.input.getValue({
                            title: 'Дата приема',
                            placeholder: 'Дата приема',
                            value: data.staff.staff1.date.date,
                            timeout: entry.max
                        });

                        decorate.el.input.getValue({
                            title: 'Действует с',
                            placeholder: 'Действует с',
                            value: data.staff.staff1.dateIn.date,
                            timeout: entry.max
                        });

                        decorate.el.input.getValue({
                            title: 'Подразделение',
                            placeholder: 'Подразделение',
                            value: data.staff.staff1.division,
                            timeout: entry.max
                        });

                        decorate.el.input.getValue({
                            title: 'Должность',
                            placeholder: 'Должность',
                            value: data.staff.staff1.position,
                            timeout: entry.max
                        });

                        decorate.el.input.getValue({
                            title: 'Действует до',
                            placeholder: 'Действует до',
                            value: data.staff.staff1.dateAfter.date,
                            timeout: entry.max
                        });

                        decorate.el.input.getValue({
                            title: 'График работы',
                            placeholder: 'График работы',
                            value: data.staff.staff1.schedule,
                            timeout: entry.max
                        });

                        decorate.el.selectMulti.getText({
                            title: 'Шаблон доступа',
                            valueNumber: 1,
                            value: data.staff.staff1.template.template1,
                            timeout: entry.max
                        });

                        decorate.el.selectMulti.getText({
                            title: 'Шаблон доступа',
                            valueNumber: 2,
                            value: data.staff.staff1.template.template2,
                            timeout: entry.max
                        });
                    });

                    describe('Дополнительные поля', () => {
                        decorate.el.input.getValue({
                            title: 'Пин-код',
                            placeholder: '',
                            value: data.staff.staff1.pinCode,
                            timeout: entry.max
                        });

                        decorate.el.input.getValue({
                            title: data.additionalData.data1Text.name,
                            placeholder: '',
                            value: data.staff.staff1.data1,
                            timeout: entry.max
                        });

                        decorate.el.select.getText({
                            title: data.additionalData.data3Select.name,
                            value: data.staff.staff1.data3,
                            timeout: entry.max
                        });

                        decorate.el.select.getText({
                            title: data.additionalData.data4Checkbox.name,
                            value: data.staff.staff1.data4,
                            timeout: entry.max
                        });

                        decorate.el.input.getValue({
                            title: data.additionalData.data5Date.name,
                            placeholder: '',
                            value: data.staff.staff1.data5.date,
                            timeout: entry.max
                        });

                        decorate.el.input.getValue({
                            title: data.additionalData.data6DateTime.name,
                            placeholder: '',
                            value: data.staff.staff1.data6.date,
                            timeout: entry.max
                        });
                    });

                    describe('Фотография', () => {
                        decorate.el.photography.imageStaff({
                            timeout: entry.max
                        });
                    });
                });

                describe('Проверка данных "Изображения"', () => {
                    describe('Открытие информации "Изображения"', () => {
                        decorate.el.simpleCell.handler({
                            name: 'Изображения',
                            timeout: entry.max
                        });
                        decorate.el.simpleCell.active({
                            name: 'Изображения',
                            timeout: entry.max
                        });
                    });
                    describe('Проверка дополнительного поля изображения', () => {
                        decorate.el.photography.noImageAdditional({
                            number: 1,
                            timeout: entry.max
                        });
                        decorate.el.photography.getAdditionalName({
                            number: 1,
                            value: data.staff.staff1.data2
                        });
                    });
                });

                describe('Проверка данных "Оправдательные документы"', () => {
                    decorate.el.simpleCell.handler({
                        name: 'Оправдательные документы',
                        timeout: entry.max
                    });
                    decorate.el.simpleCell.active({
                        name: 'Оправдательные документы',
                        timeout: entry.max
                    });
                    decorate.el.rowEmpty.getText({
                        value: 'Нет данных для отображения',
                        timeout: entry.max
                    });
                });

                describe('Проверка данных "Документы"', () => {
                    decorate.el.simpleCell.handler({
                        name: 'Документы',
                        timeout: entry.max
                    });
                    decorate.el.simpleCell.active({
                        name: 'Документы',
                        timeout: entry.max
                    });
                    decorate.el.rowEmpty.getText({
                        value: 'Нет данных для отображения',
                        timeout: entry.max
                    });
                });

                describe('Проверка данных "Планировщик"', () => {
                    describe('Открытие информации "Планировщик"', () => {
                        decorate.el.simpleCell.handler({
                            name: 'Планировщик',
                            timeout: entry.max
                        });
                        decorate.el.simpleCell.active({
                            name: 'Планировщик',
                            timeout: entry.max
                        });
                    });
                    describe('Проверка строки 1', () => {
                        decorate.el.table.cellGetText({
                            headTitle: 'Учетные данные',
                            strNumber: 1,
                            cellNumber: 1,
                            value: 'Шаблон доступа',
                            timeout: entry.max
                        });
                        decorate.el.table.cellGetText({
                            headTitle: 'Дата начала',
                            strNumber: 1,
                            cellNumber: 2,
                            value: data.staff.staff1.dateIn.date.substr(0, 10),
                            timeout: entry.max
                        });
                        decorate.el.table.cellGetText({
                            headTitle: 'Дата окончания',
                            strNumber: 1,
                            cellNumber: 3,
                            value: '',
                            timeout: entry.max
                        });
                        decorate.el.table.cellGetText({
                            headTitle: 'Значение',
                            strNumber: 1,
                            cellNumber: 4,
                            value: data.staff.staff1.template.template2,
                            timeout: entry.max
                        });
                    });
                    describe('Проверка строки 2', () => {
                        decorate.el.table.cellGetText({
                            headTitle: 'Учетные данные',
                            strNumber: 2,
                            cellNumber: 1,
                            value: 'Шаблон доступа',
                            timeout: entry.max
                        });
                        decorate.el.table.cellGetText({
                            headTitle: 'Дата начала',
                            strNumber: 2,
                            cellNumber: 2,
                            value: data.staff.staff1.dateIn.date.substr(0, 10),
                            timeout: entry.max
                        });
                        decorate.el.table.cellGetText({
                            headTitle: 'Дата окончания',
                            strNumber: 2,
                            cellNumber: 3,
                            value: '',
                            timeout: entry.max
                        });
                        decorate.el.table.cellGetText({
                            headTitle: 'Значение',
                            strNumber: 2,
                            cellNumber: 4,
                            value: data.staff.staff1.template.template1,
                            timeout: entry.max
                        });
                    });
                    describe('Проверка строки 3', () => {
                        decorate.el.table.cellGetText({
                            headTitle: 'Учетные данные',
                            strNumber: 3,
                            cellNumber: 1,
                            value: 'График работы',
                            timeout: entry.max
                        });
                        decorate.el.table.cellGetText({
                            headTitle: 'Дата начала',
                            strNumber: 3,
                            cellNumber: 2,
                            value: data.staff.staff1.dateIn.date.substr(0, 10),
                            timeout: entry.max
                        });
                        decorate.el.table.cellGetText({
                            headTitle: 'Дата окончания',
                            strNumber: 3,
                            cellNumber: 3,
                            value: '',
                            timeout: entry.max
                        });
                        decorate.el.table.cellGetText({
                            headTitle: 'Значение',
                            strNumber: 3,
                            cellNumber: 4,
                            value: data.staff.staff1.schedule,
                            timeout: entry.max
                        });
                    });
                    describe('Проверка строки 4', () => {
                        decorate.el.table.cellGetText({
                            headTitle: 'Учетные данные',
                            strNumber: 4,
                            cellNumber: 1,
                            value: 'Должность',
                            timeout: entry.max
                        });
                        decorate.el.table.cellGetText({
                            headTitle: 'Дата начала',
                            strNumber: 4,
                            cellNumber: 2,
                            value: data.staff.staff1.dateIn.date.substr(0, 10),
                            timeout: entry.max
                        });
                        decorate.el.table.cellGetText({
                            headTitle: 'Дата окончания',
                            strNumber: 4,
                            cellNumber: 3,
                            value: '',
                            timeout: entry.max
                        });
                        decorate.el.table.cellGetText({
                            headTitle: 'Значение',
                            strNumber: 4,
                            cellNumber: 4,
                            value: data.staff.staff1.position,
                            timeout: entry.max
                        });
                    });
                    describe('Проверка строки 5', () => {
                        decorate.el.table.cellGetText({
                            headTitle: 'Учетные данные',
                            strNumber: 5,
                            cellNumber: 1,
                            value: 'Подразделение',
                            timeout: entry.max
                        });
                        decorate.el.table.cellGetText({
                            headTitle: 'Дата начала',
                            strNumber: 5,
                            cellNumber: 2,
                            value: data.staff.staff1.dateIn.date.substr(0, 10),
                            timeout: entry.max
                        });
                        decorate.el.table.cellGetText({
                            headTitle: 'Дата окончания',
                            strNumber: 5,
                            cellNumber: 3,
                            value: '',
                            timeout: entry.max
                        });
                        decorate.el.table.cellGetText({
                            headTitle: 'Значение',
                            strNumber: 5,
                            cellNumber: 4,
                            value: data.staff.staff1.division,
                            timeout: entry.max
                        });
                    });
                });

                describe('Проверка данных "Карта доступа"', () => {
                    describe('Открытие информации "Карта доступа"', () => {
                        decorate.el.simpleCell.handler({
                            name: 'Карта доступа',
                            timeout: entry.max
                        });
                        decorate.el.simpleCell.active({
                            name: 'Карта доступа',
                            timeout: entry.max
                        });
                    });

                    describe(`Проверка идентификатора "Основная карта"`, () => {
                        it('Поиск идентификатора "Основная карта" в массиве идентфикаторов', async () => {
                            const card = await el.input.getValue('Идентификатор', '', entry.max);
                            const array = [...data.staff.staff1.card.arr, data.staff.staff1.card.card1];
                            const searchCard = array.includes(card.text);
                            expect(searchCard).to.equal(true);
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
                            value: data.staff.staff1.barcode,
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

                    data.staff.staff1.ts.arrTS.forEach((obj, index) => {
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

                describe('Нажатие кнопки "Вернуться к списку сотрудников".', () => {
                    decorate.el.button.handler({
                        name: 'Вернуться к списку сотрудников',
                        timeout: entry.max
                    });
                    decorate.modalConfirm.staffReturn.init({
                        timeout: entry.max
                    });
                    decorate.el.button.handler({
                        name: 'Подтвердить',
                        timeout: entry.max
                    });
                    decorate.page.staffActive.init({
                        timeout: entry.max
                    });
                });
            });
        });

    });

    const printCardStaffMaxParams = () => describe('Персонал / Сотрудники - вкладка - Действующие. ' +
        'Проверка "Печать карточки сотрудника."', () => {

        befActive();
        aft();

        describe('Открытие модального окна "Печать карточки сотрудника"', () => {
            decorate.el.table.strHandler({
                strNumber: 1,
                timeout: entry.max
            });
            decorate.el.butIcBefore.handler({
                icon: but.menu,
                timeout: entry.max
            });
            it('Ожидание 2 секунды', async () => await page.base.loading(2000));
            decorate.el.menu.menu({
                timeout: entry.max
            });
            decorate.el.menu.handler({
                name: 'Печать карточки сотрудника',
                timeout: entry.max
            });
            decorate.modal.printCardStaff.init({
                timeout: entry.max
            });
        });

        describe('Отключение отображения Фамилии', () => {
            decorate.modal.printCardStaff.lastName({
                title: 'Фамилия',
                name: data.staff.staff1.lastName,
                timeout: entry.max
            });
            decorate.el.checkbox.handler({
                name: 'Фамилия',
                timeout: entry.max
            });
            decorate.modal.printCardStaff.noLastName({
                title: 'Фамилия',
                name: data.staff.staff1.lastName,
                timeout: entry.max
            });
        });

        describe('Включение отображения Фамилии', () => {
            decorate.modal.printCardStaff.noLastName({
                title: 'Фамилия',
                name: data.staff.staff1.lastName,
                timeout: entry.max
            });
            decorate.el.checkbox.handler({
                name: 'Фамилия',
                timeout: entry.max
            });
            decorate.modal.printCardStaff.lastName({
                title: 'Фамилия',
                name: data.staff.staff1.lastName,
                timeout: entry.max
            });
        });

        describe('Отображение активной кнопки "Печать"', () => {
            decorate.el.button.active({
                name: 'Печать',
                timeout: entry.max
            });
        });

        describe('Закрытие модального окна "Печать карточки сотрудника"', () => {
            decorate.modal.printCardStaff.closeHandler({
                timeout: entry.max
            });
            decorate.modal.printCardStaff.initClose({
                timeout: entry.max
            });
        });
    });

    const printDesignCardStaffMaxParams = () => describe(text + 'Проверка "Печать пропуска".', () => {

        if(type === 'active') {
            befActive();
            aft();

            describe('Открытие модального окна "Печать пропуска"', () => {
                decorate.el.table.strHandler({
                    strNumber: 1,
                    timeout: entry.max
                });
                decorate.el.butIcBefore.handler({
                    icon: but.menu,
                    timeout: entry.max
                });
                it('Ожидание 2 секунды', async () => await page.base.loading(2000));
                decorate.el.menu.menu({
                    timeout: entry.max
                });
                decorate.el.menu.handler({
                    name: 'Печать пропуска',
                    timeout: entry.max
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

        if(type === 'pass') {
            befPass();
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

    const printBarcodeStaffMaxParams = () => describe(text + 'Проверка печати "Печать штрихкода".', () => {

        if(type === 'active') {
            befActive();
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
                it('Ожидание 2 секунды', async () => await page.base.loading(2000));
                decorate.el.menu.menu({
                    timeout: entry.max
                });
                decorate.el.menu.handler({
                    name: 'Печать штрихкода',
                    timeout: entry.max
                });
                decorate.modal.printBarcode.init({
                    timeout: entry.max
                });
            });

            describe('Проверка отображения данных в модальном окне "Печать штрихкода"', () => {
                decorate.modal.printBarcode.data({
                    title: 'Фамилия',
                    value: data.staff.staff1.lastName,
                    number: 1,
                    timeout: entry.max
                });
                decorate.modal.printBarcode.data({
                    title: 'Имя',
                    value: data.staff.staff1.firstName,
                    number: 2,
                    timeout: entry.max
                });
                decorate.modal.printBarcode.data({
                    title: 'Отчество',
                    value: data.staff.staff1.middleName,
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
                decorate.modal.printBarcode.closeHandler({
                    timeout: entry.max
                });
                decorate.modal.printBarcode.initClose({
                    timeout: entry.max
                });
            });
        }

        if(type === 'pass') {
            befPass();
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
                it('Ожидание 2 секунды', async () => await page.base.loading(2000));
                decorate.el.menu.menu({
                    timeout: entry.max
                });
                decorate.el.menu.handler({
                    name: 'Печать штрихкода',
                    timeout: entry.max
                });
                decorate.modal.printBarcode.init({
                    timeout: entry.max
                });
            });

            describe('Проверка отображения данных в модальном окне "Печать штрихкода"', () => {
                decorate.modal.printBarcode.data({
                    title: 'Фамилия',
                    value: data.staff.staff3.lastName,
                    number: 1,
                    timeout: entry.max
                });
                decorate.modal.printBarcode.data({
                    title: 'Имя',
                    value: data.staff.staff3.firstName,
                    number: 2,
                    timeout: entry.max
                });
                decorate.modal.printBarcode.data({
                    title: 'Отчество',
                    value: '',
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
                decorate.modal.printBarcode.closeHandler({
                    timeout: entry.max
                });
                decorate.modal.printBarcode.initClose({
                    timeout: entry.max
                });
            });
        }
    });

    const printTableStaffMaxParams = () => describe(text + 'Проверка печати таблицы.', () => {

        if(type === 'active') {
            befActive();
            aft();

            describe('Открытие печатной формы', () => {
                decorate.el.butIcBefore.handler({
                    icon: but.menu,
                    timeout: entry.max
                });
                it('Ожидание 2 секунды', async () => await page.base.loading(2000));
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
                    head: 'ФИО',
                    str: 1,
                    cell: 1,
                    value: data.staff.staff1.lastName + ' ' + data.staff.staff1.firstName + ' ' + data.staff.staff1.middleName,
                    timeout: entry.max
                });
                decorate.modal.printTable.cellGetText({
                    head: 'Табельный номер',
                    str: 1,
                    cell: 2,
                    value: data.staff.staff1.tabelNumber,
                    timeout: entry.max
                });
                decorate.modal.printTable.cellGetText({
                    head: 'Дата приема',
                    str: 1,
                    cell: 3,
                    value: data.staff.staff1.dateBirthday.date,
                    timeout: entry.max
                });
                decorate.modal.printTable.cellGetText({
                    head: 'Карта',
                    str: 1,
                    cell: 4,
                    value: data.staff.staff1.card.card1,
                    timeout: entry.max
                });
                decorate.modal.printTable.cellGetText({
                    head: 'Штрихкод',
                    str: 1,
                    cell: 5,
                    value: data.staff.staff1.barcode,
                    timeout: entry.max
                });
                decorate.modal.printTable.cellGetText({
                    head: 'Блокировка',
                    str: 1,
                    cell: 6,
                    value: '',
                    timeout: entry.max
                });
                decorate.modal.printTable.cellGetText({
                    head: 'Подразделение',
                    str: 1,
                    cell: 7,
                    value: data.staff.staff1.division,
                    timeout: entry.max
                });
                decorate.modal.printTable.cellGetText({
                    head: 'Должность',
                    str: 1,
                    cell: 8,
                    value: data.staff.staff1.position,
                    timeout: entry.max
                });
                decorate.modal.printTable.cellGetText({
                    head: 'График работы',
                    str: 1,
                    cell: 9,
                    value: data.staff.staff1.schedule,
                    timeout: entry.max
                });
                decorate.modal.printTable.cellGetText({
                    head: 'Шаблон доступа',
                    str: 1,
                    cell: 10,
                    value: '2 шаблона доступа',
                    timeout: entry.max
                });
                decorate.modal.printTable.cellImg({
                    head: 'Фотография',
                    str: 1,
                    cell: 11,
                    timeout: entry.max
                });
                decorate.modal.printTable.cellGetText({
                    head: 'Транспортное средство',
                    str: 1,
                    cell: 12,
                    value: data.staff.staff1.ts.arrTS.map(obj => obj.number + ' ' + obj.model).join(';'),
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

        if(type === 'pass') {
            befPass();
            aft();

            describe('Открытие печатной формы', () => {
                decorate.el.butIcBefore.handler({
                    icon: but.menu,
                    timeout: entry.max
                });
                it('Ожидание 2 секунды', async () => await page.base.loading(2000));
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
                    head: 'Сотрудник',
                    str: 1,
                    cell: 1,
                    value: data.staff.staff3.lastName + ' ' + data.staff.staff3.firstName,
                    timeout: entry.max
                });
                decorate.modal.printTable.cellGetText({
                    head: 'Должность',
                    str: 1,
                    cell: 2,
                    value: '',
                    timeout: entry.max
                });
                decorate.modal.printTable.cellGetText({
                    head: 'Подразделение',
                    str: 1,
                    cell: 3,
                    value: data.staff.staff3.division,
                    timeout: entry.max
                });
                decorate.modal.printTable.cellGetText({
                    head: 'Блокировка',
                    str: 1,
                    cell: 4,
                    value: '',
                    timeout: entry.max
                });
                decorate.modal.printTable.cellGetText({
                    head: 'Шаблон доступа',
                    str: 1,
                    cell: 5,
                    value: '2 шаблона доступа',
                    timeout: entry.max
                });
                decorate.modal.printTable.cellGetText({
                    head: 'Карта',
                    str: 1,
                    cell: 6,
                    value: '10 карт',
                    timeout: entry.max
                });
                decorate.modal.printTable.cellGetText({
                    head: 'Штрихкод',
                    str: 1,
                    cell: 7,
                    value: data.staff.staff1.barcode,
                    timeout: entry.max
                });
                decorate.modal.printTable.cellGetText({
                    head: 'Действует с',
                    str: 1,
                    cell: 8,
                    value: data.staff.staff1.dateIn.date + ':00',
                    timeout: entry.max
                });
                decorate.modal.printTable.cellGetText({
                    head: 'Действует до',
                    str: 1,
                    cell: 9,
                    value: data.staff.staff1.dateAfter.date + ':00',
                    timeout: entry.max
                });
                decorate.modal.printTable.cellImg({
                    head: 'Фотография',
                    str: 1,
                    cell: 10,
                    timeout: entry.max
                });
                decorate.modal.printTable.cellGetText({
                    head: 'Транспортное средство',
                    str: 1,
                    cell: 11,
                    value: data.staff.staff1.ts.arrTS.map(obj => obj.number + ' ' + obj.model).join(';'),
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

    const exportStaffXLSXMaxParams = () => describe(text + 'Проверка экспорта XLSX.', () => {

        if(type === 'active') {
            const params = {
                nameFile: 'user.xlsx',
                json: [
                    {
                        'Отчет Сотрудники': "Подразделение: 'division1, division2, division3, Администраторы системы'"
                    },
                    {
                        'Отчет Сотрудники': 'Фамилия',
                        __EMPTY: 'Имя',
                        __EMPTY_1: 'Отчество',
                        __EMPTY_2: 'Блокировка',
                        __EMPTY_3: 'Табельный номер',
                        __EMPTY_4: 'Дата приема на работу',
                        __EMPTY_5: 'Подразделение',
                        __EMPTY_6: 'Должность',
                        __EMPTY_7: 'Шаблон доступа',
                        __EMPTY_8: 'График работы',
                        __EMPTY_9: 'Карта №',
                        __EMPTY_10: 'Штрих-код',
                        __EMPTY_11: 'Фото',
                        __EMPTY_12: 'Транспортное средство'
                    },
                    {
                        'Отчет Сотрудники': 'last1',
                        __EMPTY: 'name1',
                        __EMPTY_1: 'middle1',
                        __EMPTY_2: '',
                        __EMPTY_3: 'tabel1',
                        __EMPTY_4: '2023-06-01',
                        __EMPTY_5: 'division1',
                        __EMPTY_6: 'position1',
                        __EMPTY_7: '2 шаблона доступа',
                        __EMPTY_8: 'schedule1',
                        __EMPTY_9: '1',
                        __EMPTY_10: '2184201005502',
                        __EMPTY_11: 'Есть',
                        __EMPTY_12: 'abc123 xyz123;abc1234 xyz1234;abc12345 xyz12345;abc12346 xyz123456'
                    }
                ]
            }

            befActive();
            aft();

            describe('Экспорт', () => {
                decorate.el.butIcBefore.handler({
                    icon: but.menu,
                    timeout: entry.max
                });
                it('Ожидание 2 секунды', async () => await page.base.loading(2000));
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
                    json: params.json
                });
                decorate.el.file.delete({
                    file: params.nameFile,
                    timeout: entry.upload
                });
            });
        }

        if(type === 'pass') {
            const params = {
                nameFile: 'user.xlsx',
                json: [
                    {
                        'Отчет Сотрудники': "Подразделение: 'division1, division2, division3, Администраторы системы'"
                    },
                    {
                        'Отчет Сотрудники': 'Фамилия',
                        __EMPTY: 'Имя',
                        __EMPTY_1: 'Отчество',
                        __EMPTY_2: 'Блокировка',
                        __EMPTY_3: 'Подразделение',
                        __EMPTY_4: 'Должность',
                        __EMPTY_5: 'Шаблон доступа',
                        __EMPTY_6: 'Карта №',
                        __EMPTY_7: 'Штрих-код',
                        __EMPTY_8: 'Действует с',
                        __EMPTY_9: 'Действует до',
                        __EMPTY_10: 'Фото',
                        __EMPTY_11: 'Транспортное средство'
                    },
                    {
                        'Отчет Сотрудники': 'last3',
                        __EMPTY: 'name3',
                        __EMPTY_1: '',
                        __EMPTY_2: '',
                        __EMPTY_3: 'division3',
                        __EMPTY_4: '',
                        __EMPTY_5: '',
                        __EMPTY_6: '',
                        __EMPTY_7: '',
                        __EMPTY_8: '2023-06-01 00:00:00',
                        __EMPTY_9: '2033-06-01 23:00:00',
                        __EMPTY_10: 'Есть',
                        __EMPTY_11: 'abc123 xyz123;abc1234 xyz1234;abc12345 xyz12345;abc12346 xyz123456'
                    }
                ]
            }

            befPass();
            aft();

            describe('Экспорт', () => {
                decorate.el.butIcBefore.handler({
                    icon: but.menu,
                    timeout: entry.max
                });
                it('Ожидание 2 секунды', async () => await page.base.loading(2000));
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
                    json: params.json
                });
                decorate.el.file.delete({
                    file: params.nameFile,
                    timeout: entry.upload
                });
            });
        }

    });

    const exportStaffCSVMaxParams = () => describe(text + 'Проверка экспорта CSV.', () => {

        if(type === 'active') {
            const params = {
                nameFile: 'user.csv',
                json: [
                    {
                        'Фамилия': 'last1',
                        'Имя': 'name1',
                        'Отчество': 'middle1',
                        'Табельный номер': 'tabel1',
                        'Дата приема на работу': 45078.12519675926,
                        'Подразделение': 'division1',
                        'Должность': 'position1',
                        'Шаблон доступа': '2 шаблона доступа',
                        'График работы': 'schedule1',
                        'Карта №': 1,
                        'Штрих-код': 2184201005502,
                        'Фото': 'Есть',
                        'Транспортное средство': 'abc123 xyz123;abc1234 xyz1234;abc12345 xyz12345;abc12346 xyz123456'
                    }
                ]
            }

            befActive();
            aft();

            describe('Экспорт', () => {
                decorate.el.butIcBefore.handler({
                    icon: but.menu,
                    timeout: entry.max
                });
                it('Ожидание 2 секунды', async () => await page.base.loading(2000));
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
                    json: params.json
                });
                decorate.el.file.delete({
                    file: params.nameFile,
                    timeout: entry.upload
                });
            });
        }

        if(type === 'pass') {
            const params = {
                nameFile: 'user.csv',
                json: [
                    {
                        'Фамилия': 'last3',
                        'Имя': 'name3',
                        'Подразделение': 'division3',
                        'Действует с': '2023-06-01 00:00:00',
                        'Действует до': '2033-06-01 23:00:00',
                        'Фото': 'Есть',
                        'Транспортное средство': 'abc123 xyz123;abc1234 xyz1234;abc12345 xyz12345;abc12346 xyz123456'
                    }
                ]
            }

            befPass();
            aft();

            describe('Экспорт', () => {
                decorate.el.butIcBefore.handler({
                    icon: but.menu,
                    timeout: entry.max
                });
                it('Ожидание 2 секунды', async () => await page.base.loading(2000));
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
                    json: params.json
                });
                decorate.el.file.delete({
                    file: params.nameFile,
                    timeout: entry.upload
                });
            });
        }
    });

    const dimissedStaffMaxParams = () => describe('Персонал / Сотрудники - вкладка - Действующие. ' +
        'Увольнение прошлой датой.', () => {

        describe('Увольнение сотрудника', () => {
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
            decorate.modal.dimissStaff.init({
                timeout: entry.max
            });
            decorate.el.input.iconCalendar({
                title: 'Дата увольнения',
                placeholder: '',
                timeout: entry.max
            });
            decorate.el.datepicker.dateParse({
                day: data.staff.staff1.dateIn.day,
                month: data.staff.staff1.dateIn.month,
                year: data.staff.staff1.dateIn.year,
                scrollYear: -500,
                timeout: entry.max
            });
            decorate.el.button.handler({
                name: 'Уволить',
                timeout: entry.max
            });
            decorate.el.success.success({
                text: 'Операция успешно завершена',
                timeout: entry.max
            });
            decorate.modal.dimissStaff.initClose({
                timeout: entry.max
            });
            decorate.el.table.noStr({
                timeout: entry.max
            });
        });

        describe('Персонал / Сотрудники - вкладка - Уволенные. Проверка таблицы', () => {
            befDismissed();
            aft();
            decorate.el.table.size({
                strCount: 1,
                timeout: entry.max
            });
            decorate.el.table.cellGetText({
                headTitle: 'ФИО',
                strNumber: 1,
                cellNumber: 1,
                value: data.staff.staff1.lastName + ' ' + data.staff.staff1.firstName + ' ' + data.staff.staff1.middleName,
                timeout: entry.max
            });
            decorate.el.table.cellGetText({
                headTitle: 'Табельный номер',
                strNumber: 1,
                cellNumber: 2,
                value: data.staff.staff1.tabelNumber,
                timeout: entry.max
            });
            decorate.el.table.cellGetText({
                headTitle: 'Дата приема',
                strNumber: 1,
                cellNumber: 3,
                value: data.staff.staff1.dateIn.date.substr(0, 10),
                timeout: entry.max
            });
            decorate.el.table.cellGetText({
                headTitle: 'Дата увольнения',
                strNumber: 1,
                cellNumber: 4,
                value: data.staff.staff1.dateIn.date.substr(0, 10),
                timeout: entry.max
            });
            decorate.el.table.cellGetText({
                headTitle: 'Подразделение',
                strNumber: 1,
                cellNumber: 5,
                value: data.staff.staff1.division,
                timeout: entry.max
            });
            decorate.el.table.cellGetText({
                headTitle: 'Должность',
                strNumber: 1,
                cellNumber: 6,
                value: data.staff.staff1.position,
                timeout: entry.max
            });
            decorate.el.table.cellImg({
                headTitle: 'Фотография',
                strNumber: 1,
                cellNumber: 7,
                timeout: entry.max
            });
        });
    });

    const openDimissedStaffMaxParams = () => describe('Персонал / Сотрудники - вкладка - Уволенные. ' +
        'Просмотр карточки сотрудника', () => {

        befDismissed();
        aft();

        describe('Открытие карточки сотрудника на просмотр', () => {
            decorate.el.table.strHandler({
                strNumber: 1,
                timeout: entry.max
            });
            decorate.el.butIcBefore.handler({
                icon: but.unsorted_view_outline,
                timeout: entry.max
            });
            decorate.page.staffChange.initEdit({
                timeout: entry.max
            });
        });

        describe('Проверка данных "Общая информация"', () => {
            describe('Основная информация', () => {
                decorate.page.staffChange.getDimissedValue({
                    value: data.staff.staff1.dateDimissed,
                    timeout: entry.max
                });
                decorate.el.input.getValue({
                    title: 'Фамилия',
                    placeholder: 'Фамилия',
                    value: data.staff.staff1.lastName,
                    timeout: entry.max
                });

                decorate.el.input.getValue({
                    title: 'Имя',
                    placeholder: 'Имя',
                    value: data.staff.staff1.firstName,
                    timeout: entry.max
                });

                decorate.el.input.getValue({
                    title: 'Отчество',
                    placeholder: 'Отчество',
                    value: data.staff.staff1.middleName,
                    timeout: entry.max
                });

                decorate.el.input.getValue({
                    title: 'Номер телефона',
                    placeholder: 'Номер телефона',
                    value: data.staff.staff1.phone,
                    timeout: entry.max
                });

                decorate.el.input.getValue({
                    title: 'E-Mail',
                    placeholder: 'E-Mail',
                    value: data.staff.staff1.mail,
                    timeout: entry.max
                });

                decorate.el.input.getValue({
                    title: 'Дата рождения',
                    placeholder: 'Дата рождения',
                    value: data.staff.staff1.dateBirthday.date,
                    timeout: entry.max
                });
            });

            describe('Учетные данные', () => {
                decorate.el.input.getValue({
                    title: 'Табельный номер',
                    placeholder: 'Табельный номер',
                    value: data.staff.staff1.tabelNumber,
                    timeout: entry.max
                });

                decorate.el.input.getValue({
                    title: 'Дата приема',
                    placeholder: 'Дата приема',
                    value: data.staff.staff1.date.date,
                    timeout: entry.max
                });

                decorate.el.input.getValue({
                    title: 'Действует с',
                    placeholder: 'Действует с',
                    value: data.staff.staff1.dateIn.date,
                    timeout: entry.max
                });

                decorate.el.input.getValue({
                    title: 'Подразделение',
                    placeholder: 'Подразделение',
                    value: data.staff.staff1.division,
                    timeout: entry.max
                });

                decorate.el.input.getValue({
                    title: 'Должность',
                    placeholder: 'Должность',
                    value: data.staff.staff1.position,
                    timeout: entry.max
                });

                decorate.el.input.getValue({
                    title: 'Действует до',
                    placeholder: 'Действует до',
                    value: data.staff.staff1.dateAfter.date,
                    timeout: entry.max
                });

                decorate.el.input.getValue({
                    title: 'График работы',
                    placeholder: 'График работы',
                    value: '',
                    timeout: entry.max
                });

                decorate.el.selectMulti.noData({
                    title: 'Шаблон доступа',
                    valueNumber: 1,
                    timeout: entry.min
                });

                decorate.el.selectMulti.noData({
                    title: 'Шаблон доступа',
                    valueNumber: 2,
                    timeout: entry.min
                });
            });

            describe('Дополнительные поля', () => {
                decorate.el.input.getValue({
                    title: 'Пин-код',
                    placeholder: '',
                    value: data.staff.staff1.pinCode,
                    timeout: entry.max
                });

                decorate.el.input.getValue({
                    title: data.additionalData.data1Text.name,
                    placeholder: '',
                    value: data.staff.staff1.data1,
                    timeout: entry.max
                });

                decorate.el.select.getText({
                    title: data.additionalData.data3Select.name,
                    value: data.staff.staff1.data3,
                    timeout: entry.max
                });

                decorate.el.select.getText({
                    title: data.additionalData.data4Checkbox.name,
                    value: data.staff.staff1.data4,
                    timeout: entry.max
                });

                decorate.el.input.getValue({
                    title: data.additionalData.data5Date.name,
                    placeholder: '',
                    value: data.staff.staff1.data5.date,
                    timeout: entry.max
                });

                decorate.el.input.getValue({
                    title: data.additionalData.data6DateTime.name,
                    placeholder: '',
                    value: data.staff.staff1.data6.date,
                    timeout: entry.max
                });
            });

            describe('Фотография', () => {
                decorate.el.photography.imageStaff({
                    timeout: entry.max
                });
            });
        });

        describe('Проверка данных "Изображения"', () => {
            describe('Открытие информации "Изображения"', () => {
                decorate.el.simpleCell.handler({
                    name: 'Изображения',
                    timeout: entry.max
                });
                decorate.el.simpleCell.active({
                    name: 'Изображения',
                    timeout: entry.max
                });
            });
            describe('Проверка дополнительного поля изображения', () => {
                decorate.el.photography.noImageAdditional({
                    number: 1,
                    timeout: entry.max
                });
                decorate.el.photography.getAdditionalName({
                    number: 1,
                    value: data.staff.staff1.data2
                });
            });
        });

        describe('Проверка данных "Планировщик"', () => {
            describe('Открытие информации "Планировщик"', () => {
                decorate.el.simpleCell.handler({
                    name: 'Планировщик',
                    timeout: entry.max
                });
                decorate.el.simpleCell.active({
                    name: 'Планировщик',
                    timeout: entry.max
                });
            });
            describe('Проверка строки 1', () => {
                decorate.el.table.cellGetText({
                    headTitle: 'Учетные данные',
                    strNumber: 1,
                    cellNumber: 1,
                    value: 'Шаблон доступа',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Дата начала',
                    strNumber: 1,
                    cellNumber: 2,
                    value: data.staff.staff1.dateIn.date.substr(0, 10),
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Дата окончания',
                    strNumber: 1,
                    cellNumber: 3,
                    value: data.yesterday,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Значение',
                    strNumber: 1,
                    cellNumber: 4,
                    value: data.staff.staff1.template.template2,
                    timeout: entry.max
                });
            });
            describe('Проверка строки 2', () => {
                decorate.el.table.cellGetText({
                    headTitle: 'Учетные данные',
                    strNumber: 2,
                    cellNumber: 1,
                    value: 'Шаблон доступа',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Дата начала',
                    strNumber: 2,
                    cellNumber: 2,
                    value: data.staff.staff1.dateIn.date.substr(0, 10),
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Дата окончания',
                    strNumber: 2,
                    cellNumber: 3,
                    value: data.yesterday,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Значение',
                    strNumber: 2,
                    cellNumber: 4,
                    value: data.staff.staff1.template.template1,
                    timeout: entry.max
                });
            });
            describe('Проверка строки 3', () => {
                decorate.el.table.cellGetText({
                    headTitle: 'Учетные данные',
                    strNumber: 3,
                    cellNumber: 1,
                    value: 'График работы',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Дата начала',
                    strNumber: 3,
                    cellNumber: 2,
                    value: data.staff.staff1.dateIn.date.substr(0, 10),
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Дата окончания',
                    strNumber: 3,
                    cellNumber: 3,
                    value: data.yesterday,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Значение',
                    strNumber: 3,
                    cellNumber: 4,
                    value: data.staff.staff1.schedule,
                    timeout: entry.max
                });
            });
            describe('Проверка строки 4', () => {
                decorate.el.table.cellGetText({
                    headTitle: 'Учетные данные',
                    strNumber: 4,
                    cellNumber: 1,
                    value: 'Должность',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Дата начала',
                    strNumber: 4,
                    cellNumber: 2,
                    value: data.staff.staff1.dateIn.date.substr(0, 10),
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Дата окончания',
                    strNumber: 4,
                    cellNumber: 3,
                    value: '',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Значение',
                    strNumber: 4,
                    cellNumber: 4,
                    value: data.staff.staff1.position,
                    timeout: entry.max
                });
            });
            describe('Проверка строки 5', () => {
                decorate.el.table.cellGetText({
                    headTitle: 'Учетные данные',
                    strNumber: 5,
                    cellNumber: 1,
                    value: 'Подразделение',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Дата начала',
                    strNumber: 5,
                    cellNumber: 2,
                    value: data.staff.staff1.dateIn.date.substr(0, 10),
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Дата окончания',
                    strNumber: 5,
                    cellNumber: 3,
                    value: '',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Значение',
                    strNumber: 5,
                    cellNumber: 4,
                    value: data.staff.staff1.division,
                    timeout: entry.max
                });
            });
        });

        describe('Проверка данных "Оправдательные документы"', () => {
            decorate.el.simpleCell.handler({
                name: 'Оправдательные документы',
                timeout: entry.max
            });
            decorate.el.simpleCell.active({
                name: 'Оправдательные документы',
                timeout: entry.max
            });
            decorate.el.rowEmpty.getText({
                value: 'Нет данных для отображения',
                timeout: entry.max
            });
        });

        describe('Проверка данных "Документы"', () => {
            decorate.el.simpleCell.handler({
                name: 'Документы',
                timeout: entry.max
            });
            decorate.el.simpleCell.active({
                name: 'Документы',
                timeout: entry.max
            });
            decorate.el.rowEmpty.getText({
                value: 'Нет данных для отображения',
                timeout: entry.max
            });
        });

        describe('Проверка данных "Карта доступа"', () => {
            describe('Открытие информации "Карта доступа"', () => {
                decorate.el.simpleCell.handler({
                    name: 'Карта доступа',
                    timeout: entry.max
                });
                decorate.el.simpleCell.active({
                    name: 'Карта доступа',
                    timeout: entry.max
                });
            });

            describe(`Проверка идентификатора "Основная карта" ${data.staff.staff1.card.card1}`, () => {
                decorate.el.input.getValue({
                    title: 'Идентификатор',
                    placeholder: '',
                    value: '',
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

            describe('Проверка штрикода', () => {
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

            data.staff.staff1.ts.arrTS.forEach((obj, index) => {
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

        describe('Нажатие кнопки "Вернуться к списку сотрудников".', () => {
            decorate.el.button.handler({
                name: 'Вернуться к списку сотрудников',
                timeout: entry.max
            });
            decorate.modalConfirm.staffReturn.init({
                timeout: entry.max
            });
            decorate.el.button.handler({
                name: 'Подтвердить',
                timeout: entry.max
            });
            decorate.page.staffDimissed.init({
                timeout: entry.max
            });
        });
    });

    const printCardStaffDimissedMaxParams = () => describe('Персонал / Сотрудники - вкладка - Уволенные. ' +
        'Проверка "Печать карточки сотрудника".', () => {
        befDismissed();
        aft();

        describe('Открытие модального окна "Печать карточки сотрудника"', () => {
            decorate.el.table.strHandler({
                strNumber: 1,
                timeout: entry.max
            });
            decorate.el.butIcBefore.handler({
                icon: but.menu,
                timeout: entry.max
            });
            it('Ожидание 2 секунды', async () => await page.base.loading(2000));
            decorate.el.menu.handler({
                name: 'Печать карточки сотрудника',
                timeout: entry.max
            });
            decorate.modal.printCardStaff.init({
                timeout: entry.max
            });
        });

        describe('Отключение отображения Фамилии', () => {
            decorate.modal.printCardStaff.lastName({
                title: 'Фамилия',
                name: data.staff.staff1.lastName,
                timeout: entry.max
            });
            decorate.el.checkbox.handler({
                name: 'Фамилия',
                timeout: entry.max
            });
            decorate.modal.printCardStaff.noLastName({
                title: 'Фамилия',
                name: data.staff.staff1.lastName,
                timeout: entry.max
            });
        });

        describe('Включение отображения Фамилии', () => {
            decorate.modal.printCardStaff.noLastName({
                title: 'Фамилия',
                name: data.staff.staff1.lastName,
                timeout: entry.max
            });
            decorate.el.checkbox.handler({
                name: 'Фамилия',
                timeout: entry.max
            });
            decorate.modal.printCardStaff.lastName({
                title: 'Фамилия',
                name: data.staff.staff1.lastName,
                timeout: entry.max
            });
        });

        describe('Отображение активной кнопки "Печать"', () => {
            decorate.el.button.active({
                name: 'Печать',
                timeout: entry.max
            });
        });

        describe('Закрытие модального окна "Печать карточки сотрудника"', () => {
            decorate.modal.printCardStaff.closeHandler({
                timeout: entry.max
            });
            decorate.modal.printCardStaff.initClose({
                timeout: entry.max
            });
        });
    });

    const printTableStaffDimissedMaxParams = () => describe('Персонал / Сотрудники - вкладка - Уволенные. ' +
        'Проверка печати таблицы.', () => {
        befDismissed();
        aft();

        describe('Открытие печатной формы', () => {
            decorate.el.butIcBefore.handler({
                icon: but.menu,
                timeout: entry.max
            });
            it('Ожидание 2 секунды', async () => await page.base.loading(2000));
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
                head: 'ФИО',
                str: 1,
                cell: 1,
                value: data.staff.staff1.lastName + ' ' + data.staff.staff1.firstName + ' ' + data.staff.staff1.middleName,
                timeout: entry.max
            });
            decorate.modal.printTable.cellGetText({
                head: 'Табельный номер',
                str: 1,
                cell: 2,
                value: data.staff.staff1.tabelNumber,
                timeout: entry.max
            });
            decorate.modal.printTable.cellGetText({
                head: 'Дата приема',
                str: 1,
                cell: 3,
                value: data.staff.staff1.dateBirthday.date,
                timeout: entry.max
            });
            decorate.modal.printTable.cellGetText({
                head: 'Дата увольнения',
                str: 1,
                cell: 4,
                value: data.staff.staff1.dateBirthday.date,
                timeout: entry.max
            });
            decorate.modal.printTable.cellGetText({
                head: 'Подразделение',
                str: 1,
                cell: 5,
                value: data.staff.staff1.division,
                timeout: entry.max
            });
            decorate.modal.printTable.cellGetText({
                head: 'Должность',
                str: 1,
                cell: 6,
                value: data.staff.staff1.position,
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
    });

    const exportTableStaffDimissedXLSXMaxParams = () => describe('Персонал / Сотрудники - вкладка - Уволенные. ' +
        'Проверка экспорта XLSX.', () => {
        const params = {
            nameFile: 'user.xlsx',
            json: [
                {
                    'Отчет Сотрудники (уволенные сотрудники)': "Подразделение: 'division1, division2, division3, Администраторы системы'"
                },
                {
                    'Отчет Сотрудники (уволенные сотрудники)': 'Фамилия',
                    __EMPTY: 'Имя',
                    __EMPTY_1: 'Отчество',
                    __EMPTY_2: 'Табельный номер',
                    __EMPTY_3: 'Дата приема на работу',
                    __EMPTY_4: 'Подразделение',
                    __EMPTY_5: 'Должность',
                    __EMPTY_6: 'Дата увольнения',
                    __EMPTY_7: 'Фото'
                },
                {
                    'Отчет Сотрудники (уволенные сотрудники)': 'last1',
                    __EMPTY: 'name1',
                    __EMPTY_1: 'middle1',
                    __EMPTY_2: 'tabel1',
                    __EMPTY_3: '2023-06-01',
                    __EMPTY_4: 'division1',
                    __EMPTY_5: 'position1',
                    __EMPTY_6: '2023-06-01',
                    __EMPTY_7: 'Есть'
                }
            ]
        }

        befDismissed();
        aft();

        describe('Экспорт', () => {
            decorate.el.butIcBefore.handler({
                icon: but.menu,
                timeout: entry.max
            });
            decorate.el.menu.menu({
                timeout: entry.max
            });
            it('Ожидание 2 секунды', async () => await page.base.loading(2000));
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
                json: params.json
            });
            decorate.el.file.delete({
                file: params.nameFile,
                timeout: entry.upload
            });
        });
    });

    const exportTableStaffDimissedCSVMaxParams = () => describe('Персонал / Сотрудники - вкладка - Уволенные. ' +
        'Проверка экспорта CSV.', () => {
        const params = {
            nameFile: 'user.csv',
            json:  [
                {
                    'Фамилия': 'last1',
                    'Имя': 'name1',
                    'Отчество': 'middle1',
                    'Табельный номер': 'tabel1',
                    'Дата приема на работу': 45078.12519675926,
                    'Подразделение': 'division1',
                    'Должность': 'position1',
                    'Дата увольнения': 45078.12519675926,
                    'Фото': 'Есть'
                }
            ]
        }

        befDismissed();
        aft();

        describe('Экспорт', () => {
            decorate.el.butIcBefore.handler({
                icon: but.menu,
                timeout: entry.max
            });
            decorate.el.menu.menu({
                timeout: entry.max
            });
            it('Ожидание 2 секунды', async () => await page.base.loading(2000));
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
                json: params.json
            });
            decorate.el.file.delete({
                file: params.nameFile,
                timeout: entry.upload
            });
        });
    });

    const restoreStaffDimissedEditParamsMaxParams = () => describe('Персонал / Сотрудники - вкладка - Уволенные. ' +
        'Восстановление сотрудника с редактированием всех параметров.', () => {

        describe('Восстановление сотрудника', () => {

            befDismissed();
            aft();

            describe('Открытие страницы на редактирование и восстановление', () => {
                decorate.el.table.strHandler({
                    strNumber: 1,
                    timeout: entry.max
                });
                decorate.el.button.handler({
                    name: 'Восстановить сотрудника',
                    timeout: entry.max
                });
                it('Ожидание 2 секунды', async () => await  page.base.loading(2000));
                decorate.el.menu.menu({
                    timeout: entry.max
                });
                decorate.el.menu.handler({
                    name: 'Редактировать и восстановить',
                    timeout: entry.max
                });
                decorate.page.staffChange.initEdit({
                    timeout: entry.max
                });
            });

            describe('Редактирование', () => {
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
                            value: data.staff.staff2.lastName,
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
                            value: data.staff.staff2.firstName,
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
                            value: data.staff.staff2.middleName,
                            timeout: entry.max
                        });

                        decorate.el.input.backSpace({
                            title: 'Номер телефона',
                            placeholder: 'Номер телефона',
                            timeout: entry.max
                        });
                        decorate.el.input.sendKeys({
                            title: 'Номер телефона',
                            placeholder: 'Номер телефона',
                            value: data.staff.staff2.phone,
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
                            value: data.staff.staff2.mail,
                            timeout: entry.max
                        });

                        decorate.el.input.iconCalendar({
                            title: 'Дата рождения',
                            placeholder: 'Дата рождения',
                            timeout: entry.max
                        });
                        decorate.el.datepicker.dateParse({
                            day: data.staff.staff2.dateBirthday.day,
                            month: data.staff.staff2.dateBirthday.month,
                            year: data.staff.staff2.dateBirthday.year,
                            scrollYear: -500,
                            timeout: entry.max
                        });
                    });

                    describe('Учетные данные', () => {
                        decorate.el.input.backSpace({
                            title: 'Табельный номер',
                            placeholder: 'Табельный номер',
                            timeout: entry.max
                        });
                        decorate.el.input.sendKeys({
                            title: 'Табельный номер',
                            placeholder: 'Табельный номер',
                            value: data.staff.staff2.tabelNumber,
                            timeout: entry.max
                        });

                        decorate.el.input.iconCalendar({
                            title: 'Дата приема',
                            placeholder: 'Дата приема',
                            timeout: entry.max
                        });
                        decorate.el.datepicker.dateParse({
                            day: data.staff.staff2.date.day,
                            month: data.staff.staff2.date.month,
                            year: data.staff.staff2.date.year,
                            scrollYear: -500,
                            timeout: entry.max
                        });

                        decorate.el.input.iconCalendar({
                            title: 'Действует с',
                            placeholder: 'Действует с',
                            timeout: entry.max
                        });
                        decorate.el.datepicker.date({
                            day: data.staff.staff2.dateIn.day,
                            month: data.staff.staff2.dateIn.month,
                            year: data.staff.staff2.dateIn.year,
                            scrollYear: -500,
                            timeout: entry.max
                        });

                        decorate.el.selectInput.iconXpand({
                            title: 'Подразделение',
                            placeholder: 'Подразделение',
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
                            title: 'Подразделение',
                            placeholder: 'Подразделение',
                            timeout: entry.max
                        });
                        decorate.modal.divisionFilter.init({
                            timeout: entry.max
                        });
                        decorate.el.filterTreeNode.handler({
                            name: data.staff.staff2.division,
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
                            title: 'Должность',
                            placeholder: 'Должность',
                            timeout: entry.max
                        });
                        decorate.el.selectXpand.xpand({
                            timeout: entry.max
                        });
                        decorate.el.selectXpand.handler({
                            value: data.staff.staff2.position,
                            timeout: entry.max
                        });
                        decorate.el.selectXpand.xpandNoElement({
                            timeout: entry.max
                        });

                        decorate.el.input.iconCalendar({
                            title: 'Действует до',
                            placeholder: 'Действует до',
                            timeout: entry.max
                        });
                        decorate.el.datepicker.date({
                            day: data.staff.staff2.dateAfter.day,
                            month: data.staff.staff2.dateAfter.month,
                            year: data.staff.staff2.dateAfter.year,
                            scrollYear: -500,
                            timeout: entry.max
                        });

                        decorate.el.selectInput.iconXpand({
                            title: 'График работы',
                            placeholder: 'График работы',
                            timeout: entry.max
                        });
                        decorate.el.selectXpand.xpand({
                            timeout: entry.max
                        });
                        decorate.el.selectXpand.handler({
                            value: data.staff.staff2.schedule,
                            timeout: entry.max
                        });
                        decorate.el.selectXpand.xpandNoElement({
                            timeout: entry.max
                        });

                        decorate.el.selectMulti.iconXpand({
                            title: 'Шаблон доступа',
                            placeholder: 'Шаблон доступа',
                            timeout: entry.max
                        });
                        decorate.el.selectXpand.xpand({
                            timeout: entry.max
                        });
                        decorate.el.selectXpand.handler({
                            value: data.staff.staff2.template.template1,
                            timeout: entry.max
                        });
                        decorate.el.selectXpand.xpandNoElement({
                            timeout: entry.max
                        });

                        decorate.el.selectMulti.iconOutline({
                            title: 'Шаблон доступа',
                            placeholder: 'Шаблон доступа',
                            timeout: entry.max
                        });
                        decorate.modal.accessTemplate.init({
                            timeout: entry.max
                        });
                        decorate.el.groupCell.handler({
                            name: data.staff.staff2.template.template2,
                            timeout: entry.max
                        });
                        decorate.el.groupCell.active({
                            name: data.staff.staff2.template.template2,
                            timeout: entry.max
                        });
                        decorate.el.button.handler({
                            name: 'Применить',
                            timeout: entry.max
                        });
                        decorate.modal.accessTemplate.initClose({
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
                            value: data.staff.staff2.pinCode,
                            timeout: entry.max
                        });

                        decorate.el.input.backSpace({
                            title: data.additionalData.data1Text.name,
                            placeholder: '',
                            timeout: entry.max
                        });
                        decorate.el.input.sendKeys({
                            title: data.additionalData.data1Text.name,
                            placeholder: '',
                            value: data.staff.staff2.data1,
                            timeout: entry.max
                        });

                        decorate.el.select.iconXpand({
                            title: data.additionalData.data3Select.name,
                            value: data.staff.staff1.data3,
                            text: data.staff.staff2.data3,
                            timeout: entry.max
                        });

                        decorate.el.select.iconXpand({
                            title: data.additionalData.data4Checkbox.name,
                            value: data.staff.staff1.data4,
                            text: data.staff.staff2.data4,
                            timeout: entry.max
                        });

                        decorate.el.input.iconCalendar({
                            title: data.additionalData.data5Date.name,
                            placeholder: '',
                            timeout: entry.max
                        });
                        decorate.el.datepicker.dateParse({
                            day: data.staff.staff2.data5.day,
                            month: data.staff.staff2.data5.month,
                            year: data.staff.staff2.data5.year,
                            scrollYear: -500,
                            timeout: entry.max
                        });

                        decorate.el.input.iconCalendar({
                            title: data.additionalData.data6DateTime.name,
                            placeholder: '',
                            timeout: entry.max
                        });
                        decorate.el.datepicker.date({
                            day: data.staff.staff2.data6.day,
                            month: data.staff.staff2.data6.month,
                            year: data.staff.staff2.data6.year,
                            scrollYear: -500,
                            timeout: entry.max
                        });
                    });

                    describe('Фотография', () => {
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
                        decorate.el.photography.imageStaff({
                            timeout: entry.max
                        });
                    });
                });

                describe('Изменение данных "Изображения"', () => {
                    describe('Открытие информации "Изображения"', () => {
                        decorate.el.simpleCell.handler({
                            name: 'Изображения',
                            timeout: entry.max
                        });
                        decorate.el.simpleCell.active({
                            name: 'Изображения',
                            timeout: entry.max
                        });
                    });
                    describe('Добавление изображения', () => {
                        decorate.el.photography.addImageAdditional({
                            name: 'Загрузить фотографию',
                            number: 1,
                            timeout: entry.max
                        });
                        decorate.modal.addPhoto.init({
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
                        decorate.el.photography.imageAdditional({
                            number: 1,
                            timeout: entry.max
                        });
                    });
                });

                describe('Изменение данных в "Планировщик"', () => {
                    describe('Открытие информации "Планировщик"', () => {
                        decorate.el.simpleCell.handler({
                            name: 'Планировщик',
                            timeout: entry.max
                        });
                        decorate.el.simpleCell.active({
                            name: 'Планировщик',
                            timeout: entry.max
                        });
                    });
                    describe('Добавление строки "Блокировка"', () => {
                        decorate.el.button.handler({
                            name: 'Добавить запись',
                            timeout: entry.max
                        });
                        decorate.modal.planner.init({
                            timeout: entry.max
                        });
                        decorate.el.select.iconXpand({
                            title: 'Тип задания',
                            value: 'Подразделение',
                            text: 'Блокировка',
                            timeout: entry.max
                        });
                        decorate.el.checkbox.handler({
                            name: 'Блокировать сотрудника',
                            timeout: entry.max
                        });
                        decorate.el.checkbox.checked({
                            name: 'Блокировать сотрудника',
                            timeout: entry.max
                        });
                        decorate.el.button.handler({
                            name: 'Сохранить',
                            timeout: entry.max
                        });
                        decorate.modal.planner.initClose({
                            timeout: entry.max
                        });
                    });
                });

                describe('Изменение "Оправдательные документы"', () => {
                    describe('Открытие информации "Оправдательные документы"', () => {
                        decorate.el.simpleCell.handler({
                            name: 'Оправдательные документы',
                            timeout: entry.max
                        });
                        decorate.el.simpleCell.active({
                            name: 'Оправдательные документы',
                            timeout: entry.max
                        });
                    });
                    describe('Добавить документ', () => {
                        decorate.el.button.handler({
                            name: 'Добавить запись',
                            timeout: entry.max
                        });
                        decorate.modal.documentSupport.init({
                            timeout: entry.max
                        });
                        decorate.el.input.sendKeys({
                            title: 'Номер документа',
                            placeholder: '',
                            value: data.staff.staff2.documentSupport.number,
                            timeout: entry.max
                        });
                        decorate.el.select.iconXpand({
                            title: 'Тип документа',
                            value: 'Оправдательный',
                            text: 'Оправдательный',
                            timeout: entry.max
                        });
                        decorate.el.selectInput.iconXpand({
                            title: 'Код / наименование',
                            placeholder: '',
                            timeout: entry.max
                        });
                        decorate.el.selectXpand.xpand({
                            timeout: entry.max
                        });
                        decorate.el.selectXpand.handler({
                            value: data.staff.staff2.documentSupport.name,
                            timeout: entry.max
                        });
                        decorate.el.selectXpand.xpandNoElement({
                            timeout: entry.max
                        });
                        decorate.el.button.handler({
                            name: 'Сохранить',
                            timeout: entry.max
                        });
                        decorate.modal.documentSupport.initClose({
                            timeout: entry.max
                        });
                    });
                });

                describe('Изменение "Документы"', () => {
                    describe('Открытие информации "Документы"', () => {
                        decorate.el.simpleCell.handler({
                            name: 'Документы',
                            timeout: entry.max
                        });
                        decorate.el.simpleCell.active({
                            name: 'Документы',
                            timeout: entry.max
                        });
                    });

                    describe('Добавление паспорта', () => {
                        decorate.el.button.handler({
                            name: 'Добавить запись',
                            timeout: entry.max
                        });
                        decorate.modal.documentStaff.init({
                            timeout: entry.max
                        });
                        decorate.el.select.iconXpand({
                            title: 'Тип документа',
                            value: 'Паспорт',
                            text: data.staff.staff2.passport.type,
                            timeout: entry.max
                        });
                        decorate.el.input.sendKeys({
                            title: 'Серия',
                            placeholder: '',
                            value: data.staff.staff2.passport.series,
                            timeout: entry.max
                        });
                        decorate.el.input.sendKeys({
                            title: 'Номер',
                            placeholder: '',
                            value: data.staff.staff2.passport.number,
                            timeout: entry.max
                        });
                        decorate.el.input.sendKeys({
                            title: 'Место рождения',
                            placeholder: '',
                            value: data.staff.staff2.passport.birthplace,
                            timeout: entry.max
                        });
                        decorate.el.input.sendKeys({
                            title: 'Кем выдан',
                            placeholder: '',
                            value: data.staff.staff2.passport.issue,
                            timeout: entry.max
                        });
                        decorate.el.input.iconCalendar({
                            title: 'Дата выдачи',
                            placeholder: '',
                            timeout: entry.max
                        });
                        decorate.el.datepicker.dateParse({
                            day: data.staff.staff2.passport.dateIn.day,
                            month: data.staff.staff2.passport.dateIn.month,
                            year: data.staff.staff2.passport.dateIn.year,
                            scrollYear: -500,
                            timeout: entry.max
                        });
                        decorate.el.input.iconCalendar({
                            title: 'Дата окончания действия документа',
                            placeholder: '',
                            timeout: entry.max
                        });
                        decorate.el.datepicker.dateParse({
                            day: data.staff.staff2.passport.dateOut.day,
                            month: data.staff.staff2.passport.dateOut.month,
                            year: data.staff.staff2.passport.dateOut.year,
                            scrollYear: -500,
                            timeout: entry.max
                        });
                        decorate.el.input.sendKeys({
                            title: 'Код подразделения',
                            placeholder: '',
                            value: data.staff.staff2.passport.code,
                            timeout: entry.max
                        });
                        decorate.el.select.iconXpand({
                            title: 'Пол',
                            value: '',
                            text: data.staff.staff2.passport.gender,
                            timeout: entry.max
                        });
                        decorate.el.button.handler({
                            name: 'Сохранить',
                            timeout: entry.max
                        });
                        decorate.modal.documentStaff.initClose({
                            timeout: entry.max
                        });
                    });
                });

                describe('Изменение данных "Карта доступа"', () => {
                    describe('Открытие информации "Карта доступа"', () => {
                        decorate.el.simpleCell.handler({
                            name: 'Карта доступа',
                            timeout: entry.max
                        });
                        decorate.el.simpleCell.active({
                            name: 'Карта доступа',
                            timeout: entry.max
                        });
                    });

                    describe(`Добавление идентификатора "Основная карта"`, () => {
                        decorate.el.input.iconCard({
                            title: 'Идентификатор',
                            placeholder: '',
                            timeout: entry.max
                        });
                        decorate.modal.cardControlsAdd.init({
                            timeout: entry.max
                        });
                        decorate.modal.cardControlsNumber.inputSendKeys({
                            title: 'Идентификатор карты',
                            placeholder: '',
                            value: data.staff.staff2.card.card1,
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

                    data.staff.staff2.card.arr.forEach((card, index) => {
                        describe(`Добавление идентификатора "Дополнительные карта"`, () => {
                            decorate.page.staffChange.addCardButtonHandler({
                                timeout: entry.max
                            });
                            decorate.page.staffChange.addCardAdditional({
                                cardNumber: index + 1,
                                timeout: entry.max
                            });
                            decorate.modal.cardControlsAdd.init({
                                timeout: entry.max
                            });
                            decorate.modal.cardControlsNumber.inputSendKeys({
                                title: 'Идентификатор карты',
                                placeholder: '',
                                value: card,
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

                    describe('Ввод штрихкода', () => {
                        decorate.el.input.sendKeys({
                            title: '',
                            placeholder: '',
                            value: data.staff.staff2.barcode,
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

                    data.staff.staff2.ts.arrTS.forEach((obj, index) => {
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
            });

            describe('Сохранение сотрудника', () => {
                decorate.el.button.handler({
                    name: 'Сохранить изменения',
                    timeout: entry.max
                });
                decorate.el.success.success({
                    text: 'Данные успешно изменены',
                    timeout: entry.max
                });
                decorate.el.button.handler({
                    name: 'Вернуться к списку сотрудников',
                    timeout: entry.max
                });
                decorate.page.staffDimissed.init({
                    timeout: entry.max
                });
                decorate.el.table.noStr({
                    timeout: entry.max
                });
            });
        });

        describe('Проверка', () => {
            befActive();
            aft();

            describe('Персонал / Сотрудники - вкладка - Действующие. Проверка таблицы.', () => {
                decorate.el.table.size({
                    strCount: 1,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'ФИО',
                    strNumber: 1,
                    cellNumber: 2,
                    value: data.staff.staff2.lastName + ' ' + data.staff.staff2.firstName + ' ' + data.staff.staff2.middleName,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Табельный номер',
                    strNumber: 1,
                    cellNumber: 3,
                    value: data.staff.staff2.tabelNumber,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Дата приема',
                    strNumber: 1,
                    cellNumber: 4,
                    value: data.staff.staff2.dateIn.date.substr(0, 10),
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Карта',
                    strNumber: 1,
                    cellNumber: 5,
                    value: '10 карт',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Штрихкод',
                    strNumber: 1,
                    cellNumber: 6,
                    value: data.staff.staff2.barcode,
                    timeout: entry.max
                });
                decorate.el.table.cellGetIconLock({
                    strNumber: 1,
                    cellNumber: 7,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Подразделение',
                    strNumber: 1,
                    cellNumber: 8,
                    value: data.staff.staff2.division,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Должность',
                    strNumber: 1,
                    cellNumber: 9,
                    value: data.staff.staff2.position,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'График работы',
                    strNumber: 1,
                    cellNumber: 10,
                    value: data.staff.staff2.schedule,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Шаблон доступа',
                    strNumber: 1,
                    cellNumber: 11,
                    value: '2 шаблона доступа',
                    timeout: entry.max
                });
                decorate.el.table.cellImg({
                    headTitle: 'Фотография',
                    strNumber: 1,
                    cellNumber: 12,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Транспортное средство',
                    strNumber: 1,
                    cellNumber: 13,
                    value: data.staff.staff2.ts.arrTS.map(obj => obj.number + ' ' + obj.model).join(';'),
                    timeout: entry.max
                });
            });

            describe('Персонал / Сотрудники - вкладка - Действующие. Проверка параметров.', () => {
                describe('Открытие карточки сотрудника на просмотр', () => {
                    decorate.el.table.strHandler({
                        strNumber: 1,
                        timeout: entry.max
                    });
                    decorate.el.butIcBefore.handler({
                        icon: but.edit,
                        timeout: entry.max
                    });
                    decorate.page.staffChange.initEdit({
                        timeout: entry.max
                    });
                });

                describe('Проверка данных "Общая информация"', () => {
                    describe('Основная информация', () => {
                        decorate.el.input.getValue({
                            title: 'Фамилия',
                            placeholder: 'Фамилия',
                            value: data.staff.staff2.lastName,
                            timeout: entry.max
                        });
                        decorate.el.input.getValue({
                            title: 'Имя',
                            placeholder: 'Имя',
                            value: data.staff.staff2.firstName,
                            timeout: entry.max
                        });
                        decorate.el.input.getValue({
                            title: 'Отчество',
                            placeholder: 'Отчество',
                            value: data.staff.staff2.middleName,
                            timeout: entry.max
                        });
                        decorate.el.input.getValue({
                            title: 'Номер телефона',
                            placeholder: 'Номер телефона',
                            value: data.staff.staff2.phone,
                            timeout: entry.max
                        });
                        decorate.el.input.getValue({
                            title: 'E-Mail',
                            placeholder: 'E-Mail',
                            value: data.staff.staff2.mail,
                            timeout: entry.max
                        });
                        decorate.el.input.getValue({
                            title: 'Дата рождения',
                            placeholder: 'Дата рождения',
                            value: data.staff.staff2.dateBirthday.date,
                            timeout: entry.max
                        });
                    });

                    describe('Учетные данные', () => {
                        decorate.el.input.getValue({
                            title: 'Табельный номер',
                            placeholder: 'Табельный номер',
                            value: data.staff.staff2.tabelNumber,
                            timeout: entry.max
                        });
                        decorate.el.input.getValue({
                            title: 'Дата приема',
                            placeholder: 'Дата приема',
                            value: data.staff.staff2.date.date,
                            timeout: entry.max
                        });
                        decorate.el.input.getValue({
                            title: 'Действует с',
                            placeholder: 'Действует с',
                            value: data.staff.staff2.dateIn.date,
                            timeout: entry.max
                        });
                        decorate.el.input.getValue({
                            title: 'Подразделение',
                            placeholder: 'Подразделение',
                            value: data.staff.staff2.division,
                            timeout: entry.max
                        });
                        decorate.el.input.getValue({
                            title: 'Должность',
                            placeholder: 'Должность',
                            value: data.staff.staff2.position,
                            timeout: entry.max
                        });
                        decorate.el.input.getValue({
                            title: 'Действует до',
                            placeholder: 'Действует до',
                            value: data.staff.staff2.dateAfter.date,
                            timeout: entry.max
                        });
                        decorate.el.input.getValue({
                            title: 'График работы',
                            placeholder: 'График работы',
                            value: data.staff.staff2.schedule,
                            timeout: entry.max
                        });
                        decorate.el.selectMulti.getText({
                            title: 'Шаблон доступа',
                            valueNumber: 1,
                            value: data.staff.staff2.template.template1,
                            timeout: entry.max
                        });
                        decorate.el.selectMulti.getText({
                            title: 'Шаблон доступа',
                            valueNumber: 2,
                            value: data.staff.staff2.template.template2,
                            timeout: entry.max
                        });
                    });

                    describe('Дополнительные поля', () => {
                        decorate.el.input.getValue({
                            title: 'Пин-код',
                            placeholder: '',
                            value: data.staff.staff2.pinCode,
                            timeout: entry.max
                        });
                        decorate.el.input.getValue({
                            title: data.additionalData.data1Text.name,
                            placeholder: '',
                            value: data.staff.staff2.data1,
                            timeout: entry.max
                        });
                        decorate.el.select.getText({
                            title: data.additionalData.data3Select.name,
                            value: data.staff.staff2.data3,
                            timeout: entry.max
                        });
                        decorate.el.select.getText({
                            title: data.additionalData.data4Checkbox.name,
                            value: data.staff.staff2.data4,
                            timeout: entry.max
                        });
                        decorate.el.input.getValue({
                            title: data.additionalData.data5Date.name,
                            placeholder: '',
                            value: data.staff.staff2.data5.date,
                            timeout: entry.max
                        });
                        decorate.el.input.getValue({
                            title: data.additionalData.data6DateTime.name,
                            placeholder: '',
                            value: data.staff.staff2.data6.date,
                            timeout: entry.max
                        });
                    });

                    describe('Фотография', () => {
                        decorate.el.photography.imageStaff({
                            timeout: entry.max
                        });
                    });
                });

                describe('Проверка данных "Изображения"', () => {
                    describe('Открытие информации "Изображения"', () => {
                        decorate.el.simpleCell.handler({
                            name: 'Изображения',
                            timeout: entry.max
                        });
                        decorate.el.simpleCell.active({
                            name: 'Изображения',
                            timeout: entry.max
                        });
                    });

                    describe('Проверка дополнительного поля изображения', () => {
                        decorate.el.photography.imageAdditional({
                            number: 1,
                            timeout: entry.max
                        });
                        decorate.el.photography.getAdditionalName({
                            number: 1,
                            value: data.staff.staff2.data2
                        });
                    });
                });

                describe('Проверка данных "Планировщик"', () => {
                    describe('Открытие информации "Планировщик"', () => {
                        decorate.el.simpleCell.handler({
                            name: 'Планировщик',
                            timeout: entry.max
                        });
                        decorate.el.simpleCell.active({
                            name: 'Планировщик',
                            timeout: entry.max
                        });
                    });

                    describe('Проверка строки 1', () => {
                        decorate.el.table.cellGetText({
                            headTitle: 'Учетные данные',
                            strNumber: 1,
                            cellNumber: 1,
                            value: 'Шаблон доступа',
                            timeout: entry.max
                        });
                        decorate.el.table.cellGetText({
                            headTitle: 'Дата начала',
                            strNumber: 1,
                            cellNumber: 2,
                            value: data.today,
                            timeout: entry.max
                        });
                        decorate.el.table.cellGetText({
                            headTitle: 'Дата окончания',
                            strNumber: 1,
                            cellNumber: 3,
                            value: '',
                            timeout: entry.max
                        });
                        decorate.el.table.cellGetText({
                            headTitle: 'Значение',
                            strNumber: 1,
                            cellNumber: 4,
                            value: data.staff.staff2.template.template2,
                            timeout: entry.max
                        });
                    });

                    describe('Проверка строки 2', () => {
                        decorate.el.table.cellGetText({
                            headTitle: 'Учетные данные',
                            strNumber: 2,
                            cellNumber: 1,
                            value: 'Шаблон доступа',
                            timeout: entry.max
                        });
                        decorate.el.table.cellGetText({
                            headTitle: 'Дата начала',
                            strNumber: 2,
                            cellNumber: 2,
                            value: data.today,
                            timeout: entry.max
                        });
                        decorate.el.table.cellGetText({
                            headTitle: 'Дата окончания',
                            strNumber: 2,
                            cellNumber: 3,
                            value: '',
                            timeout: entry.max
                        });
                        decorate.el.table.cellGetText({
                            headTitle: 'Значение',
                            strNumber: 2,
                            cellNumber: 4,
                            value: data.staff.staff2.template.template1,
                            timeout: entry.max
                        });
                    });

                    describe('Проверка строки 3', () => {
                        decorate.el.table.cellGetText({
                            headTitle: 'Учетные данные',
                            strNumber: 3,
                            cellNumber: 1,
                            value: 'График работы',
                            timeout: entry.max
                        });
                        decorate.el.table.cellGetText({
                            headTitle: 'Дата начала',
                            strNumber: 3,
                            cellNumber: 2,
                            value: data.staff.staff2.dateIn.date.substr(0, 10),
                            timeout: entry.max
                        });
                        decorate.el.table.cellGetText({
                            headTitle: 'Дата окончания',
                            strNumber: 3,
                            cellNumber: 3,
                            value: '',
                            timeout: entry.max
                        });
                        decorate.el.table.cellGetText({
                            headTitle: 'Значение',
                            strNumber: 3,
                            cellNumber: 4,
                            value: data.staff.staff2.schedule,
                            timeout: entry.max
                        });
                    });

                    describe('Проверка строки 4', () => {
                        decorate.el.table.cellGetText({
                            headTitle: 'Учетные данные',
                            strNumber: 4,
                            cellNumber: 1,
                            value: 'Должность',
                            timeout: entry.max
                        });
                        decorate.el.table.cellGetText({
                            headTitle: 'Дата начала',
                            strNumber: 4,
                            cellNumber: 2,
                            value: data.staff.staff2.dateIn.date.substr(0, 10),
                            timeout: entry.max
                        });
                        decorate.el.table.cellGetText({
                            headTitle: 'Дата окончания',
                            strNumber: 4,
                            cellNumber: 3,
                            value: '',
                            timeout: entry.max
                        });
                        decorate.el.table.cellGetText({
                            headTitle: 'Значение',
                            strNumber: 4,
                            cellNumber: 4,
                            value: data.staff.staff2.position,
                            timeout: entry.max
                        });
                    });

                    describe('Проверка строки 5', () => {
                        decorate.el.table.cellGetText({
                            headTitle: 'Учетные данные',
                            strNumber: 5,
                            cellNumber: 1,
                            value: 'Подразделение',
                            timeout: entry.max
                        });
                        decorate.el.table.cellGetText({
                            headTitle: 'Дата начала',
                            strNumber: 5,
                            cellNumber: 2,
                            value: data.staff.staff2.dateIn.date.substr(0, 10),
                            timeout: entry.max
                        });
                        decorate.el.table.cellGetText({
                            headTitle: 'Дата окончания',
                            strNumber: 5,
                            cellNumber: 3,
                            value: '',
                            timeout: entry.max
                        });
                        decorate.el.table.cellGetText({
                            headTitle: 'Значение',
                            strNumber: 5,
                            cellNumber: 4,
                            value: data.staff.staff2.division,
                            timeout: entry.max
                        });
                    });

                    describe('Проверка строки 6', () => {
                        decorate.el.table.cellGetText({
                            headTitle: 'Учетные данные',
                            strNumber: 6,
                            cellNumber: 1,
                            value: 'Блокировка',
                            timeout: entry.max
                        });
                        decorate.el.table.cellGetText({
                            headTitle: 'Дата начала',
                            strNumber: 6,
                            cellNumber: 2,
                            value: data.today,
                            timeout: entry.max
                        });
                        decorate.el.table.cellGetText({
                            headTitle: 'Дата окончания',
                            strNumber: 6,
                            cellNumber: 3,
                            value: data.today,
                            timeout: entry.max
                        });
                        decorate.el.table.cellGetText({
                            headTitle: 'Значение',
                            strNumber: 6,
                            cellNumber: 4,
                            value: 'Заблокирована карта',
                            timeout: entry.max
                        });
                    });

                    describe('Проверка строки 7', () => {
                        decorate.el.table.cellGetText({
                            headTitle: 'Учетные данные',
                            strNumber: 7,
                            cellNumber: 1,
                            value: 'Шаблон доступа',
                            timeout: entry.max
                        });
                        decorate.el.table.cellGetText({
                            headTitle: 'Дата начала',
                            strNumber: 7,
                            cellNumber: 2,
                            value: data.staff.staff1.dateIn.date.substr(0, 10),
                            timeout: entry.max
                        });
                        decorate.el.table.cellGetText({
                            headTitle: 'Дата окончания',
                            strNumber: 7,
                            cellNumber: 3,
                            value: data.yesterday,
                            timeout: entry.max
                        });
                        decorate.el.table.cellGetText({
                            headTitle: 'Значение',
                            strNumber: 7,
                            cellNumber: 4,
                            value: data.staff.staff1.template.template2,
                            timeout: entry.max
                        });
                    });

                    describe('Проверка строки 8', () => {
                        decorate.el.table.cellGetText({
                            headTitle: 'Учетные данные',
                            strNumber: 8,
                            cellNumber: 1,
                            value: 'Шаблон доступа',
                            timeout: entry.max
                        });
                        decorate.el.table.cellGetText({
                            headTitle: 'Дата начала',
                            strNumber: 8,
                            cellNumber: 2,
                            value: data.staff.staff1.dateIn.date.substr(0, 10),
                            timeout: entry.max
                        });
                        decorate.el.table.cellGetText({
                            headTitle: 'Дата окончания',
                            strNumber: 8,
                            cellNumber: 3,
                            value: data.yesterday,
                            timeout: entry.max
                        });
                        decorate.el.table.cellGetText({
                            headTitle: 'Значение',
                            strNumber: 8,
                            cellNumber: 4,
                            value: data.staff.staff1.template.template1,
                            timeout: entry.max
                        });
                    });

                    describe('Проверка строки 9', () => {
                        decorate.el.table.cellGetText({
                            headTitle: 'Учетные данные',
                            strNumber: 9,
                            cellNumber: 1,
                            value: 'График работы',
                            timeout: entry.max
                        });
                        decorate.el.table.cellGetText({
                            headTitle: 'Дата начала',
                            strNumber: 9,
                            cellNumber: 2,
                            value: data.staff.staff1.dateIn.date.substr(0, 10),
                            timeout: entry.max
                        });
                        decorate.el.table.cellGetText({
                            headTitle: 'Дата окончания',
                            strNumber: 9,
                            cellNumber: 3,
                            value: data.yesterday,
                            timeout: entry.max
                        });
                        decorate.el.table.cellGetText({
                            headTitle: 'Значение',
                            strNumber: 9,
                            cellNumber: 4,
                            value: data.staff.staff1.schedule,
                            timeout: entry.max
                        });
                    });

                    describe('Проверка строки 10', () => {
                        decorate.el.table.cellGetText({
                            headTitle: 'Учетные данные',
                            strNumber: 10,
                            cellNumber: 1,
                            value: 'Должность',
                            timeout: entry.max
                        });
                        decorate.el.table.cellGetText({
                            headTitle: 'Дата начала',
                            strNumber: 10,
                            cellNumber: 2,
                            value: data.staff.staff1.dateIn.date.substr(0, 10),
                            timeout: entry.max
                        });
                        decorate.el.table.cellGetText({
                            headTitle: 'Дата окончания',
                            strNumber: 10,
                            cellNumber: 3,
                            value: '',
                            timeout: entry.max
                        });
                        decorate.el.table.cellGetText({
                            headTitle: 'Значение',
                            strNumber: 10,
                            cellNumber: 4,
                            value: data.staff.staff1.position,
                            timeout: entry.max
                        });
                    });

                    describe('Проверка строки 11', () => {
                        decorate.el.table.cellGetText({
                            headTitle: 'Учетные данные',
                            strNumber: 11,
                            cellNumber: 1,
                            value: 'Подразделение',
                            timeout: entry.max
                        });
                        decorate.el.table.cellGetText({
                            headTitle: 'Дата начала',
                            strNumber: 11,
                            cellNumber: 2,
                            value: data.staff.staff1.dateIn.date.substr(0, 10),
                            timeout: entry.max
                        });
                        decorate.el.table.cellGetText({
                            headTitle: 'Дата окончания',
                            strNumber: 11,
                            cellNumber: 3,
                            value: '',
                            timeout: entry.max
                        });
                        decorate.el.table.cellGetText({
                            headTitle: 'Значение',
                            strNumber: 11,
                            cellNumber: 4,
                            value: data.staff.staff1.division,
                            timeout: entry.max
                        });
                    });
                });

                describe('Проверка данных "Оправдательные документы"', () => {
                    decorate.el.simpleCell.handler({
                        name: 'Оправдательные документы',
                        timeout: entry.max
                    });
                    decorate.el.simpleCell.active({
                        name: 'Оправдательные документы',
                        timeout: entry.max
                    });
                    decorate.el.table.cellGetText({
                        headTitle: '№',
                        strNumber: 1,
                        cellNumber: 1,
                        value: data.staff.staff2.documentSupport.number,
                        timeout: entry.max
                    });
                    decorate.el.table.cellGetText({
                        headTitle: 'Тип',
                        strNumber: 1,
                        cellNumber: 2,
                        value: 'Оправдательный',
                        timeout: entry.max
                    });
                    decorate.el.table.cellGetText({
                        headTitle: 'Наименование',
                        strNumber: 1,
                        cellNumber: 3,
                        value: data.staff.staff2.documentSupport.name,
                        timeout: entry.max
                    });
                    decorate.el.table.cellGetText({
                        headTitle: 'Продолжительность',
                        strNumber: 1,
                        cellNumber: 4,
                        value: '00:00:00',
                        timeout: entry.max
                    });
                    decorate.el.table.cellGetText({
                        headTitle: 'Дата документа',
                        strNumber: 1,
                        cellNumber: 5,
                        value: data.today,
                        timeout: entry.max
                    });
                    decorate.el.table.cellGetText({
                        headTitle: 'Начало действия',
                        strNumber: 1,
                        cellNumber: 6,
                        value: data.today,
                        timeout: entry.max
                    });
                    decorate.el.table.cellGetText({
                        headTitle: 'Конец действия',
                        strNumber: 1,
                        cellNumber: 7,
                        value: data.today,
                        timeout: entry.max
                    });
                });

                describe('Проверка данных "Документы"', () => {
                    decorate.el.simpleCell.handler({
                        name: 'Документы',
                        timeout: entry.max
                    });
                    decorate.el.simpleCell.active({
                        name: 'Документы',
                        timeout: entry.max
                    });
                    decorate.el.table.cellGetText({
                        headTitle: 'Тип документа',
                        strNumber: 1,
                        cellNumber: 1,
                        value: data.staff.staff2.passport.type,
                        timeout: entry.max
                    });
                    decorate.el.table.cellGetText({
                        headTitle: 'Серия',
                        strNumber: 1,
                        cellNumber: 2,
                        value: data.staff.staff2.passport.series,
                        timeout: entry.max
                    });
                    decorate.el.table.cellGetText({
                        headTitle: 'Номер',
                        strNumber: 1,
                        cellNumber: 3,
                        value: data.staff.staff2.passport.number,
                        timeout: entry.max
                    });
                    decorate.el.table.cellGetText({
                        headTitle: 'Кем выдан',
                        strNumber: 1,
                        cellNumber: 4,
                        value: data.staff.staff2.passport.issue,
                        timeout: entry.max
                    });
                    decorate.el.table.cellGetText({
                        headTitle: 'Дата выдачи',
                        strNumber: 1,
                        cellNumber: 5,
                        value: data.staff.staff2.passport.dateIn.date,
                        timeout: entry.max
                    });
                    decorate.el.table.cellGetText({
                        headTitle: 'Дата окончания',
                        strNumber: 1,
                        cellNumber: 6,
                        value: data.staff.staff2.passport.dateOut.date,
                        timeout: entry.max
                    });
                    decorate.el.table.cellGetText({
                        headTitle: 'Код подразделения',
                        strNumber: 1,
                        cellNumber: 7,
                        value: data.staff.staff2.passport.code,
                        timeout: entry.max
                    });
                });

                describe('Проверка данных "Карта доступа"', () => {
                    describe('Открытие информации "Карта доступа"', () => {
                        decorate.el.simpleCell.handler({
                            name: 'Карта доступа',
                            timeout: entry.max
                        });
                        decorate.el.simpleCell.active({
                            name: 'Карта доступа',
                            timeout: entry.max
                        });
                    });

                    describe(`Проверка идентификатора "Основная карта"`, () => {
                        it('Поиск идентификатора "Основная карта" в массиве идентфикаторов', async () => {
                            const card = await el.input.getValue('Идентификатор', '', entry.max);
                            const array = [...data.staff.staff2.card.arr, data.staff.staff2.card.card1];
                            const searchCard = array.includes(card.text);
                            expect(searchCard).to.equal(true);
                        });
                    });

                    describe('Проверка идентифкаторов дополнительных карт', () => {
                        [...Array(9).keys()].forEach((item, index) => {
                            it(`Проверка идентификатора "Дополнительные карта" ${index + 1}`,
                                async () => {
                                    const card = await page.staffChange.cardAdditionalValue(index + 1, entry.max);
                                    const array = [...data.staff.staff2.card.arr, data.staff.staff2.card.card1];
                                    const searchCard = array.includes(card.text);
                                    expect(searchCard).to.equal(true);
                                });
                        });
                    });
                });

                describe('Проверка данных "Штрихкод"', () => {
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

                    describe('Проверка штрикода', () => {
                        decorate.el.input.getValue({
                            title: '',
                            placeholder: '',
                            value: data.staff.staff2.barcode,
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

                    data.staff.staff2.ts.arrTS.forEach((obj, index) => {
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

                describe('Нажатие кнопки "Вернуться к списку сотрудников".', () => {
                    decorate.el.button.handler({
                        name: 'Вернуться к списку сотрудников',
                        timeout: entry.max
                    });
                    decorate.modalConfirm.staffReturn.init({
                        timeout: entry.max
                    });
                    decorate.el.button.handler({
                        name: 'Подтвердить',
                        timeout: entry.max
                    });
                    decorate.page.staffActive.init({
                        timeout: entry.max
                    });
                });
            });
        });
    });

    const editStaffMaxParams = () => describe(text + 'Редактирование сотрудника с максимальным количеством параметров.',
        () => {

        if(type === 'active') {
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
                    decorate.page.staffChange.initEdit({
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
                            value: data.staff.staff1.lastName,
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
                            value: data.staff.staff1.firstName,
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
                            value: data.staff.staff1.middleName,
                            timeout: entry.max
                        });

                        decorate.el.input.backSpace({
                            title: 'Номер телефона',
                            placeholder: 'Номер телефона',
                            timeout: entry.max
                        });
                        decorate.el.input.sendKeys({
                            title: 'Номер телефона',
                            placeholder: 'Номер телефона',
                            value: data.staff.staff1.phone,
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
                            value: data.staff.staff1.mail,
                            timeout: entry.max
                        });

                        decorate.el.input.iconCalendar({
                            title: 'Дата рождения',
                            placeholder: 'Дата рождения',
                            timeout: entry.max
                        });
                        decorate.el.datepicker.dateParse({
                            day: data.staff.staff1.dateBirthday.day,
                            month: data.staff.staff1.dateBirthday.month,
                            year: data.staff.staff1.dateBirthday.year,
                            scrollYear: -500,
                            timeout: entry.max
                        });
                    });

                    describe('Учетные данные', () => {
                        decorate.el.input.backSpace({
                            title: 'Табельный номер',
                            placeholder: 'Табельный номер',
                            timeout: entry.max
                        });
                        decorate.el.input.sendKeys({
                            title: 'Табельный номер',
                            placeholder: 'Табельный номер',
                            value: data.staff.staff1.tabelNumber,
                            timeout: entry.max
                        });

                        decorate.el.input.iconCalendar({
                            title: 'Дата приема',
                            placeholder: 'Дата приема',
                            timeout: entry.max
                        });
                        decorate.el.datepicker.dateParse({
                            day: data.staff.staff1.date.day,
                            month: data.staff.staff1.date.month,
                            year: data.staff.staff1.date.year,
                            scrollYear: -500,
                            timeout: entry.max
                        });

                        decorate.el.input.iconCalendar({
                            title: 'Действует с',
                            placeholder: 'Действует с',
                            timeout: entry.max
                        });
                        decorate.el.datepicker.date({
                            day: data.staff.staff1.dateIn.day,
                            month: data.staff.staff1.dateIn.month,
                            year: data.staff.staff1.dateIn.year,
                            scrollYear: -500,
                            timeout: entry.max
                        });

                        decorate.el.selectInput.iconXpand({
                            title: 'Подразделение',
                            placeholder: 'Подразделение',
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
                            title: 'Подразделение',
                            placeholder: 'Подразделение',
                            timeout: entry.max
                        });
                        decorate.modal.divisionFilter.init({
                            timeout: entry.max
                        });
                        decorate.el.filterTreeNode.handler({
                            name: data.staff.staff1.division,
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
                            title: 'Должность',
                            placeholder: 'Должность',
                            timeout: entry.max
                        });
                        decorate.el.selectXpand.xpand({
                            timeout: entry.max
                        });
                        decorate.el.selectXpand.handler({
                            value: data.staff.staff1.position,
                            timeout: entry.max
                        });
                        decorate.el.selectXpand.xpandNoElement({
                            timeout: entry.max
                        });

                        decorate.el.input.iconCalendar({
                            title: 'Действует до',
                            placeholder: 'Действует до',
                            timeout: entry.max
                        });
                        decorate.el.datepicker.date({
                            day: data.staff.staff1.dateAfter.day,
                            month: data.staff.staff1.dateAfter.month,
                            year: data.staff.staff1.dateAfter.year,
                            scrollYear: -500,
                            timeout: entry.max
                        });

                        decorate.el.selectInput.iconXpand({
                            title: 'График работы',
                            placeholder: 'График работы',
                            timeout: entry.max
                        });
                        decorate.el.selectXpand.xpand({
                            timeout: entry.max
                        });
                        decorate.el.selectXpand.handler({
                            value: data.staff.staff1.schedule,
                            timeout: entry.max
                        });
                        decorate.el.selectXpand.xpandNoElement({
                            timeout: entry.max
                        });

                        decorate.el.selectMulti.delete({
                            title: 'Шаблон доступа',
                            valueNumber: 2,
                            timeout: entry.max
                        });
                        decorate.el.selectMulti.delete({
                            title: 'Шаблон доступа',
                            valueNumber: 1,
                            timeout: entry.max
                        });

                        decorate.el.selectMulti.iconXpand({
                            title: 'Шаблон доступа',
                            placeholder: 'Шаблон доступа',
                            timeout: entry.max
                        });
                        decorate.el.selectXpand.xpand({
                            timeout: entry.max
                        });
                        decorate.el.selectXpand.handler({
                            value: data.staff.staff1.template.template1,
                            timeout: entry.max
                        });
                        decorate.el.selectXpand.xpandNoElement({
                            timeout: entry.max
                        });

                        decorate.el.selectMulti.iconOutline({
                            title: 'Шаблон доступа',
                            placeholder: 'Шаблон доступа',
                            timeout: entry.max
                        });
                        decorate.modal.accessTemplate.init({
                            timeout: entry.max
                        });
                        decorate.el.groupCell.handler({
                            name: data.staff.staff1.template.template2,
                            timeout: entry.max
                        });
                        decorate.el.groupCell.active({
                            name: data.staff.staff1.template.template2,
                            timeout: entry.max
                        });
                        decorate.el.button.handler({
                            name: 'Применить',
                            timeout: entry.max
                        });
                        decorate.modal.accessTemplate.initClose({
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
                            value: data.staff.staff1.pinCode,
                            timeout: entry.max
                        });

                        decorate.el.input.backSpace({
                            title: data.additionalData.data1Text.name,
                            placeholder: '',
                            timeout: entry.max
                        });
                        decorate.el.input.sendKeys({
                            title: data.additionalData.data1Text.name,
                            placeholder: '',
                            value: data.staff.staff1.data1,
                            timeout: entry.max
                        });

                        decorate.el.select.iconXpand({
                            title: data.additionalData.data3Select.name,
                            value: data.staff.staff2.data3,
                            text: data.staff.staff1.data3,
                            timeout: entry.max
                        });

                        decorate.el.select.iconXpand({
                            title: data.additionalData.data4Checkbox.name,
                            value: data.staff.staff2.data4,
                            text: data.staff.staff1.data4,
                            timeout: entry.max
                        });

                        decorate.el.input.iconCalendar({
                            title: data.additionalData.data5Date.name,
                            placeholder: '',
                            timeout: entry.max
                        });
                        decorate.el.datepicker.dateParse({
                            day: data.staff.staff1.data5.day,
                            month: data.staff.staff1.data5.month,
                            year: data.staff.staff1.data5.year,
                            scrollYear: -500,
                            timeout: entry.max
                        });

                        decorate.el.input.iconCalendar({
                            title: data.additionalData.data6DateTime.name,
                            placeholder: '',
                            timeout: entry.max
                        });
                        decorate.el.datepicker.date({
                            day: data.staff.staff1.data6.day,
                            month: data.staff.staff1.data6.month,
                            year: data.staff.staff1.data6.year,
                            scrollYear: -500,
                            timeout: entry.max
                        });
                    });

                    describe('Фотография', () => {
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
                        decorate.el.photography.imageStaff({
                            timeout: entry.max
                        });
                    });
                });

                describe('Проверка данных "Изображения"', () => {
                    describe('Открытие информации "Изображения"', () => {
                        decorate.el.simpleCell.handler({
                            name: 'Изображения',
                            timeout: entry.max
                        });
                        decorate.el.simpleCell.active({
                            name: 'Изображения',
                            timeout: entry.max
                        });
                        decorate.el.photography.imageAdditional({
                            number: 1,
                            timeout: entry.max
                        });
                    });
                });

                describe('Изменение данных в "Планировщик"', () => {
                    describe('Открытие информации "Планировщик"', () => {
                        decorate.el.simpleCell.handler({
                            name: 'Планировщик',
                            timeout: entry.max
                        });
                        decorate.el.simpleCell.active({
                            name: 'Планировщик',
                            timeout: entry.max
                        });
                    });
                    describe('Добавление строки "Блокировка"', () => {
                        decorate.el.button.handler({
                            name: 'Добавить запись',
                            timeout: entry.max
                        });
                        decorate.modal.planner.init({
                            timeout: entry.max
                        });
                        decorate.el.select.iconXpand({
                            title: 'Тип задания',
                            value: 'Подразделение',
                            text: 'Блокировка',
                            timeout: entry.max
                        });
                        decorate.el.button.handler({
                            name: 'Сохранить',
                            timeout: entry.max
                        });
                        decorate.modal.planner.initClose({
                            timeout: entry.max
                        });
                    });
                });

                describe('Изменение "Оправдательные документы"', () => {
                    describe('Открытие информации "Оправдательные документы"', () => {
                        decorate.el.simpleCell.handler({
                            name: 'Оправдательные документы',
                            timeout: entry.max
                        });
                        decorate.el.simpleCell.active({
                            name: 'Оправдательные документы',
                            timeout: entry.max
                        });
                    });
                    describe('Добавить документ', () => {
                        decorate.el.button.handler({
                            name: 'Добавить запись',
                            timeout: entry.max
                        });
                        decorate.modal.documentSupport.init({
                            timeout: entry.max
                        });
                        decorate.el.input.sendKeys({
                            title: 'Номер документа',
                            placeholder: '',
                            value: data.staff.staff1.documentSupport.number,
                            timeout: entry.max
                        });
                        decorate.el.select.iconXpand({
                            title: 'Тип документа',
                            value: 'Оправдательный',
                            text: 'Оправдательный',
                            timeout: entry.max
                        });
                        decorate.el.selectInput.iconXpand({
                            title: 'Код / наименование',
                            placeholder: '',
                            timeout: entry.max
                        });
                        decorate.el.selectXpand.xpand({
                            timeout: entry.max
                        });
                        decorate.el.selectXpand.handler({
                            value: data.staff.staff1.documentSupport.name,
                            timeout: entry.max
                        });
                        decorate.el.selectXpand.xpandNoElement({
                            timeout: entry.max
                        });
                        decorate.el.button.handler({
                            name: 'Сохранить',
                            timeout: entry.max
                        });
                        decorate.modal.documentSupport.initClose({
                            timeout: entry.max
                        });
                    });
                });

                describe('Изменение "Документы"', () => {
                    describe('Открытие информации "Документы"', () => {
                        decorate.el.simpleCell.handler({
                            name: 'Документы',
                            timeout: entry.max
                        });
                        decorate.el.simpleCell.active({
                            name: 'Документы',
                            timeout: entry.max
                        });
                    });

                    describe('Добавление водительского удостоверения', () => {
                        decorate.el.button.handler({
                            name: 'Добавить запись',
                            timeout: entry.max
                        });
                        decorate.modal.documentStaff.init({
                            timeout: entry.max
                        });
                        decorate.el.select.iconXpand({
                            title: 'Тип документа',
                            value: 'Паспорт',
                            text: data.staff.staff1.license.type,
                            timeout: entry.max
                        });
                        decorate.el.input.sendKeys({
                            title: 'Серия',
                            placeholder: '',
                            value: data.staff.staff1.license.series,
                            timeout: entry.max
                        });
                        decorate.el.input.sendKeys({
                            title: 'Номер',
                            placeholder: '',
                            value: data.staff.staff1.license.number,
                            timeout: entry.max
                        });
                        decorate.el.input.sendKeys({
                            title: 'Место рождения',
                            placeholder: '',
                            value: data.staff.staff1.license.birthplace,
                            timeout: entry.max
                        });
                        decorate.el.input.sendKeys({
                            title: 'Кем выдан',
                            placeholder: '',
                            value: data.staff.staff1.license.issue,
                            timeout: entry.max
                        });
                        decorate.el.input.iconCalendar({
                            title: 'Дата выдачи',
                            placeholder: '',
                            timeout: entry.max
                        });
                        decorate.el.datepicker.dateParse({
                            day: data.staff.staff2.passport.dateIn.day,
                            month: data.staff.staff2.passport.dateIn.month,
                            year: data.staff.staff2.passport.dateIn.year,
                            scrollYear: -500,
                            timeout: entry.max
                        });
                        decorate.el.input.iconCalendar({
                            title: 'Дата окончания действия документа',
                            placeholder: '',
                            timeout: entry.max
                        });
                        decorate.el.datepicker.dateParse({
                            day: data.staff.staff2.passport.dateOut.day,
                            month: data.staff.staff2.passport.dateOut.month,
                            year: data.staff.staff2.passport.dateOut.year,
                            scrollYear: -500,
                            timeout: entry.max
                        });
                        decorate.el.button.handler({
                            name: 'Сохранить',
                            timeout: entry.max
                        });
                        decorate.modal.documentStaff.initClose({
                            timeout: entry.max
                        });
                    });
                });

                describe('Изменение данных "Карта доступа"', () => {
                    describe('Открытие информации "Карта доступа"', () => {
                        decorate.el.simpleCell.handler({
                            name: 'Карта доступа',
                            timeout: entry.max
                        });
                        decorate.el.simpleCell.active({
                            name: 'Карта доступа',
                            timeout: entry.max
                        });
                    });

                    describe('Удаление дополнительных карт доступа', () => {
                        [...Array(9).keys()].forEach((item, index) => {
                            describe(`Удаление карты`, () => {
                                decorate.page.staffChange.deleteCardAdditional({
                                    cardNumber: 1,
                                    timeout: entry.max
                                });
                                decorate.modalConfirm.staffDeleteCard.init({
                                    timeout: entry.max
                                });
                                decorate.el.button.handler({
                                    name: 'Подтвердить',
                                    timeout: entry.max
                                });
                                decorate.modalConfirm.staffDeleteCard.initClose({
                                    timeout: entry.max
                                });
                            });
                        });
                    });

                    describe('Удаление основной карты', () => {
                        decorate.el.input.iconClear({
                            title: 'Идентификатор',
                            placeholder: '',
                            timeout: entry.max
                        });
                        decorate.modalConfirm.staffDeleteCard.init({
                            timeout: entry.max
                        });
                        decorate.el.button.handler({
                            name: 'Подтвердить',
                            timeout: entry.max
                        });
                        decorate.modalConfirm.staffDeleteCard.initClose({
                            timeout: entry.max
                        });
                    });

                    describe(`Добавление идентификатора "Основная карта"`, () => {
                        decorate.el.input.iconCard({
                            title: 'Идентификатор',
                            placeholder: '',
                            timeout: entry.max
                        });
                        decorate.modal.cardControlsAdd.init({
                            timeout: entry.max
                        });
                        decorate.modal.cardControlsNumber.inputSendKeys({
                            title: 'Идентификатор карты',
                            placeholder: '',
                            value: data.staff.staff1.card.card1,
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

                    data.staff.staff1.card.arr.forEach((card, index) => {
                        describe(`Добавление идентификатора "Дополнительные карта" ${card}`, () => {
                            decorate.page.staffChange.addCardButtonHandler({
                                timeout: entry.max
                            });
                            decorate.page.staffChange.addCardAdditional({
                                cardNumber: index + 1,
                                timeout: entry.max
                            });
                            decorate.modal.cardControlsAdd.init({
                                timeout: entry.max
                            });
                            decorate.modal.cardControlsNumber.inputSendKeys({
                                title: 'Идентификатор карты',
                                placeholder: '',
                                value: card,
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

                    describe('Удаление штрихкода', () => {
                        decorate.el.input.iconClear({
                            title: '',
                            placeholder: '',
                            timeout: entry.max
                        });
                        decorate.modalConfirm.staffDeleteBarcode.init({
                            timeout: entry.max
                        });
                        decorate.el.button.handler({
                            name: 'Подтвердить',
                            timeout: entry.max
                        });
                        decorate.modalConfirm.staffDeleteBarcode.initClose({
                            timeout: entry.max
                        });
                    });

                    describe('Ввод штрихкода', () => {
                        decorate.el.input.sendKeys({
                            title: '',
                            placeholder: '',
                            value: data.staff.staff1.barcode,
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

                    data.staff.staff1.ts.arrTS.forEach((obj, index) => {
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

                describe('Сохранение сотрудника', () => {
                    decorate.el.button.handler({
                        name: 'Сохранить изменения',
                        timeout: entry.max
                    });
                    decorate.el.success.success({
                        text: 'Данные успешно изменены',
                        timeout: entry.max
                    });
                    decorate.el.button.handler({
                        name: 'Вернуться к списку сотрудников',
                        timeout: entry.max
                    });
                    decorate.page.staffActive.init({
                        timeout: entry.max
                    });
                });
            });

            describe('Проверка', () => {

                befActive();
                aft();

                describe('Проверка таблицы', () => {
                    decorate.el.table.size({
                        strCount: 1,
                        timeout: entry.max
                    });
                    decorate.el.table.cellGetText({
                        headTitle: 'ФИО',
                        strNumber: 1,
                        cellNumber: 2,
                        value: data.staff.staff1.lastName + ' ' + data.staff.staff1.firstName + ' ' + data.staff.staff1.middleName,
                        timeout: entry.max
                    });
                    decorate.el.table.cellGetText({
                        headTitle: 'Табельный номер',
                        strNumber: 1,
                        cellNumber: 3,
                        value: data.staff.staff1.tabelNumber,
                        timeout: entry.max
                    });
                    decorate.el.table.cellGetText({
                        headTitle: 'Дата приема',
                        strNumber: 1,
                        cellNumber: 4,
                        value: data.staff.staff1.dateIn.date.substr(0, 10),
                        timeout: entry.max
                    });
                    decorate.el.table.cellGetText({
                        headTitle: 'Карта',
                        strNumber: 1,
                        cellNumber: 5,
                        value: '10 карт',
                        timeout: entry.max
                    });
                    decorate.el.table.cellGetText({
                        headTitle: 'Штрихкод',
                        strNumber: 1,
                        cellNumber: 6,
                        value: data.staff.staff1.barcode,
                        timeout: entry.max
                    });
                    decorate.el.table.cellGetIconLock({
                        strNumber: 1,
                        cellNumber: 7,
                        timeout: entry.max
                    });
                    decorate.el.table.cellGetText({
                        headTitle: 'Подразделение',
                        strNumber: 1,
                        cellNumber: 8,
                        value: data.staff.staff1.division,
                        timeout: entry.max
                    });
                    decorate.el.table.cellGetText({
                        headTitle: 'Должность',
                        strNumber: 1,
                        cellNumber: 9,
                        value: data.staff.staff1.position,
                        timeout: entry.max
                    });
                    decorate.el.table.cellGetText({
                        headTitle: 'График работы',
                        strNumber: 1,
                        cellNumber: 10,
                        value: data.staff.staff1.schedule,
                        timeout: entry.max
                    });
                    decorate.el.table.cellGetText({
                        headTitle: 'Шаблон доступа',
                        strNumber: 1,
                        cellNumber: 11,
                        value: '2 шаблона доступа',
                        timeout: entry.max
                    });
                    decorate.el.table.cellImg({
                        headTitle: 'Фотография',
                        strNumber: 1,
                        cellNumber: 12,
                        timeout: entry.max
                    });
                    decorate.el.table.cellGetText({
                        headTitle: 'Транспортное средство',
                        strNumber: 1,
                        cellNumber: 13,
                        value: data.staff.staff1.ts.arrTS.map(obj => obj.number + ' ' + obj.model).join(';'),
                        timeout: entry.max
                    });
                });

                describe('Проверка параметров', () => {

                    describe('Открытие сотрудника на редактирование', () => {
                        decorate.el.table.strHandler({
                            strNumber: 1,
                            timeout: entry.max
                        });
                        decorate.el.butIcBefore.handler({
                            icon: but.edit,
                            timeout: entry.max
                        });
                        decorate.page.staffChange.initEdit({
                            timeout: entry.max
                        });
                    });

                    describe('Проверка данных "Общая информация"', () => {
                        describe('Основная информация', () => {
                            decorate.el.input.getValue({
                                title: 'Фамилия',
                                placeholder: 'Фамилия',
                                value: data.staff.staff1.lastName,
                                timeout: entry.max
                            });

                            decorate.el.input.getValue({
                                title: 'Имя',
                                placeholder: 'Имя',
                                value: data.staff.staff1.firstName,
                                timeout: entry.max
                            });

                            decorate.el.input.getValue({
                                title: 'Отчество',
                                placeholder: 'Отчество',
                                value: data.staff.staff1.middleName,
                                timeout: entry.max
                            });

                            decorate.el.input.getValue({
                                title: 'Номер телефона',
                                placeholder: 'Номер телефона',
                                value: data.staff.staff1.phone,
                                timeout: entry.max
                            });

                            decorate.el.input.getValue({
                                title: 'E-Mail',
                                placeholder: 'E-Mail',
                                value: data.staff.staff1.mail,
                                timeout: entry.max
                            });

                            decorate.el.input.getValue({
                                title: 'Дата рождения',
                                placeholder: 'Дата рождения',
                                value: data.staff.staff1.dateBirthday.date,
                                timeout: entry.max
                            });
                        });

                        describe('Учетные данные', () => {
                            decorate.el.input.getValue({
                                title: 'Табельный номер',
                                placeholder: 'Табельный номер',
                                value: data.staff.staff1.tabelNumber,
                                timeout: entry.max
                            });

                            decorate.el.input.getValue({
                                title: 'Дата приема',
                                placeholder: 'Дата приема',
                                value: data.staff.staff1.date.date,
                                timeout: entry.max
                            });

                            decorate.el.input.getValue({
                                title: 'Действует с',
                                placeholder: 'Действует с',
                                value: data.staff.staff1.dateIn.date,
                                timeout: entry.max
                            });

                            decorate.el.input.getValue({
                                title: 'Подразделение',
                                placeholder: 'Подразделение',
                                value: data.staff.staff1.division,
                                timeout: entry.max
                            });

                            decorate.el.input.getValue({
                                title: 'Должность',
                                placeholder: 'Должность',
                                value: data.staff.staff1.position,
                                timeout: entry.max
                            });

                            decorate.el.input.getValue({
                                title: 'Действует до',
                                placeholder: 'Действует до',
                                value: data.staff.staff1.dateAfter.date,
                                timeout: entry.max
                            });

                            decorate.el.input.getValue({
                                title: 'График работы',
                                placeholder: 'График работы',
                                value: data.staff.staff1.schedule,
                                timeout: entry.max
                            });

                            decorate.el.selectMulti.getText({
                                title: 'Шаблон доступа',
                                valueNumber: 1,
                                value: data.staff.staff1.template.template1,
                                timeout: entry.max
                            });

                            decorate.el.selectMulti.getText({
                                title: 'Шаблон доступа',
                                valueNumber: 2,
                                value: data.staff.staff1.template.template2,
                                timeout: entry.max
                            });
                        });

                        describe('Дополнительные поля', () => {
                            decorate.el.input.getValue({
                                title: 'Пин-код',
                                placeholder: '',
                                value: data.staff.staff1.pinCode,
                                timeout: entry.max
                            });

                            decorate.el.input.getValue({
                                title: data.additionalData.data1Text.name,
                                placeholder: '',
                                value: data.staff.staff1.data1,
                                timeout: entry.max
                            });

                            decorate.el.select.getText({
                                title: data.additionalData.data3Select.name,
                                value: data.staff.staff1.data3,
                                timeout: entry.max
                            });

                            decorate.el.select.getText({
                                title: data.additionalData.data4Checkbox.name,
                                value: data.staff.staff1.data4,
                                timeout: entry.max
                            });

                            decorate.el.input.getValue({
                                title: data.additionalData.data5Date.name,
                                placeholder: '',
                                value: data.staff.staff1.data5.date,
                                timeout: entry.max
                            });

                            decorate.el.input.getValue({
                                title: data.additionalData.data6DateTime.name,
                                placeholder: '',
                                value: data.staff.staff1.data6.date,
                                timeout: entry.max
                            });
                        });

                        describe('Фотография', () => {
                            decorate.el.photography.imageStaff({
                                timeout: entry.max
                            });
                        });
                    });

                    describe('Проверка данных "Изображения"', () => {
                        describe('Открытие информации "Изображения"', () => {
                            decorate.el.simpleCell.handler({
                                name: 'Изображения',
                                timeout: entry.max
                            });
                            decorate.el.simpleCell.active({
                                name: 'Изображения',
                                timeout: entry.max
                            });
                        });

                        describe('Проверка дополнительного поля изображения', () => {
                            decorate.el.photography.imageAdditional({
                                number: 1,
                                timeout: entry.max
                            });
                            decorate.el.photography.getAdditionalName({
                                number: 1,
                                value: data.staff.staff2.data2
                            });
                        });
                    });

                    describe('Проверка данных "Планировщик"', () => {
                        describe('Открытие информации "Планировщик"', () => {
                            decorate.el.simpleCell.handler({
                                name: 'Планировщик',
                                timeout: entry.max
                            });
                            decorate.el.simpleCell.active({
                                name: 'Планировщик',
                                timeout: entry.max
                            });
                        });
                        describe('Проверка строки 6', () => {
                            decorate.el.table.cellGetText({
                                headTitle: 'Учетные данные',
                                strNumber: 6,
                                cellNumber: 1,
                                value: 'Блокировка',
                                timeout: entry.max
                            });
                            decorate.el.table.cellGetText({
                                headTitle: 'Дата начала',
                                strNumber: 6,
                                cellNumber: 2,
                                value: data.today,
                                timeout: entry.max
                            });
                            decorate.el.table.cellGetText({
                                headTitle: 'Дата окончания',
                                strNumber: 6,
                                cellNumber: 3,
                                value: data.today,
                                timeout: entry.max
                            });
                            decorate.el.table.cellGetText({
                                headTitle: 'Значение',
                                strNumber: 6,
                                cellNumber: 4,
                                value: 'Разблокирована карта',
                                timeout: entry.max
                            });
                        });
                    });

                    describe('Проверка данных "Оправдательные документы"', () => {
                        decorate.el.simpleCell.handler({
                            name: 'Оправдательные документы',
                            timeout: entry.max
                        });
                        decorate.el.simpleCell.active({
                            name: 'Оправдательные документы',
                            timeout: entry.max
                        });
                        decorate.el.table.cellGetText({
                            headTitle: '№',
                            strNumber: 1,
                            cellNumber: 1,
                            value: data.staff.staff1.documentSupport.number,
                            timeout: entry.max
                        });
                        decorate.el.table.cellGetText({
                            headTitle: 'Тип',
                            strNumber: 1,
                            cellNumber: 2,
                            value: 'Оправдательный',
                            timeout: entry.max
                        });
                        decorate.el.table.cellGetText({
                            headTitle: 'Наименование',
                            strNumber: 1,
                            cellNumber: 3,
                            value: data.staff.staff1.documentSupport.name,
                            timeout: entry.max
                        });
                        decorate.el.table.cellGetText({
                            headTitle: 'Продолжительность',
                            strNumber: 1,
                            cellNumber: 4,
                            value: '00:00:00',
                            timeout: entry.max
                        });
                        decorate.el.table.cellGetText({
                            headTitle: 'Дата документа',
                            strNumber: 1,
                            cellNumber: 5,
                            value: data.today,
                            timeout: entry.max
                        });
                        decorate.el.table.cellGetText({
                            headTitle: 'Начало действия',
                            strNumber: 1,
                            cellNumber: 6,
                            value: data.today,
                            timeout: entry.max
                        });
                        decorate.el.table.cellGetText({
                            headTitle: 'Конец действия',
                            strNumber: 1,
                            cellNumber: 7,
                            value: data.today,
                            timeout: entry.max
                        });
                    });

                    describe('Проверка данных "Документы"', () => {
                        decorate.el.simpleCell.handler({
                            name: 'Документы',
                            timeout: entry.max
                        });
                        decorate.el.simpleCell.active({
                            name: 'Документы',
                            timeout: entry.max
                        });
                        decorate.el.table.cellGetText({
                            headTitle: 'Тип документа',
                            strNumber: 1,
                            cellNumber: 1,
                            value: data.staff.staff1.license.type,
                            timeout: entry.max
                        });
                        decorate.el.table.cellGetText({
                            headTitle: 'Серия',
                            strNumber: 1,
                            cellNumber: 2,
                            value: data.staff.staff1.license.series,
                            timeout: entry.max
                        });
                        decorate.el.table.cellGetText({
                            headTitle: 'Номер',
                            strNumber: 1,
                            cellNumber: 3,
                            value: data.staff.staff1.license.number,
                            timeout: entry.max
                        });
                        decorate.el.table.cellGetText({
                            headTitle: 'Кем выдан',
                            strNumber: 1,
                            cellNumber: 4,
                            value: data.staff.staff1.license.issue,
                            timeout: entry.max
                        });
                        decorate.el.table.cellGetText({
                            headTitle: 'Дата выдачи',
                            strNumber: 1,
                            cellNumber: 5,
                            value: data.staff.staff1.license.dateIn.date,
                            timeout: entry.max
                        });
                        decorate.el.table.cellGetText({
                            headTitle: 'Дата окончания',
                            strNumber: 1,
                            cellNumber: 6,
                            value: data.staff.staff1.license.dateOut.date,
                            timeout: entry.max
                        });
                        decorate.el.table.cellGetText({
                            headTitle: 'Код подразделения',
                            strNumber: 1,
                            cellNumber: 7,
                            value: '',
                            timeout: entry.max
                        });
                    });

                    describe('Проверка данных "Карта доступа"', () => {
                        describe('Открытие информации "Карта доступа"', () => {
                            decorate.el.simpleCell.handler({
                                name: 'Карта доступа',
                                timeout: entry.max
                            });
                            decorate.el.simpleCell.active({
                                name: 'Карта доступа',
                                timeout: entry.max
                            });
                        });

                        describe(`Проверка идентификатора "Основная карта"`, () => {
                            it('Поиск идентификатора "Основная карта" в массиве идентфикаторов', async () => {
                                const card = await el.input.getValue('Идентификатор', '', entry.max);
                                const array = [...data.staff.staff1.card.arr, data.staff.staff1.card.card1];
                                const searchCard = array.includes(card.text);
                                expect(searchCard).to.equal(true);
                            });
                        });

                        describe('Проверка идентифкаторов дополнительных карт', () => {
                            [...Array(9).keys()].forEach((item, index) => {
                                it(`Проверка идентификатора "Дополнительные карта" ${data.staff.staff1.card.arr[index]}`,
                                    async () => {
                                        const card = await page.staffChange.cardAdditionalValue(index + 1, entry.max);
                                        const array = [...data.staff.staff1.card.arr, data.staff.staff1.card.card1];
                                        const searchCard = array.includes(card.text);
                                        expect(searchCard).to.equal(true);
                                    });
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

                        describe('Генерация штрикода по кнопке', () => {
                            it('Проверка отображение картинки штрикода', async () => {
                                const barcode = await page.staffChange.getBarcodeSrc(entry.max);
                                expect(!!barcode.text).to.equal(true);
                            });
                        });

                        describe('Ввод штрикода', () => {
                            decorate.el.input.getValue({
                                title: '',
                                placeholder: '',
                                value: data.staff.staff1.barcode,
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

                        data.staff.staff1.ts.arrTS.forEach((obj, index) => {
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

                    describe('Нажатие кнопки "Вернуться к списку сотрудников".', () => {
                        decorate.el.button.handler({
                            name: 'Вернуться к списку сотрудников',
                            timeout: entry.max
                        });
                        decorate.modalConfirm.staffReturn.init({
                            timeout: entry.max
                        });
                        decorate.el.button.handler({
                            name: 'Подтвердить',
                            timeout: entry.max
                        });
                        decorate.page.staffActive.init({
                            timeout: entry.max
                        });
                    });
                });
            });
        }

        if(type === 'pass') {
            describe('Редактирование', () => {
                befPass();
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
                    decorate.page.staffPassChange.init({
                        timeout: entry.max
                    });
                });

                describe('Изменение данных "Общая информация"', () => {

                    describe('Учетные данные', () => {
                        decorate.el.selectMulti.iconXpand({
                            title: 'Шаблон доступа',
                            placeholder: 'Шаблон доступа',
                            timeout: entry.max
                        });
                        decorate.el.selectXpand.xpand({
                            timeout: entry.max
                        });
                        decorate.el.selectXpand.handler({
                            value: data.staff.staff1.template.template1,
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
                            day: data.staff.staff1.dateIn.day,
                            month: data.staff.staff1.dateIn.month,
                            year: data.staff.staff1.dateIn.year,
                            scrollYear: -500,
                            timeout: entry.max
                        });

                        decorate.el.selectMulti.iconOutline({
                            title: 'Шаблон доступа',
                            placeholder: 'Шаблон доступа',
                            timeout: entry.max
                        });
                        decorate.modal.accessTemplate.init({
                            timeout: entry.max
                        });
                        decorate.el.groupCell.handler({
                            name: data.staff.staff1.template.template2,
                            timeout: entry.max
                        });
                        decorate.el.groupCell.active({
                            name: data.staff.staff1.template.template2,
                            timeout: entry.max
                        });
                        decorate.el.button.handler({
                            name: 'Применить',
                            timeout: entry.max
                        });
                        decorate.modal.accessTemplate.initClose({
                            timeout: entry.max
                        });

                        decorate.el.input.iconCalendar({
                            title: 'Действует до',
                            placeholder: 'Действует до',
                            timeout: entry.max
                        });
                        decorate.el.datepicker.date({
                            day: data.staff.staff1.dateAfter.day,
                            month: data.staff.staff1.dateAfter.month,
                            year: data.staff.staff1.dateAfter.year,
                            scrollYear: -500,
                            timeout: entry.max
                        });

                    });

                    describe('Дополнительные поля', () => {
                        decorate.el.input.sendKeys({
                            title: 'Пин-код',
                            placeholder: '',
                            value: data.staff.staff1.pinCode,
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
                        decorate.el.photography.imageStaff({
                            timeout: entry.max
                        });
                    });
                });

                describe('Изменение данных "Карта доступа"', () => {
                    describe('Открытие информации "Карта доступа"', () => {
                        decorate.el.simpleCell.handler({
                            name: 'Карта доступа',
                            timeout: entry.max
                        });
                        decorate.el.simpleCell.active({
                            name: 'Карта доступа',
                            timeout: entry.max
                        });
                    });

                    describe(`Добавление идентификатора "Основная карта"`, () => {
                        decorate.el.input.iconCard({
                            title: 'Идентификатор',
                            placeholder: '',
                            timeout: entry.max
                        });
                        decorate.modal.cardControlsAdd.init({
                            timeout: entry.max
                        });
                        decorate.modal.cardControlsNumber.inputSendKeys({
                            title: 'Идентификатор карты',
                            placeholder: '',
                            value: data.staff.staff1.card.card1,
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

                    data.staff.staff1.card.arr.forEach((card, index) => {
                        describe(`Добавление идентификатора "Дополнительные карта" ${card}`, () => {
                            decorate.page.staffChange.addCardButtonHandler({
                                timeout: entry.max
                            });
                            decorate.page.staffChange.addCardAdditional({
                                cardNumber: index + 1,
                                timeout: entry.max
                            });
                            decorate.modal.cardControlsAdd.init({
                                timeout: entry.max
                            });
                            decorate.modal.cardControlsNumber.inputSendKeys({
                                title: 'Идентификатор карты',
                                placeholder: '',
                                value: card,
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

                    describe('Ввод штрихкода', () => {
                        decorate.el.input.sendKeys({
                            title: '',
                            placeholder: '',
                            value: data.staff.staff1.barcode,
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

                    data.staff.staff1.ts.arrTS.forEach((obj, index) => {
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

                describe('Сохранение сотрудника', () => {
                    decorate.el.button.handler({
                        name: 'Сохранить изменения',
                        timeout: entry.max
                    });
                    decorate.el.success.success({
                        text: 'Данные успешно изменены',
                        timeout: entry.max
                    });
                    decorate.el.button.handler({
                        name: 'Вернуться к списку сотрудников',
                        timeout: entry.max
                    });
                    decorate.page.staffPass.init({
                        timeout: entry.max
                    });
                });

            });

            describe('Проверка', () => {

                befPass();
                aft();

                describe('Проверка таблицы', () => {
                    decorate.el.table.size({
                        strCount: 1,
                        timeout: entry.max
                    });
                    decorate.el.table.cellGetText({
                        headTitle: 'Сотрудник',
                        strNumber: 1,
                        cellNumber: 2,
                        value: data.staff.staff3.lastName + ' ' + data.staff.staff3.firstName,
                        timeout: entry.max
                    });
                    decorate.el.table.cellGetText({
                        headTitle: 'Должность',
                        strNumber: 1,
                        cellNumber: 3,
                        value: '',
                        timeout: entry.max
                    });
                    decorate.el.table.cellGetText({
                        headTitle: 'Подразделение',
                        strNumber: 1,
                        cellNumber: 4,
                        value: data.staff.staff3.division,
                        timeout: entry.max
                    });
                    decorate.el.table.cellNoIconLock({
                        strNumber: 1,
                        cellNumber: 5,
                        timeout: entry.max
                    });
                    decorate.el.table.cellGetText({
                        headTitle: 'Шаблон доступа',
                        strNumber: 1,
                        cellNumber: 6,
                        value: '2 шаблона доступа',
                        timeout: entry.max
                    });
                    decorate.el.table.cellGetText({
                        headTitle: 'Карта',
                        strNumber: 1,
                        cellNumber: 7,
                        value: '10 карт',
                        timeout: entry.max
                    });
                    decorate.el.table.cellGetText({
                        headTitle: 'Штрихкод',
                        strNumber: 1,
                        cellNumber: 8,
                        value: data.staff.staff1.barcode,
                        timeout: entry.max
                    });

                    decorate.el.table.cellGetText({
                        headTitle: 'Действует с',
                        strNumber: 1,
                        cellNumber: 9,
                        value: data.staff.staff1.dateIn.date + ':00',
                        timeout: entry.max
                    });
                    decorate.el.table.cellGetText({
                        headTitle: 'Действует до',
                        strNumber: 1,
                        cellNumber: 10,
                        value: data.staff.staff1.dateAfter.date + ':00',
                        timeout: entry.max
                    });

                    decorate.el.table.cellImg({
                        headTitle: 'Фотография',
                        strNumber: 1,
                        cellNumber: 11,
                        timeout: entry.max
                    });
                    decorate.el.table.cellGetText({
                        headTitle: 'Транспортное средство',
                        strNumber: 1,
                        cellNumber: 12,
                        value: data.staff.staff1.ts.arrTS.map(obj => obj.number + ' ' + obj.model).join(';'),
                        timeout: entry.max
                    });
                });

                describe('Проверка параметров', () => {

                    describe('Открытие сотрудника на редактирование', () => {
                        decorate.el.table.strHandler({
                            strNumber: 1,
                            timeout: entry.max
                        });
                        decorate.el.butIcBefore.handler({
                            icon: but.edit,
                            timeout: entry.max
                        });
                        decorate.page.staffPassChange.init({
                            timeout: entry.max
                        });
                    });

                    describe('Проверка данных "Общая информация"', () => {
                        describe('Основная информация', () => {
                            decorate.el.input.getValue({
                                title: 'Фамилия',
                                placeholder: 'Фамилия',
                                value: data.staff.staff3.lastName,
                                timeout: entry.max
                            });
                            decorate.el.input.getValue({
                                title: 'Имя',
                                placeholder: 'Имя',
                                value: data.staff.staff3.firstName,
                                timeout: entry.max
                            });
                            decorate.el.input.getValue({
                                title: 'Отчество',
                                placeholder: 'Отчество',
                                value: '',
                                timeout: entry.max
                            });
                            decorate.el.input.getValue({
                                title: 'Дата рождения',
                                placeholder: 'Дата рождения',
                                value: '',
                                timeout: entry.max
                            });
                        });

                        describe('Учетные данные', () => {
                            decorate.el.input.getValue({
                                title: 'Подразделение',
                                placeholder: 'Подразделение',
                                value: data.staff.staff3.division,
                                timeout: entry.max
                            });
                            decorate.el.input.getValue({
                                title: 'Должность',
                                placeholder: 'Должность',
                                value: '',
                                timeout: entry.max
                            });
                            decorate.el.input.getValue({
                                title: 'Действует с',
                                placeholder: 'Действует с',
                                value: data.staff.staff1.dateIn.date,
                                timeout: entry.max
                            });
                            decorate.el.selectMulti.getText({
                                title: 'Шаблон доступа',
                                valueNumber: 1,
                                value: data.staff.staff1.template.template1,
                                timeout: entry.max
                            });
                            decorate.el.selectMulti.getText({
                                title: 'Шаблон доступа',
                                valueNumber: 2,
                                value: data.staff.staff1.template.template2,
                                timeout: entry.max
                            });
                            decorate.el.input.getValue({
                                title: 'Действует до',
                                placeholder: 'Действует до',
                                value: data.staff.staff1.dateAfter.date,
                                timeout: entry.max
                            });
                        });

                        describe('Дополнительные поля', () => {
                            decorate.el.input.getValue({
                                title: 'Пин-код',
                                placeholder: '',
                                value: data.staff.staff1.pinCode,
                                timeout: entry.max
                            });
                        });

                        describe('Фотография', () => {
                            decorate.el.photography.imageStaff({
                                timeout: entry.max
                            });
                        });
                    });

                    describe('Проверка данных "Карта доступа"', () => {
                        describe('Открытие информации "Карта доступа"', () => {
                            decorate.el.simpleCell.handler({
                                name: 'Карта доступа',
                                timeout: entry.max
                            });
                            decorate.el.simpleCell.active({
                                name: 'Карта доступа',
                                timeout: entry.max
                            });
                        });

                        describe(`Проверка идентификатора "Основная карта"`, () => {
                            it('Поиск идентификатора "Основная карта" в массиве идентфикаторов', async () => {
                                const card = await el.input.getValue('Идентификатор', '', entry.max);
                                const array = [...data.staff.staff1.card.arr, data.staff.staff1.card.card1];
                                const searchCard = array.includes(card.text);
                                expect(searchCard).to.equal(true);
                            });
                        });

                        describe('Проверка идентифкаторов дополнительных карт', () => {
                            [...Array(9).keys()].forEach((item, index) => {
                                it(`Проверка идентификатора "Дополнительные карта" ${data.staff.staff1.card.arr[index]}`,
                                    async () => {
                                        const card = await page.staffChange.cardAdditionalValue(index + 1, entry.max);
                                        const array = [...data.staff.staff1.card.arr, data.staff.staff1.card.card1];
                                        const searchCard = array.includes(card.text);
                                        expect(searchCard).to.equal(true);
                                    });
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

                        describe('Генерация штрикода по кнопке', () => {
                            it('Проверка отображение картинки штрикода', async () => {
                                const barcode = await page.staffChange.getBarcodeSrc(entry.max);
                                expect(!!barcode.text).to.equal(true);
                            });
                        });

                        describe('Ввод штрикода', () => {
                            decorate.el.input.getValue({
                                title: '',
                                placeholder: '',
                                value: data.staff.staff1.barcode,
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

                        data.staff.staff1.ts.arrTS.forEach((obj, index) => {
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

                    describe('Нажатие кнопки "Вернуться к списку сотрудников".', () => {
                        decorate.el.button.handler({
                            name: 'Вернуться к списку сотрудников',
                            timeout: entry.max
                        });
                        decorate.page.staffPass.init({
                            timeout: entry.max
                        });
                    });
                });
            });
        }
    });

    const dimissedStaff = () => describe('Персонал / Сотрудники - вкладка - Действующие. Увольнение сотрудника.',() => {
        describe('Увольнение сотрудника', () => {
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
            decorate.modal.dimissStaff.init({
                timeout: entry.max
            });
            decorate.el.input.iconCalendar({
                title: 'Дата увольнения',
                placeholder: '',
                timeout: entry.max
            });
            decorate.el.datepicker.dateParse({
                day: data.date.day,
                month: data.date.month,
                year: data.date.year,
                scrollYear: -500,
                timeout: entry.max
            });
            decorate.el.button.handler({
                name: 'Уволить',
                timeout: entry.max
            });
            decorate.el.success.success({
                text: 'Операция успешно завершена',
                timeout: entry.max
            });
            decorate.modal.dimissStaff.initClose({
                timeout: entry.max
            });
            decorate.el.table.noStr({
                timeout: entry.max
            });
        });

        describe('Персонал / Сотрудники - вкладка - Уволенные. Проверка таблицы.', () => {
            befDismissed();
            aft();
            decorate.el.table.size({
                strCount: 1,
                timeout: entry.max
            });
        });
    });

    const deleteStaff = () => describe('Персонал / Сотрудники - вкладка Уволенные. Удаление сотрудника', () => {
        befDismissed();
        aft();
        decorate.el.table.strHandler({
            strNumber: 1,
            timeout: entry.max
        });
        decorate.el.butIcBefore.handler({
            icon: but.delete,
            timeout: entry.max
        });
        decorate.modalConfirm.staffDelete.init({
            timeout: entry.max
        });
        decorate.el.button.handler({
            name: 'Удалить',
            timeout: entry.max
        });
        decorate.el.success.success({
            text: 'Сотрудник удален',
            timeout: entry.max
        });
        decorate.modalConfirm.staffDelete.initClose({
            timeout: entry.max
        });
        decorate.el.table.noStr({
            timeout: entry.max
        });
    });

    const addStaffMinParams = () => describe(text +
        ' Добавление сотрудника с минимальном количеством параметров.', () => {

        describe('Добавление', () => {
            befActive();
            aft();

            describe('Открытие страницы добавления', () => {
                decorate.el.butIcBefore.handler({
                    icon: but.add,
                    timeout: entry.max
                });
                decorate.page.staffChange.initAdd({
                    timeout: entry.max
                });
            });

            describe('Ввод данных "Общая информация"', () => {
                describe('Основная информация', () => {
                    decorate.el.input.sendKeys({
                        title: 'Фамилия',
                        placeholder: 'Фамилия',
                        value: data.staff.staff3.lastName,
                        timeout: entry.max
                    });

                    decorate.el.input.sendKeys({
                        title: 'Имя',
                        placeholder: 'Имя',
                        value: data.staff.staff3.firstName,
                        timeout: entry.max
                    });

                });

                describe('Учетные данные', () => {
                    decorate.el.input.sendKeys({
                        title: 'Табельный номер',
                        placeholder: 'Табельный номер',
                        value: data.staff.staff3.tabelNumber,
                        timeout: entry.max
                    });

                    decorate.el.input.iconCalendar({
                        title: 'Дата приема',
                        placeholder: 'Дата приема',
                        timeout: entry.max
                    });
                    decorate.el.datepicker.dateParse({
                        day: data.staff.staff3.date.day,
                        month: data.staff.staff3.date.month,
                        year: data.staff.staff3.date.year,
                        scrollYear: -500,
                        timeout: entry.max
                    });

                    decorate.el.input.iconCalendar({
                        title: 'Действует с',
                        placeholder: 'Действует с',
                        timeout: entry.max
                    });
                    decorate.el.datepicker.date({
                        day: data.staff.staff3.dateIn.day,
                        month: data.staff.staff3.dateIn.month,
                        year: data.staff.staff3.dateIn.year,
                        scrollYear: -500,
                        timeout: entry.max
                    });

                    decorate.el.selectInput.iconXpand({
                        title: 'Подразделение',
                        placeholder: 'Подразделение',
                        timeout: entry.max
                    });
                    decorate.el.selectXpand.xpand({
                        timeout: entry.max
                    });
                    decorate.el.selectXpand.handler({
                        value: data.staff.staff3.division,
                        timeout: entry.max
                    });
                    decorate.el.selectXpand.xpandNoElement({
                        timeout: entry.max
                    });

                    decorate.el.input.iconCalendar({
                        title: 'Действует до',
                        placeholder: 'Действует до',
                        timeout: entry.max
                    });
                    decorate.el.datepicker.date({
                        day: data.staff.staff3.dateAfter.day,
                        month: data.staff.staff3.dateAfter.month,
                        year: data.staff.staff3.dateAfter.year,
                        scrollYear: -500,
                        timeout: entry.max
                    });
                });
            });

            describe('Сохранение сотрудника', () => {
                decorate.el.button.handler({
                    name: 'Сохранить изменения',
                    timeout: entry.max
                });
                decorate.el.success.success({
                    text: 'Сотрудник успешно добавлен',
                    timeout: entry.max
                });
                decorate.el.button.handler({
                    name: 'Вернуться к списку сотрудников',
                    timeout: entry.max
                });
                decorate.page.staffActive.init({
                    timeout: entry.max
                });
            });
        });

        if(type === 'active') {
            describe('Проверка', () => {
                befActive();
                aft();

                describe('Проверка таблицы', () => {
                    decorate.el.table.size({
                        strCount: 1,
                        timeout: entry.max
                    });
                    decorate.el.table.cellGetText({
                        headTitle: 'ФИО',
                        strNumber: 1,
                        cellNumber: 2,
                        value: data.staff.staff3.lastName + ' ' + data.staff.staff3.firstName,
                        timeout: entry.max
                    });
                    decorate.el.table.cellGetText({
                        headTitle: 'Табельный номер',
                        strNumber: 1,
                        cellNumber: 3,
                        value: data.staff.staff3.tabelNumber,
                        timeout: entry.max
                    });
                    decorate.el.table.cellGetText({
                        headTitle: 'Дата приема',
                        strNumber: 1,
                        cellNumber: 4,
                        value: data.staff.staff3.dateIn.date.substr(0, 10),
                        timeout: entry.max
                    });
                    decorate.el.table.cellGetText({
                        headTitle: 'Карта',
                        strNumber: 1,
                        cellNumber: 5,
                        value: '',
                        timeout: entry.max
                    });
                    decorate.el.table.cellGetText({
                        headTitle: 'Штрихкод',
                        strNumber: 1,
                        cellNumber: 6,
                        value: '',
                        timeout: entry.max
                    });
                    decorate.el.table.cellNoIconLock({
                        strNumber: 1,
                        cellNumber: 7,
                        timeout: entry.max
                    });
                    decorate.el.table.cellGetText({
                        headTitle: 'Подразделение',
                        strNumber: 1,
                        cellNumber: 8,
                        value: data.staff.staff3.division,
                        timeout: entry.max
                    });
                    decorate.el.table.cellGetText({
                        headTitle: 'Должность',
                        strNumber: 1,
                        cellNumber: 9,
                        value: '',
                        timeout: entry.max
                    });
                    decorate.el.table.cellGetText({
                        headTitle: 'График работы',
                        strNumber: 1,
                        cellNumber: 10,
                        value: '',
                        timeout: entry.max
                    });
                    decorate.el.table.cellGetText({
                        headTitle: 'Шаблон доступа',
                        strNumber: 1,
                        cellNumber: 11,
                        value: '',
                        timeout: entry.max
                    });
                    decorate.el.table.cellGetText({
                        headTitle: 'Транспортное средство',
                        strNumber: 1,
                        cellNumber: 13,
                        value: '',
                        timeout: entry.max
                    });
                });

                describe('Проверка параметров', () => {

                    describe('Открытие сотрудника на редактирование', () => {
                        decorate.el.table.strHandler({
                            strNumber: 1,
                            timeout: entry.max
                        });
                        decorate.el.butIcBefore.handler({
                            icon: but.edit,
                            timeout: entry.max
                        });
                        decorate.page.staffChange.initEdit({
                            timeout: entry.max
                        });
                    });

                    describe('Проверка данных "Общая информация"', () => {
                        describe('Основная информация', () => {
                            decorate.el.input.getValue({
                                title: 'Фамилия',
                                placeholder: 'Фамилия',
                                value: data.staff.staff3.lastName,
                                timeout: entry.max
                            });
                            decorate.el.input.getValue({
                                title: 'Имя',
                                placeholder: 'Имя',
                                value: data.staff.staff3.firstName,
                                timeout: entry.max
                            });
                        });

                        describe('Учетные данные', () => {
                            decorate.el.input.getValue({
                                title: 'Табельный номер',
                                placeholder: 'Табельный номер',
                                value: data.staff.staff3.tabelNumber,
                                timeout: entry.max
                            });
                            decorate.el.input.getValue({
                                title: 'Дата приема',
                                placeholder: 'Дата приема',
                                value: data.staff.staff1.date.date,
                                timeout: entry.max
                            });
                            decorate.el.input.getValue({
                                title: 'Действует с',
                                placeholder: 'Действует с',
                                value: data.staff.staff1.dateIn.date,
                                timeout: entry.max
                            });
                            decorate.el.input.getValue({
                                title: 'Подразделение',
                                placeholder: 'Подразделение',
                                value: data.staff.staff3.division,
                                timeout: entry.max
                            });
                            decorate.el.input.getValue({
                                title: 'Действует до',
                                placeholder: 'Действует до',
                                value: data.staff.staff1.dateAfter.date,
                                timeout: entry.max
                            });
                        });

                    });

                    describe('Нажатие кнопки "Вернуться к списку сотрудников".', () => {
                        decorate.el.button.handler({
                            name: 'Вернуться к списку сотрудников',
                            timeout: entry.max
                        });
                        decorate.modalConfirm.staffReturn.init({
                            timeout: entry.max
                        });
                        decorate.el.button.handler({
                            name: 'Подтвердить',
                            timeout: entry.max
                        });
                        decorate.page.staffActive.init({
                            timeout: entry.max
                        });
                    });
                });
            });
        }

        if(type === 'pass') {
            describe('Проверка', () => {
                befPass();
                aft();
                describe('Проверка таблицы', () => {
                    decorate.el.table.size({
                        strCount: 1,
                        timeout: entry.max
                    });
                    decorate.el.table.cellGetText({
                        headTitle: 'Сотрудник',
                        strNumber: 1,
                        cellNumber: 2,
                        value: data.staff.staff3.lastName + ' ' + data.staff.staff3.firstName,
                        timeout: entry.max
                    });
                    decorate.el.table.cellGetText({
                        headTitle: 'Должность',
                        strNumber: 1,
                        cellNumber: 3,
                        value: '',
                        timeout: entry.max
                    });
                    decorate.el.table.cellGetText({
                        headTitle: 'Подразделение',
                        strNumber: 1,
                        cellNumber: 4,
                        value: data.staff.staff3.division,
                        timeout: entry.max
                    });
                    decorate.el.table.cellNoIconLock({
                        strNumber: 1,
                        cellNumber: 5,
                        timeout: entry.max
                    });
                    decorate.el.table.cellGetText({
                        headTitle: 'Шаблон доступа',
                        strNumber: 1,
                        cellNumber: 6,
                        value: '',
                        timeout: entry.max
                    });
                    decorate.el.table.cellGetText({
                        headTitle: 'Карта',
                        strNumber: 1,
                        cellNumber: 7,
                        value: '',
                        timeout: entry.max
                    });
                    decorate.el.table.cellGetText({
                        headTitle: 'Штрихкод',
                        strNumber: 1,
                        cellNumber: 8,
                        value: '',
                        timeout: entry.max
                    });
                    decorate.el.table.cellGetText({
                        headTitle: 'Действует с',
                        strNumber: 1,
                        cellNumber: 9,
                        value: data.staff.staff3.dateIn.date + ':00',
                        timeout: entry.max
                    });
                    decorate.el.table.cellGetText({
                        headTitle: 'Действует до',
                        strNumber: 1,
                        cellNumber: 10,
                        value: data.staff.staff3.dateAfter.date + ':00',
                        timeout: entry.max
                    });
                    decorate.el.table.cellGetText({
                        headTitle: 'Транспортное средство',
                        strNumber: 1,
                        cellNumber: 12,
                        value: '',
                        timeout: entry.max
                    });
                });

                describe('Проверка параметров', () => {

                    describe('Открытие сотрудника на редактирование', () => {
                        decorate.el.table.strHandler({
                            strNumber: 1,
                            timeout: entry.max
                        });
                        decorate.el.butIcBefore.handler({
                            icon: but.edit,
                            timeout: entry.max
                        });
                        decorate.page.staffPassChange.init({
                            timeout: entry.max
                        });
                    });

                    describe('Проверка данных "Общая информация"', () => {
                        describe('Основная информация', () => {
                            decorate.el.input.getValue({
                                title: 'Фамилия',
                                placeholder: 'Фамилия',
                                value: data.staff.staff3.lastName,
                                timeout: entry.max
                            });
                            decorate.el.input.getValue({
                                title: 'Имя',
                                placeholder: 'Имя',
                                value: data.staff.staff3.firstName,
                                timeout: entry.max
                            });
                        });

                        describe('Учетные данные', () => {
                            decorate.el.input.getValue({
                                title: 'Действует с',
                                placeholder: 'Действует с',
                                value: data.staff.staff1.dateIn.date,
                                timeout: entry.max
                            });
                            decorate.el.input.getValue({
                                title: 'Подразделение',
                                placeholder: 'Подразделение',
                                value: data.staff.staff3.division,
                                timeout: entry.max
                            });
                            decorate.el.input.getValue({
                                title: 'Действует до',
                                placeholder: 'Действует до',
                                value: data.staff.staff1.dateAfter.date,
                                timeout: entry.max
                            });
                        });

                    });

                    describe('Нажатие кнопки "Вернуться к списку сотрудников".', () => {
                        decorate.el.button.handler({
                            name: 'Вернуться к списку сотрудников',
                            timeout: entry.max
                        });
                        decorate.page.staffPass.init({
                            timeout: entry.max
                        });
                    });
                });
            });
        }

    });

    const addStaffTabelDuplicateMinParams = () => describe('Персонал / Сотрудники - вкладка - Действующие. ' +
        'Попытка добавление сотрудника с дублированием табеля.', () => {

        befActive();
        aft();

        describe('Открытие страницы добавления', () => {
            decorate.el.butIcBefore.handler({
                icon: but.add,
                timeout: entry.max
            });
            decorate.page.staffChange.initAdd({
                timeout: entry.max
            });
        });

        describe('Ввод данных "Общая информация"', () => {
            describe('Основная информация', () => {
                decorate.el.input.sendKeys({
                    title: 'Фамилия',
                    placeholder: 'Фамилия',
                    value: data.staff.staff1.lastName,
                    timeout: entry.max
                });

                decorate.el.input.sendKeys({
                    title: 'Имя',
                    placeholder: 'Имя',
                    value: data.staff.staff1.firstName,
                    timeout: entry.max
                });

            });

            describe('Учетные данные', () => {
                decorate.el.input.sendKeys({
                    title: 'Табельный номер',
                    placeholder: 'Табельный номер',
                    value: data.staff.staff3.tabelNumber,
                    timeout: entry.max
                });
                decorate.el.selectInput.iconXpand({
                    title: 'Подразделение',
                    placeholder: 'Подразделение',
                    timeout: entry.max
                });
                decorate.el.selectXpand.xpand({
                    timeout: entry.max
                });
                decorate.el.selectXpand.handler({
                    value: data.staff.staff1.division,
                    timeout: entry.max
                });
                decorate.el.selectXpand.xpandNoElement({
                    timeout: entry.max
                });
            });
        });

        describe('Сохранение сотрудника', () => {
            decorate.el.button.handler({
                name: 'Сохранить изменения',
                timeout: entry.max
            });
            decorate.el.error.error({
                text: 'Такой табельный номер уже существует',
                timeout: entry.max
            });
            decorate.el.button.handler({
                name: 'Вернуться к списку сотрудников',
                timeout: entry.max
            });
            decorate.modalConfirm.staffReturn.init({
                timeout: entry.max
            });
            decorate.el.button.handler({
                name: 'Подтвердить',
                timeout: entry.max
            });
            decorate.page.staffActive.init({
                timeout: entry.max
            });
        });
    });

    const addCardStaffMinParams = () => describe(text + 'Добавление карты по кнопке "Выдать карту".', () => {

        if(type === 'active') {
            describe('Проверка таблицы до добавления карты', () => {
                befActive();
                aft();
                decorate.el.table.size({
                    strCount: 1,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'ФИО',
                    strNumber: 1,
                    cellNumber: 2,
                    value: data.staff.staff3.lastName + ' ' + data.staff.staff3.firstName,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Карта',
                    strNumber: 1,
                    cellNumber: 5,
                    value: '',
                    timeout: entry.max
                });
            });

            describe('Добавление карты', () => {
                befActive();
                aft();
                decorate.el.table.strHandler({
                    strNumber: 1,
                    timeout: entry.max
                });
                decorate.el.butIcBefore.handler({
                    icon: but.card_add,
                    timeout: entry.max
                });
                decorate.modal.cardControls.init({
                    timeout: entry.max
                });
                decorate.el.input.sendKeys({
                    title: 'Идентификатор карты',
                    placeholder: '',
                    value: data.staff.staff3.card,
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
                befActive();
                aft();
                decorate.el.table.size({
                    strCount: 1,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'ФИО',
                    strNumber: 1,
                    cellNumber: 2,
                    value: data.staff.staff3.lastName + ' ' + data.staff.staff3.firstName,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Карта',
                    strNumber: 1,
                    cellNumber: 5,
                    value: data.staff.staff3.card,
                    timeout: entry.max
                });
            });
        }

        if(type === 'pass') {
            describe('Проверка таблицы до добавления карты', () => {
                befPass();
                aft();
                decorate.el.table.size({
                    strCount: 1,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Сотрудник',
                    strNumber: 1,
                    cellNumber: 2,
                    value: data.staff.staff3.lastName + ' ' + data.staff.staff3.firstName,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Карта',
                    strNumber: 1,
                    cellNumber: 7,
                    value: '',
                    timeout: entry.max
                });
            });

            describe('Добавление карты', () => {
                befPass();
                aft();
                decorate.el.table.strHandler({
                    strNumber: 1,
                    timeout: entry.max
                });
                decorate.el.butIcBefore.handler({
                    icon: but.card_add,
                    timeout: entry.max
                });
                decorate.modal.cardControls.init({
                    timeout: entry.max
                });
                decorate.el.input.sendKeys({
                    title: 'Идентификатор карты',
                    placeholder: '',
                    value: data.staff.staff3.card,
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
                befPass();
                aft();
                decorate.el.table.size({
                    strCount: 1,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Сотрудник',
                    strNumber: 1,
                    cellNumber: 2,
                    value: data.staff.staff3.lastName + ' ' + data.staff.staff3.firstName,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Карта',
                    strNumber: 1,
                    cellNumber: 7,
                    value: data.staff.staff3.card,
                    timeout: entry.max
                });
            });
        }
    });

    const addCardDuplicateStaffMinParams = () => describe('Персонал / Сотрудники - вкладка - Действующие. ' +
        'Попытка добавление сотрудника с дублированием карты', () => {

        befActive();
        aft();

        describe('Открытие страницы добавления', () => {
            decorate.el.butIcBefore.handler({
                icon: but.add,
                timeout: entry.max
            });
            decorate.page.staffChange.initAdd({
                timeout: entry.max
            });
        });

        describe('Ввод данных "Общая информация"', () => {
            describe('Основная информация', () => {
                decorate.el.input.sendKeys({
                    title: 'Фамилия',
                    placeholder: 'Фамилия',
                    value: data.staff.staff1.lastName,
                    timeout: entry.max
                });

                decorate.el.input.sendKeys({
                    title: 'Имя',
                    placeholder: 'Имя',
                    value: data.staff.staff1.firstName,
                    timeout: entry.max
                });

            });

            describe('Учетные данные', () => {
                decorate.el.input.sendKeys({
                    title: 'Табельный номер',
                    placeholder: 'Табельный номер',
                    value: data.staff.staff1.tabelNumber,
                    timeout: entry.max
                });
                decorate.el.selectInput.iconXpand({
                    title: 'Подразделение',
                    placeholder: 'Подразделение',
                    timeout: entry.max
                });
                decorate.el.selectXpand.xpand({
                    timeout: entry.max
                });
                decorate.el.selectXpand.handler({
                    value: data.staff.staff1.division,
                    timeout: entry.max
                });
                decorate.el.selectXpand.xpandNoElement({
                    timeout: entry.max
                });
            });
        });

        describe('Ввод данных "Карта доступа"', () => {

            describe('Открытие информации "Карта доступа"', () => {
                decorate.el.simpleCell.handler({
                    name: 'Карта доступа',
                    timeout: entry.max
                });
                decorate.el.simpleCell.active({
                    name: 'Карта доступа',
                    timeout: entry.max
                });
            });

            describe(`Добавление идентификатора "Основная карта" ${data.staff.staff3.card}`, () => {
                decorate.el.input.iconCard({
                    title: 'Идентификатор',
                    placeholder: '',
                    timeout: entry.max
                });
                decorate.modal.cardControlsAdd.init({
                    timeout: entry.max
                });
                decorate.modal.cardControlsNumber.inputSendKeys({
                    title: 'Идентификатор карты',
                    placeholder: '',
                    value: data.staff.staff3.card,
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

        describe('Сохранение сотрудника', () => {
            decorate.el.button.handler({
                name: 'Сохранить изменения',
                timeout: entry.max
            });
            decorate.el.error.error({
                text: 'Карта 21 уже используется у сотрудника "last3 name3 ", подразделение division3 в качестве карты',
                timeout: entry.max
            });
            decorate.el.button.handler({
                name: 'Вернуться к списку сотрудников',
                timeout: entry.max
            });
            decorate.modalConfirm.staffReturn.init({
                timeout: entry.max
            });
            decorate.el.button.handler({
                name: 'Подтвердить',
                timeout: entry.max
            });
            decorate.page.staffActive.init({
                timeout: entry.max
            });
        });

    });

    const deleteCardStaffMinParams = () => describe(text + 'Удаление карты по кнопке "Удалить карту".', () => {

        if(type === 'active') {
            describe('Проверка таблицы до удаления карты', () => {
                befActive();
                aft();
                decorate.el.table.size({
                    strCount: 1,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'ФИО',
                    strNumber: 1,
                    cellNumber: 2,
                    value: data.staff.staff3.lastName + ' ' + data.staff.staff3.firstName,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Карта',
                    strNumber: 1,
                    cellNumber: 5,
                    value: data.staff.staff3.card,
                    timeout: entry.max
                });
            });

            describe('Удаление карты', () => {
                befActive();
                aft();
                decorate.el.table.strHandler({
                    strNumber: 1,
                    timeout: entry.max
                });
                decorate.el.butIcBefore.handler({
                    icon: but.card_delete,
                    timeout: entry.max
                });
                decorate.modalConfirm.staffDeleteCard.init({
                    timeout: entry.max
                });
                decorate.el.button.handler({
                    name: 'Удалить',
                    timeout: entry.max
                });
                decorate.modalConfirm.staffDeleteCard.initClose({
                    timeout: entry.max
                });
            });

            describe('Проверка таблицы после удаления карты', () => {
                befActive();
                aft();
                decorate.el.table.size({
                    strCount: 1,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'ФИО',
                    strNumber: 1,
                    cellNumber: 2,
                    value: data.staff.staff3.lastName + ' ' + data.staff.staff3.firstName,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Карта',
                    strNumber: 1,
                    cellNumber: 5,
                    value: '',
                    timeout: entry.max
                });
            });
        }

        if(type === 'pass') {

            describe('Проверка таблицы до удаления карты', () => {
                befPass();
                aft();
                decorate.el.table.size({
                    strCount: 1,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Сотрудник',
                    strNumber: 1,
                    cellNumber: 2,
                    value: data.staff.staff3.lastName + ' ' + data.staff.staff3.firstName,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Карта',
                    strNumber: 1,
                    cellNumber: 7,
                    value: data.staff.staff3.card,
                    timeout: entry.max
                });
            });

            describe('Удаление карты', () => {
                befPass();
                aft();
                decorate.el.table.strHandler({
                    strNumber: 1,
                    timeout: entry.max
                });
                decorate.el.butIcBefore.handler({
                    icon: but.card_delete,
                    timeout: entry.max
                });
                decorate.modalConfirm.staffDeleteCard.init({
                    timeout: entry.max
                });
                decorate.el.button.handler({
                    name: 'Удалить',
                    timeout: entry.max
                });
                decorate.modalConfirm.staffDeleteCard.initClose({
                    timeout: entry.max
                });
            });

            describe('Проверка таблицы после удаления карты', () => {
                befPass();
                aft();
                decorate.el.table.size({
                    strCount: 1,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Сотрудник',
                    strNumber: 1,
                    cellNumber: 2,
                    value: data.staff.staff3.lastName + ' ' + data.staff.staff3.firstName,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Карта',
                    strNumber: 1,
                    cellNumber: 7,
                    value: '',
                    timeout: entry.max
                });
            });

        }

    });

    const blockCardStaffMinParams = () => describe(text + 'Заблокировать сотрудника по кнопке "Заблокировать".', () => {

        if(type === 'active') {
            describe('Проверка таблицы до блокирования сотрудника', () => {
                befActive();
                aft();
                decorate.el.table.size({
                    strCount: 1,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'ФИО',
                    strNumber: 1,
                    cellNumber: 2,
                    value: data.staff.staff3.lastName + ' ' + data.staff.staff3.firstName,
                    timeout: entry.max
                });
                decorate.el.table.cellNoIconLock({
                    strNumber: 1,
                    cellNumber: 7,
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
                decorate.modalConfirm.staffBlock.init({
                    timeout: entry.max
                });
                decorate.el.button.handler({
                    name: 'Заблокировать',
                    timeout: entry.max
                });
                decorate.modalConfirm.staffBlock.initClose({
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
                    headTitle: 'ФИО',
                    strNumber: 1,
                    cellNumber: 2,
                    value: data.staff.staff3.lastName + ' ' + data.staff.staff3.firstName,
                    timeout: entry.max
                });
                decorate.el.table.cellGetIconLock({
                    strNumber: 1,
                    cellNumber: 7,
                    timeout: entry.max
                });
            });
        }

        if(type === 'pass') {
            describe('Проверка таблицы до блокирования сотрудника', () => {
                befPass();
                aft();
                decorate.el.table.size({
                    strCount: 1,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Сотрудник',
                    strNumber: 1,
                    cellNumber: 2,
                    value: data.staff.staff3.lastName + ' ' + data.staff.staff3.firstName,
                    timeout: entry.max
                });
                decorate.el.table.cellNoIconLock({
                    strNumber: 1,
                    cellNumber: 5,
                    timeout: entry.max
                });
            });

            describe('Заблокировать', () => {
                befPass();
                aft();
                decorate.el.table.strHandler({
                    strNumber: 1,
                    timeout: entry.max
                });
                decorate.el.butIcBefore.handler({
                    icon: but.lock,
                    timeout: entry.max
                });
                decorate.modalConfirm.staffBlock.init({
                    timeout: entry.max
                });
                decorate.el.button.handler({
                    name: 'Заблокировать',
                    timeout: entry.max
                });
                decorate.modalConfirm.staffBlock.initClose({
                    timeout: entry.max
                });
            });

            describe('Проверка таблицы после блокирования сотрудника', () => {
                befPass();
                aft();
                decorate.el.table.size({
                    strCount: 1,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Сотрудник',
                    strNumber: 1,
                    cellNumber: 2,
                    value: data.staff.staff3.lastName + ' ' + data.staff.staff3.firstName,
                    timeout: entry.max
                });
                decorate.el.table.cellGetIconLock({
                    strNumber: 1,
                    cellNumber: 5,
                    timeout: entry.max
                });
            });
        }
    });

    const unblockCardStaffMinParams = () => describe(text +
        'Разблокировать сотрудника по кнопке "Разблокировать".', () => {

        if(type === 'active') {
            describe('Проверка таблицы до разблокирования сотрудника', () => {
                befActive();
                aft();
                decorate.el.table.size({
                    strCount: 1,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'ФИО',
                    strNumber: 1,
                    cellNumber: 2,
                    value: data.staff.staff3.lastName + ' ' + data.staff.staff3.firstName,
                    timeout: entry.max
                });
                decorate.el.table.cellGetIconLock({
                    strNumber: 1,
                    cellNumber: 7,
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
                decorate.modalConfirm.staffUnBlock.init({
                    timeout: entry.max
                });
                decorate.el.button.handler({
                    name: 'Разблокировать',
                    timeout: entry.max
                });
                decorate.modalConfirm.staffUnBlock.initClose({
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
                    headTitle: 'ФИО',
                    strNumber: 1,
                    cellNumber: 2,
                    value: data.staff.staff3.lastName + ' ' + data.staff.staff3.firstName,
                    timeout: entry.max
                });
                decorate.el.table.cellNoIconLock({
                    strNumber: 1,
                    cellNumber: 7,
                    timeout: entry.max
                });
            });
        }

        if(type === 'pass') {
            describe('Проверка таблицы до разблокирования сотрудника', () => {
                befPass();
                aft();
                decorate.el.table.size({
                    strCount: 1,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Сотрудник',
                    strNumber: 1,
                    cellNumber: 2,
                    value: data.staff.staff3.lastName + ' ' + data.staff.staff3.firstName,
                    timeout: entry.max
                });
                decorate.el.table.cellGetIconLock({
                    strNumber: 1,
                    cellNumber: 5,
                    timeout: entry.max
                });
            });

            describe('Разблокировать', () => {
                befPass();
                aft();
                decorate.el.table.strHandler({
                    strNumber: 1,
                    timeout: entry.max
                });
                decorate.el.butIcBefore.handler({
                    icon: but.unlock,
                    timeout: entry.max
                });
                decorate.modalConfirm.staffUnBlock.init({
                    timeout: entry.max
                });
                decorate.el.button.handler({
                    name: 'Разблокировать',
                    timeout: entry.max
                });
                decorate.modalConfirm.staffUnBlock.initClose({
                    timeout: entry.max
                });
            });

            describe('Проверка таблицы после разблокирования сотрудника', () => {
                befPass();
                aft();
                decorate.el.table.size({
                    strCount: 1,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Сотрудник',
                    strNumber: 1,
                    cellNumber: 2,
                    value: data.staff.staff3.lastName + ' ' + data.staff.staff3.firstName,
                    timeout: entry.max
                });
                decorate.el.table.cellNoIconLock({
                    strNumber: 1,
                    cellNumber: 5,
                    timeout: entry.max
                });
            });
        }
    });

    const addBarcodeStaffMinParams = () => describe(text +
        'Добавление штрихкода сотруднику по кнопке "Выдать штрихкод"', () => {

        if(type === 'active') {


            describe('Проверка таблицы до добавления штрихкода', () => {
                befActive();
                aft();
                decorate.el.table.size({
                    strCount: 1,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'ФИО',
                    strNumber: 1,
                    cellNumber: 2,
                    value: data.staff.staff3.lastName + ' ' + data.staff.staff3.firstName,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Штрихкод',
                    strNumber: 1,
                    cellNumber: 6,
                    value: '',
                    timeout: entry.max
                });
            });

            describe('Добавление штрикода по кнопке "Выдать штрихкод"', () => {
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
                        value: data.staff.staff3.barcode,
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
                decorate.el.table.size({
                    strCount: 1,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'ФИО',
                    strNumber: 1,
                    cellNumber: 2,
                    value: data.staff.staff3.lastName + ' ' + data.staff.staff3.firstName,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Штрихкод',
                    strNumber: 1,
                    cellNumber: 6,
                    value: data.staff.staff3.barcode,
                    timeout: entry.max
                });
            });
        }

        if(type === 'pass') {

            describe('Проверка таблицы до добавления штрихкода', () => {
                befPass();
                aft();
                decorate.el.table.size({
                    strCount: 1,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Сотрудник',
                    strNumber: 1,
                    cellNumber: 2,
                    value: data.staff.staff3.lastName + ' ' + data.staff.staff3.firstName,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Штрихкод',
                    strNumber: 1,
                    cellNumber: 8,
                    value: '',
                    timeout: entry.max
                });
            });

            describe('Добавление штрикода по кнопке "Выдать штрихкод"', () => {
                befPass();
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
                        value: data.staff.staff3.barcode,
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
                })

            });

            describe('Проверка таблицы после добавления штрихкода', () => {
                befPass();
                aft();
                decorate.el.table.size({
                    strCount: 1,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Сотрудник',
                    strNumber: 1,
                    cellNumber: 2,
                    value: data.staff.staff3.lastName + ' ' + data.staff.staff3.firstName,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Штрихкод',
                    strNumber: 1,
                    cellNumber: 8,
                    value: data.staff.staff3.barcode,
                    timeout: entry.max
                });
            });
        }
    });

    const addBarcodeDuplicateStaffMinParams = () => describe('Персонал / Сотрудники - вкладка - Действующие. ' +
        'Попытка добавление сотрудника с дублированием штрихкода', () => {

        befActive();
        aft();

        describe('Открытие страницы добавления', () => {
            decorate.el.butIcBefore.handler({
                icon: but.add,
                timeout: entry.max
            });
            decorate.page.staffChange.initAdd({
                timeout: entry.max
            });
        });

        describe('Ввод данных "Общая информация"', () => {
            describe('Основная информация', () => {
                decorate.el.input.sendKeys({
                    title: 'Фамилия',
                    placeholder: 'Фамилия',
                    value: data.staff.staff1.lastName,
                    timeout: entry.max
                });

                decorate.el.input.sendKeys({
                    title: 'Имя',
                    placeholder: 'Имя',
                    value: data.staff.staff1.firstName,
                    timeout: entry.max
                });

            });

            describe('Учетные данные', () => {
                decorate.el.input.sendKeys({
                    title: 'Табельный номер',
                    placeholder: 'Табельный номер',
                    value: data.staff.staff1.tabelNumber,
                    timeout: entry.max
                });
                decorate.el.selectInput.iconXpand({
                    title: 'Подразделение',
                    placeholder: 'Подразделение',
                    timeout: entry.max
                });
                decorate.el.selectXpand.xpand({
                    timeout: entry.max
                });
                decorate.el.selectXpand.handler({
                    value: data.staff.staff1.division,
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
                    value: data.staff.staff3.barcode,
                    timeout: entry.max
                });
            });
        });

        describe('Сохранение сотрудника', () => {
            decorate.el.button.handler({
                name: 'Сохранить изменения',
                timeout: entry.max
            });
            decorate.el.error.error({
                text: 'Карта 1462846716368 уже используется у сотрудника "last3 name3 ", подразделение division3 в ' +
                    'качестве штрих-кода',
                timeout: entry.max
            });
            decorate.el.button.handler({
                name: 'Вернуться к списку сотрудников',
                timeout: entry.max
            });
            decorate.modalConfirm.staffReturn.init({
                timeout: entry.max
            });
            decorate.el.button.handler({
                name: 'Подтвердить',
                timeout: entry.max
            });
            decorate.page.staffActive.init({
                timeout: entry.max
            });
        });
    });

    const deleteBarcodeStaffMinParams = () => describe(text +
        'Удаление штрихкода сотруднику по кнопке "Удалить штрихкод"', () => {

        if(type === 'active') {
            describe('Проверка таблицы до удаления штрихкода', () => {
                befActive();
                aft();
                decorate.el.table.size({
                    strCount: 1,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'ФИО',
                    strNumber: 1,
                    cellNumber: 2,
                    value: data.staff.staff3.lastName + ' ' + data.staff.staff3.firstName,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Штрихкод',
                    strNumber: 1,
                    cellNumber: 6,
                    value: data.staff.staff3.barcode,
                    timeout: entry.max
                });
            });

            describe('Удаление штрихкода', () => {
                befActive();
                aft();
                decorate.el.table.strHandler({
                    strNumber: 1,
                    timeout: entry.max
                });
                decorate.el.butIcBefore.handler({
                    icon: but.barcode_delete,
                    timeout: entry.max
                });
                decorate.modalConfirm.staffChangeDeleteBarcode.init({
                    timeout: entry.max
                });
                decorate.el.button.handler({
                    name: 'Удалить',
                    timeout: entry.max
                });
                decorate.modalConfirm.staffChangeDeleteBarcode.initClose({
                    timeout: entry.max
                });
            });

            describe('Проверка таблицы после удаления штрихкода', () => {
                befActive();
                aft();
                decorate.el.table.size({
                    strCount: 1,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'ФИО',
                    strNumber: 1,
                    cellNumber: 2,
                    value: data.staff.staff3.lastName + ' ' + data.staff.staff3.firstName,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Штрихкод',
                    strNumber: 1,
                    cellNumber: 6,
                    value: '',
                    timeout: entry.max
                });
            });
        }

        if(type === 'pass') {
            describe('Проверка таблицы до удаления штрихкода', () => {
                befPass();
                aft();
                decorate.el.table.size({
                    strCount: 1,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Сотрудник',
                    strNumber: 1,
                    cellNumber: 2,
                    value: data.staff.staff3.lastName + ' ' + data.staff.staff3.firstName,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Штрихкод',
                    strNumber: 1,
                    cellNumber: 8,
                    value: data.staff.staff3.barcode,
                    timeout: entry.max
                });
            });

            describe('Удаление штрихкода', () => {
                befPass();
                aft();
                decorate.el.table.strHandler({
                    strNumber: 1,
                    timeout: entry.max
                });
                decorate.el.butIcBefore.handler({
                    icon: but.barcode_delete,
                    timeout: entry.max
                });
                decorate.modalConfirm.staffChangeDeleteBarcode.init({
                    timeout: entry.max
                });
                decorate.el.button.handler({
                    name: 'Удалить',
                    timeout: entry.max
                });
                decorate.modalConfirm.staffChangeDeleteBarcode.initClose({
                    timeout: entry.max
                });
            });

            describe('Проверка таблицы после удаления штрихкода', () => {
                befPass();
                aft();
                decorate.el.table.size({
                    strCount: 1,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Сотрудник',
                    strNumber: 1,
                    cellNumber: 2,
                    value: data.staff.staff3.lastName + ' ' + data.staff.staff3.firstName,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Штрихкод',
                    strNumber: 1,
                    cellNumber: 8,
                    value: '',
                    timeout: entry.max
                });
            });
        }
    });

    const dimissedRestoreStaffMinParams = () => describe(text +
        'Увольнение и востановление сотрудника c минимальными праметрами без изменения.', () => {

        describe('Увольнение', () => {
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
            decorate.modal.dimissStaff.init({
                timeout: entry.max
            });
            decorate.el.input.iconCalendar({
                title: 'Дата увольнения',
                placeholder: '',
                timeout: entry.max
            });
            decorate.el.datepicker.dateParse({
                day: data.date.day,
                month: data.date.month,
                year: data.date.year,
                scrollYear: -500,
                timeout: entry.max
            });
            decorate.el.button.handler({
                name: 'Уволить',
                timeout: entry.max
            });
            decorate.el.success.success({
                text: 'Операция успешно завершена',
                timeout: entry.max
            });
            decorate.modal.dimissStaff.initClose({
                timeout: entry.max
            });
            decorate.el.table.noStr({
                timeout: entry.max
            });
        });

        if(type === 'pass') {
            describe('Проверка таблицы', () => {
                befPass();
                aft();
                decorate.el.table.noStr({
                    timeout: entry.max
                });
                decorate.el.rowEmpty.getText({
                    value: 'Нет данных для отображения',
                    timeout: entry.max
                });
            });
        }

        describe('Восстановление', () => {
            befDismissed();
            aft();
            decorate.el.table.strHandler({
                strNumber: 1,
                timeout: entry.max
            });
            decorate.el.button.handler({
                name: 'Восстановить сотрудника',
                timeout: entry.max
            });
            it('Ожидание 2 секунды', async () => await  page.base.loading(2000));
            decorate.el.menu.menu({
                timeout: entry.max
            });
            decorate.el.menu.handler({
                name: 'Восстановить',
                timeout: entry.max
            });
            decorate.el.success.success({
                text: 'Сотрудник восстановлен',
                timeout: entry.max
            });
        });

        if(type === 'active') {
            describe('Проверка таблицы', () => {
                befActive();
                aft();
                decorate.el.table.size({
                    strCount: 1,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'ФИО',
                    strNumber: 1,
                    cellNumber: 2,
                    value: data.staff.staff3.lastName + ' ' + data.staff.staff3.firstName,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Табельный номер',
                    strNumber: 1,
                    cellNumber: 3,
                    value: data.staff.staff3.tabelNumber,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Дата приема',
                    strNumber: 1,
                    cellNumber: 4,
                    value: data.staff.staff3.dateIn.date.substr(0, 10),
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Карта',
                    strNumber: 1,
                    cellNumber: 5,
                    value: '',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Штрихкод',
                    strNumber: 1,
                    cellNumber: 6,
                    value: '',
                    timeout: entry.max
                });
                decorate.el.table.cellNoIconLock({
                    strNumber: 1,
                    cellNumber: 7,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Подразделение',
                    strNumber: 1,
                    cellNumber: 8,
                    value: data.staff.staff3.division,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Должность',
                    strNumber: 1,
                    cellNumber: 9,
                    value: '',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'График работы',
                    strNumber: 1,
                    cellNumber: 10,
                    value: '',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Шаблон доступа',
                    strNumber: 1,
                    cellNumber: 11,
                    value: '',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Транспортное средство',
                    strNumber: 1,
                    cellNumber: 13,
                    value: '',
                    timeout: entry.max
                });
            });
        }

        if(type === 'pass') {
            describe('Проверка таблицы', () => {
                befPass();
                aft();
                decorate.el.table.size({
                    strCount: 1,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Сотрудник',
                    strNumber: 1,
                    cellNumber: 2,
                    value: data.staff.staff3.lastName + ' ' + data.staff.staff3.firstName,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Должность',
                    strNumber: 1,
                    cellNumber: 3,
                    value: '',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Подразделение',
                    strNumber: 1,
                    cellNumber: 4,
                    value: data.staff.staff3.division,
                    timeout: entry.max
                });
                decorate.el.table.cellNoIconLock({
                    strNumber: 1,
                    cellNumber: 5,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Шаблон доступа',
                    strNumber: 1,
                    cellNumber: 6,
                    value: '',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Карта',
                    strNumber: 1,
                    cellNumber: 7,
                    value: '',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Штрихкод',
                    strNumber: 1,
                    cellNumber: 8,
                    value: '',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Действует с',
                    strNumber: 1,
                    cellNumber: 9,
                    value: data.staff.staff1.dateIn.date + ':00',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Действует до',
                    strNumber: 1,
                    cellNumber: 10,
                    value: data.staff.staff1.dateAfter.date + ':00',
                    timeout: entry.max
                });
                decorate.el.table.cellImg({
                    headTitle: 'Фотография',
                    strNumber: 1,
                    cellNumber: 11,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Транспортное средство',
                    strNumber: 1,
                    cellNumber: 12,
                    value: data.staff.staff1.ts.arrTS.map(obj => obj.number + ' ' + obj.model).join(';'),
                    timeout: entry.max
                });
            });
        }
    });

    const searchFilterStaffActive = () => describe(text + 'Проверка фильтра "Поиск...".', () => {

        if(type === 'active') {
            befActive();
            aft();

            describe('Проверка таблицы до изпользования фильтра "Поиск..."', () => {
                decorate.el.table.size({
                    strCount: 2,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'ФИО',
                    strNumber: 1,
                    cellNumber: 2,
                    value: data.staff.staff1.fio,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'ФИО',
                    strNumber: 2,
                    cellNumber: 2,
                    value: data.staff.staff2.fio,
                    timeout: entry.max
                });
            });

            describe(`Ввод в фильтр "${data.staff.staff2.lastName}"`, () => {
                decorate.el.input.sendKeys({
                    title: '',
                    placeholder: 'Поиск...',
                    value: data.staff.staff2.lastName,
                    timeout: entry.max
                });
            });

            describe('Проверка таблицы после измпользования фильтра "Поиск..."', () => {
                decorate.el.table.size({
                    strCount: 1,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'ФИО',
                    strNumber: 1,
                    cellNumber: 2,
                    value: data.staff.staff2.fio,
                    timeout: entry.max
                });
            });

            describe(`Удаление "${data.staff.staff2.lastName}" из фильтра "Поиск..." и проверка таблицы`, () => {
                decorate.el.input.backSpace({
                    title: '',
                    placeholder: 'Поиск...',
                    timeout: entry.max
                });
                dec.animation();
                decorate.el.table.size({
                    strCount: 2,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'ФИО',
                    strNumber: 1,
                    cellNumber: 2,
                    value: data.staff.staff1.fio,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'ФИО',
                    strNumber: 2,
                    cellNumber: 2,
                    value: data.staff.staff2.fio,
                    timeout: entry.max
                });
            });
        }

        if(type === 'pass') {
            befPass();
            aft();

            describe('Проверка таблицы до изпользования фильтра "Поиск..."', () => {
                decorate.el.table.size({
                    strCount: 2,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Сотрудник',
                    strNumber: 1,
                    cellNumber: 2,
                    value: data.staff.staff2.fio,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Сотрудник',
                    strNumber: 2,
                    cellNumber: 2,
                    value: data.staff.staff1.fio,
                    timeout: entry.max
                });
            });

            describe(`Ввод в фильтр "${data.staff.staff2.lastName}"`, () => {
                decorate.el.input.sendKeys({
                    title: '',
                    placeholder: 'Поиск...',
                    value: data.staff.staff2.lastName,
                    timeout: entry.max
                });
            });

            describe('Проверка таблицы после измпользования фильтра "Поиск..."', () => {
                decorate.el.table.size({
                    strCount: 1,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Сотрудник',
                    strNumber: 1,
                    cellNumber: 2,
                    value: data.staff.staff2.fio,
                    timeout: entry.max
                });
            });

            describe(`Удаление "${data.staff.staff2.lastName}" из фильтра "Поиск..." и проверка таблицы`, () => {
                decorate.el.input.backSpace({
                    title: '',
                    placeholder: 'Поиск...',
                    timeout: entry.max
                });
                dec.animation();
                decorate.el.table.size({
                    strCount: 2,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Сотрудник',
                    strNumber: 1,
                    cellNumber: 2,
                    value: data.staff.staff2.fio,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Сотрудник',
                    strNumber: 2,
                    cellNumber: 2,
                    value: data.staff.staff1.fio,
                    timeout: entry.max
                });
            });
        }
    });

    const divisionFilterStaffActive = () => describe(text + 'Проверка фильтра "Подразделение".', () => {

        if(type === 'active') {
            befActive();
            aft();

            describe('Проверка таблицы до изпользования фильтра "Подразделение"', () => {
                decorate.el.table.size({
                    strCount: 2,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Подразделение',
                    strNumber: 1,
                    cellNumber: 8,
                    value: data.divisions.division1.name,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Подразделение',
                    strNumber: 2,
                    cellNumber: 8,
                    value: data.divisions.division2.name,
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
            });

            describe('Проверка таблицы после изпользования фильтра "Подразделение" через окно выбора', () => {
                decorate.el.table.size({
                    strCount: 1,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Подразделение',
                    strNumber: 1,
                    cellNumber: 8,
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
            });

            describe('Проверка таблицы после изпользования фильтра "Подразделение" через модальное окно "Подразделение"',
                () => {
                    decorate.el.table.size({
                        strCount: 1,
                        timeout: entry.max
                    });
                    decorate.el.table.cellGetText({
                        headTitle: 'Подразделение',
                        strNumber: 1,
                        cellNumber: 8,
                        value: data.divisions.division1.name,
                        timeout: entry.max
                    });
                });
        }

        if(type === 'pass') {
            befPass();
            aft();

            describe('Проверка таблицы до изпользования фильтра "Подразделение"', () => {
                decorate.el.table.size({
                    strCount: 2,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Подразделение',
                    strNumber: 1,
                    cellNumber: 4,
                    value: data.divisions.division2.name,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Подразделение',
                    strNumber: 2,
                    cellNumber: 4,
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
            });

            describe('Проверка таблицы после изпользования фильтра "Подразделение" через окно выбора', () => {
                decorate.el.table.size({
                    strCount: 1,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Подразделение',
                    strNumber: 1,
                    cellNumber: 4,
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
            });

            describe('Проверка таблицы после изпользования фильтра "Подразделение" через модальное окно "Подразделение"',
                () => {
                    decorate.el.table.size({
                        strCount: 1,
                        timeout: entry.max
                    });
                    decorate.el.table.cellGetText({
                        headTitle: 'Подразделение',
                        strNumber: 1,
                        cellNumber: 4,
                        value: data.divisions.division1.name,
                        timeout: entry.max
                    });
                });
        }

    });

    const cardSearchStaffActive = () => describe(text + 'Проверка поиска по номеру карты.', () => {

        if(type === 'active') {
            befActive();
            aft();

            describe('Поиск по карте', () => {
                decorate.el.butIcBefore.handler({
                    icon: but.card_search,
                    timeout: entry.max
                });
                decorate.modal.searchCard.init({
                    timeout: entry.max
                });
                decorate.el.input.sendKeys({
                    title: 'Идентификатор карты',
                    placeholder: '',
                    value: data.staff.staff1.bd.identifier[0].identifier,
                    timeout: entry.max
                });
                decorate.el.button.handler({
                    name: 'Найти',
                    timeout: entry.max
                });
                decorate.page.staffChange.initEdit({
                    timeout: entry.max
                });
            });

            describe('Проверка открывшейся карточки сотрудника', () => {
                describe('Проверка данных "Общая информация"', () => {
                    decorate.el.input.getValue({
                        title: 'Фамилия',
                        placeholder: 'Фамилия',
                        value: data.staff.staff1.bd.last_name,
                        timeout: entry.max
                    });
                    decorate.el.input.getValue({
                        title: 'Имя',
                        placeholder: 'Имя',
                        value: data.staff.staff1.bd.first_name,
                        timeout: entry.max
                    });
                    decorate.el.input.getValue({
                        title: 'Отчество',
                        placeholder: 'Отчество',
                        value: data.staff.staff1.bd.middle_name,
                        timeout: entry.max
                    });
                });

                describe('Проверка данных "Карта доступа"', () => {
                    describe('Открытие информации "Карта доступа"', () => {
                        decorate.el.simpleCell.handler({
                            name: 'Карта доступа',
                            timeout: entry.max
                        });
                        decorate.el.simpleCell.active({
                            name: 'Карта доступа',
                            timeout: entry.max
                        });
                    });
                    describe(`Проверка идентификатора "Основная карта"`, () => {
                        decorate.el.input.getValue({
                            title: 'Идентификатор',
                            placeholder: '',
                            value: data.staff.staff1.bd.identifier[0].identifier,
                            timeout: entry.max
                        });
                    });
                });
            });

            describe('Нажатие кнопки "Вернуться к списку сотрудников".', () => {
                decorate.el.button.handler({
                    name: 'Вернуться к списку сотрудников',
                    timeout: entry.max
                });
                decorate.modalConfirm.staffReturn.init({
                    timeout: entry.max
                });
                decorate.el.button.handler({
                    name: 'Подтвердить',
                    timeout: entry.max
                });
                decorate.page.staffActive.init({
                    timeout: entry.max
                });
            });
        }

        if(type === 'pass') {
            befPass();
            aft();

            describe('Поиск по карте', () => {
                decorate.el.butIcBefore.handler({
                    icon: but.card_search,
                    timeout: entry.max
                });
                decorate.modal.searchCard.init({
                    timeout: entry.max
                });
                decorate.el.input.sendKeys({
                    title: 'Идентификатор карты',
                    placeholder: '',
                    value: data.staff.staff1.bd.identifier[0].identifier,
                    timeout: entry.max
                });
                decorate.el.button.handler({
                    name: 'Найти',
                    timeout: entry.max
                });
                decorate.page.staffPassChange.init({
                    timeout: entry.max
                });
            });

            describe('Проверка открывшейся карточки сотрудника', () => {
                describe('Проверка данных "Общая информация"', () => {
                    decorate.el.input.getValue({
                        title: 'Фамилия',
                        placeholder: 'Фамилия',
                        value: data.staff.staff1.bd.last_name,
                        timeout: entry.max
                    });
                    decorate.el.input.getValue({
                        title: 'Имя',
                        placeholder: 'Имя',
                        value: data.staff.staff1.bd.first_name,
                        timeout: entry.max
                    });
                    decorate.el.input.getValue({
                        title: 'Отчество',
                        placeholder: 'Отчество',
                        value: data.staff.staff1.bd.middle_name,
                        timeout: entry.max
                    });
                });

                describe('Проверка данных "Карта доступа"', () => {
                    describe('Открытие информации "Карта доступа"', () => {
                        decorate.el.simpleCell.handler({
                            name: 'Карта доступа',
                            timeout: entry.max
                        });
                        decorate.el.simpleCell.active({
                            name: 'Карта доступа',
                            timeout: entry.max
                        });
                    });
                    describe(`Проверка идентификатора "Основная карта"`, () => {
                        decorate.el.input.getValue({
                            title: 'Идентификатор',
                            placeholder: '',
                            value: data.staff.staff1.bd.identifier[0].identifier,
                            timeout: entry.max
                        });
                    });
                });
            });

            describe('Нажатие кнопки "Вернуться к списку сотрудников".', () => {
                decorate.el.button.handler({
                    name: 'Вернуться к списку сотрудников',
                    timeout: entry.max
                });
                decorate.page.staffPass.init({
                    timeout: entry.max
                });
            });
        }
    });

    const importMinParamsActive = () => describe('Персонал / Сотрудники - вкладка - Действующие. ' +
        'Проверка импорта с минимальным количеством параметров.', () => {

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
            decorate.modal.importFile.init({
                timeout: entry.max
            });
            decorate.modal.importFile.uploadFile({
                src: imp.staff.importStaff,
                timeout: entry.upload
            });
            decorate.el.select.iconXpand({
                title: 'Имя',
                value: '',
                text: 'Имя',
                timeout: entry.max
            });
            decorate.el.select.iconXpand({
                title: 'Фамилия',
                value: '',
                text: 'Фамилия',
                timeout: entry.max
            });
            decorate.el.selectMulti.iconXpand({
                title: 'Подразделение',
                value: '',
                timeout: entry.max
            });
            decorate.el.selectXpand.xpand({
                timeout: entry.max
            });
            decorate.el.selectXpand.handler({
                value: 'Подразделение',
                timeout: entry.max
            });
            decorate.el.selectXpand.xpandNoElement({
                timeout: entry.max
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
                value: 'Импорт завершен. 0 записей из 1 не было импортировано',
                timeout: entry.max
            });
            decorate.el.button.handler({
                name: 'Готово',
                timeout: entry.max
            });
            decorate.modal.importFile.initClose({
                timeout: entry.max
            });
        });

        describe('Проверка и удаление', () => {
            befActive();
            aft();

            describe('Проверка отображения сотрудника в таблице', () => {
                decorate.el.table.size({
                    strCount: 1,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'ФИО',
                    strNumber: 1,
                    cellNumber: 2,
                    value: data.staff.staff1.lastName + ' ' + data.staff.staff1.firstName,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Дата приема',
                    strNumber: 1,
                    cellNumber: 4,
                    value: data.today,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Карта',
                    strNumber: 1,
                    cellNumber: 5,
                    value: '',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Штрихкод',
                    strNumber: 1,
                    cellNumber: 6,
                    value: '',
                    timeout: entry.max
                });
                decorate.el.table.cellNoIconLock({
                    strNumber: 1,
                    cellNumber: 7,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Подразделение',
                    strNumber: 1,
                    cellNumber: 8,
                    value: data.staff.staff1.division,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Должность',
                    strNumber: 1,
                    cellNumber: 9,
                    value: '',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'График работы',
                    strNumber: 1,
                    cellNumber: 10,
                    value: '',
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Транспортное средство',
                    strNumber: 1,
                    cellNumber: 13,
                    value: '',
                    timeout: entry.max
                });
            });

            describe('Проверка отображения параметров сотрудника', () => {

                describe('Открытие сотрудника на редактирование', () => {
                    decorate.el.table.strHandler({
                        strNumber: 1,
                        timeout: entry.max
                    });
                    decorate.el.butIcBefore.handler({
                        icon: but.edit,
                        timeout: entry.max
                    });
                    decorate.page.staffChange.initEdit({
                        timeout: entry.max
                    });
                });

                describe('Проверка данных "Общая информация"', () => {
                    describe('Основная информация', () => {
                        decorate.el.input.getValue({
                            title: 'Фамилия',
                            placeholder: 'Фамилия',
                            value: data.staff.staff1.lastName,
                            timeout: entry.max
                        });
                        decorate.el.input.getValue({
                            title: 'Имя',
                            placeholder: 'Имя',
                            value: data.staff.staff1.firstName,
                            timeout: entry.max
                        });
                    });
                    describe('Учетные данные', () => {
                        decorate.el.input.getValue({
                            title: 'Дата приема',
                            placeholder: 'Дата приема',
                            value: data.today,
                            timeout: entry.max
                        });
                        decorate.el.input.getValue({
                            title: 'Подразделение',
                            placeholder: 'Подразделение',
                            value: data.staff.staff1.division,
                            timeout: entry.max
                        });
                    });
                });

                describe('Нажатие кнопки "Вернуться к списку сотрудников".', () => {
                    decorate.el.button.handler({
                        name: 'Вернуться к списку сотрудников',
                        timeout: entry.max
                    });
                    it('Ожидание 2 секунды', async () => await page.base.loading(2000));
                    decorate.el.button.handler({
                        name: 'Подтвердить',
                        timeout: entry.max
                    });
                    decorate.page.staffActive.init({
                        timeout: entry.max
                    });
                });
            });

            describe('Удаление сотруднкиа из БД', () => {
                it('Удаление сотрудников', async () => {
                    const cook = await page.base.getCookie('token');
                    const arrStaff = await api.getStaff(cook.text);
                    console.log(arrStaff)
                    const name = data.staff.staff1.lastName + ' ' + data.staff.staff1.firstName + ' ';
                    const staff1 = arrStaff.text.filter(obj => obj.name === name)[0].id;
                    await dec.simple(db.deleteAlUserAdditionalData,
                        [],
                        db.deleteAlUserAdditionalData);
                    await dec.simple(db.deleteUser,
                        [staff1],
                        db.deleteUser);
                });
            });
        });
    });

    const importMaxParamsActive = () => describe('Персонал / Сотрудники - вкладка - Действующие. ' +
        'Проверка импорта с максимальным количеством параметров.', () => {

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
            decorate.modal.importFile.init({
                timeout: entry.max
            });
            decorate.modal.importFile.uploadFile({
                src: imp.staff.importStaff,
                timeout: entry.upload
            });
            decorate.el.select.iconXpand({
                title: 'Имя',
                value: '',
                text: 'Имя',
                timeout: entry.max
            });
            decorate.el.select.iconXpand({
                title: 'Фамилия',
                value: '',
                text: 'Фамилия',
                timeout: entry.max
            });
            decorate.el.select.iconXpand({
                title: 'Отчество',
                value: '',
                text: 'Отчество',
                timeout: entry.max
            });
            decorate.el.select.iconXpand({
                title: 'Табельный номер',
                value: '',
                text: 'Табельный номер',
                timeout: entry.max
            });
            decorate.el.select.iconXpand({
                title: 'Подразделение',
                value: '',
                text: 'Подразделение',
                timeout: entry.max
            });
            decorate.el.select.iconXpand({
                title: 'Должность',
                value: '',
                text: 'Должность',
                timeout: entry.max
            });
            decorate.el.select.iconXpand({
                title: 'Шаблон доступа',
                value: '',
                text: 'Шаблон доступа',
                timeout: entry.max
            });
            decorate.modal.importFile.scrollTop({
                number: '500',
                timeout: entry.max
            });
            decorate.el.select.iconXpand({
                title: 'График работы',
                value: '',
                text: 'График работы',
                timeout: entry.max
            });
            decorate.el.select.iconXpand({
                title: 'Карта доступа',
                value: '',
                text: 'Карта доступа',
                timeout: entry.max
            });
            decorate.el.select.iconXpand({
                title: 'Действует с',
                value: '',
                text: 'Действует с',
                timeout: entry.max
            });
            decorate.el.select.iconXpand({
                title: 'Действует до',
                value: '',
                text: 'Действует до',
                timeout: entry.max
            });
            decorate.el.select.iconXpand({
                title: 'Транспортные средства',
                value: '',
                text: 'Транспортные средства',
                timeout: entry.max
            });
            decorate.el.select.iconXpand({
                title: 'Дата приема',
                value: '',
                text: 'Дата приема',
                timeout: entry.max
            });
            decorate.el.select.iconXpand({
                title: 'Email',
                value: '',
                text: 'Email',
                timeout: entry.max
            });
            decorate.modal.importFile.scrollTop({
                number: '500',
                timeout: entry.max
            });
            decorate.el.select.iconXpand({
                title: 'Телефон',
                value: '',
                text: 'Телефон',
                timeout: entry.max
            });
            decorate.el.select.iconXpand({
                title: 'Пин-код',
                value: '',
                text: 'Пин-код',
                timeout: entry.max
            });
            decorate.el.select.iconXpand({
                title: 'data1',
                value: '',
                text: 'data1',
                timeout: entry.max
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
                value: 'Импорт завершен. 0 записей из 1 не было импортировано',
                timeout: entry.max
            });
            decorate.el.button.handler({
                name: 'Готово',
                timeout: entry.max
            });
            decorate.modal.importFile.initClose({
                timeout: entry.max
            });
        });

        describe('Проверка сотрудника и удаление', () => {

            befActive();
            aft();

            describe('Проверка отображения сотрудника в таблице', () => {
                decorate.el.table.size({
                    strCount: 1,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'ФИО',
                    strNumber: 1,
                    cellNumber: 2,
                    value: data.staff.staff1.lastName + ' ' + data.staff.staff1.firstName + ' ' + data.staff.staff1.middleName,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Табельный номер',
                    strNumber: 1,
                    cellNumber: 3,
                    value: data.staff.staff1.tabelNumber,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Дата приема',
                    strNumber: 1,
                    cellNumber: 4,
                    value: data.staff.staff1.dateIn.date.substr(0, 10),
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Карта',
                    strNumber: 1,
                    cellNumber: 5,
                    value: data.staff.staff1.card.card1,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Штрихкод',
                    strNumber: 1,
                    cellNumber: 6,
                    value: '',
                    timeout: entry.max
                });
                decorate.el.table.cellNoIconLock({
                    strNumber: 1,
                    cellNumber: 7,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Подразделение',
                    strNumber: 1,
                    cellNumber: 8,
                    value: data.staff.staff1.division,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Должность',
                    strNumber: 1,
                    cellNumber: 9,
                    value: data.staff.staff1.position,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'График работы',
                    strNumber: 1,
                    cellNumber: 10,
                    value: data.staff.staff1.schedule,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Транспортное средство',
                    strNumber: 1,
                    cellNumber: 13,
                    value: data.staff.staff1.ts.arrTS.map(obj => obj.number + ' ' + obj.model).join(';'),
                    timeout: entry.max
                });
            });

            describe('Проверка отображения параметров сотрудника', () => {

                describe('Открытие сотрудника на редактирование', () => {
                    decorate.el.table.strHandler({
                        strNumber: 1,
                        timeout: entry.max
                    });
                    decorate.el.butIcBefore.handler({
                        icon: but.edit,
                        timeout: entry.max
                    });
                    decorate.page.staffChange.initEdit({
                        timeout: entry.max
                    });
                });

                describe('Проверка данных "Общая информация"', () => {
                    describe('Основная информация', () => {
                        decorate.el.input.getValue({
                            title: 'Фамилия',
                            placeholder: 'Фамилия',
                            value: data.staff.staff1.lastName,
                            timeout: entry.max
                        });
                        decorate.el.input.getValue({
                            title: 'Имя',
                            placeholder: 'Имя',
                            value: data.staff.staff1.firstName,
                            timeout: entry.max
                        });
                        decorate.el.input.getValue({
                            title: 'Отчество',
                            placeholder: 'Отчество',
                            value: data.staff.staff1.middleName,
                            timeout: entry.max
                        });
                        decorate.el.input.getValue({
                            title: 'Номер телефона',
                            placeholder: 'Номер телефона',
                            value: data.staff.staff1.phone,
                            timeout: entry.max
                        });
                        decorate.el.input.getValue({
                            title: 'E-Mail',
                            placeholder: 'E-Mail',
                            value: data.staff.staff1.mail,
                            timeout: entry.max
                        });
                    });

                    describe('Учетные данные', () => {
                        decorate.el.input.getValue({
                            title: 'Табельный номер',
                            placeholder: 'Табельный номер',
                            value: data.staff.staff1.tabelNumber,
                            timeout: entry.max
                        });
                        decorate.el.input.getValue({
                            title: 'Дата приема',
                            placeholder: 'Дата приема',
                            value: data.staff.staff1.date.date,
                            timeout: entry.max
                        });
                        decorate.el.input.getValue({
                            title: 'Действует с',
                            placeholder: 'Действует с',
                            value: data.staff.staff1.dateIn.date,
                            timeout: entry.max
                        });
                        decorate.el.input.getValue({
                            title: 'Подразделение',
                            placeholder: 'Подразделение',
                            value: data.staff.staff1.division,
                            timeout: entry.max
                        });
                        decorate.el.input.getValue({
                            title: 'Должность',
                            placeholder: 'Должность',
                            value: data.staff.staff1.position,
                            timeout: entry.max
                        });
                        decorate.el.input.getValue({
                            title: 'Действует до',
                            placeholder: 'Действует до',
                            value: data.staff.staff1.dateAfter.date,
                            timeout: entry.max
                        });
                        decorate.el.input.getValue({
                            title: 'График работы',
                            placeholder: 'График работы',
                            value: data.staff.staff1.schedule,
                            timeout: entry.max
                        });
                    });

                    describe('Дополнительные поля', () => {
                        decorate.el.input.getValue({
                            title: 'Пин-код',
                            placeholder: '',
                            value: data.staff.staff1.pinCode,
                            timeout: entry.max
                        });
                        decorate.el.input.getValue({
                            title: data.additionalData.data1Text.name,
                            placeholder: '',
                            value: data.staff.staff1.data1,
                            timeout: entry.max
                        });
                    });
                });

                describe('Проверка данных "Карта доступа"', () => {
                    describe('Открытие информации "Карта доступа"', () => {
                        decorate.el.simpleCell.handler({
                            name: 'Карта доступа',
                            timeout: entry.max
                        });
                        decorate.el.simpleCell.active({
                            name: 'Карта доступа',
                            timeout: entry.max
                        });
                    });

                    describe(`Проверка идентификатора "Основная карта"`, () => {
                        decorate.el.input.getValue({
                            title: 'Идентификатор',
                            placeholder: '',
                            value: data.staff.staff1.card.card1
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

                    data.staff.staff1.ts.arrTS.forEach((obj, index) => {
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

                describe('Нажатие кнопки "Вернуться к списку сотрудников".', () => {
                    decorate.el.button.handler({
                        name: 'Вернуться к списку сотрудников',
                        timeout: entry.max
                    });
                    it('Ожидание 2 секунды', async () => await page.base.loading(2000));
                    decorate.el.button.handler({
                        name: 'Подтвердить',
                        timeout: entry.max
                    });
                    decorate.page.staffActive.init({
                        timeout: entry.max
                    });
                });
            });

            describe('Удаление сотрудника из БД', () => {
                it('Удаление сотрудников', async () => {
                    const cook = await page.base.getCookie('token');
                    const arrStaff = await api.getStaff(cook.text);
                    const staff1 = arrStaff.text.filter(obj => obj.name === data.staff.staff1.fio)[0].id;
                    await dec.simple(db.deleteAlUserAdditionalData,
                        [],
                        db.deleteAlUserAdditionalData);
                    await dec.simple(db.deleteUser,
                        [staff1],
                        db.deleteUser);
                });
            });
        });
    });

    const importFailedParamsActive = () => describe('Персонал / Сотрудники - вкладка - Действующие. ' +
        'Проверка импорта с ошибкой - без подразделения.', () => {

        const params = {
            fileName: 'unimported.xlsx',
            json: [
                {
                    'Отчет "Неимпортированные данные"': 'Фамилия',
                    __EMPTY: 'Имя',
                    __EMPTY_1: 'Отчество',
                    __EMPTY_2: 'Табельный номер',
                    __EMPTY_3: 'Дата приема',
                    __EMPTY_4: 'Действует с',
                    __EMPTY_5: 'Действует до',
                    __EMPTY_6: 'Подразделение',
                    __EMPTY_7: 'Должность',
                    __EMPTY_8: 'Шаблон доступа',
                    __EMPTY_9: 'График работы',
                    __EMPTY_10: 'Карта доступа',
                    __EMPTY_11: 'Email',
                    __EMPTY_12: 'Телефон',
                    __EMPTY_13: 'Пин-код',
                    __EMPTY_14: 'data1',
                    __EMPTY_15: 'Транспортные средства',
                    __EMPTY_16: '__EMPTY',
                    __EMPTY_17: '__EMPTY_1',
                    __EMPTY_18: 'Ошибка'
                },
                {
                    'Отчет "Неимпортированные данные"': 'last1',
                    __EMPTY: 'name1',
                    __EMPTY_1: 'middle1',
                    __EMPTY_2: 'tabel1',
                    __EMPTY_3: '2023-06-01',
                    __EMPTY_4: '2023-06-01 00:00:00',
                    __EMPTY_5: '2033-06-01 23:00:00',
                    __EMPTY_6: 'division1',
                    __EMPTY_7: 'position1',
                    __EMPTY_8: 'template1',
                    __EMPTY_9: 'schedule1',
                    __EMPTY_10: 1,
                    __EMPTY_11: 'zybrik0007@rambler.ru',
                    __EMPTY_12: '+79819314277',
                    __EMPTY_13: 'test-123456',
                    __EMPTY_14: 'testtext',
                    __EMPTY_15: 'abc123 xyz123;abc1234 xyz1234;abc12345 xyz12345;abc12346 xyz123456',
                    __EMPTY_16: '',
                    __EMPTY_17: '',
                    __EMPTY_18: 'Отсутствует обязательное поле Подразделение'
                }
            ]
        }

        befActive();
        aft();

        describe('Импорт', () => {

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
            decorate.modal.importFile.init({
                timeout: entry.max
            });
            decorate.modal.importFile.uploadFile({
                src: imp.staff.importStaff,
                timeout: entry.upload
            });
            decorate.el.select.iconXpand({
                title: 'Имя',
                value: '',
                text: 'Имя',
                timeout: entry.max
            });
            decorate.el.select.iconXpand({
                title: 'Фамилия',
                value: '',
                text: 'Фамилия',
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
            decorate.modal.importFile.initClose({
                timeout: entry.max
            });
            it('Ожидание 2 секунды', async () => await page.base.loading(2000));
        });

        describe('Проверка таблицы', () => {
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
                json: params.json
            });
            decorate.el.file.delete({
                file: params.fileName,
                timeout: entry.upload
            });
        });
    });

    const deleteCardStaffPass = () => describe('Бюро пропусков / Сотрудники. Удаление карт у сотруднкиа', () => {

        describe('Редактирвоание', () => {
            befPass();
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
                decorate.page.staffPassChange.init({
                    timeout: entry.max
                });
            });

            describe('Изменение данных "Карта доступа"', () => {
                describe('Открытие информации "Карта доступа"', () => {
                    decorate.el.simpleCell.handler({
                        name: 'Карта доступа',
                        timeout: entry.max
                    });
                    decorate.el.simpleCell.active({
                        name: 'Карта доступа',
                        timeout: entry.max
                    });
                });

                describe('Удаление дополнительных карт доступа', () => {
                    [...Array(9).keys()].forEach((item, index) => {
                        describe(`Удаление карты`, () => {
                            decorate.page.staffChange.deleteCardAdditional({
                                cardNumber: 1,
                                timeout: entry.max
                            });
                            decorate.modalConfirm.staffDeleteCard.init({
                                timeout: entry.max
                            });
                            decorate.el.button.handler({
                                name: 'Подтвердить',
                                timeout: entry.max
                            });
                            decorate.modalConfirm.staffDeleteCard.initClose({
                                timeout: entry.max
                            });
                        });
                    });
                });

                describe('Удаление основной карты', () => {
                    decorate.el.input.iconClear({
                        title: 'Идентификатор',
                        placeholder: '',
                        timeout: entry.max
                    });
                    decorate.modalConfirm.staffDeleteCard.init({
                        timeout: entry.max
                    });
                    decorate.el.button.handler({
                        name: 'Подтвердить',
                        timeout: entry.max
                    });
                    decorate.modalConfirm.staffDeleteCard.initClose({
                        timeout: entry.max
                    });
                });
            });

            describe('Сохранение сотрудника', () => {
                decorate.el.button.handler({
                    name: 'Сохранить изменения',
                    timeout: entry.max
                });
                decorate.el.success.success({
                    text: 'Данные успешно изменены',
                    timeout: entry.max
                });
                decorate.el.button.handler({
                    name: 'Вернуться к списку сотрудников',
                    timeout: entry.max
                });
                decorate.page.staffPass.init({
                    timeout: entry.max
                });
            });
        });

        describe('Проверка таблицы', () => {
            befPass();
            aft();
            decorate.el.table.size({
                strCount: 1,
                timeout: entry.max
            });
            decorate.el.table.cellGetText({
                headTitle: 'Сотрудник',
                strNumber: 1,
                cellNumber: 2,
                value: data.staff.staff3.lastName + ' ' + data.staff.staff3.firstName,
                timeout: entry.max
            });
            decorate.el.table.cellGetText({
                headTitle: 'Карта',
                strNumber: 1,
                cellNumber: 7,
                value: '',
                timeout: entry.max
            });

        });
    });

    return {
        addStaffMaxParams,
        printCardStaffMaxParams,
        printDesignCardStaffMaxParams,
        printBarcodeStaffMaxParams,
        printTableStaffMaxParams,
        exportStaffXLSXMaxParams,
        exportStaffCSVMaxParams,
        dimissedStaffMaxParams,
        openDimissedStaffMaxParams,
        printCardStaffDimissedMaxParams,
        printTableStaffDimissedMaxParams,
        exportTableStaffDimissedXLSXMaxParams,
        exportTableStaffDimissedCSVMaxParams,
        restoreStaffDimissedEditParamsMaxParams,
        editStaffMaxParams,
        dimissedStaff,
        deleteStaff,
        addStaffMinParams,
        addStaffTabelDuplicateMinParams,
        addStaffTabelDuplicateMinParams,
        addCardStaffMinParams,
        addCardDuplicateStaffMinParams,
        deleteCardStaffMinParams,
        blockCardStaffMinParams,
        unblockCardStaffMinParams,
        addBarcodeStaffMinParams,
        addBarcodeDuplicateStaffMinParams,
        deleteBarcodeStaffMinParams,
        dimissedRestoreStaffMinParams,
        searchFilterStaffActive,
        divisionFilterStaffActive,
        cardSearchStaffActive,
        importMaxParamsActive,
        importMinParamsActive,
        importFailedParamsActive,
        deleteCardStaffPass
    }
}

module.exports = {
    other: other('active', 'Персонал / Сотрудники - вкладка - Действующие.'),
    otherPass: other('pass', 'Бюро пропусков / Сотрудники.'),
}