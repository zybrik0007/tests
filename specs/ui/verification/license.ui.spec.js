const {describe, it, before, after} = require('mocha');
const {expect} = require('chai');

const entry = require('../../../entry');
const page = require('../../../ui/src/pages');
const el = require('../../../ui/src/elements');
const dec = require('../../../ui/src/dictionaries/decorate');
const sec = require('../../../ui/src/dictionaries/section');
const sub = require('../../../ui/src/dictionaries/subsection');
const but = require('../../../ui/src/dictionaries/button-icon');
const lic = require('../../../ui/src/dictionaries/license');

console.log = function() {};

/*Лицензии*/
describe('Проверка подраздела "Лицензии".Поочередная активация всех лицензий, отображение и отсутствие информации, разделов и подразделов.', () => {

    const params = 'Проверена 60 дней остался'

    describe('Базовый пакет', () => {

        before('Вход и открытие подраздела "Лицензии"', async () => {
            await dec.auth(entry.customLogin, entry.customPassword)
            await dec.simple(el.section.handler, [sec.adm, entry.max], el.section)
            await dec.simple(el.subsection.handler, [sub.adm.license, entry.max], el.subsection)
            await dec.simple(page.license.init, [entry.max], page.license)
        })

        after('Выход', async () => await dec.exit())

        describe('Проверка информации', () => {
            it('Проверка информации', async () => await dec.simple(page.license.info, [lic.base, params, entry.max], page.license))
        })

        describe('Персонал', () => {
            it('Отображение раздела "Персонал"', async () => await dec.simple(el.section.section, [sec.per, entry.max], el.section))
            it('Нажатие "Прсонал"', async () =>  await dec.simple(el.section.handler, [sec.per, entry.max], el.section))
            it('Раздел "Персонал" активен', async () =>  await dec.simple(el.section.active, [sec.per, entry.max], el.section))
            it('Отображение "Сотрудники"', async () => await dec.simple(el.subsection.subsection, [sub.per.staff, entry.max], el.subsection))
            it('Отображение "Подразделения"', async () => await dec.simple(el.subsection.subsection, [sub.per.division, entry.max], el.subsection))
            it('Отображение "Должности"', async () => await dec.simple(el.subsection.subsection, [sub.per.position, entry.max], el.subsection))
            it('Отображение "Праздничные дни"', async () => await dec.simple(el.subsection.subsection, [sub.per.holiday, entry.max], el.subsection))
            it('Отсутствие "Графики работы"', async () => await dec.simple(el.subsection.noElement, [sub.per.schedule, entry.max], el.subsection))
            it('Отсутствие "Дополнительные данные"', async () => dec.simple(el.subsection.noElement, [sub.per.data, entry.max], el.subsection))
        })

        describe('Бюро пропусков', () => {
            it('Отображение раздела "Бюро пропусков"', async () =>  await dec.simple(el.section.section, [sec.pas, entry.max], el.section))
            it('Нажатие "Бюро пропусков"', async () =>  await dec.simple(el.section.handler, [sec.pas, entry.max], el.section))
            it('Раздел "Бюро пропусков" активен', async () =>  await dec.simple(el.section.active, [sec.pas, entry.max], el.section))
            it('Отображение "Сотрудники"', async () => await dec.simple(el.subsection.subsection, [sub.pas.staff, entry.max], el.subsection))
            it('Отображение "Шаблоны доступа"', async () => await dec.simple(el.subsection.subsection, [sub.pas.template, entry.max], el.subsection))
            it('Отсутствие "Посетители"', async () => dec.simple(el.subsection.noElement, [sub.pas.visitor, entry.max], el.subsection))
            it('Отсутствие "Дизайн пропуска"', async () => dec.simple(el.subsection.noElement, [sub.pas.design, entry.max], el.subsection))
            it('Отсутствие "Отчет по посетителям"', async () => dec.simple(el.subsection.noElement, [sub.pas.report, entry.max], el.subsection))
        })

        describe('Учёт рабочего времени', () => {
            it('Отсутствие раздела "Учёт рабочего времени"', async () =>  await dec.simple(el.section.noElement, [sec.urv, entry.max], el.section))
        })

        describe('Контроль доступа', () => {
            it('Отображение раздела "Контроль доступа"', async () =>  await dec.simple(el.section.section, [sec.con, entry.max], el.section))
            it('Нажатие "Контроль доступа"', async () =>  await dec.simple(el.section.handler, [sec.con, entry.max], el.section))
            it('Раздел "Контроль доступа', async () =>  await dec.simple(el.section.active, [sec.con, entry.max], el.section))
            it('Отображение "Управление устройствами"', async () => await dec.simple(el.subsection.subsection, [sub.con.device, entry.max], el.subsection))
            it('Отсутствие "Отчет о проходах"', async () => dec.simple(el.subsection.noElement, [sub.con.premises, entry.max], el.subsection))
            it('Отсутствие "Журнал верификации"', async () => dec.simple(el.subsection.noElement, [sub.con.verif, entry.max], el.subsection))
            it('Отсутствие "Отчет по доступу в помещения"', async () => dec.simple(el.subsection.noElement, [sub.con.room, entry.max], el.subsection))
            it('Отсутствие "Местонахождение"', async () => dec.simple(el.subsection.noElement, [sub.con.location, entry.max], el.subsection))
            it('Отсутствие "Выданные идентификаторы"', async () => dec.simple(el.subsection.noElement, [sub.con.card, entry.max], el.subsection))
        })

        describe('Верификация', () => {
            it('Отсутствие раздела "Верификация"', async () =>  await dec.simple(el.section.noElement, [sec.ver, entry.max], el.section))
        })

        describe('Заказ пропуска', () => {
            it('Отсутствие раздела "Заказ пропуска"', async () =>  await dec.simple(el.section.noElement, [sec.ord, entry.max], el.section))
        })

        describe('Мониторинг', () => {
            it('Отсутствие раздела "Мониторинг"', async () =>  await dec.simple(el.section.noElement, [sec.mon, entry.max], el.section))
        })

        describe('Администрирование', () => {
            it('Отображение раздела "Администрирование"', async () =>  await dec.simple(el.section.section, [sec.adm, entry.max], el.section))
            it('Нажатие "Администрирование"', async () =>  await dec.simple(el.section.handler, [sec.adm, entry.max], el.section))
            it('Раздел "Администрирование" активен', async () =>  await dec.simple(el.section.active, [sec.adm, entry.max], el.section))
            it('Отображение "Конфигурация"', async () => await dec.simple(el.subsection.subsection, [sub.adm.conf, entry.max], el.subsection))
            it('Отображение "События системы"', async () => await dec.simple(el.subsection.subsection, [sub.adm.event, entry.max], el.subsection))
            it('Отображение "Реакции на события"', async () => await dec.simple(el.subsection.subsection, [sub.adm.action, entry.max], el.subsection))
            it('Отображение "Задания"', async () => await dec.simple(el.subsection.subsection, [sub.adm.task, entry.max], el.subsection))
            it('Отображение "Роли и права операторов"', async () => await dec.simple(el.subsection.subsection, [sub.adm.role, entry.max], el.subsection))
            it('Отображение "Лицензии"', async () => await dec.simple(el.subsection.subsection, [sub.adm.license, entry.max], el.subsection))
        })

        describe('Документация', () => {
            it('Отсутствие раздела "Документация"', async () =>  await dec.simple(el.section.noElement, [sec.doc, entry.max], el.section))
        })

    })

    describe('Стандартный пакет', () => {

        before('Вход и открытие подраздела "Лицензии"', async () => {
            await dec.auth(entry.customLogin, entry.customPassword)
            await dec.simple(el.section.handler, [sec.adm, entry.max], el.section)
            await dec.simple(el.subsection.handler, [sub.adm.license, entry.max], el.subsection)
            await dec.simple(page.license.init, [entry.max], page.license)
        })

        after('Выход', async () => await dec.exit())

        describe('Активация', () => {
            it('Нажатие кнопки включения', async () => await dec.simple(page.license.switch, [lic.standard, entry.max], page.license))
            it('Проверка информации', async () => await dec.simple(page.license.info, [lic.standard, params, entry.max], page.license))
        })

        describe('Персонал', () => {
            it('Отображение раздела "Персонал"', async () =>  await dec.simple(el.section.section, [sec.per, entry.max], el.section))
            it('Нажатие "Прсонал"', async () =>  await dec.simple(el.section.handler, [sec.per, entry.max], el.section))
            it('Раздел "Персонал" активен', async () =>  await dec.simple(el.section.active, [sec.per, entry.max], el.section))
            it('Отображение "Сотрудники"', async () => await dec.simple(el.subsection.subsection, [sub.per.staff, entry.max], el.subsection))
            it('Отображение "Подразделения"', async () => await dec.simple(el.subsection.subsection, [sub.per.division, entry.max], el.subsection))
            it('Отображение "Должности"', async () => await dec.simple(el.subsection.subsection, [sub.per.position, entry.max], el.subsection))
            it('Отображение "Праздничные дни"', async () => await dec.simple(el.subsection.subsection, [sub.per.holiday, entry.max], el.subsection))
            it('Отображение "Дополнительные данные"', async () => dec.simple(el.subsection.subsection, [sub.per.data, entry.max], el.subsection))
            it('Отсутствие "Графики работы"', async () => await dec.simple(el.subsection.noElement, [sub.per.schedule, entry.max], el.subsection))

        })

        describe('Бюро пропусков', () => {
            it('Отображение раздела "Бюро пропусков"', async () =>  await dec.simple(el.section.section, [sec.pas, entry.max], el.section))
            it('Нажатие "Бюро пропусков"', async () =>  await dec.simple(el.section.handler, [sec.pas, entry.max], el.section))
            it('Раздел "Бюро пропусков" активен', async () =>  await dec.simple(el.section.active, [sec.pas, entry.max], el.section))
            it('Отображение "Сотрудники"', async () => await dec.simple(el.subsection.subsection, [sub.pas.staff, entry.max], el.subsection))
            it('Отображение "Шаблоны доступа"', async () => await dec.simple(el.subsection.subsection, [sub.pas.template, entry.max], el.subsection))
            it('Отображение "Посетители"', async () => dec.simple(el.subsection.subsection, [sub.pas.visitor, entry.max], el.subsection))
            it('Отображение "Дизайн пропуска"', async () => dec.simple(el.subsection.subsection, [sub.pas.design, entry.max], el.subsection))
            it('Отображение "Отчет по посетителям"', async () => dec.simple(el.subsection.subsection, [sub.pas.report, entry.max], el.subsection))
        })

        describe('Учёт рабочего времени', () => {
            it('Отсутствие раздела "Учёт рабочего времени"', async () =>  await dec.simple(el.section.noElement, [sec.urv, entry.max], el.section))
        })

        describe('Контроль доступа', () => {
            it('Отображение раздела "Контроль доступа"', async () =>  await dec.simple(el.section.section, [sec.con, entry.max], el.section))
            it('Нажатие "Контроль доступа"', async () =>  await dec.simple(el.section.handler, [sec.con, entry.max], el.section))
            it('Раздел "Контроль доступа" активен', async () =>  await dec.simple(el.section.active, [sec.con, entry.max], el.section))
            it('Отображение "Управление устройствами"', async () => await dec.simple(el.subsection.subsection, [sub.con.device, entry.max], el.subsection))
            it('Отображение "Отчет о проходах"', async () => dec.simple(el.subsection.subsection, [sub.con.premises, entry.max], el.subsection))
            it('Отсутствие "Журнал верификации"', async () => dec.simple(el.subsection.noElement, [sub.con.verif, entry.max], el.subsection))
            it('Отображение "Отчет по доступу в помещения"', async () => dec.simple(el.subsection.subsection, [sub.con.room, entry.max], el.subsection))
            it('Отсутствие "Местонахождение"', async () => dec.simple(el.subsection.noElement, [sub.con.location, entry.max], el.subsection))
            it('Отображение "Выданные идентификаторы"', async () => dec.simple(el.subsection.subsection, [sub.con.card, entry.max], el.subsection))
        })

        describe('Верификация', () => {
            it('Отсутствие раздела "Верификация"', async () =>  await dec.simple(el.section.noElement, [sec.ver, entry.max], el.section))
        })

        describe('Заказ пропуска', () => {
            it('Отображение раздела "Заказ пропуска"', async () =>  await dec.simple(el.section.section, [sec.ord, entry.max], el.section))
            it('Нажатие "Заказ пропуска"', async () =>  await dec.simple(el.section.handler, [sec.ord, entry.max], el.section))
            it('Раздел "Заказ пропуска" активен', async () =>  await dec.simple(el.section.active, [sec.ord, entry.max], el.section))
            it('Отображение "Заказ пропуска"', async () => await dec.simple(el.subsection.subsection, [sub.ord.order, entry.max], el.subsection))
        })

        describe('Мониторинг', () => {
            it('Отсутствие раздела "Мониторинг"', async () =>  await dec.simple(el.section.noElement, [sec.mon, entry.max], el.section))
        })

        describe('Администрирование', () => {
            it('Отображение раздела "Администрирование"', async () =>  await dec.simple(el.section.section, [sec.adm, entry.max], el.section))
            it('Нажатие "Администрирование"', async () =>  await dec.simple(el.section.handler, [sec.adm, entry.max], el.section))
            it('Раздел "Администрирование" активен', async () =>  await dec.simple(el.section.active, [sec.adm, entry.max], el.section))
            it('Отображение "Конфигурация"', async () => await dec.simple(el.subsection.subsection, [sub.adm.conf, entry.max], el.subsection))
            it('Отображение "События системы"', async () => await dec.simple(el.subsection.subsection, [sub.adm.event, entry.max], el.subsection))
            it('Отображение "Реакции на события"', async () => await dec.simple(el.subsection.subsection, [sub.adm.action, entry.max], el.subsection))
            it('Отображение "Задания"', async () => await dec.simple(el.subsection.subsection, [sub.adm.task, entry.max], el.subsection))
            it('Отображение "Роли и права операторов"', async () => await dec.simple(el.subsection.subsection, [sub.adm.role, entry.max], el.subsection))
            it('Отображение "Лицензии"', async () => await dec.simple(el.subsection.subsection, [sub.adm.license, entry.max], el.subsection))
        })

        describe('Документация', () => {
            it('Отсутствие раздела "Документация"', async () =>  await dec.simple(el.section.noElement, [sec.doc, entry.max], el.section))
        })

    })

    describe('Учёт рабочего времени', () => {

        before('Вход и открытие подраздела "Лицензии"', async () => {
            await dec.auth(entry.customLogin, entry.customPassword)
            await dec.simple(el.section.handler, [sec.adm, entry.max], el.section)
            await dec.simple(el.subsection.handler, [sub.adm.license, entry.max], el.subsection)
            await dec.simple(page.license.init, [entry.max], page.license)
        })

        after('Выход', async () => await dec.exit())

        describe('Активация', () => {
            it('Нажатие кнопки включения', async () => await dec.simple(page.license.switch, [lic.urv, entry.max], page.license))
            it('Проверка информации', async () => await dec.simple(page.license.info, [lic.urv, params, entry.max], page.license))
        })

        describe('Персонал', () => {
            it('Отображение раздела "Персонал"', async () =>  await dec.simple(el.section.section, [sec.per, entry.max], el.section))
            it('Нажатие "Прсонал"', async () =>  await dec.simple(el.section.handler, [sec.per, entry.max], el.section))
            it('Раздел "Персонал" активен', async () =>  await dec.simple(el.section.active, [sec.per, entry.max], el.section))
            it('Отображение "Сотрудники"', async () => await dec.simple(el.subsection.subsection, [sub.per.staff, entry.max], el.subsection))
            it('Отображение "Подразделения"', async () => await dec.simple(el.subsection.subsection, [sub.per.division, entry.max], el.subsection))
            it('Отображение "Должности"', async () => await dec.simple(el.subsection.subsection, [sub.per.position, entry.max], el.subsection))
            it('Отображение "Праздничные дни"', async () => await dec.simple(el.subsection.subsection, [sub.per.holiday, entry.max], el.subsection))
            it('Отображение "Дополнительные данные"', async () => dec.simple(el.subsection.subsection, [sub.per.data, entry.max], el.subsection))
            it('Отображение "Графики работы"', async () => await dec.simple(el.subsection.subsection, [sub.per.schedule, entry.max], el.subsection))

        })

        describe('Бюро пропусков', () => {
            it('Отображение раздела "Бюро пропусков"', async () =>  await dec.simple(el.section.section, [sec.pas, entry.max], el.section))
            it('Нажатие "Бюро пропусков"', async () =>  await dec.simple(el.section.handler, [sec.pas, entry.max], el.section))
            it('Раздел "Бюро пропусков" активен', async () =>  await dec.simple(el.section.active, [sec.pas, entry.max], el.section))
            it('Отображение "Сотрудники"', async () => await dec.simple(el.subsection.subsection, [sub.pas.staff, entry.max], el.subsection))
            it('Отображение "Шаблоны доступа"', async () => await dec.simple(el.subsection.subsection, [sub.pas.template, entry.max], el.subsection))
            it('Отображение "Посетители"', async () => dec.simple(el.subsection.subsection, [sub.pas.visitor, entry.max], el.subsection))
            it('Отображение "Дизайн пропуска"', async () => dec.simple(el.subsection.subsection, [sub.pas.design, entry.max], el.subsection))
            it('Отображение "Отчет по посетителям"', async () => dec.simple(el.subsection.subsection, [sub.pas.report, entry.max], el.subsection))
        })

        describe('Учёт рабочего времени', () => {
            it('Отображение раздела "Учёт рабочего времени"', async () =>  await dec.simple(el.section.section, [sec.urv, entry.max], el.section))
            it('Нажатие "Учёт рабочего времени"', async () =>  await dec.simple(el.section.handler, [sec.urv, entry.max], el.section))
            it('Раздел "Учёт рабочего времени" активен', async () =>  await dec.simple(el.section.active, [sec.urv, entry.max], el.section))
            it('Отображение "Журнал отработанного времени"', async () => await dec.simple(el.subsection.subsection, [sub.urv.journal, entry.max], el.subsection))
            it('Отображение "Оправдательные документы"', async () => await dec.simple(el.subsection.subsection, [sub.urv.document, entry.max], el.subsection))
            it('Отображение "Формирование табеля"', async () => await dec.simple(el.subsection.subsection, [sub.urv.tabel, entry.max], el.subsection))
            it('Отображение "Отчеты по дисциплине"', async () => await dec.simple(el.subsection.subsection, [sub.urv.violator, entry.max], el.subsection))
            it('Отображение "Отчёт УРВ"', async () => await dec.simple(el.subsection.subsection, [sub.urv.report, entry.max], el.subsection))
            it('Отображение "Время присутствия"', async () => await dec.simple(el.subsection.subsection, [sub.urv.presence, entry.max], el.subsection))
            it('Отображение "Выданные документы"', async () => await dec.simple(el.subsection.subsection, [sub.urv.support, entry.max], el.subsection))
        })

        describe('Контроль доступа', () => {
            it('Отображение раздела "Контроль доступа"', async () =>  await dec.simple(el.section.section, [sec.con, entry.max], el.section))
            it('Нажатие "Контроль доступа"', async () =>  await dec.simple(el.section.handler, [sec.con, entry.max], el.section))
            it('Раздел "Контроль доступа" активен', async () =>  await dec.simple(el.section.active, [sec.con, entry.max], el.section))
            it('Отображение "Управление устройствами"', async () => await dec.simple(el.subsection.subsection, [sub.con.device, entry.max], el.subsection))
            it('Отображение "Отчет о проходах"', async () => dec.simple(el.subsection.subsection, [sub.con.premises, entry.max], el.subsection))
            it('Отсутствие "Журнал верификации"', async () => dec.simple(el.subsection.noElement, [sub.con.verif, entry.max], el.subsection))
            it('Отображение "Отчет по доступу в помещения"', async () => dec.simple(el.subsection.subsection, [sub.con.room, entry.max], el.subsection))
            it('Отображение "Местонахождение"', async () => dec.simple(el.subsection.subsection, [sub.con.location, entry.max], el.subsection))
            it('Отображение "Выданные идентификаторы"', async () => dec.simple(el.subsection.subsection, [sub.con.card, entry.max], el.subsection))
        })

        describe('Верификация', () => {
            it('Отсутствие раздела "Верификация"', async () =>  await dec.simple(el.section.noElement, [sec.ver, entry.max], el.section))
        })

        describe('Заказ пропуска', () => {
            it('Отображение раздела "Заказ пропуска"', async () =>  await dec.simple(el.section.section, [sec.ord, entry.max], el.section))
            it('Нажатие "Заказ пропуска"', async () =>  await dec.simple(el.section.handler, [sec.ord, entry.max], el.section))
            it('Раздел "Заказ пропуска" активен', async () =>  await dec.simple(el.section.active, [sec.ord, entry.max], el.section))
            it('Отображение "Заказ пропуска"', async () => await dec.simple(el.subsection.subsection, [sub.ord.order, entry.max], el.subsection))
        })

        describe('Мониторинг', () => {
            it('Отсутствие раздела "Мониторинг"', async () =>  await dec.simple(el.section.noElement, [sec.mon, entry.max], el.section))
        })

        describe('Администрирование', () => {
            it('Отображение раздела "Администрирование"', async () =>  await dec.simple(el.section.section, [sec.adm, entry.max], el.section))
            it('Нажатие "Администрирование"', async () =>  await dec.simple(el.section.handler, [sec.adm, entry.max], el.section))
            it('Раздел "Администрирование" активен', async () =>  await dec.simple(el.section.active, [sec.adm, entry.max], el.section))
            it('Отображение "Конфигурация"', async () => await dec.simple(el.subsection.subsection, [sub.adm.conf, entry.max], el.subsection))
            it('Отображение "События системы"', async () => await dec.simple(el.subsection.subsection, [sub.adm.event, entry.max], el.subsection))
            it('Отображение "Реакции на события"', async () => await dec.simple(el.subsection.subsection, [sub.adm.action, entry.max], el.subsection))
            it('Отображение "Задания"', async () => await dec.simple(el.subsection.subsection, [sub.adm.task, entry.max], el.subsection))
            it('Отображение "Роли и права операторов"', async () => await dec.simple(el.subsection.subsection, [sub.adm.role, entry.max], el.subsection))
            it('Отображение "Лицензии"', async () => await dec.simple(el.subsection.subsection, [sub.adm.license, entry.max], el.subsection))
        })

        describe('Документация', () => {
            it('Отсутствие раздела "Документация"', async () =>  await dec.simple(el.section.noElement, [sec.doc, entry.max], el.section))
        })

    })

    describe('Верификация', () => {

        before('Вход и открытие подраздела "Лицензии"', async () => {
            await dec.auth(entry.customLogin, entry.customPassword)
            await dec.simple(el.section.handler, [sec.adm, entry.max], el.section)
            await dec.simple(el.subsection.handler, [sub.adm.license, entry.max], el.subsection)
            await dec.simple(page.license.init, [entry.max], page.license)
        })

        after('Выход', async () => await dec.exit())

        describe('Активация', () => {
            it('Нажатие кнопки включения', async () => await dec.simple(page.license.switch, [lic.verification, entry.max], page.license))
            it('Проверка информации', async () => await dec.simple(page.license.info, [lic.verification, params, entry.max], page.license))
        })

        describe('Персонал', () => {
            it('Отображение раздела "Персонал"', async () =>  await dec.simple(el.section.section, [sec.per, entry.max], el.section))
            it('Нажатие "Прсонал"', async () =>  await dec.simple(el.section.handler, [sec.per, entry.max], el.section))
            it('Раздел "Персонал" активен', async () =>  await dec.simple(el.section.active, [sec.per, entry.max], el.section))
            it('Отображение "Сотрудники"', async () => await dec.simple(el.subsection.subsection, [sub.per.staff, entry.max], el.subsection))
            it('Отображение "Подразделения"', async () => await dec.simple(el.subsection.subsection, [sub.per.division, entry.max], el.subsection))
            it('Отображение "Должности"', async () => await dec.simple(el.subsection.subsection, [sub.per.position, entry.max], el.subsection))
            it('Отображение "Праздничные дни"', async () => await dec.simple(el.subsection.subsection, [sub.per.holiday, entry.max], el.subsection))
            it('Отображение "Дополнительные данные"', async () => dec.simple(el.subsection.subsection, [sub.per.data, entry.max], el.subsection))
            it('Отображение "Графики работы"', async () => await dec.simple(el.subsection.subsection, [sub.per.schedule, entry.max], el.subsection))

        })

        describe('Бюро пропусков', () => {
            it('Отображение раздела "Бюро пропусков"', async () =>  await dec.simple(el.section.section, [sec.pas, entry.max], el.section))
            it('Нажатие "Бюро пропусков"', async () =>  await dec.simple(el.section.handler, [sec.pas, entry.max], el.section))
            it('Раздел "Бюро пропусков" активен', async () =>  await dec.simple(el.section.active, [sec.pas, entry.max], el.section))
            it('Отображение "Сотрудники"', async () => await dec.simple(el.subsection.subsection, [sub.pas.staff, entry.max], el.subsection))
            it('Отображение "Шаблоны доступа"', async () => await dec.simple(el.subsection.subsection, [sub.pas.template, entry.max], el.subsection))
            it('Отображение "Посетители"', async () => dec.simple(el.subsection.subsection, [sub.pas.visitor, entry.max], el.subsection))
            it('Отображение "Дизайн пропуска"', async () => dec.simple(el.subsection.subsection, [sub.pas.design, entry.max], el.subsection))
            it('Отображение "Отчет по посетителям"', async () => dec.simple(el.subsection.subsection, [sub.pas.report, entry.max], el.subsection))
        })

        describe('Учёт рабочего времени', () => {
            it('Отображение раздела "Учёт рабочего времени"', async () =>  await dec.simple(el.section.section, [sec.urv, entry.max], el.section))
            it('Нажатие "Учёт рабочего времени"', async () =>  await dec.simple(el.section.handler, [sec.urv, entry.max], el.section))
            it('Раздел "Учёт рабочего времени" активен', async () =>  await dec.simple(el.section.active, [sec.urv, entry.max], el.section))
            it('Отображение "Журнал отработанного времени"', async () => await dec.simple(el.subsection.subsection, [sub.urv.journal, entry.max], el.subsection))
            it('Отображение "Оправдательные документы"', async () => await dec.simple(el.subsection.subsection, [sub.urv.document, entry.max], el.subsection))
            it('Отображение "Формирование табеля"', async () => await dec.simple(el.subsection.subsection, [sub.urv.tabel, entry.max], el.subsection))
            it('Отображение "Отчеты по дисциплине"', async () => await dec.simple(el.subsection.subsection, [sub.urv.violator, entry.max], el.subsection))
            it('Отображение "Отчёт УРВ"', async () => await dec.simple(el.subsection.subsection, [sub.urv.report, entry.max], el.subsection))
            it('Отображение "Время присутствия"', async () => await dec.simple(el.subsection.subsection, [sub.urv.presence, entry.max], el.subsection))
            it('Отображение "Выданные документы"', async () => await dec.simple(el.subsection.subsection, [sub.urv.support, entry.max], el.subsection))
        })

        describe('Контроль доступа', () => {
            it('Отображение раздела "Контроль доступа"', async () =>  await dec.simple(el.section.section, [sec.con, entry.max], el.section))
            it('Нажатие "Контроль доступа"', async () =>  await dec.simple(el.section.handler, [sec.con, entry.max], el.section))
            it('Раздел "Контроль доступа" активен', async () =>  await dec.simple(el.section.active, [sec.con, entry.max], el.section))
            it('Отображение "Управление устройствами"', async () => await dec.simple(el.subsection.subsection, [sub.con.device, entry.max], el.subsection))
            it('Отображение "Отчет о проходах"', async () => dec.simple(el.subsection.subsection, [sub.con.premises, entry.max], el.subsection))
            it('Отображение "Журнал верификации"', async () => dec.simple(el.subsection.subsection, [sub.con.verif, entry.max], el.subsection))
            it('Отображение "Отчет по доступу в помещения"', async () => dec.simple(el.subsection.subsection, [sub.con.room, entry.max], el.subsection))
            it('Отображение "Местонахождение"', async () => dec.simple(el.subsection.subsection, [sub.con.location, entry.max], el.subsection))
            it('Отображение "Выданные идентификаторы"', async () => dec.simple(el.subsection.subsection, [sub.con.card, entry.max], el.subsection))
        })

        describe('Верификация', () => {
            it('Отображение раздела "Верификация"', async () =>  await dec.simple(el.section.section, [sec.ver, entry.max], el.section))
            it('Нажатие "Верификация"', async () =>  await dec.simple(el.section.handler, [sec.ver, entry.max], el.section))
            it('Раздел "Верификация', async () =>  await dec.simple(el.section.active, [sec.ver, entry.max], el.section))
            it('Отображение "Верификация"', async () => await dec.simple(el.subsection.subsection, [sub.ver.verif, entry.max], el.subsection))
            it('Отображение "Конфигурация верификации"', async () => await dec.simple(el.subsection.subsection, [sub.ver.config, entry.max], el.subsection))
        })

        describe('Заказ пропуска', () => {
            it('Отображение раздела "Заказ пропуска"', async () =>  await dec.simple(el.section.section, [sec.ord, entry.max], el.section))
            it('Нажатие "Заказ пропуска"', async () =>  await dec.simple(el.section.handler, [sec.ord, entry.max], el.section))
            it('Раздел "Заказ пропуска" активен', async () =>  await dec.simple(el.section.active, [sec.ord, entry.max], el.section))
            it('Отображение "Заказ пропуска"', async () => await dec.simple(el.subsection.subsection, [sub.ord.order, entry.max], el.subsection))
        })

        describe('Мониторинг', () => {
            it('Отсутствие раздела "Мониторинг"', async () =>  await dec.simple(el.section.noElement, [sec.mon, entry.max], el.section))
        })

        describe('Администрирование', () => {
            it('Отображение раздела "Администрирование"', async () =>  await dec.simple(el.section.section, [sec.adm, entry.max], el.section))
            it('Нажатие "Администрирование"', async () =>  await dec.simple(el.section.handler, [sec.adm, entry.max], el.section))
            it('Раздел "Администрирование" активен', async () =>  await dec.simple(el.section.active, [sec.adm, entry.max], el.section))
            it('Отображение "Конфигурация"', async () => await dec.simple(el.subsection.subsection, [sub.adm.conf, entry.max], el.subsection))
            it('Отображение "События системы"', async () => await dec.simple(el.subsection.subsection, [sub.adm.event, entry.max], el.subsection))
            it('Отображение "Реакции на события"', async () => await dec.simple(el.subsection.subsection, [sub.adm.action, entry.max], el.subsection))
            it('Отображение "Задания"', async () => await dec.simple(el.subsection.subsection, [sub.adm.task, entry.max], el.subsection))
            it('Отображение "Роли и права операторов"', async () => await dec.simple(el.subsection.subsection, [sub.adm.role, entry.max], el.subsection))
            it('Отображение "Лицензии"', async () => await dec.simple(el.subsection.subsection, [sub.adm.license, entry.max], el.subsection))
        })

        describe('Документация', () => {
            it('Отсутствие раздела "Документация"', async () =>  await dec.simple(el.section.noElement, [sec.doc, entry.max], el.section))
        })

    })

    describe('Интеграция с 1С', () => {

        before('Вход и открытие подраздела "Лицензии"', async () => {
            await dec.auth(entry.customLogin, entry.customPassword)
            await dec.simple(el.section.handler, [sec.adm, entry.max], el.section)
            await dec.simple(el.subsection.handler, [sub.adm.license, entry.max], el.subsection)
            await dec.simple(page.license.init, [entry.max], page.license)
        })

        after('Выход', async () => await dec.exit())

        describe('Активация', () => {
            it('Нажатие кнопки включения', async () => await dec.simple(page.license.switch, [lic.one, entry.max], page.license))
            it('Проверка информации', async () => await dec.simple(page.license.info, [lic.one, params, entry.max], page.license))
        })

        describe('Персонал', () => {
            it('Отображение раздела "Персонал"', async () =>  await dec.simple(el.section.section, [sec.per, entry.max], el.section))
            it('Нажатие "Прсонал"', async () => await dec.simple(el.section.handler, [sec.per, entry.max], el.section))
            it('Раздел "Персонал" активен', async () => await dec.simple(el.section.active, [sec.per, entry.max], el.section))
            it('Отображение "Сотрудники"', async () => await dec.simple(el.subsection.subsection, [sub.per.staff, entry.max], el.subsection))
            it('Отображение "Подразделения"', async () => await dec.simple(el.subsection.subsection, [sub.per.division, entry.max], el.subsection))
            it('Отображение "Должности"', async () => await dec.simple(el.subsection.subsection, [sub.per.position, entry.max], el.subsection))
            it('Отображение "Праздничные дни"', async () => await dec.simple(el.subsection.subsection, [sub.per.holiday, entry.max], el.subsection))
            it('Отображение "Дополнительные данные"', async () => dec.simple(el.subsection.subsection, [sub.per.data, entry.max], el.subsection))
            it('Отображение "Графики работы"', async () => await dec.simple(el.subsection.subsection, [sub.per.schedule, entry.max], el.subsection))
        })

        describe('Бюро пропусков', () => {
            it('Отображение раздела "Бюро пропусков"', async () =>  await dec.simple(el.section.section, [sec.pas, entry.max], el.section))
            it('Нажатие "Бюро пропусков"', async () =>  await dec.simple(el.section.handler, [sec.pas, entry.max], el.section))
            it('Раздел "Бюро пропусков" активен', async () =>  await dec.simple(el.section.active, [sec.pas, entry.max], el.section))
            it('Отображение "Сотрудники"', async () => await dec.simple(el.subsection.subsection, [sub.pas.staff, entry.max], el.subsection))
            it('Отображение "Шаблоны доступа"', async () => await dec.simple(el.subsection.subsection, [sub.pas.template, entry.max], el.subsection))
            it('Отображение "Посетители"', async () => dec.simple(el.subsection.subsection, [sub.pas.visitor, entry.max], el.subsection))
            it('Отображение "Дизайн пропуска"', async () => dec.simple(el.subsection.subsection, [sub.pas.design, entry.max], el.subsection))
            it('Отображение "Отчет по посетителям"', async () => dec.simple(el.subsection.subsection, [sub.pas.report, entry.max], el.subsection))
        })

        describe('Учёт рабочего времени', () => {
            it('Отображение раздела "Учёт рабочего времени"', async () =>  await dec.simple(el.section.section, [sec.urv, entry.max], el.section))
            it('Нажатие "Учёт рабочего времени"', async () =>  await dec.simple(el.section.handler, [sec.urv, entry.max], el.section))
            it('Раздел "Учёт рабочего времени" активен', async () =>  await dec.simple(el.section.active, [sec.urv, entry.max], el.section))
            it('Отображение "Журнал отработанного времени"', async () => await dec.simple(el.subsection.subsection, [sub.urv.journal, entry.max], el.subsection))
            it('Отображение "Оправдательные документы"', async () => await dec.simple(el.subsection.subsection, [sub.urv.document, entry.max], el.subsection))
            it('Отображение "Формирование табеля"', async () => await dec.simple(el.subsection.subsection, [sub.urv.tabel, entry.max], el.subsection))
            it('Отображение "Отчеты по дисциплине"', async () => await dec.simple(el.subsection.subsection, [sub.urv.violator, entry.max], el.subsection))
            it('Отображение "Отчёт УРВ"', async () => await dec.simple(el.subsection.subsection, [sub.urv.report, entry.max], el.subsection))
            it('Отображение "Время присутствия"', async () => await dec.simple(el.subsection.subsection, [sub.urv.presence, entry.max], el.subsection))
            it('Отображение "Выданные документы"', async () => await dec.simple(el.subsection.subsection, [sub.urv.support, entry.max], el.subsection))
        })

        describe('Контроль доступа', () => {
            it('Отображение раздела "Контроль доступа"', async () =>  await dec.simple(el.section.section, [sec.con, entry.max], el.section))
            it('Нажатие "Контроль доступа"', async () =>  await dec.simple(el.section.handler, [sec.con, entry.max], el.section))
            it('Раздел "Контроль доступа" активен', async () =>  await dec.simple(el.section.active, [sec.con, entry.max], el.section))
            it('Отображение "Управление устройствами"', async () => await dec.simple(el.subsection.subsection, [sub.con.device, entry.max], el.subsection))
            it('Отображение "Отчет о проходах"', async () => dec.simple(el.subsection.subsection, [sub.con.premises, entry.max], el.subsection))
            it('Отображение "Журнал верификации"', async () => dec.simple(el.subsection.subsection, [sub.con.verif, entry.max], el.subsection))
            it('Отображение "Отчет по доступу в помещения"', async () => dec.simple(el.subsection.subsection, [sub.con.room, entry.max], el.subsection))
            it('Отображение "Местонахождение"', async () => dec.simple(el.subsection.subsection, [sub.con.location, entry.max], el.subsection))
            it('Отображение "Выданные идентификаторы"', async () => dec.simple(el.subsection.subsection, [sub.con.card, entry.max], el.subsection))
        })

        describe('Верификация', () => {
            it('Отображение раздела "Верификация"', async () =>  await dec.simple(el.section.section, [sec.ver, entry.max], el.section))
            it('Нажатие "Верификация"', async () =>  await dec.simple(el.section.handler, [sec.ver, entry.max], el.section))
            it('Раздел "Верификация', async () =>  await dec.simple(el.section.active, [sec.ver, entry.max], el.section))
            it('Отображение "Верификация"', async () => await dec.simple(el.subsection.subsection, [sub.ver.verif, entry.max], el.subsection))
            it('Отображение "Конфигурация верификации"', async () => await dec.simple(el.subsection.subsection, [sub.ver.config, entry.max], el.subsection))
        })

        describe('Заказ пропуска', () => {
            it('Отображение раздела "Заказ пропуска"', async () =>  await dec.simple(el.section.section, [sec.ord, entry.max], el.section))
            it('Нажатие "Заказ пропуска"', async () =>  await dec.simple(el.section.handler, [sec.ord, entry.max], el.section))
            it('Раздел "Заказ пропуска" активен', async () =>  await dec.simple(el.section.active, [sec.ord, entry.max], el.section))
            it('Отображение "Заказ пропуска"', async () => await dec.simple(el.subsection.subsection, [sub.ord.order, entry.max], el.subsection))
        })

        describe('Мониторинг', () => {
            it('Отсутствие раздела "Мониторинг"', async () =>  await dec.simple(el.section.noElement, [sec.mon, entry.max], el.section))
        })

        describe('Администрирование', () => {
            it('Отображение раздела "Администрирование"', async () =>  await dec.simple(el.section.section, [sec.adm, entry.max], el.section))
            it('Нажатие "Администрирование"', async () =>  await dec.simple(el.section.handler, [sec.adm, entry.max], el.section))
            it('Раздел "Администрирование" активен', async () =>  await dec.simple(el.section.active, [sec.adm, entry.max], el.section))
            it('Отображение "Конфигурация"', async () => await dec.simple(el.subsection.subsection, [sub.adm.conf, entry.max], el.subsection))
            it('Отображение "События системы"', async () => await dec.simple(el.subsection.subsection, [sub.adm.event, entry.max], el.subsection))
            it('Отображение "Реакции на события"', async () => await dec.simple(el.subsection.subsection, [sub.adm.action, entry.max], el.subsection))
            it('Отображение "Задания"', async () => await dec.simple(el.subsection.subsection, [sub.adm.task, entry.max], el.subsection))
            it('Отображение "Роли и права операторов"', async () => await dec.simple(el.subsection.subsection, [sub.adm.role, entry.max], el.subsection))
            it('Отображение "Лицензии"', async () => await dec.simple(el.subsection.subsection, [sub.adm.license, entry.max], el.subsection))
        })

        describe('Документация', () => {
            it('Отсутствие раздела "Документация"', async () =>  await dec.simple(el.section.noElement, [sec.doc, entry.max], el.section))
        })

    })

    describe('Интеграция с внешними системами', () => {

        before('Вход и открытие подраздела "Лицензии"', async () => {
            await dec.auth(entry.customLogin, entry.customPassword)
            await dec.simple(el.section.handler, [sec.adm, entry.max], el.section)
            await dec.simple(el.subsection.handler, [sub.adm.license, entry.max], el.subsection)
            await dec.simple(page.license.init, [entry.max], page.license)
        })

        after('Выход', async () => await dec.exit())

        describe('Активация', () => {
            it('Нажатие кнопки включения', async () => await dec.simple(page.license.switch, [lic.device, entry.max], page.license))
            it('Обновление страницы', async () => await dec.simple(page.base.refresh, [], page.base))
            it('Проверка информации', async () => await dec.simple(page.license.info, [lic.device, params, entry.max], page.license))
        })

        describe('Персонал', () => {
            it('Отображение раздела "Персонал"', async () =>  await dec.simple(el.section.section, [sec.per, entry.max], el.section))
            it('Нажатие "Прсонал"', async () =>  await dec.simple(el.section.handler, [sec.per, entry.max], el.section))
            it('Раздел "Персонал" активен', async () =>  await dec.simple(el.section.active, [sec.per, entry.max], el.section))
            it('Отображение "Сотрудники"', async () => await dec.simple(el.subsection.subsection, [sub.per.staff, entry.max], el.subsection))
            it('Отображение "Подразделения"', async () => await dec.simple(el.subsection.subsection, [sub.per.division, entry.max], el.subsection))
            it('Отображение "Должности"', async () => await dec.simple(el.subsection.subsection, [sub.per.position, entry.max], el.subsection))
            it('Отображение "Праздничные дни"', async () => await dec.simple(el.subsection.subsection, [sub.per.holiday, entry.max], el.subsection))
            it('Отображение "Дополнительные данные"', async () => dec.simple(el.subsection.subsection, [sub.per.data, entry.max], el.subsection))
            it('Отображение "Графики работы"', async () => await dec.simple(el.subsection.subsection, [sub.per.schedule, entry.max], el.subsection))

        })

        describe('Бюро пропусков', () => {
            it('Отображение раздела "Бюро пропусков"', async () =>  await dec.simple(el.section.section, [sec.pas, entry.max], el.section))
            it('Нажатие "Бюро пропусков"', async () =>  await dec.simple(el.section.handler, [sec.pas, entry.max], el.section))
            it('Раздел "Бюро пропусков" активен', async () =>  await dec.simple(el.section.active, [sec.pas, entry.max], el.section))
            it('Отображение "Сотрудники"', async () => await dec.simple(el.subsection.subsection, [sub.pas.staff, entry.max], el.subsection))
            it('Отображение "Шаблоны доступа"', async () => await dec.simple(el.subsection.subsection, [sub.pas.template, entry.max], el.subsection))
            it('Отображение "Посетители"', async () => dec.simple(el.subsection.subsection, [sub.pas.visitor, entry.max], el.subsection))
            it('Отображение "Дизайн пропуска"', async () => dec.simple(el.subsection.subsection, [sub.pas.design, entry.max], el.subsection))
            it('Отображение "Отчет по посетителям"', async () => dec.simple(el.subsection.subsection, [sub.pas.report, entry.max], el.subsection))
        })

        describe('Учёт рабочего времени', () => {
            it('Отображение раздела "Учёт рабочего времени"', async () =>  await dec.simple(el.section.section, [sec.urv, entry.max], el.section))
            it('Нажатие "Учёт рабочего времени"', async () =>  await dec.simple(el.section.handler, [sec.urv, entry.max], el.section))
            it('Раздел "Учёт рабочего времени" активен', async () =>  await dec.simple(el.section.active, [sec.urv, entry.max], el.section))
            it('Отображение "Журнал отработанного времени"', async () => await dec.simple(el.subsection.subsection, [sub.urv.journal, entry.max], el.subsection))
            it('Отображение "Оправдательные документы"', async () => await dec.simple(el.subsection.subsection, [sub.urv.document, entry.max], el.subsection))
            it('Отображение "Формирование табеля"', async () => await dec.simple(el.subsection.subsection, [sub.urv.tabel, entry.max], el.subsection))
            it('Отображение "Отчеты по дисциплине"', async () => await dec.simple(el.subsection.subsection, [sub.urv.violator, entry.max], el.subsection))
            it('Отображение "Отчёт УРВ"', async () => await dec.simple(el.subsection.subsection, [sub.urv.report, entry.max], el.subsection))
            it('Отображение "Время присутствия"', async () => await dec.simple(el.subsection.subsection, [sub.urv.presence, entry.max], el.subsection))
            it('Отображение "Выданные документы"', async () => await dec.simple(el.subsection.subsection, [sub.urv.support, entry.max], el.subsection))
        })

        describe('Контроль доступа', () => {
            it('Отображение раздела "Контроль доступа"', async () =>  await dec.simple(el.section.section, [sec.con, entry.max], el.section))
            it('Нажатие "Контроль доступа"', async () =>  await dec.simple(el.section.handler, [sec.con, entry.max], el.section))
            it('Раздел "Контроль доступа" активен', async () =>  await dec.simple(el.section.active, [sec.con, entry.max], el.section))
            it('Отображение "Управление устройствами"', async () => await dec.simple(el.subsection.subsection, [sub.con.device, entry.max], el.subsection))
            it('Отображение "Отчет о проходах"', async () => dec.simple(el.subsection.subsection, [sub.con.premises, entry.max], el.subsection))
            it('Отображение "Журнал верификации"', async () => dec.simple(el.subsection.subsection, [sub.con.verif, entry.max], el.subsection))
            it('Отображение "Отчет по доступу в помещения"', async () => dec.simple(el.subsection.subsection, [sub.con.room, entry.max], el.subsection))
            it('Отображение "Местонахождение"', async () => dec.simple(el.subsection.subsection, [sub.con.location, entry.max], el.subsection))
            it('Отображение "Выданные идентификаторы"', async () => dec.simple(el.subsection.subsection, [sub.con.card, entry.max], el.subsection))
        })

        describe('Верификация', () => {
            it('Отображение раздела "Верификация"', async () =>  await dec.simple(el.section.section, [sec.ver, entry.max], el.section))
            it('Нажатие "Верификация"', async () =>  await dec.simple(el.section.handler, [sec.ver, entry.max], el.section))
            it('Раздел "Верификация', async () =>  await dec.simple(el.section.active, [sec.ver, entry.max], el.section))
            it('Отображение "Верификация"', async () => await dec.simple(el.subsection.subsection, [sub.ver.verif, entry.max], el.subsection))
            it('Отображение "Конфигурация верификации"', async () => await dec.simple(el.subsection.subsection, [sub.ver.config, entry.max], el.subsection))
        })

        describe('Заказ пропуска', () => {
            it('Отображение раздела "Заказ пропуска"', async () =>  await dec.simple(el.section.section, [sec.ord, entry.max], el.section))
            it('Нажатие "Заказ пропуска"', async () =>  await dec.simple(el.section.handler, [sec.ord, entry.max], el.section))
            it('Раздел "Заказ пропуска" активен', async () =>  await dec.simple(el.section.active, [sec.ord, entry.max], el.section))
            it('Отображение "Заказ пропуска"', async () => await dec.simple(el.subsection.subsection, [sub.ord.order, entry.max], el.subsection))
        })

        describe('Мониторинг', () => {
            it('Отсутствие раздела "Мониторинг"', async () =>  await dec.simple(el.section.noElement, [sec.mon, entry.max], el.section))
        })

        describe('Администрирование', () => {
            it('Отображение раздела "Администрирование"', async () =>  await dec.simple(el.section.section, [sec.adm, entry.max], el.section))
            it('Нажатие "Администрирование"', async () =>  await dec.simple(el.section.handler, [sec.adm, entry.max], el.section))
            it('Раздел "Администрирование" активен', async () =>  await dec.simple(el.section.active, [sec.adm, entry.max], el.section))
            it('Отображение "Конфигурация"', async () => await dec.simple(el.subsection.subsection, [sub.adm.conf, entry.max], el.subsection))
            it('Отображение "События системы"', async () => await dec.simple(el.subsection.subsection, [sub.adm.event, entry.max], el.subsection))
            it('Отображение "Реакции на события"', async () => await dec.simple(el.subsection.subsection, [sub.adm.action, entry.max], el.subsection))
            it('Отображение "Задания"', async () => await dec.simple(el.subsection.subsection, [sub.adm.task, entry.max], el.subsection))
            it('Отображение "Роли и права операторов"', async () => await dec.simple(el.subsection.subsection, [sub.adm.role, entry.max], el.subsection))
            it('Отображение "Лицензии"', async () => await dec.simple(el.subsection.subsection, [sub.adm.license, entry.max], el.subsection))
        })

        describe('Документация', () => {
            it('Отображение раздела "Документация"', async () => {
                await dec.simple(page.base.refresh, [], page.base)
                await dec.simple(el.section.section, [sec.doc, entry.max], el.section)
            })
            it('Нажатие "Документация"', async () =>  await dec.simple(el.section.handler, [sec.doc, entry.max], el.section))
            it('Раздел "Документация" активен', async () =>  await dec.simple(el.section.active, [sec.doc, entry.max], el.section))
            it('Отображение "SDK"', async () => await dec.simple(el.subsection.subsection, [sub.doc.sdk, entry.max], el.subsection))
        })

    })

    describe('Мониторинг', () => {

        before('Вход и открытие подраздела "Лицензии"', async () => {
            await dec.auth(entry.customLogin, entry.customPassword)
            await dec.simple(el.section.handler, [sec.adm, entry.max], el.section)
            await dec.simple(el.subsection.handler, [sub.adm.license, entry.max], el.subsection)
            await dec.simple(page.license.init, [entry.max], page.license)
        })

        after('Выход', async () => await dec.exit())

        describe('Активация', () => {
            it('Нажатие кнопки включения', async () => await dec.simple(page.license.switch, [lic.monitoring, entry.max], page.license))
            it('Проверка информации', async () => await dec.simple(page.license.info, [lic.monitoring, params, entry.max], page.license))
        })

        describe('Персонал', () => {
            it('Отображение раздела "Персонал"', async () =>  await dec.simple(el.section.section, [sec.per, entry.max], el.section))
            it('Нажатие "Прсонал"', async () =>  await dec.simple(el.section.handler, [sec.per, entry.max], el.section))
            it('Раздел "Персонал" активен', async () =>  await dec.simple(el.section.active, [sec.per, entry.max], el.section))
            it('Отображение "Сотрудники"', async () => await dec.simple(el.subsection.subsection, [sub.per.staff, entry.max], el.subsection))
            it('Отображение "Подразделения"', async () => await dec.simple(el.subsection.subsection, [sub.per.division, entry.max], el.subsection))
            it('Отображение "Должности"', async () => await dec.simple(el.subsection.subsection, [sub.per.position, entry.max], el.subsection))
            it('Отображение "Праздничные дни"', async () => await dec.simple(el.subsection.subsection, [sub.per.holiday, entry.max], el.subsection))
            it('Отображение "Дополнительные данные"', async () => dec.simple(el.subsection.subsection, [sub.per.data, entry.max], el.subsection))
            it('Отображение "Графики работы"', async () => await dec.simple(el.subsection.subsection, [sub.per.schedule, entry.max], el.subsection))

        })

        describe('Бюро пропусков', () => {
            it('Отображение раздела "Бюро пропусков"', async () =>  await dec.simple(el.section.section, [sec.pas, entry.max], el.section))
            it('Нажатие "Бюро пропусков"', async () =>  await dec.simple(el.section.handler, [sec.pas, entry.max], el.section))
            it('Раздел "Бюро пропусков" активен', async () =>  await dec.simple(el.section.active, [sec.pas, entry.max], el.section))
            it('Отображение "Сотрудники"', async () => await dec.simple(el.subsection.subsection, [sub.pas.staff, entry.max], el.subsection))
            it('Отображение "Шаблоны доступа"', async () => await dec.simple(el.subsection.subsection, [sub.pas.template, entry.max], el.subsection))
            it('Отображение "Посетители"', async () => dec.simple(el.subsection.subsection, [sub.pas.visitor, entry.max], el.subsection))
            it('Отображение "Дизайн пропуска"', async () => dec.simple(el.subsection.subsection, [sub.pas.design, entry.max], el.subsection))
            it('Отображение "Отчет по посетителям"', async () => dec.simple(el.subsection.subsection, [sub.pas.report, entry.max], el.subsection))
        })

        describe('Учёт рабочего времени', () => {
            it('Отображение раздела "Учёт рабочего времени"', async () =>  await dec.simple(el.section.section, [sec.urv, entry.max], el.section))
            it('Нажатие "Учёт рабочего времени"', async () =>  await dec.simple(el.section.handler, [sec.urv, entry.max], el.section))
            it('Раздел "Учёт рабочего времени" активен', async () =>  await dec.simple(el.section.active, [sec.urv, entry.max], el.section))
            it('Отображение "Журнал отработанного времени"', async () => await dec.simple(el.subsection.subsection, [sub.urv.journal, entry.max], el.subsection))
            it('Отображение "Оправдательные документы"', async () => await dec.simple(el.subsection.subsection, [sub.urv.document, entry.max], el.subsection))
            it('Отображение "Формирование табеля"', async () => await dec.simple(el.subsection.subsection, [sub.urv.tabel, entry.max], el.subsection))
            it('Отображение "Отчеты по дисциплине"', async () => await dec.simple(el.subsection.subsection, [sub.urv.violator, entry.max], el.subsection))
            it('Отображение "Отчёт УРВ"', async () => await dec.simple(el.subsection.subsection, [sub.urv.report, entry.max], el.subsection))
            it('Отображение "Время присутствия"', async () => await dec.simple(el.subsection.subsection, [sub.urv.presence, entry.max], el.subsection))
            it('Отображение "Выданные документы"', async () => await dec.simple(el.subsection.subsection, [sub.urv.support, entry.max], el.subsection))
        })

        describe('Контроль доступа', () => {
            it('Отображение раздела "Контроль доступа"', async () =>  await dec.simple(el.section.section, [sec.con, entry.max], el.section))
            it('Нажатие "Контроль доступа"', async () =>  await dec.simple(el.section.handler, [sec.con, entry.max], el.section))
            it('Раздел "Контроль доступа" активен', async () =>  await dec.simple(el.section.active, [sec.con, entry.max], el.section))
            it('Отображение "Управление устройствами"', async () => await dec.simple(el.subsection.subsection, [sub.con.device, entry.max], el.subsection))
            it('Отображение "Отчет о проходах"', async () => dec.simple(el.subsection.subsection, [sub.con.premises, entry.max], el.subsection))
            it('Отображение "Журнал верификации"', async () => dec.simple(el.subsection.subsection, [sub.con.verif, entry.max], el.subsection))
            it('Отображение "Отчет по доступу в помещения"', async () => dec.simple(el.subsection.subsection, [sub.con.room, entry.max], el.subsection))
            it('Отображение "Местонахождение"', async () => dec.simple(el.subsection.subsection, [sub.con.location, entry.max], el.subsection))
            it('Отображение "Выданные идентификаторы"', async () => dec.simple(el.subsection.subsection, [sub.con.card, entry.max], el.subsection))
        })

        describe('Верификация', () => {
            it('Отображение раздела "Верификация"', async () =>  await dec.simple(el.section.section, [sec.ver, entry.max], el.section))
            it('Нажатие "Верификация"', async () =>  await dec.simple(el.section.handler, [sec.ver, entry.max], el.section))
            it('Раздел "Верификация', async () =>  await dec.simple(el.section.active, [sec.ver, entry.max], el.section))
            it('Отображение "Верификация"', async () => await dec.simple(el.subsection.subsection, [sub.ver.verif, entry.max], el.subsection))
            it('Отображение "Конфигурация верификации"', async () => await dec.simple(el.subsection.subsection, [sub.ver.config, entry.max], el.subsection))
        })

        describe('Заказ пропуска', () => {
            it('Отображение раздела "Заказ пропуска"', async () =>  await dec.simple(el.section.section, [sec.ord, entry.max], el.section))
            it('Нажатие "Заказ пропуска"', async () =>  await dec.simple(el.section.handler, [sec.ord, entry.max], el.section))
            it('Раздел "Заказ пропуска" активен', async () =>  await dec.simple(el.section.active, [sec.ord, entry.max], el.section))
            it('Отображение "Заказ пропуска"', async () => await dec.simple(el.subsection.subsection, [sub.ord.order, entry.max], el.subsection))
        })

        describe('Мониторинг', () => {
            it('Отображение раздела "Мониторинг"', async () =>  await dec.simple(el.section.section, [sec.mon, entry.max], el.section))
            it('Нажатие "Мониторинг"', async () =>  await dec.simple(el.section.handler, [sec.mon, entry.max], el.section))
            it('Раздел "Мониторинг', async () =>  await dec.simple(el.section.active, [sec.mon, entry.max], el.section))
            it('Отображение "Интерактивный план"', async () => await dec.simple(el.subsection.subsection, [sub.mon.plan, entry.max], el.subsection))
        })

        describe('Администрирование', () => {
            it('Отображение раздела "Администрирование"', async () =>  await dec.simple(el.section.section, [sec.adm, entry.max], el.section))
            it('Нажатие "Администрирование"', async () =>  await dec.simple(el.section.handler, [sec.adm, entry.max], el.section))
            it('Раздел "Администрирование" активен', async () =>  await dec.simple(el.section.active, [sec.adm, entry.max], el.section))
            it('Отображение "Конфигурация"', async () => await dec.simple(el.subsection.subsection, [sub.adm.conf, entry.max], el.subsection))
            it('Отображение "События системы"', async () => await dec.simple(el.subsection.subsection, [sub.adm.event, entry.max], el.subsection))
            it('Отображение "Реакции на события"', async () => await dec.simple(el.subsection.subsection, [sub.adm.action, entry.max], el.subsection))
            it('Отображение "Задания"', async () => await dec.simple(el.subsection.subsection, [sub.adm.task, entry.max], el.subsection))
            it('Отображение "Роли и права операторов"', async () => await dec.simple(el.subsection.subsection, [sub.adm.role, entry.max], el.subsection))
            it('Отображение "Лицензии"', async () => await dec.simple(el.subsection.subsection, [sub.adm.license, entry.max], el.subsection))
        })

        describe('Документация', () => {
            it('Отображение раздела "Документация"', async () =>  await dec.simple(el.section.section, [sec.doc, entry.max], el.section))
            it('Нажатие "Документация"', async () =>  await dec.simple(el.section.handler, [sec.doc, entry.max], el.section))
            it('Раздел "Документация" активен', async () =>  await dec.simple(el.section.active, [sec.doc, entry.max], el.section))
            it('Отображение "SDK"', async () => await dec.simple(el.subsection.subsection, [sub.doc.sdk, entry.max], el.subsection))
        })

    })

    describe('Интеграция с TRASSIR', () => {

        before('Вход и открытие подраздела "Лицензии"', async () => {
            await dec.auth(entry.customLogin, entry.customPassword)
            await dec.simple(el.section.handler, [sec.adm, entry.max], el.section)
            await dec.simple(el.subsection.handler, [sub.adm.license, entry.max], el.subsection)
            await dec.simple(page.license.init, [entry.max], page.license)
        })

        after('Выход', async () => await dec.exit())

        describe('Активация', () => {
            it('Нажатие кнопки включения', async () => await dec.simple(page.license.switch, [lic.trassir, entry.max], page.license))
            it('Проверка информации', async () => await dec.simple(page.license.info, [lic.trassir, params, entry.max], page.license))
        })

        describe('Персонал', () => {
            it('Отображение раздела "Персонал"', async () =>  await dec.simple(el.section.section, [sec.per, entry.max], el.section))
            it('Нажатие "Прсонал"', async () =>  await dec.simple(el.section.handler, [sec.per, entry.max], el.section))
            it('Раздел "Персонал" активен', async () =>  await dec.simple(el.section.active, [sec.per, entry.max], el.section))
            it('Отображение "Сотрудники"', async () => await dec.simple(el.subsection.subsection, [sub.per.staff, entry.max], el.subsection))
            it('Отображение "Подразделения"', async () => await dec.simple(el.subsection.subsection, [sub.per.division, entry.max], el.subsection))
            it('Отображение "Должности"', async () => await dec.simple(el.subsection.subsection, [sub.per.position, entry.max], el.subsection))
            it('Отображение "Праздничные дни"', async () => await dec.simple(el.subsection.subsection, [sub.per.holiday, entry.max], el.subsection))
            it('Отображение "Дополнительные данные"', async () => dec.simple(el.subsection.subsection, [sub.per.data, entry.max], el.subsection))
            it('Отображение "Графики работы"', async () => await dec.simple(el.subsection.subsection, [sub.per.schedule, entry.max], el.subsection))

        })

        describe('Бюро пропусков', () => {
            it('Отображение раздела "Бюро пропусков"', async () =>  await dec.simple(el.section.section, [sec.pas, entry.max], el.section))
            it('Нажатие "Бюро пропусков"', async () =>  await dec.simple(el.section.handler, [sec.pas, entry.max], el.section))
            it('Раздел "Бюро пропусков" активен', async () =>  await dec.simple(el.section.active, [sec.pas, entry.max], el.section))
            it('Отображение "Сотрудники"', async () => await dec.simple(el.subsection.subsection, [sub.pas.staff, entry.max], el.subsection))
            it('Отображение "Шаблоны доступа"', async () => await dec.simple(el.subsection.subsection, [sub.pas.template, entry.max], el.subsection))
            it('Отображение "Посетители"', async () => dec.simple(el.subsection.subsection, [sub.pas.visitor, entry.max], el.subsection))
            it('Отображение "Дизайн пропуска"', async () => dec.simple(el.subsection.subsection, [sub.pas.design, entry.max], el.subsection))
            it('Отображение "Отчет по посетителям"', async () => dec.simple(el.subsection.subsection, [sub.pas.report, entry.max], el.subsection))
        })

        describe('Учёт рабочего времени', () => {
            it('Отображение раздела "Учёт рабочего времени"', async () =>  await dec.simple(el.section.section, [sec.urv, entry.max], el.section))
            it('Нажатие "Учёт рабочего времени"', async () =>  await dec.simple(el.section.handler, [sec.urv, entry.max], el.section))
            it('Раздел "Учёт рабочего времени" активен', async () =>  await dec.simple(el.section.active, [sec.urv, entry.max], el.section))
            it('Отображение "Журнал отработанного времени"', async () => await dec.simple(el.subsection.subsection, [sub.urv.journal, entry.max], el.subsection))
            it('Отображение "Оправдательные документы"', async () => await dec.simple(el.subsection.subsection, [sub.urv.document, entry.max], el.subsection))
            it('Отображение "Формирование табеля"', async () => await dec.simple(el.subsection.subsection, [sub.urv.tabel, entry.max], el.subsection))
            it('Отображение "Отчеты по дисциплине"', async () => await dec.simple(el.subsection.subsection, [sub.urv.violator, entry.max], el.subsection))
            it('Отображение "Отчёт УРВ"', async () => await dec.simple(el.subsection.subsection, [sub.urv.report, entry.max], el.subsection))
            it('Отображение "Время присутствия"', async () => await dec.simple(el.subsection.subsection, [sub.urv.presence, entry.max], el.subsection))
            it('Отображение "Выданные документы"', async () => await dec.simple(el.subsection.subsection, [sub.urv.support, entry.max], el.subsection))
        })

        describe('Контроль доступа', () => {
            it('Отображение раздела "Контроль доступа"', async () =>  await dec.simple(el.section.section, [sec.con, entry.max], el.section))
            it('Нажатие "Контроль доступа"', async () =>  await dec.simple(el.section.handler, [sec.con, entry.max], el.section))
            it('Раздел "Контроль доступа" активен', async () =>  await dec.simple(el.section.active, [sec.con, entry.max], el.section))
            it('Отображение "Управление устройствами"', async () => await dec.simple(el.subsection.subsection, [sub.con.device, entry.max], el.subsection))
            it('Отображение "Отчет о проходах"', async () => dec.simple(el.subsection.subsection, [sub.con.premises, entry.max], el.subsection))
            it('Отображение "Журнал верификации"', async () => dec.simple(el.subsection.subsection, [sub.con.verif, entry.max], el.subsection))
            it('Отображение "Отчет по доступу в помещения"', async () => dec.simple(el.subsection.subsection, [sub.con.room, entry.max], el.subsection))
            it('Отображение "Местонахождение"', async () => dec.simple(el.subsection.subsection, [sub.con.location, entry.max], el.subsection))
            it('Отображение "Выданные идентификаторы"', async () => dec.simple(el.subsection.subsection, [sub.con.card, entry.max], el.subsection))
        })

        describe('Верификация', () => {
            it('Отображение раздела "Верификация"', async () =>  await dec.simple(el.section.section, [sec.ver, entry.max], el.section))
            it('Нажатие "Верификация"', async () =>  await dec.simple(el.section.handler, [sec.ver, entry.max], el.section))
            it('Раздел "Верификация', async () =>  await dec.simple(el.section.active, [sec.ver, entry.max], el.section))
            it('Отображение "Верификация"', async () => await dec.simple(el.subsection.subsection, [sub.ver.verif, entry.max], el.subsection))
            it('Отображение "Конфигурация верификации"', async () => await dec.simple(el.subsection.subsection, [sub.ver.config, entry.max], el.subsection))
        })

        describe('Заказ пропуска', () => {
            it('Отображение раздела "Заказ пропуска"', async () =>  await dec.simple(el.section.section, [sec.ord, entry.max], el.section))
            it('Нажатие "Заказ пропуска"', async () =>  await dec.simple(el.section.handler, [sec.ord, entry.max], el.section))
            it('Раздел "Заказ пропуска" активен', async () =>  await dec.simple(el.section.active, [sec.ord, entry.max], el.section))
            it('Отображение "Заказ пропуска"', async () => await dec.simple(el.subsection.subsection, [sub.ord.order, entry.max], el.subsection))
        })

        describe('Мониторинг', () => {
            it('Отображение раздела "Мониторинг"', async () =>  await dec.simple(el.section.section, [sec.mon, entry.max], el.section))
            it('Нажатие "Мониторинг"', async () =>  await dec.simple(el.section.handler, [sec.mon, entry.max], el.section))
            it('Раздел "Мониторинг', async () =>  await dec.simple(el.section.active, [sec.mon, entry.max], el.section))
            it('Отображение "Интерактивный план"', async () => await dec.simple(el.subsection.subsection, [sub.mon.plan, entry.max], el.subsection))
        })

        describe('Администрирование', () => {
            it('Отображение раздела "Администрирование"', async () =>  await dec.simple(el.section.section, [sec.adm, entry.max], el.section))
            it('Нажатие "Администрирование"', async () =>  await dec.simple(el.section.handler, [sec.adm, entry.max], el.section))
            it('Раздел "Администрирование" активен', async () =>  await dec.simple(el.section.active, [sec.adm, entry.max], el.section))
            it('Отображение "Конфигурация"', async () => await dec.simple(el.subsection.subsection, [sub.adm.conf, entry.max], el.subsection))
            it('Отображение "События системы"', async () => await dec.simple(el.subsection.subsection, [sub.adm.event, entry.max], el.subsection))
            it('Отображение "Реакции на события"', async () => await dec.simple(el.subsection.subsection, [sub.adm.action, entry.max], el.subsection))
            it('Отображение "Задания"', async () => await dec.simple(el.subsection.subsection, [sub.adm.task, entry.max], el.subsection))
            it('Отображение "Роли и права операторов"', async () => await dec.simple(el.subsection.subsection, [sub.adm.role, entry.max], el.subsection))
            it('Отображение "Лицензии"', async () => await dec.simple(el.subsection.subsection, [sub.adm.license, entry.max], el.subsection))
        })

        describe('Документация', () => {
            it('Отображение раздела "Документация"', async () =>  await dec.simple(el.section.section, [sec.doc, entry.max], el.section))
            it('Нажатие "Документация"', async () =>  await dec.simple(el.section.handler, [sec.doc, entry.max], el.section))
            it('Раздел "Документация" активен', async () =>  await dec.simple(el.section.active, [sec.doc, entry.max], el.section))
            it('Отображение "SDK"', async () => await dec.simple(el.subsection.subsection, [sub.doc.sdk, entry.max], el.subsection))
        })

    })

    describe('Интеграция с ИСО "ОРИОН" (НВП "Болид")', () => {

        before('Вход и открытие подраздела "Лицензии"', async () => {
            await dec.auth(entry.customLogin, entry.customPassword)
            await dec.simple(el.section.handler, [sec.adm, entry.max], el.section)
            await dec.simple(el.subsection.handler, [sub.adm.license, entry.max], el.subsection)
            await dec.simple(page.license.init, [entry.max], page.license)
        })

        after('Выход', async () => await dec.exit())

        describe('Активация', () => {
            it('Нажатие кнопки включения', async () => await dec.simple(page.license.switch, [lic.orion, entry.max], page.license))
            it('Проверка информации', async () => await dec.simple(page.license.info, [lic.orion, params, entry.max], page.license))
        })

        describe('Персонал', () => {
            it('Отображение раздела "Персонал"', async () =>  await dec.simple(el.section.section, [sec.per, entry.max], el.section))
            it('Нажатие "Прсонал"', async () =>  await dec.simple(el.section.handler, [sec.per, entry.max], el.section))
            it('Раздел "Персонал" активен', async () =>  await dec.simple(el.section.active, [sec.per, entry.max], el.section))
            it('Отображение "Сотрудники"', async () => await dec.simple(el.subsection.subsection, [sub.per.staff, entry.max], el.subsection))
            it('Отображение "Подразделения"', async () => await dec.simple(el.subsection.subsection, [sub.per.division, entry.max], el.subsection))
            it('Отображение "Должности"', async () => await dec.simple(el.subsection.subsection, [sub.per.position, entry.max], el.subsection))
            it('Отображение "Праздничные дни"', async () => await dec.simple(el.subsection.subsection, [sub.per.holiday, entry.max], el.subsection))
            it('Отображение "Дополнительные данные"', async () => dec.simple(el.subsection.subsection, [sub.per.data, entry.max], el.subsection))
            it('Отображение "Графики работы"', async () => await dec.simple(el.subsection.subsection, [sub.per.schedule, entry.max], el.subsection))

        })

        describe('Бюро пропусков', () => {
            it('Отображение раздела "Бюро пропусков"', async () =>  await dec.simple(el.section.section, [sec.pas, entry.max], el.section))
            it('Нажатие "Бюро пропусков"', async () =>  await dec.simple(el.section.handler, [sec.pas, entry.max], el.section))
            it('Раздел "Бюро пропусков" активен', async () =>  await dec.simple(el.section.active, [sec.pas, entry.max], el.section))
            it('Отображение "Сотрудники"', async () => await dec.simple(el.subsection.subsection, [sub.pas.staff, entry.max], el.subsection))
            it('Отображение "Шаблоны доступа"', async () => await dec.simple(el.subsection.subsection, [sub.pas.template, entry.max], el.subsection))
            it('Отображение "Посетители"', async () => dec.simple(el.subsection.subsection, [sub.pas.visitor, entry.max], el.subsection))
            it('Отображение "Дизайн пропуска"', async () => dec.simple(el.subsection.subsection, [sub.pas.design, entry.max], el.subsection))
            it('Отображение "Отчет по посетителям"', async () => dec.simple(el.subsection.subsection, [sub.pas.report, entry.max], el.subsection))
        })

        describe('Учёт рабочего времени', () => {
            it('Отображение раздела "Учёт рабочего времени"', async () =>  await dec.simple(el.section.section, [sec.urv, entry.max], el.section))
            it('Нажатие "Учёт рабочего времени"', async () =>  await dec.simple(el.section.handler, [sec.urv, entry.max], el.section))
            it('Раздел "Учёт рабочего времени" активен', async () =>  await dec.simple(el.section.active, [sec.urv, entry.max], el.section))
            it('Отображение "Журнал отработанного времени"', async () => await dec.simple(el.subsection.subsection, [sub.urv.journal, entry.max], el.subsection))
            it('Отображение "Оправдательные документы"', async () => await dec.simple(el.subsection.subsection, [sub.urv.document, entry.max], el.subsection))
            it('Отображение "Формирование табеля"', async () => await dec.simple(el.subsection.subsection, [sub.urv.tabel, entry.max], el.subsection))
            it('Отображение "Отчеты по дисциплине"', async () => await dec.simple(el.subsection.subsection, [sub.urv.violator, entry.max], el.subsection))
            it('Отображение "Отчёт УРВ"', async () => await dec.simple(el.subsection.subsection, [sub.urv.report, entry.max], el.subsection))
            it('Отображение "Время присутствия"', async () => await dec.simple(el.subsection.subsection, [sub.urv.presence, entry.max], el.subsection))
            it('Отображение "Выданные документы"', async () => await dec.simple(el.subsection.subsection, [sub.urv.support, entry.max], el.subsection))
        })

        describe('Контроль доступа', () => {
            it('Отображение раздела "Контроль доступа"', async () =>  await dec.simple(el.section.section, [sec.con, entry.max], el.section))
            it('Нажатие "Контроль доступа"', async () =>  await dec.simple(el.section.handler, [sec.con, entry.max], el.section))
            it('Раздел "Контроль доступа" активен', async () =>  await dec.simple(el.section.active, [sec.con, entry.max], el.section))
            it('Отображение "Управление устройствами"', async () => await dec.simple(el.subsection.subsection, [sub.con.device, entry.max], el.subsection))
            it('Отображение "Отчет о проходах"', async () => dec.simple(el.subsection.subsection, [sub.con.premises, entry.max], el.subsection))
            it('Отображение "Журнал верификации"', async () => dec.simple(el.subsection.subsection, [sub.con.verif, entry.max], el.subsection))
            it('Отображение "Отчет по доступу в помещения"', async () => dec.simple(el.subsection.subsection, [sub.con.room, entry.max], el.subsection))
            it('Отображение "Местонахождение"', async () => dec.simple(el.subsection.subsection, [sub.con.location, entry.max], el.subsection))
            it('Отображение "Выданные идентификаторы"', async () => dec.simple(el.subsection.subsection, [sub.con.card, entry.max], el.subsection))
        })

        describe('Верификация', () => {
            it('Отображение раздела "Верификация"', async () =>  await dec.simple(el.section.section, [sec.ver, entry.max], el.section))
            it('Нажатие "Верификация"', async () =>  await dec.simple(el.section.handler, [sec.ver, entry.max], el.section))
            it('Раздел "Верификация', async () =>  await dec.simple(el.section.active, [sec.ver, entry.max], el.section))
            it('Отображение "Верификация"', async () => await dec.simple(el.subsection.subsection, [sub.ver.verif, entry.max], el.subsection))
            it('Отображение "Конфигурация верификации"', async () => await dec.simple(el.subsection.subsection, [sub.ver.config, entry.max], el.subsection))
        })

        describe('Заказ пропуска', () => {
            it('Отображение раздела "Заказ пропуска"', async () =>  await dec.simple(el.section.section, [sec.ord, entry.max], el.section))
            it('Нажатие "Заказ пропуска"', async () =>  await dec.simple(el.section.handler, [sec.ord, entry.max], el.section))
            it('Раздел "Заказ пропуска" активен', async () =>  await dec.simple(el.section.active, [sec.ord, entry.max], el.section))
            it('Отображение "Заказ пропуска"', async () => await dec.simple(el.subsection.subsection, [sub.ord.order, entry.max], el.subsection))
        })

        describe('Мониторинг', () => {
            it('Отображение раздела "Мониторинг"', async () =>  await dec.simple(el.section.section, [sec.mon, entry.max], el.section))
            it('Нажатие "Мониторинг"', async () =>  await dec.simple(el.section.handler, [sec.mon, entry.max], el.section))
            it('Раздел "Мониторинг', async () =>  await dec.simple(el.section.active, [sec.mon, entry.max], el.section))
            it('Отображение "Интерактивный план"', async () => await dec.simple(el.subsection.subsection, [sub.mon.plan, entry.max], el.subsection))
        })

        describe('Администрирование', () => {
            it('Отображение раздела "Администрирование"', async () =>  await dec.simple(el.section.section, [sec.adm, entry.max], el.section))
            it('Нажатие "Администрирование"', async () =>  await dec.simple(el.section.handler, [sec.adm, entry.max], el.section))
            it('Раздел "Администрирование" активен', async () =>  await dec.simple(el.section.active, [sec.adm, entry.max], el.section))
            it('Отображение "Конфигурация"', async () => await dec.simple(el.subsection.subsection, [sub.adm.conf, entry.max], el.subsection))
            it('Отображение "События системы"', async () => await dec.simple(el.subsection.subsection, [sub.adm.event, entry.max], el.subsection))
            it('Отображение "Реакции на события"', async () => await dec.simple(el.subsection.subsection, [sub.adm.action, entry.max], el.subsection))
            it('Отображение "Задания"', async () => await dec.simple(el.subsection.subsection, [sub.adm.task, entry.max], el.subsection))
            it('Отображение "Роли и права операторов"', async () => await dec.simple(el.subsection.subsection, [sub.adm.role, entry.max], el.subsection))
            it('Отображение "Лицензии"', async () => await dec.simple(el.subsection.subsection, [sub.adm.license, entry.max], el.subsection))
        })

        describe('Документация', () => {
            it('Отображение раздела "Документация"', async () =>  await dec.simple(el.section.section, [sec.doc, entry.max], el.section))
            it('Нажатие "Документация"', async () =>  await dec.simple(el.section.handler, [sec.doc, entry.max], el.section))
            it('Раздел "Документация" активен', async () =>  await dec.simple(el.section.active, [sec.doc, entry.max], el.section))
            it('Отображение "SDK"', async () => await dec.simple(el.subsection.subsection, [sub.doc.sdk, entry.max], el.subsection))
        })

    })

    describe('Интеграция с Axxon Next', () => {

        before('Вход и открытие подраздела "Лицензии"', async () => {
            await dec.auth(entry.customLogin, entry.customPassword)
            await dec.simple(el.section.handler, [sec.adm, entry.max], el.section)
            await dec.simple(el.subsection.handler, [sub.adm.license, entry.max], el.subsection)
            await dec.simple(page.license.init, [entry.max], page.license)
        })

        after('Выход', async () => await dec.exit())

        describe('Активация', () => {
            it('Нажатие кнопки включения', async () => await dec.simple(page.license.switch, [lic.axxon, entry.max], page.license))
            it('Проверка информации', async () => await dec.simple(page.license.info, [lic.axxon, params, entry.max], page.license))
        })

        describe('Персонал', () => {
            it('Отображение раздела "Персонал"', async () =>  await dec.simple(el.section.section, [sec.per, entry.max], el.section))
            it('Нажатие "Прсонал"', async () =>  await dec.simple(el.section.handler, [sec.per, entry.max], el.section))
            it('Раздел "Персонал" активен', async () =>  await dec.simple(el.section.active, [sec.per, entry.max], el.section))
            it('Отображение "Сотрудники"', async () => await dec.simple(el.subsection.subsection, [sub.per.staff, entry.max], el.subsection))
            it('Отображение "Подразделения"', async () => await dec.simple(el.subsection.subsection, [sub.per.division, entry.max], el.subsection))
            it('Отображение "Должности"', async () => await dec.simple(el.subsection.subsection, [sub.per.position, entry.max], el.subsection))
            it('Отображение "Праздничные дни"', async () => await dec.simple(el.subsection.subsection, [sub.per.holiday, entry.max], el.subsection))
            it('Отображение "Дополнительные данные"', async () => dec.simple(el.subsection.subsection, [sub.per.data, entry.max], el.subsection))
            it('Отображение "Графики работы"', async () => await dec.simple(el.subsection.subsection, [sub.per.schedule, entry.max], el.subsection))

        })

        describe('Бюро пропусков', () => {
            it('Отображение раздела "Бюро пропусков"', async () =>  await dec.simple(el.section.section, [sec.pas, entry.max], el.section))
            it('Нажатие "Бюро пропусков"', async () =>  await dec.simple(el.section.handler, [sec.pas, entry.max], el.section))
            it('Раздел "Бюро пропусков" активен', async () =>  await dec.simple(el.section.active, [sec.pas, entry.max], el.section))
            it('Отображение "Сотрудники"', async () => await dec.simple(el.subsection.subsection, [sub.pas.staff, entry.max], el.subsection))
            it('Отображение "Шаблоны доступа"', async () => await dec.simple(el.subsection.subsection, [sub.pas.template, entry.max], el.subsection))
            it('Отображение "Посетители"', async () => dec.simple(el.subsection.subsection, [sub.pas.visitor, entry.max], el.subsection))
            it('Отображение "Дизайн пропуска"', async () => dec.simple(el.subsection.subsection, [sub.pas.design, entry.max], el.subsection))
            it('Отображение "Отчет по посетителям"', async () => dec.simple(el.subsection.subsection, [sub.pas.report, entry.max], el.subsection))
        })

        describe('Учёт рабочего времени', () => {
            it('Отображение раздела "Учёт рабочего времени"', async () =>  await dec.simple(el.section.section, [sec.urv, entry.max], el.section))
            it('Нажатие "Учёт рабочего времени"', async () =>  await dec.simple(el.section.handler, [sec.urv, entry.max], el.section))
            it('Раздел "Учёт рабочего времени" активен', async () =>  await dec.simple(el.section.active, [sec.urv, entry.max], el.section))
            it('Отображение "Журнал отработанного времени"', async () => await dec.simple(el.subsection.subsection, [sub.urv.journal, entry.max], el.subsection))
            it('Отображение "Оправдательные документы"', async () => await dec.simple(el.subsection.subsection, [sub.urv.document, entry.max], el.subsection))
            it('Отображение "Формирование табеля"', async () => await dec.simple(el.subsection.subsection, [sub.urv.tabel, entry.max], el.subsection))
            it('Отображение "Отчеты по дисциплине"', async () => await dec.simple(el.subsection.subsection, [sub.urv.violator, entry.max], el.subsection))
            it('Отображение "Отчёт УРВ"', async () => await dec.simple(el.subsection.subsection, [sub.urv.report, entry.max], el.subsection))
            it('Отображение "Время присутствия"', async () => await dec.simple(el.subsection.subsection, [sub.urv.presence, entry.max], el.subsection))
            it('Отображение "Выданные документы"', async () => await dec.simple(el.subsection.subsection, [sub.urv.support, entry.max], el.subsection))
        })

        describe('Контроль доступа', () => {
            it('Отображение раздела "Контроль доступа"', async () =>  await dec.simple(el.section.section, [sec.con, entry.max], el.section))
            it('Нажатие "Контроль доступа"', async () =>  await dec.simple(el.section.handler, [sec.con, entry.max], el.section))
            it('Раздел "Контроль доступа" активен', async () =>  await dec.simple(el.section.active, [sec.con, entry.max], el.section))
            it('Отображение "Управление устройствами"', async () => await dec.simple(el.subsection.subsection, [sub.con.device, entry.max], el.subsection))
            it('Отображение "Отчет о проходах"', async () => dec.simple(el.subsection.subsection, [sub.con.premises, entry.max], el.subsection))
            it('Отображение "Журнал верификации"', async () => dec.simple(el.subsection.subsection, [sub.con.verif, entry.max], el.subsection))
            it('Отображение "Отчет по доступу в помещения"', async () => dec.simple(el.subsection.subsection, [sub.con.room, entry.max], el.subsection))
            it('Отображение "Местонахождение"', async () => dec.simple(el.subsection.subsection, [sub.con.location, entry.max], el.subsection))
            it('Отображение "Выданные идентификаторы"', async () => dec.simple(el.subsection.subsection, [sub.con.card, entry.max], el.subsection))
        })

        describe('Верификация', () => {
            it('Отображение раздела "Верификация"', async () =>  await dec.simple(el.section.section, [sec.ver, entry.max], el.section))
            it('Нажатие "Верификация"', async () =>  await dec.simple(el.section.handler, [sec.ver, entry.max], el.section))
            it('Раздел "Верификация', async () =>  await dec.simple(el.section.active, [sec.ver, entry.max], el.section))
            it('Отображение "Верификация"', async () => await dec.simple(el.subsection.subsection, [sub.ver.verif, entry.max], el.subsection))
            it('Отображение "Конфигурация верификации"', async () => await dec.simple(el.subsection.subsection, [sub.ver.config, entry.max], el.subsection))
        })

        describe('Заказ пропуска', () => {
            it('Отображение раздела "Заказ пропуска"', async () =>  await dec.simple(el.section.section, [sec.ord, entry.max], el.section))
            it('Нажатие "Заказ пропуска"', async () =>  await dec.simple(el.section.handler, [sec.ord, entry.max], el.section))
            it('Раздел "Заказ пропуска" активен', async () =>  await dec.simple(el.section.active, [sec.ord, entry.max], el.section))
            it('Отображение "Заказ пропуска"', async () => await dec.simple(el.subsection.subsection, [sub.ord.order, entry.max], el.subsection))
        })

        describe('Мониторинг', () => {
            it('Отображение раздела "Мониторинг"', async () =>  await dec.simple(el.section.section, [sec.mon, entry.max], el.section))
            it('Нажатие "Мониторинг"', async () =>  await dec.simple(el.section.handler, [sec.mon, entry.max], el.section))
            it('Раздел "Мониторинг', async () =>  await dec.simple(el.section.active, [sec.mon, entry.max], el.section))
            it('Отображение "Интерактивный план"', async () => await dec.simple(el.subsection.subsection, [sub.mon.plan, entry.max], el.subsection))
        })

        describe('Администрирование', () => {
            it('Отображение раздела "Администрирование"', async () =>  await dec.simple(el.section.section, [sec.adm, entry.max], el.section))
            it('Нажатие "Администрирование"', async () =>  await dec.simple(el.section.handler, [sec.adm, entry.max], el.section))
            it('Раздел "Администрирование" активен', async () =>  await dec.simple(el.section.active, [sec.adm, entry.max], el.section))
            it('Отображение "Конфигурация"', async () => await dec.simple(el.subsection.subsection, [sub.adm.conf, entry.max], el.subsection))
            it('Отображение "События системы"', async () => await dec.simple(el.subsection.subsection, [sub.adm.event, entry.max], el.subsection))
            it('Отображение "Реакции на события"', async () => await dec.simple(el.subsection.subsection, [sub.adm.action, entry.max], el.subsection))
            it('Отображение "Задания"', async () => await dec.simple(el.subsection.subsection, [sub.adm.task, entry.max], el.subsection))
            it('Отображение "Роли и права операторов"', async () => await dec.simple(el.subsection.subsection, [sub.adm.role, entry.max], el.subsection))
            it('Отображение "Лицензии"', async () => await dec.simple(el.subsection.subsection, [sub.adm.license, entry.max], el.subsection))
        })

        describe('Документация', () => {
            it('Отображение раздела "Документация"', async () =>  await dec.simple(el.section.section, [sec.doc, entry.max], el.section))
            it('Нажатие "Документация"', async () =>  await dec.simple(el.section.handler, [sec.doc, entry.max], el.section))
            it('Раздел "Документация" активен', async () =>  await dec.simple(el.section.active, [sec.doc, entry.max], el.section))
            it('Отображение "SDK"', async () => await dec.simple(el.subsection.subsection, [sub.doc.sdk, entry.max], el.subsection))
        })

    })

})

