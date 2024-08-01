module.exports = {
    //base
    base: new (require('./base-page/base-page')),
    auth: new (require('./auth-page/auth-page')),

    //Персонал
    staffActive: new (require('./app-pages/personal/staff-page/staff-active-page')),
    staffChange: new (require('./app-pages/personal/staff-page/staff-change-page')),
    staffDimissed: new (require('./app-pages/personal/staff-page/staff-dimissed-page')),
    schedule: new (require('./app-pages/personal/schedule-page/schedule-page')),
    schedulePageChange: new (require('./app-pages/personal/schedule-page/schedule-change-page')),
    division: new (require('./app-pages/personal/division-page/division-page')),
    position: new (require('./app-pages/personal/positions-page/positions-page')),
    additionalData: new (require('./app-pages/personal/additional-data-page/additional-data-page')),
    holiday: new (require('./app-pages/personal/holiday-page/holiday-page')),

    //Бюро пропусков
    visitorOrdered: new (require('./app-pages/pass-office/visitor-page/visitor-ordered-page')),
    visitorCurrent: new (require('./app-pages/pass-office/visitor-page/visitor-current-page')),
    visitorArchive: new (require('./app-pages/pass-office/visitor-page/visitor-archive-page')),
    visitorChange: new (require('./app-pages/pass-office/visitor-page/visitor-change-page')),
    staffPass: new (require('./app-pages/pass-office/staff-pass-page/staff-pass-page')),
    staffPassChange: new (require('./app-pages/pass-office/staff-pass-page/staff-pass-change-page')),
    accessTemplate: new (require('./app-pages/pass-office/access-page/access-template-page')),
    accessTemplateChange: new (require('./app-pages/pass-office/access-page/access-template-change-page')),
    accessTemplateSchedulePage: new (require('./app-pages/pass-office/access-page/access-template-schedule-change-page')),
    accessTemplateScheduleChangePage: new (require('./app-pages/pass-office/access-page/access-template-schedule-change-page')),
    accessTemplateScheduleHoliday: new (require('./app-pages/pass-office/access-page/access-template-schedule-holiday-page')),
    accessTemplateComission: new (require('./app-pages/pass-office/access-page/access-template-commission-page')),
    design: new (require('./app-pages/pass-office/design-page/design-page')),
    designChange: new (require('./app-pages/pass-office/design-page/design-change-page')),
    visitorReport: new (require('./app-pages/pass-office/visitor-report-page/visitor-report-page')),

    //УРВ
    workedJournal: new (require('./app-pages/urv/worked-journal-page/worked-journal-page')),
    timesheet: new (require('./app-pages/urv/timesheet-page/timesheet-page')),
    reports: new (require('./app-pages/urv/reports-page/reports-page')),
    violator: new (require('./app-pages/urv/discipline-reports-page/violators-page')),
    presence: new (require('./app-pages/urv/discipline-reports-page/presences-page')),
    absent: new (require('./app-pages/urv/discipline-reports-page/absents-page')),
    late: new (require('./app-pages/urv/discipline-reports-page/late-page')),
    early: new (require('./app-pages/urv/discipline-reports-page/early-page')),
    overwork: new (require('./app-pages/urv/discipline-reports-page/overworks-page')),
    timePresence: new (require('./app-pages/urv/time-presence-page/time-presence-page')),
    supporting: new (require('./app-pages/urv/support-page/supporting-page')),
    paidOvertime: new (require('./app-pages/urv/support-page/paid-overtime-page')),
    documentJustification: new (require('./app-pages/urv/document-page/document-justification-page')),
    documentOvertime: new (require('./app-pages/urv/document-page/document-overtime-page')),
    documentExplanatory: new (require('./app-pages/urv/document-page/document-explanatory-page')),

    //Контроль доступа
    premiseAccessAll: new (require('./app-pages/control-access/premise-access-page/premise-access-all-page')),
    premiseAccessStaff: new (require('./app-pages/control-access/premise-access-page/premise-access-staff-page')),
    premiseAccessVisitor: new (require('./app-pages/control-access/premise-access-page/premise-access-visitor-page')),
    deviceManagement: new (require('./app-pages/control-access/device-management-page/device-management-page')),
    verificationJournal: new (require('./app-pages/control-access/premise-access-page/premise-access-visitor-page')),
    whereAboutsAll: new (require('./app-pages/control-access/where-abouts-page/where-abouts-all-page')),
    whereAboutsStaff: new (require('./app-pages/control-access/where-abouts-page/where-abouts-staff-page')),
    whereAboutsVisitor: new (require('./app-pages/control-access/where-abouts-page/where-abouts-visitor-page')),
    premisesAccessReportAll: new (require('./app-pages/control-access/premises-access-report-page/premises-access-report-all-page')),
    premisesAccessReportStaff: new (require('./app-pages/control-access/premises-access-report-page/premises-access-report-staff-page')),
    premisesAccessReportVisitor: new (require('./app-pages/control-access/premises-access-report-page/premises-access-report-visitor-page')),
    identifiersAll: new (require('./app-pages/control-access/identifiers-page/identifiers-all-page')),
    identifiersStaff: new (require('./app-pages/control-access/identifiers-page/identifiers-staff-page')),
    identifiersVisitor: new (require('./app-pages/control-access/identifiers-page/identifiers-visitor-page')),

    // Верификация
    verify: new (require('./app-pages/verification/verification/verification-page')),
    verifyConfig: new (require('./app-pages/verification/verification-config/verification-config-page')),
    verifyConfigChange: new (require('./app-pages/verification/verification-config/verification-config-change-page')),

    //Заказ пропуска
    orderpassOrder: new (require('./app-pages/orderpass/orderpass/orderpass-order-page')),
    orderpassArchive: new (require('./app-pages/orderpass/orderpass/orderpass-archive-page')),
    orderpassChange: new (require('./app-pages/orderpass/orderpass/orderpass-change-page')),

    // Мониторинг
    plan: new (require('./app-pages/monitoring/plan/plan-page')),

    //Администрирование
    room: new (require('./app-pages/administration/configuration-page/configuration-room-page')),
    device: new (require('./app-pages/administration/configuration-page/configuration-device-page')),
    eventRename: new (require('./app-pages/administration/configuration-page/configuration-event-page')),
    camera: new (require('./app-pages/administration/configuration-page/configuration-camera-page')),
    system: new (require('./app-pages/administration/configuration-page/configuration-system-page')),
    event: new (require('./app-pages/administration/event-page/event-page')),
    eventaction: new (require('./app-pages/administration/eventaction-page/eventaction-page')),
    eventactionChange: new (require('./app-pages/administration/eventaction-page/eventaction-change-page')),
    task: new (require('./app-pages/administration/task/task-page')),
    taskChange: new (require('./app-pages/administration/task/task-change-page')),
    operator:  new (require('./app-pages/administration/operator-page/operator-page')),
    operatorChange: new (require('./app-pages/administration/operator-page/operator-change-page')),
    role: new (require('./app-pages/administration/role-page/role-page')),
    roleChange: new (require('./app-pages/administration/role-page/role-change-page')),
    license: new (require('./app-pages/administration/license-page/license-page')),

}