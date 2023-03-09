const Base = require('./base-page/base-page')
const Auth = require('./auth-page/auth-page')
const Rooms = require('./soft/administration/configuration-page/configuration-room-page')
const Devices = require('./soft/administration/configuration-page/configuration-device-page')
const License = require('./soft/administration/license-page/license-page')
const AccessTemplate = require('./soft/pass-office/access-page/access-template-page')
const AccessTemplateChange = require('./soft/pass-office/access-page/access-template-change-page')
const DivisionPage = require('./soft/personal/division-page/division-page')
const SchedulePage = require('./soft/personal/schedule-page/schedule-page')
const SchedulePageChange = require('./soft/personal/schedule-page/schedule-change-page')
const PositionPage = require('./soft/personal/positions-page/positions-page')
const StaffPresentPage = require('./soft/personal/staff-page/staff-active-page')
const StaffPageChange = require('./soft/personal/staff-page/staff-change-page')
const VisitorCurrentPage = require('./soft/pass-office/visitor-page/visitor-current-page')
const VisitorOrderedPage = require('./soft/pass-office/visitor-page/visitor-ordered-page')
const VisitorChangePage = require('./soft/pass-office/visitor-page/visitor-change-page')




module.exports = {
    /*base*/
    base: new Base(),
    auth: new Auth(),

    /*Персонал*/
    staffActive: new StaffPresentPage(),
    staffChange: new StaffPageChange(),
    schedule: new SchedulePage(),
    schedulePageChange: new SchedulePageChange(),
    division: new DivisionPage(),
    position: new PositionPage(),

    /*Бюро пропусков*/
    visitorOrdered: new VisitorOrderedPage(),
    visitorCurrent: new VisitorCurrentPage(),
    visitorChange: new VisitorChangePage(),
    accessTemplate: new AccessTemplate(),
    accessTemplateChange: new AccessTemplateChange(),

    /*Администрирование*/
    room: new Rooms(),
    device: new Devices(),
    license: new License(),

}