describe('Проверка подраздела "Лицензии". Поочередная деактивация всех лицензий, отображение и отсутствие информации, разделов и подразделов.', () => {

    describe('Интеграция с Axxon Next', () => {

        before('Вход и открытие подраздела "Лицензии"', async () => {
            await dec.auth(entry.customLogin, entry.customPassword)
            await dec.simple(el.section.handler, [sec.adm, entry.max], el.section)
            await dec.simple(el.subsection.handler, [sub.adm.license, entry.max], el.subsection)
            await dec.simple(page.license.init, [entry.max], page.license)
        })

        after('Выход', async () => await dec.exit())

        describe('Деактивация', () => {
            it('Нажатие кнопки выключения', async () => await dec.simple(page.license.switch, [lic.axxon, entry.max], page.license))
            it('Проверка информации', async () => await dec.simple(page.license.disabled, [lic.axxon, entry.max], page.license))
        })

        describe('Персонал', () => {
            it('Отображение раздела "Персонал"', async () =>  await dec.simple(el.section.section, [sec.per, entry.max], el.section))
            it('Нажатие "Персонал"', async () =>  await dec.simple(el.section.handler, [sec.per, entry.max], el.section))
            it('Раздел "Персонал" активен', async () =>  await dec.simple(el.section.active, [sec.per, entry.max], el.section))
            it('Отображение "Сотрудники"', async () => await dec.simple(el.subsection.subsection, [sub.per.staff, entry.max], el.subsection))
            it('Отображение "Подразделения"', async () => await dec.simple(el.subsection.subsection, [sub.per.division, entry.max], el.subsection))
            it('Отображение "Должности"', async () => await dec.simple(el.subsection.subsection, [sub.per.position, entry.max], el.subsection))
            it('Отображение "Праздничные дни"', async () => await dec.simple(el.subsection.subsection, [sub.per.holiday, entry.max], el.subsection))
            it('Отображение "Дополнительные данные"', async () => dec.simple(el.subsection.subsection, [sub.per.data, entry.max], el.subsection))
            it('Отображение "Графики работы"', async () => await dec.simple(el.subsection.subsection, [sub.per.schedule, entry.max], el.subsection))

        })

        describe('Бюро пропусков', () => {
            it('Отображение раздела "Бюро пропусков"', async () =>  await dec.simple(el.section.section, [sec.pas, entry.max], el.section))
            it('Нажатие "Бюро пропусков"', async () =>  await dec.simple(el.section.handler, [sec.pas, entry.max], el.section))
            it('Раздел "Бюро пропусков" активен', async () =>  await dec.simple(el.section.active, [sec.pas, entry.max], el.section))
            it('Отображение "Сотрудники"', async () => await dec.simple(el.subsection.subsection, [sub.pas.staff, entry.max], el.subsection))
            it('Отображение "Шаблоны доступа"', async () => await dec.simple(el.subsection.subsection, [sub.pas.template, entry.max], el.subsection))
            it('Отображение "Посетители"', async () => dec.simple(el.subsection.subsection, [sub.pas.visitor, entry.max], el.subsection))
            it('Отображение "Дизайн пропуска"', async () => dec.simple(el.subsection.subsection, [sub.pas.design, entry.max], el.subsection))
            it('Отображение "Отчет по посетителям"', async () => dec.simple(el.subsection.subsection, [sub.pas.report, entry.max], el.subsection))
        })

        describe('Учёт рабочего времени', () => {
            it('Отображение раздела "Учёт рабочего времени"', async () =>  await dec.simple(el.section.section, [sec.urv, entry.max], el.section))
            it('Нажатие "Учёт рабочего времени"', async () =>  await dec.simple(el.section.handler, [sec.urv, entry.max], el.section))
            it('Раздел "Учёт рабочего времени" активен', async () =>  await dec.simple(el.section.active, [sec.urv, entry.max], el.section))
            it('Отображение "Журнал отработанного времени"', async () => await dec.simple(el.subsection.subsection, [sub.urv.journal, entry.max], el.subsection))
            it('Отображение "Оправдательные документы"', async () => await dec.simple(el.subsection.subsection, [sub.urv.document, entry.max], el.subsection))
            it('Отображение "Формирование табеля"', async () => await dec.simple(el.subsection.subsection, [sub.urv.tabel, entry.max], el.subsection))
            it('Отображение "Отчеты по дисциплине"', async () => await dec.simple(el.subsection.subsection, [sub.urv.violator, entry.max], el.subsection))
            it('Отображение "Отчёт УРВ"', async () => await dec.simple(el.subsection.subsection, [sub.urv.report, entry.max], el.subsection))
            it('Отображение "Время присутствия"', async () => await dec.simple(el.subsection.subsection, [sub.urv.presence, entry.max], el.subsection))
            it('Отображение "Выданные документы"', async () => await dec.simple(el.subsection.subsection, [sub.urv.support, entry.max], el.subsection))
        })

        describe('Контроль доступа', () => {
            it('Отображение раздела "Контроль доступа"', async () =>  await dec.simple(el.section.section, [sec.con, entry.max], el.section))
            it('Нажатие "Контроль доступа"', async () =>  await dec.simple(el.section.handler, [sec.con, entry.max], el.section))
            it('Раздел "Контроль доступа" активен', async () =>  await dec.simple(el.section.active, [sec.con, entry.max], el.section))
            it('Отображение "Управление устройствами"', async () => await dec.simple(el.subsection.subsection, [sub.con.device, entry.max], el.subsection))
            it('Отображение "Отчет о проходах"', async () => dec.simple(el.subsection.subsection, [sub.con.premises, entry.max], el.subsection))
            it('Отображение "Журнал верификации"', async () => dec.simple(el.subsection.subsection, [sub.con.verif, entry.max], el.subsection))
            it('Отображение "Отчет по доступу в помещения"', async () => dec.simple(el.subsection.subsection, [sub.con.room, entry.max], el.subsection))
            it('Отображение "Местонахождение"', async () => dec.simple(el.subsection.subsection, [sub.con.location, entry.max], el.subsection))
            it('Отображение "Выданные идентификаторы"', async () => dec.simple(el.subsection.subsection, [sub.con.card, entry.max], el.subsection))
        })

        describe('Верификация', () => {
            it('Отображение раздела "Верификация"', async () =>  await dec.simple(el.section.section, [sec.ver, entry.max], el.section))
            it('Нажатие "Верификация"', async () =>  await dec.simple(el.section.handler, [sec.ver, entry.max], el.section))
            it('Раздел "Верификация', async () =>  await dec.simple(el.section.active, [sec.ver, entry.max], el.section))
            it('Отображение "Верификация"', async () => await dec.simple(el.subsection.subsection, [sub.ver.verif, entry.max], el.subsection))
            it('Отображение "Конфигурация верификации"', async () => await dec.simple(el.subsection.subsection, [sub.ver.config, entry.max], el.subsection))
        })

        describe('Заказ пропуска', () => {
            it('Отображение раздела "Заказ пропуска"', async () =>  await dec.simple(el.section.section, [sec.ord, entry.max], el.section))
            it('Нажатие "Заказ пропуска"', async () =>  await dec.simple(el.section.handler, [sec.ord, entry.max], el.section))
            it('Раздел "Заказ пропуска" активен', async () =>  await dec.simple(el.section.active, [sec.ord, entry.max], el.section))
            it('Отображение "Заказ пропуска"', async () => await dec.simple(el.subsection.subsection, [sub.ord.order, entry.max], el.subsection))
        })

        describe('Мониторинг', () => {
            it('Отображение раздела "Мониторинг"', async () =>  await dec.simple(el.section.section, [sec.mon, entry.max], el.section))
            it('Нажатие "Мониторинг"', async () =>  await dec.simple(el.section.handler, [sec.mon, entry.max], el.section))
            it('Раздел "Мониторинг', async () =>  await dec.simple(el.section.active, [sec.mon, entry.max], el.section))
            it('Отображение "Интерактивный план"', async () => await dec.simple(el.subsection.subsection, [sub.mon.plan, entry.max], el.subsection))
        })

        describe('Администрирование', () => {
            it('Отображение раздела "Администрирование"', async () =>  await dec.simple(el.section.section, [sec.adm, entry.max], el.section))
            it('Нажатие "Администрирование"', async () =>  await dec.simple(el.section.handler, [sec.adm, entry.max], el.section))
            it('Раздел "Администрирование" активен', async () =>  await dec.simple(el.section.active, [sec.adm, entry.max], el.section))
            it('Отображение "Конфигурация"', async () => await dec.simple(el.subsection.subsection, [sub.adm.conf, entry.max], el.subsection))
            it('Отображение "События системы"', async () => await dec.simple(el.subsection.subsection, [sub.adm.event, entry.max], el.subsection))
            it('Отображение "Реакции на события"', async () => await dec.simple(el.subsection.subsection, [sub.adm.action, entry.max], el.subsection))
            it('Отображение "Задания"', async () => await dec.simple(el.subsection.subsection, [sub.adm.task, entry.max], el.subsection))
            it('Отображение "Роли и права операторов"', async () => await dec.simple(el.subsection.subsection, [sub.adm.role, entry.max], el.subsection))
            it('Отображение "Лицензии"', async () => await dec.simple(el.subsection.subsection, [sub.adm.license, entry.max], el.subsection))
        })

        describe('Документация', () => {
            it('Отображение раздела "Документация"', async () =>  await dec.simple(el.section.section, [sec.doc, entry.max], el.section))
            it('Нажатие "Документация"', async () =>  await dec.simple(el.section.handler, [sec.doc, entry.max], el.section))
            it('Раздел "Документация" активен', async () =>  await dec.simple(el.section.active, [sec.doc, entry.max], el.section))
            it('Отображение "SDK"', async () => await dec.simple(el.subsection.subsection, [sub.doc.sdk, entry.max], el.subsection))
        })

    })

    describe('Интеграция с ИСО "ОРИОН" (НВП "Болид")', () => {

        before('Вход и открытие подраздела "Лицензии"', async () => {
            await dec.auth(entry.customLogin, entry.customPassword)
            await dec.simple(el.section.handler, [sec.adm, entry.max], el.section)
            await dec.simple(el.subsection.handler, [sub.adm.license, entry.max], el.subsection)
            await dec.simple(page.license.init, [entry.max], page.license)
        })

        after('Выход', async () => await dec.exit())

        describe('Деактивация', () => {
            it('Нажатие кнопки выключения', async () => await dec.simple(page.license.switch, [lic.orion, entry.max], page.license))
            it('Проверка информации', async () => await dec.simple(page.license.disabled, [lic.orion, entry.max], page.license))
        })

        describe('Персонал', () => {
            it('Отображение раздела "Персонал"', async () =>  await dec.simple(el.section.section, [sec.per, entry.max], el.section))
            it('Нажатие "Прсонал"', async () =>  await dec.simple(el.section.handler, [sec.per, entry.max], el.section))
            it('Раздел "Персонал" активен', async () =>  await dec.simple(el.section.active, [sec.per, entry.max], el.section))
            it('Отображение "Сотрудники"', async () => await dec.simple(el.subsection.subsection, [sub.per.staff, entry.max], el.subsection))
            it('Отображение "Подразделения"', async () => await dec.simple(el.subsection.subsection, [sub.per.division, entry.max], el.subsection))
            it('Отображение "Должности"', async () => await dec.simple(el.subsection.subsection, [sub.per.position, entry.max], el.subsection))
            it('Отображение "Праздничные дни"', async () => await dec.simple(el.subsection.subsection, [sub.per.holiday, entry.max], el.subsection))
            it('Отображение "Дополнительные данные"', async () => dec.simple(el.subsection.subsection, [sub.per.data, entry.max], el.subsection))
            it('Отображение "Графики работы"', async () => await dec.simple(el.subsection.subsection, [sub.per.schedule, entry.max], el.subsection))

        })

        describe('Бюро пропусков', () => {
            it('Отображение раздела "Бюро пропусков"', async () =>  await dec.simple(el.section.section, [sec.pas, entry.max], el.section))
            it('Нажатие "Бюро пропусков"', async () =>  await dec.simple(el.section.handler, [sec.pas, entry.max], el.section))
            it('Раздел "Бюро пропусков" активен', async () =>  await dec.simple(el.section.active, [sec.pas, entry.max], el.section))
            it('Отображение "Сотрудники"', async () => await dec.simple(el.subsection.subsection, [sub.pas.staff, entry.max], el.subsection))
            it('Отображение "Шаблоны доступа"', async () => await dec.simple(el.subsection.subsection, [sub.pas.template, entry.max], el.subsection))
            it('Отображение "Посетители"', async () => dec.simple(el.subsection.subsection, [sub.pas.visitor, entry.max], el.subsection))
            it('Отображение "Дизайн пропуска"', async () => dec.simple(el.subsection.subsection, [sub.pas.design, entry.max], el.subsection))
            it('Отображение "Отчет по посетителям"', async () => dec.simple(el.subsection.subsection, [sub.pas.report, entry.max], el.subsection))
        })

        describe('Учёт рабочего времени', () => {
            it('Отображение раздела "Учёт рабочего времени"', async () =>  await dec.simple(el.section.section, [sec.urv, entry.max], el.section))
            it('Нажатие "Учёт рабочего времени"', async () =>  await dec.simple(el.section.handler, [sec.urv, entry.max], el.section))
            it('Раздел "Учёт рабочего времени" активен', async () =>  await dec.simple(el.section.active, [sec.urv, entry.max], el.section))
            it('Отображение "Журнал отработанного времени"', async () => await dec.simple(el.subsection.subsection, [sub.urv.journal, entry.max], el.subsection))
            it('Отображение "Оправдательные документы"', async () => await dec.simple(el.subsection.subsection, [sub.urv.document, entry.max], el.subsection))
            it('Отображение "Формирование табеля"', async () => await dec.simple(el.subsection.subsection, [sub.urv.tabel, entry.max], el.subsection))
            it('Отображение "Отчеты по дисциплине"', async () => await dec.simple(el.subsection.subsection, [sub.urv.violator, entry.max], el.subsection))
            it('Отображение "Отчёт УРВ"', async () => await dec.simple(el.subsection.subsection, [sub.urv.report, entry.max], el.subsection))
            it('Отображение "Время присутствия"', async () => await dec.simple(el.subsection.subsection, [sub.urv.presence, entry.max], el.subsection))
            it('Отображение "Выданные документы"', async () => await dec.simple(el.subsection.subsection, [sub.urv.support, entry.max], el.subsection))
        })

        describe('Контроль доступа', () => {
            it('Отображение раздела "Контроль доступа"', async () =>  await dec.simple(el.section.section, [sec.con, entry.max], el.section))
            it('Нажатие "Контроль доступа"', async () =>  await dec.simple(el.section.handler, [sec.con, entry.max], el.section))
            it('Раздел "Контроль доступа" активен', async () =>  await dec.simple(el.section.active, [sec.con, entry.max], el.section))
            it('Отображение "Управление устройствами"', async () => await dec.simple(el.subsection.subsection, [sub.con.device, entry.max], el.subsection))
            it('Отображение "Отчет о проходах"', async () => dec.simple(el.subsection.subsection, [sub.con.premises, entry.max], el.subsection))
            it('Отображение "Журнал верификации"', async () => dec.simple(el.subsection.subsection, [sub.con.verif, entry.max], el.subsection))
            it('Отображение "Отчет по доступу в помещения"', async () => dec.simple(el.subsection.subsection, [sub.con.room, entry.max], el.subsection))
            it('Отображение "Местонахождение"', async () => dec.simple(el.subsection.subsection, [sub.con.location, entry.max], el.subsection))
            it('Отображение "Выданные идентификаторы"', async () => dec.simple(el.subsection.subsection, [sub.con.card, entry.max], el.subsection))
        })

        describe('Верификация', () => {
            it('Отображение раздела "Верификация"', async () =>  await dec.simple(el.section.section, [sec.ver, entry.max], el.section))
            it('Нажатие "Верификация"', async () =>  await dec.simple(el.section.handler, [sec.ver, entry.max], el.section))
            it('Раздел "Верификация', async () =>  await dec.simple(el.section.active, [sec.ver, entry.max], el.section))
            it('Отображение "Верификация"', async () => await dec.simple(el.subsection.subsection, [sub.ver.verif, entry.max], el.subsection))
            it('Отображение "Конфигурация верификации"', async () => await dec.simple(el.subsection.subsection, [sub.ver.config, entry.max], el.subsection))
        })

        describe('Заказ пропуска', () => {
            it('Отображение раздела "Заказ пропуска"', async () =>  await dec.simple(el.section.section, [sec.ord, entry.max], el.section))
            it('Нажатие "Заказ пропуска"', async () =>  await dec.simple(el.section.handler, [sec.ord, entry.max], el.section))
            it('Раздел "Заказ пропуска" активен', async () =>  await dec.simple(el.section.active, [sec.ord, entry.max], el.section))
            it('Отображение "Заказ пропуска"', async () => await dec.simple(el.subsection.subsection, [sub.ord.order, entry.max], el.subsection))
        })

        describe('Мониторинг', () => {
            it('Отображение раздела "Мониторинг"', async () =>  await dec.simple(el.section.section, [sec.mon, entry.max], el.section))
            it('Нажатие "Мониторинг"', async () =>  await dec.simple(el.section.handler, [sec.mon, entry.max], el.section))
            it('Раздел "Мониторинг', async () =>  await dec.simple(el.section.active, [sec.mon, entry.max], el.section))
            it('Отображение "Интерактивный план"', async () => await dec.simple(el.subsection.subsection, [sub.mon.plan, entry.max], el.subsection))
        })

        describe('Администрирование', () => {
            it('Отображение раздела "Администрирование"', async () =>  await dec.simple(el.section.section, [sec.adm, entry.max], el.section))
            it('Нажатие "Администрирование"', async () =>  await dec.simple(el.section.handler, [sec.adm, entry.max], el.section))
            it('Раздел "Администрирование" активен', async () =>  await dec.simple(el.section.active, [sec.adm, entry.max], el.section))
            it('Отображение "Конфигурация"', async () => await dec.simple(el.subsection.subsection, [sub.adm.conf, entry.max], el.subsection))
            it('Отображение "События системы"', async () => await dec.simple(el.subsection.subsection, [sub.adm.event, entry.max], el.subsection))
            it('Отображение "Реакции на события"', async () => await dec.simple(el.subsection.subsection, [sub.adm.action, entry.max], el.subsection))
            it('Отображение "Задания"', async () => await dec.simple(el.subsection.subsection, [sub.adm.task, entry.max], el.subsection))
            it('Отображение "Роли и права операторов"', async () => await dec.simple(el.subsection.subsection, [sub.adm.role, entry.max], el.subsection))
            it('Отображение "Лицензии"', async () => await dec.simple(el.subsection.subsection, [sub.adm.license, entry.max], el.subsection))
        })

        describe('Документация', () => {
            it('Отображение раздела "Документация"', async () =>  await dec.simple(el.section.section, [sec.doc, entry.max], el.section))
            it('Нажатие "Документация"', async () =>  await dec.simple(el.section.handler, [sec.doc, entry.max], el.section))
            it('Раздел "Документация" активен', async () =>  await dec.simple(el.section.active, [sec.doc, entry.max], el.section))
            it('Отображение "SDK"', async () => await dec.simple(el.subsection.subsection, [sub.doc.sdk, entry.max], el.subsection))
        })

    })

    describe('Интеграция с ИСО "Интеграция с TRASSIR', () => {

        before('Вход и открытие подраздела "Лицензии"', async () => {
            await dec.auth(entry.customLogin, entry.customPassword)
            await dec.simple(el.section.handler, [sec.adm, entry.max], el.section)
            await dec.simple(el.subsection.handler, [sub.adm.license, entry.max], el.subsection)
            await dec.simple(page.license.init, [entry.max], page.license)
        })

        after('Выход', async () => await dec.exit())

        describe('Деактивация', () => {
            it('Нажатие кнопки выключения', async () => await dec.simple(page.license.switch, [lic.trassir, entry.max], page.license))
            it('Проверка информации', async () => await dec.simple(page.license.disabled, [lic.trassir, entry.max], page.license))
        })

        describe('Персонал', () => {
            it('Отображение раздела "Персонал"', async () =>  await dec.simple(el.section.section, [sec.per, entry.max], el.section))
            it('Нажатие "Прсонал"', async () =>  await dec.simple(el.section.handler, [sec.per, entry.max], el.section))
            it('Раздел "Персонал" активен', async () =>  await dec.simple(el.section.active, [sec.per, entry.max], el.section))
            it('Отображение "Сотрудники"', async () => await dec.simple(el.subsection.subsection, [sub.per.staff, entry.max], el.subsection))
            it('Отображение "Подразделения"', async () => await dec.simple(el.subsection.subsection, [sub.per.division, entry.max], el.subsection))
            it('Отображение "Должности"', async () => await dec.simple(el.subsection.subsection, [sub.per.position, entry.max], el.subsection))
            it('Отображение "Праздничные дни"', async () => await dec.simple(el.subsection.subsection, [sub.per.holiday, entry.max], el.subsection))
            it('Отображение "Дополнительные данные"', async () => dec.simple(el.subsection.subsection, [sub.per.data, entry.max], el.subsection))
            it('Отображение "Графики работы"', async () => await dec.simple(el.subsection.subsection, [sub.per.schedule, entry.max], el.subsection))

        })

        describe('Бюро пропусков', () => {
            it('Отображение раздела "Бюро пропусков"', async () =>  await dec.simple(el.section.section, [sec.pas, entry.max], el.section))
            it('Нажатие "Бюро пропусков"', async () =>  await dec.simple(el.section.handler, [sec.pas, entry.max], el.section))
            it('Раздел "Бюро пропусков" активен', async () =>  await dec.simple(el.section.active, [sec.pas, entry.max], el.section))
            it('Отображение "Сотрудники"', async () => await dec.simple(el.subsection.subsection, [sub.pas.staff, entry.max], el.subsection))
            it('Отображение "Шаблоны доступа"', async () => await dec.simple(el.subsection.subsection, [sub.pas.template, entry.max], el.subsection))
            it('Отображение "Посетители"', async () => dec.simple(el.subsection.subsection, [sub.pas.visitor, entry.max], el.subsection))
            it('Отображение "Дизайн пропуска"', async () => dec.simple(el.subsection.subsection, [sub.pas.design, entry.max], el.subsection))
            it('Отображение "Отчет по посетителям"', async () => dec.simple(el.subsection.subsection, [sub.pas.report, entry.max], el.subsection))
        })

        describe('Учёт рабочего времени', () => {
            it('Отображение раздела "Учёт рабочего времени"', async () =>  await dec.simple(el.section.section, [sec.urv, entry.max], el.section))
            it('Нажатие "Учёт рабочего времени"', async () =>  await dec.simple(el.section.handler, [sec.urv, entry.max], el.section))
            it('Раздел "Учёт рабочего времени" активен', async () =>  await dec.simple(el.section.active, [sec.urv, entry.max], el.section))
            it('Отображение "Журнал отработанного времени"', async () => await dec.simple(el.subsection.subsection, [sub.urv.journal, entry.max], el.subsection))
            it('Отображение "Оправдательные документы"', async () => await dec.simple(el.subsection.subsection, [sub.urv.document, entry.max], el.subsection))
            it('Отображение "Формирование табеля"', async () => await dec.simple(el.subsection.subsection, [sub.urv.tabel, entry.max], el.subsection))
            it('Отображение "Отчеты по дисциплине"', async () => await dec.simple(el.subsection.subsection, [sub.urv.violator, entry.max], el.subsection))
            it('Отображение "Отчёт УРВ"', async () => await dec.simple(el.subsection.subsection, [sub.urv.report, entry.max], el.subsection))
            it('Отображение "Время присутствия"', async () => await dec.simple(el.subsection.subsection, [sub.urv.presence, entry.max], el.subsection))
            it('Отображение "Выданные документы"', async () => await dec.simple(el.subsection.subsection, [sub.urv.support, entry.max], el.subsection))
        })

        describe('Контроль доступа', () => {
            it('Отображение раздела "Контроль доступа"', async () =>  await dec.simple(el.section.section, [sec.con, entry.max], el.section))
            it('Нажатие "Контроль доступа"', async () =>  await dec.simple(el.section.handler, [sec.con, entry.max], el.section))
            it('Раздел "Контроль доступа" активен', async () =>  await dec.simple(el.section.active, [sec.con, entry.max], el.section))
            it('Отображение "Управление устройствами"', async () => await dec.simple(el.subsection.subsection, [sub.con.device, entry.max], el.subsection))
            it('Отображение "Отчет о проходах"', async () => dec.simple(el.subsection.subsection, [sub.con.premises, entry.max], el.subsection))
            it('Отображение "Журнал верификации"', async () => dec.simple(el.subsection.subsection, [sub.con.verif, entry.max], el.subsection))
            it('Отображение "Отчет по доступу в помещения"', async () => dec.simple(el.subsection.subsection, [sub.con.room, entry.max], el.subsection))
            it('Отображение "Местонахождение"', async () => dec.simple(el.subsection.subsection, [sub.con.location, entry.max], el.subsection))
            it('Отображение "Выданные идентификаторы"', async () => dec.simple(el.subsection.subsection, [sub.con.card, entry.max], el.subsection))
        })

        describe('Верификация', () => {
            it('Отображение раздела "Верификация"', async () =>  await dec.simple(el.section.section, [sec.ver, entry.max], el.section))
            it('Нажатие "Верификация"', async () =>  await dec.simple(el.section.handler, [sec.ver, entry.max], el.section))
            it('Раздел "Верификация', async () =>  await dec.simple(el.section.active, [sec.ver, entry.max], el.section))
            it('Отображение "Верификация"', async () => await dec.simple(el.subsection.subsection, [sub.ver.verif, entry.max], el.subsection))
            it('Отображение "Конфигурация верификации"', async () => await dec.simple(el.subsection.subsection, [sub.ver.config, entry.max], el.subsection))
        })

        describe('Заказ пропуска', () => {
            it('Отображение раздела "Заказ пропуска"', async () =>  await dec.simple(el.section.section, [sec.ord, entry.max], el.section))
            it('Нажатие "Заказ пропуска"', async () =>  await dec.simple(el.section.handler, [sec.ord, entry.max], el.section))
            it('Раздел "Заказ пропуска" активен', async () =>  await dec.simple(el.section.active, [sec.ord, entry.max], el.section))
            it('Отображение "Заказ пропуска"', async () => await dec.simple(el.subsection.subsection, [sub.ord.order, entry.max], el.subsection))
        })

        describe('Мониторинг', () => {
            it('Отображение раздела "Мониторинг"', async () =>  await dec.simple(el.section.section, [sec.mon, entry.max], el.section))
            it('Нажатие "Мониторинг"', async () =>  await dec.simple(el.section.handler, [sec.mon, entry.max], el.section))
            it('Раздел "Мониторинг', async () =>  await dec.simple(el.section.active, [sec.mon, entry.max], el.section))
            it('Отображение "Интерактивный план"', async () => await dec.simple(el.subsection.subsection, [sub.mon.plan, entry.max], el.subsection))
        })

        describe('Администрирование', () => {
            it('Отображение раздела "Администрирование"', async () =>  await dec.simple(el.section.section, [sec.adm, entry.max], el.section))
            it('Нажатие "Администрирование"', async () =>  await dec.simple(el.section.handler, [sec.adm, entry.max], el.section))
            it('Раздел "Администрирование" активен', async () =>  await dec.simple(el.section.active, [sec.adm, entry.max], el.section))
            it('Отображение "Конфигурация"', async () => await dec.simple(el.subsection.subsection, [sub.adm.conf, entry.max], el.subsection))
            it('Отображение "События системы"', async () => await dec.simple(el.subsection.subsection, [sub.adm.event, entry.max], el.subsection))
            it('Отображение "Реакции на события"', async () => await dec.simple(el.subsection.subsection, [sub.adm.action, entry.max], el.subsection))
            it('Отображение "Задания"', async () => await dec.simple(el.subsection.subsection, [sub.adm.task, entry.max], el.subsection))
            it('Отображение "Роли и права операторов"', async () => await dec.simple(el.subsection.subsection, [sub.adm.role, entry.max], el.subsection))
            it('Отображение "Лицензии"', async () => await dec.simple(el.subsection.subsection, [sub.adm.license, entry.max], el.subsection))
        })

        describe('Документация', () => {
            it('Отображение раздела "Документация"', async () =>  await dec.simple(el.section.section, [sec.doc, entry.max], el.section))
            it('Нажатие "Документация"', async () =>  await dec.simple(el.section.handler, [sec.doc, entry.max], el.section))
            it('Раздел "Документация" активен', async () =>  await dec.simple(el.section.active, [sec.doc, entry.max], el.section))
            it('Отображение "SDK"', async () => await dec.simple(el.subsection.subsection, [sub.doc.sdk, entry.max], el.subsection))
        })

    })

    describe('Мониторинг', () => {

        before('Вход и открытие подраздела "Лицензии"', async () => {
            await dec.auth(entry.customLogin, entry.customPassword)
            await dec.simple(el.section.handler, [sec.adm, entry.max], el.section)
            await dec.simple(el.subsection.handler, [sub.adm.license, entry.max], el.subsection)
            await dec.simple(page.license.init, [entry.max], page.license)
        })

        after('Выход', async () => await dec.exit())

        describe('Деактивация', () => {
            it('Нажатие кнопки выключения', async () => await dec.simple(page.license.switch, [lic.monitoring, entry.max], page.license))
            it('Проверка информации', async () => await dec.simple(page.license.disabled, [lic.monitoring, entry.max], page.license))
        })

        describe('Персонал', () => {
            it('Отображение раздела "Персонал"', async () =>  await dec.simple(el.section.section, [sec.per, entry.max], el.section))
            it('Нажатие "Прсонал"', async () =>  await dec.simple(el.section.handler, [sec.per, entry.max], el.section))
            it('Раздел "Персонал" активен', async () =>  await dec.simple(el.section.active, [sec.per, entry.max], el.section))
            it('Отображение "Сотрудники"', async () => await dec.simple(el.subsection.subsection, [sub.per.staff, entry.max], el.subsection))
            it('Отображение "Подразделения"', async () => await dec.simple(el.subsection.subsection, [sub.per.division, entry.max], el.subsection))
            it('Отображение "Должности"', async () => await dec.simple(el.subsection.subsection, [sub.per.position, entry.max], el.subsection))
            it('Отображение "Праздничные дни"', async () => await dec.simple(el.subsection.subsection, [sub.per.holiday, entry.max], el.subsection))
            it('Отображение "Дополнительные данные"', async () => dec.simple(el.subsection.subsection, [sub.per.data, entry.max], el.subsection))
            it('Отображение "Графики работы"', async () => await dec.simple(el.subsection.subsection, [sub.per.schedule, entry.max], el.subsection))

        })

        describe('Бюро пропусков', () => {
            it('Отображение раздела "Бюро пропусков"', async () =>  await dec.simple(el.section.section, [sec.pas, entry.max], el.section))
            it('Нажатие "Бюро пропусков"', async () =>  await dec.simple(el.section.handler, [sec.pas, entry.max], el.section))
            it('Раздел "Бюро пропусков" активен', async () =>  await dec.simple(el.section.active, [sec.pas, entry.max], el.section))
            it('Отображение "Сотрудники"', async () => await dec.simple(el.subsection.subsection, [sub.pas.staff, entry.max], el.subsection))
            it('Отображение "Шаблоны доступа"', async () => await dec.simple(el.subsection.subsection, [sub.pas.template, entry.max], el.subsection))
            it('Отображение "Посетители"', async () => dec.simple(el.subsection.subsection, [sub.pas.visitor, entry.max], el.subsection))
            it('Отображение "Дизайн пропуска"', async () => dec.simple(el.subsection.subsection, [sub.pas.design, entry.max], el.subsection))
            it('Отображение "Отчет по посетителям"', async () => dec.simple(el.subsection.subsection, [sub.pas.report, entry.max], el.subsection))
        })

        describe('Учёт рабочего времени', () => {
            it('Отображение раздела "Учёт рабочего времени"', async () =>  await dec.simple(el.section.section, [sec.urv, entry.max], el.section))
            it('Нажатие "Учёт рабочего времени"', async () =>  await dec.simple(el.section.handler, [sec.urv, entry.max], el.section))
            it('Раздел "Учёт рабочего времени" активен', async () =>  await dec.simple(el.section.active, [sec.urv, entry.max], el.section))
            it('Отображение "Журнал отработанного времени"', async () => await dec.simple(el.subsection.subsection, [sub.urv.journal, entry.max], el.subsection))
            it('Отображение "Оправдательные документы"', async () => await dec.simple(el.subsection.subsection, [sub.urv.document, entry.max], el.subsection))
            it('Отображение "Формирование табеля"', async () => await dec.simple(el.subsection.subsection, [sub.urv.tabel, entry.max], el.subsection))
            it('Отображение "Отчеты по дисциплине"', async () => await dec.simple(el.subsection.subsection, [sub.urv.violator, entry.max], el.subsection))
            it('Отображение "Отчёт УРВ"', async () => await dec.simple(el.subsection.subsection, [sub.urv.report, entry.max], el.subsection))
            it('Отображение "Время присутствия"', async () => await dec.simple(el.subsection.subsection, [sub.urv.presence, entry.max], el.subsection))
            it('Отображение "Выданные документы"', async () => await dec.simple(el.subsection.subsection, [sub.urv.support, entry.max], el.subsection))
        })

        describe('Контроль доступа', () => {
            it('Отображение раздела "Контроль доступа"', async () =>  await dec.simple(el.section.section, [sec.con, entry.max], el.section))
            it('Нажатие "Контроль доступа"', async () =>  await dec.simple(el.section.handler, [sec.con, entry.max], el.section))
            it('Раздел "Контроль доступа" активен', async () =>  await dec.simple(el.section.active, [sec.con, entry.max], el.section))
            it('Отображение "Управление устройствами"', async () => await dec.simple(el.subsection.subsection, [sub.con.device, entry.max], el.subsection))
            it('Отображение "Отчет о проходах"', async () => dec.simple(el.subsection.subsection, [sub.con.premises, entry.max], el.subsection))
            it('Отображение "Журнал верификации"', async () => dec.simple(el.subsection.subsection, [sub.con.verif, entry.max], el.subsection))
            it('Отображение "Отчет по доступу в помещения"', async () => dec.simple(el.subsection.subsection, [sub.con.room, entry.max], el.subsection))
            it('Отображение "Местонахождение"', async () => dec.simple(el.subsection.subsection, [sub.con.location, entry.max], el.subsection))
            it('Отображение "Выданные идентификаторы"', async () => dec.simple(el.subsection.subsection, [sub.con.card, entry.max], el.subsection))
        })

        describe('Верификация', () => {
            it('Отображение раздела "Верификация"', async () =>  await dec.simple(el.section.section, [sec.ver, entry.max], el.section))
            it('Нажатие "Верификация"', async () =>  await dec.simple(el.section.handler, [sec.ver, entry.max], el.section))
            it('Раздел "Верификация', async () =>  await dec.simple(el.section.active, [sec.ver, entry.max], el.section))
            it('Отображение "Верификация"', async () => await dec.simple(el.subsection.subsection, [sub.ver.verif, entry.max], el.subsection))
            it('Отображение "Конфигурация верификации"', async () => await dec.simple(el.subsection.subsection, [sub.ver.config, entry.max], el.subsection))
        })

        describe('Заказ пропуска', () => {
            it('Отображение раздела "Заказ пропуска"', async () =>  await dec.simple(el.section.section, [sec.ord, entry.max], el.section))
            it('Нажатие "Заказ пропуска"', async () =>  await dec.simple(el.section.handler, [sec.ord, entry.max], el.section))
            it('Раздел "Заказ пропуска" активен', async () =>  await dec.simple(el.section.active, [sec.ord, entry.max], el.section))
            it('Отображение "Заказ пропуска"', async () => await dec.simple(el.subsection.subsection, [sub.ord.order, entry.max], el.subsection))
        })

        describe('Мониторинг', () => {
            it('Отсутствие раздела "Мониторинг"', async () =>  await dec.simple(el.section.noElement, [sec.mon, entry.max], el.section))
        })

        describe('Администрирование', () => {
            it('Отображение раздела "Администрирование"', async () =>  await dec.simple(el.section.section, [sec.adm, entry.max], el.section))
            it('Нажатие "Администрирование"', async () =>  await dec.simple(el.section.handler, [sec.adm, entry.max], el.section))
            it('Раздел "Администрирование" активен', async () =>  await dec.simple(el.section.active, [sec.adm, entry.max], el.section))
            it('Отображение "Конфигурация"', async () => await dec.simple(el.subsection.subsection, [sub.adm.conf, entry.max], el.subsection))
            it('Отображение "События системы"', async () => await dec.simple(el.subsection.subsection, [sub.adm.event, entry.max], el.subsection))
            it('Отображение "Реакции на события"', async () => await dec.simple(el.subsection.subsection, [sub.adm.action, entry.max], el.subsection))
            it('Отображение "Задания"', async () => await dec.simple(el.subsection.subsection, [sub.adm.task, entry.max], el.subsection))
            it('Отображение "Роли и права операторов"', async () => await dec.simple(el.subsection.subsection, [sub.adm.role, entry.max], el.subsection))
            it('Отображение "Лицензии"', async () => await dec.simple(el.subsection.subsection, [sub.adm.license, entry.max], el.subsection))
        })

        describe('Документация', () => {
            it('Отображение раздела "Документация"', async () =>  await dec.simple(el.section.section, [sec.doc, entry.max], el.section))
            it('Нажатие "Документация"', async () =>  await dec.simple(el.section.handler, [sec.doc, entry.max], el.section))
            it('Раздел "Документация" активен', async () =>  await dec.simple(el.section.active, [sec.doc, entry.max], el.section))
            it('Отображение "SDK"', async () => await dec.simple(el.subsection.subsection, [sub.doc.sdk, entry.max], el.subsection))
        })

    })

    describe('Интеграция с внешними системами', () => {

        before('Вход и открытие подраздела "Лицензии"', async () => {
            await dec.auth(entry.customLogin, entry.customPassword)
            await dec.simple(el.section.handler, [sec.adm, entry.max], el.section)
            await dec.simple(el.subsection.handler, [sub.adm.license, entry.max], el.subsection)
            await dec.simple(page.license.init, [entry.max], page.license)
        })

        after('Выход', async () => await dec.exit())

        describe('Деактивация', () => {
            it('Нажатие кнопки выключения', async () => await dec.simple(page.license.switch, [lic.device, entry.max], page.license))
            it('Проверка информации', async () => await dec.simple(page.license.disabled, [lic.device, entry.max], page.license))
            it('Обновление страницы', async () => await dec.simple(page.base.refresh, [], page.base))
            it('Ожидание минимальное', async () => await page.base.loading(entry.min))
        })

        describe('Персонал', () => {
            it('Отображение раздела "Персонал"', async () =>  await dec.simple(el.section.section, [sec.per, entry.max], el.section))
            it('Нажатие "Прсонал"', async () =>  await dec.simple(el.section.handler, [sec.per, entry.max], el.section))
            it('Раздел "Персонал" активен', async () =>  await dec.simple(el.section.active, [sec.per, entry.max], el.section))
            it('Отображение "Сотрудники"', async () => await dec.simple(el.subsection.subsection, [sub.per.staff, entry.max], el.subsection))
            it('Отображение "Подразделения"', async () => await dec.simple(el.subsection.subsection, [sub.per.division, entry.max], el.subsection))
            it('Отображение "Должности"', async () => await dec.simple(el.subsection.subsection, [sub.per.position, entry.max], el.subsection))
            it('Отображение "Праздничные дни"', async () => await dec.simple(el.subsection.subsection, [sub.per.holiday, entry.max], el.subsection))
            it('Отображение "Дополнительные данные"', async () => dec.simple(el.subsection.subsection, [sub.per.data, entry.max], el.subsection))
            it('Отображение "Графики работы"', async () => await dec.simple(el.subsection.subsection, [sub.per.schedule, entry.max], el.subsection))

        })

        describe('Бюро пропусков', () => {
            it('Отображение раздела "Бюро пропусков"', async () =>  await dec.simple(el.section.section, [sec.pas, entry.max], el.section))
            it('Нажатие "Бюро пропусков"', async () =>  await dec.simple(el.section.handler, [sec.pas, entry.max], el.section))
            it('Раздел "Бюро пропусков" активен', async () =>  await dec.simple(el.section.active, [sec.pas, entry.max], el.section))
            it('Отображение "Сотрудники"', async () => await dec.simple(el.subsection.subsection, [sub.pas.staff, entry.max], el.subsection))
            it('Отображение "Шаблоны доступа"', async () => await dec.simple(el.subsection.subsection, [sub.pas.template, entry.max], el.subsection))
            it('Отображение "Посетители"', async () => dec.simple(el.subsection.subsection, [sub.pas.visitor, entry.max], el.subsection))
            it('Отображение "Дизайн пропуска"', async () => dec.simple(el.subsection.subsection, [sub.pas.design, entry.max], el.subsection))
            it('Отображение "Отчет по посетителям"', async () => dec.simple(el.subsection.subsection, [sub.pas.report, entry.max], el.subsection))
        })

        describe('Учёт рабочего времени', () => {
            it('Отображение раздела "Учёт рабочего времени"', async () =>  await dec.simple(el.section.section, [sec.urv, entry.max], el.section))
            it('Нажатие "Учёт рабочего времени"', async () =>  await dec.simple(el.section.handler, [sec.urv, entry.max], el.section))
            it('Раздел "Учёт рабочего времени" активен', async () =>  await dec.simple(el.section.active, [sec.urv, entry.max], el.section))
            it('Отображение "Журнал отработанного времени"', async () => await dec.simple(el.subsection.subsection, [sub.urv.journal, entry.max], el.subsection))
            it('Отображение "Оправдательные документы"', async () => await dec.simple(el.subsection.subsection, [sub.urv.document, entry.max], el.subsection))
            it('Отображение "Формирование табеля"', async () => await dec.simple(el.subsection.subsection, [sub.urv.tabel, entry.max], el.subsection))
            it('Отображение "Отчеты по дисциплине"', async () => await dec.simple(el.subsection.subsection, [sub.urv.violator, entry.max], el.subsection))
            it('Отображение "Отчёт УРВ"', async () => await dec.simple(el.subsection.subsection, [sub.urv.report, entry.max], el.subsection))
            it('Отображение "Время присутствия"', async () => await dec.simple(el.subsection.subsection, [sub.urv.presence, entry.max], el.subsection))
            it('Отображение "Выданные документы"', async () => await dec.simple(el.subsection.subsection, [sub.urv.support, entry.max], el.subsection))
        })

        describe('Контроль доступа', () => {
            it('Отображение раздела "Контроль доступа"', async () =>  await dec.simple(el.section.section, [sec.con, entry.max], el.section))
            it('Нажатие "Контроль доступа"', async () =>  await dec.simple(el.section.handler, [sec.con, entry.max], el.section))
            it('Раздел "Контроль доступа" активен', async () =>  await dec.simple(el.section.active, [sec.con, entry.max], el.section))
            it('Отображение "Управление устройствами"', async () => await dec.simple(el.subsection.subsection, [sub.con.device, entry.max], el.subsection))
            it('Отображение "Отчет о проходах"', async () => dec.simple(el.subsection.subsection, [sub.con.premises, entry.max], el.subsection))
            it('Отображение "Журнал верификации"', async () => dec.simple(el.subsection.subsection, [sub.con.verif, entry.max], el.subsection))
            it('Отображение "Отчет по доступу в помещения"', async () => dec.simple(el.subsection.subsection, [sub.con.room, entry.max], el.subsection))
            it('Отображение "Местонахождение"', async () => dec.simple(el.subsection.subsection, [sub.con.location, entry.max], el.subsection))
            it('Отображение "Выданные идентификаторы"', async () => dec.simple(el.subsection.subsection, [sub.con.card, entry.max], el.subsection))
        })

        describe('Верификация', () => {
            it('Отображение раздела "Верификация"', async () =>  await dec.simple(el.section.section, [sec.ver, entry.max], el.section))
            it('Нажатие "Верификация"', async () =>  await dec.simple(el.section.handler, [sec.ver, entry.max], el.section))
            it('Раздел "Верификация', async () =>  await dec.simple(el.section.active, [sec.ver, entry.max], el.section))
            it('Отображение "Верификация"', async () => await dec.simple(el.subsection.subsection, [sub.ver.verif, entry.max], el.subsection))
            it('Отображение "Конфигурация верификации"', async () => await dec.simple(el.subsection.subsection, [sub.ver.config, entry.max], el.subsection))
        })

        describe('Заказ пропуска', () => {
            it('Отображение раздела "Заказ пропуска"', async () =>  await dec.simple(el.section.section, [sec.ord, entry.max], el.section))
            it('Нажатие "Заказ пропуска"', async () =>  await dec.simple(el.section.handler, [sec.ord, entry.max], el.section))
            it('Раздел "Заказ пропуска" активен', async () =>  await dec.simple(el.section.active, [sec.ord, entry.max], el.section))
            it('Отображение "Заказ пропуска"', async () => await dec.simple(el.subsection.subsection, [sub.ord.order, entry.max], el.subsection))
        })

        describe('Мониторинг', () => {
            it('Отсутствие раздела "Мониторинг"', async () =>  await dec.simple(el.section.noElement, [sec.mon, entry.max], el.section))
        })

        describe('Администрирование', () => {
            it('Отображение раздела "Администрирование"', async () =>  await dec.simple(el.section.section, [sec.adm, entry.max], el.section))
            it('Нажатие "Администрирование"', async () =>  await dec.simple(el.section.handler, [sec.adm, entry.max], el.section))
            it('Раздел "Администрирование" активен', async () =>  await dec.simple(el.section.active, [sec.adm, entry.max], el.section))
            it('Отображение "Конфигурация"', async () => await dec.simple(el.subsection.subsection, [sub.adm.conf, entry.max], el.subsection))
            it('Отображение "События системы"', async () => await dec.simple(el.subsection.subsection, [sub.adm.event, entry.max], el.subsection))
            it('Отображение "Реакции на события"', async () => await dec.simple(el.subsection.subsection, [sub.adm.action, entry.max], el.subsection))
            it('Отображение "Задания"', async () => await dec.simple(el.subsection.subsection, [sub.adm.task, entry.max], el.subsection))
            it('Отображение "Роли и права операторов"', async () => await dec.simple(el.subsection.subsection, [sub.adm.role, entry.max], el.subsection))
            it('Отображение "Лицензии"', async () => await dec.simple(el.subsection.subsection, [sub.adm.license, entry.max], el.subsection))
        })

        describe('Документация', () => {
            it('Отсутствие раздела "Документация"', async () =>  await dec.simple(el.section.noElement, [sec.doc, entry.max], el.section))
        })

    })

    describe('Интеграция с 1С', () => {

        before('Вход и открытие подраздела "Лицензии"', async () => {
            await dec.auth(entry.customLogin, entry.customPassword)
            await dec.simple(el.section.handler, [sec.adm, entry.max], el.section)
            await dec.simple(el.subsection.handler, [sub.adm.license, entry.max], el.subsection)
            await dec.simple(page.license.init, [entry.max], page.license)
        })

        after('Выход', async () => await dec.exit())

        describe('Деактивация', () => {
            it('Нажатие кнопки выключения', async () => await dec.simple(page.license.switch, [lic.one, entry.max], page.license))
            it('Проверка информации', async () => await dec.simple(page.license.disabled, [lic.one, entry.max], page.license))
        })

        describe('Персонал', () => {
            it('Отображение раздела "Персонал"', async () =>  await dec.simple(el.section.section, [sec.per, entry.max], el.section))
            it('Нажатие "Прсонал"', async () =>  await dec.simple(el.section.handler, [sec.per, entry.max], el.section))
            it('Раздел "Персонал" активен', async () =>  await dec.simple(el.section.active, [sec.per, entry.max], el.section))
            it('Отображение "Сотрудники"', async () => await dec.simple(el.subsection.subsection, [sub.per.staff, entry.max], el.subsection))
            it('Отображение "Подразделения"', async () => await dec.simple(el.subsection.subsection, [sub.per.division, entry.max], el.subsection))
            it('Отображение "Должности"', async () => await dec.simple(el.subsection.subsection, [sub.per.position, entry.max], el.subsection))
            it('Отображение "Праздничные дни"', async () => await dec.simple(el.subsection.subsection, [sub.per.holiday, entry.max], el.subsection))
            it('Отображение "Дополнительные данные"', async () => dec.simple(el.subsection.subsection, [sub.per.data, entry.max], el.subsection))
            it('Отображение "Графики работы"', async () => await dec.simple(el.subsection.subsection, [sub.per.schedule, entry.max], el.subsection))

        })

        describe('Бюро пропусков', () => {
            it('Отображение раздела "Бюро пропусков"', async () =>  await dec.simple(el.section.section, [sec.pas, entry.max], el.section))
            it('Нажатие "Бюро пропусков"', async () =>  await dec.simple(el.section.handler, [sec.pas, entry.max], el.section))
            it('Раздел "Бюро пропусков" активен', async () =>  await dec.simple(el.section.active, [sec.pas, entry.max], el.section))
            it('Отображение "Сотрудники"', async () => await dec.simple(el.subsection.subsection, [sub.pas.staff, entry.max], el.subsection))
            it('Отображение "Шаблоны доступа"', async () => await dec.simple(el.subsection.subsection, [sub.pas.template, entry.max], el.subsection))
            it('Отображение "Посетители"', async () => dec.simple(el.subsection.subsection, [sub.pas.visitor, entry.max], el.subsection))
            it('Отображение "Дизайн пропуска"', async () => dec.simple(el.subsection.subsection, [sub.pas.design, entry.max], el.subsection))
            it('Отображение "Отчет по посетителям"', async () => dec.simple(el.subsection.subsection, [sub.pas.report, entry.max], el.subsection))
        })

        describe('Учёт рабочего времени', () => {
            it('Отображение раздела "Учёт рабочего времени"', async () =>  await dec.simple(el.section.section, [sec.urv, entry.max], el.section))
            it('Нажатие "Учёт рабочего времени"', async () =>  await dec.simple(el.section.handler, [sec.urv, entry.max], el.section))
            it('Раздел "Учёт рабочего времени" активен', async () =>  await dec.simple(el.section.active, [sec.urv, entry.max], el.section))
            it('Отображение "Журнал отработанного времени"', async () => await dec.simple(el.subsection.subsection, [sub.urv.journal, entry.max], el.subsection))
            it('Отображение "Оправдательные документы"', async () => await dec.simple(el.subsection.subsection, [sub.urv.document, entry.max], el.subsection))
            it('Отображение "Формирование табеля"', async () => await dec.simple(el.subsection.subsection, [sub.urv.tabel, entry.max], el.subsection))
            it('Отображение "Отчеты по дисциплине"', async () => await dec.simple(el.subsection.subsection, [sub.urv.violator, entry.max], el.subsection))
            it('Отображение "Отчёт УРВ"', async () => await dec.simple(el.subsection.subsection, [sub.urv.report, entry.max], el.subsection))
            it('Отображение "Время присутствия"', async () => await dec.simple(el.subsection.subsection, [sub.urv.presence, entry.max], el.subsection))
            it('Отображение "Выданные документы"', async () => await dec.simple(el.subsection.subsection, [sub.urv.support, entry.max], el.subsection))
        })

        describe('Контроль доступа', () => {
            it('Отображение раздела "Контроль доступа"', async () =>  await dec.simple(el.section.section, [sec.con, entry.max], el.section))
            it('Нажатие "Контроль доступа"', async () =>  await dec.simple(el.section.handler, [sec.con, entry.max], el.section))
            it('Раздел "Контроль доступа" активен', async () =>  await dec.simple(el.section.active, [sec.con, entry.max], el.section))
            it('Отображение "Управление устройствами"', async () => await dec.simple(el.subsection.subsection, [sub.con.device, entry.max], el.subsection))
            it('Отображение "Отчет о проходах"', async () => dec.simple(el.subsection.subsection, [sub.con.premises, entry.max], el.subsection))
            it('Отображение "Журнал верификации"', async () => dec.simple(el.subsection.subsection, [sub.con.verif, entry.max], el.subsection))
            it('Отображение "Отчет по доступу в помещения"', async () => dec.simple(el.subsection.subsection, [sub.con.room, entry.max], el.subsection))
            it('Отображение "Местонахождение"', async () => dec.simple(el.subsection.subsection, [sub.con.location, entry.max], el.subsection))
            it('Отображение "Выданные идентификаторы"', async () => dec.simple(el.subsection.subsection, [sub.con.card, entry.max], el.subsection))
        })

        describe('Верификация', () => {
            it('Отображение раздела "Верификация"', async () =>  await dec.simple(el.section.section, [sec.ver, entry.max], el.section))
            it('Нажатие "Верификация"', async () =>  await dec.simple(el.section.handler, [sec.ver, entry.max], el.section))
            it('Раздел "Верификация', async () =>  await dec.simple(el.section.active, [sec.ver, entry.max], el.section))
            it('Отображение "Верификация"', async () => await dec.simple(el.subsection.subsection, [sub.ver.verif, entry.max], el.subsection))
            it('Отображение "Конфигурация верификации"', async () => await dec.simple(el.subsection.subsection, [sub.ver.config, entry.max], el.subsection))
        })

        describe('Заказ пропуска', () => {
            it('Отображение раздела "Заказ пропуска"', async () =>  await dec.simple(el.section.section, [sec.ord, entry.max], el.section))
            it('Нажатие "Заказ пропуска"', async () =>  await dec.simple(el.section.handler, [sec.ord, entry.max], el.section))
            it('Раздел "Заказ пропуска" активен', async () =>  await dec.simple(el.section.active, [sec.ord, entry.max], el.section))
            it('Отображение "Заказ пропуска"', async () => await dec.simple(el.subsection.subsection, [sub.ord.order, entry.max], el.subsection))
        })

        describe('Мониторинг', () => {
            it('Отсутствие раздела "Мониторинг"', async () =>  await dec.simple(el.section.noElement, [sec.mon, entry.max], el.section))
        })

        describe('Администрирование', () => {
            it('Отображение раздела "Администрирование"', async () =>  await dec.simple(el.section.section, [sec.adm, entry.max], el.section))
            it('Нажатие "Администрирование"', async () =>  await dec.simple(el.section.handler, [sec.adm, entry.max], el.section))
            it('Раздел "Администрирование" активен', async () =>  await dec.simple(el.section.active, [sec.adm, entry.max], el.section))
            it('Отображение "Конфигурация"', async () => await dec.simple(el.subsection.subsection, [sub.adm.conf, entry.max], el.subsection))
            it('Отображение "События системы"', async () => await dec.simple(el.subsection.subsection, [sub.adm.event, entry.max], el.subsection))
            it('Отображение "Реакции на события"', async () => await dec.simple(el.subsection.subsection, [sub.adm.action, entry.max], el.subsection))
            it('Отображение "Задания"', async () => await dec.simple(el.subsection.subsection, [sub.adm.task, entry.max], el.subsection))
            it('Отображение "Роли и права операторов"', async () => await dec.simple(el.subsection.subsection, [sub.adm.role, entry.max], el.subsection))
            it('Отображение "Лицензии"', async () => await dec.simple(el.subsection.subsection, [sub.adm.license, entry.max], el.subsection))
        })

        describe('Документация', () => {
            it('Отсутствие раздела "Документация"', async () =>  await dec.simple(el.section.noElement, [sec.doc, entry.max], el.section))
        })

    })

    describe('Верификация', () => {

        before('Вход и открытие подраздела "Лицензии"', async () => {
            await dec.auth(entry.customLogin, entry.customPassword)
            await dec.simple(el.section.handler, [sec.adm, entry.max], el.section)
            await dec.simple(el.subsection.handler, [sub.adm.license, entry.max], el.subsection)
            await dec.simple(page.license.init, [entry.max], page.license)
        })

        after('Выход', async () => await dec.exit())

        describe('Деактивация', () => {
            it('Нажатие кнопки выключения', async () => await dec.simple(page.license.switch, [lic.verification, entry.max], page.license))
            it('Проверка информации', async () => await dec.simple(page.license.disabled, [lic.verification, entry.max], page.license))
        })

        describe('Персонал', () => {
            it('Отображение раздела "Персонал"', async () =>  await dec.simple(el.section.section, [sec.per, entry.max], el.section))
            it('Нажатие "Прсонал"', async () =>  await dec.simple(el.section.handler, [sec.per, entry.max], el.section))
            it('Раздел "Персонал" активен', async () =>  await dec.simple(el.section.active, [sec.per, entry.max], el.section))
            it('Отображение "Сотрудники"', async () => await dec.simple(el.subsection.subsection, [sub.per.staff, entry.max], el.subsection))
            it('Отображение "Подразделения"', async () => await dec.simple(el.subsection.subsection, [sub.per.division, entry.max], el.subsection))
            it('Отображение "Должности"', async () => await dec.simple(el.subsection.subsection, [sub.per.position, entry.max], el.subsection))
            it('Отображение "Праздничные дни"', async () => await dec.simple(el.subsection.subsection, [sub.per.holiday, entry.max], el.subsection))
            it('Отображение "Дополнительные данные"', async () => dec.simple(el.subsection.subsection, [sub.per.data, entry.max], el.subsection))
            it('Отображение "Графики работы"', async () => await dec.simple(el.subsection.subsection, [sub.per.schedule, entry.max], el.subsection))

        })

        describe('Бюро пропусков', () => {
            it('Отображение раздела "Бюро пропусков"', async () =>  await dec.simple(el.section.section, [sec.pas, entry.max], el.section))
            it('Нажатие "Бюро пропусков"', async () =>  await dec.simple(el.section.handler, [sec.pas, entry.max], el.section))
            it('Раздел "Бюро пропусков" активен', async () =>  await dec.simple(el.section.active, [sec.pas, entry.max], el.section))
            it('Отображение "Сотрудники"', async () => await dec.simple(el.subsection.subsection, [sub.pas.staff, entry.max], el.subsection))
            it('Отображение "Шаблоны доступа"', async () => await dec.simple(el.subsection.subsection, [sub.pas.template, entry.max], el.subsection))
            it('Отображение "Посетители"', async () => dec.simple(el.subsection.subsection, [sub.pas.visitor, entry.max], el.subsection))
            it('Отображение "Дизайн пропуска"', async () => dec.simple(el.subsection.subsection, [sub.pas.design, entry.max], el.subsection))
            it('Отображение "Отчет по посетителям"', async () => dec.simple(el.subsection.subsection, [sub.pas.report, entry.max], el.subsection))
        })

        describe('Учёт рабочего времени', () => {
            it('Отображение раздела "Учёт рабочего времени"', async () =>  await dec.simple(el.section.section, [sec.urv, entry.max], el.section))
            it('Нажатие "БУчёт рабочего времени"', async () =>  await dec.simple(el.section.handler, [sec.urv, entry.max], el.section))
            it('Раздел "Учёт рабочего времени" активен', async () =>  await dec.simple(el.section.active, [sec.urv, entry.max], el.section))
            it('Отображение "Журнал отработанного времени"', async () => await dec.simple(el.subsection.subsection, [sub.urv.journal, entry.max], el.subsection))
            it('Отображение "Оправдательные документы"', async () => await dec.simple(el.subsection.subsection, [sub.urv.document, entry.max], el.subsection))
            it('Отображение "Формирование табеля"', async () => await dec.simple(el.subsection.subsection, [sub.urv.tabel, entry.max], el.subsection))
            it('Отображение "Отчеты по дисциплине"', async () => await dec.simple(el.subsection.subsection, [sub.urv.violator, entry.max], el.subsection))
            it('Отображение "Отчёт УРВ"', async () => await dec.simple(el.subsection.subsection, [sub.urv.report, entry.max], el.subsection))
            it('Отображение "Время присутствия"', async () => await dec.simple(el.subsection.subsection, [sub.urv.presence, entry.max], el.subsection))
            it('Отображение "Выданные документы"', async () => await dec.simple(el.subsection.subsection, [sub.urv.support, entry.max], el.subsection))
        })

        describe('Контроль доступа', () => {
            it('Отображение раздела "Контроль доступа"', async () =>  await dec.simple(el.section.section, [sec.con, entry.max], el.section))
            it('Нажатие "Контроль доступа"', async () =>  await dec.simple(el.section.handler, [sec.con, entry.max], el.section))
            it('Раздел "Контроль доступа" активен', async () =>  await dec.simple(el.section.active, [sec.con, entry.max], el.section))
            it('Отображение "Управление устройствами"', async () => await dec.simple(el.subsection.subsection, [sub.con.device, entry.max], el.subsection))
            it('Отображение "Отчет о проходах"', async () => dec.simple(el.subsection.subsection, [sub.con.premises, entry.max], el.subsection))
            it('Отсутствие "Журнал верификации"', async () => dec.simple(el.subsection.noElement, [sub.con.verif, entry.max], el.subsection))
            it('Отображение "Отчет по доступу в помещения"', async () => dec.simple(el.subsection.subsection, [sub.con.room, entry.max], el.subsection))
            it('Отображение "Местонахождение"', async () => dec.simple(el.subsection.subsection, [sub.con.location, entry.max], el.subsection))
            it('Отображение "Выданные идентификаторы"', async () => dec.simple(el.subsection.subsection, [sub.con.card, entry.max], el.subsection))
        })

        describe('Верификация', () => {
            it('Отсутствие раздела "Верификация"', async () =>  await dec.simple(el.section.noElement, [sec.ver, entry.max], el.section))
        })

        describe('Заказ пропуска', () => {
            it('Отображение раздела "Заказ пропуска"', async () =>  await dec.simple(el.section.section, [sec.ord, entry.max], el.section))
            it('Нажатие "Заказ пропуска"', async () =>  await dec.simple(el.section.handler, [sec.ord, entry.max], el.section))
            it('Раздел "Заказ пропуска" активен', async () =>  await dec.simple(el.section.active, [sec.ord, entry.max], el.section))
            it('Отображение "Заказ пропуска"', async () => await dec.simple(el.subsection.subsection, [sub.ord.order, entry.max], el.subsection))
        })

        describe('Мониторинг', () => {
            it('Отсутствие раздела "Мониторинг"', async () =>  await dec.simple(el.section.noElement, [sec.mon, entry.max], el.section))
        })

        describe('Администрирование', () => {
            it('Отображение раздела "Администрирование"', async () =>  await dec.simple(el.section.section, [sec.adm, entry.max], el.section))
            it('Нажатие "Администрирование"', async () =>  await dec.simple(el.section.handler, [sec.adm, entry.max], el.section))
            it('Раздел "Администрирование" активен', async () =>  await dec.simple(el.section.active, [sec.adm, entry.max], el.section))
            it('Отображение "Конфигурация"', async () => await dec.simple(el.subsection.subsection, [sub.adm.conf, entry.max], el.subsection))
            it('Отображение "События системы"', async () => await dec.simple(el.subsection.subsection, [sub.adm.event, entry.max], el.subsection))
            it('Отображение "Реакции на события"', async () => await dec.simple(el.subsection.subsection, [sub.adm.action, entry.max], el.subsection))
            it('Отображение "Задания"', async () => await dec.simple(el.subsection.subsection, [sub.adm.task, entry.max], el.subsection))
            it('Отображение "Роли и права операторов"', async () => await dec.simple(el.subsection.subsection, [sub.adm.role, entry.max], el.subsection))
            it('Отображение "Лицензии"', async () => await dec.simple(el.subsection.subsection, [sub.adm.license, entry.max], el.subsection))
        })

        describe('Документация', () => {
            it('Отсутствие раздела "Документация"', async () =>  await dec.simple(el.section.noElement, [sec.doc, entry.max], el.section))
        })
    })

    describe('Учёт рабочего времени', () => {

        before('Вход и открытие подраздела "Лицензии"', async () => {
            await dec.auth(entry.customLogin, entry.customPassword)
            await dec.simple(el.section.handler, [sec.adm, entry.max], el.section)
            await dec.simple(el.subsection.handler, [sub.adm.license, entry.max], el.subsection)
            await dec.simple(page.license.init, [entry.max], page.license)
        })

        after('Выход', async () => await dec.exit())

        describe('Деактивация', () => {
            it('Нажатие кнопки выключения', async () => await dec.simple(page.license.switch, [lic.urv, entry.max], page.license))
            it('Проверка информации', async () => await dec.simple(page.license.disabled, [lic.urv, entry.max], page.license))
        })

        describe('Персонал', () => {
            it('Отображение раздела "Персонал"', async () =>  await dec.simple(el.section.section, [sec.per, entry.max], el.section))
            it('Нажатие "Прсонал"', async () =>  await dec.simple(el.section.handler, [sec.per, entry.max], el.section))
            it('Раздел "Персонал" активен', async () =>  await dec.simple(el.section.active, [sec.per, entry.max], el.section))
            it('Отображение "Сотрудники"', async () => await dec.simple(el.subsection.subsection, [sub.per.staff, entry.max], el.subsection))
            it('Отображение "Подразделения"', async () => await dec.simple(el.subsection.subsection, [sub.per.division, entry.max], el.subsection))
            it('Отображение "Должности"', async () => await dec.simple(el.subsection.subsection, [sub.per.position, entry.max], el.subsection))
            it('Отображение "Праздничные дни"', async () => await dec.simple(el.subsection.subsection, [sub.per.holiday, entry.max], el.subsection))
            it('Отображение "Дополнительные данные"', async () => dec.simple(el.subsection.subsection, [sub.per.data, entry.max], el.subsection))
            it('Отсутствие "Графики работы"', async () => await dec.simple(el.subsection.noElement, [sub.per.schedule, entry.max], el.subsection))

        })

        describe('Бюро пропусков', () => {
            it('Отображение раздела "Бюро пропусков"', async () =>  await dec.simple(el.section.section, [sec.pas, entry.max], el.section))
            it('Нажатие "Бюро пропусков"', async () =>  await dec.simple(el.section.handler, [sec.pas, entry.max], el.section))
            it('Раздел "Бюро пропусков" активен', async () =>  await dec.simple(el.section.active, [sec.pas, entry.max], el.section))
            it('Отображение "Сотрудники"', async () => await dec.simple(el.subsection.subsection, [sub.pas.staff, entry.max], el.subsection))
            it('Отображение "Шаблоны доступа"', async () => await dec.simple(el.subsection.subsection, [sub.pas.template, entry.max], el.subsection))
            it('Отображение "Посетители"', async () => dec.simple(el.subsection.subsection, [sub.pas.visitor, entry.max], el.subsection))
            it('Отображение "Дизайн пропуска"', async () => dec.simple(el.subsection.subsection, [sub.pas.design, entry.max], el.subsection))
            it('Отображение "Отчет по посетителям"', async () => dec.simple(el.subsection.subsection, [sub.pas.report, entry.max], el.subsection))
        })

        describe('Учёт рабочего времени', () => {
            it('Отсутствие раздела "Учёт рабочего времени"', async () =>  await dec.simple(el.section.noElement, [sec.urv, entry.max], el.section))
        })

        describe('Контроль доступа', () => {
            it('Отображение раздела "Контроль доступа"', async () =>  await dec.simple(el.section.section, [sec.con, entry.max], el.section))
            it('Нажатие "Контроль доступа"', async () =>  await dec.simple(el.section.handler, [sec.con, entry.max], el.section))
            it('Раздел "Контроль доступа" активен', async () =>  await dec.simple(el.section.active, [sec.con, entry.max], el.section))
            it('Отображение "Управление устройствами"', async () => await dec.simple(el.subsection.subsection, [sub.con.device, entry.max], el.subsection))
            it('Отображение "Отчет о проходах"', async () => dec.simple(el.subsection.subsection, [sub.con.premises, entry.max], el.subsection))
            it('Отсутствие "Журнал верификации"', async () => dec.simple(el.subsection.noElement, [sub.con.verif, entry.max], el.subsection))
            it('Отображение "Отчет по доступу в помещения"', async () => dec.simple(el.subsection.subsection, [sub.con.room, entry.max], el.subsection))
            it('Отсутствие "Местонахождение"', async () => dec.simple(el.subsection.noElement, [sub.con.location, entry.max], el.subsection))
            it('Отображение "Выданные идентификаторы"', async () => dec.simple(el.subsection.subsection, [sub.con.card, entry.max], el.subsection))
        })

        describe('Верификация', () => {
            it('Отсутствие раздела "Верификация"', async () =>  await dec.simple(el.section.noElement, [sec.ver, entry.max], el.section))
        })

        describe('Заказ пропуска', () => {
            it('Отображение раздела "Заказ пропуска"', async () =>  await dec.simple(el.section.section, [sec.ord, entry.max], el.section))
            it('Нажатие "Заказ пропуска"', async () =>  await dec.simple(el.section.handler, [sec.ord, entry.max], el.section))
            it('Раздел "Заказ пропуска" активен', async () =>  await dec.simple(el.section.active, [sec.ord, entry.max], el.section))
            it('Отображение "Заказ пропуска"', async () => await dec.simple(el.subsection.subsection, [sub.ord.order, entry.max], el.subsection))
        })

        describe('Мониторинг', () => {
            it('Отсутствие раздела "Мониторинг"', async () =>  await dec.simple(el.section.noElement, [sec.mon, entry.max], el.section))
        })

        describe('Администрирование', () => {
            it('Отображение раздела "Администрирование"', async () =>  await dec.simple(el.section.section, [sec.adm, entry.max], el.section))
            it('Нажатие "Администрирование"', async () =>  await dec.simple(el.section.handler, [sec.adm, entry.max], el.section))
            it('Раздел "Администрирование" активен', async () =>  await dec.simple(el.section.active, [sec.adm, entry.max], el.section))
            it('Отображение "Конфигурация"', async () => await dec.simple(el.subsection.subsection, [sub.adm.conf, entry.max], el.subsection))
            it('Отображение "События системы"', async () => await dec.simple(el.subsection.subsection, [sub.adm.event, entry.max], el.subsection))
            it('Отображение "Реакции на события"', async () => await dec.simple(el.subsection.subsection, [sub.adm.action, entry.max], el.subsection))
            it('Отображение "Задания"', async () => await dec.simple(el.subsection.subsection, [sub.adm.task, entry.max], el.subsection))
            it('Отображение "Роли и права операторов"', async () => await dec.simple(el.subsection.subsection, [sub.adm.role, entry.max], el.subsection))
            it('Отображение "Лицензии"', async () => await dec.simple(el.subsection.subsection, [sub.adm.license, entry.max], el.subsection))
        })

        describe('Документация', () => {
            it('Отсутствие раздела "Документация"', async () =>  await dec.simple(el.section.noElement, [sec.doc, entry.max], el.section))
        })
    })

    describe('Стандартный пакет', () => {

        before('Вход и открытие подраздела "Лицензии"', async () => {
            await dec.auth(entry.customLogin, entry.customPassword)
            await dec.simple(el.section.handler, [sec.adm, entry.max], el.section)
            await dec.simple(el.subsection.handler, [sub.adm.license, entry.max], el.subsection)
            await dec.simple(page.license.init, [entry.max], page.license)
        })

        after('Выход', async () => await dec.exit())

        describe('Деактивация', () => {
            it('Нажатие кнопки выключения', async () => await dec.simple(page.license.switch, [lic.standard, entry.max], page.license))
            it('Отображене модального окна "Подтвердите действие"', async () => {
                await dec.simple(el.modalConfirm.licenseStandardDeactivate.init, [entry.max], el.modalConfirm.licenseStandardDeactivate)
            })
            it('Нажатие кнопки "Подтвердить"', async () => await dec.simple(el.button.handler, ['Подтвердить', entry.max], el.button))
            it('Отсутствие модального окна "Подтвердите действие"', async () => {
                await dec.simple(el.modalConfirm.licenseStandardDeactivate.initClose, [entry.max], el.modalConfirm.licenseStandardDeactivate)
            })
            it('Проверка информации', async () => await dec.simple(page.license.disabled, [lic.standard, entry.max], page.license))

        })

        describe('Персонал', () => {
            it('Отображение раздела "Персонал"', async () =>  await dec.simple(el.section.section, [sec.per, entry.max], el.section))
            it('Нажатие "Прсонал"', async () =>  await dec.simple(el.section.handler, [sec.per, entry.max], el.section))
            it('Раздел "Персонал" активен', async () =>  await dec.simple(el.section.active, [sec.per, entry.max], el.section))
            it('Отображение "Сотрудники"', async () => await dec.simple(el.subsection.subsection, [sub.per.staff, entry.max], el.subsection))
            it('Отображение "Подразделения"', async () => await dec.simple(el.subsection.subsection, [sub.per.division, entry.max], el.subsection))
            it('Отображение "Должности"', async () => await dec.simple(el.subsection.subsection, [sub.per.position, entry.max], el.subsection))
            it('Отображение "Праздничные дни"', async () => await dec.simple(el.subsection.subsection, [sub.per.holiday, entry.max], el.subsection))
            it('Отсутствие "Графики работы"', async () => await dec.simple(el.subsection.noElement, [sub.per.schedule, entry.max], el.subsection))
            it('Отсутствие "Дополнительные данные"', async () => dec.simple(el.subsection.noElement, [sub.per.data, entry.max], el.subsection))
        })

        describe('Бюро пропусков', () => {
            it('Отображение раздела "Бюро пропусков"', async () =>  await dec.simple(el.section.section, [sec.pas, entry.max], el.section))
            it('Нажатие "Бюро пропусков"', async () =>  await dec.simple(el.section.handler, [sec.pas, entry.max], el.section))
            it('Раздел "Бюро пропусков" активен', async () =>  await dec.simple(el.section.active, [sec.pas, entry.max], el.section))
            it('Отображение "Сотрудники"', async () => await dec.simple(el.subsection.subsection, [sub.pas.staff, entry.max], el.subsection))
            it('Отображение "Шаблоны доступа"', async () => await dec.simple(el.subsection.subsection, [sub.pas.template, entry.max], el.subsection))
            it('Отсутствие "Посетители"', async () => dec.simple(el.subsection.noElement, [sub.pas.visitor, entry.max], el.subsection))
            it('Отсутствие "Дизайн пропуска"', async () => dec.simple(el.subsection.noElement, [sub.pas.design, entry.max], el.subsection))
            it('Отсутствие "Отчет по посетителям"', async () => dec.simple(el.subsection.noElement, [sub.pas.report, entry.max], el.subsection))
        })

        describe('Учёт рабочего времени', () => {
            it('Отсутствие раздела "Учёт рабочего времени"', async () =>  await dec.simple(el.section.noElement, [sec.urv, entry.max], el.section))
        })

        describe('Контроль доступа', () => {
            it('Отображение раздела "Контроль доступа"', async () =>  await dec.simple(el.section.section, [sec.con, entry.max], el.section))
            it('Нажатие "Контроль доступа"', async () =>  await dec.simple(el.section.handler, [sec.con, entry.max], el.section))
            it('Раздел "Контроль доступа', async () =>  await dec.simple(el.section.active, [sec.con, entry.max], el.section))
            it('Отображение "Управление устройствами"', async () => await dec.simple(el.subsection.subsection, [sub.con.device, entry.max], el.subsection))
            it('Отсутствие "Отчет о проходах"', async () => dec.simple(el.subsection.noElement, [sub.con.premises, entry.max], el.subsection))
            it('Отсутствие "Журнал верификации"', async () => dec.simple(el.subsection.noElement, [sub.con.verif, entry.max], el.subsection))
            it('Отсутствие "Отчет по доступу в помещения"', async () => dec.simple(el.subsection.noElement, [sub.con.room, entry.max], el.subsection))
            it('Отсутствие "Местонахождение"', async () => dec.simple(el.subsection.noElement, [sub.con.location, entry.max], el.subsection))
            it('Отсутствие "Выданные идентификаторы"', async () => dec.simple(el.subsection.noElement, [sub.con.card, entry.max], el.subsection))
        })

        describe('Верификация', () => {
            it('Отсутствие раздела "Верификация"', async () =>  await dec.simple(el.section.noElement, [sec.ver, entry.max], el.section))
        })

        describe('Заказ пропуска', () => {
            it('Отсутствие раздела "Заказ пропуска"', async () =>  await dec.simple(el.section.noElement, [sec.ord, entry.max], el.section))
        })

        describe('Мониторинг', () => {
            it('Отсутствие раздела "Мониторинг"', async () =>  await dec.simple(el.section.noElement, [sec.mon, entry.max], el.section))
        })

        describe('Администрирование', () => {
            it('Отображение раздела "Администрирование"', async () =>  await dec.simple(el.section.section, [sec.adm, entry.max], el.section))
            it('Нажатие "Администрирование"', async () =>  await dec.simple(el.section.handler, [sec.adm, entry.max], el.section))
            it('Раздел "Администрирование" активен', async () =>  await dec.simple(el.section.active, [sec.adm, entry.max], el.section))
            it('Отображение "Конфигурация"', async () => await dec.simple(el.subsection.subsection, [sub.adm.conf, entry.max], el.subsection))
            it('Отображение "События системы"', async () => await dec.simple(el.subsection.subsection, [sub.adm.event, entry.max], el.subsection))
            it('Отображение "Реакции на события"', async () => await dec.simple(el.subsection.subsection, [sub.adm.action, entry.max], el.subsection))
            it('Отображение "Задания"', async () => await dec.simple(el.subsection.subsection, [sub.adm.task, entry.max], el.subsection))
            it('Отображение "Роли и права операторов"', async () => await dec.simple(el.subsection.subsection, [sub.adm.role, entry.max], el.subsection))
            it('Отображение "Лицензии"', async () => await dec.simple(el.subsection.subsection, [sub.adm.license, entry.max], el.subsection))
        })

        describe('Документация', () => {
            it('Отсутствие раздела "Документация"', async () =>  await dec.simple(el.section.noElement, [sec.doc, entry.max], el.section))
        })

    })

})

