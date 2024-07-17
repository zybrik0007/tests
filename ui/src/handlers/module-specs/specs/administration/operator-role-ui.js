const {describe, it, before, after} = require('mocha');

const entry = require('../../../../../../entry');
const page = require('../../../../pages');
const el = require('../../../../elements');
const dec = require('../../../../dictionaries/decorate');
const sec = require('../../../../dictionaries/section');
const sub = require('../../../../dictionaries/subsection');
const but = require('../../../../dictionaries/button-icon');
const icon = require('../../../../dictionaries/icon');
const api = require('../../../other/api');
const deleteData = require('../../../other/deleteData');
const oth = require('../../../other/other');
const decItApi = require('../../../../dictionaries/decorate-it-api');
const decorate = require('../../../../decorates');
const db = require('../../../../database');
const data = require('../../data').dataRoleOperator;
//const befPosition  = require('../personal/position-ui').befPosition;


const befOperator = () => before('Вход и открытие подраздела "Операторы"', async () => {
    await page.base.loading(entry.sleep1);
    await dec.auth(entry.customLogin, entry.customPassword);
    await dec.simple(el.section.handler, [sec.adm, entry.max], el.section);
    await dec.simple(el.subsection.handler, [sub.adm.operator, entry.max], el.subsection);
    await dec.simple(page.operator.init, [entry.max], page.operator);
    await page.base.loading(entry.sleep1);
});

const befRole = () => before('Вход и открытие подраздела "Роли и права операторов"', async () => {
    await page.base.loading(entry.sleep1);
    await dec.auth(entry.customLogin, entry.customPassword);
    await dec.simple(el.section.handler, [sec.adm, entry.max], el.section);
    await dec.simple(el.subsection.handler, [sub.adm.role, entry.max], el.subsection);
    await dec.simple(page.role.init, [entry.max], page.role);
    await page.base.loading(entry.sleep1);
});

const befNewOperator = ({login, password}) => before('Вход и открытие подраздела "Роли и права операторов"',
    async () => {
    await page.base.loading(entry.sleep1);
    await dec.auth(login, password);
    await dec.simple(el.section.handler, [sec.adm, entry.max], el.section);
    await dec.simple(el.subsection.handler, [sub.adm.role, entry.max], el.subsection);
    await dec.simple(page.role.init, [entry.max], page.role);
    await page.base.loading(entry.sleep1);
});

const aft = () => after('Выход', async () => {
    await page.base.loading(entry.sleep1);
    await dec.exit();
});

