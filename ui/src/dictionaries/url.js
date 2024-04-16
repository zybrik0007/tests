const {address} = require('../../../entry')

module.exports = {
    //auth
    authUrl: address,

    //Персонал
    staffAddUrl: address + 'personal/staff/new',
    staffEditUrl: address + 'personal/staff/',
    staffPresentUrl: address + 'personal/staff/activate',
    staffDismissedUrl: address + 'personal/staff/dismissed',
    schedulesUrl: address + 'personal/schedules',
    schedulesAddUrl: address + 'personal/schedules/new',
    schedulesEditUrl: address + 'personal/schedules/edit/',
    schedulesCopyUrl: address + 'personal/schedules/copy/',
    divisionsUrl: address + 'personal/divisions',
    positionsUrl: address + 'personal/positions',
    additionalDataUrl: address + 'personal/additionaldata',

    //Бюро пропусков
    visitorAddUrl: address + 'passoffice/visitors/new',
    visitorEditUrl: address + 'passoffice/visitors/',
    visitorOrderedUrl: address + 'passoffice/visitors/ordered',
    visitorCurrentUrl: address + 'passoffice/visitors/current',
    visitorArchiveUrl: address + 'passoffice/visitors/archive',
    staffPassUrl: address +  'passoffice/staff',
    staffPassEditUrl: address +  'passoffice/staff/',
    accessTemplatesUrl: address + 'passoffice/access/accesstemplates',
    accessAddTemplateUrl: address + 'passoffice/access/template/new',
    accessEditTemplateUrl: address + 'passoffice/access/template/edit/',
    accessCopyTemplateUrl: address + 'passoffice/access/template/copy/',
    accessTemplateCommissionUrl: address + 'passoffice/access/accesscommission',
    accessScheduleUrl: address + 'passoffice/access/accessschedules',
    accessAddScheduleUrl: address + 'passoffice/access/schedule/new',
    accessEditScheduleUrl: address + 'passoffice/access/schedule/edit/',
    accessEditScheduleHolidayUrl: address + 'passoffice/access/schedule/edit/3',
    designUrl: address + 'passoffice/design',
    designAddUrl: address + 'passoffice/design/new',
    designEditUrl: address + 'passoffice/design/edit/',
    designCopyUrl: address + 'passoffice/design/copy/',
    visitorReportUrl: address + 'passoffice/visitorsreport',


    //УРВ
    workedJournalUrl: address + 'timetracking/workedjournal',
    timesheetUrl: address + 'timetracking/timesheetsformation',
    urvReportsUrl: address + 'timetracking/reports',
    urvViolatorsUrl: address + 'timetracking/disciplinereports/violators',
    urvPresencesUrl: address + 'timetracking/disciplinereports/presences',
    urvAbsentsUrl: address + 'timetracking/disciplinereports/absents',
    urvLatesUrl: address + 'timetracking/disciplinereports/lates',
    urvEarlysUrl:  address + 'timetracking/disciplinereports/earlys',
    urvOverworksUrl: address + 'timetracking/disciplinereports/overworks',
    urvTimePresenceUrl: address + 'timetracking/timepresence',
    urvSupportingUrl: address + 'timetracking/userdocs/supporting',
    urvPaidOvertimeUrl: address + 'timetracking/userdocs/paid-overtime',
    urvDocJustificationUrl: address + 'timetracking/documenttype/justification',
    urvDocOvertimeUrl: address + 'timetracking/documenttype/overtime',
    urvDocExplanatoryUrl: address + 'timetracking/documenttype/explanatory',

    //Отчет о проходах
    premiseAccessAllUrl: address + 'controlaccess/premisesaccess/all',
    premiseAccessVisitorUrl: address + 'controlaccess/premisesaccess/visitor',
    premiseAccessStaffUrl: address + 'controlaccess/premisesaccess/staff',
    verificationJournalUrl: address + 'controlaccess/verificationjournal',
    whereAboutsAllUrl: address + 'controlaccess/whereabouts/all',
    whereAboutsStaffUrl: address + 'controlaccess/whereabouts/staff',
    whereAboutsVisitorUrl: address + 'controlaccess/whereabouts/visitor',
    premisesAccessReportAllUrl: address + 'controlaccess/premisesaccessreport/all',
    premisesAccessReportStaffUrl: address + 'controlaccess/premisesaccessreport/staff',
    premisesAccessReportVisitorUrl: address + 'controlaccess/premisesaccessreport/visitor',
    identifiersAllUrl: address + 'controlaccess/identifiers/all',
    identifiersStaffUrl: address + 'controlaccess/identifiers/staff',
    identifiersVisitorUrl: address + 'controlaccess/identifiers/visitor',

    //Заказ пропуска
    orderpassOrder: address + 'orderpass/index',
    orderpassArchive: address + 'orderpass/archive',
    orderpassChangeAdd: address + 'orderpass/new',
    orderpassChangeEdit: address + 'orderpass',

    //Администрирование
    roomUrl: address + 'administration/premisesconfiguration/rooms',
    deviceUrl: address + 'administration/premisesconfiguration/controllers',
    licenseUrl: address + 'administration/license',
}