describe('Проверка подраздела "Лицензии". Деактивация "Стандартный пакет".', () => {

    const params = 'Проверена 60 дней остался'

    before('Вход и открытие подраздела "Лицензии"', async () => {
        await dec.auth(entry.customLogin, entry.customPassword)
        await dec.simple(el.section.handler, [sec.adm, entry.max], el.section)
        await dec.simple(el.subsection.handler, [sub.adm.license, entry.max], el.subsection)
        await dec.simple(page.license.init, [entry.max], page.license)
    })

    after('Выход', async () => await dec.exit())

    describe('Активация всех лицензий', () => {

        describe('Стандартный пакет', () => {
            it('Нажатие кнопки включения', async () => await dec.simple(page.license.switch, [lic.standard, entry.max], page.license))
            it('Проверка информации', async () => await dec.simple(page.license.info, [lic.standard, params, entry.max], page.license))
        })

        describe('Учёт рабочего времени', () => {
            it('Нажатие кнопки включения', async () => await dec.simple(page.license.switch, [lic.urv, entry.max], page.license))
            it('Проверка информации', async () => await dec.simple(page.license.info, [lic.urv, params, entry.max], page.license))
        })

        describe('Верификация', () => {
            it('Нажатие кнопки включения', async () => await dec.simple(page.license.switch, [lic.verification, entry.max], page.license))
            it('Проверка информации', async () => await dec.simple(page.license.info, [lic.verification, params, entry.max], page.license))
        })

        describe('Интеграция с 1С', () => {
            it('Нажатие кнопки включения', async () => await dec.simple(page.license.switch, [lic.one, entry.max], page.license))
            it('Проверка информации', async () => await dec.simple(page.license.info, [lic.one, params, entry.max], page.license))
        })

        describe('Интеграция с внешними системами', () => {
            it('Нажатие кнопки включения', async () => await dec.simple(page.license.switch, [lic.device, entry.max], page.license))
            it('Проверка информации', async () => await dec.simple(page.license.info, [lic.device, params, entry.max], page.license))
        })

        describe('Мониторинг', () => {
            it('Нажатие кнопки включения', async () => await dec.simple(page.license.switch, [lic.monitoring, entry.max], page.license))
            it('Проверка информации', async () => await dec.simple(page.license.info, [lic.monitoring, params, entry.max], page.license))
        })

        describe('Интеграция с TRASSIR', () => {
            it('Нажатие кнопки включения', async () => await dec.simple(page.license.switch, [lic.trassir, entry.max], page.license))
            it('Проверка информации', async () => await dec.simple(page.license.info, [lic.trassir, params, entry.max], page.license))
        })

        describe('Интеграция с ИСО "ОРИОН" (НВП "Болид")', () => {
            it('Нажатие кнопки включения', async () => await dec.simple(page.license.switch, [lic.orion, entry.max], page.license))
            it('Проверка информации', async () => await dec.simple(page.license.info, [lic.orion, params, entry.max], page.license))
        })

        describe('Интеграция с Axxon Next', () => {
            it('Нажатие кнопки включения', async () => await dec.simple(page.license.switch, [lic.axxon, entry.max], page.license))
            it('Проверка информации', async () => await dec.simple(page.license.info, [lic.axxon, params, entry.max], page.license))
        })
    })

    describe('Деактивация "Стандартный пакет"', () => {
        it('Нажатие кнопки выключения', async () => await dec.simple(page.license.switch, [lic.standard, entry.max], page.license))
        it('Отображене модального окна "Подтвердите действие"', async () => {
            await dec.simple(el.modalConfirm.licenseStandardDeactivate.init, [entry.max], el.modalConfirm.licenseStandardDeactivate)
        })
        it('Нажатие кнопки "Подтвердить"', async () => await dec.simple(el.button.handler, ['Подтвердить', entry.max], el.button))
        it('Отсутствие модального окна "Подтвердите действие"', async () => {
            await dec.simple(el.modalConfirm.licenseStandardDeactivate.initClose, [entry.max], el.modalConfirm.licenseStandardDeactivate)
        })
        it('Проверка информации', async () => await dec.simple(page.license.disabled, [lic.standard, entry.max], page.license))
    })

    describe('Проверрка лицензий', () => {
        it('"Стандартный пакет" деактивирован', async () => await dec.simple(page.license.disabled, [lic.standard, entry.max], page.license))
        it('"Учёт рабочего времени" деактивирован', async () => await dec.simple(page.license.disabled, [lic.urv, entry.max], page.license))
        it('"Верификация" деактивирован', async () => await dec.simple(page.license.disabled, [lic.verification, entry.max], page.license))
        it('"Интеграция с 1С" деактивирован', async () => await dec.simple(page.license.disabled, [lic.one, entry.max], page.license))
        it('"Интеграция с внешними системам" активирован', async () => await dec.simple(page.license.info, [lic.device, params, entry.max], page.license))
        it('"Мониторинг" деактивирован', async () => await dec.simple(page.license.disabled, [lic.monitoring, entry.max], page.license))
        it('"Интеграция с TRASSIR" деактивирован', async () => await dec.simple(page.license.disabled, [lic.trassir, entry.max], page.license))
        it('"Интеграция с ИСО "ОРИОН" (НВП "Болид")" деактивирован', async () => await dec.simple(page.license.disabled, [lic.orion, entry.max], page.license))
        it('"Интеграция с Axxon Next" деактивирован', async () => await dec.simple(page.license.disabled, [lic.axxon, entry.max], page.license))
    })

    describe('Деактивация "Интеграция с внешними системам"', () => {
        it('Нажатие кнопки выключения', async () => await dec.simple(page.license.switch, [lic.device, entry.max], page.license))
        it('Проверка информации', async () => await dec.simple(page.license.disabled, [lic.device, entry.max], page.license))
    })

})

