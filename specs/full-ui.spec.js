const tests = require('../ui/src/handlers/module-specs');
const closeBrowser = require('../ui/src/handlers/other/closeBrowser');
const data = require('../ui/src/handlers/module-specs/data');


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

data.deleteDataVisitor();
closeBrowser();

data.addDataVisitor();
closeBrowser();

data.deleteDataVisitor();
closeBrowser();

//tests.scheduleUi.otherSchedule.addWeekMinParams()
//tests.divisionUi.add.addMinParams();
//closeBrowser();

/*
data.addDataControlAccess();
tests.identifiersUi.otherAll().exportXLSX();
data.deleteDataControlAccess();
closeBrowser();*/
