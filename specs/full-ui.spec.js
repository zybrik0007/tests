const tests = require('../ui/src/handlers/module-specs');
const closeBrowser = require('../ui/src/handlers/other/closeBrowser');
const clearMemory = require('../ui/src/handlers/other/clearMemory');
const data = require('../ui/src/handlers/module-specs/data');
const decorate = require('../ui/src/decorates');


//data.addDataVisitor();
//tests.visitorUi.otherVisitorOrder.addVisitorMaxParams();
//tests.visitorUi.otherVisitorOrder.archiveVisitorMaxParamsFromOrder();
//tests.visitorUi.otherVisitorOrder.addBarcodeVisitorMaxParams();
//tests.visitorUi.otherVisitorOrder.addBarcodeDuplicateVisitor();

//data.addDataStaff();
//tests.staffUi.other.importMinParamsActive();
//tests.staffUi.other.importMaxParamsActive();
//tests.staffUi.other.importFailedParamsActive();
//data.deleteDataStaff();
//data.addDataStaff();
//tests.staffUi.other.addStaffMaxParams();
//tests.staffUi.other.dimissedStaff();
//tests.staffUi.other.restoreStaffDimissedEditParamsMaxParams();

/*data.addDataVisitor();
closeBrowser();*/

//data.deleteDataControlAccess();
//data.deleteDataStaff();

//closeBrowser();
//data.addDataSchedule();
//tests.scheduleUi.otherSchedule.copyShift();
//tests.scheduleUi.otherSchedule.addBalance();
tests.scheduleUi.otherSchedule.addBalance();
//tests.scheduleUi.otherSchedule.deleteSchedule();
//tests.scheduleUi.otherSchedule.deleteSchedule();
//tests.scheduleUi.otherSchedule.noStr();
//tests.divisionUi.add.addMinParams();
closeBrowser();

/*
data.addDataControlAccess();
tests.identifiersUi.otherAll().exportXLSX();
data.deleteDataControlAccess();
closeBrowser();*/