describe('Проверка подраздела "Лицензии". Активация лицензий без активации "Стандартный пакет"', () => {

    const params = 'Проверена 60 дней остался'

    before('Вход и открытие подраздела "Лицензии"', async () => {
        await dec.auth(entry.customLogin, entry.customPassword)
        await dec.simple(el.section.handler, [sec.adm, entry.max], el.section)
        await dec.simple(el.subsection.handler, [sub.adm.license, entry.max], el.subsection)
        await dec.simple(page.license.init, [entry.max], page.license)
    })

    after('Выход', async () => await dec.exit())

    describe('Проверка "Стандартный пакет"', () => {
        it('"Стандартный пакет" деактивирован', async () => await dec.simple(page.license.disabled, [lic.standard, entry.min], page.license))
    })

    describe('Активация лицензий', () => {

        describe('Учёт рабочего времени', () => {
            it('Нажатие кнопки включения', async () => await dec.simple(page.license.switch, [lic.urv, entry.max], page.license))
            it('"Учёт рабочего времени" деактивирован', async () => await dec.simpleFalse(page.license.info, [lic.urv, params, entry.min], page.license))
        })

        describe('Верификация', () => {
            it('Нажатие кнопки включения', async () => await dec.simple(page.license.switch, [lic.verification, entry.max], page.license))
            it('"Верификация" деактивирован', async () => await dec.simpleFalse(page.license.info, [lic.verification, params, entry.min], page.license))
        })

        describe('Интеграция с 1С', () => {
            it('Нажатие кнопки включения', async () => await dec.simple(page.license.switch, [lic.one, entry.max], page.license))
            it('"Интеграция с 1С" деактивирован', async () => await dec.simpleFalse(page.license.info, [lic.one, params, entry.min], page.license))
        })

        describe('Интеграция с внешними системами', () => {
            it('Нажатие кнопки включения', async () => await dec.simple(page.license.switch, [lic.device, entry.max], page.license))
            it('"Интеграция с внешними системами" активирован', async () => await dec.simple(page.license.info, [lic.device, params, entry.max], page.license))
        })

        describe('Мониторинг', () => {
            it('Нажатие кнопки включения', async () => await dec.simple(page.license.switch, [lic.monitoring, entry.max], page.license))
            it('"Мониторинг" деактивирован', async () => await dec.simpleFalse(page.license.info, [lic.monitoring, params, entry.min], page.license))
        })

        describe('Интеграция с TRASSIR', () => {
            it('Нажатие кнопки включения', async () => await dec.simple(page.license.switch, [lic.trassir, entry.max], page.license))
            it('"Интеграция с TRASSIR" деактивирован', async () => await dec.simpleFalse(page.license.info, [lic.trassir, params, entry.min], page.license))
        })

        describe('Интеграция с ИСО "ОРИОН" (НВП "Болид")', () => {
            it('Нажатие кнопки включения', async () => await dec.simple(page.license.switch, [lic.orion, entry.max], page.license))
            it('"Интеграция с ИСО "ОРИОН" (НВП "Болид")" деактивирован', async () => await dec.simpleFalse(page.license.info, [lic.orion, params, entry.min], page.license))
        })

        describe('Интеграция с Axxon Next', () => {
            it('Нажатие кнопки включения', async () => await dec.simple(page.license.switch, [lic.axxon, entry.max], page.license))
            it('"Axxon Next" деактивирован', async () => await dec.simpleFalse(page.license.info, [lic.axxon, params, entry.min], page.license))
        })
    })

})

