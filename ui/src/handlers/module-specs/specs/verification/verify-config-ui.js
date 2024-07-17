const {describe, it, before, after} = require('mocha');

const entry = require('../../../../../../entry');
const page = require('../../../../pages');
const el = require('../../../../elements');
const dec = require('../../../../dictionaries/decorate');
const sec = require('../../../../dictionaries/section');
const sub = require('../../../../dictionaries/subsection');
const but = require('../../../../dictionaries/button-icon');
const imp = require('../../../../upload-files');
const oth = require('../../../../handlers/other/other');
const api = require('../../../other/api');
const deleteData = require('../../../other/deleteData');
const decItApi = require('../../../../dictionaries/decorate-it-api');
const decorate = require('../../../../decorates');
const db = require('../../../../database');
const data = require('../../data').dataVerify;
const configuration = require('../administration/configuration-ui').configuration;

const befVerify = () => before('Вход и открытие подраздела "Верификация"', async () => {
    await dec.auth(entry.customLogin, entry.customPassword)
    await dec.simple(el.section.handler, [sec.ver, entry.max], el.section)
    await dec.simple(el.subsection.handler, [sub.ver.verif, entry.max], el.subsection)
    await dec.simple(page.verify.init, [entry.max], page.verify)
});

const befConfig = () => before('Вход и открытие подраздела "Конфигурация верификации"', async () => {
    await dec.auth(entry.customLogin, entry.customPassword)
    await dec.simple(el.section.handler, [sec.ver, entry.max], el.section)
    await dec.simple(el.subsection.handler, [sub.ver.config, entry.max], el.subsection)
    await dec.simple(page.verifyConfig.init, [entry.max], page.verifyConfig)
});

const aft = () => after('Выход', async () => {
    await page.base.loading(entry.sleep1);
    await dec.exitNoLoader();
});

