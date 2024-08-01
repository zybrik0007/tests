module.exports = {

    // Персонал
    staffUI: require('./app.section.ui.tests/personal.ui.tests/staff.ui.tests/staff.ui.tests'),
    positionUI: require('./app.section.ui.tests/personal.ui.tests/position.ui.tests/position.ui.tests'),
    additionalDataUI: require('./app.section.ui.tests/personal.ui.tests/additionaldata.ui.tests/additionaldata.ui.tests'),
    divisionUI: require('./app.section.ui.tests/personal.ui.tests/division.ui.tests/division.ui.tests'),
    scheduleUI: require('./app.section.ui.tests/personal.ui.tests/schedule.ui.tests/schedule.ui.tests'),
    holidayUI: require('./app.section.ui.tests/personal.ui.tests/holiday.ui.tests/holiday.ui'),

    // Бюро пропусков
    visitorUI: require('./app.section.ui.tests/passoffice.ui.tests/visitor.ui.tests/visitor.ui.tests'),
    templateUI: require('./app.section.ui.tests/passoffice.ui.tests/template.ui.tests/template.ui.tests'),
    designUI: require('./app.section.ui.tests/passoffice.ui.tests/design.ui.tests/design.ui.tests'),
    visitorReportUI: require('./app.section.ui.tests/passoffice.ui.tests/visitorreport.ui.tests/visitorreport.ui.tests'),

    // УРВ
    workedJournalUI: require('./app.section.ui.tests/urv.ui.tests/workedjournal.ui.tests/workedjournal.ui.tests'),
    timesheetUI: require('./app.section.ui.tests/urv.ui.tests/timesheet.ui.tests/timesheet.ui.tests'),
    reportsUI: require('./app.section.ui.tests/urv.ui.tests/report.ui.tests/report.ui.tests'),
    disciplineReportsUI: require('./app.section.ui.tests/urv.ui.tests/disciplinereport.ui.tests/disciplinereport.ui.tests'),
    timePresenceUI: require('./app.section.ui.tests/urv.ui.tests/timepresence.ui.tests/timepresence.ui.tests'),
    userdocUI: require('./app.section.ui.tests/urv.ui.tests/userdoc.ui.tests/userdoc.ui.tests'),
    documentUI: require('./app.section.ui.tests/urv.ui.tests/document.ui.tests/document.ui.tests'),

   // Контроль доступа
    premiseAccessUI: require('./app.section.ui.tests/controlaccess.ui.tests/premiseaccess.ui.tests/premiseaccess.ui.tests'),
    deviceManagementUI: require('./app.section.ui.tests/controlaccess.ui.tests/devicemanagement.ui.tests.js/devicemanagement.ui.tests'),
    verificationJournalUI: require('./app.section.ui.tests/controlaccess.ui.tests/verificationjournal.ui.tests/verificationjournal.ui.tests'),
    whereAboutsUI: require('./app.section.ui.tests/controlaccess.ui.tests/whereabouts.ui.tests/whereabouts.ui.tests'),
    premisesAccessReportUI: require('./app.section.ui.tests/controlaccess.ui.tests/premisesaccessreport.ui.tests/premisesaccessreport.ui.tests'),
    identifiersUI: require('./app.section.ui.tests/controlaccess.ui.tests/identifiers.ui.tests.js/identifiers.ui.tests'),

    // Верификация
    verifyUI: require('./app.section.ui.tests/verifycation.ui.tests/verifycation.ui.tests'),

    // Администрирование
    configurationUI: require('./app.section.ui.tests/administration.ui.tests/configuration.ui.tests/configuration.ui.tests'),
    eventactionUI: require('./app.section.ui.tests/administration.ui.tests/eventaction.ui.tests/eventaction.ui.tests'),
    eventUI: require('./app.section.ui.tests/administration.ui.tests/event.ui.tests/event.ui.tests'),
    taskUI: require('./app.section.ui.tests/administration.ui.tests/task.ui.tests/task.ui.tests'),
    operatorRoleUI: require('./app.section.ui.tests/administration.ui.tests/operator.role.ui.tests/operator.role.ui.tests'),
    licenseUI: require('./app.section.ui.tests/administration.ui.tests/license.ui.tests/license.ui.tests'),
}