describe('Проверка подраздела "Лицензии" Активация "Интеграция с 1С" без активации "Учёт рабочего времени"', () => {

    const params = 'Проверена 60 дней остался'

    before('Вход и открытие подраздела "Лицензии"', async () => {
        await dec.auth(entry.customLogin, entry.customPassword)
        await dec.simple(el.section.handler, [sec.adm, entry.max], el.section)
        await dec.simple(el.subsection.handler, [sub.adm.license, entry.max], el.subsection)
        await dec.simple(page.license.init, [entry.max], page.license)
    })

    after('Выход', async () => await dec.exit())

    describe('Активация "Стандартный пакет"', () => {
        it('Нажатие кнопки включения', async () => await dec.simple(page.license.switch, [lic.standard, entry.max], page.license))
        it('Проверка информации', async () => await dec.simple(page.license.info, [lic.standard, params, entry.max], page.license))
    })

    describe('Активация "Интеграция с 1С"', () => {
        it('Нажатие кнопки включения', async () => await dec.simple(page.license.switch, [lic.one, entry.max], page.license))
        it('"Интеграция с 1С" деактивирован', async () => {
            await dec.simpleFalse(page.license.info, [lic.one, params, entry.min], page.license)
            await dec.simple(page.license.disabled, [lic.one, entry.max], page.license)
        })
    })

})