const other = (type, text) => {

    const display = () => describe(text + 'Отображение.', () => {
        if(type === 'verify') {
            decorate.befAft.beforeVerify();
            aft();

            describe('Основные настройки', () => {
                decorate.el.select.select({
                    title: 'Шаблон верификации',
                    value: 'Выберите шаблон верификации',
                    timeout: entry.max
                });
                decorate.el.select.select({
                    title: '',
                    value: 'Type 3',
                    timeout: entry.max
                });
                decorate.el.button.button({
                    name: 'Проверить',
                    timeout: entry.max
                });
                decorate.el.element.textDisplay({
                    value: 'Внимание, при работе с HTTP возможно данное оповещение не будет работать, все зависит от ' +
                        'браузера. Рекомендуем использовать PERCo-Web в защищенном режиме HTTPS.',
                    timeout: entry.max
                });
                decorate.el.button.button({
                    name: 'Запросить разрешение',
                    timeout: entry.max
                });
            });

            describe('Настройки отображения', () => {
                decorate.el.select.iconXpand({
                    title: 'Количество точек на страницу',
                    value: 'Две точки на страницу',
                    text: 'Одну точку на страницу',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.select.iconXpand({
                    title: 'Количество точек на страницу',
                    value: 'Одну точку на страницу',
                    text: 'Четыре точки на страницу',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.select.iconXpand({
                    title: 'Количество точек на страницу',
                    value: 'Четыре точки на страницу',
                    text: 'Две точки на страницу',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.select.select({
                    title: 'Расположение точек',
                    value: 'Расположение вертикально',
                    timeout: entry.max
                });
                decorate.el.select.iconXpand({
                    title: 'Размер блока с информацией',
                    value: 'Средний',
                    text: 'Большой',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.select.iconXpand({
                    title: 'Размер блока с информацией',
                    value: 'Большой',
                    text: 'Маленький',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.select.iconXpand({
                    title: 'Размер блока с информацией',
                    value: 'Маленький',
                    text: 'Средний',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.checkbox.handler({
                    name: 'Автоматически переходить на вкладку с событием',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.checkbox.checked({
                    name: 'Автоматически переходить на вкладку с событием',
                    timeout: entry.max
                });
                decorate.el.checkbox.handler({
                    name: 'Автоматически переходить на вкладку с событием',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.checkbox.unchecked({
                    name: 'Автоматически переходить на вкладку с событием',
                    timeout: entry.max
                });
                decorate.el.checkbox.handler({
                    name: 'Не отображать фотографию при проходе',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.checkbox.checked({
                    name: 'Не отображать фотографию при проходе',
                    timeout: entry.max
                });
                decorate.el.checkbox.handler({
                    name: 'Не отображать фотографию при проходе',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.checkbox.unchecked({
                    name: 'Не отображать фотографию при проходе',
                    timeout: entry.max
                });
            });
        }
    });

    const addConfig = () => describe(text + 'Добавление шаблона верификации.', () => {

        describe('Добавление', () => {
            befConfig();
            aft();

            describe('Общие параметры', () => {
                decorate.el.butIcBefore.handler({
                    icon: but.add,
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.init.verifyConfigAdd();
                decorate.el.input.sendKeys({
                    title: 'Имя шаблона',
                    placeholder: '',
                    value: data.verify1.name,
                    timeout: entry.max
                });
                decorate.el.button.handler({
                    name: 'Сохранить изменения',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
            });

            describe('Добавление точки верификации', () => {
                decorate.el.butIcBefore.handler({
                    icon: but.add,
                    timeout: entry.max
                });
                decorate.modal.selectDevice.init({
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.input.sendKeys({
                    title: 'Название',
                    placeholder: '',
                    value: data.point1.name,
                    timeout: entry.max
                });
                decorate.el.select.iconXpand({
                    title: 'Контроллер',
                    value: 'Выберите устройство',
                    text: data.point1.device,
                    timeout: entry.max
                });
                decorate.el.select.iconXpand({
                    title: 'Считыватель',
                    value: 'Выберите считыватель',
                    text: data.point1.reader,
                    timeout: entry.max
                });
                decorate.el.select.iconXpand({
                    title: 'Камера',
                    value: 'Выберите камеру',
                    text: data.point1.camera,
                    timeout: entry.max
                });
                decorate.el.button.handler({
                    name: 'Сохранить',
                    timeout: entry.max
                });
            });
        });

        describe('Проверка', () => {
            befConfig();
            aft();

            describe('Проверка таблицы', () => {
                decorate.el.table.size({
                    strCount: 1,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Название',
                    strNumber: 1,
                    cellNumber: 1,
                    value: data.verify1.name,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Описание',
                    strNumber: 1,
                    cellNumber: 2,
                    value: '',
                    timeout: entry.max
                });
            });

            describe('Проверка параметров', () => {
                describe('Общие параметры', () => {
                    decorate.el.table.strHandler({
                        strNumber: 1,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.butIcBefore.handler({
                        icon: but.edit,
                        timeout: entry.max
                    });
                    decorate.init.verifyConfigEdit();
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.input.getValue({
                        title: 'Имя шаблона',
                        placeholder: '',
                        value: data.verify1.name,
                        timeout: entry.max
                    });
                    decorate.el.input.getValue({
                        title: 'Описание',
                        placeholder: '',
                        value: '',
                        timeout: entry.max
                    });
                });

                describe('Отображамые данные', () => {
                    describe('Колонка сотрудники', () => {
                        decorate.el.simpleCell.handler({
                            name: 'Отображаемые данные',
                            timeout: entry.max
                        });
                        decorate.el.simpleCell.active({
                            name: 'Отображаемые данные',
                            timeout: entry.max
                        });
                        decorate.page.base.loading({
                            timeout: entry.sleep2
                        });
                        decorate.el.groupCell.active({
                            name: 'Фамилия Имя Отчество',
                            timeout: entry.max
                        });
                        decorate.el.groupCell.active({
                            name: 'Табельный номер',
                            timeout: entry.max
                        });
                        decorate.el.groupCell.active({
                            name: 'Подразделение',
                            timeout: entry.max
                        });
                        decorate.el.groupCell.active({
                            name: 'Должность',
                            timeout: entry.max
                        });
                        decorate.el.groupCell.active({
                            name: 'График работы',
                            timeout: entry.max
                        });
                        decorate.el.groupCell.active({
                            name: 'Шаблон доступа',
                            timeout: entry.max
                        });
                        decorate.el.groupCell.noActive({
                            name: 'Транспортное средство',
                            timeout: entry.max
                        });
                        decorate.el.groupCell.noActive({
                            name: 'Email',
                            timeout: entry.max
                        });
                        decorate.el.groupCell.noActive({
                            name: 'Телефон',
                            timeout: entry.max
                        });
                        decorate.el.groupCell.noActive({
                            name: 'Пин-код',
                            timeout: entry.max
                        });
                    });
                });

                describe('Точки верификации', () => {
                    describe('Проверка таблицы', () => {
                        decorate.el.simpleCell.handler({
                            name: 'Точки верификации',
                            timeout: entry.max
                        });
                        decorate.page.base.loading({
                            timeout: entry.sleep2
                        });
                        decorate.el.simpleCell.active({
                            name: 'Точки верификации',
                            timeout: entry.max
                        });
                        decorate.el.table.size({
                            strCount: 1,
                            timeout: entry.max
                        });
                        decorate.el.table.cellGetText({
                            headTitle: 'Название',
                            strNumber: 1,
                            cellNumber: 1,
                            value: data.point1.name,
                            timeout: entry.max
                        });
                        decorate.el.table.cellGetText({
                            headTitle: 'Считыватель',
                            strNumber: 1,
                            cellNumber: 2,
                            value: data.device.name + ` (${data.device.ip})`,
                            timeout: entry.max
                        });
                        decorate.el.table.cellGetText({
                            headTitle: 'Направление',
                            strNumber: 1,
                            cellNumber: 3,
                            value: '1',
                            timeout: entry.max
                        });
                        decorate.el.table.cellGetText({
                            headTitle: 'Камера',
                            strNumber: 1,
                            cellNumber: 4,
                            value: data.camera.name + ` (${data.camera.ip})`,
                            timeout: entry.max
                        });
                    });

                    describe('Проверка параметров', () => {
                        decorate.el.table.strHandler({
                            strNumber: 1,
                            timeout: entry.max
                        });
                        decorate.page.base.loading({
                            timeout: entry.sleep2
                        });
                        decorate.el.butIcBefore.handler({
                            icon: but.edit,
                            timeout: entry.max
                        });
                        decorate.page.base.loading({
                            timeout: entry.sleep2
                        });
                        decorate.el.input.getValue({
                            title: 'Имя точки',
                            placeholder: '',
                            value: data.point1.name,
                            timeout: entry.max
                        });
                        decorate.el.input.getValue({
                            title: 'Контроллер',
                            placeholder: 'Не выбрано',
                            value: data.device.name,
                            timeout: entry.max
                        });
                        decorate.el.select.select({
                            title: 'Считыватель',
                            value: data.point1.reader,
                            timeout: entry.max
                        });
                        decorate.el.input.getValue({
                            title: 'Камера',
                            placeholder: 'Не выбрано',
                            value: data.camera.name,
                            timeout: entry.max
                        });
                        decorate.el.input.getValue({
                            title: 'Горячая клавиша "Разрешить"',
                            placeholder: 'Не задано',
                            value: '',
                            timeout: entry.max
                        });
                        decorate.el.input.getValue({
                            title: 'Горячая клавиша "Запретить"',
                            placeholder: 'Не задано',
                            value: '',
                            timeout: entry.max
                        });
                        decorate.el.input.getValue({
                            title: 'Запрос для внешней верификации',
                            placeholder: 'http://... или https://...',
                            value: '',
                            timeout: entry.max
                        });
                    });

                    describe('Вкладка "Параметры точки верификации"', () => {

                        describe('Параметры отображения информации', () => {
                            decorate.el.tab.active({
                                tab: 'Параметры точки верификации',
                                timeout: entry.max
                            });
                            decorate.el.select.select({
                                title: 'Отображение информации (в течение какого времени после прохода ' +
                                    '(или другого события) будет отображаться информация о проходе/событии)',
                                value: data.verify1.point1.params.info.display,
                                timeout: entry.max
                            });
                            decorate.el.input.getValue({
                                title: 'Значение (секунд, 2 - 120)',
                                placeholder: '',
                                value: data.verify1.point1.params.info.value,
                                timeout: entry.max
                            });
                        });

                        describe('Параметры видеозаписи', () => {
                            decorate.el.element.textHandler({
                                name: 'Параметры видеозаписи',
                                timeout: entry.max
                            });
                            decorate.page.base.loading({
                                timeout: entry.sleep2
                            });
                            decorate.el.input.getValue({
                                title: 'Продолжительность предзаписи (секунд)',
                                placeholder: '',
                                value: data.verify1.point1.params.video.prerecord,
                                timeout: entry.max
                            });
                            decorate.el.input.getValue({
                                title: 'Продолжительность записи (секунд)',
                                placeholder: '',
                                value: data.verify1.point1.params.video.record,
                                timeout: entry.max
                            });
                            decorate.el.input.getValue({
                                title: 'Частота записи видеокадров',
                                placeholder: '',
                                value: data.verify1.point1.params.video.framed,
                                timeout: entry.max
                            });
                        });
                    });

                    describe('Вкладка "Реакция на события"', () => {

                        describe('События при проходе сотрудников', () => {
                            decorate.el.tab.handler({
                                tab: 'Реакция на события',
                                timeout: entry.max
                            });
                            decorate.el.tab.active({
                                tab: 'Реакция на события',
                                timeout: entry.max
                            });
                            decorate.page.base.loading({
                                timeout: entry.sleep2
                            });
                            decorate.el.select.select({
                                title: 'Проход',
                                value: data.verify1.point1.reaction.staff.pass,
                                timeout: entry.max
                            });
                            decorate.el.checkbox.unchecked({
                                name: 'Запись кадров видеокамеры',
                                timeout: entry.max
                            });
                            decorate.el.select.select({
                                title: 'Верификация',
                                value:  data.verify1.point1.reaction.staff.verify,
                                timeout: entry.max
                            });
                            decorate.el.select.select({
                                title: 'Проход с нарушением ВРЕМЕНИ',
                                value: data.verify1.point1.reaction.staff.time,
                                timeout: entry.max
                            });
                            decorate.el.select.select({
                                title: 'Проход с нарушением ЗОНАЛЬНОСТИ',
                                value: data.verify1.point1.reaction.staff.zone,
                                timeout: entry.max
                            });
                            decorate.el.select.select({
                                title: 'Постановка на охрану (только для контроллеров замка)',
                                value: data.verify1.point1.reaction.staff.security,
                                timeout: entry.max
                            });
                            decorate.el.select.select({
                                title: 'Снятие с охраны (только для контроллеров замка)',
                                value: data.verify1.point1.reaction.staff.unguarding,
                                timeout: entry.max
                            });
                        });

                        describe('События при проходе посетителей', () => {
                            decorate.el.element.textHandler({
                                name: 'События при проходе посетителей',
                                timeout: entry.max
                            });
                            decorate.page.base.loading({
                                timeout: entry.sleep2
                            });
                            decorate.el.select.select({
                                title: 'Проход с нарушением ВРЕМЕНИ',
                                value: data.verify1.point1.reaction.visitor.time,
                                timeout: entry.max
                            });
                            decorate.el.checkbox.unchecked({
                                name: 'Запись кадров видеокамеры',
                                timeout: entry.max
                            });
                            decorate.el.select.select({
                                title: 'Верификация',
                                value: data.verify1.point1.reaction.visitor.verify,
                                timeout: entry.max
                            });
                            decorate.el.select.select({
                                title: 'Проход с нарушением ЗОНАЛЬНОСТИ',
                                value: data.verify1.point1.reaction.visitor.zone,
                                timeout: entry.max
                            });
                            decorate.el.select.select({
                                title: 'Проход',
                                value: data.verify1.point1.reaction.visitor.pass,
                                timeout: entry.max
                            });
                        });

                        describe('Уведомляющие события', () => {
                            decorate.el.element.textHandler({
                                name: 'Уведомляющие события',
                                timeout: entry.max
                            });
                            decorate.page.base.loading({
                                timeout: entry.sleep2
                            });
                            decorate.el.select.select({
                                title: 'Идентификатор НЕ ЗАРЕГИСТРИРОВАН',
                                value: data.verify1.point1.reaction.event.registered,
                                timeout: entry.max
                            });
                            decorate.el.checkbox.unchecked({
                                name: 'Запись кадров видеокамеры',
                                timeout: entry.max
                            });
                            decorate.el.select.select({
                                title: 'Идентификатор ЗАБЛОКИРОВАН',
                                value: data.verify1.point1.reaction.event.blocked,
                                timeout: entry.max
                            });
                            decorate.el.select.select({
                                title: 'Идентификатор ПРОСРОЧЕН',
                                value: data.verify1.point1.reaction.event.expired,
                                timeout: entry.max
                            });
                            decorate.el.select.select({
                                title: 'Нарушение РКД',
                                value: data.verify1.point1.reaction.event.wdd,
                                timeout: entry.max
                            });
                            decorate.el.select.select({
                                title: 'Взлом ИУ',
                                value: data.verify1.point1.reaction.event.bw,
                                timeout: entry.max
                            });
                            decorate.el.select.select({
                                title: 'Проход от ДУ',
                                value: data.verify1.point1.reaction.event.du,
                                timeout: entry.max
                            });
                        });
                    });
                });
            });
        });
    });

    const editConfig = () => describe(text + 'Редактирование шаблона верификации.', () => {

        describe('Редактирование', () => {
            befConfig();
            aft();

            describe('Общие настройки', () => {
                decorate.el.table.strHandler({
                    strNumber: 1,
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.butIcBefore.handler({
                    icon: but.edit,
                    timeout: entry.max
                });
                decorate.init.verifyConfigEdit();
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                /*decorate.el.input.backSpace({
                    title: 'Имя шаблона',
                    placeholder: '',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });*/
                decorate.el.input.sendKeys({
                    title: 'Имя шаблона',
                    placeholder: '',
                    value: data.verify2.name,
                    timeout: entry.max
                });
                decorate.el.input.sendKeys({
                    title: 'Описание',
                    placeholder: '',
                    value: data.verify2.description,
                    timeout: entry.max
                });
            });

            describe('Отображаемые данные', () => {
                describe('Колонка сотрудники', () => {
                    decorate.el.simpleCell.handler({
                        name: 'Отображаемые данные',
                        timeout: entry.max
                    });
                    decorate.el.simpleCell.active({
                        name: 'Отображаемые данные',
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.groupCell.handler({
                        name: 'Транспортное средство',
                        timeout: entry.max
                    });
                    decorate.el.groupCell.handler({
                        name: 'Email',
                        timeout: entry.max
                    });
                    decorate.el.groupCell.handler({
                        name: 'Телефон',
                        timeout: entry.max
                    });
                    decorate.el.groupCell.handler({
                        name: 'Пин-код',
                        timeout: entry.max
                    });
                });
            });

            describe('Сохранение', () => {
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.button.handler({
                    name: 'Сохранить изменения',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
            });

            describe('Точки верификации', () => {

                describe('Ообщие параметры', () => {
                    decorate.el.simpleCell.handler({
                        name: 'Точки верификации',
                        timeout: entry.max
                    });
                    decorate.el.simpleCell.active({
                        name: 'Точки верификации',
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.table.strHandler({
                        strNumber: 1,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.butIcBefore.handler({
                        icon: but.edit,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.input.backSpace({
                        title: 'Имя точки',
                        placeholder: '',
                        timeout: entry.max
                    });
                    decorate.el.input.sendKeys({
                        title: 'Имя точки',
                        placeholder: '',
                        value: data.point2.name,
                        timeout: entry.max
                    });

                    decorate.el.input.iconKeyboard({
                        title: 'Горячая клавиша "Разрешить"',
                        placeholder: 'Не задано',
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.page.base.keyButton({
                        button: data.verify2.keyboardResolve,
                    });

                    decorate.el.input.iconKeyboard({
                        title: 'Горячая клавиша "Запретить"',
                        placeholder: 'Не задано',
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.page.base.keyButton({
                        button: data.verify2.keyboardProhibit,
                    });

                    decorate.el.input.sendKeys({
                        title: 'Запрос для внешней верификации',
                        placeholder: 'http://... или https://...',
                        value: data.verify2.http,
                        timeout: entry.max
                    });
                });

                describe('Вкладка "Параметры точки верификации"', () => {

                    describe('Параметры отображения информации', () => {
                        decorate.el.tab.active({
                            tab: 'Параметры точки верификации',
                            timeout: entry.max
                        });
                        decorate.el.select.iconXpand({
                            title: 'Отображение информации (в течение какого времени после прохода ' +
                                '(или другого события) будет отображаться информация о проходе/событии)',
                            value: 'Не более чем',
                            text: data.verify2.point1.params.info.display,
                            timeout: entry.max
                        });
                    });

                    describe('Параметры видеозаписи', () => {
                        decorate.el.element.textHandler({
                            name: 'Параметры видеозаписи',
                            timeout: entry.max
                        });
                        decorate.page.base.loading({
                            timeout: entry.sleep2
                        });
                        decorate.el.input.backSpace({
                            title: 'Продолжительность предзаписи (секунд)',
                            placeholder: '',
                            timeout: entry.max
                        });
                        decorate.el.input.sendKeys({
                            title: 'Продолжительность предзаписи (секунд)',
                            placeholder: '',
                            value: data.verify2.point1.params.video.prerecord,
                            timeout: entry.max
                        });
                        decorate.el.input.backSpace({
                            title: 'Продолжительность записи (секунд)',
                            placeholder: '',
                            timeout: entry.max
                        });
                        decorate.el.input.sendKeys({
                            title: 'Продолжительность записи (секунд)',
                            placeholder: '',
                            value: data.verify2.point1.params.video.record,
                            timeout: entry.max
                        });
                        decorate.el.input.backSpace({
                            title: 'Частота записи видеокадров',
                            placeholder: '',
                            timeout: entry.max
                        });
                        decorate.el.input.sendKeys({
                            title: 'Частота записи видеокадров',
                            placeholder: '',
                            value: data.verify2.point1.params.video.framed,
                            timeout: entry.max
                        });
                    });
                });

                describe('Вкладка "Реакция на события"', () => {

                    describe('События при проходе сотрудников', () => {
                        decorate.el.tab.handler({
                            tab: 'Реакция на события',
                            timeout: entry.max
                        });
                        decorate.el.tab.active({
                            tab: 'Реакция на события',
                            timeout: entry.max
                        });
                        decorate.page.base.loading({
                            timeout: entry.sleep2
                        });
                        decorate.el.select.iconXpand({
                            title: 'Проход',
                            value: 'Отслеживать',
                            text: data.verify2.point1.reaction.staff.pass,
                            timeout: entry.max
                        });
                        decorate.el.select.iconXpand({
                            title: 'Проход с нарушением ВРЕМЕНИ',
                            value: 'Отслеживать',
                            text: data.verify2.point1.reaction.staff.time,
                            timeout: entry.max
                        });
                        decorate.el.select.iconXpand({
                            title: 'Проход с нарушением ЗОНАЛЬНОСТИ',
                            value: 'Отслеживать',
                            text: data.verify2.point1.reaction.staff.zone,
                            timeout: entry.max
                        });
                        decorate.el.select.iconXpand({
                            title: 'Постановка на охрану (только для контроллеров замка)',
                            value: 'Отслеживать',
                            text: data.verify2.point1.reaction.staff.security,
                            timeout: entry.max
                        });
                        decorate.el.select.iconXpand({
                            title: 'Снятие с охраны (только для контроллеров замка)',
                            value: 'Отслеживать',
                            text: data.verify2.point1.reaction.staff.unguarding,
                            timeout: entry.max
                        });
                    });

                    describe('События при проходе посетителей', () => {
                        decorate.el.element.textHandler({
                            name: 'События при проходе посетителей',
                            timeout: entry.max
                        });
                        decorate.page.base.loading({
                            timeout: entry.sleep2
                        });
                        decorate.el.select.iconXpand({
                            title: 'Проход с нарушением ВРЕМЕНИ',
                            value: 'Отслеживать',
                            text: data.verify2.point1.reaction.visitor.time,
                            timeout: entry.max
                        });
                        decorate.el.select.iconXpand({
                            title: 'Проход с нарушением ЗОНАЛЬНОСТИ',
                            value: 'Отслеживать',
                            text: data.verify2.point1.reaction.visitor.zone,
                            timeout: entry.max
                        });
                        decorate.el.select.iconXpand({
                            title: 'Проход',
                            value: 'Отслеживать',
                            text: data.verify2.point1.reaction.visitor.pass,
                            timeout: entry.max
                        });
                    });

                    describe('Уведомляющие события', () => {
                        decorate.el.element.textHandler({
                            name: 'Уведомляющие события',
                            timeout: entry.max
                        });
                        decorate.page.base.loading({
                            timeout: entry.sleep2
                        });
                        decorate.el.select.iconXpand({
                            title: 'Идентификатор НЕ ЗАРЕГИСТРИРОВАН',
                            value: 'Отслеживать',
                            text: data.verify2.point1.reaction.event.registered,
                            timeout: entry.max
                        });
                        decorate.el.select.iconXpand({
                            title: 'Идентификатор ЗАБЛОКИРОВАН',
                            value: 'Отслеживать',
                            text: data.verify2.point1.reaction.event.blocked,
                            timeout: entry.max
                        });
                        decorate.el.select.iconXpand({
                            title: 'Идентификатор ПРОСРОЧЕН',
                            value: 'Отслеживать',
                            text: data.verify2.point1.reaction.event.expired,
                            timeout: entry.max
                        });
                        decorate.el.select.iconXpand({
                            title: 'Нарушение РКД',
                            value: 'Отслеживать',
                            text: data.verify2.point1.reaction.event.wdd,
                            timeout: entry.max
                        });
                        decorate.el.select.iconXpand({
                            title: 'Взлом ИУ',
                            value: 'Отслеживать',
                            text: data.verify2.point1.reaction.event.bw,
                            timeout: entry.max
                        });
                        decorate.el.select.iconXpand({
                            title: 'Проход от ДУ',
                            value: 'Отслеживать',
                            text: data.verify2.point1.reaction.event.du,
                            timeout: entry.max
                        });
                    });
                });
            });

            describe('Сохранение', () => {
                decorate.el.button.handler({
                    name: 'Сохранить изменения',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
            });

        });

        describe('Проверка', () => {
            befConfig();
            aft();

            describe('Проверка таблицы', () => {
                decorate.el.table.size({
                    strCount: 1,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Название',
                    strNumber: 1,
                    cellNumber: 1,
                    value: data.verify2.name,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Описание',
                    strNumber: 1,
                    cellNumber: 2,
                    value:  data.verify2.description,
                    timeout: entry.max
                });
            });

            describe('Проверка параметров', () => {
                describe('Общие параметры', () => {
                    decorate.el.table.strHandler({
                        strNumber: 1,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.butIcBefore.handler({
                        icon: but.edit,
                        timeout: entry.max
                    });
                    decorate.init.verifyConfigEdit();
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.input.getValue({
                        title: 'Имя шаблона',
                        placeholder: '',
                        value: data.verify2.name,
                        timeout: entry.max
                    });
                    decorate.el.input.getValue({
                        title: 'Описание',
                        placeholder: '',
                        value:  data.verify2.description,
                        timeout: entry.max
                    });
                });

                describe('Отображамые данные', () => {
                    describe('Колонка сотрудники', () => {
                        decorate.el.simpleCell.handler({
                            name: 'Отображаемые данные',
                            timeout: entry.max
                        });
                        decorate.el.simpleCell.active({
                            name: 'Отображаемые данные',
                            timeout: entry.max
                        });
                        decorate.page.base.loading({
                            timeout: entry.sleep2
                        });
                        decorate.el.groupCell.active({
                            name: 'Фамилия Имя Отчество',
                            timeout: entry.max
                        });
                        decorate.el.groupCell.active({
                            name: 'Табельный номер',
                            timeout: entry.max
                        });
                        decorate.el.groupCell.active({
                            name: 'Подразделение',
                            timeout: entry.max
                        });
                        decorate.el.groupCell.active({
                            name: 'Должность',
                            timeout: entry.max
                        });
                        decorate.el.groupCell.active({
                            name: 'График работы',
                            timeout: entry.max
                        });
                        decorate.el.groupCell.active({
                            name: 'Шаблон доступа',
                            timeout: entry.max
                        });
                        decorate.el.groupCell.active({
                            name: 'Транспортное средство',
                            timeout: entry.max
                        });
                        decorate.el.groupCell.active({
                            name: 'Email',
                            timeout: entry.max
                        });
                        decorate.el.groupCell.active({
                            name: 'Телефон',
                            timeout: entry.max
                        });
                        decorate.el.groupCell.active({
                            name: 'Пин-код',
                            timeout: entry.max
                        });
                    });
                });

                describe('Точки верификации', () => {
                    describe('Проверка таблицы', () => {
                        decorate.el.simpleCell.handler({
                            name: 'Точки верификации',
                            timeout: entry.max
                        });
                        decorate.page.base.loading({
                            timeout: entry.sleep2
                        });
                        decorate.el.simpleCell.active({
                            name: 'Точки верификации',
                            timeout: entry.max
                        });
                        decorate.el.table.size({
                            strCount: 1,
                            timeout: entry.max
                        });
                        decorate.el.table.cellGetText({
                            headTitle: 'Название',
                            strNumber: 1,
                            cellNumber: 1,
                            value: data.point2.name,
                            timeout: entry.max
                        });
                        decorate.el.table.cellGetText({
                            headTitle: 'Считыватель',
                            strNumber: 1,
                            cellNumber: 2,
                            value: data.device.name + ` (${data.device.ip})`,
                            timeout: entry.max
                        });
                        decorate.el.table.cellGetText({
                            headTitle: 'Направление',
                            strNumber: 1,
                            cellNumber: 3,
                            value: '1',
                            timeout: entry.max
                        });
                        decorate.el.table.cellGetText({
                            headTitle: 'Камера',
                            strNumber: 1,
                            cellNumber: 4,
                            value: data.camera.name + ` (${data.camera.ip})`,
                            timeout: entry.max
                        });
                    });

                    describe('Проверка параметров', () => {
                        decorate.el.table.strHandler({
                            strNumber: 1,
                            timeout: entry.max
                        });
                        decorate.page.base.loading({
                            timeout: entry.sleep2
                        });
                        decorate.el.butIcBefore.handler({
                            icon: but.edit,
                            timeout: entry.max
                        });
                        decorate.page.base.loading({
                            timeout: entry.sleep2
                        });
                        decorate.el.input.getValue({
                            title: 'Имя точки',
                            placeholder: '',
                            value: data.point2.name,
                            timeout: entry.max
                        });
                        decorate.el.input.getValue({
                            title: 'Контроллер',
                            placeholder: 'Не выбрано',
                            value: data.device.name,
                            timeout: entry.max
                        });
                        decorate.el.select.select({
                            title: 'Считыватель',
                            value: data.point1.reader,
                            timeout: entry.max
                        });
                        decorate.el.input.getValue({
                            title: 'Камера',
                            placeholder: 'Не выбрано',
                            value: data.camera.name,
                            timeout: entry.max
                        });
                        decorate.el.input.getValue({
                            title: 'Горячая клавиша "Разрешить"',
                            placeholder: 'Не задано',
                            value: data.verify2.keyboardResolve,
                            timeout: entry.max
                        });
                        decorate.el.input.getValue({
                            title: 'Горячая клавиша "Запретить"',
                            placeholder: 'Не задано',
                            value: data.verify2.keyboardProhibit,
                            timeout: entry.max
                        });
                        decorate.el.input.getValue({
                            title: 'Запрос для внешней верификации',
                            placeholder: 'http://... или https://...',
                            value: data.verify2.http,
                            timeout: entry.max
                        });
                    });

                    describe('Вкладка "Параметры точки верификации"', () => {

                        describe('Параметры отображения информации', () => {
                            decorate.el.tab.active({
                                tab: 'Параметры точки верификации',
                                timeout: entry.max
                            });
                            decorate.el.select.select({
                                title: 'Отображение информации (в течение какого времени после прохода ' +
                                    '(или другого события) будет отображаться информация о проходе/событии)',
                                value: data.verify2.point1.params.info.display,
                                timeout: entry.max
                            });
                        });

                        describe('Параметры видеозаписи', () => {
                            decorate.el.element.textHandler({
                                name: 'Параметры видеозаписи',
                                timeout: entry.max
                            });
                            decorate.page.base.loading({
                                timeout: entry.sleep2
                            });
                            decorate.el.input.getValue({
                                title: 'Продолжительность предзаписи (секунд)',
                                placeholder: '',
                                value: data.verify2.point1.params.video.prerecord,
                                timeout: entry.max
                            });
                            decorate.el.input.getValue({
                                title: 'Продолжительность записи (секунд)',
                                placeholder: '',
                                value: data.verify2.point1.params.video.record,
                                timeout: entry.max
                            });
                            decorate.el.input.getValue({
                                title: 'Частота записи видеокадров',
                                placeholder: '',
                                value: data.verify2.point1.params.video.framed,
                                timeout: entry.max
                            });
                        });
                    });

                    describe('Вкладка "Реакция на события"', () => {

                        describe('События при проходе сотрудников', () => {
                            decorate.el.tab.handler({
                                tab: 'Реакция на события',
                                timeout: entry.max
                            });
                            decorate.el.tab.active({
                                tab: 'Реакция на события',
                                timeout: entry.max
                            });
                            decorate.page.base.loading({
                                timeout: entry.sleep2
                            });
                            decorate.el.select.select({
                                title: 'Проход',
                                value: data.verify2.point1.reaction.staff.pass,
                                timeout: entry.max
                            });
                            decorate.el.select.select({
                                title: 'Проход с нарушением ВРЕМЕНИ',
                                value: data.verify2.point1.reaction.staff.time,
                                timeout: entry.max
                            });
                            decorate.el.select.select({
                                title: 'Проход с нарушением ЗОНАЛЬНОСТИ',
                                value: data.verify2.point1.reaction.staff.zone,
                                timeout: entry.max
                            });
                            decorate.el.select.select({
                                title: 'Постановка на охрану (только для контроллеров замка)',
                                value: data.verify2.point1.reaction.staff.security,
                                timeout: entry.max
                            });
                            decorate.el.select.select({
                                title: 'Снятие с охраны (только для контроллеров замка)',
                                value: data.verify2.point1.reaction.staff.unguarding,
                                timeout: entry.max
                            });
                        });

                        describe('События при проходе посетителей', () => {
                            decorate.el.element.textHandler({
                                name: 'События при проходе посетителей',
                                timeout: entry.max
                            });
                            decorate.page.base.loading({
                                timeout: entry.sleep2
                            });
                            decorate.el.select.select({
                                title: 'Проход с нарушением ВРЕМЕНИ',
                                value: data.verify2.point1.reaction.visitor.time,
                                timeout: entry.max
                            });
                            decorate.el.select.select({
                                title: 'Проход с нарушением ЗОНАЛЬНОСТИ',
                                value: data.verify2.point1.reaction.visitor.zone,
                                timeout: entry.max
                            });
                            decorate.el.select.select({
                                title: 'Проход',
                                value: data.verify2.point1.reaction.visitor.pass,
                                timeout: entry.max
                            });
                        });

                        describe('Уведомляющие события', () => {
                            decorate.el.element.textHandler({
                                name: 'Уведомляющие события',
                                timeout: entry.max
                            });
                            decorate.page.base.loading({
                                timeout: entry.sleep2
                            });
                            decorate.el.select.select({
                                title: 'Идентификатор НЕ ЗАРЕГИСТРИРОВАН',
                                value: data.verify2.point1.reaction.event.registered,
                                timeout: entry.max
                            });
                            decorate.el.select.select({
                                title: 'Идентификатор ЗАБЛОКИРОВАН',
                                value: data.verify2.point1.reaction.event.blocked,
                                timeout: entry.max
                            });
                            decorate.el.select.select({
                                title: 'Идентификатор ПРОСРОЧЕН',
                                value: data.verify2.point1.reaction.event.expired,
                                timeout: entry.max
                            });
                            decorate.el.select.select({
                                title: 'Нарушение РКД',
                                value: data.verify2.point1.reaction.event.wdd,
                                timeout: entry.max
                            });
                            decorate.el.select.select({
                                title: 'Взлом ИУ',
                                value: data.verify2.point1.reaction.event.bw,
                                timeout: entry.max
                            });
                            decorate.el.select.select({
                                title: 'Проход от ДУ',
                                value: data.verify2.point1.reaction.event.du,
                                timeout: entry.max
                            });
                        });
                    });
                });
            });
        });
    });

    const addDuplicate = () => describe(text + 'Попытка дублирования.', () => {
        befConfig();
        aft();
        decorate.el.butIcBefore.handler({
            icon: but.add,
            timeout: entry.max
        });
        decorate.page.base.loading({
            timeout: entry.sleep2
        });
        decorate.init.verifyConfigAdd();
        decorate.el.input.sendKeys({
            title: 'Имя шаблона',
            placeholder: '',
            value: data.verify1.name + data.verify2.name,
            timeout: entry.max
        });
        decorate.el.button.handler({
            name: 'Сохранить изменения',
            timeout: entry.max
        });
        decorate.el.error.error({
            text: 'Данное имя уже существует',
            timeout: entry.max
        });
        decorate.page.base.loading({
            timeout: entry.sleep2
        });


    });

    const addFailed = () => describe(text + 'Попытка добавления с невалидными параметрами.', () => {
        befConfig();
        aft();

        describe('При добавлении точки верификации указать камеру вместо контроллера', () => {
            decorate.el.butIcBefore.handler({
                icon: but.add,
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
            decorate.init.verifyConfigAdd();
            decorate.el.input.sendKeys({
                title: 'Имя шаблона',
                placeholder: '',
                value: data.verify3.name,
                timeout: entry.max
            });
            decorate.el.button.handler({
                name: 'Сохранить изменения',
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
            decorate.el.butIcBefore.handler({
                icon: but.add,
                timeout: entry.max
            });
            decorate.modal.selectDevice.init({
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
            decorate.el.select.iconXpand({
                title: 'Контроллер',
                value: 'Выберите устройство',
                text: data.point2.camera,
                timeout: entry.max
            });
            decorate.el.error.error({
                text: 'Выберите другое устройство',
                timeout: entry.max
            });
            decorate.modal.selectDevice.closeHandler({
                timeout: entry.max
            });
            decorate.modal.selectDevice.initClose({
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
        });

        describe('Попытка дублирования точки верификации', () => {
            decorate.el.butIcBefore.handler({
                icon: but.add,
                timeout: entry.max
            });
            decorate.modal.selectDevice.init({
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
            decorate.el.input.sendKeys({
                title: 'Название',
                placeholder: '',
                value: data.point2.name,
                timeout: entry.max
            });
            decorate.el.select.iconXpand({
                title: 'Контроллер',
                value: 'Выберите устройство',
                text: data.point1.device,
                timeout: entry.max
            });
            decorate.el.select.iconXpand({
                title: 'Считыватель',
                value: 'Выберите считыватель',
                text: data.point1.reader,
                timeout: entry.max
            });
            decorate.el.select.iconXpand({
                title: 'Камера',
                value: 'Выберите камеру',
                text: data.point1.camera,
                timeout: entry.max
            });
            decorate.el.button.handler({
                name: 'Сохранить',
                timeout: entry.max
            });
            decorate.el.error.error({
                text: 'Такое имя точки верификации уже существует',
                timeout: entry.max
            });
            decorate.modal.selectDevice.closeHandler({
                timeout: entry.max
            });
            decorate.modal.selectDevice.initClose({
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
        });

        describe('Попытка дублирования горячих клавиш точке верификации', () => {
            decorate.el.butIcBefore.handler({
                icon: but.add,
                timeout: entry.max
            });
            decorate.modal.selectDevice.init({
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
            decorate.el.input.sendKeys({
                title: 'Название',
                placeholder: '',
                value: data.point3.name,
                timeout: entry.max
            });
            decorate.el.select.iconXpand({
                title: 'Контроллер',
                value: 'Выберите устройство',
                text: data.point3.device,
                timeout: entry.max
            });
            decorate.el.select.iconXpand({
                title: 'Считыватель',
                value: 'Выберите считыватель',
                text: data.point3.reader,
                timeout: entry.max
            });
            decorate.el.select.iconXpand({
                title: 'Камера',
                value: 'Выберите камеру',
                text: data.point3.camera,
                timeout: entry.max
            });
            decorate.el.button.handler({
                name: 'Сохранить',
                timeout: entry.max
            });
            decorate.modal.selectDevice.initClose({
                timeout: entry.max
            });
            decorate.el.table.strHandler({
                strNumber: 1,
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
            decorate.el.butIcBefore.handler({
                icon: but.edit,
                timeout: entry.max
            });

            decorate.el.input.iconKeyboard({
                title: 'Горячая клавиша "Разрешить"',
                placeholder: 'Не задано',
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
            decorate.page.base.keyButton({
                button: data.verify3.keyboardResolve,
            });

            decorate.el.input.iconKeyboard({
                title: 'Горячая клавиша "Запретить"',
                placeholder: 'Не задано',
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
            decorate.page.base.keyButton({
                button: data.verify3.keyboardProhibit,
            });
            decorate.el.button.handler({
                name: 'Сохранить изменения',
                timeout: entry.max
            });
            decorate.el.error.error({
                text: 'На оба действия нельзя назначить одну и ту же горячую клавишу',
                timeout: entry.max
            });
        });
    });

    const searchFilter = () => describe(text + 'Проверка фильтра "Поиск".', () => {

        befConfig();
        aft();

        describe('Проверка таблицы до изпользования фильтра "Поиск..."', () => {
            decorate.el.table.size({
                strCount: 2,
                timeout: entry.max
            });
            decorate.el.table.cellGetText({
                headTitle: 'Название',
                strNumber: 1,
                cellNumber: 1,
                value: data.verify3.name,
                timeout: entry.max
            });
            decorate.el.table.cellGetText({
                headTitle: 'Название',
                strNumber: 2,
                cellNumber: 1,
                value: data.verify2.name,
                timeout: entry.max
            });
        });

        describe(`Ввод в фильтр "${data.verify3.name}"`, () => {
            decorate.el.input.sendKeys({
                title: '',
                placeholder: 'Поиск...',
                value: data.verify3.name,
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
        });

        describe('Проверка таблицы после измпользования фильтра "Поиск..."', () => {
            decorate.el.table.size({
                strCount: 1,
                timeout: entry.max
            });
            decorate.el.table.cellGetText({
                headTitle: 'Название',
                strNumber: 1,
                cellNumber: 1,
                value: data.verify3.name,
                timeout: entry.max
            });
        });

        describe(`Удаление "${data.verify3.name}" из фильтра "Поиск..." и проверка таблицы`, () => {
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
                headTitle: 'Название',
                strNumber: 1,
                cellNumber: 1,
                value: data.verify3.name,
                timeout: entry.max
            });
            decorate.el.table.cellGetText({
                headTitle: 'Название',
                strNumber: 2,
                cellNumber: 1,
                value: data.verify2.name,
                timeout: entry.max
            });
        });
    });

    const deleted = () => describe(text + 'Удаление.', () => {

        describe('Удаление конфигурации верификации 1', () => {
            befConfig();
            aft();
            decorate.el.table.strHandler({
                strNumber: 1,
                timeout: entry.max
            });
            decorate.el.butIcBefore.handler({
                icon: but.delete,
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
            decorate.modalConfirm.deleteVerifyConfig.init({
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

        describe('Удаление конфигурации верификации 2', () => {
            befConfig();
            aft();
            decorate.el.table.strHandler({
                strNumber: 1,
                timeout: entry.max
            });
            decorate.el.butIcBefore.handler({
                icon: but.delete,
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
            decorate.modalConfirm.deleteVerifyConfig.init({
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

        describe('Проверка таблицы', () => {
            befConfig();
            aft();
            decorate.el.table.noStr({
                timeout: entry.max
            });
        });
    });

    return {
        display,
        addConfig,
        editConfig,
        addDuplicate,
        addFailed,
        searchFilter,
        deleted
    }
}

module.exports = {
    otherVerify: other('verify', 'Верификация / Верификация. '),
    otherConfig: other('config', 'Верификация / Конфигурация. '),
    addDevice: () => configuration.addDeviceIP({ip: data.device.ip}),
    addCamera: () => configuration.addCamera({...data.camera}),
    activateDevice: () => configuration.activateDevice({ip: data.device.ip, name: data.device.name}),
    deleteDevice: () => configuration.deleteDevice({ip: data.device.ip, name: data.device.name}),
    deleteCamera: () => configuration.deleteDevice({ip: data.camera.ip, name: data.camera.name}),
    befVerifyConfig: () => befConfig()
}