const other = (type, text) => {

    const add = () => describe(text + 'Добавление без ограничения прав доступа.', () => {

        if(type === 'role') {

            describe('Добавление роли', () => {
                befRole();
                aft();

                describe('Открытие на добавление и общая настройка', () => {
                    decorate.el.butIcBefore.handler({
                        icon: but.add,
                        timeout: entry.max
                    });
                    decorate.init.roleAdd();
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.input.sendKeys({
                        title: 'Название',
                        placeholder: '',
                        value: data.role1.name,
                        timeout: entry.max
                    });
                    decorate.el.input.sendKeys({
                        title: 'Описание',
                        placeholder: '',
                        value: data.role1.description,
                        timeout: entry.max
                    });
                });

                describe('Настройка вкладки Помещения', () => {
                    decorate.el.simpleCell.active({
                        name: 'Помещения',
                        timeout: entry.max
                    });
                    decorate.el.butIcAfter.handler({
                        icon: but.av_library_add_check,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    })
                    decorate.el.placeholderText.getText({
                        text: 'Безусловные права на все помещения',
                        timeout: entry.max
                    });
                });

                describe('Настройка вкладки Подразделения', () => {
                    decorate.el.simpleCell.handler({
                        name: 'Подразделения',
                        timeout: entry.max
                    });
                    decorate.el.simpleCell.active({
                        name: 'Подразделения',
                        timeout: entry.max
                    });
                    decorate.el.butIcAfter.handler({
                        icon: but.av_library_add_check,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    })
                    decorate.el.placeholderText.getText({
                        text: 'Безусловные права на все подразделения',
                        timeout: entry.max
                    });
                });

                describe('Настройка вкладки Должности', () => {
                    decorate.el.simpleCell.handler({
                        name: 'Должности',
                        timeout: entry.max
                    });
                    decorate.el.simpleCell.active({
                        name: 'Должности',
                        timeout: entry.max
                    });
                    decorate.el.butIcAfter.handler({
                        icon: but.av_library_add_check,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    })
                    decorate.el.placeholderText.getText({
                        text: 'Безусловные права на все должности',
                        timeout: entry.max
                    });
                });

                describe('Настройка вкладки Графики работы', () => {
                    decorate.el.simpleCell.handler({
                        name: 'Графики работы',
                        timeout: entry.max
                    });
                    decorate.el.simpleCell.active({
                        name: 'Графики работы',
                        timeout: entry.max
                    });
                    decorate.el.butIcAfter.handler({
                        icon: but.av_library_add_check,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    })
                    decorate.el.placeholderText.getText({
                        text: 'Безусловные права на все графики работы',
                        timeout: entry.max
                    });
                });

                describe('Настройка вкладки Шаблоны доступа', () => {
                    decorate.el.simpleCell.handler({
                        name: 'Шаблоны доступа',
                        timeout: entry.max
                    });
                    decorate.el.simpleCell.active({
                        name: 'Шаблоны доступа',
                        timeout: entry.max
                    });
                    decorate.el.butIcAfter.handler({
                        icon: but.av_library_add_check,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    })
                    decorate.el.placeholderText.getText({
                        text: 'Безусловные права на все шаблоны доступа',
                        timeout: entry.max
                    });
                });

                describe('Настройка вкладки Шаблоны пропусков', () => {
                    decorate.el.simpleCell.handler({
                        name: 'Шаблоны пропусков',
                        timeout: entry.max
                    });
                    decorate.el.simpleCell.active({
                        name: 'Шаблоны пропусков',
                        timeout: entry.max
                    });
                    decorate.el.butIcAfter.handler({
                        icon: but.av_library_add_check,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    })
                    decorate.el.placeholderText.getText({
                        text: 'Безусловные права на все шаблоны пропусков',
                        timeout: entry.max
                    });
                });

                describe('Настройка вкладки Устройства', () => {
                    decorate.el.simpleCell.handler({
                        name: 'Устройства',
                        timeout: entry.max
                    });
                    decorate.el.simpleCell.active({
                        name: 'Устройства',
                        timeout: entry.max
                    });
                    decorate.el.butIcAfter.handler({
                        icon: but.av_library_add_check,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    })
                    decorate.el.placeholderText.getText({
                        text: 'Безусловные права на все устройства',
                        timeout: entry.max
                    });
                });

                describe('Настройка вкладки Шаблоны верификации', () => {
                    decorate.el.simpleCell.handler({
                        name: 'Шаблоны верификации',
                        timeout: entry.max
                    });
                    decorate.el.simpleCell.active({
                        name: 'Шаблоны верификации',
                        timeout: entry.max
                    });
                    decorate.el.butIcAfter.handler({
                        icon: but.av_library_add_check,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    })
                    decorate.el.placeholderText.getText({
                        text: 'Безусловные права на все шаблоны верификации',
                        timeout: entry.max
                    });
                });

                describe('Настройка вкладки Планы помещений', () => {
                    decorate.el.simpleCell.handler({
                        name: 'Планы помещений',
                        timeout: entry.max
                    });
                    decorate.el.simpleCell.active({
                        name: 'Планы помещений',
                        timeout: entry.max
                    });
                    decorate.el.butIcAfter.handler({
                        icon: but.av_library_add_check,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    })
                    decorate.el.placeholderText.getText({
                        text: 'Безусловные права на все планы помещений',
                        timeout: entry.max
                    });
                });

                describe('Сохрание и выход', () => {
                    decorate.el.button.handler({
                        name: 'Добавить',
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.init.role();
                });
            });

            describe('Проверка', () => {
                befRole();
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
                        value: data.role1.name,
                        timeout: entry.max
                    });
                    decorate.el.table.cellGetText({
                        headTitle: 'Название',
                        strNumber: 1,
                        cellNumber: 2,
                        value: data.role1.description,
                        timeout: entry.max
                    });
                });

                describe('Проверка параметров', () => {
                    describe('Проверка общих параметров', () => {
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
                        decorate.init.roleEdit();
                        decorate.page.base.loading({
                            timeout: entry.sleep2
                        });
                        decorate.el.input.getValue({
                            title: 'Название',
                            placeholder: '',
                            value: data.role1.name,
                            timeout: entry.max
                        });
                        decorate.el.input.getValue({
                            title: 'Описание',
                            placeholder: '',
                            value: data.role1.description,
                            timeout: entry.max
                        });
                    });

                    describe('Проверка вкладки Помещения', () => {
                        decorate.el.simpleCell.active({
                            name: 'Помещения',
                            timeout: entry.max
                        });
                        decorate.page.base.loading({
                            timeout: entry.sleep2
                        })
                        decorate.el.placeholderText.getText({
                            text: 'Безусловные права на все помещения',
                            timeout: entry.max
                        });
                    });

                    describe('Проверка вкладки Подразделения', () => {
                        decorate.el.simpleCell.handler({
                            name: 'Подразделения',
                            timeout: entry.max
                        });
                        decorate.el.simpleCell.active({
                            name: 'Подразделения',
                            timeout: entry.max
                        });
                        decorate.page.base.loading({
                            timeout: entry.sleep2
                        });
                        decorate.el.placeholderText.getText({
                            text: 'Безусловные права на все подразделения',
                            timeout: entry.max
                        });
                    });

                    describe('Проверка вкладки Должности', () => {
                        decorate.el.simpleCell.handler({
                            name: 'Должности',
                            timeout: entry.max
                        });
                        decorate.el.simpleCell.active({
                            name: 'Должности',
                            timeout: entry.max
                        });
                        decorate.page.base.loading({
                            timeout: entry.sleep2
                        });
                        decorate.el.placeholderText.getText({
                            text: 'Безусловные права на все должности',
                            timeout: entry.max
                        });
                    });

                    describe('Проверка вкладки Графики работы', () => {
                        decorate.el.simpleCell.handler({
                            name: 'Графики работы',
                            timeout: entry.max
                        });
                        decorate.el.simpleCell.active({
                            name: 'Графики работы',
                            timeout: entry.max
                        });
                        decorate.page.base.loading({
                            timeout: entry.sleep2
                        });
                        decorate.el.placeholderText.getText({
                            text: 'Безусловные права на все графики работы',
                            timeout: entry.max
                        });
                    });

                    describe('Проверка вкладки Шаблоны доступа', () => {
                        decorate.el.simpleCell.handler({
                            name: 'Шаблоны доступа',
                            timeout: entry.max
                        });
                        decorate.el.simpleCell.active({
                            name: 'Шаблоны доступа',
                            timeout: entry.max
                        });
                        decorate.page.base.loading({
                            timeout: entry.sleep2
                        });
                        decorate.el.placeholderText.getText({
                            text: 'Безусловные права на все шаблоны доступа',
                            timeout: entry.max
                        });
                    });

                    describe('Проверка вкладки Шаблоны пропусков', () => {
                        decorate.el.simpleCell.handler({
                            name: 'Шаблоны пропусков',
                            timeout: entry.max
                        });
                        decorate.el.simpleCell.active({
                            name: 'Шаблоны пропусков',
                            timeout: entry.max
                        });
                        decorate.page.base.loading({
                            timeout: entry.sleep2
                        });
                        decorate.el.placeholderText.getText({
                            text: 'Безусловные права на все шаблоны пропусков',
                            timeout: entry.max
                        });
                    });

                    describe('Проверка вкладки Устройства', () => {
                        decorate.el.simpleCell.handler({
                            name: 'Устройства',
                            timeout: entry.max
                        });
                        decorate.el.simpleCell.active({
                            name: 'Устройства',
                            timeout: entry.max
                        });
                        decorate.page.base.loading({
                            timeout: entry.sleep2
                        });
                        decorate.el.placeholderText.getText({
                            text: 'Безусловные права на все устройства',
                            timeout: entry.max
                        });
                    });

                    describe('Проверка вкладки Шаблоны верификации', () => {
                        decorate.el.simpleCell.handler({
                            name: 'Шаблоны верификации',
                            timeout: entry.max
                        });
                        decorate.el.simpleCell.active({
                            name: 'Шаблоны верификации',
                            timeout: entry.max
                        });
                        decorate.page.base.loading({
                            timeout: entry.sleep2
                        });
                        decorate.el.placeholderText.getText({
                            text: 'Безусловные права на все шаблоны верификации',
                            timeout: entry.max
                        });
                    });

                    describe('Проверка вкладки Планы помещений', () => {
                        decorate.el.simpleCell.handler({
                            name: 'Планы помещений',
                            timeout: entry.max
                        });
                        decorate.el.simpleCell.active({
                            name: 'Планы помещений',
                            timeout: entry.max
                        });
                        decorate.page.base.loading({
                            timeout: entry.sleep2
                        });
                        decorate.el.placeholderText.getText({
                            text: 'Безусловные права на все планы помещений',
                            timeout: entry.max
                        });
                    });

                });
            });
        }

        if(type === 'operator') {

            describe('Добавление', () => {
                befOperator();
                aft();

                describe('Открытие на добавление', () => {
                    decorate.el.butIcBefore.handler({
                        icon: but.add,
                        timeout: entry.max
                    });
                    decorate.init.operatorAdd();
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                });

                describe('Общие', () => {
                    decorate.el.input.iconMenu({
                        title: 'Оператор',
                        placeholder: 'Выберите оператора',
                        timeout: entry.max
                    });
                    decorate.modal.staffSelect.init({
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.groupCell.handler({
                        name: data.operator1.fio,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.button.handler({
                        name: 'Выбрать',
                        timeout: entry.max
                    });
                    decorate.modal.staffSelect.initClose({
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });

                    decorate.el.input.sendKeys({
                        title: 'Роль',
                        placeholder: 'Выберите роль',
                        value: data.role1.name,
                        timeout: entry.max
                    });
                    decorate.el.selectXpand.xpand({
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.selectXpand.handler({
                        value: data.role1.name,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.selectXpand.xpandNoElement({
                        timeout: entry.max
                    });

                    decorate.el.input.sendKeys({
                        title: 'Описание',
                        placeholder: 'Описание',
                        value: data.role1.description,
                        timeout: entry.max
                    });
                });

                describe('Настройки входа', () => {
                    decorate.el.input.sendKeys({
                        title: 'Логин',
                        placeholder: 'Логин оператора',
                        value: data.operator1.login,
                        timeout: entry.max
                    });
                    decorate.el.input.sendKeys({
                        title: 'Пароль',
                        placeholder: 'Пароль оператора',
                        value: data.operator1.password,
                        timeout: entry.max
                    });
                    decorate.el.input.sendKeys({
                        title: 'Повторите пароль',
                        placeholder: 'Ещё раз, пожалуйста',
                        value: data.operator1.password,
                        timeout: entry.max
                    });
                });

                describe('Полномочия', () => {
                    decorate.page.operatorChange.sectionCheckboxHandler({
                        section: 'Персонал',
                        timeout: entry.max
                    });
                    decorate.page.operatorChange.sectionCheckboxHandler({
                        section: 'Бюро пропусков',
                        timeout: entry.max
                    });
                    decorate.page.operatorChange.sectionCheckboxHandler({
                        section: 'Учёт рабочего времени',
                        timeout: entry.max
                    });
                    decorate.page.operatorChange.sectionCheckboxHandler({
                        section: 'Контроль доступа',
                        timeout: entry.max
                    });
                    decorate.page.operatorChange.sectionCheckboxHandler({
                        section: 'Верификация',
                        timeout: entry.max
                    });
                    decorate.page.operatorChange.sectionCheckboxHandler({
                        section: 'Заказ пропуска',
                        timeout: entry.max
                    });
                    decorate.page.operatorChange.sectionCheckboxHandler({
                        section: 'Мониторинг',
                        timeout: entry.max
                    });
                    decorate.page.operatorChange.sectionCheckboxHandler({
                        section: 'Администрирование',
                        timeout: entry.max
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
                    decorate.init.operator();
                });

            });

            describe('Проверка', () => {
                befOperator();
                aft();

                describe('Проверка таблицы', () => {
                    decorate.el.table.cellGetText({
                        headTitle: 'Логин',
                        strNumber: 1,
                        cellNumber: 1,
                        value: data.operator1.login,
                        timeout: entry.max
                    });
                    decorate.el.table.cellGetText({
                        headTitle: 'Сотрудники',
                        strNumber: 1,
                        cellNumber: 2,
                        value: data.operator1.fio,
                        timeout: entry.max
                    });
                    decorate.el.table.cellGetText({
                        headTitle: 'Роль',
                        strNumber: 1,
                        cellNumber: 3,
                        value: data.role1.name,
                        timeout: entry.max
                    });
                    decorate.el.table.cellNoIconLock({
                        strNumber: 1,
                        cellNumber: 4,
                        timeout: entry.max
                    });
                    decorate.el.table.cellGetText({
                        headTitle: 'Описание',
                        strNumber: 1,
                        cellNumber: 5,
                        value: data.role1.description,
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
                    decorate.init.operatorEdit();
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.input.getValue({
                        title: 'Оператор',
                        placeholder: 'Выберите оператора',
                        value: data.operator1.fio,
                        timeout: entry.max
                    });
                    decorate.el.input.getValue({
                        title: 'Роль',
                        placeholder: 'Выберите роль',
                        value: data.role1.name,
                        timeout: entry.max
                    });
                    decorate.el.input.getValue({
                        title: 'Описание',
                        placeholder: 'Описание',
                        value: data.role1.description,
                        timeout: entry.max
                    });
                    decorate.el.input.getValue({
                        title: 'Логин',
                        placeholder: 'Логин оператора',
                        value: data.operator1.login,
                        timeout: entry.max
                    });
                    decorate.el.input.getValue({
                        title: 'Пароль',
                        placeholder: 'Пароль оператора',
                        value: '',
                        timeout: entry.max
                    });
                    decorate.el.input.getValue({
                        title: 'Повторите пароль',
                        placeholder: 'Ещё раз, пожалуйста',
                        value: '',
                        timeout: entry.max
                    });
                    decorate.page.operatorChange.sectionChecked({
                        section: 'Персонал',
                        timeout: entry.max
                    });
                    decorate.page.operatorChange.sectionChecked({
                        section: 'Бюро пропусков',
                        timeout: entry.max
                    });
                    decorate.page.operatorChange.sectionChecked({
                        section: 'Учёт рабочего времени',
                        timeout: entry.max
                    });
                    decorate.page.operatorChange.sectionChecked({
                        section: 'Контроль доступа',
                        timeout: entry.max
                    });
                    decorate.page.operatorChange.sectionChecked({
                        section: 'Верификация',
                        timeout: entry.max
                    });
                    decorate.page.operatorChange.sectionChecked({
                        section: 'Заказ пропуска',
                        timeout: entry.max
                    });
                    decorate.page.operatorChange.sectionChecked({
                        section: 'Мониторинг',
                        timeout: entry.max
                    });
                    decorate.page.operatorChange.sectionChecked({
                        section: 'Администрирование',
                        timeout: entry.max
                    });

                });
            });

            describe('Авторизация, проверка отображения раздела и удаление данных', () => {

                befNewOperator({
                    login: data.operator1.login,
                    password: data.operator1.password
                });
                aft();

                describe('Раздел Персонал', () => {

                    describe('Отображение', () => {
                        decorate.el.section.handler({
                            section: sec.per,
                            timeout: entry.max
                        });
                        decorate.el.section.active({
                            section: sec.per,
                            timeout: entry.max
                        });
                        decorate.page.base.loading({
                            timeout: entry.sleep2
                        });
                        decorate.el.subsection.subsection({
                            subsection: sub.per.staff,
                            timeout: entry.max
                        });
                        decorate.el.subsection.subsection({
                            subsection: sub.per.schedule,
                            timeout: entry.max
                        });
                        decorate.el.subsection.subsection({
                            subsection: sub.per.division,
                            timeout: entry.max
                        });
                        decorate.el.subsection.subsection({
                            subsection: sub.per.position,
                            timeout: entry.max
                        });
                        decorate.el.subsection.subsection({
                            subsection: sub.per.holiday,
                            timeout: entry.max
                        });
                        decorate.el.subsection.subsection({
                            subsection: sub.per.data,
                            timeout: entry.max
                        });
                    });

                    describe('Проверка подраздела Графики работы и удаление графика', () => {
                        decorate.el.subsection.handler({
                            subsection: sub.per.schedule,
                            timeout: entry.max
                        });
                        decorate.el.subsection.active({
                            subsection: sub.per.schedule,
                            timeout: entry.max
                        });
                        decorate.page.base.loading({
                            timeout: entry.sleep2
                        });
                        decorate.el.table.size({
                            strCount: 3,
                            timeout: entry.max
                        });
                        decorate.el.table.cellGetText({
                            headTitle: 'Название',
                            strNumber: 1,
                            cellNumber: 1,
                            value: data.schedules.schedule3.name,
                            timeout: entry.max
                        });
                        decorate.el.table.cellGetText({
                            headTitle: 'Название',
                            strNumber: 2,
                            cellNumber: 1,
                            value: data.schedules.schedule2.name,
                            timeout: entry.max
                        });
                        decorate.el.table.cellGetText({
                            headTitle: 'Название',
                            strNumber: 3,
                            cellNumber: 1,
                            value: data.schedules.schedule1.name,
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
                            icon: but.delete,
                            timeout :entry.max
                        });
                        decorate.modalConfirm.deleteSchedule.init({
                            timeout: entry.max
                        });
                        decorate.el.button.handler({
                            name: 'Удалить',
                            timeout: entry.max
                        });
                        decorate.modalConfirm.deleteSchedule.initClose({
                            timeout: entry.max
                        });
                        decorate.page.base.loading({
                            timeout: entry.sleep2
                        });
                        decorate.page.base.refresh();
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
                            value: data.schedules.schedule2.name,
                            timeout: entry.max
                        });
                        decorate.el.table.cellGetText({
                            headTitle: 'Название',
                            strNumber: 2,
                            cellNumber: 1,
                            value: data.schedules.schedule1.name,
                            timeout: entry.max
                        });
                    });

                    describe('Проверка подраздела Подразделения и удаление подразделения', () => {
                        decorate.el.subsection.handler({
                            subsection: sub.per.division,
                            timeout: entry.max
                        });
                        decorate.el.subsection.active({
                            subsection: sub.per.division,
                            timeout: entry.max
                        });
                        decorate.page.base.loading({
                            timeout: entry.sleep2
                        });
                        decorate.page.division.size({
                            size: 4,
                            timeout: entry.max
                        });
                        decorate.page.division.division({
                            arr: [data.divisions.division1.name],
                            timeout: entry.max
                        });
                        decorate.page.division.division({
                            arr: [data.divisions.division2.name],
                            timeout: entry.max
                        });
                        decorate.page.division.division({
                            arr: [data.divisions.division3.name],
                            timeout: entry.max
                        });
                        decorate.page.division.division({
                            arr: ['Администраторы системы'],
                            timeout: entry.max
                        });
                        decorate.page.division.handler({
                            arr: [data.divisions.division3.name],
                            timeout: entry.max
                        });
                        decorate.page.base.loading({
                            timeout: entry.sleep2
                        });
                        decorate.page.division.selected({
                            division: data.divisions.division3.name,
                            timeout: entry.max
                        });
                        decorate.el.butIcBefore.handler({
                            icon: but.delete,
                            timeout: entry.max
                        });
                        decorate.modalConfirm.divisionDelete.init({
                            timeout: entry.max
                        });
                        decorate.el.button.handler({
                            name: 'Удалить',
                            timeout: entry.max
                        });
                        decorate.modalConfirm.divisionDelete.initClose({
                            timeout: entry.max
                        });
                        decorate.page.base.loading({
                            timeout: entry.sleep2
                        });
                        decorate.page.base.refresh();
                        decorate.page.base.loading({
                            timeout: entry.sleep2
                        });
                        decorate.page.division.size({
                            size: 3,
                            timeout: entry.max
                        });
                        decorate.page.division.division({
                            arr: [data.divisions.division1.name],
                            timeout: entry.max
                        });
                        decorate.page.division.division({
                            arr: [data.divisions.division2.name],
                            timeout: entry.max
                        });
                        decorate.page.division.noDivision({
                            arr: [data.divisions.division3.name],
                            timeout: entry.min
                        });
                        decorate.page.division.division({
                            arr: ['Администраторы системы'],
                            timeout: entry.max
                        });
                    });

                    describe('Проверка подраздела Должности и удаление должности', () => {
                        decorate.el.subsection.handler({
                            subsection: sub.per.position,
                            timeout: entry.max
                        });
                        decorate.el.subsection.active({
                            subsection: sub.per.position,
                            timeout: entry.max
                        });
                        decorate.page.base.loading({
                            timeout: entry.sleep2
                        });
                        decorate.el.table.size({
                            strCount: 3,
                            timeout: entry.max
                        });
                        decorate.el.table.cellGetText({
                            headTitle: 'Должности',
                            strNumber: 1,
                            cellNumber: 1,
                            value: data.positions.position3.name,
                            timeout: entry.max
                        });
                        decorate.el.table.cellGetText({
                            headTitle: 'Должности',
                            strNumber: 2,
                            cellNumber: 1,
                            value: data.positions.position2.name,
                            timeout: entry.max
                        });
                        decorate.el.table.cellGetText({
                            headTitle: 'Должности',
                            strNumber: 3,
                            cellNumber: 1,
                            value: data.positions.position1.name,
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
                            icon: but.delete,
                            timeout :entry.max
                        });
                        decorate.modalConfirm.positionDelete.init({
                            timeout: entry.max
                        });
                        decorate.el.button.handler({
                            name: 'Удалить',
                            timeout: entry.max
                        });
                        decorate.modalConfirm.positionDelete.initClose({
                            timeout: entry.max
                        });
                        decorate.page.base.loading({
                            timeout: entry.sleep2
                        });
                        decorate.page.base.refresh();
                        decorate.page.base.loading({
                            timeout: entry.sleep2
                        });
                        decorate.el.table.size({
                            strCount: 2,
                            timeout: entry.max
                        });
                        decorate.el.table.cellGetText({
                            headTitle: 'Должности',
                            strNumber: 1,
                            cellNumber: 1,
                            value: data.positions.position2.name,
                            timeout: entry.max
                        });
                        decorate.el.table.cellGetText({
                            headTitle: 'Должности',
                            strNumber: 2,
                            cellNumber: 1,
                            value: data.positions.position1.name,
                            timeout: entry.max
                        });
                    });

                });

                describe('Раздел Бюро пропусков', () => {

                    describe('Отображение', () => {
                        decorate.el.section.handler({
                            section: sec.pas,
                            timeout: entry.max
                        });
                        decorate.el.section.active({
                            section: sec.pas,
                            timeout: entry.max
                        });
                        decorate.page.base.loading({
                            timeout: entry.sleep2
                        });
                        decorate.el.subsection.subsection({
                            subsection: sub.pas.visitor,
                            timeout: entry.max
                        });
                        decorate.el.subsection.subsection({
                            subsection: sub.pas.staff,
                            timeout: entry.max
                        });
                        decorate.el.subsection.subsection({
                            subsection: sub.pas.template,
                            timeout: entry.max
                        });
                        decorate.el.subsection.subsection({
                            subsection: sub.pas.design,
                            timeout: entry.max
                        });
                        decorate.el.subsection.subsection({
                            subsection: sub.pas.report,
                            timeout: entry.max
                        });
                    });

                    describe('Проверка подраздела Шаблон доступа и удаление шаблона', () => {
                        decorate.el.subsection.handler({
                            subsection: sub.pas.template,
                            timeout: entry.max
                        });
                        decorate.el.subsection.active({
                            subsection: sub.pas.template,
                            timeout: entry.max
                        });
                        decorate.page.base.loading({
                            timeout: entry.sleep2
                        });
                        decorate.el.tab.handler({
                            tab: 'Шаблоны доступа',
                            timeout: entry.max
                        });
                        decorate.page.base.loading({
                            timeout: entry.sleep2
                        });
                        decorate.el.table.size({
                            strCount: 3,
                            timeout: entry.max
                        });
                        decorate.el.table.cellGetText({
                            headTitle: 'Название',
                            strNumber: 1,
                            cellNumber: 1,
                            value: data.templates.template3,
                            timeout: entry.max
                        });
                        decorate.el.table.cellGetText({
                            headTitle: 'Название',
                            strNumber: 2,
                            cellNumber: 1,
                            value: data.templates.template2,
                            timeout: entry.max
                        });
                        decorate.el.table.cellGetText({
                            headTitle: 'Название',
                            strNumber: 3,
                            cellNumber: 1,
                            value: data.templates.template1,
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
                            icon: but.delete,
                            timeout :entry.max
                        });
                        decorate.modalConfirm.accessSchedulesDelete.init({
                            timeout: entry.max
                        });
                        decorate.el.button.handler({
                            name: 'Удалить',
                            timeout: entry.max
                        });
                        decorate.modalConfirm.accessSchedulesDelete.initClose({
                            timeout: entry.max
                        });
                        decorate.page.base.loading({
                            timeout: entry.sleep2
                        });
                        decorate.page.base.refresh();
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
                            value: data.templates.template2,
                            timeout: entry.max
                        });
                        decorate.el.table.cellGetText({
                            headTitle: 'Название',
                            strNumber: 2,
                            cellNumber: 1,
                            value: data.templates.template1,
                            timeout: entry.max
                        });
                    });

                    describe('Проверка подраздела Дизайн пропуска и удаление дизайна', () => {
                        decorate.el.subsection.handler({
                            subsection: sub.pas.design,
                            timeout: entry.max
                        });
                        decorate.el.subsection.active({
                            subsection: sub.pas.design,
                            timeout: entry.max
                        });
                        decorate.page.base.loading({
                            timeout: entry.sleep2
                        });
                        decorate.page.design.size({
                            size: 3,
                            timeout: entry.max
                        });
                        decorate.page.design.name({
                            num: 1,
                            value: data.design.design1,
                            timeout: entry.max
                        });
                        decorate.page.design.name({
                            num: 2,
                            value: data.design.design2,
                            timeout: entry.max
                        });
                        decorate.page.design.name({
                            num: 3,
                            value: data.design.design3,
                            timeout: entry.max
                        });
                        decorate.page.design.handler({
                            num: 3,
                            timeout: entry.max
                        });
                        decorate.page.base.loading({
                            timeout: entry.sleep2
                        });
                        decorate.el.butIcBefore.handler({
                            icon: but.delete,
                            timeout: entry.max
                        });
                        decorate.modalConfirm.designDelete.init({
                            timeout: entry.max
                        });
                        decorate.page.base.loading({
                            timeout: entry.sleep2
                        });
                        decorate.el.button.handler({
                            name: 'Удалить',
                            timeout: entry.max
                        });
                        decorate.modalConfirm.designDelete.initClose({
                            timeout: entry.max
                        });
                        decorate.page.base.loading({
                            timeout: entry.sleep2
                        });
                        decorate.page.base.refresh();
                        decorate.page.base.loading({
                            timeout: entry.sleep2
                        });
                        decorate.page.design.size({
                            size: 2,
                            timeout: entry.max
                        });
                        decorate.page.design.name({
                            num: 1,
                            value: data.design.design1,
                            timeout: entry.max
                        });
                        decorate.page.design.name({
                            num: 2,
                            value: data.design.design2,
                            timeout: entry.max
                        });
                    });

                });

                describe('Раздел УРВ', () => {
                    decorate.el.section.handler({
                        section: sec.urv,
                        timeout: entry.max
                    });
                    decorate.el.section.active({
                        section: sec.urv,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.urv.journal,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.urv.document,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.urv.tabel,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.urv.violator,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.urv.report,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.urv.presence,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.urv.support,
                        timeout: entry.max
                    });
                });

                describe('Раздел Контроль доступа', () => {
                    decorate.el.section.handler({
                        section: sec.con,
                        timeout: entry.max
                    });
                    decorate.el.section.active({
                        section: sec.con,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.con.premises,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.con.device,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.con.verif,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.con.room,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.con.location,
                        timeout: entry.max
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.con.card,
                        timeout: entry.max
                    });
                });

                describe('Раздел Верификация', () => {

                    describe('Отображение', () => {
                        decorate.el.section.handler({
                            section: sec.ver,
                            timeout: entry.max
                        });
                        decorate.el.section.active({
                            section: sec.ver,
                            timeout: entry.max
                        });
                        decorate.page.base.loading({
                            timeout: entry.sleep2
                        });
                        decorate.el.subsection.subsection({
                            subsection: sub.ver.verif,
                            timeout: entry.max
                        });
                        decorate.el.subsection.subsection({
                            subsection: sub.ver.config,
                            timeout: entry.max
                        });
                    });

                    describe('Проверка подраздела Конфигурация верификации и удаление конфигурации', () => {
                        decorate.el.subsection.handler({
                            subsection: sub.ver.config,
                            timeout: entry.max
                        });
                        decorate.el.subsection.active({
                            subsection: sub.ver.config,
                            timeout: entry.max
                        });
                        decorate.page.base.loading({
                            timeout: entry.sleep2
                        });
                        decorate.el.table.size({
                            strCount: 3,
                            timeout: entry.max
                        });
                        decorate.el.table.cellGetText({
                            headTitle: 'Название',
                            strNumber: 1,
                            cellNumber: 1,
                            value: data.verif.verify3,
                            timeout: entry.max
                        });
                        decorate.el.table.cellGetText({
                            headTitle: 'Название',
                            strNumber: 2,
                            cellNumber: 1,
                            value: data.verif.verify2,
                            timeout: entry.max
                        });
                        decorate.el.table.cellGetText({
                            headTitle: 'Название',
                            strNumber: 3,
                            cellNumber: 1,
                            value: data.verif.verify1,
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
                            icon: but.delete,
                            timeout :entry.max
                        });
                        decorate.modalConfirm.deleteVerifyConfig.init({
                            timeout: entry.max
                        });
                        decorate.el.button.handler({
                            name: 'Подтвердить',
                            timeout: entry.max
                        });
                        decorate.modalConfirm.deleteVerifyConfig.initClose({
                            timeout: entry.max
                        });
                        decorate.page.base.loading({
                            timeout: entry.sleep2
                        });
                        decorate.page.base.refresh();
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
                            value: data.verif.verify2,
                            timeout: entry.max
                        });
                        decorate.el.table.cellGetText({
                            headTitle: 'Название',
                            strNumber: 2,
                            cellNumber: 1,
                            value: data.verif.verify1,
                            timeout: entry.max
                        });
                    });

                });

                describe('Раздел Заказ пропуска', () => {
                    decorate.el.section.handler({
                        section: sec.ord,
                        timeout: entry.max
                    });
                    decorate.el.section.active({
                        section: sec.ord,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.ord.order,
                        timeout: entry.max
                    });
                });

                describe('Раздел Мониторинг', () => {
                    decorate.el.section.handler({
                        section: sec.mon,
                        timeout: entry.max
                    });
                    decorate.el.section.active({
                        section: sec.mon,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.subsection.subsection({
                        subsection: sub.mon.plan,
                        timeout: entry.max
                    });
                });

                describe('Раздел Конфигурация', () => {

                    describe('Отображение', () => {
                        decorate.el.section.handler({
                            section: sec.adm,
                            timeout: entry.max
                        });
                        decorate.el.section.active({
                            section: sec.adm,
                            timeout: entry.max
                        });
                        decorate.page.base.loading({
                            timeout: entry.sleep2
                        });
                        decorate.el.subsection.subsection({
                            subsection: sub.adm.conf,
                            timeout: entry.max
                        });
                        decorate.el.subsection.subsection({
                            subsection: sub.adm.event,
                            timeout: entry.max
                        });
                        decorate.el.subsection.subsection({
                            subsection: sub.adm.action,
                            timeout: entry.max
                        });
                        decorate.el.subsection.subsection({
                            subsection: sub.adm.task,
                            timeout: entry.max
                        });
                        decorate.el.subsection.subsection({
                            subsection: sub.adm.operator,
                            timeout: entry.max
                        });
                        decorate.el.subsection.subsection({
                            subsection: sub.adm.role,
                            timeout: entry.max
                        });
                        decorate.el.subsection.subsection({
                            subsection: sub.adm.license,
                            timeout: entry.max
                        });
                    });

                    describe('Проверка подраздела Конфигурация', () => {
                        describe('Конфиуграция - вкладка Помещения, удаление помещения', () => {
                            decorate.el.subsection.handler({
                                subsection: sub.adm.conf,
                                timeout: entry.max
                            });
                            decorate.el.subsection.active({
                                subsection: sub.adm.conf,
                                timeout: entry.max
                            });
                            decorate.el.tab.handler({
                                tab: 'Помещения',
                                timeout: entry.max
                            });
                            decorate.page.base.loading({
                                timeout: entry.sleep2
                            });
                            decorate.page.room.room({
                                arr: [data.rooms.room1],
                                timeout: entry.max
                            });
                            decorate.page.room.room({
                                arr: [data.rooms.room2],
                                timeout: entry.max
                            });
                            decorate.page.room.room({
                                arr: [data.rooms.room3],
                                timeout: entry.max
                            });
                            decorate.page.room.handler({
                                arr: [data.rooms.room3],
                                timeout: entry.max
                            });
                            decorate.page.base.loading({
                                timeout: entry.sleep2
                            });
                            decorate.el.butIcBefore.handler({
                                icon: but.delete,
                                timeout :entry.max
                            });
                            decorate.modalConfirm.roomDelete.init({
                                timeout: entry.max
                            });
                            decorate.el.button.handler({
                                name: 'Удалить',
                                timeout: entry.max
                            });
                            decorate.modalConfirm.roomDelete.initClose({
                                timeout: entry.max
                            });
                            decorate.page.base.loading({
                                timeout: entry.sleep2
                            });
                            decorate.page.base.refresh();
                            decorate.page.base.loading({
                                timeout: entry.sleep2
                            });
                            decorate.page.room.room({
                                arr: [data.rooms.room1],
                                timeout: entry.max
                            });
                            decorate.page.room.room({
                                arr: [data.rooms.room2],
                                timeout: entry.max
                            });
                            decorate.page.room.noRoom({
                                arr: [data.rooms.room3],
                                timeout: entry.max
                            });
                        });

                        describe('Конфиуграция - вкладка Устройства, удаление устройства', () => {
                            decorate.el.tab.handler({
                                tab: 'Устройства',
                                timeout: entry.max
                            });
                            decorate.page.base.loading({
                                timeout: entry.sleep2
                            });
                            decorate.page.device.device({
                                name: data.devices.device1.name,
                                ip: data.devices.device1.ip,
                                timeout: entry.max
                            });
                            decorate.page.device.device({
                                name: data.devices.device2.name,
                                ip: data.devices.device2.ip,
                                timeout: entry.max
                            });
                            decorate.page.device.device({
                                name: data.devices.device3.name,
                                ip: data.devices.device3.ip,
                                timeout: entry.max
                            });
                            decorate.page.device.handler({
                                name: data.devices.device3.name,
                                ip: data.devices.device3.ip,
                                timeout: entry.max
                            });
                            decorate.page.base.loading({
                                timeout: entry.sleep2
                            });
                            decorate.el.butIcBefore.handler({
                                icon: but.delete,
                                timeout :entry.max
                            });
                            decorate.modalConfirm.deviceDelete.init({
                                timeout: entry.max
                            });
                            decorate.el.button.handler({
                                name: 'Удалить',
                                timeout: entry.max
                            });
                            decorate.modalConfirm.deviceDelete.initClose({
                                timeout: entry.max
                            });
                            decorate.page.base.loading({
                                timeout: entry.sleep2
                            });
                            decorate.page.base.refresh();
                            decorate.page.base.loading({
                                timeout: entry.sleep2
                            });
                            decorate.page.device.device({
                                name: data.devices.device1.name,
                                ip: data.devices.device1.ip,
                                timeout: entry.max
                            });
                            decorate.page.device.device({
                                name: data.devices.device2.name,
                                ip: data.devices.device2.ip,
                                timeout: entry.max
                            });
                            decorate.page.device.noDevice({
                                name: data.devices.device3.name,
                                ip: data.devices.device3.ip,
                                timeout: entry.max
                            });
                        });
                    });

                });
            });
        }
    });

    const edit = () => describe(text + 'Редактирование с ограничением прав доступа.', () => {

        if(type === 'role') {
            describe('Редактирование роли', () => {
                befRole();
                aft();

                describe('Открытие на редактирование и общая настройка', () => {
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
                    decorate.init.roleEdit();
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.input.backSpace({
                        title: 'Название',
                        placeholder: '',
                        timeout: entry.max
                    });
                    decorate.el.input.sendKeys({
                        title: 'Название',
                        placeholder: '',
                        value: data.role2.name,
                        timeout: entry.max
                    });
                    decorate.el.input.backSpace({
                        title: 'Описание',
                        placeholder: '',
                        value: data.role1.description,
                        timeout: entry.max
                    });
                    decorate.el.input.sendKeys({
                        title: 'Описание',
                        placeholder: '',
                        value: data.role2.description,
                        timeout: entry.max
                    });
                });

                describe('Настройка вкладки Помещения', () => {
                    decorate.el.simpleCell.active({
                        name: 'Помещения',
                        timeout: entry.max
                    });
                    decorate.el.placeholderText.getText({
                        text: 'Безусловные права на все помещения',
                        timeout: entry.max
                    });
                    decorate.el.butIcAfter.handler({
                        icon: but.av_library_add_check,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.nodeCheckbox.unchecked({
                        name: data.rooms.room1,
                        timeout: entry.max
                    });
                    decorate.el.nodeCheckbox.unchecked({
                        name: data.rooms.room2,
                        timeout: entry.max
                    });
                    decorate.el.butIcBefore.handler({
                        icon: but.action_done_all,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.nodeCheckbox.checked({
                        name: data.rooms.room1,
                        timeout: entry.max
                    });
                    decorate.el.nodeCheckbox.checked({
                        name: data.rooms.room2,
                        timeout: entry.max
                    });
                    decorate.el.butIcBefore.handler({
                        icon: but.action_remove_done,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.nodeCheckbox.unchecked({
                        name: data.rooms.room1,
                        timeout: entry.max
                    });
                    decorate.el.nodeCheckbox.unchecked({
                        name: data.rooms.room2,
                        timeout: entry.max
                    });
                    decorate.el.nodeCheckbox.handler({
                        name: data.rooms.room1,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                });

                describe('Настройка вкладки Подразделения', () => {
                    decorate.el.simpleCell.handler({
                        name: 'Подразделения',
                        timeout: entry.max
                    });
                    decorate.el.simpleCell.active({
                        name: 'Подразделения',
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.placeholderText.getText({
                        text: 'Безусловные права на все подразделения',
                        timeout: entry.max
                    });
                    decorate.el.butIcAfter.handler({
                        icon: but.av_library_add_check,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.nodeCheckbox.unchecked({
                        name: data.divisions.division1.name,
                        timeout: entry.max
                    });
                    decorate.el.nodeCheckbox.unchecked({
                        name: data.divisions.division2.name,
                        timeout: entry.max
                    });
                    decorate.el.nodeCheckbox.unchecked({
                        name: 'Администраторы системы',
                        timeout: entry.max
                    });
                    decorate.el.butIcBefore.handler({
                        icon: but.action_done_all,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.nodeCheckbox.checked({
                        name: data.divisions.division1.name,
                        timeout: entry.max
                    });
                    decorate.el.nodeCheckbox.checked({
                        name: data.divisions.division2.name,
                        timeout: entry.max
                    });
                    decorate.el.nodeCheckbox.checked({
                        name: 'Администраторы системы',
                        timeout: entry.max
                    });
                    decorate.el.butIcBefore.handler({
                        icon: but.action_remove_done,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.nodeCheckbox.unchecked({
                        name: data.divisions.division1.name,
                        timeout: entry.max
                    });
                    decorate.el.nodeCheckbox.unchecked({
                        name: data.divisions.division2.name,
                        timeout: entry.max
                    });
                    decorate.el.nodeCheckbox.unchecked({
                        name: 'Администраторы системы',
                        timeout: entry.max
                    });
                    decorate.el.nodeCheckbox.handler({
                        name: data.divisions.division1.name,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                });

                describe('Настройка вкладки Должности', () => {
                    decorate.el.simpleCell.handler({
                        name: 'Должности',
                        timeout: entry.max
                    });
                    decorate.el.simpleCell.active({
                        name: 'Должности',
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.placeholderText.getText({
                        text: 'Безусловные права на все должности',
                        timeout: entry.max
                    });
                    decorate.el.butIcAfter.handler({
                        icon: but.av_library_add_check,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.butIcBefore.handler({
                        icon: but.action_done_all,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.groupCell.active({
                        name: data.positions.position1.name,
                        timeout: entry.max
                    });
                    decorate.el.groupCell.active({
                        name: data.positions.position2.name,
                        timeout: entry.max
                    });
                    decorate.el.butIcBefore.handler({
                        icon: but.action_remove_done,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.groupCell.handler({
                        name: data.positions.position1.name,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                });

                describe('Настройка вкладки Графики работы', () => {
                    decorate.el.simpleCell.handler({
                        name: 'Графики работы',
                        timeout: entry.max
                    });
                    decorate.el.simpleCell.active({
                        name: 'Графики работы',
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.placeholderText.getText({
                        text: 'Безусловные права на все графики работы',
                        timeout: entry.max
                    });
                    decorate.el.butIcAfter.handler({
                        icon: but.av_library_add_check,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.butIcBefore.handler({
                        icon: but.action_done_all,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.groupCell.active({
                        name: data.schedules.schedule1.name,
                        timeout: entry.max
                    });
                    decorate.el.groupCell.active({
                        name:  data.schedules.schedule2.name,
                        timeout: entry.max
                    });
                    decorate.el.butIcBefore.handler({
                        icon: but.action_remove_done,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.groupCell.handler({
                        name: data.schedules.schedule1.name,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                });

                describe('Настройка вкладки Шаблоны доступа', () => {
                    decorate.el.simpleCell.handler({
                        name: 'Шаблоны доступа',
                        timeout: entry.max
                    });
                    decorate.el.simpleCell.active({
                        name: 'Шаблоны доступа',
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.placeholderText.getText({
                        text: 'Безусловные права на все шаблоны доступа',
                        timeout: entry.max
                    });
                    decorate.el.butIcAfter.handler({
                        icon: but.av_library_add_check,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.butIcBefore.handler({
                        icon: but.action_done_all,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.groupCell.active({
                        name: data.templates.template1,
                        timeout: entry.max
                    });
                    decorate.el.groupCell.active({
                        name: data.templates.template2,
                        timeout: entry.max
                    });
                    decorate.el.butIcBefore.handler({
                        icon: but.action_remove_done,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.groupCell.handler({
                        name: data.templates.template1,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                });

                describe('Настройка вкладки Шаблоны пропусков', () => {
                    decorate.el.simpleCell.handler({
                        name: 'Шаблоны пропусков',
                        timeout: entry.max
                    });
                    decorate.el.simpleCell.active({
                        name: 'Шаблоны пропусков',
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.placeholderText.getText({
                        text: 'Безусловные права на все шаблоны пропусков',
                        timeout: entry.max
                    });
                    decorate.el.butIcAfter.handler({
                        icon: but.av_library_add_check,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.butIcBefore.handler({
                        icon: but.action_done_all,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.groupCell.active({
                        name: data.design.design1,
                        timeout: entry.max
                    });
                    decorate.el.groupCell.active({
                        name: data.design.design2,
                        timeout: entry.max
                    });
                    decorate.el.butIcBefore.handler({
                        icon: but.action_remove_done,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.groupCell.handler({
                        name: data.design.design1,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                });

                describe('Настройка вкладки Устройства', () => {
                    decorate.el.simpleCell.handler({
                        name: 'Устройства',
                        timeout: entry.max
                    });
                    decorate.el.simpleCell.active({
                        name: 'Устройства',
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    })
                    decorate.el.placeholderText.getText({
                        text: 'Безусловные права на все устройства',
                        timeout: entry.max
                    });
                    decorate.el.butIcAfter.handler({
                        icon: but.av_library_add_check,
                        timeout: entry.max
                    });
                    decorate.el.nodeCheckbox.unchecked({
                        name: data.devices.device1.name,
                        timeout: entry.max
                    });
                    decorate.el.nodeCheckbox.unchecked({
                        name: data.devices.device2.name,
                        timeout: entry.max
                    });
                    decorate.el.butIcBefore.handler({
                        icon: but.action_done_all,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.nodeCheckbox.checked({
                        name: data.devices.device1.name,
                        timeout: entry.max
                    });
                    decorate.el.nodeCheckbox.checked({
                        name: data.devices.device2.name,
                        timeout: entry.max
                    });
                    decorate.el.butIcBefore.handler({
                        icon: but.action_remove_done,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.nodeCheckbox.unchecked({
                        name: data.devices.device1.name,
                        timeout: entry.max
                    });
                    decorate.el.nodeCheckbox.unchecked({
                        name: data.devices.device2.name,
                        timeout: entry.max
                    });
                    decorate.el.nodeCheckbox.handler({
                        name: data.devices.device1.name,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                });

                describe('Настройка вкладки Шаблоны верификации', () => {
                    decorate.el.simpleCell.handler({
                        name: 'Шаблоны верификации',
                        timeout: entry.max
                    });
                    decorate.el.simpleCell.active({
                        name: 'Шаблоны верификации',
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    })
                    decorate.el.placeholderText.getText({
                        text: 'Безусловные права на все шаблоны верификации',
                        timeout: entry.max
                    });
                    decorate.el.butIcAfter.handler({
                        icon: but.av_library_add_check,
                        timeout: entry.max
                    });
                });

                describe('Настройка вкладки Планы помещений', () => {
                    decorate.el.simpleCell.handler({
                        name: 'Планы помещений',
                        timeout: entry.max
                    });
                    decorate.el.simpleCell.active({
                        name: 'Планы помещений',
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.placeholderText.getText({
                        text: 'Безусловные права на все планы помещений',
                        timeout: entry.max
                    });
                    decorate.el.butIcAfter.handler({
                        icon: but.av_library_add_check,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.butIcBefore.handler({
                        icon: but.action_done_all,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.groupCell.active({
                        name: data.plans.plan1,
                        timeout: entry.max
                    });
                    decorate.el.groupCell.active({
                        name: data.plans.plan2,
                        timeout: entry.max
                    });
                    decorate.el.butIcBefore.handler({
                        icon: but.action_remove_done,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.groupCell.handler({
                        name: data.plans.plan1,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                });

                describe('Сохрание и выход', () => {
                    decorate.el.button.handler({
                        name: 'Сохранить изменения',
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.init.role();
                });
            });

            describe('Проверка', () => {
                befRole();
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
                        value: data.role2.name,
                        timeout: entry.max
                    });
                    decorate.el.table.cellGetText({
                        headTitle: 'Описание',
                        strNumber: 1,
                        cellNumber: 2,
                        value: data.role2.description,
                        timeout: entry.max
                    });
                });

                describe('Проверка параметров', () => {

                    describe('Проверка общих параметров', () => {
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
                        decorate.init.roleEdit();
                        decorate.page.base.loading({
                            timeout: entry.sleep2
                        });
                        decorate.el.input.getValue({
                            title: 'Название',
                            placeholder: '',
                            value: data.role2.name,
                            timeout: entry.max
                        });
                        decorate.el.input.getValue({
                            title: 'Описание',
                            placeholder: '',
                            value: data.role2.description,
                            timeout: entry.max
                        });
                    });

                    describe('Проверка вкладки Помещения', () => {
                        decorate.el.simpleCell.active({
                            name: 'Помещения',
                            timeout: entry.max
                        });
                        decorate.page.base.loading({
                            timeout: entry.sleep2
                        })
                        decorate.el.nodeCheckbox.checked({
                            name: data.rooms.room1,
                            timeout: entry.max
                        });
                        decorate.el.nodeCheckbox.unchecked({
                            name: data.rooms.room2,
                            timeout: entry.max
                        });
                    });

                    describe('Проверка вкладки Подразделения', () => {
                        decorate.el.simpleCell.handler({
                            name: 'Подразделения',
                            timeout: entry.max
                        });
                        decorate.el.simpleCell.active({
                            name: 'Подразделения',
                            timeout: entry.max
                        });
                        decorate.page.base.loading({
                            timeout: entry.sleep2
                        });
                        decorate.el.nodeCheckbox.checked({
                            name: data.divisions.division1.name,
                            timeout: entry.max
                        });
                        decorate.el.nodeCheckbox.unchecked({
                            name: data.divisions.division2.name,
                            timeout: entry.max
                        });
                        decorate.el.nodeCheckbox.unchecked({
                            name: 'Администраторы системы',
                            timeout: entry.max
                        });
                    });

                    describe('Проверка вкладки Должности', () => {
                        decorate.el.simpleCell.handler({
                            name: 'Должности',
                            timeout: entry.max
                        });
                        decorate.el.simpleCell.active({
                            name: 'Должности',
                            timeout: entry.max
                        });
                        decorate.page.base.loading({
                            timeout: entry.sleep2
                        });
                        decorate.el.groupCell.active({
                            name: data.positions.position1.name,
                            timeout: entry.max
                        });
                    });

                    describe('Проверка вкладки Графики работы', () => {
                        decorate.el.simpleCell.handler({
                            name: 'Графики работы',
                            timeout: entry.max
                        });
                        decorate.el.simpleCell.active({
                            name: 'Графики работы',
                            timeout: entry.max
                        });
                        decorate.page.base.loading({
                            timeout: entry.sleep2
                        });
                        decorate.el.groupCell.active({
                            name: data.schedules.schedule1.name,
                            timeout: entry.max
                        });
                    });

                    describe('Проверка вкладки Шаблоны доступа', () => {
                        decorate.el.simpleCell.handler({
                            name: 'Шаблоны доступа',
                            timeout: entry.max
                        });
                        decorate.el.simpleCell.active({
                            name: 'Шаблоны доступа',
                            timeout: entry.max
                        });
                        decorate.page.base.loading({
                            timeout: entry.sleep2
                        });
                        decorate.el.groupCell.active({
                            name: data.templates.template1,
                            timeout: entry.max
                        });
                    });

                    describe('Проверка вкладки Шаблоны пропусков', () => {
                        decorate.el.simpleCell.handler({
                            name: 'Шаблоны пропусков',
                            timeout: entry.max
                        });
                        decorate.el.simpleCell.active({
                            name: 'Шаблоны пропусков',
                            timeout: entry.max
                        });
                        decorate.page.base.loading({
                            timeout: entry.sleep2
                        });
                        decorate.el.groupCell.active({
                            name: data.design.design1,
                            timeout: entry.max
                        });
                    });

                    describe('Проверка вкладки Устройства', () => {
                        decorate.el.simpleCell.handler({
                            name: 'Устройства',
                            timeout: entry.max
                        });
                        decorate.el.simpleCell.active({
                            name: 'Устройства',
                            timeout: entry.max
                        });
                        decorate.page.base.loading({
                            timeout: entry.sleep2
                        });
                        decorate.el.nodeCheckbox.checked({
                            name: data.devices.device1.name,
                            timeout: entry.max
                        });
                        decorate.el.nodeCheckbox.unchecked({
                            name: data.devices.device2.name,
                            timeout: entry.max
                        });
                    });

                    describe('Проверка вкладки Шаблоны верификации', () => {
                        decorate.el.simpleCell.handler({
                            name: 'Шаблоны верификации',
                            timeout: entry.max
                        });
                        decorate.el.simpleCell.active({
                            name: 'Шаблоны верификации',
                            timeout: entry.max
                        });
                        decorate.page.base.loading({
                            timeout: entry.sleep2
                        });
                    });

                    describe('Проверка вкладки Планы помещений', () => {
                        decorate.el.simpleCell.handler({
                            name: 'Планы помещений',
                            timeout: entry.max
                        });
                        decorate.el.simpleCell.active({
                            name: 'Планы помещений',
                            timeout: entry.max
                        });
                        decorate.page.base.loading({
                            timeout: entry.sleep2
                        });
                        decorate.el.groupCell.active({
                            name: data.plans.plan1,
                            timeout: entry.max
                        });
                    });

                });
            });
        }

        if(type === 'operator') {

            describe('Редактирвоание оператора', () => {
                befOperator();
                aft();

                describe('Открытие на редактирование', () => {
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
                    decorate.init.operatorEdit();
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                });

                describe('Общие', () => {
                    decorate.el.input.iconMenu({
                        title: 'Оператор',
                        placeholder: 'Выберите оператора',
                        timeout: entry.max
                    });
                    decorate.modal.staffSelect.init({
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.groupCell.handler({
                        name: data.operator2.fio,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.button.handler({
                        name: 'Выбрать',
                        timeout: entry.max
                    });
                    decorate.modal.staffSelect.initClose({
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });

                    decorate.el.input.sendKeys({
                        title: 'Роль',
                        placeholder: 'Выберите роль',
                        value: data.role2.name,
                        timeout: entry.max
                    });
                    decorate.el.selectXpand.xpand({
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.selectXpand.handler({
                        value: data.role2.name,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.selectXpand.xpandNoElement({
                        timeout: entry.max
                    });

                    decorate.el.input.backSpace({
                        title: 'Описание',
                        placeholder: 'Описание',
                        timeout: entry.max
                    });
                    decorate.el.input.sendKeys({
                        title: 'Описание',
                        placeholder: 'Описание',
                        value: data.role2.description,
                        timeout: entry.max
                    });
                });

                describe('Настройки входа', () => {
                    decorate.el.input.backSpace({
                        title: 'Логин',
                        placeholder: 'Логин оператора',
                        timeout: entry.max
                    });
                    decorate.el.input.sendKeys({
                        title: 'Логин',
                        placeholder: 'Логин оператора',
                        value: data.operator2.login,
                        timeout: entry.max
                    });
                    decorate.el.input.backSpace({
                        title: 'Пароль',
                        placeholder: 'Пароль оператора',
                        timeout: entry.max
                    });
                    decorate.el.input.sendKeys({
                        title: 'Пароль',
                        placeholder: 'Пароль оператора',
                        value: data.operator2.password,
                        timeout: entry.max
                    });
                    decorate.el.input.backSpace({
                        title: 'Повторите пароль',
                        placeholder: 'Ещё раз, пожалуйста',
                        timeout: entry.max
                    });
                    decorate.el.input.sendKeys({
                        title: 'Повторите пароль',
                        placeholder: 'Ещё раз, пожалуйста',
                        value: data.operator2.password,
                        timeout: entry.max
                    });
                });

                describe('Полномочия', () => {
                    describe('Персонал', () => {
                        decorate.page.operatorChange.hideShow({
                            section: 'Персонал',
                            timeout: entry.max
                        });
                        decorate.page.base.loading({
                            timeout: entry.sleep2
                        });
                        decorate.page.operatorChange.subsectionCheckboxHandler({
                            section: 'Персонал',
                            subsection: 'Праздничные дни',
                            timeout: entry.max
                        });
                        decorate.page.operatorChange.subsectionCheckboxHandler({
                            section: 'Персонал',
                            subsection: 'Дополнительные данные',
                            timeout: entry.max
                        });
                        decorate.page.base.loading({
                            timeout: entry.sleep2
                        });
                        decorate.page.operatorChange.hideShow({
                            section: 'Персонал',
                            timeout: entry.max
                        });
                        decorate.page.base.loading({
                            timeout: entry.sleep2
                        });
                    });

                    describe('Бюро пропусков', () => {
                        decorate.page.operatorChange.hideShow({
                            section: 'Бюро пропусков',
                            timeout: entry.max
                        });
                        decorate.page.base.loading({
                            timeout: entry.sleep2
                        });
                        decorate.page.operatorChange.subsectionCheckboxHandler({
                            section: 'Бюро пропусков',
                            subsection: 'Посетители',
                            timeout: entry.max
                        });
                        decorate.page.operatorChange.subsectionCheckboxHandler({
                            section: 'Бюро пропусков',
                            subsection: 'Сотрудники',
                            timeout: entry.max
                        });
                        decorate.page.operatorChange.subsectionCheckboxHandler({
                            section: 'Бюро пропусков',
                            subsection: 'Отчет по посетителям',
                            timeout: entry.max
                        });
                        decorate.page.base.loading({
                            timeout: entry.sleep2
                        });
                        decorate.page.operatorChange.hideShow({
                            section: 'Бюро пропусков',
                            timeout: entry.max
                        });
                        decorate.page.base.loading({
                            timeout: entry.sleep2
                        });
                    });

                    describe('Учёт рабочего времени', () => {
                        decorate.page.operatorChange.sectionCheckboxHandler({
                            section: 'Учёт рабочего времени',
                            timeout: entry.max
                        });
                        decorate.page.base.loading({
                            timeout: entry.sleep2
                        });
                    });

                    describe('Контроль доступа', () => {
                        decorate.page.operatorChange.sectionCheckboxHandler({
                            section: 'Контроль доступа',
                            timeout: entry.max
                        });
                        decorate.page.base.loading({
                            timeout: entry.sleep2
                        });
                    });

                    describe('Верификация', () => {
                        decorate.page.operatorChange.sectionCheckboxHandler({
                            section: 'Верификация',
                            timeout: entry.max
                        });
                        decorate.page.base.loading({
                            timeout: entry.sleep2
                        });
                    });

                    describe('Заказ пропуска', () => {
                        decorate.page.operatorChange.sectionCheckboxHandler({
                            section: 'Заказ пропуска',
                            timeout: entry.max
                        });
                        decorate.page.base.loading({
                            timeout: entry.sleep2
                        });
                    });

                    describe('Мониторинг', () => {
                        decorate.page.operatorChange.sectionCheckboxHandler({
                            section: 'Мониторинг',
                            timeout: entry.max
                        });
                        decorate.page.base.loading({
                            timeout: entry.sleep2
                        });
                    });

                    describe('Администрирование', () => {
                        decorate.page.operatorChange.hideShow({
                            section: 'Администрирование',
                            timeout: entry.max
                        });
                        decorate.page.base.loading({
                            timeout: entry.sleep2
                        });
                        decorate.page.operatorChange.subsectionCheckboxHandler({
                            section: 'Администрирование',
                            subsection: 'События системы',
                            timeout: entry.max
                        });
                        decorate.page.operatorChange.subsectionCheckboxHandler({
                            section: 'Администрирование',
                            subsection: 'Реакции на события',
                            timeout: entry.max
                        });
                        decorate.page.operatorChange.subsectionCheckboxHandler({
                            section: 'Администрирование',
                            subsection: 'Задания',
                            timeout: entry.max
                        });
                        decorate.page.base.loading({
                            timeout: entry.sleep2
                        });
                        decorate.page.operatorChange.hideShow({
                            section: 'Администрирование',
                            timeout: entry.max
                        });
                        decorate.page.base.loading({
                            timeout: entry.sleep2
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
                    decorate.init.operator();
                });

            });

            describe('Проверка', () => {
                befOperator();
                aft();

                describe('Проверка таблицы', () => {
                    decorate.el.table.cellGetText({
                        headTitle: 'Логин',
                        strNumber: 1,
                        cellNumber: 1,
                        value: data.operator2.login,
                        timeout: entry.max
                    });
                    decorate.el.table.cellGetText({
                        headTitle: 'Сотрудники',
                        strNumber: 1,
                        cellNumber: 2,
                        value: data.operator2.fio,
                        timeout: entry.max
                    });
                    decorate.el.table.cellGetText({
                        headTitle: 'Роль',
                        strNumber: 1,
                        cellNumber: 3,
                        value: data.role2.name,
                        timeout: entry.max
                    });
                    decorate.el.table.cellNoIconLock({
                        strNumber: 1,
                        cellNumber: 4,
                        timeout: entry.max
                    });
                    decorate.el.table.cellGetText({
                        headTitle: 'Описание',
                        strNumber: 1,
                        cellNumber: 5,
                        value: data.role2.description,
                        timeout: entry.max
                    });
                });

                describe('Проверка параметров', () => {
                    describe('Открытие на редактирование', () => {
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
                        decorate.init.operatorEdit();
                        decorate.page.base.loading({
                            timeout: entry.sleep2
                        });
                    });

                    describe('Общие', () => {
                        decorate.el.input.getValue({
                            title: 'Оператор',
                            placeholder: 'Выберите оператора',
                            value: data.operator2.fio,
                            timeout: entry.max
                        });
                        decorate.el.input.getValue({
                            title: 'Роль',
                            placeholder: 'Выберите роль',
                            value: data.role2.name,
                            timeout: entry.max
                        });
                        decorate.el.input.getValue({
                            title: 'Описание',
                            placeholder: 'Описание',
                            value: data.role2.description,
                            timeout: entry.max
                        });
                    });

                    describe('Настройки входа', () => {
                        decorate.el.input.getValue({
                            title: 'Логин',
                            placeholder: 'Логин оператора',
                            value: data.operator2.login,
                            timeout: entry.max
                        });
                        decorate.el.input.getValue({
                            title: 'Пароль',
                            placeholder: 'Пароль оператора',
                            value: '',
                            timeout: entry.max
                        });
                        decorate.el.input.getValue({
                            title: 'Повторите пароль',
                            placeholder: 'Ещё раз, пожалуйста',
                            value: '',
                            timeout: entry.max
                        });
                    });

                    describe('Полномочия', () => {
                        describe('Персонал', () => {
                            decorate.page.operatorChange.hideShow({
                                section: 'Персонал',
                                timeout: entry.max
                            });
                            decorate.page.base.loading({
                                timeout: entry.sleep2
                            });
                            decorate.page.operatorChange.subsectionChecked({
                                section: 'Персонал',
                                subsection: 'Сотрудники',
                                timeout: entry.max
                            });
                            decorate.page.operatorChange.subsectionChecked({
                                section: 'Персонал',
                                subsection: 'Графики работы',
                                timeout: entry.max
                            });
                            decorate.page.operatorChange.subsectionChecked({
                                section: 'Персонал',
                                subsection: 'Подразделения',
                                timeout: entry.max
                            });
                            decorate.page.operatorChange.subsectionChecked({
                                section: 'Персонал',
                                subsection: 'Должности',
                                timeout: entry.max
                            });
                            decorate.page.operatorChange.subsectionUnchecked({
                                section: 'Персонал',
                                subsection: 'Праздничные дни',
                                timeout: entry.max
                            });
                            decorate.page.operatorChange.subsectionUnchecked({
                                section: 'Персонал',
                                subsection: 'Дополнительные данные',
                                timeout: entry.max
                            });
                            decorate.page.base.loading({
                                timeout: entry.sleep2
                            });
                            decorate.page.operatorChange.hideShow({
                                section: 'Персонал',
                                timeout: entry.max
                            });
                            decorate.page.base.loading({
                                timeout: entry.sleep2
                            });
                        });

                        describe('Бюро пропусков', () => {
                            decorate.page.operatorChange.hideShow({
                                section: 'Бюро пропусков',
                                timeout: entry.max
                            });
                            decorate.page.base.loading({
                                timeout: entry.sleep2
                            });
                            decorate.page.operatorChange.subsectionUnchecked({
                                section: 'Бюро пропусков',
                                subsection: 'Посетители',
                                timeout: entry.max
                            });
                            decorate.page.operatorChange.subsectionUnchecked({
                                section: 'Бюро пропусков',
                                subsection: 'Сотрудники',
                                timeout: entry.max
                            });
                            decorate.page.operatorChange.subsectionChecked({
                                section: 'Бюро пропусков',
                                subsection: 'Шаблоны доступа',
                                timeout: entry.max
                            });
                            decorate.page.operatorChange.subsectionChecked({
                                section: 'Бюро пропусков',
                                subsection: 'Дизайн пропуска',
                                timeout: entry.max
                            });
                            decorate.page.operatorChange.subsectionUnchecked({
                                section: 'Бюро пропусков',
                                subsection: 'Отчет по посетителям',
                                timeout: entry.max
                            });
                            decorate.page.base.loading({
                                timeout: entry.sleep2
                            });
                            decorate.page.operatorChange.hideShow({
                                section: 'Бюро пропусков',
                                timeout: entry.max
                            });
                            decorate.page.base.loading({
                                timeout: entry.sleep2
                            });
                        });

                        describe('Учёт рабочего времени', () => {
                            decorate.page.operatorChange.sectionUnchecked({
                                section: 'Учёт рабочего времени',
                                timeout: entry.max
                            });
                        });

                        describe('Контроль доступа', () => {
                            decorate.page.operatorChange.sectionUnchecked({
                                section: 'Контроль доступа',
                                timeout: entry.max
                            });
                        });

                        describe('Верификация', () => {
                            decorate.page.operatorChange.sectionUnchecked({
                                section: 'Верификация',
                                timeout: entry.max
                            });
                        });

                        describe('Заказ пропуска', () => {
                            decorate.page.operatorChange.sectionUnchecked({
                                section: 'Заказ пропуска',
                                timeout: entry.max
                            });
                        });

                        describe('Мониторинг', () => {
                            decorate.page.operatorChange.sectionUnchecked({
                                section: 'Мониторинг',
                                timeout: entry.max
                            });
                        });

                        describe('Администрирование', () => {
                            decorate.page.operatorChange.hideShow({
                                section: 'Администрирование',
                                timeout: entry.max
                            });
                            decorate.page.base.loading({
                                timeout: entry.sleep2
                            });
                            decorate.page.operatorChange.subsectionChecked({
                                section: 'Администрирование',
                                subsection: 'Конфигурация',
                                timeout: entry.max
                            });
                            decorate.page.operatorChange.subsectionUnchecked({
                                section: 'Администрирование',
                                subsection: 'События системы',
                                timeout: entry.max
                            });
                            decorate.page.operatorChange.subsectionUnchecked({
                                section: 'Администрирование',
                                subsection: 'Реакции на события',
                                timeout: entry.max
                            });
                            decorate.page.operatorChange.subsectionUnchecked({
                                section: 'Администрирование',
                                subsection: 'Задания',
                                timeout: entry.max
                            });
                            decorate.page.operatorChange.subsectionChecked({
                                section: 'Администрирование',
                                subsection: 'Операторы',
                                timeout: entry.max
                            });
                            decorate.page.operatorChange.subsectionChecked({
                                section: 'Администрирование',
                                subsection: 'Роли и права операторов',
                                timeout: entry.max
                            });
                            decorate.page.operatorChange.subsectionChecked({
                                section: 'Администрирование',
                                subsection: 'Лицензии',
                                timeout: entry.max
                            });
                            decorate.page.base.loading({
                                timeout: entry.sleep2
                            });
                            decorate.page.operatorChange.hideShow({
                                section: 'Администрирование',
                                timeout: entry.max
                            });
                            decorate.page.base.loading({
                                timeout: entry.sleep2
                            });
                        });
                    });
                });
            });

            describe('Авторизация, проверка отображения разделов и удаление данных', () => {

                befNewOperator({
                    login: data.operator2.login,
                    password: data.operator2.password
                });
                aft();

                describe('Раздел Персонал', () => {

                    describe('Отображение', () => {
                        decorate.el.section.handler({
                            section: sec.per,
                            timeout: entry.max
                        });
                        decorate.el.section.active({
                            section: sec.per,
                            timeout: entry.max
                        });
                        decorate.page.base.loading({
                            timeout: entry.sleep2
                        });
                        decorate.el.subsection.subsection({
                            subsection: sub.per.staff,
                            timeout: entry.max
                        });
                        decorate.el.subsection.subsection({
                            subsection: sub.per.schedule,
                            timeout: entry.max
                        });
                        decorate.el.subsection.subsection({
                            subsection: sub.per.division,
                            timeout: entry.max
                        });
                        decorate.el.subsection.subsection({
                            subsection: sub.per.position,
                            timeout: entry.max
                        });
                        decorate.el.subsection.noElement({
                            subsection: sub.per.holiday,
                            timeout: entry.max
                        });
                        decorate.el.subsection.noElement({
                            subsection: sub.per.data,
                            timeout: entry.max
                        });
                    });

                    describe('Проверка подраздела Графики работы и удаление графика', () => {
                        decorate.el.subsection.handler({
                            subsection: sub.per.schedule,
                            timeout: entry.max
                        });
                        decorate.el.subsection.active({
                            subsection: sub.per.schedule,
                            timeout: entry.max
                        });
                        decorate.page.base.loading({
                            timeout: entry.sleep2
                        });
                        decorate.el.table.size({
                            strCount: 1,
                            timeout: entry.max
                        });
                        decorate.el.table.cellGetText({
                            headTitle: 'Название',
                            strNumber: 1,
                            cellNumber: 1,
                            value: data.schedules.schedule1.name,
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
                            icon: but.delete,
                            timeout :entry.max
                        });
                        decorate.modalConfirm.deleteSchedule.init({
                            timeout: entry.max
                        });
                        decorate.el.button.handler({
                            name: 'Удалить',
                            timeout: entry.max
                        });
                        decorate.modalConfirm.deleteSchedule.initClose({
                            timeout: entry.max
                        });
                        decorate.page.base.loading({
                            timeout: entry.sleep2
                        });
                        decorate.page.base.refresh();
                        decorate.page.base.loading({
                            timeout: entry.sleep2
                        });
                        decorate.el.table.noStr({
                            timeout: entry.max
                        });
                    });

                    describe('Проверка подраздела Подразделения и удаление подразделения', () => {
                        decorate.el.subsection.handler({
                            subsection: sub.per.division,
                            timeout: entry.max
                        });
                        decorate.el.subsection.active({
                            subsection: sub.per.division,
                            timeout: entry.max
                        });
                        decorate.page.base.loading({
                            timeout: entry.sleep2
                        });
                        decorate.page.division.size({
                            size: 1,
                            timeout: entry.max
                        });
                        decorate.page.division.division({
                            arr: [data.divisions.division1.name],
                            timeout: entry.max
                        });
                        decorate.page.division.noDivision({
                            arr: [data.divisions.division2.name],
                            timeout: entry.max
                        });
                        decorate.page.division.noDivision({
                            arr: ['Администраторы системы'],
                            timeout: entry.max
                        });
                        decorate.page.division.handler({
                            arr: [data.divisions.division1.name],
                            timeout: entry.max
                        });
                        decorate.page.base.loading({
                            timeout: entry.sleep2
                        });
                        decorate.page.division.selected({
                            division: data.divisions.division1.name,
                            timeout: entry.max
                        });
                        decorate.el.butIcBefore.handler({
                            icon: but.delete,
                            timeout: entry.max
                        });
                        decorate.modalConfirm.divisionDelete.init({
                            timeout: entry.max
                        });
                        decorate.el.button.handler({
                            name: 'Удалить',
                            timeout: entry.max
                        });
                        decorate.modalConfirm.divisionDelete.initClose({
                            timeout: entry.max
                        });
                        decorate.page.base.loading({
                            timeout: entry.sleep2
                        });
                        decorate.page.base.refresh();
                        decorate.page.base.loading({
                            timeout: entry.sleep2
                        });
                        decorate.page.division.size({
                            size: 0,
                            timeout: entry.max
                        });
                        decorate.page.division.noDivision({
                            arr: [data.divisions.division1.name],
                            timeout: entry.max
                        });
                    });

                    describe('Проверка подраздела Должности и удаление должности', () => {
                        decorate.el.subsection.handler({
                            subsection: sub.per.position,
                            timeout: entry.max
                        });
                        decorate.el.subsection.active({
                            subsection: sub.per.position,
                            timeout: entry.max
                        });
                        decorate.page.base.loading({
                            timeout: entry.sleep2
                        });
                        decorate.el.table.size({
                            strCount: 1,
                            timeout: entry.max
                        });
                        decorate.el.table.cellGetText({
                            headTitle: 'Должности',
                            strNumber: 1,
                            cellNumber: 1,
                            value: data.positions.position1.name,
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
                            icon: but.delete,
                            timeout :entry.max
                        });
                        decorate.modalConfirm.positionDelete.init({
                            timeout: entry.max
                        });
                        decorate.el.button.handler({
                            name: 'Удалить',
                            timeout: entry.max
                        });
                        decorate.modalConfirm.positionDelete.initClose({
                            timeout: entry.max
                        });
                        decorate.page.base.loading({
                            timeout: entry.sleep2
                        });
                        decorate.page.base.refresh();
                        decorate.page.base.loading({
                            timeout: entry.sleep2
                        });
                        decorate.el.table.noStr({
                            timeout: entry.max
                        });
                    });

                });

                describe('Раздел Бюро пропусков', () => {

                    describe('Отображение', () => {
                        decorate.el.section.handler({
                            section: sec.pas,
                            timeout: entry.max
                        });
                        decorate.el.section.active({
                            section: sec.pas,
                            timeout: entry.max
                        });
                        decorate.page.base.loading({
                            timeout: entry.sleep2
                        });
                        decorate.el.subsection.noElement({
                            subsection: sub.pas.visitor,
                            timeout: entry.max
                        });
                        decorate.el.subsection.noElement({
                            subsection: sub.pas.staff,
                            timeout: entry.max
                        });
                        decorate.el.subsection.subsection({
                            subsection: sub.pas.template,
                            timeout: entry.max
                        });
                        decorate.el.subsection.subsection({
                            subsection: sub.pas.design,
                            timeout: entry.max
                        });
                        decorate.el.subsection.noElement({
                            subsection: sub.pas.report,
                            timeout: entry.max
                        });
                    });

                    describe('Проверка подраздела Шаблон доступа и удаление шаблона', () => {
                        decorate.el.subsection.handler({
                            subsection: sub.pas.template,
                            timeout: entry.max
                        });
                        decorate.el.subsection.active({
                            subsection: sub.pas.template,
                            timeout: entry.max
                        });
                        decorate.page.base.loading({
                            timeout: entry.sleep2
                        });
                        decorate.el.tab.handler({
                            tab: 'Шаблоны доступа',
                            timeout: entry.max
                        });
                        decorate.page.base.loading({
                            timeout: entry.sleep2
                        });
                        decorate.el.table.size({
                            strCount: 1,
                            timeout: entry.max
                        });
                        decorate.el.table.cellGetText({
                            headTitle: 'Название',
                            strNumber: 1,
                            cellNumber: 1,
                            value: data.templates.template1,
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
                            icon: but.delete,
                            timeout :entry.max
                        });
                        decorate.modalConfirm.accessSchedulesDelete.init({
                            timeout: entry.max
                        });
                        decorate.el.button.handler({
                            name: 'Удалить',
                            timeout: entry.max
                        });
                        decorate.modalConfirm.accessSchedulesDelete.initClose({
                            timeout: entry.max
                        });
                        decorate.page.base.loading({
                            timeout: entry.sleep2
                        });
                        decorate.page.base.refresh();
                        decorate.page.base.loading({
                            timeout: entry.sleep2
                        });
                        decorate.el.table.noStr({
                            timeout: entry.max
                        });
                    });

                    describe('Проверка подраздела Дизайн пропуска и удаление дизайна', () => {
                        decorate.el.subsection.handler({
                            subsection: sub.pas.design,
                            timeout: entry.max
                        });
                        decorate.el.subsection.active({
                            subsection: sub.pas.design,
                            timeout: entry.max
                        });
                        decorate.page.base.loading({
                            timeout: entry.sleep2
                        });
                        decorate.page.design.size({
                            size: 1,
                            timeout: entry.max
                        });
                        decorate.page.design.name({
                            num: 1,
                            value: data.design.design1,
                            timeout: entry.max
                        });
                        decorate.page.design.handler({
                            num: 1,
                            timeout: entry.max
                        });
                        decorate.page.base.loading({
                            timeout: entry.sleep2
                        });
                        decorate.el.butIcBefore.handler({
                            icon: but.delete,
                            timeout: entry.max
                        });
                        decorate.modalConfirm.designDelete.init({
                            timeout: entry.max
                        });
                        decorate.page.base.loading({
                            timeout: entry.sleep2
                        });
                        decorate.el.button.handler({
                            name: 'Удалить',
                            timeout: entry.max
                        });
                        decorate.modalConfirm.designDelete.initClose({
                            timeout: entry.max
                        });
                        decorate.page.base.loading({
                            timeout: entry.sleep2
                        });
                        decorate.page.base.refresh();
                        decorate.page.base.loading({
                            timeout: entry.sleep2
                        });
                        decorate.page.design.size({
                            size: 0,
                            timeout: entry.max
                        });
                    });

                });

                describe('Раздел УРВ', () => {
                    decorate.el.section.noElement({
                        section: sec.urv,
                        timeout: entry.max
                    });
                });

                describe('Раздел Контроль доступа', () => {
                    decorate.el.section.noElement({
                        section: sec.con,
                        timeout: entry.max
                    });
                });

                describe('Раздел Верификация', () => {
                    decorate.el.section.noElement({
                        section: sec.ver,
                        timeout: entry.max
                    });
                });

                describe('Раздел Заказ пропуска', () => {
                    decorate.el.section.noElement({
                        section: sec.ord,
                        timeout: entry.max
                    });
                });

                describe('Раздел Мониторинг', () => {
                    decorate.el.section.noElement({
                        section: sec.mon,
                        timeout: entry.max
                    });
                });

                describe('Раздел Конфигурация', () => {

                    describe('Отображение', () => {
                        decorate.el.section.handler({
                            section: sec.adm,
                            timeout: entry.max
                        });
                        decorate.el.section.active({
                            section: sec.adm,
                            timeout: entry.max
                        });
                        decorate.page.base.loading({
                            timeout: entry.sleep2
                        });
                        decorate.el.subsection.subsection({
                            subsection: sub.adm.conf,
                            timeout: entry.max
                        });
                        decorate.el.subsection.noElement({
                            subsection: sub.adm.event,
                            timeout: entry.max
                        });
                        decorate.el.subsection.noElement({
                            subsection: sub.adm.action,
                            timeout: entry.max
                        });
                        decorate.el.subsection.noElement({
                            subsection: sub.adm.task,
                            timeout: entry.max
                        });
                        decorate.el.subsection.subsection({
                            subsection: sub.adm.operator,
                            timeout: entry.max
                        });
                        decorate.el.subsection.subsection({
                            subsection: sub.adm.role,
                            timeout: entry.max
                        });
                        decorate.el.subsection.subsection({
                            subsection: sub.adm.license,
                            timeout: entry.max
                        });
                    });

                    describe('Проверка подраздела Конфигурация', () => {
                        describe('Конфиуграция - вкладка Помещения, удаление помещения', () => {
                            decorate.el.subsection.handler({
                                subsection: sub.adm.conf,
                                timeout: entry.max
                            });
                            decorate.el.subsection.active({
                                subsection: sub.adm.conf,
                                timeout: entry.max
                            });
                            decorate.el.tab.handler({
                                tab: 'Помещения',
                                timeout: entry.max
                            });
                            decorate.page.base.loading({
                                timeout: entry.sleep2
                            });
                            decorate.page.room.room({
                                arr: [data.rooms.room1],
                                timeout: entry.max
                            });
                            decorate.page.room.noRoom({
                                arr: [data.rooms.room2],
                                timeout: entry.max
                            });
                            decorate.page.room.handler({
                                arr: [data.rooms.room1],
                                timeout: entry.max
                            });
                            decorate.page.base.loading({
                                timeout: entry.sleep2
                            });
                            decorate.el.butIcBefore.handler({
                                icon: but.delete,
                                timeout :entry.max
                            });
                            decorate.modalConfirm.roomDelete.init({
                                timeout: entry.max
                            });
                            decorate.el.button.handler({
                                name: 'Удалить',
                                timeout: entry.max
                            });
                            decorate.modalConfirm.roomDelete.initClose({
                                timeout: entry.max
                            });
                            decorate.page.base.loading({
                                timeout: entry.sleep2
                            });
                            decorate.page.base.refresh();
                            decorate.page.base.loading({
                                timeout: entry.sleep2
                            });
                            decorate.page.room.noRoom({
                                arr: [data.rooms.room1],
                                timeout: entry.max
                            });
                        });

                        describe('Конфиуграция - вкладка Устройства, удаление устройства', () => {
                            decorate.el.tab.handler({
                                tab: 'Устройства',
                                timeout: entry.max
                            });
                            decorate.page.base.loading({
                                timeout: entry.sleep2
                            });
                            decorate.page.device.device({
                                name: data.devices.device1.name,
                                ip: data.devices.device1.ip,
                                timeout: entry.max
                            });
                            decorate.page.device.noDevice({
                                name: data.devices.device2.name,
                                ip: data.devices.device2.ip,
                                timeout: entry.max
                            });
                            decorate.page.device.handler({
                                name: data.devices.device1.name,
                                ip: data.devices.device1.ip,
                                timeout: entry.max
                            });
                            decorate.page.base.loading({
                                timeout: entry.sleep2
                            });
                            decorate.el.butIcBefore.handler({
                                icon: but.delete,
                                timeout :entry.max
                            });
                            decorate.modalConfirm.deviceDelete.init({
                                timeout: entry.max
                            });
                            decorate.el.button.handler({
                                name: 'Удалить',
                                timeout: entry.max
                            });
                            decorate.modalConfirm.deviceDelete.initClose({
                                timeout: entry.max
                            });
                            decorate.page.base.loading({
                                timeout: entry.sleep2
                            });
                            decorate.page.base.refresh();
                            decorate.page.base.loading({
                                timeout: entry.sleep2
                            });
                            decorate.page.device.noDevice({
                                name: data.devices.device1.name,
                                ip: data.devices.device1.ip,
                                timeout: entry.max
                            });
                        });
                    });

                });
            });
        }
    });

    const block = () => describe(text + 'Блокировка оператора.', () => {

        if(type === 'operator') {

            describe('Блокировка оператора', () => {
                befOperator();
                aft();
                decorate.el.table.strHandler({
                    strNumber: 1,
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.butIcBefore.handler({
                    icon: but.lock,
                    timeout: entry.max
                });
                decorate.modal.blockOperator.init({
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.checkbox.checked({
                    name: 'Заблокировать связанного сотрудника staff name 2?',
                    timeout: entry.max
                });
                decorate.el.button.handler({
                    name: 'Заблокировать',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.modal.blockOperator.initClose({
                    timeout: entry.max
                });
            });

            describe('Проверка', () => {
                befOperator();
                aft();
                describe('Проверка таблицы', () => {
                    decorate.el.table.cellGetText({
                        headTitle: 'Логин',
                        strNumber: 1,
                        cellNumber: 1,
                        value: data.operator2.login,
                        timeout: entry.max
                    });
                    decorate.el.table.cellGetIconLock({
                        strNumber: 1,
                        cellNumber: 4,
                        timeout: entry.max
                    });
                });

                describe('Проверка таблицы Сотрудники', () => {
                    decorate.el.section.handler({
                        section: sec.per,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.subsection.handler({
                        subsection: sub.per.staff,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.init.staffActive();
                    decorate.el.table.cellGetText({
                        headTitle: 'ФИО',
                        strNumber: 2,
                        cellNumber: 2,
                        value: data.operator2.fio,
                        timeout: entry.max
                    });
                    decorate.el.table.cellGetIconLock({
                        strNumber: 2,
                        cellNumber: 7,
                        timeout: entry.max
                    });
                });
            });

            describe('Проверка авторизации после блокировки оператора', () => {
                decorate.el.input.sendKeys({
                    title: 'Логин',
                    placeholder: '',
                    value: data.operator2.login,
                    timeout: entry.max
                });
                decorate.el.input.sendKeys({
                    title: 'Пароль',
                    placeholder: '',
                    value: data.operator2.login,
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.button.handler({
                    name: 'Войти в систему',
                    timeout: entry.max
                });
                decorate.el.formStatus.getText({
                    value: 'Учетная запись заблокирована',
                    timeout: entry.max
                });
            });

        }
    });

    const unblock = () => describe(text + 'Разблокировка оператора.', () => {
        if(type === 'operator') {

            describe('Разблокировка оператора', () => {
                befOperator();
                aft();
                decorate.el.table.strHandler({
                    strNumber: 1,
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.butIcBefore.handler({
                    icon: but.unlock,
                    timeout: entry.max
                });
                decorate.modal.unblockOperator.init({
                    timeout: entry.min
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.button.handler({
                    name: 'Разблокировать',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.modal.unblockOperator.initClose({
                    timeout: entry.max
                });
            });

            describe('Проверка', () => {
                befOperator();
                aft();
                describe('Проверка таблицы', () => {
                    decorate.el.table.cellGetText({
                        headTitle: 'Логин',
                        strNumber: 1,
                        cellNumber: 1,
                        value: data.operator2.login,
                        timeout: entry.max
                    });
                    decorate.el.table.cellNoIconLock({
                        strNumber: 1,
                        cellNumber: 4,
                        timeout: entry.max
                    });
                });

                describe('Проверка таблицы Сотрудники', () => {
                    decorate.el.section.handler({
                        section: sec.per,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.el.subsection.handler({
                        subsection: sub.per.staff,
                        timeout: entry.max
                    });
                    decorate.page.base.loading({
                        timeout: entry.sleep2
                    });
                    decorate.init.staffActive();
                    decorate.el.table.cellGetText({
                        headTitle: 'ФИО',
                        strNumber: 2,
                        cellNumber: 2,
                        value: data.operator2.fio,
                        timeout: entry.max
                    });
                    decorate.el.table.cellNoIconLock({
                        strNumber: 2,
                        cellNumber: 7,
                        timeout: entry.max
                    });
                });
            });

            describe('Проверка авторизации после разблокировки оператора', () => {
                befNewOperator({
                    login: data.operator2.login,
                    password: data.operator2.password
                });
                decorate.el.section.handler({
                    section: sec.per,
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.subsection.handler({
                    subsection: sub.per.staff,
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.init.staffActive();
                aft();
            });
        }
    });

    const search = () => describe(text + 'Проверка фильтра "Поиск...".', () => {
        if(type === 'role') {
            befRole();
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
                    value: data.role3.name,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Название',
                    strNumber: 2,
                    cellNumber: 1,
                    value: data.role2.name,
                    timeout: entry.max
                });
            });

            describe(`Ввод в фильтр "${data.role3.name}"`, () => {
                decorate.el.input.sendKeys({
                    title: '',
                    placeholder: 'Поиск...',
                    value: data.role3.name,
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
                    value: data.role3.name,
                    timeout: entry.max
                });
            });

            describe(`Удаление "${data.role3.name}" из фильтра "Поиск..." и проверка таблицы`, () => {
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
                    value: data.role3.name,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Название',
                    strNumber: 2,
                    cellNumber: 1,
                    value: data.role2.name,
                    timeout: entry.max
                });
            });
        }

        if(type === 'operator') {
            befOperator();
            aft();

            describe('Проверка таблицы до изпользования фильтра "Поиск..."', () => {
                decorate.el.table.cellGetText({
                    headTitle: 'Логин',
                    strNumber: 1,
                    cellNumber: 1,
                    value: data.operator2.login,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Логин',
                    strNumber: 2,
                    cellNumber: 1,
                    value: data.operator1.login,
                    timeout: entry.max
                });
            });

            describe(`Ввод в фильтр "${data.operator1.login}"`, () => {
                decorate.el.input.sendKeys({
                    title: '',
                    placeholder: 'Поиск...',
                    value: data.operator1.login,
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
            });

            describe('Проверка таблицы после измпользования фильтра "Поиск..."', () => {
                decorate.el.table.cellGetText({
                    headTitle: 'Логин',
                    strNumber: 1,
                    cellNumber: 1,
                    value: data.operator1.login,
                    timeout: entry.max
                });
            });

            describe(`Удаление "${data.role3.name}" из фильтра "Поиск..." и проверка таблицы`, () => {
                decorate.el.input.backSpace({
                    title: '',
                    placeholder: 'Поиск...',
                    timeout: entry.max
                });
                dec.animation();
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Логин',
                    strNumber: 1,
                    cellNumber: 1,
                    value: data.operator2.login,
                    timeout: entry.max
                });
                decorate.el.table.cellGetText({
                    headTitle: 'Логин',
                    strNumber: 2,
                    cellNumber: 1,
                    value: data.operator1.login,
                    timeout: entry.max
                });
            });
        }
    });

    const copy = () => describe(text + 'Копирование.', () => {
        if(type === 'role') {
            describe('Копирование', () => {
                befRole();
                aft();
                decorate.el.table.strHandler({
                    strNumber: 1,
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.butIcBefore.handler({
                    icon: but.copy,
                    timeout: entry.max
                });
                decorate.init.roleCopy();
                decorate.el.button.handler({
                    name: 'Добавить',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.error.checkError({
                    timeout: entry.sleep2
                });
                decorate.init.role();
            });

            describe('Проверка', () => {
                befRole();
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
                        value: data.role2.name + ' (копия)',
                        timeout: entry.max
                    });
                    decorate.el.table.cellGetText({
                        headTitle: 'Описание',
                        strNumber: 1,
                        cellNumber: 2,
                        value: data.role2.description,
                        timeout: entry.max
                    });
                });

                describe('Проверка параметров', () => {

                    describe('Проверка общих параметров', () => {
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
                        decorate.init.roleEdit();
                        decorate.page.base.loading({
                            timeout: entry.sleep2
                        });
                        decorate.el.input.getValue({
                            title: 'Название',
                            placeholder: '',
                            value: data.role2.name + ' (копия)',
                            timeout: entry.max
                        });
                        decorate.el.input.getValue({
                            title: 'Описание',
                            placeholder: '',
                            value: data.role2.description,
                            timeout: entry.max
                        });
                    });

                    describe('Проверка вкладки Помещения', () => {
                        decorate.el.simpleCell.active({
                            name: 'Помещения',
                            timeout: entry.max
                        });
                        decorate.page.base.loading({
                            timeout: entry.sleep2
                        })
                        decorate.el.nodeCheckbox.unchecked({
                            name: data.rooms.room2,
                            timeout: entry.max
                        });
                    });

                    describe('Проверка вкладки Подразделения', () => {
                        decorate.el.simpleCell.handler({
                            name: 'Подразделения',
                            timeout: entry.max
                        });
                        decorate.el.simpleCell.active({
                            name: 'Подразделения',
                            timeout: entry.max
                        });
                        decorate.page.base.loading({
                            timeout: entry.sleep2
                        });
                        decorate.el.nodeCheckbox.unchecked({
                            name: data.divisions.division2.name,
                            timeout: entry.max
                        });
                        decorate.el.nodeCheckbox.unchecked({
                            name: 'Администраторы системы',
                            timeout: entry.max
                        });
                    });

                    describe('Проверка вкладки Должности', () => {
                        decorate.el.simpleCell.handler({
                            name: 'Должности',
                            timeout: entry.max
                        });
                        decorate.el.simpleCell.active({
                            name: 'Должности',
                            timeout: entry.max
                        });
                        decorate.page.base.loading({
                            timeout: entry.sleep2
                        });
                    });

                    describe('Проверка вкладки Графики работы', () => {
                        decorate.el.simpleCell.handler({
                            name: 'Графики работы',
                            timeout: entry.max
                        });
                        decorate.el.simpleCell.active({
                            name: 'Графики работы',
                            timeout: entry.max
                        });
                        decorate.page.base.loading({
                            timeout: entry.sleep2
                        });
                    });

                    describe('Проверка вкладки Шаблоны доступа', () => {
                        decorate.el.simpleCell.handler({
                            name: 'Шаблоны доступа',
                            timeout: entry.max
                        });
                        decorate.el.simpleCell.active({
                            name: 'Шаблоны доступа',
                            timeout: entry.max
                        });
                        decorate.page.base.loading({
                            timeout: entry.sleep2
                        });
                    });

                    describe('Проверка вкладки Шаблоны пропусков', () => {
                        decorate.el.simpleCell.handler({
                            name: 'Шаблоны пропусков',
                            timeout: entry.max
                        });
                        decorate.el.simpleCell.active({
                            name: 'Шаблоны пропусков',
                            timeout: entry.max
                        });
                        decorate.page.base.loading({
                            timeout: entry.sleep2
                        });
                    });

                    describe('Проверка вкладки Устройства', () => {
                        decorate.el.simpleCell.handler({
                            name: 'Устройства',
                            timeout: entry.max
                        });
                        decorate.el.simpleCell.active({
                            name: 'Устройства',
                            timeout: entry.max
                        });
                        decorate.page.base.loading({
                            timeout: entry.sleep2
                        });
                        decorate.el.nodeCheckbox.unchecked({
                            name: data.devices.device2.name,
                            timeout: entry.max
                        });
                    });

                    describe('Проверка вкладки Шаблоны верификации', () => {
                        decorate.el.simpleCell.handler({
                            name: 'Шаблоны верификации',
                            timeout: entry.max
                        });
                        decorate.el.simpleCell.active({
                            name: 'Шаблоны верификации',
                            timeout: entry.max
                        });
                        decorate.page.base.loading({
                            timeout: entry.sleep2
                        });
                    });

                    describe('Проверка вкладки Планы помещений', () => {
                        decorate.el.simpleCell.handler({
                            name: 'Планы помещений',
                            timeout: entry.max
                        });
                        decorate.el.simpleCell.active({
                            name: 'Планы помещений',
                            timeout: entry.max
                        });
                        decorate.page.base.loading({
                            timeout: entry.sleep2
                        });
                    });

                });
            });
        }

        if(type === 'operator') {
            describe('Копирование оператора', () => {
                befOperator();
                aft();

                decorate.el.table.strHandler({
                    strNumber: 1,
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.butIcBefore.handler({
                    icon: but.copy,
                    timeout: entry.max
                });
                decorate.init.operatorCopy();
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });

                decorate.el.input.iconMenu({
                    title: 'Оператор',
                    placeholder: 'Выберите оператора',
                    timeout: entry.max
                });
                decorate.modal.staffSelect.init({
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.groupCell.handler({
                    name: data.operator1.fio,
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.button.handler({
                    name: 'Выбрать',
                    timeout: entry.max
                });
                decorate.modal.staffSelect.initClose({
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });

                decorate.el.input.sendKeys({
                    title: 'Логин',
                    placeholder: 'Логин оператора',
                    value: data.operator2.login,
                    timeout: entry.max
                });
                decorate.el.input.sendKeys({
                    title: 'Пароль',
                    placeholder: 'Пароль оператора',
                    value: data.operator1.password,
                    timeout: entry.max
                });
                decorate.el.input.sendKeys({
                    title: 'Повторите пароль',
                    placeholder: 'Ещё раз, пожалуйста',
                    value: data.operator1.password,
                    timeout: entry.max
                });

                decorate.el.button.handler({
                    name: 'Сохранить изменения',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.error.checkError({
                    timeout: entry.sleep2
                });
                decorate.init.operator();
            });

            describe('Проверка', () => {
                befOperator();
                aft();

                describe('Проверка таблицы', () => {
                    decorate.el.table.cellGetText({
                        headTitle: 'Логин',
                        strNumber: 1,
                        cellNumber: 1,
                        value: data.operator1.login,
                        timeout: entry.max
                    });
                    decorate.el.table.cellGetText({
                        headTitle: 'Сотрудники',
                        strNumber: 1,
                        cellNumber: 2,
                        value: data.operator1.fio,
                        timeout: entry.max
                    });
                    decorate.el.table.cellGetText({
                        headTitle: 'Роль',
                        strNumber: 1,
                        cellNumber: 3,
                        value: data.role2.name,
                        timeout: entry.max
                    });
                    decorate.el.table.cellNoIconLock({
                        strNumber: 1,
                        cellNumber: 4,
                        timeout: entry.max
                    });
                    decorate.el.table.cellGetText({
                        headTitle: 'Описание',
                        strNumber: 1,
                        cellNumber: 5,
                        value: '',
                        timeout: entry.max
                    });
                });

                describe('Проверка параметров', () => {
                    describe('Открытие на редактирование', () => {
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
                        decorate.init.operatorEdit();
                        decorate.page.base.loading({
                            timeout: entry.sleep2
                        });
                    });

                    describe('Общие', () => {
                        decorate.el.input.getValue({
                            title: 'Оператор',
                            placeholder: 'Выберите оператора',
                            value: data.operator1.fio,
                            timeout: entry.max
                        });
                        decorate.el.input.getValue({
                            title: 'Роль',
                            placeholder: 'Выберите роль',
                            value: data.role2.name,
                            timeout: entry.max
                        });
                        decorate.el.input.getValue({
                            title: 'Описание',
                            placeholder: 'Описание',
                            value: '',
                            timeout: entry.max
                        });
                    });

                    describe('Настройки входа', () => {
                        decorate.el.input.getValue({
                            title: 'Логин',
                            placeholder: 'Логин оператора',
                            value: data.operator1.login,
                            timeout: entry.max
                        });
                        decorate.el.input.getValue({
                            title: 'Пароль',
                            placeholder: 'Пароль оператора',
                            value: '',
                            timeout: entry.max
                        });
                        decorate.el.input.getValue({
                            title: 'Повторите пароль',
                            placeholder: 'Ещё раз, пожалуйста',
                            value: '',
                            timeout: entry.max
                        });
                    });

                    describe('Полномочия', () => {
                        describe('Персонал', () => {
                            decorate.page.operatorChange.hideShow({
                                section: 'Персонал',
                                timeout: entry.max
                            });
                            decorate.page.base.loading({
                                timeout: entry.sleep2
                            });
                            decorate.page.operatorChange.subsectionChecked({
                                section: 'Персонал',
                                subsection: 'Сотрудники',
                                timeout: entry.max
                            });
                            decorate.page.operatorChange.subsectionChecked({
                                section: 'Персонал',
                                subsection: 'Графики работы',
                                timeout: entry.max
                            });
                            decorate.page.operatorChange.subsectionChecked({
                                section: 'Персонал',
                                subsection: 'Подразделения',
                                timeout: entry.max
                            });
                            decorate.page.operatorChange.subsectionChecked({
                                section: 'Персонал',
                                subsection: 'Должности',
                                timeout: entry.max
                            });
                            decorate.page.operatorChange.subsectionUnchecked({
                                section: 'Персонал',
                                subsection: 'Праздничные дни',
                                timeout: entry.max
                            });
                            decorate.page.operatorChange.subsectionUnchecked({
                                section: 'Персонал',
                                subsection: 'Дополнительные данные',
                                timeout: entry.max
                            });
                            decorate.page.base.loading({
                                timeout: entry.sleep2
                            });
                            decorate.page.operatorChange.hideShow({
                                section: 'Персонал',
                                timeout: entry.max
                            });
                            decorate.page.base.loading({
                                timeout: entry.sleep2
                            });
                        });

                        describe('Бюро пропусков', () => {
                            decorate.page.operatorChange.hideShow({
                                section: 'Бюро пропусков',
                                timeout: entry.max
                            });
                            decorate.page.base.loading({
                                timeout: entry.sleep2
                            });
                            decorate.page.operatorChange.subsectionUnchecked({
                                section: 'Бюро пропусков',
                                subsection: 'Посетители',
                                timeout: entry.max
                            });
                            decorate.page.operatorChange.subsectionUnchecked({
                                section: 'Бюро пропусков',
                                subsection: 'Сотрудники',
                                timeout: entry.max
                            });
                            decorate.page.operatorChange.subsectionChecked({
                                section: 'Бюро пропусков',
                                subsection: 'Шаблоны доступа',
                                timeout: entry.max
                            });
                            decorate.page.operatorChange.subsectionChecked({
                                section: 'Бюро пропусков',
                                subsection: 'Дизайн пропуска',
                                timeout: entry.max
                            });
                            decorate.page.operatorChange.subsectionUnchecked({
                                section: 'Бюро пропусков',
                                subsection: 'Отчет по посетителям',
                                timeout: entry.max
                            });
                            decorate.page.base.loading({
                                timeout: entry.sleep2
                            });
                            decorate.page.operatorChange.hideShow({
                                section: 'Бюро пропусков',
                                timeout: entry.max
                            });
                            decorate.page.base.loading({
                                timeout: entry.sleep2
                            });
                        });

                        describe('Учёт рабочего времени', () => {
                            decorate.page.operatorChange.sectionUnchecked({
                                section: 'Учёт рабочего времени',
                                timeout: entry.max
                            });
                        });

                        describe('Контроль доступа', () => {
                            decorate.page.operatorChange.sectionUnchecked({
                                section: 'Контроль доступа',
                                timeout: entry.max
                            });
                        });

                        describe('Верификация', () => {
                            decorate.page.operatorChange.sectionUnchecked({
                                section: 'Верификация',
                                timeout: entry.max
                            });
                        });

                        describe('Заказ пропуска', () => {
                            decorate.page.operatorChange.sectionUnchecked({
                                section: 'Заказ пропуска',
                                timeout: entry.max
                            });
                        });

                        describe('Мониторинг', () => {
                            decorate.page.operatorChange.sectionUnchecked({
                                section: 'Мониторинг',
                                timeout: entry.max
                            });
                        });

                        describe('Администрирование', () => {
                            decorate.page.operatorChange.hideShow({
                                section: 'Администрирование',
                                timeout: entry.max
                            });
                            decorate.page.base.loading({
                                timeout: entry.sleep2
                            });
                            decorate.page.operatorChange.subsectionChecked({
                                section: 'Администрирование',
                                subsection: 'Конфигурация',
                                timeout: entry.max
                            });
                            decorate.page.operatorChange.subsectionUnchecked({
                                section: 'Администрирование',
                                subsection: 'События системы',
                                timeout: entry.max
                            });
                            decorate.page.operatorChange.subsectionUnchecked({
                                section: 'Администрирование',
                                subsection: 'Реакции на события',
                                timeout: entry.max
                            });
                            decorate.page.operatorChange.subsectionUnchecked({
                                section: 'Администрирование',
                                subsection: 'Задания',
                                timeout: entry.max
                            });
                            decorate.page.operatorChange.subsectionChecked({
                                section: 'Администрирование',
                                subsection: 'Операторы',
                                timeout: entry.max
                            });
                            decorate.page.operatorChange.subsectionChecked({
                                section: 'Администрирование',
                                subsection: 'Роли и права операторов',
                                timeout: entry.max
                            });
                            decorate.page.operatorChange.subsectionChecked({
                                section: 'Администрирование',
                                subsection: 'Лицензии',
                                timeout: entry.max
                            });
                            decorate.page.base.loading({
                                timeout: entry.sleep2
                            });
                            decorate.page.operatorChange.hideShow({
                                section: 'Администрирование',
                                timeout: entry.max
                            });
                            decorate.page.base.loading({
                                timeout: entry.sleep2
                            });
                        });
                    });
                });
            });
        }
    });

    const addDuplicate = () => describe(text + 'Попытка дублирования.', () => {
        if(type === 'role') {
            befRole();
            aft();
            decorate.el.butIcBefore.handler({
                icon: but.add,
                timeout: entry.max
            });
            decorate.init.roleAdd();
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
            decorate.el.input.sendKeys({
                title: 'Название',
                placeholder: '',
                value: data.role2.name,
                timeout: entry.max
            });
            decorate.el.button.handler({
                name: 'Добавить',
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
            decorate.el.error.error({
                text: 'Данное имя уже используется',
                timeout: entry.max
            });
        }

        if(type === 'operator') {
            befOperator();
            aft();
            decorate.el.butIcBefore.handler({
                icon: but.add,
                timeout: entry.max
            });
            decorate.init.operatorAdd();
            decorate.page.base.loading({
                timeout: entry.sleep2
            });

            decorate.el.input.iconMenu({
                title: 'Оператор',
                placeholder: 'Выберите оператора',
                timeout: entry.max
            });
            decorate.modal.staffSelect.init({
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
            decorate.el.groupCell.handler({
                name: data.operator1.fio,
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
            decorate.el.button.handler({
                name: 'Выбрать',
                timeout: entry.max
            });
            decorate.modal.staffSelect.initClose({
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });

            decorate.el.input.sendKeys({
                title: 'Роль',
                placeholder: 'Выберите роль',
                value: data.role2.name,
                timeout: entry.max
            });
            decorate.el.selectXpand.xpand({
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
            decorate.el.selectXpand.handler({
                value: data.role2.name,
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
            decorate.el.selectXpand.xpandNoElement({
                timeout: entry.max
            });

            decorate.el.input.sendKeys({
                title: 'Логин',
                placeholder: 'Логин оператора',
                value: data.operator2.login,
                timeout: entry.max
            });
            decorate.el.input.sendKeys({
                title: 'Пароль',
                placeholder: 'Пароль оператора',
                value: data.operator2.password,
                timeout: entry.max
            });
            decorate.el.input.sendKeys({
                title: 'Повторите пароль',
                placeholder: 'Ещё раз, пожалуйста',
                value: data.operator2.password,
                timeout: entry.max
            });

            decorate.page.operatorChange.sectionCheckboxHandler({
                section: 'Персонал',
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });

            decorate.el.button.handler({
                name: 'Сохранить изменения',
                timeout: entry.max
            });
            decorate.el.error.error({
                text: 'Такое имя пользователя уже используется',
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
        }
    });

    const addFailed = () => describe(text + 'Добавление с невалидными параметрами.', () => {
        if(type === 'operator') {
            befOperator();
            aft();

            describe('Открытие на добавление', () => {
                decorate.el.butIcBefore.handler({
                    icon: but.add,
                    timeout: entry.max
                });
                decorate.init.operatorAdd();
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
            });

            describe('Попытка добавления без доступа к разделам системы', () => {
                decorate.el.input.iconMenu({
                    title: 'Оператор',
                    placeholder: 'Выберите оператора',
                    timeout: entry.max
                });
                decorate.modal.staffSelect.init({
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.groupCell.handler({
                    name: data.operator2.fio,
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.button.handler({
                    name: 'Выбрать',
                    timeout: entry.max
                });
                decorate.modal.staffSelect.initClose({
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });

                decorate.el.input.sendKeys({
                    title: 'Роль',
                    placeholder: 'Выберите роль',
                    value: 'admin',
                    timeout: entry.max
                });
                decorate.el.selectXpand.xpand({
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.selectXpand.handler({
                    value: 'admin',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.selectXpand.xpandNoElement({
                    timeout: entry.max
                });

                decorate.el.input.sendKeys({
                    title: 'Логин',
                    placeholder: 'Логин оператора',
                    value: 'z',
                    timeout: entry.max
                });
                decorate.el.input.sendKeys({
                    title: 'Пароль',
                    placeholder: 'Пароль оператора',
                    value: 'zzzzz1',
                    timeout: entry.max
                });
                decorate.el.input.sendKeys({
                    title: 'Повторите пароль',
                    placeholder: 'Ещё раз, пожалуйста',
                    value: 'zzzzz1',
                    timeout: entry.max
                });

                decorate.el.button.handler({
                    name: 'Сохранить изменения',
                    timeout: entry.max
                });
                decorate.el.error.error({
                    text: 'Нельзя сохранить оператора без доступа к разделам системы',
                    timeout: entry.max
                });
            });

            describe('Попытка добавления при пароле меньше 6 символов', () => {
                decorate.page.operatorChange.hideShow({
                    section: 'Персонал',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.page.operatorChange.subsectionCheckboxHandler({
                    section: 'Персонал',
                    subsection: 'Сотрудники',
                    timeout: entry.max
                });
                decorate.el.input.backSpace({
                    title: 'Пароль',
                    placeholder: 'Пароль оператора',
                    timeout: entry.max
                });
                decorate.el.input.sendKeys({
                    title: 'Пароль',
                    placeholder: 'Пароль оператора',
                    value: 'zzzz1',
                    timeout: entry.max
                });
                decorate.el.input.backSpace({
                    title: 'Повторите пароль',
                    placeholder: 'Ещё раз, пожалуйста',
                    timeout: entry.max
                });
                decorate.el.input.sendKeys({
                    title: 'Повторите пароль',
                    placeholder: 'Ещё раз, пожалуйста',
                    value: 'zzzz1',
                    timeout: entry.max
                });
                decorate.el.button.handler({
                    name: 'Сохранить изменения',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.error.error({
                    text: 'В поле пароль должно быть минимум 6 символов',
                    timeout: entry.min
                });
            });

            describe('Попытка добавления при пароле без букв', () => {
                decorate.el.input.backSpace({
                    title: 'Пароль',
                    placeholder: 'Пароль оператора',
                    timeout: entry.max
                });
                decorate.el.input.sendKeys({
                    title: 'Пароль',
                    placeholder: 'Пароль оператора',
                    value: '111111',
                    timeout: entry.max
                });
                decorate.el.input.backSpace({
                    title: 'Повторите пароль',
                    placeholder: 'Ещё раз, пожалуйста',
                    timeout: entry.max
                });
                decorate.el.input.sendKeys({
                    title: 'Повторите пароль',
                    placeholder: 'Ещё раз, пожалуйста',
                    value: '111111',
                    timeout: entry.max
                });
                decorate.el.button.handler({
                    name: 'Сохранить изменения',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.error.error({
                    text: 'Пароль должен быть от 6 символов и содержать хотя бы одну букву латинского алфавита ' +
                        'и хотя бы одну цифру.',
                    timeout: entry.max
                });
            });

            describe('Попытка добавления при пароле без цифр', () => {
                decorate.el.input.backSpace({
                    title: 'Пароль',
                    placeholder: 'Пароль оператора',
                    timeout: entry.max
                });
                decorate.el.input.sendKeys({
                    title: 'Пароль',
                    placeholder: 'Пароль оператора',
                    value: 'zzzzzz',
                    timeout: entry.max
                });
                decorate.el.input.backSpace({
                    title: 'Повторите пароль',
                    placeholder: 'Ещё раз, пожалуйста',
                    timeout: entry.max
                });
                decorate.el.input.sendKeys({
                    title: 'Повторите пароль',
                    placeholder: 'Ещё раз, пожалуйста',
                    value: 'zzzzzz',
                    timeout: entry.max
                });
                decorate.el.button.handler({
                    name: 'Сохранить изменения',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.error.error({
                    text: 'Пароль должен быть от 6 символов и содержать хотя бы одну букву латинского алфавита ' +
                        'и хотя бы одну цифру.',
                    timeout: entry.max
                });
            });

            describe('Попытка добавления при пароле с невалидным символом', () => {
                decorate.el.input.backSpace({
                    title: 'Пароль',
                    placeholder: 'Пароль оператора',
                    timeout: entry.max
                });
                decorate.el.input.sendKeys({
                    title: 'Пароль',
                    placeholder: 'Пароль оператора',
                    value: 'zzzzz1~',
                    timeout: entry.max
                });
                decorate.el.input.backSpace({
                    title: 'Повторите пароль',
                    placeholder: 'Ещё раз, пожалуйста',
                    timeout: entry.max
                });
                decorate.el.input.sendKeys({
                    title: 'Повторите пароль',
                    placeholder: 'Ещё раз, пожалуйста',
                    value: 'zzzzz1~',
                    timeout: entry.max
                });
                decorate.el.button.handler({
                    name: 'Сохранить изменения',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.error.error({
                    text: 'Поле пароль содержит недопустимые символы',
                    timeout: entry.min
                });
            });

            describe('Попытка добавления при несовпадении паролей', () => {
                decorate.el.input.backSpace({
                    title: 'Пароль',
                    placeholder: 'Пароль оператора',
                    timeout: entry.max
                });
                decorate.el.input.sendKeys({
                    title: 'Пароль',
                    placeholder: 'Пароль оператора',
                    value: 'zzzzz1',
                    timeout: entry.max
                });
                decorate.el.input.backSpace({
                    title: 'Повторите пароль',
                    placeholder: 'Ещё раз, пожалуйста',
                    timeout: entry.max
                });
                decorate.el.input.sendKeys({
                    title: 'Повторите пароль',
                    placeholder: 'Ещё раз, пожалуйста',
                    value: 'zzzzz2',
                    timeout: entry.max
                });
                decorate.el.button.handler({
                    name: 'Сохранить изменения',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.error.error({
                    text: 'Пароли не совпадают.',
                    timeout: entry.max
                });
            });

            describe('Попытка добавления с используемым опреатором', () => {
                decorate.el.input.backSpace({
                    title: 'Пароль',
                    placeholder: 'Пароль оператора',
                    timeout: entry.max
                });
                decorate.el.input.sendKeys({
                    title: 'Пароль',
                    placeholder: 'Пароль оператора',
                    value: 'zzzzz1',
                    timeout: entry.max
                });
                decorate.el.input.backSpace({
                    title: 'Повторите пароль',
                    placeholder: 'Ещё раз, пожалуйста',
                    timeout: entry.max
                });
                decorate.el.input.sendKeys({
                    title: 'Повторите пароль',
                    placeholder: 'Ещё раз, пожалуйста',
                    value: 'zzzzz1',
                    timeout: entry.max
                });
                decorate.el.button.handler({
                    name: 'Сохранить изменения',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.error.error({
                    text: 'Данный сотрудник уже является оператором',
                    timeout: entry.max
                });
            });
        }
    });

    const deleteFailed = () => describe(text + 'Попытка удаления роли, используемой оператором.', () => {
        if(type === 'role') {
            befRole();
            aft();
            decorate.el.table.strHandler({
                strNumber: 1,
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
            decorate.el.butIcBefore.handler({
                icon: but.delete,
                timeout: entry.max
            });
            decorate.modalConfirm.deleteRole.init({
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
            decorate.el.button.handler({
                name: 'Удалить',
                timeout: entry.max
            });
            decorate.el.error.error({
                text: 'Роль используется и не может быть удалена',
                timeout: entry.max
            });
            decorate.modalConfirm.deleteRole.initClose({
                timeout: entry.max
            });
            decorate.page.base.loading({
                timeout: entry.sleep2
            });
        }
    });

    const deleted = () => describe(text + 'Удаление.', () => {
        if(type === 'role') {
            befRole();
            aft();

            describe('Удаление роли 1', () => {
                decorate.el.table.strHandler({
                    strNumber: 1,
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.butIcBefore.handler({
                    icon: but.delete,
                    timeout: entry.max
                });
                decorate.modalConfirm.deleteRole.init({
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.button.handler({
                    name: 'Удалить',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.error.checkError({
                    timeout: entry.sleep2
                });
                decorate.modalConfirm.deleteRole.initClose({
                    timeout: entry.max
                });
                decorate.page.base.refresh();
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.table.size({
                    strCount: 1,
                    timeout: entry.max
                });
            });

            describe('Удаление роли 2', () => {
                decorate.el.table.strHandler({
                    strNumber: 1,
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.butIcBefore.handler({
                    icon: but.delete,
                    timeout: entry.max
                });
                decorate.modalConfirm.deleteRole.init({
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.button.handler({
                    name: 'Удалить',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.error.checkError({
                    timeout: entry.sleep2
                });
                decorate.modalConfirm.deleteRole.initClose({
                    timeout: entry.max
                });
                decorate.page.base.refresh();
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.table.noStr({
                    timeout: entry.max
                });
            });
        }

        if(type === 'operator') {
            befOperator();
            aft();

            describe('Удаление оператора 1', () => {
                decorate.el.table.cellGetText({
                    headTitle: 'Логин',
                    strNumber: 1,
                    cellNumber: 1,
                    value: data.operator2.login,
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
                    icon: but.delete,
                    timeout: entry.max
                });
                decorate.modalConfirm.deleteOperator.init({
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.button.handler({
                    name: 'Удалить',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.error.checkError({
                    timeout: entry.sleep2
                });
                decorate.modalConfirm.deleteOperator.initClose({
                    timeout: entry.max
                });
                decorate.page.base.refresh();
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
            });

            describe('Удаление оператора 2', () => {
                decorate.el.table.cellGetText({
                    headTitle: 'Логин',
                    strNumber: 1,
                    cellNumber: 1,
                    value: data.operator1.login,
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
                    icon: but.delete,
                    timeout: entry.max
                });
                decorate.modalConfirm.deleteOperator.init({
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.button.handler({
                    name: 'Удалить',
                    timeout: entry.max
                });
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
                decorate.el.error.checkError({
                    timeout: entry.sleep2
                });
                decorate.modalConfirm.deleteOperator.initClose({
                    timeout: entry.max
                });
                decorate.page.base.refresh();
                decorate.page.base.loading({
                    timeout: entry.sleep2
                });
            });

        }
    });

    return {
        add,
        edit,
        block,
        unblock,
        search,
        copy,
        addDuplicate,
        addFailed,
        deleteFailed,
        deleted
    }
}

module.exports = {
    otherRole: () => other('role', 'Администрирование / Роли и права операторов. '),
    otherOperator: () => other('operator', 'Администрирование / Операторы. ')
}