describe('Проверка подраздела "Лицензии". "Интеграция с 1С". Добавления подразделения с включенным параметром "Активировать 1С интеграцию"', () => {

    const params = {
        info: 'Проверена 60 дней остался',
        division: 'SeleniumSmokeDivision1C',
        error: 'Включен режим интеграции с 1С. Действие невозможно.'
    }

    before('Вход и открытие подраздела "Лицензии"', async () => {
        await dec.auth(entry.customLogin, entry.customPassword)
        await dec.simple(el.section.handler, [sec.adm, entry.max], el.section)
        await dec.simple(el.subsection.handler, [sub.adm.license, entry.max], el.subsection)
        await dec.simple(page.license.init, [entry.max], page.license)
    })

    after('Выход', async () => await dec.exit())

    describe('Активация лицензий', () => {
        describe('Стандартный пакет', () => {
            it('Проверка информации', async () => await dec.simple(page.license.info, [lic.standard, params.info, entry.max], page.license))
        })
        describe('Учёт рабочего времени', () => {
            it('Нажатие кнопки включения', async () => await dec.simple(page.license.switch, [lic.urv, entry.max], page.license))
            it('Проверка информации', async () => await dec.simple(page.license.info, [lic.urv, params.info, entry.max], page.license))
        })
        describe('Интеграция с 1С', () => {
            it('Нажатие кнопки включения', async () => await dec.simple(page.license.switch, [lic.one, entry.max], page.license))
            it('Проверка информации', async () => await dec.simple(page.license.info, [lic.one, params.info, entry.max], page.license))
        })
    })

    describe('Интеграция с 1С - настройка включена', () => {
        it('Нажатие кнопки "Подробно"', async () => await dec.simple(page.license.more, [lic.one, entry.max], page.license))
        it('Проверка "Активировать 1С интеграцию"', async () => await dec.simple(el.checkbox.checked, ['Активировать 1С интеграцию', entry.max],  el.checkbox))
    })

    describe('Добавление подразделения', () => {
        it('Открытие подраздела "Подразделения"', async () => {
            await dec.simple(el.section.handler, [sec.per, entry.max], el.section)
            await dec.simple(el.subsection.handler, [sub.per.division, entry.max], el.subsection)
            await dec.simple(page.division.init, [entry.max], page.division)
        })
        it('Нажатие кнопки "Добавить"', async () => await dec.simple(el.butIcBefore.handler, [but.add, entry.max], el.butIcBefore))
        it('Отображение модального окна "Добавить подразделение"', async () => await dec.simple(el.modal.divisionAdd.init, [entry.max], el.modal.divisionAdd))
        it('Ввод "Подразделение"', async () => await dec.simple(el.input.sendKeys, ['Подразделение', '', params.division, entry.max], el.input))
        it('Нажатие кнопки "Сохранить"', async () => await dec.simple(el.button.handler, ['Сохранить', entry.max], el.button))
        it('Отображение ошибки', async () => await dec.simple(el.error.error, [params.error, entry.max], el.error))
        it('Нажатие кнопки закрытия', async () => await dec.simple(el.modal.divisionAdd.closeHandler, [entry.max], el.modal.divisionAdd))
        it('Отсутствие модального окна "Добавить подразделение"', async () => await dec.simple(el.modal.divisionAdd.initClose, [entry.max], el.modal.divisionAdd))
    })

})

