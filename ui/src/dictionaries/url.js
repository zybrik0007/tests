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
    accessScheduleUrl: address + 'passoffice/access/accessschedules',
    accessAddScheduleUrl: address + 'passoffice/access/schedule/new',
    accessEditScheduleUrl: address + 'passoffice/access/schedule/edit/',
    accessEditScheduleHolidayUrl: address + 'passoffice/access/schedule/edit/3',

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
    orderpassOrder: 'orderpass/index',
    orderpassArchive: 'orderpass/archive',
    orderpassChangeAdd: '/orderpass/new',
    orderpassChangeEdit: '/orderpass/new',

    //Администрирование
    roomUrl: address + 'administration/premisesconfiguration/rooms',
    deviceUrl: address + 'administration/premisesconfiguration/controllers',
    licenseUrl: address + 'administration/license',
}