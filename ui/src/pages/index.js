const Base = require('./base-page/base-page');
const Auth = require('./auth-page/auth-page');
const Rooms = require('./soft/administration/configuration-page/configuration-room-page');
const Devices = require('./soft/administration/configuration-page/configuration-device-page');
const License = require('./soft/administration/license-page/license-page');
const AccessTemplate = require('./soft/pass-office/access-page/access-template-page');
const AccessTemplateChange = require('./soft/pass-office/access-page/access-template-change-page');
const DivisionPage = require('./soft/personal/division-page/division-page');
const SchedulePage = require('./soft/personal/schedule-page/schedule-page');
const SchedulePageChange = require('./soft/personal/schedule-page/schedule-change-page');
const PositionPage = require('./soft/personal/positions-page/positions-page');
const StaffPresentPage = require('./soft/personal/staff-page/staff-active-page');
const StaffPageChange = require('./soft/personal/staff-page/staff-change-page');
const VisitorCurrentPage = require('./soft/pass-office/visitor-page/visitor-current-page');
const VisitorOrderedPage = require('./soft/pass-office/visitor-page/visitor-ordered-page');
const VisitorChangePage = require('./soft/pass-office/visitor-page/visitor-change-page');
const AccessTemplateScheduleChangePage = require('./soft/pass-office/access-page/access-template-schedule-change-page');
const AccessTemplateSchedulePage = require('./soft/pass-office/access-page/access-template-schedule-page');
const AdditionalData = require('./soft/personal/additional-data-page/additional-data-page');
const AccessTemplateScheduleHoliday = require('./soft/pass-office/access-page/access-template-schedule-holiday-page');
const PremiseAccessAll = require('./soft/control-access/premise-access-page/premise-access-all-page');
const PremiseAccessStaff = require('./soft/control-access/premise-access-page/premise-access-staff-page');
const PremiseAccessVisitor = require('./soft/control-access/premise-access-page/premise-access-visitor-page');
const VerificationJournal = require('./soft/control-access/verification-journal-page/verification-journal-page');
const WhereAboutsAll = require('./soft/control-access/where-abouts-page/where-abouts-all-page');
const WhereAboutsStaff = require('./soft/control-access/where-abouts-page/where-abouts-staff-page');
const WhereAboutsVisitor = require('./soft/control-access/where-abouts-page/where-abouts-visitor-page');
const PremisesAccessReportAll = require('./soft/control-access/premises-access-report-page/premises-access-report-all-page');
const PremisesAccessReportStaff = require('./soft/control-access/premises-access-report-page/premises-access-report-staff-page');
const PremisesAccessReportVisitor = require('./soft/control-access/premises-access-report-page/premises-access-report-visitor-page');
const IdentifiersAll = require('./soft/control-access/identifiers-page/identifiers-all-page');
const IdentifiersStaff = require('./soft/control-access/identifiers-page/identifiers-staff-page');
const IdentifiersVisitor = require('./soft/control-access/identifiers-page/identifiers-visitor-page');





module.exports = {
    //base
    base: new Base(),
    auth: new Auth(),

    //Персонал
    staffActive: new StaffPresentPage(),
    staffChange: new StaffPageChange(),
    schedule: new SchedulePage(),
    schedulePageChange: new SchedulePageChange(),
    division: new DivisionPage(),
    position: new PositionPage(),
    additionalData: new AdditionalData(),

    //Бюро пропусков
    visitorOrdered: new VisitorOrderedPage(),
    visitorCurrent: new VisitorCurrentPage(),
    visitorChange: new VisitorChangePage(),
    accessTemplate: new AccessTemplate(),
    accessTemplateChange: new AccessTemplateChange(),
    accessTemplateSchedulePage: new AccessTemplateSchedulePage(),
    accessTemplateScheduleChangePage: new AccessTemplateScheduleChangePage(),
    accessTemplateScheduleHoliday: new AccessTemplateScheduleHoliday(),


    //Контроль доступа
    premiseAccessAll: new PremiseAccessAll(),
    premiseAccessStaff: new PremiseAccessStaff(),
    premiseAccessVisitor: new PremiseAccessVisitor(),
    verificationJournal: new VerificationJournal(),
    whereAboutsAll: new WhereAboutsAll(),
    whereAboutsStaff: new WhereAboutsStaff(),
    whereAboutsVisitor: new WhereAboutsVisitor(),
    premisesAccessReportAll: new PremisesAccessReportAll(),
    premisesAccessReportStaff: new PremisesAccessReportStaff(),
    premisesAccessReportVisitor: new PremisesAccessReportVisitor(),
    identifiersAll: new IdentifiersAll(),
    identifiersStaff: new IdentifiersStaff(),
    identifiersVisitor: new IdentifiersVisitor(),

    //Администрирование
    room: new Rooms(),
    device: new Devices(),
    license: new License(),

}