describe('Проверка подраздела "Лицензии". "Интеграция с 1С". Добавления подразделения с выключенным параметром "Активировать 1С интеграцию"', () => {

    const params = {
        info: 'Проверена 60 дней остался',
        division: 'SeleniumSmokeDivision1C',
    }

    before('Вход и открытие подраздела "Лицензии"', async () => {
        await dec.auth(entry.customLogin, entry.customPassword)
        await dec.simple(el.section.handler, [sec.adm, entry.max], el.section)
        await dec.simple(el.subsection.handler, [sub.adm.license, entry.max], el.subsection)
        await dec.simple(page.license.init, [entry.max], page.license)
    })

    after('Выход', async () => await dec.exit())

    describe('Интеграция с 1С - настройка выключена', () => {
        it('Нажатие кнопки "Подробно"', async () => await dec.simple(page.license.more, [lic.one, entry.max], page.license))
        it('Отключение "Активировать 1С интеграцию"', async () => dec.simple(el.checkbox.handler, ['Активировать 1С интеграцию', entry.max], el.checkbox))
        it('Отображение сообщения "Сохранено"', async () => await dec.simple(el.success.success, ['Сохранено', entry.max], el.success))
        it('Проверка "Активировать 1С интеграцию"', async () => await dec.simple(el.checkbox.unchecked, ['Активировать 1С интеграцию', entry.max],  el.checkbox))
    })

    describe('Добавление подразделения', () => {
        it('Открытие подраздела "Подразделения"', async () => {
            await dec.simple(el.section.handler, [sec.per, entry.max], el.section)
            await dec.simple(el.subsection.handler, [sub.per.division, entry.max], el.subsection)
            await dec.simple(page.division.init, [entry.max], page.division)
        })
        it('Нажатие кнопки "Добавить"', async () => await dec.simple(el.butIcBefore.handler, [but.add, entry.max], el.butIcBefore))
        it('Отображение модального окна "Добавить подразделение"', async () => await dec.simple(el.modal.divisionAdd.init, [entry.max], el.modal.divisionAdd))
        it('Ввод "Подразделение"', async () => await dec.simple(el.input.sendKeys, ['Подразделение', '', params.division, entry.max], el.input))
        it('Нажатие кнопки "Сохранить"', async () => await dec.simple(el.button.handler, ['Сохранить', entry.max], el.button))
        it('Отсутствие модального окна "Добавить подразделение"', async () => await dec.simple(el.modal.divisionAdd.initClose, [entry.max], el.modal.divisionAdd))
        it('Отображение подразделения', async () => await dec.simple(page.division.division, [[params.division], entry.max], page.division))
    })

    describe('Очистка данных', () => {
        it('Нажатие по подразделению', async () => await dec.simple(page.division.handler, [[params.division], entry.max], page.division))
        it('Нажатие кнопки "Удалить"', async () => await dec.simple(el.butIcBefore.handler, [but.delete, entry.max], el.butIcBefore))
        it('Отображение модального окна "Удаление подразделения"', async () => await dec.simple(el.modalConfirm.divisionDelete.init, [entry.max], el.modalConfirm.divisionDelete))
        it('Нажатие кнопки "Удалить"', async () => await dec.simple(el.button.handler, ['Удалить', entry.max], el.button))
        it('Отсутствие модального окна "Удаление подразделения"', async () => await dec.simple(el.modalConfirm.divisionDelete.initClose, [entry.max], el.modalConfirm.divisionDelete))
        it('Отсутствие подразделения', async () => await dec.simple(page.division.noElement, [[params.division], entry.max], page.division))
    })

    describe('Активация всех лицензий', () => {
        describe('Открытие подраздела "Лицензии"', () => {
            it('Нажатие "Администрирование"', async () => await dec.simple(el.section.handler, [sec.adm, entry.max], el.section))
            it('Нажатие "Лицензии"', async () => await dec.simple(el.subsection.handler, [sub.adm.license, entry.max], el.subsection))
            it('Проверка страницы', async () => await dec.simple(page.license.init, [entry.max], page.license))
        })
        describe('Стандартный пакет', () => {
            it('Проверка информации', async () => await dec.simple(page.license.info, [lic.standard, params.info, entry.max], page.license))
        })
        describe('Верификация', () => {
            it('Нажатие кнопки включения', async () => await dec.simple(page.license.switch, [lic.verification, entry.max], page.license))
            it('Проверка информации', async () => await dec.simple(page.license.info, [lic.verification, params.info, entry.max], page.license))
        })
        describe('Учёт рабочего времени', () => {
            it('Проверка информации', async () => await dec.simple(page.license.info, [lic.urv, params.info, entry.max], page.license))
        })
        describe('Интеграция с 1С', () => {
            it('Проверка информации', async () => await dec.simple(page.license.info, [lic.one, params.info, entry.max], page.license))
        })
        describe('Интеграция с внешними системами', () => {
            it('Проверка информации', async () => await dec.simple(page.license.info, [lic.device, params.info, entry.max], page.license))
        })
        describe('Мониторинг', () => {
            it('Нажатие кнопки включения', async () => await dec.simple(page.license.switch, [lic.monitoring, entry.max], page.license))
            it('Проверка информации', async () => await dec.simple(page.license.info, [lic.monitoring, params.info, entry.max], page.license))
        })
        describe('Интеграция с TRASSIR', () => {
            it('Нажатие кнопки включения', async () => await dec.simple(page.license.switch, [lic.trassir, entry.max], page.license))
            it('Проверка информации', async () => await dec.simple(page.license.info, [lic.trassir, params.info, entry.max], page.license))
        })
        describe('Интеграция с ИСО "ОРИОН" (НВП "Болид")', () => {
            it('Нажатие кнопки включения', async () => await dec.simple(page.license.switch, [lic.orion, entry.max], page.license))
            it('Проверка информации', async () => await dec.simple(page.license.info, [lic.orion, params.info, entry.max], page.license))
        })
        describe('Интеграция с Axxon Next', () => {
            it('Нажатие кнопки включения', async () => await dec.simple(page.license.switch, [lic.axxon, entry.max], page.license))
            it('Проверка информации', async () => await dec.simple(page.license.info, [lic.axxon, params.info, entry.max], page.license))
        })
    })

})

describe('Закрытие браузера', () => {
    it('Закрытие', async () => await page.base.closeDriver());
});