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

    //Бюро пропусков
    visitorAddUrl: address + 'passoffice/visitors/new',
    visitorEditUrl: address + 'passoffice/visitors/',
    visitorOrderedUrl: address + 'passoffice/visitors/ordered',
    visitorCurrentUrl: address + 'passoffice/visitors/current',
    accessTemplatesUrl: address + 'passoffice/access/accesstemplates',
    accessAddTemplateUrl: address + 'passoffice/access/template/new',
    accessEditTemplateUrl: address + 'passoffice/access/template/edit/',

    //Администрирование
    roomUrl: address + 'administration/premisesconfiguration/rooms',
    deviceUrl: address + 'administration/premisesconfiguration/controllers',
    licenseUrl: address + 'administration/license',
}