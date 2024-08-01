const {before, after} = require('mocha');

const entry = require('../../../../entry');
const page = require('../../pages');
const el = require('../../elements');
const dec = require('../../dictionaries/decorate');
const sec = require('../../dictionaries/section');
const sub = require('../../dictionaries/subsection');

module.exports  = {
    before: {
        //// Персонал

        // Персонал / Сотрудники
        beforeStaffActive: () => before('Вход и открытие подраздела "Сотрудники" вкладка "Действующие"', async () => {
            await page.base.loading(entry.sleep1);
            await dec.auth(entry.customLogin, entry.customPassword);
            await dec.simple(el.section.handler, [sec.per, entry.max], el.section);
            await dec.simple(el.subsection.handler, [sub.per.staff, entry.max], el.subsection);
            await dec.simple(el.tab.handler, ['Действующие', entry.max], el.tab);
            await dec.simple(page.staffActive.init, [entry.max], page.staffActive);
            await page.base.loading(entry.sleep1);
        }),

        beforeStaffDismissed: () => before('Вход и открытие подраздела "Сотрудники" вкладка "Уволенные"', async () => {
            await page.base.loading(entry.sleep1);
            await dec.auth(entry.customLogin, entry.customPassword);
            await dec.simple(el.section.handler, [sec.per, entry.max], el.section);
            await dec.simple(el.subsection.handler, [sub.per.staff, entry.max], el.subsection);
            await dec.simple(el.tab.handler, ['Уволенные', entry.max], el.tab);
            await dec.simple(page.staffDimissed.init, [entry.max], page.staffDimissed);
            await page.base.loading(entry.sleep1);
        }),

        // Персонал / Графики работы
        beforeSchedule: () => before('Вход и открытие подраздела "Графики работы"', async () => {
            await page.base.loading(entry.sleep1);
            await dec.auth(entry.customLogin, entry.customPassword);
            await dec.simple(el.section.handler, [sec.per, entry.max], el.section);
            await dec.simple(el.subsection.handler, [sub.per.schedule, entry.max], el.subsection);
            await dec.simple(page.schedule.init, [entry.max], page.schedule);
            await page.base.loading(entry.sleep1);
        }),

        // Персонал / Подразделения
        beforeDivision: () => before('Вход и открытие подраздела "Подразделения"', async () => {
            await page.base.loading(entry.sleep1);
            await dec.auth(entry.customLogin, entry.customPassword);
            await dec.simple(el.section.handler, [sec.per, entry.max], el.section);
            await dec.simple(el.subsection.handler, [sub.per.division, entry.max], el.subsection);
            await dec.simple(page.division.init, [entry.max], page.division);
            await page.base.loading(entry.sleep1);
        }),

        // Персонал / Должности
        beforePosition: () => before('Вход и открытие подраздела "Должности"', async () => {
            await page.base.loading(entry.sleep1);
            await dec.auth(entry.customLogin, entry.customPassword);
            await dec.simple(el.section.handler, [sec.per, entry.max], el.section);
            await dec.simple(el.subsection.handler, [sub.per.position, entry.max], el.subsection);
            await dec.simple(page.position.init, [entry.max], page.position);
            await page.base.loading(entry.sleep1);
        }),

        // Персонал / Праздничные дни
        beforeHoliday: () => before('Вход и открытие подраздела "Праздничные дни"', async () => {
            await page.base.loading(entry.sleep1);
            await dec.auth(entry.customLogin, entry.customPassword);
            await dec.simple(el.section.handler, [sec.per, entry.max], el.section);
            await dec.simple(el.subsection.handler, [sub.per.holiday, entry.max], el.subsection);
            await dec.simple(page.holiday.init, [entry.max], page.holiday);
            await page.base.loading(entry.sleep1);
        }),

        // Персонал / Дополнительные данные
        beforeAdditionalStaff: () => before('Вход и открытие подраздела "Дополнительные данные" вкладка "Сотрудник"',
            async () => {
            await page.base.loading(entry.sleep1);
            await dec.auth(entry.customLogin, entry.customPassword);
            await dec.simple(el.section.handler, [sec.per, entry.max], el.section);
            await dec.simple(el.subsection.handler, [sub.per.data, entry.max], el.subsection);
            await dec.simple(el.tab.handler, ['Сотрудник', entry.max], el.tab);
            await dec.simple(page.additionalData.init, [entry.max], page.additionalData);
            await page.base.loading(entry.sleep1);
        }),

        beforeAdditionalVisitor: () => before('Вход и открытие подраздела "Дополнительные данные" вкладка "Посетитель"',
            async () => {
            await page.base.loading(entry.sleep1);
            await dec.auth(entry.customLogin, entry.customPassword);
            await dec.simple(el.section.handler, [sec.per, entry.max], el.section);
            await dec.simple(el.subsection.handler, [sub.per.data, entry.max], el.subsection);
            await dec.simple(el.tab.handler, ['Посетители', entry.max], el.tab);
            await dec.simple(page.additionalData.init, [entry.max], page.additionalData);
            await page.base.loading(entry.sleep1);
        }),
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////


        //// Бюро пропусков

        // Бюро пропусков / Посетители
        beforeVisitorOrdered: () => before('Вход и открытие подраздела "Посетители" вкладка "Заказанные"', async () => {
            await page.base.loading(entry.sleep1);
            await dec.auth(entry.customLogin, entry.customPassword);
            await dec.simple(el.section.handler, [sec.pas, entry.max], el.section);
            await dec.simple(el.subsection.handler, [sub.pas.visitor, entry.max], el.subsection);
            await dec.simple(el.tab.handler, ['Заказанные', entry.max], el.tab);
            await dec.simple(page.visitorOrdered.init, [entry.max], page.visitorOrdered);
            await page.base.loading(entry.sleep1);
        }),

        beforeVisitorActive: () => before('Вход и открытие подраздела "Посетители" вкладка "Действующие"', async () => {
            await page.base.loading(entry.sleep1);
            await dec.auth(entry.customLogin, entry.customPassword);
            await dec.simple(el.section.handler, [sec.pas, entry.max], el.section);
            await dec.simple(el.subsection.handler, [sub.pas.visitor, entry.max], el.subsection);
            await dec.simple(el.tab.handler, ['Действующие', entry.max], el.tab);
            await dec.simple(page.visitorCurrent.init, [entry.max], page.visitorCurrent);
            await page.base.loading(entry.sleep1);
        }),

        beforeVisitorArchive: () => before('Вход и открытие подраздела "Посетители" вкладка "Архив"', async () => {
            await page.base.loading(entry.sleep1);
            await dec.auth(entry.customLogin, entry.customPassword);
            await dec.simple(el.section.handler, [sec.pas, entry.max], el.section);
            await dec.simple(el.subsection.handler, [sub.pas.visitor, entry.max], el.subsection);
            await dec.simple(el.tab.handler, ['Архив', entry.max], el.tab);
            await dec.simple(page.visitorArchive.init, [entry.max], page.visitorArchive);
            await page.base.loading(entry.sleep1);
        }),

        // Бюро пропусков / Сотрудники
        beforeStaffPass: () => before('Вход и открытие подраздела "Сотрудники"', async () => {
            await page.base.loading(entry.sleep1);
            await dec.auth(entry.customLogin, entry.customPassword);
            await dec.simple(el.section.handler, [sec.pas, entry.max], el.section);
            await dec.simple(el.subsection.handler, [sub.pas.staff, entry.max], el.subsection);
            await dec.simple(page.staffPass.init, [entry.max], page.staffPass);
            await page.base.loading(entry.sleep1);
        }),

        // Бюро пропусков / Шаблон доступа
        beforeTemplate: () => before('Вход и открытие подраздела "Шаблоны доступа" вкладка "Шаблоны доступа"',
            async () => {
            await page.base.loading(entry.sleep1);
            await dec.auth(entry.customLogin, entry.customPassword);
            await dec.simple(el.section.handler, [sec.pas, entry.max], el.section);
            await dec.simple(el.subsection.handler, [sub.pas.template, entry.max], el.subsection);
            await dec.simple(el.tab.handler, ['Шаблоны доступа', entry.max], el.tab);
            await dec.simple(page.accessTemplate.init, [entry.max], page.accessTemplate);
            await page.base.loading(entry.sleep1);
        }),

        beforeAccess: () => before('Вход и открытие подраздела "Шаблоны доступа" вкладка "Временные критерии доступа"',
            async () => {
            await page.base.loading(entry.sleep1);
            await dec.auth(entry.customLogin, entry.customPassword);
            await dec.simple(el.section.handler, [sec.pas, entry.max], el.section);
            await dec.simple(el.subsection.handler, [sub.pas.template, entry.max], el.subsection);
            await dec.simple(el.tab.handler, ['Временные критерии доступа', entry.max], el.tab);
            await dec.simple(page.accessTemplateSchedulePage.init, [entry.max], page.accessTemplate);
            await page.base.loading(entry.sleep1);
        }),

        beforeCommission: () => before('Вход и открытие подраздела "Шаблоны доступа" вкладка "Комиссионирование"',
            async () => {
            await page.base.loading(entry.sleep1);
            await dec.auth(entry.customLogin, entry.customPassword);
            await dec.simple(el.section.handler, [sec.pas, entry.max], el.section);
            await dec.simple(el.subsection.handler, [sub.pas.template, entry.max], el.subsection);
            await dec.simple(el.tab.handler, ['Комиссионирование', entry.max], el.tab);
            await dec.simple(page.accessTemplateComission.init, [entry.max], page.accessTemplateComission);
            await page.base.loading(entry.sleep1);
        }),

        // Бюро пропусков / Дизайн пропуска
        beforeDesign: () => before('Вход и открытие подраздела "Дизайн пропуска"', async () => {
            await page.base.loading(entry.sleep1);
            await dec.auth(entry.customLogin, entry.customPassword);
            await dec.simple(el.section.handler, [sec.pas, entry.max], el.section);
            await dec.simple(el.subsection.handler, [sub.pas.design, entry.max], el.subsection);
            await dec.simple(page.design.init, [entry.max], page.design);
            await page.base.loading(entry.sleep1);
        }),

        // Бюро пропусков / Отчет по посетелям
        beforeVisitorReport: () => before('Вход и открытие подраздела "Отчет по посетителям"', async () => {
            await page.base.loading(entry.sleep1);
            await dec.auth(entry.customLogin, entry.customPassword);
            await dec.simple(el.section.handler, [sec.pas, entry.max], el.section);
            await dec.simple(el.subsection.handler, [sub.pas.report, entry.max], el.subsection);
            await dec.simple(page.visitorReport.init, [entry.max], page.visitorReport);
            await page.base.loading(entry.sleep1);
        }),
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////


        //// Учет рабочего времени

        // Учет рабочего времени / Журнал отработанного времени
        beforeWorkedJournal: () => before('Вход и открытие подраздела "Журнал отработанного времени"', async () => {
            await page.base.loading(entry.sleep1);
            await dec.auth(entry.customLogin, entry.customPassword);
            await dec.simple(el.section.handler, [sec.urv, entry.max], el.section);
            await dec.simple(el.subsection.handler, [sub.urv.journal, entry.max], el.subsection);
            await dec.simple(page.workedJournal.init, [entry.max], page.workedJournal);
            await page.base.loading(entry.sleep1);
        }),

        // Учет рабочего времени / Оправдательные документы
        beforeDocumentJustification: () => before('Вход и открытие подраздела "Оправдательные документы" ' +
            '- вкладка "Оправдательные"', async () => {
            await page.base.loading(entry.sleep1);
            await dec.auth(entry.customLogin, entry.customPassword);
            await dec.simple(el.section.handler, [sec.urv, entry.max], el.section);
            await dec.simple(el.subsection.handler, [sub.urv.document, entry.max], el.subsection);
            await dec.simple(el.tab.handler, ['Оправдательные', entry.max], el.tab);
            await dec.simple(page.documentJustification.init, [entry.max], page.documentJustification);
            await page.base.loading(entry.sleep1);
        }),

        beforeDocumentOvertime: () => before('Вход и открытие подраздела "Оправдательные документы" ' +
            '- вкладка "Сверхурочные"', async () => {
            await page.base.loading(entry.sleep1);
            await dec.auth(entry.customLogin, entry.customPassword);
            await dec.simple(el.section.handler, [sec.urv, entry.max], el.section);
            await dec.simple(el.subsection.handler, [sub.urv.document, entry.max], el.subsection);
            await dec.simple(el.tab.handler, ['Сверхурочные', entry.max], el.tab);
            await dec.simple(page.documentOvertime.init, [entry.max], page.documentOvertime);
            await page.base.loading(entry.sleep1);
        }),

        beforeDocumentExplanatory: () => before('Вход и открытие подраздела "Оправдательные документы" ' +
            '- вкладка "Объяснительные"', async () => {
            await page.base.loading(entry.sleep1);
            await dec.auth(entry.customLogin, entry.customPassword);
            await dec.simple(el.section.handler, [sec.urv, entry.max], el.section);
            await dec.simple(el.subsection.handler, [sub.urv.document, entry.max], el.subsection);
            await dec.simple(el.tab.handler, ['Объяснительные', entry.max], el.tab);
            await dec.simple(page.documentExplanatory.init, [entry.max], page.documentExplanatory);
            await page.base.loading(entry.sleep1);
        }),

        // Учет рабочего времени / Формирование табеля
        beforeTimesheet: () => before('Вход и открытие подраздела "Формирование табеля"', async () => {
            await page.base.loading(entry.sleep1);
            await dec.auth(entry.customLogin, entry.customPassword);
            await dec.simple(el.section.handler, [sec.urv, entry.max], el.section);
            await dec.simple(el.subsection.handler, [sub.urv.tabel, entry.max], el.subsection);
            await dec.simple(page.timesheet.init, [entry.max], page.timesheet);
            await page.base.loading(entry.sleep1);
        }),

        // Учет рабочего времени / Отчеты по дисциплине
        beforeReportViolator: () => before('Вход и открытие подраздела "Отчеты по дисциплине" - вкладка "Нарушители"',
            async () => {
            await page.base.loading(entry.sleep1);
            await dec.auth(entry.customLogin, entry.customPassword);
            await dec.simple(el.section.handler, [sec.urv, entry.max], el.section);
            await dec.simple(el.subsection.handler, [sub.urv.violator, entry.max], el.subsection);
            await dec.simple(el.tab.handler, ['Нарушители', entry.max], el.tab);
            await dec.simple(page.violator.init, [entry.max], page.violator);
            await page.base.loading(entry.sleep1);
        }),

        beforeReportPresence: () => before('Вход и открытие подраздела "Отчеты по дисциплине" - вкладка ' +
            '"Присутствующие на данный момент"', async () => {
            await page.base.loading(entry.sleep1);
            await dec.auth(entry.customLogin, entry.customPassword);
            await dec.simple(el.section.handler, [sec.urv, entry.max], el.section);
            await dec.simple(el.subsection.handler, [sub.urv.violator, entry.max], el.subsection);
            await dec.simple(el.tab.handler, ['Присутствующие на данный момент', entry.max], el.tab);
            await dec.simple(page.presence.init, [entry.max], page.presence);
            await page.base.loading(entry.sleep1);
        }),

        beforeReportAbsent: () => before('Вход и открытие подраздела "Отчеты по дисциплине" - вкладка ' +
            '"Отсутствующие сегодня"', async () => {
            await page.base.loading(entry.sleep1);
            await dec.auth(entry.customLogin, entry.customPassword);
            await dec.simple(el.section.handler, [sec.urv, entry.max], el.section);
            await dec.simple(el.subsection.handler, [sub.urv.violator, entry.max], el.subsection);
            await dec.simple(el.tab.handler, ['Отсутствующие сегодня', entry.max], el.tab);
            await dec.simple(page.absent.init, [entry.max], page.absent);
            await page.base.loading(entry.sleep1);
        }),

        beforeReportLate: () => before('Вход и открытие подраздела "Отчеты по дисциплине" ' +
            '- вкладка "Опоздавшие сегодня"', async () => {
            await page.base.loading(entry.sleep1);
            await dec.auth(entry.customLogin, entry.customPassword);
            await dec.simple(el.section.handler, [sec.urv, entry.max], el.section);
            await dec.simple(el.subsection.handler, [sub.urv.violator, entry.max], el.subsection);
            await dec.simple(el.tab.handler, ['Опоздавшие сегодня', entry.max], el.tab);
            await dec.simple(page.late.init, [entry.max], page.late);
            await page.base.loading(entry.sleep1);
        }),

        beforeReportEarly: () => before('Вход и открытие подраздела "Отчеты по дисциплине" - ' +
            'вкладка "Ушедшие раньше сегодня"', async () => {
            await page.base.loading(entry.sleep1);
            await dec.auth(entry.customLogin, entry.customPassword);
            await dec.simple(el.section.handler, [sec.urv, entry.max], el.section);
            await dec.simple(el.subsection.handler, [sub.urv.violator, entry.max], el.subsection);
            await dec.simple(el.tab.handler, ['Ушедшие раньше сегодня', entry.max], el.tab);
            await dec.simple(page.early.init, [entry.max], page.early);
            await page.base.loading(entry.sleep1);
        }),

        beforeReportOverwork: () => before('Вход и открытие подраздела "Отчеты по дисциплине" - вкладка "Переработка"',
            async () => {
            await page.base.loading(entry.sleep1);
            await dec.auth(entry.customLogin, entry.customPassword);
            await dec.simple(el.section.handler, [sec.urv, entry.max], el.section);
            await dec.simple(el.subsection.handler, [sub.urv.violator, entry.max], el.subsection);
            await dec.simple(el.tab.handler, ['Переработка', entry.max], el.tab);
            await dec.simple(page.overwork.init, [entry.max], page.overwork);
            await page.base.loading(entry.sleep1);
        }),

        // Учет рабочего времени / Отчет УРВ
        beforeReportURV: () => before('Вход и открытие подраздела "Отчёт УРВ"', async () => {
            await page.base.loading(entry.sleep1);
            await dec.auth(entry.customLogin, entry.customPassword);
            await dec.simple(el.section.handler, [sec.urv, entry.max], el.section);
            await dec.simple(el.subsection.handler, [sub.urv.report, entry.max], el.subsection);
            await dec.simple(page.reports.init, [entry.max], page.reports);
            await page.base.loading(entry.sleep1);
        }),

        // Учет рабочего времени / Время присутствия
        beforeTimePresence: () => before('Вход и открытие подраздела "Время присутствия"', async () => {
            await page.base.loading(entry.sleep1);
            await dec.auth(entry.customLogin, entry.customPassword);
            await dec.simple(el.section.handler, [sec.urv, entry.max], el.section);
            await dec.simple(el.subsection.handler, [sub.urv.presence, entry.max], el.subsection);
            await dec.simple(page.timePresence.init, [entry.max], page.timePresence);
            await page.base.loading(entry.sleep1);
        }),

        // Учет рабочего времени / Выданные документы
        beforeUserDocSupporting: () => before('Вход и открытие подраздела "Выданные документы" ' +
            '- вкладка "Оправдательные"', async () => {
            await page.base.loading(entry.sleep1);
            await dec.auth(entry.customLogin, entry.customPassword);
            await dec.simple(el.section.handler, [sec.urv, entry.max], el.section);
            await dec.simple(el.subsection.handler, [sub.urv.support, entry.max], el.subsection);
            await dec.simple(el.tab.handler, ['Оправдательные', entry.max], el.tab);
            await dec.simple(page.supporting.init, [entry.max], page.supporting);
            await page.base.loading(entry.sleep1);
        }),

        beforeUserDocOvertime: () => before('Вход и открытие подраздела "Выданные документы" - вкладка "Сверхурочные"',
            async () => {
            await page.base.loading(entry.sleep1);
            await dec.auth(entry.customLogin, entry.customPassword);
            await dec.simple(el.section.handler, [sec.urv, entry.max], el.section);
            await dec.simple(el.subsection.handler, [sub.urv.support, entry.max], el.subsection);
            await dec.simple(el.tab.handler, ['Сверхурочные', entry.max], el.tab);
            await dec.simple(page.paidOvertime.init, [entry.max], page.paidOvertime);
            await page.base.loading(entry.sleep1);
        }),
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////


        //// Контроль доступа

        // Контроль доступа / Отчет о проходах
        beforeReportPremisesAccessAll: () => before('Вход и открытие подраздела "Отчет о проходах" вкладка "Все"',
            async () => {
            await page.base.loading(entry.sleep1);
            await dec.auth(entry.customLogin, entry.customPassword);
            await dec.simple(el.section.handler, [sec.con, entry.max], el.section);
            await dec.simple(el.subsection.handler, [sub.con.premises, entry.max], el.subsection);
            await dec.simple(el.tab.handler, ['Все', entry.max], el.tab);
            await dec.simple(page.premiseAccessAll.init, [entry.max], page.premiseAccessAll);
            await page.base.loading(entry.sleep1);
        }),

        beforeReportPremisesAccessStaff: () => before('Вход и открытие подраздела "Отчет о проходах" ' +
            'вкладка "Сотрудники"', async () => {
            await page.base.loading(entry.sleep1);
            await dec.auth(entry.customLogin, entry.customPassword);
            await dec.simple(el.section.handler, [sec.con, entry.max], el.section);
            await dec.simple(el.subsection.handler, [sub.con.premises, entry.max], el.subsection);
            await dec.simple(el.tab.handler, ['Сотрудники', entry.max], el.tab);
            await dec.simple(page.premiseAccessStaff.init, [entry.max], page.premiseAccessStaff);
            await page.base.loading(entry.sleep1);
        }),

        beforeReportPremisesAccessVisitor: () => before('Вход и открытие подраздела "Отчет о проходах" ' +
            'вкладка "Посетители"', async () => {
            await page.base.loading(entry.sleep1);
            await dec.auth(entry.customLogin, entry.customPassword);
            await dec.simple(el.section.handler, [sec.con, entry.max], el.section);
            await dec.simple(el.subsection.handler, [sub.con.premises, entry.max], el.subsection);
            await dec.simple(el.tab.handler, ['Посетители', entry.max], el.tab);
            await dec.simple(page.premiseAccessVisitor.init, [entry.max], page.premiseAccessVisitor);
            await page.base.loading(entry.sleep1);
        }),

        // Контроль доступа / Управление устройствами
        beforeDeviceManagementRoom: () =>  before('Вход и открытие подраздела "Управление устройствами" вкладка ' +
            '"Помещения"', async () => {
            await page.base.loading(entry.sleep1);
            await dec.auth(entry.customLogin, entry.customPassword);
            await dec.simple(el.section.handler, [sec.con, entry.max], el.section);
            await dec.simple(el.subsection.handler, [sub.con.device, entry.max], el.subsection);
            await dec.simple(el.tab.handler, ['Помещения', entry.max], el.tab);
            await dec.simple(page.deviceManagement.init, [entry.max], page.deviceManagement);
            await page.base.loading(entry.sleep1);
        }),

        beforeDeviceManagementDevice: () => before('Вход и открытие подраздела "Управление устройствами"' +
            'вкладка "Устройства"', async () => {
            await page.base.loading(entry.sleep1);
            await dec.auth(entry.customLogin, entry.customPassword);
            await dec.simple(el.section.handler, [sec.con, entry.max], el.section);
            await dec.simple(el.subsection.handler, [sub.con.device, entry.max], el.subsection);
            await dec.simple(el.tab.handler, ['Устройства', entry.max], el.tab);
            await dec.simple(page.deviceManagement.init, [entry.max], page.deviceManagement);
            await page.base.loading(entry.sleep1);
        }),

        // Контроль доступа / Журнал верификации
        beforeReportVerificationJournal: () => before('Вход и открытие подраздела "Журнал верификации".', async () => {
            await page.base.loading(entry.sleep1);
            await dec.auth(entry.customLogin, entry.customPassword);
            await dec.simple(el.section.handler, [sec.con, entry.max], el.section);
            await dec.simple(el.subsection.handler, [sub.con.verif, entry.max], el.subsection);
            await dec.simple(page.verificationJournal.init, [entry.max], page.verificationJournal);
            await page.base.loading(entry.sleep1);
        }),

        // Контроль доступа / Отчет по доступу в помещение
        beforeReportPremisesAccessRoomAll: () => before('Вход и открытие подраздела "Отчет по доступу в помещения" ' +
            'вкладка "Все"', async () => {
            await page.base.loading(entry.sleep1);
            await dec.auth(entry.customLogin, entry.customPassword);
            await dec.simple(el.section.handler, [sec.con, entry.max], el.section);
            await dec.simple(el.subsection.handler, [sub.con.room, entry.max], el.subsection);
            await dec.simple(el.tab.handler, ['Все', entry.max], el.tab);
            await dec.simple(page.premisesAccessReportAll.init, [entry.max], page.premisesAccessReportAll);
            await page.base.loading(entry.sleep1);
        }),

        beforeReportPremisesAccessRoomStaff: () => before('Вход и открытие подраздела "Отчет по доступу в помещения" ' +
            'вкладка "Сотрудники"', async () => {
            await page.base.loading(entry.sleep1);
            await dec.auth(entry.customLogin, entry.customPassword);
            await dec.simple(el.section.handler, [sec.con, entry.max], el.section);
            await dec.simple(el.subsection.handler, [sub.con.room, entry.max], el.subsection);
            await dec.simple(el.tab.handler, ['Сотрудники', entry.max], el.tab);
            await dec.simple(page.premisesAccessReportStaff.init, [entry.max], page.premisesAccessReportStaff);
            await page.base.loading(entry.sleep1);
        }),

        beforeReportPremisesAccessRoomVisitor: () => before('Вход и открытие подраздела ' +
            '"Отчет по доступу в помещения" вкладка "Посетители"', async () => {
            await page.base.loading(entry.sleep1);
            await dec.auth(entry.customLogin, entry.customPassword);
            await dec.simple(el.section.handler, [sec.con, entry.max], el.section);
            await dec.simple(el.subsection.handler, [sub.con.room, entry.max], el.subsection);
            await dec.simple(el.tab.handler, ['Посетители', entry.max], el.tab);
            await dec.simple(page.premisesAccessReportVisitor.init, [entry.max], page.premisesAccessReportVisitor);
            await page.base.loading(entry.sleep1);
        }),

        // Контроль доступа / Местонахождение
        beforeReportWhereAboutsAll: () => before('Вход и открытие подраздела "Местонахождение" вкладка "Все"',
            async () => {
            await page.base.loading(entry.sleep1);
            await dec.auth(entry.customLogin, entry.customPassword);
            await dec.simple(el.section.handler, [sec.con, entry.max], el.section);
            await dec.simple(el.subsection.handler, [sub.con.location, entry.max], el.subsection);
            await dec.simple(el.tab.handler, ['Все', entry.max], el.tab);
            await dec.simple(page.whereAboutsAll.init, [entry.max], page.whereAboutsAll);
            await page.base.loading(entry.sleep1);
        }),

        beforeReportWhereAboutsStaff: () => before('Вход и открытие подраздела "Местонахождение" вкладка "Сотрудники"',
            async () => {
            await page.base.loading(entry.sleep1);
            await dec.auth(entry.customLogin, entry.customPassword);
            await dec.simple(el.section.handler, [sec.con, entry.max], el.section);
            await dec.simple(el.subsection.handler, [sub.con.location, entry.max], el.subsection);
            await dec.simple(el.tab.handler, ['Сотрудники', entry.max], el.tab);
            await dec.simple(page.whereAboutsStaff.init, [entry.max], page.whereAboutsStaff);
            await page.base.loading(entry.sleep1);
        }),

        beforeReportWhereAboutsVisitor: () => before('Вход и открытие подраздела "Местонахождение" вкладка ' +
            '"Посетители"', async () => {
            await page.base.loading(entry.sleep1);
            await dec.auth(entry.customLogin, entry.customPassword);
            await dec.simple(el.section.handler, [sec.con, entry.max], el.section);
            await dec.simple(el.subsection.handler, [sub.con.location, entry.max], el.subsection);
            await dec.simple(el.tab.handler, ['Посетители', entry.max], el.tab);
            await dec.simple(page.whereAboutsVisitor.init, [entry.max], page.whereAboutsVisitor);
            await page.base.loading(entry.sleep1);
        }),

        beforeReportIdentifierAll: () => before('Вход и открытие подраздела "Выданные идентификаторы" вкладка "Все"',
            async () => {
            await page.base.loading(entry.sleep1);
            await dec.auth(entry.customLogin, entry.customPassword);
            await dec.simple(el.section.handler, [sec.con, entry.max], el.section);
            await dec.simple(el.subsection.handler, [sub.con.card, entry.max], el.subsection);
            await dec.simple(el.tab.handler, ['Все', entry.max], el.tab);
            await dec.simple(page.identifiersAll.init, [entry.max], page.identifiersAll);
            await page.base.loading(entry.sleep1);
        }),

        beforeReportIdentifierAStaff: () => before('Вход и открытие подраздела "Выданные идентификаторы" ' +
            'вкладка "Сотрудники"', async () => {
            await page.base.loading(entry.sleep1);
            await dec.auth(entry.customLogin, entry.customPassword);
            await dec.simple(el.section.handler, [sec.con, entry.max], el.section);
            await dec.simple(el.subsection.handler, [sub.con.card, entry.max], el.subsection);
            await dec.simple(el.tab.handler, ['Сотрудники', entry.max], el.tab);
            await dec.simple(page.identifiersStaff.init, [entry.max], page.identifiersStaff);
            await page.base.loading(entry.sleep1);
        }),

        beforeReportIdentifierVisitor: () => before('Вход и открытие подраздела "Выданные идентификаторы" ' +
            'вкладка "Посетители"', async () => {
            await page.base.loading(entry.sleep1);
            await dec.auth(entry.customLogin, entry.customPassword);
            await dec.simple(el.section.handler, [sec.con, entry.max], el.section);
            await dec.simple(el.subsection.handler, [sub.con.card, entry.max], el.subsection);
            await dec.simple(el.tab.handler, ['Посетители', entry.max], el.tab);
            await dec.simple(page.identifiersVisitor.init, [entry.max], page.identifiersVisitor);
            await page.base.loading(entry.sleep1);
        }),
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////


        //// Верификация

        // Верификация / Верификация
        beforeVerify: () => before('Вход и открытие подраздела "Верификация"', async () => {
            await page.base.loading(entry.sleep1);
            await dec.auth(entry.customLogin, entry.customPassword);
            await dec.simple(el.section.handler, [sec.ver, entry.max], el.section);
            await dec.simple(el.subsection.handler, [sub.ver.verif, entry.max], el.subsection);
            await dec.simple(page.verify.init, [entry.max], page.verify);
            await page.base.loading(entry.sleep1);
        }),

        // Верификация / Конфигурация верификации
        beforeVerifyConfig: () => before('Вход и открытие подраздела "Конфигурация верификации"', async () => {
            await page.base.loading(entry.sleep1);
            await dec.auth(entry.customLogin, entry.customPassword);
            await dec.simple(el.section.handler, [sec.ver, entry.max], el.section);
            await dec.simple(el.subsection.handler, [sub.ver.config, entry.max], el.subsection);
            await dec.simple(page.verifyConfig.init, [entry.max], page.verifyConfig);
            await page.base.loading(entry.sleep1);
        }),
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////

        //// Заказ пропуска

        // Заказ пропуска / Заказ пропуска
        beforeOrderPassOrdered: () => before('Вход и открытие подраздела "Заказ пропуска" вкладка "Заказ пропуска"',
            async () => {
            await page.base.loading(entry.sleep1);
            await dec.auth(entry.customLogin, entry.customPassword);
            await dec.simple(el.section.handler, [sec.ord, entry.max], el.section);
            await dec.simple(el.subsection.handler, [sub.ord.order, entry.max], el.subsection);
            await dec.simple(el.tab.handler, ['Заказ пропуска', entry.max], el.tab);
            await dec.simple(page.orderpassOrder.init, [entry.max], page.orderpassOrder);
            await page.base.loading(entry.sleep1);
        }),

        beforeOrderPassArchive: () => before('Вход и открытие подраздела "Заказ пропуска" вкладка "Архив"',
            async () => {
            await page.base.loading(entry.sleep1);
            await dec.auth(entry.customLogin, entry.customPassword);
            await dec.simple(el.section.handler, [sec.ord, entry.max], el.section);
            await dec.simple(el.subsection.handler, [sub.ord.order, entry.max], el.subsection);
            await dec.simple(el.tab.handler, ['Архив', entry.max], el.tab);
            await dec.simple(page.orderpassArchive.init, [entry.max], page.orderpassArchive);
            await page.base.loading(entry.sleep1);
        }),
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////


        //// Администрирование

        // Администрирование / Конфигурация
        beforeConfigRoom: () => before('Вход и открытие подраздела "Конфигурация" вкладка "Помещения"', async () => {
            await page.base.loading(entry.sleep1);
            await dec.auth(entry.customLogin, entry.customPassword);
            await dec.simple(el.section.handler, [sec.adm, entry.max], el.section);
            await dec.simple(el.subsection.handler, [sub.adm.conf, entry.max], el.subsection);
            await dec.simple(el.tab.handler, ['Помещения', entry.max], el.tab);
            await dec.simple(page.room.init, [entry.max], page.room);
            await page.base.loading(entry.sleep1);
        }),

        beforeConfigDevice: () => before('Вход и открытие подраздела "Конфигурация" вкладка "Устройства"', async () => {
            await page.base.loading(entry.sleep1);
            await dec.auth(entry.customLogin, entry.customPassword);
            await dec.simple(el.section.handler, [sec.adm, entry.max], el.section);
            await dec.simple(el.subsection.handler, [sub.adm.conf, entry.max], el.subsection);
            await dec.simple(el.tab.handler, ['Устройства', entry.max], el.tab);
            await dec.simple(page.device.init, [entry.max], page.device);
            await page.base.loading(entry.sleep1);
        }),

        beforeConfigEvent: () => before('Вход и открытие подраздела "Конфигурация" вкладка "События"', async () => {
            await page.base.loading(entry.sleep1);
            await dec.auth(entry.customLogin, entry.customPassword);
            await dec.simple(el.section.handler, [sec.adm, entry.max], el.section);
            await dec.simple(el.subsection.handler, [sub.adm.conf, entry.max], el.subsection);
            await dec.simple(el.tab.handler, ['События', entry.max], el.tab);
            await dec.simple(page.eventRename.init, [entry.max], page.eventRename);
            await page.base.loading(entry.sleep1);
        }),

        beforeConfigCamera: () => before('Вход и открытие подраздела "Конфигурация" вкладка "Шаблоны камер"',
            async () => {
            await page.base.loading(entry.sleep1);
            await dec.auth(entry.customLogin, entry.customPassword);
            await dec.simple(el.section.handler, [sec.adm, entry.max], el.section);
            await dec.simple(el.subsection.handler, [sub.adm.conf, entry.max], el.subsection);
            await dec.simple(el.tab.handler, ['Шаблоны камер', entry.max], el.tab);
            await dec.simple(page.camera.init, [entry.max], page.camera);
            await page.base.loading(entry.sleep1);
        }),

        beforeConfigSystem: () => before('Вход и открытие подраздела "Конфигурация" вкладка "Системы"', async () => {
            await page.base.loading(entry.sleep1);
            await dec.auth(entry.customLogin, entry.customPassword);
            await dec.simple(el.section.handler, [sec.adm, entry.max], el.section);
            await dec.simple(el.subsection.handler, [sub.adm.conf, entry.max], el.subsection);
            await dec.simple(el.tab.handler, ['Система', entry.max], el.tab);
            await dec.simple(page.system.init, [entry.max], page.system);
            await page.base.loading(entry.sleep1);
        }),

        // Администрирование / События системы
        beforeEventSystem: () => before('Вход и открытие подраздела "События системы"', async () => {
            await page.base.loading(entry.sleep1);
            await dec.auth(entry.customLogin, entry.customPassword);
            await dec.simple(el.section.handler, [sec.adm, entry.max], el.section);
            await dec.simple(el.subsection.handler, [sub.adm.event, entry.max], el.subsection);
            await dec.simple(page.event.init, [entry.max], page.event);
            await page.base.loading(entry.sleep1);
        }),

        // Администрирование / Реакции на события
        beforeEventAction: () => before('Вход и открытие подраздела "Реакции на события"', async () => {
            await page.base.loading(entry.sleep1);
            await dec.auth(entry.customLogin, entry.customPassword);
            await dec.simple(el.section.handler, [sec.adm, entry.max], el.section);
            await dec.simple(el.subsection.handler, [sub.adm.action, entry.max], el.subsection);
            await dec.simple(page.eventaction.init, [entry.max], page.eventaction);
            await page.base.loading(entry.sleep1);
        }),

        // Администрирование / Задания
        beforeTask: () => before('Вход и открытие подраздела "Задания"', async () => {
            await page.base.loading(entry.sleep1);
            await dec.auth(entry.customLogin, entry.customPassword);
            await dec.simple(el.section.handler, [sec.adm, entry.max], el.section);
            await dec.simple(el.subsection.handler, [sub.adm.task, entry.max], el.subsection);
            await dec.simple(page.task.init, [entry.max], page.task);
            await page.base.loading(entry.sleep1);
        }),

        // Администрирование / Операторы
        beforeOperator: () => before('Вход и открытие подраздела "Операторы"', async () => {
            await page.base.loading(entry.sleep1);
            await dec.auth(entry.customLogin, entry.customPassword);
            await dec.simple(el.section.handler, [sec.adm, entry.max], el.section);
            await dec.simple(el.subsection.handler, [sub.adm.operator, entry.max], el.subsection);
            await dec.simple(page.operator.init, [entry.max], page.operator);
            await page.base.loading(entry.sleep1);
        }),

        // Администрирование / Роли и права операторов
        beforeRole: () => before('Вход и открытие подраздела "Роли и права операторов"', async () => {
            await page.base.loading(entry.sleep1);
            await dec.auth(entry.customLogin, entry.customPassword);
            await dec.simple(el.section.handler, [sec.adm, entry.max], el.section);
            await dec.simple(el.subsection.handler, [sub.adm.role, entry.max], el.subsection);
            await dec.simple(page.role.init, [entry.max], page.role);
            await page.base.loading(entry.sleep1);
        }),

        // Администрирование / Лицензии
        beforeLicense: () => before('Вход и открытие подраздела "Лицензии"', async () => {
            await page.base.loading(entry.sleep1);
            await dec.auth(entry.customLogin, entry.customPassword);
            await dec.simple(el.section.handler, [sec.adm, entry.max], el.section);
            await dec.simple(el.subsection.handler, [sub.adm.license, entry.max], el.subsection);
            await dec.simple(page.license.init, [entry.max], page.license);
            await page.base.loading(entry.sleep1);
        }),
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    },

    after: {
        after: () => after('Выход', async () => {
            await page.base.loading(entry.sleep1);
            await dec.exit();
            await page.base.loading(entry.sleep1);
        }),
        afterNoLoader: () => after('Выход', async () => {
            await page.base.loading(entry.sleep1);
            await dec.exitNoLoader();
            await page.base.loading(entry.sleep1);
        }),
    },
}