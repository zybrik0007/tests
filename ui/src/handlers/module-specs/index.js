module.exports = {

    //Персонал
    staffUi: require('./specs/personal/staff-ui'),
    positionUi: require('./specs/personal/position-ui'),
    additionalDataUi: require('./specs/personal/additional-data-ui'),
    divisionUi: require('./specs/personal/division-ui'),
    scheduleUi: require('./specs/personal/schedule-ui'),
    holiday: require('./specs/personal/holiday-ui'),

    //Бюро пропусков
    visitorUi: require('./specs/pass-office/visitor-ui'),
    //scheduleUi: require('./specs/pass-office/access-template-schedule-ui'),
    templateUi: require('./specs/pass-office/template-ui'),
    designUi: require('./specs/pass-office/design-ui'),
    visitorReportUi: require('./specs/pass-office/visitor-report-ui'),

    //УРВ
    workedJournalUi: require('./specs/urv/worked-journal-ui'),
    timesheetUi: require('./specs/urv/timesheet-ui'),
    reportsUi: require('./specs/urv/reports-ui'),
    disciplineReportsUi: require('./specs/urv/discipline-reports'),
    timePresenceUi: require('./specs/urv/time-presence-ui'),
    supportingUi: require('./specs/urv/supporting-ui'),
    documentUi: require('./specs/urv/document-ui'),

   //Контроль доступа
    premiseAccessUi: require('./specs/control-access/premise-access'),
    deviceManagementUi: require('./specs/control-access/device-management'),
    verificationJournalUi: require('./specs/control-access/verification-journal'),
    whereAboutsUi: require('./specs/control-access/where-abouts'),
    premisesAccessReportUi: require('./specs/control-access/premises-access-report'),
    identifiersUi: require('./specs/control-access/identifiers'),

    // Верификация
    verifyUi: require('./specs/verification/verify-config-ui'),

    //Администрирование
    configurationUi: require('./specs/administration/configuration-ui'),
    eventactionUi: require('./specs/administration/eventaction-ui'),
    eventUi: require('./specs/administration/event-ui'),
    taskUi: require('./specs/administration/task-ui'),
    operatorRoleUi: require('./specs/administration/operator-role-ui')
}