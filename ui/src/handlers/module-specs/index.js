module.exports = {

    //Персонал
    staffUi: require('./specs/personal/staff-ui'),
    positionUi: require('./specs/personal/position-ui'),
    additionalDataUi: require('./specs/personal/additional-data-ui'),
    divisionUi: require('./specs/personal/division-ui'),
    scheduleUi: require('./specs/personal/schedule-ui'),

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
    verificationJournalUi: require('./specs/control-access/verification-journal'),
    whereAboutsUi: require('./specs/control-access/where-abouts'),
    premisesAccessReportUi: require('./specs/control-access/premises-access-report'),
    identifiersUi: require('./specs/control-access/identifiers'),
}